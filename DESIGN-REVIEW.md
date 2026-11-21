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
