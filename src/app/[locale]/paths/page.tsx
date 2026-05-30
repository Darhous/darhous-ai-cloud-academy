import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import { roadmaps } from "@/data/roadmaps";

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
        {roadmaps.map((roadmap) => (
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
