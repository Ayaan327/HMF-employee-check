import initSqlJs from 'sql.js/dist/sql-asm.js';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { PreviewD1 } from './d1';
import { runtime } from './runtime';
import { installServer } from './server';
import { prepareKeys, setSignInState, signInState } from './microsoft';
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
  if (!sqlite) sqlite = new SQL.Database();
  // Apply only migrations this browser's database has not had yet (additive upgrades, like
  // production). Databases saved by the first preview predate the tracking table.
  const hadEmployees = sqlite.exec("SELECT 1 FROM sqlite_master WHERE name='employees'").length > 0;
  const tracked = sqlite.exec("SELECT 1 FROM sqlite_master WHERE name='preview_migrations'").length > 0;
  sqlite.exec('CREATE TABLE IF NOT EXISTS preview_migrations(name TEXT PRIMARY KEY)');
  const names = Object.keys(migrations).sort();
  if (hadEmployees && !tracked)
    for (const name of names.filter((n) => /\/000[0-6]_[^/]*$/.test(n)))
      sqlite.run('INSERT OR IGNORE INTO preview_migrations VALUES (?)', [name.split('/').pop()!]);
  for (const name of names) {
    const file = name.split('/').pop()!;
    if (sqlite.exec('SELECT 1 FROM preview_migrations WHERE name=?', [file]).length) continue;
    sqlite.exec(migrations[name]);
    sqlite.run('INSERT INTO preview_migrations VALUES (?)', [file]);
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
  await prepareKeys();
  const signIn = signInState();
  if (signIn.mode === 'microsoft' && !signIn.email) return showMicrosoftPicker();
  const { default: Portal } = await import('../../app/portal');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Portal />
    </StrictMode>,
  );
}

// Stand-in for the Microsoft 365 account chooser that Cloudflare Access shows.
function showMicrosoftPicker() {
  const accounts = [
    ['employee.uk@hmf.example', 'Oliver Bennett · UK employee'],
    ['employee.pk@hmf.example', 'Ahmed Khan · Pakistan employee'],
    ['admin@hmf.example', 'HMF Administrator'],
    ['amelia.clarke@hmf.example', 'Amelia Clarke · UK employee'],
    ['visitor@contractor.example', 'Not an HMF employee'],
  ];
  const root = document.getElementById('root')!;
  root.innerHTML = `<main class="simple-login"><section class="simple-login-form ms-picker">
    <p class="eyebrow">Simulated Microsoft 365 sign-in</p>
    <h1>Pick an account</h1>
    <p class="muted">In the real app this is Microsoft's own sign-in page, shown by Cloudflare Access before the portal opens.</p>
    <div class="ms-accounts">${accounts
      .map(([email, label]) => `<button type="button" class="secondary" data-email="${email}"><strong>${email}</strong><small>${label}</small></button>`)
      .join('')}</div></section></main>`;
  root.querySelectorAll<HTMLButtonElement>('[data-email]').forEach((b) =>
    b.addEventListener('click', () => {
      setSignInState({ mode: 'microsoft', email: b.dataset.email });
      location.reload();
    }),
  );
}
for (const [id, mode] of [['mode-password', 'password'], ['mode-microsoft', 'microsoft']] as const) {
  const button = document.getElementById(id)!;
  if (signInState().mode === mode) button.setAttribute('aria-pressed', 'true');
  button.addEventListener('click', () => {
    try {
      sessionStorage.removeItem('hmf-preview-cookie');
    } catch {}
    setSignInState({ mode });
    location.reload();
  });
}
// The app's Microsoft sign-out lands here (see shims/platform-auth.ts).
window.addEventListener('hashchange', () => {
  if (location.hash !== '#signed-out') return;
  setSignInState({ mode: 'microsoft' });
  history.replaceState(null, '', location.pathname + location.search);
  location.reload();
});

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
