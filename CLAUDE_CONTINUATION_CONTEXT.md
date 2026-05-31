# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 6.0.0 — Darhous Smart Learning OS ✅ COMPLETE |
| **Status** | ✅ All 6 portals LIVE — Build clean — Pushed to Vercel |
| **Build** | ✅ Clean — 0 TypeScript errors — 955 pages — exit 0 |
| **Last Commit** | `bab0c22` → feat: v6.0 — Darhous Smart Learning OS |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Vercel Env Vars** | https://vercel.com/darhous-projects/darhous-ai-cloud-academy/settings/environment-variables |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Supabase Project ID** | `kzbdmyovspkbakbtvgig` |
| **Branch** | `main` |
| **Last Updated** | 2026-06-01 (v6.0 — Smart Learning OS session) |

---

## ⚡ Quick-Start for Next Session (v7.0)

```
Continue the Darhous Smart Learning Ecosystem project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md fully before any changes.
Current version: v6.0.0 — PRODUCTION READY ✅
Build: ✅ Clean — 0 errors — 955 pages — Live on Vercel
Last commit: bab0c22 — feat: v6.0 — Darhous Smart Learning OS

ALL 6 PORTALS ARE NOW LIVE:
  ✅ AI Academy         → /ai-academy
  ✅ Language Portal    → /language (150q, CEFR)
  ✅ Digital Exams      → /digital-exams (7 subjects × 20q)
  ✅ Career Hub         → /career (ATS analyzer, CV builder, jobs, interview, templates)
  ✅ Automation Academy → /automation (30+ templates, 15+ tools, paths, services, labs)
  ✅ IoT Lab            → /iot-lab (60+ lessons, 72 projects, 40+ challenges, simulator)

v6.0 COMPLETED:
  ✅ Landing Page       → HomepageClient.tsx (10 sections, beginner path selector, ecosystem map, mentor showcase)
  ✅ My Darhous Hub     → StudentDashboardClient.tsx (7 tabs: Overview, Portals, Certificates, Activity, Mentor, Plan, Settings)
  ✅ Admin Studio       → AdminDashboardClient.tsx (11 tabs: Overview, Site Builder, Portals, Users, Certificates, Mentor Control, Content, Email, Analytics, Theme, Audit)
  ✅ TypeScript Types   → src/types/ (site_settings, content_blocks, admin_audit_logs, ai_mentor_settings, feature_flags)

NEXT MISSION: v7.0 — Data Persistence & AI Integration
See "Recommended Next Tasks" section below.

KEY FILES TO KNOW:
  src/app/[locale]/page.tsx                          ← Landing page (server, delegates to HomepageClient)
  src/components/landing/HomepageClient.tsx          ← Full landing page (client component, 630 lines)
  src/app/[locale]/dashboard/page.tsx               ← Dashboard page (server, auth guard)
  src/components/dashboard/StudentDashboardClient.tsx ← "My Darhous Hub" (7 tabs, client)
  src/app/[locale]/admin/page.tsx                   ← Admin page (server)
  src/components/admin/AdminDashboardClient.tsx      ← "Darhous Admin Studio" (11 tabs, client)
  src/components/layout/Footer.tsx                  ← Footer (preserve — already correct)
  src/config/portals.ts                             ← SINGLE source of truth for portals
  src/types/                                        ← New v6.0 TypeScript types
  src/lib/gemini.ts                                 ← Gemini helper (callGemini)
  src/lib/supabase/                                 ← client.ts (client), server.ts (server), admin.ts (server-only)
```

---

## ✅ Everything Completed (v6.0 — 2026-06-01)

### v6.0 — Darhous Smart Learning OS — DONE ✅

#### Part 1 — New Landing Page

| File | What Changed |
|------|-------------|
| `src/app/[locale]/page.tsx` | Slimmed to metadata + `<HomepageClient locale={locale} />` |
| `src/components/landing/HomepageClient.tsx` | NEW — full "use client" landing with 10 sections |

