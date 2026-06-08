import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Trophy, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { challengesData } from "@/data/iot/challenges";
import type { Challenge } from "@/data/iot/challenges";
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenges = await fetchAllChallenges();
  const ch = challenges.find((c) => c.id === slug);
  if (!ch) return { title: "Not Found" };
  return { title: `${ch.title} | مختبر درهوس`, description: ch.description };
}

export async function generateStaticParams() {
  return challengesData.map((c) => ({ slug: c.id }));
}

const LEVEL_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171" };

export default async function IotChallengeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const challenges = await fetchAllChallenges();
  const ch = challenges.find((c) => c.id === slug);
  if (!ch) notFound();

  const color = LEVEL_COLOR[ch.level] ?? "#f97316";

  return (
    <div className="container-xl py-12 max-w-3xl" dir="rtl">
      <Link href={`/${locale}/iot-lab/challenges`} className="inline-flex items-center gap-2 text-sm font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
        <ArrowRight size={14} />العودة للتحديات
      </Link>

      <div className="glass-card rounded-3xl p-8 mb-8" style={{ border: `1px solid ${color}20` }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{ch.level}</span>
          <span className="flex items-center gap-1.5 text-sm font-bold font-mono" style={{ color }}>
            <Star size={14} />{ch.xpReward} XP
          </span>
          {ch.badgeId && (
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#fbbf24" }}>
              <Trophy size={12} /> شارة: {ch.badgeId}
            </span>
          )}
        </div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--color-on-surface)" }}>{ch.title}</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{ch.description}</p>
      </div>

      <div className="glass-card rounded-2xl p-6" style={{ border: `1px solid ${color}12` }}>
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color }}>
          <CheckCircle2 size={16} /> متطلبات إتمام التحدي
        </h2>
        <ol className="space-y-3">
          {ch.tasks.map((task, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{i + 1}</span>
              {task}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href={`/${locale}/iot-lab/lessons`} className="flex-1 text-center py-3 rounded-xl text-sm font-medium transition-all" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
          مراجعة الدروس
        </Link>
        <Link href={`/${locale}/iot-lab/simulator`} className="flex-1 text-center py-3 rounded-xl text-sm font-medium transition-all" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
          جرّب في المحاكي
        </Link>
      </div>
    </div>
  );
}
