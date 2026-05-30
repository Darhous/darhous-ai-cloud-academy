# 🚀 Deployment Guide — Darhous AI Cloud Academy
**Build Status:** ✅ PASSING (221 static pages, 0 TypeScript errors, 0 warnings)
**Last verified:** 2025-05-29 after Full Production Audit

## Option 1: Vercel (Recommended — Free)

### Step-by-step:

1. **Push to GitHub first** (see `GITHUB_RELEASE_GUIDE.md`)

2. **Go to [vercel.com](https://vercel.com)** → Sign up/in with GitHub

3. **Click "Add New Project"**

4. **Import your GitHub repository**: `darhous-ai-cloud-academy`

5. **Configure build settings** (Vercel auto-detects Next.js):
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next` (auto)

6. **Click "Deploy"** — Wait ~2 minutes

7. **Your site is live!** Vercel gives you a free `.vercel.app` URL

8. **Test your deployment:**
   - `https://your-app.vercel.app/ar` → Arabic home
   - `https://your-app.vercel.app/en` → English home

### Custom Domain (Optional):
- In Vercel dashboard → Settings → Domains
- Add your domain and follow DNS instructions

### Auto-deploy on push:
- Every `git push` to `main` automatically redeploys
- No manual action needed

---

## Option 2: Cloudflare Pages (Free Alternative)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repository
4. **Build settings:**
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node.js version: `20`
5. Click "Save and Deploy"

**Note:** Cloudflare Pages has limited Next.js App Router support. Vercel is strongly recommended for this project.

---

## Environment Variables

This project requires environment variables for the **AI Mentor** feature.

Create a `.env.local` file locally (already in `.gitignore`):
```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Get your Gemini API key at: https://aistudio.google.com/app/apikey

**In Vercel:** Settings → Environment Variables → Add `GEMINI_API_KEY` and `GEMINI_MODEL`.

⚠️ **NEVER commit `.env` files to GitHub!** The `.gitignore` already excludes them.
⚠️ **Never use `NEXT_PUBLIC_` prefix for `GEMINI_API_KEY`** — it must stay server-only.

---

## Common Deployment Errors

| Error | Fix |
|-------|-----|
| Build fails with TS error | Run `npm run build` locally first, fix errors |
| 404 on routes | Check that `[locale]` folder exists in `src/app/` |
| CSS not loading | Verify `globals.css` is imported in `layout.tsx` |
| Fonts not loading | Check Google Fonts URLs in `globals.css` |

---

## How to Update After Deployment

1. Make changes locally
2. Test with `npm run dev`
3. Build check: `npm run build`
4. Push to GitHub: `git add . && git commit -m "update" && git push`
5. Vercel auto-deploys within 2 minutes
