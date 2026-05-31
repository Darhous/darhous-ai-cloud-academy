import Link from "next/link";
import { ArrowRight, ArrowLeft, Bell, Sparkles } from "lucide-react";
import type { Portal } from "@/config/portals";
import CommunitySignup from "@/components/community/CommunitySignup";

interface Props {
  portal: Portal;
  locale: string;
}

export default function ComingSoonPortal({ portal, locale }: Props) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const featureSections: { icon: string; labelAr: string; labelEn: string }[] = portal.features.map(
    (f) => ({ icon: "✦", labelAr: f, labelEn: f })
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient orbs */}
      <div
        className="fixed top-0 end-0 pointer-events-none z-0"
        style={{
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, ${portal.color}08 0%, transparent 70%)`,
          filter: "blur(120px)",
        }}
      />
      <div
        className="fixed bottom-0 start-0 pointer-events-none z-0"
        style={{
          width: "40vw",
          height: "40vw",
          background: `radial-gradient(circle, ${portal.color}05 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      <div className="container-xl py-20 relative z-10">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-12 transition-opacity hover:opacity-80"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </Link>

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono mb-6"
            style={{
              background: `${portal.color}10`,
              borderColor: `${portal.color}30`,
              color: portal.color,
            }}
          >
            <Bell size={14} />
            {isAr ? "قادم قريبًا" : "Coming Soon"}
          </div>

          {/* Icon */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8"
            style={{
              background: `${portal.color}10`,
              border: `1px solid ${portal.color}25`,
              boxShadow: `0 0 60px ${portal.color}15`,
            }}
          >
            {portal.icon}
          </div>

          <h1
            className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            {isAr ? portal.titleAr : portal.titleEn}
          </h1>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--color-on-surface-variant)", maxWidth: "600px", margin: "0 auto 2rem" }}
          >
            {isAr ? portal.descriptionAr : portal.descriptionEn}
          </p>

          {/* Progress bar visual */}
          <div
            className="glass-card rounded-2xl p-6 mb-10 text-start"
            style={{ border: `1px solid ${portal.color}15` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono" style={{ color: portal.color }}>
                {isAr ? "حالة التطوير" : "Development Status"}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full font-mono"
                style={{ background: `${portal.color}15`, color: portal.color }}
              >
                {isAr ? "جاري التخطيط" : "In Planning"}
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "25%",
                  background: `linear-gradient(90deg, ${portal.color}80, ${portal.color})`,
                  boxShadow: `0 0 10px ${portal.color}50`,
                }}
              />
            </div>
            <p
              className="text-xs mt-2"
              style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}
            >
              {isAr
                ? "سيتم الإعلان عن موعد الإطلاق قريبًا"
                : "Launch date will be announced soon"}
            </p>
          </div>
        </div>

        {/* Planned Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2
            className="font-display font-bold text-2xl text-center mb-8"
            style={{ color: "var(--color-on-surface)" }}
          >
            <Sparkles size={20} className="inline ms-2" style={{ color: portal.color }} />
            {isAr ? "ما سيشمله هذا القسم" : "What This Portal Will Include"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureSections.map((feat, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-4 flex items-center gap-3"
                style={{ border: `1px solid ${portal.color}12` }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${portal.color}15`, color: portal.color }}
                >
                  ✦
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {isAr ? feat.labelAr : feat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notify me — community signup */}
        <div className="max-w-xl mx-auto mb-16">
          <p
            className="text-center text-sm mb-4"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr
              ? "اشترك ليصلك إشعار عند الإطلاق"
              : "Subscribe to get notified when it launches"}
          </p>
          <CommunitySignup locale={locale} variant="footer" source={`coming-soon-${portal.id}`} />
        </div>

        {/* Other portals */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "استكشف البوابات المتاحة الآن" : "Explore what's available now"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/ai-academy`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all hover:opacity-80"
              style={{
                background: "rgba(142,213,255,0.08)",
                border: "1px solid rgba(142,213,255,0.2)",
                color: "#8ed5ff",
              }}
            >
              🤖 {isAr ? "أكاديمية AI" : "AI Academy"}
            </Link>
            <Link
              href={`/${locale}/language`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all hover:opacity-80"
              style={{
                background: "rgba(208,188,255,0.08)",
                border: "1px solid rgba(208,188,255,0.2)",
                color: "#d0bcff",
              }}
            >
              🌐 {isAr ? "بوابة اللغة" : "Language Portal"}
            </Link>
            <Link
              href={`/${locale}/digital-exams`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all hover:opacity-80"
              style={{
                background: "rgba(60,224,251,0.08)",
                border: "1px solid rgba(60,224,251,0.2)",
                color: "#3ce0fb",
              }}
            >
              💻 {isAr ? "اختبارات التحول الرقمي" : "Digital Exams"}
            </Link>
          </div>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 mt-8 text-sm font-mono transition-opacity hover:opacity-80"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "عرض كل البوابات" : "View All Portals"} <Arrow size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
