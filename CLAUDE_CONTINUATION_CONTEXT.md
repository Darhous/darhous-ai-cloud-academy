# 🤖 Claude Continuation Context — Darhous AI Cloud Academy

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 3.0.0 — Global Platform Expansion — 20 Features |
| **Status** | ✅ Live on Vercel + Supabase + Google OAuth + All Features Active |
| **Build** | ✅ Passing — 344 static pages, 0 TypeScript errors, 0 lint errors |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Supabase Project ID** | `kzbdmyovspkbakbtvgig` |
| **Branch** | `main` |
| **Last Updated** | 2026-05-31 |

---

## ⚡ Quick-Start for Next Session

```
Continue the Darhous AI Cloud Academy project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md first before any changes.
Current version: v3.0.0 — Build: ✅ 344 pages — 20 features — Live on Vercel.
```

---

## 🆕 What was completed (v3.0.0) — 2026-05-31

### 20-Feature Global Platform Expansion

#### Database (supabase/v3_feature_schema.sql) ✅
15 new tables with RLS: certificates, learning_plans, daily_tasks, challenges,
challenge_submissions, prompt_scores, prompt_battles, public_profiles,
analytics_events, email_sequence_events, content_items, tool_comparisons,
user_preferences, user_projects, nano_banana_saved_prompts (ensured).
Seeded 4 starter challenges. Storage instructions for avatars bucket included.

#### RAG Foundation (supabase/rag_schema.sql) ✅
content_index + mentor_sources tables. See RAG_MENTOR_PLAN.md.

#### New API Routes ✅
- `/api/coach` — Personal AI Coach (Gemini + local fallback, rate-limited)
- `/api/certificates` — Issue/list certificates (POST verifies 100% progress)
- `/api/certificates/verify/[code]` — Public verification (no auth)
- `/api/prompt-score` — Score prompt out of 100 (AI + local scoring)
- `/api/prompt-battle` — Compare two prompts (AI + local analysis)
- `/api/search` — Full-platform search (courses, tools, projects, blog, prompts, nano)
- `/api/avatar/upload` — Avatar upload to Supabase Storage (2MB limit, jpg/png/webp)
- `/api/challenges/submit` — Submit challenge entry (auth required)
- `/api/learning-plans` — CRUD learning plans
- `/api/analytics/track` — Event tracking (prompt_copied, certificate_generated, etc.)
- `/api/project-generator` — AI project idea generator (Gemini + local)

#### New Pages ✅
- `/[locale]/search` — Smart search across all content
- `/[locale]/challenges` — AI Challenges (4 seeded: prompt, Nano Banana, Claude Code, project)
- `/[locale]/leaderboard` — Public leaderboard (opt-in, privacy-first)
- `/[locale]/prompt-battle` — Compare two prompts with AI analysis
- `/[locale]/prompt-score` — Score prompt out of 100
- `/[locale]/compare-tools` — Tool comparison engine (2-4 tools side-by-side)
- `/[locale]/certificates` — My certificates (issue, print, share)
- `/[locale]/learning-plans` — Saved learning plans
- `/[locale]/project-generator` — AI project idea generator
- `/[locale]/projects/[slug]/build` — 8-step "Build This Project" guided mode
- `/u/[username]` — Public profile (is_public=true only)
- `/certificates/verify/[code]` — Certificate verification page

#### New Components ✅
- `src/components/dashboard/AICoachCard.tsx` — Daily AI Coach recommendations
- `src/components/nano-banana/NanoBananaVisualPreview.tsx` — 12-style CSS visual gallery

#### Upgraded Existing ✅
- `StudentDashboardClient.tsx` — Added AI Coach card, "نظام تعلمك الذكي" header, extended Quick Access (6 items)
- `ProfileSettingsClient.tsx` — Avatar upload from device, Google photo import, username, bio, public profile toggle
- `AdminDashboardClient.tsx` — New "Analytics" + "Content Studio" tabs
- `NanaBananaVisualPreview` added to `/nano-banana-prompts` page
- `Navbar.tsx` — AI Studio dropdown now has 10 items; Search link in navbar
- `Footer.tsx` — All new routes added to AI Studio links
- `sitemap.ts` — 7 new public pages (344 total)
- `layout.tsx` — PWA manifest link + meta tags

#### Email Foundation ✅
- `src/lib/email/templates.ts` — Welcome, day-3 reminder, weekly digest templates
- `src/lib/email/send.ts` — Resend wrapper with graceful fallback

#### PWA ✅
- `public/manifest.webmanifest` — App manifest (installable on mobile)

#### Docs ✅
- `V3_FEATURES.md` — Complete v3 feature list and status
- `RAG_MENTOR_PLAN.md` — Step-by-step RAG implementation plan

---

## ⚠️ Manual Setup Required (v3.0.0)

### 🔴 Run Supabase Migration
```
1. Supabase SQL Editor → run supabase/v3_feature_schema.sql
2. Optional: run supabase/rag_schema.sql
```

### 🟡 Supabase Storage — avatars bucket
```
1. Supabase Dashboard → Storage → New Bucket → Name: "avatars"
2. Run storage policies from comments in v3_feature_schema.sql
```

### 🔴 CRITICAL: Rotate Supabase DB password (from v2.7.0)
- Go to: https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig/settings/database
- See SECURITY_INCIDENT_NOTE.md

