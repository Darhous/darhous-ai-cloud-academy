# Security Audit

---

## Audit Scope
Code review only — no live testing, no attack simulation.

---

## Security Headers

**File:** `next.config.ts`

```
X-Content-Type-Options: nosniff                ✅
X-Frame-Options: DENY                           ✅
X-XSS-Protection: 1; mode=block               ✅
Referrer-Policy: strict-origin-when-cross-origin ✅
Permissions-Policy: camera=(), microphone=(), geolocation=() ✅
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload ✅
Content-Security-Policy (CSP):                 ❌ MISSING
```

**Critical gap:** No CSP header. Any injected script from XSS or third-party would execute without restriction. With Framer Motion, React PDF, and external fonts loaded, a CSP would be complex but is strongly recommended.

---

## Authentication

### Admin Route Protection
**File:** `src/app/[locale]/admin/page.tsx`
- Server-side: calls `getServerSession()` before rendering
- Checks `profile.role === "admin"`
- Redirects to login if not admin
- **Status: ✅ Correct**

### Dashboard Route Protection
**File:** `src/app/[locale]/dashboard/page.tsx`
- Server-side: calls Supabase auth
- Redirects if no user
- **Status: ✅ Correct**

### Admin API Routes
**File:** `src/lib/auth/admin.ts`
- All admin API routes call `verifyAdminRequest()`
- This creates a Supabase client with user session, checks `profiles.role === "admin"`
- Returns `{ user: null }` for non-admins → 401 response
- Uses `createClient()` (RLS-respecting) not admin client for role check
- **Status: ✅ Correct**

---

## Server-Only Imports

**Files:** Multiple in `src/lib/`
- `src/lib/supabase/admin.ts` — `import "server-only"` ✅
- `src/lib/rate-limit.ts` — `import "server-only"` ✅
- `src/lib/auth/admin.ts` — `import "server-only"` ✅
- `src/lib/content/read-with-fallback.ts` — `import "server-only"` ✅
- **Status: ✅ Server-only modules correctly guarded**

---

## Environment Variables

**File:** `.env.example` (reviewed)

Public env vars (safe to expose):
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `NEXT_PUBLIC_SITE_URL` ✅

Server-only env vars:
- `SUPABASE_SERVICE_ROLE_KEY` — used only in `src/lib/supabase/admin.ts` (server-only) ✅
- `GOOGLE_GEMINI_API_KEY` — used in AI route handlers ✅
- `RESEND_API_KEY` — used in email route ✅

**Risk:** If `SUPABASE_SERVICE_ROLE_KEY` ever leaks to a client bundle, it would grant full DB access bypassing RLS. The `import "server-only"` guard on admin.ts prevents this if the build is correct.

---

## Sensitive Data in Code

| Item | Location | Risk Level |
|------|----------|-----------|
| WhatsApp phone number `+201030002331` | `contact/page.tsx` | Low — public contact info |
| Email `ahmeddarhous@gmail.com` | `layout.tsx` JSON-LD | Low — public contact |
| Social media profiles | `contact/page.tsx`, `Footer.tsx` | Low — public |
| Supabase URL/anon key | `.env.example` (example only) | None |

---

## Supabase Usage

### Row Level Security (RLS)
- Assumed configured on Supabase side (not visible in local code)
- `createClient()` creates user-context client (RLS applies)
- `createAdminClient()` creates service-role client (bypasses RLS)
- Admin client only used in server-only admin routes
- **Status: Architecture is correct. RLS configuration on Supabase side unknown from code review alone.**

### Auth Pattern
- Supabase SSR auth via `@supabase/ssr`
- Cookie-based session handling in `src/lib/supabase/server.ts`
- `getUser()` called server-side for auth checks (not `getSession()` which is client-only)
- **Status: ✅ Using recommended Supabase SSR pattern**

---

## Content Rendering Risks

### Markdown/MDX Rendering
**Files:** `src/lib/mdx.ts`, blog detail pages use `next-mdx-remote`
- MDX components rendered from DB content could be XSS risk if arbitrary HTML is allowed
- `next-mdx-remote` sanitizes by default unless `allowDangerousHtml` is set
- **Risk: Medium** — need to verify MDX component whitelist

### HTML in Content
- Blog posts may contain HTML markup from content creators
- If stored as raw HTML in Supabase and rendered with `dangerouslySetInnerHTML`, XSS is possible
- **Status: Needs verification — code review shows MDX rendering but full HTML sanitization chain not confirmed**

---

## Upload Handling

- Avatar upload: `src/app/api/avatar/upload/route.ts` exists
- File type validation not visible in route code
- **Risk: Medium** — missing MIME type validation on upload could allow malicious files

---

## Rate Limiting

- `src/lib/rate-limit.ts` exists (server-only)
- Used on AI generation routes to prevent abuse
- **Status: ✅ Present for AI endpoints**

---

## AI Guard

- `src/lib/ai-guard.ts` exists
- Likely validates AI generation requests (prompt injection defense)
- **Status: Good — defensive layer exists**

---

## Admin Automation Safety

- `src/lib/automation/safety.ts` exists
- Validates automation workflow inputs
- **Status: Good**

---

## Security Verdict

| Category | Rating |
|----------|--------|
| Auth boundaries | ✅ Good |
| Admin route protection | ✅ Good |
| Server/client data separation | ✅ Good |
| Environment variable handling | ✅ Good |
| Security headers | ⚠️ Missing CSP |
| Upload handling | ⚠️ Needs validation |
| HTML content rendering | ⚠️ Needs review |
| Rate limiting | ✅ Present |
| RLS | ✅ Assumed (Supabase side) |

**Overall: 7/10 — Solid baseline, needs CSP and upload validation hardening**
