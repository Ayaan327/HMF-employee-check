import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173'; // Synthetic writes are local-only.
const platformCookie=(await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'})).headers.getSetCookie()[0].split(';')[0];
const client=()=>({cookie:platformCookie});
async function call(c,route,action,body,query='',expected=200){
  const response=await fetch(origin+'/api/'+route+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=response.headers.get('content-type')?.includes('application/json')?await response.json():await response.text();
  if(expected!==null)assert.equal(response.status,expected,action+': '+JSON.stringify(data));
  const session=response.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));if(session)c.cookie=platformCookie+'; '+session.split(';')[0];
  return expected===null?{status:response.status,data}:data;
}
const wf=(c,a,b,q='',s=200)=>call(c,'workforce',a,b,q,s),portal=(c,a,b,q='',s=200)=>call(c,'portal',a,b,q,s);
const admin=client();await portal(admin,'login',{email:'admin@hmf.example',password:'HmfDemo!2026'});
const nonce=Date.now().toString(36),password='Phase1-Test-Password!',id=key=>'T'+nonce+'-'+key;
const blank={telephone:'',jobTitle:'',managerId:'',startDate:'',endDate:'',employmentStatus:'active',employmentType:'',weeklyMinutes:null,timezone:'',holidayAllowance:null,carriedForward:null,holidayUnit:'days'};
const employee=(key,overrides={})=>({id:id(key),name:'Test '+key,email:id(key).toLowerCase()+'@hmf.example',office:'UK',department:'Electrical Engineering',profile:{...blank},revision:0,...overrides});
async function create(key,overrides={}){const value=employee(key,{password,...overrides});await wf(admin,'employee',{employee:value,reason:'Automated Phase 1 fixture'});return value;}
async function profile(key){return(await wf(admin,'profile',undefined,'&id='+id(key))).person;}
async function edit(key,fn,actor=admin,expected=200){const p=await profile(key),next=fn(p);return wf(actor,'employee',{employee:next,reason:'Automated Phase 1 edit'},'',expected);}
async function login(value){const c=client();await portal(c,'login',{email:value.email,password});return c;}

const mgrValue=await create('manager',{roles:['employee','manager'],officeScope:[]});
const hrValue=await create('hr',{roles:['employee','hr_admin'],officeScope:['UK']});
const sysValue=await create('system',{roles:['employee','system_admin'],officeScope:[]});
const reportValue=await create('report',{profile:{...blank,managerId:id('manager'),jobTitle:'Engineer',telephone:'Private contact',employmentType:'part-time',weeklyMinutes:1800}});
const otherValue=await create('outside',{office:'PK'});
const mgr=await login(mgrValue),hr=await login(hrValue),sys=await login(sysValue),report=await login(reportValue),other=await login(otherValue);
assert.equal((await profile('outside')).profile.weeklyMinutes,null);
assert.equal((await profile('outside')).profile.holidayAllowance,null);
const managerDirectory=await wf(mgr,'directory');assert.deepEqual(managerDirectory.people.map(p=>p.id).sort(),[id('manager'),id('report')].sort());
assert.equal((await wf(mgr,'profile',undefined,'&id='+id('report'))).person.profile.telephone,'');
for(const action of ['profile','schedules','audit'])await wf(mgr,action,undefined,'&id='+id('outside'),403);
await wf(report,'directory',undefined,'',403);await wf(report,'profile',undefined,'&id='+id('manager'),403);
await wf(report,'employee',{employee:reportValue,reason:'Unauthorized edit'},'',403);
await portal(mgr,'history',undefined,'&id='+id('outside'),403);
assert.ok((await wf(hr,'directory')).people.every(p=>p.office==='UK'));
await edit('report',p=>({...p,roles:['system_admin']}),hr,403);
await edit('report',p=>{const {roles,officeScope,...e}=p;return {...e,office:'PK'};},hr,403);
await wf(mgr,'setting',{kind:'department',value:{code:'Unauthorized',active:true},previous:null,reason:'Denied'},'',403);
await edit('manager',p=>({...p,profile:{...p.profile,employmentStatus:'inactive'}}),admin,400);
console.log('PASS: server-enforced roles, direct-report and office scope, protected fields, unknown policy values');

