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
