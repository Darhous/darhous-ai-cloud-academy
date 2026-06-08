-- Tier-A Draft Metadata Sync Package
-- GENERATED AUTOMATICALLY. DO NOT EXECUTE WITHOUT REVIEW.
-- This regenerated package is schema-compatible with the verified Supabase tables.
-- It does not update slug/excerpt_ar/excerpt_en as physical columns because those columns do not exist.
-- Scope: 19 Tier-A tables, Draft records only.

BEGIN;

-- Table: ai_lessons
-- Expected updates: 20

UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Advanced Prompting Techniques',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-advanced-prompting", "excerpt_ar": "بعد إتقان الأساسيات، ننتقل إلى تقنيات متقدمة مثل Few-shot prompting (تقديم أمثلة) و Chain of Thought (سلسلة الأفكار). هذه التقنيات تساعد النماذج على ح..."}'::jsonb,
    title_ar = 'تقنيات التوجيه المتقدمة'
WHERE id = 'ai-academy-lesson-advanced-prompting'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Ethics and AI',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-ethics", "excerpt_ar": "مع القوة الكبيرة تأتي مسؤولية أكبر. نناقش هنا القضايا الأخلاقية المرتبطة باستخدام الذكاء الاصطناعي، مثل التحيز في البيانات، الخصوصية، وحقوق الملكية ال..."}'::jsonb,
    title_ar = 'الأخلاقيات والذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-ai-ethics'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Ai For Study',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-for-study-2", "excerpt_ar": "# الذكاء الاصطناعي كمعلمك الخاص"}'::jsonb,
    title_ar = 'الذكاء الاصطناعي كمعلمك الخاص'
WHERE id = 'ai-academy-lesson-ai-for-study-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'AI for Study',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-for-study", "excerpt_ar": "كيف نستخدم الذكاء الاصطناعي كمدرس خصوصي بدلاً من أداة لحل الواجبات؟ سنتعلم كيفية توجيه الذكاء الاصطناعي لإنشاء خطط دراسية، شرح المفاهيم المعقدة بطرق م..."}'::jsonb,
    title_ar = 'استخدام الذكاء الاصطناعي للدراسة'
WHERE id = 'ai-academy-lesson-ai-for-study'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Ai For Work',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-for-work-2", "excerpt_ar": "# تعزيز الإنتاجية باستخدام الذكاء الاصطناعي"}'::jsonb,
    title_ar = 'تعزيز الإنتاجية باستخدام الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-ai-for-work-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'AI for Work',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-for-work", "excerpt_ar": "في بيئة العمل، يمكن للذكاء الاصطناعي أن يكون مساعدك الشخصي الفعال. استكشف كيف يمكنك أتمتة صياغة رسائل البريد الإلكتروني، تلخيص الاجتماعات والمستندات ا..."}'::jsonb,
    title_ar = 'استخدام الذكاء الاصطناعي للعمل'
WHERE id = 'ai-academy-lesson-ai-for-work'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Ai Hallucination',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-ai-hallucination", "excerpt_ar": "# هلوسة الذكاء الاصطناعي: عندما تكذب الآلة بثقة"}'::jsonb,
    title_ar = 'هلوسة الذكاء الاصطناعي: عندما تكذب الآلة بثقة'
WHERE id = 'ai-academy-lesson-ai-hallucination'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Detecting Hallucinations',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-detecting-hallucinations", "excerpt_ar": "أحد أكبر تحديات النماذج اللغوية هو ''الهلوسة'' - تقديم معلومات خاطئة بثقة تامة. في هذا الدرس، سنتعلم استراتيجيات للتعرف على الهلوسة، مثل طلب المصادر، وا..."}'::jsonb,
    title_ar = 'اكتشاف الهلوسة'
WHERE id = 'ai-academy-lesson-detecting-hallucinations'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Evaluating Models',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-evaluating-models", "excerpt_ar": "كيف تختار النموذج المناسب لمهمتك؟ مقارنة بين GPT-4، Claude، وGemini. سنتعلم كيفية تقييم النماذج بناءً على عوامل مثل الدقة، السرعة، طول نافذة السياق، و..."}'::jsonb,
    title_ar = 'تقييم النماذج'
WHERE id = 'ai-academy-lesson-evaluating-models'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Future of AI',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-future-of-ai", "excerpt_ar": "نظرة مستقبلية على التقنيات الناشئة في مجال الذكاء الاصطناعي، مثل الوكلاء المستقلين (Autonomous Agents) والذكاء الاصطناعي العام (AGI). كيف نستعد لهذه ا..."}'::jsonb,
    title_ar = 'مستقبل الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-future-of-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'How To Prompt',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-how-to-prompt", "excerpt_ar": "# هندسة الأوامر: فن التحدث مع الآلة"}'::jsonb,
    title_ar = 'هندسة الأوامر: فن التحدث مع الآلة'
WHERE id = 'ai-academy-lesson-how-to-prompt'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Independent Learning with AI',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-independent-learning", "excerpt_ar": "الهدف الأسمى هو استخدام الذكاء الاصطناعي لتعزيز مهاراتك لا استبدالها. استراتيجيات لتجنب ''الاعتماد المفرط'' (Over-reliance)، مثل محاولة حل المشكلة بنفسك..."}'::jsonb,
    title_ar = 'التعلم المستقل مع الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-independent-learning'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Intro To Ai',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-intro-to-ai-2", "excerpt_ar": "# مقدمة في الذكاء الاصطناعي"}'::jsonb,
    title_ar = 'مقدمة في الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-intro-to-ai-2'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Introduction to AI',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-intro-to-ai", "excerpt_ar": "الذكاء الاصطناعي هو محاكاة للذكاء البشري في الآلات. في هذا الدرس سنتعرف على أساسيات الذكاء الاصطناعي وأنواعه المختلفة، وكيف تطور من الأنظمة المبنية عل..."}'::jsonb,
    title_ar = 'مقدمة في الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-intro-to-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Prompt Engineering Basics',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-prompt-engineering-basics", "excerpt_ar": "هندسة الأوامر هي مهارة صياغة مدخلات دقيقة لطلب معلومات من أنظمة الذكاء الاصطناعي. سنتعلم كيف ننتقل من الأوامر البسيطة إلى أوامر أكثر تحديداً ووضوحاً. ..."}'::jsonb,
    title_ar = 'أساسيات هندسة الأوامر'
WHERE id = 'ai-academy-lesson-prompt-engineering-basics'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Building Prompt Libraries',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-prompt-libraries", "excerpt_ar": "لتوفير الوقت وزيادة الإنتاجية، من المهم بناء ''مكتبة أوامر'' (Prompt Library) خاصة بك. سنتعلم كيفية توثيق وحفظ الأوامر الناجحة، تصنيفها حسب المهمة، وإعا..."}'::jsonb,
    title_ar = 'بناء مكتبات الأوامر'
WHERE id = 'ai-academy-lesson-prompt-libraries'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'RAG for Beginners',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-rag-basics", "excerpt_ar": "نموذج RAG يدمج بين قوة الاسترجاع من قاعدة بيانات دقيقة وقوة التوليد اللغوي. نشرح كيف يتم استخدام هذه التقنية لضمان أن الذكاء الاصطناعي يجيب من مصادر م..."}'::jsonb,
    title_ar = 'التوليد المعزز بالاسترجاع للمبتدئين'
WHERE id = 'ai-academy-lesson-rag-basics'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'Safe Ai',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-safe-ai", "excerpt_ar": "# الاستخدام الآمن للذكاء الاصطناعي"}'::jsonb,
    title_ar = 'الاستخدام الآمن للذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-safe-ai'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'AI Safety and Security',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-safety-and-security", "excerpt_ar": "كيف تحمي بياناتك الحساسة أثناء استخدام أدوات الذكاء الاصطناعي السحابية؟ ممارسات أمنية هامة مثل تجنب إدخال معلومات سرية أو بيانات عملاء حقيقية، وفهم سي..."}'::jsonb,
    title_ar = 'أمان وحماية الذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-safety-and-security'
AND status = 'draft';
UPDATE ai_lessons
SET
    content_type = 'lesson',
    title_en = 'AI Workflow Automation',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"slug": "ai-academy-lesson-workflow-automation", "excerpt_ar": "ربط أدوات الذكاء الاصطناعي ببرامجك اليومية (مثل Notion و Zapier) لأتمتة المهام الروتينية. سيوضح هذا الدرس خطوات عملية لبناء سير عمل (Workflow) يقوم با..."}'::jsonb,
    title_ar = 'أتمتة سير العمل بالذكاء الاصطناعي'
WHERE id = 'ai-academy-lesson-workflow-automation'
AND status = 'draft';


-- Table: ai_resources
-- Expected updates: 30

UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Ethics Guidelines',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "وثيقة شاملة للمبادئ الأخلاقية عند استخدام وتطوير نماذج الذكاء الاصطناعي.", "slug": "ai-academy-resource-ai-ethics-guidelines"}'::jsonb,
    title_ar = 'إرشادات أخلاقيات الذكاء الاصطناعي'
WHERE id = 'ai-academy-resource-ai-ethics-guidelines'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Safety Fundamentals',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://course.aisafetyfundamentals.com/", "description": "مساقات متخصصة في فهم وتقليل المخاطر المرتبطة بالذكاء الاصطناعي المتقدم.", "slug": "ai-academy-resource-ai-safety-fundamentals"}'::jsonb,
    title_ar = 'أساسيات أمان الذكاء الاصطناعي'
WHERE id = 'ai-academy-resource-ai-safety-fundamentals'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Study Planner',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "تطبيق يساعد الطلاب على تنظيم وقتهم وبناء خطط دراسية مخصصة.", "slug": "ai-academy-resource-ai-study-planner"}'::jsonb,
    title_ar = 'منظم الدراسة بالذكاء الاصطناعي'
WHERE id = 'ai-academy-resource-ai-study-planner'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Tools Directory',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "قائمة محدثة بأهم الأدوات المفيدة في مختلف المجالات العملية والتعليمية.", "slug": "ai-academy-resource-ai-tools-directory"}'::jsonb,
    title_ar = 'دليل أدوات الذكاء الاصطناعي'
WHERE id = 'ai-academy-resource-ai-tools-directory'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Anthropic Alignment',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.anthropic.com/research", "description": "أبحاث حول كيفية جعل الذكاء الاصطناعي أكثر أماناً وتوافقاً.", "slug": "ai-academy-resource-anthropic-alignment"}'::jsonb,
    title_ar = 'أبحاث محاذاة النماذج'
WHERE id = 'ai-academy-resource-anthropic-alignment'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Ar Community',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "منتدى للنقاشات وتبادل الخبرات حول الذكاء الاصطناعي باللغة العربية.", "slug": "ai-academy-resource-ar-ai-community"}'::jsonb,
    title_ar = 'مجتمع الذكاء الاصطناعي العربي'
WHERE id = 'ai-academy-resource-ar-ai-community'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Canva Magic Studio',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.canva.com/magic/", "description": "مجموعة أدوات الذكاء الاصطناعي داخل منصة كانفا لتسهيل تصميم الصور العروض التقديمية.", "slug": "ai-academy-resource-canva-magic-studio"}'::jsonb,
    title_ar = 'مورد Canva Magic Studio'
WHERE id = 'ai-academy-resource-canva-magic-studio'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Chatgpt',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://chatgpt.com", "description": "نموذج لغوي متقدم من OpenAI يستخدم في المحادثة وتوليد النصوص وحل المشكلات.", "slug": "ai-academy-resource-chatgpt-2"}'::jsonb,
    title_ar = 'مورد Chatgpt'
WHERE id = 'ai-academy-resource-chatgpt-2'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Chatgpt',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://chat.openai.com/", "description": "أداة ذكاء اصطناعي تفاعلية لتوليد النصوص، البرمجة، والتعلم.", "slug": "ai-academy-resource-chatgpt"}'::jsonb,
    title_ar = 'شات جي بي تي'
WHERE id = 'ai-academy-resource-chatgpt'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Claude',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://claude.ai/", "description": "مساعد ذكاء اصطناعي متقدم يتميز بنافذة سياق كبيرة وقدرات تحليلية عالية.", "slug": "ai-academy-resource-claude-ai"}'::jsonb,
    title_ar = 'كلود'
WHERE id = 'ai-academy-resource-claude-ai'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Claude',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://claude.ai", "description": "مساعد ذكاء اصطناعي من Anthropic معروف بقدرته العالية على التحليل وتلخيص الملفات الكبيرة.", "slug": "ai-academy-resource-claude"}'::jsonb,
    title_ar = 'مورد Claude'
WHERE id = 'ai-academy-resource-claude'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Code Assistant',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://github.com/features/copilot", "description": "أداة من جيت هاب تساعد المبرمجين في كتابة الكود بشكل أسرع وأدق.", "slug": "ai-academy-resource-code-assistant"}'::jsonb,
    title_ar = 'المساعد البرمجي'
WHERE id = 'ai-academy-resource-code-assistant'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Coursera Ai For Everyone',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.coursera.org/learn/ai-for-everyone", "description": "دورة تدريبية مبسطة من أندرو نغ موجهة لغير المتخصصين لفهم أساسيات الذكاء الاصطناعي.", "slug": "ai-academy-resource-coursera-ai-for-everyone"}'::jsonb,
    title_ar = 'مورد Coursera Ai For Everyone'
WHERE id = 'ai-academy-resource-coursera-ai-for-everyone'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Deepl',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.deepl.com", "description": "أداة ترجمة تعتمد على التعلم العميق تقدم ترجمات دقيقة واحترافية للغاية بين اللغات.", "slug": "ai-academy-resource-deepl"}'::jsonb,
    title_ar = 'مورد Deepl'
WHERE id = 'ai-academy-resource-deepl'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Deeplearning',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.deeplearning.ai/", "description": "دورات تعليمية متقدمة في مجالات الذكاء الاصطناعي من تقديم أندرو نج.", "slug": "ai-academy-resource-deeplearning-ai"}'::jsonb,
    title_ar = 'منصة ديب ليرنينج للذكاء الاصطناعي'
WHERE id = 'ai-academy-resource-deeplearning-ai'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Fact Checking Tool',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "منصة متخصصة في تحليل وتدقيق المعلومات المولدة آلياً.", "slug": "ai-academy-resource-fact-checking-tool"}'::jsonb,
    title_ar = 'أداة التحقق من الحقائق الذكية'
WHERE id = 'ai-academy-resource-fact-checking-tool'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Gemini',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://gemini.google.com/", "description": "نموذج الذكاء الاصطناعي متعدد الوسائط من جوجل.", "slug": "ai-academy-resource-gemini"}'::jsonb,
    title_ar = 'جيمناي'
WHERE id = 'ai-academy-resource-gemini'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Github Copilot',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://github.com/features/copilot", "description": "مساعد برمجة مدعوم بالذكاء الاصطناعي يقترح أكواد برمجية ويساعد في كتابتها بسرعة.", "slug": "ai-academy-resource-github-copilot"}'::jsonb,
    title_ar = 'مورد Github Copilot'
WHERE id = 'ai-academy-resource-github-copilot'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Google Gemini',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://gemini.google.com", "description": "نموذج الذكاء الاصطناعي من جوجل المدمج في محرك البحث ومساحة العمل الخاصة بها.", "slug": "ai-academy-resource-google-gemini"}'::jsonb,
    title_ar = 'مورد Google Gemini'
WHERE id = 'ai-academy-resource-google-gemini'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Hallucination Checker',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "أداة برمجية لمقارنة نصوص الذكاء الاصطناعي مع المصادر الأصلية لضمان الدقة.", "slug": "ai-academy-resource-hallucination-checker"}'::jsonb,
    title_ar = 'مكتشف الهلوسة'
WHERE id = 'ai-academy-resource-hallucination-checker'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Hugging Face Course',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://huggingface.co/course/", "description": "دورة مجانية ممتازة لفهم آليات عمل النماذج اللغوية الكبيرة.", "slug": "ai-academy-resource-hugging-face-course"}'::jsonb,
    title_ar = 'دورة المعالجة اللغوية الطبيعية'
WHERE id = 'ai-academy-resource-hugging-face-course'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Hugging Face',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://huggingface.co", "description": "منصة مفتوحة المصدر لمشاركة وتطوير نماذج الذكاء الاصطناعي وتعلم الآلة.", "slug": "ai-academy-resource-hugging-face"}'::jsonb,
    title_ar = 'مورد Hugging Face'
WHERE id = 'ai-academy-resource-hugging-face'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Midjourney',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.midjourney.com", "description": "أداة ذكاء اصطناعي توليدي لإنشاء صور عالية الجودة بناءً على الوصف النصي.", "slug": "ai-academy-resource-midjourney-2"}'::jsonb,
    title_ar = 'مورد Midjourney'
WHERE id = 'ai-academy-resource-midjourney-2'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Midjourney',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.midjourney.com/", "description": "أداة متقدمة لتوليد الصور عالية الجودة باستخدام الذكاء الاصطناعي.", "slug": "ai-academy-resource-midjourney"}'::jsonb,
    title_ar = 'ميدجورني'
WHERE id = 'ai-academy-resource-midjourney'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Openai Docs',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://platform.openai.com/docs/", "description": "المرجع الرسمي لتعلم كيفية استخدام نماذج OpenAI.", "slug": "ai-academy-resource-openai-docs"}'::jsonb,
    title_ar = 'مستندات أوبن إي آي'
WHERE id = 'ai-academy-resource-openai-docs'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Perplexity',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.perplexity.ai", "description": "محرك بحث مدعوم بالذكاء الاصطناعي يقدم إجابات مباشرة وموثقة بالمصادر.", "slug": "ai-academy-resource-perplexity-2"}'::jsonb,
    title_ar = 'مورد Perplexity'
WHERE id = 'ai-academy-resource-perplexity-2'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Perplexity',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.perplexity.ai/", "description": "محرك بحث يعتمد على الذكاء الاصطناعي لتقديم إجابات موثقة بالمصادر.", "slug": "ai-academy-resource-perplexity"}'::jsonb,
    title_ar = 'محرك بحث بيربليكسيتي'
WHERE id = 'ai-academy-resource-perplexity'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Prompt Engineering Guide',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "https://www.promptingguide.ai/", "description": "دليل شامل لتعلم تقنيات هندسة الأوامر من الصفر للاحتراف.", "slug": "ai-academy-resource-prompt-engineering-guide"}'::jsonb,
    title_ar = 'دليل هندسة الأوامر'
WHERE id = 'ai-academy-resource-prompt-engineering-guide'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Prompt Library Repo',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "مستودع يحتوي على قوالب جاهزة لأوامر ذكاء اصطناعي لمختلف المهام.", "slug": "ai-academy-resource-prompt-library-repo"}'::jsonb,
    title_ar = 'مستودع الأوامر مفتوح المصدر'
WHERE id = 'ai-academy-resource-prompt-library-repo'
AND status = 'draft';
UPDATE ai_resources
SET
    content_type = 'resource',
    title_en = 'Research Assistant',
    portal_id = 'ai-academy',
    status = 'draft',
    data = '{"url": "", "description": "منصة تدعم الباحثين في تلخيص الأوراق العلمية واستخراج البيانات.", "slug": "ai-academy-resource-research-assistant-ai"}'::jsonb,
    title_ar = 'مساعد البحث العلمي الذكي'
WHERE id = 'ai-academy-resource-research-assistant-ai'
AND status = 'draft';


-- Table: automation_lessons
-- Expected updates: 20

UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Ai Automation Intro',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-ai-automation-intro", "excerpt_ar": "## عصر جديد للأتمتة"}'::jsonb,
    title_ar = 'الأتمتة المدعومة بالذكاء الاصطناعي'
WHERE id = 'automation-lesson-ai-automation-intro'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Integrating AI in Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-ai-in-automation", "excerpt_ar": "الذكاء الاصطناعي (AI) أضاف بعداً جديداً كلياً للأتمتة؛ فبدلاً من أن تقوم الأداة بنقل البيانات فقط، أصبحت الآن قادرة على ''فهم'' البيانات وتصنيفها وتلخيص..."}'::jsonb,
    title_ar = 'دمج الذكاء الاصطناعي لتطوير الأتمتة'
WHERE id = 'automation-lesson-ai-in-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'API Basics for Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-api-basics-automation", "excerpt_ar": "واجهة برمجة التطبيقات (API) هي لغة التواصل التي تستخدمها البرامج للتحدث مع بعضها البعض ومشاركة البيانات. في عالم الأتمتة، الـ APIs هي العمود الفقري."}'::jsonb,
    title_ar = 'أساسيات واجهات برمجة التطبيقات للأتمتة'
WHERE id = 'automation-lesson-api-basics-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Documentation and Testing Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-automation-documentation-testing", "excerpt_ar": "أن تبني الأتمتة شيء، وأن تضمن استمرارها وإمكانية صيانتها شيء آخر. التوثيق والاختبار هما الفارق بين الهواة والمحترفين في الأتمتة."}'::jsonb,
    title_ar = 'توثيق واختبار عمليات الأتمتة'
WHERE id = 'automation-lesson-automation-documentation-testing'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Automation Security and Data Privacy',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-automation-security-data-privacy", "excerpt_ar": "في خضم حماسنا لربط التطبيقات وتسهيل العمل، قد نتجاهل الجانب الأمني، وهو ما قد يؤدي إلى تسريب بيانات حساسة أو اختراق الأنظمة. الأمان في الأتمتة ليس أمر..."}'::jsonb,
    title_ar = 'أمان الأتمتة وحماية البيانات'
WHERE id = 'automation-lesson-automation-security-data-privacy'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Business Process Automation: Case Study',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-bpa-case-study", "excerpt_ar": "أتمتة العمليات التجارية تعني أخذ عملية معقدة تتضمن عدة أقسام وأتمتتها بالكامل. لفهم ذلك، لندرس حالة عملية حقيقية (إلحاق موظف جديد - Onboarding)."}'::jsonb,
    title_ar = 'أتمتة العمليات التجارية: دراسة حالة'
WHERE id = 'automation-lesson-bpa-case-study'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Building an Approval Workflow',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-building-approval-workflow", "excerpt_ar": "سير عمل الموافقات هو أحد أهم الاستخدامات للأتمتة في بيئات العمل المشتركة، حيث يتطلب اتخاذ القرار تدخلاً بشرياً ولكن يمكن أتمتة كل ما يسبق ويلحق هذا ال..."}'::jsonb,
    title_ar = 'بناء سير عمل موافقات'
WHERE id = 'automation-lesson-building-approval-workflow'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Data Mapping Between Apps',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-data-mapping-between-apps", "excerpt_ar": "أثناء نقل البيانات من تطبيق إلى آخر في الأتمتة، نادراً ما تتطابق أسماء الحقول والتنسيقات. هنا يأتي دور تخطيط البيانات (Data Mapping)."}'::jsonb,
    title_ar = 'تخطيط البيانات بين التطبيقات'
WHERE id = 'automation-lesson-data-mapping-between-apps'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Error Handling in Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-error-handling-automation", "excerpt_ar": "حتى أفضل مسارات العمل الأتمتية عرضة للفشل. قد يتوقف سيرفر، أو تتغير صيغة بيانات الـ API، أو ينفد رصيد حسابك في خدمة معينة. معالجة الأخطاء تضمن عدم توق..."}'::jsonb,
    title_ar = 'معالجة الأخطاء في الأتمتة'
WHERE id = 'automation-lesson-error-handling-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Error Handling',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-error-handling", "excerpt_ar": "## ماذا تفعل عندما تفشل الأتمتة؟"}'::jsonb,
    title_ar = 'التعامل مع الأخطاء في الأتمتة'
WHERE id = 'automation-lesson-error-handling'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Intro to Automation Thinking',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-intro-automation-thinking", "excerpt_ar": "التفكير الأتمتي هو منهجية لحل المشكلات تعتمد على تحديد المهام المتكررة والبحث عن طرق لإنجازها باستخدام التكنولوجيا دون تدخل بشري مستمر."}'::jsonb,
    title_ar = 'مقدمة في التفكير الأتمتي'
WHERE id = 'automation-lesson-intro-automation-thinking'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Intro Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-intro-automation", "excerpt_ar": "## مرحباً بك في عالم الأتمتة"}'::jsonb,
    title_ar = 'مقدمة في أتمتة سير العمل'
WHERE id = 'automation-lesson-intro-automation'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Intro to Google Apps Script',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-intro-google-apps-script", "excerpt_ar": "برمجة تطبيقات جوجل (GAS) هي لغة تعتمد على JavaScript تتيح لك تطوير وأتمتة ميزات وتدفقات عمل ضمن بيئة Google Workspace (Sheets, Docs, Gmail, Forms... إ..."}'::jsonb,
    title_ar = 'مدخل إلى برمجة تطبيقات جوجل'
WHERE id = 'automation-lesson-intro-google-apps-script'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Make vs Zapier vs n8n Comparison',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-make-zapier-n8n-comparison", "excerpt_ar": "اختيار الأداة المناسبة هو نصف الحل. كل أداة من هذه الأدوات لها نقاط قوة تناسب فئات معينة."}'::jsonb,
    title_ar = 'مقارنة بين Make و Zapier و n8n'
WHERE id = 'automation-lesson-make-zapier-n8n-comparison'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Retries and Fallbacks',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-retries-and-fallbacks", "excerpt_ar": "في عالم الشبكات، يمكن أن تفشل طلبات البيانات لعدة أسباب مؤقتة (مثل انقطاع لحظي للشبكة أو تحديث سريع للسيرفر). لذلك نحتاج إلى استراتيجيات للتعامل مع هذ..."}'::jsonb,
    title_ar = 'استراتيجيات إعادة المحاولة والخطط البديلة'
WHERE id = 'automation-lesson-retries-and-fallbacks'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Triggers Actions',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-triggers-actions", "excerpt_ar": "## كيف تعمل أي أتمتة؟"}'::jsonb,
    title_ar = 'فهم المحفزات والإجراءات'
WHERE id = 'automation-lesson-triggers-actions'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Understanding Triggers and Actions',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-understanding-triggers-actions", "excerpt_ar": "تتكون أي عملية أتمتة من جزأين رئيسيين: المحفز (Trigger) والإجراء (Action). بدون فهم هذين العنصرين، لا يمكن بناء سير عمل سليم."}'::jsonb,
    title_ar = 'فهم المحفزات والإجراءات'
WHERE id = 'automation-lesson-understanding-triggers-actions'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'What is a Webhook and How it Works?',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-webhooks-explained", "excerpt_ar": "الويب هوك (Webhook) هو طريقة فعالة جداً لنقل البيانات في الوقت الفعلي بين التطبيقات. وهو يعتمد على مبدأ ''لا تتصل بنا، نحن سنتصل بك''."}'::jsonb,
    title_ar = 'ما هو الويب هوك وكيف يعمل؟'
WHERE id = 'automation-lesson-webhooks-explained'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Webhooks Integration',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-webhooks-integration", "excerpt_ar": "## ما هو خطاف الويب (Webhook)؟"}'::jsonb,
    title_ar = 'ربط التطبيقات باستخدام خطافات الويب'
WHERE id = 'automation-lesson-webhooks-integration'
AND status = 'draft';
UPDATE automation_lessons
SET
    content_type = 'lesson',
    title_en = 'Zapier Vs Make',
    portal_id = 'automation',
    status = 'draft',
    data = '{"slug": "automation-lesson-zapier-vs-make", "excerpt_ar": "## مقارنة بين عمالقة الأتمتة"}'::jsonb,
    title_ar = 'مقدمة إلى Zapier و Make'
WHERE id = 'automation-lesson-zapier-vs-make'
AND status = 'draft';


-- Table: automation_resources
-- Expected updates: 30

UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'AI in Automation Trends',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-next-frontier-of-process-automation", "description": "تقرير من McKinsey حول كيفية دمج الذكاء الاصطناعي مع الأتمتة لخلق الجيل الجديد من العمليات الذكية.", "slug": "automation-resource-ai-automation-trends"}'::jsonb,
    title_ar = 'مورد AI in Automation Trends'
WHERE id = 'automation-resource-ai-automation-trends'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Ai Automation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.forbes.com/sites/forbestechcouncil/2023/04/10/the-future-of-ai-and-automation/", "description": "مقال يتحدث عن مستقبل دمج الذكاء الاصطناعي مع تقنيات الأتمتة.", "slug": "automation-resource-ai-automation"}'::jsonb,
    title_ar = 'الذكاء الاصطناعي في الأتمتة'
WHERE id = 'automation-resource-ai-automation'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'API Security Best Practices',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://owasp.org/www-project-api-security/", "description": "موارد من منظمة OWASP العالمية حول أمان واجهات برمجة التطبيقات وكيفية حماية بياناتك أثناء استخدام الأتمتة.", "slug": "automation-resource-api-security-best-practices"}'::jsonb,
    title_ar = 'مورد API Security Best Practices'
WHERE id = 'automation-resource-api-security-best-practices'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Apis Beginners',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://zapier.com/learn/apis/", "description": "كتاب إلكتروني مجاني من Zapier يشرح APIs بلغة بسيطة ومفهومة.", "slug": "automation-resource-apis-beginners"}'::jsonb,
    title_ar = 'واجهات برمجة التطبيقات للمبتدئين'
WHERE id = 'automation-resource-apis-beginners'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Automate Io Alt',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://zapier.com/apps/automateio/integrations", "description": "نظرة على الخيارات البديلة المتاحة بعد إغلاق منصة Automate.io.", "slug": "automation-resource-automate-io-alt"}'::jsonb,
    title_ar = 'بدائل Automate.io'
WHERE id = 'automation-resource-automate-io-alt'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Automating Business Processes',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://hbr.org/2018/06/before-you-automate-your-processes-redesign-them", "description": "مقال من مجلة هارفارد بزنس ريفيو يناقش أهمية إعادة تصميم العمليات التجارية قبل محاولة أتمتتها لتحقيق أقصى استفادة.", "slug": "automation-resource-automating-business-processes"}'::jsonb,
    title_ar = 'مورد Automating Business Processes'
WHERE id = 'automation-resource-automating-business-processes'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Automation Safety',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.cybersecurity-insiders.com/automation-security/", "description": "نصائح وإرشادات حول كيفية تأمين مسارات العمل المؤتمتة الخاصة بك والبيانات الحساسة.", "slug": "automation-resource-automation-safety"}'::jsonb,
    title_ar = 'دليل أمان الأتمتة'
WHERE id = 'automation-resource-automation-safety'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Automation Testing Frameworks',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.softwaretestinghelp.com/automation-testing-frameworks/", "description": "مقال يستعرض أطر عمل اختبار الأتمتة وأهميتها في التأكد من استقرار تدفقات العمل قبل إطلاقها الفعلي.", "slug": "automation-resource-automation-testing-frameworks"}'::jsonb,
    title_ar = 'مورد Automation Testing Frameworks'
WHERE id = 'automation-resource-automation-testing-frameworks'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Introduction to Cloud Computing',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://aws.amazon.com/what-is-cloud-computing/", "description": "مقدمة من AWS حول مفاهيم الحوسبة السحابية، والتي تُبنى عليها الغالبية العظمى من منصات وأدوات الأتمتة الحديثة.", "slug": "automation-resource-cloud-computing-intro"}'::jsonb,
    title_ar = 'مورد Introduction to Cloud Computing'
WHERE id = 'automation-resource-cloud-computing-intro'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Cron Job Syntax Guide',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://crontab.guru/", "description": "أداة بسيطة تشرح وتساعد في صياغة توقيتات Cron Jobs لجدولة العمليات الأتمتية لتشغيلها في أوقات محددة بدقة.", "slug": "automation-resource-cron-job-syntax"}'::jsonb,
    title_ar = 'مورد Cron Job Syntax Guide'
WHERE id = 'automation-resource-cron-job-syntax'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Data Mapping Basics',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.ibm.com/topics/data-mapping", "description": "نظرة عامة من IBM حول مفهوم تخطيط البيانات (Data Mapping) وكيف يتم نقل البيانات من أنظمة مختلفة والتأكد من مطابقتها.", "slug": "automation-resource-data-mapping-basics"}'::jsonb,
    title_ar = 'مورد Data Mapping Basics'
WHERE id = 'automation-resource-data-mapping-basics'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Error Handling Best Practices',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/", "description": "دليل تقني حول أفضل الممارسات في معالجة الأخطاء (Error Handling) في البرمجة النصية والتي يمكن تطبيقها على الأتمتة المتقدمة.", "slug": "automation-resource-error-handling-best-practices"}'::jsonb,
    title_ar = 'مورد Error Handling Best Practices'
WHERE id = 'automation-resource-error-handling-best-practices'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Gas Guide',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://developers.google.com/apps-script/guides", "description": "تعلم كيفية أتمتة تطبيقات Google Workspace وإنشاء إضافات مخصصة.", "slug": "automation-resource-gas-guide-2"}'::jsonb,
    title_ar = 'أدلة Google Apps Script'
WHERE id = 'automation-resource-gas-guide-2'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Google Apps Script Guide',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://developers.google.com/apps-script", "description": "الدليل الرسمي من جوجل لكتابة وتطوير سكريبتات لمنتجات Google Workspace مثل Sheets و Docs و Gmail للقيام بالأتمتة.", "slug": "automation-resource-gas-guide"}'::jsonb,
    title_ar = 'مورد Google Apps Script Guide'
WHERE id = 'automation-resource-gas-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'HTTP Status Codes Directory',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://httpstatuses.com/", "description": "دليل مرجعي شامل ومبسط لجميع رموز استجابة HTTP (مثل 200, 404, 500) التي تواجهها أثناء التعامل مع الـ APIs والويب هوك.", "slug": "automation-resource-http-status-codes"}'::jsonb,
    title_ar = 'مورد HTTP Status Codes Directory'
WHERE id = 'automation-resource-http-status-codes'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'JSON Guide',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://www.w3schools.com/js/js_json_intro.asp", "description": "مقدمة شاملة من W3Schools لفهم صيغة JSON، وكيفية كتابتها وقراءتها، وهو أمر أساسي في جميع مسارات الأتمتة تقريباً.", "slug": "automation-resource-json-guide"}'::jsonb,
    title_ar = 'مورد JSON Guide'
WHERE id = 'automation-resource-json-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Make Academy',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://academy.make.com/", "description": "دورات تدريبية مجانية لتعلم كيفية استخدام منصة Make للمبتدئين والمحترفين.", "slug": "automation-resource-make-academy-2"}'::jsonb,
    title_ar = 'أكاديمية Make'
WHERE id = 'automation-resource-make-academy-2'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Make.com Academy',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://academy.make.com/", "description": "أكاديمية منصة Make التي تقدم دورات مجانية لتعلم كيفية استخدام المنصة لبناء الأتمتة من الصفر وتصميم السيناريوهات المتقدمة.", "slug": "automation-resource-make-academy"}'::jsonb,
    title_ar = 'مورد Make.com Academy'
WHERE id = 'automation-resource-make-academy'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'N8N Docs',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://docs.n8n.io/", "description": "الدليل الرسمي لاستخدام منصة n8n وبناء مسارات عمل مخصصة.", "slug": "automation-resource-n8n-docs"}'::jsonb,
    title_ar = 'وثائق n8n'
