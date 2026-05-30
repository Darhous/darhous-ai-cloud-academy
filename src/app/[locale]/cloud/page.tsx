import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "أكاديمية الكلاود" : "Cloud Academy",
    description: isAr
      ? "ابنِ ونشر الذكاء الاصطناعي على AWS وAzure وGoogle Cloud مع مختبرات عملية مجانية"
      : "Build and deploy AI on AWS, Azure, and Google Cloud with free hands-on labs",
    keywords: isAr
      ? ["كلاود", "AWS", "Azure", "Google Cloud", "docker", "MLOps", "Kubernetes"]
      : ["cloud academy", "AWS AI", "Azure AI", "Google Cloud", "MLOps", "docker"],
  };
}

export default async function CloudPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const sections = isAr
    ? [
        { icon: "🐧", title: "Linux للكلاود", desc: "أوامر Linux الأساسية وإدارة الخوادم" },
        { icon: "🐳", title: "Docker والحاويات", desc: "بناء ونشر التطبيقات في حاويات" },
        { icon: "🟠", title: "AWS للذكاء الاصطناعي", desc: "Bedrock وSageMaker وLambda" },
        { icon: "🔵", title: "Azure للذكاء الاصطناعي", desc: "Azure AI وOpenAI Service" },
        { icon: "🌐", title: "Google Cloud للذكاء الاصطناعي", desc: "Vertex AI وGemini APIs" },
        { icon: "🔴", title: "مختبرات Oracle Cloud", desc: "نشر AI مجانًا على Oracle Cloud" },
        { icon: "🗄️", title: "قواعد بيانات السحاب", desc: "Supabase وNeon وPlanetScale" },
        { icon: "🛡️", title: "أمن السحاب", desc: "IAM وSecrets وZero Trust" },
        { icon: "🔄", title: "MLOps على السحاب", desc: "خطوط تدريب ونشر النماذج" },
      ]
    : [
        { icon: "🐧", title: "Linux for Cloud", desc: "Essential Linux commands and server management" },
        { icon: "🐳", title: "Docker & Containers", desc: "Build and deploy apps in containers" },
        { icon: "🟠", title: "AWS for AI", desc: "Bedrock, SageMaker, and Lambda" },
        { icon: "🔵", title: "Azure for AI", desc: "Azure AI and OpenAI Service" },
        { icon: "🌐", title: "Google Cloud for AI", desc: "Vertex AI and Gemini APIs" },
        { icon: "🔴", title: "Oracle Cloud Labs", desc: "Deploy AI for free on Oracle Cloud" },
        { icon: "🗄️", title: "Cloud Databases", desc: "Supabase, Neon, and PlanetScale" },
        { icon: "🛡️", title: "Cloud Security", desc: "IAM, Secrets, and Zero Trust" },
        { icon: "🔄", title: "MLOps on Cloud", desc: "Model training and deployment pipelines" },
      ];

  const labs = isAr
    ? [
        "نشر موقع ثابت", "نشر FastAPI AI API", "نشر واجهة Chatbot",
        "تخزين الملفات في Object Storage", "تشغيل تطبيق Docker",
        "إنشاء قاعدة بيانات", "نشر AI Model API", "مراقبة الاستخدام",
        "حماية مفاتيح API", "بناء مراقب تكاليف السحاب",
        "نشر RAG Backend", "نشر Webhook Automation",
      ]
    : [
        "Deploy static website", "Deploy FastAPI AI API", "Deploy chatbot frontend",
        "Store files in cloud object storage", "Run Docker app",
        "Create database", "Deploy AI model API", "Monitor usage",
        "Protect API keys", "Build cloud cost monitor",
        "Deploy RAG backend", "Deploy webhook automation",
      ];

  const providers = [
    { name: "AWS", icon: "🟠", color: "var(--color-primary)", desc: isAr ? "الأوسع انتشارًا" : "Most popular" },
    { name: "Azure", icon: "🔵", color: "#60a5fa", desc: isAr ? "مثالي للمؤسسات" : "Best for enterprise" },
    { name: "GCP", icon: "🌐", color: "var(--color-tertiary)", desc: isAr ? "قوي في AI" : "Strongest in AI" },
    { name: "Oracle", icon: "🔴", color: "#f87171", desc: isAr ? "مجاني ومتاح" : "Free tier" },
    { name: "Vercel", icon: "▲", color: "var(--color-on-surface)", desc: isAr ? "لـ Frontend" : "For Frontend" },
    { name: "Supabase", icon: "🗄️", color: "#4ade80", desc: isAr ? "قاعدة بيانات" : "Database" },
  ];

  return (
    <div className="container-xl py-16 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "أكاديمية الكلاود" : "Cloud Academy"}
          title={isAr ? "أكاديمية الكلاود — مركز البنية التحتية" : "Cloud Academy — Infrastructure Command Center"}
          subtitle={isAr
            ? "ابنِ ونشر وتوسع في الذكاء الاصطناعي على أفضل منصات السحاب في العالم"
            : "Build, deploy, and scale AI on the world's top cloud platforms"}
        />
      </div>

      {/* Cloud providers status */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "var(--color-surface-container)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-tertiary)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--color-tertiary)" }}>
            {isAr ? "لوحة تحكم الكلاود — متصل" : "Cloud Dashboard — Connected"}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {providers.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
              style={{ background: "var(--color-surface-container-high)" }}
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="font-display font-bold text-sm" style={{ color: p.color }}>{p.name}</span>
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{p.desc}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                <span className="text-xs font-mono" style={{ color: "#4ade80" }}>LIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course sections grid */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
          📚 {isAr ? "محتوى الأكاديمية" : "Academy Content"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <div
              key={s.title}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>{s.title}</h3>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Labs */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-6" style={{ color: "var(--color-on-surface)" }}>
          🔬 {isAr ? "مختبرات الكلاود العملية" : "Cloud Labs"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {labs.map((lab, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 flex items-center gap-3 glow-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(142,213,255,0.1)" }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--color-primary)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{lab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
