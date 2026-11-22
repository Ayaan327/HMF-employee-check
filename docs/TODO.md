# TODO

## Done
- [x] Import Codex handoff (checksums verified 473/473), build, prepare local DB, run demo
- [x] Full test suite passes locally (tsc, prettier, 22 unit, migrations, 4 integration suites, 6 browser/axe)
- [x] Hosting / Microsoft 365 / domain assessment: `docs/HOSTING-M365-DOMAIN-ASSESSMENT.md`

- [x] UI redesign (single stylesheet, clearer Today/Hours/Settings/People) with all tests passing
- [x] Demo hints (demo accounts, "Private demo") only shown when HMF_DEMO_MODE is on
- [x] Browser preview build in `preview/` (`cd preview && npm install && npm run build`)

## Blocked on HMF decisions (see assessment, section 5)
- [ ] HMF Cloudflare account owner and admins
- [ ] Entra tenant ID and admin consent; tenant-wide or group access
- [ ] Domain and DNS owner (`attendance.hmfconsultants.co.uk`?)
- [ ] Fresh start vs export of the current hosted database
- [ ] Leave and working-time policy values

## Engineering, can start now
- [x] Replace the Sites-only gate with verified Cloudflare Access JWT checks (fails closed)
- [x] Microsoft 365 SSO into employee sessions, `identity_links` table, break-glass admin password
- [x] Staging/production deploy settings, generator, setup guide (`deploy/README.md`), first-admin script
- [ ] Run the staging setup on HMF's real Cloudflare + Entra (needs HMF accounts)
- [x] HR/system admins see Microsoft sign-in status in People and on profiles (rollout progress)
- [ ] Optional: admin action to remove a Microsoft sign-in link (links follow the employee's email today)
- [x] Backup script, restore drill (`npm run db:backup`, `npm run db:restore-check`) and guide (`docs/BACKUPS.md`)
- [ ] HMF: choose restricted storage for backups and who runs them; first production backup + drill before go-live
- [ ] Put this folder in an HMF GitHub repo so CI runs

## Cleanup
- [ ] Preview limitation: CSV downloads are blocked by the claude.ai viewer (work in the real app)
- [x] Lint now 0 errors and runs in `npm test`/CI; unused imports and the dead Offices screen removed
- [ ] Optional: replace remaining `any` types (request JSON, D1 rows) and rework effect-based state resets (warnings only)
- [ ] Remove unused Sites connector-preview scaffolding and the `sites` mode once HMF hosting is live
- [ ] Rename package from `site-creator-vinext-starter`

## Later features
- [x] Cancel approved leave (employee before it starts; manager/HR any time with a reason)

Partial-day/hourly leave, amending approved leave (change dates), more leave types, accrual/proration, carry expiry, reminders, retention.
