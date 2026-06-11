import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { examsData } from "@/data/iot/exams";
import type { Exam, Question } from "@/data/iot/exams";
import IotExamsClient from "@/components/iot/IotExamsClient";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ExamRow extends Record<string, unknown> {
  id: string; title: string; description: string; questions: Question[];
}
function mapExamRow(row: ExamRow): Exam {
  return { id: row.id, title: row.title, description: row.description, questions: row.questions ?? [] };
}
async function fetchAllExams(): Promise<Exam[]> {
  const dbExams = await fetchPublishedList<ExamRow, Exam>({
    table: "iot_exams", mapRow: mapExamRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbExams, examsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اختبارات الأردوينو | مختبر NexaLearn" : "Arduino Exams | NexaLearn IoT Lab",
    description: isAr ? "اختبر فهمك للأردوينو والإلكترونيات مع اختبارات تفاعلية." : "Test your Arduino and electronics knowledge with interactive exams.",
  };
}

export default async function IotExamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allExams = await fetchAllExams();

  return (
    <div className="container-xl py-12" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>اختبارات الأردوينو والإلكترونيات</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{allExams.length} اختبار تفاعلي — اختبر فهمك وقيّم مستواك.</p>
      <IotExamsClient exams={allExams} locale={locale} />
    </div>
  );
}
