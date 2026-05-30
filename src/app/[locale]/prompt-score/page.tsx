import type { Metadata } from "next";
import PromptScoreClient from "./PromptScoreClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تقييم البرومبت" : "Prompt Score",
    description: isAr
      ? "قيّم برومبتك من 100 — تحليل كامل للدور والمهمة والسياق والقيود وصيغة الإخراج"
      : "Score your prompt out of 100 — full breakdown of role, task, context, constraints, and output format",
    robots: { index: true, follow: true },
  };
}

export default async function PromptScorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PromptScoreClient locale={locale} />;
}
