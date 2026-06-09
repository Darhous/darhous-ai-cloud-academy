# Deferred Items

## `career_glossary` Integration
Deferred. The table is omitted from the generic `CMS_REGISTRY`. Integrating it securely requires broader alignment on extending the generic UI parameters or migrating it officially into the registry scope. 
**Recommended Future Phase:** Phase 4 (CMS Publishing Expansion) or Phase 5.

## Enabling More Tier-A Tables
Deferred. The pilot intentionally enforces an strict limit to a single table (`automation_glossary`).
**Recommended Future Phase:** Phase 4 (CMS Publishing Expansion).

## Public Tier-A Wiring
Deferred. The pilot guarantees zero public leakage by keeping live page components entirely disconnected from Tier-A table fetches. 
**Recommended Future Phase:** Phase 4 or Phase 5 (Public Launch).

## Inline Admin Controls
Deferred. No "edit-on-page" widgets or contextual admin tools were built.
**Recommended Future Phase:** Post-Launch / V2 Iteration.

## Audit Log Improvements
Deferred. Custom audit tracking trails (e.g. tracking "who changed status and when" beyond standard timestamps) lacks a unified implementation pattern across the codebase.
**Recommended Future Phase:** Dedicated Security/Auditing iteration.

## Cache/Revalidation Improvements
Deferred. Modifying content does not currently broadcast invalidation commands to the Next.js cache. 
**Recommended Future Phase:** Phase 4 (required before public wiring).

## Tools Hub and Nano Banana
Deferred. These standalone custom modules require independent verification paths.
**Recommended Future Phase:** Dedicated Feature Upgrades or Post-Launch.
