# Darhous Content Source Specification V1

## 1. Purpose

This folder is a developer-managed content source layer for Darhous. Content
created here is standalone and does not directly change the academy
application. After review, approved files may be imported or seeded into
Supabase or other database tables.

## 2. Source Format Rules

- Articles and lessons use Markdown (`.md`) with strict YAML frontmatter.
- Paths, tools, projects, templates, quizzes, glossary entries, prompts, and
  resources use JSON (`.json`).
- Arabic body content is primary. English fields are optional.
- Do not add random metadata fields.
- Every file must follow its corresponding file in `_templates/` exactly.
- JSON files must contain valid JSON. Markdown frontmatter must contain valid
  YAML.
- Markdown content may include only the shared metadata and type-specific
  frontmatter fields defined by its template.
- JSON content may include only the shared metadata and `data` at the top
  level. Put all type-specific JSON fields inside `data`.

## 3. Required and Recommended Metadata

Every content item must include the shared metadata below. Fields marked
optional may use an empty placeholder or be omitted when no value is available:

- `id`
- `portal_id`
- `content_type`
- `title_ar`
- `title_en` (optional)
- `excerpt_ar` (optional, for card and list previews)
- `excerpt_en` (optional)
- `category`
- `status`
- `featured` (default: `false`)
- `tags`
- `sort_order`

The `featured` field must be included in every content file, even when its value
is `false`.

## 4. Allowed `portal_id` Values

Only these values are allowed:

- `ai-academy`
- `automation`
- `iot-lab`
- `career`
- `language`
- `digital-exams`
- `nano-banana`
- `tools-hub`

## 5. Allowed `content_type` Values

Only these values are allowed:

- `article`
- `lesson`
- `path`
- `tool`
- `project`
- `template`
- `quiz`
- `glossary`
- `prompt`
- `resource`

## 6. Allowed Status Values

Only these values are allowed:

- `draft`
- `published`
- `archived`

## 7. Naming Rules

- `id` must be lowercase English kebab-case.
- The filename, excluding its extension, must match `id`.
- An `id` must remain stable forever after creation.
- Do not create duplicate IDs inside the same content type.
- `sort_order` should use gaps such as `10`, `20`, and `30` to allow future
  insertion without renumbering all items.

## 8. Database Readiness Rules

Future database tables may use these fields:

- `id`
- `portal_id`
- `content_type`
- `status`
- `featured`
- `sort_order`
- `category`
- `title_ar`
- `title_en`
- `tags`
- `body_ar`
- `body_en`
- `data jsonb`
- `created_by`
- `created_at`
- `updated_at`
- `published_at`
- `archived_at`

Source files must keep common metadata predictable so an importer can map it
without content-specific guessing.

- For Markdown files, the Markdown body itself maps to `body_ar`.
- Do not put `body_ar` inside Markdown frontmatter unless a future
  specification explicitly requires it.
- Optional English body content may later map to `body_en`.
- For JSON files, extra type-specific fields must live inside `data`.
- Do not create random top-level JSON fields outside the shared metadata and
  `data`.
- Structured JSON payloads map to `data jsonb`.
- Database-managed identity, audit, and timestamp fields should be added by the
  importer or database unless a future approved specification explicitly
  changes this rule.

## 9. Content Quality Rules

- Write practical Arabic content.
- Do not add filler.
- Keep content beginner-friendly.
- Every article should help the user do something immediately.
- Prefer guides, checklists, examples, comparisons, common mistakes,
  workflows, and real use cases.
- Avoid repeating existing Darhous topics unless explicitly requested later.

## 10. Future Workflow

1. Create only a tiny pilot batch.
2. Review the pilot batch.
3. Generate approved content portal by portal.
4. Import or seed reviewed content into the database later.
5. Allow future admin CRUD tools to manage the database version later.

## 11. Safety Rules

- This `content-source` folder must not modify the academy codebase.
- Content generation tasks must not change routes, UI, Supabase, auth,
  certificates, admin dashboard files, or package files.
- Content generation must remain standalone until files are manually reviewed
  and moved or imported through a separately approved workflow.
