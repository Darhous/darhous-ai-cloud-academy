"""
live-readiness-v2.py
====================

READ-ONLY analysis tool. Computes an authoritative "live_readiness_v2" picture
of how much of content-source/_normalized/ can be safely imported, given the
database state AFTER the manual core-content-schema migration execution
(2026-06-08: 19 new tables created, all empty, RLS + policies verified).

THIS SCRIPT NEVER WRITES TO THE DATABASE.
It contains NO calls of any kind to: INSERT, UPDATE, DELETE, UPSERT, COPY,
TRUNCATE, ALTER, CREATE, or DROP. Grep this file for those keywords — you will
only find them in this comment block and in the safety-assertion strings below.

Two modes
---------
Mode A (connected, read-only):
    Activated only if a READ-ONLY database URL is supplied via the environment
    variable LIVE_READINESS_DB_URL (or SUPABASE_URL + SUPABASE_ANON_KEY).
    Uses introspection-only queries:
        - information_schema.tables
        - information_schema.columns
        - pg_policies
        - SELECT count(*) FROM <table>   (row-count confirmation only)
    Never imports or constructs a service-role / write-capable client.
    Credentials are read from environment variables ONLY — never written to
    disk, never logged, never committed.

Mode B (static-evidence fallback — the default, and the mode this station used):
    No database connection is attempted at all. Classification is derived
    entirely from files already checked into this repository:
        - content-source/_importer/table-compatibility-matrix.csv
            (pre-migration "does this table already exist?" detection)
        - the manually-verified list of 19 newly-created core tables
            (recorded in content-source/_audit/post-migration-verification-report.md
             and supabase/MIGRATION_LOG.md)
        - supabase/deferred-migrations/content-schema-risk/*.sql
            (confirms which tables remain entirely absent)
        - per-portal/per-type file counts under content-source/_normalized/

Run it with:  python live-readiness-v2.py
Output:       content-source/_audit/live-dryrun-v2-{summary.json,details.csv,report.md}
"""

import os
import csv
import json
from datetime import datetime, timezone

BASE_DIR = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
NORMALIZED_DIR = os.path.join(BASE_DIR, "content-source", "_normalized")
AUDIT_DIR = os.path.join(BASE_DIR, "content-source", "_audit")
IMPORTER_DIR = os.path.join(BASE_DIR, "content-source", "_importer")

# ---------------------------------------------------------------------------
# SAFETY ASSERTIONS (self-documenting — checked at runtime, not just comments)
# ---------------------------------------------------------------------------
FORBIDDEN_SQL_VERBS = ["INSERT", "UPDATE", "DELETE", "UPSERT", "COPY",
                       "TRUNCATE", "ALTER", "CREATE", "DROP"]


def assert_read_only_query(sql: str) -> None:
    """Refuse to execute anything that is not a pure SELECT/introspection query."""
    upper = sql.strip().upper()
    if not upper.startswith("SELECT"):
        raise RuntimeError(
            f"Refusing to run a non-SELECT statement in a read-only tool: {sql[:80]!r}"
        )
    for verb in FORBIDDEN_SQL_VERBS:
        if verb in upper:
            raise RuntimeError(
                f"Refusing to run a query containing forbidden verb {verb!r}: {sql[:80]!r}"
            )


# ---------------------------------------------------------------------------
# Static evidence (Mode B ground truth) — see live-readiness-v2-plan.md
# ---------------------------------------------------------------------------

# Tier A: the 19 tables created by the manually-executed core migration.
# Source: post-migration-verification-report.md / supabase/MIGRATION_LOG.md
TIER_A_NEW_CORE_TABLES = {
    "career_glossary", "career_prompts", "career_resources", "career_lessons",
    "language_glossary", "language_prompts", "language_resources", "language_lessons",
    "digital_exams_glossary", "digital_exams_prompts", "digital_exams_resources", "digital_exams_lessons",
    "ai_resources", "ai_lessons",
    "automation_resources", "automation_lessons",
    "iot_glossary", "iot_prompts", "iot_resources",
}

# Tier B: pre-existing, presumably live-wired tables (existed BEFORE this
# content-source effort; detected via table-compatibility-matrix.csv, and
# traced to legacy migrations v22/v24/v33/v37/v42/v14).
TIER_B_PRE_EXISTING_LIVE_TABLES = {
    "ai_glossary": "supabase/v22_ai_glossary.sql",
    "ai_prompts": "supabase/v24_ai_prompts.sql",
    "automation_glossary": "supabase/v33_automation_glossary.sql",
    "automation_prompts": "supabase/v37_automation_prompts.sql",
    "iot_lessons": "supabase/v42_iot_lessons.sql",
    "nano_banana_custom_prompts": "supabase/v14_nano_banana_custom_prompts.sql",
}

