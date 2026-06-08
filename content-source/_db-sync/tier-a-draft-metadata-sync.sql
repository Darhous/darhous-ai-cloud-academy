-- Tier-A Draft Metadata Sync Package
-- GENERATED AUTOMATICALLY. DO NOT EXECUTE WITHOUT REVIEW.
-- This package synchronizes offline deterministic source repairs into existing Supabase draft records.
-- Scope: 19 Tier-A tables, Draft records only.

BEGIN;

-- Table: ai_lessons
-- Expected updates: 20

UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-advanced-prompting',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Advanced Prompting Techniques',
    excerpt_ar = 'بعد إتقان الأساسيات، ننتقل إلى تقنيات متقدمة مثل Few-shot prompting (تقديم أمثلة) و Chain of Thought (سلسلة الأفكار). هذه التقنيات تساعد النماذج على ح...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-advanced-prompting'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-ethics',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ethics and AI',
    excerpt_ar = 'مع القوة الكبيرة تأتي مسؤولية أكبر. نناقش هنا القضايا الأخلاقية المرتبطة باستخدام الذكاء الاصطناعي، مثل التحيز في البيانات، الخصوصية، وحقوق الملكية ال...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-ethics'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-for-study-2',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ai For Study',
    excerpt_ar = '# الذكاء الاصطناعي كمعلمك الخاص',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-for-study-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-for-study',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'AI for Study',
    excerpt_ar = 'كيف نستخدم الذكاء الاصطناعي كمدرس خصوصي بدلاً من أداة لحل الواجبات؟ سنتعلم كيفية توجيه الذكاء الاصطناعي لإنشاء خطط دراسية، شرح المفاهيم المعقدة بطرق م...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-for-study'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-for-work-2',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ai For Work',
    excerpt_ar = '# تعزيز الإنتاجية باستخدام الذكاء الاصطناعي',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-for-work-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-for-work',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'AI for Work',
    excerpt_ar = 'في بيئة العمل، يمكن للذكاء الاصطناعي أن يكون مساعدك الشخصي الفعال. استكشف كيف يمكنك أتمتة صياغة رسائل البريد الإلكتروني، تلخيص الاجتماعات والمستندات ا...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-for-work'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-ai-hallucination',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ai Hallucination',
    excerpt_ar = '# هلوسة الذكاء الاصطناعي: عندما تكذب الآلة بثقة',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-ai-hallucination'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-detecting-hallucinations',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Detecting Hallucinations',
    excerpt_ar = 'أحد أكبر تحديات النماذج اللغوية هو ''الهلوسة'' - تقديم معلومات خاطئة بثقة تامة. في هذا الدرس، سنتعلم استراتيجيات للتعرف على الهلوسة، مثل طلب المصادر، وا...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-detecting-hallucinations'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-evaluating-models',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Evaluating Models',
    excerpt_ar = 'كيف تختار النموذج المناسب لمهمتك؟ مقارنة بين GPT-4، Claude، وGemini. سنتعلم كيفية تقييم النماذج بناءً على عوامل مثل الدقة، السرعة، طول نافذة السياق، و...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-evaluating-models'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-future-of-ai',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Future of AI',
    excerpt_ar = 'نظرة مستقبلية على التقنيات الناشئة في مجال الذكاء الاصطناعي، مثل الوكلاء المستقلين (Autonomous Agents) والذكاء الاصطناعي العام (AGI). كيف نستعد لهذه ا...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-future-of-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-how-to-prompt',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'How To Prompt',
    excerpt_ar = '# هندسة الأوامر: فن التحدث مع الآلة',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-how-to-prompt'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-independent-learning',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Independent Learning with AI',
    excerpt_ar = 'الهدف الأسمى هو استخدام الذكاء الاصطناعي لتعزيز مهاراتك لا استبدالها. استراتيجيات لتجنب ''الاعتماد المفرط'' (Over-reliance)، مثل محاولة حل المشكلة بنفسك...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-independent-learning'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-intro-to-ai-2',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Intro To Ai',
    excerpt_ar = '# مقدمة في الذكاء الاصطناعي',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-intro-to-ai-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-intro-to-ai',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Introduction to AI',
    excerpt_ar = 'الذكاء الاصطناعي هو محاكاة للذكاء البشري في الآلات. في هذا الدرس سنتعرف على أساسيات الذكاء الاصطناعي وأنواعه المختلفة، وكيف تطور من الأنظمة المبنية عل...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-intro-to-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-prompt-engineering-basics',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Prompt Engineering Basics',
    excerpt_ar = 'هندسة الأوامر هي مهارة صياغة مدخلات دقيقة لطلب معلومات من أنظمة الذكاء الاصطناعي. سنتعلم كيف ننتقل من الأوامر البسيطة إلى أوامر أكثر تحديداً ووضوحاً. ...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-prompt-engineering-basics'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-prompt-libraries',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Building Prompt Libraries',
    excerpt_ar = 'لتوفير الوقت وزيادة الإنتاجية، من المهم بناء ''مكتبة أوامر'' (Prompt Library) خاصة بك. سنتعلم كيفية توثيق وحفظ الأوامر الناجحة، تصنيفها حسب المهمة، وإعا...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-prompt-libraries'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-rag-basics',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'RAG for Beginners',
    excerpt_ar = 'نموذج RAG يدمج بين قوة الاسترجاع من قاعدة بيانات دقيقة وقوة التوليد اللغوي. نشرح كيف يتم استخدام هذه التقنية لضمان أن الذكاء الاصطناعي يجيب من مصادر م...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-rag-basics'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-safe-ai',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Safe Ai',
    excerpt_ar = '# الاستخدام الآمن للذكاء الاصطناعي',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-safe-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-safety-and-security',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'AI Safety and Security',
    excerpt_ar = 'كيف تحمي بياناتك الحساسة أثناء استخدام أدوات الذكاء الاصطناعي السحابية؟ ممارسات أمنية هامة مثل تجنب إدخال معلومات سرية أو بيانات عملاء حقيقية، وفهم سي...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-safety-and-security'
AND status = 'draft';
UPDATE ai_lessons
SET
    slug = 'ai-academy-lesson-workflow-automation',
    portal_id = 'ai-academy',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'AI Workflow Automation',
    excerpt_ar = 'ربط أدوات الذكاء الاصطناعي ببرامجك اليومية (مثل Notion و Zapier) لأتمتة المهام الروتينية. سيوضح هذا الدرس خطوات عملية لبناء سير عمل (Workflow) يقوم با...',
    data = '{}'::jsonb
WHERE id = 'ai-academy-lesson-workflow-automation'
AND status = 'draft';


-- Table: ai_resources
-- Expected updates: 30

UPDATE ai_resources
SET
    slug = 'ai-academy-resource-ai-ethics-guidelines',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Ethics Guidelines',
    data = '{"url": "", "description": "وثيقة شاملة للمبادئ الأخلاقية عند استخدام وتطوير نماذج الذكاء الاصطناعي."}'::jsonb
WHERE id = 'ai-academy-resource-ai-ethics-guidelines'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-ai-safety-fundamentals',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Safety Fundamentals',
    data = '{"url": "https://course.aisafetyfundamentals.com/", "description": "مساقات متخصصة في فهم وتقليل المخاطر المرتبطة بالذكاء الاصطناعي المتقدم."}'::jsonb
WHERE id = 'ai-academy-resource-ai-safety-fundamentals'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-ai-study-planner',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Study Planner',
    data = '{"url": "", "description": "تطبيق يساعد الطلاب على تنظيم وقتهم وبناء خطط دراسية مخصصة."}'::jsonb
WHERE id = 'ai-academy-resource-ai-study-planner'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-ai-tools-directory',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Tools Directory',
    data = '{"url": "", "description": "قائمة محدثة بأهم الأدوات المفيدة في مختلف المجالات العملية والتعليمية."}'::jsonb
WHERE id = 'ai-academy-resource-ai-tools-directory'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-anthropic-alignment',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Anthropic Alignment',
    data = '{"url": "https://www.anthropic.com/research", "description": "أبحاث حول كيفية جعل الذكاء الاصطناعي أكثر أماناً وتوافقاً."}'::jsonb
WHERE id = 'ai-academy-resource-anthropic-alignment'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-ar-ai-community',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Ar Community',
    data = '{"url": "", "description": "منتدى للنقاشات وتبادل الخبرات حول الذكاء الاصطناعي باللغة العربية."}'::jsonb
WHERE id = 'ai-academy-resource-ar-ai-community'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-canva-magic-studio',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Canva Magic Studio',
    data = '{"url": "https://www.canva.com/magic/", "description": "مجموعة أدوات الذكاء الاصطناعي داخل منصة كانفا لتسهيل تصميم الصور العروض التقديمية."}'::jsonb
WHERE id = 'ai-academy-resource-canva-magic-studio'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-chatgpt-2',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Chatgpt',
    data = '{"url": "https://chatgpt.com", "description": "نموذج لغوي متقدم من OpenAI يستخدم في المحادثة وتوليد النصوص وحل المشكلات."}'::jsonb
WHERE id = 'ai-academy-resource-chatgpt-2'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-chatgpt',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Chatgpt',
    data = '{"url": "https://chat.openai.com/", "description": "أداة ذكاء اصطناعي تفاعلية لتوليد النصوص، البرمجة، والتعلم."}'::jsonb
WHERE id = 'ai-academy-resource-chatgpt'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-claude-ai',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Claude',
    data = '{"url": "https://claude.ai/", "description": "مساعد ذكاء اصطناعي متقدم يتميز بنافذة سياق كبيرة وقدرات تحليلية عالية."}'::jsonb
WHERE id = 'ai-academy-resource-claude-ai'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-claude',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Claude',
    data = '{"url": "https://claude.ai", "description": "مساعد ذكاء اصطناعي من Anthropic معروف بقدرته العالية على التحليل وتلخيص الملفات الكبيرة."}'::jsonb
WHERE id = 'ai-academy-resource-claude'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-code-assistant',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Code Assistant',
    data = '{"url": "https://github.com/features/copilot", "description": "أداة من جيت هاب تساعد المبرمجين في كتابة الكود بشكل أسرع وأدق."}'::jsonb
WHERE id = 'ai-academy-resource-code-assistant'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-coursera-ai-for-everyone',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Coursera Ai For Everyone',
    data = '{"url": "https://www.coursera.org/learn/ai-for-everyone", "description": "دورة تدريبية مبسطة من أندرو نغ موجهة لغير المتخصصين لفهم أساسيات الذكاء الاصطناعي."}'::jsonb
WHERE id = 'ai-academy-resource-coursera-ai-for-everyone'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-deepl',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Deepl',
    data = '{"url": "https://www.deepl.com", "description": "أداة ترجمة تعتمد على التعلم العميق تقدم ترجمات دقيقة واحترافية للغاية بين اللغات."}'::jsonb
WHERE id = 'ai-academy-resource-deepl'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-deeplearning-ai',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Deeplearning',
    data = '{"url": "https://www.deeplearning.ai/", "description": "دورات تعليمية متقدمة في مجالات الذكاء الاصطناعي من تقديم أندرو نج."}'::jsonb
WHERE id = 'ai-academy-resource-deeplearning-ai'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-fact-checking-tool',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Fact Checking Tool',
    data = '{"url": "", "description": "منصة متخصصة في تحليل وتدقيق المعلومات المولدة آلياً."}'::jsonb
WHERE id = 'ai-academy-resource-fact-checking-tool'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-gemini',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Gemini',
    data = '{"url": "https://gemini.google.com/", "description": "نموذج الذكاء الاصطناعي متعدد الوسائط من جوجل."}'::jsonb
WHERE id = 'ai-academy-resource-gemini'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-github-copilot',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Github Copilot',
    data = '{"url": "https://github.com/features/copilot", "description": "مساعد برمجة مدعوم بالذكاء الاصطناعي يقترح أكواد برمجية ويساعد في كتابتها بسرعة."}'::jsonb
WHERE id = 'ai-academy-resource-github-copilot'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-google-gemini',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Google Gemini',
    data = '{"url": "https://gemini.google.com", "description": "نموذج الذكاء الاصطناعي من جوجل المدمج في محرك البحث ومساحة العمل الخاصة بها."}'::jsonb
WHERE id = 'ai-academy-resource-google-gemini'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-hallucination-checker',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Hallucination Checker',
    data = '{"url": "", "description": "أداة برمجية لمقارنة نصوص الذكاء الاصطناعي مع المصادر الأصلية لضمان الدقة."}'::jsonb
WHERE id = 'ai-academy-resource-hallucination-checker'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-hugging-face-course',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Hugging Face Course',
    data = '{"url": "https://huggingface.co/course/", "description": "دورة مجانية ممتازة لفهم آليات عمل النماذج اللغوية الكبيرة."}'::jsonb
WHERE id = 'ai-academy-resource-hugging-face-course'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-hugging-face',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Hugging Face',
    data = '{"url": "https://huggingface.co", "description": "منصة مفتوحة المصدر لمشاركة وتطوير نماذج الذكاء الاصطناعي وتعلم الآلة."}'::jsonb
WHERE id = 'ai-academy-resource-hugging-face'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-midjourney-2',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Midjourney',
    data = '{"url": "https://www.midjourney.com", "description": "أداة ذكاء اصطناعي توليدي لإنشاء صور عالية الجودة بناءً على الوصف النصي."}'::jsonb
WHERE id = 'ai-academy-resource-midjourney-2'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-midjourney',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Midjourney',
    data = '{"url": "https://www.midjourney.com/", "description": "أداة متقدمة لتوليد الصور عالية الجودة باستخدام الذكاء الاصطناعي."}'::jsonb
WHERE id = 'ai-academy-resource-midjourney'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-openai-docs',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Openai Docs',
    data = '{"url": "https://platform.openai.com/docs/", "description": "المرجع الرسمي لتعلم كيفية استخدام نماذج OpenAI."}'::jsonb
WHERE id = 'ai-academy-resource-openai-docs'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-perplexity-2',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Perplexity',
    data = '{"url": "https://www.perplexity.ai", "description": "محرك بحث مدعوم بالذكاء الاصطناعي يقدم إجابات مباشرة وموثقة بالمصادر."}'::jsonb
WHERE id = 'ai-academy-resource-perplexity-2'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-perplexity',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Perplexity',
    data = '{"url": "https://www.perplexity.ai/", "description": "محرك بحث يعتمد على الذكاء الاصطناعي لتقديم إجابات موثقة بالمصادر."}'::jsonb
WHERE id = 'ai-academy-resource-perplexity'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-prompt-engineering-guide',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Prompt Engineering Guide',
    data = '{"url": "https://www.promptingguide.ai/", "description": "دليل شامل لتعلم تقنيات هندسة الأوامر من الصفر للاحتراف."}'::jsonb
WHERE id = 'ai-academy-resource-prompt-engineering-guide'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-prompt-library-repo',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Prompt Library Repo',
    data = '{"url": "", "description": "مستودع يحتوي على قوالب جاهزة لأوامر ذكاء اصطناعي لمختلف المهام."}'::jsonb
WHERE id = 'ai-academy-resource-prompt-library-repo'
AND status = 'draft';
UPDATE ai_resources
SET
    slug = 'ai-academy-resource-research-assistant-ai',
    portal_id = 'ai-academy',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Research Assistant',
    data = '{"url": "", "description": "منصة تدعم الباحثين في تلخيص الأوراق العلمية واستخراج البيانات."}'::jsonb
WHERE id = 'ai-academy-resource-research-assistant-ai'
AND status = 'draft';


-- Table: automation_lessons
-- Expected updates: 20

UPDATE automation_lessons
SET
    slug = 'automation-lesson-ai-automation-intro',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ai Automation Intro',
    excerpt_ar = '## عصر جديد للأتمتة',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-ai-automation-intro'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-ai-in-automation',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Integrating AI in Automation',
    excerpt_ar = 'الذكاء الاصطناعي (AI) أضاف بعداً جديداً كلياً للأتمتة؛ فبدلاً من أن تقوم الأداة بنقل البيانات فقط، أصبحت الآن قادرة على ''فهم'' البيانات وتصنيفها وتلخيص...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-ai-in-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-api-basics-automation',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'API Basics for Automation',
    excerpt_ar = 'واجهة برمجة التطبيقات (API) هي لغة التواصل التي تستخدمها البرامج للتحدث مع بعضها البعض ومشاركة البيانات. في عالم الأتمتة، الـ APIs هي العمود الفقري.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-api-basics-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-automation-documentation-testing',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Documentation and Testing Automation',
    excerpt_ar = 'أن تبني الأتمتة شيء، وأن تضمن استمرارها وإمكانية صيانتها شيء آخر. التوثيق والاختبار هما الفارق بين الهواة والمحترفين في الأتمتة.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-automation-documentation-testing'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-automation-security-data-privacy',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Automation Security and Data Privacy',
    excerpt_ar = 'في خضم حماسنا لربط التطبيقات وتسهيل العمل، قد نتجاهل الجانب الأمني، وهو ما قد يؤدي إلى تسريب بيانات حساسة أو اختراق الأنظمة. الأمان في الأتمتة ليس أمر...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-automation-security-data-privacy'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-bpa-case-study',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Business Process Automation: Case Study',
    excerpt_ar = 'أتمتة العمليات التجارية تعني أخذ عملية معقدة تتضمن عدة أقسام وأتمتتها بالكامل. لفهم ذلك، لندرس حالة عملية حقيقية (إلحاق موظف جديد - Onboarding).',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-bpa-case-study'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-building-approval-workflow',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Building an Approval Workflow',
    excerpt_ar = 'سير عمل الموافقات هو أحد أهم الاستخدامات للأتمتة في بيئات العمل المشتركة، حيث يتطلب اتخاذ القرار تدخلاً بشرياً ولكن يمكن أتمتة كل ما يسبق ويلحق هذا ال...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-building-approval-workflow'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-data-mapping-between-apps',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Data Mapping Between Apps',
    excerpt_ar = 'أثناء نقل البيانات من تطبيق إلى آخر في الأتمتة، نادراً ما تتطابق أسماء الحقول والتنسيقات. هنا يأتي دور تخطيط البيانات (Data Mapping).',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-data-mapping-between-apps'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-error-handling-automation',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Error Handling in Automation',
    excerpt_ar = 'حتى أفضل مسارات العمل الأتمتية عرضة للفشل. قد يتوقف سيرفر، أو تتغير صيغة بيانات الـ API، أو ينفد رصيد حسابك في خدمة معينة. معالجة الأخطاء تضمن عدم توق...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-error-handling-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-error-handling',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Error Handling',
    excerpt_ar = '## ماذا تفعل عندما تفشل الأتمتة؟',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-error-handling'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-intro-automation-thinking',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Intro to Automation Thinking',
    excerpt_ar = 'التفكير الأتمتي هو منهجية لحل المشكلات تعتمد على تحديد المهام المتكررة والبحث عن طرق لإنجازها باستخدام التكنولوجيا دون تدخل بشري مستمر.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-intro-automation-thinking'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-intro-automation',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Intro Automation',
    excerpt_ar = '## مرحباً بك في عالم الأتمتة',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-intro-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-intro-google-apps-script',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Intro to Google Apps Script',
    excerpt_ar = 'برمجة تطبيقات جوجل (GAS) هي لغة تعتمد على JavaScript تتيح لك تطوير وأتمتة ميزات وتدفقات عمل ضمن بيئة Google Workspace (Sheets, Docs, Gmail, Forms... إ...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-intro-google-apps-script'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-make-zapier-n8n-comparison',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Make vs Zapier vs n8n Comparison',
    excerpt_ar = 'اختيار الأداة المناسبة هو نصف الحل. كل أداة من هذه الأدوات لها نقاط قوة تناسب فئات معينة.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-make-zapier-n8n-comparison'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-retries-and-fallbacks',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Retries and Fallbacks',
    excerpt_ar = 'في عالم الشبكات، يمكن أن تفشل طلبات البيانات لعدة أسباب مؤقتة (مثل انقطاع لحظي للشبكة أو تحديث سريع للسيرفر). لذلك نحتاج إلى استراتيجيات للتعامل مع هذ...',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-retries-and-fallbacks'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-triggers-actions',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Triggers Actions',
    excerpt_ar = '## كيف تعمل أي أتمتة؟',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-triggers-actions'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-understanding-triggers-actions',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Understanding Triggers and Actions',
    excerpt_ar = 'تتكون أي عملية أتمتة من جزأين رئيسيين: المحفز (Trigger) والإجراء (Action). بدون فهم هذين العنصرين، لا يمكن بناء سير عمل سليم.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-understanding-triggers-actions'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-webhooks-explained',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'What is a Webhook and How it Works?',
    excerpt_ar = 'الويب هوك (Webhook) هو طريقة فعالة جداً لنقل البيانات في الوقت الفعلي بين التطبيقات. وهو يعتمد على مبدأ ''لا تتصل بنا، نحن سنتصل بك''.',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-webhooks-explained'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-webhooks-integration',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Webhooks Integration',
    excerpt_ar = '## ما هو خطاف الويب (Webhook)؟',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-webhooks-integration'
AND status = 'draft';
UPDATE automation_lessons
SET
    slug = 'automation-lesson-zapier-vs-make',
    portal_id = 'automation',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Zapier Vs Make',
    excerpt_ar = '## مقارنة بين عمالقة الأتمتة',
    data = '{}'::jsonb
WHERE id = 'automation-lesson-zapier-vs-make'
AND status = 'draft';


-- Table: automation_resources
-- Expected updates: 30

UPDATE automation_resources
SET
    slug = 'automation-resource-ai-automation-trends',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'AI in Automation Trends',
    data = '{"url": "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-next-frontier-of-process-automation", "description": "تقرير من McKinsey حول كيفية دمج الذكاء الاصطناعي مع الأتمتة لخلق الجيل الجديد من العمليات الذكية."}'::jsonb
WHERE id = 'automation-resource-ai-automation-trends'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-ai-automation',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Ai Automation',
    data = '{"url": "https://www.forbes.com/sites/forbestechcouncil/2023/04/10/the-future-of-ai-and-automation/", "description": "مقال يتحدث عن مستقبل دمج الذكاء الاصطناعي مع تقنيات الأتمتة."}'::jsonb
WHERE id = 'automation-resource-ai-automation'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-api-security-best-practices',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'API Security Best Practices',
    data = '{"url": "https://owasp.org/www-project-api-security/", "description": "موارد من منظمة OWASP العالمية حول أمان واجهات برمجة التطبيقات وكيفية حماية بياناتك أثناء استخدام الأتمتة."}'::jsonb
WHERE id = 'automation-resource-api-security-best-practices'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-apis-beginners',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Apis Beginners',
    data = '{"url": "https://zapier.com/learn/apis/", "description": "كتاب إلكتروني مجاني من Zapier يشرح APIs بلغة بسيطة ومفهومة."}'::jsonb
WHERE id = 'automation-resource-apis-beginners'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-automate-io-alt',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Automate Io Alt',
    data = '{"url": "https://zapier.com/apps/automateio/integrations", "description": "نظرة على الخيارات البديلة المتاحة بعد إغلاق منصة Automate.io."}'::jsonb
WHERE id = 'automation-resource-automate-io-alt'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-automating-business-processes',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Automating Business Processes',
    data = '{"url": "https://hbr.org/2018/06/before-you-automate-your-processes-redesign-them", "description": "مقال من مجلة هارفارد بزنس ريفيو يناقش أهمية إعادة تصميم العمليات التجارية قبل محاولة أتمتتها لتحقيق أقصى استفادة."}'::jsonb
WHERE id = 'automation-resource-automating-business-processes'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-automation-safety',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Automation Safety',
    data = '{"url": "https://www.cybersecurity-insiders.com/automation-security/", "description": "نصائح وإرشادات حول كيفية تأمين مسارات العمل المؤتمتة الخاصة بك والبيانات الحساسة."}'::jsonb
WHERE id = 'automation-resource-automation-safety'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-automation-testing-frameworks',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Automation Testing Frameworks',
    data = '{"url": "https://www.softwaretestinghelp.com/automation-testing-frameworks/", "description": "مقال يستعرض أطر عمل اختبار الأتمتة وأهميتها في التأكد من استقرار تدفقات العمل قبل إطلاقها الفعلي."}'::jsonb
WHERE id = 'automation-resource-automation-testing-frameworks'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-cloud-computing-intro',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Introduction to Cloud Computing',
    data = '{"url": "https://aws.amazon.com/what-is-cloud-computing/", "description": "مقدمة من AWS حول مفاهيم الحوسبة السحابية، والتي تُبنى عليها الغالبية العظمى من منصات وأدوات الأتمتة الحديثة."}'::jsonb
WHERE id = 'automation-resource-cloud-computing-intro'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-cron-job-syntax',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Cron Job Syntax Guide',
    data = '{"url": "https://crontab.guru/", "description": "أداة بسيطة تشرح وتساعد في صياغة توقيتات Cron Jobs لجدولة العمليات الأتمتية لتشغيلها في أوقات محددة بدقة."}'::jsonb
WHERE id = 'automation-resource-cron-job-syntax'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-data-mapping-basics',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Data Mapping Basics',
    data = '{"url": "https://www.ibm.com/topics/data-mapping", "description": "نظرة عامة من IBM حول مفهوم تخطيط البيانات (Data Mapping) وكيف يتم نقل البيانات من أنظمة مختلفة والتأكد من مطابقتها."}'::jsonb
WHERE id = 'automation-resource-data-mapping-basics'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-error-handling-best-practices',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Error Handling Best Practices',
    data = '{"url": "https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/", "description": "دليل تقني حول أفضل الممارسات في معالجة الأخطاء (Error Handling) في البرمجة النصية والتي يمكن تطبيقها على الأتمتة المتقدمة."}'::jsonb
WHERE id = 'automation-resource-error-handling-best-practices'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-gas-guide-2',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Gas Guide',
    data = '{"url": "https://developers.google.com/apps-script/guides", "description": "تعلم كيفية أتمتة تطبيقات Google Workspace وإنشاء إضافات مخصصة."}'::jsonb
WHERE id = 'automation-resource-gas-guide-2'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-gas-guide',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Google Apps Script Guide',
    data = '{"url": "https://developers.google.com/apps-script", "description": "الدليل الرسمي من جوجل لكتابة وتطوير سكريبتات لمنتجات Google Workspace مثل Sheets و Docs و Gmail للقيام بالأتمتة."}'::jsonb
WHERE id = 'automation-resource-gas-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-http-status-codes',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'HTTP Status Codes Directory',
    data = '{"url": "https://httpstatuses.com/", "description": "دليل مرجعي شامل ومبسط لجميع رموز استجابة HTTP (مثل 200, 404, 500) التي تواجهها أثناء التعامل مع الـ APIs والويب هوك."}'::jsonb
WHERE id = 'automation-resource-http-status-codes'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-json-guide',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'JSON Guide',
    data = '{"url": "https://www.w3schools.com/js/js_json_intro.asp", "description": "مقدمة شاملة من W3Schools لفهم صيغة JSON، وكيفية كتابتها وقراءتها، وهو أمر أساسي في جميع مسارات الأتمتة تقريباً."}'::jsonb
WHERE id = 'automation-resource-json-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-make-academy-2',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Make Academy',
    data = '{"url": "https://academy.make.com/", "description": "دورات تدريبية مجانية لتعلم كيفية استخدام منصة Make للمبتدئين والمحترفين."}'::jsonb
WHERE id = 'automation-resource-make-academy-2'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-make-academy',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Make.com Academy',
    data = '{"url": "https://academy.make.com/", "description": "أكاديمية منصة Make التي تقدم دورات مجانية لتعلم كيفية استخدام المنصة لبناء الأتمتة من الصفر وتصميم السيناريوهات المتقدمة."}'::jsonb
WHERE id = 'automation-resource-make-academy'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-n8n-docs',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'N8N Docs',
    data = '{"url": "https://docs.n8n.io/", "description": "الدليل الرسمي لاستخدام منصة n8n وبناء مسارات عمل مخصصة."}'::jsonb
WHERE id = 'automation-resource-n8n-docs'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-n8n-documentation',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'n8n Documentation',
    data = '{"url": "https://docs.n8n.io/", "description": "التوثيق الرسمي لمنصة n8n للأتمتة المفتوحة المصدر. يحتوي على أدلة مفصلة حول كيفية بناء مسارات العمل والعقد المتاحة وتطوير العقد المخصصة."}'::jsonb
WHERE id = 'automation-resource-n8n-documentation'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-oauth2-simplified',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'OAuth 2.0 Simplified',
    data = '{"url": "https://aaronparecki.com/oauth-2-simplified/", "description": "شرح مبسط لآلية المصادقة OAuth 2.0 وكيفية عملها، وهو أمر حيوي لفهم كيفية ربط تطبيقات الأتمتة بشكل آمن."}'::jsonb
WHERE id = 'automation-resource-oauth2-simplified'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-power-automate-docs',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Microsoft Power Automate Docs',
    data = '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت لتعلم كيفية إنشاء التدفقات وأتمتة العمليات باستخدام Power Automate ضمن بيئة Microsoft 365."}'::jsonb
WHERE id = 'automation-resource-power-automate-docs'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-power-automate-learn',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Power Automate Learn',
    data = '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت الرسمية لتعلم أتمتة العمليات التجارية."}'::jsonb
WHERE id = 'automation-resource-power-automate-learn'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-regex-data-extraction',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Regex for Data Extraction',
    data = '{"url": "https://regexr.com/", "description": "أداة ومورد تعليمي رائع لاختبار وتعلم التعابير النمطية (Regular Expressions) المستخدمة لاستخراج بيانات محددة من نصوص داخل مسارات الأتمتة."}'::jsonb
WHERE id = 'automation-resource-regex-data-extraction'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-rest-api-tutorial',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'REST API Tutorial',
    data = '{"url": "https://restfulapi.net/", "description": "مورد ممتاز لتعلم أساسيات واجهات برمجة التطبيقات (REST APIs)، والأفعال المستخدمة (GET, POST, PUT, DELETE) والرموز المرجعية."}'::jsonb
