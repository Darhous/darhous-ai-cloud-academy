import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplatesClient from "@/components/automation/TemplatesClient";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مكتبة قوالب الأتمتة — 20 وصفة أتمتة | درهوس"
      : "Automation Recipe Library — 20 Curated Workflows | Darhous",
    description: isAr
      ? "20 وصفة أتمتة منتقاة لأعمالك: مبيعات، تسويق، HR، تعليم، دعم عملاء، وأكثر."
      : "20 curated automation workflows for sales, marketing, HR, education, customer support and more.",
  };
}

export default async function AutomationTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const visible = curatedWorkflows.filter((w) => w.visible !== false);

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link
          href={`/${locale}/automation`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />العودة لأكاديمية الأتمتة
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          مكتبة وصفات الأتمتة
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {visible.length} وصفة أتمتة منتقاة — كل وصفة تتضمن: المشكلة التجارية، الأدوات المطلوبة، خطوات الإعداد، وحالة الأمان.
        </p>
      </div>
      <TemplatesClient templates={visible} locale={locale} />
    </div>
  );
}
