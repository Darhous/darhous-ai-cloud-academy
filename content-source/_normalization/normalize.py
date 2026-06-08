import os
import json
import re

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\content-source"
normalized_dir = os.path.join(base_dir, "_normalized")
normalization_dir = os.path.join(base_dir, "_normalization")

portals = ["ai-academy", "automation", "career", "digital-exams", "iot-lab", "language", "nano-banana", "tools-hub"]
target_folders = ["glossary", "prompts", "resources", "lessons"]

category_mapping = {
    "ai-academy": "الذكاء الاصطناعي",
    "automation": "الأتمتة",
    "career": "المسار المهني",
    "digital-exams": "الاختبارات الرقمية",
    "iot-lab": "إنترنت الأشياء",
    "language": "تعلم اللغات",
    "nano-banana": "نانو بانانا",
    "tools-hub": "منصة الأدوات"
}

tag_mapping = {
    "glossary": "مصطلحات",
    "prompts": "تلقينات",
    "resources": "موارد",
    "lessons": "دروس"
}

id_mapping = {}

def contains_arabic(text):
    if not isinstance(text, str):
        return False
    return bool(re.search(r'[\u0600-\u06FF]', text))

def is_latin_only(text):
    if not isinstance(text, str):
        return False
    return not contains_arabic(text)

def parse_yaml_frontmatter(content):
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not match:
        return {}, content
    
    fm_str = match.group(1)
    body = match.group(2)
    
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
            elif val == '[]': val = []
            elif val.startswith('[') and val.endswith(']'):
                items = val[1:-1].split(',')
                val = [i.strip().strip('"').strip("'") for i in items if i.strip()]
            
            fm[key] = val
    
    return fm, body

def dump_yaml_frontmatter(fm):
    lines = ["---"]
    order = ["id", "portal_id", "content_type", "title_ar", "title_en", "excerpt_ar", "excerpt_en", "category", "status", "featured", "tags", "sort_order", "reading_time", "parent_id", "manual_review_required"]
    for key in order:
        if key in fm:
            val = fm[key]
            if val is False: val_str = 'false'
            elif val is True: val_str = 'true'
            elif val is None: val_str = 'null'
            elif isinstance(val, list):
                val_str = "[" + ", ".join([f'"{i}"' for i in val]) + "]"
            elif isinstance(val, int):
                val_str = str(val)
            else:
                val_str = f'"{val}"'
            lines.append(f"{key}: {val_str}")
    
    for key, val in fm.items():
        if key not in order:
            if val is False: val_str = 'false'
            elif val is True: val_str = 'true'
            elif val is None: val_str = 'null'
            elif isinstance(val, list):
                val_str = "[" + ", ".join([f'"{i}"' for i in val]) + "]"
            elif isinstance(val, int):
                val_str = str(val)
            else:
                val_str = f'"{val}"'
            lines.append(f"{key}: {val_str}")

    lines.append("---")
    return "\n".join(lines)

