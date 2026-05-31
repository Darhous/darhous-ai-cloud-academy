# 🤖 Claude Continuation Context — Darhous AI Cloud Academy

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 4.0.0 — Darhous Smart Learning Ecosystem |
| **Status** | ✅ Fully Live — Supabase v3 DEPLOYED — Resend ✅ — Vercel ✅ |
| **Build** | ✅ Clean build — 0 TypeScript errors — Portal Ecosystem implemented |
| **Last Commit** | `v4.0.0` — Ecosystem transformation: landing page, portal routes, nav, footer |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Vercel Env Vars** | https://vercel.com/darhous-projects/darhous-ai-cloud-academy/settings/environment-variables |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Supabase Project ID** | `kzbdmyovspkbakbtvgig` |
| **Branch** | `main` |
| **Last Updated** | 2026-05-31 |

---

## ⚡ Quick-Start for Next Session

```
Continue the Darhous AI Cloud Academy project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md before any changes.
Current version: v4.0.0
Build: ✅ Clean build — 0 TS errors — Ecosystem implemented
Last commit: v4.0.0 — Darhous Smart Learning Ecosystem transformation
```

---

## ✅ Everything Completed & Deployed (as of v4.0.0)

### v4.0.0 — Darhous Smart Learning Ecosystem — DONE ✅
| Task | Status |
|------|--------|
| `src/config/portals.ts` Portal Registry | ✅ 7 portals, config-driven, single source of truth |
| `src/components/ecosystem/PortalCard.tsx` | ✅ Reusable glassmorphism portal card |
| `src/components/ecosystem/ComingSoonPortal.tsx` | ✅ Reusable Coming Soon page template |
| New Ecosystem Landing Page (`/[locale]`) | ✅ 11 sections — Hero, Portal Grid, Unified Account, Journey, Available, Coming Soon, Why, Dashboard Preview, CTA |
| AI Academy Hub (`/[locale]/ai-academy`) | ✅ Portal entry with AI Studio grid, courses, tools, projects |
| Language Portal (`/[locale]/language`) | ✅ Shell page — links to GitHub repo, integration notes |
| Digital Exams Portal (`/[locale]/digital-exams`) | ✅ Shell page — exam categories, integration notes |
| Career & CV (`/[locale]/career`) | ✅ Coming Soon with planned features |
| Automation Academy (`/[locale]/automation`) | ✅ Coming Soon |
| Arduino & IoT Lab (`/[locale]/iot-lab`) | ✅ Coming Soon |
| General Coming Soon (`/[locale]/coming-soon`) | ✅ Future portals page |
| Navbar — Portals dropdown | ✅ Desktop + mobile accordion, all 7 portals |
| Footer — Ecosystem redesign | ✅ 4 columns: Brand, Portals, AI Studio, Links + social signature |
| Dashboard — My Portals section | ✅ Ecosystem portal cards with progress placeholders |
| Admin — Ecosystem tab | ✅ Portal status overview + roadmap V1/V2 |
| Sitemap — new portal routes | ✅ ai-academy, language, digital-exams added |

### v3.1.0 + v3.0.0 Features — ALL STILL INTACT ✅
All previous features (courses, tools, challenges, certificates, leaderboard, dashboard, admin, etc.) are preserved and accessible via `/[locale]/ai-academy` and existing routes.

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise — always `await params` |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | |
| Icons | Lucide React v1 + react-icons | Some icons renamed vs older versions |
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

## 📁 All Routes (v4.0.0 — Ecosystem complete)

