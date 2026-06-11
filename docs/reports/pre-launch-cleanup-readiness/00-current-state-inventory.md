# 00 — Current State Inventory
**Date:** 2026-06-12  
**Audit Type:** Pre-Launch Cleanup & Readiness  
**Project:** NexaLearn by Ahmed Darhous (formerly Darhous AI Cloud Academy)

---

## Git Status

| Field | Value |
|-------|-------|
| Branch | `main` |
| Commit (before audit) | `e78573e02abd71e7c17c00dfd99e3ab268b57225` |
| Remote | `https://github.com/Darhous/darhous-ai-cloud-academy.git` |
| Working tree | Clean (no uncommitted changes at scan time) |

### Other branches
- `github-repository-polish`
- `readme-premium-github`
- `remotes/origin/claude/darhous-full-audit-production-hunrq0`

### Recent commits (last 20)
```
e78573e refactor(landing): replace congested marquee rows with TechEcosystem badge grid
f6129db feat(landing): full-page scroll-stack cards + mouse glow effects
f24e3bd fix(marquee): remove useReducedMotion gate
a0824ff feat(landing): add 5 new animated sections + upgrade marquee
468d836 chore(design-lab): update summary.json
e90481c feat(design-lab): rebuild from ahmedali.online reference analysis
...
56eb6d5 feat(mentor): smart greeting, Mission of the Day, OpenRouter migration
517c3c9 fix(intro): always show CinematicIntro regardless of reduce-motion
ef393b3 feat(hero): rotating word colors + static text font + tech marquee
4b8a137 rebrand: complete NexaLearn migration across entire codebase
```

---

## Project Structure

```
darhous-ai-cloud-academy/
├── src/
│   ├── app/
│   │   ├── [locale]/          # ~85 pages (i18n: ar / en)
│   │   ├── api/               # ~35 API routes
│   │   ├── auth/callback/
│   │   ├── certificates/verify/[code]/
│   │   ├── u/[username]/
│   │   ├── og/
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/            # ~80+ components
│   ├── config/                # portals.ts, navigation config
│   ├── content/blog/          # MDX blog posts
│   ├── data/                  # static data files
│   ├── hooks/
│   ├── lib/
│   └── types/
├── docs/
│   ├── reports/               # session reports
│   ├── plans/
│   ├── handoffs/
│   └── audits/
├── content-source/            # CMS content for all portals
├── public/                    # static assets
├── reports/                   # OLD root-level reports folder (needs archiving)
├── supabase/                  # DB migrations and types
├── scripts/                   # utility scripts
└── [root-level docs]          # see below
```

---

## Root-Level Documentation Files

| File | Size | Status |
|------|------|--------|
| `README.md` | 49 KB | Active — needs update |
| `README.backup.20260607-135220.md` | 12 KB | Archive candidate |
| `ANTIGRAVITY_PROJECT_LOG.md` | 411 KB | Active project log |
| `ANTIGRAVITY_RULES.md` | 5 KB | Active agent rules |
| `CLAUDE.md` / `AGENTS.md` | ~1 KB | Active agent context |
| `CLAUDE_CONTINUATION_CONTEXT.md` | 87 KB | Old handoff — archive candidate |
| `ADMIN_GUIDE.md` | 3 KB | Active documentation |
| `DEPLOYMENT_GUIDE.md` | 3 KB | Active documentation |
| `DEVELOPMENT_GUIDE.md` | 2 KB | Active documentation |
| `CONTENT_ARCHITECTURE.md` | 4 KB | Active documentation |
| `PLATFORM_BLUEPRINT.md` | 5 KB | Historical — archive candidate |
| `FUTURE_ROADMAP.md` | 5 KB | Historical — archive candidate |
| `RAG_MENTOR_PLAN.md` | 5 KB | Historical plan — archive |
| `V3_FEATURES.md` | 7 KB | Historical — archive |
| `DESIGN_IMPLEMENTATION_AUDIT.md` | 7 KB | Old audit — archive |
| `GITHUB_RELEASE_GUIDE.md` | 3 KB | Reference — docs/plans |
| `SUPABASE_SETUP.md` | 5 KB | Active reference |
| `SECURITY.md` | 1 KB | Active |
| `SECURITY_INCIDENT_NOTE.md` | 2 KB | Archive (incident resolved) |
| `UX PROMAX.MD` | 117 KB | Old audit — archive |
| `CONTRIBUTING.md` | 1 KB | Active |
| `LICENSE` | 0.5 KB | Active |
| `eslint-output.txt` | 45 KB | Artifact — delete safe |
| `lint_output.txt` | 138 KB | Artifact — delete safe |
| `gen_exams.py` | 5 KB | Legacy script |
| `.legacy-exams-app.py` | 64 KB | Legacy (dot-prefixed, hidden) |
| `.legacy-exams.db` | 192 KB | Legacy DB (hidden) |
| `.legacy-exams-questions.json` | 260 KB | Legacy data (hidden) |

