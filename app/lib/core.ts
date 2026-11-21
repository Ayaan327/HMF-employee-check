export type Role = 'employee' | 'manager' | 'hr_admin' | 'system_admin';
export const roles: Role[] = ['employee', 'manager', 'hr_admin', 'system_admin'];
export type Office = {
  code: string;
  name: string;
  country: string;
  timezone: string;
  active: boolean;
};
export type Status = {
  code: string;
  label: string;
  category: 'working' | 'leave' | 'absence' | 'nonworking' | 'unconfigured';
  explanation: boolean;
  approval: boolean;
  sensitive: boolean;
  enabled: boolean;
};
export type Day = {
  day: number;
  working: boolean;
  start: string;
  finish: string;
  overnight: boolean;
  breakMinutes: number;
  paidBreak: boolean | null;
  arrangement: string;
};
export type Profile = {
  telephone: string;
  jobTitle: string;
  managerId: string;
  startDate: string;
  endDate: string;
  employmentStatus: string;
  employmentType: string;
  weeklyMinutes: number | null;
  timezone: string;
  holidayAllowance: number | null;
  carriedForward: number | null;
  holidayUnit: string;
};
export const defaultOffices: Office[] = [
  { code: 'UK', name: 'United Kingdom', country: 'UK', timezone: 'Europe/London', active: true },
  { code: 'PK', name: 'Pakistan', country: 'PK', timezone: 'Asia/Karachi', active: true },
];
export const defaultDepartments = [
  'Electrical Engineering',
  'Project Management',
  'Civil Engineering',
  'Grid Connections',
  'Management',
];
export const defaultStatuses: Status[] = [
  {
    code: 'present',
    label: 'Working in the office',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'remote',
    label: 'Working remotely',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'client',
    label: 'Working at a client site',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'travel',
    label: 'Business travel',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'training',
    label: 'Training',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'absent',
    label: 'Absent',
    category: 'absence',
    explanation: false,
    approval: false,
    sensitive: true,
    enabled: true,
  },
  {
    code: 'other',
    label: 'Other',
    category: 'unconfigured',
    explanation: true,
    approval: false,
    sensitive: true,
    enabled: true,
  },
  ...[
    ['annual_leave', 'Annual leave', 'leave'],
    ['sick_leave', 'Sick leave', 'absence'],
    ['authorized_absence', 'Authorized absence', 'absence'],
    ['unpaid_leave', 'Unpaid leave', 'leave'],
    ['not_scheduled', 'Not scheduled to work', 'nonworking'],
  ].map(([code, label, category]) => ({
    code,
    label,
    category: category as Status['category'],
    explanation: false,
    approval: true,
    sensitive: true,
    enabled: false,
  })),
];
export const blankProfile: Profile = {
  telephone: '',
  jobTitle: '',
  managerId: '',
  startDate: '',
  endDate: '',
  employmentStatus: 'active',
  employmentType: '',
  weeklyMinutes: null,
  timezone: '',
  holidayAllowance: null,
  carriedForward: null,
  holidayUnit: 'days',
};
export const blankDays: Day[] = Array.from({ length: 7 }, (_, day) => ({
  day,
  working: false,
  start: '',
  finish: '',
  overnight: false,
  breakMinutes: 0,
  paidBreak: null,
  arrangement: 'office',
}));
export class InputError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function requireValue(ok: unknown, message: string, status = 400): asserts ok {
  if (!ok) throw new InputError(message, status);
}
export function textValue(value: unknown, max = 200, required = false) {
  requireValue(typeof value === 'string', 'Enter text in this field.');
  const v = value.trim();
  requireValue(
    v.length <= max && (!required || !!v),
    required ? 'Complete required fields within the stated limits.' : 'This value is too long.',
  );
  return v;
}
export function validDate(s: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number.isFinite(Date.parse(s)) &&
    new Date(s + 'T12:00:00Z').toISOString().slice(0, 10) === s
  );
}
export function dayInZone(zone: string, now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}
export function validZone(zone: string) {
  try {
    new Intl.DateTimeFormat('en', { timeZone: zone }).format();
    return true;
  } catch {
    return false;
  }
}
export function numeric(value: unknown, max: number, integer = false): number | null {
  if (value === null || value === '') return null;
  requireValue(
    typeof value === 'number' &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= max &&
      (!integer || Number.isInteger(value)),
    'Enter a valid non-negative number.',
  );
  return value;
}
export function validateProfile(input: unknown): Profile {
  requireValue(input && typeof input === 'object', 'Employee details are required.');
  const p = input as Profile;
  const result: Profile = {
    telephone: textValue(p.telephone, 40),
    jobTitle: textValue(p.jobTitle, 120),
    managerId: textValue(p.managerId, 60),
    startDate: textValue(p.startDate, 10),
    endDate: textValue(p.endDate, 10),
    employmentStatus: textValue(p.employmentStatus, 20),
    employmentType: textValue(p.employmentType, 20),
    weeklyMinutes: numeric(p.weeklyMinutes, 10080, true),
    timezone: textValue(p.timezone, 80),
    holidayAllowance: numeric(p.holidayAllowance, 10000),
    carriedForward: numeric(p.carriedForward, 10000),
    holidayUnit: textValue(p.holidayUnit, 10),
  };
  requireValue(
    ['active', 'inactive', 'suspended', 'former'].includes(result.employmentStatus),
    'Choose an employment status.',
  );
  requireValue(
    ['', 'full-time', 'part-time', 'temporary', 'contractor'].includes(result.employmentType),
    'Choose an employment type.',
  );
  requireValue(
    ['days', 'hours'].includes(result.holidayUnit),
    'Choose days or hours for holiday allowance.',
  );
  requireValue(!result.timezone || validZone(result.timezone), 'Choose a valid time zone.');
  requireValue(
    !result.startDate || validDate(result.startDate),
    'Enter a valid employment start date.',
  );
  requireValue(!result.endDate || validDate(result.endDate), 'Enter a valid employment end date.');
  requireValue(
    !result.startDate || !result.endDate || result.endDate >= result.startDate,
    'The final employment date must follow the start date.',
  );
  return result;
}
export function validateDays(input: unknown): Day[] {
  requireValue(
    Array.isArray(input) && input.length === 7,
    'A schedule must describe all seven days.',
  );
  const days = input.map((d, i) => {
    requireValue(
      d && d.day === i && typeof d.working === 'boolean',
      'Schedule days must run from Sunday to Saturday.',
    );
    if (!d.working) return { ...blankDays[i] };
    requireValue(
      typeof d.start === 'string' &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(d.start) &&
        typeof d.finish === 'string' &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(d.finish),
      'Enter a start and finish time for every working day.',
    );
    requireValue(
      typeof d.overnight === 'boolean' && [true, false, null].includes(d.paidBreak),
      'Choose the break and overnight rules.',
    );
    const breakMinutes = numeric(d.breakMinutes, 1439, true);
    requireValue(breakMinutes !== null, 'Enter a break duration, including zero.');
    requireValue(
      ['office', 'remote', 'hybrid', 'client-site'].includes(d.arrangement),
      'Choose a working arrangement.',
    );
    const row: Day = {
      day: i,
      working: true,
      start: d.start,
      finish: d.finish,
      overnight: d.overnight,
      breakMinutes,
      paidBreak: d.paidBreak,
      arrangement: d.arrangement,
    };
    const duration = span(row);
    requireValue(
      duration > 0 && duration <= 1440,
      'Finish must be after start. Select next day for an overnight shift.',
    );
    requireValue(breakMinutes < duration, 'A break must be shorter than the shift.');
    return row;
  });
  for (let i = 0; i < 7; i++) {
    const d = days[i],
      next = days[(i + 1) % 7];
    if (d.working && d.overnight && next.working)
      requireValue(
        clock(d.finish) <= clock(next.start),
        'Overnight shifts must not overlap the following day.',
      );
  }
  return days;
}
const clock = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export const span = (d: Day) =>
  d.working ? clock(d.finish) - clock(d.start) + (d.overnight ? 1440 : 0) : 0;
