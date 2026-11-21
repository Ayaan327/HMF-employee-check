'use client';
import { useEffect, useState } from 'react';
import { workforce, useWorkforce, roleLabel } from './workforce-context';
export { workforce, useWorkforce, WorkforceProvider, roleLabel } from './workforce-context';
import { Notice, Field, Value } from './workforce-fields';
import { EmployeeEditor } from './employee-editor';
import { HoursSettings } from './hours-ui';
import {
  blankDays,
  blankProfile,
  defaultOffices,
  defaultStatuses,
  paidMinutes,
  roles,
  weeklyMinutes,
  type Day,
  type Office,
  type Profile,
  type Role,
  type Schedule,
  type Status,
} from './lib/core';
import type { Person } from './lib/store';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = (minutes: number | null) =>
  minutes === null ? 'Break rule not set' : `${Number((minutes / 60).toFixed(2))} h`;
const timestamp = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-GB') : 'Not recorded for legacy accounts';
async function download(url: string, name: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const data: any = await res.json();
    throw new Error(data.error || 'Export failed.');
  }
  const object = URL.createObjectURL(await res.blob());
  const link = document.createElement('a');
  link.href = object;
  link.download = name;
  link.click();
  URL.revokeObjectURL(object);
}

export function People() {
  const { config, reload } = useWorkforce(),
    [people, setPeople] = useState<Person[]>([]),
    [search, setSearch] = useState(''),
    [office, setOffice] = useState(''),
    [status, setStatus] = useState(''),
    [department, setDepartment] = useState(''),
    [role, setRole] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(true),
    [selected, setSelected] = useState<string | null>(null),
    [adding, setAdding] = useState(false),
    [page, setPage] = useState(1),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let live = true;
    setBusy(true);
    workforce('directory')
      .then((d) => {
        if (live) {
          setPeople(d.people);
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
  }, [refresh]);
  useEffect(() => {
    setPage(1);
  }, [search, office, status, department, role]);
  const filtered = people.filter(
      (p) =>
        (!office || p.office === office) &&
        (!status || p.profile.employmentStatus === status) &&
        (!department || p.department === department) &&
        (!role || p.roles.includes(role as Role)) &&
        [p.name, p.email, p.id, p.department].some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        ),
    ),
    pages = Math.max(1, Math.ceil(filtered.length / 10));
  const query = new URLSearchParams({ search, office, status, department, role }).toString();
  async function saved() {
    setAdding(false);
    setRefresh((n) => n + 1);
    await reload();
  }
  if (adding) return <EmployeeEditor close={() => setAdding(false)} saved={saved} />;
  if (selected)
    return (
      <ProfileView
        id={selected}
        close={() => {
          setSelected(null);
          setRefresh((n) => n + 1);
        }}
      />
    );
  return (
    <>
      <div className="page-heading">
        <h1>People</h1>
        {config.user.canManagePeople && (
          <button className="primary" onClick={() => setAdding(true)}>
            Add employee
          </button>
        )}
      </div>
      <Notice error={error} />
      <div className="people-filters">
        <Field label="Search people">
          <input
            type="search"
            placeholder="Name, email or employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
        <Field label="Office">
          <select value={office} onChange={(e) => setOffice(e.target.value)}>
            <option value="">All authorized offices</option>
            {config.offices.map((o) => (
              <option key={o.code} value={o.code}>
                {o.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Employment status">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {['active', 'inactive', 'suspended', 'former'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <details className="workforce-disclosure">
        <summary>More filters and exports</summary>
        <div className="people-filters">
          <Field label="Department">
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">All departments</option>
              {config.departments.map((d) => (
                <option key={d.code}>{d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Access role">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {roleLabel[r]}
                </option>
              ))}
            </select>
          </Field>
          <button
            className="secondary"
            onClick={() =>
              download('/api/workforce?action=export&' + query, 'hmf-people.csv').catch((e) =>
                setError(e.message),
              )
            }
          >
            Export filtered directory
          </button>
        </div>
      </details>
      <section className="table-panel" aria-busy={busy}>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Employee directory">
          <table>
            <caption className="sr-only">Employee directory and administration</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Office / department</th>
                <th scope="col">Employment</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((p) => (
                <tr key={p.id}>
                  <td>
                    <button className="person-button" onClick={() => setSelected(p.id)}>
                      <span>
                        <strong>{p.name}</strong>
                        <small>
                          {p.id} · {p.email}
                        </small>
                      </span>
                    </button>
                  </td>
                  <td>
                    {config.offices.find((o) => o.code === p.office)?.name || p.office}
                    <small className="sample-label">{p.department}</small>
                  </td>
                  <td>{p.profile.employmentStatus}</td>
                  <td>{p.roles.map((r) => roleLabel[r]).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {busy && (
          <p className="panel-message" role="status">
            Loading employees…
          </p>
        )}
        {!busy && !filtered.length && (
          <p className="panel-message">No matching employees. Try clearing your filters.</p>
        )}
        <div className="table-footer">
          <span>{filtered.length} employees</span>
          <div>
            <button
              className="secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
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
      </section>
      {config.user.canManagePeople && <ImportPeople saved={saved} />}
      <details className="workforce-disclosure">
        <summary>Reusable schedule templates</summary>
        <ScheduleTemplates />
      </details>
    </>
  );
}

export function ProfileView({ id, close }: { id?: string; close?: () => void }) {
  const { config, reload } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [error, setError] = useState(''),
    [editing, setEditing] = useState(false),
    [version, setVersion] = useState(0);
  useEffect(() => {
    let live = true;
    setData(null);
    workforce('profile', undefined, id ? '&id=' + encodeURIComponent(id) : '')
      .then((d) => {
        if (live) {
          setData(d);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [id, version]);
  if (editing)
    return (
      <EmployeeEditor
        person={data.person}
        close={() => setEditing(false)}
        saved={async () => {
          setEditing(false);
          setVersion((v) => v + 1);
          await reload();
        }}
      />
    );
  if (!data)
    return (
      <>
        <Notice error={error} />
        <p role="status">
          {error ? 'Reopen this profile to try again.' : 'Loading employment details…'}
        </p>
        {close && (
          <button className="secondary" onClick={close}>
            Back to people
          </button>
        )}
      </>
    );
  const p: Person = data.person,
    profile = p.profile;
  return (
    <>
      {close && (
        <button className="text-button" onClick={close}>
          ← Back to people
        </button>
      )}
      <div className="page-heading">
        <div>
          <h1>{p.id === config.user.id ? 'Your profile' : p.name}</h1>
          <p className="muted">
            {p.id} · {p.email}
          </p>
        </div>
        {data.canEdit && (
          <button className="secondary" onClick={() => setEditing(true)}>
            Edit employee
          </button>
        )}
      </div>
      <Notice error={error} />
      <section className="profile-section">
        <h2>Employment</h2>
        <dl className="profile-values">
          <Value label="Full name" value={p.name} />
          <Value label="Job title" value={profile.jobTitle} />
          <Value label="Department" value={p.department} />
          <Value
            label="Office"
            value={config.offices.find((o) => o.code === p.office)?.name || p.office}
          />
          <Value label="Country" value={config.offices.find((o) => o.code === p.office)?.country} />
          <Value
            label="Manager"
            value={config.people.find((x) => x.id === profile.managerId)?.name || profile.managerId}
          />
          <Value label="Employment status" value={profile.employmentStatus} />
          <Value label="Employment type" value={profile.employmentType} />
          <Value label="Start date" value={profile.startDate} />
          <Value label="Final employment date" value={profile.endDate} />
          <Value label="Telephone" value={profile.telephone} />
          <Value
            label="Contracted weekly hours"
            value={profile.weeklyMinutes === null ? null : hours(profile.weeklyMinutes)}
          />
          <Value label="Time zone" value={p.timezone} />
        </dl>
      </section>
      <details className="workforce-disclosure">
        <summary>Holiday allowance and account details</summary>
        <dl className="profile-values">
          <Value
            label={'Annual allowance (' + profile.holidayUnit + ')'}
            value={profile.holidayAllowance}
          />
          <Value
            label={'Carried forward (' + profile.holidayUnit + ')'}
            value={profile.carriedForward}
          />
          <Value label="Access roles" value={p.roles.map((r) => roleLabel[r]).join(', ')} />
          <Value label="Account created" value={timestamp(p.createdAt)} />
          <Value label="Profile updated" value={timestamp(p.updatedAt)} />
        </dl>
        <p className="muted">
          Open Leave to see calculated balances for the configured leave year.
        </p>
      </details>
      <ScheduleView id={p.id} canEdit={data.canSchedule} />
      <AuditView id={p.id} />
      <p className="muted">
        Employment details are maintained by authorized HMF administrators. Contact your manager if
        a detail is incorrect.
      </p>
    </>
  );
}

function ImportPeople({ saved }: { saved: () => Promise<void> }) {
  const [file, setFile] = useState(''),
    [preview, setPreview] = useState<any>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [reason, setReason] = useState('');
  async function inspect() {
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      setPreview(await workforce('importPreview', { csv: file }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function confirm(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const d = await workforce('importConfirm', { previewId: preview.previewId, reason });
      setPreview(null);
      setFile('');
      setSuccess(`${d.count} employees added. No passwords or elevated access were imported.`);
      await saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="workforce-disclosure">
      <summary>Import employees from CSV</summary>
      <p>
        Imports add new employees. Existing records are never overwritten. Use the template for up
        to 50 employees.
      </p>
      <button
        className="secondary"
        onClick={() =>
          download('/api/workforce?action=template', 'hmf-employee-template.csv').catch((e) =>
            setError(e.message),
          )
        }
      >
        Download CSV template
      </button>
      <Field label="Employee CSV file">
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={async (e) => {
            setPreview(null);
            setSuccess('');
            setError('');
            const f = e.target.files?.[0];
            if (!f) {
              setFile('');
              return;
            }
            if (f.size > 200000) {
              setError('Choose a CSV smaller than 200 KB.');
              setFile('');
              return;
            }
            setFile(await f.text());
          }}
        />
      </Field>
      <button className="secondary" disabled={!file || busy} onClick={inspect}>
        {busy ? 'Checking…' : 'Preview import'}
      </button>
      <Notice error={error} success={success} />
      {preview && (
        <>
          <h3>{preview.total} rows reviewed</h3>
          {preview.errors.length > 0 ? (
            <ul>
              {preview.errors.map((e: any) => (
                <li key={e.row}>
                  Row {e.row}: {e.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>All rows passed validation. Review the people below before importing.</p>
          )}
          <div className="table-scroll" tabIndex={0} role="region" aria-label="CSV import preview">
            <table>
              <caption className="sr-only">Employee directory and administration</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Office</th>
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r: any) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.office}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {preview.previewId && (
            <form onSubmit={confirm}>
              <Field label="Reason for importing these employees">
                <input
                  required
                  maxLength={500}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Field>
              <button className="primary" disabled={busy}>
                {busy ? 'Importing…' : `Confirm import of ${preview.rows.length} employees`}
              </button>
            </form>
          )}
        </>
      )}
    </details>
  );
}

export function ScheduleView({ id, canEdit = false }: { id?: string; canEdit?: boolean }) {
  const { config } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [date, setDate] = useState(''),
    [editing, setEditing] = useState<Schedule | null | undefined>(undefined),
    [error, setError] = useState(''),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let live = true;
    workforce(
      'schedules',
      undefined,
      (id ? '&id=' + encodeURIComponent(id) : '') + (date ? '&date=' + date : ''),
    )
      .then((d) => {
        if (live) {
          setData(d);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [id, date, refresh]);
  if (editing !== undefined)
    return (
      <ScheduleEditor
        employeeId={id || config.user.id}
        initial={editing}
        close={() => setEditing(undefined)}
        saved={() => {
          setEditing(undefined);
          setRefresh((v) => v + 1);
        }}
      />
    );
  return (
    <section className="profile-section">
      <div className="section-heading">
        <h2>{id ? 'Weekly schedule' : 'Your schedule'}</h2>
        {canEdit && (
          <button className="secondary" onClick={() => setEditing(null)}>
            Set schedule
          </button>
        )}
      </div>
      <Field label="View schedule on">
        <input
          type="date"
          value={date || data?.date || ''}
          onChange={(e) => setDate(e.target.value)}
        />
      </Field>
      <Notice error={error} />
      {!data && !error && <p role="status">Loading schedule…</p>}
      {data && (
        <>
          <p className="muted">Times shown in {data.timezone}.</p>
          {data.effective ? (
            <>
              <h3>{data.effective.name}</h3>
              <ScheduleTable days={data.effective.days} />
              <p>Expected paid time: {hours(weeklyMinutes(data.effective.days))} per week</p>
            </>
          ) : (
            <p className="empty-copy">
              No schedule has been configured for this date. Your working pattern has not been
              assumed.
            </p>
          )}
          <details className="workforce-disclosure">
            <summary>Schedule versions ({data.versions.length})</summary>
            {!data.versions.length ? (
              <p>No schedule changes yet.</p>
            ) : (
              data.versions.map((s: Schedule) => (
                <details key={s.id} className="schedule-version">
                  <summary>
                    {s.name} · {s.start_date} to {s.end_date || 'ongoing'} · {s.kind}
                  </summary>
                  <p>{s.reason}</p>
                  <p className="muted">
                    Changed by{' '}
                    {config.people.find((p) => p.id === s.created_by)?.name || s.created_by} ·{' '}
                    {timestamp(s.created_at)}
                  </p>
                  <ScheduleTable days={s.days} />
                  {canEdit && (
                    <button className="secondary" onClick={() => setEditing(s)}>
                      Revise this period
                    </button>
                  )}
                </details>
              ))
            )}
          </details>
        </>
      )}
    </section>
  );
}
function ScheduleTable({ days }: { days: Day[] }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Weekly work schedule">
      <table>
        <caption className="sr-only">Employee directory and administration</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Working time</th>
            <th scope="col">Break</th>
            <th scope="col">Paid hours</th>
            <th scope="col">Arrangement</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 0].map((i) => {
            const d = days[i];
            return (
              <tr key={i}>
                <td>{dayNames[i]}</td>
                <td>
                  {d.working
                    ? `${d.start}–${d.finish}${d.overnight ? ' (+1 day)' : ''}`
                    : 'Not working'}
                </td>
                <td>
                  {d.working
                    ? `${d.breakMinutes} min${d.breakMinutes ? ', ' + (d.paidBreak === null ? 'rule not set' : d.paidBreak ? 'paid' : 'unpaid') : ''}`
                    : '—'}
                </td>
                <td>{d.working ? hours(paidMinutes(d)) : '—'}</td>
                <td>{d.working ? d.arrangement : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleTemplates() {
  const { config } = useWorkforce(),
    [data, setData] = useState<{ templates: Schedule[]; versions: Schedule[] } | null>(null),
    [edit, setEdit] = useState<Schedule | null | undefined>(undefined),
    [error, setError] = useState('');
  async function load() {
    try {
      setData(await workforce('templates'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  if (edit !== undefined)
    return (
      <ScheduleEditor
        initial={edit}
        close={() => setEdit(undefined)}
        saved={() => {
          setEdit(undefined);
          load();
        }}
      />
    );
  return (
    <>
      <div className="section-heading">
        <h2>Schedule templates</h2>
        <button className="primary" onClick={() => setEdit(null)}>
          Create template
        </button>
      </div>
      <Notice error={error} />
      {!data && !error && <p role="status">Loading templates…</p>}
      {data?.templates.length === 0 && (
        <p>
          No templates yet. Create a pattern agreed by HMF, then assign it from an employee’s
          schedule.
        </p>
      )}
      {data?.templates.map((t) => (
        <details className="workforce-disclosure" key={t.id}>
          <summary>
            {t.name} · {hours(weeklyMinutes(t.days))} per week
          </summary>
          <ScheduleTable days={t.days} />
          {(config.user.canManagePeople || t.created_by === config.user.id) && (
            <button className="secondary" onClick={() => setEdit(t)}>
              Revise template
            </button>
          )}
          <details>
            <summary>Previous versions</summary>
            {data.versions
              .filter((v) => v.series_id === t.series_id && v.id !== t.id)
              .map((v) => (
                <div className="schedule-version" key={v.id}>
                  <p>
                    {timestamp(v.created_at)} · {v.reason}
                  </p>
                  <ScheduleTable days={v.days} />
                </div>
              ))}
            {data.versions.filter((v) => v.series_id === t.series_id).length === 1 && (
              <p>No earlier versions.</p>
            )}
          </details>
        </details>
      ))}
    </>
  );
}

function ScheduleEditor({
  employeeId,
  initial,
  close,
  saved,
}: {
  employeeId?: string;
  initial: Schedule | null;
  close: () => void;
  saved: () => void;
}) {
  const [name, setName] = useState(initial?.name || ''),
    [kind, setKind] = useState(initial?.kind || (employeeId ? 'base' : 'template')),
    [start, setStart] = useState(initial?.start_date || ''),
    [end, setEnd] = useState(initial?.end_date || ''),
    [days, setDays] = useState<Day[]>(initial?.days || blankDays.map((d) => ({ ...d }))),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [templates, setTemplates] = useState<Schedule[]>([]),
    [templateId, setTemplateId] = useState(initial?.template_id || '');
  useEffect(() => {
    workforce('templates')
      .then((d) => setTemplates(d.templates))
      .catch((e) => setError(e.message));
  }, []);
  function day(i: number, key: keyof Day, value: unknown) {
    setDays((all) => all.map((d, n) => (n === i ? { ...d, [key]: value } : d)));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await workforce('schedule', {
        employeeId,
        seriesId: initial?.series_id,
        previousId: initial?.id,
        name,
        kind,
        startDate: start,
        endDate: end,
        days,
        reason,
        templateId: templateId || null,
      });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="profile-section">
      <button className="text-button" onClick={close}>
        ← Back to schedules
      </button>
      <h2>
        {initial ? 'Revise schedule' : employeeId ? 'Set weekly schedule' : 'New schedule template'}
      </h2>
      <form className="employment-form" onSubmit={submit}>
        <div className="form-grid">
          <Field label="Schedule name">
            <input
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          {employeeId && (
            <Field label="Start from a template">
              <select
                value={templateId}
                onChange={(e) => {
                  setTemplateId(e.target.value);
                  const t = templates.find((t) => t.id === e.target.value);
                  if (t) {
                    setDays(t.days.map((d) => ({ ...d })));
                    if (!name) setName(t.name);
                  }
                }}
              >
                <option value="">Custom schedule</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {employeeId && (
            <>
              <Field label="Schedule type">
                <select disabled={!!initial} value={kind} onChange={(e) => setKind(e.target.value)}>
                  <option value="base">Normal schedule</option>
                  <option value="temporary">Temporary change</option>
                </select>
              </Field>
              <Field label="Effective start">
                <input
                  required
                  disabled={!!initial}
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Field>
              <Field label="Effective end">
                <input
                  required={kind === 'temporary'}
                  disabled={!!initial}
                  type="date"
                  min={start || undefined}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Field>
            </>
          )}
        </div>
        <p className="muted">
          Choose each working day. A new normal schedule takes priority from its start date;
          temporary changes take priority for their stated period. Previous versions remain
          available.
        </p>
        <div className="schedule-editor">
          {[1, 2, 3, 4, 5, 6, 0].map((i) => {
            const d = days[i];
            return (
              <fieldset key={i}>
                <legend>{dayNames[i]}</legend>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={d.working}
                    onChange={(e) => day(i, 'working', e.target.checked)}
                  />
                  Working day
                </label>
                {d.working && (
                  <div className="schedule-day-fields">
                    <Field label="Start">
                      <input
                        type="time"
                        required
                        value={d.start}
                        onChange={(e) => day(i, 'start', e.target.value)}
                      />
                    </Field>
                    <Field label="Finish">
                      <input
                        type="time"
                        required
                        value={d.finish}
                        onChange={(e) => day(i, 'finish', e.target.value)}
                      />
                    </Field>
                    <Field label="Break (minutes)">
                      <input
                        type="number"
                        min="0"
                        max="1439"
                        required
                        value={d.breakMinutes}
                        onChange={(e) => day(i, 'breakMinutes', Number(e.target.value))}
                      />
                    </Field>
                    <Field label="Break treatment">
                      <select
                        value={d.paidBreak === null ? '' : String(d.paidBreak)}
                        onChange={(e) =>
                          day(
                            i,
                            'paidBreak',
                            e.target.value === '' ? null : e.target.value === 'true',
                          )
                        }
                      >
                        <option value="">Not decided</option>
                        <option value="true">Paid</option>
                        <option value="false">Unpaid</option>
                      </select>
                    </Field>
                    <Field label="Working arrangement">
                      <select
                        value={d.arrangement}
                        onChange={(e) => day(i, 'arrangement', e.target.value)}
                      >
                        {['office', 'remote', 'hybrid', 'client-site'].map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </Field>
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={d.overnight}
                        onChange={(e) => day(i, 'overnight', e.target.checked)}
                      />
                      Finish next day
                    </label>
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
        <Field label="Reason for this schedule">
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        <label className="check-label">
          <input type="checkbox" required />I have checked the working days, times and break
          settings.
        </label>
        <Notice error={error} />
        <div className="form-actions">
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save schedule'}
          </button>
          <button type="button" className="secondary" onClick={close} disabled={busy}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

function AuditView({ id }: { id?: string }) {
  const [events, setEvents] = useState<any[] | null>(null),
    [error, setError] = useState(''),
    [cursor, setCursor] = useState<string | null>(null),
    [busy, setBusy] = useState(false);
  async function load(older = false) {
    setBusy(true);
    setError('');
    try {
      const data = await workforce(
        id ? 'audit' : 'settingsAudit',
        undefined,
        (id ? '&id=' + encodeURIComponent(id) : '') +
          (older && cursor ? '&cursor=' + encodeURIComponent(cursor) : ''),
      );
      setEvents((current) => (older ? [...(current || []), ...data.events] : data.events));
      setCursor(data.nextCursor);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details
      className="workforce-disclosure"
      onToggle={(e) => {
        if (e.currentTarget.open && !events && !busy) load();
      }}
    >
      <summary>
        {id ? 'Profile, schedule and attendance audit' : 'Settings and template audit'}
      </summary>
      <Notice error={error} />
      {busy && <p role="status">Loading audit history…</p>}
      {error && (
        <button className="secondary" onClick={() => load(!!events)}>
          Retry
        </button>
      )}
      {events?.length === 0 && (
        <p>No changes to show. Earlier attendance corrections remain in Attendance history.</p>
      )}
      {events?.map((a) => (
        <details key={a.id} className="schedule-version">
          <summary>
            {a.action.replaceAll('.', ' ')} · {timestamp(a.created_at)}
          </summary>
          <p>
            {a.actor_name || a.actor_id} · {a.source}
          </p>
          <p>{a.reason}</p>
          <div className="audit-values">
            <div>
              <h4>Previous value</h4>
              <pre>
                {a.before_value
                  ? JSON.stringify(JSON.parse(a.before_value), null, 2)
                  : 'No previous value / restricted'}
              </pre>
            </div>
            <div>
              <h4>New value</h4>
              <pre>
                {a.after_value
                  ? JSON.stringify(JSON.parse(a.after_value), null, 2)
                  : 'No new value / restricted'}
              </pre>
            </div>
          </div>
        </details>
      ))}
      {cursor && (
        <button className="secondary" disabled={busy} onClick={() => load(true)}>
          Load older changes
        </button>
      )}
    </details>
  );
}

export function WorkforceSettings() {
  const { config, reload } = useWorkforce(),
    [section, setSection] = useState('office'),
    [edit, setEdit] = useState<any>(undefined),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [success, setSuccess] = useState(''),
    [previous, setPrevious] = useState<any>(null);
  const items: any[] =
    section === 'office'
      ? config.offices
      : section === 'department'
        ? config.departments
        : section === 'status'
          ? config.statuses
          : [];
  function open(value: any) {
    setPrevious(value);
    setEdit(
      value
        ? { ...value }
        : section === 'office'
          ? { code: '', name: '', country: '', timezone: '', active: true }
          : section === 'department'
            ? { code: '', name: '', active: true }
            : {
                code: '',
                label: '',
                category: 'working',
                explanation: false,
                approval: false,
                sensitive: false,
                enabled: true,
              },
    );
    setReason('');
    setError('');
    setSuccess('');
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await workforce('setting', { kind: section, value: edit, reason, previous });
      await reload();
      setEdit(undefined);
      setSuccess('Setting saved. Previous attendance keeps its original status rules.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="page-heading">
        <h1>Settings</h1>
      </div>
      <div className="settings-nav" aria-label="Settings sections">
        {[
          ['office', 'Offices'],
          ['department', 'Departments'],
          ['status', 'Attendance options'],
          ['template', 'Schedule templates'],
        ].map(([v, l]) => (
          <button
            className="secondary"
            aria-pressed={section === v}
            key={v}
            onClick={() => {
              setSection(v);
              setEdit(undefined);
              setError('');
              setSuccess('');
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <Notice error={error} success={success} />
      {section === 'template' ? (
        <ScheduleTemplates />
      ) : edit !== undefined ? (
        <form className="employment-form" onSubmit={save}>
          <h2>
            {previous ? 'Edit' : 'Add'} {section === 'status' ? 'attendance option' : section}
          </h2>
          <div className="form-grid">
            <Field label={section === 'department' ? 'Department name' : 'Code'}>
              <input
                required
                disabled={!!previous}
                maxLength={section === 'department' ? 120 : 40}
                value={edit.code}
                onChange={(e) => setEdit({ ...edit, code: e.target.value })}
              />
            </Field>
            {section === 'office' && (
              <>
                <Field label="Office name">
                  <input
                    required
                    maxLength={120}
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  />
                </Field>
                <Field label="Country code (UK or PK)">
                  <input
                    required
                    maxLength={2}
                    value={edit.country}
                    onChange={(e) => setEdit({ ...edit, country: e.target.value.toUpperCase() })}
                  />
                </Field>
                <Field label="Time zone">
                  <input
                    required
                    placeholder="Europe/London or Asia/Karachi"
                    value={edit.timezone}
                    onChange={(e) => setEdit({ ...edit, timezone: e.target.value })}
                  />
                </Field>
              </>
            )}
            {section === 'status' && (
              <>
                <Field label="Employee-facing label">
                  <input
                    required
                    maxLength={80}
                    value={edit.label}
                    onChange={(e) => setEdit({ ...edit, label: e.target.value })}
                  />
                </Field>
                <Field label="Count this as">
                  <select
                    value={edit.category}
                    onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                  >
                    {[
                      ['working', 'Present and working'],
                      ['leave', 'Approved leave'],
                      ['absence', 'Absence'],
                      ['nonworking', 'Non-working time'],
                      ['unconfigured', 'Not yet classified'],
                    ].map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            )}
          </div>
          <div className="check-list">
            {(section === 'status'
              ? [
                  ['enabled', 'Available to employees'],
                  ['explanation', 'Requires a short explanation'],
                  ['approval', 'Requires manager approval'],
                  ['sensitive', 'Private absence details (employee and authorized HR only)'],
                ]
              : [['active', 'Available for new assignments']]
            ).map(([key, label]) => (
              <label className="check-label" key={key}>
                <input
                  type="checkbox"
                  checked={edit[key]}
                  onChange={(e) => setEdit({ ...edit, [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>
          {section === 'status' && (
            <p className="muted">
              No response is always separate from absence. Leave booking remains disabled until
              Phase 3. Approval-required attendance stays pending until an authorized colleague
              decides.
            </p>
          )}
          <Field label="Reason for this change">
            <textarea
              required
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Field>
          <Notice error={error} />
          <div className="form-actions">
            <button className="primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save setting'}
            </button>
            <button type="button" className="secondary" onClick={() => setEdit(undefined)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="section-heading">
            <h2>
              {section === 'office'
                ? 'Offices'
                : section === 'department'
                  ? 'Departments'
                  : 'Attendance options'}
            </h2>
            <button className="primary" onClick={() => open(null)}>
              Add {section === 'status' ? 'option' : section}
            </button>
          </div>
          <div className="table-scroll" tabIndex={0} role="region" aria-label="Configured settings">
            <table>
              <caption className="sr-only">Employee directory and administration</caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Details</th>
                  <th scope="col">Availability</th>
                  <th scope="col">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.code}>
                    <td>{item.name || item.label}</td>
                    <td>
                      {item.timezone || item.category || item.code}
                      {item.approval && ' · Approval required'}
                      {item.sensitive && ' · Private'}
                    </td>
                    <td>{(item.active ?? item.enabled) ? 'Available' : 'Disabled'}</td>
                    <td>
                      <button
                        className="secondary"
                        aria-label={'Edit ' + (item.name || item.label)}
                        onClick={() => open(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <HoursSettings />
      <AuditView />
    </>
  );
}

export function PrivacyNotice() {
  return (
    <div className="privacy-footnote">
      <strong>Employee privacy</strong>
      <p>
        Employees see their own records. Managers see assigned reports, and HR access is limited to
        authorized offices.
      </p>
      <p>
        General team views hide private absence labels and notes. Authorized HR access to attendance
        notes is recorded. Do not enter medical diagnoses or unnecessary personal information.
      </p>
      <p>
        Changes are logged and retained when accounts are deactivated. Contact your manager or HR
        for corrections.
      </p>
    </div>
  );
}
