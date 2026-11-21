import { env } from 'cloudflare:workers';
import { databaseConflict } from '../../lib/conflicts';
import { getChatGPTUser } from '../../chatgpt-auth';
import { dateRange } from '../../lib/hours';
import {
  csv,
  dayInZone,
  defaultOffices,
  InputError,
  requireValue,
  textValue,
  validDate,
} from '../../lib/core';
import {
  attendanceRows,
  audit,
  context,
  db,
  digest,
  directory,
  now,
  passwordHash,
  publicPerson,
  redactAttendance,
  scope,
  sensitiveAccess,
  sessionToken,
  settings,
  team,
  type Account,
} from '../../lib/store';

export const dynamic = 'force-dynamic';

const dayIn = (office: string) =>
  dayInZone(defaultOffices.find((o) => o.code === office)?.timezone || 'Europe/London');
const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } });
const cookie = (req: Request, token: string, maxAge: number) =>
  `hmf_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${new URL(req.url).protocol === 'https:' ? '; Secure' : ''}`;
function equal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let c = 0;
  for (let i = 0; i < a.length; i++) c |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return c === 0;
}
async function officeDates() {
  return Object.fromEntries((await settings()).offices.map((o) => [o.code, dayInZone(o.timezone)]));
}
const failure = (error: unknown) => {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  if (databaseConflict(error))
    return json({ error: 'This record changed. Refresh before trying again.' }, 409);
  console.error('HMF attendance', error);
  return json({ error: 'The attendance service is unavailable. Please try again.' }, 503);
};
async function seed() {
  if (await db().prepare("SELECT id FROM employees WHERE id='ADMIN'").first()) return;
  const demo = env as unknown as { HMF_DEMO_MODE?: string; HMF_DEMO_PASSWORD?: string };
  if (demo.HMF_DEMO_MODE !== 'true') return;
  requireValue(
    demo.HMF_DEMO_PASSWORD && demo.HMF_DEMO_PASSWORD.length >= 12,
    'Demo setup requires an administrator-supplied password.',
    503,
  );
  const password = demo.HMF_DEMO_PASSWORD;
  const salt = crypto.randomUUID(),
    hash = await passwordHash(password, salt);
  const names = [
    'Oliver Bennett',
    'Amelia Clarke',
    'James Wilson',
    'Sophie Taylor',
    'Daniel Brooks',
    'Charlotte Evans',
    'Thomas Reed',
    'Isla Morgan',
    'Henry Lewis',
    'Grace Foster',
    'William Hughes',
    'Emily Parker',
    'Ahmed Khan',
    'Ayesha Malik',
    'Hassan Ali',
    'Fatima Ahmed',
    'Omar Siddiqui',
    'Zainab Shah',
    'Bilal Hussain',
    'Maryam Raza',
    'Hamza Iqbal',
    'Sara Mahmood',
    'Usman Tariq',
    'Noor Farooq',
  ];
  const depts = [
    'Electrical Engineering',
    'Project Management',
    'Civil Engineering',
    'Grid Connections',
  ];
  const statements = [
    db()
      .prepare('INSERT OR IGNORE INTO employees VALUES (?,?,?,?,?,?,?,?,1)')
      .bind(
        'ADMIN',
        'HMF Administrator',
        'admin@hmf.example',
        'UK',
        'Management',
        'admin',
        hash,
        salt,
      ),
  ];
  for (const [i, name] of names.entries()) {
    const salt = crypto.randomUUID(),
      hash = await passwordHash(password, salt);
    const office = i < 12 ? 'UK' : 'PK',
      id = `HMF-${String(i + 1).padStart(3, '0')}`;
    const email =
      i === 0
        ? 'employee.uk@hmf.example'
        : i === 12
          ? 'employee.pk@hmf.example'
          : `${name.toLowerCase().replace(' ', '.')}@hmf.example`;
    statements.push(
      db()
        .prepare('INSERT OR IGNORE INTO employees VALUES (?,?,?,?,?,?,?,?,1)')
        .bind(id, name, email, office, depts[i % 4], 'employee', hash, salt),
    );
    for (let n = 0; n < 14; n++) {
      const dateObj = new Date(`${dayIn(office)}T12:00:00Z`);
      dateObj.setUTCDate(dateObj.getUTCDate() - n);
      if (n > 0 && [0, 6].includes(dateObj.getUTCDay())) continue;
      if (n === 0 && (i === 0 || i === 12 || i % 7 === 0)) continue;
      const date = dateObj.toISOString().slice(0, 10),
        v = (i + n) % 12;
      const status = v === 3 ? 'absent' : v === 6 || v === 9 ? 'other' : 'present';
      const reason =
        status === 'absent'
          ? 'Approved leave'
          : status === 'other'
            ? v === 6
              ? 'Working remotely'
              : 'Client site visit'
            : '';
      const submitted = new Date(
        `${date}T${office === 'PK' ? '04' : '09'}:${String(3 + (i % 23)).padStart(2, '0')}:00Z`,
      ).toISOString();
      statements.push(
        db()
          .prepare('INSERT OR IGNORE INTO attendance VALUES (?,?,?,?,?,?,?,?)')
          .bind(id, date, status, reason, office, submitted, submitted, 'sample'),
      );
    }
  }
  await db().batch(statements);
}

