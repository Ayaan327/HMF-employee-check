import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';

function run(command,args) {
  const result=spawnSync(command,args,{stdio:'inherit'});
  if(result.error) throw result.error;
  if(result.status!==0) process.exit(result.status||1);
}
run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit']);
run(process.execPath,['node_modules/prettier/bin/prettier.cjs','--check','app','db/schema.ts','tests','playwright.config.ts']);
run(process.execPath,['--test',...readdirSync('scripts').filter(n=>/^test-(core|hours|leave|design|identity)\.mjs$/.test(n)).map(n=>'scripts/'+n)]);
run('python3',['scripts/test-migrations.py']);
try {
  const response=await fetch('http://127.0.0.1:5173/',{redirect:'manual',signal:AbortSignal.timeout(5000)});
  if(response.status>=500) throw new Error('The local preview returned a server error.');
} catch {
  console.error('Start the local test preview with npm run dev before running integration/browser tests. See TESTING.md.');
  process.exit(1);
}
for(const file of ['test-portal.mjs','test-phase-one.mjs','test-phase-two.mjs','test-phase-three.mjs']) run(process.execPath,['scripts/'+file]);
run(process.execPath,['node_modules/@playwright/test/cli.js','test']);
console.log('All unit, migration, integration and browser checks passed.');