WHERE id = 'automation-resource-n8n-docs'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'n8n Documentation',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://docs.n8n.io/", "description": "التوثيق الرسمي لمنصة n8n للأتمتة المفتوحة المصدر. يحتوي على أدلة مفصلة حول كيفية بناء مسارات العمل والعقد المتاحة وتطوير العقد المخصصة.", "slug": "automation-resource-n8n-documentation"}'::jsonb,
    title_ar = 'مورد n8n Documentation'
WHERE id = 'automation-resource-n8n-documentation'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'OAuth 2.0 Simplified',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://aaronparecki.com/oauth-2-simplified/", "description": "شرح مبسط لآلية المصادقة OAuth 2.0 وكيفية عملها، وهو أمر حيوي لفهم كيفية ربط تطبيقات الأتمتة بشكل آمن.", "slug": "automation-resource-oauth2-simplified"}'::jsonb,
    title_ar = 'مورد OAuth 2.0 Simplified'
WHERE id = 'automation-resource-oauth2-simplified'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Microsoft Power Automate Docs',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت لتعلم كيفية إنشاء التدفقات وأتمتة العمليات باستخدام Power Automate ضمن بيئة Microsoft 365.", "slug": "automation-resource-power-automate-docs"}'::jsonb,
    title_ar = 'مورد Microsoft Power Automate Docs'
WHERE id = 'automation-resource-power-automate-docs'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Power Automate Learn',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://learn.microsoft.com/en-us/power-automate/", "description": "وثائق مايكروسوفت الرسمية لتعلم أتمتة العمليات التجارية.", "slug": "automation-resource-power-automate-learn"}'::jsonb,
    title_ar = 'تعلم Power Automate'
WHERE id = 'automation-resource-power-automate-learn'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Regex for Data Extraction',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://regexr.com/", "description": "أداة ومورد تعليمي رائع لاختبار وتعلم التعابير النمطية (Regular Expressions) المستخدمة لاستخراج بيانات محددة من نصوص داخل مسارات الأتمتة.", "slug": "automation-resource-regex-data-extraction"}'::jsonb,
    title_ar = 'مورد Regex for Data Extraction'
WHERE id = 'automation-resource-regex-data-extraction'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'REST API Tutorial',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://restfulapi.net/", "description": "مورد ممتاز لتعلم أساسيات واجهات برمجة التطبيقات (REST APIs)، والأفعال المستخدمة (GET, POST, PUT, DELETE) والرموز المرجعية.", "slug": "automation-resource-rest-api-tutorial"}'::jsonb,
    title_ar = 'مورد REST API Tutorial'
WHERE id = 'automation-resource-rest-api-tutorial'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Retry Policies Guide',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/transient-faults", "description": "دليل تصميم الأنماط المعمارية للتعامل مع الأخطاء المؤقتة وآليات إعادة المحاولة (Retry Patterns) لضمان استقرار العمليات.", "slug": "automation-resource-retry-policies-guide"}'::jsonb,
    title_ar = 'مورد Retry Policies Guide'
WHERE id = 'automation-resource-retry-policies-guide'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Webhooks Explained',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://sendgrid.com/blog/webhook-vs-api-whats-difference/", "description": "مقال يشرح الفرق بين Webhooks و APIs ومتى تستخدم كل منها.", "slug": "automation-resource-webhooks-explained-2"}'::jsonb,
    title_ar = 'شرح خطافات الويب'
WHERE id = 'automation-resource-webhooks-explained-2'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Webhooks Explained',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://zapier.com/blog/what-is-a-webhook/", "description": "مقال شامل من Zapier يشرح مفهوم الويب هوك (Webhooks) وكيفية عملها وكيف تختلف عن الاستعلام الدوري (Polling).", "slug": "automation-resource-webhooks-explained"}'::jsonb,
    title_ar = 'مورد Webhooks Explained'
WHERE id = 'automation-resource-webhooks-explained'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Zapier Blog',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://zapier.com/blog", "description": "مقالات رائعة وأدلة عملية حول الأتمتة وزيادة الإنتاجية.", "slug": "automation-resource-zapier-blog"}'::jsonb,
    title_ar = 'مدونة Zapier'
WHERE id = 'automation-resource-zapier-blog'
AND status = 'draft';
UPDATE automation_resources
SET
    content_type = 'resource',
    title_en = 'Zapier University',
    portal_id = 'automation',
    status = 'draft',
    data = '{"url": "https://zapier.com/university", "description": "دروس وفيديوهات تعليمية من Zapier مصممة لمساعدة المستخدمين على فهم الأتمتة وربط تطبيقاتهم المختلفة بشكل فعال.", "slug": "automation-resource-zapier-university"}'::jsonb,
    title_ar = 'مورد Zapier University'
WHERE id = 'automation-resource-zapier-university'
AND status = 'draft';


-- Table: career_glossary
-- Expected updates: 50

UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Ai Tools',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "برامج تستخدم الذكاء الاصطناعي للمساعدة في المهام المهنية.", "example": "مثال على استخدام مصطلح أدوات الذكاء الاصطناعي في السياق المهني.", "definition_ar": "برامج تستخدم الذكاء الاصطناعي للمساعدة في المهام المهنية.", "slug": "career-glossary-ai-tools"}'::jsonb,
    title_ar = 'أدوات الذكاء الاصطناعي'
WHERE id = 'career-glossary-ai-tools'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'ATS',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "برامج تستخدمها الشركات لإدارة عملية التوظيف وفحص السير الذاتية آلياً للبحث عن الكلمات المفتاحية.", "example": "تنسيق السيرة الذاتية بشكل بسيط واستخدام خطوط واضحة لضمان قراءتها بشكل صحيح من قبل نظام الـ ATS.", "definition_ar": "برامج تستخدمها الشركات لإدارة عملية التوظيف وفحص السير الذاتية آلياً للبحث عن الكلمات المفتاحية.", "slug": "career-glossary-ats-2"}'::jsonb,
    title_ar = 'أنظمة تتبع المتقدمين (ATS)'
WHERE id = 'career-glossary-ats-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Ats',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "برنامج يستخدمه أصحاب العمل لفرز السير الذاتية.", "example": "مثال على استخدام مصطلح نظام تتبع المتقدمين في السياق المهني.", "definition_ar": "برنامج يستخدمه أصحاب العمل لفرز السير الذاتية.", "slug": "career-glossary-ats"}'::jsonb,
    title_ar = 'نظام تتبع المتقدمين'
WHERE id = 'career-glossary-ats'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Burnout',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "حالة من الإرهاق الجسدي والعاطفي والعقلي ناتجة عن ضغوط العمل المستمرة والفشل في تحقيق التوازن.", "example": "الشعور بالتعب المستمر وفقدان الشغف بالعمل بسبب ساعات العمل الطويلة وعدم وجود فترات راحة كافية.", "definition_ar": "حالة من الإرهاق الجسدي والعاطفي والعقلي ناتجة عن ضغوط العمل المستمرة والفشل في تحقيق التوازن.", "slug": "career-glossary-burnout"}'::jsonb,
    title_ar = 'الاحتراق الوظيفي'
WHERE id = 'career-glossary-burnout'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Career Shift',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "الانتقال للعمل في مجال مختلف عن مجالك الحالي أو السابق.", "example": "مثال على استخدام مصطلح تغيير المسار المهني في السياق المهني.", "definition_ar": "الانتقال للعمل في مجال مختلف عن مجالك الحالي أو السابق.", "slug": "career-glossary-career-shift-2"}'::jsonb,
    title_ar = 'تغيير المسار المهني'
WHERE id = 'career-glossary-career-shift-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Shift',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "الانتقال من مجال عمل إلى مجال آخر مختلف، ويتطلب غالباً اكتساب مهارات جديدة وإعادة تقييم المسار المهني.", "example": "الانتقال من مجال التسويق إلى مجال تحليل البيانات بعد دراسة دورات متخصصة.", "definition_ar": "الانتقال من مجال عمل إلى مجال آخر مختلف، ويتطلب غالباً اكتساب مهارات جديدة وإعادة تقييم المسار المهني.", "slug": "career-glossary-career-shift"}'::jsonb,
    title_ar = 'التحول المهني'
WHERE id = 'career-glossary-career-shift'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Cover Letter',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "رسالة ترفق مع السيرة الذاتية لتوضيح سبب اهتمامك بالوظيفة.", "example": "مثال على استخدام مصطلح خطاب المقدمة في السياق المهني.", "definition_ar": "رسالة ترفق مع السيرة الذاتية لتوضيح سبب اهتمامك بالوظيفة.", "slug": "career-glossary-cover-letter-2"}'::jsonb,
    title_ar = 'خطاب المقدمة'
WHERE id = 'career-glossary-cover-letter-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Cover Letter',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "رسالة ترفق مع السيرة الذاتية تقدم فيها نفسك وتوضح سبب اهتمامك بالوظيفة وكيف يمكن لمهاراتك أن تفيد الشركة.", "example": "كتابة خطاب مقدمة مخصص لشركة تقنية يبرز شغفك بمنتجاتهم وخبرتك السابقة في المجال.", "definition_ar": "رسالة ترفق مع السيرة الذاتية تقدم فيها نفسك وتوضح سبب اهتمامك بالوظيفة وكيف يمكن لمهاراتك أن تفيد الشركة.", "slug": "career-glossary-cover-letter"}'::jsonb,
    title_ar = 'خطاب المقدمة'
WHERE id = 'career-glossary-cover-letter'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Culture Fit',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "مدى توافق قيم الموظف وسلوكياته ومعتقداته مع ثقافة بيئة العمل في الشركة.", "example": "تقييم ما إذا كان أسلوب عملك المرن يتناسب مع ثقافة الشركة التي تشجع على الابتكار والاستقلالية.", "definition_ar": "مدى توافق قيم الموظف وسلوكياته ومعتقداته مع ثقافة بيئة العمل في الشركة.", "slug": "career-glossary-culture-fit"}'::jsonb,
    title_ar = 'الملاءمة الثقافية'
WHERE id = 'career-glossary-culture-fit'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'CV Optimization',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "عملية تعديل السيرة الذاتية لتتناسب مع متطلبات الوظيفة المستهدفة وإبراز المهارات والإنجازات بشكل واضح.", "example": "استخدام كلمات مفتاحية من الوصف الوظيفي في السيرة الذاتية لضمان تجاوز أنظمة تتبع المتقدمين.", "definition_ar": "عملية تعديل السيرة الذاتية لتتناسب مع متطلبات الوظيفة المستهدفة وإبراز المهارات والإنجازات بشكل واضح.", "slug": "career-glossary-cv-optimization"}'::jsonb,
    title_ar = 'تحسين السيرة الذاتية'
WHERE id = 'career-glossary-cv-optimization'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Cv',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "وثيقة تقدم ملخصاً عن خبراتك ومهاراتك.", "example": "مثال على استخدام مصطلح السيرة الذاتية في السياق المهني.", "definition_ar": "وثيقة تقدم ملخصاً عن خبراتك ومهاراتك.", "slug": "career-glossary-cv"}'::jsonb,
    title_ar = 'السيرة الذاتية'
WHERE id = 'career-glossary-cv'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Elevator Pitch',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "عرض تقديمي قصير جداً عن نفسك ومهاراتك.", "example": "مثال على استخدام مصطلح الخطاب الموجز في السياق المهني.", "definition_ar": "عرض تقديمي قصير جداً عن نفسك ومهاراتك.", "slug": "career-glossary-elevator-pitch-2"}'::jsonb,
    title_ar = 'الخطاب الموجز'
WHERE id = 'career-glossary-elevator-pitch-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Elevator Pitch',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "مقدمة قصيرة ومقنعة عن نفسك ومهاراتك وما تبحث عنه مهنياً، تستغرق وقتاً لا يتجاوز ركوب المصعد.", "example": "تقديم نفسك بوضوح في أقل من 30 ثانية في فعالية توظيف لإثارة اهتمام مسؤول التوظيف.", "definition_ar": "مقدمة قصيرة ومقنعة عن نفسك ومهاراتك وما تبحث عنه مهنياً، تستغرق وقتاً لا يتجاوز ركوب المصعد.", "slug": "career-glossary-elevator-pitch"}'::jsonb,
    title_ar = 'العرض التعريفي السريع'
WHERE id = 'career-glossary-elevator-pitch'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Freelance',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "تقديم الخدمات بشكل مستقل لعدة عملاء.", "example": "مثال على استخدام مصطلح العمل الحر في السياق المهني.", "definition_ar": "تقديم الخدمات بشكل مستقل لعدة عملاء.", "slug": "career-glossary-freelance"}'::jsonb,
    title_ar = 'العمل الحر'
WHERE id = 'career-glossary-freelance'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Gig Economy',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "سوق عمل يعتمد على الوظائف المؤقتة، والعمل المستقل، والعقود قصيرة الأجل بدلاً من الوظائف الدائمة.", "example": "العمل كمصمم جرافيك مستقل (Freelancer) وتقديم خدمات للعديد من العملاء.", "definition_ar": "سوق عمل يعتمد على الوظائف المؤقتة، والعمل المستقل، والعقود قصيرة الأجل بدلاً من الوظائف الدائمة.", "slug": "career-glossary-gig-economy"}'::jsonb,
    title_ar = 'اقتصاد العمل الحر'
WHERE id = 'career-glossary-gig-economy'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Hard Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "قدرات تقنية ومعرفة متخصصة يمكن قياسها.", "example": "مثال على استخدام مصطلح المهارات الصلبة في السياق المهني.", "definition_ar": "قدرات تقنية ومعرفة متخصصة يمكن قياسها.", "slug": "career-glossary-hard-skills-2"}'::jsonb,
    title_ar = 'المهارات الصلبة'
WHERE id = 'career-glossary-hard-skills-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Hard Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "القدرات والمعارف التقنية المحددة والمطلوبة لأداء وظيفة معينة، والتي يمكن قياسها وتقييمها.", "example": "البرمجة بلغة بايثون، تصميم الجرافيك باستخدام فوتوشوب، أو التحليل المالي.", "definition_ar": "القدرات والمعارف التقنية المحددة والمطلوبة لأداء وظيفة معينة، والتي يمكن قياسها وتقييمها.", "slug": "career-glossary-hard-skills"}'::jsonb,
    title_ar = 'المهارات التقنية (الصلبة)'
WHERE id = 'career-glossary-hard-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Imposter Syndrome',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "شعور داخلي بعدم الكفاءة والشك في الذات رغم وجود أدلة على النجاح، والخوف من أن يكتشف الآخرون أنك \"محتال\".", "example": "الشعور بأنك لا تستحق الترقية التي حصلت عليها وأنها كانت مجرد حظ.", "definition_ar": "شعور داخلي بعدم الكفاءة والشك في الذات رغم وجود أدلة على النجاح، والخوف من أن يكتشف الآخرون أنك \"محتال\".", "slug": "career-glossary-imposter-syndrome"}'::jsonb,
    title_ar = 'متلازمة المحتال'
WHERE id = 'career-glossary-imposter-syndrome'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Informational Interview',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "لقاء غير رسمي مع محترف في مجال معين للحصول على معلومات ونصائح حول هذا المجال، وليس لطلب وظيفة بشكل مباشر.", "example": "دعوة مدير منتج لتناول القهوة وسؤاله عن تحديات مهنته والمهارات المطلوبة للنجاح فيها.", "definition_ar": "لقاء غير رسمي مع محترف في مجال معين للحصول على معلومات ونصائح حول هذا المجال، وليس لطلب وظيفة بشكل مباشر.", "slug": "career-glossary-informational-interview"}'::jsonb,
    title_ar = 'المقابلة الاستكشافية'
WHERE id = 'career-glossary-informational-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Internship',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "فترة عمل مؤقتة لاكتساب خبرة عملية في مجال معين.", "example": "مثال على استخدام مصطلح التدريب المهني في السياق المهني.", "definition_ar": "فترة عمل مؤقتة لاكتساب خبرة عملية في مجال معين.", "slug": "career-glossary-internship"}'::jsonb,
    title_ar = 'التدريب المهني'
WHERE id = 'career-glossary-internship'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Interview',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "لقاء لتقييم مدى ملاءمتك للوظيفة.", "example": "مثال على استخدام مصطلح المقابلة الشخصية في السياق المهني.", "definition_ar": "لقاء لتقييم مدى ملاءمتك للوظيفة.", "slug": "career-glossary-interview"}'::jsonb,
    title_ar = 'المقابلة الشخصية'
WHERE id = 'career-glossary-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Job Description',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "وثيقة توضح المهام والمسؤوليات المطلوبة لوظيفة معينة.", "example": "مثال على استخدام مصطلح الوصف الوظيفي في السياق المهني.", "definition_ar": "وثيقة توضح المهام والمسؤوليات المطلوبة لوظيفة معينة.", "slug": "career-glossary-job-description-2"}'::jsonb,
    title_ar = 'الوصف الوظيفي'
WHERE id = 'career-glossary-job-description-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Job Description',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "وثيقة تحدد مسؤوليات الوظيفة ومهامها والمهارات والمؤهلات المطلوبة لأدائها.", "example": "قراءة الوصف الوظيفي بعناية لتحديد ما إذا كانت الوظيفة تناسب خبراتك وأهدافك المهنية.", "definition_ar": "وثيقة تحدد مسؤوليات الوظيفة ومهامها والمهارات والمؤهلات المطلوبة لأدائها.", "slug": "career-glossary-job-description"}'::jsonb,
    title_ar = 'الوصف الوظيفي'
WHERE id = 'career-glossary-job-description'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Job Search Strategy',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "خطة منظمة للبحث عن الوظائف المناسبة تتضمن استخدام شبكات العلاقات، المنصات المهنية، ومواقع التوظيف.", "example": "تخصيص ساعتين يومياً للبحث عن وظائف والتواصل مع مسؤولي التوظيف على لينكد إن.", "definition_ar": "خطة منظمة للبحث عن الوظائف المناسبة تتضمن استخدام شبكات العلاقات، المنصات المهنية، ومواقع التوظيف.", "slug": "career-glossary-job-search-strategy"}'::jsonb,
    title_ar = 'استراتيجية البحث عن عمل'
WHERE id = 'career-glossary-job-search-strategy'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Linkedin Optimization',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "تحديث وتطوير الملف الشخصي على لينكد إن ليكون احترافياً وجاذباً لمسؤولي التوظيف والزملاء في نفس المجال.", "example": "إضافة صورة احترافية وكتابة ملخص جذاب وإدراج الكلمات المفتاحية المتعلقة بمسارك المهني.", "definition_ar": "تحديث وتطوير الملف الشخصي على لينكد إن ليكون احترافياً وجاذباً لمسؤولي التوظيف والزملاء في نفس المجال.", "slug": "career-glossary-linkedin-optimization"}'::jsonb,
    title_ar = 'تحسين حساب لينكد إن'
WHERE id = 'career-glossary-linkedin-optimization'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Linkedin',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "منصة مهنية لبناء شبكة علاقات والبحث عن وظائف.", "example": "مثال على استخدام مصطلح لينكد إن في السياق المهني.", "definition_ar": "منصة مهنية لبناء شبكة علاقات والبحث عن وظائف.", "slug": "career-glossary-linkedin"}'::jsonb,
    title_ar = 'لينكد إن'
WHERE id = 'career-glossary-linkedin'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Mentorship',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتوجيه شخص أقل خبرة.", "example": "مثال على استخدام مصطلح الإرشاد المهني في السياق المهني.", "definition_ar": "علاقة مهنية يقوم فيها شخص ذو خبرة بتوجيه شخص أقل خبرة.", "slug": "career-glossary-mentorship-2"}'::jsonb,
    title_ar = 'الإرشاد المهني'
WHERE id = 'career-glossary-mentorship-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Mentorship',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "علاقة مهنية يقوم فيها شخص ذو خبرة بتقديم النصح والإرشاد والدعم لشخص أقل خبرة في مساره المهني.", "example": "البحث عن مرشد (Mentor) في شركتك لمساعدتك في تطوير مهاراتك القيادية.", "definition_ar": "علاقة مهنية يقوم فيها شخص ذو خبرة بتقديم النصح والإرشاد والدعم لشخص أقل خبرة في مساره المهني.", "slug": "career-glossary-mentorship"}'::jsonb,
    title_ar = 'التوجيه المهني (المنترشيب)'
WHERE id = 'career-glossary-mentorship'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Mock Interview',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "محاكاة لمقابلة عمل حقيقية للتدرب على الإجابات وتقليل التوتر وتحسين الأداء.", "example": "إجراء مقابلة تجريبية مع صديق أو مستشار مهني وتلقي ملاحظات بناءة على أدائك.", "definition_ar": "محاكاة لمقابلة عمل حقيقية للتدرب على الإجابات وتقليل التوتر وتحسين الأداء.", "slug": "career-glossary-mock-interview"}'::jsonb,
    title_ar = 'المقابلة التجريبية'
WHERE id = 'career-glossary-mock-interview'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Negotiation',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "النقاش للوصول إلى اتفاق حول الراتب والمزايا.", "example": "مثال على استخدام مصطلح التفاوض في السياق المهني.", "definition_ar": "النقاش للوصول إلى اتفاق حول الراتب والمزايا.", "slug": "career-glossary-negotiation"}'::jsonb,
    title_ar = 'التفاوض'
WHERE id = 'career-glossary-negotiation'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Networking',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "بناء علاقات مهنية مفيدة لتبادل المعلومات والفرص.", "example": "مثال على استخدام مصطلح التشبيك في السياق المهني.", "definition_ar": "بناء علاقات مهنية مفيدة لتبادل المعلومات والفرص.", "slug": "career-glossary-networking-2"}'::jsonb,
    title_ar = 'التشبيك'
WHERE id = 'career-glossary-networking-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Networking',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "التواصل مع المهنيين الآخرين لتبادل المعلومات والخبرات واكتشاف الفرص الوظيفية.", "example": "حضور المؤتمرات والفعاليات المهنية للتواصل مع الخبراء والمهتمين بنفس المجال.", "definition_ar": "التواصل مع المهنيين الآخرين لتبادل المعلومات والخبرات واكتشاف الفرص الوظيفية.", "slug": "career-glossary-networking"}'::jsonb,
    title_ar = 'بناء العلاقات المهنية'
WHERE id = 'career-glossary-networking'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Onboarding',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "العملية التي يتم من خلالها دمج الموظفين الجدد في المؤسسة وتعريفهم بثقافتها وأدوارهم ومسؤولياتهم.", "example": "حضور جلسات تعريفية عن سياسات الشركة وتلقي التدريب الأساسي في الأسبوع الأول من العمل.", "definition_ar": "العملية التي يتم من خلالها دمج الموظفين الجدد في المؤسسة وتعريفهم بثقافتها وأدوارهم ومسؤولياتهم.", "slug": "career-glossary-onboarding"}'::jsonb,
    title_ar = 'التهيئة الوظيفية'
WHERE id = 'career-glossary-onboarding'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Personal Branding',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "الطريقة التي تسوق بها نفسك مهنياً.", "example": "مثال على استخدام مصطلح العلامة التجارية الشخصية في السياق المهني.", "definition_ar": "الطريقة التي تسوق بها نفسك مهنياً.", "slug": "career-glossary-personal-branding-2"}'::jsonb,
    title_ar = 'العلامة التجارية الشخصية'
WHERE id = 'career-glossary-personal-branding-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Personal Branding',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "الصورة والانطباع الذي تتركه لدى الآخرين عنك في مجالك المهني، وكيف تسوق لنفسك وخبراتك.", "example": "نشر مقالات متخصصة في مجالك على مدونتك أو حسابك في لينكد إن لبناء سمعة كخبير.", "definition_ar": "الصورة والانطباع الذي تتركه لدى الآخرين عنك في مجالك المهني، وكيف تسوق لنفسك وخبراتك.", "slug": "career-glossary-personal-branding"}'::jsonb,
    title_ar = 'العلامة التجارية الشخصية'
WHERE id = 'career-glossary-personal-branding'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Portfolio',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "مجموعة من أعمالك السابقة التي تثبت مهاراتك.", "example": "مثال على استخدام مصطلح معرض الأعمال في السياق المهني.", "definition_ar": "مجموعة من أعمالك السابقة التي تثبت مهاراتك.", "slug": "career-glossary-portfolio-2"}'::jsonb,
    title_ar = 'معرض الأعمال'
WHERE id = 'career-glossary-portfolio-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Portfolio',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "مجموعة من النماذج والمشاريع التي توضح مهاراتك وخبراتك وإنجازاتك العملية للمستفيدين المحتملين.", "example": "إنشاء موقع إلكتروني يعرض أفضل التصاميم أو المشاريع البرمجية التي قمت بتنفيذها.", "definition_ar": "مجموعة من النماذج والمشاريع التي توضح مهاراتك وخبراتك وإنجازاتك العملية للمستفيدين المحتملين.", "slug": "career-glossary-portfolio"}'::jsonb,
    title_ar = 'معرض الأعمال (البورتفوليو)'
WHERE id = 'career-glossary-portfolio'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Proof Of Work',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "تقديم أدلة ملموسة على قدراتك ومهاراتك من خلال مشاريع حقيقية أو إنجازات سابقة بدلاً من الاعتماد فقط على الشهادات.", "example": "المساهمة في مشاريع مفتوحة المصدر (Open Source) لإثبات كفاءتك البرمجية.", "definition_ar": "تقديم أدلة ملموسة على قدراتك ومهاراتك من خلال مشاريع حقيقية أو إنجازات سابقة بدلاً من الاعتماد فقط على الشهادات.", "slug": "career-glossary-proof-of-work"}'::jsonb,
    title_ar = 'إثبات العمل'
WHERE id = 'career-glossary-proof-of-work'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Remote Work Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "القدرات اللازمة للعمل بفعالية وكفاءة خارج بيئة المكتب التقليدية، مثل إدارة الوقت والتواصل الافتراضي.", "example": "استخدام أدوات مثل Slack و Trello لإدارة المهام والتواصل مع الفريق بسلاسة.", "definition_ar": "القدرات اللازمة للعمل بفعالية وكفاءة خارج بيئة المكتب التقليدية، مثل إدارة الوقت والتواصل الافتراضي.", "slug": "career-glossary-remote-work-skills"}'::jsonb,
    title_ar = 'مهارات العمل عن بعد'
WHERE id = 'career-glossary-remote-work-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Remote Work',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "العمل من موقع خارج المكتب التقليدي.", "example": "مثال على استخدام مصطلح العمل عن بعد في السياق المهني.", "definition_ar": "العمل من موقع خارج المكتب التقليدي.", "slug": "career-glossary-remote-work"}'::jsonb,
    title_ar = 'العمل عن بعد'
WHERE id = 'career-glossary-remote-work'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Reskilling',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "تعلم مهارات جديدة ومختلفة تماماً عن مهاراتك الحالية للانتقال إلى مسار مهني جديد.", "example": "تعلم البرمجة للعاملين في مجال المبيعات بهدف تغيير مسارهم المهني إلى تطوير البرمجيات.", "definition_ar": "تعلم مهارات جديدة ومختلفة تماماً عن مهاراتك الحالية للانتقال إلى مسار مهني جديد.", "slug": "career-glossary-reskilling"}'::jsonb,
    title_ar = 'إعادة التأهيل المهني'
WHERE id = 'career-glossary-reskilling'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Salary Negotiation',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "مناقشة العرض المالي مع صاحب العمل للوصول إلى اتفاق يرضي الطرفين ويعكس القيمة السوقية لمهاراتك.", "example": "البحث عن متوسط الرواتب في السوق لوظيفتك واستخدام هذه المعلومات لدعم موقفك التفاوضي.", "definition_ar": "مناقشة العرض المالي مع صاحب العمل للوصول إلى اتفاق يرضي الطرفين ويعكس القيمة السوقية لمهاراتك.", "slug": "career-glossary-salary-negotiation"}'::jsonb,
    title_ar = 'التفاوض على الراتب'
WHERE id = 'career-glossary-salary-negotiation'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Skill Gap Analysis',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "عملية تحديد المهارات التي تنقصك للوصول إلى هدف مهني معين وكيفية اكتسابها.", "example": "مقارنة مهاراتك الحالية بمتطلبات وظيفة مدير مشروع وتحديد الحاجة للحصول على شهادة PMP.", "definition_ar": "عملية تحديد المهارات التي تنقصك للوصول إلى هدف مهني معين وكيفية اكتسابها.", "slug": "career-glossary-skill-gap-analysis"}'::jsonb,
    title_ar = 'تحليل الفجوة في المهارات'
WHERE id = 'career-glossary-skill-gap-analysis'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Soft Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "سمات شخصية ومهارات تواصل تؤثر على طريقة عملك.", "example": "مثال على استخدام مصطلح المهارات الناعمة في السياق المهني.", "definition_ar": "سمات شخصية ومهارات تواصل تؤثر على طريقة عملك.", "slug": "career-glossary-soft-skills-2"}'::jsonb,
    title_ar = 'المهارات الناعمة'
WHERE id = 'career-glossary-soft-skills-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Soft Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "السمات الشخصية والقدرات الاجتماعية التي تساعدك على التفاعل مع الآخرين والعمل في بيئة جماعية.", "example": "الذكاء العاطفي، حل المشكلات، العمل الجماعي، والمرونة.", "definition_ar": "السمات الشخصية والقدرات الاجتماعية التي تساعدك على التفاعل مع الآخرين والعمل في بيئة جماعية.", "slug": "career-glossary-soft-skills"}'::jsonb,
    title_ar = 'المهارات الشخصية (الناعمة)'
WHERE id = 'career-glossary-soft-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Star Method',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "هيكلية للإجابة على أسئلة المقابلات السلوكية.", "example": "مثال على استخدام مصطلح طريقة STAR في السياق المهني.", "definition_ar": "هيكلية للإجابة على أسئلة المقابلات السلوكية.", "slug": "career-glossary-star-method-2"}'::jsonb,
    title_ar = 'طريقة STAR'
WHERE id = 'career-glossary-star-method-2'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'STAR',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).", "example": "استخدام طريقة ستار لشرح كيف قمت بحل مشكلة مع عميل غاضب وتحقيق نسبة رضا عالية.", "definition_ar": "استراتيجية للإجابة على أسئلة المقابلات السلوكية تتضمن وصف الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).", "slug": "career-glossary-star-method"}'::jsonb,
    title_ar = 'طريقة ستار (STAR)'
WHERE id = 'career-glossary-star-method'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Transferable Skills',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "المهارات التي تكتسبها في وظيفة أو تجربة معينة ويمكن استخدامها وتطبيقها في وظائف ومجالات أخرى.", "example": "مهارات القيادة والتواصل التي اكتسبتها في العمل التطوعي وتطبيقها في بيئة العمل للشركات.", "definition_ar": "المهارات التي تكتسبها في وظيفة أو تجربة معينة ويمكن استخدامها وتطبيقها في وظائف ومجالات أخرى.", "slug": "career-glossary-transferable-skills"}'::jsonb,
    title_ar = 'المهارات القابلة للنقل'
WHERE id = 'career-glossary-transferable-skills'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Upskilling',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "عملية تعلم مهارات جديدة أو تحسين المهارات الحالية لمواكبة التطورات في سوق العمل والتأهل لفرص أفضل.", "example": "أخذ دورة تدريبية في الذكاء الاصطناعي لتعزيز مهاراتك التقنية.", "definition_ar": "عملية تعلم مهارات جديدة أو تحسين المهارات الحالية لمواكبة التطورات في سوق العمل والتأهل لفرص أفضل.", "slug": "career-glossary-upskilling"}'::jsonb,
    title_ar = 'تطوير المهارات'
WHERE id = 'career-glossary-upskilling'
AND status = 'draft';
UPDATE career_glossary
SET
    content_type = 'glossary',
    title_en = 'Work Life Balance',
    portal_id = 'career',
    status = 'draft',
    data = '{"definition": "القدرة على إدارة الوقت بفعالية بين متطلبات العمل والمسؤوليات الشخصية والراحة.", "example": "تحديد ساعات عمل محددة وتخصيص وقت للعائلة والهوايات لتجنب الإرهاق الوظيفي.", "definition_ar": "القدرة على إدارة الوقت بفعالية بين متطلبات العمل والمسؤوليات الشخصية والراحة.", "slug": "career-glossary-work-life-balance"}'::jsonb,
    title_ar = 'التوازن بين العمل والحياة'
WHERE id = 'career-glossary-work-life-balance'
AND status = 'draft';


-- Table: career_lessons
-- Expected updates: 20

UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Ace The Interview',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-ace-the-interview", "excerpt_ar": "# النجاح في المقابلة الشخصية"}'::jsonb,
    title_ar = 'النجاح في المقابلة الشخصية'
WHERE id = 'career-lesson-ace-the-interview'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Ai In Job Search',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-ai-in-job-search", "excerpt_ar": "# استخدام الذكاء الاصطناعي في البحث عن وظيفة"}'::jsonb,
    title_ar = 'استخدام الذكاء الاصطناعي في البحث عن وظيفة'
WHERE id = 'career-lesson-ai-in-job-search'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'The Importance of Building Proof of Work',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-building-proof-of-work", "excerpt_ar": "في الماضي، كانت الشهادات الجامعية هي جواز السفر الوحيد لسوق العمل. اليوم، الشهادات لا تزال مهمة، لكن ''إثبات العمل'' أصبح العامل الحاسم للتميز في العديد..."}'::jsonb,
    title_ar = 'أهمية بناء إثبات العمل في مسيرتك'
WHERE id = 'career-lesson-building-proof-of-work'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Strategies for a Successful Career Change',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-career-change-strategies", "excerpt_ar": "التحول المهني قد يكون مخيفاً، لكنه خطوة ضرورية للعديد من المهنيين للوصول إلى الرضا الوظيفي وتحقيق أهدافهم."}'::jsonb,
    title_ar = 'استراتيجيات للتحول المهني الناجح'
WHERE id = 'career-lesson-career-change-strategies'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Career Transition',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-career-transition", "excerpt_ar": "# الانتقال السلس لمسار مهني جديد"}'::jsonb,
    title_ar = 'الانتقال السلس لمسار مهني جديد'
WHERE id = 'career-lesson-career-transition'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Writing a Standout Cover Letter',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-cover-letters-that-stand-out", "excerpt_ar": "خطاب المقدمة هو فرصتك للتحدث المباشر مع صاحب العمل وشرح ''السبب'' وراء رغبتك في الانضمام إليهم، وليس فقط إعادة صياغة سيرتك الذاتية."}'::jsonb,
    title_ar = 'كتابة خطاب مقدمة متميز'
WHERE id = 'career-lesson-cover-letters-that-stand-out'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'CV Improvement for Better Results',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-cv-improvement", "excerpt_ar": "السيرة الذاتية ليست مجرد سجل تاريخي لماضيك المهني، بل هي أداة تسويقية تهدف إلى إبراز قيمتك المستقبلية للشركة."}'::jsonb,
    title_ar = 'تحسين السيرة الذاتية لنتائج أفضل'
WHERE id = 'career-lesson-cv-improvement'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Effective Job Search Systems',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-effective-job-search-systems", "excerpt_ar": "البحث عن عمل هو وظيفة بحد ذاتها، ويتطلب تنظيماً ونهجاً استراتيجياً للحصول على أفضل النتائج."}'::jsonb,
    title_ar = 'أنظمة فعالة للبحث عن عمل'
