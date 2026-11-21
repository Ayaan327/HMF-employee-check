import { availability } from '../../lib/availability';
import { databaseConflict } from '../../lib/conflicts';
import { getPlatformUser } from '../../platform-auth';
import {
  csv,
  dayInZone,
  InputError,
  requireValue,
  sameValue,
  textValue,
  validDate,
} from '../../lib/core';
import {
  audit,
  context,
  db,
  now,
  schedules,
  scope,
  settings,
  system,
  team,
  type Person,
} from '../../lib/store';
import {
  dateRange,
  defaultHoursPolicy,
  metrics,
  snapshotFor,
  validateTimes,
  type HoursPolicy,
  type WorkRecord,
  type WorkSnapshot,
} from '../../lib/hours';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
function failure(e: unknown) {
  if (e instanceof InputError) return json({ error: e.message }, e.status);
  if (databaseConflict(e) || String(e).includes('UNIQUE constraint'))
    return json({ error: 'This record changed. Refresh before trying again.' }, 409);
  console.error('HMF hours', e);
  return json({ error: 'Unable to save working time. Please try again.' }, 503);
}
async function policy() {
  const r = await db()
    .prepare("SELECT data FROM directory_settings WHERE kind='hours' AND code='company'")
    .first<{ data: string }>();
  return r ? (JSON.parse(r.data) as HoursPolicy) : defaultHoursPolicy;
}
async function recordFor(id: string, date: string) {
  return db()
    .prepare('SELECT * FROM work_records WHERE employee_id=? AND date=?')
    .bind(id, date)
    .first<WorkRecord>();
}
const guard = (id: string, date: string, revision: number) =>
  db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT revision FROM work_records WHERE employee_id=? AND date=?),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(id, date, revision);
function targetFor(me: Person, people: Person[], id: string) {
  const target = people.find((p) => p.id === id);
  requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
  return target;
}
async function snap(target: Person, date: string) {
  return snapshotFor(await schedules(target.id), date, target.timezone, await policy());
}
function writeRecord(
  target: string,
  date: string,
  times: { checkIn: string; checkOut: string | null; breakMinutes: number },
  snapshot: WorkSnapshot,
  employeeNote: string,
  managerNote: string,
) {
  return db()
    .prepare(
      'INSERT INTO work_records(employee_id,date,check_in,check_out,break_minutes,snapshot,revision,employee_note,manager_note,overtime_state,updated_at) VALUES (?,?,?,?,?,?,1,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET check_in=excluded.check_in,check_out=excluded.check_out,break_minutes=excluded.break_minutes,revision=work_records.revision+1,manager_note=excluded.manager_note,overtime_state=excluded.overtime_state,updated_at=excluded.updated_at',
    )
    .bind(
      target,
      date,
      times.checkIn,
      times.checkOut,
      times.breakMinutes,
      JSON.stringify(snapshot),
      employeeNote,
      managerNote,
      'pending',
      now(),
    );
}

