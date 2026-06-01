# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 7.0.0 — Darhous Smart Learning OS — Data & AI Layer ✅ COMPLETE |
| **Next Version** | 8.0 — Language Portal v2.0 (Full Rebuild) — IN PLANNING |
| **Status** | ✅ All 6 portals LIVE — Build clean — Pushed to Vercel — Supabase migration done |
| **Build** | ✅ Clean — 0 TypeScript errors — 962 pages — exit 0 |
| **Last Commit** | `7ef04e8` — docs: checkpoint v7.0 FINAL |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Branch** | `main` |
| **Last Updated** | 2026-06-01 (v8.0 planning complete — ready to implement) |

---

## ⚡ Quick-Start for Next Session (v8.0)

```
Continue the Darhous Smart Learning Ecosystem project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md fully before any changes.
Current version: v7.0.0 — PRODUCTION READY ✅
Build: ✅ Clean — 0 errors — 962 pages — Live on Vercel

ALL 6 PORTALS ARE NOW LIVE:
  ✅ AI Academy         → /ai-academy
  ✅ Language Portal    → /language (150q, CEFR)
  ✅ Digital Exams      → /digital-exams (7 subjects × 20q)
  ✅ Career Hub         → /career (ATS analyzer, CV builder, jobs, interview, templates)
  ✅ Automation Academy → /automation (30+ templates, 15+ tools, paths, services, labs)
  ✅ IoT Lab            → /iot-lab (60+ lessons, 72 projects, 40+ challenges, simulator)

v7.0 COMPLETED (ALL DONE ✅ — including Supabase migration):
  ✅ Admin Site Builder → DB      → POST/GET /api/admin/site-settings
  ✅ Supabase migration DONE      → admin_site_settings, ai_mentor_settings_store, feature_flags_store created
  ✅ AI Mentor Control → DB       → POST/GET /api/admin/mentor-settings
  ✅ Feature Flags → DB           → POST/GET /api/admin/feature-flags
  ✅ Supabase migration           → supabase/v7_admin_settings_schema.sql (run in SQL Editor)
  ✅ Avatar upload in Hub         → click avatar in Profile Card → /api/avatar/upload
  ✅ LinkedIn share for certs     → shareToLinkedIn() → opens LinkedIn share dialog
  ✅ AI Mentor user context       → fetches Supabase data → injects into Gemini system prompt
  ✅ Mentor context panel         → collapsible panel in /mentor showing what AI knows

NEXT MISSION: v8.0 — Language Portal v2.0 (Full Feature Rebuild)
See "Recommended Next Tasks (v8.0)" section below.

KEY FILES TO KNOW:
  src/app/[locale]/page.tsx                          ← Landing page (server, delegates to HomepageClient)
  src/components/landing/HomepageClient.tsx          ← Full landing page (client component)
  src/app/[locale]/dashboard/page.tsx               ← Dashboard page (server, auth guard)
  src/components/dashboard/StudentDashboardClient.tsx ← "My Darhous Hub" (7 tabs, client)
  src/app/[locale]/admin/page.tsx                   ← Admin page (server)
  src/components/admin/AdminDashboardClient.tsx      ← "Darhous Admin Studio" (11 tabs, client)
  src/app/[locale]/mentor/MentorPageClient.tsx      ← Mentor page (fetches user context, passes to MentorChat)
  src/components/mentor/MentorChat.tsx              ← Chat component (accepts userContext prop)
  src/app/api/admin/site-settings/route.ts          ← NEW: Site Builder persistence
  src/app/api/admin/mentor-settings/route.ts        ← NEW: Mentor Control persistence
  src/app/api/admin/feature-flags/route.ts          ← NEW: Feature Flags persistence
  src/app/api/mentor/route.ts                       ← Mentor API (injects userContext into system prompt)
  src/app/api/mentor-stream/route.ts                ← Streaming mentor API (injects userContext)
  src/components/layout/Footer.tsx                  ← Footer (preserve — correct)
  src/config/portals.ts                             ← SINGLE source of truth for portals
  src/types/                                        ← TypeScript types
  src/lib/mentor-context.ts                         ← MentorApiRequest type (has userContext field)
  supabase/v7_admin_settings_schema.sql             ← NEW: SQL for 3 admin tables (must run in SQL Editor)
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
| `/api/admin/site-settings` | GET/POST | Admin only (GET returns defaults if table not yet created) |
| `/api/admin/mentor-settings` | GET/POST | Admin only |
| `/api/admin/feature-flags` | GET/POST | Admin only (GET public) |

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

---

## 🔮 Recommended Next Tasks (v8.0)

> **Strategy:** Build each portal to be FULLY COMPLETE (matching the original standalone apps) portal by portal.
> Original standalone apps: https://darhous-assessment.vercel.app + https://darhous-exams-platform.streamlit.app/
> Source refs: https://github.com/Darhous/darhous-assessment + https://github.com/Darhous/Exams_Platform

---

### 🌐 PORTAL v8.0 — Language Portal v2.0 (START HERE)

The original darhous-assessment had features stripped out during integration. Rebuild them:

#### Stage L1 — Exam Engine Upgrade (LanguageAssessmentClient.tsx)
- [ ] Timer: 90s countdown per question, color-coded bar (green→orange→red), auto-advance on timeout
- [ ] Anti-cheat: visibilitychange event listener, warn on tab-switch, store `flags_count` in result
- [ ] Navigation: skip + back/forward buttons, dot indicators (answered/skipped/unanswered)
- [ ] Pause functionality with warning overlay
- [ ] Per-stage summary screen: score %, next stage difficulty recommendation
- [ ] Add `flags_count` field to `language_results` table in Supabase

#### Stage L2 — Results Page v2 (LanguageResultsClient.tsx)
- [ ] Radar/Spider chart for Grammar + Vocabulary + Reading (use `recharts`)
- [ ] AI feedback: POST `/api/language/feedback` → Gemini → returns strengths, weaknesses, 3 tips
- [ ] Static weekly study plan per CEFR level (data object, not AI — instant load)
- [ ] Career opportunities list per CEFR level (static data)
- [ ] Wrong answers review section (show correct answer + explanation)
- [ ] Email results via Resend (call `/api/language/email-result` after save)
- [ ] Share: LinkedIn (existing) + WhatsApp deep link + Copy link button

#### Stage L3 — PDF Certificate (NEW route)
- [ ] Install `@react-pdf/renderer`
- [ ] Create `src/app/api/certificates/language/[id]/route.ts` → returns PDF
- [ ] Certificate design: name, CEFR level, date, certificate ID, Darhous logo
- [ ] Wire Download button on Results page
- [ ] Wire Download button in StudentDashboardClient.tsx (Certificates tab)

#### Stage L4 — User History Dashboard (NEW page)
- [ ] Create `src/app/[locale]/language/history/page.tsx`
- [ ] Stats cards: total attempts, best score, best level
- [ ] Line chart of score progression over time (recharts)
- [ ] Results list: each attempt with level, score, date, cert download
- [ ] Add link to it from StudentDashboardClient Certificates tab

#### Stage L5 — Admin Panel for Language Portal
- [ ] Add "language" tab to AdminDashboardClient.tsx (or new `/admin/language` section)
- [ ] Tab: Analytics — level distribution bar chart + category breakdown
- [ ] Tab: Results — all results table, filter by level/date, delete, resend email
- [ ] Tab: Flags — anti-cheat violations log (user, flags_count, date)
- [ ] CSV export of all language results
- [ ] New Supabase SQL: add `flags_count INT DEFAULT 0` to `language_results`

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

## 🏁 v8.0 Planning Session Summary (2026-06-01)

### What Was Analyzed
1. **Language Portal gap analysis** — compared darhous-assessment (full standalone) vs current /language in academy
2. **Digital Exams gap analysis** — compared Exams_Platform (Streamlit) vs current /digital-exams in academy
3. **Original standalone apps inspected:**
   - https://github.com/Darhous/darhous-assessment (React + Vite frontend, Python backend)
   - https://github.com/Darhous/Exams_Platform (Streamlit, 100% Python)

### Key Missing Features Identified
**Language Portal:** Timer, anti-cheat, radar chart, AI feedback, PDF cert, study plan, career matching, email results, user history dashboard, admin panel (6 tabs), leaderboard, wrong answers review
**Digital Exams:** Warning system, anti-cheat, AI explanations, PDF cert, mixed exam, digital library, student dashboard, admin question bank, Excel export, True/False question type

### Decision
Build portal-by-portal (complete each fully before moving on):
- v8.0 = Language Portal v2.0 (5 stages: L1→L5)
- v9.0 = Digital Exams v2.0 (5 stages: D1→D5)

### New Dependencies to Install for v8.0
- `@react-pdf/renderer` — PDF certificate generation
- `recharts` — radar chart + line chart + bar chart

### New DB Changes for v8.0
- Add `flags_count INT DEFAULT 0` to `language_results` table
- No new tables needed for L1/L2/L3/L4 — L5 (admin) may need minor additions

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
