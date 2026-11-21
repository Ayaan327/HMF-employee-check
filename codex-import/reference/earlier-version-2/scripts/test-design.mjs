import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../app/portal.tsx', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/gi)].map(m => [m[1], m[2]]));
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(c => parseInt(c,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function contrast(a,b) { const x=luminance(tokens[a]),y=luminance(tokens[b]); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }

test('reading and status token pairs meet AA text contrast', () => {
  for (const [fg,bg] of [['ink','surface'],['muted','surface'],['muted','canvas'],['muted','selected'],['on-dark','navy'],['on-dark','navy-hover'],['on-dark-muted','navy-deep'],['present','present-bg'],['absent','absent-bg'],['other','other-bg'],['pending','pending-bg']]) {
    assert.ok(contrast(fg,bg)>=4.5, fg+'/'+bg+' contrast: '+contrast(fg,bg).toFixed(2));
  }
});
test('input boundaries and focus have visible contrast', () => {
  for (const bg of ['surface','canvas']) for (const fg of ['line-strong','focus']) assert.ok(contrast(fg,bg)>=3, fg+'/'+bg);
});
test('design keeps branding and important interaction states', () => {
  assert.ok(ui.includes('/hmf-logo.png'));
  assert.ok(ui.includes('aria-current') && ui.includes('<details className="account-menu">') && ui.includes('Skip to content'));
  assert.ok(css.includes(':focus-visible') && css.includes('prefers-reduced-motion'));
  assert.ok(ui.includes('role="alert"') && ui.includes('role="status"'));
  assert.ok(!ui.includes('overview-banner') && !ui.includes('employee-hero') && !ui.includes('stat-icon'));
  assert.ok(!css.includes('fonts.googleapis') && !css.includes('linear-gradient'));
});

test('simplified layout retains access without dashboard clutter', () => {
  assert.ok(!ui.includes('className="sidebar') && !ui.includes('className={\'stats '));
  assert.ok(ui.includes('className="simple-header"') && ui.includes('className="simple-login"'));
  assert.ok(ui.includes('{historyOnly&&<section className="table-panel history-panel"'));
  assert.ok(ui.includes('<th>Name</th><th>Office</th><th>Status</th><th>Submitted</th>'));
  assert.ok(ui.includes('setSelected(r)') && ui.includes('Correct record') && ui.includes('Sign-in & sign-out activity'));
  assert.ok(ui.includes('Export CSV') && ui.includes('Office filter') && ui.includes('Attendance status filter'));
});

test('employee navigation stays focused and office settings are restricted', () => {
  const nav = ui.match(/const nav=admin\?(.+):(.+);/);
  assert.ok(nav, 'Role-based navigation is present');
  const employeeItems = JSON.parse(nav[2].replaceAll("'", '"'));
  assert.deepEqual(employeeItems, [['attendance','Today'], ['schedule','Schedule'], ['history','History']]);
  assert.ok(nav[1].includes('me.canConfigure'));
  assert.ok(ui.includes("view==='settings'&&me.canConfigure"));
  assert.ok(ui.includes('My profile'));
});
