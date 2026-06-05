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
};
