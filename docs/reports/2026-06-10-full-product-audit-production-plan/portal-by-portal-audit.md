# Portal-by-Portal Audit

---

## 1. Landing / Home

**Route:** `/ar`, `/en`  
**Purpose:** Platform entry point, showcase all portals

| Aspect | Finding | Score |
|--------|---------|-------|
| UI Quality | Premium dark theme, ambient orbs, good typography | 7/10 |
| Content State | Static hardcoded content | Moderate |
| Cards visible | Yes — portal grid renders | ✅ |
| Stacked scroll effect | NOT IMPLEMENTED | ❌ |
| SmartPlatformTour | DISABLED | ❌ |
| CinematicIntro | sessionStorage-gated | ⚠️ |
| RTL/LTR | Correct — locale drives direction | ✅ |
| Mobile | Responsive layouts used | ✅ |
| Performance | Heavy framer-motion usage | ⚠️ |
| SEO | Title/description set, OG image is .svg | ⚠️ |

**Blockers:**
- No stacked card effect despite being planned
- SmartPlatformTour never shows
- Branding split (NexaLearn vs Darhous)
- No EcosystemMap for Cloud portal

**Production Readiness: 5/10**

---

## 2. AI Academy

**Route:** `/[locale]/ai-academy`  
**Purpose:** AI learning hub — courses, tools, prompts, projects

| Aspect | Finding |
|--------|---------|
| UI Quality | Good — PortalPageWrapper entrance animation, proper sections |
| Content | Static data: ~18 courses, ~62 tools, prompts, projects |
| AI Studio links | 12 tool links, all functional |
| Missing in DB | All 600 records draft → static-only |
| Admin managed | Via ai-courses-cms, ai-tools-cms, etc. |
| Mobile | Responsive grid layouts |
| RTL/LTR | Bilingual via `isAr` conditionals ✅ |
| SEO | Good — OpenGraph set |

**Blockers:**
- 0 published DB records visible
- No PortalIdentityIntro for "Cloud" (it's in portals but cloud isn't in portals.tsx)
- Stats section shows hardcoded numbers

**Production Readiness: 6/10**

---

## 3. Automation Portal

**Route:** `/[locale]/automation`  
**Purpose:** Business automation — recipes, tools, labs, agent

| Aspect | Finding |
|--------|---------|
| UI Quality | Premium — portal identity, ambient orbs, hero |
| Content | 30 workflows, 15+ tools, 10+ paths, case studies |
| RTL Issue | Page sets `dir="rtl"` regardless of locale — BREAKS `/en/automation` |
| Sub-routes | Templates, Tools, Paths, Services, Labs, Agent — all exist |
| Orphaned | `/automation-glossary` exists but NOT linked from here |
| Admin | AutomationCMSPanel exists |
| Mobile | Grid layouts responsive |

**Critical Bug:** `dir="rtl"` hardcoded — English users see right-to-left layout.

**Production Readiness: 6/10** (would be lower without the RTL fix needed for EN)

---

## 4. Cloud Academy (ORPHANED)

**Route:** `/[locale]/cloud`  
**Purpose:** Cloud computing and MLOps education

| Aspect | Finding |
|--------|---------|
| Route exists | Yes |
| In portals.tsx | NO — ORPHANED |
| In navbar | NO |
| In footer portals | NO |
| Content | Hardcoded sections: 9 course topics, 12 labs, 6 providers |
| Dynamic content | NONE — no data file, no DB table |
| Admin | No admin panel for cloud content |
| SEO | Not properly indexed (not in main nav, orphaned) |
| Status badge | Shows "LIVE" — misleading, it's hardcoded placeholder |

**This portal is effectively hidden. It must either be added to portals.tsx or removed.**

**Production Readiness: 2/10**

---

## 5. Language Portal

**Route:** `/[locale]/language`  
**Purpose:** English level assessment and certification

| Aspect | Finding |
|--------|---------|
| UI Quality | Good — portal wrapper, identity intro |
| Assessment | `/language/assessment` exists |
| Results | `/language/results` exists |
| History | `/language/history` exists |
| Verification | `/language/verify/[certId]` exists |
| Content | Assessment questions hardcoded |
| Admin | Limited — no separate language CMS panel seen |
| Mobile | Responsive |
| RTL/LTR | Bilingual ✅ |

**Production Readiness: 6/10**

---

## 6. Digital Exams Portal

**Route:** `/[locale]/digital-exams`  
**Purpose:** IT/Office/Cybersecurity exam platform

| Aspect | Finding |
|--------|---------|
| UI Quality | Good |
| Questions | 902+ questions across 9 subjects in static data |
| Subjects | Word, Excel, PowerPoint, Access, IT, Mobile, WebApps, Cybersecurity, Internet Search |
| Exam flow | `/digital-exams/[subject]` → exam → results |
| Mixed exam | `/digital-exams/mixed` exists |
| Library | `/digital-exams/library` exists |
| History | `/digital-exams/history` exists (login-preferred) |
| Admin | ExamsCMSPanel exists |
| Mobile | Responsive |

