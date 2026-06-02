import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { automationLabsV2 } from "@/data/automation/automationLabsV2";
import LabDetailClient from "@/components/automation/LabDetailClient";

export function generateStaticParams() {
  return automationLabsV2.map((lab) => ({ labId: lab.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; labId: string }>;
}): Promise<Metadata> {
  const { labId } = await params;
  const lab = automationLabsV2.find((l) => l.id === labId);
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
  const lab = automationLabsV2.find((l) => l.id === labId);
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
