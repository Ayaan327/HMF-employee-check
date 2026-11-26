'use client';
import { useEffect, useState } from 'react';
import { useWorkforce } from './workforce-context';
import { sessionEnded } from './session-expiry';
import { defaultHoursPolicy, localWall, wallCandidates, type HoursPolicy } from './lib/hours';
export async function hoursApi(action: string, body?: object, query = ''): Promise<any> {
  const r = await fetch(
    '/api/hours' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...body }),
        }
      : { cache: 'no-store' },
  );
  const d: any = await r.json();
  sessionEnded(r.status);
  if (!r.ok) throw new Error(d.error || 'Unable to load working hours.');
  return d;
}
const amount = (v: number | null | undefined) =>
  v === null || v === undefined ? 'Not available' : `${Number((v / 60).toFixed(2))} h`;
const stamp = (v: string | null, zone: string) =>
  v
    ? new Date(v).toLocaleString('en-GB', {
        timeZone: zone,
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
// Table formatting: short weekday dates, times only (full stamp if the time falls on another day).
const dayLabel = (d: string) =>
  new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
const clock = (v: string | null | undefined, zone: string, date: string) => {
  if (!v) return '—';
  const local = new Date(v).toLocaleDateString('en-CA', { timeZone: zone });
  return local === date
    ? new Date(v).toLocaleTimeString('en-GB', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
      })
    : stamp(v, zone);
};
const hoursCell = (v: number | null | undefined) =>
  v === null || v === undefined ? '—' : `${Number((v / 60).toFixed(2))} h`;
const Feedback = ({ error, success }: { error: string; success?: string }) => (
  <>
    {error && (
      <div className="error" role="alert">
        {error}
      </div>
    )}
    {success && (
      <div className="success" role="status">
        {success}
      </div>
    )}
  </>
);

export function WorkClock({ changed }: { changed?: () => void }) {
  const { config } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [status, setStatus] = useState('present'),
    [note, setNote] = useState(''),
    [breakMinutes, setBreakMinutes] = useState(0),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [busy, setBusy] = useState(false);
  async function load() {
    try {
      setData(await hoursApi('today'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (data.open)
        await hoursApi('checkOut', {
          date: data.open.date,
          revision: data.open.revision,
          breakMinutes,
        });
      else await hoursApi('checkIn', { status, note });
      setSuccess(data.open ? 'You have checked out.' : 'You have checked in.');
      await load();
      changed?.();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const open = data?.open,
    openSnapshot = open ? JSON.parse(open.snapshot) : null;
  const reminder =
    open && data?.today !== open.date
      ? 'You still have an open check-in from a previous day. Check out or request a correction in Hours.'
      : data?.metrics?.missingCheckOut
        ? 'Your scheduled shift has ended and your check-in is still open.'
        : '';
  return (
    <section className="work-clock">
      <h2>Working time</h2>
      <Feedback error={error} success={success} />
      {reminder && (
        <p className="error" role="status">
          {reminder}
        </p>
      )}
      {!data ? (
        <p role="status">
          {error ? (
            <button className="secondary" onClick={load}>
              Retry
            </button>
          ) : (
            'Loading working time…'
          )}
        </p>
      ) : (
        <>
          <p className="muted">
            {open
              ? 'Checked in ' +
                stamp(open.check_in, openSnapshot.timezone) +
                ' · ' +
                openSnapshot.timezone
              : data.record
                ? 'Checked out ' + stamp(data.record.check_out, data.snapshot.timezone)
                : 'Not checked in today'}
          </p>
          {!data.record || open ? (
            <form onSubmit={submit}>
              {!open && (
                <>
                  <label>
                    Working location
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      {config.statuses
                        .filter((s) => s.enabled && s.category === 'working')
                        .map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </label>
                  {config.statuses.find((s) => s.code === status)?.explanation ? (
                    <label>
                      Work note
                      <textarea
                        required
                        maxLength={500}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </label>
                  ) : null}
                </>
              )}
              {open && openSnapshot.policy.trackBreaks && (
                <label>
                  Total break minutes
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Number(e.target.value))}
                  />
                  <small>Enter your actual breaks, including zero if none.</small>
                </label>
              )}
              <button className="primary" disabled={busy}>
                {busy ? 'Saving…' : open ? 'Check out' : 'Check in'}
              </button>
            </form>
          ) : (
            <p>
              Recorded time: <strong>{amount(data.metrics.recordedMinutes)}</strong>. Corrections
              can be requested from Hours.
            </p>
          )}
          <p className="secure-note">
            Check out explicitly when you finish. Signing out or closing the browser leaves your
            check-in open.
          </p>
        </>
      )}
    </section>
  );
}

export function HoursView({ teamView = false }: { teamView?: boolean }) {
  const { config } = useWorkforce(),
    [rows, setRows] = useState<any[]>([]),
    [start, setStart] = useState(''),
    [end, setEnd] = useState(''),
    [mode, setMode] = useState(teamView ? 'day' : 'week'),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(true),
    [employee, setEmployee] = useState(''),
    [office, setOffice] = useState(''),
    [filter, setFilter] = useState('all'),
    [page, setPage] = useState(1),
    [revision, setRevision] = useState(0),
    [correction, setCorrection] = useState<any>(null),
    [decision, setDecision] = useState<any>(null),
    [decisionNote, setDecisionNote] = useState('');
  function period(kind: string, date: string) {
    const d = new Date(date + 'T12:00:00Z');
    if (kind === 'week') {
      d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
      setStart(d.toISOString().slice(0, 10));
      d.setUTCDate(d.getUTCDate() + 6);
      setEnd(d.toISOString().slice(0, 10));
    } else if (kind === 'month') {
      setStart(date.slice(0, 7) + '-01');
      d.setUTCMonth(d.getUTCMonth() + 1, 0);
      setEnd(d.toISOString().slice(0, 10));
    } else {
      setStart(date);
      setEnd(date);
    }
    setMode(kind);
  }
  useEffect(() => {
    if (config.today && !start) period(teamView ? 'day' : 'week', config.today);
  }, [config.today]);
  useEffect(() => {
    if (!start || !end) return;
    let live = true;
    setBusy(true);
    hoursApi('sheet', undefined, `&team=${teamView}&start=${start}&end=${end}`)
      .then((d) => {
        if (live) {
          setRows(d.rows);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setBusy(false);
      });
    return () => {
      live = false;
    };
  }, [start, end, revision, teamView]);
  useEffect(() => {
    setPage(1);
  }, [start, end, employee, office, filter]);
  const filtered = rows.filter(
      (r) =>
        (!employee || r.employeeId === employee) &&
        (!office || r.office === office) &&
        (filter === 'all' ||
          (filter === 'missing' && (r.missingCheckIn || r.missingCheckOut)) ||
          (filter === 'late' && (r.lateCheckIn || r.lateSubmission)) ||
          (filter === 'overtime' && r.overtimeState === 'pending') ||
          (filter === 'noresponse' && r.noResponse)),
    ),
    pages = Math.max(1, Math.ceil(filtered.length / 14));
  const recorded = filtered.reduce((n, r) => n + (r.recordedMinutes || 0), 0),
    scheduled = filtered.reduce((n, r) => n + (r.scheduledMinutes || 0), 0),
    unknown = filtered.filter((r) => r.scheduledMinutes === null).length,
    incomplete = filtered.filter((r) => r.recordedMinutes === null && r.record).length;
  async function exportCsv() {
    try {
      const r = await fetch(`/api/hours?action=export&team=${teamView}&start=${start}&end=${end}`);
      sessionEnded(r.status);
      if (!r.ok) throw new Error('Unable to export these hours.');
      const url = URL.createObjectURL(await r.blob()),
        a = document.createElement('a');
      a.href = url;
      a.download = 'hmf-hours.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  if (correction)
    return (
      <CorrectionForm
        row={correction}
        close={() => setCorrection(null)}
        saved={() => {
          setCorrection(null);
          setRevision((r) => r + 1);
        }}
      />
    );
  return (
    <>
      <div className="page-heading">
        <h1>{teamView ? 'Team hours' : 'Your hours'}</h1>
        <button className="secondary" onClick={exportCsv} disabled={busy}>
          Export date range
        </button>
      </div>
      <div className="hours-controls">
        <label>
          Period
          <select value={mode} onChange={(e) => period(e.target.value, config.today)}>
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="custom">Custom dates</option>
          </select>
        </label>
        <label>
          From
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              setMode('custom');
            }}
          />
        </label>
        <label>
          To
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              setMode('custom');
            }}
          />
        </label>
      </div>
      {teamView && (
        <div className="hours-controls">
          <label>
            Employee
            <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
              <option value="">All authorized people</option>
              {config.people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Office
            <select value={office} onChange={(e) => setOffice(e.target.value)}>
              <option value="">All authorized offices</option>
              {config.offices.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Show
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All records</option>
              <option value="missing">Missing check-in / check-out</option>
              <option value="late">Late entries</option>
              <option value="overtime">Overtime awaiting approval</option>
              <option value="noresponse">No attendance response</option>
            </select>
          </label>
        </div>
      )}
      <Feedback error={error} />
      {error && (
        <button className="secondary" onClick={() => setRevision((r) => r + 1)}>
          Retry
        </button>
      )}
      <p className="hours-summary">
        Recorded: <strong>{amount(recorded)}</strong> · Scheduled:{' '}
        <strong>{amount(scheduled)}</strong>
        {unknown > 0 && ` · ${unknown} days with unknown scheduled hours`}
        {incomplete > 0 && ` · ${incomplete} incomplete time records`}
      </p>
      <p className="muted">
        Totals include completed records only. Times are local to each record’s office. Hours are
        not sent to payroll.
      </p>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Working hours"
        aria-busy={busy}
      >
        <table>
          <caption className="sr-only">Working hours for the selected period</caption>
          <thead>
            <tr>
              {teamView && <th scope="col">Employee</th>}
              <th scope="col">Date</th>
              <th scope="col">In – out</th>
              <th scope="col">Recorded</th>
              <th scope="col">Difference</th>
              <th scope="col">Review</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice((page - 1) * 14, page * 14).map((r) => (
              <tr key={r.employeeId + r.date}>
                {teamView && <td>{r.name}</td>}
                <td className="time-cell">{dayLabel(r.date)}</td>
                <td className="time-cell">
                  {r.record
                    ? clock(r.record.check_in, r.timezone, r.date) +
                      ' – ' +
                      clock(r.record.check_out, r.timezone, r.date)
                    : '—'}
                  {teamView && r.record && <small className="sample-label">{r.timezone}</small>}
                </td>
                <td className="time-cell">
                  {hoursCell(r.recordedMinutes)}
                  {r.scheduledMinutes !== null && r.scheduledMinutes !== undefined && (
                    <small className="sample-label">
                      of {hoursCell(r.scheduledMinutes)} scheduled
                    </small>
                  )}
                </td>
                <td className="time-cell">
                  {r.differenceMinutes === null
                    ? '—'
                    : (r.differenceMinutes > 0 ? '+' : '') + hoursCell(r.differenceMinutes)}
                </td>
                <td>
                  {[
                    r.missingCheckIn ? 'Missing check-in' : '',
                    r.missingCheckOut ? 'Missing check-out' : '',
                    r.lateCheckIn ? 'Late check-in' : '',
                    r.lateSubmission ? 'Late submission' : '',
                    r.record && !r.record.check_out ? 'Open check-in' : '',
                    r.overtimeMinutes > 0
                      ? 'Overtime ' + amount(r.overtimeMinutes) + ' · ' + r.overtimeState
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' · ') ||
                    (!r.record
                      ? r.snapshot.working === false
                        ? 'Not scheduled'
                        : r.noResponse
                          ? 'No response'
                          : 'Attendance only'
                      : 'Recorded')}
                </td>
                <td>
                  <button className="secondary" onClick={() => setCorrection(r)}>
                    Request correction
                  </button>
                  {r.canReview && r.overtimeState === 'pending' && r.overtimeMinutes > 0 && (
                    <button
                      className="secondary"
                      onClick={() => {
                        setDecision(r);
                        setDecisionNote('');
                      }}
                    >
                      Review overtime
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {busy && <p role="status">Loading working hours…</p>}
      {!busy && !filtered.length && <p>No records match this view. Change the dates or filters.</p>}
      <div className="table-footer">
        <span>{filtered.length} day records</span>
        <div>
          <button className="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            {page} / {pages}
          </span>
          <button
            className="secondary"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {decision && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await hoursApi('overtimeDecision', {
                employeeId: decision.employeeId,
                date: decision.date,
                revision: decision.record.revision,
                decision: (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value'),
                reason: decisionNote,
              });
              setDecision(null);
              setRevision((r) => r + 1);
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h2>
            Review overtime · {decision.name} · {decision.date}
          </h2>
          <label>
            Decision note
            <textarea
              required
              maxLength={500}
              value={decisionNote}
              onChange={(e) => setDecisionNote(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="primary" value="approved" disabled={busy}>
              Approve
            </button>
            <button className="secondary" value="declined" disabled={busy}>
              Decline
            </button>
            <button type="button" className="secondary" onClick={() => setDecision(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <CorrectionQueue
        teamView={teamView}
        refresh={revision}
        changed={() => setRevision((r) => r + 1)}
      />
    </>
  );
}

function CorrectionForm({ row, close, saved }: { row: any; close: () => void; saved: () => void }) {
  const [clockChoice, setClockChoice] = useState('');
  function resolve(value: string) {
    const choices = wallCandidates(value, row.timezone);
    if (!choices.length)
      throw new Error(
        'This local time does not exist. Check the date, time and daylight-saving change.',
      );
    if (choices.length > 1 && !clockChoice)
      throw new Error(
        'This hour occurs twice when clocks change. Choose the first or second occurrence.',
      );
    return choices[clockChoice === 'second' ? choices.length - 1 : 0];
  }
  const [checkIn, setCheckIn] = useState(
      row.record?.check_in ? localWall(row.record.check_in, row.timezone) : '',
    ),
    [checkOut, setCheckOut] = useState(
      row.record?.check_out ? localWall(row.record.check_out, row.timezone) : '',
    ),
    [breakMinutes, setBreakMinutes] = useState(row.record?.break_minutes || 0),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await hoursApi('requestCorrection', {
        employeeId: row.employeeId,
        date: row.date,
        revision: row.record?.revision || 0,
        times: { checkIn: resolve(checkIn), checkOut: resolve(checkOut), breakMinutes },
        reason,
      });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="text-button" onClick={close}>
        ← Back to hours
      </button>
      <h1>Request a time correction</h1>
      <p>
        {row.name} · {row.date} · {row.timezone}
      </p>
      <p className="muted">
        This request will not change recorded hours until approved by another authorized person. Do
        not enter medical information.
      </p>
      <form className="employment-form" onSubmit={submit}>
        <label>
          Check-in (local time)
          <input
            type="datetime-local"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="2026-11-10T09:00:00+05:00"
          />
        </label>
        <label>
          Check-out (local time)
          <input
            type="datetime-local"
            required
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="2026-11-10T17:00:00+05:00"
          />
        </label>
        <p className="muted">
          Enter times in {row.timezone}. The portal converts them automatically.
        </p>
        <details>
          <summary>Clock changes</summary>
          <label>
            If an hour occurs twice
            <select value={clockChoice} onChange={(e) => setClockChoice(e.target.value)}>
              <option value="">Choose only if asked</option>
              <option value="first">First occurrence</option>
              <option value="second">Second occurrence</option>
            </select>
          </label>
        </details>
        <label>
          Break minutes
          <input
            type="number"
            min="0"
            step="1"
            required
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
          />
        </label>
        <label>
          Reason for correction
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <Feedback error={error} />
        <button className="primary" disabled={busy}>
          {busy ? 'Submitting…' : 'Submit correction request'}
        </button>
      </form>
    </>
  );
}
function CorrectionQueue({
  teamView,
  refresh,
  changed,
}: {
  teamView: boolean;
  refresh: number;
  changed: () => void;
}) {
  const [requests, setRequests] = useState<any[]>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [selected, setSelected] = useState<any>(null),
    [reason, setReason] = useState('');
  useEffect(() => {
    setBusy(true);
    hoursApi('corrections', undefined, '&team=' + teamView)
      .then((d) => {
        setRequests(d.requests);
        setError('');
      })
      .catch((e) => setError(e.message))
      .finally(() => setBusy(false));
  }, [teamView, refresh]);
  return (
    <section className="profile-section">
      <h2>Time correction requests</h2>
      <Feedback error={error} />
      {busy && <p role="status">Loading requests…</p>}
      {!busy && !requests.length && <p>No correction requests yet.</p>}
      {requests.map((r) => (
        <details className="workforce-disclosure" key={r.id}>
          <summary>
            {r.employee_name} · {r.date} · {r.status}
          </summary>
          <p>{r.reason}</p>
          <p>
            {stamp(r.proposed.checkIn, r.proposed.snapshot.timezone)} to{' '}
            {stamp(r.proposed.checkOut, r.proposed.snapshot.timezone)} · {r.proposed.breakMinutes}{' '}
            break minutes · {r.proposed.snapshot.timezone}
          </p>
          <p className="muted">
            Requested by {r.requester_name} · {new Date(r.created_at).toLocaleString()}
          </p>
          {r.decision_note && (
            <p>
              {r.decider_name}: {r.decision_note}
            </p>
          )}
          {r.status === 'pending' && r.canCancel && (
            <button
              className="secondary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await hoursApi('cancelCorrection', { id: r.id });
                  changed();
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Cancel request
            </button>
          )}
          {r.status === 'pending' && r.canDecide && (
            <button
              className="secondary"
              onClick={() => {
                setSelected(r);
                setReason('');
              }}
            >
              Review request
            </button>
          )}
        </details>
      ))}
      {selected && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await hoursApi('decideCorrection', {
                id: selected.id,
                decision: (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value'),
                reason,
              });
              setSelected(null);
              changed();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h3>
            Decision · {selected.employee_name} · {selected.date}
          </h3>
          <label>
            Decision note
            <textarea
              required
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="primary" value="approved" disabled={busy}>
              Approve correction
            </button>
            <button className="secondary" value="declined" disabled={busy}>
              Decline
            </button>
            <button type="button" className="secondary" onClick={() => setSelected(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export function HoursSettings() {
  const [policy, setPolicy] = useState<HoursPolicy>(defaultHoursPolicy),
    [previous, setPrevious] = useState<HoursPolicy | null>(null),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [busy, setBusy] = useState(false),
    [reason, setReason] = useState('');
  useEffect(() => {
    hoursApi('policy')
      .then((d) => {
        setPolicy(d.policy);
        setPrevious(d.policy);
      })
      .catch((e) => setError(e.message));
  }, []);
  return (
    <details className="workforce-disclosure">
      <summary>Working-hours rules</summary>
      <form
        className="employment-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError('');
          try {
            await hoursApi('policy', { policy, previous, reason });
            setPrevious({ ...policy });
            setSuccess('Hours rules saved. Existing time records retain their original rules.');
            setReason('');
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <p>Leave undecided rules blank. These settings do not send hours to payroll.</p>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.trackBreaks}
            onChange={(e) => setPolicy({ ...policy, trackBreaks: e.target.checked })}
          />
          Ask for actual break minutes at check-out
        </label>
        <label>
          Default break treatment
          <select
            value={policy.breaksPaid === null ? '' : String(policy.breaksPaid)}
            onChange={(e) =>
              setPolicy({
                ...policy,
                breaksPaid: e.target.value === '' ? null : e.target.value === 'true',
              })
            }
          >
            <option value="">Not decided</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
        </label>
        <p className="muted">
          An assigned schedule’s explicit break treatment takes precedence. Without break tracking,
          recorded time is elapsed time with no automatic deduction.
        </p>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.overtimeEnabled}
            onChange={(e) => setPolicy({ ...policy, overtimeEnabled: e.target.checked })}
          />
          Enable daily overtime above scheduled paid hours
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.overtimeApproval}
            onChange={(e) => setPolicy({ ...policy, overtimeApproval: e.target.checked })}
          />
          Require a manager’s overtime approval
        </label>
        <label>
          Minimum overtime (minutes)
          <input
            type="number"
            min="1"
            max="1440"
            step="1"
            value={policy.overtimeThresholdMinutes ?? 1}
            onChange={(e) =>
              setPolicy({ ...policy, overtimeThresholdMinutes: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Late check-in grace period (minutes after scheduled start)
          <input
            type="number"
            min="0"
            max="1440"
            value={policy.graceMinutes ?? ''}
            onChange={(e) =>
              setPolicy({
                ...policy,
                graceMinutes: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </label>
        <label>
          Daily attendance submission deadline (office local time)
          <input
            type="time"
            value={policy.submissionDeadline}
            onChange={(e) => setPolicy({ ...policy, submissionDeadline: e.target.value })}
          />
        </label>
        <label>
          Reason for changing these rules
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <Feedback error={error} success={success} />
        <button className="primary" disabled={busy || !previous}>
          {busy ? 'Saving…' : 'Save hours rules'}
        </button>
      </form>
    </details>
  );
}
