/**
 * Shared server-side value coercion helpers for the generic CMS admin API
 * routes (/api/admin/cms/[table] and [id]). Mirrors the per-field parsing
 * logic already proven in /api/admin/ai-paths/route.ts + [id]/route.ts,
 * generalized to drive off a CmsFieldConfig[] from the registry instead of
 * a hand-written field list per type.
 */
import "server-only";
import type { CmsFieldConfig } from "@/lib/admin/cms-registry";

/** Parse a JSONB field's incoming value (string from a textarea, or already-parsed). Returns `undefined` on invalid JSON. */
export function parseJsonbValue(v: unknown): unknown | undefined {
  if (v === null || v === undefined || v === "") return [];
  if (typeof v === "string") {
    try { return JSON.parse(v); } catch { return undefined; }
  }
  return v;
}

/** Parse a TEXT[] field's incoming value — accepts an array already, a comma-separated string ("array" kind), or a newline-separated string ("lines" kind). */
function parseStringArray(v: unknown, kind: "array" | "lines"): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v !== "string") return [];
  const sep = kind === "lines" ? /\r?\n/ : ",";
  return v.split(sep).map((x) => x.trim()).filter(Boolean);
}

/**
 * Build a Supabase insert/update object from raw request-body values, driven
 * by the type's field config. Returns `{ error }` if a JSONB field contains
 * invalid JSON, otherwise `{ values }` with one key per configured field that
 * was present in `body` (for PATCH) or always (for POST, via `forCreate`).
 */
export function coerceCmsFields(
  fields: CmsFieldConfig[],
  body: Record<string, unknown>,
  opts: { forCreate: boolean },
): { values: Record<string, unknown> } | { error: string } {
  const values: Record<string, unknown> = {};

  for (const f of fields) {
    const present = f.name in body;
    if (!opts.forCreate && !present) continue;
    const raw = body[f.name];

    switch (f.kind) {
      case "text":
      case "textarea":
      case "select":
        values[f.name] = present ? String(raw ?? "").trim() : (f.default ?? "");
        break;
      case "number":
        values[f.name] = present ? (Number(raw) || 0) : (typeof f.default === "number" ? f.default : 0);
        break;
      case "toggle":
        values[f.name] = present ? Boolean(raw) : Boolean(f.default ?? false);
        break;
      case "array":
      case "lines":
        values[f.name] = present ? parseStringArray(raw, f.kind) : [];
        break;
      case "jsonb": {
        if (!present) { values[f.name] = []; break; }
        const parsed = parseJsonbValue(raw);
        if (parsed === undefined) return { error: `Invalid JSON in field "${f.name}"` };
        values[f.name] = parsed;
        break;
      }
    }
  }

  return { values };
}
