# UI Architecture & Scalability Audit

**Owner concern:** Interface is not easily developable.  
**Verdict:** **Not scalable** for hundreds/thousands of topics without structural refactor.

## Evidence

### Component duplication

| Pattern | Occurrences |
|---------|-------------|
| Portal hero + sections | Each portal page custom layout |
| Glass cards | `glass-panel`, `glass-panel-promax`, inline styles |
| List + filter clients | `*Client.tsx` per section (tools, glossary, iot, automation...) |
| CMS panels | Generic + specialized duplicates |

### Hardcoded content

| Area | Issue |
|------|-------|
| `portals.ts` | Features arrays Arabic-only |
| Cloud page | Inline sections array in page.tsx |
| Career jobs | MOCK_JOBS |
| Landing sections | Copy embedded in components |
| Showcase carousels | Duplicate item lists vs portals |

### Hardcoded colors

Portal `color`/`gradient` in `portals.ts` (good centralization) BUT hundreds of `rgba(...)` inline across landing and portals.

### Hardcoded portals

`portals.ts` is single source — **good**. Yet Navbar, Footer, landing, admin, sitemap each **manually** consume it; adding portal still requires editing multiple files.

### Repeated layouts

- `PortalPageWrapper`, `SectionHeader` exist but inconsistently used
- IoT/automation/digital-exams each own grid/list patterns

### Missing design system

No `src/ui` token package beyond CSS variables. Buttons: `glow-button-primary`, `MagneticButton`, raw `<button>` styles mixed.

### Inconsistent cards

`PortalCard`, ecosystem inline cards, `WhyDarhous` cards, carousel cards — four different card APIs.

### Content / data / UI coupling

- Pages import `src/data/*` directly
- `read-with-fallback.ts` merge logic duplicated per page type
- No shared `ContentListPage` abstraction

### Adding new portal cost

**~8–12 files** today: `portals.ts`, nav (manual), footer, landing sections?, new `page.tsx`, admin tab, cms-registry?, sitemap, metadata.

### Admin vs public sharing

Minimal shared models. Admin forms duplicate field shapes from `cms-fields.ts` but public types are separate interfaces in data files.

### Animations

`InteractiveSurface`, framer-motion variants copy-pasted per landing section. Not a shared `motionPresets.ts`.

### Landing over-coupling

`HomepageClient` imports 11 sections directly — no config-driven composition.

### RTL/LTR

Central `dir` on layout — **good**. Per-component RTL fixes scattered (chevron direction, etc.).

### Scale test: 1000 topics

| Concern | Would break? |
|---------|--------------|
| Static TS imports | Yes — bundle size |
| Per-page client components | Yes — no virtualization standard |
| Admin monolith | Yes — unusable |
| DB merge without pagination | Yes — list pages load all |

## Direct verdict

| Question | Answer |
|----------|--------|
| Scalable? | **No** |
| Why? | Monolith admin, duplicated clients, no design system, hybrid content without list/pagination architecture, portal addition manual |
| Refactor needed? | **Yes** — see plan below |

## Design-system refactor plan (summary)

1. **Tokens:** `src/styles/tokens.css` + TS export for colors/spacing/motion
2. **Primitives:** `Card`, `Button`, `Section`, `PageHero` with variants
3. **Content layer:** `ContentRepository` interface per type (static | supabase)
4. **Portal scaffold:** CLI or generator: portal → routes + admin tab + nav entry
5. **Landing composition:** `homepage-sections.config.ts` ordering
6. **Admin:** Continue panel extraction; generic form from schema
7. **Motion:** `usePremiumMotion()` + `InteractiveSurface` as sole tilt entry

See `production-repair-master-plan.md` Phase R1.
