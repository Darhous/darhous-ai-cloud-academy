import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplatesClient from "@/components/automation/TemplatesClient";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationTemplate, Difficulty, TemplateAccess, SafetyStatus, WorkflowMapNode } from "@/data/automation/types";

interface AutomationWorkflowRow extends Record<string, unknown> {
  id: string; title: string; category: string; department: string; difficulty: Difficulty;
  business_problem: string; workflow_summary: string; required_tools: string[]; setup_steps: string[];
  input_fields: string[]; output: string; testing_checklist: string[]; risks: string[]; upgrade_ideas: string[];
  estimated_setup_time: string; access: TemplateAccess; trigger_label: string; actions: string[];
  short_description: string; business_value: string; required_accounts: string[]; credentials_guide: string;
  node_count: number; tags: string[]; seo_hashtags: string[]; industry: string; trigger_type: string;
  integrations: string[]; json_file_name: string; related_template_ids: string[]; related_lab_ids: string[];
  related_checklist_ids: string[]; common_mistakes: string[]; safety_status: SafetyStatus; safety_notes: string;
  workflow_map_nodes: WorkflowMapNode[];
}
function mapWorkflowRow(row: AutomationWorkflowRow): AutomationTemplate {
  return {
    id: row.id, title: row.title, category: row.category, department: row.department, difficulty: row.difficulty,
    businessProblem: row.business_problem, workflowSummary: row.workflow_summary,
    requiredTools: row.required_tools ?? [], setupSteps: row.setup_steps ?? [], inputFields: row.input_fields ?? [],
    output: row.output, testingChecklist: row.testing_checklist ?? [], risks: row.risks ?? [],
    upgradeIdeas: row.upgrade_ideas ?? [], estimatedSetupTime: row.estimated_setup_time, access: row.access,
    trigger: row.trigger_label, actions: row.actions ?? [],
    shortDescription: row.short_description, businessValue: row.business_value,
    requiredAccounts: row.required_accounts ?? [], credentialsGuide: row.credentials_guide,
    nodeCount: row.node_count, tags: row.tags ?? [], seoHashtags: row.seo_hashtags ?? [],
    industry: row.industry, triggerType: row.trigger_type, integrations: row.integrations ?? [],
    jsonFileName: row.json_file_name, relatedTemplateIds: row.related_template_ids ?? [],
    relatedLabIds: row.related_lab_ids ?? [], relatedChecklistIds: row.related_checklist_ids ?? [],
    commonMistakes: row.common_mistakes ?? [], safetyStatus: row.safety_status, safetyNotes: row.safety_notes,
    workflowMapNodes: row.workflow_map_nodes ?? [],
  };
}
async function fetchAllWorkflows(): Promise<AutomationTemplate[]> {
  const dbWorkflows = await fetchPublishedList<AutomationWorkflowRow, AutomationTemplate>({
    table: "automation_workflows", mapRow: mapWorkflowRow, match: { portal_id: "automation" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbWorkflows, curatedWorkflows);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مكتبة قوالب الأتمتة — 30 وصفة أتمتة"
      : "Automation Recipe Library — 30 Curated Workflows",
    description: isAr
      ? "30 وصفة أتمتة منتقاة لأعمالك: مبيعات، تسويق، HR، تعليم، دعم عملاء، وأكثر."
      : "30 curated automation workflows for sales, marketing, HR, education, customer support and more.",
    openGraph: {
      title: isAr ? "مكتبة وصفات الأتمتة — 30 وصفة" : "Automation Recipe Library — 25 Workflows",
      description: isAr
        ? "30 وصفة أتمتة منتقاة لأعمالك: مبيعات، تسويق، HR، تعليم، دعم عملاء، وأكثر."
        : "30 curated automation workflows for sales, marketing, HR, education, customer support and more.",
      url: `/${locale}/automation/templates`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AutomationTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allWorkflows = await fetchAllWorkflows();
  const visible = allWorkflows.filter((w) => w.visible !== false);
  const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مكتبة وصفات الأتمتة",
    description: "30 وصفة أتمتة منتقاة لأعمالك",
    numberOfItems: visible.length,
    itemListElement: visible.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: w.title,
      url: `${BASE_URL}/${locale}/automation/templates/${w.id}`,
      description: w.shortDescription ?? w.businessProblem,
    })),
  };

  return (
    <div className="container-xl py-12" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8">
        <Link
          href={`/${locale}/automation`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />العودة لأكاديمية الأتمتة
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          مكتبة وصفات الأتمتة
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {visible.length} وصفة أتمتة منتقاة — كل وصفة تتضمن: المشكلة التجارية، الأدوات المطلوبة، خطوات الإعداد، وحالة الأمان.
        </p>
      </div>
      <TemplatesClient templates={visible} locale={locale} />
    </div>
  );
}
