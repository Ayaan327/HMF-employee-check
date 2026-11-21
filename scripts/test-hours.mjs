import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';
const compile=name=>ts.transpileModule(readFileSync(new URL('../app/lib/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const h=await import(url(compile('hours').replace("'./core'",JSON.stringify(url(compile('core'))))));
const snapshot={timezone:'Europe/London',scheduleId:'s',scheduledMinutes:450,working:true,start:'09:00',finish:'17:00',overnight:false,policy:{...h.defaultHoursPolicy,trackBreaks:true,breaksPaid:false,overtimeEnabled:true,graceMinutes:10,submissionDeadline:'10:00'}};
const record={date:'2026-11-09',check_in:'2026-11-09T09:00:00Z',check_out:'2026-11-09T18:00:00Z',break_minutes:30,overtime_state:'pending'};
test('recorded minutes round once and seconds do not create overtime',()=>{
  const r={...record,check_out:'2026-11-09T17:00:00.500Z'};
  assert.equal(h.metrics(r,snapshot,record.date).recordedMinutes,450);
  assert.equal(h.metrics(r,snapshot,record.date).overtimeState,'none');
  assert.equal(h.metrics({...r,check_out:'2026-11-09T16:42:37.776Z'},snapshot,record.date).recordedMinutes,433);
  assert.equal(h.metrics({...r,check_out:'2026-11-09T17:14:00Z'},{...snapshot,policy:{...snapshot.policy,overtimeThresholdMinutes:15}},record.date).overtimeMinutes,0);
});
test('approved leave and holidays suppress missing attendance, not explicit records',()=>{
  const at=new Date('2026-11-10T20:00:00Z');
  assert.equal(h.metrics(null,snapshot,record.date,at,undefined,true).missingCheckIn,false);
  assert.equal(h.metrics({...record,check_out:null},snapshot,record.date,at,undefined,true).missingCheckOut,false);
  assert.equal(h.metrics(record,snapshot,record.date,at,undefined,true).recordedMinutes,510);
});
test('correction interval is bounded to one day',()=>{
  assert.throws(()=>h.validateTimes({checkIn:'2026-10-01T09:00:00Z',checkOut:'2026-10-03T17:00:00Z',breakMinutes:0},'2026-10-01','Europe/London'),/24 hours/);
});
test('elapsed, unpaid, paid and unknown break calculations stay distinct',()=>{assert.equal(h.metrics(record,snapshot,record.date).recordedMinutes,510);assert.equal(h.metrics(record,snapshot,record.date).overtimeMinutes,60);assert.equal(h.metrics(record,{...snapshot,policy:{...snapshot.policy,breaksPaid:true}},record.date).recordedMinutes,540);assert.equal(h.metrics(record,{...snapshot,policy:{...snapshot.policy,breaksPaid:null}},record.date).recordedMinutes,null);});
test('open records never invent a checkout or completed hours',()=>{const m=h.metrics({...record,check_out:null},snapshot,record.date,new Date('2026-11-10T10:00:00Z'));assert.equal(m.recordedMinutes,null);assert.equal(m.missingCheckOut,true);assert.equal(h.metrics(null,snapshot,record.date,new Date('2026-11-09T08:00:00Z')).missingCheckIn,false);assert.equal(h.metrics(null,snapshot,record.date,new Date('2026-11-09T18:00:00Z')).missingCheckIn,true);});
test('lateness needs configured rules, with separate attendance submission deadline',()=>{const late={...record,check_in:'2026-11-09T09:11:00Z'};assert.equal(h.metrics(late,snapshot,record.date,new Date(),'2026-11-09T10:01:00Z').lateSubmission,true);assert.equal(h.metrics(late,snapshot,record.date).lateCheckIn,true);assert.equal(h.metrics(late,{...snapshot,policy:h.defaultHoursPolicy},record.date).lateCheckIn,false);});
test('DST uses elapsed UTC time and validates repeated/nonexistent local hours',()=>{assert.equal(h.wallCandidates('2026-03-29T01:30','Europe/London').length,0);assert.equal(h.wallCandidates('2026-10-25T01:30','Europe/London').length,2);assert.deepEqual(h.wallCandidates('2026-11-09T09:00','Asia/Karachi'),['2026-11-09T04:00:00.000Z']);const dst={...record,check_in:'2026-03-29T00:00:00Z',check_out:'2026-03-29T07:00:00Z',break_minutes:0};assert.equal(h.metrics(dst,snapshot,'2026-03-29').recordedMinutes,420);});
test('overnight missing-checkout deadline belongs to the following day',()=>{const s={...snapshot,start:'22:00',finish:'06:00',overnight:true};assert.equal(h.metrics(null,s,'2026-11-09',new Date('2026-11-10T05:00:00Z')).missingCheckIn,false);assert.equal(h.metrics(null,s,'2026-11-09',new Date('2026-11-10T07:00:00Z')).missingCheckIn,true);});
test('correction times require matching local date, valid intervals and explicit offsets',()=>{assert.throws(()=>h.validateTimes({checkIn:'2026-11-09T09:00',checkOut:'2026-11-09T17:00',breakMinutes:0},'2026-11-09','Europe/London'));assert.throws(()=>h.validateTimes({checkIn:record.check_in,checkOut:record.check_out,breakMinutes:999},record.date,'Europe/London'));assert.equal(h.dateRange('2026-11-01','2026-11-30').length,30);});
