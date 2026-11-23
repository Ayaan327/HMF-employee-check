// Records the two HMF Attendance training videos from the browser preview (fictional data only).
//   cd preview && npm run build && (cd dist && python3 -m http.server 4173 --bind 127.0.0.1 &)
//   node preview/record-training-videos.mjs [http://127.0.0.1:4173/] [outputs/videos]
// Produces staff.mp4 and managers.mp4 (Chrome screencast frames assembled with ffmpeg).
import { chromium } from 'playwright';
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const url = process.argv[2] || 'http://127.0.0.1:4173/';
const out = path.resolve(process.argv[3] || 'outputs/videos');
mkdirSync(out, { recursive: true });
const size = { width: 1280, height: 800 };
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const day = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const weekday = (from, dow) => {
  let n = from;
  while (new Date(day(n) + 'T12:00:00Z').getUTCDay() !== dow) n++;
  return n;
};
const monthStart = day(0).slice(0, 8) + '01';
// A London wall-clock time on a date, as an exact instant (handles GMT and BST).
function london(date, hhmm) {
  const guess = new Date(`${date}T${hhmm}:00Z`);
  const shown = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(guess);
  const diff = (Number(shown.slice(0, 2)) * 60 + Number(shown.slice(3))) - (Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3)));
  return new Date(guess.getTime() - diff * 60000);
}
const offset = (date, hhmm) => {
  const d = london(date, hhmm);
  const minutes = Math.round((new Date(`${date}T${hhmm}:00Z`) - d) / 60000);
  const sign = minutes >= 0 ? '+' : '-';
  const a = Math.abs(minutes);
  return `${date}T${hhmm}:00${sign}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
};
const yearEnd = (() => {
  const d = new Date(monthStart + 'T12:00:00Z');
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
})();

// ---------- shared page helpers ----------
const overlayCss = `
.preview-bar,.app-footer>div:first-child>p,.simple-login-footer{display:none!important}
#tv-caption{pointer-events:none;position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;max-width:980px;
  padding:14px 22px;border-radius:8px;background:rgba(19,41,61,.94);color:#fff;font:600 21px/1.4 'Segoe UI',system-ui,sans-serif;
  box-shadow:0 6px 24px rgba(0,0,0,.25);text-align:center;transition:opacity .25s}
#tv-caption:empty{opacity:0}
#tv-card{position:fixed;inset:0;z-index:100000;display:grid;place-content:center;justify-items:center;gap:18px;
  background:#13293d;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;text-align:center;padding:40px;pointer-events:none}
