'use client';
import { useEffect, useRef, useState } from 'react';
import { WorkClock, HoursView } from './hours-ui';
import { LeaveView } from './leave-ui';
import { Reports } from './reports';
import {
  WorkforceProvider,
  People,
  ProfileView,
  ScheduleView,
  WorkforceSettings,
  PrivacyNotice,
  useWorkforce,
  workforce,
} from './workforce';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  X,
  CalendarDays,
  LogOut,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock3,
  Eye,
  EyeOff,
  Mail,
} from 'lucide-react';
type User = {
  id: string;
  name: string;
  email: string;
  office: string;
  department: string;
  role: string;
  roles: string[];
  timezone: string;
  canManagePeople: boolean;
  canConfigure: boolean;
  canViewTeam: boolean;
};
type Row = User & {
  label?: string;
  approval?: string;
  status: string;
  reason: string;
  submitted_at: string | null;
  updated_at: string | null;
  source: string | null;
};
type RecordRow = {
  timezone?: string;
  label?: string;
  approval?: string;
  date: string;
  status: string;
  reason: string;
  submitted_at: string;
  updated_at: string;
  source: string;
  office: string;
};
type Audit = {
  id: string;
  date: string;
  status: string;
  previous_status: string | null;
  actor_name: string;
  reason: string;
  changed_at: string;
};
type AccessEvent = { id: string; event: string; occurred_at: string; office: string };
type ApiData = {
  user: User;
  today: string;
  officeDates: Record<string, string>;
  rows: Row[];
  records: RecordRow[];
  audits: Audit[];
  accessEvents: AccessEvent[];
  date: string;
  refreshedAt: string;
  error?: string;
  signIn?: boolean;
  auth?: AuthInfo;
  identityEmail?: string;
};
type AuthInfo = { mode: string; sso: boolean; signOutUrl: string | null; demo?: boolean };
// Set from the server's answers; decides where an expired session sends the browser.
let authMode = 'sites';
const officeName = (o: string) => (o === 'PK' ? 'Pakistan' : o === 'UK' ? 'United Kingdom' : o);
const zone = (o: string) => (o === 'PK' ? 'Asia/Karachi' : 'Europe/London');
const labels: Record<string, string> = {
  present: 'Present',
  absent: 'Absent',
  other: 'Other',
  pending: 'No response',
};
const dateLabel = (d: string, short = false) =>
  d
    ? new Date(d + 'T12:00:00Z').toLocaleDateString(
        'en-GB',
        short
          ? { day: 'numeric', month: 'short' }
          : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
      )
    : '';