**Landing Page Sections:**
1. **Hero** — 3 beginner CTAs: "أنا مبتدئ وعايز أبدأ", "مهارة محددة", "تطوير الشغل" — each scrolls to selector
2. **Beginner Path Selector** — "مش عارف تبدأ منين؟" — 4 questions (level × goal × dailyTime × interest) → weekly plan reveal
3. **Stats** — existing component
4. **Ecosystem Map** — AI Mentor center card + 6 portal cards in 3-column radial grid
5. **Portal Grid** — all portals using existing PortalCard component
6. **"رحلتك في 4 خطوات"** — 4-step journey: اختار هدفك → المرشد يبني خطة → اتعلم وطبّق → احصل على شهادة
7. **AI Mentor Showcase** — simulated chat with typewriter animation (useTypewriter hook)
8. **Why Darhous** — 8 feature cards
9. **Final CTA** — "ابدأ الآن… حتى لو لا تعرف من أين تبدأ"
10. **Community Signup** — existing component

**Framer Motion variants note:** `ease` must use bezier array `[0,0,0.2,1]` NOT string `"easeOut"` — Framer Motion 12 strict typing.

#### Part 2 — My Darhous Hub (User Dashboard)

| File | What Changed |
|------|-------------|
| `src/components/dashboard/StudentDashboardClient.tsx` | Full rewrite — 7-tab "My Darhous Hub" |

**Dashboard Tabs:**
| Tab | Content |
|-----|---------|
| Overview | Profile card (avatar initial, stats row, streak), "Continue Where You Left Off", stats cards, AI Coach, Quick Actions |
| My Portals | All 6 real portals with progress %, features chips, Open button |
| Certificates | 6 cert cards (locked/unlocked state), Download + LinkedIn Share buttons |
| Activity | Chronological event timeline from all portal interactions |
| AI Mentor | Context preview panel (what AI knows about user) + 3 quick-start cards |
| Learning Plan | Today / This Week / This Month roadmaps + course progress list |
| Settings | Links to profile, notifications, security, preferences + sign out |

**Data sources:**
- Supabase: `course_progress`, `quiz_results`, `saved_prompts`, `lesson_progress`, `language_results`, `digital_exam_results`
- Mock/typed: certificates (locked by progress logic), activity timeline, learning plan tasks

#### Part 3 — Darhous Admin Studio

| File | What Changed |
|------|-------------|
| `src/components/admin/AdminDashboardClient.tsx` | Full rewrite — 11-tab "Darhous Admin Studio" |

**Admin Tabs:**
| # | Tab | Content |
|---|-----|---------|
| 1 | Overview | User/subscriber/message/portal stats + system health |
| 2 | Site Builder | Hero content editor, section visibility toggles, CTA text editor, Feature Flags (local state) |
| 3 | Portal Manager | All portals: status, visibility toggle (Eye), external link |
| 4 | Users | Search/filter users, promote/demote, export CSV, subscribers list |
| 5 | Certificates Studio | 6 cert cards with View Template / Issue buttons |
| 6 | AI Mentor Control | Personality, tone, language selectors + system prompt editor (local state from defaultMentorSettings) |
| 7 | Content Studio | Content stats (courses/tools/projects/blog/prompts/nanabana) + contact messages |
| 8 | Email & Notifications | 4 email sequence cards (welcome, reengagement, certificate, weekly — status: active/planned) |
| 9 | Analytics | 4 stat cards + portal usage bars (mock data) |
| 10 | Theme & Branding | Color palette viewer, social links, footer signature display |
| 11 | Security & Audit | Audit log from Supabase + security checklist |

**Important:** Site Builder and AI Mentor Control use **local state only** — not yet persisted to DB.

#### Part 4 — TypeScript Types

| File | Types |
|------|-------|
| `src/types/site_settings.ts` | `SiteSettings`, `defaultSiteSettings` |
| `src/types/content_blocks.ts` | `ContentBlock`, `ContentBlockType` |
| `src/types/admin_audit_logs.ts` | `AdminAuditLog`, `AuditAction` |
| `src/types/ai_mentor_settings.ts` | `AIMentorSettings`, `MentorTone`, `MentorPersonality`, `MentorLanguage`, `defaultMentorSettings` |
| `src/types/feature_flags.ts` | `FeatureFlag`, `defaultFeatureFlags` |

