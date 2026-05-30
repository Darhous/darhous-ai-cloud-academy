# 🤖 Claude Continuation Context — Darhous AI Cloud Academy

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 2.1.0 — Password Reset Flow |
| **Status** | ✅ Live on Vercel |
| **Build** | ✅ Passing — 241 static pages, 0 TypeScript errors |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Branch** | `main` |
| **Last Updated** | 2026-05-30 |

---

## ⚡ Quick-Start for Next Session

```
Continue the Darhous AI Cloud Academy project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md first before any changes.
Current version: 2.1.0 — Build: ✅ 241 pages — Git: clean — Deployed on Vercel
```

---

## 🆕 What was completed (v2.1.0):

### Password Reset Flow
- `/[locale]/forgot-password` — Email input, calls `supabase.auth.resetPasswordForEmail()` with PKCE redirect to `/auth/callback?type=recovery&locale=...`
- `/[locale]/reset-password` — New password + confirm, calls `supabase.auth.updateUser({ password })`. Checks session exists (handles expired links gracefully).
- `src/components/auth/ForgotPasswordForm.tsx` — Client form with success state + spam-folder reminder
- `src/components/auth/ResetPasswordForm.tsx` — Client form with session guard, confirm-password match, success → redirect to dashboard
- **Auth callback updated** — `type=recovery` param detected → redirects to `/reset-password` instead of `/dashboard`
- **LoginForm updated** — "Forgot password?" link added next to password label
- **Sitemap updated** — `/forgot-password` added (241 pages, was 237)

---

## 🆕 What was completed (v2.0.0):

### Supabase Integration
- `src/lib/supabase/client.ts` — browser client (graceful null if env missing)
- `src/lib/supabase/server.ts` — server client with Next.js App Router cookies
- `src/lib/supabase/admin.ts` — service role client (server-only)
- `src/lib/auth/roles.ts` — UserProfile type, isAdmin(), isStudent() helpers
- `src/lib/auth/session.ts` — getServerSession() for server components
- `src/hooks/useAuth.ts` — client auth hook with loading state
- `supabase/schema.sql` — complete schema: 12 tables, RLS, triggers
- `SUPABASE_SETUP.md` — full setup guide
- `ADMIN_GUIDE.md` — admin instructions

### Authentication
- `/[locale]/login` — Email + Google + Apple Sign-In
- `/[locale]/register` — Account creation
- `/auth/callback` — OAuth callback (role-based redirect: admin→/admin, student→/dashboard)
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/OAuthButtons.tsx`

### Student Dashboard (real data)
- `/[locale]/dashboard` — now shows real Supabase data if logged in
- `src/components/dashboard/StudentDashboardClient.tsx`
  - Real course_progress, quiz_results, saved_prompts from Supabase
  - Graceful fallback: if Supabase not configured → localStorage mode
  - Graceful fallback: if not logged in → login gate

### Admin Dashboard
- `/[locale]/admin` — admin-only (role check client + server-side)
- `src/components/admin/AdminDashboardClient.tsx`
  - Tabs: Overview, Users, Subscribers, Messages, Content, Settings, Audit
  - Promote/demote users
  - Export subscribers CSV
  - Mark messages read
  - Content overview with item counts

### Gemini Nano Banana Prompt Lab
- `/[locale]/nano-banana-prompts` — **NEW high-traffic page**
- `src/data/nano-banana-prompts.ts` — 20 examples
- `src/components/nano-banana/NanaBananaClient.tsx`
  - Category + difficulty filters
  - Copy prompt buttons
  - Save to localStorage
  - Safety note (use own photos)
  - Featured badge
  - CTA to community

### Navigation Updates
- **Navbar**: Auth-aware buttons (Login/Register if not logged in, Dashboard/Admin if logged in)
- **Navbar**: Nano Banana Lab in AI Studio dropdown with "NEW" badge
- **Footer**: Added Nano Banana Lab, Login, Register links
- **CommandPalette**: Added Nano Banana, Login, Register, Dashboard
- **Premium3DShowcaseCarousel**: Added Nano Banana card + updated Dashboard card

### Home Page
- Added Nano Banana section with visual grid preview

### API Routes
- `POST /api/community/subscribe` — Supabase subscriber insert (fallback safe)
- `GET /api/admin/users` — admin-only user list
- `GET /api/admin/subscribers` — admin-only subscriber list

### SEO & Sitemap
- Sitemap updated: added `/nano-banana-prompts`, `/login`, `/register`
- Total: 237 static pages (was 225)
- `admin` routes excluded (noindex anyway)

---

## 🏗️ Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | params is a Promise in Next.js 16 |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | CSS-based config — NO tailwind.config.js for colors |
| Animation | Framer Motion 12 + CSS | |
| Icons | Lucide React v1 + react-icons | Some icons renamed vs older versions |
| Search | Fuse.js 7 | Used in CommandPalette |
| AI | Google Gemini API | gemini-2.5-flash, server-side only |
| Auth | Supabase Auth | Email + Google + Apple OAuth |
| Database | Supabase PostgreSQL | RLS enabled on all tables |
| Fonts | Geist, IBM Plex Sans Arabic, JetBrains Mono | |
| Deployment | Vercel | Free Hobby plan |

---

## 📁 New Files Added in v2.0.0

```
src/
  lib/
    supabase/
      client.ts          ← browser client (NEXT_PUBLIC_ vars)
      server.ts          ← server client (cookies + Next.js App Router)
      admin.ts           ← service role client (SERVER ONLY)
    auth/
      roles.ts           ← UserProfile type, isAdmin(), isStudent()
      session.ts         ← getServerSession() server helper
  hooks/
    useAuth.ts           ← client auth hook
  components/
    auth/
      LoginForm.tsx
      RegisterForm.tsx
      OAuthButtons.tsx   ← Google + Apple buttons
    dashboard/
      StudentDashboardClient.tsx
    admin/
      AdminDashboardClient.tsx
    nano-banana/
      NanaBananaClient.tsx
  app/
    [locale]/
      login/page.tsx
      register/page.tsx
      dashboard/page.tsx  (updated)
      admin/page.tsx
      nano-banana-prompts/page.tsx
    auth/
      callback/route.ts  ← OAuth callback + role redirect
    api/
      community/
        subscribe/route.ts
      admin/
        users/route.ts
        subscribers/route.ts
  data/
    nano-banana-prompts.ts  ← 20 Gemini image prompt examples
  messages/
    ar.json              (added signin, copyright keys)

