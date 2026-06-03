import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, Bot, Users } from "lucide-react";
import { automationServicePackages } from "@/data/automation/automationServices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "خدمات الأتمتة الاحترافية | درهوس" : "Professional Automation Services | Darhous",
    description: isAr ? "باقات خدمات احترافية لتنفيذ حلول الأتمتة لعملك." : "Professional automation service packages for your business.",
    openGraph: {
      title: isAr ? "خدمات الأتمتة الاحترافية" : "Professional Automation Services",
      description: isAr
        ? "10 باقات خدمة احترافية: من تدقيق العمليات إلى تنفيذ حلول n8n و Python المخصصة."
        : "10 professional service packages: process audit, workflow design, and custom n8n / Python implementation.",
      url: `/${locale}/automation/services`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const COLORS = ["#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b", "#3ce0fb", "#f97316", "#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b"];

export default async function AutomationServicesPage({
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
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>خدمات الأتمتة الاحترافية</h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {automationServicePackages.length} باقة خدمة — من مراجعة العمليات إلى تنفيذ حلول n8n و Python المخصصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {automationServicePackages.map((svc, idx) => {
          const color = COLORS[idx % COLORS.length];
          return (
            <div key={svc.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base" style={{ background: `${color}12`, border: `1px solid ${color}22`, color }}>
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{svc.title}</h3>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="font-semibold" style={{ color }}>لمن هذه الخدمة: </span>{svc.whoItsFor}
              </p>

              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="flex items-center gap-1"><Clock size={11} />{svc.timeline}</span>
                <span className="flex items-center gap-1"><Users size={11} />{svc.startingScope}</span>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color }}>المخرجات</p>
                <div className="space-y-1">
                  {svc.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <CheckCircle2 size={11} style={{ color: "#4ade80" }} />{d}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>المتطلبات من العميل</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.requiredClientInputs.map((r, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>{r}</span>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/contact`}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
              >
                {svc.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Cross-link — automation-agent self-service */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.15)" }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
          <Bot size={20} style={{ color: "#f97316" }} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--color-on-surface)" }}>تفضّل تجربة الأتمتة بنفسك؟</p>
          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>استخدم وكيل الأتمتة الذكي للحصول على blueprint مخصص في دقائق — مجانًا وبدون تواصل.</p>
        </div>
        <Link
          href={`/${locale}/automation/automation-agent`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shrink-0 transition-all hover:opacity-80"
          style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}
        >
          <Bot size={14} />جرّب الوكيل
        </Link>
      </div>
    </div>
  );
}
