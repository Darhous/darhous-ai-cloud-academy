# Next Selection Plan

**Date:** 2026-06-11

## How to Review
1. Visit the isolated index route: `/{locale}/design-lab`.
2. Do NOT test on production domains; use local dev server or preview deployment.
3. Click through each concept individually. Assess the aesthetic feel, motion smoothness, and structural hierarchy.
4. Toggle your OS "Reduce Motion" setting and reload each concept to ensure fallbacks are working.
5. Shrink your browser to mobile width (375px) to evaluate the responsive behavior.

## Choosing a Winner
The five concepts are strictly independent by design, but they are not entirely mutually exclusive. 
- You can select **Concept 3 (Silent Authority)** as the core layout, but borrow the **Concept 5 (Goal Gateway)** interaction flow for the hero section.
- You can select **Concept 1 (Dashboard)** but borrow the **Concept 4 (Constellation)** background effects.

## After Approval
Once a final direction (or hybrid) is chosen:
1. The chosen concept code will be extracted from `/design-lab/` and ported carefully into the real `src/components/landing/` components.
2. The real data hooks (`getRecommendedPath`, etc.) will be wired up.
3. Strict QA on accessibility and performance will be re-run on the production integrated version.
4. The `/design-lab/` folder will be safely deleted in a future cleanup PR.
