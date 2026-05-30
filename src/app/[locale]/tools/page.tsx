import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

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
  return <ToolsClient locale={locale} />;
}