supabase/
  schema.sql             ← complete DB schema + RLS

SUPABASE_SETUP.md
ADMIN_GUIDE.md
```

---

## 🌐 All Routes (v2.0.0)

| Route | Description | Auth |
|-------|-------------|------|
| `/[locale]` | Home page | Public |
| `/[locale]/login` | Login (Email/Google/Apple) | Public |
| `/[locale]/register` | Register | Public |
| `/[locale]/dashboard` | Student dashboard | Soft gate (shows login prompt) |
| `/[locale]/admin` | Admin panel | Hard gate (admin role) |
| `/[locale]/nano-banana-prompts` | Nano Banana Prompt Lab | Public |
| `/[locale]/courses` | Courses | Public |
| `/[locale]/tools` | AI Tools | Public |
| ... (all existing routes) | | Public |
| `/auth/callback` | OAuth callback | System |
| `POST /api/community/subscribe` | Community signup | Public |
| `GET /api/admin/users` | Admin users | Admin only |
| `GET /api/admin/subscribers` | Admin subscribers | Admin only |

---

## 🔑 Environment Variables (full list)

| Variable | Required | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ For AI Mentor | From aistudio.google.com |
| `GEMINI_MODEL` | ❌ | Defaults to gemini-2.5-flash |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ For auth | From Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ For auth | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ For admin APIs | **SERVER ONLY — never expose** |
| `NEXT_PUBLIC_SITE_URL` | ✅ For OAuth | Live site URL |

### Graceful Degradation
- App builds and runs without Supabase vars
- Login page shows "not configured" message
- Dashboard shows localStorage mode + login gate
- Admin shows "not configured" message
- Community signup still works via FormSubmit
- All static content pages work normally

---

## 🔒 Security Audit Status

| Check | Status |
|-------|--------|
| GEMINI_API_KEY in source | ❌ Not found |
| SUPABASE_SERVICE_ROLE_KEY in client code | ❌ Not found |
| NEXT_PUBLIC_GEMINI anywhere | ❌ Not found |
| Admin credentials hardcoded | ❌ Not found |
| .env.local committed | ❌ Not committed |
| RLS on all Supabase tables | ✅ Documented in schema.sql |
| Admin APIs verify role server-side | ✅ All 3 admin routes |
| Stack traces in API responses | ❌ Redacted |

---

## 🔮 Recommended Next Tasks

### Phase 2B: Content
- [ ] More Nano Banana examples (target: 50+)
- [ ] MDX support for blog posts
- [ ] More AI tools (target: 60+)

### Phase 3B: Full Auth Experience
- [ ] Email confirmation flow
- [x] Password reset flow (`/forgot-password` + `/reset-password`)
- [ ] User profile settings page
- [ ] Onboarding flow after first login

### Phase 4: Real Progress Tracking
- [ ] Mark lesson as complete (writes to lesson_progress table)
- [ ] Course progress bar updates in real-time
- [ ] Quiz results saved to Supabase
- [ ] Streak counter

### Phase 5: AI Enhancements
- [ ] Streaming AI responses (SSE)
- [ ] RAG over platform content
- [ ] Context-aware mentor from course pages

---

## ⚠️ Critical Warnings

1. **Tailwind v4** — CSS-based config. Never add `tailwind.config.js` for colors.
2. **Next.js 16 params** — Always `await params` before using.
3. **Supabase client boundary** — `server.ts` and `admin.ts` are SERVER ONLY. Never import in client components.
4. **useAuth hook** — CLIENT ONLY. Uses `"use client"` components only.
5. **Admin security** — Role checks in admin page are client-side (UX). API routes do server-side verification.
6. **SUPABASE_SERVICE_ROLE_KEY** — NEVER prefix with `NEXT_PUBLIC_`. Never import `admin.ts` in client components.
7. **Build without Supabase** — App MUST build without Supabase env vars. All Supabase code is wrapped in null checks.
8. **Nano Banana safety** — Prompts are for user's own photos. Safety note is displayed prominently.

---

## 💬 Continuation Prompts

**Continue development:**
```
Continue the Darhous AI Cloud Academy project.
Path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
Read CLAUDE_CONTINUATION_CONTEXT.md first before any changes.
Current version: 2.1.0 — Build: ✅ 241 pages — Deployed on Vercel
```

**Add MDX blog:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md first.
Add MDX support for blog posts. Each post in src/data/blog.ts gets a .mdx file.
Update blog/[slug]/page.tsx to render MDX content.
```

**Add password reset:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md first.
Add a forgot-password page at /[locale]/forgot-password using Supabase resetPasswordForEmail().
Add /[locale]/reset-password for the callback with new password form.
```

**Add streaming AI:**
```
Continue Darhous AI Cloud Academy. Read CLAUDE_CONTINUATION_CONTEXT.md first.
Implement streaming AI responses for the Mentor using Gemini streamGenerateContent endpoint.
Change /api/mentor to stream text chunks. Update MentorChat.tsx to read the stream.
```
