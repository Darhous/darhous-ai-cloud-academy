# Build, Lint, Typecheck, and Code Health Audit

## Commands

| Command | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with 0 errors and 69 warnings |
| `npm run build` | Compiled; local completion inconclusive |
| `git diff --check` | Passed |

## Build Detail

The sandboxed build compiled successfully in 95 seconds and then failed with `spawn EPERM` during the post-compile phase. An approved outside-sandbox retry produced build artifacts and reached prerender output, but did not return within five minutes. Exact audited HEAD `94348be` passed GitHub CI run `27241835196`, so this is recorded as a local verification gap, not a confirmed source build failure.

## Lint Profile

The 69 warnings include:

- synchronous state updates inside effects;
- unused imports and variables;
- missing hook dependencies;
- unoptimized `<img>` elements;
- no-unused-expression findings;
- dead `OPEN_DELAY_MS` after the Smart Platform Tour trigger was commented out.

## Code Health

- `AdminDashboardClient.tsx` remains over 5,300 lines.
- The route surface is large: 88 pages and 65 route handlers.
- Several components and imports are unused.
- Existing CI success prevents classifying warning debt as a launch blocker, but the warning count should not be called “clean.”

