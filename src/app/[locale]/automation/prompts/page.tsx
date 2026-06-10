import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { automationPrompts } from "@/data/automation/automationPrompts";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationPrompt } from "@/data/automation/types";

interface PromptRow extends Record<string, unknown> {
  id: string; title: string; goal: string; prompt: string; output: string; recommended_for: string[];
}
function mapRow(row: PromptRow): AutomationPrompt {
  return {
    id: row.id, title: row.title, goal: row.goal, prompt: row.prompt,
    output: row.output, recommendedFor: row.recommended_for ?? [],
  };
}
async function fetchPrompts(): Promise<AutomationPrompt[]> {
  const db = await fetchPublishedList<PromptRow, AutomationPrompt>({
    table: "automation_prompts", mapRow, match: { portal_id: "automation" },
    orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(db, automationPrompts);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "برومبتات الأتمتة الجاهزة | NexaLearn" : "Ready Automation Prompts | NexaLearn",
    description: isAr ? "برومبتات جاهزة لمشاريع الأتمتة: تحليل العمليات، التصميم، الاختبار، والتسليم." : "Ready prompts for automation projects: analysis, design, testing, and handover.",
  };
}

const COLORS = ["#8ed5ff", "#d0bcff", "#4ade80", "#f59e0b", "#3ce0fb", "#f97316", "#8ed5ff", "#d0bcff", "#4ade80", "#f59e0b", "#3ce0fb"];

export default async function AutomationPromptsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const items = await fetchPrompts();

  return (
    <div className="container-xl py-12" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />{isAr ? "العودة لأكاديمية الأتمتة" : "Back to Automation"}
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "برومبتات الأتمتة الجاهزة" : "Ready Automation Prompts"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `${items.length} برومبت — جاهزة للاستخدام في مشاريع الأتمتة.` : `${items.length} prompts — ready for your automation projects.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((p, idx) => {
          const color = COLORS[idx % COLORS.length];
          return (
            <div key={p.id} className="glass-card rounded-2xl p-5 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>{p.title}</h3>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{p.goal}</p>
              </div>

              <div className="rounded-xl p-3 font-mono text-xs leading-relaxed overflow-auto max-h-36" dir="rtl" style={{ background: "rgba(0,0,0,0.25)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {p.prompt}
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex flex-wrap gap-1.5">
                  {p.recommendedFor.map((r, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>{r}</span>
                  ))}
                </div>
                {p.output && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    → {p.output}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
