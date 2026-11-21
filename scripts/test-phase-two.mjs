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


const managerValue=await create('manager',{roles:['employee','manager'],officeScope:[]});
const staffValue=await create('staff',{profile:{...blank,managerId:id('manager')}});
const outsideValue=await create('outside',{office:'PK'});
const manager=await login(managerValue),staff=await login(staffValue),outside=await login(outsideValue);
const hrs=(c,a,b,q='',status=200)=>call(c,'hours',a,b,q,status);
await hrs(staff,'sheet',undefined,'&team=true',403);
await hrs(manager,'sheet',undefined,'&id='+id('outside'),403);
await hrs(staff,'policy',{policy:{},reason:'Forbidden'},'',403);
const oldPolicy=(await hrs(admin,'policy')).policy;
const policy={trackBreaks:true,breaksPaid:false,overtimeEnabled:true,overtimeApproval:true,graceMinutes:0,submissionDeadline:'09:00'};
await hrs(admin,'policy',{policy,previous:oldPolicy,reason:'Local Phase 2 test configuration'});
const days=Array.from({length:7},(_,day)=>({day,working:true,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
await wf(admin,'schedule',{employeeId:id('staff'),name:'Phase 2 fixture',kind:'base',startDate:'2026-01-01',endDate:'',days,reason:'Fictional test schedule'});
let today=await hrs(staff,'today');assert.equal(today.record,null);
const race=await Promise.all([hrs(staff,'checkIn',{status:'present'},'',null),hrs(staff,'checkIn',{status:'present'},'',null)]);
assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);
today=await hrs(staff,'today');assert.ok(today.open);assert.equal(today.record.employee_id,id('staff'));
await portal(staff,'logout',{});await portal(staff,'login',{email:staffValue.email,password});
assert.ok((await hrs(staff,'today')).open,'Logout must not clock out');
await hrs(staff,'checkOut',{date:today.today,revision:0,breakMinutes:0},'',409);
await hrs(staff,'checkOut',{date:today.today,revision:today.record.revision,breakMinutes:999},'',400);
await hrs(staff,'checkOut',{date:today.today,revision:today.record.revision,breakMinutes:0});
const checked=await hrs(staff,'today');assert.ok(checked.record.check_out);assert.equal(checked.open,null);assert.ok(checked.metrics.recordedMinutes>=0);
const yesterday=new Date(Date.parse(today.today+'T12:00:00Z')-86400000).toISOString().slice(0,10);
const times={checkIn:yesterday+'T09:00:00Z',checkOut:yesterday+'T18:00:00Z',breakMinutes:30};
let request=await hrs(staff,'requestCorrection',{date:yesterday,revision:0,times,reason:'Forgot yesterday’s check-in'});
await hrs(staff,'decideCorrection',{id:request.id,decision:'approved',reason:'Self approval'},'',403);
await hrs(outside,'decideCorrection',{id:request.id,decision:'approved',reason:'Outside scope'},'',403);
let sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].record,null);
await hrs(manager,'decideCorrection',{id:request.id,decision:'approved',reason:'Confirmed with employee'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].noResponse,false);assert.equal(sheet.rows[0].recordedMinutes,510);assert.equal(sheet.rows[0].differenceMinutes,60);assert.equal(sheet.rows[0].overtimeState,'pending');
await hrs(staff,'overtimeDecision',{employeeId:id('staff'),date:yesterday,revision:sheet.rows[0].record.revision,decision:'approved',reason:'Self overtime'},'',403);
await hrs(manager,'overtimeDecision',{employeeId:id('staff'),date:yesterday,revision:sheet.rows[0].record.revision,decision:'approved',reason:'Confirmed additional hour'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].overtimeState,'approved');
request=await hrs(staff,'requestCorrection',{date:yesterday,revision:sheet.rows[0].record.revision,times:{...times,checkOut:yesterday+'T17:00:00Z'},reason:'Please correct the finish time'});
await hrs(manager,'decideCorrection',{id:request.id,decision:'declined',reason:'Original finish confirmed'});
assert.equal((await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday)).rows[0].recordedMinutes,510);
request=await hrs(staff,'requestCorrection',{date:yesterday,revision:sheet.rows[0].record.revision,times,reason:'Cancel test request'});
await hrs(staff,'cancelCorrection',{id:request.id});
await hrs(manager,'decideCorrection',{id:request.id,decision:'approved',reason:'Already cancelled'},'',409);
const managerSheet=await hrs(manager,'sheet',undefined,'&team=true&start='+yesterday+'&end='+today.today);
assert.ok(managerSheet.rows.every(r=>[id('manager'),id('staff')].includes(r.employeeId)));
const csv=await hrs(manager,'export',undefined,'&team=true&start='+yesterday+'&end='+today.today);
assert.ok(csv.includes(id('staff')));assert.ok(!csv.includes(id('outside')));
await hrs(admin,'policy',{policy:{...policy,breaksPaid:true,overtimeEnabled:false},previous:policy,reason:'Test policy snapshots'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].recordedMinutes,510);assert.equal(sheet.rows[0].overtimeState,'approved');
const events=(await wf(admin,'audit',undefined,'&id='+id('staff'))).events;assert.ok(events.some(e=>e.action==='hours.check_in'));assert.ok(events.some(e=>e.action==='hours.correction_approved'));assert.ok(events.some(e=>e.action==='hours.overtime_approved'));
await hrs(admin,'policy',{policy:oldPolicy,previous:(await hrs(admin,'policy')).policy,reason:'Restore local policy'});
for(const key of ['staff','outside','manager'])await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
console.log('PASS: clock-in races, explicit checkout, logout separation, scoped timesheets/exports, correction approval/decline/cancellation, overtime approval, immutable policy snapshots and audits');
