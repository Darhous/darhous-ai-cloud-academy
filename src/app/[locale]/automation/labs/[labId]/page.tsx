import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { automationLabsV2 } from "@/data/automation/automationLabsV2";
import LabDetailClient from "@/components/automation/LabDetailClient";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";
import type { AutomationLab, Difficulty } from "@/data/automation/types";

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
async function fetchAllLabs(): Promise<AutomationLab[]> {
  const dbLabs = await fetchPublishedList<AutomationLabRow, AutomationLab>({
    table: "automation_labs", mapRow: mapLabRow, match: { portal_id: "automation" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbLabs, automationLabsV2);
}

export function generateStaticParams() {
  return automationLabsV2.map((lab) => ({ labId: lab.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; labId: string }>;
}): Promise<Metadata> {
  const { labId } = await params;
  const labs = await fetchAllLabs();
  const lab = labs.find((l) => l.id === labId);
  if (!lab) return { title: "معمل غير موجود | درهوس" };
  return {
    title: `${lab.title} | معامل الأتمتة | درهوس`,
    description: lab.objective,
  };
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ locale: string; labId: string }>;
}) {
  const { locale, labId } = await params;
  const labs = await fetchAllLabs();
  const lab = labs.find((l) => l.id === labId);
  if (!lab) notFound();

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link
        href={`/${locale}/automation/labs`}
        className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ArrowRight size={14} />
        العودة للمعامل
      </Link>

      <div className="max-w-2xl mx-auto">
        <LabDetailClient lab={lab} />

        {/* Back CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/automation/labs`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <Layers size={15} />
            استعرض كل المعامل
          </Link>
        </div>
      </div>
    </div>
  );
}
