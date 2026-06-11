# Homepage Total Redesign — Discovery Report

**Date:** 2026-06-11
**Project:** NexaLearn by Darhous / Darhous AI Cloud Academy
**Phase:** Discovery Report Only — No Production Code Changed
**Branch:** main
**HEAD:** `56eb6d5`

---

## Purpose

This report captures a full multi-agent discovery audit of the current homepage before any redesign work begins. Its purpose is to:

1. Verify that all five UI/design sources are present and operational.
2. Extract a complete content inventory so nothing is lost during redesign.
3. Identify every UX, IA, visual, and motion problem in the current homepage.
4. Define how the five UI sources should be used in the new design.
5. Propose genuinely different design directions.
6. Plan the preview phase (preview routes, not production replacement).
7. Define agent work allocation for the preview build phase.

---

## Current Homepage Summary

The homepage is assembled in `src/components/landing/HomepageClient.tsx` and renders **15 sections** in this order:

1. CinematicIntro (4.4s blocking overlay)
2. SmartPlatformTour (auto-opens 2.4s after intro clears — second blocking overlay)
3. HeroSection (rotating word + 3 CTAs to the same destination + TechMarquee with 20 rows)
4. MarqueeStrip (portal names)
5. ScrollStackSection (sticky portal cards — flagged broken in June 2026 audit)
6. MarqueeStrip 2 (repeats portal names, swaps locale)
7. Premium3DShowcaseCarousel (13 feature cards)
8. PathSelector (4-quiz gate before first /register CTA)
9. EcosystemMap (portals shown a 4th time)
10. MentorShowcase
11. HowItWorks (4 steps — should be section 3, is section 10)
12. WhyNexaLearn (8 feature tiles)
13. Stats + FinalCTA
14. CommunitySignup
15. Footer

**Total CTAs:** 22 across the page, 35+ if counting all clickable elements.
**Portal references:** Portals appear 4 separate times with no escalating depth.
**Estimated page height:** ~9,000–11,000px on desktop.

---

## Was This a Redesign Implementation Phase?

**No.** This is a discovery and report phase only.

---

## Was Production Code Changed?

**No.** Zero production files were modified. Zero commits were made by this phase.

---

## Were the Five UI/Design Sources Found?

| Source | Found? | Summary |
|--------|--------|---------|
| UI/UX Pro Max Skill | ✅ Yes | `.codex/skills/ui-ux-pro-max/SKILL.md` — 67 styles, 96 palettes, 99 UX guidelines |
| UX PROMAX.MD | ✅ Yes | Root-level proposal doc with 7 homepage failure signatures |
| HeroUI | ✅ Yes | `^3.1.0` in package.json — **HeroUIProvider NOT yet in layout** |
| shadcn/ui | ✅ Yes | `components.json` confirmed, 16 components at `src/components/shadcn/ui/` |
| Magic UI | ✅ Yes | 4 components co-located in shadcn/ui folder |
| Aceternity UI | ✅ Yes | 3 components at `src/components/aceternity/` |

---

## High-Level Verdict

The current homepage has a conversion score of **61/100** (from the June 2026 visual audit). The problems are structural, not cosmetic:

- The funnel is **inverted** — portals appear before trust is established.
- Two **blocking overlays** fire in sequence on first visit.
- **22 CTAs** with no hierarchy; the primary conversion action (/register) appears only after a 4-quiz gate.
- Portals are shown **4 times** with no depth escalation.
- **TechMarquee** creates 320 simultaneously animating DOM nodes.
- `MotionProvider reducedMotion="never"` globally overrides OS accessibility preferences — a **WCAG 2.3.3 violation**.
- The page cannot be polished into a good homepage. It must be restructured.

---

## Recommended Next Action

**Preview Phase** — Build 5 separate homepage concepts under `/[locale]/design-lab/homepage-concept-N` routes, each implementing one of the 5 proposed directions. Do not replace the production homepage until owner approval.

Suggested first concept to build: **Concept 3 — "Silent Authority" (Minimal Trust-First SaaS Landing)** — lowest complexity, validates the shared foundation, and directly addresses the most critical UX failures.

---

## Report Files

| File | Agent | Description |
|------|-------|-------------|
| `foundation-and-library-verification.md` | Agent 1 | Five sources verification, paths, versions, risks |
| `current-homepage-content-inventory.md` | Agent 2 | 15 sections, 22 CTAs, preservation map |
| `homepage-ux-problems.md` | Agent 3 | UX/IA/conversion analysis, 4 critical issues |
| `visual-and-motion-audit.md` | Agent 4 | 24 animations audited, WCAG violation, visual identity |
| `five-source-redesign-strategy.md` | Agent 4 | How each library should be used, Red Lines table |
| `redesign-opportunity-map.md` | Agent 5 | New 9-section homepage architecture |
| `redesign-directions-brief.md` | Agent 5 | 5 distinct homepage design concepts |
| `preview-phase-plan.md` | Agent 5 | design-lab routes, acceptance checklist |
| `agent-work-allocation.md` | Agent 5 | 6 agents + integration agent for preview phase |
| `summary.json` | Main | Machine-readable summary of all findings |

---

## Untracked Files (Do Not Commit)

Two temporary log files exist at the project root:
- `ui-lab-server.stdout.log` (185 bytes, safe residue from foundation setup)
- `ui-lab-server.stderr.log` (0 bytes, empty)

**Recommendation:** Delete these before the next commit. Awaiting owner approval.