WHERE id = 'career-lesson-effective-job-search-systems'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Ethical Use of AI in Job Searching',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-ethical-ai-job-search", "excerpt_ar": "أدوات الذكاء الاصطناعي مثل ChatGPT يمكن أن تكون مساعداً قوياً في رحلة البحث عن عمل، ولكن يجب استخدامها بحذر ومسؤولية للحفاظ على مصداقيتك."}'::jsonb,
    title_ar = 'الاستخدام الأخلاقي للذكاء الاصطناعي في البحث عن عمل'
WHERE id = 'career-lesson-ethical-ai-job-search'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Comprehensive Interview Preparation Guide',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-interview-preparation-guide", "excerpt_ar": "التحضير الجيد هو المفتاح للتغلب على توتر المقابلات وإظهار ثقتك وكفاءتك."}'::jsonb,
    title_ar = 'الدليل الشامل للتحضير للمقابلات'
WHERE id = 'career-lesson-interview-preparation-guide'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Linkedin Mastery',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-linkedin-mastery", "excerpt_ar": "# احتراف استخدام لينكد إن"}'::jsonb,
    title_ar = 'احتراف استخدام لينكد إن'
WHERE id = 'career-lesson-linkedin-mastery'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Building a Professional LinkedIn Profile',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-linkedin-profile-optimization", "excerpt_ar": "لينكد إن هو واجهتك الرقمية الأولى وأهم شبكة مهنية. الملف الشخصي القوي لا يجذب فقط أصحاب العمل بل يفتح لك أبواباً لفرص وتواصل غير متوقع."}'::jsonb,
    title_ar = 'بناء ملف شخصي احترافي على لينكد إن'
WHERE id = 'career-lesson-linkedin-profile-optimization'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Mastering STAR Stories',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-mastering-star-stories", "excerpt_ar": "طريقة STAR هي الهيكل الأمثل للإجابة على أسئلة المقابلات السلوكية التي تبدأ عادة بـ ''حدثني عن وقت...'' أو ''أعطني مثالاً على...''."}'::jsonb,
    title_ar = 'إتقان قصص طريقة ستار (STAR)'
WHERE id = 'career-lesson-mastering-star-stories'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'The Art of Networking Messaging',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-networking-messaging", "excerpt_ar": "الوصول البارد (Cold Outreach) عبر لينكد إن أو البريد الإلكتروني يمكن أن يفتح أبواباً للفرص إذا تم بطريقة صحيحة واحترافية."}'::jsonb,
    title_ar = 'فن كتابة رسائل التواصل المهني'
WHERE id = 'career-lesson-networking-messaging'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Perfect Cv',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-perfect-cv", "excerpt_ar": "# كتابة السيرة الذاتية المثالية"}'::jsonb,
    title_ar = 'كتابة السيرة الذاتية المثالية'
WHERE id = 'career-lesson-perfect-cv'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Building Portfolio Evidence',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-portfolio-evidence", "excerpt_ar": "في سوق العمل التنافسي اليوم، السيرة الذاتية لا تكفي وحدها. أصحاب العمل يريدون أن ''يروا'' قدراتك بدلاً من مجرد القراءة عنها."}'::jsonb,
    title_ar = 'بناء معرض أعمال كدليل إثبات'
WHERE id = 'career-lesson-portfolio-evidence'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Readiness and Success in Remote Work',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-remote-work-readiness", "excerpt_ar": "العمل عن بعد يتطلب مجموعة مختلفة من المهارات عن العمل المكتبي التقليدي، بدءاً من الانضباط الذاتي وحتى التواصل غير المتزامن."}'::jsonb,
    title_ar = 'الاستعداد والنجاح في العمل عن بعد'
WHERE id = 'career-lesson-remote-work-readiness'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Basics of Confident Salary Negotiation',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-salary-negotiation-basics", "excerpt_ar": "العديد من المهنيين يتجنبون التفاوض على الراتب خوفاً من فقدان العرض الوظيفي، لكن التفاوض هو جزء طبيعي ومتوقع من عملية التوظيف."}'::jsonb,
    title_ar = 'أساسيات التفاوض على الراتب بثقة'
WHERE id = 'career-lesson-salary-negotiation-basics'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Skill Gap Planning',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-skill-gap-planning", "excerpt_ar": "لتحقيق التطور المهني المستمر والوصول إلى أهدافك، يجب أن تكون قادراً على تحديد المهارات التي تنقصك ووضع خطة لاكتسابها."}'::jsonb,
    title_ar = 'التخطيط لسد الفجوة في المهارات'
WHERE id = 'career-lesson-skill-gap-planning'
AND status = 'draft';
UPDATE career_lessons
SET
    content_type = 'lesson',
    title_en = 'Star Method Guide',
    portal_id = 'career',
    status = 'draft',
    data = '{"slug": "career-lesson-star-method-guide", "excerpt_ar": "# الدليل الشامل لطريقة STAR"}'::jsonb,
    title_ar = 'الدليل الشامل لطريقة STAR'
WHERE id = 'career-lesson-star-method-guide'
AND status = 'draft';


-- Table: career_prompts
-- Expected updates: 30

UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Achievements Bullet Points',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "حول هذه المهمة العادية: [وصف المهمة] إلى نقطة إنجاز قوية للسيرة الذاتية باستخدام صيغة (الفعل + المهمة + النتيجة أو التأثير) والأرقام إن أمكن.", "instructions": "ركز على التأثير الذي أحدثته بدلاً من مجرد سرد المهام اليومية.", "prompt_text_ar": "حول هذه المهمة العادية: [وصف المهمة] إلى نقطة إنجاز قوية للسيرة الذاتية باستخدام صيغة (الفعل + المهمة + النتيجة أو التأثير) والأرقام إن أمكن.", "slug": "career-prompt-achievements-bullet-points"}'::jsonb,
    title_ar = 'صياغة نقاط إنجاز للسيرة الذاتية'
WHERE id = 'career-prompt-achievements-bullet-points'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Growth Discussion',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أرغب في مناقشة فرص التطور المهني والترقية مع مديري. اقترح عليّ هيكلاً لهذه المناقشة، والنقاط التي يجب أن أركز عليها، وكيف يمكنني طلب دعم الشركة في خطتي التطويرية.", "instructions": "اجمع أدلة على إنجازاتك وقيمتك المضافة قبل هذا الاجتماع.", "prompt_text_ar": "أرغب في مناقشة فرص التطور المهني والترقية مع مديري. اقترح عليّ هيكلاً لهذه المناقشة، والنقاط التي يجب أن أركز عليها، وكيف يمكنني طلب دعم الشركة في خطتي التطويرية.", "slug": "career-prompt-career-growth-discussion"}'::jsonb,
    title_ar = 'مناقشة التطور المهني مع المدير'
WHERE id = 'career-prompt-career-growth-discussion'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Career Shift Plan',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "ضع لي خطة للانتقال من مجال [المجال الحالي] إلى مجال [المجال الجديد].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "ضع لي خطة للانتقال من مجال [المجال الحالي] إلى مجال [المجال الجديد].", "slug": "career-prompt-career-shift-plan-2"}'::jsonb,
    title_ar = 'خطة تغيير المسار'
WHERE id = 'career-prompt-career-shift-plan-2'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Shift Plan',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أرغب في تغيير مساري المهني من [المجال الحالي] إلى [المجال المستهدف]. ساعدني في وضع خطة عمل خطوة بخطوة للتحول المهني، بما في ذلك المهارات التي يجب تعلمها، وكيفية تسويق مهاراتي القابلة للنقل.", "instructions": "حدد الموارد التعليمية وابدأ بتنفيذ الخطة تدريجياً.", "prompt_text_ar": "أرغب في تغيير مساري المهني من [المجال الحالي] إلى [المجال المستهدف]. ساعدني في وضع خطة عمل خطوة بخطوة للتحول المهني، بما في ذلك المهارات التي يجب تعلمها، وكيفية تسويق مهاراتي القابلة للنقل.", "slug": "career-prompt-career-shift-plan"}'::jsonb,
    title_ar = 'خطة التحول المهني'
WHERE id = 'career-prompt-career-shift-plan'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Cover Letter Gen',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اكتب خطاب مقدمة احترافي لوظيفة [المسمى الوظيفي] في شركة [اسم الشركة].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب خطاب مقدمة احترافي لوظيفة [المسمى الوظيفي] في شركة [اسم الشركة].", "slug": "career-prompt-cover-letter-gen"}'::jsonb,
    title_ar = 'كتابة خطاب مقدمة'
WHERE id = 'career-prompt-cover-letter-gen'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Cover Letter Generation',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "بناءً على سيرتي الذاتية: [السيرة الذاتية] والوصف الوظيفي: [الوصف الوظيفي] لشركة [اسم الشركة]، اكتب خطاب مقدمة احترافي ومقنع يسلط الضوء على أبرز إنجازاتي وكيف يمكنني إضافة قيمة للشركة.", "instructions": "راجع الخطاب المنتج وعدل عليه ليحمل بصمتك الشخصية قبل إرساله.", "prompt_text_ar": "بناءً على سيرتي الذاتية: [السيرة الذاتية] والوصف الوظيفي: [الوصف الوظيفي] لشركة [اسم الشركة]، اكتب خطاب مقدمة احترافي ومقنع يسلط الضوء على أبرز إنجازاتي وكيف يمكنني إضافة قيمة للشركة.", "slug": "career-prompt-cover-letter-generation"}'::jsonb,
    title_ar = 'كتابة خطاب مقدمة مقنع'
WHERE id = 'career-prompt-cover-letter-generation'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Cv Review',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "قم بمراجعة سيرتي الذاتية التالية واقترح تحسينات: [نص السيرة]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "قم بمراجعة سيرتي الذاتية التالية واقترح تحسينات: [نص السيرة]", "slug": "career-prompt-cv-review"}'::jsonb,
    title_ar = 'مراجعة السيرة الذاتية'
WHERE id = 'career-prompt-cv-review'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'CV Tailoring',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "قم بمراجعة الوصف الوظيفي التالي: [الوصف الوظيفي] والسيرة الذاتية الخاصة بي: [السيرة الذاتية]. اقترح تعديلات على سيرتي الذاتية لتتناسب بشكل أفضل مع الوصف الوظيفي، مع التركيز على إبراز المهارات والخبرات ذات الصلة.", "instructions": "استخدم هذا الموجه لتعديل سيرتك الذاتية لكل وظيفة تتقدم إليها لزيادة فرصك في تجاوز أنظمة تتبع المتقدمين.", "prompt_text_ar": "قم بمراجعة الوصف الوظيفي التالي: [الوصف الوظيفي] والسيرة الذاتية الخاصة بي: [السيرة الذاتية]. اقترح تعديلات على سيرتي الذاتية لتتناسب بشكل أفضل مع الوصف الوظيفي، مع التركيز على إبراز المهارات والخبرات ذات الصلة.", "slug": "career-prompt-cv-tailoring"}'::jsonb,
    title_ar = 'تخصيص السيرة الذاتية للوظيفة'
WHERE id = 'career-prompt-cv-tailoring'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Elevator Pitch Creation',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "استناداً إلى خبرتي في [مجال الخبرة] وإنجازي الأبرز وهو [الإنجاز]، قم بصياغة عرض تعريفي سريع (Elevator Pitch) يستغرق 30 ثانية أستخدمه في فعاليات التواصل المهني لتعريف الناس بما أقوم به وما أبحث عنه.", "instructions": "تدرب على إلقاء العرض بصوت عالٍ حتى يبدو طبيعياً وواثقاً.", "prompt_text_ar": "استناداً إلى خبرتي في [مجال الخبرة] وإنجازي الأبرز وهو [الإنجاز]، قم بصياغة عرض تعريفي سريع (Elevator Pitch) يستغرق 30 ثانية أستخدمه في فعاليات التواصل المهني لتعريف الناس بما أقوم به وما أبحث عنه.", "slug": "career-prompt-elevator-pitch-creation"}'::jsonb,
    title_ar = 'صياغة العرض التعريفي السريع'
WHERE id = 'career-prompt-elevator-pitch-creation'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Ethical AI Application',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "كيف يمكنني استخدام أدوات الذكاء الاصطناعي لتحسين سيرتي الذاتية والتحضير للمقابلات بطريقة أخلاقية وشفافة، دون المبالغة أو تقديم معلومات غير دقيقة؟", "instructions": "استخدم الذكاء الاصطناعي كأداة للمساعدة والتحسين وليس كبديل لجهدك الشخصي وصدقك.", "prompt_text_ar": "كيف يمكنني استخدام أدوات الذكاء الاصطناعي لتحسين سيرتي الذاتية والتحضير للمقابلات بطريقة أخلاقية وشفافة، دون المبالغة أو تقديم معلومات غير دقيقة؟", "slug": "career-prompt-ethical-ai-application"}'::jsonb,
    title_ar = 'الاستخدام الأخلاقي للذكاء الاصطناعي في التوظيف'
WHERE id = 'career-prompt-ethical-ai-application'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Follow Up After Interview',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أجريت اليوم مقابلة لوظيفة [اسم الوظيفة] مع [اسم المقابل]. اكتب رسالة بريد إلكتروني للمتابعة أشكره فيها على وقته، وأؤكد على اهتمامي بالوظيفة، وأشير بإيجاز إلى موضوع مثير للاهتمام ناقشناه خلال المقابلة وهو [موضوع النقاش].", "instructions": "أرسل رسالة المتابعة خلال 24 ساعة من إجراء المقابلة.", "prompt_text_ar": "أجريت اليوم مقابلة لوظيفة [اسم الوظيفة] مع [اسم المقابل]. اكتب رسالة بريد إلكتروني للمتابعة أشكره فيها على وقته، وأؤكد على اهتمامي بالوظيفة، وأشير بإيجاز إلى موضوع مثير للاهتمام ناقشناه خلال المقابلة وهو [موضوع النقاش].", "slug": "career-prompt-follow-up-after-interview"}'::jsonb,
    title_ar = 'رسالة متابعة بعد المقابلة'
WHERE id = 'career-prompt-follow-up-after-interview'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Proposal',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أعمل كمستقل في مجال [مجالك]. اكتب لي نموذجاً لعرض عمل (Proposal) لتقديمه لعميل محتمل لتنفيذ مشروع [وصف المشروع]. يجب أن يتضمن العرض فهمي للمشكلة، الحل المقترح، الإطار الزمني، والتكلفة التقديرية.", "instructions": "قم بتخصيص العرض لكل عميل وتوضيح القيمة التي ستقدمها لمشروعه تحديداً.", "prompt_text_ar": "أعمل كمستقل في مجال [مجالك]. اكتب لي نموذجاً لعرض عمل (Proposal) لتقديمه لعميل محتمل لتنفيذ مشروع [وصف المشروع]. يجب أن يتضمن العرض فهمي للمشكلة، الحل المقترح، الإطار الزمني، والتكلفة التقديرية.", "slug": "career-prompt-freelance-proposal"}'::jsonb,
    title_ar = 'كتابة عرض عمل حر (Proposal)'
WHERE id = 'career-prompt-freelance-proposal'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Handling Rejection',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "تلقيت رسالة رفض بعد إجراء مقابلة لوظيفة كنت مهتماً بها. اكتب رداً احترافياً أشكرهم فيه على الفرصة، وأطلب ملاحظات بناءة (Feedback) حول أدائي في المقابلة لتحسين فرصي في المستقبل.", "instructions": "طلب الملاحظات يمكن أن يكون فرصة ممتازة للتعلم والتطور، وقد يترك انطباعاً إيجابياً دائماً.", "prompt_text_ar": "تلقيت رسالة رفض بعد إجراء مقابلة لوظيفة كنت مهتماً بها. اكتب رداً احترافياً أشكرهم فيه على الفرصة، وأطلب ملاحظات بناءة (Feedback) حول أدائي في المقابلة لتحسين فرصي في المستقبل.", "slug": "career-prompt-handling-rejection"}'::jsonb,
    title_ar = 'الرد على رسالة رفض وظيفي'
WHERE id = 'career-prompt-handling-rejection'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Interview Prep Star',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أنا أستعد لمقابلة لوظيفة [اسم الوظيفة]. يرجى تزويدي بـ 5 أسئلة سلوكية شائعة لهذه الوظيفة، واقترح كيف يمكنني الإجابة على كل منها باستخدام طريقة STAR بناءً على خبرتي في [مجال خبرتك].", "instructions": "استخدم الإجابات المقترحة كنقطة انطلاق لتدوين قصصك الواقعية.", "prompt_text_ar": "أنا أستعد لمقابلة لوظيفة [اسم الوظيفة]. يرجى تزويدي بـ 5 أسئلة سلوكية شائعة لهذه الوظيفة، واقترح كيف يمكنني الإجابة على كل منها باستخدام طريقة STAR بناءً على خبرتي في [مجال خبرتك].", "slug": "career-prompt-interview-prep-star"}'::jsonb,
    title_ar = 'التحضير للمقابلة بطريقة ستار'
WHERE id = 'career-prompt-interview-prep-star'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Interview Prep',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اطرح علي أسئلة مقابلة شائعة لوظيفة [المسمى الوظيفي] وقيّم إجاباتي.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اطرح علي أسئلة مقابلة شائعة لوظيفة [المسمى الوظيفي] وقيّم إجاباتي.", "slug": "career-prompt-interview-prep"}'::jsonb,
    title_ar = 'التحضير للمقابلة'
WHERE id = 'career-prompt-interview-prep'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Job Search Keywords',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "استخرج أهم الكلمات المفتاحية والمهارات من هذا الوصف الوظيفي: [نص الوصف الوظيفي]. قم بتصنيفها إلى مهارات تقنية، مهارات ناعمة، ومتطلبات أخرى.", "instructions": "استخدم هذه الكلمات المفتاحية في سيرتك الذاتية وملفك على لينكد إن لزيادة ظهورك.", "prompt_text_ar": "استخرج أهم الكلمات المفتاحية والمهارات من هذا الوصف الوظيفي: [نص الوصف الوظيفي]. قم بتصنيفها إلى مهارات تقنية، مهارات ناعمة، ومتطلبات أخرى.", "slug": "career-prompt-job-search-keywords"}'::jsonb,
    title_ar = 'استخراج الكلمات المفتاحية للبحث'
WHERE id = 'career-prompt-job-search-keywords'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Linkedin Summary',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اكتب ملخص احترافي لملفي الشخصي على لينكد إن بناءً على خبراتي: [الخبرات]", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب ملخص احترافي لملفي الشخصي على لينكد إن بناءً على خبراتي: [الخبرات]", "slug": "career-prompt-linkedin-summary-2"}'::jsonb,
    title_ar = 'ملخص لينكد إن'
WHERE id = 'career-prompt-linkedin-summary-2'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Linkedin Summary',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اكتب ملخصاً جذاباً لحسابي على لينكد إن بناءً على المعلومات التالية عن خبراتي وأهدافي المهنية: [معلومات عن خبراتك وأهدافك]. اجعل الملخص يعكس شخصيتي المهنية ويشمل الكلمات المفتاحية لمجال [مجال عملك].", "instructions": "تأكد من أن الملخص يبرز ما يجعلك فريداً في مجالك.", "prompt_text_ar": "اكتب ملخصاً جذاباً لحسابي على لينكد إن بناءً على المعلومات التالية عن خبراتي وأهدافي المهنية: [معلومات عن خبراتك وأهدافك]. اجعل الملخص يعكس شخصيتي المهنية ويشمل الكلمات المفتاحية لمجال [مجال عملك].", "slug": "career-prompt-linkedin-summary"}'::jsonb,
    title_ar = 'كتابة ملخص احترافي للينكد إن'
WHERE id = 'career-prompt-linkedin-summary'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Mock Interview Simulation',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أريدك أن تلعب دور مسؤول توظيف يجري مقابلة معي لوظيفة [اسم الوظيفة]. اطرح عليّ سؤالاً تلو الآخر، وانتظر إجابتي، ثم قدم لي تقييماً بناءً وكيف يمكنني تحسين إجابتي.", "instructions": "تفاعل مع النموذج وكأنك في مقابلة حقيقية لتعظيم الفائدة.", "prompt_text_ar": "أريدك أن تلعب دور مسؤول توظيف يجري مقابلة معي لوظيفة [اسم الوظيفة]. اطرح عليّ سؤالاً تلو الآخر، وانتظر إجابتي، ثم قدم لي تقييماً بناءً وكيف يمكنني تحسين إجابتي.", "slug": "career-prompt-mock-interview-simulation"}'::jsonb,
    title_ar = 'محاكاة مقابلة عمل'
WHERE id = 'career-prompt-mock-interview-simulation'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Networking Message',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أريد التواصل مع [اسم الشخص أو المسمى الوظيفي] الذي يعمل في شركة [اسم الشركة] على لينكد إن. اكتب رسالة قصيرة ومهذبة لطلب التواصل وربما طلب مقابلة استكشافية قصيرة لمعرفة المزيد عن مساره المهني.", "instructions": "قم بتخصيص الرسالة وذكر سبب اهتمامك بالتواصل مع هذا الشخص تحديداً.", "prompt_text_ar": "أريد التواصل مع [اسم الشخص أو المسمى الوظيفي] الذي يعمل في شركة [اسم الشركة] على لينكد إن. اكتب رسالة قصيرة ومهذبة لطلب التواصل وربما طلب مقابلة استكشافية قصيرة لمعرفة المزيد عن مساره المهني.", "slug": "career-prompt-networking-message"}'::jsonb,
    title_ar = 'رسالة تواصل مهني على لينكد إن'
WHERE id = 'career-prompt-networking-message'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Networking Msg',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اكتب رسالة تواصل احترافية لإرسالها لشخص يعمل في شركة أحلم بالعمل بها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اكتب رسالة تواصل احترافية لإرسالها لشخص يعمل في شركة أحلم بالعمل بها.", "slug": "career-prompt-networking-msg"}'::jsonb,
    title_ar = 'رسالة تشبيك'
WHERE id = 'career-prompt-networking-msg'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Portfolio Ideas',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "اقترح علي أفكار مشاريع أضيفها لمعرض أعمالي في مجال [مجال العمل].", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "اقترح علي أفكار مشاريع أضيفها لمعرض أعمالي في مجال [مجال العمل].", "slug": "career-prompt-portfolio-ideas-2"}'::jsonb,
    title_ar = 'أفكار لمعرض الأعمال'
WHERE id = 'career-prompt-portfolio-ideas-2'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Portfolio Ideas',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أعمل في مجال [مجالك] وأرغب في بناء معرض أعمال (بورتفوليو) قوي. اقترح 3 أفكار لمشاريع عملية يمكنني تنفيذها وإضافتها لمعرض أعمالي لإثبات مهاراتي في [مهارة معينة].", "instructions": "اختر المشاريع التي تظهر شغفك وقدرتك على حل المشاكل الواقعية.", "prompt_text_ar": "أعمل في مجال [مجالك] وأرغب في بناء معرض أعمال (بورتفوليو) قوي. اقترح 3 أفكار لمشاريع عملية يمكنني تنفيذها وإضافتها لمعرض أعمالي لإثبات مهاراتي في [مهارة معينة].", "slug": "career-prompt-portfolio-ideas"}'::jsonb,
    title_ar = 'أفكار لمشاريع معرض الأعمال'
WHERE id = 'career-prompt-portfolio-ideas'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Remote Work Readiness',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أرغب في التقدم لوظيفة عن بعد بالكامل. ما هي أهم المهارات والأدوات التي يجب أن أتقنها، وكيف يمكنني إثبات قدرتي على العمل باستقلالية وإدارة وقتي بفعالية في سيرتي الذاتية؟", "instructions": "احرص على تضمين أمثلة لخبرات سابقة في العمل أو التعلم عن بعد إن وجدت.", "prompt_text_ar": "أرغب في التقدم لوظيفة عن بعد بالكامل. ما هي أهم المهارات والأدوات التي يجب أن أتقنها، وكيف يمكنني إثبات قدرتي على العمل باستقلالية وإدارة وقتي بفعالية في سيرتي الذاتية؟", "slug": "career-prompt-remote-work-readiness"}'::jsonb,
    title_ar = 'تقييم الجاهزية للعمل عن بعد'
WHERE id = 'career-prompt-remote-work-readiness'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Resignation Letter',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "أحتاج إلى كتابة خطاب استقالة رسمي لمديري في شركة [اسم الشركة] بمناسبة انتقالي لفرصة جديدة. سأغادر في تاريخ [تاريخ المغادرة]. اجعل الخطاب احترافياً، وإيجابياً، واعرض فيه المساعدة خلال فترة الانتقال.", "instructions": "احرص على ترك انطباع جيد والحفاظ على العلاقات المهنية حتى عند المغادرة.", "prompt_text_ar": "أحتاج إلى كتابة خطاب استقالة رسمي لمديري في شركة [اسم الشركة] بمناسبة انتقالي لفرصة جديدة. سأغادر في تاريخ [تاريخ المغادرة]. اجعل الخطاب احترافياً، وإيجابياً، واعرض فيه المساعدة خلال فترة الانتقال.", "slug": "career-prompt-resignation-letter"}'::jsonb,
    title_ar = 'كتابة خطاب استقالة'
WHERE id = 'career-prompt-resignation-letter'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Salary Negotiation Script',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "تلقيت عرض عمل بوظيفة [اسم الوظيفة] براتب [الراتب المعروض]، لكنني أطمح للوصول إلى [الراتب المستهدف]. اكتب لي سيناريو احترافي للتفاوض على الراتب عبر البريد الإلكتروني أو الهاتف يبرز قيمتي وما يمكنني تقديمه للشركة.", "instructions": "تأكد من إجراء بحث حول متوسط الرواتب في السوق قبل التفاوض.", "prompt_text_ar": "تلقيت عرض عمل بوظيفة [اسم الوظيفة] براتب [الراتب المعروض]، لكنني أطمح للوصول إلى [الراتب المستهدف]. اكتب لي سيناريو احترافي للتفاوض على الراتب عبر البريد الإلكتروني أو الهاتف يبرز قيمتي وما يمكنني تقديمه للشركة.", "slug": "career-prompt-salary-negotiation-script"}'::jsonb,
    title_ar = 'سيناريو التفاوض على الراتب'
WHERE id = 'career-prompt-salary-negotiation-script'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Salary Negotiation',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "كيف أفاوض على راتب أعلى لوظيفة [المسمى الوظيفي]؟ أعطني سيناريو وحوار مقترح.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "كيف أفاوض على راتب أعلى لوظيفة [المسمى الوظيفي]؟ أعطني سيناريو وحوار مقترح.", "slug": "career-prompt-salary-negotiation"}'::jsonb,
    title_ar = 'التفاوض على الراتب'
WHERE id = 'career-prompt-salary-negotiation'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Skill Gap Analysis',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "هدفي المهني هو الوصول إلى منصب [المنصب المستهدف]. حالياً أمتلك المهارات التالية: [المهارات الحالية]. قم بتحليل الفجوة في المهارات واقترح خطة واضحة والمهارات التي يجب أن أتعلمها لتحقيق هدفي.", "instructions": "استخدم هذا الموجه لبناء خطة تطوير شخصية واقعية.", "prompt_text_ar": "هدفي المهني هو الوصول إلى منصب [المنصب المستهدف]. حالياً أمتلك المهارات التالية: [المهارات الحالية]. قم بتحليل الفجوة في المهارات واقترح خطة واضحة والمهارات التي يجب أن أتعلمها لتحقيق هدفي.", "slug": "career-prompt-skill-gap-analysis"}'::jsonb,
    title_ar = 'تحليل الفجوة في المهارات'
WHERE id = 'career-prompt-skill-gap-analysis'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Skills Gap',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "قارن بين مهاراتي الحالية ومتطلبات وظيفة [المسمى الوظيفي] وحدد المهارات التي أحتاج تطويرها.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "قارن بين مهاراتي الحالية ومتطلبات وظيفة [المسمى الوظيفي] وحدد المهارات التي أحتاج تطويرها.", "slug": "career-prompt-skills-gap"}'::jsonb,
    title_ar = 'تحليل فجوة المهارات'
WHERE id = 'career-prompt-skills-gap'
AND status = 'draft';
UPDATE career_prompts
SET
    content_type = 'prompt',
    title_en = 'Star Answer',
    portal_id = 'career',
    status = 'draft',
    data = '{"prompt_text": "ساعدني في صياغة إجابة بطريقة STAR لموقف واجهت فيه تحدياً في العمل.", "instructions": "استخدم هذا التلقين للحصول على مساعدة في مسارك المهني.", "prompt_text_ar": "ساعدني في صياغة إجابة بطريقة STAR لموقف واجهت فيه تحدياً في العمل.", "slug": "career-prompt-star-answer"}'::jsonb,
    title_ar = 'إجابة STAR'
WHERE id = 'career-prompt-star-answer'
AND status = 'draft';


-- Table: career_resources
-- Expected updates: 30

UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Behance',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.behance.net", "description": "منصة رائدة للمصممين والمبدعين لعرض أعمالهم (Portfolio) واكتشاف الفرص المهنية.", "slug": "career-resource-behance"}'::jsonb,
    title_ar = 'بيهانس'
WHERE id = 'career-resource-behance'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Career Advice',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "مدونة تقدم مقالات ونصائح قيمة لتطوير مسارك المهني.", "slug": "career-resource-career-advice"}'::jsonb,
    title_ar = 'نصائح مهنية'
WHERE id = 'career-resource-career-advice'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Coursera',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.coursera.org", "description": "منصة تعليمية توفر برامج وشهادات من جامعات وشركات عالمية رائدة لتطوير المهارات.", "slug": "career-resource-coursera"}'::jsonb,
    title_ar = 'كورسيرا'
WHERE id = 'career-resource-coursera'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Cover Letter Examples',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "مجموعة من خطابات المقدمة الناجحة لمختلف المجالات.", "slug": "career-resource-cover-letter-examples"}'::jsonb,
    title_ar = 'نماذج خطابات مقدمة'
WHERE id = 'career-resource-cover-letter-examples'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Cv Templates',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "موقع يقدم قوالب سيرة ذاتية احترافية ومجانية.", "slug": "career-resource-cv-templates"}'::jsonb,
    title_ar = 'قوالب سيرة ذاتية'
WHERE id = 'career-resource-cv-templates'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Edx',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.edx.org", "description": "منصة تعليمية توفر دورات مجانية ومدفوعة من أفضل الجامعات والمؤسسات حول العالم.", "slug": "career-resource-edx"}'::jsonb,
    title_ar = 'إي دي إكس'
WHERE id = 'career-resource-edx'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Github',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://github.com", "description": "منصة أساسية للمبرمجين لبناء معرض أعمالهم ومشاركة الكود والمساهمة في مشاريع مفتوحة المصدر.", "slug": "career-resource-github"}'::jsonb,
    title_ar = 'جيت هب'
WHERE id = 'career-resource-github'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Glassdoor',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.glassdoor.com", "description": "موقع للبحث عن الوظائف ومراجعات الشركات ومقارنة الرواتب والتحضير للمقابلات.", "slug": "career-resource-glassdoor"}'::jsonb,
    title_ar = 'جلاس دور'
WHERE id = 'career-resource-glassdoor'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Harvard Services',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://careerservices.fas.harvard.edu", "description": "مكتبة غنية بالأدلة والنماذج المجانية لكتابة السير الذاتية وخطابات المقدمة والتحضير للمقابلات.", "slug": "career-resource-harvard-career-services"}'::jsonb,
    title_ar = 'خدمات التوظيف بجامعة هارفارد'
WHERE id = 'career-resource-harvard-career-services'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Hunter Io',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://hunter.io", "description": "أداة مفيدة للعثور على عناوين البريد الإلكتروني للمحترفين ومسؤولي التوظيف للتواصل المباشر.", "slug": "career-resource-hunter-io"}'::jsonb,
    title_ar = 'هانتر'
WHERE id = 'career-resource-hunter-io'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Indeed',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.indeed.com", "description": "واحد من أكبر محركات البحث عن الوظائف في العالم، يوفر أيضاً معلومات حول الرواتب وتقييمات الشركات.", "slug": "career-resource-indeed"}'::jsonb,
    title_ar = 'إنديد'
WHERE id = 'career-resource-indeed'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Interview Query',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.interviewquery.com", "description": "منصة متخصصة للتحضير لمقابلات علوم البيانات والهندسة وتوفر أسئلة حقيقية من مقابلات شركات كبرى.", "slug": "career-resource-interview-query"}'::jsonb,
    title_ar = 'إنترفيو كويري'
WHERE id = 'career-resource-interview-query'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Interview Questions',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "بنك لأسئلة المقابلات الشخصية مع إجابات نموذجية.", "slug": "career-resource-interview-questions"}'::jsonb,
    title_ar = 'أسئلة المقابلات'
WHERE id = 'career-resource-interview-questions'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Job Boards',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "أهم المنصات للبحث عن وظائف في العالم العربي.", "slug": "career-resource-job-boards"}'::jsonb,
    title_ar = 'منصات التوظيف'
WHERE id = 'career-resource-job-boards'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Jobscan',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.jobscan.co", "description": "أداة لمقارنة سيرتك الذاتية مع الوصف الوظيفي وتحديد الكلمات المفتاحية المفقودة لتحسين فرصك.", "slug": "career-resource-jobscan"}'::jsonb,
    title_ar = 'جوب سكان'
WHERE id = 'career-resource-jobscan'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Linkedin Guide',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "دليل شامل لتحسين ملفك الشخصي على لينكد إن.", "slug": "career-resource-linkedin-guide"}'::jsonb,
    title_ar = 'دليل لينكد إن'
WHERE id = 'career-resource-linkedin-guide'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Linkedin Learning',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.linkedin.com/learning", "description": "منصة تقدم آلاف الدورات التدريبية في مجالات الأعمال والتكنولوجيا والمهارات الإبداعية والناعمة.", "slug": "career-resource-linkedin-learning"}'::jsonb,
    title_ar = 'دورات لينكد إن التعليمية'
WHERE id = 'career-resource-linkedin-learning'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Meetup',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.meetup.com", "description": "منصة للعثور على مجموعات مهنية وتقنية وبناء شبكة علاقات (Networking) في منطقتك.", "slug": "career-resource-meetup"}'::jsonb,
    title_ar = 'ميت أب'
WHERE id = 'career-resource-meetup'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'My Interview Practice',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://myinterviewpractice.com", "description": "أداة لمحاكاة مقابلات العمل وتسجيل إجاباتك لمراجعتها وتحسين أدائك.", "slug": "career-resource-my-interview-practice"}'::jsonb,
    title_ar = 'ماي إنترفيو براكتس'
WHERE id = 'career-resource-my-interview-practice'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Novoresume',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://novoresume.com", "description": "أداة لإنشاء سير ذاتية احترافية تتوافق مع أنظمة تتبع المتقدمين (ATS) بخطوات بسيطة.", "slug": "career-resource-novoresume"}'::jsonb,
    title_ar = 'نوفو ريزومي'
WHERE id = 'career-resource-novoresume'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Payscale',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.payscale.com", "description": "موقع رائد لتقديم بيانات دقيقة حول الرواتب والتعويضات بناءً على المسمى الوظيفي والموقع والخبرة.", "slug": "career-resource-payscale"}'::jsonb,
    title_ar = 'باي سكيل'
