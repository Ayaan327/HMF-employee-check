# Security review — 2026-11-25

Scope: the deployed demo (Cloudflare Worker + D1 + Access one-time PIN) and the app code.
Automated coverage: `scripts/test-security.mjs` (integration), `scripts/test-identity.mjs` (unit),
plus the existing portal / roles / hours / leave suites.

## How someone could try to get in, and what stops them

| Attempt | Result |
| --- | --- |
| Guess the 6-digit email code | Handled by Cloudflare Access: codes are single-use and short-lived, and attempts are limited by Cloudflare. The app never sees or checks codes. |
| Use an email that is not on the list | Access only admits emails in the policy. Even if admitted, the app refuses anyone whose verified email does not match an active employee record. |
| Send fake identity headers from the browser | Ignored. In `cloudflare-access` mode only a cryptographically verified Access token (signature, audience, issuer, expiry) counts. Tested. |
| Reach the Worker another way (other hostname, preview URL) | No valid Access token → every page and API request is refused. Preview URLs are now switched off in the deploy config as well. |
| Steal or copy someone's session cookie | Cookies are HttpOnly, SameSite=Strict, Secure, hashed in the database, expire after 8 hours and are tied to the Access identity that created them, so a copied cookie does not work for anyone else. Tested. |
| Password guessing | Demo staff have no password at all. Password sign-in is limited to system admins (`HMF_PASSWORD_LOGIN=system-admins`), the admin also has none, and attempts are rate-limited. |
| Make a signed-in user act from another website (CSRF) | POSTs require the app's own Origin and JSON; cookies are SameSite=Strict. Tested. |
| Load the app inside another site to trick clicks (clickjacking) | **Fixed today:** `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'` on every response. |
| Read or change other people's records | Server-side role and scope checks on every route (employee: self; manager: direct reports; HR: own office; admin: all). Tested. |
| Inject SQL or scripts | All database queries use bound parameters; React escapes output; no raw HTML; CSV exports neutralise spreadsheet formulas. |
| Oversized or malformed requests | Size limits (4–20 KB) and JSON validation; rejected with 413/400. Tested. |

## Fixed today
- Security headers on all responses: anti-framing, `nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy`, and HSTS over HTTPS (`worker/index.ts`).
- Cloudflare preview URLs disabled for deployments (`scripts/make-deploy-config.mjs`).
- Leave on days with recorded working time is refused when requested, and approvers get a clear
  explanation instead of a generic conflict error (`app/api/leave/route.ts`).
- App icons added (browser tab and phone home screen; previously 404s in the logs).

## Dependencies (`npm audit --omit=dev`)
Six advisories were reported (next, zod, sharp, source-map-js, fast-uri, baseline-browser-mapping).
None of the affected code is in the deployed Worker or browser bundle: the Next.js advisories concern
`next/og` image generation and `use cache`/draft mode, which this app does not use (it runs on vinext);
the others are build tools or an unused UI component. Re-check and upgrade before the HMF production
rollout rather than changing build tooling mid-trial.

## Known limits (acceptable for the demo, revisit for production)
- A signed-in tester could deliberately flood the app with requests and use up the free D1 daily
  write allowance (100,000 rows). Low risk with known testers; production can add Cloudflare rate
  limiting on HMF's own domain.
- Cloudflare Access sign-in logs are not readable with the current API token (needs an extra
  read permission); app-side sign-ins are recorded in `access_events`.
- The GitHub repository should be private: it holds no secrets, but deployment identifiers
  (account ID, Access audience tag) are visible while it is public.
