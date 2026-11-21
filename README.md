# HMF Attendance — review improvements

Working-time tracking and reviews are implemented. See [PHASE-2.md](PHASE-2.md) for employee/manager workflows, configuration, calculation boundaries and verification. It supersedes the Phase 1 statement that working-hours features are still future work.

The first Phase 3 slice now includes annual-leave requests, approvals, pending reservations, balances, office holiday calendars and attendance integration. See [REVIEW-IMPROVEMENTS.md](REVIEW-IMPROVEMENTS.md) for the workbook fixes and remaining policy/production boundaries, and [TESTING.md](TESTING.md) for the complete test command. The wider [Phase 3 plan](PHASE-3.md) remains in progress.

The approved employee-system expansion is implemented. See [PHASE-1.md](PHASE-1.md) for features, permissions, the additive data model, administrator steps, verification and remaining production work. The original iteration description below is historical context; Phase 1 supersedes its limited status and directory behavior.

Private, server-backed demonstration of HMF's daily attendance portal. React/Vinext and Cloudflare D1, hosted using Sites. Logo and engineering photograph from https://hmfconsultants.co.uk.

## Demo logins

- Administrator: admin@hmf.example
- UK employee: employee.uk@hmf.example
- Pakistan employee: employee.pk@hmf.example
- Password for all three: HmfDemo!2026

These addresses are fictional. No invitation emails are sent. The private Sites preview requires the owner's platform sign-in before the demonstration login.

## Included

One shared two-step email/password login for all users, optional office choice validated against the employee account, HMF branding, present/absent/other, mandatory Other reason, server timestamps and office-local dates, one record per employee/date, same-day updates, own-record history, administrator date/office/status/search filters, directory, individual history, audited corrections, CSV export, 24 fictional employees, sample history, and 60-second dashboard refresh. Administrator permissions are determined by the account on the server, never by a role selected in the browser.

Successful sign-ins and explicit sign-outs are recorded in access_events and shown in each employee's administrator detail view. Closing a tab, losing connectivity, or automatic session expiry cannot establish a physical departure time and are not presented as sign-outs. Access events are separate from attendance.

Authentication is checked on the server. Sessions use opaque random tokens in HttpOnly SameSite cookies, with only token hashes in D1, an eight-hour expiry, and binding to the private preview visitor. Credentials are hashed with PBKDF2. Existing demo logins remain valid. New demo provisioning requires explicit server-side demo mode and a configured password; newly provisioned accounts receive individual random salts. No password is embedded in the application bundle. No real employee information belongs in this version.

## Before staff rollout

Replace demo passwords with HMF-approved production identity, use a separate production database, configure real employees and manager scopes, establish offboarding and account recovery, agree workday/holiday/cutoff rules, confirm HMF-owned hosting and data access, and test backup recovery. Working hours are included; payroll remains outside scope.

No actual HMF employee directory, company database or domain is connected. The UK/Pakistan grouping is intentional for iteration one; the Pakistan office card lists the company's three published cities.

## Development

Use Node 22.13+ and npm. Run npm ci, npm run db:generate after schema changes, and the Sites build helper before applying local D1 migration files. Run npm run dev for local preview. Local sign-in uses the starter's loopback-only ChatGPT mock; production retains Sites authentication.

Schema migrations live in drizzle/. Demo data is inserted transactionally only when demo seeding is explicitly enabled, outside migrations. Local preview data and deployed data are separate. Follow TESTING.md for fresh test setup, rather than resetting an existing database.
