import { effectiveSchedule, paidMinutes, requireValue, validDate, type Schedule } from './core';

export type LeavePolicy = {
  start: string;
  end: string;
  holidays: { date: string; name: string }[];
  allowPastRequests?: boolean;
};
export type LeaveCharge = {
  unit: string;
  start: string;
  end: string;
  days: { date: string; amount: number }[];
};

export function leaveDates(start: string, end: string) {
  requireValue(
    validDate(start) &&
      validDate(end) &&
      start <= end &&
      (Date.parse(end) - Date.parse(start)) / 86400000 < 366,
    'Choose a valid date range of no more than 366 days.',
  );
  return Array.from({ length: (Date.parse(end) - Date.parse(start)) / 86400000 + 1 }, (_, i) =>
    new Date(Date.parse(start + 'T12:00:00Z') + i * 86400000).toISOString().slice(0, 10),
  );
}

export function chargeLeave(
  start: string,
  end: string,
  unit: string,
  policy: LeavePolicy,
  versions: Schedule[],
): LeaveCharge {
  requireValue(
    unit === 'days' || unit === 'hours',
    'Choose days or hours for the leave entitlement.',
  );
  const dates = leaveDates(start, end);
  requireValue(
    start >= policy.start && end <= policy.end,
    'Choose dates within the configured leave period.',
  );
  const holidays = new Set(policy.holidays.map((h) => h.date));
  const days = dates.flatMap((date) => {
    if (holidays.has(date)) return [];
    const schedule = effectiveSchedule(versions, date);
    const shift = schedule?.days[new Date(date + 'T12:00:00Z').getUTCDay()];
    requireValue(
      shift,
      'A work schedule is required for every requested date. Ask your administrator.',
    );
    if (!shift.working) return [];
    const minutes = paidMinutes(shift);
    requireValue(
      unit === 'days' || minutes !== null,
      'Configure paid hours and break rules before requesting hourly entitlement.',
    );
    return [{ date, amount: unit === 'days' ? 1 : minutes! / 60 }];
  });
  return { unit, start: policy.start, end: policy.end, days };
}

export const chargeTotal = (charge: LeaveCharge) =>
  Math.round(charge.days.reduce((sum, day) => sum + day.amount, 0) * 1000000) / 1000000;
