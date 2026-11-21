import assert from 'node:assert/strict';
import {admin, wf, portal, call, create, edit, login, blank, nonce, id, client} from './test-client.mjs';

const leave=(c,action,body,expected=200,query='')=>call(c,'leave',action,body,query,expected);
const office='QA'+nonce.toUpperCase();
const day=n=>new Date(Date.now()+n*86400000).toISOString().slice(0,10);
const policy={start:day(-180),end:day(180),holidays:Array.from({length:80},(_,i)=>({date:day(-180+i),name:'Fictional QA holiday '.padEnd(100,'x')})),allowPastRequests:true};
const created=[];
await wf(admin,'setting',{kind:'office',value:{code:office,name:'Review test office',country:'UK',timezone:'Europe/London',active:true},previous:null,reason:'Local regression fixture'});
async function fixture(key,extra={}) {const value=await create(key,{office,...extra});created.push(key);return value;}
try {
  const manager=await login(await fixture('manager',{roles:['employee','manager'],officeScope:[]}));
  const hr=await login(await fixture('hr',{roles:['employee','hr_admin'],officeScope:[office]}));
  const sysValue=await fixture('sys',{roles:['employee','system_admin'],officeScope:[]});
  const staff=await login(await fixture('staff',{profile:{...blank,managerId:id('manager'),holidayAllowance:3,carriedForward:0}}));
  const outside=await login(await fixture('outside',{office:'PK'}));
  const days=Array.from({length:7},(_,day)=>({day,working:true,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
  await wf(admin,'schedule',{employeeId:id('staff'),name:'Fictional QA schedule',kind:'base',startDate:policy.start,endDate:'',days,reason:'Test leave charging'});
  await leave(staff,'savePolicy',{office,...policy},403);
  await leave(admin,'savePolicy',{office,...policy}); // > 4 KB, all 80 names at the limit
  assert.equal((await leave(admin,'',undefined,200,'&office='+office)).policy.holidays.length,80);
  await leave(staff,'',undefined,403,'&office=PK');
  await leave(admin,'savePolicy',{office:'NOT_CONFIGURED',...policy},400);
  const plain=p=>{const {roles,officeScope,...rest}=p;return rest;};
  await edit('hr',p=>({...plain(p),profile:{...p.profile,holidayAllowance:999}}),hr,403);
  await edit('sys',p=>({...plain(p),profile:{...p.profile,jobTitle:'Changed by HR'}}),hr,403);
  const ownAdmin=(await wf(admin,'profile')).person;
  await wf(admin,'employee',{employee:ownAdmin,reason:'Self edit should fail'},'',403);
  await portal(manager,'correct',{employeeId:id('manager'),date:day(0),status:'present',correctionReason:'Self correction'},'',403);
  await portal(staff,'attendance',{status:'absent',reason:'PRIVATE QA NOTE'});
  const masked=(await portal(manager,'dashboard',undefined,'&date='+day(0))).rows.find(r=>r.id===id('staff'));
  assert.equal(masked.category,null);assert.equal(masked.approval,null);assert.equal(masked.decided_by,null);assert.equal(masked.decided_at,null);
  assert.ok(!JSON.stringify(masked).includes('PRIVATE QA NOTE'));
  const request=(start,end=start,extra={})=>leave(staff,'request',{start,end,leaveType:'annual_leave',note:'Private fixture note',...extra},201);
  await leave(staff,'request',{start:day(-500),end:day(0)},400);
  await leave(staff,'request',{start:day(-20),end:day(-20),leaveType:'unknown'},400);
  await leave(staff,'request',{start:day(-20),end:day(-20),note:'x'.repeat(501)},400);
  let first=await request(day(-20));
  assert.equal((await leave(staff,'')).balance.available,2);
  await leave(staff,'request',{start:day(-20),end:day(-20)},409);
  await leave(staff,'approved',{id:first.id,note:'Self approval'},404);
  await leave(outside,'approved',{id:first.id,note:'Out of scope'},404);
  const team=await leave(manager,'');
  assert.equal(team.requests.find(r=>r.id===first.id).note,null);
  assert.ok(team.requests.every(r=>r.employee_id===id('staff')||r.employee_id===id('manager')));
  await leave(manager,'approved',{id:first.id,note:'Confirmed by manager'});
  await leave(manager,'approved',{id:first.id,note:'Already decided'},409);
  assert.equal((await leave(staff,'')).balance.remaining,2);
  assert.equal((await portal(staff,'mine')).records.find(r=>r.date===day(-20)).status,'annual_leave');
  const sheet=await call(staff,'hours','sheet',undefined,'&start='+day(-20)+'&end='+day(-20));
  assert.equal(sheet.rows[0].missingCheckIn,false);assert.equal(sheet.rows[0].noResponse,false);
  const holidaySheet=await call(staff,'hours','sheet',undefined,'&start='+policy.holidays[0].date+'&end='+policy.holidays[0].date);
  assert.equal(holidaySheet.rows[0].missingCheckIn,false);
  const missing=await call(staff,'hours','sheet',undefined,'&start='+day(-21)+'&end='+day(-21));assert.equal(missing.rows[0].missingCheckIn,true);
  const cancelled=await request(day(-19));await leave(staff,'cancelled',{id:cancelled.id});
  await leave(manager,'approved',{id:cancelled.id,note:'Cancelled already'},409);
  const declined=await request(day(-18));await leave(manager,'declined',{id:declined.id,note:'Conflicting work'});
  assert.equal((await leave(staff,'')).balance.available,2);
  const stale=await request(day(-17));
  await edit('staff',p=>({...p,profile:{...p.profile,holidayAllowance:1}}));
  await leave(manager,'approved',{id:stale.id,note:'Insufficient balance'},400);
  await leave(staff,'cancelled',{id:stale.id});
  await edit('staff',p=>({...p,profile:{...p.profile,holidayAllowance:2}}));
  const race=await Promise.all([-16,-15].map(n=>leave(staff,'request',{start:day(n),end:day(n)},null)));
  assert.equal(race.filter(r=>r.status===201).length,1);
  assert.ok(race.some(r=>[400,409].includes(r.status)));
  assert.equal((await leave(staff,'')).balance.available,0);
  await leave(admin,'savePolicy',{office,...policy,allowPastRequests:false});
  await leave(staff,'request',{start:day(-14),end:day(-14)},400);
  await leave(client(),'request',{start:day(-14),end:day(-14)},401);
  console.log('PASS: leave policies, 80-holiday payload, balances, overlap/races, scope/privacy, approvals, cancellations, stale entitlement, attendance and holiday suppression');
} finally {
  // Preserve fictional records/audits; deactivate reports before their manager.
  for (const key of [...created.filter(k=>k!=='manager'),'manager']) {
    if(created.includes(key)) await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
  }
}
