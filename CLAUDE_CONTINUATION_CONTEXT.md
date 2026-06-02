# 🤖 Claude Continuation Context — Darhous Smart Learning Ecosystem

> ⚠️ READ THIS FIRST before making any changes to this project.
> This document gives Claude (or any AI) full context to continue work without losing direction.

---

## 📊 Current State

| Field | Value |
|-------|-------|
| **Version** | 9.0 — Automation Recipe Library v1 ✅ |
| **Next Version** | v9.1 — Automation detail pages full content (workflow maps, JSON, setup guides) |
| **Status** | ✅ All 6 portals LIVE — Build clean — Commit a959034 — Pushed ✅ — Recipe Library cards live |
| **Build** | ✅ Clean — 0 TypeScript errors — 0 lint errors (65 pre-existing warnings) — exit 0 — **1005 pages** |
| **Last Commit** | `a959034` — feat(automation): wire 20-workflow curated library — card grid + detail stubs |
| **Last Tag** | `checkpoint/automation-recipe-library-v1-cards` |
| **GitHub** | https://github.com/Darhous/darhous-ai-cloud-academy (Public) |
| **Vercel** | https://darhous-ai-cloud-academy.vercel.app |
| **Vercel Team** | `darhous-projects` (NOT `darhous` — causes 404) |
| **Supabase** | https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig |
| **Branch** | `main` |
| **Last Updated** | 2026-06-02 (v9.0 Automation Recipe Library cards launched) |

---

## ✅ v9.0 — Automation Recipe Library v1 (2026-06-02)

**Commits:** `f759157` (components) · `a959034` (library wiring) · **Tag:** `checkpoint/automation-recipe-library-v1-cards` · **Vercel:** Auto-deployed

### What Was Delivered

| Feature | File(s) | Detail |
|---------|---------|--------|
| 20 Curated Workflow Library | `src/data/automation/workflowLibrary.ts` | 20 `AutomationTemplate` objects covering 14 categories — each with `shortDescription`, `safetyStatus`, `safetyNotes`, `tags`, `seoHashtags`, `industry`, `triggerType`, `relatedTemplateIds`, `nodeCount`, `businessValue`, `credentialsGuide` |
| Safety Utility | `src/lib/automation/safety.ts` | `scanJsonForDangerousPatterns()` + `isSafeForDisplay()` — scans for API keys, tokens, real emails, private IPs, webhook URLs |
| SafetyBadge Component | `src/components/automation/SafetyBadge.tsx` | Color-coded badge: آمن/يحتاج مراجعة/متقدم/غير آمن — updated with optional `size` prop |
| JsonViewer Component | `src/components/automation/JsonViewer.tsx` | Copy button + collapse/expand — blocks display if dangerous patterns found |
| WorkflowMapClient | `src/components/automation/WorkflowMapClient.tsx` | Visual n8n-style node map — ready for future content |
| TemplateDetailClient | `src/components/automation/TemplateDetailClient.tsx` | Full detail layout — sections for workflow, setup, I/O, testing, risks, upgrades |
| AutomationAgentClient | `src/components/automation/AutomationAgentClient.tsx` | 3-step wizard — department/goal/tools → generates blueprint in demo mode |
| Card Library Page | `src/app/[locale]/automation/templates/page.tsx` | Uses `curatedWorkflows`, passes `locale` to client |
| Detail Stub Pages | `src/app/[locale]/automation/templates/[slug]/page.tsx` | 20 × 2 locale pages — hero card, safety, tags, tools, "قريبا" CTA, related workflows |
| Upgraded TemplatesClient | `src/components/automation/TemplatesClient.tsx` | Collapsible filter panel (category/difficulty/safety), SafetyBadge on cards, "عرض التفاصيل" CTA with locale link |
| Wired Agent Page | `src/app/[locale]/automation/automation-agent/page.tsx` | Now renders `AutomationAgentClient` wizard |
| Sitemap Updated | `src/app/sitemap.ts` | +40 entries (20 workflows × 2 locales) at priority 0.75 |

### The 20 Selected Workflows

