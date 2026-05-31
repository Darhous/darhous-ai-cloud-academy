# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 4.1.0 — Portal Integration Release |
| **Status** | ✅ Fully Live — Supabase v3 DEPLOYED — Resend ✅ — Vercel ✅ |
| **Build** | ✅ Clean build — 0 TypeScript errors — 0 lint errors |
| **Last Commit** | `3f88632` — v4.1.0 Language Portal + Digital Exams full integration |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Vercel Env Vars** | https://vercel.com/darhous-projects/darhous-ai-cloud-academy/settings/environment-variables |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Supabase Project ID** | `kzbdmyovspkbakbtvgig` |
| **Branch** | `main` |
| **Last Updated** | 2026-05-31 (v4.1.0) |

---

## ⚡ Quick-Start for Next Session

```
Continue the Darhous Smart Learning Ecosystem project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md before any changes.
Current version: v4.0.0
Build: ✅ Clean — 0 errors — Live on Vercel
Last commit: a64d693 — Ecosystem v4.0.0 transformation
```

---

## ✅ Everything Completed & Deployed (as of v4.0.0)

### v4.1.0 — Portal Integration — DONE ✅

| File | What It Does |
|------|-------------|
| `src/data/language-questions.json` | 150 English assessment questions (stages 1-10, all difficulties) |
| `src/data/digital-exam-subjects.ts` | 7 exam subjects × 20 questions each (140 total) |
| `src/components/language/LanguageAssessmentClient.tsx` | Full exam engine: adaptive stages, 90s timer, anti-cheat, CEFR scoring |
| `src/components/language/LanguageResultsClient.tsx` | Results: CEFR badge, skill breakdown, stage chart, resources |
| `src/components/exams/DigitalExamClient.tsx` | 20-question exam client: 60s timer, per-question feedback, review |
| `src/app/[locale]/language/assessment/page.tsx` | Assessment entry page (auth-gated) |
| `src/app/[locale]/language/results/page.tsx` | Results page (fetches from Supabase by ID) |
| `src/app/[locale]/digital-exams/[subject]/page.tsx` | Subject exam page (7 subjects, static params) |
| `src/app/api/language/submit/route.ts` | POST: save language result to Supabase |
| `src/app/api/language/results/route.ts` | GET: user's language history |
| `src/app/api/exams/submit/route.ts` | POST: save digital exam result |
| `src/app/api/exams/results/route.ts` | GET: user's exam history |
| `src/app/api/email/welcome/route.ts` | POST: sends bilingual welcome email via Resend |
| `supabase/v4_portal_schema.sql` | SQL migration — language_results + digital_exam_results tables |
| `src/components/dashboard/StudentDashboardClient.tsx` | Updated: My Portals now shows CEFR level + exam % |
| `src/components/auth/RegisterForm.tsx` | Updated: triggers welcome email on signup |
| `src/app/[locale]/language/page.tsx` | Updated: CTA links to /assessment (integration complete) |
| `src/app/[locale]/digital-exams/page.tsx` | Updated: category cards are clickable links |

⚠️ **REQUIRED ACTION**: Run `supabase/v4_portal_schema.sql` in Supabase Dashboard → SQL Editor (Project: kzbdmyovspkbakbtvgig) to create the two new tables.

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

### v4.1 tables (SQL written, ⚠️ NOT YET RUN — run supabase/v4_portal_schema.sql)
language_results (id, user_id, score, level, time_taken, stages_completed, is_incomplete, breakdown jsonb)
digital_exam_results (id, user_id, subject, subject_label, score, total, percentage, passed, time_taken, answers jsonb)

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
- [ ] **⚠️ Run Supabase migration** — Execute `supabase/v4_portal_schema.sql` in Supabase Dashboard SQL Editor

### Priority 2 — Email & Engagement
- [x] **Welcome email** — /api/email/welcome fires on signup (RegisterForm updated) ✅
- [ ] **Day-3 re-engagement email** — Supabase Edge Function or cron: check last_sign_in_at, send if 3+ days inactive

### Priority 3 — AI Academy Features
- [ ] **Dark/light theme toggle UI** — `user_preferences` table ready in DB, just needs the toggle button wired up
- [ ] **Challenge points → Leaderboard** — Wire `challenge_submissions.score` to leaderboard point totals
- [ ] **RAG Mentor** — Enable pgvector in Supabase + populate `content_index` table (plan exists in RAG_MENTOR_PLAN.md)

### Priority 4 — Testing
- [ ] Test certificate issuance end-to-end (complete course → /certificates → issue → verify URL)
- [ ] Test public profile at `/u/[username]`
- [ ] Test avatar upload in /profile
- [ ] Test challenge submission in /challenges

### Priority 5 — V5 Future Portals
- [ ] Career & CV Portal — CV Builder, ATS Analyzer, Cover Letters, Job Matching, App Tracker
- [ ] Automation Academy — Paths, Workflow Builder, Template Marketplace
- [ ] Arduino & IoT Lab — Projects, Circuits, Simulators

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
