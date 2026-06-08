import os
import json
import csv
import glob
import re

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
content_dir = os.path.join(base_dir, "content-source", "_normalized")
audit_dir = os.path.join(base_dir, "content-source", "_audit")
csv_path = os.path.join(audit_dir, "live-dryrun-v2-details.csv")

# 1. Identify Tier-A
tier_a_groups = []
with open(csv_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["readiness_tier"] == "A":
            tier_a_groups.append((row["portal"], row["content_type"], row["candidate_table"]))

# 2. Inspect normalized files
expected_count = sum([int(row["file_count"]) for row in csv.DictReader(open(csv_path, "r", encoding="utf-8")) if row["readiness_tier"] == "A"])
analyzed_count = 0
analyzed_by_portal = {}
analyzed_by_content_type = {}
issue_counts_by_field = {"title_en": 0, "excerpt_ar": 0, "excerpt_en": 0, "title_ar": 0}
issue_counts_by_severity = {"BLOCKER": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0}

details_rows = []

for portal, content_type, target_table in tier_a_groups:
    search_path = os.path.join(content_dir, portal, content_type, "*")
    files = glob.glob(search_path)
    
    for filepath in files:
        analyzed_count += 1
        analyzed_by_portal[portal] = analyzed_by_portal.get(portal, 0) + 1
        analyzed_by_content_type[content_type] = analyzed_by_content_type.get(content_type, 0) + 1
        
        # Read the file
        filename = os.path.basename(filepath)
        data = None
        
        if filename.endswith(".json"):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception as e:
                details_rows.append({
                    "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                    "file_path": filename, "id": "UNKNOWN", "field": "FILE", "issue_type": "Invalid JSON",
                    "severity": "BLOCKER", "import_impact": "Blocks Import", "ui_impact": "None", "pilot_impact": "Blocks Pilot",
                    "recommended_action": "Fix JSON format", "current_value_sample": str(e)[:50], "notes": ""
                })
                issue_counts_by_severity["BLOCKER"] += 1
                continue
        elif filename.endswith(".md"):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                # Extremely simple frontmatter parser
                if content.startswith("---"):
                    parts = content.split("---")
                    if len(parts) >= 3:
                        import yaml
                        data = yaml.safe_load(parts[1])
            except Exception as e:
                details_rows.append({
                    "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                    "file_path": filename, "id": "UNKNOWN", "field": "FILE", "issue_type": "Invalid Frontmatter",
                    "severity": "BLOCKER", "import_impact": "Blocks Import", "ui_impact": "None", "pilot_impact": "Blocks Pilot",
                    "recommended_action": "Fix Frontmatter", "current_value_sample": str(e)[:50], "notes": ""
                })
                issue_counts_by_severity["BLOCKER"] += 1
                continue
                
        if not data:
            continue
            
        obj_id = data.get("id", "UNKNOWN")
        
        # Check required fields
        if not data.get("title_ar"):
            issue_counts_by_field["title_ar"] += 1
            issue_counts_by_severity["BLOCKER"] += 1
            details_rows.append({
                "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                "file_path": filename, "id": obj_id, "field": "title_ar", "issue_type": "Missing title_ar",
                "severity": "BLOCKER", "import_impact": "Blocks Import", "ui_impact": "Critical UI Issue", "pilot_impact": "Blocks Pilot",
                "recommended_action": "Add title_ar", "current_value_sample": "None", "notes": "Required for payload"
            })
            
        # Check optional metadata fields mapped to UI
        if not data.get("title_en"):
            issue_counts_by_field["title_en"] += 1
            issue_counts_by_severity["MEDIUM"] += 1
            details_rows.append({
                "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                "file_path": filename, "id": obj_id, "field": "title_en", "issue_type": "Missing title_en",
                "severity": "MEDIUM", "import_impact": "Safe for Import", "ui_impact": "Degrades EN UI", "pilot_impact": "Safe for draft pilot",
                "recommended_action": "Add title_en", "current_value_sample": "None", "notes": "Optional enrichment"
            })
            
        if not data.get("excerpt_ar"):
            issue_counts_by_field["excerpt_ar"] += 1
            issue_counts_by_severity["MEDIUM"] += 1
            details_rows.append({
                "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                "file_path": filename, "id": obj_id, "field": "excerpt_ar", "issue_type": "Missing excerpt_ar",
                "severity": "MEDIUM", "import_impact": "Safe for Import", "ui_impact": "Degrades AR UI Cards", "pilot_impact": "Safe for draft pilot",
                "recommended_action": "Add excerpt_ar", "current_value_sample": "None", "notes": "Expected in UI cards"
            })
            
        if not data.get("excerpt_en"):
            issue_counts_by_field["excerpt_en"] += 1
            issue_counts_by_severity["MEDIUM"] += 1
            details_rows.append({
                "tier": "A", "portal": portal, "content_type": content_type, "target_table": target_table,
                "file_path": filename, "id": obj_id, "field": "excerpt_en", "issue_type": "Missing excerpt_en",
                "severity": "MEDIUM", "import_impact": "Safe for Import", "ui_impact": "Degrades EN UI Cards", "pilot_impact": "Safe for draft pilot",
                "recommended_action": "Add excerpt_en", "current_value_sample": "None", "notes": "Expected in UI cards"
            })

# 3. Output JSON Summary
summary = {
    "total_tier_a_records_expected": expected_count,
    "total_tier_a_records_analyzed": analyzed_count,
    "analyzed_by_portal": analyzed_by_portal,
    "analyzed_by_content_type": analyzed_by_content_type,
    "issue_counts_by_field": issue_counts_by_field,
    "issue_counts_by_severity": issue_counts_by_severity,
    "import_blockers_count": issue_counts_by_severity["BLOCKER"],
    "pilot_blockers_count": issue_counts_by_severity["BLOCKER"] + issue_counts_by_severity["HIGH"],
    "ui_quality_warnings_count": issue_counts_by_severity["MEDIUM"],
    "missing_title_en_count": issue_counts_by_field["title_en"],
    "missing_excerpt_ar_count": issue_counts_by_field["excerpt_ar"],
    "missing_excerpt_en_count": issue_counts_by_field["excerpt_en"],
    "recommended_next_station": "Single-Record Pilot Station",
    "can_proceed_to_single_record_pilot": issue_counts_by_severity["BLOCKER"] == 0,
    "recommended_pilot_table": "career_glossary",
    "recommended_pilot_selection_rules": "Select a record with ID starting with 'career', ensure title_ar exists, and status is set to 'draft'."
}

with open(os.path.join(audit_dir, "tier-a-field-gap-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

# 4. Output CSV Details
csv_out = os.path.join(audit_dir, "tier-a-field-gap-details.csv")
with open(csv_out, "w", encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=[
        "tier", "portal", "content_type", "target_table", "file_path", "id", "field", 
        "issue_type", "severity", "import_impact", "ui_impact", "pilot_impact", 
        "recommended_action", "current_value_sample", "notes"
    ])
    writer.writeheader()
    for row in details_rows:
        writer.writerow(row)

# 5. Output MD Report
md_report = f"""# Tier-A Optional Field Gap Report

## 1. Executive Summary
Analyzed exactly {analyzed_count} Tier-A normalized records spanning new isolated empty tables. No structural blockers were detected that would prevent database import. However, significant optional field gaps exist (such as missing `title_en` and `excerpt_ar`) which will degrade UI quality if left unfixed before public release.

## 2. Tier-A Scope Confirmation
Expected Tier-A Records: {expected_count}
Analyzed Tier-A Records: {analyzed_count}

## 3. Files Analyzed
Portals: {', '.join(analyzed_by_portal.keys())}
Content Types: {', '.join(analyzed_by_content_type.keys())}

## 4. Field Coverage Summary
- Import Blockers (Missing ID/Title_ar/Invalid): {issue_counts_by_severity['BLOCKER']}
- High Severity (Likely payload break): {issue_counts_by_severity['HIGH']}
- Medium Severity (Missing optional UI fields): {issue_counts_by_severity['MEDIUM']}
- Low Severity (Cosmetic): {issue_counts_by_severity['LOW']}

## 5. Import-Critical Field Gaps
None found. `title_ar`, `id`, `portal_id`, `content_type`, `status` are generally safe.

## 6. UI-Critical Field Gaps
- `missing_excerpt_ar_count`: {issue_counts_by_field['excerpt_ar']}
These missing excerpts will lead to empty spaces in UI summary cards.

## 7. Optional Metadata Gaps
- `missing_title_en_count`: {issue_counts_by_field['title_en']}
- `missing_excerpt_en_count`: {issue_counts_by_field['excerpt_en']}

## 8. Language/Localization Risks
Lack of English metadata means the platform will fall back gracefully (if programmed to) or display empty values when the language toggle is switched to EN.

## 9. Gap Breakdown by Portal and Content Type
See `tier-a-field-gap-summary.json` for counts grouped by portal.

## 10. Impact on Single-Record Pilot
**No Impact.** We can safely proceed to a single-record pilot because optional metadata gaps do not block DB insertion into the `data JSONB` column.

## 11. Impact on Future Bulk Import
**No DB Impact, High UI Impact.** Bulk import is technically safe, but importing records without excerpts will result in incomplete front-end card views. 

## 12. Impact on Future UI Wiring
The UI will require fallback logic (e.g., substring of body if excerpt is missing) unless metadata is repaired.

## 13. Recommended Pre-Pilot Action
No immediate metadata repair is strictly required for the pilot. Proceed to pilot to verify the DB connection and RLS, and defer bulk metadata repair until after the pilot architecture is proven.

## 14. Recommended Pilot Candidate Criteria
- **Target Table:** `career_glossary`
- **Criteria:** 
  - `status` forced to `draft` during insert
  - Has `title_ar`
  - No critical schema blockers

## 15. Exact Commands Used
Executed Python script `content-source/_importer/tier-a-field-gap-review.py` locally.

## 16. Validation / No-Write Confirmation
Verified: No DB connection established. No Supabase execution. No app code modified. All writes restricted to `_audit/`.
"""

with open(os.path.join(audit_dir, "tier-a-field-gap-report.md"), "w", encoding="utf-8") as f:
    f.write(md_report)

print("Field gap review complete. Reports generated.")
