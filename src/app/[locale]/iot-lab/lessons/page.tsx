import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lessonsData } from "@/data/iot/lessons";
import IotLessonsClient from "@/components/iot/IotLessonsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "دروس الأردوينو | مختبر درهوس" : "Arduino Lessons | Darhous IoT Lab",
    description: isAr ? `${lessonsData.length}+ درس بالعربية لتعلم برمجة الأردوينو من الصفر.` : `${lessonsData.length}+ Arabic lessons to learn Arduino from scratch.`,
  };
}

export default async function IotLessonsPage({
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
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>دروس الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{lessonsData.length} درس تفاعلي مع كود جاهز، مخطط توصيل، والأخطاء الشائعة.</p>

      <IotLessonsClient lessons={lessonsData} locale={locale} />
    </div>
  );
}
