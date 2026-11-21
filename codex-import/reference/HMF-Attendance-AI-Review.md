# HMF Attendance project review

## Review brief

Grade this project out of 100. Score feature completeness, code and data integrity, access control and privacy, usability and accessibility, verification, and staff rollout readiness. Explain your scores with file paths and specific evidence. Identify the five highest-priority fixes and give acceptance criteria for each. Distinguish implemented workflows from planned work and tell me whether the current build is ready for a staff pilot or a company domain.

## Evidence and scope

- This export represents the current local HMF Attendance repository at commit `f984fd3`. Historical documents may describe earlier behavior. Use the source and tests to resolve discrepancies.
- The local full suite passed with 22 unit tests, migration preservation, portal and role integration tests, hours and leave integration tests, and six browser tests across desktop, tablet and mobile. This document contains the test source. It does not establish that the hosted deployment matches the local revision.
- The hosted demo at https://hmf-attendance-portal.sleex.chatgpt.site/ loaded and rejected the local demo administrator credential. The deployed revision and workflows behind sign-in remain unverified.
- HMF-owned staging, Microsoft 365 sign-in, backup restoration and staff rollout remain pending in the available project evidence.
- This export contains tracked text source, tests, documentation, configuration, and SQL migrations. It omits the dependency lockfile, generated Drizzle snapshots, two binary branding assets, ignored local files, and runtime data. The documented fictional demo password is redacted throughout.

## File index

- `README.md`
- `PHASE-1.md`
- `PHASE-2.md`
- `PHASE-3.md`
- `REVIEW-IMPROVEMENTS.md`
- `TESTING.md`
- `package.json`
- `.github/workflows/ci.yml`
- `.gitignore`
- `.npmrc`
- `.openai/hosting.json`
- `.prettierrc.json`
- `.styleseed/effective-rules.md`
- `.styleseed/manifest.json`
- `.styleseed/palette.css`
- `.styleseed/palette.json`
- `DEMO-VIDEO.md`
- `DESIGN-REVIEW.md`
- `STYLESEED.md`
- `app/api/hours/route.ts`
- `app/api/leave/route.ts`
- `app/api/portal/route.ts`
- `app/api/workforce/route.ts`
- `app/chatgpt-auth.ts`
- `app/employee-editor.tsx`
- `app/focus-form.tsx`
- `app/globals.css`
- `app/hours-ui.tsx`
- `app/layout.tsx`
- `app/leave-ui.tsx`
- `app/lib/availability.ts`
- `app/lib/conflicts.ts`
- `app/lib/core.ts`
- `app/lib/hours.ts`
- `app/lib/leave.ts`
- `app/lib/store.ts`
- `app/page.tsx`
- `app/portal.tsx`
- `app/reports.tsx`
- `app/workforce-context.tsx`
- `app/workforce-fields.tsx`
- `app/workforce.tsx`
- `cloudflare-env.d.ts`
- `components.json`
- `components/connector-error.tsx`
- `components/ui/accordion.tsx`
- `components/ui/alert-dialog.tsx`
- `components/ui/alert.tsx`
- `components/ui/aspect-ratio.tsx`
- `components/ui/attachment.tsx`
- `components/ui/avatar.tsx`
- `components/ui/badge.tsx`
- `components/ui/breadcrumb.tsx`
- `components/ui/bubble.tsx`
- `components/ui/button-group.tsx`
- `components/ui/button.tsx`
- `components/ui/calendar.tsx`
- `components/ui/card.tsx`
- `components/ui/carousel.tsx`
- `components/ui/chart.tsx`
- `components/ui/checkbox.tsx`
- `components/ui/collapsible.tsx`
- `components/ui/combobox.tsx`
- `components/ui/command.tsx`
- `components/ui/context-menu.tsx`
- `components/ui/dialog.tsx`
- `components/ui/direction.tsx`
- `components/ui/drawer.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/empty.tsx`
- `components/ui/field.tsx`
- `components/ui/form.tsx`
- `components/ui/hover-card.tsx`
- `components/ui/input-group.tsx`
- `components/ui/input-otp.tsx`
- `components/ui/input.tsx`
- `components/ui/item.tsx`
- `components/ui/kbd.tsx`
- `components/ui/label.tsx`
- `components/ui/marker.tsx`
- `components/ui/menubar.tsx`
- `components/ui/message-scroller.tsx`
- `components/ui/message.tsx`
- `components/ui/native-select.tsx`
- `components/ui/navigation-menu.tsx`
- `components/ui/pagination.tsx`
- `components/ui/popover.tsx`
- `components/ui/progress.tsx`
- `components/ui/radio-group.tsx`
- `components/ui/resizable.tsx`
- `components/ui/scroll-area.tsx`
- `components/ui/select.tsx`
- `components/ui/separator.tsx`
- `components/ui/sheet.tsx`
- `components/ui/sidebar.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/slider.tsx`
- `components/ui/sonner.tsx`
- `components/ui/spinner.tsx`
- `components/ui/switch.tsx`
- `components/ui/table.tsx`
- `components/ui/tabs.tsx`
- `components/ui/textarea.tsx`
- `components/ui/toggle-group.tsx`
- `components/ui/toggle.tsx`
- `components/ui/tooltip.tsx`
- `db/index.ts`
- `db/schema.ts`
- `drizzle.config.ts`
- `drizzle/0000_quick_lyja.sql`
- `drizzle/0001_cuddly_dagger.sql`
- `drizzle/0002_tough_oracle.sql`
- `drizzle/0003_brainy_pestilence.sql`
- `drizzle/0004_massive_star_brand.sql`
- `drizzle/0005_leave_requests.sql`
- `drizzle/0006_cynical_sumo.sql`
- `drizzle/meta/_journal.json`
- `eslint.config.mjs`
- `examples/d1/app/api/notes/route.ts`
- `examples/d1/db/schema.ts`
- `hooks/use-mobile.ts`
- `lib/connector-context.ts`
- `lib/connector-contract.mts`
- `lib/connector-errors.mts`
- `lib/connector-preview.d.ts`
- `lib/connectors.ts`
- `lib/utils.ts`
- `next.config.ts`
- `playwright.config.ts`
- `postcss.config.mjs`
- `public/favicon.svg`
- `scripts/build-verified.sh`
- `scripts/connector-preview/connector-preview-session.mjs`
- `scripts/connector-preview/host-binding.mjs`
- `scripts/connector-preview/protocol.mjs`
- `scripts/connector-preview/worker.mjs`
- `scripts/execution-profile.mjs`
- `scripts/install-ci.mjs`
- `scripts/install-ci.sh`
- `scripts/install-pnpm.sh`
- `scripts/npm-install.mjs`
- `scripts/pnpm-install.mjs`
- `scripts/prepare-test-db.mjs`
- `scripts/render-demo.swift`
- `scripts/run-framework.mjs`
- `scripts/sites-env.mjs`
- `scripts/sites-env.sh`
- `scripts/test-all.mjs`
- `scripts/test-client.mjs`
- `scripts/test-core.mjs`
- `scripts/test-design.mjs`
- `scripts/test-hours.mjs`
- `scripts/test-leave.mjs`
- `scripts/test-migrations.py`
- `scripts/test-phase-one.mjs`
- `scripts/test-phase-three.mjs`
- `scripts/test-phase-two.mjs`
- `scripts/test-portal.mjs`
- `scripts/tool-environment.mjs`
- `scripts/vite/connector-preview-plugin.mjs`
- `scripts/vite/sites-vite-plugin.LICENSE`
- `scripts/vite/sites-vite-plugin.ts`
- `tests/browser/portal.spec.ts`
- `tsconfig.json`
- `vendor/shadcn-tailwind-4.13.0.LICENSE.md`
- `vendor/shadcn-tailwind-4.13.0.css`
- `vite.config.ts`
- `worker/index.ts`

## File: `README.md`

```
# HMF Attendance — review improvements

Working-time tracking and reviews are implemented. See [PHASE-2.md](PHASE-2.md) for employee/manager workflows, configuration, calculation boundaries and verification. It supersedes the Phase 1 statement that working-hours features are still future work.

The first Phase 3 slice now includes annual-leave requests, approvals, pending reservations, balances, office holiday calendars and attendance integration. See [REVIEW-IMPROVEMENTS.md](REVIEW-IMPROVEMENTS.md) for the workbook fixes and remaining policy/production boundaries, and [TESTING.md](TESTING.md) for the complete test command. The wider [Phase 3 plan](PHASE-3.md) remains in progress.

The approved employee-system expansion is implemented. See [PHASE-1.md](PHASE-1.md) for features, permissions, the additive data model, administrator steps, verification and remaining production work. The original iteration description below is historical context; Phase 1 supersedes its limited status and directory behavior.

Private, server-backed demonstration of HMF's daily attendance portal. React/Vinext and Cloudflare D1, hosted using Sites. Logo and engineering photograph from https://hmfconsultants.co.uk.

## Demo logins

- Administrator: admin@hmf.example
- UK employee: employee.uk@hmf.example
- Pakistan employee: employee.pk@hmf.example
- Password for all three: [REDACTED_DEMO_PASSWORD]

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
```

## File: `PHASE-1.md`

```
# HMF Phase 1 — employee system

Implemented as an extension of the existing private demo. The original login, HMF branding, daily attendance, office dates, histories, corrections and portal access events remain. The existing demo passwords still work. This release is for review with fictional data, not a staff rollout.

## Where to find the features

- **People:** search by name, email or ID; filter office, department, employment status and role; open a profile; add or edit an employee; export the filtered directory.
- **Employee profile:** protected employment details, manager, dates, employment type/status, contracted hours, office/time zone, allowance inputs, weekly schedule and audit history. Employees reach their own profile from the account menu.
- **Deactivation/reactivation:** change employment status in Edit employee. Inactive, suspended and former accounts cannot sign in; their attendance and audit records remain. Clear an expired final date when reactivating. Reassign active reports before deactivating a manager.
- **Roles:** system administrators assign employee, manager, HR administrator and system administrator permissions from Account access. HR requires explicit office scopes. Roles may be combined. The original fictional ADMIN account retains both HR and system privileges; new system administrators do not automatically gain private absence-note access.
- **Schedules:** set a custom pattern or assign a reusable template. Working days, overnight shifts, arrangements, paid/unpaid/undecided breaks, and effective periods are explicit. Temporary changes require an end date and cannot overlap. New normal periods supersede earlier normal schedules; ending one does not silently restore an old pattern. Previous versions remain readable.
- **CSV:** download the template in People, select a file, review validation results and confirm. Up to 50 new employees per import. Imports never overwrite existing people or grant elevated access. Imported accounts have no working password until a system administrator sets an individual demo password.
- **Settings:** offices/countries/time zones, departments, attendance options, templates and their audit history. Disabling an office or department prevents new assignments without erasing existing references.
- **Attendance:** office, remote, client site, travel, training and existing absence/other options. No response remains separate. Each new submission stores its status-rule and time-zone snapshot. Approval-required entries are visibly pending and can be decided from the attendance detail. A person cannot approve their own entry; stale decisions are rejected. Leave booking remains disabled pending Phase 3.

## Access and privacy

Every API operation checks the signed-in account on the server. Employees cannot edit employment details. Managers see themselves and assigned direct reports, and can change report schedules with a reason. HR employment management is limited to authorized offices. System administrators manage configuration and access. Password changes, deactivation and role/scope changes invalidate affected sessions.

General team attendance responses suppress private absence labels and notes, including exports. Employees see their own notes; authorized HR can open them in individual history. HR access to attendance notes and related audit details is logged. The UI includes an employee privacy notice and advises against entering medical diagnoses.

Audit events contain actor, affected employee, timestamp, source, reason, previous value and new value. Profile and settings audit screens support older-page loading. There are no employee, attendance or audit deletion endpoints. Changes and their audit entries are committed atomically. Optimistic guards reject stale profile, schedule, settings, attendance and approval writes.

## Additive data model and migration

The six original tables retain their columns and rows. Existing positional inserts remain compatible while hosted migrations run before the new Worker.

| Added table | Purpose |
| --- | --- |
| employee_profiles | Validated protected profile, revision, creation/update metadata |
| access_grants | Combined roles and authorized HR offices |
| directory_settings | Version-audited office, department and status configuration |
| schedule_versions | Immutable template and employee schedule versions, effective periods, reason/author |
| attendance_details | Status-rule/time-zone snapshot and attendance approval decision |
| audit_events | Append-only application change and sensitive-access history |
| import_previews | Actor-bound, expiring, single-use validated import previews |

`0002_tough_oracle.sql` adds these tables. `0003_brainy_pestilence.sql` adds query indexes. Both are schema-only. No legacy attendance is rewritten or deleted. Read-through defaults preserve legacy active status and UK/PK office zones. Unknown legacy account creation dates, employment terms, schedules and allowances remain unknown. The original demo seed is unchanged and remains outside migrations.

Before production rollout, apply migrations to a restored staging copy, verify row counts and representative histories, then publish the tested version. Do not replay an already applied migration or edit its journal. This additive release permits an application-code rollback without removing the added tables. Production backup infrastructure and restoration automation are Phase 4 work, not enabled by this release.

## HMF decisions still needed

Confirm actual employees/managers, office and HR scopes, contracted patterns, break treatment, employment dates and individual holiday allowances. Decide which nonstandard statuses count as working time and which require approval. Other is unclassified until configured. No statutory entitlement, standard workweek, paid-break assumption, overtime policy or holiday accrual rule has been invented.

Actual work check-in/check-out, working-hours totals and correction-request workflows belong to Phase 2. Leave balances, accrual, holidays and calendars belong to Phase 3. Microsoft 365 sign-in, reminders, full reporting, independent backups, retention policies and production security/readiness are Phase 4. Portal sign-out is still an access event, not a work check-out. No payroll connection exists.

## Verification

Executed against the local fictional-data preview:

- TypeScript validation and production build.
- Ten core/design tests: dates including UK daylight saving, paid/unpaid and overnight schedules, version resolution, CSV parsing/formula escaping, profile validation, token contrast, navigation and preserved HMF components.
- Original attendance integration suite: login, office scope, identity/date enforcement, submissions, corrections, audits, CSV and access events.
- Phase 1 integration suite: role and office boundaries, private-note redaction, sensitive-access logging, schedule templates/versions/overlap, stale writes and decisions, deactivation/history retention/reactivation, CSV preview/import replay prevention, and configured office time zones.
- Isolated migration rehearsal: every legacy row and column survives; previous Worker inserts still work; foreign-key checks pass.

Desktop/mobile visual and keyboard verification remains outstanding. The browser tool previously refused access because its administrator-enforced security check was unavailable; it was not bypassed. Responsive CSS and accessibility hooks have source checks, not a rendered accessibility certification. The automated design registry scan cannot run on this legacy single-lock project. See DESIGN-REVIEW.md for the qualified source review.
```

## File: `PHASE-2.md`

```
# Phase 2 — hours and attendance

Extends the existing HMF demo; Phase 1 profiles, schedules, scopes, history and visual style remain.

## Employee workflow

Today now starts with **Working time**. Choose a working location and press **Check in**. This records a server timestamp and saves the daily attendance status in one transaction. Press **Check out** explicitly when finished. Closing the browser, signing out, session expiry and changing a daily status never create a checkout. A prior open check-in must be closed or corrected before another can begin.

Daily status/absence changes remain in the disclosure below the clock. Hours shows daily records with week, month or custom date ranges, scheduled versus recorded hours, differences, missing entries and late flags. Open records have no invented completed hours. Completed totals exclude open or uncalculable records and show incomplete/unknown counts.

Request a correction from an Hours row. Enter local dates/times in the displayed office time zone and a work-related explanation. UK clock-change gaps are rejected; repeated hours require choosing an occurrence. Pending requests do not alter recorded time. Requests can be cancelled before a decision; declined/cancelled/approved requests remain in history. The current implementation uses one check-in/check-out interval per working date, with total break minutes; multiple split sessions are not implemented.

## Manager and HR workflow

Hours opens a team view for accounts with team access, scoped server-side to direct reports or authorized HR offices. Filter employee, office, missing entries, late entries, no attendance response or pending overtime. CSV export covers the selected date range and authorized people, independently of the on-screen filters; the button is labelled Export date range.

Review correction requests and approve or decline with a decision note. The employee and request author cannot approve the same request. If the time record changed since submission, decline the stale request and request a new one. Approvals and time changes commit atomically. Overlapping time records are rejected. Overtime decisions require a separate authorized person and a reason. Corrections reset affected overtime approval to pending.

Work notes are not included in team timesheet responses. Private attendance notes retain Phase 1 protections. Non-HR audit readers receive redacted time-change values; authorized HR access is recorded. Correction reasons are work-related information available to the scoped reviewer; employees are told not to include medical details.

## Rules HMF must configure

Settings → Working-hours rules provides optional break tracking, default paid/unpaid/undecided breaks, daily overtime, overtime approval, check-in grace minutes and a local attendance submission deadline. All changes require a reason. No grace period or deadline is assumed. Overtime is disabled initially. If enabled, its explicitly labelled basis is completed recorded paid time above scheduled paid time **per day**; weekly overtime rules are not implemented.

At check-in, schedule version, expected paid minutes, office time zone, break treatment and hours rules are snapshotted. An explicit assigned schedule break rule takes precedence over the default. Later configuration changes do not rewrite existing work records. When tracking is disabled, recorded time is elapsed time, with no automatic scheduled-break deduction. When a nonzero break is recorded and its paid/unpaid rule is undecided, paid recorded hours remain unknown.

Actual duration uses UTC instants, including UK daylight-saving transitions. Scheduled hours retain the schedule’s nominal paid minutes. Overnight work remains anchored to the check-in’s local working date. Missing check-in/out flags become due after the scheduled finish; an open record without a schedule becomes overdue on the next local date. Lateness and late attendance submission are separate configured checks. No response remains distinct from absence. Historical days without work records use the applicable schedule and current configured rules; these are derived review flags, not disciplinary decisions or a backfilled attendance history.

## Data and testing

Schema-only migration `0004_massive_star_brand.sql` adds `work_records` and `time_corrections` plus indexes. It changes no existing table columns or historical rows. Work records have optimistic revisions; decisions retain requester/reviewer, previous/proposed values, reasons and timestamps in the existing audit system. Existing activity logs continue to mean portal access, not working time.

Validation executed: 16 unit/design checks, TypeScript, original attendance integration, Phase 1 regression, Phase 2 integration (duplicate check-in race, explicit checkout, logout independence, scoped views/export, correction approval/decline/cancel, overtime approval, policy snapshots and audits), and the isolated legacy-data migration rehearsal. Production build runs during packaging.

Desktop/mobile rendered and keyboard verification remains outstanding due to the previously reported browser security-check failure. No alternative browser was used to bypass it. The legacy design registry scan is still unavailable; source review and token tests do not certify rendered accessibility.

This remains an owner-private fictional-data demo. No payroll integration or automatic checkout exists. Leave balances/calendars/public holidays are Phase 3. Microsoft sign-in, reminders, production backups/retention and rollout validation remain Phase 4. No real employee data should be introduced before those production steps.
```

## File: `PHASE-3.md`

```
# Phase 3 — leave management and interface refurbishment

Phase 3 is in development. The first slice adds date-range requests, pending cancellation and scoped approval or decline in the Leave tab. Apply the additive local migration before previewing this workflow. The sections below describe the full release scope.

The cleaner employee home screen is the visual benchmark for the interface refurbishment. Each page should feel calm, direct and easy to scan.

## Leave management

- Employees can view their current allowance, carried-forward amount, booked leave and remaining balance in the allowance unit assigned to their profile.
- Employees can request leave using explicit start/end dates, partial-day details where supported, a leave type and a concise work-related note.
- Requests show a clear pending, approved, declined or cancelled state. Pending requests do not alter approved leave totals.
- Employees can cancel pending requests. Changes to approved leave use an auditable amendment or cancellation workflow rather than silently rewriting history.
- Managers review requests for their direct reports. Authorized HR users review people in their office scope. A requester cannot approve their own request.
- Decisions require a note and retain requester, reviewer, timestamps, previous values and new values in the audit history.
- Conflicting or stale decisions are rejected. Overlapping requests and invalid employment-date ranges are validated on the server.
- Approved leave is reflected in attendance and working-hours views without inventing check-in/check-out records.

## Calendars, allowances and policy boundaries

- Public-holiday calendars are configured by country or office and shown alongside leave requests.
- Allowance, carry-forward, leave year and accrual behavior must be explicitly configured by HMF. No statutory entitlement or default accrual rule is assumed.
- Office time zones and local dates remain authoritative for leave-day boundaries.
- Part-time schedules and non-working days are taken into account when calculating booked leave.
- Historical requests retain the policy and schedule context used for their calculation so later configuration changes do not silently rewrite prior balances.
- Payroll, statutory interpretation and automatic entitlement decisions remain outside scope.

## Interface refurbishment

The refurbishment applies to Today, Hours, People, employee profiles, schedules, attendance history, Settings and the new Leave pages.

- Follow the home screen's simpler visual direction across the whole product.
- Remove repeated headings, decorative summary tiles, unnecessary nested cards and disclosures, and duplicated explanatory text.
- Give every page one clear purpose and one visually obvious primary action.
- Keep filters and actions next to the records they affect. Move secondary detail into a dedicated view or an on-demand disclosure.
- Use consistent page spacing, typography, controls, status labels and table treatment. Preserve HMF's blue, red and white identity without using red as a competing primary action.
- Keep the top navigation compact and make current location and page hierarchy obvious.
- Prefer short summaries and progressive disclosure over presenting every field at once.
- Preserve readable control sizes, visible keyboard focus, useful loading/empty/error states and reduced-motion behavior.
- On mobile, prioritize the main task, stack forms logically and keep wide operational tables usable without shrinking text below a readable size.
- Preserve every existing permission boundary, attendance record, correction workflow, audit event, CSV export and hours calculation while changing presentation.

## Page outcomes

- **Today:** check-in/check-out and today's attendance response remain the focus; leave is a concise secondary link or status.
- **Leave:** balance and upcoming leave lead the page, followed by the request action and request history.
- **Hours:** date scope, exceptions and records form one clear workflow; correction actions stay attached to the relevant record.
- **People:** search and filters lead directly to the directory; import, templates and administrative tools no longer compete with the main list.
- **Employee profile:** identity and current employment information appear first; schedule, allowance, access and audit history are separated into clear sections.
- **Settings:** use a stable section navigation and show only the controls for the selected policy area.

## Verification required before completion

- Regression coverage for existing attendance, hours, permissions, privacy, corrections, exports and audits.
- Integration coverage for leave request, cancellation, approval, decline, overlap, stale decisions, balances, public holidays and scoped access.
- Rendered desktop and mobile review of every refurbished primary page and important loading, empty, error and success state.
- Keyboard navigation, focus order, labels, contrast, touch targets and screen-reader landmarks checked on the rendered interface.
- Representative calculations checked for UK daylight-saving boundaries, Pakistan office dates, part-time schedules and public holidays.

Phase 4 remains responsible for Microsoft 365 sign-in, reminders, broader reporting, independent backups, retention policy, security hardening and production rollout validation.
```

## File: `REVIEW-IMPROVEMENTS.md`

```
# HMF workbook improvements

This update applies the recommendations in **HMF Attendance project review.xlsx** to the existing portal. It preserves HMF branding, the simplified navigation, existing employee records, attendance and audit history, and the newer leave/report screens already in the working tree.

## Recommendation coverage

| Area | Implemented result |
| --- | --- |
| Absence privacy | General team responses also redact sensitive status categories, approval metadata and decision notes. Sensitive employee notes remain restricted. |
| Protected employment details | Administrators cannot change their own employment profile. HR cannot edit system-administrator profiles; existing office permissions still apply. |
| Approved leave and attendance | Approval creates attendance entries for the charged working days in the same transaction, without inventing check-in or check-out times. |
| Missing-attendance flags | Approved leave and applicable public holidays suppress missing submissions. Genuine missing attendance remains distinct from absence. |
| Working-hours rounding | Round recorded minutes once, after unpaid breaks. A configurable overtime threshold avoids seconds creating spurious overtime. |
| CSV deficits | Negative numeric hours/minutes remain numbers; formula-like text is still escaped. |
| Holiday policy payloads | Policy updates accept the supported 80 holidays with full-length names. Ordinary request limits remain smaller. |
| Leave validation and balances | Validate dates, employment/leave-year bounds, configured types, notes, overlap and available allowance. Pending requests reserve balance; concurrent requests cannot overspend it. Past-date requests are configurable, retaining previous behavior until HMF chooses a policy. |
| Self-corrections | Managers and administrators cannot approve their own attendance corrections through the administrative route. |
| Time corrections | Correction intervals are bounded to 24 hours. Approved corrections synchronize attendance, hours and audit records atomically. |
| Migration history | Reconstructed the missing snapshot for the existing leave migration without changing its SQL or journal entry. Added a separate migration for immutable leave charges and transaction guards. |
| Office calendars | System administrators can select the configured office calendar they are editing. Personal balances continue to use the employee's own office policy. |
| Scoped queries | Leave requests and correction requests are selected in bulk within the caller's authorized employee scope. |
| Concurrency errors | Named database transaction guards produce clear conflict responses; unrelated database/JSON errors are not mislabeled as stale edits. |
| Accessibility | Larger small text, table headers/captions, predictable form focus and focus restoration, and corrected tablet overflow. Added keyboard, responsive layout and axe checks. |
| Demo authentication | Automatic demo seeding requires explicit server configuration and uses random per-account salts. Removed the application-wide hard-coded demo password/salt. Existing account hashes remain valid. |
| Maintainability and testing | Extracted employee editing/context/form helpers, formatted application code, and added one test command plus CI configuration. |
| Unused UI library cleanup | Retained existing components. This was a conditional cleanup suggestion; removing them is unnecessary for these fixes and could discard useful future components. |

## Skills and verification tools

Installed the official OpenAI **playwright**, **security-best-practices**, and **security-threat-model** skills from the verified openai/skills repository. Installed skills become available on the next turn. Existing **StyleSeed** and **Sites** workflows were used to preserve the design and publish the existing site.

Installed Playwright, axe and Prettier as pinned development dependencies. The security changes and regression tests address the review findings; this is not a claim of a completed formal threat model or independent security audit. StyleSeed's current registry scanner cannot certify this legacy project layout, so browser/axe and source contrast checks provide the recorded UI verification instead.

See [TESTING.md](TESTING.md) for local and CI instructions. The checks cover TypeScript, formatting, 22 unit tests, migration preservation, portal/roles/hours/leave API regression suites, and six browser tests across desktop, tablet and mobile. Remote CI is configured but has not been executed in this task.

## Remaining policy and rollout work

HMF still needs to confirm employee allowances, carry-forward rules, leave-year dates, public holidays, break payment, overtime thresholds, check-in deadlines and whether past-date requests are allowed. Unknown values remain configurable or explicitly unconfigured; no statutory employment policy is assumed.

This leave release supports annual leave for full scheduled working days with balances measured in days or hours. Half-day/hourly request entry, cancellation of approved leave, additional leave workflows, accrual/proration and carry-expiry automation remain later Phase 3 work. An hours-based entitlement does not imply hourly request entry is implemented.

The existing hosted portal remains private. Microsoft 365 sign-in, HMF-owned production accounts/infrastructure, production backup/restore operations and the remaining Phase 4 rollout controls still need completion before real staff deployment. No payroll integration was added.
```

## File: `TESTING.md`

```
# HMF test workflow

Use Node 24 and `npm ci`. Browser tests require `npx playwright install chromium`; on macOS they can use installed Google Chrome. Set `PLAYWRIGHT_CHANNEL` to choose an installed channel.

For an existing local checkout, apply only pending migrations to its local D1 database, then start `npm run dev`. Run `npm test` in another terminal. This runs TypeScript, formatting, unit calculations, migration preservation, portal/role/hours/leave integration suites, and Playwright with axe at desktop, tablet and mobile sizes. Tests use only `127.0.0.1:5173`, fictional accounts and local data. They never target the hosted site.

For a **fresh** test checkout, run `npm run build`, then `npm run test:prepare`, then `npm run dev`. The preparation command refuses to reset an existing employee database. It applies schema migrations and writes an ignored local `.dev.vars` file explicitly enabling fictional demo seeding. Never copy this file into production.

`npm run test:unit` needs no running server. `npm run test:browser` requires the preview. `npm run format` formats app code and the browser tests; `npm run format:check` verifies formatting. Browser evidence is in ignored `outputs/playwright/`.

CI is configured in `.github/workflows/ci.yml`. The same checks run against a new local database on the runner; this configuration does not claim a remote CI run has occurred.

Production demo seeding is off unless HMF_DEMO_MODE is explicitly `true` and HMF_DEMO_PASSWORD is provided server-side. Existing demo account hashes remain valid. Microsoft sign-in and separate HMF-owned production infrastructure remain required before staff rollout.
```

## File: `package.json`

```
{
  "name": "site-creator-vinext-starter",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=22.13.0"
  },
  "scripts": {
    "install:ci": "node scripts/install-ci.mjs",
    "dev": "node scripts/run-framework.mjs dev",
    "build": "node scripts/run-framework.mjs build",
    "start": "node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to .wrangler/state --ip 127.0.0.1 --inspector-port 0",
    "lint": "eslint . --ignore-pattern dist --ignore-pattern .next",
    "db:generate": "drizzle-kit generate",
    "test": "node scripts/test-all.mjs",
    "test:unit": "node --test scripts/test-core.mjs scripts/test-hours.mjs scripts/test-leave.mjs scripts/test-design.mjs",
    "test:browser": "playwright test",
    "test:prepare": "node scripts/prepare-test-db.mjs",
    "format": "prettier --write app db/schema.ts tests playwright.config.ts",
    "format:check": "prettier --check app db/schema.ts tests playwright.config.ts"
  },
  "dependencies": {
    "@base-ui/react": "^1.7.0",
    "@hookform/resolvers": "^5.7.1",
    "@shadcn/react": "^0.3.0",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.4.0",
    "drizzle-orm": "0.45.2",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^1.31.0",
    "next": "16.3.4",
    "next-themes": "^0.4.6",
    "radix-ui": "^1.6.7",
    "react": "19.2.6",
    "react-day-picker": "^10.0.1",
    "react-dom": "19.2.6",
    "react-hook-form": "^7.85.0",
    "react-resizable-panels": "^4.12.2",
    "recharts": "^3.8.0",
    "sonner": "^2.0.8",
    "tailwind-merge": "3.6.0",
    "vaul": "^1.1.2",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@axe-core/playwright": "4.14.0",
    "@cloudflare/vite-plugin": "1.37.1",
    "@cloudflare/workers-types": "4.20260515.1",
    "@playwright/test": "1.65.1",
    "@tailwindcss/postcss": "4.2.1",
    "@types/node": "22.19.19",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "6.0.2",
    "@vitejs/plugin-rsc": "0.5.26",
    "axe-core": "4.14.0",
    "drizzle-kit": "0.31.10",
    "eslint": "9.39.4",
    "eslint-config-next": "16.3.4",
    "json-rpc-2.0": "1.7.1",
    "playwright": "1.65.1",
    "playwright-core": "1.65.1",
    "prettier": "3.10.1",
    "raw-body": "3.0.2",
    "react-server-dom-webpack": "19.2.6",
    "tailwindcss": "4.2.1",
    "tw-animate-css": "^1.4.0",
    "typescript": "5.9.3",
    "vinext": "1.0.0-beta.5",
    "vite": "8.0.13",
    "wrangler": "4.92.0"
  },
  "type": "module",
  "overrides": {
    "miniflare": {
      "sharp": "0.35.4"
    }
  }
}
```

## File: `.github/workflows/ci.yml`

```
name: HMF portal checks
on: [push, pull_request]
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run test:prepare
      - name: Start local preview
        run: |
          npm run dev -- --hostname 127.0.0.1 > /tmp/hmf-preview.log 2>&1 &
          for attempt in $(seq 1 60); do
            if curl -fsS http://127.0.0.1:5173/ > /dev/null; then exit 0; fi
            sleep 1
          done
          cat /tmp/hmf-preview.log
          exit 1
      - run: npm test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: browser-failures
          path: outputs/playwright
```

## File: `.gitignore`

```
# Dependencies
/node_modules/
/.pnp
.pnp.*
# Keep authored Yarn tooling if the project adopts Yarn.
/.yarn/*
!/.yarn/patches/
!/.yarn/plugins/
!/.yarn/releases/
!/.yarn/versions/

# Generated builds and framework state
/dist/
/.next/
/.vinext/
/out/
next-env.d.ts
*.tsbuildinfo

# Test output
/coverage/

# Package-manager logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local environment and keys
.env*
.dev.vars*
*.pem

# Checkout-local tool state
/.wrangler/
/.sites-runtime/

# Workspace scaffolding and publication archives
/.agents/
/.codex/
/outputs/
/work/

# OS metadata
.DS_Store
```

## File: `.npmrc`

```
audit=false
fund=false
update-notifier=false
```

## File: `.openai/hosting.json`

```
{
  "d1": "DB",
  "r2": null,
  "project_id": "appgprj_6af1115afe288191a2dc152ab3caf92e"
}
```

## File: `.prettierrc.json`

```
{
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
```

## File: `.styleseed/effective-rules.md`

````
# StyleSeed Effective Rule Bundle

<!-- Generated by ss-resolve. Do not hand-edit; update project-owned inputs or resolver inputs. -->

- Engine: 5.0.0
- Engine revision: sha256:0c4bd5777dda0710f1103b168c706438f9e2de3a4988084cecad8f4ff8857a07
- Agent: codex
- Output grammar: operations-console
- Surface adapter: product-ui
- Domain: saas
- Page type: dashboard
- Brand recipe: enterprise-workbench
- Palette recipe: cobalt-instrument
- Generated palette: #075DA8 · light · deep · tonal
- Aesthetic profile: swiss

Read this bundle before implementation. The agent execution contract is operational; method authority then runs core → grammar → adapter → domain/page → brand recipe → palette recipe → profile → lock → compact craft baseline, with the earlier method layer winning conflicts. Run the code gate and rendered visual gate.

## Codex execution contract

- Invoke `$styleseed <request>` or select StyleSeed from the Skills picker.
- Read this compiled bundle before implementation; do not load the full handbook unless a named ambiguity remains.
- Run project checks, then `$styleseed score`; render and inspect the actual artifact with `$styleseed verify` before claiming completion.

---

# StyleSeed Product Constitution

StyleSeed makes expert design judgment repeatable by coding agents. It is not a collection
of aesthetic preferences that replaces designers.

**StyleSeed는 전문가를 대체하는 디자인 취향 모음이 아니라, 전문가의 디자인 판단을
코딩 에이전트가 반복해서 실행할 수 있게 만드는 시스템입니다.**

This is the project's goal, not a claim that today's engine reproduces expert-level quality.
The current design-method engine compiles selected rules, preserves project decisions, and
supports implementation and evidence workflows. Components, skins, scores, and screenshots
support that purpose; neither their count nor a passing score proves that the goal is achieved.

## Decisions stay with people

- Experts define intent, applicability, tradeoffs, and acceptable exceptions. The agent applies
  recorded decisions; it does not acquire the expert's authority by reading them.
- Preserve the project's approved design system. Do not replace its identity, tokens, or
  components with a StyleSeed preset merely to make the output look different.
- Distinguish accessibility and functional floors, approved project choices, adjustable
  heuristics, and unresolved human decisions. A recommendation is not approval.
- If an approved choice cannot be expressed by the current engine, report that limitation and
  propose a bounded change. Do not silently remap it or pretend arbitrary design-system import
  already works. This goal does not change the resolver's supported values or authority order.
- People may deliberately revise durable choices and re-run checks. Generated scores and
  byte-bound evidence do not authenticate expertise or substitute for design acceptance.

## Development decision test

Before changing the engine, name the design decision being made repeatable, its owner and
applicability, the implementation context the agent needs, and the evidence that would show
an improvement. Maintenance fixes may instead name the existing contract they preserve.

Prioritize task-specific component APIs, token mappings, working state examples, and tests
over adding more aesthetic rules. Evaluate new-system creation and existing-system adoption
separately. Measure functional correctness, expert-reviewed visual quality, correct reuse,
cross-screen/session consistency, and human rework alongside model cost.

A compliant but poorly designed screen is not success; neither is an attractive screen that
breaks the approved system. Use independent human evaluation before claiming expert-level
quality. The research sequence and unimplemented work live in the repository `ROADMAP.md`.

## The fixed method, not one fixed look

StyleSeed enforces a stable way of judging design. It does **not** force every product to
look like Toss, a SaaS dashboard, or the StyleSeed demo. A trustworthy consumer-finance
home, an observability console, an editorial story, and a product-detail page solve
different jobs and therefore need different design grammars.

The effective rule set is composed:

```text
Core judgment
  × one output grammar from RULESETS.md (built-in or reference-compiled)
  × one surface adapter from ADAPTERS.md
  × one domain playbook from APP-PLAYBOOKS.md
  × one page type from PAGE-TYPES.md
  × one brand recipe from BRAND-RECIPES.md
  × one semantic palette posture plus an optional key-color generation from PALETTE-RECIPES.md
  × optional aesthetic profile from PRESETS.md
  × bounded project tokens from STYLESEED.md
= the rules for this screen
```

## Authority order

When instructions disagree, use this order:

1. **Core invariants** below.
2. **Output grammar** — the functional visual language selected in `RULESETS.md`, or a
   project-local grammar compiled by `REFERENCE-COMPILER.md`.
3. **Surface adapter** — the renderer contract and physical constraints in `ADAPTERS.md`.
4. **Domain playbook** and **page/artifact type**.
5. **Brand recipe** — a reusable morphology and component-selection contract from
   `BRAND-RECIPES.md`.
6. **Palette system** — a maintained semantic posture plus deterministic key-color generation,
   role mapping, gamut handling, and contrast correction from `PALETTE-RECIPES.md`.
7. **Aesthetic profile** — an optional coordinated restyle from `PRESETS.md`.
8. **Design lock** — records selections and bounded project parameters.
9. **Skins and components** — implementation material, not sources of judgment.
10. **Score and visual verification** — evidence that the method was applied.

`STYLESEED.md` is persistence, not permission. An arbitrary value in the lock never turns
a violation into a sound design decision. Unknown values are resolver errors, not permission
to silently choose a different grammar. Use only an explicitly configured, supported fallback.

This order governs requirements, not every illustrative default in a document. Preserve
accessibility and functional floors; interpret sizes, component names, and aesthetic examples
through the selected task and approved project system. Report unresolved conflicts rather
than silently replacing that system.

## Core invariants

These apply to every grammar, profile, domain, page, skin, and agent:

- One deliberate visual system per product: radius, spacing, elevation, icon language,
  typography, color roles, imagery, and motion agree.
- A clear attention structure appropriate to the task: a reading promise, primary decision,
  or comparable monitoring regions. A hero metric is not mandatory.
- Color communicates role or meaning. Primary actions, where the task has them, remain
  identifiable even when semantic, categorical, or product colors are present.
- Semantic tokens replace component-level hardcoded colors.
- Spacing follows a repeatable scale; proximity communicates grouping.
- Typography fits the surface and task, with readable measure, contrast, and hierarchy.
- Data surfaces include useful loading, empty, and error states.
- Controls remain operable: visible focus, sufficient targets, labels, reduced-motion
  support, and no dark patterns.
- Motion fits the surface and never delays comprehension or action.
- Design expression serves the product, its content, and its selected grammar. Do not copy
  demo content or introduce decorative novelty where predictable repetition serves the task.

## What the lock may select

The lock may select only inputs the engine understands:

- domain, surface adapter, page/artifact type, and one output grammar;
- one maintained brand recipe, one semantic palette posture, optional bounded key-color generation,
  one optional aesthetic profile, and one skin or project token implementation;
- primary action/accent, type pairing, density, radius, elevation, imagery, and motion values
  inside the selected grammar's allowed ranges;
- one product-specific signature move that still obeys the invariants;
- a project-local reference grammar with provenance and confidence recorded by the compiler.

The lock may not invent a palette mode, waive accessibility, legalize mixed systems, or
override a core invariant. A reusable built-in grammar requires research, examples, and
regression evaluation. A reference-derived grammar stays project-local until it meets that bar.

## The product loop

```text
understand the job → choose or compile a grammar → lock bounded decisions
→ build with judgment → score the implementation → visually verify rendered output
→ present the result and evidence
```

Repeatable application of expert decisions is the product goal. The build method implements
that goal; scoring and verification are supporting gates. They find drift, but never choose
or rewrite the design philosophy after the fact or replace the responsible human's judgment.

## Learning without surveillance

StyleSeed may preserve a design lesson only when a person explicitly asks it to capture an
accepted correction. The stored candidate contains generalized conditions, counterexamples, and
measured evidence—not source code, prompts, screenshots, brand tokens, product identity, or user
content. Local review and export approval are separate decisions. Preparing a package does not
transmit it. Returning it through MCP requires another one-time human grant and must be reported as
client/model exposure. No candidate may automatically modify project or core rules.

---

### `operations-console`

- **Job:** scan system or business state, compare changes, find exceptions, act efficiently.
- **Attention:** prioritize the current operational question or exception. Comparable regions
  may share weight when comparison is the task; decorative KPI tiles must not obscure action.
- **Composition:** persistent navigation → scope/time controls → focal trend or queue →
  comparable metrics → actionable table/list. Detail lives below or on demand.
- **Density/type:** comfortable to compact; neutral grotesk; tabular numerals; labels may be
  small but body and decisions remain readable on desktop.
- **Color/surface:** restrained brand accent; categorical colors only for stable, repeated data
  semantics. Tone, alignment, and grouping carry more hierarchy than decoration.
- **Feedback:** filters and mutations respond instantly; loading preserves layout; bulk action
  consequences are explicit.
- **Reject:** KPI tiles that hide the operational question, decoration that impairs scanning, mobile-tight type on a
  1440px canvas, or charts without a decision they support.

---

## `product-ui`

- **Canvas:** responsive viewports declared in the design lock; verify at least one narrow and
  one wide target when both are in scope.
- **Primitives:** semantic HTML and project-native components. Preserve framework conventions,
  routes, state, and real content rather than replacing the application with a mock.
- **States:** loading, empty, error, success, disabled, focus, and responsive navigation are part
  of the artifact when the screen owns those behaviors.
- **Export:** source code plus reproducible dev/build commands and screenshot paths.
- **QA:** run project checks, render the real route, inspect target viewports and important states,
  and record what could not be exercised.

---

## 2. SaaS / B2B Dashboard / Analytics

**Apply to:** Repeated work, analytics, and operations. A launch page, first-run flow, or reading view uses its own page task and density.
Sizes, colors, component names, and motion seeds below are contextual starting points; preserve approved project roles.

- **Color:** disciplined grayscale with one accent for the primary action and
  selected state. Data viz gets a small, fixed categorical scale — not a new
  color per metric.
- **Density:** high. Power users want information per pixel: tables, filters,
  multi-KPI rows. Density is a feature, not clutter — but keep rhythm.
- **Typography:** balanced numbers + labels. Tables need tabular-nums and tight
  line-height; headings stay quiet.
- **Motion:** **Snap** (Linear-style instant). Power users hate waiting on
  animation. Layout/FLIP for reordering, near-zero entrance.
- **Signature patterns:** scoped chart with needed context (footer optional), comparable KPI
  grid, filterable list/table, segmented control, RankedList.
- **Anti-patterns:** decorative motion, oversized hero numbers that waste space,
  unstable or indistinguishable series colors, modal-heavy flows that interrupt repeated work.
  Six categorical colors are valid when comparison and identification remain clear.
- **Brand recipe:** `enterprise-workbench`; use `developer-platform` for technical evidence.
- **Skin material:** custom brand tokens; Linear and Vercel remain optional token references.

---

## Dashboard / Home / Overview

- **Job:** answer "how are things?" in 3 seconds, then let the user drill down.
- **Structure:** expose the state that supports the next decision, then its evidence
  and drill-down. A personal summary may lead with a metric; operations may lead with
  a queue, and monitoring with a timeline or comparable panels.
- **Hierarchy:** use the grammar's attention model and approved type/density tokens.
  Do not require a hero number or progressive density when comparison is the task.
- **Patterns:** summary, actionable queue, trend, comparison panel, evidence table.
  Choose project-native components rather than mandatory StyleSeed card names.
- **Anti-patterns:** decorative KPI walls, unclear scope or freshness, charts without
  a decision, and inconsistent emphasis between comparable values.
- **Mobile:** preserve task priority, filters, and access to comparison evidence;
  reflow using the project's gutters and input-mode scale.

---

## `enterprise-workbench`

- **Best fit:** admin, analytics, operations, collaboration, and multi-step B2B work. Strong
  with `operations-console`.
- **Containment:** persistent shell, aligned panels, toolbars, tables, and detail regions.
  Group by work relationship; use card grids sparingly.
- **Geometry:** 0–8px radius, 1px boundaries or tonal layers, minimal floating shadow, 16–24px
  page rhythm on an explicit grid.
- **Type/icons:** neutral UI sans, tabular numbers, compact labels, one functional icon family.
- **Controls/collections:** rectangular controls, visible filters, bulk actions, dense rows,
  comparison tables, and preserved loading geometry.
- **Motion/responsive:** fast state changes; panels reflow or collapse by task priority rather
  than merely shrinking.
- **Characteristic move:** the operational question connects directly to an actionable queue
  or evidence table; comparable monitoring regions remain coordinated when comparison is the task.
- **Reject:** equal emphasis that hides operational priority, unnecessary card wrappers,
  oversized mobile typography on desktop, decorative
  gradients, hidden scope controls, or floating shadows on every panel.
- **Lineage:** [IBM Carbon 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/),
  [Microsoft Fluent 2](https://fluent2.microsoft.design/design-principles),
  [Atlassian foundations](https://atlassian.design/foundations).

---

### cobalt-instrument

- Name: Cobalt instrument
- Mode: light
- Best for: Developer platforms, data products, and operational workbenches
- Recipe bias: developer-platform, enterprise-workbench
- Semantic roles: background=#F1F5FA · surface=#FFFFFF · chrome=#101828 · foreground=#101828 · mutedForeground=#475467 · chromeForeground=#F9FAFB · border=#C7D1E0 · primary=#175CD3 · primaryForeground=#FFFFFF · accent=#6941C6 · accentForeground=#FFFFFF · focus=#175CD3 · success=#067647 · successForeground=#FFFFFF · warning=#934F00 · warningForeground=#FFFFFF · danger=#B42318 · dangerForeground=#FFFFFF
- Usage: Use neutral layers for evidence and cobalt for action/selection. Violet belongs to secondary categorization, not a second primary action.
- Generated-media anchors: #101828, #175CD3, #F1F5FA
- Avoid in generated media: cyan terminal glow, decorative gradients, low-contrast gray text
- Re-run deterministic contrast validation after any project override.

## Generated semantic palette override

- Key color: #075DA8
- Mode: light
- Character: deep
- Harmony: tonal
- Surface temperature: neutral
- Semantic roles: background=#EEF4FB · surface=#FBFDFF · chrome=#DBE2EB · foreground=#090B0E · mutedForeground=#4D5054 · chromeForeground=#090B0E · border=#B4BBC5 · primary=#014D8F · primaryForeground=#FAFCFF · accent=#4D559E · accentForeground=#FAFCFF · focus=#014D8F · success=#006425 · successForeground=#FAFCFF · warning=#6E4B00 · warningForeground=#FAFCFF · danger=#902824 · dangerForeground=#FAFCFF
- Contrast gates: foreground/background=17.8:1 · mutedForeground/background=7.32:1 · foreground/surface=19.32:1 · chromeForeground/chrome=15.1:1 · primaryForeground/primary=8.31:1 · accentForeground/accent=6.57:1 · successForeground/success=7.17:1 · warningForeground/warning=7.65:1 · dangerForeground/danger=8.12:1 · focus/background=7.71:1 · focus/surface=8.37:1
- Allocation follows the task and approved color roles; there is no universal surface-area percentage for canvas, structure, or accent emphasis.
- This override replaces the recipe hex values while preserving its product posture and semantic restrictions.
- Components consume semantic roles. Raw ramp values remain reference tokens.

---

### swiss

- Coordinate: sharp · structured · compact · restrained · snap
- Signature: asymmetric grid and typographic alignment
- This profile does not permit: illegible tiny type or ornament-free sameness
- Apply the coordinate coherently across radius, density, typography, palette temperature, elevation, motion, composition, and one signature move.

---

## Project design lock

- App domain: saas
- Surface adapter: product-ui
- Page type: dashboard
- Output grammar: operations-console
- Grammar fallback: operations-console
- Brand recipe: enterprise-workbench
- Palette recipe: cobalt-instrument
- Key color: #075DA8
- Palette character: deep
- Palette mode: light
- Palette harmony: tonal
- Surface temperature: neutral
- Aesthetic profile: swiss

---

# Rules in scope

Compiled from `engine/rules/catalog.json` for grammar operations-console · adapter product-ui · domain saas · page dashboard. Invariants bind everywhere; defaults apply to this selection and yield to a recorded project decision. Each line carries its id for checks and reviews; `blocks` is a fail state independent of any score.

## Invariants

- **INV-01-no-fabricated-data** (blocks · inferred): Never fabricate data. Placeholder metrics, invented deltas, and stock content are not evidence; use real product content or fixtures labelled as such. Source: engine/DESIGN-LANGUAGE.md#18
- **INV-02-status-not-color-only** (blocks · inferred): Status never relies on colour alone. Pair every status colour with text, an icon, or a shape that carries the same meaning. Source: engine/DESIGN-LANGUAGE.md#18
- **INV-03-essential-actions-visible** (blocks · inferred): Essential actions stay visible and named. Do not hide the next action behind hover, overflow, or an icon without an accessible name. Checks: SS006. Source: engine/DESIGN-LANGUAGE.md#18
- **INV-04-controls-operable** (blocks · inferred): Controls keep visible labels, readable contrast, a visible focus state, keyboard order that follows visual order, and a safe way to recover from errors. Checks: SS005. Source: engine/DESIGN-LANGUAGE.md#18
- **INV-05-no-unexplained-role-drift** (blocks · inferred): Semantic roles (accent, status, canvas, type roles) do not change between screens without a recorded decision. Unexplained local variation is not a role. Source: engine/DESIGN-LANGUAGE.md#18

## Defaults for this selection

- **CRAFT-control-heights** (strong · inferred · any selection): Buttons, inputs, and selects in one context share a height. Touch surfaces provide at least 44px targets; pointer-first dense desktop controls may be smaller when still operable. Exceptions: inline text controls inside dense tables when the row itself is the target. Source: engine/CRAFT-BASELINE.md
- **CRAFT-motion-family** (strong · inferred · any selection): Motion uses one duration and easing family, names the properties it transitions, communicates state or sequence, never delays the first read, and provides a complete reduced-motion result. Checks: SS003, SS004. Source: engine/CRAFT-BASELINE.md
- **CRAFT-semantic-tokens** (strong · inferred · any selection): Use semantic tokens for stable action, status, category, brand, and content roles. Hardcoded colours live only in registered token or theme files. Exceptions: one-off illustration or chart series colours declared as tokens in the artifact's token files. Checks: SS001. Source: engine/CRAFT-BASELINE.md
- **CRAFT-spacing-scale** (strong · inferred · any selection): Reuse the approved spacing scale. Without one, start from {4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96} and record any optical, script, canvas, or platform adjustment. Exceptions: documented optical corrections; platform-mandated insets. Checks: SS002. Source: engine/CRAFT-BASELINE.md
- **DL-23-amounts-never-wrap** (strong · inferred · any selection): Displayed amounts never wrap mid-value. Keep the sign, number, and unit on one line (whitespace-nowrap) for hero metrics, KPI metrics, list amounts, chart prices, donut centres, and storage quantities. Source: engine/DESIGN-LANGUAGE.md#23
- **DL-29-skeleton-matches-content** (strong · inferred · adapters: product-ui): Loading skeletons match the shape of the final content (same padding, radius, and text heights); no spinner inside a card. Show a skeleton after a 300ms delay and keep it for at least 300ms. Exceptions: sub-200ms responses that never show a loading state. Source: engine/DESIGN-LANGUAGE.md#29
- **DL-30-states-stay-in-place** (strong · inferred · adapters: product-ui): Empty and error states stay in place: a failing card shows its own error while the rest renders; zero displays as 0, never as a dash; every message names the problem and a recovery. Exceptions: a full-page failure uses the full-screen error pattern. Source: engine/DESIGN-LANGUAGE.md#30
- **DL-02-number-leads-unit** (advisory · inferred · pageTypes: dashboard/detail): Numbers lead and units follow small: set a value at about twice the size of its unit so magnitude reads first, and always use thousands separators. Exceptions: tabular columns where every cell shares one unit shown in the header. Source: engine/DESIGN-LANGUAGE.md#2
- **DL-21-density-by-task** (advisory · inferred · any selection): The number of visible items follows the decision, the available width, the labels, and the input mode. There is no universal four-item limit; dense rows and small multiples are valid. Source: engine/DESIGN-LANGUAGE.md#21
- **DL-31-negative-amounts** (advisory · inferred · pageTypes: dashboard/detail/list): Negative amounts use a minus sign (-$1.8K), never parentheses, and the destructive text role; at zero use the default text colour and no trend icon. Exceptions: accounting exports that must follow a client's statement format. Source: engine/DESIGN-LANGUAGE.md#31
- **DL-33-cjk-wrapping** (advisory · inferred · any selection): CJK text breaks at word boundaries, a number stays on one line with its CJK unit, and Pretendard's tall ascender is corrected only at 36px and above. Source: engine/DESIGN-LANGUAGE.md#33
- **DL-49-tone-default** (advisory · inferred · adapters: product-ui): Product UI copy uses a friendly, conversational voice by default. Regulated or legal copy follows UX-WRITING.md and keeps the same clarity. Exceptions: legal, medical, and financial disclosures with mandated wording. Source: engine/DESIGN-LANGUAGE.md#49

---

# StyleSeed Compact Craft Baseline

This is the small, task-independent craft layer used by the Context Compiler. It preserves
the highest-leverage rules without injecting the full design handbook into every agent turn.
The selected output grammar, adapter, domain, page type, brand recipe, profile, and project lock narrow these
defaults. `PRODUCT-PRINCIPLES.md` remains the higher authority.

## Coherence

- Choose one coordinated family for radius, elevation, borders, icon style, typography, motion,
  control heights, and interaction states. Encode each family as semantic tokens and reuse it.
- A coherent system may contain multiple component shapes and colors, but every variation must
  have a repeatable purpose: functional, semantic, editorial, or brand expression.
  Unexplained local variation is not a role.
- Preserve strengths and already-set project decisions. Do not restyle unrelated surfaces while
  fixing one screen.

## Hierarchy and composition

- Follow the task's attention model: a primary decision, reading promise, or coordinated
  comparison regions. Scale, position, contrast, imagery, density, and disclosure are options;
  no universal hero, brightest CTA, section count, or chart quota is required.
- Proximity communicates grouping: distinguish space around groups from space within them;
  no fixed ratio fits every density or containment model. Vary narrative sections purposefully;
  keep functional rows and comparison
  regions consistent when repetition helps the task. Equivalent information keeps equivalent
  presentation; vary by priority, data question, or narrative role, not for novelty.
- Use real product content and evidence. Placeholder dashboards, fake metrics, stock chat panels,
  and decorative card walls obscure the task. Use data encodings that preserve meaning;
  deltas need real baselines and sparklines need actual series. Attach interpretation context
  (labels, units, period, reference) nearby or in an unambiguous shared scope.
- Start Latin prose near 50–75 characters per line; inspect the actual language, font, and zoom.
  CSS `ch` is a glyph-width unit, not actual character count. Let data regions use needed width.
- Media should show the relevant subject or evidence. Record its role, crop, text-safe area,
  and fallback where needed; a task that needs no image should not receive decorative filler.

## Spacing and type

- Reuse the approved spacing scale. Without one, start from `{4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96}`.
  Document optical, script, canvas, or platform reasons for adjustments; preserve grouping.
- Default body text to 16px on general surfaces; an approved productive desktop scale may use
  14px body. Smaller metadata and identifiers still need readable measure, contrast, and zoom.
- Coordinate type roles and weights; one or two families are economical defaults, not a cap on
  script fallbacks or approved editorial/code roles. Use tabular figures for numeric comparison.
- Tighten leading as type grows: body about 1.5, headings 1.2–1.35, display 1.0–1.2.

## Components and interaction

- Use the lightest effective separation for the context: alignment, whitespace, tone, hairlines,
  or depth. There is no fixed order. A border and shadow may serve distinct boundary/layer roles.
- Buttons, inputs, and selects in one context share a height. Touch surfaces provide at least
  44px targets; pointer-first dense desktop controls may be smaller when still operable.
- Labels remain visible. Errors name the problem and recovery and never rely on color alone.
- Use coordinated icon roles, optical sizes, and state variants. Do not mix unrelated families.
- Loading, empty, error, success, disabled, and permission states preserve orientation and offer
  applicable recovery. Inapplicable optional sections need not occupy empty slots.
- Reflow by task priority; preserve comparison, controls, and interpretation context at narrow
  widths. A bounded scrollable data region can be valid; unreadable shrinking is not.

## Color, accessibility, and motion

- Use semantic tokens for stable action, status, category, brand, and content roles. Identify
  the next action within each decision region; a popover and its page may have distinct actions.
  Judge conflicting meanings, not hue count, warm paper, serif type, or hard black by themselves.
- Body text targets WCAG AA contrast; large text and meaningful graphics meet their applicable
  threshold. Focus is visible, controls have names, and keyboard order follows visual order.
- Motion uses one duration/easing family, communicates state or sequence, and never delays the
  first read or an action. Provide a complete reduced-motion result.
- Inspect the real render at the target viewport. Source review cannot certify optical balance,
  font loading, crop, responsive transformation, or visual states.
````

## File: `.styleseed/manifest.json`

```
{
  "schemaVersion": 1,
  "engineVersion": "5.0.0",
  "engineRevision": "sha256:0c4bd5777dda0710f1103b168c706438f9e2de3a4988084cecad8f4ff8857a07",
  "generatedAt": "2026-11-16T19:14:25.592Z",
  "selection": {
    "agent": "codex",
    "grammar": "operations-console",
    "grammarSource": "built-in:operations-console",
    "referenceContract": null,
    "fallback": "operations-console",
    "adapter": "product-ui",
    "domain": "saas",
    "page": "dashboard",
    "recipe": "enterprise-workbench",
    "recipeSelection": "enterprise-workbench",
    "palette": "cobalt-instrument",
    "paletteSelection": "cobalt-instrument",
    "paletteGeneration": {
      "keyColor": "#075DA8",
      "mode": "light",
      "character": "deep",
      "harmony": "tonal",
      "temperature": "neutral"
    },
    "tokenCanon": null,
    "profile": "swiss"
  },
  "bundle": {
    "kind": "bundle",
    "path": ".styleseed/effective-rules.md",
    "sha256": "b5aff546d3fec6b8f734acd0853644a5097858c5820e1998333cee20f4b7496b",
    "bytes": 28910
  },
  "outputs": [
    {
      "kind": "bundle",
      "path": ".styleseed/effective-rules.md",
      "sha256": "b5aff546d3fec6b8f734acd0853644a5097858c5820e1998333cee20f4b7496b",
      "bytes": 28910
    },
    {
      "kind": "palette-json",
      "path": ".styleseed/palette.json",
      "sha256": "49c1c5f34322ad3f83a33a5b21ebe37590e7e1b0839eea1ef34025687ded7e67",
      "bytes": 6048
    },
    {
      "kind": "palette-css",
      "path": ".styleseed/palette.css",
      "sha256": "98b6986ce8ea23765282f152f9df6154cfdd934224bba8eb5d6c05bbb7665257",
      "bytes": 1157
    }
  ],
  "palette": {
    "json": {
      "kind": "palette-json",
      "path": ".styleseed/palette.json",
      "sha256": "49c1c5f34322ad3f83a33a5b21ebe37590e7e1b0839eea1ef34025687ded7e67",
      "bytes": 6048
    },
    "css": {
      "kind": "palette-css",
      "path": ".styleseed/palette.css",
      "sha256": "98b6986ce8ea23765282f152f9df6154cfdd934224bba8eb5d6c05bbb7665257",
      "bytes": 1157
    }
  },
  "sources": [
    {
      "id": "agent-execution",
      "sha256": "7432f369c99d3d0b10a5c96d76b418b7dfbfb83e57a6b25e480f79ee86a1cd81",
      "bytes": 358
    },
    {
      "id": "core",
      "sha256": "c266458625238fc647b40eb15a80476ee116d3b8e4fbd9bee71db917f2c7a33d",
      "bytes": 8400
    },
    {
      "id": "grammar",
      "sha256": "618cdaf2bc6bd06f161c6c2fb1f356b2613f2bf0cd8e0e0de2575dd3bb16c382",
      "bytes": 1111
    },
    {
      "id": "adapter",
      "sha256": "7b5b5c34b0b235dca329e6384ccb94c66ee65a348bbe7142277ae7bbda3c13b0",
      "bytes": 714
    },
    {
      "id": "domain",
      "sha256": "8e81ab182b42f401ba311d6c8b30eb488ac0779610361f09907eba3b60459d03",
      "bytes": 1481
    },
    {
      "id": "page",
      "sha256": "77900ba7ba0483808a3f1095b8cbb940019aad7bbdb7c1fbad63538568cc4706",
      "bytes": 971
    },
    {
      "id": "recipe",
      "sha256": "36f843c3ca4500a8944586ca6c974b7add5980e5cfd78a0dc6618468ee66b311",
      "bytes": 1434
    },
    {
      "id": "palette",
      "sha256": "9231675952b0bcc8f221d9fc264d7d62590d9c8df5082dd9d236d60f902f5bcf",
      "bytes": 2253
    },
    {
      "id": "profile",
      "sha256": "452e9a52e600efd3af3869c8d553276e432bfc315ef9a3f67d2ecb9f787ea47f",
      "bytes": 357
    },
    {
      "id": "lock",
      "sha256": "8661bbe65a38916abc98d71b7988e55c33d73526c390b3194335c0fe9bea38f7",
      "bytes": 396
    },
    {
      "id": "rules",
      "sha256": "2221b95cfa1e21c35d90c5768e67bbf42622c80fa7bd46928f4fe8d546dab091",
      "bytes": 5631
    },
    {
      "id": "craft",
      "sha256": "cf337a06f68960ee01e99fa734da2955fe67db990e7cda3fb1d2729acd0bd1bd",
      "bytes": 4870
    }
  ]
}
```

## File: `.styleseed/palette.css`

```
:root {
  --ss-background: #EEF4FB;
  --ss-surface: #FBFDFF;
  --ss-chrome: #DBE2EB;
  --ss-foreground: #090B0E;
  --ss-muted-foreground: #4D5054;
  --ss-chrome-foreground: #090B0E;
  --ss-border: #B4BBC5;
  --ss-primary: #014D8F;
  --ss-primary-foreground: #FAFCFF;
  --ss-accent: #4D559E;
  --ss-accent-foreground: #FAFCFF;
  --ss-focus: #014D8F;
  --ss-success: #006425;
  --ss-success-foreground: #FAFCFF;
  --ss-warning: #6E4B00;
  --ss-warning-foreground: #FAFCFF;
  --ss-danger: #902824;
  --ss-danger-foreground: #FAFCFF;
  --ss-primary-50: #F4F9FF;
  --ss-primary-100: #DEEDFF;
  --ss-primary-200: #BCDBFF;
  --ss-primary-300: #8DC2FF;
  --ss-primary-400: #69A2E3;
  --ss-primary-500: #4986CA;
  --ss-primary-600: #2F6EB0;
  --ss-primary-700: #1B5793;
  --ss-primary-800: #023D73;
  --ss-primary-900: #00274C;
  --ss-primary-950: #001229;
  --ss-accent-50: #F6F8FF;
  --ss-accent-100: #E6EAFF;
  --ss-accent-200: #CDD5FF;
  --ss-accent-300: #ADB9FB;
  --ss-accent-400: #8D99DF;
  --ss-accent-500: #727CC6;
  --ss-accent-600: #5B64AC;
  --ss-accent-700: #464E8F;
  --ss-accent-800: #313670;
  --ss-accent-900: #1C1F51;
  --ss-accent-950: #0B0935;
}
```

## File: `.styleseed/palette.json`

```
{
  "schemaVersion": 1,
  "generator": {
    "name": "StyleSeed Palette Engine",
    "version": "1.0.0",
    "colorSpace": "OKLCH",
    "targetGamut": "sRGB"
  },
  "input": {
    "keyColor": "#075DA8",
    "mode": "light",
    "character": "deep",
    "harmony": "tonal",
    "temperature": "neutral"
  },
  "normalizedKey": {
    "hex": "#075DA8",
    "oklch": {
      "l": 0.4761,
      "c": 0.1402,
      "h": 252.33
    }
  },
  "decisions": {
    "character": "Deep character controls lightness/chroma before hue harmony.",
    "accent": {
      "hue": 276.33,
      "offset": 24,
      "method": "tonal",
      "avoidsStatusCollisionBy": 110.67
    },
    "primaryAdjustedForContrast": false,
    "accentAdjustedForContrast": false,
    "allocation": {
      "dominant": "canvas and surfaces",
      "secondary": "chrome, type, and supporting structure",
      "accent": "task-appropriate primary/accent emphasis; no universal percentage"
    }
  },
  "ramps": {
    "primary": {
      "50": "#F4F9FF",
      "100": "#DEEDFF",
      "200": "#BCDBFF",
      "300": "#8DC2FF",
      "400": "#69A2E3",
      "500": "#4986CA",
      "600": "#2F6EB0",
      "700": "#1B5793",
      "800": "#023D73",
      "900": "#00274C",
      "950": "#001229"
    },
    "accent": {
      "50": "#F6F8FF",
      "100": "#E6EAFF",
      "200": "#CDD5FF",
      "300": "#ADB9FB",
      "400": "#8D99DF",
      "500": "#727CC6",
      "600": "#5B64AC",
      "700": "#464E8F",
      "800": "#313670",
      "900": "#1C1F51",
      "950": "#0B0935"
    }
  },
  "roles": {
    "background": "#EEF4FB",
    "surface": "#FBFDFF",
    "chrome": "#DBE2EB",
    "foreground": "#090B0E",
    "mutedForeground": "#4D5054",
    "chromeForeground": "#090B0E",
    "border": "#B4BBC5",
    "primary": "#014D8F",
    "primaryForeground": "#FAFCFF",
    "accent": "#4D559E",
    "accentForeground": "#FAFCFF",
    "focus": "#014D8F",
    "success": "#006425",
    "successForeground": "#FAFCFF",
    "warning": "#6E4B00",
    "warningForeground": "#FAFCFF",
    "danger": "#902824",
    "dangerForeground": "#FAFCFF"
  },
  "contrast": [
    {
      "foreground": "foreground",
      "background": "background",
      "ratio": 17.8,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "mutedForeground",
      "background": "background",
      "ratio": 7.32,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "foreground",
      "background": "surface",
      "ratio": 19.32,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "chromeForeground",
      "background": "chrome",
      "ratio": 15.1,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "primaryForeground",
      "background": "primary",
      "ratio": 8.31,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "accentForeground",
      "background": "accent",
      "ratio": 6.57,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "successForeground",
      "background": "success",
      "ratio": 7.17,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "warningForeground",
      "background": "warning",
      "ratio": 7.65,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "dangerForeground",
      "background": "danger",
      "ratio": 8.12,
      "minimum": 4.5,
      "pass": true
    },
    {
      "foreground": "focus",
      "background": "background",
      "ratio": 7.71,
      "minimum": 3,
      "pass": true
    },
    {
      "foreground": "focus",
      "background": "surface",
      "ratio": 8.37,
      "minimum": 3,
      "pass": true
    }
  ],
  "valid": true,
  "assetBrief": {
    "anchors": [
      "#EEF4FB",
      "#014D8F",
      "#4D559E"
    ],
    "hierarchy": "Assign background, primary, and accent emphasis to the approved image role and content; preserve readable relationships without a fixed area ratio",
    "avoid": [
      "color roles that conflict with the approved task or brand",
      "decorative color that obscures content or state meaning",
      "essential text baked into generated imagery"
    ]
  },
  "reasoning": [
    "Character is chosen before harmony: lightness and chroma drive perceived calm or intensity more reliably than hue geometry alone.",
    "The key hue is preserved while chroma is reduced to the sRGB gamut boundary instead of clipping RGB channels.",
    "The tonal accent candidate is scored for separation from the key and reserved success, warning, and danger hues.",
    "Reference colors are mapped through semantic roles; components should never consume raw ramp values directly.",
    "Every text, action, status, and focus pair is checked after generation; failing fills are moved in lightness while preserving hue identity."
  ],
  "css": ":root {\n  --ss-background: #EEF4FB;\n  --ss-surface: #FBFDFF;\n  --ss-chrome: #DBE2EB;\n  --ss-foreground: #090B0E;\n  --ss-muted-foreground: #4D5054;\n  --ss-chrome-foreground: #090B0E;\n  --ss-border: #B4BBC5;\n  --ss-primary: #014D8F;\n  --ss-primary-foreground: #FAFCFF;\n  --ss-accent: #4D559E;\n  --ss-accent-foreground: #FAFCFF;\n  --ss-focus: #014D8F;\n  --ss-success: #006425;\n  --ss-success-foreground: #FAFCFF;\n  --ss-warning: #6E4B00;\n  --ss-warning-foreground: #FAFCFF;\n  --ss-danger: #902824;\n  --ss-danger-foreground: #FAFCFF;\n  --ss-primary-50: #F4F9FF;\n  --ss-primary-100: #DEEDFF;\n  --ss-primary-200: #BCDBFF;\n  --ss-primary-300: #8DC2FF;\n  --ss-primary-400: #69A2E3;\n  --ss-primary-500: #4986CA;\n  --ss-primary-600: #2F6EB0;\n  --ss-primary-700: #1B5793;\n  --ss-primary-800: #023D73;\n  --ss-primary-900: #00274C;\n  --ss-primary-950: #001229;\n  --ss-accent-50: #F6F8FF;\n  --ss-accent-100: #E6EAFF;\n  --ss-accent-200: #CDD5FF;\n  --ss-accent-300: #ADB9FB;\n  --ss-accent-400: #8D99DF;\n  --ss-accent-500: #727CC6;\n  --ss-accent-600: #5B64AC;\n  --ss-accent-700: #464E8F;\n  --ss-accent-800: #313670;\n  --ss-accent-900: #1C1F51;\n  --ss-accent-950: #0B0935;\n}"
}
```

## File: `DEMO-VIDEO.md`

```
# HMF Attendance demo recording plan

Target runtime is five minutes. Record in the local preview with fictional accounts. Set up a fictional schedule, allowance, office holiday, pending leave request and hours correction before recording. Keep passwords, browser autofill and unrelated desktop windows out of the recording.

| Time | Screen and action | Narration |
| --- | --- | --- |
| 0:00–0:20 | Open the portal and enter the employee workspace. | “HMF Attendance brings daily attendance, working hours, schedules and leave together. We’ll start with what an employee sees, then switch to the management workspace.” |
| 0:20–1:05 | On Today, choose a location and check in. Show the resulting status, then cut to checkout. Point out the separate attendance update and absence form. | “Choose your location and check in. When you finish, check out here. If a check-in is left open, Today will remind you. Use the attendance form when you need to report an absence or update your status.” |
| 1:05–1:45 | Open Hours and show recorded versus scheduled time. Open a correction and show the date, time and explanation fields. Visit Schedule, History and My profile. | “Hours shows the working time recorded for each date. If a time is missing or incorrect, request a correction for that record. Schedule shows your assigned work pattern. History and My profile show your attendance and employment information.” |
| 1:45–2:30 | Open Leave. Show the balance, submit a request and point to its pending status. Scroll to office holidays. | “Leave shows the configured allowance, carry-forward, approved leave and balance. Choose the dates you need and submit a request. You can cancel it while it’s pending. The office holiday calendar is below your requests.” |
| 2:30–3:15 | Switch to the demo admin. Open Attendance and show date and office filters, then open a fictional employee’s details. Visit People and show profile, schedule and access settings. | “Managers and admins see the employees in their scope. Filter attendance by date or office and open a record to review its details. People is where authorized staff maintain employee profiles and schedules.” |
| 3:15–4:05 | Open team Hours and show the correction queue. Open Leave and demonstrate a decision on a fictional request with a short note. | “Review working-time exceptions and correction requests from Hours. In Leave, authorized reviewers can approve or decline a request and record their reason.” |
| 4:05–4:45 | Open Reports, choose dates and download attendance and hours CSVs. Show the Reports screen and one fictional export header. | “Reports lets you download attendance submissions and team hours for a selected date range. The exports use the same team scope as the portal. Private attendance notes are omitted from the attendance report.” |
| 4:45–5:00 | Show policy settings and return to the workspace. | “Office and working-hours settings follow HMF’s agreed rules. This walkthrough uses fictional records in the HMF preview.” |

Use hard cuts between roles and compress the interval between check-in and checkout. Record voiceover after the screen capture so narration can match the actual screens. Verify both reports download from the browser before filming that segment.
```

## File: `DESIGN-REVIEW.md`

```
# HMF UI redesign — 9 November 2026

## Phase 2 source review — 10 November 2026

The new working-time section, Hours tab, correction requests and hours-rule disclosure reuse existing HMF tokens, table regions, form controls and type. The original daily status form is retained behind a disclosure to keep Today focused. Correction entry uses office-local date/time controls with explicit handling for repeated clock-change hours.

Provisional manual source score remains **89/100**: color 16, type 16, layout 9, surfaces 10, states/accessibility 10, motion 6, coherence 12, task-specific identity 10. Source evidence: `app/hours-ui.tsx` (WorkClock, HoursView, CorrectionForm, CorrectionQueue, HoursSettings) and the hours selectors in `app/globals.css`. Existing residuals apply: DL-29 loading does not reserve complete table geometry (strong, no autofix); DL-30 some failures use reload/reopen recovery (strong, no autofix). No source-level invariant violation identified manually. This is not a visual verdict.

Six new hours/date tests plus the ten existing core/design tests passed. API regressions and Phase 2 acceptance tests passed locally. Compiler lock check passed; remote rule freshness was unavailable. The previously reported missing-registry automated gate and browser-security visual gate remain unresolved. No mobile/desktop rendered or full accessibility pass is claimed.

## Phase 1 extension review

Preserves the compiled HMF operations-console rules and existing tokens. New forms, directory filters, profile values, schedules and settings use the same flat sections, controls, navy actions and disclosures. Employee navigation is Today / Schedule / History, with My profile in the account menu; offices remain an administrator setting. The prior reviews below describe earlier revisions.

Manual source review: **89/100, provisional** — color 16/16, hierarchy 16/16, layout 9/12, surfaces 10/10, states/accessibility 10/18, motion 6/6, coherence 12/12, task-specific identity 10/10. Evidence: app/workforce.tsx People, ProfileView, ScheduleView, AuditView and WorkforceSettings; app/globals.css Phase 1 extension at line 413. New controls have visible labels, tables have keyboard-scroll regions, fields use native validation, mutations show errors, and protected details are read-only. No new decorative surfaces or accent colors were introduced.

Residual source findings: DL-29-skeleton-matches-content, strong, autofix no — profile and schedule loading messages do not reserve the complete loaded layout (layout −3). DL-30-states-stay-in-place, strong, autofix no — some profile/template failures require reopen or refresh instead of a dedicated retry (states −3); template editor remains usable for a custom pattern but template-fetch recovery is limited (states −5). No source-level invariant violation identified manually. This score is not a visual or human acceptance verdict.

The ten core/design checks, TypeScript, original API regression suite, Phase 1 integration suite and isolated migration rehearsal passed. The lock compiler check passed. The deterministic design scan **did not pass**: SS000 reports the absent registry in this legacy lock project. No registry migration was made merely to obtain a pass. Installed rule integrity was verified; the remote update check was unavailable. Desktop/mobile rendered verification remains blocked by the previously reported browser security-check failure; no alternative browser route was used. Full visual/accessibility acceptance remains outstanding.

## Current revision: less on each screen

User feedback supersedes the earlier visual direction below. Removed the sidebar, metric cards, repeated headings, photo/slogan panel and employee profile aside. The default register is four columns; full details remain available by clicking an employee name. Counts are part of the status filter. A small top navigation replaces the sidebar. Employee home contains only today's submission, with history on its own tab. Account information, access logs, corrections history and attendance policy use labelled disclosures. HMF identity and existing features are preserved.

Effective rule set remains operations-console × SaaS × dashboard × enterprise-workbench × Swiss, with the user-directed simplification recorded in STYLESEED.md. Source review remains provisional 94/100 (16 color, 16 type, 9 layout, 10 surfaces, 15 states, 6 motion, 12 coherence, 10 task-specific identity). The same loading-region and inline-retry limitations below remain; this is not a claim that the user will prefer the design. Source locations: Workspace (top navigation/account disclosure), Admin (four-column register), Employee (historyOnly branch), EmployeeDetail (activity disclosures), and globals.css's Simplified screens section. No blocking source issues found.

Four design/contrast checks and the attendance API regression suite were executed for this revision. TypeScript passed. Browser visual verification remains unavailable following the earlier security-check failure; no bypass or alternative browser route was attempted. Automated StyleSeed registry scanning remains unsupported for this legacy lock. No desktop/mobile visual pass is claimed. Production build is checked by the packaging workflow.

The earlier review below is retained as historical context; its photography/sidebar descriptions do not describe the current revision.

## Direction

StyleSeed rule set: operations-console × product-ui × SaaS × dashboard × enterprise-workbench × cobalt-instrument × Swiss. This fits a daily attendance register: office/date scope, comparable response counts, a working table, and employee details on demand.

Preserved HMF blue, red, white, logo and engineering photograph; retained all existing account and attendance features. Removed marketing banners from working screens, decorative icon tiles, huge slogans inside the app, and tiny table text. The photograph is now confined to sign-in, separate from text. Desktop content uses a neutral Arial/Helvetica stack without an external font dependency. HMF red marks identity/navigation, navy identifies actions, and labelled status colors communicate attendance.

Project decisions: [STYLESEED.md](STYLESEED.md). Compiled rules: [.styleseed/effective-rules.md](.styleseed/effective-rules.md). Compiler provenance: [.styleseed/manifest.json](.styleseed/manifest.json). The generated palette is advisory material; the product-native semantic tokens are at the start of `app/globals.css`, preserving the HMF palette and independently checked for contrast.

## Source review: 94/100 (provisional, not a visual verdict)

| Category | Score | Source evidence |
| --- | --- | --- |
| Color discipline | 16/16 | Semantic tokens in globals.css; status text accompanies color; tested text/boundary pairs. |
| Hierarchy and typography | 16/16 | 14–16px working text, 12px record metadata, neutral type, tabular numbers. Small uppercase labels are structural overlines, not essential record data. |
| Layout and rhythm | 9/12 | Office/date controls lead directly into counts and evidence; first-load admin rows retain table height, but employee history uses a generic loading region. |
| Cards and elevation | 10/10 | Flat ledger sections and explicit boundaries; shadow only on the modal. |
| States and accessibility | 15/18 | Focus indicators, skip link, named controls, selected navigation/filter state, live messages, scrollable keyboard-accessible tables, and 44px mobile controls. Detail/employee load errors still rely on reopening/reloading rather than a dedicated inline retry. |
| Motion and interaction | 6/6 | Restrained 120ms color feedback and loading rotation; reduced-motion override. |
| Coherence | 12/12 | Shared controls, status badges, page headers, typography and token roles across all views. |
| Distinctiveness | 10/10 | Actual HMF assets and a company-register layout; no decorative KPI symbols, gradients or app marketing heroes. |

Nonblocking residual findings:

- Rule DL-29-skeleton-matches-content; location `app/portal.tsx`, Employee history loading region; evidence: generic text loading region does not mirror final row geometry; priority strong; autofix no. Keep as a bounded loading-state refinement, not a reason to change the layout again.
- Rule DL-30-states-stay-in-place; location `app/portal.tsx`, Employee and EmployeeDetail load failures; evidence: errors are shown but dedicated retry controls are absent; priority strong; autofix no. Existing reload/reopen recovery remains available.

No blocking source findings identified in this manual review. The score is an informed code review, not independent human evaluation or proof of visual quality.

## Executed checks and limits

- Attendance server integration checks passed against the local fictional demo: both offices, admin separation, submissions, date/identity enforcement, one-record-per-day updates, corrections and audits, CSV export, and sign-in/sign-out events.
- Three design tests passed: relevant opaque text/status pairs meet 4.5:1; field edges/focus meet 3:1; key assets and interaction-state hooks remain present. These tests inspect declared tokens, not rendered pixels.
- TypeScript checked; production build is required during packaging.
- StyleSeed resolver compiled the lock. Its deterministic scan requires a registry artifact and cannot scan this legacy single-lock setup; automated StyleSeed gate is unavailable, not passed. No registry migration was performed just to obtain a pass.
- Visual gate skipped: the browser tool refused local-page access because its admin-enforced security check was unavailable. No alternate browser path was used to bypass it. Desktop/mobile screenshots, actual reflow, focus behavior and visual balance remain unverified.
- StyleSeed installed revision integrity was verified locally; its remote update check was unavailable. Used installed 5.0.0 without upgrading.

Changed implementation: `app/portal.tsx`, `app/globals.css`. Added design lock/compiler artifacts, this review, and `scripts/test-design.mjs`. Backend source, schema, data, audience and demo credentials are unchanged.
```

## File: `STYLESEED.md`

```
# StyleSeed — HMF design lock

- App domain: saas
- Surface: desktop-app
- Surface adapter: product-ui
- Page type: dashboard
- Output grammar: operations-console
- Grammar path: built-in:engine/RULESETS.md
- Grammar fallback: operations-console
- Reference confidence: n/a
- Brand recipe: enterprise-workbench
- Palette recipe: cobalt-instrument
- Key color: #173F5F
- Palette character: deep
- Palette mode: light
- Palette harmony: tonal
- Surface temperature: neutral
- Aesthetic profile: swiss
- Skin: custom
- Primary action: #075DA8
- Font: Arial, Helvetica, sans-serif
- Radius: subtle
- Elevation: flat sections and hairline borders; shadow only for modal overlays
- Density: comfortable
- Motion: Snap restrained
- Imagery/data role: logo only on sign-in; no decorative photography; attendance data leads the workspace
- Signature move: HMF red rule, navy masthead, direct operational language, aligned attendance ledger
- Locked: 2026-11-09

## Brand and product decisions

Retain the official HMF logo and blue, red and white identity. Use a deep navy masthead, clear blue actions and a narrow red brand rule. Use a light canvas with a soft translucent blue wash behind the workspace and sign-in. Keep controls and menus on solid surfaces. Use distinct green, amber and red status fills alongside readable labels.

Desktop body/control text 14–16px; secondary metadata 12px minimum. Touch controls 44px. Use 4px control corners, squared panel borders, and a coherent native 4/8/12/16/24/32/48px spacing scale. Keep controls close to the table they affect, separate page headers from working sections, and use 16px mobile / 40px desktop page insets. Preserve all account permissions, check-in actions, history, office filters, CSV export, corrections, and portal access events. Mobile uses a navigation drawer and a horizontally scrollable data table.

This is an existing, private demo with fictional employees, not a production employee identity system. Existing backend behavior stays unchanged.

## Simplification requested by the user

Replace the sidebar with a small top navigation. Remove summary tiles and repeated headings. Main register shows name, office, status and time; employee identity, department, notes, corrections and access activity remain in details. Status totals remain in the filter rather than separate cards. Employee home shows only today's form; history has its own tab. Account information is disclosed on demand. Sign-in is a single narrow form without photography or slogans. Keep existing colors and readable controls; use 48px major page spacing and 24px local grouping. Mobile navigation wraps in the header instead of using a drawer. These explicit user-directed reductions supersede earlier containment and imagery choices.
```

## File: `app/api/hours/route.ts`

```
import { availability } from '../../lib/availability';
import { databaseConflict } from '../../lib/conflicts';
import { getChatGPTUser } from '../../chatgpt-auth';
import {
  csv,
  dayInZone,
  InputError,
  requireValue,
  sameValue,
  textValue,
  validDate,
} from '../../lib/core';
import {
  audit,
  context,
  db,
  now,
  schedules,
  scope,
  settings,
  system,
  team,
  type Person,
} from '../../lib/store';
import {
  dateRange,
  defaultHoursPolicy,
  metrics,
  snapshotFor,
  validateTimes,
  type HoursPolicy,
  type WorkRecord,
  type WorkSnapshot,
} from '../../lib/hours';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
function failure(e: unknown) {
  if (e instanceof InputError) return json({ error: e.message }, e.status);
  if (databaseConflict(e) || String(e).includes('UNIQUE constraint'))
    return json({ error: 'This record changed. Refresh before trying again.' }, 409);
  console.error('HMF hours', e);
  return json({ error: 'Unable to save working time. Please try again.' }, 503);
}
async function policy() {
  const r = await db()
    .prepare("SELECT data FROM directory_settings WHERE kind='hours' AND code='company'")
    .first<{ data: string }>();
  return r ? (JSON.parse(r.data) as HoursPolicy) : defaultHoursPolicy;
}
async function recordFor(id: string, date: string) {
  return db()
    .prepare('SELECT * FROM work_records WHERE employee_id=? AND date=?')
    .bind(id, date)
    .first<WorkRecord>();
}
const guard = (id: string, date: string, revision: number) =>
  db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT revision FROM work_records WHERE employee_id=? AND date=?),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(id, date, revision);
function targetFor(me: Person, people: Person[], id: string) {
  const target = people.find((p) => p.id === id);
  requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
  return target;
}
async function snap(target: Person, date: string) {
  return snapshotFor(await schedules(target.id), date, target.timezone, await policy());
}
function writeRecord(
  target: string,
  date: string,
  times: { checkIn: string; checkOut: string | null; breakMinutes: number },
  snapshot: WorkSnapshot,
  employeeNote: string,
  managerNote: string,
) {
  return db()
    .prepare(
      'INSERT INTO work_records(employee_id,date,check_in,check_out,break_minutes,snapshot,revision,employee_note,manager_note,overtime_state,updated_at) VALUES (?,?,?,?,?,?,1,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET check_in=excluded.check_in,check_out=excluded.check_out,break_minutes=excluded.break_minutes,revision=work_records.revision+1,manager_note=excluded.manager_note,overtime_state=excluded.overtime_state,updated_at=excluded.updated_at',
    )
    .bind(
      target,
      date,
      times.checkIn,
      times.checkOut,
      times.breakMinutes,
      JSON.stringify(snapshot),
      employeeNote,
      managerNote,
      'pending',
      now(),
    );
}

export async function GET(req: Request) {
  try {
    const owner = await getChatGPTUser();
    requireValue(owner, 'Sign in first.', 401);
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Sign in again.', 401);
    const { me, people } = ctx,
      q = new URL(req.url).searchParams,
      action = q.get('action') || 'today';
    if (action === 'policy') return json({ policy: await policy(), canEdit: system(me) });
    if (action === 'today') {
      const today = dayInZone(me.timezone),
        record = await recordFor(me.id, today),
        open = await db()
          .prepare(
            'SELECT * FROM work_records WHERE employee_id=? AND check_out IS NULL ORDER BY date LIMIT 1',
          )
          .bind(me.id)
          .first<WorkRecord>();
      const snapshot = record ? JSON.parse(record.snapshot) : await snap(me, today);
      return json({
        today,
        record,
        open,
        snapshot,
        metrics: metrics(
          record,
          snapshot,
          today,
          new Date(),
          undefined,
          (await availability([me], today, today))(me, today),
        ),
      });
    }
    const all = q.get('team') === 'true';
    requireValue(!all || team(me), 'Team access is required.', 403);
    const targets = all
      ? people.filter((p) => scope(me, p))
      : [targetFor(me, people, q.get('id') || me.id)];
    if (action === 'corrections') {
      const ids = JSON.stringify(targets.map((p) => p.id));
      const rows = (
        await db()
          .prepare(
            'SELECT c.*,e.name AS employee_name,r.name AS requester_name,d.name AS decider_name FROM time_corrections c JOIN employees e ON e.id=c.employee_id LEFT JOIN employees r ON r.id=c.requested_by LEFT JOIN employees d ON d.id=c.decided_by WHERE c.employee_id IN (SELECT value FROM json_each(?)) ORDER BY c.created_at DESC',
          )
          .bind(ids)
          .all<any>()
      ).results;
      return json({
        requests: rows.map((r) => ({
          ...r,
          proposed: JSON.parse(r.proposed),
          canDecide: team(me) && me.id !== r.employee_id && me.id !== r.requested_by,
          canCancel: me.id === r.requested_by,
        })),
      });
    }
    if (action === 'sheet' || action === 'export') {
      const today = dayInZone(me.timezone),
        start = q.get('start') || today.slice(0, 7) + '-01',
        end = q.get('end') || today,
        dates = dateRange(start, end),
        rules = await policy();
      const records = (
        await db()
          .prepare('SELECT * FROM work_records WHERE date>=? AND date<=?')
          .bind(start, end)
          .all<WorkRecord>()
      ).results;
      const attendance = (
        await db()
          .prepare('SELECT employee_id,date,submitted_at FROM attendance WHERE date>=? AND date<=?')
          .bind(start, end)
          .all<{ employee_id: string; date: string; submitted_at: string }>()
      ).results;
      const versions = (
        await db()
          .prepare('SELECT * FROM schedule_versions WHERE employee_id IS NOT NULL')
          .all<any>()
      ).results.map((s) => ({ ...s, days: JSON.parse(s.days) }));
      const excused = await availability(targets, start, end);
      const rows = [];
      for (const target of targets) {
        for (const date of dates) {
          const record = records.find((r) => r.employee_id === target.id && r.date === date);
          if (
            !record &&
            (!target.active ||
              (target.profile.startDate && date < target.profile.startDate) ||
              (target.profile.endDate && date > target.profile.endDate))
          )
            continue;
          const snapshot: WorkSnapshot = record
              ? JSON.parse(record.snapshot)
              : snapshotFor(
                  versions.filter((s) => s.employee_id === target.id),
                  date,
                  target.timezone,
                  rules,
                ),
            submission = attendance.find((r) => r.employee_id === target.id && r.date === date);
          rows.push({
            employeeId: target.id,
            name: target.name,
            office: target.office,
            department: target.department,
            date,
            timezone: snapshot.timezone,
            record: record
              ? { ...record, employee_note: target.id === me.id ? record.employee_note : '' }
              : null,
            snapshot,
            ...metrics(
              record || null,
              snapshot,
              date,
              new Date(),
              submission?.submitted_at,
              excused(target, date),
            ),
            noResponse: !submission && !excused(target, date),
            canReview: team(me) && target.id !== me.id,
          });
        }
      }
      if (action === 'export')
        return new Response(
          csv([
            [
              'Employee ID',
              'Name',
              'Office',
              'Date',
              'Time zone',
              'Check-in UTC',
              'Check-out UTC',
              'Break minutes',
              'Scheduled minutes',
              'Recorded minutes',
              'Difference minutes',
              'Overtime minutes',
              'Overtime decision',
              'Missing check-in',
              'Missing check-out',
              'Late submission',
            ],
            ...rows.map((r) => [
              r.employeeId,
              r.name,
              r.office,
              r.date,
              r.timezone,
              r.record?.check_in,
              r.record?.check_out,
              r.record?.break_minutes,
              r.scheduledMinutes,
              r.recordedMinutes,
              r.differenceMinutes,
              r.overtimeMinutes,
              r.overtimeState,
              r.missingCheckIn,
              r.missingCheckOut,
              r.lateSubmission,
            ]),
          ]),
          {
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': 'attachment; filename="hmf-hours.csv"',
              'Cache-Control': 'no-store',
            },
          },
        );
      return json({ rows, start, end, today });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return failure(e);
  }
}

export async function POST(req: Request) {
  try {
    const owner = await getChatGPTUser();
    requireValue(owner, 'Sign in first.', 401);
    requireValue(
      req.headers.get('origin') === new URL(req.url).origin,
      'Invalid request origin.',
      403,
    );
    requireValue(
      req.headers.get('content-type')?.includes('application/json'),
      'JSON required.',
      415,
    );
    const raw = await req.text();
    requireValue(raw.length < 12000, 'Request too large.', 413);
    let b: any;
    try {
      b = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(b && typeof b === 'object', 'Invalid request.');
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Sign in again.', 401);
    const { me, people } = ctx;
    if (b.action === 'policy') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const p = b.policy,
        reason = textValue(b.reason, 500, true);
      requireValue(p && typeof p === 'object', 'Complete the hours rules.');
      for (const k of ['trackBreaks', 'overtimeEnabled', 'overtimeApproval'])
        requireValue(typeof p[k] === 'boolean', 'Complete the hours rules.');
      requireValue([null, true, false].includes(p.breaksPaid), 'Choose a break rule.');
      requireValue(
        p.graceMinutes === null ||
          (Number.isInteger(p.graceMinutes) && p.graceMinutes >= 0 && p.graceMinutes <= 1440),
        'Enter a valid grace period in minutes.',
      );
      requireValue(
        typeof p.submissionDeadline === 'string' &&
          (!p.submissionDeadline || /^([01]\d|2[0-3]):[0-5]\d$/.test(p.submissionDeadline)),
        'Choose a valid submission deadline.',
      );
      requireValue(
        p.overtimeThresholdMinutes === undefined ||
          (Number.isInteger(p.overtimeThresholdMinutes) &&
            p.overtimeThresholdMinutes >= 1 &&
            p.overtimeThresholdMinutes <= 1440),
        'Enter an overtime threshold between 1 and 1440 minutes.',
      );
      const next: HoursPolicy = {
          ...(p.overtimeThresholdMinutes === undefined
            ? {}
            : { overtimeThresholdMinutes: p.overtimeThresholdMinutes }),
          trackBreaks: p.trackBreaks,
          breaksPaid: p.breaksPaid,
          overtimeEnabled: p.overtimeEnabled,
          overtimeApproval: p.overtimeApproval,
          graceMinutes: p.graceMinutes,
          submissionDeadline: p.submissionDeadline,
        },
        old = await policy();
      requireValue(sameValue(old, b.previous), 'Settings changed. Reload before saving.', 409);
      const stored = await db()
        .prepare("SELECT data FROM directory_settings WHERE kind='hours' AND code='company'")
        .first<{ data: string }>();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='hours' AND code='company'),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(stored?.data || ''),
        db()
          .prepare(
            "INSERT INTO directory_settings(kind,code,data,updated_at) VALUES ('hours','company',?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at",
          )
          .bind(JSON.stringify(next), now()),
        audit(me.id, null, 'hours.policy', old, next, reason),
      ]);
      return json({ ok: true });
    }
    if (b.action === 'checkIn') {
      const date = dayInZone(me.timezone),
        stamp = now(),
        definition = (await settings()).statuses.find(
          (s) => s.code === b.status && s.enabled && s.category === 'working',
        );
      requireValue(definition, 'Choose an available working status.');
      const note = textValue(b.note || '', 500);
      requireValue(!definition.explanation || !!note, 'Add a short work-related explanation.');
      requireValue(
        !(await recordFor(me.id, date)),
        'A working-time record already exists for today. Request a correction if it is wrong.',
        409,
      );
      requireValue(
        !(await db()
          .prepare('SELECT date FROM work_records WHERE employee_id=? AND check_out IS NULL')
          .bind(me.id)
          .first()),
        'You have an open check-in. Check out or request a correction first.',
        409,
      );
      requireValue(
        !(await db()
          .prepare(
            "SELECT id FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?",
          )
          .bind(me.id, date, date)
          .first()),
        'You have approved leave today. Ask an authorized reviewer to resolve it before checking in.',
        409,
      );
      const snapshot = await snap(me, date),
        old = await db()
          .prepare('SELECT * FROM attendance WHERE employee_id=? AND date=?')
          .bind(me.id, date)
          .first<any>();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id, date, old?.updated_at || ''),
        guard(me.id, date, 0),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id, date, date),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND check_out IS NULL) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(me.id),
        writeRecord(
          me.id,
          date,
          { checkIn: stamp, checkOut: null, breakMinutes: 0 },
          snapshot,
          note,
          '',
        ),
        db()
          .prepare(
            'INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason=excluded.reason,updated_at=excluded.updated_at,source=excluded.source',
          )
          .bind(me.id, date, definition.code, note, me.office, stamp, stamp, 'employee'),
        db()
          .prepare(
            'INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,?,NULL,NULL,NULL) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval=excluded.approval,decided_by=NULL,decided_at=NULL,decision_note=NULL',
          )
          .bind(
            me.id,
            date,
            JSON.stringify({ ...definition, timezone: me.timezone }),
            definition.approval ? 'pending' : 'not_required',
          ),
        audit(
          me.id,
          me.id,
          'hours.check_in',
          null,
          { date, checkIn: stamp, snapshot },
          'Employee checked in',
        ),
        audit(
          me.id,
          me.id,
          'attendance.submitted',
          old,
          { date, status: definition.code, reason: note },
          'Attendance saved with explicit work check-in',
        ),
      ]);
      return json({ ok: true, date });
    }
    if (b.action === 'checkOut') {
      const date = textValue(b.date, 10, true),
        old = await recordFor(me.id, date);
      requireValue(old && !old.check_out, 'There is no open check-in for this date.', 409);
      requireValue(
        old.revision === b.revision,
        'This record changed. Refresh before checking out.',
        409,
      );
      const snapshot: WorkSnapshot = JSON.parse(old.snapshot),
        breakMinutes = snapshot.policy.trackBreaks ? b.breakMinutes : 0;
      requireValue(
        Number.isInteger(breakMinutes) &&
          breakMinutes >= 0 &&
          breakMinutes <= (Date.now() - Date.parse(old.check_in)) / 60000,
        'Break minutes cannot exceed the recorded time.',
      );
      const stamp = now();
      await db().batch([
        guard(me.id, date, old.revision),
        writeRecord(
          me.id,
          date,
          { checkIn: old.check_in, checkOut: stamp, breakMinutes },
          snapshot,
          old.employee_note,
          old.manager_note,
        ),
        audit(
          me.id,
          me.id,
          'hours.check_out',
          old,
          { date, checkOut: stamp, breakMinutes },
          'Employee explicitly checked out',
        ),
      ]);
      return json({ ok: true });
    }
    if (b.action === 'requestCorrection') {
      const target = targetFor(me, people, b.employeeId || me.id);
      requireValue(target.id === me.id || team(me), 'Team access is required.', 403);
      const date = textValue(b.date, 10, true);
      requireValue(
        validDate(date) && date <= dayInZone(target.timezone),
        'Choose today or an earlier working date.',
      );
      const old = await recordFor(target.id, date),
        snapshot: WorkSnapshot = old ? JSON.parse(old.snapshot) : await snap(target, date),
        times = validateTimes(b.times, date, snapshot.timezone),
        reason = textValue(b.reason, 500, true);
      requireValue(
        b.revision === (old?.revision || 0),
        'The working-time record changed. Refresh before requesting a correction.',
        409,
      );
      const id = crypto.randomUUID();
      await db().batch([
        guard(target.id, date, old?.revision || 0),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM time_corrections WHERE employee_id=? AND date=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date),
        db()
          .prepare(
            'INSERT INTO time_corrections(id,employee_id,date,proposed,base_revision,status,requested_by,reason,created_at) VALUES (?,?,?,?,?,?,?,?,?)',
          )
          .bind(
            id,
            target.id,
            date,
            JSON.stringify({ ...times, snapshot }),
            old?.revision || 0,
            'pending',
            me.id,
            reason,
            now(),
          ),
        audit(me.id, target.id, 'hours.correction_requested', old, { id, date, ...times }, reason),
      ]);
      return json({ ok: true, id });
    }
    if (b.action === 'decideCorrection' || b.action === 'cancelCorrection') {
      const request = await db()
        .prepare('SELECT * FROM time_corrections WHERE id=?')
        .bind(String(b.id || ''))
        .first<any>();
      requireValue(request, 'Correction not found.', 404);
      const target = targetFor(me, people, request.employee_id),
        cancel = b.action === 'cancelCorrection';
      requireValue(
        cancel
          ? request.requested_by === me.id
          : team(me) && target.id !== me.id && request.requested_by !== me.id,
        'You cannot decide your own correction or another person’s cancellation.',
        403,
      );
      requireValue(request.status === 'pending', 'This request already has a decision.', 409);
      const decision = cancel ? 'cancelled' : textValue(b.decision, 20, true);
      requireValue(
        ['approved', 'declined', 'cancelled'].includes(decision) &&
          (cancel || decision !== 'cancelled'),
        'Choose approve or decline.',
      );
      const reason = cancel ? 'Requester cancelled the correction' : textValue(b.reason, 500, true),
        old = await recordFor(target.id, request.date),
        proposed = JSON.parse(request.proposed),
        statements = [
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM time_corrections WHERE id=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(request.id),
        ];
      if (decision === 'approved') {
        requireValue(
          (old?.revision || 0) === request.base_revision,
          'Working times changed since this request. Decline it and request a fresh correction.',
          409,
        );
        validateTimes(proposed, request.date, proposed.snapshot.timezone);
        const overlap = await db()
          .prepare(
            'SELECT date FROM work_records WHERE employee_id=? AND date<>? AND check_in<? AND (check_out IS NULL OR check_out>?)',
          )
          .bind(target.id, request.date, proposed.checkOut, proposed.checkIn)
          .first();
        requireValue(
          !overlap,
          'These times overlap another working-time record. Correct that record first.',
        );
        const attendance = await db()
          .prepare(
            'SELECT a.*,d.definition FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.employee_id=? AND a.date=?',
          )
          .bind(target.id, request.date)
          .first<any>();
        const configured = (await settings()).statuses;
        const previousDefinition = attendance?.definition
          ? JSON.parse(attendance.definition)
          : null;
        const definition =
          previousDefinition?.category === 'working'
            ? previousDefinition
            : configured.find((s) => s.enabled && s.category === 'working');
        requireValue(
          definition,
          'Configure a working attendance status before approving corrected hours.',
        );
        const stamp = now();
        statements.push(
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) AND COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(
              target.id,
              request.date,
              request.date,
              target.id,
              request.date,
              attendance?.updated_at || '',
            ),
          db()
            .prepare(
              "INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,'',?,?,?,'admin') ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason='',updated_at=excluded.updated_at,source='admin'",
            )
            .bind(
              target.id,
              request.date,
              definition.code,
              target.office,
              attendance?.submitted_at || stamp,
              stamp,
            ),
          db()
            .prepare(
              "INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,'approved',?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval='approved',decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note",
            )
            .bind(
              target.id,
              request.date,
              JSON.stringify({ ...definition, timezone: target.timezone }),
              me.id,
              stamp,
              reason,
            ),
          audit(
            me.id,
            target.id,
            'attendance.corrected',
            attendance,
            { date: request.date, status: definition.code, requestId: request.id },
            reason,
          ),
        );
        statements.push(
          db()
            .prepare(
              "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND date<>? AND check_in<? AND (check_out IS NULL OR check_out>?)) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
            )
            .bind(target.id, request.date, proposed.checkOut, proposed.checkIn),
          guard(target.id, request.date, request.base_revision),
          writeRecord(
            target.id,
            request.date,
            proposed,
            proposed.snapshot,
            old?.employee_note || '',
            reason,
          ),
        );
      }
      statements.push(
        db()
          .prepare(
            'UPDATE time_corrections SET status=?,decided_by=?,decided_at=?,decision_note=? WHERE id=?',
          )
          .bind(decision, me.id, now(), reason, request.id),
        audit(
          me.id,
          target.id,
          'hours.correction_' + decision,
          old,
          { requestId: request.id, date: request.date, ...proposed },
          reason,
        ),
      );
      await db().batch(statements);
      return json({ ok: true });
    }
    if (b.action === 'overtimeDecision') {
      const target = targetFor(me, people, String(b.employeeId || ''));
      requireValue(team(me) && target.id !== me.id, 'You cannot approve your own overtime.', 403);
      const old = await recordFor(target.id, String(b.date || ''));
      requireValue(
        old && old.check_out && old.revision === b.revision,
        'This record changed or has not been checked out.',
        409,
      );
      const m = metrics(old, JSON.parse(old.snapshot), old.date);
      requireValue(
        m.overtimeMinutes !== null && m.overtimeMinutes > 0 && m.overtimeState === 'pending',
        'No overtime decision is pending.',
        409,
      );
      const decision = textValue(b.decision, 20, true),
        reason = textValue(b.reason, 500, true);
      requireValue(['approved', 'declined'].includes(decision), 'Choose approve or decline.');
      await db().batch([
        guard(target.id, old.date, old.revision),
        db()
          .prepare(
            'UPDATE work_records SET overtime_state=?,manager_note=?,revision=revision+1,updated_at=? WHERE employee_id=? AND date=?',
          )
          .bind(decision, reason, now(), target.id, old.date),
        audit(
          me.id,
          target.id,
          'hours.overtime_' + decision,
          old,
          { date: old.date, decision },
          reason,
        ),
      ]);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return failure(e);
  }
}
```

## File: `app/api/leave/route.ts`

```
import { databaseConflict } from '../../lib/conflicts';
import { getChatGPTUser } from '../../chatgpt-auth';
import {
  dayInZone,
  effectiveSchedule,
  InputError,
  paidMinutes,
  requireValue,
  textValue,
  validDate,
} from '../../lib/core';
import { chargeLeave, chargeTotal, leaveDates, type LeaveCharge } from '../../lib/leave';
import {
  audit,
  context,
  db,
  now,
  revisionGuard,
  schedules,
  settings,
  system,
  type Person,
} from '../../lib/store';

export const dynamic = 'force-dynamic';
type Holiday = { date: string; name: string };
type LeavePolicy = { start: string; end: string; holidays: Holiday[]; allowPastRequests?: boolean };

async function officePolicy(office: string) {
  return db()
    .prepare("SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?")
    .bind(office)
    .first<{ data: string }>();
}

async function chargeFor(
  row: LeaveRequest,
  employee: Person,
  policy: LeavePolicy,
): Promise<LeaveCharge> {
  if (row.snapshot) {
    const charge = JSON.parse(row.snapshot) as LeaveCharge;
    requireValue(
      charge.unit === employee.profile.holidayUnit,
      'Ask HR to reconcile existing requests after the entitlement unit changed.',
    );
    return {
      ...charge,
      days: charge.days.filter((d) => d.date >= policy.start && d.date <= policy.end),
    };
  }
  return chargeLeave(
    row.start_date > policy.start ? row.start_date : policy.start,
    row.end_date < policy.end ? row.end_date : policy.end,
    employee.profile.holidayUnit,
    policy,
    await schedules(employee.id),
  );
}
async function balanceFor(employee: Person, rows: LeaveRequest[], policy: LeavePolicy | null) {
  const { holidayAllowance: allowance, carriedForward, holidayUnit: unit } = employee.profile;
  let booked: number | null = null,
    pending: number | null = null,
    taken: number | null = null;
  if (policy) {
    booked = 0;
    pending = 0;
    taken = 0;
    for (const row of rows.filter(
      (r) =>
        ['approved', 'pending'].includes(r.status) &&
        r.start_date <= policy.end &&
        r.end_date >= policy.start,
    )) {
      try {
        const charge = await chargeFor(row, employee, policy);
        if (row.status === 'pending') pending += chargeTotal(charge);
        else {
          booked += chargeTotal(charge);
          taken += chargeTotal({
            ...charge,
            days: charge.days.filter((d) => d.date < dayInZone(employee.timezone)),
          });
        }
      } catch (error) {
        if (!(error instanceof InputError)) throw error;
        booked = null;
        pending = null;
        taken = null;
        break;
      }
    }
  }
  const remaining =
    allowance === null || carriedForward === null || booked === null
      ? null
      : allowance + carriedForward - booked;
  return {
    allowance,
    carriedForward,
    unit,
    booked,
    taken,
    pending,
    remaining,
    available: remaining === null || pending === null ? null : remaining - pending,
  };
}
const selectRequests =
  'SELECT r.*,d.leave_type,d.note,d.snapshot FROM leave_requests r LEFT JOIN leave_request_details d ON d.request_id=r.id';
async function employeeRequests(id: string) {
  return (
    await db()
      .prepare(selectRequests + ' WHERE r.employee_id=?')
      .bind(id)
      .all<LeaveRequest>()
  ).results;
}
async function balanceRevision(id: string) {
  return (
    (
      await db()
        .prepare('SELECT revision FROM leave_balance_versions WHERE employee_id=?')
        .bind(id)
        .first<{ revision: number }>()
    )?.revision || 0
  );
}
function balanceWrites(id: string, revision: number) {
  return [
    db()
      .prepare(
        "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT revision FROM leave_balance_versions WHERE employee_id=?),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
      )
      .bind(id, revision),
    db()
      .prepare(
        'INSERT INTO leave_balance_versions(employee_id,revision) VALUES (?,1) ON CONFLICT(employee_id) DO UPDATE SET revision=leave_balance_versions.revision+1',
      )
      .bind(id),
  ];
}
function policyGuard(office: string, raw: string) {
  return db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(office, raw);
}

type LeaveRequest = {
  snapshot: string | null;
  note: string | null;
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'declined' | 'cancelled';
};

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

function canReview(actor: Person, employee: Person) {
  return (
    actor.id !== employee.id &&
    ((actor.roles.includes('manager') && employee.profile.managerId === actor.id) ||
      (actor.roles.includes('hr_admin') && actor.officeScope.includes(employee.office)))
  );
}

async function session(req: Request) {
  const owner = await getChatGPTUser();
  requireValue(owner, 'Sign in first.', 401);
  const current = await context(req, owner.userId);
  requireValue(current, 'Your session has ended. Sign in again.', 401);
  return current;
}

function failure(error: unknown) {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  if (databaseConflict(error)) {
    return json(
      { error: 'The request changed or overlaps existing leave. Refresh and try again.' },
      409,
    );
  }
  console.error('HMF leave', error);
  return json({ error: 'Unable to complete the leave action. Try again.' }, 503);
}

export async function GET(req: Request) {
  try {
    const { me, people } = await session(req);
    const authorized = people.filter((p) => p.id === me.id || canReview(me, p));
    const result = await db()
      .prepare(
        selectRequests +
          ' WHERE r.employee_id IN (SELECT value FROM json_each(?)) ORDER BY r.created_at DESC',
      )
      .bind(JSON.stringify(authorized.map((p) => p.id)))
      .all<LeaveRequest>();
    const requests = result.results.map((row) => {
      const employee = authorized.find((p) => p.id === row.employee_id)!;
      const own = employee.id === me.id;
      return {
        ...row,
        note: own || me.roles.includes('hr_admin') ? row.note : null,
        own,
        review: canReview(me, employee),
        name: employee.name,
      };
    });
    const stored = await officePolicy(me.office);
    const policy = stored ? (JSON.parse(stored.data) as LeavePolicy) : null;
    const today = dayInZone(me.timezone);
    const current = policy && today >= policy.start && today <= policy.end ? policy : null;
    const balance = await balanceFor(
      me,
      requests.filter((row) => row.own),
      current,
    );
    const config = await settings(),
      office = new URL(req.url).searchParams.get('office') || me.office;
    requireValue(
      config.offices.some((o) => o.code === office) && (system(me) || office === me.office),
      'Office not available.',
      403,
    );
    const selected = office === me.office ? stored : await officePolicy(office);
    return json({
      requests: requests.map((r) => ({ ...r, snapshot: undefined })),
      policy: selected ? JSON.parse(selected.data) : null,
      balance,
      office,
      offices: config.offices.filter((o) => system(me) || o.code === me.office),
      canEditPolicy: system(me),
    });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(req: Request) {
  try {
    const { me, people } = await session(req);
    requireValue(
      req.headers.get('origin') === new URL(req.url).origin,
      'Invalid request origin.',
      403,
    );
    requireValue(
      req.headers.get('content-type')?.includes('application/json'),
      'JSON required.',
      415,
    );
    const raw = await req.text();
    requireValue(raw.length <= 20000, 'Request too large.', 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    requireValue(body.action === 'savePolicy' || raw.length <= 4000, 'Request too large.', 413);
    const database = db();
    if (body.action === 'savePolicy') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const start = textValue(body.start, 10, true);
      const end = textValue(body.end, 10, true);
      leaveDates(start, end);
      const office = textValue(body.office || me.office, 40, true);
      requireValue(
        (await settings()).offices.some((o) => o.code === office),
        'Choose a configured office.',
      );
      requireValue(
        Array.isArray(body.holidays) && body.holidays.length <= 80,
        'Enter up to 80 holidays.',
      );
      const dates = new Set<string>();
      const holidays = body.holidays
        .map((entry: unknown) => {
          requireValue(
            entry && typeof entry === 'object' && 'date' in entry && 'name' in entry,
            'Enter a holiday date and name.',
          );
          const date = textValue(entry.date, 10, true);
          const name = textValue(entry.name, 100, true);
          requireValue(
            validDate(date) && date >= start && date <= end && !dates.has(date),
            'Holiday dates must be unique and inside the leave period.',
          );
          dates.add(date);
          return { date, name };
        })
        .sort((a: Holiday, b: Holiday) => a.date.localeCompare(b.date));
      const previous = await officePolicy(office);
      requireValue(
        body.allowPastRequests === undefined || typeof body.allowPastRequests === 'boolean',
        'Choose whether past requests are allowed.',
      );
      const previousPolicy = previous ? JSON.parse(previous.data) : null;
      if ('previous' in body)
        requireValue(
          JSON.stringify(body.previous) === JSON.stringify(previousPolicy),
          'This calendar changed. Refresh before saving.',
          409,
        );
      const next = {
        start,
        end,
        holidays,
        allowPastRequests: body.allowPastRequests ?? previousPolicy?.allowPastRequests ?? true,
      };
      await database.batch([
        database
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind='leave_policy' AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(office, previous?.data || ''),
        database
          .prepare(
            "INSERT INTO directory_settings(kind,code,data,updated_at) VALUES ('leave_policy',?,?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at",
          )
          .bind(office, JSON.stringify(next), now()),
        audit(
          me.id,
          null,
          'leave.policy',
          previous ? JSON.parse(previous.data) : null,
          { office, ...next },
          'Saved office leave calendar',
        ),
      ]);
      return json({ ok: true });
    }
    if (body.action === 'request') {
      const start = textValue(body.start, 10, true);
      const end = textValue(body.end, 10, true);
      leaveDates(start, end);
      requireValue(
        (!me.profile.startDate || start >= me.profile.startDate) &&
          (!me.profile.endDate || end <= me.profile.endDate),
        'Choose dates within your employment period.',
      );
      const leaveType = textValue(body.leaveType || 'annual_leave', 40, true),
        note = textValue(body.note || '', 500);
      requireValue(leaveType === 'annual_leave', 'Only annual leave is configured for booking.');
      const stored = await officePolicy(me.office);
      requireValue(stored, 'Ask your administrator to configure your office leave calendar first.');
      const policy = JSON.parse(stored.data) as LeavePolicy;
      requireValue(
        policy.allowPastRequests !== false || start >= dayInZone(me.timezone),
        'This office does not allow requests for past dates.',
      );
      const revision = await balanceRevision(me.id),
        existing = await employeeRequests(me.id);
      const charge = chargeLeave(
        start,
        end,
        me.profile.holidayUnit,
        policy,
        await schedules(me.id),
      );
      const total = chargeTotal(charge),
        balance = await balanceFor(me, existing, policy);
      requireValue(total > 0, 'These dates contain no scheduled working time.');
      requireValue(
        balance.available !== null,
        'Ask HR to confirm your allowance, carry-forward and schedules.',
      );
      requireValue(
        total <= balance.available + 0.000001,
        'This request exceeds your available leave after pending requests.',
      );
      const id = crypto.randomUUID();
      await database.batch([
        ...balanceWrites(me.id, revision),
        revisionGuard(me.id, me.revision),
        policyGuard(me.office, stored.data),
        database
          .prepare(
            `INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(
          SELECT 1 FROM leave_requests WHERE employee_id=? AND status IN ('pending','approved')
          AND start_date<=? AND end_date>=?
        ) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid`,
          )
          .bind(me.id, end, start),
        database
          .prepare(
            `INSERT INTO leave_requests
          (id,employee_id,start_date,end_date,timezone,status,created_at) VALUES (?,?,?,?,?,'pending',?)`,
          )
          .bind(id, me.id, start, end, me.timezone, now()),
        database
          .prepare(
            'INSERT INTO leave_request_details(request_id,leave_type,note,snapshot) VALUES (?,?,?,?)',
          )
          .bind(id, leaveType, note, JSON.stringify(charge)),
        audit(
          me.id,
          me.id,
          'leave.requested',
          null,
          { id, start, end, timezone: me.timezone, leaveType, charge },
          'Leave requested',
        ),
      ]);
      return json({ ok: true, id }, 201);
    }

    const id = textValue(body.id, 36, true);
    const row = await database
      .prepare(selectRequests + ' WHERE r.id=?')
      .bind(id)
      .first<LeaveRequest>();
    const employee = people.find((person) => person.id === row?.employee_id);
    requireValue(row && employee, 'Request not found.', 404);
    const status = body.action;
    const cancelling = status === 'cancelled';
    requireValue(
      cancelling || status === 'approved' || status === 'declined',
      'Unknown leave action.',
    );
    requireValue(
      cancelling ? me.id === employee.id : canReview(me, employee),
      'Request not found.',
      404,
    );
    requireValue(row.status === 'pending', 'This request is no longer pending.', 409);
    const note = cancelling ? 'Cancelled by employee' : textValue(body.note, 500, true);
    const revision = await balanceRevision(employee.id),
      statements = balanceWrites(employee.id, revision);
    if (status === 'approved') {
      const stored = await officePolicy(employee.office);
      requireValue(stored, 'Configure the office leave calendar first.');
      const policy = JSON.parse(stored.data) as LeavePolicy;
      requireValue(
        row.start_date >= policy.start && row.end_date <= policy.end,
        'This request belongs to a different leave period. Ask HR to review it.',
      );
      const charge = await chargeFor(row, employee, policy);
      const balance = await balanceFor(employee, await employeeRequests(employee.id), policy);
      requireValue(
        balance.available !== null && balance.available >= -0.000001,
        'The employee no longer has enough leave. Review the allowance and pending requests.',
      );
      const days = JSON.stringify(charge.days.map((d) => d.date)),
        stamp = now();
      const definition = JSON.stringify({
        code: 'annual_leave',
        label: 'Annual leave',
        category: 'leave',
        sensitive: false,
        approval: true,
        timezone: employee.timezone,
      });
      const before = (
        await database
          .prepare(
            'SELECT * FROM attendance WHERE employee_id=? AND date IN (SELECT value FROM json_each(?))',
          )
          .bind(employee.id, days)
          .all()
      ).results;
      statements.push(
        revisionGuard(employee.id, employee.revision),
        policyGuard(employee.office, stored.data),
        database
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM work_records WHERE employee_id=? AND date IN (SELECT value FROM json_each(?))) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(employee.id, days),
        database
          .prepare(
            "INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) SELECT ?,value,'annual_leave','',?,?,?,'leave' FROM json_each(?) WHERE 1 ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason='',updated_at=excluded.updated_at,source='leave'",
          )
          .bind(employee.id, employee.office, stamp, stamp, days),
        database
          .prepare(
            "INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) SELECT ?,value,?,'approved',?,?,'Annual leave approved' FROM json_each(?) WHERE 1 ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval='approved',decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note",
          )
          .bind(employee.id, definition, me.id, stamp, days),
        database
          .prepare(
            "INSERT INTO leave_request_details(request_id,leave_type,note,snapshot) VALUES (?,'annual_leave','',?) ON CONFLICT(request_id) DO NOTHING",
          )
          .bind(id, JSON.stringify(charge)),
        audit(
          me.id,
          employee.id,
          'attendance.leave_approved',
          before,
          { requestId: id, dates: charge.days.map((d) => d.date) },
          'Attendance updated with approved leave',
        ),
      );
    }
    statements.push(
      database
        .prepare(
          "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM leave_requests WHERE id=? AND status='pending') THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
        )
        .bind(id),
      database
        .prepare(
          'UPDATE leave_requests SET status=?,decided_by=?,decided_at=?,decision_note=? WHERE id=?',
        )
        .bind(status, me.id, now(), note, id),
      audit(
        me.id,
        employee.id,
        'leave.' + status,
        { ...row, note: undefined },
        { ...row, note: undefined, status },
        note,
      ),
    );
    await database.batch(statements);
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
```

## File: `app/api/portal/route.ts`

```
import { env } from 'cloudflare:workers';
import { databaseConflict } from '../../lib/conflicts';
import { getChatGPTUser } from '../../chatgpt-auth';
import { dateRange } from '../../lib/hours';
import {
  csv,
  dayInZone,
  defaultOffices,
  InputError,
  requireValue,
  textValue,
  validDate,
} from '../../lib/core';
import {
  attendanceRows,
  audit,
  context,
  db,
  digest,
  directory,
  now,
  passwordHash,
  publicPerson,
  redactAttendance,
  scope,
  sensitiveAccess,
  sessionToken,
  settings,
  team,
  type Account,
} from '../../lib/store';

export const dynamic = 'force-dynamic';

const dayIn = (office: string) =>
  dayInZone(defaultOffices.find((o) => o.code === office)?.timezone || 'Europe/London');
const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } });
const cookie = (req: Request, token: string, maxAge: number) =>
  `hmf_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${new URL(req.url).protocol === 'https:' ? '; Secure' : ''}`;
function equal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let c = 0;
  for (let i = 0; i < a.length; i++) c |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return c === 0;
}
async function officeDates() {
  return Object.fromEntries((await settings()).offices.map((o) => [o.code, dayInZone(o.timezone)]));
}
const failure = (error: unknown) => {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  if (databaseConflict(error))
    return json({ error: 'This record changed. Refresh before trying again.' }, 409);
  console.error('HMF attendance', error);
  return json({ error: 'The attendance service is unavailable. Please try again.' }, 503);
};
async function seed() {
  if (await db().prepare("SELECT id FROM employees WHERE id='ADMIN'").first()) return;
  const demo = env as unknown as { HMF_DEMO_MODE?: string; HMF_DEMO_PASSWORD?: string };
  if (demo.HMF_DEMO_MODE !== 'true') return;
  requireValue(
    demo.HMF_DEMO_PASSWORD && demo.HMF_DEMO_PASSWORD.length >= 12,
    'Demo setup requires an administrator-supplied password.',
    503,
  );
  const password = demo.HMF_DEMO_PASSWORD;
  const salt = crypto.randomUUID(),
    hash = await passwordHash(password, salt);
  const names = [
    'Oliver Bennett',
    'Amelia Clarke',
    'James Wilson',
    'Sophie Taylor',
    'Daniel Brooks',
    'Charlotte Evans',
    'Thomas Reed',
    'Isla Morgan',
    'Henry Lewis',
    'Grace Foster',
    'William Hughes',
    'Emily Parker',
    'Ahmed Khan',
    'Ayesha Malik',
    'Hassan Ali',
    'Fatima Ahmed',
    'Omar Siddiqui',
    'Zainab Shah',
    'Bilal Hussain',
    'Maryam Raza',
    'Hamza Iqbal',
    'Sara Mahmood',
    'Usman Tariq',
    'Noor Farooq',
  ];
  const depts = [
    'Electrical Engineering',
    'Project Management',
    'Civil Engineering',
    'Grid Connections',
  ];
  const statements = [
    db()
      .prepare('INSERT OR IGNORE INTO employees VALUES (?,?,?,?,?,?,?,?,1)')
      .bind(
        'ADMIN',
        'HMF Administrator',
        'admin@hmf.example',
        'UK',
        'Management',
        'admin',
        hash,
        salt,
      ),
  ];
  for (const [i, name] of names.entries()) {
    const salt = crypto.randomUUID(),
      hash = await passwordHash(password, salt);
    const office = i < 12 ? 'UK' : 'PK',
      id = `HMF-${String(i + 1).padStart(3, '0')}`;
    const email =
      i === 0
        ? 'employee.uk@hmf.example'
        : i === 12
          ? 'employee.pk@hmf.example'
          : `${name.toLowerCase().replace(' ', '.')}@hmf.example`;
    statements.push(
      db()
        .prepare('INSERT OR IGNORE INTO employees VALUES (?,?,?,?,?,?,?,?,1)')
        .bind(id, name, email, office, depts[i % 4], 'employee', hash, salt),
    );
    for (let n = 0; n < 14; n++) {
      const dateObj = new Date(`${dayIn(office)}T12:00:00Z`);
      dateObj.setUTCDate(dateObj.getUTCDate() - n);
      if (n > 0 && [0, 6].includes(dateObj.getUTCDay())) continue;
      if (n === 0 && (i === 0 || i === 12 || i % 7 === 0)) continue;
      const date = dateObj.toISOString().slice(0, 10),
        v = (i + n) % 12;
      const status = v === 3 ? 'absent' : v === 6 || v === 9 ? 'other' : 'present';
      const reason =
        status === 'absent'
          ? 'Approved leave'
          : status === 'other'
            ? v === 6
              ? 'Working remotely'
              : 'Client site visit'
            : '';
      const submitted = new Date(
        `${date}T${office === 'PK' ? '04' : '09'}:${String(3 + (i % 23)).padStart(2, '0')}:00Z`,
      ).toISOString();
      statements.push(
        db()
          .prepare('INSERT OR IGNORE INTO attendance VALUES (?,?,?,?,?,?,?,?)')
          .bind(id, date, status, reason, office, submitted, submitted, 'sample'),
      );
    }
  }
  await db().batch(statements);
}

export async function GET(req: Request) {
  try {
    const owner = await getChatGPTUser();
    if (!owner)
      return json({ error: 'Please sign in to open this private preview.', signIn: true }, 401);
    const ctx = await context(req, owner.userId);
    if (!ctx) return json({ user: null }, 401);
    const { me, people } = ctx;
    const query = new URL(req.url).searchParams,
      action = query.get('action') || 'me';
    if (action === 'me')
      return json({
        user: publicPerson(me),
        today: dayInZone(me.timezone),
        officeDates: await officeDates(),
      });
    if (action === 'mine')
      return json({ today: dayInZone(me.timezone), records: await attendanceRows(me, me) });
    requireValue(team(me), 'Team access is required.', 403);
    if (action === 'report') {
      const start = query.get('start') || '';
      const end = query.get('end') || '';
      dateRange(start, end);
      const targets = new Map(
        people.filter((person) => scope(me, person)).map((person) => [person.id, person]),
      );
      const viewer = { ...me, roles: me.roles.filter((role) => role !== 'hr_admin') };
      const records = await db()
        .prepare(
          'SELECT a.*, d.definition, d.approval FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.date BETWEEN ? AND ? ORDER BY a.date,a.employee_id',
        )
        .bind(start, end)
        .all<Record<string, any>>();
      const rows: unknown[][] = [
        ['Date', 'Employee ID', 'Name', 'Office', 'Status', 'Submitted UTC', 'Source'],
      ];
      for (const raw of records.results) {
        const person = targets.get(raw.employee_id);
        if (!person) continue;
        const record = redactAttendance(viewer, person, raw);
        rows.push([
          raw.date,
          person.id,
          person.name,
          raw.office,
          record.label,
          record.submitted_at,
          record.source,
        ]);
      }
      return new Response(csv(rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="hmf-attendance-${start}-to-${end}.csv"`,
          'Cache-Control': 'no-store',
        },
      });
    }
    if (action === 'history') {
      const target = people.find((p) => p.id === query.get('id'));
      requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
      const permitted = sensitiveAccess(me, target),
        records = await attendanceRows(me, target);
      const audits = (
        await db()
          .prepare(
            'SELECT a.*,e.name AS actor_name FROM audits a LEFT JOIN employees e ON e.id=a.actor_id WHERE a.employee_id=? ORDER BY changed_at DESC LIMIT 30',
          )
          .bind(target.id)
          .all<any>()
      ).results.map((a) =>
        permitted
          ? a
          : {
              ...a,
              reason: 'Attendance updated',
              status: ['present', 'remote', 'client', 'travel', 'training'].includes(a.status)
                ? a.status
                : 'unavailable',
              previous_status: null,
            },
      );
      if (permitted && me.id !== target.id && records.some((r) => r.reason))
        await db().batch([
          audit(
            me.id,
            target.id,
            'privacy.notes_viewed',
            null,
            { recordCount: records.length },
            'Authorized HR history access',
          ),
        ]);
      return json({
        records,
        audits,
        accessEvents: (
          await db()
            .prepare(
              'SELECT id,event,occurred_at,office FROM access_events WHERE employee_id=? ORDER BY occurred_at DESC LIMIT 60',
            )
            .bind(target.id)
            .all()
        ).results,
      });
    }
    if (action === 'dashboard' || action === 'export') {
      const date = query.get('date') || dayInZone(me.timezone),
        office = query.get('office') || 'all',
        config = await settings();
      requireValue(
        validDate(date) && (office === 'all' || config.offices.some((o) => o.code === office)),
        'Invalid date or office.',
      );
      const targets = people.filter(
        (p) => p.id !== 'ADMIN' && scope(me, p) && (office === 'all' || p.office === office),
      );
      const records = (
        await db()
          .prepare(
            'SELECT a.*,d.definition,d.approval FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.date=?',
          )
          .bind(date)
          .all<any>()
      ).results;
      const rows: Array<ReturnType<typeof publicPerson> & Record<string, any>> = [];
      for (const p of targets) {
        const rawRecord = records.find((r) => r.employee_id === p.id);
        if (!p.active && !rawRecord) continue;
        const record = rawRecord
          ? redactAttendance(
              { ...me, roles: me.roles.filter((r) => r !== 'hr_admin') },
              p,
              rawRecord,
            )
          : {
              status: 'pending',
              label: 'No response',
              reason: '',
              submitted_at: null,
              updated_at: null,
              source: null,
              approval: 'not_required',
            };
        rows.push({ ...publicPerson(p), ...record });
      }
      if (action === 'export')
        return new Response(
          csv([
            [
              'Employee ID',
              'Name',
              'Email',
              'Office',
              'Department',
              'Attendance date',
              'Status',
              'Reason',
              'Submitted UTC',
              'Data source',
              'Approval',
            ],
            ...rows.map((r) => [
              r.id,
              r.name,
              r.email,
              r.office,
              r.department,
              date,
              r.label,
              r.reason,
              r.submitted_at,
              r.source || 'No submission',
              r.approval || '',
            ]),
          ]),
          {
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': `attachment; filename="hmf-attendance-${date}-${office}.csv"`,
              'Cache-Control': 'no-store',
            },
          },
        );
      return json({ rows, date, office, officeDates: await officeDates(), refreshedAt: now() });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return failure(e);
  }
}

export async function POST(req: Request) {
  try {
    const owner = await getChatGPTUser();
    if (!owner)
      return json({ error: 'Please sign in to open this private preview.', signIn: true }, 401);
    requireValue(
      req.headers.get('origin') === new URL(req.url).origin,
      'Invalid request origin.',
      403,
    );
    requireValue(
      req.headers.get('content-type')?.includes('application/json'),
      'JSON required.',
      415,
    );
    const raw = await req.text();
    requireValue(raw.length <= 4096, 'Request too large.', 413);
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    if (body.action === 'login') {
      requireValue(
        typeof body.email === 'string' &&
          typeof body.password === 'string' &&
          body.email.length <= 254 &&
          body.password.length <= 128,
        'Enter a valid email and password.',
      );
      await seed();
      const key = owner.userId,
        stamp = Date.now();
      await db()
        .prepare(
          'INSERT INTO login_attempts(key,count,window_start) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN window_start<? THEN 1 ELSE count+1 END,window_start=CASE WHEN window_start<? THEN excluded.window_start ELSE window_start END',
        )
        .bind(key, stamp, stamp - 900000, stamp - 900000)
        .run();
      const attempt = await db()
        .prepare('SELECT count FROM login_attempts WHERE key=?')
        .bind(key)
        .first<{ count: number }>();
      requireValue(
        !attempt || attempt.count <= 20,
        'Too many sign-in attempts. Try again in 15 minutes.',
        429,
      );
      const found = await db()
        .prepare('SELECT * FROM employees WHERE email=? AND active=1')
        .bind(body.email.trim().toLowerCase())
        .first<Account>();
      const hash = await passwordHash(body.password, found?.salt || crypto.randomUUID()),
        person = found ? (await directory()).find((p) => p.id === found.id) : null;
      requireValue(
        found &&
          person &&
          equal(hash, found.password_hash) &&
          person.profile.employmentStatus === 'active' &&
          (!person.profile.endDate || person.profile.endDate >= dayInZone(person.timezone)),
        'Email or password is incorrect. Check your details and try again.',
        401,
      );
      requireValue(
        !body.office ||
          body.office === 'assigned' ||
          (await settings()).offices.some((o) => o.code === body.office),
        'Choose a valid office.',
      );
      requireValue(
        !body.office ||
          body.office === 'assigned' ||
          body.office === person.office ||
          person.roles.includes('system_admin'),
        'Please select the office assigned to your account.',
        403,
      );
      const token = crypto.randomUUID() + crypto.randomUUID();
      await db().batch([
        db().prepare('DELETE FROM login_attempts WHERE key=?').bind(key),
        db().prepare('DELETE FROM sessions WHERE expires_at<?').bind(stamp),
        db()
          .prepare(
            'INSERT INTO sessions(token_hash,employee_id,owner_id,expires_at) VALUES (?,?,?,?)',
          )
          .bind(await digest(token), found.id, owner.userId, stamp + 8 * 3600000),
        db()
          .prepare(
            'INSERT INTO access_events(id,employee_id,event,occurred_at,office) VALUES (?,?,?,?,?)',
          )
          .bind(crypto.randomUUID(), found.id, 'sign_in', now(), found.office),
      ]);
      return json(
        {
          user: publicPerson(person),
          today: dayInZone(person.timezone),
          officeDates: await officeDates(),
        },
        200,
        { 'Set-Cookie': cookie(req, token, 8 * 3600) },
      );
    }
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    if (body.action === 'logout') {
      await db().batch([
        db()
          .prepare('DELETE FROM sessions WHERE token_hash=?')
          .bind(await digest(sessionToken(req))),
        db()
          .prepare(
            'INSERT INTO access_events(id,employee_id,event,occurred_at,office) VALUES (?,?,?,?,?)',
          )
          .bind(crypto.randomUUID(), me.id, 'sign_out', now(), me.office),
      ]);
      return json({ ok: true }, 200, { 'Set-Cookie': cookie(req, '', 0) });
    }
    if (body.action === 'attendance' || body.action === 'correct') {
      const correcting = body.action === 'correct';
      requireValue(!correcting || team(me), 'Team access is required.', 403);
      const target = correcting ? people.find((p) => p.id === String(body.employeeId || '')) : me;
      requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
      requireValue(
        !correcting || target.id !== me.id,
        'Ask another authorized person to correct your attendance.',
        403,
      );
      const date = correcting ? String(body.date || '') : dayInZone(target.timezone);
      requireValue(
        validDate(date) && date <= dayInZone(target.timezone),
        'Choose today or an earlier date.',
      );
      const definition = (await settings()).statuses.find((s) => s.code === body.status);
      requireValue(definition?.enabled, 'Choose an available attendance status.');
      const reason = textValue(body.reason || '', 500),
        note = textValue(body.correctionReason || '', 500);
      requireValue(
        !definition.explanation || !!reason,
        'Please give a short explanation. Do not include medical details.',
      );
      requireValue(!correcting || !!note, 'Please explain this correction for the audit history.');
      const previous = await db()
        .prepare('SELECT * FROM attendance WHERE employee_id=? AND date=?')
        .bind(target.id, date)
        .first<any>();
      const stamp = new Date(
          Math.max(Date.now(), previous ? Date.parse(previous.updated_at) + 1 : 0),
        ).toISOString(),
        approval = definition.approval
          ? correcting && target.id !== me.id
            ? 'approved'
            : 'pending'
          : 'not_required';
      requireValue(
        !(await db()
          .prepare(
            "SELECT id FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?",
          )
          .bind(target.id, date, date)
          .first()),
        'Approved leave must be resolved before changing attendance.',
        409,
      );
      const next = {
        employee_id: target.id,
        date,
        status: definition.code,
        reason,
        office: target.office,
        submitted_at: previous?.submitted_at || stamp,
        updated_at: stamp,
        source: correcting ? 'admin' : 'employee',
        approval,
        definition: { ...definition, timezone: target.timezone },
      };
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT updated_at FROM attendance WHERE employee_id=? AND date=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, previous?.updated_at || ''),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN NOT EXISTS(SELECT 1 FROM leave_requests WHERE employee_id=? AND status='approved' AND start_date<=? AND end_date>=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, date),
        db()
          .prepare(
            'INSERT INTO attendance(employee_id,date,status,reason,office,submitted_at,updated_at,source) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET status=excluded.status,reason=excluded.reason,updated_at=excluded.updated_at,source=excluded.source',
          )
          .bind(
            target.id,
            date,
            definition.code,
            reason,
            target.office,
            stamp,
            stamp,
            correcting ? 'admin' : 'employee',
          ),
        db()
          .prepare(
            'INSERT INTO attendance_details(employee_id,date,definition,approval,decided_by,decided_at,decision_note) VALUES (?,?,?,?,?,?,?) ON CONFLICT(employee_id,date) DO UPDATE SET definition=excluded.definition,approval=excluded.approval,decided_by=excluded.decided_by,decided_at=excluded.decided_at,decision_note=excluded.decision_note',
          )
          .bind(
            target.id,
            date,
            JSON.stringify({ ...definition, timezone: target.timezone }),
            approval,
            approval === 'approved' ? me.id : null,
            approval === 'approved' ? stamp : null,
            approval === 'approved' ? note : null,
          ),
        db()
          .prepare(
            'INSERT INTO audits(id,employee_id,date,actor_id,previous_status,status,reason,changed_at) VALUES (?,?,?,?,?,?,?,?)',
          )
          .bind(
            crypto.randomUUID(),
            target.id,
            date,
            me.id,
            previous?.status || null,
            definition.code,
            correcting ? note : 'Employee submitted attendance',
            stamp,
          ),
        audit(
          me.id,
          target.id,
          correcting ? 'attendance.corrected' : 'attendance.submitted',
          previous,
          next,
          correcting ? note : 'Employee submitted attendance',
        ),
      ]);
      return json({ ok: true, date, status: definition.code, approval, updatedAt: stamp });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return failure(e);
  }
}
```

## File: `app/api/workforce/route.ts`

```
import { databaseConflict } from '../../lib/conflicts';
import { getChatGPTUser } from '../../chatgpt-auth';
import {
  blankProfile,
  csv,
  currentVersions,
  dayInZone,
  effectiveSchedule,
  importColumns,
  InputError,
  parseCsv,
  requireValue,
  roles,
  sameValue,
  textValue,
  validDate,
  validZone,
  validateDays,
  validateProfile,
  weeklyMinutes,
  type Profile,
  type Role,
  type Status,
} from '../../lib/core';
import {
  audit,
  context,
  db,
  directoryGuard,
  employmentAccess,
  manages,
  now,
  passwordHash,
  publicPerson,
  revisionGuard,
  safePerson,
  schedules,
  scope,
  sensitiveAccess,
  settings,
  system,
  team,
  type Person,
} from '../../lib/store';

export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (error: unknown) => {
  if (error instanceof InputError) return json({ error: error.message }, error.status);
  console.error('HMF workforce', error);
  if (databaseConflict(error))
    return json({ error: 'This record changed. Reload it before saving again.' }, 409);
  if (String(error).includes('UNIQUE constraint'))
    return json({ error: 'An employee ID or email already exists. Reload and try again.' }, 409);
  return json({ error: 'The change could not be completed. Please try again.' }, 503);
};
const download = (name: string, rows: unknown[][]) =>
  new Response(csv(rows), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
function targetFor(me: Person, people: Person[], id: string) {
  const target = people.find((p) => p.id === id);
  requireValue(target && scope(me, target), 'Employee not found or outside your access.', 403);
  return target;
}

export async function GET(req: Request) {
  try {
    const owner = await getChatGPTUser();
    requireValue(owner, 'Sign in to open this private demo.', 401);
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    const query = new URL(req.url).searchParams,
      action = query.get('action') || 'config',
      config = await settings();
    if (action === 'config')
      return json({
        ...config,
        user: publicPerson(me),
        people: people
          .filter((p) => scope(me, p))
          .map((p) => ({
            id: p.id,
            name: p.name,
            office: p.office,
            roles: p.roles,
            active: p.active,
          })),
        today: dayInZone(me.timezone),
      });
    if (action === 'directory' || action === 'export') {
      requireValue(team(me), 'Team access is required.', 403);
      const search = (query.get('search') || '').toLowerCase(),
        office = query.get('office') || '',
        status = query.get('status') || '',
        department = query.get('department') || '',
        role = query.get('role') || '';
      const rows = people
        .filter(
          (p) =>
            scope(me, p) &&
            (!office || p.office === office) &&
            (!department || p.department === department) &&
            (!status || p.profile.employmentStatus === status) &&
            (!role || p.roles.includes(role as Role)) &&
            [p.id, p.name, p.email, p.department].some((v) => v.toLowerCase().includes(search)),
        )
        .map((p) => safePerson(me, p));
      if (action === 'export')
        return download('hmf-employee-directory', [
          [
            'Employee ID',
            'Name',
            'Email',
            'Office',
            'Department',
            'Job title',
            'Manager ID',
            'Employment status',
            'Roles',
          ],
          ...rows.map((p) => [
            p.id,
            p.name,
            p.email,
            p.office,
            p.department,
            p.profile.jobTitle,
            p.profile.managerId,
            p.profile.employmentStatus,
            p.roles.join('; '),
          ]),
        ]);
      return json({ people: rows });
    }
    if (action === 'template') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      return download('hmf-employee-import', [importColumns]);
    }
    if (action === 'templates') {
      const versions = await schedules(null);
      return json({ templates: currentVersions(versions), versions });
    }
    const target = targetFor(me, people, query.get('id') || me.id);
    if (action === 'profile')
      return json({
        person: safePerson(me, target),
        canEdit: employmentAccess(me, target),
        canSchedule: team(me) && scope(me, target) && (target.id !== me.id || manages(me)),
        today: dayInZone(target.timezone),
      });
    if (action === 'schedules') {
      const date = query.get('date') || dayInZone(target.timezone);
      requireValue(validDate(date), 'Choose a valid date.');
      const versions = await schedules(target.id);
      return json({
        versions,
        effective: effectiveSchedule(versions, date),
        date,
        timezone: target.timezone,
      });
    }
    if (action === 'audit' || action === 'settingsAudit') {
      const global = action === 'settingsAudit';
      requireValue(!global || system(me), 'System administrator access is required.', 403);
      const cursor = query.get('cursor') || '',
        parts = cursor.split('|');
      requireValue(
        !cursor || (parts.length === 2 && parts[0].length <= 30 && parts[1].length <= 60),
        'Invalid audit cursor.',
      );
      const found = (
        await db()
          .prepare(
            `SELECT a.*,e.name AS actor_name FROM audit_events a LEFT JOIN employees e ON e.id=a.actor_id WHERE ${global ? 'a.employee_id IS NULL' : 'a.employee_id=?'} ${cursor ? 'AND (a.created_at<? OR (a.created_at=? AND a.id<?))' : ''} ORDER BY a.created_at DESC,a.id DESC LIMIT 51`,
          )
          .bind(...(global ? [] : [target.id]), ...(cursor ? [parts[0], parts[0], parts[1]] : []))
          .all<any>()
      ).results;
      const rows = found.slice(0, 50),
        last = rows.at(-1),
        nextCursor = found.length > 50 ? last.created_at + '|' + last.id : null;
      const permitted = sensitiveAccess(me, target),
        full = employmentAccess(me, target) || me.id === target.id;
      if (
        !global &&
        permitted &&
        me.id !== target.id &&
        rows.some((r) => r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
      )
        await db().batch([
          audit(
            me.id,
            target.id,
            'privacy.audit_viewed',
            null,
            { recordCount: rows.length },
            'Authorized HR audit access',
          ),
        ]);
      return json({
        nextCursor,
        events: rows
          .filter(
            (r) =>
              full ||
              ![
                'employee.updated',
                'employee.created',
                'access.updated',
                'account.password_reset',
              ].includes(r.action),
          )
          .map((r) => ({
            ...r,
            before_value:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? null
                : r.before_value,
            after_value:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? null
                : r.after_value,
            reason:
              !permitted && (r.action.startsWith('attendance.') || r.action.startsWith('hours.'))
                ? 'Attendance updated'
                : r.reason,
          })),
      });
    }
    return json({ error: 'Not found.' }, 404);
  } catch (e) {
    return fail(e);
  }
}

type EmployeeInput = {
  id: string;
  name: string;
  email: string;
  office: string;
  department: string;
  profile: Profile;
  roles: Role[];
  officeScope: string[];
  revision: number;
  password?: string;
};
async function employeeInput(
  body: any,
  me: Person,
  people: Person[],
  isImport = false,
): Promise<EmployeeInput> {
  requireValue(body && typeof body === 'object', 'Complete the employee details.');
  const id = textValue(body.id, 60, true);
  requireValue(
    /^[A-Za-z0-9_-]+$/.test(id),
    'Employee IDs may contain letters, numbers, hyphens and underscores.',
  );
  const old = people.find((p) => p.id === id);
  if (old) requireValue(employmentAccess(me, old), 'You cannot manage this employee.', 403);
  else requireValue(manages(me), 'Employee management access is required.', 403);
  const name = textValue(body.name, 120, true),
    email = textValue(body.email, 254, true).toLowerCase(),
    office = textValue(body.office, 40, true),
    department = textValue(body.department, 120, true),
    profile = validateProfile(body.profile);
  requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Enter a valid company email.');
  requireValue(
    !people.some((p) => p.id !== id && p.email.toLowerCase() === email),
    'This company email is already assigned to another employee.',
  );
  const config = await settings();
  requireValue(
    config.offices.some((o) => o.code === office && (o.active || old?.office === office)),
    'Choose an active office.',
  );
  requireValue(
    config.departments.some(
      (d) => d.name === department && (d.active || old?.department === department),
    ),
    'Choose an active department.',
  );
  requireValue(
    system(me) || me.officeScope.includes(office),
    'This office is outside your access.',
    403,
  );
  if (profile.managerId) {
    const manager = people.find((p) => p.id === profile.managerId);
    requireValue(
      manager && manager.active && manager.roles.includes('manager') && manager.id !== id,
      'Choose an active manager other than this employee.',
    );
    let parent = manager;
    const visited = new Set([id]);
    while (parent) {
      requireValue(!visited.has(parent.id), 'Manager assignments cannot form a loop.');
      visited.add(parent.id);
      parent = people.find((p) => p.id === parent.profile.managerId)!;
    }
  }
  let grantRoles: Role[] = old?.roles || ['employee'],
    officeScope: string[] = old?.officeScope || [];
  if (body.roles !== undefined || body.officeScope !== undefined) {
    requireValue(system(me), 'Only a system administrator can change access.', 403);
    requireValue(
      Array.isArray(body.roles) &&
        body.roles.length > 0 &&
        body.roles.every((r: Role) => roles.includes(r)),
      'Choose valid access roles.',
    );
    grantRoles = Array.from(new Set(['employee', ...body.roles])) as Role[];
    requireValue(
      Array.isArray(body.officeScope) &&
        body.officeScope.every((o: string) => config.offices.some((x) => x.code === o)),
      'Choose valid authorized offices.',
    );
    officeScope = Array.from(new Set(body.officeScope));
    requireValue(
      !grantRoles.includes('hr_admin') || officeScope.length > 0,
      'Assign at least one office to HR access.',
    );
  }
  if (
    old?.roles.includes('system_admin') &&
    (!grantRoles.includes('system_admin') ||
      profile.employmentStatus !== 'active' ||
      (profile.endDate && profile.endDate < dayInZone(old.timezone)))
  )
    requireValue(
      people.some(
        (p) =>
          p.id !== id &&
          p.active &&
          p.roles.includes('system_admin') &&
          (!p.profile.endDate || p.profile.endDate >= dayInZone(p.timezone)),
      ),
      'Keep at least one active system administrator.',
    );
  requireValue(
    id !== me.id ||
      (profile.employmentStatus === 'active' &&
        grantRoles.includes('system_admin') === me.roles.includes('system_admin')),
    'Ask another system administrator to change your own account access.',
  );
  requireValue(
    !profile.endDate || id !== me.id || profile.endDate >= dayInZone(me.timezone),
    'You cannot end your own access retrospectively.',
  );
  if (profile.employmentStatus !== 'active' || !grantRoles.includes('manager'))
    requireValue(
      !people.some((p) => p.id !== id && p.active && p.profile.managerId === id),
      'Reassign this manager’s active reports first.',
    );
  let password: string | undefined;
  if (body.password) {
    requireValue(
      system(me) && !isImport,
      'Only a system administrator can set demo passwords.',
      403,
    );
    password = textValue(body.password, 128, true);
    requireValue(password.length >= 12, 'Use a demo password of at least 12 characters.');
  }
  requireValue(
    Number.isInteger(body.revision) && body.revision === (old?.revision || 0),
    'This profile changed. Reload it before saving.',
    409,
  );
  return {
    id,
    name,
    email,
    office,
    department,
    profile,
    roles: grantRoles,
    officeScope,
    revision: body.revision,
    password,
  };
}
async function employeeStatements(
  input: EmployeeInput,
  me: Person,
  people: Person[],
  reason: string,
  source = 'portal',
) {
  const old = people.find((p) => p.id === input.id),
    stamp = now(),
    statements = [revisionGuard(input.id, input.revision)];
  if (!old) {
    const salt = crypto.randomUUID(),
      hash = input.password ? await passwordHash(input.password, salt) : '!unset';
    statements.push(
      db()
        .prepare(
          'INSERT INTO employees(id,name,email,office,department,role,password_hash,salt,active) VALUES (?,?,?,?,?,?,?,?,?)',
        )
        .bind(
          input.id,
          input.name,
          input.email,
          input.office,
          input.department,
          'employee',
          hash,
          salt,
          input.profile.employmentStatus === 'active' ? 1 : 0,
        ),
    );
  } else
    statements.push(
      db()
        .prepare('UPDATE employees SET name=?,email=?,office=?,department=?,active=? WHERE id=?')
        .bind(
          input.name,
          input.email,
          input.office,
          input.department,
          input.profile.employmentStatus === 'active' ? 1 : 0,
          input.id,
        ),
    );
  statements.push(
    db()
      .prepare(
        'INSERT INTO employee_profiles(employee_id,data,revision,created_at,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(employee_id) DO UPDATE SET data=excluded.data,revision=employee_profiles.revision+1,updated_at=excluded.updated_at',
      )
      .bind(input.id, JSON.stringify(input.profile), 1, old ? old.createdAt : stamp, stamp),
  );
  statements.push(
    db()
      .prepare(
        'INSERT INTO access_grants(employee_id,roles,offices) VALUES (?,?,?) ON CONFLICT(employee_id) DO UPDATE SET roles=excluded.roles,offices=excluded.offices',
      )
      .bind(input.id, JSON.stringify(input.roles), JSON.stringify(input.officeScope)),
  );
  if (old && input.password) {
    const salt = crypto.randomUUID();
    statements.push(
      db()
        .prepare('UPDATE employees SET password_hash=?,salt=? WHERE id=?')
        .bind(await passwordHash(input.password, salt), salt, input.id),
    );
    statements.push(
      audit(me.id, input.id, 'account.password_reset', null, { reset: true }, reason, source),
    );
  }
  if (
    old &&
    (input.password ||
      input.email !== old.email ||
      input.profile.employmentStatus !== 'active' ||
      JSON.stringify(old.roles) !== JSON.stringify(input.roles) ||
      JSON.stringify(old.officeScope) !== JSON.stringify(input.officeScope))
  )
    statements.push(db().prepare('DELETE FROM sessions WHERE employee_id=?').bind(input.id));
  const { password: _secret, ...safe } = input;
  statements.push(
    audit(
      me.id,
      input.id,
      old ? 'employee.updated' : 'employee.created',
      old ? { ...old } : null,
      safe,
      reason,
      source,
    ),
  );
  if (
    old &&
    (JSON.stringify(old.roles) !== JSON.stringify(input.roles) ||
      JSON.stringify(old.officeScope) !== JSON.stringify(input.officeScope))
  )
    statements.push(
      audit(
        me.id,
        input.id,
        'access.updated',
        { roles: old.roles, offices: old.officeScope },
        { roles: input.roles, offices: input.officeScope },
        reason,
        source,
      ),
    );
  return statements;
}

export async function POST(req: Request) {
  try {
    const owner = await getChatGPTUser();
    requireValue(owner, 'Sign in to open this private demo.', 401);
    requireValue(
      req.headers.get('origin') === new URL(req.url).origin,
      'Invalid request origin.',
      403,
    );
    requireValue(
      req.headers.get('content-type')?.includes('application/json'),
      'JSON required.',
      415,
    );
    const raw = await req.text();
    requireValue(raw.length <= 240000, 'This request is too large.', 413);
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new InputError('Invalid request.');
    }
    requireValue(body && typeof body === 'object', 'Invalid request.');
    const ctx = await context(req, owner.userId);
    requireValue(ctx, 'Your session has ended. Please sign in again.', 401);
    const { me, people } = ctx;
    if (body.action === 'employee') {
      const reason = textValue(body.reason, 500, true),
        input = await employeeInput(body.employee, me, people);
      await db().batch([
        directoryGuard(people),
        ...(await employeeStatements(input, me, people, reason)),
      ]);
      return json({ ok: true, id: input.id });
    }
    if (body.action === 'schedule') {
      const target = body.employeeId ? targetFor(me, people, String(body.employeeId)) : null;
      requireValue(
        team(me) && (!target || (scope(me, target) && (target.id !== me.id || manages(me)))),
        'You cannot manage this schedule.',
        403,
      );
      const reason = textValue(body.reason, 500, true),
        name = textValue(body.name, 120, true),
        days = validateDays(body.days),
        kind = textValue(body.kind, 20, true);
      requireValue(
        target ? ['base', 'temporary'].includes(kind) : kind === 'template',
        'Choose a valid schedule type.',
      );
      const startDate = target ? textValue(body.startDate, 10, true) : null,
        endDate = target ? textValue(body.endDate || '', 10) : null;
      requireValue(
        !target ||
          (validDate(startDate!) && (!endDate || (validDate(endDate) && endDate >= startDate!))),
        'Choose valid effective dates.',
      );
      requireValue(kind !== 'temporary' || !!endDate, 'Temporary schedules need an end date.');
      const versions = await schedules(target?.id || null),
        current = currentVersions(versions);
      const prior = body.seriesId ? current.find((s) => s.series_id === body.seriesId) : null;
      requireValue(
        target || !prior || manages(me) || prior.created_by === me.id,
        'You can revise only your own templates.',
        403,
      );
      requireValue(!body.seriesId || prior, 'This schedule version was not found.');
      requireValue(
        !prior ||
          (prior.kind === kind &&
            prior.start_date === (startDate || null) &&
            prior.end_date === (endDate || null)),
        'Keep the original period when revising a schedule; create a new version period to change effective dates.',
      );
      requireValue(
        !prior || body.previousId === prior.id,
        'This schedule changed. Reload before saving.',
        409,
      );
      if (kind === 'temporary')
        requireValue(
          !current.some(
            (s) =>
              s.kind === 'temporary' &&
              s.series_id !== prior?.series_id &&
              s.start_date! <= endDate! &&
              s.end_date! >= startDate!,
          ),
          'This temporary schedule overlaps another. Revise the existing period instead.',
        );
      if (kind === 'base')
        requireValue(
          !current.some(
            (s) =>
              s.kind === 'base' && s.series_id !== prior?.series_id && s.start_date === startDate,
          ),
          'A normal schedule already starts on this date. Revise that version instead.',
        );
      if (body.templateId)
        requireValue(
          (await schedules(null)).some((s) => s.id === body.templateId),
          'Template version not found.',
        );
      const id = crypto.randomUUID(),
        series = prior?.series_id || id,
        stamp = new Date(
          Math.max(Date.now(), versions[0] ? Date.parse(versions[0].created_at) + 1 : 0),
        ).toISOString();
      const saved = {
        id,
        series_id: series,
        employee_id: target?.id || null,
        name,
        kind,
        start_date: startDate || null,
        end_date: endDate || null,
        days,
        template_id: body.templateId || null,
        reason,
        created_by: me.id,
        created_at: stamp,
      };
      // The guard is inside D1's atomic batch, preventing concurrent edits from silently winning.
      const guard = db()
        .prepare(
          "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT id FROM schedule_versions WHERE series_id=? ORDER BY created_at DESC,id DESC LIMIT 1),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
        )
        .bind(series, prior?.id || '');
      // Serialize all assignments for an employee (including creation of new periods).
      const latest = versions[0]?.id || '';
      const assignmentGuard = db()
        .prepare(
          `INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT id FROM schedule_versions WHERE ${target ? 'employee_id=?' : 'employee_id IS NULL'} ORDER BY created_at DESC,id DESC LIMIT 1),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid`,
        )
        .bind(...(target ? [target.id] : []), latest);
      await db().batch([
        guard,
        assignmentGuard,
        db()
          .prepare(
            'INSERT INTO schedule_versions(id,series_id,employee_id,name,kind,start_date,end_date,days,template_id,reason,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          )
          .bind(
            id,
            series,
            target?.id || null,
            name,
            kind,
            startDate || null,
            endDate || null,
            JSON.stringify(days),
            body.templateId || null,
            reason,
            me.id,
            stamp,
          ),
        audit(me.id, target?.id || null, 'schedule.saved', prior || null, saved, reason),
      ]);
      return json({ ok: true, schedule: saved, weeklyMinutes: weeklyMinutes(days) });
    }
    if (body.action === 'setting') {
      requireValue(system(me), 'System administrator access is required.', 403);
      const reason = textValue(body.reason, 500, true),
        kind = textValue(body.kind, 20, true),
        value = body.value;
      requireValue(value && typeof value === 'object', 'Complete the setting.');
      const code = textValue(value.code, 120, true);
      let data: unknown;
      const config = await settings();
      if (kind === 'office') {
        requireValue(/^[A-Z0-9_-]{2,40}$/.test(code), 'Use a short uppercase office code.');
        const timezone = textValue(value.timezone, 80, true);
        requireValue(validZone(timezone), 'Enter a valid time zone.');
        const country = textValue(value.country, 2, true);
        requireValue(/^[A-Z]{2}$/.test(country), 'Use a two-letter country code.');
        requireValue(typeof value.active === 'boolean', 'Choose whether the office is active.');
        data = {
          code,
          name: textValue(value.name, 120, true),
          timezone,
          country,
          active: value.active,
        };
      } else if (kind === 'department') {
        requireValue(typeof value.active === 'boolean', 'Choose whether the department is active.');
        data = { code, name: code, active: value.active };
      } else if (kind === 'status') {
        requireValue(
          /^[a-z][a-z0-9_]{1,39}$/.test(code) && !['pending', 'unavailable'].includes(code),
          'Use a unique lowercase status code. No response is reserved.',
        );
        requireValue(
          ['working', 'leave', 'absence', 'nonworking', 'unconfigured'].includes(value.category),
          'Choose how this status is counted.',
        );
        for (const key of ['explanation', 'approval', 'sensitive', 'enabled'])
          requireValue(typeof value[key] === 'boolean', 'Complete all status options.');
        requireValue(
          !['absent', 'other', 'sick_leave'].includes(code) || value.sensitive,
          'Legacy absence and sickness notes must remain private.',
        );
        requireValue(
          !value.enabled ||
            (value.category !== 'leave' && !['annual_leave', 'unpaid_leave'].includes(code)),
          'Leave booking opens in Phase 3. Keep leave statuses disabled for now.',
        );
        data = {
          code,
          label: textValue(value.label, 80, true),
          category: value.category,
          explanation: value.explanation,
          approval: value.approval,
          sensitive: value.sensitive,
          enabled: value.enabled,
        };
      } else throw new InputError('Unknown setting.');
      const old =
        (kind === 'office'
          ? config.offices
          : kind === 'department'
            ? config.departments
            : config.statuses
        ).find((x) => x.code === code) || null;
      const existing = await db()
        .prepare('SELECT data FROM directory_settings WHERE kind=? AND code=?')
        .bind(kind, code)
        .first<{ data: string }>();
      requireValue(
        sameValue(body.previous ?? null, old),
        'This setting changed. Reload before saving.',
        409,
      );
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT data FROM directory_settings WHERE kind=? AND code=?),'')=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(kind, code, existing?.data || ''),
        db()
          .prepare(
            'INSERT INTO directory_settings(kind,code,data,updated_at) VALUES (?,?,?,?) ON CONFLICT(kind,code) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at',
          )
          .bind(kind, code, JSON.stringify(data), now()),
        audit(me.id, null, 'setting.' + kind, old, data, reason),
      ]);
      return json({ ok: true });
    }
    if (body.action === 'importPreview') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      const rows = parseCsv(textValue(body.csv, 200000, true)),
        valid: EmployeeInput[] = [],
        errors: { row: number; message: string }[] = [];
      const ids = new Set<string>(),
        emails = new Set<string>();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        try {
          requireValue(
            !ids.has(row.id) && !emails.has(row.email.toLowerCase()),
            'Duplicate ID or email in this file.',
          );
          ids.add(row.id);
          emails.add(row.email.toLowerCase());
          requireValue(
            !people.some(
              (p) => p.id === row.id || p.email.toLowerCase() === row.email.toLowerCase(),
            ),
            'An employee with this ID or email already exists. Imports add new people only.',
          );
          const p = {
            ...blankProfile,
            jobTitle: row.jobTitle || '',
            managerId: row.managerId || '',
            employmentType: row.employmentType || '',
            startDate: row.startDate || '',
            weeklyMinutes: row.weeklyHours ? Number(row.weeklyHours) * 60 : null,
            timezone: row.timezone || '',
          };
          valid.push(await employeeInput({ ...row, profile: p, revision: 0 }, me, people, true));
        } catch (e) {
          errors.push({ row: i + 2, message: e instanceof Error ? e.message : 'Invalid row.' });
        }
      }
      if (errors.length) return json({ errors, rows: valid, total: rows.length, previewId: null });
      const id = crypto.randomUUID();
      await db().batch([
        db().prepare('DELETE FROM import_previews WHERE expires_at<?').bind(Date.now()),
        db()
          .prepare(
            'INSERT INTO import_previews(id,actor_id,rows,expires_at,used_at) VALUES (?,?,?,?,NULL)',
          )
          .bind(id, me.id, JSON.stringify(valid), Date.now() + 15 * 60 * 1000),
      ]);
      return json({ errors: [], rows: valid, total: rows.length, previewId: id });
    }
    if (body.action === 'importConfirm') {
      requireValue(manages(me), 'Employee management access is required.', 403);
      const reason = textValue(body.reason, 500, true),
        id = textValue(body.previewId, 80, true);
      const preview = await db()
        .prepare(
          'SELECT * FROM import_previews WHERE id=? AND actor_id=? AND expires_at>? AND used_at IS NULL',
        )
        .bind(id, me.id, Date.now())
        .first<{ rows: string }>();
      requireValue(
        preview,
        'This import preview expired or was used. Preview the file again.',
        409,
      );
      const inputs = JSON.parse(preview.rows) as EmployeeInput[];
      const statements = [
        directoryGuard(people),
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM import_previews WHERE id=? AND actor_id=? AND used_at IS NULL AND expires_at>?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(id, me.id, Date.now()),
      ];
      for (const input of inputs) {
        requireValue(
          !people.some((p) => p.id === input.id),
          'An employee in this import already exists. Preview it again.',
          409,
        );
        const { roles: _roles, officeScope: _scope, ...plain } = input;
        const revalidated = await employeeInput(plain, me, people, true);
        statements.push(
          ...(await employeeStatements(revalidated, me, people, reason, 'csv-import')),
        );
      }
      statements.push(
        db().prepare('UPDATE import_previews SET used_at=? WHERE id=?').bind(now(), id),
      );
      await db().batch(statements);
      return json({ ok: true, count: inputs.length });
    }
    if (body.action === 'attendanceDecision') {
      const target = targetFor(me, people, textValue(body.employeeId, 60, true));
      requireValue(target.id !== me.id && team(me), 'You cannot approve your own attendance.', 403);
      const date = textValue(body.date, 10, true),
        decision = textValue(body.decision, 20, true),
        reason = textValue(body.reason, 500, true);
      requireValue(
        validDate(date) && ['approved', 'declined'].includes(decision),
        'Choose a valid decision and date.',
      );
      const previous = await db()
        .prepare(
          'SELECT d.*,a.updated_at FROM attendance_details d JOIN attendance a ON a.employee_id=d.employee_id AND a.date=d.date WHERE d.employee_id=? AND d.date=?',
        )
        .bind(target.id, date)
        .first<any>();
      requireValue(
        previous?.approval === 'pending' && previous.updated_at === body.expectedUpdatedAt,
        'This submission changed or no longer needs a decision. Refresh before deciding.',
        409,
      );
      const stamp = now();
      await db().batch([
        db()
          .prepare(
            "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN EXISTS(SELECT 1 FROM attendance_details d JOIN attendance a ON a.employee_id=d.employee_id AND a.date=d.date WHERE d.employee_id=? AND d.date=? AND d.approval='pending' AND a.updated_at=?) THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
          )
          .bind(target.id, date, body.expectedUpdatedAt),
        db()
          .prepare(
            'UPDATE attendance_details SET approval=?,decided_by=?,decided_at=?,decision_note=? WHERE employee_id=? AND date=?',
          )
          .bind(decision, me.id, stamp, reason, target.id, date),
        audit(me.id, target.id, 'attendance.decision', previous, { date, decision }, reason),
      ]);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (e) {
    return fail(e);
  }
}
```

## File: `app/chatgpt-auth.ts`

```
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type ChatGPTUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

const USER_ID_HEADER = 'oai-authenticated-user-id';
const USER_EMAIL_HEADER = 'oai-authenticated-user-email';
const USER_FULL_NAME_HEADER = 'oai-authenticated-user-full-name';
const USER_FULL_NAME_ENCODING_HEADER = 'oai-authenticated-user-full-name-encoding';
const PERCENT_ENCODED_UTF8 = 'percent-encoded-utf-8';
const SIGN_IN_PATH = '/signin-with-chatgpt';
const SIGN_OUT_PATH = '/signout-with-chatgpt';
const CALLBACK_PATH = '/callback';

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get(USER_ID_HEADER);
  const email = requestHeaders.get(USER_EMAIL_HEADER);
  if (!userId || !email) return null;

  const encodedFullName = requestHeaders.get(USER_FULL_NAME_HEADER);
  const fullName =
    encodedFullName && requestHeaders.get(USER_FULL_NAME_ENCODING_HEADER) === PERCENT_ENCODED_UTF8
      ? safeDecodeURIComponent(encodedFullName)
      : null;

  return {
    userId,
    displayName: fullName ?? email,
    email,
    fullName,
  };
}

export async function requireChatGPTUser(returnTo: string): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;

  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  const safeReturnTo = safeRelativeReturnPath(returnTo);
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeReturnTo)}`;
}

export function chatGPTSignOutPath(returnTo = '/'): string {
  const safeReturnTo = safeRelativeReturnPath(returnTo);
  return `${SIGN_OUT_PATH}?return_to=${encodeURIComponent(safeReturnTo)}`;
}

function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//')) return '/';

  let url: URL;
  try {
    url = new URL(value, 'https://app.local');
  } catch {
    return '/';
  }
  if (url.origin !== 'https://app.local') return '/';
  if (isReservedAuthPath(url.pathname)) return '/';

  return `${url.pathname}${url.search}${url.hash}`;
}

function isReservedAuthPath(pathname: string): boolean {
  return pathname === SIGN_IN_PATH || pathname === SIGN_OUT_PATH || pathname === CALLBACK_PATH;
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
```

## File: `app/employee-editor.tsx`

```
'use client';
import { useState } from 'react';
import { blankProfile, roles, type Profile, type Role } from './lib/core';
import type { Person } from './lib/store';
import { workforce, useWorkforce, roleLabel } from './workforce-context';
import { Notice, Field } from './workforce-fields';
import { FocusForm } from './focus-form';
export function EmployeeEditor({
  person,
  close,
  saved,
}: {
  person?: Person;
  close: () => void;
  saved: () => Promise<void>;
}) {
  const { config } = useWorkforce(),
    [form, setForm] = useState({
      id: person?.id || '',
      name: person?.name || '',
      email: person?.email || '',
      office: person?.office || '',
      department: person?.department || '',
      profile: { ...blankProfile, ...person?.profile },
      roles: person?.roles || (['employee'] as Role[]),
      officeScope: person?.officeScope || [],
      revision: person?.revision || 0,
      password: '',
    }),
    [reason, setReason] = useState(''),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));
  const profile = (key: keyof Profile, value: unknown) =>
    setForm((f) => ({ ...f, profile: { ...f.profile, [key]: value } }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { roles: _r, officeScope: _s, ...basic } = form;
      await workforce('employee', { employee: config.user.canConfigure ? form : basic, reason });
      await saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="text-button" onClick={close}>
        ← Cancel and go back
      </button>
      <div className="page-heading">
        <h1>{person ? 'Edit employee' : 'Add employee'}</h1>
      </div>
      <FocusForm className="employment-form" onSubmit={submit}>
        <fieldset>
          <legend>Employee details</legend>
          <div className="form-grid">
            <Field label="Employee ID">
              <input
                required
                maxLength={60}
                pattern="[A-Za-z0-9_-]+"
                disabled={!!person}
                value={form.id}
                onChange={(e) => set('id', e.target.value)}
              />
            </Field>
            <Field label="Full name">
              <input
                required
                maxLength={120}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </Field>
            <Field label="Company email">
              <input
                required
                type="email"
                maxLength={254}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </Field>
            <Field label="Telephone (optional)">
              <input
                type="tel"
                maxLength={40}
                value={form.profile.telephone}
                onChange={(e) => profile('telephone', e.target.value)}
              />
            </Field>
            <Field label="Job title">
              <input
                maxLength={120}
                value={form.profile.jobTitle}
                onChange={(e) => profile('jobTitle', e.target.value)}
              />
            </Field>
            <Field label="Department">
              <select
                required
                value={form.department}
                onChange={(e) => set('department', e.target.value)}
              >
                <option value="">Choose department</option>
                {config.departments
                  .filter((d) => d.active || d.name === form.department)
                  .map((d) => (
                    <option key={d.code}>{d.name}</option>
                  ))}
              </select>
            </Field>
            <Field label="Office">
              <select required value={form.office} onChange={(e) => set('office', e.target.value)}>
                <option value="">Choose office</option>
                {config.offices
                  .filter((o) => o.active || o.code === form.office)
                  .map((o) => (
                    <option key={o.code} value={o.code}>
                      {o.name}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Manager">
              <select
                value={form.profile.managerId}
                onChange={(e) => profile('managerId', e.target.value)}
              >
                <option value="">Not assigned</option>
                {config.people
                  .filter((p) => p.active && p.id !== form.id && p.roles.includes('manager'))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </Field>
          </div>
        </fieldset>
        <fieldset>
          <legend>Employment terms</legend>
          <div className="form-grid">
            <Field label="Employment status">
              <select
                value={form.profile.employmentStatus}
                onChange={(e) => profile('employmentStatus', e.target.value)}
              >
                {[
                  ['active', 'Active'],
                  ['inactive', 'Inactive'],
                  ['suspended', 'Suspended'],
                  ['former', 'Former employee'],
                ].map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Employment type">
              <select
                value={form.profile.employmentType}
                onChange={(e) => profile('employmentType', e.target.value)}
              >
                <option value="">Not configured</option>
                {['full-time', 'part-time', 'temporary', 'contractor'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Employment start date">
              <input
                type="date"
                value={form.profile.startDate}
                onChange={(e) => profile('startDate', e.target.value)}
              />
            </Field>
            <Field label="Final employment date">
              <input
                type="date"
                min={form.profile.startDate || undefined}
                value={form.profile.endDate}
                onChange={(e) => profile('endDate', e.target.value)}
              />
            </Field>
            <Field label="Contracted hours per week">
              <input
                type="number"
                min="0"
                max="168"
                step="0.25"
                value={form.profile.weeklyMinutes === null ? '' : form.profile.weeklyMinutes / 60}
                onChange={(e) =>
                  profile(
                    'weeklyMinutes',
                    e.target.value === '' ? null : Number(e.target.value) * 60,
                  )
                }
              />
            </Field>
            <Field label="Time zone">
              <input
                placeholder={
                  'Use office time zone' +
                  (config.offices.find((o) => o.code === form.office)?.timezone
                    ? ' (' + config.offices.find((o) => o.code === form.office)?.timezone + ')'
                    : '')
                }
                value={form.profile.timezone}
                onChange={(e) => profile('timezone', e.target.value)}
                list="hmf-timezones"
              />
              <datalist id="hmf-timezones">
                <option>Europe/London</option>
                <option>Asia/Karachi</option>
                {config.offices.map((o) => (
                  <option key={o.code}>{o.timezone}</option>
                ))}
              </datalist>
            </Field>
          </div>
          <p className="muted">
            Inactive, suspended and former accounts cannot sign in. Existing history is retained. A
            final date ends access after that date in the employee’s time zone.
          </p>
        </fieldset>
        <details className="workforce-disclosure">
          <summary>Holiday allowance</summary>
          <div className="form-grid">
            <Field label="Allowance unit">
              <select
                value={form.profile.holidayUnit}
                onChange={(e) => profile('holidayUnit', e.target.value)}
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
              </select>
            </Field>
            <Field label="Annual allowance">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.25"
                value={form.profile.holidayAllowance ?? ''}
                onChange={(e) =>
                  profile('holidayAllowance', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </Field>
            <Field label="Carried forward">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.25"
                value={form.profile.carriedForward ?? ''}
                onChange={(e) =>
                  profile('carriedForward', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </Field>
          </div>
          <p className="muted">
            Enter HMF’s agreed allowance, or leave blank. Configured allowances are used by Leave.
            Accrual is not enabled.
          </p>
        </details>
        {config.user.canConfigure && (
          <details className="workforce-disclosure">
            <summary>Account access and demo password</summary>
            <div className="check-list">
              {roles.map((r) => (
                <label className="check-label" key={r}>
                  <input
                    type="checkbox"
                    checked={form.roles.includes(r)}
                    disabled={r === 'employee'}
                    onChange={(e) =>
                      set(
                        'roles',
                        e.target.checked ? [...form.roles, r] : form.roles.filter((x) => x !== r),
                      )
                    }
                  />
                  {roleLabel[r]}
                </label>
              ))}
            </div>
            {form.roles.includes('hr_admin') && (
              <fieldset>
                <legend>Offices authorized for HR access</legend>
                {config.offices.map((o) => (
                  <label className="check-label" key={o.code}>
                    <input
                      type="checkbox"
                      checked={form.officeScope.includes(o.code)}
                      onChange={(e) =>
                        set(
                          'officeScope',
                          e.target.checked
                            ? [...form.officeScope, o.code]
                            : form.officeScope.filter((c) => c !== o.code),
                        )
                      }
                    />
                    {o.name}
                  </label>
                ))}
              </fieldset>
            )}
            <Field
              label={person ? 'Reset demo password (optional)' : 'Initial demo password (optional)'}
            >
              <input
                type="password"
                autoComplete="new-password"
                minLength={12}
                maxLength={128}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </Field>
            <p className="muted">
              Use fictional test accounts here. A new account without a password cannot sign in
              until a system administrator sets one. Microsoft sign-in is a later phase.
            </p>
          </details>
        )}
        <Field label="Reason for this change">
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Saved in the employee’s audit history."
          />
        </Field>
        <Notice error={error} />
        <div className="form-actions">
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : person ? 'Save employee' : 'Create employee'}
          </button>
          <button type="button" className="secondary" onClick={close} disabled={busy}>
            Cancel
          </button>
        </div>
      </FocusForm>
    </>
  );
}
```

## File: `app/focus-form.tsx`

```
'use client';
import { useEffect, useRef, type ComponentProps } from 'react';

/** Moves keyboard focus into an opened editor and restores it to its trigger. */
export function FocusForm({
  restoreFocus,
  ...props
}: ComponentProps<'form'> & { restoreFocus?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ref.current
      ?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled)',
      )
      ?.focus();
    return () => {
      queueMicrotask(() => {
        const replacement = restoreFocus ? document.querySelector<HTMLElement>(restoreFocus) : null;
        if (replacement) replacement.focus();
        else if (trigger?.isConnected) trigger.focus();
      });
    };
  }, [restoreFocus]);
  return <form {...props} ref={ref} />;
}
```

## File: `app/globals.css`

```
@import 'tailwindcss';

/* HMF: restrained blue structure, a red brand rule, and a readable paper ledger. */
:root {
  --navy: #075da8;
  --navy-deep: #102b45;
  --navy-hover: #064981;
  --red: #d63e39;
  --ink: #13283b;
  --muted: #485d70;
  --line: #cedbe6;
  --line-strong: #6b8499;
  --canvas: #edf4fa;
  --surface: #ffffff;
  --subtle: #eef5fb;
  --selected: #dceeff;
  --on-dark: #ffffff;
  --on-dark-muted: #c9dfef;
  --focus: #1171bc;
  --nav-indicator: #6dcaff;
  --page-wash: radial-gradient(ellipse 62rem 26rem at 8% 0%, rgb(7 93 168 / 9%), transparent);
  --present: #075b41;
  --present-bg: #d9f4e8;
  --absent: #922b32;
  --absent-bg: #ffe5e7;
  --other: #164f8c;
  --other-bg: #dceeff;
  --pending: #704300;
  --pending-bg: #ffebbf;
  --backdrop: #10283980;
  --shadow: #142b3d24;
  --radius: 4px;
  --s1: 4px;
  --s2: 8px;
  --s3: 12px;
  --s4: 16px;
  --s6: 24px;
  --s8: 32px;
  --s10: 40px;
  --s12: 48px;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  color: var(--ink);
  background: var(--canvas);
  font:
    14px/1.5 Arial,
    Helvetica,
    sans-serif;
  -webkit-font-smoothing: antialiased;
}
button,
input,
select,
textarea {
  font: inherit;
}
button {
  cursor: pointer;
  color: inherit;
  border: 0;
  transition:
    background-color 120ms ease,
    border-color 120ms ease;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
button:focus-visible,
a:focus-visible,
summary:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
h1,
h2,
h3,
p {
  margin: 0;
}
h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1.25;
}
h1 {
  font-size: clamp(26px, 2.4vw, 34px);
  letter-spacing: -0.8px;
}
h2 {
  font-size: 20px;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 16px;
}
p {
  line-height: 1.6;
}
small {
  font-size: 12px;
}
strong {
  font-weight: 600;
}
.muted {
  color: var(--muted);
}
.eyebrow {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: var(--s3);
}
.logo {
  display: block;
  width: 152px;
  height: auto;
}
.primary,
.secondary {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s2);
  padding: 10px 16px;
  border-radius: var(--radius);
  font-weight: 600;
  white-space: nowrap;
}
.primary {
  color: var(--on-dark);
  background: var(--navy);
  border: 1px solid var(--navy);
}
.primary:hover {
  background: var(--navy-hover);
}
.secondary {
  background: var(--surface);
  border: 1px solid var(--line-strong);
  color: var(--navy);
}
.secondary:hover {
  background: var(--subtle);
}
.icon-button {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  color: var(--muted);
  border-radius: var(--radius);
}
.icon-button:hover {
  background: var(--selected);
  color: var(--navy);
}
.error,
.success {
  padding: var(--s3) var(--s4);
  border-radius: var(--radius);
  margin: var(--s4) 0;
  border-left: 3px solid currentColor;
  font-size: 14px;
}
.error {
  background: var(--absent-bg);
  color: var(--absent);
}
.error button {
  background: transparent;
  text-decoration: underline;
  margin-left: var(--s3);
  min-height: 36px;
}
.success {
  background: var(--present-bg);
  color: var(--present);
  display: flex;
  align-items: center;
  gap: var(--s3);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.skip-link {
  clip-path: inset(100%);
  position: fixed;
  left: 16px;
  top: -80px;
  z-index: 100;
  padding: 12px 20px;
  background: var(--surface);
  color: var(--navy);
}
.skip-link:focus {
  clip-path: none;
  top: 12px;
}
.spinner {
  width: 24px;
  height: 24px;
  display: inline-block;
  border: 2px solid var(--line);
  border-top-color: var(--navy);
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}
.rotating {
  animation: spin 800ms linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.loading-screen {
  min-height: 100vh;
  background: var(--navy);
  color: var(--on-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--s6);
}
.loading-screen .spinner {
  border-top-color: var(--on-dark);
}
.demo-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--s2);
  font-size: 12px;
  font-weight: 400;
  color: var(--muted);
  white-space: nowrap;
}
.demo-tag::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--red);
}

/* Sign-in: a company introduction, separated from the working form. */
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(360px, 44%) 1fr;
  background: var(--surface);
}
.login-story {
  background: var(--navy-deep);
  color: var(--on-dark);
  display: flex;
  flex-direction: column;
  padding: var(--s12);
  border-top: 4px solid var(--red);
}
.story-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s6);
}
.story-top .logo {
  width: 168px;
}
.internal-label {
  font-size: 12px;
  color: var(--on-dark-muted);
  padding-top: var(--s2);
}
.story-copy {
  padding: var(--s12) 0 var(--s8);
  margin-top: auto;
}
.eyebrow.light {
  color: var(--on-dark-muted);
}
.story-copy h1 {
  font-size: clamp(44px, 4.5vw, 68px);
  font-weight: 400;
  letter-spacing: -2px;
  line-height: 1.08;
  margin: var(--s4) 0 var(--s6);
}
.story-copy p {
  color: var(--on-dark-muted);
  font-size: 16px;
}
.story-photo {
  margin: var(--s2) 0 0;
}
.story-photo img {
  width: 100%;
  height: clamp(150px, 23vh, 240px);
  display: block;
  object-fit: cover;
  object-position: center 57%;
}
.story-photo figcaption {
  padding-top: var(--s3);
  color: var(--on-dark-muted);
  font-size: 12px;
}
.story-bottom {
  margin-top: auto;
  padding-top: var(--s8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  color: var(--on-dark-muted);
  font-size: 12px;
}
.story-bottom a {
  display: flex;
  align-items: center;
  gap: var(--s2);
}
.login-panel {
  padding: var(--s8) var(--s12);
  display: flex;
  flex-direction: column;
}
.login-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 1.5px;
}
.login-topline .demo-tag {
  letter-spacing: 0;
}
.login-content {
  width: 100%;
  max-width: 420px;
  margin: auto;
  padding: var(--s12) 0;
}
.login-content > .eyebrow {
  border-left: 3px solid var(--red);
  padding-left: var(--s3);
}
.login-content h2 {
  font-size: 32px;
  letter-spacing: -0.9px;
  margin: var(--s4) 0 var(--s3);
}
.intro {
  font-size: 15px;
  max-width: 38ch;
}
.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s4);
  margin: var(--s8) 0;
  font-size: 12px;
  color: var(--muted);
}
.steps > span {
  border-bottom: 2px solid var(--line);
  padding-bottom: var(--s3);
}
.steps > .current-step {
  border-color: var(--navy);
  color: var(--navy);
  font-weight: 600;
}
.steps > .completed-step {
  border-color: var(--line-strong);
}
label {
  display: block;
  font-size: 14px;
  font-weight: 600;
}
label > input,
label > select,
label > textarea {
  display: block;
  width: 100%;
  margin-top: var(--s2);
}
input,
select,
textarea {
  min-height: 44px;
  padding: 10px 12px;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
}
input::placeholder,
textarea::placeholder {
  color: var(--muted);
  font-weight: 400;
}
textarea {
  min-height: 112px;
  resize: vertical;
}
.office-login-label {
  margin-top: var(--s6);
}
.office-login-label small {
  display: block;
  font-weight: 400;
  color: var(--muted);
  margin-top: var(--s2);
  line-height: 1.5;
}
.login-submit {
  width: 100%;
  justify-content: space-between;
  margin-top: var(--s6);
  min-height: 48px;
}
.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s2);
  color: var(--muted);
  font-size: 12px;
  margin-top: var(--s4);
}
.secure-note svg {
  flex-shrink: 0;
}
.signin-note {
  margin-top: var(--s8);
  border-top: 1px solid var(--line);
  padding-top: var(--s6);
  font-size: 13px;
}
.signin-note span {
  color: var(--muted);
}
.demo-reference {
  margin-top: var(--s6);
  font-size: 12px;
  color: var(--muted);
}
.demo-reference summary {
  cursor: pointer;
  min-height: 36px;
  padding: var(--s2) 0;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: var(--navy);
}
.demo-reference p {
  margin: var(--s2) 0;
}
.demo-reference dl {
  margin-top: var(--s3);
  padding-top: var(--s3);
  font-size: 12px;
  gap: var(--s3);
}
.demo-reference dd {
  overflow-wrap: anywhere;
}
.demo-password {
  margin-top: var(--s4);
  padding-top: var(--s3);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  gap: var(--s3);
}
.demo-password code {
  font-size: 13px;
  color: var(--ink);
}
.login-footer {
  display: flex;
  justify-content: space-between;
  gap: var(--s4);
  font-size: 12px;
  color: var(--muted);
}
.email-preview {
  display: flex;
  align-items: center;
  gap: var(--s2);
  padding: var(--s3);
  margin-bottom: var(--s6);
  background: var(--subtle);
  border-left: 2px solid var(--navy);
}
.email-preview span {
  flex: 1;
  overflow-wrap: anywhere;
  min-width: 0;
}
.email-preview button {
  background: transparent;
  color: var(--navy);
  min-height: 36px;
  text-decoration: underline;
  font-size: 12px;
}
.password-field {
  position: relative;
  margin-top: var(--s2);
}
.password-field input {
  width: 100%;
  padding-right: 48px;
}
.password-field button {
  position: absolute;
  right: 0;
  top: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--muted);
}

/* Persistent office navigation. No ornamental cards in the working area. */
.workspace {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 232px;
  background: var(--surface);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  z-index: 30;
  overflow-y: auto;
}
.sidebar-brand {
  background: var(--navy-deep);
  padding: var(--s8);
  border-top: 4px solid var(--red);
}
.sidebar-brand .logo {
  width: 144px;
}
.portal-label {
  display: block;
  color: var(--on-dark-muted);
  font-size: 12px;
  letter-spacing: 1.7px;
  margin-top: var(--s6);
}
.nav-caption {
  padding: var(--s8) var(--s6) var(--s3);
  font-size: 12px;
  letter-spacing: 1.5px;
  color: var(--muted);
}
.sidebar nav {
  padding: 0 var(--s3);
}
.nav-item {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s3);
  text-align: left;
  background: transparent;
  border-left: 3px solid transparent;
  font-size: 14px;
}
.nav-item:hover {
  background: var(--subtle);
}
.nav-item.active {
  background: var(--selected);
  color: var(--navy);
  font-weight: 600;
  border-left-color: var(--red);
}
.nav-item svg {
  flex-shrink: 0;
}
.sidebar-fill {
  flex: 1;
  min-height: var(--s8);
}
.sidebar-note {
  padding: var(--s6);
  color: var(--muted);
  font-size: 12px;
}
.sidebar-note > span {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
}
.sidebar-note p {
  margin: var(--s2) 0 var(--s3);
}
.side-user {
  display: flex;
  align-items: center;
  gap: var(--s3);
  margin: 0 var(--s6);
  padding-top: var(--s6);
  border-top: 1px solid var(--line);
}
.side-user > div {
  min-width: 0;
}
.side-user strong,
.side-user small {
  display: block;
  overflow-wrap: anywhere;
}
.side-user strong {
  font-size: 13px;
}
.side-user small {
  color: var(--muted);
  margin-top: var(--s1);
}
.signout-button {
  display: flex;
  align-items: center;
  gap: var(--s3);
  background: transparent;
  margin: var(--s2) var(--s6) var(--s4);
  padding: var(--s3) 0;
  min-height: 44px;
  color: var(--muted);
  font-size: 13px;
}
.signout-button:hover {
  color: var(--navy);
  text-decoration: underline;
}
.workspace-main {
  width: calc(100% - 232px);
  margin-left: 232px;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.topbar {
  min-height: 68px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s3) var(--s10);
  gap: var(--s4);
  background: var(--surface);
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--s3);
  color: var(--muted);
  font-size: 12px;
}
.breadcrumb strong {
  color: var(--ink);
  font-weight: 400;
}
.breadcrumb > span {
  color: var(--line-strong);
}
.top-right {
  display: flex;
  align-items: center;
  gap: var(--s6);
}
.role-pill {
  font-size: 12px;
  color: var(--muted);
  border-left: 1px solid var(--line);
  padding-left: var(--s6);
}
.main-content {
  padding: var(--s10);
  width: 100%;
  max-width: 1540px;
  margin: 0 auto;
  flex: 1;
}
.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--s6);
  margin-bottom: var(--s8);
}
.page-heading p {
  margin-top: var(--s3);
  max-width: 65ch;
  font-size: 14px;
}
.page-heading > .secondary {
  flex-shrink: 0;
}
.control-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--s4);
  padding-bottom: var(--s6);
}
.office-tabs {
  display: flex;
  gap: var(--s1);
  border-bottom: 1px solid var(--line-strong);
}
.office-tabs button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s2);
  padding: 10px 12px;
  min-height: 44px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
}
.office-tabs button:hover {
  background: var(--subtle);
}
.office-tabs .selected {
  border-color: var(--navy);
  color: var(--navy);
  font-weight: 600;
}
.flag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: 24px;
  height: 18px;
  border: 1px solid var(--line-strong);
  border-radius: 2px;
  line-height: 1;
  color: var(--muted);
  background: var(--surface);
  flex-shrink: 0;
}
.flag.UK::before {
  content: 'UK';
}
.flag.PK::before {
  content: 'PK';
}
.date-control {
  display: flex;
  align-items: center;
  gap: var(--s1);
}
.date-control > svg {
  display: none;
}
.date-control input {
  width: 154px;
  font-size: 13px;
  padding: 8px;
  background: var(--surface);
}
.today-button {
  background: transparent;
  color: var(--navy);
  padding: var(--s2);
  min-height: 44px;
  text-decoration: underline;
  font-size: 13px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border: 1px solid var(--line);
  background: var(--surface);
  margin-bottom: var(--s8);
}
.stat-card {
  position: relative;
  background: transparent;
  padding: var(--s4) var(--s6);
  text-align: left;
  border-right: 1px solid var(--line);
  border-bottom: 3px solid transparent;
}
.stat-card:last-child {
  border-right: 0;
}
.stat-card:hover {
  background: var(--subtle);
}
.stat-card.stat-selected {
  border-bottom-color: var(--navy);
  background: var(--selected);
}
.stat-card > div {
  font-size: 13px;
  color: var(--muted);
}
.stat-card > strong {
  display: block;
  font-size: 32px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  margin-top: var(--s2);
  color: var(--navy);
}
.stat-card small {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-top: var(--s2);
  line-height: 1.4;
}
.stats.updating {
  opacity: 0.7;
}
.table-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 2px solid var(--navy);
}
.table-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  padding: var(--s6);
}
.table-heading h2 {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: var(--s2);
}
.count-pill {
  color: var(--muted);
  font-size: 13px;
  font-weight: 400;
}
.count-pill::before {
  content: '(';
}
.count-pill::after {
  content: ')';
}
.table-heading p {
  color: var(--muted);
  font-size: 12px;
  margin-top: var(--s2);
}
.tiny-dot::before {
  content: ' · ';
  margin: 0 var(--s1);
}
.table-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--s4);
  padding: 0 var(--s6) var(--s6);
}
.search-field {
  display: flex;
  align-items: center;
  gap: var(--s2);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  width: 420px;
  max-width: 100%;
  padding: 0 var(--s3);
  color: var(--muted);
  background: var(--surface);
}
.search-field > svg {
  flex-shrink: 0;
}
.search-field input {
  border: 0;
  border-radius: 0;
  background: transparent;
  width: 100%;
  min-width: 0;
  padding: 10px 0;
  font-size: 13px;
}
.select-wrap {
  position: relative;
  min-width: 156px;
}
.select-wrap select {
  appearance: none;
  width: 100%;
  padding-right: var(--s8);
  font-size: 13px;
}
.select-wrap svg {
  position: absolute;
  right: 12px;
  top: 15px;
  pointer-events: none;
  color: var(--muted);
}
.table-scroll {
  position: relative;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
}
.table-loading {
  min-width: 600px;
}
.skeleton-row {
  height: 72px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: var(--s8);
  padding: var(--s6);
  border-bottom: 1px solid var(--line);
}
.skeleton-row span {
  height: 12px;
  background: var(--subtle);
  border-radius: 2px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
th {
  padding: 12px 16px;
  background: var(--subtle);
  border-block: 1px solid var(--line);
  font-size: 12px;
  letter-spacing: 0.7px;
  font-weight: 600;
  color: var(--muted);
}
td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
  height: 72px;
}
th:first-child,
td:first-child {
  padding-left: var(--s6);
}
th:last-child,
td:last-child {
  padding-right: var(--s6);
}
tbody tr:last-child td {
  border-bottom: 0;
}
tbody tr:hover {
  background: var(--subtle);
}
.person-button {
  display: flex;
  align-items: center;
  gap: var(--s3);
  text-align: left;
  background: transparent;
  padding: 0;
  min-height: 44px;
}
.person-button:hover strong {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--line);
  background: var(--subtle);
  color: var(--navy);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
}
.person-button strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.person-button small {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-top: var(--s1);
}
.office-cell {
  display: flex;
  align-items: center;
  gap: var(--s2);
}
.department-cell {
  color: var(--muted);
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  background: var(--subtle);
  color: var(--muted);
}
.badge i {
  width: 5px;
  height: 5px;
  background: currentColor;
  border-radius: 50%;
}
.badge.present {
  color: var(--present);
  background: var(--present-bg);
}
.badge.absent {
  color: var(--absent);
  background: var(--absent-bg);
}
.badge.other {
  color: var(--other);
  background: var(--other-bg);
}
.badge.pending {
  color: var(--pending);
  background: var(--pending-bg);
}
.time-cell {
  font-variant-numeric: tabular-nums;
}
.sample-label {
  display: block;
  margin-top: var(--s1);
  font-size: 12px;
  color: var(--muted);
}
.note-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--muted);
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--s3) var(--s6);
  gap: var(--s3);
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--muted);
}
.table-footer > div {
  display: flex;
  align-items: center;
  gap: var(--s1);
}
.page-number {
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  background: transparent;
  color: var(--muted);
}
.page-number.selected {
  background: var(--navy);
  color: var(--on-dark);
}
.below-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--s3);
  margin-top: var(--s4);
  font-size: 12px;
}
.below-table > div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--s1);
}
.info-strip {
  display: flex;
  align-items: flex-start;
  gap: var(--s2);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
  margin-top: var(--s6);
}
.info-strip > svg {
  flex-shrink: 0;
  margin-top: 2px;
}
.app-footer {
  display: flex;
  justify-content: space-between;
  gap: var(--s4);
  border-top: 1px solid var(--line);
  padding: var(--s4) 0;
  margin: 0 var(--s10);
  color: var(--muted);
  font-size: 12px;
}
.empty-state {
  padding: var(--s12) var(--s6);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--s3);
  text-align: center;
  color: var(--muted);
}
.mobile-menu,
.nav-backdrop {
  display: none;
}

/* Daily submission is deliberately the first thing an employee sees. */
.employee-office {
  display: flex;
  align-items: center;
  gap: var(--s2);
  color: var(--muted);
  white-space: nowrap;
}
.employee-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 288px;
  gap: var(--s8);
  align-items: start;
}
.checkin-panel {
  border: 1px solid var(--line);
  border-top: 3px solid var(--navy);
  background: var(--surface);
  padding: var(--s8);
}
.checkin-heading {
  margin-bottom: var(--s6);
}
.checkin-heading h2 {
  font-size: 26px;
}
.checkin-heading p {
  margin-top: var(--s3);
  color: var(--muted);
}
.checkin-heading .eyebrow {
  display: none;
}
.attendance-options {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  overflow: hidden;
}
.attendance-option {
  display: flex;
  align-items: center;
  gap: var(--s4);
  width: 100%;
  text-align: left;
  padding: var(--s4);
  min-height: 84px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
.attendance-option:last-child {
  border-bottom: 0;
}
.attendance-option:hover {
  background: var(--subtle);
}
.attendance-option.chosen {
  background: var(--selected);
  box-shadow: inset 3px 0 var(--navy);
}
.attendance-option:focus-visible {
  outline-offset: -4px;
}
.attendance-option strong {
  display: block;
  font-size: 15px;
}
.attendance-option small {
  display: block;
  margin-top: var(--s1);
  font-size: 13px;
  color: var(--muted);
}
.radio-circle {
  margin-left: auto;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
}
.chosen .radio-circle {
  border-color: var(--navy);
}
.radio-circle span {
  width: 10px;
  height: 10px;
  background: var(--navy);
  border-radius: 50%;
}
.submit-attendance {
  width: 100%;
  justify-content: space-between;
  margin-top: var(--s6);
}
.reason-label {
  margin-top: var(--s6);
}
.reason-label small {
  display: block;
  margin-top: var(--s2);
  color: var(--muted);
  font-weight: 400;
}
.saved-indicator {
  display: flex;
  align-items: center;
  gap: var(--s2);
  color: var(--present);
  background: var(--present-bg);
  padding: var(--s3);
  margin-bottom: var(--s4);
  font-size: 13px;
}
.profile-card {
  padding: var(--s6) 0;
  border-top: 1px solid var(--line-strong);
}
.profile-card > .avatar {
  width: 48px;
  height: 48px;
  font-size: 14px;
  margin-bottom: var(--s4);
}
.profile-card h3 {
  font-size: 20px;
}
.profile-card > p {
  margin-top: var(--s2);
  color: var(--muted);
  font-size: 13px;
}
dl {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--s4) var(--s3);
  border-top: 1px solid var(--line);
  margin: var(--s6) 0 0;
  padding-top: var(--s6);
  font-size: 12px;
}
dt {
  color: var(--muted);
}
dd {
  margin: 0;
  text-align: right;
}
.small-note {
  padding-top: var(--s6);
  border-top: 1px solid var(--line);
}
.small-note h3 {
  font-size: 14px;
  margin-bottom: var(--s2);
}
.small-note p {
  font-size: 13px;
  color: var(--muted);
}
.history-panel {
  margin-top: var(--s8);
}

/* Details and corrections use the same ledger language. */
.detail-dialog {
  width: 680px;
  max-width: calc(100vw - 32px);
  max-height: 90vh;
  overflow: auto;
  padding: var(--s8);
  margin: auto;
  border: 1px solid var(--line);
  border-top: 4px solid var(--navy);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 16px 64px var(--shadow);
}
.detail-dialog::backdrop {
  background: var(--backdrop);
}
.dialog-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s6);
}
.dialog-top .eyebrow {
  margin: 0;
}
.detail-person {
  display: flex;
  align-items: center;
  gap: var(--s4);
}
.detail-person > .avatar {
  width: 48px;
  height: 48px;
  font-size: 14px;
}
.detail-person > div {
  min-width: 0;
}
.detail-person h2 {
  font-size: 24px;
}
.detail-person p {
  font-size: 13px;
  color: var(--muted);
  margin: var(--s2) 0;
}
.detail-person small {
  font-size: 12px;
  color: var(--muted);
  overflow-wrap: anywhere;
}
.detail-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s3);
  padding: var(--s4) 0;
  border-block: 1px solid var(--line);
  margin-top: var(--s6);
}
.detail-status > div {
  display: flex;
  align-items: center;
  gap: var(--s3);
}
.detail-section-title {
  margin: var(--s8) 0 var(--s4);
  font-size: 16px;
}
.detail-history > div {
  display: flex;
  align-items: center;
  gap: var(--s4);
  padding: var(--s3) 0;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
}
.detail-history > div > span:first-child {
  flex: 1;
}
.detail-history small {
  display: block;
  margin-top: var(--s1);
  color: var(--muted);
  overflow-wrap: anywhere;
}
.audit {
  display: flex;
  align-items: flex-start;
  gap: var(--s3);
  padding: var(--s3) 0;
  font-size: 13px;
  color: var(--muted);
}
.audit > svg {
  margin-top: var(--s1);
  flex-shrink: 0;
}
.audit strong {
  color: var(--ink);
}
.audit p {
  margin: var(--s1) 0;
  overflow-wrap: anywhere;
}
.correction-form {
  background: var(--subtle);
  border: 1px solid var(--line);
  padding: var(--s6);
  margin-top: var(--s4);
}
.correction-form label {
  margin-top: var(--s4);
}
.correction-form .primary {
  margin-top: var(--s6);
}
.activity-explainer {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: var(--s3);
}
.access-list {
  max-height: 260px;
  overflow: auto;
}
.access-list > div {
  display: flex;
  align-items: center;
  gap: var(--s2);
  border-bottom: 1px solid var(--line);
  padding: var(--s3) 0;
  font-size: 13px;
}
.access-list > div > span:last-child {
  margin-left: auto;
  font-size: 12px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.access-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: var(--muted);
}
.office-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s8);
}
.office-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 3px solid var(--navy);
  padding: var(--s8);
}
.office-card-top {
  display: flex;
  align-items: center;
  gap: var(--s2);
  margin-bottom: var(--s6);
  font-size: 12px;
  color: var(--muted);
}
.office-card-top > svg {
  margin-left: auto;
}
.office-card h2 {
  font-size: 26px;
  margin-bottom: var(--s4);
}
.office-card p {
  display: flex;
  align-items: flex-start;
  gap: var(--s2);
  font-size: 14px;
  min-height: 48px;
  color: var(--muted);
}
.office-card p > svg {
  flex-shrink: 0;
  margin-top: var(--s1);
}
.policy-card {
  border-top: 1px solid var(--line-strong);
  margin-top: var(--s8);
  padding-top: var(--s8);
}
.policy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--s8);
  margin: var(--s6) 0;
}
.policy-grid h3 {
  margin-bottom: var(--s3);
}
.policy-grid p,
.policy-card > .muted {
  font-size: 13px;
  color: var(--muted);
}

@media (min-width: 1600px) {
  .main-content {
    padding-block: var(--s12);
  }
}
@media (max-width: 1200px) {
  .main-content {
    padding: var(--s8) var(--s6);
  }
  .topbar {
    padding-inline: var(--s6);
  }
  .app-footer {
    margin-inline: var(--s6);
  }
  .stat-card {
    padding: var(--s4);
  }
  .stat-card small {
    display: none;
  }
  .employee-grid {
    grid-template-columns: minmax(0, 1fr) 248px;
    gap: var(--s6);
  }
  .login-story {
    padding: var(--s8);
  }
  .login-panel {
    padding: var(--s8);
  }
}
@media (max-width: 960px) {
  .sidebar {
    width: 208px;
  }
  .workspace-main {
    margin-left: 208px;
    width: calc(100% - 208px);
  }
  .sidebar-brand {
    padding: var(--s6);
  }
  .nav-item {
    font-size: 13px;
    gap: var(--s2);
  }
  .top-right .role-pill {
    display: none;
  }
  .page-heading {
    align-items: flex-start;
  }
  .employee-grid {
    grid-template-columns: 1fr;
  }
  .employee-aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--s6);
  }
  .small-note {
    padding-top: var(--s6);
  }
  .office-cards {
    grid-template-columns: 1fr;
  }
  .policy-grid {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }
  .story-top .internal-label {
    display: none;
  }
  .login-page {
    grid-template-columns: 40% 60%;
  }
  .story-copy h1 {
    font-size: 48px;
  }
  .story-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
  .login-content h2 {
    font-size: 28px;
  }
  .stats {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .stat-card {
    padding: var(--s3);
  }
  .stat-card > div {
    font-size: 12px;
  }
  .stat-card > strong {
    font-size: 28px;
  }
}
@media (max-width: 700px) {
  .login-page {
    display: block;
  }
  .login-story {
    padding: var(--s6);
    min-height: 0;
  }
  .story-top .logo {
    width: 120px;
  }
  .story-top .internal-label {
    display: block;
  }
  .story-copy,
  .story-photo,
  .story-bottom {
    display: none;
  }
  .login-panel {
    padding: var(--s6);
  }
  .login-content {
    padding: var(--s8) 0;
    max-width: 440px;
  }
  .login-topline {
    font-size: 12px;
  }
  .login-content h2 {
    font-size: 28px;
  }
  .login-footer {
    font-size: 12px;
  }
  .steps {
    margin-block: var(--s6);
  }
  .sidebar {
    display: none;
    width: 260px;
    top: 60px;
  }
  .sidebar.mobile-open {
    display: flex;
  }
  .sidebar-note {
    display: none;
  }
  .nav-backdrop {
    display: block;
    position: fixed;
    inset: 60px 0 0;
    z-index: 29;
    background: var(--backdrop);
  }
  .workspace-main {
    width: 100%;
    margin: 0;
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    height: 60px;
    min-height: 60px;
    padding: var(--s2) var(--s4);
    gap: var(--s2);
  }
  .mobile-menu {
    display: inline-flex;
  }
  .breadcrumb {
    margin-right: auto;
    font-size: 12px;
    gap: var(--s2);
  }
  .top-right .demo-tag {
    font-size: 12px;
  }
  .main-content {
    padding: var(--s8) var(--s4);
  }
  .page-heading {
    flex-wrap: wrap;
    gap: var(--s4);
    margin-bottom: var(--s6);
  }
  .page-heading h1 {
    font-size: 28px;
  }
  .page-heading p {
    font-size: 14px;
  }
  .eyebrow {
    font-size: 12px;
  }
  .page-heading > .secondary {
    font-size: 13px;
  }
  .control-row {
    align-items: flex-start;
    padding-bottom: var(--s4);
    gap: var(--s4);
  }
  .office-tabs {
    width: 100%;
  }
  .office-tabs button {
    flex: 1;
    font-size: 12px;
    padding: 10px 6px;
    gap: 6px;
  }
  .office-tabs .flag {
    display: none;
  }
  .date-control {
    width: 100%;
  }
  .date-control input {
    flex: 1;
    max-width: 220px;
  }
  .date-control .today-button {
    margin-left: auto;
  }
  .stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: var(--s6);
  }
  .stat-card {
    padding: var(--s4);
    border-bottom-width: 2px;
  }
  .stat-card:first-child {
    grid-column: span 2;
  }
  .stat-card:nth-child(2) {
    border-right: 0;
  }
  .stat-card:nth-child(-n + 2) {
    border-bottom-color: var(--line);
  }
  .stat-card.stat-selected {
    border-bottom-color: var(--navy);
  }
  .stat-card > div {
    font-size: 13px;
  }
  .table-heading {
    padding: var(--s4);
  }
  .table-heading h2 {
    font-size: 18px;
  }
  .table-heading p {
    font-size: 12px;
  }
  .table-toolbar {
    flex-direction: column;
    padding: 0 var(--s4) var(--s4);
    gap: var(--s3);
  }
  .search-field {
    width: 100%;
  }
  .search-field input {
    font-size: 16px;
  }
  .select-wrap select {
    font-size: 16px;
  }
  th:first-child,
  td:first-child {
    padding-left: var(--s4);
  }
  .table-footer {
    padding: var(--s3) var(--s4);
    flex-wrap: wrap;
  }
  .icon-button,
  .page-number {
    width: 44px;
    height: 44px;
  }
  .table-footer > div {
    gap: 0;
  }
  .app-footer {
    margin-inline: var(--s4);
    flex-direction: column;
    gap: var(--s1);
  }
  .below-table {
    font-size: 12px;
  }
  .below-table > div .muted {
    width: 100%;
  }
  .employee-office {
    font-size: 13px;
  }
  .checkin-panel {
    padding: var(--s6) var(--s4);
  }
  .checkin-heading h2 {
    font-size: 24px;
  }
  .employee-aside {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .profile-card {
    padding-bottom: var(--s6);
  }
  .small-note {
    margin-top: var(--s2);
  }
  .detail-dialog {
    padding: var(--s6) var(--s4);
    max-width: calc(100vw - 16px);
  }
  .detail-person h2 {
    font-size: 22px;
  }
  .detail-status {
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .detail-history > div {
    gap: var(--s2);
  }
  .access-list > div {
    flex-wrap: wrap;
  }
  .access-list > div > span:last-child {
    margin-left: var(--s8);
    width: 100%;
  }
  .office-card {
    padding: var(--s6);
  }
  .correction-form {
    padding: var(--s4);
  }
  input,
  textarea,
  select {
    font-size: 16px;
  }
  .demo-reference summary,
  .email-preview button {
    min-height: 44px;
  }
  .demo-reference dl {
    grid-template-columns: 1fr;
    gap: var(--s1);
  }
  .demo-reference dd {
    text-align: left;
    margin-bottom: var(--s3);
  }
}
@media (max-width: 380px) {
  .top-right {
    display: none;
  }
  .login-panel {
    padding: var(--s6) var(--s4);
  }
  .login-footer {
    flex-direction: column;
    gap: var(--s1);
  }
  .demo-password {
    flex-direction: column;
  }
  .stat-card {
    padding: var(--s3);
  }
}
/* Simplified screens: one task region, with secondary information on demand. */
.simple-login {
  min-height: 100vh;
  background: var(--page-wash), var(--canvas);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--s12) var(--s6) var(--s6);
}
.login-brand {
  padding: var(--s4) var(--s6);
  background: var(--navy-deep);
  border-top: 3px solid var(--red);
}
.login-brand .logo {
  width: 132px;
}
.simple-login-form {
  width: 100%;
  max-width: 384px;
  margin: var(--s12) auto;
}
.simple-login-form h1 {
  font-size: 28px;
  margin-bottom: var(--s3);
}
.simple-login-form > p {
  margin-bottom: var(--s8);
  overflow-wrap: anywhere;
}
.simple-login-form .demo-reference {
  margin-top: var(--s8);
}
.simple-login-footer {
  margin-top: auto;
  color: var(--muted);
  font-size: 12px;
}
.simple-workspace {
  display: block;
  background: var(--surface);
}
.simple-workspace .workspace-main {
  margin: 0;
  width: 100%;
  min-height: calc(100vh - 104px);
}
.simple-workspace .workspace-main {
  background: var(--page-wash), var(--canvas);
}
.simple-header {
  background: var(--navy-deep);
  color: var(--on-dark);
  border-bottom: 3px solid var(--red);
}
.header-inner {
  width: min(100%, 1184px);
  margin: auto;
  display: flex;
  align-items: center;
  gap: var(--s10);
  padding: var(--s4) var(--s10);
}
.compact-brand {
  padding: var(--s3) var(--s4);
  background: var(--navy-deep);
  flex-shrink: 0;
}
.compact-brand .logo {
  width: 104px;
}
.simple-header nav {
  display: flex;
  align-items: center;
  gap: var(--s6);
}
.simple-header nav button {
  min-height: 44px;
  padding: var(--s2) var(--s1);
  background: transparent;
  color: var(--on-dark-muted);
  border-bottom: 2px solid transparent;
  font-size: 14px;
}
.simple-header nav button:hover {
  color: var(--on-dark);
}
.simple-header nav button[aria-current='page'] {
  color: var(--on-dark);
  border-color: var(--nav-indicator);
  font-weight: 600;
}
.simple-header nav button:focus-visible,
.account-menu > summary:focus-visible {
  outline-color: var(--nav-indicator);
  outline-offset: -3px;
}
.account-menu {
  position: relative;
  margin-left: auto;
}
.account-menu > summary {
  display: flex;
  align-items: center;
  gap: var(--s2);
  min-height: 44px;
  padding: var(--s2);
  cursor: pointer;
  list-style: none;
}
.account-menu > summary::-webkit-details-marker {
  display: none;
}
.account-content {
  position: absolute;
  right: 0;
  top: 48px;
  width: 290px;
  max-width: calc(100vw - 32px);
  padding: var(--s6);
  border: 1px solid var(--line);
  background: var(--surface);
  z-index: 50;
  box-shadow: 0 8px 24px var(--shadow);
}
.account-content p {
  font-size: 13px;
  color: var(--muted);
  margin-top: var(--s2);
  overflow-wrap: anywhere;
}
.account-content {
  color: var(--ink);
}
.account-content > button {
  background: transparent;
  color: var(--navy);
  min-height: 44px;
  padding: var(--s2) 0;
  margin-top: var(--s4);
  text-decoration: underline;
}
.simple-workspace .main-content {
  max-width: 1184px;
  padding: var(--s12) var(--s10);
}
.simple-workspace .page-heading {
  margin-bottom: var(--s8);
  align-items: center;
}
.simple-workspace .page-heading h1 {
  font-size: 30px;
  font-weight: 500;
}
.simple-workspace .page-heading .secondary {
  font-size: 13px;
  border-color: var(--line);
  font-weight: 400;
}
.simple-workspace .control-row {
  padding-bottom: var(--s8);
  gap: var(--s6);
}
.office-select {
  min-width: 180px;
}
.simple-workspace .date-control {
  width: auto;
}
.register-panel {
  border: 0;
}
.register-panel .table-toolbar {
  padding: 0 0 var(--s6);
}
.register-panel .search-field {
  width: 320px;
}
.register-panel th {
  background: var(--surface);
  border-top: 0;
  letter-spacing: 0;
  font-size: 13px;
  font-weight: 400;
}
.register-panel td {
  height: 80px;
  font-size: 14px;
}
.register-panel th:first-child,
.register-panel td:first-child {
  padding-left: 0;
  width: 38%;
}
.register-panel th:last-child,
.register-panel td:last-child {
  padding-right: 0;
  text-align: right;
}
.register-panel .person-button strong {
  font-weight: 400;
  font-size: 15px;
  color: var(--navy);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
}
.register-panel .table-footer {
  padding-inline: 0;
}
.register-footnote {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s4);
  margin-top: var(--s4);
  color: var(--muted);
  font-size: 12px;
}
.refresh-link {
  background: transparent;
  color: var(--muted);
  text-decoration: underline;
  min-height: 44px;
  padding: var(--s2);
}
.simple-workspace .app-footer {
  width: calc(100% - 80px);
  max-width: 1104px;
  margin: auto;
  padding-block: var(--s6);
  font-size: 12px;
  border-top: 0;
}
.simple-workspace .personal-content {
  max-width: 680px;
}
.detail-disclosure {
  border-top: 1px solid var(--line);
  margin-top: var(--s6);
  padding-top: var(--s2);
}
.detail-disclosure > summary,
.policy-card > summary {
  min-height: 44px;
  padding-block: var(--s3);
  cursor: pointer;
  color: var(--navy);
  font-size: 14px;
}
.detail-disclosure .activity-explainer {
  margin-top: var(--s3);
}
.personal-content .employee-grid {
  display: block;
}
.personal-content .checkin-panel {
  padding: 0;
  border: 0;
}
.personal-content .checkin-heading {
  margin-bottom: var(--s6);
}
.personal-content .checkin-heading h2 {
  font-size: 18px;
  font-weight: 400;
}
.personal-content .attendance-options {
  border: 0;
  overflow: visible;
}
.personal-content .attendance-option {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  margin-bottom: var(--s3);
  padding: var(--s6);
  min-height: 72px;
}
.personal-content .attendance-option.chosen {
  box-shadow: none;
  border-color: var(--navy);
}
.personal-content .attendance-option strong {
  font-weight: 400;
}
.personal-content .submit-attendance {
  margin-top: var(--s4);
}
.personal-content .history-panel {
  margin-top: 0;
  border: 0;
}
.personal-content .secure-note {
  margin-top: var(--s6);
}
@media (max-width: 700px) {
  .header-inner {
    padding: var(--s4);
    gap: var(--s4);
    flex-wrap: wrap;
  }
  .compact-brand {
    padding: var(--s2) var(--s3);
  }
  .compact-brand .logo {
    width: 88px;
  }
  .simple-header nav {
    order: 3;
    width: 100%;
    gap: var(--s6);
    overflow-x: auto;
  }
  .simple-header nav button {
    font-size: 14px;
    flex-shrink: 0;
  }
  .simple-workspace .main-content {
    padding: var(--s8) var(--s4);
  }
  .simple-workspace .page-heading {
    margin-bottom: var(--s8);
  }
  .simple-workspace .page-heading h1 {
    font-size: 27px;
  }
  .simple-workspace .control-row {
    gap: var(--s4);
    padding-bottom: var(--s6);
  }
  .office-select {
    width: 100%;
  }
  .simple-workspace .date-control {
    width: 100%;
  }
  .register-panel .table-toolbar {
    gap: var(--s3);
  }
  .register-panel .search-field {
    width: 100%;
  }
  .register-panel table {
    min-width: 560px;
  }
  .register-panel .table-footer {
    align-items: center;
  }
  .register-footnote {
    align-items: flex-start;
  }
  .register-footnote > span {
    padding-top: var(--s3);
    max-width: 28ch;
  }
  .simple-workspace .app-footer {
    width: calc(100% - 32px);
    gap: var(--s2);
  }
  .personal-content .attendance-option {
    padding: var(--s4);
  }
  .simple-login {
    padding-top: var(--s8);
  }
  .simple-login-form {
    margin-top: var(--s8);
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* Phase 1 extends the existing HMF components and spacing scale. */
.work-clock {
  padding-block: var(--s4);
}
.work-clock form {
  display: grid;
  gap: var(--s4);
  max-width: 440px;
  margin-block: var(--s6);
}
.hours-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s4);
  margin-bottom: var(--s6);
}
.hours-controls label,
.work-clock label {
  display: grid;
  gap: var(--s2);
}
.hours-summary {
  padding-block: var(--s4);
  border-block: 1px solid var(--line);
  margin-block: var(--s6);
  line-height: 1.6;
}
@media (max-width: 700px) {
  .hours-controls {
    grid-template-columns: 1fr;
  }
}
.people-filters,
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s6);
  align-items: end;
}
.people-filters {
  grid-template-columns: 2fr 1fr 1fr;
  margin-bottom: var(--s6);
}
.employment-form {
  max-width: 880px;
  display: grid;
  gap: var(--s6);
}
.employment-form fieldset,
.schedule-editor fieldset {
  margin: 0;
  padding: var(--s6) 0;
  border: 0;
  border-top: 1px solid var(--line);
  min-width: 0;
}
.employment-form legend {
  padding: 0 var(--s3) 0 0;
  font-size: 18px;
  font-weight: 500;
}
.employment-form label,
.people-filters label,
.profile-section > label,
.workforce-disclosure label {
  display: flex;
  flex-direction: column;
  gap: var(--s2);
  color: var(--ink);
  font-size: 14px;
  margin-block: var(--s3);
}
.employment-form input,
.employment-form select,
.employment-form textarea,
.people-filters input,
.people-filters select,
.workforce-disclosure input,
.profile-section > label input {
  width: 100%;
  min-width: 0;
}
.employment-form p,
.workforce-disclosure p,
.profile-section > p {
  margin-block: var(--s4);
  line-height: 1.6;
}
.employment-form textarea {
  min-height: 96px;
}
.employment-form input:disabled {
  background: var(--canvas);
  color: var(--muted);
}
.form-actions,
.section-heading,
.settings-nav {
  display: flex;
  align-items: center;
  gap: var(--s4);
  flex-wrap: wrap;
}
.section-heading {
  justify-content: space-between;
  margin-bottom: var(--s4);
}
.settings-nav {
  margin-bottom: var(--s8);
}
.settings-nav [aria-pressed='true'] {
  border-color: var(--navy);
  color: var(--navy);
  background: var(--selected);
}
.text-button {
  color: var(--navy);
  background: transparent;
  text-decoration: underline;
  min-height: 44px;
  padding: var(--s2) 0;
  margin-bottom: var(--s4);
  text-align: left;
}
.profile-section {
  padding-block: var(--s6);
  border-top: 1px solid var(--line);
  margin-bottom: var(--s4);
}
.profile-section h2 {
  margin-bottom: var(--s4);
  font-size: 20px;
  font-weight: 500;
}
.profile-section > label {
  max-width: 240px;
}
.profile-values {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s6) var(--s8);
  margin-block: var(--s6);
}
.profile-values dt {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: var(--s2);
}
.profile-values dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.workforce-disclosure {
  border-top: 1px solid var(--line);
  padding-block: var(--s4);
  margin-top: var(--s6);
}
.workforce-disclosure > summary,
.schedule-version > summary {
  min-height: 44px;
  cursor: pointer;
  color: var(--navy);
  padding-block: var(--s3);
}
.workforce-disclosure > form {
  margin-top: var(--s6);
}
.schedule-version {
  padding-block: var(--s3);
  border-bottom: 1px solid var(--line);
}
.schedule-day-fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s4);
  align-items: end;
}
.check-list {
  display: flex;
  gap: var(--s4);
  flex-wrap: wrap;
}
.employment-form .check-label,
.check-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--s3);
  min-height: 44px;
}
.check-label input[type='checkbox'] {
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  accent-color: var(--navy);
}
.panel-message,
.empty-copy {
  padding: var(--s8) var(--s4);
  color: var(--muted);
}
.audit-values {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s6);
}
.audit-values pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  max-height: 320px;
  overflow: auto;
  font-size: 12px;
  padding: var(--s4);
  border: 1px solid var(--line);
}
.table-footer > div {
  flex-wrap: wrap;
}
.account-content > button {
  display: block;
  margin-top: 0;
  width: 100%;
  text-align: left;
}
.badge.remote,
.badge.client,
.badge.travel,
.badge.training {
  color: var(--present);
  background: var(--present-bg);
}
.badge.unavailable {
  color: var(--pending);
  background: var(--pending-bg);
}
.badge {
  white-space: normal;
}
@media (max-width: 700px) {
  .people-filters,
  .form-grid,
  .profile-values,
  .audit-values {
    grid-template-columns: 1fr;
  }
  .schedule-day-fields {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .settings-nav {
    gap: var(--s2);
  }
  .settings-nav button {
    flex: 1 1 auto;
  }
  .simple-workspace .page-heading {
    flex-wrap: wrap;
    gap: var(--s4);
  }
  .profile-section .table-scroll table {
    min-width: 600px;
  }
  .employment-form legend {
    font-size: 18px;
  }
}
@media (max-width: 380px) {
  .schedule-day-fields {
    grid-template-columns: 1fr;
  }
}

.leave-view {
  max-width: 760px;
}
.leave-section {
  margin-block-start: var(--s8);
}
.leave-list {
  list-style: none;
  padding: 0;
}
.leave-list > li {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s3);
  border-top: 1px solid var(--line);
  padding-block: var(--s4);
}
.leave-list p {
  margin: 4px 0 0;
  overflow-wrap: anywhere;
}
.leave-status {
  text-transform: capitalize;
}
.leave-form {
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 520px;
}
.leave-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.fine-print {
  font-size: 12px;
  color: var(--muted);
}
.simple-login-footer.fine-print {
  text-align: center;
  overflow-wrap: anywhere;
  line-height: 1.65;
}
.privacy-footnote {
  max-width: 62ch;
}
.privacy-footnote p {
  margin-top: var(--s1);
}
.account-actions {
  margin-inline-start: auto;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
}
.account-actions button {
  min-height: 44px;
  padding-inline: var(--s2);
  color: var(--on-dark);
  background: transparent;
}
.account-actions button:hover {
  text-decoration: underline;
}
.account-actions button:focus-visible {
  outline-color: var(--nav-indicator);
}
.attendance-section {
  border-top: 1px solid var(--line);
  padding-top: var(--s6);
  margin-top: var(--s6);
}

/* Keep navigation and account actions within tablet and mobile widths. */
.header-inner {
  flex-wrap: wrap;
}
.simple-header nav {
  min-width: 0;
  flex-wrap: wrap;
}
.account-actions {
  min-width: 0;
}
@media (min-width: 701px) and (max-width: 1100px) {
  .header-inner {
    gap: var(--s4) var(--s6);
  }
  .account-actions {
    flex-basis: 100%;
    justify-content: flex-end;
  }
}
```

## File: `app/hours-ui.tsx`

```
'use client';
import { useEffect, useState } from 'react';
import { useWorkforce } from './workforce-context';
import { defaultHoursPolicy, localWall, wallCandidates, type HoursPolicy } from './lib/hours';
export async function hoursApi(action: string, body?: object, query = ''): Promise<any> {
  const r = await fetch(
    '/api/hours' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...body }),
        }
      : { cache: 'no-store' },
  );
  const d: any = await r.json();
  if (!r.ok) throw new Error(d.error || 'Unable to load working hours.');
  return d;
}
const amount = (v: number | null | undefined) =>
  v === null || v === undefined ? 'Not available' : `${Number((v / 60).toFixed(2))} h`;
const stamp = (v: string | null, zone: string) =>
  v
    ? new Date(v).toLocaleString('en-GB', {
        timeZone: zone,
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
const Feedback = ({ error, success }: { error: string; success?: string }) => (
  <>
    {error && (
      <div className="error" role="alert">
        {error}
      </div>
    )}
    {success && (
      <div className="success" role="status">
        {success}
      </div>
    )}
  </>
);

export function WorkClock({ changed }: { changed?: () => void }) {
  const { config } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [status, setStatus] = useState('present'),
    [note, setNote] = useState(''),
    [breakMinutes, setBreakMinutes] = useState(0),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [busy, setBusy] = useState(false);
  async function load() {
    try {
      setData(await hoursApi('today'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (data.open)
        await hoursApi('checkOut', {
          date: data.open.date,
          revision: data.open.revision,
          breakMinutes,
        });
      else await hoursApi('checkIn', { status, note });
      setSuccess(data.open ? 'You have checked out.' : 'You have checked in.');
      await load();
      changed?.();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const open = data?.open,
    openSnapshot = open ? JSON.parse(open.snapshot) : null;
  const reminder =
    open && data?.today !== open.date
      ? 'You still have an open check-in from a previous day. Check out or request a correction in Hours.'
      : data?.metrics?.missingCheckOut
        ? 'Your scheduled shift has ended and your check-in is still open.'
        : '';
  return (
    <section className="work-clock">
      <h2>Working time</h2>
      <Feedback error={error} success={success} />
      {reminder && (
        <p className="error" role="status">
          {reminder}
        </p>
      )}
      {!data ? (
        <p role="status">
          {error ? (
            <button className="secondary" onClick={load}>
              Retry
            </button>
          ) : (
            'Loading working time…'
          )}
        </p>
      ) : (
        <>
          <p className="muted">
            {open
              ? 'Checked in ' +
                stamp(open.check_in, openSnapshot.timezone) +
                ' · ' +
                openSnapshot.timezone
              : data.record
                ? 'Checked out ' + stamp(data.record.check_out, data.snapshot.timezone)
                : 'Not checked in today'}
          </p>
          {!data.record || open ? (
            <form onSubmit={submit}>
              {!open && (
                <>
                  <label>
                    Working location
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      {config.statuses
                        .filter((s) => s.enabled && s.category === 'working')
                        .map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </label>
                  {config.statuses.find((s) => s.code === status)?.explanation ? (
                    <label>
                      Work note
                      <textarea
                        required
                        maxLength={500}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </label>
                  ) : null}
                </>
              )}
              {open && openSnapshot.policy.trackBreaks && (
                <label>
                  Total break minutes
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Number(e.target.value))}
                  />
                  <small>Enter your actual breaks, including zero if none.</small>
                </label>
              )}
              <button className="primary" disabled={busy}>
                {busy ? 'Saving…' : open ? 'Check out' : 'Check in'}
              </button>
            </form>
          ) : (
            <p>
              Recorded time: <strong>{amount(data.metrics.recordedMinutes)}</strong>. Corrections
              can be requested from Hours.
            </p>
          )}
          <p className="secure-note">
            Check out explicitly when you finish. Signing out or closing the browser leaves your
            check-in open.
          </p>
        </>
      )}
    </section>
  );
}

export function HoursView({ teamView = false }: { teamView?: boolean }) {
  const { config } = useWorkforce(),
    [rows, setRows] = useState<any[]>([]),
    [start, setStart] = useState(''),
    [end, setEnd] = useState(''),
    [mode, setMode] = useState(teamView ? 'day' : 'week'),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(true),
    [employee, setEmployee] = useState(''),
    [office, setOffice] = useState(''),
    [filter, setFilter] = useState('all'),
    [page, setPage] = useState(1),
    [revision, setRevision] = useState(0),
    [correction, setCorrection] = useState<any>(null),
    [decision, setDecision] = useState<any>(null),
    [decisionNote, setDecisionNote] = useState('');
  function period(kind: string, date: string) {
    const d = new Date(date + 'T12:00:00Z');
    if (kind === 'week') {
      d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
      setStart(d.toISOString().slice(0, 10));
      d.setUTCDate(d.getUTCDate() + 6);
      setEnd(d.toISOString().slice(0, 10));
    } else if (kind === 'month') {
      setStart(date.slice(0, 7) + '-01');
      d.setUTCMonth(d.getUTCMonth() + 1, 0);
      setEnd(d.toISOString().slice(0, 10));
    } else {
      setStart(date);
      setEnd(date);
    }
    setMode(kind);
  }
  useEffect(() => {
    if (config.today && !start) period(teamView ? 'day' : 'week', config.today);
  }, [config.today]);
  useEffect(() => {
    if (!start || !end) return;
    let live = true;
    setBusy(true);
    hoursApi('sheet', undefined, `&team=${teamView}&start=${start}&end=${end}`)
      .then((d) => {
        if (live) {
          setRows(d.rows);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setBusy(false);
      });
    return () => {
      live = false;
    };
  }, [start, end, revision, teamView]);
  useEffect(() => {
    setPage(1);
  }, [start, end, employee, office, filter]);
  const filtered = rows.filter(
      (r) =>
        (!employee || r.employeeId === employee) &&
        (!office || r.office === office) &&
        (filter === 'all' ||
          (filter === 'missing' && (r.missingCheckIn || r.missingCheckOut)) ||
          (filter === 'late' && (r.lateCheckIn || r.lateSubmission)) ||
          (filter === 'overtime' && r.overtimeState === 'pending') ||
          (filter === 'noresponse' && r.noResponse)),
    ),
    pages = Math.max(1, Math.ceil(filtered.length / 14));
  const recorded = filtered.reduce((n, r) => n + (r.recordedMinutes || 0), 0),
    scheduled = filtered.reduce((n, r) => n + (r.scheduledMinutes || 0), 0),
    unknown = filtered.filter((r) => r.scheduledMinutes === null).length,
    incomplete = filtered.filter((r) => r.recordedMinutes === null && r.record).length;
  async function exportCsv() {
    try {
      const r = await fetch(`/api/hours?action=export&team=${teamView}&start=${start}&end=${end}`);
      if (!r.ok) throw new Error('Unable to export these hours.');
      const url = URL.createObjectURL(await r.blob()),
        a = document.createElement('a');
      a.href = url;
      a.download = 'hmf-hours.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  if (correction)
    return (
      <CorrectionForm
        row={correction}
        close={() => setCorrection(null)}
        saved={() => {
          setCorrection(null);
          setRevision((r) => r + 1);
        }}
      />
    );
  return (
    <>
      <div className="page-heading">
        <h1>{teamView ? 'Team hours' : 'Your hours'}</h1>
        <button className="secondary" onClick={exportCsv} disabled={busy}>
          Export date range
        </button>
      </div>
      <div className="hours-controls">
        <label>
          Period
          <select value={mode} onChange={(e) => period(e.target.value, config.today)}>
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="custom">Custom dates</option>
          </select>
        </label>
        <label>
          From
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              setMode('custom');
            }}
          />
        </label>
        <label>
          To
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              setMode('custom');
            }}
          />
        </label>
      </div>
      {teamView && (
        <div className="hours-controls">
          <label>
            Employee
            <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
              <option value="">All authorized people</option>
              {config.people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Office
            <select value={office} onChange={(e) => setOffice(e.target.value)}>
              <option value="">All authorized offices</option>
              {config.offices.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Show
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All records</option>
              <option value="missing">Missing check-in / check-out</option>
              <option value="late">Late entries</option>
              <option value="overtime">Overtime awaiting approval</option>
              <option value="noresponse">No attendance response</option>
            </select>
          </label>
        </div>
      )}
      <Feedback error={error} />
      {error && (
        <button className="secondary" onClick={() => setRevision((r) => r + 1)}>
          Retry
        </button>
      )}
      <p className="hours-summary">
        Recorded: <strong>{amount(recorded)}</strong> · Scheduled:{' '}
        <strong>{amount(scheduled)}</strong>
        {unknown > 0 && ` · ${unknown} days with unknown scheduled hours`}
        {incomplete > 0 && ` · ${incomplete} incomplete time records`}
      </p>
      <p className="muted">
        Recorded totals include completed records only. Times are local to each record’s office. No
        hours are sent to payroll.
      </p>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Working hours"
        aria-busy={busy}
      >
        <table>
          <caption className="sr-only">Working hours for the selected period</caption>
          <thead>
            <tr>
              {teamView && <th scope="col">Employee</th>}
              <th scope="col">Date</th>
              <th scope="col">Check-in / out</th>
              <th scope="col">Recorded / scheduled</th>
              <th scope="col">Difference</th>
              <th scope="col">Review</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice((page - 1) * 14, page * 14).map((r) => (
              <tr key={r.employeeId + r.date}>
                {teamView && <td>{r.name}</td>}
                <td>{r.date}</td>
                <td>
                  {stamp(r.record?.check_in, r.timezone)}
                  <small className="sample-label">
                    {stamp(r.record?.check_out, r.timezone)} · {r.timezone}
                  </small>
                </td>
                <td>
                  {amount(r.recordedMinutes)}
                  <small className="sample-label">Scheduled {amount(r.scheduledMinutes)}</small>
                </td>
                <td>
                  {r.differenceMinutes === null
                    ? '—'
                    : (r.differenceMinutes > 0 ? '+' : '') + amount(r.differenceMinutes)}
                </td>
                <td>
                  {[
                    r.missingCheckIn ? 'Missing check-in' : '',
                    r.missingCheckOut ? 'Missing check-out' : '',
                    r.lateCheckIn ? 'Late check-in' : '',
                    r.lateSubmission ? 'Late submission' : '',
                    r.record && !r.record.check_out ? 'Open check-in' : '',
                    r.overtimeMinutes > 0
                      ? 'Overtime ' + amount(r.overtimeMinutes) + ' · ' + r.overtimeState
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' · ') ||
                    (!r.record
                      ? r.snapshot.working === false
                        ? 'Not scheduled'
                        : r.noResponse
                          ? 'No response'
                          : 'Attendance only'
                      : 'Recorded')}
                </td>
                <td>
                  <button className="secondary" onClick={() => setCorrection(r)}>
                    Request correction
                  </button>
                  {r.canReview && r.overtimeState === 'pending' && r.overtimeMinutes > 0 && (
                    <button
                      className="secondary"
                      onClick={() => {
                        setDecision(r);
                        setDecisionNote('');
                      }}
                    >
                      Review overtime
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {busy && <p role="status">Loading working hours…</p>}
      {!busy && !filtered.length && <p>No records match this view. Change the dates or filters.</p>}
      <div className="table-footer">
        <span>{filtered.length} day records</span>
        <div>
          <button className="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            {page} / {pages}
          </span>
          <button
            className="secondary"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {decision && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await hoursApi('overtimeDecision', {
                employeeId: decision.employeeId,
                date: decision.date,
                revision: decision.record.revision,
                decision: (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value'),
                reason: decisionNote,
              });
              setDecision(null);
              setRevision((r) => r + 1);
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h2>
            Review overtime · {decision.name} · {decision.date}
          </h2>
          <label>
            Decision note
            <textarea
              required
              maxLength={500}
              value={decisionNote}
              onChange={(e) => setDecisionNote(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="primary" value="approved" disabled={busy}>
              Approve
            </button>
            <button className="secondary" value="declined" disabled={busy}>
              Decline
            </button>
            <button type="button" className="secondary" onClick={() => setDecision(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <CorrectionQueue
        teamView={teamView}
        refresh={revision}
        changed={() => setRevision((r) => r + 1)}
      />
    </>
  );
}

function CorrectionForm({ row, close, saved }: { row: any; close: () => void; saved: () => void }) {
  const [clockChoice, setClockChoice] = useState('');
  function resolve(value: string) {
    const choices = wallCandidates(value, row.timezone);
    if (!choices.length)
      throw new Error(
        'This local time does not exist. Check the date, time and daylight-saving change.',
      );
    if (choices.length > 1 && !clockChoice)
      throw new Error(
        'This hour occurs twice when clocks change. Choose the first or second occurrence.',
      );
    return choices[clockChoice === 'second' ? choices.length - 1 : 0];
  }
  const [checkIn, setCheckIn] = useState(
      row.record?.check_in ? localWall(row.record.check_in, row.timezone) : '',
    ),
    [checkOut, setCheckOut] = useState(
      row.record?.check_out ? localWall(row.record.check_out, row.timezone) : '',
    ),
    [breakMinutes, setBreakMinutes] = useState(row.record?.break_minutes || 0),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await hoursApi('requestCorrection', {
        employeeId: row.employeeId,
        date: row.date,
        revision: row.record?.revision || 0,
        times: { checkIn: resolve(checkIn), checkOut: resolve(checkOut), breakMinutes },
        reason,
      });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="text-button" onClick={close}>
        ← Back to hours
      </button>
      <h1>Request a time correction</h1>
      <p>
        {row.name} · {row.date} · {row.timezone}
      </p>
      <p className="muted">
        This request will not change recorded hours until approved by another authorized person. Do
        not enter medical information.
      </p>
      <form className="employment-form" onSubmit={submit}>
        <label>
          Check-in (local time)
          <input
            type="datetime-local"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="2026-11-10T09:00:00+05:00"
          />
        </label>
        <label>
          Check-out (local time)
          <input
            type="datetime-local"
            required
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="2026-11-10T17:00:00+05:00"
          />
        </label>
        <p className="muted">
          Enter times in {row.timezone}. The portal converts them automatically.
        </p>
        <details>
          <summary>Clock changes</summary>
          <label>
            If an hour occurs twice
            <select value={clockChoice} onChange={(e) => setClockChoice(e.target.value)}>
              <option value="">Choose only if asked</option>
              <option value="first">First occurrence</option>
              <option value="second">Second occurrence</option>
            </select>
          </label>
        </details>
        <label>
          Break minutes
          <input
            type="number"
            min="0"
            step="1"
            required
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
          />
        </label>
        <label>
          Reason for correction
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <Feedback error={error} />
        <button className="primary" disabled={busy}>
          {busy ? 'Submitting…' : 'Submit correction request'}
        </button>
      </form>
    </>
  );
}
function CorrectionQueue({
  teamView,
  refresh,
  changed,
}: {
  teamView: boolean;
  refresh: number;
  changed: () => void;
}) {
  const [requests, setRequests] = useState<any[]>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [selected, setSelected] = useState<any>(null),
    [reason, setReason] = useState('');
  useEffect(() => {
    setBusy(true);
    hoursApi('corrections', undefined, '&team=' + teamView)
      .then((d) => {
        setRequests(d.requests);
        setError('');
      })
      .catch((e) => setError(e.message))
      .finally(() => setBusy(false));
  }, [teamView, refresh]);
  return (
    <section className="profile-section">
      <h2>Time correction requests</h2>
      <Feedback error={error} />
      {busy && <p role="status">Loading requests…</p>}
      {!busy && !requests.length && <p>No correction requests yet.</p>}
      {requests.map((r) => (
        <details className="workforce-disclosure" key={r.id}>
          <summary>
            {r.employee_name} · {r.date} · {r.status}
          </summary>
          <p>{r.reason}</p>
          <p>
            {stamp(r.proposed.checkIn, r.proposed.snapshot.timezone)} to{' '}
            {stamp(r.proposed.checkOut, r.proposed.snapshot.timezone)} · {r.proposed.breakMinutes}{' '}
            break minutes · {r.proposed.snapshot.timezone}
          </p>
          <p className="muted">
            Requested by {r.requester_name} · {new Date(r.created_at).toLocaleString()}
          </p>
          {r.decision_note && (
            <p>
              {r.decider_name}: {r.decision_note}
            </p>
          )}
          {r.status === 'pending' && r.canCancel && (
            <button
              className="secondary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await hoursApi('cancelCorrection', { id: r.id });
                  changed();
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Cancel request
            </button>
          )}
          {r.status === 'pending' && r.canDecide && (
            <button
              className="secondary"
              onClick={() => {
                setSelected(r);
                setReason('');
              }}
            >
              Review request
            </button>
          )}
        </details>
      ))}
      {selected && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await hoursApi('decideCorrection', {
                id: selected.id,
                decision: (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value'),
                reason,
              });
              setSelected(null);
              changed();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h3>
            Decision · {selected.employee_name} · {selected.date}
          </h3>
          <label>
            Decision note
            <textarea
              required
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="primary" value="approved" disabled={busy}>
              Approve correction
            </button>
            <button className="secondary" value="declined" disabled={busy}>
              Decline
            </button>
            <button type="button" className="secondary" onClick={() => setSelected(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export function HoursSettings() {
  const [policy, setPolicy] = useState<HoursPolicy>(defaultHoursPolicy),
    [previous, setPrevious] = useState<HoursPolicy | null>(null),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [busy, setBusy] = useState(false),
    [reason, setReason] = useState('');
  useEffect(() => {
    hoursApi('policy')
      .then((d) => {
        setPolicy(d.policy);
        setPrevious(d.policy);
      })
      .catch((e) => setError(e.message));
  }, []);
  return (
    <details className="workforce-disclosure">
      <summary>Working-hours rules</summary>
      <form
        className="employment-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError('');
          try {
            await hoursApi('policy', { policy, previous, reason });
            setPrevious({ ...policy });
            setSuccess('Hours rules saved. Existing time records retain their original rules.');
            setReason('');
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <p>Leave undecided rules blank. These settings do not send hours to payroll.</p>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.trackBreaks}
            onChange={(e) => setPolicy({ ...policy, trackBreaks: e.target.checked })}
          />
          Ask for actual break minutes at check-out
        </label>
        <label>
          Default break treatment
          <select
            value={policy.breaksPaid === null ? '' : String(policy.breaksPaid)}
            onChange={(e) =>
              setPolicy({
                ...policy,
                breaksPaid: e.target.value === '' ? null : e.target.value === 'true',
              })
            }
          >
            <option value="">Not decided</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
        </label>
        <p className="muted">
          An assigned schedule’s explicit break treatment takes precedence. Without break tracking,
          recorded time is elapsed time with no automatic deduction.
        </p>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.overtimeEnabled}
            onChange={(e) => setPolicy({ ...policy, overtimeEnabled: e.target.checked })}
          />
          Enable daily overtime above scheduled paid hours
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={policy.overtimeApproval}
            onChange={(e) => setPolicy({ ...policy, overtimeApproval: e.target.checked })}
          />
          Require a manager’s overtime approval
        </label>
        <label>
          Minimum overtime (minutes)
          <input
            type="number"
            min="1"
            max="1440"
            step="1"
            value={policy.overtimeThresholdMinutes ?? 1}
            onChange={(e) =>
              setPolicy({ ...policy, overtimeThresholdMinutes: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Late check-in grace period (minutes after scheduled start)
          <input
            type="number"
            min="0"
            max="1440"
            value={policy.graceMinutes ?? ''}
            onChange={(e) =>
              setPolicy({
                ...policy,
                graceMinutes: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </label>
        <label>
          Daily attendance submission deadline (office local time)
          <input
            type="time"
            value={policy.submissionDeadline}
            onChange={(e) => setPolicy({ ...policy, submissionDeadline: e.target.value })}
          />
        </label>
        <label>
          Reason for changing these rules
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <Feedback error={error} success={success} />
        <button className="primary" disabled={busy || !previous}>
          {busy ? 'Saving…' : 'Save hours rules'}
        </button>
      </form>
    </details>
  );
}
```

## File: `app/layout.tsx`

```
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HMF | Attendance portal',
  description:
    'HMF Engineering and Project Management Consultants — employee attendance for our UK and Pakistan teams.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

## File: `app/leave-ui.tsx`

```
'use client';

import { FocusForm } from './focus-form';
import { useEffect, useState, type FormEvent } from 'react';

type RequestRow = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  own: boolean;
  review: boolean;
  decision_note: string | null;
};
type LeaveOverview = {
  requests: RequestRow[];
  office: string;
  offices: { code: string; name: string }[];
  canEditPolicy: boolean;
  policy: {
    start: string;
    end: string;
    holidays: { date: string; name: string }[];
    allowPastRequests?: boolean;
  } | null;
  balance: {
    allowance: number | null;
    carriedForward: number | null;
    booked: number | null;
    remaining: number | null;
    pending: number | null;
    available: number | null;
    unit: string;
  };
};

async function leaveApi(body?: object, office = '') {
  const response = await fetch(
    '/api/leave' + (office ? '?office=' + encodeURIComponent(office) : ''),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      : { cache: 'no-store' },
  );
  const data = (await response.json()) as LeaveOverview & { error?: string };
  if (!response.ok) throw new Error(data.error || 'Unable to load leave.');
  return data;
}

export function LeaveView() {
  const [office, setOffice] = useState('');
  const [requests, setRequests] = useState<RequestRow[] | null>(null);
  const [overview, setOverview] = useState<LeaveOverview | null>(null);
  const [editingPolicy, setEditingPolicy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [editing, setEditing] = useState(false);
  const [review, setReview] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    leaveApi(undefined, office)
      .then((data) => {
        if (active) {
          setRequests(data.requests);
          setOverview(data);
        }
      })
      .catch((error: Error) => {
        if (active) setError(error.message);
      });
    return () => {
      active = false;
    };
  }, [revision, office]);

  async function act(body: object, confirmation: string) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await leaveApi(body);
      setMessage(confirmation);
      setEditing(false);
      setEditingPolicy(false);
      setReview(null);
      setRevision((value) => value + 1);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void act(
      {
        action: 'request',
        start: data.get('start'),
        end: data.get('end'),
        leaveType: data.get('leaveType'),
        note: data.get('note'),
      },
      'Leave request submitted.',
    );
  }

  function list(rows: RequestRow[], personal: boolean) {
    return (
      <ul className="leave-list">
        {rows.map((row) => (
          <li key={row.id}>
            <div>
              {!personal && <strong>{row.name} · </strong>}
              <strong>
                {row.start_date}
                {row.start_date !== row.end_date && ' – ' + row.end_date}
              </strong>
              <p
                className={`badge leave-status ${row.status === 'approved' ? 'present' : row.status === 'declined' ? 'absent' : row.status === 'pending' ? 'pending' : ''}`}
              >
                {row.status}
              </p>
              {row.decision_note && row.status !== 'cancelled' && <p>{row.decision_note}</p>}
            </div>
            {row.status === 'pending' && personal && (
              <button
                className="secondary"
                disabled={busy}
                onClick={() =>
                  void act({ action: 'cancelled', id: row.id }, 'Leave request cancelled.')
                }
              >
                Cancel request
              </button>
            )}
            {row.status === 'pending' && row.review && review !== row.id && (
              <button className="secondary" disabled={busy} onClick={() => setReview(row.id)}>
                Review
              </button>
            )}
            {review === row.id && row.status === 'pending' && (
              <FocusForm
                className="leave-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const decision = data.get('decision');
                  void act(
                    { action: decision, id: row.id, note: data.get('note') },
                    'Leave decision saved.',
                  );
                }}
              >
                <label>
                  Decision
                  <select name="decision">
                    <option value="approved">Approve</option>
                    <option value="declined">Decline</option>
                  </select>
                </label>
                <label>
                  Decision note
                  <textarea name="note" required maxLength={500} />
                </label>
                <div className="leave-actions">
                  <button className="primary" disabled={busy}>
                    Save decision
                  </button>
                  <button className="secondary" type="button" onClick={() => setReview(null)}>
                    Close
                  </button>
                </div>
              </FocusForm>
            )}
          </li>
        ))}
      </ul>
    );
  }

  const own = requests?.filter((row) => row.own) ?? [];
  const team = requests?.filter((row) => !row.own && row.status === 'pending') ?? [];

  return (
    <div className="leave-view">
      <div className="page-heading">
        <h1>Leave</h1>
        {!editing && (
          <button id="request-leave" className="primary" onClick={() => setEditing(true)}>
            Request leave
          </button>
        )}
      </div>
      {error && (
        <div className="error" role="alert">
          {error}{' '}
          <button
            className="secondary"
            onClick={() => {
              setError('');
              setRevision((value) => value + 1);
            }}
          >
            Refresh requests
          </button>
        </div>
      )}
      {message && <p role="status">{message}</p>}
      {overview && (
        <section className="leave-section">
          <h2>Leave balance</h2>
          <dl className="profile-values">
            {(
              [
                ['Allowance', overview.balance.allowance],
                ['Carried forward', overview.balance.carriedForward],
                ['Approved leave', overview.balance.booked],
                ['Remaining', overview.balance.remaining],
                ['Pending requests', overview.balance.pending],
                ['Available to request', overview.balance.available],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {value === null
                    ? '—'
                    : `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value)} ${overview.balance.unit}`}
                </dd>
              </div>
            ))}
          </dl>
          {overview.balance.remaining === null && (
            <p className="muted">
              A balance requires a current leave period, allowance, carry-forward amount and a
              schedule for approved leave dates. Record zero if there is no carry-forward.
            </p>
          )}
        </section>
      )}
      {editing && (
        <FocusForm restoreFocus="#request-leave" className="leave-form" onSubmit={submit}>
          <label>
            Leave type
            <select name="leaveType">
              <option value="annual_leave">Annual leave</option>
            </select>
          </label>
          <div className="form-grid">
            <label>
              Start date
              <input type="date" name="start" required />
            </label>
            <label>
              End date
              <input type="date" name="end" required />
            </label>
          </div>
          <label>
            Note (optional)
            <textarea name="note" maxLength={500} aria-describedby="leave-note-help" />
          </label>
          <small id="leave-note-help">
            Do not include medical or other sensitive personal details.
          </small>
          <div className="leave-actions">
            <button className="primary" disabled={busy}>
              Submit request
            </button>
            <button className="secondary" type="button" onClick={() => setEditing(false)}>
              Close
            </button>
          </div>
        </FocusForm>
      )}
      {team.length > 0 && (
        <section className="leave-section">
          <h2>Awaiting your review</h2>
          {list(team, false)}
        </section>
      )}
      <section className="leave-section">
        <h2>My requests</h2>
        {!requests ? (
          !error && <p role="status">Loading requests…</p>
        ) : own.length ? (
          list(own, true)
        ) : (
          <p className="muted">You haven’t requested leave yet.</p>
        )}
      </section>
      {overview && (
        <section className="leave-section">
          {overview.canEditPolicy && (
            <label>
              Office calendar
              <select
                value={overview.office}
                disabled={busy}
                onChange={(e) => {
                  setOffice(e.target.value);
                  setEditingPolicy(false);
                }}
              >
                {overview.offices.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="section-heading">
            <h2>Public holidays · {overview.office}</h2>
            {overview.canEditPolicy && !editingPolicy && (
              <button
                id="edit-calendar"
                className="secondary"
                onClick={() => setEditingPolicy(true)}
              >
                Edit office calendar
              </button>
            )}
          </div>
          {overview.policy && (
            <p className="muted">
              {overview.policy.start} – {overview.policy.end}
            </p>
          )}
          {overview.policy?.holidays.length ? (
            <ul className="leave-list">
              {overview.policy.holidays.map((holiday) => (
                <li key={holiday.date}>
                  <span>{holiday.name}</span>
                  <time dateTime={holiday.date}>{holiday.date}</time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              {overview.policy
                ? 'No holidays listed for this period.'
                : 'No leave calendar has been configured for this office.'}
            </p>
          )}
          {editingPolicy && (
            <FocusForm
              restoreFocus="#edit-calendar"
              className="leave-form"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const holidays = String(form.get('holidays'))
                  .split(/\r?\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => ({ date: line.slice(0, 10), name: line.slice(10).trim() }));
                void act(
                  {
                    action: 'savePolicy',
                    office: overview.office,
                    previous: overview.policy,
                    allowPastRequests: form.get('past') === 'on',
                    start: form.get('start'),
                    end: form.get('end'),
                    holidays,
                  },
                  'Office calendar saved.',
                );
              }}
            >
              <div className="form-grid">
                <label>
                  Leave period starts
                  <input type="date" name="start" required defaultValue={overview.policy?.start} />
                </label>
                <label>
                  Leave period ends
                  <input type="date" name="end" required defaultValue={overview.policy?.end} />
                </label>
              </div>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="past"
                  defaultChecked={overview.policy?.allowPastRequests !== false}
                />
                Allow requests for past dates
              </label>
              <label>
                Public holidays
                <textarea
                  name="holidays"
                  rows={5}
                  aria-describedby="holiday-format"
                  defaultValue={overview.policy?.holidays
                    .map((holiday) => holiday.date + ' ' + holiday.name)
                    .join('\n')}
                />
              </label>
              <small id="holiday-format">
                One per line. Use YYYY-MM-DD followed by the holiday name.
              </small>
              <div className="leave-actions">
                <button className="primary" disabled={busy}>
                  Save calendar
                </button>
                <button className="secondary" type="button" onClick={() => setEditingPolicy(false)}>
                  Close
                </button>
              </div>
            </FocusForm>
          )}
        </section>
      )}
    </div>
  );
}
```

## File: `app/lib/availability.ts`

```
import { db, type Person } from './store';

export async function availability(people: Person[], start: string, end: string) {
  const ids = JSON.stringify(people.map((p) => p.id));
  const [leave, calendars] = await Promise.all([
    db()
      .prepare(
        `SELECT r.employee_id,r.start_date,r.end_date,d.snapshot FROM leave_requests r
      LEFT JOIN leave_request_details d ON d.request_id=r.id WHERE r.status='approved'
      AND r.employee_id IN (SELECT value FROM json_each(?)) AND r.start_date<=? AND r.end_date>=?`,
      )
      .bind(ids, end, start)
      .all<{
        employee_id: string;
        start_date: string;
        end_date: string;
        snapshot: string | null;
      }>(),
    db()
      .prepare(
        "SELECT code,data FROM directory_settings WHERE kind='leave_policy' AND code IN (SELECT value FROM json_each(?))",
      )
      .bind(JSON.stringify([...new Set(people.map((p) => p.office))]))
      .all<{ code: string; data: string }>(),
  ]);
  const approved = leave.results.map((r) => ({
    ...r,
    dates: r.snapshot
      ? new Set<string>(JSON.parse(r.snapshot).days.map((d: { date: string }) => d.date))
      : null,
  }));
  const holidays = new Map(
    calendars.results.map((r) => [
      r.code,
      new Set<string>(JSON.parse(r.data).holidays.map((h: { date: string }) => h.date)),
    ]),
  );
  return (person: Person, date: string) =>
    !!holidays.get(person.office)?.has(date) ||
    approved.some(
      (r) =>
        r.employee_id === person.id &&
        (r.dates ? r.dates.has(date) : r.start_date <= date && r.end_date >= date),
    );
}
```

## File: `app/lib/conflicts.ts`

```
import { InputError } from './core';

export class ConflictError extends InputError {
  constructor(message = 'This record changed. Refresh before trying again.') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

// D1 exposes SQLite constraint names in its error/cause messages. Translate only
// our named guard here; malformed JSON and unrelated database errors stay errors.
export function databaseConflict(error: unknown): ConflictError | null {
  const visited = new Set<unknown>();
  let current = error;
  while (current && !visited.has(current)) {
    visited.add(current);
    if (current instanceof ConflictError) return current;
    if (current instanceof Error && /\bhmf_write_conflict\b/.test(current.message)) {
      return new ConflictError();
    }
    current = current instanceof Error ? current.cause : undefined;
  }
  return null;
}
```

## File: `app/lib/core.ts`

```
export type Role = 'employee' | 'manager' | 'hr_admin' | 'system_admin';
export const roles: Role[] = ['employee', 'manager', 'hr_admin', 'system_admin'];
export type Office = {
  code: string;
  name: string;
  country: string;
  timezone: string;
  active: boolean;
};
export type Status = {
  code: string;
  label: string;
  category: 'working' | 'leave' | 'absence' | 'nonworking' | 'unconfigured';
  explanation: boolean;
  approval: boolean;
  sensitive: boolean;
  enabled: boolean;
};
export type Day = {
  day: number;
  working: boolean;
  start: string;
  finish: string;
  overnight: boolean;
  breakMinutes: number;
  paidBreak: boolean | null;
  arrangement: string;
};
export type Profile = {
  telephone: string;
  jobTitle: string;
  managerId: string;
  startDate: string;
  endDate: string;
  employmentStatus: string;
  employmentType: string;
  weeklyMinutes: number | null;
  timezone: string;
  holidayAllowance: number | null;
  carriedForward: number | null;
  holidayUnit: string;
};
export const defaultOffices: Office[] = [
  { code: 'UK', name: 'United Kingdom', country: 'UK', timezone: 'Europe/London', active: true },
  { code: 'PK', name: 'Pakistan', country: 'PK', timezone: 'Asia/Karachi', active: true },
];
export const defaultDepartments = [
  'Electrical Engineering',
  'Project Management',
  'Civil Engineering',
  'Grid Connections',
  'Management',
];
export const defaultStatuses: Status[] = [
  {
    code: 'present',
    label: 'Working in the office',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'remote',
    label: 'Working remotely',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'client',
    label: 'Working at a client site',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'travel',
    label: 'Business travel',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'training',
    label: 'Training',
    category: 'working',
    explanation: false,
    approval: false,
    sensitive: false,
    enabled: true,
  },
  {
    code: 'absent',
    label: 'Absent',
    category: 'absence',
    explanation: false,
    approval: false,
    sensitive: true,
    enabled: true,
  },
  {
    code: 'other',
    label: 'Other',
    category: 'unconfigured',
    explanation: true,
    approval: false,
    sensitive: true,
    enabled: true,
  },
  ...[
    ['annual_leave', 'Annual leave', 'leave'],
    ['sick_leave', 'Sick leave', 'absence'],
    ['authorized_absence', 'Authorized absence', 'absence'],
    ['unpaid_leave', 'Unpaid leave', 'leave'],
    ['not_scheduled', 'Not scheduled to work', 'nonworking'],
  ].map(([code, label, category]) => ({
    code,
    label,
    category: category as Status['category'],
    explanation: false,
    approval: true,
    sensitive: true,
    enabled: false,
  })),
];
export const blankProfile: Profile = {
  telephone: '',
  jobTitle: '',
  managerId: '',
  startDate: '',
  endDate: '',
  employmentStatus: 'active',
  employmentType: '',
  weeklyMinutes: null,
  timezone: '',
  holidayAllowance: null,
  carriedForward: null,
  holidayUnit: 'days',
};
export const blankDays: Day[] = Array.from({ length: 7 }, (_, day) => ({
  day,
  working: false,
  start: '',
  finish: '',
  overnight: false,
  breakMinutes: 0,
  paidBreak: null,
  arrangement: 'office',
}));
export class InputError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function requireValue(ok: unknown, message: string, status = 400): asserts ok {
  if (!ok) throw new InputError(message, status);
}
export function textValue(value: unknown, max = 200, required = false) {
  requireValue(typeof value === 'string', 'Enter text in this field.');
  const v = value.trim();
  requireValue(
    v.length <= max && (!required || !!v),
    required ? 'Complete required fields within the stated limits.' : 'This value is too long.',
  );
  return v;
}
export function validDate(s: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number.isFinite(Date.parse(s)) &&
    new Date(s + 'T12:00:00Z').toISOString().slice(0, 10) === s
  );
}
export function dayInZone(zone: string, now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}
export function validZone(zone: string) {
  try {
    new Intl.DateTimeFormat('en', { timeZone: zone }).format();
    return true;
  } catch {
    return false;
  }
}
export function numeric(value: unknown, max: number, integer = false): number | null {
  if (value === null || value === '') return null;
  requireValue(
    typeof value === 'number' &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= max &&
      (!integer || Number.isInteger(value)),
    'Enter a valid non-negative number.',
  );
  return value;
}
export function validateProfile(input: unknown): Profile {
  requireValue(input && typeof input === 'object', 'Employee details are required.');
  const p = input as Profile;
  const result: Profile = {
    telephone: textValue(p.telephone, 40),
    jobTitle: textValue(p.jobTitle, 120),
    managerId: textValue(p.managerId, 60),
    startDate: textValue(p.startDate, 10),
    endDate: textValue(p.endDate, 10),
    employmentStatus: textValue(p.employmentStatus, 20),
    employmentType: textValue(p.employmentType, 20),
    weeklyMinutes: numeric(p.weeklyMinutes, 10080, true),
    timezone: textValue(p.timezone, 80),
    holidayAllowance: numeric(p.holidayAllowance, 10000),
    carriedForward: numeric(p.carriedForward, 10000),
    holidayUnit: textValue(p.holidayUnit, 10),
  };
  requireValue(
    ['active', 'inactive', 'suspended', 'former'].includes(result.employmentStatus),
    'Choose an employment status.',
  );
  requireValue(
    ['', 'full-time', 'part-time', 'temporary', 'contractor'].includes(result.employmentType),
    'Choose an employment type.',
  );
  requireValue(
    ['days', 'hours'].includes(result.holidayUnit),
    'Choose days or hours for holiday allowance.',
  );
  requireValue(!result.timezone || validZone(result.timezone), 'Choose a valid time zone.');
  requireValue(
    !result.startDate || validDate(result.startDate),
    'Enter a valid employment start date.',
  );
  requireValue(!result.endDate || validDate(result.endDate), 'Enter a valid employment end date.');
  requireValue(
    !result.startDate || !result.endDate || result.endDate >= result.startDate,
    'The final employment date must follow the start date.',
  );
  return result;
}
export function validateDays(input: unknown): Day[] {
  requireValue(
    Array.isArray(input) && input.length === 7,
    'A schedule must describe all seven days.',
  );
  const days = input.map((d, i) => {
    requireValue(
      d && d.day === i && typeof d.working === 'boolean',
      'Schedule days must run from Sunday to Saturday.',
    );
    if (!d.working) return { ...blankDays[i] };
    requireValue(
      typeof d.start === 'string' &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(d.start) &&
        typeof d.finish === 'string' &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(d.finish),
      'Enter a start and finish time for every working day.',
    );
    requireValue(
      typeof d.overnight === 'boolean' && [true, false, null].includes(d.paidBreak),
      'Choose the break and overnight rules.',
    );
    const breakMinutes = numeric(d.breakMinutes, 1439, true);
    requireValue(breakMinutes !== null, 'Enter a break duration, including zero.');
    requireValue(
      ['office', 'remote', 'hybrid', 'client-site'].includes(d.arrangement),
      'Choose a working arrangement.',
    );
    const row: Day = {
      day: i,
      working: true,
      start: d.start,
      finish: d.finish,
      overnight: d.overnight,
      breakMinutes,
      paidBreak: d.paidBreak,
      arrangement: d.arrangement,
    };
    const duration = span(row);
    requireValue(
      duration > 0 && duration <= 1440,
      'Finish must be after start. Select next day for an overnight shift.',
    );
    requireValue(breakMinutes < duration, 'A break must be shorter than the shift.');
    return row;
  });
  for (let i = 0; i < 7; i++) {
    const d = days[i],
      next = days[(i + 1) % 7];
    if (d.working && d.overnight && next.working)
      requireValue(
        clock(d.finish) <= clock(next.start),
        'Overnight shifts must not overlap the following day.',
      );
  }
  return days;
}
const clock = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export const span = (d: Day) =>
  d.working ? clock(d.finish) - clock(d.start) + (d.overnight ? 1440 : 0) : 0;
export const paidMinutes = (d: Day) =>
  !d.working
    ? 0
    : d.breakMinutes > 0 && d.paidBreak === null
      ? null
      : span(d) - (d.paidBreak ? 0 : d.breakMinutes);
export function weeklyMinutes(days: Day[]) {
  const values = days.map(paidMinutes);
  return values.some((v) => v === null) ? null : values.reduce<number>((s, v) => s + (v || 0), 0);
}
export type Schedule = {
  id: string;
  series_id: string;
  employee_id: string | null;
  name: string;
  kind: string;
  start_date: string | null;
  end_date: string | null;
  days: Day[];
  template_id: string | null;
  reason: string;
  created_by: string;
  created_at: string;
};
export function currentVersions(schedules: Schedule[]) {
  const seen = new Set<string>();
  return [...schedules]
    .sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))
    .filter((s) => !seen.has(s.series_id) && !!seen.add(s.series_id));
}
export function effectiveSchedule(schedules: Schedule[], date: string) {
  const current = currentVersions(schedules)
    .filter((s) => s.kind !== 'template' && s.start_date! <= date)
    .sort(
      (a, b) =>
        b.start_date!.localeCompare(a.start_date!) || b.created_at.localeCompare(a.created_at),
    );
  const temporary = current.find((s) => s.kind === 'temporary' && s.end_date! >= date);
  if (temporary) return temporary;
  const normal = current.find((s) => s.kind === 'base');
  return normal && (!normal.end_date || normal.end_date >= date) ? normal : null;
}
export const csvCell = (v: unknown) =>
  typeof v === 'number' && Number.isFinite(v)
    ? String(v)
    : '"' +
      String(v ?? '')
        .replace(/^[\s]*[=+@\-]/, "'$&")
        .replace(/^[\t\r]/, "'$&")
        .replace(/"/g, '""') +
      '"';
export function csv(rows: unknown[][]) {
  return '\uFEFF' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
}
export const importColumns = [
  'id',
  'name',
  'email',
  'office',
  'department',
  'jobTitle',
  'managerId',
  'employmentType',
  'startDate',
  'weeklyHours',
  'timezone',
];
export function sameValue(a: unknown, b: unknown): boolean {
  const stable = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(stable)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.entries(value)
              .sort(([x], [y]) => x.localeCompare(y))
              .map(([k, v]) => [k, stable(v)]),
          )
        : value;
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}
export function parseCsv(input: string): Record<string, string>[] {
  requireValue(input.length <= 200000, 'Import a CSV smaller than 200 KB.');
  const rows: string[][] = [];
  let row: string[] = [],
    field = '',
    quoted = false;
  input = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') {
        field += '"';
        i++;
      } else if (quoted) {
        quoted = false;
        requireValue(
          [',', '\n', '\r', undefined].includes(input[i + 1]),
          'Invalid quoted CSV field.',
        );
      } else {
        requireValue(!field, 'Invalid quote in CSV.');
        quoted = true;
      }
    } else if (c === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  requireValue(!quoted, 'Close all quoted CSV fields.');
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const headers = rows.shift()?.map((s) => s.trim());
  requireValue(
    headers && headers.length && new Set(headers).size === headers.length,
    'CSV headers must be unique.',
  );
  requireValue(
    ['id', 'name', 'email', 'office', 'department'].every((h) => headers.includes(h)) &&
      headers.every((h) => importColumns.includes(h)),
    'Use the downloadable CSV template. Unsupported columns cannot be imported.',
  );
  requireValue(
    rows.length > 0 && rows.length <= 50,
    'Import between 1 and 50 employees at a time.',
  );
  return rows.map((r, i) => {
    requireValue(r.length === headers.length, `Row ${i + 2} has the wrong number of columns.`);
    return Object.fromEntries(headers.map((h, n) => [h, r[n].trim()]));
  });
}
```

## File: `app/lib/hours.ts`

```
import {
  dayInZone,
  effectiveSchedule,
  paidMinutes,
  requireValue,
  validDate,
  type Schedule,
} from './core';
export type HoursPolicy = {
  trackBreaks: boolean;
  breaksPaid: boolean | null;
  overtimeEnabled: boolean;
  overtimeApproval: boolean;
  graceMinutes: number | null;
  submissionDeadline: string;
  overtimeThresholdMinutes?: number;
};
export const defaultHoursPolicy: HoursPolicy = {
  trackBreaks: false,
  breaksPaid: null,
  overtimeEnabled: false,
  overtimeApproval: true,
  graceMinutes: null,
  submissionDeadline: '',
};
export type WorkRecord = {
  employee_id: string;
  date: string;
  check_in: string;
  check_out: string | null;
  break_minutes: number;
  snapshot: string;
  revision: number;
  employee_note: string;
  manager_note: string;
  overtime_state: string;
  updated_at: string;
};
export type WorkSnapshot = {
  timezone: string;
  scheduleId: string | null;
  scheduledMinutes: number | null;
  working: boolean | null;
  start: string;
  finish: string;
  overnight: boolean;
  policy: HoursPolicy;
};
export function snapshotFor(
  versions: Schedule[],
  date: string,
  timezone: string,
  policy: HoursPolicy,
): WorkSnapshot {
  const schedule = effectiveSchedule(versions, date),
    day = schedule?.days[new Date(date + 'T12:00:00Z').getUTCDay()];
  return {
    timezone,
    scheduleId: schedule?.id || null,
    scheduledMinutes: day ? paidMinutes(day) : null,
    working: day?.working ?? null,
    start: day?.start || '',
    finish: day?.finish || '',
    overnight: day?.overnight || false,
    policy: {
      ...policy,
      breaksPaid:
        day && day.breakMinutes > 0 && day.paidBreak !== null ? day.paidBreak : policy.breaksPaid,
    },
  };
}
export function localMinutes(instant: string, zone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(instant));
  return (
    Number(parts.find((x) => x.type === 'hour')!.value) * 60 +
    Number(parts.find((x) => x.type === 'minute')!.value)
  );
}
const clock = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export function localWall(instant: string, zone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(instant));
  const get = (k: string) => parts.find((p) => p.type === k)!.value;
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}
export function wallCandidates(value: string, zone: string) {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(value) || !Number.isFinite(Date.parse(value + 'Z')))
    return [];
  const candidates: string[] = [];
  for (let offset = -840; offset <= 840; offset += 15) {
    const instant = new Date(Date.parse(value + 'Z') - offset * 60000).toISOString();
    if (localWall(instant, zone) === value) candidates.push(instant);
  }
  return candidates.sort();
}
export function dayDifference(a: string, b: string) {
  return Math.round((Date.parse(a + 'T00:00:00Z') - Date.parse(b + 'T00:00:00Z')) / 86400000);
}
export function metrics(
  record: WorkRecord | null,
  snapshot: WorkSnapshot,
  date: string,
  at = new Date(),
  submittedAt?: string,
  excused = false,
) {
  const elapsed = record?.check_out
    ? (Date.parse(record.check_out) - Date.parse(record.check_in)) / 60000
    : null;
  const recorded =
    elapsed === null
      ? null
      : record!.break_minutes > 0 && snapshot.policy.breaksPaid === null
        ? null
        : Math.max(
            0,
            Math.round(
              elapsed - (snapshot.policy.breaksPaid === false ? record!.break_minutes : 0),
            ),
          );
  const difference =
    recorded === null || snapshot.scheduledMinutes === null
      ? null
      : recorded - snapshot.scheduledMinutes;
  const localDate = dayInZone(snapshot.timezone, at),
    sinceStart =
      dayDifference(localDate, date) * 1440 + localMinutes(at.toISOString(), snapshot.timezone);
  const finished =
    snapshot.working && !!snapshot.finish
      ? sinceStart > clock(snapshot.finish) + (snapshot.overnight ? 1440 : 0)
      : localDate > date;
  const lateCheckIn =
    record && snapshot.working && snapshot.start && snapshot.policy.graceMinutes !== null
      ? dayDifference(dayInZone(snapshot.timezone, new Date(record.check_in)), date) * 1440 +
          localMinutes(record.check_in, snapshot.timezone) >
        clock(snapshot.start) + snapshot.policy.graceMinutes
      : null;
  const lateSubmission =
    submittedAt && snapshot.policy.submissionDeadline
      ? dayDifference(dayInZone(snapshot.timezone, new Date(submittedAt)), date) * 1440 +
          localMinutes(submittedAt, snapshot.timezone) >
        clock(snapshot.policy.submissionDeadline)
      : null;
  const overtime =
    snapshot.policy.overtimeEnabled && difference !== null
      ? difference >= (snapshot.policy.overtimeThresholdMinutes ?? 1)
        ? difference
        : 0
      : null;
  return {
    scheduledMinutes: snapshot.scheduledMinutes,
    recordedMinutes: recorded,
    differenceMinutes: difference,
    overtimeMinutes: overtime,
    overtimeState:
      overtime === null
        ? 'disabled'
        : overtime === 0
          ? 'none'
          : snapshot.policy.overtimeApproval
            ? record?.overtime_state || 'pending'
            : 'not_required',
    missingCheckIn: !excused && !!snapshot.working && !record && !!finished,
    missingCheckOut: !excused && !!record && !record.check_out && !!finished,
    lateCheckIn: !!lateCheckIn,
    lateSubmission: !!lateSubmission,
    lateRuleConfigured: snapshot.policy.graceMinutes !== null,
    submissionRuleConfigured: !!snapshot.policy.submissionDeadline,
  };
}
export function dateRange(start: string, end: string) {
  requireValue(
    validDate(start) && validDate(end) && end >= start && dayDifference(end, start) <= 61,
    'Choose a date range of no more than 62 days.',
  );
  return Array.from({ length: dayDifference(end, start) + 1 }, (_, i) =>
    new Date(Date.parse(start + 'T12:00:00Z') + i * 86400000).toISOString().slice(0, 10),
  );
}
export function validateTimes(value: any, date: string, timezone: string) {
  requireValue(value && typeof value === 'object', 'Enter the corrected times.');
  const checkIn = String(value.checkIn || ''),
    checkOut = String(value.checkOut || '');
  requireValue(
    /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|[+-]\d\d:\d\d)$/.test(checkIn) &&
      Number.isFinite(Date.parse(checkIn)),
    'Check-in must include a UTC offset.',
  );
  requireValue(
    /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|[+-]\d\d:\d\d)$/.test(checkOut) &&
      Number.isFinite(Date.parse(checkOut)),
    'Check-out must include a UTC offset.',
  );
  requireValue(
    Date.parse(checkOut) > Date.parse(checkIn) && Date.parse(checkOut) <= Date.now(),
    'Check-out must be after check-in and cannot be in the future.',
  );
  requireValue(
    Date.parse(checkOut) - Date.parse(checkIn) <= 24 * 60 * 60000,
    'A corrected interval cannot exceed 24 hours.',
  );
  requireValue(
    dayInZone(timezone, new Date(checkIn)) === date,
    'Check-in must fall on the selected working date in the employee’s time zone.',
  );
  requireValue(
    Number.isInteger(value.breakMinutes) &&
      value.breakMinutes >= 0 &&
      value.breakMinutes < (Date.parse(checkOut) - Date.parse(checkIn)) / 60000,
    'Break duration must be non-negative and shorter than the recorded time.',
  );
  return {
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    breakMinutes: value.breakMinutes,
  };
}
```

## File: `app/lib/leave.ts`

```
import { effectiveSchedule, paidMinutes, requireValue, validDate, type Schedule } from './core';

export type LeavePolicy = {
  start: string;
  end: string;
  holidays: { date: string; name: string }[];
  allowPastRequests?: boolean;
};
export type LeaveCharge = {
  unit: string;
  start: string;
  end: string;
  days: { date: string; amount: number }[];
};

export function leaveDates(start: string, end: string) {
  requireValue(
    validDate(start) &&
      validDate(end) &&
      start <= end &&
      (Date.parse(end) - Date.parse(start)) / 86400000 < 366,
    'Choose a valid date range of no more than 366 days.',
  );
  return Array.from({ length: (Date.parse(end) - Date.parse(start)) / 86400000 + 1 }, (_, i) =>
    new Date(Date.parse(start + 'T12:00:00Z') + i * 86400000).toISOString().slice(0, 10),
  );
}

export function chargeLeave(
  start: string,
  end: string,
  unit: string,
  policy: LeavePolicy,
  versions: Schedule[],
): LeaveCharge {
  requireValue(
    unit === 'days' || unit === 'hours',
    'Choose days or hours for the leave entitlement.',
  );
  const dates = leaveDates(start, end);
  requireValue(
    start >= policy.start && end <= policy.end,
    'Choose dates within the configured leave period.',
  );
  const holidays = new Set(policy.holidays.map((h) => h.date));
  const days = dates.flatMap((date) => {
    if (holidays.has(date)) return [];
    const schedule = effectiveSchedule(versions, date);
    const shift = schedule?.days[new Date(date + 'T12:00:00Z').getUTCDay()];
    requireValue(
      shift,
      'A work schedule is required for every requested date. Ask your administrator.',
    );
    if (!shift.working) return [];
    const minutes = paidMinutes(shift);
    requireValue(
      unit === 'days' || minutes !== null,
      'Configure paid hours and break rules before requesting hourly entitlement.',
    );
    return [{ date, amount: unit === 'days' ? 1 : minutes! / 60 }];
  });
  return { unit, start: policy.start, end: policy.end, days };
}

export const chargeTotal = (charge: LeaveCharge) =>
  Math.round(charge.days.reduce((sum, day) => sum + day.amount, 0) * 1000000) / 1000000;
```

## File: `app/lib/store.ts`

```
import { env } from 'cloudflare:workers';
import {
  blankProfile,
  defaultDepartments,
  defaultOffices,
  defaultStatuses,
  dayInZone,
  requireValue,
  type Office,
  type Profile,
  type Role,
  type Schedule,
  type Status,
} from './core';

export type Account = {
  id: string;
  name: string;
  email: string;
  office: string;
  department: string;
  role: string;
  password_hash: string;
  salt: string;
  active: number;
};
export type Person = Omit<Account, 'password_hash' | 'salt'> & {
  profile: Profile;
  roles: Role[];
  officeScope: string[];
  revision: number;
  createdAt: string | null;
  updatedAt: string | null;
  timezone: string;
};
export function db() {
  if (!env.DB) throw new Error('Database unavailable');
  return env.DB;
}
export const hex = (a: ArrayBuffer) =>
  Array.from(new Uint8Array(a), (b) => b.toString(16).padStart(2, '0')).join('');
export async function digest(s: string) {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
}
export async function passwordHash(s: string, salt: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(s), 'PBKDF2', false, [
    'deriveBits',
  ]);
  return hex(
    await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' },
      key,
      256,
    ),
  );
}
export function sessionToken(req: Request) {
  return (
    (req.headers.get('cookie') || '')
      .split(';')
      .map((s) => s.trim())
      .find((s) => s.startsWith('hmf_session='))
      ?.slice(12) || ''
  );
}
export async function account(req: Request, ownerId: string) {
  const token = sessionToken(req);
  if (!token) return null;
  return db()
    .prepare(
      'SELECT e.* FROM sessions s JOIN employees e ON e.id=s.employee_id WHERE s.token_hash=? AND s.owner_id=? AND s.expires_at>? AND e.active=1',
    )
    .bind(await digest(token), ownerId, Date.now())
    .first<Account>();
}
export async function settings() {
  const result = (
    await db()
      .prepare('SELECT * FROM directory_settings')
      .all<{ kind: string; code: string; data: string }>()
  ).results;
  const combine = <T extends { code: string }>(kind: string, defaults: T[]) =>
    Array.from(
      new Map(
        [
          ...defaults,
          ...result.filter((r) => r.kind === kind).map((r) => JSON.parse(r.data) as T),
        ].map((r) => [r.code, r]),
      ).values(),
    );
  return {
    offices: combine<Office>('office', defaultOffices),
    departments: combine(
      'department',
      defaultDepartments.map((name) => ({ code: name, name, active: true })),
    ),
    statuses: combine<Status>('status', defaultStatuses),
  };
}
export async function directory() {
  const [rows, config] = await Promise.all([
    db()
      .prepare(
        'SELECT e.*,p.data AS profile_data,p.revision,p.created_at,p.updated_at,g.roles AS grant_roles,g.offices AS grant_offices FROM employees e LEFT JOIN employee_profiles p ON p.employee_id=e.id LEFT JOIN access_grants g ON g.employee_id=e.id ORDER BY e.name',
      )
      .all<
        Account & {
          profile_data: string | null;
          revision: number | null;
          created_at: string | null;
          updated_at: string | null;
          grant_roles: string | null;
          grant_offices: string | null;
        }
      >(),
    settings(),
  ]);
  return rows.results.map((e) => {
    // Only the pre-existing fictional ADMIN account receives the dual-role demo bridge.
    const legacyAdmin = e.id === 'ADMIN' && e.role === 'admin' && e.email === 'admin@hmf.example';
    const roleList: Role[] = e.grant_roles
      ? JSON.parse(e.grant_roles)
      : legacyAdmin
        ? ['employee', 'hr_admin', 'system_admin']
        : ['employee'];
    const profile: Profile = {
      ...blankProfile,
      employmentStatus: e.active ? 'active' : 'inactive',
      ...(e.profile_data ? JSON.parse(e.profile_data) : {}),
    };
    const {
      password_hash: _hash,
      salt: _salt,
      profile_data: _p,
      grant_roles: _r,
      grant_offices: _o,
      ...base
    } = e;
    return {
      id: base.id,
      name: base.name,
      email: base.email,
      office: base.office,
      department: base.department,
      active: base.active,
      role: roleList.includes('system_admin')
        ? 'system_admin'
        : roleList.includes('hr_admin')
          ? 'hr_admin'
          : roleList.includes('manager')
            ? 'manager'
            : 'employee',
      roles: roleList,
      officeScope: e.grant_offices
        ? JSON.parse(e.grant_offices)
        : legacyAdmin
          ? config.offices.map((o) => o.code)
          : [],
      profile,
      revision: e.revision || 0,
      createdAt: e.created_at,
      updatedAt: e.updated_at,
      timezone:
        profile.timezone || config.offices.find((o) => o.code === e.office)?.timezone || 'UTC',
    } as Person;
  });
}
export const system = (p: Person) => p.roles.includes('system_admin');
export const hr = (p: Person) => p.roles.includes('hr_admin');
export const manages = (p: Person) => system(p) || hr(p);
export const team = (p: Person) => manages(p) || p.roles.includes('manager');
export function scope(actor: Person, target: Person) {
  return (
    actor.id === target.id ||
    system(actor) ||
    (hr(actor) && actor.officeScope.includes(target.office)) ||
    (actor.roles.includes('manager') && target.profile.managerId === actor.id)
  );
}
export const employmentAccess = (actor: Person, target: Person) =>
  actor.id !== target.id &&
  (system(actor) || (!system(target) && hr(actor) && actor.officeScope.includes(target.office)));
export const sensitiveAccess = (actor: Person, target: Person) =>
  actor.id === target.id || (hr(actor) && actor.officeScope.includes(target.office));
export function safePerson(actor: Person, target: Person) {
  const own = actor.id === target.id,
    full = own || employmentAccess(actor, target);
  return {
    ...target,
    officeScope: system(actor) || own ? target.officeScope : [],
    profile: full
      ? target.profile
      : {
          ...blankProfile,
          jobTitle: target.profile.jobTitle,
          managerId: target.profile.managerId,
          employmentStatus: target.profile.employmentStatus,
          weeklyMinutes: target.profile.weeklyMinutes,
          timezone: target.profile.timezone,
        },
  };
}
export const publicPerson = (p: Person) => ({
  id: p.id,
  name: p.name,
  email: p.email,
  office: p.office,
  department: p.department,
  role: p.role,
  roles: p.roles,
  timezone: p.timezone,
  canManagePeople: manages(p),
  canConfigure: system(p),
  canViewTeam: team(p),
});
export async function context(req: Request, ownerId: string) {
  const a = await account(req, ownerId);
  if (!a) return null;
  const people = await directory(),
    me = people.find((p) => p.id === a.id);
  if (
    !me ||
    me.profile.employmentStatus !== 'active' ||
    (me.profile.endDate && me.profile.endDate < dayInZone(me.timezone))
  )
    return null;
  return { me, people };
}
export const now = () => new Date().toISOString();
export function audit(
  actorId: string,
  employeeId: string | null,
  action: string,
  before: unknown,
  after: unknown,
  reason: string,
  source = 'portal',
) {
  return db()
    .prepare(
      'INSERT INTO audit_events(id,employee_id,actor_id,action,before_value,after_value,reason,source,created_at) VALUES (?,?,?,?,?,?,?,?,?)',
    )
    .bind(
      crypto.randomUUID(),
      employeeId,
      actorId,
      action,
      before === null ? null : JSON.stringify(before),
      after === null ? null : JSON.stringify(after),
      reason,
      source,
      now(),
    );
}
export function revisionGuard(id: string, revision: number) {
  return db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN COALESCE((SELECT revision FROM employee_profiles WHERE employee_id=?),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(id, revision);
}
export function directoryGuard(people: Person[]) {
  return db()
    .prepare(
      "INSERT INTO write_guards(id,valid) VALUES ('guard',CASE WHEN (SELECT COUNT(*) FROM employees)+COALESCE((SELECT SUM(revision) FROM employee_profiles),0)=? THEN 1 ELSE 0 END) ON CONFLICT(id) DO UPDATE SET valid=excluded.valid",
    )
    .bind(people.length + people.reduce((n, p) => n + p.revision, 0));
}
export async function schedules(id: string | null) {
  const r = await db()
    .prepare(
      id
        ? 'SELECT * FROM schedule_versions WHERE employee_id=? ORDER BY created_at DESC,id DESC'
        : 'SELECT * FROM schedule_versions WHERE employee_id IS NULL ORDER BY created_at DESC,id DESC',
    )
    .bind(...(id ? [id] : []))
    .all<Omit<Schedule, 'days'> & { days: string }>();
  return r.results.map((s) => ({ ...s, days: JSON.parse(s.days) }));
}
export async function attendanceRows(actor: Person, target: Person, date?: string) {
  requireValue(scope(actor, target), 'You do not have access to this employee.', 403);
  const rows = (
    await db()
      .prepare(
        `SELECT a.*,d.definition,d.approval,d.decided_by,d.decided_at,d.decision_note FROM attendance a LEFT JOIN attendance_details d ON d.employee_id=a.employee_id AND d.date=a.date WHERE a.employee_id=? ${date ? 'AND a.date=?' : ''} ORDER BY a.date DESC LIMIT 90`,
      )
      .bind(target.id, ...(date ? [date] : []))
      .all<Record<string, any>>()
  ).results;
  return rows.map((row) => redactAttendance(actor, target, row));
}
export function redactAttendance(
  actor: Person,
  target: Person,
  row: Record<string, any>,
): Record<string, any> {
  const legacy =
    defaultStatuses.find((s) => s.code === row.status) ||
    defaultStatuses.find((s) => s.code === 'other')!;
  const definition: Status & { timezone?: string } = row.definition
    ? JSON.parse(row.definition)
    : { ...legacy, label: row.status === 'present' ? 'Present' : legacy.label };
  const sensitive = definition.sensitive || ['absent', 'other', 'sick_leave'].includes(row.status);
  const allowed = sensitiveAccess(actor, target);
  return {
    ...row,
    status: sensitive && !allowed ? 'unavailable' : row.status,
    label: sensitive && !allowed ? 'Unavailable' : definition.label,
    reason: sensitive && !allowed ? '' : row.reason,
    decision_note: sensitive && !allowed ? '' : row.decision_note,
    timezone:
      definition.timezone ||
      defaultOffices.find((o) => o.code === row.office)?.timezone ||
      target.timezone,
    definition: undefined,
    category: sensitive && !allowed ? null : definition.category,
    approval: sensitive && !allowed ? null : row.approval || 'not_required',
    decided_by: sensitive && !allowed ? null : row.decided_by,
    decided_at: sensitive && !allowed ? null : row.decided_at,
  };
}
```

## File: `app/page.tsx`

```
import Portal from './portal';
import { requireChatGPTUser } from './chatgpt-auth';
export const dynamic = 'force-dynamic';
export default async function Home() {
  await requireChatGPTUser('/');
  return <Portal />;
}
```

## File: `app/portal.tsx`

```
'use client';
import { useEffect, useRef, useState } from 'react';
import { WorkClock, HoursView } from './hours-ui';
import { LeaveView } from './leave-ui';
import { Reports } from './reports';
import {
  WorkforceProvider,
  People,
  ProfileView,
  ScheduleView,
  WorkforceSettings,
  PrivacyNotice,
  useWorkforce,
  workforce,
  roleLabel,
} from './workforce';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  X,
  CircleHelp,
  Users,
  LayoutDashboard,
  CalendarDays,
  Building2,
  LogOut,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock3,
  ShieldCheck,
  Globe2,
  RefreshCw,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  FileCheck2,
  Info,
  Menu,
} from 'lucide-react';
type User = {
  id: string;
  name: string;
  email: string;
  office: string;
  department: string;
  role: string;
  roles: string[];
  timezone: string;
  canManagePeople: boolean;
  canConfigure: boolean;
  canViewTeam: boolean;
};
type Row = User & {
  label?: string;
  approval?: string;
  status: string;
  reason: string;
  submitted_at: string | null;
  updated_at: string | null;
  source: string | null;
};
type RecordRow = {
  timezone?: string;
  label?: string;
  approval?: string;
  date: string;
  status: string;
  reason: string;
  submitted_at: string;
  updated_at: string;
  source: string;
  office: string;
};
type Audit = {
  id: string;
  date: string;
  status: string;
  previous_status: string | null;
  actor_name: string;
  reason: string;
  changed_at: string;
};
type AccessEvent = { id: string; event: string; occurred_at: string; office: string };
type ApiData = {
  user: User;
  today: string;
  officeDates: Record<string, string>;
  rows: Row[];
  records: RecordRow[];
  audits: Audit[];
  accessEvents: AccessEvent[];
  date: string;
  refreshedAt: string;
  error?: string;
  signIn?: boolean;
};
const officeName = (o: string) => (o === 'PK' ? 'Pakistan' : o === 'UK' ? 'United Kingdom' : o);
const zone = (o: string) => (o === 'PK' ? 'Asia/Karachi' : 'Europe/London');
const labels: Record<string, string> = {
  present: 'Present',
  absent: 'Absent',
  other: 'Other',
  pending: 'No response',
};
const dateLabel = (d: string, short = false) =>
  d
    ? new Date(d + 'T12:00:00Z').toLocaleDateString(
        'en-GB',
        short
          ? { day: 'numeric', month: 'short' }
          : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
      )
    : '';
const timeLabel = (t: string | null, o: string, timezone?: string) =>
  t
    ? new Date(t).toLocaleTimeString('en-GB', {
        timeZone: timezone || zone(o),
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';
const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((x) => x[0])
    .join('');
function Badge({ status, label }: { status: string; label?: string }) {
  const { config } = useWorkforce();
  return (
    <span className={'badge ' + status}>
      <i />
      {label ||
        config.statuses.find((s) => s.code === status)?.label ||
        labels[status] ||
        (status === 'unavailable' ? 'Unavailable' : status)}
    </span>
  );
}
function Avatar({ name, office }: { name: string; office: string }) {
  return <span className={'avatar ' + (office === 'PK' ? 'mint' : '')}>{initials(name)}</span>;
}
async function api(action: string, body?: object, query = '') {
  const response = await fetch(
    '/api/portal' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...body }),
        }
      : { cache: 'no-store' },
  );
  const data = (await response.json()) as ApiData;
  if (!response.ok) {
    if (data.signIn) window.location.assign('/signin-with-chatgpt?return_to=/');
    throw new Error(data.error || 'Please sign in again.');
  }
  return data;
}
export default function Portal() {
  const [me, setMe] = useState<User | null>(null),
    [loading, setLoading] = useState(true),
    [fatal, setFatal] = useState(''),
    [today, setToday] = useState(''),
    [officeDates, setOfficeDates] = useState<Record<string, string>>({});
  useEffect(() => {
    fetch('/api/portal?action=me', { cache: 'no-store' })
      .then(async (r) => {
        const d = (await r.json()) as ApiData;
        if (d.user) {
          setMe(d.user);
          setToday(d.today);
          setOfficeDates(d.officeDates);
        } else if (r.status !== 401) setFatal(d.error || 'Unable to load the portal.');
      })
      .catch(() => setFatal('Unable to reach the attendance service. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);
  async function logout() {
    try {
      await api('logout', {});
      setMe(null);
    } catch (e) {
      setFatal((e as Error).message);
    }
  }
  if (loading)
    return (
      <div className="loading-screen">
        <Logo />
        <span className="spinner" />
        <p>Opening your workspace…</p>
      </div>
    );
  if (!me)
    return (
      <Login
        onLogin={(d) => {
          setMe(d.user);
          setToday(d.today);
          setOfficeDates(d.officeDates);
          setFatal('');
        }}
        initialError={fatal}
      />
    );
  return (
    <WorkforceProvider>
      <Workspace me={me} today={today} officeDates={officeDates} logout={logout} fatal={fatal} />
    </WorkforceProvider>
  );
}
function Logo() {
  return (
    <img
      className="logo"
      src="/hmf-logo.png"
      alt="HMF — Engineering and Project Management Consultants"
    />
  );
}
function Login({ onLogin, initialError }: { onLogin: (d: any) => void; initialError: string }) {
  const [step, setStep] = useState(1),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [office, setOffice] = useState('assigned'),
    [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(initialError);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (step === 1) {
      setStep(2);
      return;
    }
    setBusy(true);
    try {
      onLogin(await api('login', { email, password, office }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="simple-login">
      <header className="login-brand">
        <Logo />
      </header>
      <section className="simple-login-form">
        <h1>{step === 1 ? 'Attendance' : 'Enter your password'}</h1>
        <p className="muted">
          {step === 1 ? 'Sign in with your company email.' : 'Use your assigned password.'}
        </p>
        <form onSubmit={submit}>
          {step === 1 ? (
            <label>
              Company email
              <input
                autoComplete="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hmf.example"
                required
                autoFocus
              />
            </label>
          ) : (
            <>
              <div className="email-preview">
                <Mail size={17} />
                <span>{email}</span>
                <button type="button" onClick={() => setStep(1)}>
                  Change
                </button>
              </div>
              <label>
                Password
                <div className="password-field">
                  <input
                    type={show ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    aria-label={show ? 'Hide password' : 'Show password'}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </>
          )}
          {step === 1 && (
            <label className="office-login-label">
              Office
              <select value={office} onChange={(e) => setOffice(e.target.value)}>
                <option value="assigned">Use the office on my account</option>
                <option value="UK">United Kingdom</option>
                <option value="PK">Pakistan</option>
              </select>
            </label>
          )}
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
          <button className="primary login-submit" disabled={busy}>
            {busy ? 'Signing in…' : step === 1 ? 'Continue' : 'Sign in to HMF'}
            <ArrowRight size={18} />
          </button>
        </form>
      </section>
      <footer className="simple-login-footer fine-print">
        Private demo · HMF Consultants
        <br />
        Demo accounts: admin@hmf.example · employee.uk@hmf.example · employee.pk@hmf.example
        <br />
        Use the demo password supplied by your administrator.
      </footer>
    </main>
  );
}
function Workspace({
  me,
  today,
  officeDates,
  logout,
  fatal,
}: {
  me: User;
  today: string;
  officeDates: Record<string, string>;
  logout: () => void;
  fatal: string;
}) {
  const admin = me.canViewTeam;
  const [view, setView] = useState(admin ? 'overview' : 'attendance');
  const nav = admin
    ? [
        ['overview', 'Attendance'],
        ['hours', 'Hours'],
        ['leave', 'Leave'],
        ['people', 'People'],
        ['history', 'History'],
        ...(me.canConfigure ? [['settings', 'Settings']] : []),
      ]
    : [
        ['attendance', 'Today'],
        ['hours', 'Hours'],
        ['leave', 'Leave'],
        ['schedule', 'Schedule'],
        ['history', 'History'],
      ];
  return (
    <div className="workspace simple-workspace">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="simple-header">
        <div className="header-inner">
          <div className="compact-brand">
            <Logo />
          </div>
          <nav aria-label="Main navigation">
            {nav.map(([id, label]) => (
              <button
                key={id}
                aria-current={view === id ? 'page' : undefined}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="account-actions" aria-label={`Account for ${me.name}`}>
            {admin && (
              <button
                aria-current={view === 'reports' ? 'page' : undefined}
                onClick={() => setView('reports')}
              >
                Reports
              </button>
            )}
            <button onClick={() => setView('profile')}>My profile</button>
            {admin && <button onClick={() => setView('attendance')}>My attendance</button>}
            <button onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>
      <div className="workspace-main">
        <main
          id="main-content"
          tabIndex={-1}
          className={'main-content ' + (!admin || view === 'attendance' ? 'personal-content' : '')}
        >
          {fatal && (
            <div className="error" role="alert">
              {fatal}
            </div>
          )}
          {view === 'reports' && admin ? (
            <Reports today={today} />
          ) : view === 'leave' ? (
            <LeaveView />
          ) : view === 'hours' ? (
            <HoursView teamView={admin} />
          ) : view === 'profile' ? (
            <ProfileView />
          ) : view === 'schedule' ? (
            <ScheduleView />
          ) : view === 'people' ? (
            <People />
          ) : view === 'settings' && me.canConfigure ? (
            <WorkforceSettings />
          ) : admin && view !== 'attendance' ? (
            <Admin view={view} today={today} officeDates={officeDates} />
          ) : (
            <Employee me={me} today={today} historyOnly={view === 'history'} />
          )}
        </main>
        <footer className="app-footer fine-print">
          <div>
            <span>HMF Consultants</span>
            <p>Private demo · Fictional employees</p>
          </div>
          <PrivacyNotice />
        </footer>
      </div>
    </div>
  );
}
function Admin({
  view,
  today,
  officeDates,
}: {
  view: string;
  today: string;
  officeDates: Record<string, string>;
}) {
  const { config } = useWorkforce();
  const [date, setDate] = useState(today),
    [office, setOffice] = useState('all'),
    [rows, setRows] = useState<Row[]>([]),
    [search, setSearch] = useState(''),
    [status, setStatus] = useState('all'),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [refresh, setRefresh] = useState(0),
    [selected, setSelected] = useState<Row | null>(null),
    [page, setPage] = useState(1),
    [updated, setUpdated] = useState('');
  const seq = useRef(0);
  useEffect(() => {
    const n = ++seq.current;
    setLoading(true);
    setError('');
    api('dashboard', undefined, '&date=' + date + '&office=' + office)
      .then((d) => {
        if (n === seq.current) {
          setRows(d.rows);
          setUpdated(d.refreshedAt);
        }
      })
      .catch((e) => {
        if (n === seq.current) setError(e.message);
      })
      .finally(() => {
        if (n === seq.current) setLoading(false);
      });
  }, [date, office, refresh]);
  useEffect(() => {
    setPage(1);
  }, [date, office, search, status, view]);
  useEffect(() => {
    const id = setInterval(() => setRefresh((v) => v + 1), 60000);
    return () => clearInterval(id);
  }, []);
  const filtered = rows.filter(
    (r) =>
      (status === 'all' || r.status === status) &&
      [r.name, r.email, r.department, r.id].some((v) =>
        v.toLowerCase().includes(search.toLowerCase()),
      ),
  );
  const count = (s: string) => rows.filter((r) => r.status === s).length;
  const total = rows.length,
    submitted = rows.filter((r) => r.status !== 'pending').length;
  const pages = Math.max(1, Math.ceil(filtered.length / 8)),
    visible = filtered.slice((page - 1) * 8, page * 8);
  function shift(days: number) {
    const d = new Date(date + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + days);
    setDate(d.toISOString().slice(0, 10));
  }
  const title =
    view === 'people' ? 'People' : view === 'history' ? 'Attendance history' : 'Attendance';
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
        </div>
        <button
          className="secondary"
          onClick={async () => {
            try {
              const r = await fetch('/api/portal?action=export&date=' + date + '&office=' + office);
              if (!r.ok) throw new Error('Export failed. Please sign in again.');
              const url = URL.createObjectURL(await r.blob());
              const a = document.createElement('a');
              a.href = url;
              a.download = 'hmf-attendance-' + date + '.csv';
              a.click();
              URL.revokeObjectURL(url);
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>
      <div className="control-row">
        <select
          className="office-select"
          aria-label="Office filter"
          value={office}
          onChange={(e) => {
            setOffice(e.target.value);
            setDate(officeDates[e.target.value] || today);
          }}
        >
          <option value="all">All authorized offices</option>
          {config.offices.map((o) => (
            <option key={o.code} value={o.code}>
              {o.name}
            </option>
          ))}
        </select>
        <div className="date-control">
          <button className="icon-button" aria-label="Previous day" onClick={() => shift(-1)}>
            <ChevronLeft size={17} />
          </button>
          <CalendarDays size={16} />
          <input
            aria-label="Attendance date"
            type="date"
            value={date}
            onChange={(e) => e.target.value && setDate(e.target.value)}
          />
          <button className="icon-button" aria-label="Next day" onClick={() => shift(1)}>
            <ChevronRight size={17} />
          </button>
          <button className="today-button" onClick={() => setDate(officeDates[office] || today)}>
            Today
          </button>
        </div>
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={() => setRefresh((v) => v + 1)}>Retry</button>
        </div>
      )}
      <section className="table-panel register-panel" aria-busy={loading}>
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={17} />
            <input
              aria-label="Search employees"
              placeholder="Search people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="icon-button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="select-wrap">
            <select
              aria-label="Attendance status filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses ({total})</option>
              {[
                ['pending', 'No response'],
                ...config.statuses.map((s) => [s.code, s.label]),
                ['unavailable', 'Unavailable'],
              ].map(([v, l]) => (
                <option value={v} key={v}>
                  {l} ({count(v)})
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Attendance table, scroll horizontally for all columns"
        >
          <table>
            <caption className="sr-only">Employee attendance for {dateLabel(date)}</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Office</th>
                <th scope="col">Status</th>
                <th scope="col">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  <td>
                    <button className="person-button" onClick={() => setSelected(r)}>
                      <span>
                        <strong>{r.name}</strong>
                      </span>
                    </button>
                  </td>
                  <td>
                    <span className="office-cell">{officeName(r.office)}</span>
                  </td>
                  <td>
                    <Badge status={r.status} label={r.label} />
                    {r.approval === 'pending' && (
                      <small className="sample-label">Awaiting approval</small>
                    )}
                    {r.approval === 'declined' && <small className="sample-label">Declined</small>}
                  </td>
                  <td>
                    <span className="time-cell">
                      {timeLabel(r.submitted_at, r.office, r.timezone)}
                    </span>
                    {r.submitted_at && (
                      <small className="sample-label">
                        {r.source === 'sample' ? 'Sample record' : 'Recorded'}
                      </small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !error && !visible.length && (
            <div className="empty-state">
              <Search size={25} />
              <h3>No matching employees</h3>
              <p>Try a different name, office or status.</p>
              <button
                className="secondary"
                onClick={() => {
                  setSearch('');
                  setStatus('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
          {loading && !rows.length && (
            <div className="table-loading" role="status">
              <span className="sr-only">Loading team attendance…</span>
              {Array.from({ length: 8 }, (_, i) => (
                <div className="skeleton-row" aria-hidden="true" key={i}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="table-footer">
          <span>
            {filtered.length ? (page - 1) * 8 + 1 + '–' + Math.min(page * 8, filtered.length) : 0}{' '}
            of {filtered.length} employees
          </span>
          <div>
            <button
              className="icon-button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                aria-label={'Page ' + (i + 1)}
                aria-current={page === i + 1 ? 'page' : undefined}
                className={'page-number ' + (page === i + 1 ? 'selected' : '')}
                onClick={() => setPage(i + 1)}
                key={i}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="icon-button"
              aria-label="Next page"
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
      <div className="register-footnote">
        <span>
          {submitted} of {total} responded · Times are local to each office
        </span>
        <button
          className="refresh-link"
          onClick={() => setRefresh((v) => v + 1)}
          disabled={loading}
        >
          {loading ? 'Updating…' : 'Refresh'}
          {updated && (
            <span className="sr-only">
              , last updated {new Date(updated).toLocaleTimeString('en-GB')}
            </span>
          )}
        </button>
      </div>
      {selected && (
        <EmployeeDetail
          person={selected}
          date={date}
          close={() => setSelected(null)}
          saved={() => {
            setSelected(null);
            setRefresh((v) => v + 1);
          }}
        />
      )}
    </>
  );
}
function Employee({ me, today, historyOnly }: { me: User; today: string; historyOnly: boolean }) {
  const { config } = useWorkforce();
  const [records, setRecords] = useState<RecordRow[]>([]),
    [serverDate, setServerDate] = useState(today),
    [status, setStatus] = useState(''),
    [reason, setReason] = useState(''),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [success, setSuccess] = useState('');
  async function load() {
    const d = await api('mine');
    setRecords(d.records);
    setServerDate(d.today);
    const existing = d.records.find((r: RecordRow) => r.date === d.today);
    setStatus(existing?.status || '');
    setReason(existing?.reason || '');
  }
  useEffect(() => {
    load()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const existing = records.find((r) => r.date === serverDate),
    definition = config.statuses.find((s) => s.code === status),
    options = config.statuses.filter((s) => s.enabled);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const d = await api('attendance', { status, reason });
      await load();
      setSuccess('Your attendance for ' + dateLabel(d.date, true) + ' has been saved.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{historyOnly ? 'Your history' : 'Today’s attendance'}</h1>
          <p className="muted">
            {historyOnly ? officeName(me.office) + ' · Local time' : dateLabel(serverDate)}
          </p>
        </div>
      </div>
      {!historyOnly && (
        <>
          <WorkClock
            changed={() => {
              load().catch((e) => setError(e.message));
            }}
          />
          <div className="attendance-section">
            <div className="employee-grid">
              <section className="checkin-panel">
                <div className="checkin-heading">
                  <h2>Update attendance or report an absence</h2>
                </div>
                {existing && (
                  <div className="saved-indicator">
                    <CheckCircle2 size={17} />
                    Recorded as {existing.label || labels[existing.status] || existing.status}
                    {existing.approval === 'pending'
                      ? ' · Awaiting approval'
                      : existing.approval === 'declined'
                        ? ' · Declined'
                        : ''}{' '}
                    · {timeLabel(existing.updated_at, me.office, me.timezone)} local time
                  </div>
                )}
                {success && (
                  <div className="success" role="status">
                    <CheckCircle2 size={19} />
                    {success}
                  </div>
                )}
                <form onSubmit={submit}>
                  <div className="attendance-options">
                    {options
                      .filter((s) => ['present', 'remote', 'client'].includes(s.code))
                      .map((s) => (
                        <button
                          type="button"
                          className={'attendance-option ' + (status === s.code ? 'chosen' : '')}
                          aria-pressed={status === s.code}
                          key={s.code}
                          onClick={() => {
                            setStatus(s.code);
                            setReason('');
                            setSuccess('');
                          }}
                        >
                          <span>
                            <strong>{s.label}</strong>
                          </span>
                          <span className="radio-circle">{status === s.code && <span />}</span>
                        </button>
                      ))}
                  </div>
                  <label>
                    Another attendance option
                    <select
                      value={['present', 'remote', 'client'].includes(status) ? '' : status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setReason('');
                        setSuccess('');
                      }}
                    >
                      <option value="">Choose an option</option>
                      {options
                        .filter((s) => !['present', 'remote', 'client'].includes(s.code))
                        .map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </label>
                  {definition && (
                    <label className="reason-label">
                      {definition.explanation ? 'Short explanation' : 'Note (optional)'}
                      <textarea
                        maxLength={500}
                        required={definition.explanation}
                        placeholder="Do not include medical diagnoses or unnecessary personal details."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <small>
                        {reason.length}/500 characters
                        {definition.sensitive ? ' · Visible only to you and authorized HR.' : ''}
                        {definition.approval ? ' · Requires approval.' : ''}
                      </small>
                    </label>
                  )}
                  {error && (
                    <div className="error" role="alert">
                      {error}
                    </div>
                  )}
                  <button
                    className="secondary submit-attendance"
                    disabled={!definition?.enabled || busy || loading}
                  >
                    {busy
                      ? 'Saving…'
                      : existing
                        ? 'Update today’s attendance'
                        : 'Submit attendance'}
                    <ArrowRight size={17} />
                  </button>
                  <p className="secure-note">
                    <Clock3 size={14} />
                    Date and time are recorded automatically.
                  </p>
                </form>
              </section>
            </div>
          </div>
        </>
      )}
      {historyOnly && (
        <section className="table-panel history-panel" aria-busy={loading}>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Attendance table, scroll horizontally for all columns"
          >
            <table>
              <caption className="sr-only">My attendance history</caption>
              <thead>
                <tr>
                  <th scope="col">DATE</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">LAST UPDATED</th>
                  <th scope="col">REASON</th>
                  <th scope="col">SOURCE</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, historyOnly ? 90 : 5).map((r) => (
                  <tr key={r.date}>
                    <td>
                      <strong>{dateLabel(r.date, true)}</strong>
                      <small className="sample-label">{r.date.slice(0, 4)}</small>
                    </td>
                    <td>
                      <Badge status={r.status} label={r.label} />
                      {r.approval === 'pending' && (
                        <small className="sample-label">Awaiting approval</small>
                      )}
                      {r.approval === 'declined' && (
                        <small className="sample-label">Declined</small>
                      )}
                    </td>
                    <td>{timeLabel(r.updated_at, r.office, r.timezone || me.timezone)}</td>
                    <td>{r.reason || '—'}</td>
                    <td className="muted">
                      {r.source === 'sample'
                        ? 'Sample record'
                        : r.source === 'admin'
                          ? 'Administrator'
                          : 'Your submission'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="empty-state" role="status">
              <p>Loading your attendance records…</p>
            </div>
          )}
          {!records.length && !loading && !error && (
            <div className="empty-state">
              <CalendarDays size={25} />
              <p>No attendance records yet. Your first check-in will appear here.</p>
            </div>
          )}
        </section>
      )}
      {historyOnly && error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
function EmployeeDetail({
  person,
  date,
  close,
  saved,
}: {
  person: Row;
  date: string;
  close: () => void;
  saved: () => void;
}) {
  const { config } = useWorkforce();
  const dialog = useRef<HTMLDialogElement>(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [records, setRecords] = useState<RecordRow[]>([]),
    [audits, setAudits] = useState<Audit[]>([]),
    [accessEvents, setAccessEvents] = useState<AccessEvent[]>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [status, setStatus] = useState(
      config.statuses.some((s) => s.enabled && s.code === person.status) ? person.status : '',
    ),
    [reason, setReason] = useState(person.reason),
    [note, setNote] = useState(''),
    [editing, setEditing] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
    api('history', undefined, '&id=' + person.id)
      .then((d) => {
        setRecords(d.records);
        setAudits(d.audits);
        setAccessEvents(d.accessEvents);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [person.id]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('correct', { employeeId: person.id, date, status, reason, correctionReason: note });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      aria-labelledby="detail-title"
    >
      <div className="dialog-top">
        <span className="eyebrow">EMPLOYEE DETAILS</span>
        <button className="icon-button" onClick={close} aria-label="Close employee details">
          <X size={20} />
        </button>
      </div>
      <div className="detail-person">
        <Avatar name={person.name} office={person.office} />
        <div>
          <h2 id="detail-title">{person.name}</h2>
          <p>
            {person.id} · {person.department}
          </p>
          <small>
            {person.email} · {officeName(person.office)}
          </small>
        </div>
      </div>
      <div className="detail-status">
        <div>
          <small>{dateLabel(date, true)}</small>
          <Badge status={person.status} label={person.label} />
        </div>
        {person.id !== config.user.id && (
          <button className="secondary" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel correction' : 'Correct record'}
          </button>
        )}
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {editing && (
        <form className="correction-form" onSubmit={submit}>
          <h3>Correct attendance for {dateLabel(date, true)}</h3>
          <label>
            Status
            <select
              required
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setReason('');
              }}
            >
              <option value="">Choose a status</option>
              {config.statuses
                .filter((s) => s.enabled)
                .map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.label}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Attendance reason {status !== 'other' && '(optional)'}
            <input
              value={reason}
              maxLength={500}
              required={config.statuses.find((s) => s.code === status)?.explanation}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <label>
            Why are you correcting this record?
            <textarea
              value={note}
              maxLength={500}
              required
              onChange={(e) => setNote(e.target.value)}
              placeholder="This explanation is saved in the audit history."
            />
          </label>
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save correction'}
            <Check size={17} />
          </button>
        </form>
      )}
      <details className="detail-disclosure">
        <summary>Sign-in & sign-out activity</summary>
        <p className="activity-explainer">
          Portal access times in {officeName(person.office)} local time. Closing the browser is not
          a recorded sign-out or a departure from work.
        </p>
        {loading ? (
          <p className="muted" role="status">
            Loading access activity…
          </p>
        ) : !accessEvents.length ? (
          <p className="muted">No recorded access yet.</p>
        ) : (
          <div className="access-list">
            {accessEvents.map((a) => (
              <div key={a.id}>
                <span className={'access-icon ' + a.event}>
                  {a.event === 'sign_in' ? <ArrowRight size={15} /> : <LogOut size={15} />}
                </span>
                <strong>{a.event === 'sign_in' ? 'Signed in' : 'Signed out'}</strong>
                <span>
                  {new Date(a.occurred_at).toLocaleString('en-GB', {
                    timeZone: zone(a.office),
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </details>
      {person.approval === 'pending' && person.id !== config.user.id && (
        <form
          className="correction-form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              const decision =
                (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value') || 'approved';
              await workforce('attendanceDecision', {
                employeeId: person.id,
                date,
                decision,
                reason: decisionNote,
                expectedUpdatedAt: person.updated_at,
              });
              saved();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h3>Review attendance</h3>
          <label>
            Decision note
            <textarea
              required
              maxLength={500}
              value={decisionNote}
              onChange={(e) => setDecisionNote(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="primary" value="approved" disabled={busy}>
              Approve
            </button>
            <button className="secondary" value="declined" disabled={busy}>
              Decline
            </button>
          </div>
        </form>
      )}
      <h3 className="detail-section-title">Recent attendance</h3>
      {loading ? (
        <p className="muted">Loading records…</p>
      ) : !records.length ? (
        <p className="muted">No submissions yet.</p>
      ) : (
        <div className="detail-history">
          {records.map((r) => (
            <div key={r.date}>
              <span>
                {dateLabel(r.date, true)}
                <small>{r.reason || 'No note'}</small>
              </span>
              <Badge status={r.status} label={r.label} />
              <span className="muted">
                {timeLabel(r.updated_at, r.office, r.timezone || person.timezone)}
              </span>
            </div>
          ))}
        </div>
      )}
      <details className="detail-disclosure">
        <summary>Activity & corrections</summary>
        {loading ? (
          <p className="muted">Loading correction history…</p>
        ) : !audits.length ? (
          <p className="muted">No changes yet. Sample records have no activity history.</p>
        ) : (
          audits.map((a) => (
            <div className="audit" key={a.id}>
              <CheckCircle2 size={16} />
              <div>
                <strong>{a.actor_name}</strong> marked {dateLabel(a.date, true)} as{' '}
                {config.statuses.find((s) => s.code === a.status)?.label ||
                  labels[a.status] ||
                  a.status}
                <p>{a.reason}</p>
                <small>
                  {new Date(a.changed_at).toLocaleString('en-GB', {
                    timeZone: person.timezone || zone(person.office),
                  })}{' '}
                  · {officeName(person.office)} time
                </small>
              </div>
            </div>
          ))
        )}
      </details>
    </dialog>
  );
}
function Offices() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Our offices</h1>
          <p className="muted">One HMF workspace, with local dates for every team.</p>
        </div>
      </div>
      <div className="office-cards">
        {[
          [
            'UK',
            'United Kingdom',
            'Europe/London',
            'Citibase – Copthall House, Kings Street, Newcastle-under-Lyme, ST5 1EL',
            'UK local time adjusts automatically for daylight saving.',
          ],
          [
            'PK',
            'Pakistan',
            'Asia/Karachi',
            'Karachi · Lahore · Islamabad',
            'All Pakistan offices use Pakistan Standard Time.',
          ],
        ].map(([key, name, tz, address, note]) => (
          <section className="office-card" key={key}>
            <div className="office-card-top">
              <span className={'flag ' + key} />
              <span>HMF {key}</span>
              <Globe2 size={24} />
            </div>
            <h2>{name}</h2>
            <p>
              <MapPin size={17} />
              {address}
            </p>
            <dl>
              <dt>Time zone</dt>
              <dd>{tz}</dd>
              <dt>Demo employees</dt>
              <dd>12</dd>
              <dt>Submission policy</dt>
              <dd>Today only</dd>
            </dl>
            <div className="info-strip">
              <Clock3 size={16} />
              <span>{note}</span>
            </div>
          </section>
        ))}
      </div>
      <details className="policy-card">
        <summary>How attendance works</summary>
        <div className="policy-grid">
          <div>
            <h3>A daily check-in</h3>
            <p>Employees choose present, absent or other. Other requires a short explanation.</p>
          </div>
          <div>
            <h3>One record per day</h3>
            <p>
              Submitting again updates today’s record. Historical changes are made by an
              administrator with a reason.
            </p>
          </div>
          <div>
            <h3>A clear record</h3>
            <p>
              The server records timestamps. No response stays separate from absence. Payroll and
              hours worked are not tracked.
            </p>
          </div>
        </div>
        <p className="muted">
          Workweek, holiday and cutoff policies are not configured in this demo. Both countries are
          available for daily testing.
        </p>
      </details>
    </>
  );
}
```

## File: `app/reports.tsx`

```
'use client';

import { useState, type FormEvent } from 'react';

export function Reports({ today }: { today: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const start = String(values.get('start'));
    const end = String(values.get('end'));
    const hours = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') === 'hours';
    const query = new URLSearchParams({ start, end });
    setBusy(true);
    setError('');
    try {
      const route = hours ? '/api/hours?action=export&team=true' : '/api/portal?action=report';
      const response = await fetch(route + '&' + query);
      if (!response.ok) {
        const problem = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(problem?.error || 'Unable to download this report.');
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url;
      link.download = `hmf-${hours ? 'hours' : 'attendance'}-${start}-to-${end}.csv`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (problem) {
      setError((problem as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Reports</h1>
      </div>
      <form className="leave-form" onSubmit={download} aria-busy={busy}>
        <div className="form-grid">
          <label>
            Start date
            <input type="date" name="start" defaultValue={today.slice(0, 7) + '-01'} required />
          </label>
          <label>
            End date
            <input type="date" name="end" defaultValue={today} required />
          </label>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="leave-actions">
          <button className="primary" value="attendance" disabled={busy}>
            Download attendance CSV
          </button>
          <button className="secondary" value="hours" disabled={busy}>
            Download hours CSV
          </button>
        </div>
        <p className="muted">
          <small>
            Choose up to 62 days. The attendance report includes submitted records and omits private
            notes.
          </small>
        </p>
      </form>
    </section>
  );
}
```

## File: `app/workforce-context.tsx`

```
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { defaultOffices, defaultStatuses, type Office, type Role, type Status } from './lib/core';
export const roleLabel: Record<string, string> = {
  employee: 'Employee',
  manager: 'Manager',
  hr_admin: 'HR administrator',
  system_admin: 'System administrator',
};
type Config = {
  offices: Office[];
  departments: { code: string; name: string; active: boolean }[];
  statuses: Status[];
  people: { id: string; name: string; office: string; roles: Role[]; active: number }[];
  user: { id: string; canManagePeople: boolean; canConfigure: boolean; canViewTeam: boolean };
  today: string;
};
export async function workforce(action: string, body?: unknown, query = ''): Promise<any> {
  const response = await fetch(
    '/api/workforce' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...(body as object) }),
        }
      : { cache: 'no-store' },
  );
  const data: any = await response.json();
  if (!response.ok)
    throw new Error(data.error || 'Unable to load this information. Please sign in again.');
  return data;
}
const Context = createContext<{ config: Config; reload: () => Promise<void> }>({
  config: {
    offices: defaultOffices,
    departments: [],
    statuses: defaultStatuses,
    people: [],
    user: { id: '', canManagePeople: false, canConfigure: false, canViewTeam: false },
    today: '',
  },
  reload: async () => {},
});
export const useWorkforce = () => useContext(Context);
export function WorkforceProvider({ children }: { children: React.ReactNode }) {
  const initial = useContext(Context).config,
    [config, setConfig] = useState(initial),
    [error, setError] = useState('');
  async function reload() {
    try {
      setConfig(await workforce('config'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    reload();
  }, []);
  return (
    <Context.Provider value={{ config, reload }}>
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={reload}>Retry</button>
        </div>
      )}
      {children}
    </Context.Provider>
  );
}
```

## File: `app/workforce-fields.tsx`

```
'use client';
export function Notice({ error, success }: { error?: string; success?: string }) {
  return (
    <>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="success" role="status">
          {success}
        </div>
      )}
    </>
  );
}
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      {label}
      {children}
    </label>
  );
}
export function Value({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {value === null || value === undefined || value === '' ? 'Not configured' : String(value)}
      </dd>
    </div>
  );
}
```

## File: `app/workforce.tsx`

```
'use client';
import { useEffect, useState } from 'react';
import { workforce, useWorkforce, roleLabel } from './workforce-context';
export { workforce, useWorkforce, WorkforceProvider, roleLabel } from './workforce-context';
import { Notice, Field, Value } from './workforce-fields';
import { EmployeeEditor } from './employee-editor';
import { HoursSettings } from './hours-ui';
import {
  blankDays,
  blankProfile,
  defaultOffices,
  defaultStatuses,
  paidMinutes,
  roles,
  weeklyMinutes,
  type Day,
  type Office,
  type Profile,
  type Role,
  type Schedule,
  type Status,
} from './lib/core';
import type { Person } from './lib/store';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = (minutes: number | null) =>
  minutes === null ? 'Break rule not set' : `${Number((minutes / 60).toFixed(2))} h`;
const timestamp = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-GB') : 'Not recorded for legacy accounts';
async function download(url: string, name: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const data: any = await res.json();
    throw new Error(data.error || 'Export failed.');
  }
  const object = URL.createObjectURL(await res.blob());
  const link = document.createElement('a');
  link.href = object;
  link.download = name;
  link.click();
  URL.revokeObjectURL(object);
}

export function People() {
  const { config, reload } = useWorkforce(),
    [people, setPeople] = useState<Person[]>([]),
    [search, setSearch] = useState(''),
    [office, setOffice] = useState(''),
    [status, setStatus] = useState(''),
    [department, setDepartment] = useState(''),
    [role, setRole] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(true),
    [selected, setSelected] = useState<string | null>(null),
    [adding, setAdding] = useState(false),
    [page, setPage] = useState(1),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let live = true;
    setBusy(true);
    workforce('directory')
      .then((d) => {
        if (live) {
          setPeople(d.people);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setBusy(false);
      });
    return () => {
      live = false;
    };
  }, [refresh]);
  useEffect(() => {
    setPage(1);
  }, [search, office, status, department, role]);
  const filtered = people.filter(
      (p) =>
        (!office || p.office === office) &&
        (!status || p.profile.employmentStatus === status) &&
        (!department || p.department === department) &&
        (!role || p.roles.includes(role as Role)) &&
        [p.name, p.email, p.id, p.department].some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        ),
    ),
    pages = Math.max(1, Math.ceil(filtered.length / 10));
  const query = new URLSearchParams({ search, office, status, department, role }).toString();
  async function saved() {
    setAdding(false);
    setRefresh((n) => n + 1);
    await reload();
  }
  if (adding) return <EmployeeEditor close={() => setAdding(false)} saved={saved} />;
  if (selected)
    return (
      <ProfileView
        id={selected}
        close={() => {
          setSelected(null);
          setRefresh((n) => n + 1);
        }}
      />
    );
  return (
    <>
      <div className="page-heading">
        <h1>People</h1>
        {config.user.canManagePeople && (
          <button className="primary" onClick={() => setAdding(true)}>
            Add employee
          </button>
        )}
      </div>
      <Notice error={error} />
      <div className="people-filters">
        <Field label="Search people">
          <input
            type="search"
            placeholder="Name, email or employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
        <Field label="Office">
          <select value={office} onChange={(e) => setOffice(e.target.value)}>
            <option value="">All authorized offices</option>
            {config.offices.map((o) => (
              <option key={o.code} value={o.code}>
                {o.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Employment status">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {['active', 'inactive', 'suspended', 'former'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <details className="workforce-disclosure">
        <summary>More filters and exports</summary>
        <div className="people-filters">
          <Field label="Department">
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">All departments</option>
              {config.departments.map((d) => (
                <option key={d.code}>{d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Access role">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {roleLabel[r]}
                </option>
              ))}
            </select>
          </Field>
          <button
            className="secondary"
            onClick={() =>
              download('/api/workforce?action=export&' + query, 'hmf-people.csv').catch((e) =>
                setError(e.message),
              )
            }
          >
            Export filtered directory
          </button>
        </div>
      </details>
      <section className="table-panel" aria-busy={busy}>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Employee directory">
          <table>
            <caption className="sr-only">Employee directory and administration</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Office / department</th>
                <th scope="col">Employment</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((p) => (
                <tr key={p.id}>
                  <td>
                    <button className="person-button" onClick={() => setSelected(p.id)}>
                      <span>
                        <strong>{p.name}</strong>
                        <small>
                          {p.id} · {p.email}
                        </small>
                      </span>
                    </button>
                  </td>
                  <td>
                    {config.offices.find((o) => o.code === p.office)?.name || p.office}
                    <small className="sample-label">{p.department}</small>
                  </td>
                  <td>{p.profile.employmentStatus}</td>
                  <td>{p.roles.map((r) => roleLabel[r]).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {busy && (
          <p className="panel-message" role="status">
            Loading employees…
          </p>
        )}
        {!busy && !filtered.length && (
          <p className="panel-message">No matching employees. Try clearing your filters.</p>
        )}
        <div className="table-footer">
          <span>{filtered.length} employees</span>
          <div>
            <button
              className="secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>
            <span>
              {page} / {pages}
            </span>
            <button
              className="secondary"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      {config.user.canManagePeople && <ImportPeople saved={saved} />}
      <details className="workforce-disclosure">
        <summary>Reusable schedule templates</summary>
        <ScheduleTemplates />
      </details>
    </>
  );
}

export function ProfileView({ id, close }: { id?: string; close?: () => void }) {
  const { config, reload } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [error, setError] = useState(''),
    [editing, setEditing] = useState(false),
    [version, setVersion] = useState(0);
  useEffect(() => {
    let live = true;
    setData(null);
    workforce('profile', undefined, id ? '&id=' + encodeURIComponent(id) : '')
      .then((d) => {
        if (live) {
          setData(d);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [id, version]);
  if (editing)
    return (
      <EmployeeEditor
        person={data.person}
        close={() => setEditing(false)}
        saved={async () => {
          setEditing(false);
          setVersion((v) => v + 1);
          await reload();
        }}
      />
    );
  if (!data)
    return (
      <>
        <Notice error={error} />
        <p role="status">
          {error ? 'Reopen this profile to try again.' : 'Loading employment details…'}
        </p>
        {close && (
          <button className="secondary" onClick={close}>
            Back to people
          </button>
        )}
      </>
    );
  const p: Person = data.person,
    profile = p.profile;
  return (
    <>
      {close && (
        <button className="text-button" onClick={close}>
          ← Back to people
        </button>
      )}
      <div className="page-heading">
        <div>
          <h1>{p.id === config.user.id ? 'Your profile' : p.name}</h1>
          <p className="muted">
            {p.id} · {p.email}
          </p>
        </div>
        {data.canEdit && (
          <button className="secondary" onClick={() => setEditing(true)}>
            Edit employee
          </button>
        )}
      </div>
      <Notice error={error} />
      <section className="profile-section">
        <h2>Employment</h2>
        <dl className="profile-values">
          <Value label="Full name" value={p.name} />
          <Value label="Job title" value={profile.jobTitle} />
          <Value label="Department" value={p.department} />
          <Value
            label="Office"
            value={config.offices.find((o) => o.code === p.office)?.name || p.office}
          />
          <Value label="Country" value={config.offices.find((o) => o.code === p.office)?.country} />
          <Value
            label="Manager"
            value={config.people.find((x) => x.id === profile.managerId)?.name || profile.managerId}
          />
          <Value label="Employment status" value={profile.employmentStatus} />
          <Value label="Employment type" value={profile.employmentType} />
          <Value label="Start date" value={profile.startDate} />
          <Value label="Final employment date" value={profile.endDate} />
          <Value label="Telephone" value={profile.telephone} />
          <Value
            label="Contracted weekly hours"
            value={profile.weeklyMinutes === null ? null : hours(profile.weeklyMinutes)}
          />
          <Value label="Time zone" value={p.timezone} />
        </dl>
      </section>
      <details className="workforce-disclosure">
        <summary>Holiday allowance and account details</summary>
        <dl className="profile-values">
          <Value
            label={'Annual allowance (' + profile.holidayUnit + ')'}
            value={profile.holidayAllowance}
          />
          <Value
            label={'Carried forward (' + profile.holidayUnit + ')'}
            value={profile.carriedForward}
          />
          <Value label="Access roles" value={p.roles.map((r) => roleLabel[r]).join(', ')} />
          <Value label="Account created" value={timestamp(p.createdAt)} />
          <Value label="Profile updated" value={timestamp(p.updatedAt)} />
        </dl>
        <p className="muted">
          Open Leave to see calculated balances for the configured leave year.
        </p>
      </details>
      <ScheduleView id={p.id} canEdit={data.canSchedule} />
      <AuditView id={p.id} />
      <p className="muted">
        Employment details are maintained by authorized HMF administrators. Contact your manager if
        a detail is incorrect.
      </p>
    </>
  );
}

function ImportPeople({ saved }: { saved: () => Promise<void> }) {
  const [file, setFile] = useState(''),
    [preview, setPreview] = useState<any>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [success, setSuccess] = useState(''),
    [reason, setReason] = useState('');
  async function inspect() {
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      setPreview(await workforce('importPreview', { csv: file }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function confirm(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const d = await workforce('importConfirm', { previewId: preview.previewId, reason });
      setPreview(null);
      setFile('');
      setSuccess(`${d.count} employees added. No passwords or elevated access were imported.`);
      await saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="workforce-disclosure">
      <summary>Import employees from CSV</summary>
      <p>
        Imports add new employees. Existing records are never overwritten. Use the template for up
        to 50 employees.
      </p>
      <button
        className="secondary"
        onClick={() =>
          download('/api/workforce?action=template', 'hmf-employee-template.csv').catch((e) =>
            setError(e.message),
          )
        }
      >
        Download CSV template
      </button>
      <Field label="Employee CSV file">
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={async (e) => {
            setPreview(null);
            setSuccess('');
            setError('');
            const f = e.target.files?.[0];
            if (!f) {
              setFile('');
              return;
            }
            if (f.size > 200000) {
              setError('Choose a CSV smaller than 200 KB.');
              setFile('');
              return;
            }
            setFile(await f.text());
          }}
        />
      </Field>
      <button className="secondary" disabled={!file || busy} onClick={inspect}>
        {busy ? 'Checking…' : 'Preview import'}
      </button>
      <Notice error={error} success={success} />
      {preview && (
        <>
          <h3>{preview.total} rows reviewed</h3>
          {preview.errors.length > 0 ? (
            <ul>
              {preview.errors.map((e: any) => (
                <li key={e.row}>
                  Row {e.row}: {e.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>All rows passed validation. Review the people below before importing.</p>
          )}
          <div className="table-scroll" tabIndex={0} role="region" aria-label="CSV import preview">
            <table>
              <caption className="sr-only">Employee directory and administration</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Office</th>
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r: any) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.office}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {preview.previewId && (
            <form onSubmit={confirm}>
              <Field label="Reason for importing these employees">
                <input
                  required
                  maxLength={500}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Field>
              <button className="primary" disabled={busy}>
                {busy ? 'Importing…' : `Confirm import of ${preview.rows.length} employees`}
              </button>
            </form>
          )}
        </>
      )}
    </details>
  );
}

export function ScheduleView({ id, canEdit = false }: { id?: string; canEdit?: boolean }) {
  const { config } = useWorkforce(),
    [data, setData] = useState<any>(null),
    [date, setDate] = useState(''),
    [editing, setEditing] = useState<Schedule | null | undefined>(undefined),
    [error, setError] = useState(''),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let live = true;
    workforce(
      'schedules',
      undefined,
      (id ? '&id=' + encodeURIComponent(id) : '') + (date ? '&date=' + date : ''),
    )
      .then((d) => {
        if (live) {
          setData(d);
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [id, date, refresh]);
  if (editing !== undefined)
    return (
      <ScheduleEditor
        employeeId={id || config.user.id}
        initial={editing}
        close={() => setEditing(undefined)}
        saved={() => {
          setEditing(undefined);
          setRefresh((v) => v + 1);
        }}
      />
    );
  return (
    <section className="profile-section">
      <div className="section-heading">
        <h2>{id ? 'Weekly schedule' : 'Your schedule'}</h2>
        {canEdit && (
          <button className="secondary" onClick={() => setEditing(null)}>
            Set schedule
          </button>
        )}
      </div>
      <Field label="View schedule on">
        <input
          type="date"
          value={date || data?.date || ''}
          onChange={(e) => setDate(e.target.value)}
        />
      </Field>
      <Notice error={error} />
      {!data && !error && <p role="status">Loading schedule…</p>}
      {data && (
        <>
          <p className="muted">Times shown in {data.timezone}.</p>
          {data.effective ? (
            <>
              <h3>{data.effective.name}</h3>
              <ScheduleTable days={data.effective.days} />
              <p>Expected paid time: {hours(weeklyMinutes(data.effective.days))} per week</p>
            </>
          ) : (
            <p className="empty-copy">
              No schedule has been configured for this date. Your working pattern has not been
              assumed.
            </p>
          )}
          <details className="workforce-disclosure">
            <summary>Schedule versions ({data.versions.length})</summary>
            {!data.versions.length ? (
              <p>No schedule changes yet.</p>
            ) : (
              data.versions.map((s: Schedule) => (
                <details key={s.id} className="schedule-version">
                  <summary>
                    {s.name} · {s.start_date} to {s.end_date || 'ongoing'} · {s.kind}
                  </summary>
                  <p>{s.reason}</p>
                  <p className="muted">
                    Changed by{' '}
                    {config.people.find((p) => p.id === s.created_by)?.name || s.created_by} ·{' '}
                    {timestamp(s.created_at)}
                  </p>
                  <ScheduleTable days={s.days} />
                  {canEdit && (
                    <button className="secondary" onClick={() => setEditing(s)}>
                      Revise this period
                    </button>
                  )}
                </details>
              ))
            )}
          </details>
        </>
      )}
    </section>
  );
}
function ScheduleTable({ days }: { days: Day[] }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Weekly work schedule">
      <table>
        <caption className="sr-only">Employee directory and administration</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Working time</th>
            <th scope="col">Break</th>
            <th scope="col">Paid hours</th>
            <th scope="col">Arrangement</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 0].map((i) => {
            const d = days[i];
            return (
              <tr key={i}>
                <td>{dayNames[i]}</td>
                <td>
                  {d.working
                    ? `${d.start}–${d.finish}${d.overnight ? ' (+1 day)' : ''}`
                    : 'Not working'}
                </td>
                <td>
                  {d.working
                    ? `${d.breakMinutes} min${d.breakMinutes ? ', ' + (d.paidBreak === null ? 'rule not set' : d.paidBreak ? 'paid' : 'unpaid') : ''}`
                    : '—'}
                </td>
                <td>{d.working ? hours(paidMinutes(d)) : '—'}</td>
                <td>{d.working ? d.arrangement : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleTemplates() {
  const { config } = useWorkforce(),
    [data, setData] = useState<{ templates: Schedule[]; versions: Schedule[] } | null>(null),
    [edit, setEdit] = useState<Schedule | null | undefined>(undefined),
    [error, setError] = useState('');
  async function load() {
    try {
      setData(await workforce('templates'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  if (edit !== undefined)
    return (
      <ScheduleEditor
        initial={edit}
        close={() => setEdit(undefined)}
        saved={() => {
          setEdit(undefined);
          load();
        }}
      />
    );
  return (
    <>
      <div className="section-heading">
        <h2>Schedule templates</h2>
        <button className="primary" onClick={() => setEdit(null)}>
          Create template
        </button>
      </div>
      <Notice error={error} />
      {!data && !error && <p role="status">Loading templates…</p>}
      {data?.templates.length === 0 && (
        <p>
          No templates yet. Create a pattern agreed by HMF, then assign it from an employee’s
          schedule.
        </p>
      )}
      {data?.templates.map((t) => (
        <details className="workforce-disclosure" key={t.id}>
          <summary>
            {t.name} · {hours(weeklyMinutes(t.days))} per week
          </summary>
          <ScheduleTable days={t.days} />
          {(config.user.canManagePeople || t.created_by === config.user.id) && (
            <button className="secondary" onClick={() => setEdit(t)}>
              Revise template
            </button>
          )}
          <details>
            <summary>Previous versions</summary>
            {data.versions
              .filter((v) => v.series_id === t.series_id && v.id !== t.id)
              .map((v) => (
                <div className="schedule-version" key={v.id}>
                  <p>
                    {timestamp(v.created_at)} · {v.reason}
                  </p>
                  <ScheduleTable days={v.days} />
                </div>
              ))}
            {data.versions.filter((v) => v.series_id === t.series_id).length === 1 && (
              <p>No earlier versions.</p>
            )}
          </details>
        </details>
      ))}
    </>
  );
}

function ScheduleEditor({
  employeeId,
  initial,
  close,
  saved,
}: {
  employeeId?: string;
  initial: Schedule | null;
  close: () => void;
  saved: () => void;
}) {
  const [name, setName] = useState(initial?.name || ''),
    [kind, setKind] = useState(initial?.kind || (employeeId ? 'base' : 'template')),
    [start, setStart] = useState(initial?.start_date || ''),
    [end, setEnd] = useState(initial?.end_date || ''),
    [days, setDays] = useState<Day[]>(initial?.days || blankDays.map((d) => ({ ...d }))),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [templates, setTemplates] = useState<Schedule[]>([]),
    [templateId, setTemplateId] = useState(initial?.template_id || '');
  useEffect(() => {
    workforce('templates')
      .then((d) => setTemplates(d.templates))
      .catch((e) => setError(e.message));
  }, []);
  function day(i: number, key: keyof Day, value: unknown) {
    setDays((all) => all.map((d, n) => (n === i ? { ...d, [key]: value } : d)));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await workforce('schedule', {
        employeeId,
        seriesId: initial?.series_id,
        previousId: initial?.id,
        name,
        kind,
        startDate: start,
        endDate: end,
        days,
        reason,
        templateId: templateId || null,
      });
      saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="profile-section">
      <button className="text-button" onClick={close}>
        ← Back to schedules
      </button>
      <h2>
        {initial ? 'Revise schedule' : employeeId ? 'Set weekly schedule' : 'New schedule template'}
      </h2>
      <form className="employment-form" onSubmit={submit}>
        <div className="form-grid">
          <Field label="Schedule name">
            <input
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          {employeeId && (
            <Field label="Start from a template">
              <select
                value={templateId}
                onChange={(e) => {
                  setTemplateId(e.target.value);
                  const t = templates.find((t) => t.id === e.target.value);
                  if (t) {
                    setDays(t.days.map((d) => ({ ...d })));
                    if (!name) setName(t.name);
                  }
                }}
              >
                <option value="">Custom schedule</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {employeeId && (
            <>
              <Field label="Schedule type">
                <select disabled={!!initial} value={kind} onChange={(e) => setKind(e.target.value)}>
                  <option value="base">Normal schedule</option>
                  <option value="temporary">Temporary change</option>
                </select>
              </Field>
              <Field label="Effective start">
                <input
                  required
                  disabled={!!initial}
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Field>
              <Field label="Effective end">
                <input
                  required={kind === 'temporary'}
                  disabled={!!initial}
                  type="date"
                  min={start || undefined}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Field>
            </>
          )}
        </div>
        <p className="muted">
          Choose each working day. A new normal schedule takes priority from its start date;
          temporary changes take priority for their stated period. Previous versions remain
          available.
        </p>
        <div className="schedule-editor">
          {[1, 2, 3, 4, 5, 6, 0].map((i) => {
            const d = days[i];
            return (
              <fieldset key={i}>
                <legend>{dayNames[i]}</legend>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={d.working}
                    onChange={(e) => day(i, 'working', e.target.checked)}
                  />
                  Working day
                </label>
                {d.working && (
                  <div className="schedule-day-fields">
                    <Field label="Start">
                      <input
                        type="time"
                        required
                        value={d.start}
                        onChange={(e) => day(i, 'start', e.target.value)}
                      />
                    </Field>
                    <Field label="Finish">
                      <input
                        type="time"
                        required
                        value={d.finish}
                        onChange={(e) => day(i, 'finish', e.target.value)}
                      />
                    </Field>
                    <Field label="Break (minutes)">
                      <input
                        type="number"
                        min="0"
                        max="1439"
                        required
                        value={d.breakMinutes}
                        onChange={(e) => day(i, 'breakMinutes', Number(e.target.value))}
                      />
                    </Field>
                    <Field label="Break treatment">
                      <select
                        value={d.paidBreak === null ? '' : String(d.paidBreak)}
                        onChange={(e) =>
                          day(
                            i,
                            'paidBreak',
                            e.target.value === '' ? null : e.target.value === 'true',
                          )
                        }
                      >
                        <option value="">Not decided</option>
                        <option value="true">Paid</option>
                        <option value="false">Unpaid</option>
                      </select>
                    </Field>
                    <Field label="Working arrangement">
                      <select
                        value={d.arrangement}
                        onChange={(e) => day(i, 'arrangement', e.target.value)}
                      >
                        {['office', 'remote', 'hybrid', 'client-site'].map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </Field>
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={d.overnight}
                        onChange={(e) => day(i, 'overnight', e.target.checked)}
                      />
                      Finish next day
                    </label>
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
        <Field label="Reason for this schedule">
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        <label className="check-label">
          <input type="checkbox" required />I have checked the working days, times and break
          settings.
        </label>
        <Notice error={error} />
        <div className="form-actions">
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save schedule'}
          </button>
          <button type="button" className="secondary" onClick={close} disabled={busy}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

function AuditView({ id }: { id?: string }) {
  const [events, setEvents] = useState<any[] | null>(null),
    [error, setError] = useState(''),
    [cursor, setCursor] = useState<string | null>(null),
    [busy, setBusy] = useState(false);
  async function load(older = false) {
    setBusy(true);
    setError('');
    try {
      const data = await workforce(
        id ? 'audit' : 'settingsAudit',
        undefined,
        (id ? '&id=' + encodeURIComponent(id) : '') +
          (older && cursor ? '&cursor=' + encodeURIComponent(cursor) : ''),
      );
      setEvents((current) => (older ? [...(current || []), ...data.events] : data.events));
      setCursor(data.nextCursor);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details
      className="workforce-disclosure"
      onToggle={(e) => {
        if (e.currentTarget.open && !events && !busy) load();
      }}
    >
      <summary>
        {id ? 'Profile, schedule and attendance audit' : 'Settings and template audit'}
      </summary>
      <Notice error={error} />
      {busy && <p role="status">Loading audit history…</p>}
      {error && (
        <button className="secondary" onClick={() => load(!!events)}>
          Retry
        </button>
      )}
      {events?.length === 0 && (
        <p>No changes to show. Earlier attendance corrections remain in Attendance history.</p>
      )}
      {events?.map((a) => (
        <details key={a.id} className="schedule-version">
          <summary>
            {a.action.replaceAll('.', ' ')} · {timestamp(a.created_at)}
          </summary>
          <p>
            {a.actor_name || a.actor_id} · {a.source}
          </p>
          <p>{a.reason}</p>
          <div className="audit-values">
            <div>
              <h4>Previous value</h4>
              <pre>
                {a.before_value
                  ? JSON.stringify(JSON.parse(a.before_value), null, 2)
                  : 'No previous value / restricted'}
              </pre>
            </div>
            <div>
              <h4>New value</h4>
              <pre>
                {a.after_value
                  ? JSON.stringify(JSON.parse(a.after_value), null, 2)
                  : 'No new value / restricted'}
              </pre>
            </div>
          </div>
        </details>
      ))}
      {cursor && (
        <button className="secondary" disabled={busy} onClick={() => load(true)}>
          Load older changes
        </button>
      )}
    </details>
  );
}

export function WorkforceSettings() {
  const { config, reload } = useWorkforce(),
    [section, setSection] = useState('office'),
    [edit, setEdit] = useState<any>(undefined),
    [reason, setReason] = useState(''),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [success, setSuccess] = useState(''),
    [previous, setPrevious] = useState<any>(null);
  const items: any[] =
    section === 'office'
      ? config.offices
      : section === 'department'
        ? config.departments
        : section === 'status'
          ? config.statuses
          : [];
  function open(value: any) {
    setPrevious(value);
    setEdit(
      value
        ? { ...value }
        : section === 'office'
          ? { code: '', name: '', country: '', timezone: '', active: true }
          : section === 'department'
            ? { code: '', name: '', active: true }
            : {
                code: '',
                label: '',
                category: 'working',
                explanation: false,
                approval: false,
                sensitive: false,
                enabled: true,
              },
    );
    setReason('');
    setError('');
    setSuccess('');
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await workforce('setting', { kind: section, value: edit, reason, previous });
      await reload();
      setEdit(undefined);
      setSuccess('Setting saved. Previous attendance keeps its original status rules.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="page-heading">
        <h1>Settings</h1>
      </div>
      <div className="settings-nav" aria-label="Settings sections">
        {[
          ['office', 'Offices'],
          ['department', 'Departments'],
          ['status', 'Attendance options'],
          ['template', 'Schedule templates'],
        ].map(([v, l]) => (
          <button
            className="secondary"
            aria-pressed={section === v}
            key={v}
            onClick={() => {
              setSection(v);
              setEdit(undefined);
              setError('');
              setSuccess('');
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <Notice error={error} success={success} />
      {section === 'template' ? (
        <ScheduleTemplates />
      ) : edit !== undefined ? (
        <form className="employment-form" onSubmit={save}>
          <h2>
            {previous ? 'Edit' : 'Add'} {section === 'status' ? 'attendance option' : section}
          </h2>
          <div className="form-grid">
            <Field label={section === 'department' ? 'Department name' : 'Code'}>
              <input
                required
                disabled={!!previous}
                maxLength={section === 'department' ? 120 : 40}
                value={edit.code}
                onChange={(e) => setEdit({ ...edit, code: e.target.value })}
              />
            </Field>
            {section === 'office' && (
              <>
                <Field label="Office name">
                  <input
                    required
                    maxLength={120}
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  />
                </Field>
                <Field label="Country code (UK or PK)">
                  <input
                    required
                    maxLength={2}
                    value={edit.country}
                    onChange={(e) => setEdit({ ...edit, country: e.target.value.toUpperCase() })}
                  />
                </Field>
                <Field label="Time zone">
                  <input
                    required
                    placeholder="Europe/London or Asia/Karachi"
                    value={edit.timezone}
                    onChange={(e) => setEdit({ ...edit, timezone: e.target.value })}
                  />
                </Field>
              </>
            )}
            {section === 'status' && (
              <>
                <Field label="Employee-facing label">
                  <input
                    required
                    maxLength={80}
                    value={edit.label}
                    onChange={(e) => setEdit({ ...edit, label: e.target.value })}
                  />
                </Field>
                <Field label="Count this as">
                  <select
                    value={edit.category}
                    onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                  >
                    {[
                      ['working', 'Present and working'],
                      ['leave', 'Approved leave'],
                      ['absence', 'Absence'],
                      ['nonworking', 'Non-working time'],
                      ['unconfigured', 'Not yet classified'],
                    ].map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            )}
          </div>
          <div className="check-list">
            {(section === 'status'
              ? [
                  ['enabled', 'Available to employees'],
                  ['explanation', 'Requires a short explanation'],
                  ['approval', 'Requires manager approval'],
                  ['sensitive', 'Private absence details (employee and authorized HR only)'],
                ]
              : [['active', 'Available for new assignments']]
            ).map(([key, label]) => (
              <label className="check-label" key={key}>
                <input
                  type="checkbox"
                  checked={edit[key]}
                  onChange={(e) => setEdit({ ...edit, [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>
          {section === 'status' && (
            <p className="muted">
              No response is always separate from absence. Leave booking remains disabled until
              Phase 3. Approval-required attendance stays pending until an authorized colleague
              decides.
            </p>
          )}
          <Field label="Reason for this change">
            <textarea
              required
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Field>
          <Notice error={error} />
          <div className="form-actions">
            <button className="primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save setting'}
            </button>
            <button type="button" className="secondary" onClick={() => setEdit(undefined)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="section-heading">
            <h2>
              {section === 'office'
                ? 'Offices'
                : section === 'department'
                  ? 'Departments'
                  : 'Attendance options'}
            </h2>
            <button className="primary" onClick={() => open(null)}>
              Add {section === 'status' ? 'option' : section}
            </button>
          </div>
          <div className="table-scroll" tabIndex={0} role="region" aria-label="Configured settings">
            <table>
              <caption className="sr-only">Employee directory and administration</caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Details</th>
                  <th scope="col">Availability</th>
                  <th scope="col">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.code}>
                    <td>{item.name || item.label}</td>
                    <td>
                      {item.timezone || item.category || item.code}
                      {item.approval && ' · Approval required'}
                      {item.sensitive && ' · Private'}
                    </td>
                    <td>{(item.active ?? item.enabled) ? 'Available' : 'Disabled'}</td>
                    <td>
                      <button
                        className="secondary"
                        aria-label={'Edit ' + (item.name || item.label)}
                        onClick={() => open(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <HoursSettings />
      <AuditView />
    </>
  );
}

export function PrivacyNotice() {
  return (
    <div className="privacy-footnote">
      <strong>Employee privacy</strong>
      <p>
        Employees see their own records. Managers see assigned reports, and HR access is limited to
        authorized offices.
      </p>
      <p>
        General team views hide private absence labels and notes. Authorized HR access to attendance
        notes is recorded. Do not enter medical diagnoses or unnecessary personal information.
      </p>
      <p>
        Changes are logged and retained when accounts are deactivated. Contact your manager or HR
        for corrections.
      </p>
    </div>
  );
}
```

## File: `cloudflare-env.d.ts`

```
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
```

## File: `components.json`

```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

## File: `components/connector-error.tsx`

```
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectorErrorRecovery } from "@/lib/connector-errors.mjs";

/** Render in the affected feature, leaving the rest of the Site usable. */
export function ConnectorError({
  error,
  connectorName,
  reconnectHref,
}: {
  error: { status: string; message: string };
  connectorName: string;
  reconnectHref: string;
}) {
  const recovery = connectorErrorRecovery(error, connectorName, reconnectHref);
  return (
    <div
      role="alert"
      className="flex min-w-0 flex-col items-start gap-3 text-sm"
    >
      <p className="break-words">{recovery.message}</p>
      {recovery.action && (
        <Button
          asChild
          variant="outline"
          className="h-auto min-h-9 max-w-full whitespace-normal text-left"
        >
          <a href={recovery.action.href} target="_top">
            <LinkIcon aria-hidden="true" />
            <span className="min-w-0 break-words">{recovery.action.label}</span>
          </a>
        </Button>
      )}
    </div>
  );
}
```

## File: `components/ui/accordion.tsx`

```
"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

## File: `components/ui/alert-dialog.tsx`

```
"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
```

## File: `components/ui/alert.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
```

## File: `components/ui/aspect-ratio.tsx`

```
"use client"

import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
```

## File: `components/ui/attachment.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
  }
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80",
        "max-w-full",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="attachment-trigger"
      type={asChild ? undefined : (type ?? "button")}
      className={cn("absolute inset-0 z-10 outline-none", className)}
      {...props}
    />
  )
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
```

## File: `components/ui/avatar.tsx`

```
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
```

## File: `components/ui/badge.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

## File: `components/ui/breadcrumb.tsx`

```
import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
```

## File: `components/ui/bubble.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        muted:
          "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
        tinted:
          "*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] *:data-[slot=bubble-content]:text-foreground dark:*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
        outline:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
```

## File: `components/ui/button-group.tsx`

```
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
```

## File: `components/ui/button.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## File: `components/ui/calendar.tsx`

```
"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
```

## File: `components/ui/card.tsx`

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

## File: `components/ui/carousel.tsx`

```
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

## File: `components/ui/chart.tsx`

```
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

import { cn } from "@/lib/utils"

const THEMES = {
  light: null,
  dark: "(prefers-color-scheme: dark)",
} as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, media]) => {
            const rule = `
[data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
            return media ? `@media ${media} {\n${rule}}\n` : rule
          })
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

## File: `components/ui/checkbox.tsx`

```
"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
```

## File: `components/ui/collapsible.tsx`

```
"use client"

import { Collapsible as CollapsiblePrimitive } from "radix-ui"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

## File: `components/ui/combobox.tsx`

```
"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none size-4 pointer-coarse:size-5" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1.5 text-xs text-muted-foreground pointer-coarse:px-3 pointer-coarse:py-2 pointer-coarse:text-sm",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  children,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
```

## File: `components/ui/command.tsx`

```
"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

## File: `components/ui/context-menu.tsx`

```
"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { ContextMenu as ContextMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```

## File: `components/ui/dialog.tsx`

```
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
```

## File: `components/ui/direction.tsx`

```
"use client"

import * as React from "react"
import { Direction } from "radix-ui"

function DirectionProvider({
  dir,
  direction,
  children,
}: React.ComponentProps<typeof Direction.DirectionProvider> & {
  direction?: React.ComponentProps<typeof Direction.DirectionProvider>["dir"]
}) {
  return (
    <Direction.DirectionProvider dir={direction ?? dir}>
      {children}
    </Direction.DirectionProvider>
  )
}

const useDirection = Direction.useDirection

export { DirectionProvider, useDirection }
```

## File: `components/ui/drawer.tsx`

```
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
```

## File: `components/ui/dropdown-menu.tsx`

```
"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
```

## File: `components/ui/empty.tsx`

```
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
```

## File: `components/ui/field.tsx`

```
"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```

## File: `components/ui/form.tsx`

```
"use client"

import * as React from "react"
import type { Label as LabelPrimitive } from "radix-ui"
import { Slot } from "radix-ui"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

## File: `components/ui/hover-card.tsx`

```
"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
```

## File: `components/ui/input-group.tsx`

```
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
        "h-9 min-w-0 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
```

## File: `components/ui/input-otp.tsx`

```
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```

## File: `components/ui/input.tsx`

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

## File: `components/ui/item.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
```

## File: `components/ui/kbd.tsx`

```
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
```

## File: `components/ui/label.tsx`

```
"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
```

## File: `components/ui/marker.tsx`

```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b border-border pb-2",
      },
    },
  }
)

function Marker({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof markerVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="marker"
      data-variant={variant}
      className={cn(markerVariants({ variant, className }))}
      {...props}
    />
  )
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
```

## File: `components/ui/menubar.tsx`

```
"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
```

## File: `components/ui/message-scroller.tsx`

```
"use client"

import * as React from "react"
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { ArrowDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col gap-8", className)}
      {...props}
    />
  )
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  render,
  variant = "secondary",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      className={cn(
        "absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
        className
      )}
      render={render ?? <Button variant={variant} size={size} />}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
```

## File: `components/ui/message.tsx`

```
import * as React from "react"

import { cn } from "@/lib/utils"

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
        className
      )}
      {...props}
    />
  )
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8",
        className
      )}
      {...props}
    />
  )
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
        className
      )}
      {...props}
    />
  )
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
        className
      )}
      {...props}
    />
  )
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className
      )}
      {...props}
    />
  )
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
}
```

## File: `components/ui/native-select.tsx`

```
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
```

## File: `components/ui/navigation-menu.tsx`

```
import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
```

## File: `components/ui/pagination.tsx`

```
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
```

## File: `components/ui/popover.tsx`

```
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
```

## File: `components/ui/progress.tsx`

```
"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
```

## File: `components/ui/radio-group.tsx`

```
"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
```

## File: `components/ui/resizable.tsx`

```
"use client"

import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
```

## File: `components/ui/scroll-area.tsx`

```
"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
```

## File: `components/ui/select.tsx`

```
"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

## File: `components/ui/separator.tsx`

```
"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
```

## File: `components/ui/sheet.tsx`

```
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## File: `components/ui/sidebar.tsx`

```
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  const width = "70%"

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
```

## File: `components/ui/skeleton.tsx`

```
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-accent", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## File: `components/ui/slider.tsx`

```
"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
```

## File: `components/ui/sonner.tsx`

```
"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
```

## File: `components/ui/spinner.tsx`

```
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## File: `components/ui/switch.tsx`

```
"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
```

## File: `components/ui/table.tsx`

```
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

## File: `components/ui/tabs.tsx`

```
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
```

## File: `components/ui/textarea.tsx`

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
```

## File: `components/ui/toggle-group.tsx`

```
"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
```

## File: `components/ui/toggle.tsx`

```
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
```

## File: `components/ui/tooltip.tsx`

```
"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

## File: `db/index.ts`

```
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}
```

## File: `db/schema.ts`

```
import { sqliteTable, text, integer, primaryKey, index, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  office: text('office').notNull(),
  department: text('department').notNull(),
  role: text('role').notNull(),
  passwordHash: text('password_hash').notNull(),
  salt: text('salt').notNull(),
  active: integer('active').notNull().default(1),
});
export const attendance = sqliteTable(
  'attendance',
  {
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    date: text('date').notNull(),
    status: text('status').notNull(),
    reason: text('reason').notNull().default(''),
    office: text('office').notNull(),
    submittedAt: text('submitted_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    source: text('source').notNull(),
  },
  (t) => [primaryKey({ columns: [t.employeeId, t.date] }), index('attendance_date_idx').on(t.date)],
);
export const sessions = sqliteTable('sessions', {
  tokenHash: text('token_hash').primaryKey(),
  employeeId: text('employee_id')
    .notNull()
    .references(() => employees.id),
  ownerId: text('owner_id').notNull(),
  expiresAt: integer('expires_at').notNull(),
});
export const audits = sqliteTable('audits', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  date: text('date').notNull(),
  actorId: text('actor_id').notNull(),
  previousStatus: text('previous_status'),
  status: text('status').notNull(),
  reason: text('reason').notNull(),
  changedAt: text('changed_at').notNull(),
});
export const attempts = sqliteTable('login_attempts', {
  key: text('key').primaryKey(),
  count: integer('count').notNull(),
  windowStart: integer('window_start').notNull(),
});
export const accessEvents = sqliteTable('access_events', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id')
    .notNull()
    .references(() => employees.id),
  event: text('event').notNull(),
  occurredAt: text('occurred_at').notNull(),
  office: text('office').notNull(),
});

// Additive Phase 1 tables. Legacy attendance and account rows retain their shape.
export const employeeProfiles = sqliteTable('employee_profiles', {
  employeeId: text('employee_id')
    .primaryKey()
    .references(() => employees.id),
  data: text('data').notNull(),
  revision: integer('revision').notNull().default(1),
  createdAt: text('created_at'),
  updatedAt: text('updated_at').notNull(),
});
export const accessGrants = sqliteTable('access_grants', {
  employeeId: text('employee_id')
    .primaryKey()
    .references(() => employees.id),
  roles: text('roles').notNull(),
  offices: text('offices').notNull(),
});
export const directorySettings = sqliteTable(
  'directory_settings',
  {
    kind: text('kind').notNull(),
    code: text('code').notNull(),
    data: text('data').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.kind, t.code] })],
);
export const scheduleVersions = sqliteTable(
  'schedule_versions',
  {
    id: text('id').primaryKey(),
    seriesId: text('series_id').notNull(),
    employeeId: text('employee_id').references(() => employees.id),
    name: text('name').notNull(),
    kind: text('kind').notNull(),
    startDate: text('start_date'),
    endDate: text('end_date'),
    days: text('days').notNull(),
    templateId: text('template_id'),
    reason: text('reason').notNull(),
    createdBy: text('created_by')
      .notNull()
      .references(() => employees.id),
    createdAt: text('created_at').notNull(),
  },
  (t) => [
    index('schedule_employee_date_idx').on(t.employeeId, t.createdAt),
    index('schedule_series_date_idx').on(t.seriesId, t.createdAt),
  ],
);
export const auditEvents = sqliteTable(
  'audit_events',
  {
    id: text('id').primaryKey(),
    employeeId: text('employee_id'),
    actorId: text('actor_id').notNull(),
    action: text('action').notNull(),
    before: text('before_value'),
    after: text('after_value'),
    reason: text('reason').notNull(),
    source: text('source').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [index('audit_employee_date_idx').on(t.employeeId, t.createdAt, t.id)],
);
export const attendanceDetails = sqliteTable(
  'attendance_details',
  {
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    date: text('date').notNull(),
    definition: text('definition').notNull(),
    approval: text('approval').notNull(),
    decidedBy: text('decided_by'),
    decidedAt: text('decided_at'),
    decisionNote: text('decision_note'),
  },
  (t) => [primaryKey({ columns: [t.employeeId, t.date] })],
);
export const importPreviews = sqliteTable(
  'import_previews',
  {
    id: text('id').primaryKey(),
    actorId: text('actor_id').notNull(),
    rows: text('rows').notNull(),
    expiresAt: integer('expires_at').notNull(),
    usedAt: text('used_at'),
  },
  (t) => [index('import_expiration_idx').on(t.expiresAt)],
);

export const workRecords = sqliteTable(
  'work_records',
  {
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    date: text('date').notNull(),
    checkIn: text('check_in').notNull(),
    checkOut: text('check_out'),
    breakMinutes: integer('break_minutes').notNull().default(0),
    snapshot: text('snapshot').notNull(),
    revision: integer('revision').notNull().default(1),
    employeeNote: text('employee_note').notNull().default(''),
    managerNote: text('manager_note').notNull().default(''),
    overtimeState: text('overtime_state').notNull().default('pending'),
    updatedAt: text('updated_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.employeeId, t.date] }), index('work_date_idx').on(t.date)],
);
export const timeCorrections = sqliteTable(
  'time_corrections',
  {
    id: text('id').primaryKey(),
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    date: text('date').notNull(),
    proposed: text('proposed').notNull(),
    baseRevision: integer('base_revision').notNull(),
    status: text('status').notNull(),
    requestedBy: text('requested_by').notNull(),
    reason: text('reason').notNull(),
    createdAt: text('created_at').notNull(),
    decidedBy: text('decided_by'),
    decidedAt: text('decided_at'),
    decisionNote: text('decision_note'),
  },
  (t) => [index('correction_employee_idx').on(t.employeeId, t.createdAt)],
);

export const leaveRequests = sqliteTable(
  'leave_requests',
  {
    id: text('id').primaryKey().notNull(),
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    startDate: text('start_date').notNull(),
    endDate: text('end_date').notNull(),
    timezone: text('timezone').notNull(),
    status: text('status').notNull(),
    createdAt: text('created_at').notNull(),
    decidedBy: text('decided_by').references(() => employees.id),
    decidedAt: text('decided_at'),
    decisionNote: text('decision_note'),
  },
  (t) => [
    index('leave_requests_employee_dates').on(t.employeeId, t.startDate, t.endDate),
    check('leave_valid_dates', sql`${t.endDate} >= ${t.startDate}`),
    check('leave_valid_status', sql`${t.status} IN ('pending','approved','declined','cancelled')`),
  ],
);

// A named constraint keeps atomic batch conflicts distinct from malformed user JSON.
export const writeGuards = sqliteTable(
  'write_guards',
  {
    id: text('id').primaryKey().notNull(),
    valid: integer('valid').notNull(),
  },
  (t) => [check('hmf_write_conflict', sql`${t.valid} = 1`)],
);

export const leaveRequestDetails = sqliteTable('leave_request_details', {
  requestId: text('request_id')
    .primaryKey()
    .notNull()
    .references(() => leaveRequests.id),
  leaveType: text('leave_type').notNull(),
  note: text('note').notNull(),
  snapshot: text('snapshot').notNull(),
});

export const leaveBalanceVersions = sqliteTable('leave_balance_versions', {
  employeeId: text('employee_id')
    .primaryKey()
    .notNull()
    .references(() => employees.id),
  revision: integer('revision').notNull(),
});
```

## File: `drizzle.config.ts`

```
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "sqlite",
});
```

## File: `drizzle/0000_quick_lyja.sql`

```
CREATE TABLE `login_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`window_start` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`status` text NOT NULL,
	`reason` text DEFAULT '' NOT NULL,
	`office` text NOT NULL,
	`submitted_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`source` text NOT NULL,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audits` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`actor_id` text NOT NULL,
	`previous_status` text,
	`status` text NOT NULL,
	`reason` text NOT NULL,
	`changed_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`office` text NOT NULL,
	`department` text NOT NULL,
	`role` text NOT NULL,
	`password_hash` text NOT NULL,
	`salt` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
```

## File: `drizzle/0001_cuddly_dagger.sql`

```
CREATE TABLE `access_events` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`event` text NOT NULL,
	`occurred_at` text NOT NULL,
	`office` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
```

## File: `drizzle/0002_tough_oracle.sql`

```
CREATE TABLE `access_grants` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`roles` text NOT NULL,
	`offices` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `attendance_details` (
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`definition` text NOT NULL,
	`approval` text NOT NULL,
	`decided_by` text,
	`decided_at` text,
	`decision_note` text,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text,
	`actor_id` text NOT NULL,
	`action` text NOT NULL,
	`before_value` text,
	`after_value` text,
	`reason` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directory_settings` (
	`kind` text NOT NULL,
	`code` text NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`kind`, `code`)
);
--> statement-breakpoint
CREATE TABLE `employee_profiles` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`created_at` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `import_previews` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`rows` text NOT NULL,
	`expires_at` integer NOT NULL,
	`used_at` text
);
--> statement-breakpoint
CREATE TABLE `schedule_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`series_id` text NOT NULL,
	`employee_id` text,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`days` text NOT NULL,
	`template_id` text,
	`reason` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
```

## File: `drizzle/0003_brainy_pestilence.sql`

```
CREATE INDEX `attendance_date_idx` ON `attendance` (`date`);--> statement-breakpoint
CREATE INDEX `audit_employee_date_idx` ON `audit_events` (`employee_id`,`created_at`,`id`);--> statement-breakpoint
CREATE INDEX `import_expiration_idx` ON `import_previews` (`expires_at`);--> statement-breakpoint
CREATE INDEX `schedule_employee_date_idx` ON `schedule_versions` (`employee_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `schedule_series_date_idx` ON `schedule_versions` (`series_id`,`created_at`);
```

## File: `drizzle/0004_massive_star_brand.sql`

```
CREATE TABLE `time_corrections` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`proposed` text NOT NULL,
	`base_revision` integer NOT NULL,
	`status` text NOT NULL,
	`requested_by` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL,
	`decided_by` text,
	`decided_at` text,
	`decision_note` text,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `correction_employee_idx` ON `time_corrections` (`employee_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `work_records` (
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text,
	`break_minutes` integer DEFAULT 0 NOT NULL,
	`snapshot` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`employee_note` text DEFAULT '' NOT NULL,
	`manager_note` text DEFAULT '' NOT NULL,
	`overtime_state` text DEFAULT 'pending' NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `work_date_idx` ON `work_records` (`date`);
```

## File: `drizzle/0005_leave_requests.sql`

```
CREATE TABLE leave_requests (
  id TEXT PRIMARY KEY NOT NULL,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  timezone TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  decided_by TEXT REFERENCES employees(id),
  decided_at TEXT,
  decision_note TEXT,
  CONSTRAINT leave_valid_dates CHECK (end_date >= start_date),
  CONSTRAINT leave_valid_status CHECK (status IN ('pending','approved','declined','cancelled'))
);
--> statement-breakpoint
CREATE INDEX leave_requests_employee_dates ON leave_requests(employee_id,start_date,end_date);
```

## File: `drizzle/0006_cynical_sumo.sql`

```
CREATE TABLE `leave_balance_versions` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`revision` integer NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leave_request_details` (
	`request_id` text PRIMARY KEY NOT NULL,
	`leave_type` text NOT NULL,
	`note` text NOT NULL,
	`snapshot` text NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `leave_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `write_guards` (
	`id` text PRIMARY KEY NOT NULL,
	`valid` integer NOT NULL,
	CONSTRAINT "hmf_write_conflict" CHECK("write_guards"."valid" = 1)
);
```

## File: `drizzle/meta/_journal.json`

```
{
  "version": "7",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "6",
      "when": 1794192083725,
      "tag": "0000_quick_lyja",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "6",
      "when": 1794194969159,
      "tag": "0001_cuddly_dagger",
      "breakpoints": true
    },
    {
      "idx": 2,
      "version": "6",
      "when": 1794276271809,
      "tag": "0002_tough_oracle",
      "breakpoints": true
    },
    {
      "idx": 3,
      "version": "6",
      "when": 1794277661683,
      "tag": "0003_brainy_pestilence",
      "breakpoints": true
    },
    {
      "idx": 4,
      "version": "6",
      "when": 1794287771767,
      "tag": "0004_massive_star_brand",
      "breakpoints": true
    },
    {
      "idx": 5,
      "version": "6",
      "when": 1794556800000,
      "tag": "0005_leave_requests",
      "breakpoints": true
    },
    {
      "idx": 6,
      "version": "6",
      "when": 1794851070095,
      "tag": "0006_cynical_sumo",
      "breakpoints": true
    }
  ]
}
```

## File: `eslint.config.mjs`

```
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "dist/**",
    ".vinext/**",
    ".wrangler/**",
    ".sites-runtime/**",
    "outputs/**",
    "work/**",
  ]),
  {
    files: ["components/ui/**/*.{ts,tsx}", "hooks/use-mobile.ts"],
    rules: {
      // These files are vendored verbatim from shadcn@4.17.0. Keep the
      // registry source intact while applying the stricter rules to Site code.
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
```

## File: `examples/d1/app/api/notes/route.ts`

```
import { desc } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { notes } from "../../../db/schema";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "notes"')) {
    return "The notes table is unavailable. Generate the migration locally with `npm run db:generate`, then deploy so the platform can apply the generated SQL to the real D1 database.";
  }

  return message;
}

export async function GET() {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt), desc(notes.id))
      .limit(20);

    return Response.json({ notes: rows });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      title?: string;
      content?: string;
    };
    const title = payload.title?.trim() ?? "";
    const content = payload.content?.trim() ?? "";

    if (!title) {
      return Response.json({ error: "title is required" }, { status: 400 });
    }

    const db = getDb();
    const [note] = await db.insert(notes).values({ title, content }).returning();
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}
```

## File: `examples/d1/db/schema.ts`

```
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
```

## File: `hooks/use-mobile.ts`

```
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

## File: `lib/connector-context.ts`

```
import { AsyncLocalStorage } from "node:async_hooks";
import type { ConnectorBinding } from "./connector-contract.mjs";

// Capture the trusted capability before Vinext derives its revalidation context,
// which does not retain custom execution-context props. Never share across requests.
const bindings = new AsyncLocalStorage<ConnectorBinding | undefined>();

export function runWithConnectorBinding<T>(
  binding: ConnectorBinding | undefined,
  run: () => T,
): T {
  return bindings.run(binding, run);
}

export function getConnectorBinding(): ConnectorBinding | undefined {
  return bindings.getStore();
}
```

## File: `lib/connector-contract.mts`

```
export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

export type ConnectorFailureStatus =
  | "invalid_request"
  | "request_context_expired"
  | "reauthentication_required"
  | "connector_access_disabled"
  | "tool_not_found"
  | "tool_not_allowed"
  | "rate_limited"
  | "tool_error"
  | "upstream_error"
  | "internal_error"
  // Starter-only: no runtime capability or active local preview session.
  | "binding_unavailable";

export type ConnectorContent = {
  content: Array<{ type: string; [key: string]: Json }>;
  structuredContent?: Json;
};

// Matches Sites Dispatch's explicit invocation outcome, plus binding_unavailable.
export type ConnectorResult =
  | {
      status: "success";
      result: ConnectorContent;
      requestId?: string;
    }
  | {
      status: ConnectorFailureStatus;
      message: string;
      requestId?: string;
      retryAfterMs?: number;
      result?: ConnectorContent;
    };

/** A server-side binding supplied by the runtime, never by a browser. */
export type ConnectorBinding = {
  invoke(
    connectorId: string,
    actionName: string,
    args: { [key: string]: Json },
  ): Promise<ConnectorResult>;
  getContext?(): Promise<ConnectorContext>;
};

/** Site policy and cached tool metadata, not authentication or provider health. */
export type ConnectorContext =
  | {
      status: "success";
      connectors: Array<{
        connectorId: string;
        policy: "enabled" | "disabled";
        tools: Array<{
          actionName: string;
          description?: string;
          inputSchema: Record<string, Json>;
        }> | null;
      }>;
    }
  | {
      status:
        | "request_context_expired"
        | "internal_error"
        | "binding_unavailable"
        | "upstream_error";
    };

/** Use in a Site server route. Connection selection and credentials stay in the host. */
export function createConnectors(binding: ConnectorBinding | undefined) {
  return {
    async getContext(): Promise<ConnectorContext> {
      if (typeof window !== "undefined") {
        throw new Error(
          "Connected apps are only available in Site server routes.",
        );
      }
      try {
        if (!binding?.getContext) return { status: "binding_unavailable" };
        const context = await binding.getContext();
        if (
          context?.status === "success" &&
          Array.isArray(context.connectors)
        ) {
          return {
            status: "success",
            connectors: context.connectors.map((connector) => {
              if (
                !connector ||
                typeof connector.connectorId !== "string" ||
                !["enabled", "disabled"].includes(connector.policy) ||
                (connector.tools !== null && !Array.isArray(connector.tools))
              ) {
                throw new Error("Invalid connector context");
              }
              return {
                connectorId: connector.connectorId,
                policy: connector.policy,
                tools:
                  connector.tools?.map((tool) => {
                    if (
                      !tool ||
                      typeof tool.actionName !== "string" ||
                      (tool.description !== undefined &&
                        typeof tool.description !== "string") ||
                      !tool.inputSchema ||
                      typeof tool.inputSchema !== "object" ||
                      Array.isArray(tool.inputSchema)
                    ) {
                      throw new Error("Invalid connector tool");
                    }
                    return {
                      actionName: tool.actionName,
                      ...(tool.description !== undefined
                        ? { description: tool.description }
                        : {}),
                      inputSchema: tool.inputSchema,
                    };
                  }) ?? null,
              };
            }),
          };
        }
        switch (context?.status) {
          case "request_context_expired":
          case "internal_error":
          case "binding_unavailable":
          case "upstream_error":
            return { status: context.status };
          default:
            return { status: "upstream_error" };
        }
      } catch {
        return { status: "upstream_error" };
      }
    },
    async invoke(
      connectorId: string,
      actionName: string,
      args: { [key: string]: Json },
    ): Promise<ConnectorResult> {
      if (typeof window !== "undefined") {
        throw new Error(
          "Connected apps are only available in Site server routes.",
        );
      }
      if (!binding) {
        return {
          status: "binding_unavailable",
          message:
            "This runtime does not provide connected apps for this request.",
        };
      }
      try {
        // Preserve the host's status, message, result and optional diagnostics.
        // Do not replay a call after a transport failure: it may have completed.
        return await binding.invoke(connectorId, actionName, args);
      } catch {
        return {
          status: "upstream_error",
          message:
            "The app did not return a confirmed result. The action may have completed; check before trying again.",
        };
      }
    },
  };
}
```

## File: `lib/connector-errors.mts`

```
import { z } from "zod/v4";

/** Validate and project runtime results onto the public connector response. */
export function connectorResponse(result: unknown): Response {
  try {
    // Keep server-only parsing lazy so client recovery UI can tree-shake it out.
    const requestId = z
      .string()
      .regex(/^[A-Za-z0-9._:-]{1,128}$/)
      .optional()
      .catch(undefined);
    const envelope = {
      error: z.never().optional(),
      content: z.never().optional(),
      structuredContent: z.never().optional(),
      isError: z.never().optional(),
      requestId,
    };
    const content = z.object({
      content: z.array(z.object({ type: z.string() }).catchall(z.json())),
      structuredContent: z.json().optional(),
      isError: z.never().optional(),
      error: z.never().optional(),
    });
    const failure = z.object({
      ...envelope,
      status: z
        .string()
        .min(1)
        .refine((value) => value !== "success"),
      message: z.string().min(1),
      retryAfterMs: z.number().int().nonnegative().safe().optional(),
      result: content.optional(),
    });
    const success = z.object({
      ...envelope,
      status: z.literal("success"),
      result: content,
      message: z.never().optional(),
      retryAfterMs: z.never().optional(),
    });
    const schema =
      result !== null &&
      typeof result === "object" &&
      "status" in result &&
      result.status === "success"
        ? success
        : failure;
    const parsed = schema.safeParse(result);
    if (parsed.success) {
      // As in the binding contract, JSON status determines the outcome.
      return Response.json(parsed.data, {
        headers: { "Cache-Control": "private, no-store" },
      });
    }
  } catch {
    // Cyclic or otherwise non-serializable runtime values are also unconfirmed.
  }
  return Response.json(
    {
      status: "upstream_error",
      message:
        "The app did not return a confirmed result. The action may have completed; check before trying again.",
    },
    { status: 502, headers: { "Cache-Control": "private, no-store" } },
  );
}

/** Presentation only. The caller supplies the starter's server-generated SIWC URL. */
export function connectorErrorRecovery(
  error: { status: string; message: string },
  connectorName: string,
  reconnectHref: string,
): { message: string; action?: { label: string; href: string } } {
  if (error.status === "reauthentication_required") {
    return {
      message: error.message,
      action: { label: `Connect ${connectorName}`, href: reconnectHref },
    };
  }
  // Other outcomes do not prove that consent is missing or that replay is safe.
  return { message: error.message };
}
```

## File: `lib/connector-preview.d.ts`

```
declare module "virtual:sites-connector-preview" {
  const binding: import("./connector-contract.mjs").ConnectorBinding;
  export default binding;
}

// Only the local preview uses an environment binding. Hosted Sites receive the
// request-scoped capability through ctx.props.CONNECTORS in sites-worker.ts.
declare namespace Cloudflare {
  interface Env {
    CONNECTORS?: import("./connector-contract.mjs").ConnectorBinding;
  }
}
```

## File: `lib/connectors.ts`

```
import { createConnectors } from "./connector-contract.mjs";
import { getConnectorBinding } from "./connector-context";

/** Keep invocation context on this request; never cache it across visitors. */
export function connectorsForRequest() {
  return createConnectors(getConnectorBinding());
}
export type {
  ConnectorContext,
  ConnectorResult,
  ConnectorFailureStatus,
  Json,
} from "./connector-contract.mjs";
```

## File: `lib/utils.ts`

```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## File: `next.config.ts`

```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

## File: `playwright.config.ts`

```
import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  workers: 1,
  reporter: 'list',
  outputDir: 'outputs/playwright',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    channel:
      process.env.PLAYWRIGHT_CHANNEL ||
      (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined),
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ],
});
```

## File: `postcss.config.mjs`

```
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## File: `public/favicon.svg`

```
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="12" fill="#102d47"/><text x="32" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="bold" fill="white">H<tspan fill="#ee393d">M</tspan>F</text></svg>
```

## File: `scripts/build-verified.sh`

```
#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build
```

## File: `scripts/connector-preview/connector-preview-session.mjs`

```
import { randomUUID } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { parseArgs } from "node:util";
import { JSONRPCClient } from "json-rpc-2.0";
import { createPreviewBinding } from "./host-binding.mjs";
import {
  driverMessageSchema,
  grantsSchema,
  sessionOptionsSchema,
} from "./protocol.mjs";

// The agent starts this script through its terminal tool after creating a local
// Site and selecting connector read actions, following references/app-integrations.md#local-preview:
//   node <site-directory>/scripts/connector-preview/connector-preview-session.mjs <site-directory> <grants.json>
// During the agent development loop, the Site preview writes requests into a shared folder.
// This script checks each request with host-binding.mjs, then asks the agent over
// stdout to call the connector. The agent returns the tool result through stdin,
// and this script writes it back for the Site. The agent stops the script when
// previewing ends; neither the browser nor a deployed Site starts this process.
const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    concurrency: { type: "string" },
    "timeout-ms": { type: "string" },
    "lifetime-ms": { type: "string" },
    "max-calls": { type: "string" },
  },
});
const [project, grantsFile] = positionals;
if (positionals.length !== 2 || !path.isAbsolute(project)) {
  throw new Error(
    "Usage: node connector-preview-session.mjs <absolute-site-directory> <grants.json> [--concurrency 64] [--timeout-ms 120000] [--lifetime-ms N] [--max-calls N]",
  );
}
const limits = sessionOptionsSchema.parse(
  Object.fromEntries(
    [
      ["maxConcurrent", values.concurrency],
      ["timeoutMs", values["timeout-ms"]],
      ["lifetimeMs", values["lifetime-ms"]],
      ["maxCalls", values["max-calls"]],
    ]
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, Number(value)]),
  ),
);
const grants = grantsSchema.parse(
  JSON.parse(await readFile(grantsFile, "utf8")),
);
const root = path.join(project, ".sites-runtime", "connector-preview");
const id = randomUUID();
const directory = path.join(root, id);
const descriptor = path.join(root, "session.json");
const active = new Set();
const rpc = new JSONRPCClient(
  (message) =>
    new Promise((resolve, reject) => {
      process.stdout.write(`${JSON.stringify(message)}\n`, (error) =>
        error ? reject(error) : resolve(),
      );
    }),
);
const emit = (method, params) => rpc.notify(method, params);
let closing = false;
const binding = createPreviewBinding({
  ...limits,
  tools: grants.map((grant) => ({
    ...grant,
    async invoke(args) {
      const requestId = randomUUID();
      // JSON-RPC owns response matching and pending-call cleanup. Do not put an
      // RPC timeout here: uncertain calls occupy their slot until they settle.
      const response = await rpc.requestAdvanced({
        jsonrpc: "2.0",
        id: requestId,
        method: "invoke",
        params: {
          connectorId: grant.connectorId,
          actionName: grant.actionName,
          arguments: args,
        },
      });
      if (!closing)
        emit("receipt", { id: requestId, at: new Date().toISOString() });
      if (response.error)
        throw new Error("The agent did not confirm a connector result.");
      return response.result;
    },
  })),
});
await mkdir(directory, { recursive: true, mode: 0o700 });
try {
  // One owner per project. A crashed session must be explicitly cleaned up;
  // never silently take over another agent's connector session.
  await writeFile(
    descriptor,
    JSON.stringify({
      id,
      expiresAt:
        limits.lifetimeMs === undefined ? null : Date.now() + limits.lifetimeMs,
      timeoutMs: limits.timeoutMs,
      connectorIds: [...new Set(grants.map((grant) => grant.connectorId))],
    }),
    { flag: "wx", mode: 0o600 },
  );
} catch (error) {
  binding.close();
  await rm(directory, { recursive: true, force: true });
  throw error;
}
async function serve(name) {
  active.add(name);
  try {
    const body = await readFile(path.join(directory, name), "utf8");
    const response = await binding.fetch(
      new Request("http://preview/invoke", { method: "POST", body }),
    );
    if (!closing) {
      const output = path.join(
        directory,
        name.replace(".request", ".response"),
      );
      await writeFile(`${output}.tmp`, await response.text(), { mode: 0o600 });
      await rename(`${output}.tmp`, output);
    }
  } catch {
    // A timed-out caller can remove its request. The native call is never retried.
  } finally {
    await rm(path.join(directory, name), { force: true });
    active.delete(name);
  }
}
let scanning = false;
// The mailbox crosses network namespaces through the shared project directory.
// Atomic renames keep the reader from seeing partially written messages.
const poller = setInterval(async () => {
  if (closing || scanning) return;
  scanning = true;
  try {
    for (const name of await readdir(directory)) {
      if (/^[0-9a-f-]{36}\.request$/.test(name) && !active.has(name))
        void serve(name);
    }
  } catch (error) {
    if (!closing) {
      emit("session_error", { code: error.code });
      void close();
    }
  } finally {
    scanning = false;
  }
}, 50);
const expiry =
  limits.lifetimeMs === undefined
    ? undefined
    : setTimeout(() => {
        void close();
      }, limits.lifetimeMs);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
const input = createInterface({ input: process.stdin, terminal: false });
input.on("line", (line) => {
  try {
    const message = driverMessageSchema.parse(JSON.parse(line));
    if (message.method === "stop") {
      void close();
      return;
    }
    rpc.receive(message);
  } catch {
    emit("invalid_driver_message");
  }
});
async function close() {
  if (closing) return;
  closing = true;
  clearInterval(poller);
  clearTimeout(expiry);
  binding.close();
  rpc.rejectAllPendingRequests("The connector preview session ended.");
  await rm(descriptor, { force: true });
  await rm(directory, { recursive: true, force: true });
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  input.close();
  process.stdin.pause();
  emit("closed");
}
input.on("close", () => {
  void close();
});
process.stdin.on("data", (chunk) => {
  if (chunk.includes(3)) void close();
});
process.on("SIGTERM", () => {
  void close();
});
process.on("SIGINT", () => {
  void close();
});
emit("ready", {
  expiresInSeconds:
    limits.lifetimeMs === undefined ? null : limits.lifetimeMs / 1000,
  maxCalls: limits.maxCalls ?? null,
  maxConcurrent: limits.maxConcurrent,
  timeoutMs: limits.timeoutMs,
});
```

## File: `scripts/connector-preview/host-binding.mjs`

```
import { Readable } from "node:stream";
import { setMaxListeners } from "node:events";
import getRawBody from "raw-body";
import { z } from "zod/v4";
import {
  grantSchema,
  invocationSchema,
  sessionOptionsSchema,
} from "./protocol.mjs";

// Checks connector calls while the agent builds and tests a Site locally.
// connector-preview-session.mjs uses this helper after the agent chooses the read
// actions the Site may use. For each Site request, it checks that selection and
// the session limits before asking the agent to make the actual tool call.
// It also handles timeouts, shutdown, and which result fields reach the Site.
// This runs in the agent's temporary session, not in the deployed Site.
const messages = {
  invalid_request: "This app request is invalid or too large.",
  binding_unavailable:
    "Connected apps need an active agent preview session in this preview.",
  tool_not_allowed: "This preview cannot use the requested app action.",
  rate_limited:
    "A request limit was reached while using this connector. Please wait before trying again.",
  tool_error: "An error was reported while running this connector action.",
  upstream_error:
    "The app did not return a confirmed result. The action may have completed; check before trying again.",
};
const failure = (status) => ({ status, message: messages[status] });
const reply = (result) =>
  Response.json(result, { headers: { "Cache-Control": "no-store" } });
const requestIdSchema = z
  .string()
  .regex(/^[A-Za-z0-9._:-]{1,128}$/)
  .optional()
  .catch(undefined);
const resultSchema = z.object({
  error: z.never().optional(),
  status: z.never().optional(),
  content: z.array(z.object({ type: z.string() }).catchall(z.json())),
  structuredContent: z.json().optional(),
  isError: z.boolean().optional(),
  requestId: requestIdSchema,
});

export function createPreviewBinding({ tools, ...options }) {
  const { lifetimeMs, timeoutMs, maxCalls, maxConcurrent } =
    sessionOptionsSchema.parse(options);
  const grants = new Map();
  for (const tool of tools) {
    const { invoke, ...grant } = tool;
    if (!grantSchema.safeParse(grant).success || typeof invoke !== "function")
      throw new Error(
        "Preview tools must be authenticated, resolved read actions.",
      );
    const key = JSON.stringify([tool.connectorId, tool.actionName]);
    if (grants.has(key))
      throw new Error(
        "Ambiguous connector action; the host must resolve its connection first.",
      );
    grants.set(key, tool.invoke);
  }
  const expiresAt =
    lifetimeMs === undefined ? Infinity : Date.now() + lifetimeMs;
  const ended = new AbortController();
  setMaxListeners(maxConcurrent, ended.signal);
  const expiry =
    lifetimeMs === undefined
      ? undefined
      : setTimeout(() => ended.abort(), lifetimeMs);
  expiry?.unref();
  let remaining = maxCalls ?? Infinity;
  let active = 0;

  return {
    close() {
      clearTimeout(expiry);
      ended.abort();
    },
    async fetch(request) {
      if (ended.signal.aborted || Date.now() >= expiresAt)
        return reply(failure("binding_unavailable"));
      if (
        request.method !== "POST" ||
        new URL(request.url).pathname !== "/invoke"
      )
        return reply(failure("invalid_request"));
      let call;
      try {
        const body = await readBounded(request, 65536);
        call = invocationSchema.parse(JSON.parse(body));
      } catch {
        return reply(failure("invalid_request"));
      }
      // Recheck after reading the request; shutdown can happen while it streams.
      if (ended.signal.aborted || Date.now() >= expiresAt)
        return reply(failure("binding_unavailable"));
      const invoke = grants.get(
        JSON.stringify([call.connectorId, call.actionName]),
      );
      if (!invoke || remaining === 0) return reply(failure("tool_not_allowed"));
      if (active >= maxConcurrent) return reply(failure("rate_limited"));
      active++;
      remaining--;
      let deadline;
      let onEnd;
      try {
        const result = await Promise.race([
          // A timeout ends our wait, not the provider call. Count that work
          // against concurrency until it settles, without blocking other slots.
          Promise.resolve()
            .then(() => invoke(call.arguments))
            .then(publicResult)
            .finally(() => {
              active--;
            }),
          new Promise((resolve) => {
            deadline = setTimeout(
              () => resolve(failure("upstream_error")),
              timeoutMs,
            );
          }),
          new Promise((resolve) => {
            onEnd = () => resolve(failure("upstream_error"));
            ended.signal.addEventListener("abort", onEnd, { once: true });
          }),
        ]);
        if (ended.signal.aborted || Date.now() >= expiresAt)
          return reply(failure("upstream_error"));
        if (
          new TextEncoder().encode(JSON.stringify(result)).byteLength >
          8 * 1024 * 1024
        )
          return reply(failure("upstream_error"));
        return reply(result);
      } catch {
        return reply(failure("upstream_error"));
      } finally {
        clearTimeout(deadline);
        ended.signal.removeEventListener("abort", onEnd);
      }
    },
  };
}

export async function readBounded(request, limit) {
  if (!request.body) throw new Error("Missing body");
  const stream = Readable.fromWeb(request.body);
  try {
    // raw-body owns byte limits and stream errors; strict decoding rejects
    // malformed UTF-8 instead of silently changing the caller's arguments.
    return new TextDecoder("utf-8", { fatal: true }).decode(
      await getRawBody(stream, { limit }),
    );
  } finally {
    stream.destroy();
  }
}

function publicResult(result) {
  const parsed = resultSchema.safeParse(result);
  if (!parsed.success) return failure("upstream_error");
  result = parsed.data;
  // Native tools return MCP results; convert once at the preview host boundary.
  // Never accept provider-authored top-level status or transport metadata.
  const payload = {
    content: result.content,
    // Like the hosted binding, preserve every JSON value, including null.
    ...(result.structuredContent !== undefined
      ? { structuredContent: result.structuredContent }
      : {}),
  };
  const requestId =
    result.requestId === undefined ? {} : { requestId: result.requestId };
  if (result.isError === true) {
    const detail = result.structuredContent;
    if (detail?.error_code === "RATE_LIMITED") {
      const retryAfterMs =
        readRetryAfterMs(detail.retry_after_seconds) ??
        readRetryAfterMs(detail.retry_after);
      return {
        ...failure("rate_limited"),
        ...requestId,
        ...(retryAfterMs === undefined ? {} : { retryAfterMs }),
      };
    }
    const invalidArguments =
      detail?.error_code === "INVALID_ARGUMENT" &&
      detail.error_data?.type === "invalid_action_arguments" &&
      detail.error_data?.failure_stage === "argument_binding";
    return {
      ...failure(invalidArguments ? "invalid_request" : "tool_error"),
      result: payload,
      ...requestId,
    };
  }
  return { status: "success", result: payload, ...requestId };
}

function readRetryAfterMs(value) {
  let milliseconds;
  if (
    typeof value === "number" ||
    (typeof value === "string" && /^\d+$/.test(value.trim()))
  ) {
    milliseconds = Number(value) * 1000;
  } else if (
    typeof value === "string" &&
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(
      value.trim(),
    )
  ) {
    milliseconds = Math.max(0, Date.parse(value) - Date.now());
  }
  return Number.isSafeInteger(milliseconds) && milliseconds >= 0
    ? milliseconds
    : undefined;
}
```

## File: `scripts/connector-preview/protocol.mjs`

```
import { z } from "zod";

const name = z
  .string()
  .min(1)
  .max(256)
  .regex(/^[^\s/\x00-\x1f\x7f]+$/u);
const fields = { connectorId: name, actionName: name };

// Reject extra invocation fields: account selection and native tool names belong
// to the owning agent, not to the generated Site's request envelope.
export const invocationSchema = z
  .object({ ...fields, arguments: z.record(z.unknown()) })
  .strict();
export const grantSchema = z
  .object({ ...fields, readOnly: z.literal(true) })
  .strict();
export const grantsSchema = z.array(grantSchema);

// Only the owning agent sets these limits. Sessions otherwise last until their
// owner closes them; Node timers need a signed 32-bit millisecond duration.
const duration = z
  .number()
  .int()
  .positive()
  .max(2 ** 31 - 1);
export const sessionOptionsSchema = z
  .object({
    timeoutMs: duration.default(120000),
    maxConcurrent: z.number().int().positive().safe().default(64),
    lifetimeMs: duration.optional(),
    maxCalls: z.number().int().positive().safe().optional(),
  })
  .strict();

// The pipe carries JSON-RPC responses and a stop notification. Provider failures
// still travel inside result as MCP results; JSON-RPC errors mean driver failure.
export const driverMessageSchema = z.union([
  z.object({ jsonrpc: z.literal("2.0"), method: z.literal("stop") }).strict(),
  z
    .object({
      jsonrpc: z.literal("2.0"),
      id: z.string().uuid(),
      result: z.record(z.unknown()),
    })
    .strict(),
  z
    .object({
      jsonrpc: z.literal("2.0"),
      id: z.string().uuid(),
      error: z
        .object({
          code: z.number().int(),
          message: z.string(),
          data: z.unknown().optional(),
        })
        .strict(),
    })
    .strict(),
]);
```

## File: `scripts/connector-preview/worker.mjs`

```
import { WorkerEntrypoint } from "cloudflare:workers";
import binding from "virtual:sites-connector-preview";

// Local-only RPC target. The Site entrypoint scopes it to each request; the Node
// adapter relays each call to the owning agent.
export class ConnectorPreview extends WorkerEntrypoint {
  async getContext() {
    return binding.getContext?.() ?? { status: "binding_unavailable" };
  }

  async invoke(connectorId, actionName, args) {
    return binding.invoke(connectorId, actionName, args);
  }
}
const worker = { fetch() { return new Response("Not found", { status: 404 }); } };

export default worker;
```

## File: `scripts/execution-profile.mjs`

```
import { readFileSync } from "node:fs";

export function readExecutionProfile() {
  let settings;
  try {
    settings = JSON.parse(readFileSync(new URL("../.sites-runtime/execution-profile.json", import.meta.url), "utf8"));
  } catch (error) {
    // Clean clones and remote builds have no checkout-local selection.
    if (error.code === "ENOENT") return "portable";
    throw error;
  }
  if (!["managed-linux", "portable"].includes(settings?.executionProfile)) {
    throw new Error("Invalid local execution profile; rerun the Sites plugin's configure-execution-profile.mjs.");
  }
  return settings.executionProfile;
}
```

## File: `scripts/install-ci.mjs`

```
import { spawnSync } from "node:child_process";
import { accessSync, constants } from "node:fs";
import path from "node:path";
import { projectRoot } from "./sites-env.mjs";
import { readExecutionProfile } from "./execution-profile.mjs";
import { runNpmInstall } from "./npm-install.mjs";

if (!process.env.npm_execpath) {
  throw new Error("Run this installer with npm run install:ci.");
}

if (![
  "SHARP_IGNORE_GLOBAL_LIBVIPS",
  "SHARP_FORCE_GLOBAL_LIBVIPS",
  "npm_config_build_from_source",
  "NPM_CONFIG_BUILD_FROM_SOURCE",
].some((key) => key in process.env)) {
  process.env.SHARP_IGNORE_GLOBAL_LIBVIPS = "1";
}

if (readExecutionProfile() === "managed-linux") {
  const result = spawnSync("bash", [path.join(projectRoot, "scripts/install-ci.sh")], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

// Invoke npm's JavaScript entrypoint, avoiding platform-specific shell shims.
const installed = await runNpmInstall([
  process.execPath,
    process.env.npm_execpath, "ci", "--prefix", projectRoot, "--workspaces=false",
    "--include=dev", "--include=optional", "--prefer-offline", "--no-audit", "--no-fund",
]);
if (installed.signal) process.kill(process.pid, installed.signal);
if (installed.code !== 0 || installed.signal) process.exit(installed.code || 1);

try {
  accessSync(
    path.join(
      projectRoot, "node_modules", ".bin",
      process.platform === "win32" ? "vinext.cmd" : "vinext",
    ),
    process.platform === "win32" ? constants.F_OK : constants.X_OK,
  );
} catch {
  console.error("npm ci exited successfully but the local vinext executable is unavailable.");
  process.exitCode = 69;
}
```

## File: `scripts/install-ci.sh`

```
#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v flock || {
  echo "install-ci.sh requires Linux flock." >&2
  exit 69
}
command -v timeout || {
  echo "install-ci.sh requires GNU timeout." >&2
  exit 69
}
command -v curl || {
  echo "install-ci.sh requires curl for the locked-tarball preflight." >&2
  exit 69
}
command -v sha256sum || {
  echo "install-ci.sh requires sha256sum for cache and install verification." >&2
  exit 69
}

runtime_root="${SITES_RUNTIME_ROOT:-${SITES_PROJECT_ROOT}/.sites-runtime}"
expected_home="${runtime_root}/home"
expected_cache="${runtime_root}/npm-cache"

echo "[sites] validating writable install environment"
if [[ "${HOME}" != "${expected_home}" ]]; then
  echo "Expected HOME=${expected_home}, got HOME=${HOME}." >&2
  exit 78
fi
actual_cache="$(npm --prefix "${SITES_PROJECT_ROOT}" --workspaces=false config get cache)"
if [[ "${actual_cache}" != "${expected_cache}" ]]; then
  echo "Expected npm cache ${expected_cache}, got ${actual_cache}." >&2
  exit 78
fi
touch "${HOME}/.sites-write-test" "${expected_cache}/.sites-write-test"
rm -f "${HOME}/.sites-write-test" "${expected_cache}/.sites-write-test"
echo "[sites] environment passed: HOME=${HOME}, cache=${expected_cache}"

lock_file="${runtime_root}/install.lock"
exec 9>"${lock_file}"
if ! flock -n 9; then
  echo "Another dependency install is already running for ${SITES_PROJECT_ROOT}." >&2
  exit 75
fi

# Catch an installer started outside this helper. Linux exposes both its command
# line and working directory through /proc, so avoid broad process-name matches.
for process in /proc/[0-9]*; do
  pid="${process##*/}"
  [[ "${pid}" != "$$" && "${pid}" != "${PPID}" ]] || continue
  process_cwd="$(readlink -f "${process}/cwd" || true)"
  [[ "${process_cwd}" == "${SITES_PROJECT_ROOT}" ]] || continue
  process_command="$(tr '\0' ' ' <"${process}/cmdline" || true)"
  if [[ "${process_command}" == *"npm ci"* ]]; then
    echo "Another npm ci is visible in ${SITES_PROJECT_ROOT}; refusing to overlap installs." >&2
    exit 75
  fi
done

lockfile_sha256="$(sha256sum "${SITES_PROJECT_ROOT}/package-lock.json" | awk '{print $1}')"
use_seeded_cache=0
# Report seed selection separately from package cache hits or downloads.
cache_seed_result=seed_unavailable
seed_cache="${SITES_NPM_CACHE_SEED:-}"
if [[ -n "${seed_cache}" && -d "${seed_cache}" ]]; then
  seed_lockfile_sha256="$(cat "${seed_cache}/.sites-lockfile-sha256" || true)"
  if [[ "${seed_lockfile_sha256}" == "${lockfile_sha256}" ]]; then
    echo "[sites] restoring image-seeded npm cache"
    cp -a "${seed_cache}/." "${expected_cache}/"
    use_seeded_cache=1
    cache_seed_result=seed_used
    echo "[sites] image cache seed matched; registry fallback remains available"
  else
    cache_seed_result=seed_lockfile_mismatch
    echo "[sites] image cache seed does not match this lockfile; using the network path"
  fi
fi

locked_vinext_output="$({ node --input-type=module - "${SITES_PROJECT_ROOT}/package-lock.json" <<'NODE'
import { readFile } from "node:fs/promises";

const lock = JSON.parse(await readFile(process.argv[2], "utf8"));
const vinext = lock.packages?.["node_modules/vinext"];
if (!vinext?.resolved || !vinext?.integrity) {
  throw new Error("package-lock.json does not contain a resolved, integrity-pinned vinext tarball");
}
console.log(vinext.resolved);
console.log(vinext.integrity);
NODE
})" || {
  echo "Could not read the integrity-pinned vinext tarball from package-lock.json." >&2
  exit 65
}
mapfile -t locked_vinext <<<"${locked_vinext_output}"
if [[ "${#locked_vinext[@]}" -ne 2 ]]; then
  echo "Expected exactly one Vinext URL and integrity value from package-lock.json." >&2
  exit 65
fi

locked_tarball="${locked_vinext[0]}"
locked_integrity="${locked_vinext[1]}"

if [[ "${use_seeded_cache}" == "0" ]]; then
  registry="$(npm --prefix "${SITES_PROJECT_ROOT}" --workspaces=false config get registry)"
  preflight_url="$({ node --input-type=module - "${locked_tarball}" "${registry}" <<'NODE'
const locked = new URL(process.argv[2]);
const registry = new URL(process.argv[3]);
if (locked.hostname === "registry.npmjs.org") {
  locked.protocol = registry.protocol;
  locked.host = registry.host;
  locked.pathname = `${registry.pathname.replace(/\/$/, "")}${locked.pathname}`;
}
process.stdout.write(locked.href);
NODE
})" || {
  echo "Could not construct the locked-tarball preflight URL." >&2
  exit 65
  }

  preflight_dir="${runtime_root}/preflight"
  preflight_tarball="${preflight_dir}/vinext.tgz"
  mkdir -p "${preflight_dir}"

  echo "[sites] downloading the complete locked vinext tarball"
  curl \
    --fail \
    --location \
    --silent \
    --show-error \
    --retry 0 \
    --connect-timeout 15 \
    --max-time 120 \
    --output "${preflight_tarball}" \
    "${preflight_url}"

  echo "[sites] verifying locked vinext tarball integrity"
  node --input-type=module - "${preflight_tarball}" "${locked_integrity}" <<'NODE'
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const [algorithm, expected] = process.argv[3].split("-", 2);
if (!algorithm || !expected) {
  throw new Error(`unsupported integrity value: ${process.argv[3]}`);
}
const actual = createHash(algorithm)
  .update(await readFile(process.argv[2]))
  .digest("base64");
if (actual !== expected) {
  throw new Error(`vinext tarball integrity mismatch for ${algorithm}`);
}
NODE
  echo "[sites] network and integrity preflight passed"
fi

echo "[sites] running exactly one bounded npm ci"
export NPM_CONFIG_MAXSOCKETS=1
export NPM_CONFIG_FETCH_RETRIES=0
export NPM_CONFIG_FETCH_TIMEOUT=30000
npm_ci_args=(ci --prefix "${SITES_PROJECT_ROOT}" --workspaces=false --include=dev --include=optional --cache "${expected_cache}")
if [[ "${use_seeded_cache}" == "1" ]]; then
  npm_ci_args+=(--prefer-offline)
fi
timeout \
  --signal=TERM \
  --kill-after="${SITES_INSTALL_KILL_AFTER:-15s}" \
  "${SITES_INSTALL_TIMEOUT:-8m}" \
  node "${script_dir}/npm-install.mjs" "${cache_seed_result}" npm "${npm_ci_args[@]}"

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "npm ci exited successfully but node_modules/.bin/vinext is unavailable." >&2
  exit 69
fi

node --input-type=module - "${SITES_PROJECT_ROOT}/node_modules/.sites-install.json" "${lockfile_sha256}" <<'NODE'
import { writeFile } from "node:fs/promises";

await writeFile(
  process.argv[2],
  `${JSON.stringify({
    lockfile_sha256: process.argv[3],
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
  }, null, 2)}\n`,
);
NODE
echo "[sites] npm ci passed and vinext is available"
```

## File: `scripts/install-pnpm.sh`

```
#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

require_shared=0
prepare_only=0
for argument in "$@"; do
  case "${argument}" in
    --require-shared) require_shared=1 ;;
    --prepare-store) prepare_only=1 ;;
    *) echo "Unknown pnpm installation option: ${argument}" >&2; exit 64 ;;
  esac
done

for tool in flock timeout node; do
  command -v "${tool}" >/dev/null || { echo "pnpm setup requires Linux flock, GNU timeout, and Node.js." >&2; exit 69; }
done
cache_seed=decision_unavailable
store_scope=unknown
store_state=unavailable
report_store() {
  node "${script_dir}/pnpm-install.mjs" --report-store "${cache_seed}" "${store_scope}" "${store_state}" "${prepare_only}"
}
# Publish preparation failures too; the optional report never decides success.
trap 'report_store || true' EXIT

if [[ -n "${SITES_PNPM_BIN:-}" && -f "${SITES_PNPM_BIN}" && -r "${SITES_PNPM_BIN}" ]]; then
  pnpm_command=(node "${SITES_PNPM_BIN}")
elif [[ "${require_shared}" == 1 ]]; then
  echo "[sites] the image-pinned pnpm is unavailable" >&2
  exit 69
elif command -v corepack >/dev/null; then
  # Corepack honors the established project's pin even when PATH has a different
  # pnpm version. A bare pnpm is used only if Corepack is absent, then verified.
  pnpm_command=(corepack pnpm)
elif command -v pnpm >/dev/null; then
  pnpm_command=(pnpm)
else
  echo "This pnpm project requires pnpm 11.25.0 or Corepack." >&2
  exit 69
fi

runtime_root="${SITES_RUNTIME_ROOT:-${SITES_PROJECT_ROOT}/.sites-runtime}"
private_store="${runtime_root}/pnpm-store"
if [[ "${HOME}" != "${runtime_root}/home" || -L "${private_store}" ]]; then
  echo "Dependency setup requires a project-owned writable home and pnpm store." >&2
  exit 78
fi
# A single Node process owns the regular-file descriptors for both leases.
# Closing its input (including this shell exiting) releases the project lock.
coproc SITES_INSTALL_LOCKS {
  node "${script_dir}/pnpm-install.mjs" --hold-install-locks \
    "${runtime_root}/install.lock" "${SITES_PNPM_SHARED_STORE:-}.seed.lock" \
    "${SITES_PNPM_STORE_LOCK_TIMEOUT:-30}"
}
install_lock_pid="${SITES_INSTALL_LOCKS_PID}"
install_lock_output="${SITES_INSTALL_LOCKS[0]}"
install_lock_input="${SITES_INSTALL_LOCKS[1]}"
lock_status=unavailable
read -r lock_status <&"${install_lock_output}" || true
if [[ "${lock_status}" != locked ]]; then
  exec {install_lock_input}>&-
  exec {install_lock_output}<&-
  wait "${install_lock_pid}" || true
  if [[ "${lock_status}" == busy ]]; then
    echo "Another dependency install is already running for ${SITES_PROJECT_ROOT}." >&2
    exit 75
  fi
  echo "Dependency setup requires a regular, writable project install lock." >&2
  exit 78
fi
export XDG_CACHE_HOME="${runtime_root}/xdg-cache" XDG_DATA_HOME="${runtime_root}/xdg-data"
mkdir -p "${XDG_CACHE_HOME}" "${XDG_DATA_HOME}" || exit 70
pnpm_version="$(timeout --signal=TERM --kill-after="${SITES_INSTALL_KILL_AFTER:-15s}" \
  "${SITES_PNPM_BOOTSTRAP_TIMEOUT:-30s}" "${pnpm_command[@]}" --version)"
if [[ "${pnpm_version}" != "11.25.0" ]]; then
  echo "This project requires pnpm 11.25.0 and its v11 store format." >&2
  exit 69
fi

can_write_directory() {
  local probe
  # access()/test -w can succeed even when a kernel sandbox denies a write.
  probe="$(mktemp "${1}/.sites-store-probe.XXXXXX" 2>/dev/null)" || return 1
  rm -f -- "${probe}" 2>/dev/null
}

release_shared_lock() {
  if [[ "${shared_lock_held:-}" == 1 ]]; then
    printf '%s\n' release-shared >&"${install_lock_input}"
    local status
    read -r status <&"${install_lock_output}" && [[ "${status}" == released ]] || return 70
    shared_lock_held=0
  fi
}

acquire_shared_lock() {
  # The Node holder opens this workspace-controlled entry with no-follow and
  # nonblocking flags, then verifies a regular file before bounded flock.
  printf '%s\n' shared >&"${install_lock_input}"
  local status
  if read -r status <&"${install_lock_output}" && [[ "${status}" == locked ]]; then
    shared_lock_held=1
    return 0
  fi
  return 1
}

writable_store="${private_store}"
shared_store="${SITES_PNPM_SHARED_STORE:-}"
if [[ "${shared_store}" == "/workspace/.sites-runtime/pnpm-store" &&
      ! -L "${shared_store}" && ! -L "${shared_store%/*}" &&
      -d "${shared_store%/*/*}" ]]; then
  # Normal Work already writes this owner's workspace. Narrower profiles must
  # pass the actual create probe, without widening their permissions.
  if mkdir -p "${shared_store%/*}" 2>/dev/null &&
      can_write_directory "${shared_store%/*}" &&
      acquire_shared_lock; then
    if [[ ! -L "${shared_store}" && ! -L "${shared_store%/*}" &&
          ( ! -e "${shared_store}" || ( -d "${shared_store}" && ! -L "${shared_store}" && -w "${shared_store}" ) ) ]] &&
        { [[ ! -d "${shared_store}" ]] || can_write_directory "${shared_store}"; }; then
      writable_store="${shared_store}"
      store_scope=workspace
    else
      release_shared_lock
    fi
  else
    release_shared_lock
  fi
fi
if [[ "${store_scope}" != workspace ]]; then
  if [[ "${require_shared}" == 1 ]]; then
    echo "[sites] the workspace pnpm store is unavailable" >&2
    exit 69
  fi
  store_scope=project
fi

seed="${SITES_PNPM_CACHE_SEED:-}"
cache_seed=seed_unavailable
if [[ -d "${writable_store}" ]]; then
  # Never merge a newer image seed into an existing mutable store.
  store_state=reused
  cache_seed=not_applicable
  if [[ -f "${writable_store}/.sites-pnpm-seed-applied.json" ]]; then cache_seed=seed_used; fi
else
  seed_compatible=0
  if [[ -n "${seed}" && -d "${seed}/v11" ]] && node --input-type=module - "${seed}/.sites-pnpm-seed.json" <<'NODE'
import { readFileSync, statSync } from "node:fs";
try {
  const filename = process.argv[2];
  if (statSync(filename).size > 4096) process.exit(1);
  const seed = JSON.parse(readFileSync(filename, "utf8"));
  process.exit(seed.version === 1 && seed.pnpm_version === "11.25.0" &&
    seed.store_version === "v11" && /^[a-f0-9]{64}$/.test(seed.lockfile_sha256) ? 0 : 1);
} catch { process.exit(1); }
NODE
  then seed_compatible=1; fi
  if [[ "${seed_compatible}" == 1 ]]; then
    if [[ "${prepare_only}" == 1 ]]; then
      echo "[sites] copying the image seed into the writable ${store_scope} pnpm store" >&2
    else
      echo "[sites] copying the image seed into the writable ${store_scope} pnpm store"
    fi
    seed_stage="$(mktemp -d "${writable_store}.seed.XXXXXX")" || exit 70
    trap 'if [[ -n "${seed_stage:-}" ]]; then rm -rf -- "${seed_stage}"; fi; report_store || true' EXIT
    timeout --signal=TERM --kill-after="${SITES_INSTALL_KILL_AFTER:-15s}" \
      "${SITES_PNPM_STORE_PREPARE_TIMEOUT:-60s}" bash -c \
      'cp -a --no-preserve=ownership "$1/." "$2/" && chmod -R u+rwX "$2"' _ "${seed}" "${seed_stage}" || exit 70
    cp "${seed}/.sites-pnpm-seed.json" "${seed_stage}/.sites-pnpm-seed-applied.json" || exit 70
    # An ordinary pnpm command can initialize the store without our seed lock.
    # Publish without replacing even an empty directory created by that command.
    mv -T --update=none "${seed_stage}" "${writable_store}" || exit 70
    if [[ -d "${seed_stage}" ]]; then
      if [[ -L "${writable_store}" || ! -d "${writable_store}" ]]; then exit 78; fi
      rm -rf -- "${seed_stage}" || exit 70
      store_state=reused
      cache_seed=not_applicable
      if [[ -f "${writable_store}/.sites-pnpm-seed-applied.json" ]]; then cache_seed=seed_used; fi
    else
      store_state=seeded
      cache_seed=seed_used
    fi
    seed_stage=""
  else
    mkdir -p "${writable_store}" || exit 70
    store_state=created
  fi
fi
if ! can_write_directory "${writable_store}"; then store_state=unavailable; exit 70; fi
release_shared_lock
report_store
trap - EXIT
if [[ "${prepare_only}" == 1 ]]; then exit 0; fi

# Configuration travels with source without embedding an absolute machine path.
# A later restricted session selects a private store before its frozen repair.
configured_store=.sites-runtime/pnpm-store
if [[ "${store_scope}" == workspace ]]; then
  configured_store='${SITES_PNPM_SHARED_STORE:-.sites-runtime/pnpm-store}'
elif [[ "${runtime_root}" != "${SITES_PROJECT_ROOT}/.sites-runtime" ]]; then
  configured_store='${SITES_RUNTIME_ROOT:-.sites-runtime}/pnpm-store'
fi
"${pnpm_command[@]}" config set package-import-method auto --location project
"${pnpm_command[@]}" config set store-dir "${configured_store}" --location project
"${pnpm_command[@]}" config set cache-dir "${configured_store}/policy-cache" --location project

# CI=true lets native pnpm install rebuild modules whose store moved, without a
# prompt, --force, changing the lockfile, or translating the project into npm.
CI=true timeout --signal=TERM --kill-after="${SITES_INSTALL_KILL_AFTER:-15s}" \
  "${SITES_INSTALL_TIMEOUT:-8m}" node "${script_dir}/pnpm-install.mjs" \
  "${cache_seed}" "${store_scope}" "${store_state}" "${writable_store}" "${pnpm_command[@]}"
```

## File: `scripts/npm-install.mjs`

```
import { spawn, spawnSync } from "node:child_process";
import {
  closeSync,
  constants,
  fstatSync,
  ftruncateSync,
  openSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { constants as osConstants } from "node:os";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const MAX_PACKAGES = 100_000;

// npm reports tarball cache reads separately from registry metadata requests.
// Count unique installed tarball URLs, not image seeds or network bytes. Require
// complete coverage of npm's installed lock so older/partial logs stay unknown.
export class NpmCacheProgress {
  entries = new Map();
  invalid = false;

  constructor(registry) {
    try {
      const value = new URL(registry);
      if (["http:", "https:"].includes(value.protocol)) this.registry = value;
    } catch {}
  }

  accept(line) {
    const match = line.match(
      /^npm http (?:cache |fetch GET 200 )(\S+) \d+ms(?: attempt #\d+)? \(cache (hit|miss|revalidated|updated|skip)\)$/,
    );
    if (!match) return;
    const [, spec, status] = match;
    // Pacote's direct content-cache log uses name@URL; HTTP cache logs use URL.
    const url = spec.replace(/^(?:@[^/]+\/)?[^@/]+@(?=https?:\/\/)/, "");
    if (
      url.length > 4096 ||
      (this.entries.size >= MAX_PACKAGES && !this.entries.has(url))
    ) {
      this.invalid = true;
      return;
    }
    const downloaded = !["hit", "revalidated"].includes(status);
    this.entries.set(url, downloaded || this.entries.get(url) === true);
  }

  counts(lock) {
    if (this.invalid || lock?.lockfileVersion !== 3 || !lock.packages)
      return {};
    const urls = new Set(
      Object.values(lock.packages)
        .map((pkg) => pkg?.resolved)
        .filter((url) => typeof url === "string" && /^https?:\/\//.test(url)),
    );
    if (!urls.size || urls.size > MAX_PACKAGES) return {};
    const observed = new Set();
    let downloaded = 0;
    for (const url of urls) {
      let candidates = [url];
      if (this.registry) {
        const locked = new URL(url);
        if (locked.hostname === "registry.npmjs.org") {
          // Match npm/pacote's host rewrite and registry-fetch's path prefix
          // using npm's effective configuration, never an arbitrary suffix.
          candidates = [
            ...new Set([
              url,
              new URL(locked.pathname, this.registry).href,
              this.registry.href.replace(/\/$/, "") +
                locked.pathname +
                locked.search,
            ]),
          ];
        }
      }
      const matches = candidates.filter((candidate) =>
        this.entries.has(candidate),
      );
      if (
        !matches.length ||
        matches.some((candidate) => observed.has(candidate))
      )
        return {};
      for (const candidate of matches) observed.add(candidate);
      // A corrupt direct-cache hit followed by a mirror fetch is a download.
      if (matches.some((candidate) => this.entries.get(candidate)))
        downloaded++;
    }
    return {
      packages_reused: urls.size - downloaded,
      packages_downloaded: downloaded,
    };
  }
}

export async function runNpmInstall(command, cacheSeed = "not_applicable") {
  let descriptor;
  try {
    if (process.env.SITES_INSTALL_REPORT_PATH && constants.O_NOFOLLOW) {
      descriptor = openSync(
        process.env.SITES_INSTALL_REPORT_PATH,
        constants.O_WRONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK,
      );
      if (!fstatSync(descriptor).isFile()) {
        closeSync(descriptor);
        descriptor = undefined;
      }
    }
  } catch {
    if (descriptor !== undefined) {
      try {
        closeSync(descriptor);
      } catch {}
    }
    descriptor = undefined;
  }
  const env = { ...process.env };
  delete env.SITES_INSTALL_REPORT_PATH;
  const [executable, ...args] = command;
  let registry;
  const installIndex = args.indexOf("ci");
  if (descriptor !== undefined && installIndex >= 0) {
    try {
      const configured = spawnSync(
        executable,
        [...args.slice(0, installIndex), "config", "get", "registry"],
        {
          env,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
          timeout: 3000,
          maxBuffer: 4096,
        },
      );
      if (configured.status === 0) registry = configured.stdout.trim();
    } catch {}
  }
  const progress = new NpmCacheProgress(registry);
  let receivedSignal;
  const handlers = ["SIGINT", "SIGHUP", "SIGTERM"].map((signal) => {
    const handler = () => {
      receivedSignal ??= signal;
    };
    process.on(signal, handler);
    return [signal, handler];
  });
  let result = { code: 1, signal: null };
  try {
    const child = spawn(executable, [...args, "--loglevel=http"], {
      env,
      stdio: ["inherit", "inherit", "pipe"],
    });
    const lines = createInterface({ input: child.stderr, crlfDelay: Infinity });
    lines.on("line", (line) => {
      progress.accept(line);
      // Do not add package URLs to normal helper output just for telemetry.
      if (!line.startsWith("npm http ")) process.stderr.write(`${line}\n`);
    });
    let startError;
    child.once("error", (error) => {
      startError = error;
    });
    result = await new Promise((resolve) =>
      child.once("close", (code, signal) => {
        resolve({
          code: startError ? (startError.code === "ENOENT" ? 127 : 1) : code,
          signal,
        });
      }),
    );
    lines.close();
    if (startError) process.stderr.write("Unable to start npm.\n");
  } finally {
    for (const [signal, handler] of handlers)
      process.removeListener(signal, handler);
    result.signal ??= receivedSignal;
    try {
      let counts = {};
      if (result.code === 0 && !result.signal) {
        try {
          counts = progress.counts(
            JSON.parse(readFileSync("node_modules/.package-lock.json", "utf8")),
          );
        } catch {}
      }
      if (descriptor !== undefined) {
        ftruncateSync(descriptor, 0);
        writeFileSync(
          descriptor,
          `${JSON.stringify({
            version: 1,
            cache_seed:
              result.code === 0 && !result.signal
                ? cacheSeed
                : "decision_unavailable",
            ...counts,
          })}\n`,
        );
      }
    } catch {
      // Telemetry must not change installation behavior.
    } finally {
      if (descriptor !== undefined) {
        try {
          closeSync(descriptor);
        } catch {}
      }
    }
  }
  return result;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const [cacheSeed, ...command] = process.argv.slice(2);
  const result = await runNpmInstall(command, cacheSeed);
  process.exitCode = result.signal
    ? 128 + (osConstants.signals[result.signal] ?? 0)
    : result.code ?? 1;
  if (result.signal) {
    try {
      process.kill(process.pid, result.signal);
    } catch {}
  }
}
```

## File: `scripts/pnpm-install.mjs`

```
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  accessSync,
  closeSync,
  constants,
  fstatSync,
  ftruncateSync,
  openSync,
  readFileSync,
  writeFileSync,
  writeSync,
} from "node:fs";
import { constants as osConstants } from "node:os";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const MAX_PACKAGES = 100_000;
const CACHE_SEEDS = new Set(["seed_used", "seed_unavailable", "seed_lockfile_mismatch", "decision_unavailable", "not_applicable"]);
const STORE_STATES = new Set(["created", "seeded", "reused", "unavailable"]);
// The caller may use operational status only for
// initial-setup fallback; an established project always retains pnpm. Broad
// fetch failures can include TLS/auth errors and stay fatal.
const OPERATIONAL_FAILURE_CODES = new Set([
  "ERR_PNPM_UNEXPECTED_STORE",
  "ERR_PNPM_UNEXPECTED_VIRTUAL_STORE",
  "ERR_PNPM_OUTDATED_LOCKFILE",
  "ERR_PNPM_FROZEN_LOCKFILE_WITH_OUTDATED_LOCKFILE",
  "ERR_PNPM_NO_LOCKFILE",
  "ERR_PNPM_FETCH_408",
  "ERR_PNPM_FETCH_429",
  "ERR_PNPM_FETCH_500",
  "ERR_PNPM_FETCH_502",
  "ERR_PNPM_FETCH_503",
  "ERR_PNPM_FETCH_504",
]);

// These are pnpm-reported package IDs, not an assertion about network bytes or
// image-cache provenance. Do not interpret an installed-tree no-op as 100% reuse.
export class InstallProgress {
  constructor(project) {
    this.project = path.resolve(project);
    this.reused = new Set();
    this.downloaded = new Set();
    this.complete = false;
    this.added = undefined;
    this.invalid = false;
  }

  accept(event) {
    if (event?.name === "pnpm:stats" && event.prefix === this.project &&
        Number.isSafeInteger(event.added) && event.added >= 0) this.added = event.added;
    if (event?.name === "pnpm:stage" && event.stage === "importing_done" &&
        event.prefix === this.project) this.complete = true;
    if (event?.name !== "pnpm:progress" || event.requester !== this.project ||
        !["fetched", "found_in_store"].includes(event.status)) return;
    if (typeof event.packageId !== "string" || !event.packageId || event.packageId.length > 4096 ||
        this.reused.size + this.downloaded.size >= MAX_PACKAGES) {
      this.invalid = true;
      return;
    }
    if (event.status === "fetched") {
      this.reused.delete(event.packageId);
      this.downloaded.add(event.packageId);
    } else if (!this.downloaded.has(event.packageId)) {
      this.reused.add(event.packageId);
    }
  }

  counts(success) {
    if (!success || !this.complete || !(this.added > 0) || this.invalid ||
        this.reused.size + this.downloaded.size === 0) return {};
    return { packages_reused: this.reused.size, packages_downloaded: this.downloaded.size };
  }
}

function openReport() {
  const report = process.env.SITES_INSTALL_REPORT_PATH;
  if (!report || !constants.O_NOFOLLOW) return undefined;
  let fd;
  try {
    fd = openSync(report, constants.O_WRONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    if (fstatSync(fd).isFile()) return fd;
  } catch {}
  if (fd !== undefined) closeSync(fd);
  return undefined;
}

function writeReport(fd, report) {
  if (fd === undefined) return;
  try {
    const body = `${JSON.stringify(report)}\n`;
    writeSync(fd, body, 0, "utf8");
    ftruncateSync(fd, Buffer.byteLength(body));
  } catch {
    // Optional telemetry must not change installation behavior or expose its path.
  }
}

function showLine(line, progress, failure) {
  let event;
  try {
    event = JSON.parse(line);
  } catch {
    process.stdout.write(`${line}\n`);
    return;
  }
  progress.accept(event);
  if (event?.level === "error" && failure.code !== 65) {
    failure.code = event.name === "pnpm" && OPERATIONAL_FAILURE_CODES.has(event.err?.code)
      ? 70 : 65;
  }
  const message = event?.message ?? event?.err?.message;
  if (event?.name === "pnpm:lifecycle" && typeof event.line === "string") {
    process.stdout.write(`${event.line}\n`);
  } else if (typeof message === "string" && ["warn", "error", "info"].includes(event.level)) {
    const output = event.level === "error" ? process.stderr : process.stdout;
    output.write(`${message}\n`);
  }
}

async function openLock(filename, waitSeconds) {
  let fd;
  try {
    if (!filename || !constants.O_NOFOLLOW || !constants.O_NONBLOCK) throw new Error("Unsupported lock");
    fd = openSync(filename, constants.O_CREAT | constants.O_RDWR | constants.O_NOFOLLOW | constants.O_NONBLOCK, 0o600);
    if (!fstatSync(fd).isFile()) throw new Error("Expected a regular lock file");
    const child = spawn("flock", ["-w", waitSeconds, "3"], { stdio: ["ignore", "ignore", "ignore", fd] });
    const code = await new Promise((resolve) => {
      child.once("error", () => resolve(undefined));
      child.once("close", resolve);
    });
    if (code === 0) return { status: "locked", fd };
    closeSync(fd);
    return { status: code === undefined ? "unavailable" : "busy" };
  } catch {
    if (fd !== undefined) closeSync(fd);
    return { status: "unavailable" };
  }
}

async function holdInstallLocks(projectLock, sharedLock, waitSeconds) {
  // The shell holds both leases through stdin. EOF (including caller exit)
  // releases the same open file descriptions that flock locked in its child.
  const requests = createInterface({ input: process.stdin, crlfDelay: Infinity });
  const project = await openLock(projectLock, "0");
  let shared;
  try {
    process.stdout.write(`${project.status}\n`);
    for await (const request of requests) {
      if (request === "shared" && project.fd !== undefined) {
        shared ??= await openLock(sharedLock, waitSeconds);
        process.stdout.write(`${shared.status}\n`);
      } else if (request === "release-shared") {
        if (shared?.fd !== undefined) closeSync(shared.fd);
        shared = undefined;
        process.stdout.write("released\n");
      } else {
        process.stdout.write("unavailable\n");
      }
    }
  } finally {
    if (shared?.fd !== undefined) closeSync(shared.fd);
    if (project.fd !== undefined) closeSync(project.fd);
    requests.close();
  }
}

async function main() {
  const argsIn = process.argv.slice(2);
  if (argsIn[0] === "--hold-install-locks") {
    await holdInstallLocks(argsIn[1], argsIn[2], argsIn[3]);
    return;
  }
  if (argsIn[0] === "--report-store") {
    const [, cacheSeed, storeScope, storeState, stdout] = argsIn;
    if (!CACHE_SEEDS.has(cacheSeed) || !["project", "workspace", "unknown"].includes(storeScope) ||
        !STORE_STATES.has(storeState)) { process.exitCode = 64; return; }
    const report = { version: 1, cache_seed: cacheSeed, store_scope: storeScope, store_state: storeState };
    const fd = openReport();
    writeReport(fd, report);
    if (fd !== undefined) closeSync(fd);
    if (stdout === "1") process.stdout.write(`${JSON.stringify(report)}\n`);
    return;
  }
  const [cacheSeed, storeScope, storeState, store, executable, ...prefix] = argsIn;
  if (!CACHE_SEEDS.has(cacheSeed) || !["project", "workspace"].includes(storeScope) ||
      !STORE_STATES.has(storeState) || storeState === "unavailable" ||
      !store || !path.isAbsolute(store) || !executable) {
    process.stderr.write("Invalid pnpm installation arguments.\n");
    process.exitCode = 64;
    return;
  }
  const fd = openReport();
  const report = { version: 1, cache_seed: cacheSeed, store_scope: storeScope, store_state: storeState };
  writeReport(fd, report);
  const progress = new InstallProgress(process.cwd());
  const failure = {};
  const env = { ...process.env };
  delete env.SITES_INSTALL_REPORT_PATH;
  const args = [...prefix, "install", "--prod=false", "--ignore-scripts=false",
    "--frozen-lockfile", "--prefer-offline", "--store-dir", store,
    "--cache-dir", path.join(store, "policy-cache"), "--fetch-retries=0",
    "--fetch-timeout=30000", "--network-concurrency=1", "--reporter=ndjson",
    "--package-import-method=auto"];
  let result = { code: 1, signal: null };
  let receivedSignal;
  try {
    const child = spawn(executable, args, { env, stdio: ["inherit", "pipe", "inherit"] });
    const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
    lines.on("line", (line) => showLine(line, progress, failure));
    // timeout/exec owns the inherited group. Relaying would deliver signals twice.
    const signalHandlers = ["SIGINT", "SIGHUP", "SIGTERM"].map((signal) => {
      const handler = () => { receivedSignal ??= signal; };
      process.on(signal, handler);
      return [signal, handler];
    });
    let spawnError;
    child.once("error", (error) => { spawnError = error; });
    result = await new Promise((resolve) => child.once("close", (code, signal) => {
      resolve({ code: spawnError ? (spawnError.code === "ENOENT" ? 127 : 1) : code, signal });
    }));
    for (const [signal, handler] of signalHandlers) process.removeListener(signal, handler);
    lines.close();
    result.signal ??= receivedSignal;
    if (spawnError) {
      process.stderr.write("Unable to start pnpm.\n");
      result.code = spawnError.code === "ENOENT" ? 127 : 65;
    } else if (result.code !== 0 && !result.signal) {
      result.code = failure.code ?? 65;
    }
    if (result.code === 0 && !result.signal) {
      accessSync("node_modules/.bin/vinext", constants.X_OK);
      const lock = readFileSync("pnpm-lock.yaml");
      writeFileSync("node_modules/.sites-install.json", `${JSON.stringify({
        package_manager: "pnpm@11.25.0",
        lockfile_sha256: createHash("sha256").update(lock).digest("hex"),
        node: process.version,
        platform: `${process.platform}-${process.arch}`,
      }, null, 2)}\n`);
    }
  } catch {
    process.stderr.write("Dependency setup did not produce a usable Vinext installation.\n");
    result = { code: 65, signal: receivedSignal ?? null };
  } finally {
    Object.assign(report, progress.counts(result.code === 0 && !result.signal));
    writeReport(fd, report);
    if (fd !== undefined) closeSync(fd);
  }
  if (report.packages_reused !== undefined) {
    process.stdout.write(`[sites] pnpm reused ${report.packages_reused} packages and downloaded ${report.packages_downloaded}\n`);
  }
  if (result.code === 0 && !result.signal) process.stdout.write("[sites] dependency setup passed\n");
  process.exitCode = result.signal ? 128 + (osConstants.signals[result.signal] ?? 0) : result.code ?? 1;
  if (result.signal) {
    try { process.kill(process.pid, result.signal); } catch {}
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
```

## File: `scripts/prepare-test-db.mjs`

```
import {spawnSync} from 'node:child_process';
import {existsSync,readFileSync,readdirSync,writeFileSync} from 'node:fs';

// For a fresh, local-only CI checkout. Refuse to reset an existing database.
function sql(args) {
  const result=spawnSync(process.execPath,['--import','./scripts/sites-env.mjs','node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','dist/server/wrangler.json','--persist-to','.wrangler/state',...args],{encoding:'utf8'});
  if(result.status!==0) throw new Error(result.stderr||result.stdout);
  return result.stdout;
}
if(!existsSync('dist/server/wrangler.json')) throw new Error('Run npm run build first.');
const existing=JSON.parse(sql(['--command',"SELECT name FROM sqlite_master WHERE name='employees'",'--json']));
if(existing.some(r=>r.results.length)) throw new Error('An employee database already exists. Apply only pending migrations; this script never resets data.');
for(const file of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()) sql(['--file','drizzle/'+file]);
const vars='HMF_DEMO_MODE="true"\nHMF_DEMO_PASSWORD="[REDACTED_DEMO_PASSWORD]"\n';
if(existsSync('.dev.vars') && readFileSync('.dev.vars','utf8')!==vars) throw new Error('Existing .dev.vars left unchanged. Configure explicit demo seeding yourself.');
if(!existsSync('.dev.vars')) writeFileSync('.dev.vars',vars,{flag:'wx',mode:0o600});
console.log('Fresh local test database prepared. Demo seeding is explicitly enabled only in ignored .dev.vars.');
```

## File: `scripts/render-demo.swift`

```
import AppKit
import AVFoundation

let folder = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let footage = folder.appendingPathComponent(UUID().uuidString + ".mp4")
let scenes: [(String, Int, String, String)] = [
    ("today", 29, "Employee · Today", "Start on Today. Choose your working location and select Check in. When you finish, return here to check out. The portal flags an open check-in that needs attention. The separate attendance form is for updating your status or reporting an absence."),
    ("hours", 25, "Employee · Hours", "Open Hours to compare recorded and scheduled time. Change the period to review a different date range. If a check-in or checkout is missing or wrong, use the correction action on that row and explain what needs to change."),
    ("schedule", 17, "Employee · Schedule", "Schedule shows the work pattern assigned to you. Change the date to see the schedule that applies on that day. Working days, shift times and breaks depend on the settings saved for your profile."),
    ("history", 16, "Employee · Attendance history", "History shows your previous attendance submissions, their status and when the record was updated. Use this page to check how a previous day was recorded."),
    ("profile", 16, "Employee · My profile", "My profile shows your employment and office details. Ask your manager or HR about incorrect information. Your work schedule and leave allowance depend on the information authorized staff maintain here."),
    ("leave", 24, "Employee · Leave and holidays", "Leave brings together your allowance, carry-forward, approved leave and remaining balance. When the office has configured its holiday calendar, public holidays are shown here. A blank balance means the setup information needed to calculate it is incomplete."),
    ("request", 22, "Employee · Request leave", "Select Request leave, enter the start and end dates, and submit. The request appears under My requests while it awaits a decision. Use Cancel request if your plans change while it is still pending."),
    ("admin", 30, "Admin · Team attendance", "Now we are in the management workspace. Attendance shows records for the people you can access. Use the date and office filters to focus the view. Open an employee record to see its details, including relevant attendance and activity history."),
    ("people", 23, "Admin · People", "People is the employee directory. Search for an employee or narrow the list by office and status. Authorized staff can open or edit a profile, assign a work schedule and manage account permissions."),
    ("teamhours", 24, "Admin · Team hours", "Team hours brings scheduled and recorded hours into the same view. Use the filters to find missing entries, late submissions or overtime. Review pending corrections and record a decision so the change can be tracked."),
    ("teamleave", 20, "Admin · Leave review", "The Leave review queue shows pending requests within your scope. Open a request to approve or decline it and enter a decision note. Employees can see the resulting status in their own Leave view."),
    ("settings", 21, "Admin · Settings", "Settings is where authorized administrators maintain offices, departments, attendance options and schedule templates. Agree on working-hour rules before applying them. The demo uses fictional records and example settings."),
    ("reports", 33, "Admin · CSV reports", "Open Reports, choose a start and end date, and download attendance submissions or team hours. Each download uses your team access. The attendance report includes submissions and omits private notes. This concludes the employee and admin walkthrough of HMF Attendance.")
]

let width = 1280, height = 800, fps: Int32 = 2
let writer = try AVAssetWriter(outputURL: footage, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width, AVVideoHeightKey: height
])
let frames = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height
])
writer.add(input)
guard writer.startWriting() else { throw writer.error! }
writer.startSession(atSourceTime: .zero)

var frame: Int64 = 0
for (name, seconds, title, _) in scenes {
    let picture = NSImage(contentsOf: folder.appendingPathComponent(name + ".jpg"))!
    var buffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, frames.pixelBufferPool!, &buffer)
    let pixels = buffer!
    CVPixelBufferLockBaseAddress(pixels, [])
    let context = CGContext(data: CVPixelBufferGetBaseAddress(pixels), width: width, height: height,
        bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixels),
        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: false)
    NSColor(srgbRed: 0.06, green: 0.17, blue: 0.27, alpha: 1).setFill()
    NSBezierPath(rect: NSRect(x: 0, y: 0, width: width, height: height)).fill()
    picture.draw(in: NSRect(x: 0, y: 80, width: width, height: 720))
    (title as NSString).draw(at: NSPoint(x: 32, y: 25), withAttributes: [
        .font: NSFont.systemFont(ofSize: 25, weight: .semibold), .foregroundColor: NSColor.white
    ])
    ("HMF ATTENDANCE  /  DEMO" as NSString).draw(at: NSPoint(x: 980, y: 29), withAttributes: [
        .font: NSFont.systemFont(ofSize: 16, weight: .medium), .foregroundColor: NSColor.white
    ])
    NSGraphicsContext.restoreGraphicsState()
    CVPixelBufferUnlockBaseAddress(pixels, [])
    for _ in 0..<(seconds * Int(fps)) {
        while !input.isReadyForMoreMediaData && writer.status == .writing { Thread.sleep(forTimeInterval: 0.01) }
        guard frames.append(pixels, withPresentationTime: CMTime(value: frame, timescale: fps)) else { throw writer.error! }
        frame += 1
    }
}
writer.endSession(atSourceTime: CMTime(value: frame, timescale: fps))
input.markAsFinished()
await writer.finishWriting()
guard writer.status == .completed else { throw writer.error! }

let composition = AVMutableComposition()
let source = AVURLAsset(url: footage)
let duration = try await source.load(.duration)
let video = try await source.loadTracks(withMediaType: .video)[0]
let pictureTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try pictureTrack.insertTimeRange(CMTimeRange(start: .zero, duration: duration), of: video, at: .zero)
let voiceTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
var offset: Int64 = 0
for (name, seconds, _, narration) in scenes {
    let audio = folder.appendingPathComponent(name + ".aiff")
    let say = Process()
    say.executableURL = URL(fileURLWithPath: "/usr/bin/say")
    say.arguments = ["-v", "Samantha", "-r", "155", "-o", audio.path, narration]
    try say.run()
    say.waitUntilExit()
    guard say.terminationStatus == 0 else { fatalError("Could not generate narration for \(name)") }
    let asset = AVURLAsset(url: audio)
    let length = try await asset.load(.duration)
    let track = try await asset.loadTracks(withMediaType: .audio)[0]
    let at = CMTime(value: offset + 1, timescale: 1)
    let available = CMTime(value: Int64(seconds - 1), timescale: 1)
    try voiceTrack.insertTimeRange(CMTimeRange(start: .zero, duration: min(length, available)), of: track, at: at)
    offset += Int64(seconds)
}
let export = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality)!
export.shouldOptimizeForNetworkUse = true
try await export.export(to: output, as: .mp4)
let result = AVURLAsset(url: output)
print("Exported \(try await result.load(.duration).seconds) seconds with \(try await result.loadTracks(withMediaType: .audio).count) audio track.")
```

## File: `scripts/run-framework.mjs`

```
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readExecutionProfile } from "./execution-profile.mjs";

const [command, ...args] = process.argv.slice(2);
if (!["dev", "build"].includes(command)) throw new Error("Expected dev or build.");
const managedLinux = readExecutionProfile() === "managed-linux";

if (managedLinux && command === "build") {
  const result = spawnSync("bash", [
    fileURLToPath(new URL("./build-verified.sh", import.meta.url)), ...args,
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

// Import in this process so the preview owner retains its PID and signals.
const cli = new URL(managedLinux
  ? "../node_modules/vite/bin/vite.js"
  : "../node_modules/vinext/dist/cli.js", import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), command,
  ...(!managedLinux && command === "dev" ? ["--port", "5173"] : []), ...args];
await import(cli.href);
```

## File: `scripts/sites-env.mjs`

```
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { configureToolEnvironment } from "./tool-environment.mjs";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
configureToolEnvironment(projectRoot);

process.chdir(projectRoot);
for (const directory of [
  path.dirname(process.env.WRANGLER_LOG_PATH),
  process.env.WRANGLER_REGISTRY_PATH,
  process.env.MINIFLARE_REGISTRY_PATH,
]) {
  mkdirSync(directory, { recursive: true });
}
```

## File: `scripts/sites-env.sh`

```
#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
runtime_root="${SITES_RUNTIME_ROOT:-${project_root}/.sites-runtime}"

mkdir -p \
  "${runtime_root}/home" \
  "${runtime_root}/npm-cache" \
  "${runtime_root}/xdg-config" \
  "${runtime_root}/tmp" \
  "${runtime_root}/wrangler/logs"

export SITES_ENV_READY=1
export SITES_PROJECT_ROOT="${project_root}"
export HOME="${runtime_root}/home"
export XDG_CONFIG_HOME="${runtime_root}/xdg-config"
export TMPDIR="${runtime_root}/tmp"
export WRANGLER_WRITE_LOGS=false
export WRANGLER_LOG_PATH="${runtime_root}/wrangler/logs"
export WRANGLER_REGISTRY_PATH="${runtime_root}/wrangler/dev-registry"
export MINIFLARE_REGISTRY_PATH="${runtime_root}/wrangler/registry"

# The runtime may provide a global npm cache. Keep the image's read-only Sites
# seed separate and make this project's writable cache authoritative.
unset NPM_CONFIG_CACHE npm_config_cache || true
export npm_config_cache="${runtime_root}/npm-cache"
export npm_config_audit=false
export npm_config_fund=false
export npm_config_update_notifier=false

# The runtime already supplies the standard HTTP(S)_PROXY variables. Remove
# npm-specific aliases so npm 11 does not reinterpret or warn about them.
unset \
  npm_config_proxy \
  npm_config_http_proxy \
  npm_config_https_proxy \
  NPM_CONFIG_PROXY \
  NPM_CONFIG_HTTP_PROXY \
  NPM_CONFIG_HTTPS_PROXY \
  || true

if [[ "${1:-}" == "--" ]]; then
  shift
fi

if [[ "$#" -eq 0 ]]; then
  echo "usage: scripts/sites-env.sh -- command [args...]" >&2
  exit 64
fi

cd "${project_root}"
exec "$@"
```

## File: `scripts/test-all.mjs`

```
import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';

function run(command,args) {
  const result=spawnSync(command,args,{stdio:'inherit'});
  if(result.error) throw result.error;
  if(result.status!==0) process.exit(result.status||1);
}
run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit']);
run(process.execPath,['node_modules/prettier/bin/prettier.cjs','--check','app','db/schema.ts','tests','playwright.config.ts']);
run(process.execPath,['--test',...readdirSync('scripts').filter(n=>/^test-(core|hours|leave|design)\.mjs$/.test(n)).map(n=>'scripts/'+n)]);
run('python3',['scripts/test-migrations.py']);
try {
  const response=await fetch('http://127.0.0.1:5173/',{redirect:'manual',signal:AbortSignal.timeout(5000)});
  if(response.status>=500) throw new Error('The local preview returned a server error.');
} catch {
  console.error('Start the local test preview with npm run dev before running integration/browser tests. See TESTING.md.');
  process.exit(1);
}
for(const file of ['test-portal.mjs','test-phase-one.mjs','test-phase-two.mjs','test-phase-three.mjs']) run(process.execPath,['scripts/'+file]);
run(process.execPath,['node_modules/@playwright/test/cli.js','test']);
console.log('All unit, migration, integration and browser checks passed.');
```

## File: `scripts/test-client.mjs`

```
import assert from 'node:assert/strict';
export const origin='http://127.0.0.1:5173'; // Synthetic writes are local-only.
const platformCookie=(await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'})).headers.getSetCookie()[0].split(';')[0];
export const client=()=>({cookie:platformCookie});
export async function call(c,route,action,body,query='',expected=200){
  const response=await fetch(origin+'/api/'+route+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=response.headers.get('content-type')?.includes('application/json')?await response.json():await response.text();
  if(expected!==null)assert.equal(response.status,expected,action+': '+JSON.stringify(data));
  const session=response.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));if(session)c.cookie=platformCookie+'; '+session.split(';')[0];
  return expected===null?{status:response.status,data}:data;
}
export const wf=(c,a,b,q='',s=200)=>call(c,'workforce',a,b,q,s),portal=(c,a,b,q='',s=200)=>call(c,'portal',a,b,q,s);
export const admin=client();await portal(admin,'login',{email:'admin@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'});
export const nonce=Date.now().toString(36),password='Phase1-Test-Password!',id=key=>'T'+nonce+'-'+key;
export const blank={telephone:'',jobTitle:'',managerId:'',startDate:'',endDate:'',employmentStatus:'active',employmentType:'',weeklyMinutes:null,timezone:'',holidayAllowance:null,carriedForward:null,holidayUnit:'days'};
const employee=(key,overrides={})=>({id:id(key),name:'Test '+key,email:id(key).toLowerCase()+'@hmf.example',office:'UK',department:'Electrical Engineering',profile:{...blank},revision:0,...overrides});
export async function create(key,overrides={}){const value=employee(key,{password,...overrides});await wf(admin,'employee',{employee:value,reason:'Automated Phase 1 fixture'});return value;}
export async function profile(key){return(await wf(admin,'profile',undefined,'&id='+id(key))).person;}
export async function edit(key,fn,actor=admin,expected=200){const p=await profile(key),next=fn(p);return wf(actor,'employee',{employee:next,reason:'Automated Phase 1 edit'},'',expected);}
export async function login(value){const c=client();await portal(c,'login',{email:value.email,password});return c;}
```

## File: `scripts/test-core.mjs`

```
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../app/lib/core.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {blankDays,validateDays,paidMinutes,weeklyMinutes,dayInZone,parseCsv,csv,validateProfile,blankProfile,effectiveSchedule}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
test('office dates respect local midnight and UK daylight saving',()=>{
  assert.equal(dayInZone('Asia/Karachi',new Date('2026-03-28T20:00:00Z')),'2026-03-29');
  assert.equal(dayInZone('Europe/London',new Date('2026-07-01T23:30:00Z')),'2026-07-02');
  assert.equal(dayInZone('Europe/London',new Date('2026-01-01T23:30:00Z')),'2026-01-01');
});
test('paid, unpaid, undecided and compressed/overnight weekly schedules',()=>{
  const days=blankDays.map(d=>({...d}));days[1]={...days[1],working:true,start:'22:00',finish:'06:00',overnight:true,breakMinutes:30,paidBreak:false};
  const valid=validateDays(days);assert.equal(paidMinutes(valid[1]),450);assert.equal(weeklyMinutes(valid),450);
  valid[1].paidBreak=true;assert.equal(weeklyMinutes(valid),480);valid[1].paidBreak=null;assert.equal(weeklyMinutes(valid),null);
  assert.throws(()=>validateDays(days.map((d,i)=>i===1?{...d,breakMinutes:500}:d)));
  assert.throws(()=>validateDays(days.map((d,i)=>i===2?{...d,working:true,start:'05:00',finish:'10:00'}:d)));
});
test('effective schedules retain revisions and restore normal periods after overrides',()=>{
  const base={id:'one',series_id:'base',kind:'base',start_date:'2026-01-01',end_date:null,created_at:'2026-01-01',days:blankDays};
  const revision={...base,id:'two',created_at:'2026-02-01'};
  const temporary={...base,id:'three',series_id:'temp',kind:'temporary',start_date:'2026-03-01',end_date:'2026-03-07'};
  assert.equal(effectiveSchedule([base,revision,temporary],'2026-03-07').id,'three');
  assert.equal(effectiveSchedule([base,revision,temporary],'2026-03-08').id,'two');
  assert.equal(effectiveSchedule([base],'2025-12-31'),null);
  const ended={...base,id:'ended',series_id:'new-base',start_date:'2026-04-01',end_date:'2026-04-30'};
  assert.equal(effectiveSchedule([base,ended],'2026-05-01'),null);
});
test('CSV handles BOM, quotes, newlines and rejects unsupported permission columns',()=>{
  const rows=parseCsv('\uFEFFid,name,email,office,department\r\nA,"Test, ""Name""",a@hmf.example,UK,"Line\nTwo"\r\n');
  assert.equal(rows[0].name,'Test, "Name"');assert.equal(rows[0].department,'Line\nTwo');
  assert.throws(()=>parseCsv('id,name,email,office,department,roles\nA,A,a@b.c,UK,D,admin'));
  assert.throws(()=>parseCsv('id,name,email,office,department\nA,"broken,a@b.c,UK,D'));
  assert.ok(csv([[' =1+1','@SUM(1)','-1']]).includes("' =1+1"));
});
test('profile validates dates, numeric terms and time zones without inventing policies',()=>{
  assert.equal(validateProfile({...blankProfile}).holidayAllowance,null);
  assert.throws(()=>validateProfile({...blankProfile,startDate:'2026-02-30'}));
  assert.throws(()=>validateProfile({...blankProfile,startDate:'2026-06-01',endDate:'2026-05-01'}));
  assert.throws(()=>validateProfile({...blankProfile,weeklyMinutes:-1}));
  assert.throws(()=>validateProfile({...blankProfile,timezone:'Invented/Office'}));
});
```

## File: `scripts/test-design.mjs`

```
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../app/portal.tsx', import.meta.url), 'utf8');
const has = fragment => ui.replace(/\s+/g,'').includes(fragment.replace(/\s+/g,''));
const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/gi)].map(m => [m[1], m[2]]));
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(c => parseInt(c,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function contrast(a,b) { const x=luminance(tokens[a]),y=luminance(tokens[b]); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }

test('reading and status token pairs meet AA text contrast', () => {
  for (const [fg,bg] of [['ink','surface'],['muted','surface'],['muted','canvas'],['muted','selected'],['on-dark','navy'],['on-dark','navy-hover'],['on-dark-muted','navy-deep'],['present','present-bg'],['absent','absent-bg'],['other','other-bg'],['pending','pending-bg']]) {
    assert.ok(contrast(fg,bg)>=4.5, fg+'/'+bg+' contrast: '+contrast(fg,bg).toFixed(2));
  }
});
test('input boundaries and focus have visible contrast', () => {
  for (const bg of ['surface','canvas']) for (const fg of ['line-strong','focus']) assert.ok(contrast(fg,bg)>=3, fg+'/'+bg);
});
test('design keeps branding and important interaction states', () => {
  assert.ok(has('/hmf-logo.png'));
  assert.ok(has('aria-current') && has('className="account-actions"') && has('Skip to content'));
  assert.ok(css.includes(':focus-visible') && css.includes('prefers-reduced-motion'));
  assert.ok(has('role="alert"') && has('role="status"'));
  assert.ok(!has('overview-banner') && !has('employee-hero') && !has('stat-icon'));
  assert.ok(!css.includes('fonts.googleapis') && !css.includes('linear-gradient'));
});

test('simplified layout retains access without dashboard clutter', () => {
  assert.ok(!has('className="sidebar') && !has('className={\'stats '));
  assert.ok(has('className="simple-header"') && has('className="simple-login"'));
  assert.ok(has('className="table-panel history-panel"'));
  for (const heading of ['Name','Office','Status','Submitted']) assert.ok(has('<th scope="col">'+heading+'</th>'));
  assert.ok(has('setSelected(r)') && has('Correct record') && has('Sign-in & sign-out activity'));
  assert.ok(has('Export CSV') && has('Office filter') && has('Attendance status filter'));
});

test('employee navigation stays focused and office settings are restricted', () => {
  const source = ts.createSourceFile('portal.tsx',ui,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  let nav;
  function visit(node) {
    if(ts.isVariableDeclaration(node) && node.name.getText(source)==='nav') nav=node.initializer;
    ts.forEachChild(node,visit);
  }
  visit(source);
  assert.ok(nav && ts.isConditionalExpression(nav),'Role-based navigation is present');
  const employeeItems=nav.whenFalse.elements.map(row=>row.elements.map(item=>item.text));
  assert.deepEqual(employeeItems, [['attendance','Today'], ['hours','Hours'], ['leave','Leave'], ['schedule','Schedule'], ['history','History']]);
  assert.ok(nav.whenTrue.getText(source).includes('me.canConfigure'));
  assert.ok(has("view==='settings'&&me.canConfigure"));
  assert.ok(has('My profile'));
});
```

## File: `scripts/test-hours.mjs`

```
import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';
const compile=name=>ts.transpileModule(readFileSync(new URL('../app/lib/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const h=await import(url(compile('hours').replace("'./core'",JSON.stringify(url(compile('core'))))));
const snapshot={timezone:'Europe/London',scheduleId:'s',scheduledMinutes:450,working:true,start:'09:00',finish:'17:00',overnight:false,policy:{...h.defaultHoursPolicy,trackBreaks:true,breaksPaid:false,overtimeEnabled:true,graceMinutes:10,submissionDeadline:'10:00'}};
const record={date:'2026-11-09',check_in:'2026-11-09T09:00:00Z',check_out:'2026-11-09T18:00:00Z',break_minutes:30,overtime_state:'pending'};
test('recorded minutes round once and seconds do not create overtime',()=>{
  const r={...record,check_out:'2026-11-09T17:00:00.500Z'};
  assert.equal(h.metrics(r,snapshot,record.date).recordedMinutes,450);
  assert.equal(h.metrics(r,snapshot,record.date).overtimeState,'none');
  assert.equal(h.metrics({...r,check_out:'2026-11-09T16:42:37.776Z'},snapshot,record.date).recordedMinutes,433);
  assert.equal(h.metrics({...r,check_out:'2026-11-09T17:14:00Z'},{...snapshot,policy:{...snapshot.policy,overtimeThresholdMinutes:15}},record.date).overtimeMinutes,0);
});
test('approved leave and holidays suppress missing attendance, not explicit records',()=>{
  const at=new Date('2026-11-10T20:00:00Z');
  assert.equal(h.metrics(null,snapshot,record.date,at,undefined,true).missingCheckIn,false);
  assert.equal(h.metrics({...record,check_out:null},snapshot,record.date,at,undefined,true).missingCheckOut,false);
  assert.equal(h.metrics(record,snapshot,record.date,at,undefined,true).recordedMinutes,510);
});
test('correction interval is bounded to one day',()=>{
  assert.throws(()=>h.validateTimes({checkIn:'2026-10-01T09:00:00Z',checkOut:'2026-10-03T17:00:00Z',breakMinutes:0},'2026-10-01','Europe/London'),/24 hours/);
});
test('elapsed, unpaid, paid and unknown break calculations stay distinct',()=>{assert.equal(h.metrics(record,snapshot,record.date).recordedMinutes,510);assert.equal(h.metrics(record,snapshot,record.date).overtimeMinutes,60);assert.equal(h.metrics(record,{...snapshot,policy:{...snapshot.policy,breaksPaid:true}},record.date).recordedMinutes,540);assert.equal(h.metrics(record,{...snapshot,policy:{...snapshot.policy,breaksPaid:null}},record.date).recordedMinutes,null);});
test('open records never invent a checkout or completed hours',()=>{const m=h.metrics({...record,check_out:null},snapshot,record.date,new Date('2026-11-10T10:00:00Z'));assert.equal(m.recordedMinutes,null);assert.equal(m.missingCheckOut,true);assert.equal(h.metrics(null,snapshot,record.date,new Date('2026-11-09T08:00:00Z')).missingCheckIn,false);assert.equal(h.metrics(null,snapshot,record.date,new Date('2026-11-09T18:00:00Z')).missingCheckIn,true);});
test('lateness needs configured rules, with separate attendance submission deadline',()=>{const late={...record,check_in:'2026-11-09T09:11:00Z'};assert.equal(h.metrics(late,snapshot,record.date,new Date(),'2026-11-09T10:01:00Z').lateSubmission,true);assert.equal(h.metrics(late,snapshot,record.date).lateCheckIn,true);assert.equal(h.metrics(late,{...snapshot,policy:h.defaultHoursPolicy},record.date).lateCheckIn,false);});
test('DST uses elapsed UTC time and validates repeated/nonexistent local hours',()=>{assert.equal(h.wallCandidates('2026-03-29T01:30','Europe/London').length,0);assert.equal(h.wallCandidates('2026-10-25T01:30','Europe/London').length,2);assert.deepEqual(h.wallCandidates('2026-11-09T09:00','Asia/Karachi'),['2026-11-09T04:00:00.000Z']);const dst={...record,check_in:'2026-03-29T00:00:00Z',check_out:'2026-03-29T07:00:00Z',break_minutes:0};assert.equal(h.metrics(dst,snapshot,'2026-03-29').recordedMinutes,420);});
test('overnight missing-checkout deadline belongs to the following day',()=>{const s={...snapshot,start:'22:00',finish:'06:00',overnight:true};assert.equal(h.metrics(null,s,'2026-11-09',new Date('2026-11-10T05:00:00Z')).missingCheckIn,false);assert.equal(h.metrics(null,s,'2026-11-09',new Date('2026-11-10T07:00:00Z')).missingCheckIn,true);});
test('correction times require matching local date, valid intervals and explicit offsets',()=>{assert.throws(()=>h.validateTimes({checkIn:'2026-11-09T09:00',checkOut:'2026-11-09T17:00',breakMinutes:0},'2026-11-09','Europe/London'));assert.throws(()=>h.validateTimes({checkIn:record.check_in,checkOut:record.check_out,breakMinutes:999},record.date,'Europe/London'));assert.equal(h.dateRange('2026-11-01','2026-11-30').length,30);});
```

## File: `scripts/test-leave.mjs`

```
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const compile=name=>ts.transpileModule(readFileSync(new URL('../app/lib/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const coreUrl=url(compile('core')), core=await import(coreUrl);
const leave=await import(url(compile('leave').replace("'./core'",JSON.stringify(coreUrl))));
const days=Array.from({length:7},(_,day)=>({day,working:day>0&&day<6,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
const schedules=[{id:'base',series_id:'base',kind:'base',start_date:'2026-01-01',end_date:null,created_at:'2026-01-01T00:00:00Z',days}];
const policy={start:'2026-01-01',end:'2026-12-31',holidays:[{date:'2026-11-17',name:'Fictional test holiday'}]};
test('leave uses configured schedules and holidays in days or hours',()=>{
  const charge=leave.chargeLeave('2026-11-16','2026-11-22','days',policy,schedules);
  assert.equal(leave.chargeTotal(charge),4);
  assert.equal(leave.chargeTotal(leave.chargeLeave('2026-11-16','2026-11-22','hours',policy,schedules)),30);
  assert.throws(()=>leave.chargeLeave('2026-11-16','2026-11-22','days',policy,[]),/schedule/);
});
test('leave range rejects invalid, overlong and outside-year dates',()=>{
  assert.equal(leave.leaveDates('2024-01-01','2024-12-31').length,366);
  for(const pair of [['2024-01-01','2025-01-01'],['2026-02-30','2026-03-01'],['2026-11-20','2026-11-19']]) assert.throws(()=>leave.leaveDates(...pair));
  assert.throws(()=>leave.chargeLeave('2027-01-01','2027-01-02','days',policy,schedules));
});
test('CSV preserves numeric deficits and escapes text formulas',()=>{
  assert.equal(core.csvCell(-30),'-30');
  assert.equal(core.csvCell(-0.5),'-0.5');
  for(const input of ['=1+1','-30','+SUM(A1)','@SUM(A1)','\t=1']) assert.ok(core.csvCell(input).startsWith('"\''));
});
```

## File: `scripts/test-migrations.py`

```
"""Rehearse additive upgrades in an isolated in-memory SQLite database."""
import sqlite3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
db = sqlite3.connect(':memory:')
db.execute('PRAGMA foreign_keys=ON')
for filename in ['0000_quick_lyja.sql', '0001_cuddly_dagger.sql']:
    db.executescript((root / 'drizzle' / filename).read_text())
db.execute("INSERT INTO employees VALUES ('E1','Original employee','test@hmf.example','UK','Engineering','employee','test-hash','salt',1)")
db.execute("INSERT INTO attendance VALUES ('E1','2026-01-01','present','','UK','2026-01-01T09:00:00Z','2026-01-01T09:00:00Z','employee')")
db.execute("INSERT INTO audits VALUES ('A1','E1','2026-01-01','E1',NULL,'present','Employee submitted attendance','2026-01-01T09:00:00Z')")
db.execute("INSERT INTO access_events VALUES ('X1','E1','sign_in','2026-01-01T09:00:00Z','UK')")
tables = ['employees', 'attendance', 'audits', 'access_events', 'sessions', 'login_attempts']
before = {table: db.execute(f'SELECT * FROM {table}').fetchall() for table in tables}
columns = {table: db.execute(f'PRAGMA table_info({table})').fetchall() for table in tables}
for file in sorted((root / 'drizzle').glob('*.sql')):
    if int(file.name[:4]) >= 2:
        db.executescript(file.read_text())
    if int(file.name[:4]) == 3:
        db.execute("INSERT INTO employee_profiles VALUES ('E1','{\"jobTitle\":\"Engineer\"}',1,NULL,'2026-01-01T09:00:00Z')")
        db.execute("INSERT INTO access_grants VALUES ('E1','[\"employee\"]','[]')")
        profile_before = db.execute('SELECT * FROM employee_profiles').fetchall()
for table in tables:
    assert db.execute(f'SELECT * FROM {table}').fetchall() == before[table], table
    assert db.execute(f'PRAGMA table_info({table})').fetchall() == columns[table], table
assert not db.execute('PRAGMA foreign_key_check').fetchall()
assert db.execute('SELECT * FROM employee_profiles').fetchall() == profile_before
assert db.execute('SELECT roles FROM access_grants WHERE employee_id=\'E1\'').fetchone()[0] == '["employee"]'
# The previous Worker uses positional inserts: these must still work after migrations.
db.execute("INSERT INTO employees VALUES ('E2','Old-worker insert','old@hmf.example','PK','Engineering','employee','test-hash','salt',1)")
print('PASS: new migrations preserve every legacy row and column; old-worker writes and foreign keys remain valid.')
```

## File: `scripts/test-phase-one.mjs`

```
import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173'; // Synthetic writes are local-only.
const platformCookie=(await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'})).headers.getSetCookie()[0].split(';')[0];
const client=()=>({cookie:platformCookie});
async function call(c,route,action,body,query='',expected=200){
  const response=await fetch(origin+'/api/'+route+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=response.headers.get('content-type')?.includes('application/json')?await response.json():await response.text();
  if(expected!==null)assert.equal(response.status,expected,action+': '+JSON.stringify(data));
  const session=response.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));if(session)c.cookie=platformCookie+'; '+session.split(';')[0];
  return expected===null?{status:response.status,data}:data;
}
const wf=(c,a,b,q='',s=200)=>call(c,'workforce',a,b,q,s),portal=(c,a,b,q='',s=200)=>call(c,'portal',a,b,q,s);
const admin=client();await portal(admin,'login',{email:'admin@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'});
const nonce=Date.now().toString(36),password='Phase1-Test-Password!',id=key=>'T'+nonce+'-'+key;
const blank={telephone:'',jobTitle:'',managerId:'',startDate:'',endDate:'',employmentStatus:'active',employmentType:'',weeklyMinutes:null,timezone:'',holidayAllowance:null,carriedForward:null,holidayUnit:'days'};
const employee=(key,overrides={})=>({id:id(key),name:'Test '+key,email:id(key).toLowerCase()+'@hmf.example',office:'UK',department:'Electrical Engineering',profile:{...blank},revision:0,...overrides});
async function create(key,overrides={}){const value=employee(key,{password,...overrides});await wf(admin,'employee',{employee:value,reason:'Automated Phase 1 fixture'});return value;}
async function profile(key){return(await wf(admin,'profile',undefined,'&id='+id(key))).person;}
async function edit(key,fn,actor=admin,expected=200){const p=await profile(key),next=fn(p);return wf(actor,'employee',{employee:next,reason:'Automated Phase 1 edit'},'',expected);}
async function login(value){const c=client();await portal(c,'login',{email:value.email,password});return c;}

const mgrValue=await create('manager',{roles:['employee','manager'],officeScope:[]});
const hrValue=await create('hr',{roles:['employee','hr_admin'],officeScope:['UK']});
const sysValue=await create('system',{roles:['employee','system_admin'],officeScope:[]});
const reportValue=await create('report',{profile:{...blank,managerId:id('manager'),jobTitle:'Engineer',telephone:'Private contact',employmentType:'part-time',weeklyMinutes:1800}});
const otherValue=await create('outside',{office:'PK'});
const mgr=await login(mgrValue),hr=await login(hrValue),sys=await login(sysValue),report=await login(reportValue),other=await login(otherValue);
assert.equal((await profile('outside')).profile.weeklyMinutes,null);
assert.equal((await profile('outside')).profile.holidayAllowance,null);
const managerDirectory=await wf(mgr,'directory');assert.deepEqual(managerDirectory.people.map(p=>p.id).sort(),[id('manager'),id('report')].sort());
assert.equal((await wf(mgr,'profile',undefined,'&id='+id('report'))).person.profile.telephone,'');
for(const action of ['profile','schedules','audit'])await wf(mgr,action,undefined,'&id='+id('outside'),403);
await wf(report,'directory',undefined,'',403);await wf(report,'profile',undefined,'&id='+id('manager'),403);
await wf(report,'employee',{employee:reportValue,reason:'Unauthorized edit'},'',403);
await portal(mgr,'history',undefined,'&id='+id('outside'),403);
assert.ok((await wf(hr,'directory')).people.every(p=>p.office==='UK'));
await edit('report',p=>({...p,roles:['system_admin']}),hr,403);
await edit('report',p=>{const {roles,officeScope,...e}=p;return {...e,office:'PK'};},hr,403);
await wf(mgr,'setting',{kind:'department',value:{code:'Unauthorized',active:true},previous:null,reason:'Denied'},'',403);
await edit('manager',p=>({...p,profile:{...p.profile,employmentStatus:'inactive'}}),admin,400);
console.log('PASS: server-enforced roles, direct-report and office scope, protected fields, unknown policy values');

await portal(report,'attendance',{status:'absent',reason:'CONFIDENTIAL TEST NOTE'});
const date=(await portal(report,'me')).today;
const managerRows=(await portal(mgr,'dashboard',undefined,'&date='+date)).rows;
assert.ok(managerRows.every(r=>[id('manager'),id('report')].includes(r.id)));
const masked=managerRows.find(r=>r.id===id('report'));assert.equal(masked.status,'unavailable');assert.equal(masked.reason,'');
assert.ok(!JSON.stringify(await portal(sys,'history',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(!JSON.stringify(await wf(mgr,'audit',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(!String(await portal(mgr,'export',undefined,'&date='+date)).includes('CONFIDENTIAL TEST NOTE'));
assert.ok(JSON.stringify(await portal(hr,'history',undefined,'&id='+id('report'))).includes('CONFIDENTIAL TEST NOTE'));
assert.ok((await wf(admin,'audit',undefined,'&id='+id('report'))).events.some(e=>e.action==='privacy.notes_viewed'));
console.log('PASS: medical/absence notes excluded from manager, system-only and export views; HR access logged');

const days=Array.from({length:7},(_,day)=>({day,working:day>0&&day<6,start:day>0&&day<6?'09:00':'',finish:day>0&&day<6?'17:00':'',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
const template=await wf(mgr,'schedule',{name:'Test reusable pattern',kind:'template',days,reason:'Test agreed hours'});
const base=await wf(mgr,'schedule',{employeeId:id('report'),name:'Normal test week',kind:'base',startDate:'2026-01-01',endDate:'',days,templateId:template.schedule.id,reason:'Assign agreed working pattern'});
assert.equal(base.weeklyMinutes,2250);
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-01')).effective.id,base.schedule.id);
await wf(report,'schedule',{employeeId:id('report'),name:'Unauthorized',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
await wf(mgr,'schedule',{employeeId:id('outside'),name:'Unauthorized',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
await wf(mgr,'schedule',{employeeId:id('manager'),name:'Own schedule',kind:'base',startDate:'2026-02-01',endDate:'',days,reason:'Denied'},'',403);
const tempDays=days.map(d=>d.working?{...d,finish:'13:00',breakMinutes:0,arrangement:'remote'}:d);
const temp=await wf(mgr,'schedule',{employeeId:id('report'),name:'Temporary mornings',kind:'temporary',startDate:'2026-06-01',endDate:'2026-06-07',days:tempDays,reason:'Agreed temporary change'});
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-03')).effective.id,temp.schedule.id);
assert.equal((await wf(report,'schedules',undefined,'&date=2026-06-08')).effective.id,base.schedule.id);
await wf(mgr,'schedule',{employeeId:id('report'),name:'Overlap',kind:'temporary',startDate:'2026-06-05',endDate:'2026-06-09',days,reason:'Invalid'},'',400);
await wf(mgr,'schedule',{employeeId:id('report'),name:'No reason',kind:'base',startDate:'2026-07-01',endDate:'',days,reason:''},'',400);
const revised=await wf(mgr,'schedule',{employeeId:id('report'),seriesId:base.schedule.series_id,previousId:base.schedule.id,name:'Revised normal week',kind:'base',startDate:'2026-01-01',endDate:'',days:days.map(d=>({...d,paidBreak:true})),reason:'Paid breaks explicitly agreed'});
assert.equal(revised.weeklyMinutes,2400);
const scheduleHistory=await wf(report,'schedules',undefined,'&date=2026-07-01');assert.equal(scheduleHistory.versions.length,3);assert.equal(scheduleHistory.effective.id,revised.schedule.id);
await wf(mgr,'schedule',{employeeId:id('report'),seriesId:base.schedule.series_id,previousId:base.schedule.id,name:'Stale',kind:'base',startDate:'2026-01-01',endDate:'',days,reason:'Stale editor'},'',409);
console.log('PASS: templates, manager assignment, effective dates, temporary priority, prior versions, overlap and stale-edit protection');

const before=await profile('report');
const concurrent=await Promise.all([1,2].map(n=>wf(admin,'employee',{employee:{...before,profile:{...before.profile,jobTitle:'Concurrent '+n}},reason:'Concurrent edit '+n},'',null)));
assert.deepEqual(concurrent.map(r=>r.status).sort(),[200,409]);
const after=await profile('report');assert.equal(after.revision,before.revision+1);
await wf(admin,'employee',{employee:before,reason:'Stale form'},'',409);
const historyBefore=await portal(admin,'history',undefined,'&id='+id('report'));
await edit('report',p=>({...p,profile:{...p.profile,employmentStatus:'inactive',endDate:date}}));
await portal(report,'me',undefined,'',401);await portal(report,'login',{email:reportValue.email,password},'',401);
const historyAfter=await portal(admin,'history',undefined,'&id='+id('report'));assert.deepEqual(historyAfter.records,historyBefore.records);
assert.ok((await portal(admin,'dashboard',undefined,'&date='+date)).rows.some(r=>r.id===id('report')));
await edit('report',p=>({...p,profile:{...p.profile,employmentStatus:'active',endDate:''}}));
await portal(report,'login',{email:reportValue.email,password});
assert.ok((await portal(report,'mine')).records.some(r=>r.date===date));
console.log('PASS: concurrent profile writes, session revocation, deactivation/history retention and reactivation');

const config=await wf(admin,'config'),remote=config.statuses.find(s=>s.code==='remote');
await wf(admin,'setting',{kind:'status',previous:remote,value:{...remote,approval:true},reason:'Test approval-required work status'});
await portal(report,'attendance',{status:'remote',reason:'Client-approved remote day'});
assert.equal((await portal(report,'mine')).records.find(r=>r.date===date).approval,'pending');
await wf(report,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Self decision'},'',403);
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Stale manager view',expectedUpdatedAt:'2020-01-01'},'',409);
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'approved',reason:'Confirmed by manager',expectedUpdatedAt:(await portal(report,'mine')).records.find(r=>r.date===date).updated_at});
assert.equal((await portal(report,'mine')).records.find(r=>r.date===date).approval,'approved');
await wf(mgr,'attendanceDecision',{employeeId:id('report'),date,decision:'declined',reason:'Repeated decision'},'',409);
const remoteCurrent=(await wf(admin,'config')).statuses.find(s=>s.code==='remote');
await wf(admin,'setting',{kind:'status',previous:remoteCurrent,value:remote,reason:'Restore test configuration'});
await portal(report,'attendance',{status:'annual_leave'},'',400);
console.log('PASS: configurable attendance rules, approval and no self-approval, disabled leave booking');

const header='id,name,email,office,department,jobTitle';
const row=key=>`${id(key)},"Test, ${key}",${id(key).toLowerCase()}@hmf.example,UK,Electrical Engineering,Engineer`;
const invalid=await wf(admin,'importPreview',{csv:header+'\n'+row('import')+'\n'+row('import')});assert.ok(invalid.errors.length);assert.equal(invalid.previewId,null);
await wf(admin,'importPreview',{csv:'id,name,email,office,department,roles\n'+row('bad')},'',400);
const preview=await wf(hr,'importPreview',{csv:header+'\n'+row('import')});assert.equal(preview.errors.length,0);assert.equal((await wf(admin,'directory')).people.some(p=>p.id===id('import')),false);
await wf(admin,'importConfirm',{previewId:preview.previewId,reason:'Wrong actor'},'',409);
const imported=await wf(hr,'importConfirm',{previewId:preview.previewId,reason:'Confirmed test import'});assert.equal(imported.count,1);
await wf(hr,'importConfirm',{previewId:preview.previewId,reason:'Replay'},'',409);
assert.deepEqual((await profile('import')).roles,['employee']);
await portal(client(),'login',{email:id('import').toLowerCase()+'@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'},'',401);
const formula=await create('formula',{name:'=HYPERLINK("example")'});
const csv=await wf(admin,'export',undefined,'&search='+encodeURIComponent(formula.id));assert.ok(csv.includes("'=HYPERLINK"));
assert.ok(!csv.includes('password_hash'));
console.log('PASS: CSV validation, preview before changes, actor-bound one-time import, no shared password or elevated role, formula-safe export');

const newOffice={code:'TEST'+nonce.toUpperCase(),name:'Test Pakistan office',country:'PK',timezone:'Asia/Karachi',active:true};
await wf(admin,'setting',{kind:'office',previous:null,value:newOffice,reason:'Office configuration test'});
await edit('outside',p=>({...p,office:newOffice.code}));
const officeMe=await portal(other,'me');assert.equal(officeMe.user.timezone,'Asia/Karachi');assert.equal(officeMe.today,new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()));
await wf(admin,'setting',{kind:'office',previous:newOffice,value:{...newOffice,active:false},reason:'Close test office to new assignments'});
await create('invalid-office',{office:newOffice.code}).then(()=>assert.fail('inactive office should reject'),e=>assert.ok(e.message.includes('Choose an active office')));
const events=(await wf(admin,'audit',undefined,'&id='+id('report'))).events;assert.ok(events.some(e=>e.action==='employee.updated'&&e.before_value&&e.after_value&&e.actor_id==='ADMIN'&&e.reason));
await wf(report,'deleteAudit',{id:events[0].id},'',400);
// Deactivate only this run's fixtures, retaining all local audit/attendance records.
for(const key of ['report','outside','import','formula','hr','system','manager'])await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
console.log('PASS: configurable office time zones, settings audit, immutable history, fixture cleanup by deactivation');
console.log('All Phase 1 integration checks passed.');
```

## File: `scripts/test-phase-three.mjs`

```
import assert from 'node:assert/strict';
import {admin, wf, portal, call, create, edit, login, blank, nonce, id, client} from './test-client.mjs';

const leave=(c,action,body,expected=200,query='')=>call(c,'leave',action,body,query,expected);
const office='QA'+nonce.toUpperCase();
const day=n=>new Date(Date.now()+n*86400000).toISOString().slice(0,10);
const policy={start:day(-180),end:day(180),holidays:Array.from({length:80},(_,i)=>({date:day(-180+i),name:'Fictional QA holiday '.padEnd(100,'x')})),allowPastRequests:true};
const created=[];
await wf(admin,'setting',{kind:'office',value:{code:office,name:'Review test office',country:'UK',timezone:'Europe/London',active:true},previous:null,reason:'Local regression fixture'});
async function fixture(key,extra={}) {const value=await create(key,{office,...extra});created.push(key);return value;}
try {
  const manager=await login(await fixture('manager',{roles:['employee','manager'],officeScope:[]}));
  const hr=await login(await fixture('hr',{roles:['employee','hr_admin'],officeScope:[office]}));
  const sysValue=await fixture('sys',{roles:['employee','system_admin'],officeScope:[]});
  const staff=await login(await fixture('staff',{profile:{...blank,managerId:id('manager'),holidayAllowance:3,carriedForward:0}}));
  const outside=await login(await fixture('outside',{office:'PK'}));
  const days=Array.from({length:7},(_,day)=>({day,working:true,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
  await wf(admin,'schedule',{employeeId:id('staff'),name:'Fictional QA schedule',kind:'base',startDate:policy.start,endDate:'',days,reason:'Test leave charging'});
  await leave(staff,'savePolicy',{office,...policy},403);
  await leave(admin,'savePolicy',{office,...policy}); // > 4 KB, all 80 names at the limit
  assert.equal((await leave(admin,'',undefined,200,'&office='+office)).policy.holidays.length,80);
  await leave(staff,'',undefined,403,'&office=PK');
  await leave(admin,'savePolicy',{office:'NOT_CONFIGURED',...policy},400);
  const plain=p=>{const {roles,officeScope,...rest}=p;return rest;};
  await edit('hr',p=>({...plain(p),profile:{...p.profile,holidayAllowance:999}}),hr,403);
  await edit('sys',p=>({...plain(p),profile:{...p.profile,jobTitle:'Changed by HR'}}),hr,403);
  const ownAdmin=(await wf(admin,'profile')).person;
  await wf(admin,'employee',{employee:ownAdmin,reason:'Self edit should fail'},'',403);
  await portal(manager,'correct',{employeeId:id('manager'),date:day(0),status:'present',correctionReason:'Self correction'},'',403);
  await portal(staff,'attendance',{status:'absent',reason:'PRIVATE QA NOTE'});
  const masked=(await portal(manager,'dashboard',undefined,'&date='+day(0))).rows.find(r=>r.id===id('staff'));
  assert.equal(masked.category,null);assert.equal(masked.approval,null);assert.equal(masked.decided_by,null);assert.equal(masked.decided_at,null);
  assert.ok(!JSON.stringify(masked).includes('PRIVATE QA NOTE'));
  const request=(start,end=start,extra={})=>leave(staff,'request',{start,end,leaveType:'annual_leave',note:'Private fixture note',...extra},201);
  await leave(staff,'request',{start:day(-500),end:day(0)},400);
  await leave(staff,'request',{start:day(-20),end:day(-20),leaveType:'unknown'},400);
  await leave(staff,'request',{start:day(-20),end:day(-20),note:'x'.repeat(501)},400);
  let first=await request(day(-20));
  assert.equal((await leave(staff,'')).balance.available,2);
  await leave(staff,'request',{start:day(-20),end:day(-20)},409);
  await leave(staff,'approved',{id:first.id,note:'Self approval'},404);
  await leave(outside,'approved',{id:first.id,note:'Out of scope'},404);
  const team=await leave(manager,'');
  assert.equal(team.requests.find(r=>r.id===first.id).note,null);
  assert.ok(team.requests.every(r=>r.employee_id===id('staff')||r.employee_id===id('manager')));
  await leave(manager,'approved',{id:first.id,note:'Confirmed by manager'});
  await leave(manager,'approved',{id:first.id,note:'Already decided'},409);
  assert.equal((await leave(staff,'')).balance.remaining,2);
  assert.equal((await portal(staff,'mine')).records.find(r=>r.date===day(-20)).status,'annual_leave');
  const sheet=await call(staff,'hours','sheet',undefined,'&start='+day(-20)+'&end='+day(-20));
  assert.equal(sheet.rows[0].missingCheckIn,false);assert.equal(sheet.rows[0].noResponse,false);
  const holidaySheet=await call(staff,'hours','sheet',undefined,'&start='+policy.holidays[0].date+'&end='+policy.holidays[0].date);
  assert.equal(holidaySheet.rows[0].missingCheckIn,false);
  const missing=await call(staff,'hours','sheet',undefined,'&start='+day(-21)+'&end='+day(-21));assert.equal(missing.rows[0].missingCheckIn,true);
  const cancelled=await request(day(-19));await leave(staff,'cancelled',{id:cancelled.id});
  await leave(manager,'approved',{id:cancelled.id,note:'Cancelled already'},409);
  const declined=await request(day(-18));await leave(manager,'declined',{id:declined.id,note:'Conflicting work'});
  assert.equal((await leave(staff,'')).balance.available,2);
  const stale=await request(day(-17));
  await edit('staff',p=>({...p,profile:{...p.profile,holidayAllowance:1}}));
  await leave(manager,'approved',{id:stale.id,note:'Insufficient balance'},400);
  await leave(staff,'cancelled',{id:stale.id});
  await edit('staff',p=>({...p,profile:{...p.profile,holidayAllowance:2}}));
  const race=await Promise.all([-16,-15].map(n=>leave(staff,'request',{start:day(n),end:day(n)},null)));
  assert.equal(race.filter(r=>r.status===201).length,1);
  assert.ok(race.some(r=>[400,409].includes(r.status)));
  assert.equal((await leave(staff,'')).balance.available,0);
  await leave(admin,'savePolicy',{office,...policy,allowPastRequests:false});
  await leave(staff,'request',{start:day(-14),end:day(-14)},400);
  await leave(client(),'request',{start:day(-14),end:day(-14)},401);
  console.log('PASS: leave policies, 80-holiday payload, balances, overlap/races, scope/privacy, approvals, cancellations, stale entitlement, attendance and holiday suppression');
} finally {
  // Preserve fictional records/audits; deactivate reports before their manager.
  for (const key of [...created.filter(k=>k!=='manager'),'manager']) {
    if(created.includes(key)) await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
  }
}
```

## File: `scripts/test-phase-two.mjs`

```
import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173'; // Synthetic writes are local-only.
const platformCookie=(await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'})).headers.getSetCookie()[0].split(';')[0];
const client=()=>({cookie:platformCookie});
async function call(c,route,action,body,query='',expected=200){
  const response=await fetch(origin+'/api/'+route+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=response.headers.get('content-type')?.includes('application/json')?await response.json():await response.text();
  if(expected!==null)assert.equal(response.status,expected,action+': '+JSON.stringify(data));
  const session=response.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));if(session)c.cookie=platformCookie+'; '+session.split(';')[0];
  return expected===null?{status:response.status,data}:data;
}
const wf=(c,a,b,q='',s=200)=>call(c,'workforce',a,b,q,s),portal=(c,a,b,q='',s=200)=>call(c,'portal',a,b,q,s);
const admin=client();await portal(admin,'login',{email:'admin@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'});
const nonce=Date.now().toString(36),password='Phase1-Test-Password!',id=key=>'T'+nonce+'-'+key;
const blank={telephone:'',jobTitle:'',managerId:'',startDate:'',endDate:'',employmentStatus:'active',employmentType:'',weeklyMinutes:null,timezone:'',holidayAllowance:null,carriedForward:null,holidayUnit:'days'};
const employee=(key,overrides={})=>({id:id(key),name:'Test '+key,email:id(key).toLowerCase()+'@hmf.example',office:'UK',department:'Electrical Engineering',profile:{...blank},revision:0,...overrides});
async function create(key,overrides={}){const value=employee(key,{password,...overrides});await wf(admin,'employee',{employee:value,reason:'Automated Phase 1 fixture'});return value;}
async function profile(key){return(await wf(admin,'profile',undefined,'&id='+id(key))).person;}
async function edit(key,fn,actor=admin,expected=200){const p=await profile(key),next=fn(p);return wf(actor,'employee',{employee:next,reason:'Automated Phase 1 edit'},'',expected);}
async function login(value){const c=client();await portal(c,'login',{email:value.email,password});return c;}


const managerValue=await create('manager',{roles:['employee','manager'],officeScope:[]});
const staffValue=await create('staff',{profile:{...blank,managerId:id('manager')}});
const outsideValue=await create('outside',{office:'PK'});
const manager=await login(managerValue),staff=await login(staffValue),outside=await login(outsideValue);
const hrs=(c,a,b,q='',status=200)=>call(c,'hours',a,b,q,status);
await hrs(staff,'sheet',undefined,'&team=true',403);
await hrs(manager,'sheet',undefined,'&id='+id('outside'),403);
await hrs(staff,'policy',{policy:{},reason:'Forbidden'},'',403);
const oldPolicy=(await hrs(admin,'policy')).policy;
const policy={trackBreaks:true,breaksPaid:false,overtimeEnabled:true,overtimeApproval:true,graceMinutes:0,submissionDeadline:'09:00'};
await hrs(admin,'policy',{policy,previous:oldPolicy,reason:'Local Phase 2 test configuration'});
const days=Array.from({length:7},(_,day)=>({day,working:true,start:'09:00',finish:'17:00',overnight:false,breakMinutes:30,paidBreak:false,arrangement:'office'}));
await wf(admin,'schedule',{employeeId:id('staff'),name:'Phase 2 fixture',kind:'base',startDate:'2026-01-01',endDate:'',days,reason:'Fictional test schedule'});
let today=await hrs(staff,'today');assert.equal(today.record,null);
const race=await Promise.all([hrs(staff,'checkIn',{status:'present'},'',null),hrs(staff,'checkIn',{status:'present'},'',null)]);
assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);
today=await hrs(staff,'today');assert.ok(today.open);assert.equal(today.record.employee_id,id('staff'));
await portal(staff,'logout',{});await portal(staff,'login',{email:staffValue.email,password});
assert.ok((await hrs(staff,'today')).open,'Logout must not clock out');
await hrs(staff,'checkOut',{date:today.today,revision:0,breakMinutes:0},'',409);
await hrs(staff,'checkOut',{date:today.today,revision:today.record.revision,breakMinutes:999},'',400);
await hrs(staff,'checkOut',{date:today.today,revision:today.record.revision,breakMinutes:0});
const checked=await hrs(staff,'today');assert.ok(checked.record.check_out);assert.equal(checked.open,null);assert.ok(checked.metrics.recordedMinutes>=0);
const yesterday=new Date(Date.parse(today.today+'T12:00:00Z')-86400000).toISOString().slice(0,10);
const times={checkIn:yesterday+'T09:00:00Z',checkOut:yesterday+'T18:00:00Z',breakMinutes:30};
let request=await hrs(staff,'requestCorrection',{date:yesterday,revision:0,times,reason:'Forgot yesterday’s check-in'});
await hrs(staff,'decideCorrection',{id:request.id,decision:'approved',reason:'Self approval'},'',403);
await hrs(outside,'decideCorrection',{id:request.id,decision:'approved',reason:'Outside scope'},'',403);
let sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].record,null);
await hrs(manager,'decideCorrection',{id:request.id,decision:'approved',reason:'Confirmed with employee'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].noResponse,false);assert.equal(sheet.rows[0].recordedMinutes,510);assert.equal(sheet.rows[0].differenceMinutes,60);assert.equal(sheet.rows[0].overtimeState,'pending');
await hrs(staff,'overtimeDecision',{employeeId:id('staff'),date:yesterday,revision:sheet.rows[0].record.revision,decision:'approved',reason:'Self overtime'},'',403);
await hrs(manager,'overtimeDecision',{employeeId:id('staff'),date:yesterday,revision:sheet.rows[0].record.revision,decision:'approved',reason:'Confirmed additional hour'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].overtimeState,'approved');
request=await hrs(staff,'requestCorrection',{date:yesterday,revision:sheet.rows[0].record.revision,times:{...times,checkOut:yesterday+'T17:00:00Z'},reason:'Please correct the finish time'});
await hrs(manager,'decideCorrection',{id:request.id,decision:'declined',reason:'Original finish confirmed'});
assert.equal((await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday)).rows[0].recordedMinutes,510);
request=await hrs(staff,'requestCorrection',{date:yesterday,revision:sheet.rows[0].record.revision,times,reason:'Cancel test request'});
await hrs(staff,'cancelCorrection',{id:request.id});
await hrs(manager,'decideCorrection',{id:request.id,decision:'approved',reason:'Already cancelled'},'',409);
const managerSheet=await hrs(manager,'sheet',undefined,'&team=true&start='+yesterday+'&end='+today.today);
assert.ok(managerSheet.rows.every(r=>[id('manager'),id('staff')].includes(r.employeeId)));
const csv=await hrs(manager,'export',undefined,'&team=true&start='+yesterday+'&end='+today.today);
assert.ok(csv.includes(id('staff')));assert.ok(!csv.includes(id('outside')));
await hrs(admin,'policy',{policy:{...policy,breaksPaid:true,overtimeEnabled:false},previous:policy,reason:'Test policy snapshots'});
sheet=await hrs(staff,'sheet',undefined,'&start='+yesterday+'&end='+yesterday);assert.equal(sheet.rows[0].recordedMinutes,510);assert.equal(sheet.rows[0].overtimeState,'approved');
const events=(await wf(admin,'audit',undefined,'&id='+id('staff'))).events;assert.ok(events.some(e=>e.action==='hours.check_in'));assert.ok(events.some(e=>e.action==='hours.correction_approved'));assert.ok(events.some(e=>e.action==='hours.overtime_approved'));
await hrs(admin,'policy',{policy:oldPolicy,previous:(await hrs(admin,'policy')).policy,reason:'Restore local policy'});
for(const key of ['staff','outside','manager'])await edit(key,p=>({...p,profile:{...p.profile,employmentStatus:'inactive',managerId:''}}));
console.log('PASS: clock-in races, explicit checkout, logout separation, scoped timesheets/exports, correction approval/decline/cancellation, overtime approval, immutable policy snapshots and audits');
```

## File: `scripts/test-portal.mjs`

```
import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173';
const auth=await fetch(origin+'/signin-with-chatgpt?return_to=/',{redirect:'manual'});
const platformCookie=auth.headers.getSetCookie()[0].split(';')[0];
const client=()=>({cookie:platformCookie});
async function request(c,action,body,query='',expected=200) {
  const r=await fetch(origin+'/api/portal'+(body?'':'?action='+action+query),{method:body?'POST':'GET',headers:{cookie:c.cookie,...(body?{'Content-Type':'application/json',origin}:{})},...(body?{body:JSON.stringify({action,...body})}:{})});
  const data=r.headers.get('content-type')?.includes('application/json')?await r.json():await r.text();
  assert.equal(r.status,expected,JSON.stringify(data));
  const cookie=r.headers.getSetCookie().find(x=>x.startsWith('hmf_session='));
  if(cookie)c.cookie=platformCookie+'; '+cookie.split(';')[0];
  return data;
}
const anonymous=await fetch(origin+'/api/portal?action=dashboard');
assert.equal(anonymous.status,401);
console.log('PASS: anonymous requests are rejected');
const admin=client(),uk=client(),pk=client();
await request(uk,'login',{email:'employee.uk@hmf.example',password:'incorrect'},'',401);
const adminMe=await request(admin,'login',{email:'admin@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'});
assert.equal(adminMe.user.role,'system_admin');
const day=adminMe.today;
const all=await request(admin,'dashboard',undefined,'&date='+day);
assert.equal(all.rows.filter(r=>/^HMF-\d{3}$/.test(r.id)).length,24);
assert.ok(all.rows.every(r=>!('password_hash' in r)));
assert.equal((await request(admin,'dashboard',undefined,'&date='+day+'&office=PK')).rows.filter(r=>/^HMF-\d{3}$/.test(r.id)).length,12);
assert.equal((await request(admin,'dashboard',undefined,'&date='+day+'&office=UK')).rows.filter(r=>/^HMF-\d{3}$/.test(r.id)).length,12);
console.log('PASS: admin login, 24 demo employees, UK/PK filtering, no credential leakage');
await request(uk,'login',{email:'employee.uk@hmf.example',password:'[REDACTED_DEMO_PASSWORD]',office:'PK'},'',403);
const ukMe=await request(uk,'login',{email:'employee.uk@hmf.example',password:'[REDACTED_DEMO_PASSWORD]',office:'UK',role:'admin'});
assert.equal(ukMe.user.office,'UK');
assert.equal(ukMe.user.role,'employee');
const pkMe=await request(pk,'login',{email:'employee.pk@hmf.example',password:'[REDACTED_DEMO_PASSWORD]'});
assert.equal(pkMe.user.office,'PK');
for(const office of ['UK','PK'])assert.equal(adminMe.officeDates[office],new Intl.DateTimeFormat('en-CA',{timeZone:office==='UK'?'Europe/London':'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()));
await request(uk,'dashboard',undefined,'',403);
await request(uk,'export',undefined,'',403);
await request(uk,'history',undefined,'&id=HMF-013',403);
await request(uk,'correct',{employeeId:'HMF-013',date:day,status:'absent',correctionReason:'Denied'},'',403);
console.log('PASS: both employee logins, office dates, employee/admin separation');
await request(uk,'attendance',{status:'other',reason:''},'',400);
await request(uk,'attendance',{status:'invalid'},'',400);
const saved=await request(uk,'attendance',{status:'present',employeeId:'HMF-013',date:'2000-01-01'});
assert.equal(saved.date,ukMe.today);
let mine=await request(uk,'mine');
assert.equal(mine.records.filter(r=>r.date===saved.date).length,1);
assert.ok(mine.records.every(r=>r.employee_id===ukMe.user.id));
await request(uk,'attendance',{status:'other',reason:'Test: client site visit'});
mine=await request(uk,'mine');
assert.equal(mine.records.filter(r=>r.date===saved.date).length,1);
assert.equal(mine.records.find(r=>r.date===saved.date).status,'other');
const after=await request(admin,'dashboard',undefined,'&date='+saved.date);
assert.equal(after.rows.find(r=>r.id===ukMe.user.id).reason,'');
assert.equal(after.rows.find(r=>r.id===ukMe.user.id).status,'unavailable');
assert.equal((await request(admin,'history',undefined,'&id='+ukMe.user.id)).records.find(r=>r.date===saved.date).reason,'Test: client site visit');
await request(pk,'attendance',{status:'absent',reason:'Test submission'});
const pkRecords=await request(pk,'mine');
assert.equal(pkRecords.records.find(r=>r.date===pkMe.today).status,'absent');
console.log('PASS: validation, server-owned identity/date, save/update without duplicates, administrator visibility');
await request(admin,'correct',{employeeId:ukMe.user.id,date:saved.date,status:'present'},'',400);
await request(admin,'correct',{employeeId:ukMe.user.id,date:'2999-01-01',status:'present',correctionReason:'Future'},'',400);
await request(admin,'correct',{employeeId:ukMe.user.id,date:saved.date,status:'present',correctionReason:'Test: confirmed attendance'});
const history=await request(admin,'history',undefined,'&id='+ukMe.user.id);
assert.equal(history.records.find(r=>r.date===saved.date).status,'present');
assert.ok(history.audits.some(a=>a.reason==='Test: confirmed attendance'&&a.actor_id==='ADMIN'));
console.log('PASS: corrections require explanation, reject future dates, persist audit history');
const csv=await request(admin,'export',undefined,'&date='+saved.date+'&office=UK');
assert.ok(csv.includes('Oliver Bennett'));
assert.ok(!csv.includes('Ahmed Khan'));
assert.ok(csv.includes('Attendance date'));
await request(admin,'dashboard',undefined,'&date=2026-02-30',400);
console.log('PASS: office-scoped CSV export');
await request(uk,'logout',{});
await request(uk,'mine',undefined,'',401);
const accessHistory=await request(admin,'history',undefined,'&id='+ukMe.user.id);
assert.ok(accessHistory.accessEvents.some(e=>e.event==='sign_in'));
assert.ok(accessHistory.accessEvents.some(e=>e.event==='sign_out'));
assert.ok(accessHistory.accessEvents.every(e=>e.office==='UK'&&!Number.isNaN(Date.parse(e.occurred_at))));
console.log('PASS: shared sign-in validates office, ignores client role, records sign-in/out events and invalidates logout');
console.log('All HMF attendance server integration checks passed.');
```

## File: `scripts/tool-environment.mjs`

```
import path from "node:path";

// Shared defaults for Vite and standalone Wrangler commands. Managed Linux
// supplies its own checkout-local paths before these defaults are applied.
export function configureToolEnvironment(projectRoot) {
  const runtimeRoot =
    process.env.SITES_RUNTIME_ROOT || path.join(projectRoot, ".sites-runtime");
  const defaults = {
    CLOUDFLARE_CF_FETCH_ENABLED: "false",
    WRANGLER_SEND_METRICS: "false",
    WRANGLER_WRITE_LOGS: "false",
    WRANGLER_LOG_PATH: path.join(runtimeRoot, "wrangler/logs"),
    WRANGLER_REGISTRY_PATH: path.join(runtimeRoot, "wrangler/dev-registry"),
    MINIFLARE_REGISTRY_PATH: path.join(runtimeRoot, "wrangler/registry"),
  };
  for (const [name, value] of Object.entries(defaults)) {
    process.env[name] ??= value;
  }
}
```

## File: `scripts/vite/connector-preview-plugin.mjs`

```
import { randomUUID } from "node:crypto";
import { access, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import getRawBody from "raw-body";

const moduleId = "virtual:sites-connector-preview";
const resolvedId = `\0${moduleId}`;
const endpoint = "/__sites_connector_preview/invoke";
const contextEndpoint = "/__sites_connector_preview/context";
const unavailable = {
  status: "binding_unavailable",
  message:
    "Connected apps need an active agent preview session in this preview.",
};
const uncertain = {
  status: "upstream_error",
  message:
    "The app did not return a confirmed result. The action may have completed; check before trying again.",
};

// A development-only adapter. The shared project directory connects the preview
// process to its owning agent even when they use different network namespaces.
export function connectorPreview() {
  const bridgeToken = randomUUID();
  let root;
  let server;
  async function readSession() {
    const session = JSON.parse(
      await readFile(path.join(root, "session.json"), "utf8"),
    );
    if (
      !/^[0-9a-f-]{36}$/.test(session.id) ||
      (session.expiresAt !== null && !(session.expiresAt > Date.now()))
    )
      throw new Error("Session ended");
    if (
      !Number.isInteger(session.timeoutMs) ||
      session.timeoutMs <= 0 ||
      session.timeoutMs > 2 ** 31 - 1
    )
      throw new Error("Invalid session deadline");
    return session;
  }
  return {
    name: "sites-connector-preview",
    apply: "serve",
    config(config) {
      return {
        server: {
          host: config.server?.host ?? "127.0.0.1",
          strictPort: true,
          fs: {
            deny: [
              ".env",
              ".env.*",
              "*.{crt,pem}",
              "**/.git/**",
              "**/.sites-runtime/**",
            ],
          },
          watch: { ignored: ["**/.sites-runtime/**"] },
        },
      };
    },
    configResolved(config) {
      root = path.join(config.root, ".sites-runtime", "connector-preview");
    },
    resolveId(id) {
      if (id === moduleId) return resolvedId;
    },
    load(id, options) {
      if (id !== resolvedId) return;
      if (
        this.environment?.name === "client" ||
        (!this.environment && !options?.ssr)
      ) {
        throw new Error(
          "Connected apps are only available in Site server routes.",
        );
      }
      // Auxiliary Workers load before Vite starts listening. strictPort keeps
      // this configured address stable when the server opens its socket.
      const url = `http://127.0.0.1:${server.config.server.port}${endpoint}`;
      const contextUrl = `http://127.0.0.1:${server.config.server.port}${contextEndpoint}`;
      return `export default { async getContext() {
        try {
          const response = await fetch(${JSON.stringify(contextUrl)}, {
            headers: { "X-Sites-Preview": ${JSON.stringify(bridgeToken)} }
          });
          return response.json();
        } catch { return { status: "upstream_error" }; }
      }, async invoke(connectorId, actionName, args) {
        const response = await fetch(${JSON.stringify(url)}, {
          method: "POST", headers: { "Content-Type": "application/json", "X-Sites-Preview": ${JSON.stringify(bridgeToken)} },
          body: JSON.stringify({connectorId, actionName, arguments: args})
        });
        return response.json();
      } };`;
    },
    configureServer(vite) {
      server = vite;
      vite.middlewares.use(contextEndpoint, async (req, res) => {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Content-Type", "application/json");
        if (
          req.method !== "GET" ||
          req.headers["x-sites-preview"] !== bridgeToken
        ) {
          res.statusCode = 403;
          res.end(JSON.stringify(unavailable));
          return;
        }
        try {
          const session = await readSession();
          // Preview grants do not establish hosted catalog visibility.
          if (
            !Array.isArray(session.connectorIds) ||
            !session.connectorIds.every((id) => typeof id === "string")
          )
            throw new Error("Missing selected connectors");
          res.end(
            JSON.stringify({
              status: "success",
              connectors: session.connectorIds.map((connectorId) => ({
                connectorId,
                policy: "enabled",
                tools: null,
              })),
            }),
          );
        } catch {
          res.end(JSON.stringify({ status: "binding_unavailable" }));
        }
      });
      vite.middlewares.use(endpoint, async (req, res) => {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Content-Type", "application/json");
        if (
          req.method !== "POST" ||
          req.headers["x-sites-preview"] !== bridgeToken
        ) {
          res.statusCode = 403;
          res.end(JSON.stringify(unavailable));
          return;
        }
        let requestPath;
        let responsePath;
        let submitted = false;
        try {
          const session = await readSession();
          const raw = await getRawBody(req, { limit: 65536 });
          const call = JSON.parse(
            new TextDecoder("utf-8", { fatal: true }).decode(raw),
          );
          const body = JSON.stringify(call);
          const directory = path.join(root, session.id);
          const id = randomUUID();
          requestPath = path.join(directory, `${id}.request`);
          responsePath = path.join(directory, `${id}.response`);
          await writeFile(`${requestPath}.tmp`, body, { mode: 0o600 });
          await rename(`${requestPath}.tmp`, requestPath);
          submitted = true;
          // Read the owner's deadline per call, so a restarted session can use
          // longer provider waits without rebuilding or restarting the Site.
          const deadline = Math.min(
            session.expiresAt ?? Infinity,
            Date.now() + session.timeoutMs + 2000,
          );
          while (Date.now() < deadline) {
            try {
              res.end(await readFile(responsePath));
              return;
            } catch (error) {
              if (error.code !== "ENOENT") throw error;
              // Session shutdown removes the mailbox. Stop promptly even when
              // the configured provider deadline is several minutes away.
              await access(directory);
            }
            await delay(50);
          }
          res.end(JSON.stringify(uncertain));
        } catch {
          // raw-body pauses oversized requests; drain the remainder so the HTTP
          // connection can finish without retaining an unread request stream.
          req.resume();
          res.end(JSON.stringify(submitted ? uncertain : unavailable));
        } finally {
          await Promise.all(
            [requestPath, requestPath && `${requestPath}.tmp`, responsePath]
              .filter(Boolean)
              .map((file) => rm(file, { force: true })),
          );
        }
      });
    },
  };
}
```

## File: `scripts/vite/sites-vite-plugin.LICENSE`

```
MIT License

Copyright (c) 2026 OpenAI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## File: `scripts/vite/sites-vite-plugin.ts`

```
// Vendored from @openai/sites-vite-plugin 0.2.0 (openai/sites#9).
// See sites-vite-plugin.LICENSE for the upstream MIT license.
import { access, cp, mkdir, rm } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const localUserId = "local_seedy";
const localEmail = "seedy@sites.test";
const localFullName = "Seedy";
const localCookieName = "__sites_local_auth";
const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);
const localAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
const authPaths = new Set([
  "/signin-with-chatgpt",
  "/signout-with-chatgpt",
  "/callback",
]);

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

export function sites({ mockAuth = true } = {}): Plugin {
  let root = process.cwd();
  let command: "build" | "serve" = "build";

  return {
    name: "sites",
    configResolved(config) {
      root = config.root;
      command = config.command;
    },
    configureServer(server) {
      if (!mockAuth) return;
      const secure = Boolean(server.config.server.https);

      server.config.logger.info(`Sites local sign-in: ${localEmail}`);
      server.middlewares.use((request, response, next) => {
        for (const name of Object.keys(request.headers)) {
          if (name.startsWith("oai-authenticated-user-")) {
            removeHeader(request, name);
          }
        }

        let authority: URL;
        let url: URL;
        try {
          authority = new URL(
            `${secure ? "https" : "http"}://${request.headers.host}`,
          );
          url = new URL(request.url ?? "/", authority);
        } catch {
          if (authPaths.has((request.url ?? "/").split("?")[0])) {
            respond(response, 403);
          } else {
            next();
          }
          return;
        }

        const hostname = authority.hostname
          .replace(/^\[|\]$/g, "")
          .toLowerCase();
        if (
          !localHosts.has(hostname) ||
          !localAddresses.has(request.socket.remoteAddress ?? "") ||
          url.origin !== authority.origin
        ) {
          if (authPaths.has(url.pathname)) respond(response, 403);
          else next();
          return;
        }

        const cookies = (request.headers.cookie ?? "")
          .split(";")
          .map((cookie) => cookie.trim())
          .filter(Boolean);
        const signInCookies = cookies
          .filter((cookie) => cookie.startsWith(`${localCookieName}=`))
          .map((cookie) => cookie.slice(localCookieName.length + 1));
        const applicationCookies = cookies.filter(
          (cookie) => !cookie.startsWith(`${localCookieName}=`),
        );
        if (applicationCookies.length !== cookies.length) {
          removeHeader(request, "cookie");
          if (applicationCookies.length) {
            setHeader(request, "cookie", applicationCookies.join("; "));
          }
        }

        if (url.pathname === "/callback") {
          respond(response, 501);
          return;
        }

        const signIn = url.pathname === "/signin-with-chatgpt";
        const signOut = url.pathname === "/signout-with-chatgpt";
        if (!signIn && !signOut) {
          if (signInCookies.length === 1 && signInCookies[0] === "1") {
            setHeader(request, "oai-authenticated-user-id", localUserId);
            setHeader(request, "oai-authenticated-user-email", localEmail);
            setHeader(
              request,
              "oai-authenticated-user-full-name",
              localFullName,
            );
            setHeader(
              request,
              "oai-authenticated-user-full-name-encoding",
              "percent-encoded-utf-8",
            );
          }
          next();
          return;
        }

        if (
          (request.headers.origin && request.headers.origin !== url.origin) ||
          request.headers["sec-fetch-site"] === "cross-site"
        ) {
          respond(response, 403);
          return;
        }

        if (
          request.headers["next-router-prefetch"] !== undefined ||
          request.headers["x-middleware-prefetch"] === "1" ||
          [request.headers.purpose, request.headers["sec-purpose"]].some(
            (value) =>
              typeof value === "string" &&
              value
                .split(/[;,]/)
                .some((part) => part.trim().toLowerCase() === "prefetch"),
          )
        ) {
          respond(response, 204);
          return;
        }

        if (
          request.method !== "GET" &&
          (!signOut || request.method !== "POST")
        ) {
          response.setHeader("Allow", signIn ? "GET" : "GET, POST");
          respond(response, 405);
          return;
        }

        response.statusCode = request.method === "POST" ? 303 : 302;
        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader(
          "Location",
          safeReturn(url.searchParams.get("return_to")),
        );
        response.setHeader(
          "Set-Cookie",
          `${localCookieName}=${signIn ? "1" : ""}; Path=/; ${
            signOut ? "Max-Age=0; " : ""
          }HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`,
        );
        response.end();
      });
    },
    async closeBundle() {
      if (command !== "build") return;

      const outputDirectory = resolve(root, "dist", ".openai");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });

      await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }
    },
  };
}

function removeHeader(request: IncomingMessage, name: string): void {
  delete request.headers[name];
  for (let index = request.rawHeaders.length - 2; index >= 0; index -= 2) {
    if (request.rawHeaders[index]?.toLowerCase() === name) {
      request.rawHeaders.splice(index, 2);
    }
  }
}

function setHeader(
  request: IncomingMessage,
  name: string,
  value: string,
): void {
  removeHeader(request, name);
  request.headers[name] = value;
  request.rawHeaders.push(name, value);
}

function respond(response: ServerResponse, status: number): void {
  response.statusCode = status;
  response.setHeader("Cache-Control", "private, no-store");
  response.end();
}

function safeReturn(value: string | null): string {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/";

  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost" || authPaths.has(url.pathname)) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
```

## File: `tests/browser/portal.spec.ts`

```
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function accessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  const layout = await page.evaluate(() => ({
    width: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll('main *')]
      .filter(
        (el) =>
          !el.closest('.table-scroll') && el.getBoundingClientRect().right > window.innerWidth,
      )
      .map((el) => ({
        tag: el.tagName,
        class: el.className,
        right: el.getBoundingClientRect().right,
      })),
  }));
  expect(layout.scroll, JSON.stringify(layout)).toBeLessThanOrEqual(layout.width);
}
async function login(page: Page, email: string) {
  await page.goto('/signin-with-chatgpt?return_to=/');
  await page.getByRole('textbox', { name: 'Company email', exact: true }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page
    .getByLabel('Password', { exact: false })
    .filter({ visible: true })
    .first()
    .fill(process.env.HMF_TEST_PASSWORD || '[REDACTED_DEMO_PASSWORD]');
  await page.getByRole('button', { name: 'Sign in to HMF', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign out', exact: true })).toBeVisible();
}

test('employee sign-in, keyboard leave request, history and accessibility', async ({
  page,
}, info) => {
  await login(page, 'employee.uk@hmf.example');
  await expect(page.getByRole('button', { name: 'Settings', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Working time', exact: true })).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Leave', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Leave balance', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Request leave', exact: true }).press('Enter');
  await expect(page.getByRole('combobox', { name: 'Leave type', exact: true })).toBeFocused();
  await page.getByRole('combobox', { name: 'Leave type', exact: true }).press('Tab');
  await expect(page.getByLabel('Start date', { exact: true })).toBeFocused();
  await accessible(page);
  await page.screenshot({
    path: 'outputs/playwright/employee-leave-' + info.project.name + '.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Request leave', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'History', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
});

test('administrator calendars, directory and hours remain accessible', async ({ page }, info) => {
  await login(page, 'admin@hmf.example');
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Leave', exact: true }).click();
  await page.getByRole('combobox', { name: 'Office calendar', exact: true }).selectOption('PK');
  await expect(
    page.getByRole('heading', { name: 'Public holidays · PK', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Edit office calendar', exact: true }).click();
  await expect(page.getByLabel('Leave period starts', { exact: true })).toBeFocused();
  await accessible(page);
  await page.screenshot({
    path: 'outputs/playwright/admin-calendar-' + info.project.name + '.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'People', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Hours', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
});
```

## File: `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "node",
      "@cloudflare/workers-types"
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": [
    "node_modules",
    "examples",
    "dist",
    ".vinext",
    ".wrangler",
    ".sites-runtime",
    "outputs",
    "work"
  ]
}
```

## File: `vendor/shadcn-tailwind-4.13.0.LICENSE.md`

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## File: `vendor/shadcn-tailwind-4.13.0.css`

```
@theme inline {
  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(
        --radix-accordion-content-height,
        var(--accordion-panel-height, auto)
      );
    }
  }

  @keyframes accordion-up {
    from {
      height: var(
        --radix-accordion-content-height,
        var(--accordion-panel-height, auto)
      );
    }
    to {
      height: 0;
    }
  }
}

/* Custom variants */
@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}

@custom-variant data-closed {
  &:where([data-state="closed"]),
  &:where([data-closed]:not([data-closed="false"])) {
    @slot;
  }
}

@custom-variant data-checked {
  &:where([data-state="checked"]),
  &:where([data-checked]:not([data-checked="false"])) {
    @slot;
  }
}

@custom-variant data-unchecked {
  &:where([data-state="unchecked"]),
  &:where([data-unchecked]:not([data-unchecked="false"])) {
    @slot;
  }
}

@custom-variant data-selected {
  &:where([data-selected="true"]) {
    @slot;
  }
}

@custom-variant data-disabled {
  &:where([data-disabled="true"]),
  &:where([data-disabled]:not([data-disabled="false"])) {
    @slot;
  }
}

@custom-variant data-active {
  &:where([data-state="active"]),
  &:where([data-active]:not([data-active="false"])) {
    @slot;
  }
}

@custom-variant data-horizontal {
  &:where([data-orientation="horizontal"]) {
    @slot;
  }
}

@custom-variant data-vertical {
  &:where([data-orientation="vertical"]) {
    @slot;
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

/* scroll-fade */
@property --scroll-fade-t {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-b {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-s {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-e {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-mask {
  syntax: "*";
  inherits: false;
}

@theme inline {
  @keyframes scroll-fade-reveal-t {
    from {
      --scroll-fade-t: 0px;
    }
    to {
      --scroll-fade-t: var(--_scroll-fade-size-t, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
  }
  @keyframes scroll-fade-reveal-b {
    from {
      --scroll-fade-b: var(--_scroll-fade-size-b, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
    to {
      --scroll-fade-b: 0px;
    }
  }
  @keyframes scroll-fade-reveal-s {
    from {
      --scroll-fade-s: 0px;
    }
    to {
      --scroll-fade-s: var(--_scroll-fade-size-s, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
  }
  @keyframes scroll-fade-reveal-e {
    from {
      --scroll-fade-e: var(--_scroll-fade-size-e, var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10))));
    }
    to {
      --scroll-fade-e: 0px;
    }
  }
}

@utility scroll-fade {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-block: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-t 1ms ease-in-out,
      scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y), scroll(self y);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-y {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-block: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-t 1ms ease-in-out,
      scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y), scroll(self y);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-x {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-inline: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-inline: linear-gradient(
      to left,
      transparent 0,
      #000 var(--scroll-fade-s, 0px),
      #000 calc(100% - var(--scroll-fade-e, 0px)),
      transparent 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));
  mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation:
      scroll-fade-reveal-s 1ms ease-in-out,
      scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self inline), scroll(self inline);
    animation-range:
      0 var(--scroll-fade-reveal, calc(var(--spacing) * 24)),
      calc(100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))) 100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-t {
  --_scroll-fade-size-t: var(
    --scroll-fade-t-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-t, 0px),
    #000 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-t 1ms ease-in-out;
    animation-timeline: scroll(self y);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-t: var(--_scroll-fade-size-t);
  }
}

@utility scroll-fade-b {
  --_scroll-fade-size-b: var(
    --scroll-fade-b-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to bottom,
    #000 0,
    #000 calc(100% - var(--scroll-fade-b, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-b 1ms ease-in-out;
    animation-timeline: scroll(self y);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-b: var(--_scroll-fade-size-b);
  }
}

@utility scroll-fade-l {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-s 1ms ease-in-out;
    animation-timeline: scroll(self x);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
  }
}

@utility scroll-fade-r {
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    #000 0,
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self x);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-s {
  --_scroll-fade-size-s: var(
    --scroll-fade-s-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    transparent 0,
    #000 var(--scroll-fade-s, 0px),
    #000 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-mask: linear-gradient(
      to left,
      transparent 0,
      #000 var(--scroll-fade-s, 0px),
      #000 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-s 1ms ease-in-out;
    animation-timeline: scroll(self inline);
    animation-range: 0 var(--scroll-fade-reveal, calc(var(--spacing) * 24));
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-s: var(--_scroll-fade-size-s);
  }
}

@utility scroll-fade-e {
  --_scroll-fade-size-e: var(
    --scroll-fade-e-size,
    var(--scroll-fade-size, min(12%, calc(var(--spacing) * 10)))
  );
  --scroll-fade-mask: linear-gradient(
    to right,
    #000 0,
    #000 calc(100% - var(--scroll-fade-e, 0px)),
    transparent 100%
  );
  &:where([dir="rtl"], [dir="rtl"] *) {
    --scroll-fade-mask: linear-gradient(
      to left,
      #000 0,
      #000 calc(100% - var(--scroll-fade-e, 0px)),
      transparent 100%
    );
  }
  -webkit-mask-image: var(--scroll-fade-mask);
  mask-image: var(--scroll-fade-mask);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  @supports (animation-timeline: scroll()) {
    animation: scroll-fade-reveal-e 1ms ease-in-out;
    animation-timeline: scroll(self inline);
    animation-range: calc(
        100% - var(--scroll-fade-reveal, calc(var(--spacing) * 24))
      )
      100%;
    animation-fill-mode: both;
  }

  @supports not (animation-timeline: scroll()) {
    --scroll-fade-e: var(--_scroll-fade-size-e);
  }
}

@utility scroll-fade-* {
  --scroll-fade-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-size: --value([length], [percentage]);
}

@utility scroll-fade-t-* {
  --scroll-fade-t-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-t-size: --value([length], [percentage]);
}

@utility scroll-fade-b-* {
  --scroll-fade-b-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-b-size: --value([length], [percentage]);
}

@utility scroll-fade-s-* {
  --scroll-fade-s-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-s-size: --value([length], [percentage]);
}

@utility scroll-fade-e-* {
  --scroll-fade-e-size: calc(var(--spacing) * --value(integer));
  --scroll-fade-e-size: --value([length], [percentage]);
}

@utility scroll-fade-none {
  --scroll-fade-mask: none;
}

/* shimmer */
@property --shimmer-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 20deg;
}
@property --shimmer-image {
  syntax: "*";
  inherits: false;
}
@property --shimmer-text-fill {
  syntax: "*";
  inherits: false;
}

@theme inline {
  @keyframes tw-shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}

@utility shimmer {
  --_spread: var(--shimmer-spread, calc(3ch + 40px));
  --_base: currentColor;
  --_highlight: var(
    --shimmer-color,
    oklch(from currentColor l c h / calc(alpha* 0.2))
  );

  background-image: var(
    --shimmer-image,
    linear-gradient(
      calc(90deg + var(--shimmer-angle)),
      var(--_base) calc(50% - var(--_spread)),
      color-mix(in oklch, var(--_highlight), var(--_base) 50%)
        calc(50% - var(--_spread) * 0.5),
      var(--_highlight) 50%,
      color-mix(in oklch, var(--_highlight), var(--_base) 50%)
        calc(50% + var(--_spread) * 0.5),
      var(--_base) calc(50% + var(--_spread))
    )
  );
  background-repeat: no-repeat;
  background-size: calc(200% + var(--_spread) * 2) 100%;
  background-position: 0 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: var(--shimmer-text-fill, transparent);
  animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;

  @variant dark {
    --_highlight: var(
      --shimmer-color,
      oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))
    );
  }

  &:where([dir="rtl"], [dir="rtl"] *) {
    animation-direction: reverse;
  }
}

@utility shimmer-once {
  animation-iteration-count: 1;
}

@utility shimmer-reverse {
  animation-direction: reverse;
}

@utility shimmer-none {
  --shimmer-image: none;
  --shimmer-text-fill: currentColor;
}

@utility shimmer-color-* {
  --shimmer-color: --value(--color, [color]);
  --shimmer-color: color-mix(
    in oklch,
    --value(--color, [color]) calc(--modifier(integer) * 1%),
    transparent
  );
}

@utility shimmer-duration-* {
  --shimmer-duration: calc(--value(integer) * 1ms);
}

@utility shimmer-spread-* {
  --shimmer-spread: calc(var(--spacing) * --value(integer));
  --shimmer-spread: --value([length], [percentage]);
}

@utility shimmer-angle-* {
  --shimmer-angle: calc(--value(integer) * 1deg);
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background-image: none;
    -webkit-text-fill-color: currentColor;
  }
}
```

## File: `vite.config.ts`

```
import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { readExecutionProfile } from "./scripts/execution-profile.mjs";
import { configureToolEnvironment } from "./scripts/tool-environment.mjs";
import { sites } from "./scripts/vite/sites-vite-plugin";
import { connectorPreview } from "./scripts/vite/connector-preview-plugin.mjs";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const managedLinux = readExecutionProfile() === "managed-linux";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "site-creator-d1",
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async ({ command }) => {
  configureToolEnvironment(process.cwd());

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: {
      ...(managedLinux
        ? { host: "0.0.0.0", allowedHosts: ["terminal.local"] }
        : {}),
      ...(isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : {}),
    },
    plugins: [
      vinext(),
      sites({ mockAuth: !managedLinux }),
      connectorPreview(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
        config: {
          ...localBindingConfig,
          ...(command === "serve"
            ? {
                services: [
                  {
                    binding: "CONNECTORS",
                    service: "sites-connector-preview",
                    entrypoint: "ConnectorPreview",
                  },
                ],
              }
            : {}),
        },
        ...(command === "serve"
          ? {
              auxiliaryWorkers: [
                {
                  config: {
                    name: "sites-connector-preview",
                    main: "./scripts/connector-preview/worker.mjs",
                    compatibility_date: "2026-05-15",
                  },
                },
              ],
            }
          : {}),
      }),
    ],
  };
});
```

## File: `worker/index.ts`

```
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

const worker = {
  fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    return runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
  },
};

export default worker;
```
