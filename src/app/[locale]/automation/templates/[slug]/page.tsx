import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { automationTemplates } from "@/data/automation/automationTemplates";
import TemplateDetailClient from "@/components/automation/TemplateDetailClient";

export async function generateStaticParams() {
  return automationTemplates.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const template = automationTemplates.find((t) => t.id === slug);
  if (!template) {
    return {
      title: "قالب غير موجود | درهوس",
    };
  }
  const isAr = locale === "ar";
  return {
    title: isAr
      ? `${template.title} | مكتبة قوالب الأتمتة | درهوس`
      : `${template.title} | Automation Templates | Darhous`,
    description: template.shortDescription ?? template.businessProblem,
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const template = automationTemplates.find((t) => t.id === slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link
          href={`/${locale}/automation/templates`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />
          العودة لمكتبة القوالب
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <TemplateDetailClient template={template} />

        {/* Related templates */}
        {template.relatedTemplateIds && template.relatedTemplateIds.length > 0 && (
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="font-bold text-lg mb-5" style={{ color: "var(--color-on-surface)" }}>
              قوالب مشابهة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {template.relatedTemplateIds.map((relId) => {
                const rel = automationTemplates.find((t) => t.id === relId);
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
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      {rel.category} · {rel.difficulty}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-10 rounded-3xl p-8 text-center"
          style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
        >
          <h2 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
            تحتاج مساعدة في التطبيق؟
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--color-on-surface-variant)" }}>
            فريقنا متخصص في بناء وتطبيق هذه الأتمتة على عملك مباشرة.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", color: "#0c0e12" }}
            >
              تواصل مع الفريق
            </Link>
            <Link
              href={`/${locale}/automation/templates`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              استكشف القوالب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
