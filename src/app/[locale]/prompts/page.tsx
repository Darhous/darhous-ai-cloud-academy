import type { Metadata } from "next";
import { fetchPublishedList } from "@/lib/content/read-with-fallback";
import type { Prompt } from "@/data/prompts";
import PromptsClient from "./PromptsClient";

interface PromptRow extends Record<string, unknown> {
  id: string;
  title_ar: string;
  title_en: string;
  category: string;
  use_case_ar: string;
  use_case_en: string;
  prompt_text: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  best_model: string;
  tags: string[];
}

function mapPromptRow(row: PromptRow): Prompt {
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    category: row.category,
    useCaseAr: row.use_case_ar,
    useCaseEn: row.use_case_en,
    promptText: row.prompt_text,
    difficulty: row.difficulty,
    bestModel: row.best_model,
    tags: row.tags ?? [],
  };
}

async function fetchDbPrompts(): Promise<Prompt[]> {
  return fetchPublishedList<PromptRow, Prompt>({
    table: "ai_prompts",
    mapRow: mapPromptRow,
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
    title: isAr ? "مكتبة المطالبات" : "Prompt Library",
    description: isAr
      ? "قوالب مطالبات احترافية لـ Claude وChatGPT وGemini مع زر نسخ فوري"
      : "Professional prompt templates for Claude, ChatGPT, and Gemini with instant copy",
    keywords: isAr
      ? ["مطالبات", "prompt engineering", "claude prompts", "chatgpt prompts"]
      : ["prompt library", "prompt templates", "claude prompts", "prompt engineering"],
  };
}

export default async function PromptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbPrompts = await fetchDbPrompts();
  return <PromptsClient locale={locale} dbPrompts={dbPrompts} />;
}
