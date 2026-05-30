import type { Metadata } from "next";
import ChallengesClient from "./ChallengesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تحديات AI" : "AI Challenges",
    description: isAr
      ? "شارك في تحديات الذكاء الاصطناعي — prompt، Nano Banana، Claude Code، ومشاريع حقيقية"
      : "Participate in AI challenges — prompts, Nano Banana, Claude Code, and real projects",
    robots: { index: true, follow: true },
  };
}

export default async function ChallengesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ChallengesClient locale={locale} />;
}
