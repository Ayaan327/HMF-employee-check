# TODO

## Done
- [x] Import Codex handoff (checksums verified 473/473), build, prepare local DB, run demo
- [x] Full test suite passes locally (tsc, prettier, 22 unit, migrations, 4 integration suites, 6 browser/axe)
- [x] Hosting / Microsoft 365 / domain assessment: `docs/HOSTING-M365-DOMAIN-ASSESSMENT.md`

- [x] UI redesign (single stylesheet, clearer Today/Hours/Settings/People) with all tests passing
- [x] Browser preview build in `preview/` (`cd preview && npm install && npm run build`)

## Blocked on HMF decisions (see assessment, section 5)
- [ ] HMF Cloudflare account owner and admins
- [ ] Entra tenant ID and admin consent; tenant-wide or group access
- [ ] Domain and DNS owner (`attendance.hmfconsultants.co.uk`?)
- [ ] Fresh start vs export of the current hosted database
- [ ] Leave and working-time policy values

## Engineering, can start now
- [ ] Replace `app/chatgpt-auth.ts` platform gate with a verified Cloudflare Access JWT check plus a local mock (required before any deploy)
- [ ] Add staging/production Wrangler configs with `migrations_dir: "drizzle"` (placeholder IDs until account exists)
- [ ] Additive `identity_links` table and SSO-linked sessions; break-glass admin
- [ ] Backup export script and restore drill procedure
- [ ] Put this folder in an HMF GitHub repo so CI runs

## Cleanup
- [ ] Preview limitation: CSV downloads are blocked by the claude.ai viewer (work in the real app)
- [ ] Lint: 56 errors (43 `no-explicit-any`, 13 `react-hooks/set-state-in-effect`) in app code; not in CI
- [ ] Remove unused Sites connector-preview scaffolding after the auth swap
- [ ] Rename package from `site-creator-vinext-starter`

## Later features
Partial-day/hourly leave, approved-leave cancellation/amendment, more leave types, accrual/proration, carry expiry, reminders, retention.
