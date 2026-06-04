-- ══════════════════════════════════════════════════════════════════
-- v18 — Blog Posts CMS
-- Run in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT        NOT NULL UNIQUE,
  title_ar         TEXT        NOT NULL,
  title_en         TEXT        NOT NULL DEFAULT '',
  excerpt_ar       TEXT        NOT NULL DEFAULT '',
  excerpt_en       TEXT        NOT NULL DEFAULT '',
  content_ar       TEXT        NOT NULL DEFAULT '',
  content_en       TEXT        NOT NULL DEFAULT '',
  key_takeaways_ar TEXT[]      NOT NULL DEFAULT '{}',
  key_takeaways_en TEXT[]      NOT NULL DEFAULT '{}',
  category         TEXT        NOT NULL DEFAULT 'Learning',
  tags             TEXT[]      NOT NULL DEFAULT '{}',
  icon             TEXT        NOT NULL DEFAULT '📝',
  reading_time     INT         NOT NULL DEFAULT 5,
  featured         BOOLEAN     NOT NULL DEFAULT false,
  status           TEXT        NOT NULL DEFAULT 'published'
                               CHECK (status IN ('published','draft','archived')),
  cover_url        TEXT,
  related_posts    TEXT[]      NOT NULL DEFAULT '{}',
  related_tools    TEXT[]      NOT NULL DEFAULT '{}',
  related_courses  TEXT[]      NOT NULL DEFAULT '{}',
  created_by       UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_blog_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_blog_updated_at();

-- 3. RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
DROP POLICY IF EXISTS "public_read_published_blog" ON blog_posts;
CREATE POLICY "public_read_published_blog"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Service role (API with admin check) handles all writes — no RLS policy needed for INSERT/UPDATE/DELETE
-- (service_role bypasses RLS; application code verifies admin role before calling)

-- 4. Storage bucket hint (create manually in Supabase Dashboard → Storage → New bucket: "blog-covers", Public: true)

-- 5. Seed: 3 high-quality articles
INSERT INTO blog_posts (slug, title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en,
  key_takeaways_ar, key_takeaways_en, category, tags, icon, reading_time, featured, status, published_at)
VALUES

