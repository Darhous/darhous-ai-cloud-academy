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

  // ─────────────────────────────────────────────────────────────────────────
  // C7 — claude-mastery (7 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  "claude-mastery": [

    // Lesson 1 — جولة شاملة على Claude.ai
    {
      bodyAr: `## جولة شاملة على Claude.ai

Claude.ai هو واجهة الويب الرسمية للتفاعل مع نماذج Claude من Anthropic. في هذا الدرس ستتعرف على كل ركن في الواجهة وتفهم الفرق بين الخطط المختلفة.

### الواجهة الرئيسية

عند فتح Claude.ai ستجد:

| العنصر | الوظيفة |
|--------|---------|
| **صندوق المحادثة** | اكتب مطالباتك هنا — يدعم نصاً طويلاً جداً |
| **Projects** | مجلدات تنظّم المحادثات ذات الموضوع الواحد |
| **Artifacts** | يفتح نافذة جانبية لعرض الكود/HTML/SVG |
| **رفع الملفات** | PDF وصور ومستندات Word حتى 30 MB |
| **Voice mode** | محادثة صوتية في تطبيق الجوال |

### النماذج المتاحة

**Claude Haiku** — الأسرع والأرخص. مثالي لمهام بسيطة وسريعة.

**Claude Sonnet** — التوازن المثالي بين السرعة والجودة. هو النموذج الافتراضي في claude.ai للمشتركين.

**Claude Opus** — الأقوى للمهام المعقدة: التحليل العميق، الكود المتقدم، التفكير متعدد الخطوات.

### ميزات Claude.ai الأساسية

#### 1. رفع الملفات والصور
يمكنك رفع:
- صور (PNG/JPG/GIF/WebP) → Claude يحلّلها ويصفها
- PDF ومستندات → Claude يقرأ محتواها كاملاً
- كود (أي لغة) → Claude يراجعه ويحسّنه
- جداول Excel/CSV → Claude يحللها ويستخرج insights

#### 2. Artifacts
عندما تطلب من Claude كتابة كود أو HTML أو Markdown منسق، يعرضه في نافذة Artifacts المنفصلة التي تتيح:
- عرض HTML مباشرةً في المتصفح
- نسخ الكود بنقرة واحدة
- تعديل النتيجة والطلب من Claude تحديثها

#### 3. Projects — نقطة تحول حقيقية
Projects هي المميزة التي تغير طريقة العمل اليومية:
- ذاكرة دائمة للسياق (أي context يضاف للـ project يُحفظ لكل المحادثات)
- تعليمات مخصصة للمشروع (System Prompt دائم)
- تنظيم ملفات المرجعية داخل المشروع
- تعاون الفريق (في الخطط المدفوعة)

### الفرق بين الخطط

| الخطة | النماذج | Context Window | Projects |
|-------|---------|----------------|---------|
| **Free** | Haiku فقط | 100K token | ❌ |
| **Pro** | Haiku/Sonnet/Opus | 200K token | ✅ |
| **Team** | كل النماذج | 200K token | ✅ مشترك |
| **Enterprise** | كل النماذج + Fine-tuning | 200K+ | ✅ |

### Context Window — ما يعنيه عملياً

الـ 200K token تعني تقريباً:
- 150,000 كلمة إنجليزية
- كتاب كامل بـ 500 صفحة
- أكثر من 10,000 سطر كود Python

هذا يجعل Claude قادراً على تحليل مشاريع كاملة دفعة واحدة.

### نصائح عملية للاستخدام اليومي

1. **ابدأ بـ Projects** لأي عمل متكرر (عملك، مشاريعك، دراستك)
2. **استخدم Artifacts** عند طلب كود — ستتمكن من تعديله مباشرةً
3. **أرفق الملفات** بدلاً من لصق النص — أكثر دقة
4. **اكتب تعليمات Project** مرة واحدة وسيتذكرها Claude دائماً
`,
      bodyEn: `## Complete Tour of Claude.ai

Claude.ai is the official web interface for interacting with Anthropic's Claude models. In this lesson you'll explore every corner of the interface and understand the differences between plans.

### The Main Interface

When you open Claude.ai you'll find:

| Element | Function |
|---------|---------|
| **Chat box** | Type your prompts here — supports very long text |
| **Projects** | Folders organizing conversations by topic |
| **Artifacts** | Side panel for code/HTML/SVG output |
| **File upload** | PDF, images, Word docs up to 30 MB |
| **Voice mode** | Voice conversation in the mobile app |

### Available Models

**Claude Haiku** — Fastest and cheapest. Ideal for simple, quick tasks.

**Claude Sonnet** — The perfect balance of speed and quality. The default model for subscribers.

**Claude Opus** — Most powerful for complex tasks: deep analysis, advanced code, multi-step reasoning.

### Core Claude.ai Features

#### 1. File and Image Uploads
You can upload:
- Images (PNG/JPG/GIF/WebP) → Claude analyzes and describes them
- PDFs and documents → Claude reads the full content
- Code (any language) → Claude reviews and improves it
- Excel/CSV tables → Claude analyzes them and extracts insights

#### 2. Artifacts
When you ask Claude to write code, HTML, or formatted Markdown, it displays it in a separate Artifacts panel that allows:
- Direct HTML preview in the browser
- One-click code copying
- Editing and asking Claude to update the result

#### 3. Projects — A Real Game Changer
Projects transform your daily workflow:
- Persistent context memory (any context added to a project is saved for all conversations)
- Custom project instructions (permanent System Prompt)
- Reference files organized within the project
- Team collaboration (on paid plans)

### Plan Differences

| Plan | Models | Context Window | Projects |
|------|--------|----------------|---------|
| **Free** | Haiku only | 100K tokens | ❌ |
| **Pro** | Haiku/Sonnet/Opus | 200K tokens | ✅ |
| **Team** | All models | 200K tokens | ✅ Shared |
| **Enterprise** | All + Fine-tuning | 200K+ | ✅ |

### Context Window — What It Means in Practice

The 200K tokens means approximately:
- 150,000 English words
- A complete 500-page book
- More than 10,000 lines of Python code

This makes Claude capable of analyzing entire projects at once.

### Practical Daily Tips

1. **Start with Projects** for any recurring work (job, projects, studies)
2. **Use Artifacts** when requesting code — you can edit it directly
3. **Attach files** instead of pasting text — more accurate
4. **Write Project instructions** once and Claude remembers them forever
`,
    },

    // Lesson 2 — إطار المطالبة الاحترافية
    {
      bodyAr: `## إطار المطالبة الاحترافية

المطالبة الاحترافية ليست سراً — هي مهارة قابلة للتعلم. في هذا الدرس ستتعلم الإطار الذي يستخدمه أفضل المستخدمين للحصول على نتائج استثنائية.

### لماذا معظم المطالبات تفشل؟

المشكلة الأكثر شيوعاً:

> ❌ "اكتب لي إيميل"

هذا يعطي Claude معلومات غير كافية. النتيجة ستكون عامة وغير مفيدة.

> ✅ "اكتب إيميل احترافي إلى عميل يسأل عن تأخير التسليم. أسلوب: مهني ومحترم. الطول: فقرتان. اشرح أن التأخير 3 أيام بسبب الشحن وأكد الاعتذار."

هذه المطالبة تعطي Claude كل ما يحتاجه.

### إطار CRAFT

| الحرف | المعنى | مثال |
|-------|--------|------|
| **C** — Context | السياق الكامل | "أنا مطور أعمل على تطبيق React..." |
| **R** — Role | الدور المطلوب | "تصرف كـ Senior Code Reviewer" |
| **A** — Action | الفعل المطلوب | "راجع هذا الكود وأخبرني بالمشاكل" |
| **F** — Format | شكل الإجابة | "قائمة نقاط، الأهم أولاً" |
| **T** — Tone | النبرة | "مباشر وعملي، بلا مجاملات" |

### تقنيات متقدمة

#### 1. Chain-of-Thought Prompting
اطلب من Claude أن يفكر بصوت عالٍ:

\`\`\`
فكّر خطوة بخطوة:
1. اشرح المشكلة
2. اذكر الحلول الممكنة
3. قارن بين الحلول
4. أعطني توصيتك النهائية
\`\`\`

هذا يزيد دقة الإجابات للمسائل المعقدة بشكل ملحوظ.

#### 2. Few-Shot Examples
أعطِ أمثلة على المطلوب:

\`\`\`
حوّل العناوين الإخبارية إلى نبرة محايدة.

مثال 1:
الأصل: "الحكومة تفشل في إدارة الأزمة"
المحايد: "مسؤولون يواجهون انتقادات حول إدارة الأزمة"

مثال 2:
الأصل: "رئيس الوزراء يتجنب الإجابة"
المحايد: "رئيس الوزراء يؤجل الرد على التساؤلات"

الآن حوّل: "الشركة تستغل العمال بلا رحمة"
\`\`\`

#### 3. XML Tags للهيكلة
Claude يستجيب بشكل ممتاز للـ XML tags:

\`\`\`xml
<task>مراجعة كود Python</task>
<code>
def calculate(x, y):
    return x/y
</code>
<requirements>
- ابحث عن أخطاء منطقية
- اقترح تحسينات للأداء
- أضف error handling
</requirements>
<format>قائمة مرقمة حسب الأولوية</format>
\`\`\`

#### 4. Iterative Refinement
لا تتوقف عند أول إجابة:

\`\`\`
الإجابة جيدة. الآن:
- اجعلها أقصر بـ 30%
- أضف مثالاً عملياً في الفقرة الثانية
- غيّر النبرة لتكون أكثر تحفيزاً
\`\`\`

### أخطاء شائعة يجب تجنبها

| الخطأ | المشكلة | الحل |
|-------|---------|------|
| المطالبة الغامضة | Claude يخمّن نيتك | كن محدداً |
| عدة مهام في مرة | تضييع التركيز | مهمة واحدة في كل مطالبة |
| تجاهل السياق | إجابات عامة | أعطِ context وافياً |
| قبول أول إجابة | تفويت إمكانية التحسين | كرّر وحسّن |

### قوالب جاهزة للاستخدام

**للكود:**
\`\`\`
أنت senior developer خبير في [اللغة].
راجع الكود التالي، ابحث عن: أخطاء، أداء، أمان.
أجب في قائمة مرقمة حسب الخطورة.
الكود: [الكود هنا]
\`\`\`

**للكتابة:**
\`\`\`
اكتب [النوع] عن [الموضوع].
الجمهور: [من سيقرأ].
النبرة: [رسمي/غير رسمي/تقني].
الطول: [X كلمة].
يجب أن تتضمن: [نقاط مهمة].
\`\`\`

**للتحليل:**
\`\`\`
حلّل [الموضوع] من زاويتين: الإيجابيات والسلبيات.
ثم أعطني توصيتك النهائية مع التبرير.
\`\`\`
`,
      bodyEn: `## Professional Prompting Framework

Professional prompting is not a secret — it's a learnable skill. In this lesson you'll learn the framework that top users employ to get exceptional results.

### Why Most Prompts Fail?

The most common problem:

> ❌ "Write me an email"

This gives Claude insufficient information. The result will be generic and unhelpful.

> ✅ "Write a professional email to a client asking about a delivery delay. Style: professional and respectful. Length: two paragraphs. Explain the 3-day delay due to shipping and confirm the apology."

This prompt gives Claude everything it needs.

### The CRAFT Framework

| Letter | Meaning | Example |
|--------|---------|---------|
| **C** — Context | Full background | "I'm a developer working on a React app..." |
| **R** — Role | Required role | "Act as a Senior Code Reviewer" |
| **A** — Action | Required action | "Review this code and tell me the issues" |
| **F** — Format | Answer format | "Bullet list, most important first" |
| **T** — Tone | Tone | "Direct and practical, no flattery" |

### Advanced Techniques

#### 1. Chain-of-Thought Prompting
Ask Claude to think out loud:

\`\`\`
Think step by step:
1. Explain the problem
2. List possible solutions
3. Compare the solutions
4. Give your final recommendation
\`\`\`

This notably increases accuracy for complex problems.

#### 2. Few-Shot Examples
Give examples of what you want:

\`\`\`
Convert news headlines to a neutral tone.

Example 1:
Original: "Government fails to manage crisis"
Neutral: "Officials face criticism over crisis management"

Example 2:
Original: "Prime Minister avoids answering"
Neutral: "Prime Minister delays response to questions"

Now convert: "Company ruthlessly exploits workers"
\`\`\`

#### 3. XML Tags for Structure
Claude responds excellently to XML tags:

\`\`\`xml
<task>Python code review</task>
<code>
def calculate(x, y):
    return x/y
</code>
<requirements>
- Find logical errors
- Suggest performance improvements
- Add error handling
</requirements>
<format>Numbered list by priority</format>
\`\`\`

#### 4. Iterative Refinement
Don't stop at the first answer:

\`\`\`
Good answer. Now:
- Make it 30% shorter
- Add a practical example in the second paragraph
- Change the tone to be more motivating
\`\`\`

### Common Mistakes to Avoid

| Mistake | Problem | Solution |
|---------|---------|---------|
| Vague prompt | Claude guesses your intent | Be specific |
| Multiple tasks at once | Scattered focus | One task per prompt |
| Ignoring context | Generic answers | Provide ample context |
| Accepting first answer | Missing improvement potential | Iterate and refine |

### Ready-to-Use Templates

**For code:**
\`\`\`
You are a senior developer expert in [language].
Review the following code, look for: bugs, performance, security.
Answer in a numbered list by severity.
Code: [code here]
\`\`\`

**For writing:**
\`\`\`
Write a [type] about [topic].
Audience: [who will read it].
Tone: [formal/informal/technical].
Length: [X words].
Must include: [key points].
\`\`\`

**For analysis:**
\`\`\`
Analyze [topic] from two angles: pros and cons.
Then give your final recommendation with justification.
\`\`\`
`,
      codeExample: `# مثال عملي: مقارنة بين مطالبة ضعيفة ومطالبة قوية
# هذا كود Python يوضح كيف يمكن هيكلة المطالبات برمجياً

import anthropic

client = anthropic.Anthropic()

# ❌ مطالبة ضعيفة
weak_prompt = "اكتب كوداً"

# ✅ مطالبة قوية باستخدام إطار CRAFT
def build_craft_prompt(
    context: str,
    role: str,
    action: str,
    output_format: str,
    tone: str,
    additional: str = ""
) -> str:
    return f"""<context>{context}</context>
<role>{role}</role>
<action>{action}</action>
<format>{output_format}</format>
<tone>{tone}</tone>
{f"<additional>{additional}</additional>" if additional else ""}"""

# بناء مطالبة احترافية
professional_prompt = build_craft_prompt(
    context="أنا مطور Python أعمل على API لتطبيق ويب يستخدم FastAPI",
    role="Senior Python Developer متخصص في APIs وأمان التطبيقات",
    action="اكتب دالة للتحقق من صحة الـ JWT token مع error handling كامل",
    output_format="كود Python مع تعليقات واضحة، ثم شرح مختصر للاختيارات التقنية",
    tone="تقني ودقيق، افترض خبرة متوسطة في Python",
    additional="استخدم مكتبة PyJWT، تعامل مع حالات expired/invalid/missing token"
)

print("=== المطالبة المهيكلة ===")
print(professional_prompt)

# إرسال المطالبة لـ Claude
message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": professional_prompt}
    ]
)

print("\n=== رد Claude ===")
print(message.content[0].text)

# ─────────────────────────────────────────
# نموذج: Chain-of-Thought template
cot_template = """
حلّل المشكلة التالية خطوة بخطوة:

المشكلة: {problem}

الخطوات المطلوبة:
1. افهم المشكلة وأعد صياغتها بكلماتك
2. حدد المعطيات والمجاهيل
3. اقترح 3 حلول ممكنة
4. قيّم كل حل (إيجابيات/سلبيات/تكلفة)
5. اختر الأفضل وبرر اختيارك

أجب بتنسيق markdown منظم.
"""

problem = "خادمنا يستهلك 90% من الذاكرة تحت الحمل العالي ونريد تحسين الأداء"
final_prompt = cot_template.format(problem=problem)
print("\n=== مطالبة Chain-of-Thought ===")
print(final_prompt[:300] + "...")`,
      codeLanguage: "python",
    },

    // Lesson 3 — Claude Projects بعمق
    {
      bodyAr: `## Claude Projects بعمق

Claude Projects هي التحول من "محادثات عشوائية" إلى "مساعد ذكي مخصص لعملك". في هذا الدرس ستتعلم كيف تبني Projects قوية تحوّل طريقة عملك اليومية.

### ما هو Project؟

Project هو مساحة عمل مستقلة تحتوي على:

\`\`\`
Project
├── Project Instructions (System Prompt دائم)
├── Knowledge Files (ملفات مرجعية)
└── Conversations (محادثات مرتبطة)
    ├── محادثة 1
    ├── محادثة 2
    └── محادثة 3 ...
\`\`\`

كل محادثة داخل الـ Project ترى الـ Instructions والملفات — بدون أي تكرار من جهتك.

### إنشاء Project احترافي

#### الخطوة 1: تعريف الهدف
قبل البدء، اسأل نفسك:
- ما الذي سيساعدني فيه هذا الـ Project؟
- من هو "Claude" المثالي لهذا العمل؟
- ما الملفات التي يحتاجها للعمل بشكل جيد؟

#### الخطوة 2: كتابة Project Instructions قوية

الـ Instructions هي "DNA" المساعد. مثال لـ Project تطوير برمجي:

\`\`\`
أنت مساعد تطوير برمجي متخصص في مشروع [اسم المشروع].

## السياق التقني
- Stack: Next.js 14 + TypeScript + Supabase + TailwindCSS
- المشروع: منصة تعليمية للذكاء الاصطناعي
- الجمهور: مستخدمون عرب مبتدئون ومتوسطون

## قواعد الكود
- استخدم TypeScript strict دائماً
- اتبع React Server Components حيثما أمكن
- الكود يجب أن يكون مباشراً وموثّقاً بالعربية
- لا تكتب أي شيء خارج النطاق المطلوب

## أسلوب التواصل
- احتفظ بردود قصيرة وعملية
- إذا كان الكود طويلاً، استخدم Artifacts
- عند الشك، اسأل قبل الافتراض

## ما يجب تجنبه
- لا تقترح تغييرات غير مطلوبة
- لا تعيد كتابة كود يعمل
\`\`\`

#### الخطوة 3: رفع Knowledge Files

الملفات المثالية للـ Project:
- **المواصفات التقنية** (README، API docs)
- **قواعد الأسلوب** (style guide، لغة الكتابة)
- **الهيكل الحالي** (ERD، Component tree)
- **أمثلة على المطلوب** (samples)

### حالات استخدام Project

#### Project 1: المطور
\`\`\`
Instructions: "أنت code reviewer خبير..."
Files: package.json + tsconfig + هيكل المجلدات
الاستخدام: مراجعة كود، كتابة tests، debug
\`\`\`

#### Project 2: كاتب المحتوى
\`\`\`
Instructions: "أنت مدير محتوى لعلامة تجارية..."
Files: دليل الأسلوب + ملف الشخصيات المستهدفة
الاستخدام: كتابة مقالات، منشورات، إيميلات
\`\`\`

#### Project 3: الباحث
\`\`\`
Instructions: "أنت مساعد بحثي أكاديمي..."
Files: الأبحاث المرجعية الرئيسية
الاستخدام: تلخيص، تحليل، مقارنة أبحاث
\`\`\`

### إدارة الملفات في Project

**أفضل الممارسات:**
- ارفع الملفات الجوهرية فقط (لا تملأ الـ context بملفات غير مهمة)
- حدّث الملفات عند تغيّر المشروع
- استخدم أسماء ملفات واضحة تصف محتواها

**حد الملفات:** 20 ملف × 30MB لكل ملف في الخطة Pro.

### مشاركة الـ Projects (Team Plan)

في الخطط المدفوعة يمكن مشاركة Project مع الفريق:
- كل الأعضاء يرون نفس الـ Instructions والملفات
- كل شخص له محادثاته الخاصة
- مثالي للفرق التقنية وفرق المحتوى

### نصيحة متقدمة: استخدام Project كـ "Brain" للفريق

أنشئ Project واحداً يحتوي على:
- وثيقة "هوية الشركة" (Mission, Values, Tone of Voice)
- قاموس المصطلحات الخاصة بالمنتج
- FAQ الشائعة

الآن كل فرد في الفريق لديه مساعد يعرف الشركة تماماً.
`,
      bodyEn: `## Claude Projects in Depth

Claude Projects are the shift from "random conversations" to "a smart assistant customized for your work." In this lesson you'll learn how to build powerful Projects that transform your daily workflow.

### What is a Project?

A Project is an independent workspace containing:

\`\`\`
Project
├── Project Instructions (permanent System Prompt)
├── Knowledge Files (reference files)
└── Conversations (linked chats)
    ├── Conversation 1
    ├── Conversation 2
    └── Conversation 3 ...
\`\`\`

Every conversation inside the Project sees the Instructions and files — without any repetition on your part.

### Creating a Professional Project

#### Step 1: Define the Goal
Before starting, ask yourself:
- What will this Project help me with?
- Who is the "ideal Claude" for this work?
- What files does it need to work well?

#### Step 2: Write Strong Project Instructions

Instructions are the "DNA" of the assistant. Example for a software development Project:

\`\`\`
You are a software development assistant specialized in [Project Name].

## Technical Context
- Stack: Next.js 14 + TypeScript + Supabase + TailwindCSS
- Project: AI educational platform
- Audience: Arabic-speaking beginner to intermediate users

## Code Rules
- Always use TypeScript strict
- Follow React Server Components where possible
- Code must be straightforward and commented in Arabic
- Don't write anything outside the requested scope

## Communication Style
- Keep responses short and practical
- If code is long, use Artifacts
- When in doubt, ask before assuming

## What to Avoid
- Don't suggest unrequested changes
- Don't rewrite working code
\`\`\`

#### Step 3: Upload Knowledge Files

Ideal files for a Project:
- **Technical specs** (README, API docs)
- **Style guidelines** (style guide, writing language)
- **Current structure** (ERD, Component tree)
- **Examples of the desired output** (samples)

### Project Use Cases

#### Project 1: The Developer
\`\`\`
Instructions: "You are an expert code reviewer..."
Files: package.json + tsconfig + folder structure
Usage: Code review, writing tests, debugging
\`\`\`

#### Project 2: The Content Writer
\`\`\`
Instructions: "You are a content manager for a brand..."
Files: Style guide + target persona file
Usage: Writing articles, posts, emails
\`\`\`

#### Project 3: The Researcher
\`\`\`
Instructions: "You are an academic research assistant..."
Files: Key reference papers
Usage: Summarizing, analyzing, comparing research
\`\`\`

### Managing Files in a Project

**Best practices:**
- Upload only essential files (don't fill the context with unimportant files)
- Update files when the project changes
- Use clear file names that describe their content

**File limit:** 20 files × 30 MB per file on the Pro plan.

### Sharing Projects (Team Plan)

On paid plans you can share a Project with your team:
- All members see the same Instructions and files
- Each person has their own conversations
- Ideal for technical and content teams

### Advanced Tip: Using Project as Team "Brain"

Create one Project containing:
- A "company identity" document (Mission, Values, Tone of Voice)
- A glossary of product-specific terms
- Common FAQ

Now every team member has an assistant that knows the company perfectly.
`,
    },

    // Lesson 4 — Claude Code: التثبيت والإعداد
    {
      bodyAr: `## Claude Code: التثبيت والإعداد

Claude Code هو CLI احترافي يحوّل Claude إلى مساعد برمجي حقيقي يعمل مباشرةً في terminal ويتفاعل مع ملفات مشروعك الفعلية.

### لماذا Claude Code؟

الفرق بين Claude.ai وClaude Code:

| | Claude.ai | Claude Code |
|--|-----------|------------|
| **الوصول للملفات** | ترفع يدوياً | يقرأ/يكتب مباشرةً |
| **تشغيل الأوامر** | لا | يشغّل terminal commands |
| **السياق** | محادثة فقط | المشروع كله |
| **الاستخدام** | Browser | Terminal |
| **المناسب لـ** | أسئلة عامة | تطوير فعلي |

### متطلبات التثبيت

- **Node.js 18+** (للتحقق: \`node --version\`)
- **npm 8+** أو **Bun**
- حساب Claude مع API key (من console.anthropic.com)
- **OS:** macOS / Linux / Windows (WSL2 موصى به)

### التثبيت

\`\`\`bash
# التثبيت العالمي
npm install -g @anthropic-ai/claude-code

# التحقق من التثبيت
claude --version

# أو باستخدام Bun (أسرع)
bun install -g @anthropic-ai/claude-code
\`\`\`

### الإعداد الأول

\`\`\`bash
# إعداد الـ API key
claude

# في أول تشغيل ستُسأل عن:
# 1. API key (من console.anthropic.com)
# 2. Default model (Sonnet موصى به)
# 3. Theme preference
\`\`\`

### الأوامر الأساسية

#### التفاعل اليومي
\`\`\`bash
# بدء جلسة تفاعلية في المشروع الحالي
claude

# سؤال مباشر (بدون جلسة تفاعلية)
claude "ما هو الغرض من هذه الدالة؟"

# تشغيل مهمة محددة
claude "أضف error handling لجميع async functions في src/"

# مراجعة ملف معين
claude "راجع هذا الملف وأخبرني بالمشاكل" < src/api/route.ts
\`\`\`

#### إدارة السياق
\`\`\`bash
# عرض السياق الحالي
claude /context

# إضافة ملف للسياق
claude /add src/types/index.ts

# مسح السياق والبدء من جديد
claude /clear
\`\`\`

### ملف CLAUDE.md — قلب الإعداد

CLAUDE.md هو ملف تضعه في جذر مشروعك، يقرأه Claude Code تلقائياً في كل جلسة:

\`\`\`markdown
# اسم المشروع

## التقنيات
- Next.js 15 + TypeScript
- Supabase (auth + database)
- TailwindCSS

## قواعد الكود
- استخدم async/await لا .then()
- كل الـ API routes يجب أن تتحقق من المصادقة
- اتبع naming convention: camelCase للـ variables، PascalCase للـ components

## ما لا تفعله أبداً
- لا تحذف ملفات بدون تأكيد
- لا تعدّل ملفات الـ .env
- لا تغيّر schema قاعدة البيانات بدون مراجعة

## هيكل المجلدات
src/
├── app/          # Next.js routes
├── components/   # React components
├── lib/          # Utilities
└── data/         # Static data
\`\`\`

### اختصارات مفيدة في الجلسة التفاعلية

| الاختصار | الوظيفة |
|---------|---------|
| \`Ctrl+C\` | إيقاف الرد الحالي |
| \`Ctrl+L\` | مسح الشاشة |
| \`↑↓\` | التنقل بين الأوامر السابقة |
| \`/help\` | عرض كل الأوامر |
| \`/exit\` | الخروج |

### أوضاع العمل

**الوضع الحذر (افتراضي):**
يطلب التأكيد قبل تعديل الملفات — مناسب للمشاريع الحساسة.

**الوضع التلقائي:**
يطبّق التغييرات مباشرةً — مناسب للمهام الواضحة:
\`\`\`bash
claude --dangerously-skip-permissions "أضف JSDoc لكل الدوال في utils/"
\`\`\`

### تكامل مع VS Code

\`\`\`bash
# تثبيت امتداد VS Code
code --install-extension anthropics.claude-code

# الآن يمكنك استخدام Claude Code من VS Code مباشرةً
\`\`\`
`,
      bodyEn: `## Claude Code: Installation and Setup

Claude Code is a professional CLI that turns Claude into a real coding assistant that works directly in your terminal and interacts with your actual project files.

### Why Claude Code?

The difference between Claude.ai and Claude Code:

| | Claude.ai | Claude Code |
|--|-----------|------------|
| **File access** | Manual upload | Read/write directly |
| **Run commands** | No | Runs terminal commands |
| **Context** | Conversation only | Entire project |
| **Usage** | Browser | Terminal |
| **Best for** | General questions | Actual development |

### Installation Requirements

- **Node.js 18+** (check: \`node --version\`)
- **npm 8+** or **Bun**
- Claude account with API key (from console.anthropic.com)
- **OS:** macOS / Linux / Windows (WSL2 recommended)

### Installation

\`\`\`bash
# Global installation
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version

# Or using Bun (faster)
bun install -g @anthropic-ai/claude-code
\`\`\`

### First-Time Setup

\`\`\`bash
# Configure API key
claude

# On first run you'll be asked for:
# 1. API key (from console.anthropic.com)
# 2. Default model (Sonnet recommended)
# 3. Theme preference
\`\`\`

### Basic Commands

#### Daily Interaction
\`\`\`bash
# Start an interactive session in the current project
claude

# Direct question (without interactive session)
claude "What is the purpose of this function?"

# Run a specific task
claude "Add error handling to all async functions in src/"

# Review a specific file
claude "Review this file and tell me the issues" < src/api/route.ts
\`\`\`

### CLAUDE.md — The Core of Configuration

CLAUDE.md is a file you place in your project root. Claude Code reads it automatically every session:

\`\`\`markdown
# Project Name

## Technologies
- Next.js 15 + TypeScript
- Supabase (auth + database)
- TailwindCSS

## Code Rules
- Use async/await not .then()
- All API routes must verify authentication
- Follow naming: camelCase for variables, PascalCase for components

## Never Do
- Don't delete files without confirmation
- Don't modify .env files
- Don't change database schema without review
\`\`\`

### Useful Shortcuts in Interactive Session

| Shortcut | Function |
|---------|---------|
| \`Ctrl+C\` | Stop current response |
| \`Ctrl+L\` | Clear screen |
| \`↑↓\` | Navigate previous commands |
| \`/help\` | Show all commands |
| \`/exit\` | Exit |
`,
      codeExample: `#!/bin/bash
# سكريبت إعداد Claude Code لمشروع جديد
# احفظه كـ setup-claude.sh وشغّله مرة واحدة

set -e

echo "🤖 إعداد Claude Code للمشروع..."

# 1. التحقق من التثبيت
if ! command -v claude &> /dev/null; then
    echo "📦 تثبيت Claude Code..."
    npm install -g @anthropic-ai/claude-code
fi

echo "✅ Claude Code v$(claude --version) مثبّت"

# 2. إنشاء CLAUDE.md
cat > CLAUDE.md << 'EOF'
# مشروع Darhous AI Academy

## Stack التقني
- Next.js 15 (App Router) + TypeScript strict
- Supabase (auth + PostgreSQL + Storage)
- TailwindCSS + shadcn/ui
- @react-pdf/renderer للشهادات

## قواعد لا تكسرها
- كل الـ API routes تتحقق من authentication
- استخدم Server Components بالـ default
- error handling في كل fetch/await
- لا تعدّل ملفات .env أبداً

## هيكل المجلدات
src/
├── app/[locale]/     # Pages (bilingual AR/EN)
├── app/api/          # API Routes
├── components/       # Reusable components
├── data/             # Static data files
├── lib/              # Utilities & helpers
└── types/            # TypeScript types

## Style Guide
- PascalCase: Components, Types, Interfaces
- camelCase: variables, functions, hooks
- kebab-case: files, folders, IDs
- SCREAMING_SNAKE: constants

## لغة الكود
- Comments: بالعربية للسياق العام
- Code: بالإنجليزية (variable names, etc.)
- Error messages: بالعربية للمستخدم
EOF

echo "✅ تم إنشاء CLAUDE.md"

# 3. إنشاء .claudeignore (ملفات Claude لا يحتاجها)
cat > .claudeignore << 'EOF'
node_modules/
.next/
.git/
*.log
*.lock
dist/
build/
coverage/
public/automation/workflows-json/
EOF

echo "✅ تم إنشاء .claudeignore"

# 4. إنشاء سكريبت مساعد للمهام الشائعة
cat > scripts/claude-tasks.sh << 'EOF'
#!/bin/bash
# مهام Claude Code المشتركة

case "\$1" in
  review)
    claude "راجع الكود في \${2:-src/} وأخبرني بأي مشاكل أمان أو أداء"
    ;;
  types)
    claude "تحقق من TypeScript types وأخبرني بأي أخطاء محتملة في src/"
    ;;
  tests)
    claude "اكتب unit tests لـ \${2:-src/lib/} باستخدام Jest"
    ;;
  docs)
    claude "أضف JSDoc documentation لجميع functions المُصدَّرة في \${2:-src/lib/}"
    ;;
  *)
    echo "الاستخدام: ./claude-tasks.sh [review|types|tests|docs] [مسار اختياري]"
    ;;
esac
EOF

chmod +x scripts/claude-tasks.sh
echo "✅ تم إنشاء scripts/claude-tasks.sh"

echo ""
echo "🎉 Claude Code جاهز! الأوامر المتاحة:"
echo "  claude                    # جلسة تفاعلية"
echo "  ./scripts/claude-tasks.sh review   # مراجعة الكود"
echo "  ./scripts/claude-tasks.sh types    # فحص TypeScript"`,
      codeLanguage: "bash",
    },

    // Lesson 5 — MCP Servers
    {
      bodyAr: `## MCP Servers

MCP (Model Context Protocol) هو بروتوكول مفتوح طوّرته Anthropic يسمح لـ Claude بالتفاعل مع أدوات وأنظمة خارجية بطريقة آمنة وموحدة.

### الفكرة الأساسية

قبل MCP، كان كل تكامل يتطلب كوداً مخصصاً. مع MCP:

\`\`\`
Claude ←→ MCP Protocol ←→ أي أداة/نظام
\`\`\`

Claude يتحدث بـ MCP، والأداة تتحدث بـ MCP، والتكامل يحدث تلقائياً.

### مكونات MCP

**1. MCP Server**
تطبيق صغير يكشف وظائف الأداة عبر بروتوكول MCP.

**2. MCP Client**
هو Claude Code أو Claude.ai — يتصل بالـ server ويستخدم وظائفه.

**3. Tools**
الإجراءات التي يمكن لـ Claude استدعاؤها (read_file, run_query, create_issue...).

**4. Resources**
بيانات يمكن لـ Claude قراءتها (قواعد بيانات، ملفات، APIs).

### MCP Servers الجاهزة

#### Filesystem
\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed"]
    }
  }
}
\`\`\`
يتيح لـ Claude قراءة/كتابة الملفات في المسار المحدد فقط.

#### GitHub
\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" }
    }
  }
}
\`\`\`
يتيح لـ Claude إنشاء Issues، مراجعة PRs، البحث في الكود.

#### Supabase
\`\`\`json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "https://xxx.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJxxx"
      }
    }
  }
}
\`\`\`
يتيح لـ Claude الاستعلام عن قاعدة البيانات وتنفيذ SQL.

#### Brave Search
\`\`\`json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "BSAxxxx" }
    }
  }
}
\`\`\`
يتيح لـ Claude البحث على الإنترنت في الوقت الفعلي.

### إعداد MCP في Claude Code

\`\`\`bash
# مشاهدة الـ servers المتصلة
claude mcp list

# إضافة server
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/projects

# إزالة server
claude mcp remove filesystem
\`\`\`

أو يدوياً في \`~/.config/claude/mcp.json\`:

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/ahmed/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
      }
    }
  }
}
\`\`\`

### بناء MCP Server مخصص

إذا أردت ربط Claude بنظامك الداخلي، يمكنك بناء Server خاص بك في Python أو TypeScript.

مثال بسيط بـ Python:

\`\`\`python
from mcp.server import Server
from mcp.types import Tool, TextContent
import mcp.server.stdio

server = Server("my-company-tools")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_employee_info",
            description="احصل على معلومات موظف بالـ ID",
            inputSchema={
                "type": "object",
                "properties": {
                    "employee_id": {"type": "string"}
                },
                "required": ["employee_id"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_employee_info":
        # هنا تقرأ من قاعدة بياناتك الداخلية
        emp_id = arguments["employee_id"]
        info = get_from_db(emp_id)
        return [TextContent(type="text", text=str(info))]

if __name__ == "__main__":
    mcp.server.stdio.run(server)
\`\`\`

### أمان MCP

**قاعدة ذهبية:** امنح Claude الأذونات الأدنى الكافية.

- لا تعطِ كل الملفات — حدد المجلدات المسموح بها
- لا تستخدم service_role key للـ Supabase — استخدم restricted key
- راجع كل tool قبل إضافتها للإعداد
`,
      bodyEn: `## MCP Servers

MCP (Model Context Protocol) is an open protocol developed by Anthropic that allows Claude to interact with external tools and systems in a safe, standardized way.

### The Core Idea

Before MCP, every integration required custom code. With MCP:

\`\`\`
Claude ←→ MCP Protocol ←→ Any tool/system
\`\`\`

Claude speaks MCP, the tool speaks MCP, and integration happens automatically.

### MCP Components

**1. MCP Server**
A small application that exposes a tool's functionality via the MCP protocol.

**2. MCP Client**
Claude Code or Claude.ai — connects to the server and uses its functions.

**3. Tools**
Actions Claude can call (read_file, run_query, create_issue...).

**4. Resources**
Data Claude can read (databases, files, APIs).

### Ready-to-Use MCP Servers

#### Filesystem
\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed"]
    }
  }
}
\`\`\`
Lets Claude read/write files in the specified path only.

#### GitHub
\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" }
    }
  }
}
\`\`\`
Lets Claude create Issues, review PRs, and search code.

### Security

**Golden Rule:** Grant Claude the minimum necessary permissions.

- Don't give all files — specify allowed folders
- Don't use Supabase service_role key — use a restricted key
- Review every tool before adding it to the config
`,
      codeExample: `# بناء MCP Server بسيط بـ Python
# يربط Claude بقاعدة بيانات SQLite محلية

# التثبيت: pip install mcp

import sqlite3
import asyncio
from mcp.server import Server
from mcp.types import Tool, TextContent, Resource, ReadResourceResult
import mcp.server.stdio

# إنشاء قاعدة بيانات تجريبية
def init_db():
    conn = sqlite3.connect("academy.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            courses_enrolled INTEGER DEFAULT 0,
            last_login TEXT
        )
    """)
    conn.execute("""
        INSERT OR IGNORE INTO students VALUES
        ('s001', 'أحمد محمد', 'ahmed@example.com', 3, '2026-06-01'),
        ('s002', 'سارة علي', 'sara@example.com', 5, '2026-06-05'),
        ('s003', 'محمد خالد', 'm.khalid@example.com', 1, '2026-05-28')
    """)
    conn.commit()
    conn.close()

init_db()

# إنشاء الـ MCP Server
server = Server("academy-db-server")

@server.list_tools()
async def list_tools() -> list[Tool]:
    """قائمة الأدوات التي يمكن لـ Claude استخدامها"""
    return [
        Tool(
            name="get_student",
            description="احصل على معلومات طالب بالـ ID",
            inputSchema={
                "type": "object",
                "properties": {
                    "student_id": {
                        "type": "string",
                        "description": "معرّف الطالب (مثل: s001)"
                    }
                },
                "required": ["student_id"]
            }
        ),
        Tool(
            name="list_students",
            description="احصل على قائمة كل الطلاب",
            inputSchema={"type": "object", "properties": {}}
        ),
        Tool(
            name="run_query",
            description="تشغيل استعلام SQL للقراءة فقط",
            inputSchema={
                "type": "object",
                "properties": {
                    "sql": {
                        "type": "string",
                        "description": "استعلام SELECT فقط"
                    }
                },
                "required": ["sql"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """تنفيذ الأداة المطلوبة"""
    conn = sqlite3.connect("academy.db")
    conn.row_factory = sqlite3.Row

    try:
        if name == "get_student":
            row = conn.execute(
                "SELECT * FROM students WHERE id = ?",
                (arguments["student_id"],)
            ).fetchone()

            if not row:
                return [TextContent(type="text", text="الطالب غير موجود")]

            result = dict(row)
            return [TextContent(type="text", text=str(result))]

        elif name == "list_students":
            rows = conn.execute("SELECT * FROM students").fetchall()
            result = [dict(r) for r in rows]
            return [TextContent(type="text", text=str(result))]

        elif name == "run_query":
            sql = arguments["sql"].strip().upper()
            # أمان: SELECT فقط
            if not sql.startswith("SELECT"):
                return [TextContent(type="text", text="❌ مسموح فقط بـ SELECT")]

            rows = conn.execute(arguments["sql"]).fetchall()
            result = [dict(r) for r in rows]
            return [TextContent(type="text", text=str(result))]

    finally:
        conn.close()

    return [TextContent(type="text", text="أداة غير معروفة")]

async def main():
    print("🚀 MCP Academy Server يعمل...")
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())

# ──────────────────────────────────────
# إضافة الـ Server لـ Claude Code:
# claude mcp add academy-db -- python path/to/this/server.py`,
      codeLanguage: "python",
    },

    // Lesson 6 — Claude API من الصفر
    {
      bodyAr: `## Claude API من الصفر

Claude API يفتح لك الاحتمالات الكاملة لبناء تطبيقات AI حقيقية. في هذا الدرس ستتعلم من الـ authentication وحتى الـ streaming.

### الخطوة الأولى: الحصول على API Key

1. اذهب إلى [console.anthropic.com](https://console.anthropic.com)
2. سجّل حساباً أو ادخل
3. API Keys → Create Key
4. احفظ الـ key في مكان آمن — لن تراه مرة أخرى

### تثبيت الـ SDK

\`\`\`bash
# Python
pip install anthropic

# Node.js / TypeScript
npm install @anthropic-ai/sdk

# أو Bun
bun add @anthropic-ai/sdk
\`\`\`

### أول طلب

**Python:**
\`\`\`python
import anthropic

client = anthropic.Anthropic(api_key="sk-ant-xxx")

message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "اشرح لي ما هو الذكاء الاصطناعي في 3 جمل"}
    ]
)

print(message.content[0].text)
\`\`\`

**TypeScript:**
\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "اشرح لي ما هو الذكاء الاصطناعي في 3 جمل" }
  ],
});

console.log(message.content[0].text);
\`\`\`

### بنية الرسائل

\`\`\`python
messages = [
    {"role": "user", "content": "ما هو Python؟"},
    {"role": "assistant", "content": "Python لغة برمجة..."},  # رد سابق
    {"role": "user", "content": "ما هي أفضل مكتباتها؟"},      # سؤال جديد
]
\`\`\`

هكذا تبني محادثة متعددة الأدوار.

### System Prompts

\`\`\`python
message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    system="أنت مساعد تقني متخصص في Python. أجب دائماً بأمثلة كود.",
    messages=[
        {"role": "user", "content": "كيف أعكس قائمة؟"}
    ]
)
\`\`\`

### Streaming (البث المباشر)

\`\`\`python
with client.messages.stream(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "اكتب قصيدة عن البرمجة"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
\`\`\`

Streaming ضروري لتطبيقات الـ chat — يُظهر الرد فور توليده بدلاً من الانتظار.

### Vision API (تحليل الصور)

\`\`\`python
import base64

with open("screenshot.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": image_data,
                    },
                },
                {"type": "text", "text": "ما المشكلة في هذا الكود؟"}
            ],
        }
    ],
)
\`\`\`

### Tool Use (أدوات خارجية)

Tool Use يسمح لـ Claude باستدعاء دوال في كودك:

\`\`\`python
tools = [
    {
        "name": "get_weather",
        "description": "احصل على الطقس في مدينة معينة",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "اسم المدينة"}
            },
            "required": ["city"]
        }
    }
]

message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "ما طقس الرياض اليوم؟"}]
)

# إذا أراد Claude استخدام الأداة:
if message.stop_reason == "tool_use":
    tool_call = next(b for b in message.content if b.type == "tool_use")
    city = tool_call.input["city"]
    weather_result = fetch_weather_api(city)  # دالتك الحقيقية
    # ثم أرسل النتيجة لـ Claude ليكمل إجابته
\`\`\`

### معالجة الأخطاء

\`\`\`python
from anthropic import APIStatusError, APIConnectionError, RateLimitError

try:
    message = client.messages.create(...)
except RateLimitError:
    # انتظر وأعد المحاولة
    time.sleep(60)
except APIStatusError as e:
    if e.status_code == 529:  # Overloaded
        print("API مزدحم — حاول لاحقاً")
except APIConnectionError:
    print("تعذّر الاتصال — فحص الشبكة")
\`\`\`

### الأسعار (2026)

| النموذج | Input ($/1M token) | Output ($/1M token) |
|---------|-------------------|-------------------|
| Haiku 4.5 | $0.80 | $4 |
| Sonnet 4.6 | $3 | $15 |
| Opus 4.8 | $15 | $75 |

نصيحة: استخدم Haiku للمهام البسيطة المتكررة وOpus للتحليل المعقد.
`,
      bodyEn: `## Claude API from Scratch

The Claude API opens the full possibilities for building real AI applications. In this lesson you'll learn from authentication all the way to streaming.

### Step 1: Get an API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Register or sign in
3. API Keys → Create Key
4. Save the key somewhere safe — you won't see it again

### Install the SDK

\`\`\`bash
# Python
pip install anthropic

# Node.js / TypeScript
npm install @anthropic-ai/sdk
\`\`\`

### First Request

**Python:**
\`\`\`python
import anthropic

client = anthropic.Anthropic(api_key="sk-ant-xxx")

message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain what AI is in 3 sentences"}
    ]
)

print(message.content[0].text)
\`\`\`

### Streaming

\`\`\`python
with client.messages.stream(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a poem about programming"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
\`\`\`

Streaming is essential for chat applications — it shows the response as it's generated rather than waiting.
`,
      codeExample: `# تطبيق Chat كامل مع Claude API
# يدعم: محادثة متعددة الأدوار + Streaming + حفظ السجل

import anthropic
import json
from pathlib import Path
from datetime import datetime

client = anthropic.Anthropic()  # يقرأ ANTHROPIC_API_KEY من env تلقائياً

HISTORY_FILE = Path("chat_history.json")

def load_history() -> list[dict]:
    """تحميل سجل المحادثة"""
    if HISTORY_FILE.exists():
        return json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
    return []

def save_history(messages: list[dict]) -> None:
    """حفظ سجل المحادثة"""
    HISTORY_FILE.write_text(
        json.dumps(messages, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def chat(
    user_input: str,
    history: list[dict],
    system_prompt: str = "أنت مساعد ذكي تتحدث العربية. أجب بإيجاز ووضوح.",
    model: str = "claude-opus-4-8",
    stream: bool = True
) -> tuple[str, list[dict]]:
    """
    إرسال رسالة والحصول على رد مع streaming اختياري.
    يُرجع (الرد, السجل المحدَّث).
    """
    # إضافة رسالة المستخدم
    history.append({"role": "user", "content": user_input})

    full_response = ""

    if stream:
        print("Claude: ", end="", flush=True)
        with client.messages.stream(
            model=model,
            max_tokens=2048,
            system=system_prompt,
            messages=history
        ) as stream_ctx:
            for text in stream_ctx.text_stream:
                print(text, end="", flush=True)
                full_response += text
        print()  # سطر جديد بعد الرد
    else:
        message = client.messages.create(
            model=model,
            max_tokens=2048,
            system=system_prompt,
            messages=history
        )
        full_response = message.content[0].text
        print(f"Claude: {full_response}")

    # إضافة رد Claude للسجل
    history.append({"role": "assistant", "content": full_response})

    return full_response, history


def main():
    print("=" * 50)
    print("🤖 Claude Chat — اكتب 'خروج' للإنهاء")
    print("=" * 50)

    # تحميل السجل السابق أو البدء من جديد
    choice = input("\nهل تريد استئناف المحادثة السابقة؟ (y/n): ").strip().lower()
    history = load_history() if choice == "y" else []

    if history:
        print(f"✅ تم تحميل {len(history)} رسالة سابقة")

    system_prompt = """أنت مساعد AI متخصص للطلاب في أكاديمية Darhous.
مهامك:
- شرح مفاهيم AI وBrainomvation بطريقة مبسطة
- مساعدة في الكود والأخطاء التقنية
- تقديم أمثلة عملية وواقعية
أسلوبك: ودود، واضح، موجز — بالعربية."""

    session_messages: list[dict] = []  # رسائل الجلسة الحالية فقط

    while True:
        user_input = input("\nأنت: ").strip()

        if not user_input:
            continue

        if user_input in ["خروج", "exit", "quit"]:
            # دمج رسائل الجلسة مع السجل وحفظه
            full_history = history + session_messages
            save_history(full_history)
            print(f"\n✅ تم حفظ {len(full_history)} رسالة في {HISTORY_FILE}")
            break

        _, session_messages = chat(
            user_input=user_input,
            history=history + session_messages,  # السياق الكامل
            system_prompt=system_prompt
        )

        # نبقي فقط رسائل الجلسة الحالية في session_messages
        # لتجنب التكرار مع history
        if len(session_messages) > 2:
            session_messages = session_messages[-20:]  # آخر 10 أزواج

if __name__ == "__main__":
    main()`,
      codeLanguage: "python",
    },

    // Lesson 7 — مشروع: بناء مساعد ذكي كامل
    {
      bodyAr: `## مشروع: بناء مساعد ذكي كامل

في هذا المشروع ستطبّق كل ما تعلمته في الدورة لبناء مساعد AI كامل يعمل من terminal. المساعد يدعم: محادثة طويلة، تحليل الملفات، البحث في الويب (عبر MCP)، وذاكرة بين الجلسات.

### ما ستبنيه

\`\`\`
Smart Assistant
├── 💬 محادثة متعددة الأدوار مع Streaming
├── 📁 تحليل الملفات (PDF, Code, Text)
├── 🔍 بحث في الويب (عبر Brave MCP)
├── 🧠 ذاكرة بين الجلسات
└── 🎨 واجهة terminal جميلة
\`\`\`

### هيكل المشروع

\`\`\`
smart-assistant/
├── main.py           # نقطة الدخول
├── assistant.py      # منطق المساعد
├── memory.py         # نظام الذاكرة
├── tools.py          # أدوات المساعد
├── ui.py             # واجهة المستخدم
├── .env              # متغيرات البيئة
└── requirements.txt  # المتطلبات
\`\`\`

### ما تحتاجه

\`\`\`bash
pip install anthropic rich python-dotenv pypdf2
\`\`\`

متغيرات البيئة (.env):
\`\`\`
ANTHROPIC_API_KEY=sk-ant-xxx
ASSISTANT_NAME=دارهوس
MEMORY_MAX_MESSAGES=50
\`\`\`

### ما تعلمته في هذه الدورة

في هذه الدورة، مررت بكل ما يحتاجه المحترف لاستخدام Claude بفعالية:

| الدرس | ما تعلمته |
|-------|---------|
| 1. Claude.ai | Projects, Artifacts, خطط الاشتراك |
| 2. الإطار الاحترافي | CRAFT, Chain-of-Thought, XML Tags |
| 3. Projects | System Prompts دائمة، ملفات المعرفة |
| 4. Claude Code | CLI، CLAUDE.md، اختصارات |
| 5. MCP | بروتوكول التكامل، Servers جاهزة |
| 6. Claude API | SDK، Streaming، Vision، Tool Use |
| 7. **المشروع** | تطبيق حقيقي يجمع كل المهارات |

### الخطوات التالية

بعد إتمام هذا المشروع، يمكنك:

1. **إضافة واجهة ويب** — استخدم Next.js + Vercel AI SDK
2. **ربط Supabase** — حفظ المحادثات في قاعدة بيانات
3. **إضافة Voice** — استخدم Whisper للتفريغ الصوتي
4. **نشر على Vercel** — اجعل المساعد متاحاً للعموم

### تحدّيك

ابنِ المشروع كاملاً، ثم أضف ميزة واحدة من اختيارك:
- دعم الصور (Vision API)
- تلخيص تلقائي للمحادثة الطويلة
- تعدد الشخصيات (اختر بين عدة system prompts)
- تصدير المحادثة إلى PDF

شارك نتيجتك في مجتمع Darhous!
`,
      bodyEn: `## Project: Build a Complete Smart Assistant

In this project you'll apply everything you've learned in the course to build a complete AI assistant that runs in the terminal. The assistant supports: long conversations, file analysis, web search (via MCP), and memory between sessions.

### What You'll Build

\`\`\`
Smart Assistant
├── 💬 Multi-turn conversation with Streaming
├── 📁 File analysis (PDF, Code, Text)
├── 🔍 Web search (via Brave MCP)
├── 🧠 Memory between sessions
└── 🎨 Beautiful terminal UI
\`\`\`

### Project Structure

\`\`\`
smart-assistant/
├── main.py           # Entry point
├── assistant.py      # Assistant logic
├── memory.py         # Memory system
├── tools.py          # Assistant tools
├── ui.py             # User interface
├── .env              # Environment variables
└── requirements.txt  # Requirements
\`\`\`

### What You Need

\`\`\`bash
pip install anthropic rich python-dotenv pypdf2
\`\`\`

### What You Learned in This Course

In this course, you went through everything a professional needs to use Claude effectively:

| Lesson | What You Learned |
|--------|---------|
| 1. Claude.ai | Projects, Artifacts, subscription plans |
| 2. Professional Framework | CRAFT, Chain-of-Thought, XML Tags |
| 3. Projects | Permanent System Prompts, knowledge files |
| 4. Claude Code | CLI, CLAUDE.md, shortcuts |
| 5. MCP | Integration protocol, ready-to-use servers |
| 6. Claude API | SDK, Streaming, Vision, Tool Use |
| 7. **Project** | A real app combining all skills |
`,
      codeExample: `# smart-assistant/assistant.py
# المساعد الذكي الكامل — يجمع كل مهارات الدورة

import os
import json
import anthropic
from pathlib import Path
from datetime import datetime
from typing import Optional
import base64

# ──────────────────────────────────────
# نظام الذاكرة
# ──────────────────────────────────────
MEMORY_FILE = Path("memory.json")

def load_memory() -> dict:
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text(encoding="utf-8"))
    return {"messages": [], "facts": [], "created_at": datetime.now().isoformat()}

def save_memory(memory: dict) -> None:
    max_msgs = int(os.getenv("MEMORY_MAX_MESSAGES", "50"))
    if len(memory["messages"]) > max_msgs:
        # احتفظ بأهم الرسائل (الأولى 5 + آخر max-5)
        memory["messages"] = memory["messages"][:5] + memory["messages"][-(max_msgs-5):]
    MEMORY_FILE.write_text(
        json.dumps(memory, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

# ──────────────────────────────────────
# تحليل الملفات
# ──────────────────────────────────────
def read_file_content(file_path: str) -> tuple[str, str]:
    """
    يقرأ الملف ويُرجع (المحتوى, نوع الملف).
    يدعم: .txt .py .ts .js .md .pdf
    """
    path = Path(file_path)
    suffix = path.suffix.lower()

    if suffix == ".pdf":
        try:
            import PyPDF2
            with open(path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                text = "\n".join(
                    page.extract_text() or "" for page in reader.pages
                )
            return text[:20000], "pdf"  # حد 20K حرف
        except ImportError:
            return "خطأ: مكتبة PyPDF2 غير مثبتة (pip install pypdf2)", "error"

    elif suffix in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
        # صور — ترجع base64 للـ Vision API
        with open(path, "rb") as f:
            data = base64.standard_b64encode(f.read()).decode()
        media_type = f"image/{suffix[1:].replace('jpg', 'jpeg')}"
        return data, f"image:{media_type}"

    else:
        # ملفات نصية
        try:
            return path.read_text(encoding="utf-8")[:20000], "text"
        except UnicodeDecodeError:
            return path.read_text(encoding="latin-1")[:20000], "text"


# ──────────────────────────────────────
# المساعد الرئيسي
# ──────────────────────────────────────
class SmartAssistant:
    def __init__(self):
        self.client = anthropic.Anthropic()
        self.name = os.getenv("ASSISTANT_NAME", "المساعد الذكي")
        self.memory = load_memory()
        self.model = "claude-opus-4-8"

        self.system_prompt = f"""أنت {self.name} — مساعد AI ذكي ومخصص.

قدراتك:
- محادثة طبيعية وذكية بالعربية والإنجليزية
- تحليل الملفات (كود، PDF، نصوص)
- تحليل الصور وشرح محتواها
- تذكّر المحادثات السابقة

أسلوبك:
- ودود، واضح، موجز
- استخدم أمثلة عملية
- اعترف بعدم المعرفة بدلاً من التخمين
- عند الكود، استخدم code blocks دائماً

التاريخ الحالي: {datetime.now().strftime('%Y-%m-%d')}"""

    def build_messages(self, new_message: dict) -> list[dict]:
        """بناء قائمة الرسائل مع السياق التاريخي"""
        return self.memory["messages"] + [new_message]

    def chat(self, user_input: str, file_path: Optional[str] = None) -> str:
        """إرسال رسالة والحصول على رد مع streaming"""

        # بناء محتوى الرسالة
        if file_path:
            content, file_type = read_file_content(file_path)

            if file_type.startswith("image:"):
                media_type = file_type.split(":")[1]
                message_content = [
                    {
                        "type": "image",
                        "source": {"type": "base64", "media_type": media_type, "data": content}
                    },
                    {"type": "text", "text": user_input}
                ]
            else:
                message_content = f"{user_input}\n\n<file name='{Path(file_path).name}'>\n{content}\n</file>"
        else:
            message_content = user_input

        new_message = {"role": "user", "content": message_content}
        messages = self.build_messages(new_message)

        # Streaming response
        full_response = ""
        print(f"\n{self.name}: ", end="", flush=True)

        with self.client.messages.stream(
            model=self.model,
            max_tokens=2048,
            system=self.system_prompt,
            messages=messages
        ) as stream:
            for text in stream.text_stream:
                print(text, end="", flush=True)
                full_response += text

        print()  # سطر جديد

        # حفظ في الذاكرة (نص فقط للـ user إذا كان content قائمة)
        user_text = user_input if file_path else str(message_content)
        self.memory["messages"].append({"role": "user", "content": user_text})
        self.memory["messages"].append({"role": "assistant", "content": full_response})
        save_memory(self.memory)

        return full_response

    def clear_memory(self):
        """مسح ذاكرة المحادثة"""
        self.memory["messages"] = []
        save_memory(self.memory)
        print("✅ تم مسح الذاكرة")


# ──────────────────────────────────────
# تشغيل المساعد
# ──────────────────────────────────────
def main():
    from dotenv import load_dotenv
    load_dotenv()

    assistant = SmartAssistant()

    print("=" * 55)
    print(f"🤖 {assistant.name} — مساعد AI الكامل")
    print("=" * 55)
    print("الأوامر:")
    print("  /ملف <مسار>  — تحليل ملف")
    print("  /مسح         — مسح الذاكرة")
    print("  /خروج        — الخروج")
    print("-" * 55)

    if assistant.memory["messages"]:
        print(f"💾 تم تحميل {len(assistant.memory['messages'])} رسالة من الذاكرة")

    while True:
        user_input = input("\nأنت: ").strip()

        if not user_input:
            continue

        if user_input in ["/خروج", "/exit"]:
            print("\n👋 إلى اللقاء!")
            break

        if user_input == "/مسح":
            assistant.clear_memory()
            continue

        if user_input.startswith("/ملف "):
            file_path = user_input[5:].strip()
            if not Path(file_path).exists():
                print(f"❌ الملف غير موجود: {file_path}")
                continue
            question = input("سؤالك عن الملف: ").strip() or "حلّل هذا الملف"
            assistant.chat(question, file_path=file_path)
            continue

        assistant.chat(user_input)

if __name__ == "__main__":
    main()`,
      codeLanguage: "python",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // C7b — machine-learning (8 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  "machine-learning": [

    // Lesson 1 — ما هو تعلم الآلة؟
    {
      bodyAr: `## ما هو تعلم الآلة؟

تعلم الآلة (Machine Learning) هو الفرع من الذكاء الاصطناعي الذي يُمكّن الأنظمة من التعلم من البيانات وتحسين أدائها بمرور الوقت — بدون برمجة صريحة لكل قاعدة.

### التعريف الأوضح

في البرمجة التقليدية:
\`\`\`
البيانات + القواعد → النتائج
\`\`\`

في تعلم الآلة:
\`\`\`
البيانات + النتائج → القواعد (النموذج)
\`\`\`

أنت تُطعم النموذج أمثلة، وهو يستنتج القواعد تلقائياً.

### مثال حقيقي: تصفية البريد المزعج

**الطريقة التقليدية:**
\`\`\`python
def is_spam(email):
    if "مجاني" in email and "اضغط هنا" in email:
        return True
    if "ربح فوري" in email:
        return True
    return False
\`\`\`
المشكلة: لا تغطي كل الحالات وتحتاج تحديثاً يدوياً مستمراً.

**طريقة ML:**
نعطي النموذج 10,000 إيميل (5000 مزعج + 5000 حقيقي) فيتعلم الأنماط بنفسه ويكتشف سمات Spam لم تخطر لنا.

### لماذا ML الآن؟

ثلاثة عوامل اجتمعت:

| العامل | التفصيل |
|--------|---------|
| **البيانات الضخمة** | مليارات الأمثلة متاحة (صور، نصوص، معاملات) |
| **القوة الحسابية** | GPU يسرّع الحسابات بـ 100x على CPU |
| **الخوارزميات** | Gradient Descent، Backprop، Transformers |

### أين يُستخدم ML اليوم؟

- **التوصيات:** Netflix، YouTube، Amazon
- **الطب:** تشخيص السرطان من صور الأشعة
- **المالية:** كشف الاحتيال في البطاقات البنكية
- **اللغة:** ترجمة Google، ChatGPT، Claude
- **القيادة الذاتية:** Tesla، Waymo
- **التصنيع:** صيانة تنبؤية للآلات

### المكونات الأساسية لأي نظام ML

\`\`\`
البيانات → المعالجة → النموذج → التدريب → التقييم → النشر
\`\`\`

**البيانات (Data):** المواد الخام — بدونها لا يوجد ML.

**الميزات (Features):** الخصائص التي نُطعمها للنموذج.
- مثال لبيت: المساحة، الغرف، الحي، العمر، الطابق

**التسمية (Labels):** الإجابة الصحيحة التي نريد تعلمها.
- مثال: سعر البيت

**النموذج (Model):** الخوارزمية التي تتعلم من البيانات.

**التدريب (Training):** عملية تحسين النموذج على بيانات التدريب.

**التقييم (Evaluation):** قياس أداء النموذج على بيانات لم يرَها من قبل.

### مصطلحات يجب حفظها

| المصطلح | التعريف |
|---------|---------|
| **Feature** | متغير مدخل (مساحة البيت) |
| **Label / Target** | ما نتنبأ به (السعر) |
| **Training set** | بيانات التدريب (80%) |
| **Test set** | بيانات الاختبار (20%) |
| **Overfitting** | النموذج يحفظ التدريب لكن يفشل على بيانات جديدة |
| **Underfitting** | النموذج بسيط جداً ولا يتعلم الأنماط |
| **Hyperparameter** | إعدادات النموذج التي تضبطها أنت |
`,
      bodyEn: `## What is Machine Learning?

Machine Learning (ML) is the branch of AI that enables systems to learn from data and improve over time — without explicitly programming every rule.

### The Clearest Definition

In traditional programming:
\`\`\`
Data + Rules → Results
\`\`\`

In machine learning:
\`\`\`
Data + Results → Rules (the model)
\`\`\`

You feed the model examples, and it derives the rules automatically.

### Real Example: Spam Filtering

**Traditional approach:** Write explicit rules (contains "free" + "click here" → spam). Problem: doesn't cover all cases, needs constant manual updates.

**ML approach:** Give the model 10,000 emails (5,000 spam + 5,000 real). It learns patterns on its own and discovers spam signals you'd never think of.

### Why ML Now?

Three factors aligned: massive data availability, GPU compute power (100x faster than CPU), and breakthrough algorithms (Gradient Descent, Backpropagation, Transformers).

### Core Components of Any ML System

\`\`\`
Data → Preprocessing → Model → Training → Evaluation → Deployment
\`\`\`

**Features:** Input characteristics fed to the model (house area, rooms, location).

**Labels:** The correct answer to learn (house price).

**Training set:** ~80% of data used for learning.

**Test set:** ~20% of data used to evaluate generalization.

### Key Terms

| Term | Definition |
|------|----------|
| **Overfitting** | Model memorizes training data but fails on new data |
| **Underfitting** | Model too simple, misses patterns |
| **Hyperparameter** | Settings you tune (learning rate, depth) |
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.datasets import load_iris, load_boston
import matplotlib
matplotlib.use("Agg")  # للتشغيل بدون شاشة
import matplotlib.pyplot as plt

# ─────────────────────────────
# مثال 1: استكشاف بيانات Iris
# ─────────────────────────────
print("=" * 50)
print("مثال 1: بيانات Iris الكلاسيكية")
print("=" * 50)

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df["species"] = [iris.target_names[t] for t in iris.target]

print(f"\\nشكل البيانات: {df.shape}")
print(f"الأنواع: {df['species'].unique()}")
print(f"\\nأول 5 صفوف:")
print(df.head())

print(f"\\nإحصائيات:")
print(df.describe().round(2))

# ─────────────────────────────
# مثال 2: تمييز Features وLabels
# ─────────────────────────────
print("\\n" + "=" * 50)
print("مثال 2: فصل Features عن Labels")
print("=" * 50)

X = df[iris.feature_names]   # Features (المدخلات)
y = df["species"]            # Labels (المخرجات)

print(f"Features shape: {X.shape}  ← (عدد الأمثلة, عدد الميزات)")
print(f"Labels shape:   {y.shape}  ← (عدد الأمثلة,)")

# ─────────────────────────────
# مثال 3: Train/Test Split
# ─────────────────────────────
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\\nحجم بيانات التدريب : {X_train.shape[0]} مثال ({X_train.shape[0]/len(X)*100:.0f}%)")
print(f"حجم بيانات الاختبار: {X_test.shape[0]} مثال ({X_test.shape[0]/len(X)*100:.0f}%)")

# ─────────────────────────────
# مثال 4: أول نموذج بسيط
# ─────────────────────────────
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

print("\\n" + "=" * 50)
print("مثال 4: أبسط نموذج — KNeighbors")
print("=" * 50)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\\nدقة النموذج على بيانات الاختبار: {accuracy:.1%}")

# تنبؤ بمثال جديد
new_flower = [[5.1, 3.5, 1.4, 0.2]]  # قياسات زهرة جديدة
prediction = model.predict(new_flower)
print(f"\\nتنبؤ لزهرة جديدة {new_flower[0]}: {prediction[0]}")`,
      codeLanguage: "python",
    },

    // Lesson 2 — أنواع التعلم: Supervised وUnsupervised
    {
      bodyAr: `## أنواع التعلم: Supervised وUnsupervised

تعلم الآلة له ثلاثة أنواع رئيسية، كل منها يناسب نوعاً مختلفاً من المشاكل. فهم الفرق بينها هو أول خطوة نحو اختيار الخوارزمية الصحيحة.

### 1. Supervised Learning (التعلم الخاضع للإشراف)

**التعريف:** النموذج يتعلم من بيانات **موسومة** (كل مثال له إجابة صحيحة معروفة).

**مثال:** تدريب نموذج للتنبؤ بسعر بيت:
- المدخل: مساحة، غرف، حي
- المخرج المعروف مسبقاً: السعر الفعلي

**متى تستخدمه؟** عندما يكون لديك بيانات مع إجابات صحيحة معروفة.

#### أنواع Supervised Learning:

**Regression (الانحدار)** — المخرج رقم مستمر:
- التنبؤ بسعر البيت
- التنبؤ بدرجة الحرارة
- التنبؤ بمبيعات الشهر القادم

**Classification (التصنيف)** — المخرج فئة:
- البريد: مزعج أم حقيقي؟
- صورة: قطة أم كلب؟
- مريض: مصاب أم سليم؟

### 2. Unsupervised Learning (التعلم غير الخاضع للإشراف)

**التعريف:** النموذج يجد أنماطاً في بيانات **غير موسومة** (بدون إجابات صحيحة مسبقة).

**مثال:** تجميع عملاء متجر إلكتروني:
- المدخل: سلوك الشراء، التصفح، المنتجات
- المخرج: مجموعات (segments) يكتشفها النموذج بنفسه

**متى تستخدمه؟** عندما تريد اكتشاف الأنماط المخفية في البيانات.

#### أنواع Unsupervised Learning:

**Clustering (التجميع)** — تجميع العناصر المتشابهة:
- K-Means Clustering
- DBSCAN
- Hierarchical Clustering

**Dimensionality Reduction** — تقليل عدد الميزات:
- PCA (Principal Component Analysis)
- t-SNE (للتصور)

**Anomaly Detection** — كشف الشذوذ:
- كشف احتيال بطاقات البنك
- كشف أعطال الأجهزة

### 3. Reinforcement Learning (التعلم التعزيزي)

**التعريف:** وكيل (Agent) يتعلم بالتجربة والخطأ للحصول على أقصى مكافأة.

**مثال:** تعليم روبوت المشي:
- يحاول خطوة → يسقط = مكافأة سلبية
- يحاول خطوة مختلفة → يتقدم = مكافأة إيجابية
- يتعلم تدريجياً ما يُكسبه أكبر مكافأة

**أشهر التطبيقات:**
- AlphaGo (لعبة الغو)
- OpenAI Five (Dota 2)
- روبوتات المصانع
- ضبط إعدادات Data Centers (Google)

### مقارنة شاملة

| الجانب | Supervised | Unsupervised | Reinforcement |
|--------|-----------|--------------|---------------|
| **البيانات** | موسومة | غير موسومة | تفاعل مع بيئة |
| **الهدف** | التنبؤ | اكتشاف أنماط | تعظيم المكافأة |
| **المثال** | تصنيف بريد | تجميع عملاء | ألعاب، روبوتات |
| **الصعوبة** | متوسط | أصعب (لا معيار واضح) | الأصعب |
| **الأكثر شيوعاً** | ✅ 70% من تطبيقات ML | 20% | 10% |

### كيف تختار النوع المناسب؟

\`\`\`
هل لديك بيانات موسومة؟
├── نعم → Supervised Learning
│   └── المخرج رقم أم فئة؟
│       ├── رقم → Regression
│       └── فئة → Classification
└── لا → Unsupervised Learning
    └── ماذا تريد؟
        ├── تجميع → Clustering
        └── تقليل أبعاد → Dimensionality Reduction
\`\`\`
`,
      bodyEn: `## Learning Types: Supervised and Unsupervised

Machine learning has three main types, each suited to a different kind of problem. Understanding the difference is the first step toward choosing the right algorithm.

### 1. Supervised Learning

**Definition:** The model learns from **labeled** data — every example has a known correct answer.

**When to use:** When you have data with known correct answers.

**Two subtypes:**
- **Regression:** Output is a continuous number (house price, temperature)
- **Classification:** Output is a category (spam/not spam, cat/dog)

### 2. Unsupervised Learning

**Definition:** The model finds patterns in **unlabeled** data — no correct answers provided upfront.

**When to use:** When you want to discover hidden patterns in data.

**Subtypes:**
- **Clustering:** Group similar items (customer segments)
- **Dimensionality Reduction:** Compress features (PCA, t-SNE)
- **Anomaly Detection:** Find outliers (fraud detection)

### 3. Reinforcement Learning

**Definition:** An agent learns by trial and error to maximize a reward signal.

**Applications:** AlphaGo, robotics, game AI, data center optimization.

### How to Choose

\`\`\`
Do you have labeled data?
├── Yes → Supervised
│   └── Numeric or category output?
│       ├── Numeric → Regression
│       └── Category → Classification
└── No → Unsupervised
    └── Group or compress?
        ├── Group → Clustering
        └── Compress → Dimensionality Reduction
\`\`\`
`,
      codeExample: `import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification, make_blobs, make_regression
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error

print("=" * 55)
print("مقارنة: Supervised vs Unsupervised Learning")
print("=" * 55)

# ─────────────────────────────────────────
# 1. Supervised — Regression
# ─────────────────────────────────────────
print("\\n1. SUPERVISED — Regression (التنبؤ بالأسعار)")
X_reg, y_reg = make_regression(n_samples=200, n_features=1,
                                noise=30, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X_reg, y_reg, test_size=0.2, random_state=42
)
reg_model = LinearRegression()
reg_model.fit(X_train, y_train)
y_pred = reg_model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"   RMSE = {rmse:.2f}  (كلما أصغر، أفضل)")

# ─────────────────────────────────────────
# 2. Supervised — Classification
# ─────────────────────────────────────────
print("\\n2. SUPERVISED — Classification (تصنيف)")
X_clf, y_clf = make_classification(n_samples=300, n_features=2,
                                   n_redundant=0, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X_clf, y_clf, test_size=0.2, random_state=42
)
clf_model = LogisticRegression()
clf_model.fit(X_train, y_train)
accuracy = accuracy_score(y_test, clf_model.predict(X_test))
print(f"   Accuracy = {accuracy:.1%}")

# ─────────────────────────────────────────
# 3. Unsupervised — Clustering
# ─────────────────────────────────────────
print("\\n3. UNSUPERVISED — Clustering (تجميع بدون تسميات)")
# بيانات بدون labels — النموذج يكتشف المجموعات بنفسه
X_cluster, _ = make_blobs(n_samples=300, centers=4,
                           cluster_std=0.8, random_state=42)
kmeans = KMeans(n_clusters=4, random_state=42, n_init="auto")
kmeans.fit(X_cluster)
labels = kmeans.labels_

# عدد العناصر في كل مجموعة
unique, counts = np.unique(labels, return_counts=True)
print("   المجموعات المكتشفة:")
for g, c in zip(unique, counts):
    print(f"     مجموعة {g}: {c} عنصر")

print("\\n" + "=" * 55)
print("ملخص:")
print("  Regression  → يتنبأ بأرقام مستمرة (مع labels)")
print("  Classification → يصنّف لفئات (مع labels)")
print("  Clustering  → يجمّع بدون labels")
print("=" * 55)`,
      codeLanguage: "python",
    },

    // Lesson 3 — Linear Regression من الصفر
    {
      bodyAr: `## Linear Regression من الصفر

Linear Regression هي أبسط وأهم خوارزمية في تعلم الآلة. فهمها بعمق يفتح لك الباب لفهم كل خوارزميات ML الأخرى.

### الفكرة الأساسية

Linear Regression تجد أفضل خط مستقيم يصف العلاقة بين المتغيرات.

**المعادلة الأساسية:**
\`\`\`
y = mx + b
\`\`\`

أو بلغة ML:
\`\`\`
y_hat = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
\`\`\`

- **y_hat**: القيمة المتنبأ بها
- **w** (weights): الأوزان (ما يتعلمه النموذج)
- **x**: الميزات (المدخلات)
- **b** (bias): ثابت الانحياز

### كيف يتعلم النموذج؟

الهدف: إيجاد قيم w و b التي **تُقلل الخطأ** بين التنبؤات والقيم الحقيقية.

**دالة الخطأ (Loss Function) — MSE:**

\`\`\`
MSE = (1/n) × Σ(y_actual - y_predicted)²
\`\`\`

**Gradient Descent — خوارزمية التعلم:**

الفكرة: تخيّل أنك تقف على تل وتريد النزول للقاع بأسرع وقت. Gradient Descent تخبرك في أي اتجاه تخطو.

\`\`\`
w = w - α × (∂MSE/∂w)
\`\`\`

- **α (learning rate)**: حجم الخطوة (صغير جداً = بطيء، كبير جداً = يقفز فوق القاع)

### Linear Regression مع Scikit-Learn

\`\`\`python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(model.coef_)      # الأوزان w
print(model.intercept_) # الثابت b
\`\`\`

### مقاييس التقييم

**MAE (Mean Absolute Error):** متوسط الخطأ المطلق
\`\`\`
MAE = (1/n) × Σ|y_actual - y_predicted|
\`\`\`

**MSE (Mean Squared Error):** متوسط مربع الخطأ — يُعاقب الأخطاء الكبيرة أشد.

**RMSE:** الجذر التربيعي لـ MSE — بنفس وحدة المتغير الأصلي.

**R² Score (معامل التحديد):** نسبة التباين التي يفسرها النموذج.
- R² = 1.0 → النموذج مثالي
- R² = 0.0 → لا يفسر شيئاً
- R² &lt; 0 → أسوأ من تخمين المتوسط

### متى لا تعمل Linear Regression؟

| المشكلة | الحل |
|---------|------|
| العلاقة غير خطية | Polynomial Regression أو Decision Trees |
| Outliers شديدة | تنظيف البيانات أو Ridge/Lasso |
| ميزات مترابطة | PCA أو Ridge Regression |

### أنواع Linear Regression

**Simple Linear Regression:** ميزة واحدة (x واحد)

**Multiple Linear Regression:** ميزات متعددة (x₁, x₂, ..., xₙ) — الأكثر استخداماً في الواقع

**Polynomial Regression:** يُضاف x², x³ للتعامل مع العلاقات المنحنية
`,
      bodyEn: `## Linear Regression from Scratch

Linear Regression is the simplest and most important algorithm in ML. Understanding it deeply opens the door to understanding all other ML algorithms.

### Core Idea

Linear Regression finds the best straight line describing the relationship between variables:

\`\`\`
y_hat = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
\`\`\`

**How it learns:** Gradient Descent minimizes the Mean Squared Error (MSE) by iteratively adjusting weights w and bias b.

### Evaluation Metrics

- **MAE:** Mean Absolute Error — average prediction error
- **RMSE:** Root Mean Squared Error — same units as target variable
- **R² Score:** 1.0 = perfect, 0.0 = no better than mean prediction

### When Linear Regression Fails

| Problem | Solution |
|---------|---------|
| Non-linear relationship | Polynomial Regression or Decision Trees |
| Severe outliers | Data cleaning or Ridge/Lasso |
| Correlated features | PCA or Ridge Regression |
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler

print("=" * 55)
print("Linear Regression: التنبؤ بأسعار المنازل")
print("=" * 55)

# ─────────────────────────────────────────
# بيانات مصطنعة تحاكي سوق العقارات
# ─────────────────────────────────────────
np.random.seed(42)
n = 500

# ميزات
area      = np.random.normal(150, 50, n)   # المساحة (م²)
rooms     = np.random.randint(2, 7, n)     # عدد الغرف
age       = np.random.randint(1, 40, n)    # عمر البيت
proximity = np.random.uniform(0, 20, n)   # المسافة عن المركز (كم)

# السعر = دالة خطية + ضجيج
price = (area * 2000 + rooms * 15000 - age * 500
         - proximity * 3000 + np.random.normal(0, 20000, n))

df = pd.DataFrame({
    "area": area, "rooms": rooms,
    "age": age, "proximity_km": proximity,
    "price": price
})

print(f"\\nعدد المنازل في البيانات: {len(df)}")
print(f"متوسط السعر: {df['price'].mean():,.0f} ريال")
print(df.head())

# ─────────────────────────────────────────
# تحضير البيانات
# ─────────────────────────────────────────
features = ["area", "rooms", "age", "proximity_km"]
X = df[features]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scaling — مهم لـ Gradient Descent
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ─────────────────────────────────────────
# بناء وتدريب النموذج
# ─────────────────────────────────────────
model = LinearRegression()
model.fit(X_train_scaled, y_train)

print("\\n" + "=" * 55)
print("معاملات النموذج:")
for feat, coef in zip(features, model.coef_):
    print(f"  {feat:15s}: {coef:+10,.0f} ريال لكل وحدة (بعد scaling)")
print(f"  {'bias':15s}: {model.intercept_:+10,.0f}")

# ─────────────────────────────────────────
# تقييم النموذج
# ─────────────────────────────────────────
y_pred = model.predict(X_test_scaled)

mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)

print("\\n" + "=" * 55)
print("نتائج التقييم على بيانات الاختبار:")
print(f"  MAE  = {mae:>12,.0f} ريال (متوسط خطأ مطلق)")
print(f"  RMSE = {rmse:>12,.0f} ريال")
print(f"  R²   = {r2:>12.3f}   (1.0 = مثالي)")

# ─────────────────────────────────────────
# تنبؤ ببيت جديد
# ─────────────────────────────────────────
new_house = pd.DataFrame([{
    "area": 180, "rooms": 4, "age": 10, "proximity_km": 5
}])
new_house_scaled = scaler.transform(new_house)
predicted = model.predict(new_house_scaled)[0]

print("\\n" + "=" * 55)
print("تنبؤ لبيت جديد:")
print(f"  المساحة: 180م², الغرف: 4, العمر: 10 سنوات, المسافة: 5كم")
print(f"  السعر المتوقع: {predicted:,.0f} ريال")`,
      codeLanguage: "python",
    },

    // Lesson 4 — Logistic Regression والتصنيف
    {
      bodyAr: `## Logistic Regression والتصنيف

على الرغم من اسمها، Logistic Regression هي خوارزمية **تصنيف** لا انحدار. إنها أساس كل نماذج الـ Classification الحديثة.

### لماذا لا تكفي Linear Regression للتصنيف؟

تخيّل أنك تحاول التنبؤ بما إذا كان بريد إلكتروني مزعجاً:
- Linear Regression قد تُعطيك 2.5 أو -0.3 — لا معنى لها كتصنيف
- نحتاج قيمة **بين 0 و 1** تُفسَّر كاحتمال

### دالة Sigmoid — قلب Logistic Regression

\`\`\`
σ(z) = 1 / (1 + e^(-z))
\`\`\`

هذه الدالة تحوّل أي رقم إلى قيمة بين 0 و 1:
- z = 0 → σ = 0.5
- z >> 0 → σ → 1
- z &lt;&lt; 0 → σ → 0

**القرار:**
\`\`\`
إذا σ(z) ≥ 0.5 → الفئة 1 (مزعج)
إذا σ(z) < 0.5 → الفئة 0 (حقيقي)
\`\`\`

### Multi-Class Classification

عندما يكون لديك أكثر من فئتين، هناك طريقتان:

**One-vs-Rest (OvR):**
- تبني نموذجاً لكل فئة ضد الباقي
- سهل التطبيق

**Softmax (Multi-class):**
- يُعطي احتمالاً لكل فئة
- المجموع يساوي 1
- يُستخدم في الشبكات العصبية

### مقاييس تقييم التصنيف

**Confusion Matrix:**
\`\`\`
               التنبؤ
               0       1
الفعلي  0   TN(✓)   FP(✗)
        1   FN(✗)   TP(✓)
\`\`\`

**Accuracy:** (TP + TN) / الكل — لا تعمل مع البيانات غير المتوازنة

**Precision:** TP / (TP + FP) — من التنبؤات بـ 1، كم كانت صحيحة؟

**Recall:** TP / (TP + FN) — من الفعليين 1، كم اكتشفنا؟

**F1 Score:** 2 × (Precision × Recall) / (Precision + Recall) — التوازن بينهما

### متى تستخدم Precision ومتى Recall؟

| التطبيق | الأهم | السبب |
|---------|-------|-------|
| كشف السرطان | Recall عالي | لا نريد تفويت حالة مريضة |
| فلترة Spam | Precision عالي | لا نريد حذف بريد مهم |
| كشف الاحتيال | كلاهما | الخسارتان مكلفتان |
`,
      bodyEn: `## Logistic Regression and Classification

Despite its name, Logistic Regression is a **classification** algorithm. It's the foundation of all modern classification models.

### The Sigmoid Function

Logistic Regression applies the sigmoid function to convert any number into a probability between 0 and 1:

\`\`\`
σ(z) = 1 / (1 + e^(-z))
\`\`\`

If σ(z) ≥ 0.5 → Class 1; otherwise → Class 0.

### Evaluation Metrics

- **Accuracy:** Overall correctness — misleading with imbalanced data
- **Precision:** Of predicted positives, how many were correct?
- **Recall:** Of actual positives, how many did we catch?
- **F1 Score:** Harmonic mean of Precision and Recall

### When to Prioritize

| Application | Priority | Reason |
|-------------|---------|--------|
| Cancer detection | High Recall | Don't miss sick patients |
| Spam filtering | High Precision | Don't delete important emails |
| Fraud detection | Both | Both errors are costly |
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (accuracy_score, precision_score,
                              recall_score, f1_score,
                              confusion_matrix, classification_report)

print("=" * 55)
print("Logistic Regression: كشف البريد المزعج")
print("=" * 55)

# ─────────────────────────────────────────
# بيانات مصطنعة للبريد الإلكتروني
# ─────────────────────────────────────────
np.random.seed(42)
n = 1000

# ميزات تميّز البريد المزعج
has_free_word  = np.random.binomial(1, 0.6, n)   # كلمة "مجاني"
num_links      = np.random.poisson(3, n)          # عدد الروابط
caps_ratio     = np.random.beta(2, 5, n)          # نسبة الأحرف الكبيرة
sender_known   = np.random.binomial(1, 0.7, n)   # المرسل معروف؟
email_length   = np.random.normal(300, 150, n)   # طول الرسالة

# spam = دالة للميزات
spam_score = (1.5 * has_free_word + 0.3 * num_links
              + 2.0 * caps_ratio - 2.5 * sender_known
              + np.random.normal(0, 0.5, n))
is_spam = (spam_score > 0.2).astype(int)

print(f"نسبة البريد المزعج: {is_spam.mean():.1%}")

df = pd.DataFrame({
    "has_free_word": has_free_word,
    "num_links": num_links,
    "caps_ratio": caps_ratio,
    "sender_known": sender_known,
    "email_length": email_length,
    "is_spam": is_spam
})

# ─────────────────────────────────────────
# تحضير وتدريب
# ─────────────────────────────────────────
features = ["has_free_word", "num_links", "caps_ratio",
            "sender_known", "email_length"]
X = df[features]
y = df["is_spam"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

model = LogisticRegression(random_state=42)
model.fit(X_train_s, y_train)

# ─────────────────────────────────────────
# التقييم الكامل
# ─────────────────────────────────────────
y_pred = model.predict(X_test_s)
y_prob = model.predict_proba(X_test_s)[:, 1]  # احتمال كونه spam

print("\\n" + "=" * 55)
print("نتائج التقييم:")
print(f"  Accuracy  = {accuracy_score(y_test, y_pred):.3f}")
print(f"  Precision = {precision_score(y_test, y_pred):.3f}")
print(f"  Recall    = {recall_score(y_test, y_pred):.3f}")
print(f"  F1 Score  = {f1_score(y_test, y_pred):.3f}")

print("\\nConfusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(f"  TN={cm[0,0]}  FP={cm[0,1]}")
print(f"  FN={cm[1,0]}  TP={cm[1,1]}")

print("\\nتقرير مفصل:")
print(classification_report(y_test, y_pred,
      target_names=["حقيقي", "مزعج"]))

# ─────────────────────────────────────────
# أهمية الميزات
# ─────────────────────────────────────────
coef_df = pd.DataFrame({
    "feature": features,
    "coefficient": model.coef_[0]
}).sort_values("coefficient", ascending=False)

print("أهمية الميزات:")
for _, row in coef_df.iterrows():
    bar = "█" * int(abs(row["coefficient"]) * 5)
    sign = "+" if row["coefficient"] > 0 else "-"
    print(f"  {row['feature']:15s}: {sign}{abs(row['coefficient']):.2f} {bar}")`,
      codeLanguage: "python",
    },

    // Lesson 5 — Decision Trees
    {
      bodyAr: `## Decision Trees

Decision Trees هي خوارزمية تعلم آلة تقلّد طريقة التفكير البشري — تطرح سلسلة من الأسئلة الثنائية للوصول إلى قرار نهائي.

### الفكرة البصرية

\`\`\`
هل المساحة > 150م²؟
├── نعم → هل الغرف > 3؟
│   ├── نعم → سعر عالٍ ✅
│   └── لا  → سعر متوسط
└── لا  → هل قرب المركز؟
    ├── نعم → سعر متوسط
    └── لا  → سعر منخفض ✅
\`\`\`

### مكونات الشجرة

| المصطلح | المعنى |
|---------|--------|
| **Root Node** | السؤال الأول (الأهم) |
| **Internal Node** | أسئلة وسطى |
| **Branch** | النتيجة (نعم/لا) |
| **Leaf Node** | القرار النهائي |
| **Depth** | عمق الشجرة (عدد الأسئلة) |

### كيف يختار النموذج أفضل سؤال؟

الهدف: كل سؤال يجب أن يُقلل **الاضطراب (Impurity)** بأكبر قدر ممكن.

**Gini Impurity:**
\`\`\`
Gini = 1 - Σ(pᵢ²)
\`\`\`
- Gini = 0 → عقدة نقية (كل العناصر من فئة واحدة) ✅
- Gini = 0.5 → أقصى اضطراب (50/50)

**Information Gain (Entropy):**
\`\`\`
Entropy = -Σ(pᵢ × log₂(pᵢ))
IG = Entropy(parent) - Σ(weighted Entropy(children))
\`\`\`

النموذج يختار السؤال الذي يُعطي أعلى Information Gain.

### Overfitting في Decision Trees

المشكلة: إذا تركنا الشجرة تنمو بحرية، ستحفظ كل مثال في بيانات التدريب.

\`\`\`
بيانات التدريب: Accuracy = 100% 🎉
بيانات الاختبار: Accuracy = 65%  😱
\`\`\`

**الحل — Pruning (التقليم):**

\`\`\`python
model = DecisionTreeClassifier(
    max_depth=5,           # أقصى عمق
    min_samples_leaf=10,   # أقل عدد عناصر في الورقة
    min_samples_split=20,  # أقل عدد للتقسيم
)
\`\`\`

### مزايا وعيوب Decision Trees

**المزايا:**
- سهلة التفسير والفهم البشري
- لا تحتاج Scaling للبيانات
- تتعامل مع Categorical وNumerical معاً
- سريعة التدريب والتنبؤ

**العيوب:**
- تميل للـ Overfitting (تُعالج بـ Random Forest)
- حساسة للتغيرات الصغيرة في البيانات
- لا تُجيد Extrapolation

### متى تستخدم Decision Trees؟

- عندما تحتاج نموذجاً **قابلاً للتفسير** (قرارات قانونية، طبية)
- عندما لديك بيانات متنوعة (أرقام + فئات)
- كأساس لـ Random Forest وGradient Boosting
`,
      bodyEn: `## Decision Trees

Decision Trees mimic human thinking — they ask a series of binary questions to reach a final decision.

### How the Model Chooses the Best Question

The goal: each question should maximize **Information Gain** — reduce impurity as much as possible.

- **Gini = 0** → pure node (all same class) ✅
- **Gini = 0.5** → maximum disorder (50/50)

### Overfitting

An unconstrained tree memorizes training data (100% training accuracy, 65% test accuracy). **Solution:** Pruning via \`max_depth\`, \`min_samples_leaf\`, \`min_samples_split\`.

### Pros and Cons

**Pros:** Interpretable, no scaling needed, handles mixed data types.

**Cons:** Prone to overfitting, sensitive to small data changes. Solution: Random Forest.
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
from sklearn.datasets import load_breast_cancer

print("=" * 55)
print("Decision Trees: كشف سرطان الثدي")
print("=" * 55)

# بيانات طبية حقيقية (مدمجة في sklearn)
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

print(f"عدد العينات: {len(y)}")
print(f"الفئات: {dict(zip(data.target_names, np.bincount(y)))}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ─────────────────────────────────────────
# 1. شجرة بدون قيود — Overfitting
# ─────────────────────────────────────────
tree_full = DecisionTreeClassifier(random_state=42)
tree_full.fit(X_train, y_train)

train_acc = accuracy_score(y_train, tree_full.predict(X_train))
test_acc  = accuracy_score(y_test,  tree_full.predict(X_test))

print("\\n1. شجرة كاملة (بدون قيود):")
print(f"   Training Accuracy = {train_acc:.3f}")
print(f"   Test Accuracy     = {test_acc:.3f}")
print(f"   عمق الشجرة        = {tree_full.get_depth()}")
print(f"   Overfitting gap   = {train_acc - test_acc:.3f}")

# ─────────────────────────────────────────
# 2. شجرة مقلّمة — Pruning
# ─────────────────────────────────────────
tree_pruned = DecisionTreeClassifier(
    max_depth=5,
    min_samples_leaf=10,
    min_samples_split=20,
    random_state=42
)
tree_pruned.fit(X_train, y_train)

train_acc_p = accuracy_score(y_train, tree_pruned.predict(X_train))
test_acc_p  = accuracy_score(y_test,  tree_pruned.predict(X_test))

print("\\n2. شجرة مقلّمة (max_depth=5):")
print(f"   Training Accuracy = {train_acc_p:.3f}")
print(f"   Test Accuracy     = {test_acc_p:.3f}")
print(f"   عمق الشجرة        = {tree_pruned.get_depth()}")
print(f"   Overfitting gap   = {train_acc_p - test_acc_p:.3f}  ✅ أفضل!")

# ─────────────────────────────────────────
# 3. Cross-Validation
# ─────────────────────────────────────────
cv_scores = cross_val_score(tree_pruned, X, y, cv=5, scoring="accuracy")
print(f"\\n3. Cross-Validation (5 folds):")
print(f"   Scores: {cv_scores.round(3)}")
print(f"   Mean:   {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ─────────────────────────────────────────
# 4. أهمية الميزات
# ─────────────────────────────────────────
importances = pd.Series(
    tree_pruned.feature_importances_,
    index=data.feature_names
).sort_values(ascending=False)

print("\\n4. أهم الميزات الطبية:")
for feat, imp in importances.head(5).items():
    bar = "█" * int(imp * 50)
    print(f"   {feat[:30]:30s}: {imp:.3f} {bar}")

# ─────────────────────────────────────────
# 5. قراءة الشجرة
# ─────────────────────────────────────────
print("\\n5. هيكل الشجرة (أول 3 مستويات):")
tree_text = export_text(tree_pruned,
                        feature_names=list(data.feature_names),
                        max_depth=3)
print(tree_text[:800])`,
      codeLanguage: "python",
    },

    // Lesson 6 — Random Forest
    {
      bodyAr: `## Random Forest

Random Forest هي واحدة من أقوى وأكثر خوارزميات ML موثوقيةً في الواقع العملي. الفكرة بسيطة وعبقرية: بدلاً من شجرة واحدة قد تُخطئ، نبني مئات الأشجار ونأخذ التصويت الأغلبي.

### حكمة الجموع (Wisdom of Crowds)

التجربة الكلاسيكية: اطلب من 1000 شخص تخمين وزن ثور — متوسط إجاباتهم أدق من أي خبير منفرد.

Random Forest يطبّق نفس المبدأ:
\`\`\`
شجرة 1: تنبؤ = A
شجرة 2: تنبؤ = B
شجرة 3: تنبؤ = A
...
شجرة 100: تنبؤ = A
───────────────────
النتيجة النهائية = A (الأغلبية)
\`\`\`

### كيف يعمل Random Forest؟

**الخطوة 1 — Bootstrapping:**
لكل شجرة، نأخذ عيّنة عشوائية **بإعادة الوضع** من بيانات التدريب (~63% من البيانات الأصلية، مع تكرار بعض العناصر).

**الخطوة 2 — عشوائية الميزات:**
في كل تقسيم، لا نجرّب كل الميزات — بل نختار عشوائياً **m = √p ميزة** (حيث p = عدد الميزات الكلي).

**الخطوة 3 — بناء الأشجار بالتوازي:**
كل شجرة تتدرب بشكل مستقل على بياناتها وميزاتها الخاصة.

**الخطوة 4 — التجميع:**
- Classification: التصويت الأغلبي
- Regression: متوسط التنبؤات

### Random Forest vs Decision Tree

| الجانب | Decision Tree | Random Forest |
|--------|--------------|---------------|
| **Overfitting** | مرتفع | منخفض |
| **الدقة** | متوسطة | عالية |
| **التفسير** | سهل | أصعب |
| **السرعة** | سريع | أبطأ (لكن موازٍ) |
| **الاستخدام الفعلي** | للتفسير | للدقة |

### Hyperparameters المهمة

\`\`\`python
RandomForestClassifier(
    n_estimators=100,       # عدد الأشجار (أكثر = أفضل، لكن أبطأ)
    max_depth=None,         # لا حد بالافتراضي (مع RF هذا مقبول)
    max_features="sqrt",    # √p ميزة في كل تقسيم
    min_samples_leaf=1,     # أقل عدد في الورقة
    bootstrap=True,         # استخدام Bootstrapping
    n_jobs=-1,              # استخدام كل الـ CPU cores
    random_state=42
)
\`\`\`

### Out-of-Bag (OOB) Score

ميزة رائعة في Random Forest: كل شجرة تُدرَّب على ~63% من البيانات. الـ 37% المتبقية (OOB samples) تُستخدم كـ validation set تلقائي:

\`\`\`python
model = RandomForestClassifier(oob_score=True, ...)
print(model.oob_score_)  # تقدير الدقة بدون test set منفصل
\`\`\`

### متى تختار Random Forest؟

✅ بيانات جدولية (tabular) — يتفوق على معظم الخوارزميات
✅ لا تريد الكثير من preprocessing
✅ تريد أهمية الميزات (feature importance)
✅ لديك وقت تدريب كافٍ
✅ البيانات تحتوي قيماً مفقودة كثيرة

❌ صور أو نصوص (Deep Learning أفضل)
❌ تحتاج نموذجاً قابلاً للتفسير الكامل
`,
      bodyEn: `## Random Forest

Random Forest is one of the most powerful and reliable ML algorithms in practice. Instead of one tree that might be wrong, we build hundreds of trees and take the majority vote.

### How It Works

1. **Bootstrapping:** Each tree trains on a random sample (with replacement) ~63% of training data
2. **Random features:** At each split, test only √p random features (not all)
3. **Parallel training:** Trees train independently
4. **Aggregation:** Classification = majority vote; Regression = average

### Key Advantage: OOB Score

The ~37% of data not used by each tree acts as a free validation set — no need for a separate validation split.

### When to Use

✅ Tabular data — outperforms most algorithms
✅ Minimal preprocessing needed
✅ Built-in feature importance
✅ Missing values tolerance

❌ Images/text (use Deep Learning)
❌ Need full interpretability
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
from sklearn.datasets import make_classification

print("=" * 55)
print("Random Forest: المقارنة مع Decision Tree")
print("=" * 55)

# بيانات معقدة
X, y = make_classification(
    n_samples=2000, n_features=20, n_informative=10,
    n_redundant=5, random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ─────────────────────────────────────────
# 1. Decision Tree للمقارنة
# ─────────────────────────────────────────
dt = DecisionTreeClassifier(random_state=42)
dt.fit(X_train, y_train)

dt_train = accuracy_score(y_train, dt.predict(X_train))
dt_test  = accuracy_score(y_test,  dt.predict(X_test))

print(f"\\nDecision Tree:")
print(f"  Train Accuracy: {dt_train:.3f}")
print(f"  Test  Accuracy: {dt_test:.3f}")
print(f"  Overfit gap:    {dt_train - dt_test:.3f}")

# ─────────────────────────────────────────
# 2. Random Forest
# ─────────────────────────────────────────
rf = RandomForestClassifier(
    n_estimators=200,
    max_features="sqrt",
    oob_score=True,
    n_jobs=-1,
    random_state=42
)
rf.fit(X_train, y_train)

rf_train = accuracy_score(y_train, rf.predict(X_train))
rf_test  = accuracy_score(y_test,  rf.predict(X_test))

print(f"\\nRandom Forest (200 trees):")
print(f"  Train Accuracy: {rf_train:.3f}")
print(f"  Test  Accuracy: {rf_test:.3f}")
print(f"  OOB Score:      {rf.oob_score_:.3f}  ← مجاني!")
print(f"  Overfit gap:    {rf_train - rf_test:.3f}")

# ─────────────────────────────────────────
# 3. تأثير عدد الأشجار
# ─────────────────────────────────────────
print("\\n3. تأثير عدد الأشجار على الدقة:")
for n in [1, 5, 10, 50, 100, 200, 500]:
    rf_n = RandomForestClassifier(n_estimators=n, n_jobs=-1, random_state=42)
    rf_n.fit(X_train, y_train)
    acc = accuracy_score(y_test, rf_n.predict(X_test))
    bar = "█" * int(acc * 30)
    print(f"  n={n:4d}: {acc:.3f} {bar}")

# ─────────────────────────────────────────
# 4. أهمية الميزات
# ─────────────────────────────────────────
importance_df = pd.DataFrame({
    "feature": [f"feature_{i}" for i in range(20)],
    "importance": rf.feature_importances_
}).sort_values("importance", ascending=False)

print("\\n4. أهم 10 ميزات:")
for _, row in importance_df.head(10).iterrows():
    bar = "█" * int(row["importance"] * 200)
    print(f"  {row['feature']:12s}: {row['importance']:.4f} {bar}")`,
      codeLanguage: "python",
    },

    // Lesson 7 — تقييم النماذج
    {
      bodyAr: `## تقييم النماذج

بناء النموذج هو نصف العمل — النصف الآخر هو معرفة **هل هو جيد حقاً**؟ في هذا الدرس ستتعلم كيف تقيّم نماذجك بطريقة علمية وصحيحة.

### المشكلة: لماذا لا يكفي الاختبار على بيانات التدريب؟

تخيّل طالباً يحفظ أسئلة الامتحان السابقة — سيحصل على 100% في نفس الأسئلة، لكنه سيفشل في أسئلة جديدة.

**Overfitting vs Underfitting:**

\`\`\`
Underfitting  ←─────────────────→  Overfitting
النموذج بسيط جداً         النموذج معقد جداً
يفشل في كل شيء           يحفظ بيانات التدريب
Bias عالٍ                 Variance عالٍ
\`\`\`

**الهدف:** إيجاد النموذج في المنتصف (Bias-Variance Tradeoff).

### Cross-Validation — التقييم الصحيح

بدلاً من تقسيم واحد (train/test)، نُقسّم البيانات k مرة:

**K-Fold Cross-Validation (k=5):**
\`\`\`
Fold 1: [Test] [Train] [Train] [Train] [Train]
Fold 2: [Train] [Test] [Train] [Train] [Train]
Fold 3: [Train] [Train] [Test] [Train] [Train]
Fold 4: [Train] [Train] [Train] [Test] [Train]
Fold 5: [Train] [Train] [Train] [Train] [Test]
───────────────────────────────────────────
النتيجة: متوسط الـ 5 scores + الانحراف المعياري
\`\`\`

**لماذا k=5 أو k=10؟**
- k صغير (2-3) → تقدير غير دقيق
- k كبير (LOOCV) → بطيء جداً
- k=5 أو k=10 → التوازن المثالي

### Hyperparameter Tuning

**Grid Search:** جرّب كل مجموعة ممكنة من المعاملات.

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [None, 5, 10],
    "min_samples_leaf": [1, 5, 10],
}
grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid_search.fit(X_train, y_train)
print(grid_search.best_params_)
\`\`\`

**Random Search:** أسرع من Grid Search للمساحات الكبيرة.

### Learning Curves — تشخيص المشكلة

Learning Curves تريك ما إذا كان النموذج يعاني من Overfitting أو Underfitting:

\`\`\`
Underfitting (High Bias):
- كلا الـ curves منخفضان ومتقاربان

Overfitting (High Variance):
- Training curve مرتفع
- Validation curve منخفض والفجوة كبيرة

نموذج مثالي:
- كلا الـ curves مرتفعان ومتقاربان
\`\`\`

### مقاييس الـ Regression

| المقياس | الصيغة | التفسير |
|---------|--------|---------|
| **MAE** | mean(|y - ŷ|) | متوسط الخطأ المطلق (بنفس الوحدة) |
| **RMSE** | √mean((y-ŷ)²) | حساس للأخطاء الكبيرة |
| **R²** | 1 - SS_res/SS_tot | نسبة التباين المُفسَّر |
| **MAPE** | mean(|(y-ŷ)/y|) × 100% | النسبة المئوية للخطأ |

### مقاييس الـ Classification (مراجعة)

**AUC-ROC:**
- ROC Curve: TPR مقابل FPR عند عتبات مختلفة
- AUC: مساحة تحت المنحنى (1.0 = مثالي، 0.5 = عشوائي)
- مفيد خاصةً مع البيانات غير المتوازنة

### Practical Guidelines

1. **ابدأ بـ Cross-Validation** — لا تثق بـ single train/test split
2. **اختر المقياس المناسب** — ليس Accuracy دائماً
3. **راقب Learning Curves** — تشخيص Overfitting مبكراً
4. **آخر خطوة: Test Set** — الـ Test Set للقياس النهائي فقط، لا للضبط
`,
      bodyEn: `## Model Evaluation

Building the model is half the work — the other half is knowing **whether it's actually good**. Here you'll learn how to evaluate models scientifically.

### Cross-Validation

Instead of a single train/test split, K-Fold divides data k times and averages results — providing a more reliable performance estimate with confidence intervals.

### Bias-Variance Tradeoff

\`\`\`
Underfitting (High Bias)  ←────→  Overfitting (High Variance)
Both curves low & close         Train high, Val low — large gap
\`\`\`

### Key Metrics

**Regression:** MAE (same units), RMSE (penalizes large errors), R² (variance explained), MAPE (% error).

**Classification:** Accuracy (misleading when imbalanced), Precision/Recall/F1, AUC-ROC (works well with imbalanced classes).

### Practical Guidelines

1. Always use Cross-Validation, not single split
2. Choose the right metric for your problem
3. Use Learning Curves to diagnose issues early
4. Test set is for final measurement only — never for tuning
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import (
    cross_val_score, StratifiedKFold, learning_curve, GridSearchCV
)
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.datasets import make_classification
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

print("=" * 55)
print("تقييم النماذج: الدليل الكامل")
print("=" * 55)

X, y = make_classification(
    n_samples=1500, n_features=15, n_informative=8,
    n_classes=2, random_state=42
)

# ─────────────────────────────────────────
# 1. K-Fold Cross-Validation
# ─────────────────────────────────────────
print("\\n1. Stratified K-Fold Cross-Validation (k=10):")
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)

for metric in ["accuracy", "precision", "recall", "f1", "roc_auc"]:
    scores = cross_val_score(model, X, y, cv=cv, scoring=metric, n_jobs=-1)
    print(f"  {metric:12s}: {scores.mean():.3f} ± {scores.std():.3f}  "
          f"[{scores.min():.3f} - {scores.max():.3f}]")

# ─────────────────────────────────────────
# 2. Learning Curves
# ─────────────────────────────────────────
print("\\n2. Learning Curves:")
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y,
    train_sizes=np.linspace(0.1, 1.0, 10),
    cv=5, scoring="accuracy", n_jobs=-1
)

print("  حجم التدريب | Train Acc | Val Acc | فجوة Overfit")
print("  " + "-" * 52)
for i, size in enumerate(train_sizes):
    t_mean = train_scores[i].mean()
    v_mean = val_scores[i].mean()
    gap    = t_mean - v_mean
    print(f"  {int(size):11d} | {t_mean:.3f}     | {v_mean:.3f}   | {gap:.3f}")

# ─────────────────────────────────────────
# 3. Hyperparameter Tuning (Grid Search)
# ─────────────────────────────────────────
print("\\n3. Grid Search لإيجاد أفضل المعاملات:")
param_grid = {
    "n_estimators": [50, 100],
    "max_depth": [None, 5, 10],
    "min_samples_leaf": [1, 5],
}
gs = GridSearchCV(
    RandomForestClassifier(random_state=42, n_jobs=-1),
    param_grid, cv=5, scoring="roc_auc", n_jobs=-1, verbose=0
)
gs.fit(X, y)

print(f"  أفضل معاملات: {gs.best_params_}")
print(f"  أفضل AUC-ROC: {gs.best_score_:.4f}")

# ─────────────────────────────────────────
# 4. AUC-ROC Analysis
# ─────────────────────────────────────────
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

best_model = gs.best_estimator_
best_model.fit(X_train, y_train)
y_proba = best_model.predict_proba(X_test)[:, 1]

auc = roc_auc_score(y_test, y_proba)
print(f"\\n4. AUC-ROC على Test Set: {auc:.4f}")
print("  (1.0 = مثالي | 0.5 = عشوائي | > 0.9 = ممتاز)")`,
      codeLanguage: "python",
    },

    // Lesson 8 — مشروع: التنبؤ بأسعار المنازل
    {
      bodyAr: `## مشروع: التنبؤ بأسعار المنازل

هذا المشروع يجمع كل ما تعلمته في دورة تعلم الآلة في مشروع واحد متكامل: من استكشاف البيانات وحتى نشر النموذج.

### الهدف

بناء نموذج يتنبأ بأسعار المنازل بناءً على خصائصها، مع تطبيق منهجية Data Science الكاملة.

### منهجية المشروع

\`\`\`
1. استكشاف البيانات (EDA)
   ↓
2. تنظيف البيانات وتحضيرها
   ↓
3. Feature Engineering
   ↓
4. تدريب وتقييم عدة نماذج
   ↓
5. Hyperparameter Tuning
   ↓
6. تحليل الأخطاء
   ↓
7. حفظ النموذج النهائي
\`\`\`

### ما تعلمته في دورة تعلم الآلة

| الدرس | ما تعلمته |
|-------|---------|
| 1. ما هو ML | البيانات → النموذج، Supervised/Unsupervised |
| 2. أنواع التعلم | Regression، Classification، Clustering |
| 3. Linear Regression | MSE، Gradient Descent، R² |
| 4. Logistic Regression | Sigmoid، Precision/Recall، F1 |
| 5. Decision Trees | Gini، Pruning، Overfitting |
| 6. Random Forest | Bagging، OOB Score، Feature Importance |
| 7. تقييم النماذج | Cross-Validation، Learning Curves، Grid Search |
| 8. **المشروع** | Pipeline كامل من EDA لحفظ النموذج |

### الخطوات التالية في رحلتك

بعد هذه الدورة، أنت جاهز لـ:

**المستوى التالي:**
- Deep Learning (الشبكات العصبية) → يعالج الصور والنصوص
- Natural Language Processing (NLP) → تحليل النصوص
- Computer Vision → تحليل الصور

**تطبيق عملي:**
- نشر نموذجك كـ API (FastAPI + Uvicorn)
- إنشاء لوحة بيانات تفاعلية (Streamlit)
- ربطه بـ Claude API لشرح التنبؤات

**مسارات التخصص:**
- ML Engineer: بناء ونشر النماذج في Prod
- Data Scientist: تحليل البيانات واستخراج Insights
- MLOps Engineer: أتمتة دورة حياة النماذج
`,
      bodyEn: `## Project: House Price Prediction

This project combines everything you've learned in the ML course into one end-to-end project: from exploratory data analysis to saving a production-ready model.

### Project Methodology

\`\`\`
1. Exploratory Data Analysis (EDA)
   ↓
2. Data Cleaning & Preparation
   ↓
3. Feature Engineering
   ↓
4. Train & Evaluate Multiple Models
   ↓
5. Hyperparameter Tuning
   ↓
6. Error Analysis
   ↓
7. Save Final Model
\`\`\`

### What You Learned in This ML Course

All 8 lessons combined in one final project — from understanding what ML is to building a complete prediction pipeline.

### Next Steps

After this course you're ready for:
- **Deep Learning** — images and text
- **NLP** — text analysis
- **MLOps** — automating the model lifecycle
- **Deploy your model** as an API with FastAPI or as a dashboard with Streamlit
`,
      codeExample: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import joblib
import warnings
warnings.filterwarnings("ignore")

print("=" * 60)
print("🏠 مشروع: التنبؤ بأسعار المنازل — Pipeline كامل")
print("=" * 60)

# ─────────────────────────────────────────
# 1. توليد بيانات واقعية
# ─────────────────────────────────────────
np.random.seed(42)
n = 2000

districts = ["الرياض - العليا", "الرياض - النرجس", "الرياض - حطين",
             "الرياض - الملقا", "الرياض - الروضة"]

data = pd.DataFrame({
    "area_sqm":     np.random.normal(200, 80, n).clip(60, 600),
    "rooms":        np.random.randint(2, 8, n),
    "bathrooms":    np.random.randint(1, 5, n),
    "floors":       np.random.randint(1, 4, n),
    "age_years":    np.random.randint(0, 30, n),
    "has_pool":     np.random.binomial(1, 0.2, n),
    "has_garden":   np.random.binomial(1, 0.4, n),
    "parking":      np.random.randint(0, 4, n),
    "district":     np.random.choice(districts, n),
    "dist_center_km": np.random.exponential(8, n).clip(1, 30),
})

# قيم مفقودة (واقعية)
data.loc[np.random.choice(n, 50, replace=False), "bathrooms"] = np.nan
data.loc[np.random.choice(n, 30, replace=False), "age_years"]  = np.nan

# السعر الحقيقي
district_premium = {d: p for d, p in zip(districts, [1.3, 1.1, 1.2, 0.9, 1.0])}
data["price"] = (
    data["area_sqm"] * 3500
    + data["rooms"] * 25000
    + data["bathrooms"].fillna(2) * 15000
    - data["age_years"].fillna(10) * 2000
    + data["has_pool"] * 80000
    + data["has_garden"] * 40000
    + data["parking"] * 20000
    - data["dist_center_km"] * 5000
    + data["district"].map(district_premium) * 50000
    + np.random.normal(0, 50000, n)
).clip(200000, 5000000)

print(f"\\n1. البيانات:")
print(f"   عدد المنازل     : {len(data)}")
print(f"   الميزات          : {data.shape[1] - 1}")
print(f"   قيم مفقودة      : {data.isnull().sum().sum()}")
print(f"   نطاق الأسعار    : {data['price'].min():,.0f} - {data['price'].max():,.0f} ريال")
print(f"   متوسط السعر     : {data['price'].mean():,.0f} ريال")

# ─────────────────────────────────────────
# 2. Feature Engineering
# ─────────────────────────────────────────
print("\\n2. Feature Engineering:")
data["price_per_sqm"] = data["price"] / data["area_sqm"]  # للتحليل فقط
data["total_amenities"] = data["has_pool"] + data["has_garden"] + (data["parking"] > 0)
data["rooms_per_floor"] = data["rooms"] / data["floors"]

le = LabelEncoder()
data["district_encoded"] = le.fit_transform(data["district"])

features = ["area_sqm", "rooms", "bathrooms", "floors", "age_years",
            "has_pool", "has_garden", "parking", "dist_center_km",
            "district_encoded", "total_amenities", "rooms_per_floor"]

X = data[features]
y = data["price"]

print(f"   ميزات بعد الهندسة: {len(features)}")

# ─────────────────────────────────────────
# 3. مقارنة النماذج
# ─────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

models = {
    "Ridge Regression": Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
        ("model", Ridge(alpha=100))
    ]),
    "Random Forest": Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("model", RandomForestRegressor(n_estimators=200, n_jobs=-1, random_state=42))
    ]),
    "Gradient Boosting": Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("model", GradientBoostingRegressor(n_estimators=200, random_state=42))
    ]),
}

