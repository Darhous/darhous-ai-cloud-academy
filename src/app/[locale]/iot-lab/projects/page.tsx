import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/iot/projects";
import type { Project } from "@/data/iot/projects";
import IotProjectsClient from "@/components/iot/IotProjectsClient";
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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const allProjects = await fetchAllProjects();
  return {
    title: isAr ? "مشاريع الأردوينو | مختبر درهوس" : "Arduino Projects | Darhous IoT Lab",
    description: isAr ? `${allProjects.length} مشروع أردوينو من السهل للتخرج مع كود جاهز ومخطط توصيل.` : `${allProjects.length} Arduino projects from easy to capstone with ready code and wiring diagrams.`,
  };
}

export default async function IotProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allProjects = await fetchAllProjects();

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مشاريع الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{allProjects.length} مشروع تطبيقي — كل مشروع بمكونات، مخطط توصيل، وكود جاهز للاستخدام.</p>

      <IotProjectsClient projects={allProjects} locale={locale} />
    </div>
  );
}
