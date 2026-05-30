export interface Tool {
  id: string;
  name: string;
  category: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  useCases: string[];
  level: "beginner" | "intermediate" | "advanced";
  pricingType: "free" | "freemium" | "paid" | "open-source";
  bestFor: string;
  tags: string[];
  featured: boolean;
  website?: string;
  // Detail page fields
  overviewAr?: string;
  overviewEn?: string;
  howToStartAr?: string[];
  howToStartEn?: string[];
  pros?: string[];
  limitations?: string[];
  alternatives?: string[];
  relatedPrompts?: string[];
  relatedCourses?: string[];
  recommendedPath?: string;
}

export const tools: Tool[] = [
  // AI Chatbots
  { id: "chatgpt",      name: "ChatGPT",           category: "AI Chatbots",      shortDescriptionAr: "أشهر نموذج محادثة من OpenAI",                  shortDescriptionEn: "The most popular conversational AI from OpenAI",    useCases: ["Writing","Coding","Analysis","Q&A"],       level: "beginner",     pricingType: "freemium",    bestFor: "General use",    tags: ["gpt","openai","chat"],   featured: true  },
  { id: "claude",       name: "Claude",             category: "AI Chatbots",      shortDescriptionAr: "نموذج AI متقدم من Anthropic للمهام المعقدة",      shortDescriptionEn: "Advanced AI from Anthropic for complex tasks",      useCases: ["Coding","Writing","Research","Analysis"],  level: "beginner",     pricingType: "freemium",    bestFor: "Deep analysis",  tags: ["anthropic","claude"], featured: true  },
  { id: "gemini",       name: "Gemini",             category: "AI Chatbots",      shortDescriptionAr: "نموذج AI متعدد الوسائط من Google",                shortDescriptionEn: "Multimodal AI from Google",                        useCases: ["Research","Coding","Multimodal"],          level: "beginner",     pricingType: "freemium",    bestFor: "Google Workspace",tags: ["google","gemini"],    featured: false },
  { id: "perplexity",   name: "Perplexity",         category: "AI Chatbots",      shortDescriptionAr: "محرك بحث AI مع مصادر حقيقية",                    shortDescriptionEn: "AI search engine with real sources",               useCases: ["Research","Search","Citations"],           level: "beginner",     pricingType: "freemium",    bestFor: "Research",       tags: ["search","research"], featured: true  },
  { id: "copilot",      name: "Microsoft Copilot",  category: "AI Chatbots",      shortDescriptionAr: "مساعد AI مدمج في منتجات Microsoft",               shortDescriptionEn: "AI assistant integrated into Microsoft products",   useCases: ["Office","Coding","Search"],               level: "beginner",     pricingType: "freemium",    bestFor: "Microsoft 365",  tags: ["microsoft","office"], featured: false },
  // Claude Ecosystem
  { id: "claude-code", name: "Claude Code", category: "Claude Ecosystem",
    shortDescriptionAr: "أداة برمجة AI متقدمة من Anthropic في الطرفية",
    shortDescriptionEn: "Anthropic's advanced CLI coding AI agent",
    useCases: ["Coding","Refactoring","Testing","Docs"], level: "intermediate", pricingType: "paid",
    bestFor: "Full-stack dev", tags: ["claude","coding","cli"], featured: true,
    overviewAr: "Claude Code هو وكيل AI متكامل يعمل مباشرة في طرفيتك. يمكنه قراءة وكتابة وتشغيل واختبار الكود تلقائياً، ويفهم هيكل مشروعك الكامل.",
    overviewEn: "Claude Code is a full AI agent that works directly in your terminal. It can read, write, run, and test code automatically while understanding your entire project structure.",
    howToStartAr: ["تثبيت npm install -g @anthropic-ai/claude-code", "التشغيل بأمر claude في أي مجلد", "قول 'build me a...' وانتظر السحر"],
    howToStartEn: ["Install with npm install -g @anthropic-ai/claude-code", "Run with claude command in any folder", "Say 'build me a...' and watch the magic"],
    pros: ["يفهم المشروع كاملاً", "يكتب ويشغل الكود تلقائياً", "يصلح الأخطاء بشكل ذاتي", "يكتب الاختبارات"],
    limitations: ["مدفوع (Claude Pro/Max)", "يحتاج اتصال إنترنت", "قد يرتكب أخطاء في مشاريع كبيرة جداً"],
    alternatives: ["Cursor", "GitHub Copilot", "Windsurf"],
    relatedPrompts: ["build-website", "audit-codebase", "fix-bug"],
    relatedCourses: ["claude-mastery"],
    recommendedPath: "claude-power-user",
  },
  { id: "claude-api",       name: "Claude API",        category: "Claude Ecosystem", shortDescriptionAr: "API الرسمي للوصول البرمجي لنماذج Claude",           shortDescriptionEn: "Official API for programmatic access to Claude",    useCases: ["API","Integration","Automation"],          level: "advanced",     pricingType: "paid",        bestFor: "Developers",     tags: ["api","anthropic"],  featured: true  },
  { id: "mcp-servers",      name: "MCP Servers",       category: "Claude Ecosystem", shortDescriptionAr: "بروتوكول Model Context لتوسيع قدرات Claude",        shortDescriptionEn: "Model Context Protocol to extend Claude's abilities",useCases: ["Integration","Tools","Automation"],        level: "advanced",     pricingType: "open-source", bestFor: "Power users",    tags: ["mcp","protocol"],   featured: true  },
  { id: "claude-projects",  name: "Claude Projects",   category: "Claude Ecosystem", shortDescriptionAr: "إدارة المشاريع مع Claude بسياق مثابر",              shortDescriptionEn: "Manage projects with Claude with persistent context",useCases: ["Projects","Context","Collaboration"],      level: "intermediate", pricingType: "freemium",    bestFor: "Project mgmt",   tags: ["claude","projects"],featured: false },
  { id: "claude-artifacts", name: "Claude Artifacts",  category: "Claude Ecosystem", shortDescriptionAr: "توليد وتشغيل الكود والمحتوى مباشرة في Claude",      shortDescriptionEn: "Generate and run code/content directly in Claude",  useCases: ["Prototyping","UI","Coding"],               level: "beginner",     pricingType: "freemium",    bestFor: "Rapid prototyping",tags: ["claude","artifacts"],featured: false },
  // Coding Agents
  { id: "github-copilot",  name: "GitHub Copilot",    category: "Coding Agents",    shortDescriptionAr: "مساعد البرمجة AI من GitHub مدمج في IDE",             shortDescriptionEn: "GitHub's AI coding assistant integrated in IDEs",   useCases: ["Autocomplete","Coding","Testing"],         level: "beginner",     pricingType: "paid",        bestFor: "IDE users",      tags: ["github","copilot"], featured: true  },
  { id: "cursor",          name: "Cursor",            category: "Coding Agents",    shortDescriptionAr: "محرر كود مبني بالكامل حول AI",                     shortDescriptionEn: "IDE built entirely around AI coding",              useCases: ["Coding","Refactoring","Debugging"],        level: "intermediate", pricingType: "freemium",    bestFor: "AI-first coding",tags: ["cursor","ide"],     featured: true  },
  { id: "windsurf",        name: "Windsurf",          category: "Coding Agents",    shortDescriptionAr: "محرر AI من Codeium مع تدفق عمل متكامل",             shortDescriptionEn: "Codeium's AI editor with integrated workflow",      useCases: ["Coding","Automation","Refactoring"],       level: "intermediate", pricingType: "freemium",    bestFor: "Flow state coding",tags: ["windsurf","ide"],  featured: false },
  { id: "replit-agent",    name: "Replit Agent",      category: "Coding Agents",    shortDescriptionAr: "بناء تطبيقات كاملة بالمحادثة على Replit",            shortDescriptionEn: "Build full apps via conversation on Replit",        useCases: ["Prototyping","Full-stack","Deployment"],   level: "beginner",     pricingType: "freemium",    bestFor: "Quick prototypes",tags: ["replit","agent"],  featured: false },
  { id: "aider",           name: "Aider",             category: "Coding Agents",    shortDescriptionAr: "مساعد برمجة AI في الطرفية مفتوح المصدر",             shortDescriptionEn: "Open-source AI coding assistant in the terminal",   useCases: ["Coding","Refactoring","Git"],              level: "advanced",     pricingType: "open-source", bestFor: "Terminal lovers", tags: ["aider","cli"],      featured: false },
  // Image Generation
  { id: "midjourney",      name: "Midjourney",        category: "Image Generation", shortDescriptionAr: "أشهر أداة توليد صور AI عبر Discord",               shortDescriptionEn: "Most popular AI image generator via Discord",       useCases: ["Art","Design","Marketing"],               level: "beginner",     pricingType: "paid",        bestFor: "Art creation",   tags: ["image","art"],      featured: true  },
  { id: "dalle",           name: "DALL·E",            category: "Image Generation", shortDescriptionAr: "مولد صور AI من OpenAI مع تحكم دقيق",               shortDescriptionEn: "OpenAI's image generator with precise control",     useCases: ["Images","Marketing","Content"],            level: "beginner",     pricingType: "paid",        bestFor: "Quick visuals",  tags: ["dalle","openai"],   featured: false },
  { id: "stable-diffusion",name: "Stable Diffusion",  category: "Image Generation", shortDescriptionAr: "مولد صور AI مفتوح المصدر يعمل محليًا",               shortDescriptionEn: "Open-source AI image generator running locally",    useCases: ["Local AI","Custom Models","Art"],          level: "advanced",     pricingType: "open-source", bestFor: "Local generation",tags: ["sd","local"],       featured: false },
  { id: "ideogram",        name: "Ideogram",          category: "Image Generation", shortDescriptionAr: "مولد صور AI ممتاز للنصوص داخل الصور",               shortDescriptionEn: "AI image generator excellent at text in images",    useCases: ["Text Design","Logos","Marketing"],         level: "beginner",     pricingType: "freemium",    bestFor: "Text in images", tags: ["ideogram","text"],  featured: false },
  // AI Automation
  { id: "n8n", name: "n8n", category: "AI Automation",
    shortDescriptionAr: "منصة أتمتة مفتوحة المصدر قابلة للاستضافة الذاتية",
    shortDescriptionEn: "Open-source automation platform, self-hostable",
    useCases: ["Workflows","Integration","AI Agents"], level: "intermediate", pricingType: "open-source",
    bestFor: "Developers", tags: ["n8n","automation"], featured: true,
    overviewAr: "n8n هي منصة أتمتة مفتوحة المصدر تتيح لك بناء سير عمل معقدة تربط مئات التطبيقات مع AI. يمكن استضافتها ذاتياً للحفاظ على الخصوصية.",
    overviewEn: "n8n is an open-source automation platform that lets you build complex workflows connecting hundreds of apps with AI. It can be self-hosted for privacy.",
    howToStartAr: ["تثبيت npm install -g n8n", "تشغيل n8n في المحطة الطرفية", "فتح localhost:5678 وبدء بناء أول سير عمل"],
    howToStartEn: ["Install npm install -g n8n", "Run n8n in terminal", "Open localhost:5678 and start building first workflow"],
    pros: ["مفتوح المصدر ومجاني للاستضافة الذاتية", "أكثر من 400 تكامل", "مرن جداً", "دعم AI Agents"],
    limitations: ["يحتاج خبرة تقنية", "الاستضافة السحابية مدفوعة", "المستندات أقل شمولاً من Zapier"],
    alternatives: ["Make", "Zapier", "Activepieces"],
    relatedPrompts: ["automation-workflow"],
    relatedCourses: ["ai-automation"],
    recommendedPath: "ai-developer",
  },
  { id: "make",            name: "Make",              category: "AI Automation",    shortDescriptionAr: "منصة أتمتة بصرية سهلة الاستخدام",                  shortDescriptionEn: "Visual automation platform easy to use",           useCases: ["No-code","Workflows","Integration"],       level: "beginner",     pricingType: "freemium",    bestFor: "No-code users",  tags: ["make","nocode"],    featured: false },
  { id: "zapier",          name: "Zapier",            category: "AI Automation",    shortDescriptionAr: "منصة الأتمتة الأكثر شعبية مع آلاف التكاملات",       shortDescriptionEn: "Most popular automation platform with thousands of integrations", useCases: ["No-code","Automation","SaaS"],level: "beginner",     pricingType: "freemium",    bestFor: "Business automation",tags: ["zapier","saas"],  featured: false },
  // Local LLMs
  { id: "ollama",          name: "Ollama",            category: "Local LLMs",       shortDescriptionAr: "تشغيل نماذج LLM محليًا بأمر واحد",                  shortDescriptionEn: "Run LLM models locally with one command",          useCases: ["Local AI","Privacy","Offline"],            level: "intermediate", pricingType: "open-source", bestFor: "Local AI",       tags: ["ollama","local"],   featured: true  },
  { id: "lm-studio",       name: "LM Studio",         category: "Local LLMs",       shortDescriptionAr: "واجهة رسومية لتشغيل وإدارة النماذج المحلية",          shortDescriptionEn: "GUI for running and managing local models",         useCases: ["Local AI","GUI","Model Management"],       level: "beginner",     pricingType: "free",        bestFor: "GUI users",      tags: ["lmstudio","gui"],   featured: true  },
  { id: "open-webui",      name: "Open WebUI",        category: "Local LLMs",       shortDescriptionAr: "واجهة ويب مفتوحة لـ Ollama والنماذج المحلية",         shortDescriptionEn: "Open web interface for Ollama and local models",    useCases: ["UI","Local AI","Ollama"],                  level: "beginner",     pricingType: "open-source", bestFor: "Web interface",  tags: ["openwebui","ui"],   featured: false },
  // Data Analysis
  { id: "jupyter",         name: "Jupyter Notebooks", category: "Data Analysis",    shortDescriptionAr: "بيئة تطوير تفاعلية للبيانات والـ ML",                shortDescriptionEn: "Interactive development environment for data and ML",useCases: ["Data Science","ML","Research"],            level: "beginner",     pricingType: "open-source", bestFor: "Data science",   tags: ["jupyter","python"], featured: false },
  { id: "colab",           name: "Google Colab",      category: "Data Analysis",    shortDescriptionAr: "Jupyter مجاني في السحاب مع GPU من Google",            shortDescriptionEn: "Free Jupyter in the cloud with Google GPU",         useCases: ["Free GPU","ML","Training"],                level: "beginner",     pricingType: "free",        bestFor: "Free GPU",       tags: ["colab","google"],   featured: true  },
  // AI Search
  { id: "notebooklm",      name: "NotebookLM",        category: "AI Search",        shortDescriptionAr: "مساعد بحث AI من Google مع مصادرك الخاصة",            shortDescriptionEn: "Google's AI research assistant with your own sources",useCases: ["Research","Podcasts","Analysis"],          level: "beginner",     pricingType: "free",        bestFor: "Research",       tags: ["google","research"],featured: true  },
  // Design AI
  { id: "v0",              name: "v0 by Vercel",      category: "Design AI",        shortDescriptionAr: "توليد واجهات مستخدم React من وصف نصي",              shortDescriptionEn: "Generate React UIs from text description",          useCases: ["UI Generation","React","Prototyping"],     level: "beginner",     pricingType: "freemium",    bestFor: "UI generation",  tags: ["v0","ui","react"],  featured: true  },
  { id: "figma-ai",        name: "Figma AI",          category: "Design AI",        shortDescriptionAr: "ميزات AI مدمجة في Figma للتصميم الأسرع",              shortDescriptionEn: "Built-in AI features in Figma for faster design",   useCases: ["Design","Prototyping","Collaboration"],    level: "beginner",     pricingType: "freemium",    bestFor: "Designers",      tags: ["figma","design"],   featured: false },
  { id: "canva-ai",        name: "Canva AI",          category: "Design AI",        shortDescriptionAr: "تصميم بالذكاء الاصطناعي للجميع",                    shortDescriptionEn: "AI-powered design for everyone",                   useCases: ["Design","Social","Marketing"],             level: "beginner",     pricingType: "freemium",    bestFor: "Non-designers",  tags: ["canva","design"],   featured: false },
  // Voice & Audio
  { id: "elevenlabs",      name: "ElevenLabs",        category: "Voice & Audio",    shortDescriptionAr: "توليد صوت AI واقعي بأصوات متعددة",                  shortDescriptionEn: "Realistic AI voice generation with multiple voices", useCases: ["TTS","Cloning","Content"],                 level: "beginner",     pricingType: "freemium",    bestFor: "Voice content",  tags: ["tts","voice"],      featured: true  },
  { id: "whisper",         name: "OpenAI Whisper",    category: "Voice & Audio",    shortDescriptionAr: "تحويل الكلام إلى نص مفتوح المصدر من OpenAI",          shortDescriptionEn: "Open-source speech-to-text from OpenAI",           useCases: ["Transcription","Translation","STT"],       level: "intermediate", pricingType: "open-source", bestFor: "Transcription",  tags: ["whisper","stt"],    featured: false },
  // Cloud AI
  { id: "aws-bedrock",     name: "AWS Bedrock",       category: "Cloud AI",         shortDescriptionAr: "خدمة نماذج AI مُدارة من Amazon Web Services",          shortDescriptionEn: "Managed AI model service from Amazon Web Services", useCases: ["LLMs","AWS","Enterprise"],                 level: "advanced",     pricingType: "paid",        bestFor: "AWS users",      tags: ["aws","bedrock"],    featured: true  },
  { id: "vertex-ai",       name: "Google Vertex AI",  category: "Cloud AI",         shortDescriptionAr: "منصة ML وAI المُدارة من Google Cloud",                shortDescriptionEn: "Managed ML and AI platform from Google Cloud",      useCases: ["MLOps","Training","Serving"],              level: "advanced",     pricingType: "paid",        bestFor: "GCP users",      tags: ["vertex","google"],  featured: false },
  { id: "azure-openai",    name: "Azure OpenAI",      category: "Cloud AI",         shortDescriptionAr: "نماذج OpenAI على البنية التحتية لـ Azure",             shortDescriptionEn: "OpenAI models on Azure infrastructure",            useCases: ["Enterprise","Compliance","Integration"],   level: "advanced",     pricingType: "paid",        bestFor: "Enterprise",     tags: ["azure","openai"],   featured: false },
  // Deployment
  { id: "vercel",          name: "Vercel",            category: "Deployment",       shortDescriptionAr: "أسهل منصة نشر لتطبيقات Next.js وFrontend",            shortDescriptionEn: "Easiest deployment platform for Next.js and Frontend",useCases: ["Deployment","Frontend","CI/CD"],           level: "beginner",     pricingType: "freemium",    bestFor: "Frontend apps",  tags: ["vercel","deploy"],  featured: true  },
  { id: "cloudflare",      name: "Cloudflare Pages",  category: "Deployment",       shortDescriptionAr: "نشر مواقع ثابتة وعمال الحافة من Cloudflare",          shortDescriptionEn: "Static sites and edge workers deployment from Cloudflare",useCases: ["Static","Edge","CDN"],                level: "beginner",     pricingType: "freemium",    bestFor: "Static sites",   tags: ["cloudflare","cdn"], featured: false },
  { id: "supabase",        name: "Supabase",          category: "Databases & Backend",shortDescriptionAr: "قاعدة بيانات Postgres مع Auth وStorage وEdge Functions",shortDescriptionEn: "Postgres DB with Auth, Storage, and Edge Functions", useCases: ["Database","Auth","Storage","API"],          level: "intermediate", pricingType: "freemium",    bestFor: "Full-stack",     tags: ["supabase","postgres"],featured: true  },
  // Frameworks
  { id: "langchain",       name: "LangChain",         category: "AI Frameworks",    shortDescriptionAr: "إطار بناء تطبيقات LLM والوكلاء الذكيين",              shortDescriptionEn: "Framework for building LLM apps and AI agents",     useCases: ["Agents","RAG","Chains","Tools"],           level: "intermediate", pricingType: "open-source", bestFor: "LLM apps",       tags: ["langchain","llm"],  featured: true  },
  { id: "llamaindex",      name: "LlamaIndex",        category: "AI Frameworks",    shortDescriptionAr: "إطار بناء محركات RAG وبحث البيانات",                  shortDescriptionEn: "Framework for building RAG and data search engines", useCases: ["RAG","Search","Indexing"],                 level: "intermediate", pricingType: "open-source", bestFor: "RAG systems",    tags: ["llamaindex","rag"],  featured: false },
  // Vector DBs
  { id: "chroma",          name: "Chroma",            category: "Vector Databases", shortDescriptionAr: "قاعدة بيانات متجهية مفتوحة المصدر خفيفة للبدء",       shortDescriptionEn: "Lightweight open-source vector database to get started",useCases: ["RAG","Embeddings","Local"],               level: "intermediate", pricingType: "open-source", bestFor: "Getting started", tags: ["chroma","vector"],  featured: false },
  { id: "pinecone",        name: "Pinecone",          category: "Vector Databases", shortDescriptionAr: "قاعدة بيانات متجهية سحابية عالية الأداء",              shortDescriptionEn: "High-performance cloud vector database",            useCases: ["Production","RAG","Scale"],                level: "advanced",     pricingType: "freemium",    bestFor: "Production RAG", tags: ["pinecone","cloud"],  featured: true  },
  // Productivity
  { id: "notion-ai",       name: "Notion AI",         category: "Productivity AI",  shortDescriptionAr: "مساعد AI مدمج في Notion للكتابة والتلخيص",            shortDescriptionEn: "AI assistant built into Notion for writing and summaries",useCases: ["Writing","Notes","Planning"],             level: "beginner",     pricingType: "paid",        bestFor: "Knowledge workers",tags: ["notion","ai"],     featured: false },
  { id: "gamma",           name: "Gamma",             category: "Productivity AI",  shortDescriptionAr: "إنشاء عروض تقديمية احترافية بالذكاء الاصطناعي",       shortDescriptionEn: "Create professional presentations with AI",          useCases: ["Presentations","Docs","Content"],          level: "beginner",     pricingType: "freemium",    bestFor: "Presentations",  tags: ["gamma","slides"],   featured: false },
];

