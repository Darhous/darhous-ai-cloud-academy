import type { Metadata } from "next";
import MentorPageClient from "./MentorPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مرشد درهوس للذكاء الاصطناعي" : "Darhous AI Mentor",
    description: isAr
      ? "مساعدك الذكي الشخصي لتعلم الذكاء الاصطناعي — اسأل، تعلم، راجع كودك، وخطط مسيرتك المهنية"
      : "Your personal AI mentor — ask questions, learn AI concepts, review code, and plan your career",
  };
}

export default async function MentorPage({ params }: PageProps) {
  const { locale } = await params;
  return <MentorPageClient locale={locale} />;
}
