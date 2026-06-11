import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bot, Briefcase, Layers } from "lucide-react";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { getWorkflowDetail } from "@/data/automation/details";
import TemplateDetailClient from "@/components/automation/TemplateDetailClient";
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

export async function generateStaticParams() {
  return curatedWorkflows
    .filter((w) => w.visible !== false)
    .map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflows = await fetchAllWorkflows();
  const workflow = workflows.find((t) => t.id === slug);
  if (!workflow) return { title: "قالب غير موجود" };
  const desc = workflow.shortDescription ?? workflow.businessProblem;
  return {
    title: `${workflow.title} | مكتبة وصفات الأتمتة n8n `,
    description: desc,
    keywords: workflow.seoHashtags?.join(", "),
    openGraph: {
      title: workflow.title,
      description: desc,
      url: `/ar/automation/templates/${workflow.id}`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const workflows = await fetchAllWorkflows();
  const workflow = workflows.find((t) => t.id === slug);
  if (!workflow) notFound();

  const detail = getWorkflowDetail(slug);
  if (!detail) notFound();

  const jsonUrl = `/automation/workflows-json/${slug}.json`;

  return (
    <div className="container-xl py-12" dir="rtl">
      {/* Breadcrumb */}
      <Link
        href={`/${locale}/automation/templates`}
        className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ArrowRight size={14} />
        العودة لمكتبة الوصفات
      </Link>

      <div className="max-w-2xl mx-auto">
        <TemplateDetailClient template={workflow} detail={detail} jsonUrl={jsonUrl} />

        {/* Related workflows */}
        {workflow.relatedTemplateIds && workflow.relatedTemplateIds.length > 0 && (
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="font-bold text-base mb-4" style={{ color: "var(--color-on-surface)" }}>
              وصفات مشابهة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workflow.relatedTemplateIds.map((relId) => {
                const rel = curatedWorkflows.find((t) => t.id === relId);
                if (!rel) return null;
                return (
                  <Link
                    key={relId}
                    href={`/${locale}/automation/templates/${relId}`}
                    className="rounded-2xl p-4 block transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>
                      {rel.title}
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>
                      {rel.category} · {rel.difficulty}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/${locale}/automation/services`}
            className="rounded-3xl p-6 flex flex-col gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#f59e0b" }}>
              <Briefcase size={16} />
              <span className="font-bold text-sm">احتاج تنفيذًا مخصصًا</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              فريقنا يبني ويطبّق هذه الوصفة على عملك، أو يطلب إعداد n8n وتدريب فريقك.
            </p>
          </Link>
          <Link
            href={`/${locale}/automation/automation-agent`}
            className="rounded-3xl p-6 flex flex-col gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.15)" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#f97316" }}>
              <Bot size={16} />
              <span className="font-bold text-sm">وكيل الأتمتة الذكي</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              صف عمليتك واحصل على توصية بأفضل وصفة من المكتبة مع خطة تنفيذ.
            </p>
          </Link>
        </div>

        {/* Back to library */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/automation/templates`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <Layers size={15} />
            العودة لمكتبة الوصفات
          </Link>
        </div>
      </div>
    </div>
  );
}
