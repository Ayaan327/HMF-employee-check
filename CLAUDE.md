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

## Docs
- `README.md`, `PHASE-1/2/3.md`, `REVIEW-IMPROVEMENTS.md`, `TESTING.md`: feature and test docs from the handoff (plans are not proof of completion)
- `docs/HOSTING-M365-DOMAIN-ASSESSMENT.md`: path to HMF-owned Cloudflare, Microsoft 365 sign-in, company domain
- `docs/DECISIONS.md`: decision log. `docs/TODO.md`: open work. `docs/PROJECT_BRIEF.md`: summary

## Rules
- Preserve existing features, interface and workflows unless Ayaan asks for changes.
- Migrations are additive only. Never reset a database or replay migrations against existing data.
- Keep audit trails, privacy redaction, office-local dates, role/scope checks and concurrency guards intact.
- `app/chatgpt-auth.ts` trusts platform-injected `oai-authenticated-user-*` headers. That is only safe on OpenAI Sites.
  **Do not deploy anywhere else until that gate is replaced** (see the assessment doc). Never remove authentication.
- Never deploy, migrate live data or change DNS without Ayaan's explicit go-ahead.
- No real employee data, secrets, `.dev.vars` or `.env` files in the repo. Do not invent statutory leave/working-time policy.
- Record significant decisions in `docs/DECISIONS.md`; keep `docs/TODO.md` current.
