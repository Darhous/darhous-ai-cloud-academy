-- ==============================================================================
-- SECTION 1 — Pre-check
-- ==============================================================================

-- show current career_glossary row count
SELECT count(*) AS total_rows_before FROM career_glossary;

-- confirm none of the selected 10 IDs already exist
SELECT id FROM career_glossary WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization');


-- ==============================================================================
-- SECTION 2 — Insert 10 persistent draft records
-- ==============================================================================
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
) VALUES 
  (
    'career-glossary-ai-tools',
    'career',
    'glossary',
    'draft',
    false,
    10,
    'المسار المهني',
    'أدوات الذكاء الاصطناعي',
    'Ai Tools',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "برامج تستخدم الذكاء الاصطناعي للمساعدة في المهام المهنية.", "example": "مثال على استخدام مصطلح أدوات الذكاء الاصطناعي في السياق المهني."}'::jsonb
  ),
  (
    'career-glossary-ats-2',
    'career',
    'glossary',
    'draft',
    false,
    30,
    'المسار المهني',
    'أنظمة تتبع المتقدمين (ATS)',
    'ATS',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "برامج تستخدمها الشركات لإدارة عملية التوظيف وفحص السير الذاتية آلياً للبحث عن الكلمات المفتاحية.", "example": "تنسيق السيرة الذاتية بشكل بسيط واستخدام خطوط واضحة لضمان قراءتها بشكل صحيح من قبل نظام الـ ATS."}'::jsonb
  ),
  (
    'career-glossary-ats',
    'career',
    'glossary',
    'draft',
    false,
    20,
    'المسار المهني',
    'نظام تتبع المتقدمين',
    'Ats',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "برنامج يستخدمه أصحاب العمل لفرز السير الذاتية.", "example": "مثال على استخدام مصطلح نظام تتبع المتقدمين في السياق المهني."}'::jsonb
  ),
  (
    'career-glossary-burnout',
    'career',
    'glossary',
    'draft',
    false,
    40,
    'المسار المهني',
    'الاحتراق الوظيفي',
    '',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "حالة من الإرهاق الجسدي والعاطفي والعقلي ناتجة عن ضغوط العمل المستمرة والفشل في تحقيق التوازن.", "example": "الشعور بالتعب المستمر وفقدان الشغف بالعمل بسبب ساعات العمل الطويلة وعدم وجود فترات راحة كافية."}'::jsonb
  ),
  (
    'career-glossary-career-shift-2',
    'career',
    'glossary',
    'draft',
    false,
    330,
    'المسار المهني',
    'تغيير المسار المهني',
    'Career Shift',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "الانتقال للعمل في مجال مختلف عن مجالك الحالي أو السابق.", "example": "مثال على استخدام مصطلح تغيير المسار المهني في السياق المهني."}'::jsonb
  ),
  (
    'career-glossary-career-shift',
    'career',
    'glossary',
    'draft',
    false,
    50,
    'المسار المهني',
    'التحول المهني',
    '',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "الانتقال من مجال عمل إلى مجال آخر مختلف، ويتطلب غالباً اكتساب مهارات جديدة وإعادة تقييم المسار المهني.", "example": "الانتقال من مجال التسويق إلى مجال تحليل البيانات بعد دراسة دورات متخصصة."}'::jsonb
  ),
  (
    'career-glossary-cover-letter-2',
    'career',
    'glossary',
    'draft',
    false,
    340,
    'المسار المهني',
    'خطاب المقدمة',
    'Cover Letter',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "رسالة ترفق مع السيرة الذاتية لتوضيح سبب اهتمامك بالوظيفة.", "example": "مثال على استخدام مصطلح خطاب المقدمة في السياق المهني."}'::jsonb
  ),
  (
    'career-glossary-cover-letter',
    'career',
    'glossary',
    'draft',
    false,
    60,
    'المسار المهني',
    'خطاب المقدمة',
    '',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "رسالة ترفق مع السيرة الذاتية تقدم فيها نفسك وتوضح سبب اهتمامك بالوظيفة وكيف يمكن لمهاراتك أن تفيد الشركة.", "example": "كتابة خطاب مقدمة مخصص لشركة تقنية يبرز شغفك بمنتجاتهم وخبرتك السابقة في المجال."}'::jsonb
  ),
  (
    'career-glossary-culture-fit',
    'career',
    'glossary',
    'draft',
    false,
    70,
    'المسار المهني',
    'الملاءمة الثقافية',
    '',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "مدى توافق قيم الموظف وسلوكياته ومعتقداته مع ثقافة بيئة العمل في الشركة.", "example": "تقييم ما إذا كان أسلوب عملك المرن يتناسب مع ثقافة الشركة التي تشجع على الابتكار والاستقلالية."}'::jsonb
  ),
  (
    'career-glossary-cv-optimization',
    'career',
    'glossary',
    'draft',
    false,
    80,
    'المسار المهني',
    'تحسين السيرة الذاتية',
    '',
    ARRAY['المسار المهني', 'مصطلحات'],
    '{"definition": "عملية تعديل السيرة الذاتية لتتناسب مع متطلبات الوظيفة المستهدفة وإبراز المهارات والإنجازات بشكل واضح.", "example": "استخدام كلمات مفتاحية من الوصف الوظيفي في السيرة الذاتية لضمان تجاوز أنظمة تتبع المتقدمين."}'::jsonb
  );


-- ==============================================================================
-- SECTION 3 — Verify inserted records
-- ==============================================================================

-- count selected IDs after insert (expected 10)
SELECT count(*) AS inserted_count
FROM career_glossary 
WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization');

-- count selected IDs where status = 'draft' (expected 10)
SELECT count(*) AS draft_count
FROM career_glossary 
WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization') AND status = 'draft';

-- select key fields
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
WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization');


-- ==============================================================================
-- SECTION 4 — Final row count
-- ==============================================================================
-- show career_glossary total row count after persistent insert
-- expected row count should be 10 if table was previously empty
SELECT count(*) AS total_rows_after_import FROM career_glossary;


-- ==============================================================================
-- SECTION 5 — Emergency rollback SQL only
-- ==============================================================================
/*
EMERGENCY ROLLBACK ONLY — DO NOT RUN UNLESS USER APPROVES

DELETE FROM career_glossary WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization');

-- verify those IDs no longer exist
SELECT count(*) AS remaining_ids FROM career_glossary WHERE id IN ('career-glossary-ai-tools', 'career-glossary-ats-2', 'career-glossary-ats', 'career-glossary-burnout', 'career-glossary-career-shift-2', 'career-glossary-career-shift', 'career-glossary-cover-letter-2', 'career-glossary-cover-letter', 'career-glossary-culture-fit', 'career-glossary-cv-optimization');

-- verify final row count returns to 0
SELECT count(*) AS final_rows_after_emergency_delete FROM career_glossary;
*/
