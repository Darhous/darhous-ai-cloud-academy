import os
import json
import csv
import glob
import re

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
audit_dir = os.path.join(base_dir, "content-source", "_audit")
importer_dir = os.path.join(base_dir, "content-source", "_importer")
normalized_dir = os.path.join(base_dir, "content-source", "_normalized")

# 1. Load Tier-A mapping
tier_a_mapping = {}  # (portal, content_type) -> candidate_table
csv_path = os.path.join(audit_dir, "live-dryrun-v2-details.csv")
with open(csv_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["readiness_tier"] == "A":
            tier_a_mapping[(row["portal"], row["content_type"])] = row["candidate_table"]

already_imported_ids = {
    "career-glossary-ai-tools",
    "career-glossary-ats-2",
    "career-glossary-ats",
    "career-glossary-burnout",
    "career-glossary-career-shift-2",
    "career-glossary-career-shift",
    "career-glossary-cover-letter-2",
    "career-glossary-cover-letter",
    "career-glossary-culture-fit",
    "career-glossary-cv-optimization"
}

allowed_tables = {
    "career_glossary", "career_prompts", "career_resources", "career_lessons",
    "language_glossary", "language_prompts", "language_resources", "language_lessons",
    "digital_exams_glossary", "digital_exams_prompts", "digital_exams_resources", "digital_exams_lessons",
    "ai_resources", "ai_lessons", "automation_resources", "automation_lessons",
    "iot_glossary", "iot_prompts", "iot_resources"
}

all_tier_a_records = []
records_by_table = {}
new_inserts_by_table = {}

def parse_frontmatter(fm_text):
    data = {}
    lines = fm_text.strip().split("\n")
    # Very basic parsing
    for line in lines:
        line = line.strip()
        if not line or ":" not in line:
            continue
        key, val = line.split(":", 1)
        key = key.strip()
        val = val.strip()
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        elif val.startswith("'") and val.endswith("'"):
            val = val[1:-1]
        if val.lower() == "true":
            val = True
        elif val.lower() == "false":
            val = False
        elif val.isdigit():
            val = int(val)
            
        data[key] = val
        
    # extract tags if they look like a list
    tags = []
    in_tags = False
    for line in lines:
        if line.startswith("tags:"):
            in_tags = True
            continue
        if in_tags:
            if line.startswith("- "):
                v = line[2:].strip().strip('"').strip("'")
                tags.append(v)
            elif not line.startswith(" ") and not line.startswith("\t"):
                in_tags = False
    data["tags"] = tags
    return data

for (portal, content_type), target_table in tier_a_mapping.items():
    if target_table not in allowed_tables:
        continue
    
    if target_table not in records_by_table:
        records_by_table[target_table] = []
        new_inserts_by_table[target_table] = []
        
    search_path = os.path.join(normalized_dir, portal, content_type, "*")
    files = glob.glob(search_path)
    
    for filepath in files:
        filename = os.path.basename(filepath)
        data = None
        if filename.endswith(".json"):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        elif filename.endswith(".md"):
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            if content.startswith("---"):
                parts = content.split("---")
                if len(parts) >= 3:
                    try:
                        import yaml
                        data = yaml.safe_load(parts[1])
                    except:
                        data = parse_frontmatter(parts[1])
                    body_ar = parts[2].strip()
                    data["body_ar"] = body_ar
        
        if not data:
            continue
            
        obj_id = data.get("id")
        title_ar = data.get("title_ar", "")
        title_en = data.get("title_en", "")
        category = data.get("category", "")
        tags = data.get("tags", [])
        sort_order = data.get("sort_order", 0)
        
        is_already_imported = obj_id in already_imported_ids
        
        record_info = {
            "id": obj_id,
            "source_file": filepath.replace(base_dir, "").replace("\\", "/").lstrip("/"),
            "target_table": target_table,
            "portal_id": data.get("portal_id", portal),
            "content_type": data.get("content_type", content_type),
            "status_to_insert": "draft",
            "title_ar": title_ar,
            "title_en": title_en,
            "category": category,
            "sort_order": sort_order,
            "already_imported": is_already_imported,
            "included_in_this_import": not is_already_imported,
            "exclusion_reason": "Already imported in persistent pilot" if is_already_imported else ""
        }
        all_tier_a_records.append(record_info)
        records_by_table[target_table].append(data)
        if not is_already_imported:
            new_inserts_by_table[target_table].append(data)

total_tier_a = len(all_tier_a_records)
already_imported_count = len(already_imported_ids)
remaining_count = sum(len(lst) for lst in new_inserts_by_table.values())

assert total_tier_a == 600, f"Expected 600 total Tier-A records, found {total_tier_a}"
assert remaining_count == 590, f"Expected 590 remaining records, found {remaining_count}"

# Generate Master SQL
sql_parts = []
sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 1 — Pre-checks")
sql_parts.append("-- ==============================================================================")
sql_parts.append("")

for table in allowed_tables:
    sql_parts.append(f"SELECT count(*) AS pre_count_{table} FROM {table};")

sql_parts.append("")
already_imported_list = ", ".join([f"'{i}'" for i in already_imported_ids])
sql_parts.append(f"-- confirm the 10 already-imported IDs exist and are all draft")
sql_parts.append(f"SELECT id, status FROM career_glossary WHERE id IN ({already_imported_list});")

sql_parts.append("")
sql_parts.append("-- confirm none of the 590 remaining IDs already exist in their target tables")
for table, records in new_inserts_by_table.items():
    if not records: continue
    ids = ", ".join([f"'{r['id']}'" for r in records])
    sql_parts.append(f"SELECT count(*) AS exist_count_{table} FROM {table} WHERE id IN ({ids});")

sql_parts.append("")
sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 2 — Begin transaction")
sql_parts.append("-- ==============================================================================")
sql_parts.append("BEGIN;")
sql_parts.append("")

sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 3 — Insert remaining Tier-A draft records (590)")
sql_parts.append("-- ==============================================================================")
sql_parts.append("")

for table, records in new_inserts_by_table.items():
    if not records: continue
    sql_parts.append(f"-- Insert into {table} ({len(records)} records)")
    
    val_strings_uniform = []
    for data in records:
        data_json_str = json.dumps(data.get("data", {}), ensure_ascii=False).replace("'", "''")
        title_ar = str(data.get("title_ar", "")).replace("'", "''")
        title_en = str(data.get("title_en", "")).replace("'", "''")
        category = str(data.get("category", "")).replace("'", "''")
        tags = data.get("tags", [])
        if type(tags) is str:
            tags = [tags]
        tags_arr = "ARRAY[" + ", ".join(["'" + t.replace("'", "''") + "'" for t in tags]) + "]::text[]" if tags else "ARRAY[]::text[]"
        body_ar = data.get("body_ar")
        body_ar_str = f"'{body_ar.replace(chr(39), chr(39)+chr(39))}'" if body_ar else "NULL"
        
        val = f"('{data['id']}', '{data.get('portal_id','').replace(chr(39), chr(39)+chr(39))}', '{data.get('content_type','').replace(chr(39), chr(39)+chr(39))}', 'draft', {str(data.get('featured', False)).lower()}, {data.get('sort_order', 0)}, '{category}', '{title_ar}', '{title_en}', {tags_arr}, {body_ar_str}, '{data_json_str}'::jsonb)"
        val_strings_uniform.append(val)
        
    sql_parts.append(f"INSERT INTO {table} (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, tags, body_ar, data) VALUES")
    sql_parts.append(",\n".join(val_strings_uniform) + ";")
    sql_parts.append("")


sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 4 — Assertion guards before commit")
sql_parts.append("-- ==============================================================================")
sql_parts.append("DO $$")
sql_parts.append("DECLARE")
sql_parts.append("  total_draft INT := 0;")
sql_parts.append("  total_pub INT := 0;")
sql_parts.append("  tbl_count INT := 0;")
sql_parts.append("  prev_10 INT := 0;")
sql_parts.append("BEGIN")

for table in allowed_tables:
    sql_parts.append(f"  SELECT count(*) INTO tbl_count FROM {table} WHERE status = 'draft';")
    sql_parts.append(f"  total_draft := total_draft + tbl_count;")
    sql_parts.append(f"  SELECT count(*) INTO tbl_count FROM {table} WHERE status = 'published';")
    sql_parts.append(f"  total_pub := total_pub + tbl_count;")

sql_parts.append(f"  SELECT count(*) INTO prev_10 FROM career_glossary WHERE id IN ({already_imported_list});")

sql_parts.append("  IF total_draft != 600 THEN")
sql_parts.append("    RAISE EXCEPTION 'Assertion failed: expected 600 total draft records, got %', total_draft;")
sql_parts.append("  END IF;")
sql_parts.append("  IF total_pub != 0 THEN")
sql_parts.append("    RAISE EXCEPTION 'Assertion failed: expected 0 published records, got %', total_pub;")
sql_parts.append("  END IF;")
sql_parts.append("  IF prev_10 != 10 THEN")
sql_parts.append("    RAISE EXCEPTION 'Assertion failed: expected 10 previous records, got %', prev_10;")
sql_parts.append("  END IF;")
sql_parts.append("END $$;")
sql_parts.append("")

sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 5 — Commit")
sql_parts.append("-- ==============================================================================")
sql_parts.append("COMMIT;")
sql_parts.append("")

sql_parts.append("-- ==============================================================================")
sql_parts.append("-- SECTION 6 — Post-commit verification queries")
sql_parts.append("-- ==============================================================================")
for table in allowed_tables:
    sql_parts.append(f"SELECT '{table}' AS table_name, count(*) AS final_count FROM {table};")

master_sql_path = os.path.join(audit_dir, "final-tier-a-draft-import-master.sql")
with open(master_sql_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_parts))

