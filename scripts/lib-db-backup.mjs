// Shared helpers for HMF database backups (scripts/db-backup.mjs, scripts/db-restore-check.mjs).
// Uses Node's built-in SQLite (node:sqlite) to inspect a backup without touching any live database.
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Tables the app cannot work without. A backup missing any of these is rejected.
export const REQUIRED_TABLES = [
  'employees',
  'attendance',
  'audit_events',
  'access_events',
  'employee_profiles',
  'access_grants',
  'directory_settings',
  'schedule_versions',
  'work_records',
  'leave_requests',
];
// Short-lived tables: expected to change between backup and check, and safe to lose.
export const VOLATILE_TABLES = ['sessions', 'login_attempts', 'write_guards', 'import_previews'];

const internal = (name) => name.startsWith('sqlite_') || name.startsWith('_cf_');

export const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

// Load an export into a private in-memory database. Foreign keys are off while loading because
// Cloudflare's export lists tables in storage order, not dependency order; they are checked after.
export function loadExport(path) {
  const db = new DatabaseSync(':memory:', { enableForeignKeyConstraints: false });
  db.exec(readFileSync(path, 'utf8'));
  return db;
}

export function inspect(db) {
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    .all()
    .map((r) => r.name)
    .filter((n) => !internal(n));
  const counts = Object.fromEntries(
    tables.map((t) => [t, Number(db.prepare(`SELECT count(*) AS n FROM "${t}"`).get().n)]),
  );
  const integrity = db.prepare('PRAGMA integrity_check').all().map((r) => r.integrity_check);
  const foreignKeyProblems = db.prepare('PRAGMA foreign_key_check').all().length;
  const missing = REQUIRED_TABLES.filter((t) => !tables.includes(t));
  const problems = [];
  if (integrity.join() !== 'ok') problems.push('SQLite integrity check failed: ' + integrity.join('; '));
  if (foreignKeyProblems) problems.push(`${foreignKeyProblems} rows point at records that do not exist`);
  if (missing.length) problems.push('Missing tables: ' + missing.join(', '));
  return { tables, counts, problems };
}

// Parents before children, so the restore never inserts a row before what it refers to.
function dependencyOrder(db, tables) {
  const parents = new Map(
    tables.map((t) => [
      t,
      db
        .prepare(`PRAGMA foreign_key_list("${t}")`)
        .all()
        .map((r) => r.table)
        .filter((p) => p !== t && tables.includes(p)),
    ]),
  );
  const done = [];
  const visit = (t, path = new Set()) => {
    if (done.includes(t) || path.has(t)) return;
    path.add(t);
    for (const p of parents.get(t)) visit(p, path);
    done.push(t);
  };
  tables.forEach((t) => visit(t));
  return done;
}

function literal(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : value.toPrecision(17);
  if (value instanceof Uint8Array) return "X'" + Buffer.from(value).toString('hex') + "'";
  return "'" + String(value).replace(/'/g, "''") + "'";
}

// A restore-ready SQL file: every table first, then data in dependency order, then indexes.
export function restoreSql(db) {
  db.setReadBigInts?.(true);
  const objects = db
    .prepare("SELECT type, name, sql FROM sqlite_master WHERE sql IS NOT NULL ORDER BY rowid")
    .all()
    .filter((o) => !internal(o.name));
  const tables = objects.filter((o) => o.type === 'table');
  const order = dependencyOrder(db, tables.map((t) => t.name));
  const lines = ['PRAGMA defer_foreign_keys=TRUE;'];
  for (const t of tables) lines.push(t.sql + ';');
  for (const name of order) {
    const statement = db.prepare(`SELECT * FROM "${name}"`);
    statement.setReadBigInts?.(true);
    for (const row of statement.iterate()) {
      const columns = Object.keys(row);
      lines.push(
        `INSERT INTO "${name}" (${columns.map((c) => `"${c}"`).join(',')}) VALUES (${columns
          .map((c) => literal(row[c]))
          .join(',')});`,
      );
    }
  }
  for (const o of objects.filter((o) => o.type !== 'table')) lines.push(o.sql + ';');
  return lines.join('\n') + '\n';
}

export function wrangler(args, { json = false } = {}) {
  const result = spawnSync(
    process.execPath,
    ['--import', './scripts/sites-env.mjs', 'node_modules/wrangler/bin/wrangler.js', ...args],
    { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 },
  );
  if (result.status !== 0) {
    const output = (result.stdout + '\n' + result.stderr)
      .split('\n')
      .filter((line) => line.trim() && !/Proxy environment variables/.test(line));
    throw new Error(output.slice(-8).join('\n'));
  }
  return json ? JSON.parse(result.stdout.slice(result.stdout.indexOf('['))) : result.stdout;
}

// Fingerprint of every row in every table, independent of insert order and SQL formatting.
export function contentFingerprints(db) {
  const out = {};
  for (const { name } of db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()) {
    if (internal(name)) continue;
    const statement = db.prepare(`SELECT * FROM "${name}"`);
    statement.setReadBigInts?.(true);
    const rows = [...statement.iterate()]
      .map((row) => JSON.stringify(row, (_, v) => (typeof v === 'bigint' ? 'n' + v : v instanceof Uint8Array ? 'b' + Buffer.from(v).toString('hex') : v)))
      .sort();
    out[name] = createHash('sha256').update(rows.join('\n')).digest('hex');
  }
  return out;
}
