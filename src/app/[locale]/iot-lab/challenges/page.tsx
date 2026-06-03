import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { challengesData } from "@/data/iot/challenges";
import IotChallengesClient from "@/components/iot/IotChallengesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تحديات الأردوينو | مختبر درهوس" : "Arduino Challenges | Darhous IoT Lab",
    description: isAr ? `${challengesData.length}+ تحدي برمجي لاختبار مهاراتك مع نقاط XP وشارات.` : `${challengesData.length}+ coding challenges with XP rewards and badges.`,
  };
}

export default async function IotChallengesPage({
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
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>تحديات الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{challengesData.length} تحدي برمجي — اختبر مهاراتك واجمع نقاط XP والشارات.</p>

      <IotChallengesClient challenges={challengesData} locale={locale} />
    </div>
  );
}
