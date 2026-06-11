import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubjectById, examSubjects } from "@/data/digital-exam-subjects";
import type { ExamSubject, ExamQuestion } from "@/data/digital-exam-subjects";
import DigitalExamClient from "@/components/exams/DigitalExamClient";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ExamSubjectRow extends Record<string, unknown> {
  id: string; label: string; label_ar: string; icon: string; color: string;
  description: string; description_ar: string; questions: ExamQuestion[];
}
function mapExamSubjectRow(row: ExamSubjectRow): ExamSubject {
  return {
    id: row.id, label: row.label, labelAr: row.label_ar, icon: row.icon, color: row.color,
    description: row.description, descriptionAr: row.description_ar, questions: row.questions ?? [],
  };
}
async function fetchSubjectById(subjectId: string): Promise<ExamSubject | undefined> {
  const dbSubjects = await fetchPublishedList<ExamSubjectRow, ExamSubject>({
    table: "exam_subjects", mapRow: mapExamSubjectRow, match: { portal_id: "digital-exams" }, orderBy: { column: "sort_order", ascending: true },
  });
  const merged = mergeById(dbSubjects, examSubjects);
  return merged.find((s) => s.id === subjectId) ?? getSubjectById(subjectId);
}

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    examSubjects.map((s) => ({ locale, subject: s.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}): Promise<Metadata> {
  const { locale, subject: subjectId } = await params;
  const subject = await fetchSubjectById(subjectId);
  if (!subject) return { title: "Exam Not Found" };
  const isAr = locale === "ar";
  const title = isAr
    ? `اختبار ${subject.labelAr} `
    : `${subject.label} Practice Exam `;
  const description = isAr
    ? `اختبر معرفتك في ${subject.labelAr} — ${subject.descriptionAr}. أسئلة MCQ وصح/خطأ مع شرح فوري.`
    : `Test your ${subject.label} knowledge — ${subject.description}. MCQ and True/False with instant explanations.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: { card: "summary" },
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}) {
  const { locale, subject: subjectId } = await params;
  const subject = await fetchSubjectById(subjectId);
  if (!subject) notFound();
  return <DigitalExamClient subject={subject} locale={locale} />;
}
