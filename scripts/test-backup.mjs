import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { contentFingerprints, inspect, loadExport, restoreSql } from './lib-db-backup.mjs';

const dir = mkdtempSync(path.join(tmpdir(), 'hmf-backup-test-'));
// Child table created before its parent, like Cloudflare's export order.
const exportSql = `PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE notes (id integer PRIMARY KEY, employee_id text NOT NULL REFERENCES employees(id), body text, amount real, big integer, raw blob);
INSERT INTO notes VALUES (1,'E1','O''Brien said: "late"; then
left early',7.25,9007199254740993,X'00ff10');
INSERT INTO notes VALUES (2,'E2','دفتر — 午後 ✓ 🙂',NULL,-1,NULL);
CREATE TABLE employees (id text PRIMARY KEY, name text NOT NULL);
INSERT INTO employees VALUES ('E1','Siobhán O''Neill');
INSERT INTO employees VALUES ('E2','Ahmed Khan');
CREATE INDEX notes_employee ON notes(employee_id);
`;

test('restore file reproduces every value exactly, in loadable order', () => {
  const file = path.join(dir, 'export.sql');
  writeFileSync(file, exportSql);
  const original = loadExport(file);
  const restoreFile = path.join(dir, 'export.restore.sql');
  const sql = restoreSql(original);
  writeFileSync(restoreFile, sql);
  assert.ok(sql.indexOf('INSERT INTO "employees"') < sql.indexOf('INSERT INTO "notes"'), 'parents inserted first');
  // Loads with foreign keys enforced (as D1 does), which the raw export order would not.
  const strict = new DatabaseSync(':memory:');
  strict.exec(sql);
  assert.deepEqual(contentFingerprints(strict), contentFingerprints(original));
  const row = strict.prepare('SELECT body, amount, raw FROM notes WHERE id=1').get();
  assert.equal(row.body, 'O\'Brien said: "late"; then\nleft early');
  assert.equal(row.amount, 7.25);
  assert.equal(Buffer.from(row.raw).toString('hex'), '00ff10');
  const big = strict.prepare('SELECT big FROM notes WHERE id=1');
  big.setReadBigInts(true);
  assert.equal(big.get().big, 9007199254740993n);
  assert.equal(strict.prepare('SELECT body FROM notes WHERE id=2').get().body, 'دفتر — 午後 ✓ 🙂');
});

test('inspection reports missing required tables and broken references', () => {
  const file = path.join(dir, 'broken.sql');
  writeFileSync(file, exportSql.replace("INSERT INTO employees VALUES ('E2','Ahmed Khan');", ''));
  const report = inspect(loadExport(file));
  assert.ok(report.problems.some((p) => p.includes('point at records that do not exist')));
  assert.ok(report.problems.some((p) => p.startsWith('Missing tables')));
});
