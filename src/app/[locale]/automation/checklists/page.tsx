import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { automationChecklists } from "@/data/automation/automationChecklists";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationChecklist } from "@/data/automation/types";

interface ChecklistRow extends Record<string, unknown> {
  id: string; title: string; project_type: string; tools: string[]; sensitivity: string;
  discovery_checklist: string[]; build_checklist: string[]; qa_checklist: string[];
  launch_checklist: string[]; maintenance_checklist: string[];
}
function mapRow(row: ChecklistRow): AutomationChecklist {
  return {
    id: row.id, title: row.title, projectType: row.project_type, tools: row.tools ?? [],
    sensitivity: row.sensitivity, discoveryChecklist: row.discovery_checklist ?? [],
    buildChecklist: row.build_checklist ?? [], qaChecklist: row.qa_checklist ?? [],
    launchChecklist: row.launch_checklist ?? [], maintenanceChecklist: row.maintenance_checklist ?? [],
  };
}
async function fetchChecklists(): Promise<AutomationChecklist[]> {
  const db = await fetchPublishedList<ChecklistRow, AutomationChecklist>({
    table: "automation_checklists", mapRow, match: { portal_id: "automation" },
    orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(db, automationChecklists);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "قوائم تحقق الأتمتة | NexaLearn" : "Automation Checklists | NexaLearn",
    description: isAr ? "قوائم تحقق جاهزة للاستخدام في مشاريع الأتمتة من الاستكشاف حتى الصيانة." : "Ready-to-use checklists for automation projects from discovery to maintenance.",
  };
}

const PHASES: { key: keyof AutomationChecklist; labelAr: string; labelEn: string; color: string }[] = [
  { key: "discoveryChecklist", labelAr: "الاستكشاف", labelEn: "Discovery", color: "#8ed5ff" },
  { key: "buildChecklist", labelAr: "البناء", labelEn: "Build", color: "#d0bcff" },
  { key: "qaChecklist", labelAr: "الجودة", labelEn: "QA", color: "#f59e0b" },
  { key: "launchChecklist", labelAr: "الإطلاق", labelEn: "Launch", color: "#4ade80" },
  { key: "maintenanceChecklist", labelAr: "الصيانة", labelEn: "Maintenance", color: "#3ce0fb" },
];

const CARD_COLORS = ["#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b", "#3ce0fb", "#f97316"];

export default async function AutomationChecklistsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const items = await fetchChecklists();

  return (
    <div className="container-xl py-12" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />{isAr ? "العودة لأكاديمية الأتمتة" : "Back to Automation"}
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "قوائم تحقق الأتمتة" : "Automation Checklists"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `${items.length} قائمة تحقق — من الاستكشاف إلى الصيانة.` : `${items.length} checklists — from discovery to maintenance.`}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {items.map((cl, idx) => {
          const color = CARD_COLORS[idx % CARD_COLORS.length];
          return (
            <div key={cl.id} className="glass-card rounded-2xl p-6 flex flex-col gap-5" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-start gap-3 flex-wrap">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>{cl.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>{cl.projectType}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {isAr ? `الحساسية: ${cl.sensitivity}` : `Sensitivity: ${cl.sensitivity}`}
                    </span>
                    {cl.tools.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PHASES.map((phase) => {
                  const list = cl[phase.key] as string[];
                  if (!list || list.length === 0) return null;
                  return (
                    <div key={phase.key} className="rounded-xl p-4 flex flex-col gap-2" style={{ background: `${phase.color}06`, border: `1px solid ${phase.color}18` }}>
                      <p className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: phase.color }}>
                        {isAr ? phase.labelAr : phase.labelEn}
                      </p>
                      {list.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                          <CheckCircle2 size={10} className="mt-0.5 shrink-0" style={{ color: phase.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
