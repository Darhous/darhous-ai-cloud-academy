import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/iot/projects";
import type { Project } from "@/data/iot/projects";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ProjectRow extends Record<string, unknown> {
  id: string; title: string; category: string; difficulty: Project["difficulty"]; duration: string;
  description: string; features: string[]; components: string[]; wiring_guide: string; code_snippet: string;
  video_url?: string; simulator_link?: string;
}
function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id, title: row.title, category: row.category, difficulty: row.difficulty, duration: row.duration,
    description: row.description, features: row.features ?? [], components: row.components ?? [],
    wiringGuide: row.wiring_guide, codeSnippet: row.code_snippet, videoUrl: row.video_url, simulatorLink: row.simulator_link,
  };
}
async function fetchAllProjects(): Promise<Project[]> {
  const dbProjects = await fetchPublishedList<ProjectRow, Project>({
    table: "iot_projects", mapRow: mapProjectRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbProjects, projectsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await fetchAllProjects();
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "Not Found" };
  return { title: `${project.title} | مختبر درهوس`, description: project.description };
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.id }));
}

const DIFF_COLOR: Record<string, string> = { سهل: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171", تخرج: "#d0bcff" };

export default async function IotProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const projects = await fetchAllProjects();
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const color = DIFF_COLOR[project.difficulty] ?? "#f97316";

  return (
    <div className="container-xl py-12 max-w-4xl" dir="rtl">
      <Link href={`/${locale}/iot-lab/projects`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمشاريع
      </Link>

      <div className="glass-card rounded-3xl p-8 mb-8" style={{ border: `1px solid ${color}20` }}>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{project.difficulty}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)" }}>{project.category}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}><Clock size={11} />{project.duration}</span>
        </div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>{project.title}</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color }}>المكونات المطلوبة</h2>
          <div className="flex flex-wrap gap-2">
            {project.components.map((c, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${color}08`, color, border: `1px solid ${color}18` }}>{c}</span>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#8ed5ff" }}>المميزات</h2>
          <div className="space-y-1">
            {project.features.map((f, i) => (
              <p key={i} className="text-xs flex gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                <span style={{ color }}>✓</span>{f}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(249,115,22,0.12)" }}>
        <h2 className="font-semibold text-sm mb-3" style={{ color: "#f97316" }}>دليل التوصيل</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{project.wiringGuide}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--color-on-surface)" }}>الكود</h2>
        <pre className="rounded-2xl p-5 text-sm overflow-x-auto" style={{ background: "#0d1117", color: "#79c0ff", fontFamily: "JetBrains Mono, monospace", direction: "ltr", textAlign: "left" }} dir="ltr">
          <code>{project.codeSnippet}</code>
        </pre>
      </div>

      {project.simulatorLink && (
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(60,224,251,0.15)" }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "#3ce0fb" }}>جرّب في المحاكي</h2>
          <a href={project.simulatorLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl hover:opacity-80 transition-opacity" style={{ background: "rgba(60,224,251,0.1)", color: "#3ce0fb", border: "1px solid rgba(60,224,251,0.25)" }}>
            <ExternalLink size={14} /> فتح في Wokwi Simulator
          </a>
        </div>
      )}
    </div>
  );
}
