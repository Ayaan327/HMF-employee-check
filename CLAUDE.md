# HMF Attendance — project instructions for Claude

This repository is dedicated **only** to the HMF attendance app and things directly related to it.
Anything unrelated does not belong here.

## Status
- Code is being migrated from Codex. Raw files land in `codex-import/` first, untouched.
- Once reviewed, working code moves into `app/`. `codex-import/` is a reference copy, not the source of truth.

## Layout
- `app/` — the actual application code (source of truth once migrated)
- `codex-import/` — original files as exported from Codex, kept for reference
- `docs/PROJECT_BRIEF.md` — what the app does, who uses it, core features
- `docs/DECISIONS.md` — log of decisions (stack, data model, scope) with dates and reasons
- `docs/TODO.md` — open work, bugs, ideas

## Working rules
- Before big changes, check `docs/PROJECT_BRIEF.md` and `docs/DECISIONS.md`.
- Record any significant decision in `docs/DECISIONS.md`.
- Keep `docs/TODO.md` current when tasks are finished or discovered.
- Attendance data may include personal information about people: never commit real
  member data, secrets, API keys or `.env` files. Use sample/fake data for testing.

## Stack
_To be filled in once the Codex files are imported (language, framework, database, how to run, how to test)._
