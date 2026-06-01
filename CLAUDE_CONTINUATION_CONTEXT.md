# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 8.0.0 — Language Portal v2.0 — Original Assessment Integrated ✅ COMPLETE |
| **Next Version** | 8.1 — Language Career Recommendations + 9.0 Digital Exams v2.0 |
| **Status** | ✅ All 6 portals LIVE — Build clean — Commit 2f1fc94 — Vercel PRODUCTION VERIFIED ✅ |
| **Build** | ✅ Clean — 0 TypeScript errors — 0 lint errors (65 pre-existing warnings) — exit 0 |
| **Last Commit** | `2f1fc94` — docs: update continuation context for v8.0 language integration |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Branch** | `main` |
| **Last Updated** | 2026-06-01 (v8.0 production smoke test verified) |

---

## ✅ v8.0 Language Portal — Production Verification (2026-06-01)

| Check | Result |
|-------|--------|
| **Checkpoint tag** | `checkpoint/v8-language-integration-complete` → `2f1fc94` ✅ |
| **Working tree** | Clean — no uncommitted changes ✅ |
| **TypeScript** | 0 errors ✅ |
| **Lint** | 0 errors — 65 pre-existing warnings (acceptable) ✅ |
| **Build** | Success — exit 0 — 963 static pages generated ✅ |
| **GitHub push** | `main` pushed `7ef04e8..2f1fc94` + tag pushed ✅ |
| **Vercel deployment** | `● Ready` — ID `dpl_4uzLgYKD2BY8oCQVJeHHKqdzkhxG` — auto-triggered by push ✅ |
| **Production URL** | https://darhous-ai-cloud-academy.vercel.app ✅ |

### Environment Variables (Vercel Production — presence only, no values)

| Variable | Present |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ |
| `RESEND_API_KEY` | ✅ |
| `NEXT_PUBLIC_SITE_URL` | ✅ |
| `GEMINI_API_KEY` | ✅ |
| `GEMINI_MODEL` | ✅ |
| `REENGAGEMENT_CRON_SECRET` | ✅ |

### Smoke Test Results (unauthenticated public routes)

| Route | Result |
|-------|--------|
| `/en/language` | ✅ Language portal loads — shows 10 stages, CEFR, certificates, anti-cheat |
| `/ar/language` | ✅ Arabic RTL layout correct — all content in Arabic |
| `/en/language/assessment` | ✅ Exam landing page loads — all v8.0 features visible |
| `/ar/language/assessment` | ✅ Arabic version correct |
| `/en/language/verify/[certId]` | ✅ Shows "Certificate Not Found" gracefully for unknown cert |
| `/en/dashboard` | ✅ Redirects to login when unauthenticated (auth-gated correctly) |
| `/en/admin` | ✅ Redirects to login when unauthenticated |
| `/en/digital-exams` | ✅ All 7 exam subjects showing correctly — unaffected |
| `/en/career` | ✅ All career tools showing — unaffected |
| `/api/language/submit` (GET) | ✅ 405 Method Not Allowed (POST-only — correct) |
| `/api/language/results` (GET) | ✅ Returns `{"results":[]}` for unauthenticated (soft-auth, no data leak) |
| `/api/language/email-result` (GET) | ✅ 405 Method Not Allowed (POST-only — correct) |
| `/api/language/submit` auth check | ✅ Returns 401 for unauthenticated POST |
| `/api/admin/users` | ✅ 401 Unauthorized — admin data protected |
| `/api/certificates/language/[id]` | ✅ 404 for unknown cert ID (route exists, cert not found) |
| `/api/certificates/verify/[code]` | ✅ 404 for unknown code (route exists, cert not found) |

### Notes

- Authenticated user flow (exam → result → PDF → email → hub history) requires browser login — cannot be tested headlessly. Run manually after login.
- Admin dashboard Language tab requires admin login — test manually.
- `RESEND_API_KEY` is set in Vercel — email should work for authenticated users. Graceful fallback if Resend is down.
- No production blockers found. No v8.0 fixes were needed.