# Generate Emergency Rollback
rollback_parts = []
rollback_parts.append("-- EMERGENCY ROLLBACK ONLY — DO NOT RUN UNLESS USER APPROVES")
rollback_parts.append("")
for table, records in new_inserts_by_table.items():
    if not records: continue
    ids = ", ".join([f"'{r['id']}'" for r in records])
    rollback_parts.append(f"DELETE FROM {table} WHERE id IN ({ids});")

rollback_parts.append("")
rollback_parts.append("-- Verify 590 gone")
for table, records in new_inserts_by_table.items():
    if not records: continue
    ids = ", ".join([f"'{r['id']}'" for r in records])
    rollback_parts.append(f"SELECT '{table}' AS table_name, count(*) AS remaining_count FROM {table} WHERE id IN ({ids});")

rollback_parts.append("")
rollback_parts.append("-- Verify final Tier-A count returns to 10")
rollback_parts.append(f"SELECT count(*) AS final_career_glossary_count FROM career_glossary;")

rollback_path = os.path.join(audit_dir, "final-tier-a-draft-import-emergency-rollback.sql")
with open(rollback_path, "w", encoding="utf-8") as f:
    f.write("\n".join(rollback_parts))

# CSV Details
csv_path = os.path.join(audit_dir, "final-tier-a-draft-import-details.csv")
with open(csv_path, "w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=[
        "id", "source_file", "target_table", "portal_id", "content_type",
        "status_to_insert", "title_ar", "title_en", "category", "sort_order",
        "already_imported", "included_in_this_import", "exclusion_reason"
    ])
    writer.writeheader()
    for row in all_tier_a_records:
        writer.writerow(row)

