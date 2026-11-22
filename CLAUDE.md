# HMF Attendance — project instructions for Claude

This repository is dedicated **only** to the HMF Engineering attendance/workforce app and things directly related to it.

The repository root **is** the application (imported from the Codex/ChatGPT handoff on 2026-11-21).
`codex-import/` holds the original handoff notes (`HANDOFF-CLAUDE.md`, `START-HERE.md`), checksums and
`reference/` (two earlier source versions + the AI review). Those are historical evidence only: never copy
them over current code. They are excluded from TypeScript and ESLint.

## Stack
TypeScript, React 19, Vinext (Next-compatible routing) on Vite, Tailwind 4, Cloudflare Workers + D1, Drizzle ORM.
D1 binding is `DB`. Preserve `package-lock.json`. Node >= 22.13 (CI uses 24), npm.

## Run and test (fresh checkout)
    npm ci
    npm run build
    npm run test:prepare   # fresh LOCAL D1 only; refuses an existing employee DB
    npm run dev            # http://127.0.0.1:5173
    npm test               # second terminal; needs the dev server

Demo logins (fictional): admin@hmf.example, employee.uk@hmf.example, employee.pk@hmf.example, password `HmfDemo!2026`.
`npm run test:unit` needs no server. See `TESTING.md`. In this cloud container, run browser tests with
`npx playwright test -c <scratchpad>/pw-local.config.ts`, a wrapper pointing at `/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## Browser preview
`preview/` builds the real UI + API routes to run fully in a browser (sql.js, demo data only) for claude.ai:
`cd preview && npm install && npm run build` → `preview/dist/artifact.html` + `preview/dist/assets/*`.
Shims live in `preview/src/` (D1 adapter, cookie/origin handling). Not deployable; never put real data in it.

## Docs
- `README.md`, `PHASE-1/2/3.md`, `REVIEW-IMPROVEMENTS.md`, `TESTING.md`: feature and test docs from the handoff (plans are not proof of completion)
- `docs/HOSTING-M365-DOMAIN-ASSESSMENT.md`: path to HMF-owned Cloudflare, Microsoft 365 sign-in, company domain
- `docs/DECISIONS.md`: decision log. `docs/TODO.md`: open work. `docs/PROJECT_BRIEF.md`: summary

## Rules
- Preserve existing features, interface and workflows unless Ayaan asks for changes.
- Migrations are additive only. Never reset a database or replay migrations against existing data.
- Keep audit trails, privacy redaction, office-local dates, role/scope checks and concurrency guards intact.
- Sign-in: `app/lib/identity.ts` (pure, unit-tested) + `app/platform-auth.ts`. `HMF_AUTH_MODE` = `cloudflare-access`
  (HMF hosting: verified Access JWT + Microsoft 365 SSO via the `sso` action) or `sites` (legacy platform / local dev).
  Unset in production = every request refused. Never trust identity headers outside `sites` mode. Never remove authentication.
- Backups: `docs/BACKUPS.md`, `npm run db:backup -- local|staging|production`, `npm run db:restore-check -- <file>`. Backups hold personal data: never commit them.
- Pitch demo (own account, email-code sign-in): `docs/DEMO-SETUP.md`, `deploy/demo.json`, `scripts/demo-testers-sql.mjs`.
- HMF deployment: `deploy/README.md`, `deploy/*.json`, `scripts/make-deploy-config.mjs`, `scripts/first-admin-sql.mjs`.
- Never deploy, migrate live data or change DNS without Ayaan's explicit go-ahead.
- No real employee data, secrets, `.dev.vars` or `.env` files in the repo. Do not invent statutory leave/working-time policy.
- Record significant decisions in `docs/DECISIONS.md`; keep `docs/TODO.md` current.
