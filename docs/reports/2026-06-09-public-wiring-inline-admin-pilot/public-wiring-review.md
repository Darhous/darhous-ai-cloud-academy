# Public Wiring Review

## Route/Page Selected
`/[locale]/automation-glossary`

## Why Selected
Since `automation_glossary` was the only table approved during the Phase 3 publishing allowlist, creating its dedicated frontend route provides a perfectly isolated, low-risk sandbox to validate the public retrieval of published records without disturbing existing legacy public pages (like `/[locale]/glossary`).

## Query/Filter Behavior
The page utilizes the generic `fetchPublishedList()` data access layer. Under the hood, this function hard-codes a `.eq("status", "published")` constraint directly into the Supabase query string.

## Published-Only Proof
Because the query filter `status = "published"` is baked into the generic `fetchPublishedList` server helper (`src/lib/content/read-with-fallback.ts`), it is physically impossible for the client UI to receive or accidentally render drafts or archived items.

## Empty State Behavior
If the array returned from `fetchDbTerms()` is empty, the client gracefully falls back to displaying a friendly "No matching published terms" message, avoiding crashes and masking the existence of internal drafts.

## Error State Behavior
If a database error occurs (e.g. network failure), `fetchPublishedList` intercepts the exception and returns an empty array `[]`. This ensures the UI degraded safely to the empty state without exposing unhandled server exceptions to the client.

## Locale Behavior
Arabic (`ar`) and English (`en`) routing contexts are correctly passed down through the Next.js App Router `params`. Text layouts and labels within the UI respect the locale boolean `isAr`.

## Cache/Rendering Behavior
**Dynamic Rendering.** Because the server component calls `verifyAdminRequest()`, which inspects HTTP cookies, Next.js automatically categorizes the route as dynamic. This natively prevents the HTML containing the admin badge from ever being statically cached or served to an anonymous visitor.

## What Was Intentionally Not Wired
- `career_glossary` and any other Tier-A tables.
- No other legacy paths (e.g., `/[locale]/iot-lab` or `/[locale]/automation`) were mutated to consume DB records.