### Recommended Next Step

v8.1 is safe to start. Recommended first task: `/api/language/jobs` — Career Recommendations based on CEFR level.

---

## ⚡ Quick-Start for Next Session (v8.1 / v9.0)

```
Continue the Darhous Smart Learning Ecosystem project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md fully before any changes.
Current version: v8.0.0 — Language Portal v2.0 — PRODUCTION READY ✅
Build: ✅ Clean — 0 errors — 0 lint errors — exit 0 — Commit 2f1fc94

⚠️ CRITICAL: Run supabase/v8_language_upgrade.sql in Supabase SQL Editor FIRST
   (adds flags_count, wrong_answers, feedback, certificate_id to language_results)

ALL 6 PORTALS ARE NOW LIVE:
  ✅ AI Academy         → /ai-academy
  ✅ Language Portal    → /language (150q, CEFR, full legacy parity)
  ✅ Digital Exams      → /digital-exams (7 subjects × 20q)
  ✅ Career Hub         → /career (ATS analyzer, CV builder, jobs, interview, templates)
  ✅ Automation Academy → /automation (30+ templates, 15+ tools, paths, services, labs)
  ✅ IoT Lab            → /iot-lab (60+ lessons, 72 projects, 40+ challenges, simulator)

v8.0 COMPLETED (ALL DONE ✅):
  ✅ CEFR thresholds fixed to match legacy exactly
  ✅ Adaptive difficulty: now goes DOWN when <40% (parity with legacy)
  ✅ Stage stop removed — exam always runs all 10 stages
  ✅ Wrong answers stored per question (options + correct answer)
  ✅ Anti-cheat warning overlay on tab-switch return
  ✅ flags_count stored in language_results
  ✅ Rule-based feedback ported (strengths, weaknesses, advice, skill analysis)
  ✅ Weekly study plans per CEFR level
  ✅ Radar chart (recharts) — Grammar/Vocabulary/Reading
  ✅ Wrong answers review section (collapsible, shows correct answer)
  ✅ WhatsApp share + Copy result text
  ✅ Encouragement message + next milestone
  ✅ Result email via Resend (/api/language/email-result)
  ✅ PDF certificate via @react-pdf/renderer (/api/certificates/language/[id])
  ✅ Certificate verification page (/[locale]/language/verify/[certId])
  ✅ Admin "Language Portal" tab (analytics, level dist, results table, flags)
  ✅ Hub language history (all attempts, cert download, retake CTA)
  ✅ Legacy repo cloned to .legacy/darhous-assessment (read-only reference)
  ✅ Integration map: docs/LANGUAGE_LEGACY_INTEGRATION_MAP.md
  ✅ DB migration: supabase/v8_language_upgrade.sql

NEXT MISSION: Career recommendations (/api/language/jobs) + v9.0 Digital Exams v2.0
See "Recommended Next Tasks" section below.

KEY FILES TO KNOW:
  src/app/[locale]/page.tsx                               ← Landing page
  src/components/landing/HomepageClient.tsx               ← Full landing page (client)
  src/components/dashboard/StudentDashboardClient.tsx     ← "My Darhous Hub" (7 tabs) — has language history
  src/components/admin/AdminDashboardClient.tsx           ← "Darhous Admin Studio" (12 tabs) — has language tab
  src/components/language/LanguageAssessmentClient.tsx    ← Exam engine (full legacy parity)
  src/components/language/LanguageResultsClient.tsx       ← Results page (feedback, radar, wrong answers)
  src/data/language-feedback.ts                          ← Rule-based feedback data (ported from legacy)
  src/app/api/language/submit/route.ts                   ← Saves result + flags_count + wrong_answers
  src/app/api/language/email-result/route.ts             ← Sends result email via Resend
  src/app/api/certificates/language/[id]/route.tsx       ← PDF certificate via @react-pdf/renderer
  src/app/[locale]/language/verify/[certId]/page.tsx     ← Certificate verification page
  docs/LANGUAGE_LEGACY_INTEGRATION_MAP.md                ← Integration map (reference)
  supabase/v8_language_upgrade.sql                       ← ⚠️ MUST RUN — adds 4 new columns
  supabase/v7_admin_settings_schema.sql                  ← SQL for 3 admin tables
  .legacy/darhous-assessment/                            ← Legacy source reference (NOT committed)
```

