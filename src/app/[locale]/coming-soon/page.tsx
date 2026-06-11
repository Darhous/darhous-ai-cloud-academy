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
    title: isAr ? "بوابات قادمة" : "Future Portals",
    description: isAr ? "استكشف ما تخطط له NexaLearn في المستقبل" : "Explore what NexaLearn is planning for the future",
    robots: { index: false },
  };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const portal = getPortalById("coming-soon")!;
  return <ComingSoonPortal portal={portal} locale={locale} />;
}