---

## ✅ Everything Completed & Deployed (v5.0 and earlier)

### v5.0 — Full Native Portal Migration — DONE ✅
- Career Hub (`/career`) — ATS CV Analyzer, 5-step CV Builder, Smart Jobs, Interview Prep, Templates
- Automation Academy (`/automation`) — 30+ templates, 15+ tools, paths, services, labs, automation agent
- IoT Lab (`/iot-lab`) — 60+ lessons, 72 projects, 40+ challenges, component library, Wokwi simulator, exams
- `src/config/portals.ts` — career/automation/iot-lab → `status: "available"`
- `package.json` — added `pdf-parse` and `@types/pdf-parse`

### v4.2.0 — Production Readiness — DONE ✅
- `supabase/v4_portal_schema.sql` — idempotent, indexes added
- `src/middleware.ts` — API routes bypass page-level auth guard
- `src/components/exams/DigitalExamClient.tsx` — next-step recommendations for failed exams
- `src/app/api/email/reengagement/route.ts` — Day-3 cron endpoint (LIVE: daily 08:00 UTC)

### v4.1.0 — Portal Integration — DONE ✅
- Language Assessment (150q, CEFR, adaptive stages, Supabase)
- Digital Exams (7 subjects × 20q, Supabase)
- Dashboard "My Portals" shows real CEFR + exam % data

### v4.0.0 — Ecosystem Transformation — DONE ✅
- Portal Registry (`src/config/portals.ts`) — single source of truth
- 6 portal pages, Navbar dropdown, Footer ecosystem links

### v3.1.0 Infrastructure — ALL STILL LIVE ✅
- Supabase v3 schema (15+ tables, all RLS, 4 challenges seeded)
- avatars bucket + RLS
- Resend API (RESEND_API_KEY in Vercel)
- All 20 v3.0.0 features (search, challenges, leaderboard, prompt-battle, certificates, etc.)

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise — always `await params` |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | Import: `import { motion } from "framer-motion"` NOT "motion/react" |
| Icons | Lucide React v1 + react-icons v5 | Some icons renamed vs older versions |
| AI | Google Gemini API | gemini-2.5-flash, server-side only |
| Auth | Supabase Auth | Email + Google OAuth |
| Database | Supabase PostgreSQL | RLS enabled on all tables |
| Storage | Supabase Storage | avatars bucket ✅ live |
| Email | Resend API | RESEND_API_KEY ✅ set in Vercel |
| Fonts | Geist, IBM Plex Sans Arabic, JetBrains Mono | |
| Deployment | Vercel | Hobby plan — team: darhous-projects |
| PWA | manifest.webmanifest | Installable on mobile |

---

## 📁 All Routes (v6.0 complete)

### Landing & Core
| Route | Description |
|-------|-------------|
| `/[locale]` | **Smart Learning OS Landing** (v6.0 — HomepageClient.tsx) |
| `/[locale]/dashboard` | **My Darhous Hub** (v6.0 — 7-tab user dashboard) |
| `/[locale]/admin` | **Darhous Admin Studio** (v6.0 — 11-tab admin) |
| `/[locale]/mentor` | AI Mentor (6 modes, streaming) |

