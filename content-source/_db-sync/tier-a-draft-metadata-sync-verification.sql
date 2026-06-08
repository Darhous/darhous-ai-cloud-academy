-- Verification SQL for Tier-A Draft Metadata Sync

-- ai_lessons
SELECT 'ai_lessons' AS table_name, status, COUNT(*) 
FROM ai_lessons 
GROUP BY status;

-- ai_resources
SELECT 'ai_resources' AS table_name, status, COUNT(*) 
FROM ai_resources 
GROUP BY status;

-- automation_lessons
SELECT 'automation_lessons' AS table_name, status, COUNT(*) 
FROM automation_lessons 
GROUP BY status;

-- automation_resources
SELECT 'automation_resources' AS table_name, status, COUNT(*) 
FROM automation_resources 
GROUP BY status;

-- career_glossary
SELECT 'career_glossary' AS table_name, status, COUNT(*) 
FROM career_glossary 
GROUP BY status;

-- career_lessons
SELECT 'career_lessons' AS table_name, status, COUNT(*) 
FROM career_lessons 
GROUP BY status;

-- career_prompts
SELECT 'career_prompts' AS table_name, status, COUNT(*) 
FROM career_prompts 
GROUP BY status;

-- career_resources
SELECT 'career_resources' AS table_name, status, COUNT(*) 
FROM career_resources 
GROUP BY status;

-- digital_exams_glossary
SELECT 'digital_exams_glossary' AS table_name, status, COUNT(*) 
FROM digital_exams_glossary 
GROUP BY status;

-- digital_exams_lessons
SELECT 'digital_exams_lessons' AS table_name, status, COUNT(*) 
FROM digital_exams_lessons 
GROUP BY status;

-- digital_exams_prompts
SELECT 'digital_exams_prompts' AS table_name, status, COUNT(*) 
FROM digital_exams_prompts 
GROUP BY status;

-- digital_exams_resources
SELECT 'digital_exams_resources' AS table_name, status, COUNT(*) 
FROM digital_exams_resources 
GROUP BY status;

-- iot_glossary
SELECT 'iot_glossary' AS table_name, status, COUNT(*) 
FROM iot_glossary 
GROUP BY status;

-- iot_prompts
SELECT 'iot_prompts' AS table_name, status, COUNT(*) 
FROM iot_prompts 
GROUP BY status;

-- iot_resources
SELECT 'iot_resources' AS table_name, status, COUNT(*) 
FROM iot_resources 
GROUP BY status;

-- language_glossary
SELECT 'language_glossary' AS table_name, status, COUNT(*) 
FROM language_glossary 
GROUP BY status;

-- language_lessons
SELECT 'language_lessons' AS table_name, status, COUNT(*) 
FROM language_lessons 
GROUP BY status;

-- language_prompts
SELECT 'language_prompts' AS table_name, status, COUNT(*) 
FROM language_prompts 
GROUP BY status;

-- language_resources
SELECT 'language_resources' AS table_name, status, COUNT(*) 
FROM language_resources 
GROUP BY status;

-- Sample records inspection
SELECT id, title_en, body_ar, data 
FROM ai_lessons 
LIMIT 5;