WHERE id = 'automation-resource-rest-api-tutorial'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-retry-policies-guide',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Retry Policies Guide',
    data = '{"url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults", "description": "دليل تصميم الأنماط المعمارية للتعامل مع الأخطاء المؤقتة وآليات إعادة المحاولة (Retry Patterns) لضمان استقرار العمليات."}'::jsonb
WHERE id = 'automation-resource-retry-policies-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-webhooks-explained-2',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Webhooks Explained',
    data = '{"url": "https://sendgrid.com/blog/webhook-vs-api-whats-difference/", "description": "مقال يشرح الفرق بين Webhooks و APIs ومتى تستخدم كل منها."}'::jsonb
WHERE id = 'automation-resource-webhooks-explained-2'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-webhooks-explained',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Webhooks Explained',
    data = '{"url": "https://zapier.com/blog/what-is-a-webhook/", "description": "مقال شامل من Zapier يشرح مفهوم الويب هوك (Webhooks) وكيفية عملها وكيف تختلف عن الاستعلام الدوري (Polling)."}'::jsonb
WHERE id = 'automation-resource-webhooks-explained'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-zapier-blog',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Zapier Blog',
    data = '{"url": "https://zapier.com/blog", "description": "مقالات رائعة وأدلة عملية حول الأتمتة وزيادة الإنتاجية."}'::jsonb
WHERE id = 'automation-resource-zapier-blog'
AND status = 'draft';
UPDATE automation_resources
SET
    slug = 'automation-resource-zapier-university',
    portal_id = 'automation',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Zapier University',
    data = '{"url": "https://zapier.com/university", "description": "دروس وفيديوهات تعليمية من Zapier مصممة لمساعدة المستخدمين على فهم الأتمتة وربط تطبيقاتهم المختلفة بشكل فعال."}'::jsonb
WHERE id = 'automation-resource-zapier-university'
AND status = 'draft';


-- Table: career_glossary
-- Expected updates: 50

UPDATE career_glossary
SET
    slug = 'career-glossary-ai-tools',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Ai Tools',
    data = '{"definition": "برامج تستخدم الذكاء الاصطناعي للمساعدة في المهام المهنية.", "example": "مثال على استخدام مصطلح أدوات الذكاء الاصطناعي في السياق المهني.", "definition_ar": "برامج تستخدم الذكاء الاصطناعي للمساعدة في المهام المهنية."}'::jsonb
WHERE id = 'career-glossary-ai-tools'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-ats-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'ATS',
    data = '{"definition": "برامج تستخدمها الشركات لإدارة عملية التوظيف وفحص السير الذاتية آلياً للبحث عن الكلمات المفتاحية.", "example": "تنسيق السيرة الذاتية بشكل بسيط واستخدام خطوط واضحة لضمان قراءتها بشكل صحيح من قبل نظام الـ ATS.", "definition_ar": "برامج تستخدمها الشركات لإدارة عملية التوظيف وفحص السير الذاتية آلياً للبحث عن الكلمات المفتاحية."}'::jsonb
WHERE id = 'career-glossary-ats-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-ats',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Ats',
    data = '{"definition": "برنامج يستخدمه أصحاب العمل لفرز السير الذاتية.", "example": "مثال على استخدام مصطلح نظام تتبع المتقدمين في السياق المهني.", "definition_ar": "برنامج يستخدمه أصحاب العمل لفرز السير الذاتية."}'::jsonb
WHERE id = 'career-glossary-ats'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-burnout',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Burnout',
    data = '{"definition": "حالة من الإرهاق الجسدي والعاطفي والعقلي ناتجة عن ضغوط العمل المستمرة والفشل في تحقيق التوازن.", "example": "الشعور بالتعب المستمر وفقدان الشغف بالعمل بسبب ساعات العمل الطويلة وعدم وجود فترات راحة كافية.", "definition_ar": "حالة من الإرهاق الجسدي والعاطفي والعقلي ناتجة عن ضغوط العمل المستمرة والفشل في تحقيق التوازن."}'::jsonb
WHERE id = 'career-glossary-burnout'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-career-shift-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Career Shift',
    data = '{"definition": "الانتقال للعمل في مجال مختلف عن مجالك الحالي أو السابق.", "example": "مثال على استخدام مصطلح تغيير المسار المهني في السياق المهني.", "definition_ar": "الانتقال للعمل في مجال مختلف عن مجالك الحالي أو السابق."}'::jsonb
WHERE id = 'career-glossary-career-shift-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-career-shift',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Shift',
    data = '{"definition": "الانتقال من مجال عمل إلى مجال آخر مختلف، ويتطلب غالباً اكتساب مهارات جديدة وإعادة تقييم المسار المهني.", "example": "الانتقال من مجال التسويق إلى مجال تحليل البيانات بعد دراسة دورات متخصصة.", "definition_ar": "الانتقال من مجال عمل إلى مجال آخر مختلف، ويتطلب غالباً اكتساب مهارات جديدة وإعادة تقييم المسار المهني."}'::jsonb
WHERE id = 'career-glossary-career-shift'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-cover-letter-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Cover Letter',
    data = '{"definition": "رسالة ترفق مع السيرة الذاتية لتوضيح سبب اهتمامك بالوظيفة.", "example": "مثال على استخدام مصطلح خطاب المقدمة في السياق المهني.", "definition_ar": "رسالة ترفق مع السيرة الذاتية لتوضيح سبب اهتمامك بالوظيفة."}'::jsonb
WHERE id = 'career-glossary-cover-letter-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-cover-letter',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Cover Letter',
    data = '{"definition": "رسالة ترفق مع السيرة الذاتية تقدم فيها نفسك وتوضح سبب اهتمامك بالوظيفة وكيف يمكن لمهاراتك أن تفيد الشركة.", "example": "كتابة خطاب مقدمة مخصص لشركة تقنية يبرز شغفك بمنتجاتهم وخبرتك السابقة في المجال.", "definition_ar": "رسالة ترفق مع السيرة الذاتية تقدم فيها نفسك وتوضح سبب اهتمامك بالوظيفة وكيف يمكن لمهاراتك أن تفيد الشركة."}'::jsonb
WHERE id = 'career-glossary-cover-letter'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-culture-fit',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Culture Fit',
    data = '{"definition": "مدى توافق قيم الموظف وسلوكياته ومعتقداته مع ثقافة بيئة العمل في الشركة.", "example": "تقييم ما إذا كان أسلوب عملك المرن يتناسب مع ثقافة الشركة التي تشجع على الابتكار والاستقلالية.", "definition_ar": "مدى توافق قيم الموظف وسلوكياته ومعتقداته مع ثقافة بيئة العمل في الشركة."}'::jsonb
WHERE id = 'career-glossary-culture-fit'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-cv-optimization',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CV Optimization',
    data = '{"definition": "عملية تعديل السيرة الذاتية لتتناسب مع متطلبات الوظيفة المستهدفة وإبراز المهارات والإنجازات بشكل واضح.", "example": "استخدام كلمات مفتاحية من الوصف الوظيفي في السيرة الذاتية لضمان تجاوز أنظمة تتبع المتقدمين.", "definition_ar": "عملية تعديل السيرة الذاتية لتتناسب مع متطلبات الوظيفة المستهدفة وإبراز المهارات والإنجازات بشكل واضح."}'::jsonb
WHERE id = 'career-glossary-cv-optimization'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-cv',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Cv',
    data = '{"definition": "وثيقة تقدم ملخصاً عن خبراتك ومهاراتك.", "example": "مثال على استخدام مصطلح السيرة الذاتية في السياق المهني.", "definition_ar": "وثيقة تقدم ملخصاً عن خبراتك ومهاراتك."}'::jsonb
WHERE id = 'career-glossary-cv'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-elevator-pitch-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Elevator Pitch',
    data = '{"definition": "عرض تقديمي قصير جداً عن نفسك ومهاراتك.", "example": "مثال على استخدام مصطلح الخطاب الموجز في السياق المهني.", "definition_ar": "عرض تقديمي قصير جداً عن نفسك ومهاراتك."}'::jsonb
WHERE id = 'career-glossary-elevator-pitch-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-elevator-pitch',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Elevator Pitch',
    data = '{"definition": "مقدمة قصيرة ومقنعة عن نفسك ومهاراتك وما تبحث عنه مهنياً، تستغرق وقتاً لا يتجاوز ركوب المصعد.", "example": "تقديم نفسك بوضوح في أقل من 30 ثانية في فعالية توظيف لإثارة اهتمام مسؤول التوظيف.", "definition_ar": "مقدمة قصيرة ومقنعة عن نفسك ومهاراتك وما تبحث عنه مهنياً، تستغرق وقتاً لا يتجاوز ركوب المصعد."}'::jsonb
WHERE id = 'career-glossary-elevator-pitch'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-freelance',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Freelance',
    data = '{"definition": "تقديم الخدمات بشكل مستقل لعدة عملاء.", "example": "مثال على استخدام مصطلح العمل الحر في السياق المهني.", "definition_ar": "تقديم الخدمات بشكل مستقل لعدة عملاء."}'::jsonb
WHERE id = 'career-glossary-freelance'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-gig-economy',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Gig Economy',
    data = '{"definition": "سوق عمل يعتمد على الوظائف المؤقتة، والعمل المستقل، والعقود قصيرة الأجل بدلاً من الوظائف الدائمة.", "example": "العمل كمصمم جرافيك مستقل (Freelancer) وتقديم خدمات للعديد من العملاء.", "definition_ar": "سوق عمل يعتمد على الوظائف المؤقتة، والعمل المستقل، والعقود قصيرة الأجل بدلاً من الوظائف الدائمة."}'::jsonb
WHERE id = 'career-glossary-gig-economy'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-hard-skills-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Hard Skills',
    data = '{"definition": "قدرات تقنية ومعرفة متخصصة يمكن قياسها.", "example": "مثال على استخدام مصطلح المهارات الصلبة في السياق المهني.", "definition_ar": "قدرات تقنية ومعرفة متخصصة يمكن قياسها."}'::jsonb
WHERE id = 'career-glossary-hard-skills-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-hard-skills',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Hard Skills',
    data = '{"definition": "القدرات والمعارف التقنية المحددة والمطلوبة لأداء وظيفة معينة، والتي يمكن قياسها وتقييمها.", "example": "البرمجة بلغة بايثون، تصميم الجرافيك باستخدام فوتوشوب، أو التحليل المالي.", "definition_ar": "القدرات والمعارف التقنية المحددة والمطلوبة لأداء وظيفة معينة، والتي يمكن قياسها وتقييمها."}'::jsonb
WHERE id = 'career-glossary-hard-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-imposter-syndrome',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Imposter Syndrome',
    data = '{"definition": "شعور داخلي بعدم الكفاءة والشك في الذات رغم وجود أدلة على النجاح، والخوف من أن يكتشف الآخرون أنك \"محتال\".", "example": "الشعور بأنك لا تستحق الترقية التي حصلت عليها وأنها كانت مجرد حظ.", "definition_ar": "شعور داخلي بعدم الكفاءة والشك في الذات رغم وجود أدلة على النجاح، والخوف من أن يكتشف الآخرون أنك \"محتال\"."}'::jsonb
WHERE id = 'career-glossary-imposter-syndrome'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-informational-interview',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Informational Interview',
    data = '{"definition": "لقاء غير رسمي مع محترف في مجال معين للحصول على معلومات ونصائح حول هذا المجال، وليس لطلب وظيفة بشكل مباشر.", "example": "دعوة مدير منتج لتناول القهوة وسؤاله عن تحديات مهنته والمهارات المطلوبة للنجاح فيها.", "definition_ar": "لقاء غير رسمي مع محترف في مجال معين للحصول على معلومات ونصائح حول هذا المجال، وليس لطلب وظيفة بشكل مباشر."}'::jsonb
WHERE id = 'career-glossary-informational-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-internship',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Internship',
    data = '{"definition": "فترة عمل مؤقتة لاكتساب خبرة عملية في مجال معين.", "example": "مثال على استخدام مصطلح التدريب المهني في السياق المهني.", "definition_ar": "فترة عمل مؤقتة لاكتساب خبرة عملية في مجال معين."}'::jsonb
WHERE id = 'career-glossary-internship'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-interview',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Interview',
    data = '{"definition": "لقاء لتقييم مدى ملاءمتك للوظيفة.", "example": "مثال على استخدام مصطلح المقابلة الشخصية في السياق المهني.", "definition_ar": "لقاء لتقييم مدى ملاءمتك للوظيفة."}'::jsonb
WHERE id = 'career-glossary-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-job-description-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Job Description',
    data = '{"definition": "وثيقة توضح المهام والمسؤوليات المطلوبة لوظيفة معينة.", "example": "مثال على استخدام مصطلح الوصف الوظيفي في السياق المهني.", "definition_ar": "وثيقة توضح المهام والمسؤوليات المطلوبة لوظيفة معينة."}'::jsonb
WHERE id = 'career-glossary-job-description-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-job-description',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Job Description',
    data = '{"definition": "وثيقة تحدد مسؤوليات الوظيفة ومهامها والمهارات والمؤهلات المطلوبة لأدائها.", "example": "قراءة الوصف الوظيفي بعناية لتحديد ما إذا كانت الوظيفة تناسب خبراتك وأهدافك المهنية.", "definition_ar": "وثيقة تحدد مسؤوليات الوظيفة ومهامها والمهارات والمؤهلات المطلوبة لأدائها."}'::jsonb
WHERE id = 'career-glossary-job-description'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-job-search-strategy',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Job Search Strategy',
    data = '{"definition": "خطة منظمة للبحث عن الوظائف المناسبة تتضمن استخدام شبكات العلاقات، المنصات المهنية، ومواقع التوظيف.", "example": "تخصيص ساعتين يومياً للبحث عن وظائف والتواصل مع مسؤولي التوظيف على لينكد إن.", "definition_ar": "خطة منظمة للبحث عن الوظائف المناسبة تتضمن استخدام شبكات العلاقات، المنصات المهنية، ومواقع التوظيف."}'::jsonb
WHERE id = 'career-glossary-job-search-strategy'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-linkedin-optimization',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Linkedin Optimization',
    data = '{"definition": "تحديث وتطوير الملف الشخصي على لينكد إن ليكون احترافياً وجاذباً لمسؤولي التوظيف والزملاء في نفس المجال.", "example": "إضافة صورة احترافية وكتابة ملخص جذاب وإدراج الكلمات المفتاحية المتعلقة بمسارك المهني.", "definition_ar": "تحديث وتطوير الملف الشخصي على لينكد إن ليكون احترافياً وجاذباً لمسؤولي التوظيف والزملاء في نفس المجال."}'::jsonb
WHERE id = 'career-glossary-linkedin-optimization'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-linkedin',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Linkedin',
    data = '{"definition": "منصة مهنية لبناء شبكة علاقات والبحث عن وظائف.", "example": "مثال على استخدام مصطلح لينكد إن في السياق المهني.", "definition_ar": "منصة مهنية لبناء شبكة علاقات والبحث عن وظائف."}'::jsonb
WHERE id = 'career-glossary-linkedin'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-mentorship-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mentorship',
    data = '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتوجيه شخص أقل خبرة.", "example": "مثال على استخدام مصطلح الإرشاد المهني في السياق المهني.", "definition_ar": "علاقة مهنية يقوم فيها شخص ذو خبرة بتوجيه شخص أقل خبرة."}'::jsonb
WHERE id = 'career-glossary-mentorship-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-mentorship',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mentorship',
    data = '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتقديم النصح والإرشاد والدعم لشخص أقل خبرة في مساره المهني.", "example": "البحث عن مرشد (Mentor) في شركتك لمساعدتك في تطوير مهاراتك القيادية.", "definition_ar": "علاقة مهنية يقوم فيها شخص ذو خبرة بتقديم النصح والإرشاد والدعم لشخص أقل خبرة في مساره المهني."}'::jsonb
WHERE id = 'career-glossary-mentorship'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-mock-interview',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mock Interview',
    data = '{"definition": "محاكاة لمقابلة عمل حقيقية للتدرب على الإجابات وتقليل التوتر وتحسين الأداء.", "example": "إجراء مقابلة تجريبية مع صديق أو مستشار مهني وتلقي ملاحظات بناءة على أدائك.", "definition_ar": "محاكاة لمقابلة عمل حقيقية للتدرب على الإجابات وتقليل التوتر وتحسين الأداء."}'::jsonb
WHERE id = 'career-glossary-mock-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-negotiation',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Negotiation',
    data = '{"definition": "النقاش للوصول إلى اتفاق حول الراتب والمزايا.", "example": "مثال على استخدام مصطلح التفاوض في السياق المهني.", "definition_ar": "النقاش للوصول إلى اتفاق حول الراتب والمزايا."}'::jsonb
WHERE id = 'career-glossary-negotiation'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-networking-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Networking',
    data = '{"definition": "بناء علاقات مهنية مفيدة لتبادل المعلومات والفرص.", "example": "مثال على استخدام مصطلح التشبيك في السياق المهني.", "definition_ar": "بناء علاقات مهنية مفيدة لتبادل المعلومات والفرص."}'::jsonb
WHERE id = 'career-glossary-networking-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-networking',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Networking',
    data = '{"definition": "التواصل مع المهنيين الآخرين لتبادل المعلومات والخبرات واكتشاف الفرص الوظيفية.", "example": "حضور المؤتمرات والفعاليات المهنية للتواصل مع الخبراء والمهتمين بنفس المجال.", "definition_ar": "التواصل مع المهنيين الآخرين لتبادل المعلومات والخبرات واكتشاف الفرص الوظيفية."}'::jsonb
WHERE id = 'career-glossary-networking'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-onboarding',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Onboarding',
    data = '{"definition": "العملية التي يتم من خلالها دمج الموظفين الجدد في المؤسسة وتعريفهم بثقافتها وأدوارهم ومسؤولياتهم.", "example": "حضور جلسات تعريفية عن سياسات الشركة وتلقي التدريب الأساسي في الأسبوع الأول من العمل.", "definition_ar": "العملية التي يتم من خلالها دمج الموظفين الجدد في المؤسسة وتعريفهم بثقافتها وأدوارهم ومسؤولياتهم."}'::jsonb
WHERE id = 'career-glossary-onboarding'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-personal-branding-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Personal Branding',
    data = '{"definition": "الطريقة التي تسوق بها نفسك مهنياً.", "example": "مثال على استخدام مصطلح العلامة التجارية الشخصية في السياق المهني.", "definition_ar": "الطريقة التي تسوق بها نفسك مهنياً."}'::jsonb
WHERE id = 'career-glossary-personal-branding-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-personal-branding',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Personal Branding',
    data = '{"definition": "الصورة والانطباع الذي تتركه لدى الآخرين عنك في مجالك المهني، وكيف تسوق لنفسك وخبراتك.", "example": "نشر مقالات متخصصة في مجالك على مدونتك أو حسابك في لينكد إن لبناء سمعة كخبير.", "definition_ar": "الصورة والانطباع الذي تتركه لدى الآخرين عنك في مجالك المهني، وكيف تسوق لنفسك وخبراتك."}'::jsonb
WHERE id = 'career-glossary-personal-branding'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-portfolio-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Portfolio',
    data = '{"definition": "مجموعة من أعمالك السابقة التي تثبت مهاراتك.", "example": "مثال على استخدام مصطلح معرض الأعمال في السياق المهني.", "definition_ar": "مجموعة من أعمالك السابقة التي تثبت مهاراتك."}'::jsonb
WHERE id = 'career-glossary-portfolio-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-portfolio',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Portfolio',
    data = '{"definition": "مجموعة من النماذج والمشاريع التي توضح مهاراتك وخبراتك وإنجازاتك العملية للمستفيدين المحتملين.", "example": "إنشاء موقع إلكتروني يعرض أفضل التصاميم أو المشاريع البرمجية التي قمت بتنفيذها.", "definition_ar": "مجموعة من النماذج والمشاريع التي توضح مهاراتك وخبراتك وإنجازاتك العملية للمستفيدين المحتملين."}'::jsonb
WHERE id = 'career-glossary-portfolio'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-proof-of-work',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Proof Of Work',
    data = '{"definition": "تقديم أدلة ملموسة على قدراتك ومهاراتك من خلال مشاريع حقيقية أو إنجازات سابقة بدلاً من الاعتماد فقط على الشهادات.", "example": "المساهمة في مشاريع مفتوحة المصدر (Open Source) لإثبات كفاءتك البرمجية.", "definition_ar": "تقديم أدلة ملموسة على قدراتك ومهاراتك من خلال مشاريع حقيقية أو إنجازات سابقة بدلاً من الاعتماد فقط على الشهادات."}'::jsonb
WHERE id = 'career-glossary-proof-of-work'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-remote-work-skills',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Remote Work Skills',
    data = '{"definition": "القدرات اللازمة للعمل بفعالية وكفاءة خارج بيئة المكتب التقليدية، مثل إدارة الوقت والتواصل الافتراضي.", "example": "استخدام أدوات مثل Slack و Trello لإدارة المهام والتواصل مع الفريق بسلاسة.", "definition_ar": "القدرات اللازمة للعمل بفعالية وكفاءة خارج بيئة المكتب التقليدية، مثل إدارة الوقت والتواصل الافتراضي."}'::jsonb
WHERE id = 'career-glossary-remote-work-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-remote-work',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Remote Work',
    data = '{"definition": "العمل من موقع خارج المكتب التقليدي.", "example": "مثال على استخدام مصطلح العمل عن بعد في السياق المهني.", "definition_ar": "العمل من موقع خارج المكتب التقليدي."}'::jsonb
WHERE id = 'career-glossary-remote-work'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-reskilling',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Reskilling',
    data = '{"definition": "تعلم مهارات جديدة ومختلفة تماماً عن مهاراتك الحالية للانتقال إلى مسار مهني جديد.", "example": "تعلم البرمجة للعاملين في مجال المبيعات بهدف تغيير مسارهم المهني إلى تطوير البرمجيات.", "definition_ar": "تعلم مهارات جديدة ومختلفة تماماً عن مهاراتك الحالية للانتقال إلى مسار مهني جديد."}'::jsonb
WHERE id = 'career-glossary-reskilling'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-salary-negotiation',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Salary Negotiation',
    data = '{"definition": "مناقشة العرض المالي مع صاحب العمل للوصول إلى اتفاق يرضي الطرفين ويعكس القيمة السوقية لمهاراتك.", "example": "البحث عن متوسط الرواتب في السوق لوظيفتك واستخدام هذه المعلومات لدعم موقفك التفاوضي.", "definition_ar": "مناقشة العرض المالي مع صاحب العمل للوصول إلى اتفاق يرضي الطرفين ويعكس القيمة السوقية لمهاراتك."}'::jsonb
WHERE id = 'career-glossary-salary-negotiation'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-skill-gap-analysis',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Skill Gap Analysis',
    data = '{"definition": "عملية تحديد المهارات التي تنقصك للوصول إلى هدف مهني معين وكيفية اكتسابها.", "example": "مقارنة مهاراتك الحالية بمتطلبات وظيفة مدير مشروع وتحديد الحاجة للحصول على شهادة PMP.", "definition_ar": "عملية تحديد المهارات التي تنقصك للوصول إلى هدف مهني معين وكيفية اكتسابها."}'::jsonb
WHERE id = 'career-glossary-skill-gap-analysis'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-soft-skills-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Soft Skills',
    data = '{"definition": "سمات شخصية ومهارات تواصل تؤثر على طريقة عملك.", "example": "مثال على استخدام مصطلح المهارات الناعمة في السياق المهني.", "definition_ar": "سمات شخصية ومهارات تواصل تؤثر على طريقة عملك."}'::jsonb
WHERE id = 'career-glossary-soft-skills-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-soft-skills',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Soft Skills',
    data = '{"definition": "السمات الشخصية والقدرات الاجتماعية التي تساعدك على التفاعل مع الآخرين والعمل في بيئة جماعية.", "example": "الذكاء العاطفي، حل المشكلات، العمل الجماعي، والمرونة.", "definition_ar": "السمات الشخصية والقدرات الاجتماعية التي تساعدك على التفاعل مع الآخرين والعمل في بيئة جماعية."}'::jsonb
WHERE id = 'career-glossary-soft-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-star-method-2',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Star Method',
    data = '{"definition": "هيكلية للإجابة على أسئلة المقابلات السلوكية.", "example": "مثال على استخدام مصطلح طريقة STAR في السياق المهني.", "definition_ar": "هيكلية للإجابة على أسئلة المقابلات السلوكية."}'::jsonb
WHERE id = 'career-glossary-star-method-2'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-star-method',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'STAR',
    data = '{"definition": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).", "example": "استخدام طريقة ستار لشرح كيف قمت بحل مشكلة مع عميل غاضب وتحقيق نسبة رضا عالية.", "definition_ar": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result)."}'::jsonb
WHERE id = 'career-glossary-star-method'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-transferable-skills',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Transferable Skills',
    data = '{"definition": "المهارات التي تكتسبها في وظيفة أو تجربة معينة ويمكن استخدامها وتطبيقها في وظائف ومجالات أخرى.", "example": "مهارات القيادة والتواصل التي اكتسبتها في العمل التطوعي وتطبيقها في بيئة العمل للشركات.", "definition_ar": "المهارات التي تكتسبها في وظيفة أو تجربة معينة ويمكن استخدامها وتطبيقها في وظائف ومجالات أخرى."}'::jsonb
WHERE id = 'career-glossary-transferable-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-upskilling',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Upskilling',
    data = '{"definition": "عملية تعلم مهارات جديدة أو تحسين المهارات الحالية لمواكبة التطورات في سوق العمل والتأهل لفرص أفضل.", "example": "أخذ دورة تدريبية في الذكاء الاصطناعي لتعزيز مهاراتك التقنية.", "definition_ar": "عملية تعلم مهارات جديدة أو تحسين المهارات الحالية لمواكبة التطورات في سوق العمل والتأهل لفرص أفضل."}'::jsonb
WHERE id = 'career-glossary-upskilling'
AND status = 'draft';
UPDATE career_glossary
SET
    slug = 'career-glossary-work-life-balance',
    portal_id = 'career',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Work Life Balance',
    data = '{"definition": "القدرة على إدارة الوقت بفعالية بين متطلبات العمل والمسؤوليات الشخصية والراحة.", "example": "تحديد ساعات عمل محددة وتخصيص وقت للعائلة والهوايات لتجنب الإرهاق الوظيفي.", "definition_ar": "القدرة على إدارة الوقت بفعالية بين متطلبات العمل والمسؤوليات الشخصية والراحة."}'::jsonb
WHERE id = 'career-glossary-work-life-balance'
AND status = 'draft';


-- Table: career_lessons
-- Expected updates: 20

UPDATE career_lessons
SET
    slug = 'career-lesson-ace-the-interview',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ace The Interview',
    excerpt_ar = '# النجاح في المقابلة الشخصية',
    data = '{}'::jsonb
WHERE id = 'career-lesson-ace-the-interview'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-ai-in-job-search',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ai In Job Search',
    excerpt_ar = '# استخدام الذكاء الاصطناعي في البحث عن وظيفة',
    data = '{}'::jsonb
WHERE id = 'career-lesson-ai-in-job-search'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-building-proof-of-work',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'The Importance of Building Proof of Work',
    excerpt_ar = 'في الماضي، كانت الشهادات الجامعية هي جواز السفر الوحيد لسوق العمل. اليوم، الشهادات لا تزال مهمة، لكن ''إثبات العمل'' أصبح العامل الحاسم للتميز في العديد...',
    data = '{}'::jsonb
WHERE id = 'career-lesson-building-proof-of-work'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-career-change-strategies',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Strategies for a Successful Career Change',
    excerpt_ar = 'التحول المهني قد يكون مخيفاً، لكنه خطوة ضرورية للعديد من المهنيين للوصول إلى الرضا الوظيفي وتحقيق أهدافهم.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-career-change-strategies'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-career-transition',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Career Transition',
    excerpt_ar = '# الانتقال السلس لمسار مهني جديد',
    data = '{}'::jsonb
WHERE id = 'career-lesson-career-transition'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-cover-letters-that-stand-out',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Writing a Standout Cover Letter',
    excerpt_ar = 'خطاب المقدمة هو فرصتك للتحدث المباشر مع صاحب العمل وشرح ''السبب'' وراء رغبتك في الانضمام إليهم، وليس فقط إعادة صياغة سيرتك الذاتية.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-cover-letters-that-stand-out'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-cv-improvement',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'CV Improvement for Better Results',
    excerpt_ar = 'السيرة الذاتية ليست مجرد سجل تاريخي لماضيك المهني، بل هي أداة تسويقية تهدف إلى إبراز قيمتك المستقبلية للشركة.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-cv-improvement'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-effective-job-search-systems',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Effective Job Search Systems',
    excerpt_ar = 'البحث عن عمل هو وظيفة بحد ذاتها، ويتطلب تنظيماً ونهجاً استراتيجياً للحصول على أفضل النتائج.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-effective-job-search-systems'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-ethical-ai-job-search',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Ethical Use of AI in Job Searching',
    excerpt_ar = 'أدوات الذكاء الاصطناعي مثل ChatGPT يمكن أن تكون مساعداً قوياً في رحلة البحث عن عمل، ولكن يجب استخدامها بحذر ومسؤولية للحفاظ على مصداقيتك.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-ethical-ai-job-search'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-interview-preparation-guide',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Comprehensive Interview Preparation Guide',
    excerpt_ar = 'التحضير الجيد هو المفتاح للتغلب على توتر المقابلات وإظهار ثقتك وكفاءتك.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-interview-preparation-guide'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-linkedin-mastery',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Linkedin Mastery',
    excerpt_ar = '# احتراف استخدام لينكد إن',
    data = '{}'::jsonb
