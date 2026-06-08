import os
import json
import csv
from datetime import datetime

NORMALIZED_DIR = "content-source/_normalized"
AUDIT_DIR = "content-source/_audit"

# The 19 core tables mapped to their portal and type
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

issues = []
records_scanned = 0
table_counts = {t: 0 for t in CORE_TABLES}
readiness_counts = {
    "READY_FOR_REVIEW": 0,
    "NEEDS_METADATA_REPAIR": 0,
    "NEEDS_CONTENT_REPAIR": 0,
    "NEEDS_TRANSLATION_REPAIR": 0,
    "NEEDS_SCHEMA_REVIEW": 0,
    "BLOCKED": 0,
}
severity_counts = {
    "BLOCKER": 0,
    "HIGH": 0,
    "MEDIUM": 0,
    "LOW": 0
}

def add_issue(table, portal_id, content_type, record_id, slug, title_ar, title_en, field, issue_type, severity, sample, recommendation):
    issues.append({
        "table": table,
        "portal_id": portal_id,
        "content_type": content_type,
        "record_id": record_id,
        "slug": slug,
        "title_ar": title_ar,
        "title_en": title_en,
        "field": field,
        "issue_type": issue_type,
        "severity": severity,
        "current_value_sample": str(sample)[:100].replace('\n', ' '),
        "recommendation": recommendation
    })
    severity_counts[severity] += 1

def check_record(record, table, config):
    global records_scanned
    records_scanned += 1
    table_counts[table] += 1

    record_id = record.get("id", "")
    slug = record.get("slug", "")
    portal_id = record.get("portal_id", "")
    content_type = record.get("content_type", "")
    status = record.get("status", "")
    title_ar = record.get("title_ar", "")
    title_en = record.get("title_en", "")
    excerpt_ar = record.get("excerpt_ar", "")
    excerpt_en = record.get("excerpt_en", "")
    body_ar = record.get("body_ar", "")
    body_en = record.get("body_en", "")

    record_issues = []

    # 1. Identity Fields
    if not record_id:
        record_issues.append(("id", "missing_id", "BLOCKER", "", "Add unique ID"))
    if not slug:
        record_issues.append(("slug", "missing_slug", "BLOCKER", "", "Add slug"))
    if portal_id != config["portal"]:
        record_issues.append(("portal_id", "mismatch", "BLOCKER", portal_id, f"Set to {config['portal']}"))
    if content_type != config["type"]:
        record_issues.append(("content_type", "mismatch", "BLOCKER", content_type, f"Set to {config['type']}"))

    # 2. Draft Safety
    if status != "draft":
        record_issues.append(("status", "not_draft", "BLOCKER", status, "Set to draft"))

    # 3. Arabic Quality Fields
    if not title_ar:
        record_issues.append(("title_ar", "missing", "HIGH", "", "Add Arabic title"))
    elif title_ar in PLACEHOLDER_TITLES or "Item" in title_ar:
        record_issues.append(("title_ar", "placeholder", "HIGH", title_ar, "Replace placeholder"))
    
    # Excerpt / Body presence based on type
    has_excerpt = "excerpt_ar" in record
    if has_excerpt and not excerpt_ar:
        record_issues.append(("excerpt_ar", "missing", "MEDIUM", "", "Generate from body_ar"))
    
    if "body_ar" in record and not body_ar:
        record_issues.append(("body_ar", "missing", "HIGH", "", "Add Arabic body content"))

    # 4. English Metadata Quality
    if not title_en:
        record_issues.append(("title_en", "missing", "HIGH", "", "Generate English title from Arabic source"))
    elif title_en in PLACEHOLDER_TITLES or "Item" in title_en:
        record_issues.append(("title_en", "placeholder", "HIGH", title_en, "Generate English title from Arabic source"))
    elif title_en == title_ar:
        record_issues.append(("title_en", "copied_arabic", "MEDIUM", title_en, "Translate to English"))

    if has_excerpt and not excerpt_en:
        record_issues.append(("excerpt_en", "missing", "MEDIUM", "", "Generate from Arabic excerpt/body"))

    if "body_en" in record and not body_en:
        # Often empty in Tier-A
        record_issues.append(("body_en", "missing", "MEDIUM", "", "Fill missing body_en later via translation station"))

    # 5. JSONB quality
    data = record.get("data", {})
    if isinstance(data, dict):
        if not data:
            record_issues.append(("data", "empty_object", "MEDIUM", "{}", "Populate structured data"))
        else:
            # Check for glossary
            if config["type"] == "glossary":
                if not data.get("definition_ar"):
                    record_issues.append(("data.definition_ar", "missing", "HIGH", "", "Add definition"))
            elif config["type"] == "prompts":
                if not data.get("prompt_text_ar") and not record.get("body_ar"):
                    record_issues.append(("data.prompt", "missing", "HIGH", "", "Add prompt text"))
    elif data is None:
        pass # Some might not use data
    else:
        record_issues.append(("data", "invalid_shape", "BLOCKER", str(type(data)), "Ensure data is JSON object"))

    tags = record.get("tags", [])
    if isinstance(tags, list):
        if len(tags) == 0:
            record_issues.append(("tags", "empty", "LOW", "[]", "Add relevant tags"))
    elif tags is not None:
        record_issues.append(("tags", "invalid_shape", "MEDIUM", str(type(tags)), "Ensure tags is array"))

    # Assign to global issues list and determine readiness
    has_blocker = False
    has_high = False
    has_medium = False
    for field, iss_type, severity, sample, rec in record_issues:
        add_issue(table, portal_id, content_type, record_id, slug, title_ar, title_en, field, iss_type, severity, sample, rec)
        if severity == "BLOCKER": has_blocker = True
        if severity == "HIGH": has_high = True
        if severity == "MEDIUM": has_medium = True
        
    if has_blocker:
        readiness_counts["BLOCKED"] += 1
    elif has_high:
        readiness_counts["NEEDS_METADATA_REPAIR"] += 1 # Or CONTENT_REPAIR based on field, but group them
    elif has_medium:
        readiness_counts["NEEDS_TRANSLATION_REPAIR"] += 1
    else:
        readiness_counts["READY_FOR_REVIEW"] += 1


