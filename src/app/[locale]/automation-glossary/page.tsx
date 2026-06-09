import type { Metadata } from "next";
import { fetchPublishedList } from "@/lib/content/read-with-fallback";
import { verifyAdminRequest } from "@/lib/auth/admin";
import AutomationGlossaryClient from "./AutomationGlossaryClient";

interface AutomationGlossaryRow extends Record<string, unknown> {
  id: string;
  term: string;
  arabic_definition: string;
  simple_example: string;
  related_terms: string[];
}

export interface AutomationGlossaryTerm {
  id: string;
  term: string;
  arabicDefinition: string;
  simpleExample: string;
  relatedTerms: string[];
}

function mapRow(row: AutomationGlossaryRow): AutomationGlossaryTerm {
  return {
    id: row.id,
    term: row.term,
    arabicDefinition: row.arabic_definition,
    simpleExample: row.simple_example,
    relatedTerms: row.related_terms || [],
  };
}

async function fetchDbTerms(): Promise<AutomationGlossaryTerm[]> {
  return fetchPublishedList<AutomationGlossaryRow, AutomationGlossaryTerm>({
    table: "automation_glossary",
    mapRow,
    orderBy: { column: "created_at", ascending: false },
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
    title: isAr ? "مصطلحات الأتمتة" : "Automation Glossary",
    description: isAr
      ? "تعريفات واضحة وعملية لمصطلحات الأتمتة وسير العمل"
      : "Clear practical definitions for automation and workflow terms",
  };
}

export default async function AutomationGlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbTerms = await fetchDbTerms();
  
  // Safe server-side role check for the inline admin pilot.
  // Because this checks cookies natively, Next.js treats this route as dynamic.
  // This physically prevents draft or admin data from leaking into a static cache.
  const { user } = await verifyAdminRequest();
  const isAdmin = !!user;

  return <AutomationGlossaryClient locale={locale} terms={dbTerms} isAdmin={isAdmin} />;
}
