import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import { automationCaseStudies } from "@/data/automation/automationCaseStudies";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { CaseStudy } from "@/data/automation/types";

interface CaseStudyRow extends Record<string, unknown> {
  id: string; title: string; business_problem: string; before_automation: string[];
  after_automation: string[]; workflow_map: string[]; tools_used: string[];
  expected_impact: string; kpi_improvements: string[]; implementation_roadmap: string[];
}
function mapRow(row: CaseStudyRow): CaseStudy {
  return {
    id: row.id, title: row.title, businessProblem: row.business_problem,
    beforeAutomation: row.before_automation ?? [], afterAutomation: row.after_automation ?? [],
    workflowMap: row.workflow_map ?? [], toolsUsed: row.tools_used ?? [],
    expectedImpact: row.expected_impact, kpiImprovements: row.kpi_improvements ?? [],
    implementationRoadmap: row.implementation_roadmap ?? [],
  };
}
async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const db = await fetchPublishedList<CaseStudyRow, CaseStudy>({
    table: "automation_case_studies", mapRow, match: { portal_id: "automation" },
    orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(db, automationCaseStudies);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "دراسات حالة الأتمتة | NexaLearn" : "Automation Case Studies | NexaLearn",
    description: isAr ? "أمثلة حقيقية لأتمتة ناجحة عبر قطاعات متعددة." : "Real examples of successful automation across industries.",
  };
}

const COLORS = ["#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b", "#3ce0fb", "#f97316", "#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b"];

export default async function AutomationCaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const items = await fetchCaseStudies();

  return (
    <div className="container-xl py-12" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />{isAr ? "العودة لأكاديمية الأتمتة" : "Back to Automation"}
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "دراسات حالة الأتمتة" : "Automation Case Studies"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `${items.length} دراسة حالة — أمثلة حقيقية من قطاعات مختلفة.` : `${items.length} case studies across multiple industries.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((cs, idx) => {
          const color = COLORS[idx % COLORS.length];
          return (
            <div key={cs.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${color}12`, color }}>
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base leading-snug" style={{ color: "var(--color-on-surface)" }}>{cs.title}</h3>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="font-semibold" style={{ color }}>{isAr ? "المشكلة: " : "Problem: "}</span>{cs.businessProblem}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "#f87171" }}>{isAr ? "قبل الأتمتة" : "Before"}</p>
                  {cs.beforeAutomation.slice(0, 3).map((b, i) => (
                    <p key={i} className="text-xs flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span style={{ color: "#f87171" }}>✗</span> {b}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "#4ade80" }}>{isAr ? "بعد الأتمتة" : "After"}</p>
                  {cs.afterAutomation.slice(0, 3).map((a, i) => (
                    <p key={i} className="text-xs flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      <CheckCircle2 size={10} style={{ color: "#4ade80" }} /> {a}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cs.toolsUsed.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
                    <Wrench size={8} />{t}
                  </span>
                ))}
              </div>

              {cs.expectedImpact && (
                <p className="text-xs leading-relaxed px-3 py-2 rounded-lg" style={{ background: `${color}08`, color: "var(--color-on-surface-variant)", borderLeft: `2px solid ${color}40` }}>
                  {cs.expectedImpact}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