def main():
    if not os.path.exists(AUDIT_DIR):
        os.makedirs(AUDIT_DIR)
        
    for table, config in CORE_TABLES.items():
        portal_dir = os.path.join(NORMALIZED_DIR, config["portal"], config["type"])
        if not os.path.exists(portal_dir):
            continue
        
        for filename in os.listdir(portal_dir):
            if filename.endswith(".json"):
                filepath = os.path.join(portal_dir, filename)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        record = json.load(f)
                        check_record(record, table, config)
                except Exception as e:
                    add_issue(table, config["portal"], config["type"], filename, "", "", "", "file", "parse_error", "BLOCKER", str(e), "Fix JSON syntax")

    # CSV
    csv_path = os.path.join(AUDIT_DIR, "tier-a-metadata-quality-details.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "table", "portal_id", "content_type", "record_id", "slug", 
            "title_ar", "title_en", "field", "issue_type", "severity", 
            "current_value_sample", "recommendation"
        ])
        writer.writeheader()
        writer.writerows(issues)

    # JSON
    json_summary = {
        "total_records_scanned": records_scanned,
        "expected_total_records": sum(c["expected"] for c in CORE_TABLES.values()),
        "records_by_table": table_counts,
        "issues_by_severity": severity_counts,
        "issues_by_type": {},
        "readiness_counts": readiness_counts,
        "blocker_count": severity_counts["BLOCKER"],
        "high_count": severity_counts["HIGH"],
        "medium_count": severity_counts["MEDIUM"],
        "low_count": severity_counts["LOW"],
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }
    
    # Calculate issues by type
    for iss in issues:
        t = iss["issue_type"]
        json_summary["issues_by_type"][t] = json_summary["issues_by_type"].get(t, 0) + 1

    json_path = os.path.join(AUDIT_DIR, "tier-a-metadata-quality-summary.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(json_summary, f, indent=2)

    # Markdown
    md_path = os.path.join(AUDIT_DIR, "tier-a-metadata-quality-report.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# Tier-A Metadata Quality Report\n\n")
        f.write("## 1. Executive Summary\n")
        f.write("This report details the metadata quality gaps in the 600 imported Tier-A draft records. ")
        f.write("No DB writes, public publishing, or data mutations were performed. This is a read-only audit.\n\n")
        
        f.write("## 2. Scope\n")
        f.write(f"- **Total Records Scanned**: {records_scanned} / {json_summary['expected_total_records']}\n")
        f.write(f"- **Total Issues Found**: {len(issues)}\n")
        f.write("- **Excluded**: tools_hub, nano_banana, live-wired records, deferred records.\n\n")
        
        f.write("## 3. Counts by Portal/Table\n")
        for table, count in table_counts.items():
            f.write(f"- `{table}`: {count} (Expected: {CORE_TABLES[table]['expected']})\n")
            
        f.write("\n## 4. Total Issues by Severity\n")
        for sev, count in severity_counts.items():
            f.write(f"- **{sev}**: {count}\n")
            
        f.write("\n## 5. Public Readiness Summary\n")
        for state, count in readiness_counts.items():
            f.write(f"- **{state}**: {count}\n")

        f.write("\n## 6. Examples of Representative Problems\n")
        f.write("| Table | Record ID | Field | Issue | Recommendation |\n")
        f.write("|---|---|---|---|---|\n")
        for i, iss in enumerate(issues[:20]):
            f.write(f"| {iss['table']} | {iss['record_id']} | {iss['field']} | {iss['issue_type']} ({iss['severity']}) | {iss['recommendation']} |\n")

        f.write("\n## 7. Recommended Next Repair Station\n")
        f.write("Based on this audit, the next station should focus on applying the recommended repairs (e.g., generating `title_en` and `excerpt_*` fields) via safely reviewed transaction-wrapped SQL or automated tooling.\n")
        f.write("\n**EXPLICIT CONFIRMATION**: No database writes, publishing, or public UI wiring happened during this audit.\n")

if __name__ == "__main__":
    main()