WHERE id = 'career-lesson-linkedin-mastery'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-linkedin-profile-optimization',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Building a Professional LinkedIn Profile',
    excerpt_ar = 'لينكد إن هو واجهتك الرقمية الأولى وأهم شبكة مهنية. الملف الشخصي القوي لا يجذب فقط أصحاب العمل بل يفتح لك أبواباً لفرص وتواصل غير متوقع.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-linkedin-profile-optimization'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-mastering-star-stories',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Mastering STAR Stories',
    excerpt_ar = 'طريقة STAR هي الهيكل الأمثل للإجابة على أسئلة المقابلات السلوكية التي تبدأ عادة بـ ''حدثني عن وقت...'' أو ''أعطني مثالاً على...''.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-mastering-star-stories'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-networking-messaging',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'The Art of Networking Messaging',
    excerpt_ar = 'الوصول البارد (Cold Outreach) عبر لينكد إن أو البريد الإلكتروني يمكن أن يفتح أبواباً للفرص إذا تم بطريقة صحيحة واحترافية.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-networking-messaging'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-perfect-cv',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Perfect Cv',
    excerpt_ar = '# كتابة السيرة الذاتية المثالية',
    data = '{}'::jsonb
WHERE id = 'career-lesson-perfect-cv'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-portfolio-evidence',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Building Portfolio Evidence',
    excerpt_ar = 'في سوق العمل التنافسي اليوم، السيرة الذاتية لا تكفي وحدها. أصحاب العمل يريدون أن ''يروا'' قدراتك بدلاً من مجرد القراءة عنها.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-portfolio-evidence'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-remote-work-readiness',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Readiness and Success in Remote Work',
    excerpt_ar = 'العمل عن بعد يتطلب مجموعة مختلفة من المهارات عن العمل المكتبي التقليدي، بدءاً من الانضباط الذاتي وحتى التواصل غير المتزامن.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-remote-work-readiness'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-salary-negotiation-basics',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Basics of Confident Salary Negotiation',
    excerpt_ar = 'العديد من المهنيين يتجنبون التفاوض على الراتب خوفاً من فقدان العرض الوظيفي، لكن التفاوض هو جزء طبيعي ومتوقع من عملية التوظيف.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-salary-negotiation-basics'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-skill-gap-planning',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Skill Gap Planning',
    excerpt_ar = 'لتحقيق التطور المهني المستمر والوصول إلى أهدافك، يجب أن تكون قادراً على تحديد المهارات التي تنقصك ووضع خطة لاكتسابها.',
    data = '{}'::jsonb
WHERE id = 'career-lesson-skill-gap-planning'
AND status = 'draft';
UPDATE career_lessons
SET
    slug = 'career-lesson-star-method-guide',
    portal_id = 'career',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Star Method Guide',
    excerpt_ar = '# الدليل الشامل لطريقة STAR',
    data = '{}'::jsonb
WHERE id = 'career-lesson-star-method-guide'
AND status = 'draft';


-- Table: career_prompts
-- Expected updates: 30

UPDATE career_prompts
SET
    slug = 'career-prompt-achievements-bullet-points',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Achievements Bullet Points',
    data = '{"prompt_text": "حول هذه المهمة العادية: [وصف المهمة] إلى نقطة إنجاز قوية للسيرة الذاتية باستخدام صيغة (الفعل + المهمة + النتيجة أو التأثير) والأرقام إن أمكن.", "instructions": "ركز على التأثير الذي أحدثته بدلاً من مجرد سرد المهام اليومية.", "prompt_text_ar": "حول هذه المهمة العادية: [وصف المهمة] إلى نقطة إنجاز قوية للسيرة الذاتية باستخدام صيغة (الفعل + المهمة + النتيجة أو التأثير) والأرقام إن أمكن."}'::jsonb
WHERE id = 'career-prompt-achievements-bullet-points'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-career-growth-discussion',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Growth Discussion',
    data = '{"prompt_text": "أرغب في مناقشة فرص التطور المهني والترقية مع مديري. اقترح عليّ هيكلاً لهذه المناقشة، والنقاط التي يجب أن أركز عليها، وكيف يمكنني طلب دعم الشركة في خطتي التطويرية.", "instructions": "اجمع أدلة على إنجازاتك وقيمتك المضافة قبل هذا الاجتماع.", "prompt_text_ar": "أرغب في مناقشة فرص التطور المهني والترقية مع مديري. اقترح عليّ هيكلاً لهذه المناقشة، والنقاط التي يجب أن أركز عليها، وكيف يمكنني طلب دعم الشركة في خطتي التطويرية."}'::jsonb
WHERE id = 'career-prompt-career-growth-discussion'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-career-shift-plan-2',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Career Shift Plan',
    data = '{"prompt_text": "ضع لي خطة للانتقال من مجال [المجال الحالي] إلى مجال [المجال الجديد].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "ضع لي خطة للانتقال من مجال [المجال الحالي] إلى مجال [المجال الجديد]."}'::jsonb
WHERE id = 'career-prompt-career-shift-plan-2'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-career-shift-plan',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Shift Plan',
    data = '{"prompt_text": "أرغب في تغيير مساري المهني من [المجال الحالي] إلى [المجال المستهدف]. ساعدني في وضع خطة عمل خطوة بخطوة للتحول المهني، بما في ذلك المهارات التي يجب تعلمها، وكيفية تسويق مهاراتي القابلة للنقل.", "instructions": "حدد الموارد التعليمية وابدأ بتنفيذ الخطة تدريجياً.", "prompt_text_ar": "أرغب في تغيير مساري المهني من [المجال الحالي] إلى [المجال المستهدف]. ساعدني في وضع خطة عمل خطوة بخطوة للتحول المهني، بما في ذلك المهارات التي يجب تعلمها، وكيفية تسويق مهاراتي القابلة للنقل."}'::jsonb
WHERE id = 'career-prompt-career-shift-plan'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-cover-letter-gen',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Cover Letter Gen',
    data = '{"prompt_text": "اكتب خطاب مقدمة احترافي لوظيفة [المسمى الوظيفي] في شركة [اسم الشركة].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب خطاب مقدمة احترافي لوظيفة [المسمى الوظيفي] في شركة [اسم الشركة]."}'::jsonb
WHERE id = 'career-prompt-cover-letter-gen'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-cover-letter-generation',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Cover Letter Generation',
    data = '{"prompt_text": "بناءً على سيرتي الذاتية: [السيرة الذاتية] والوصف الوظيفي: [الوصف الوظيفي] لشركة [اسم الشركة]، اكتب خطاب مقدمة احترافي ومقنع يسلط الضوء على أبرز إنجازاتي وكيف يمكنني إضافة قيمة للشركة.", "instructions": "راجع الخطاب المنتج وعدل عليه ليحمل بصمتك الشخصية قبل إرساله.", "prompt_text_ar": "بناءً على سيرتي الذاتية: [السيرة الذاتية] والوصف الوظيفي: [الوصف الوظيفي] لشركة [اسم الشركة]، اكتب خطاب مقدمة احترافي ومقنع يسلط الضوء على أبرز إنجازاتي وكيف يمكنني إضافة قيمة للشركة."}'::jsonb
WHERE id = 'career-prompt-cover-letter-generation'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-cv-review',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Cv Review',
    data = '{"prompt_text": "قم بمراجعة سيرتي الذاتية التالية واقترح تحسينات: [نص السيرة]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "قم بمراجعة سيرتي الذاتية التالية واقترح تحسينات: [نص السيرة]"}'::jsonb
WHERE id = 'career-prompt-cv-review'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-cv-tailoring',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'CV Tailoring',
    data = '{"prompt_text": "قم بمراجعة الوصف الوظيفي التالي: [الوصف الوظيفي] والسيرة الذاتية الخاصة بي: [السيرة الذاتية]. اقترح تعديلات على سيرتي الذاتية لتتناسب بشكل أفضل مع الوصف الوظيفي، مع التركيز على إبراز المهارات والخبرات ذات الصلة.", "instructions": "استخدم هذا الموجه لتعديل سيرتك الذاتية لكل وظيفة تتقدم إليها لزيادة فرصك في تجاوز أنظمة تتبع المتقدمين.", "prompt_text_ar": "قم بمراجعة الوصف الوظيفي التالي: [الوصف الوظيفي] والسيرة الذاتية الخاصة بي: [السيرة الذاتية]. اقترح تعديلات على سيرتي الذاتية لتتناسب بشكل أفضل مع الوصف الوظيفي، مع التركيز على إبراز المهارات والخبرات ذات الصلة."}'::jsonb
WHERE id = 'career-prompt-cv-tailoring'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-elevator-pitch-creation',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Elevator Pitch Creation',
    data = '{"prompt_text": "استناداً إلى خبرتي في [مجال الخبرة] وإنجازي الأبرز وهو [الإنجاز]، قم بصياغة عرض تعريفي سريع (Elevator Pitch) يستغرق 30 ثانية أستخدمه في فعاليات التواصل المهني لتعريف الناس بما أقوم به وما أبحث عنه.", "instructions": "تدرب على إلقاء العرض بصوت عالٍ حتى يبدو طبيعياً وواثقاً.", "prompt_text_ar": "استناداً إلى خبرتي في [مجال الخبرة] وإنجازي الأبرز وهو [الإنجاز]، قم بصياغة عرض تعريفي سريع (Elevator Pitch) يستغرق 30 ثانية أستخدمه في فعاليات التواصل المهني لتعريف الناس بما أقوم به وما أبحث عنه."}'::jsonb
WHERE id = 'career-prompt-elevator-pitch-creation'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-ethical-ai-application',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Ethical AI Application',
    data = '{"prompt_text": "كيف يمكنني استخدام أدوات الذكاء الاصطناعي لتحسين سيرتي الذاتية والتحضير للمقابلات بطريقة أخلاقية وشفافة، دون المبالغة أو تقديم معلومات غير دقيقة؟", "instructions": "استخدم الذكاء الاصطناعي كأداة للمساعدة والتحسين وليس كبديل لجهدك الشخصي وصدقك.", "prompt_text_ar": "كيف يمكنني استخدام أدوات الذكاء الاصطناعي لتحسين سيرتي الذاتية والتحضير للمقابلات بطريقة أخلاقية وشفافة، دون المبالغة أو تقديم معلومات غير دقيقة؟"}'::jsonb
WHERE id = 'career-prompt-ethical-ai-application'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-follow-up-after-interview',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Follow Up After Interview',
    data = '{"prompt_text": "أجريت اليوم مقابلة لوظيفة [اسم الوظيفة] مع [اسم المقابل]. اكتب رسالة بريد إلكتروني للمتابعة أشكره فيها على وقته، وأؤكد على اهتمامي بالوظيفة، وأشير بإيجاز إلى موضوع مثير للاهتمام ناقشناه خلال المقابلة وهو [موضوع النقاش].", "instructions": "أرسل رسالة المتابعة خلال 24 ساعة من إجراء المقابلة.", "prompt_text_ar": "أجريت اليوم مقابلة لوظيفة [اسم الوظيفة] مع [اسم المقابل]. اكتب رسالة بريد إلكتروني للمتابعة أشكره فيها على وقته، وأؤكد على اهتمامي بالوظيفة، وأشير بإيجاز إلى موضوع مثير للاهتمام ناقشناه خلال المقابلة وهو [موضوع النقاش]."}'::jsonb
WHERE id = 'career-prompt-follow-up-after-interview'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-freelance-proposal',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Proposal',
    data = '{"prompt_text": "أعمل كمستقل في مجال [مجالك]. اكتب لي نموذجاً لعرض عمل (Proposal) لتقديمه لعميل محتمل لتنفيذ مشروع [وصف المشروع]. يجب أن يتضمن العرض فهمي للمشكلة، الحل المقترح، الإطار الزمني، والتكلفة التقديرية.", "instructions": "قم بتخصيص العرض لكل عميل وتوضيح القيمة التي ستقدمها لمشروعه تحديداً.", "prompt_text_ar": "أعمل كمستقل في مجال [مجالك]. اكتب لي نموذجاً لعرض عمل (Proposal) لتقديمه لعميل محتمل لتنفيذ مشروع [وصف المشروع]. يجب أن يتضمن العرض فهمي للمشكلة، الحل المقترح، الإطار الزمني، والتكلفة التقديرية."}'::jsonb
WHERE id = 'career-prompt-freelance-proposal'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-handling-rejection',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Handling Rejection',
    data = '{"prompt_text": "تلقيت رسالة رفض بعد إجراء مقابلة لوظيفة كنت مهتماً بها. اكتب رداً احترافياً أشكرهم فيه على الفرصة، وأطلب ملاحظات بناءة (Feedback) حول أدائي في المقابلة لتحسين فرصي في المستقبل.", "instructions": "طلب الملاحظات يمكن أن يكون فرصة ممتازة للتعلم والتطور، وقد يترك انطباعاً إيجابياً دائماً.", "prompt_text_ar": "تلقيت رسالة رفض بعد إجراء مقابلة لوظيفة كنت مهتماً بها. اكتب رداً احترافياً أشكرهم فيه على الفرصة، وأطلب ملاحظات بناءة (Feedback) حول أدائي في المقابلة لتحسين فرصي في المستقبل."}'::jsonb
WHERE id = 'career-prompt-handling-rejection'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-interview-prep-star',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Interview Prep Star',
    data = '{"prompt_text": "أنا أستعد لمقابلة لوظيفة [اسم الوظيفة]. يرجى تزويدي بـ 5 أسئلة سلوكية شائعة لهذه الوظيفة، واقترح كيف يمكنني الإجابة على كل منها باستخدام طريقة STAR بناءً على خبرتي في [مجال خبرتك].", "instructions": "استخدم الإجابات المقترحة كنقطة انطلاق لتدوين قصصك الواقعية.", "prompt_text_ar": "أنا أستعد لمقابلة لوظيفة [اسم الوظيفة]. يرجى تزويدي بـ 5 أسئلة سلوكية شائعة لهذه الوظيفة، واقترح كيف يمكنني الإجابة على كل منها باستخدام طريقة STAR بناءً على خبرتي في [مجال خبرتك]."}'::jsonb
WHERE id = 'career-prompt-interview-prep-star'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-interview-prep',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Interview Prep',
    data = '{"prompt_text": "اطرح علي أسئلة مقابلة شائعة لوظيفة [المسمى الوظيفي] وقيّم إجاباتي.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اطرح علي أسئلة مقابلة شائعة لوظيفة [المسمى الوظيفي] وقيّم إجاباتي."}'::jsonb
WHERE id = 'career-prompt-interview-prep'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-job-search-keywords',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Job Search Keywords',
    data = '{"prompt_text": "استخرج أهم الكلمات المفتاحية والمهارات من هذا الوصف الوظيفي: [نص الوصف الوظيفي]. قم بتصنيفها إلى مهارات تقنية، مهارات ناعمة، ومتطلبات أخرى.", "instructions": "استخدم هذه الكلمات المفتاحية في سيرتك الذاتية وملفك على لينكد إن لزيادة ظهورك.", "prompt_text_ar": "استخرج أهم الكلمات المفتاحية والمهارات من هذا الوصف الوظيفي: [نص الوصف الوظيفي]. قم بتصنيفها إلى مهارات تقنية، مهارات ناعمة، ومتطلبات أخرى."}'::jsonb
WHERE id = 'career-prompt-job-search-keywords'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-linkedin-summary-2',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Linkedin Summary',
    data = '{"prompt_text": "اكتب ملخص احترافي لملفي الشخصي على لينكد إن بناءً على خبراتي: [الخبرات]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب ملخص احترافي لملفي الشخصي على لينكد إن بناءً على خبراتي: [الخبرات]"}'::jsonb
WHERE id = 'career-prompt-linkedin-summary-2'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-linkedin-summary',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Linkedin Summary',
    data = '{"prompt_text": "اكتب ملخصاً جذاباً لحسابي على لينكد إن بناءً على المعلومات التالية عن خبراتي وأهدافي المهنية: [معلومات عن خبراتك وأهدافك]. اجعل الملخص يعكس شخصيتي المهنية ويشمل الكلمات المفتاحية لمجال [مجال عملك].", "instructions": "تأكد من أن الملخص يبرز ما يجعلك فريداً في مجالك.", "prompt_text_ar": "اكتب ملخصاً جذاباً لحسابي على لينكد إن بناءً على المعلومات التالية عن خبراتي وأهدافي المهنية: [معلومات عن خبراتك وأهدافك]. اجعل الملخص يعكس شخصيتي المهنية ويشمل الكلمات المفتاحية لمجال [مجال عملك]."}'::jsonb
WHERE id = 'career-prompt-linkedin-summary'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-mock-interview-simulation',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Mock Interview Simulation',
    data = '{"prompt_text": "أريدك أن تلعب دور مسؤول توظيف يجري مقابلة معي لوظيفة [اسم الوظيفة]. اطرح عليّ سؤالاً تلو الآخر، وانتظر إجابتي، ثم قدم لي تقييماً بناءً وكيف يمكنني تحسين إجابتي.", "instructions": "تفاعل مع النموذج وكأنك في مقابلة حقيقية لتعظيم الفائدة.", "prompt_text_ar": "أريدك أن تلعب دور مسؤول توظيف يجري مقابلة معي لوظيفة [اسم الوظيفة]. اطرح عليّ سؤالاً تلو الآخر، وانتظر إجابتي، ثم قدم لي تقييماً بناءً وكيف يمكنني تحسين إجابتي."}'::jsonb
WHERE id = 'career-prompt-mock-interview-simulation'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-networking-message',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Networking Message',
    data = '{"prompt_text": "أريد التواصل مع [اسم الشخص أو المسمى الوظيفي] الذي يعمل في شركة [اسم الشركة] على لينكد إن. اكتب رسالة قصيرة ومهذبة لطلب التواصل وربما طلب مقابلة استكشافية قصيرة لمعرفة المزيد عن مساره المهني.", "instructions": "قم بتخصيص الرسالة وذكر سبب اهتمامك بالتواصل مع هذا الشخص تحديداً.", "prompt_text_ar": "أريد التواصل مع [اسم الشخص أو المسمى الوظيفي] الذي يعمل في شركة [اسم الشركة] على لينكد إن. اكتب رسالة قصيرة ومهذبة لطلب التواصل وربما طلب مقابلة استكشافية قصيرة لمعرفة المزيد عن مساره المهني."}'::jsonb
WHERE id = 'career-prompt-networking-message'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-networking-msg',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Networking Msg',
    data = '{"prompt_text": "اكتب رسالة تواصل احترافية لإرسالها لشخص يعمل في شركة أحلم بالعمل بها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب رسالة تواصل احترافية لإرسالها لشخص يعمل في شركة أحلم بالعمل بها."}'::jsonb
WHERE id = 'career-prompt-networking-msg'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-portfolio-ideas-2',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Portfolio Ideas',
    data = '{"prompt_text": "اقترح علي أفكار مشاريع أضيفها لمعرض أعمالي في مجال [مجال العمل].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اقترح علي أفكار مشاريع أضيفها لمعرض أعمالي في مجال [مجال العمل]."}'::jsonb
WHERE id = 'career-prompt-portfolio-ideas-2'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-portfolio-ideas',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Portfolio Ideas',
    data = '{"prompt_text": "أعمل في مجال [مجالك] وأرغب في بناء معرض أعمال (بورتفوليو) قوي. اقترح 3 أفكار لمشاريع عملية يمكنني تنفيذها وإضافتها لمعرض أعمالي لإثبات مهاراتي في [مهارة معينة].", "instructions": "اختر المشاريع التي تظهر شغفك وقدرتك على حل المشاكل الواقعية.", "prompt_text_ar": "أعمل في مجال [مجالك] وأرغب في بناء معرض أعمال (بورتفوليو) قوي. اقترح 3 أفكار لمشاريع عملية يمكنني تنفيذها وإضافتها لمعرض أعمالي لإثبات مهاراتي في [مهارة معينة]."}'::jsonb
WHERE id = 'career-prompt-portfolio-ideas'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-remote-work-readiness',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Remote Work Readiness',
    data = '{"prompt_text": "أرغب في التقدم لوظيفة عن بعد بالكامل. ما هي أهم المهارات والأدوات التي يجب أن أتقنها، وكيف يمكنني إثبات قدرتي على العمل باستقلالية وإدارة وقتي بفعالية في سيرتي الذاتية؟", "instructions": "احرص على تضمين أمثلة لخبرات سابقة في العمل أو التعلم عن بعد إن وجدت.", "prompt_text_ar": "أرغب في التقدم لوظيفة عن بعد بالكامل. ما هي أهم المهارات والأدوات التي يجب أن أتقنها، وكيف يمكنني إثبات قدرتي على العمل باستقلالية وإدارة وقتي بفعالية في سيرتي الذاتية؟"}'::jsonb
WHERE id = 'career-prompt-remote-work-readiness'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-resignation-letter',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Resignation Letter',
    data = '{"prompt_text": "أحتاج إلى كتابة خطاب استقالة رسمي لمديري في شركة [اسم الشركة] بمناسبة انتقالي لفرصة جديدة. سأغادر في تاريخ [تاريخ المغادرة]. اجعل الخطاب احترافياً، وإيجابياً، واعرض فيه المساعدة خلال فترة الانتقال.", "instructions": "احرص على ترك انطباع جيد والحفاظ على العلاقات المهنية حتى عند المغادرة.", "prompt_text_ar": "أحتاج إلى كتابة خطاب استقالة رسمي لمديري في شركة [اسم الشركة] بمناسبة انتقالي لفرصة جديدة. سأغادر في تاريخ [تاريخ المغادرة]. اجعل الخطاب احترافياً، وإيجابياً، واعرض فيه المساعدة خلال فترة الانتقال."}'::jsonb
WHERE id = 'career-prompt-resignation-letter'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-salary-negotiation-script',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Salary Negotiation Script',
    data = '{"prompt_text": "تلقيت عرض عمل بوظيفة [اسم الوظيفة] براتب [الراتب المعروض]، لكنني أطمح للوصول إلى [الراتب المستهدف]. اكتب لي سيناريو احترافي للتفاوض على الراتب عبر البريد الإلكتروني أو الهاتف يبرز قيمتي وما يمكنني تقديمه للشركة.", "instructions": "تأكد من إجراء بحث حول متوسط الرواتب في السوق قبل التفاوض.", "prompt_text_ar": "تلقيت عرض عمل بوظيفة [اسم الوظيفة] براتب [الراتب المعروض]، لكنني أطمح للوصول إلى [الراتب المستهدف]. اكتب لي سيناريو احترافي للتفاوض على الراتب عبر البريد الإلكتروني أو الهاتف يبرز قيمتي وما يمكنني تقديمه للشركة."}'::jsonb
WHERE id = 'career-prompt-salary-negotiation-script'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-salary-negotiation',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Salary Negotiation',
    data = '{"prompt_text": "كيف أفاوض على راتب أعلى لوظيفة [المسمى الوظيفي]؟ أعطني سيناريو وحوار مقترح.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "كيف أفاوض على راتب أعلى لوظيفة [المسمى الوظيفي]؟ أعطني سيناريو وحوار مقترح."}'::jsonb
WHERE id = 'career-prompt-salary-negotiation'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-skill-gap-analysis',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Skill Gap Analysis',
    data = '{"prompt_text": "هدفي المهني هو الوصول إلى منصب [المنصب المستهدف]. حالياً أمتلك المهارات التالية: [المهارات الحالية]. قم بتحليل الفجوة في المهارات واقترح خطة واضحة والمهارات التي يجب أن أتعلمها لتحقيق هدفي.", "instructions": "استخدم هذا الموجه لبناء خطة تطوير شخصية واقعية.", "prompt_text_ar": "هدفي المهني هو الوصول إلى منصب [المنصب المستهدف]. حالياً أمتلك المهارات التالية: [المهارات الحالية]. قم بتحليل الفجوة في المهارات واقترح خطة واضحة والمهارات التي يجب أن أتعلمها لتحقيق هدفي."}'::jsonb
WHERE id = 'career-prompt-skill-gap-analysis'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-skills-gap',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Skills Gap',
    data = '{"prompt_text": "قارن بين مهاراتي الحالية ومتطلبات وظيفة [المسمى الوظيفي] وحدد المهارات التي أحتاج تطويرها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "قارن بين مهاراتي الحالية ومتطلبات وظيفة [المسمى الوظيفي] وحدد المهارات التي أحتاج تطويرها."}'::jsonb
WHERE id = 'career-prompt-skills-gap'
AND status = 'draft';
UPDATE career_prompts
SET
    slug = 'career-prompt-star-answer',
    portal_id = 'career',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Star Answer',
    data = '{"prompt_text": "ساعدني في صياغة إجابة بطريقة STAR لموقف واجهت فيه تحدياً في العمل.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "ساعدني في صياغة إجابة بطريقة STAR لموقف واجهت فيه تحدياً في العمل."}'::jsonb
WHERE id = 'career-prompt-star-answer'
AND status = 'draft';


-- Table: career_resources
-- Expected updates: 30

UPDATE career_resources
SET
    slug = 'career-resource-behance',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Behance',
    data = '{"url": "https://www.behance.net", "description": "منصة رائدة للمصممين والمبدعين لعرض أعمالهم (Portfolio) واكتشاف الفرص المهنية."}'::jsonb
WHERE id = 'career-resource-behance'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-career-advice',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Career Advice',
    data = '{"url": "", "description": "مدونة تقدم مقالات ونصائح قيمة لتطوير مسارك المهني."}'::jsonb
WHERE id = 'career-resource-career-advice'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-coursera',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Coursera',
    data = '{"url": "https://www.coursera.org", "description": "منصة تعليمية توفر برامج وشهادات من جامعات وشركات عالمية رائدة لتطوير المهارات."}'::jsonb
WHERE id = 'career-resource-coursera'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-cover-letter-examples',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Cover Letter Examples',
    data = '{"url": "", "description": "مجموعة من خطابات المقدمة الناجحة لمختلف المجالات."}'::jsonb
WHERE id = 'career-resource-cover-letter-examples'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-cv-templates',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Cv Templates',
    data = '{"url": "", "description": "موقع يقدم قوالب سيرة ذاتية احترافية ومجانية."}'::jsonb
WHERE id = 'career-resource-cv-templates'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-edx',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Edx',
    data = '{"url": "https://www.edx.org", "description": "منصة تعليمية توفر دورات مجانية ومدفوعة من أفضل الجامعات والمؤسسات حول العالم."}'::jsonb
WHERE id = 'career-resource-edx'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-github',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Github',
    data = '{"url": "https://github.com", "description": "منصة أساسية للمبرمجين لبناء معرض أعمالهم ومشاركة الكود والمساهمة في مشاريع مفتوحة المصدر."}'::jsonb
WHERE id = 'career-resource-github'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-glassdoor',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Glassdoor',
    data = '{"url": "https://www.glassdoor.com", "description": "موقع للبحث عن الوظائف ومراجعات الشركات ومقارنة الرواتب والتحضير للمقابلات."}'::jsonb
WHERE id = 'career-resource-glassdoor'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-harvard-career-services',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Harvard Services',
    data = '{"url": "https://careerservices.fas.harvard.edu", "description": "مكتبة غنية بالأدلة والنماذج المجانية لكتابة السير الذاتية وخطابات المقدمة والتحضير للمقابلات."}'::jsonb
WHERE id = 'career-resource-harvard-career-services'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-hunter-io',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Hunter Io',
    data = '{"url": "https://hunter.io", "description": "أداة مفيدة للعثور على عناوين البريد الإلكتروني للمحترفين ومسؤولي التوظيف للتواصل المباشر."}'::jsonb
WHERE id = 'career-resource-hunter-io'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-indeed',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Indeed',
    data = '{"url": "https://www.indeed.com", "description": "واحد من أكبر محركات البحث عن الوظائف في العالم، يوفر أيضاً معلومات حول الرواتب وتقييمات الشركات."}'::jsonb
WHERE id = 'career-resource-indeed'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-interview-query',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Interview Query',
    data = '{"url": "https://www.interviewquery.com", "description": "منصة متخصصة للتحضير لمقابلات علوم البيانات والهندسة وتوفر أسئلة حقيقية من مقابلات شركات كبرى."}'::jsonb
WHERE id = 'career-resource-interview-query'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-interview-questions',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Interview Questions',
    data = '{"url": "", "description": "بنك لأسئلة المقابلات الشخصية مع إجابات نموذجية."}'::jsonb
WHERE id = 'career-resource-interview-questions'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-job-boards',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Job Boards',
    data = '{"url": "", "description": "أهم المنصات للبحث عن وظائف في العالم العربي."}'::jsonb
WHERE id = 'career-resource-job-boards'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-jobscan',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Jobscan',
    data = '{"url": "https://www.jobscan.co", "description": "أداة لمقارنة سيرتك الذاتية مع الوصف الوظيفي وتحديد الكلمات المفتاحية المفقودة لتحسين فرصك."}'::jsonb
WHERE id = 'career-resource-jobscan'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-linkedin-guide',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Linkedin Guide',
    data = '{"url": "", "description": "دليل شامل لتحسين ملفك الشخصي على لينكد إن."}'::jsonb
WHERE id = 'career-resource-linkedin-guide'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-linkedin-learning',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Linkedin Learning',
    data = '{"url": "https://www.linkedin.com/learning", "description": "منصة تقدم آلاف الدورات التدريبية في مجالات الأعمال والتكنولوجيا والمهارات الإبداعية والناعمة."}'::jsonb
WHERE id = 'career-resource-linkedin-learning'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-meetup',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Meetup',
    data = '{"url": "https://www.meetup.com", "description": "منصة للعثور على مجموعات مهنية وتقنية وبناء شبكة علاقات (Networking) في منطقتك."}'::jsonb
WHERE id = 'career-resource-meetup'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-my-interview-practice',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'My Interview Practice',
    data = '{"url": "https://myinterviewpractice.com", "description": "أداة لمحاكاة مقابلات العمل وتسجيل إجاباتك لمراجعتها وتحسين أدائك."}'::jsonb
WHERE id = 'career-resource-my-interview-practice'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-novoresume',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Novoresume',
    data = '{"url": "https://novoresume.com", "description": "أداة لإنشاء سير ذاتية احترافية تتوافق مع أنظمة تتبع المتقدمين (ATS) بخطوات بسيطة."}'::jsonb
WHERE id = 'career-resource-novoresume'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-payscale',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Payscale',
    data = '{"url": "https://www.payscale.com", "description": "موقع رائد لتقديم بيانات دقيقة حول الرواتب والتعويضات بناءً على المسمى الوظيفي والموقع والخبرة."}'::jsonb
