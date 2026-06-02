import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import AutomationAgentClient from "@/components/automation/AutomationAgentClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "وكيل الأتمتة الذكي | درهوس" : "Automation Agent | Darhous",
    description: isAr
      ? "صف عمليتك التجارية واحصل على blueprint أتمتة مخصص مع خارطة أدوات واقتراحات تنفيذ."
      : "Get a custom automation blueprint for your business process with AI.",
  };
}

export default async function AutomationAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link
        href={`/${locale}/automation`}
        className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ArrowRight size={14} />العودة لأكاديمية الأتمتة
      </Link>

      {/* Hero */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div
          className="w-18 h-18 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style={{
            width: 72,
            height: 72,
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
            boxShadow: "0 0 60px rgba(249,115,22,0.15)",
          }}
        >
          <Bot size={32} style={{ color: "#f97316" }} />
        </div>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-4"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.25)",
            color: "#f97316",
          }}
        >
          <Sparkles size={13} />وكيل ذكي متخصص في الأتمتة
        </div>
        <h1
          className="font-display font-bold text-3xl md:text-4xl mb-4"
          style={{ color: "var(--color-on-surface)" }}
        >
          وكيل الأتمتة{" "}
          <span
            className="bg-clip-text"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(135deg, #f97316, #fb923c)",
            }}
          >
            الذكي
          </span>
        </h1>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          صف عمليتك التجارية، وسيبني الوكيل لك blueprint أتمتة متكاملاً: الأدوات، الخطوات، وخطة التنفيذ.
        </p>
      </div>

      {/* Wizard */}
      <div className="max-w-2xl mx-auto">
        <AutomationAgentClient />
      </div>

      {/* CTA bottom */}
      <div
        className="text-center max-w-xl mx-auto mt-12 rounded-3xl p-8"
        style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.12)" }}
      >
        <h2 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
          تحتاج تنفيذًا مخصصًا؟
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-on-surface-variant)" }}>
          تواصل مع فريقنا لبناء blueprint أتمتة مخصص يبدأ بجلسة تشخيص مجانية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #f97316, #fb923c)",
              color: "#0c0e12",
              boxShadow: "0 0 30px rgba(249,115,22,0.3)",
            }}
          >
            <Bot size={16} />ابدأ جلسة مجانية
          </Link>
          <Link
            href={`/${locale}/automation/templates`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "var(--color-on-surface)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            استكشف القوالب الجاهزة
          </Link>
        </div>
      </div>
    </div>
  );
}
