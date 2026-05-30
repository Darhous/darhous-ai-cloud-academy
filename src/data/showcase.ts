export interface ShowcaseItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  icon: string;
  href: string;
  color: "blue" | "violet" | "cyan" | "green";
}

export const showcaseItems: ShowcaseItem[] = [
  { id: "claude-mastery",   titleAr: "إتقان Claude",        titleEn: "Claude Mastery",     category: "AI",      icon: "🤖", href: "/claude",   color: "blue" },
  { id: "claude-code",      titleAr: "Claude Code",         titleEn: "Claude Code",        category: "Coding",  icon: "💻", href: "/claude",   color: "violet" },
  { id: "ai-tools-hub",     titleAr: "مركز أدوات AI",       titleEn: "AI Tools Hub",       category: "Tools",   icon: "🛠️", href: "/tools",    color: "cyan" },
  { id: "cloud-academy",    titleAr: "أكاديمية الكلاود",     titleEn: "Cloud Academy",      category: "Cloud",   icon: "☁️", href: "/cloud",    color: "blue" },
  { id: "prompt-library",   titleAr: "مكتبة المطالبات",     titleEn: "Prompt Library",     category: "AI",      icon: "📝", href: "/prompts",  color: "violet" },
  { id: "rag-projects",     titleAr: "مشاريع RAG",          titleEn: "RAG Projects",       category: "AI",      icon: "🔍", href: "/projects", color: "cyan" },
  { id: "mlops-track",      titleAr: "مسار MLOps",          titleEn: "MLOps Track",        category: "Cloud",   icon: "⚙️", href: "/paths",    color: "green" },
  { id: "python-ai",        titleAr: "Python للذكاء الاصطناعي", titleEn: "Python for AI",  category: "Coding",  icon: "🐍", href: "/courses",  color: "blue" },
  { id: "machine-learning", titleAr: "تعلم الآلة",          titleEn: "Machine Learning",   category: "AI",      icon: "🧠", href: "/courses",  color: "violet" },
  { id: "ai-automation",    titleAr: "أتمتة الذكاء الاصطناعي", titleEn: "AI Automation",  category: "Tools",   icon: "⚡", href: "/tools",    color: "cyan" },
  { id: "local-llms",       titleAr: "نماذج LLM المحلية",   titleEn: "Local LLMs",        category: "AI",      icon: "🖥️", href: "/tools",    color: "green" },
  { id: "ai-business",      titleAr: "AI للأعمال",          titleEn: "AI Business",        category: "Business",icon: "💼", href: "/courses",  color: "blue" },
  { id: "cloud-labs",       titleAr: "مختبرات الكلاود",     titleEn: "Cloud Labs",         category: "Cloud",   icon: "🔬", href: "/cloud",    color: "violet" },
  { id: "cybersecurity-ai", titleAr: "أمن المعلومات بالذكاء الاصطناعي", titleEn: "Cybersecurity AI", category: "Security", icon: "🛡️", href: "/tools", color: "cyan" },
  { id: "design-ai",        titleAr: "تصميم بالذكاء الاصطناعي", titleEn: "Design AI",     category: "Design",  icon: "🎨", href: "/tools",    color: "green" },
  { id: "research-ai",      titleAr: "البحث بالذكاء الاصطناعي", titleEn: "Research AI",   category: "Research",icon: "📚", href: "/tools",    color: "blue" },
  { id: "data-analysis",    titleAr: "تحليل البيانات",       titleEn: "Data Analysis",      category: "Data",    icon: "📊", href: "/tools",    color: "violet" },
  { id: "github-deploy",    titleAr: "نشر GitHub",           titleEn: "GitHub Deployment",  category: "DevOps",  icon: "🚀", href: "/cloud",    color: "cyan" },
  { id: "vercel-hosting",   titleAr: "استضافة Vercel",       titleEn: "Vercel Hosting",     category: "Cloud",   icon: "▲", href: "/cloud",    color: "green" },
  { id: "supabase-backend", titleAr: "Supabase Backend",     titleEn: "Supabase Backend",   category: "Database",icon: "🗄️", href: "/cloud",   color: "blue" },
  { id: "student-dashboard",   titleAr: "لوحة الطالب",          titleEn: "Student Dashboard",     category: "Platform",  icon: "📈", href: "/dashboard",            color: "violet" },
  { id: "prompt-studio",       titleAr: "استوديو البرومبتات",   titleEn: "Prompt Studio",         category: "AI Studio", icon: "⚡", href: "/prompt-studio",        color: "cyan"   },
  { id: "claude-code-gen",     titleAr: "مولّد برومبت Claude",  titleEn: "Claude Code Generator", category: "Coding",    icon: "🛠️", href: "/claude-code-generator", color: "violet" },
  { id: "tool-recommender-bar",titleAr: "مرشّح الأدوات",        titleEn: "Tool Recommender",      category: "AI Studio", icon: "🔎", href: "/tool-recommender",     color: "blue"   },
  { id: "roadmap-gen",         titleAr: "مولّد خطط التعلم",    titleEn: "Roadmap Generator",     category: "AI Studio", icon: "🗺️", href: "/roadmap-generator",    color: "green"  },
];