WHERE id = 'career-resource-payscale'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Portfolio Builder',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "أداة لبناء معرض أعمال رقمي بسهولة.", "slug": "career-resource-portfolio-builder"}'::jsonb,
    title_ar = 'منشئ معارض الأعمال'
WHERE id = 'career-resource-portfolio-builder'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Pramp',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.pramp.com", "description": "منصة مجانية لإجراء مقابلات تجريبية (Mock Interviews) مع زملاء في مجالات البرمجة والتصميم وإدارة المنتجات.", "slug": "career-resource-pramp"}'::jsonb,
    title_ar = 'برامب'
WHERE id = 'career-resource-pramp'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Remote Jobs',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "منصة متخصصة في الوظائف التي تتيح العمل عن بعد.", "slug": "career-resource-remote-jobs"}'::jsonb,
    title_ar = 'وظائف عن بعد'
WHERE id = 'career-resource-remote-jobs'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Remote Ok',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://remoteok.com", "description": "موقع متخصص في عرض الوظائف التي يمكن أداؤها عن بعد بالكامل للمحترفين الرقميين.", "slug": "career-resource-remote-ok"}'::jsonb,
    title_ar = 'ريموت أوكيه'
WHERE id = 'career-resource-remote-ok'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Salary Calculator',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "أداة لمعرفة متوسط الرواتب في مجالك.", "slug": "career-resource-salary-calculator"}'::jsonb,
    title_ar = 'حاسبة الرواتب'
WHERE id = 'career-resource-salary-calculator'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Skills Courses',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "", "description": "منصة تعليمية تقدم دورات لتطوير المهارات المطلوبة في سوق العمل.", "slug": "career-resource-skills-courses"}'::jsonb,
    title_ar = 'دورات تطوير المهارات'
WHERE id = 'career-resource-skills-courses'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'The Muse',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.themuse.com", "description": "موقع يقدم نصائح مهنية ممتازة، وأدلة للبحث عن عمل، ونظرة من الداخل لثقافة الشركات.", "slug": "career-resource-the-muse"}'::jsonb,
    title_ar = 'ذا ميوز'
WHERE id = 'career-resource-the-muse'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Upwork',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://www.upwork.com", "description": "منصة عالمية للعمل الحر (Freelance) تربط الشركات بالمستقلين في مختلف المجالات.", "slug": "career-resource-upwork"}'::jsonb,
    title_ar = 'أب وورك'
WHERE id = 'career-resource-upwork'
AND status = 'draft';
UPDATE career_resources
SET
    content_type = 'resource',
    title_en = 'Zety',
    portal_id = 'career',
    status = 'draft',
    data = '{"url": "https://zety.com", "description": "منصة شهيرة لبناء السير الذاتية وخطابات المقدمة مع تقديم نصائح وأمثلة عملية.", "slug": "career-resource-zety"}'::jsonb,
    title_ar = 'زيتي'
WHERE id = 'career-resource-zety'
AND status = 'draft';


-- Table: digital_exams_glossary
-- Expected updates: 50

UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Adaptive Generation',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "استخدام أدوات الذكاء الاصطناعي لتوليد أسئلة تتكيف مع مستوى الطالب وتركز على نقاط ضعفه.", "example": "الطلب من المعلم الذكي توليد 5 أسئلة صعبة في موضوع الكسور بعد اجتياز الأسئلة السهلة.", "definition_ar": "استخدام أدوات الذكاء الاصطناعي لتوليد أسئلة تتكيف مع مستوى الطالب وتركز على نقاط ضعفه.", "slug": "digital-exams-glossary-adaptive-generation"}'::jsonb,
    title_ar = 'التوليد التكيفي'
WHERE id = 'digital-exams-glossary-adaptive-generation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Certainty Assessment',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تحديد مستوى التأكد من الإجابة أثناء الحل لتسهيل قرار المراجعة لاحقاً.", "example": "وضع علامة نجمة بجوار الأسئلة التي تعتمد فيها على التخمين لتعود لها إن تبقى وقت.", "definition_ar": "تحديد مستوى التأكد من الإجابة أثناء الحل لتسهيل قرار المراجعة لاحقاً.", "slug": "digital-exams-glossary-certainty-assessment"}'::jsonb,
    title_ar = 'تقييم اليقين'
WHERE id = 'digital-exams-glossary-certainty-assessment'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Cognitive Reframing',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تغيير النظرة السلبية للاختبار أو السؤال إلى تحدٍ إيجابي يمكن تجاوزه.", "example": "بدلاً من التفكير ''لن أستطيع حل هذا''، التفكير في ''سأستخدم استراتيجية الاستبعاد لأصل لأفضل خيار''.", "definition_ar": "تغيير النظرة السلبية للاختبار أو السؤال إلى تحدٍ إيجابي يمكن تجاوزه.", "slug": "digital-exams-glossary-cognitive-reframing"}'::jsonb,
    title_ar = 'إعادة التأطير المعرفي'
WHERE id = 'digital-exams-glossary-cognitive-reframing'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Confidence Calibration',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "القدرة على التقييم الدقيق لمدى صحة الإجابة التي تم اختيارها، وتجنب الثقة المفرطة أو الشك الزائد.", "example": "إعطاء نسبة مئوية لثقتك في الإجابة، ومراجعة الأسئلة التي تقل نسبة ثقتك فيها عن 70%.", "definition_ar": "القدرة على التقييم الدقيق لمدى صحة الإجابة التي تم اختيارها، وتجنب الثقة المفرطة أو الشك الزائد.", "slug": "digital-exams-glossary-confidence-calibration"}'::jsonb,
    title_ar = 'معايرة الثقة'
WHERE id = 'digital-exams-glossary-confidence-calibration'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Deep Breathing',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تقنية استرخاء للسيطرة على التوتر أثناء الاختبار من خلال تنظيم الشهيق والزفير.", "example": "أخذ شهيق لمدة 4 ثوان، حبسه لثانيتين، ثم زفير لمدة 6 ثوان عند الشعور بالتوتر أثناء سؤال صعب.", "definition_ar": "تقنية استرخاء للسيطرة على التوتر أثناء الاختبار من خلال تنظيم الشهيق والزفير.", "slug": "digital-exams-glossary-deep-breathing"}'::jsonb,
    title_ar = 'التنفس العميق'
WHERE id = 'digital-exams-glossary-deep-breathing'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Distractors',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "خيارات إجابة مصممة لتكون جذابة أو تبدو صحيحة للإيقاع بالطالب الذي لم يفهم المفهوم بشكل كامل.", "example": "خيار يحتوي على رقم صحيح لكن بوحدة قياس خاطئة.", "definition_ar": "خيارات إجابة مصممة لتكون جذابة أو تبدو صحيحة للإيقاع بالطالب الذي لم يفهم المفهوم بشكل كامل.", "slug": "digital-exams-glossary-distractors"}'::jsonb,
    title_ar = 'المشتتات'
WHERE id = 'digital-exams-glossary-distractors'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Double Checking',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "التحقق من الإجابة مرة أخرى بطريقة مختلفة للتأكد من عدم وجود أخطاء حسابية أو منطقية.", "example": "حل المعادلة الرياضية ثم التعويض بالناتج في المعادلة الأصلية للتأكد من صحتها.", "definition_ar": "التحقق من الإجابة مرة أخرى بطريقة مختلفة للتأكد من عدم وجود أخطاء حسابية أو منطقية.", "slug": "digital-exams-glossary-double-checking"}'::jsonb,
    title_ar = 'المراجعة المزدوجة'
WHERE id = 'digital-exams-glossary-double-checking'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Educated Guess',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "استنتاج الإجابة الأقرب للصحة بناءً على المعرفة السابقة أو السياق بدلاً من الاختيار العشوائي.", "example": "استخدام الجذور اللغوية للكلمات في الخيارات لتخمين المعنى الأقرب للسياق.", "definition_ar": "استنتاج الإجابة الأقرب للصحة بناءً على المعرفة السابقة أو السياق بدلاً من الاختيار العشوائي.", "slug": "digital-exams-glossary-educated-guess"}'::jsonb,
    title_ar = 'التخمين المدروس'
WHERE id = 'digital-exams-glossary-educated-guess'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Elimination Strategy',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تقنية لحل أسئلة الاختيار من متعدد تعتمد على حذف الخيارات الخاطئة بشكل مؤكد لزيادة احتمالية اختيار الإجابة الصحيحة.", "example": "عندما تواجه سؤالاً لا تعرف إجابته المباشرة، ابدأ باستبعاد الخيارين اللذين يبدوان غير منطقيين.", "definition_ar": "تقنية لحل أسئلة الاختيار من متعدد تعتمد على حذف الخيارات الخاطئة بشكل مؤكد لزيادة احتمالية اختيار الإجابة الصحيحة.", "slug": "digital-exams-glossary-elimination-strategy"}'::jsonb,
    title_ar = 'استراتيجية الاستبعاد'
WHERE id = 'digital-exams-glossary-elimination-strategy'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Environmental Readiness',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "إعداد بيئة هادئة ومناسبة لتقديم الاختبار وتجنب المشتتات المادية.", "example": "إغلاق باب الغرفة وإبعاد الهاتف المحمول والتأكد من إضاءة المكان قبل بدء المراقبة الإلكترونية.", "definition_ar": "إعداد بيئة هادئة ومناسبة لتقديم الاختبار وتجنب المشتتات المادية.", "slug": "digital-exams-glossary-environmental-readiness"}'::jsonb,
    title_ar = 'التهيئة المكانية'
WHERE id = 'digital-exams-glossary-environmental-readiness'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Exam Simulation',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تطبيق نفس الظروف النفسية والجسدية والزمنية للاختبار الفعلي أثناء التدريب.", "example": "الجلوس على مكتب مشابه لمكتب الاختبار وارتداء ملابس مريحة والالتزام بفترات الراحة الرسمية.", "definition_ar": "تطبيق نفس الظروف النفسية والجسدية والزمنية للاختبار الفعلي أثناء التدريب.", "slug": "digital-exams-glossary-exam-simulation"}'::jsonb,
    title_ar = 'محاكاة الاختبار'
WHERE id = 'digital-exams-glossary-exam-simulation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Gap Analysis',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تحديد المواضيع الدقيقة التي سببت فقدان الدرجات للتركيز عليها في المراجعة القادمة.", "example": "اكتشاف أن 80% من الأخطاء تركزت في موضوع الاحتمالات.", "definition_ar": "تحديد المواضيع الدقيقة التي سببت فقدان الدرجات للتركيز عليها في المراجعة القادمة.", "slug": "digital-exams-glossary-gap-analysis"}'::jsonb,
    title_ar = 'تحليل الفجوات'
WHERE id = 'digital-exams-glossary-gap-analysis'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Instant Feedback',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "الحصول على تصحيح وشرح للإجابات مباشرة بعد الحل لفهم الأخطاء في وقتها.", "example": "قراءة شرح الذكاء الاصطناعي لسبب كون الخيار المختار خاطئاً وتصحيح المفهوم فوراً.", "definition_ar": "الحصول على تصحيح وشرح للإجابات مباشرة بعد الحل لفهم الأخطاء في وقتها.", "slug": "digital-exams-glossary-instant-feedback"}'::jsonb,
    title_ar = 'التغذية الراجعة الفورية'
WHERE id = 'digital-exams-glossary-instant-feedback'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Interleaving',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "استراتيجية تعليمية تتضمن دمج مواضيع أو أنواع مختلفة من المسائل في جلسة دراسية واحدة لتحسين التمييز بينها.", "example": "بدل حل 50 مسألة على نفس القاعدة، يتم حل مسائل تتطلب اختيار القاعدة المناسبة من بين عدة قواعد.", "definition_ar": "استراتيجية تعليمية تتضمن دمج مواضيع أو أنواع مختلفة من المسائل في جلسة دراسية واحدة لتحسين التمييز بينها.", "slug": "digital-exams-glossary-interleaving"}'::jsonb,
    title_ar = 'التشابك المعرفي'
WHERE id = 'digital-exams-glossary-interleaving'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 01',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "توزيع الوقت المتاح على أسئلة الاختبار بشكل استراتيجي.", "example": "مثال: تخصيص دقيقة واحدة لكل سؤال اختيار من متعدد.", "definition_ar": "توزيع الوقت المتاح على أسئلة الاختبار بشكل استراتيجي.", "slug": "digital-exams-glossary-item-01"}'::jsonb,
    title_ar = 'إدارة الوقت'
WHERE id = 'digital-exams-glossary-item-01'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 02',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تقنية تعتمد على استبعاد الإجابات الخاطئة بوضوح لزيادة فرصة اختيار الإجابة الصحيحة.", "example": "مثال: استبعاد خيارين من أصل أربعة يرفع نسبة النجاح إلى 50%.", "definition_ar": "تقنية تعتمد على استبعاد الإجابات الخاطئة بوضوح لزيادة فرصة اختيار الإجابة الصحيحة.", "slug": "digital-exams-glossary-item-02"}'::jsonb,
    title_ar = 'استبعاد المشتتات'
WHERE id = 'digital-exams-glossary-item-02'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 03',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "إلقاء نظرة سريعة على جميع الأسئلة قبل البدء في الحل لمعرفة مستوى الصعوبة.", "example": "مثال: تصفح الاختبار لمدة 5 دقائق قبل البدء بالحل.", "definition_ar": "إلقاء نظرة سريعة على جميع الأسئلة قبل البدء في الحل لمعرفة مستوى الصعوبة.", "slug": "digital-exams-glossary-item-03"}'::jsonb,
    title_ar = 'المراجعة السريعة'
WHERE id = 'digital-exams-glossary-item-03'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 04',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "حالة نفسية تصيب الطالب قبل أو أثناء الاختبار وتؤثر على تركيزه.", "example": "مثال: الشعور بتسارع نبضات القلب عند قراءة سؤال صعب.", "definition_ar": "حالة نفسية تصيب الطالب قبل أو أثناء الاختبار وتؤثر على تركيزه.", "slug": "digital-exams-glossary-item-04"}'::jsonb,
    title_ar = 'قلق الاختبار'
WHERE id = 'digital-exams-glossary-item-04'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 05',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة.", "example": "مثال: الانتباه لكلمات مثل (ليس، دائماً، باستثناء).", "definition_ar": "الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة.", "slug": "digital-exams-glossary-item-05"}'::jsonb,
    title_ar = 'الكلمات المفتاحية'
WHERE id = 'digital-exams-glossary-item-05'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 06',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "نموذج مشابه للاختبار الحقيقي يستخدم للتدريب وقياس المستوى.", "example": "مثال: حل اختبار تجريبي لشهادة PMP قبل الاختبار الفعلي.", "definition_ar": "نموذج مشابه للاختبار الحقيقي يستخدم للتدريب وقياس المستوى.", "slug": "digital-exams-glossary-item-06"}'::jsonb,
    title_ar = 'الاختبار التجريبي'
WHERE id = 'digital-exams-glossary-item-06'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 07',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "اختيار إجابة بناءً على المنطق والمعلومات السابقة عند عدم التأكد من الإجابة الصحيحة.", "example": "مثال: اختيار إجابة تبدو منطقية أكثر من غيرها بعد استبعاد المشتتات.", "definition_ar": "اختيار إجابة بناءً على المنطق والمعلومات السابقة عند عدم التأكد من الإجابة الصحيحة.", "slug": "digital-exams-glossary-item-07"}'::jsonb,
    title_ar = 'التخمين المدروس'
WHERE id = 'digital-exams-glossary-item-07'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 08',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تهيئة بيئة مشابهة لبيئة الاختبار الحقيقي أثناء التدريب.", "example": "مثال: الجلوس في غرفة هادئة وحل الاختبار بدون مقاطعة.", "definition_ar": "تهيئة بيئة مشابهة لبيئة الاختبار الحقيقي أثناء التدريب.", "slug": "digital-exams-glossary-item-08"}'::jsonb,
    title_ar = 'المحاكاة'
WHERE id = 'digital-exams-glossary-item-08'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 09',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "معرفة الأخطاء بعد الاختبار التجريبي وتصحيحها.", "example": "مثال: مراجعة الأسئلة الخاطئة ومعرفة سبب الخطأ.", "definition_ar": "معرفة الأخطاء بعد الاختبار التجريبي وتصحيحها.", "slug": "digital-exams-glossary-item-09"}'::jsonb,
    title_ar = 'التغذية الراجعة'
WHERE id = 'digital-exams-glossary-item-09'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 10',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "أسئلة تتطلب كتابة إجابة مفصلة وتعتمد على الفهم والتعبير.", "example": "مثال: اشرح أسباب الحرب العالمية الأولى.", "definition_ar": "أسئلة تتطلب كتابة إجابة مفصلة وتعتمد على الفهم والتعبير.", "slug": "digital-exams-glossary-item-10"}'::jsonb,
    title_ar = 'الأسئلة المقالية'
WHERE id = 'digital-exams-glossary-item-10'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 11',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "سؤال يتطلب اختيار الإجابة الصحيحة من بين عدة خيارات.", "example": "مثال: ما هي عاصمة فرنسا؟ أ) لندن ب) باريس ج) روما.", "definition_ar": "سؤال يتطلب اختيار الإجابة الصحيحة من بين عدة خيارات.", "slug": "digital-exams-glossary-item-11"}'::jsonb,
    title_ar = 'اختيار من متعدد'
WHERE id = 'digital-exams-glossary-item-11'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 12',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "سؤال يتطلب تحديد ما إذا كانت العبارة صحيحة أم خاطئة.", "example": "مثال: الأرض مسطحة. (خطأ).", "definition_ar": "سؤال يتطلب تحديد ما إذا كانت العبارة صحيحة أم خاطئة.", "slug": "digital-exams-glossary-item-12"}'::jsonb,
    title_ar = 'الصواب والخطأ'
WHERE id = 'digital-exams-glossary-item-12'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 13',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "ترك السؤال الصعب والعودة إليه لاحقاً لتوفير الوقت.", "example": "مثال: إذا استغرق السؤال أكثر من دقيقتين، تخطاه وعد إليه في النهاية.", "definition_ar": "ترك السؤال الصعب والعودة إليه لاحقاً لتوفير الوقت.", "slug": "digital-exams-glossary-item-13"}'::jsonb,
    title_ar = 'تخطي الأسئلة'
WHERE id = 'digital-exams-glossary-item-13'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 14',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تقنية استرخاء تساعد في تقليل التوتر أثناء الاختبار.", "example": "مثال: أخذ نفس عميق والعد إلى خمسة قبل الإجابة على سؤال صعب.", "definition_ar": "تقنية استرخاء تساعد في تقليل التوتر أثناء الاختبار.", "slug": "digital-exams-glossary-item-14"}'::jsonb,
    title_ar = 'التنفس العميق'
WHERE id = 'digital-exams-glossary-item-14'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 15',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "المذاكرة والتحضير الجيد قبل الاختبار بفترة كافية.", "example": "مثال: وضع جدول زمني للمذاكرة قبل الاختبار بشهر.", "definition_ar": "المذاكرة والتحضير الجيد قبل الاختبار بفترة كافية.", "slug": "digital-exams-glossary-item-15"}'::jsonb,
    title_ar = 'الاستعداد المسبق'
WHERE id = 'digital-exams-glossary-item-15'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 16',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تعبئة الدائرة المخصصة للإجابة الصحيحة في ورقة الإجابة بشكل كامل.", "example": "مثال: استخدام قلم رصاص من نوع HB لتظليل الدائرة.", "definition_ar": "تعبئة الدائرة المخصصة للإجابة الصحيحة في ورقة الإجابة بشكل كامل.", "slug": "digital-exams-glossary-item-16"}'::jsonb,
    title_ar = 'تظليل الإجابات'
WHERE id = 'digital-exams-glossary-item-16'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 17',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "التأكد من صحة الإجابات قبل تسليم ورقة الاختبار.", "example": "مثال: تخصيص آخر 10 دقائق من وقت الاختبار لمراجعة الإجابات.", "definition_ar": "التأكد من صحة الإجابات قبل تسليم ورقة الاختبار.", "slug": "digital-exams-glossary-item-17"}'::jsonb,
    title_ar = 'مراجعة الإجابات'
WHERE id = 'digital-exams-glossary-item-17'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 18',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "الخيارات الخاطئة في أسئلة الاختيار من متعدد والتي تبدو صحيحة.", "example": "مثال: وضع إجابة قريبة جداً من الإجابة الصحيحة لتشتيت الطالب.", "definition_ar": "الخيارات الخاطئة في أسئلة الاختيار من متعدد والتي تبدو صحيحة.", "slug": "digital-exams-glossary-item-18"}'::jsonb,
    title_ar = 'المشتتات'
WHERE id = 'digital-exams-glossary-item-18'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 19',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "أسئلة تتكون من عدة أجزاء وتتطلب فهماً عميقاً للموضوع.", "example": "مثال: اقرأ النص التالي ثم أجب عن الأسئلة الخمسة المتعلقة به.", "definition_ar": "أسئلة تتكون من عدة أجزاء وتتطلب فهماً عميقاً للموضوع.", "slug": "digital-exams-glossary-item-19"}'::jsonb,
    title_ar = 'الأسئلة المركبة'
WHERE id = 'digital-exams-glossary-item-19'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Item 20',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "توجيه الانتباه بالكامل نحو الاختبار وتجاهل المشتتات الخارجية.", "example": "مثال: عدم الالتفات للأصوات في قاعة الاختبار.", "definition_ar": "توجيه الانتباه بالكامل نحو الاختبار وتجاهل المشتتات الخارجية.", "slug": "digital-exams-glossary-item-20"}'::jsonb,
    title_ar = 'التركيز'
WHERE id = 'digital-exams-glossary-item-20'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Keywords',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "المصطلحات أو الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة وتوجه نحو الإجابة الصحيحة.", "example": "التركيز على كلمة ''أقصى'' أو ''أدنى'' في مسائل القيم العظمى والصغرى.", "definition_ar": "المصطلحات أو الكلمات الأساسية في السؤال التي تحدد المطلوب بدقة وتوجه نحو الإجابة الصحيحة.", "slug": "digital-exams-glossary-keywords"}'::jsonb,
    title_ar = 'الكلمات المفتاحية'
WHERE id = 'digital-exams-glossary-keywords'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Last Days Plan',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "جدول مراجعة مكثف للأيام التي تسبق الاختبار يركز على الملخصات وسجل الأخطاء فقط.", "example": "الامتناع عن دراسة مواضيع جديدة قبل الاختبار بيومين والتركيز على مراجعة القوانين الأساسية.", "definition_ar": "جدول مراجعة مكثف للأيام التي تسبق الاختبار يركز على الملخصات وسجل الأخطاء فقط.", "slug": "digital-exams-glossary-last-days-plan"}'::jsonb,
    title_ar = 'خطة الأيام الأخيرة'
WHERE id = 'digital-exams-glossary-last-days-plan'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Learning From Slips',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تحويل الأخطاء غير المقصودة إلى دروس من خلال وضع استراتيجيات لتجنب تكرارها.", "example": "اعتياد وضع دائرة حول الكلمات المفتاحية لتجنب زلة تخطيها.", "definition_ar": "تحويل الأخطاء غير المقصودة إلى دروس من خلال وضع استراتيجيات لتجنب تكرارها.", "slug": "digital-exams-glossary-learning-from-slips"}'::jsonb,
    title_ar = 'التعلم من الزلات'
WHERE id = 'digital-exams-glossary-learning-from-slips'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Mistake Log',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "دفتر أو ملف لتدوين الأخطاء التي تم ارتكابها في الاختبارات التجريبية مع تحليل سبب الخطأ والإجابة الصحيحة.", "example": "كتابة السؤال الذي أخطأت فيه، وتوضيح أن السبب كان ''عدم قراءة أداة النفي''.", "definition_ar": "دفتر أو ملف لتدوين الأخطاء التي تم ارتكابها في الاختبارات التجريبية مع تحليل سبب الخطأ والإجابة الصحيحة.", "slug": "digital-exams-glossary-mistake-log"}'::jsonb,
    title_ar = 'سجل الأخطاء'
WHERE id = 'digital-exams-glossary-mistake-log'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Mock',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "نماذج امتحانية كاملة يتم حلها في ظروف مشابهة للاختبار الحقيقي لرفع الجاهزية.", "example": "أداء اختبار تجريبي كامل يوم الجمعة مع ضبط مؤقت زمني وعدم استخدام أي مصادر مساعدة.", "definition_ar": "نماذج امتحانية كاملة يتم حلها في ظروف مشابهة للاختبار الحقيقي لرفع الجاهزية.", "slug": "digital-exams-glossary-mock-exams"}'::jsonb,
    title_ar = 'الاختبارات التجريبية'
WHERE id = 'digital-exams-glossary-mock-exams'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Negative Tools',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "الكلمات التي تعكس معنى السؤال ويغفل عنها الطلاب غالباً وتؤدي لإجابات خاطئة.", "example": "الانتباه لكلمات مثل: ''ليس''، ''ما عدا''، ''باستثناء'' التي تغير المطلوب تماماً.", "definition_ar": "الكلمات التي تعكس معنى السؤال ويغفل عنها الطلاب غالباً وتؤدي لإجابات خاطئة.", "slug": "digital-exams-glossary-negative-tools"}'::jsonb,
    title_ar = 'أدوات النفي والاستثناء'
WHERE id = 'digital-exams-glossary-negative-tools'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Performance Dashboard',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "واجهة مرئية تعرض بيانات تقدم الطالب، الدرجات، ونقاط القوة والضعف لتوجيه مسار التعلم.", "example": "متابعة الرسم البياني الذي يوضح تحسن سرعة الحل في الأسئلة اللفظية عبر الأسابيع.", "definition_ar": "واجهة مرئية تعرض بيانات تقدم الطالب، الدرجات، ونقاط القوة والضعف لتوجيه مسار التعلم.", "slug": "digital-exams-glossary-performance-dashboard"}'::jsonb,
    title_ar = 'لوحة الأداء'
WHERE id = 'digital-exams-glossary-performance-dashboard'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Post Exam Eval',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "مراجعة الأداء فور انتهاء الاختبار لتحديد نقاط القوة والضعف في استراتيجية الحل.", "example": "تحليل ما إذا كان الوقت المخصص للقسم الكمي كافياً أم يحتاج لتعديل.", "definition_ar": "مراجعة الأداء فور انتهاء الاختبار لتحديد نقاط القوة والضعف في استراتيجية الحل.", "slug": "digital-exams-glossary-post-exam-eval"}'::jsonb,
    title_ar = 'التقييم البعدي'
WHERE id = 'digital-exams-glossary-post-exam-eval'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Progress Analytics',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "دراسة البيانات التفصيلية للأداء لتحديد الأنماط واتخاذ قرارات مبنية على البيانات لتحسين الدراسة.", "example": "ملاحظة أن الوقت المستغرق في حل أسئلة قسم معين يتناقص مع زيادة عدد الاختبارات التجريبية.", "definition_ar": "دراسة البيانات التفصيلية للأداء لتحديد الأنماط واتخاذ قرارات مبنية على البيانات لتحسين الدراسة.", "slug": "digital-exams-glossary-progress-analytics"}'::jsonb,
    title_ar = 'تحليلات التقدم'
WHERE id = 'digital-exams-glossary-progress-analytics'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Random Practice',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "حل أسئلة من مواضيع متعددة بشكل مختلط لتدريب الدماغ على التنقل السريع بين المفاهيم.", "example": "حل 10 أسئلة هندسة تليها 10 أسئلة جبر ثم 10 إحصاء بشكل متداخل.", "definition_ar": "حل أسئلة من مواضيع متعددة بشكل مختلط لتدريب الدماغ على التنقل السريع بين المفاهيم.", "slug": "digital-exams-glossary-random-practice"}'::jsonb,
    title_ar = 'الممارسة العشوائية'
WHERE id = 'digital-exams-glossary-random-practice'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Root Question Analysis',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "فهم المطلب الأساسي للسؤال دون التشتت بالتفاصيل الزائدة أو الحشو اللفظي.", "example": "تحديد المتغير المطلوب حسابه في مسألة فيزيائية مليئة بالأرقام غير الضرورية.", "definition_ar": "فهم المطلب الأساسي للسؤال دون التشتت بالتفاصيل الزائدة أو الحشو اللفظي.", "slug": "digital-exams-glossary-root-question-analysis"}'::jsonb,
    title_ar = 'تحليل جذر السؤال'
WHERE id = 'digital-exams-glossary-root-question-analysis'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Rushing Errors',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "الأخطاء الناتجة عن قراءة السؤال بسرعة أو تجاوز بعض المعطيات دون انتباه.", "example": "اختيار الإجابة (أ) فوراً لأنها تبدو صحيحة دون إكمال قراءة باقي الخيارات (ب، ج، د).", "definition_ar": "الأخطاء الناتجة عن قراءة السؤال بسرعة أو تجاوز بعض المعطيات دون انتباه.", "slug": "digital-exams-glossary-rushing-errors"}'::jsonb,
    title_ar = 'أخطاء التسرع'
WHERE id = 'digital-exams-glossary-rushing-errors'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Spaced Revision',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "توزيع فترات دراسة ومراجعة المادة على فترات زمنية متزايدة لتثبيت المعلومات.", "example": "مراجعة قواعد الرياضيات اليوم، ثم بعد 3 أيام، ثم بعد أسبوع.", "definition_ar": "توزيع فترات دراسة ومراجعة المادة على فترات زمنية متزايدة لتثبيت المعلومات.", "slug": "digital-exams-glossary-spaced-revision"}'::jsonb,
    title_ar = 'المراجعة المتباعدة'
WHERE id = 'digital-exams-glossary-spaced-revision'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Tech Check',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "التأكد من جاهزية الجهاز، اتصال الإنترنت، والمتصفح قبل بدء الاختبار الرقمي بوقت كافٍ.", "example": "اختبار سرعة الإنترنت وتحديث متصفح الكروم قبل يوم من موعد الاختبار.", "definition_ar": "التأكد من جاهزية الجهاز، اتصال الإنترنت، والمتصفح قبل بدء الاختبار الرقمي بوقت كافٍ.", "slug": "digital-exams-glossary-tech-check"}'::jsonb,
    title_ar = 'الفحص التقني المسبق'
WHERE id = 'digital-exams-glossary-tech-check'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Time Allocation',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "تحديد مدة زمنية قصوى لكل سؤال أو قسم لتجنب استنزاف الوقت في جزء واحد من الاختبار.", "example": "تخصيص 90 ثانية كحد أقصى لكل سؤال في قسم القراءة لتتمكن من إكمال جميع الأسئلة.", "definition_ar": "تحديد مدة زمنية قصوى لكل سؤال أو قسم لتجنب استنزاف الوقت في جزء واحد من الاختبار.", "slug": "digital-exams-glossary-time-allocation"}'::jsonb,
    title_ar = 'تخصيص الوقت'
WHERE id = 'digital-exams-glossary-time-allocation'
AND status = 'draft';
UPDATE digital_exams_glossary
SET
    content_type = 'glossary',
    title_en = 'Two Minute Rule',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"definition": "مبدأ ينص على تجاوز السؤال الذي يستغرق أكثر من دقيقتين للعودة إليه لاحقاً.", "example": "إذا شعرت أنك عالق في مسألة رياضية وتجاوزت الدقيقتين، ضع علامة عليها وانتقل للتالي.", "definition_ar": "مبدأ ينص على تجاوز السؤال الذي يستغرق أكثر من دقيقتين للعودة إليه لاحقاً.", "slug": "digital-exams-glossary-two-minute-rule"}'::jsonb,
    title_ar = 'قاعدة الدقيقتين'
WHERE id = 'digital-exams-glossary-two-minute-rule'
AND status = 'draft';


-- Table: digital_exams_lessons
-- Expected updates: 20

UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Using AI as a Personal Assistant',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-ai-study-assistant", "excerpt_ar": "الذكاء الاصطناعي أداة ثورية في التحضير للاختبارات إذا استخدم بشكل صحيح."}'::jsonb,
    title_ar = 'استخدام الذكاء الاصطناعي كمساعد شخصي'
WHERE id = 'digital-exams-lesson-ai-study-assistant'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'How to Analyze Mistakes for Mistake Log',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-analyzing-mistakes", "excerpt_ar": "الخطأ في الاختبار التجريبي هو كنز من المعلومات إذا تم استغلاله بشكل صحيح."}'::jsonb,
    title_ar = 'كيف تحلل أخطاءك لبناء سجل الأخطاء'
WHERE id = 'digital-exams-lesson-analyzing-mistakes'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Confidence Rating During Exams',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-confidence-rating", "excerpt_ar": "الوعي الذاتي بمدى صحة إجابتك يوفر عليك وقت المراجعة."}'::jsonb,
    title_ar = 'معايرة الثقة أثناء الحل'
WHERE id = 'digital-exams-lesson-confidence-rating'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Time Management in Digital Exams',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-digital-time-management", "excerpt_ar": "في الاختبارات الورقية، كان من السهل تصفح الأوراق لتوزيع الوقت. أما رقمياً، فأنت تواجه الشاشة فقط."}'::jsonb,
    title_ar = 'إدارة الوقت في الاختبارات الرقمية'
WHERE id = 'digital-exams-lesson-digital-time-management'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Exam Night Routine to Reduce Anxiety',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-exam-night-routine", "excerpt_ar": "ما تفعله في الليلة التي تسبق الاختبار يحدد أداءك بنسبة كبيرة. السهر للمراجعة هو أسوأ استراتيجية ممكنة."}'::jsonb,
    title_ar = 'روتين ليلة الاختبار لتقليل القلق'
WHERE id = 'digital-exams-lesson-exam-night-routine'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'The Final Week Strategy',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-final-week-strategy", "excerpt_ar": "في الأسبوع الأخير، التعلم الجديد غير فعال. الهدف هو التثبيت والجاهزية."}'::jsonb,
    title_ar = 'استراتيجية الأسبوع الحاسم'
WHERE id = 'digital-exams-lesson-final-week-strategy'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Dismantling Distractors in Aptitude Tests',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-handling-distractors", "excerpt_ar": "واضعو الاختبارات يصممون خيارات تبدو صحيحة لمنطق الطالب المتسرع. هذه تسمى ''المشتتات''."}'::jsonb,
    title_ar = 'تفكيك المشتتات في أسئلة القدرات'
WHERE id = 'digital-exams-lesson-handling-distractors'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Interleaved Practice: Don''t Study One Topic',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-interleaved-practice", "excerpt_ar": "الدراسة التقليدية تعتمد على حل 30 سؤالاً على نفس القاعدة، مما يوهمك بالفهم. لكن في الاختبار، الأسئلة تأتي عشوائية."}'::jsonb,
    title_ar = 'التشابك المعرفي: لا تدرس موضوعاً واحداً'
WHERE id = 'digital-exams-lesson-interleaved-practice'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 01',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-01", "excerpt_ar": "# أسرار إدارة الوقت في الاختبارات الرقمية"}'::jsonb,
    title_ar = 'أسرار إدارة الوقت في الاختبارات الرقمية'
WHERE id = 'digital-exams-lesson-item-01'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 02',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-02", "excerpt_ar": "# التعامل مع قلق الاختبارات"}'::jsonb,
    title_ar = 'التعامل مع قلق الاختبارات'
