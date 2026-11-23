// Creates the SQL for the first system administrator of a NEW, empty HMF database.
// Usage: node scripts/first-admin-sql.mjs --name "Full Name" --email person@hmfconsultants.co.uk --office UK > first-admin.sql
// Then:  npx wrangler d1 execute <database> --remote --config dist/server/wrangler.<env>.json --file first-admin.sql
// The emergency (break-glass) password is printed once to the terminal, never written to the file.
// Store it in HMF's password manager. Microsoft 365 sign-in works for this person without it.
// Add --no-password to skip it (sign-in only through Microsoft 365 / email code).
import { webcrypto as crypto } from 'node:crypto';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, i, all) => (value.startsWith('--') ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []),
);
const name = String(args.name || '').trim();
const email = String(args.email || '').trim().toLowerCase();
const office = String(args.office || '').trim().toUpperCase();
const id = String(args.id || 'HMF-ADMIN-1').trim();
// --no-password: sign-in only through the company sign-in (Microsoft 365 / email code); no break-glass.
const noPassword = process.argv.includes('--no-password');
if (!name || name.length > 120) throw new Error('--name is required');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('--email must be the person’s Microsoft 365 address');
if (!['UK', 'PK'].includes(office)) throw new Error('--office must be UK or PK');
if (!/^[A-Za-z0-9-]{2,40}$/.test(id)) throw new Error('--id: letters, digits and hyphens');

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%';
const password = noPassword ? '' : Array.from(crypto.getRandomValues(new Uint32Array(20)), (n) => alphabet[n % alphabet.length]).join('');
const salt = crypto.randomUUID();
// Same derivation as app/lib/store.ts passwordHash().
let hash = '!unset';
if (!noPassword) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
  hash = Buffer.from(bits).toString('hex');
}
const q = (v) => "'" + String(v).replace(/'/g, "''") + "'";
const now = new Date().toISOString();
const profile = JSON.stringify({ employmentStatus: 'active', jobTitle: 'System administrator' });

process.stdout.write(`-- First HMF system administrator. Plain INSERTs: fails safely if the record already exists.
INSERT INTO employees(id,name,email,office,department,role,password_hash,salt,active) VALUES (${[id, name, email, office, 'Management', 'admin', hash, salt].map(q).join(',')},1);
INSERT INTO access_grants(employee_id,roles,offices) VALUES (${q(id)},${q('["employee","hr_admin","system_admin"]')},${q('["UK","PK"]')});
INSERT INTO employee_profiles(employee_id,data,revision,created_at,updated_at) VALUES (${q(id)},${q(profile)},1,${q(now)},${q(now)});
`);
if (noPassword) process.stderr.write(`\nNo password set for ${email}: sign in with the company sign-in only.\n\n`);
else process.stderr.write(`\nBreak-glass password for ${email} (shown once, store it securely):\n  ${password}\n\n`);
