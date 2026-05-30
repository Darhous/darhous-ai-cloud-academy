import type { Metadata } from "next";
import PromptsClient from "./PromptsClient";

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
  return <PromptsClient locale={locale} />;
}
