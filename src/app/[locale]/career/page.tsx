import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Briefcase, MessageSquare, LayoutTemplate, TrendingUp, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "بوابة درهوس المهنية | درهوس" : "Darhous Career Hub | Darhous",
    description: isAr
      ? "حلل سيرتك الذاتية بالذكاء الاصطناعي، اكتشف فجوات مهاراتك، وتحضّر للمقابلات بثقة."
      : "AI-powered CV analysis, ATS scoring, job matching and interview preparation.",
    robots: { index: true },
  };
}

const FEATURES = [
  {
    href: "/career/cv-analyzer",
    icon: <TrendingUp size={22} />,
    titleAr: "محلل ATS الذكي",
    titleEn: "AI ATS Analyzer",
    descAr: "ارفع سيرتك الذاتية واحصل على تحليل شامل بالذكاء الاصطناعي: درجة ATS، الكلمات المفتاحية الناقصة، ونقاط القوة والضعف.",
    descEn: "Upload your CV and get a comprehensive AI analysis: ATS score, missing keywords, and strengths/weaknesses.",
    badge: "AI",
    color: "#f59e0b",
  },
  {
    href: "/career/builder",
    icon: <LayoutTemplate size={22} />,
    titleAr: "صانع السيرة الذاتية",
    titleEn: "CV Builder",
    descAr: "بنِ سيرة ذاتية احترافية متوافقة مع أنظمة ATS خطوة بخطوة مع معاينة حية.",
    descEn: "Build a professional, ATS-friendly CV step-by-step with live preview.",
    badge: "جديد",
    color: "#d0bcff",
  },
  {
    href: "/career/jobs",
    icon: <Briefcase size={22} />,
    titleAr: "بوابة الوظائف",
    titleEn: "Jobs Portal",
    descAr: "استعرض الوظائف المطابقة لملفك المهني مع نسبة التطابق والمهارات الناقصة لكل فرصة.",
    descEn: "Browse jobs matched to your profile with match score and skill gaps per opportunity.",
    badge: "ذكي",
    color: "#8ed5ff",
  },
  {
    href: "/career/interview",
    icon: <MessageSquare size={22} />,
    titleAr: "تحضير المقابلات",
    titleEn: "Interview Prep",
    descAr: "بنك أسئلة سلوكية وتقنية مع مقيّم STAR الذكي لتحسين إجاباتك قبل المقابلة.",
    descEn: "Behavioral and technical question bank with AI STAR evaluator to polish your answers.",
    badge: "AI",
    color: "#4ade80",
  },
  {
    href: "/career/templates",
    icon: <FileText size={22} />,
    titleAr: "قوالب السيرة الذاتية",
    titleEn: "CV Templates",
    descAr: "3 قوالب احترافية جاهزة للتحميل: Modern ATS، Classic، وCreative — مصممة للسوق العربي.",
    descEn: "3 professional ready-to-download templates: Modern ATS, Classic, and Creative.",
    badge: "مجاني",
    color: "#3ce0fb",
  },
];

export default async function CareerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen relative" dir="rtl">
      {/* Ambient orbs */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: 0,
          right: 0,
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{
          bottom: 0,
          left: 0,
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-xl py-16 relative z-10">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-12 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />
          العودة للرئيسية
        </Link>

        {/* Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" }}
          >
            <Sparkles size={14} />
            مدعومة بالذكاء الاصطناعي
          </div>

          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", boxShadow: "0 0 60px rgba(245,158,11,0.15)" }}
          >
            💼
          </div>

          <h1
            className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            بوابة درهوس{" "}
            <span
              className="bg-clip-text"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              }}
            >
              المهنية
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-on-surface-variant)", maxWidth: 560, margin: "0 auto" }}
          >
            من سيرتك الذاتية إلى وظيفتك القادمة — أدوات ذكية تحلل، تطابق، وتحضّرك للنجاح المهني.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 py-6 rounded-2xl" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}>
          {[
            { value: "AI", label: "تحليل سيرة ذاتية ذكي" },
            { value: "5", label: "أدوات مهنية متكاملة" },
            { value: "100%", label: "مجاني للاستخدام" },
            { value: "عربي", label: "أول بالكامل" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: "#f59e0b" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {FEATURES.map((feat) => (
            <Link
              key={feat.href}
              href={`/${locale}${feat.href}`}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:scale-[1.01]"
              style={{ border: `1px solid ${feat.color}18`, textDecoration: "none" }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}22`, color: feat.color }}
                >
                  {feat.icon}
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${feat.color}12`, color: feat.color, border: `1px solid ${feat.color}20` }}
                >
                  {feat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? feat.titleAr : feat.titleEn}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? feat.descAr : feat.descEn}
                </p>
              </div>

              <div
                className="w-full text-center py-2 rounded-lg text-sm font-mono font-medium mt-auto transition-all"
                style={{ background: `${feat.color}10`, border: `1px solid ${feat.color}25`, color: feat.color }}
              >
                دخول <Arrow size={13} className="inline ms-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center rounded-3xl p-10 relative overflow-hidden"
          style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)" }}
        >
          <h2 className="font-bold text-2xl mb-3" style={{ color: "var(--color-on-surface)" }}>
            ابدأ برحلتك المهنية الآن
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
            حلّل سيرتك الذاتية مجاناً واكتشف كيف يمكن للذكاء الاصطناعي أن يرفع فرصك.
          </p>
          <Link
            href={`/${locale}/career/cv-analyzer`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", color: "#0c0e12", boxShadow: "0 0 30px rgba(245,158,11,0.3)" }}
          >
            <TrendingUp size={16} />
            ابدأ التحليل مجاناً
          </Link>
        </div>
      </div>
    </div>
  );
}