### Portal Routes (ALL LIVE)
| Route | Description |
|-------|-------------|
| `/[locale]/ai-academy` | AI Academy portal hub |
| `/[locale]/language` | Language portal — 150q, CEFR |
| `/[locale]/digital-exams` | Digital Exams — 7 subjects × 20q |
| `/[locale]/career` | Career Hub |
| `/[locale]/career/cv-analyzer` | ATS CV Analyzer (Gemini + pdf-parse) |
| `/[locale]/career/builder` | 5-step CV Builder |
| `/[locale]/career/jobs` | Smart Jobs Board |
| `/[locale]/career/interview` | Interview Prep + STAR AI |
| `/[locale]/career/templates` | CV Templates |
| `/[locale]/automation` | Automation Academy |
| `/[locale]/automation/templates` | 30+ Templates |
| `/[locale]/automation/tools` | 15+ Tools Explorer |
| `/[locale]/automation/paths` | Learning Paths |
| `/[locale]/automation/services` | 10 Service Packages |
| `/[locale]/automation/labs` | Practical Labs |
| `/[locale]/automation/automation-agent` | Automation Agent |
| `/[locale]/iot-lab` | IoT Lab |
| `/[locale]/iot-lab/paths` | Learning Paths |
| `/[locale]/iot-lab/lessons` | 60+ Lessons |
| `/[locale]/iot-lab/projects` | 72 Projects |
| `/[locale]/iot-lab/challenges` | 40+ Challenges |
| `/[locale]/iot-lab/component-library` | Components Library (NOT /components — App Router conflict) |
| `/[locale]/iot-lab/simulator` | Wokwi Simulator |
| `/[locale]/iot-lab/exams` | Interactive Exams |

### Other Public Routes (v3 and earlier — ALL PRESERVED)
| Route | Description |
|-------|-------------|
| `/[locale]/courses` | Courses (18) |
| `/[locale]/tools` | AI Tools (62) |
| `/[locale]/projects` | Projects (14) |
| `/[locale]/blog` | Blog (13 posts) |
| `/[locale]/prompts` | Prompt Library (27) |
| `/[locale]/glossary` | Glossary |
| `/[locale]/paths` | Learning Paths |
| `/[locale]/search` | Smart Search |
| `/[locale]/challenges` | AI Challenges |
| `/[locale]/leaderboard` | Leaderboard |
| `/[locale]/prompt-battle` | Prompt Battle |
| `/[locale]/prompt-score` | Prompt Score |
| `/[locale]/compare-tools` | Tool Comparison |
| `/[locale]/project-generator` | AI Project Generator |
| `/[locale]/nano-banana-prompts` | Nano Banana Gallery |
| `/[locale]/prompt-studio` | Prompt Studio |
| `/[locale]/claude-code-generator` | Claude Code Generator |
| `/[locale]/tool-recommender` | Tool Recommender |
| `/[locale]/roadmap-generator` | Roadmap Generator |
| `/[locale]/about` | About |
| `/[locale]/contact` | Contact |
| `/[locale]/privacy` | Privacy Policy |
| `/[locale]/terms` | Terms |
| `/[locale]/coming-soon` | Future portals |
| `/u/[username]` | Public Profile |
| `/certificates/verify/[code]` | Certificate Verification |

### Auth-Required Routes
| Route | Description |
|-------|-------------|
| `/[locale]/dashboard` | My Darhous Hub (v6.0) |
| `/[locale]/certificates` | My Certificates |
| `/[locale]/learning-plans` | Learning Plans |
| `/[locale]/profile` | Profile v2 |
| `/[locale]/onboarding` | 5-step onboarding |
| `/[locale]/admin` | Darhous Admin Studio (v6.0) |

### API Routes
| Route | Method | Auth |
|-------|--------|------|
| `/api/coach` | GET | Auth required |
| `/api/certificates` | GET/POST | Auth required |
| `/api/certificates/verify/[code]` | GET | Public |
| `/api/mentor` | POST | Public (rate-limited) |
| `/api/mentor-stream` | GET | Public (SSE) |
| `/api/search` | GET | Public |
| `/api/avatar/upload` | POST | Auth required |
| `/api/analytics/track` | POST | Public |
| `/api/project-generator` | POST | Public |
| `/api/language/submit` | POST | Auth required |
| `/api/language/results` | GET | Auth required |
| `/api/exams/submit` | POST | Auth required |
| `/api/exams/results` | GET | Auth required |
| `/api/career/upload-cv` | POST | Public (pdf-parse, Node runtime) |
| `/api/career/analyze-cv` | POST | Public (Gemini AI) |
| `/api/career/evaluate-interview` | POST | Public (Gemini AI) |
| `/api/email/welcome` | POST | Internal (fire-and-forget) |
| `/api/email/reengagement` | GET | Cron secret |
| `/api/admin/users` | GET | Admin only |
| `/api/admin/subscribers` | GET | Admin only |
| `/api/admin/promote` | POST | Admin only |

