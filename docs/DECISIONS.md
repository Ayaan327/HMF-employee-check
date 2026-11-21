# Decisions log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-11-21 | Project set up as a dedicated HMF-attendance-only workspace; Codex files go in `codex-import/`, working code in `app/` | Keep migration traceable and the project focused |
| 2026-11-21 | Imported the Codex handoff: `hmf-attendance/` became the repo root; handoff notes and earlier versions kept in `codex-import/` and excluded from tsc/eslint | Current app is the source of truth; older copies are reference only |
| 2026-11-21 | Keep Cloudflare Workers + D1 for HMF hosting | App already targets it; handoff asks not to switch without a concrete reason |
| 2026-11-21 | Recommend Cloudflare Access + Entra ID to replace the Sites sign-in gate first, then SSO-linked app sessions | Same two-layer design, smallest safe change; see assessment |
| 2026-11-21 | Replaced the layered 2,700-line stylesheet with one coherent stylesheet; small markup fixes (Today status panel, Hours table formatting, collapsible privacy footer, sentence-case headers). All features, labels and permissions unchanged | User asked for a cleaner, less generic UI without losing features; existing tests guard behaviour |
| 2026-11-21 | Added `preview/`: a browser-only build of the real UI and API route code (SQLite via sql.js, demo data in the viewer's browser) for sharing on claude.ai | Lets Ayaan test the app before HMF hosting exists; never deployed, no real data, does not change the server app |
