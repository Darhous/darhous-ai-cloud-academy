# Supabase Setup Guide — Darhous AI Cloud Academy

## 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **New Project**
3. Choose your organization and fill in:
   - **Name**: darhous-ai-cloud-academy
   - **Database Password**: (save this securely)
   - **Region**: choose closest to your users

## 2. Get Your API Keys

Go to **Project → Settings → API**:

| Variable | Where to find |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | "anon / public" key |
| `SUPABASE_SERVICE_ROLE_KEY` | "service_role" key (keep secret!) |

## 3. Create `.env.local`

```bash
# Copy from .env.example and fill in:
cp .env.example .env.local
```

Edit `.env.local`:
```env
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_SUPABASE_URL=https://your-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_SITE_URL=https://darhous-ai-cloud-academy.vercel.app
```

⚠️ **Never commit `.env.local`** — it is in `.gitignore`.

## 4. Run the Database Schema

1. Go to **Supabase → SQL Editor**
2. Open the file `supabase/schema.sql` from this project
3. Paste the entire content and click **Run**
4. All tables, RLS policies, and triggers will be created

## 5. Enable OAuth Providers

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable **Google Identity** API
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add Authorized redirect URI:
   ```
   https://your-ref.supabase.co/auth/v1/callback
   ```
6. Copy Client ID and Client Secret
7. In Supabase → **Authentication → Providers → Google**:
   - Enable Google
   - Paste Client ID and Client Secret
   - Save

### Apple Sign-In
1. Go to https://developer.apple.com
2. Create a **Services ID** (e.g., `com.darhous.ai.academy`)
3. Enable **Sign In with Apple** for this Services ID
4. Add your domain and return URL:
   ```
   https://your-ref.supabase.co/auth/v1/callback
   ```
5. Create a **Key** with Sign In with Apple enabled — download the .p8 file
6. In Supabase → **Authentication → Providers → Apple**:
   - Enable Apple
   - Fill in Services ID, Team ID, Key ID
   - Paste private key content from .p8 file
   - Save

### Add Site URL to Supabase
In **Authentication → URL Configuration**:
- **Site URL**: `https://darhous-ai-cloud-academy.vercel.app`
- **Redirect URLs**: `https://darhous-ai-cloud-academy.vercel.app/auth/callback`

## 6. Add Environment Variables to Vercel

1. Go to https://vercel.com → Your Project → **Settings → Environment Variables**
2. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL`
3. Redeploy the project

## 7. Promote a User to Admin

After a user registers, run this in **Supabase → SQL Editor**:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin@email.com';
```

Alternatively, use the Admin Dashboard (once you have admin access):
- Go to `/admin` → Users tab → click "Promote admin"

## 8. Verify Everything Works

| Feature | How to test |
|---------|-------------|
| Google login | `/ar/login` → Click "المتابعة باستخدام Google" |
| Apple login | `/ar/login` → Click "المتابعة باستخدام Apple" |
| Email login | `/ar/login` → Email + password form |
| Register | `/ar/register` → Create account |
| Student dashboard | `/ar/dashboard` (after login) |
| Admin dashboard | `/ar/admin` (after promoting to admin) |
| Community subscribe | Footer → email form |

## 9. RLS Security Summary

| Table | Who can read | Who can write |
|-------|-------------|---------------|
| profiles | Self + Admin | Self + Admin |
| course_progress | Self | Self |
| quiz_results | Self | Self |
| saved_prompts | Self | Self |
| favorite_items | Self | Self |
| community_subscribers | Admin only | Anyone (insert) |
| contact_messages | Admin only | Anyone (insert) |
| nano_banana_saved_prompts | Self | Self |
| admin_audit_logs | Admin | Admin |
| platform_settings | Admin | Admin |

## Security Rules

- ❌ Never share `SUPABASE_SERVICE_ROLE_KEY` — server only
- ❌ Never commit `.env.local`
- ❌ Never use service role key in client components
- ✅ All admin APIs verify role server-side
- ✅ RLS enabled on all tables
- ✅ No real credentials in source code
