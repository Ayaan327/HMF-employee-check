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
- Primary action: #173F5F
- Font: Arial, Helvetica, sans-serif
- Radius: subtle
- Elevation: flat sections and hairline borders; shadow only for modal overlays
- Density: comfortable
- Motion: Snap restrained
- Imagery/data role: logo only on sign-in; no decorative photography; attendance data leads the workspace
- Signature move: HMF red rule, navy masthead, direct operational language, aligned attendance ledger
- Locked: 2026-11-09

## Brand and product decisions

Retain official HMF logo and blue/red/white identity. Red (#C83432) is a narrow brand marker, not a competing primary action. Use neutral white and light stone surfaces, dark readable text and explicit status labels. No marketing heroes inside the application, floating icon chips, decorative metrics, or gradients.

Desktop body/control text 14–16px; secondary metadata 12px minimum. Touch controls 44px. Use 4px control corners, squared panel borders, and a coherent native 4/8/12/16/24/32/48px spacing scale. Keep controls close to the table they affect, separate page headers from working sections, and use 16px mobile / 40px desktop page insets. Preserve all account permissions, check-in actions, history, office filters, CSV export, corrections, and portal access events. Mobile uses a navigation drawer and a horizontally scrollable data table.

This is an existing, private demo with fictional employees, not a production employee identity system. Existing backend behavior stays unchanged.

## Simplification requested by the user

Replace the sidebar with a small top navigation. Remove summary tiles and repeated headings. Main register shows name, office, status and time; employee identity, department, notes, corrections and access activity remain in details. Status totals remain in the filter rather than separate cards. Employee home shows only today's form; history has its own tab. Account information is disclosed on demand. Sign-in is a single narrow form without photography or slogans. Keep existing colors and readable controls; use 48px major page spacing and 24px local grouping. Mobile navigation wraps in the header instead of using a drawer. These explicit user-directed reductions supersede earlier containment and imagery choices.
