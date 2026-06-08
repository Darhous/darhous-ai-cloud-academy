import os
import json
import re
import csv
from datetime import datetime, timezone

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\content-source"
normalized_dir = os.path.join(base_dir, "_normalized")
audit_dir = os.path.join(base_dir, "_audit")
os.makedirs(audit_dir, exist_ok=True)

portals = ["ai-academy", "automation", "career", "digital-exams", "iot-lab", "language", "nano-banana", "tools-hub"]
target_folders = ["glossary", "prompts", "resources", "lessons"]

def contains_arabic(text):
    if not isinstance(text, str): return False
    return bool(re.search(r'[\u0600-\u06FF]', text))

def is_latin_only(text):
    if not isinstance(text, str): return False
    return not contains_arabic(text) and bool(re.search(r'[A-Za-z]', text))

def parse_yaml_frontmatter(content):
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not match:
        return None, content
    fm_str = match.group(1)
    fm = {}
    for line in fm_str.split('\n'):
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip()
            if val.startswith('"') and val.endswith('"'): val = val[1:-1]
            elif val.startswith("'") and val.endswith("'"): val = val[1:-1]
            if val == 'false': val = False
            elif val == 'true': val = True
            elif val == 'null': val = None
            elif val.startswith('[') and val.endswith(']'):
                items = val[1:-1].split(',')
                val = [i.strip().strip('"').strip("'") for i in items if i.strip()]
            fm[key] = val
    return fm, match.group(2)

total_files = 0
issues = []
ids = set()
slugs = set()
missing_counts = {"title_en": 0, "category": 0, "featured": 0, "tags": 0, "sort_order": 0, "excerpt_ar": 0, "reading_time": 0}
counts = {f"{p}/{f}": 0 for p in portals for f in target_folders}

for portal in portals:
    for folder in target_folders:
        dir_path = os.path.join(normalized_dir, portal, folder)
        if not os.path.exists(dir_path): continue
        
        ctype = "prompt" if folder == "prompts" else "resource" if folder == "resources" else "lesson" if folder == "lessons" else "glossary"

        for filename in os.listdir(dir_path):
            if not (filename.endswith(".json") or filename.endswith(".md")): continue
            filepath = os.path.join(dir_path, filename)
            total_files += 1
            counts[f"{portal}/{folder}"] += 1
            
            rel_path = f"_normalized/{portal}/{folder}/{filename}"
            meta = None
            
            if filename.endswith(".json"):
                with open(filepath, "r", encoding="utf-8") as f:
                    try:
                        meta = json.load(f)
                    except json.JSONDecodeError:
                        issues.append({"file": rel_path, "severity": "BLOCKER", "type": "INVALID_JSON", "desc": "File has invalid JSON"})
            elif filename.endswith(".md"):
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                meta, _ = parse_yaml_frontmatter(content)
                if meta is None:
                    issues.append({"file": rel_path, "severity": "BLOCKER", "type": "INVALID_YAML", "desc": "File has invalid YAML frontmatter"})
            
            if meta:
                doc_id = meta.get("id", "")
                if not doc_id:
                    issues.append({"file": rel_path, "severity": "BLOCKER", "type": "MISSING_ID", "desc": "Missing id field"})
                else:
                    if doc_id in ids:
                        issues.append({"file": rel_path, "severity": "BLOCKER", "type": "DUPLICATE_ID", "desc": f"Duplicate id: {doc_id}"})
                    ids.add(doc_id)
                    expected_filename = f"{doc_id}.json" if filename.endswith(".json") else f"{doc_id}.md"
                    if filename != expected_filename:
                        issues.append({"file": rel_path, "severity": "BLOCKER", "type": "ID_FILENAME_MISMATCH", "desc": f"Filename {filename} does not match id {doc_id}"})
                    
                    prefix = f"{portal}-{ctype}-"
                    slug = doc_id[len(prefix):] if doc_id.startswith(prefix) else doc_id
                    slug_key = f"{portal}-{folder}-{slug}"
                    if slug_key in slugs:
                        issues.append({"file": rel_path, "severity": "BLOCKER", "type": "DUPLICATE_SLUG", "desc": f"Duplicate slug: {slug}"})
                    slugs.add(slug_key)
                
                title_ar = meta.get("title_ar", "")
                title_en = meta.get("title_en", "")
                
                if is_latin_only(title_ar):
                    issues.append({"file": rel_path, "severity": "BLOCKER", "type": "TITLE_AR_LATIN_ONLY", "desc": "title_ar contains only English characters"})
                if contains_arabic(title_en):
                    issues.append({"file": rel_path, "severity": "HIGH", "type": "TITLE_EN_ARABIC", "desc": "title_en contains Arabic characters"})
                
                if meta.get("manual_review_required"):
                    # We will log it as LOW or explicitly ignore it as blocker, but let's log it as HIGH since it's an explicit manual review
                    issues.append({"file": rel_path, "severity": "HIGH", "type": "MANUAL_REVIEW_REQUIRED", "desc": "Item marked as manual_review_required"})

                for field in ["category", "tags", "sort_order"]:
                    if not meta.get(field) and meta.get(field) != 0:
                        missing_counts[field] += 1
                        issues.append({"file": rel_path, "severity": "HIGH", "type": "MISSING_FIELD", "desc": f"Missing field: {field}"})
                
                if meta.get("featured") is None:
                    missing_counts["featured"] += 1
                if not title_en:
                    missing_counts["title_en"] += 1
                if folder == "lessons" and not meta.get("excerpt_ar"):
                    missing_counts["excerpt_ar"] += 1
                if folder == "lessons" and not meta.get("reading_time"):
                    missing_counts["reading_time"] += 1

# Generate outputs
summary = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "total_files_checked": total_files,
    "total_issues_found": len(issues),
    "counts_by_portal_type": counts,
    "issue_counts_by_severity": {
        "BLOCKER": len([i for i in issues if i["severity"] == "BLOCKER"]),
        "HIGH": len([i for i in issues if i["severity"] == "HIGH"]),
        "MEDIUM": len([i for i in issues if i["severity"] == "MEDIUM"]),
        "LOW": len([i for i in issues if i["severity"] == "LOW"])
    },
    "missing_field_counts": missing_counts
}

with open(os.path.join(audit_dir, "normalized-schema-audit-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

with open(os.path.join(audit_dir, "normalized-schema-audit-details.csv"), "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=["file", "severity", "type", "desc"])
    writer.writeheader()
    writer.writerows(issues)

with open(os.path.join(audit_dir, "normalized-schema-audit-report.md"), "w", encoding="utf-8") as f:
    f.write("# Normalized Schema Audit Report\n\n")
    f.write(f"**Total Files Checked**: {total_files}\n")
    f.write(f"**Total Issues Found**: {len(issues)}\n\n")
    f.write("## Severity Summary\n")
    for sev, count in summary["issue_counts_by_severity"].items():
        f.write(f"- **{sev}**: {count}\n")
    f.write("\n## Blocker Issues\n")
    blockers = [i for i in issues if i["severity"] == "BLOCKER"]
    if blockers:
        for b in blockers[:50]:
            f.write(f"- `{b['file']}`: {b['desc']}\n")
        if len(blockers) > 50: f.write(f"- ... and {len(blockers)-50} more.\n")
    else:
        f.write("None! 🎉\n")

print(f"Audit complete. Found {len(issues)} issues. Blockers: {summary['issue_counts_by_severity']['BLOCKER']}")
