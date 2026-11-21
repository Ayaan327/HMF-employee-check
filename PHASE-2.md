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
