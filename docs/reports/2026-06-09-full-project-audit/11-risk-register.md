# Risk Register

| ID | Risk | Severity | Likelihood | Evidence | Mitigation |
|---|---|---|---|---|---|
| R01 | Draft exposure through future wiring | Critical | Medium | 600 production drafts | published-only query + RLS + auth tests |
| R02 | Admin UI cache leakage | Critical | Medium | inline controls requested; cached public routes possible | hybrid dynamic admin boundary |
| R03 | Accidental publish default | High | Medium | several create APIs default to `published` | Tier-A actions default draft; explicit transition |
| R04 | Monolithic admin regression | High | High | 5,277 lines, 29 tabs | shell decomposition with behavior-preserving migration |
| R05 | Unverified production build | High | Medium | EPERM then timeout | CI/Vercel clean build gate |
| R06 | No automated tests | High | High | no test files found | add auth/content/route smoke tests |
| R07 | Static fallback masks DB failure | High | High | helper returns empty and pages use static data | observability and source-aware tests |
| R08 | DB/static duplicate content | High | Medium | merge by ID | canonical ID contract |
| R09 | Stale count documentation | Medium | High | 180/260 vs 210/230 | reconcile docs and source report |
| R10 | Route transition/error UX gaps | Medium | High | no special route files | shared loading/error/not-found |
| R11 | Broken/suspicious CTA | Medium | Confirmed | project build button no action | link to build route |
| R12 | Indexed thin blog content | Medium | Medium | “Full content coming soon” | complete, noindex, or remove from sitemap |
| R13 | RTL admin navigation failure | High | Medium | horizontal overflow tabs | logical sidebar and RTL QA |
| R14 | Motion overload/performance | Medium | High | many continuous animations and client motion | motion budget and reduced-motion tests |
| R15 | Accessibility regressions in dialogs | High | Medium | custom modals/panels | focus trap/restore and screen-reader QA |
| R16 | External AI feature failure | High | Medium | env/API dependency | missing-key states and production smoke tests |
| R17 | Sitemap misses DB-only content | Medium | High after publication | static data imports | query published rows at sitemap generation |
| R18 | Custom-domain canonical mismatch | Medium | Medium | hardcoded Vercel base | single site URL config |
| R19 | Unauthorized mutation | Critical | Low/Medium | many admin endpoints; mixed patterns | centralized verifier + RLS + allowlists |
| R20 | Service-role misuse | Critical | Low | admin client bypasses RLS | server-only, narrow use, audit |
| R21 | Deferred schema collision | High | Medium | tools/nano deferred SQL | keep frozen until Phase H |
| R22 | Bulk publish blast radius | Critical | Medium if added early | 600 records | postpone bulk publish |
| R23 | Insufficient audit history | High | High | preview only; mixed audit patterns | immutable lifecycle events |
| R24 | Lint debt hides new defects | Medium | High | 51 warnings | baseline and drive to zero/high-confidence allowlist |
| R25 | Client bundle/hydration cost | Medium | High | large client admin and motion components | server-first decomposition, bundle analysis |

## Risk Acceptance Rules

- Critical risks cannot be accepted for launch without explicit owner and mitigation evidence.
- High risks require a tested mitigation or documented operational workaround.
- “Needs live/manual verification” is not equivalent to passed.
- Deferred schemas remain outside implementation scope until a separate architecture decision.
