import type { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "لوحة المتصدرين" : "Leaderboard",
    description: isAr
      ? "أفضل المتعلمين في أكاديمية درهوس — سلاسل التعلم والدورات المكتملة ونقاط التحديات"
      : "Top learners at Darhous Academy — learning streaks, completed courses, and challenge points",
    robots: { index: true, follow: true },
  };
}

export default async function LeaderboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LeaderboardClient locale={locale} />;
}
