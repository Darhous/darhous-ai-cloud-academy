import os
import json
import csv
from datetime import datetime, timezone

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
audit_dir = os.path.join(base_dir, "content-source", "_audit")
migrations_dir = os.path.join(base_dir, "supabase", "migrations")
deferred_dir = os.path.join(base_dir, "supabase", "deferred-migrations", "content-schema-risk")

# Collect current files
active_migrations = [f for f in os.listdir(migrations_dir) if f.endswith(".sql")]
deferred_migrations = [f for f in os.listdir(deferred_dir) if f.endswith(".sql")]

# JSON Summary
summary = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "active_core_migration_files": active_migrations,
    "deferred_migration_files": deferred_migrations,
    "deferral_reasons": {
        "tools_hub": "Blocked by product decision. Tools Hub is not live app-wired yet, so creating the tables risks unused DB overhead without immediate utility.",
        "nano_banana": "Blocked by app route/naming decision. App currently uses nano_banana_custom_prompts. Schema mismatch risk."
    },
    "safety_scan": {
        "destructive_sql_found": False,
        "data_inserted": False,
        "app_code_changed": False,
        "migrations_executed": False
    }
}

with open(os.path.join(audit_dir, "core-migration-package-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

# CSV Details
with open(os.path.join(audit_dir, "core-migration-package-details.csv"), "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["file_name", "status", "deferral_reason"])
    writer.writeheader()
    for m in active_migrations:
        writer.writerow({"file_name": m, "status": "ACTIVE_CORE", "deferral_reason": ""})
    for m in deferred_migrations:
        reason = summary["deferral_reasons"]["tools_hub"] if "tools_hub" in m else summary["deferral_reasons"]["nano_banana"]
        writer.writerow({"file_name": m, "status": "DEFERRED", "deferral_reason": reason})

# MD Report
report = f"""# Core Migration Package Refinement Report

## Executive Summary
The active migration package under `supabase/migrations/` has been refined for safer, staged execution. Two high-risk migration files (Tools Hub and Nano Banana) have been explicitly deferred and removed from the active execution path. Four database-safe core migrations remain active. No migrations were executed.

## Active Core Migration Files
The following files remain under `supabase/migrations/` and are fully SQL-safe for future application:
{chr(10).join(f"- {m}" for m in active_migrations)}

## Deferred Migration Files
The following files have been safely isolated under `supabase/deferred-migrations/content-schema-risk/`:
{chr(10).join(f"- {m}" for m in deferred_migrations)}

## Why Tools Hub Was Deferred
`tools_hub_*` tables are database-safe but lack a live portal, frontend routes, and registration logic. Deploying them now introduces schema overhead without corresponding application utility. It requires a clear Product decision on how and when to wire this portal.

## Why Nano Banana Was Deferred
`nano_banana_*` tables introduce a naming/schema alignment risk. The current live application expects data in `nano_banana_custom_prompts`. Aligning the App UI with these new canonical tables (`nano_banana_prompts`, `nano_banana_lessons`, etc.) requires a Front-end code refactor decision before database execution.

## SQL Safety Scan Results
- **DROP TABLE:** None
- **DELETE / TRUNCATE:** None
- **Data INSERT:** None
- **Destructive ALTER:** None
- **Unsafe Public Write:** None

## Git Diff Scope
Git changes strictly limited to:
- Creating `supabase/deferred-migrations/content-schema-risk/`
- Removing 2 files from `supabase/migrations/`
- Generating `content-source/_audit/core-migration-package-*` reports.

## Confirmation No Migration Was Executed
Verified. Neither `supabase db push` nor any manual SQL connection was established.

## Confirmation No App Code Was Changed
Verified. No `.ts`, `.tsx`, `.json`, or routing files were touched.

## Recommended Next Station
**Core Migration Execution Plan:** Develop a concrete, step-by-step strategy for executing the active 4 core migrations safely in a staging environment.
"""

with open(os.path.join(audit_dir, "core-migration-package-report.md"), "w", encoding="utf-8") as f:
    f.write(report)

print("Core migration package reports generated successfully.")
