# Deferred Items

## Expanding to Additional Tables
Deferred. The scope of Phase 4 rigidly limits operations exclusively to `automation_glossary` to guarantee airtight isolation during the pilot validation.
**Recommended Future Phase:** Phase 5 or Post-Launch feature expansion.

## `career_glossary` 
Deferred. Retains its status outside the generic `CMS_REGISTRY`. 
**Recommended Future Phase:** Requires architectural alignment prior to public rollout.

## Direct Inline Publish/Archive Actions
Deferred. Permitting mutations directly on the public frontend interface introduces immense CSRF complexities and demands rigorous secondary security passes. Forcing admin actions through the `/[locale]/dashboard` serves as an impenetrable security boundary.
**Recommended Future Phase:** V2 Iteration.

## Full CMS Public Wiring
Deferred. Extensive wiring of IoT Lab, Cloud, and massive AI courses would violate the controlled constraints of a pilot experiment.
**Recommended Future Phase:** Core Public Wiring Phase (Pre-Launch).

## Tools Hub / Nano Banana
Deferred. Custom non-generic tables necessitate targeted, bespoke logic outside the generic CMS pipeline.
**Recommended Future Phase:** Targeted Feature Upgrades.

## UI/UX Pro Max
Deferred. The pilot intentionally adopts standard legacy design tokens (`glass-card`, `glow-hover`) to avoid coupling architectural validation with subjective design sweeping.
**Recommended Future Phase:** Phase 5 (UI/UX Pro Max + Launch Candidate).
