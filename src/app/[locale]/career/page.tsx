import type { Metadata } from "next";
import ComingSoonPortal from "@/components/ecosystem/ComingSoonPortal";
import { getPortalById } from "@/config/portals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "بوابة التوظيف والسيرة الذاتية | درهوس" : "Career & CV Portal | Darhous",
    description: isAr ? "صانع سيرة ذاتية، ATS، مطابقة وظائف — قريبًا" : "CV builder, ATS, job matching — Coming Soon",
    robots: { index: false },
  };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const portal = getPortalById("career")!;
  return <ComingSoonPortal portal={portal} locale={locale} />;
}