WHERE id = 'digital-exams-lesson-item-02'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 03',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-03", "excerpt_ar": "# استراتيجية استبعاد المشتتات"}'::jsonb,
    title_ar = 'استراتيجية استبعاد المشتتات'
WHERE id = 'digital-exams-lesson-item-03'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 04',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-04", "excerpt_ar": "# أهمية الاختبارات التجريبية"}'::jsonb,
    title_ar = 'أهمية الاختبارات التجريبية'
WHERE id = 'digital-exams-lesson-item-04'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 05',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-05", "excerpt_ar": "# مراجعة الأخطاء بفعالية"}'::jsonb,
    title_ar = 'مراجعة الأخطاء بفعالية'
WHERE id = 'digital-exams-lesson-item-05'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Item 06',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-item-06", "excerpt_ar": "# قراءة السؤال بدقة: الكلمات المفتاحية"}'::jsonb,
    title_ar = 'قراءة السؤال بدقة: الكلمات المفتاحية'
WHERE id = 'digital-exams-lesson-item-06'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Spotting Keywords and Negative Tools',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-keyword-spotting", "excerpt_ar": "الكلمة الواحدة قد تغير مسار إجابتك 180 درجة."}'::jsonb,
    title_ar = 'اصطياد الكلمات المفتاحية وأدوات النفي'
WHERE id = 'digital-exams-lesson-keyword-spotting'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'The Art of Elimination Strategy',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-mcq-elimination", "excerpt_ar": "يعتبر سؤال الاختيار من متعدد تحدياً ذهنياً أكثر منه اختباراً للحفظ. تعتمد استراتيجية الاستبعاد على مبدأ بسيط: إذا لم تعرف الإجابة الصحيحة، فابحث عن ال..."}'::jsonb,
    title_ar = 'فن استراتيجية الاستبعاد'
WHERE id = 'digital-exams-lesson-mcq-elimination'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Handling Mind Blanking',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-overcoming-mind-blanks", "excerpt_ar": "يحدث أحياناً أن تقرأ سؤالاً فتشعر أن عقلك أصبح فارغاً تماماً نتيجة التوتر اللحظي."}'::jsonb,
    title_ar = 'التعامل مع الصدمة الذهنية (Mind Blanking)'
WHERE id = 'digital-exams-lesson-overcoming-mind-blanks'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Post-Exam Review: After the Mock Test',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-post-exam-review", "excerpt_ar": "إنهاء الاختبار التجريبي هو مجرد البداية. المرحلة الأهم هي المراجعة البعدية."}'::jsonb,
    title_ar = 'التقييم البعدي: ما بعد الاختبار التجريبي'
WHERE id = 'digital-exams-lesson-post-exam-review'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Reading Comprehension: Effective Techniques',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-reading-comprehension-tricks", "excerpt_ar": "في أقسام استيعاب المقروء، قراءة النص كاملاً بتمعن تستهلك كل وقتك."}'::jsonb,
    title_ar = 'استيعاب المقروء: تقنيات القراءة الفعالة'
WHERE id = 'digital-exams-lesson-reading-comprehension-tricks'
AND status = 'draft';
UPDATE digital_exams_lessons
SET
    content_type = 'lesson',
    title_en = 'Tech Preparedness for Remote Exams',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"slug": "digital-exams-lesson-tech-preparedness", "excerpt_ar": "المشاكل التقنية أثناء الاختبار قد تسبب توتراً يفسد أداءك بالكامل. يجب أن تكون مستعداً."}'::jsonb,
    title_ar = 'الاستعداد التقني للاختبارات عن بعد'
WHERE id = 'digital-exams-lesson-tech-preparedness'
AND status = 'draft';


-- Table: digital_exams_prompts
-- Expected updates: 30

UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Analyze Mistake',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لقد أخطأت في هذا السؤال: [نص السؤال]. إجابتي كانت [الإجابة الخاطئة] والإجابة الصحيحة هي [الإجابة الصحيحة]. اشرح لي بالتفصيل سبب خطئي وما هي القاعدة أو المفهوم الذي يجب أن أراجعه.", "instructions": "يفضل إرفاق السياق الكامل للسؤال لفهم أعمق لسبب الخطأ.", "prompt_text_ar": "لقد أخطأت في هذا السؤال: [نص السؤال]. إجابتي كانت [الإجابة الخاطئة] والإجابة الصحيحة هي [الإجابة الصحيحة]. اشرح لي بالتفصيل سبب خطئي وما هي القاعدة أو المفهوم الذي يجب أن أراجعه.", "slug": "digital-exams-prompt-analyze-mistake"}'::jsonb,
    title_ar = 'تحليل خطأ متكرر'
WHERE id = 'digital-exams-prompt-analyze-mistake'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Brainstorm Study Methods',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "أشعر بالملل من طريقتي التقليدية في المراجعة. اقترح 5 طرق مبتكرة وتفاعلية لمراجعة مادة [اسم المادة] استعداداً للاختبار النهائي.", "instructions": "تطبيق الطرق المقترحة يكسر الروتين ويزيد من استبقاء المعلومات.", "prompt_text_ar": "أشعر بالملل من طريقتي التقليدية في المراجعة. اقترح 5 طرق مبتكرة وتفاعلية لمراجعة مادة [اسم المادة] استعداداً للاختبار النهائي.", "slug": "digital-exams-prompt-brainstorm-study-methods"}'::jsonb,
    title_ar = 'طرق دراسة مبتكرة'
WHERE id = 'digital-exams-prompt-brainstorm-study-methods'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Compare Concepts',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "ما هو الفرق الدقيق بين [المفهوم الأول] و [المفهوم الثاني]؟ قدم جدولاً يوضح الفروقات الجوهرية مع إعطاء مثال لكل منهما للتمييز بينهما في الاختبار.", "instructions": "يساعدك هذا في حل أسئلة الاختيار من متعدد التي تعتمد على التمييز الدقيق.", "prompt_text_ar": "ما هو الفرق الدقيق بين [المفهوم الأول] و [المفهوم الثاني]؟ قدم جدولاً يوضح الفروقات الجوهرية مع إعطاء مثال لكل منهما للتمييز بينهما في الاختبار.", "slug": "digital-exams-prompt-compare-concepts"}'::jsonb,
    title_ar = 'مقارنة بين مفهومين متشابهين'
WHERE id = 'digital-exams-prompt-compare-concepts'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Create Study Plan',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "قم بإنشاء خطة مراجعة مكثفة لمدة [عدد الأيام] أيام للتحضير لاختبار [اسم الاختبار]. ركز على تخصيص وقت أكبر لمواضيع الضعف وهي [المواضيع].", "instructions": "استخدم هذا الموجه مع الذكاء الاصطناعي لإنشاء جدول مرن يراعي أوقات ذروة التركيز لديك.", "prompt_text_ar": "قم بإنشاء خطة مراجعة مكثفة لمدة [عدد الأيام] أيام للتحضير لاختبار [اسم الاختبار]. ركز على تخصيص وقت أكبر لمواضيع الضعف وهي [المواضيع].", "slug": "digital-exams-prompt-create-study-plan"}'::jsonb,
    title_ar = 'إنشاء خطة مراجعة'
WHERE id = 'digital-exams-prompt-create-study-plan'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Decode Trick Questions',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لماذا يعتبر هذا السؤال خادعاً؟ [نص السؤال والخيارات]. اشرح لي الفخ الذي يقع فيه الطلاب عادة وكيف أتجنبه مستقبلاً.", "instructions": "خاص للأسئلة التي تبدو سهلة ولكن إجابتها البديهية خاطئة.", "prompt_text_ar": "لماذا يعتبر هذا السؤال خادعاً؟ [نص السؤال والخيارات]. اشرح لي الفخ الذي يقع فيه الطلاب عادة وكيف أتجنبه مستقبلاً.", "slug": "digital-exams-prompt-decode-trick-questions"}'::jsonb,
    title_ar = 'فك شفرة الأسئلة الخادعة'
WHERE id = 'digital-exams-prompt-decode-trick-questions'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Evaluate Essay Answer',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "هذا هو السؤال: [نص السؤال]، وهذه هي إجابتي: [نص الإجابة]. قيّم إجابتي من 10، وحدد ما ينقصها لتكون إجابة نموذجية، وأعد كتابتها بالشكل الأمثل.", "instructions": "مفيد للاختبارات التي تتضمن أسئلة ذات إجابات قصيرة أو تعليل.", "prompt_text_ar": "هذا هو السؤال: [نص السؤال]، وهذه هي إجابتي: [نص الإجابة]. قيّم إجابتي من 10، وحدد ما ينقصها لتكون إجابة نموذجية، وأعد كتابتها بالشكل الأمثل.", "slug": "digital-exams-prompt-evaluate-essay-answer"}'::jsonb,
    title_ar = 'تقييم إجابة مقالية قصيرة'
WHERE id = 'digital-exams-prompt-evaluate-essay-answer'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Explain Concept Simply',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "اشرح لي المفهوم التالي: [اسم المفهوم] وكأنني في المرحلة [المرحلة الدراسية]. استخدم أمثلة من الحياة اليومية لتوضيح الفكرة.", "instructions": "هذا الموجه ممتاز لكسر حاجز صعوبة المواضيع المجردة في الفيزياء والرياضيات.", "prompt_text_ar": "اشرح لي المفهوم التالي: [اسم المفهوم] وكأنني في المرحلة [المرحلة الدراسية]. استخدم أمثلة من الحياة اليومية لتوضيح الفكرة.", "slug": "digital-exams-prompt-explain-concept-simply"}'::jsonb,
    title_ar = 'شرح مفهوم معقد ببساطة'
WHERE id = 'digital-exams-prompt-explain-concept-simply'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Focus Improvement',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "أعاني من تشتت الانتباه بعد 20 دقيقة من بدء حل الأسئلة. ما هي الاستراتيجيات المثبتة علمياً لزيادة مدة التركيز في الاختبارات الطويلة التي تتجاوز الساعتين؟", "instructions": "استخدم النصائح في جلسات المذاكرة لتدريب الدماغ تدريجياً.", "prompt_text_ar": "أعاني من تشتت الانتباه بعد 20 دقيقة من بدء حل الأسئلة. ما هي الاستراتيجيات المثبتة علمياً لزيادة مدة التركيز في الاختبارات الطويلة التي تتجاوز الساعتين؟", "slug": "digital-exams-prompt-focus-improvement"}'::jsonb,
    title_ar = 'تحسين التركيز الذهني'
WHERE id = 'digital-exams-prompt-focus-improvement'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Generate Mcq',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "اكتب لي 5 أسئلة اختيار من متعدد بمستوى صعوبة [مستوى الصعوبة] حول موضوع [الموضوع]. تأكد من أن المشتتات (الخيارات الخاطئة) تبدو منطقية، وقدم شرحاً لكل إجابة صحيحة في النهاية.", "instructions": "حدد مستوى الصعوبة (سهل، متوسط، صعب) بناءً على تقدمك الحالي.", "prompt_text_ar": "اكتب لي 5 أسئلة اختيار من متعدد بمستوى صعوبة [مستوى الصعوبة] حول موضوع [الموضوع]. تأكد من أن المشتتات (الخيارات الخاطئة) تبدو منطقية، وقدم شرحاً لكل إجابة صحيحة في النهاية.", "slug": "digital-exams-prompt-generate-mcq"}'::jsonb,
    title_ar = 'توليد أسئلة اختيار من متعدد'
WHERE id = 'digital-exams-prompt-generate-mcq'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Identify Keywords',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "إليك السؤال التالي: [نص السؤال الطويل]. ما هي الكلمات المفتاحية التي يجب أن أركز عليها للوصول للإجابة الصحيحة متجاهلاً الحشو الزائد؟", "instructions": "استخدم هذا الموجه للتدرب على تحليل الأسئلة الطويلة أو المعقدة لفظياً.", "prompt_text_ar": "إليك السؤال التالي: [نص السؤال الطويل]. ما هي الكلمات المفتاحية التي يجب أن أركز عليها للوصول للإجابة الصحيحة متجاهلاً الحشو الزائد؟", "slug": "digital-exams-prompt-identify-keywords"}'::jsonb,
    title_ar = 'استخراج الكلمات المفتاحية'
WHERE id = 'digital-exams-prompt-identify-keywords'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 01',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "instructions": "اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اكتب استراتيجية مفصلة لحل أسئلة الاختيار من متعدد بفعالية.", "slug": "digital-exams-prompt-item-01"}'::jsonb,
    title_ar = 'استراتيجية حل أسئلة الاختيار من متعدد'
WHERE id = 'digital-exams-prompt-item-01'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 02',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "instructions": "قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قم بإنشاء خطة مراجعة شاملة لليلة التي تسبق الاختبار الرقمي.", "slug": "digital-exams-prompt-item-02"}'::jsonb,
    title_ar = 'خطة مراجعة ليلة الاختبار'
WHERE id = 'digital-exams-prompt-item-02'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 03',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "instructions": "اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اذكر 5 تقنيات فعالة لتقليل التوتر والقلق أثناء الاختبارات الرقمية.", "slug": "digital-exams-prompt-item-03"}'::jsonb,
    title_ar = 'تقنيات تقليل قلق الاختبار'
WHERE id = 'digital-exams-prompt-item-03'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 04',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "instructions": "اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح خطوات التعامل مع الأسئلة التي لا تعرف إجابتها في الاختبار.", "slug": "digital-exams-prompt-item-04"}'::jsonb,
    title_ar = 'كيفية التعامل مع الأسئلة الصعبة'
WHERE id = 'digital-exams-prompt-item-04'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 05',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "instructions": "اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اكتب مقالاً قصيراً حول أهمية إجراء الاختبارات التجريبية قبل الاختبار الفعلي.", "slug": "digital-exams-prompt-item-05"}'::jsonb,
    title_ar = 'أهمية الاختبارات التجريبية'
WHERE id = 'digital-exams-prompt-item-05'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 06',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "instructions": "اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح كيفية تحليل الأخطاء والاستفادة منها لتحسين الأداء.", "slug": "digital-exams-prompt-item-06"}'::jsonb,
    title_ar = 'تحليل الأخطاء بعد الاختبار التجريبي'
WHERE id = 'digital-exams-prompt-item-06'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 07',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "instructions": "قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قدم نصائح عملية لإدارة الوقت بفعالية في الاختبارات التي تعتمد على الوقت.", "slug": "digital-exams-prompt-item-07"}'::jsonb,
    title_ar = 'إدارة الوقت في الاختبارات الموقوتة'
WHERE id = 'digital-exams-prompt-item-07'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 08',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "instructions": "كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، كيف يمكن للطالب الاستعداد نفسياً وذهنياً للاختبارات الرقمية؟", "slug": "digital-exams-prompt-item-08"}'::jsonb,
    title_ar = 'الاستعداد النفسي للاختبارات'
WHERE id = 'digital-exams-prompt-item-08'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 09',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "instructions": "قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، قارن بين الاختبارات الورقية والرقمية من حيث المزايا والعيوب وتهيئة النفس.", "slug": "digital-exams-prompt-item-09"}'::jsonb,
    title_ar = 'الفرق بين الاختبارات الورقية والرقمية'
WHERE id = 'digital-exams-prompt-item-09'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Item 10',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بصفتك خبير في التحضير للاختبارات، اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "instructions": "اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "prompt_text_ar": "بصفتك خبير في التحضير للاختبارات، اشرح أفضل الطرق لتدوين الملاحظات لتسهيل المراجعة قبل الاختبار.", "slug": "digital-exams-prompt-item-10"}'::jsonb,
    title_ar = 'كيفية تدوين الملاحظات أثناء المذاكرة'
WHERE id = 'digital-exams-prompt-item-10'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Math Shortcuts',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "هل هناك طرق سريعة أو اختصارات ذهنية لحل مسائل [نوع المسائل، مثال: التناسب الطردي والعكسي] بدون استخدام الآلة الحاسبة لربح الوقت؟", "instructions": "تطبيق الاختصارات يتطلب تدريباً لتجنب الأخطاء الحسابية العكسية.", "prompt_text_ar": "هل هناك طرق سريعة أو اختصارات ذهنية لحل مسائل [نوع المسائل، مثال: التناسب الطردي والعكسي] بدون استخدام الآلة الحاسبة لربح الوقت؟", "slug": "digital-exams-prompt-math-shortcuts"}'::jsonb,
    title_ar = 'اختصارات ذهنية للرياضيات'
WHERE id = 'digital-exams-prompt-math-shortcuts'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Memorization Techniques',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لدي قائمة من [عدد] مصطلحات أو قوانين أحتاج لحفظها: [القائمة]. اقترح علي طريقة (Mnemonics) أو قصة قصيرة أو اختصارات لحفظها بسهولة.", "instructions": "يفضل وضع قوائم مترابطة ليكون الاختصار أو القصة ذات معنى.", "prompt_text_ar": "لدي قائمة من [عدد] مصطلحات أو قوانين أحتاج لحفظها: [القائمة]. اقترح علي طريقة (Mnemonics) أو قصة قصيرة أو اختصارات لحفظها بسهولة.", "slug": "digital-exams-prompt-memorization-techniques"}'::jsonb,
    title_ar = 'تقنيات الحفظ السريع'
WHERE id = 'digital-exams-prompt-memorization-techniques'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Overcome Exam Anxiety',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "أشعر بتوتر شديد قبل اختبار [اسم الاختبار] بيوم. أعطني 3 تقنيات عملية وسريعة لتهدئة الأعصاب وتقليل القلق يمكنني ممارستها الآن وفي قاعة الاختبار.", "instructions": "استخدمه عندما تشعر بالضغط النفسي لتلقي نصائح إرشادية وتدريبات تنفس مفيدة.", "prompt_text_ar": "أشعر بتوتر شديد قبل اختبار [اسم الاختبار] بيوم. أعطني 3 تقنيات عملية وسريعة لتهدئة الأعصاب وتقليل القلق يمكنني ممارستها الآن وفي قاعة الاختبار.", "slug": "digital-exams-prompt-overcome-exam-anxiety"}'::jsonb,
    title_ar = 'تقنيات التغلب على قلق الاختبار'
WHERE id = 'digital-exams-prompt-overcome-exam-anxiety'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Plan Last Week',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "بقي أسبوع واحد على اختبار [اسم الاختبار]. كيف أنظم الأيام السبعة المتبقية لضمان مراجعة شاملة دون إرهاق نفسي (Burnout)؟", "instructions": "يساعدك في الانتقال من مرحلة التعلم لمرحلة تثبيت المعلومات والتدريب.", "prompt_text_ar": "بقي أسبوع واحد على اختبار [اسم الاختبار]. كيف أنظم الأيام السبعة المتبقية لضمان مراجعة شاملة دون إرهاق نفسي (Burnout)؟", "slug": "digital-exams-prompt-plan-last-week"}'::jsonb,
    title_ar = 'خطة الأسبوع الأخير'
WHERE id = 'digital-exams-prompt-plan-last-week'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Post Exam Reflection',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لقد انتهيت للتو من اختباري. أريد توثيق تجربتي. اسألني 4 أسئلة تقييمية حول أدائي، استراتيجياتي، وما يمكنني تحسينه في الاختبارات القادمة.", "instructions": "خطوة هامة لتحويل التجربة الحالية لدروس مستفادة للمستقبل.", "prompt_text_ar": "لقد انتهيت للتو من اختباري. أريد توثيق تجربتي. اسألني 4 أسئلة تقييمية حول أدائي، استراتيجياتي، وما يمكنني تحسينه في الاختبارات القادمة.", "slug": "digital-exams-prompt-post-exam-reflection"}'::jsonb,
    title_ar = 'التأمل بعد الاختبار'
WHERE id = 'digital-exams-prompt-post-exam-reflection'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Reading Comprehension',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "كيف أقرأ النصوص الطويلة في قسم الاستيعاب اللفظي بسرعة وبشكل فعال للإجابة على الأسئلة دون الحاجة لإعادة قراءة النص عدة مرات؟", "instructions": "مفيد جداً لاختبارات القدرات التي تعتمد على استيعاب المقروء.", "prompt_text_ar": "كيف أقرأ النصوص الطويلة في قسم الاستيعاب اللفظي بسرعة وبشكل فعال للإجابة على الأسئلة دون الحاجة لإعادة قراءة النص عدة مرات؟", "slug": "digital-exams-prompt-reading-comprehension"}'::jsonb,
    title_ar = 'تحسين استيعاب المقروء'
WHERE id = 'digital-exams-prompt-reading-comprehension'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Review Exam Results',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لقد حصلت على درجة [الدرجة] من [الدرجة الكلية] في الاختبار التجريبي. أخطائي تركزت في أقسام [أسماء الأقسام]. ما هي استراتيجيتي للأسبوع القادم لتحسين درجتي؟", "instructions": "يقدم لك خطة عمل مبنية على نقاط ضعفك الحالية لرفع مستوى الأداء.", "prompt_text_ar": "لقد حصلت على درجة [الدرجة] من [الدرجة الكلية] في الاختبار التجريبي. أخطائي تركزت في أقسام [أسماء الأقسام]. ما هي استراتيجيتي للأسبوع القادم لتحسين درجتي؟", "slug": "digital-exams-prompt-review-exam-results"}'::jsonb,
    title_ar = 'مراجعة نتائج الاختبار التجريبي'
WHERE id = 'digital-exams-prompt-review-exam-results'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Simulate Exam Scenario',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "تخيل أنك تختبرني شفوياً في موضوع [الموضوع]. اسألني سؤالاً صعباً، وانتظر إجابتي، ثم صحح لي وأعطني السؤال التالي. كرر ذلك 3 مرات.", "instructions": "يستخدم للتدرب التفاعلي والمحاكاة الحية لمستوى الصعوبة.", "prompt_text_ar": "تخيل أنك تختبرني شفوياً في موضوع [الموضوع]. اسألني سؤالاً صعباً، وانتظر إجابتي، ثم صحح لي وأعطني السؤال التالي. كرر ذلك 3 مرات.", "slug": "digital-exams-prompt-simulate-exam-scenario"}'::jsonb,
    title_ar = 'محاكاة سيناريو اختبار صعب'
WHERE id = 'digital-exams-prompt-simulate-exam-scenario'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Summarize Notes',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "قم بتلخيص الملاحظات التالية في نقاط رئيسية مركزة لتسهيل حفظها واسترجاعها ليلة الاختبار: [النص أو الملاحظات].", "instructions": "يفضل ألا يتجاوز النص المدخل 1000 كلمة لضمان دقة التلخيص وتركيزه.", "prompt_text_ar": "قم بتلخيص الملاحظات التالية في نقاط رئيسية مركزة لتسهيل حفظها واسترجاعها ليلة الاختبار: [النص أو الملاحظات].", "slug": "digital-exams-prompt-summarize-notes"}'::jsonb,
    title_ar = 'تلخيص ملاحظات المراجعة'
WHERE id = 'digital-exams-prompt-summarize-notes'
AND status = 'draft';
UPDATE digital_exams_prompts
SET
    content_type = 'prompt',
    title_en = 'Time Management Strategy',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"prompt_text": "لدي اختبار يحتوي على [عدد الأسئلة] سؤالاً ومقسّم إلى [عدد الأقسام] أقسام، والوقت الإجمالي هو [المدة بالدقائق] دقيقة. كيف أوزع وقتي بشكل مثالي مع ترك 10 دقائق للمراجعة النهائية؟", "instructions": "احرص على إدخال أرقام دقيقة لضمان توزيع زمني واقعي وقابل للتطبيق.", "prompt_text_ar": "لدي اختبار يحتوي على [عدد الأسئلة] سؤالاً ومقسّم إلى [عدد الأقسام] أقسام، والوقت الإجمالي هو [المدة بالدقائق] دقيقة. كيف أوزع وقتي بشكل مثالي مع ترك 10 دقائق للمراجعة النهائية؟", "slug": "digital-exams-prompt-time-management-strategy"}'::jsonb,
    title_ar = 'استراتيجية إدارة الوقت'
WHERE id = 'digital-exams-prompt-time-management-strategy'
AND status = 'draft';


-- Table: digital_exams_resources
-- Expected updates: 30

UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Anki Flashcards',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://apps.ankiweb.net", "description": "تطبيق يعتمد على خوارزميات التكرار المتباعد لمساعدتك على حفظ الكلمات المفتاحية والمصطلحات بسرعة.", "slug": "digital-exams-resource-anki-flashcards"}'::jsonb,
    title_ar = 'بطاقات أنكي الذكية'
WHERE id = 'digital-exams-resource-anki-flashcards'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Deep Work Summary',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "نصائح مستخلصة من كتاب ''العمل العميق'' لكال نيوبورت لتعزيز التركيز أثناء دراسة المواضيع الصعبة.", "slug": "digital-exams-resource-deep-work-summary"}'::jsonb,
    title_ar = 'ملخص كتاب العمل العميق'
WHERE id = 'digital-exams-resource-deep-work-summary'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Readiness Checklist',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "ملف قابل للتحميل يحتوي على خطوات التأكد من جاهزية الحاسب الآلي للاختبارات عن بعد.", "slug": "digital-exams-resource-digital-readiness-checklist"}'::jsonb,
    title_ar = 'قائمة التحقق للجاهزية الرقمية'
WHERE id = 'digital-exams-resource-digital-readiness-checklist'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Sat Practice',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://bluebook.collegeboard.org", "description": "تطبيق يحاكي بيئة الاختبارات الرقمية المعيارية للتدرب على الواجهة والأسئلة (مفيد لاختبارات مشابهة).", "slug": "digital-exams-resource-digital-sat-practice"}'::jsonb,
    title_ar = 'تطبيق بلو بوك للتدريب الرقمي'
WHERE id = 'digital-exams-resource-digital-sat-practice'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Exam Diet Tips',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "دليل صحي لما يجب تناوله قبل وأثناء فترة الاختبارات لضمان أعلى مستويات النشاط الذهني.", "slug": "digital-exams-resource-exam-diet-tips"}'::jsonb,
    title_ar = 'نصائح التغذية لتعزيز الذاكرة'
WHERE id = 'digital-exams-resource-exam-diet-tips'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Eye Care Software',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://justgetflux.com", "description": "برنامج لتقليل إجهاد العين عبر تعديل إضاءة الشاشة تلقائياً أثناء المراجعة الطويلة أمام الحاسب.", "slug": "digital-exams-resource-eye-care-software"}'::jsonb,
    title_ar = 'برنامج حماية العين للشاشات'
WHERE id = 'digital-exams-resource-eye-care-software'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Focus Music Playlist',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "قائمة تشغيل مصممة للمساعدة على التركيز العميق أثناء المذاكرة وتقليل المشتتات الخارجية.", "slug": "digital-exams-resource-focus-music-playlist"}'::jsonb,
    title_ar = 'موسيقى وأصوات بيضاء للتركيز'
WHERE id = 'digital-exams-resource-focus-music-playlist'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Habit Tracker',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://loophabit.org", "description": "تطبيق بسيط لمساعدتك في بناء عادة المذاكرة اليومية والالتزام بالجدول الزمني.", "slug": "digital-exams-resource-habit-tracker"}'::jsonb,
    title_ar = 'متتبع العادات اليومية'
WHERE id = 'digital-exams-resource-habit-tracker'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 01',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.coursera.org", "description": "منصة تعليمية تقدم دورات في مهارات الدراسة والتحضير للاختبارات.", "slug": "digital-exams-resource-item-01"}'::jsonb,
    title_ar = 'موقع كورسيرا'
WHERE id = 'digital-exams-resource-item-01'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 02',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://ar.khanacademy.org", "description": "دروس ومقاطع فيديو تعليمية مجانية في مختلف المواد.", "slug": "digital-exams-resource-item-02"}'::jsonb,
    title_ar = 'أكاديمية خان'
WHERE id = 'digital-exams-resource-item-02'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 03',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://quizlet.com", "description": "أداة لإنشاء بطاقات تعليمية واختبارات تدريبية.", "slug": "digital-exams-resource-item-03"}'::jsonb,
    title_ar = 'موقع كويزليت'
WHERE id = 'digital-exams-resource-item-03'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 04',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://pomofocus.io", "description": "تطبيق لإدارة الوقت أثناء المذاكرة باستخدام تقنية بومودورو.", "slug": "digital-exams-resource-item-04"}'::jsonb,
    title_ar = 'تطبيق بومودورو'
WHERE id = 'digital-exams-resource-item-04'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 05',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.edx.org", "description": "دورات تدريبية من جامعات عالمية لتطوير مهارات التعلم.", "slug": "digital-exams-resource-item-05"}'::jsonb,
    title_ar = 'موقع إيديكس'
WHERE id = 'digital-exams-resource-item-05'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 06',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.studentblog.com", "description": "مقالات ونصائح للطلاب حول المذاكرة والتحضير للاختبارات.", "slug": "digital-exams-resource-item-06"}'::jsonb,
    title_ar = 'مدونة طالب'
WHERE id = 'digital-exams-resource-item-06'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 07',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.udemy.com", "description": "دورات في كيفية التغلب على قلق الاختبارات.", "slug": "digital-exams-resource-item-07"}'::jsonb,
    title_ar = 'موقع يوديمي'
WHERE id = 'digital-exams-resource-item-07'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 08',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.forestapp.cc", "description": "تطبيق يساعد على التركيز والابتعاد عن الهاتف أثناء المذاكرة.", "slug": "digital-exams-resource-item-08"}'::jsonb,
    title_ar = 'تطبيق فورست'
WHERE id = 'digital-exams-resource-item-08'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 09',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://drive.google.com", "description": "مساحة لتخزين ومشاركة الملاحظات والملفات الدراسية.", "slug": "digital-exams-resource-item-09"}'::jsonb,
    title_ar = 'موقع جوجل درايف'
WHERE id = 'digital-exams-resource-item-09'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Item 10',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.notion.so", "description": "أداة قوية لتنظيم الجداول الدراسية والملاحظات.", "slug": "digital-exams-resource-item-10"}'::jsonb,
    title_ar = 'موقع نوشن'
WHERE id = 'digital-exams-resource-item-10'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Khan Academy Math',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://ar.khanacademy.org", "description": "شروحات مرئية وتمارين تفاعلية ممتازة لتأسيس وتقوية المهارات الرياضية المطلوبة في الاختبارات المعيارية.", "slug": "digital-exams-resource-khan-academy-math"}'::jsonb,
    title_ar = 'أكاديمية خان (قسم الرياضيات)'
WHERE id = 'digital-exams-resource-khan-academy-math'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Math Way',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.mathway.com", "description": "أداة للتحقق من إجاباتك ومراجعة خطوات الحل الدقيقة في المسائل الجبرية والهندسية.", "slug": "digital-exams-resource-math-way"}'::jsonb,
    title_ar = 'حلّال المسائل الرياضية'
WHERE id = 'digital-exams-resource-math-way'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Mindmeister',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.mindmeister.com", "description": "منصة لإنشاء خرائط ذهنية إلكترونية تساعد في تلخيص المواضيع المعقدة وربط الأفكار.", "slug": "digital-exams-resource-mindmeister"}'::jsonb,
    title_ar = 'أداة الخرائط الذهنية (مايند مايستر)'
WHERE id = 'digital-exams-resource-mindmeister'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Mock Test Analysis Sheet',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "جدول بيانات جاهز لمتابعة درجاتك في الاختبارات التجريبية وتحديد الفجوات المعرفية تلقائياً.", "slug": "digital-exams-resource-mock-test-analysis-sheet"}'::jsonb,
    title_ar = 'نموذج تحليل الاختبارات التجريبية'
WHERE id = 'digital-exams-resource-mock-test-analysis-sheet'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Notion Templates',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.notion.so", "description": "استخدم قوالب نوشن الجاهزة لتنظيم جدول المراجعة وبناء سجل الأخطاء الخاص بك.", "slug": "digital-exams-resource-notion-templates"}'::jsonb,
    title_ar = 'قوالب نوشن للمراجعة'
WHERE id = 'digital-exams-resource-notion-templates'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Online Whiteboard',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://awwapp.com", "description": "مساحة مسودة افتراضية للتدرب على حل المسائل وكأنك في بيئة اختبار رقمية غير ورقية.", "slug": "digital-exams-resource-online-whiteboard"}'::jsonb,
    title_ar = 'السبورة البيضاء التفاعلية'
WHERE id = 'digital-exams-resource-online-whiteboard'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Pomodoro Tracker',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://pomofocus.io", "description": "أداة ممتازة لتقسيم وقت المذاكرة إلى فترات زمنية لزيادة التركيز وإدارة الوقت بفعالية.", "slug": "digital-exams-resource-pomodoro-tracker"}'::jsonb,
    title_ar = 'أداة تتبع بومودورو'
WHERE id = 'digital-exams-resource-pomodoro-tracker'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Qiyas Official',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://etec.gov.sa", "description": "الموقع الرسمي للاطلاع على مواعيد الاختبارات الرقمية، تسجيل الدخول، ومعرفة الشروط والتعليمات.", "slug": "digital-exams-resource-qiyas-official"}'::jsonb,
    title_ar = 'موقع هيئة تقويم التعليم والتدريب (قياس)'
WHERE id = 'digital-exams-resource-qiyas-official'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Sleep Cycle App',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "https://www.sleepcycle.com", "description": "يساعدك على ضبط مواعيد نومك لضمان الاستيقاظ في أقصى درجات النشاط يوم الاختبار.", "slug": "digital-exams-resource-sleep-cycle-app"}'::jsonb,
    title_ar = 'تطبيق تتبع دورة النوم'
WHERE id = 'digital-exams-resource-sleep-cycle-app'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Speed Reading Tool',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "منصة لتحسين سرعة القراءة واستيعاب المقروء، مهارة أساسية للأقسام اللفظية.", "slug": "digital-exams-resource-speed-reading-tool"}'::jsonb,
    title_ar = 'أداة تدريب القراءة السريعة'
WHERE id = 'digital-exams-resource-speed-reading-tool'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Test Anxiety Guide',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "مقال شامل يقدم نصائح علمية للتغلب على القلق وتحسين الأداء تحت الضغط النفسي.", "slug": "digital-exams-resource-test-anxiety-guide"}'::jsonb,
    title_ar = 'دليل التعامل مع قلق الاختبارات'
WHERE id = 'digital-exams-resource-test-anxiety-guide'
AND status = 'draft';
UPDATE digital_exams_resources
SET
    content_type = 'resource',
    title_en = 'Time Blocking Guide',
    portal_id = 'digital-exams',
    status = 'draft',
    data = '{"url": "", "description": "شرح مفصل لكيفية استخدام استراتيجية Time Blocking لتنظيم يومك خلال فترة المراجعة النهائية.", "slug": "digital-exams-resource-time-blocking-guide"}'::jsonb,
    title_ar = 'دليل استراتيجية حجب الوقت'
WHERE id = 'digital-exams-resource-time-blocking-guide'
AND status = 'draft';


-- Table: iot_glossary
-- Expected updates: 50

UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Actuator',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "جهاز يحول الإشارة الكهربائية إلى حركة ميكانيكية أو فعل فيزيائي.", "example": "التحكم في محرك سيرفو لتدوير ذراع آلي.", "definition_ar": "جهاز يحول الإشارة الكهربائية إلى حركة ميكانيكية أو فعل فيزيائي.", "slug": "iot-lab-glossary-actuator"}'::jsonb,
    title_ar = 'مشغل (Actuator)'
