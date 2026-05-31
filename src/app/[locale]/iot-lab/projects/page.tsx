import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { projectsData } from "@/data/iot/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مشاريع الأردوينو | مختبر درهوس" : "Arduino Projects | Darhous IoT Lab",
    description: isAr ? `${projectsData.length} مشروع أردوينو من السهل للتخرج مع كود جاهز ومخطط توصيل.` : `${projectsData.length} Arduino projects from easy to capstone with ready code and wiring diagrams.`,
  };
}

const DIFF_COLOR: Record<string, string> = { سهل: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171", تخرج: "#d0bcff" };

export default async function IotProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const grouped = projectsData.reduce<Record<string, typeof projectsData>>((acc, p) => {
    const key = p.difficulty;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const ORDER = ["سهل", "متوسط", "صعب", "تخرج"];
  const sortedEntries = Object.entries(grouped).sort(([a], [b]) => ORDER.indexOf(a) - ORDER.indexOf(b));

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مشاريع الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{projectsData.length} مشروع تطبيقي — كل مشروع بمكونات، مخطط توصيل، وكود جاهز للاستخدام.</p>

      <div className="space-y-10">
        {sortedEntries.map(([difficulty, projects]) => {
          const color = DIFF_COLOR[difficulty] ?? "#f97316";
          return (
            <div key={difficulty}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <span className="w-2 h-6 rounded-full" style={{ background: color }} />
                مستوى {difficulty}
                <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({projects.length} مشروع)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/${locale}/iot-lab/projects/${proj.id}`}
                    className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                    style={{ border: `1px solid ${color}15`, textDecoration: "none" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{proj.category}</span>
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}><Clock size={9} />{proj.duration}</span>
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{proj.title}</h3>
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.components.slice(0, 3).map((c, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>{c}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