-- Article 1: AI Models Comparison
(
  'chatgpt-vs-claude-vs-gemini-2025',
  'ChatGPT vs Claude vs Gemini: أيّهم يناسبك؟ دليل المقارنة الشامل 2025',
  'ChatGPT vs Claude vs Gemini: Which AI Should You Use? Complete 2025 Guide',
  'مقارنة شاملة ومحايدة بين أقوى ثلاثة نماذج ذكاء اصطناعي في العالم — مع توصيات عملية لكل حالة استخدام.',
  'A comprehensive, unbiased comparison of the three most powerful AI models — with practical recommendations for every use case.',
  E'## لماذا تهمّك هذه المقارنة؟\n\nفي 2025، أصبح اختيار نموذج الذكاء الاصطناعي المناسب قراراً استراتيجياً لكل محترف. كل نموذج يتفوق في مجالات محددة، وفهم الفروق يوفّر عليك الوقت والمال.\n\n## ChatGPT (OpenAI)\n\n**الأفضل في:** الاستخدامات اليومية العامة، التكامل مع الأدوات، واجهة المستخدم المبسّطة.\n\n**نقاط القوة:**\n- متجر GPTs الضخم مع آلاف الإضافات\n- DALL·E 3 مدمج لتوليد الصور\n- ChatGPT Plus يتضمن GPT-4o وبحث الويب\n- الأكثر انتشاراً وتوثيقاً\n\n**نقاط الضعف:**\n- أحياناً "يتفق" مع المستخدم بدلاً من التصحيح\n- تحليل البيانات والأكواد أقل دقة من المنافسين\n\n**المناسب لـ:** المستخدم العام، رجال الأعمال، المسوّقون، صانعو المحتوى.\n\n## Claude (Anthropic)\n\n**الأفضل في:** التفكير العميق، الكتابة الطويلة، البرمجة، والأمانة في الإجابات.\n\n**نقاط القوة:**\n- نافذة سياق ضخمة (200K token) — يقرأ كتاباً كاملاً دفعة واحدة\n- أقل ميلاً للهلوسة وأكثر إقراراً بعدم المعرفة\n- يكتب مثل إنسان حقيقي — بلا جفاف أو تكرار ممل\n- التحليل النقدي والمقارنات المعمّقة\n\n**نقاط الضعف:**\n- لا يوجد بحث ويب مدمج دائماً\n- لا توليد صور\n\n**المناسب لـ:** المبرمجون، الباحثون، الكتّاب، المحللون، من يريد إجابات صادقة لا مُجاملة.\n\n## Gemini (Google)\n\n**الأفضل في:** البحث الحديث، التكامل مع Google Workspace، التحليل متعدد الوسائط.\n\n**نقاط القوة:**\n- متصل بالإنترنت مباشرة — معلومات حديثة دائماً\n- مدمج مع Gmail وDocs وSheets\n- Gemini Ultra يفوق في المهام الموسوعية\n- مجاني بشكل أوسع ضمن Google One\n\n**نقاط الضعف:**\n- الكتابة الإبداعية أقل طبيعية\n- أحياناً يعيد صياغة السؤال بدلاً من الإجابة\n\n**المناسب لـ:** من يعمل ضمن منظومة Google، الصحفيون، الباحثون، من يحتاج معلومات حديثة.\n\n## جدول المقارنة السريعة\n\n| المهمة | الأفضل |\n|--------|--------|\n| البرمجة | Claude |\n| الكتابة الإبداعية | Claude / ChatGPT |\n| المعلومات الحديثة | Gemini |\n| توليد الصور | ChatGPT (DALL·E) |\n| تحليل الوثائق | Claude |\n| التكامل مع الأدوات | ChatGPT |\n| اليومي والعام | ChatGPT |\n| التفكير النقدي | Claude |\n\n## التوصية النهائية\n\nلا تختار واحداً فقط — المحترفون يستخدمون الثلاثة بحسب المهمة. ابدأ بـ Claude للبرمجة والتحليل، ChatGPT للمهام اليومية والإبداعية، وGemini لأي شيء يحتاج بيانات محدّثة من الإنترنت.',
  E'## Why This Comparison Matters\n\nIn 2025, choosing the right AI model is a strategic decision. Each excels in specific areas, and understanding the differences saves you time and money.\n\n## ChatGPT (OpenAI)\n\n**Best for:** General everyday use, tool integrations, simple interface.\n\n**Strengths:**\n- Massive GPT Store with thousands of plugins\n- Built-in DALL·E 3 for image generation\n- ChatGPT Plus includes GPT-4o and web search\n- Largest community and documentation\n\n**Weaknesses:**\n- Sometimes "agrees" with users rather than correcting\n- Code and data analysis less precise than competitors\n\n**Best for:** General users, business professionals, marketers, content creators.\n\n## Claude (Anthropic)\n\n**Best for:** Deep reasoning, long-form writing, coding, honest answers.\n\n**Strengths:**\n- Massive context window (200K tokens) — reads a whole book at once\n- Less prone to hallucination, more willing to say "I don''t know"\n- Writes like a real human — no robotic repetition\n- Critical analysis and deep comparisons\n\n**Weaknesses:**\n- No always-on web search\n- No image generation\n\n**Best for:** Developers, researchers, writers, analysts, anyone who wants honest over flattering.\n\n## Gemini (Google)\n\n**Best for:** Real-time search, Google Workspace integration, multimodal analysis.\n\n**Strengths:**\n- Always connected to the internet — always current\n- Integrated with Gmail, Docs, Sheets\n- Gemini Ultra excels at encyclopedic tasks\n- Free tier generous via Google One\n\n**Weaknesses:**\n- Creative writing feels less natural\n- Sometimes rephrases questions instead of answering\n\n**Best for:** Google ecosystem users, journalists, researchers, anyone needing current information.\n\n## The Recommendation\n\nDon''t choose just one — professionals use all three. Use Claude for coding and analysis, ChatGPT for daily creative tasks, and Gemini for anything requiring fresh web data.',
  ARRAY['Claude يتفوق في التحليل والبرمجة', 'ChatGPT الأوسع في الأدوات والتكامل', 'Gemini الأسرع للمعلومات الحديثة', 'استخدم الثلاثة معاً لأقصى إنتاجية'],
  ARRAY['Claude excels at analysis and coding', 'ChatGPT has the widest tools ecosystem', 'Gemini is fastest for current information', 'Use all three together for maximum productivity'],
  'AI Tools', ARRAY['chatgpt','claude','gemini','comparison','ai-models'], '🤖', 10, true, 'published',
  '2025-12-01 10:00:00+00'
),

