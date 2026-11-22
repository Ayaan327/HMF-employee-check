# Putting HMF Attendance on HMF's own Cloudflare, with Microsoft 365 sign-in

For whoever runs HMF IT. Do the **staging** environment first, test it, then repeat for **production**.
Nothing here has been run against a real HMF account yet; the config generator has been checked
with `wrangler deploy --dry-run`.

## How sign-in works once this is set up

1. A person opens the app address. **Cloudflare Access** sends them to Microsoft's sign-in page.
2. Only accounts in HMF's Microsoft 365 tenant (or a group you choose) get through.
3. The app checks the token Cloudflare attaches to each request (signature, application, expiry),
   then opens the employee record whose email matches their Microsoft account. No second password.
4. Signing out of the app also signs out of Cloudflare Access.
5. One or more **system administrators** keep a password login for emergencies (Microsoft outage,
   misconfiguration). With `"passwordLogin": "system-admins"` nobody else can use a password.

Without `HMF_AUTH_MODE` set, the deployed app refuses every request. It cannot be left open by mistake.

## What you need

| Item | Where it comes from |
| --- | --- |
| Cloudflare account owned by HMF (company email, 2+ admins, MFA on) | dash.cloudflare.com |
| Account ID | Cloudflare dashboard, account home, right-hand side |
| Microsoft Entra ID admin who can register an app / grant consent | HMF Microsoft 365 admin |
| Cloudflare Zero Trust team name (e.g. `hmf`) | Zero Trust dashboard, Settings |
| Domain DNS on Cloudflare, for the production address | See "Company domain" below |

## Steps (staging)

1. **Database.** `npx wrangler login`, then `npx wrangler d1 create hmf-attendance-staging`.
   Copy the `database_id` it prints.
2. **Microsoft as login method.** Zero Trust → Settings → Authentication → Add new → Azure AD /
   Microsoft Entra ID. Follow Cloudflare's on-screen steps (they create an app registration in
   Entra and paste back its client ID, secret and tenant ID). The secret stays in Cloudflare.
3. **Access application.** Zero Trust → Access → Applications → Add → Self-hosted.
   - Domain: the staging address (`hmf-attendance-staging.<subdomain>.workers.dev` at first).
   - Login method: Microsoft Entra ID only.
   - Policy: Allow, include emails ending in `@hmfconsultants.co.uk` (or an Entra group).
   - Save, then copy the **Application Audience (AUD) tag**.
4. **Fill in `deploy/staging.json`**: account ID, database ID, `<team>.cloudflareaccess.com`, AUD tag.
   These are identifiers, not secrets, and are safe to commit.
5. **Build and generate the config:**
   ```bash
   npm ci
   npm run build
   node scripts/make-deploy-config.mjs staging
   ```
   It refuses to continue while anything is a placeholder.
6. **Create the tables** (new, empty database only):
   ```bash
   npx wrangler d1 migrations apply hmf-attendance-staging --remote --config dist/server/wrangler.staging.json
   ```
7. **Deploy:** `npx wrangler deploy --config dist/server/wrangler.staging.json`
8. **First administrator.** The new database is empty. Create one system administrator whose
   email is their HMF Microsoft 365 address:
   ```bash
   node scripts/first-admin-sql.mjs --name "Full Name" --email name@hmfconsultants.co.uk --office UK > first-admin.sql
   npx wrangler d1 execute hmf-attendance-staging --remote --config dist/server/wrangler.staging.json --file first-admin.sql
   ```
   The emergency password is printed once in the terminal; put it in HMF's password manager and
   delete `first-admin.sql`. That administrator then adds everyone else through
   People → Import employees from CSV.
9. **Test:** sign in as an employee and as the administrator, check in/out, request leave,
   sign out, and confirm a non-HMF Microsoft account is refused.

## Production

Same steps with `deploy/production.json`, the `hmf-attendance-prod` database, and an Access
application on the company domain. Before real staff use it, take a backup and pass the restore
check (see `docs/BACKUPS.md`).

## Company domain

`deploy/production.json` uses `attendance.hmfconsultants.co.uk`. Cloudflare can attach it
automatically only if the `hmfconsultants.co.uk` DNS zone is on Cloudflare. If it is with another
provider, **copy every existing DNS record first** (especially Microsoft 365 email: MX, SPF, DKIM,
autodiscover, and the website) before changing nameservers, or company email will break. Get the
DNS owner's agreement before any change. Set `"customDomain": null` to deploy without it.

## Moving existing data

This sets up a **new, empty** database. Moving records from the old hosted version needs an
authorised export and a checked import (row counts, integrity); it is a separate task.