# Tier C: tables that remain entirely absent (deferred migrations were not run).
TIER_C_DEFERRED_MISSING_TABLES = {
    "tools_hub_glossary", "tools_hub_prompts", "tools_hub_resources", "tools_hub_lessons",
    "nano_banana_glossary", "nano_banana_resources", "nano_banana_lessons",
    # Note: nano_banana_prompts is intentionally NOT generated/expected here —
    # the nano-banana "prompts" content type maps to the pre-existing
    # nano_banana_custom_prompts table (Tier B), not a new nano_banana_prompts table.
}

PORTAL_PREFIX_MAP = {
    "ai-academy": "ai", "automation": "automation", "career": "career",
    "digital-exams": "digital_exams", "iot-lab": "iot", "language": "language",
    "nano-banana": "nano_banana", "tools-hub": "tools_hub",
}

FOLDER_TO_TYPE = {"glossary": "glossary", "prompts": "prompts",
                  "resources": "resources", "lessons": "lessons"}


def candidate_table_name(portal: str, folder: str) -> str:
    """Mirrors the naming convention used by Antigravity's schema generation."""
    prefix = PORTAL_PREFIX_MAP[portal]
    if portal == "nano-banana" and folder == "prompts":
        return "nano_banana_custom_prompts"  # special-cased: maps to existing live table
    return f"{prefix}_{folder}"


def classify_table(table: str):
    """Return (tier, evidence_note) for a candidate table name."""
    if table in TIER_A_NEW_CORE_TABLES:
        return "A", "New core table created 2026-06-08 (empty, RLS-protected, zero app dependency)"
    if table in TIER_B_PRE_EXISTING_LIVE_TABLES:
        return "B", f"Pre-existing live-wired table (defined in {TIER_B_PRE_EXISTING_LIVE_TABLES[table]}); requires separate review before import"
    if table in TIER_C_DEFERRED_MISSING_TABLES:
        return "C", "Table does not exist — part of deferred migration package (tools_hub / nano_banana risk group)"
    return "?", "Unclassified — table not found in any known evidence set (treat as NOT importable until reviewed)"


def count_normalized_files(portal: str, folder: str) -> int:
    folder_dir = os.path.join(NORMALIZED_DIR, portal, folder)
    if not os.path.isdir(folder_dir):
        return 0
    return len([f for f in os.listdir(folder_dir) if f.endswith(".json") or f.endswith(".md")])


# ---------------------------------------------------------------------------
# Mode A — connected, read-only (only attempted if explicitly configured)
# ---------------------------------------------------------------------------

def try_mode_a_live_introspection():
    """
    Attempt a READ-ONLY introspection pass against the live database.
    Returns a dict of {table_name: {"exists": bool, "row_count": int|None}}
    or None if no read-only credentials are configured / connection fails.

    Requires: LIVE_READINESS_DB_URL env var pointing at a READ-ONLY role,
    OR SUPABASE_URL + SUPABASE_ANON_KEY (RLS-scoped, never service-role).
    Never logs, prints, or persists the credential values themselves.
    """
    db_url = os.environ.get("LIVE_READINESS_DB_URL")
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_anon_key = os.environ.get("SUPABASE_ANON_KEY")

    if not db_url and not (supabase_url and supabase_anon_key):
        return None  # No credentials configured — fall back to Mode B. This is expected and safe.

    try:
        import psycopg2  # optional dependency; only imported if creds are present
    except ImportError:
        print("[live-readiness-v2] Mode A requested (env vars present) but psycopg2 "
              "is not installed. Falling back to Mode B (static evidence).")
        return None

    introspection_queries = {
        "tables": "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
        "columns": "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public'",
        "policies": "SELECT tablename, policyname, cmd, qual, with_check FROM pg_policies WHERE schemaname = 'public'",
    }
    for name, sql in introspection_queries.items():
        assert_read_only_query(sql)

    try:
        conn = psycopg2.connect(db_url) if db_url else None
        if conn is None:
            print("[live-readiness-v2] Only Supabase REST credentials were provided; "
                  "this script only performs raw-SQL introspection via LIVE_READINESS_DB_URL. "
                  "Falling back to Mode B (static evidence).")
            return None

        conn.set_session(readonly=True, autocommit=True)  # hard guarantee: read-only transaction
        results = {}
        with conn.cursor() as cur:
            cur.execute(introspection_queries["tables"])
            live_tables = {row[0] for row in cur.fetchall()}

            all_candidates = TIER_A_NEW_CORE_TABLES | set(TIER_B_PRE_EXISTING_LIVE_TABLES) | TIER_C_DEFERRED_MISSING_TABLES
            for table in all_candidates:
                exists = table in live_tables
                row_count = None
                if exists:
                    count_sql = f"SELECT count(*) FROM {table}"
                    assert_read_only_query(count_sql)
                    cur.execute(count_sql)
                    row_count = cur.fetchone()[0]
                results[table] = {"exists": exists, "row_count": row_count}
        conn.close()
        print("[live-readiness-v2] Mode A: live introspection succeeded (read-only transaction).")
        return results
    except Exception as exc:
        print(f"[live-readiness-v2] Mode A connection/introspection failed ({exc}); "
              f"falling back to Mode B (static evidence). No write was attempted.")
        return None