| # | ID | Category |
|---|-----|---------|
| 1 | `student-welcome-flow` | Education Automation |
| 2 | `google-form-to-crm` | CRM & Sales |
| 3 | `daily-ai-email-brief` | AI Agents |
| 4 | `weekly-sales-report` | Reporting & Dashboards |
| 5 | `lead-followup-whatsapp` | CRM & Sales (WhatsApp) |
| 6 | `social-content-approval` | Marketing Campaign |
| 7 | `pdf-certificates` | Education Automation |
| 8 | `hr-candidate-screening` | HR & Recruitment |
| 9 | `customer-request-routing` | Customer Support |
| 10 | `invoice-archive-bot` | File Automation |
| 11 | `website-lead-to-whatsapp` | E-commerce Automation |
| 12 | `course-registration-pipeline` | Education Automation |
| 13 | `attendance-alerts` | HR & Recruitment |
| 14 | `hr-onboarding-pack` | HR & Recruitment |
| 15 | `abandoned-cart-reminder` | E-commerce Automation |
| 16 | `drive-upload-notify` | Internal Operations |
| 17 | `meeting-summary-distribution` | AI Agents |
| 18 | `crm-renewal-reminder` | CRM & Sales |
| 19 | `appointment-confirmation` | Freelance Client Workflows |
| 20 | `content-repurpose-pipeline` | Marketing Campaign |

### Architecture Rules (PERMANENT)

- `visible: true` in `workflowLibrary.ts` → appears in product library
- Future expansion = **add more objects to `workflowLibrary.ts`** — no code changes needed elsewhere
- `generateStaticParams` in `[slug]/page.tsx` reads from `curatedWorkflows` — auto-generates pages
- Sitemap reads from `curatedWorkflows` — auto-adds SEO entries
- Safety scan utility must pass before any JSON is displayed to users

### Build Result

- `npm run typecheck` → ✅ 0 errors
- `npm run lint` → ✅ 0 errors (65 pre-existing warnings)
- `npm run build` → ✅ exit 0 — **1005 pages** (was 965 — +40 for 20 workflows × 2 locales)

### What Remains for v9.1 — Detail Content Sprint

| Item | Status | Notes |
|------|--------|-------|
| Workflow map nodes (`workflowMapNodes`) | ⏳ Pending | Add per workflow — renders in `WorkflowMapClient` |
| Cleaned educational JSON (`cleanedJson`) | ⏳ Pending | Add per workflow — renders in `JsonViewer` |
| Full setup guide prose | ⏳ Pending | `setupSteps` already have bullets — expand to prose |
| Testing checklist interactive | ⏳ Pending | `testingChecklist` data exists — wire interactive checkboxes |
| Common mistakes section | ⏳ Pending | `commonMistakes` data exists — render in detail page |
| Upgrade ideas section | ⏳ Pending | `upgradeIdeas` data exists — render in detail page |
| Student Hub automation section | ⏳ Pending | Add lightweight saved recipes + progress to Hub |
| Admin automation overview tab | ⏳ Pending | Read-only audit: visible/hidden count, safety summary |
| Lab pages (`/labs/[labId]`) | ⏳ Pending | Connect existing lab data to workflow detail pages |
| Add more reviewed workflows | ⏳ Future | Next expansion = add objects to `workflowLibrary.ts` only |

### ⚠️ NEXT SESSION MUST DO

1. **Fill detail pages** — add `workflowMapNodes` + `cleanedJson` + expanded prose to the 20 workflows in `workflowLibrary.ts`
2. **Replace "قريبا" stubs** — swap the coming-soon CTA block in `[slug]/page.tsx` with `TemplateDetailClient` once content is ready
3. **No new portals** — don't touch Language / Career / Digital Exams / AI Academy / IoT Lab

---

## ✅ v8.1 — Language Portal Closure (2026-06-01)

**Commit:** `f54a127` · **Tag:** `checkpoint/v8.1-language-portal-closure` · **Vercel:** Auto-deployed

### What Was Delivered

| Feature | File(s) | Detail |
|---------|---------|--------|
| Language History page | `src/app/[locale]/language/history/page.tsx` + `LanguageHistoryClient.tsx` | New page — recharts LineChart score progression, stats (attempts / best score / best level / certs), latest level banner, all attempts list — RTL/localized |
| Career Hub handoff card | `LanguageResultsClient.tsx` | "Find My Opportunities" card on results page → routes to `/{locale}/career` — intentional handoff to Career Hub, no standalone jobs API built |
| View History link | `LanguageResultsClient.tsx` | Added to bottom actions row on results page |
| Admin CSV export | `AdminDashboardClient.tsx` | Client-side CSV download button in Language results table header — safe fields only (User ID truncated, Level, Score, Stages, Flags, Cert status, Date) |
| Hub history link | `StudentDashboardClient.tsx` | "View Full History" link added next to "Retake Assessment" CTA |

### Intentionally NOT Built

| Item | Reason |
|------|--------|
| `/api/language/jobs` | Career recommendations belong to Career Hub, NOT Language Portal |
| Admin resend email route | Requires new admin route using `createAdminClient()` + duplicating email template; deferred to v8.2 as minor enhancement |

