# Library Usage Matrix — Reference Redesign

## Governing Principle
Every concept MUST use all 5 sources. Usage must be functional, not decorative imports.

---

## UI/UX Pro Max Skill — How Used as Visual Governor

The skill was queried before implementation with:
1. `"AI education platform SaaS learning cloud academy Arabic" --design-system` → Design system: Glassmorphism + Dark OLED
2. `"landing page hero social-proof marquee" --domain landing` → Section order, CTA placement strategy
3. `"glassmorphism dark elegant professional" --domain style` → Visual style: dark OLED (#000000/#0c0e12), subtle glows, backdrop-blur
4. `"animation micro-interaction accessibility" --domain ux` → Reduced-motion mandatory, ease-out transitions, no continuous animation on decorative elements

**Findings applied across all concepts:**
- Dark background (#0c0e12 / OLED black for Concept 2)
- Glassmorphism cards: `bg-white/5 backdrop-blur-md border border-white/10`
- Ease-out on all entering animations, ease-in on exit
- Reduced motion: `useReducedMotion()` in every concept
- CTA placement: Hero + Mid-page + Footer (3 CTA positions per concept)
- Social proof before CTA (Trusted By before first CTA repetition)

---

## Library Usage by Concept

### Concept 1 — Reference Faithful

| Library | Component/Feature | Where Used | Why |
|---------|-------------------|------------|-----|
| **UI/UX Pro Max** | Design system decision | Hero layout, section order, CTA placement, glassmorphism style choice | Governs all visual decisions |
| **HeroUI** | `Button` (variant="primary", "outline", "ghost") | Navbar CTA, How It Works CTAs, Portal cards | Valid v3 API, clean button with variants |
| **shadcn/ui** | `ShimmerButton` | Hero primary CTA "Start Journey" | Eye-catching primary CTA |
| **shadcn/ui** | `AnimatedGradientText` | Brand name in hero | Adds visual identity to brand mark |
| **shadcn/ui** | `AnimatedGridPattern` | About section background | Subtle tech texture without performance cost |
| **shadcn/ui** | `WordRotate` | Hero rotating value words | Dynamic headline without layout shift |
| **Magic UI** | `ShimmerButton` (also Magic UI) | Footer final CTA | Maximum CTA impact at conversion point |
| **Aceternity** | `BentoGrid, BentoGridItem` | Portals section grid | Rich portal cards with proper grid |
| **Aceternity** | `BackgroundBeams` | Hero background | Adds depth and premium feel to hero |

---

### Concept 2 — Cinematic Enhanced

| Library | Component/Feature | Where Used | Why |
|---------|-------------------|------------|-----|
| **UI/UX Pro Max** | OLED dark mode guidance | Pure black (#000) sections for maximum contrast | Cinematic = maximum contrast between dark and light |
| **HeroUI** | `Button` variants | Navbar, section CTAs | Consistent button API |
| **shadcn/ui** | `ShimmerButton` | Hero + Footer CTAs | Primary conversion points |
| **shadcn/ui** | `WordRotate` | Hero headline rotation | "Learn · Build · Grow · Certify" |
| **shadcn/ui** | `AnimatedGradientText` | Brand name + section titles | Cinematic gradient text effects |
| **shadcn/ui** | `AnimatedGridPattern` | About section + background texture | Grid adds cinematic sci-fi feel |
| **Aceternity** | `BackgroundBeams` | Hero full background | Maximum cinematic impact |
| **Aceternity** | `BentoGrid, BentoGridItem` | About/Features as bento | Structured information with visual hierarchy |
| **Aceternity** | `HoverEffect` | Portals grid | Interactive portal exploration |

---

### Concept 3 — Arabic RTL Excellence

| Library | Component/Feature | Where Used | Why |
|---------|-------------------|------------|-----|
| **UI/UX Pro Max** | Accessibility + reduced-motion rules | All animations gated by useReducedMotion | Arabic users often on older devices |
| **HeroUI** | `Button` (variant="primary", "ghost") | Navbar "سجل مجاناً", section CTAs | Clean Arabic-friendly button |
| **shadcn/ui** | `ShimmerButton` | Hero CTA "ابدأ رحلتك الآن" | Visually distinct primary CTA |
| **shadcn/ui** | `WordRotate` | Hero rotating Arabic words | RTL-aware rotation: تعلّم · ابنِ · احترف · تميّز |
| **shadcn/ui** | `AnimatedGradientText` | Arabic headline accent | Gold/blue gradient on key Arabic words |
| **shadcn/ui** | `AnimatedGridPattern` | About platform section | Arabic content needs clean background |
| **Aceternity** | `BackgroundBeams` | Hero | Premium Arabic educational feel |
| **Aceternity** | `BentoGrid, BentoGridItem` | Learning portals | RTL-compatible grid |
| **Aceternity** | `HoverEffect` | Featured paths | RTL hover interaction |

---

### Concept 4 — SaaS/Education Platform

| Library | Component/Feature | Where Used | Why |
|---------|-------------------|------------|-----|
| **UI/UX Pro Max** | Landing page social-proof pattern | Trusted By before portals, testimonials before pricing | Conversion psychology: trust then ask |
| **HeroUI** | `Button` | Navbar "Sign In" + section buttons | SaaS products need clean secondary actions |
| **shadcn/ui** | `ShimmerButton` | Hero + Pricing tier CTAs | Multiple conversion points |
| **shadcn/ui** | `AnimatedGradientText` | "The AI-Powered Learning Platform" hero title | Product headline with premium feel |
| **shadcn/ui** | `AnimatedGridPattern` | Platform features section bg | SaaS product feel |
| **shadcn/ui** | `Card, CardHeader, CardContent` | Pricing tier cards | Structured pricing comparison |
| **Aceternity** | `BackgroundBeams` | Hero | Dramatic product hero |
| **Aceternity** | `BentoGrid, BentoGridItem` | Platform features overview | Product feature grid (like Vercel/Linear) |
| **Aceternity** | `HoverEffect` | Learning portals | Interactive portal browsing |

---

### Concept 5 — High Conversion

| Library | Component/Feature | Where Used | Why |
|---------|-------------------|------------|-----|
| **UI/UX Pro Max** | CTA placement: Hero + mid-page + footer | 3 ShimmerButton positions, FAQ section, urgency strip | Maximum conversion optimization |
| **HeroUI** | `Button` (outline, ghost) | Secondary CTAs, FAQ toggles | Non-primary actions don't need shimmer |
| **shadcn/ui** | `ShimmerButton` | 3 conversion CTAs (hero, mid-page, footer) | The primary action must always stand out |
| **shadcn/ui** | `WordRotate` | Hero headline power words | "Learn · Certify · Get Hired" rotation |
| **shadcn/ui** | `AnimatedGradientText` | Urgency headline | "Stop waiting." with gradient |
| **shadcn/ui** | `AnimatedGridPattern` | Mid-page CTA section background | Texture behind most important CTA |
| **Aceternity** | `BackgroundBeams` | Hero | Attention-capturing hero bg |
| **Aceternity** | `BentoGrid, BentoGridItem` | "What you get inside" features section | Feature grid with visual hierarchy |
| **Aceternity** | `HoverEffect` | Portal/service cards | Keep scrollers engaged |

---

## Verification Checklist

| Concept | UI/UX Pro Max ✓ | HeroUI ✓ | shadcn ✓ | Magic UI ✓ | Aceternity ✓ |
|---------|-----------------|----------|-----------|------------|--------------|
| 1 — Reference Faithful | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 — Cinematic Enhanced | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 — Arabic RTL | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 — SaaS Platform | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5 — High Conversion | ✅ | ✅ | ✅ | ✅ | ✅ |
