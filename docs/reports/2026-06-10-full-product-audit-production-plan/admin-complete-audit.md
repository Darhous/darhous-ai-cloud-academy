# Admin Panel — Complete Audit

---

## Access Control
- **Route:** `/[locale]/admin`
- **Protection:** Server-side — `getServerSession()` checks Supabase auth + `profiles.role === "admin"`
- **Redirect:** Non-admin → `/[locale]/login?next=/[locale]/admin`
- **Verdict:** Properly protected. Admin cannot be accessed without correct role.

---

## Admin Navigation Structure

Admin uses a grouped sidebar with 6 groups:

### Group 1: Overview
- Overview (overview)
- Analytics (analytics)

### Group 2: Content / CMS
- Blog (blog)
- Courses (ai-courses-cms)
- Projects (ai-projects-cms)
- Paths (ai-paths-cms)
- AI Tools (ai-tools-cms)
- Prompts (ai-prompts-cms)
- Glossary (ai-glossary)
- Automation Content (automation-cms)
- IoT Content (iot-cms)
- Exams Content (exams-cms)
- Legacy Content (content)

### Group 3: Review / Drafts
- Draft Preview (draft-preview)

### Group 4: Users / Students
- Users (users)
- Certificates (certificates)
- Email & Notify (email)

### Group 5: Learning / Portals
- Portal Manager (portals)
- AI Academy (ai-academy)
- IoT Lab (iot-lab)
- Career Hub (career)
- Automation Portal (automation)
- Language Portal (language)
- Nano Banana (nano-banana)
- Digital Exams (digital-exams)

### Group 6: Operations / System
- Site Builder (site-builder)
- Theme & Branding (theme)
- AI Mentor Control (mentor-control)
- Security & Audit (audit)

**Total admin tabs: 32**

---

## Panel-by-Panel Audit

### Overview Panel (AdminOverviewPanel.tsx)
- Shows platform statistics
- Counts from static data: courses, tools, lessons, projects, challenges
- May show DB user count if Supabase configured
- **Status:** Functional for static data

### Analytics Panel (AdminAnalyticsPanel.tsx)
- Shows analytics charts using Recharts
- Likely shows mock/static data without real event tracking
- **Status:** Partial — UI exists, real analytics requires event tracking setup

### Blog Panel
- Lists blog posts from DB
- CRUD: Create/Edit/Delete
- **Status:** Functional if Supabase configured, forms exist

### AI Courses CMS (ai-courses-cms)
- Connects to `api/admin/ai-courses/` route
- List, Create, Edit, Delete operations
- **Status:** Functional, backed by dedicated API routes

### AI Projects, Paths, Tools, Prompts, Glossary CMS
- Each connects to dedicated `api/admin/[type]/` routes
- CRUD operations available
- **Status:** Functional

### Automation CMS (AutomationCMSPanel.tsx)
- Manages automation content types via `cms-registry.ts`
- GenericCmsTypePanel used for sub-types
- **Status:** Functional

### IoT CMS (IoTCMSPanel.tsx)
- Manages IoT lessons, projects, challenges, components
- GenericCmsTypePanel used
- **Status:** Functional

### Exams CMS (ExamsCMSPanel.tsx)
- Manages digital exam subjects and questions
- **Status:** Functional

### Draft Preview (DraftContentReviewPanel.tsx)
- Shows draft content awaiting publish decision
- Admin can preview before publishing
- **Status:** Functional for supported content types

### Users Panel
- Shows user list from Supabase `profiles` table
- Search/filter users
- **Status:** Functional if Supabase configured

### Certificates Panel
- Issue certificates to users
- View issued certificates
- API: `api/admin/certificates/issue/`
- **Status:** Functional

### Email & Notify
- Subscriber list management
- Email sending via Resend API
- API: `api/admin/subscribers/`
- **Status:** Requires `RESEND_API_KEY` env var — may fail without it

### Portal Manager (AdminPortalsPanel.tsx)
- View all portals from portals.tsx
- Toggle portal status
- **Status:** View only — no DB persistence for portal status changes

### AI Academy, IoT Lab, Career, Automation, Language, Nano Banana, Digital Exams
- Per-portal management panels
- Mix of real CRUD and overview displays
- **Status:** Varies by panel — need deeper inspection

### Site Builder
- Site-wide settings management
- API: `api/admin/site-settings/`
- **Status:** Functional

### Theme & Branding (AdminThemePanel.tsx)
- Brand colors, logo, font management (stored in site_settings)
- **Status:** Functional (UI layer, changes stored in DB)

### AI Mentor Control
- Configure AI Mentor behavior
- Model selection, system prompt, tone
- API: `api/admin/mentor-settings/`
- **Status:** Functional

### Security & Audit
- View admin audit logs
- API: `api/admin/audit-logs/` if exists
- **Status:** Partial

---

## Critical Admin Gaps

| Gap | Severity | Impact |
|-----|----------|--------|
| No image upload UI anywhere | High | Cannot set cover images, portal icons via admin |
| No Cloud portal management | High | Cloud page is orphaned AND unmanageable |
| No bulk publish/unpublish | High | Must publish 600 records one by one |
| AdminDashboardClient is one 327KB+ file | Critical Architecture | Unmaintainable, slow dev, hard to extend |
| No search/filter in most CMS lists | Medium | Hard to find specific records in large tables |
| No sort/reorder UI for content | Medium | Sort order stuck at creation order |
| No content duplicate/clone | Low | Hard to create similar content |
| No markdown preview in forms | Medium | Can't preview formatted content before save |
| Analytics panel shows likely mock data | Medium | Owner has no real insights |
| Feature flags panel exists but not visible | Low | Admin can't toggle features without knowing URL |

---

## Admin Production Readiness Verdict

**Score: 4/10 — Not ready for production**

What works:
- Auth/role protection ✅
- CRUD for most content types ✅
- Certificate issuance ✅
- User management ✅
- Site settings ✅
- AI Mentor settings ✅

What's missing:
- Image upload ❌
- Bulk operations ❌
- Real analytics ❌
- Cloud portal management ❌
- Content search/filter ❌
- Manageable code architecture ❌
- Admin mobile experience (likely poor) ❌
