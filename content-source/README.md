# Darhous Content Source

Standalone, developer-managed source files for future Darhous content.

No real academy content belongs here until a pilot batch is explicitly
requested and reviewed. Use the portal folders for approved future items and
copy the matching placeholder from `_templates/` before authoring.

Read `CONTENT_SPEC_V1.md` before creating or changing any content item. It
defines allowed metadata, naming, quality, database-readiness, workflow, and
safety rules.

## Layout

- Each portal contains folders for all supported content types.
- Articles and lessons use Markdown.
- Other content types use JSON.
- `_templates/` contains the required placeholder shapes.

This folder is intentionally independent from the academy application and does
not contain routes, UI code, migrations, database clients, or package files.