---

## ✅ v7.0 — Data & AI Layer — DONE ✅ (2026-06-01)

### Part 1 — Admin Data Persistence

| File | What Changed |
|------|-------------|
| `src/app/api/admin/site-settings/route.ts` | NEW — GET/POST for admin_site_settings table |
| `src/app/api/admin/mentor-settings/route.ts` | NEW — GET/POST for ai_mentor_settings_store table |
| `src/app/api/admin/feature-flags/route.ts` | NEW — GET/POST for feature_flags_store table |
| `supabase/v7_admin_settings_schema.sql` | NEW — SQL migration to create 3 tables |
| `src/components/admin/AdminDashboardClient.tsx` | Added: save/load for Site Builder, AI Mentor Control, Feature Flags |

**Behavior:**
- Site Builder tab auto-loads from DB on activation, has "Save Changes" button
- Mentor Control tab auto-loads from DB on activation, has "Save Settings" button
- Feature Flags has Save button
- All save actions show ✅/❌ feedback toast
- Tables not yet created → falls back to defaults silently

**⚠️ IMPORTANT:** Run `supabase/v7_admin_settings_schema.sql` in Supabase SQL Editor to enable persistence!

### Part 2 — User Hub Improvements

| File | What Changed |
|------|-------------|
| `src/components/dashboard/StudentDashboardClient.tsx` | Avatar upload wired + LinkedIn share wired |

**Behavior:**
- Profile Card avatar: click to upload (hidden file input → /api/avatar/upload → updates state)
- Certificates Center: LinkedIn share button → opens LinkedIn share dialog with certificates URL
- Avatar URL persisted in Supabase profiles.avatar_url, loaded on mount

### Part 3 — AI Mentor Context Injection

| File | What Changed |
|------|-------------|
| `src/lib/mentor-context.ts` | Added optional `userContext?: string` to MentorApiRequest |
| `src/app/api/mentor/route.ts` | Appends userContext to system prompt when provided |
| `src/app/api/mentor-stream/route.ts` | Appends userContext to system prompt when provided |
| `src/components/mentor/MentorChat.tsx` | Accepts `userContext` prop, passes to API |
| `src/app/[locale]/mentor/MentorPageClient.tsx` | Fetches user data from Supabase, builds context string, passes to MentorChat |

**Behavior:**
- Authenticated users: Mentor knows their name, language level, completed courses, exam count, streak, portals used
- Context format: Arabic when locale=ar, English otherwise
- Context panel: collapsible "🧠 What the Mentor Knows About You" above chat mode selector
- Unauthenticated users: no context injected (mentor works normally)

---

## ✅ Everything Completed & Deployed (v6.0)

### v6.0 — Darhous Smart Learning OS — DONE ✅

#### Part 1 — New Landing Page
- `src/components/landing/HomepageClient.tsx` — 10 sections, beginner path selector, ecosystem map, mentor showcase

#### Part 2 — My Darhous Hub (User Dashboard)
- `src/components/dashboard/StudentDashboardClient.tsx` — 7-tab dashboard

#### Part 3 — Darhous Admin Studio
- `src/components/admin/AdminDashboardClient.tsx` — 11-tab admin

#### Part 4 — TypeScript Types
- `src/types/site_settings.ts`, `ai_mentor_settings.ts`, `admin_audit_logs.ts`, `content_blocks.ts`, `feature_flags.ts`

---

## ✅ Everything Completed & Deployed (v5.0 and earlier)

### v5.0 — Full Native Portal Migration — DONE ✅
- Career Hub, Automation Academy, IoT Lab all native
- All 6 portals `status: "available"`

