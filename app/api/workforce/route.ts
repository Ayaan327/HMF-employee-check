import { databaseConflict } from '../../lib/conflicts';
import { getPlatformUser } from '../../platform-auth';
import {
  blankProfile,
  csv,
  currentVersions,
  dayInZone,
  effectiveSchedule,
  importColumns,
  InputError,
  parseCsv,
  requireValue,
  roles,
  sameValue,
  textValue,
  validDate,
  validZone,
  validateDays,
  validateProfile,
  weeklyMinutes,
  type Profile,
  type Role,
  type Status,
} from '../../lib/core';
import {
  audit,
  context,
  db,
  directoryGuard,
  employmentAccess,
  manages,
  now,
  passwordHash,
  publicPerson,
  revisionGuard,
  safePerson,
  schedules,
  scope,
  sensitiveAccess,
  settings,
  system,
  team,
  type Person,
} from '../../lib/store';

export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (error: unknown) => {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  console.error('HMF workforce', error);
  if (databaseConflict(error))
    return json({ error: 'This record changed. Reload it before saving again.' }, 409);
  if (String(error).includes('UNIQUE constraint'))
    return json({ error: 'An employee ID or email already exists. Reload and try again.' }, 409);
  return json({ error: 'The change could not be completed. Please try again.' }, 503);
};
const download = (name: string, rows: unknown[][]) =>
  new Response(csv(rows), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
function targetFor(me: Person, people: Person[], id: string) {
  const target = people.find((p) => p.id === id);
  requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
  return target;
}

export async function GET(req: Request) {
  try {
    const owner = await getPlatformUser();
    requireValue(owner, 'Sign in to open this private demo.', 401);
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    const query = new URL(req.url).searchParams,
      action = query.get('action') || 'config',
      config = await settings();
    if (action === 'config')
      return json({
        ...config,
        user: publicPerson(me),
        people: people
          .filter((p) => scope(me, p))
          .map((p) => ({
            id: p.id,
            name: p.name,
            office: p.office,
            roles: p.roles,
            active: p.active,
          })),
        today: dayInZone(me.timezone),
      });
    if (action === 'directory' || action === 'export') {
      requireValue(team(me), 'Team access is required.', 403);
      const search = (query.get('search') || '').toLowerCase(),
        office = query.get('office') || '',
        status = query.get('status') || '',
        department = query.get('department') || '',
        role = query.get('role') || '';
      const rows = people
        .filter(
          (p) =>
            scope(me, p) &&
            (!office || p.office === office) &&
            (!department || p.department === department) &&
            (!status || p.profile.employmentStatus === status) &&
            (!role || p.roles.includes(role as Role)) &&
            [p.id, p.name, p.email, p.department].some((v) => v.toLowerCase().includes(search)),
        )
        .map((p) => safePerson(me, p));
      if (action === 'export')
        return download('hmf-employee-directory', [
          [
            'Employee ID',
            'Name',
            'Email',
            'Office',
            'Department',
            'Job title',
            'Manager ID',
            'Employment status',
            'Roles',
          ],
          ...rows.map((p) => [
            p.id,
            p.name,
            p.email,
            p.office,
            p.department,
            p.profile.jobTitle,
            p.profile.managerId,
            p.profile.employmentStatus,
            p.roles.join('; '),
          ]),
        ]);
      return json({ people: rows });
    }
    if (action === 'template') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      return download('hmf-employee-import', [importColumns]);
    }
    if (action === 'templates') {
      const versions = await schedules(null);
      return json({ templates: currentVersions(versions), versions });
    }
    const target = targetFor(me, people, query.get('id') || me.id);
    if (action === 'profile')
      return json({
        person: safePerson(me, target),
        canEdit: employmentAccess(me, target),
        canSchedule: team(me) && scope(me, target) && (target.id !== me.id || manages(me)),
        today: dayInZone(target.timezone),
      });
    if (action === 'schedules') {
      const date = query.get('date') || dayInZone(target.timezone);
      requireValue(validDate(date), 'Choose a valid date.');
      const versions = await schedules(target.id);
      return json({
        versions,
        effective: effectiveSchedule(versions, date),
        date,
        timezone: target.timezone,
      });
    }
    if (action === 'audit' || action === 'settingsAudit') {
      const global = action === 'settingsAudit';
      requireValue(!global || system(me), 'System administrator access is required.', 403);
      const cursor = query.get('cursor') || '',
        parts = cursor.split('|');
      requireValue(
        !cursor || (parts.length === 2 && parts[0].length <= 30 && parts[1].length <= 60),
        'Invalid audit cursor.',
      );
      const found = (
        await db()
          .prepare(
            `SELECT a.*,e.name AS actor_name FROM audit_events a LEFT JOIN employees e ON e.id=a.actor_id WHERE ${global ? 'a.employee_id IS NULL' : 'a.employee_id=?'} ${cursor ? 'AND (a.created_at<? OR (a.created_at=? AND a.id<?))' : ''} ORDER BY a.created_at DESC,a.id DESC LIMIT 51`,
          )
          .bind(...(global ? [] : [target.id]), ...(cursor ? [parts[0], parts[0], parts[1]] : []))
          .all<any>()
      ).results;
      const rows = found.slice(0, 50),
        last = rows.at(-1),
        nextCursor = found.length > 50 ? last.created_at + '|' + last.id : null;
      const permitted = sensitiveAccess(me, target),
        full = employmentAccess(me, target) || me.id === target.id;
      if (
        !global &&
        permitted &&
        me.id !== target.id &&
        rows.some((r) => r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
      )
        await db().batch([
          audit(
            me.id,
            target.id,
            'privacy.audit_viewed',
            null,
            { recordCount: rows.length },
            'Authorized HR audit access',
          ),
        ]);
      return json({
        nextCursor,
        events: rows
          .filter(
            (r) =>
              full ||
              ![
                'employee.updated',
                'employee.created',
                'access.updated',
                'account.password_reset',
              ].includes(r.action),
          )
          .map((r) => ({
            ...r,
            before_value:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? null
                : r.before_value,
            after_value:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? null
                : r.after_value,
            reason:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? 'Attendance updated'
                : r.reason,
          })),
      });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return fail(e);
  }
}

type EmployeeInput = {
  id: string;
  name: string;
  email: string;
  office: string;
  department: string;
  profile: Profile;
  roles: Role[];
  officeScope: string[];
  revision: number;
  password?: string;
};
async function employeeInput(
  body: any,
  me: Person,
  people: Person[],
  isImport = false,
): Promise<EmployeeInput> {
  requireValue(body && typeof body === 'object', 'Complete the employee details.');
  const id = textValue(body.id, 60, true);
  requireValue(
    /^[A-Za-z0-9_-]+$/.test(id),
    'Employee IDs may contain letters, numbers, hyphens and underscores.',
  );
  const old = people.find((p) => p.id === id);
  if (old) requireValue(employmentAccess(me, old), 'You cannot manage this employee.', 403);
  else requireValue(manages(me), 'Employee management access is required.', 403);
  const name = textValue(body.name, 120, true),
    email = textValue(body.email, 254, true).toLowerCase(),
    office = textValue(body.office, 40, true),
    department = textValue(body.department, 120, true),
    profile = validateProfile(body.profile);
  requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Enter a valid company email.');
  requireValue(
    !people.some((p) => p.id !== id && p.email.toLowerCase() === email),
    'This company email is already assigned to another employee.',
  );
  const config = await settings();
  requireValue(
    config.offices.some((o) => o.code === office && (o.active || old?.office === office)),
    'Choose an active office.',
  );
  requireValue(
    config.departments.some(
      (d) => d.name === department && (d.active || old?.department === department),
    ),
    'Choose an active department.',
  );
  requireValue(
    system(me) || me.officeScope.includes(office),
    'This office is outside your access.',
    403,
  );
  if (profile.managerId) {
    const manager = people.find((p) => p.id === profile.managerId);
    requireValue(
      manager && manager.active && manager.roles.includes('manager') && manager.id !== id,
      'Choose an active manager other than this employee.',
    );
    let parent = manager;
    const visited = new Set([id]);
    while (parent) {
      requireValue(!visited.has(parent.id), 'Manager assignments cannot form a loop.');
      visited.add(parent.id);
      parent = people.find((p) => p.id === parent.profile.managerId)!;
    }
  }
  let grantRoles: Role[] = old?.roles || ['employee'],
    officeScope: string[] = old?.officeScope || [];
  if (body.roles !== undefined || body.officeScope !== undefined) {
    requireValue(system(me), 'Only a system administrator can change access.', 403);
    requireValue(
      Array.isArray(body.roles) &&
        body.roles.length > 0 &&
        body.roles.every((r: Role) => roles.includes(r)),
      'Choose valid access roles.',
    );
    grantRoles = Array.from(new Set(['employee', ...body.roles])) as Role[];
    requireValue(
      Array.isArray(body.officeScope) &&
        body.officeScope.every((o: string) => config.offices.some((x) => x.code === o)),
      'Choose valid authorized offices.',
    );
    officeScope = Array.from(new Set(body.officeScope));
    requireValue(
      !grantRoles.includes('hr_admin') || officeScope.length > 0,
      'Assign at least one office to HR access.',
    );
  }
  if (
    old?.roles.includes('system_admin') &&
    (!grantRoles.includes('system_admin') ||
      profile.employmentStatus !== 'active' ||
      (profile.endDate && profile.endDate < dayInZone(old.timezone)))
  )
    requireValue(
      people.some(
        (p) =>
          p.id !== id &&
          p.active &&
          p.roles.includes('system_admin') &&
          (!p.profile.endDate || p.profile.endDate >= dayInZone(p.timezone)),
      ),
      'Keep at least one active system administrator.',
    );
  requireValue(
    id !== me.id ||
      (profile.employmentStatus === 'active' &&
        grantRoles.includes('system_admin') === me.roles.includes('system_admin')),
    'Ask another system administrator to change your own account access.',
  );
  requireValue(
    !profile.endDate || id !== me.id || profile.endDate >= dayInZone(me.timezone),
    'You cannot end your own access retrospectively.',
  );
  if (profile.employmentStatus !== 'active' || !grantRoles.includes('manager'))
    requireValue(
      !people.some((p) => p.id !== id && p.active && p.profile.managerId === id),
      'Reassign this manager’s active reports first.',
    );
  let password: string | undefined;
  if (body.password) {
    requireValue(
      system(me) && !isImport,
      'Only a system administrator can set demo passwords.',
      403,
    );
    password = textValue(body.password, 128, true);
    requireValue(password.length >= 12, 'Use a demo password of at least 12 characters.');
  }
  requireValue(
    Number.isInteger(body.revision) && body.revision === (old?.revision || 0),
    'This profile changed. Reload it before saving.',
    409,
  );
  return {
    id,
    name,
    email,
    office,
    department,
    profile,
    roles: grantRoles,
    officeScope,
    revision: body.revision,
    password,
  };
}
async function employeeStatements(
  input: EmployeeInput,
  me: Person,
  people: Person[],
  reason: string,
  source = 'portal',
) {
  const old = people.find((p) => p.id === input.id),
    stamp = now(),
    statements = [revisionGuard(input.id, input.revision)];
  if (!old) {
    const salt = crypto.randomUUID(),
      hash = input.password ? await passwordHash(input.password, salt) : '!unset';
    statements.push(
      db()
        .prepare(
          'INSERT INTO employees(id,name,email,office,department,role,password_hash,salt,active) VALUES (?,?,?,?,?,?,?,?,?)',
        )
        .bind(
          input.id,
          input.name,
          input.email,
          input.office,
          input.department,
          'employee',
          hash,
          salt,
          input.profile.employmentStatus === 'active' ? 1 : 0,
        ),
    );
  } else
    statements.push(
      db()
        .prepare('UPDATE employees SET name=?,email=?,office=?,department=?,active=? WHERE id=?')
        .bind(
          input.name,
          input.email,
          input.office,
          input.department,
          input.profile.employmentStatus === 'active' ? 1 : 0,
          input.id,
        ),
    );
  statements.push(
    db()
      .prepare(
        'INSERT INTO employee_profiles(employee_id,data,revision,created_at,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(employee_id) DO UPDATE SET data=excluded.data,revision=employee_profiles.revision+1,updated_at=excluded.updated_at',
      )
      .bind(input.id, JSON.stringify(input.profile), 1, old ? old.createdAt : stamp, stamp),
  );
  statements.push(
    db()
      .prepare(
        'INSERT INTO access_grants(employee_id,roles,offices) VALUES (?,?,?) ON CONFLICT(employee_id) DO UPDATE SET roles=excluded.roles,offices=excluded.offices',
      )
      .bind(input.id, JSON.stringify(input.roles), JSON.stringify(input.officeScope)),
  );
  if (old && input.password) {
    const salt = crypto.randomUUID();
    statements.push(
      db()
        .prepare('UPDATE employees SET password_hash=?,salt=? WHERE id=?')
        .bind(await passwordHash(input.password, salt), salt, input.id),
    );
    statements.push(
      audit(me.id, input.id, 'account.password_reset', null, { reset: true }, reason, source),
    );
  }
  if (
    old &&
    (input.password ||
      input.email !== old.email ||
      input.profile.employmentStatus !== 'active' ||
      JSON.stringify(old.roles) !== JSON.stringify(input.roles) ||
      JSON.stringify(old.officeScope) !== JSON.stringify(input.officeScope))
  )
    statements.push(db().prepare('DELETE FROM sessions WHERE employee_id=?').bind(input.id));
  const { password: _secret, ...safe } = input;
  statements.push(
    audit(
      me.id,
      input.id,
      old ? 'employee.updated' : 'employee.created',
      old ? { ...old } : null,
      safe,
      reason,
      source,
    ),
  );
  if (
    old &&
    (JSON.stringify(old.roles) !== JSON.stringify(input.roles) ||
      JSON.stringify(old.officeScope) !== JSON.stringify(input.officeScope))
  )
    statements.push(
      audit(
        me.id,
        input.id,
        'access.updated',
        { roles: old.roles, offices: old.officeScope },
        { roles: input.roles, offices: input.officeScope },
        reason,
        source,
      ),
    );
  return statements;
}

export async function POST(req: Request) {
  try {
    const owner = await getPlatformUser();
    requireValue(owner, 'Sign in to open this private demo.', 401);
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
    requireValue(raw.length <= 240000, 'This request is too large.', 413);
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    if (body.action === 'employee') {
      const reason = textValue(body.reason, 500, true),
        input = await employeeInput(body.employee, me, people);
      await db().batch([
        directoryGuard(people),
        ...(await employeeStatements(input, me, people, reason)),
      ]);
      return json({ ok: true, id: input.id });
    }
    if (body.action === 'schedule') {
      const target = body.employeeId ? targetFor(me, people, String(body.employeeId)) : null;
      requireValue(
        team(me) && (!target || (scope(me, target) && (target.id !== me.id || manages(me)))),
        'You cannot manage this schedule.',
        403,
      );
      const reason = textValue(body.reason, 500, true),
        name = textValue(body.name, 120, true),
        days = validateDays(body.days),
        kind = textValue(body.kind, 20, true);
      requireValue(
        target ? ['base', 'temporary'].includes(kind) : kind === 'template',
        'Choose a valid schedule type.',
      );
      const startDate = target ? textValue(body.startDate, 10, true) : null,
        endDate = target ? textValue(body.endDate || '', 10) : null;
      requireValue(
        !target ||
          (validDate(startDate!) && (!endDate || (validDate(endDate) && endDate >= startDate!))),
        'Choose valid effective dates.',
      );
      requireValue(kind !== 'temporary' || !!endDate, 'Temporary schedules need an end date.');
      const versions = await schedules(target?.id || null),
        current = currentVersions(versions);
      const prior = body.seriesId ? current.find((s) => s.series_id === body.seriesId) : null;
      requireValue(
        target || !prior || manages(me) || prior.created_by === me.id,
        'You can revise only your own templates.',
        403,
      );
      requireValue(!body.seriesId || prior, 'This schedule version was not found.');
      requireValue(
        !prior ||
          (prior.kind === kind &&
            prior.start_date === (startDate || null) &&
            prior.end_date === (endDate || null)),
        'Keep the original period when revising a schedule; create a new version period to change effective dates.',
      );
      requireValue(
        !prior || body.previousId === prior.id,
        'This schedule changed. Reload before saving.',
        409,
      );
      if (kind === 'temporary')
        requireValue(
          !current.some(
            (s) =>
              s.kind === 'temporary' &&
              s.series_id !== prior?.series_id &&
              s.start_date! <= endDate! &&
              s.end_date! >= startDate!,
          ),
          'This temporary schedule overlaps another. Revise the existing period instead.',
        );
      if (kind === 'base')
        requireValue(
          !current.some(
            (s) =>
              s.kind === 'base' && s.series_id !== prior?.series_id && s.start_date === startDate,
          ),
          'A normal schedule already starts on this date. Revise that version instead.',
        );
      if (body.templateId)
        requireValue(
          (await schedules(null)).some((s) => s.id === body.templateId),
          'Template version not found.',
        );
      const id = crypto.randomUUID(),
        series = prior?.series_id || id,
        stamp = new Date(
          Math.max(Date.now(), versions[0] ? Date.parse(versions[0].created_at) + 1 : 0),
        ).toISOString();
      const saved = {
        id,
        series_id: series,
        employee_id: target?.id || null,
        name,
        kind,
        start_date: startDate || null,
        end_date: endDate || null,
        days,
        template_id: body.templateId || null,
        reason,
        created_by: me.id,
        created_at: stamp,
      };
      // The guard is inside D1's atomic batch, preventing concurrent edits from silently winning.
      const guard = db()
        .prepare(
          "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT id FROM schedule_versions WHERE series_id=? ORDER BY created_at DESC,id DESC LIMIT 1),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
        )
        .bind(series, prior?.id || '');
      // Serialize all assignments for an employee (including creation of new periods).
      const latest = versions[0]?.id || '';
      const assignmentGuard = db()
        .prepare(
          `INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT id FROM schedule_versions WHERE ${target ? 'employee_id=?' : 'employee_id IS NULL'} ORDER BY created_at DESC,id DESC LIMIT 1),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid`,
        )
        .bind(...(target ? [target.id] : []), latest);
      await db().batch([
        guard,
        assignmentGuard,
        db()
          .prepare(
            'INSERT INTO schedule_versions(id,series_id,employee_id,name,kind,start_date,end_date,days,template_id,reason,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          )
          .bind(
            id,
            series,
            target?.id || null,
            name,
            kind,
            startDate || null,
            endDate || null,
            JSON.stringify(days),
            body.templateId || null,
            reason,
            me.id,
            stamp,
          ),
        audit(me.id, target?.id || null, 'schedule.saved', prior || null, saved, reason),
      ]);
      return json({ ok: true, schedule: saved, weeklyMinutes: weeklyMinutes(days) });
    }
    if (body.action === 'setting') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const reason = textValue(body.reason, 500, true),
        kind = textValue(body.kind, 20, true),
        value = body.value;
      requireValue(value && typeof value === 'object', 'Complete the setting.');
      const code = textValue(value.code, 120, true);
      let data: unknown;
      const config = await settings();
      if (kind === 'office') {
        requireValue(/^[A-Z0-9_-]{2,40}$/.test(code), 'Use a short uppercase office code.');
        const timezone = textValue(value.timezone, 80, true);
        requireValue(validZone(timezone), 'Enter a valid time zone.');
        const country = textValue(value.country, 2, true);
        requireValue(/^[A-Z]{2}$/.test(country), 'Use a two-letter country code.');
        requireValue(typeof value.active === 'boolean', 'Choose whether the office is active.');
        data = {
          code,
          name: textValue(value.name, 120, true),
          timezone,
          country,
          active: value.active,
        };
      } else if (kind === 'department') {
        requireValue(typeof value.active === 'boolean', 'Choose whether the department is active.');
        data = { code, name: code, active: value.active };
      } else if (kind === 'status') {
        requireValue(
          /^[a-z][a-z0-9_]{1,39}$/.test(code) && !['pending', 'unavailable'].includes(code),
          'Use a unique lowercase status code. No response is reserved.',
        );
        requireValue(
          ['working', 'leave', 'absence', 'nonworking', 'unconfigured'].includes(value.category),
          'Choose how this status is counted.',
        );
        for (const key of ['explanation', 'approval', 'sensitive', 'enabled'])
          requireValue(typeof value[key] === 'boolean', 'Complete all status options.');
        requireValue(
          !['absent', 'other', 'sick_leave'].includes(code) || value.sensitive,
          'Legacy absence and sickness notes must remain private.',
        );
        requireValue(
          !value.enabled ||
            (value.category !== 'leave' && !['annual_leave', 'unpaid_leave'].includes(code)),
          'Leave booking opens in Phase 3. Keep leave statuses disabled for now.',
        );
        data = {
          code,
          label: textValue(value.label, 80, true),
          category: value.category,
          explanation: value.explanation,
          approval: value.approval,
          sensitive: value.sensitive,
          enabled: value.enabled,
        };
      } else throw new InputError('Unknown setting.');
      const old =
        (kind === 'office'
          ? config.offices
          : kind === 'department'
            ? config.departments
            : config.statuses
        ).find((x) => x.code === code) || null;
      const existing = await db()
        .prepare('SELECT data FROM directory_settings WHERE kind=? AND code=?')
        .bind(kind, code)
        .first<{ data: string }>();
      requireValue(
        sameValue(body.previous ?? null, old),
        'This setting changed. Reload before saving.',
        409,
      );
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind=? AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(kind, code, existing?.data || ''),
        db()
          .prepare(
            'INSERT INTO directory_settings(kind,code,data,updated_at) VALUES (?,?,?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at',
          )
          .bind(kind, code, JSON.stringify(data), now()),
        audit(me.id, null, 'setting.' + kind, old, data, reason),
      ]);
      return json({ ok: true });
    }
    if (body.action === 'importPreview') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      const rows = parseCsv(textValue(body.csv, 200000, true)),
        valid: EmployeeInput[] = [],
        errors: { row: number; message: string }[] = [];
      const ids = new Set<string>(),
        emails = new Set<string>();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        try {
          requireValue(
            !ids.has(row.id) && !emails.has(row.email.toLowerCase()),
            'Duplicate ID or email in this file.',
          );
          ids.add(row.id);
          emails.add(row.email.toLowerCase());
          requireValue(
            !people.some(
              (p) => p.id === row.id || p.email.toLowerCase() === row.email.toLowerCase(),
            ),
            'An employee with this ID or email already exists. Imports add new people only.',
          );
          const p = {
            ...blankProfile,
            jobTitle: row.jobTitle || '',
            managerId: row.managerId || '',
            employmentType: row.employmentType || '',
            startDate: row.startDate || '',
            weeklyMinutes: row.weeklyHours ? Number(row.weeklyHours) * 60 : null,
            timezone: row.timezone || '',
          };
          valid.push(await employeeInput({ ...row, profile: p, revision: 0 }, me, people, true));
        } catch (e) {
          errors.push({ row: i + 2, message: e instanceof Error ? e.message : 'Invalid row.' });
        }
      }
      if (errors.length) return json({ errors, rows: valid, total: rows.length, previewId: null });
      const id = crypto.randomUUID();
      await db().batch([
        db().prepare('DELETE FROM import_previews WHERE expires_at<?').bind(Date.now()),
        db()
          .prepare(
            'INSERT INTO import_previews(id,actor_id,rows,expires_at,used_at) VALUES (?,?,?,?,NULL)',
          )
          .bind(id, me.id, JSON.stringify(valid), Date.now() + 15 * 60 * 1000),
      ]);
      return json({ errors: [], rows: valid, total: rows.length, previewId: id });
    }
    if (body.action === 'importConfirm') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      const reason = textValue(body.reason, 500, true),
        id = textValue(body.previewId, 80, true);
      const preview = await db()
        .prepare(
          'SELECT * FROM import_previews WHERE id=? AND actor_id=? AND expires_at>? AND used_at IS NULL',
        )
        .bind(id, me.id, Date.now())
        .first<{ rows: string }>();
      requireValue(
        preview,
        'This import preview expired or was used. Preview the file again.',
        409,
      );
      const inputs = JSON.parse(preview.rows) as EmployeeInput[];
      const statements = [
        directoryGuard(people),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM import_previews WHERE id=? AND actor_id=? AND used_at IS NULL AND expires_at>?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(id, me.id, Date.now()),
      ];
      for (const input of inputs) {
        requireValue(
          !people.some((p) => p.id === input.id),
          'An employee in this import already exists. Preview it again.',
          409,
        );
        const { roles: _roles, officeScope: _scope, ...plain } = input;
        const revalidated = await employeeInput(plain, me, people, true);
        statements.push(
          ...(await employeeStatements(revalidated, me, people, reason, 'csv-import')),
        );
      }
      statements.push(
        db().prepare('UPDATE import_previews SET used_at=? WHERE id=?').bind(now(), id),
      );
      await db().batch(statements);
      return json({ ok: true, count: inputs.length });
    }
    if (body.action === 'attendanceDecision') {
      const target = targetFor(me, people, textValue(body.employeeId, 60, true));
      requireValue(target.id !== me.id && team(me), 'You cannot approve your own attendance.', 403);
      const date = textValue(body.date, 10, true),
        decision = textValue(body.decision, 20, true),
        reason = textValue(body.reason, 500, true);
      requireValue(
        validDate(date) && ['approved', 'declined'].includes(decision),
        'Choose a valid decision and date.',
      );
      const previous = await db()
        .prepare(
          'SELECT d.*,a.updated_at FROM attendance_details d JOIN attendance a ON a.employee_id=d.employee_id AND a.date=d.date WHERE d.employee_id=? AND d.date=?',
        )
        .bind(target.id, date)
        .first<any>();
      requireValue(
        previous?.approval === 'pending' && previous.updated_at === body.expectedUpdatedAt,
        'This submission changed or no longer needs a decision. Refresh before deciding.',
        409,
      );
      const stamp = now();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM attendance_details d JOIN attendance a ON a.employee_id=d.employee_id AND a.date=d.date WHERE d.employee_id=? AND d.date=? AND d.approval='pending' AND a.updated_at=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, body.expectedUpdatedAt),
        db()
          .prepare(
            'UPDATE attendance_details SET approval=?,decided_by=?,decided_at=?,decision_note=? WHERE employee_id=? AND date=?',
          )
          .bind(decision, me.id, stamp, reason, target.id, date),
        audit(me.id, target.id, 'attendance.decision', previous, { date, decision }, reason),
      ]);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return fail(e);
  }
}
