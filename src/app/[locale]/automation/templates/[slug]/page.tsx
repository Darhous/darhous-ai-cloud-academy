import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Wrench, Tag, Zap, Shield } from "lucide-react";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import SafetyBadge from "@/components/automation/SafetyBadge";

export async function generateStaticParams() {
  return curatedWorkflows
    .filter((w) => w.visible !== false)
    .map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflow = curatedWorkflows.find((t) => t.id === slug);
  if (!workflow) return { title: "قالب غير موجود | درهوس" };
  return {
    title: `${workflow.title} | مكتبة وصفات الأتمتة | درهوس`,
    description: workflow.shortDescription ?? workflow.businessProblem,
    keywords: workflow.seoHashtags?.join(", "),
  };
}

const DIFF_COLORS: Record<string, string> = {
  مبتدئ: "#4ade80",
  متوسط: "#f59e0b",
  متقدم: "#f87171",
};

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const workflow = curatedWorkflows.find((t) => t.id === slug);

  if (!workflow) notFound();

  const diffColor = DIFF_COLORS[workflow.difficulty] ?? "#8ed5ff";

  return (
    <div className="container-xl py-12" dir="rtl">
      {/* Breadcrumb */}
      <Link
        href={`/${locale}/automation/templates`}
        className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ArrowRight size={14} />
        العودة لمكتبة القوالب
      </Link>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Hero card */}
        <div
          className="rounded-3xl p-7"
          style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.12)" }}
        >
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full"
              style={{ background: `${diffColor}15`, color: diffColor, border: `1px solid ${diffColor}25` }}
            >
              {workflow.difficulty}
            </span>
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {workflow.category}
            </span>
            {workflow.safetyStatus && (
              <SafetyBadge status={workflow.safetyStatus} />
            )}
            <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
              <Clock size={11} />
              {workflow.estimatedSetupTime}
            </span>
            {workflow.nodeCount && (
              <span className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                {workflow.nodeCount} خطوات
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
            {workflow.title}
          </h1>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-on-surface-variant)" }}>
            {workflow.shortDescription ?? workflow.businessProblem}
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {workflow.requiredTools.map((tool, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-mono"
                style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.15)" }}
              >
                <Wrench size={9} /> {tool}
              </span>
            ))}
          </div>

          {/* Tags */}
          {workflow.tags && workflow.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {workflow.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-mono"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "المشكلة التجارية", value: workflow.businessProblem, icon: <Zap size={13} />, color: "#4ade80" },
            { label: "القيمة التجارية", value: workflow.businessValue ?? "—", icon: <Zap size={13} />, color: "#d0bcff" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-1.5 mb-2" style={{ color: item.color }}>
                {item.icon}
                <span className="text-[11px] font-semibold">{item.label}</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Safety notes */}
        {workflow.safetyNotes && (
          <div
            className="rounded-2xl p-4 flex gap-3"
            style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)" }}
          >
            <Shield size={15} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {workflow.safetyNotes}
            </p>
          </div>
        )}

        {/* Coming soon section */}
        <div
          className="rounded-3xl p-8 text-center"
          style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            🔧
          </div>
          <h2 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
            الدليل التفصيلي قريبًا
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)", maxWidth: 420, margin: "0 auto 1.5rem" }}>
            نعمل على إضافة: خارطة الـ workflow التفاعلية، JSON التعليمي، دليل الإعداد خطوة بخطوة، وقائمة الاختبار.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/automation/automation-agent`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", color: "#0c0e12" }}
            >
              جرّب وكيل الأتمتة
            </Link>
            <Link
              href={`/${locale}/automation/services`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              احتاج تنفيذًا مخصصًا
            </Link>
          </div>
        </div>

        {/* Related workflows */}
        {workflow.relatedTemplateIds && workflow.relatedTemplateIds.length > 0 && (
          <div>
            <h2 className="font-bold text-base mb-4" style={{ color: "var(--color-on-surface)" }}>
              وصفات مشابهة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workflow.relatedTemplateIds.map((relId) => {
                const rel = curatedWorkflows.find((t) => t.id === relId);
                if (!rel) return null;
                return (
                  <Link
                    key={relId}
                    href={`/${locale}/automation/templates/${relId}`}
                    className="rounded-2xl p-4 block transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>
                      {rel.title}
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>
                      {rel.category} · {rel.difficulty}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="pt-4">
          <Link
            href={`/${locale}/automation/templates`}
            className="inline-flex items-center gap-2 text-sm font-mono transition-opacity hover:opacity-70"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <ArrowRight size={14} />
            العودة لمكتبة القوالب
          </Link>
        </div>
      </div>
    </div>
  );
}
