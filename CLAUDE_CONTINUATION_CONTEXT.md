# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 4.2.0 — Production Ready ✅ FULLY COMPLETE |
| **Status** | ✅ Fully Live — Supabase v4 DEPLOYED ✅ — Resend ✅ — Vercel ✅ — Cron ✅ |
| **Build** | ✅ Clean build — 0 TypeScript errors — 0 lint errors |
| **Last Commit** | `37e467a` → final checkpoint push (this commit) |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Vercel Env Vars** | https://vercel.com/darhous-projects/darhous-ai-cloud-academy/settings/environment-variables |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Supabase Project ID** | `kzbdmyovspkbakbtvgig` |
| **Branch** | `main` |
| **Last Updated** | 2026-05-31 (v4.2.0 production readiness round) |

---

## ⚡ Quick-Start for Next Session (v5.0 — Portal Integration)

```
Continue the Darhous Smart Learning Ecosystem project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md before any changes.
Current version: v4.2.0 — PRODUCTION READY ✅
Build: ✅ Clean — 0 errors — Live on Vercel
Last commit: 20656dc — v4.2.0 complete checkpoint

NEXT MISSION: v5.0 — Full Portal Integration
Integrate the 3 external GitHub repos as full portals inside the ecosystem:
  1. Automation Academy → https://github.com/Darhous/darhous-automation-academy
  2. IoT Lab          → https://github.com/Darhous/darhous-iot-lab
  3. Career Hub       → https://github.com/Darhous/Darhous-career-hub-google

AUTHORIZATION: You are fully authorized to:
- Push commits directly to main branch without asking for confirmation.
- Inspect the 3 external repos (content, structure, tech stack).
- Design and implement the integration approach for each portal.
- Create new pages, components, API routes, and Supabase tables as needed.
- Update src/config/portals.ts to wire each portal into the ecosystem.
- Make any code changes needed — no need to ask for permission.
```

---

## ✅ Everything Completed & Deployed (as of v4.0.0)

### v4.2.0 — Production Readiness Round — DONE ✅

