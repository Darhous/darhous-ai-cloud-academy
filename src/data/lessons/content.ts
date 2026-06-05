export interface LessonContent {
  bodyAr: string;
  bodyEn: string;
  codeExample?: string;
  codeLanguage?: string;
}

/**
 * Lesson content map: courseId → array indexed by lesson position (0-based).
 * null = content not yet written (page shows "Coming Soon").
 * Only courses with real content are listed here.
 */
export const lessonContent: Record<string, (LessonContent | null)[]> = {

  "ai-foundations": [
    // Lesson 1 — ما هو الذكاء الاصطناعي؟
    {
      bodyAr: `## ما هو الذكاء الاصطناعي؟

الذكاء الاصطناعي ليس سحراً — بل هو رياضيات وإحصاء وبيانات. عندما تسأل Claude سؤالاً، لا "يفكر" بالمعنى الإنساني، بل ينفّذ عمليات حسابية تحوّل كلماتك إلى أرقام، ثم يختار الكلمة الأنسب للرد استناداً إلى مليارات الأمثلة تعلّم منها.

### التعريف الدقيق

**الذكاء الاصطناعي (AI)** هو مجال علم الحاسوب الذي يهدف إلى بناء أنظمة قادرة على أداء مهام تتطلب عادةً ذكاءً بشرياً — كالتعرّف على الصور، وفهم اللغة، واتخاذ القرارات.

### أنواع الذكاء الاصطناعي

**1. الذكاء الاصطناعي الضيق (Narrow AI)**
هذا ما يوجد اليوم بالكامل. كل نظام AI مصمم لمهمة واحدة محددة:
- ChatGPT → محادثة ونصوص
- DALL·E → توليد صور
- AlphaFold → التنبؤ ببنية البروتين
- TikTok → توصيات الفيديو

لا يستطيع أي منها الخروج عن مهمته المحددة.

**2. الذكاء الاصطناعي العام (AGI)**
نظري حتى الآن — نظام AI قادر على أداء أي مهمة ذهنية إنسانية. لم يُحقَّق بعد.

**3. الذكاء الاصطناعي الفائق (ASI)**
مفهوم مستقبلي يتجاوز الذكاء البشري في كل المجالات. خيال علمي حالياً.

### لماذا انفجر AI في 2020s؟

ثلاثة عوامل اجتمعت في الوقت ذاته:

| العامل | التفصيل |
|--------|---------|
| **البيانات** | تريليونات الكلمات والصور على الإنترنت |
| **الحوسبة** | بطاقات GPU أسرع بـ 1000× مقارنةً بـ 2010 |
| **الخوارزميات** | بنية Transformer (2017) غيّرت كل شيء |

### الفرق الأساسي: قواعد مقابل تعلّم

**البرمجة التقليدية:** أنت تكتب القواعد يدوياً.

**تعلم الآلة:** النموذج يستنتج القواعد من البيانات تلقائياً.

هذا هو الفارق الجوهري الذي فتح الباب لكل ما نراه اليوم.

### خلاصة الدرس

- AI = محاكاة الذكاء البشري بالآلات
- كل AI موجود الآن هو Narrow AI (ضيق ومتخصص)
- ثلاثة عوامل فجّرت AI: البيانات + الحوسبة + الخوارزميات
- الفرق الجوهري: التعلم من البيانات بدلاً من كتابة القواعد يدوياً`,

      bodyEn: `## What is Artificial Intelligence?

AI isn't magic — it's mathematics, statistics, and data. When you ask Claude a question, it doesn't "think" in the human sense. Instead, it runs complex computations that convert your words into numbers, then picks the most appropriate next word based on billions of training examples.

### The Precise Definition

**Artificial Intelligence (AI)** is the field of computer science that aims to build systems capable of performing tasks that normally require human intelligence — like recognizing images, understanding language, and making decisions.

### Types of AI

**1. Narrow AI**
This is everything that exists today. Every AI system is designed for one specific task:
- ChatGPT → conversation and text
- DALL·E → image generation
- AlphaFold → protein structure prediction
- TikTok → video recommendations

None of them can operate outside their defined task.

**2. Artificial General Intelligence (AGI)**
Theoretical for now — an AI system capable of performing any mental task a human can do. Not yet achieved.

**3. Artificial Superintelligence (ASI)**
A future concept surpassing human intelligence across all domains simultaneously. Science fiction currently.

### Why Did AI Explode in the 2020s?

Three factors converged at the same time:

| Factor | Detail |
|--------|--------|
| **Data** | Trillions of words and images on the internet |
| **Computing** | GPUs 1000× faster than in 2010 |
| **Algorithms** | The Transformer architecture (2017) changed everything |

### The Core Difference: Rules vs. Learning

**Traditional programming:** You write the rules manually.

**Machine learning:** The model infers rules from data automatically.

This fundamental difference opened the door to everything we see today.

### Lesson Summary

- AI = simulating human intelligence with machines
- All existing AI today is Narrow AI (specialized for one task)
- Three factors exploded AI: Data + Computing + Algorithms
- Core difference: learning from data instead of writing rules manually`,

      codeExample: `# Traditional programming (rule-based)
def diagnose(temperature):
    if temperature > 38:
        return "Fever"
    elif temperature > 37:
        return "Borderline"
    else:
        return "Normal"

# Machine learning approach
# Instead of rules, we learn from 10,000 patient records
# The model finds the patterns automatically
model.fit(patient_data, diagnoses)
prediction = model.predict(new_patient)`,
      codeLanguage: "python",
    },

    // Lesson 2 — تاريخ AI من 1950 إلى اليوم
    {
      bodyAr: `## تاريخ الذكاء الاصطناعي: من الحلم إلى الواقع

### 1950s — البداية والسؤال الكبير

**1950:** طرح آلان تورنج سؤاله الشهير: *"هل يمكن للآلات أن تفكر؟"* واقترح اختبار تورنج الذي نستخدمه حتى اليوم.

**1956:** مؤتمر دارتموث — وُلد مصطلح "الذكاء الاصطناعي" رسمياً. التوقعات كانت ضخمة جداً: حل كل مشاكل العالم في جيل واحد!

### 1970s–80s — الشتاء الأول والثاني

المشاريع الأولى فشلت حين واجهت العالم الحقيقي. المشكلة: الحوسبة بطيئة جداً والبيانات شحيحة.

- **1974–1980:** الشتاء الأول — تجفّف التمويل تماماً
- **1987–1993:** الشتاء الثاني — نظم الخبراء انهارت تجارياً

### 1990s–2000s — الصعود التدريجي

| السنة | الحدث |
|-------|-------|
| 1997 | Deep Blue يهزم كاسباروف في الشطرنج |
| 1998 | يان لوكون يطوّر CNN للتعرف على الأرقام |
| 2006 | جيفري هينتون يُحيي التعلم العميق |

### 2010s — الانفجار الحقيقي

**2012:** AlexNet تفوز بمسابقة ImageNet بفارق كبير — التعلم العميق يسحق كل المنافسين. هذا اليوم غيّر مسار AI إلى الأبد.

**2016:** AlphaGo يهزم بطل العالم في لعبة الـ Go — اللعبة الأكثر تعقيداً من الشطرنج.

**2017:** ورقة "Attention is All You Need" — بنية Transformer تولد. هذا هو الأب المعماري لكل LLM اليوم.

### 2020s — عصر النماذج الكبيرة

| السنة | الحدث |
|-------|-------|
| 2020 | GPT-3 (175 مليار معامل) — يبدو سحرياً |
| 2022 | ChatGPT: 100 مليون مستخدم في أسبوعين |
| 2023 | GPT-4 + Claude 2 + Gemini — المنافسة تشتعل |
| 2024 | Claude 3 / GPT-4o — أداء يتجاوز الخبراء في اختبارات معينة |
| 2025 | Claude 4 — وكلاء AI يعملون باستقلالية حقيقية |

### الدرس من التاريخ

AI مرّ بدورتين من الحماس الزائد والإحباط. هذه المرة مختلفة لأن لدينا البيانات والحوسبة والخوارزميات الثلاثة معاً.`,

      bodyEn: `## History of AI: From Dream to Reality

### 1950s — The Beginning and the Big Question

**1950:** Alan Turing posed his famous question: *"Can machines think?"* and proposed the Turing Test still used today.

**1956:** Dartmouth Conference — the term "Artificial Intelligence" was officially born. Expectations were sky-high: solve all the world's problems in one generation!

### 1970s–80s — The First and Second Winters

Early projects failed when confronted with the real world. The problem: computing was too slow and data was scarce.

- **1974–1980:** First AI Winter — funding dried up completely
- **1987–1993:** Second AI Winter — expert systems collapsed commercially

### 1990s–2000s — Gradual Rise

| Year | Event |
|------|-------|
| 1997 | Deep Blue defeats Kasparov in chess |
| 1998 | Yann LeCun develops CNN for digit recognition |
| 2006 | Geoffrey Hinton revives Deep Learning |

### 2010s — The Real Explosion

**2012:** AlexNet wins ImageNet by a huge margin — deep learning crushes all competitors. This day changed AI forever.

**2016:** AlphaGo defeats the world champion at Go — the most complex board game.

**2017:** "Attention is All You Need" paper — the Transformer architecture is born. The architectural parent of every LLM today.

### 2020s — The Era of Large Models

| Year | Event |
|------|-------|
| 2020 | GPT-3 (175B parameters) — seems magical |
| 2022 | ChatGPT: 100M users in two weeks |
| 2023 | GPT-4 + Claude 2 + Gemini — competition ignites |
| 2024 | Claude 3 / GPT-4o — expert-level performance on specific benchmarks |
| 2025 | Claude 4 — AI agents working with real autonomy |

### The Lesson from History

AI went through two cycles of excessive hype followed by disappointment. This time is different because we now have all three — data, computing, and algorithms — simultaneously.`,
    },

    // Lesson 3 — AI vs ML vs Deep Learning
    {
      bodyAr: `## AI vs ML vs Deep Learning — ما الفرق؟

كثيراً ما تُستخدم هذه المصطلحات الثلاثة بشكل متبادل، لكنها تعني أشياء مختلفة تماماً. فهمها يجعلك تتحدث بدقة عن العالم الرقمي.

### الصورة الكاملة: حلقات متداخلة

فكّر فيها كحلقات متداخلة:

**الذكاء الاصطناعي (AI)** — الحلقة الكبرى
كل شيء يجعل الآلة تبدو ذكية. يشمل القواعد المبرمجة، شجرات القرار، والخوارزميات الإحصائية البسيطة.

**تعلم الآلة (ML)** — داخل AI
مجموعة فرعية من AI تُركّز على التعلم من البيانات بدون تعليمات صريحة. النموذج يُحسّن نفسه من خلال الأمثلة.

**التعلم العميق (Deep Learning)** — داخل ML
مجموعة فرعية من ML تستخدم شبكات عصبية اصطناعية متعددة الطبقات تحاكي (بشكل مبسّط) طريقة عمل الدماغ.

### مقارنة مباشرة

| المعيار | AI | ML | Deep Learning |
|---------|----|----|---------------|
| التعريف | محاكاة الذكاء | التعلم من البيانات | شبكات عصبية عميقة |
| يحتاج بيانات؟ | لا دائماً | نعم | كميات ضخمة |
| يحتاج قوة حسابية؟ | أحياناً | متوسطة | عالية جداً |
| قابل للتفسير؟ | عادةً نعم | غالباً نعم | صعب (black box) |
| أمثلة | روبوت الشطرنج، Expert Systems | التوصيات، الفلترة | ChatGPT، DALL·E، Claude |

### مثال عملي: تشخيص البريد العشوائي (Spam)

**AI التقليدي:** قواعد يدوية → "إذا احتوت الرسالة على كلمة 'مجاني' → بريد عشوائي"

**تعلم الآلة:** نموذج يتعلم من 10,000 بريد مُصنَّف → يكتشف الأنماط تلقائياً

**التعلم العميق:** شبكة عصبية تحلل السياق الكامل للرسالة → دقة أعلى بكثير

### خلاصة

كل Deep Learning هو ML، وكل ML هو AI.
لكن ليس كل AI هو ML، وليس كل ML هو Deep Learning.

ChatGPT وClaude وGemini كلها Deep Learning → ML → AI.`,

      bodyEn: `## AI vs ML vs Deep Learning — What's the Difference?

These three terms are often used interchangeably, but they mean very different things. Understanding them makes you speak precisely about the digital world.

### The Full Picture: Nested Circles

Think of them as nested circles:

**Artificial Intelligence (AI)** — The outer circle
Anything that makes a machine appear intelligent. Includes hand-coded rules, decision trees, and simple statistical algorithms.

**Machine Learning (ML)** — Inside AI
A subset of AI focused on learning from data without explicit instructions. The model improves itself through examples.

**Deep Learning (DL)** — Inside ML
A subset of ML using multi-layer artificial neural networks that loosely mimic (in simplified form) how the brain works.

### Direct Comparison

| Criterion | AI | ML | Deep Learning |
|-----------|----|----|---------------|
| Definition | Simulate intelligence | Learn from data | Deep neural networks |
| Needs data? | Not always | Yes | Massive amounts |
| Needs computing? | Sometimes | Moderate | Very high |
| Interpretable? | Usually yes | Often yes | Hard (black box) |
| Examples | Chess engine, Expert Systems | Recommendations, Filtering | ChatGPT, DALL·E, Claude |

### Practical Example: Spam Detection

**Traditional AI:** Manual rules → "If the message contains 'free' → spam"

**Machine Learning:** Model learns from 10,000 labeled emails → discovers patterns automatically

**Deep Learning:** Neural network analyzes the full message context → much higher accuracy

### Summary

Every Deep Learning is ML, and every ML is AI.
But not every AI is ML, and not every ML is Deep Learning.

ChatGPT, Claude, and Gemini are all Deep Learning → ML → AI.`,
    },

    // Lesson 4 — كيف يعمل ChatGPT؟
    {
      bodyAr: `## كيف يعمل ChatGPT (وClaude وكل LLM)؟

### الفكرة الأساسية: التنبؤ بالكلمة التالية

في جوهره، نموذج اللغة الكبير يفعل شيئاً واحداً بشكل متكرر: **يتنبأ بأفضل كلمة تالية**.

عندما تكتب "العاصمة الفرنسية هي..." — النموذج لا "يعرف" الجواب. بدلاً من ذلك، قرأ مليارات النصوص التي تحتوي على هذه الجملة، ويعرف أن "باريس" هي الكلمة الأرجح في هذا السياق.

### الخطوات الثلاث لبناء LLM

**1. التقسيم إلى Tokens**
النص يُقسَّم إلى وحدات صغيرة تسمى tokens. الـ token ليس بالضرورة كلمة كاملة:
- "كلمة" → قد تكون token واحداً
- "Tokenization" → قد تُقسَّم إلى ["Token", "ization"]

**2. التدريب المسبق (Pre-training)**
النموذج يقرأ تريليونات الكلمات من الإنترنت والكتب. في كل مرة يخطئ في التنبؤ، يُعدِّل ملايين المعاملات الداخلية لتحسين نفسه. هذا يستغرق أسابيع على آلاف الـ GPU.

**3. الضبط الدقيق (Fine-tuning + RLHF)**
بعد التدريب المسبق، يُضبَّط النموذج ليكون مفيداً وآمناً وصادقاً:
- محادثات نموذجية يكتبها بشر
- تقييم بشري لجودة الإجابات
- التعلم التعزيزي (RLHF) لتحسين السلوك

### بنية Transformer: القلب النابض

الـ Transformer هو المعمار الذي يجعل كل هذا ممكناً. ابتُكر عام 2017 في ورقة "Attention is All You Need".

الميزة الرئيسية: **آلية الانتباه (Attention)** — تسمح للنموذج بربط كلمات بعيدة في الجملة ببعضها. مثلاً، في "الكتاب الذي اشتريته بالأمس فقدته" — يفهم النموذج أن "فقدته" يعود على "الكتاب" رغم المسافة.

### نافذة السياق (Context Window)

كل LLM لديه "ذاكرة قصيرة المدى" تسمى Context Window — الحد الأقصى من النص الذي يمكنه استيعابه في جلسة واحدة.
- GPT-4: ~128K token
- Claude 3.5: ~200K token

عندما تتجاوز المحادثة هذا الحد، يبدأ النموذج "بنسيان" الأجزاء الأقدم.

### ما لا يفعله LLM

- لا يحفظ محادثاتك بين الجلسات (إلا إذا صُمِّم للحفظ)
- لا يعرف أحداث بعد تاريخ التدريب (Knowledge Cutoff)
- لا "يفكر" — يحسب الاحتمالات`,

      bodyEn: `## How ChatGPT (and Claude and Every LLM) Works

### The Core Idea: Predicting the Next Word

At its heart, a large language model does one thing repeatedly: **predict the best next word**.

When you type "The capital of France is..." — the model doesn't "know" the answer. Instead, it read billions of texts containing this sentence and knows that "Paris" is the most probable next word in this context.

### The Three Steps to Build an LLM

**1. Tokenization**
Text is split into small units called tokens. A token isn't necessarily a full word:
- "word" → likely one token
- "Tokenization" → might split into ["Token", "ization"]

**2. Pre-training**
The model reads trillions of words from the internet and books. Each time it mispredicts, it adjusts millions of internal parameters to improve. This takes weeks on thousands of GPUs.

**3. Fine-tuning (+ RLHF)**
After pre-training, the model is tuned to be helpful, safe, and honest:
- Human-written example conversations
- Human ratings of response quality
- Reinforcement Learning from Human Feedback (RLHF) to shape behavior

### The Transformer: The Beating Heart

The Transformer is the architecture that makes all this possible. Invented in 2017 in the paper "Attention is All You Need."

The key innovation: **Attention Mechanism** — allows the model to connect distant words in a sentence. For example, in "The book I bought yesterday, I lost it" — the model understands "it" refers to "book" despite the distance.

### Context Window

Every LLM has a "short-term memory" called the Context Window — the maximum text it can process in one session.
- GPT-4: ~128K tokens
- Claude 3.5: ~200K tokens

When a conversation exceeds this limit, the model begins "forgetting" older parts.

### What an LLM Does NOT Do

- It doesn't remember your conversations between sessions (unless designed to)
- It doesn't know events after its training date (Knowledge Cutoff)
- It doesn't "think" — it calculates probabilities`,

      codeExample: `# Simplified: what happens when you call an LLM API
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

# The model predicts token by token:
# "The" → "capital" → "of" → "France" → "is" → "Paris"
print(message.content[0].text)
# Output: "The capital of France is Paris."`,
      codeLanguage: "python",
    },

    // Lesson 5 — مقدمة في النماذج الكبيرة (LLMs)
    {
      bodyAr: `## مقدمة في النماذج الكبيرة (LLMs)

تعلّمنا في الدرس السابق كيف يعمل ChatGPT بشكل عام. اليوم نغوص أعمق في النماذج الكبيرة (Large Language Models) كتقنية: ما هي بالضبط، كيف تُقاس قوتها، وما الفرق بين النماذج الكبرى في 2025.

### ما هو LLM بالضبط؟

**النموذج الكبير للغة (LLM)** هو شبكة عصبية اصطناعية ضخمة تم تدريبها على كميات هائلة من النصوص البشرية. الـ "كبير" هنا يشير إلى عدد المعاملات (Parameters) التي تصل إلى مئات المليارات أو تريليونات.

### المعاملات (Parameters): مقياس الحجم

المعاملات هي الأوزان العددية داخل الشبكة العصبية — تشبه "الذاكرة المُرمَّزة" التي يحتفظ فيها النموذج بما تعلّمه من البيانات.

| النموذج | التقدير التقريبي للمعاملات |
|---------|--------------------------|
| GPT-2 (2019) | 1.5 مليار |
| GPT-3 (2020) | 175 مليار |
| GPT-4 (2023) | غير معلن (تقديرات ~1 تريليون) |
| Claude 3.5 Sonnet | غير معلن علنياً |
| Llama 3.1 (مفتوح المصدر) | 8 مليار – 405 مليار |

ملاحظة مهمة: أكثر معاملات ≠ أفضل دائماً. كفاءة التدريب وجودة البيانات مهمتان بنفس القدر.

### بيانات التدريب: المادة الخام

LLMs تتعلم من:
- **الإنترنت العام**: مليارات الصفحات (Common Crawl، Wikipedia)
- **الكتب**: ملايين الكتب الرقمية بمختلف المجالات
- **الكود**: GitHub ومستودعات البرمجة المفتوحة
- **المحادثات المنقّحة**: بيانات محادثات بشرية مُختارة بعناية

جودة البيانات أهم من كميتها — لهذا تستثمر شركات AI في "تنقية" البيانات وإزالة المحتوى الضار أو المتحيز.

### القدرات الرئيسية لـ LLMs

**1. توليد النصوص**
كتابة مقالات وتقارير وقصص وبريد إلكتروني ومحتوى تسويقي بأي أسلوب.

**2. الترجمة والتدويل**
ترجمة بين عشرات اللغات بجودة عالية مع مراعاة السياق والمعنى الضمني.

**3. البرمجة**
كتابة وشرح وتصحيح الكود في عشرات لغات البرمجة — من Python إلى TypeScript.

**4. الاستدلال والتحليل**
مقارنة الخيارات، تحليل المستندات، استخلاص الأنماط، والتفكير المنطقي.

**5. الملخصات والتحرير**
تلخيص وثائق طويلة وتكييف النصوص لجمهور أو أسلوب معين.

### القيود الجوهرية الثلاث

**❌ الهلوسة (Hallucination)**
النموذج قد "يخترع" معلومات تبدو صحيحة وثقة. المصدر: يحسب الاحتمالات، لا "يعرف" بمعنى قاعدة بيانات. دائماً تحقق من المعلومات الحرجة من مصادر مستقلة.

**❌ حد المعرفة (Knowledge Cutoff)**
النموذج لا يعرف الأحداث بعد تاريخ انتهاء تدريبه. Claude 4 مثلاً لديه cutoff معين بعده لا يعرف الأخبار إلا بالبحث الفعلي.

**❌ نافذة السياق المحدودة**
رغم أن النماذج الحديثة تدعم 128K–200K token، فإنها قد "تفقد" التركيز على المعلومات القديمة في المحادثات الطويلة جداً.

### مقارنة النماذج الكبرى في 2025

| النموذج | الشركة | نقاط القوة الرئيسية |
|---------|--------|-------------------|
| **GPT-4o** | OpenAI | الأوسع انتشاراً، صوت وصورة في الوقت الفعلي |
| **Claude 4** | Anthropic | التحليل العميق، المستندات الطويلة، الأمان |
| **Gemini 2.5 Pro** | Google | متكامل مع بيانات Google، رياضيات قوية |
| **Llama 3.1** | Meta | مفتوح المصدر، يعمل محلياً بدون اتصال |

لا يوجد نموذج "أفضل" في كل شيء — الاختيار يعتمد على المهمة والميزانية والخصوصية.

### النماذج متعددة الوسائط (Multimodal)

جيل 2024-2025 من LLMs تجاوز النصوص:
- **الصور**: تحليل الصور، وصفها، قراءة الرسوم البيانية
- **الصوت**: تحويل الكلام لنص والعكس في الوقت الفعلي
- **الكود البصري**: Claude يفهم الرسومات البرمجية والـ wireframes
- **الفيديو** (قيد التطوير): فهم مقاطع الفيديو كاملة

Claude يدعم الصور والكود. GPT-4o يدعم الصوت في الوقت الفعلي.

### خلاصة الدرس

- LLMs شبكات عصبية ضخمة تتنبأ بالنص token بعد token
- المعاملات تقيس الحجم لكن الكفاءة والبيانات أهم
- كل نموذج له نقاط قوة مختلفة — اختر حسب المهمة
- القيود الثلاث الكبرى: الهلوسة + حد المعرفة + نافذة السياق`,

      bodyEn: `## Introduction to Large Language Models (LLMs)

In the previous lesson, we covered how ChatGPT works at a high level. Today we go deeper into Large Language Models as a technology: what they are exactly, how their power is measured, and what distinguishes the major models in 2025.

### What Exactly Is an LLM?

A **Large Language Model (LLM)** is a massive artificial neural network trained on enormous quantities of human text. The "large" refers to the number of parameters — numerical weights inside the network — which can reach hundreds of billions or even trillions.

### Parameters: The Size Metric

Parameters are the numerical weights inside the neural network — think of them as "encoded memory" storing what the model learned from training data.

| Model | Approximate Parameter Count |
|-------|---------------------------|
| GPT-2 (2019) | 1.5 billion |
| GPT-3 (2020) | 175 billion |
| GPT-4 (2023) | Undisclosed (~1 trillion estimated) |
| Claude 3.5 Sonnet | Not publicly disclosed |
| Llama 3.1 (open source) | 8B – 405B |

Important note: More parameters ≠ always better. Training efficiency and data quality matter equally.

### Training Data: The Raw Material

LLMs learn from:
- **The public internet**: Billions of web pages (Common Crawl, Wikipedia)
- **Books**: Millions of digitized books across all domains
- **Code**: GitHub and open-source programming repositories
- **Curated conversations**: Carefully selected human conversation data

Data quality matters more than quantity — which is why AI companies invest heavily in "cleaning" data and removing harmful or biased content.

### Core LLM Capabilities

**1. Text Generation**
Writing articles, reports, stories, emails, and marketing content in any style.

**2. Translation and Localization**
Translating between dozens of languages with high quality and contextual understanding.

**3. Programming**
Writing, explaining, and debugging code across dozens of programming languages.

**4. Reasoning and Analysis**
Comparing options, analyzing documents, identifying patterns, logical thinking.

**5. Summarization and Editing**
Condensing long documents and adapting text for different audiences or styles.

### The Three Core Limitations

**❌ Hallucination**
The model may "invent" information that sounds plausible and confident. The root cause: it calculates probabilities, it doesn't "know" in the way a database does. Always verify critical information from independent sources.

**❌ Knowledge Cutoff**
The model knows nothing about events after its training cutoff date. Claude 4, for example, has a specific cutoff beyond which it has no knowledge unless it can search the web.

**❌ Limited Context Window**
Although modern models support 128K–200K tokens, they may "lose focus" on older information in very long conversations.

### Comparing the Major Models in 2025

| Model | Company | Key Strengths |
|-------|---------|--------------|
| **GPT-4o** | OpenAI | Most widely used, real-time voice and image |
| **Claude 4** | Anthropic | Deep analysis, long documents, safety |
| **Gemini 2.5 Pro** | Google | Integrated with Google data, strong math |
| **Llama 3.1** | Meta | Open source, runs locally without internet |

No model is "best" at everything — the choice depends on your task, budget, and privacy needs.

### Multimodal Models

The 2024–2025 generation of LLMs moved beyond text:
- **Images**: Analyze images, describe them, read charts and diagrams
- **Audio**: Speech-to-text and text-to-speech in real time
- **Visual code**: Claude understands programming diagrams and wireframes
- **Video** (developing): Understanding full video clips

Claude supports images and code. GPT-4o supports real-time audio.

### Lesson Summary

- LLMs are massive neural networks predicting text token by token
- Parameters measure scale, but efficiency and data quality matter more
- Each model has different strengths — choose based on the task
- The three big limitations: hallucination + knowledge cutoff + context window`,

      codeExample: `# Calling different LLM APIs — the pattern is similar
import anthropic
import openai

# Claude (Anthropic)
claude_client = anthropic.Anthropic(api_key="your-anthropic-key")
claude_response = claude_client.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain LLMs in 2 sentences"}]
)
print("Claude:", claude_response.content[0].text)

# GPT-4 (OpenAI) — same concept, different SDK
openai_client = openai.OpenAI(api_key="your-openai-key")
gpt_response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain LLMs in 2 sentences"}]
)
print("GPT-4o:", gpt_response.choices[0].message.content)

# Key insight: different APIs, same underlying concept
# Both models tokenize your input and predict the most likely next tokens`,
      codeLanguage: "python",
    },

    // Lesson 6 — جولة على أشهر أدوات AI
    {
      bodyAr: `## جولة على أشهر أدوات الذكاء الاصطناعي في 2025

هناك آلاف الأدوات AI اليوم. هذا الدرس يأخذك في جولة منظّمة على أهم الأدوات بحسب الفئة — مع إبراز نقاط القوة والاستخدام الأمثل لكل منها.

### الفئة 1: المحادثة والكتابة

هذه الأكثر استخداماً في العالم — المفيدة لكل شخص في أي مجال.

| الأداة | الشركة | القوة الرئيسية | خطة مجانية؟ |
|--------|--------|--------------|------------|
| **ChatGPT** | OpenAI | الأوسع انتشاراً، ذاكرة طويلة، متعدد الوسائط | ✅ GPT-4o محدود |
| **Claude** | Anthropic | التحليل العميق، الكتابة الطويلة، الأمان | ✅ Claude 3.5 Sonnet |
| **Gemini** | Google | متكامل مع Google Workspace | ✅ Gemini 1.5 Flash |
| **Copilot** | Microsoft | متكامل مع Office 365 وWindows | ✅ مع Windows |
| **Perplexity** | Perplexity AI | بحث ذكي مع مصادر موثّقة | ✅ محدود |

**متى تستخدم أيّاً منها؟**
- كتابة وتحرير طويلة: Claude
- بحث مع مصادر: Perplexity
- متكامل مع Microsoft Office: Copilot
- تعدد المهام اليومية: ChatGPT

### الفئة 2: توليد الصور

| الأداة | القوة الرئيسية | التكلفة |
|--------|--------------|---------|
| **Midjourney** | جودة فنية استثنائية | مدفوع (~$10/شهر) |
| **DALL-E 3** | مدمج في ChatGPT Plus | مع ChatGPT Plus |
| **Adobe Firefly** | آمن تجارياً، متكامل مع Photoshop | مجاني جزئياً |
| **Stable Diffusion** | مفتوح المصدر، يعمل محلياً | مجاني تماماً |
| **Ideogram** | متميز في دمج النصوص داخل الصور | مجاني جزئياً |

**متى تستخدم أيّاً منها؟**
- أعمال احترافية ومنشورات: Midjourney أو DALL-E 3
- محتوى تجاري بلا حقوق ملكية: Adobe Firefly
- تجربة مجانية بدون حدود: Stable Diffusion محلياً

### الفئة 3: البرمجة والكود

| الأداة | القوة الرئيسية |
|--------|--------------|
| **GitHub Copilot** | إكمال ذكي للكود داخل VS Code مباشرة |
| **Cursor** | محرر كود مبني حول AI بالكامل |
| **Claude** | شرح وكتابة وتصحيح بدقة عالية |
| **Claude Code** | CLI للمشاريع الكاملة — يقرأ ويعدّل ملفات المشروع |
| **Tabnine** | إكمال ذكي يعمل offline |

### الفئة 4: الصوت

| الأداة | الاستخدام |
|--------|----------|
| **ElevenLabs** | استنساخ الأصوات وتوليد كلام طبيعي من نص |
| **Whisper (OpenAI)** | تحويل الكلام لنص بدقة عالية |
| **Suno** | توليد أغانٍ كاملة من وصف نصي |
| **Udio** | توليد موسيقى احترافية |

### الفئة 5: الفيديو

| الأداة | الاستخدام |
|--------|----------|
| **RunwayML** | توليد مقاطع فيديو من صور أو نصوص |
| **Sora (OpenAI)** | توليد فيديو واقعي من نص |
| **CapCut AI** | مونتاج ذكي تلقائي |
| **Kling AI** | توليد فيديو بجودة عالية |

### كيف تختار الأداة المناسبة؟

اسأل نفسك أربعة أسئلة:
1. **ما المهمة؟** — كتابة، صور، كود، صوت، أم فيديو؟
2. **ما الميزانية؟** — مجاني أم مدفوع؟
3. **ما مستوى الجودة المطلوب؟** — شخصي أم احترافي تجاري؟
4. **هل تحتاج للتكامل مع أدوات أخرى؟**

### أدوات AI والعربية

معظم النماذج الكبرى تدعم العربية بجودة جيدة:
- **Claude**: عربية ممتازة مع فهم السياق والفروق الدقيقة
- **ChatGPT / Gemini**: جيد في العربية الفصحى والدارجة
- **Midjourney / DALL-E**: يفهم الأوصار بالعربية لكن قد يحتاج مراجعة

### نصيحة الخبراء

لا تحاول إتقان كل الأدوات. معظم المحترفين يعملون بـ **3-5 أدوات بعمق** بدلاً من 20 أداة بشكل سطحي. اختر أداة واحدة لكل فئة تستخدمها باستمرار وأتقنها جيداً.

### خلاصة الدرس

- الكتابة والمحادثة: ChatGPT / Claude / Gemini
- الصور: Midjourney / DALL-E / Firefly
- الكود: Copilot / Cursor / Claude
- الصوت: ElevenLabs / Whisper
- الفيديو: RunwayML / Sora
- اختر بحسب المهمة والميزانية — ولا تتشتت`,

      bodyEn: `## Tour of the Most Popular AI Tools in 2025

There are thousands of AI tools today. This lesson takes you on an organized tour of the most important ones by category — highlighting the strengths and optimal use case for each.

### Category 1: Conversation and Writing

These are the most widely used AI tools in the world — useful for everyone in any field.

| Tool | Company | Key Strength | Free Plan? |
|------|---------|-------------|-----------|
| **ChatGPT** | OpenAI | Most widely used, long memory, multimodal | ✅ GPT-4o limited |
| **Claude** | Anthropic | Deep analysis, long-form writing, safety | ✅ Claude 3.5 Sonnet |
| **Gemini** | Google | Integrated with Google Workspace | ✅ Gemini 1.5 Flash |
| **Copilot** | Microsoft | Integrated with Office 365 and Windows | ✅ with Windows |
| **Perplexity** | Perplexity AI | Smart search with verified sources | ✅ limited |

**When to use each:**
- Long writing and editing: Claude
- Research with sources: Perplexity
- Integrated with Microsoft Office: Copilot
- Everyday multi-purpose tasks: ChatGPT

### Category 2: Image Generation

| Tool | Key Strength | Cost |
|------|-------------|------|
| **Midjourney** | Exceptional artistic quality | Paid (~$10/month) |
| **DALL-E 3** | Built into ChatGPT Plus | With ChatGPT Plus |
| **Adobe Firefly** | Commercially safe, integrated with Photoshop | Partially free |
| **Stable Diffusion** | Open source, runs locally | Completely free |
| **Ideogram** | Excellent at embedding text inside images | Partially free |

**When to use each:**
- Professional work and publications: Midjourney or DALL-E 3
- Commercial content without copyright issues: Adobe Firefly
- Free unlimited experimentation: Stable Diffusion locally

### Category 3: Programming and Code

| Tool | Key Strength |
|------|-------------|
| **GitHub Copilot** | Inline smart code completion inside VS Code |
| **Cursor** | Full IDE built around AI |
| **Claude** | High-accuracy code writing, explanation, debugging |
| **Claude Code** | CLI for full projects — reads and edits project files |
| **Tabnine** | Smart completion that works offline |

### Category 4: Audio

| Tool | Use Case |
|------|----------|
| **ElevenLabs** | Voice cloning and natural text-to-speech |
| **Whisper (OpenAI)** | Highly accurate speech-to-text |
| **Suno** | Generate complete songs from text descriptions |
| **Udio** | Professional-quality music generation |

### Category 5: Video

| Tool | Use Case |
|------|----------|
| **RunwayML** | Generate video clips from images or text |
| **Sora (OpenAI)** | Realistic video generation from text |
| **CapCut AI** | Automated smart video editing |
| **Kling AI** | High-quality video generation |

### How to Choose the Right Tool

Ask yourself four questions:
1. **What's the task?** — Writing, images, code, audio, or video?
2. **What's the budget?** — Free or paid?
3. **What quality level is needed?** — Personal or professional/commercial?
4. **Do you need integration with other tools?**

### Expert Advice

Don't try to master every tool. Most professionals work with **3-5 tools deeply** instead of 20 tools superficially. Pick one tool per category you use regularly and get really good at it.

### Lesson Summary

- Writing and conversation: ChatGPT / Claude / Gemini
- Images: Midjourney / DALL-E / Firefly
- Code: Copilot / Cursor / Claude
- Audio: ElevenLabs / Whisper
- Video: RunwayML / Sora
- Choose based on task and budget — don't scatter your focus`,
    },

    // Lesson 7 — مشروع: بناء أول Chatbot
    {
      bodyAr: `## مشروع: بناء أول Chatbot

حان وقت التطبيق! في هذا الدرس ستبني chatbot مخصص خطوة بخطوة. سنعمل بطريقتين: الأولى بدون كود للمبتدئين، والثانية بالكود الفعلي للمهتمين بالتطبيق البرمجي.

### ما الذي سنبنيه؟

**مساعد خدمة عملاء لمتجر تقني افتراضي** — يجيب على أسئلة العملاء عن التوصيل والإرجاع والمنتجات، ويُحيل المشاكل المعقدة للدعم البشري.

يمكنك تعديل الفكرة لأي مجال: تعليم، طب، سياحة، موارد بشرية...

### الخطوة 1: تحديد الهدف والشخصية

قبل أي كود، اسأل نفسك هذه الأسئلة:

| السؤال | إجابتنا |
|--------|---------|
| ما هدف الـ Chatbot؟ | خدمة عملاء متجر تقني |
| من المستخدم؟ | عملاء يريدون معلومات سريعة |
| الأسئلة الشائعة؟ | التوصيل، الإرجاع، الأسعار |
| النبرة؟ | ودية ومحترفة |
| الحدود؟ | لا يعطي وعوداً بخصومات |

### الخطوة 2: تصميم System Prompt

الـ System Prompt هو التعليمات التي تُحدد هوية الـ Chatbot وسلوكه — المستخدم لا يراها.

\`\`\`
أنت "دعم إلكترونيكس"، مساعد خدمة عملاء لمتجر تقنية افتراضي.
مهمتك: الإجابة بدقة وأدب على استفسارات العملاء.

القواعد:
1. تحدث دائماً بالعربية ما لم يبدأ العميل بالإنجليزية
2. لا تعِد بخصومات أو عروض لم تُذكر هنا
3. إذا لم تعرف الإجابة، قُل بصدق وأحِل لـ support@example.com
4. اجعل ردودك مختصرة (3-5 جمل)

معلومات المتجر:
- ساعات العمل: 9 صباحاً - 11 مساءً يومياً
- التوصيل: 2-5 أيام عمل، مجاني فوق 200 ريال
- سياسة الإرجاع: 14 يوماً من تاريخ الاستلام
- الدعم البشري: support@example.com
\`\`\`

### الخطوة 3: التجربة بدون كود

للمبتدئين — استخدم Claude.ai مباشرة:
1. افتح [claude.ai](https://claude.ai)
2. ابدأ محادثة جديدة
3. الصق System Prompt أعلاه كأول رسالة وأضف: "قل 'جاهز' إذا فهمت دورك"
4. بعد رد Claude، ابدأ بأسئلة عملاء حقيقية

هذا التطبيق الأسرع — مثالي للنماذج الأولية (Prototyping).

### الخطوة 4: التطبيق بالكود (Python + Claude API)

للمطورين والمهتمين بالتطبيق الفعلي — الكود أدناه يبني chatbot تفاعلي في الـ Terminal.

### الخطوة 5: الاختبار والتحسين

اختبر هذه السيناريوهات:
- ✅ "ما هو وقت التوصيل؟" — يجب أن يذكر 2-5 أيام
- ✅ "أريد إرجاع منتج" — يُعطي تعليمات الإرجاع
- ✅ "هل توصلون للسعودية؟" — يُقرّ بعدم المعرفة ويُحيل للدعم
- ⚠️ "أعطني خصماً" — يجب ألّا يعِد بما لا يملك
- ⚠️ "اشرح لي نظرية التطور" — خارج نطاق المتجر، يُحيل للدعم

بعد كل اختبار، عدّل الـ System Prompt لتحسين الاستجابة.

### أفكار لمشاريع مشابهة

بنفس المنطق تستطيع بناء:
- **مرشد تعليمي**: يشرح مفاهيم مادة دراسية ويوجّه الطالب
- **مساعد طبي أولي**: يجيب على أسئلة صحية عامة ويُحيل للطبيب دائماً
- **وكيل سياحي**: يقترح وجهات بناءً على الميزانية والاهتمامات
- **مساعد HR**: يجيب الموظفين عن سياسات الإجازات والراتب

### الخلاصة

بناء Chatbot = تصميم System Prompt محكم + اختبار متكرر + تحسين مستمر. الكود بسيط — الصعوبة الحقيقية في **تصميم السلوك بدقة**: ماذا يفعل، وماذا لا يفعل، وكيف يتعامل مع المواقف الصعبة.`,

      bodyEn: `## Project: Build Your First Chatbot

Time to apply what you've learned! In this lesson you'll build a custom chatbot step by step. We'll work two ways: first without code for beginners, then with actual code for those interested in a real implementation.

### What We're Building

**A customer service assistant for a virtual tech store** — answers customer questions about shipping, returns, and products, and escalates complex issues to human support.

You can adapt the idea to any domain: education, healthcare, tourism, HR...

### Step 1: Define Goal and Personality

Before any code, answer these questions:

| Question | Our Answer |
|----------|-----------|
| What's the chatbot's goal? | Customer service for a tech store |
| Who are the users? | Customers wanting quick information |
| Common questions? | Shipping, returns, prices |
| Tone? | Friendly and professional |
| Limits? | No promising discounts or special deals |

### Step 2: Design the System Prompt

The System Prompt is the instructions that define the chatbot's identity and behavior — users don't see it.

\`\`\`
You are "Tech Support," a customer service assistant for a virtual technology store.
Your mission: answer customer inquiries accurately and politely.

Rules:
1. Respond in the language the customer uses
2. Never promise discounts or deals not mentioned in the context
3. If you don't know the answer, say so honestly and refer to support@example.com
4. Keep responses concise (3-5 sentences)

Store information:
- Business hours: 9 AM – 11 PM daily
- Shipping: 2-5 business days, free over $50
- Return policy: 14 days from delivery date
- Human support: support@example.com
\`\`\`

### Step 3: No-Code Testing

For beginners — use Claude.ai directly:
1. Open [claude.ai](https://claude.ai)
2. Start a new conversation
3. Paste the System Prompt above as your first message, adding: "Reply 'ready' when you understand your role"
4. After Claude responds, start asking real customer questions

This is the fastest approach — perfect for prototyping.

### Step 4: Implement with Code (Python + Claude API)

For developers interested in a real implementation — the code below builds an interactive chatbot in the terminal.

### Step 5: Test and Improve

Test these scenarios:
- ✅ "What's the shipping time?" — should mention 2-5 business days
- ✅ "I want to return a product" — gives return instructions
- ✅ "Do you ship internationally?" — admits uncertainty and refers to support
- ⚠️ "Give me a discount" — must not promise what it doesn't have authority to give
- ⚠️ "Explain photosynthesis to me" — outside store scope, should refer to support

After each test, refine the System Prompt to improve responses.

### Ideas for Similar Projects

Using the same logic you can build:
- **Educational tutor**: explains course concepts and guides students
- **Basic medical assistant**: answers general health questions and always refers to a doctor
- **Travel agent**: suggests destinations based on budget and interests
- **HR assistant**: answers employee questions about leave and salary policies

### Summary

Building a chatbot = careful System Prompt design + repeated testing + continuous improvement. The code is simple — the real challenge is **designing behavior precisely**: what it does, what it doesn't do, and how it handles difficult situations.`,

      codeExample: `import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

SYSTEM_PROMPT = """
You are "Tech Support," a customer service assistant for a virtual technology store.
Your mission: answer customer inquiries accurately and politely.

Rules:
1. Respond in the language the customer uses
2. Never promise discounts or deals not mentioned in this context
3. If you don't know the answer, say so honestly and refer to support@example.com
4. Keep responses concise (3-5 sentences)

Store information:
- Business hours: 9 AM - 11 PM daily
- Shipping: 2-5 business days, free over $50
- Return policy: 14 days from delivery date
- Human support: support@example.com
"""

conversation_history = []

def chat(user_message: str) -> str:
    conversation_history.append({
        "role": "user",
        "content": user_message
    })
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=500,
        system=SYSTEM_PROMPT,
        messages=conversation_history
    )
    assistant_message = response.content[0].text
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })
    return assistant_message

print("Tech Support Chatbot ready! (type 'quit' to exit)")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        break
    response = chat(user_input)
    print(f"Bot: {response}\\n")`,
      codeLanguage: "python",
    },

    // Lesson 8 — مراجعة الوحدة الأولى (Quiz Prep)
    {
      bodyAr: `## مراجعة الوحدة الأولى — استعداداً للاختبار

هذا الدرس يلخّص كل ما تعلمته في الوحدة الأولى من دورة أساسيات AI. راجعه جيداً قبل أداء الاختبار.

### ملخص الدروس السبعة السابقة

#### الدرس 1: ما هو الذكاء الاصطناعي؟
- AI = محاكاة الذكاء البشري بالآلات
- أنواع ثلاثة: Narrow AI (موجود)، AGI (نظري)، ASI (مستقبلي)
- 3 عوامل فجّرت AI: البيانات + الحوسبة + خوارزمية Transformer
- الفرق الجوهري: تعلّم من البيانات ≠ كتابة قواعد يدوياً

#### الدرس 2: تاريخ AI
- 1950: تورنج يطرح "هل تفكر الآلات؟" + 1956: مؤتمر دارتموث (ميلاد المصطلح)
- شتاءان للـ AI: 1974-1980 و1987-1993 (فشل بسبب محدودية الموارد)
- 2012: AlexNet — ثورة التعلم العميق (ImageNet competition)
- 2017: ورقة Transformer — الأب المعماري لكل LLM حديث
- 2022: ChatGPT — 100 مليون مستخدم في أسبوعين

#### الدرس 3: AI vs ML vs Deep Learning
- حلقات متداخلة: AI ⊃ ML ⊃ Deep Learning
- كل Deep Learning هو ML وكل ML هو AI، لكن العكس غير صحيح
- ChatGPT وClaude: Deep Learning → ML → AI

#### الدرس 4: كيف يعمل LLM؟
- الفكرة الأساسية: يتنبأ بأفضل كلمة تالية باستمرار
- 3 مراحل البناء: Tokenization → Pre-training → Fine-tuning/RLHF
- Transformer + آلية Attention = يربط الكلمات البعيدة
- Context Window = الذاكرة قصيرة المدى لكل جلسة

#### الدرس 5: مقدمة في النماذج الكبيرة
- المعاملات (Parameters): الأوزان العددية = مقياس الحجم (لكن ليست كل شيء)
- القيود الثلاث الكبرى: هلوسة + knowledge cutoff + context window
- نماذج 2025: GPT-4o، Claude 4، Gemini 2.5، Llama 3.1

#### الدرس 6: جولة أدوات AI
- الكتابة والمحادثة: ChatGPT / Claude / Gemini / Perplexity
- الصور: Midjourney / DALL-E 3 / Adobe Firefly
- الكود: GitHub Copilot / Cursor / Claude
- الصوت: ElevenLabs / Whisper + الفيديو: RunwayML / Sora

#### الدرس 7: مشروع الـ Chatbot
- بناء Chatbot = System Prompt جيد + اختبار + تحسين
- مراحل المشروع: تحديد الهدف → System Prompt → اختبار → تحسين

---

### المصطلحات الأساسية للاختبار

| المصطلح | التعريف المختصر |
|---------|----------------|
| AI | محاكاة الذكاء البشري بالآلات |
| ML (Machine Learning) | أسلوب ضمن AI يعتمد على التعلم من البيانات |
| Deep Learning | ML باستخدام شبكات عصبية متعددة الطبقات |
| LLM | نموذج لغوي كبير مدرّب على تريليونات الكلمات |
| Token | وحدة النص الأساسية في نماذج LLM |
| Context Window | الحد الأقصى للنص في جلسة واحدة |
| Hallucination | اختراع النموذج لمعلومات تبدو صحيحة لكنها خاطئة |
| Transformer | البنية المعمارية خلف كل LLM حديث (2017) |
| Fine-tuning | ضبط النموذج بعد التدريب المبدئي لسلوك معين |
| System Prompt | تعليمات سرية تُحدد هوية وسلوك الـ AI |
| Parameters | الأوزان العددية داخل الشبكة العصبية |
| Knowledge Cutoff | التاريخ الذي يجهل النموذج الأحداث بعده |

---

### أخطاء شائعة تجنّبها

❌ "AI يعرف كل شيء" — لا، لديه Knowledge Cutoff ويهلوس أحياناً

❌ "كل ML هو Deep Learning" — Deep Learning جزء من ML، والعكس غير صحيح

❌ "المعاملات الأكثر = النموذج الأفضل دائماً" — الكفاءة في التدريب وجودة البيانات مهمتان أيضاً

❌ "LLM يفكر مثل الإنسان" — يحسب احتمالات الكلمة التالية، لا يفكر

❌ "الشتاء الأول للـ AI كان في 2000s" — كان في 1974-1980 (قبل ظهور الإنترنت)

---

### نصيحة قبل الاختبار

الاختبار يقيس **الفهم**، لا الحفظ. إذا قدرت تشرح كل مصطلح من الجدول لشخص لا يعرف AI، ستُجيب على كل الأسئلة بثقة.

**التسلسل المهم الذي يجب حفظه:**
Transformer (2017) → Pre-training → Fine-tuning + RLHF → LLM جاهز للاستخدام

بالتوفيق! 🎯`,

      bodyEn: `## Unit 1 Review — Preparing for the Quiz

This lesson summarizes everything you've learned in Unit 1 of the AI Foundations course. Review it carefully before taking the quiz.

### Summary of the Previous Seven Lessons

#### Lesson 1: What is Artificial Intelligence?
- AI = simulating human intelligence with machines
- Three types: Narrow AI (exists now), AGI (theoretical), ASI (future concept)
- 3 factors that exploded AI: data + computing + Transformer algorithm
- Core difference: learning from data ≠ manually writing rules

#### Lesson 2: History of AI
- 1950: Turing asks "Can machines think?" + 1956: Dartmouth Conference (birth of the term)
- Two AI winters: 1974-1980 and 1987-1993 (failed due to resource limitations)
- 2012: AlexNet — the deep learning revolution (ImageNet competition)
- 2017: Transformer paper — architectural parent of every modern LLM
- 2022: ChatGPT — 100 million users in two weeks

#### Lesson 3: AI vs ML vs Deep Learning
- Nested circles: AI ⊃ ML ⊃ Deep Learning
- Every Deep Learning is ML, every ML is AI — but not the reverse
- ChatGPT and Claude: Deep Learning → ML → AI

#### Lesson 4: How Does an LLM Work?
- Core idea: predicts the best next word repeatedly
- 3 build stages: Tokenization → Pre-training → Fine-tuning/RLHF
- Transformer + Attention mechanism = connects distant words
- Context Window = short-term memory for each session

#### Lesson 5: Introduction to LLMs
- Parameters: numerical weights = size metric (but not everything)
- Three big limitations: hallucination + knowledge cutoff + context window
- 2025 models: GPT-4o, Claude 4, Gemini 2.5, Llama 3.1

#### Lesson 6: AI Tools Tour
- Writing and conversation: ChatGPT / Claude / Gemini / Perplexity
- Images: Midjourney / DALL-E 3 / Adobe Firefly
- Code: GitHub Copilot / Cursor / Claude
- Audio: ElevenLabs / Whisper + Video: RunwayML / Sora

#### Lesson 7: Chatbot Project
- Building a chatbot = good System Prompt + testing + improvement
- Project phases: define goal → System Prompt → test → refine

---

### Key Terms for the Quiz

| Term | Brief Definition |
|------|-----------------|
| AI | Simulating human intelligence with machines |
| ML (Machine Learning) | AI approach that learns from data |
| Deep Learning | ML using multi-layer neural networks |
| LLM | Large language model trained on trillions of words |
| Token | The basic text unit in LLM models |
| Context Window | Maximum text capacity in a single session |
| Hallucination | Model inventing information that sounds correct but isn't |
| Transformer | Architectural foundation of every modern LLM (2017) |
| Fine-tuning | Adjusting a model after initial training for specific behavior |
| System Prompt | Hidden instructions defining AI identity and behavior |
| Parameters | Numerical weights inside the neural network |
| Knowledge Cutoff | Date after which the model is unaware of events |

---

### Common Mistakes to Avoid

❌ "AI knows everything" — No, it has a knowledge cutoff and sometimes hallucinates

❌ "Every ML is Deep Learning" — Deep Learning is a subset of ML, not the reverse

❌ "More parameters always = better model" — Training efficiency and data quality also matter

❌ "LLM thinks like a human" — It calculates next-word probabilities, it doesn't think

❌ "The first AI winter was in the 2000s" — It was 1974-1980 (before the internet existed)

---

### Pre-Quiz Tip

The quiz tests **understanding**, not memorization. If you can explain each term in the table to someone who knows nothing about AI, you'll answer every question confidently.

**The important sequence to remember:**
Transformer (2017) → Pre-training → Fine-tuning + RLHF → LLM ready to use

Good luck! 🎯`,
    },
  ],

  "prompt-engineering": [
    // Lesson 1 — ما هي هندسة المطالبات؟
    {
      bodyAr: `## ما هي هندسة المطالبات؟

### التعريف

**هندسة المطالبات (Prompt Engineering)** هي فن وعلم صياغة التعليمات والأسئلة والسياقات الموجَّهة لنماذج اللغة الكبيرة للحصول على النتائج المطلوبة بدقة وكفاءة.

بعبارة أبسط: كيف تتكلم مع AI لتحصل على ما تريد بالضبط.

### لماذا تهمّ هندسة المطالبات؟

نفس النموذج، مطالبتان مختلفتان، نتيجتان مختلفتان تماماً:

**مطالبة ضعيفة:** "اكتب عن الذكاء الاصطناعي"
→ مقال عام ومتوقع وممل

**مطالبة قوية:** "اكتب مقالاً لطالب عمره 16 سنة يسمع عن AI للمرة الأولى. استخدم أمثلة من حياته اليومية. ابدأ بسؤال يُثير فضوله. 300 كلمة."
→ محتوى مستهدف ومؤثر ومفيد

الفرق ليس في النموذج — الفرق في المطالبة.

### المكونات الأساسية للمطالبة

مطالبة احترافية عادةً تحتوي على:

| المكوّن | الوصف | مثال |
|---------|-------|------|
| **المهمة** | ماذا تريد؟ | "لخّص هذا النص" |
| **السياق** | ما الخلفية اللازمة؟ | "هذا تقرير تقني لمدراء" |
| **الجمهور** | لمن الناتج؟ | "القارئ مبتدئ" |
| **الشكل** | كيف يجب أن يكون الناتج؟ | "نقاط مرقّمة، 5 نقاط كحد أقصى" |
| **القيود** | ما الذي يجب تجنّبه؟ | "لا تستخدم مصطلحات تقنية" |

### مثال تدريجي

**المستوى 1 (أساسي):**
"اشرح ما هو machine learning"

**المستوى 2 (محسَّن):**
"اشرح ما هو machine learning لشخص عمله التسويق ولا خلفية تقنية لديه"

**المستوى 3 (احترافي):**
"اشرح ما هو machine learning لمدير تسويق عمره 40 سنة. استخدم تشبيهاً من عالم التسويق. اختم بكيف يمكنه الاستفادة منه في عمله. الطول: 150 كلمة."

### هندسة المطالبات في 2025

مع وجود نماذج قوية مثل Claude وGPT-4، أصبحت هندسة المطالبات مهارة أساسية لكل من:
- المطورين الذين يبنون تطبيقات AI
- المحترفين الذين يستخدمون AI في عملهم اليومي
- أصحاب الأعمال الذين يريدون أتمتة مهامهم`,

      bodyEn: `## What is Prompt Engineering?

### Definition

**Prompt Engineering** is the art and science of crafting instructions, questions, and context for large language models to get the desired results with precision and efficiency.

Simply put: how you talk to AI to get exactly what you want.

### Why Does Prompt Engineering Matter?

Same model, two different prompts, two completely different results:

**Weak prompt:** "Write about artificial intelligence"
→ Generic, predictable, boring article

**Strong prompt:** "Write an article for a 16-year-old hearing about AI for the first time. Use examples from their daily life. Start with a question that sparks curiosity. 300 words."
→ Targeted, impactful, useful content

The difference isn't the model — it's the prompt.

### Core Components of a Prompt

A professional prompt usually includes:

| Component | Description | Example |
|-----------|-------------|---------|
| **Task** | What do you want? | "Summarize this text" |
| **Context** | What background is needed? | "This is a technical report for managers" |
| **Audience** | Who is the output for? | "The reader is a beginner" |
| **Format** | How should the output look? | "Numbered bullets, max 5 points" |
| **Constraints** | What should be avoided? | "No technical jargon" |

### Progressive Example

**Level 1 (Basic):**
"Explain what machine learning is"

**Level 2 (Improved):**
"Explain machine learning to someone in marketing with no technical background"

**Level 3 (Professional):**
"Explain machine learning to a 40-year-old marketing manager. Use an analogy from the marketing world. Conclude with how they can benefit from it in their work. Length: 150 words."

### Prompt Engineering in 2025

With powerful models like Claude and GPT-4, prompt engineering has become an essential skill for:
- Developers building AI applications
- Professionals using AI in their daily work
- Business owners wanting to automate tasks`,
    },

    // Lesson 2 — المطالبة الفعالة: المبادئ الأساسية
    {
      bodyAr: `## مبادئ المطالبة الفعالة

### المبدأ الأول: الوضوح فوق كل شيء

نموذج AI لا يقرأ أفكارك — يقرأ كلماتك فقط. كن محدداً بدلاً من الغامض.

**غامض:** "حسّن هذا الكود"
**محدد:** "حسّن أداء هذه الدالة في Python. المشكلة: بطيئة مع قوائم > 10,000 عنصر. الهدف: تقليل وقت التنفيذ بـ 50% على الأقل"

### المبدأ الثاني: السياق يغيّر كل شيء

AI لا يعرف شيئاً عن وضعك ما لم تخبره. اعطِ السياق الكافي.

**بدون سياق:** "اكتب بريداً إلكترونياً"
**مع سياق:** "اكتب بريداً إلكترونياً لعميل أخّر دفعته 3 أسابيع. نبرة: محترمة لكن حازمة. لا تذكر رقم الفاتورة صراحة"

### المبدأ الثالث: حدّد الشكل المطلوب

لا تتوقع من AI معرفة كيف تريد الناتج. قله صراحة.

| بدلاً من | قل |
|----------|-----|
| "اشرح" | "اشرح في 3 نقاط مرقّمة" |
| "قيّم" | "قيّم في جدول بأعمدة: المزايا / العيوب / التوصية" |
| "لخّص" | "لخّص في جملتين للمدير التنفيذي" |

### المبدأ الرابع: دور + مهمة = نتائج أفضل

إخبار النموذج بدور محدد يُحسّن الناتج كثيراً.

**بدون دور:** "راجع هذا العقد"
**مع دور:** "أنت محامٍ متخصص في عقود العمل في السعودية. راجع هذا العقد وحدّد أي بنود غير معتادة أو مخاطر محتملة على الموظف"

### المبدأ الخامس: التكرار والتحسين

المطالبة الأولى نادراً ما تكون المثالية. اعتبرها مسودة أولى:

1. ابدأ بمطالبة أساسية
2. قيّم الناتج: ما الذي ينقصه؟
3. أضف تعليمات أكثر دقة
4. كرّر حتى تصل للمطلوب

### قاعدة الإبهام

إذا كنت تشرح المهمة لزميل لا يعرف أي شيء عن سياقك، ستُعطيه نفس التفاصيل التي يجب أن تُعطيها للنموذج.`,

      bodyEn: `## Principles of Effective Prompting

### Principle 1: Clarity Above All

An AI model doesn't read your mind — it reads your words only. Be specific instead of vague.

**Vague:** "Improve this code"
**Specific:** "Improve the performance of this Python function. Problem: slow with lists > 10,000 elements. Goal: reduce execution time by at least 50%"

### Principle 2: Context Changes Everything

AI knows nothing about your situation unless you tell it. Provide sufficient context.

**Without context:** "Write an email"
**With context:** "Write an email to a client who has delayed their payment for 3 weeks. Tone: professional but firm. Don't mention the invoice number explicitly"

### Principle 3: Specify the Desired Format

Don't expect AI to know how you want the output. Tell it explicitly.

| Instead of | Say |
|------------|-----|
| "Explain" | "Explain in 3 numbered points" |
| "Evaluate" | "Evaluate in a table with columns: Pros / Cons / Recommendation" |
| "Summarize" | "Summarize in two sentences for the CEO" |

### Principle 4: Role + Task = Better Results

Giving the model a specific role significantly improves output.

**Without role:** "Review this contract"
**With role:** "You are a lawyer specializing in employment contracts in Saudi Arabia. Review this contract and identify any unusual clauses or potential risks for the employee"

### Principle 5: Iteration and Improvement

The first prompt is rarely the perfect one. Treat it as a first draft:

1. Start with a basic prompt
2. Evaluate the output: what's missing?
3. Add more precise instructions
4. Repeat until you reach the goal

### The Thumb Rule

If you were explaining the task to a colleague who knows nothing about your context, you'd give them the same details you should give to the model.`,
    },

    // Lesson 3 — Chain-of-Thought
    {
      bodyAr: `## Chain-of-Thought Prompting

### ما هو Chain-of-Thought؟

**Chain-of-Thought (CoT)** هو أسلوب مطالبة يطلب من النموذج شرح خطوات تفكيره بالتفصيل قبل الوصول إلى الإجابة النهائية.

بدلاً من "أجب مباشرة"، تقول له: "فكّر بصوت عالٍ خطوة بخطوة".

### لماذا يعمل CoT؟

الشبكات العصبية تُنتج tokens بالتسلسل. عندما تطلب من النموذج "التفكير بصوت عالٍ"، فأنت في الواقع تعطيه مساحة حسابية إضافية لتطوير المنطق قبل الإجابة. هذا يُحسّن دقة المسائل المعقدة بشكل ملحوظ.

### متى تستخدم CoT؟

✅ **مناسب لـ:**
- المسائل الرياضية والمنطقية
- التحليلات متعددة الخطوات
- القرارات التي تحتاج وزن عوامل متعددة
- التحقق من الاستدلال

❌ **غير ضروري لـ:**
- الأسئلة البسيطة والمباشرة
- المهام الإبداعية
- الترجمة البسيطة

### أساليب تفعيل CoT

**الأسلوب 1: "فكّر خطوة بخطوة"**
أبسط طريقة. فقط أضف في نهاية مطالبتك:
"فكّر خطوة بخطوة قبل إعطاء إجابتك النهائية"

**الأسلوب 2: Few-Shot CoT**
أعطِ مثالاً على كيفية التفكير:
"إليك مثال على كيفية حل المسألة: [مثال مع خطوات التفكير]. الآن حلّ المسألة التالية بنفس الأسلوب."

**الأسلوب 3: تقسيم صريح**
"حلّل المشكلة في خطوات:
1. تحديد المعطيات
2. تحليل العلاقات
3. استخلاص الحل
4. التحقق من الإجابة"

### مقارنة: مع CoT وبدونه

**السؤال:** في متجر خصم 20% على منتج قيمته 250 ريال. ثم أضاف ضريبة 15%. ما السعر النهائي؟

**بدون CoT (قد يخطئ):**
"السعر النهائي: 230 ريال" ← خطأ

**مع CoT:**
"خطوة 1: الخصم 20% = 250 × 0.2 = 50 ريال
خطوة 2: السعر بعد الخصم = 250 - 50 = 200 ريال
خطوة 3: الضريبة 15% = 200 × 0.15 = 30 ريال
خطوة 4: السعر النهائي = 200 + 30 = 230 ريال ← صحيح"

انتظر — في هذا المثال الإجابتان متساويتان! لكن في المسائل الأكثر تعقيداً يظهر الفرق جلياً.

### قاعدة عملية

كلما زاد تعقيد المهمة وعدد خطواتها، كلما زادت قيمة Chain-of-Thought.`,

      bodyEn: `## Chain-of-Thought Prompting

### What is Chain-of-Thought?

**Chain-of-Thought (CoT)** is a prompting technique that asks the model to explain its reasoning steps in detail before reaching the final answer.

Instead of "answer directly," you tell it: "think out loud, step by step."

### Why Does CoT Work?

Neural networks produce tokens sequentially. When you ask the model to "think out loud," you're giving it extra computational space to develop reasoning before answering. This significantly improves accuracy on complex problems.

### When to Use CoT?

✅ **Good for:**
- Math and logic problems
- Multi-step analysis
- Decisions weighing multiple factors
- Verifying reasoning chains

❌ **Not necessary for:**
- Simple, direct questions
- Creative tasks
- Basic translation

### Ways to Activate CoT

**Method 1: "Think step by step"**
The simplest approach. Just add to the end of your prompt:
"Think step by step before giving your final answer"

**Method 2: Few-Shot CoT**
Give an example of how to reason:
"Here's an example of how to solve the problem: [example with thinking steps]. Now solve the following problem the same way."

**Method 3: Explicit breakdown**
"Analyze the problem in steps:
1. Identify the given information
2. Analyze the relationships
3. Derive the solution
4. Verify the answer"

### Comparison: With and Without CoT

**Question:** A store applies a 20% discount on a product worth $250, then adds 15% tax. What is the final price?

**Without CoT (may err on complex versions):**
Rushes to an answer without showing work

**With CoT:**
"Step 1: 20% discount = 250 × 0.2 = $50
Step 2: Price after discount = 250 - 50 = $200
Step 3: 15% tax = 200 × 0.15 = $30
Step 4: Final price = 200 + 30 = $230"

### Practical Rule

The more complex and multi-step the task, the greater the value of Chain-of-Thought.`,
    },

    // Lesson 4 — Few-Shot وZero-Shot
    {
      bodyAr: `## Few-Shot وZero-Shot Prompting

### Zero-Shot: الطلب المباشر

**Zero-Shot Prompting** يعني طلب مهمة من النموذج مباشرة دون أي مثال مسبق.

أنت تثق في أن النموذج يفهم المهمة من وصفها فقط.

**مثال:**
"صنّف هذه المراجعة كـ إيجابية، سلبية، أو محايدة: 'المنتج كان مناسباً ولكن التوصيل تأخر'"

هذا zero-shot لأنك لم تُعطِ أي مثال على التصنيف.

### Few-Shot: التعليم بالأمثلة

**Few-Shot Prompting** يعني تقديم عدة أمثلة على المدخل والمخرج المطلوب قبل المهمة الفعلية.

الأمثلة تُعلّم النموذج "الصيغة" التي تريدها.

**مثال:**

\`\`\`
صنّف المراجعات التالية:

المراجعة: "جودة ممتازة، سعر مناسب"
التصنيف: إيجابي

المراجعة: "لم تصل الطلبية، خدمة سيئة"
التصنيف: سلبي

المراجعة: "المنتج عادي، لا أنصح ولا أحذّر"
التصنيف: محايد

الآن صنّف:
المراجعة: "المنتج كان مناسباً ولكن التوصيل تأخر"
التصنيف:
\`\`\`

### متى تستخدم أيّاً منهما؟

| الموقف | الأنسب | السبب |
|--------|--------|-------|
| مهمة شائعة وواضحة | Zero-Shot | النموذج يفهمها بدون أمثلة |
| تريد صيغة أو أسلوب محدد | Few-Shot | الأمثلة تُعلّم النمط |
| ناتج غير متوقع أو خاطئ | Few-Shot | الأمثلة تُصحّح المسار |
| مهمة فريدة لمشروعك | Few-Shot | قد لا يكون النموذج تعلّم هذا النمط |

### عدد الأمثلة: كم يكفي؟

- **1-2 مثال:** One-shot — مفيد لضبط الأسلوب
- **3-5 أمثلة:** Few-shot — توازن جيد بين التكلفة والدقة
- **+10 أمثلة:** Many-shot — مفيد لمهام معقدة جداً

أكثر لا يعني دائماً أفضل — جودة الأمثلة أهم من كميتها.

### نصيحة احترافية

اختر أمثلة تُغطّي حالات الحافة (edge cases)، لا فقط الحالات الواضحة. إذا كانت مهمتك "تصنيف المشاعر"، أضف مثالاً ساخراً أو غامضاً حتى يفهم النموذج كيف يتعامل معه.`,

      bodyEn: `## Few-Shot and Zero-Shot Prompting

### Zero-Shot: The Direct Request

**Zero-Shot Prompting** means asking the model to perform a task directly without any prior examples.

You trust that the model understands the task from its description alone.

**Example:**
"Classify this review as Positive, Negative, or Neutral: 'The product was fine but delivery was late'"

This is zero-shot because you gave no classification examples.

### Few-Shot: Teaching by Example

**Few-Shot Prompting** means providing several examples of the desired input/output format before the actual task.

The examples teach the model the "template" you want.

**Example:**

\`\`\`
Classify the following reviews:

Review: "Excellent quality, fair price"
Classification: Positive

Review: "Order never arrived, terrible service"
Classification: Negative

Review: "Product is average, no strong feelings either way"
Classification: Neutral

Now classify:
Review: "The product was fine but delivery was late"
Classification:
\`\`\`

### When to Use Each?

| Situation | Best choice | Reason |
|-----------|-------------|--------|
| Common, clear task | Zero-Shot | Model understands without examples |
| You want a specific style/format | Few-Shot | Examples teach the pattern |
| Unexpected or wrong output | Few-Shot | Examples correct the direction |
| Task unique to your project | Few-Shot | Model may not have learned this pattern |

### Number of Examples: How Many is Enough?

- **1-2 examples:** One-shot — useful for style adjustment
- **3-5 examples:** Few-shot — good balance of cost and accuracy
- **10+ examples:** Many-shot — useful for very complex tasks

More isn't always better — quality of examples matters more than quantity.

### Pro Tip

Choose examples that cover edge cases, not just obvious ones. If your task is "sentiment classification," include a sarcastic or ambiguous example so the model knows how to handle it.`,
    },

    // Lesson 5 — System Prompts
    {
      bodyAr: `## System Prompts — سر التحكم في سلوك AI

### ما هو الـ System Prompt؟

الـ **System Prompt** هو مجموعة تعليمات سرية تُرسل إلى النموذج قبل أي محادثة مع المستخدم. المستخدم لا يراها، لكنها تُحدد هوية النموذج وسلوكه وقيوده طوال الجلسة كاملة.

فكّر فيه كـ "تعليمات السيناريو" التي يحفظها الممثل قبل الأداء — الجمهور لا يراها، لكنها تُشكّل كل ما يقوله ويفعله.

### الفرق بين System Prompt وUser Message

| | System Prompt | User Message |
|--|--------------|--------------|
| **من يراه؟** | النموذج فقط | المستخدم والنموذج |
| **متى يُرسل؟** | قبل بدء المحادثة | في كل رسالة جديدة |
| **الغرض** | تحديد الهوية والقواعد والسياق | طرح السؤال أو الطلب |
| **يتغير في الجلسة؟** | ثابت طوال الجلسة | يتغير في كل دور |
| **في الـ API** | حقل \`system\` | حقل \`messages\` |

### أناتومي الـ System Prompt الفعّال

System Prompt جيد يحتوي على أربعة عناصر أساسية:

**1. الهوية والدور (Persona)**
من هو النموذج في هذه الجلسة؟
\`\`\`
أنت مساعد طبي لعيادة طب الأسرة في الرياض.
\`\`\`

**2. القواعد والقيود (Constraints)**
ماذا يجب فعله وماذا يُمنع؟
\`\`\`
لا تشخّص الأمراض أبداً. أحِل دائماً لطبيب مختص.
لا تذكر أدوية بالاسم التجاري.
\`\`\`

**3. الشكل والأسلوب (Format)**
كيف يجب أن تكون الإجابات؟
\`\`\`
أجب بنقاط مرقّمة للتعليمات. استخدم العربية الفصحى.
لا تتجاوز 150 كلمة في الرد الواحد.
\`\`\`

**4. السياق المرجعي (Context)**
ما المعلومات الثابتة التي يحتاجها النموذج؟
\`\`\`
ساعات العيادة: 8 صباحاً - 8 مساءً.
التخصصات: طب الأسرة، الأطفال، الجلدية.
الحجز: اتصل على 920-XXX-XXX.
\`\`\`

### مثال متدرّج: من ضعيف إلى احترافي

**المستوى 1 — بدون System Prompt:**
المستخدم يسأل: "كيف أُقلّع جهازي؟"
النموذج يُعطي إجابة عامة جداً لأنه لا يعرف السياق.

---

**المستوى 2 — System Prompt بسيط:**
\`\`\`
أنت مساعد تقني.
\`\`\`
أفضل قليلاً، لكن لا يزال غير محدد.

---

**المستوى 3 — System Prompt متكامل:**
\`\`\`
أنت "دعم درهوس"، المساعد التقني لشركة Darhous Tech.
منتجاتنا: حواسيب Dell، طابعات HP، شاشات Samsung.

القواعد:
- أجب باللغة التي يستخدمها العميل
- إذا لم تعرف الإجابة، أحِل لـ support@darhous.com
- لا تذكر منافسين بالاسم

الشكل:
- خطوات مرقّمة للإجراءات
- جمل قصيرة للشرح
- لا تتجاوز 200 كلمة
\`\`\`
النتيجة: إجابات دقيقة ومتسقة في كل محادثة.

### متى تستخدم System Prompt؟

✅ بناء chatbot أو مساعد مخصص
✅ API calls في تطبيق برمجي
✅ ضبط أسلوب ثابت لمهمة متكررة
✅ تحديد لغة أو شكل الإخراج دائماً
✅ حماية التطبيق من الاستخدامات خارج النطاق

❌ محادثة عادية في claude.ai — يكفي تضمين التعليمات في الرسالة
❌ مهمة لمرة واحدة — System Prompt للجلسات المتكررة

### أفضل الممارسات

**اجعله محدداً لا عاماً:**
❌ \`كن مفيداً وودّياً\`
✅ \`رُد في جملتين كحد أقصى. ابدأ دائماً بإقرار المشكلة\`

**حدّد القيود صراحة:**
✅ \`لا تناقش السياسة أو الدين مطلقاً\`
✅ \`لا تعطِ معلومات طبية تتجاوز النصح بزيارة الطبيب\`

**أضف أمثلة على السلوك المطلوب:**
\`\`\`
إذا سأل العميل عن سعر: "سعر المنتج X هو Y ريال بالضريبة"
إذا لم تعرف: "هذا السؤال يحتاج متخصصاً، سأحيلك لفريق الدعم"
\`\`\`

**اختبر حالات الحافة دائماً:**
بعد كتابة System Prompt، اختبر بأسئلة صعبة أو خارج النطاق لتتأكد من سلوك النموذج.

**احتفظ به موجزاً نسبياً:**
System Prompt أطول من 2000 token قد يُخفف انتباه النموذج للقواعد. ركّز على الجوهري فقط.

### الفرق بين System Prompt في Claude وChatGPT

كلاهما يدعم System Prompt في الـ API، لكن:
- **Claude**: يحترم System Prompt بدقة عالية ويلتزم بالقيود
- **ChatGPT**: قد يتجاوز بعض القيود في حالات معينة بسبب التدريب

### خلاصة الدرس

- System Prompt = تعليمات سرية تُشكّل هوية النموذج وسلوكه
- عناصره الأربعة: هوية + قواعد + شكل + سياق
- المفتاح: التحديد لا العمومية، وصراحة القيود
- اختبره دائماً مع حالات الحافة قبل النشر`,

      bodyEn: `## System Prompts — The Secret to Controlling AI Behavior

### What is a System Prompt?

A **System Prompt** is a set of hidden instructions sent to the model before any user conversation begins. The user never sees them, but they define the model's identity, behavior, and constraints for the entire session.

Think of it as "stage directions" an actor memorizes before performing — the audience never sees them, but they shape everything the actor says and does.

### System Prompt vs User Message

| | System Prompt | User Message |
|--|--------------|--------------|
| **Who sees it?** | The model only | Both user and model |
| **When sent?** | Before conversation starts | With each new message |
| **Purpose** | Define identity, rules, context | Ask a question or make a request |
| **Changes in session?** | Fixed throughout the session | Changes with each turn |
| **In the API** | \`system\` field | \`messages\` field |

### Anatomy of an Effective System Prompt

A good System Prompt has four essential elements:

**1. Identity and Role (Persona)**
Who is the model in this session?
\`\`\`
You are a medical assistant for a family medicine clinic in Riyadh.
\`\`\`

**2. Rules and Constraints**
What should it do and what is forbidden?
\`\`\`
Never diagnose illnesses. Always refer to a qualified doctor.
Never mention medications by brand name.
\`\`\`

**3. Format and Style**
How should responses be structured?
\`\`\`
Use numbered steps for instructions. Use professional English.
Keep each response under 150 words.
\`\`\`

**4. Reference Context**
What fixed information does the model need?
\`\`\`
Clinic hours: 8 AM - 8 PM.
Specialties: Family medicine, pediatrics, dermatology.
Appointments: Call 920-XXX-XXX.
\`\`\`

### Progressive Example: From Weak to Professional

**Level 1 — No System Prompt:**
User asks: "How do I restart my device?"
Model gives a generic, unhelpful answer because it has no context.

---

**Level 2 — Simple System Prompt:**
\`\`\`
You are a technical assistant.
\`\`\`
Slightly better, but still vague.

---

**Level 3 — Complete System Prompt:**
\`\`\`
You are "Darhous Support," the technical assistant for Darhous Tech.
Our products: Dell computers, HP printers, Samsung monitors.

Rules:
- Respond in the language the customer uses
- If you don't know, refer to support@darhous.com
- Never mention competitor brands by name

Format:
- Numbered steps for procedures
- Short sentences for explanations
- Maximum 200 words per response
\`\`\`
Result: Accurate, consistent responses in every conversation.

### When to Use a System Prompt?

✅ Building a custom chatbot or assistant
✅ API calls in a software application
✅ Establishing a consistent style for a recurring task
✅ Always fixing the output language or format
✅ Protecting the app from out-of-scope uses

❌ Regular conversation in claude.ai — just include instructions in your message
❌ One-time tasks — system prompts are for repeated, consistent sessions

### Best Practices

**Be specific, not general:**
❌ \`Be helpful and friendly\`
✅ \`Respond in two sentences maximum. Always begin by acknowledging the problem\`

**State constraints explicitly:**
✅ \`Never discuss politics or religion under any circumstances\`
✅ \`Never provide medical information beyond advising the user to see a doctor\`

**Add examples of desired behavior:**
\`\`\`
If customer asks about price: "Product X costs $Y including tax"
If you don't know: "This question needs a specialist — I'll connect you with support"
\`\`\`

**Always test edge cases:**
After writing a System Prompt, test with difficult or out-of-scope questions to verify model behavior before deployment.

**Keep it reasonably concise:**
A System Prompt longer than ~2000 tokens may dilute the model's attention to the rules. Focus on what's essential.

### Summary

- System Prompt = hidden instructions shaping the model's identity and behavior
- Four elements: identity + rules + format + context
- The key: be specific not general, state constraints explicitly
- Always test with edge cases before deploying`,

      codeExample: `import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

# The System Prompt defines identity, rules, format, and context
SYSTEM_PROMPT = """
You are "Darhous Support," the technical assistant for Darhous Tech.
Our products: Dell computers, HP printers, Samsung monitors.

Rules:
- Respond in the language the customer uses
- If you don't know the answer, refer to support@darhous.com
- Never mention competitor brands by name

Format: numbered steps for procedures, short sentences for explanations.
"""

def ask(question: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=500,
        system=SYSTEM_PROMPT,    # <-- System Prompt goes here
        messages=[
            {"role": "user", "content": question}  # <-- User message here
        ]
    )
    return response.content[0].text

# The system prompt shapes ALL these responses consistently
print(ask("How do I restart my Dell laptop?"))
print(ask("My HP printer is offline, what do I do?"))
print(ask("كيف أُعيد ضبط طابعتي إلى إعدادات المصنع؟"))`,
      codeLanguage: "python",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // C6 — python-for-ai (8 lessons) — added 2026-06-05
  // ─────────────────────────────────────────────────────────────
  "python-for-ai": [

    // Lesson 1 — تثبيت Python وإعداد البيئة
    {
      bodyAr: `## تثبيت Python وإعداد البيئة

قبل أن تكتب سطر كود واحد، تحتاج إلى بيئة عمل مناسبة.

### لماذا Python؟

Python هي اللغة الأولى في عالم الذكاء الاصطناعي:

| الميزة | التفصيل |
|--------|--------|
| **سهولة القراءة** | صياغة تشبه الإنجليزية البسيطة |
| **المكتبات** | NumPy · Pandas · TensorFlow · PyTorch |
| **المجتمع** | أكبر مجتمع ML في العالم |
| **الطلب الوظيفي** | 90%+ من وظائف Data Science تطلب Python |

### خيار 1: Google Colab (موصى به للمبتدئين)

Colab هو Jupyter Notebook سحابي من Google — لا تثبيت، لا إعداد، ومجاني.

1. اذهب إلى: **colab.research.google.com**
2. سجّل بحساب Google
3. اضغط **New Notebook**
4. اكتب \`print("مرحباً AI!")\` واضغط ▶

**مميزاته:** GPU مجاني · مكتبات مثبّتة مسبقاً · لا يحتاج RAM من جهازك

### خيار 2: التثبيت المحلي

**الخطوة 1:** حمّل Python 3.11+ من **python.org/downloads**
تأكد من تفعيل ✅ **Add Python to PATH** أثناء التثبيت.

**الخطوة 2:** ثبّت VS Code من **code.visualstudio.com** + إضافة Python.

**الخطوة 3 — بيئة افتراضية:**

\`\`\`bash
python -m venv ai-env
# Windows:
ai-env\\Scripts\\activate
# Mac/Linux:
source ai-env/bin/activate
\`\`\`

### pip — مدير الحزم

\`\`\`bash
pip install numpy pandas matplotlib scikit-learn
pip list
\`\`\`

### التحقق من التثبيت

\`\`\`python
import sys, numpy as np, pandas as pd
print(f"Python: {sys.version}")
print(f"NumPy: {np.__version__}  Pandas: {pd.__version__}")
print("كل شيء جاهز! ✅")
\`\`\`

### خلاصة الدرس

- **Colab** = الخيار الأسرع والمثالي للتعلم
- **Python.org** + **VS Code** = الخيار للعمل الجدي
- **pip** = أداة تثبيت المكتبات
- **Virtual Environment** = عزل مشاريعك عن بعضها`,

      bodyEn: `## Installing Python and Setting Up Your Environment

Before writing a single line of code, you need a proper working environment.

### Why Python?

Python is the #1 language in the AI world:

| Feature | Detail |
|---------|--------|
| **Readability** | Syntax that reads like simple English |
| **Libraries** | NumPy · Pandas · TensorFlow · PyTorch |
| **Community** | Largest ML community in the world |
| **Job demand** | 90%+ of Data Science roles require Python |

### Option 1: Google Colab (Recommended)

Colab is a cloud Jupyter Notebook from Google — no installation, no setup, free.

1. Go to: **colab.research.google.com**
2. Sign in with a Google account
3. Click **New Notebook**
4. Type \`print("Hello AI!")\` and press ▶

**Advantages:** Free GPU · Pre-installed AI libraries · No RAM needed from your machine

### Option 2: Local Installation

**Step 1:** Download Python 3.11+ from **python.org/downloads**
Enable ✅ **Add Python to PATH** during installation.

**Step 2:** Install VS Code from **code.visualstudio.com** + Python extension.

**Step 3 — Virtual Environment:**

\`\`\`bash
python -m venv ai-env
# Windows: ai-env\\Scripts\\activate
# Mac/Linux: source ai-env/bin/activate
\`\`\`

### pip — Package Manager

\`\`\`bash
pip install numpy pandas matplotlib scikit-learn
pip list
\`\`\`

### Verifying Your Setup

\`\`\`python
import sys, numpy as np, pandas as pd
print(f"Python: {sys.version}")
print(f"NumPy: {np.__version__}  Pandas: {pd.__version__}")
print("Everything is ready! ✅")
\`\`\`

### Lesson Summary

- **Colab** = fastest option, ideal for learning
- **Python.org** + **VS Code** = option for serious work
- **pip** = library installation tool
- **Virtual Environment** = isolate projects from each other`,

      codeExample: `# ✅ التحقق من بيئة Python
import sys
print(f"إصدار Python: {sys.version}")

# تثبيت المكتبات في Colab (الخلية الأولى دائماً)
# !pip install numpy pandas matplotlib scikit-learn

try:
    import numpy as np
    import pandas as pd
    import matplotlib
    print(f"✅ NumPy {np.__version__}")
    print(f"✅ Pandas {pd.__version__}")
    print(f"✅ Matplotlib {matplotlib.__version__}")
    print("\n🎉 بيئتك جاهزة للذكاء الاصطناعي!")
except ImportError as e:
    print(f"❌ مكتبة ناقصة: {e}")
    print("شغّل: pip install numpy pandas matplotlib")

name = "مبرمج AI"
print(f"مرحباً {name}! رحلتك في Python للـ AI بدأت الآن 🚀")`,
      codeLanguage: "python",
    },

    // Lesson 2 — المتغيرات وأنواع البيانات
    {
      bodyAr: `## المتغيرات وأنواع البيانات

المتغيرات هي الطريقة التي يخزّن بها برنامجك المعلومات. فهمها جيداً أساسٌ لكل ما سيأتي في AI.

### ما هو المتغير؟

في Python لا تحتاج لتحديد النوع مسبقاً — يكتشفه تلقائياً.

\`\`\`python
name = "Ahmed"        # نص (str)
age = 25              # عدد صحيح (int)
score = 98.5          # عدد عشري (float)
is_student = True     # قيمة منطقية (bool)
\`\`\`

### أنواع البيانات الأساسية

| النوع | الاسم | مثال | الاستخدام في AI |
|------|------|------|----------------|
| \`int\` | عدد صحيح | \`42\` | عدد epochs، حجم batch |
| \`float\` | عدد عشري | \`0.001\` | learning rate، accuracy |
| \`str\` | نص | \`"GPT"\` | أسماء النماذج، النصوص |
| \`bool\` | منطقي | \`True\` | flags، شروط التدريب |

### القائمة (List)

\`\`\`python
scores = [95, 87, 92, 88, 91]
models = ["GPT-4", "Claude", "Gemini"]
print(scores[0])    # 95
print(models[-1])   # Gemini
print(scores[1:3])  # [87, 92]
models.append("Llama")
\`\`\`

### القاموس (Dict)

\`\`\`python
model_info = {
    "name": "Claude",
    "company": "Anthropic",
    "context": 200000,
}
print(model_info["name"])    # Claude
model_info["version"] = "claude-opus-4-5"
\`\`\`

### Tuple والـ Set

\`\`\`python
dimensions = (224, 224, 3)       # حجم صورة CNN — لا يتغير
unique_labels = {0, 1, 2, 1, 0}
print(unique_labels)  # {0, 1, 2}
\`\`\`

### f-Strings

\`\`\`python
model = "Claude"
accuracy = 94.7
result = f"النموذج {model} وصل لـ {accuracy}%"
print(result)
\`\`\`

### خلاصة الدرس

- المتغيرات: اسم يشير إلى قيمة في الذاكرة
- الأنواع الأساسية: **int · float · str · bool**
- القوائم: مرتّبة وقابلة للتعديل
- القواميس: مفتاح-قيمة، سريعة البحث
- **f-strings**: أفضل طريقة لبناء النصوص في Python الحديثة`,

      bodyEn: `## Variables and Data Types

Variables are how your program stores information. Understanding them is the foundation for everything in AI.

### What is a Variable?

In Python you don't need to declare the type — it's inferred automatically.

\`\`\`python
name = "Ahmed"        # text (str)
age = 25              # integer (int)
score = 98.5          # decimal (float)
is_student = True     # boolean (bool)
\`\`\`

### Basic Data Types

| Type | Name | Example | Use in AI |
|------|------|---------|----------|
| \`int\` | Integer | \`42\` | epoch count, batch size |
| \`float\` | Decimal | \`0.001\` | learning rate, accuracy |
| \`str\` | Text | \`"GPT"\` | model names, text data |
| \`bool\` | Boolean | \`True\` | flags, training conditions |

### List

\`\`\`python
scores = [95, 87, 92, 88, 91]
models = ["GPT-4", "Claude", "Gemini"]
print(scores[0])    # 95
print(models[-1])   # Gemini
print(scores[1:3])  # [87, 92]
models.append("Llama")
\`\`\`

### Dictionary

\`\`\`python
model_info = {
    "name": "Claude",
    "company": "Anthropic",
    "context": 200000,
}
print(model_info["name"])    # Claude
model_info["version"] = "claude-opus-4-5"
\`\`\`

### Tuple and Set

\`\`\`python
dimensions = (224, 224, 3)       # CNN image size — immutable
unique_labels = {0, 1, 2, 1, 0}
print(unique_labels)  # {0, 1, 2}
\`\`\`

### f-Strings

\`\`\`python
model = "Claude"
accuracy = 94.7
result = f"Model {model} reached {accuracy}%"
print(result)
\`\`\`

### Lesson Summary

- Variables: a name pointing to a value in memory
- Basic types: **int · float · str · bool**
- Lists: ordered and mutable
- Dictionaries: key-value, fast lookup
- **f-strings**: best way to build strings in modern Python`,

      codeExample: `# ─── متغيرات وأنواع البيانات في سياق AI ───

model_name = "claude-opus-4-5"
accuracy = 0.947
training_epochs = 50
is_deployed = True

print(f"النموذج: {model_name}")
print(f"الدقة: {accuracy * 100:.1f}%")

epoch_losses = [2.5, 1.8, 1.2, 0.9, 0.7, 0.6, 0.55, 0.52]
print(f"\nالـ loss الأول: {epoch_losses[0]}")
print(f"الـ loss الأخير: {epoch_losses[-1]}")
print(f"عدد epochs: {len(epoch_losses)}")

models = {
    "GPT-4":  {"company": "OpenAI",    "context": 128_000},
    "Claude": {"company": "Anthropic", "context": 200_000},
    "Gemini": {"company": "Google",    "context": 1_000_000},
}

print("\n--- مقارنة النماذج ---")
for name, info in models.items():
    print(f"{name}: {info['company']} | {info['context']:,} token")

raw_score = "87.5"
score_float = float(raw_score)
score_int = int(score_float)
print(f"\nالدرجة: {raw_score!r} → {score_float} → {score_int}")
print(f"نوع accuracy: {type(accuracy).__name__}")`,
      codeLanguage: "python",
    },

    // Lesson 3 — الحلقات والشروط
    {
      bodyAr: `## الحلقات والشروط

الحلقات والشروط هي العمود الفقري لأي برنامج. في AI تستخدمها في كل مكان: من حلقات التدريب إلى تصفية البيانات.

### الشروط (if / elif / else)

\`\`\`python
score = 87
if score >= 90:
    grade = "ممتاز"
elif score >= 75:
    grade = "جيد جداً"
elif score >= 60:
    grade = "جيد"
else:
    grade = "يحتاج تحسين"
print(f"الدرجة: {grade}")  # جيد جداً
\`\`\`

### تقييم نموذج AI

\`\`\`python
accuracy = 0.92
if accuracy >= 0.95:
    print("النموذج ممتاز — جاهز للإنتاج ✅")
elif accuracy >= 0.85:
    print("النموذج جيد — يحتاج تحسين 🔄")
else:
    print("النموذج يحتاج إعادة تدريب ❌")
\`\`\`

### حلقة for

\`\`\`python
models = ["GPT-4", "Claude", "Gemini", "Llama"]
for model in models:
    print(f"  - {model}")

for epoch in range(1, 6):
    loss = 2.5 / epoch
    print(f"Epoch {epoch}: loss = {loss:.3f}")
\`\`\`

### for مع enumerate

\`\`\`python
results = [0.78, 0.85, 0.91, 0.93]
for i, acc in enumerate(results, start=1):
    print(f"Epoch {i}: {acc * 100:.1f}%")
\`\`\`

### حلقة while

\`\`\`python
loss, epoch = 1.0, 0
while loss > 0.1:
    loss *= 0.7
    epoch += 1
print(f"تقارب بعد {epoch} epochs!")
\`\`\`

### break و continue

\`\`\`python
for loss in [1.5, 0.8, 0.4, 0.05]:
    if loss < 0.1:
        print("توقف مبكر!")
        break
    if loss > 1.0:
        continue
    print(f"loss = {loss:.2f}")
\`\`\`

### List Comprehension

\`\`\`python
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

high_scores = [s for s in [72, 91, 65, 88, 55] if s >= 75]
print(high_scores)  # [91, 88]
\`\`\`

### خلاصة الدرس

- **if/elif/else**: اتخاذ القرار حسب الشروط
- **for**: تكرار على قائمة أو range
- **while**: تكرار حتى يتحقق شرط
- **break/continue**: التحكم في سير الحلقة
- **List Comprehension**: بناء القوائم بطريقة Python الأنيقة`,

      bodyEn: `## Loops and Conditions

Loops and conditions are the backbone of any program. In AI you use them everywhere.

### Conditions (if / elif / else)

\`\`\`python
score = 87
if score >= 90:
    grade = "Excellent"
elif score >= 75:
    grade = "Very Good"
elif score >= 60:
    grade = "Good"
else:
    grade = "Needs Improvement"
print(f"Grade: {grade}")  # Very Good
\`\`\`

### Evaluating an AI Model

\`\`\`python
accuracy = 0.92
if accuracy >= 0.95:
    print("Model is excellent — ready for production ✅")
elif accuracy >= 0.85:
    print("Model is good — needs minor improvement 🔄")
else:
    print("Model needs retraining ❌")
\`\`\`

### for Loop

\`\`\`python
models = ["GPT-4", "Claude", "Gemini", "Llama"]
for model in models:
    print(f"  - {model}")

for epoch in range(1, 6):
    loss = 2.5 / epoch
    print(f"Epoch {epoch}: loss = {loss:.3f}")
\`\`\`

### for with enumerate

\`\`\`python
results = [0.78, 0.85, 0.91, 0.93]
for i, acc in enumerate(results, start=1):
    print(f"Epoch {i}: {acc * 100:.1f}%")
\`\`\`

### while Loop

\`\`\`python
loss, epoch = 1.0, 0
while loss > 0.1:
    loss *= 0.7
    epoch += 1
print(f"Converged after {epoch} epochs!")
\`\`\`

### break and continue

\`\`\`python
for loss in [1.5, 0.8, 0.4, 0.05]:
    if loss < 0.1:
        print("Early stopping!")
        break
    if loss > 1.0:
        continue
    print(f"loss = {loss:.2f}")
\`\`\`

### List Comprehension

\`\`\`python
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

high_scores = [s for s in [72, 91, 65, 88, 55] if s >= 75]
print(high_scores)  # [91, 88]
\`\`\`

### Lesson Summary

- **if/elif/else**: make decisions based on conditions
- **for**: iterate over a list or range
- **while**: repeat until a condition is met
- **break/continue**: control loop flow
- **List Comprehension**: build lists the Pythonic way`,

      codeExample: `# ─── محاكاة حلقة تدريب AI بسيطة ───
import random
random.seed(42)

learning_rate = 0.1
loss = 2.0
best_loss = float("inf")
patience = 3
no_improve = 0

print("بدء التدريب...")
print("-" * 40)

for epoch in range(1, 21):
    noise = random.uniform(-0.05, 0.1)
    loss = loss * (1 - learning_rate) + noise
    loss = max(loss, 0.05)

    if loss < best_loss - 0.01:
        best_loss = loss
        no_improve = 0
        status = "✅ تحسّن"
    else:
        no_improve += 1
        status = f"⚠️  بلا تحسين ({no_improve}/{patience})"

    bar = "█" * int((2.0 - loss) / 2.0 * 20)
    print(f"Epoch {epoch:2d}: loss={loss:.4f} {bar} {status}")

    if no_improve >= patience:
        print(f"\n🛑 Early Stopping عند epoch {epoch}")
        break

print(f"\n🏆 أفضل loss: {best_loss:.4f}")

accuracy = 1 - best_loss / 2.0
if accuracy >= 0.90:
    print(f"✅ النموذج ممتاز ({accuracy*100:.1f}%)")
elif accuracy >= 0.75:
    print(f"🔄 النموذج جيد ({accuracy*100:.1f}%)")
else:
    print(f"❌ النموذج ضعيف ({accuracy*100:.1f}%)")`,
      codeLanguage: "python",
    },

    // Lesson 4 — الدوال والوحدات
    {
      bodyAr: `## الدوال والوحدات

الدوال تحوّل الكود المتكرر إلى كتل قابلة لإعادة الاستخدام. في AI تبني مكتبتك الخاصة لتسريع عملك.

### تعريف دالة بسيطة

\`\`\`python
def greet(name):
    return f"مرحباً {name}!"

print(greet("Ahmed"))  # مرحباً Ahmed!
\`\`\`

### المعاملات الافتراضية

\`\`\`python
def train_model(epochs=10, learning_rate=0.001, verbose=True):
    if verbose:
        print(f"بدء التدريب: {epochs} epochs | lr={learning_rate}")
    return {"epochs": epochs, "lr": learning_rate}

train_model()
train_model(epochs=50, verbose=False)
\`\`\`

### *args و **kwargs

\`\`\`python
def sum_losses(*losses):
    return sum(losses)

print(sum_losses(0.5, 0.3, 0.2))  # 1.0

def log_metrics(**metrics):
    for key, value in metrics.items():
        print(f"  {key}: {value:.4f}")

log_metrics(accuracy=0.92, loss=0.15, f1=0.89)
\`\`\`

### دوال Lambda

\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25

models = [("GPT-4", 0.91), ("Claude", 0.94), ("Gemini", 0.89)]
sorted_models = sorted(models, key=lambda m: m[1], reverse=True)
\`\`\`

### استيراد الوحدات

\`\`\`python
import math
print(math.sqrt(16))  # 4.0

import numpy as np
import pandas as pd

from random import shuffle, choice
from datetime import datetime
\`\`\`

### المكتبات القياسية المفيدة

\`\`\`python
import os, json, time, random

# قياس الوقت
start = time.time()
print(f"استغرق {time.time() - start:.2f} ثانية")

# JSON
data = {"model": "Claude", "tokens": 200_000}
print(json.dumps(data, ensure_ascii=False))

random.seed(42)  # للتكرارية في التجارب
\`\`\`

### خلاصة الدرس

- **def**: تعريف دالة قابلة لإعادة الاستخدام
- **المعاملات الافتراضية**: قيم تُستخدم إذا لم يمرّرها المستخدم
- **args / kwargs**: دوال مرنة لعدد غير محدد من المعاملات
- **lambda**: دوال مصغّرة لعمليات بسيطة
- **import**: استيراد المكتبات الجاهزة`,

      bodyEn: `## Functions and Modules

Functions turn repetitive code into reusable blocks. In AI you build your own library to speed up your work.

### Defining a Simple Function

\`\`\`python
def greet(name):
    return f"Hello {name}!"

print(greet("Ahmed"))  # Hello Ahmed!
\`\`\`

### Default Parameters

\`\`\`python
def train_model(epochs=10, learning_rate=0.001, verbose=True):
    if verbose:
        print(f"Training: {epochs} epochs | lr={learning_rate}")
    return {"epochs": epochs, "lr": learning_rate}

train_model()
train_model(epochs=50, verbose=False)
\`\`\`

### *args and **kwargs

\`\`\`python
def sum_losses(*losses):
    return sum(losses)

print(sum_losses(0.5, 0.3, 0.2))  # 1.0

def log_metrics(**metrics):
    for key, value in metrics.items():
        print(f"  {key}: {value:.4f}")

log_metrics(accuracy=0.92, loss=0.15, f1=0.89)
\`\`\`

### Lambda Functions

\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25

models = [("GPT-4", 0.91), ("Claude", 0.94), ("Gemini", 0.89)]
sorted_models = sorted(models, key=lambda m: m[1], reverse=True)
\`\`\`

### Importing Modules

\`\`\`python
import math
print(math.sqrt(16))  # 4.0

import numpy as np
import pandas as pd

from random import shuffle, choice
from datetime import datetime
\`\`\`

### Useful Standard Library Modules

\`\`\`python
import os, json, time, random

start = time.time()
print(f"Took {time.time() - start:.2f} seconds")

data = {"model": "Claude", "tokens": 200_000}
print(json.dumps(data))

random.seed(42)  # for reproducibility
\`\`\`

### Lesson Summary

- **def**: define a reusable function
- **Default parameters**: values used if not passed by caller
- **args / kwargs**: flexible functions for variable argument counts
- **lambda**: mini-functions for simple operations
- **import**: use ready-made libraries`,

      codeExample: `# ─── بناء مكتبة أدوات AI بسيطة ───
import time, random
random.seed(42)

def normalize(data: list) -> list:
    # تطبيع البيانات بين 0 و 1
    min_val, max_val = min(data), max(data)
    span = max_val - min_val or 1
    return [(x - min_val) / span for x in data]

def accuracy(predictions: list, labels: list) -> float:
    correct = sum(p == l for p, l in zip(predictions, labels))
    return correct / len(labels)

def train(*, epochs: int = 10, lr: float = 0.01, verbose: bool = True) -> dict:
    history = {"loss": [], "acc": []}
    loss = 2.0
    for epoch in range(1, epochs + 1):
        loss *= (1 - lr) * random.uniform(0.85, 1.05)
        loss = max(loss, 0.05)
        acc  = min(1 - loss / 4, 0.99)
        history["loss"].append(round(loss, 4))
        history["acc"].append(round(acc, 4))
        if verbose and (epoch % 5 == 0 or epoch == 1):
            print(f"  Epoch {epoch:3d}: loss={loss:.4f} | acc={acc*100:.1f}%")
    return history

def evaluate_model(history: dict) -> None:
    final_acc = history["acc"][-1]
    best_acc  = max(history["acc"])
    if final_acc >= 0.90:   verdict = "✅ ممتاز"
    elif final_acc >= 0.75: verdict = "🔄 جيد"
    else:                   verdict = "❌ يحتاج إعادة تدريب"
    print(f"  الدقة النهائية : {final_acc*100:.1f}%")
    print(f"  أفضل دقة      : {best_acc*100:.1f}%")
    print(f"  الحكم          : {verdict}")

print("=" * 40)
start = time.time()
history = train(epochs=20, lr=0.08, verbose=True)
print("\n--- تقييم النموذج ---")
evaluate_model(history)
print(f"\n⏱  وقت التنفيذ: {(time.time()-start)*1000:.1f} مللي ثانية")

raw = [10, 25, 5, 40, 15]
norm = normalize(raw)
print(f"\nقبل التطبيع : {raw}")
print(f"بعد التطبيع : {[round(v, 2) for v in norm]}")`,
      codeLanguage: "python",
    },

    // Lesson 5 — مدخل إلى NumPy
    {
      bodyAr: `## مدخل إلى NumPy

NumPy هي مكتبة الحسابات الرقمية الأساسية في Python. كل مكتبات AI الكبرى مبنية فوقها.

### لماذا NumPy؟

NumPy تنفّذ عمليات على كل المصفوفة دفعة واحدة (vectorized) — أسرع 100× من Python Lists.

### إنشاء المصفوفات

\`\`\`python
import numpy as np

arr   = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))        # 3×4 من أصفار
ones  = np.ones((2, 3))         # 2×3 من واحدات
rng   = np.arange(0, 10, 2)    # [0 2 4 6 8]
lin   = np.linspace(0, 1, 5)   # [0. 0.25 0.5 0.75 1.]

np.random.seed(42)
rand  = np.random.randn(3, 3)   # توزيع طبيعي
\`\`\`

### الـ Shape وإعادة التشكيل

\`\`\`python
arr = np.arange(12)
matrix = arr.reshape(3, 4)   # (3, 4)
flat   = matrix.reshape(-1)  # (12,)

images = np.random.randn(100, 28, 28, 1)  # 100 صورة MNIST
print(images.shape)  # (100, 28, 28, 1)
\`\`\`

### الفهرسة والتقطيع

\`\`\`python
m = np.array([[1,2,3],[4,5,6],[7,8,9]])
print(m[0, :])     # الصف الأول:   [1 2 3]
print(m[:, 1])     # العمود الثاني: [2 5 8]

data = np.array([1.2, -0.5, 3.1, -1.8])
positive = data[data > 0]   # [1.2 3.1]
\`\`\`

### العمليات الرياضية

\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])
print(a + b)         # [11 22 33 44]
print(a * b)         # [10 40 90 160]

data = np.array([85, 92, 78, 96, 88])
print(f"المتوسط: {data.mean():.1f}")
print(f"الانحراف: {data.std():.1f}")
\`\`\`

### ضرب المصفوفات

\`\`\`python
W = np.random.randn(4, 3)   # أوزان طبقة
x = np.random.randn(3)       # مدخل
output = W @ x               # (4,)
\`\`\`

### خلاصة الدرس

- NumPy أسرع بكثير من Python Lists للعمليات الرياضية
- **ndarray**: له shape وdtype
- **Vectorization**: عمليات على كل المصفوفة بدون loops
- **Broadcasting**: عمليات بين مصفوفات بأشكال مختلفة
- ضرب المصفوفات هو أساس الشبكات العصبية`,

      bodyEn: `## Introduction to NumPy

NumPy is the fundamental numerical computing library in Python. All major AI libraries are built on top of it.

### Why NumPy?

NumPy performs operations on the entire array at once (vectorized) — typically 100x faster than Python lists.

### Creating Arrays

\`\`\`python
import numpy as np

arr   = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))        # 3x4 of zeros
ones  = np.ones((2, 3))         # 2x3 of ones
rng   = np.arange(0, 10, 2)    # [0 2 4 6 8]
lin   = np.linspace(0, 1, 5)   # [0. 0.25 0.5 0.75 1.]

np.random.seed(42)
rand  = np.random.randn(3, 3)   # normal distribution
\`\`\`

### Shape and Reshaping

\`\`\`python
arr = np.arange(12)
matrix = arr.reshape(3, 4)   # (3, 4)
flat   = matrix.reshape(-1)  # (12,)

images = np.random.randn(100, 28, 28, 1)  # 100 MNIST images
print(images.shape)  # (100, 28, 28, 1)
\`\`\`

### Indexing and Slicing

\`\`\`python
m = np.array([[1,2,3],[4,5,6],[7,8,9]])
print(m[0, :])     # first row:    [1 2 3]
print(m[:, 1])     # second col:   [2 5 8]

data = np.array([1.2, -0.5, 3.1, -1.8])
positive = data[data > 0]   # [1.2 3.1]
\`\`\`

### Mathematical Operations

\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])
print(a + b)         # [11 22 33 44]
print(a * b)         # [10 40 90 160]

data = np.array([85, 92, 78, 96, 88])
print(f"Mean: {data.mean():.1f}")
print(f"Std: {data.std():.1f}")
\`\`\`

### Matrix Multiplication

\`\`\`python
W = np.random.randn(4, 3)   # layer weights
x = np.random.randn(3)       # input vector
output = W @ x               # shape (4,)
\`\`\`

### Lesson Summary

- NumPy is much faster than Python lists for math operations
- **ndarray**: has shape and dtype
- **Vectorization**: operations on entire array without loops
- **Broadcasting**: automatic operations between different shapes
- Matrix multiplication is the foundation of neural networks`,

      codeExample: `# ─── NumPy في تطبيقات AI حقيقية ───
import numpy as np

np.random.seed(42)
print("=" * 45)
print("    محاكاة طبقة شبكة عصبية بـ NumPy")
print("=" * 45)

# 1. تمثيل بيانات الصور
images = np.random.rand(8, 4, 4, 1)
print(f"\nالشكل الأصلي : {images.shape}")

flat = images.reshape(8, -1)
print(f"بعد Flatten  : {flat.shape}  ({flat.shape[1]} ميزة)")

# 2. تطبيع البيانات
images_norm = (images - images.mean()) / (images.std() + 1e-8)
print(f"\nقبل التطبيع — mean={images.mean():.3f} | std={images.std():.3f}")
print(f"بعد التطبيع — mean={images_norm.mean():.3f} | std={images_norm.std():.3f}")

# 3. طبقة Dense بسيطة
input_size, hidden_size = 16, 8
W = np.random.randn(input_size, hidden_size) * 0.1
b = np.zeros(hidden_size)

X = flat
Z = X @ W + b           # (8,16) @ (16,8) → (8,8)
A = np.maximum(0, Z)    # ReLU

print(f"\nالمدخل  : {X.shape}")
print(f"الأوزان : {W.shape}")
print(f"الخرج Z : {Z.shape}")
print(f"بعد ReLU: {A.shape}")

# 4. إحصاء
per_sample_mean = A.mean(axis=1)
print(f"\nمتوسط تفعيل كل عينة: {np.round(per_sample_mean, 3)}")

# 5. Boolean indexing
scores = np.random.rand(20) * 100
passed = scores[scores >= 60]
print(f"\nعدد الناجحين: {len(passed)}/20")
print(f"متوسط درجات الناجحين: {passed.mean():.1f}")`,
      codeLanguage: "python",
    },

    // Lesson 6 — مدخل إلى Pandas
    {
      bodyAr: `## مدخل إلى Pandas

Pandas هي أقوى مكتبة لتحليل البيانات الجدولية في Python. أي مشروع AI يبدأ بتحميل وتنظيف البيانات — وهنا يكون Pandas.

### الكائنان الأساسيان

| الكائن | الوصف | متى تستخدمه |
|--------|------|------------|
| **Series** | عمود واحد بفهرس | بيانات أحادية البعد |
| **DataFrame** | جدول 2D | أي مجموعة بيانات |

\`\`\`python
import pandas as pd

scores = pd.Series([85, 92, 78, 96, 88],
                   index=["Ahmed", "Sara", "Ali", "Nour", "Omar"])
print(scores.mean())  # 87.8

data = {"name": ["Ahmed", "Sara"], "score": [85, 92]}
df = pd.DataFrame(data)
\`\`\`

### تحميل البيانات

\`\`\`python
df = pd.read_csv("data.csv")
df = pd.read_json("data.json")
df = pd.read_excel("report.xlsx")
\`\`\`

### الاستكشاف الأولي

\`\`\`python
print(df.head(3))       # أول 3 صفوف
print(df.shape)         # (عدد الصفوف، عدد الأعمدة)
print(df.dtypes)        # نوع كل عمود
print(df.info())        # ملخص شامل
print(df.describe())    # إحصاء الأعمدة الرقمية
\`\`\`

### الاختيار والتصفية

\`\`\`python
ages    = df["age"]
subset  = df[["name", "salary"]]
ai_team = df[df["department"] == "AI"]
senior  = df[df["age"] > 30]
top     = df[(df["salary"] > 10000) & (df["dept"] == "ML")]
result  = df.query("age > 28 and salary > 9000")
\`\`\`

### إضافة أعمدة وتعديلها

\`\`\`python
df["monthly"] = df["salary"] / 12
df["level"] = df["age"].apply(lambda a: "senior" if a > 30 else "junior")
df.rename(columns={"salary": "annual"}, inplace=True)
df.drop(columns=["monthly"], inplace=True)
\`\`\`

### groupby — الأداة الأقوى

\`\`\`python
dept_avg = df.groupby("department")["salary"].mean()

summary = df.groupby("department").agg({
    "salary": ["mean", "max"],
    "age": "mean",
})
\`\`\`

### القيم الناقصة

\`\`\`python
print(df.isnull().sum())
df_clean = df.dropna()
df["salary"].fillna(df["salary"].median(), inplace=True)
\`\`\`

### خلاصة الدرس

- **DataFrame** = جدول بيانات مرن وقوي
- **read_csv()** = نقطة البداية لأي مشروع AI
- **head/info/describe()** = الاستكشاف الأولي الإلزامي
- **Boolean indexing** = تصفية البيانات بسهولة
- **groupby()** = تجميع وتلخيص البيانات`,

      bodyEn: `## Introduction to Pandas

Pandas is the most powerful library for tabular data analysis in Python. Every AI project starts with loading and cleaning data.

### The Two Core Objects

| Object | Description | When to use |
|--------|------------|-------------|
| **Series** | Single column with index | One-dimensional data |
| **DataFrame** | 2D table | Any dataset |

\`\`\`python
import pandas as pd

scores = pd.Series([85, 92, 78, 96, 88],
                   index=["Ahmed", "Sara", "Ali", "Nour", "Omar"])
print(scores.mean())  # 87.8

data = {"name": ["Ahmed", "Sara"], "score": [85, 92]}
df = pd.DataFrame(data)
\`\`\`

### Loading Data

\`\`\`python
df = pd.read_csv("data.csv")
df = pd.read_json("data.json")
df = pd.read_excel("report.xlsx")
\`\`\`

### Initial Exploration

\`\`\`python
print(df.head(3))       # first 3 rows
print(df.shape)         # (num_rows, num_cols)
print(df.dtypes)        # each column type
print(df.info())        # comprehensive summary
print(df.describe())    # statistics for numeric columns
\`\`\`

### Selection and Filtering

\`\`\`python
ages    = df["age"]
subset  = df[["name", "salary"]]
ai_team = df[df["department"] == "AI"]
senior  = df[df["age"] > 30]
top     = df[(df["salary"] > 10000) & (df["dept"] == "ML")]
result  = df.query("age > 28 and salary > 9000")
\`\`\`

### Adding and Modifying Columns

\`\`\`python
df["monthly"] = df["salary"] / 12
df["level"] = df["age"].apply(lambda a: "senior" if a > 30 else "junior")
df.rename(columns={"salary": "annual"}, inplace=True)
df.drop(columns=["monthly"], inplace=True)
\`\`\`

### groupby — The Most Powerful Tool

\`\`\`python
dept_avg = df.groupby("department")["salary"].mean()

summary = df.groupby("department").agg({
    "salary": ["mean", "max"],
    "age": "mean",
})
\`\`\`

### Handling Missing Values

\`\`\`python
print(df.isnull().sum())
df_clean = df.dropna()
df["salary"].fillna(df["salary"].median(), inplace=True)
\`\`\`

### Lesson Summary

- **DataFrame** = flexible and powerful data table
- **read_csv()** = starting point for every AI project
- **head/info/describe()** = mandatory initial exploration
- **Boolean indexing** = easy data filtering
- **groupby()** = group and summarize data`,

      codeExample: `# ─── تحليل بيانات موظفي قسم AI بـ Pandas ───
import pandas as pd, io

raw = (
    "name,age,role,salary,experience,department\n"
    "Ahmed,28,Data Scientist,12000,3,AI\n"
    "Sara,32,ML Engineer,18000,7,ML\n"
    "Ali,25,AI Intern,6500,1,AI\n"
    "Nour,35,Cloud Architect,22000,10,Cloud\n"
    "Omar,29,NLP Engineer,14000,4,AI\n"
    "Layla,27,Data Analyst,9000,2,ML\n"
    "Karim,38,MLOps Engineer,20000,12,ML\n"
    "Hana,24,AI Intern,6000,1,AI\n"
    "Tarek,31,Data Scientist,13500,6,Cloud\n"
    "Mona,26,CV Engineer,11000,3,AI"
)

df = pd.read_csv(io.StringIO(raw))

print("=" * 50)
print("       بيانات فريق AI")
print("=" * 50)
print(f"\nعدد الموظفين : {len(df)}")

df["salary_monthly"] = df["salary"] / 12
df["level"] = df["experience"].apply(
    lambda e: "مبتدئ" if e <= 2 else "متوسط" if e <= 6 else "خبير"
)

print("\n--- إحصاء الرواتب ---")
print(df["salary"].describe().round(0))

print("\n--- متوسط الراتب لكل قسم ---")
dept = df.groupby("department")["salary"].agg(["mean","max","count"])
dept.columns = ["المتوسط", "الأعلى", "العدد"]
print(dept.round(0))

print("\n--- الموظفون بأعلى راتب في كل قسم ---")
top = df.loc[df.groupby("department")["salary"].idxmax(),
             ["name","department","salary","role"]]
print(top.to_string(index=False))

pass_rate = (df["salary"] > 10000).mean() * 100
print(f"\n📊 نسبة ذوي الرواتب المرتفعة: {pass_rate:.0f}%")`,
      codeLanguage: "python",
    },

    // Lesson 7 — تصور البيانات مع Matplotlib
    {
      bodyAr: `## تصور البيانات مع Matplotlib

البيانات بدون تصوير هي أرقام عمياء. Matplotlib تحوّل تلك الأرقام إلى رسوم بيانية تكشف الأنماط فوراً.

### المفهوم الأساسي: Figure و Axes

\`\`\`python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot([1, 2, 3, 4], [10, 20, 15, 25])
ax.set_title("عنوان الرسم")
ax.set_xlabel("المحور X")
ax.set_ylabel("المحور Y")
plt.tight_layout()
plt.show()
\`\`\`

### المخطط الخطي (Line Plot) — سجل التدريب

\`\`\`python
epochs     = range(1, 11)
train_loss = [2.5, 1.8, 1.3, 1.0, 0.8, 0.65, 0.55, 0.48, 0.43, 0.40]
val_loss   = [2.6, 2.0, 1.5, 1.2, 1.0, 0.90, 0.85, 0.82, 0.80, 0.79]

fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(epochs, train_loss, label="Train",      color="blue",   lw=2)
ax.plot(epochs, val_loss,   label="Validation", color="orange", lw=2, ls="--")
ax.set_title("Training vs Validation Loss")
ax.legend(); ax.grid(True, alpha=0.3)
plt.show()
\`\`\`

### المخطط الشريطي (Bar Chart)

\`\`\`python
models = ["GPT-4", "Claude", "Gemini", "Llama 3"]
scores = [91.2, 93.7, 90.5, 88.9]

fig, ax = plt.subplots(figsize=(8, 5))
ax.bar(models, scores,
       color=["#4285F4","#FF6B35","#34A853","#EA4335"])
ax.set_title("مقارنة أداء نماذج AI")
ax.set_ylim(85, 97)
plt.show()
\`\`\`

### المخطط المبعثر (Scatter Plot)

\`\`\`python
import numpy as np
np.random.seed(42)
experience = np.random.randint(1, 15, 50)
salary = experience * 1200 + np.random.randn(50) * 2000

fig, ax = plt.subplots(figsize=(8, 5))
ax.scatter(experience, salary, alpha=0.7, s=80)
ax.set_title("العلاقة بين الخبرة والراتب")
plt.show()
\`\`\`

### المدرّج التكراري (Histogram)

\`\`\`python
scores = np.random.normal(loc=75, scale=12, size=200)

fig, ax = plt.subplots(figsize=(8, 5))
ax.hist(scores, bins=20, color="#4A90E2", edgecolor="white")
ax.axvline(scores.mean(), color="red", ls="--", lw=2)
ax.set_title("توزيع درجات الطلاب")
plt.show()
\`\`\`

### عدة مخططات (Subplots)

\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(range(10), [x**2 for x in range(10)])
axes[1].bar(["A","B","C"], [30,50,20])
plt.tight_layout(); plt.show()
\`\`\`

### حفظ المخطط

\`\`\`python
fig.savefig("chart.png", dpi=150, bbox_inches="tight")
\`\`\`

### خلاصة الدرس

- **plt.subplots()**: الطريقة المهنية لإنشاء المخططات
- **plot()**: للبيانات الزمنية والمستمرة
- **bar()**: للمقارنة بين فئات
- **scatter()**: لاستكشاف العلاقات بين المتغيرات
- **hist()**: لفهم توزيع البيانات
- **grid + legend + title**: ضرورية لكل مخطط احترافي`,

      bodyEn: `## Data Visualization with Matplotlib

Data without visualization is blind numbers. Matplotlib transforms those numbers into charts that instantly reveal patterns.

### Core Concept: Figure and Axes

\`\`\`python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot([1, 2, 3, 4], [10, 20, 15, 25])
ax.set_title("Chart Title")
ax.set_xlabel("X Axis")
ax.set_ylabel("Y Axis")
plt.tight_layout()
plt.show()
\`\`\`

### Line Plot — Training History

\`\`\`python
epochs     = range(1, 11)
train_loss = [2.5, 1.8, 1.3, 1.0, 0.8, 0.65, 0.55, 0.48, 0.43, 0.40]
val_loss   = [2.6, 2.0, 1.5, 1.2, 1.0, 0.90, 0.85, 0.82, 0.80, 0.79]

fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(epochs, train_loss, label="Train",      color="blue",   lw=2)
ax.plot(epochs, val_loss,   label="Validation", color="orange", lw=2, ls="--")
ax.set_title("Training vs Validation Loss")
ax.legend(); ax.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Bar Chart

\`\`\`python
models = ["GPT-4", "Claude", "Gemini", "Llama 3"]
scores = [91.2, 93.7, 90.5, 88.9]

fig, ax = plt.subplots(figsize=(8, 5))
ax.bar(models, scores,
       color=["#4285F4","#FF6B35","#34A853","#EA4335"])
ax.set_title("AI Model Performance Comparison")
ax.set_ylim(85, 97)
plt.show()
\`\`\`

### Scatter Plot

\`\`\`python
import numpy as np
np.random.seed(42)
experience = np.random.randint(1, 15, 50)
salary = experience * 1200 + np.random.randn(50) * 2000

fig, ax = plt.subplots(figsize=(8, 5))
ax.scatter(experience, salary, alpha=0.7, s=80)
ax.set_title("Experience vs Salary")
plt.show()
\`\`\`

### Histogram

\`\`\`python
scores = np.random.normal(loc=75, scale=12, size=200)

fig, ax = plt.subplots(figsize=(8, 5))
ax.hist(scores, bins=20, color="#4A90E2", edgecolor="white")
ax.axvline(scores.mean(), color="red", ls="--", lw=2)
ax.set_title("Student Score Distribution")
plt.show()
\`\`\`

### Multiple Charts (Subplots)

\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(range(10), [x**2 for x in range(10)])
axes[1].bar(["A","B","C"], [30,50,20])
plt.tight_layout(); plt.show()
\`\`\`

### Saving a Chart

\`\`\`python
fig.savefig("chart.png", dpi=150, bbox_inches="tight")
\`\`\`

### Lesson Summary

- **plt.subplots()**: the professional way to create charts
- **plot()**: for time-series and continuous data
- **bar()**: for category comparison
- **scatter()**: for exploring variable relationships
- **hist()**: for understanding data distribution
- **grid + legend + title**: required for every professional chart`,

      codeExample: `# ─── لوحة تحليل نموذج AI الشاملة ───
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

epochs     = np.arange(1, 31)
train_loss = 2.5 * np.exp(-0.15 * epochs) + np.random.randn(30) * 0.03
val_loss   = 2.5 * np.exp(-0.13 * epochs) + np.random.randn(30) * 0.04 + 0.1
train_acc  = 1 - train_loss / 3
val_acc    = 1 - val_loss   / 3

models_cmp = ["GPT-4", "Claude", "Gemini", "Llama 3", "Mistral"]
acc_cmp    = [91.2, 93.7, 90.5, 88.9, 87.1]
conf_mat   = np.array([[45,3,2],[4,38,3],[1,2,42]])

fig, axes = plt.subplots(2, 2, figsize=(14, 9))
fig.suptitle("لوحة تحليل النموذج الشاملة", fontsize=15, fontweight="bold")

# 1. Loss curves
axes[0,0].plot(epochs, train_loss, label="Train", color="#2196F3", lw=2)
axes[0,0].plot(epochs, val_loss,   label="Val",   color="#FF5722", lw=2, ls="--")
axes[0,0].set_title("منحنى الـ Loss")
axes[0,0].legend(); axes[0,0].grid(True, alpha=0.3)

# 2. Accuracy curves
axes[0,1].plot(epochs, train_acc*100, label="Train", color="#4CAF50", lw=2)
axes[0,1].plot(epochs, val_acc*100,   label="Val",   color="#9C27B0", lw=2, ls="--")
axes[0,1].set_title("منحنى الدقة")
axes[0,1].legend(); axes[0,1].grid(True, alpha=0.3)

# 3. Model comparison
clrs = ["#4285F4","#FF6B35","#34A853","#EA4335","#673AB7"]
bars = axes[1,0].bar(models_cmp, acc_cmp, color=clrs)
for b, s in zip(bars, acc_cmp):
    axes[1,0].text(b.get_x()+b.get_width()/2, b.get_height()+0.1,
                   f"{s}%", ha="center", fontsize=8, fontweight="bold")
axes[1,0].set_title("مقارنة النماذج"); axes[1,0].set_ylim(84, 97)
axes[1,0].tick_params(axis="x", labelsize=8)

# 4. Confusion matrix
im = axes[1,1].imshow(conf_mat, cmap="Blues")
axes[1,1].set_title("Confusion Matrix")
cls = ["Cat","Dog","Bird"]
axes[1,1].set_xticks(range(3)); axes[1,1].set_xticklabels(cls)
axes[1,1].set_yticks(range(3)); axes[1,1].set_yticklabels(cls)
for i in range(3):
    for j in range(3):
        axes[1,1].text(j, i, conf_mat[i,j], ha="center", va="center",
                       fontweight="bold",
                       color="white" if conf_mat[i,j] > 30 else "black")
plt.colorbar(im, ax=axes[1,1])

plt.tight_layout()
plt.savefig("model_dashboard.png", dpi=120, bbox_inches="tight")
plt.show()
print("✅ تم حفظ اللوحة في model_dashboard.png")`,
      codeLanguage: "python",
    },

    // Lesson 8 — مشروع: تحليل بيانات CSV كاملة
    {
      bodyAr: `## مشروع: تحليل بيانات CSV كاملة

في هذا الدرس تطبّق كل ما تعلّمته في مشروع متكامل — من تحميل البيانات إلى الرسوم البيانية والاستنتاجات.

### المشروع: تحليل سوق وظائف AI

**الهدف:** تحليل مجموعة بيانات وظائف AI لاستخراج رؤى تساعد في بناء مسار مهني.

**المهارات المستخدمة:** Python · NumPy · Pandas · Matplotlib

### الخطوة 1: تحضير البيانات

\`\`\`python
import pandas as pd, numpy as np, matplotlib.pyplot as plt, io

# البيانات كنص CSV مدمج مباشرة في الكود
raw = 'job,salary,exp,skill\nData Scientist,120000,3,Python\nML Engineer,150000,5,PyTorch'
df = pd.read_csv(io.StringIO(raw))
\`\`\`

### الخطوة 2: الاستكشاف الأولي

\`\`\`python
print(f"الحجم: {df.shape}")
print(df.describe().round(0))
\`\`\`

### الخطوة 3: إثراء البيانات

\`\`\`python
df["monthly"]   = (df["salary"] / 12).astype(int)
df["seniority"] = pd.cut(df["exp"], bins=[0,2,5,99],
                          labels=["مبتدئ","متوسط","خبير"])
df["roi"]       = (df["demand"] * df["salary"] / 100_000).round(2)
\`\`\`

### الخطوة 4: تحليل واستنتاجات

\`\`\`python
corr = df["exp"].corr(df["salary"])
print(f"ارتباط الخبرة بالراتب: {corr:.2f}")

top3 = df.nlargest(3, "salary")[["job","salary"]]
print(top3.to_string(index=False))

level_avg = df.groupby("seniority", observed=True)["salary"].mean()
print(level_avg)
\`\`\`

### الخطوة 5: التصوير

\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].barh(df["job"], df["salary"]/1000, color="#2196F3")
axes[0].set_title("الراتب (ألف $)")
axes[1].scatter(df["exp"], df["salary"]/1000, alpha=0.8)
axes[1].set_title("الخبرة × الراتب")
plt.tight_layout()
plt.savefig("ai_jobs.png", dpi=120, bbox_inches="tight")
plt.show()
\`\`\`

### الخطوة 6: التوصيات

\`\`\`python
best = df.loc[df["roi"].idxmax()]
print(f"✅ أفضل وظيفة: {best['job']} (\${best['salary']:,})")
print("💡 مسار: Python → ML → APIs → Deploy")
\`\`\`

### خلاصة المشروع

1. ✅ حمّلنا بيانات وفهمنا هيكلها
2. ✅ نظّفناها وأضفنا أعمدة محسوبة
3. ✅ حللنا البيانات وأجبنا على أسئلة حقيقية
4. ✅ صوّرنا النتائج في لوحة احترافية
5. ✅ استخرجنا توصيات قابلة للتنفيذ

هذا هو بالضبط سير عمل Data Scientist الحقيقي.`,

      bodyEn: `## Project: Complete CSV Data Analysis

In this lesson you apply everything learned in one integrated real project — from loading data to charts and conclusions.

### The Project: AI Jobs Market Analysis

**Goal:** Analyze an AI jobs dataset to extract insights that help build a career path.

**Skills Used:** Python · NumPy · Pandas · Matplotlib

### Step 1: Prepare the Data

\`\`\`python
import pandas as pd, numpy as np, matplotlib.pyplot as plt, io

# Inline CSV data
raw = 'job,salary,exp,skill\nData Scientist,120000,3,Python\nML Engineer,150000,5,PyTorch'
df = pd.read_csv(io.StringIO(raw))
\`\`\`

### Step 2: Initial Exploration

\`\`\`python
print(f"Shape: {df.shape}")
print(df.describe().round(0))
\`\`\`

### Step 3: Enrich the Data

\`\`\`python
df["monthly"]   = (df["salary"] / 12).astype(int)
df["seniority"] = pd.cut(df["exp"], bins=[0,2,5,99],
                          labels=["junior","mid","senior"])
df["roi"]       = (df["demand"] * df["salary"] / 100_000).round(2)
\`\`\`

### Step 4: Analysis and Insights

\`\`\`python
corr = df["exp"].corr(df["salary"])
print(f"Experience-salary correlation: {corr:.2f}")

top3 = df.nlargest(3, "salary")[["job","salary"]]
print(top3.to_string(index=False))

level_avg = df.groupby("seniority", observed=True)["salary"].mean()
print(level_avg)
\`\`\`

### Step 5: Visualization

\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].barh(df["job"], df["salary"]/1000, color="#2196F3")
axes[0].set_title("Annual Salary (thousands)")
axes[1].scatter(df["exp"], df["salary"]/1000, alpha=0.8)
axes[1].set_title("Experience vs Salary")
plt.tight_layout()
plt.savefig("ai_jobs.png", dpi=120, bbox_inches="tight")
plt.show()
\`\`\`

### Step 6: Recommendations

\`\`\`python
best = df.loc[df["roi"].idxmax()]
print(f"Best role: {best['job']} (\${best['salary']:,})")
print("Path: Python → ML → APIs → Deploy")
\`\`\`

### Project Summary

1. ✅ Loaded data and understood its structure
2. ✅ Cleaned it and added computed columns
3. ✅ Analyzed the data and answered real questions
4. ✅ Visualized results in a professional dashboard
5. ✅ Extracted actionable recommendations

This is exactly the real Data Scientist workflow.`,

      codeExample: `# ─── المشروع الكامل: تحليل سوق وظائف AI ───
import pandas as pd, numpy as np, matplotlib.pyplot as plt, io

lines = [
    "job_title,salary_usd,exp_yr,top_skill,remote,demand_score",
    "Data Scientist,120000,3,Python,True,9.2",
    "ML Engineer,150000,5,PyTorch,True,9.5",
    "AI Researcher,160000,7,Research,False,8.8",
    "Data Analyst,85000,2,SQL,True,8.5",
    "NLP Engineer,140000,4,NLP,True,8.9",
    "CV Engineer,135000,4,OpenCV,False,8.7",
    "MLOps Engineer,145000,6,Docker,True,9.0",
    "AI Product Mgr,130000,5,Strategy,True,8.3",
    "Data Engineer,125000,4,Spark,False,8.8",
    "LLM Engineer,155000,3,LangChain,True,9.4",
]
df = pd.read_csv(io.StringIO("\n".join(lines)))

print("=== الاستكشاف ===")
print(f"الحجم: {df.shape[0]} وظيفة x {df.shape[1]} خاصية")

df["monthly"]   = (df["salary_usd"] / 12).astype(int)
df["seniority"] = pd.cut(df["exp_yr"], bins=[0,2,5,99],
                          labels=["مبتدئ","متوسط","خبير"])
df["roi"]       = (df["demand_score"] * df["salary_usd"] / 100_000).round(2)

print("\n=== إحصاء الرواتب ($) ===")
print(df["salary_usd"].describe().apply(lambda x: f"\${x:,.0f}"))

corr = np.corrcoef(df["exp_yr"], df["salary_usd"])[0,1]
print(f"\n📈 ارتباط الخبرة بالراتب: {corr:.3f}")

print("\n🏆 أعلى 3 رواتب:")
top = df.nlargest(3,"salary_usd")[["job_title","salary_usd"]]
print(top.to_string(index=False))

print("\n=== متوسط الراتب حسب المستوى ===")
lv = df.groupby("seniority", observed=True)["salary_usd"].agg(["mean","count"])
for lvl, row in lv.iterrows():
    print(f"  {lvl}: \${row['mean']:,.0f}  ({int(row['count'])} وظيفة)")

remote_pct = df["remote"].mean() * 100
print(f"\n🏠 وظائف عن بُعد: {remote_pct:.0f}%")

fig, axes = plt.subplots(2, 2, figsize=(14, 9))
fig.suptitle("تحليل سوق وظائف الذكاء الاصطناعي 2025",
             fontsize=14, fontweight="bold")

sd = df.sort_values("salary_usd")
clr = ["#4CAF50" if r else "#F44336" for r in sd["remote"]]
axes[0,0].barh(sd["job_title"], sd["salary_usd"]/1000, color=clr, alpha=0.85)
axes[0,0].set_title("الراتب (أخضر=بُعد، أحمر=حضوري)")

sc = axes[0,1].scatter(df["exp_yr"], df["salary_usd"]/1000,
                        c=df["demand_score"], cmap="RdYlGn",
                        s=df["demand_score"]*18, alpha=0.8)
plt.colorbar(sc, ax=axes[0,1], label="الطلب")
axes[0,1].set_title("الخبرة × الراتب")

rs = df.sort_values("roi", ascending=False)
axes[1,0].bar(range(len(rs)), rs["roi"], color="#9C27B0", alpha=0.8)
axes[1,0].set_xticks(range(len(rs)))
axes[1,0].set_xticklabels([t.split()[0] for t in rs["job_title"]],
                            rotation=45, ha="right", fontsize=8)
axes[1,0].set_title("ROI Score")

axes[1,1].hist(df["demand_score"], bins=8, color="#2196F3", edgecolor="white")
axes[1,1].axvline(df["demand_score"].mean(), color="red", ls="--", lw=2,
                   label=f"μ={df['demand_score'].mean():.2f}")
axes[1,1].set_title("توزيع درجة الطلب"); axes[1,1].legend()

plt.tight_layout()
plt.savefig("ai_jobs_analysis.png", dpi=120, bbox_inches="tight")
plt.show()

best = df.loc[df["roi"].idxmax()]
print("\n" + "="*40)
print("      التوصيات النهائية")
print("="*40)
print(f"🥇 أفضل وظيفة ROI : {best['job_title']}")
print(f"   الراتب          : \${best['salary_usd']:,}")
print(f"   المهارة         : {best['top_skill']}")
print(f"\n💡 مسار: Python → NumPy/Pandas → ML → LLMs → Deploy")
print("✅ تم حفظ التحليل في: ai_jobs_analysis.png")`,
      codeLanguage: "python",
    },
  ],
};
