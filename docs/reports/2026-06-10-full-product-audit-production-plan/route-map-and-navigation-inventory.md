# Route Map & Navigation Inventory

**Total `page.tsx` routes:** 88  
**Locales:** `ar`, `en` (default redirect `/` → `/ar`)

## Navigation sources

| Source | File | Link count (approx) |
|--------|------|---------------------|
| Navbar | `src/components/layout/Navbar.tsx` | ~25 static + 8 portals |
| Footer | `src/components/layout/Footer.tsx` | ~22 |
| Portals registry | `src/config/portals.ts` | 8 |
| Landing | `src/components/landing/*` | portals + mentor + register |
| Admin sidebar | `src/components/admin/admin-navigation.ts` | 29 tabs (no href) |
| Command palette | `src/components/features/CommandPalette.tsx` | dynamic search |

## Full route tree (abbreviated)

### Root (non-localized)

| Route | Purpose |
|-------|---------|
| `/` | Redirect to `/ar` |
| `/certificates/verify/[code]` | Legacy verify |
| `/u/[username]` | Public profile |

### Core public (`/[locale]`)

| Cluster | Routes |
|---------|--------|
| Home | `/` |
| Auth | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/onboarding` |
| User | `/dashboard`, `/profile`, `/learning-plans`, `/certificates` |
| AI Academy hub | `/ai-academy`, `/courses`, `/courses/[slug]`, `/courses/[slug]/lessons/[i]`, `/tools`, `/tools/[slug]`, `/prompts`, `/glossary`, `/projects`, `/projects/[slug]`, `/projects/[slug]/build`, `/paths`, `/challenges`, `/leaderboard` |
| AI Studio tools | `/mentor`, `/prompt-studio`, `/prompt-score`, `/prompt-battle`, `/claude-code-generator`, `/tool-recommender`, `/compare-tools`, `/roadmap-generator`, `/project-generator`, `/claude` |
| Portals | `/language`, `/language/assessment`, `/history`, `/results`, `/verify/[certId]`, `/digital-exams`, `/digital-exams/[subject]`, `/mixed`, `/library`, `/history`, `/career`, `/career/*`, `/automation`, `/automation/*`, `/iot-lab`, `/iot-lab/*`, `/nano-banana-prompts`, `/cloud`, `/coming-soon` |
| Content | `/blog`, `/blog/[slug]`, `/automation-glossary` |
| Legal | `/about`, `/contact`, `/privacy`, `/terms` |
| System | `/search`, `/admin`, `/not-found` |

## Navigation coverage matrix

| Route | Navbar | Footer | Landing | Portal hub |
|-------|:------:|:------:|:-------:|:----------:|
| `/ai-academy` | Portals | Portals | Grid+Map | — |
| `/cloud` | — | — | — | — |
| `/tools` | Main | More | — | AI Academy |
| `/prompts` | — | — | — | AI Academy |
| `/paths` | Main | — | — | — |
| `/mentor` | AI Studio | AI Studio | Map+Showcase | — |
| `/automation-glossary` | — | — | — | — |
| `/nano-banana-prompts` | AI Studio+Portals | Portals | Grid | — |

## Admin tab → public surface map

| Admin tab | Public routes served |
|-----------|---------------------|
| `ai-courses-cms` | `/courses/*` |
| `ai-tools-cms` | `/tools/*` |
| `ai-prompts-cms` | `/prompts` |
| `ai-glossary` | `/glossary` |
| `automation-cms` | `/automation/*` |
| `iot-cms` | `/iot-lab/*` |
| `exams-cms` | `/digital-exams/*` |
| `draft-preview` | **None** (preview only) |
| `blog` | `/blog/*` |
| `nano-banana` | `/nano-banana-prompts` |

## Sitemap vs nav gaps

`sitemap.ts` includes `/cloud`, some private routes (`/language/history` with noindex conflict per prior audit).

## Orphan route count

**18** top-level routes without navbar/footer/landing inbound link (see `dead-pages-and-dead-links-audit.md`).
