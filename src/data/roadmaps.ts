export interface RoadmapNode {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  duration: string;
  skills: string[];
  status: "completed" | "active" | "upcoming";
  courseId?: string;
}

export interface Roadmap {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  level: "beginner" | "intermediate" | "advanced";
  totalWeeks: number;
  outcome: string;
  outcomeAr: string;
  icon: string;
  color: string;
  nodes: RoadmapNode[];
}

export const roadmaps: Roadmap[] = [
  {
    id: "beginner-ai",
    titleAr: "مسار المبتدئ في الذكاء الاصطناعي",
    titleEn: "Beginner AI Path",
    descriptionAr: "ابدأ من الصفر وأصبح متمكنًا من أساسيات الذكاء الاصطناعي",
    descriptionEn: "Start from zero and become proficient in AI fundamentals",
    level: "beginner",
    totalWeeks: 12,
    outcome: "Build your first ML model and deploy it",
    outcomeAr: "بناء أول نموذج ML ونشره",
    icon: "🚀",
    color: "blue",
    nodes: [
      { id: "b1", titleAr: "أساسيات Python", titleEn: "Python Basics", descriptionAr: "تعلم Python من الصفر", descriptionEn: "Learn Python from scratch", duration: "2 weeks", skills: ["Python","Variables","Functions","OOP"], status: "active", courseId: "python-for-ai" },
      { id: "b2", titleAr: "أساسيات الذكاء الاصطناعي", titleEn: "AI Fundamentals", descriptionAr: "مفاهيم AI وتاريخها وتطبيقاتها", descriptionEn: "AI concepts, history and applications", duration: "2 weeks", skills: ["AI Concepts","ML Types","Tools"], status: "upcoming", courseId: "ai-foundations" },
      { id: "b3", titleAr: "مقدمة في التعلم الآلي", titleEn: "Intro to ML", descriptionAr: "الخوارزميات الأساسية والبيانات", descriptionEn: "Core algorithms and data handling", duration: "3 weeks", skills: ["Scikit-Learn","Data Prep","Evaluation"], status: "upcoming", courseId: "machine-learning" },
      { id: "b4", titleAr: "هندسة المطالبات", titleEn: "Prompt Engineering", descriptionAr: "إتقان التواصل مع نماذج AI", descriptionEn: "Master AI model communication", duration: "2 weeks", skills: ["Prompting","Claude","ChatGPT"], status: "upcoming", courseId: "prompt-engineering" },
      { id: "b5", titleAr: "مشروعك الأول", titleEn: "Your First Project", descriptionAr: "بناء ونشر مشروع AI حقيقي", descriptionEn: "Build and deploy a real AI project", duration: "3 weeks", skills: ["Full Project","Deployment","Portfolio"], status: "upcoming" },
    ],
  },
  {
    id: "ai-developer",
    titleAr: "مسار مطور الذكاء الاصطناعي",
    titleEn: "AI Developer Path",
    descriptionAr: "من المبرمج إلى مطور تطبيقات AI احترافي",
    descriptionEn: "From programmer to professional AI app developer",
    level: "intermediate",
    totalWeeks: 20,
    outcome: "Build and deploy full AI-powered applications",
    outcomeAr: "بناء ونشر تطبيقات مدعومة بالذكاء الاصطناعي",
    icon: "💻",
    color: "violet",
    nodes: [
      { id: "d1", titleAr: "Python للذكاء الاصطناعي", titleEn: "Python for AI", descriptionAr: "NumPy وPandas وMl Basics", descriptionEn: "NumPy, Pandas and ML Basics", duration: "3 weeks", skills: ["Python","NumPy","Pandas","Matplotlib"], status: "active", courseId: "python-for-ai" },
      { id: "d2", titleAr: "تعلم الآلة المتقدم", titleEn: "Advanced ML", descriptionAr: "خوارزميات متقدمة وتحسين النماذج", descriptionEn: "Advanced algorithms and model optimization", duration: "4 weeks", skills: ["XGBoost","Feature Eng","Tuning"], status: "upcoming", courseId: "machine-learning" },
      { id: "d3", titleAr: "الذكاء الاصطناعي التوليدي وRAG", titleEn: "Generative AI & RAG", descriptionAr: "LLMs وRAG وتطبيقاتها", descriptionEn: "LLMs, RAG and their applications", duration: "4 weeks", skills: ["LangChain","RAG","Embeddings","Vector DB"], status: "upcoming", courseId: "generative-ai" },
      { id: "d4", titleAr: "Claude API وتطوير التطبيقات", titleEn: "Claude API & App Dev", descriptionAr: "بناء تطبيقات AI كاملة", descriptionEn: "Build full AI applications", duration: "4 weeks", skills: ["Claude API","Next.js","Supabase"], status: "upcoming", courseId: "claude-mastery" },
      { id: "d5", titleAr: "النشر على السحاب", titleEn: "Cloud Deployment", descriptionAr: "نشر وتشغيل تطبيقات AI", descriptionEn: "Deploy and run AI applications", duration: "3 weeks", skills: ["Docker","Vercel","AWS","Monitoring"], status: "upcoming", courseId: "cloud-foundations" },
      { id: "d6", titleAr: "مشروع نهائي متكامل", titleEn: "Capstone Project", descriptionAr: "بناء تطبيق AI كامل للمحفظة", descriptionEn: "Build a complete AI app for portfolio", duration: "2 weeks", skills: ["Full Stack","AI","Cloud","Portfolio"], status: "upcoming" },
    ],
  },
  {
    id: "claude-power-user",
    titleAr: "مسار مستخدم Claude المتقدم",
    titleEn: "Claude Power User Path",
    descriptionAr: "إتقان كل جانب من جوانب Claude وبناء سير عمل متقدمة",
    descriptionEn: "Master every aspect of Claude and build advanced workflows",
    level: "intermediate",
    totalWeeks: 8,
    outcome: "Build complete AI-powered products with Claude",
    outcomeAr: "بناء منتجات AI كاملة بـ Claude",
    icon: "🤖",
    color: "cyan",
    nodes: [
      { id: "c1", titleAr: "أساسيات Claude", titleEn: "Claude Basics", descriptionAr: "واجهة Claude وخصائصه الأساسية", descriptionEn: "Claude interface and core features", duration: "1 week", skills: ["Claude.ai","Prompting","Projects"], status: "active" },
      { id: "c2", titleAr: "هندسة المطالبات المتقدمة", titleEn: "Advanced Prompting", descriptionAr: "تقنيات المطالبة المتقدمة والإطار الاحترافي", descriptionEn: "Advanced prompting techniques and professional framework", duration: "2 weeks", skills: ["Chain-of-Thought","Few-Shot","System Prompts"], status: "upcoming" },
      { id: "c3", titleAr: "Claude Code", titleEn: "Claude Code", descriptionAr: "استخدام Claude Code لتطوير البرمجيات", descriptionEn: "Using Claude Code for software development", duration: "2 weeks", skills: ["Claude Code","CLI","Coding Workflows"], status: "upcoming" },
      { id: "c4", titleAr: "MCP وتوسيع القدرات", titleEn: "MCP & Extensions", descriptionAr: "بروتوكول Context النموذج وتوسيع Claude", descriptionEn: "Model Context Protocol and extending Claude", duration: "2 weeks", skills: ["MCP","Tools","Integrations"], status: "upcoming" },
      { id: "c5", titleAr: "بناء منتج بـ Claude", titleEn: "Build a Product with Claude", descriptionAr: "بناء منتج كامل من الفكرة للنشر", descriptionEn: "Build a complete product from idea to deployment", duration: "1 week", skills: ["Product","API","Deployment"], status: "upcoming" },
    ],
  },
  {
    id: "cloud-engineer",
    titleAr: "مسار مهندس كلاود الذكاء الاصطناعي",
    titleEn: "AI Cloud Engineer Path",
    descriptionAr: "من التطوير المحلي إلى البنية التحتية السحابية للذكاء الاصطناعي",
    descriptionEn: "From local development to AI cloud infrastructure",
    level: "advanced",
    totalWeeks: 24,
    outcome: "Design and deploy enterprise AI cloud architectures",
    outcomeAr: "تصميم ونشر بنى تحتية سحابية للذكاء الاصطناعي على مستوى المؤسسات",
    icon: "☁️",
    color: "green",
    nodes: [
      { id: "e1", titleAr: "Linux وDocker", titleEn: "Linux & Docker", descriptionAr: "أساسيات Linux والحاويات", descriptionEn: "Linux fundamentals and containers", duration: "4 weeks", skills: ["Linux","Docker","Bash","Networking"], status: "active", courseId: "docker-linux" },
      { id: "e2", titleAr: "أساسيات الكلاود", titleEn: "Cloud Foundations", descriptionAr: "مفاهيم الكلاود الأساسية عبر المزودين", descriptionEn: "Core cloud concepts across providers", duration: "3 weeks", skills: ["IaaS","PaaS","SaaS","Networking"], status: "upcoming", courseId: "cloud-foundations" },
      { id: "e3", titleAr: "AWS للذكاء الاصطناعي", titleEn: "AWS for AI", descriptionAr: "Bedrock وSageMaker ونشر النماذج", descriptionEn: "Bedrock, SageMaker, and model deployment", duration: "5 weeks", skills: ["AWS","Bedrock","SageMaker","Lambda"], status: "upcoming", courseId: "aws-for-ai" },
      { id: "e4", titleAr: "MLOps والنشر المستمر", titleEn: "MLOps & CI/CD", descriptionAr: "إدارة دورة حياة النماذج في الإنتاج", descriptionEn: "Managing model lifecycle in production", duration: "5 weeks", skills: ["MLflow","DVC","CI/CD","Monitoring"], status: "upcoming", courseId: "mlops" },
      { id: "e5", titleAr: "أمن الكلاود", titleEn: "Cloud Security", descriptionAr: "حماية بنية AI السحابية", descriptionEn: "Securing AI cloud infrastructure", duration: "4 weeks", skills: ["IAM","Secrets","Compliance","Zero Trust"], status: "upcoming", courseId: "cloud-security" },
      { id: "e6", titleAr: "مشروع بنية AI سحابية", titleEn: "Cloud AI Architecture Project", descriptionAr: "تصميم ونشر بنية كاملة", descriptionEn: "Design and deploy a complete architecture", duration: "3 weeks", skills: ["Architecture","Multi-cloud","Cost","Scale"], status: "upcoming" },
    ],
  },
  {
    id: "ai-business",
    titleAr: "مسار الأعمال بالذكاء الاصطناعي",
    titleEn: "AI Business Path",
    descriptionAr: "استخدام AI لتحويل الأعمال وزيادة الإنتاجية",
    descriptionEn: "Using AI to transform business and boost productivity",
    level: "beginner",
    totalWeeks: 8,
    outcome: "Implement AI across your business workflows",
    outcomeAr: "تطبيق AI في جميع سير عمل أعمالك",
    icon: "💼",
    color: "violet",
    nodes: [
      { id: "ab1", titleAr: "أدوات AI للأعمال", titleEn: "AI Business Tools", descriptionAr: "أفضل أدوات AI لزيادة الإنتاجية", descriptionEn: "Best AI tools for productivity boost", duration: "2 weeks", skills: ["ChatGPT","Claude","Notion AI","Gamma"], status: "active" },
      { id: "ab2", titleAr: "أتمتة الأعمال", titleEn: "Business Automation", descriptionAr: "أتمتة المهام المتكررة بـ Make وZapier", descriptionEn: "Automate repetitive tasks with Make and Zapier", duration: "2 weeks", skills: ["Make","Zapier","Workflows"], status: "upcoming" },
      { id: "ab3", titleAr: "Claude للأعمال", titleEn: "Claude for Business", descriptionAr: "استخدام Claude في المهام التجارية", descriptionEn: "Using Claude for business tasks", duration: "2 weeks", skills: ["Claude","Business Prompting","Analysis"], status: "upcoming" },
      { id: "ab4", titleAr: "استراتيجية AI للأعمال", titleEn: "AI Business Strategy", descriptionAr: "بناء استراتيجية AI للمؤسسة", descriptionEn: "Building an AI strategy for your organization", duration: "2 weeks", skills: ["Strategy","ROI","Implementation","Ethics"], status: "upcoming" },
    ],
  },
  {
    id: "mlops",
    titleAr: "مسار MLOps",
    titleEn: "MLOps Path",
    descriptionAr: "نشر وإدارة ومراقبة نماذج ML في بيئات الإنتاج",
    descriptionEn: "Deploy, manage, and monitor ML models in production",
    level: "advanced",
    totalWeeks: 16,
    outcome: "Run production ML systems with full MLOps pipelines",
    outcomeAr: "تشغيل أنظمة ML للإنتاج مع خطوط MLOps كاملة",
    icon: "🔄",
    color: "green",
    nodes: [
      { id: "m1", titleAr: "أساسيات MLOps", titleEn: "MLOps Foundations", descriptionAr: "ما هو MLOps ولماذا نحتاجه", descriptionEn: "What is MLOps and why we need it", duration: "2 weeks", skills: ["MLOps Concepts","CI/CD for ML","Tools Overview"], status: "active" },
      { id: "m2", titleAr: "إدارة البيانات والتجارب", titleEn: "Data & Experiment Management", descriptionAr: "DVC وMLflow لتتبع النماذج", descriptionEn: "DVC and MLflow for model tracking", duration: "3 weeks", skills: ["MLflow","DVC","Experiment Tracking"], status: "upcoming" },
      { id: "m3", titleAr: "نشر النماذج", titleEn: "Model Deployment", descriptionAr: "نشر نماذج ML كـ APIs", descriptionEn: "Deploying ML models as APIs", duration: "3 weeks", skills: ["FastAPI","Docker","Kubernetes","BentoML"], status: "upcoming" },
      { id: "m4", titleAr: "مراقبة وصيانة النماذج", titleEn: "Monitoring & Maintenance", descriptionAr: "مراقبة الأداء وانجراف البيانات", descriptionEn: "Performance monitoring and data drift", duration: "3 weeks", skills: ["Grafana","Prometheus","Drift Detection"], status: "upcoming" },
      { id: "m5", titleAr: "CI/CD لـ ML", titleEn: "CI/CD for ML", descriptionAr: "أنابيب تكامل ونشر مستمرة للنماذج", descriptionEn: "Continuous integration and deployment pipelines for models", duration: "3 weeks", skills: ["GitHub Actions","Jenkins","ArgoCD"], status: "upcoming" },
      { id: "m6", titleAr: "مشروع MLOps متكامل", titleEn: "Full MLOps Project", descriptionAr: "بناء خط MLOps من البداية للنهاية", descriptionEn: "Build a full MLOps pipeline end-to-end", duration: "2 weeks", skills: ["Full Pipeline","Production","Monitoring"], status: "upcoming" },
    ],
  },
];
