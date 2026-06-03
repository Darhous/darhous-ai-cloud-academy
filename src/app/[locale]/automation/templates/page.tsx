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
      ? "مكتبة قوالب الأتمتة — 25 وصفة أتمتة | درهوس"
      : "Automation Recipe Library — 25 Curated Workflows | Darhous",
    description: isAr
      ? "25 وصفة أتمتة منتقاة لأعمالك: مبيعات، تسويق، HR، تعليم، دعم عملاء، وأكثر."
      : "25 curated automation workflows for sales, marketing, HR, education, customer support and more.",
    openGraph: {
      title: isAr ? "مكتبة وصفات الأتمتة — 25 وصفة" : "Automation Recipe Library — 25 Workflows",
      description: isAr
        ? "25 وصفة أتمتة منتقاة لأعمالك: مبيعات، تسويق، HR، تعليم، دعم عملاء، وأكثر."
        : "25 curated automation workflows for sales, marketing, HR, education, customer support and more.",
      url: `/${locale}/automation/templates`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AutomationTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const visible = curatedWorkflows.filter((w) => w.visible !== false);
  const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مكتبة وصفات الأتمتة — درهوس",
    description: "25 وصفة أتمتة منتقاة لأعمالك",
    numberOfItems: visible.length,
    itemListElement: visible.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: w.title,
      url: `${BASE_URL}/${locale}/automation/templates/${w.id}`,
      description: w.shortDescription ?? w.businessProblem,
    })),
  };

  return (
    <div className="container-xl py-12" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
