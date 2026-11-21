import { databaseConflict } from '../../lib/conflicts';
import { getPlatformUser } from '../../platform-auth';
import {
  dayInZone,
  effectiveSchedule,
  InputError,
  paidMinutes,
  requireValue,
  textValue,
  validDate,
} from '../../lib/core';
import { chargeLeave, chargeTotal, leaveDates, type LeaveCharge } from '../../lib/leave';
import {
  audit,
  context,
  db,
  now,
  revisionGuard,
  schedules,
  settings,
  system,
  type Person,
} from '../../lib/store';

export const dynamic = 'force-dynamic';
type Holiday = { date: string; name: string };
type LeavePolicy = { start: string; end: string; holidays: Holiday[]; allowPastRequests?: boolean };

async function officePolicy(office: string) {
  return db()
    .prepare("SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?")
    .bind(office)
    .first<{ data: string }>();
}

async function chargeFor(
  row: LeaveRequest,
  employee: Person,
  policy: LeavePolicy,
): Promise<LeaveCharge> {
  if (row.snapshot) {
    const charge = JSON.parse(row.snapshot) as LeaveCharge;
    requireValue(
      charge.unit === employee.profile.holidayUnit,
      'Ask HR to reconcile existing requests after the entitlement unit changed.',
    );
    return {
      ...charge,
      days: charge.days.filter((d) => d.date >= policy.start && d.date <= policy.end),
    };
  }
  return chargeLeave(
    row.start_date > policy.start ? row.start_date : policy.start,
    row.end_date < policy.end ? row.end_date : policy.end,
    employee.profile.holidayUnit,
    policy,
    await schedules(employee.id),
  );
}
async function balanceFor(employee: Person, rows: LeaveRequest[], policy: LeavePolicy | null) {
  const { holidayAllowance: allowance, carriedForward, holidayUnit: unit } = employee.profile;
  let booked: number | null = null,
    pending: number | null = null,
    taken: number | null = null;
  if (policy) {
    booked = 0;
    pending = 0;
    taken = 0;
    for (const row of rows.filter(
      (r) =>
        ['approved', 'pending'].includes(r.status) &&
        r.start_date <= policy.end &&
        r.end_date >= policy.start,
    )) {
      try {
        const charge = await chargeFor(row, employee, policy);
        if (row.status === 'pending') pending += chargeTotal(charge);
        else {
          booked += chargeTotal(charge);
          taken += chargeTotal({
            ...charge,
            days: charge.days.filter((d) => d.date < dayInZone(employee.timezone)),
          });
        }
      } catch (error) {
        if (!(error instanceof InputError)) throw error;
        booked = null;
        pending = null;
        taken = null;
        break;
      }
    }
  }
  const remaining =
    allowance === null || carriedForward === null || booked === null
      ? null
      : allowance + carriedForward - booked;
  return {
    allowance,
    carriedForward,
    unit,
    booked,
    taken,
    pending,
    remaining,
    available: remaining === null || pending === null ? null : remaining - pending,
  };
}
const selectRequests =
  'SELECT r.*,d.leave_type,d.note,d.snapshot FROM leave_requests r LEFT JOIN leave_request_details d ON d.request_id=r.id';
async function employeeRequests(id: string) {
  return (
    await db()
      .prepare(selectRequests + ' WHERE r.employee_id=?')
      .bind(id)
      .all<LeaveRequest>()
  ).results;
}
async function balanceRevision(id: string) {
  return (
    (
      await db()
        .prepare('SELECT revision FROM leave_balance_versions WHERE employee_id=?')
        .bind(id)
        .first<{ revision: number }>()
    )?.revision || 0
  );
}
function balanceWrites(id: string, revision: number) {
  return [
    db()
      .prepare(
        "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT revision FROM leave_balance_versions WHERE employee_id=?),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
      )
      .bind(id, revision),
    db()
      .prepare(
        'INSERT INTO leave_balance_versions(employee_id,revision) VALUES (?,1) ON CONFLICT(employee_id) DO UPDATE SET revision=leave_balance_versions.revision+1',
      )
      .bind(id),
  ];
}
function policyGuard(office: string, raw: string) {
  return db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(office, raw);
}

