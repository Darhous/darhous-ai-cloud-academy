import os
import json
import re
import csv

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\content-source"
normalized_dir = os.path.join(base_dir, "_normalized")
audit_dir = os.path.join(base_dir, "_audit")
audit_details_file = os.path.join(audit_dir, "normalized-schema-audit-details.csv")

def contains_arabic(text):
    if not isinstance(text, str): return False
    return bool(re.search(r'[\u0600-\u06FF]', text))

def is_latin_only(text):
    if not isinstance(text, str): return False
    return not contains_arabic(text) and bool(re.search(r'[A-Za-z]', text))

def apply_wrapper(text, ctype):
    # User's approved wrappers
    if ctype == "resource":
        return f"مورد {text}"
    elif ctype == "prompt":
        return f"برومبت {text}"
    elif ctype == "glossary":
        return f"مصطلح {text}"
    elif ctype == "lesson":
        return f"دليل {text}"
    return f"أداة {text}"

# Read audit details to find HIGH issues
files_to_repair = []
if os.path.exists(audit_details_file):
    with open(audit_details_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["severity"] == "HIGH" and row["type"] == "MANUAL_REVIEW_REQUIRED":
                files_to_repair.append(row["file"])

repaired_count = 0
for rel_path in files_to_repair:
    filepath = os.path.join(base_dir, rel_path)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    ctype = data.get("content_type", "")
    data_block = data.get("data", {})
    repaired = False
    
    # Check data.title
    data_title = data_block.get("title", "")
    
    if data_title:
        if contains_arabic(data_title):
            data["title_ar"] = data_title
            repaired = True
        elif is_latin_only(data_title):
            # Check description or definition for Arabic context first
            desc = data_block.get("description", "") or data_block.get("definition", "")
            match = re.search(r'^([\u0600-\u06FF\s]+)\s*\(' + re.escape(data_title) + r'\)', desc)
            if match:
                data["title_ar"] = match.group(1).strip()
            else:
                data["title_ar"] = apply_wrapper(data_title, ctype)
            repaired = True
            
        if "title" in data["data"]:
            del data["data"]["title"]
            
    # Fallback to title_en if data.title is missing
    elif data.get("title_en") and is_latin_only(data["title_en"]):
        data["title_ar"] = apply_wrapper(data["title_en"], ctype)
        repaired = True

    if repaired:
        del data["manual_review_required"]
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        repaired_count += 1

print(f"Repaired {repaired_count} out of {len(files_to_repair)} manual review items.")