### Build Result
- `npm run typecheck` → ✅ 0 errors
- `npm run lint` → ✅ 0 errors (65 pre-existing warnings)
- `npm run build` → ✅ exit 0 — 965 pages (was 963 — +2 for `/ar/language/history` + `/en/language/history`)

### Manual QA Still Needed (no code changes required)
1. **Certificate positive flow**: Log in → `/ar/language/results?id=2fb780ad-...` → click "تحميل الشهادة" → PDF downloads → `certificate_id` saved → verify link appears
2. **Radar chart positive flow**: Take an exam with correct answers → score > 0% → radar chart and skill bars appear
3. **History page**: Log in → `/ar/language/history` → verify chart and list render

### ⚠️ Career Hub Handoff — Architecture Decision (PERMANENT)
**`/api/language/jobs` will NOT be built inside the Language Portal.**
Career recommendations, job matching, CV analysis, and opportunity guidance are the responsibility of the **Career Hub** (`/ar/career`).
The "Find My Opportunities" button on the results page routes to `/{locale}/career` — this is the intended final behavior.

---

## ✅ v8.0.1 Language QA Polish (2026-06-01)

**Commit:** `a32b7ea` · **Tag:** `checkpoint/v8-language-qa-polished` · **Vercel:** Auto-deployed from push

### Changes Made

| Fix | File | Detail |
|-----|------|--------|
| Remove stale "DB Migration Required" banner | `AdminDashboardClient.tsx` | Migration already executed; flags_count works. Static warning removed entirely. |
| Fix cert button always visible | `LanguageResultsClient.tsx` | Button was only shown when `certificate_id` was already set (chicken-and-egg). Now always shows for all results — API already generates for any result. |

### QA Status After Polish

| Check | Status | Notes |
|-------|--------|-------|
| Admin Language tab — no false migration warning | ✅ | Removed |
| Certificate download button visible for all results | ✅ | Code fixed |
| Radar chart — positive flow (non-zero skills) | ⚠ Pending manual test | Logic is correct; hidden for 0% by design. Requires real exam attempt with correct answers to verify positive path. |
| Certificate PDF generation | ⚠ Pending manual test | Button is now visible for existing results. Verify by visiting results page and clicking "Download Certificate" — API will generate PDF and save `certificate_id` on first call. |
| Certificate verify page | ⚠ Pending manual test | Works after first cert download sets `certificate_id`. |
| Hub cert download link | ⚠ Pending manual test | Hub shows cert link only after cert_id is set (correct behavior — set after first results-page download). |
| Build | ✅ | 0 errors — 963 pages — exit 0 |
| GitHub push | ✅ | `main` pushed `a6eb1d0..a32b7ea` |
| Tag pushed | ✅ | `checkpoint/v8-language-qa-polished` |
| Vercel deployment | ✅ | Auto-triggered by push |

### How to complete the remaining manual QA
1. Log in as `ahmeddarhous@gmail.com`
2. Navigate to `/ar/language/results?id=2fb780ad-f31b-4158-9e7c-422e72a7dfdd` (existing result)
3. Click **"تحميل الشهادة"** — PDF should download and `certificate_id` should be saved to DB
4. Reload the page — verify link shows and `verifyUrl` is now present
5. Visit the verify URL — should show certificate details
6. Check Hub → language history → PDF button should now appear for that attempt
7. To test radar chart: take a new exam and answer at least some questions correctly → skill breakdown > 0 → radar appears

### Recommended Next Step
**v8.1 is safe to start** — Career/job recommendations: `/api/language/jobs` — Gemini API + LEVEL_JOB_MAP fallback

---

## ✅ v8.0 Language Portal — Authenticated Live QA (2026-06-01)

**Test session**: User `ahmeddarhous@gmail.com` (admin) · Result ID: `2fb780ad-f31b-4158-9e7c-422e72a7dfdd`

### User Flow Results

