import type { Metadata } from "next";
import DigitalExamsLibraryClient from "@/components/exams/DigitalExamsLibraryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "المكتبة الرقمية | درهوس" : "Digital Library | Darhous",
    description: isAr
      ? "تصفح الكتب والمذكرات الدراسية حسب المادة"
      : "Browse study books and notes by subject",
    robots: { index: true },
    openGraph: {
      title: isAr ? "المكتبة الرقمية — درهوس" : "Digital Library — Darhous",
      description: isAr
        ? "مكتبة رقمية شاملة: كتب ومذكرات لكل مواد التحول الرقمي"
        : "Comprehensive digital library: books and notes for all digital transformation subjects",
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <DigitalExamsLibraryClient locale={locale} />;
}
