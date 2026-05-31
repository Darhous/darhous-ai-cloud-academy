import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Star } from "lucide-react";
import { challengesData } from "@/data/iot/challenges";

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

const LEVEL_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171" };

export default async function IotChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const grouped = challengesData.reduce<Record<string, typeof challengesData>>((acc, c) => {
    if (!acc[c.level]) acc[c.level] = [];
    acc[c.level].push(c);
    return acc;
  }, {});

  return (
    <div className="container-xl py-12" dir="rtl">
      <Link href={`/${locale}/iot-lab`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للمختبر
      </Link>
      <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>تحديات الأردوينو</h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-variant)" }}>{challengesData.length} تحدي برمجي — اختبر مهاراتك واجمع نقاط XP والشارات.</p>

      <div className="space-y-10">
        {["مبتدئ", "متوسط", "صعب"].map((level) => {
          const challenges = grouped[level] ?? [];
          if (challenges.length === 0) return null;
          const color = LEVEL_COLOR[level];
          return (
            <div key={level}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <span className="w-2 h-6 rounded-full" style={{ background: color }} />
                مستوى {level}
                <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({challenges.length} تحدي)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.map((ch) => (
                  <Link
                    key={ch.id}
                    href={`/${locale}/iot-lab/challenges/${ch.id}`}
                    className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                    style={{ border: `1px solid ${color}15`, textDecoration: "none" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{ch.level}</span>
                      <span className="flex items-center gap-1 text-xs font-mono font-bold" style={{ color }}>
                        <Star size={11} />{ch.xpReward} XP
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{ch.title}</h3>
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{ch.description}</p>
                    {ch.badgeId && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: "#fbbf24" }}>
                        <Trophy size={10} /> شارة: {ch.badgeId}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
