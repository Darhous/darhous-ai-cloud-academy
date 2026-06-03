import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/iot/projects";
import IotProjectsClient from "@/components/iot/IotProjectsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مشاريع الأردوينو | مختبر درهوس" : "Arduino Projects | Darhous IoT Lab",
    description: isAr ? `${projectsData.length} مشروع أردوينو من السهل للتخرج مع كود جاهز ومخطط توصيل.` : `${projectsData.length} Arduino projects from easy to capstone with ready code and wiring diagrams.`,
  };
}

export default async function IotProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>مشاريع الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{projectsData.length} مشروع تطبيقي — كل مشروع بمكونات، مخطط توصيل، وكود جاهز للاستخدام.</p>

      <IotProjectsClient projects={projectsData} locale={locale} />
    </div>
  );
}
