# SEO, Metadata & Sharing Audit

---

## Branding Conflict in Metadata

The product is undergoing a rename from "Darhous AI Cloud Academy" to "NexaLearn by Darhous" but the transition is incomplete:

| File | Brand Used |
|------|-----------|
| `src/app/layout.tsx` (root) | **NexaLearn by Darhous** |
| `src/app/[locale]/layout.tsx` | **Darhous AI Cloud Academy** |
| `src/app/[locale]/page.tsx` | "منصة درهوس — نظام التعلم الذكي" |
| `CinematicIntro.tsx` | **NexaLearn** |
| `HeroSection.tsx` badge | **NexaLearn by Darhous** |
| `lib/constants.ts` | **NexaLearn by Darhous** |
| `og/route.tsx` | **NexaLearn by Darhous** |
| JSON-LD in layout | Darhous AI Cloud Academy |
| Footer | "منصة درهوس" / "Darhous" |

**Verdict:** Searching for "NexaLearn" or "Darhous AI Cloud Academy" would show different results. Social shares from different pages would show different brand names. This is confusing to users and hurts SEO.

---

## OG Image Issue

**Current OG Image:** `/og-image.svg` (locale layout) and `/og` route (root layout)

```tsx
// src/app/[locale]/layout.tsx
images: [{ url: `${BASE_URL}/og-image.svg`, width: 1200, height: 630 }]
```

**Problem:** SVG files are NOT supported as OG images by:
- Twitter/X (only png, jpg, gif, webp)
- LinkedIn (requires raster image)
- WhatsApp (SVG not previewed)
- Facebook (SVG not consistently shown)

The `/og` route (`src/app/og/route.tsx`) generates a dynamic image — this is the correct approach. However, the locale layout uses `/og-image.svg` instead of the dynamic `/og` route.

**Fix needed:** Change locale layout OG image to use the `/og` dynamic route.

---

## Page-Level Metadata

Most pages have proper `generateMetadata` functions. Review:

| Page | Title | Description | OG | Keywords |
|------|-------|-------------|-----|----------|
| Landing | ✅ | ✅ | ✅ | ✅ |
| AI Academy | ✅ | ✅ | ✅ | — |
| Automation | ✅ | ✅ | ✅ | — |
| Language | ✅ | ✅ | ✅ | — |
| Digital Exams | ✅ | ✅ | ✅ | — |
| Career | ✅ | ✅ | ✅ | — |
| IoT Lab | ✅ | ✅ | ✅ | — |
| Nano Banana | ✅ | ✅ | ✅ | ✅ |
| Cloud (`/cloud`) | ✅ | ✅ | — | ✅ |
| Blog posts | ✅ | ✅ | ✅ | — |
| Courses | ✅ | ✅ | — | ✅ |
| Admin | ✅ noindex | ✅ | — | — |

---

## Canonical / Alternate Links

- No explicit `<link rel="canonical">` found in page metadata
- No `<link rel="alternate" hreflang>` for bilingual pages
- Next.js handles hreflang if configured in `alternates` metadata — not set
- **Risk:** Search engines may not properly understand the Arabic/English relationship

---

## Sitemap

**File:** `src/app/sitemap.ts`

✅ Comprehensive sitemap including:
- All static pages (55+ routes × 2 locales)
- All course detail pages (by slug × 2 locales)
- All tool detail pages
- All project pages
- All blog posts
- All automation templates (25 workflows × 2 locales)
- All IoT lessons, projects, challenges, components
- All digital exam subjects

**Issues:**
- `/cloud` IS included in sitemap despite being orphaned
- `/automation-glossary` is NOT in sitemap despite being a public page
- Sitemap does not include blog posts from DB (only static `blogPosts` from data/blog.ts)

---

## Robots.txt

**File:** `src/app/robots.ts`

- Properly disallows: `/api/`, admin, auth, private user pages
- Allows public content
- References sitemap URL
- **Status: ✅ Correct**

---

## Structured Data (JSON-LD)

**File:** `src/app/[locale]/layout.tsx`

Two JSON-LD schemas:
1. `WebSite` with `SearchAction` — enables sitelinks search box ✅
2. `EducationalOrganization` with contact and social profiles ✅

**Issues:**
- Organization name: "Darhous AI Cloud Academy" (not NexaLearn) — inconsistent with root layout
- `logo` property references `/og-image.svg` (same SVG issue)
- Social profiles: Instagram, LinkedIn, Facebook — complete

---

## Twitter Card

- `summary_large_image` set ✅
- Twitter image references `/og-image.svg` in locale layout (SVG issue)
- Root layout references `/og` (dynamic — correct)

---

## SEO Verdict

| Item | Status |
|------|--------|
| Title per page | ✅ Set on all pages |
| Description per page | ✅ Set on most pages |
| OG image | ❌ SVG in locale layout (unreliable) |
| OG image dynamic route | ✅ Exists at `/og` |
| Canonical links | ❌ Not set |
| hreflang for AR/EN | ❌ Not configured |
| Sitemap | ✅ Comprehensive |
| Robots | ✅ Correct |
| JSON-LD | ✅ Present, branding inconsistent |
| Branding consistency | ❌ Split across files |
| Certificate verification metadata | Not set (noindex pages) |
| NexaLearn rename completeness | ⚠️ Partially done |

**Overall: 5/10 — Good foundation, SVG image and branding issues block effective social sharing**
