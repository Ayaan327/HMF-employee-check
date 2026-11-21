import { env } from 'cloudflare:workers';
import { blankProfile, defaultDepartments, defaultOffices, defaultStatuses, dayInZone, requireValue, type Office, type Profile, type Role, type Schedule, type Status } from './core';

export type Account={id:string;name:string;email:string;office:string;department:string;role:string;password_hash:string;salt:string;active:number};
export type Person=Omit<Account,'password_hash'|'salt'> & {profile:Profile;roles:Role[];officeScope:string[];revision:number;createdAt:string|null;updatedAt:string|null;timezone:string};
export function db(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export const hex=(a:ArrayBuffer)=>Array.from(new Uint8Array(a),b=>b.toString(16).padStart(2,'0')).join('');
export async function digest(s:string){return hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)));}
export async function passwordHash(s:string,salt:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(s),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:100000,hash:'SHA-256'},key,256));}
export function sessionToken(req:Request){return(req.headers.get('cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('hmf_session='))?.slice(12)||'';}
export async function account(req:Request,ownerId:string){const token=sessionToken(req);if(!token)return null;return db().prepare('SELECT e.* FROM sessions s JOIN employees e ON e.id=s.employee_id WHERE s.token_hash=? AND s.owner_id=? AND s.expires_at>? AND e.active=1').bind(await digest(token),ownerId,Date.now()).first<Account>();}
export async function settings(){
  const result=(await db().prepare('SELECT * FROM directory_settings').all<{kind:string;code:string;data:string}>()).results;
  const combine=<T extends {code:string}>(kind:string,defaults:T[])=>Array.from(new Map([...defaults,...result.filter(r=>r.kind===kind).map(r=>JSON.parse(r.data) as T)].map(r=>[r.code,r])).values());
  return {offices:combine<Office>('office',defaultOffices),departments:combine('department',defaultDepartments.map(name=>({code:name,name,active:true}))),statuses:combine<Status>('status',defaultStatuses)};
}
export async function directory(){
  const [rows,config]=await Promise.all([db().prepare('SELECT e.*,p.data AS profile_data,p.revision,p.created_at,p.updated_at,g.roles AS grant_roles,g.offices AS grant_offices FROM employees e LEFT JOIN employee_profiles p ON p.employee_id=e.id LEFT JOIN access_grants g ON g.employee_id=e.id ORDER BY e.name').all<Account&{profile_data:string|null;revision:number|null;created_at:string|null;updated_at:string|null;grant_roles:string|null;grant_offices:string|null}>(),settings()]);
  return rows.results.map(e=>{
    // Only the pre-existing fictional ADMIN account receives the dual-role demo bridge.
    const legacyAdmin=e.id==='ADMIN'&&e.role==='admin'&&e.email==='admin@hmf.example';
    const roleList:Role[]=e.grant_roles?JSON.parse(e.grant_roles):legacyAdmin?['employee','hr_admin','system_admin']:['employee'];
    const profile:Profile={...blankProfile,employmentStatus:e.active?'active':'inactive',...(e.profile_data?JSON.parse(e.profile_data):{})};
    const {password_hash:_hash,salt:_salt,profile_data:_p,grant_roles:_r,grant_offices:_o,...base}=e;
    return {id:base.id,name:base.name,email:base.email,office:base.office,department:base.department,active:base.active,role:roleList.includes('system_admin')?'system_admin':roleList.includes('hr_admin')?'hr_admin':roleList.includes('manager')?'manager':'employee',roles:roleList,officeScope:e.grant_offices?JSON.parse(e.grant_offices):legacyAdmin?config.offices.map(o=>o.code):[],profile,revision:e.revision||0,createdAt:e.created_at,updatedAt:e.updated_at,timezone:profile.timezone||config.offices.find(o=>o.code===e.office)?.timezone||'UTC'} as Person;
  });
}
export const system=(p:Person)=>p.roles.includes('system_admin');
export const hr=(p:Person)=>p.roles.includes('hr_admin');
export const manages=(p:Person)=>system(p)||hr(p);
export const team=(p:Person)=>manages(p)||p.roles.includes('manager');
export function scope(actor:Person,target:Person){return actor.id===target.id||system(actor)||(hr(actor)&&actor.officeScope.includes(target.office))||(actor.roles.includes('manager')&&target.profile.managerId===actor.id);}
export const employmentAccess=(actor:Person,target:Person)=>system(actor)||(hr(actor)&&actor.officeScope.includes(target.office));
export const sensitiveAccess=(actor:Person,target:Person)=>actor.id===target.id||(hr(actor)&&actor.officeScope.includes(target.office));
export function safePerson(actor:Person,target:Person){
  const own=actor.id===target.id,full=own||employmentAccess(actor,target);
  return {...target,officeScope:system(actor)||own?target.officeScope:[],profile:full?target.profile:{...blankProfile,jobTitle:target.profile.jobTitle,managerId:target.profile.managerId,employmentStatus:target.profile.employmentStatus,weeklyMinutes:target.profile.weeklyMinutes,timezone:target.profile.timezone}};
}
export const publicPerson=(p:Person)=>({id:p.id,name:p.name,email:p.email,office:p.office,department:p.department,role:p.role,roles:p.roles,timezone:p.timezone,canManagePeople:manages(p),canConfigure:system(p),canViewTeam:team(p)});
export async function context(req:Request,ownerId:string){const a=await account(req,ownerId);if(!a)return null;const people=await directory(),me=people.find(p=>p.id===a.id);if(!me||me.profile.employmentStatus!=='active'||me.profile.endDate&&me.profile.endDate<dayInZone(me.timezone))return null;return {me,people};}
export const now=()=>new Date().toISOString();
export function audit(actorId:string,employeeId:string|null,action:string,before:unknown,after:unknown,reason:string,source='portal'){
  return db().prepare('INSERT INTO audit_events(id,employee_id,actor_id,action,before_value,after_value,reason,source,created_at) VALUES (?,?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(),employeeId,actorId,action,before===null?null:JSON.stringify(before),after===null?null:JSON.stringify(after),reason,source,now());
}
export function revisionGuard(id:string,revision:number){return db().prepare("SELECT json(CASE WHEN COALESCE((SELECT revision FROM employee_profiles WHERE employee_id=?),0)=? THEN '{}' ELSE 'STALE_RECORD' END)").bind(id,revision);}
export function directoryGuard(people:Person[]){return db().prepare("SELECT json(CASE WHEN (SELECT COUNT(*) FROM employees)+COALESCE((SELECT SUM(revision) FROM employee_profiles),0)=? THEN '{}' ELSE 'STALE_RECORD' END)").bind(people.length+people.reduce((n,p)=>n+p.revision,0));}
export async function schedules(id:string|null){const r=await db().prepare(id?'SELECT * FROM schedule_versions WHERE employee_id=? ORDER BY created_at DESC,id DESC':'SELECT * FROM schedule_versions WHERE employee_id IS NULL ORDER BY created_at DESC,id DESC').bind(...(id?[id]:[])).all<Omit<Schedule,'days'>&{days:string}>();return r.results.map(s=>({...s,days:JSON.parse(s.days)}));}
export async function attendanceRows(actor:Person,target:Person,date?:string){
  requireValue(scope(actor,target),'You do not have access to this employee.',403);
  const rows=(await db().prepare(`SELECT a.*,d.definition,d.approval,d.decided_by,d.decided_at,d.decision_note FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.employee_id=? ${date?'AND a.date=?':''} ORDER BY a.date DESC LIMIT 90`).bind(target.id,...(date?[date]:[])).all<Record<string,any>>()).results;
  return rows.map(row=>redactAttendance(actor,target,row));
}
export function redactAttendance(actor:Person,target:Person,row:Record<string,any>):Record<string,any>{
    const legacy=defaultStatuses.find(s=>s.code===row.status)||defaultStatuses.find(s=>s.code==='other')!;
    const definition:Status&{timezone?:string}=row.definition?JSON.parse(row.definition):{...legacy,label:row.status==='present'?'Present':legacy.label};
    const sensitive=definition.sensitive||['absent','other','sick_leave'].includes(row.status);
    const allowed=sensitiveAccess(actor,target);
    return {...row,status:sensitive&&!allowed?'unavailable':row.status,label:sensitive&&!allowed?'Unavailable':definition.label,reason:sensitive&&!allowed?'':row.reason,decision_note:sensitive&&!allowed?'':row.decision_note,timezone:definition.timezone||defaultOffices.find(o=>o.code===row.office)?.timezone||target.timezone,definition:undefined,category:definition.category,approval:row.approval||'not_required'};
}
