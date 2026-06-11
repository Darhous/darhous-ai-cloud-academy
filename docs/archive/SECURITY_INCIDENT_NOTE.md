# Security Incident Note

## Incident Summary

A Supabase database password was previously committed to source control inside
`CLAUDE_CONTINUATION_CONTEXT.md` (v2.2.0 context block). It appeared in the
public GitHub repository and was subsequently redacted from current source.

## Current Status

- Password **removed** from all current source files as of v2.7.0.
- Git history still contains the original commit — **manual rotation is required.**

## Required Manual Actions

1. **Rotate the Supabase database password immediately:**
   - Go to: https://supabase.com/dashboard/project/kzbdmyovspkbakbtvgig/settings/database
   - Reset the database password.
   - The leaked password is now invalid after rotation.

2. **Optional — Git history cleanup (requires owner approval):**
   - Use `git filter-repo` or BFG Repo Cleaner to rewrite history.
   - Force-push is required to overwrite the public branch.
   - This is destructive — confirm before proceeding.

## Rules Going Forward

- Never store secrets, passwords, or API keys in any `.md`, `.txt`, or documentation file.
- Never store real secrets in files tracked by git.
- All secrets must live in environment variables (Vercel dashboard, `.env.local`).
- `.env.local` is in `.gitignore` and must never be committed.
- `.env.example` contains only placeholder values (no real secrets).

## Files That Must Never Contain Real Secrets

- `CLAUDE_CONTINUATION_CONTEXT.md`
- `README.md`
- `DEPLOYMENT_GUIDE.md`
- `SUPABASE_SETUP.md`
- `ADMIN_GUIDE.md`
- Any other `.md` or documentation file