export const paidMinutes = (d: Day) =>
  !d.working
    ? 0
    : d.breakMinutes > 0 && d.paidBreak === null
      ? null
      : span(d) - (d.paidBreak ? 0 : d.breakMinutes);
export function weeklyMinutes(days: Day[]) {
  const values = days.map(paidMinutes);
  return values.some((v) => v === null) ? null : values.reduce<number>((s, v) => s + (v || 0), 0);
}
export type Schedule = {
  id: string;
  series_id: string;
  employee_id: string | null;
  name: string;
  kind: string;
  start_date: string | null;
  end_date: string | null;
  days: Day[];
  template_id: string | null;
  reason: string;
  created_by: string;
  created_at: string;
};
export function currentVersions(schedules: Schedule[]) {
  const seen = new Set<string>();
  return [...schedules]
    .sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))
    .filter((s) => !seen.has(s.series_id) && !!seen.add(s.series_id));
}
export function effectiveSchedule(schedules: Schedule[], date: string) {
  const current = currentVersions(schedules)
    .filter((s) => s.kind !== 'template' && s.start_date! <= date)
    .sort(
      (a, b) =>
        b.start_date!.localeCompare(a.start_date!) || b.created_at.localeCompare(a.created_at),
    );
  const temporary = current.find((s) => s.kind === 'temporary' && s.end_date! >= date);
  if (temporary) return temporary;
  const normal = current.find((s) => s.kind === 'base');
  return normal && (!normal.end_date || normal.end_date >= date) ? normal : null;
}
export const csvCell = (v: unknown) =>
  typeof v === 'number' && Number.isFinite(v)
    ? String(v)
    : '"' +
      String(v ?? '')
        .replace(/^[\s]*[=+@\-]/, "'$&")
        .replace(/^[\t\r]/, "'$&")
        .replace(/"/g, '""') +
      '"';
export function csv(rows: unknown[][]) {
  return '\uFEFF' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
}
export const importColumns = [
  'id',
  'name',
  'email',
  'office',
  'department',
  'jobTitle',
  'managerId',
  'employmentType',
  'startDate',
  'weeklyHours',
  'timezone',
];
export function sameValue(a: unknown, b: unknown): boolean {
  const stable = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(stable)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.entries(value)
              .sort(([x], [y]) => x.localeCompare(y))
              .map(([k, v]) => [k, stable(v)]),
          )
        : value;
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}
export function parseCsv(input: string): Record<string, string>[] {
  requireValue(input.length <= 200000, 'Import a CSV smaller than 200 KB.');
  const rows: string[][] = [];
  let row: string[] = [],
    field = '',
    quoted = false;
  input = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') {
        field += '"';
        i++;
      } else if (quoted) {
        quoted = false;
        requireValue(
          [',', '\n', '\r', undefined].includes(input[i + 1]),
          'Invalid quoted CSV field.',
        );
      } else {
        requireValue(!field, 'Invalid quote in CSV.');
        quoted = true;
      }
    } else if (c === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  requireValue(!quoted, 'Close all quoted CSV fields.');
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const headers = rows.shift()?.map((s) => s.trim());
  requireValue(
    headers && headers.length && new Set(headers).size === headers.length,
    'CSV headers must be unique.',
  );
  requireValue(
    ['id', 'name', 'email', 'office', 'department'].every((h) => headers.includes(h)) &&
      headers.every((h) => importColumns.includes(h)),
    'Use the downloadable CSV template. Unsupported columns cannot be imported.',
  );
  requireValue(
    rows.length > 0 && rows.length <= 50,
    'Import between 1 and 50 employees at a time.',
  );
  return rows.map((r, i) => {
    requireValue(r.length === headers.length, `Row ${i + 2} has the wrong number of columns.`);
    return Object.fromEntries(headers.map((h, n) => [h, r[n].trim()]));
  });
}