### Public routes
| Route | Description |
|-------|-------------|
| `/[locale]` | Home page |
| `/[locale]/courses` | Courses (18) |
| `/[locale]/courses/[slug]` | Course detail + lessons |
| `/[locale]/tools` | AI Tools (62) |
| `/[locale]/tools/[slug]` | Tool detail |
| `/[locale]/projects` | Projects (14) |
| `/[locale]/projects/[slug]` | Project detail |
| `/[locale]/projects/[slug]/build` | 8-step Build Mode (NEW v3) |
| `/[locale]/blog` | Blog (13 posts) |
| `/[locale]/blog/[slug]` | Blog post |
| `/[locale]/prompts` | Prompt Library (27) |
| `/[locale]/glossary` | Glossary (40 terms) |
| `/[locale]/paths` | Learning Paths |
| `/[locale]/claude` | Claude page |
| `/[locale]/cloud` | Cloud page |
| `/[locale]/about` | About |
| `/[locale]/contact` | Contact |
| `/[locale]/search` | Smart Search (NEW v3) |
| `/[locale]/challenges` | AI Challenges — 4 seeded (NEW v3) |
| `/[locale]/leaderboard` | Leaderboard — opt-in (NEW v3) |
| `/[locale]/prompt-battle` | Prompt Battle (NEW v3) |
| `/[locale]/prompt-score` | Prompt Score (NEW v3) |
| `/[locale]/compare-tools` | Tool Comparison 2-4 side-by-side (NEW v3) |
| `/[locale]/project-generator` | AI Project Idea Generator (NEW v3) |
| `/[locale]/nano-banana-prompts` | Nano Banana Visual Gallery Pro |
| `/[locale]/ai-academy` | AI Academy Portal Hub (NEW v4) |
| `/[locale]/language` | Language Portal shell (NEW v4) |
| `/[locale]/digital-exams` | Digital Exams Portal shell (NEW v4) |
| `/[locale]/career` | Career & CV — Coming Soon (NEW v4) |
| `/[locale]/automation` | Automation Academy — Coming Soon (NEW v4) |
| `/[locale]/iot-lab` | Arduino & IoT Lab — Coming Soon (NEW v4) |
| `/[locale]/coming-soon` | Future Portals — Coming Soon (NEW v4) |
| `/[locale]/mentor` | AI Mentor (6 modes, streaming) |
| `/[locale]/prompt-studio` | Prompt Studio |
| `/[locale]/claude-code-generator` | Claude Code Generator |
| `/[locale]/tool-recommender` | Tool Recommender |
| `/[locale]/roadmap-generator` | Roadmap Generator |
| `/[locale]/privacy` | Privacy Policy |
| `/[locale]/terms` | Terms of Service |
| `/u/[username]` | Public Profile — is_public=true only (NEW v3) |
| `/certificates/verify/[code]` | Certificate Verification (NEW v3) |

### Auth-required routes (private/noindex)
| Route | Description |
|-------|-------------|
| `/[locale]/dashboard` | AI Learning OS Dashboard |
| `/[locale]/certificates` | My Certificates — issue/print/share (NEW v3) |
| `/[locale]/learning-plans` | Learning Plans (NEW v3) |
| `/[locale]/profile` | Profile v2 — avatar upload, username, bio |
| `/[locale]/onboarding` | 5-step onboarding |
| `/[locale]/admin` | Admin Dashboard — 7 tabs |
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

### RAG tables (schema ready, not populated)
content_index, mentor_sources — see RAG_MENTOR_PLAN.md

---

## 🔮 Recommended Next Tasks (v4.1+)

### V4 Ecosystem — Next Steps
- [ ] **Deploy to Vercel** — push commit + trigger redeploy
- [ ] **Full integration of Language Portal** — embed `darhous-assessment` repo inside the project OR use iframe + SSO token
- [ ] **Full integration of Digital Exams** — embed `Exams_Platform` repo OR use iframe + SSO token
- [ ] **Unified dashboard results** — write quiz results from Language + Exams portals to Supabase and show in dashboard
- [ ] **Email sequences** — Day-3 re-engagement + Welcome email (Resend configured ✅)
- [ ] **Welcome email** — Send on signup via Supabase auth hook + Resend
- [ ] **Dark/light theme toggle** — user_preferences table ready, just needs UI
- [ ] **Challenge points → Leaderboard** — wire challenge submissions to point totals
- [ ] **More blog posts** — currently 13, target 20+

### V4 AI Academy — From Previous
- [ ] Test certificate issuance end-to-end
- [ ] Test public profile at `/u/[username]`
- [ ] Test avatar upload in /profile
- [ ] Test challenge submission in /challenges

### V5 Future Portals (next major version)
- [ ] Career & CV Portal — CV Builder, ATS Analyzer, Cover Letters, Job Matching
- [ ] Automation Academy — Workflow Builder, Template Marketplace
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

---

## 🔒 Security Status (v3.1.0)

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
