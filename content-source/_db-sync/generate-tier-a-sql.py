import os
import json
import yaml
import csv
from datetime import datetime, timezone

NORMALIZED_DIR = "content-source/_normalized"
SYNC_DIR = "content-source/_db-sync"

CORE_TABLES = {
    "ai_lessons": {"portal": "ai-academy", "type": "lessons", "expected": 20},
    "ai_resources": {"portal": "ai-academy", "type": "resources", "expected": 30},
    "automation_lessons": {"portal": "automation", "type": "lessons", "expected": 20},
    "automation_resources": {"portal": "automation", "type": "resources", "expected": 30},
    "career_glossary": {"portal": "career", "type": "glossary", "expected": 50},
    "career_lessons": {"portal": "career", "type": "lessons", "expected": 20},
    "career_prompts": {"portal": "career", "type": "prompts", "expected": 30},
    "career_resources": {"portal": "career", "type": "resources", "expected": 30},
    "digital_exams_glossary": {"portal": "digital-exams", "type": "glossary", "expected": 50},
    "digital_exams_lessons": {"portal": "digital-exams", "type": "lessons", "expected": 20},
    "digital_exams_prompts": {"portal": "digital-exams", "type": "prompts", "expected": 30},
    "digital_exams_resources": {"portal": "digital-exams", "type": "resources", "expected": 30},
    "iot_glossary": {"portal": "iot-lab", "type": "glossary", "expected": 50},
    "iot_prompts": {"portal": "iot-lab", "type": "prompts", "expected": 30},
    "iot_resources": {"portal": "iot-lab", "type": "resources", "expected": 30},
    "language_glossary": {"portal": "language", "type": "glossary", "expected": 50},
    "language_lessons": {"portal": "language", "type": "lessons", "expected": 20},
    "language_prompts": {"portal": "language", "type": "prompts", "expected": 30},
    "language_resources": {"portal": "language", "type": "resources", "expected": 30},
}