const timeLabel = (t: string | null, o: string, timezone?: string) =>
  t
    ? new Date(t).toLocaleTimeString('en-GB', {
        timeZone: timezone || zone(o),
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((x) => x[0])
    .join('');
function Badge({ status, label }: { status: string; label?: string }) {
  const { config } = useWorkforce();
  return (
    <span className={'badge ' + status}>
      <i />
      {label ||
        config.statuses.find((s) => s.code === status)?.label ||
        labels[status] ||
        (status === 'unavailable' ? 'Unavailable' : status)}
    </span>
  );
}
function Avatar({ name, office }: { name: string; office: string }) {
  return <span className={'avatar ' + (office === 'PK' ? 'mint' : '')}>{initials(name)}</span>;
}
async function api(action: string, body?: object, query = '') {
  const response = await fetch(
    '/api/portal' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...body }),
        }
      : { cache: 'no-store' },
  );
  const data = (await response.json()) as ApiData;
  if (!response.ok) {
    if (data.signIn) {
      // Sites serves its own sign-in route; behind Cloudflare Access a reload re-authenticates.
      if (authMode === 'sites') window.location.assign('/signin-with-chatgpt?return_to=/');
      else window.location.reload();
    }
    throw new Error(data.error || 'Please sign in again.');
  }
  return data;
}
export default function Portal() {
  const [me, setMe] = useState<User | null>(null),
    [loading, setLoading] = useState(true),
    [fatal, setFatal] = useState(''),
    [today, setToday] = useState(''),
    [officeDates, setOfficeDates] = useState<Record<string, string>>({}),
    [auth, setAuth] = useState<AuthInfo | null>(null),
    [identityEmail, setIdentityEmail] = useState('');
  function signedIn(d: ApiData) {
    setMe(d.user);
    setToday(d.today);
    setOfficeDates(d.officeDates);
    if (d.auth) {
      setAuth(d.auth);
      authMode = d.auth.mode;
    }
    setFatal('');
  }
  // Microsoft 365 single sign-on: the platform has already verified who this is.
  async function microsoftSignIn() {
    try {
      signedIn(await api('sso', {}));
    } catch (e) {
      setFatal((e as Error).message);
    }
  }
  useEffect(() => {
    fetch('/api/portal?action=me', { cache: 'no-store' })
      .then(async (r) => {
        const d = (await r.json()) as ApiData;
        if (d.auth) {
          setAuth(d.auth);
          authMode = d.auth.mode;
        }
        if (d.identityEmail) setIdentityEmail(d.identityEmail);
        if (d.user) signedIn(d);
        else if (r.status === 401 && d.auth?.sso) await microsoftSignIn();
        else if (r.status !== 401) setFatal(d.error || 'Unable to load the portal.');
      })
      .catch(() => setFatal('Unable to reach the attendance service. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);
  async function logout() {
    try {
      await api('logout', {});
      // Behind Microsoft 365 sign-in, also end the Cloudflare Access session; otherwise the
      // next visit would sign the same person straight back in.
      if (auth?.signOutUrl) window.location.assign(auth.signOutUrl);
      else setMe(null);
    } catch (e) {
      setFatal((e as Error).message);
    }
  }
  if (loading)
    return (
      <div className="loading-screen">
        <Logo />
        <span className="spinner" />
        <p>Opening your workspace…</p>
      </div>
    );
  if (!me)
    return (
      <Login
        onLogin={signedIn}
        initialError={fatal}
        sso={auth?.sso ? { email: identityEmail, retry: microsoftSignIn } : null}
        demo={Boolean(auth?.demo)}
      />
    );
  return (
    <WorkforceProvider>
      <Workspace
        me={me}
        today={today}
        officeDates={officeDates}
        logout={logout}
        fatal={fatal}
        demo={Boolean(auth?.demo)}
      />
    </WorkforceProvider>
  );
}
function Logo() {
  return (
    <img
      className="logo"
      src="/hmf-logo.png"
      alt="HMF — Engineering and Project Management Consultants"
    />
  );
}
function Login({
  onLogin,
  initialError,
  sso,
  demo,
}: {
  onLogin: (d: any) => void;
  initialError: string;
  sso: { email: string; retry: () => Promise<void> } | null;
  demo: boolean;
}) {
  const [step, setStep] = useState(1),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [office, setOffice] = useState('assigned'),
    [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(initialError),
    [showPassword, setShowPassword] = useState(false);
  useEffect(() => setError(initialError), [initialError]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (step === 1) {
      setStep(2);
      return;
    }
    setBusy(true);
    try {
      onLogin(await api('login', { email, password, office }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="simple-login">
      <header className="login-brand">
        <Logo />
      </header>
      {sso && (
        <section className="simple-login-form">
          <h1>Attendance</h1>
          <p className="muted">
            {sso.email
              ? `Signed in to Microsoft 365 as ${sso.email}.`
              : 'Sign in with your HMF Microsoft 365 account.'}
          </p>
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
          <button
            className="primary login-submit"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError('');
              await sso.retry();
              setBusy(false);
            }}
          >
            {busy ? 'Signing in…' : 'Continue with Microsoft 365'}
            <ArrowRight size={18} />
          </button>
          <p className="secure-note">
            Not you? <a href="/cdn-cgi/access/logout">Use a different Microsoft account</a>
          </p>
        </section>
      )}
      <section className="simple-login-form" hidden={Boolean(sso) && !showPassword}>
        <h1>
          {step === 1 ? (sso ? 'Administrator sign-in' : 'Attendance') : 'Enter your password'}
        </h1>
        <p className="muted">
          {step === 1 ? 'Sign in with your company email.' : 'Use your assigned password.'}
        </p>
        <form onSubmit={submit}>
          {step === 1 ? (
            <label>
              Company email
              <input
                autoComplete="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={demo ? 'you@hmf.example' : undefined}
                required
                autoFocus
              />
            </label>
          ) : (
            <>
              <div className="email-preview">
                <Mail size={17} />
                <span>{email}</span>
                <button type="button" onClick={() => setStep(1)}>
                  Change
                </button>
              </div>
              <label>
                Password
                <div className="password-field">
                  <input
                    type={show ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    aria-label={show ? 'Hide password' : 'Show password'}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </>
          )}
          {step === 1 && (
            <label className="office-login-label">
              Office
              <select value={office} onChange={(e) => setOffice(e.target.value)}>
                <option value="assigned">Use the office on my account</option>
                <option value="UK">United Kingdom</option>
                <option value="PK">Pakistan</option>
              </select>
            </label>
          )}
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
          <button className="primary login-submit" disabled={busy}>
            {busy ? 'Signing in…' : step === 1 ? 'Continue' : 'Sign in to HMF'}
            <ArrowRight size={18} />
          </button>
        </form>
      </section>
      {sso && !showPassword && (
        <button className="text-button login-alternative" onClick={() => setShowPassword(true)}>
          Sign in with an administrator password instead
        </button>
      )}
      <footer className="simple-login-footer fine-print">
        {demo ? (
          <>
            Private demo · HMF Consultants
            <br />
            Demo accounts: admin@hmf.example · employee.uk@hmf.example · employee.pk@hmf.example
            <br />
            Use the demo password supplied by your administrator.
          </>
        ) : (
          <>HMF Consultants · Trouble signing in? Contact HMF IT.</>
        )}
      </footer>
    </main>
  );
}
function Workspace({
  me,
  today,
  officeDates,
  logout,
  fatal,
  demo,
}: {
  me: User;
  today: string;
  officeDates: Record<string, string>;
  logout: () => void;
  fatal: string;
  demo: boolean;
}) {
  const admin = me.canViewTeam;
  const [view, setView] = useState(admin ? 'overview' : 'attendance');
  const nav = admin
    ? [
        ['overview', 'Attendance'],
        ['hours', 'Hours'],
        ['leave', 'Leave'],
        ['people', 'People'],
        ['history', 'History'],
        ...(me.canConfigure ? [['settings', 'Settings']] : []),
      ]
    : [
        ['attendance', 'Today'],
        ['hours', 'Hours'],
        ['leave', 'Leave'],
        ['schedule', 'Schedule'],
        ['history', 'History'],
      ];
  return (
    <div className="workspace simple-workspace">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="simple-header">
        <div className="header-inner">
          <div className="compact-brand">
            <Logo />
          </div>
          <nav aria-label="Main navigation">
            {nav.map(([id, label]) => (
              <button
                key={id}
                aria-current={view === id ? 'page' : undefined}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="account-actions" aria-label={`Account for ${me.name}`}>
            {admin && (
              <button
                aria-current={view === 'reports' ? 'page' : undefined}
                onClick={() => setView('reports')}
              >
                Reports
              </button>
            )}
            <button onClick={() => setView('profile')}>My profile</button>
            {admin && <button onClick={() => setView('attendance')}>My attendance</button>}
            <button onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>
      <div className="workspace-main">
        <main
          id="main-content"
          tabIndex={-1}
          className={'main-content ' + (!admin || view === 'attendance' ? 'personal-content' : '')}
        >
          {fatal && (
            <div className="error" role="alert">
              {fatal}
            </div>
          )}
          {view === 'reports' && admin ? (
            <Reports today={today} />
          ) : view === 'leave' ? (
            <LeaveView />
          ) : view === 'hours' ? (
            <HoursView teamView={admin} />
          ) : view === 'profile' ? (
            <ProfileView />
          ) : view === 'schedule' ? (
            <ScheduleView />
          ) : view === 'people' ? (
            <People />
          ) : view === 'settings' && me.canConfigure ? (
            <WorkforceSettings />
          ) : admin && view !== 'attendance' ? (
            <Admin view={view} today={today} officeDates={officeDates} />
          ) : (
            <Employee me={me} today={today} historyOnly={view === 'history'} />
          )}
        </main>
        <footer className="app-footer fine-print">
          <div>
            <span>HMF Consultants</span>
            {demo && <p>Private demo · Fictional employees</p>}
          </div>
          <PrivacyNotice />
        </footer>
      </div>
    </div>
  );
}
function Admin({
  view,
  today,
  officeDates,
}: {
  view: string;
  today: string;
  officeDates: Record<string, string>;
}) {
  const { config } = useWorkforce();
  const [date, setDate] = useState(today),
    [office, setOffice] = useState('all'),
    [rows, setRows] = useState<Row[]>([]),
    [search, setSearch] = useState(''),
    [status, setStatus] = useState('all'),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [refresh, setRefresh] = useState(0),
    [selected, setSelected] = useState<Row | null>(null),
    [page, setPage] = useState(1),
    [updated, setUpdated] = useState('');
  const seq = useRef(0);
  useEffect(() => {
    const n = ++seq.current;
    setLoading(true);
    setError('');
    api('dashboard', undefined, '&date=' + date + '&office=' + office)
      .then((d) => {
        if (n === seq.current) {
          setRows(d.rows);
          setUpdated(d.refreshedAt);
        }
      })
      .catch((e) => {
        if (n === seq.current) setError(e.message);
      })
      .finally(() => {
        if (n === seq.current) setLoading(false);
      });
  }, [date, office, refresh]);
  useEffect(() => {
    setPage(1);
  }, [date, office, search, status, view]);
  useEffect(() => {
    const id = setInterval(() => setRefresh((v) => v + 1), 60000);
    return () => clearInterval(id);
  }, []);
  const filtered = rows.filter(
    (r) =>
      (status === 'all' || r.status === status) &&
      [r.name, r.email, r.department, r.id].some((v) =>
        v.toLowerCase().includes(search.toLowerCase()),
      ),
  );
  const count = (s: string) => rows.filter((r) => r.status === s).length;
  const total = rows.length,
    submitted = rows.filter((r) => r.status !== 'pending').length;
  const pages = Math.max(1, Math.ceil(filtered.length / 8)),
    visible = filtered.slice((page - 1) * 8, page * 8);
  function shift(days: number) {
    const d = new Date(date + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + days);
    setDate(d.toISOString().slice(0, 10));
  }
  const title =
    view === 'people' ? 'People' : view === 'history' ? 'Attendance history' : 'Attendance';
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
        </div>
        <button
          className="secondary"
          onClick={async () => {
            try {
              const r = await fetch('/api/portal?action=export&date=' + date + '&office=' + office);
              if (!r.ok) throw new Error('Export failed. Please sign in again.');
              const url = URL.createObjectURL(await r.blob());
              const a = document.createElement('a');
              a.href = url;
              a.download = 'hmf-attendance-' + date + '.csv';
              a.click();
              URL.revokeObjectURL(url);
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>
      <div className="control-row">
        <select
          className="office-select"
          aria-label="Office filter"
          value={office}
          onChange={(e) => {
            setOffice(e.target.value);
            setDate(officeDates[e.target.value] || today);
          }}
        >
          <option value="all">All authorized offices</option>
          {config.offices.map((o) => (
            <option key={o.code} value={o.code}>
              {o.name}
            </option>
          ))}
        </select>
        <div className="date-control">
          <button className="icon-button" aria-label="Previous day" onClick={() => shift(-1)}>
            <ChevronLeft size={17} />
          </button>
          <CalendarDays size={16} />
          <input
            aria-label="Attendance date"
            type="date"
            value={date}
            onChange={(e) => e.target.value && setDate(e.target.value)}
          />
          <button className="icon-button" aria-label="Next day" onClick={() => shift(1)}>
            <ChevronRight size={17} />
          </button>
          <button className="today-button" onClick={() => setDate(officeDates[office] || today)}>
            Today
          </button>
        </div>
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={() => setRefresh((v) => v + 1)}>Retry</button>
        </div>
      )}
      <section className="table-panel register-panel" aria-busy={loading}>
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={17} />
            <input
              aria-label="Search employees"
              placeholder="Search people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="icon-button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="select-wrap">
            <select
              aria-label="Attendance status filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses ({total})</option>
              {[
                ['pending', 'No response'],
                ...config.statuses.map((s) => [s.code, s.label]),
                ['unavailable', 'Unavailable'],
              ].map(([v, l]) => (
                <option value={v} key={v}>
                  {l} ({count(v)})
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Attendance table, scroll horizontally for all columns"
        >
          <table>
            <caption className="sr-only">Employee attendance for {dateLabel(date)}</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Office</th>
                <th scope="col">Status</th>
                <th scope="col">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  <td>
                    <button className="person-button" onClick={() => setSelected(r)}>
                      <span>
                        <strong>{r.name}</strong>
                      </span>
                    </button>
                  </td>
                  <td>
                    <span className="office-cell">{officeName(r.office)}</span>
                  </td>
                  <td>
                    <Badge status={r.status} label={r.label} />
                    {r.approval === 'pending' && (
                      <small className="sample-label">Awaiting approval</small>
                    )}
                    {r.approval === 'declined' && <small className="sample-label">Declined</small>}
                  </td>
                  <td>
                    <span className="time-cell">
                      {timeLabel(r.submitted_at, r.office, r.timezone)}
                    </span>
                    {r.submitted_at && (
                      <small className="sample-label">
                        {r.source === 'sample' ? 'Sample record' : 'Recorded'}
                      </small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !error && !visible.length && (
            <div className="empty-state">
              <Search size={25} />
              <h3>No matching employees</h3>
              <p>Try a different name, office or status.</p>
              <button
                className="secondary"
                onClick={() => {
                  setSearch('');
                  setStatus('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
          {loading && !rows.length && (
            <div className="table-loading" role="status">
              <span className="sr-only">Loading team attendance…</span>
              {Array.from({ length: 8 }, (_, i) => (
                <div className="skeleton-row" aria-hidden="true" key={i}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="table-footer">
          <span>
            {filtered.length ? (page - 1) * 8 + 1 + '–' + Math.min(page * 8, filtered.length) : 0}{' '}
            of {filtered.length} employees
          </span>
          <div>
            <button
              className="icon-button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                aria-label={'Page ' + (i + 1)}
                aria-current={page === i + 1 ? 'page' : undefined}
                className={'page-number ' + (page === i + 1 ? 'selected' : '')}
                onClick={() => setPage(i + 1)}
                key={i}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="icon-button"
              aria-label="Next page"
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
      <div className="register-footnote">
        <span>
          {submitted} of {total} responded · Times are local to each office
        </span>
        <button
          className="refresh-link"
          onClick={() => setRefresh((v) => v + 1)}
          disabled={loading}
        >
          {loading ? 'Updating…' : 'Refresh'}
          {updated && (
            <span className="sr-only">
              , last updated {new Date(updated).toLocaleTimeString('en-GB')}
            </span>
          )}
        </button>
      </div>
      {selected && (
        <EmployeeDetail
          person={selected}
          date={date}
          close={() => setSelected(null)}
          saved={() => {
            setSelected(null);
            setRefresh((v) => v + 1);
          }}
        />
      )}
    </>
  );
}
function Employee({ me, today, historyOnly }: { me: User; today: string; historyOnly: boolean }) {
  const { config } = useWorkforce();
  const [records, setRecords] = useState<RecordRow[]>([]),
    [serverDate, setServerDate] = useState(today),
    [status, setStatus] = useState(''),
    [reason, setReason] = useState(''),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [success, setSuccess] = useState('');
  async function load() {
    const d = await api('mine');
    setRecords(d.records);
    setServerDate(d.today);
    const existing = d.records.find((r: RecordRow) => r.date === d.today);
    setStatus(existing?.status || '');
    setReason(existing?.reason || '');
  }
  useEffect(() => {
    load()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const existing = records.find((r) => r.date === serverDate),
    definition = config.statuses.find((s) => s.code === status),
    options = config.statuses.filter((s) => s.enabled);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const d = await api('attendance', { status, reason });
      await load();
      setSuccess('Your attendance for ' + dateLabel(d.date, true) + ' has been saved.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{historyOnly ? 'Your history' : 'Today’s attendance'}</h1>
          <p className="muted">
            {historyOnly ? officeName(me.office) + ' · Local time' : dateLabel(serverDate)}
          </p>
        </div>
      </div>
      {!historyOnly && (
        <>
          <WorkClock
            changed={() => {
              load().catch((e) => setError(e.message));
            }}
          />
          <div className="attendance-section">
            <div className="employee-grid">
              <section className="checkin-panel">
                <div className="checkin-heading">
                  <h2>Today’s status</h2>
                  <p className="muted">
                    Checking in sets this for you. Use it to change where you’re working or to
                    report an absence.
                  </p>
                </div>
                {existing && (
                  <div className="saved-indicator">
                    <CheckCircle2 size={17} />
                    Recorded as {existing.label || labels[existing.status] || existing.status}
                    {existing.approval === 'pending'
                      ? ' · Awaiting approval'
                      : existing.approval === 'declined'
                        ? ' · Declined'
                        : ''}{' '}
                    · {timeLabel(existing.updated_at, me.office, me.timezone)} local time
                  </div>
                )}
                {success && (
                  <div className="success" role="status">
                    <CheckCircle2 size={19} />
                    {success}
                  </div>
                )}
                <form onSubmit={submit}>
                  <div className="attendance-options">
                    {options
                      .filter((s) => ['present', 'remote', 'client'].includes(s.code))
                      .map((s) => (
                        <button
                          type="button"
                          className={'attendance-option ' + (status === s.code ? 'chosen' : '')}
                          aria-pressed={status === s.code}
                          key={s.code}
                          onClick={() => {
                            setStatus(s.code);
                            setReason('');
                            setSuccess('');
                          }}
                        >
                          <span>
                            <strong>{s.label}</strong>
                          </span>
                          <span className="radio-circle">{status === s.code && <span />}</span>
                        </button>
                      ))}
                  </div>
                  <label>
                    Another attendance option
                    <select
                      value={['present', 'remote', 'client'].includes(status) ? '' : status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setReason('');
                        setSuccess('');
                      }}
                    >
                      <option value="">Choose an option</option>
                      {options
                        .filter((s) => !['present', 'remote', 'client'].includes(s.code))
                        .map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </label>
                  {definition && (
                    <label className="reason-label">
                      {definition.explanation ? 'Short explanation' : 'Note (optional)'}
                      <textarea
                        maxLength={500}
                        required={definition.explanation}
                        placeholder="Do not include medical diagnoses or unnecessary personal details."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <small>
                        {reason.length}/500 characters
                        {definition.sensitive ? ' · Visible only to you and authorized HR.' : ''}
                        {definition.approval ? ' · Requires approval.' : ''}
                      </small>
                    </label>
                  )}
                  {error && (
                    <div className="error" role="alert">
                      {error}
                    </div>
                  )}
                  <button
                    className="secondary submit-attendance"
                    disabled={!definition?.enabled || busy || loading}
                  >
                    {busy
                      ? 'Saving…'
                      : existing
                        ? 'Update today’s attendance'
                        : 'Submit attendance'}
                    <ArrowRight size={17} />
                  </button>
                  <p className="secure-note">
                    <Clock3 size={14} />
                    Date and time are recorded automatically.
                  </p>
                </form>
              </section>
            </div>
          </div>
        </>
      )}
      {historyOnly && (
        <section className="table-panel history-panel" aria-busy={loading}>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Attendance table, scroll horizontally for all columns"
          >
            <table>
              <caption className="sr-only">My attendance history</caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last updated</th>
                  <th scope="col">Note</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, historyOnly ? 90 : 5).map((r) => (
                  <tr key={r.date}>
                    <td>
                      <strong>{dateLabel(r.date, true)}</strong>
                      <small className="sample-label">{r.date.slice(0, 4)}</small>
                    </td>
                    <td>
                      <Badge status={r.status} label={r.label} />
                      {r.approval === 'pending' && (
                        <small className="sample-label">Awaiting approval</small>
                      )}
                      {r.approval === 'declined' && (
                        <small className="sample-label">Declined</small>
                      )}
                    </td>
                    <td>{timeLabel(r.updated_at, r.office, r.timezone || me.timezone)}</td>
                    <td>{r.reason || '—'}</td>
                    <td className="muted">
                      {r.source === 'sample'
                        ? 'Sample record'
                        : r.source === 'admin'
                          ? 'Administrator'
                          : 'Your submission'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="empty-state" role="status">
              <p>Loading your attendance records…</p>
            </div>
          )}
          {!records.length && !loading && !error && (
            <div className="empty-state">
              <CalendarDays size={25} />
              <p>No attendance records yet. Your first check-in will appear here.</p>
            </div>
          )}
        </section>
      )}
      {historyOnly && error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
function EmployeeDetail({
  person,
  date,
  close,
  saved,
}: {
  person: Row;
  date: string;
  close: () => void;
  saved: () => void;
}) {
  const { config } = useWorkforce();
  const dialog = useRef<HTMLDialogElement>(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [records, setRecords] = useState<RecordRow[]>([]),
    [audits, setAudits] = useState<Audit[]>([]),
    [accessEvents, setAccessEvents] = useState<AccessEvent[]>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [status, setStatus] = useState(
      config.statuses.some((s) => s.enabled && s.code === person.status) ? person.status : '',
    ),
    [reason, setReason] = useState(person.reason),
    [note, setNote] = useState(''),
    [editing, setEditing] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
    api('history', undefined, '&id=' + person.id)
      .then((d) => {
        setRecords(d.records);
        setAudits(d.audits);
        setAccessEvents(d.accessEvents);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [person.id]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('correct', { employeeId: person.id, date, status, reason, correctionReason: note });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      aria-labelledby="detail-title"
    >
      <div className="dialog-top">
        <span className="eyebrow">EMPLOYEE DETAILS</span>
        <button className="icon-button" onClick={close} aria-label="Close employee details">
          <X size={20} />
        </button>
      </div>
      <div className="detail-person">
        <Avatar name={person.name} office={person.office} />
        <div>
          <h2 id="detail-title">{person.name}</h2>
          <p>
            {person.id} · {person.department}
          </p>
          <small>
            {person.email} · {officeName(person.office)}
          </small>
        </div>
      </div>
      <div className="detail-status">
        <div>
          <small>{dateLabel(date, true)}</small>
          <Badge status={person.status} label={person.label} />
        </div>
        {person.id !== config.user.id && (
          <button className="secondary" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel correction' : 'Correct record'}
          </button>
        )}
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {editing && (
        <form className="correction-form" onSubmit={submit}>
          <h3>Correct attendance for {dateLabel(date, true)}</h3>
          <label>
            Status
            <select
              required
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setReason('');
              }}
            >
              <option value="">Choose a status</option>
              {config.statuses
                .filter((s) => s.enabled)
                .map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.label}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Attendance reason {status !== 'other' && '(optional)'}
            <input
              value={reason}
              maxLength={500}
              required={config.statuses.find((s) => s.code === status)?.explanation}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <label>
            Why are you correcting this record?
            <textarea
              value={note}
              maxLength={500}
              required
              onChange={(e) => setNote(e.target.value)}
              placeholder="This explanation is saved in the audit history."
            />
          </label>
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save correction'}
            <Check size={17} />
          </button>
        </form>
      )}
      <details className="detail-disclosure">
        <summary>Sign-in & sign-out activity</summary>
        <p className="activity-explainer">
          Portal access times in {officeName(person.office)} local time. Closing the browser is not
          a recorded sign-out or a departure from work.
        </p>
        {loading ? (
          <p className="muted" role="status">
            Loading access activity…
          </p>
        ) : !accessEvents.length ? (
          <p className="muted">No recorded access yet.</p>
        ) : (
          <div className="access-list">
            {accessEvents.map((a) => (
              <div key={a.id}>
                <span className={'access-icon ' + a.event}>
                  {a.event === 'sign_in' ? <ArrowRight size={15} /> : <LogOut size={15} />}
                </span>
                <strong>{a.event === 'sign_in' ? 'Signed in' : 'Signed out'}</strong>
                <span>
                  {new Date(a.occurred_at).toLocaleString('en-GB', {
                    timeZone: zone(a.office),
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </details>
      {person.approval === 'pending' && person.id !== config.user.id && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              const decision =
                (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value') || 'approved';
              await workforce('attendanceDecision', {
                employeeId: person.id,
                date,
                decision,
                reason: decisionNote,
                expectedUpdatedAt: person.updated_at,
              });
              saved();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h3>Review attendance</h3>
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
          </div>
        </form>
      )}
      <h3 className="detail-section-title">Recent attendance</h3>
      {loading ? (
        <p className="muted">Loading records…</p>
      ) : !records.length ? (
        <p className="muted">No submissions yet.</p>
      ) : (
        <div className="detail-history">
          {records.map((r) => (
            <div key={r.date}>
              <span>
                {dateLabel(r.date, true)}
                <small>{r.reason || 'No note'}</small>
              </span>
              <Badge status={r.status} label={r.label} />
              <span className="muted">
                {timeLabel(r.updated_at, r.office, r.timezone || person.timezone)}
              </span>
            </div>
          ))}
        </div>
      )}
      <details className="detail-disclosure">
        <summary>Activity & corrections</summary>
        {loading ? (
          <p className="muted">Loading correction history…</p>
        ) : !audits.length ? (
          <p className="muted">No changes yet. Sample records have no activity history.</p>
        ) : (
          audits.map((a) => (
            <div className="audit" key={a.id}>
              <CheckCircle2 size={16} />
              <div>
                <strong>{a.actor_name}</strong> marked {dateLabel(a.date, true)} as{' '}
                {config.statuses.find((s) => s.code === a.status)?.label ||
                  labels[a.status] ||
                  a.status}
                <p>{a.reason}</p>
                <small>
                  {new Date(a.changed_at).toLocaleString('en-GB', {
                    timeZone: person.timezone || zone(person.office),
                  })}{' '}
                  · {officeName(person.office)} time
                </small>
              </div>
            </div>
          ))
        )}
      </details>
    </dialog>
  );
}
