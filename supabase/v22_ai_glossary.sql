-- ══════════════════════════════════════════════════════════════════
-- v22 — AI Glossary (ai_glossary)
-- Run in: Supabase Dashboard → SQL Editor
-- First content-CMS table — built from supabase/_template_content_table.sql,
-- adapted to a flat type: real columns for every field (matches the
-- blog_posts / nano_banana_custom_prompts precedent — no jsonb needed
-- since glossary terms have no nested structure).
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS ai_glossary (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'rag', 'llm') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'ai-academy',
  content_type  TEXT        NOT NULL DEFAULT 'glossary',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  category      TEXT        NOT NULL DEFAULT '',
  term          TEXT        NOT NULL,
  definition_ar TEXT        NOT NULL DEFAULT '',
  definition_en TEXT        NOT NULL DEFAULT '',
  example_ar    TEXT        NOT NULL DEFAULT '',
  example_en    TEXT        NOT NULL DEFAULT '',
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ai_glossary_status   ON ai_glossary (status);
CREATE INDEX IF NOT EXISTS idx_ai_glossary_category ON ai_glossary (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_ai_glossary_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_ai_glossary_updated_at ON ai_glossary;
CREATE TRIGGER trg_ai_glossary_updated_at
  BEFORE UPDATE ON ai_glossary
  FOR EACH ROW EXECUTE FUNCTION update_ai_glossary_updated_at();

-- 3. RLS
ALTER TABLE ai_glossary ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_ai_glossary" ON ai_glossary;
CREATE POLICY "public_read_published_ai_glossary"
  ON ai_glossary FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_ai_glossary" ON ai_glossary;
CREATE POLICY "admin_manage_ai_glossary"
  ON ai_glossary FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 48 existing static terms, SAME ids, status='published'.
--    The DB now holds the full set; static array remains as fallback only.
--    Generated programmatically from src/data/glossary.ts (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO ai_glossary (id, portal_id, content_type, status, featured, sort_order, category, term, definition_ar, definition_en, example_ar, example_en, published_at)
VALUES
  ('ai', 'ai-academy', 'glossary', 'published', false, 0, 'Core AI', 'AI', 'الذكاء الاصطناعي: قدرة الآلات على محاكاة الذكاء البشري وأداء مهام مثل التعرف على الصور والنصوص وحل المشكلات.', 'Artificial Intelligence: The ability of machines to simulate human intelligence and perform tasks like image recognition, text understanding, and problem solving.', 'ChatGPT وClaude هما أمثلة على تطبيقات AI', 'ChatGPT and Claude are examples of AI applications', now()),
  ('ml', 'ai-academy', 'glossary', 'published', false, 10, 'Core AI', 'ML', 'تعلم الآلة: فرع من AI يمكّن الأنظمة من التعلم من البيانات وتحسين الأداء دون برمجة صريحة.', 'Machine Learning: A branch of AI that enables systems to learn from data and improve performance without explicit programming.', 'نموذج يتعلم التعرف على صور القطط والكلاب', 'A model that learns to recognize cats vs dogs in images', now()),
  ('deep-learning', 'ai-academy', 'glossary', 'published', false, 20, 'Core AI', 'Deep Learning', 'التعلم العميق: نوع من ML يستخدم شبكات عصبية متعددة الطبقات لتعلم أنماط معقدة.', 'A type of ML using multi-layer neural networks to learn complex patterns.', 'نماذج توليد الصور مثل Stable Diffusion', 'Image generation models like Stable Diffusion', now()),
  ('llm', 'ai-academy', 'glossary', 'published', false, 30, 'Core AI', 'LLM', 'نموذج اللغة الكبير: نموذج AI مدرب على كميات ضخمة من النصوص ويمكنه فهم وتوليد اللغة البشرية.', 'Large Language Model: An AI model trained on massive text datasets that can understand and generate human language.', 'GPT-4 وClaude وGemini هي نماذج LLM', 'GPT-4, Claude, and Gemini are LLMs', now()),
  ('prompt', 'ai-academy', 'glossary', 'published', false, 40, 'Prompting', 'Prompt', 'المطالبة: النص المُدخل إلى نموذج AI لتوجيهه نحو مهمة أو استجابة محددة.', 'The text input given to an AI model to guide it toward a specific task or response.', '"اكتب قصيدة عن البحر" هي مطالبة', '"Write a poem about the ocean" is a prompt', now()),
  ('token', 'ai-academy', 'glossary', 'published', false, 50, 'Core AI', 'Token', 'الرمز: وحدة النص التي تعالجها نماذج AI، عادةً ما يعادل الرمز الواحد حوالي 4 أحرف أو ثلاثة أرباع كلمة.', 'A unit of text processed by AI models, roughly equivalent to 4 characters or ¾ of a word.', 'كلمة ''Hello'' تحتوي على رمز واحد', 'The word ''Hello'' is one token', now()),
  ('embedding', 'ai-academy', 'glossary', 'published', false, 60, 'Core AI', 'Embedding', 'التضمين: تمثيل رياضي للنص أو الصور أو البيانات في فضاء متجهي، يمكّن نماذج AI من فهم التشابه الدلالي.', 'Mathematical representation of text, images, or data in vector space, enabling AI models to understand semantic similarity.', 'الجمل المتشابهة في المعنى تكون قريبة في الفضاء المتجهي', 'Similar sentences are close to each other in vector space', now()),
  ('vector-db', 'ai-academy', 'glossary', 'published', false, 70, 'AI Infrastructure', 'Vector Database', 'قاعدة بيانات متجهية: قاعدة بيانات متخصصة في تخزين والبحث في التضمينات والمتجهات بكفاءة عالية.', 'Specialized database for efficiently storing and searching embeddings and vectors.', 'Pinecone وChroma هما قواعد بيانات متجهية', 'Pinecone and Chroma are vector databases', now()),
  ('rag', 'ai-academy', 'glossary', 'published', false, 80, 'AI Architecture', 'RAG', 'التوليد المعزز بالاسترداد: تقنية تربط نموذج AI بقاعدة معرفة خارجية لتحسين دقة الإجابات وتقليل الهلوسة.', 'Retrieval-Augmented Generation: Technique connecting AI model to external knowledge base to improve accuracy and reduce hallucination.', 'PDF Chatbot يستخدم RAG للإجابة من محتوى الوثيقة', 'A PDF chatbot uses RAG to answer from document content', now()),
  ('agent', 'ai-academy', 'glossary', 'published', false, 90, 'AI Architecture', 'AI Agent', 'وكيل AI: نظام AI قادر على أداء مهام متعددة بشكل مستقل، يستخدم الأدوات ويتخذ القرارات لتحقيق هدف.', 'An AI system capable of performing multiple tasks autonomously, using tools and making decisions to achieve a goal.', 'Claude Code هو وكيل AI يبرمج ويختبر وينشر الكود', 'Claude Code is an AI agent that codes, tests, and deploys', now()),
  ('api', 'ai-academy', 'glossary', 'published', false, 100, 'Development', 'API', 'واجهة برمجة التطبيقات: مجموعة من البروتوكولات تسمح للبرامج المختلفة بالتواصل وتبادل البيانات.', 'Application Programming Interface: A set of protocols that allow different programs to communicate and exchange data.', 'Claude API يسمح لك ببناء تطبيقات تستخدم Claude', 'Claude API lets you build apps that use Claude', now()),
  ('dataset', 'ai-academy', 'glossary', 'published', false, 110, 'Core AI', 'Dataset', 'مجموعة البيانات: مجموعة منظمة من البيانات تُستخدم لتدريب أو اختبار أو تقييم نماذج الذكاء الاصطناعي.', 'Organized collection of data used for training, testing, or evaluating AI models.', 'MNIST هو مجموعة بيانات لأرقام مكتوبة بخط اليد', 'MNIST is a dataset of handwritten digits', now()),
  ('model', 'ai-academy', 'glossary', 'published', false, 120, 'Core AI', 'Model', 'النموذج: برنامج رياضي مدرب على البيانات لأداء مهمة معينة كالتصنيف أو التوليد أو التنبؤ.', 'A mathematical program trained on data to perform a specific task like classification, generation, or prediction.', 'GPT-4 هو نموذج لغوي كبير', 'GPT-4 is a large language model', now()),
  ('training', 'ai-academy', 'glossary', 'published', false, 130, 'Core AI', 'Training', 'التدريب: عملية تعليم نموذج AI من خلال إدخال كميات ضخمة من البيانات وضبط المعاملات لتحسين الأداء.', 'The process of teaching an AI model by feeding large amounts of data and adjusting parameters to improve performance.', 'Claude تم تدريبه على مئات المليارات من الكلمات', 'Claude was trained on hundreds of billions of words', now()),
  ('inference', 'ai-academy', 'glossary', 'published', false, 140, 'Core AI', 'Inference', 'الاستدلال: استخدام نموذج AI مدرب للحصول على تنبؤات أو استجابات من مدخلات جديدة.', 'Using a trained AI model to get predictions or responses from new inputs.', 'عندما تكتب لـ Claude وهو يرد، هذا هو الاستدلال', 'When you type to Claude and it responds, that''s inference', now()),
  ('fine-tuning', 'ai-academy', 'glossary', 'published', false, 150, 'Core AI', 'Fine-tuning', 'الضبط الدقيق: تدريب نموذج مسبق التدريب على بيانات متخصصة لجعله أكثر كفاءة في مجال معين.', 'Training a pre-trained model on specialized data to make it more efficient in a specific domain.', 'ضبط GPT على بيانات طبية لإنشاء نموذج طبي', 'Fine-tuning GPT on medical data to create a medical model', now()),
  ('cloud', 'ai-academy', 'glossary', 'published', false, 160, 'Cloud', 'Cloud', 'السحاب: بنية تحتية حوسبة عبر الإنترنت توفر قدرات معالجة وتخزين وشبكات حسب الطلب.', 'Internet-based computing infrastructure providing processing, storage, and networking capabilities on demand.', 'AWS وAzure وGoogle Cloud هي مزودو سحابة', 'AWS, Azure, and Google Cloud are cloud providers', now()),
  ('docker', 'ai-academy', 'glossary', 'published', false, 170, 'Cloud', 'Docker', 'Docker: منصة تحتوي التطبيقات في حاويات مما يضمن تشغيلها بنفس الطريقة في أي بيئة.', 'Platform that containerizes applications ensuring they run the same way in any environment.', 'تغليف تطبيق Python في Docker للنشر السهل', 'Packaging a Python app in Docker for easy deployment', now()),
  ('kubernetes', 'ai-academy', 'glossary', 'published', false, 180, 'Cloud', 'Kubernetes', 'Kubernetes: نظام لأتمتة نشر وإدارة وتوسيع تطبيقات الحاويات.', 'System for automating deployment, management, and scaling of containerized applications.', 'Kubernetes يدير عشرات حاويات Docker تلقائيًا', 'Kubernetes automatically manages tens of Docker containers', now()),
  ('mlops', 'ai-academy', 'glossary', 'published', false, 190, 'MLOps', 'MLOps', 'MLOps: مجموعة ممارسات تجمع تطوير تعلم الآلة مع العمليات لنشر وصيانة النماذج في الإنتاج.', 'Set of practices combining ML development with operations to deploy and maintain models in production.', 'MLOps يضمن تحديث نموذج AI تلقائيًا عند انحراف البيانات', 'MLOps ensures AI model auto-updates when data drifts', now()),
  ('cicd', 'ai-academy', 'glossary', 'published', false, 200, 'DevOps', 'CI/CD', 'التكامل والتسليم المستمر: ممارسات تطوير تؤتمت اختبار ونشر الكود في كل تغيير.', 'Development practices automating code testing and deployment on every change.', 'GitHub Actions ينفذ الاختبارات تلقائيًا عند كل push', 'GitHub Actions automatically runs tests on every push', now()),
  ('gpu', 'ai-academy', 'glossary', 'published', false, 210, 'Hardware', 'GPU', 'وحدة معالجة الرسوميات: معالج متخصص في العمليات الحسابية الموازية، ضروري لتدريب نماذج AI.', 'Graphics Processing Unit: Specialized processor for parallel computations, essential for training AI models.', 'تدريب LLM يتطلب عشرات أو مئات الـ GPU', 'Training an LLM requires tens or hundreds of GPUs', now()),
  ('function-calling', 'ai-academy', 'glossary', 'published', false, 220, 'AI Architecture', 'Function Calling', 'استدعاء الوظائف: قدرة نموذج AI على استدعاء وظائف خارجية أو APIs للحصول على معلومات أو تنفيذ مهام.', 'The ability of an AI model to call external functions or APIs to get information or execute tasks.', 'Claude يستدعي API الطقس ليخبرك بدرجة الحرارة', 'Claude calls a weather API to tell you the temperature', now()),
  ('mcp', 'ai-academy', 'glossary', 'published', false, 230, 'Claude', 'MCP', 'بروتوكول سياق النموذج: معيار مفتوح من Anthropic يسمح لـ Claude بالتفاعل مع أنظمة وأدوات خارجية.', 'Model Context Protocol: Open standard from Anthropic allowing Claude to interact with external systems and tools.', 'MCP يسمح لـ Claude بقراءة ملفاتك المحلية مباشرة', 'MCP allows Claude to read your local files directly', now()),
  ('claude-code-term', 'ai-academy', 'glossary', 'published', false, 240, 'Claude', 'Claude Code', 'Claude Code: أداة CLI من Anthropic تمكّن Claude من العمل كوكيل برمجة كامل في الطرفية.', 'CLI tool from Anthropic enabling Claude to work as a full coding agent in the terminal.', 'Claude Code يمكنه كتابة وتشغيل واختبار الكود تلقائيًا', 'Claude Code can write, run, and test code automatically', now()),
  ('supabase', 'ai-academy', 'glossary', 'published', false, 250, 'Development', 'Supabase', 'Supabase: بديل مفتوح المصدر لـ Firebase يوفر Postgres وAuth وStorage وEdge Functions.', 'Open-source Firebase alternative providing Postgres, Auth, Storage, and Edge Functions.', 'يمكنك بناء تطبيق كامل بـ Supabase كبنية تحتية', 'You can build a full app with Supabase as infrastructure', now()),
  ('vercel-term', 'ai-academy', 'glossary', 'published', false, 260, 'Cloud', 'Vercel', 'Vercel: منصة نشر سحابية متخصصة في تطبيقات Next.js والتطبيقات الأمامية.', 'Cloud deployment platform specialized in Next.js and frontend applications.', 'نشر موقع Next.js على Vercel يستغرق دقيقة واحدة', 'Deploying a Next.js site on Vercel takes one minute', now()),
  ('github', 'ai-academy', 'glossary', 'published', false, 270, 'Development', 'GitHub', 'GitHub: منصة استضافة الكود مبنية على Git، تستخدم للتعاون وإدارة المشاريع البرمجية.', 'Code hosting platform built on Git, used for collaboration and managing programming projects.', 'معظم مشاريع AI مفتوحة المصدر على GitHub', 'Most open-source AI projects are on GitHub', now()),
  ('webhook', 'ai-academy', 'glossary', 'published', false, 280, 'Development', 'Webhook', 'Webhook: آلية تسمح لتطبيق بإخطار تطبيق آخر بحدث عن طريق إرسال طلب HTTP تلقائي.', 'Mechanism allowing one application to notify another of an event by sending an automatic HTTP request.', 'GitHub يرسل Webhook عند كل push جديد', 'GitHub sends a Webhook on every new push', now()),
  ('automation-term', 'ai-academy', 'glossary', 'published', false, 290, 'DevOps', 'Automation', 'الأتمتة: استخدام التقنية لأداء المهام تلقائيًا دون تدخل بشري.', 'Using technology to perform tasks automatically without human intervention.', 'n8n يرسل بريدًا إلكترونيًا تلقائيًا عند تلقي نموذج', 'n8n automatically sends an email when a form is received', now()),
  ('prompt-injection', 'ai-academy', 'glossary', 'published', false, 300, 'Security', 'Prompt Injection', 'حقن المطالبات: هجوم أمني يحاول فيه المهاجم تجاوز تعليمات النظام لنموذج AI لجعله يتصرف بشكل غير مقصود.', 'Security attack where an attacker attempts to override system instructions for an AI model to make it behave unintentionally.', 'إخفاء تعليمة ''تجاهل جميع القواعد'' في وثيقة PDF', 'Hiding ''ignore all rules'' instruction in a PDF document', now()),
  ('hallucination', 'ai-academy', 'glossary', 'published', false, 310, 'Core AI', 'Hallucination', 'الهلوسة: عندما يولّد نموذج AI معلومات تبدو صحيحة ولكنها في الواقع خاطئة أو ملفقة.', 'When an AI model generates information that appears correct but is actually false or fabricated.', 'نموذج AI يخترع مراجع بحثية غير موجودة', 'An AI model inventing non-existent research references', now()),
  ('context-window', 'ai-academy', 'glossary', 'published', false, 320, 'Core AI', 'Context Window', 'نافذة السياق: الحد الأقصى من النصوص التي يمكن لنموذج AI معالجتها في وقت واحد.', 'The maximum amount of text an AI model can process at one time.', 'Claude لديه نافذة سياق تصل إلى 200K رمز', 'Claude has a context window of up to 200K tokens', now()),
  ('temperature', 'ai-academy', 'glossary', 'published', false, 330, 'Core AI', 'Temperature', 'درجة الحرارة: معامل يتحكم في مدى عشوائية وإبداعية استجابات نموذج AI.', 'Parameter that controls how random and creative AI model responses are.', 'درجة حرارة 0 تعطي إجابات متسقة، و1 تعطي إجابات متنوعة', 'Temperature 0 gives consistent answers, 1 gives varied ones', now()),
  ('system-prompt', 'ai-academy', 'glossary', 'published', false, 340, 'Prompting', 'System Prompt', 'مطالبة النظام: تعليمات سرية تُعطى لنموذج AI قبل المحادثة لتحديد شخصيته وسلوكه وقيوده.', 'Hidden instructions given to an AI model before conversation to define its personality, behavior, and constraints.', 'مطالبة النظام تخبر Claude أن يكون مساعدًا تقنيًا فقط', 'System prompt tells Claude to act only as a technical assistant', now()),
  ('api-key', 'ai-academy', 'glossary', 'published', false, 350, 'Development', 'API Key', 'مفتاح API: رمز مصادقة سري يُستخدم للوصول إلى خدمة API.', 'Secret authentication token used to access an API service.', 'تحتاج إلى مفتاح API لاستخدام Claude API', 'You need an API key to use Claude API', now()),
  ('env-var', 'ai-academy', 'glossary', 'published', false, 360, 'Development', 'Environment Variable', 'متغير البيئة: قيمة مخزنة خارج الكود تُستخدم لتخزين الإعدادات والأسرار بأمان.', 'Value stored outside the code used to securely store settings and secrets.', 'تخزين مفتاح API في .env بدلاً من الكود مباشرة', 'Storing API key in .env instead of directly in code', now()),
  ('serverless', 'ai-academy', 'glossary', 'published', false, 370, 'Cloud', 'Serverless', 'بدون خادم: نموذج تنفيذ يسمح بتشغيل الكود دون إدارة الخوادم، تدفع فقط مقابل ما تستخدمه.', 'Execution model allowing code to run without managing servers, paying only for what you use.', 'Vercel Functions وAWS Lambda هما خدمات Serverless', 'Vercel Functions and AWS Lambda are Serverless services', now()),
  ('edge-function', 'ai-academy', 'glossary', 'published', false, 380, 'Cloud', 'Edge Function', 'وظيفة الحافة: كود يعمل على خوادم قريبة جغرافيًا من المستخدم لتقليل زمن الاستجابة.', 'Code that runs on servers geographically close to the user to reduce latency.', 'Cloudflare Workers و Vercel Edge Functions', 'Cloudflare Workers and Vercel Edge Functions', now()),
  ('vector-search', 'ai-academy', 'glossary', 'published', false, 390, 'AI Infrastructure', 'Vector Search', 'البحث المتجهي: تقنية بحث تجد النتائج بناءً على التشابه الدلالي بدلاً من التطابق الحرفي.', 'Search technique finding results based on semantic similarity rather than literal matching.', 'البحث عن ''سيارة'' يجد أيضًا نتائج ''مركبة'' و''سيارات''', 'Searching ''car'' also finds ''vehicle'' and ''automobile'' results', now()),
  ('transformer', 'ai-academy', 'glossary', 'published', false, 400, 'Core AI', 'Transformer', 'المحوّل: بنية شبكة عصبية ثورية تعتمد على آلية الانتباه الذاتي، وهي الأساس المعماري لجميع نماذج LLM الحديثة.', 'Revolutionary neural network architecture using self-attention, the architectural foundation of all modern LLM models.', 'GPT وClaude وGemini كلها مبنية على بنية Transformer', 'GPT, Claude, and Gemini are all built on the Transformer architecture', now()),
  ('multimodal', 'ai-academy', 'glossary', 'published', false, 410, 'Core AI', 'Multimodal', 'متعدد الوسائط: قدرة النموذج على فهم ومعالجة أنواع مختلفة من البيانات في آنٍ واحد كالنص والصور والصوت.', 'A model''s ability to understand and process different types of data simultaneously such as text, images, and audio.', 'Claude 3 يمكنه قراءة نص وتحليل صورة في نفس المحادثة', 'Claude 3 can read text and analyze an image in the same conversation', now()),
  ('rlhf', 'ai-academy', 'glossary', 'published', false, 420, 'Core AI', 'RLHF', 'التعلم التعزيزي من الملاحظات البشرية: أسلوب تدريب يُحسّن النموذج استناداً إلى تقييمات بشرية لجودة الإجابات.', 'Reinforcement Learning from Human Feedback: training technique improving models based on human ratings of response quality.', 'RLHF جعل ChatGPT أكثر أدباً ومفيدية وأماناً', 'RLHF made ChatGPT more polite, helpful, and safe', now()),
  ('zero-shot', 'ai-academy', 'glossary', 'published', false, 430, 'Prompting', 'Zero-shot Prompting', 'المطالبة بلا أمثلة: طلب مهمة من نموذج AI مباشرة دون تقديم أي مثال مسبق على المطلوب.', 'Asking an AI model to perform a task directly without providing any prior examples of the expected output.', 'قول ''لخّص هذا النص'' دون إعطاء أمثلة تلخيص', 'Saying ''Summarize this text'' without giving summarization examples', now()),
  ('few-shot', 'ai-academy', 'glossary', 'published', false, 440, 'Prompting', 'Few-shot Prompting', 'المطالبة بأمثلة قليلة: تقديم عدة أمثلة على المطلوب ضمن البرومبت لتوجيه النموذج نحو الإخراج المرغوب.', 'Providing a few examples of the desired output within the prompt to guide the model toward the expected format.', 'إعطاء مثالين على التلخيص قبل الطلب من النموذج تلخيص نص جديد', 'Giving two summarization examples before asking the model to summarize a new text', now()),
  ('json-term', 'ai-academy', 'glossary', 'published', false, 450, 'Development', 'JSON', 'JavaScript Object Notation: تنسيق تبادل بيانات خفيف وقابل للقراءة البشرية، يستخدم على نطاق واسع في APIs والويب.', 'JavaScript Object Notation: lightweight, human-readable data exchange format widely used in APIs and web applications.', '{ "name": "Ahmed", "role": "student" } هو كائن JSON', '{ "name": "Ahmed", "role": "student" } is a JSON object', now()),
  ('rest-api', 'ai-academy', 'glossary', 'published', false, 460, 'Development', 'REST API', 'API التمثيلي: نمط معماري للتواصل بين الأنظمة عبر HTTP بأفعال GET/POST/PUT/DELETE لإدارة الموارد.', 'Architectural pattern for system communication via HTTP using GET/POST/PUT/DELETE verbs to manage resources.', 'كل مرة تبحث على Google يُرسل متصفحك طلب GET إلى REST API', 'Every time you search Google, your browser sends a GET request to a REST API', now()),
  ('open-source-term', 'ai-academy', 'glossary', 'published', false, 470, 'Development', 'Open Source', 'المصدر المفتوح: برمجيات يُتاح كودها المصدري للجمهور للقراءة والتعديل والتوزيع المجاني.', 'Software whose source code is publicly available for anyone to read, modify, and distribute freely.', 'Linux وPython وLlamaIndex كلها مشاريع مفتوحة المصدر', 'Linux, Python, and LlamaIndex are all open-source projects', now());
