# Decisions log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-11-21 | Project set up as a dedicated HMF-attendance-only workspace; Codex files go in `codex-import/`, working code in `app/` | Keep migration traceable and the project focused |
| 2026-11-21 | Imported the Codex handoff: `hmf-attendance/` became the repo root; handoff notes and earlier versions kept in `codex-import/` and excluded from tsc/eslint | Current app is the source of truth; older copies are reference only |
| 2026-11-21 | Keep Cloudflare Workers + D1 for HMF hosting | App already targets it; handoff asks not to switch without a concrete reason |
| 2026-11-21 | Recommend Cloudflare Access + Entra ID to replace the Sites sign-in gate first, then SSO-linked app sessions | Same two-layer design, smallest safe change; see assessment |
