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
    title: isAr ? "أكاديمية الأتمتة | درهوس" : "Automation Academy | Darhous",
    description: isAr ? "تعلم الأتمتة وبناء Workflows — قريبًا" : "Learn automation and build workflows — Coming Soon",
    robots: { index: false },
  };
}

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const portal = getPortalById("automation")!;
  return <ComingSoonPortal portal={portal} locale={locale} />;
}