#tv-card h1{margin:0;font-size:46px;font-weight:600;color:#fff}
#tv-card p{margin:0;max-width:820px;font-size:24px;line-height:1.5;color:#b9c8d6}
#tv-card .rule{width:90px;height:4px;background:#d0342c;border-radius:2px}
#tv-card ol{margin:6px 0 0;padding:0;list-style:none;font-size:24px;line-height:1.9;color:#fff;text-align:left}
#tv-card ol li span{display:inline-grid;place-items:center;width:34px;height:34px;margin-right:12px;border-radius:50%;background:#0b5394;font-size:18px}
.tv-focus{outline:4px solid #f5b400!important;outline-offset:3px!important;border-radius:4px}`;

async function prepare(context) {
  await context.addInitScript((css) => {
    const add = () => {
      if (document.getElementById('tv-style')) return;
      const s = document.createElement('style');
      s.id = 'tv-style';
      s.textContent = css;
      document.head.appendChild(s);
      const c = document.createElement('div');
      c.id = 'tv-caption';
      document.body.appendChild(c);
    };
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', add) : add();
  }, overlayCss);
}
const wait = (page, ms) => page.waitForTimeout(ms);
async function caption(page, text, ms = 3200) {
  await page.evaluate((t) => (document.getElementById('tv-caption').textContent = t), text);
  if (ms) await wait(page, ms);
}
async function card(page, html, ms = 5000) {
  await page.evaluate((h) => {
    let el = document.getElementById('tv-card');
    if (!el) {
      el = document.createElement('div');
      el.id = 'tv-card';
      document.body.appendChild(el);
    }
    el.innerHTML = h;
  }, html);
  if (ms) await wait(page, ms);
}
const uncard = (page) => page.evaluate(() => document.getElementById('tv-card')?.remove());
async function point(page, locator, ms = 900) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el) => el.classList.add('tv-focus'));
  await wait(page, ms);
  await locator.evaluate((el) => el.classList.remove('tv-focus'));
}
async function press(page, locator, ms = 900) {
  await point(page, locator, ms);
  await locator.click();
}
async function type(page, locator, text) {
  await point(page, locator, 500);
  await locator.fill('');
  await locator.pressSequentially(text, { delay: 45 });
}
const api = (page, route, body) =>
  page.evaluate(
    async ([route, body]) => {
      const r = await fetch(route, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(route + ' ' + r.status + ' ' + JSON.stringify(data));
      return data;
    },
    [route, body],
  );
async function signIn(page, email) {
  await page.getByRole('textbox', { name: 'Company email', exact: true }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Password', { exact: false }).filter({ visible: true }).first().fill('HmfDemo!2026');
  await page.getByRole('button', { name: 'Sign in to HMF', exact: true }).click();
  await page.getByRole('button', { name: 'Sign out', exact: true }).waitFor({ timeout: 30000 });
}
async function signOut(page) {
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await page.getByRole('textbox', { name: 'Company email', exact: true }).waitFor();
}
const storage = (page) =>
  page.evaluate(() => ({ db: localStorage.getItem('hmf-preview-db-v1') }));

// ---------- 1. fictional data, prepared off camera ----------
const setupContext = await browser.newContext({ viewport: size });
const setup = await setupContext.newPage();
await setup.clock.install({ time: london(day(0), '08:40') });
await setup.goto(url);
await setup.getByRole('textbox', { name: 'Company email', exact: true }).waitFor();
await signIn(setup, 'admin@hmf.example');
for (const office of ['UK', 'PK'])
  await api(setup, '/api/leave', { action: 'savePolicy', office, start: monthStart, end: yearEnd, holidays: office === 'UK' ? [{ date: yearEnd.slice(0, 4) - 1 + '-12-25', name: 'Christmas Day (demo calendar)' }].filter((h) => h.date >= monthStart) : [], allowPastRequests: true });
const people = (await api(setup, '/api/workforce?action=directory')).people;
const week = Array.from({ length: 7 }, (_, d) => ({ day: d, working: d > 0 && d < 6, start: '09:00', finish: '17:30', overnight: false, breakMinutes: 30, paidBreak: false, arrangement: 'office' }));
for (const email of ['employee.uk@hmf.example', 'amelia.clarke@hmf.example', 'charlotte.evans@hmf.example']) {
  const p = people.find((x) => x.email === email);
  const prof = (await api(setup, '/api/workforce?action=profile&id=' + p.id)).person;
  await api(setup, '/api/workforce', { action: 'employee', employee: { ...prof, profile: { ...prof.profile, holidayAllowance: 25, carriedForward: 0, jobTitle: prof.profile.jobTitle || 'Engineer' } }, reason: 'Training video setup (fictional)' });
  await api(setup, '/api/workforce', { action: 'schedule', employeeId: p.id, name: 'Standard week', kind: 'base', startDate: monthStart, endDate: '', days: week, reason: 'Training video setup (fictional)' });
}
await signOut(setup);
// A colleague's pending leave and a correction request for the manager video.
await signIn(setup, 'amelia.clarke@hmf.example');
const ameliaLeave = weekday(21, 1);
await api(setup, '/api/leave', { action: 'request', start: day(ameliaLeave), end: day(ameliaLeave + 2), leaveType: 'annual_leave', note: 'Family visit' });
const past = weekday(-7, 2);
await api(setup, '/api/hours', { action: 'requestCorrection', employeeId: people.find((x) => x.email === 'amelia.clarke@hmf.example').id, date: day(past), revision: 0, times: { checkIn: offset(day(past), '08:55'), checkOut: offset(day(past), '17:40'), breakMinutes: 30 }, reason: 'Forgot to check in on the site visit' }).catch((e) => console.error('correction setup skipped:', e.message));
await signOut(setup);
await signIn(setup, 'charlotte.evans@hmf.example');
await api(setup, '/api/portal', { action: 'attendance', status: 'remote', reason: '' });
await signOut(setup);
let state = await storage(setup);
await setupContext.close();

async function recordingContext(name, startsAt) {
  const context = await browser.newContext({ viewport: size });
  // A believable working day on screen, whatever time the recording is made.
  await context.clock.install({ time: london(day(0), startsAt) });
  await context.addInitScript((db) => {
    try {
      if (db && !sessionStorage.getItem('tv-seeded')) {
        localStorage.setItem('hmf-preview-db-v1', db);
        sessionStorage.setItem('tv-seeded', '1');
      }
    } catch {}
  }, state.db);
  await prepare(context);
  const page = await context.newPage();
  // Chrome's screencast: a frame each time the screen changes, with its timestamp.
  const frames = path.join(out, name + '-frames');
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
  const cdp = await context.newCDPSession(page);
  const shots = [];
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    const file = path.join(frames, String(shots.length).padStart(5, '0') + '.jpg');
    writeFileSync(file, Buffer.from(data, 'base64'));
    shots.push({ file, t: metadata.timestamp });
    await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: size.width, maxHeight: size.height, everyNthFrame: 1 });
  return { context, page, name, cdp, shots, frames };
}
async function finish({ context, page, name, cdp, shots, frames }) {
  await wait(page, 600);
  await cdp.send('Page.stopScreencast').catch(() => {});
  await context.close();
  // Each frame stays on screen until the next one arrived; the last for one second.
  const list = shots
    .map((s, i) => `file '${s.file}'\nduration ${Math.max(0.001, (shots[i + 1]?.t ?? s.t + 1) - s.t).toFixed(3)}`)
    .join('\n');
  const listFile = path.join(frames, 'list.txt');
  writeFileSync(listFile, list + `\nfile '${shots.at(-1).file}'\n`);
  const mp4 = path.join(out, name + '.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile,
    '-vf', `scale=${size.width}:${size.height}:force_original_aspect_ratio=decrease,pad=${size.width}:${size.height}:(ow-iw)/2:(oh-ih)/2:color=white,fps=30,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-movflags', '+faststart', mp4], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + r.stderr);
  rmSync(frames, { recursive: true, force: true });
  console.log('Wrote', mp4, `(${shots.length} frames)`);
}

// ---------- 2. Staff video ----------
{
  const rec = await recordingContext('staff', '08:58');
  const { page } = rec;
  await page.goto(url);
  await card(page, `<div class="rule"></div><h1>HMF Attendance</h1><p>Quick guide for staff</p>`, 400);
  await page.getByRole('textbox', { name: 'Company email', exact: true }).waitFor();
  await signIn(page, 'employee.uk@hmf.example');
  await wait(page, 2600);
  await card(page, `<h1>Signing in</h1><ol><li><span>1</span>Open the link you were sent</li><li><span>2</span>Enter your work email</li><li><span>3</span>Type the 6-digit code from your email</li></ol><p>No password to remember. You stay signed in for the working day.</p>`, 7000);
  await uncard(page);
  await caption(page, 'This is Today: the page you see every morning.', 3200);
  await point(page, page.getByRole('combobox').first(), 1200);
  await caption(page, 'Choose where you are working: office, remote, client site or travel.', 3000);
  await press(page, page.getByRole('button', { name: 'Check in', exact: true }));
  await caption(page, 'Press Check in. The time is recorded automatically in your office’s local time.', 4200);
  await caption(page, '… at the end of the day …', 1200);
  await page.clock.setSystemTime(london(day(0), '16:56'));
  await wait(page, 600);
  await press(page, page.getByRole('button', { name: /Check out/ }));
  await caption(page, 'Press Check out when you finish. Your hours are worked out for you.', 4000);
  await point(page, page.getByRole('heading', { name: 'Today’s status' }), 900);
  await caption(page, 'Not working today, or somewhere else? Report it here: remote, travel, training or an absence.', 4600);
  await press(page, page.getByRole('button', { name: 'Hours', exact: true }));
  await caption(page, 'Hours: your recorded time for each day, next to your scheduled time.', 4200);
  const fix = page.getByRole('button', { name: 'Request correction' }).first();
  await press(page, fix);
  await caption(page, 'Forgot to check in or out? Request a correction. Your manager approves it.', 4200);
  await press(page, page.getByRole('button', { name: /Back|Cancel|Close/ }).first(), 600);
  await press(page, page.getByRole('button', { name: 'Leave', exact: true }));
  await caption(page, 'Leave: your allowance, what is booked and what is left.', 3800);
  await press(page, page.getByRole('button', { name: 'Request leave', exact: true }));
  const start = weekday(14, 1);
  await point(page, page.getByLabel('Start date', { exact: true }), 600);
  await page.getByLabel('Start date', { exact: true }).fill(day(start));
  await page.getByLabel('End date', { exact: true }).fill(day(start + 1));
  await caption(page, 'Choose your dates and add a short note if you like.', 2600);
  await press(page, page.getByRole('button', { name: 'Submit request' }));
  await caption(page, 'Submitted. It shows as Pending until your manager approves it.', 4200);
  await point(page, page.locator('.leave-list .badge').first(), 1200);
  await caption(page, 'You can cancel a request, even after approval, as long as the leave has not started.', 4400);
  await press(page, page.getByRole('button', { name: 'History', exact: true }));
  await caption(page, 'History: every day you have recorded.', 3400);
  await caption(page, '', 0);
  await card(page, `<div class="rule"></div><h1>That’s it</h1><p>Check in, check out, request leave.<br>Questions? Ask your manager or HR.</p>`, 4500);
  state = await storage(page);
  await finish(rec);
}

// ---------- 3. Managers & HR video ----------
{
  const rec = await recordingContext('managers', '17:45');
  const { page } = rec;
  await page.goto(url);
  await card(page, `<div class="rule"></div><h1>HMF Attendance</h1><p>Quick guide for managers and HR</p>`, 400);
  await page.getByRole('textbox', { name: 'Company email', exact: true }).waitFor();
  await signIn(page, 'admin@hmf.example');
  await wait(page, 4200);
  await uncard(page);
  await caption(page, 'Attendance: who has checked in today, across every office you look after.', 4200);
  await point(page, page.getByRole('combobox', { name: 'Office filter' }), 900);
  await caption(page, 'Filter by office, date or status, or search for a person.', 3400);
  await caption(page, 'Open anyone to see their recent days and correct a record, with a reason that is kept on file.', 3600);
  await press(page, page.locator('.person-button').first());
  await wait(page, 3200);
  await press(page, page.getByRole('button', { name: 'Close employee details' }), 600);
  await press(page, page.getByRole('button', { name: 'Leave', exact: true }));
  await caption(page, 'Leave requests from your team wait here for you.', 3200);
  const review = page.getByRole('button', { name: 'Review', exact: true }).first();
  await press(page, review);
  await type(page, page.getByLabel('Decision note'), 'Approved, enjoy the time off');
  await caption(page, 'Approve or decline with a short note. The employee sees your decision.', 3400);
  await press(page, page.getByRole('button', { name: 'Save decision' }));
  await caption(page, 'Approved leave appears in attendance automatically and comes off their balance.', 4400);
  const approved = page.getByRole('heading', { name: 'Approved team leave' });
  if (await approved.count()) {
    await point(page, approved, 900);
    await caption(page, 'Plans change? Cancel approved leave here and the days go back.', 3800);
  }
  await press(page, page.getByRole('button', { name: 'Hours', exact: true }));
  await caption(page, 'Hours: your team’s recorded time, with missing check-outs and late entries flagged.', 4400);
  const queue = page.getByRole('heading', { name: 'Time correction requests' });
  if (await queue.count()) {
    await point(page, queue, 900);
    await caption(page, 'Correction requests from your team are reviewed here.', 3600);
  }
  await press(page, page.getByRole('button', { name: 'People', exact: true }));
  await caption(page, 'People: everyone’s details, work schedule and leave allowance (HR and admins).', 4400);
  await press(page, page.getByRole('button', { name: 'Reports' }));
  await caption(page, 'Reports: download attendance and hours for any date range as a spreadsheet.', 4400);
  await caption(page, '', 0);
  await card(page, `<div class="rule"></div><h1>Every change is recorded</h1><p>Approvals, corrections and edits keep a full history,<br>and private absence notes are visible only to HR.</p>`, 5500);
  await finish(rec);
}
await browser.close();
console.log('Recorded:', readdirSync(out).filter((f) => f.endsWith('.mp4')).join(', '));