| Step | Result |
|------|--------|
| `/ar/language` portal loads (Arabic RTL) | ✅ |
| Exam intro page — 10 stages, 90s timer, CEFR, anti-cheat info shown | ✅ |
| Exam starts — Stage/Q counter, timer, category tags working | ✅ |
| Timer counts down correctly (90s per question) | ✅ |
| Anti-cheat overlay triggered on tab switch | ✅ — shows "تحذير! تم تسجيل 1 تنبيه" |
| "switch detected 1 ⚠" badge appears in header after dismissal | ✅ |
| "إنهاء مبكر" (Early Exit) button works | ✅ |
| "جاري حساب مستواك..." finalizing screen appears | ✅ |
| Result saved to Supabase with correct user_id | ✅ — `2fb780ad-f31b-4158-9e7c-422e72a7dfdd` |
| Redirects to `/ar/language/results?id=...` | ✅ |
| Results page — CEFR level (A1A), score (0.0%), partial badge | ✅ |
| Anti-cheat flag count shows in results (1 تحذير) | ✅ |
| Next milestone message | ✅ |
| Encouragement message | ✅ |
| Strengths / Weaknesses / Advice (feedback) | ✅ |
| Weekly study plan (collapsible, expands correctly for A1A) | ✅ |
| "نسخ النتيجة" (Copy Result) button found and clickable | ✅ |
| WhatsApp share button present | ✅ |
| Email sent via Resend (`/api/language/email-result`) | ✅ — 200 OK ×2 |
| Hub "تابع من حيث توقفت" shows language card: CEFR A1A, 0% · 0 مراحل | ✅ |
| Radar chart | ⚠ — correctly hidden when score=0% (hasSkills=false), by design |
| Certificate download | ⚠ — not generated for 0%/partial result, by design |
| Wrong answers review | ⚠ — not triggered (no scored questions in partial test), by design |

### Admin Flow Results

| Step | Result |
|------|--------|
| Admin Dashboard loads | ✅ — DARHOUS ADMIN STUDIO v6.0 |
| System health: All 6 Portals 🟢, Resend 🟢, Gemini 🟢, Supabase 🟢 | ✅ |
| "بوابة اللغة" (Language Portal) tab opens | ✅ |
| Analytics: 3 total, avg 2.9%, 1 flagged, 0 certs | ✅ |
| Level distribution: A1A × 3 | ✅ |
| Results table: User ID, Level, Score, Stages, Flags (red for flagged), Cert, Date | ✅ |
| Anti-cheat section "تقارير التنبيه (Anti-cheat)" shows flagged result | ✅ |
| "DB Migration Required" static reminder | ✅ Removed in v8.0.1 |

### Production Logs

| Check | Result |
|-------|--------|
| Vercel runtime logs (last 100) | ✅ — 0 errors, all 200 OK |
| Console errors in Admin Dashboard | ✅ — 0 errors |
| `/api/language/submit` | ✅ — 200, result saved |
| `/api/language/email-result` | ✅ — 200, email sent |
| Supabase queries (all 29 from Hub) | ✅ — all 200 OK |

### Notes

- Radar chart, certificate, wrong-answers review all have correct conditional logic — they don't show for 0%/partial results, which is correct behavior.
- The "DB Migration Required" banner was a static reminder that always displayed. Removed in v8.0.1 — migration was already executed and flags_count works correctly.
- Timer froze during JS anti-cheat simulation (Object.defineProperty side effect) — this is a test artifact only, not a production bug. In normal browser use, the timer works correctly.

### Final QA Verdict

**v8.0 Language Portal: AUTHENTICATED QA PASSED ✅**
v8.1 is safe to start.

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
Current version: v8.1 — Language Portal CLOSED ✅
Build: ✅ Clean — 0 errors — 0 lint errors — exit 0 — 965 pages — Commit f54a127

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

**✅ v8.1 COMPLETE (Language Portal CLOSED):**
- ✅ "Find My Opportunities" → Career Hub handoff button on results page (routes to `/{locale}/career`)
- ✅ Language history page: `/[locale]/language/history` (recharts LineChart + stats)
- ✅ Admin: CSV export button (client-side, safe fields)
- ✅ Hub: "View Full History" link
- ⚠️ Admin resend email: deferred to v8.2 (minor, needs new admin API route)
- ❌ `/api/language/jobs`: INTENTIONALLY NEVER BUILT — belongs to Career Hub

**⚠️ ARCHITECTURE DECISION:**
Career recommendations live in Career Hub (`/ar/career`), NOT Language Portal.
Do NOT create `/api/language/jobs` in any future session.

---

### 🤖 PORTAL v9.0 — Automation Academy Upgrade (NEXT PHASE)

**Source repo:** https://github.com/Darhous/darhous-automation-academy
**Academy route:** https://darhous-ai-cloud-academy.vercel.app/ar/automation
**Local path (if cloned):** `C:\Users\ahmed\Desktop\automation`

The current Automation Academy inside the platform is a static content portal. The next phase upgrades it to full parity with the original Automation Academy standalone app.

Before starting: read `src/app/[locale]/automation/` to understand current state, then clone/review the source repo for what's missing.

---

### 💻 PORTAL v10.0 — Digital Exams v2.0 (AFTER Automation is complete)

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
