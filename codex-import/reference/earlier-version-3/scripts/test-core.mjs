import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../app/lib/core.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {blankDays,validateDays,paidMinutes,weeklyMinutes,dayInZone,parseCsv,csv,validateProfile,blankProfile,effectiveSchedule}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
test('office dates respect local midnight and UK daylight saving',()=>{
  assert.equal(dayInZone('Asia/Karachi',new Date('2026-03-28T20:00:00Z')),'2026-03-29');
  assert.equal(dayInZone('Europe/London',new Date('2026-07-01T23:30:00Z')),'2026-07-02');
  assert.equal(dayInZone('Europe/London',new Date('2026-01-01T23:30:00Z')),'2026-01-01');
});
test('paid, unpaid, undecided and compressed/overnight weekly schedules',()=>{
  const days=blankDays.map(d=>({...d}));days[1]={...days[1],working:true,start:'22:00',finish:'06:00',overnight:true,breakMinutes:30,paidBreak:false};
  const valid=validateDays(days);assert.equal(paidMinutes(valid[1]),450);assert.equal(weeklyMinutes(valid),450);
  valid[1].paidBreak=true;assert.equal(weeklyMinutes(valid),480);valid[1].paidBreak=null;assert.equal(weeklyMinutes(valid),null);
  assert.throws(()=>validateDays(days.map((d,i)=>i===1?{...d,breakMinutes:500}:d)));
  assert.throws(()=>validateDays(days.map((d,i)=>i===2?{...d,working:true,start:'05:00',finish:'10:00'}:d)));
});
test('effective schedules retain revisions and restore normal periods after overrides',()=>{
  const base={id:'one',series_id:'base',kind:'base',start_date:'2026-01-01',end_date:null,created_at:'2026-01-01',days:blankDays};
  const revision={...base,id:'two',created_at:'2026-02-01'};
  const temporary={...base,id:'three',series_id:'temp',kind:'temporary',start_date:'2026-03-01',end_date:'2026-03-07'};
  assert.equal(effectiveSchedule([base,revision,temporary],'2026-03-07').id,'three');
  assert.equal(effectiveSchedule([base,revision,temporary],'2026-03-08').id,'two');
  assert.equal(effectiveSchedule([base],'2025-12-31'),null);
  const ended={...base,id:'ended',series_id:'new-base',start_date:'2026-04-01',end_date:'2026-04-30'};
  assert.equal(effectiveSchedule([base,ended],'2026-05-01'),null);
});
test('CSV handles BOM, quotes, newlines and rejects unsupported permission columns',()=>{
  const rows=parseCsv('\uFEFFid,name,email,office,department\r\nA,"Test, ""Name""",a@hmf.example,UK,"Line\nTwo"\r\n');
  assert.equal(rows[0].name,'Test, "Name"');assert.equal(rows[0].department,'Line\nTwo');
  assert.throws(()=>parseCsv('id,name,email,office,department,roles\nA,A,a@b.c,UK,D,admin'));
  assert.throws(()=>parseCsv('id,name,email,office,department\nA,"broken,a@b.c,UK,D'));
  assert.ok(csv([[' =1+1','@SUM(1)','-1']]).includes("' =1+1"));
});
test('profile validates dates, numeric terms and time zones without inventing policies',()=>{
  assert.equal(validateProfile({...blankProfile}).holidayAllowance,null);
  assert.throws(()=>validateProfile({...blankProfile,startDate:'2026-02-30'}));
  assert.throws(()=>validateProfile({...blankProfile,startDate:'2026-06-01',endDate:'2026-05-01'}));
  assert.throws(()=>validateProfile({...blankProfile,weeklyMinutes:-1}));
  assert.throws(()=>validateProfile({...blankProfile,timezone:'Invented/Office'}));
});
