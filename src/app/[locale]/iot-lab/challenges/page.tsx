import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { challengesData } from "@/data/iot/challenges";
import type { Challenge } from "@/data/iot/challenges";
import IotChallengesClient from "@/components/iot/IotChallengesClient";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ChallengeRow extends Record<string, unknown> {
  id: string; title: string; description: string; level: Challenge["level"];
  xp_reward: number; badge_id?: string; tasks: string[];
}
function mapChallengeRow(row: ChallengeRow): Challenge {
  return { id: row.id, title: row.title, description: row.description, level: row.level, xpReward: row.xp_reward, badgeId: row.badge_id, tasks: row.tasks ?? [] };
}
async function fetchAllChallenges(): Promise<Challenge[]> {
  const dbChallenges = await fetchPublishedList<ChallengeRow, Challenge>({
    table: "iot_challenges", mapRow: mapChallengeRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbChallenges, challengesData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const allChallenges = await fetchAllChallenges();
  return {
    title: isAr ? "تحديات الأردوينو | مختبر NexaLearn" : "Arduino Challenges | NexaLearn IoT Lab",
    description: isAr ? `${allChallenges.length}+ تحدي برمجي لاختبار مهاراتك مع نقاط XP وشارات.` : `${allChallenges.length}+ coding challenges with XP rewards and badges.`,
  };
}

export default async function IotChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allChallenges = await fetchAllChallenges();

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>تحديات الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{allChallenges.length} تحدي برمجي — اختبر مهاراتك واجمع نقاط XP والشارات.</p>

      <IotChallengesClient challenges={allChallenges} locale={locale} />
    </div>
  );
}
