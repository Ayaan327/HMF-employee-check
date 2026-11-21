"""Rehearse additive upgrades in an isolated in-memory SQLite database."""
import sqlite3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
db = sqlite3.connect(':memory:')
db.execute('PRAGMA foreign_keys=ON')
for filename in ['0000_quick_lyja.sql', '0001_cuddly_dagger.sql']:
    db.executescript((root / 'drizzle' / filename).read_text())
db.execute("INSERT INTO employees VALUES ('E1','Original employee','test@hmf.example','UK','Engineering','employee','test-hash','salt',1)")
db.execute("INSERT INTO attendance VALUES ('E1','2026-01-01','present','','UK','2026-01-01T09:00:00Z','2026-01-01T09:00:00Z','employee')")
db.execute("INSERT INTO audits VALUES ('A1','E1','2026-01-01','E1',NULL,'present','Employee submitted attendance','2026-01-01T09:00:00Z')")
db.execute("INSERT INTO access_events VALUES ('X1','E1','sign_in','2026-01-01T09:00:00Z','UK')")
tables = ['employees', 'attendance', 'audits', 'access_events', 'sessions', 'login_attempts']
before = {table: db.execute(f'SELECT * FROM {table}').fetchall() for table in tables}
columns = {table: db.execute(f'PRAGMA table_info({table})').fetchall() for table in tables}
for file in sorted((root / 'drizzle').glob('*.sql')):
    if int(file.name[:4]) >= 2:
        db.executescript(file.read_text())
for table in tables:
    assert db.execute(f'SELECT * FROM {table}').fetchall() == before[table], table
    assert db.execute(f'PRAGMA table_info({table})').fetchall() == columns[table], table
assert not db.execute('PRAGMA foreign_key_check').fetchall()
# The previous Worker uses positional inserts: these must still work after migrations.
db.execute("INSERT INTO employees VALUES ('E2','Old-worker insert','old@hmf.example','PK','Engineering','employee','test-hash','salt',1)")
print('PASS: new migrations preserve every legacy row and column; old-worker writes and foreign keys remain valid.')
