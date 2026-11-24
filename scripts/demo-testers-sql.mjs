// Creates demo testers for a NEW demo database from a simple CSV, as SQL for `wrangler d1 execute`.
//   node scripts/demo-testers-sql.mjs deploy/my-testers.csv > demo-testers.sql
// CSV columns: name,email,office,role,manager,department,job title
//   office: UK or PK · role: employee | manager | hr | admin · manager: the manager's email (optional)
// Options: --start 1 (first DEMO-NN number; use the next free one for later batches) --allowance 25 (demo leave days per person) --year-start / --year-end (default: 12 months
//          from the first day of this month)
//          --actor HMF-ADMIN-1 (an existing system administrator recorded as the creator in the audit trail)
// Testers sign in with their own email (Cloudflare Access one-time code); nobody gets a password.
// The leave figures are DEMO VALUES ONLY, not HMF policy.
import { readFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';
import ts from 'typescript';

const source = readFileSync(new URL('../app/lib/core.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { validateProfile, validateDays, blankProfile, blankDays, defaultOffices } = await import(
  'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
);

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf('--' + name);
  return i >= 0 ? args[i + 1] : fallback;
};
const file = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
if (!file) {
  console.error('Usage: node scripts/demo-testers-sql.mjs <testers.csv> [--allowance 25] [--year-start YYYY-MM-DD] [--year-end YYYY-MM-DD] [--actor HMF-ADMIN-1] > demo-testers.sql');
  process.exit(1);
}
// Default demo leave year: 12 months from the first day of the current month.
const today = new Date();
const defaultStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
const defaultEnd = new Date(Date.UTC(today.getUTCFullYear() + 1, today.getUTCMonth(), 0));
const allowance = Number(option('allowance', '25'));
const yearStart = option('year-start', defaultStart.toISOString().slice(0, 10));
const yearEnd = option('year-end', defaultEnd.toISOString().slice(0, 10));
const actor = option('actor', 'HMF-ADMIN-1');
// --start N: first DEMO-NN number, so testers can be added in several batches without clashing IDs.
const startNumber = Number(option('start', '1'));
if (!Number.isInteger(startNumber) || startNumber < 1 || startNumber > 900) {
  console.error('Not created: --start must be a whole number from 1.');
  process.exit(1);
}
const fail = (message) => {
  console.error('Not created: ' + message);
  process.exit(1);
};
if (!(allowance >= 0 && allowance <= 365)) fail('--allowance must be between 0 and 365 days.');
if (!/^\d{4}-\d{2}-\d{2}$/.test(yearStart) || !/^\d{4}-\d{2}-\d{2}$/.test(yearEnd) || yearEnd < yearStart || (Date.parse(yearEnd) - Date.parse(yearStart)) / 864e5 >= 366)
  fail('Check --year-start and --year-end (at most 366 days apart).');

// Small CSV reader (quotes, commas, line breaks). The app's import reader deliberately rejects
// role columns; this admin-only setup script needs them.
function readCsv(text) {
  const records = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') (field += '"'), i++;
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') row.push(field), (field = '');
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field), (field = '');
      if (row.some((v) => v.trim())) records.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v.trim())) records.push(row);
  const [header = [], ...body] = records;
  const keys = header.map((h) => h.replace(/^\uFEFF/, '').trim().toLowerCase());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])));
}
const rows = readCsv(readFileSync(file, 'utf8'));
if (!rows.length) fail('the CSV has no testers.');
if (rows.length > 50) fail('more than 50 testers (the free Cloudflare Access plan covers 50 people).');
const offices = new Map(defaultOffices.map((o) => [o.code, o]));
const roleSets = { employee: ['employee'], manager: ['employee', 'manager'], hr: ['employee', 'hr_admin'], admin: ['employee', 'hr_admin', 'system_admin'] };
const people = rows.map((row, i) => {
  const line = `row ${i + 2}`;
  const name = (row.name || '').trim();
  const email = (row.email || '').trim().toLowerCase();
  const office = (row.office || '').trim().toUpperCase();
  const role = (row.role || 'employee').trim().toLowerCase();
  if (!name || name.length > 120) fail(`${line}: name is required.`);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(`${line}: "${row.email}" is not an email address.`);
  if (!offices.has(office)) fail(`${line}: office must be UK or PK.`);
  if (!roleSets[role]) fail(`${line}: role must be employee, manager, hr or admin.`);
  return { line, id: `DEMO-${String(startNumber + i).padStart(2, '0')}`, name, email, office, role, managerEmail: (row.manager || '').trim().toLowerCase(), department: (row.department || '').trim() || 'Engineering', jobTitle: (row['job title'] || '').trim() };
});
const byEmail = new Map(people.map((p) => [p.email, p]));
if (byEmail.size !== people.length) fail('two testers share an email address.');
for (const p of people) {
  if (!p.managerEmail) continue;
  const manager = byEmail.get(p.managerEmail);
  if (!manager) fail(`${p.line}: manager ${p.managerEmail} is not in the list.`);
  if (manager.role === 'employee') fail(`${p.line}: ${manager.name} must have role manager (or hr/admin) to approve leave.`);
  if (manager === p) fail(`${p.line}: someone cannot be their own manager.`);
}
if (!people.some((p) => p.role === 'admin') && actor === 'HMF-ADMIN-1') console.error('Note: no tester has role admin; the first administrator from first-admin-sql.mjs stays the only admin.');

