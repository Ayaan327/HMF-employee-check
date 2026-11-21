import assert from 'node:assert/strict';
export const origin='http://127.0.0.1:5173'; // Synthetic writes are local-only.
const platformCookie=(await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'})).headers.getSetCookie()[0].split(';')[0];
export const client=()=>({cookie:platformCookie});
export async function call(c,route,action,body,query='',expected=200){
  const response=await fetch(origin+'/api/'+route+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=response.headers.get('content-type')?.includes('application/json')?await response.json():await response.text();
  if(expected!==null)assert.equal(response.status,expected,action+': '+JSON.stringify(data));
  const session=response.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));if(session)c.cookie=platformCookie+'; '+session.split(';')[0];
  return expected===null?{status:response.status,data}:data;
}
export const wf=(c,a,b,q='',s=200)=>call(c,'workforce',a,b,q,s),portal=(c,a,b,q='',s=200)=>call(c,'portal',a,b,q,s);
export const admin=client();await portal(admin,'login',{email:'admin@hmf.example',password:'HmfDemo!2026'});
export const nonce=Date.now().toString(36),password='Phase1-Test-Password!',id=key=>'T'+nonce+'-'+key;
export const blank={telephone:'',jobTitle:'',managerId:'',startDate:'',endDate:'',employmentStatus:'active',employmentType:'',weeklyMinutes:null,timezone:'',holidayAllowance:null,carriedForward:null,holidayUnit:'days'};
const employee=(key,overrides={})=>({id:id(key),name:'Test '+key,email:id(key).toLowerCase()+'@hmf.example',office:'UK',department:'Electrical Engineering',profile:{...blank},revision:0,...overrides});
export async function create(key,overrides={}){const value=employee(key,{password,...overrides});await wf(admin,'employee',{employee:value,reason:'Automated Phase 1 fixture'});return value;}
export async function profile(key){return(await wf(admin,'profile',undefined,'&id='+id(key))).person;}
export async function edit(key,fn,actor=admin,expected=200){const p=await profile(key),next=fn(p);return wf(actor,'employee',{employee:next,reason:'Automated Phase 1 edit'},'',expected);}
export async function login(value){const c=client();await portal(c,'login',{email:value.email,password});return c;}