-- Article 2: No-Code Automation
(
  'no-code-ai-automation-workflow-guide',
  'بناء تدفقات عمل AI بدون برمجة: من الفكرة إلى الأتمتة في ساعة',
  'Build AI Workflows Without Code: From Idea to Automation in One Hour',
  'دليل عملي خطوة بخطوة لبناء تدفقات عمل مُؤتمتة بالذكاء الاصطناعي باستخدام أدوات No-Code — دون كتابة سطر كود واحد.',
  'A practical step-by-step guide to building AI-powered automated workflows using No-Code tools — without writing a single line of code.',
  E'## لماذا الأتمتة بلا كود؟\n\nالأتمتة لم تعد حكراً على المبرمجين. أدوات No-Code مثل Make.com وZapier وn8n تتيح لأي شخص بناء أنظمة تعمل وحدها 24/7.\n\n## الثلاثي الذهبي: Make + AI + Supabase\n\n### المرحلة 1: تحديد العملية\n\nقبل البناء، اسأل نفسك:\n- ما المهمة التي تكررها أكثر من 3 مرات أسبوعياً؟\n- ما الذي يأخذ وقتاً لكنه لا يحتاج تفكيراً عميقاً؟\n\n**أمثلة مثالية:**\n- إرسال ردود مخصصة على رسائل العملاء\n- تصنيف المحتوى الوارد تلقائياً\n- توليد تقارير يومية من البيانات\n- نشر المحتوى على منصات متعددة\n\n### المرحلة 2: اختيار الأدوات\n\n**Make.com** — الأقوى للتدفقات المعقدة:\n- 2000 عملية/شهر مجاناً\n- تكامل مع 2000+ تطبيق\n- منطق شرطي وحلقات\n\n**Zapier** — الأبسط للمبتدئين:\n- واجهة drag-and-drop بديهية\n- أفضل لتدفقات A → B البسيطة\n\n**n8n** — للمحترفين الذين يريدون التحكم الكامل:\n- مفتوح المصدر، يمكن استضافته ذاتياً\n- لا حد للعمليات عند الاستضافة الذاتية\n\n### المرحلة 3: دمج AI\n\nالسر هو استخدام AI كـ"دماغ" التدفق:\n\n1. **استقبل البيانات** (بريد، نموذج، RSS...)\n2. **أرسلها لـ Claude أو ChatGPT API** مع تعليمات محددة\n3. **استخدم الرد** لاتخاذ قرار أو توليد محتوى\n4. **أرسل النتيجة** للوجهة المناسبة\n\n### مثال عملي: مساعد البريد الذكي\n\n**التدفق:**\n`Gmail يستقبل بريد → Make يأخذ النص → Claude يصنّف ويكتب رد → يُرسل مسودة للمراجعة`\n\n**الوقت المطلوب:** 45 دقيقة\n**الوقت الموفّر:** 2-3 ساعات/يوم\n\n## أفضل حالات الاستخدام\n\n### لرجال الأعمال\n- تلخيص اجتماعات Zoom تلقائياً وإرسالها كـ action items\n- توليد عروض أسعار مخصصة من النماذج\n\n### للمحتوى\n- تحويل المقالات إلى posts لـ LinkedIn + Twitter + Instagram تلقائياً\n- ترجمة وتكييف المحتوى لجماهير مختلفة\n\n### للبيانات\n- تجميع بيانات من مصادر متعددة في Google Sheets\n- توليد تقارير PDF أسبوعية تلقائياً\n\n## الخطوة التالية\n\nابدأ بتدفق واحد بسيط هذا الأسبوع. الكمال عدو الإنجاز — تدفق بسيط يعمل أفضل من تدفق مثالي لا تبنيه أبداً.',
  E'## Why No-Code Automation?\n\nAutomation is no longer just for developers. No-Code tools like Make.com, Zapier, and n8n let anyone build systems that run 24/7 automatically.\n\n## The Golden Trio: Make + AI + Supabase\n\n### Phase 1: Identify the Process\n\nBefore building, ask yourself:\n- What task do I repeat more than 3 times a week?\n- What takes time but requires no deep thinking?\n\n**Perfect examples:**\n- Sending personalized replies to customer messages\n- Auto-classifying incoming content\n- Generating daily reports from data\n- Publishing content across multiple platforms\n\n### Phase 2: Choose Your Tools\n\n**Make.com** — Most powerful for complex flows:\n- 2,000 operations/month free\n- Integrates with 2,000+ apps\n- Conditional logic and loops\n\n**Zapier** — Simplest for beginners:\n- Intuitive drag-and-drop interface\n- Best for simple A → B flows\n\n**n8n** — For pros who want full control:\n- Open source, self-hostable\n- No operation limits when self-hosted\n\n### Phase 3: Integrate AI\n\nThe secret is using AI as the "brain" of your workflow:\n\n1. **Receive data** (email, form, RSS...)\n2. **Send it to Claude or ChatGPT API** with specific instructions\n3. **Use the response** to make a decision or generate content\n4. **Send the result** to the appropriate destination\n\n### Practical Example: Smart Email Assistant\n\n**Workflow:**\n`Gmail receives email → Make extracts text → Claude classifies & writes draft reply → sends draft for review`\n\n**Time to build:** 45 minutes\n**Time saved:** 2-3 hours/day\n\n## Top Use Cases\n\n### For Business Owners\n- Auto-summarize Zoom meetings and send as action items\n- Generate custom quotes from inquiry forms\n\n### For Content Creators\n- Auto-convert articles into LinkedIn + Twitter + Instagram posts\n- Translate and adapt content for different audiences\n\n### For Data Teams\n- Aggregate data from multiple sources into Google Sheets\n- Auto-generate weekly PDF reports',
  ARRAY['الأتمتة بلا كود متاحة للجميع بدون خبرة برمجية', 'Make.com هو الأقوى للتدفقات المعقدة', 'AI هو "الدماغ" والأتمتة هي "الجسد"', 'ابدأ بتدفق واحد بسيط هذا الأسبوع'],
  ARRAY['No-code automation is accessible to everyone', 'Make.com is most powerful for complex workflows', 'AI is the brain, automation is the body', 'Start with one simple workflow this week'],
  'Automation', ARRAY['automation','no-code','make','zapier','workflow','ai'], '⚙️', 9, true, 'published',
  '2025-11-15 10:00:00+00'
),

