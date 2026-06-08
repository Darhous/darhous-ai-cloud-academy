import os
import json
import csv
import yaml
from datetime import datetime, timezone

NORMALIZED_DIR = "content-source/_normalized"
AUDIT_DIR = "content-source/_audit"

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

PLACEHOLDER_TITLES = {"Item 1", "Item 2", "Item 20", "Untitled", "Test", "Placeholder", "Item", "New"}

ACRONYMS = {
    "ai": "AI",
    "iot": "IoT",
    "api": "API",
    "url": "URL",
    "sql": "SQL",
    "cefr": "CEFR",
    "cv": "CV",
    "n8n": "n8n",
    "llm": "LLM",
    "ui": "UI",
    "ux": "UX"
}

def clean_title_en(record_id, portal, type_str):
    parts = record_id.split("-")
    to_remove = set(portal.split("-") + [type_str, type_str.rstrip('s')])
    
    filtered = []
    for p in parts:
        if p.lower() not in to_remove:
            filtered.append(p)
            
    if not filtered:
        filtered = parts # fallback
        
    final_words = []
    for w in filtered:
        lower_w = w.lower()
        if lower_w in ACRONYMS:
            final_words.append(ACRONYMS[lower_w])
        else:
            final_words.append(w.title())
            
    return " ".join(final_words)

def parse_md(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = parts[2].strip()
            record = yaml.safe_load(frontmatter)
            if not isinstance(record, dict):
                record = {}
            return record, body
    return {}, ""

def dump_md(filepath, record, body_ar):
    if "body_ar" in record:
        del record["body_ar"]
    frontmatter = yaml.dump(record, allow_unicode=True, sort_keys=False, default_flow_style=False)
    content = f"---\n{frontmatter}---\n{body_ar}\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

repairs_made = []
skipped_records = []

def repair_record(record, table, config, filepath, body_ar=""):
    changed = False
    file_repairs = []
    
    record_id = record.get("id", "")
    slug = record.get("slug", "")
    portal_id = record.get("portal_id", "")
    content_type = record.get("content_type", "")
    status = record.get("status", "")
    
    expected_type = config["type"].rstrip('s')
    if config["type"] == "glossary":
        expected_type = "glossary"

    if not slug and record_id:
        record["slug"] = record_id
        changed = True
        file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "slug", "", record_id, "slug_filled", "high", "Filled slug from id", "yes"))

    if portal_id != config["portal"]:
        record["portal_id"] = config["portal"]
        changed = True
        file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "portal_id", portal_id, config["portal"], "portal_normalized", "high", "Enforced portal_id mapping", "yes"))

    if content_type != expected_type and content_type != config["type"]:
        record["content_type"] = expected_type
        changed = True
        file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "content_type", content_type, expected_type, "type_normalized", "high", "Enforced content_type mapping", "yes"))

    if status != "draft":
        record["status"] = "draft"
        changed = True
        file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "status", status, "draft", "status_normalized", "high", "Enforced draft status", "yes"))

    title_en = record.get("title_en", "")
    if not title_en or any(p.lower() == title_en.lower() for p in PLACEHOLDER_TITLES) or "Item " in title_en:
        new_title = clean_title_en(record_id, config["portal"], expected_type)
        if new_title:
            record["title_en"] = new_title
            changed = True
            file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "title_en", title_en, new_title, "title_en_generated", "high", "Generated English title from slug with acronym handling", "yes"))

    has_excerpt_key = "excerpt_ar" in record
    excerpt_ar = record.get("excerpt_ar", "")
    
    b_ar = record.get("body_ar", body_ar)
    if has_excerpt_key and not excerpt_ar and b_ar:
        first_sentence = b_ar.split("\n")[0][:150].strip()
        if first_sentence:
            if not first_sentence.endswith("..."):
                first_sentence += "..."
            record["excerpt_ar"] = first_sentence
            changed = True
            file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "excerpt_ar", "", record["excerpt_ar"], "excerpt_ar_generated", "medium", "Generated Arabic excerpt from body", "yes"))
    elif has_excerpt_key and not excerpt_ar and not b_ar:
        skipped_records.append((filepath, "excerpt_ar is missing and no body_ar to derive from. Requires human translation/writing."))

    # Report if English excerpts are still missing to show conservative approach
    if "excerpt_en" in record and not record.get("excerpt_en"):
        skipped_records.append((filepath, "excerpt_en is missing. Skipped generating to avoid LLM hallucination and ensure safe metadata."))

    data = record.get("data", {})
    if isinstance(data, dict):
        if config["type"] == "glossary":
            if not data.get("definition_ar") and data.get("definition"):
                data["definition_ar"] = data["definition"]
                changed = True
                file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "data.definition_ar", "", str(data["definition"])[:50], "data_key_migrated", "high", "Migrated definition to definition_ar without removing old", "yes"))
        elif config["type"] == "prompts":
            if not data.get("prompt_text_ar") and data.get("prompt_text"):
                data["prompt_text_ar"] = data["prompt_text"]
                changed = True
                file_repairs.append((table, config["portal"], expected_type, record_id, filepath, "data.prompt_text_ar", "", str(data["prompt_text"])[:50], "data_key_migrated", "high", "Migrated prompt_text to prompt_text_ar without removing old", "yes"))
        
        if changed:
            record["data"] = data

    return changed, file_repairs

