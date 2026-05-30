import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسرد الذكاء الاصطناعي" : "AI & Cloud Glossary",
    description: isAr
      ? "تعريفات واضحة وعملية لكل مصطلح في الذكاء الاصطناعي والكلاود — من LLM وRAG إلى Kubernetes وMLOps"
      : "Clear practical definitions for every AI and Cloud term — from LLM and RAG to Kubernetes and MLOps",
    keywords: isAr
      ? ["مسرد AI", "تعريف ذكاء اصطناعي", "RAG", "LLM", "docker", "kubernetes"]
      : ["AI glossary", "machine learning terms", "RAG definition", "LLM", "MLOps"],
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <GlossaryClient locale={locale} />;
}
