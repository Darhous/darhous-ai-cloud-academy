# Contributing

Thank you for helping improve Darhous AI Cloud Academy.

## Workflow

1. Fork the repository.
2. Create a focused branch from the latest `main`.
3. Keep changes scoped to one clear purpose.
4. Add or update relevant tests and documentation.
5. Open a pull request with a clear summary and verification notes.

For major product, architecture, portal, or data-model changes, open an issue or proposal before implementation.

## Project Standards

- Never commit secrets, API keys, credentials, or private user data.
- Do not commit `.env.local` or modify environment files in a pull request.
- Preserve Arabic and English localization behavior.
- Verify both RTL and LTR layouts for user-interface changes.
- Keep authentication and access-control implications explicit.
- Avoid unrelated refactoring or generated-file churn.

## Required Checks

Run these commands before submitting a pull request:

```bash
npm run typecheck
npm run lint
npm run build
```

Describe what changed, why it changed, how it was tested, and any follow-up work. Include screenshots for visual changes.
