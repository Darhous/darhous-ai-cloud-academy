# Implementation Plan — Reference Redesign

## Phase Overview
Rebuild all 5 design-lab preview concepts using ahmedali.online as structural and UX reference.

## Step 1: Analysis (Completed)
- Deep analysis of ahmedali.online using WebFetch
- Extracted: 14 sections, interaction patterns, colors, typography, UX DNA
- Documented in: `reference-analysis.md`

## Step 2: Design System (Completed)
- Queried UI/UX Pro Max skill
- Design system: Glassmorphism + Dark OLED base
- Colors: NexaLearn CSS vars (primary #8ed5ff, secondary #d0bcff, background #0c0e12)
- Typography: System font stack + Cairo/Tajawal for Arabic
- Effects: backdrop-blur-md, bg-white/5, border border-white/10

## Step 3: Library Verification (Completed)
- Confirmed HeroUI v3 valid props (no color, no endContent)
- Confirmed shadcn/ui components available: ShimmerButton, WordRotate, AnimatedGradientText, AnimatedGridPattern
- Confirmed Aceternity: BackgroundBeams, BentoGrid, HoverEffect
- All imports verified against actual filesystem

## Step 4: Delete Old Concepts (Completed)
```bash
git rm -r src/app/[locale]/design-lab/homepage-concept-*
git rm -r src/components/design-lab/
```

## Step 5: Parallel Agent Build (In Progress)
5 agents launched simultaneously:
- Agent 1: reference-concept-1 (Reference Faithful)
- Agent 2: reference-concept-2 (Cinematic Enhanced)  
- Agent 3: reference-concept-3 (Arabic RTL Excellence)
- Agent 4: reference-concept-4 (SaaS/Education Platform)
- Agent 5: reference-concept-5 (High Conversion)

## Step 6: Index Page (After agents complete)
Create `/[locale]/design-lab/page.tsx` showing 5 new concepts

## Step 7: Validation
```bash
npm run typecheck  # Must pass (exit 0)
npm run lint       # Must pass
npm run build      # Must compile all 5 routes
git diff --check   # Must show no whitespace errors
```

## Step 8: Commit & Release
```bash
git add src/app/[locale]/design-lab/ src/components/design-lab/ docs/
git commit -m "feat: rebuild design lab from reference homepage analysis"
git push origin main
git tag checkpoint/reference-homepage-redesign-concepts-v1
git push origin checkpoint/reference-homepage-redesign-concepts-v1
gh release create checkpoint/reference-homepage-redesign-concepts-v1
```

## Concept Differentiation Matrix

| Aspect | C1 Faithful | C2 Cinematic | C3 Arabic RTL | C4 SaaS | C5 High-Conv |
|--------|------------|--------------|----------------|---------|--------------|
| Background | Dark glassmorphism | OLED black + beams | Dark + warm gold | Dark + gradient | Dark with urgency strip |
| Hero | Typography focus | BackgroundBeams + WordRotate | Arabic-first large | Product video mock | Social proof first |
| About | 2-col card | BentoGrid | Platform story AR | Feature bento | "What you get" grid |
| Portals | 6 glass cards | HoverEffect | RTL glass cards | HoverEffect | BentoGrid |
| Extra sections | N/A | N/A | N/A | Pricing tiers | FAQ + testimonials |
| CTA density | Medium | Medium | Medium | High (pricing) | Very High |
| Library weight | Balanced | Aceternity-heavy | Balanced | shadcn-heavy | Conversion-heavy |

## Risk Mitigation
- HeroUI invalid props: documented and excluded from all concepts
- framer-motion ease type: use `"easeOut" as const`
- Marquee: CSS keyframe animation (no external lib)
- RTL: `dir` prop on root div
- Images: no image imports (gradient divs + Lucide icons)
