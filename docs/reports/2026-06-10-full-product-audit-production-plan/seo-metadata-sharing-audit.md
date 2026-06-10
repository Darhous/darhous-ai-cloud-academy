# SEO, Metadata & Sharing Audit

## Brand consistency: NexaLearn by Darhous

| Surface | Brand state |
|---------|-------------|
| Cinematic intro | NexaLearn by Darhous ✓ |
| Homepage metadata | **Darhous** titles |
| Navbar logo text | Mixed across phases |
| README | Darhous AI Cloud Academy |
| Certificates/PDF | DARHOUS ACADEMY (old) |
| PWA manifest | Prior audit: old naming |
| OG image | `public/og-image.svg` — Darhous |

**Verdict:** Rebrand **incomplete** — Phase 5G partial.

## Per-locale metadata

Most `[locale]` pages implement `generateMetadata` with AR/EN branches. Quality varies.

## Open Graph

Root `layout.tsx` sets `metadataBase` from `NEXT_PUBLIC_SITE_URL`. Dynamic OG route at `src/app/og/route.tsx`. Certificate/share previews may still use old assets.

## Canonical / alternates

Locale prefix pattern `/{locale}/...`. hreflang alternates — verify per major pages (not uniformly implemented).

## Robots / sitemap

`sitemap.ts` exists. Conflicts: `/language/history` in sitemap but page may be noindex.

## Certificate verification SEO

Public verify pages indexable — good for verification use case; brand must be consistent.

## Portal titles

IoT, automation, career pages have dedicated metadata. `/cloud` has metadata but orphan nav.

## Sharing preview test needed

1. Share `/ar` and `/en` on WhatsApp/Twitter — check OG title/image
2. Share certificate verify URL — check old brand leakage

**Verdict:** Not launch-ready for brand-unified sharing.