print("\\n3. مقارنة النماذج (CV=5):")
print(f"  {'النموذج':25s} | {'MAE':>12s} | {'R²':>8s}")
print("  " + "-" * 55)

best_model_name, best_r2 = None, -999
for name, pipe in models.items():
    r2_scores  = cross_val_score(pipe, X_train, y_train, cv=5, scoring="r2", n_jobs=-1)
    mae_scores = cross_val_score(pipe, X_train, y_train, cv=5,
                                 scoring="neg_mean_absolute_error", n_jobs=-1)
    r2  = r2_scores.mean()
    mae = -mae_scores.mean()
    print(f"  {name:25s} | {mae:>12,.0f} | {r2:>8.4f}")
    if r2 > best_r2:
        best_r2, best_model_name = r2, name

print(f"\\n  ✅ أفضل نموذج: {best_model_name}")

# ─────────────────────────────────────────
# 4. التدريب النهائي والتقييم
# ─────────────────────────────────────────
final_model = models[best_model_name]
final_model.fit(X_train, y_train)
y_pred = final_model.predict(X_test)

mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)

print("\\n4. نتائج Test Set النهائية:")
print(f"   MAE  = {mae:>10,.0f} ريال")
print(f"   RMSE = {rmse:>10,.0f} ريال")
print(f"   R²   = {r2:>10.4f}")
print(f"   الخطأ النسبي = {mae/y_test.mean()*100:.1f}%")

