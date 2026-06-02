import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bot, Briefcase, Layers } from "lucide-react";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { getWorkflowDetail } from "@/data/automation/details";
import TemplateDetailClient from "@/components/automation/TemplateDetailClient";

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
    title: `${workflow.title} | مكتبة وصفات الأتمتة n8n | درهوس`,
    description: workflow.shortDescription ?? workflow.businessProblem,
    keywords: workflow.seoHashtags?.join(", "),
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const workflow = curatedWorkflows.find((t) => t.id === slug);
  if (!workflow) notFound();

  const detail = getWorkflowDetail(slug);
  if (!detail) notFound();

  const jsonUrl = `/automation/workflows-json/${slug}.json`;

  return (
    <div className="container-xl py-12" dir="rtl">
      {/* Breadcrumb */}
      <Link
        href={`/${locale}/automation/templates`}
        className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ArrowRight size={14} />
        العودة لمكتبة الوصفات
      </Link>

      <div className="max-w-2xl mx-auto">
        <TemplateDetailClient template={workflow} detail={detail} jsonUrl={jsonUrl} />

        {/* Related workflows */}
        {workflow.relatedTemplateIds && workflow.relatedTemplateIds.length > 0 && (
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
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

        {/* CTAs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/${locale}/automation/services`}
            className="rounded-3xl p-6 flex flex-col gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#f59e0b" }}>
              <Briefcase size={16} />
              <span className="font-bold text-sm">احتاج تنفيذًا مخصصًا</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              فريقنا يبني ويطبّق هذه الوصفة على عملك، أو يطلب إعداد n8n وتدريب فريقك.
            </p>
          </Link>
          <Link
            href={`/${locale}/automation/automation-agent`}
            className="rounded-3xl p-6 flex flex-col gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.15)" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#f97316" }}>
              <Bot size={16} />
              <span className="font-bold text-sm">وكيل الأتمتة الذكي</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              صف عمليتك واحصل على توصية بأفضل وصفة من المكتبة مع خطة تنفيذ.
            </p>
          </Link>
        </div>

        {/* Back to library */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/automation/templates`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <Layers size={15} />
            العودة لمكتبة الوصفات
          </Link>
        </div>
      </div>
    </div>
  );
}
