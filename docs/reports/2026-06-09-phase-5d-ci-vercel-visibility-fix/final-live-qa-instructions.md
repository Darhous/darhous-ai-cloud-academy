# Final Live QA Instructions

To verify the Phase 5D Cinematic Intro and Auto-Tour disablement live on Vercel:

1. **Wait for Deployment**: Wait approximately 2-3 minutes for the new commit (`checkpoint/phase-5d-ci-vercel-visibility-fix-v1`) to successfully build and deploy on GitHub Actions / Vercel.
2. **Open Incognito/Private Window**: Open a new Private/Incognito browser window. This ensures your `sessionStorage` is empty, as the intro only plays once per session.
3. **Check Motion Preferences**: Ensure your OS/browser does not have "reduced motion" enabled, as the intro will gracefully bypass if it is.
4. **Visit the Site**: Navigate to the live homepage (e.g., `/ar` or `/en`).
5. **Observe**:
   - You should see the premium "NexaLearn by Darhous" glowing cinematic intro fade in and out.
   - You should NOT see the intrusive Auto-Tour popup appear.
6. **Verify Commit**: You can verify the latest commit hash via the Vercel deployment logs or GitHub Actions to ensure the fix commit is indeed the one that deployed successfully.
