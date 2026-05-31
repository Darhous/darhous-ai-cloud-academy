import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Wrench, BookOpen, Briefcase, FlaskConical, Bot } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "أكاديمية درهوس للأتمتة | درهوس" : "Darhous Automation Academy | Darhous",
    description: isAr
      ? "تعلم الأتمتة التجارية، استكشف 30+ قالب جاهز، وابنِ workflows ذكية لأعمالك."
      : "Learn business automation with 30+ ready templates, tools explorer, and workflow builder.",
    robots: { index: true },
  };
}

const SECTIONS = [
  {
    href: "/automation/templates",
    icon: <Layers size={22} />,
    titleAr: "مكتبة القوالب",
    descAr: "30+ قالب أتمتة جاهز للتنفيذ: من ترحيب الطلاب إلى أتمتة المبيعات والموارد البشرية.",
    badge: "30+ قالب",
    color: "#4ade80",
  },
  {
    href: "/automation/tools",
    icon: <Wrench size={22} />,
    titleAr: "مستكشف الأدوات",
    descAr: "دليل شامل لأدوات الأتمتة: n8n, Make, Zapier, Python — متى تستخدم كل أداة وكيف.",
    badge: "15+ أداة",
    color: "#8ed5ff",
  },
  {
    href: "/automation/paths",
    icon: <BookOpen size={22} />,
    titleAr: "مسارات التعلم",
    descAr: "مسارات تعلم منظمة من المبتدئ إلى المتقدم — كل مسار بمشاريع تطبيقية وأدوات موصى بها.",
    badge: "10+ مسار",
    color: "#d0bcff",
  },
  {
    href: "/automation/services",
    icon: <Briefcase size={22} />,
    titleAr: "خدمات الأتمتة",
    descAr: "باقات خدمات احترافية: تدقيق، تصميم workflow، تنفيذ no-code أو n8n أو Python.",
    badge: "10 باقة",
    color: "#f59e0b",
  },
  {
    href: "/automation/labs",
    icon: <FlaskConical size={22} />,
    titleAr: "المعامل التطبيقية",
    descAr: "تمارين عملية لبناء automations حقيقية خطوة بخطوة مع تشخيص الأخطاء الشائعة.",
    badge: "معامل تفاعلية",
    color: "#3ce0fb",
  },
  {
    href: "/automation/automation-agent",
    icon: <Bot size={22} />,
    titleAr: "وكيل الأتمتة",
    descAr: "صف عمليتك التجارية واحصل على blueprint أتمتة مخصص مع خارطة أدوات واقتراحات تنفيذ.",
    badge: "AI",
    color: "#f97316",
  },
];

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen relative" dir="rtl">
      {/* Ambient orbs */}
      <div
        className="fixed pointer-events-none z-0"
        style={{ top: 0, right: 0, width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{ bottom: 0, left: 0, width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="container-xl py-16 relative z-10">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono mb-12 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />العودة للرئيسية
        </Link>

        {/* Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
            <Sparkles size={14} />أكاديمية متخصصة في الأتمتة
          </div>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", boxShadow: "0 0 60px rgba(74,222,128,0.15)" }}>
            ⚙️
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight" style={{ color: "var(--color-on-surface)" }}>
            أكاديمية درهوس{" "}
            <span className="bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(135deg, #4ade80, #22c55e)" }}>
              للأتمتة
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)", maxWidth: 580, margin: "0 auto" }}>
            من اكتشاف فرص الأتمتة إلى تنفيذها — قوالب جاهزة، أدوات موصى بها، ومسارات تعلم منظمة لتحويل عملياتك.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 py-6 rounded-2xl" style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}>
          {[
            { v: "30+", l: "قالب أتمتة جاهز" },
            { v: "15+", l: "أداة موثقة" },
            { v: "10+", l: "مسار تعلم" },
            { v: "10", l: "باقة خدمة احترافية" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: "#4ade80" }}>{s.v}</div>
              <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SECTIONS.map((sec) => (
            <Link
              key={sec.href}
              href={`/${locale}${sec.href}`}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:scale-[1.01]"
              style={{ border: `1px solid ${sec.color}18`, textDecoration: "none" }}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${sec.color}12`, border: `1px solid ${sec.color}22`, color: sec.color }}>
                  {sec.icon}
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${sec.color}12`, color: sec.color, border: `1px solid ${sec.color}20` }}>
                  {sec.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>{sec.titleAr}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{sec.descAr}</p>
              </div>
              <div className="w-full text-center py-2 rounded-lg text-sm font-mono font-medium mt-auto" style={{ background: `${sec.color}10`, border: `1px solid ${sec.color}25`, color: sec.color }}>
                استكشف
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center rounded-3xl p-10" style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.12)" }}>
          <h2 className="font-bold text-2xl mb-3" style={{ color: "var(--color-on-surface)" }}>ابدأ رحلتك في الأتمتة</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>استكشف القوالب الجاهزة وطبّق أول automation في عملك اليوم.</p>
          <Link href={`/${locale}/automation/templates`} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all" style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", color: "#0c0e12", boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
            <Layers size={16} />استعرض القوالب
          </Link>
        </div>
      </div>
    </div>
  );
}
