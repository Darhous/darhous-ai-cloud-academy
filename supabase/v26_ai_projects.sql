-- ══════════════════════════════════════════════════════════════════
-- v26 — AI Projects (ai_projects)
-- Run in: Supabase Dashboard → SQL Editor
-- HYBRID type (same approach as v25 ai_courses):
--   • Real columns for every flat/primitive/string-array field
--   • JSONB for the one genuinely-nested array-of-object field:
--     build_steps (BuildStep[]: stepAr/stepEn/detailAr/detailEn)
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS ai_projects (
  id                  TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'pdf-chatbot') — keeps links intact
  portal_id           TEXT        NOT NULL DEFAULT 'ai-academy',
  content_type        TEXT        NOT NULL DEFAULT 'project',
  status              TEXT        NOT NULL DEFAULT 'published'
                                  CHECK (status IN ('published','draft','archived')),
  featured            BOOLEAN     NOT NULL DEFAULT false,
  sort_order          INT         NOT NULL DEFAULT 0,
  category            TEXT        NOT NULL DEFAULT '',
  title_ar            TEXT        NOT NULL DEFAULT '',
  title_en            TEXT        NOT NULL DEFAULT '',
  description_ar      TEXT        NOT NULL DEFAULT '',
  description_en      TEXT        NOT NULL DEFAULT '',
  difficulty          TEXT        NOT NULL DEFAULT 'beginner'
                                  CHECK (difficulty IN ('beginner','intermediate','advanced')),
  stack               TEXT[]      NOT NULL DEFAULT '{}',
  skills              TEXT[]      NOT NULL DEFAULT '{}',
  expected_output     TEXT        NOT NULL DEFAULT '',
  expected_output_ar  TEXT        NOT NULL DEFAULT '',
  future_idea         TEXT        NOT NULL DEFAULT '',
  future_idea_ar      TEXT        NOT NULL DEFAULT '',
  icon                TEXT        NOT NULL DEFAULT '🚀',
  -- Detail-page fields (optional)
  goal_ar             TEXT,
  goal_en             TEXT,
  build_steps         JSONB,                                   -- BuildStep[]
  required_tools      TEXT[],
  related_courses     TEXT[],
  related_tools       TEXT[],
  created_by          UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ai_projects_status   ON ai_projects (status);
