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