def main():
    if not os.path.exists(AUDIT_DIR):
        os.makedirs(AUDIT_DIR)

    files_changed_count = 0
    records_scanned = 0

    print("Executing Metadata Source Repair - Tier A (Safe Normalized)")
    print("----------------------------------------------------------")

    for table, config in CORE_TABLES.items():
        portal_dir = os.path.join(NORMALIZED_DIR, config["portal"], config["type"])
        if not os.path.exists(portal_dir):
            continue
        
        for filename in os.listdir(portal_dir):
            filepath = os.path.join(portal_dir, filename)
            records_scanned += 1
            if filename.endswith(".json"):
                with open(filepath, "r", encoding="utf-8") as f:
                    record = json.load(f)
                
                changed, file_repairs = repair_record(record, table, config, filepath)
                if changed:
                    with open(filepath, "w", encoding="utf-8") as f:
                        json.dump(record, f, ensure_ascii=False, indent=2)
                    files_changed_count += 1
                    repairs_made.extend(file_repairs)
            
            elif filename.endswith(".md"):
                record, body = parse_md(filepath)
                if record:
                    changed, file_repairs = repair_record(record, table, config, filepath, body)
                    if changed:
                        dump_md(filepath, record, body)
                        files_changed_count += 1
                        repairs_made.extend(file_repairs)

    csv_path = os.path.join(AUDIT_DIR, "tier-a-metadata-repair-details.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["table", "portal_id", "content_type", "record_id", "source_path", "field", "old_value_sample", "new_value_sample", "repair_type", "confidence", "reason", "applied"])
        writer.writerows(repairs_made)

    repair_summary = {
        "records_scanned": records_scanned,
        "files_changed": files_changed_count,
        "total_repairs_applied": len(repairs_made),
        "total_skipped_issues": len(skipped_records),
        "repair_types": {},
        "generated_at": datetime.now(timezone.utc).isoformat()
    }
    
    for r in repairs_made:
        t = r[8]
        repair_summary["repair_types"][t] = repair_summary["repair_types"].get(t, 0) + 1

    json_path = os.path.join(AUDIT_DIR, "tier-a-metadata-repair-summary.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(repair_summary, f, indent=2)

    md_path = os.path.join(AUDIT_DIR, "tier-a-metadata-repair-report.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# Tier-A Metadata Repair Report\n\n")
        f.write("This report details the safe deterministic metadata repairs applied to the normalized JSON/Markdown source files. No DB writes or Supabase sync was performed.\n\n")
        f.write(f"- **Records Scanned**: {records_scanned}\n")
        f.write(f"- **Files Changed**: {files_changed_count}\n")
        f.write(f"- **Total Repairs Applied**: {len(repairs_made)}\n")
        f.write(f"- **Total Skipped Issues (Uncertain)**: {len(skipped_records)}\n\n")
        f.write("## Repair Types\n")
        for k, v in repair_summary["repair_types"].items():
            f.write(f"- **{k}**: {v}\n")
        
        f.write("\n## Skipped Records Examples\n")
        for sr in skipped_records[:10]:
            f.write(f"- {sr[0]}: {sr[1]}\n")
            
        f.write("\n## Next Steps\n")
        f.write("Verify the new metadata passes audit, then run automated scripts/SQL to apply these updates to the Supabase database.\n")

    print(f"Records scanned: {records_scanned}")
    print(f"Files changed: {files_changed_count}")
    print(f"Total repairs applied: {len(repairs_made)}")
    print(f"Total skipped issues: {len(skipped_records)}")
    print("Reports generated in content-source/_audit/")
    print("Run `python content-source/_audit/audit-tier-a-metadata.py` next.")

if __name__ == "__main__":
    main()
