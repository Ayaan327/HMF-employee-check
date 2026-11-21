import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const compile=name=>ts.transpileModule(readFileSync(new URL('../app/lib/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const coreUrl=url(compile('core')), core=await import(coreUrl);
const leave=await import(url(compile('leave').replace("'./core'",JSON.stringify(coreUrl))));
const days=Array.from({length:7},(_,day)=>({day,working:day>0&&day<6,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
const schedules=[{id:'base',series_id:'base',kind:'base',start_date:'2026-01-01',end_date:null,created_at:'2026-01-01T00:00:00Z',days}];
const policy={start:'2026-01-01',end:'2026-12-31',holidays:[{date:'2026-11-17',name:'Fictional test holiday'}]};
test('leave uses configured schedules and holidays in days or hours',()=>{
  const charge=leave.chargeLeave('2026-11-16','2026-11-22','days',policy,schedules);
  assert.equal(leave.chargeTotal(charge),4);
  assert.equal(leave.chargeTotal(leave.chargeLeave('2026-11-16','2026-11-22','hours',policy,schedules)),30);
  assert.throws(()=>leave.chargeLeave('2026-11-16','2026-11-22','days',policy,[]),/schedule/);
});
test('leave range rejects invalid, overlong and outside-year dates',()=>{
  assert.equal(leave.leaveDates('2024-01-01','2024-12-31').length,366);
  for(const pair of [['2024-01-01','2025-01-01'],['2026-02-30','2026-03-01'],['2026-11-20','2026-11-19']]) assert.throws(()=>leave.leaveDates(...pair));
  assert.throws(()=>leave.chargeLeave('2027-01-01','2027-01-02','days',policy,schedules));
});
test('CSV preserves numeric deficits and escapes text formulas',()=>{
  assert.equal(core.csvCell(-30),'-30');
  assert.equal(core.csvCell(-0.5),'-0.5');
  for(const input of ['=1+1','-30','+SUM(A1)','@SUM(A1)','\t=1']) assert.ok(core.csvCell(input).startsWith('"\''));
});