def process_metadata(meta, portal, ctype, index, body=""):
    manual_review = False
    
    title_ar = meta.get("title_ar", "")
    title = meta.get("title")
    title_en = meta.get("title_en", "")
    
    if is_latin_only(title_ar):
        if title and contains_arabic(title):
            if not title_en:
                meta["title_en"] = title_ar
            meta["title_ar"] = title
        else:
            if not title_en:
                meta["title_en"] = title_ar
            meta["title_ar"] = "[مراجعة يدوية: العنوان مفقود]"
            manual_review = True
    
    if "title" in meta:
        del meta["title"]
    if "author" in meta:
        del meta["author"]
    if "date" in meta:
        del meta["date"]
    if "description" in meta:
        if ctype == "lesson" and not meta.get("excerpt_ar"):
            meta["excerpt_ar"] = meta["description"]
        del meta["description"]

    if not meta.get("title_en"):
        match = re.search(r'\((.*?)\)', meta.get("title_ar", ""))
        if match and is_latin_only(match.group(1)):
            meta["title_en"] = match.group(1).strip()
        else:
            meta["title_en"] = ""
            
    if not meta.get("category"):
        meta["category"] = category_mapping.get(portal, portal)
    if meta.get("featured") is None:
        meta["featured"] = False
    if "tags" not in meta or not meta["tags"]:
        meta["tags"] = [category_mapping.get(portal, portal), tag_mapping.get(ctype, ctype)]
    if "sort_order" not in meta:
        meta["sort_order"] = (index + 1) * 10
    if not meta.get("status"):
        meta["status"] = "draft"
    
    if ctype == "lesson":
        if not meta.get("excerpt_ar"):
            paragraphs = [p.strip() for p in body.split('\n\n') if p.strip() and not p.startswith('#') and not p.startswith('-') and contains_arabic(p)]
            if paragraphs:
                meta["excerpt_ar"] = paragraphs[0][:150] + "..." if len(paragraphs[0]) > 150 else paragraphs[0]
            else:
                meta["excerpt_ar"] = ""
        if not meta.get("excerpt_en"):
            meta["excerpt_en"] = ""
        if "reading_time" not in meta:
            word_count = len(body.split())
            meta["reading_time"] = max(1, word_count // 200)
        if "parent_id" not in meta:
            meta["parent_id"] = None

    if manual_review:
        meta["manual_review_required"] = True
        
    return meta

for portal in portals:
    portal_dir = os.path.join(base_dir, portal)
    out_portal_dir = os.path.join(normalized_dir, portal)
    os.makedirs(out_portal_dir, exist_ok=True)
    
    for folder in target_folders:
        folder_dir = os.path.join(portal_dir, folder)
        out_folder_dir = os.path.join(out_portal_dir, folder)
        os.makedirs(out_folder_dir, exist_ok=True)
        
        if not os.path.exists(folder_dir):
            continue
            
        ctype = "prompt" if folder == "prompts" else "resource" if folder == "resources" else "lesson" if folder == "lessons" else "glossary"
        
        files = sorted([f for f in os.listdir(folder_dir) if os.path.isfile(os.path.join(folder_dir, f))])
        
        seen_slugs = {}
        
        for idx, filename in enumerate(files):
            filepath = os.path.join(folder_dir, filename)
            
            if filename.endswith(".json"):
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                
                original_id = data.get("id", filename.replace(".json", ""))
                prefix = f"{portal}-{ctype}-"
                base_slug = original_id[len(prefix):] if original_id.startswith(prefix) else original_id
                
                if base_slug in seen_slugs:
                    seen_slugs[base_slug] += 1
                    base_slug = f"{base_slug}-{seen_slugs[base_slug]}"
                else:
                    seen_slugs[base_slug] = 1
                
                new_id = f"{portal}-{ctype}-{base_slug}"
                data["id"] = new_id
                
                expected_filename = f"{new_id}.json"
                if expected_filename != filename or original_id != new_id:
                    id_mapping[filepath] = {"original_filename": filename, "normalized_filename": expected_filename, "original_id": original_id, "normalized_id": new_id}
                
                data = process_metadata(data, portal, ctype, idx)
                
                out_filepath = os.path.join(out_folder_dir, expected_filename)
                with open(out_filepath, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                    
            elif filename.endswith(".md"):
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                fm, body = parse_yaml_frontmatter(content)
                original_id = fm.get("id", filename.replace(".md", ""))
                
                prefix = f"{portal}-{ctype}-"
                base_slug = original_id[len(prefix):] if original_id.startswith(prefix) else original_id
                
                if base_slug in seen_slugs:
                    seen_slugs[base_slug] += 1
                    base_slug = f"{base_slug}-{seen_slugs[base_slug]}"
                else:
                    seen_slugs[base_slug] = 1
                
                new_id = f"{portal}-{ctype}-{base_slug}"
                fm["id"] = new_id
                
                expected_filename = f"{new_id}.md"
                if expected_filename != filename or original_id != new_id:
                    id_mapping[filepath] = {"original_filename": filename, "normalized_filename": expected_filename, "original_id": original_id, "normalized_id": new_id}
                
                fm = process_metadata(fm, portal, ctype, idx, body=body)
                
                out_content = dump_yaml_frontmatter(fm) + "\n" + body
                
                out_filepath = os.path.join(out_folder_dir, expected_filename)
                with open(out_filepath, "w", encoding="utf-8") as f:
                    f.write(out_content)

with open(os.path.join(normalization_dir, "id-mapping.json"), "w", encoding="utf-8") as f:
    json.dump(id_mapping, f, ensure_ascii=False, indent=2)

print(f"Normalization complete. ID mappings recorded: {len(id_mapping)}")

