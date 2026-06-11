# Installation Log

## Preflight

- Ran `git status --short`, `git branch --show-current`, and `git log --oneline --decorate -10`.
- Read project configuration, routing, providers, CSS, `src/lib/utils.ts`, local Next.js 16 docs, `.codex/skills/ui-ux-pro-max/SKILL.md`, and `UX PROMAX.MD`.
- Generated UI/UX Pro Max design-system, UX, Next.js, and shadcn guidance.
- Recorded compatibility in `README.md` before package installation.

## Package and Registry Commands

| Command | Result |
| --- | --- |
| `npm install @heroui/react framer-motion` | First attempt timed out; the orphaned process was stopped. Retried with network approval and succeeded. Resolved HeroUI 3.1.0. |
| `npx shadcn@latest init ...` | Interactive/default attempts were corrected to the current CLI preset syntax. Final `nova` initialization succeeded. |
| `npx shadcn@latest add button card dialog tabs accordion sheet input label textarea select separator badge -y` | Succeeded; files isolated under `src/components/shadcn/ui`. |
| `npx shadcn@latest add @magicui/animated-gradient-text @magicui/word-rotate @magicui/shimmer-button @magicui/animated-grid-pattern -y` | Succeeded and added the Magic UI registry entry. |
| `npx shadcn@latest add @aceternity/...` | Combined request timed out. No force or overwrite was used. |
| `npm install motion @tabler/icons-react` | Command timed out after completing package updates; packages were verified in `package.json` and `node_modules`. |
| Individual Aceternity add commands | `bento-grid`, `background-beams`, and `card-hover-effect` each succeeded. Files were moved into `src/components/aceternity`. |

## Integration Decisions

- HeroUI v3 requires no `HeroUIProvider`; only its stylesheet is imported.
- Existing `MotionProvider`, custom theme initialization, `Button.tsx`, and RTL utilities were preserved.
- shadcn uses `radix-nova` because the current CLI no longer offers the historical `new-york` prompt. It matches existing Lucide and Geist usage.
- shadcn tokens were mapped to existing NexaLearn dark/light values.
- Registry components were separated by ownership to prevent naming and styling collisions.

## Dependencies Added

- `@heroui/react` 3.1.0
- `@tabler/icons-react` 3.44.0
- `class-variance-authority` 0.7.1
- `motion` 12.40.0
- `radix-ui` 1.5.0
- `shadcn` 4.11.0
- `tw-animate-css` 1.4.0

## Warnings and Recovery

- No `--force` or overwrite option was used.
- The initial shadcn run temporarily overwrote the existing button and removed RTL helpers. Those files were restored exactly; final Git comparison confirmed they are unchanged.
- The Aceternity combined add and dependency installation commands exceeded their tool timeout. Final package and component state was verified.
- Initial npm output reported two moderate issues while installation was incomplete. Final `npm audit --json` reported zero vulnerabilities.
- Browser-based visual QA was unavailable because the in-app `iab` backend was not present. HTTP verification succeeded for both locale routes.

## Validation Commands

- `npm run typecheck`: PASS
- `npm run lint`: PASS, 0 errors and 76 warnings
- `npm run build`: PASS
- `git diff --check`: PASS
- HTTP GET `/ar/ui-lab`: 200
- HTTP GET `/en/ui-lab`: 200
