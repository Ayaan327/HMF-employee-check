# Demo on your own Cloudflare account (email-code sign-in)

A trial run with about 10 real testers before presenting to HMF. It runs on **your** free
Cloudflare account. Testers sign in with **their own email address**: Cloudflare emails them a
6-digit code, no passwords and no Microsoft setup. When HMF approves, set up their account fresh
with `deploy/README.md` (Microsoft 365) and delete this demo.

**Cost:** free for up to 50 testers on Cloudflare's free plans. Cloudflare may ask for a card
when you activate Zero Trust; the free plan is not charged.
**Time:** about 1 hour the first time.
**You need:** Node.js 22 or later, this repository on your computer (GitHub Desktop → clone), a terminal.

**Data rule for the demo:** real names and emails of testers are fine. Use only test entries
for everything else; do not enter real absences, medical notes or HR details.

---

## 1. Cloudflare account and command-line login (5 min)

1. Sign up at **dash.cloudflare.com** with an email you control.
2. Copy your **Account ID** (Account home → right-hand side, or the URL after `dash.cloudflare.com/`).
3. In a terminal, inside the project folder:
   ```bash
   npm ci
   npx wrangler login
   ```
   A browser window asks you to allow Wrangler. Click **Allow**.

## 2. Create the database (2 min)

```bash
npx wrangler d1 create hmf-attendance-demo
```
Copy the `database_id` it prints.

## 3. Turn on Zero Trust and the email-code login (10 min)

1. In the Cloudflare dashboard open **Zero Trust**. Choose a **team name** (e.g. `ayaan-hmf-demo`)
   and the **Free** plan.
2. **Settings → Authentication → Login methods**: make sure **One-time PIN** is listed.
   (It is the default; add it if it is not there.)

## 4. Put the sign-in gate in place (10 min)

Your app's address will be `https://hmf-attendance-demo.<your-subdomain>.workers.dev`. Find
`<your-subdomain>` in the dashboard under **Workers & Pages** (shown as "Your subdomain"; set one
if asked).

1. Zero Trust → **Access → Applications → Add an application → Self-hosted**.
   - **Application domain:** `hmf-attendance-demo.<your-subdomain>.workers.dev`
   - **Login methods:** One-time PIN only.
2. **Policy:** Action **Allow**, rule **Include → Emails**, and list your email plus each tester's.
   Only these people can reach the app.
3. Save, open the application again and copy the **Application Audience (AUD) Tag**.

## 5. Fill in `deploy/demo.json` and deploy (10 min)

1. Fill in `deploy/demo.json`:
   - `accountId`: from step 1
   - `d1DatabaseId`: from step 2
   - `accessTeamDomain`: `<team name>.cloudflareaccess.com` (step 3)
   - `accessAud`: from step 4
2. Build, create the tables, and deploy:
   ```bash
   npm run build
   node scripts/make-deploy-config.mjs demo
   npx wrangler d1 migrations apply hmf-attendance-demo --remote --config dist/server/wrangler.demo.json
   npx wrangler deploy --config dist/server/wrangler.demo.json
   ```
   The deploy prints the app address. Check it matches the one in step 4.

The app refuses any request that did not come through the sign-in gate, so it is never open to
the public, even for a moment.

## 6. Add yourself as the administrator (5 min)

```bash
node scripts/first-admin-sql.mjs --name "Your Name" --email your@email.com --office UK > first-admin.sql
npx wrangler d1 execute hmf-attendance-demo --remote --config dist/server/wrangler.demo.json --file first-admin.sql
```
The terminal shows an emergency password once. Save it in a password manager, then delete
`first-admin.sql`. Use the same email you listed in the Access policy.

## 7. Add the testers (10 min)

1. Copy `deploy/demo-testers.example.csv` to `deploy/my-testers.csv` (this name is not saved to
   git) and replace the example people with your testers. Columns:
   - `office`: `UK` or `PK`
   - `role`: `employee`, `manager` (approves their team's leave), `hr` (office HR), `admin`
   - `manager`: the email of that person's manager (must be in the list with role manager)
   - `department`, `job title`: free text
2. Create them:
   ```bash
   node scripts/demo-testers-sql.mjs deploy/my-testers.csv > demo-testers.sql
   npx wrangler d1 execute hmf-attendance-demo --remote --config dist/server/wrangler.demo.json --file demo-testers.sql
   ```
   Each tester gets: a Monday–Friday 09:00–17:30 schedule (30-minute unpaid break), **25 demo
   leave days** and a demo leave year running 12 months from the start of this month. Change
   these with `--allowance 20 --year-start 2026-12-01 --year-end 2027-11-30`. These are
   **demo figures, not HMF policy**. Office calendars start with no public holidays; add them in
   the app under Leave → Edit office calendar.
3. Make sure every tester's email is also in the Access policy (step 4.2).

## 8. Check it works (5 min)

1. Open the app address in a private browser window. Cloudflare asks for your email and sends a
   code. Enter it. The app opens signed in.
2. Under **People** you should see everyone, with "Not signed in with email code yet".
3. Ask one tester to sign in, check in and request a day of leave; approve it as their manager.

## 9. Send the testers this message

> Hi! I'm trialling a new attendance app for HMF before presenting it. Please use it for the next
> week: **[app address]**
> 1. Enter your email address. You'll get a 6-digit code by email (check spam if needed).
> 2. Each working day, open **Today** and press **Check in**, and **Check out** when you finish.
> 3. Try requesting a day of leave under **Leave** (it's only a test, nothing is booked for real).
> Please don't enter real medical or personal details. Any feedback is welcome!

## During the trial

- Take a backup now and then: `npm run db:backup -- demo --out ~/Documents/hmf-demo-backups`
  (keep it private: it contains testers' names and emails).
- If a tester can't get in: check their email is in **both** the Access policy and the tester list,
  spelled the same way. To add someone later, add them to the policy and run step 7 with a CSV
  containing only the new people (re-using an existing email is refused).
- Free-plan limits (about 100,000 requests and 100,000 database writes per day) are far above
  what 10 people use.

## After the pitch

- If HMF approves: follow `deploy/README.md` on HMF's account with Microsoft 365, then delete
  this demo (Workers → hmf-attendance-demo → Delete; D1 → delete the database; remove the Access
  application).
- Do not copy the demo database into HMF's system; start fresh with real staff.
