import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import ToolsExplorerClient from "@/components/automation/ToolsExplorerClient";
import { automationToolsDirectory } from "@/data/automation/automationTools";
import { automationComparisons } from "@/data/automation/automationComparisons";
import { integrationApps } from "@/data/automation/integrations";
import { automationGlossary } from "@/data/automation/automationGlossary";

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
    openGraph: {
      title: isAr ? "مستكشف أدوات الأتمتة" : "Automation Tools Explorer",
      description: isAr
        ? "دليل شامل لأدوات الأتمتة: n8n, Make, Zapier, Python — متى تستخدم كل أداة ومقارنة بينها."
        : "Comprehensive guide to automation tools with comparisons, integrations, and glossary.",
      url: `/${locale}/automation/tools`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
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

      {/* ─── مقارنة الأدوات ─── */}
      <section className="mt-16">
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-on-surface)" }}>مقارنة الأدوات</h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>متى تختار أي أداة؟ — {automationComparisons.length} مقارنات عملية.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {automationComparisons.map((c) => (
            <div key={c.id} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(208,188,255,0.12)" }}>
              <div>
                <h3 className="font-bold text-sm mb-0.5" style={{ color: "var(--color-on-surface)" }}>{c.title}</h3>
                <span className="text-[10px] font-mono" style={{ color: "#d0bcff" }}>{c.focus}</span>
              </div>
              <div className="space-y-2">
                {c.options.map((opt) => (
                  <div key={opt.name} className="rounded-xl p-3 text-xs flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)" }}>
                    <span className="font-bold" style={{ color: "var(--color-on-surface)" }}>{opt.name}</span>
                    <span className="flex items-center gap-1" style={{ color: "#4ade80" }}><CheckCircle2 size={10} />الأنسب: {opt.bestFor}</span>
                    <span className="flex items-center gap-1" style={{ color: "#f59e0b" }}><AlertTriangle size={10} />تنبّه: {opt.caution}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs rounded-xl p-3" style={{ background: "rgba(208,188,255,0.06)", border: "1px solid rgba(208,188,255,0.15)", color: "#d0bcff" }}>
                <span className="font-semibold">الخلاصة: </span>{c.verdict}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── التكاملات الشائعة ─── */}
      <section className="mt-16">
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-on-surface)" }}>التكاملات الشائعة</h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>التطبيقات الأكثر استخدامًا في وصفات الأتمتة العربية.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {integrationApps.map((app) => {
            const statusColor = app.status === "مفضل" ? "#4ade80" : app.status === "قريبًا" ? "#f59e0b" : "#8ed5ff";
            return (
              <div key={app.id} className="glass-card rounded-xl p-4 flex flex-col gap-2" style={{ border: `1px solid ${statusColor}12` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{app.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0" style={{ background: `${statusColor}12`, color: statusColor, border: `1px solid ${statusColor}25` }}>{app.status}</span>
                </div>
                <span className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>{app.category}</span>
                <p className="text-xs leading-snug" style={{ color: "var(--color-on-surface-variant)" }}>{app.useCase}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── مصطلحات الأتمتة ─── */}
      <section className="mt-16 mb-4">
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-on-surface)" }}>مصطلحات الأتمتة</h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>{automationGlossary.length} مصطلحًا أساسيًا — تعريف + مثال عملي.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {automationGlossary.map((g) => (
            <div key={g.id} className="glass-card rounded-xl p-4 flex flex-col gap-2" style={{ border: "1px solid rgba(142,213,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm" style={{ color: "#8ed5ff" }}>{g.term}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{g.arabicDefinition}</p>
              <p className="text-[10px] font-mono rounded px-2 py-1" style={{ background: "rgba(142,213,255,0.05)", border: "1px solid rgba(142,213,255,0.1)", color: "var(--color-on-surface-variant)" }}>مثال: {g.simpleExample}</p>
              {g.relatedTerms.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {g.relatedTerms.map((r, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>{r}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
