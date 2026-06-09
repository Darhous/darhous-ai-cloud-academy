# Risk and Validation Plan

## Risks
1. **Draft Exposure**: Public pages accidentally querying without `status=published`.
2. **Admin UI Cache Leakage**: Admin controls or draft content cached globally by Next.js.
3. **Accidental Publish**: Defaulting to `published` instead of `draft`.
4. **Monolithic Regression**: Breaking existing admin tools while decomposing the dashboard.
5. **Static Fallback Masking Failure**: Supabase fails but the page silently uses old static data.

## Mitigations
- Enforce `.eq('status', 'published')` rigidly on all public fetches.
- Ensure admin queries explicitly opt out of CDN caching.
- Restrict publishing actions behind a confirmation dialog.
- Perform gradual UI extraction behind a `/admin-v2` route flag if needed.

## Validation Commands
```bash
git diff --check
npm run typecheck
```
*Note: `npm run lint` timed out in the previous readiness phase. Future checks must monitor linting time. `npm run build` should be attempted, but timeouts must be respected and noted.*

## Manual QA Checklist
- [ ] Verify all 29 admin tabs are reachable in the new shell.
- [ ] Test RTL alignment on mobile and desktop.
- [ ] Attempt to access the publish action with an anonymous session (should fail).
- [ ] Verify audit log is populated on publish.

## Role/Access Checklist
- Admin role successfully mutates content.
- Service Role limited strictly to internal backend tasks.
- Anonymous / Authenticated User blocked from mutating content.
