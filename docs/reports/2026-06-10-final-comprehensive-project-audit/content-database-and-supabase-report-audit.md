# Content, Database, and Supabase Report Audit

## Authoritative Current Reported State

- Normalized content estate: 1,040 records.
- Tier-A: 600 records across 19 tables.
- Tier-A status: 600 draft, 0 published.
- Existing live-wired/excluded: 210.
- Deferred/schema-risk: 230.
- `tools_hub` generated migrations: deferred.
- `nano_banana` generated migrations: deferred; existing live Nano Banana tables are separate.

No live database query was performed in this audit.

## Code Agreement

- `DRAFT_PREVIEW_TABLES` contains the 19 imported Tier-A tables with expected counts totaling 600.
- The draft-preview endpoint is admin-only and enforces draft status.
- Public content helpers use published-only filters.
- The 19 Tier-A tables are not generally wired into public pages.
- The automation glossary is the controlled public publishing pilot.

## Documentation Mismatches

- `supabase/MIGRATION_LOG.md:31` still says all 19 tables have 0 rows. That was true before import and is stale now.
- `content-supabase-import-handoff.md:111` says metadata repair was not done, while later handoffs document repair and production synchronization.
- Older 180/260 classifications remain in historical artifacts; later production verification uses 210/230.
- One pilot report describes the 22-table generic registry as Tier-A, which conflicts with the current architecture: the 19 imported Tier-A tables are a separate read-only preview set.

## Exposure Assessment

No code evidence was found that the 600 Tier-A drafts are publicly exposed. Future wiring remains blocked by missing lifecycle/admin integration for those 19 tables.

