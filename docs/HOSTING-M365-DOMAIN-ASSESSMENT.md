# HMF-owned hosting, Microsoft 365 sign-in and company domain — assessment

Date: 2026-11-21. Based on the current source in this folder. Nothing has been deployed, no DNS has been changed and no live data has been moved.

## 1. Where things stand

### Verified locally (2026-11-21, Node 22.23, fresh database)

| Check | Result |
| --- | --- |
| `npm ci` | OK, 692 packages, lockfile unchanged |
| `npm run build` | OK |
| `npm run test:prepare` (fresh local D1 + demo config) | OK |
| `npm run dev` (http://127.0.0.1:5173) | Running, demo logins work |
| TypeScript (`tsc --noEmit`) | Pass |
| Prettier check | Pass |
| Unit tests (core, hours, leave, design) | 22/22 pass |
| Migration preservation (`test-migrations.py`) | Pass |
| Integration suites: portal, phase one, two, three | Pass (also pass on a second run against the same database) |
| Browser + axe (desktop, tablet, mobile) | 6/6 pass |
| `npm run lint` | 56 errors, 39 warnings. Not part of `npm test` or CI. All are style rules in app code (`no-explicit-any` ×43, `react-hooks/set-state-in-effect` ×13). Logged in `docs/TODO.md`, not changed. |

Cloud-container note: the browser suite needed a local wrapper config because the pinned Playwright (1.65.1) expects a newer Chromium build than this container ships. That is an environment difference, not an app failure. On a normal machine or in CI, `npx playwright install chromium` is enough.

### Already implemented (inside the app, independent of hosting)
- Employee/admin email-and-password login with PBKDF2 hashes, opaque session tokens (hash-only in DB), 8-hour expiry, `HttpOnly; SameSite=Strict; Secure` (when on HTTPS) cookies
- Roles (employee, manager, HR admin, system admin) and office scopes, checked on the server
- Office-local dates (UK/Pakistan), schedules, clock-in/out, hours, corrections, audit history, CSV import/export
- Annual leave: requests, reservations, scoped approval, holiday calendars, immutable charges, attendance integration
- Privacy redaction of sensitive absence data; concurrency guards; additive migrations
- Demo seeding only with explicit server config (`HMF_DEMO_MODE`, `HMF_DEMO_PASSWORD`)

The app already runs on Cloudflare Workers + D1, so the move is to **HMF's own Cloudflare account**, not to a new platform.

## 2. What ties the app to the previous platform (OpenAI Sites)

| # | Location | What it does | Needed for HMF hosting |
| --- | --- | --- | --- |
| 1 | `app/chatgpt-auth.ts`, used by `app/page.tsx` and all four `app/api/*/route.ts` | Outer sign-in gate. Reads the `oai-authenticated-user-*` headers that the Sites platform injects. | **Must be replaced before any deployment.** On HMF's own Cloudflare nothing strips these headers, so any visitor could send them and pass the outer gate. The employee password would then be the only protection. |
| 2 | `sessions.owner_id` (migration 0000), written in `app/api/portal/route.ts`, checked in `app/lib/store.ts` `account()` | Ties each app session to the platform user | Keep the column (additive rule). Fill it with the new identity's subject (e.g. Entra `oid` / Access `sub`). |
| 3 | `vite.config.ts` + `.openai/hosting.json` | Local D1 binding with a placeholder ID and the old Sites project ID | Add an HMF-owned Wrangler deploy config for staging and production with the real D1 IDs. Leave the local dev config working. |
| 4 | `scripts/vite/sites-vite-plugin.ts` | Loopback-only mock sign-in (`seedy@sites.test`) and copying `dist/.openai` at build time | Dev only. Replace the mock with a local mock for the new identity provider. |
| 5 | `scripts/connector-preview/*`, `worker/index.ts`, `lib/connector*` | Sites connector emulation | Not used by HMF features. Can stay for now and be removed later as a cleanup. |
| 6 | `package.json` `"name": "site-creator-vinext-starter"` | Cosmetic | Rename when convenient. |

## 3. Recommended path

Keep Cloudflare Workers + D1 (as the handoff says). Work in this order:

### Step A — HMF-owned Cloudflare account and staging (no real data)
1. HMF creates a Cloudflare account under a **company** email (not a personal one), with at least two admins and MFA.
2. Create two D1 databases, `hmf-attendance-staging` and `hmf-attendance-prod`, and two Workers.
3. Add `wrangler.staging.jsonc` / `wrangler.production.jsonc` (or one file with `env` blocks) with the real `database_id`s, binding `DB` and `migrations_dir: "drizzle"`.
4. Apply migrations to **staging only** with `wrangler d1 migrations apply` and check them against `scripts/test-migrations.py`.
5. Set secrets with `wrangler secret put`, never in files. Production must **not** have `HMF_DEMO_MODE`.
6. Deploy to the default `*.workers.dev` URL for staging, behind the new sign-in (Step B). **Do not deploy until item 1 in section 2 is replaced.**

### Step B — Microsoft 365 sign-in (Entra ID)
Two workable designs. Recommended: **B1 first, then B2**.

**B1. Cloudflare Access with Entra ID as the identity provider (replaces the outer gate one-for-one)**
- Cloudflare Zero Trust → add Microsoft Entra ID as login method → Access application for the app hostname, allowing only HMF's tenant (optionally an Entra group).
- Replace `getChatGPTUser()` with a function that **verifies the `Cf-Access-Jwt-Assertion` JWT**: signature against `https://<team>.cloudflareaccess.com/cdn-cgi/access/certs`, `aud` = the application AUD tag, `iss`, `exp`. Never trust the `Cf-Access-Authenticated-User-Email` header alone.
- Small code change, same two-layer design as today, keeps the existing password step working during the move.
- Check the Zero Trust plan and user-count limits against HMF's headcount when setting up.

**B2. Single sign-on into the app's own session (removes the second password)**
- After B1 (or with a direct OIDC authorization-code + PKCE flow in the Worker), link the verified Microsoft identity to the employee record. Use the Entra `oid` as the stable key and match on email only the first time. Store the link in a **new additive table** (e.g. `identity_links`). Don't repurpose existing columns.
- Create the existing `hmf_session` from that link, so all role/scope checks, audit and redaction stay unchanged.
- Keep one break-glass system admin account with the existing password flow, MFA-protected and documented.
- Offboarding: disabling the user in Entra stops new sign-ins. Existing sessions last up to 8 hours, so deactivating the employee in the app (`active=0` / end date, already enforced in `context()`) remains part of the offboarding checklist.
- Replace the local mock (`sites-vite-plugin.ts`) with a loopback-only mock for the new identity, so tests keep running offline.

**Inputs only HMF can provide:** Entra tenant ID; someone with rights to register an app or grant admin consent; who may sign in (whole tenant or a group); confirmation that staff emails in the app match their Microsoft 365 addresses.

### Step C — Company domain
- Suggested hostname: `attendance.hmfconsultants.co.uk` (the domain used for the logo/photo source). HMF must confirm they own it and who manages its DNS.
- Cloudflare Workers Custom Domains need the zone (`hmfconsultants.co.uk`) on Cloudflare DNS on the standard plans. If DNS is with another provider, the options are:
  1. Move the zone's nameservers to Cloudflare. **All existing records must be copied first**, especially Microsoft 365 email records (MX, SPF, DKIM, autodiscover) and the website records, or email and the website will break.
  2. Use a Cloudflare plan that supports partial (CNAME) setup.
  3. Use a separate domain registered for the app.
  Check current plan rules when doing this. Do not change DNS until HMF's IT owner agrees.
- TLS certificates are issued automatically by Cloudflare once the domain is attached.
- The Access application (B1) and the Entra redirect URIs must use the final hostname. Do staging on `workers.dev` or `staging.attendance…` first.

### Step D — Before real staff use it (Phase 4 items)
- **Backups and a tested restore:** D1 Time Travel gives point-in-time restore for a limited window. Add independent scheduled exports (e.g. `wrangler d1 export` to HMF-owned storage), and run one restore into staging and check row counts before go-live.
- Data: the export contains **no live records**. Either HMF starts fresh (load real staff with the existing CSV import), or an authorized export of the current hosted database is obtained and imported with row-count and integrity checks.
- Retention policy, reminders, account recovery, and the HMF policy decisions listed in `REVIEW-IMPROVEMENTS.md` (allowances, carry-forward, leave year, holidays, breaks, overtime, deadlines). Do not assume defaults.
- Point CI (`.github/workflows/ci.yml`) at the HMF GitHub repository so it actually runs.

## 4. Remaining feature scope (unchanged from handoff)
Partial-day/hourly leave entry; cancellation or amendment of approved leave; more leave types; accrual/proration; carry-forward expiry; reminders; retention. No payroll integration.

## 5. Decisions needed from HMF / Ayaan
1. Who owns the HMF Cloudflare account (company email, admins)?
2. Microsoft 365: tenant ID, who can grant admin consent, whole tenant or a specific group?
3. B1 only, or B1 then B2 (single sign-on without a second password)?
4. Domain: confirm `attendance.hmfconsultants.co.uk` and who controls its DNS today.
5. Start with fresh data, or obtain an export of the current hosted database?
6. Leave and working-time policy values (see `REVIEW-IMPROVEMENTS.md`).