WHERE id = 'iot-lab-glossary-actuator'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'ADC',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "وحدة إلكترونية تحول الإشارات الكهربائية المتغيرة (التناظرية) إلى أرقام يمكن للمتحكم قراءتها.", "example": "قراءة قيمة مستشعر الضوء LDR.", "definition_ar": "وحدة إلكترونية تحول الإشارات الكهربائية المتغيرة (التناظرية) إلى أرقام يمكن للمتحكم قراءتها.", "slug": "iot-lab-glossary-adc"}'::jsonb,
    title_ar = 'محول الإشارة التناظرية إلى رقمية (ADC)'
WHERE id = 'iot-lab-glossary-adc'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Analog Signal',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "إشارة مستمرة تتغير قيمتها بمرور الوقت، ويمكن أن تأخذ أي قيمة ضمن نطاق معين.", "example": "قراءة إشارة تماثلية من حساس حرارة متصل بمدخل تماثلي في الأردوينو.", "definition_ar": "إشارة مستمرة تتغير قيمتها بمرور الوقت، ويمكن أن تأخذ أي قيمة ضمن نطاق معين.", "slug": "iot-lab-glossary-analog-signal"}'::jsonb,
    title_ar = 'إشارة تماثلية (Analog Signal)'
WHERE id = 'iot-lab-glossary-analog-signal'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Arduino',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "منصة إلكترونية مفتوحة المصدر تعتمد على أجهزة وبرمجيات سهلة الاستخدام.", "example": "برمجة أردوينو أونو لوميض مصباح LED.", "definition_ar": "منصة إلكترونية مفتوحة المصدر تعتمد على أجهزة وبرمجيات سهلة الاستخدام.", "slug": "iot-lab-glossary-arduino"}'::jsonb,
    title_ar = 'أردوينو (Arduino)'
WHERE id = 'iot-lab-glossary-arduino'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Baud Rate',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "سرعة نقل البيانات عبر الاتصال التسلسلي، ويقاس بالبت في الثانية.", "example": "ضبط معدل الباود على 9600 في كل من الأردوينو والشاشة التسلسلية.", "definition_ar": "سرعة نقل البيانات عبر الاتصال التسلسلي، ويقاس بالبت في الثانية.", "slug": "iot-lab-glossary-baud-rate"}'::jsonb,
    title_ar = 'معدل الباود'
WHERE id = 'iot-lab-glossary-baud-rate'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Bootloader',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "برنامج صغير مدمج في المتحكم الدقيق يهيئ الجهاز لبدء تشغيل البرنامج الرئيسي وتحديثه.", "example": "حرق محمل الإقلاع على شريحة ATmega328P جديدة.", "definition_ar": "برنامج صغير مدمج في المتحكم الدقيق يهيئ الجهاز لبدء تشغيل البرنامج الرئيسي وتحديثه.", "slug": "iot-lab-glossary-bootloader"}'::jsonb,
    title_ar = 'محمل الإقلاع (Bootloader)'
WHERE id = 'iot-lab-glossary-bootloader'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Breadboard',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "لوح بلاستيكي يحتوي على ثقوب لتوصيل المكونات الإلكترونية بدون لحام.", "example": "توصيل دائرة بسيطة بمقاومة ومصباح LED على لوح التجارب.", "definition_ar": "لوح بلاستيكي يحتوي على ثقوب لتوصيل المكونات الإلكترونية بدون لحام.", "slug": "iot-lab-glossary-breadboard"}'::jsonb,
    title_ar = 'لوح التجارب (Breadboard)'
WHERE id = 'iot-lab-glossary-breadboard'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Capacitor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مكون يقوم بتخزين الطاقة الكهربائية بشكل مؤقت وتفريغها عند الحاجة.", "example": "استخدام مكثف لتنعيم إشارة الجهد الخارجة من مزود الطاقة.", "definition_ar": "مكون يقوم بتخزين الطاقة الكهربائية بشكل مؤقت وتفريغها عند الحاجة.", "slug": "iot-lab-glossary-capacitor"}'::jsonb,
    title_ar = 'مكثف (Capacitor)'
WHERE id = 'iot-lab-glossary-capacitor'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Circuit Schematic',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "رسم توضيحي يمثل المكونات الإلكترونية وطريقة توصيلها باستخدام رموز قياسية.", "example": "رسم مخطط دائرة التحكم في محرك باستخدام الترانزستور قبل تنفيذها عملياً.", "definition_ar": "رسم توضيحي يمثل المكونات الإلكترونية وطريقة توصيلها باستخدام رموز قياسية.", "slug": "iot-lab-glossary-circuit-schematic"}'::jsonb,
    title_ar = 'مخطط الدائرة (Circuit Schematic)'
WHERE id = 'iot-lab-glossary-circuit-schematic'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Current',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "معدل تدفق الشحنات الكهربائية في الدائرة، ويقاس بالأمبير.", "example": "حساب التيار المار في مقاومة باستخدام قانون أوم.", "definition_ar": "معدل تدفق الشحنات الكهربائية في الدائرة، ويقاس بالأمبير.", "slug": "iot-lab-glossary-current"}'::jsonb,
    title_ar = 'التيار الكهربائي (Current)'
WHERE id = 'iot-lab-glossary-current'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'DAC',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "وحدة تحول الأرقام الرقمية إلى إشارات جهد كهربائي متغير.", "example": "توليد إشارات صوتية من المتحكم الدقيق.", "definition_ar": "وحدة تحول الأرقام الرقمية إلى إشارات جهد كهربائي متغير.", "slug": "iot-lab-glossary-dac"}'::jsonb,
    title_ar = 'محول الإشارة الرقمية إلى تناظرية (DAC)'
WHERE id = 'iot-lab-glossary-dac'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Data Logging',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "عملية جمع وتخزين البيانات بمرور الوقت، إما محلياً أو على خادم سحابي.", "example": "حفظ قراءات حساس الرطوبة كل 5 دقائق في بطاقة SD.", "definition_ar": "عملية جمع وتخزين البيانات بمرور الوقت، إما محلياً أو على خادم سحابي.", "slug": "iot-lab-glossary-data-logging"}'::jsonb,
    title_ar = 'تسجيل البيانات (Data Logging)'
WHERE id = 'iot-lab-glossary-data-logging'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Debouncing',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "معالجة برمجية أو فيزيائية لمنع قراءة ضغطات متكررة خاطئة عند ضغط الزر الميكانيكي مرة واحدة.", "example": "إضافة تأخير 50 مللي ثانية في الكود بعد اكتشاف ضغطة الزر.", "definition_ar": "معالجة برمجية أو فيزيائية لمنع قراءة ضغطات متكررة خاطئة عند ضغط الزر الميكانيكي مرة واحدة.", "slug": "iot-lab-glossary-debounce"}'::jsonb,
    title_ar = 'إزالة الارتداد (Debouncing)'
WHERE id = 'iot-lab-glossary-debounce'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Debugging',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "عملية اكتشاف وتحديد وإصلاح الأخطاء في البرمجيات أو الدوائر الإلكترونية.", "example": "استخدام شاشة الاتصال التسلسلي (Serial Monitor) لمراقبة قيم المتغيرات أثناء تشغيل الكود.", "definition_ar": "عملية اكتشاف وتحديد وإصلاح الأخطاء في البرمجيات أو الدوائر الإلكترونية.", "slug": "iot-lab-glossary-debugging"}'::jsonb,
    title_ar = 'تصحيح الأخطاء (Debugging)'
WHERE id = 'iot-lab-glossary-debugging'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Digital Signal',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "إشارة متقطعة تأخذ قيمتين فقط (عالي/منخفض أو 1/0).", "example": "قراءة حالة زر ضاغط كإشارة رقمية (مضغوط أو غير مضغوط).", "definition_ar": "إشارة متقطعة تأخذ قيمتين فقط (عالي/منخفض أو 1/0).", "slug": "iot-lab-glossary-digital-signal"}'::jsonb,
    title_ar = 'إشارة رقمية (Digital Signal)'
WHERE id = 'iot-lab-glossary-digital-signal'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'ESP32',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "شريحة تحكم دقيقة منخفضة التكلفة والطاقة تتميز بوجود Wi-Fi و Bluetooth مدمجين.", "example": "استخدام ESP32 لإرسال بيانات الحساسات إلى خادم سحابي.", "definition_ar": "شريحة تحكم دقيقة منخفضة التكلفة والطاقة تتميز بوجود Wi-Fi و Bluetooth مدمجين.", "slug": "iot-lab-glossary-esp32"}'::jsonb,
    title_ar = 'إي إس بي 32 (ESP32)'
WHERE id = 'iot-lab-glossary-esp32'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Gpio',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "دبابيس عامة الأغراض على لوحة المتحكم يمكن برمجتها للعمل كمدخلات أو مخرجات.", "example": "توصيل LED بدبوس GPIO رقم 13 على الأردوينو.", "definition_ar": "دبابيس عامة الأغراض على لوحة المتحكم يمكن برمجتها للعمل كمدخلات أو مخرجات.", "slug": "iot-lab-glossary-gpio"}'::jsonb,
    title_ar = 'دبابيس الإدخال والإخراج (GPIO)'
WHERE id = 'iot-lab-glossary-gpio'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Ground - GND',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "النقطة المرجعية في الدائرة الكهربائية التي تقاس بالنسبة لها جميع الجهود الأخرى، وهو مسار العودة للتيار.", "example": "يجب ربط الطرف السالب للبطارية بمنفذ GND.", "definition_ar": "النقطة المرجعية في الدائرة الكهربائية التي تقاس بالنسبة لها جميع الجهود الأخرى، وهو مسار العودة للتيار.", "slug": "iot-lab-glossary-ground"}'::jsonb,
    title_ar = 'التأريض (Ground - GND)'
WHERE id = 'iot-lab-glossary-ground'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'I2C 2',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول اتصال تسلسلي يسمح لعدة أجهزة طرفية بالتواصل مع متحكم واحد باستخدام سلكين فقط.", "example": "توصيل شاشة LCD ومستشعر حرارة بنفس منافذ I2C.", "definition_ar": "بروتوكول اتصال تسلسلي يسمح لعدة أجهزة طرفية بالتواصل مع متحكم واحد باستخدام سلكين فقط.", "slug": "iot-lab-glossary-i2c-2"}'::jsonb,
    title_ar = 'بروتوكول I2C'
WHERE id = 'iot-lab-glossary-i2c-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Inter-Integrated Circuit',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول اتصال متسلسل يسمح بتوصيل أجهزة متعددة باستخدام سلكين فقط.", "example": "قراءة البيانات من حساس الضغط الجوي باستخدام بروتوكول I2C.", "definition_ar": "بروتوكول اتصال متسلسل يسمح بتوصيل أجهزة متعددة باستخدام سلكين فقط.", "slug": "iot-lab-glossary-i2c"}'::jsonb,
    title_ar = 'بروتوكول I2C'
WHERE id = 'iot-lab-glossary-i2c'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Interrupt',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "إشارة تُرسل للمتحكم لإيقاف ما يفعله حالياً لتنفيذ مهمة أكثر أهمية وفورية.", "example": "استخدام زر ضغطي كمقاطعة لتشغيل إنذار فوري.", "definition_ar": "إشارة تُرسل للمتحكم لإيقاف ما يفعله حالياً لتنفيذ مهمة أكثر أهمية وفورية.", "slug": "iot-lab-glossary-interrupt"}'::jsonb,
    title_ar = 'المقاطعة (Interrupt)'
WHERE id = 'iot-lab-glossary-interrupt'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Iot',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "شبكة من الأجهزة المادية المتصلة بالإنترنت لجمع وتبادل البيانات بذكاء.", "example": "نظام زراعة ذكي يروي النباتات تلقائياً عند جفاف التربة.", "definition_ar": "شبكة من الأجهزة المادية المتصلة بالإنترنت لجمع وتبادل البيانات بذكاء.", "slug": "iot-lab-glossary-iot"}'::jsonb,
    title_ar = 'إنترنت الأشياء (IoT)'
WHERE id = 'iot-lab-glossary-iot'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Jumper Wires',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "أسلاك قصيرة بأطراف صلبة تستخدم لتوصيل المكونات على لوح التجارب.", "example": "استخدام أسلاك توصيل من نوع (ذكر-ذكر) لربط الحساسات بلوح التجارب.", "definition_ar": "أسلاك قصيرة بأطراف صلبة تستخدم لتوصيل المكونات على لوح التجارب.", "slug": "iot-lab-glossary-jumper-wires"}'::jsonb,
    title_ar = 'أسلاك توصيل (Jumper Wires)'
WHERE id = 'iot-lab-glossary-jumper-wires'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Light Emitting Diode',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مكون إلكتروني يضيء عند مرور التيار الكهربائي فيه في اتجاه واحد.", "example": "استخدام LED أحمر كمؤشر لعمل الجهاز.", "definition_ar": "مكون إلكتروني يضيء عند مرور التيار الكهربائي فيه في اتجاه واحد.", "slug": "iot-lab-glossary-led"}'::jsonb,
    title_ar = 'صمام ثنائي باعث للضوء (LED)'
WHERE id = 'iot-lab-glossary-led'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Logic Level',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مستويات الجهد الكهربائي التي تمثل الحالة 0 أو 1 في الدوائر الرقمية، عادة 3.3 فولت أو 5 فولت.", "example": "توصيل شريحة ESP32 التي تعمل بـ 3.3 فولت مع حساس 5 فولت يحتاج لمحول مستوى.", "definition_ar": "مستويات الجهد الكهربائي التي تمثل الحالة 0 أو 1 في الدوائر الرقمية، عادة 3.3 فولت أو 5 فولت.", "slug": "iot-lab-glossary-logic-level"}'::jsonb,
    title_ar = 'مستوى الجهد المنطقي'
WHERE id = 'iot-lab-glossary-logic-level'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Microcontroller',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "حاسوب صغير متكامل على شريحة واحدة مصمم للتحكم في الأجهزة والعمليات المحددة.", "example": "شريحة ATmega328P المستخدمة في لوحة الأردوينو أونو.", "definition_ar": "حاسوب صغير متكامل على شريحة واحدة مصمم للتحكم في الأجهزة والعمليات المحددة.", "slug": "iot-lab-glossary-microcontroller"}'::jsonb,
    title_ar = 'متحكم دقيق (Microcontroller)'
WHERE id = 'iot-lab-glossary-microcontroller'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'MQTT',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول مراسلة خفيف الوزن يعتمد على نموذج النشر/الاشتراك، يستخدم بكثرة في إنترنت الأشياء.", "example": "إرسال قراءات درجة الحرارة من ESP32 إلى وسيط MQTT.", "definition_ar": "بروتوكول مراسلة خفيف الوزن يعتمد على نموذج النشر/الاشتراك، يستخدم بكثرة في إنترنت الأشياء.", "slug": "iot-lab-glossary-mqtt"}'::jsonb,
    title_ar = 'بروتوكول MQTT'
WHERE id = 'iot-lab-glossary-mqtt'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Multimeter',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "أداة قياس إلكترونية تستخدم لقياس الجهد، التيار، والمقاومة.", "example": "فحص استمرارية السلك باستخدام الملتيميتر للتأكد من عدم وجود قطع.", "definition_ar": "أداة قياس إلكترونية تستخدم لقياس الجهد، التيار، والمقاومة.", "slug": "iot-lab-glossary-multimeter"}'::jsonb,
    title_ar = 'مقياس متعدد (Multimeter)'
WHERE id = 'iot-lab-glossary-multimeter'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Ohm''s Law',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "قانون فيزيائي يوضح العلاقة بين الجهد والتيار والمقاومة (V=I*R).", "example": "تطبيق قانون أوم لحساب قيمة المقاومة اللازمة لمصباح LED.", "definition_ar": "قانون فيزيائي يوضح العلاقة بين الجهد والتيار والمقاومة (V=I*R).", "slug": "iot-lab-glossary-ohm-law"}'::jsonb,
    title_ar = 'قانون أوم (Ohm''s Law)'
WHERE id = 'iot-lab-glossary-ohm-law'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'PCB',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "لوحة من مادة عازلة تحتوي على مسارات نحاسية محفورة لربط المكونات الإلكترونية بدلاً من الأسلاك.", "example": "نقل المشروع من لوحة التجارب إلى PCB لجعله نهائياً ودائماً.", "definition_ar": "لوحة من مادة عازلة تحتوي على مسارات نحاسية محفورة لربط المكونات الإلكترونية بدلاً من الأسلاك.", "slug": "iot-lab-glossary-pcb"}'::jsonb,
    title_ar = 'اللوحة المطبوعة (PCB)'
WHERE id = 'iot-lab-glossary-pcb'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Pull-down Resistor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مقاومة توصل بين طرف الإدخال والأرضي لضمان قراءة مستوى منطقي منخفض (LOW) عند عدم وجود إدخال.", "example": "استخدام مقاومة خفض لضمان قراءة 0 فولت عند عدم ضغط الزر.", "definition_ar": "مقاومة توصل بين طرف الإدخال والأرضي لضمان قراءة مستوى منطقي منخفض (LOW) عند عدم وجود إدخال.", "slug": "iot-lab-glossary-pull-down"}'::jsonb,
    title_ar = 'مقاومة الخفض (Pull-down Resistor)'
WHERE id = 'iot-lab-glossary-pull-down'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Pull-up Resistor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مقاومة توصل بين طرف الإدخال وجهد التغذية لضمان قراءة مستوى منطقي عالٍ (HIGH) عندما لا يكون هناك إدخال.", "example": "توصيل زر ضغطي مع مقاومة رفع لمنع القراءات العشوائية.", "definition_ar": "مقاومة توصل بين طرف الإدخال وجهد التغذية لضمان قراءة مستوى منطقي عالٍ (HIGH) عندما لا يكون هناك إدخال.", "slug": "iot-lab-glossary-pull-up"}'::jsonb,
    title_ar = 'مقاومة الرفع (Pull-up Resistor)'
WHERE id = 'iot-lab-glossary-pull-up'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Pulse Width Modulation',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "تقنية لمحاكاة إشارة تماثلية باستخدام إشارات رقمية سريعة التغيير.", "example": "التحكم في سرعة محرك أو شدة إضاءة LED باستخدام إشارات PWM.", "definition_ar": "تقنية لمحاكاة إشارة تماثلية باستخدام إشارات رقمية سريعة التغيير.", "slug": "iot-lab-glossary-pwm-2"}'::jsonb,
    title_ar = 'تعديل عرض النبضة (PWM)'
WHERE id = 'iot-lab-glossary-pwm-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'PWM',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "تقنية للحصول على نتائج تناظرية باستخدام وسائل رقمية عبر تغيير نسبة وقت التشغيل إلى وقت التوقف.", "example": "التحكم في سطوع مصباح LED أو سرعة محرك.", "definition_ar": "تقنية للحصول على نتائج تناظرية باستخدام وسائل رقمية عبر تغيير نسبة وقت التشغيل إلى وقت التوقف.", "slug": "iot-lab-glossary-pwm"}'::jsonb,
    title_ar = 'تعديل عرض النبضة (PWM)'
WHERE id = 'iot-lab-glossary-pwm'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Raspberry Pi',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "حاسوب صغير بحجم بطاقة الائتمان يمكن استخدامه في مشاريع الإلكترونيات والحوسبة.", "example": "إعداد راسبيري باي كخادم ويب منزلي.", "definition_ar": "حاسوب صغير بحجم بطاقة الائتمان يمكن استخدامه في مشاريع الإلكترونيات والحوسبة.", "slug": "iot-lab-glossary-raspberry-pi"}'::jsonb,
    title_ar = 'راسبيري باي (Raspberry Pi)'
WHERE id = 'iot-lab-glossary-raspberry-pi'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Relay',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مفتاح كهرومغناطيسي يسمح لدائرة ذات جهد منخفض بالتحكم في دائرة ذات جهد عالي.", "example": "استخدام المُرحل للتحكم في تشغيل مضخة مياه 220 فولت بواسطة الأردوينو.", "definition_ar": "مفتاح كهرومغناطيسي يسمح لدائرة ذات جهد منخفض بالتحكم في دائرة ذات جهد عالي.", "slug": "iot-lab-glossary-relay-2"}'::jsonb,
    title_ar = 'مُرحل (Relay)'
WHERE id = 'iot-lab-glossary-relay-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Relay',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مفتاح كهرومغناطيسي يستخدم للتحكم بدائرة كهربائية ذات جهد عالي باستخدام إشارة ذات جهد منخفض.", "example": "استخدام الأردوينو لتشغيل مصباح 220 فولت عبر الريلاي.", "definition_ar": "مفتاح كهرومغناطيسي يستخدم للتحكم بدائرة كهربائية ذات جهد عالي باستخدام إشارة ذات جهد منخفض.", "slug": "iot-lab-glossary-relay"}'::jsonb,
    title_ar = 'المُرحِّل (Relay)'
WHERE id = 'iot-lab-glossary-relay'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Resistance',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "ممانعة المادة لمرور التيار الكهربائي فيها، وتقاس بالأوم.", "example": "استخدام مقاومة 220 أوم لحماية مصباح LED من الاحتراق.", "definition_ar": "ممانعة المادة لمرور التيار الكهربائي فيها، وتقاس بالأوم.", "slug": "iot-lab-glossary-resistance"}'::jsonb,
    title_ar = 'المقاومة الكهربائية (Resistance)'
WHERE id = 'iot-lab-glossary-resistance'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Resistor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مكون إلكتروني سلبي يقلل من تدفق التيار الكهربائي.", "example": "توصيل مقاومة على التوالي مع LED لحمايته من التيار الزائد.", "definition_ar": "مكون إلكتروني سلبي يقلل من تدفق التيار الكهربائي.", "slug": "iot-lab-glossary-resistor"}'::jsonb,
    title_ar = 'مقاوم (Resistor)'
WHERE id = 'iot-lab-glossary-resistor'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Schematic',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "رسم هندسي يوضح التوصيلات الكهربائية بين المكونات الإلكترونية باستخدام الرموز القياسية.", "example": "قراءة المخطط لتوصيل الدائرة بشكل صحيح على لوحة التجارب.", "definition_ar": "رسم هندسي يوضح التوصيلات الكهربائية بين المكونات الإلكترونية باستخدام الرموز القياسية.", "slug": "iot-lab-glossary-schematic"}'::jsonb,
    title_ar = 'المخطط الكهربائي'
WHERE id = 'iot-lab-glossary-schematic'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Sensor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "جهاز يكتشف التغيرات في البيئة (مثل الحرارة، الضوء، أو الحركة) ويحولها إلى إشارات كهربائية.", "example": "استخدام مستشعر الموجات فوق الصوتية لقياس المسافة.", "definition_ar": "جهاز يكتشف التغيرات في البيئة (مثل الحرارة، الضوء، أو الحركة) ويحولها إلى إشارات كهربائية.", "slug": "iot-lab-glossary-sensor"}'::jsonb,
    title_ar = 'مستشعر (Sensor)'
WHERE id = 'iot-lab-glossary-sensor'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Serial Monitor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "أداة في بيئة تطوير الأردوينو لعرض البيانات المرسلة من المتحكم الدقيق وإرسال الأوامر إليه.", "example": "طباعة قيم المستشعر على الشاشة لمراقبتها أثناء التصحيح.", "definition_ar": "أداة في بيئة تطوير الأردوينو لعرض البيانات المرسلة من المتحكم الدقيق وإرسال الأوامر إليه.", "slug": "iot-lab-glossary-serial-monitor"}'::jsonb,
    title_ar = 'الشاشة التسلسلية'
WHERE id = 'iot-lab-glossary-serial-monitor'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Soldering',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "عملية دمج المكونات الإلكترونية على لوحة الدوائر المطبوعة (PCB) باستخدام سبيكة معدنية قابلة للذوبان.", "example": "لحام أسلاك التوصيل بمحرك تيار مستمر لضمان اتصال قوي.", "definition_ar": "عملية دمج المكونات الإلكترونية على لوحة الدوائر المطبوعة (PCB) باستخدام سبيكة معدنية قابلة للذوبان.", "slug": "iot-lab-glossary-soldering"}'::jsonb,
    title_ar = 'اللحام (Soldering)'
WHERE id = 'iot-lab-glossary-soldering'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Serial Peripheral Interface',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول اتصال متسلسل متزامن لنقل البيانات بسرعة بين المتحكمات الدقيقة والملحقات.", "example": "توصيل شاشة LCD بالمتحكم الدقيق باستخدام واجهة SPI.", "definition_ar": "بروتوكول اتصال متسلسل متزامن لنقل البيانات بسرعة بين المتحكمات الدقيقة والملحقات.", "slug": "iot-lab-glossary-spi-2"}'::jsonb,
    title_ar = 'بروتوكول SPI'
WHERE id = 'iot-lab-glossary-spi-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Spi',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول اتصال تسلسلي سريع جداً لنقل البيانات بين المتحكم الدقيق والشرائح الأخرى.", "example": "قراءة البيانات من بطاقة SD باستخدام SPI.", "definition_ar": "بروتوكول اتصال تسلسلي سريع جداً لنقل البيانات بين المتحكم الدقيق والشرائح الأخرى.", "slug": "iot-lab-glossary-spi"}'::jsonb,
    title_ar = 'بروتوكول SPI'
WHERE id = 'iot-lab-glossary-spi'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Transistor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "عنصر شبه موصل يستخدم كمفتاح للتحكم في تدفق التيار، أو كمكبر للإشارة.", "example": "استخدام ترانزستور للتحكم في تشغيل محرك تيار مستمر (DC) بواسطة إشارة من الأردوينو.", "definition_ar": "عنصر شبه موصل يستخدم كمفتاح للتحكم في تدفق التيار، أو كمكبر للإشارة.", "slug": "iot-lab-glossary-transistor"}'::jsonb,
    title_ar = 'ترانزستور (Transistor)'
WHERE id = 'iot-lab-glossary-transistor'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Universal Asynchronous Receiver-Transmitter',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "بروتوكول اتصال متسلسل غير متزامن يستخدم لنقل البيانات بين جهازين.", "example": "التواصل بين شريحتي أردوينو عبر بروتوكول UART.", "definition_ar": "بروتوكول اتصال متسلسل غير متزامن يستخدم لنقل البيانات بين جهازين.", "slug": "iot-lab-glossary-uart-2"}'::jsonb,
    title_ar = 'بروتوكول UART'
WHERE id = 'iot-lab-glossary-uart-2'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Uart',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "وحدة اتصال تسلسلية غير متزامنة تستخدم لنقل البيانات بين جهازين.", "example": "نقل البيانات بين الأردوينو وجهاز الكمبيوتر عبر منفذ USB.", "definition_ar": "وحدة اتصال تسلسلية غير متزامنة تستخدم لنقل البيانات بين جهازين.", "slug": "iot-lab-glossary-uart"}'::jsonb,
    title_ar = 'بروتوكول UART'
WHERE id = 'iot-lab-glossary-uart'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Voltage',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مقدار القوة الدافعة للإلكترونات في الدائرة الكهربائية، ويقاس بالفولت.", "example": "قياس جهد بطارية باستخدام جهاز الملتيميتر.", "definition_ar": "مقدار القوة الدافعة للإلكترونات في الدائرة الكهربائية، ويقاس بالفولت.", "slug": "iot-lab-glossary-voltage"}'::jsonb,
    title_ar = 'الجهد الكهربائي (Voltage)'
WHERE id = 'iot-lab-glossary-voltage'
AND status = 'draft';
UPDATE iot_glossary
SET
    content_type = 'glossary',
    title_en = 'Wi-Fi Module',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"definition": "مكون إلكتروني يتيح توصيل الأجهزة الدقيقة بشبكة الواي فاي للاتصال بالإنترنت.", "example": "توصيل وحدة ESP8266 بشبكة المنزل للتحكم في الإضاءة.", "definition_ar": "مكون إلكتروني يتيح توصيل الأجهزة الدقيقة بشبكة الواي فاي للاتصال بالإنترنت.", "slug": "iot-lab-glossary-wifi-module"}'::jsonb,
    title_ar = 'وحدة واي فاي (Wi-Fi Module)'
WHERE id = 'iot-lab-glossary-wifi-module'
AND status = 'draft';


-- Table: iot_prompts
-- Expected updates: 30

UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Analog Circuit',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "كيف تعمل دائرة مقسم الجهد (Voltage Divider) ولماذا نستخدمها في مشاريعنا؟", "instructions": "قدم مثالاً يوضح استخدام مقاومتين لتقليل الجهد العالي ليناسب الأردوينو.", "prompt_text_ar": "كيف تعمل دائرة مقسم الجهد (Voltage Divider) ولماذا نستخدمها في مشاريعنا؟", "slug": "iot-lab-prompt-analog-circuit"}'::jsonb,
    title_ar = 'شرح دائرة تماثلية'
WHERE id = 'iot-lab-prompt-analog-circuit'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Arduino Blink Code Generation',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود أردوينو لجعل مصباح LED المتصل بالمنفذ [رقم_المنفذ] يومض بمعدل [مدة_التأخير] مللي ثانية. اشرح الكود سطرًا بسطر.", "instructions": "أدخل رقم المنفذ المتصل به المصباح ومدة التأخير المفضلة.", "prompt_text_ar": "اكتب كود أردوينو لجعل مصباح LED المتصل بالمنفذ [رقم_المنفذ] يومض بمعدل [مدة_التأخير] مللي ثانية. اشرح الكود سطرًا بسطر.", "slug": "iot-lab-prompt-arduino-blink"}'::jsonb,
    title_ar = 'كتابة كود وميض (Blink) للأردوينو'
WHERE id = 'iot-lab-prompt-arduino-blink'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Battery Level Monitor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب برنامجًا لأردوينو لقراءة الجهد من بطارية [نوع_البطارية] متصلة عبر مقسم جهد بالمنفذ [رقم_المنفذ_التناظري] وعرض نسبة الشحن المتبقية.", "instructions": "حدد نوع البطارية ورقم المنفذ التناظري المستخدم.", "prompt_text_ar": "اكتب برنامجًا لأردوينو لقراءة الجهد من بطارية [نوع_البطارية] متصلة عبر مقسم جهد بالمنفذ [رقم_المنفذ_التناظري] وعرض نسبة الشحن المتبقية.", "slug": "iot-lab-prompt-battery-monitor"}'::jsonb,
    title_ar = 'مراقبة مستوى البطارية'
WHERE id = 'iot-lab-prompt-battery-monitor'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Button Reading with Debounce',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "قم بكتابة كود لقراءة حالة زر ضاغط متصل بالمنفذ [رقم_المنفذ] بشكل صحيح دون مشكلة الارتداد (Debouncing)، واستخدامه لتغيير حالة متغير.", "instructions": "حدد رقم المنفذ المتصل به الزر.", "prompt_text_ar": "قم بكتابة كود لقراءة حالة زر ضاغط متصل بالمنفذ [رقم_المنفذ] بشكل صحيح دون مشكلة الارتداد (Debouncing)، واستخدامه لتغيير حالة متغير.", "slug": "iot-lab-prompt-button-debounce"}'::jsonb,
    title_ar = 'قراءة حالة زر مع تفادي الارتداد (Debounce)'
WHERE id = 'iot-lab-prompt-button-debounce'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Calibrate Sensor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "كيف أستطيع معايرة مستشعر درجة الحرارة LM35 ليعطي قراءات دقيقة؟", "instructions": "اشرح الخطوات الرياضية المطلوبة لتحويل الإشارة التماثلية إلى درجة مئوية.", "prompt_text_ar": "كيف أستطيع معايرة مستشعر درجة الحرارة LM35 ليعطي قراءات دقيقة؟", "slug": "iot-lab-prompt-calibrate-sensor"}'::jsonb,
    title_ar = 'معايرة مستشعر'
WHERE id = 'iot-lab-prompt-calibrate-sensor'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'DHT11 Sensor Reading',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "أريد كود لاستخدام حساس الحرارة والرطوبة DHT11 مع [نوع_اللوحة] لعرض درجة الحرارة بالدرجة المئوية والرطوبة بالنسبة المئوية كل [ثواني] ثانية.", "instructions": "حدد نوع اللوحة (أردوينو أو ESP32) والفاصل الزمني بين القراءات.", "prompt_text_ar": "أريد كود لاستخدام حساس الحرارة والرطوبة DHT11 مع [نوع_اللوحة] لعرض درجة الحرارة بالدرجة المئوية والرطوبة بالنسبة المئوية كل [ثواني] ثانية.", "slug": "iot-lab-prompt-dht11-sensor"}'::jsonb,
    title_ar = 'قراءة بيانات حساس DHT11'
WHERE id = 'iot-lab-prompt-dht11-sensor'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Esp32 Vs Arduino',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "ما الفرق بين لوحة الأردوينو أونو ولوحة ESP32، ومتى أستخدم كل منهما؟", "instructions": "قدم مقارنة تشمل التكلفة، الاتصال بالإنترنت، وقوة المعالجة.", "prompt_text_ar": "ما الفرق بين لوحة الأردوينو أونو ولوحة ESP32، ومتى أستخدم كل منهما؟", "slug": "iot-lab-prompt-esp32-vs-arduino"}'::jsonb,
    title_ar = 'مقارنة بين إي إس بي وأردوينو'
WHERE id = 'iot-lab-prompt-esp32-vs-arduino'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Simple ESP32 Webserver',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود لجعل لوحة ESP32 تعمل كخادم ويب يعرض صفحة HTML بسيطة تحتوي على زر لتشغيل وإطفاء LED متصل بالمنفذ [رقم_المنفذ].", "instructions": "حدد رقم المنفذ المتصل به الـ LED.", "prompt_text_ar": "اكتب كود لجعل لوحة ESP32 تعمل كخادم ويب يعرض صفحة HTML بسيطة تحتوي على زر لتشغيل وإطفاء LED متصل بالمنفذ [رقم_المنفذ].", "slug": "iot-lab-prompt-esp32-webserver"}'::jsonb,
    title_ar = 'إنشاء خادم ويب بسيط بـ ESP32'
WHERE id = 'iot-lab-prompt-esp32-webserver'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'ESP32 Wi-Fi Setup',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "قم بكتابة كود لربط لوحة ESP32 بشبكة Wi-Fi باسم (SSID) [اسم_الشبكة] وكلمة مرور [كلمة_المرور]، مع طباعة عنوان IP عند نجاح الاتصال.", "instructions": "قدم اسم الشبكة وكلمة المرور الخاصة بها.", "prompt_text_ar": "قم بكتابة كود لربط لوحة ESP32 بشبكة Wi-Fi باسم (SSID) [اسم_الشبكة] وكلمة مرور [كلمة_المرور]، مع طباعة عنوان IP عند نجاح الاتصال.", "slug": "iot-lab-prompt-esp32-wifi"}'::jsonb,
    title_ar = 'إعداد اتصال Wi-Fi في ESP32'
WHERE id = 'iot-lab-prompt-esp32-wifi'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Explain Pwm',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اشرح كيف تعمل تقنية تعديل عرض النبضة (PWM) وكيف يمكنني استخدامها لتخفيت إضاءة LED.", "instructions": "استخدم لغة سهلة مع تقديم مثال لكود أردوينو بسيط.", "prompt_text_ar": "اشرح كيف تعمل تقنية تعديل عرض النبضة (PWM) وكيف يمكنني استخدامها لتخفيت إضاءة LED.", "slug": "iot-lab-prompt-explain-pwm"}'::jsonb,
    title_ar = 'شرح تقنية PWM'
