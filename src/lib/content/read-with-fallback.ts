import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Generic "DB read with graceful degradation to static" helpers.
 *
 * Generalizes the proven pattern from nano-banana/prompts and the blog [slug]
 * page: query published rows from a content table, map each row to the
 * existing TS shape, and on ANY problem (table/column not migrated yet, no
 * row, RLS denial, network error) return an empty result so the caller's
 * static array/object can take over — the page renders identically either way.
 */

type RowMapper<TRow, TItem> = (row: TRow) => TItem;

interface FetchPublishedListOptions<TRow extends Record<string, unknown>, TItem> {
  table: string;
  mapRow: RowMapper<TRow, TItem>;
  /** Extra equality filters beyond status="published", e.g. { portal_id: "ai-academy" } */
  match?: Record<string, string>;
  orderBy?: { column: string; ascending?: boolean };
  select?: string;
}

/** Fetch all published rows from a content table, mapped to the render shape. */
export async function fetchPublishedList<TRow extends Record<string, unknown>, TItem>(
  opts: FetchPublishedListOptions<TRow, TItem>,
): Promise<TItem[]> {
  const { table, mapRow, match, orderBy, select = "*" } = opts;
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    let query = supabase.from(table).select(select).eq("status", "published");
    for (const [column, value] of Object.entries(match ?? {})) {
      query = query.eq(column, value);
    }
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return (data as unknown as TRow[]).map(mapRow);
  } catch {
    return [];
  }
}

interface FetchPublishedOneOptions<TRow extends Record<string, unknown>, TItem> {
  table: string;
  mapRow: RowMapper<TRow, TItem>;
  /** Equality filters identifying the row, e.g. { slug: "my-post" } or { id: "my-id" } */
  match: Record<string, string>;
  select?: string;
}

/**
 * Merge DB rows with static fallback items, deduplicated by `id` — DB wins.
 * Generalizes the merge loop already proven in src/app/[locale]/paths/page.tsx
 * (and now reused across the 22 Automation/IoT-Lab/Digital-Exams CMS types):
 * spread DB items first so they "win" the dedupe, then fill in any static
 * items whose id isn't already covered by the DB.
 */
export function mergeById<T extends { id: string }>(dbItems: T[], staticItems: T[]): T[] {
  const seen = new Set<string>();
  const merged: T[] = [];
  for (const item of [...dbItems, ...staticItems]) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  }
  return merged;
}

/** Fetch a single published row by slug/id, mapped to the render shape. */
export async function fetchPublishedOne<TRow extends Record<string, unknown>, TItem>(
  opts: FetchPublishedOneOptions<TRow, TItem>,
): Promise<TItem | null> {
  const { table, mapRow, match, select = "*" } = opts;
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    let query = supabase.from(table).select(select).eq("status", "published");
    for (const [column, value] of Object.entries(match)) {
      query = query.eq(column, value);
    }

    const { data } = await query.single();
    if (!data) return null;
    return mapRow(data as unknown as TRow);
  } catch {
    return null;
  }
}
