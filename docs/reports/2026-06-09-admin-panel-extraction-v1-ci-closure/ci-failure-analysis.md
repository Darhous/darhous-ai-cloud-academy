# CI Failure Analysis

GitHub Run ID: 27199273856
Workflow Name: CI
Commit SHA: 9bc5829
Job Name: build
Failing Command: `npm run lint`

Exact useful error summary:
```
/home/runner/work/darhous-ai-cloud-academy/darhous-ai-cloud-academy/src/components/admin/panels/AdminOverviewPanel.tsx
  9:50  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
 10:55  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
 16:16  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/darhous-ai-cloud-academy/darhous-ai-cloud-academy/src/components/admin/admin-navigation.ts
 18:9   error    Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
```

Root Cause Classification: 2 (lint rule error due to `any` types)
Local reproduction: Reproduced targeted files locally with `npx eslint`.
Fix Decision: Fix applied to the targeted files by importing correct types and removing `any`.
