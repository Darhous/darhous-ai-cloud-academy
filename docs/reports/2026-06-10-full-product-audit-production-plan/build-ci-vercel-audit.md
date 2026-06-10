# Build, CI & Vercel Audit

**HEAD:** `94348be86157f4d7b634069234ec89fb7ed5bc4b`  
**Branch:** `main`  
**Remote:** `origin/main` at same HEAD

## Local validation (this audit)

| Command | Result |
|---------|--------|
| `npm run typecheck` | **Passed** |
| `npm run lint` | **Passed** — 0 errors, 69 warnings (~5.7 min) |
| `npm run build` | **In progress** at report write — compiled OK; static generation 636+/1274 |
| `git diff --check` | Run at commit time |

### Lint warning themes

- `react-hooks/set-state-in-effect` — multiple files
- `@typescript-eslint/no-unused-vars` — scattered
- No blocking errors

### Build notes

- Next.js 16.2.6 Turbopack
- 1274 static pages — large prerender surface (IoT/automation slugs)
- Edge runtime warning on some routes disables SSG for those pages
- Prior audits: occasional Windows sandbox EPERM — not seen this run through compile

## GitHub Actions CI

| Run ID | Commit | Status |
|--------|--------|--------|
| 27241835196 | Phase 5G log finalization | **success** (1m36s) |
| 27240570151 | Phase 5G integrity closure | success |
| 27240056479 | Phase 5G brand metadata | success |
| 27233290442 | Phase 5D cinematic intro (first) | **failure** — fixed in 27234314319 |

**Latest pushed commit on main:** `94348be` — CI green.

## Vercel visibility

- Production URL (from README): `https://darhous-ai-cloud-academy.vercel.app`
- Vercel CLI: not invoked (per instructions)
- Live visibility blockers for owner UX:
  1. **Code** — unmounted 3D showcase (not deploy issue)
  2. **sessionStorage** — cinematic intro skipped on repeat visit
  3. **Tour disabled** in source
  4. **Not CI** — HEAD builds on CI

## User-side test protocol

1. Hard refresh `/ar` in incognito
2. Clear site data OR use new session
3. Scroll to `#ecosystem` and `#portals`
4. Compare with `/en`
5. Test desktop hover for tilt
6. Verify deploy commit matches `94348be` in Vercel dashboard

## Verdict

**CI: pass at HEAD.** Local build compiling successfully; full static gen slow but progressing. **Not a deploy blocker** for audit findings — owner card issue is **integration**, not failed build.