---

## Portals Registered (src/config/portals.ts)

| Portal | Status | Route | Type |
|--------|--------|-------|------|
| AI Academy | available | /ai-academy | internal |
| Language Portal | available | /language | shell |
| Digital Exams | available | /digital-exams | shell |
| Career Hub | available | /career | internal |
| Automation Academy | available | /automation | internal |
| IoT Lab | available | /iot-lab | internal |
| Nano Banana | available | /nano-banana-prompts | internal |
| Future Portals | coming-soon | /coming-soon | shell |

**Unregistered page:** `/cloud` — page exists (`src/app/[locale]/cloud/page.tsx`) but has no portal registry entry. There is a TODO comment in portals.ts documenting this gap.

---

## Docs Directory

### docs/reports/ (38 subdirectories)
Organized by date and session. Most recent entries:
- 2026-06-11-ui-ux-promax-visual-audit
- 2026-06-11-ui-library-foundation-setup
- 2026-06-11-homepage-total-redesign-discovery
- 2026-06-10-final-comprehensive-project-audit

### docs/plans/
- `post-import-next-phase-plan.md`
- `phase-5-ui-ux-pro-max-blueprint.md` (at plans root)

### docs/handoffs/
- 6 handoff files (admin panel, content, DB sync related)

### docs/audits/
- `admin-draft-preview-qa-after-db-sync.md`
- `content-database-final-closure-audit.md`

---

## Sibling Directories (Parent: `ai cources/`)

| Directory | Purpose |
|-----------|---------|
| `landing/` | Contains 38+ docs/reports subdirectories from earlier build phases |
| `stitch_darhous_ai_cloud_academy_ui/` | UI mockup designs from Stitch prototyping tool (15+ screens) |
| `تقارير/` | Arabic-named reports folder (3 markdown files + SQL + subdirs) |

---

## Sensitive Files (location noted, content NOT shown)

- `.env.local` — exists at project root (gitignored ✅)
- `.env.example` — safe template file
- No credentials found in tracked files

---

## Old Reports Folder (root-level `reports/`)

Two items:
- `redesign/` (subdirectory)
- `تقرير-الشهادات.md`
- `خطة-التنفيذ.md`

These are old root-level reports that should be archived to `docs/archive/`.

---

## Important Observations Before Any Changes

1. **Build and TypeScript are clean** — no blockers from compilation.
2. **Lint has 97 warnings, 0 errors** — all warnings, not blocking.
3. **design-lab pages** (`/design-lab/reference-concept-*`) are experimental prototype pages, not production content. They contain `href="#"` placeholder links. These are internal dev tools.
4. **`/cloud` page** has full content but is disconnected from the portal registry.
5. **Blog articles** show "Full content coming soon..." when MDX content is incomplete.
6. **Lesson pages** show "Content Coming Soon" when lesson data has no detailed content.
7. **Career portal** has two "قريباً" labels: CV Builder AI-assist button and Job Apply button.
8. **Social links** are REAL (Instagram, LinkedIn, Facebook, WhatsApp with actual URLs).
9. **Legacy exam files** (`.legacy-exams-app.py`, `.legacy-exams.db`, `.legacy-exams-questions.json`) are dot-prefixed (hidden) and not tracked by git — they are the original Python exam system.
10. **Two output artifact files** (`eslint-output.txt`, `lint_output.txt`) are tracked in git unnecessarily.
