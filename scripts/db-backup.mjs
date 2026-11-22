// Back up the HMF attendance database to a .sql file plus a manifest (row counts, fingerprint).
//   npm run db:backup -- staging            (remote; needs `npx wrangler login` and the deploy config)
//   npm run db:backup -- production --out "/path/to/HMF OneDrive/Attendance backups"
//   npm run db:backup -- local              (the local test database; for rehearsals)
// Backups contain personal data. Keep them in HMF-controlled storage, never in this repository.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { inspect, loadExport, sha256, wrangler } from './lib-db-backup.mjs';

const [target, ...rest] = process.argv.slice(2);
if (!['local', 'staging', 'production'].includes(target)) {
  console.error('Usage: npm run db:backup -- local|staging|production [--out <folder>]');
  process.exit(1);
}
const outIndex = rest.indexOf('--out');
const outDir = path.resolve(outIndex >= 0 ? rest[outIndex + 1] : 'backups');
mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const file = path.join(outDir, `hmf-attendance-${target}-${stamp}.sql`);

let database = 'DB';
if (target === 'local') {
  // `wrangler d1 export --local` cannot be pointed at the dev server's state folder, so export
  // from a temporary copy of it. The dev database itself is only read.
  if (!existsSync('.wrangler/state/v3/d1')) throw new Error('No local database found. Run npm run test:prepare first.');
  const temp = mkdtempSync(path.join(tmpdir(), 'hmf-backup-'));
  try {
    cpSync('dist/server/wrangler.json', path.join(temp, 'wrangler.json'));
    cpSync('.wrangler/state/v3/d1', path.join(temp, '.wrangler/state/v3/d1'), { recursive: true });
    wrangler(['d1', 'export', 'DB', '--local', '--config', path.join(temp, 'wrangler.json'), '--output', file]);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
} else {
  const config = `dist/server/wrangler.${target}.json`;
  if (!existsSync(config)) throw new Error(`${config} not found. Run npm run build and node scripts/make-deploy-config.mjs ${target} first.`);
  database = JSON.parse(readFileSync(config, 'utf8')).d1_databases[0].database_name;
  wrangler(['d1', 'export', database, '--remote', '--config', config, '--output', file]);
}

const report = inspect(loadExport(file));
const manifest = {
  file: path.basename(file),
  environment: target,
  database,
  createdAt: new Date().toISOString(),
  bytes: statSync(file).size,
  sha256: sha256(file),
  tables: report.counts,
  problems: report.problems,
};
writeFileSync(file.replace(/\.sql$/, '.manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Backup written: ${file}`);
console.log(`  ${Object.keys(report.counts).length} tables · ${report.counts.employees ?? 0} employees · ${report.counts.attendance ?? 0} attendance records · ${report.counts.audit_events ?? 0} audit events`);
if (report.problems.length) {
  console.error('BACKUP HAS PROBLEMS:\n - ' + report.problems.join('\n - '));
  process.exit(1);
}
console.log(`Next: npm run db:restore-check -- "${file}"`);