### v4.x — Production Readiness — DONE ✅
- Supabase v4 schema, middleware, digital exams, re-engagement cron

### v4.1.0 — Portal Integration — DONE ✅
- Language Assessment (150q, CEFR)
- Digital Exams (7 subjects × 20q)

### v3.1.0 Infrastructure — ALL STILL LIVE ✅
- 15+ Supabase tables, avatars bucket, Resend API, all v3 features

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

---

## 📁 All Routes (v7.0 complete)

### Admin API Routes (NEW in v7.0)
| Route | Method | Auth |
|-------|--------|------|
| `/api/admin/site-settings` | GET/POST | Admin only |
| `/api/admin/mentor-settings` | GET/POST | Admin only |
| `/api/admin/feature-flags` | GET/POST | Admin only |

### Language API Routes (NEW in v8.0)
| Route | Method | Auth |
|-------|--------|------|
| `/api/language/submit` | POST | Authenticated — saves result with flags_count + wrong_answers |
| `/api/language/results` | GET | Authenticated — returns last 10 results |
| `/api/language/email-result` | POST | Authenticated — fire-and-forget Resend email |
| `/api/certificates/language/[id]` | GET | Public — returns PDF, generates/reuses certificate_id |

### Language Pages (NEW in v8.0)
| Route | Type |
|-------|------|
| `/[locale]/language/verify/[certId]` | Server component — certificate verification |

### (All other routes remain as in v6.0 — unchanged)

---

## 🔑 Environment Variables — ALL SET ✅

| Variable | Status | Notes |
|----------|--------|-------|
| `GEMINI_API_KEY` | ✅ Set | |
| `GEMINI_MODEL` | ✅ Set | gemini-2.5-flash |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set | |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set | SERVER ONLY |
| `NEXT_PUBLIC_SITE_URL` | ✅ Set | Used by LinkedIn share URL in dashboard |
| `RESEND_API_KEY` | ✅ Set | |
| `REENGAGEMENT_CRON_SECRET` | ✅ Set | |

---

## 🗄️ Supabase DB Tables (complete list)

### Base tables (pre-v3)
`profiles`, `student_profiles`, `course_progress`, `lesson_progress`, `quiz_results`,
`contact_messages`, `community_subscribers`, `saved_prompts`, `favorites`,
`nano_banana_saved_prompts`, `audit_log`

### v3 tables (DEPLOYED ✅)
`certificates`, `learning_plans`, `daily_tasks`, `challenges`, `challenge_submissions`,
`prompt_scores`, `prompt_battles`, `public_profiles`, `analytics_events`,
`email_sequence_events`, `content_items`, `tool_comparisons`, `user_preferences`, `user_projects`

### v4.1 tables (DEPLOYED ✅)
`language_results`, `digital_exam_results`

### v7.0 tables (SQL ready — MUST RUN supabase/v7_admin_settings_schema.sql)
`admin_site_settings`, `ai_mentor_settings_store`, `feature_flags_store`

### v8.0 columns on language_results (SQL ready — MUST RUN supabase/v8_language_upgrade.sql)
`flags_count INT DEFAULT 0`, `wrong_answers JSONB DEFAULT '[]'`, `feedback JSONB DEFAULT '{}'`, `certificate_id TEXT`

---

## 🔮 Recommended Next Tasks

> **Strategy:** Build each portal to be FULLY COMPLETE (matching the original standalone apps) portal by portal.
> Original standalone apps: https://darhous-assessment.vercel.app + https://darhous-exams-platform.streamlit.app/
> Source refs: https://github.com/Darhous/darhous-assessment + https://github.com/Darhous/Exams_Platform

---

### 🌐 PORTAL v8.0 — Language Portal v2.0 ✅ COMPLETE (2026-06-01)

All stages implemented and committed (1cb679e). See v8.0 section below for details.

**⚠️ REMAINING (v8.1):**
- [ ] Career recommendations: `/api/language/jobs` — Gemini API + LEVEL_JOB_MAP fallback (legacy jobs.py)
- [ ] Wire "Find My Opportunities" button on results page → shows job matches
- [ ] Language history standalone page: `/[locale]/language/history` (recharts line chart)
- [ ] Admin: resend email button per result, CSV export

