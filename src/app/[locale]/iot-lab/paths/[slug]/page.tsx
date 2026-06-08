import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Cpu } from "lucide-react";
import { notFound } from "next/navigation";
import { pathsData } from "@/data/iot/paths";
import type { PathData } from "@/data/iot/paths";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface PathRow extends Record<string, unknown> {
  id: string; title: string; english_title: string; level: PathData["level"]; duration: string;
  target_learner: string; prerequisites: string; description: string; modules: string[];
  related_lessons: string[]; related_projects: string[]; related_code_examples: string[]; related_components: string[];
  final_project: string; cta_text: string;
}
function mapPathRow(row: PathRow): PathData {
  return {
    id: row.id, title: row.title, englishTitle: row.english_title, level: row.level, duration: row.duration,
    targetLearner: row.target_learner, prerequisites: row.prerequisites, description: row.description,
    modules: row.modules ?? [], relatedLessons: row.related_lessons ?? [], relatedProjects: row.related_projects ?? [],
    relatedCodeExamples: row.related_code_examples ?? [], relatedComponents: row.related_components ?? [],
    finalProject: row.final_project, ctaText: row.cta_text,
  };
}
async function fetchAllPaths(): Promise<PathData[]> {
  const dbPaths = await fetchPublishedList<PathRow, PathData>({
    table: "iot_paths", mapRow: mapPathRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbPaths, pathsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paths = await fetchAllPaths();
  const path = paths.find((p) => p.id === slug);
  if (!path) return { title: "Not Found" };
  return {
    title: `${path.title} | مختبر درهوس`,
    description: path.description,
  };
}

export async function generateStaticParams() {
  return pathsData.map((p) => ({ slug: p.id }));
}

const LEVEL_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171", خبير: "#d0bcff" };

export default async function IotPathDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const paths = await fetchAllPaths();
  const path = paths.find((p) => p.id === slug);
  if (!path) notFound();

  const color = LEVEL_COLOR[path.level] ?? "#f97316";

  return (
    <div className="container-xl py-12 max-w-4xl" dir="rtl">
      <Link href={`/${locale}/iot-lab/paths`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمسارات
      </Link>

      {/* Header */}
      <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden" style={{ border: `1px solid ${color}20` }}>
        <div className="absolute top-0 right-0 left-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{path.level}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}><Clock size={11} />{path.duration}</span>
        </div>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>{path.title}</h1>
        <p className="text-sm mb-1" style={{ color }}>{path.englishTitle}</p>
        <p className="text-sm leading-relaxed mt-4" style={{ color: "var(--color-on-surface-variant)" }}>{path.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Modules */}
        <div className="glass-card rounded-2xl p-6" style={{ border: `1px solid ${color}12` }}>
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color }}>
            <BookOpen size={16} /> الوحدات الدراسية
          </h2>
          <ol className="space-y-2">
            {path.modules.map((m, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="font-mono font-bold shrink-0" style={{ color }}>{i + 1}.</span>
                {m}
              </li>
            ))}
          </ol>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${color}12` }}>
            <p className="text-xs font-semibold mb-1" style={{ color }}>المتعلم المستهدف</p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{path.targetLearner}</p>
          </div>
          <div className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${color}12` }}>
            <p className="text-xs font-semibold mb-1" style={{ color }}>المتطلبات المسبقة</p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{path.prerequisites}</p>
          </div>
          <div className="glass-card rounded-2xl p-5" style={{ background: `${color}06`, border: `1px solid ${color}18` }}>
            <p className="text-xs font-semibold mb-1" style={{ color }}>المشروع النهائي</p>
            <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{path.finalProject}</p>
          </div>
        </div>
      </div>

      {/* Related content */}
      {path.relatedLessons.length > 0 && (
        <div className="glass-card rounded-2xl p-6 mb-6" style={{ border: "1px solid var(--color-outline-variant)" }}>
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Cpu size={16} style={{ color }} /> الدروس المرتبطة
          </h2>
          <div className="flex flex-wrap gap-2">
            {path.relatedLessons.map((id) => (
              <Link key={id} href={`/${locale}/iot-lab/lessons/${id}`} className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80" style={{ background: "rgba(249,115,22,0.08)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                {id.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      {path.relatedProjects.length > 0 && (
        <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--color-outline-variant)" }}>
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>المشاريع المرتبطة</h2>
          <div className="flex flex-wrap gap-2">
            {path.relatedProjects.map((id) => (
              <Link key={id} href={`/${locale}/iot-lab/projects/${id}`} className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80" style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                {id.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
