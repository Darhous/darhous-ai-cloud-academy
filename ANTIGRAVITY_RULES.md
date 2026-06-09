# Antigravity Permanent Operating Rules

## 1. Project identity

* Project: Darhous AI Cloud Academy / NexaLearn
* Local path: C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy
* Current strategic stage: CMS lifecycle, admin information architecture, safe publishing, public wiring, launch readiness
* Not a content-import project anymore

## 2. Current content/database state

* 1,040 total normalized records
* 600 Tier-A records in Supabase Production
* all 600 are draft
* 0 published
* 210 live-wired/existing records
* 230 deferred/schema-risk records
* tools_hub and nano_banana are deferred
* previous DB sync SQL must not be run again

## 3. Absolute safety rules

* No Supabase SQL unless explicitly approved by the user.
* No DB writes unless explicitly approved by the user.
* No migrations unless explicitly approved by the user.
* No imports/seeds unless explicitly approved by the user.
* No publishing unless explicitly approved by the user.
* No dangerous CRUD.
* No public UI wiring to Tier-A content without a controlled strategy.
* Do not touch tools_hub.
* Do not touch nano_banana.
* Do not change the 210 live-wired records.
* Do not change the 230 deferred records.
* Do not edit secrets or environment files.
* Do not run npm install unless explicitly instructed.
* Do not update package files unless explicitly instructed.
* Never use `git add .`
* Always stage explicit files only.
* Do not modify, delete, stage, or commit protected local untracked files.

## 4. Protected local untracked files

* .claude/
* .codex/
* README.backup.20260607-135220.md
* UX PROMAX.MD
* content-source/_audit/generate-core-reports.py
* content-source/_audit/generate_10_inserts.py
* content-source/_audit/generate_10_inserts_fixed.py
* content-source/_audit/generate_10_persistent_inserts.py

## 5. Required process for every future phase

1. Read the relevant reports/context first.
2. Inspect git status before edits.
3. Confirm protected files are untouched.
4. Implement only the approved scope.
5. Create or update the phase report.
6. Append a detailed entry to ANTIGRAVITY_PROJECT_LOG.md.
7. Run appropriate validation for the scope.
8. Run git diff --check when files changed.
9. Inspect git status.
10. Stage only explicit files.
11. Commit.
12. Create checkpoint tag.
13. Push commit.
14. Push tag.
15. Create GitHub Release only for major implementation phases or when explicitly requested.
16. Stop and return a final Arabic report to the user.
17. Do not start the next phase.

## 6. Root log rule

Every future phase entry in ANTIGRAVITY_PROJECT_LOG.md must include:

1. A separator line.
2. The exact current local time in Arabic format.
3. A section titled: `## البرومبت المستلم`
4. The full prompt/instructions received from the user for that phase.
5. A section titled: `## تقرير التنفيذ النهائي`
6. The final execution report/response written at the end of the phase.

Required format:

---

الساعة [exact time]

## البرومبت المستلم

[Paste the full prompt/instructions received for this phase]

## تقرير التنفيذ النهائي

[Write the final detailed Arabic execution report for this phase]

The final execution report must include:

* phase name;
* goal;
* files/reports read;
* code areas inspected;
* files created;
* files modified;
* implementation summary;
* validation results;
* safety confirmation;
* commit hash;
* tag name;
* GitHub Release status/link if created;
* push status;
* protected files confirmation;
* next recommended station.

Important:

* Never overwrite previous log entries.
* Append only.
* If the prompt is very long, still include it fully under `## البرومبت المستلم`.
* After commit/tag/release, update the same log entry once if needed to include the final commit hash, tag, release URL, and push status.

## 7. Commit, tag, checkpoint, and release rules

* Every completed phase must have a commit.
* Every completed phase must have a checkpoint tag.
* Every completed phase must be pushed.
* Major implementation phases must also have a GitHub Release.
* Small docs-only/setup phases do not need a GitHub Release unless explicitly instructed.
* Commit messages must be clear and scoped.
* Tags should use checkpoint/... naming.

## 8. Reporting rule

At the end of every phase, final response to the user must be in Arabic and include:
* what was done
* files changed
* commands run
* validation results
* commit hash
* tag
* release if any
* push status
* safety confirmation
* next recommended station

Do not include a new implementation plan unless asked.