WHERE id = 'career-resource-payscale'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-portfolio-builder',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Portfolio Builder',
    data = '{"url": "", "description": "أداة لبناء معرض أعمال رقمي بسهولة."}'::jsonb
WHERE id = 'career-resource-portfolio-builder'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-pramp',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Pramp',
    data = '{"url": "https://www.pramp.com", "description": "منصة مجانية لإجراء مقابلات تجريبية (Mock Interviews) مع زملاء في مجالات البرمجة والتصميم وإدارة المنتجات."}'::jsonb
WHERE id = 'career-resource-pramp'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-remote-jobs',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Remote Jobs',
    data = '{"url": "", "description": "منصة متخصصة في الوظائف التي تتيح العمل عن بعد."}'::jsonb
WHERE id = 'career-resource-remote-jobs'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-remote-ok',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Remote Ok',
    data = '{"url": "https://remoteok.com", "description": "موقع متخصص في عرض الوظائف التي يمكن أداؤها عن بعد بالكامل للمحترفين الرقميين."}'::jsonb
WHERE id = 'career-resource-remote-ok'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-salary-calculator',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Salary Calculator',
    data = '{"url": "", "description": "أداة لمعرفة متوسط الرواتب في مجالك."}'::jsonb
WHERE id = 'career-resource-salary-calculator'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-skills-courses',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Skills Courses',
    data = '{"url": "", "description": "منصة تعليمية تقدم دورات لتطوير المهارات المطلوبة في سوق العمل."}'::jsonb
WHERE id = 'career-resource-skills-courses'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-the-muse',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'The Muse',
    data = '{"url": "https://www.themuse.com", "description": "موقع يقدم نصائح مهنية ممتازة، وأدلة للبحث عن عمل، ونظرة من الداخل لثقافة الشركات."}'::jsonb
WHERE id = 'career-resource-the-muse'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-upwork',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Upwork',
    data = '{"url": "https://www.upwork.com", "description": "منصة عالمية للعمل الحر (Freelance) تربط الشركات بالمستقلين في مختلف المجالات."}'::jsonb
WHERE id = 'career-resource-upwork'
AND status = 'draft';
UPDATE career_resources
SET
    slug = 'career-resource-zety',
    portal_id = 'career',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Zety',
    data = '{"url": "https://zety.com", "description": "منصة شهيرة لبناء السير الذاتية وخطابات المقدمة مع تقديم نصائح وأمثلة عملية."}'::jsonb
WHERE id = 'career-resource-zety'
AND status = 'draft';


-- Table: digital_exams_glossary
-- Expected updates: 50

UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-adaptive-generation',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Adaptive Generation',
    data = '{"definition": "استخدام أدوات الذكاء الاصطناعي لتوليد أسئلة تتكيف مع مستوى الطالب وتركز على نقاط ضعفه.", "example": "الطلب من المعلم الذكي توليد 5 أسئلة صعبة في موضوع الكسور بعد اجتياز الأسئلة السهلة.", "definition_ar": "استخدام أدوات الذكاء الاصطناعي لتوليد أسئلة تتكيف مع مستوى الطالب وتركز على نقاط ضعفه."}'::jsonb
WHERE id = 'digital-exams-glossary-adaptive-generation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-certainty-assessment',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Certainty Assessment',
    data = '{"definition": "تحديد مستوى التأكد من الإجابة أثناء الحل لتسهيل قرار المراجعة لاحقاً.", "example": "وضع علامة نجمة بجوار الأسئلة التي تعتمد فيها على التخمين لتعود لها إن تبقى وقت.", "definition_ar": "تحديد مستوى التأكد من الإجابة أثناء الحل لتسهيل قرار المراجعة لاحقاً."}'::jsonb
WHERE id = 'digital-exams-glossary-certainty-assessment'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-cognitive-reframing',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Cognitive Reframing',
    data = '{"definition": "تغيير النظرة السلبية للاختبار أو السؤال إلى تحدٍ إيجابي يمكن تجاوزه.", "example": "بدلاً من التفكير ''لن أستطيع حل هذا''، التفكير في ''سأستخدم استراتيجية الاستبعاد لأصل لأفضل خيار''.", "definition_ar": "تغيير النظرة السلبية للاختبار أو السؤال إلى تحدٍ إيجابي يمكن تجاوزه."}'::jsonb
WHERE id = 'digital-exams-glossary-cognitive-reframing'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-confidence-calibration',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Confidence Calibration',
    data = '{"definition": "القدرة على التقييم الدقيق لمدى صحة الإجابة التي تم اختيارها، وتجنب الثقة المفرطة أو الشك الزائد.", "example": "إعطاء نسبة مئوية لثقتك في الإجابة، ومراجعة الأسئلة التي تقل نسبة ثقتك فيها عن 70%.", "definition_ar": "القدرة على التقييم الدقيق لمدى صحة الإجابة التي تم اختيارها، وتجنب الثقة المفرطة أو الشك الزائد."}'::jsonb
WHERE id = 'digital-exams-glossary-confidence-calibration'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-deep-breathing',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Deep Breathing',
    data = '{"definition": "تقنية استرخاء للسيطرة على التوتر أثناء الاختبار من خلال تنظيم الشهيق والزفير.", "example": "أخذ شهيق لمدة 4 ثوان، حبسه لثانيتين، ثم زفير لمدة 6 ثوان عند الشعور بالتوتر أثناء سؤال صعب.", "definition_ar": "تقنية استرخاء للسيطرة على التوتر أثناء الاختبار من خلال تنظيم الشهيق والزفير."}'::jsonb
WHERE id = 'digital-exams-glossary-deep-breathing'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-distractors',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Distractors',
    data = '{"definition": "خيارات إجابة مصممة لتكون جذابة أو تبدو صحيحة للإيقاع بالطالب الذي لم يفهم المفهوم بشكل كامل.", "example": "خيار يحتوي على رقم صحيح لكن بوحدة قياس خاطئة.", "definition_ar": "خيارات إجابة مصممة لتكون جذابة أو تبدو صحيحة للإيقاع بالطالب الذي لم يفهم المفهوم بشكل كامل."}'::jsonb
WHERE id = 'digital-exams-glossary-distractors'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-double-checking',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Double Checking',
    data = '{"definition": "التحقق من الإجابة مرة أخرى بطريقة مختلفة للتأكد من عدم وجود أخطاء حسابية أو منطقية.", "example": "حل المعادلة الرياضية ثم التعويض بالناتج في المعادلة الأصلية للتأكد من صحتها.", "definition_ar": "التحقق من الإجابة مرة أخرى بطريقة مختلفة للتأكد من عدم وجود أخطاء حسابية أو منطقية."}'::jsonb
WHERE id = 'digital-exams-glossary-double-checking'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-educated-guess',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Educated Guess',
    data = '{"definition": "استنتاج الإجابة الأقرب للصحة بناءً على المعرفة السابقة أو السياق بدلاً من الاختيار العشوائي.", "example": "استخدام الجذور اللغوية للكلمات في الخيارات لتخمين المعنى الأقرب للسياق.", "definition_ar": "استنتاج الإجابة الأقرب للصحة بناءً على المعرفة السابقة أو السياق بدلاً من الاختيار العشوائي."}'::jsonb
WHERE id = 'digital-exams-glossary-educated-guess'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-elimination-strategy',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Elimination Strategy',
    data = '{"definition": "تقنية لحل أسئلة الاختيار من متعدد تعتمد على حذف الخيارات الخاطئة بشكل مؤكد لزيادة احتمالية اختيار الإجابة الصحيحة.", "example": "عندما تواجه سؤالاً لا تعرف إجابته المباشرة، ابدأ باستبعاد الخيارين اللذين يبدوان غير منطقيين.", "definition_ar": "تقنية لحل أسئلة الاختيار من متعدد تعتمد على حذف الخيارات الخاطئة بشكل مؤكد لزيادة احتمالية اختيار الإجابة الصحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-elimination-strategy'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-environmental-readiness',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Environmental Readiness',
    data = '{"definition": "إعداد بيئة هادئة ومناسبة لتقديم الاختبار وتجنب المشتتات المادية.", "example": "إغلاق باب الغرفة وإبعاد الهاتف المحمول والتأكد من إضاءة المكان قبل بدء المراقبة الإلكترونية.", "definition_ar": "إعداد بيئة هادئة ومناسبة لتقديم الاختبار وتجنب المشتتات المادية."}'::jsonb
WHERE id = 'digital-exams-glossary-environmental-readiness'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-exam-simulation',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Exam Simulation',
    data = '{"definition": "تطبيق نفس الظروف النفسية والجسدية والزمنية للاختبار الفعلي أثناء التدريب.", "example": "الجلوس على مكتب مشابه لمكتب الاختبار وارتداء ملابس مريحة والالتزام بفترات الراحة الرسمية.", "definition_ar": "تطبيق نفس الظروف النفسية والجسدية والزمنية للاختبار الفعلي أثناء التدريب."}'::jsonb
WHERE id = 'digital-exams-glossary-exam-simulation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-gap-analysis',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Gap Analysis',
    data = '{"definition": "تحديد المواضيع الدقيقة التي سببت فقدان الدرجات للتركيز عليها في المراجعة القادمة.", "example": "اكتشاف أن 80% من الأخطاء تركزت في موضوع الاحتمالات.", "definition_ar": "تحديد المواضيع الدقيقة التي سببت فقدان الدرجات للتركيز عليها في المراجعة القادمة."}'::jsonb
WHERE id = 'digital-exams-glossary-gap-analysis'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-instant-feedback',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Instant Feedback',
    data = '{"definition": "الحصول على تصحيح وشرح للإجابات مباشرة بعد الحل لفهم الأخطاء في وقتها.", "example": "قراءة شرح الذكاء الاصطناعي لسبب كون الخيار المختار خاطئاً وتصحيح المفهوم فوراً.", "definition_ar": "الحصول على تصحيح وشرح للإجابات مباشرة بعد الحل لفهم الأخطاء في وقتها."}'::jsonb
WHERE id = 'digital-exams-glossary-instant-feedback'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-interleaving',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Interleaving',
    data = '{"definition": "استراتيجية تعليمية تتضمن دمج مواضيع أو أنواع مختلفة من المسائل في جلسة دراسية واحدة لتحسين التمييز بينها.", "example": "بدل حل 50 مسألة على نفس القاعدة، يتم حل مسائل تتطلب اختيار القاعدة المناسبة من بين عدة قواعد.", "definition_ar": "استراتيجية تعليمية تتضمن دمج مواضيع أو أنواع مختلفة من المسائل في جلسة دراسية واحدة لتحسين التمييز بينها."}'::jsonb
WHERE id = 'digital-exams-glossary-interleaving'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-01',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 01',
    data = '{"definition": "توزيع الوقت المتاح على أسئلة الاختبار بشكل استراتيجي.", "example": "مثال: تخصيص دقيقة واحدة لكل سؤال اختيار من متعدد.", "definition_ar": "توزيع الوقت المتاح على أسئلة الاختبار بشكل استراتيجي."}'::jsonb
WHERE id = 'digital-exams-glossary-item-01'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-02',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 02',
    data = '{"definition": "تقنية تعتمد على استبعاد الإجابات الخاطئة بوضوح لزيادة فرصة اختيار الإجابة الصحيحة.", "example": "مثال: استبعاد خيارين من أصل أربعة يرفع نسبة النجاح إلى 50%.", "definition_ar": "تقنية تعتمد على استبعاد الإجابات الخاطئة بوضوح لزيادة فرصة اختيار الإجابة الصحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-02'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-03',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 03',
    data = '{"definition": "إلقاء نظرة سريعة على جميع الأسئلة قبل البدء في الحل لمعرفة مستوى الصعوبة.", "example": "مثال: تصفح الاختبار لمدة 5 دقائق قبل البدء بالحل.", "definition_ar": "إلقاء نظرة سريعة على جميع الأسئلة قبل البدء في الحل لمعرفة مستوى الصعوبة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-03'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-04',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 04',
    data = '{"definition": "حالة نفسية تصيب الطالب قبل أو أثناء الاختبار وتؤثر على تركيزه.", "example": "مثال: الشعور بتسارع نبضات القلب عند قراءة سؤال صعب.", "definition_ar": "حالة نفسية تصيب الطالب قبل أو أثناء الاختبار وتؤثر على تركيزه."}'::jsonb
WHERE id = 'digital-exams-glossary-item-04'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-05',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 05',
    data = '{"definition": "الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة.", "example": "مثال: الانتباه لكلمات مثل (ليس، دائماً، باستثناء).", "definition_ar": "الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-05'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-06',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 06',
    data = '{"definition": "نموذج مشابه للاختبار الحقيقي يستخدم للتدريب وقياس المستوى.", "example": "مثال: حل اختبار تجريبي لشهادة PMP قبل الاختبار الفعلي.", "definition_ar": "نموذج مشابه للاختبار الحقيقي يستخدم للتدريب وقياس المستوى."}'::jsonb
WHERE id = 'digital-exams-glossary-item-06'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-07',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 07',
    data = '{"definition": "اختيار إجابة بناءً على المنطق والمعلومات السابقة عند عدم التأكد من الإجابة الصحيحة.", "example": "مثال: اختيار إجابة تبدو منطقية أكثر من غيرها بعد استبعاد المشتتات.", "definition_ar": "اختيار إجابة بناءً على المنطق والمعلومات السابقة عند عدم التأكد من الإجابة الصحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-07'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-08',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 08',
    data = '{"definition": "تهيئة بيئة مشابهة لبيئة الاختبار الحقيقي أثناء التدريب.", "example": "مثال: الجلوس في غرفة هادئة وحل الاختبار بدون مقاطعة.", "definition_ar": "تهيئة بيئة مشابهة لبيئة الاختبار الحقيقي أثناء التدريب."}'::jsonb
WHERE id = 'digital-exams-glossary-item-08'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-09',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 09',
    data = '{"definition": "معرفة الأخطاء بعد الاختبار التجريبي وتصحيحها.", "example": "مثال: مراجعة الأسئلة الخاطئة ومعرفة سبب الخطأ.", "definition_ar": "معرفة الأخطاء بعد الاختبار التجريبي وتصحيحها."}'::jsonb
WHERE id = 'digital-exams-glossary-item-09'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-10',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 10',
    data = '{"definition": "أسئلة تتطلب كتابة إجابة مفصلة وتعتمد على الفهم والتعبير.", "example": "مثال: اشرح أسباب الحرب العالمية الأولى.", "definition_ar": "أسئلة تتطلب كتابة إجابة مفصلة وتعتمد على الفهم والتعبير."}'::jsonb
WHERE id = 'digital-exams-glossary-item-10'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-11',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 11',
    data = '{"definition": "سؤال يتطلب اختيار الإجابة الصحيحة من بين عدة خيارات.", "example": "مثال: ما هي عاصمة فرنسا؟ أ) لندن ب) باريس ج) روما.", "definition_ar": "سؤال يتطلب اختيار الإجابة الصحيحة من بين عدة خيارات."}'::jsonb
WHERE id = 'digital-exams-glossary-item-11'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-12',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 12',
    data = '{"definition": "سؤال يتطلب تحديد ما إذا كانت العبارة صحيحة أم خاطئة.", "example": "مثال: الأرض مسطحة. (خطأ).", "definition_ar": "سؤال يتطلب تحديد ما إذا كانت العبارة صحيحة أم خاطئة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-12'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-13',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 13',
    data = '{"definition": "ترك السؤال الصعب والعودة إليه لاحقاً لتوفير الوقت.", "example": "مثال: إذا استغرق السؤال أكثر من دقيقتين، تخطاه وعد إليه في النهاية.", "definition_ar": "ترك السؤال الصعب والعودة إليه لاحقاً لتوفير الوقت."}'::jsonb
WHERE id = 'digital-exams-glossary-item-13'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-14',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 14',
    data = '{"definition": "تقنية استرخاء تساعد في تقليل التوتر أثناء الاختبار.", "example": "مثال: أخذ نفس عميق والعد إلى خمسة قبل الإجابة على سؤال صعب.", "definition_ar": "تقنية استرخاء تساعد في تقليل التوتر أثناء الاختبار."}'::jsonb
WHERE id = 'digital-exams-glossary-item-14'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-15',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 15',
    data = '{"definition": "المذاكرة والتحضير الجيد قبل الاختبار بفترة كافية.", "example": "مثال: وضع جدول زمني للمذاكرة قبل الاختبار بشهر.", "definition_ar": "المذاكرة والتحضير الجيد قبل الاختبار بفترة كافية."}'::jsonb
WHERE id = 'digital-exams-glossary-item-15'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-16',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 16',
    data = '{"definition": "تعبئة الدائرة المخصصة للإجابة الصحيحة في ورقة الإجابة بشكل كامل.", "example": "مثال: استخدام قلم رصاص من نوع HB لتظليل الدائرة.", "definition_ar": "تعبئة الدائرة المخصصة للإجابة الصحيحة في ورقة الإجابة بشكل كامل."}'::jsonb
WHERE id = 'digital-exams-glossary-item-16'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-17',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 17',
    data = '{"definition": "التأكد من صحة الإجابات قبل تسليم ورقة الاختبار.", "example": "مثال: تخصيص آخر 10 دقائق من وقت الاختبار لمراجعة الإجابات.", "definition_ar": "التأكد من صحة الإجابات قبل تسليم ورقة الاختبار."}'::jsonb
WHERE id = 'digital-exams-glossary-item-17'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-18',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 18',
    data = '{"definition": "الخيارات الخاطئة في أسئلة الاختيار من متعدد والتي تبدو صحيحة.", "example": "مثال: وضع إجابة قريبة جداً من الإجابة الصحيحة لتشتيت الطالب.", "definition_ar": "الخيارات الخاطئة في أسئلة الاختيار من متعدد والتي تبدو صحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-item-18'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-19',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 19',
    data = '{"definition": "أسئلة تتكون من عدة أجزاء وتتطلب فهماً عميقاً للموضوع.", "example": "مثال: اقرأ النص التالي ثم أجب عن الأسئلة الخمسة المتعلقة به.", "definition_ar": "أسئلة تتكون من عدة أجزاء وتتطلب فهماً عميقاً للموضوع."}'::jsonb
WHERE id = 'digital-exams-glossary-item-19'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-item-20',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Item 20',
    data = '{"definition": "توجيه الانتباه بالكامل نحو الاختبار وتجاهل المشتتات الخارجية.", "example": "مثال: عدم الالتفات للأصوات في قاعة الاختبار.", "definition_ar": "توجيه الانتباه بالكامل نحو الاختبار وتجاهل المشتتات الخارجية."}'::jsonb
WHERE id = 'digital-exams-glossary-item-20'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-keywords',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Keywords',
    data = '{"definition": "المصطلحات أو الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة وتوجه نحو الإجابة الصحيحة.", "example": "التركيز على كلمة ''أقصى'' أو ''أدنى'' في مسائل القيم العظمى والصغرى.", "definition_ar": "المصطلحات أو الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة وتوجه نحو الإجابة الصحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-keywords'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-last-days-plan',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Last Days Plan',
    data = '{"definition": "جدول مراجعة مكثف للأيام التي تسبق الاختبار يركز على الملخصات وسجل الأخطاء فقط.", "example": "الامتناع عن دراسة مواضيع جديدة قبل الاختبار بيومين والتركيز على مراجعة القوانين الأساسية.", "definition_ar": "جدول مراجعة مكثف للأيام التي تسبق الاختبار يركز على الملخصات وسجل الأخطاء فقط."}'::jsonb
WHERE id = 'digital-exams-glossary-last-days-plan'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-learning-from-slips',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Learning From Slips',
    data = '{"definition": "تحويل الأخطاء غير المقصودة إلى دروس من خلال وضع استراتيجيات لتجنب تكرارها.", "example": "اعتياد وضع دائرة حول الكلمات المفتاحية لتجنب زلة تخطيها.", "definition_ar": "تحويل الأخطاء غير المقصودة إلى دروس من خلال وضع استراتيجيات لتجنب تكرارها."}'::jsonb
WHERE id = 'digital-exams-glossary-learning-from-slips'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-mistake-log',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mistake Log',
    data = '{"definition": "دفتر أو ملف لتدوين الأخطاء التي تم ارتكابها في الاختبارات التجريبية مع تحليل سبب الخطأ والإجابة الصحيحة.", "example": "كتابة السؤال الذي أخطأت فيه، وتوضيح أن السبب كان ''عدم قراءة أداة النفي''.", "definition_ar": "دفتر أو ملف لتدوين الأخطاء التي تم ارتكابها في الاختبارات التجريبية مع تحليل سبب الخطأ والإجابة الصحيحة."}'::jsonb
WHERE id = 'digital-exams-glossary-mistake-log'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-mock-exams',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mock',
    data = '{"definition": "نماذج امتحانية كاملة يتم حلها في ظروف مشابهة للاختبار الحقيقي لرفع الجاهزية.", "example": "أداء اختبار تجريبي كامل يوم الجمعة مع ضبط مؤقت زمني وعدم استخدام أي مصادر مساعدة.", "definition_ar": "نماذج امتحانية كاملة يتم حلها في ظروف مشابهة للاختبار الحقيقي لرفع الجاهزية."}'::jsonb
WHERE id = 'digital-exams-glossary-mock-exams'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-negative-tools',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Negative Tools',
    data = '{"definition": "الكلمات التي تعكس معنى السؤال ويغفل عنها الطلاب غالباً وتؤدي لإجابات خاطئة.", "example": "الانتباه لكلمات مثل: ''ليس''، ''ما عدا''، ''باستثناء'' التي تغير المطلوب تماماً.", "definition_ar": "الكلمات التي تعكس معنى السؤال ويغفل عنها الطلاب غالباً وتؤدي لإجابات خاطئة."}'::jsonb
WHERE id = 'digital-exams-glossary-negative-tools'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-performance-dashboard',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Performance Dashboard',
    data = '{"definition": "واجهة مرئية تعرض بيانات تقدم الطالب، الدرجات، ونقاط القوة والضعف لتوجيه مسار التعلم.", "example": "متابعة الرسم البياني الذي يوضح تحسن سرعة الحل في الأسئلة اللفظية عبر الأسابيع.", "definition_ar": "واجهة مرئية تعرض بيانات تقدم الطالب، الدرجات، ونقاط القوة والضعف لتوجيه مسار التعلم."}'::jsonb
WHERE id = 'digital-exams-glossary-performance-dashboard'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-post-exam-eval',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Post Exam Eval',
    data = '{"definition": "مراجعة الأداء فور انتهاء الاختبار لتحديد نقاط القوة والضعف في استراتيجية الحل.", "example": "تحليل ما إذا كان الوقت المخصص للقسم الكمي كافياً أم يحتاج لتعديل.", "definition_ar": "مراجعة الأداء فور انتهاء الاختبار لتحديد نقاط القوة والضعف في استراتيجية الحل."}'::jsonb
WHERE id = 'digital-exams-glossary-post-exam-eval'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-progress-analytics',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Progress Analytics',
    data = '{"definition": "دراسة البيانات التفصيلية للأداء لتحديد الأنماط واتخاذ قرارات مبنية على البيانات لتحسين الدراسة.", "example": "ملاحظة أن الوقت المستغرق في حل أسئلة قسم معين يتناقص مع زيادة عدد الاختبارات التجريبية.", "definition_ar": "دراسة البيانات التفصيلية للأداء لتحديد الأنماط واتخاذ قرارات مبنية على البيانات لتحسين الدراسة."}'::jsonb
WHERE id = 'digital-exams-glossary-progress-analytics'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-random-practice',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Random Practice',
    data = '{"definition": "حل أسئلة من مواضيع متعددة بشكل مختلط لتدريب الدماغ على التنقل السريع بين المفاهيم.", "example": "حل 10 أسئلة هندسة تليها 10 أسئلة جبر ثم 10 إحصاء بشكل متداخل.", "definition_ar": "حل أسئلة من مواضيع متعددة بشكل مختلط لتدريب الدماغ على التنقل السريع بين المفاهيم."}'::jsonb
WHERE id = 'digital-exams-glossary-random-practice'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-root-question-analysis',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Root Question Analysis',
    data = '{"definition": "فهم المطلب الأساسي للسؤال دون التشتت بالتفاصيل الزائدة أو الحشو اللفظي.", "example": "تحديد المتغير المطلوب حسابه في مسألة فيزيائية مليئة بالأرقام غير الضرورية.", "definition_ar": "فهم المطلب الأساسي للسؤال دون التشتت بالتفاصيل الزائدة أو الحشو اللفظي."}'::jsonb
WHERE id = 'digital-exams-glossary-root-question-analysis'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-rushing-errors',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Rushing Errors',
    data = '{"definition": "الأخطاء الناتجة عن قراءة السؤال بسرعة أو تجاوز بعض المعطيات دون انتباه.", "example": "اختيار الإجابة (أ) فوراً لأنها تبدو صحيحة دون إكمال قراءة باقي الخيارات (ب، ج، د).", "definition_ar": "الأخطاء الناتجة عن قراءة السؤال بسرعة أو تجاوز بعض المعطيات دون انتباه."}'::jsonb
WHERE id = 'digital-exams-glossary-rushing-errors'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-spaced-revision',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Spaced Revision',
    data = '{"definition": "توزيع فترات دراسة ومراجعة المادة على فترات زمنية متزايدة لتثبيت المعلومات.", "example": "مراجعة قواعد الرياضيات اليوم، ثم بعد 3 أيام، ثم بعد أسبوع.", "definition_ar": "توزيع فترات دراسة ومراجعة المادة على فترات زمنية متزايدة لتثبيت المعلومات."}'::jsonb
WHERE id = 'digital-exams-glossary-spaced-revision'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-tech-check',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Tech Check',
    data = '{"definition": "التأكد من جاهزية الجهاز، اتصال الإنترنت، والمتصفح قبل بدء الاختبار الرقمي بوقت كافٍ.", "example": "اختبار سرعة الإنترنت وتحديث متصفح الكروم قبل يوم من موعد الاختبار.", "definition_ar": "التأكد من جاهزية الجهاز، اتصال الإنترنت، والمتصفح قبل بدء الاختبار الرقمي بوقت كافٍ."}'::jsonb
WHERE id = 'digital-exams-glossary-tech-check'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-time-allocation',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Time Allocation',
    data = '{"definition": "تحديد مدة زمنية قصوى لكل سؤال أو قسم لتجنب استنزاف الوقت في جزء واحد من الاختبار.", "example": "تخصيص 90 ثانية كحد أقصى لكل سؤال في قسم القراءة لتتمكن من إكمال جميع الأسئلة.", "definition_ar": "تحديد مدة زمنية قصوى لكل سؤال أو قسم لتجنب استنزاف الوقت في جزء واحد من الاختبار."}'::jsonb
WHERE id = 'digital-exams-glossary-time-allocation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    slug = 'digital-exams-glossary-two-minute-rule',
    portal_id = 'digital-exams',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Two Minute Rule',
    data = '{"definition": "مبدأ ينص على تجاوز السؤال الذي يستغرق أكثر من دقيقتين للعودة إليه لاحقاً.", "example": "إذا شعرت أنك عالق في مسألة رياضية وتجاوزت الدقيقتين، ضع علامة عليها وانتقل للتالي.", "definition_ar": "مبدأ ينص على تجاوز السؤال الذي يستغرق أكثر من دقيقتين للعودة إليه لاحقاً."}'::jsonb
WHERE id = 'digital-exams-glossary-two-minute-rule'
AND status = 'draft';


-- Table: digital_exams_lessons
-- Expected updates: 20

UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-ai-study-assistant',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Using AI as a Personal Assistant',
    excerpt_ar = 'الذكاء الاصطناعي أداة ثورية في التحضير للاختبارات إذا استخدم بشكل صحيح.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-ai-study-assistant'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-analyzing-mistakes',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'How to Analyze Mistakes for Mistake Log',
    excerpt_ar = 'الخطأ في الاختبار التجريبي هو كنز من المعلومات إذا تم استغلاله بشكل صحيح.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-analyzing-mistakes'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-confidence-rating',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Confidence Rating During Exams',
    excerpt_ar = 'الوعي الذاتي بمدى صحة إجابتك يوفر عليك وقت المراجعة.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-confidence-rating'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-digital-time-management',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Time Management in Digital Exams',
    excerpt_ar = 'في الاختبارات الورقية، كان من السهل تصفح الأوراق لتوزيع الوقت. أما رقمياً، فأنت تواجه الشاشة فقط.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-digital-time-management'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-exam-night-routine',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Exam Night Routine to Reduce Anxiety',
    excerpt_ar = 'ما تفعله في الليلة التي تسبق الاختبار يحدد أداءك بنسبة كبيرة. السهر للمراجعة هو أسوأ استراتيجية ممكنة.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-exam-night-routine'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-final-week-strategy',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'The Final Week Strategy',
    excerpt_ar = 'في الأسبوع الأخير، التعلم الجديد غير فعال. الهدف هو التثبيت والجاهزية.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-final-week-strategy'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-handling-distractors',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Dismantling Distractors in Aptitude Tests',
    excerpt_ar = 'واضعو الاختبارات يصممون خيارات تبدو صحيحة لمنطق الطالب المتسرع. هذه تسمى ''المشتتات''.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-handling-distractors'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-interleaved-practice',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Interleaved Practice: Don''t Study One Topic',
    excerpt_ar = 'الدراسة التقليدية تعتمد على حل 30 سؤالاً على نفس القاعدة، مما يوهمك بالفهم. لكن في الاختبار، الأسئلة تأتي عشوائية.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-interleaved-practice'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-01',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 01',
    excerpt_ar = '# أسرار إدارة الوقت في الاختبارات الرقمية',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-01'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-02',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 02',
    excerpt_ar = '# التعامل مع قلق الاختبارات',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-02'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-03',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 03',
    excerpt_ar = '# استراتيجية استبعاد المشتتات',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-03'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-04',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 04',
    excerpt_ar = '# أهمية الاختبارات التجريبية',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-04'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-05',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 05',
    excerpt_ar = '# مراجعة الأخطاء بفعالية',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-05'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-item-06',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Item 06',
    excerpt_ar = '# قراءة السؤال بدقة: الكلمات المفتاحية',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-item-06'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-keyword-spotting',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Spotting Keywords and Negative Tools',
    excerpt_ar = 'الكلمة الواحدة قد تغير مسار إجابتك 180 درجة.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-keyword-spotting'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-mcq-elimination',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'The Art of Elimination Strategy',
    excerpt_ar = 'يعتبر سؤال الاختيار من متعدد تحدياً ذهنياً أكثر منه اختباراً للحفظ. تعتمد استراتيجية الاستبعاد على مبدأ بسيط: إذا لم تعرف الإجابة الصحيحة، فابحث عن ال...',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-mcq-elimination'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-overcoming-mind-blanks',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Handling Mind Blanking',
    excerpt_ar = 'يحدث أحياناً أن تقرأ سؤالاً فتشعر أن عقلك أصبح فارغاً تماماً نتيجة التوتر اللحظي.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-overcoming-mind-blanks'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-post-exam-review',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Post-Exam Review: After the Mock Test',
    excerpt_ar = 'إنهاء الاختبار التجريبي هو مجرد البداية. المرحلة الأهم هي المراجعة البعدية.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-post-exam-review'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-reading-comprehension-tricks',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Reading Comprehension: Effective Techniques',
    excerpt_ar = 'في أقسام استيعاب المقروء، قراءة النص كاملاً بتمعن تستهلك كل وقتك.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-reading-comprehension-tricks'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    slug = 'digital-exams-lesson-tech-preparedness',
    portal_id = 'digital-exams',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Tech Preparedness for Remote Exams',
    excerpt_ar = 'المشاكل التقنية أثناء الاختبار قد تسبب توتراً يفسد أداءك بالكامل. يجب أن تكون مستعداً.',
    data = '{}'::jsonb
