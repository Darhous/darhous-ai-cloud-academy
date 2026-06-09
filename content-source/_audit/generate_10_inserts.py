import os
import json

base_dir = r"C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"
glossary_dir = os.path.join(base_dir, "content-source", "_normalized", "career", "glossary")

files_to_process = [
    "career-glossary-ai-tools.json",
    "career-glossary-ats-2.json",
    "career-glossary-ats.json",
    "career-glossary-burnout.json",
    "career-glossary-career-shift-2.json",
    "career-glossary-career-shift.json",
    "career-glossary-cover-letter-2.json",
    "career-glossary-cover-letter.json",
    "career-glossary-culture-fit.json",
    "career-glossary-cv-optimization.json"
]

sql_inserts = []

for filename in files_to_process:
    filepath = os.path.join(glossary_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
        # Escape single quotes in JSON string
        data_json_str = json.dumps(data.get("data", {}), ensure_ascii=False).replace("'", "''")
        title_ar = data.get("title_ar", "").replace("'", "''")
        title_en = data.get("title_en", "").replace("'", "''")
        category = data.get("category", "").replace("'", "''")
        tags = data.get("tags", [])
        
        tags_arr = "ARRAY[" + ", ".join([f"'{tag.replace('''', '''''')}'" for tag in tags]) + "]" if tags else "ARRAY[]::text[]"
        
        val = f"""  (
    '{data['id']}',
    '{data['portal_id']}',
    '{data['content_type']}',
    'draft',
    {str(data.get('featured', False)).lower()},
    {data.get('sort_order', 0)},
    '{category}',
    '{title_ar}',
    '{title_en}',
    {tags_arr},
    '{data_json_str}'::jsonb
  )"""
        sql_inserts.append(val)

sql = ",\n".join(sql_inserts)

print(sql)
