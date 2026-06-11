# 📦 GitHub Release Guide — Darhous AI Cloud Academy

## Step 1: Initialize Git

```bash
cd "C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
git init
git branch -M main
```

## Step 2: Create Your First Commit

```bash
git add .
git commit -m "feat: initial release of Darhous AI Cloud Academy v1.2.0

- Bilingual Arabic/English platform (RTL/LTR, Dark/Light mode)
- 14 pages: Home, Courses, Paths, Tools, Claude, Cloud, Projects,
  Prompts, Blog, Glossary, About, Contact, Dashboard, AI Mentor
- 213 static pages generated
- 18 course tracks, 40+ AI tools, 14 projects, 25 prompts
- AI Mentor powered by Gemini 2.5 Flash (6 specialized modes)
- Server-side API route — GEMINI_API_KEY never exposed to frontend
- Command Palette (Ctrl+K), Favorites, Quizzes, Floating Mentor button
- Glass morphism design system
- Ready for Vercel deployment (add GEMINI_API_KEY in Vercel env vars)"
```

> ⚠️ Before pushing: Make sure `.env.local` is in `.gitignore` (it is already).
> Never push your GEMINI_API_KEY to GitHub.

## Step 3: Create GitHub Repository

### Option A: GitHub CLI (if installed)
```bash
gh auth login
gh repo create darhous-ai-cloud-academy --public --push --source=.
```

### Option B: GitHub Website
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `darhous-ai-cloud-academy`
3. Description: `Arabic AI & Cloud Learning Academy — أكاديمية درهوس للذكاء الاصطناعي`
4. Set to **Public**
5. **Do NOT** check "Add README" (you already have one)
6. Click **Create repository**

### Option C: GitHub Desktop
1. Open GitHub Desktop
2. File → Add Local Repository → Select the folder
3. Publish Repository → Name it `darhous-ai-cloud-academy`

## Step 4: Push to GitHub (if using Option B)

```bash
git remote add origin https://github.com/YOUR_USERNAME/darhous-ai-cloud-academy.git
git push -u origin main
```

## Step 5: How to Update Later

```bash
# Make your changes
git add .
git commit -m "update: description of changes"
git push
```

## Git Safety Checklist

✅ `.gitignore` excludes `node_modules/`, `.next/`, `.env*`
✅ `.env.local` contains your real `GEMINI_API_KEY` — protected, will NOT be pushed
✅ `.env.example` has only `your_gemini_api_key_here` placeholder — safe to push
✅ No API keys hardcoded in source files
✅ No secrets committed
✅ `README.md` is complete and describes the project

> After deploying to Vercel, add `GEMINI_API_KEY` in:
> Vercel Dashboard → Project Settings → Environment Variables

## After Pushing: Deploy to Vercel

See `DEPLOYMENT_GUIDE.md` for the full deployment walkthrough.

**Quick summary:**
1. Go to [vercel.com](https://vercel.com)
2. Import `darhous-ai-cloud-academy` from GitHub
3. Framework: Next.js (auto-detected)
4. Click Deploy
5. Your site goes live at `https://darhous-ai-cloud-academy.vercel.app`