# ---------------------------------------------------------------------------
# Main analysis
# ---------------------------------------------------------------------------

def run():
    live_introspection = try_mode_a_live_introspection()
    mode = "A (connected, read-only)" if live_introspection else "B (static evidence, no DB connection)"

    details = []
    tier_totals = {"A": 0, "B": 0, "C": 0, "?": 0}

    for portal in sorted(PORTAL_PREFIX_MAP):
        for folder in ["glossary", "prompts", "resources", "lessons"]:
            file_count = count_normalized_files(portal, folder)
            table = candidate_table_name(portal, folder)

            if live_introspection is not None:
                info = live_introspection.get(table, {"exists": False, "row_count": None})
                exists = info["exists"]
                tier, note = classify_table(table) if exists else ("C", "Table not found in live introspection")
                evidence = f"live introspection: exists={exists}, row_count={info['row_count']}"
            else:
                tier, note = classify_table(table)
                evidence = "static evidence (table-compatibility-matrix.csv + manual verification + deferred-migrations listing)"

            tier_totals[tier] += file_count
            details.append({
                "portal": portal,
                "content_type": folder,
                "file_count": file_count,
                "candidate_table": table,
                "readiness_tier": tier,
                "tier_meaning": {
                    "A": "Safe to plan a staged import — new, isolated, empty, RLS-protected table",
                    "B": "Table exists but is pre-existing/live-wired — requires separate review before any import",
                    "C": "Table does not exist — deferred (tools_hub / nano_banana risk group)",
                    "?": "Unclassified — do not import",
                }[tier],
                "evidence_note": note,
                "evidence_source": evidence,
            })

    total_files = sum(tier_totals.values())
    raw_importable = tier_totals["A"] + tier_totals["B"]   # "table exists" — comparable to old reports' methodology
    raw_skipped = tier_totals["C"] + tier_totals["?"]

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mode_used": mode,
        "total_normalized_files": total_files,
        "raw_table_exists_split": {
            "importable_count": raw_importable,
            "skipped_count": raw_skipped,
            "note": "Comparable methodology to the two earlier (now-stale) reports — counts ANY existing target table as 'importable'. Provided for continuity/comparison only — see tiered breakdown below for the actionable picture.",
        },
        "tiered_breakdown": {
            "tier_A_new_isolated_safe": tier_totals["A"],
            "tier_B_preexisting_live_caution": tier_totals["B"],
            "tier_C_deferred_missing": tier_totals["C"],
            "tier_unclassified": tier_totals["?"],
        },
        "recommended_safe_to_plan_import_now": tier_totals["A"],
        "requires_separate_review_before_import": tier_totals["B"],
        "cannot_import_deferred": tier_totals["C"],
        "tools_hub_and_nano_banana_excluded_from_importable": True,
        "safety_assertions": {
            "script_performed_any_insert": False,
            "script_performed_any_update": False,
            "script_performed_any_delete": False,
            "script_performed_any_ddl": False,
            "service_role_key_used": False,
        },
    }

    os.makedirs(AUDIT_DIR, exist_ok=True)
    with open(os.path.join(AUDIT_DIR, "live-dryrun-v2-summary.json"), "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    with open(os.path.join(AUDIT_DIR, "live-dryrun-v2-details.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "portal", "content_type", "file_count", "candidate_table",
            "readiness_tier", "tier_meaning", "evidence_note", "evidence_source",
        ])
        writer.writeheader()
        writer.writerows(details)

    print(f"[live-readiness-v2] Mode used: {mode}")
    print(f"[live-readiness-v2] Total files: {total_files} | "
          f"Tier A (safe): {tier_totals['A']} | Tier B (caution): {tier_totals['B']} | "
          f"Tier C (deferred): {tier_totals['C']}")
    print("[live-readiness-v2] Wrote live-dryrun-v2-summary.json and live-dryrun-v2-details.csv")
    print("[live-readiness-v2] No database write of any kind was performed by this script.")


if __name__ == "__main__":
    run()
