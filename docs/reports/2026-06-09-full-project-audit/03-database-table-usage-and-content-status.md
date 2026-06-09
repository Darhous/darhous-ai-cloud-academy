# Database Table Usage and Content Status

## Content Reconciliation

The latest authoritative checkpoint is:

- 1,040 normalized content-source records.
- 600 Tier-A rows imported and verified as `draft`.
- 0 Tier-A rows published.
- 210 live-wired/existing records excluded.
- 230 deferred/schema-risk records excluded.

Evidence: `final-tier-a-draft-import-verification-summary.json` plus the current station brief.

## Tier-A Tables

| Portal | Tables | Rows | Public UI use | Admin use |
|---|---|---:|---|---|
| AI Academy | `ai_lessons`, `ai_resources` | 50 | Not found | Read-only preview |
| Automation | `automation_lessons`, `automation_resources` | 50 | Not found | Read-only preview |
| Career | `career_glossary`, `career_lessons`, `career_prompts`, `career_resources` | 130 | Not found | Read-only preview |
| Digital Exams | `digital_exams_glossary`, `digital_exams_lessons`, `digital_exams_prompts`, `digital_exams_resources` | 130 | Subject pages use other exam data; these tables not found | Read-only preview |
| IoT | `iot_glossary`, `iot_prompts`, `iot_resources` | 110 | Not found | Read-only preview |
| Language | `language_glossary`, `language_lessons`, `language_prompts`, `language_resources` | 130 | Not found | Read-only preview |

All 19 migrations enable RLS, allow public SELECT only where `status = 'published'`, and allow admin management based on `profiles.role = 'admin'`.

## Existing Meaningfully Used Tables

The application directly references many operational tables, including:

- identity/user: `profiles`, `student_profiles`, `public_profiles`, `avatars`;
- learning: `course_progress`, `lesson_progress`, `quiz_results`, `learning_plans`;
- content/CMS: `ai_courses`, `ai_tools`, `ai_prompts`, `ai_projects`, `ai_paths`, `ai_glossary`, `blog_posts`;
- engagement: `saved_prompts`, `user_projects`, `challenge_submissions`, `prompt_scores`, `prompt_battles`;
- portal results: `language_results`, `digital_exam_results`, `exam_library_items`;
- automation: `automation_saved_recipes`, `automation_lab_progress`, `automation_recipe_checklist`;
- admin/system: `admin_audit_logs`, `admin_site_settings`, `feature_flags_store`, `ai_mentor_settings_store`, `analytics_events`;
- communications: `community_subscribers`, `contact_messages`, `email_sequence_events`;
- certificates: `certificates`, `admin_certificates`.

Evidence: direct `.from("table")` calls under `src`.

## Tables With Schema/RLS but No Meaningful App Integration

The 19 Tier-A tables have:

- production rows;
- published-only public policies;
- admin management policies;
- a read-only admin preview.

They do not have confirmed:

- public list/detail components;
- route-specific mappers;
- sitemap inclusion;
- publishing controls;
- preview-to-public route mapping;
- per-record audit history.

These are “database-ready, product-unintegrated,” not unused in the absolute sense.

## CMS Coverage Gap

`src/lib/admin/cms-registry.ts` drives generic CRUD for 22 older Automation/IoT/Exam tables. It does not represent the 19 Tier-A tables. The Tier-A tables are instead defined in `draft-content-preview-config.ts`.

This split is safe for read-only review but creates two admin content systems:

1. mutable generic CMS types;
2. immutable imported Tier-A preview types.

The next CMS phase should unify lifecycle concepts without forcing both schemas into one unsafe generic form.

## Public Read Safety

`src/lib/content/read-with-fallback.ts` correctly adds `status = "published"` to list and detail queries. The public RLS policies provide a second safety layer.

Important caveat: many pages merge DB results with static datasets. That means:

- drafts do not leak;
- pages remain populated when DB is absent;
- publication of a new DB record may be hidden or duplicated if ID mapping is inconsistent;
- the visible page does not prove which source supplied the content.

## Existing Admin Mutation Risks

- Several dedicated create APIs default invalid/missing status to `published`.
- Generic CMS create defaults to `draft`, which is safer.
- Existing CRUD is appropriate for its existing content but should not be blindly reused for imported Tier-A records.
- Publishing should be an explicit state transition, not a form default.

## Deferred Tables

Do not integrate or migrate:

- `tools_hub_glossary`, `tools_hub_resources`, `tools_hub_lessons`, `tools_hub_prompts`;
- `nano_banana_lessons`, `nano_banana_glossary`, `nano_banana_resources`, and related deferred content.

Their SQL remains under `supabase/deferred-migrations/content-schema-risk/`.

## Documentation Discrepancy

`content-database-final-closure-summary.json` says 180/260. The later verification says 210/230. This is a documentation integrity issue, not a database mutation issue. It should be corrected in a dedicated docs-only checkpoint after source reconciliation.

## Recommended Table Readiness Labels

- `live`: public route and public data source confirmed.
- `hybrid`: published DB plus static fallback.
- `admin-managed`: mutation UI exists.
- `draft-preview-only`: Tier-A current state.
- `deferred`: schema intentionally not active.
- `needs-live-verification`: local code is insufficient to confirm production policy/data behavior.
