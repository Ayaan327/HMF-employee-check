import assert from 'node:assert/strict';
import { origin, admin, wf, call, create, edit, login, blank, nonce, id, client } from './test-client.mjs';

// Abuse cases against the running local app (sites mode, loopback mock identity).
const raw = (path, init = {}) => fetch(origin + path, { redirect: 'manual', ...init });
const day = (n) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

// 1. Browser hardening headers on pages and API responses.
for (const path of ['/', '/api/portal?action=me']) {
  const r = await raw(path);
  assert.equal(r.headers.get('x-frame-options'), 'DENY', path + ' X-Frame-Options');
  assert.match(r.headers.get('content-security-policy') || '', /frame-ancestors 'none'/, path + ' CSP');
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff', path + ' nosniff');
  assert.ok(r.headers.get('referrer-policy'), path + ' Referrer-Policy');
}

// 2. No identity, forged identity headers, and someone else's session cookie are all refused.
assert.equal((await raw('/api/portal?action=me')).status, 401);
const forged = await raw('/api/workforce?action=directory', {
  headers: { 'oai-authenticated-user-id': 'attacker', 'oai-authenticated-user-email': 'admin@hmf.example', 'cf-access-authenticated-user-email': 'admin@hmf.example' },
});
assert.equal(forged.status, 401, 'browser-supplied identity headers must not authenticate');
const adminSession = admin.cookie.split('; ').find((c) => c.startsWith('hmf_session='));
assert.ok(adminSession);
const stolen = await raw('/api/workforce?action=directory', { headers: { cookie: adminSession } });
assert.equal(stolen.status, 401, 'a session cookie alone, without the matching platform identity, is refused');

// 3. Cross-site and malformed writes.
const post = (body, headers = {}) =>
  raw('/api/portal', { method: 'POST', headers: { cookie: admin.cookie, 'content-type': 'application/json', origin, ...headers }, body });
assert.equal((await post(JSON.stringify({ action: 'attendance', status: 'present' }), { origin: 'https://evil.example' })).status, 403, 'cross-site POST');
assert.equal((await post(JSON.stringify({ action: 'attendance', status: 'present' }), { 'content-type': 'text/plain' })).status, 415, 'non-JSON POST');
assert.equal((await post(JSON.stringify({ action: 'attendance', reason: 'x'.repeat(5000) }))).status, 413, 'oversized POST');
assert.equal((await post('{not json')).status, 400, 'malformed JSON');

// 4. Session cookie is HttpOnly, SameSite=Strict.
const fresh = client();
const loginResponse = await raw('/api/portal', {
  method: 'POST',
  headers: { cookie: fresh.cookie, 'content-type': 'application/json', origin },
  body: JSON.stringify({ action: 'login', email: 'admin@hmf.example', password: 'HmfDemo!2026' }),
});
const setCookie = loginResponse.headers.get('set-cookie') || '';
assert.match(setCookie, /HttpOnly/i);
assert.match(setCookie, /SameSite=Strict/i);
assert.equal((await raw('/api/portal', { method: 'POST', headers: { cookie: fresh.cookie, 'content-type': 'application/json', origin }, body: JSON.stringify({ action: 'login', email: 'admin@hmf.example', password: 'wrong-password-1' }) })).status, 401, 'wrong password');

// 5. Employees cannot read or change other people's records; leave cannot overlap worked days.
const office = 'QS' + nonce.toUpperCase();
await wf(admin, 'setting', { kind: 'office', value: { code: office, name: 'Security test office', country: 'UK', timezone: 'Europe/London', active: true }, previous: null, reason: 'Local regression fixture' });
const created = [];
try {
  const managerValue = await create('smanager', { office, roles: ['employee', 'manager'], officeScope: [] });
  created.push('smanager');
  const staffValue = await create('sstaff', { office, profile: { ...blank, managerId: id('smanager'), holidayAllowance: 10, carriedForward: 0 } });
  created.push('sstaff');
  const otherValue = await create('sother', { office });
  created.push('sother');
  const manager = await login(managerValue), staff = await login(staffValue), other = await login(otherValue);
  await call(other, 'workforce', 'profile', undefined, '&id=' + id('sstaff'), 403);
  await call(other, 'portal', 'history', undefined, '&id=' + id('sstaff'), 403);
  await call(other, 'portal', 'correct', { employeeId: id('sstaff'), date: day(0), status: 'present', reason: '', correctionReason: 'Not my record' }, '', 403);
  const days = Array.from({ length: 7 }, (_, d) => ({ day: d, working: true, start: '00:00', finish: '23:59', overnight: false, breakMinutes: 0, paidBreak: false, arrangement: 'office' }));
  await wf(admin, 'schedule', { employeeId: id('sstaff'), name: 'Fictional QA schedule', kind: 'base', startDate: day(-30), endDate: '', days, reason: 'Security test' });
  await call(admin, 'leave', 'savePolicy', { office, start: day(-60), end: day(200), holidays: [], allowPastRequests: true });
  // Pending leave for today, then the employee works today: approval must explain, not just "conflict".
  const pending = await call(staff, 'leave', 'request', { start: day(0), end: day(0), leaveType: 'annual_leave' }, '', 201);
  await call(staff, 'hours', 'checkIn', { status: 'present', note: '' });
  const refused = await call(manager, 'leave', 'approved', { id: pending.id, note: 'Approve' }, '', null);
  assert.equal(refused.status, 409);
  assert.match(refused.data.error, /working time recorded on/);
  await call(staff, 'leave', 'cancelled', { id: pending.id });
  const blocked = await call(staff, 'leave', 'request', { start: day(0), end: day(1), leaveType: 'annual_leave' }, '', null);
  assert.equal(blocked.status, 409);
  assert.match(blocked.data.error, /You have working time recorded on/);
  await call(staff, 'leave', 'request', { start: day(1), end: day(1), leaveType: 'annual_leave' }, '', 201);
  console.log('PASS: security headers, forged identity, stolen cookie, cross-site/malformed/oversized requests, cookie flags, record scope, leave on worked days');
} finally {
  for (const key of [...created.filter((k) => k !== 'smanager'), ...created.filter((k) => k === 'smanager')])
    await edit(key, (p) => ({ ...p, profile: { ...p.profile, employmentStatus: 'inactive', managerId: '' } }));
}
