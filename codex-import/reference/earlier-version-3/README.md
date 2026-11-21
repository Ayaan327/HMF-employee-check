# HMF Attendance — Phase 1

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

Authentication is checked on the server. Sessions use opaque random tokens in HttpOnly SameSite cookies, with only token hashes in D1, an eight-hour expiry, and binding to the private preview visitor. Credentials are hashed with PBKDF2. Demo accounts deliberately share a public demonstration password and salt. No real employee information belongs in this version.

## Before staff rollout

Replace demo provisioning/passwords with HMF-approved production identity and individual credentials, remove seed data and demo credential help, configure real employees and manager scopes, establish offboarding and password recovery, agree workday/holiday/cutoff rules, confirm the domain and hosting/data access arrangements, and test backup recovery. Payroll and hours worked are outside scope.

No actual HMF employee directory, company database or domain is connected. The UK/Pakistan grouping is intentional for iteration one; the Pakistan office card lists the company's three published cities.

## Development

Use Node 22.13+ and npm. Run npm ci, npm run db:generate after schema changes, and the Sites build helper before applying local D1 migration files. Run npm run dev for local preview. Local sign-in uses the starter's loopback-only ChatGPT mock; production retains Sites authentication.

Schema migrations live in drizzle/. Demo data is inserted transactionally at the first demo sign-in, outside migrations. Local preview data and deployed data are separate.
