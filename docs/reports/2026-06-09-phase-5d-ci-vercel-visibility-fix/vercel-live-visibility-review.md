# Vercel Live Visibility Review

**Why was Phase 5D not visible on live Vercel?**

The deployment of code to Vercel production typically requires a successful build process. For this project, a failure in GitHub Actions CI (or a failure in the Vercel internal build phase due to ESLint checks) will block the deployment from going live. 

Because `npm run lint` failed due to the `dismiss` function scoping issue, the build failed. Consequently, Vercel aborted the deployment of commit `07b52f3` to production, maintaining the last stable version (Phase 5C) instead.

Once the CI failure is resolved with the new fix commit and pushed to `main`, the CI should pass, allowing Vercel to successfully build and deploy the Phase 5D changes.

Additionally, note that the Cinematic Intro uses `sessionStorage`, meaning it only plays once per session. To verify it on the live site, one must open a new Private/Incognito window or manually clear session storage.