WHERE id = 'digital-exams-lesson-tech-preparedness'
AND status = 'draft';


-- Table: digital_exams_prompts
-- Expected updates: 30

UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-analyze-mistake',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Analyze Mistake',
    data = '{"prompt_text": "لقد أخطأت في هذا السؤال: [نص السؤال]. إجابتي كانت [الإجابة الخاطئة] والإجابة الصحيحة هي [الإجابة الصحيحة]. اشرح لي بالتفصيل سبب خطئي وما هي القاعدة أو المفهوم الذي يجب أن أراجعه.", "instructions": "يفضل إرفاق السياق الكامل للسؤال لفهم أعمق لسبب الخطأ.", "prompt_text_ar": "لقد أخطأت في هذا السؤال: [نص السؤال]. إجابتي كانت [الإجابة الخاطئة] والإجابة الصحيحة هي [الإجابة الصحيحة]. اشرح لي بالتفصيل سبب خطئي وما هي القاعدة أو المفهوم الذي يجب أن أراجعه."}'::jsonb
WHERE id = 'digital-exams-prompt-analyze-mistake'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-brainstorm-study-methods',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Brainstorm Study Methods',
    data = '{"prompt_text": "أشعر بالملل من طريقتي التقليدية في المراجعة. اقترح 5 طرق مبتكرة وتفاعلية لمراجعة مادة [اسم المادة] استعداداً للاختبار النهائي.", "instructions": "تطبيق الطرق المقترحة يكسر الروتين ويزيد من استبقاء المعلومات.", "prompt_text_ar": "أشعر بالملل من طريقتي التقليدية في المراجعة. اقترح 5 طرق مبتكرة وتفاعلية لمراجعة مادة [اسم المادة] استعداداً للاختبار النهائي."}'::jsonb
WHERE id = 'digital-exams-prompt-brainstorm-study-methods'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-compare-concepts',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Compare Concepts',
    data = '{"prompt_text": "ما هو الفرق الدقيق بين [المفهوم الأول] و [المفهوم الثاني]؟ قدم جدولاً يوضح الفروقات الجوهرية مع إعطاء مثال لكل منهما للتمييز بينهما في الاختبار.", "instructions": "يساعدك هذا في حل أسئلة الاختيار من متعدد التي تعتمد على التمييز الدقيق.", "prompt_text_ar": "ما هو الفرق الدقيق بين [المفهوم الأول] و [المفهوم الثاني]؟ قدم جدولاً يوضح الفروقات الجوهرية مع إعطاء مثال لكل منهما للتمييز بينهما في الاختبار."}'::jsonb
WHERE id = 'digital-exams-prompt-compare-concepts'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-create-study-plan',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Create Study Plan',
    data = '{"prompt_text": "قم بإنشاء خطة مراجعة مكثفة لمدة [عدد الأيام] أيام للتحضير لاختبار [اسم الاختبار]. ركز على تخصيص وقت أكبر لمواضيع الضعف وهي [المواضيع].", "instructions": "استخدم هذا الموجه مع الذكاء الاصطناعي لإنشاء جدول مرن يراعي أوقات ذروة التركيز لديك.", "prompt_text_ar": "قم بإنشاء خطة مراجعة مكثفة لمدة [عدد الأيام] أيام للتحضير لاختبار [اسم الاختبار]. ركز على تخصيص وقت أكبر لمواضيع الضعف وهي [المواضيع]."}'::jsonb
WHERE id = 'digital-exams-prompt-create-study-plan'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-decode-trick-questions',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Decode Trick Questions',
    data = '{"prompt_text": "لماذا يعتبر هذا السؤال خادعاً؟ [نص السؤال والخيارات]. اشرح لي الفخ الذي يقع فيه الطلاب عادة وكيف أتجنبه مستقبلاً.", "instructions": "خاص للأسئلة التي تبدو سهلة ولكن إجابتها البديهية خاطئة.", "prompt_text_ar": "لماذا يعتبر هذا السؤال خادعاً؟ [نص السؤال والخيارات]. اشرح لي الفخ الذي يقع فيه الطلاب عادة وكيف أتجنبه مستقبلاً."}'::jsonb
WHERE id = 'digital-exams-prompt-decode-trick-questions'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-evaluate-essay-answer',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Evaluate Essay Answer',
    data = '{"prompt_text": "هذا هو السؤال: [نص السؤال]، وهذه هي إجابتي: [نص الإجابة]. قيّم إجابتي من 10، وحدد ما ينقصها لتكون إجابة نموذجية، وأعد كتابتها بالشكل الأمثل.", "instructions": "مفيد للاختبارات التي تتضمن أسئلة ذات إجابات قصيرة أو تعليل.", "prompt_text_ar": "هذا هو السؤال: [نص السؤال]، وهذه هي إجابتي: [نص الإجابة]. قيّم إجابتي من 10، وحدد ما ينقصها لتكون إجابة نموذجية، وأعد كتابتها بالشكل الأمثل."}'::jsonb
WHERE id = 'digital-exams-prompt-evaluate-essay-answer'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-explain-concept-simply',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Explain Concept Simply',
    data = '{"prompt_text": "اشرح لي المفهوم التالي: [اسم المفهوم] وكأنني في المرحلة [المرحلة الدراسية]. استخدم أمثلة من الحياة اليومية لتوضيح الفكرة.", "instructions": "هذا الموجه ممتاز لكسر حاجز صعوبة المواضيع المجردة في الفيزياء والرياضيات.", "prompt_text_ar": "اشرح لي المفهوم التالي: [اسم المفهوم] وكأنني في المرحلة [المرحلة الدراسية]. استخدم أمثلة من الحياة اليومية لتوضيح الفكرة."}'::jsonb
WHERE id = 'digital-exams-prompt-explain-concept-simply'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-focus-improvement',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Focus Improvement',
    data = '{"prompt_text": "أعاني من تشتت الانتباه بعد 20 دقيقة من بدء حل الأسئلة. ما هي الاستراتيجيات المثبتة علمياً لزيادة مدة التركيز في الاختبارات الطويلة التي تتجاوز الساعتين؟", "instructions": "استخدم النصائح في جلسات المذاكرة لتدريب الدماغ تدريجياً.", "prompt_text_ar": "أعاني من تشتت الانتباه بعد 20 دقيقة من بدء حل الأسئلة. ما هي الاستراتيجيات المثبتة علمياً لزيادة مدة التركيز في الاختبارات الطويلة التي تتجاوز الساعتين؟"}'::jsonb
WHERE id = 'digital-exams-prompt-focus-improvement'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-generate-mcq',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Generate Mcq',
    data = '{"prompt_text": "اكتب لي 5 أسئلة اختيار من متعدد بمستوى صعوبة [مستوى الصعوبة] حول موضوع [الموضوع]. تأكد من أن المشتتات (الخيارات الخاطئة) تبدو منطقية، وقدم شرحاً لكل إجابة صحيحة في النهاية.", "instructions": "حدد مستوى الصعوبة (سهل، متوسط، صعب) بناءً على تقدمك الحالي.", "prompt_text_ar": "اكتب لي 5 أسئلة اختيار من متعدد بمستوى صعوبة [مستوى الصعوبة] حول موضوع [الموضوع]. تأكد من أن المشتتات (الخيارات الخاطئة) تبدو منطقية، وقدم شرحاً لكل إجابة صحيحة في النهاية."}'::jsonb
WHERE id = 'digital-exams-prompt-generate-mcq'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-identify-keywords',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Identify Keywords',
    data = '{"prompt_text": "إليك السؤال التالي: [نص السؤال الطويل]. ما هي الكلمات المفتاحية التي يجب أن أركز عليها للوصول للإجابة الصحيحة متجاهلاً الحشو الزائد؟", "instructions": "استخدم هذا الموجه للتدرب على تحليل الأسئلة الطويلة أو المعقدة لفظياً.", "prompt_text_ar": "إليك السؤال التالي: [نص السؤال الطويل]. ما هي الكلمات المفتاحية التي يجب أن أركز عليها للوصول للإجابة الصحيحة متجاهلاً الحشو الزائد؟"}'::jsonb
WHERE id = 'digital-exams-prompt-identify-keywords'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-01',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 01',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "instructions": "اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية."}'::jsonb
WHERE id = 'digital-exams-prompt-item-01'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-02',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 02',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "instructions": "قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي."}'::jsonb
WHERE id = 'digital-exams-prompt-item-02'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-03',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 03',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "instructions": "اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية."}'::jsonb
WHERE id = 'digital-exams-prompt-item-03'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-04',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 04',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "instructions": "اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار."}'::jsonb
WHERE id = 'digital-exams-prompt-item-04'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-05',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 05',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "instructions": "اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي."}'::jsonb
WHERE id = 'digital-exams-prompt-item-05'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-06',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 06',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "instructions": "اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء."}'::jsonb
WHERE id = 'digital-exams-prompt-item-06'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-07',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 07',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "instructions": "قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت."}'::jsonb
WHERE id = 'digital-exams-prompt-item-07'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-08',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 08',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "instructions": "كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟"}'::jsonb
WHERE id = 'digital-exams-prompt-item-08'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-09',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 09',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "instructions": "قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس."}'::jsonb
WHERE id = 'digital-exams-prompt-item-09'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-item-10',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Item 10',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "instructions": "اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار."}'::jsonb
WHERE id = 'digital-exams-prompt-item-10'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-math-shortcuts',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Math Shortcuts',
    data = '{"prompt_text": "هل هناك طرق سريعة أو اختصارات ذهنية لحل مسائل [نوع المسائل، مثال: التناسب الطردي والعكسي] بدون استخدام الآلة الحاسبة لربح الوقت؟", "instructions": "تطبيق الاختصارات يتطلب تدريباً لتجنب الأخطاء الحسابية العكسية.", "prompt_text_ar": "هل هناك طرق سريعة أو اختصارات ذهنية لحل مسائل [نوع المسائل، مثال: التناسب الطردي والعكسي] بدون استخدام الآلة الحاسبة لربح الوقت؟"}'::jsonb
WHERE id = 'digital-exams-prompt-math-shortcuts'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-memorization-techniques',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Memorization Techniques',
    data = '{"prompt_text": "لدي قائمة من [عدد] مصطلحات أو قوانين أحتاج لحفظها: [القائمة]. اقترح علي طريقة (Mnemonics) أو قصة قصيرة أو اختصارات لحفظها بسهولة.", "instructions": "يفضل وضع قوائم مترابطة ليكون الاختصار أو القصة ذات معنى.", "prompt_text_ar": "لدي قائمة من [عدد] مصطلحات أو قوانين أحتاج لحفظها: [القائمة]. اقترح علي طريقة (Mnemonics) أو قصة قصيرة أو اختصارات لحفظها بسهولة."}'::jsonb
WHERE id = 'digital-exams-prompt-memorization-techniques'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-overcome-exam-anxiety',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Overcome Exam Anxiety',
    data = '{"prompt_text": "أشعر بتوتر شديد قبل اختبار [اسم الاختبار] بيوم. أعطني 3 تقنيات عملية وسريعة لتهدئة الأعصاب وتقليل القلق يمكنني ممارستها الآن وفي قاعة الاختبار.", "instructions": "استخدمه عندما تشعر بالضغط النفسي لتلقي نصائح إرشادية وتدريبات تنفس مفيدة.", "prompt_text_ar": "أشعر بتوتر شديد قبل اختبار [اسم الاختبار] بيوم. أعطني 3 تقنيات عملية وسريعة لتهدئة الأعصاب وتقليل القلق يمكنني ممارستها الآن وفي قاعة الاختبار."}'::jsonb
WHERE id = 'digital-exams-prompt-overcome-exam-anxiety'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-plan-last-week',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Plan Last Week',
    data = '{"prompt_text": "بقي أسبوع واحد على اختبار [اسم الاختبار]. كيف أنظم الأيام السبعة المتبقية لضمان مراجعة شاملة دون إرهاق نفسي (Burnout)؟", "instructions": "يساعدك في الانتقال من مرحلة التعلم لمرحلة تثبيت المعلومات والتدريب.", "prompt_text_ar": "بقي أسبوع واحد على اختبار [اسم الاختبار]. كيف أنظم الأيام السبعة المتبقية لضمان مراجعة شاملة دون إرهاق نفسي (Burnout)؟"}'::jsonb
WHERE id = 'digital-exams-prompt-plan-last-week'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-post-exam-reflection',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Post Exam Reflection',
    data = '{"prompt_text": "لقد انتهيت للتو من اختباري. أريد توثيق تجربتي. اسألني 4 أسئلة تقييمية حول أدائي، استراتيجياتي، وما يمكنني تحسينه في الاختبارات القادمة.", "instructions": "خطوة هامة لتحويل التجربة الحالية لدروس مستفادة للمستقبل.", "prompt_text_ar": "لقد انتهيت للتو من اختباري. أريد توثيق تجربتي. اسألني 4 أسئلة تقييمية حول أدائي، استراتيجياتي، وما يمكنني تحسينه في الاختبارات القادمة."}'::jsonb
WHERE id = 'digital-exams-prompt-post-exam-reflection'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-reading-comprehension',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Reading Comprehension',
    data = '{"prompt_text": "كيف أقرأ النصوص الطويلة في قسم الاستيعاب اللفظي بسرعة وبشكل فعال للإجابة على الأسئلة دون الحاجة لإعادة قراءة النص عدة مرات؟", "instructions": "مفيد جداً لاختبارات القدرات التي تعتمد على استيعاب المقروء.", "prompt_text_ar": "كيف أقرأ النصوص الطويلة في قسم الاستيعاب اللفظي بسرعة وبشكل فعال للإجابة على الأسئلة دون الحاجة لإعادة قراءة النص عدة مرات؟"}'::jsonb
WHERE id = 'digital-exams-prompt-reading-comprehension'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-review-exam-results',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Review Exam Results',
    data = '{"prompt_text": "لقد حصلت على درجة [الدرجة] من [الدرجة الكلية] في الاختبار التجريبي. أخطائي تركزت في أقسام [أسماء الأقسام]. ما هي استراتيجيتي للأسبوع القادم لتحسين درجتي؟", "instructions": "يقدم لك خطة عمل مبنية على نقاط ضعفك الحالية لرفع مستوى الأداء.", "prompt_text_ar": "لقد حصلت على درجة [الدرجة] من [الدرجة الكلية] في الاختبار التجريبي. أخطائي تركزت في أقسام [أسماء الأقسام]. ما هي استراتيجيتي للأسبوع القادم لتحسين درجتي؟"}'::jsonb
WHERE id = 'digital-exams-prompt-review-exam-results'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-simulate-exam-scenario',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Simulate Exam Scenario',
    data = '{"prompt_text": "تخيل أنك تختبرني شفوياً في موضوع [الموضوع]. اسألني سؤالاً صعباً، وانتظر إجابتي، ثم صحح لي وأعطني السؤال التالي. كرر ذلك 3 مرات.", "instructions": "يستخدم للتدرب التفاعلي والمحاكاة الحية لمستوى الصعوبة.", "prompt_text_ar": "تخيل أنك تختبرني شفوياً في موضوع [الموضوع]. اسألني سؤالاً صعباً، وانتظر إجابتي، ثم صحح لي وأعطني السؤال التالي. كرر ذلك 3 مرات."}'::jsonb
WHERE id = 'digital-exams-prompt-simulate-exam-scenario'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-summarize-notes',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Summarize Notes',
    data = '{"prompt_text": "قم بتلخيص الملاحظات التالية في نقاط رئيسية مركزة لتسهيل حفظها واسترجاعها ليلة الاختبار: [النص أو الملاحظات].", "instructions": "يفضل ألا يتجاوز النص المدخل 1000 كلمة لضمان دقة التلخيص وتركيزه.", "prompt_text_ar": "قم بتلخيص الملاحظات التالية في نقاط رئيسية مركزة لتسهيل حفظها واسترجاعها ليلة الاختبار: [النص أو الملاحظات]."}'::jsonb
WHERE id = 'digital-exams-prompt-summarize-notes'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    slug = 'digital-exams-prompt-time-management-strategy',
    portal_id = 'digital-exams',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Time Management Strategy',
    data = '{"prompt_text": "لدي اختبار يحتوي على [عدد الأسئلة] سؤالاً ومقسّم إلى [عدد الأقسام] أقسام، والوقت الإجمالي هو [المدة بالدقائق] دقيقة. كيف أوزع وقتي بشكل مثالي مع ترك 10 دقائق للمراجعة النهائية؟", "instructions": "احرص على إدخال أرقام دقيقة لضمان توزيع زمني واقعي وقابل للتطبيق.", "prompt_text_ar": "لدي اختبار يحتوي على [عدد الأسئلة] سؤالاً ومقسّم إلى [عدد الأقسام] أقسام، والوقت الإجمالي هو [المدة بالدقائق] دقيقة. كيف أوزع وقتي بشكل مثالي مع ترك 10 دقائق للمراجعة النهائية؟"}'::jsonb
WHERE id = 'digital-exams-prompt-time-management-strategy'
AND status = 'draft';


-- Table: digital_exams_resources
-- Expected updates: 30

UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-anki-flashcards',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Anki Flashcards',
    data = '{"url": "https://apps.ankiweb.net", "description": "تطبيق يعتمد على خوارزميات التكرار المتباعد لمساعدتك على حفظ الكلمات المفتاحية والمصطلحات بسرعة."}'::jsonb
WHERE id = 'digital-exams-resource-anki-flashcards'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-deep-work-summary',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Deep Work Summary',
    data = '{"url": "", "description": "نصائح مستخلصة من كتاب ''العمل العميق'' لكال نيوبورت لتعزيز التركيز أثناء دراسة المواضيع الصعبة."}'::jsonb
WHERE id = 'digital-exams-resource-deep-work-summary'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-digital-readiness-checklist',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Readiness Checklist',
    data = '{"url": "", "description": "ملف قابل للتحميل يحتوي على خطوات التأكد من جاهزية الحاسب الآلي للاختبارات عن بعد."}'::jsonb
WHERE id = 'digital-exams-resource-digital-readiness-checklist'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-digital-sat-practice',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Sat Practice',
    data = '{"url": "https://bluebook.collegeboard.org", "description": "تطبيق يحاكي بيئة الاختبارات الرقمية المعيارية للتدرب على الواجهة والأسئلة (مفيد لاختبارات مشابهة)."}'::jsonb
WHERE id = 'digital-exams-resource-digital-sat-practice'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-exam-diet-tips',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Exam Diet Tips',
    data = '{"url": "", "description": "دليل صحي لما يجب تناوله قبل وأثناء فترة الاختبارات لضمان أعلى مستويات النشاط الذهني."}'::jsonb
WHERE id = 'digital-exams-resource-exam-diet-tips'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-eye-care-software',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Eye Care Software',
    data = '{"url": "https://justgetflux.com", "description": "برنامج لتقليل إجهاد العين عبر تعديل إضاءة الشاشة تلقائياً أثناء المراجعة الطويلة أمام الحاسب."}'::jsonb
WHERE id = 'digital-exams-resource-eye-care-software'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-focus-music-playlist',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Focus Music Playlist',
    data = '{"url": "", "description": "قائمة تشغيل مصممة للمساعدة على التركيز العميق أثناء المذاكرة وتقليل المشتتات الخارجية."}'::jsonb
WHERE id = 'digital-exams-resource-focus-music-playlist'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-habit-tracker',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Habit Tracker',
    data = '{"url": "https://loophabit.org", "description": "تطبيق بسيط لمساعدتك في بناء عادة المذاكرة اليومية والالتزام بالجدول الزمني."}'::jsonb
WHERE id = 'digital-exams-resource-habit-tracker'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-01',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 01',
    data = '{"url": "https://www.coursera.org", "description": "منصة تعليمية تقدم دورات في مهارات الدراسة والتحضير للاختبارات."}'::jsonb
WHERE id = 'digital-exams-resource-item-01'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-02',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 02',
    data = '{"url": "https://ar.khanacademy.org", "description": "دروس ومقاطع فيديو تعليمية مجانية في مختلف المواد."}'::jsonb
WHERE id = 'digital-exams-resource-item-02'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-03',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 03',
    data = '{"url": "https://quizlet.com", "description": "أداة لإنشاء بطاقات تعليمية واختبارات تدريبية."}'::jsonb
WHERE id = 'digital-exams-resource-item-03'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-04',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 04',
    data = '{"url": "https://pomofocus.io", "description": "تطبيق لإدارة الوقت أثناء المذاكرة باستخدام تقنية بومودورو."}'::jsonb
WHERE id = 'digital-exams-resource-item-04'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-05',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 05',
    data = '{"url": "https://www.edx.org", "description": "دورات تدريبية من جامعات عالمية لتطوير مهارات التعلم."}'::jsonb
WHERE id = 'digital-exams-resource-item-05'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-06',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 06',
    data = '{"url": "https://www.studentblog.com", "description": "مقالات ونصائح للطلاب حول المذاكرة والتحضير للاختبارات."}'::jsonb
WHERE id = 'digital-exams-resource-item-06'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-07',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 07',
    data = '{"url": "https://www.udemy.com", "description": "دورات في كيفية التغلب على قلق الاختبارات."}'::jsonb
WHERE id = 'digital-exams-resource-item-07'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-08',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 08',
    data = '{"url": "https://www.forestapp.cc", "description": "تطبيق يساعد على التركيز والابتعاد عن الهاتف أثناء المذاكرة."}'::jsonb
WHERE id = 'digital-exams-resource-item-08'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-09',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 09',
    data = '{"url": "https://drive.google.com", "description": "مساحة لتخزين ومشاركة الملاحظات والملفات الدراسية."}'::jsonb
WHERE id = 'digital-exams-resource-item-09'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-item-10',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Item 10',
    data = '{"url": "https://www.notion.so", "description": "أداة قوية لتنظيم الجداول الدراسية والملاحظات."}'::jsonb
WHERE id = 'digital-exams-resource-item-10'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-khan-academy-math',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Khan Academy Math',
    data = '{"url": "https://ar.khanacademy.org", "description": "شروحات مرئية وتمارين تفاعلية ممتازة لتأسيس وتقوية المهارات الرياضية المطلوبة في الاختبارات المعيارية."}'::jsonb
WHERE id = 'digital-exams-resource-khan-academy-math'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-math-way',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Math Way',
    data = '{"url": "https://www.mathway.com", "description": "أداة للتحقق من إجاباتك ومراجعة خطوات الحل الدقيقة في المسائل الجبرية والهندسية."}'::jsonb
WHERE id = 'digital-exams-resource-math-way'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-mindmeister',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Mindmeister',
    data = '{"url": "https://www.mindmeister.com", "description": "منصة لإنشاء خرائط ذهنية إلكترونية تساعد في تلخيص المواضيع المعقدة وربط الأفكار."}'::jsonb
WHERE id = 'digital-exams-resource-mindmeister'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-mock-test-analysis-sheet',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Mock Test Analysis Sheet',
    data = '{"url": "", "description": "جدول بيانات جاهز لمتابعة درجاتك في الاختبارات التجريبية وتحديد الفجوات المعرفية تلقائياً."}'::jsonb
WHERE id = 'digital-exams-resource-mock-test-analysis-sheet'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-notion-templates',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Notion Templates',
    data = '{"url": "https://www.notion.so", "description": "استخدم قوالب نوشن الجاهزة لتنظيم جدول المراجعة وبناء سجل الأخطاء الخاص بك."}'::jsonb
WHERE id = 'digital-exams-resource-notion-templates'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-online-whiteboard',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Online Whiteboard',
    data = '{"url": "https://awwapp.com", "description": "مساحة مسودة افتراضية للتدرب على حل المسائل وكأنك في بيئة اختبار رقمية غير ورقية."}'::jsonb
WHERE id = 'digital-exams-resource-online-whiteboard'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-pomodoro-tracker',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Pomodoro Tracker',
    data = '{"url": "https://pomofocus.io", "description": "أداة ممتازة لتقسيم وقت المذاكرة إلى فترات زمنية لزيادة التركيز وإدارة الوقت بفعالية."}'::jsonb
WHERE id = 'digital-exams-resource-pomodoro-tracker'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-qiyas-official',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Qiyas Official',
    data = '{"url": "https://etec.gov.sa", "description": "الموقع الرسمي للاطلاع على مواعيد الاختبارات الرقمية، تسجيل الدخول، ومعرفة الشروط والتعليمات."}'::jsonb
WHERE id = 'digital-exams-resource-qiyas-official'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-sleep-cycle-app',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Sleep Cycle App',
    data = '{"url": "https://www.sleepcycle.com", "description": "يساعدك على ضبط مواعيد نومك لضمان الاستيقاظ في أقصى درجات النشاط يوم الاختبار."}'::jsonb
WHERE id = 'digital-exams-resource-sleep-cycle-app'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-speed-reading-tool',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Speed Reading Tool',
    data = '{"url": "", "description": "منصة لتحسين سرعة القراءة واستيعاب المقروء، مهارة أساسية للأقسام اللفظية."}'::jsonb
WHERE id = 'digital-exams-resource-speed-reading-tool'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-test-anxiety-guide',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Test Anxiety Guide',
    data = '{"url": "", "description": "مقال شامل يقدم نصائح علمية للتغلب على القلق وتحسين الأداء تحت الضغط النفسي."}'::jsonb
WHERE id = 'digital-exams-resource-test-anxiety-guide'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    slug = 'digital-exams-resource-time-blocking-guide',
    portal_id = 'digital-exams',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Time Blocking Guide',
    data = '{"url": "", "description": "شرح مفصل لكيفية استخدام استراتيجية Time Blocking لتنظيم يومك خلال فترة المراجعة النهائية."}'::jsonb
WHERE id = 'digital-exams-resource-time-blocking-guide'
AND status = 'draft';


-- Table: iot_glossary
-- Expected updates: 50

UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-actuator',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Actuator',
    data = '{"definition": "جهاز يحول الإشارة الكهربائية إلى حركة ميكانيكية أو فعل فيزيائي.", "example": "التحكم في محرك سيرفو لتدوير ذراع آلي.", "definition_ar": "جهاز يحول الإشارة الكهربائية إلى حركة ميكانيكية أو فعل فيزيائي."}'::jsonb
WHERE id = 'iot-lab-glossary-actuator'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-adc',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'ADC',
    data = '{"definition": "وحدة إلكترونية تحول الإشارات الكهربائية المتغيرة (التناظرية) إلى أرقام يمكن للمتحكم قراءتها.", "example": "قراءة قيمة مستشعر الضوء LDR.", "definition_ar": "وحدة إلكترونية تحول الإشارات الكهربائية المتغيرة (التناظرية) إلى أرقام يمكن للمتحكم قراءتها."}'::jsonb
WHERE id = 'iot-lab-glossary-adc'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-analog-signal',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Analog Signal',
    data = '{"definition": "إشارة مستمرة تتغير قيمتها بمرور الوقت، ويمكن أن تأخذ أي قيمة ضمن نطاق معين.", "example": "قراءة إشارة تماثلية من حساس حرارة متصل بمدخل تماثلي في الأردوينو.", "definition_ar": "إشارة مستمرة تتغير قيمتها بمرور الوقت، ويمكن أن تأخذ أي قيمة ضمن نطاق معين."}'::jsonb
WHERE id = 'iot-lab-glossary-analog-signal'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-arduino',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Arduino',
    data = '{"definition": "منصة إلكترونية مفتوحة المصدر تعتمد على أجهزة وبرمجيات سهلة الاستخدام.", "example": "برمجة أردوينو أونو لوميض مصباح LED.", "definition_ar": "منصة إلكترونية مفتوحة المصدر تعتمد على أجهزة وبرمجيات سهلة الاستخدام."}'::jsonb
WHERE id = 'iot-lab-glossary-arduino'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-baud-rate',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Baud Rate',
    data = '{"definition": "سرعة نقل البيانات عبر الاتصال التسلسلي، ويقاس بالبت في الثانية.", "example": "ضبط معدل الباود على 9600 في كل من الأردوينو والشاشة التسلسلية.", "definition_ar": "سرعة نقل البيانات عبر الاتصال التسلسلي، ويقاس بالبت في الثانية."}'::jsonb
