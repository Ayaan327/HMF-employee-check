'use client';

import { FocusForm } from './focus-form';
import { sessionEnded } from './session-expiry';
import { useEffect, useState, type FormEvent } from 'react';

type RequestRow = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  own: boolean;
  review: boolean;
  decision_note: string | null;
};
type LeaveOverview = {
  requests: RequestRow[];
  office: string;
  offices: { code: string; name: string }[];
  canEditPolicy: boolean;
  today: string;
  policy: {
    start: string;
    end: string;
    holidays: { date: string; name: string }[];
    allowPastRequests?: boolean;
  } | null;
  balance: {
    allowance: number | null;
    carriedForward: number | null;
    booked: number | null;
    remaining: number | null;
    pending: number | null;
    available: number | null;
    unit: string;
  };
};

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
  cancelled: 'Cancelled',
};

async function leaveApi(body?: object, office = '') {
  const response = await fetch(
    '/api/leave' + (office ? '?office=' + encodeURIComponent(office) : ''),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      : { cache: 'no-store' },
  );
  const data = (await response.json()) as LeaveOverview & { error?: string };
  sessionEnded(response.status);
  if (!response.ok) throw new Error(data.error || 'Unable to load leave.');
  return data;
}

export function LeaveView() {
  const [office, setOffice] = useState('');
  const [requests, setRequests] = useState<RequestRow[] | null>(null);
  const [overview, setOverview] = useState<LeaveOverview | null>(null);
  const [editingPolicy, setEditingPolicy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [editing, setEditing] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    leaveApi(undefined, office)
      .then((data) => {
        if (active) {
          setRequests(data.requests);
          setOverview(data);
        }
      })
      .catch((error: Error) => {
        if (active) setError(error.message);
      });
    return () => {
      active = false;
    };
  }, [revision, office]);

  async function act(body: object, confirmation: string) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await leaveApi(body);
      setMessage(confirmation);
      setEditing(false);
      setEditingPolicy(false);
      setReview(null);
      setCancelling(null);
      setRevision((value) => value + 1);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void act(
      {
        action: 'request',
        start: data.get('start'),
        end: data.get('end'),
        leaveType: data.get('leaveType'),
        note: data.get('note'),
      },
      'Leave request submitted.',
    );
  }

  function list(rows: RequestRow[], personal: boolean) {
    return (
      <ul className="leave-list">
        {rows.map((row) => (
          <li key={row.id}>
            <div>
              {!personal && <strong>{row.name} · </strong>}
              <strong>
                {row.start_date}
                {row.start_date !== row.end_date && ' – ' + row.end_date}
              </strong>
              <p
                className={`badge leave-status ${row.status === 'approved' ? 'present' : row.status === 'declined' ? 'absent' : row.status === 'pending' ? 'pending' : ''}`}
              >
                {statusLabel[row.status] || row.status}
              </p>
              {row.decision_note && row.status !== 'cancelled' && <p>{row.decision_note}</p>}
            </div>
            {row.status === 'pending' && personal && (
              <button
                className="secondary"
                disabled={busy}
                onClick={() =>
                  void act({ action: 'cancelled', id: row.id }, 'Leave request cancelled.')
                }
              >
                Cancel request
              </button>
            )}
            {row.status === 'approved' &&
              cancelling !== row.id &&
              ((personal && overview && row.start_date > overview.today) ||
                (!personal && row.review)) && (
                <button className="secondary" disabled={busy} onClick={() => setCancelling(row.id)}>
                  Cancel leave
                </button>
              )}
            {cancelling === row.id && row.status === 'approved' && (
              <FocusForm
                className="leave-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  void act(
                    { action: 'cancelApproved', id: row.id, note: data.get('note') },
                    'Approved leave cancelled. The days are back in the balance.',
                  );
                }}
              >
                <p>
                  {personal
                    ? 'Cancel this approved leave? The days go back into your balance and are removed from your attendance.'
                    : `Cancel ${row.name}’s approved leave? The days go back into their balance and the leave entries are removed from attendance.`}
                </p>
                <label>
                  {personal ? 'Reason (optional)' : 'Reason'}
                  <textarea name="note" required={!personal} maxLength={500} />
                </label>
                <div className="leave-actions">
                  <button className="primary" disabled={busy}>
                    Cancel leave
                  </button>
                  <button className="secondary" type="button" onClick={() => setCancelling(null)}>
                    Keep leave
                  </button>
                </div>
              </FocusForm>
            )}
            {row.status === 'pending' && row.review && review !== row.id && (
              <button className="secondary" disabled={busy} onClick={() => setReview(row.id)}>
                Review
              </button>
            )}
            {review === row.id && row.status === 'pending' && (
              <FocusForm
                className="leave-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const decision = data.get('decision');
                  void act(
                    { action: decision, id: row.id, note: data.get('note') },
                    'Leave decision saved.',
                  );
                }}
              >
                <label>
                  Decision
                  <select name="decision">
                    <option value="approved">Approve</option>
                    <option value="declined">Decline</option>
                  </select>
                </label>
                <label>
                  Decision note
                  <textarea name="note" required maxLength={500} />
                </label>
                <div className="leave-actions">
                  <button className="primary" disabled={busy}>
                    Save decision
                  </button>
                  <button className="secondary" type="button" onClick={() => setReview(null)}>
                    Close
                  </button>
                </div>
              </FocusForm>
            )}
          </li>
        ))}
      </ul>
    );
  }

  const own = requests?.filter((row) => row.own) ?? [];
  const team = requests?.filter((row) => !row.own && row.status === 'pending') ?? [];
  const teamApproved =
    requests?.filter(
      (row) =>
        !row.own &&
        row.review &&
        row.status === 'approved' &&
        overview !== null &&
        row.end_date >= overview.today,
    ) ?? [];

  return (
    <div className="leave-view">
      <div className="page-heading">
        <h1>Leave</h1>
        {!editing && (
          <button id="request-leave" className="primary" onClick={() => setEditing(true)}>
            Request leave
          </button>
        )}
      </div>
      {error && (
        <div className="error" role="alert">
          {error}{' '}
          <button
            className="secondary"
            onClick={() => {
              setError('');
              setRevision((value) => value + 1);
            }}
          >
            Refresh requests
          </button>
        </div>
      )}
      {message && <p role="status">{message}</p>}
      {overview && (
        <section className="leave-section">
          <h2>Leave balance</h2>
          <dl className="profile-values">
            {(
              [
                ['Allowance', overview.balance.allowance],
                ['Carried forward', overview.balance.carriedForward],
                ['Approved leave', overview.balance.booked],
                ['Remaining', overview.balance.remaining],
                ['Pending requests', overview.balance.pending],
                ['Available to request', overview.balance.available],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {value === null
                    ? '—'
                    : `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)} ${overview.balance.unit}`}
                </dd>
              </div>
            ))}
          </dl>
          {overview.balance.remaining === null && (
            <p className="muted">
              A balance requires a current leave period, allowance, carry-forward amount and a
              schedule for approved leave dates. Record zero if there is no carry-forward.
            </p>
          )}
        </section>
      )}
      {editing && (
        <FocusForm restoreFocus="#request-leave" className="leave-form" onSubmit={submit}>
          <label>
            Leave type
            <select name="leaveType">
              <option value="annual_leave">Annual leave</option>
            </select>
          </label>
          <div className="form-grid">
            <label>
              Start date
              <input type="date" name="start" required />
            </label>
            <label>
              End date
              <input type="date" name="end" required />
            </label>
          </div>
          <label>
            Note (optional)
            <textarea name="note" maxLength={500} aria-describedby="leave-note-help" />
          </label>
          <small id="leave-note-help">
            Do not include medical or other sensitive personal details.
          </small>
          <div className="leave-actions">
            <button className="primary" disabled={busy}>
              Submit request
            </button>
            <button className="secondary" type="button" onClick={() => setEditing(false)}>
              Close
            </button>
          </div>
        </FocusForm>
      )}
      {team.length > 0 && (
        <section className="leave-section">
          <h2>Awaiting your review</h2>
          {list(team, false)}
        </section>
      )}
      {teamApproved.length > 0 && (
        <section className="leave-section">
          <h2>Approved team leave</h2>
          <p className="muted">Current and upcoming leave you can cancel if plans change.</p>
          {list(teamApproved, false)}
        </section>
      )}
      <section className="leave-section">
        <h2>My requests</h2>
        {!requests ? (
          !error && <p role="status">Loading requests…</p>
        ) : own.length ? (
          list(own, true)
        ) : (
          <p className="muted">You haven’t requested leave yet.</p>
        )}
      </section>
      {overview && (
        <section className="leave-section">
          {overview.canEditPolicy && (
            <label>
              Office calendar
              <select
                value={overview.office}
                disabled={busy}
                onChange={(e) => {
                  setOffice(e.target.value);
                  setEditingPolicy(false);
                }}
              >
                {overview.offices.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="section-heading">
            <h2>Public holidays · {overview.office}</h2>
            {overview.canEditPolicy && !editingPolicy && (
              <button
                id="edit-calendar"
                className="secondary"
                onClick={() => setEditingPolicy(true)}
              >
                Edit office calendar
              </button>
            )}
          </div>
          {overview.policy && (
            <p className="muted">
              {overview.policy.start} – {overview.policy.end}
            </p>
          )}
          {overview.policy?.holidays.length ? (
            <ul className="leave-list">
              {overview.policy.holidays.map((holiday) => (
                <li key={holiday.date}>
                  <span>{holiday.name}</span>
                  <time dateTime={holiday.date}>{holiday.date}</time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              {overview.policy
                ? 'No holidays listed for this period.'
                : 'No leave calendar has been configured for this office.'}
            </p>
          )}
          {editingPolicy && (
            <FocusForm
              restoreFocus="#edit-calendar"
              className="leave-form"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const holidays = String(form.get('holidays'))
                  .split(/\r?\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => ({ date: line.slice(0, 10), name: line.slice(10).trim() }));
                void act(
                  {
                    action: 'savePolicy',
                    office: overview.office,
                    previous: overview.policy,
                    allowPastRequests: form.get('past') === 'on',
                    start: form.get('start'),
                    end: form.get('end'),
                    holidays,
                  },
                  'Office calendar saved.',
                );
              }}
            >
              <div className="form-grid">
                <label>
                  Leave period starts
                  <input type="date" name="start" required defaultValue={overview.policy?.start} />
                </label>
                <label>
                  Leave period ends
                  <input type="date" name="end" required defaultValue={overview.policy?.end} />
                </label>
              </div>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="past"
                  defaultChecked={overview.policy?.allowPastRequests !== false}
                />
                Allow requests for past dates
              </label>
              <label>
                Public holidays
                <textarea
                  name="holidays"
                  rows={5}
                  aria-describedby="holiday-format"
                  defaultValue={overview.policy?.holidays
                    .map((holiday) => holiday.date + ' ' + holiday.name)
                    .join('\n')}
                />
              </label>
              <small id="holiday-format">
                One per line. Use YYYY-MM-DD followed by the holiday name.
              </small>
              <div className="leave-actions">
                <button className="primary" disabled={busy}>
                  Save calendar
                </button>
                <button className="secondary" type="button" onClick={() => setEditingPolicy(false)}>
                  Close
                </button>
              </div>
            </FocusForm>
          )}
        </section>
      )}
    </div>
  );
}
