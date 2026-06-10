# Security Audit (Code Review Only)

No live penetration testing performed.

## Summary verdict

**High risk in certificates and CMS delete paths.** Auth boundaries for admin generally present. No service role key in client bundles found.

| Area | Risk |
|------|------|
| Auth boundaries | Medium |
| Admin access | Medium |
| Certificate APIs | **High** |
| CMS publishing | **High** |
| Client secrets | Low |
| XSS | Medium |
| Upload | Medium |

## Auth boundaries

| Route class | Protection |
|-------------|------------|
| `/admin` | Role gate |
| `/api/admin/*` | Server admin checks (verify per route) |
| `/dashboard` | Client + server session |
| Public CMS read | Supabase RLS + `published` filter |

## Admin assumptions

- Admin role from Supabase user metadata
- Generic CMS DELETE available to admin — **excessive**

## Protected routes

`proxy.ts` / middleware pattern for session refresh. Admin not exposed in public nav for non-admins.

## Server/client exposure

| Variable | Exposure |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public — OK |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public — OK with RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only — used in `lib/supabase/admin.ts`, email, certificates |
| Login page displays env var **names** | Low info leak |

## Certificate endpoints (HIGH)

Per prior comprehensive audit and code paths:

- PDF/verify routes may use service-role without ownership check
- GET handlers may mutate certificate IDs
- IDOR risk: guessable cert codes

**Production blocker: yes**

## CMS publishing risks

- Hard DELETE on registry tables
- PATCH status rejection causes admins to work around via wrong APIs
- Some create routes default `published`

## XSS

| Surface | Risk |
|---------|------|
| Blog MDX | Moderate — depends on MDX allowlist |
| `dangerouslySetInnerHTML` JSON-LD | Low — structured data |
| Mentor chat | Plain text pre-wrap — lower |
| User-generated blog | Admin-only create — medium |

## Upload

`api/avatar/upload` — uses anon key with auth; review size/type validation in route (not fully expanded in audit).

## Form validation

Client-side primary on many forms; server validation varies by API route.

## Error leakage

Some API routes return raw error messages — medium.

## RLS assumptions

Docs state `published` filter on public reads. Tier-A drafts hidden — **if RLS correct**. Not verified against live DB in this audit.

## Recommendations (plan only)

1. Certificate APIs: auth + POST-only mutations
2. Disable CMS DELETE or archive-only
3. Fix status/lifecycle API contract
4. Audit all `createAdminClient()` call sites
5. MDX sanitization review
6. Remove env var names from login page UI