# ─────────────────────────────────────────
# 5. حفظ النموذج
# ─────────────────────────────────────────
joblib.dump(final_model, "house_price_model.pkl")
print("\\n5. ✅ تم حفظ النموذج في: house_price_model.pkl")

# ─────────────────────────────────────────
# 6. تنبؤ ببيت جديد
# ─────────────────────────────────────────
loaded_model = joblib.load("house_price_model.pkl")

new_house = pd.DataFrame([{
    "area_sqm": 280, "rooms": 5, "bathrooms": 3, "floors": 2,
    "age_years": 5, "has_pool": 1, "has_garden": 1, "parking": 2,
    "dist_center_km": 8, "district_encoded": 2,
    "total_amenities": 2, "rooms_per_floor": 2.5
}])

predicted_price = loaded_model.predict(new_house)[0]
print(f"\\n6. تنبؤ لبيت جديد:")
print(f"   الخصائص: 280م², 5 غرف, مسبح, حديقة, 8كم من المركز")
print(f"   السعر المتوقع: {predicted_price:,.0f} ريال")
print("\\n🎉 مبروك! أكملت دورة تعلم الآلة بنجاح")`,
      codeLanguage: "python",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // C7c — generative-ai (5 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  "generative-ai": [

    // Lesson 1 — كيف تعمل LLMs؟
    {
      bodyAr: `## كيف تعمل LLMs؟

