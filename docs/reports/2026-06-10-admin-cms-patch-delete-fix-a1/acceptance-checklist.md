# Acceptance Checklist

- [x] Strip `status` from regular content-edit PATCH payload.
- [x] Status transitions remain a separate explicit action.
- [x] Replace hard `DELETE` with soft-archive (PATCH `status` to 'archived').
- [x] All 22 tables now soft-archive securely without HTTP 405 (handled generically).
- [x] Run `npm run typecheck` (0 errors).
- [x] Run `npm run lint` (no new errors).
- [x] Run `npm run build`.
- [x] Create comprehensive report files in `docs/reports/2026-06-10-admin-cms-patch-delete-fix-a1/`.
- [x] Leave all changes uncommitted.
- [x] Do not touch `ANTIGRAVITY_PROJECT_LOG.md` or any other out-of-scope files.
