-- BLOCK 1 — Pre-check
-- confirm career_glossary row count before insert
SELECT count(*) AS total_rows_before FROM career_glossary;

-- confirm selected id does not already exist
SELECT id FROM career_glossary WHERE id = 'career-glossary-star-method';

-- BLOCK 2 — Insert one draft record
INSERT INTO career_glossary (
  id,
  portal_id,
  content_type,
  status,
  featured,
  sort_order,
  category,
  title_ar,
  title_en,
  tags,
  data
) VALUES (
  'career-glossary-star-method',
  'career',
  'glossary',
  'draft',
  false,
  290,
  'المسار المهني',
  'طريقة ستار (STAR)',
  'STAR',
  ARRAY['المسار المهني', 'مصطلحات'],
  '{"definition": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).", "example": "استخدام طريقة ستار لشرح كيف قمت بحل مشكلة مع عميل غاضب وتحقيق نسبة رضا عالية."}'::jsonb
);

-- BLOCK 3 — Verify inserted draft record
SELECT 
  id,
  portal_id,
  content_type,
  status,
  category,
  title_ar,
  title_en,
  tags,
  sort_order,
  created_at,
  updated_at
FROM career_glossary
WHERE id = 'career-glossary-star-method';

-- BLOCK 4 — Delete pilot record
DELETE FROM career_glossary 
WHERE id = 'career-glossary-star-method';

-- BLOCK 5 — Verify rollback
-- confirm the selected id no longer exists
SELECT id FROM career_glossary WHERE id = 'career-glossary-star-method';

-- confirm career_glossary row count returns to 0
SELECT count(*) AS total_rows_after FROM career_glossary;
