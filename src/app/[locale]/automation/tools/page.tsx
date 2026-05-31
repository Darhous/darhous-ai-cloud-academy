import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolsExplorerClient from "@/components/automation/ToolsExplorerClient";
import { automationToolsDirectory } from "@/data/automation/automationTools";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مستكشف أدوات الأتمتة | درهوس" : "Automation Tools Explorer | Darhous",
    description: isAr
      ? "دليل شامل لأدوات الأتمتة: n8n, Make, Zapier, Python — متى تستخدم كل أداة."
      : "Comprehensive guide to automation tools: n8n, Make, Zapier, Python — when to use each.",
  };
}

export default async function AutomationToolsPage({
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
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مستكشف أدوات الأتمتة</h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {automationToolsDirectory.length} أداة موثقة — المزايا، العيوب، أفضل حالات الاستخدام، ودعم العربية.
        </p>
      </div>
      <ToolsExplorerClient tools={automationToolsDirectory} />
    </div>
  );
}
