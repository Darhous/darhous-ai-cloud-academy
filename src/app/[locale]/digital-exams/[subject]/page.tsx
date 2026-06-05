import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubjectById, examSubjects } from "@/data/digital-exam-subjects";
import DigitalExamClient from "@/components/exams/DigitalExamClient";

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
  const subject = getSubjectById(subjectId);
  if (!subject) return { title: "Exam Not Found" };
  const isAr = locale === "ar";
  const title = isAr
    ? `اختبار ${subject.labelAr} | درهوس`
    : `${subject.label} Practice Exam | Darhous`;
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
  const subject = getSubjectById(subjectId);
  if (!subject) notFound();
  return <DigitalExamClient subject={subject} locale={locale} />;
}
