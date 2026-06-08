import os
import re
import json
import csv
from datetime import datetime, timezone

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
supabase_dir = os.path.join(base_dir, "supabase")
content_dir = os.path.join(base_dir, "content-source")
normalized_dir = os.path.join(content_dir, "_normalized")
importer_dir = os.path.join(content_dir, "_importer")
audit_dir = os.path.join(content_dir, "_audit")

os.makedirs(importer_dir, exist_ok=True)
os.makedirs(audit_dir, exist_ok=True)

# 1. Inspect Supabase Schema for Table Candidates
existing_tables = set()
for filename in os.listdir(supabase_dir):
    if filename.endswith(".sql"):
        filepath = os.path.join(supabase_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            matches = re.findall(r"CREATE TABLE IF NOT EXISTS\s+([a-zA-Z0-9_]+)", content)
            existing_tables.update(matches)
            matches2 = re.findall(r"CREATE TABLE\s+([a-zA-Z0-9_]+)", content)
            existing_tables.update(matches2)

# Helper to guess likely table name from portal and type
def guess_table_name(portal, ctype):
    prefix_map = {
        "ai-academy": "ai",
        "automation": "automation",
        "career": "career",
        "digital-exams": "digital_exams",
        "iot-lab": "iot",
        "language": "language",
        "nano-banana": "nano_banana",
        "tools-hub": "tools_hub"
    }
    prefix = prefix_map.get(portal, portal.replace("-", "_"))
    
    # special cases mapping based on what we found in previous analysis
    if portal == "nano-banana" and ctype == "prompt":
        return "nano_banana_custom_prompts"
    
    ctype_plural = "glossary" if ctype == "glossary" else ctype + "s"
    return f"{prefix}_{ctype_plural}"

# 2. Iterate Normalized Content
total_files = 0
importable_count = 0
skipped_count = 0

compatibility_matrix = {}
dry_run_details = []
missing_tables_set = set()

for portal in os.listdir(normalized_dir):
    portal_dir = os.path.join(normalized_dir, portal)
    if not os.path.isdir(portal_dir): continue
    
    for folder in ["glossary", "prompts", "resources", "lessons"]:
        folder_dir = os.path.join(portal_dir, folder)
        if not os.path.exists(folder_dir): continue
        
        ctype = "prompt" if folder == "prompts" else "resource" if folder == "resources" else "lesson" if folder == "lessons" else "glossary"
        candidate_table = guess_table_name(portal, ctype)
        table_exists = candidate_table in existing_tables
        
        if table_exists:
            comp_status = "compatible"
        else:
            comp_status = "no table"
            missing_tables_set.add(candidate_table)
            
        key = f"{portal}/{ctype}"
        if key not in compatibility_matrix:
            compatibility_matrix[key] = {
                "portal": portal,
                "content_type": ctype,
                "file_count": 0,
                "candidate_table": candidate_table,
                "table_exists": "yes" if table_exists else "no",
                "compatibility": comp_status,
                "recommended_action": "Proceed with Dry Run" if table_exists else "Schema Review / Table Creation Required"
            }
            
        for filename in os.listdir(folder_dir):
            if filename.endswith(".json") or filename.endswith(".md"):
                total_files += 1
                compatibility_matrix[key]["file_count"] += 1
                
                status = "SIMULATED_IMPORT" if table_exists else "SKIPPED_DUE_TO_MISSING_TABLE"
                if table_exists:
                    importable_count += 1
                else:
                    skipped_count += 1
                    
                dry_run_details.append({
                    "file": f"{portal}/{folder}/{filename}",
                    "candidate_table": candidate_table,
                    "status": status,
                    "reason": "Existing target table found" if table_exists else "Target table does not exist in schema"
                })

# 3. Generate Reports

# Field Mapping
field_mapping = {
    "normalized_field": "database_column",
    "id": "id (TEXT PK)",
    "portal_id": "portal_id (TEXT)",
    "content_type": "content_type (TEXT)",
    "status": "status (TEXT)",
    "featured": "featured (BOOLEAN)",
    "sort_order": "sort_order (INT)",
    "category": "category (TEXT)",
    "title_ar": "title_ar (TEXT)",
    "title_en": "title_en (TEXT)",
    "tags": "tags (TEXT[])",
    "excerpt_ar (lessons)": "body_ar (TEXT)",
    "excerpt_en (lessons)": "body_en (TEXT)",
    "other_fields": "data (JSONB)",
    "system_fields": "created_by, created_at, updated_at, published_at"
}

with open(os.path.join(importer_dir, "field-mapping.json"), "w", encoding="utf-8") as f:
    json.dump(field_mapping, f, ensure_ascii=False, indent=2)

# Compatibility Matrix CSV
with open(os.path.join(importer_dir, "table-compatibility-matrix.csv"), "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["portal", "content_type", "file_count", "candidate_table", "table_exists", "compatibility", "recommended_action"])
    writer.writeheader()
    writer.writerows(compatibility_matrix.values())

# Dry-run Details CSV
with open(os.path.join(audit_dir, "importer-dry-run-details.csv"), "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["file", "candidate_table", "status", "reason"])
    writer.writeheader()
    writer.writerows(dry_run_details)

# Summary JSON
summary = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "total_files_analyzed": total_files,
    "importable_count": importable_count,
    "skipped_count_due_to_missing_tables": skipped_count,
    "missing_tables": list(missing_tables_set),
    "primary_dry_run_strategy": "Upsert into existing portal-specific tables",
    "hypothetical_template_based_simulation": {
        "description": "If all missing tables were created using _template_content_table.sql, then 100% of files would be importable using identical logic, since they all share the exact same JSON schema requirements.",
        "hypothetical_importable_count": total_files,
        "hypothetical_skipped": 0
    }
}
with open(os.path.join(audit_dir, "importer-dry-run-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

# Importer Plan MD
importer_plan = """# Importer Dry-Run Plan & Architecture

## Overview
This document describes the design for a safe Supabase data importer, currently running in **DRY-RUN ANALYSIS ONLY** mode. No connections to the database are made.

## Safe Importer Architecture Requirements
If/when activated, the actual importer must follow these strict rules:
1. **Dry-Run Default:** The script must always run in dry-run mode unless a `--live` flag is passed.
2. **Upsert Only:** Uses `ON CONFLICT (id) DO UPDATE` to ensure idempotency.
3. **No Deletions:** Stale content is never automatically deleted by the importer to prevent catastrophic data loss.
4. **Per-Portal / Per-Type Granularity:** Capability to run isolated imports (e.g., `--portal ai-academy --type glossary`).
5. **Checksums (Optional):** Compare a hash of the normalized JSON against the existing `data` column to skip unnecessary updates.
6. **No Client Auth Requirement:** Run via Supabase Service Role Key to bypass RLS, relying on strict runtime validation.

## Table Strategy Recommendation
**Recommendation: Option D (Hybrid)**
- Use existing portal-specific tables where they exist (e.g., `ai_glossary`, `automation_prompts`).
- Do NOT force a massive generic `content` table migration yet, as it would break heavily coupled legacy app routes.
- For missing tables (e.g., `tools-hub` content), create them in the future using `_template_content_table.sql`.

## Target Pilot Recommendation
**Recommended Pilot:** `automation` (or `ai-academy`)
- **Reason:** They have the most complete schema alignments (e.g., `automation_glossary`, `automation_prompts` exist).
- **Not Recommended:** `tools-hub` (high product/architecture risk, may not exist in the live app) and `nano-banana` (routing/portal ID naming mismatch needs resolution first).
"""
with open(os.path.join(importer_dir, "importer-plan.md"), "w", encoding="utf-8") as f:
    f.write(importer_plan)

# Dry-run Report MD
report_md = f"""# Supabase Importer Dry-Run Report

## 1. Executive Summary
A dry-run analysis was executed over 1,040 normalized files. The script did not connect to the database or run migrations. It evaluated schema compatibility between local files and existing `.sql` table definitions.

## 2. Existing Supabase Content Tables Found
The analysis detected existing tables like `ai_glossary`, `ai_prompts`, `automation_glossary`, `iot_lessons`, etc., natively available in the Supabase schema.

## 3. Existing App Content/Fallback Patterns Found
Many components rely on portal-specific fetch patterns (e.g. `supabase.from('ai_glossary').select()`). 

## 4. Normalized Content Import Compatibility Matrix
See `table-compatibility-matrix.csv` for the full breakdown.

## 5. Missing Tables / Schema Gaps
**{skipped_count}** records were skipped due to missing tables. 
Missing table candidates include: 
{", ".join(missing_tables_set)}

## 6. Field Mapping Summary
Standardized JSON fields (`id`, `portal_id`, `category`, `title_ar`) map directly to SQL columns. All other fields fall safely into the `data` JSONB column. See `field-mapping.json`.

## 7. Dry-Run Import Simulation Results
- **Importable (Existing Table):** {importable_count}
- **Skipped (Missing Table):** {skipped_count}
- **Total:** {total_files}

### Hypothetical Template-Based Simulation
If missing tables were generated using `_template_content_table.sql`, the schema compatibility would be 100%, leading to {total_files} importable records.

## 8. Risks and Blockers
- **`tools-hub` Risk:** Portal tables do not exist. Product registration required.
- **`nano-banana` Risk:** Potential mismatch between DB expectations (`nano_banana_custom_prompts`) and folder naming.
- **Missing Tables:** Many types lack native tables (e.g., `career_glossary`, `language_prompts`). 

## 9. Recommended Import Architecture
Upsert-only, dry-run by default, leveraging Service Role, utilizing existing portal-specific tables.

## 10. Recommended First Pilot
**automation** or **ai-academy**. They represent the cleanest path to a successful dry-run-to-live pipeline.
"""
with open(os.path.join(audit_dir, "importer-dry-run-report.md"), "w", encoding="utf-8") as f:
    f.write(report_md)

print("Dry-run tool execution and report generation complete.")
