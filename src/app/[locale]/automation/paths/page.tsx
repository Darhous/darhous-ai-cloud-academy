import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { automationLearningPaths } from "@/data/automation/automationLearningPaths";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات تعلم الأتمتة | درهوس" : "Automation Learning Paths | Darhous",
    description: isAr ? "مسارات تعلم منظمة من المبتدئ للمحترف في مجال الأتمتة." : "Structured learning paths from beginner to advanced automation professional.",
  };
}

const DIFF_COLORS: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };

export default async function AutomationPathsPage({
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
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مسارات تعلم الأتمتة</h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{automationLearningPaths.length} مسار منظم — من لا خبرة إلى بناء automations معقدة للأعمال.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {automationLearningPaths.map((path) => {
          const color = DIFF_COLORS[path.level] ?? "#8ed5ff";
          return (
            <div key={path.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-base leading-snug" style={{ color: "var(--color-on-surface)" }}>{path.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ms-2" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{path.level}</span>
              </div>
              <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{path.subtitle}</p>
              <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="flex items-center gap-1"><Clock size={11} />{path.duration}</span>
                <span className="flex items-center gap-1"><Star size={11} />{path.estimatedLessons} درس</span>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{path.outcome}</p>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color }}>الأدوات الموصى بها</p>
                <div className="flex flex-wrap gap-1.5">
                  {path.recommendedTools.slice(0, 4).map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="py-2 rounded-lg text-center text-xs font-mono" style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}>
                المشروع النهائي: {path.finalCapstoneProject}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
