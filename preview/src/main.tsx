import initSqlJs from 'sql.js/dist/sql-asm.js';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { PreviewD1 } from './d1';
import { runtime } from './runtime';
import { installServer } from './server';
import '../../app/globals.css';
import './preview.css';

const KEY = 'hmf-preview-db-v1';
const migrations = import.meta.glob('../../drizzle/*.sql', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function toBase64(bytes: Uint8Array) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
function fromBase64(s: string) {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function boot() {
  const SQL = await initSqlJs();
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {}
  let sqlite;
  try {
    sqlite = saved ? new SQL.Database(fromBase64(saved)) : null;
  } catch {
    sqlite = null;
  }
  if (!sqlite) {
    sqlite = new SQL.Database();
    for (const name of Object.keys(migrations).sort()) sqlite.exec(migrations[name]);
  }
  sqlite.exec('PRAGMA foreign_keys = ON');
  const db: PreviewD1 = new PreviewD1(sqlite, () => {
    try {
      localStorage.setItem(KEY, toBase64(sqlite.export()));
    } catch {}
    // sql.js export() resets connection pragmas.
    sqlite.exec('PRAGMA foreign_keys = ON');
  });
  runtime.env.DB = db;
  installServer();
  const { default: Portal } = await import('../../app/portal');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Portal />
    </StrictMode>,
  );
}

// Inline confirmation: hosted previews block window.confirm().
const resetButton = document.getElementById('preview-reset')!;
const resetConfirm = document.getElementById('preview-reset-confirm')!;
resetButton.addEventListener('click', () => {
  resetButton.hidden = true;
  resetConfirm.hidden = false;
});
document.getElementById('preview-reset-no')!.addEventListener('click', () => {
  resetConfirm.hidden = true;
  resetButton.hidden = false;
});
document.getElementById('preview-reset-yes')!.addEventListener('click', () => {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.clear();
  } catch {}
  location.reload();
});

boot().catch((e) => {
  document.getElementById('root')!.innerHTML =
    '<p style="padding:2rem;font:16px system-ui">The preview could not start: ' + String(e?.message || e) + '</p>';
});