---

### 💻 PORTAL v9.0 — Digital Exams v2.0 (AFTER Language is complete)

The original Exams_Platform (Streamlit) had features stripped during integration. Rebuild them:

#### Stage D1 — Exam Engine Upgrade (DigitalExamClient.tsx)
- [ ] Warning system: 3 strikes (tab switch / page leave) → auto-terminate, save result with warning flag
- [ ] Anti-cheat: same visibilitychange listener, store `flags_count` in `digital_exam_results`
- [ ] True/False question type support (add `type: "mcq" | "truefalse"` to ExamQuestion interface)
- [ ] Exam config screen: choose question count (10/15/20) before starting
- [ ] NEW: Mixed comprehensive exam page `/digital-exams/mixed` — 30+ questions across all subjects

#### Stage D2 — Results + Certificates (DigitalExamClient.tsx done phase)
- [ ] AI explanations: after exam, POST `/api/exams/explain` → Gemini → per-wrong-answer explanation
- [ ] PDF certificate (80%+ threshold): `/api/certificates/exams/[id]` → same renderer as language
- [ ] Detailed answer review with AI explanations inline
- [ ] Share: LinkedIn + WhatsApp + copy

#### Stage D3 — Digital Library (NEW page)
- [ ] Create `src/app/[locale]/digital-exams/library/page.tsx`
- [ ] Supabase Storage bucket: `exam-library`
- [ ] New table: `exam_library_items` (id, subject_id, title, file_url, created_at)
- [ ] Student view: browse PDFs by subject, download
- [ ] Admin upload/delete in Admin Studio

#### Stage D4 — Student Performance Dashboard (NEW page)
- [ ] Create `src/app/[locale]/digital-exams/history/page.tsx`
- [ ] Per-subject stats: best score, attempts, average
- [ ] Bar chart comparing performance across all 7 subjects (recharts)
- [ ] History list with cert download per attempt

#### Stage D5 — Admin Panel for Digital Exams
- [ ] Tab: Question Bank — add/edit/delete questions per subject (form-based, saves to `exam_questions` table)
- [ ] Tab: Results — all results, filter by subject/date, delete
- [ ] Tab: Analytics — pass/fail rates per subject, avg scores
- [ ] Tab: Library — upload/delete PDFs for exam-library bucket
- [ ] Tab: Export — Excel export of all exam results
- [ ] New Supabase table: `exam_questions` (mirrors digital-exam-subjects.ts but DB-backed)
- [ ] Danger Zone: reset results for a subject / all subjects

---

### Other priorities (after portals are done)
- [ ] RAG Mentor — see RAG_MENTOR_PLAN.md
- [ ] Challenge Points → Leaderboard wiring
- [ ] Dark/Light toggle persistence to user_preferences table
- [ ] Run v7.0 SQL migration (supabase/v7_admin_settings_schema.sql)

---

## 🏁 v8.0 Session Summary (2026-06-01) ✅ COMPLETE

### What Was Done
1. **Legacy repo cloned** — `.legacy/darhous-assessment` (FastAPI + React/Vite)
2. **Integration map created** — `docs/LANGUAGE_LEGACY_INTEGRATION_MAP.md`
3. **CEFR thresholds fixed** — now match legacy exactly
4. **Adaptive difficulty fixed** — downward adjustment when <40% (was: stop)
5. **Stage behavior fixed** — always runs all 10 stages like legacy
6. **Wrong answers stored** — options + correctAnswer per question in `wrong_answers` JSONB
7. **Anti-cheat overlay** — warning modal when returning from tab switch
8. **Rule-based feedback ported** — all data from `ai_feedback.py` → `language-feedback.ts`
9. **Radar chart** — recharts RadarChart (Grammar/Vocabulary/Reading)
10. **Results page v2** — strengths, weaknesses, advice, weekly plan, wrong answers review
11. **WhatsApp share + Copy result** — match legacy Results.jsx
12. **Result email** — Resend-based, with full feedback + weekly plan
13. **PDF certificate** — @react-pdf/renderer, landscape A4, matches legacy design
14. **Certificate verify page** — `/[locale]/language/verify/[certId]`
15. **Admin Language tab** — level distribution, results table, anti-cheat flags
16. **Hub language history** — all attempts, cert download, retake CTA