---

## 🔑 Environment Variables — ALL SET ✅

| Variable | Status | Description |
|----------|--------|-------------|
| `GEMINI_API_KEY` | ✅ Set | aistudio.google.com |
| `GEMINI_MODEL` | ✅ Set | gemini-2.5-flash |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set | **SERVER ONLY** |
| `NEXT_PUBLIC_SITE_URL` | ✅ Set | Live site URL |
| `RESEND_API_KEY` | ✅ Set | Resend email |
| `REENGAGEMENT_CRON_SECRET` | ✅ Set | Cron protection |
| `CRON_SECRET` | ✅ Auto-set by Vercel | Native cron auth |

> `.env.local` only has `GEMINI_API_KEY` and `GEMINI_MODEL`. All others are Vercel-only.

---

## 🗄️ Supabase DB Tables (complete list)

### Base tables (pre-v3)
`profiles`, `student_profiles`, `course_progress`, `lesson_progress`, `quiz_results`,
`contact_messages`, `community_subscribers`, `saved_prompts`, `favorites`,
`nano_banana_saved_prompts`, `audit_log`

### v3 tables (DEPLOYED ✅)
`certificates`, `learning_plans`, `daily_tasks`, `challenges` (4 seeded), `challenge_submissions`,
`prompt_scores`, `prompt_battles`, `public_profiles`, `analytics_events`,
`email_sequence_events`, `content_items`, `tool_comparisons`, `user_preferences`, `user_projects`

### v4.1 tables (DEPLOYED ✅)
`language_results` (id, user_id, score, level, time_taken, stages_completed, is_incomplete, breakdown jsonb)
`digital_exam_results` (id, user_id, subject, subject_label, score, total, percentage, passed, time_taken, answers jsonb)

### RAG tables (schema ready, not populated)
`content_index`, `mentor_sources` — see RAG_MENTOR_PLAN.md

### v7.0 planned tables (NOT YET CREATED)
`admin_site_settings` — store Site Builder content
`ai_mentor_settings` — store Mentor Control settings
`feature_flags` — store feature flag toggles per environment

---

## 🌐 Portal Registry (src/config/portals.ts)

Single source of truth. Changing a portal here updates: Landing Page, Navbar, Footer, Dashboard, Admin.

| Portal ID | Route | Status | Color |
|-----------|-------|--------|-------|
| `ai-academy` | `/ai-academy` | available | `#8ed5ff` |
| `language` | `/language` | available | `#d0bcff` |
| `digital-exams` | `/digital-exams` | available | `#3ce0fb` |
| `career` | `/career` | available | `#f59e0b` |
| `automation` | `/automation` | available | `#4ade80` |
| `iot-lab` | `/iot-lab` | available | `#f97316` |
| `coming-soon` | `/coming-soon` | coming-soon | `#c084fc` |

---

## 🔮 Recommended Next Tasks (v7.0)

### Priority 1 — Data Persistence for v6.0 Admin Features
- [ ] **Admin Site Builder → DB** — create `admin_site_settings` table in Supabase, wire Site Builder to save/load via API
- [ ] **AI Mentor Control → DB** — create `ai_mentor_settings` table, wire to `/api/admin/mentor-settings`
- [ ] **Feature Flags → DB** — create `feature_flags` table, wire toggle to API

### Priority 2 — User Hub Improvements
- [ ] **Avatar upload in Hub** — wire profile card avatar to existing `/api/avatar/upload`
- [ ] **Certificate download** — generate PDF server-side (use `@react-pdf/renderer` or puppeteer)
- [ ] **LinkedIn share** — open share dialog with certificate verification URL

### Priority 3 — AI Mentor Enhancement
- [ ] **Real context injection** — pass user's Supabase data (level, portals, progress) into Gemini system prompt
- [ ] **RAG Mentor** — enable pgvector in Supabase + populate `content_index` table (plan: RAG_MENTOR_PLAN.md)

