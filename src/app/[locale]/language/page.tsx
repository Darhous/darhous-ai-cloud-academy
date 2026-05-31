import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ExternalLink, GitBranch, CheckCircle } from "lucide-react";
import CommunitySignup from "@/components/community/CommunitySignup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "بوابة اللغة | درهوس" : "Language Portal | Darhous",
    description: isAr
      ? "اختبارات تحديد مستوى اللغة الإنجليزية وتقييم المهارات"
      : "English language level assessment and skills evaluation",
  };
}

const assessmentFeatures = {
  ar: [
    { icon: "📊", title: "اختبار تحديد المستوى", desc: "قيّم مستواك الحالي في اللغة الإنجليزية بدقة وموضوعية" },
    { icon: "🎯", title: "تقييم المهارات", desc: "قياس مهارات القراءة والكتابة والاستماع والتحدث" },
    { icon: "📈", title: "مسارات مخصصة", desc: "توصيات ذكية بمسار التعلم المناسب لمستواك" },
    { icon: "📋", title: "نتائج فورية", desc: "احصل على تقريرك الكامل فور إنهاء الاختبار" },
    { icon: "🏆", title: "شهادات المستوى", desc: "احصل على شهادة تثبت مستواك اللغوي" },
    { icon: "🔄", title: "اختبارات متعددة", desc: "اختبر نفسك مراراً لمتابعة تقدمك عبر الزمن" },
  ],
  en: [
    { icon: "📊", title: "Level Assessment", desc: "Accurately evaluate your current English language level" },
    { icon: "🎯", title: "Skills Evaluation", desc: "Measure reading, writing, listening, and speaking skills" },
    { icon: "📈", title: "Personalized Paths", desc: "Smart learning path recommendations based on your level" },
    { icon: "📋", title: "Instant Results", desc: "Get your full report immediately after completing the test" },
    { icon: "🏆", title: "Level Certificates", desc: "Receive a certificate proving your language level" },
    { icon: "🔄", title: "Multiple Tests", desc: "Test yourself repeatedly to track progress over time" },
  ],
};

// Integration status — update this when full integration is complete
const INTEGRATION_STATUS = {
  phase: "shell", // "shell" | "integrated" | "live"
  externalUrl: "https://github.com/Darhous/darhous-assessment",
  note: "Integration with unified Darhous account in progress",
};

export default async function LanguagePortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const features = isAr ? assessmentFeatures.ar : assessmentFeatures.en;

  return (
    <div className="flex flex-col gap-20 pb-20 relative">
      {/* Ambient */}
      <div className="fixed top-0 end-0 pointer-events-none z-0" style={{ width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(208,188,255,0.06) 0%, transparent 65%)", filter: "blur(120px)" }} />

      <div className="container-xl pt-10 relative z-10">
        {/* Back */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {isAr ? "منصة درهوس" : "Darhous Platform"}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4" style={{ background: "rgba(208,188,255,0.08)", borderColor: "rgba(208,188,255,0.25)", color: "#d0bcff" }}>
              🌐 {isAr ? "بوابة اللغة" : "Language Portal"} &nbsp;·&nbsp;
              <span className="text-green-400">{isAr ? "متاح الآن" : "Available Now"}</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "بوابة اللغة" : "Language Portal"}
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "اختبارات تحديد مستوى اللغة الإنجليزية، تقييم المهارات، وتوصيات مخصصة لمسار التعلم المناسب لك."
                : "English language level tests, skills assessment, and personalized learning path recommendations."}
            </p>
          </div>

          {/* CTA card */}
          <div
            className="glass-card rounded-2xl p-6 min-w-[260px] flex flex-col gap-4"
            style={{ border: "1px solid rgba(208,188,255,0.15)" }}
          >
            <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "ابدأ الاختبار الآن" : "Start Your Assessment Now"}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "منصة اختبارات مستقلة جاهزة للاستخدام"
                : "Independent assessment platform ready to use"}
            </p>
            <a
              href={INTEGRATION_STATUS.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono transition-all hover:opacity-80"
              style={{ background: "rgba(208,188,255,0.12)", border: "1px solid rgba(208,188,255,0.3)", color: "#d0bcff" }}
            >
              <ExternalLink size={14} />
              {isAr ? "فتح منصة التقييم" : "Open Assessment Platform"}
            </a>
            <div
              className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
              style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80" }}
            >
              <CheckCircle size={12} />
              {isAr
                ? "دمج الحساب الموحد قيد التطوير"
                : "Unified account integration in progress"}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "ماذا يشمل هذا القسم؟" : "What Does This Portal Include?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
                <span className="text-3xl">{feat.icon}</span>
                <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration info */}
        <div
          className="rounded-2xl p-6 mb-14 flex flex-col sm:flex-row items-start gap-4"
          style={{ background: "rgba(60,224,251,0.04)", border: "1px solid rgba(60,224,251,0.12)" }}
        >
          <GitBranch size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-tertiary)" }} />
          <div className="flex-1">
            <p className="font-bold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "حالة الدمج مع المنصة الموحدة" : "Integration Status with Unified Platform"}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "منصة التقييم جاهزة ومتاحة الآن كمنصة مستقلة. نعمل حالياً على دمجها بالكامل مع نظام حساب درهوس الموحد بحيث تُحفظ نتائجك في لوحة تحكمك الشخصية تلقائياً."
                : "The assessment platform is ready and available as an independent platform. We are currently working on fully integrating it with the unified Darhous account system so your results are automatically saved to your personal dashboard."}
            </p>
          </div>
          <a
            href={INTEGRATION_STATUS.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono flex-shrink-0 transition-opacity hover:opacity-80"
            style={{ color: "var(--color-tertiary)" }}
          >
            GitHub <ExternalLink size={11} />
          </a>
        </div>

        {/* Community Signup */}
        <div className="max-w-xl mx-auto">
          <p className="text-center text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "اشترك لتعرف عند اكتمال الدمج" : "Subscribe to know when full integration is complete"}
          </p>
          <CommunitySignup locale={locale} variant="footer" source="language-portal" />
        </div>

        {/* Other portals */}
        <div className="mt-12 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono transition-opacity hover:opacity-80" style={{ color: "var(--color-primary)" }}>
            {isAr ? "عرض كل البوابات" : "View All Portals"} <Arrow size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
