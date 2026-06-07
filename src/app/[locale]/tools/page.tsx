import type { Metadata } from "next";
import { fetchPublishedList } from "@/lib/content/read-with-fallback";
import type { Tool } from "@/data/tools";
import ToolsClient from "./ToolsClient";

interface ToolRow extends Record<string, unknown> {
  id: string;
  name: string;
  category: string;
  short_description_ar: string;
  short_description_en: string;
  use_cases: string[];
  level: "beginner" | "intermediate" | "advanced";
  pricing_type: "free" | "freemium" | "paid" | "open-source";
  best_for: string;
  tags: string[];
  featured: boolean;
  website: string | null;
  overview_ar: string | null;
  overview_en: string | null;
  how_to_start_ar: string[] | null;
  how_to_start_en: string[] | null;
  pros: string[] | null;
  limitations: string[] | null;
  alternatives: string[] | null;
  related_prompts: string[] | null;
  related_courses: string[] | null;
  recommended_path: string | null;
}

function mapToolRow(row: ToolRow): Tool {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    shortDescriptionAr: row.short_description_ar,
    shortDescriptionEn: row.short_description_en,
    useCases: row.use_cases ?? [],
    level: row.level,
    pricingType: row.pricing_type,
    bestFor: row.best_for,
    tags: row.tags ?? [],
    featured: row.featured,
    website: row.website ?? undefined,
    overviewAr: row.overview_ar ?? undefined,
    overviewEn: row.overview_en ?? undefined,
    howToStartAr: row.how_to_start_ar ?? undefined,
    howToStartEn: row.how_to_start_en ?? undefined,
    pros: row.pros ?? undefined,
    limitations: row.limitations ?? undefined,
    alternatives: row.alternatives ?? undefined,
    relatedPrompts: row.related_prompts ?? undefined,
    relatedCourses: row.related_courses ?? undefined,
    recommendedPath: row.recommended_path ?? undefined,
  };
}

export async function fetchDbTools(): Promise<Tool[]> {
  return fetchPublishedList<ToolRow, Tool>({
    table: "ai_tools",
    mapRow: mapToolRow,
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
    title: isAr ? "مركز أدوات الذكاء الاصطناعي" : "AI Tools Hub",
    description: isAr
      ? "اكتشف وقارن أفضل أدوات الذكاء الاصطناعي — مصنفة بالعربي مع التوصيات والمجموعات"
      : "Discover and compare the best AI tools — categorized with recommendations and curated stacks",
    keywords: isAr
      ? ["أدوات ذكاء اصطناعي", "claude", "chatgpt", "ollama", "langchain", "n8n"]
      : ["AI tools", "claude", "chatgpt", "langchain", "n8n", "vector database"],
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbTools = await fetchDbTools();
  return <ToolsClient locale={locale} dbTools={dbTools} />;
}
