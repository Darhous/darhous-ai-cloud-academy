# UX and Navigation Review

## Information Architecture

The current navigation exposes product inventory rather than user intent. Users see Home, Paths, Tools, Claude, Projects, Blog, Portals, AI Studio, search, theme, language, and auth. The portal and AI Studio dropdowns add 20 destinations.

UI/UX Pro Max Enterprise Gateway guidance supports a mega-menu, but only when categories and roles are clear. The current menus are flat lists.

## Recommended Top-Level Model

- **Learn:** Paths, Courses, AI Academy, Cloud.
- **Practice:** Projects, Exams, Language Assessment, IoT Lab.
- **Career:** Career Hub, Certificates, Profile.
- **Explore:** Tools, Prompts, Blog, Glossary, all AI Studio utilities.

Keep search, language, theme, and account as utilities.

## Navbar

Strengths:

- Active-state indicators.
- Dropdown buttons have `aria-expanded` and `aria-haspopup`.
- Brand has an accessible label.
- Mobile navigation exists.

Gaps:

- Hover opens desktop dropdowns, increasing accidental activation.
- Emoji remain in both dropdowns.
- Dense desktop navigation only fits at large widths.
- “Darhous Portals” conflicts with NexaLearn branding.
- Route-change state resets trigger lint warnings.

## Footer

The four-column structure is appropriate and includes community signup, portal links, AI Studio, legal links, social links, and creator attribution. It is too long on mobile because it mirrors the same broad inventory as the navbar. Use accordion groups on mobile and remove secondary AI utilities.

Social icon circles are 36px, below the 44px mobile rule.

## User Journeys

### New learner

Hero → portal overload → path selector. The user should first choose a goal, then receive a recommended portal/path.

### Returning learner

Account/dashboard visibility is good, but “My Darhous Hub” breaks identity continuity.

### Assessment user

Language and exams have strong direct CTAs. Clarify account requirements before test start and preserve result recovery.

### Certificate verifier

Verification is direct but issuer naming is inconsistent. Trust surfaces must use the canonical brand/legal issuer.

## Language Switching

The shell correctly changes `lang` and `dir`. Route content is not consistently locale-pure. Switching language on Career, Automation, or IoT can retain Arabic RTL content, which is a launch blocker.

## Missing Navigation Cues

- Breadcrumbs are not consistently used on deep automation/IoT routes.
- Portal-local navigation is inconsistent.
- Cloud is absent from portal discovery.
- No “continue learning” deep link is visible in public navigation.
- Error/404 recovery does not preserve locale.