WHERE id = 'iot-lab-glossary-baud-rate'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-bootloader',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Bootloader',
    data = '{"definition": "برنامج صغير مدمج في المتحكم الدقيق يهيئ الجهاز لبدء تشغيل البرنامج الرئيسي وتحديثه.", "example": "حرق محمل الإقلاع على شريحة ATmega328P جديدة.", "definition_ar": "برنامج صغير مدمج في المتحكم الدقيق يهيئ الجهاز لبدء تشغيل البرنامج الرئيسي وتحديثه."}'::jsonb
WHERE id = 'iot-lab-glossary-bootloader'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-breadboard',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Breadboard',
    data = '{"definition": "لوح بلاستيكي يحتوي على ثقوب لتوصيل المكونات الإلكترونية بدون لحام.", "example": "توصيل دائرة بسيطة بمقاومة ومصباح LED على لوح التجارب.", "definition_ar": "لوح بلاستيكي يحتوي على ثقوب لتوصيل المكونات الإلكترونية بدون لحام."}'::jsonb
WHERE id = 'iot-lab-glossary-breadboard'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-capacitor',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Capacitor',
    data = '{"definition": "مكون يقوم بتخزين الطاقة الكهربائية بشكل مؤقت وتفريغها عند الحاجة.", "example": "استخدام مكثف لتنعيم إشارة الجهد الخارجة من مزود الطاقة.", "definition_ar": "مكون يقوم بتخزين الطاقة الكهربائية بشكل مؤقت وتفريغها عند الحاجة."}'::jsonb
WHERE id = 'iot-lab-glossary-capacitor'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-circuit-schematic',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Circuit Schematic',
    data = '{"definition": "رسم توضيحي يمثل المكونات الإلكترونية وطريقة توصيلها باستخدام رموز قياسية.", "example": "رسم مخطط دائرة التحكم في محرك باستخدام الترانزستور قبل تنفيذها عملياً.", "definition_ar": "رسم توضيحي يمثل المكونات الإلكترونية وطريقة توصيلها باستخدام رموز قياسية."}'::jsonb
WHERE id = 'iot-lab-glossary-circuit-schematic'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-current',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Current',
    data = '{"definition": "معدل تدفق الشحنات الكهربائية في الدائرة، ويقاس بالأمبير.", "example": "حساب التيار المار في مقاومة باستخدام قانون أوم.", "definition_ar": "معدل تدفق الشحنات الكهربائية في الدائرة، ويقاس بالأمبير."}'::jsonb
WHERE id = 'iot-lab-glossary-current'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-dac',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'DAC',
    data = '{"definition": "وحدة تحول الأرقام الرقمية إلى إشارات جهد كهربائي متغير.", "example": "توليد إشارات صوتية من المتحكم الدقيق.", "definition_ar": "وحدة تحول الأرقام الرقمية إلى إشارات جهد كهربائي متغير."}'::jsonb
WHERE id = 'iot-lab-glossary-dac'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-data-logging',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Data Logging',
    data = '{"definition": "عملية جمع وتخزين البيانات بمرور الوقت، إما محلياً أو على خادم سحابي.", "example": "حفظ قراءات حساس الرطوبة كل 5 دقائق في بطاقة SD.", "definition_ar": "عملية جمع وتخزين البيانات بمرور الوقت، إما محلياً أو على خادم سحابي."}'::jsonb
WHERE id = 'iot-lab-glossary-data-logging'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-debounce',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Debouncing',
    data = '{"definition": "معالجة برمجية أو فيزيائية لمنع قراءة ضغطات متكررة خاطئة عند ضغط الزر الميكانيكي مرة واحدة.", "example": "إضافة تأخير 50 مللي ثانية في الكود بعد اكتشاف ضغطة الزر.", "definition_ar": "معالجة برمجية أو فيزيائية لمنع قراءة ضغطات متكررة خاطئة عند ضغط الزر الميكانيكي مرة واحدة."}'::jsonb
WHERE id = 'iot-lab-glossary-debounce'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-debugging',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Debugging',
    data = '{"definition": "عملية اكتشاف وتحديد وإصلاح الأخطاء في البرمجيات أو الدوائر الإلكترونية.", "example": "استخدام شاشة الاتصال التسلسلي (Serial Monitor) لمراقبة قيم المتغيرات أثناء تشغيل الكود.", "definition_ar": "عملية اكتشاف وتحديد وإصلاح الأخطاء في البرمجيات أو الدوائر الإلكترونية."}'::jsonb
WHERE id = 'iot-lab-glossary-debugging'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-digital-signal',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Digital Signal',
    data = '{"definition": "إشارة متقطعة تأخذ قيمتين فقط (عالي/منخفض أو 1/0).", "example": "قراءة حالة زر ضاغط كإشارة رقمية (مضغوط أو غير مضغوط).", "definition_ar": "إشارة متقطعة تأخذ قيمتين فقط (عالي/منخفض أو 1/0)."}'::jsonb
WHERE id = 'iot-lab-glossary-digital-signal'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-esp32',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'ESP32',
    data = '{"definition": "شريحة تحكم دقيقة منخفضة التكلفة والطاقة تتميز بوجود Wi-Fi و Bluetooth مدمجين.", "example": "استخدام ESP32 لإرسال بيانات الحساسات إلى خادم سحابي.", "definition_ar": "شريحة تحكم دقيقة منخفضة التكلفة والطاقة تتميز بوجود Wi-Fi و Bluetooth مدمجين."}'::jsonb
WHERE id = 'iot-lab-glossary-esp32'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-gpio',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Gpio',
    data = '{"definition": "دبابيس عامة الأغراض على لوحة المتحكم يمكن برمجتها للعمل كمدخلات أو مخرجات.", "example": "توصيل LED بدبوس GPIO رقم 13 على الأردوينو.", "definition_ar": "دبابيس عامة الأغراض على لوحة المتحكم يمكن برمجتها للعمل كمدخلات أو مخرجات."}'::jsonb
WHERE id = 'iot-lab-glossary-gpio'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-ground',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Ground - GND',
    data = '{"definition": "النقطة المرجعية في الدائرة الكهربائية التي تقاس بالنسبة لها جميع الجهود الأخرى، وهو مسار العودة للتيار.", "example": "يجب ربط الطرف السالب للبطارية بمنفذ GND.", "definition_ar": "النقطة المرجعية في الدائرة الكهربائية التي تقاس بالنسبة لها جميع الجهود الأخرى، وهو مسار العودة للتيار."}'::jsonb
WHERE id = 'iot-lab-glossary-ground'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-i2c-2',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'I2C 2',
    data = '{"definition": "بروتوكول اتصال تسلسلي يسمح لعدة أجهزة طرفية بالتواصل مع متحكم واحد باستخدام سلكين فقط.", "example": "توصيل شاشة LCD ومستشعر حرارة بنفس منافذ I2C.", "definition_ar": "بروتوكول اتصال تسلسلي يسمح لعدة أجهزة طرفية بالتواصل مع متحكم واحد باستخدام سلكين فقط."}'::jsonb
WHERE id = 'iot-lab-glossary-i2c-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-i2c',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Inter-Integrated Circuit',
    data = '{"definition": "بروتوكول اتصال متسلسل يسمح بتوصيل أجهزة متعددة باستخدام سلكين فقط.", "example": "قراءة البيانات من حساس الضغط الجوي باستخدام بروتوكول I2C.", "definition_ar": "بروتوكول اتصال متسلسل يسمح بتوصيل أجهزة متعددة باستخدام سلكين فقط."}'::jsonb
WHERE id = 'iot-lab-glossary-i2c'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-interrupt',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Interrupt',
    data = '{"definition": "إشارة تُرسل للمتحكم لإيقاف ما يفعله حالياً لتنفيذ مهمة أكثر أهمية وفورية.", "example": "استخدام زر ضغطي كمقاطعة لتشغيل إنذار فوري.", "definition_ar": "إشارة تُرسل للمتحكم لإيقاف ما يفعله حالياً لتنفيذ مهمة أكثر أهمية وفورية."}'::jsonb
WHERE id = 'iot-lab-glossary-interrupt'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-iot',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Iot',
    data = '{"definition": "شبكة من الأجهزة المادية المتصلة بالإنترنت لجمع وتبادل البيانات بذكاء.", "example": "نظام زراعة ذكي يروي النباتات تلقائياً عند جفاف التربة.", "definition_ar": "شبكة من الأجهزة المادية المتصلة بالإنترنت لجمع وتبادل البيانات بذكاء."}'::jsonb
WHERE id = 'iot-lab-glossary-iot'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-jumper-wires',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Jumper Wires',
    data = '{"definition": "أسلاك قصيرة بأطراف صلبة تستخدم لتوصيل المكونات على لوح التجارب.", "example": "استخدام أسلاك توصيل من نوع (ذكر-ذكر) لربط الحساسات بلوح التجارب.", "definition_ar": "أسلاك قصيرة بأطراف صلبة تستخدم لتوصيل المكونات على لوح التجارب."}'::jsonb
WHERE id = 'iot-lab-glossary-jumper-wires'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-led',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Light Emitting Diode',
    data = '{"definition": "مكون إلكتروني يضيء عند مرور التيار الكهربائي فيه في اتجاه واحد.", "example": "استخدام LED أحمر كمؤشر لعمل الجهاز.", "definition_ar": "مكون إلكتروني يضيء عند مرور التيار الكهربائي فيه في اتجاه واحد."}'::jsonb
WHERE id = 'iot-lab-glossary-led'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-logic-level',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Logic Level',
    data = '{"definition": "مستويات الجهد الكهربائي التي تمثل الحالة 0 أو 1 في الدوائر الرقمية، عادة 3.3 فولت أو 5 فولت.", "example": "توصيل شريحة ESP32 التي تعمل بـ 3.3 فولت مع حساس 5 فولت يحتاج لمحول مستوى.", "definition_ar": "مستويات الجهد الكهربائي التي تمثل الحالة 0 أو 1 في الدوائر الرقمية، عادة 3.3 فولت أو 5 فولت."}'::jsonb
WHERE id = 'iot-lab-glossary-logic-level'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-microcontroller',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Microcontroller',
    data = '{"definition": "حاسوب صغير متكامل على شريحة واحدة مصمم للتحكم في الأجهزة والعمليات المحددة.", "example": "شريحة ATmega328P المستخدمة في لوحة الأردوينو أونو.", "definition_ar": "حاسوب صغير متكامل على شريحة واحدة مصمم للتحكم في الأجهزة والعمليات المحددة."}'::jsonb
WHERE id = 'iot-lab-glossary-microcontroller'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-mqtt',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'MQTT',
    data = '{"definition": "بروتوكول مراسلة خفيف الوزن يعتمد على نموذج النشر/الاشتراك، يستخدم بكثرة في إنترنت الأشياء.", "example": "إرسال قراءات درجة الحرارة من ESP32 إلى وسيط MQTT.", "definition_ar": "بروتوكول مراسلة خفيف الوزن يعتمد على نموذج النشر/الاشتراك، يستخدم بكثرة في إنترنت الأشياء."}'::jsonb
WHERE id = 'iot-lab-glossary-mqtt'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-multimeter',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Multimeter',
    data = '{"definition": "أداة قياس إلكترونية تستخدم لقياس الجهد، التيار، والمقاومة.", "example": "فحص استمرارية السلك باستخدام الملتيميتر للتأكد من عدم وجود قطع.", "definition_ar": "أداة قياس إلكترونية تستخدم لقياس الجهد، التيار، والمقاومة."}'::jsonb
WHERE id = 'iot-lab-glossary-multimeter'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-ohm-law',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Ohm''s Law',
    data = '{"definition": "قانون فيزيائي يوضح العلاقة بين الجهد والتيار والمقاومة (V=I*R).", "example": "تطبيق قانون أوم لحساب قيمة المقاومة اللازمة لمصباح LED.", "definition_ar": "قانون فيزيائي يوضح العلاقة بين الجهد والتيار والمقاومة (V=I*R)."}'::jsonb
WHERE id = 'iot-lab-glossary-ohm-law'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-pcb',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'PCB',
    data = '{"definition": "لوحة من مادة عازلة تحتوي على مسارات نحاسية محفورة لربط المكونات الإلكترونية بدلاً من الأسلاك.", "example": "نقل المشروع من لوحة التجارب إلى PCB لجعله نهائياً ودائماً.", "definition_ar": "لوحة من مادة عازلة تحتوي على مسارات نحاسية محفورة لربط المكونات الإلكترونية بدلاً من الأسلاك."}'::jsonb
WHERE id = 'iot-lab-glossary-pcb'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-pull-down',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Pull-down Resistor',
    data = '{"definition": "مقاومة توصل بين طرف الإدخال والأرضي لضمان قراءة مستوى منطقي منخفض (LOW) عند عدم وجود إدخال.", "example": "استخدام مقاومة خفض لضمان قراءة 0 فولت عند عدم ضغط الزر.", "definition_ar": "مقاومة توصل بين طرف الإدخال والأرضي لضمان قراءة مستوى منطقي منخفض (LOW) عند عدم وجود إدخال."}'::jsonb
WHERE id = 'iot-lab-glossary-pull-down'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-pull-up',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Pull-up Resistor',
    data = '{"definition": "مقاومة توصل بين طرف الإدخال وجهد التغذية لضمان قراءة مستوى منطقي عالٍ (HIGH) عندما لا يكون هناك إدخال.", "example": "توصيل زر ضغطي مع مقاومة رفع لمنع القراءات العشوائية.", "definition_ar": "مقاومة توصل بين طرف الإدخال وجهد التغذية لضمان قراءة مستوى منطقي عالٍ (HIGH) عندما لا يكون هناك إدخال."}'::jsonb
WHERE id = 'iot-lab-glossary-pull-up'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-pwm-2',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Pulse Width Modulation',
    data = '{"definition": "تقنية لمحاكاة إشارة تماثلية باستخدام إشارات رقمية سريعة التغيير.", "example": "التحكم في سرعة محرك أو شدة إضاءة LED باستخدام إشارات PWM.", "definition_ar": "تقنية لمحاكاة إشارة تماثلية باستخدام إشارات رقمية سريعة التغيير."}'::jsonb
WHERE id = 'iot-lab-glossary-pwm-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-pwm',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'PWM',
    data = '{"definition": "تقنية للحصول على نتائج تناظرية باستخدام وسائل رقمية عبر تغيير نسبة وقت التشغيل إلى وقت التوقف.", "example": "التحكم في سطوع مصباح LED أو سرعة محرك.", "definition_ar": "تقنية للحصول على نتائج تناظرية باستخدام وسائل رقمية عبر تغيير نسبة وقت التشغيل إلى وقت التوقف."}'::jsonb
WHERE id = 'iot-lab-glossary-pwm'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-raspberry-pi',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Raspberry Pi',
    data = '{"definition": "حاسوب صغير بحجم بطاقة الائتمان يمكن استخدامه في مشاريع الإلكترونيات والحوسبة.", "example": "إعداد راسبيري باي كخادم ويب منزلي.", "definition_ar": "حاسوب صغير بحجم بطاقة الائتمان يمكن استخدامه في مشاريع الإلكترونيات والحوسبة."}'::jsonb
WHERE id = 'iot-lab-glossary-raspberry-pi'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-relay-2',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Relay',
    data = '{"definition": "مفتاح كهرومغناطيسي يسمح لدائرة ذات جهد منخفض بالتحكم في دائرة ذات جهد عالي.", "example": "استخدام المُرحل للتحكم في تشغيل مضخة مياه 220 فولت بواسطة الأردوينو.", "definition_ar": "مفتاح كهرومغناطيسي يسمح لدائرة ذات جهد منخفض بالتحكم في دائرة ذات جهد عالي."}'::jsonb
WHERE id = 'iot-lab-glossary-relay-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-relay',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Relay',
    data = '{"definition": "مفتاح كهرومغناطيسي يستخدم للتحكم بدائرة كهربائية ذات جهد عالي باستخدام إشارة ذات جهد منخفض.", "example": "استخدام الأردوينو لتشغيل مصباح 220 فولت عبر الريلاي.", "definition_ar": "مفتاح كهرومغناطيسي يستخدم للتحكم بدائرة كهربائية ذات جهد عالي باستخدام إشارة ذات جهد منخفض."}'::jsonb
WHERE id = 'iot-lab-glossary-relay'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-resistance',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Resistance',
    data = '{"definition": "ممانعة المادة لمرور التيار الكهربائي فيها، وتقاس بالأوم.", "example": "استخدام مقاومة 220 أوم لحماية مصباح LED من الاحتراق.", "definition_ar": "ممانعة المادة لمرور التيار الكهربائي فيها، وتقاس بالأوم."}'::jsonb
WHERE id = 'iot-lab-glossary-resistance'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-resistor',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Resistor',
    data = '{"definition": "مكون إلكتروني سلبي يقلل من تدفق التيار الكهربائي.", "example": "توصيل مقاومة على التوالي مع LED لحمايته من التيار الزائد.", "definition_ar": "مكون إلكتروني سلبي يقلل من تدفق التيار الكهربائي."}'::jsonb
WHERE id = 'iot-lab-glossary-resistor'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-schematic',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Schematic',
    data = '{"definition": "رسم هندسي يوضح التوصيلات الكهربائية بين المكونات الإلكترونية باستخدام الرموز القياسية.", "example": "قراءة المخطط لتوصيل الدائرة بشكل صحيح على لوحة التجارب.", "definition_ar": "رسم هندسي يوضح التوصيلات الكهربائية بين المكونات الإلكترونية باستخدام الرموز القياسية."}'::jsonb
WHERE id = 'iot-lab-glossary-schematic'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-sensor',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Sensor',
    data = '{"definition": "جهاز يكتشف التغيرات في البيئة (مثل الحرارة، الضوء، أو الحركة) ويحولها إلى إشارات كهربائية.", "example": "استخدام مستشعر الموجات فوق الصوتية لقياس المسافة.", "definition_ar": "جهاز يكتشف التغيرات في البيئة (مثل الحرارة، الضوء، أو الحركة) ويحولها إلى إشارات كهربائية."}'::jsonb
WHERE id = 'iot-lab-glossary-sensor'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-serial-monitor',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Serial Monitor',
    data = '{"definition": "أداة في بيئة تطوير الأردوينو لعرض البيانات المرسلة من المتحكم الدقيق وإرسال الأوامر إليه.", "example": "طباعة قيم المستشعر على الشاشة لمراقبتها أثناء التصحيح.", "definition_ar": "أداة في بيئة تطوير الأردوينو لعرض البيانات المرسلة من المتحكم الدقيق وإرسال الأوامر إليه."}'::jsonb
WHERE id = 'iot-lab-glossary-serial-monitor'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-soldering',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Soldering',
    data = '{"definition": "عملية دمج المكونات الإلكترونية على لوحة الدوائر المطبوعة (PCB) باستخدام سبيكة معدنية قابلة للذوبان.", "example": "لحام أسلاك التوصيل بمحرك تيار مستمر لضمان اتصال قوي.", "definition_ar": "عملية دمج المكونات الإلكترونية على لوحة الدوائر المطبوعة (PCB) باستخدام سبيكة معدنية قابلة للذوبان."}'::jsonb
WHERE id = 'iot-lab-glossary-soldering'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-spi-2',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Serial Peripheral Interface',
    data = '{"definition": "بروتوكول اتصال متسلسل متزامن لنقل البيانات بسرعة بين المتحكمات الدقيقة والملحقات.", "example": "توصيل شاشة LCD بالمتحكم الدقيق باستخدام واجهة SPI.", "definition_ar": "بروتوكول اتصال متسلسل متزامن لنقل البيانات بسرعة بين المتحكمات الدقيقة والملحقات."}'::jsonb
WHERE id = 'iot-lab-glossary-spi-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-spi',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Spi',
    data = '{"definition": "بروتوكول اتصال تسلسلي سريع جداً لنقل البيانات بين المتحكم الدقيق والشرائح الأخرى.", "example": "قراءة البيانات من بطاقة SD باستخدام SPI.", "definition_ar": "بروتوكول اتصال تسلسلي سريع جداً لنقل البيانات بين المتحكم الدقيق والشرائح الأخرى."}'::jsonb
WHERE id = 'iot-lab-glossary-spi'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-transistor',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Transistor',
    data = '{"definition": "عنصر شبه موصل يستخدم كمفتاح للتحكم في تدفق التيار، أو كمكبر للإشارة.", "example": "استخدام ترانزستور للتحكم في تشغيل محرك تيار مستمر (DC) بواسطة إشارة من الأردوينو.", "definition_ar": "عنصر شبه موصل يستخدم كمفتاح للتحكم في تدفق التيار، أو كمكبر للإشارة."}'::jsonb
WHERE id = 'iot-lab-glossary-transistor'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-uart-2',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Universal Asynchronous Receiver-Transmitter',
    data = '{"definition": "بروتوكول اتصال متسلسل غير متزامن يستخدم لنقل البيانات بين جهازين.", "example": "التواصل بين شريحتي أردوينو عبر بروتوكول UART.", "definition_ar": "بروتوكول اتصال متسلسل غير متزامن يستخدم لنقل البيانات بين جهازين."}'::jsonb
WHERE id = 'iot-lab-glossary-uart-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-uart',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Uart',
    data = '{"definition": "وحدة اتصال تسلسلية غير متزامنة تستخدم لنقل البيانات بين جهازين.", "example": "نقل البيانات بين الأردوينو وجهاز الكمبيوتر عبر منفذ USB.", "definition_ar": "وحدة اتصال تسلسلية غير متزامنة تستخدم لنقل البيانات بين جهازين."}'::jsonb
WHERE id = 'iot-lab-glossary-uart'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-voltage',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Voltage',
    data = '{"definition": "مقدار القوة الدافعة للإلكترونات في الدائرة الكهربائية، ويقاس بالفولت.", "example": "قياس جهد بطارية باستخدام جهاز الملتيميتر.", "definition_ar": "مقدار القوة الدافعة للإلكترونات في الدائرة الكهربائية، ويقاس بالفولت."}'::jsonb
WHERE id = 'iot-lab-glossary-voltage'
AND status = 'draft';
UPDATE iot_glossary
SET
    slug = 'iot-lab-glossary-wifi-module',
    portal_id = 'iot-lab',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Wi-Fi Module',
    data = '{"definition": "مكون إلكتروني يتيح توصيل الأجهزة الدقيقة بشبكة الواي فاي للاتصال بالإنترنت.", "example": "توصيل وحدة ESP8266 بشبكة المنزل للتحكم في الإضاءة.", "definition_ar": "مكون إلكتروني يتيح توصيل الأجهزة الدقيقة بشبكة الواي فاي للاتصال بالإنترنت."}'::jsonb
WHERE id = 'iot-lab-glossary-wifi-module'
AND status = 'draft';


-- Table: iot_prompts
-- Expected updates: 30

UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-analog-circuit',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Analog Circuit',
    data = '{"prompt_text": "كيف تعمل دائرة مقسم الجهد (Voltage Divider) ولماذا نستخدمها في مشاريعنا؟", "instructions": "قدم مثالاً يوضح استخدام مقاومتين لتقليل الجهد العالي ليناسب الأردوينو.", "prompt_text_ar": "كيف تعمل دائرة مقسم الجهد (Voltage Divider) ولماذا نستخدمها في مشاريعنا؟"}'::jsonb
WHERE id = 'iot-lab-prompt-analog-circuit'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-arduino-blink',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Arduino Blink Code Generation',
    data = '{"prompt_text": "اكتب كود أردوينو لجعل مصباح LED المتصل بالمنفذ [رقم_المنفذ] يومض بمعدل [مدة_التأخير] مللي ثانية. اشرح الكود سطرًا بسطر.", "instructions": "أدخل رقم المنفذ المتصل به المصباح ومدة التأخير المفضلة.", "prompt_text_ar": "اكتب كود أردوينو لجعل مصباح LED المتصل بالمنفذ [رقم_المنفذ] يومض بمعدل [مدة_التأخير] مللي ثانية. اشرح الكود سطرًا بسطر."}'::jsonb
WHERE id = 'iot-lab-prompt-arduino-blink'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-battery-monitor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Battery Level Monitor',
    data = '{"prompt_text": "اكتب برنامجًا لأردوينو لقراءة الجهد من بطارية [نوع_البطارية] متصلة عبر مقسم جهد بالمنفذ [رقم_المنفذ_التناظري] وعرض نسبة الشحن المتبقية.", "instructions": "حدد نوع البطارية ورقم المنفذ التناظري المستخدم.", "prompt_text_ar": "اكتب برنامجًا لأردوينو لقراءة الجهد من بطارية [نوع_البطارية] متصلة عبر مقسم جهد بالمنفذ [رقم_المنفذ_التناظري] وعرض نسبة الشحن المتبقية."}'::jsonb
WHERE id = 'iot-lab-prompt-battery-monitor'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-button-debounce',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Button Reading with Debounce',
    data = '{"prompt_text": "قم بكتابة كود لقراءة حالة زر ضاغط متصل بالمنفذ [رقم_المنفذ] بشكل صحيح دون مشكلة الارتداد (Debouncing)، واستخدامه لتغيير حالة متغير.", "instructions": "حدد رقم المنفذ المتصل به الزر.", "prompt_text_ar": "قم بكتابة كود لقراءة حالة زر ضاغط متصل بالمنفذ [رقم_المنفذ] بشكل صحيح دون مشكلة الارتداد (Debouncing)، واستخدامه لتغيير حالة متغير."}'::jsonb
WHERE id = 'iot-lab-prompt-button-debounce'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-calibrate-sensor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Calibrate Sensor',
    data = '{"prompt_text": "كيف أستطيع معايرة مستشعر درجة الحرارة LM35 ليعطي قراءات دقيقة؟", "instructions": "اشرح الخطوات الرياضية المطلوبة لتحويل الإشارة التماثلية إلى درجة مئوية.", "prompt_text_ar": "كيف أستطيع معايرة مستشعر درجة الحرارة LM35 ليعطي قراءات دقيقة؟"}'::jsonb
WHERE id = 'iot-lab-prompt-calibrate-sensor'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-dht11-sensor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'DHT11 Sensor Reading',
    data = '{"prompt_text": "أريد كود لاستخدام حساس الحرارة والرطوبة DHT11 مع [نوع_اللوحة] لعرض درجة الحرارة بالدرجة المئوية والرطوبة بالنسبة المئوية كل [ثواني] ثانية.", "instructions": "حدد نوع اللوحة (أردوينو أو ESP32) والفاصل الزمني بين القراءات.", "prompt_text_ar": "أريد كود لاستخدام حساس الحرارة والرطوبة DHT11 مع [نوع_اللوحة] لعرض درجة الحرارة بالدرجة المئوية والرطوبة بالنسبة المئوية كل [ثواني] ثانية."}'::jsonb
WHERE id = 'iot-lab-prompt-dht11-sensor'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-esp32-vs-arduino',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Esp32 Vs Arduino',
    data = '{"prompt_text": "ما الفرق بين لوحة الأردوينو أونو ولوحة ESP32، ومتى أستخدم كل منهما؟", "instructions": "قدم مقارنة تشمل التكلفة، الاتصال بالإنترنت، وقوة المعالجة.", "prompt_text_ar": "ما الفرق بين لوحة الأردوينو أونو ولوحة ESP32، ومتى أستخدم كل منهما؟"}'::jsonb
WHERE id = 'iot-lab-prompt-esp32-vs-arduino'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-esp32-webserver',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Simple ESP32 Webserver',
    data = '{"prompt_text": "اكتب كود لجعل لوحة ESP32 تعمل كخادم ويب يعرض صفحة HTML بسيطة تحتوي على زر لتشغيل وإطفاء LED متصل بالمنفذ [رقم_المنفذ].", "instructions": "حدد رقم المنفذ المتصل به الـ LED.", "prompt_text_ar": "اكتب كود لجعل لوحة ESP32 تعمل كخادم ويب يعرض صفحة HTML بسيطة تحتوي على زر لتشغيل وإطفاء LED متصل بالمنفذ [رقم_المنفذ]."}'::jsonb
WHERE id = 'iot-lab-prompt-esp32-webserver'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-esp32-wifi',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'ESP32 Wi-Fi Setup',
    data = '{"prompt_text": "قم بكتابة كود لربط لوحة ESP32 بشبكة Wi-Fi باسم (SSID) [اسم_الشبكة] وكلمة مرور [كلمة_المرور]، مع طباعة عنوان IP عند نجاح الاتصال.", "instructions": "قدم اسم الشبكة وكلمة المرور الخاصة بها.", "prompt_text_ar": "قم بكتابة كود لربط لوحة ESP32 بشبكة Wi-Fi باسم (SSID) [اسم_الشبكة] وكلمة مرور [كلمة_المرور]، مع طباعة عنوان IP عند نجاح الاتصال."}'::jsonb
WHERE id = 'iot-lab-prompt-esp32-wifi'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-explain-pwm',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Explain Pwm',
    data = '{"prompt_text": "اشرح كيف تعمل تقنية تعديل عرض النبضة (PWM) وكيف يمكنني استخدامها لتخفيت إضاءة LED.", "instructions": "استخدم لغة سهلة مع تقديم مثال لكود أردوينو بسيط.", "prompt_text_ar": "اشرح كيف تعمل تقنية تعديل عرض النبضة (PWM) وكيف يمكنني استخدامها لتخفيت إضاءة LED."}'::jsonb
WHERE id = 'iot-lab-prompt-explain-pwm'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-fix-arduino-code',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Fix Arduino Code',
    data = '{"prompt_text": "لدي مشكلة في كود الأردوينو التالي، هل يمكنك تصحيحه؟ [أدخل الكود]", "instructions": "قم بشرح الخطأ وكيفية إصلاحه برمجياً.", "prompt_text_ar": "لدي مشكلة في كود الأردوينو التالي، هل يمكنك تصحيحه؟ [أدخل الكود]"}'::jsonb
