import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, FlaskConical } from "lucide-react";
import { automationLabsV2 } from "@/data/automation/automationLabsV2";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "معامل الأتمتة التطبيقية | درهوس" : "Automation Practical Labs | Darhous",
    description: isAr ? "تمارين عملية لبناء automations حقيقية خطوة بخطوة." : "Hands-on labs to build real automations step by step.",
  };
}

const DIFF_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };

export default async function AutomationLabsPage({
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
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>المعامل التطبيقية</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {automationLabsV2.length} معمل تطبيقي — كل معمل يتضمن سيناريو حقيقي، خطوات مفصلة، وقائمة تحقق من الإنجاز.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automationLabsV2.map((lab) => {
          const color = DIFF_COLOR[lab.level] ?? "#8ed5ff";
          return (
            <div key={lab.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                    <FlaskConical size={18} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{lab.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="flex items-center gap-0.5"><Clock size={10} />{lab.duration}</span>
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{lab.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lab.objective}</p>

              <div className="text-xs rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                <span className="font-semibold" style={{ color }}>السيناريو: </span>
                <span style={{ color: "var(--color-on-surface-variant)" }}>{lab.scenario}</span>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>الأدوات المستخدمة</p>
                <div className="flex flex-wrap gap-1.5">
                  {lab.tools.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color }}>الخطوات ({lab.steps.length})</p>
                <div className="space-y-1">
                  {lab.steps.slice(0, 3).map((step, i) => (
                    <div key={i} className="flex gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="font-mono font-bold shrink-0" style={{ color }}>{i + 1}.</span>
                      {step}
                    </div>
                  ))}
                  {lab.steps.length > 3 && (
                    <p className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>... و{lab.steps.length - 3} خطوات أخرى</p>
                  )}
                </div>
              </div>

              <div className="text-xs rounded-xl p-3" style={{ background: `${color}06`, border: `1px solid ${color}15` }}>
                <p className="font-semibold mb-1" style={{ color }}>تحدي إضافي</p>
                <p style={{ color: "var(--color-on-surface-variant)" }}>{lab.challengeTask}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
