import { db, type Person } from './store';

export async function availability(people: Person[], start: string, end: string) {
  const ids = JSON.stringify(people.map((p) => p.id));
  const [leave, calendars] = await Promise.all([
    db()
      .prepare(
        `SELECT r.employee_id,r.start_date,r.end_date,d.snapshot FROM leave_requests r
      LEFT JOIN leave_request_details d ON d.request_id=r.id WHERE r.status='approved'
      AND r.employee_id IN (SELECT value FROM json_each(?)) AND r.start_date<=? AND r.end_date>=?`,
      )
      .bind(ids, end, start)
      .all<{
        employee_id: string;
        start_date: string;
        end_date: string;
        snapshot: string | null;
      }>(),
    db()
      .prepare(
        "SELECT code,data FROM directory_settings WHERE kind='leave_policy' AND code IN (SELECT value FROM json_each(?))",
      )
      .bind(JSON.stringify([...new Set(people.map((p) => p.office))]))
      .all<{ code: string; data: string }>(),
  ]);
  const approved = leave.results.map((r) => ({
    ...r,
    dates: r.snapshot
      ? new Set<string>(JSON.parse(r.snapshot).days.map((d: { date: string }) => d.date))
      : null,
  }));
  const holidays = new Map(
    calendars.results.map((r) => [
      r.code,
      new Set<string>(JSON.parse(r.data).holidays.map((h: { date: string }) => h.date)),
    ]),
  );
  return (person: Person, date: string) =>
    !!holidays.get(person.office)?.has(date) ||
    approved.some(
      (r) =>
        r.employee_id === person.id &&
        (r.dates ? r.dates.has(date) : r.start_date <= date && r.end_date >= date),
    );
}