-- Article 3: AI & Future of Work
(
  'ai-future-of-work-skills-2025',
  'الذكاء الاصطناعي وسوق العمل: المهارات التي ستحميك في 2025 وما بعدها',
  'AI & The Future of Work: Skills That Will Keep You Relevant in 2025 and Beyond',
  'تحليل معمّق لتأثير AI على سوق العمل وخارطة طريق واضحة للمهارات التي ستزيد قيمتك المهنية بدلاً من أن تُهددها.',
  'A deep analysis of AI''s impact on the job market and a clear roadmap for skills that increase your professional value instead of threatening it.',
  E'## الحقيقة التي لا يقولها لك أحد\n\nلن يأخذ AI وظيفتك — شخص يستخدم AI بكفاءة سيأخذ وظيفتك. هذا الفرق جوهري.\n\n## ما الوظائف التي تتغير فعلاً؟\n\n### الوظائف الأكثر تأثراً (قصيراً)\n- Data Entry وإدخال البيانات الروتيني\n- ترجمة النصوص البسيطة\n- كتابة التقارير النمطية\n- خدمة عملاء المستوى الأول\n\n### الوظائف التي تتطور (لا تختفي)\n- المبرمجون: يكتبون كوداً أعلى مستوى مع AI كمساعد\n- المحاسبون: يركزون على التحليل الاستراتيجي لا الأرقام\n- المصممون: يولّدون وينقّحون بدلاً من ينشئون من الصفر\n- المعلمون: يشخّصون ويرشدون بينما AI يشرح\n\n### الوظائف التي تنمو (بسبب AI)\n- مهندسو Prompt Engineering\n- محللو بيانات AI\n- أخصائيو أخلاقيات الذكاء الاصطناعي\n- متخصصو تكامل AI في المنظمات\n\n## المهارات الخمس الأساسية لعصر AI\n\n### 1. Prompt Engineering — التواصل مع AI\n\nمن يعرف كيف يسأل AI الأسئلة الصحيحة يحصل على نتائج 10x أفضل من من لا يعرف. هذه مهارة تعلّمها في أيام.\n\n**ابدأ بـ:** دورة أساسيات Prompt Engineering في أكاديمية Darhous AI.\n\n### 2. Critical Thinking — التفكير النقدي\n\nAI يولّد، الإنسان يُقيّم. مهارة التحقق من المعلومات وتقييم الجودة أصبحت أثمن مما كانت.\n\n### 3. Domain Expertise — الخبرة المتخصصة\n\nAI العام لا يستطيع تعويض خبير طبي أو قانوني أو مهندس متخصص. الخبرة المتخصصة + AI = قيمة استثنائية.\n\n### 4. AI Tool Fluency — إتقان أدوات AI\n\nمعرفة متى وكيف تستخدم كل أداة AI هي مهارة مهنية حقيقية. مثل Excel في التسعينات — من أتقنه تقدّم.\n\n### 5. Human Skills — المهارات الإنسانية\n\nالتعاطف، القيادة، الإقناع، بناء العلاقات — كلها مجالات لا يتفوق فيها AI. استثمر فيها.\n\n## خارطة الطريق العملية\n\n**هذا الشهر:** تعلّم استخدام Claude وChatGPT بشكل احترافي في مهمة عملية واحدة في عملك.\n\n**الربع القادم:** أتمّ دورة في مجال AI ذي صلة بتخصصك.\n\n**هذه السنة:** حدّد كيف يمكن لـ AI أن يُضاعف إنتاجيتك في دورك الحالي، وقدّم ذلك لمديرك كمبادرة.\n\n## الرسالة الختامية\n\nالتكنولوجيا لا تنتظر أحداً. الفرق بين من يتكيّف ومن لا يتكيّف ليس القدرة — بل قرار البدء اليوم.',
  E'## The Truth Nobody Tells You\n\nAI won''t take your job — someone who uses AI effectively will. That distinction is everything.\n\n## What Jobs Are Actually Changing?\n\n### Most Affected (Short-term)\n- Routine data entry\n- Simple text translation\n- Template-based report writing\n- Tier-1 customer service\n\n### Jobs That Are Evolving (Not Disappearing)\n- Programmers: write higher-level code with AI as assistant\n- Accountants: focus on strategic analysis not number crunching\n- Designers: generate and refine rather than create from scratch\n- Teachers: diagnose and guide while AI explains\n\n### Jobs Growing Because of AI\n- Prompt Engineering specialists\n- AI data analysts\n- AI ethics officers\n- AI integration specialists\n\n## The 5 Essential Skills for the AI Era\n\n### 1. Prompt Engineering — Communicating with AI\n\nSomeone who knows how to ask AI the right questions gets 10x better results. This is a learnable skill.\n\n### 2. Critical Thinking\n\nAI generates, humans evaluate. The ability to verify information and assess quality is more valuable than ever.\n\n### 3. Domain Expertise\n\nGeneral AI cannot replace a medical specialist, lawyer, or engineer. Deep expertise + AI = exceptional value.\n\n### 4. AI Tool Fluency\n\nKnowing when and how to use each AI tool is a genuine professional skill. Like Excel in the 90s — masters got ahead.\n\n### 5. Human Skills\n\nEmpathy, leadership, persuasion, relationship building — areas where AI cannot compete. Invest in them.\n\n## Practical Roadmap\n\n**This month:** Learn to use Claude and ChatGPT professionally for one real task in your current role.\n\n**Next quarter:** Complete a course in an AI area related to your specialty.\n\n**This year:** Identify how AI can double your productivity in your current role, and present it to your manager as an initiative.',
  ARRAY['AI لن يأخذ وظيفتك — شخص يستخدمه سيأخذها', 'الخبرة المتخصصة + AI = قيمة استثنائية', 'Prompt Engineering مهارة يمكن تعلمها في أيام', 'المهارات الإنسانية أكثر قيمة في عصر AI لا أقل'],
  ARRAY['AI won''t take your job — someone using it will', 'Domain expertise + AI = exceptional value', 'Prompt Engineering is learnable in days', 'Human skills are MORE valuable in the AI era, not less'],
  'Career', ARRAY['career','future-of-work','ai-skills','jobs','automation'], '💼', 11, true, 'published',
  '2025-10-20 10:00:00+00'
);