CREATE INDEX IF NOT EXISTS idx_ai_projects_category ON ai_projects (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_ai_projects_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_ai_projects_updated_at ON ai_projects;
CREATE TRIGGER trg_ai_projects_updated_at
  BEFORE UPDATE ON ai_projects
  FOR EACH ROW EXECUTE FUNCTION update_ai_projects_updated_at();

-- 3. RLS
ALTER TABLE ai_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_ai_projects" ON ai_projects;
CREATE POLICY "public_read_published_ai_projects"
  ON ai_projects FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_ai_projects" ON ai_projects;
CREATE POLICY "admin_manage_ai_projects"
  ON ai_projects FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 14 existing static projects, SAME ids, status='published'.
--    The DB now holds the full set; static array remains as fallback only.
--    Generated programmatically from src/data/projects.ts (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO ai_projects (id, portal_id, content_type, status, featured, sort_order, category, title_ar, title_en, description_ar, description_en, difficulty, stack, skills, expected_output, expected_output_ar, future_idea, future_idea_ar, icon, goal_ar, goal_en, build_steps, required_tools, related_courses, related_tools, published_at)
VALUES
  ('ai-study-planner', 'ai-academy', 'project', 'published', true, 0, 'Productivity', 'مخطط الدراسة بالذكاء الاصطناعي', 'AI Study Planner', 'أداة تخطيط دراسة ذكية تستخدم AI لإنشاء جدول دراسة مخصص بناءً على أهدافك ووقتك المتاح.', 'Smart study planning tool that uses AI to create a personalized study schedule based on your goals and available time.', 'beginner', ARRAY['Python', 'Claude API', 'Streamlit']::text[], ARRAY['API Integration', 'UI with Streamlit', 'Prompt Engineering']::text[], 'A web app where users input their goals and get a custom study plan', 'تطبيق ويب يُدخل فيه المستخدم أهدافه ويحصل على خطة دراسة مخصصة', 'Add spaced repetition, quiz generation, and progress tracking', 'إضافة التكرار المتباعد وتوليد الاختبارات وتتبع التقدم', '📚', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('prompt-generator', 'ai-academy', 'project', 'published', true, 10, 'AI Tools', 'مولد المطالبات', 'Prompt Generator', 'أداة تساعد المستخدمين على توليد مطالبات احترافية لأي نموذج AI بناءً على الحالة الاستخدامية.', 'Tool that helps users generate professional prompts for any AI model based on their use case.', 'beginner', ARRAY['Next.js', 'Claude API', 'Tailwind CSS']::text[], ARRAY['Next.js', 'API Routes', 'Prompt Design']::text[], 'A web app that generates optimized prompts for different use cases', 'تطبيق ويب يولد مطالبات محسّنة لحالات استخدام مختلفة', 'Add prompt testing, history, and community sharing', 'إضافة اختبار المطالبات والتاريخ والمشاركة المجتمعية', '✏️', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('csv-analyzer', 'ai-academy', 'project', 'published', false, 20, 'Data', 'محلل بيانات CSV', 'CSV Data Analyzer', 'رفع ملف CSV والحصول على تحليل بيانات كامل وتوصيات بالذكاء الاصطناعي.', 'Upload a CSV file and get complete data analysis and AI recommendations.', 'beginner', ARRAY['Python', 'Pandas', 'Claude API', 'Streamlit']::text[], ARRAY['Pandas', 'Data Analysis', 'Claude API', 'Visualization']::text[], 'Data analysis app with AI-powered insights and visualizations', 'تطبيق تحليل بيانات مع رؤى مدعومة بالذكاء الاصطناعي وتصورات بيانية', 'Add SQL query generation, automated reports, and scheduled analysis', 'إضافة توليد استعلامات SQL والتقارير الآلية والتحليل المجدول', '📊', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('pdf-chatbot', 'ai-academy', 'project', 'published', true, 30, 'RAG', 'روبوت محادثة PDF', 'PDF Chatbot', 'رفع أي PDF والتحدث معه بالذكاء الاصطناعي باستخدام تقنية RAG.', 'Upload any PDF and chat with it using AI powered by RAG technology.', 'intermediate', ARRAY['Python', 'LangChain', 'ChromaDB', 'Claude API', 'Streamlit']::text[], ARRAY['RAG', 'LangChain', 'Vector DB', 'Embeddings', 'Claude API']::text[], 'Chat interface that answers questions from PDF documents', 'واجهة محادثة تجيب على الأسئلة من وثائق PDF', 'Support multiple documents, citations, and multi-user sessions', 'دعم وثائق متعددة والاقتباسات وجلسات متعددة المستخدمين', '📄', 'بناء نظام RAG كامل يسمح بالمحادثة مع أي وثيقة PDF باستخدام Claude API وLangChain.', 'Build a complete RAG system that enables conversation with any PDF document using Claude API and LangChain.', '[{"stepAr":"إعداد البيئة","stepEn":"Setup Environment","detailAr":"تثبيت Python وLangChain وChromaDB وStreamlit","detailEn":"Install Python, LangChain, ChromaDB and Streamlit"},{"stepAr":"تحميل PDF وتقسيمه","stepEn":"Load & Split PDF","detailAr":"استخدام PyPDFLoader وRecursiveCharacterTextSplitter","detailEn":"Use PyPDFLoader and RecursiveCharacterTextSplitter"},{"stepAr":"إنشاء Embeddings","stepEn":"Create Embeddings","detailAr":"تحويل النص إلى متجهات باستخدام Claude أو Cohere","detailEn":"Convert text to vectors using Claude or Cohere"},{"stepAr":"تخزين في ChromaDB","stepEn":"Store in ChromaDB","detailAr":"إنشاء قاعدة بيانات متجهية محلية","detailEn":"Create a local vector database"},{"stepAr":"بناء سلسلة RAG","stepEn":"Build RAG Chain","detailAr":"ربط الاسترداد بـ Claude API للإجابة","detailEn":"Connect retrieval to Claude API for answering"},{"stepAr":"واجهة Streamlit","stepEn":"Streamlit Interface","detailAr":"بناء واجهة تحميل ومحادثة بسيطة","detailEn":"Build simple upload and chat interface"}]'::jsonb, ARRAY['Python 3.10+', 'Claude API Key', 'ChromaDB', 'LangChain', 'Streamlit']::text[], ARRAY['generative-ai', 'python-for-ai']::text[], ARRAY['langchain', 'chroma', 'claude-api']::text[], now()),
  ('resume-analyzer', 'ai-academy', 'project', 'published', false, 40, 'Business', 'محلل السير الذاتية', 'Resume Analyzer', 'تحليل السيرة الذاتية وتقديم توصيات تحسين وتطابق مع الوظائف المستهدفة.', 'Analyze resumes and provide improvement recommendations and job matching.', 'beginner', ARRAY['Python', 'Claude API', 'FastAPI', 'React']::text[], ARRAY['Claude API', 'FastAPI', 'Document Parsing', 'React']::text[], 'Resume analyzer with score, recommendations, and job matching', 'محلل سيرة ذاتية مع نقاط وتوصيات ومطابقة وظيفية', 'Add job board integration, cover letter generation, and LinkedIn optimization', 'إضافة تكامل لوحة الوظائف وتوليد خطاب تقديم وتحسين LinkedIn', '📋', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('news-summarizer', 'ai-academy', 'project', 'published', false, 50, 'Content', 'ملخص الأخبار', 'News Summarizer', 'تلخيص أحدث الأخبار وتصنيفها بالذكاء الاصطناعي.', 'Summarize and categorize the latest news with AI.', 'beginner', ARRAY['Python', 'Claude API', 'Streamlit', 'RSS']::text[], ARRAY['Claude API', 'RSS Parsing', 'Summarization', 'Streamlit']::text[], 'News dashboard with AI summaries and category filters', 'لوحة أخبار مع ملخصات AI وفلاتر تصنيف', 'Add personalization, alerts, and multi-language summaries', 'إضافة التخصيص والتنبيهات وملخصات متعددة اللغات', '📰', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('customer-support-bot', 'ai-academy', 'project', 'published', true, 60, 'Business', 'روبوت دعم العملاء', 'Customer Support Bot', 'روبوت محادثة ذكي للإجابة على أسئلة العملاء بناءً على قاعدة معرفة مخصصة.', 'Smart chatbot for answering customer questions based on a custom knowledge base.', 'intermediate', ARRAY['Next.js', 'Claude API', 'Supabase', 'LangChain']::text[], ARRAY['RAG', 'Claude API', 'Next.js', 'Supabase', 'Vector Search']::text[], 'Embeddable chat widget with custom knowledge base and escalation', 'أداة محادثة قابلة للتضمين مع قاعدة معرفة مخصصة وتصعيد', 'Add multi-channel support, analytics dashboard, and human handoff', 'إضافة دعم متعدد القنوات ولوحة تحليلات وتحويل للإنسان', '💬', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('rag-knowledge-base', 'ai-academy', 'project', 'published', true, 70, 'RAG', 'قاعدة المعرفة RAG', 'RAG Knowledge Base', 'بناء قاعدة معرفة ذكية قابلة للبحث بتقنية RAG.', 'Build a smart searchable knowledge base with RAG technology.', 'advanced', ARRAY['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'React']::text[], ARRAY['RAG', 'Embeddings', 'Vector Search', 'FastAPI', 'React']::text[], 'Full-stack RAG system with semantic search and AI responses', 'نظام RAG متكامل مع بحث دلالي واستجابات AI', 'Add multi-tenant, admin panel, analytics, and reranking', 'إضافة متعدد المستأجرين ولوحة إدارة وتحليلات وإعادة الترتيب', '🔍', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('ai-automation-workflow', 'ai-academy', 'project', 'published', false, 80, 'Automation', 'سير عمل أتمتة AI', 'AI Automation Workflow', 'بناء سير عمل أتمتة كاملة تجمع n8n مع Claude API.', 'Build a complete automation workflow combining n8n with Claude API.', 'intermediate', ARRAY['n8n', 'Claude API', 'Webhooks', 'Supabase']::text[], ARRAY['n8n', 'Webhooks', 'Claude API', 'Automation Design']::text[], 'Automated workflow that processes inputs and sends intelligent responses', 'سير عمل آلي يعالج المدخلات ويرسل استجابات ذكية', 'Add scheduling, error handling, monitoring dashboard, and multi-branch flows', 'إضافة الجدولة ومعالجة الأخطاء ولوحة مراقبة وتدفقات متعددة الفروع', '⚡', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('cloud-deployment-dashboard', 'ai-academy', 'project', 'published', true, 90, 'Cloud', 'لوحة نشر الكلاود', 'Cloud Deployment Dashboard', 'لوحة تحكم لمراقبة ونشر التطبيقات على السحاب.', 'Control panel for monitoring and deploying applications to the cloud.', 'advanced', ARRAY['Next.js', 'AWS', 'Docker', 'Supabase']::text[], ARRAY['AWS', 'Docker', 'Next.js', 'Monitoring', 'CI/CD']::text[], 'Dashboard showing deployment status, metrics, and logs', 'لوحة تعرض حالة النشر والمقاييس والسجلات', 'Add multi-cloud support, cost tracking, and AI-powered alerts', 'إضافة دعم متعدد السحاب وتتبع التكاليف وتنبيهات مدعومة بالذكاء الاصطناعي', '🚀', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('arabic-content-generator', 'ai-academy', 'project', 'published', true, 100, 'Content', 'مولد المحتوى العربي', 'Arabic Content Generator', 'توليد محتوى عربي احترافي لمنصات التواصل الاجتماعي والمدونات.', 'Generate professional Arabic content for social media and blogs.', 'beginner', ARRAY['Next.js', 'Claude API', 'Tailwind CSS']::text[], ARRAY['Claude API', 'Arabic NLP', 'Content Strategy', 'Next.js']::text[], 'Content generation app with templates for multiple Arabic platforms', 'تطبيق توليد محتوى مع قوالب لمنصات عربية متعددة', 'Add dialect support, scheduling, tone adjustment, and analytics', 'إضافة دعم اللهجات والجدولة وضبط النبرة والتحليلات', '✍️', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('local-llm-chat', 'ai-academy', 'project', 'published', false, 110, 'Local AI', 'تطبيق محادثة LLM المحلي', 'Local LLM Chat App', 'تطبيق محادثة يعمل بالكامل محليًا مع Ollama بدون إنترنت.', 'Chat application running completely locally with Ollama without internet.', 'intermediate', ARRAY['Python', 'Ollama', 'Streamlit', 'LangChain']::text[], ARRAY['Ollama', 'Local Models', 'Streamlit', 'LangChain']::text[], 'Private local chat app with model switching and history', 'تطبيق محادثة محلي خاص مع تبديل النماذج والتاريخ', 'Add document upload, multi-model comparison, and voice input', 'إضافة رفع الوثائق ومقارنة النماذج والإدخال الصوتي', '🖥️', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('mlops-pipeline', 'ai-academy', 'project', 'published', true, 120, 'MLOps', 'خط MLOps', 'MLOps Pipeline', 'بناء خط MLOps كامل مع تتبع التجارب والنشر التلقائي.', 'Build a complete MLOps pipeline with experiment tracking and automated deployment.', 'advanced', ARRAY['MLflow', 'DVC', 'FastAPI', 'Docker', 'GitHub Actions']::text[], ARRAY['MLflow', 'DVC', 'CI/CD', 'Docker', 'FastAPI', 'Monitoring']::text[], 'Full MLOps pipeline from training to production monitoring', 'خط MLOps كامل من التدريب إلى مراقبة الإنتاج', 'Add multi-model versioning, A/B testing, and automated retraining', 'إضافة إصدار نماذج متعدد واختبار A/B وإعادة التدريب الآلي', '🔄', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now()),
  ('ai-research-assistant', 'ai-academy', 'project', 'published', false, 130, 'Research', 'مساعد البحث بالذكاء الاصطناعي', 'AI Research Assistant', 'مساعد بحث ذكي يبحث ويلخص ويحلل الأوراق العلمية.', 'Intelligent research assistant that searches, summarizes, and analyzes papers.', 'intermediate', ARRAY['Python', 'Claude API', 'Perplexity API', 'Streamlit']::text[], ARRAY['Claude API', 'Research Workflows', 'Summarization', 'Citations']::text[], 'Research assistant with paper summaries, citations, and insights', 'مساعد بحث مع ملخصات الأوراق والاقتباسات والرؤى', 'Add citation networks, topic tracking, and team collaboration', 'إضافة شبكات الاقتباس وتتبع المواضيع والتعاون الجماعي', '🔬', NULL, NULL, NULL, NULL::text[], NULL::text[], NULL::text[], now());