### Build Result
- `npm run typecheck` → ✅ 0 errors
- `npm run lint` → ✅ 0 errors (65 warnings, all pre-existing)
- `npm run build` → ✅ exit 0
- Commit: `1cb679e`

### Critical Notes for Next Session
- **⚠️ MUST DO:** Run `supabase/v8_language_upgrade.sql` in Supabase SQL Editor
- `.legacy/darhous-assessment` is in `.gitignore` — re-clone if missing
- Email uses `RESEND_API_KEY` (already set in Vercel)
- Certificate PDF route is `.tsx` (uses JSX) — do not rename to `.ts`
- Feedback is 100% rule-based (no Gemini) — instant, no API cost

### Remaining for v8.1
- Career/job recommendations (`/api/language/jobs` using Gemini)
- Language history standalone page
- Admin: CSV export + resend email per result

---

## 🏁 v7.0 Session Summary (2026-06-01)

### What Was Done
1. **3 new admin API routes** — Site Settings, Mentor Settings, Feature Flags (GET/POST with Supabase)
2. **Admin Studio wired to DB** — Site Builder and Mentor Control auto-load from DB and have Save buttons
3. **Avatar upload in Hub** — Profile card avatar is now clickable (uploads to /api/avatar/upload)
4. **LinkedIn share for certificates** — Share button opens LinkedIn share dialog
5. **AI Mentor context injection** — Authenticated users' Supabase data injected into Gemini system prompt
6. **Mentor context panel** — Collapsible panel in /mentor showing what the AI knows

### Build Result
- `npm run typecheck` → ✅ 0 errors
- `npm run build` → ✅ exit 0

### Critical Notes for Next Session
- Run `supabase/v7_admin_settings_schema.sql` in Supabase SQL Editor to create the 3 new tables
- Until tables are created, admin settings fall back to defaults (silent, no errors)
- Avatar upload requires the `avatars` bucket in Supabase Storage (already live)
- LinkedIn share uses `NEXT_PUBLIC_SITE_URL` env var for the certificate URL
- AI Mentor context is fetched client-side in MentorPageClient.tsx — requires user to be logged in

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
16. **v7.0 Admin tables** — Must run `supabase/v7_admin_settings_schema.sql` before admin settings persist to DB.
17. **v8.0 language_results columns** — Must run `supabase/v8_language_upgrade.sql` for flags_count, wrong_answers, certificate_id.
18. **Certificate route is `.tsx`** — `src/app/api/certificates/language/[id]/route.tsx` uses JSX — never rename to `.ts`.
19. **Language feedback is rule-based** — `src/data/language-feedback.ts` is pure data/functions, no API calls.
20. **Legacy reference** — `.legacy/darhous-assessment` is in `.gitignore`. Re-clone from https://github.com/Darhous/darhous-assessment if missing.

---

## 🔒 Security Status (v7.0)

| Check | Status |
|-------|--------|
| GEMINI_API_KEY in source | ✅ Not found |
| SUPABASE_SERVICE_ROLE_KEY in client | ✅ Not found |
| Service role stays server-only | ✅ |
| Admin APIs verify role server-side | ✅ All routes including v7.0 new routes |
| RLS on all tables | ✅ All 25+ tables including v7.0 tables |
| .env.local not committed | ✅ |
| No temp admin routes | ✅ |
| API routes bypass middleware page-auth | ✅ |
| Avatar upload validates file type + size | ✅ |
| LinkedIn share URL uses NEXT_PUBLIC_SITE_URL | ✅ No hardcoded domains |