WHERE id = 'iot-lab-prompt-explain-pwm'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Fix Arduino Code',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "لدي مشكلة في كود الأردوينو التالي، هل يمكنك تصحيحه؟ [أدخل الكود]", "instructions": "قم بشرح الخطأ وكيفية إصلاحه برمجياً.", "prompt_text_ar": "لدي مشكلة في كود الأردوينو التالي، هل يمكنك تصحيحه؟ [أدخل الكود]", "slug": "iot-lab-prompt-fix-arduino-code"}'::jsonb,
    title_ar = 'تصحيح كود أردوينو'
WHERE id = 'iot-lab-prompt-fix-arduino-code'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Display Text on I2C LCD',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "أريد كودًا لعرض النص ''[النص_المطلوب]'' على شاشة LCD متصلة بـ [نوع_اللوحة] عبر بروتوكول I2C، مع تحديد عنوان الشاشة [عنوان_I2C].", "instructions": "أدخل النص المطلوب عرضه، ونوع اللوحة، وعنوان شاشة الـ I2C (غالباً 0x27).", "prompt_text_ar": "أريد كودًا لعرض النص ''[النص_المطلوب]'' على شاشة LCD متصلة بـ [نوع_اللوحة] عبر بروتوكول I2C، مع تحديد عنوان الشاشة [عنوان_I2C].", "slug": "iot-lab-prompt-i2c-lcd"}'::jsonb,
    title_ar = 'عرض نص على شاشة LCD ببروتوكول I2C'
WHERE id = 'iot-lab-prompt-i2c-lcd'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Using Interrupts',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كودًا يشرح كيفية استخدام المقاطعة الخارجية (External Interrupt) على المنفذ [رقم_منفذ_المقاطعة] لتنفيذ دالة معينة عند تغير حالة المنفذ.", "instructions": "حدد رقم منفذ المقاطعة (مثال: 2 أو 3 في أردوينو أونو).", "prompt_text_ar": "اكتب كودًا يشرح كيفية استخدام المقاطعة الخارجية (External Interrupt) على المنفذ [رقم_منفذ_المقاطعة] لتنفيذ دالة معينة عند تغير حالة المنفذ.", "slug": "iot-lab-prompt-interrupt-usage"}'::jsonb,
    title_ar = 'استخدام المقاطعات (Interrupts)'
WHERE id = 'iot-lab-prompt-interrupt-usage'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'MQTT Data Publishing',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود للوحة [نوع_اللوحة] للاتصال بوسيط MQTT على العنوان [عنوان_الوسيط] ونشر بيانات درجة الحرارة على الموضوع (Topic) [اسم_الموضوع].", "instructions": "حدد نوع اللوحة (مثل ESP32) وعنوان وسيط MQTT واسم الموضوع.", "prompt_text_ar": "اكتب كود للوحة [نوع_اللوحة] للاتصال بوسيط MQTT على العنوان [عنوان_الوسيط] ونشر بيانات درجة الحرارة على الموضوع (Topic) [اسم_الموضوع].", "slug": "iot-lab-prompt-mqtt-publish"}'::jsonb,
    title_ar = 'نشر بيانات عبر MQTT'
WHERE id = 'iot-lab-prompt-mqtt-publish'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Simple PID Controller Implementation',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب هيكل كود أساسي لتنفيذ متحكم PID في أردوينو للحفاظ على درجة حرارة عند نقطة مستهدفة [النقطة_المستهدفة] باستخدام حساس وسخان.", "instructions": "حدد النقطة المستهدفة لدرجة الحرارة.", "prompt_text_ar": "اكتب هيكل كود أساسي لتنفيذ متحكم PID في أردوينو للحفاظ على درجة حرارة عند نقطة مستهدفة [النقطة_المستهدفة] باستخدام حساس وسخان.", "slug": "iot-lab-prompt-pid-controller"}'::jsonb,
    title_ar = 'تنفيذ متحكم PID بسيط'
WHERE id = 'iot-lab-prompt-pid-controller'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'LED Brightness Control with PWM',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "قم بكتابة برنامج لأردوينو لزيادة وتقليل شدة إضاءة LED متصل بالمنفذ [رقم_المنفذ_PWM] تدريجيًا باستخدام تقنية PWM.", "instructions": "حدد رقم منفذ يدعم PWM (مثل 3, 5, 6, 9, 10, 11 في أردوينو أونو).", "prompt_text_ar": "قم بكتابة برنامج لأردوينو لزيادة وتقليل شدة إضاءة LED متصل بالمنفذ [رقم_المنفذ_PWM] تدريجيًا باستخدام تقنية PWM.", "slug": "iot-lab-prompt-pwm-led"}'::jsonb,
    title_ar = 'التحكم في شدة إضاءة LED بـ PWM'
WHERE id = 'iot-lab-prompt-pwm-led'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Python Script Rpi',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود بايثون بسيط لتشغيل وإطفاء LED متصل بدبوس GPIO في رازبري باي.", "instructions": "أضف تعليقات توضيحية على الكود لشرح كل خطوة.", "prompt_text_ar": "اكتب كود بايثون بسيط لتشغيل وإطفاء LED متصل بدبوس GPIO في رازبري باي.", "slug": "iot-lab-prompt-python-script-rpi"}'::jsonb,
    title_ar = 'كود بايثون لرازبري باي'
WHERE id = 'iot-lab-prompt-python-script-rpi'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Raspberry Pi GPIO Control',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب سكريبت بلغة بايثون لتشغيل وإطفاء جهاز متصل بمنفذ GPIO رقم [رقم_المنفذ] في جهاز راسبيري باي، مع وضع فاصل زمني مقداره [ثواني] ثانية بين التشغيل والإطفاء.", "instructions": "أدخل رقم منفذ GPIO والفاصل الزمني بالثواني.", "prompt_text_ar": "اكتب سكريبت بلغة بايثون لتشغيل وإطفاء جهاز متصل بمنفذ GPIO رقم [رقم_المنفذ] في جهاز راسبيري باي، مع وضع فاصل زمني مقداره [ثواني] ثانية بين التشغيل والإطفاء.", "slug": "iot-lab-prompt-raspberry-pi-gpio"}'::jsonb,
    title_ar = 'التحكم في منافذ GPIO في راسبيري باي'
WHERE id = 'iot-lab-prompt-raspberry-pi-gpio'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Relay Module Control',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود لتشغيل مُرحل متصل بالمنفذ [رقم_المنفذ] عندما تصل قراءة حساس الضوء إلى أقل من [قيمة_عتبة].", "instructions": "حدد رقم المنفذ للمرحل وقيمة العتبة لحساس الضوء.", "prompt_text_ar": "اكتب كود لتشغيل مُرحل متصل بالمنفذ [رقم_المنفذ] عندما تصل قراءة حساس الضوء إلى أقل من [قيمة_عتبة].", "slug": "iot-lab-prompt-relay-module"}'::jsonb,
    title_ar = 'التحكم في مُرحل (Relay)'
WHERE id = 'iot-lab-prompt-relay-module'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Data Logging to SD Card',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود لـ [نوع_اللوحة] لحفظ قراءات حساس [نوع_الحساس] في ملف نصي باسم ''[اسم_الملف]'' على بطاقة SD متصلة عبر واجهة SPI.", "instructions": "حدد نوع اللوحة، نوع الحساس، واسم الملف (مثال: data.txt).", "prompt_text_ar": "اكتب كود لـ [نوع_اللوحة] لحفظ قراءات حساس [نوع_الحساس] في ملف نصي باسم ''[اسم_الملف]'' على بطاقة SD متصلة عبر واجهة SPI.", "slug": "iot-lab-prompt-sd-card-log"}'::jsonb,
    title_ar = 'تسجيل البيانات على بطاقة SD'
WHERE id = 'iot-lab-prompt-sd-card-log'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Analog Sensor Reading',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "أحتاج إلى كود أردوينو لقراءة قيم من حساس [نوع_الحساس] متصل بالمنفذ التناظري [رقم_المنفذ]، مع عرض القيم على شاشة Serial Monitor.", "instructions": "حدد نوع الحساس ورقم المنفذ التناظري.", "prompt_text_ar": "أحتاج إلى كود أردوينو لقراءة قيم من حساس [نوع_الحساس] متصل بالمنفذ التناظري [رقم_المنفذ]، مع عرض القيم على شاشة Serial Monitor.", "slug": "iot-lab-prompt-sensor-read"}'::jsonb,
    title_ar = 'قراءة حساس تناظري'
WHERE id = 'iot-lab-prompt-sensor-read'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Serial Communication Between Two Boards',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "قدم كودًا للوحة المرسلة ولوحة المستقبلة لإرسال واستقبال رسالة نصية ''[الرسالة]'' باستخدام الاتصال التسلسلي (UART) بين لوحتي أردوينو.", "instructions": "أدخل الرسالة المراد إرسالها.", "prompt_text_ar": "قدم كودًا للوحة المرسلة ولوحة المستقبلة لإرسال واستقبال رسالة نصية ''[الرسالة]'' باستخدام الاتصال التسلسلي (UART) بين لوحتي أردوينو.", "slug": "iot-lab-prompt-serial-communication"}'::jsonb,
    title_ar = 'الاتصال التسلسلي بين لوحتين'
WHERE id = 'iot-lab-prompt-serial-communication'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Servo Motor Control',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "قم بإنشاء كود أردوينو لتحريك محرك سيرفو متصل بالمنفذ [رقم_المنفذ] من الزاوية 0 إلى 180 درجة، ثم العودة إلى 0 مرة أخرى.", "instructions": "حدد رقم المنفذ المتصل به محرك السيرفو.", "prompt_text_ar": "قم بإنشاء كود أردوينو لتحريك محرك سيرفو متصل بالمنفذ [رقم_المنفذ] من الزاوية 0 إلى 180 درجة، ثم العودة إلى 0 مرة أخرى.", "slug": "iot-lab-prompt-servo-motor"}'::jsonb,
    title_ar = 'التحكم في محرك سيرفو'
WHERE id = 'iot-lab-prompt-servo-motor'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Setup Raspberry Pi',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "ما هي الخطوات الأولى لتجهيز جهاز رازبري باي جديد للمرة الأولى؟", "instructions": "اذكر نظام التشغيل الموصى به وكيفية تثبيته وتوصيل الشاشة.", "prompt_text_ar": "ما هي الخطوات الأولى لتجهيز جهاز رازبري باي جديد للمرة الأولى؟", "slug": "iot-lab-prompt-setup-raspberry-pi"}'::jsonb,
    title_ar = 'إعداد رازبري باي'
WHERE id = 'iot-lab-prompt-setup-raspberry-pi'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Stepper Motor Control',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "أريد كودًا لتشغيل محرك خطوي لإكمال دورة كاملة في اتجاه عقارب الساعة ثم عكس الاتجاه، باستخدام مكتبة Stepper.h والمنفذ [منافذ_التحكم].", "instructions": "حدد المنافذ المستخدمة للتحكم في المحرك (مثال: 8,9,10,11).", "prompt_text_ar": "أريد كودًا لتشغيل محرك خطوي لإكمال دورة كاملة في اتجاه عقارب الساعة ثم عكس الاتجاه، باستخدام مكتبة Stepper.h والمنفذ [منافذ_التحكم].", "slug": "iot-lab-prompt-stepper-motor"}'::jsonb,
    title_ar = 'التحكم في محرك خطوي (Stepper)'
WHERE id = 'iot-lab-prompt-stepper-motor'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Suggest Iot Project',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اقترح فكرة مشروع إنترنت الأشياء للمبتدئين.", "instructions": "اذكر المكونات المطلوبة وطريقة العمل بشكل مبسط.", "prompt_text_ar": "اقترح فكرة مشروع إنترنت الأشياء للمبتدئين.", "slug": "iot-lab-prompt-suggest-iot-project"}'::jsonb,
    title_ar = 'اقتراح مشروع ذكي'
WHERE id = 'iot-lab-prompt-suggest-iot-project'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Troubleshoot Mqtt',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "جهازي لا يتصل بخادم MQTT، ما هي أهم الخطوات لاستكشاف هذه المشكلة وإصلاحها؟", "instructions": "اذكر أسباب شائعة مثل اسم المستخدم، كلمة المرور، أو مشاكل الشبكة.", "prompt_text_ar": "جهازي لا يتصل بخادم MQTT، ما هي أهم الخطوات لاستكشاف هذه المشكلة وإصلاحها؟", "slug": "iot-lab-prompt-troubleshoot-mqtt"}'::jsonb,
    title_ar = 'استكشاف أخطاء MQTT'
WHERE id = 'iot-lab-prompt-troubleshoot-mqtt'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Troubleshooting Guide',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "أواجه مشكلة [وصف_المشكلة] في مشروعي الذي يستخدم [المكونات]. ما هي الخطوات المنهجية لتتبع المشكلة وحلها؟", "instructions": "صف المشكلة التي تواجهها واذكر المكونات المستخدمة.", "prompt_text_ar": "أواجه مشكلة [وصف_المشكلة] في مشروعي الذي يستخدم [المكونات]. ما هي الخطوات المنهجية لتتبع المشكلة وحلها؟", "slug": "iot-lab-prompt-troubleshooting-guide"}'::jsonb,
    title_ar = 'دليل استكشاف الأخطاء'
WHERE id = 'iot-lab-prompt-troubleshooting-guide'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Distance Measurement with Ultrasonic Sensor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "اكتب كود لقياس المسافة بالسنتيمترات باستخدام حساس HC-SR04 المتصل بالمنفذين Trig [منفذ_trig] و Echo [منفذ_echo]، وطباعة النتيجة.", "instructions": "أدخل رقم منفذ Trig ورقم منفذ Echo.", "prompt_text_ar": "اكتب كود لقياس المسافة بالسنتيمترات باستخدام حساس HC-SR04 المتصل بالمنفذين Trig [منفذ_trig] و Echo [منفذ_echo]، وطباعة النتيجة.", "slug": "iot-lab-prompt-ultrasonic-distance"}'::jsonb,
    title_ar = 'قياس المسافة بحساس الموجات فوق الصوتية'
WHERE id = 'iot-lab-prompt-ultrasonic-distance'
AND status = 'draft';
UPDATE iot_prompts
SET
    content_type = 'prompt',
    title_en = 'Wire Sensor',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"prompt_text": "كيف أقوم بتوصيل مستشعر الحركة PIR مع الأردوينو بشكل آمن؟", "instructions": "وضح التوصيلات (الطاقة، الأرضي، إشارة البيانات) وقدم نصيحة للسلامة.", "prompt_text_ar": "كيف أقوم بتوصيل مستشعر الحركة PIR مع الأردوينو بشكل آمن؟", "slug": "iot-lab-prompt-wire-sensor"}'::jsonb,
    title_ar = 'توصيل مستشعر'
WHERE id = 'iot-lab-prompt-wire-sensor'
AND status = 'draft';


-- Table: iot_resources
-- Expected updates: 30

UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Adafruit Learning System',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://learn.adafruit.com/", "description": "مئات الشروحات والمشاريع المفتوحة المصدر للميكروكنترولر والإلكترونيات.", "slug": "iot-lab-resource-adafruit-learn"}'::jsonb,
    title_ar = 'منصة تعليم Adafruit'
WHERE id = 'iot-lab-resource-adafruit-learn'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Adafruit Tutorials',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://learn.adafruit.com/", "description": "مجموعة واسعة من الدروس والمشاريع المبتكرة لتوصيل وبرمجة المستشعرات.", "slug": "iot-lab-resource-adafruit-tutorials"}'::jsonb,
    title_ar = 'دروس آدافروت التعليمية'
WHERE id = 'iot-lab-resource-adafruit-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Arduino Docs',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.arduino.cc/en/Guide", "description": "الدليل الرسمي من أردوينو لتعلم الأساسيات والبدء في بناء المشاريع.", "slug": "iot-lab-resource-arduino-docs"}'::jsonb,
    title_ar = 'توثيق أردوينو الرسمي'
WHERE id = 'iot-lab-resource-arduino-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'ArduinoJson Library',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://arduinojson.org/", "description": "مكتبة مساعدة لتحليل وتكوين كائنات JSON في بيئة الأردوينو بكفاءة.", "slug": "iot-lab-resource-arduino-json"}'::jsonb,
    title_ar = 'مكتبة ArduinoJson'
WHERE id = 'iot-lab-resource-arduino-json'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Arduino Language Reference',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.arduino.cc/reference/en/", "description": "المرجع الرسمي لجميع دوال ومكتبات لغة البرمجة الخاصة بالأردوينو.", "slug": "iot-lab-resource-arduino-reference"}'::jsonb,
    title_ar = 'مرجع لغة أردوينو الرسمي'
WHERE id = 'iot-lab-resource-arduino-reference'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Blynk IoT Platform',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://blynk.io/", "description": "منصة لإنشاء واجهات تحكم للهواتف المحمولة للتحكم بمشاريع إنترنت الأشياء.", "slug": "iot-lab-resource-blynk"}'::jsonb,
    title_ar = 'تطبيق ومنصة Blynk'
WHERE id = 'iot-lab-resource-blynk'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Circuit Basics',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.circuitbasics.com/", "description": "موقع تعليمي ممتاز يقدم شروحات مبسطة لتوصيل وبناء الدوائر الإلكترونية.", "slug": "iot-lab-resource-circuit-basics"}'::jsonb,
    title_ar = 'أساسيات الدوائر الإلكترونية'
WHERE id = 'iot-lab-resource-circuit-basics'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'CircuitPython',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://circuitpython.org/", "description": "تفرع من مايكروبايثون موجه للمبتدئين ومدعوم بشكل كبير من Adafruit.", "slug": "iot-lab-resource-circuitpython"}'::jsonb,
    title_ar = 'سيركت بايثون'
WHERE id = 'iot-lab-resource-circuitpython'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Datasheets',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.alldatasheet.com/", "description": "موقع يوفر أوراق البيانات التقنية الرسمية للمكونات الإلكترونية، والتي تعد ضرورية لمعرفة خصائص الجهد والتيار لأي شريحة.", "slug": "iot-lab-resource-datasheet-catalog"}'::jsonb,
    title_ar = 'دليل أوراق البيانات (Datasheets)'
WHERE id = 'iot-lab-resource-datasheet-catalog'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Esp32 Datasheet',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.espressif.com/en/products/socs/esp32", "description": "المعلومات التقنية الرسمية والمواصفات الكاملة لمتحكم ESP32.", "slug": "iot-lab-resource-esp32-datasheet"}'::jsonb,
    title_ar = 'ورقة بيانات ESP32'
WHERE id = 'iot-lab-resource-esp32-datasheet'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'ESP-IDF Programming Guide',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/", "description": "التوثيق الرسمي لإطار عمل تطوير إنترنت الأشياء من Espressif.", "slug": "iot-lab-resource-esp32-idf-docs"}'::jsonb,
    title_ar = 'توثيق ESP-IDF للوحة ESP32'
WHERE id = 'iot-lab-resource-esp32-idf-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'ESPHome',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://esphome.io/", "description": "نظام لإنشاء أجهزة ذكية مخصصة تتكامل بسهولة مع Home Assistant.", "slug": "iot-lab-resource-esphome"}'::jsonb,
    title_ar = 'نظام ESPHome'
WHERE id = 'iot-lab-resource-esphome'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Fritzing Software',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://fritzing.org/", "description": "برنامج مفتوح المصدر لتصميم الدوائر الإلكترونية على ألواح التجارب بشكل مرئي.", "slug": "iot-lab-resource-fritzing-software"}'::jsonb,
    title_ar = 'برنامج فريتزينج'
WHERE id = 'iot-lab-resource-fritzing-software'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Fritzing',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://fritzing.org/", "description": "أداة مفتوحة المصدر لتصميم ورسم وتوثيق الدوائر الإلكترونية للمبتدئين.", "slug": "iot-lab-resource-fritzing"}'::jsonb,
    title_ar = 'برنامج فريتزينج لتصميم الدوائر'
WHERE id = 'iot-lab-resource-fritzing'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Home Assistant',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.home-assistant.io/", "description": "نظام تشغيل مركزي مفتوح المصدر للتحكم في الأجهزة المنزلية الذكية.", "slug": "iot-lab-resource-home-assistant"}'::jsonb,
    title_ar = 'المساعد المنزلي (Home Assistant)'
WHERE id = 'iot-lab-resource-home-assistant'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Instructables Circuits',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.instructables.com/circuits/", "description": "آلاف المشاريع الإلكترونية المرفوعة من قبل مجتمع الصُناع (Makers).", "slug": "iot-lab-resource-instructables-circuits"}'::jsonb,
    title_ar = 'قسم الدوائر في Instructables'
WHERE id = 'iot-lab-resource-instructables-circuits'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Micropython Guide',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://micropython.org/", "description": "الموقع الرسمي لمايكروبايثون، لغة البايثون المخصصة للعمل على المتحكمات الدقيقة.", "slug": "iot-lab-resource-micropython-guide"}'::jsonb,
    title_ar = 'دليل مايكروبايثون'
WHERE id = 'iot-lab-resource-micropython-guide'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'MicroPython',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://micropython.org/", "description": "نسخة مصغرة من لغة بايثون مصممة للعمل على المتحكمات الدقيقة.", "slug": "iot-lab-resource-micropython"}'::jsonb,
    title_ar = 'مايكروبايثون'
WHERE id = 'iot-lab-resource-micropython'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Eclipse Mosquitto',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://mosquitto.org/", "description": "وسيط رسائل مفتوح المصدر يدعم بروتوكول MQTT.", "slug": "iot-lab-resource-mosquitto"}'::jsonb,
    title_ar = 'وسيط إكليبس موسكيتو (Eclipse Mosquitto)'
WHERE id = 'iot-lab-resource-mosquitto'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'MQTT.org',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT يحتوي على المواصفات والتوثيق.", "slug": "iot-lab-resource-mqtt-org"}'::jsonb,
    title_ar = 'الموقع الرسمي لبروتوكول MQTT'
WHERE id = 'iot-lab-resource-mqtt-org'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Mqtt Spec',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://mqtt.org/", "description": "الموقع الرسمي لبروتوكول MQTT الذي يحتوي على التعريفات وآليات العمل.", "slug": "iot-lab-resource-mqtt-spec"}'::jsonb,
    title_ar = 'مواصفات بروتوكول MQTT'
WHERE id = 'iot-lab-resource-mqtt-spec'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Raspberry Pi Pinout',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://pinout.xyz/", "description": "دليل تفاعلي يوضح وظائف منافذ GPIO الخاصة بجميع إصدارات راسبيري باي.", "slug": "iot-lab-resource-pinout-xyz"}'::jsonb,
    title_ar = 'دليل منافذ راسبيري باي'
WHERE id = 'iot-lab-resource-pinout-xyz'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Random Nerd Tutorials',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://randomnerdtutorials.com/", "description": "موقع ممتاز للمشاريع المتقدمة الخاصة بلوحات ESP32 و ESP8266.", "slug": "iot-lab-resource-random-nerd-tutorials"}'::jsonb,
    title_ar = 'شروحات Random Nerd Tutorials'
WHERE id = 'iot-lab-resource-random-nerd-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Raspberry Pi Documentation',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.raspberrypi.com/documentation/", "description": "أدلة المستخدم والتفاصيل التقنية لأجهزة ونظام تشغيل راسبيري باي.", "slug": "iot-lab-resource-raspberry-pi-docs"}'::jsonb,
    title_ar = 'توثيق راسبيري باي'
WHERE id = 'iot-lab-resource-raspberry-pi-docs'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Rpi Guide',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.raspberrypi.com/documentation/", "description": "الوثائق الرسمية لرازبري باي والتي تشمل الإعداد والبرمجة والمشاريع.", "slug": "iot-lab-resource-rpi-guide"}'::jsonb,
    title_ar = 'دليل البدء مع رازبري باي'
WHERE id = 'iot-lab-resource-rpi-guide'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'SparkFun Tutorials',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://learn.sparkfun.com/", "description": "دروس تعليمية تغطي أساسيات الإلكترونيات وحتى المشاريع المعقدة.", "slug": "iot-lab-resource-sparkfun-tutorials"}'::jsonb,
    title_ar = 'دروس سبارك فن'
WHERE id = 'iot-lab-resource-sparkfun-tutorials'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'ThingSpeak IoT Platform',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://thingspeak.com/", "description": "منصة لجمع وتحليل البيانات الخاصة بإنترنت الأشياء مدعومة من MATLAB.", "slug": "iot-lab-resource-thingspeak"}'::jsonb,
    title_ar = 'منصة ThingSpeak لإنترنت الأشياء'
WHERE id = 'iot-lab-resource-thingspeak'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Tinkercad Circuits',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية لمحاكاة دوائر الأردوينو والإلكترونيات الأساسية على المتصفح.", "slug": "iot-lab-resource-tinkercad-circuits-2"}'::jsonb,
    title_ar = 'محاكي الدوائر من Tinkercad'
WHERE id = 'iot-lab-resource-tinkercad-circuits-2'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Tinkercad Circuits',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://www.tinkercad.com/circuits", "description": "أداة مجانية من أوتوديسك لمحاكاة دوائر الأردوينو والإلكترونيات برمجياً قبل بنائها في الواقع، مما يحمي القطع من التلف.", "slug": "iot-lab-resource-tinkercad-circuits"}'::jsonb,
    title_ar = 'محاكي الدوائر Tinkercad'
WHERE id = 'iot-lab-resource-tinkercad-circuits'
AND status = 'draft';
UPDATE iot_resources
SET
    content_type = 'resource',
    title_en = 'Wokwi Simulator',
    portal_id = 'iot-lab',
    status = 'draft',
    data = '{"url": "https://wokwi.com/", "description": "محاكي إلكترونيات عبر الإنترنت يدعم الأردوينو و ESP32 ومايكروبايثون.", "slug": "iot-lab-resource-wokwi"}'::jsonb,
    title_ar = 'محاكي Wokwi'
WHERE id = 'iot-lab-resource-wokwi'
AND status = 'draft';


-- Table: language_glossary
-- Expected updates: 50

UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Accuracy',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "استخدام القواعد والمفردات بشكل صحيح.", "example": "Accuracy is important in formal writing.", "definition_ar": "استخدام القواعد والمفردات بشكل صحيح.", "slug": "language-glossary-accuracy"}'::jsonb,
    title_ar = 'الدقة'
WHERE id = 'language-glossary-accuracy'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Active Listening',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "التركيز الكامل على المتحدث لفهم المعنى وتفاصيل النطق.", "example": "Active listening improves comprehension.", "definition_ar": "التركيز الكامل على المتحدث لفهم المعنى وتفاصيل النطق.", "slug": "language-glossary-active-listening"}'::jsonb,
    title_ar = 'الاستماع النشط'
WHERE id = 'language-glossary-active-listening'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'AI Coach',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "استخدام الذكاء الاصطناعي لممارسة المحادثة وتلقي الملاحظات.", "example": "ChatGPT can act as an AI language coach.", "definition_ar": "استخدام الذكاء الاصطناعي لممارسة المحادثة وتلقي الملاحظات.", "slug": "language-glossary-ai-language-coach"}'::jsonb,
    title_ar = 'مدرب اللغة الذكي'
WHERE id = 'language-glossary-ai-language-coach'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR A1',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى المبتدئ في الإطار الأوروبي المرجعي.", "example": "I am a beginner.", "definition_ar": "المستوى المبتدئ في الإطار الأوروبي المرجعي.", "slug": "language-glossary-cefr-a1"}'::jsonb,
    title_ar = 'مستوى A1'
WHERE id = 'language-glossary-cefr-a1'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR A2',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى الأساسي.", "example": "I can understand simple sentences.", "definition_ar": "المستوى الأساسي.", "slug": "language-glossary-cefr-a2"}'::jsonb,
    title_ar = 'مستوى A2'
WHERE id = 'language-glossary-cefr-a2'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR B1',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى المتوسط.", "example": "I can describe experiences and events.", "definition_ar": "المستوى المتوسط.", "slug": "language-glossary-cefr-b1"}'::jsonb,
    title_ar = 'مستوى B1'
WHERE id = 'language-glossary-cefr-b1'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR B2',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى فوق المتوسط.", "example": "I can understand the main ideas of complex text.", "definition_ar": "المستوى فوق المتوسط.", "slug": "language-glossary-cefr-b2"}'::jsonb,
    title_ar = 'مستوى B2'
WHERE id = 'language-glossary-cefr-b2'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR C1',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى المتقدم.", "example": "I can express ideas fluently and spontaneously.", "definition_ar": "المستوى المتقدم.", "slug": "language-glossary-cefr-c1"}'::jsonb,
    title_ar = 'مستوى C1'
WHERE id = 'language-glossary-cefr-c1'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'CEFR C2',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المستوى المتقن.", "example": "I can understand with ease virtually everything heard or read.", "definition_ar": "المستوى المتقن.", "slug": "language-glossary-cefr-c2"}'::jsonb,
    title_ar = 'مستوى C2'
WHERE id = 'language-glossary-cefr-c2'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Chunking',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "تعلم العبارات ككتلة واحدة بدلاً من كلمات منفصلة.", "example": "Chunking helps you speak faster.", "definition_ar": "تعلم العبارات ككتلة واحدة بدلاً من كلمات منفصلة.", "slug": "language-glossary-chunking"}'::jsonb,
    title_ar = 'تجميع الكلمات'
WHERE id = 'language-glossary-chunking'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Collocation',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "كلمات تأتي معاً بشكل طبيعي في اللغة.", "example": "Make a mistake is a collocation.", "definition_ar": "كلمات تأتي معاً بشكل طبيعي في اللغة.", "slug": "language-glossary-collocation"}'::jsonb,
    title_ar = 'المتلازمات اللفظية'
WHERE id = 'language-glossary-collocation'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Comprehensible Input',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "نصوص أو مقاطع صوتية تفهم معظمها ولكن تحتوي على تحدي بسيط.", "example": "Reading graded readers is comprehensible input.", "definition_ar": "نصوص أو مقاطع صوتية تفهم معظمها ولكن تحتوي على تحدي بسيط.", "slug": "language-glossary-comprehensible-input"}'::jsonb,
    title_ar = 'المدخلات المفهومة'
WHERE id = 'language-glossary-comprehensible-input'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Fluency',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "القدرة على التحدث بسلاسة وبدون توقف متكرر.", "example": "She speaks English with great fluency.", "definition_ar": "القدرة على التحدث بسلاسة وبدون توقف متكرر.", "slug": "language-glossary-fluency"}'::jsonb,
    title_ar = 'الطلاقة'
WHERE id = 'language-glossary-fluency'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 1',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الإطار المرجعي الأوروبي المشترك للغات", "example": "يستخدم لتقييم مستوى اللغة.", "definition_ar": "الإطار المرجعي الأوروبي المشترك للغات", "slug": "language-glossary-glossary-1"}'::jsonb,
    title_ar = 'مصطلح Glossary 1'
WHERE id = 'language-glossary-glossary-1'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 10',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الدقة", "example": "استخدام اللغة بدون أخطاء.", "definition_ar": "الدقة", "slug": "language-glossary-glossary-10"}'::jsonb,
    title_ar = 'مصطلح Glossary 10'
WHERE id = 'language-glossary-glossary-10'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 11',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "مصطلح", "example": "تعبير لا يمكن فهمه من معاني الكلمات المنفردة.", "definition_ar": "مصطلح", "slug": "language-glossary-glossary-11"}'::jsonb,
    title_ar = 'مصطلح Glossary 11'
WHERE id = 'language-glossary-glossary-11'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 12',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "فعل مركب", "example": "فعل يتكون من فعل وحرف جر.", "definition_ar": "فعل مركب", "slug": "language-glossary-glossary-12"}'::jsonb,
    title_ar = 'مصطلح Glossary 12'
WHERE id = 'language-glossary-glossary-12'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 13',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "مرادف", "example": "كلمة لها نفس المعنى.", "definition_ar": "مرادف", "slug": "language-glossary-glossary-13"}'::jsonb,
    title_ar = 'مصطلح Glossary 13'
WHERE id = 'language-glossary-glossary-13'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 14',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "مضاد", "example": "كلمة لها معنى معاكس.", "definition_ar": "مضاد", "slug": "language-glossary-glossary-14"}'::jsonb,
    title_ar = 'مصطلح Glossary 14'
WHERE id = 'language-glossary-glossary-14'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 15',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "بادئة", "example": "حروف تضاف في بداية الكلمة.", "definition_ar": "بادئة", "slug": "language-glossary-glossary-15"}'::jsonb,
    title_ar = 'مصطلح Glossary 15'
WHERE id = 'language-glossary-glossary-15'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 16',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "لاحقة", "example": "حروف تضاف في نهاية الكلمة.", "definition_ar": "لاحقة", "slug": "language-glossary-glossary-16"}'::jsonb,
    title_ar = 'مصطلح Glossary 16'
WHERE id = 'language-glossary-glossary-16'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 17',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "مقطع لفظي", "example": "جزء من الكلمة يحتوي على صوت متحرك.", "definition_ar": "مقطع لفظي", "slug": "language-glossary-glossary-17"}'::jsonb,
    title_ar = 'مصطلح Glossary 17'
WHERE id = 'language-glossary-glossary-17'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 18',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "حرف متحرك", "example": "الحروف a, e, i, o, u.", "definition_ar": "حرف متحرك", "slug": "language-glossary-glossary-18"}'::jsonb,
    title_ar = 'مصطلح Glossary 18'
WHERE id = 'language-glossary-glossary-18'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 19',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "حرف ساكن", "example": "باقي الحروف الأبجدية.", "definition_ar": "حرف ساكن", "slug": "language-glossary-glossary-19"}'::jsonb,
    title_ar = 'مصطلح Glossary 19'
WHERE id = 'language-glossary-glossary-19'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 2',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "المفردات", "example": "زيادة المفردات تساعد في التحدث بطلاقة.", "definition_ar": "المفردات", "slug": "language-glossary-glossary-2"}'::jsonb,
    title_ar = 'مصطلح Glossary 2'
WHERE id = 'language-glossary-glossary-2'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 20',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "التنغيم", "example": "ارتفاع وانخفاض الصوت عند التحدث.", "definition_ar": "التنغيم", "slug": "language-glossary-glossary-20"}'::jsonb,
    title_ar = 'مصطلح Glossary 20'
WHERE id = 'language-glossary-glossary-20'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 3',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "القواعد", "example": "القواعد السليمة تمنع سوء الفهم.", "definition_ar": "القواعد", "slug": "language-glossary-glossary-3"}'::jsonb,
    title_ar = 'مصطلح Glossary 3'
WHERE id = 'language-glossary-glossary-3'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 4',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "النطق", "example": "النطق الصحيح يسهل التواصل.", "definition_ar": "النطق", "slug": "language-glossary-glossary-4"}'::jsonb,
    title_ar = 'مصطلح Glossary 4'