WHERE id = 'iot-lab-prompt-fix-arduino-code'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-i2c-lcd',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Display Text on I2C LCD',
    data = '{"prompt_text": "أريد كودًا لعرض النص ''[النص_المطلوب]'' على شاشة LCD متصلة بـ [نوع_اللوحة] عبر بروتوكول I2C، مع تحديد عنوان الشاشة [عنوان_I2C].", "instructions": "أدخل النص المطلوب عرضه، ونوع اللوحة، وعنوان شاشة الـ I2C (غالباً 0x27).", "prompt_text_ar": "أريد كودًا لعرض النص ''[النص_المطلوب]'' على شاشة LCD متصلة بـ [نوع_اللوحة] عبر بروتوكول I2C، مع تحديد عنوان الشاشة [عنوان_I2C]."}'::jsonb
WHERE id = 'iot-lab-prompt-i2c-lcd'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-interrupt-usage',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Using Interrupts',
    data = '{"prompt_text": "اكتب كودًا يشرح كيفية استخدام المقاطعة الخارجية (External Interrupt) على المنفذ [رقم_منفذ_المقاطعة] لتنفيذ دالة معينة عند تغير حالة المنفذ.", "instructions": "حدد رقم منفذ المقاطعة (مثال: 2 أو 3 في أردوينو أونو).", "prompt_text_ar": "اكتب كودًا يشرح كيفية استخدام المقاطعة الخارجية (External Interrupt) على المنفذ [رقم_منفذ_المقاطعة] لتنفيذ دالة معينة عند تغير حالة المنفذ."}'::jsonb
WHERE id = 'iot-lab-prompt-interrupt-usage'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-mqtt-publish',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'MQTT Data Publishing',
    data = '{"prompt_text": "اكتب كود للوحة [نوع_اللوحة] للاتصال بوسيط MQTT على العنوان [عنوان_الوسيط] ونشر بيانات درجة الحرارة على الموضوع (Topic) [اسم_الموضوع].", "instructions": "حدد نوع اللوحة (مثل ESP32) وعنوان وسيط MQTT واسم الموضوع.", "prompt_text_ar": "اكتب كود للوحة [نوع_اللوحة] للاتصال بوسيط MQTT على العنوان [عنوان_الوسيط] ونشر بيانات درجة الحرارة على الموضوع (Topic) [اسم_الموضوع]."}'::jsonb
WHERE id = 'iot-lab-prompt-mqtt-publish'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-pid-controller',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Simple PID Controller Implementation',
    data = '{"prompt_text": "اكتب هيكل كود أساسي لتنفيذ متحكم PID في أردوينو للحفاظ على درجة حرارة عند نقطة مستهدفة [النقطة_المستهدفة] باستخدام حساس وسخان.", "instructions": "حدد النقطة المستهدفة لدرجة الحرارة.", "prompt_text_ar": "اكتب هيكل كود أساسي لتنفيذ متحكم PID في أردوينو للحفاظ على درجة حرارة عند نقطة مستهدفة [النقطة_المستهدفة] باستخدام حساس وسخان."}'::jsonb
WHERE id = 'iot-lab-prompt-pid-controller'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-pwm-led',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'LED Brightness Control with PWM',
    data = '{"prompt_text": "قم بكتابة برنامج لأردوينو لزيادة وتقليل شدة إضاءة LED متصل بالمنفذ [رقم_المنفذ_PWM] تدريجيًا باستخدام تقنية PWM.", "instructions": "حدد رقم منفذ يدعم PWM (مثل 3, 5, 6, 9, 10, 11 في أردوينو أونو).", "prompt_text_ar": "قم بكتابة برنامج لأردوينو لزيادة وتقليل شدة إضاءة LED متصل بالمنفذ [رقم_المنفذ_PWM] تدريجيًا باستخدام تقنية PWM."}'::jsonb
WHERE id = 'iot-lab-prompt-pwm-led'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-python-script-rpi',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Python Script Rpi',
    data = '{"prompt_text": "اكتب كود بايثون بسيط لتشغيل وإطفاء LED متصل بدبوس GPIO في رازبري باي.", "instructions": "أضف تعليقات توضيحية على الكود لشرح كل خطوة.", "prompt_text_ar": "اكتب كود بايثون بسيط لتشغيل وإطفاء LED متصل بدبوس GPIO في رازبري باي."}'::jsonb
WHERE id = 'iot-lab-prompt-python-script-rpi'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-raspberry-pi-gpio',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Raspberry Pi GPIO Control',
    data = '{"prompt_text": "اكتب سكريبت بلغة بايثون لتشغيل وإطفاء جهاز متصل بمنفذ GPIO رقم [رقم_المنفذ] في جهاز راسبيري باي، مع وضع فاصل زمني مقداره [ثواني] ثانية بين التشغيل والإطفاء.", "instructions": "أدخل رقم منفذ GPIO والفاصل الزمني بالثواني.", "prompt_text_ar": "اكتب سكريبت بلغة بايثون لتشغيل وإطفاء جهاز متصل بمنفذ GPIO رقم [رقم_المنفذ] في جهاز راسبيري باي، مع وضع فاصل زمني مقداره [ثواني] ثانية بين التشغيل والإطفاء."}'::jsonb
WHERE id = 'iot-lab-prompt-raspberry-pi-gpio'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-relay-module',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Relay Module Control',
    data = '{"prompt_text": "اكتب كود لتشغيل مُرحل متصل بالمنفذ [رقم_المنفذ] عندما تصل قراءة حساس الضوء إلى أقل من [قيمة_عتبة].", "instructions": "حدد رقم المنفذ للمرحل وقيمة العتبة لحساس الضوء.", "prompt_text_ar": "اكتب كود لتشغيل مُرحل متصل بالمنفذ [رقم_المنفذ] عندما تصل قراءة حساس الضوء إلى أقل من [قيمة_عتبة]."}'::jsonb
WHERE id = 'iot-lab-prompt-relay-module'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-sd-card-log',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Data Logging to SD Card',
    data = '{"prompt_text": "اكتب كود لـ [نوع_اللوحة] لحفظ قراءات حساس [نوع_الحساس] في ملف نصي باسم ''[اسم_الملف]'' على بطاقة SD متصلة عبر واجهة SPI.", "instructions": "حدد نوع اللوحة، نوع الحساس، واسم الملف (مثال: data.txt).", "prompt_text_ar": "اكتب كود لـ [نوع_اللوحة] لحفظ قراءات حساس [نوع_الحساس] في ملف نصي باسم ''[اسم_الملف]'' على بطاقة SD متصلة عبر واجهة SPI."}'::jsonb
WHERE id = 'iot-lab-prompt-sd-card-log'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-sensor-read',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Analog Sensor Reading',
    data = '{"prompt_text": "أحتاج إلى كود أردوينو لقراءة قيم من حساس [نوع_الحساس] متصل بالمنفذ التناظري [رقم_المنفذ]، مع عرض القيم على شاشة Serial Monitor.", "instructions": "حدد نوع الحساس ورقم المنفذ التناظري.", "prompt_text_ar": "أحتاج إلى كود أردوينو لقراءة قيم من حساس [نوع_الحساس] متصل بالمنفذ التناظري [رقم_المنفذ]، مع عرض القيم على شاشة Serial Monitor."}'::jsonb
WHERE id = 'iot-lab-prompt-sensor-read'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-serial-communication',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Serial Communication Between Two Boards',
    data = '{"prompt_text": "قدم كودًا للوحة المرسلة ولوحة المستقبلة لإرسال واستقبال رسالة نصية ''[الرسالة]'' باستخدام الاتصال التسلسلي (UART) بين لوحتي أردوينو.", "instructions": "أدخل الرسالة المراد إرسالها.", "prompt_text_ar": "قدم كودًا للوحة المرسلة ولوحة المستقبلة لإرسال واستقبال رسالة نصية ''[الرسالة]'' باستخدام الاتصال التسلسلي (UART) بين لوحتي أردوينو."}'::jsonb
WHERE id = 'iot-lab-prompt-serial-communication'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-servo-motor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Servo Motor Control',
    data = '{"prompt_text": "قم بإنشاء كود أردوينو لتحريك محرك سيرفو متصل بالمنفذ [رقم_المنفذ] من الزاوية 0 إلى 180 درجة، ثم العودة إلى 0 مرة أخرى.", "instructions": "حدد رقم المنفذ المتصل به محرك السيرفو.", "prompt_text_ar": "قم بإنشاء كود أردوينو لتحريك محرك سيرفو متصل بالمنفذ [رقم_المنفذ] من الزاوية 0 إلى 180 درجة، ثم العودة إلى 0 مرة أخرى."}'::jsonb
WHERE id = 'iot-lab-prompt-servo-motor'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-setup-raspberry-pi',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Setup Raspberry Pi',
    data = '{"prompt_text": "ما هي الخطوات الأولى لتجهيز جهاز رازبري باي جديد للمرة الأولى؟", "instructions": "اذكر نظام التشغيل الموصى به وكيفية تثبيته وتوصيل الشاشة.", "prompt_text_ar": "ما هي الخطوات الأولى لتجهيز جهاز رازبري باي جديد للمرة الأولى؟"}'::jsonb
WHERE id = 'iot-lab-prompt-setup-raspberry-pi'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-stepper-motor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Stepper Motor Control',
    data = '{"prompt_text": "أريد كودًا لتشغيل محرك خطوي لإكمال دورة كاملة في اتجاه عقارب الساعة ثم عكس الاتجاه، باستخدام مكتبة Stepper.h والمنفذ [منافذ_التحكم].", "instructions": "حدد المنافذ المستخدمة للتحكم في المحرك (مثال: 8,9,10,11).", "prompt_text_ar": "أريد كودًا لتشغيل محرك خطوي لإكمال دورة كاملة في اتجاه عقارب الساعة ثم عكس الاتجاه، باستخدام مكتبة Stepper.h والمنفذ [منافذ_التحكم]."}'::jsonb
WHERE id = 'iot-lab-prompt-stepper-motor'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-suggest-iot-project',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Suggest Iot Project',
    data = '{"prompt_text": "اقترح فكرة مشروع إنترنت الأشياء للمبتدئين.", "instructions": "اذكر المكونات المطلوبة وطريقة العمل بشكل مبسط.", "prompt_text_ar": "اقترح فكرة مشروع إنترنت الأشياء للمبتدئين."}'::jsonb
WHERE id = 'iot-lab-prompt-suggest-iot-project'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-troubleshoot-mqtt',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Troubleshoot Mqtt',
    data = '{"prompt_text": "جهازي لا يتصل بخادم MQTT، ما هي أهم الخطوات لاستكشاف هذه المشكلة وإصلاحها؟", "instructions": "اذكر أسباب شائعة مثل اسم المستخدم، كلمة المرور، أو مشاكل الشبكة.", "prompt_text_ar": "جهازي لا يتصل بخادم MQTT، ما هي أهم الخطوات لاستكشاف هذه المشكلة وإصلاحها؟"}'::jsonb
WHERE id = 'iot-lab-prompt-troubleshoot-mqtt'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-troubleshooting-guide',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Troubleshooting Guide',
    data = '{"prompt_text": "أواجه مشكلة [وصف_المشكلة] في مشروعي الذي يستخدم [المكونات]. ما هي الخطوات المنهجية لتتبع المشكلة وحلها؟", "instructions": "صف المشكلة التي تواجهها واذكر المكونات المستخدمة.", "prompt_text_ar": "أواجه مشكلة [وصف_المشكلة] في مشروعي الذي يستخدم [المكونات]. ما هي الخطوات المنهجية لتتبع المشكلة وحلها؟"}'::jsonb
WHERE id = 'iot-lab-prompt-troubleshooting-guide'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-ultrasonic-distance',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Distance Measurement with Ultrasonic Sensor',
    data = '{"prompt_text": "اكتب كود لقياس المسافة بالسنتيمترات باستخدام حساس HC-SR04 المتصل بالمنفذين Trig [منفذ_trig] و Echo [منفذ_echo]، وطباعة النتيجة.", "instructions": "أدخل رقم منفذ Trig ورقم منفذ Echo.", "prompt_text_ar": "اكتب كود لقياس المسافة بالسنتيمترات باستخدام حساس HC-SR04 المتصل بالمنفذين Trig [منفذ_trig] و Echo [منفذ_echo]، وطباعة النتيجة."}'::jsonb
WHERE id = 'iot-lab-prompt-ultrasonic-distance'
AND status = 'draft';
UPDATE iot_prompts
SET
    slug = 'iot-lab-prompt-wire-sensor',
    portal_id = 'iot-lab',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Wire Sensor',
    data = '{"prompt_text": "كيف أقوم بتوصيل مستشعر الحركة PIR مع الأردوينو بشكل آمن؟", "instructions": "وضح التوصيلات (الطاقة، الأرضي، إشارة البيانات) وقدم نصيحة للسلامة.", "prompt_text_ar": "كيف أقوم بتوصيل مستشعر الحركة PIR مع الأردوينو بشكل آمن؟"}'::jsonb
WHERE id = 'iot-lab-prompt-wire-sensor'
AND status = 'draft';


-- Table: iot_resources
-- Expected updates: 30

UPDATE iot_resources
SET
    slug = 'iot-lab-resource-adafruit-learn',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Adafruit Learning System',
    data = '{"url": "https://learn.adafruit.com/", "description": "مئات الشروحات والمشاريع المفتوحة المصدر للميكروكنترولر والإلكترونيات."}'::jsonb
WHERE id = 'iot-lab-resource-adafruit-learn'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-adafruit-tutorials',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Adafruit Tutorials',
    data = '{"url": "https://learn.adafruit.com/", "description": "مجموعة واسعة من الدروس والمشاريع المبتكرة لتوصيل وبرمجة المستشعرات."}'::jsonb
WHERE id = 'iot-lab-resource-adafruit-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-arduino-docs',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Arduino Docs',
    data = '{"url": "https://www.arduino.cc/en/Guide", "description": "الدليل الرسمي من أردوينو لتعلم الأساسيات والبدء في بناء المشاريع."}'::jsonb
WHERE id = 'iot-lab-resource-arduino-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-arduino-json',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'ArduinoJson Library',
    data = '{"url": "https://arduinojson.org/", "description": "مكتبة مساعدة لتحليل وتكوين كائنات JSON في بيئة الأردوينو بكفاءة."}'::jsonb
WHERE id = 'iot-lab-resource-arduino-json'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-arduino-reference',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Arduino Language Reference',
    data = '{"url": "https://www.arduino.cc/reference/en/", "description": "المرجع الرسمي لجميع دوال ومكتبات لغة البرمجة الخاصة بالأردوينو."}'::jsonb
WHERE id = 'iot-lab-resource-arduino-reference'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-blynk',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Blynk IoT Platform',
    data = '{"url": "https://blynk.io/", "description": "منصة لإنشاء واجهات تحكم للهواتف المحمولة للتحكم بمشاريع إنترنت الأشياء."}'::jsonb
WHERE id = 'iot-lab-resource-blynk'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-circuit-basics',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Circuit Basics',
    data = '{"url": "https://www.circuitbasics.com/", "description": "موقع تعليمي ممتاز يقدم شروحات مبسطة لتوصيل وبناء الدوائر الإلكترونية."}'::jsonb
WHERE id = 'iot-lab-resource-circuit-basics'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-circuitpython',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'CircuitPython',
    data = '{"url": "https://circuitpython.org/", "description": "تفرع من مايكروبايثون موجه للمبتدئين ومدعوم بشكل كبير من Adafruit."}'::jsonb
WHERE id = 'iot-lab-resource-circuitpython'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-datasheet-catalog',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Datasheets',
    data = '{"url": "https://www.alldatasheet.com/", "description": "موقع يوفر أوراق البيانات التقنية الرسمية للمكونات الإلكترونية، والتي تعد ضرورية لمعرفة خصائص الجهد والتيار لأي شريحة."}'::jsonb
WHERE id = 'iot-lab-resource-datasheet-catalog'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-esp32-datasheet',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Esp32 Datasheet',
    data = '{"url": "https://www.espressif.com/en/products/socs/esp32", "description": "المعلومات التقنية الرسمية والمواصفات الكاملة لمتحكم ESP32."}'::jsonb
WHERE id = 'iot-lab-resource-esp32-datasheet'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-esp32-idf-docs',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'ESP-IDF Programming Guide',
    data = '{"url": "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/", "description": "التوثيق الرسمي لإطار عمل تطوير إنترنت الأشياء من Espressif."}'::jsonb
WHERE id = 'iot-lab-resource-esp32-idf-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-esphome',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'ESPHome',
    data = '{"url": "https://esphome.io/", "description": "نظام لإنشاء أجهزة ذكية مخصصة تتكامل بسهولة مع Home Assistant."}'::jsonb
WHERE id = 'iot-lab-resource-esphome'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-fritzing-software',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Fritzing Software',
    data = '{"url": "https://fritzing.org/", "description": "برنامج مفتوح المصدر لتصميم الدوائر الإلكترونية على ألواح التجارب بشكل مرئي."}'::jsonb
WHERE id = 'iot-lab-resource-fritzing-software'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-fritzing',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Fritzing',
    data = '{"url": "https://fritzing.org/", "description": "أداة مفتوحة المصدر لتصميم ورسم وتوثيق الدوائر الإلكترونية للمبتدئين."}'::jsonb
WHERE id = 'iot-lab-resource-fritzing'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-home-assistant',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Home Assistant',
    data = '{"url": "https://www.home-assistant.io/", "description": "نظام تشغيل مركزي مفتوح المصدر للتحكم في الأجهزة المنزلية الذكية."}'::jsonb
WHERE id = 'iot-lab-resource-home-assistant'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-instructables-circuits',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Instructables Circuits',
    data = '{"url": "https://www.instructables.com/circuits/", "description": "آلاف المشاريع الإلكترونية المرفوعة من قبل مجتمع الصُناع (Makers)."}'::jsonb
WHERE id = 'iot-lab-resource-instructables-circuits'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-micropython-guide',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Micropython Guide',
    data = '{"url": "https://micropython.org/", "description": "الموقع الرسمي لمايكروبايثون، لغة البايثون المخصصة للعمل على المتحكمات الدقيقة."}'::jsonb
WHERE id = 'iot-lab-resource-micropython-guide'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-micropython',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'MicroPython',
    data = '{"url": "https://micropython.org/", "description": "نسخة مصغرة من لغة بايثون مصممة للعمل على المتحكمات الدقيقة."}'::jsonb
WHERE id = 'iot-lab-resource-micropython'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-mosquitto',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Eclipse Mosquitto',
    data = '{"url": "https://mosquitto.org/", "description": "وسيط رسائل مفتوح المصدر يدعم بروتوكول MQTT."}'::jsonb
WHERE id = 'iot-lab-resource-mosquitto'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-mqtt-org',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'MQTT.org',
    data = '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT يحتوي على المواصفات والتوثيق."}'::jsonb
WHERE id = 'iot-lab-resource-mqtt-org'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-mqtt-spec',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Mqtt Spec',
    data = '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT الذي يحتوي على التعريفات وآليات العمل."}'::jsonb
WHERE id = 'iot-lab-resource-mqtt-spec'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-pinout-xyz',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Raspberry Pi Pinout',
    data = '{"url": "https://pinout.xyz/", "description": "دليل تفاعلي يوضح وظائف منافذ GPIO الخاصة بجميع إصدارات راسبيري باي."}'::jsonb
WHERE id = 'iot-lab-resource-pinout-xyz'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-random-nerd-tutorials',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Random Nerd Tutorials',
    data = '{"url": "https://randomnerdtutorials.com/", "description": "موقع ممتاز للمشاريع المتقدمة الخاصة بلوحات ESP32 و ESP8266."}'::jsonb
WHERE id = 'iot-lab-resource-random-nerd-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-raspberry-pi-docs',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Raspberry Pi Documentation',
    data = '{"url": "https://www.raspberrypi.com/documentation/", "description": "أدلة المستخدم والتفاصيل التقنية لأجهزة ونظام تشغيل راسبيري باي."}'::jsonb
WHERE id = 'iot-lab-resource-raspberry-pi-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-rpi-guide',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Rpi Guide',
    data = '{"url": "https://www.raspberrypi.com/documentation/", "description": "الوثائق الرسمية لرازبري باي والتي تشمل الإعداد والبرمجة والمشاريع."}'::jsonb
WHERE id = 'iot-lab-resource-rpi-guide'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-sparkfun-tutorials',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'SparkFun Tutorials',
    data = '{"url": "https://learn.sparkfun.com/", "description": "دروس تعليمية تغطي أساسيات الإلكترونيات وحتى المشاريع المعقدة."}'::jsonb
WHERE id = 'iot-lab-resource-sparkfun-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-thingspeak',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'ThingSpeak IoT Platform',
    data = '{"url": "https://thingspeak.com/", "description": "منصة لجمع وتحليل البيانات الخاصة بإنترنت الأشياء مدعومة من MATLAB."}'::jsonb
WHERE id = 'iot-lab-resource-thingspeak'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-tinkercad-circuits-2',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Tinkercad Circuits',
    data = '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية لمحاكاة دوائر الأردوينو والإلكترونيات الأساسية على المتصفح."}'::jsonb
WHERE id = 'iot-lab-resource-tinkercad-circuits-2'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-tinkercad-circuits',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Tinkercad Circuits',
    data = '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية من أوتوديسك لمحاكاة دوائر الأردوينو والإلكترونيات برمجياً قبل بنائها في الواقع، مما يحمي القطع من التلف."}'::jsonb
WHERE id = 'iot-lab-resource-tinkercad-circuits'
AND status = 'draft';
UPDATE iot_resources
SET
    slug = 'iot-lab-resource-wokwi',
    portal_id = 'iot-lab',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Wokwi Simulator',
    data = '{"url": "https://wokwi.com/", "description": "محاكي إلكترونيات عبر الإنترنت يدعم الأردوينو و ESP32 ومايكروبايثون."}'::jsonb
WHERE id = 'iot-lab-resource-wokwi'
AND status = 'draft';


-- Table: language_glossary
-- Expected updates: 50

UPDATE language_glossary
SET
    slug = 'language-glossary-accuracy',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Accuracy',
    data = '{"definition": "استخدام القواعد والمفردات بشكل صحيح.", "example": "Accuracy is important in formal writing.", "definition_ar": "استخدام القواعد والمفردات بشكل صحيح."}'::jsonb
WHERE id = 'language-glossary-accuracy'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-active-listening',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Active Listening',
    data = '{"definition": "التركيز الكامل على المتحدث لفهم المعنى وتفاصيل النطق.", "example": "Active listening improves comprehension.", "definition_ar": "التركيز الكامل على المتحدث لفهم المعنى وتفاصيل النطق."}'::jsonb
WHERE id = 'language-glossary-active-listening'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-ai-language-coach',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'AI Coach',
    data = '{"definition": "استخدام الذكاء الاصطناعي لممارسة المحادثة وتلقي الملاحظات.", "example": "ChatGPT can act as an AI language coach.", "definition_ar": "استخدام الذكاء الاصطناعي لممارسة المحادثة وتلقي الملاحظات."}'::jsonb
WHERE id = 'language-glossary-ai-language-coach'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-a1',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR A1',
    data = '{"definition": "المستوى المبتدئ في الإطار الأوروبي المرجعي.", "example": "I am a beginner.", "definition_ar": "المستوى المبتدئ في الإطار الأوروبي المرجعي."}'::jsonb
WHERE id = 'language-glossary-cefr-a1'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-a2',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR A2',
    data = '{"definition": "المستوى الأساسي.", "example": "I can understand simple sentences.", "definition_ar": "المستوى الأساسي."}'::jsonb
WHERE id = 'language-glossary-cefr-a2'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-b1',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR B1',
    data = '{"definition": "المستوى المتوسط.", "example": "I can describe experiences and events.", "definition_ar": "المستوى المتوسط."}'::jsonb
WHERE id = 'language-glossary-cefr-b1'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-b2',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR B2',
    data = '{"definition": "المستوى فوق المتوسط.", "example": "I can understand the main ideas of complex text.", "definition_ar": "المستوى فوق المتوسط."}'::jsonb
WHERE id = 'language-glossary-cefr-b2'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-c1',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR C1',
    data = '{"definition": "المستوى المتقدم.", "example": "I can express ideas fluently and spontaneously.", "definition_ar": "المستوى المتقدم."}'::jsonb
WHERE id = 'language-glossary-cefr-c1'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-cefr-c2',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'CEFR C2',
    data = '{"definition": "المستوى المتقن.", "example": "I can understand with ease virtually everything heard or read.", "definition_ar": "المستوى المتقن."}'::jsonb
WHERE id = 'language-glossary-cefr-c2'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-chunking',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Chunking',
    data = '{"definition": "تعلم العبارات ككتلة واحدة بدلاً من كلمات منفصلة.", "example": "Chunking helps you speak faster.", "definition_ar": "تعلم العبارات ككتلة واحدة بدلاً من كلمات منفصلة."}'::jsonb
WHERE id = 'language-glossary-chunking'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-collocation',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Collocation',
    data = '{"definition": "كلمات تأتي معاً بشكل طبيعي في اللغة.", "example": "Make a mistake is a collocation.", "definition_ar": "كلمات تأتي معاً بشكل طبيعي في اللغة."}'::jsonb
WHERE id = 'language-glossary-collocation'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-comprehensible-input',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Comprehensible Input',
    data = '{"definition": "نصوص أو مقاطع صوتية تفهم معظمها ولكن تحتوي على تحدي بسيط.", "example": "Reading graded readers is comprehensible input.", "definition_ar": "نصوص أو مقاطع صوتية تفهم معظمها ولكن تحتوي على تحدي بسيط."}'::jsonb
WHERE id = 'language-glossary-comprehensible-input'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-fluency',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Fluency',
    data = '{"definition": "القدرة على التحدث بسلاسة وبدون توقف متكرر.", "example": "She speaks English with great fluency.", "definition_ar": "القدرة على التحدث بسلاسة وبدون توقف متكرر."}'::jsonb
WHERE id = 'language-glossary-fluency'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-1',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 1',
    data = '{"definition": "الإطار المرجعي الأوروبي المشترك للغات", "example": "يستخدم لتقييم مستوى اللغة.", "definition_ar": "الإطار المرجعي الأوروبي المشترك للغات"}'::jsonb
WHERE id = 'language-glossary-glossary-1'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-10',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 10',
    data = '{"definition": "الدقة", "example": "استخدام اللغة بدون أخطاء.", "definition_ar": "الدقة"}'::jsonb
WHERE id = 'language-glossary-glossary-10'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-11',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 11',
    data = '{"definition": "مصطلح", "example": "تعبير لا يمكن فهمه من معاني الكلمات المنفردة.", "definition_ar": "مصطلح"}'::jsonb
WHERE id = 'language-glossary-glossary-11'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-12',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 12',
    data = '{"definition": "فعل مركب", "example": "فعل يتكون من فعل وحرف جر.", "definition_ar": "فعل مركب"}'::jsonb
WHERE id = 'language-glossary-glossary-12'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-13',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 13',
    data = '{"definition": "مرادف", "example": "كلمة لها نفس المعنى.", "definition_ar": "مرادف"}'::jsonb
WHERE id = 'language-glossary-glossary-13'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-14',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 14',
    data = '{"definition": "مضاد", "example": "كلمة لها معنى معاكس.", "definition_ar": "مضاد"}'::jsonb
WHERE id = 'language-glossary-glossary-14'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-15',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 15',
    data = '{"definition": "بادئة", "example": "حروف تضاف في بداية الكلمة.", "definition_ar": "بادئة"}'::jsonb
WHERE id = 'language-glossary-glossary-15'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-16',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 16',
    data = '{"definition": "لاحقة", "example": "حروف تضاف في نهاية الكلمة.", "definition_ar": "لاحقة"}'::jsonb
WHERE id = 'language-glossary-glossary-16'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-17',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 17',
    data = '{"definition": "مقطع لفظي", "example": "جزء من الكلمة يحتوي على صوت متحرك.", "definition_ar": "مقطع لفظي"}'::jsonb
WHERE id = 'language-glossary-glossary-17'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-18',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 18',
    data = '{"definition": "حرف متحرك", "example": "الحروف a, e, i, o, u.", "definition_ar": "حرف متحرك"}'::jsonb
WHERE id = 'language-glossary-glossary-18'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-19',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 19',
    data = '{"definition": "حرف ساكن", "example": "باقي الحروف الأبجدية.", "definition_ar": "حرف ساكن"}'::jsonb
WHERE id = 'language-glossary-glossary-19'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-2',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 2',
    data = '{"definition": "المفردات", "example": "زيادة المفردات تساعد في التحدث بطلاقة.", "definition_ar": "المفردات"}'::jsonb
WHERE id = 'language-glossary-glossary-2'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-20',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 20',
    data = '{"definition": "التنغيم", "example": "ارتفاع وانخفاض الصوت عند التحدث.", "definition_ar": "التنغيم"}'::jsonb
WHERE id = 'language-glossary-glossary-20'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-3',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 3',
    data = '{"definition": "القواعد", "example": "القواعد السليمة تمنع سوء الفهم.", "definition_ar": "القواعد"}'::jsonb
WHERE id = 'language-glossary-glossary-3'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-4',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 4',
    data = '{"definition": "النطق", "example": "النطق الصحيح يسهل التواصل.", "definition_ar": "النطق"}'::jsonb
WHERE id = 'language-glossary-glossary-4'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-5',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 5',
    data = '{"definition": "الاستماع", "example": "مهارة أساسية لفهم المتحدثين الأصليين.", "definition_ar": "الاستماع"}'::jsonb
WHERE id = 'language-glossary-glossary-5'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-6',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 6',
    data = '{"definition": "التحدث", "example": "التدرب على التحدث يوميا يحسن الثقة.", "definition_ar": "التحدث"}'::jsonb
WHERE id = 'language-glossary-glossary-6'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-7',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 7',
    data = '{"definition": "الكتابة", "example": "كتابة فقرات واضحة مهارة مهمة.", "definition_ar": "الكتابة"}'::jsonb
WHERE id = 'language-glossary-glossary-7'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-8',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 8',
    data = '{"definition": "القراءة", "example": "قراءة المقالات الإنجليزية توسع المدارك.", "definition_ar": "القراءة"}'::jsonb