def escape_sql(val):
    if val is None:
        return "NULL"
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, dict) or isinstance(val, list):
        return "'" + json.dumps(val, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    return "'" + str(val).replace("'", "''") + "'"

def parse_md(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            record = yaml.safe_load(frontmatter)
            if not isinstance(record, dict):
                record = {}
            return record
    return {}

def main():
    if not os.path.exists(SYNC_DIR):
        os.makedirs(SYNC_DIR)

    sql_statements = []
    details_csv_rows = []
    
    update_count = 0
    update_count_by_table = {table: 0 for table in CORE_TABLES}
    skipped_count = 0
    skipped_reasons = {}

    for table, config in CORE_TABLES.items():
        portal_dir = os.path.join(NORMALIZED_DIR, config["portal"], config["type"])
        if not os.path.exists(portal_dir):
            continue
        
        sql_statements.append(f"-- Table: {table}")
        sql_statements.append(f"-- Expected updates: {config['expected']}\n")

        for filename in os.listdir(portal_dir):
            filepath = os.path.join(portal_dir, filename)
            if filename.endswith(".json"):
                with open(filepath, "r", encoding="utf-8") as f:
                    record = json.load(f)
            elif filename.endswith(".md"):
                record = parse_md(filepath)
            else:
                continue

            record_id = record.get("id")
            if not record_id:
                skipped_count += 1
                reason = "Missing ID"
                skipped_reasons[reason] = skipped_reasons.get(reason, 0) + 1
                continue

            # Deterministic fields to sync
            fields_to_update = {}
            
            if "slug" in record and record["slug"]:
                fields_to_update["slug"] = record["slug"]
            if "portal_id" in record and record["portal_id"]:
                fields_to_update["portal_id"] = record["portal_id"]
            if "content_type" in record and record["content_type"]:
                fields_to_update["content_type"] = record["content_type"]
            
            # Status always kept draft
            fields_to_update["status"] = "draft"
            
            if "title_en" in record and record["title_en"]:
                fields_to_update["title_en"] = record["title_en"]
            if "excerpt_ar" in record and record["excerpt_ar"]:
                fields_to_update["excerpt_ar"] = record["excerpt_ar"]
            if "data" in record and isinstance(record["data"], dict):
                fields_to_update["data"] = record["data"]

            if not fields_to_update:
                skipped_count += 1
                reason = "No fields to update"
                skipped_reasons[reason] = skipped_reasons.get(reason, 0) + 1
                continue

            # Build SQL statement
            set_clauses = []
            for col, val in fields_to_update.items():
                set_clauses.append(f"{col} = {escape_sql(val)}")
                
                details_csv_rows.append([
                    table, record_id, filepath, col, "unknown", str(val)[:50], "yes", "Syncing normalized value", "id match", "status='draft'"
                ])
                
            set_sql = ",\n    ".join(set_clauses)
            
            stmt = f"UPDATE {table}\nSET\n    {set_sql}\nWHERE id = {escape_sql(record_id)}\nAND status = 'draft';"
            sql_statements.append(stmt)
            
            update_count += 1
            update_count_by_table[table] += 1
            
        sql_statements.append("\n")

    # Write main SQL file
    sync_sql_path = os.path.join(SYNC_DIR, "tier-a-draft-metadata-sync.sql")
    with open(sync_sql_path, "w", encoding="utf-8") as f:
        f.write("-- Tier-A Draft Metadata Sync Package\n")
        f.write("-- GENERATED AUTOMATICALLY. DO NOT EXECUTE WITHOUT REVIEW.\n")
        f.write("-- This package synchronizes offline deterministic source repairs into existing Supabase draft records.\n")
        f.write("-- Scope: 19 Tier-A tables, Draft records only.\n\n")
        f.write("BEGIN;\n\n")
        
        for stmt in sql_statements:
            f.write(stmt + "\n")
            
        f.write("\n-- Verification Selects (Commented out but useful for manual inspection)\n")
        for table in CORE_TABLES:
            f.write(f"-- SELECT count(*) FROM {table} WHERE status = 'draft';\n")
            
        f.write("\n-- This transaction is safely wrapped.\n")
        f.write("-- Change ROLLBACK to COMMIT below only after careful review in Supabase SQL Editor.\n\n")
        f.write("ROLLBACK;\n")
        f.write("-- COMMIT;\n")

    # Write verification SQL file
    verif_sql_path = os.path.join(SYNC_DIR, "tier-a-draft-metadata-sync-verification.sql")
    with open(verif_sql_path, "w", encoding="utf-8") as f:
        f.write("-- Verification SQL for Tier-A Draft Metadata Sync\n\n")
        for table in CORE_TABLES:
            f.write(f"-- {table}\n")
            f.write(f"SELECT '{table}' AS table_name, status, COUNT(*) \nFROM {table} \nGROUP BY status;\n\n")
            
        f.write("-- Sample records inspection\n")
        f.write("SELECT id, slug, title_en, excerpt_ar, data \nFROM ai_lessons \nLIMIT 5;\n")

    # Write Rollback SQL file
    rollback_sql_path = os.path.join(SYNC_DIR, "tier-a-draft-metadata-sync-rollback.sql")
    with open(rollback_sql_path, "w", encoding="utf-8") as f:
        f.write("-- Rollback Documentation\n")
        f.write("-- WARNING: Safe deterministic rollback SQL cannot be generated because prior exact texts (like missing title_en) are not known from the normalized source alone.\n")
        f.write("-- Please perform rollback by reverting the GitHub repository to the previous commit (e.g., prior to normalization repair) and re-running an import script, or by restoring a Supabase Point-in-Time Recovery (PITR) backup.\n")

    # Write Details CSV
    csv_path = os.path.join(SYNC_DIR, "tier-a-draft-metadata-sync-details.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["table", "record_id", "source_path", "field", "old_db_value_known", "new_source_value_sample", "sql_update_generated", "reason", "safety_guard", "status_guard"])
        writer.writerows(details_csv_rows)

    # Write Summary JSON
    summary_data = {
        "expected_total_records": 600,
        "generated_update_count": update_count,
        "generated_update_count_by_table": update_count_by_table,
        "skipped_count": skipped_count,
        "skipped_reasons": skipped_reasons,
        "output_sql_files": [
            "tier-a-draft-metadata-sync.sql",
            "tier-a-draft-metadata-sync-verification.sql",
            "tier-a-draft-metadata-sync-rollback.sql"
        ],
        "dry_run_default": True,
        "requires_manual_execution": True,
        "supabase_executed": False,
        "generated_at": datetime.now(timezone.utc).isoformat()
    }
    
    json_path = os.path.join(SYNC_DIR, "tier-a-draft-metadata-sync-summary.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2)

if __name__ == "__main__":
    main()
