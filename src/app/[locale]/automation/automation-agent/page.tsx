import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, Target, Layers, Wrench, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "وكيل الأتمتة الذكي | درهوس" : "Automation Agent | Darhous",
    description: isAr ? "احصل على blueprint أتمتة مخصص لعمليتك التجارية بالذكاء الاصطناعي." : "Get a custom automation blueprint for your business process with AI.",
  };
}

const CAPABILITIES = [
  { icon: <Target size={18} />, titleAr: "تشخيص الفرص", descAr: "يحلل عمليتك الحالية ويحدد أين الهدر الحقيقي وما الذي يمكن أتمتته فوراً.", color: "#4ade80" },
  { icon: <Layers size={18} />, titleAr: "اختيار الأدوات", descAr: "يوصي بأفضل stack أدوات بناءً على ميزانيتك، حجم فريقك، وطبيعة عمليتك.", color: "#8ed5ff" },
  { icon: <Wrench size={18} />, titleAr: "رسم الـ Workflow", descAr: "يرسم خارطة workflow تفصيلية مع كل خطوة، ومدخل، ومخرج، وشرط منطقي.", color: "#d0bcff" },
  { icon: <Clock size={18} />, titleAr: "خطة التنفيذ", descAr: "جدول زمني واقعي، أولويات التطبيق، وقائمة الاختبار قبل الإطلاق.", color: "#f59e0b" },
];

export default async function AutomationAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-12 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة لأكاديمية الأتمتة
      </Link>

      {/* Hero */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", boxShadow: "0 0 60px rgba(249,115,22,0.15)" }}>
          <Bot size={36} style={{ color: "#f97316" }} />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-4" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316" }}>
          <Sparkles size={13} />وكيل ذكي متخصص في الأتمتة
        </div>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          وكيل الأتمتة{" "}
          <span className="bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(135deg, #f97316, #fb923c)" }}>
            الذكي
          </span>
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
          صف عمليتك التجارية، وسيبني الوكيل لك blueprint أتمتة متكاملاً: الأدوات، الخطوات، وخطة التنفيذ.
        </p>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16 max-w-3xl mx-auto">
        {CAPABILITIES.map((cap, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 flex items-start gap-4" style={{ border: `1px solid ${cap.color}18` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cap.color}12`, border: `1px solid ${cap.color}22`, color: cap.color }}>
              {cap.icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>{cap.titleAr}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{cap.descAr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center max-w-xl mx-auto rounded-3xl p-10" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.12)" }}>
        <h2 className="font-bold text-xl mb-3" style={{ color: "var(--color-on-surface)" }}>جاهز لتحويل عمليتك؟</h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          تواصل معنا وسنبني معك blueprint أتمتة مخصصاً يبدأ بتشخيص جلسة مجانية.
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#0c0e12", boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
        >
          <Bot size={16} />ابدأ جلسة مجانية
        </Link>
        <p className="text-xs mt-4" style={{ color: "var(--color-on-surface-variant)" }}>
          أو استكشف <Link href={`/${locale}/automation/templates`} style={{ color: "#f97316" }} className="hover:underline">القوالب الجاهزة</Link> أولاً
        </p>
      </div>
    </div>
  );
}
