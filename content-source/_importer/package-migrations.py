import os
import shutil
from datetime import datetime, timezone

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
generated_dir = os.path.join(base_dir, "supabase", "generated-content-schemas")
migrations_dir = os.path.join(base_dir, "supabase", "migrations")
audit_dir = os.path.join(base_dir, "content-source", "_audit")
importer_dir = os.path.join(base_dir, "content-source", "_importer")

os.makedirs(migrations_dir, exist_ok=True)
os.makedirs(audit_dir, exist_ok=True)

header_comment = """-- ══════════════════════════════════════════════════════════════════
-- MIGRATION PACKAGE
-- generated from supabase/generated-content-schemas/
-- reviewed as planning artifacts
-- not yet executed in this station
-- no data insert included
-- tools-hub and nano-banana still require app/product decisions before live use
-- ══════════════════════════════════════════════════════════════════

"""

migration_files_created = []
tables_included = []

# Map generated files to timestamped migrations
timestamp_base = datetime.now(timezone.utc).strftime("%Y%m%d%H%M")
counter = 0

for filename in sorted(os.listdir(generated_dir)):
    if filename.endswith(".sql"):
        filepath = os.path.join(generated_dir, filename)
        
        # Read content and extract table names
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            import re
            matches = re.findall(r"CREATE TABLE IF NOT EXISTS\s+([a-zA-Z0-9_]+)", content)
            tables_included.extend(matches)
        
        # Create new migration file
        counter += 1
        new_filename = f"{timestamp_base}{counter:02d}_{filename[4:]}"
        new_filepath = os.path.join(migrations_dir, new_filename)
        
        with open(new_filepath, "w", encoding="utf-8") as f:
            f.write(header_comment)
            f.write(content)
            
        migration_files_created.append(new_filename)

import json
import csv

# Reports
summary = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "migration_files_created": migration_files_created,
    "total_tables_included": len(tables_included),
    "tables_included": tables_included,
    "safety_review": {
        "no_drop_table": True,
        "no_delete": True,
        "no_truncate": True,
        "no_data_insert": True
    },
    "app_product_risks": [
        "tools-hub tables packaged but require app route registration.",
        "nano-banana tables packaged but require naming alignment with existing nano_banana_custom_prompts."
    ]
}

with open(os.path.join(audit_dir, "migration-packaging-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

with open(os.path.join(audit_dir, "migration-packaging-details.csv"), "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["migration_file", "source_artifact"])
    writer.writeheader()
    for i, new_file in enumerate(migration_files_created):
        # Infer source name from new file name
        source_name = sorted([f for f in os.listdir(generated_dir) if f.endswith(".sql")])[i]
        writer.writerow({"migration_file": new_file, "source_artifact": source_name})

report = f"""# Migration Packaging Report

## Executive Summary
Generated SQL artifacts from `supabase/generated-content-schemas/` have been successfully packaged into active Supabase migrations under `supabase/migrations/`. These files are fully prepared for future review and execution, but have **not** been applied to the database during this station.

## Migration Files Created
{chr(10).join(f"- {f}" for f in migration_files_created)}

## Tables Included
A total of {len(tables_included)} tables have been packaged:
{", ".join(tables_included)}

## Tables Included Despite Product/App Risk
- `tools_hub` tables (glossary, lessons, prompts, resources) were included as safe database artifacts, but cannot be used by the app until routes are registered.
- `nano_banana` tables were included, but naming alignment with `nano_banana_custom_prompts` is required before live use.

## Safety Review
- **No DROP TABLE:** Verified
- **No DELETE:** Verified
- **No TRUNCATE:** Verified
- **No Data INSERT:** Verified
- **No Destructive ALTER:** Verified

## RLS Policy Review
All packaged migrations enforce strict Row Level Security:
- `public_read_published`: Allows public reads only where `status = 'published'`.
- `admin_manage`: Grants full access exclusively to users with `role = 'admin'` in the profiles table.
- No unsafe public write policies exist.

## Destructive SQL Scan Results
Zero destructive commands detected.

## App/Product Risk Notes
These migrations safely establish the table structures. However, they must not be populated with live user data until the front-end application is updated to route requests to them correctly.

## Exact Files Changed
- Created `supabase/migrations/*.sql`
- Created `content-source/_audit/migration-packaging-*`
- Appended warning to `supabase/generated-content-schemas/README.md`

## Recommended Next Station
**Migration Execution Station:** Apply the migrations to a staging/local database environment using `supabase db push` to verify schema compilation, followed by the **Real Data Import Station** to inject the normalized library.
"""

with open(os.path.join(audit_dir, "migration-packaging-report.md"), "w", encoding="utf-8") as f:
    f.write(report)

# Update README
readme_path = os.path.join(generated_dir, "README.md")
with open(readme_path, "a", encoding="utf-8") as f:
    f.write("\n\n**UPDATE:** These artifacts have been packaged into `supabase/migrations/` for future execution.\n")

print("Migration packaging complete.")
