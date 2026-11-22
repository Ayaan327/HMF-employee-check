import assert from 'node:assert/strict';
import {admin, wf, portal, call, create, edit, login, blank, nonce, id} from './test-client.mjs';

// Cancelling leave after approval: who may, when, and what happens to balance and attendance.
const leave=(c,action,body,expected=200,query='')=>call(c,'leave',action,body,query,expected);
const office='QC'+nonce.toUpperCase();
const day=n=>new Date(Date.now()+n*86400000).toISOString().slice(0,10);
const policy={start:day(-120),end:day(120),holidays:[],allowPastRequests:true};
const created=[];
await wf(admin,'setting',{kind:'office',value:{code:office,name:'Cancel test office',country:'UK',timezone:'Europe/London',active:true},previous:null,reason:'Local regression fixture'});
async function fixture(key,extra={}) {const value=await create(key,{office,...extra});created.push(key);return value;}
try {
  const manager=await login(await fixture('cmanager',{roles:['employee','manager'],officeScope:[]}));
  const hr=await login(await fixture('chr',{roles:['employee','hr_admin'],officeScope:[office]}));
  const staff=await login(await fixture('cstaff',{profile:{...blank,managerId:id('cmanager'),holidayAllowance:10,carriedForward:0}}));
  const outside=await login(await fixture('coutside',{office:'PK'}));
  const days=Array.from({length:7},(_,day)=>({day,working:true,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
  await wf(admin,'schedule',{employeeId:id('cstaff'),name:'Fictional QA schedule',kind:'base',startDate:policy.start,endDate:'',days,reason:'Test leave charging'});
  await leave(admin,'savePolicy',{office,...policy});
  const approve=async(start,end=start)=>{const r=await leave(staff,'request',{start,end,leaveType:'annual_leave'},201);await leave(manager,'approved',{id:r.id,note:'Approved for test'});return r.id;};
  const status=async rid=>(await leave(staff,'')).requests.find(r=>r.id===rid).status;
  const record=async date=>(await portal(staff,'mine')).records.find(r=>r.date===date);

  // 1. Employee cancels future approved leave: balance and attendance restored.
  const future=await approve(day(10),day(11));
  assert.equal((await leave(staff,'')).balance.remaining,8);
  assert.equal((await record(day(10))).status,'annual_leave');
  await leave(outside,'cancelApproved',{id:future},404);
  await leave(staff,'cancelled',{id:future},409); // the pending-only route refuses approved leave
  await leave(staff,'cancelApproved',{id:future});
  assert.equal(await status(future),'cancelled');
  assert.equal((await leave(staff,'')).balance.remaining,10);
  assert.equal(await record(day(10)),undefined);
  assert.equal(await record(day(11)),undefined);
  await leave(staff,'cancelApproved',{id:future},409);
  await leave(manager,'approved',{id:future,note:'Too late'},409);

  // 2. Leave that has started: employee refused; manager must give a reason.
  const started=await approve(day(-2),day(1));
  assert.equal((await leave(staff,'')).balance.remaining,6);
  await leave(staff,'cancelApproved',{id:started},403);
  await leave(manager,'cancelApproved',{id:started},400);
  await leave(manager,'cancelApproved',{id:started,note:'Returned to work early'});
  assert.equal((await leave(staff,'')).balance.remaining,10);
  assert.equal(await record(day(-2)),undefined);

  // 3. Approved leave blocks attendance corrections; HR cancelling it unblocks them.
  const taken=await approve(day(-6),day(-5));
  const fix={employeeId:id('cstaff'),date:day(-6),status:'present',reason:'',correctionReason:'Actually worked'};
  await portal(admin,'correct',fix,'',409);
  await leave(hr,'cancelApproved',{id:taken,note:'Leave not taken'});
  assert.equal(await record(day(-6)),undefined);
  await portal(admin,'correct',fix);
  assert.equal((await record(day(-6))).status,'present');

  // 4. Freed days can be booked again; the audit trail records both steps.
  await approve(day(10));
  const audit=(await wf(admin,'audit',undefined,'&id='+id('cstaff'))).events.map(e=>e.action);
  assert.ok(audit.includes('leave.cancelled_after_approval'));
  assert.ok(audit.includes('attendance.leave_cancelled'));
  // Reviewers see the approved request; the team list in the UI relies on review + today.
  const view=await leave(manager,'');
  assert.ok(view.today && view.requests.some(r=>r.status==='approved'&&r.review));
  console.log('PASS: approved-leave cancellation (employee before start, manager/HR with reason), balance and attendance restoration, corrections unblocked after cancellation, scope, double-cancel and audit');
} finally {
  for (const key of [...created.filter(k=>k!=='cmanager'),'cmanager']) {
    if(created.includes(key)) await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
  }
}