export const toolCategories = [...new Set(tools.map((t) => t.category))];

export const toolStacks = [
  {
    id: "free-beginner",
    titleAr: "المجموعة المجانية للمبتدئين",
    titleEn: "Free Beginner Stack",
    icon: "🆓",
    tools: ["claude", "colab", "ollama", "chroma", "vercel"],
    descriptionAr: "كل ما تحتاجه للبدء مجانًا تمامًا",
    descriptionEn: "Everything you need to get started completely free",
  },
  {
    id: "claude-focused",
    titleAr: "مجموعة Claude المتكاملة",
    titleEn: "Claude-Focused Stack",
    icon: "🤖",
    tools: ["claude", "claude-code", "mcp-servers", "claude-api", "claude-projects"],
    descriptionAr: "أقصى استفادة من منظومة Claude",
    descriptionEn: "Maximum leverage from the Claude ecosystem",
  },
  {
    id: "ai-developer",
    titleAr: "مجموعة مطور AI",
    titleEn: "AI Developer Stack",
    icon: "💻",
    tools: ["cursor", "claude-code", "langchain", "supabase", "vercel"],
    descriptionAr: "للمطورين الذين يبنون تطبيقات AI حقيقية",
    descriptionEn: "For developers building real AI applications",
  },
  {
    id: "cloud-ai",
    titleAr: "مجموعة AI السحابي",
    titleEn: "Cloud AI Stack",
    icon: "☁️",
    tools: ["aws-bedrock", "vertex-ai", "langchain", "pinecone", "supabase"],
    descriptionAr: "بناء ونشر AI على مستوى المؤسسات",
    descriptionEn: "Build and deploy AI at enterprise scale",
  },
  {
    id: "automation",
    titleAr: "مجموعة الأتمتة",
    titleEn: "Automation Stack",
    icon: "⚡",
    tools: ["n8n", "claude", "make", "supabase", "vercel"],
    descriptionAr: "أتمتة كل شيء بقوة AI",
    descriptionEn: "Automate everything with AI power",
  },
  {
    id: "local-private",
    titleAr: "مجموعة AI الخاصة المحلية",
    titleEn: "Local Private AI Stack",
    icon: "🔒",
    tools: ["ollama", "lm-studio", "open-webui", "chroma", "langchain"],
    descriptionAr: "ذكاء اصطناعي خاص ومحلي بدون إنترنت",
    descriptionEn: "Private local AI with no internet required",
  },
];
