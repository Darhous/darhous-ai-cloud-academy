import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplatesClient from "@/components/automation/TemplatesClient";
import { automationTemplates } from "@/data/automation/automationTemplates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مكتبة قوالب الأتمتة | درهوس" : "Automation Templates | Darhous",
    description: isAr
      ? "30+ قالب أتمتة جاهز للمبيعات والتسويق والموارد البشرية والتعليم."
      : "30+ ready-to-use automation templates for sales, marketing, HR, and education.",
  };
}

export default async function AutomationTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />العودة لأكاديمية الأتمتة
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          مكتبة قوالب الأتمتة
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {automationTemplates.length}+ قالب جاهز للتطبيق — كل قالب يتضمن: المشكلة التجارية، ملخص الـ Workflow، الأدوات المطلوبة، وخطوات الإعداد.
        </p>
      </div>
      <TemplatesClient templates={automationTemplates} />
    </div>
  );
}