### 🟡 Add Resend API key (optional)
- For email sequences: `RESEND_API_KEY` in Vercel env vars
- See email templates in `src/lib/email/templates.ts`

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise in Next.js 16 |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | |
| Icons | Lucide React v1 + react-icons | Some icons renamed vs older versions |
| Search | Local Fuse-style scoring | Full-platform search in /api/search |
| AI | Google Gemini API | gemini-2.5-flash, server-side only |
| Auth | Supabase Auth | Email + Google OAuth |
| Database | Supabase PostgreSQL | RLS enabled on all tables |
| Storage | Supabase Storage | avatars bucket (manual setup required) |
| Email | Resend API | Graceful fallback if not configured |
| Fonts | Geist, IBM Plex Sans Arabic, JetBrains Mono | |
| Deployment | Vercel | Free Hobby plan |
| PWA | manifest.webmanifest | Installable on mobile |

---

## 📁 All Routes (v3.0.0)

### Public routes
| Route | Description |
|-------|-------------|
| `/[locale]` | Home page |
| `/[locale]/courses` | Courses |
| `/[locale]/tools` | AI Tools |
| `/[locale]/search` | Smart search (NEW v3) |
| `/[locale]/challenges` | AI Challenges (NEW v3) |
| `/[locale]/leaderboard` | Leaderboard (NEW v3) |
| `/[locale]/prompt-battle` | Prompt Battle (NEW v3) |
| `/[locale]/prompt-score` | Prompt Score (NEW v3) |
| `/[locale]/compare-tools` | Tool Comparison (NEW v3) |
| `/[locale]/project-generator` | AI Project Generator (NEW v3) |
| `/[locale]/projects/[slug]/build` | Build This Project (NEW v3) |
| `/[locale]/nano-banana-prompts` | Nano Banana Visual Gallery Pro |
| `/u/[username]` | Public Profile (NEW v3) |
| `/certificates/verify/[code]` | Certificate Verify (NEW v3) |

### Auth routes (private/noindex)
| Route | Description |
|-------|-------------|
| `/[locale]/dashboard` | AI Learning OS Dashboard |
| `/[locale]/certificates` | My Certificates (NEW v3) |
| `/[locale]/learning-plans` | Learning Plans (NEW v3) |
| `/[locale]/profile` | Profile v2 (avatar upload, username, bio) |
| `/[locale]/admin` | Admin Dashboard |

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

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ For AI features | From aistudio.google.com |
| `GEMINI_MODEL` | ❌ | Defaults to gemini-2.5-flash |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ For auth | From Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ For auth | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ For admin APIs | **SERVER ONLY** |
| `NEXT_PUBLIC_SITE_URL` | ✅ For OAuth | Live site URL |
| `RESEND_API_KEY` | ❌ Optional | For email sequences |
| `CONTACT_TO_EMAIL` | ❌ Optional | Contact form notifications |

---

## 🔒 Security Status (v3.0.0)

| Check | Status |
|-------|--------|
| GEMINI_API_KEY in source | ❌ Not found |
| SUPABASE_SERVICE_ROLE_KEY in client | ❌ Not found |
| Service role stays server-only | ✅ |
| Admin APIs verify role | ✅ All routes |
| Avatar upload validates type/size | ✅ 2MB, jpg/png/webp only |
| Public profiles hide email | ✅ Only name, bio, stats |
| Private routes noindex | ✅ dashboard, certificates, learning-plans, profile |
| RLS on all new tables | ✅ Documented in v3_feature_schema.sql |
| .env.local not committed | ✅ |
| analytics_events: safe events only | ✅ Allowlist of 10 event types |

---

## 🔮 Recommended Next Tasks (v3.1+)

### High Priority
- [ ] Run `supabase/v3_feature_schema.sql` in production
- [ ] Create `avatars` bucket in Supabase Storage
- [ ] Test certificate issuance end-to-end
- [ ] Test public profile at `/u/[username]`

### Features
- [ ] RAG: Enable pgvector + populate content_index (see RAG_MENTOR_PLAN.md)
- [ ] Email sequences: Day-3 re-engagement trigger after signup
- [ ] Social sharing: Share streak/certificate on X/Twitter
- [ ] More blog posts (currently 13 — target 20+)
- [ ] Dark/light theme toggle in user preferences (user_preferences table ready)
- [ ] Leaderboard: real data when users opt in
- [ ] Admin: full CRUD for content_items (CMS)
- [ ] Challenge points: integrate with leaderboard

---

## ⚠️ Critical Warnings

1. **Tailwind v4** — CSS-based config. Never add `tailwind.config.js` for colors.
2. **Next.js 16 params** — Always `await params` before using.
3. **Supabase client boundary** — `server.ts` and `admin.ts` are SERVER ONLY.
4. **useAuth hook** — CLIENT ONLY.
5. **Admin security** — Role checks in admin page are client-side (UX). API routes do server-side verification.
6. **SUPABASE_SERVICE_ROLE_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Never import `admin.ts` in client components.
7. **Build without Supabase** — App MUST build without Supabase env vars. All Supabase code is wrapped in null checks.
8. **Avatar upload** — Requires `avatars` bucket in Supabase Storage. If bucket missing, shows clean error (`BUCKET_NOT_FOUND`).
9. **MapIcon not Map** — lucide-react `Map` conflicts with JS global. Use `MapIcon` instead.
10. **ImageIcon not Image** — Use `ImageIcon` from lucide-react to avoid Next.js Image conflict.
