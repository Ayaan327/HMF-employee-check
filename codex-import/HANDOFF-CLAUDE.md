# HMF Attendance — Claude Code handoff

Work in `hmf-attendance/`, the current and most complete application. Older copies in `reference/` are historical evidence only. Do not overwrite current code with them.

## Goal and current implementation
Continue the HMF Engineering attendance/workforce application and prepare a concrete path to HMF-owned hosting and a company domain. Preserve the existing interface and workflows unless Ayaan requests changes. Save all work in this project folder.

Stack: TypeScript, React 19, Vinext/Next-compatible routing, Vite, Tailwind, Cloudflare Workers and D1, Drizzle ORM. Preserve package-lock.json. Database binding is DB. Inspect package.json, vite.config.ts, worker/index.ts, db/schema.ts and drizzle/ first.

Implemented: employee/admin authentication; office-local attendance (UK/Pakistan); employee profiles and scoped manager/HR/admin permissions; schedule configuration; clock-in/out and hours calculations; corrections and audit history; CSV import/export; annual-leave requests, pending balance reservations, scoped approval/decline, holiday policies, immutable leave charges and approved-leave attendance integration. Inspect source/tests to establish exact behavior.

Read README.md, PHASE-1.md, PHASE-2.md, PHASE-3.md, REVIEW-IMPROVEMENTS.md and TESTING.md. Phase 3 is partially implemented; planning documents are not proof of completion. The review export is historical evidence and may lag current source.

## Local setup — fresh extracted copy only
Use Node 24 (the package permits >=22.13.0) and npm. In hmf-attendance/:

    npm ci
    npm run build
    npm run test:prepare
    npm run dev

The preparation script applies all included SQL migrations to a fresh LOCAL D1 database and creates ignored local demo configuration. It refuses an existing employee database. Never run a database reset or blindly replay migrations against existing data. Local preview uses port 5173. Demo login details are in README.md; these are fictional accounts.

In a second terminal, run npm run test:unit or the full npm test. Browser setup may require npx playwright install chromium. Read TESTING.md for requirements. No dependency installation, full build, integration suite or browser suite was freshly verified as part of this export unless EXPORT-VALIDATION.md explicitly says so.

## Hosting and authentication portability
This application still includes Sites-specific authentication/runtime adapters. Read app/chatgpt-auth.ts, scripts/vite/sites-vite-plugin.ts, scripts/execution-profile.mjs, scripts/tool-environment.mjs and app/lib/store.ts before modifying authentication. The local mock is loopback-only. Production relies on trusted platform identity and must not trust client-supplied identity headers. Retain role/scope checks and session protections when replacing the platform boundary.

.openai/hosting.json is retained because the Vite configuration imports it. Its existing project ID is a reference, not a usable HMF-owned deployment or credential. Do not assume you can publish to the previous Sites project from Claude. Keep Cloudflare/D1 initially unless there is a concrete reason to change. Prepare portable staging configuration, HMF-owned Cloudflare resources, Microsoft 365 identity and custom-domain setup; document necessary account-specific inputs. Do not claim hosting or live data was migrated by copying source.

## Outstanding scope
Microsoft 365 sign-in; HMF-owned production infrastructure and staging; account recovery/offboarding; backups and tested restore; reminders; retention; rollout hardening. Later leave work includes partial-day/hourly entry, approved-leave cancellation/amendment, broader leave types, accrual/proration and carry expiry. No payroll integration is implemented. HMF must confirm holiday/leave-year/allowance/carry-forward and working-time policies; do not invent statutory defaults.

## Data and provenance
This export includes current source, tests, lockfile, migrations/snapshots, assets, documentation and available local HR practice materials, plus two earlier source versions. It does NOT contain live hosted database records, local runtime databases, active sessions, secrets, dependency installations, build outputs, git history or a complete transcript of ChatGPT conversations. Runtime databases are not safely interchangeable with production backups. If existing employee/attendance data must move, obtain an authorized database export and implement verified import, row-count/integrity checks and recovery separately. The superseded review ZIPs and original PC archive are omitted; the readable review and versioned source are included.

## Working instructions
Start by reporting what runs locally, what is implemented and the remaining blockers. Run the appropriate existing tests and preserve additive migrations, audit trails, privacy redaction, office dates, concurrency guards and employee data. Fix observed failures before claiming readiness. Do not remove authentication for a public deployment. Never deploy, migrate live data or change DNS just because this handoff asks for a migration plan.
