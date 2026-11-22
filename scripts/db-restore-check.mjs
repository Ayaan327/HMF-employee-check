// Restore drill: prove a backup can be restored, without touching any live database.
//   npm run db:restore-check -- backups/hmf-attendance-production-....sql
// 1. Checks the file against its manifest fingerprint (not damaged or altered).
// 2. Checks SQLite integrity, broken references and required tables.
// 3. Writes <backup>.restore.sql: the same data ordered so Cloudflare D1 can load it
//    (raw D1 exports fail to restore: tables appear before the tables they refer to).
// 4. Restores that file into a brand-new, temporary local D1 database and compares every
//    table's row count with the manifest. PASS only if all of this succeeds.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { VOLATILE_TABLES, contentFingerprints, inspect, loadExport, restoreSql, sha256, wrangler } from './lib-db-backup.mjs';

const file = process.argv[2];
if (!file || !existsSync(file)) {
  console.error('Usage: npm run db:restore-check -- <backup .sql file>');
  process.exit(1);
}
const failures = [];
const manifestPath = file.replace(/\.sql$/, '.manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : null;
if (!manifest) failures.push('No manifest next to the backup; row counts cannot be confirmed.');
else if (manifest.sha256 !== sha256(file)) failures.push('Fingerprint mismatch: the backup file changed or is damaged.');

const db = loadExport(file);
const report = inspect(db);
failures.push(...report.problems);

const restoreFile = file.replace(/\.sql$/, '.restore.sql');
writeFileSync(restoreFile, restoreSql(db));
// The restore-ready file must hold exactly the same rows, value for value.
const original = contentFingerprints(db);
const rebuilt = contentFingerprints(loadExport(restoreFile));
for (const table of Object.keys(original))
  if (original[table] !== rebuilt[table]) failures.push(`${table}: restore file content differs from the backup`);

// Restore into an empty scratch D1 database (local, temporary) using Cloudflare's own engine.
const scratch = mkdtempSync(path.join(tmpdir(), 'hmf-restore-'));
const restored = {};
try {
  wrangler(['d1', 'execute', 'DB', '--local', '--config', 'dist/server/wrangler.json', '--persist-to', scratch, '--file', restoreFile]);
  // One SELECT of scalar subqueries: D1 limits how many queries a UNION may combine.
  const query = 'SELECT ' + Object.keys(report.counts).map((t) => `(SELECT count(*) FROM "${t}") AS "${t}"`).join(', ');
  const rows = wrangler(['d1', 'execute', 'DB', '--local', '--config', 'dist/server/wrangler.json', '--persist-to', scratch, '--json', '--command', query], { json: true });
  for (const [table, n] of Object.entries(rows[0].results[0])) restored[table] = Number(n);
} catch (error) {
  failures.push('Restore into a fresh D1 database failed: ' + error.message);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

console.log('Table                      backup  restored');
for (const [table, count] of Object.entries(report.counts)) {
  const expected = manifest?.tables?.[table];
  const got = restored[table];
  const flag = got !== count || (expected !== undefined && expected !== count && !VOLATILE_TABLES.includes(table)) ? '  <-- MISMATCH' : '';
  if (flag) failures.push(`${table}: manifest ${expected}, file ${count}, restored ${got}`);
  console.log(`${table.padEnd(26)} ${String(count).padStart(6)}  ${String(got ?? '-').padStart(8)}${flag}`);
}
if (failures.length) {
  console.error('\nRESTORE CHECK FAILED:\n - ' + failures.join('\n - '));
  process.exit(1);
}
console.log(`\nPASS: ${path.basename(file)} restores completely into a fresh database.`);
console.log(`Restore-ready file: ${restoreFile}`);