await portal(report,'attendance',{status:'absent',reason:'CONFIDENTIAL TEST NOTE'});
const date=(await portal(report,'me')).today;
const managerRows=(await portal(mgr,'dashboard',undefined,'&date='+date)).rows;
assert.ok(managerRows.every(r=>[id('manager'),id('report')].includes(r.id)));
const masked=managerRows.find(r=>r.id===id('report'));assert.equal(masked.status,'unavailable');assert.equal(masked.reason,'');
assert.ok(!JSON.stringify(await portal(sys,'history',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(!JSON.stringify(await wf(mgr,'audit',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(!String(await portal(mgr,'export',undefined,'&date='+date)).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(JSON.stringify(await portal(hr,'history',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok((await wf(admin,'audit',undefined,'&id='+id('report'))).events.some(e=>e.action==='privacy.notes_viewed'));
console.log('PASS: medical/absence notes excluded from manager, system-only and export views; HR access logged');

const days=Array.from({length:7},(_,day)=>({day,working:day>0&&day<6,start:day>0&&day<6?'09:00':'',finish:day>0&&day<6?'17:00':'',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
const template=await wf(mgr,'schedule',{name:'Test reusable pattern',kind:'template',days,reason:'Test agreed hours'});
const base=await wf(mgr,'schedule',{employeeId:id('report'),name:'Normal test week',kind:'base',startDate:'2026-01-01',endDate:'',days,templateId:template.schedule.id,reason:'Assign agreed working pattern'});
assert.equal(base.weeklyMinutes,2250);
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-01')).effective.id,base.schedule.id);
await wf(report,'schedule',{employeeId:id('report'),name:'Unauthorized',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
await wf(mgr,'schedule',{employeeId:id('outside'),name:'Unauthorized',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
await wf(mgr,'schedule',{employeeId:id('manager'),name:'Own schedule',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
const tempDays=days.map(d=>d.working?{...d,finish:'13:00',breakMinutes:0,arrangement:'remote'}:d);
const temp=await wf(mgr,'schedule',{employeeId:id('report'),name:'Temporary mornings',kind:'temporary',startDate:'2026-06-01',endDate:'2026-06-07',days:tempDays,reason:'Agreed temporary change'});
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-03')).effective.id,temp.schedule.id);
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-08')).effective.id,base.schedule.id);
await wf(mgr,'schedule',{employeeId:id('report'),name:'Overlap',kind:'temporary',startDate:'2026-06-05',endDate:'2026-06-09',days,reason:'Invalid'},'',400);
await wf(mgr,'schedule',{employeeId:id('report'),name:'No reason',kind:'base',startDate:'2026-07-01',endDate:'',days,reason:''},'',400);
const revised=await wf(mgr,'schedule',{employeeId:id('report'),seriesId:base.schedule.series_id,previousId:base.schedule.id,name:'Revised normal week',kind:'base',startDate:'2026-01-01',endDate:'',days:days.map(d=>({...d,paidBreak:true})),reason:'Paid breaks explicitly agreed'});
assert.equal(revised.weeklyMinutes,2400);
const scheduleHistory=await wf(report,'schedules',undefined,'&date=2026-07-01');assert.equal(scheduleHistory.versions.length,3);assert.equal(scheduleHistory.effective.id,revised.schedule.id);
await wf(mgr,'schedule',{employeeId:id('report'),seriesId:base.schedule.series_id,previousId:base.schedule.id,name:'Stale',kind:'base',startDate:'2026-01-01',endDate:'',days,reason:'Stale editor'},'',409);
console.log('PASS: templates, manager assignment, effective dates, temporary priority, prior versions, overlap and stale-edit protection');

const before=await profile('report');
const concurrent=await Promise.all([1,2].map(n=>wf(admin,'employee',{employee:{...before,profile:{...before.profile,jobTitle:'Concurrent '+n}},reason:'Concurrent edit '+n},'',null)));
assert.deepEqual(concurrent.map(r=>r.status).sort(),[200,409]);
const after=await profile('report');assert.equal(after.revision,before.revision+1);
await wf(admin,'employee',{employee:before,reason:'Stale form'},'',409);
const historyBefore=await portal(admin,'history',undefined,'&id='+id('report'));
await edit('report',p=>({...p,profile:{...p.profile,employmentStatus:'inactive',endDate:date}}));
await portal(report,'me',undefined,'',401);await portal(report,'login',{email:reportValue.email,password},'',401);
const historyAfter=await portal(admin,'history',undefined,'&id='+id('report'));assert.deepEqual(historyAfter.records,historyBefore.records);
assert.ok((await portal(admin,'dashboard',undefined,'&date='+date)).rows.some(r=>r.id===id('report')));
await edit('report',p=>({...p,profile:{...p.profile,employmentStatus:'active',endDate:''}}));
await portal(report,'login',{email:reportValue.email,password});
assert.ok((await portal(report,'mine')).records.some(r=>r.date===date));
console.log('PASS: concurrent profile writes, session revocation, deactivation/history retention and reactivation');

const config=await wf(admin,'config'),remote=config.statuses.find(s=>s.code==='remote');
await wf(admin,'setting',{kind:'status',previous:remote,value:{...remote,approval:true},reason:'Test approval-required work status'});
await portal(report,'attendance',{status:'remote',reason:'Client-approved remote day'});
assert.equal((await portal(report,'mine')).records.find(r=>r.date===date).approval,'pending');
await wf(report,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Self decision'},'',403);
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Stale manager view',expectedUpdatedAt:'2020-01-01'},'',409);
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Confirmed by manager',expectedUpdatedAt:(await portal(report,'mine')).records.find(r=>r.date===date).updated_at});
assert.equal((await portal(report,'mine')).records.find(r=>r.date===date).approval,'approved');
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'declined',reason:'Repeated decision'},'',409);
const remoteCurrent=(await wf(admin,'config')).statuses.find(s=>s.code==='remote');
await wf(admin,'setting',{kind:'status',previous:remoteCurrent,value:remote,reason:'Restore test configuration'});
await portal(report,'attendance',{status:'annual_leave'},'',400);
console.log('PASS: configurable attendance rules, approval and no self-approval, disabled leave booking');

const header='id,name,email,office,department,jobTitle';
const row=key=>`${id(key)},"Test, ${key}",${id(key).toLowerCase()}@hmf.example,UK,Electrical Engineering,Engineer`;
const invalid=await wf(admin,'importPreview',{csv:header+'\n'+row('import')+'\n'+row('import')});assert.ok(invalid.errors.length);assert.equal(invalid.previewId,null);
await wf(admin,'importPreview',{csv:'id,name,email,office,department,roles\n'+row('bad')},'',400);
const preview=await wf(hr,'importPreview',{csv:header+'\n'+row('import')});assert.equal(preview.errors.length,0);assert.equal((await wf(admin,'directory')).people.some(p=>p.id===id('import')),false);
await wf(admin,'importConfirm',{previewId:preview.previewId,reason:'Wrong actor'},'',409);
const imported=await wf(hr,'importConfirm',{previewId:preview.previewId,reason:'Confirmed test import'});assert.equal(imported.count,1);
await wf(hr,'importConfirm',{previewId:preview.previewId,reason:'Replay'},'',409);
assert.deepEqual((await profile('import')).roles,['employee']);
await portal(client(),'login',{email:id('import').toLowerCase()+'@hmf.example',password:'HmfDemo!2026'},'',401);
const formula=await create('formula',{name:'=HYPERLINK("example")'});
const csv=await wf(admin,'export',undefined,'&search='+encodeURIComponent(formula.id));assert.ok(csv.includes("'=HYPERLINK"));
assert.ok(!csv.includes('password_hash'));
console.log('PASS: CSV validation, preview before changes, actor-bound one-time import, no shared password or elevated role, formula-safe export');

const newOffice={code:'TEST'+nonce.toUpperCase(),name:'Test Pakistan office',country:'PK',timezone:'Asia/Karachi',active:true};
await wf(admin,'setting',{kind:'office',previous:null,value:newOffice,reason:'Office configuration test'});
await edit('outside',p=>({...p,office:newOffice.code}));
const officeMe=await portal(other,'me');assert.equal(officeMe.user.timezone,'Asia/Karachi');assert.equal(officeMe.today,new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()));
await wf(admin,'setting',{kind:'office',previous:newOffice,value:{...newOffice,active:false},reason:'Close test office to new assignments'});
await create('invalid-office',{office:newOffice.code}).then(()=>assert.fail('inactive office should reject'),e=>assert.ok(e.message.includes('Choose an active office')));
const events=(await wf(admin,'audit',undefined,'&id='+id('report'))).events;assert.ok(events.some(e=>e.action==='employee.updated'&&e.before_value&&e.after_value&&e.actor_id==='ADMIN'&&e.reason));
await wf(report,'deleteAudit',{id:events[0].id},'',400);
// Deactivate only this run's fixtures, retaining all local audit/attendance records.
for(const key of ['report','outside','import','formula','hr','system','manager'])await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
console.log('PASS: configurable office time zones, settings audit, immutable history, fixture cleanup by deactivation');
console.log('All Phase 1 integration checks passed.');