// Standard demo week: Monday–Friday 09:00–17:30 with an unpaid 30-minute break (37.5 paid hours).
const days = validateDays(blankDays.map((d) => (d.day >= 1 && d.day <= 5 ? { ...d, working: true, start: '09:00', finish: '17:30', breakMinutes: 30, paidBreak: false } : d)));
const q = (v) => (v === null ? 'NULL' : "'" + String(v).replace(/'/g, "''") + "'");
const now = new Date().toISOString();
const reason = 'Demo tester setup (fictional leave figures)';
const out = ['-- HMF Attendance demo testers. Plain INSERTs: re-running fails safely instead of duplicating.'];
const audit = (employeeId, action, after) =>
  `INSERT INTO audit_events(id,employee_id,actor_id,action,before_value,after_value,reason,source,created_at) VALUES (${q(crypto.randomUUID())},${q(employeeId)},${q(actor)},${q(action)},NULL,${q(JSON.stringify(after))},${q(reason)},'demo-setup',${q(now)});`;

for (const office of new Set(people.map((p) => p.office))) {
  const policy = { start: yearStart, end: yearEnd, holidays: [], allowPastRequests: true };
  out.push(`INSERT INTO directory_settings(kind,code,data,updated_at) VALUES ('leave_policy',${q(office)},${q(JSON.stringify(policy))},${q(now)}) ON CONFLICT(kind,code) DO NOTHING;`);
  out.push(audit(null, 'leave.policy', { office, ...policy }));
}
for (const p of people) {
  const profile = validateProfile({ ...blankProfile, jobTitle: p.jobTitle, managerId: p.managerEmail ? byEmail.get(p.managerEmail).id : '', startDate: yearStart, employmentStatus: 'active', employmentType: 'full-time', weeklyMinutes: 2250, holidayAllowance: allowance, carriedForward: 0, holidayUnit: 'days' });
  const roles = roleSets[p.role];
  const scope = p.role === 'admin' ? [...offices.keys()] : p.role === 'hr' ? [p.office] : [];
  out.push(`INSERT INTO employees(id,name,email,office,department,role,password_hash,salt,active) VALUES (${[p.id, p.name, p.email, p.office, p.department, 'employee', '!unset', crypto.randomUUID()].map(q).join(',')},1);`);
  out.push(`INSERT INTO employee_profiles(employee_id,data,revision,created_at,updated_at) VALUES (${q(p.id)},${q(JSON.stringify(profile))},1,${q(now)},${q(now)});`);
  out.push(`INSERT INTO access_grants(employee_id,roles,offices) VALUES (${q(p.id)},${q(JSON.stringify(roles))},${q(JSON.stringify(scope))});`);
  const scheduleId = crypto.randomUUID();
  out.push(`INSERT INTO schedule_versions(id,series_id,employee_id,name,kind,start_date,end_date,days,template_id,reason,created_by,created_at) VALUES (${[scheduleId, scheduleId, p.id, 'Standard week (demo)', 'base', yearStart].map(q).join(',')},NULL,${q(JSON.stringify(days))},NULL,${q(reason)},${q(actor)},${q(now)});`);
  out.push(audit(p.id, 'employee.created', { id: p.id, name: p.name, email: p.email, office: p.office, department: p.department, roles, officeScope: scope, profile }));
  out.push(audit(p.id, 'schedule.saved', { id: scheduleId, name: 'Standard week (demo)', days }));
}
process.stdout.write(out.join('\n') + '\n');
console.error(`Prepared ${people.length} testers (${people.map((p) => `${p.id} ${p.name} [${p.role}]`).join(', ')}).`);
console.error(`Demo leave: ${allowance} days, year ${yearStart} to ${yearEnd}, Mon–Fri 09:00–17:30 schedules.`);
