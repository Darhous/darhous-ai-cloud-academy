# Project Map and Current State

## Stack

- Next.js `16.2.6`, App Router, React `19.2.4`, TypeScript 5.
- Tailwind CSS 4, Framer Motion 12, Lucide, Recharts, Fuse.js.
- Supabase SSR/client/admin integrations.
- Resend email, React PDF, QR code generation, Gemini-backed features.
- Arabic and English route prefixes with RTL/LTR layout handling.

Evidence: `package.json`, `src/app/[locale]/layout.tsx`, `src/lib/supabase/*`.

## Application Surface

- 87 `page.tsx` routes.
- 63 API route handlers.
- Root locale redirect, localized public pages, account pages, student dashboard, admin dashboard, public profiles, and certificate verification.
- Portal registry: AI Academy, Language, Digital Exams, Career, Automation, IoT Lab, Nano Banana, and Future Portals.

Evidence: `src/app`, `src/config/portals.ts`.

## Major Route Families

| Family | Representative routes | State |
|---|---|---|
| Core AI content | `/[locale]/courses`, `/tools`, `/projects`, `/prompts`, `/blog`, `/glossary` | Working; mixed DB/static fallback |
| AI utilities | `/mentor`, `/prompt-studio`, `/prompt-score`, `/prompt-battle`, generators | Working surfaces; external AI/env dependencies |
| Language | `/language`, `/assessment`, `/results`, `/history` | Feature-rich; authenticated result flows |
| Digital exams | `/digital-exams`, subject routes, mixed, history, library | Feature-rich; data/API dependencies |
| Career | `/career`, CV analyzer/builder, jobs, interview, templates | Working surfaces; some AI/external dependencies |
| Automation | templates, labs, tools, paths, services, agent | Broad hybrid static/DB implementation |
| IoT | paths, lessons, projects, challenges, components, simulator, exams | Broad hybrid static/DB implementation |
| Account | login, register, onboarding, dashboard, profile, certificates, plans | Auth-dependent |
| Admin | `/[locale]/admin` | Server-gated, functionally broad, UX overloaded |

## Architecture Characteristics

### Strengths

- Localized `<html lang dir>` is set at the locale layout.
- Invalid locales call `notFound()`.
- Skip link, focus-visible styling, logical CSS properties, and reduced-motion CSS exist.
- Root and locale metadata, sitemap, robots, Open Graph, Twitter, and JSON-LD exist.
- Admin page authorization is enforced server-side with `profile.role === "admin"`.
- Shared public DB helpers always add `.eq("status", "published")`.
- Admin draft preview has a whitelist and exposes GET only.

### Current Complexity

- `src/components/admin/AdminDashboardClient.tsx` is 5,277 lines.
- Global UI loads Navbar, command palette provider, mentor floating button, scroll-to-top, and footer on all localized routes, including operational pages.
- The project contains overlapping generations of data architecture:
  - hardcoded TypeScript/JSON datasets;
  - dedicated DB-backed content tables such as `ai_tools`;
  - generic CMS tables for Automation/IoT/Exams;
  - 19 new normalized Tier-A tables;
  - deferred table designs.
- Static fallback behavior can hide missing DB wiring because pages continue to render successfully.

## Environment Assumptions

- `NEXT_PUBLIC_SITE_URL` has a Vercel fallback.
- Supabase clients gracefully return null when configuration is absent.
- AI/email/CV features depend on environment secrets not validated by this audit.
- `.env.local` contents were not reported or copied.
- Production runtime behavior and production role assignments need live/manual verification.

## Current Content Lifecycle

1. Existing public pages can render static content and selected published DB tables.
2. The 600 Tier-A rows exist as drafts and are visible only in the read-only preview.
3. No Tier-A publishing controls are confirmed.
4. Public RLS policies allow only published rows.
5. Public pages for most Tier-A content types do not yet query those tables.

## Documentation Checkpoints

- `c26d50b`: content database conversion audit closure.
- `e03f498`: admin draft preview audit.
- `8787be6`: production verification of 600 Tier-A rows.
- `fde3624`: schema-compatible Tier-A metadata sync SQL.

## Missing Operational Artifacts

- No automated test files were found.
- No route-level loading/error/not-found files were found.
- No documented release smoke-test suite was found in the inspected source.
- Build completion remains unverified in this environment after a compile-success/worker failure sequence.
