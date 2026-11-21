// Minimal Cloudflare D1 adapter over sql.js, for the browser preview only.
// Mirrors the parts of the D1 API the app uses: prepare/bind/first/all/run/raw and atomic batch().
import type { Database, SqlValue } from 'sql.js';

type Bound = SqlValue | boolean | undefined;
const norm = (v: Bound): SqlValue => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : v);

function wrap(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);
  return new Error('D1_ERROR: ' + message, { cause: error });
}

export class PreviewStatement {
  constructor(
    private readonly database: PreviewD1,
    readonly sql: string,
    readonly params: SqlValue[] = [],
  ) {}
  bind(...values: Bound[]) {
    return new PreviewStatement(this.database, this.sql, values.map(norm));
  }
  rows(): Record<string, SqlValue>[] {
    const stmt = this.database.sqlite.prepare(this.sql);
    try {
      stmt.bind(this.params);
      const out: Record<string, SqlValue>[] = [];
      while (stmt.step()) out.push(stmt.getAsObject());
      return out;
    } finally {
      stmt.free();
    }
  }
  exec() {
    const rows = this.rows();
    const changes = this.database.sqlite.getRowsModified();
    const last = this.database.sqlite.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] ?? 0;
    return { results: rows, success: true, meta: { changes, last_row_id: Number(last), duration: 0 } };
  }
  async first<T = Record<string, unknown>>(column?: string): Promise<T | null> {
    try {
      const row = this.rows()[0];
      if (!row) return null;
      return (column ? row[column] : row) as T;
    } catch (e) {
      throw wrap(e);
    }
  }
  async all<T = Record<string, unknown>>() {
    try {
      const r = this.exec();
      this.database.touched();
      return r as unknown as { results: T[]; success: true; meta: typeof r.meta };
    } catch (e) {
      throw wrap(e);
    }
  }
  async run() {
    return this.all();
  }
  async raw<T = unknown[]>(): Promise<T[]> {
    try {
      return this.rows().map((r) => Object.values(r)) as T[];
    } catch (e) {
      throw wrap(e);
    }
  }
}

export class PreviewD1 {
  private dirty = false;
  constructor(
    readonly sqlite: Database,
    private readonly onChange: () => void,
  ) {}
  touched() {
    if (!this.dirty) {
      this.dirty = true;
      queueMicrotask(() => {
        this.dirty = false;
        this.onChange();
      });
    }
  }
  prepare(sql: string) {
    return new PreviewStatement(this, sql);
  }
  async batch(statements: PreviewStatement[]) {
    // D1 batches are atomic: one failing statement rolls back the whole batch.
    this.sqlite.run('BEGIN');
    try {
      const results = statements.map((s) => s.exec());
      this.sqlite.run('COMMIT');
      this.touched();
      return results;
    } catch (e) {
      this.sqlite.run('ROLLBACK');
      throw wrap(e);
    }
  }
  async exec(sql: string) {
    try {
      this.sqlite.exec(sql);
      this.touched();
      return { count: 1, duration: 0 };
    } catch (e) {
      throw wrap(e);
    }
  }
}