WHERE id = 'language-glossary-glossary-8'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-glossary-9',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Glossary 9',
    data = '{"definition": "الطلاقة", "example": "القدرة على التحدث بسهولة ودون توقف.", "definition_ar": "الطلاقة"}'::jsonb
WHERE id = 'language-glossary-glossary-9'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-grammar-in-context',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Grammar In Context',
    data = '{"definition": "فهم القواعد من خلال النصوص والاستخدام الفعلي.", "example": "Read stories to learn grammar in context.", "definition_ar": "فهم القواعد من خلال النصوص والاستخدام الفعلي."}'::jsonb
WHERE id = 'language-glossary-grammar-in-context'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-idiom',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Idiom',
    data = '{"definition": "تعبير لا يمكن فهم معناه من الكلمات الفردية.", "example": "It''s raining cats and dogs.", "definition_ar": "تعبير لا يمكن فهم معناه من الكلمات الفردية."}'::jsonb
WHERE id = 'language-glossary-idiom'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-immersion',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Immersion',
    data = '{"definition": "إحاطة نفسك باللغة الهدف في كل جوانب حياتك.", "example": "Immersion accelerates learning.", "definition_ar": "إحاطة نفسك باللغة الهدف في كل جوانب حياتك."}'::jsonb
WHERE id = 'language-glossary-immersion'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-intonation',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Intonation',
    data = '{"definition": "ارتفاع وانخفاض الصوت أثناء الكلام للتعبير عن المعنى أو المشاعر.", "example": "A rising intonation is used for questions.", "definition_ar": "ارتفاع وانخفاض الصوت أثناء الكلام للتعبير عن المعنى أو المشاعر."}'::jsonb
WHERE id = 'language-glossary-intonation'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-language-acquisition',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Acquisition',
    data = '{"definition": "التعلم الطبيعي واللاواعي للغة.", "example": "Children show rapid language acquisition.", "definition_ar": "التعلم الطبيعي واللاواعي للغة."}'::jsonb
WHERE id = 'language-glossary-language-acquisition'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-language-exchange',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Exchange',
    data = '{"definition": "ممارسة اللغة مع متحدث أصلي يتعلم لغتك.", "example": "I met a language exchange partner online.", "definition_ar": "ممارسة اللغة مع متحدث أصلي يتعلم لغتك."}'::jsonb
WHERE id = 'language-glossary-language-exchange'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-language-learning',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Learning',
    data = '{"definition": "الدراسة الواعية للقواعد والمفردات.", "example": "Language learning requires active effort.", "definition_ar": "الدراسة الواعية للقواعد والمفردات."}'::jsonb
WHERE id = 'language-glossary-language-learning'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-minimal-pairs',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Minimal Pairs',
    data = '{"definition": "كلمتان تختلفان في صوت واحد فقط، تستخدم للتدريب على النطق.", "example": "Ship and sheep are minimal pairs.", "definition_ar": "كلمتان تختلفان في صوت واحد فقط، تستخدم للتدريب على النطق."}'::jsonb
WHERE id = 'language-glossary-minimal-pairs'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-mother-tongue-interference',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Mother Tongue Interference',
    data = '{"definition": "تأثير قواعد ونطق اللغة الأم على اللغة المتعلمة.", "example": "Translating directly causes mother tongue interference.", "definition_ar": "تأثير قواعد ونطق اللغة الأم على اللغة المتعلمة."}'::jsonb
WHERE id = 'language-glossary-mother-tongue-interference'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-passive-listening',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Passive Listening',
    data = '{"definition": "الاستماع للغة في الخلفية دون تركيز كامل.", "example": "Passive listening helps get used to the sounds.", "definition_ar": "الاستماع للغة في الخلفية دون تركيز كامل."}'::jsonb
WHERE id = 'language-glossary-passive-listening'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-phrasal-verb',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Phrasal Verb',
    data = '{"definition": "فعل يتكون من فعل وحرف جر أو حال يغير معناه.", "example": "Give up means to stop trying.", "definition_ar": "فعل يتكون من فعل وحرف جر أو حال يغير معناه."}'::jsonb
WHERE id = 'language-glossary-phrasal-verb'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-pronunciation',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Pronunciation',
    data = '{"definition": "طريقة إخراج الأصوات في اللغة.", "example": "Good pronunciation makes you understood.", "definition_ar": "طريقة إخراج الأصوات في اللغة."}'::jsonb
WHERE id = 'language-glossary-pronunciation'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-self-correction',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Self Correction',
    data = '{"definition": "ملاحظة وتصحيح أخطائك أثناء التحدث أو الكتابة.", "example": "Self-correction is a sign of progress.", "definition_ar": "ملاحظة وتصحيح أخطائك أثناء التحدث أو الكتابة."}'::jsonb
WHERE id = 'language-glossary-self-correction'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-shadowing',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Shadowing',
    data = '{"definition": "تقنية استماع وتكرار فوري لتحسين النطق والإيقاع.", "example": "Shadowing helps with pronunciation.", "definition_ar": "تقنية استماع وتكرار فوري لتحسين النطق والإيقاع."}'::jsonb
WHERE id = 'language-glossary-shadowing'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-spaced-repetition',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Spaced Repetition',
    data = '{"definition": "نظام مراجعة المفردات على فترات متباعدة لتثبيتها في الذاكرة.", "example": "Anki uses spaced repetition.", "definition_ar": "نظام مراجعة المفردات على فترات متباعدة لتثبيتها في الذاكرة."}'::jsonb
WHERE id = 'language-glossary-spaced-repetition'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-stress',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Stress',
    data = '{"definition": "التشديد على مقطع معين في الكلمة أو كلمة في الجملة.", "example": "In ''record'', the stress is on the first syllable for the noun.", "definition_ar": "التشديد على مقطع معين في الكلمة أو كلمة في الجملة."}'::jsonb
WHERE id = 'language-glossary-stress'
AND status = 'draft';
UPDATE language_glossary
SET
    slug = 'language-glossary-vocabulary-in-context',
    portal_id = 'language',
    content_type = 'glossary',
    status = 'draft',
    title_en = 'Vocabulary In Context',
    data = '{"definition": "تعلم الكلمات من خلال الجمل والمواقف وليس القوائم المنعزلة.", "example": "Learning vocabulary in context is more effective.", "definition_ar": "تعلم الكلمات من خلال الجمل والمواقف وليس القوائم المنعزلة."}'::jsonb
WHERE id = 'language-glossary-vocabulary-in-context'
AND status = 'draft';


-- Table: language_lessons
-- Expected updates: 20

UPDATE language_lessons
SET
    slug = 'language-lesson-active-vs-passive-listening',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Active vs. Passive Listening',
    excerpt_ar = 'الفرق بين النوعين وكيف توظف كل منهما لرفع كفاءة فهمك للمسموع.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-active-vs-passive-listening'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-conversation-practice',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Effective Conversation Practice',
    excerpt_ar = 'كيف تجد شركاء لغة وكيف تدير محادثة ناجحة لتعظيم الاستفادة.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-conversation-practice'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-grammar-in-context-2',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Learning Grammar in Context',
    excerpt_ar = 'توقف عن حفظ القواعد وابدأ في استيعابها من خلال القراءة والاستماع.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-grammar-in-context-2'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-how-to-start-speaking',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'How to Start Speaking with Confidence',
    excerpt_ar = 'نصائح عملية للتغلب على حاجز الخوف والبدء بالمحادثة فوراً.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-how-to-start-speaking'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-interview-english',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'English for Job Interviews',
    excerpt_ar = 'أهم العبارات والأسئلة الشائعة في مقابلات العمل وكيفية الإجابة عنها بثقة.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-interview-english'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-introduction-to-cefr',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Introduction to CEFR Levels',
    excerpt_ar = 'شرح تفصيلي لمستويات اللغة الأوروبية المرجعية وكيف تحدد مستواك.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-introduction-to-cefr'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-1',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 1',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول مقدمة إلى مستويات CEFR.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-1'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-2',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 2',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول أساسيات المحادثة.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-2'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-3',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 3',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول كيف تكتب فقرة إنجليزية واضحة.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-3'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-4',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 4',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول تحسين مهارة الاستماع.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-4'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-5',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 5',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول نظام فعال لحفظ المفردات.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-5'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-lesson-6',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Lesson 6',
    excerpt_ar = 'مرحباً بك في هذا الدرس حول الذكاء الاصطناعي كمدرب لغوي.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-lesson-6'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-mastering-shadowing',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Mastering the Shadowing Technique',
    excerpt_ar = 'خطوات عملية لاستخدام تقنية التظليل لتحسين النطق بشكل جذري.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-mastering-shadowing'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-perfecting-pronunciation',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Perfecting Pronunciation and Sounds',
    excerpt_ar = 'التركيز على الأصوات الصعبة للناطقين بالعربية وتدريبات للتغلب عليها.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-perfecting-pronunciation'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-self-correction-techniques',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Self-Correction Techniques',
    excerpt_ar = 'كيف تلاحظ أخطاءك أثناء الكلام وتصححها لتحسين دقة لغتك.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-self-correction-techniques'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-stop-translating',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Stop Translating in Your Head',
    excerpt_ar = 'استراتيجيات للتفكير باللغة الإنجليزية مباشرة بدلاً من الترجمة من العربية.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-stop-translating'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-using-ai-coaches',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Using AI as a Language Coach',
    excerpt_ar = 'طرق فعالة لاستخدام ChatGPT وأدوات الذكاء الاصطناعي لتحسين لغتك.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-using-ai-coaches'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-vocabulary-systems',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Building an Effective Vocabulary System',
    excerpt_ar = 'كيفية استخدام تطبيقات مثل Anki لتذكر الكلمات للأبد.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-vocabulary-systems'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-weekly-progress-tracking',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Weekly Progress Tracking',
    excerpt_ar = 'كيفية قياس تطورك في اللغة الإنجليزية بشكل دوري وموضوعي.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-weekly-progress-tracking'
AND status = 'draft';
UPDATE language_lessons
SET
    slug = 'language-lesson-writing-clear-paragraphs',
    portal_id = 'language',
    content_type = 'lesson',
    status = 'draft',
    title_en = 'Writing Clear English Paragraphs',
    excerpt_ar = 'أساسيات كتابة جمل صحيحة وربطها لتكوين فقرة متماسكة.',
    data = '{}'::jsonb
WHERE id = 'language-lesson-writing-clear-paragraphs'
AND status = 'draft';


-- Table: language_prompts
-- Expected updates: 30

UPDATE language_prompts
SET
    slug = 'language-prompt-accent-coach',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Accent Coach',
    data = '{"prompt_text": "What are the differences in pronouncing [الكلمة] in US vs UK English?", "instructions": "التعرف على الفروق بين اللهجات المختلفة.", "prompt_text_ar": "What are the differences in pronouncing [الكلمة] in US vs UK English?"}'::jsonb
WHERE id = 'language-prompt-accent-coach'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-cultural-context',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Cultural Context',
    data = '{"prompt_text": "Explain the cultural context behind the phrase [العبارة].", "instructions": "فهم الفروق الثقافية في اللغة.", "prompt_text_ar": "Explain the cultural context behind the phrase [العبارة]."}'::jsonb
WHERE id = 'language-prompt-cultural-context'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-daily-journal',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Daily Journal',
    data = '{"prompt_text": "Review my daily journal entry and suggest better vocabulary: [اليوميات].", "instructions": "تحسين كتابتك اليومية وتطوير أسلوبك.", "prompt_text_ar": "Review my daily journal entry and suggest better vocabulary: [اليوميات]."}'::jsonb
WHERE id = 'language-prompt-daily-journal'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-debate-opponent',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Debate Opponent',
    data = '{"prompt_text": "Argue against my opinion on [الموضوع]. My opinion is [رأيي].", "instructions": "طور مهارات الإقناع والمناقشة بالإنجليزية.", "prompt_text_ar": "Argue against my opinion on [الموضوع]. My opinion is [رأيي]."}'::jsonb
WHERE id = 'language-prompt-debate-opponent'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-email-drafter',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Email Drafter',
    data = '{"prompt_text": "Help me draft a professional email about [الموضوع] to [المتلقي].", "instructions": "صياغة رسائل بريد إلكتروني احترافية.", "prompt_text_ar": "Help me draft a professional email about [الموضوع] to [المتلقي]."}'::jsonb
WHERE id = 'language-prompt-email-drafter'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-grammar-checker',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Grammar Checker',
    data = '{"prompt_text": "Correct my grammar and explain the mistakes: [النص].", "instructions": "اكتب نصك ليتم تصحيحه مع الشرح.", "prompt_text_ar": "Correct my grammar and explain the mistakes: [النص]."}'::jsonb
WHERE id = 'language-prompt-grammar-checker'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-idiom-explainer',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Idiom Explainer',
    data = '{"prompt_text": "Explain the idiom [المصطلح] and give 3 examples.", "instructions": "فهم المصطلحات الإنجليزية وكيفية استخدامها.", "prompt_text_ar": "Explain the idiom [المصطلح] and give 3 examples."}'::jsonb
WHERE id = 'language-prompt-idiom-explainer'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-listening-comprehension',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Listening Comprehension',
    data = '{"prompt_text": "Write a short dialogue about [الموضوع] and generate 3 comprehension questions.", "instructions": "تدريب على الفهم من خلال نصوص قصيرة.", "prompt_text_ar": "Write a short dialogue about [الموضوع] and generate 3 comprehension questions."}'::jsonb
WHERE id = 'language-prompt-listening-comprehension'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-paragraph-improver',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Paragraph Improver',
    data = '{"prompt_text": "Rewrite this paragraph to make it sound more natural and professional: [الفقرة].", "instructions": "تحسين صياغة فقراتك لتصبح طبيعية أكثر.", "prompt_text_ar": "Rewrite this paragraph to make it sound more natural and professional: [الفقرة]."}'::jsonb
WHERE id = 'language-prompt-paragraph-improver'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-phrasal-verb-story',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Phrasal Verb Story',
    data = '{"prompt_text": "Write a story focusing on phrasal verbs related to [الموضوع].", "instructions": "تعلم الأفعال المركبة من خلال سياق قصصي.", "prompt_text_ar": "Write a story focusing on phrasal verbs related to [الموضوع]."}'::jsonb
WHERE id = 'language-prompt-phrasal-verb-story'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-presentation-prep',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Presentation Prep',
    data = '{"prompt_text": "Give me feedback on the opening of my presentation: [مقدمة العرض].", "instructions": "تدرب على إلقاء العروض التقديمية.", "prompt_text_ar": "Give me feedback on the opening of my presentation: [مقدمة العرض]."}'::jsonb
WHERE id = 'language-prompt-presentation-prep'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-1',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 1',
    data = '{"prompt_text": "قم بدور متحدث أصلي للغة الإنجليزية.", "instructions": "ابدأ المحادثة بسؤال بسيط عن يومي.", "prompt_text_ar": "قم بدور متحدث أصلي للغة الإنجليزية."}'::jsonb
WHERE id = 'language-prompt-prompt-1'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-10',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 10',
    data = '{"prompt_text": "أعطني كلمات عشوائية لأكون منها جملاً.", "instructions": "قم بتصحيح الجمل التي أكتبها.", "prompt_text_ar": "أعطني كلمات عشوائية لأكون منها جملاً."}'::jsonb
WHERE id = 'language-prompt-prompt-10'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-2',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 2',
    data = '{"prompt_text": "قم بتصحيح الأخطاء النحوية في النص.", "instructions": "اشرح سبب كل خطأ وكيفية تصحيحه.", "prompt_text_ar": "قم بتصحيح الأخطاء النحوية في النص."}'::jsonb
WHERE id = 'language-prompt-prompt-2'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-3',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 3',
    data = '{"prompt_text": "اقترح كلمات بديلة ومتقدمة.", "instructions": "استبدل الكلمات البسيطة بمرادفاتها المناسبة.", "prompt_text_ar": "اقترح كلمات بديلة ومتقدمة."}'::jsonb
WHERE id = 'language-prompt-prompt-3'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-4',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 4',
    data = '{"prompt_text": "اطرح أسئلة مقابلة عمل باللغة الإنجليزية.", "instructions": "انتظر إجابتي ثم قدم ملاحظاتك.", "prompt_text_ar": "اطرح أسئلة مقابلة عمل باللغة الإنجليزية."}'::jsonb
WHERE id = 'language-prompt-prompt-4'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-5',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 5',
    data = '{"prompt_text": "اكتب فقرة قصيرة ثم اطرح أسئلة حولها.", "instructions": "تأكد من تنوع الأسئلة لاختبار الفهم.", "prompt_text_ar": "اكتب فقرة قصيرة ثم اطرح أسئلة حولها."}'::jsonb
WHERE id = 'language-prompt-prompt-5'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-6',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 6',
    data = '{"prompt_text": "اشرح المصطلح الإنجليزي المعطى.", "instructions": "قدم أمثلة على كيفية استخدامه في جمل مفيدة.", "prompt_text_ar": "اشرح المصطلح الإنجليزي المعطى."}'::jsonb
WHERE id = 'language-prompt-prompt-6'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-7',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 7',
    data = '{"prompt_text": "قم بتقييم مقالي الأكاديمي.", "instructions": "ركز على بنية الجملة والترابط بين الأفكار.", "prompt_text_ar": "قم بتقييم مقالي الأكاديمي."}'::jsonb
WHERE id = 'language-prompt-prompt-7'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-8',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 8',
    data = '{"prompt_text": "اقترح كلمات إنجليزية صعبة النطق.", "instructions": "اكتبها مع طريقة نطقها الصحيحة.", "prompt_text_ar": "اقترح كلمات إنجليزية صعبة النطق."}'::jsonb
WHERE id = 'language-prompt-prompt-8'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-prompt-9',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Prompt 9',
    data = '{"prompt_text": "اشرح معنى الفعل المركب.", "instructions": "قدم ثلاثة أمثلة في سياقات مختلفة.", "prompt_text_ar": "اشرح معنى الفعل المركب."}'::jsonb
WHERE id = 'language-prompt-prompt-9'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-pronunciation-guide',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Pronunciation Guide',
    data = '{"prompt_text": "How do I pronounce [الكلمة]? Describe the mouth movements.", "instructions": "تعلم النطق الصحيح للكلمات الصعبة.", "prompt_text_ar": "How do I pronounce [الكلمة]? Describe the mouth movements."}'::jsonb
WHERE id = 'language-prompt-pronunciation-guide'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-reading-summary',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Reading Summary',
    data = '{"prompt_text": "Summarize this article in simple B1 level English: [المقال].", "instructions": "تبسيط المقالات لتناسب مستواك.", "prompt_text_ar": "Summarize this article in simple B1 level English: [المقال]."}'::jsonb
WHERE id = 'language-prompt-reading-summary'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-roleplay-interview',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Roleplay Interview',
    data = '{"prompt_text": "Conduct a job interview in English for the position of [الوظيفة].", "instructions": "تدرب على مقابلات العمل باللغة الإنجليزية.", "prompt_text_ar": "Conduct a job interview in English for the position of [الوظيفة]."}'::jsonb
WHERE id = 'language-prompt-roleplay-interview'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-slang-translator',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Slang Translator',
    data = '{"prompt_text": "Translate this slang phrase into formal English: [العبارة].", "instructions": "تعرف على العامية وما يقابلها رسمياً.", "prompt_text_ar": "Translate this slang phrase into formal English: [العبارة]."}'::jsonb
WHERE id = 'language-prompt-slang-translator'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-small-talk',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Small Talk',
    data = '{"prompt_text": "Let''s practice small talk. Start a conversation about [الموضوع].", "instructions": "التدرب على المحادثات الخفيفة في المواقف الاجتماعية.", "prompt_text_ar": "Let''s practice small talk. Start a conversation about [الموضوع]."}'::jsonb
WHERE id = 'language-prompt-small-talk'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-speaking-partner',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Speaking Partner',
    data = '{"prompt_text": "Act as an English speaking partner. Ask me questions about [الموضوع].", "instructions": "تحدث مع الذكاء الاصطناعي كشريك محادثة.", "prompt_text_ar": "Act as an English speaking partner. Ask me questions about [الموضوع]."}'::jsonb
WHERE id = 'language-prompt-speaking-partner'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-story-generator',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Story Generator',
    data = '{"prompt_text": "Write a short story using these vocabulary words: [الكلمات].", "instructions": "قصص قصيرة لتثبيت الكلمات الجديدة.", "prompt_text_ar": "Write a short story using these vocabulary words: [الكلمات]."}'::jsonb
WHERE id = 'language-prompt-story-generator'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-translation-corrector',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Translation Corrector',
    data = '{"prompt_text": "I translated this from Arabic: [الترجمة]. How would a native speaker say it?", "instructions": "تجنب الترجمة الحرفية وتحدث كأصحاب اللغة.", "prompt_text_ar": "I translated this from Arabic: [الترجمة]. How would a native speaker say it?"}'::jsonb
WHERE id = 'language-prompt-translation-corrector'
AND status = 'draft';
UPDATE language_prompts
SET
    slug = 'language-prompt-vocabulary-expander',
    portal_id = 'language',
    content_type = 'prompt',
    status = 'draft',
    title_en = 'Vocabulary Expander',
    data = '{"prompt_text": "Give me 5 synonyms and antonyms for [الكلمة] with example sentences.", "instructions": "احصل على مرادفات وأضداد للكلمات.", "prompt_text_ar": "Give me 5 synonyms and antonyms for [الكلمة] with example sentences."}'::jsonb
WHERE id = 'language-prompt-vocabulary-expander'
AND status = 'draft';


-- Table: language_resources
-- Expected updates: 30

UPDATE language_resources
SET
    slug = 'language-resource-anki',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Anki',
    data = '{"url": "https://apps.ankiweb.net/", "description": "برنامج لإنشاء بطاقات استذكار ذكية."}'::jsonb
WHERE id = 'language-resource-anki'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-bbc-learning-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Bbc Learning English',
    data = '{"url": "https://www.bbc.co.uk/learningenglish", "description": "مصدر ممتاز للدروس الصوتية والمرئية."}'::jsonb
WHERE id = 'language-resource-bbc-learning-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-breaking-news-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Breaking News English',
    data = '{"url": "https://breakingnewsenglish.com/", "description": "دروس مبنية على الأخبار بمستويات قراءة متعددة."}'::jsonb
WHERE id = 'language-resource-breaking-news-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-british-council',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'British Council',
    data = '{"url": "https://learnenglish.britishcouncil.org/", "description": "دروس وتدريبات لكافة المستويات."}'::jsonb
WHERE id = 'language-resource-british-council'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-cambridge-dictionary',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Cambridge Dictionary',
    data = '{"url": "https://dictionary.cambridge.org/", "description": "قاموس شامل مع أمثلة ونطق."}'::jsonb
WHERE id = 'language-resource-cambridge-dictionary'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-coursera-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Coursera English',
    data = '{"url": "https://www.coursera.org/courses?query=english", "description": "دورات أكاديمية لتحسين اللغة."}'::jsonb
WHERE id = 'language-resource-coursera-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-duolingo',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Duolingo',
    data = '{"url": "https://www.duolingo.com/", "description": "تطبيق مشهور للتدريب اليومي."}'::jsonb
WHERE id = 'language-resource-duolingo'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-elllo',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Elllo',
    data = '{"url": "https://elllo.org/", "description": "مكتبة ضخمة لمقاطع الاستماع مع نصوص."}'::jsonb
WHERE id = 'language-resource-elllo'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-english-club',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'English Club',
    data = '{"url": "https://www.englishclub.com/", "description": "موارد شاملة للقواعد والمفردات والمنتديات."}'::jsonb
WHERE id = 'language-resource-english-club'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-engvid',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Engvid',
    data = '{"url": "https://www.engvid.com/", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة."}'::jsonb
WHERE id = 'language-resource-engvid'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-esl-lab',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Esl Lab',
    data = '{"url": "https://www.esl-lab.com/", "description": "اختبارات استماع مسجلة بمستويات مختلفة."}'::jsonb
WHERE id = 'language-resource-esl-lab'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-grammarly',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Grammarly',
    data = '{"url": "https://www.grammarly.com/", "description": "أداة لتصحيح القواعد والكتابة."}'::jsonb
WHERE id = 'language-resource-grammarly'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-memrise',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Memrise',
    data = '{"url": "https://www.memrise.com/", "description": "تطبيق لتعلم المفردات باستخدام التكرار المتباعد."}'::jsonb
WHERE id = 'language-resource-memrise'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-oxford-learners-dictionaries',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Oxford Learners Dictionaries',
    data = '{"url": "https://www.oxfordlearnersdictionaries.com/", "description": "قاموس موجه لمتعلمي اللغة الإنجليزية."}'::jsonb
WHERE id = 'language-resource-oxford-learners-dictionaries'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-quizlet',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Quizlet',
    data = '{"url": "https://quizlet.com/", "description": "أداة لإنشاء ومراجعة قوائم المفردات."}'::jsonb
WHERE id = 'language-resource-quizlet'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-rachel-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Rachel English',
    data = '{"url": "https://rachelsenglish.com/", "description": "قناة وموقع ممتاز لتعلم النطق الأمريكي."}'::jsonb
WHERE id = 'language-resource-rachel-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-1',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 1',
    data = '{"url": "https://www.bbc.co.uk/learningenglish", "description": "موقع ممتاز لتحسين مهارات الاستماع والقراءة."}'::jsonb
WHERE id = 'language-resource-resource-1'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-10',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 10',
    data = '{"url": "https://www.engvid.com", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة الإنجليزية."}'::jsonb
WHERE id = 'language-resource-resource-10'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-2',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 2',
    data = '{"url": "https://dictionary.cambridge.org", "description": "قاموس إنجليزي موثوق مع أمثلة ونطق."}'::jsonb
WHERE id = 'language-resource-resource-2'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-3',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 3',
    data = '{"url": "https://www.duolingo.com", "description": "تطبيق مجاني لتعلم الأساسيات بطريقة ممتعة."}'::jsonb
WHERE id = 'language-resource-resource-3'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-4',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 4',
    data = '{"url": "https://www.ted.com", "description": "مقاطع فيديو ملهمة لتحسين مهارة الاستماع."}'::jsonb
WHERE id = 'language-resource-resource-4'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-5',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 5',
    data = '{"url": "https://www.cambridge.org", "description": "كتاب مرجعي رائع للقواعد."}'::jsonb
WHERE id = 'language-resource-resource-5'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-6',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 6',
    data = '{"url": "https://www.oxfordlearnersdictionaries.com", "description": "قاموس ممتاز للمتعلمين مع شروحات مبسطة."}'::jsonb
WHERE id = 'language-resource-resource-6'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-7',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 7',
    data = '{"url": "https://www.coursera.org", "description": "دورة مجانية لتحسين الإنجليزية لأغراض العمل."}'::jsonb
WHERE id = 'language-resource-resource-7'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-8',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 8',
    data = '{"url": "https://learnenglish.britishcouncil.org", "description": "موارد تعليمية مجانية للطلاب من جميع المستويات."}'::jsonb
WHERE id = 'language-resource-resource-8'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-resource-9',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Resource 9',
    data = '{"url": "https://rachelsenglish.com", "description": "قناة يوتيوب ممتازة لتحسين النطق الأمريكي."}'::jsonb
WHERE id = 'language-resource-resource-9'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-talk-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Talk English',
    data = '{"url": "https://www.talkenglish.com/", "description": "دروس محادثة ونطق وتدريبات استماع."}'::jsonb
WHERE id = 'language-resource-talk-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-ted-talks',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Ted Talks',
    data = '{"url": "https://www.ted.com/", "description": "محاضرات ملهمة مفيدة للاستماع المتقدم."}'::jsonb
WHERE id = 'language-resource-ted-talks'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-voa-learning-english',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Voa Learning English',
    data = '{"url": "https://learningenglish.voanews.com/", "description": "أخبار ومقالات بلغة مبسطة."}'::jsonb
WHERE id = 'language-resource-voa-learning-english'
AND status = 'draft';
UPDATE language_resources
SET
    slug = 'language-resource-youglish',
    portal_id = 'language',
    content_type = 'resource',
    status = 'draft',
    title_en = 'Youglish',
    data = '{"url": "https://youglish.com/", "description": "ابحث عن نطق أي كلمة في سياقات حقيقية على يوتيوب."}'::jsonb
WHERE id = 'language-resource-youglish'
AND status = 'draft';



-- Verification Selects (Commented out but useful for manual inspection)
-- SELECT count(*) FROM ai_lessons WHERE status = 'draft';
-- SELECT count(*) FROM ai_resources WHERE status = 'draft';
-- SELECT count(*) FROM automation_lessons WHERE status = 'draft';
-- SELECT count(*) FROM automation_resources WHERE status = 'draft';
-- SELECT count(*) FROM career_glossary WHERE status = 'draft';
-- SELECT count(*) FROM career_lessons WHERE status = 'draft';
-- SELECT count(*) FROM career_prompts WHERE status = 'draft';
-- SELECT count(*) FROM career_resources WHERE status = 'draft';
-- SELECT count(*) FROM digital_exams_glossary WHERE status = 'draft';
-- SELECT count(*) FROM digital_exams_lessons WHERE status = 'draft';
-- SELECT count(*) FROM digital_exams_prompts WHERE status = 'draft';
-- SELECT count(*) FROM digital_exams_resources WHERE status = 'draft';
-- SELECT count(*) FROM iot_glossary WHERE status = 'draft';
-- SELECT count(*) FROM iot_prompts WHERE status = 'draft';
-- SELECT count(*) FROM iot_resources WHERE status = 'draft';
-- SELECT count(*) FROM language_glossary WHERE status = 'draft';
-- SELECT count(*) FROM language_lessons WHERE status = 'draft';
-- SELECT count(*) FROM language_prompts WHERE status = 'draft';
-- SELECT count(*) FROM language_resources WHERE status = 'draft';

-- This transaction is safely wrapped.
-- Change ROLLBACK to COMMIT below only after careful review in Supabase SQL Editor.

ROLLBACK;
-- COMMIT;
