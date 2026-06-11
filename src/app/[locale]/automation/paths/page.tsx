import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star, Layers, FlaskConical } from "lucide-react";
import { automationLearningPaths } from "@/data/automation/automationLearningPaths";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { LearningPath } from "@/data/automation/types";

interface AutomationPathRow extends Record<string, unknown> {
  id: string;
  title: string;
  subtitle: string;
  english_label: string;
  level: LearningPath["level"];
  duration: string;
  target_audience: string[];
  outcome: string;
  modules: string[];
  practical_projects: string[];
  recommended_tools: string[];
  final_capstone_project: string;
  category: string;
  estimated_lessons: number;
}

function mapAutomationPathRow(row: AutomationPathRow): LearningPath {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    englishLabel: row.english_label,
    level: row.level,
    duration: row.duration,
    targetAudience: row.target_audience ?? [],
    outcome: row.outcome,
    modules: row.modules ?? [],
    practicalProjects: row.practical_projects ?? [],
    recommendedTools: row.recommended_tools ?? [],
    finalCapstoneProject: row.final_capstone_project,
    category: row.category,
    estimatedLessons: row.estimated_lessons,
  };
}

async function fetchDbAutomationPaths(): Promise<LearningPath[]> {
  return fetchPublishedList<AutomationPathRow, LearningPath>({
    table: "automation_paths",
    mapRow: mapAutomationPathRow,
    match: { portal_id: "automation" },
    orderBy: { column: "sort_order", ascending: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات تعلم الأتمتة" : "Automation Learning Paths",
    description: isAr ? "مسارات تعلم منظمة من المبتدئ للمحترف في مجال الأتمتة." : "Structured learning paths from beginner to advanced automation professional.",
    openGraph: {
      title: isAr ? "مسارات تعلم الأتمتة" : "Automation Learning Paths",
      description: isAr
        ? "مسارات تعلم منظمة من المبتدئ للمحترف — مشاريع تطبيقية وأدوات موصى بها في كل مسار."
        : "Structured learning paths from beginner to advanced — with capstone projects and recommended tools.",
      url: `/${locale}/automation/paths`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const DIFF_COLORS: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };

export default async function AutomationPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const dbPaths = await fetchDbAutomationPaths();
  const allPaths = mergeById(dbPaths, automationLearningPaths);

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />العودة لأكاديمية الأتمتة
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مسارات تعلم الأتمتة</h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{allPaths.length} مسار منظم — من لا خبرة إلى بناء automations معقدة للأعمال.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allPaths.map((path) => {
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

      {/* Cross-links */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/${locale}/automation/templates`}
          className="glass-card rounded-2xl p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5"
          style={{ border: "1px solid rgba(74,222,128,0.15)", textDecoration: "none" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
            <Layers size={18} style={{ color: "#4ade80" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>مكتبة الوصفات</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>30 وصفة جاهزة تناسب كل مسار</p>
          </div>
          <ArrowRight size={14} className="ms-auto shrink-0" style={{ color: "#4ade80", transform: "rotate(180deg)" }} />
        </Link>
        <Link
          href={`/${locale}/automation/labs`}
          className="glass-card rounded-2xl p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5"
          style={{ border: "1px solid rgba(60,224,251,0.15)", textDecoration: "none" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(60,224,251,0.1)", border: "1px solid rgba(60,224,251,0.2)" }}>
            <FlaskConical size={18} style={{ color: "#3ce0fb" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>المعامل التطبيقية</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>10 معامل لتطبيق ما تعلمته فعليًا</p>
          </div>
          <ArrowRight size={14} className="ms-auto shrink-0" style={{ color: "#3ce0fb", transform: "rotate(180deg)" }} />
        </Link>
      </div>
    </div>
  );
}