export async function GET(req: Request) {
  try {
    const owner = await getChatGPTUser();
    if (!owner)
      return json({ error: 'Please sign in to open this private preview.', signIn: true }, 401);
    const ctx = await context(req, owner.userId);
    if (!ctx) return json({ user: null }, 401);
    const { me, people } = ctx;
    const query = new URL(req.url).searchParams,
      action = query.get('action') || 'me';
    if (action === 'me')
      return json({
        user: publicPerson(me),
        today: dayInZone(me.timezone),
        officeDates: await officeDates(),
      });
    if (action === 'mine')
      return json({ today: dayInZone(me.timezone), records: await attendanceRows(me, me) });
    requireValue(team(me), 'Team access is required.', 403);
    if (action === 'report') {
      const start = query.get('start') || '';
      const end = query.get('end') || '';
      dateRange(start, end);
      const targets = new Map(
        people.filter((person) => scope(me, person)).map((person) => [person.id, person]),
      );
      const viewer = { ...me, roles: me.roles.filter((role) => role !== 'hr_admin') };
      const records = await db()
        .prepare(
          'SELECT a.*, d.definition, d.approval FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.date BETWEEN ? AND ? ORDER BY a.date,a.employee_id',
        )
        .bind(start, end)
        .all<Record<string, any>>();
      const rows: unknown[][] = [
        ['Date', 'Employee ID', 'Name', 'Office', 'Status', 'Submitted UTC', 'Source'],
      ];
      for (const raw of records.results) {
        const person = targets.get(raw.employee_id);
        if (!person) continue;
        const record = redactAttendance(viewer, person, raw);
        rows.push([
          raw.date,
          person.id,
          person.name,
          raw.office,
          record.label,
          record.submitted_at,
          record.source,
        ]);
      }
      return new Response(csv(rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="hmf-attendance-${start}-to-${end}.csv"`,
          'Cache-Control': 'no-store',
        },
      });
    }
    if (action === 'history') {
      const target = people.find((p) => p.id === query.get('id'));
      requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
      const permitted = sensitiveAccess(me, target),
        records = await attendanceRows(me, target);
      const audits = (
        await db()
          .prepare(
            'SELECT a.*,e.name AS actor_name FROM audits a LEFT JOIN employees e ON e.id=a.actor_id WHERE a.employee_id=? ORDER BY changed_at DESC LIMIT 30',
          )
          .bind(target.id)
          .all<any>()
      ).results.map((a) =>
        permitted
          ? a
          : {
              ...a,
              reason: 'Attendance updated',
              status: ['present', 'remote', 'client', 'travel', 'training'].includes(a.status)
                ? a.status
                : 'unavailable',
              previous_status: null,
            },
      );
      if (permitted && me.id !== target.id && records.some((r) => r.reason))
        await db().batch([
          audit(
            me.id,
            target.id,
            'privacy.notes_viewed',
            null,
            { recordCount: records.length },
            'Authorized HR history access',
          ),
        ]);
      return json({
        records,
        audits,
        accessEvents: (
          await db()
            .prepare(
              'SELECT id,event,occurred_at,office FROM access_events WHERE employee_id=? ORDER BY occurred_at DESC LIMIT 60',
            )
            .bind(target.id)
            .all()
        ).results,
      });
    }
    if (action === 'dashboard' || action === 'export') {
      const date = query.get('date') || dayInZone(me.timezone),
        office = query.get('office') || 'all',
        config = await settings();
      requireValue(
        validDate(date) && (office === 'all' || config.offices.some((o) => o.code === office)),
        'Invalid date or office.',
      );
      const targets = people.filter(
        (p) => p.id !== 'ADMIN' && scope(me, p) && (office === 'all' || p.office === office),
      );
      const records = (
        await db()
          .prepare(
            'SELECT a.*,d.definition,d.approval FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.date=?',
          )
          .bind(date)
          .all<any>()
      ).results;
      const rows: Array<ReturnType<typeof publicPerson> & Record<string, any>> = [];
      for (const p of targets) {
        const rawRecord = records.find((r) => r.employee_id === p.id);
        if (!p.active && !rawRecord) continue;
        const record = rawRecord
          ? redactAttendance(
              { ...me, roles: me.roles.filter((r) => r !== 'hr_admin') },
              p,
              rawRecord,
            )
          : {
              status: 'pending',
              label: 'No response',
              reason: '',
              submitted_at: null,
              updated_at: null,
              source: null,
              approval: 'not_required',
            };
        rows.push({ ...publicPerson(p), ...record });
      }
      if (action === 'export')
        return new Response(
          csv([
            [
              'Employee ID',
              'Name',
              'Email',
              'Office',
              'Department',
              'Attendance date',
              'Status',
              'Reason',
              'Submitted UTC',
              'Data source',
              'Approval',
            ],
            ...rows.map((r) => [
              r.id,
              r.name,
              r.email,
              r.office,
              r.department,
              date,
              r.label,
              r.reason,
              r.submitted_at,
              r.source || 'No submission',
              r.approval || '',
            ]),
          ]),
          {
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': `attachment; filename="hmf-attendance-${date}-${office}.csv"`,
              'Cache-Control': 'no-store',
            },
          },
        );
      return json({ rows, date, office, officeDates: await officeDates(), refreshedAt: now() });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return failure(e);
  }
}

export async function POST(req: Request) {
  try {
    const owner = await getChatGPTUser();
    if (!owner)
      return json({ error: 'Please sign in to open this private preview.', signIn: true }, 401);
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
    requireValue(raw.length <= 4096, 'Request too large.', 413);
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    if (body.action === 'login') {
      requireValue(
        typeof body.email === 'string' &&
          typeof body.password === 'string' &&
          body.email.length <= 254 &&
          body.password.length <= 128,
        'Enter a valid email and password.',
      );
      await seed();
      const key = owner.userId,
        stamp = Date.now();
      await db()
        .prepare(
          'INSERT INTO login_attempts(key,count,window_start) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN window_start<? THEN 1 ELSE count+1 END,window_start=CASE WHEN window_start<? THEN excluded.window_start ELSE window_start END',
        )
        .bind(key, stamp, stamp - 900000, stamp - 900000)
        .run();
      const attempt = await db()
        .prepare('SELECT count FROM login_attempts WHERE key=?')
        .bind(key)
        .first<{ count: number }>();
      requireValue(
        !attempt || attempt.count <= 20,
        'Too many sign-in attempts. Try again in 15 minutes.',
        429,
      );
      const found = await db()
        .prepare('SELECT * FROM employees WHERE email=? AND active=1')
        .bind(body.email.trim().toLowerCase())
        .first<Account>();
      const hash = await passwordHash(body.password, found?.salt || crypto.randomUUID()),
        person = found ? (await directory()).find((p) => p.id === found.id) : null;
      requireValue(
        found &&
          person &&
          equal(hash, found.password_hash) &&
          person.profile.employmentStatus === 'active' &&
          (!person.profile.endDate || person.profile.endDate >= dayInZone(person.timezone)),
        'Email or password is incorrect. Check your details and try again.',
        401,
      );
      requireValue(
        !body.office ||
          body.office === 'assigned' ||
          (await settings()).offices.some((o) => o.code === body.office),
        'Choose a valid office.',
      );
      requireValue(
        !body.office ||
          body.office === 'assigned' ||
          body.office === person.office ||
          person.roles.includes('system_admin'),
        'Please select the office assigned to your account.',
        403,
      );
      const token = crypto.randomUUID() + crypto.randomUUID();
      await db().batch([
        db().prepare('DELETE FROM login_attempts WHERE key=?').bind(key),
        db().prepare('DELETE FROM sessions WHERE expires_at<?').bind(stamp),
        db()
          .prepare(
            'INSERT INTO sessions(token_hash,employee_id,owner_id,expires_at) VALUES (?,?,?,?)',
          )
          .bind(await digest(token), found.id, owner.userId, stamp + 8 * 3600000),
        db()
          .prepare(
            'INSERT INTO access_events(id,employee_id,event,occurred_at,office) VALUES (?,?,?,?,?)',
          )
          .bind(crypto.randomUUID(), found.id, 'sign_in', now(), found.office),
      ]);
      return json(
        {
          user: publicPerson(person),
          today: dayInZone(person.timezone),
          officeDates: await officeDates(),
        },
        200,
        { 'Set-Cookie': cookie(req, token, 8 * 3600) },
      );
    }
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    if (body.action === 'logout') {
      await db().batch([
        db()
          .prepare('DELETE FROM sessions WHERE token_hash=?')
          .bind(await digest(sessionToken(req))),
        db()
          .prepare(
            'INSERT INTO access_events(id,employee_id,event,occurred_at,office) VALUES (?,?,?,?,?)',
          )
          .bind(crypto.randomUUID(), me.id, 'sign_out', now(), me.office),
      ]);
      return json({ ok: true }, 200, { 'Set-Cookie': cookie(req, '', 0) });
    }
    if (body.action === 'attendance' || body.action === 'correct') {
      const correcting = body.action === 'correct';
      requireValue(!correcting || team(me), 'Team access is required.', 403);
      const target = correcting ? people.find((p) => p.id === String(body.employeeId || '')) : me;
      requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
      requireValue(
        !correcting || target.id !== me.id,
        'Ask another authorized person to correct your attendance.',
        403,
      );
      const date = correcting ? String(body.date || '') : dayInZone(target.timezone);
      requireValue(
        validDate(date) && date <= dayInZone(target.timezone),
        'Choose today or an earlier date.',
      );
      const definition = (await settings()).statuses.find((s) => s.code === body.status);
      requireValue(definition?.enabled, 'Choose an available attendance status.');
      const reason = textValue(body.reason || '', 500),
        note = textValue(body.correctionReason || '', 500);
      requireValue(
        !definition.explanation || !!reason,
        'Please give a short explanation. Do not include medical details.',
      );
      requireValue(!correcting || !!note, 'Please explain this correction for the audit history.');
      const previous = await db()
        .prepare('SELECT * FROM attendance WHERE employee_id=? AND date=?')
        .bind(target.id, date)
        .first<any>();
      const stamp = new Date(
          Math.max(Date.now(), previous ? Date.parse(previous.updated_at) + 1 : 0),
        ).toISOString(),
        approval = definition.approval
          ? correcting && target.id !== me.id
            ? 'approved'
            : 'pending'
          : 'not_required';
      requireValue(
        !(await db()
          .prepare(
            "SELECT id FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?",
          )
          .bind(target.id, date, date)
          .first()),
        'Approved leave must be resolved before changing attendance.',
        409,
      );
      const next = {
        employee_id: target.id,
        date,
        status: definition.code,
        reason,
        office: target.office,
        submitted_at: previous?.submitted_at || stamp,
        updated_at: stamp,
        source: correcting ? 'admin' : 'employee',
        approval,
        definition: { ...definition, timezone: target.timezone },
      };
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, previous?.updated_at || ''),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, date),
        db()
          .prepare(
            'INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason=excluded.reason,updated_at=excluded.updated_at,source=excluded.source',
          )
          .bind(
            target.id,
            date,
            definition.code,
            reason,
            target.office,
            stamp,
            stamp,
            correcting ? 'admin' : 'employee',
          ),
        db()
          .prepare(
            'INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval=excluded.approval,decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note',
          )
          .bind(
            target.id,
            date,
            JSON.stringify({ ...definition, timezone: target.timezone }),
            approval,
            approval === 'approved' ? me.id : null,
            approval === 'approved' ? stamp : null,
            approval === 'approved' ? note : null,
          ),
        db()
          .prepare(
            'INSERT INTO audits(id,employee_id,date,actor_id,previous_status,status,reason,changed_at) VALUES (?,?,?,?,?,?,?,?)',
          )
          .bind(
            crypto.randomUUID(),
            target.id,
            date,
            me.id,
            previous?.status || null,
            definition.code,
            correcting ? note : 'Employee submitted attendance',
            stamp,
          ),
        audit(
          me.id,
          target.id,
          correcting ? 'attendance.corrected' : 'attendance.submitted',
          previous,
          next,
          correcting ? note : 'Employee submitted attendance',
        ),
      ]);
      return json({ ok: true, date, status: definition.code, approval, updatedAt: stamp });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return failure(e);
  }
}
