import type { Metadata } from "next";
import Concept5Client from "@/components/design-lab/homepage-concept-5/Concept5Client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "المفهوم 5 - بوابة الأهداف | مختبر التصميم"
      : "Concept 5 - Goal Gateway | Design Lab",
    description: isAr
      ? "مفهوم تصميم للصفحة الرئيسية يركز على اختيار الأهداف وتخصيص المسار التعليمي."
      : "A homepage concept focused on goal selection and personalized learning paths.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Concept5Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="flex flex-col gap-16 md:gap-20 pb-16 md:pb-20 bg-background" style={{ overflowX: "clip" }}>
      <Concept5Client locale={locale} />
    </main>
  );
}
