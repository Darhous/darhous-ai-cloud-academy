import type { Metadata } from "next";
import { fetchPublishedList } from "@/lib/content/read-with-fallback";
import type { GlossaryTerm } from "@/data/glossary";
import GlossaryClient from "./GlossaryClient";

interface GlossaryRow extends Record<string, unknown> {
  id: string;
  term: string;
  definition_ar: string;
  definition_en: string;
  example_ar: string;
  example_en: string;
  category: string;
}

function mapGlossaryRow(row: GlossaryRow): GlossaryTerm {
  return {
    id: row.id,
    term: row.term,
    definitionAr: row.definition_ar,
    definitionEn: row.definition_en,
    exampleAr: row.example_ar,
    exampleEn: row.example_en,
    category: row.category,
  };
}

async function fetchDbTerms(): Promise<GlossaryTerm[]> {
  return fetchPublishedList<GlossaryRow, GlossaryTerm>({
    table: "ai_glossary",
    mapRow: mapGlossaryRow,
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
  const dbTerms = await fetchDbTerms();
  return <GlossaryClient locale={locale} dbTerms={dbTerms} />;
}
