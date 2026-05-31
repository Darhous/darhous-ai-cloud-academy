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
    title: isAr ? "بوابات قادمة | درهوس" : "Future Portals | Darhous",
    description: isAr ? "استكشف ما تخطط له منصة درهوس في المستقبل" : "Explore what Darhous is planning for the future",
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