### Priority 4 — Theme & Settings
- [ ] **Dark/light toggle** — `user_preferences` table is ready in DB — just needs the toggle button + CSS class swap
- [ ] **Challenge points → Leaderboard** — wire `challenge_submissions.score` to leaderboard point totals

### Priority 5 — Testing
- [ ] Test certificate issuance end-to-end
- [ ] Test public profile at `/u/[username]`
- [ ] Test avatar upload in /profile

---

## 🏁 v6.0 Session Summary (2026-06-01)

### Commit
`bab0c22` — feat: v6.0 — Darhous Smart Learning OS (landing, user hub, admin studio)
9 files changed, 2,325 insertions(+), 1,302 deletions(-)

### What Was Done
1. **Landing Page** — full rebuild via `HomepageClient.tsx` (client component, 10 sections, Framer Motion, RTL-first, beginner-friendly)
2. **My Darhous Hub** — `StudentDashboardClient.tsx` upgraded to 7-tab dashboard with profile card, portals progress, certificates center, activity timeline, AI Mentor context panel, smart learning plan, settings
3. **Darhous Admin Studio** — `AdminDashboardClient.tsx` upgraded to 11-tab admin with Site Builder, Portal Manager, AI Mentor Control, Email center, Analytics, Theme viewer, Audit log
4. **TypeScript Types** — 5 new type files in `src/types/`

### Build Result
- `npm run typecheck` → ✅ 0 errors
- `npm run build` → ✅ exit 0 — 955 pages generated — Turbopack 35s compile

### Critical Notes for Next Session
- `HomepageClient.tsx` uses Framer Motion `Variants` type — `ease` must be `[x,y,x,y]` array (NOT `"easeOut"` string — causes TS error in FM12)
- Site Builder + AI Mentor Control in Admin Studio currently use local state only — not persisted to DB
- `realPortals` in HomepageClient = `portals.filter(p => p.id !== "coming-soon")` (excludes placeholder)
- Dashboard hub tabs state is local — no URL routing for tabs (could add `?tab=portals` in future)

---

## ⚠️ Critical Warnings

1. **Tailwind v4** — CSS-based config. Never add `tailwind.config.js` for colors.
2. **Next.js 16 params** — Always `await params` before using in server components.
3. **Supabase client boundary** — `server.ts` and `admin.ts` are SERVER ONLY.
4. **useAuth hook** — CLIENT ONLY (`"use client"` required).
5. **Admin security** — Client-side role checks are UX only. All admin APIs do server-side verification.
6. **SUPABASE_SERVICE_ROLE_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Never import `admin.ts` in client components.
7. **Build without Supabase** — App MUST build without Supabase env vars (all code has null checks).
8. **MapIcon not Map** — lucide-react `Map` conflicts with JS global.
9. **ImageIcon not Image** — Use `ImageIcon` from lucide-react to avoid Next.js Image conflict.
10. **Vercel team slug** — Always use `darhous-projects` in URLs, NOT `darhous`.
11. **Server components** — CANNOT have `onMouseEnter`/`onMouseLeave`. Extract to `"use client"`.
12. **Portal config** — `src/config/portals.ts` is the SINGLE source of truth.
13. **`Github` icon** — Does NOT exist in lucide-react. Use `GitBranch` instead.
14. **Framer Motion ease** — In FM12, `ease` in Variants must be `[x,y,x,y]` bezier array, NOT string `"easeOut"`.
15. **pdf-parse** — Use `require()` not dynamic import `.default`.

---

## 🔒 Security Status (v6.0)

| Check | Status |
|-------|--------|
| GEMINI_API_KEY in source | ✅ Not found |
| SUPABASE_SERVICE_ROLE_KEY in client | ✅ Not found |
| Service role stays server-only | ✅ |
| Admin APIs verify role server-side | ✅ All routes |
| RLS on all tables | ✅ All 25+ tables |
| .env.local not committed | ✅ |
| No temp admin routes | ✅ |
| API routes bypass middleware page-auth | ✅ |
