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
