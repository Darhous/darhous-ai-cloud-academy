# Admin Guide — Darhous AI Cloud Academy

## Accessing the Admin Dashboard

URL: `/ar/admin` or `/en/admin`

Requirements:
- Must be logged in
- Profile role must be `admin`

### How to Get Admin Access

1. Register a normal account at `/register`
2. Run this in Supabase SQL Editor:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'your@email.com';
   ```
3. Sign out and sign back in
4. Navigate to `/admin`

## Admin Dashboard Tabs

### 1. Overview
Shows platform-wide stats:
- Total users
- Community subscribers
- New contact messages
- Admin count
- Content counts (courses, tools, prompts, Nano Banana)

### 2. Users
- Lists all registered users
- Search by email or name
- See each user's role and provider
- Promote any user to admin
- Demote admins back to student

**Security**: Role changes are saved to Supabase via the browser client. The user must hold an `admin` profile for this to work (RLS enforces it).

### 3. Community Subscribers
- Lists all newsletter subscribers
- Filter visible in table
- Export as CSV (client-side)
- Shows interest, locale, source

### 4. Contact Messages
- Lists messages submitted via contact form
- Messages appear here **if Supabase is configured** AND the contact form sends to the `/api/community` route
- Note: Current contact form uses FormSubmit for email delivery; Supabase messages come from the subscribe API
- Mark messages as read / archived

### 5. Content Overview
Quick view of all static content with item counts and links:
- Courses (from `src/data/courses.ts`)
- AI Tools (from `src/data/tools.ts`)
- Projects (from `src/data/projects.ts`)
- Blog Posts (from `src/data/blog.ts`)
- Prompts (from `src/data/prompts.ts`)
- Nano Banana prompts (from `src/data/nano-banana-prompts.ts`)

### 6. Settings
Placeholder for future platform settings via `platform_settings` table.

### 7. Audit Log
Shows entries from `admin_audit_logs` table.
Currently only populated when manually inserted via server actions.

## Role Routing Logic

| Condition | Redirect After Login |
|-----------|---------------------|
| `profile.role = 'admin'` | `/[locale]/admin` |
| `profile.role = 'student'` | `/[locale]/dashboard` |
| No profile | `/[locale]/dashboard` |

## Promoting / Demoting Users

### Via SQL (most reliable):
```sql
-- Promote
UPDATE public.profiles SET role = 'admin' WHERE email = 'user@example.com';

-- Demote
UPDATE public.profiles SET role = 'student' WHERE email = 'user@example.com';
```

### Via Admin Dashboard:
Users tab → find user → click "Promote admin" or "Demote"

## Security Architecture

- Admin route checks happen client-side via `useAuth()` hook
- Admin API routes (`/api/admin/*`) verify role server-side using the server Supabase client
- The admin Supabase client uses `SUPABASE_SERVICE_ROLE_KEY` — never exposed to browser
- RLS policies prevent non-admins from reading admin-only tables even if they call the API directly

## Adding Content

All content is file-based (no database for content):

| Content Type | File |
|-------------|------|
| Courses | `src/data/courses.ts` |
| Tools | `src/data/tools.ts` |
| Projects | `src/data/projects.ts` |
| Blog posts | `src/data/blog.ts` |
| Prompts | `src/data/prompts.ts` |
| Glossary | `src/data/glossary.ts` |
| Nano Banana prompts | `src/data/nano-banana-prompts.ts` |

After editing any data file: `git push` → Vercel auto-deploys in ~2 minutes.
