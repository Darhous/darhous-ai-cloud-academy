import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, FlaskConical, ClipboardList, Layers } from "lucide-react";
import { automationLabsV2 } from "@/data/automation/automationLabsV2";
import { automationChecklists } from "@/data/automation/automationChecklists";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationLab, AutomationChecklist, Difficulty } from "@/data/automation/types";

interface AutomationLabRow extends Record<string, unknown> {
  id: string; title: string; objective: string; scenario: string; tools: string[]; steps: string[];
  expected_output: string; common_mistakes: string[]; challenge_task: string; completion_checklist: string[];
  level: Difficulty; duration: string;
}
function mapLabRow(row: AutomationLabRow): AutomationLab {
  return {
    id: row.id, title: row.title, objective: row.objective, scenario: row.scenario,
    tools: row.tools ?? [], steps: row.steps ?? [], expectedOutput: row.expected_output,
    commonMistakes: row.common_mistakes ?? [], challengeTask: row.challenge_task,
    completionChecklist: row.completion_checklist ?? [], level: row.level, duration: row.duration,
  };
}

interface AutomationChecklistRow extends Record<string, unknown> {
  id: string; title: string; project_type: string; tools: string[]; sensitivity: string;
  discovery_checklist: string[]; build_checklist: string[]; qa_checklist: string[];
  launch_checklist: string[]; maintenance_checklist: string[];
}
function mapChecklistRow(row: AutomationChecklistRow): AutomationChecklist {
  return {
    id: row.id, title: row.title, projectType: row.project_type, tools: row.tools ?? [],
    sensitivity: row.sensitivity, discoveryChecklist: row.discovery_checklist ?? [],
    buildChecklist: row.build_checklist ?? [], qaChecklist: row.qa_checklist ?? [],
    launchChecklist: row.launch_checklist ?? [], maintenanceChecklist: row.maintenance_checklist ?? [],
  };
}

async function fetchAutomationLabsData() {
  const [dbLabs, dbChecklists] = await Promise.all([
    fetchPublishedList<AutomationLabRow, AutomationLab>({ table: "automation_labs", mapRow: mapLabRow, match: { portal_id: "automation" }, orderBy: { column: "sort_order", ascending: true } }),
    fetchPublishedList<AutomationChecklistRow, AutomationChecklist>({ table: "automation_checklists", mapRow: mapChecklistRow, match: { portal_id: "automation" }, orderBy: { column: "sort_order", ascending: true } }),
  ]);
  return {
    labs: mergeById(dbLabs, automationLabsV2),
    checklists: mergeById(dbChecklists, automationChecklists),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "معامل الأتمتة التطبيقية" : "Automation Practical Labs",
    description: isAr ? "تمارين عملية لبناء automations حقيقية خطوة بخطوة." : "Hands-on labs to build real automations step by step.",
    openGraph: {
      title: isAr ? "معامل الأتمتة التطبيقية" : "Automation Practical Labs",
      description: isAr
        ? "10 معامل تطبيقية — سيناريوهات حقيقية، خطوات مفصلة، وقائمة تحقق من الإنجاز مع Supabase sync."
        : "10 practical labs with real scenarios, step-by-step instructions, and completion checklists.",
      url: `/${locale}/automation/labs`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const DIFF_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };

export default async function AutomationLabsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { labs, checklists } = await fetchAutomationLabsData();

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />العودة لأكاديمية الأتمتة
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>المعامل التطبيقية</h1>
        <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
          {labs.length} معمل تطبيقي — كل معمل يتضمن سيناريو حقيقي، خطوات مفصلة، وقائمة تحقق من الإنجاز.
        </p>
        {/* Cross-link → templates */}
        <Link
          href={`/${locale}/automation/templates`}
          className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg mb-2 transition-opacity hover:opacity-80"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80" }}
        >
          <Layers size={12} />هل تبحث عن وصفة جاهزة؟ ← مكتبة الوصفات (30 وصفة)
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((lab) => {
          const color = DIFF_COLOR[lab.level] ?? "#8ed5ff";
          return (
            <div key={lab.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                    <FlaskConical size={18} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{lab.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="flex items-center gap-0.5"><Clock size={10} />{lab.duration}</span>
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{lab.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lab.objective}</p>

              <div className="text-xs rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                <span className="font-semibold" style={{ color }}>السيناريو: </span>
                <span style={{ color: "var(--color-on-surface-variant)" }}>{lab.scenario}</span>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>الأدوات المستخدمة</p>
                <div className="flex flex-wrap gap-1.5">
                  {lab.tools.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color }}>الخطوات ({lab.steps.length})</p>
                <div className="space-y-1">
                  {lab.steps.slice(0, 3).map((step, i) => (
                    <div key={i} className="flex gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="font-mono font-bold shrink-0" style={{ color }}>{i + 1}.</span>
                      {step}
                    </div>
                  ))}
                  {lab.steps.length > 3 && (
                    <p className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>... و{lab.steps.length - 3} خطوات أخرى</p>
                  )}
                </div>
              </div>

              <div className="text-xs rounded-xl p-3" style={{ background: `${color}06`, border: `1px solid ${color}15` }}>
                <p className="font-semibold mb-1" style={{ color }}>تحدي إضافي</p>
                <p style={{ color: "var(--color-on-surface-variant)" }}>{lab.challengeTask}</p>
              </div>

              <Link
                href={`/${locale}/automation/labs/${lab.id}`}
                className="mt-auto w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
              >
                ابدأ المعمل
              </Link>
            </div>
          );
        })}
      </div>

      {/* ─── Checklists الإطلاق ─── */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList size={22} style={{ color: "#3ce0fb" }} />
          <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>Checklists الإطلاق</h2>
        </div>
        <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
          {checklists.length} checklists جاهزة لأكثر مشاريع الأتمتة شيوعًا — من الاكتشاف إلى الصيانة.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {checklists.map((cl, idx) => {
            const colors = ["#3ce0fb", "#4ade80", "#d0bcff", "#f59e0b"];
            const color = colors[idx % colors.length];
            const phases = [
              { label: "الاكتشاف", items: cl.discoveryChecklist },
              { label: "البناء", items: cl.buildChecklist },
              { label: "الاختبار", items: cl.qaChecklist },
              { label: "الإطلاق", items: cl.launchChecklist },
            ];
            return (
              <div key={cl.id} className="glass-card rounded-2xl p-5 flex flex-col gap-4" style={{ border: `1px solid ${color}12` }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{cl.title}</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>{cl.projectType}</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>الحساسية: {cl.sensitivity} · الأدوات: {cl.tools.join(", ")}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phases.map((ph) => (
                    <div key={ph.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                      <p className="text-[10px] font-semibold mb-1.5" style={{ color }}>{ph.label}</p>
                      <div className="space-y-1">
                        {ph.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                            <CheckCircle2 size={9} className="mt-0.5 shrink-0" style={{ color }} />{item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
