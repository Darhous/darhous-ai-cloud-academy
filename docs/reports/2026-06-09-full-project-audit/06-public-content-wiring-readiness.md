# Public Content Wiring Readiness

## Readiness Verdict

The security foundation is ready; the content contracts and page integration are not.

## Ready Foundations

- Public RLS for Tier-A tables is `status = 'published'`.
- Admin RLS is role-based.
- Shared public read helpers enforce `status = "published"`.
- Server components already use DB-to-view-model mappers in several route families.
- Static fallback patterns provide deployment resilience.
- Locale-aware route structure is established.

## Missing Before Wiring

1. A stable mapper for each Tier-A content type.
2. Public route ownership for lessons/resources/prompts/glossaries.
3. List/detail decisions and slug/ID rules.
4. Bilingual fallback rules for missing Arabic or English fields.
5. SEO metadata mapping.
6. sitemap inclusion for published rows.
7. canonical URL and duplicate handling.
8. empty/error/loading behavior.
9. content completeness validation before publish.
10. cache invalidation after publish/unpublish.

## Recommended Pattern

For each content type:

1. Define a typed row interface matching actual production columns.
2. Define a pure mapper from row to UI model.
3. Query only published rows.
4. Add portal/content-type constraints where needed.
5. Decide whether static content is:
   - fallback;
   - seed-equivalent content;
   - legacy content to remain;
   - or separate content.
6. Deduplicate using a canonical ID/slug.
7. Render source-neutral components.

## Important Static Fallback Risk

`mergeById(dbItems, staticItems)` makes DB content win by ID, then fills from static content. This is useful, but publication can produce:

- duplicates where IDs differ;
- stale static versions where IDs collide unexpectedly;
- hidden DB failures because static content still renders;
- sitemap mismatch.

Every future wiring PR should include a source/deduplication test fixture.

## Suggested First Wiring Pilot

Choose one low-risk list-only content type with:

- simple fields;
- no user progress dependency;
- no nested lesson sequencing;
- clear portal location;
- 20-30 records;
- a reversible public section.

Do not start with digital exam questions, complex lessons, `tools_hub`, or `nano_banana`.

## Preview Strategy

- Admin preview may show drafts only after verified server-side admin access.
- Public pages must never switch to draft based only on a client flag.
- If Next.js Draft Mode is used, enabling it must require an authenticated admin and a validated route mapping.
- Preview responses must be dynamic and private.

## Publish Gate Checklist

- required title exists;
- localized title/summary policy passes;
- slug/ID is valid and unique;
- route mapping exists;
- body/data shape validates;
- links are safe;
- status transition is allowed;
- preview has been reviewed;
- audit reason/actor is recorded;
- public cache invalidation target is known.

## Public States

- Loading: skeleton aligned to final layout.
- Empty: explain that no published content exists; do not imply missing data.
- Error: preserve static fallback where intentional and log observability signal.
- Not found: localized recovery links.
- Archived/unpublished: return 404 or intentional unavailable state, not stale cached content.

## Needs Live/Manual Verification

- production RLS behavior with anon/admin tokens;
- actual custom domain and canonical host;
- cache behavior on the deployment platform;
- production environment completeness;
- publish-to-visible latency;
- authenticated preview behavior.
