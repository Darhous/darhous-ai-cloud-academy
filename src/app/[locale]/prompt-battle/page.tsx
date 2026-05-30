import type { Metadata } from "next";
import PromptBattleClient from "./PromptBattleClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "معركة البرومبتات" : "Prompt Battle",
    description: isAr
      ? "قارن بين برومبتين وشاهد أيهما أفضل — تحليل AI لكل معيار"
      : "Compare two prompts and see which is better — AI analysis across every criteria",
    robots: { index: true, follow: true },
  };
}

export default async function PromptBattlePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PromptBattleClient locale={locale} />;
}
