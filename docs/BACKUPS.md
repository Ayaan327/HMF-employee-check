# Backups and restore — HMF Attendance

Staff attendance, hours, leave and audit history live in one Cloudflare D1 database per
environment. This is how to back it up, prove a backup works, and recover.

**Rule before real staff use the system:** take a production backup and run the restore check
on it successfully at least once. Then repeat the check monthly.

## Two layers of protection

1. **Cloudflare D1 Time Travel** (automatic). D1 keeps a rolling history that can roll the database
   back to a point in time. Good for "something went wrong this morning". The retention window
   depends on the Cloudflare plan; check it in the dashboard. It lives inside the same Cloudflare
   account, so it is not enough on its own.
2. **Exported backups** (this guide). A `.sql` file stored **outside Cloudflare**, in storage HMF
   controls (e.g. a restricted SharePoint/OneDrive folder). Protects against account problems,
   accidental deletion and anything older than Time Travel's window.

Backups contain personal data (names, emails, attendance, absence notes). Store them only in
access-restricted HMF storage. Never commit them to git (`/backups/` is ignored) or email them.

## Take a backup

Needs the deploy config from `deploy/README.md` and `npx wrangler login` as an HMF Cloudflare admin.

```bash
npm run build
node scripts/make-deploy-config.mjs production
npm run db:backup -- production --out "/path/to/HMF restricted folder/Attendance backups"
```

This writes two files:
- `hmf-attendance-production-<time>.sql`: the full database
- `hmf-attendance-production-<time>.manifest.json`: row counts per table and a SHA-256 fingerprint

The backup is checked as it is taken (SQLite integrity, no broken references, required tables
present) and the command fails loudly if anything is wrong.

Suggested schedule: weekly, plus before every deployment and before any bulk import.

## Prove a backup can be restored (restore drill)

```bash
npm run db:restore-check -- "/path/to/.../hmf-attendance-production-<time>.sql"
```

This never touches a live database. It:
1. confirms the file matches its manifest fingerprint (not damaged or altered);
2. checks integrity, broken references and required tables;
3. writes `<backup>.restore.sql`, the same data in an order D1 can load. A raw D1 export **cannot**
   be restored directly: it creates tables before the tables they refer to, and D1 rejects it;
4. checks the restore file holds exactly the same rows, value for value;
5. restores it into a brand-new temporary D1 database and compares every table's row count.

It prints `PASS` only if all five succeed. Record the date and result of each drill.

## Recover

Pick the smallest recovery that fixes the problem, and agree it with Ayaan first.

**Recent mistake (within Time Travel's window):**
```bash
npx wrangler d1 time-travel info hmf-attendance-prod --config dist/server/wrangler.production.json
npx wrangler d1 time-travel restore hmf-attendance-prod --timestamp <ISO time before the problem> --config dist/server/wrangler.production.json
```

**From an exported backup** (never load it into the existing live database):
1. Run the restore drill on the chosen backup and confirm `PASS`.
2. Create a new database: `npx wrangler d1 create hmf-attendance-prod-restored`.
3. Load the restore file into it:
   `npx wrangler d1 execute hmf-attendance-prod-restored --remote --config dist/server/wrangler.production.json --file <backup>.restore.sql`
4. Put the new database's name and ID in `deploy/production.json`, regenerate the config,
   apply any newer migrations (`wrangler d1 migrations apply ... --remote`), and deploy.
5. Sign in, spot-check recent records, then keep the old database (renamed) until HMF is satisfied.

Changes made after the backup was taken are not in it. Tell staff which dates need re-entering.

## Rehearse locally

With the local test database (`npm run test:prepare` and `npm run dev`):
```bash
npm run db:backup -- local
npm run db:restore-check -- backups/hmf-attendance-local-<time>.sql
```