WHERE id = 'language-glossary-glossary-4'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 5',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الاستماع", "example": "مهارة أساسية لفهم المتحدثين الأصليين.", "definition_ar": "الاستماع", "slug": "language-glossary-glossary-5"}'::jsonb,
    title_ar = 'مصطلح Glossary 5'
WHERE id = 'language-glossary-glossary-5'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 6',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "التحدث", "example": "التدرب على التحدث يوميا يحسن الثقة.", "definition_ar": "التحدث", "slug": "language-glossary-glossary-6"}'::jsonb,
    title_ar = 'مصطلح Glossary 6'
WHERE id = 'language-glossary-glossary-6'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 7',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الكتابة", "example": "كتابة فقرات واضحة مهارة مهمة.", "definition_ar": "الكتابة", "slug": "language-glossary-glossary-7"}'::jsonb,
    title_ar = 'مصطلح Glossary 7'
WHERE id = 'language-glossary-glossary-7'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 8',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "القراءة", "example": "قراءة المقالات الإنجليزية توسع المدارك.", "definition_ar": "القراءة", "slug": "language-glossary-glossary-8"}'::jsonb,
    title_ar = 'مصطلح Glossary 8'
WHERE id = 'language-glossary-glossary-8'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Glossary 9',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الطلاقة", "example": "القدرة على التحدث بسهولة ودون توقف.", "definition_ar": "الطلاقة", "slug": "language-glossary-glossary-9"}'::jsonb,
    title_ar = 'مصطلح Glossary 9'
WHERE id = 'language-glossary-glossary-9'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Grammar In Context',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "فهم القواعد من خلال النصوص والاستخدام الفعلي.", "example": "Read stories to learn grammar in context.", "definition_ar": "فهم القواعد من خلال النصوص والاستخدام الفعلي.", "slug": "language-glossary-grammar-in-context"}'::jsonb,
    title_ar = 'القواعد في السياق'
WHERE id = 'language-glossary-grammar-in-context'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Idiom',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "تعبير لا يمكن فهم معناه من الكلمات الفردية.", "example": "It''s raining cats and dogs.", "definition_ar": "تعبير لا يمكن فهم معناه من الكلمات الفردية.", "slug": "language-glossary-idiom"}'::jsonb,
    title_ar = 'المصطلح'
WHERE id = 'language-glossary-idiom'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Immersion',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "إحاطة نفسك باللغة الهدف في كل جوانب حياتك.", "example": "Immersion accelerates learning.", "definition_ar": "إحاطة نفسك باللغة الهدف في كل جوانب حياتك.", "slug": "language-glossary-immersion"}'::jsonb,
    title_ar = 'الانغماس'
WHERE id = 'language-glossary-immersion'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Intonation',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "ارتفاع وانخفاض الصوت أثناء الكلام للتعبير عن المعنى أو المشاعر.", "example": "A rising intonation is used for questions.", "definition_ar": "ارتفاع وانخفاض الصوت أثناء الكلام للتعبير عن المعنى أو المشاعر.", "slug": "language-glossary-intonation"}'::jsonb,
    title_ar = 'التنغيم'
WHERE id = 'language-glossary-intonation'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Acquisition',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "التعلم الطبيعي واللاواعي للغة.", "example": "Children show rapid language acquisition.", "definition_ar": "التعلم الطبيعي واللاواعي للغة.", "slug": "language-glossary-language-acquisition"}'::jsonb,
    title_ar = 'اكتساب اللغة'
WHERE id = 'language-glossary-language-acquisition'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Exchange',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "ممارسة اللغة مع متحدث أصلي يتعلم لغتك.", "example": "I met a language exchange partner online.", "definition_ar": "ممارسة اللغة مع متحدث أصلي يتعلم لغتك.", "slug": "language-glossary-language-exchange"}'::jsonb,
    title_ar = 'تبادل اللغات'
WHERE id = 'language-glossary-language-exchange'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Learning',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الدراسة الواعية للقواعد والمفردات.", "example": "Language learning requires active effort.", "definition_ar": "الدراسة الواعية للقواعد والمفردات.", "slug": "language-glossary-language-learning"}'::jsonb,
    title_ar = 'تعلم اللغة'
WHERE id = 'language-glossary-language-learning'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Minimal Pairs',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "كلمتان تختلفان في صوت واحد فقط، تستخدم للتدريب على النطق.", "example": "Ship and sheep are minimal pairs.", "definition_ar": "كلمتان تختلفان في صوت واحد فقط، تستخدم للتدريب على النطق.", "slug": "language-glossary-minimal-pairs"}'::jsonb,
    title_ar = 'الأزواج الدنيا'
WHERE id = 'language-glossary-minimal-pairs'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Mother Tongue Interference',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "تأثير قواعد ونطق اللغة الأم على اللغة المتعلمة.", "example": "Translating directly causes mother tongue interference.", "definition_ar": "تأثير قواعد ونطق اللغة الأم على اللغة المتعلمة.", "slug": "language-glossary-mother-tongue-interference"}'::jsonb,
    title_ar = 'تأثير اللغة الأم'
WHERE id = 'language-glossary-mother-tongue-interference'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Passive Listening',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "الاستماع للغة في الخلفية دون تركيز كامل.", "example": "Passive listening helps get used to the sounds.", "definition_ar": "الاستماع للغة في الخلفية دون تركيز كامل.", "slug": "language-glossary-passive-listening"}'::jsonb,
    title_ar = 'الاستماع السلبي'
WHERE id = 'language-glossary-passive-listening'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Phrasal Verb',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "فعل يتكون من فعل وحرف جر أو حال يغير معناه.", "example": "Give up means to stop trying.", "definition_ar": "فعل يتكون من فعل وحرف جر أو حال يغير معناه.", "slug": "language-glossary-phrasal-verb"}'::jsonb,
    title_ar = 'الفعل المركب'
WHERE id = 'language-glossary-phrasal-verb'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Pronunciation',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "طريقة إخراج الأصوات في اللغة.", "example": "Good pronunciation makes you understood.", "definition_ar": "طريقة إخراج الأصوات في اللغة.", "slug": "language-glossary-pronunciation"}'::jsonb,
    title_ar = 'النطق'
WHERE id = 'language-glossary-pronunciation'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Self Correction',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "ملاحظة وتصحيح أخطائك أثناء التحدث أو الكتابة.", "example": "Self-correction is a sign of progress.", "definition_ar": "ملاحظة وتصحيح أخطائك أثناء التحدث أو الكتابة.", "slug": "language-glossary-self-correction"}'::jsonb,
    title_ar = 'التصحيح الذاتي'
WHERE id = 'language-glossary-self-correction'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Shadowing',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "تقنية استماع وتكرار فوري لتحسين النطق والإيقاع.", "example": "Shadowing helps with pronunciation.", "definition_ar": "تقنية استماع وتكرار فوري لتحسين النطق والإيقاع.", "slug": "language-glossary-shadowing"}'::jsonb,
    title_ar = 'التظليل (Shadowing)'
WHERE id = 'language-glossary-shadowing'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Spaced Repetition',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "نظام مراجعة المفردات على فترات متباعدة لتثبيتها في الذاكرة.", "example": "Anki uses spaced repetition.", "definition_ar": "نظام مراجعة المفردات على فترات متباعدة لتثبيتها في الذاكرة.", "slug": "language-glossary-spaced-repetition"}'::jsonb,
    title_ar = 'التكرار المتباعد'
WHERE id = 'language-glossary-spaced-repetition'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Stress',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "التشديد على مقطع معين في الكلمة أو كلمة في الجملة.", "example": "In ''record'', the stress is on the first syllable for the noun.", "definition_ar": "التشديد على مقطع معين في الكلمة أو كلمة في الجملة.", "slug": "language-glossary-stress"}'::jsonb,
    title_ar = 'النبر'
WHERE id = 'language-glossary-stress'
AND status = 'draft';
UPDATE language_glossary
SET
    content_type = 'glossary',
    title_en = 'Vocabulary In Context',
    portal_id = 'language',
    status = 'draft',
    data = '{"definition": "تعلم الكلمات من خلال الجمل والمواقف وليس القوائم المنعزلة.", "example": "Learning vocabulary in context is more effective.", "definition_ar": "تعلم الكلمات من خلال الجمل والمواقف وليس القوائم المنعزلة.", "slug": "language-glossary-vocabulary-in-context"}'::jsonb,
    title_ar = 'المفردات في السياق'
WHERE id = 'language-glossary-vocabulary-in-context'
AND status = 'draft';


-- Table: language_lessons
-- Expected updates: 20

UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Active vs. Passive Listening',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-active-vs-passive-listening", "excerpt_ar": "الفرق بين النوعين وكيف توظف كل منهما لرفع كفاءة فهمك للمسموع."}'::jsonb,
    title_ar = 'الاستماع النشط مقابل السلبي'
WHERE id = 'language-lesson-active-vs-passive-listening'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Effective Conversation Practice',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-conversation-practice", "excerpt_ar": "كيف تجد شركاء لغة وكيف تدير محادثة ناجحة لتعظيم الاستفادة."}'::jsonb,
    title_ar = 'التدريب الفعال على المحادثة'
WHERE id = 'language-lesson-conversation-practice'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Learning Grammar in Context',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-grammar-in-context-2", "excerpt_ar": "توقف عن حفظ القواعد وابدأ في استيعابها من خلال القراءة والاستماع."}'::jsonb,
    title_ar = 'تعلم القواعد من السياق'
WHERE id = 'language-lesson-grammar-in-context-2'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'How to Start Speaking with Confidence',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-how-to-start-speaking", "excerpt_ar": "نصائح عملية للتغلب على حاجز الخوف والبدء بالمحادثة فوراً."}'::jsonb,
    title_ar = 'كيف تبدأ التحدث بثقة'
WHERE id = 'language-lesson-how-to-start-speaking'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'English for Job Interviews',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-interview-english", "excerpt_ar": "أهم العبارات والأسئلة الشائعة في مقابلات العمل وكيفية الإجابة عنها بثقة."}'::jsonb,
    title_ar = 'لغة المقابلات الشخصية'
WHERE id = 'language-lesson-interview-english'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Introduction to CEFR Levels',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-introduction-to-cefr", "excerpt_ar": "شرح تفصيلي لمستويات اللغة الأوروبية المرجعية وكيف تحدد مستواك."}'::jsonb,
    title_ar = 'مقدمة عن مستويات CEFR'
WHERE id = 'language-lesson-introduction-to-cefr'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 1',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-1", "excerpt_ar": "مرحباً بك في هذا الدرس حول مقدمة إلى مستويات CEFR."}'::jsonb,
    title_ar = 'مقدمة إلى مستويات CEFR'
WHERE id = 'language-lesson-lesson-1'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 2',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-2", "excerpt_ar": "مرحباً بك في هذا الدرس حول أساسيات المحادثة."}'::jsonb,
    title_ar = 'أساسيات المحادثة'
WHERE id = 'language-lesson-lesson-2'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 3',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-3", "excerpt_ar": "مرحباً بك في هذا الدرس حول كيف تكتب فقرة إنجليزية واضحة."}'::jsonb,
    title_ar = 'كيف تكتب فقرة إنجليزية واضحة'
WHERE id = 'language-lesson-lesson-3'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 4',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-4", "excerpt_ar": "مرحباً بك في هذا الدرس حول تحسين مهارة الاستماع."}'::jsonb,
    title_ar = 'تحسين مهارة الاستماع'
WHERE id = 'language-lesson-lesson-4'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 5',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-5", "excerpt_ar": "مرحباً بك في هذا الدرس حول نظام فعال لحفظ المفردات."}'::jsonb,
    title_ar = 'نظام فعال لحفظ المفردات'
WHERE id = 'language-lesson-lesson-5'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Lesson 6',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-lesson-6", "excerpt_ar": "مرحباً بك في هذا الدرس حول الذكاء الاصطناعي كمدرب لغوي."}'::jsonb,
    title_ar = 'الذكاء الاصطناعي كمدرب لغوي'
WHERE id = 'language-lesson-lesson-6'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Mastering the Shadowing Technique',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-mastering-shadowing", "excerpt_ar": "خطوات عملية لاستخدام تقنية التظليل لتحسين النطق بشكل جذري."}'::jsonb,
    title_ar = 'إتقان تقنية التظليل'
WHERE id = 'language-lesson-mastering-shadowing'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Perfecting Pronunciation and Sounds',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-perfecting-pronunciation", "excerpt_ar": "التركيز على الأصوات الصعبة للناطقين بالعربية وتدريبات للتغلب عليها."}'::jsonb,
    title_ar = 'تحسين النطق والأصوات'
WHERE id = 'language-lesson-perfecting-pronunciation'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Self-Correction Techniques',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-self-correction-techniques", "excerpt_ar": "كيف تلاحظ أخطاءك أثناء الكلام وتصححها لتحسين دقة لغتك."}'::jsonb,
    title_ar = 'تقنيات التصحيح الذاتي'
WHERE id = 'language-lesson-self-correction-techniques'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Stop Translating in Your Head',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-stop-translating", "excerpt_ar": "استراتيجيات للتفكير باللغة الإنجليزية مباشرة بدلاً من الترجمة من العربية."}'::jsonb,
    title_ar = 'توقف عن الترجمة في عقلك'
WHERE id = 'language-lesson-stop-translating'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Using AI as a Language Coach',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-using-ai-coaches", "excerpt_ar": "طرق فعالة لاستخدام ChatGPT وأدوات الذكاء الاصطناعي لتحسين لغتك."}'::jsonb,
    title_ar = 'استخدام الذكاء الاصطناعي كمدرب'
WHERE id = 'language-lesson-using-ai-coaches'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Building an Effective Vocabulary System',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-vocabulary-systems", "excerpt_ar": "كيفية استخدام تطبيقات مثل Anki لتذكر الكلمات للأبد."}'::jsonb,
    title_ar = 'بناء نظام فعال للمفردات'
WHERE id = 'language-lesson-vocabulary-systems'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Weekly Progress Tracking',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-weekly-progress-tracking", "excerpt_ar": "كيفية قياس تطورك في اللغة الإنجليزية بشكل دوري وموضوعي."}'::jsonb,
    title_ar = 'تتبع التقدم الأسبوعي'
WHERE id = 'language-lesson-weekly-progress-tracking'
AND status = 'draft';
UPDATE language_lessons
SET
    content_type = 'lesson',
    title_en = 'Writing Clear English Paragraphs',
    portal_id = 'language',
    status = 'draft',
    data = '{"slug": "language-lesson-writing-clear-paragraphs", "excerpt_ar": "أساسيات كتابة جمل صحيحة وربطها لتكوين فقرة متماسكة."}'::jsonb,
    title_ar = 'كتابة فقرات إنجليزية واضحة'
WHERE id = 'language-lesson-writing-clear-paragraphs'
AND status = 'draft';


-- Table: language_prompts
-- Expected updates: 30

UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Accent Coach',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "What are the differences in pronouncing [الكلمة] in US vs UK English?", "instructions": "التعرف على الفروق بين اللهجات المختلفة.", "prompt_text_ar": "What are the differences in pronouncing [الكلمة] in US vs UK English?", "slug": "language-prompt-accent-coach"}'::jsonb,
    title_ar = 'مدرب اللهجات'
WHERE id = 'language-prompt-accent-coach'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Cultural Context',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Explain the cultural context behind the phrase [العبارة].", "instructions": "فهم الفروق الثقافية في اللغة.", "prompt_text_ar": "Explain the cultural context behind the phrase [العبارة].", "slug": "language-prompt-cultural-context"}'::jsonb,
    title_ar = 'السياق الثقافي'
WHERE id = 'language-prompt-cultural-context'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Daily Journal',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Review my daily journal entry and suggest better vocabulary: [اليوميات].", "instructions": "تحسين كتابتك اليومية وتطوير أسلوبك.", "prompt_text_ar": "Review my daily journal entry and suggest better vocabulary: [اليوميات].", "slug": "language-prompt-daily-journal"}'::jsonb,
    title_ar = 'يومياتي'
WHERE id = 'language-prompt-daily-journal'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Debate Opponent',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Argue against my opinion on [الموضوع]. My opinion is [رأيي].", "instructions": "طور مهارات الإقناع والمناقشة بالإنجليزية.", "prompt_text_ar": "Argue against my opinion on [الموضوع]. My opinion is [رأيي].", "slug": "language-prompt-debate-opponent"}'::jsonb,
    title_ar = 'خصم للمناظرة'
WHERE id = 'language-prompt-debate-opponent'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Email Drafter',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Help me draft a professional email about [الموضوع] to [المتلقي].", "instructions": "صياغة رسائل بريد إلكتروني احترافية.", "prompt_text_ar": "Help me draft a professional email about [الموضوع] to [المتلقي].", "slug": "language-prompt-email-drafter"}'::jsonb,
    title_ar = 'صائغ الإيميلات'
WHERE id = 'language-prompt-email-drafter'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Grammar Checker',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Correct my grammar and explain the mistakes: [النص].", "instructions": "اكتب نصك ليتم تصحيحه مع الشرح.", "prompt_text_ar": "Correct my grammar and explain the mistakes: [النص].", "slug": "language-prompt-grammar-checker"}'::jsonb,
    title_ar = 'مصحح القواعد'
WHERE id = 'language-prompt-grammar-checker'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Idiom Explainer',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Explain the idiom [المصطلح] and give 3 examples.", "instructions": "فهم المصطلحات الإنجليزية وكيفية استخدامها.", "prompt_text_ar": "Explain the idiom [المصطلح] and give 3 examples.", "slug": "language-prompt-idiom-explainer"}'::jsonb,
    title_ar = 'شارح المصطلحات'
WHERE id = 'language-prompt-idiom-explainer'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Listening Comprehension',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Write a short dialogue about [الموضوع] and generate 3 comprehension questions.", "instructions": "تدريب على الفهم من خلال نصوص قصيرة.", "prompt_text_ar": "Write a short dialogue about [الموضوع] and generate 3 comprehension questions.", "slug": "language-prompt-listening-comprehension"}'::jsonb,
    title_ar = 'فهم المسموع'
WHERE id = 'language-prompt-listening-comprehension'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Paragraph Improver',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Rewrite this paragraph to make it sound more natural and professional: [الفقرة].", "instructions": "تحسين صياغة فقراتك لتصبح طبيعية أكثر.", "prompt_text_ar": "Rewrite this paragraph to make it sound more natural and professional: [الفقرة].", "slug": "language-prompt-paragraph-improver"}'::jsonb,
    title_ar = 'محسن الفقرات'
WHERE id = 'language-prompt-paragraph-improver'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Phrasal Verb Story',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Write a story focusing on phrasal verbs related to [الموضوع].", "instructions": "تعلم الأفعال المركبة من خلال سياق قصصي.", "prompt_text_ar": "Write a story focusing on phrasal verbs related to [الموضوع].", "slug": "language-prompt-phrasal-verb-story"}'::jsonb,
    title_ar = 'قصة الأفعال المركبة'
WHERE id = 'language-prompt-phrasal-verb-story'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Presentation Prep',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Give me feedback on the opening of my presentation: [مقدمة العرض].", "instructions": "تدرب على إلقاء العروض التقديمية.", "prompt_text_ar": "Give me feedback on the opening of my presentation: [مقدمة العرض].", "slug": "language-prompt-presentation-prep"}'::jsonb,
    title_ar = 'التحضير للعروض'
WHERE id = 'language-prompt-presentation-prep'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 1',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "قم بدور متحدث أصلي للغة الإنجليزية.", "instructions": "ابدأ المحادثة بسؤال بسيط عن يومي.", "prompt_text_ar": "قم بدور متحدث أصلي للغة الإنجليزية.", "slug": "language-prompt-prompt-1"}'::jsonb,
    title_ar = 'ممارسة المحادثة اليومية'
WHERE id = 'language-prompt-prompt-1'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 10',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "أعطني كلمات عشوائية لأكون منها جملاً.", "instructions": "قم بتصحيح الجمل التي أكتبها.", "prompt_text_ar": "أعطني كلمات عشوائية لأكون منها جملاً.", "slug": "language-prompt-prompt-10"}'::jsonb,
    title_ar = 'تكوين الجمل'
WHERE id = 'language-prompt-prompt-10'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 2',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "قم بتصحيح الأخطاء النحوية في النص.", "instructions": "اشرح سبب كل خطأ وكيفية تصحيحه.", "prompt_text_ar": "قم بتصحيح الأخطاء النحوية في النص.", "slug": "language-prompt-prompt-2"}'::jsonb,
    title_ar = 'تدقيق القواعد'
WHERE id = 'language-prompt-prompt-2'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 3',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اقترح كلمات بديلة ومتقدمة.", "instructions": "استبدل الكلمات البسيطة بمرادفاتها المناسبة.", "prompt_text_ar": "اقترح كلمات بديلة ومتقدمة.", "slug": "language-prompt-prompt-3"}'::jsonb,
    title_ar = 'توسيع المفردات'
WHERE id = 'language-prompt-prompt-3'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 4',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اطرح أسئلة مقابلة عمل باللغة الإنجليزية.", "instructions": "انتظر إجابتي ثم قدم ملاحظاتك.", "prompt_text_ar": "اطرح أسئلة مقابلة عمل باللغة الإنجليزية.", "slug": "language-prompt-prompt-4"}'::jsonb,
    title_ar = 'محاكاة مقابلة عمل'
WHERE id = 'language-prompt-prompt-4'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 5',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اكتب فقرة قصيرة ثم اطرح أسئلة حولها.", "instructions": "تأكد من تنوع الأسئلة لاختبار الفهم.", "prompt_text_ar": "اكتب فقرة قصيرة ثم اطرح أسئلة حولها.", "slug": "language-prompt-prompt-5"}'::jsonb,
    title_ar = 'التدريب على الاستماع'
WHERE id = 'language-prompt-prompt-5'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 6',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اشرح المصطلح الإنجليزي المعطى.", "instructions": "قدم أمثلة على كيفية استخدامه في جمل مفيدة.", "prompt_text_ar": "اشرح المصطلح الإنجليزي المعطى.", "slug": "language-prompt-prompt-6"}'::jsonb,
    title_ar = 'شرح المصطلحات'
WHERE id = 'language-prompt-prompt-6'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 7',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "قم بتقييم مقالي الأكاديمي.", "instructions": "ركز على بنية الجملة والترابط بين الأفكار.", "prompt_text_ar": "قم بتقييم مقالي الأكاديمي.", "slug": "language-prompt-prompt-7"}'::jsonb,
    title_ar = 'ممارسة الكتابة الأكاديمية'
WHERE id = 'language-prompt-prompt-7'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 8',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اقترح كلمات إنجليزية صعبة النطق.", "instructions": "اكتبها مع طريقة نطقها الصحيحة.", "prompt_text_ar": "اقترح كلمات إنجليزية صعبة النطق.", "slug": "language-prompt-prompt-8"}'::jsonb,
    title_ar = 'تحسين النطق'
WHERE id = 'language-prompt-prompt-8'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Prompt 9',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "اشرح معنى الفعل المركب.", "instructions": "قدم ثلاثة أمثلة في سياقات مختلفة.", "prompt_text_ar": "اشرح معنى الفعل المركب.", "slug": "language-prompt-prompt-9"}'::jsonb,
    title_ar = 'تعلم الأفعال المركبة'
WHERE id = 'language-prompt-prompt-9'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Pronunciation Guide',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "How do I pronounce [الكلمة]? Describe the mouth movements.", "instructions": "تعلم النطق الصحيح للكلمات الصعبة.", "prompt_text_ar": "How do I pronounce [الكلمة]? Describe the mouth movements.", "slug": "language-prompt-pronunciation-guide"}'::jsonb,
    title_ar = 'دليل النطق'
WHERE id = 'language-prompt-pronunciation-guide'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Reading Summary',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Summarize this article in simple B1 level English: [المقال].", "instructions": "تبسيط المقالات لتناسب مستواك.", "prompt_text_ar": "Summarize this article in simple B1 level English: [المقال].", "slug": "language-prompt-reading-summary"}'::jsonb,
    title_ar = 'ملخص القراءة'
WHERE id = 'language-prompt-reading-summary'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Roleplay Interview',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Conduct a job interview in English for the position of [الوظيفة].", "instructions": "تدرب على مقابلات العمل باللغة الإنجليزية.", "prompt_text_ar": "Conduct a job interview in English for the position of [الوظيفة].", "slug": "language-prompt-roleplay-interview"}'::jsonb,
    title_ar = 'محاكاة مقابلة عمل'
WHERE id = 'language-prompt-roleplay-interview'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Slang Translator',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Translate this slang phrase into formal English: [العبارة].", "instructions": "تعرف على العامية وما يقابلها رسمياً.", "prompt_text_ar": "Translate this slang phrase into formal English: [العبارة].", "slug": "language-prompt-slang-translator"}'::jsonb,
    title_ar = 'مترجم العامية'
WHERE id = 'language-prompt-slang-translator'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Small Talk',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Let''s practice small talk. Start a conversation about [الموضوع].", "instructions": "التدرب على المحادثات الخفيفة في المواقف الاجتماعية.", "prompt_text_ar": "Let''s practice small talk. Start a conversation about [الموضوع].", "slug": "language-prompt-small-talk"}'::jsonb,
    title_ar = 'أحاديث عابرة'
WHERE id = 'language-prompt-small-talk'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Speaking Partner',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Act as an English speaking partner. Ask me questions about [الموضوع].", "instructions": "تحدث مع الذكاء الاصطناعي كشريك محادثة.", "prompt_text_ar": "Act as an English speaking partner. Ask me questions about [الموضوع].", "slug": "language-prompt-speaking-partner"}'::jsonb,
    title_ar = 'شريك محادثة'
WHERE id = 'language-prompt-speaking-partner'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Story Generator',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Write a short story using these vocabulary words: [الكلمات].", "instructions": "قصص قصيرة لتثبيت الكلمات الجديدة.", "prompt_text_ar": "Write a short story using these vocabulary words: [الكلمات].", "slug": "language-prompt-story-generator"}'::jsonb,
    title_ar = 'مولد القصص'
WHERE id = 'language-prompt-story-generator'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Translation Corrector',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "I translated this from Arabic: [الترجمة]. How would a native speaker say it?", "instructions": "تجنب الترجمة الحرفية وتحدث كأصحاب اللغة.", "prompt_text_ar": "I translated this from Arabic: [الترجمة]. How would a native speaker say it?", "slug": "language-prompt-translation-corrector"}'::jsonb,
    title_ar = 'مصحح الترجمة'
WHERE id = 'language-prompt-translation-corrector'
AND status = 'draft';
UPDATE language_prompts
SET
    content_type = 'prompt',
    title_en = 'Vocabulary Expander',
    portal_id = 'language',
    status = 'draft',
    data = '{"prompt_text": "Give me 5 synonyms and antonyms for [الكلمة] with example sentences.", "instructions": "احصل على مرادفات وأضداد للكلمات.", "prompt_text_ar": "Give me 5 synonyms and antonyms for [الكلمة] with example sentences.", "slug": "language-prompt-vocabulary-expander"}'::jsonb,
    title_ar = 'موسع المفردات'
WHERE id = 'language-prompt-vocabulary-expander'
AND status = 'draft';


-- Table: language_resources
-- Expected updates: 30

UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Anki',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://apps.ankiweb.net/", "description": "برنامج لإنشاء بطاقات استذكار ذكية.", "slug": "language-resource-anki"}'::jsonb,
    title_ar = 'أنكي'
WHERE id = 'language-resource-anki'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Bbc Learning English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.bbc.co.uk/learningenglish", "description": "مصدر ممتاز للدروس الصوتية والمرئية.", "slug": "language-resource-bbc-learning-english"}'::jsonb,
    title_ar = 'بي بي سي لتعلم الإنجليزية'
WHERE id = 'language-resource-bbc-learning-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Breaking News English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://breakingnewsenglish.com/", "description": "دروس مبنية على الأخبار بمستويات قراءة متعددة.", "slug": "language-resource-breaking-news-english"}'::jsonb,
    title_ar = 'أخبار إنجليزية مبسطة'
WHERE id = 'language-resource-breaking-news-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'British Council',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://learnenglish.britishcouncil.org/", "description": "دروس وتدريبات لكافة المستويات.", "slug": "language-resource-british-council"}'::jsonb,
    title_ar = 'المجلس الثقافي البريطاني'
WHERE id = 'language-resource-british-council'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Cambridge Dictionary',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://dictionary.cambridge.org/", "description": "قاموس شامل مع أمثلة ونطق.", "slug": "language-resource-cambridge-dictionary"}'::jsonb,
    title_ar = 'قاموس كامبريدج'
WHERE id = 'language-resource-cambridge-dictionary'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Coursera English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.coursera.org/courses?query=english", "description": "دورات أكاديمية لتحسين اللغة.", "slug": "language-resource-coursera-english"}'::jsonb,
    title_ar = 'كورسيرا للإنجليزية'
WHERE id = 'language-resource-coursera-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Duolingo',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.duolingo.com/", "description": "تطبيق مشهور للتدريب اليومي.", "slug": "language-resource-duolingo"}'::jsonb,
    title_ar = 'دوولينجو'
WHERE id = 'language-resource-duolingo'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Elllo',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://elllo.org/", "description": "مكتبة ضخمة لمقاطع الاستماع مع نصوص.", "slug": "language-resource-elllo"}'::jsonb,
    title_ar = 'مكتبة الاستماع'
WHERE id = 'language-resource-elllo'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'English Club',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.englishclub.com/", "description": "موارد شاملة للقواعد والمفردات والمنتديات.", "slug": "language-resource-english-club"}'::jsonb,
    title_ar = 'نادي الإنجليزية'
WHERE id = 'language-resource-english-club'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Engvid',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.engvid.com/", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة.", "slug": "language-resource-engvid"}'::jsonb,
    title_ar = 'إنج فيد'
WHERE id = 'language-resource-engvid'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Esl Lab',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.esl-lab.com/", "description": "اختبارات استماع مسجلة بمستويات مختلفة.", "slug": "language-resource-esl-lab"}'::jsonb,
    title_ar = 'مختبر الاستماع'
WHERE id = 'language-resource-esl-lab'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Grammarly',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.grammarly.com/", "description": "أداة لتصحيح القواعد والكتابة.", "slug": "language-resource-grammarly"}'::jsonb,
    title_ar = 'جرامرلي'
WHERE id = 'language-resource-grammarly'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Memrise',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.memrise.com/", "description": "تطبيق لتعلم المفردات باستخدام التكرار المتباعد.", "slug": "language-resource-memrise"}'::jsonb,
    title_ar = 'ميمرايز'
WHERE id = 'language-resource-memrise'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Oxford Learners Dictionaries',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.oxfordlearnersdictionaries.com/", "description": "قاموس موجه لمتعلمي اللغة الإنجليزية.", "slug": "language-resource-oxford-learners-dictionaries"}'::jsonb,
    title_ar = 'قواميس أكسفورد'
WHERE id = 'language-resource-oxford-learners-dictionaries'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Quizlet',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://quizlet.com/", "description": "أداة لإنشاء ومراجعة قوائم المفردات.", "slug": "language-resource-quizlet"}'::jsonb,
    title_ar = 'كويزلت'
WHERE id = 'language-resource-quizlet'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Rachel English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://rachelsenglish.com/", "description": "قناة وموقع ممتاز لتعلم النطق الأمريكي.", "slug": "language-resource-rachel-english"}'::jsonb,
    title_ar = 'راشيل إنجليش'
WHERE id = 'language-resource-rachel-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 1',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.bbc.co.uk/learningenglish", "description": "موقع ممتاز لتحسين مهارات الاستماع والقراءة.", "slug": "language-resource-resource-1"}'::jsonb,
    title_ar = 'مورد Resource 1'
WHERE id = 'language-resource-resource-1'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 10',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.engvid.com", "description": "دروس فيديو مجانية من معلمين ناطقين باللغة الإنجليزية.", "slug": "language-resource-resource-10"}'::jsonb,
    title_ar = 'مورد Resource 10'
WHERE id = 'language-resource-resource-10'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 2',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://dictionary.cambridge.org", "description": "قاموس إنجليزي موثوق مع أمثلة ونطق.", "slug": "language-resource-resource-2"}'::jsonb,
    title_ar = 'مورد Resource 2'
WHERE id = 'language-resource-resource-2'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 3',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.duolingo.com", "description": "تطبيق مجاني لتعلم الأساسيات بطريقة ممتعة.", "slug": "language-resource-resource-3"}'::jsonb,
    title_ar = 'مورد Resource 3'
WHERE id = 'language-resource-resource-3'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 4',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.ted.com", "description": "مقاطع فيديو ملهمة لتحسين مهارة الاستماع.", "slug": "language-resource-resource-4"}'::jsonb,
    title_ar = 'مورد Resource 4'
WHERE id = 'language-resource-resource-4'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 5',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.cambridge.org", "description": "كتاب مرجعي رائع للقواعد.", "slug": "language-resource-resource-5"}'::jsonb,
    title_ar = 'مورد Resource 5'
WHERE id = 'language-resource-resource-5'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 6',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.oxfordlearnersdictionaries.com", "description": "قاموس ممتاز للمتعلمين مع شروحات مبسطة.", "slug": "language-resource-resource-6"}'::jsonb,
    title_ar = 'مورد Resource 6'
WHERE id = 'language-resource-resource-6'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 7',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.coursera.org", "description": "دورة مجانية لتحسين الإنجليزية لأغراض العمل.", "slug": "language-resource-resource-7"}'::jsonb,
    title_ar = 'مورد Resource 7'
WHERE id = 'language-resource-resource-7'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 8',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://learnenglish.britishcouncil.org", "description": "موارد تعليمية مجانية للطلاب من جميع المستويات.", "slug": "language-resource-resource-8"}'::jsonb,
    title_ar = 'مورد Resource 8'
WHERE id = 'language-resource-resource-8'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Resource 9',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://rachelsenglish.com", "description": "قناة يوتيوب ممتازة لتحسين النطق الأمريكي.", "slug": "language-resource-resource-9"}'::jsonb,
    title_ar = 'مورد Resource 9'
WHERE id = 'language-resource-resource-9'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Talk English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.talkenglish.com/", "description": "دروس محادثة ونطق وتدريبات استماع.", "slug": "language-resource-talk-english"}'::jsonb,
    title_ar = 'تحدث الإنجليزية'
WHERE id = 'language-resource-talk-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Ted Talks',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://www.ted.com/", "description": "محاضرات ملهمة مفيدة للاستماع المتقدم.", "slug": "language-resource-ted-talks"}'::jsonb,
    title_ar = 'محادثات تيد'
WHERE id = 'language-resource-ted-talks'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Voa Learning English',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://learningenglish.voanews.com/", "description": "أخبار ومقالات بلغة مبسطة.", "slug": "language-resource-voa-learning-english"}'::jsonb,
    title_ar = 'صوت أمريكا - تعلم الإنجليزية'
WHERE id = 'language-resource-voa-learning-english'
AND status = 'draft';
UPDATE language_resources
SET
    content_type = 'resource',
    title_en = 'Youglish',
    portal_id = 'language',
    status = 'draft',
    data = '{"url": "https://youglish.com/", "description": "ابحث عن نطق أي كلمة في سياقات حقيقية على يوتيوب.", "slug": "language-resource-youglish"}'::jsonb,
    title_ar = 'يوجليش'
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