# Summary JSON
summary = {
    "tier_a_total_records": total_tier_a,
    "already_imported_records_count": already_imported_count,
    "remaining_records_to_import": remaining_count,
    "expected_final_tier_a_count": 600,
    "target_tables": list(allowed_tables),
    "excluded_categories": [
        "live-wired 210 records", "deferred 230 records", "tools_hub", "nano_banana",
        "nano_banana_custom_prompts", "nano_banana_saved_prompts"
    ],
    "status_to_insert": "draft",
    "persistent_import": True,
    "uses_transaction": True,
    "contains_commit": True,
    "contains_rollback": False,
    "emergency_rollback_separate_file": True,
    "expected_new_insert_count": 590,
    "expected_draft_count": 600,
    "expected_published_count": 0,
    "touches_tables": list(allowed_tables),
    "forbidden_tables_touched": [],
    "safe_for_manual_execution": True
}
json_path = os.path.join(audit_dir, "final-tier-a-draft-import-summary.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

# Plan MD
plan_md = f"""# Final Tier-A Draft Import Execution Plan

## 1. Executive Summary
This document outlines the final bulk execution package to persistently import all remaining 590 Tier-A records into their designated 19 core tables. The script is designed as a single, transactional SQL payload with robust assertion checks that will `COMMIT` automatically only if all data integrity constraints are satisfied. 

## 2. Scope Definition
- **Total Tier-A records:** {total_tier_a}
- **Already imported:** {already_imported_count}
- **Remaining to import:** {remaining_count}
- **Expected final count:** 600

## 3. Why This Is 590 Records, Not 1,040
The 1,040 records analyzed during the initial dry-run include records mapped to existing live-wired tables (210) and deferred tables (230) like `tools_hub` and `nano_banana`. The Tier-A safe subset is strictly 600 records mapping entirely to isolated new tables.

## 4. Already Imported 10 Records
The 10 records previously imported into `career_glossary` remain safely untouched. The script explicitly excludes them from the `INSERT` operation.

## 5. Remaining Records Selected
Exactly 590 valid JSON/MD files. Details are cataloged in `final-tier-a-draft-import-details.csv`.

## 6. Target Tables
19 core target tables spanning: `career`, `language`, `digital_exams`, `ai`, `automation`, and `iot` paths. 

## 7. Excluded Records and Why
- **Live-Wired / Pre-existing tables:** Require separate review before importing.
- **tools_hub / nano_banana:** Deferred due to structural misalignment risks.

## 8. SQL Execution Instructions
1. Open the file `content-source/_audit/final-tier-a-draft-import-master.sql`.
2. Copy the entire file content.
3. Paste into Supabase SQL Editor.
4. Execute.

## 9. Expected Results
- The transaction initializes.
- 590 records are successfully `INSERTED` across 19 tables.
- All assertion checks pass.
- Transaction `COMMITS`.
- Post-commit queries display the updated row counts reflecting a total of 600 imported Tier-A drafts.

## 10. Assertion Guards
Before committing, the script explicitly verifies via a `DO $$` block:
- Total draft records = 600.
- Total published records = 0.
- Previously imported 10 records = Intact.
If any assertion fails, the database throws an exception and implicitly rolls back everything.

## 11. Emergency Rollback Plan
If an emergency requires undoing this specific 590-record import (e.g., frontend rendering bug found later), open `final-tier-a-draft-import-emergency-rollback.sql` and execute its contents. It performs precision `DELETE` statements scoped to these exact IDs without wiping the initial 10 records.

## 12. Safety Notes
- All inserts use `status = 'draft'`.
- Fully transactional: atomic success or atomic failure.

## 13. What Must Not Be Done
- Do NOT run the Emergency Rollback unless there is a confirmed disaster.
- Do NOT execute without reviewing the target tables list inside the master SQL.

## 14. Next Step After User Executes It
Upon success, the Tier-A import phase is officially complete! The project can then proceed to reviewing the 210 Live-Wired Tier-B records.
"""
plan_path = os.path.join(audit_dir, "final-tier-a-draft-import-plan.md")
with open(plan_path, "w", encoding="utf-8") as f:
    f.write(plan_md)

print("Generated all files successfully.")
