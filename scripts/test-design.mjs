import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../app/portal.tsx', import.meta.url), 'utf8');
const has = fragment => ui.replace(/\s+/g,'').includes(fragment.replace(/\s+/g,''));
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
  assert.ok(has('/hmf-logo.png'));
  assert.ok(has('aria-current') && has('className="account-actions"') && has('Skip to content'));
  assert.ok(css.includes(':focus-visible') && css.includes('prefers-reduced-motion'));
  assert.ok(has('role="alert"') && has('role="status"'));
  assert.ok(!has('overview-banner') && !has('employee-hero') && !has('stat-icon'));
  assert.ok(!css.includes('fonts.googleapis') && !css.includes('linear-gradient'));
});

test('simplified layout retains access without dashboard clutter', () => {
  assert.ok(!has('className="sidebar') && !has('className={\'stats '));
  assert.ok(has('className="simple-header"') && has('className="simple-login"'));
  assert.ok(has('className="table-panel history-panel"'));
  for (const heading of ['Name','Office','Status','Submitted']) assert.ok(has('<th scope="col">'+heading+'</th>'));
  assert.ok(has('setSelected(r)') && has('Correct record') && has('Sign-in & sign-out activity'));
  assert.ok(has('Export CSV') && has('Office filter') && has('Attendance status filter'));
});

test('employee navigation stays focused and office settings are restricted', () => {
  const source = ts.createSourceFile('portal.tsx',ui,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  let nav;
  function visit(node) {
    if(ts.isVariableDeclaration(node) && node.name.getText(source)==='nav') nav=node.initializer;
    ts.forEachChild(node,visit);
  }
  visit(source);
  assert.ok(nav && ts.isConditionalExpression(nav),'Role-based navigation is present');
  const employeeItems=nav.whenFalse.elements.map(row=>row.elements.map(item=>item.text));
  assert.deepEqual(employeeItems, [['attendance','Today'], ['hours','Hours'], ['leave','Leave'], ['schedule','Schedule'], ['history','History']]);
  assert.ok(nav.whenTrue.getText(source).includes('me.canConfigure'));
  assert.ok(has("view==='settings'&&me.canConfigure"));
  assert.ok(has('My profile'));
});
