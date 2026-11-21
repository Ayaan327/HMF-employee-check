# HMF test workflow

Use Node 24 and `npm ci`. Browser tests require `npx playwright install chromium`; on macOS they can use installed Google Chrome. Set `PLAYWRIGHT_CHANNEL` to choose an installed channel.

For an existing local checkout, apply only pending migrations to its local D1 database, then start `npm run dev`. Run `npm test` in another terminal. This runs TypeScript, formatting, unit calculations, migration preservation, portal/role/hours/leave integration suites, and Playwright with axe at desktop, tablet and mobile sizes. Tests use only `127.0.0.1:5173`, fictional accounts and local data. They never target the hosted site.

For a **fresh** test checkout, run `npm run build`, then `npm run test:prepare`, then `npm run dev`. The preparation command refuses to reset an existing employee database. It applies schema migrations and writes an ignored local `.dev.vars` file explicitly enabling fictional demo seeding. Never copy this file into production.

`npm run test:unit` needs no running server. `npm run test:browser` requires the preview. `npm run format` formats app code and the browser tests; `npm run format:check` verifies formatting. Browser evidence is in ignored `outputs/playwright/`.

CI is configured in `.github/workflows/ci.yml`. The same checks run against a new local database on the runner; this configuration does not claim a remote CI run has occurred.

Production demo seeding is off unless HMF_DEMO_MODE is explicitly `true` and HMF_DEMO_PASSWORD is provided server-side. Existing demo account hashes remain valid. Microsoft sign-in and separate HMF-owned production infrastructure remain required before staff rollout.
