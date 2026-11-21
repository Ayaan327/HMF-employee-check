import {spawnSync} from 'node:child_process';
import {existsSync,readFileSync,readdirSync,writeFileSync} from 'node:fs';

// For a fresh, local-only CI checkout. Refuse to reset an existing database.
function sql(args) {
  const result=spawnSync(process.execPath,['--import','./scripts/sites-env.mjs','node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','dist/server/wrangler.json','--persist-to','.wrangler/state',...args],{encoding:'utf8'});
  if(result.status!==0) throw new Error(result.stderr||result.stdout);
  return result.stdout;
}
if(!existsSync('dist/server/wrangler.json')) throw new Error('Run npm run build first.');
const existing=JSON.parse(sql(['--command',"SELECT name FROM sqlite_master WHERE name='employees'",'--json']));
if(existing.some(r=>r.results.length)) throw new Error('An employee database already exists. Apply only pending migrations; this script never resets data.');
for(const file of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()) sql(['--file','drizzle/'+file]);
const vars='HMF_DEMO_MODE="true"\nHMF_DEMO_PASSWORD="HmfDemo!2026"\n';
if(existsSync('.dev.vars') && readFileSync('.dev.vars','utf8')!==vars) throw new Error('Existing .dev.vars left unchanged. Configure explicit demo seeding yourself.');
if(!existsSync('.dev.vars')) writeFileSync('.dev.vars',vars,{flag:'wx',mode:0o600});
console.log('Fresh local test database prepared. Demo seeding is explicitly enabled only in ignored .dev.vars.');
