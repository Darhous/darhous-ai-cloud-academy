# UI/UX Pro Max Redesign Strategy

## Skill Output Applied

UI/UX Pro Max recommended:

- high-contrast editorial minimalism;
- restrained brand + white/light surface + accent palette;
- Noto Naskh Arabic/Noto Sans Arabic for premium Arabic readability;
- visible focus, keyboard navigation, breadcrumbs, and deep linking;
- reduced-motion support;
- transform/opacity animation;
- Server Components by default with client components pushed downward.

The raw skill suggestion included “Liquid Glass,” but the current project already overuses glass. The project-specific decision is to retain glass only as a selective accent, not the base surface.

## Design Principles

1. Content first, effects second.
2. One dominant action per section.
3. Portal identity through accent color, not entirely different visual systems.
4. Calm surfaces and strong typography.
5. Motion communicates sequence, hierarchy, or state.
6. Arabic is a first-class layout, not a mirrored afterthought.
7. Operational pages optimize clarity over spectacle.

## Foundations

### Spacing

Retain the existing 4px token scale, but enforce:

- page section gap: 80-120px marketing, 48-64px portals, 24-32px dashboards;
- card padding: 20/24/32px tiers;
- content max width: one consistent 1200-1280px shell;
- reading width: 680-760px;
- no dense four-column grids below 1280px.

### Typography

- Arabic display/editorial: evaluate Noto Naskh Arabic for selected hero/editorial headings.
- Arabic UI/body: Noto Sans Arabic or existing IBM Plex Sans Arabic.
- English editorial heading: Newsreader or a restrained premium serif.
- English UI: Geist/Inter.
- Monospace only for code, IDs, compact metadata, and command UI.

### Color

- Base light: warm white/off-white with near-black text.
- Base dark: deep neutral, not blue-black everywhere.
- Primary CTA: high-contrast brand cyan/blue or a refreshed single accent.
- Mint highlight: interaction, positive state, selected markers.
- Portal accents remain, but backgrounds stay neutral.
- Status colors always include icon/text.

## Component System

### Cards

1. Editorial card: image/title/summary/CTA, minimal border.
2. Utility card: compact icon, metric, action.
3. Learning card: progress and next action.
4. Admin record row: status, validation, owner/date, overflow actions.
5. Feature spotlight: larger storytelling surface with selective depth.

Remove default glow, blur, and gradient from ordinary cards.

### Buttons

- Primary: solid high contrast.
- Secondary: bordered neutral.
- Tertiary: text/icon.
- Destructive: isolated, never visually equal to primary.
- Stable hover; avoid layout-shifting scale.

## Page-Level Recommendations

### Homepage

Files: `HomepageClient.tsx`, `landing/sections/*`.

- Reduce the number of competing hero messages.
- Replace OS-dashboard mockup prominence with one editorial value proposition and a guided portal selector.
- Use one motion-led section, not motion in every section.
- Convert portal grid into grouped discovery: Learn, Build, Advance, Test.
- Move dense platform tour lower.

### Portal Pages

Files: portal page routes, `PortalIdentityIntro.tsx`.

- Standardize hero anatomy, breadcrumb, purpose, primary CTA, and three key stats.
- Use portal accent for rules, labels, and selected states.
- Reduce repeated glass cards.
- Add content-type navigation with clear counts and empty states.

### Content Pages

- Strong reading hierarchy.
- Sticky table of contents only for long content.
- Related content based on type and portal.
- Clear next action.
- Visible source/status only in Admin Mode.

### Student Dashboard

- “Continue learning” and next action first.
- Move secondary widgets below.
- Use progressive disclosure for certificates, saved items, and analytics.

### Admin

Implement the grouped CMS shell from report 04 before visual styling.

## State System

Create shared:

- skeletons for card/list/detail;
- localized empty-state component;
- localized error/retry component;
- no-results state;
- permission denied state;
- offline/degraded state;
- draft/published/archived badges.

## Accessibility and RTL

- Keep global focus-visible and reduced-motion foundations.
- Audit heading sequence.
- Replace decorative emoji icons with Lucide/custom SVG in product UI.
- Preserve culturally familiar emoji only as content, not controls.
- Ensure Arabic line-height and heading wrapping.
- Use `dir="ltr"` for code, URLs, IDs, and JSON.
- Test 375, 768, 1024, and 1440px in both languages and themes.

## Avoiding an AI-Generated Look

- Fewer gradients and glowing pills.
- Fewer generic “feature cards.”
- More art direction, asymmetry, editorial rhythm, and real screenshots/content.
- Consistent icon family.
- Shorter copy.
- Fewer decorative badges.
- No simultaneous orb + grid + glass + gradient text + marquee on every page.

## Performance

- Keep static content in Server Components.
- Dynamically load story-specific motion.
- Avoid canvas and GSAP on admin/forms/exams.
- Measure bundle size before and after motion work.
- Prefer CSS/Framer for simple transitions; reserve GSAP for coordinated narrative sequences.
