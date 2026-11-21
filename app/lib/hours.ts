import {
  dayInZone,
  effectiveSchedule,
  paidMinutes,
  requireValue,
  validDate,
  type Schedule,
} from './core';
export type HoursPolicy = {
  trackBreaks: boolean;
  breaksPaid: boolean | null;
  overtimeEnabled: boolean;
  overtimeApproval: boolean;
  graceMinutes: number | null;
  submissionDeadline: string;
  overtimeThresholdMinutes?: number;
};
export const defaultHoursPolicy: HoursPolicy = {
  trackBreaks: false,
  breaksPaid: null,
  overtimeEnabled: false,
  overtimeApproval: true,
  graceMinutes: null,
  submissionDeadline: '',
};
export type WorkRecord = {
  employee_id: string;
  date: string;
  check_in: string;
  check_out: string | null;
  break_minutes: number;
  snapshot: string;
  revision: number;
  employee_note: string;
  manager_note: string;
  overtime_state: string;
  updated_at: string;
};
export type WorkSnapshot = {
  timezone: string;
  scheduleId: string | null;
  scheduledMinutes: number | null;
  working: boolean | null;
  start: string;
  finish: string;
  overnight: boolean;
  policy: HoursPolicy;
};
export function snapshotFor(
  versions: Schedule[],
  date: string,
  timezone: string,
  policy: HoursPolicy,
): WorkSnapshot {
  const schedule = effectiveSchedule(versions, date),
    day = schedule?.days[new Date(date + 'T12:00:00Z').getUTCDay()];
  return {
    timezone,
    scheduleId: schedule?.id || null,
    scheduledMinutes: day ? paidMinutes(day) : null,
    working: day?.working ?? null,
    start: day?.start || '',
    finish: day?.finish || '',
    overnight: day?.overnight || false,
    policy: {
      ...policy,
      breaksPaid:
        day && day.breakMinutes > 0 && day.paidBreak !== null ? day.paidBreak : policy.breaksPaid,
    },
  };
}
export function localMinutes(instant: string, zone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(instant));
  return (
    Number(parts.find((x) => x.type === 'hour')!.value) * 60 +
    Number(parts.find((x) => x.type === 'minute')!.value)
  );
}
const clock = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export function localWall(instant: string, zone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(instant));
  const get = (k: string) => parts.find((p) => p.type === k)!.value;
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}
export function wallCandidates(value: string, zone: string) {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(value) || !Number.isFinite(Date.parse(value + 'Z')))
    return [];
  const candidates: string[] = [];
  for (let offset = -840; offset <= 840; offset += 15) {
    const instant = new Date(Date.parse(value + 'Z') - offset * 60000).toISOString();
    if (localWall(instant, zone) === value) candidates.push(instant);
  }
  return candidates.sort();
}
export function dayDifference(a: string, b: string) {
  return Math.round((Date.parse(a + 'T00:00:00Z') - Date.parse(b + 'T00:00:00Z')) / 86400000);
}
export function metrics(
  record: WorkRecord | null,
  snapshot: WorkSnapshot,
  date: string,
  at = new Date(),
  submittedAt?: string,
  excused = false,
) {
  const elapsed = record?.check_out
    ? (Date.parse(record.check_out) - Date.parse(record.check_in)) / 60000
    : null;
  const recorded =
    elapsed === null
      ? null
      : record!.break_minutes > 0 && snapshot.policy.breaksPaid === null
        ? null
        : Math.max(
            0,
            Math.round(
              elapsed - (snapshot.policy.breaksPaid === false ? record!.break_minutes : 0),
            ),
          );
  const difference =
    recorded === null || snapshot.scheduledMinutes === null
      ? null
      : recorded - snapshot.scheduledMinutes;
  const localDate = dayInZone(snapshot.timezone, at),
    sinceStart =
      dayDifference(localDate, date) * 1440 + localMinutes(at.toISOString(), snapshot.timezone);
  const finished =
    snapshot.working && !!snapshot.finish
      ? sinceStart > clock(snapshot.finish) + (snapshot.overnight ? 1440 : 0)
      : localDate > date;
  const lateCheckIn =
    record && snapshot.working && snapshot.start && snapshot.policy.graceMinutes !== null
      ? dayDifference(dayInZone(snapshot.timezone, new Date(record.check_in)), date) * 1440 +
          localMinutes(record.check_in, snapshot.timezone) >
        clock(snapshot.start) + snapshot.policy.graceMinutes
      : null;
  const lateSubmission =
    submittedAt && snapshot.policy.submissionDeadline
      ? dayDifference(dayInZone(snapshot.timezone, new Date(submittedAt)), date) * 1440 +
          localMinutes(submittedAt, snapshot.timezone) >
        clock(snapshot.policy.submissionDeadline)
      : null;
  const overtime =
    snapshot.policy.overtimeEnabled && difference !== null
      ? difference >= (snapshot.policy.overtimeThresholdMinutes ?? 1)
        ? difference
        : 0
      : null;
  return {
    scheduledMinutes: snapshot.scheduledMinutes,
    recordedMinutes: recorded,
    differenceMinutes: difference,
    overtimeMinutes: overtime,
    overtimeState:
      overtime === null
        ? 'disabled'
        : overtime === 0
          ? 'none'
          : snapshot.policy.overtimeApproval
            ? record?.overtime_state || 'pending'
            : 'not_required',
    missingCheckIn: !excused && !!snapshot.working && !record && !!finished,
    missingCheckOut: !excused && !!record && !record.check_out && !!finished,
    lateCheckIn: !!lateCheckIn,
    lateSubmission: !!lateSubmission,
    lateRuleConfigured: snapshot.policy.graceMinutes !== null,
    submissionRuleConfigured: !!snapshot.policy.submissionDeadline,
  };
}
export function dateRange(start: string, end: string) {
  requireValue(
    validDate(start) && validDate(end) && end >= start && dayDifference(end, start) <= 61,
    'Choose a date range of no more than 62 days.',
  );
  return Array.from({ length: dayDifference(end, start) + 1 }, (_, i) =>
    new Date(Date.parse(start + 'T12:00:00Z') + i * 86400000).toISOString().slice(0, 10),
  );
}
export function validateTimes(value: any, date: string, timezone: string) {
  requireValue(value && typeof value === 'object', 'Enter the corrected times.');
  const checkIn = String(value.checkIn || ''),
    checkOut = String(value.checkOut || '');
  requireValue(
    /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|[+-]\d\d:\d\d)$/.test(checkIn) &&
      Number.isFinite(Date.parse(checkIn)),
    'Check-in must include a UTC offset.',
  );
  requireValue(
    /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|[+-]\d\d:\d\d)$/.test(checkOut) &&
      Number.isFinite(Date.parse(checkOut)),
    'Check-out must include a UTC offset.',
  );
  requireValue(
    Date.parse(checkOut) > Date.parse(checkIn) && Date.parse(checkOut) <= Date.now(),
    'Check-out must be after check-in and cannot be in the future.',
  );
  requireValue(
    Date.parse(checkOut) - Date.parse(checkIn) <= 24 * 60 * 60000,
    'A corrected interval cannot exceed 24 hours.',
  );
  requireValue(
    dayInZone(timezone, new Date(checkIn)) === date,
    'Check-in must fall on the selected working date in the employee’s time zone.',
  );
  requireValue(
    Number.isInteger(value.breakMinutes) &&
      value.breakMinutes >= 0 &&
      value.breakMinutes < (Date.parse(checkOut) - Date.parse(checkIn)) / 60000,
    'Break duration must be non-negative and shorter than the recorded time.',
  );
  return {
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    breakMinutes: value.breakMinutes,
  };
}