export async function GET(req: Request) {
  try {
    const owner = await getPlatformUser();
    requireValue(owner, 'Sign in first.', 401);
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Sign in again.', 401);
    const { me, people } = ctx,
      q = new URL(req.url).searchParams,
      action = q.get('action') || 'today';
    if (action === 'policy') return json({ policy: await policy(), canEdit: system(me) });
    if (action === 'today') {
      const today = dayInZone(me.timezone),
        record = await recordFor(me.id, today),
        open = await db()
          .prepare(
            'SELECT * FROM work_records WHERE employee_id=? AND check_out IS NULL ORDER BY date LIMIT 1',
          )
          .bind(me.id)
          .first<WorkRecord>();
      const snapshot = record ? JSON.parse(record.snapshot) : await snap(me, today);
      return json({
        today,
        record,
        open,
        snapshot,
        metrics: metrics(
          record,
          snapshot,
          today,
          new Date(),
          undefined,
          (await availability([me], today, today))(me, today),
        ),
      });
    }
    const all = q.get('team') === 'true';
    requireValue(!all || team(me), 'Team access is required.', 403);
    const targets = all
      ? people.filter((p) => scope(me, p))
      : [targetFor(me, people, q.get('id') || me.id)];
    if (action === 'corrections') {
      const ids = JSON.stringify(targets.map((p) => p.id));
      const rows = (
        await db()
          .prepare(
            'SELECT c.*,e.name AS employee_name,r.name AS requester_name,d.name AS decider_name FROM time_corrections c JOIN employees e ON e.id=c.employee_id LEFT JOIN employees r ON r.id=c.requested_by LEFT JOIN employees d ON d.id=c.decided_by WHERE c.employee_id IN (SELECT value FROM json_each(?)) ORDER BY c.created_at DESC',
          )
          .bind(ids)
          .all<any>()
      ).results;
      return json({
        requests: rows.map((r) => ({
          ...r,
          proposed: JSON.parse(r.proposed),
          canDecide: team(me) && me.id !== r.employee_id && me.id !== r.requested_by,
          canCancel: me.id === r.requested_by,
        })),
      });
    }
    if (action === 'sheet' || action === 'export') {
      const today = dayInZone(me.timezone),
        start = q.get('start') || today.slice(0, 7) + '-01',
        end = q.get('end') || today,
        dates = dateRange(start, end),
        rules = await policy();
      const records = (
        await db()
          .prepare('SELECT * FROM work_records WHERE date>=? AND date<=?')
          .bind(start, end)
          .all<WorkRecord>()
      ).results;
      const attendance = (
        await db()
          .prepare('SELECT employee_id,date,submitted_at FROM attendance WHERE date>=? AND date<=?')
          .bind(start, end)
          .all<{ employee_id: string; date: string; submitted_at: string }>()
      ).results;
      const versions = (
        await db()
          .prepare('SELECT * FROM schedule_versions WHERE employee_id IS NOT NULL')
          .all<any>()
      ).results.map((s) => ({ ...s, days: JSON.parse(s.days) }));
      const excused = await availability(targets, start, end);
      const rows = [];
      for (const target of targets) {
        for (const date of dates) {
          const record = records.find((r) => r.employee_id === target.id && r.date === date);
          if (
            !record &&
            (!target.active ||
              (target.profile.startDate && date < target.profile.startDate) ||
              (target.profile.endDate && date > target.profile.endDate))
          )
            continue;
          const snapshot: WorkSnapshot = record
              ? JSON.parse(record.snapshot)
              : snapshotFor(
                  versions.filter((s) => s.employee_id === target.id),
                  date,
                  target.timezone,
                  rules,
                ),
            submission = attendance.find((r) => r.employee_id === target.id && r.date === date);
          rows.push({
            employeeId: target.id,
            name: target.name,
            office: target.office,
            department: target.department,
            date,
            timezone: snapshot.timezone,
            record: record
              ? { ...record, employee_note: target.id === me.id ? record.employee_note : '' }
              : null,
            snapshot,
            ...metrics(
              record || null,
              snapshot,
              date,
              new Date(),
              submission?.submitted_at,
              excused(target, date),
            ),
            noResponse: !submission && !excused(target, date),
            canReview: team(me) && target.id !== me.id,
          });
        }
      }
      if (action === 'export')
        return new Response(
          csv([
            [
              'Employee ID',
              'Name',
              'Office',
              'Date',
              'Time zone',
              'Check-in UTC',
              'Check-out UTC',
              'Break minutes',
              'Scheduled minutes',
              'Recorded minutes',
              'Difference minutes',
              'Overtime minutes',
              'Overtime decision',
              'Missing check-in',
              'Missing check-out',
              'Late submission',
            ],
            ...rows.map((r) => [
              r.employeeId,
              r.name,
              r.office,
              r.date,
              r.timezone,
              r.record?.check_in,
              r.record?.check_out,
              r.record?.break_minutes,
              r.scheduledMinutes,
              r.recordedMinutes,
              r.differenceMinutes,
              r.overtimeMinutes,
              r.overtimeState,
              r.missingCheckIn,
              r.missingCheckOut,
              r.lateSubmission,
            ]),
          ]),
          {
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': 'attachment; filename="hmf-hours.csv"',
              'Cache-Control': 'no-store',
            },
          },
        );
      return json({ rows, start, end, today });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return failure(e);
  }
}

