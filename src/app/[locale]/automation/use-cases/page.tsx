import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { automationUseCases } from "@/data/automation/automationUseCases";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationUseCase } from "@/data/automation/types";

interface UseCaseRow extends Record<string, unknown> {
  id: string; title: string; examples: string[]; operational_wins: string[];
}
function mapRow(row: UseCaseRow): AutomationUseCase {
  return {
    id: row.id, title: row.title,
    examples: row.examples ?? [], operationalWins: row.operational_wins ?? [],
  };
}
async function fetchUseCases(): Promise<AutomationUseCase[]> {
  const db = await fetchPublishedList<UseCaseRow, AutomationUseCase>({
    table: "automation_use_cases", mapRow, match: { portal_id: "automation" },
    orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(db, automationUseCases);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "حالات استخدام الأتمتة | NexaLearn" : "Automation Use Cases | NexaLearn",
    description: isAr ? "اكتشف كيف يمكن للأتمتة أن تحوّل العمليات في قطاعات مختلفة." : "Discover how automation transforms operations across industries.",
  };
}

const COLORS = ["#4ade80", "#8ed5ff", "#d0bcff", "#f59e0b", "#3ce0fb", "#f97316", "#4ade80", "#8ed5ff"];

export default async function AutomationUseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const items = await fetchUseCases();

  return (
    <div className="container-xl py-12" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-8">
        <Link href={`/${locale}/automation`} className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />{isAr ? "العودة لأكاديمية الأتمتة" : "Back to Automation"}
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "حالات استخدام الأتمتة" : "Automation Use Cases"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `${items.length} قطاع — أمثلة عملية ومكاسب تشغيلية.` : `${items.length} sectors — practical examples and operational wins.`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((uc, idx) => {
          const color = COLORS[idx % COLORS.length];
          return (
            <div key={uc.id} className="glass-card rounded-2xl p-5 flex flex-col gap-4" style={{ border: `1px solid ${color}18` }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: `${color}12`, color }}>
                  ◆
                </div>
                <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{uc.title}</h3>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color }}>{isAr ? "أمثلة" : "Examples"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.examples.map((ex, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}08`, color: "var(--color-on-surface-variant)", border: `1px solid ${color}15` }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: "#4ade80" }}>{isAr ? "مكاسب تشغيلية" : "Operational Wins"}</p>
                <div className="flex flex-col gap-1">
                  {uc.operationalWins.map((win, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <CheckCircle2 size={10} style={{ color: "#4ade80" }} />
                      {win}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