type LeaveRequest = {
  snapshot: string | null;
  note: string | null;
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'declined' | 'cancelled';
};

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

function canReview(actor: Person, employee: Person) {
  return (
    actor.id !== employee.id &&
    ((actor.roles.includes('manager') && employee.profile.managerId === actor.id) ||
      (actor.roles.includes('hr_admin') && actor.officeScope.includes(employee.office)))
  );
}

async function session(req: Request) {
  const owner = await getPlatformUser();
  requireValue(owner, 'Sign in first.', 401);
  const current = await context(req, owner.userId);
  requireValue(current, 'Your session has ended. Sign in again.', 401);
  return current;
}

function failure(error: unknown) {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  if (databaseConflict(error)) {
    return json(
      { error: 'The request changed or overlaps existing leave. Refresh and try again.' },
      409,
    );
  }
  console.error('HMF leave', error);
  return json({ error: 'Unable to complete the leave action. Try again.' }, 503);
}

export async function GET(req: Request) {
  try {
    const { me, people } = await session(req);
    const authorized = people.filter((p) => p.id === me.id || canReview(me, p));
    const result = await db()
      .prepare(
        selectRequests +
          ' WHERE r.employee_id IN (SELECT value FROM json_each(?)) ORDER BY r.created_at DESC',
      )
      .bind(JSON.stringify(authorized.map((p) => p.id)))
      .all<LeaveRequest>();
    const requests = result.results.map((row) => {
      const employee = authorized.find((p) => p.id === row.employee_id)!;
      const own = employee.id === me.id;
      return {
        ...row,
        note: own || me.roles.includes('hr_admin') ? row.note : null,
        own,
        review: canReview(me, employee),
        name: employee.name,
      };
    });
    const stored = await officePolicy(me.office);
    const policy = stored ? (JSON.parse(stored.data) as LeavePolicy) : null;
    const today = dayInZone(me.timezone);
    const current = policy && today >= policy.start && today <= policy.end ? policy : null;
    const balance = await balanceFor(
      me,
      requests.filter((row) => row.own),
      current,
    );
    const config = await settings(),
      office = new URL(req.url).searchParams.get('office') || me.office;
    requireValue(
      config.offices.some((o) => o.code === office) && (system(me) || office === me.office),
      'Office not available.',
      403,
    );
    const selected = office === me.office ? stored : await officePolicy(office);
    return json({
      requests: requests.map((r) => ({ ...r, snapshot: undefined })),
      policy: selected ? JSON.parse(selected.data) : null,
      balance,
      office,
      offices: config.offices.filter((o) => system(me) || o.code === me.office),
      canEditPolicy: system(me),
    });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(req: Request) {
  try {
    const { me, people } = await session(req);
    requireValue(
      req.headers.get('origin') === new URL(req.url).origin,
      'Invalid request origin.',
      403,
    );
    requireValue(
      req.headers.get('content-type')?.includes('application/json'),
      'JSON required.',
      415,
    );
    const raw = await req.text();
    requireValue(raw.length <= 20000, 'Request too large.', 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    requireValue(body.action === 'savePolicy' || raw.length <= 4000, 'Request too large.', 413);
    const database = db();
    if (body.action === 'savePolicy') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const start = textValue(body.start, 10, true);
      const end = textValue(body.end, 10, true);
      leaveDates(start, end);
      const office = textValue(body.office || me.office, 40, true);
      requireValue(
        (await settings()).offices.some((o) => o.code === office),
        'Choose a configured office.',
      );
      requireValue(
        Array.isArray(body.holidays) && body.holidays.length <= 80,
        'Enter up to 80 holidays.',
      );
      const dates = new Set<string>();
      const holidays = body.holidays
        .map((entry: unknown) => {
          requireValue(
            entry && typeof entry === 'object' && 'date' in entry && 'name' in entry,
            'Enter a holiday date and name.',
          );
          const date = textValue(entry.date, 10, true);
          const name = textValue(entry.name, 100, true);
          requireValue(
            validDate(date) && date >= start && date <= end && !dates.has(date),
            'Holiday dates must be unique and inside the leave period.',
          );
          dates.add(date);
          return { date, name };
        })
        .sort((a: Holiday, b: Holiday) => a.date.localeCompare(b.date));
      const previous = await officePolicy(office);
      requireValue(
        body.allowPastRequests === undefined || typeof body.allowPastRequests === 'boolean',
        'Choose whether past requests are allowed.',
      );
      const previousPolicy = previous ? JSON.parse(previous.data) : null;
      if ('previous' in body)
        requireValue(
          JSON.stringify(body.previous) === JSON.stringify(previousPolicy),
          'This calendar changed. Refresh before saving.',
          409,
        );
      const next = {
        start,
        end,
        holidays,
        allowPastRequests: body.allowPastRequests ?? previousPolicy?.allowPastRequests ?? true,
      };
      await database.batch([
        database
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(office, previous?.data || ''),
        database
          .prepare(
            "INSERT INTO directory_settings(kind,code,data,updated_at) VALUES ('leave_policy',?,?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at",
          )
          .bind(office, JSON.stringify(next), now()),
        audit(
          me.id,
          null,
          'leave.policy',
          previous ? JSON.parse(previous.data) : null,
          { office, ...next },
          'Saved office leave calendar',
        ),
      ]);
      return json({ ok: true });
    }
    if (body.action === 'request') {
      const start = textValue(body.start, 10, true);
      const end = textValue(body.end, 10, true);
      leaveDates(start, end);
      requireValue(
        (!me.profile.startDate || start >= me.profile.startDate) &&
          (!me.profile.endDate || end <= me.profile.endDate),
        'Choose dates within your employment period.',
      );
      const leaveType = textValue(body.leaveType || 'annual_leave', 40, true),
        note = textValue(body.note || '', 500);
      requireValue(leaveType === 'annual_leave', 'Only annual leave is configured for booking.');
      const stored = await officePolicy(me.office);
      requireValue(stored, 'Ask your administrator to configure your office leave calendar first.');
      const policy = JSON.parse(stored.data) as LeavePolicy;
      requireValue(
        policy.allowPastRequests !== false || start >= dayInZone(me.timezone),
        'This office does not allow requests for past dates.',
      );
      const revision = await balanceRevision(me.id),
        existing = await employeeRequests(me.id);
      const charge = chargeLeave(
        start,
        end,
        me.profile.holidayUnit,
        policy,
        await schedules(me.id),
      );
      const total = chargeTotal(charge),
        balance = await balanceFor(me, existing, policy);
      requireValue(total > 0, 'These dates contain no scheduled working time.');
      requireValue(
        balance.available !== null,
        'Ask HR to confirm your allowance, carry-forward and schedules.',
      );
      requireValue(
        total <= balance.available + 0.000001,
        'This request exceeds your available leave after pending requests.',
      );
      const id = crypto.randomUUID();
      await database.batch([
        ...balanceWrites(me.id, revision),
        revisionGuard(me.id, me.revision),
        policyGuard(me.office, stored.data),
        database
          .prepare(
            `INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(
          SELECT 1 FROM leave_requests WHERE employee_id=? AND status IN ('pending','approved')
          AND start_date<=? AND end_date>=?
        ) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid`,
          )
          .bind(me.id, end, start),
        database
          .prepare(
            `INSERT INTO leave_requests
          (id,employee_id,start_date,end_date,timezone,status,created_at) VALUES (?,?,?,?,?,'pending',?)`,
          )
          .bind(id, me.id, start, end, me.timezone, now()),
        database
          .prepare(
            'INSERT INTO leave_request_details(request_id,leave_type,note,snapshot) VALUES (?,?,?,?)',
          )
          .bind(id, leaveType, note, JSON.stringify(charge)),
        audit(
          me.id,
          me.id,
          'leave.requested',
          null,
          { id, start, end, timezone: me.timezone, leaveType, charge },
          'Leave requested',
        ),
      ]);
      return json({ ok: true, id }, 201);
    }

    const id = textValue(body.id, 36, true);
    const row = await database
      .prepare(selectRequests + ' WHERE r.id=?')
      .bind(id)
      .first<LeaveRequest>();
    const employee = people.find((person) => person.id === row?.employee_id);
    requireValue(row && employee, 'Request not found.', 404);
    const status = body.action;
    const cancelling = status === 'cancelled';
    requireValue(
      cancelling || status === 'approved' || status === 'declined',
      'Unknown leave action.',
    );
    requireValue(
      cancelling ? me.id === employee.id : canReview(me, employee),
      'Request not found.',
      404,
    );
    requireValue(row.status === 'pending', 'This request is no longer pending.', 409);
    const note = cancelling ? 'Cancelled by employee' : textValue(body.note, 500, true);
    const revision = await balanceRevision(employee.id),
      statements = balanceWrites(employee.id, revision);
    if (status === 'approved') {
      const stored = await officePolicy(employee.office);
      requireValue(stored, 'Configure the office leave calendar first.');
      const policy = JSON.parse(stored.data) as LeavePolicy;
      requireValue(
        row.start_date >= policy.start && row.end_date <= policy.end,
        'This request belongs to a different leave period. Ask HR to review it.',
      );
      const charge = await chargeFor(row, employee, policy);
      const balance = await balanceFor(employee, await employeeRequests(employee.id), policy);
      requireValue(
        balance.available !== null && balance.available >= -0.000001,
        'The employee no longer has enough leave. Review the allowance and pending requests.',
      );
      const days = JSON.stringify(charge.days.map((d) => d.date)),
        stamp = now();
      const definition = JSON.stringify({
        code: 'annual_leave',
        label: 'Annual leave',
        category: 'leave',
        sensitive: false,
        approval: true,
        timezone: employee.timezone,
      });
      const before = (
        await database
          .prepare(
            'SELECT * FROM attendance WHERE employee_id=? AND date IN (SELECT value FROM json_each(?))',
          )
          .bind(employee.id, days)
          .all()
      ).results;
      statements.push(
        revisionGuard(employee.id, employee.revision),
        policyGuard(employee.office, stored.data),
        database
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND date IN (SELECT value FROM json_each(?))) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(employee.id, days),
        database
          .prepare(
            "INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) SELECT ?,value,'annual_leave','',?,?,?,'leave' FROM json_each(?) WHERE 1 ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason='',updated_at=excluded.updated_at,source='leave'",
          )
          .bind(employee.id, employee.office, stamp, stamp, days),
        database
          .prepare(
            "INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) SELECT ?,value,?,'approved',?,?,'Annual leave approved' FROM json_each(?) WHERE 1 ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval='approved',decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note",
          )
          .bind(employee.id, definition, me.id, stamp, days),
        database
          .prepare(
            "INSERT INTO leave_request_details(request_id,leave_type,note,snapshot) VALUES (?,'annual_leave','',?) ON CONFLICT(request_id) DO NOTHING",
          )
          .bind(id, JSON.stringify(charge)),
        audit(
          me.id,
          employee.id,
          'attendance.leave_approved',
          before,
          { requestId: id, dates: charge.days.map((d) => d.date) },
          'Attendance updated with approved leave',
        ),
      );
    }
    statements.push(
      database
        .prepare(
          "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM leave_requests WHERE id=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
        )
        .bind(id),
      database
        .prepare(
          'UPDATE leave_requests SET status=?,decided_by=?,decided_at=?,decision_note=? WHERE id=?',
        )
        .bind(status, me.id, now(), note, id),
      audit(
        me.id,
        employee.id,
        'leave.' + status,
        { ...row, note: undefined },
        { ...row, note: undefined, status },
        note,
      ),
    );
    await database.batch(statements);
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