export async function POST(req: Request) {
  try {
    const owner = await getPlatformUser();
    requireValue(owner, 'Sign in first.', 401);
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
    requireValue(raw.length < 12000, 'Request too large.', 413);
    let b: any;
    try {
      b = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(b && typeof b === 'object', 'Invalid request.');
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Sign in again.', 401);
    const { me, people } = ctx;
    if (b.action === 'policy') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const p = b.policy,
        reason = textValue(b.reason, 500, true);
      requireValue(p && typeof p === 'object', 'Complete the hours rules.');
      for (const k of ['trackBreaks', 'overtimeEnabled', 'overtimeApproval'])
        requireValue(typeof p[k] === 'boolean', 'Complete the hours rules.');
      requireValue([null, true, false].includes(p.breaksPaid), 'Choose a break rule.');
      requireValue(
        p.graceMinutes === null ||
          (Number.isInteger(p.graceMinutes) && p.graceMinutes >= 0 && p.graceMinutes <= 1440),
        'Enter a valid grace period in minutes.',
      );
      requireValue(
        typeof p.submissionDeadline === 'string' &&
          (!p.submissionDeadline || /^([01]\d|2[0-3]):[0-5]\d$/.test(p.submissionDeadline)),
        'Choose a valid submission deadline.',
      );
      requireValue(
        p.overtimeThresholdMinutes === undefined ||
          (Number.isInteger(p.overtimeThresholdMinutes) &&
            p.overtimeThresholdMinutes >= 1 &&
            p.overtimeThresholdMinutes <= 1440),
        'Enter an overtime threshold between 1 and 1440 minutes.',
      );
      const next: HoursPolicy = {
          ...(p.overtimeThresholdMinutes === undefined
            ? {}
            : { overtimeThresholdMinutes: p.overtimeThresholdMinutes }),
          trackBreaks: p.trackBreaks,
          breaksPaid: p.breaksPaid,
          overtimeEnabled: p.overtimeEnabled,
          overtimeApproval: p.overtimeApproval,
          graceMinutes: p.graceMinutes,
          submissionDeadline: p.submissionDeadline,
        },
        old = await policy();
      requireValue(sameValue(old, b.previous), 'Settings changed. Reload before saving.', 409);
      const stored = await db()
        .prepare("SELECT data FROM directory_settings WHERE kind='hours' AND code='company'")
        .first<{ data: string }>();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='hours' AND code='company'),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(stored?.data || ''),
        db()
          .prepare(
            "INSERT INTO directory_settings(kind,code,data,updated_at) VALUES ('hours','company',?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at",
          )
          .bind(JSON.stringify(next), now()),
        audit(me.id, null, 'hours.policy', old, next, reason),
      ]);
      return json({ ok: true });
    }
    if (b.action === 'checkIn') {
      const date = dayInZone(me.timezone),
        stamp = now(),
        definition = (await settings()).statuses.find(
          (s) => s.code === b.status && s.enabled && s.category === 'working',
        );
      requireValue(definition, 'Choose an available working status.');
      const note = textValue(b.note || '', 500);
      requireValue(!definition.explanation || !!note, 'Add a short work-related explanation.');
      requireValue(
        !(await recordFor(me.id, date)),
        'A working-time record already exists for today. Request a correction if it is wrong.',
        409,
      );
      requireValue(
        !(await db()
          .prepare('SELECT date FROM work_records WHERE employee_id=? AND check_out IS NULL')
          .bind(me.id)
          .first()),
        'You have an open check-in. Check out or request a correction first.',
        409,
      );
      requireValue(
        !(await db()
          .prepare(
            "SELECT id FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?",
          )
          .bind(me.id, date, date)
          .first()),
        'You have approved leave today. Ask an authorized reviewer to resolve it before checking in.',
        409,
      );
      const snapshot = await snap(me, date),
        old = await db()
          .prepare('SELECT * FROM attendance WHERE employee_id=? AND date=?')
          .bind(me.id, date)
          .first<any>();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id, date, old?.updated_at || ''),
        guard(me.id, date, 0),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id, date, date),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND check_out IS NULL) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id),
        writeRecord(
          me.id,
          date,
          { checkIn: stamp, checkOut: null, breakMinutes: 0 },
          snapshot,
          note,
          '',
        ),
        db()
          .prepare(
            'INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason=excluded.reason,updated_at=excluded.updated_at,source=excluded.source',
          )
          .bind(me.id, date, definition.code, note, me.office, stamp, stamp, 'employee'),
        db()
          .prepare(
            'INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,?,NULL,NULL,NULL) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval=excluded.approval,decided_by=NULL,decided_at=NULL,decision_note=NULL',
          )
          .bind(
            me.id,
            date,
            JSON.stringify({ ...definition, timezone: me.timezone }),
            definition.approval ? 'pending' : 'not_required',
          ),
        audit(
          me.id,
          me.id,
          'hours.check_in',
          null,
          { date, checkIn: stamp, snapshot },
          'Employee checked in',
        ),
        audit(
          me.id,
          me.id,
          'attendance.submitted',
          old,
          { date, status: definition.code, reason: note },
          'Attendance saved with explicit work check-in',
        ),
      ]);
      return json({ ok: true, date });
    }
    if (b.action === 'checkOut') {
      const date = textValue(b.date, 10, true),
        old = await recordFor(me.id, date);
      requireValue(old && !old.check_out, 'There is no open check-in for this date.', 409);
      requireValue(
        old.revision === b.revision,
        'This record changed. Refresh before checking out.',
        409,
      );
      const snapshot: WorkSnapshot = JSON.parse(old.snapshot),
        breakMinutes = snapshot.policy.trackBreaks ? b.breakMinutes : 0;
      requireValue(
        Number.isInteger(breakMinutes) &&
          breakMinutes >= 0 &&
          breakMinutes <= (Date.now() - Date.parse(old.check_in)) / 60000,
        'Break minutes cannot exceed the recorded time.',
      );
      const stamp = now();
      await db().batch([
        guard(me.id, date, old.revision),
        writeRecord(
          me.id,
          date,
          { checkIn: old.check_in, checkOut: stamp, breakMinutes },
          snapshot,
          old.employee_note,
          old.manager_note,
        ),
        audit(
          me.id,
          me.id,
          'hours.check_out',
          old,
          { date, checkOut: stamp, breakMinutes },
          'Employee explicitly checked out',
        ),
      ]);
      return json({ ok: true });
    }
    if (b.action === 'requestCorrection') {
      const target = targetFor(me, people, b.employeeId || me.id);
      requireValue(target.id === me.id || team(me), 'Team access is required.', 403);
      const date = textValue(b.date, 10, true);
      requireValue(
        validDate(date) && date <= dayInZone(target.timezone),
        'Choose today or an earlier working date.',
      );
      const old = await recordFor(target.id, date),
        snapshot: WorkSnapshot = old ? JSON.parse(old.snapshot) : await snap(target, date),
        times = validateTimes(b.times, date, snapshot.timezone),
        reason = textValue(b.reason, 500, true);
      requireValue(
        b.revision === (old?.revision || 0),
        'The working-time record changed. Refresh before requesting a correction.',
        409,
      );
      const id = crypto.randomUUID();
      await db().batch([
        guard(target.id, date, old?.revision || 0),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM time_corrections WHERE employee_id=? AND date=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date),
        db()
          .prepare(
            'INSERT INTO time_corrections(id,employee_id,date,proposed,base_revision,status,requested_by,reason,created_at) VALUES (?,?,?,?,?,?,?,?,?)',
          )
          .bind(
            id,
            target.id,
            date,
            JSON.stringify({ ...times, snapshot }),
            old?.revision || 0,
            'pending',
            me.id,
            reason,
            now(),
          ),
        audit(me.id, target.id, 'hours.correction_requested', old, { id, date, ...times }, reason),
      ]);
      return json({ ok: true, id });
    }
    if (b.action === 'decideCorrection' || b.action === 'cancelCorrection') {
      const request = await db()
        .prepare('SELECT * FROM time_corrections WHERE id=?')
        .bind(String(b.id || ''))
        .first<any>();
      requireValue(request, 'Correction not found.', 404);
      const target = targetFor(me, people, request.employee_id),
        cancel = b.action === 'cancelCorrection';
      requireValue(
        cancel
          ? request.requested_by === me.id
          : team(me) && target.id !== me.id && request.requested_by !== me.id,
        'You cannot decide your own correction or another person’s cancellation.',
        403,
      );
      requireValue(request.status === 'pending', 'This request already has a decision.', 409);
      const decision = cancel ? 'cancelled' : textValue(b.decision, 20, true);
      requireValue(
        ['approved', 'declined', 'cancelled'].includes(decision) &&
          (cancel || decision !== 'cancelled'),
        'Choose approve or decline.',
      );
      const reason = cancel ? 'Requester cancelled the correction' : textValue(b.reason, 500, true),
        old = await recordFor(target.id, request.date),
        proposed = JSON.parse(request.proposed),
        statements = [
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM time_corrections WHERE id=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(request.id),
        ];
      if (decision === 'approved') {
        requireValue(
          (old?.revision || 0) === request.base_revision,
          'Working times changed since this request. Decline it and request a fresh correction.',
          409,
        );
        validateTimes(proposed, request.date, proposed.snapshot.timezone);
        const overlap = await db()
          .prepare(
            'SELECT date FROM work_records WHERE employee_id=? AND date<>? AND check_in<? AND (check_out IS NULL OR check_out>?)',
          )
          .bind(target.id, request.date, proposed.checkOut, proposed.checkIn)
          .first();
        requireValue(
          !overlap,
          'These times overlap another working-time record. Correct that record first.',
        );
        const attendance = await db()
          .prepare(
            'SELECT a.*,d.definition FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.employee_id=? AND a.date=?',
          )
          .bind(target.id, request.date)
          .first<any>();
        const configured = (await settings()).statuses;
        const previousDefinition = attendance?.definition
          ? JSON.parse(attendance.definition)
          : null;
        const definition =
          previousDefinition?.category === 'working'
            ? previousDefinition
            : configured.find((s) => s.enabled && s.category === 'working');
        requireValue(
          definition,
          'Configure a working attendance status before approving corrected hours.',
        );
        const stamp = now();
        statements.push(
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) AND COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(
              target.id,
              request.date,
              request.date,
              target.id,
              request.date,
              attendance?.updated_at || '',
            ),
          db()
            .prepare(
              "INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,'',?,?,?,'admin') ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason='',updated_at=excluded.updated_at,source='admin'",
            )
            .bind(
              target.id,
              request.date,
              definition.code,
              target.office,
              attendance?.submitted_at || stamp,
              stamp,
            ),
          db()
            .prepare(
              "INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,'approved',?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval='approved',decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note",
            )
            .bind(
              target.id,
              request.date,
              JSON.stringify({ ...definition, timezone: target.timezone }),
              me.id,
              stamp,
              reason,
            ),
          audit(
            me.id,
            target.id,
            'attendance.corrected',
            attendance,
            { date: request.date, status: definition.code, requestId: request.id },
            reason,
          ),
        );
        statements.push(
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND date<>? AND check_in<? AND (check_out IS NULL OR check_out>?)) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(target.id, request.date, proposed.checkOut, proposed.checkIn),
          guard(target.id, request.date, request.base_revision),
          writeRecord(
            target.id,
            request.date,
            proposed,
            proposed.snapshot,
            old?.employee_note || '',
            reason,
          ),
        );
      }
      statements.push(
        db()
          .prepare(
            'UPDATE time_corrections SET status=?,decided_by=?,decided_at=?,decision_note=? WHERE id=?',
          )
          .bind(decision, me.id, now(), reason, request.id),
        audit(
          me.id,
          target.id,
          'hours.correction_' + decision,
          old,
          { requestId: request.id, date: request.date, ...proposed },
          reason,
        ),
      );
      await db().batch(statements);
      return json({ ok: true });
    }
    if (b.action === 'overtimeDecision') {
      const target = targetFor(me, people, String(b.employeeId || ''));
      requireValue(team(me) && target.id !== me.id, 'You cannot approve your own overtime.', 403);
      const old = await recordFor(target.id, String(b.date || ''));
      requireValue(
        old && old.check_out && old.revision === b.revision,
        'This record changed or has not been checked out.',
        409,
      );
      const m = metrics(old, JSON.parse(old.snapshot), old.date);
      requireValue(
        m.overtimeMinutes !== null && m.overtimeMinutes > 0 && m.overtimeState === 'pending',
        'No overtime decision is pending.',
        409,
      );
      const decision = textValue(b.decision, 20, true),
        reason = textValue(b.reason, 500, true);
      requireValue(['approved', 'declined'].includes(decision), 'Choose approve or decline.');
      await db().batch([
        guard(target.id, old.date, old.revision),
        db()
          .prepare(
            'UPDATE work_records SET overtime_state=?,manager_note=?,revision=revision+1,updated_at=? WHERE employee_id=? AND date=?',
          )
          .bind(decision, reason, now(), target.id, old.date),
        audit(
          me.id,
          target.id,
          'hours.overtime_' + decision,
          old,
          { date: old.date, decision },
          reason,
        ),
      ]);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return failure(e);
  }
}