**Production Readiness: 7/10** (most complete portal)

---

## 7. Career Hub

**Route:** `/[locale]/career`  
**Purpose:** AI-powered career tools

| Aspect | Finding |
|--------|---------|
| UI Quality | Premium hero, portal identity |
| RTL Issue | `dir="rtl"` hardcoded — BREAKS `/en/career` |
| CV Analyzer | AI (Gemini) — works if API key configured |
| CV Builder | Interactive form |
| Jobs Portal | Static placeholder — no real job data |
| Interview Prep | Static question bank + AI evaluation |
| CV Templates | 3 hardcoded templates |
| Admin | Career management panel exists |
| Mobile | Responsive |

**Critical Bug:** `dir="rtl"` hardcoded — same issue as Automation.

**Production Readiness: 5/10**

---

## 8. IoT Lab

**Route:** `/[locale]/iot-lab`  
**Purpose:** Arduino/IoT education — lessons, projects, challenges

| Aspect | Finding |
|--------|---------|
| UI Quality | Good — portal wrapper, identity intro |
| Lessons | 59 lessons (split across 4 static files) |
| Projects | 72 projects (split across 4 static files) |
| Challenges | 40 challenges |
| Components | Component library |
| Simulator | `/iot-lab/simulator` — static placeholder |
| Admin | IoTCMSPanel exists |
| DB | All draft — static fallback |
| Mobile | Responsive |
| RTL/LTR | Bilingual ✅ |

**Architecture Note:** IoT data split into 8+ files due to static file size. This is a workaround, not a design.

**Production Readiness: 6/10**

---

## 9. Nano Banana

**Route:** `/[locale]/nano-banana-prompts`  
**Purpose:** Gemini image prompt gallery

| Aspect | Finding |
|--------|---------|
| UI Quality | Good — visual preview, portal identity |
| Content | 100+ prompts in static file |
| DB | nano_banana deferred — static-only |
| Admin | Nano banana panel in admin |
| Mobile | Responsive |
| RTL/LTR | Bilingual ✅ |

**Production Readiness: 6/10**

---

## 10. Certificates

**Route:** `/[locale]/certificates`, `/[locale]/certificates/verify/[certId]`  
**Purpose:** Certificate display and verification

| Aspect | Finding |
|--------|---------|
| UI | CertificatesClient renders |
| Verify page | UnifiedVerifyClient — universal verification |
| QR code | Via qrcode package |
| PDF | Via @react-pdf/renderer |
| Admin | Admin can issue certificates |
| Auth | `/certificates` requires auth, `/verify/[certId]` is public |

**Production Readiness: 7/10** (functional when Supabase is configured)

---

## 11. Auth Pages

**Routes:** `/login`, `/register`, `/forgot-password`, `/reset-password`

| Aspect | Finding |
|--------|---------|
| Login form | LoginForm component, Supabase auth |
| Register | RegisterForm, creates user + profile |
| Forgot/Reset | Standard Supabase email flow |
| supabaseConfigured check | Guards UI when Supabase not configured |
| Mobile | Responsive |

**Production Readiness: 7/10** (depends on Supabase env)

---

## 12. Admin Portal

**Route:** `/[locale]/admin`

See admin-complete-audit.md for full details.

**Production Readiness: 4/10**

---

## 13. Dashboard / Profile

**Routes:** `/[locale]/dashboard`, `/[locale]/profile`

| Aspect | Finding |
|--------|---------|
| Dashboard | StudentDashboardClient — shows user learning data |
| Profile | ProfileSettingsClient — account settings |
| Auth guard | Supabase auth required |
| Learning plans | `/learning-plans` linked from dashboard |
| Mobile | Should be responsive |

**Production Readiness: 6/10** (depends on Supabase)

---

## Summary Table

| Portal | Score | Critical Issue |
|--------|-------|----------------|
| Landing/Home | 5/10 | No stacked card effect, tour disabled |
| AI Academy | 6/10 | 0 published records |
| Automation | 6/10 | RTL hardcoded, glossary orphaned |
| Cloud (orphaned) | 2/10 | Not in portals, no admin, no data |
| Language | 6/10 | Good |
| Digital Exams | 7/10 | Most complete |
| Career | 5/10 | RTL hardcoded, jobs placeholder |
| IoT Lab | 6/10 | Data split architecture |
| Nano Banana | 6/10 | Deferred DB |
| Certificates | 7/10 | Good |
| Auth | 7/10 | Depends on Supabase |
| Admin | 4/10 | Monolith, no image upload, no bulk ops |
| Dashboard | 6/10 | Depends on Supabase |