نماذج اللغة الكبيرة (Large Language Models) هي القلب النابض لثورة AI الحالية. ChatGPT وClaude وGemini — كلها LLMs. لكن كيف تعمل فعلاً؟

### التعريف البسيط

LLM هو نموذج احتمالي يتنبأ بالكلمة التالية في سلسلة نصية، بناءً على تدريب على كميات ضخمة من النصوص.

لكن هذا التبسيط يُخفي عمقاً هائلاً. دعنا نفصّل.

### بنية Transformer — الثورة التقنية

في 2017، نشرت Google ورقة بحثية بعنوان "Attention is All You Need" — هذه الورقة غيّرت عالم AI إلى الأبد.

**المكونات الأساسية لـ Transformer:**

\`\`\`
النص المدخل
    ↓
Tokenization (تقسيم النص لـ tokens)
    ↓
Embedding (تحويل كل token لمتجه رياضي)
    ↓
Positional Encoding (إضافة معلومات الترتيب)
    ↓
[Self-Attention → Feed Forward] × N layers
    ↓
Output Layer (احتمالات الكلمة التالية)
\`\`\`

### Tokens — وحدة بناء LLMs

LLMs لا تقرأ الحروف أو الكلمات مباشرةً — تقرأ **tokens**.

Token هو مقطع نصي (قد يكون كلمة كاملة أو جزءاً من كلمة أو علامة ترقيم):

\`\`\`
"artificial intelligence" → ["art", "ific", "ial", " intel", "lig", "ence"]
\`\`\`

**قاعدة التقدير:**
- الإنجليزية: 1 كلمة ≈ 1.3 token
- العربية: 1 كلمة ≈ 2-4 tokens (بسبب التشكيل والإعراب)
- Claude 3.x: 200,000 token context ≈ 150,000 كلمة إنجليزية

### Self-Attention — السر الحقيقي

Self-Attention هي آلية تسمح لكل token بـ"الانتباه" لكل token آخر في النص وحساب أهميته.

**مثال:**
\`\`\`
"البنك يقع على ضفة النهر"
\`\`\`
كلمة "البنك" هنا — هل تعني مؤسسة مالية أم ضفة نهر؟

Self-Attention تحل هذا اللبس: "البنك" ينتبه لـ "نهر" فيعطيه وزناً عالياً، فيفهم أن المقصود "ضفة".

**الصيغة الرياضية (مُبسّطة):**
\`\`\`
Attention(Q, K, V) = softmax(QK^T / √dk) × V
\`\`\`

- Q (Query): "ما الذي أبحث عنه؟"
- K (Key): "ما الذي يمكنني تقديمه؟"
- V (Value): "ما المعلومة الفعلية؟"

### التدريب — Pre-training

LLMs تتدرّب على مرحلتين:

**1. Pre-training:**
- بيانات: تريليونات الكلمات من الإنترنت والكتب والمقالات
- المهمة: توقع الكلمة التالية (Next Token Prediction)
- الناتج: نموذج يفهم اللغة لكن ليس مفيداً بعد

**2. Fine-tuning (RLHF):**
- Supervised Fine-tuning: أمثلة على حوارات صحيحة
- RLHF (Reinforcement Learning from Human Feedback): بشر يُقيّمون الردود
- الناتج: مساعد مفيد وآمن

### حجم النموذج يهم — لكن ليس الكل

\`\`\`
GPT-2 (2019):   1.5B parameter
GPT-3 (2020):   175B parameter
GPT-4 (2023):   ~1.8T parameter (تقدير)
Claude 3 Opus:  ~2T parameter (تقدير)
\`\`\`

لكن Scaling Laws تقول: بعد حجم معين، جودة البيانات والتدريب أهم من عدد الـ parameters.

### Hallucination — مشكلة LLMs الأساسية

LLMs تُولّد نصاً مقنعاً بناءً على الأنماط — لا تبحث في قاعدة بيانات حقيقية.

**النتيجة:** قد تُنتج معلومات خاطئة بثقة عالية — هذا يُسمى "Hallucination".

**الحل:** RAG (سنتعلمه في الدرس 4) — نُربط LLM بمصادر حقيقية.

### Context Window — الذاكرة القصيرة

Context Window هو أقصى عدد tokens يمكن للنموذج "رؤيته" في آنٍ واحد.

| النموذج | Context Window |
|---------|---------------|
| GPT-3.5 | 16K token |
| GPT-4o | 128K token |
| Claude 3.5 Sonnet | 200K token |
| Gemini 1.5 Pro | 1M token |

خارج الـ Context Window = النموذج لا يتذكره.
`,
      bodyEn: `## How do LLMs Work?

Large Language Models (LLMs) are the beating heart of the current AI revolution. ChatGPT, Claude, Gemini — they're all LLMs. But how do they actually work?

### Simple Definition

An LLM is a probabilistic model that predicts the next word in a text sequence, based on training on massive amounts of text.

### The Transformer Architecture (2017)

Google's "Attention is All You Need" paper transformed AI forever. The key innovation: **Self-Attention** — a mechanism allowing each token to "attend" to every other token and compute its relevance.

\`\`\`
Input Text → Tokenization → Embedding → [Self-Attention + Feed Forward] × N → Output
\`\`\`

### Tokens — The Building Blocks

LLMs don't read characters or words directly — they read **tokens** (text chunks):
- English: ~1.3 tokens per word
- Arabic: ~2–4 tokens per word

### Two-Stage Training

1. **Pre-training:** Predict next token on trillions of web/book tokens → language understanding
2. **Fine-tuning (RLHF):** Human feedback shapes helpful, safe behavior

### Key Limitations

- **Hallucination:** Generates plausible-sounding but false information → solution: RAG
- **Context Window:** Fixed memory limit (how much text the model can "see" at once)
- **Knowledge Cutoff:** Training data has a date; model doesn't know recent events
`,
      codeExample: `import anthropic
import tiktoken  # pip install tiktoken

client = anthropic.Anthropic()

# ─────────────────────────────────────────
# 1. فهم Tokenization
# ─────────────────────────────────────────
print("=" * 55)
print("1. Tokenization — كيف تُقسَّم النصوص")
print("=" * 55)

# tiktoken مكتبة OpenAI لحساب الـ tokens
# Claude يستخدم نظام مشابه
enc = tiktoken.encoding_for_model("gpt-4")

texts = [
    "Artificial Intelligence",
    "الذكاء الاصطناعي",
    "Hello World",
    "مرحبا بالعالم",
    "Python is great for AI development",
]

for text in texts:
    tokens = enc.encode(text)
    print(f"\\n'{text}'")
    print(f"  Tokens ({len(tokens)}): {tokens[:8]}{'...' if len(tokens) > 8 else ''}")
    ratio = len(tokens) / len(text.split())
    print(f"  نسبة tokens/كلمة: {ratio:.1f}")

# ─────────────────────────────────────────
# 2. استكشاف قدرات LLM
# ─────────────────────────────────────────
print("\\n" + "=" * 55)
print("2. استكشاف قدرات Claude")
print("=" * 55)

# اختبار الفهم السياقي
context_test = """
في هذه الجملة، كلمة "عين" لها معانٍ مختلفة:
1. ذهبت إلى عين الماء للشرب
2. العين البشرية تستطيع رؤية ألوان كثيرة
3. عيّنت المديرةَ الموظفَ الجديد

ما معنى كلمة "عين" في كل جملة؟ اشرح في نقطتين فقط.
"""

message = client.messages.create(
    model="claude-haiku-4-5-20251001",  # Haiku = سريع ورخيص للاستكشاف
    max_tokens=300,
    messages=[{"role": "user", "content": context_test}]
)
print("\\nفهم السياق (الغموض):")
print(message.content[0].text[:400])

# ─────────────────────────────────────────
# 3. Temperature — التحكم في الإبداع
# ─────────────────────────────────────────
print("\\n" + "=" * 55)
print("3. Temperature: التحكم في الإبداع vs الدقة")
print("=" * 55)

prompt = "أكمل الجملة: الذكاء الاصطناعي في المستقبل سيكون..."

for temp_label, temp_val in [("دقيق (0.0)", 0.0), ("متوازن (0.7)", 0.7), ("إبداعي (1.0)", 1.0)]:
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=80,
        temperature=temp_val,
        messages=[{"role": "user", "content": prompt}]
    )
    print(f"\\n  {temp_label}:")
    print(f"  {msg.content[0].text[:150].strip()}")

# ─────────────────────────────────────────
# 4. حساب تكلفة الـ tokens
# ─────────────────────────────────────────
print("\\n" + "=" * 55)
print("4. حساب تكلفة API")
print("=" * 55)

# أسعار Claude Haiku ($/M token)
HAIKU_INPUT  = 0.80 / 1_000_000
HAIKU_OUTPUT = 4.00 / 1_000_000

test_message = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=200,
    messages=[{"role": "user", "content": "اشرح ما هو التعلم العميق في 3 جمل"}]
)

in_tokens  = test_message.usage.input_tokens
out_tokens = test_message.usage.output_tokens
cost       = in_tokens * HAIKU_INPUT + out_tokens * HAIKU_OUTPUT

print(f"  Input tokens:  {in_tokens}")
print(f"  Output tokens: {out_tokens}")
print(f"  تكلفة هذا الطلب: \${cost:.6f} (~{cost*3.75:.4f} ريال)")
print(f"\\n  لو أرسلت 1000 رسالة مثلها:")
print(f"  التكلفة الكلية: \${cost*1000:.4f} (~{cost*1000*3.75:.2f} ريال)")`,
      codeLanguage: "python",
    },

    // Lesson 2 — Embeddings والتشابه الدلالي
    {
      bodyAr: `## Embeddings والتشابه الدلالي

Embeddings هي طريقة تحويل النصوص إلى أرقام بطريقة تحتفظ بالمعنى الدلالي. إنها اللبنة الأساسية لبناء أنظمة RAG والبحث الذكي.

### ما هو Embedding؟

Embedding هو تمثيل رياضي (متجه/vector) لنص ما في فضاء متعدد الأبعاد.

**المميزة الجوهرية:** النصوص المتشابهة في المعنى تكون **قريبة** في هذا الفضاء.

\`\`\`
"القطة تجلس على السجادة"  →  [0.23, -0.71, 0.45, ...]  (1536 بُعد)
"الهرة فوق البساط"        →  [0.25, -0.69, 0.43, ...]  قريب جداً!
"الطقس غداً ممطر"         →  [-0.82, 0.31, -0.55, ...] بعيد تماماً
\`\`\`

### Cosine Similarity — قياس التشابه

أشهر طريقة لحساب قرب متجهين:

\`\`\`
similarity = cos(θ) = (A · B) / (|A| × |B|)
\`\`\`

- similarity = 1.0 → متطابقان تماماً
- similarity = 0.0 → لا علاقة بينهما
- similarity = -1.0 → متعاكسان تماماً

### نماذج Embedding الشائعة

| النموذج | الأبعاد | الاستخدام |
|---------|---------|-----------|
| text-embedding-3-small (OpenAI) | 1536 | سريع وفعّال |
| text-embedding-3-large (OpenAI) | 3072 | أدق للبحث الدقيق |
| voyage-3-large (Anthropic) | 1024 | الأفضل مع Claude |
| all-MiniLM-L6-v2 (Hugging Face) | 384 | مجاني وسريع |

### التطبيقات العملية

**1. البحث الدلالي (Semantic Search):**
بدلاً من البحث بالكلمات الحرفية، نبحث بالمعنى.
\`\`\`
الاستعلام: "كيف أحسّن أداء تطبيقي؟"
يجد: "تحسين Performance في Next.js" (رغم أنها لا تحتوي "أداء")
\`\`\`

**2. التوصيات:**
محتوى مشابه لما شاهده المستخدم.

**3. كشف التكرار:**
إيجاد المستندات المتكررة أو المتشابهة.

**4. التصنيف Zero-Shot:**
تصنيف نصوص بدون تدريب — نقيس المسافة من labels.

### Chunking — تقسيم النص للـ Embedding

المستندات الطويلة تُقسَّم إلى **chunks** قبل الـ Embedding:

**استراتيجيات Chunking:**

\`\`\`
Fixed Size:     كل 512 حرف
Sentence:       جملة واحدة لكل chunk
Paragraph:      فقرة واحدة
Semantic:       مقاطع ذات معنى متكامل (الأفضل)
\`\`\`

**نصيحة:** overlap بين الـ chunks يُحسّن استرجاع السياق:
\`\`\`
[chunk 1: أحرف 0-500]
[chunk 2: أحرف 400-900]  ← 100 حرف overlap
[chunk 3: أحرف 800-1300]
\`\`\`

### Batch Embeddings للكفاءة

بدلاً من embedding كل نص على حدة، أرسلها دفعةً:

\`\`\`python
texts = ["نص 1", "نص 2", ..., "نص 1000"]
embeddings = model.encode(texts, batch_size=64)  # أسرع بكثير
\`\`\`
`,
      bodyEn: `## Embeddings and Semantic Similarity

Embeddings convert text into numbers in a way that preserves semantic meaning — the foundational building block for RAG systems and smart search.

### What is an Embedding?

An embedding is a mathematical representation (vector) of text in a multi-dimensional space. **Key property:** semantically similar texts are **close** in this space.

\`\`\`
"The cat sits on the mat"  →  [0.23, -0.71, 0.45, ...]
"A feline rests on the rug" →  [0.25, -0.69, 0.43, ...]  very close!
"Tomorrow will be rainy"    →  [-0.82, 0.31, -0.55, ...] far away
\`\`\`

### Cosine Similarity

\`\`\`
similarity = (A · B) / (|A| × |B|)
\`\`\`

1.0 = identical meaning, 0.0 = unrelated, -1.0 = opposite.

### Chunking Strategy

Long documents are split into chunks before embedding. Use **overlap** between chunks to preserve context:

\`\`\`
chunk 1: chars 0–500
chunk 2: chars 400–900  (100-char overlap)
chunk 3: chars 800–1300
\`\`\`

### Practical Applications

- **Semantic Search:** Find by meaning, not keywords
- **Recommendations:** Surface similar content
- **Duplicate Detection:** Find repeated documents
- **Zero-Shot Classification:** Measure distance from label embeddings
`,
      codeExample: `import numpy as np
from sentence_transformers import SentenceTransformer  # pip install sentence-transformers

print("=" * 55)
print("Embeddings: التشابه الدلالي")
print("=" * 55)

# نموذج مجاني يعمل محلياً
model = SentenceTransformer("all-MiniLM-L6-v2")

# ─────────────────────────────────────────
# 1. توليد الـ Embeddings
# ─────────────────────────────────────────
sentences_ar = [
    "القطة تجلس على السجادة",
    "الهرة فوق البساط",
    "كلب يركض في الحديقة",
    "أحب تناول القهوة في الصباح",
    "الشاي المسائي ممتع",
    "الذكاء الاصطناعي يغير العالم",
]

print("\\n1. توليد Embeddings...")
embeddings = model.encode(sentences_ar)
print(f"شكل مصفوفة الـ embeddings: {embeddings.shape}")
print(f"(عدد الجمل × أبعاد كل embedding)")

# ─────────────────────────────────────────
# 2. حساب Cosine Similarity
# ─────────────────────────────────────────
def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

print("\\n2. مصفوفة التشابه:")
print(f"{'':30s}", end="")
for s in sentences_ar:
    print(f"{s[:8]:10s}", end="")
print()

for i, (s1, e1) in enumerate(zip(sentences_ar, embeddings)):
    print(f"{s1[:30]:30s}", end="")
    for j, (s2, e2) in enumerate(zip(sentences_ar, embeddings)):
        sim = cosine_similarity(e1, e2)
        color = "🟢" if sim > 0.7 and i != j else ("🟡" if sim > 0.4 else "⚪")
        print(f"{color}{sim:.2f}   ", end="")
    print()

# ─────────────────────────────────────────
# 3. البحث الدلالي
# ─────────────────────────────────────────
print("\\n3. البحث الدلالي:")

# قاعدة معرفة صغيرة
knowledge_base = [
    {"id": 1, "text": "Python هي لغة برمجة مفسّرة عالية المستوى"},
    {"id": 2, "text": "تعلم الآلة يستخدم خوارزميات لاستخراج الأنماط من البيانات"},
    {"id": 3, "text": "الشبكات العصبية مستوحاة من الدماغ البشري"},
    {"id": 4, "text": "RAG يربط LLM بمصادر معرفة خارجية"},
    {"id": 5, "text": "Vector Database تخزن وتبحث في الـ embeddings بكفاءة"},
    {"id": 6, "text": "Transformer architecture غيّرت مجال NLP"},
]

kb_texts     = [doc["text"] for doc in knowledge_base]
kb_embeddings = model.encode(kb_texts)

def semantic_search(query: str, top_k: int = 3) -> list:
    q_emb = model.encode([query])[0]
    scores = [cosine_similarity(q_emb, kb_emb) for kb_emb in kb_embeddings]
    ranked = sorted(zip(scores, knowledge_base), key=lambda x: -x[0])
    return ranked[:top_k]

queries = [
    "كيف تعمل الشبكات العصبية؟",
    "ما هي قاعدة البيانات المناسبة للـ AI؟",
    "ما الفرق بين RAG وLLM العادي؟",
]

for query in queries:
    print(f"\\n🔍 الاستعلام: '{query}'")
    results = semantic_search(query)
    for score, doc in results:
        print(f"  ({score:.3f}) {doc['text']}")

# ─────────────────────────────────────────
# 4. Chunking مستند طويل
# ─────────────────────────────────────────
print("\\n4. Chunking استراتيجية:")

def chunk_text(text: str, chunk_size: int = 200, overlap: int = 50) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if len(chunk.strip()) > 20:
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

long_doc = """الذكاء الاصطناعي هو مجال واسع يشمل تعلم الآلة والتعلم العميق.
تعلم الآلة يستخدم الخوارزميات لتعلم الأنماط من البيانات بدون برمجة صريحة.
التعلم العميق يعتمد على شبكات عصبية عميقة لحل مشاكل معقدة.
نماذج اللغة الكبيرة مثل GPT وClaude هي تطبيقات متقدمة للتعلم العميق.
هذه النماذج تدرّبت على تريليونات الكلمات من الإنترنت والكتب."""

chunks = chunk_text(long_doc, chunk_size=100, overlap=20)
print(f"طول المستند: {len(long_doc)} حرف → {len(chunks)} chunks")
for i, chunk in enumerate(chunks, 1):
    print(f"  Chunk {i}: '{chunk[:50].strip()}...'")`,
      codeLanguage: "python",
    },

    // Lesson 3 — Vector Databases
    {
      bodyAr: `## Vector Databases

Vector Database هي قاعدة بيانات مُصمَّمة خصيصاً لتخزين والبحث في الـ embeddings بكفاءة عالية. إنها قلب أي نظام RAG حقيقي.

### لماذا لا تكفي قواعد البيانات التقليدية؟

في قاعدة بيانات عادية (SQL):
\`\`\`sql
SELECT * FROM docs WHERE text LIKE '%ذكاء اصطناعي%'
\`\`\`
هذا يبحث بالكلمات الحرفية فقط — لا يجد "ML" أو "تعلم الآلة".

في Vector Database:
\`\`\`python
results = db.similarity_search("كيف تعمل النماذج اللغوية؟", k=5)
# يجد: "LLMs", "الشبكات العصبية", "GPT", "Claude", "Transformers"
\`\`\`
يبحث بالمعنى وليس بالكلمة.

### خوارزميات البحث في Vector DBs

**Exact Search (KNN):**
- يحسب المسافة مع كل vector في القاعدة
- دقيق 100% لكن بطيء مع البيانات الكبيرة

**Approximate Nearest Neighbor (ANN):**
- يُضحّي بقليل من الدقة مقابل سرعة هائلة
- خوارزميات: HNSW، IVF، LSH

**HNSW (Hierarchical Navigable Small World):**
- الأشهر في الاستخدام الفعلي
- O(log n) للبحث بدلاً من O(n)
- تُستخدم في ChromaDB، Qdrant، Weaviate

### أشهر Vector Databases

| قاعدة البيانات | النوع | الاستخدام المثالي |
|--------------|-------|----------------|
| **ChromaDB** | Local/Cloud | مشاريع صغيرة، تطوير |
| **Pinecone** | Cloud فقط | Production مُدار |
| **Qdrant** | Local/Cloud | Performance عالي |
| **Weaviate** | Local/Cloud | بحث متقدم + Filtering |
| **Supabase pgvector** | PostgreSQL | إذا تستخدم Supabase بالفعل |
| **FAISS** | Local (Meta) | بحث سريع في الذاكرة |

### Metadata Filtering

الميزة التي تجعل Vector DBs قوية فعلاً: الجمع بين البحث الدلالي وتصفية البيانات.

\`\`\`python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    where={                           # Metadata filter
        "$and": [
            {"category": "python"},
            {"level": {"$in": ["beginner", "intermediate"]}},
            {"date": {"$gte": "2024-01-01"}}
        ]
    }
)
\`\`\`

### Indexing Strategy — كيف تُنظَّم البيانات

**Collections:** مجموعات مستقلة (مثل جداول SQL).

**Namespaces:** فصل بيانات عدة عملاء في نفس الـ index.

**Hierarchical indexing:**
\`\`\`
المستوى 1: القسم (مثل: Python, ML, Cloud)
المستوى 2: الموضوع (مثل: Functions, Classes)
المستوى 3: chunk نصي محدد
\`\`\`

### pgvector — Vector DB داخل PostgreSQL

إذا كنت تستخدم PostgreSQL/Supabase، يمكنك إضافة قدرات Vector Search مباشرةً:

\`\`\`sql
-- تفعيل extension
CREATE EXTENSION IF NOT EXISTS vector;

-- إنشاء جدول مع عمود vector
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),
  metadata JSONB
);

-- إنشاء HNSW index
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops);

-- البحث
SELECT content, (embedding <=> $1) AS distance
FROM documents
ORDER BY distance
LIMIT 5;
\`\`\`

هذا يُعطيك قاعدة بيانات واحدة تدير البيانات التقليدية والـ vectors معاً.
`,
      bodyEn: `## Vector Databases

A Vector Database is designed specifically for storing and searching embeddings efficiently. It's the heart of any real RAG system.

### Why Not Traditional Databases?

SQL LIKE search finds literal keywords. Vector DBs search by **meaning** — finding semantically similar documents even if they share no exact words.

### Search Algorithms

- **Exact KNN:** 100% accurate but O(n) — slow on large datasets
- **HNSW (Approximate):** O(log n) search, slight accuracy trade-off — used by ChromaDB, Qdrant
- **IVF:** Clusters vectors first for faster search

### Popular Vector DBs

| Database | Type | Best For |
|----------|------|---------|
| **ChromaDB** | Local/Cloud | Development & prototyping |
| **Pinecone** | Cloud only | Managed production |
| **Qdrant** | Local/Cloud | High performance |
| **pgvector** | PostgreSQL | If already using Supabase/Postgres |

### Metadata Filtering

The killer feature: combine semantic search with structured filters:

\`\`\`python
results = collection.query(
    query_embeddings=[q_emb],
    where={"category": "python", "level": "beginner"}
)
\`\`\`
`,
      codeExample: `# pip install chromadb sentence-transformers
import chromadb
from sentence_transformers import SentenceTransformer
import json

print("=" * 55)
print("ChromaDB: Vector Database عملي")
print("=" * 55)

# ─────────────────────────────────────────
# 1. إعداد ChromaDB و Embedding Model
# ─────────────────────────────────────────
client = chromadb.Client()  # In-memory (لا يحتاج تثبيت سيرفر)
model = SentenceTransformer("all-MiniLM-L6-v2")

# إنشاء collection
collection = client.create_collection(
    name="course_content",
    metadata={"description": "محتوى دورات أكاديمية Darhous"}
)

# ─────────────────────────────────────────
# 2. إضافة وثائق (Indexing)
# ─────────────────────────────────────────
documents = [
    {"id": "py_1", "text": "Python لغة برمجة متعددة الاستخدامات تتميز بسهولة القراءة", "category": "python", "level": "beginner"},
    {"id": "py_2", "text": "الـ List Comprehension في Python طريقة أنيقة لإنشاء القوائم", "category": "python", "level": "intermediate"},
    {"id": "ml_1", "text": "Linear Regression تتنبأ بقيم مستمرة من بيانات التدريب", "category": "ml", "level": "intermediate"},
    {"id": "ml_2", "text": "Random Forest خوارزمية تجمع عدة Decision Trees للحصول على دقة أعلى", "category": "ml", "level": "intermediate"},
    {"id": "ai_1", "text": "LLMs مثل Claude وGPT تتدرب على مليارات النصوص وتتنبأ بالكلمة التالية", "category": "ai", "level": "intermediate"},
    {"id": "ai_2", "text": "RAG يحسن دقة LLMs بربطها بقواعد معرفة خارجية حديثة", "category": "ai", "level": "advanced"},
    {"id": "ai_3", "text": "Embeddings تمثيل رياضي للنصوص يحافظ على التشابه الدلالي", "category": "ai", "level": "intermediate"},
    {"id": "cloud_1", "text": "Supabase قاعدة بيانات PostgreSQL مدارة مع دعم vector search", "category": "cloud", "level": "beginner"},
]

# توليد الـ embeddings
texts = [d["text"] for d in documents]
embeddings = model.encode(texts).tolist()

# إضافة للـ collection
collection.add(
    ids=[d["id"] for d in documents],
    documents=texts,
    embeddings=embeddings,
    metadatas=[{"category": d["category"], "level": d["level"]} for d in documents]
)

print(f"\\n✅ تم إضافة {len(documents)} وثيقة للـ vector database")

# ─────────────────────────────────────────
# 3. البحث الدلالي البسيط
# ─────────────────────────────────────────
print("\\n3. البحث الدلالي:")

queries = [
    "كيف أبني نموذج تنبؤ؟",
    "ما هو أفضل طريقة لتخزين البيانات في السحابة؟",
    "كيف تتعلم النماذج من البيانات؟",
]

for query in queries:
    q_emb = model.encode([query]).tolist()
    results = collection.query(
        query_embeddings=q_emb,
        n_results=2
    )
    print(f"\\n🔍 '{query}'")
    for doc, dist in zip(results["documents"][0], results["distances"][0]):
        similarity = 1 - dist  # ChromaDB يُرجع المسافة، نحوّلها لتشابه
        print(f"  ({similarity:.3f}) {doc[:60]}...")

# ─────────────────────────────────────────
# 4. البحث مع Metadata Filtering
# ─────────────────────────────────────────
print("\\n4. البحث مع فلترة البيانات:")

query = "كيف تعمل الخوارزميات؟"
q_emb = model.encode([query]).tolist()

# البحث في فئة ml فقط
results_ml = collection.query(
    query_embeddings=q_emb,
    n_results=3,
    where={"category": "ml"}  # Metadata filter
)

print(f"\\n🔍 '{query}' (في فئة ML فقط):")
for doc, meta in zip(results_ml["documents"][0], results_ml["metadatas"][0]):
    print(f"  [{meta['category']}/{meta['level']}] {doc[:60]}...")

# ─────────────────────────────────────────
# 5. إحصائيات الـ Collection
# ─────────────────────────────────────────
print("\\n5. إحصائيات:")
print(f"  عدد الوثائق: {collection.count()}")
all_items = collection.get()
categories = {}
for meta in all_items["metadatas"]:
    cat = meta["category"]
    categories[cat] = categories.get(cat, 0) + 1
print(f"  توزيع الفئات: {json.dumps(categories, ensure_ascii=False)}")`,
      codeLanguage: "python",
    },

    // Lesson 4 — بناء نظام RAG من الصفر
    {
      bodyAr: `## بناء نظام RAG من الصفر

RAG (Retrieval-Augmented Generation) هي التقنية التي تحلّ مشكلة Hallucination في LLMs — تربط النموذج بمصادر معرفة حقيقية وحديثة.

### لماذا RAG؟

**مشكلة LLMs بدون RAG:**
- معرفتها تنتهي بتاريخ التدريب
- لا تعرف معلومات شركتك أو مستنداتك
- تُنتج معلومات خاطئة بثقة

**الحل: RAG**
\`\`\`
السؤال + [وثائق ذات صلة] → LLM → إجابة مستندة للحقائق
\`\`\`

### بنية RAG الأساسية

\`\`\`
المرحلة 1 — Indexing (مرة واحدة):
مستنداتك → Chunking → Embedding → Vector DB

المرحلة 2 — Retrieval + Generation (لكل سؤال):
السؤال → Embedding → Vector Search → أفضل Chunks
    ↓
[السؤال + الـ Chunks] → LLM → الإجابة
\`\`\`

### أنماط RAG المتقدمة

**Naive RAG (الأساسي):**
\`\`\`
سؤال → بحث مباشر → LLM
\`\`\`

**Advanced RAG:**
- **Query Rewriting:** تُعيد صياغة السؤال لنتائج أفضل
- **HyDE (Hypothetical Document Embedding):** تُولّد إجابة افتراضية ثم تبحث بها
- **Re-ranking:** تُعيد ترتيب النتائج بمعايير إضافية

**Modular RAG:**
- Routing: يختار أي source يستعلم منها
- Fusion: يجمع نتائج من مصادر متعددة

### تقييم RAG — مقاييس مهمة

| المقياس | المعنى |
|---------|--------|
| **Faithfulness** | هل الإجابة مبنية على السياق المُسترجَع؟ |
| **Answer Relevance** | هل الإجابة تُجيب على السؤال؟ |
| **Context Recall** | هل الـ retrieval جلب المعلومات الصحيحة؟ |
| **Context Precision** | هل الـ chunks المُسترجَعة كلها مفيدة؟ |

### Prompt Engineering للـ RAG

\`\`\`
أجب على السؤال بناءً على السياق المقدَّم فقط.
إذا لم يكن السياق يحتوي المعلومات، قل "لا أعلم" بدلاً من التخمين.

السياق:
{context}

السؤال: {question}
\`\`\`

هذا الـ prompt يُقلّل Hallucination ويجعل النموذج يستند للمصادر.

### Chunking Strategy للـ RAG

**القاعدة الذهبية:** Chunk واحد = فكرة واحدة متكاملة.

\`\`\`
جيد:   فقرة كاملة تشرح Linear Regression
سيء:   نصف تعريف Linear Regression
       + نصف مثال لـ Decision Tree
\`\`\`

**الحجم المثالي:** 200-500 token مع 10-20% overlap.
`,
      bodyEn: `## Building a RAG System from Scratch

RAG (Retrieval-Augmented Generation) solves the hallucination problem in LLMs by connecting the model to real, up-to-date knowledge sources.

### Why RAG?

**Without RAG:** LLMs have a knowledge cutoff, don't know your documents, and can hallucinate confidently.

**With RAG:**
\`\`\`
Question + [Retrieved relevant chunks] → LLM → Fact-grounded answer
\`\`\`

### Two-Stage Architecture

**Indexing (once):** Documents → Chunking → Embedding → Vector DB

**Retrieval + Generation (per query):**
Question → Embedding → Vector Search → Top Chunks → LLM → Answer

### RAG Evaluation Metrics

| Metric | Meaning |
|--------|---------|
| **Faithfulness** | Is the answer grounded in the retrieved context? |
| **Answer Relevance** | Does the answer address the question? |
| **Context Recall** | Did retrieval fetch the right information? |

### Golden Prompt Template

\`\`\`
Answer the question based ONLY on the provided context.
If the context doesn't contain the answer, say "I don't know."

Context: {context}
Question: {question}
\`\`\`
`,
      codeExample: `import anthropic
import chromadb
from sentence_transformers import SentenceTransformer
from pathlib import Path

print("=" * 60)
print("RAG System: نظام Q&A على المستندات")
print("=" * 60)

# ─────────────────────────────────────────
# الإعداد
# ─────────────────────────────────────────
claude_client = anthropic.Anthropic()
embed_model   = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.Client()

# ─────────────────────────────────────────
# 1. Indexing — بناء قاعدة المعرفة
# ─────────────────────────────────────────
def chunk_text(text: str, chunk_size: int = 300, overlap: int = 50) -> list[str]:
    """تقسيم النص إلى chunks متداخلة"""
    chunks, start = [], 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunk = text[start:end].strip()
        if len(chunk) > 50:
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

# مستندات تجريبية (في الواقع: PDF, Word, Web pages)
documents = {
    "ai_basics.txt": """
الذكاء الاصطناعي هو مجال في علوم الحاسوب يهدف إلى محاكاة الذكاء البشري.
يشمل تعلم الآلة والتعلم العميق ومعالجة اللغة الطبيعية.
Claude هو نموذج لغوي من Anthropic يتميز بالأمان والدقة.
GPT-4 من OpenAI هو أحد أقوى النماذج في السوق حالياً.
يمكن للذكاء الاصطناعي الحديث كتابة الكود وتحليل البيانات وترجمة النصوص.
    """,
    "programming.txt": """
Python هي لغة برمجة عالية المستوى تتميز بسهولة القراءة.
تُستخدم Python على نطاق واسع في تعلم الآلة والذكاء الاصطناعي.
مكتبة NumPy تتيح العمليات الرياضية على المصفوفات بكفاءة عالية.
Pandas توفر أدوات قوية لتحليل البيانات الجدولية.
Scikit-learn هي المكتبة الأكثر استخداماً لتعلم الآلة الكلاسيكي.
    """,
    "rag_info.txt": """
RAG اختصار Retrieval-Augmented Generation أي التوليد المُعزَّز بالاسترداد.
تقنية RAG تحلّ مشكلة Hallucination في نماذج اللغة الكبيرة.
تعمل RAG بمرحلتين: الأولى Indexing والثانية Retrieval مع Generation.
في مرحلة Indexing يتم تحويل المستندات إلى embeddings وتخزينها في vector database.
في مرحلة الاستخدام يتم تحويل السؤال لـ embedding والبحث عن أقرب المستندات.
    """
}

# بناء الـ collection
collection = chroma_client.create_collection("knowledge_base")
all_chunks, all_ids, all_metas = [], [], []

for doc_name, doc_text in documents.items():
    chunks = chunk_text(doc_text)
    for i, chunk in enumerate(chunks):
        all_chunks.append(chunk)
        all_ids.append(f"{doc_name}_{i}")
        all_metas.append({"source": doc_name, "chunk_idx": i})

# توليد embeddings وإضافة للـ collection
embeddings = embed_model.encode(all_chunks).tolist()
collection.add(
    ids=all_ids,
    documents=all_chunks,
    embeddings=embeddings,
    metadatas=all_metas
)

print(f"✅ تم إنشاء قاعدة المعرفة: {len(all_chunks)} chunk من {len(documents)} مستند")

# ─────────────────────────────────────────
# 2. RAG Pipeline — الاستعلام والإجابة
# ─────────────────────────────────────────
def rag_query(question: str, top_k: int = 3, verbose: bool = True) -> str:
    """نظام RAG كامل: بحث + توليد"""

    # البحث عن أقرب chunks
    q_emb = embed_model.encode([question]).tolist()
    results = collection.query(
        query_embeddings=q_emb,
        n_results=top_k
    )

    # تجميع السياق
    chunks = results["documents"][0]
    sources = [m["source"] for m in results["metadatas"][0]]
    context = "\\n\\n---\\n\\n".join(chunks)

    if verbose:
        print(f"\\n{'='*50}")
        print(f"السؤال: {question}")
        print(f"\\nالـ Chunks المُسترجَعة ({top_k}):")
        for chunk, src in zip(chunks, sources):
            print(f"  [{src}] {chunk[:80].strip()}...")

    # بناء الـ Prompt
    prompt = f"""أجب على السؤال التالي بناءً على السياق المقدَّم فقط.
إذا لم يكن السياق يحتوي على المعلومات الكافية، قل ذلك بوضوح.

السياق:
{context}

السؤال: {question}

أجب بإيجاز ودقة باللغة العربية."""

    # استدعاء Claude
    message = claude_client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}]
    )

    answer = message.content[0].text

    if verbose:
        print(f"\\nالإجابة:")
        print(answer)

    return answer

# ─────────────────────────────────────────
# 3. تجربة الـ RAG
# ─────────────────────────────────────────
questions = [
    "ما هو Claude وما مميزاته؟",
    "ما الفرق بين NumPy وPandas؟",
    "كيف تعمل تقنية RAG؟",
    "ما هي عاصمة فرنسا؟",  # سؤال خارج نطاق المعرفة
]

for q in questions:
    rag_query(q, top_k=3, verbose=True)`,
      codeLanguage: "python",
    },

    // Lesson 5 — مشروع: PDF Chatbot
    {
      bodyAr: `## مشروع: PDF Chatbot

هذا المشروع يجمع كل مهارات دورة Generative AI في تطبيق واقعي: Chatbot يتحدث مع PDF بأي لغة.

### ما ستبنيه

\`\`\`
PDF Chatbot
├── 📄 رفع PDF وتحليله تلقائياً
├── ✂️  Chunking ذكي بالفقرات
├── 🧠  Embeddings + ChromaDB
├── 💬  محادثة طبيعية مع RAG
└── 🔄  ذاكرة المحادثة (Multi-turn)
\`\`\`

### التثبيت

\`\`\`bash
pip install anthropic chromadb sentence-transformers pypdf2 rich
\`\`\`

### ما تعلمته في هذه الدورة

| الدرس | ما تعلمته |
|-------|---------|
| 1. كيف تعمل LLMs | Transformer، Tokenization، Hallucination |
| 2. Embeddings | Cosine Similarity، Chunking، Semantic Search |
| 3. Vector Databases | ChromaDB، HNSW، Metadata Filtering |
| 4. RAG من الصفر | Indexing Pipeline، Retrieval، RAG Prompt |
| 5. **المشروع** | PDF Chatbot كامل مع Multi-turn |

### أفكار للتطوير

بعد إنهاء المشروع، يمكنك:

1. **واجهة ويب:** Next.js + Vercel AI SDK لبناء Chatbot بواجهة جميلة
2. **دعم أنواع أخرى:** Word، CSV، Web scraping
3. **Multi-PDF:** رفع عدة PDFs في نفس الـ session
4. **Citations:** إظهار الصفحة المصدر مع كل إجابة
5. **Streaming:** عرض الإجابة حرفاً بحرف أثناء التوليد

### تحدّيك

ابنِ الـ Chatbot كاملاً ثم جرّبه على:
- كتاب تقني أو أكاديمي (English)
- تقرير شركة أو مقال بحثي
- وثيقة قانونية أو عقد

لاحظ كيف تتغير جودة الإجابات مع تغيير حجم الـ chunk وعدد الـ results.
`,
      bodyEn: `## Project: PDF Chatbot

This project combines all Generative AI course skills into a real application: a chatbot that converses with any PDF in any language.

### What You'll Build

\`\`\`
PDF Chatbot
├── Upload & parse any PDF automatically
├── Smart paragraph-based chunking
├── Embeddings + ChromaDB vector storage
├── Natural conversation with RAG
└── Conversation memory (Multi-turn)
\`\`\`

### What You Learned in This Course

Every lesson combined in this final project — from understanding how LLMs work to building a complete RAG-powered chatbot.

### Extension Ideas

1. **Web UI:** Next.js + Vercel AI SDK for a beautiful interface
2. **Multi-format:** Word, CSV, web scraping
3. **Citations:** Show source page number with each answer
4. **Streaming:** Display response token by token
`,
      codeExample: `# PDF Chatbot — نظام RAG كامل مع ذاكرة محادثة
# pip install anthropic chromadb sentence-transformers pypdf2 rich

import sys
import anthropic
import chromadb
from sentence_transformers import SentenceTransformer
from pathlib import Path

try:
    import PyPDF2
    HAS_PDF = True
except ImportError:
    HAS_PDF = False
    print("⚠️ pip install pypdf2  لدعم PDF")

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.markdown import Markdown
    console = Console()
    USE_RICH = True
except ImportError:
    USE_RICH = False

# ─────────────────────────────────────────
# أدوات
# ─────────────────────────────────────────
def extract_pdf_text(pdf_path: str) -> str:
    """استخراج النص من PDF"""
    if not HAS_PDF:
        return "خطأ: مكتبة PyPDF2 غير مثبتة"
    text_parts = []
    with open(pdf_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page_num, page in enumerate(reader.pages, 1):
            text = page.extract_text()
            if text:
                text_parts.append(f"[صفحة {page_num}]\\n{text}")
    return "\\n\\n".join(text_parts)

def smart_chunk(text: str, min_size: int = 100, max_size: int = 500) -> list[str]:
    """تقسيم ذكي بالفقرات مع حد أدنى وأقصى"""
    # تقسيم بالفقرات أولاً
    paragraphs = [p.strip() for p in text.split("\\n\\n") if p.strip()]
    chunks, current_chunk = [], ""

    for para in paragraphs:
        if len(current_chunk) + len(para) <= max_size:
            current_chunk += (("\\n\\n" + para) if current_chunk else para)
        else:
            if len(current_chunk) >= min_size:
                chunks.append(current_chunk)
            current_chunk = para

    if current_chunk and len(current_chunk) >= min_size:
        chunks.append(current_chunk)

    return chunks

# ─────────────────────────────────────────
# PDF Chatbot Class
# ─────────────────────────────────────────
class PDFChatbot:
    def __init__(self):
        self.claude       = anthropic.Anthropic()
        self.embed_model  = SentenceTransformer("all-MiniLM-L6-v2")
        self.chroma       = chromadb.Client()
        self.collection   = None
        self.pdf_name     = ""
        self.chat_history: list[dict] = []
        self.chunk_count  = 0

    def load_pdf(self, pdf_path: str) -> bool:
        """تحميل PDF وبناء قاعدة المعرفة"""
        path = Path(pdf_path)
        if not path.exists():
            print(f"❌ الملف غير موجود: {pdf_path}")
            return False

        print(f"\\n📄 جاري قراءة: {path.name}")
        text = extract_pdf_text(pdf_path)
        if not text or len(text) < 100:
            print("❌ تعذّر استخراج النص من PDF")
            return False

        print(f"✅ استُخرج {len(text)} حرف")

        # Chunking
        chunks = smart_chunk(text)
        print(f"✂️  تقسيم إلى {len(chunks)} chunk")

        # إنشاء collection جديدة
        try:
            self.chroma.delete_collection("pdf_chat")
        except Exception:
            pass
        self.collection = self.chroma.create_collection("pdf_chat")

        # Embedding وإضافة
        print("🧠 توليد Embeddings...")
        embeddings = self.embed_model.encode(chunks).tolist()
        self.collection.add(
            ids=[f"c{i}" for i in range(len(chunks))],
            documents=chunks,
            embeddings=embeddings
        )

        self.pdf_name    = path.name
        self.chunk_count = len(chunks)
        self.chat_history = []
        print(f"✅ جاهز للمحادثة! ({len(chunks)} chunk مفهرس)")
        return True

    def ask(self, question: str, top_k: int = 4) -> str:
        """اطرح سؤالاً على الـ PDF"""
        if not self.collection:
            return "❌ لم يتم تحميل أي PDF بعد"

        # استرجاع الـ chunks ذات الصلة
        q_emb   = self.embed_model.encode([question]).tolist()
        results = self.collection.query(query_embeddings=q_emb, n_results=top_k)
        context = "\\n\\n---\\n\\n".join(results["documents"][0])

        # بناء سياق المحادثة (Multi-turn)
        history_text = ""
        if self.chat_history:
            last_3 = self.chat_history[-3:]  # آخر 3 أزواج
            for turn in last_3:
                history_text += f"المستخدم: {turn['q']}\\nالمساعد: {turn['a'][:200]}...\\n\\n"

        # الـ Prompt
        prompt = f"""أنت مساعد ذكي متخصص في تحليل المستندات.
تحدث مع المستخدم باللغة التي يستخدمها (عربي/إنجليزي).
أجب بناءً على السياق المقدم فقط. إذا كانت المعلومات غير موجودة في السياق، قل ذلك.

{f"سياق المحادثة السابقة:\\n{history_text}" if history_text else ""}
محتوى ذو صلة من المستند ({self.pdf_name}):
{context}

سؤال المستخدم: {question}"""

        msg = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=600,
            messages=[{"role": "user", "content": prompt}]
        )
        answer = msg.content[0].text

        # حفظ في السجل
        self.chat_history.append({"q": question, "a": answer})
        return answer

# ─────────────────────────────────────────
# واجهة المستخدم
# ─────────────────────────────────────────
def main():
    bot = PDFChatbot()

    print("=" * 60)
    print("📚 PDF Chatbot — تحدّث مع أي PDF")
    print("=" * 60)
    print("الأوامر: /load <مسار_PDF> | /clear | /exit")

    # تحميل PDF تجريبي إذا لم يُحدَّد
    sample_path = sys.argv[1] if len(sys.argv) > 1 else None
    if sample_path:
        bot.load_pdf(sample_path)

    while True:
        try:
            user_input = input("\\nأنت: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\\n👋 إلى اللقاء!")
            break

        if not user_input:
            continue

        if user_input.startswith("/load "):
            pdf_path = user_input[6:].strip()
            bot.load_pdf(pdf_path)

        elif user_input == "/clear":
            bot.chat_history = []
            print("✅ تم مسح سجل المحادثة")

        elif user_input in ["/exit", "/خروج"]:
            print("👋 إلى اللقاء!")
            break

        elif not bot.collection:
            print("⚠️ استخدم: /load <مسار_PDF>  لتحميل مستند أولاً")

        else:
            answer = bot.ask(user_input)
            print(f"\\nالمساعد: {answer}")

if __name__ == "__main__":
    main()`,
      codeLanguage: "python",
    },
  ],

};