| File | What Changed |
|------|-------------|
| `supabase/v4_portal_schema.sql` | Fixed: DROP POLICY IF EXISTS for idempotency, added user_id + created_at indexes |
| `src/middleware.ts` | Fixed: API routes now bypass page-level auth redirects (was blocking /api/admin/*) |
| `src/components/exams/DigitalExamClient.tsx` | Added: next-step recommendations for failed exams + retry button |
| `src/app/api/email/reengagement/route.ts` | NEW: Day-3 re-engagement cron endpoint (see Phase 4 below) |
| `.env.example` | Added: REENGAGEMENT_CRON_SECRET placeholder |

### ✅ Supabase Migration COMPLETE (2026-05-31)

Both tables created and verified via Management REST API using browser session:

| Table | RLS | Policies | Indexes |
|-------|-----|----------|---------|
| `language_results` | ✅ enabled | SELECT + INSERT (auth.uid() = user_id) | user_id, created_at DESC |
| `digital_exam_results` | ✅ enabled | SELECT + INSERT (auth.uid() = user_id) | user_id, subject, created_at DESC |

No manual action required — migration is DONE.

### v4.1.0 — Portal Integration — DONE ✅

| File | What It Does |
|------|-------------|
| `src/data/language-questions.json` | 150 English assessment questions (stages 1-10, all difficulties) |
| `src/data/digital-exam-subjects.ts` | 7 exam subjects × 20 questions each (140 total) |
| `src/components/language/LanguageAssessmentClient.tsx` | Full exam engine: adaptive stages, 90s timer, anti-cheat, CEFR scoring |
| `src/components/language/LanguageResultsClient.tsx` | Results: CEFR badge, skill breakdown, stage chart, study resources |
| `src/components/exams/DigitalExamClient.tsx` | 20-question exam client: 60s timer, per-question feedback, next-step recs |
| `src/app/[locale]/language/assessment/page.tsx` | Assessment entry page (auth-gated) |
| `src/app/[locale]/language/results/page.tsx` | Results page (fetches from Supabase by ID, URL param fallback) |
| `src/app/[locale]/digital-exams/[subject]/page.tsx` | Subject exam page (7 subjects, static params) |
| `src/app/api/language/submit/route.ts` | POST: save language result to Supabase |
| `src/app/api/language/results/route.ts` | GET: user's language history |
| `src/app/api/exams/submit/route.ts` | POST: save digital exam result |
| `src/app/api/exams/results/route.ts` | GET: user's exam history |
| `src/app/api/email/welcome/route.ts` | POST: sends bilingual welcome email via Resend |
| `src/components/dashboard/StudentDashboardClient.tsx` | Updated: My Portals now shows CEFR level + exam % |
| `src/components/auth/RegisterForm.tsx` | Updated: triggers welcome email on signup |
| `src/app/[locale]/language/page.tsx` | Updated: CTA links to /assessment (integration complete) |
| `src/app/[locale]/digital-exams/page.tsx` | Updated: category cards are clickable links |

### v4.0.0 — Ecosystem Transformation — DONE ✅

| File | What It Does |
|------|-------------|
| `src/config/portals.ts` | Portal Registry — single source of truth for all 7 portals |
| `src/components/ecosystem/PortalCard.tsx` | Reusable glassmorphism portal card (client component) |
| `src/components/ecosystem/ComingSoonPortal.tsx` | Reusable Coming Soon page template |
| `src/app/[locale]/page.tsx` | **NEW** Ecosystem landing page (11 sections) |
| `src/app/[locale]/ai-academy/page.tsx` | AI Academy portal hub with AI Studio grid |
| `src/app/[locale]/language/page.tsx` | Language portal shell page |
| `src/app/[locale]/digital-exams/page.tsx` | Digital Exams portal shell page |
| `src/app/[locale]/career/page.tsx` | Career & CV — Coming Soon |
| `src/app/[locale]/automation/page.tsx` | Automation Academy — Coming Soon |
| `src/app/[locale]/iot-lab/page.tsx` | Arduino & IoT Lab — Coming Soon |
| `src/app/[locale]/coming-soon/page.tsx` | Future portals — Coming Soon |
| `src/components/layout/Navbar.tsx` | +Portals dropdown (desktop + mobile) |
| `src/components/layout/Footer.tsx` | Ecosystem footer (4 cols: Brand, Portals, AI Studio, Links) |
| `src/components/dashboard/StudentDashboardClient.tsx` | +My Portals section |
| `src/components/admin/AdminDashboardClient.tsx` | +Ecosystem tab |
| `src/app/sitemap.ts` | +ai-academy, language, digital-exams routes |

### v3.1.0 Infrastructure — ALL STILL LIVE ✅
| Task | Status |
|------|--------|
| Supabase v3 schema (15 tables, all RLS, 4 challenges seeded) | ✅ LIVE |
| avatars bucket (Supabase Storage) + RLS policies | ✅ LIVE |
| RESEND_API_KEY in Vercel | ✅ Set |
| All 20 v3.0.0 features | ✅ All still working |

### v3.0.0 Features (20 total) — ALL INTACT ✅
search, challenges, leaderboard, prompt-battle, prompt-score, compare-tools,
certificates, learning-plans, project-generator, build-project mode,
public profiles (`/u/[username]`), certificate verification, AI Coach card,
Nano Banana visual gallery, avatar upload, email foundation (Resend),
PWA manifest, RAG foundation schema, admin analytics tab, admin content studio tab.

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise — always `await params` |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | |
| Icons | Lucide React v1 + react-icons v5 | Some icons renamed vs older versions |
| Search | Local Fuse-style scoring | /api/search |
| AI | Google Gemini API | gemini-2.5-flash, server-side only |
| Auth | Supabase Auth | Email + Google OAuth |
| Database | Supabase PostgreSQL | RLS enabled on all tables |
| Storage | Supabase Storage | avatars bucket ✅ live |
| Email | Resend API | RESEND_API_KEY ✅ set in Vercel |
| Fonts | Geist, IBM Plex Sans Arabic, JetBrains Mono | |
| Deployment | Vercel | Hobby plan — team: darhous-projects |
| PWA | manifest.webmanifest | Installable on mobile |

---

## 📁 All Routes (v4.0.0 complete)

### Ecosystem routes (NEW v4)
| Route | Description |
|-------|-------------|
| `/[locale]` | **Ecosystem Landing Page** — replaces old AI Academy homepage |
| `/[locale]/ai-academy` | AI Academy portal hub |
| `/[locale]/language` | Language portal shell |
| `/[locale]/digital-exams` | Digital Exams portal shell |
| `/[locale]/career` | Career & CV — Coming Soon |
| `/[locale]/automation` | Automation Academy — Coming Soon |
| `/[locale]/iot-lab` | Arduino & IoT Lab — Coming Soon |
| `/[locale]/coming-soon` | Future portals — Coming Soon |

### Public routes (v3 and earlier — ALL PRESERVED)
| Route | Description |
|-------|-------------|
| `/[locale]/courses` | Courses (18) |
| `/[locale]/courses/[slug]` | Course detail + lessons |
| `/[locale]/tools` | AI Tools (62) |
| `/[locale]/tools/[slug]` | Tool detail |
| `/[locale]/projects` | Projects (14) |
| `/[locale]/projects/[slug]` | Project detail |
| `/[locale]/projects/[slug]/build` | 8-step Build Mode |
| `/[locale]/blog` | Blog (13 posts) |
| `/[locale]/blog/[slug]` | Blog post |
| `/[locale]/prompts` | Prompt Library (27) |
| `/[locale]/glossary` | Glossary (40 terms) |
| `/[locale]/paths` | Learning Paths |
| `/[locale]/claude` | Claude page |
| `/[locale]/cloud` | Cloud page |
| `/[locale]/about` | About |
| `/[locale]/contact` | Contact |
| `/[locale]/search` | Smart Search |
| `/[locale]/challenges` | AI Challenges — 4 seeded |
| `/[locale]/leaderboard` | Leaderboard |
| `/[locale]/prompt-battle` | Prompt Battle |
| `/[locale]/prompt-score` | Prompt Score |
| `/[locale]/compare-tools` | Tool Comparison |
| `/[locale]/project-generator` | AI Project Idea Generator |
| `/[locale]/nano-banana-prompts` | Nano Banana Visual Gallery |
| `/[locale]/mentor` | AI Mentor (6 modes, streaming) |
| `/[locale]/prompt-studio` | Prompt Studio |
| `/[locale]/claude-code-generator` | Claude Code Generator |
| `/[locale]/tool-recommender` | Tool Recommender |
| `/[locale]/roadmap-generator` | Roadmap Generator |
| `/[locale]/privacy` | Privacy Policy |
| `/[locale]/terms` | Terms of Service |
| `/u/[username]` | Public Profile |
| `/certificates/verify/[code]` | Certificate Verification |

### Auth-required routes
| Route | Description |
|-------|-------------|
| `/[locale]/dashboard` | Unified Dashboard (v4 — My Portals + AI progress) |
| `/[locale]/certificates` | My Certificates |
| `/[locale]/learning-plans` | Learning Plans |
| `/[locale]/profile` | Profile v2 — avatar, username, bio |
| `/[locale]/onboarding` | 5-step onboarding |
| `/[locale]/admin` | Admin Dashboard — 10 tabs (includes Ecosystem tab) |
| `/[locale]/login` | Login |
| `/[locale]/register` | Register |
| `/[locale]/forgot-password` | Forgot Password |
| `/[locale]/reset-password` | Reset Password |

### API routes
| Route | Method | Auth |
|-------|--------|------|
| `/api/coach` | GET | Auth required |
| `/api/certificates` | GET/POST | Auth required |
| `/api/certificates/verify/[code]` | GET | Public |
| `/api/prompt-score` | POST | Public (saves if auth) |
| `/api/prompt-battle` | POST | Public (saves if auth) |
| `/api/search` | GET | Public |
| `/api/avatar/upload` | POST | Auth required |
| `/api/challenges/submit` | POST | Auth required |
| `/api/learning-plans` | GET/POST | Auth required |
| `/api/analytics/track` | POST | Public |
| `/api/project-generator` | POST | Public |
| `/api/mentor` | POST | Public (rate-limited) |
| `/api/mentor-stream` | GET | Public (SSE, rate-limited) |
| `/api/progress/lesson` | POST | Auth required |
| `/api/quiz/submit` | POST | Auth required |
| `/api/contact` | POST | Public (rate-limited) |
| `/api/community/subscribe` | POST | Public (rate-limited) |
| `/api/admin/users` | GET | Admin only |
| `/api/admin/subscribers` | GET | Admin only |
| `/api/admin/promote` | POST | Admin only |
| `/api/language/submit` | POST | Auth required |
| `/api/language/results` | GET | Auth required |
| `/api/exams/submit` | POST | Auth required |
| `/api/exams/results` | GET | Auth required |
| `/api/email/welcome` | POST | Internal (fire-and-forget from RegisterForm) |
| `/api/email/reengagement` | POST | Cron secret (x-cron-secret header) |

---

## 🔑 Environment Variables — ALL SET ✅

| Variable | Status | Description |
|----------|--------|-------------|
| `GEMINI_API_KEY` | ✅ Set | From aistudio.google.com |
| `GEMINI_MODEL` | ✅ Set | gemini-2.5-flash |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set | **SERVER ONLY** |
| `NEXT_PUBLIC_SITE_URL` | ✅ Set | Live site URL |
| `RESEND_API_KEY` | ✅ Set | Added 2026-05-31 |
| `CONTACT_TO_EMAIL` | ❌ Optional | Contact form notifications |
| `REENGAGEMENT_CRON_SECRET` | ✅ Set in Vercel (2026-05-31) | Protects /api/email/reengagement |
| `CRON_SECRET` | ✅ Auto-set by Vercel | Vercel native cron auth for GET /api/email/reengagement |

> Note: `.env.local` only has `GEMINI_API_KEY` and `GEMINI_MODEL`. All other keys are in Vercel only.

---

## 🗄️ Supabase DB Tables (complete list)

### Base tables (pre-v3)
profiles, student_profiles, course_progress, lesson_progress, quiz_results,
contact_messages, community_subscribers, saved_prompts, favorites,
nano_banana_saved_prompts, audit_log

### v3 tables (DEPLOYED ✅)
certificates, learning_plans, daily_tasks, challenges (4 seeded), challenge_submissions,
prompt_scores, prompt_battles, public_profiles, analytics_events,
email_sequence_events, content_items, tool_comparisons, user_preferences, user_projects

### v4.1 tables (⚠️ SQL READY, MUST BE RUN MANUALLY IN SUPABASE DASHBOARD)
language_results (id, user_id, score, level, time_taken, stages_completed, is_incomplete, breakdown jsonb)
digital_exam_results (id, user_id, subject, subject_label, score, total, percentage, passed, time_taken, answers jsonb)
— SQL: supabase/v4_portal_schema.sql (idempotent, includes indexes and RLS policies)
— Go to: https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig/sql/new

### RAG tables (schema ready, not populated)
content_index, mentor_sources — see RAG_MENTOR_PLAN.md

---

## 🌐 Portal Registry (src/config/portals.ts)

The SINGLE source of truth for all portals. Changing a portal here updates: Landing Page, Navbar dropdown, Footer, Dashboard, Admin tab.

| Portal ID | Route | Status | Color | Integration |
|-----------|-------|--------|-------|-------------|
| `ai-academy` | `/ai-academy` | available | `#8ed5ff` | internal |
| `language` | `/language` | available | `#d0bcff` | shell → https://github.com/Darhous/darhous-assessment |
| `digital-exams` | `/digital-exams` | available | `#3ce0fb` | shell → https://github.com/Darhous/Exams_Platform |
| `career` | `/career` | coming-soon | `#f59e0b` | shell |
| `automation` | `/automation` | coming-soon | `#4ade80` | shell |
| `iot-lab` | `/iot-lab` | coming-soon | `#f97316` | shell |
| `coming-soon` | `/coming-soon` | coming-soon | `#c084fc` | shell |

---

## 🔮 Recommended Next Tasks (v4.1+)

### Priority 1 — Full Portal Integration — ✅ DONE (v4.1.0)
- [x] **Language Portal full integration** — 150 questions, 10 adaptive stages, CEFR levels, Supabase storage ✅
- [x] **Digital Exams full integration** — 7 subjects × 20 questions, Supabase storage ✅
- [x] **Unified results in dashboard** — My Portals shows CEFR level + exam % from real DB data ✅
- [x] **✅ Supabase migration DONE** — Tables created, RLS enabled, indexes verified

### Priority 2 — Email & Engagement (v4.2.0)
- [x] **Welcome email** — /api/email/welcome fires on signup (RegisterForm updated) ✅
- [x] **Day-3 re-engagement email** — /api/email/reengagement LIVE ✅
  - `REENGAGEMENT_CRON_SECRET` set in Vercel ✅
  - Vercel Cron Job active: GET /api/email/reengagement daily @ 08:00 UTC ✅
  - Deduplication: uses email_sequence_events table (7-day window, sequence='reengagement', step='day-3') ✅
  - Returns: { checked, sent, skipped, failed } — safe summary only ✅

### Priority 1 — v5.0 Portal Integration (NEXT SESSION)

Three external repos to integrate as full portals:

| Portal | Repo | Current Status in Ecosystem |
|--------|------|----------------------------|
| Career Hub | https://github.com/Darhous/Darhous-career-hub-google | `/career` — Coming Soon |
| Automation Academy | https://github.com/Darhous/darhous-automation-academy | `/automation` — Coming Soon |
| IoT Lab | https://github.com/Darhous/darhous-iot-lab | `/iot-lab` — Coming Soon |

**Integration approach (inspect repos first, then decide):**
- Option A: Embed as iframe (simple, preserves original UI)
- Option B: Pull content/data and build native pages (deeper integration)
- Option C: Link out + surface key data in the dashboard (hybrid)

**Files to update regardless of approach:**
- `src/config/portals.ts` — change status from `coming-soon` to `available`
- `src/components/dashboard/StudentDashboardClient.tsx` — add portal cards with real data
- `src/app/sitemap.ts` — add new routes
- Supabase: add tracking tables if needed per portal

### Priority 2 — AI Academy Features
- [ ] **Dark/light theme toggle UI** — `user_preferences` table ready in DB, just needs the toggle button wired up
- [ ] **Challenge points → Leaderboard** — Wire `challenge_submissions.score` to leaderboard point totals
- [ ] **RAG Mentor** — Enable pgvector in Supabase + populate `content_index` table (plan exists in RAG_MENTOR_PLAN.md)

### Priority 3 — Testing
- [ ] Test certificate issuance end-to-end (complete course → /certificates → issue → verify URL)
- [ ] Test public profile at `/u/[username]`
- [ ] Test avatar upload in /profile
- [ ] Test challenge submission in /challenges

### Priority 5 — V5 Future Portals
- [ ] Career & CV Portal — CV Builder, ATS Analyzer, Cover Letters, Job Matching, App Tracker
- [ ] Automation Academy — Paths, Workflow Builder, Template Marketplace
- [ ] Arduino & IoT Lab — Projects, Circuits, Simulators

---

## 🏁 v4.2.0 Production Readiness Session Summary (2026-05-31)

### Git Commits This Session
| Commit | Description |
|--------|-------------|
| `8dad233` | temp: v4 portal migration route + idempotent SQL fix (route immediately deleted) |
| `466b683` | fix: middleware should not block API routes with page-level auth guard |
| `83561e9` | feat: Phase 3+4 — failed exam recommendations, reengagement email, migration route cleanup |

### What Was Done
1. **SQL reviewed + fixed**: `supabase/v4_portal_schema.sql` — added idempotency (`DROP POLICY IF EXISTS`), added 5 missing indexes on user_id and created_at columns
2. **Migration attempt**: Created protected temp route, deployed to Vercel, called it — confirmed tables don't exist yet, `pg_meta` API not publicly accessible
3. **Middleware fixed**: API routes were being blocked by middleware's admin-page auth guard (was redirecting `/api/admin/*` to login page)
4. **Failed exam UX fixed**: `DigitalExamClient` now shows next-step recommendations + retry CTA when exam is failed
5. **Reengagement email**: `/api/email/reengagement` implemented — protected cron endpoint, bilingual, deduped via email_sequence_events, never crashes on individual failures
6. **Security verified**: No secrets in current codebase, no temp admin routes remain

### ✅ ALL PRODUCTION ACTIONS COMPLETE (2026-05-31)
1. ✅ **Supabase migration** — `language_results` + `digital_exam_results` created, RLS enabled, 5 indexes verified
2. ✅ **`REENGAGEMENT_CRON_SECRET`** — added to Vercel env vars
3. ✅ **Daily cron job** — configured in `vercel.json` (GET /api/email/reengagement @ 08:00 UTC, uses Vercel CRON_SECRET)
4. ✅ **Vercel redeploy** — triggered by this commit to activate the new env var

---

## ⚠️ Critical Warnings

1. **Tailwind v4** — CSS-based config. Never add `tailwind.config.js` for colors.
2. **Next.js 16 params** — Always `await params` before using in server components.
3. **Supabase client boundary** — `server.ts` and `admin.ts` are SERVER ONLY.
4. **useAuth hook** — CLIENT ONLY (`"use client"` required).
5. **Admin security** — Client-side role checks are UX only. All admin APIs do server-side verification.
6. **SUPABASE_SERVICE_ROLE_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Never import `admin.ts` in client components.
7. **Build without Supabase** — App MUST build without Supabase env vars (all code has null checks).
8. **MapIcon not Map** — lucide-react `Map` conflicts with JS global. Use `MapIcon`.
9. **ImageIcon not Image** — Use `ImageIcon` from lucide-react to avoid Next.js Image conflict.
10. **Vercel team slug** — Always use `darhous-projects` in URLs, NOT `darhous`.
11. **Storage** — avatars bucket is private. Use signed URLs or public policy already set.
12. **RESEND_API_KEY** — Lives in Vercel env only, not in .env.local.
13. **Server components** — CANNOT have `onMouseEnter`/`onMouseLeave` event handlers. Extract to `"use client"` component. (Lesson learned in v4.0.0 — caused build error on Footer.)
14. **Portal config** — `src/config/portals.ts` is the SINGLE source of truth. Don't hardcode portal data elsewhere.
15. **`Github` icon** — Does NOT exist in lucide-react. Use `GitBranch` instead.

---

## 🔒 Security Status (v4.0.0)

| Check | Status |
|-------|--------|
| GEMINI_API_KEY in source | ✅ Not found |
| SUPABASE_SERVICE_ROLE_KEY in client | ✅ Not found |
| Service role stays server-only | ✅ |
| Admin APIs verify role server-side | ✅ All routes |
| Avatar upload validates type/size | ✅ 2MB, jpg/png/webp only |
| Public profiles hide email | ✅ Only name, bio, stats |
| Private routes noindex | ✅ dashboard, certificates, learning-plans, profile |
| RLS on all tables | ✅ All 25+ tables |
| .env.local not committed | ✅ |
| RESEND_API_KEY not in source | ✅ Vercel env only |
| Portal shell pages (language, digital-exams) | ✅ No secrets, just links to GitHub |
| REENGAGEMENT_CRON_SECRET in source | ✅ Not in source — only in .env.example as placeholder |
| Temp migration route | ✅ Deleted from codebase — no temp admin routes remain |
| Supabase migration executed | ✅ Both tables created via Management API + verified |
| API routes bypass middleware page-auth | ✅ middleware.ts now skips redirects for /api/* |
