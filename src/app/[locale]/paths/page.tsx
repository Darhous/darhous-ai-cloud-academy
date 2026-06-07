import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import { fetchPublishedList } from "@/lib/content/read-with-fallback";
import { roadmaps, type Roadmap, type RoadmapNode } from "@/data/roadmaps";

interface RoadmapRow extends Record<string, unknown> {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  level: "beginner" | "intermediate" | "advanced";
  total_weeks: number;
  outcome: string;
  outcome_ar: string;
  icon: string;
  color: string;
  nodes: RoadmapNode[];
}

function mapRoadmapRow(row: RoadmapRow): Roadmap {
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    level: row.level,
    totalWeeks: row.total_weeks,
    outcome: row.outcome,
    outcomeAr: row.outcome_ar,
    icon: row.icon,
    color: row.color,
    nodes: row.nodes ?? [],
  };
}

async function fetchDbPaths(): Promise<Roadmap[]> {
  return fetchPublishedList<RoadmapRow, Roadmap>({
    table: "ai_paths",
    mapRow: mapRoadmapRow,
    orderBy: { column: "sort_order", ascending: true },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات التعلم" : "Learning Paths",
    description: isAr
      ? "مسارات تعليمية منظمة خطوة بخطوة من المبتدئ إلى الاحتراف في الذكاء الاصطناعي والكلاود"
      : "Structured step-by-step learning paths from beginner to expert in AI and Cloud",
    keywords: isAr
      ? ["مسار تعلم AI", "خارطة طريق ذكاء اصطناعي", "MLOps roadmap", "cloud learning path"]
      : ["AI learning path", "ML roadmap", "cloud engineer path", "AI developer roadmap"],
  };
}

export default async function PathsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  // Merge: DB roadmaps first, then static — deduplicate by id, DB wins
  const dbPaths = await fetchDbPaths();
  const seen = new Set<string>();
  const allRoadmaps: Roadmap[] = [];
  for (const r of [...dbPaths, ...roadmaps]) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      allRoadmaps.push(r);
    }
  }

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "مسارات التعلم" : "Learning Paths"}
          title={isAr ? "خرائط طريق الذكاء الاصطناعي" : "AI Learning Roadmaps"}
          subtitle={isAr
            ? "مسارات تعليمية منظمة خطوة بخطوة من المبتدئ إلى الاحتراف"
            : "Structured step-by-step learning paths from beginner to expert"}
        />
      </div>

      {/* Paths grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {allRoadmaps.map((roadmap) => (
          <RoadmapTimeline
            key={roadmap.id}
            roadmap={roadmap}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
