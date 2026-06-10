# Dead Pages and Dead Links Audit

---

## Dead / Orphan Pages (Exist in code, not reachable from navigation)

### CRITICAL — Orphaned Routes

| Route | File | Linked from | Status |
|-------|------|-------------|--------|
| `/cloud` | `app/[locale]/cloud/page.tsx` | Sitemap, carousels (not primary nav) | **ORPHANED** — not in portals.tsx, not in navbar, not in footer |
| `/automation-glossary` | `app/[locale]/automation-glossary/page.tsx` | NOT in navbar, NOT in footer, NOT in automation portal links | **ORPHANED** |

### Routes Only Accessible via Footer (Not in Main Nav)

| Route | Notes |
|-------|-------|
| `/about` | Footer "more links" only |
| `/contact` | Footer "more links" only |
| `/privacy` | Footer "more links" only |
| `/terms` | Footer "more links" only |
| `/glossary` | Footer "more links" only |
| `/courses` | Footer "more links" only |

### Auth-Protected Routes (Correct behavior, not dead)

| Route | Protection | Access Method |
|-------|-----------|---------------|
| `/dashboard` | Supabase auth required | Login → redirect |
| `/profile` | Requires auth | Navbar after login |
| `/onboarding` | Private | Post-registration flow |
| `/learning-plans` | robots:noindex | Dashboard link |
| `/admin` | Admin role required | Navbar after admin login |
| `/certificates` | Login required | Dashboard |
| `/digital-exams/history` | Login preferred | Digital exams portal |

### Coming Soon Page

| Route | Status |
|-------|--------|
| `/coming-soon` | Linked from portal with status "coming-soon" | Shows correct "coming soon" page |

---

## Dead Buttons / Non-Functional UI

| Location | Element | Issue |
|----------|---------|-------|
| Every portal page | "استكشف" CTA in section cards | Opens the portal sub-page correctly — OK |
| SmartPlatformTour | Entire component | Disabled, never renders |
| Admin "Email & Notify" tab | Email sending UI | Requires Resend API key (env var) — may fail silently |
| Admin "Upload" if present | Not found in audit — likely missing | Image upload not implemented |
| `/career/builder` | CV builder form | May require Gemini API key |
| `/career/cv-analyzer` | File upload + AI analysis | Requires Gemini API key |
| `/career/interview` | AI interview evaluator | Requires Gemini API key |
| `/prompt-studio` | AI enhancement | Requires Gemini API key |
| `/prompt-score` | AI scoring | Requires Gemini API key |
| `/roadmap-generator` | AI generation | Requires Gemini API key |
| `/project-generator` | AI generation | Requires Gemini API key |
| `/claude-code-generator` | AI generation | Requires Gemini API key |
| `/automation/automation-agent` | AI workflow agent | Requires Gemini API key |
| `/mentor` | AI Mentor chat | Requires Gemini API key |

**All AI-powered features require `GOOGLE_GEMINI_API_KEY` or `GEMINI_API_KEY` env variable. If not configured, these pages will show errors or blank responses.**

---

## Links in Code That May Be Problematic

### Navigation Links Missing Pages or Mis-routed

| Link href | Expected page | Actual state |
|-----------|--------------|-------------|
| `/courses` | Courses list | ✅ Exists |
| `/paths` | Roadmaps list | ✅ Exists |
| `/tools` | AI Tools list | ✅ Exists |
| `/claude` | Claude mastery | ✅ Exists |
| `/projects` | Projects list | ✅ Exists |
| `/blog` | Blog list | ✅ Exists |
| `/search` | Search | ✅ Exists |
| `/leaderboard` | Leaderboard | ✅ Exists |
| `/challenges` | Challenges | ✅ Exists |
| `/nano-banana-prompts` | Nano Banana | ✅ Exists |
| `/mentor` | AI Mentor | ✅ Exists |
| `/prompt-studio` | Prompt Studio | ✅ Exists |
| `/prompt-score` | Prompt Score | ✅ Exists |
| `/prompt-battle` | Prompt Battle | ✅ Exists |
| `/claude-code-generator` | Generator | ✅ Exists |
| `/tool-recommender` | Recommender | ✅ Exists |
| `/compare-tools` | Compare | ✅ Exists |
| `/roadmap-generator` | Generator | ✅ Exists |
| `/project-generator` | Generator | ✅ Exists |
| `/cloud` | Cloud Academy | ❌ ORPHANED — not in nav |
| `/automation-glossary` | Automation Glossary | ❌ ORPHANED — not in nav |

### Social Links (External, in code)

| Link | Target |
|------|--------|
| `https://www.instagram.com/darhous/` | Instagram |
| `https://www.linkedin.com/in/darhous/` | LinkedIn |
| `https://www.facebook.com/ahmed.darhous` | Facebook |
| `https://wa.me/201030002331` | WhatsApp (phone number exposed) |
| `mailto:ahmeddarhous@gmail.com` | Email |

---

## Route Count Summary

| Category | Count |
|----------|-------|
| Total routes in app directory | ~75 routes |
| Public navigable routes | ~55 |
| Auth-protected routes | ~8 |
| Orphaned routes (no nav link) | **2** (/cloud, /automation-glossary) |
| Routes only in footer | 6 |
| Dead/disabled UI components | 1 (SmartPlatformTour) |

---

## Fixes Required

1. **Add `/cloud` to portals.tsx** or clearly redirect/remove the route
2. **Add `/automation-glossary` to automation portal sub-navigation**
3. **Add tour trigger button** since SmartPlatformTour is disabled
4. **Move `/about` and `/contact` to main navbar** or at minimum add them to visible sitemap sections
5. **Validate all Gemini API-dependent pages** with a "feature unavailable" graceful fallback
