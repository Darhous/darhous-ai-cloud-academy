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
    title: isAr ? "معمل Arduino وIoT | درهوس" : "Arduino & IoT Lab | Darhous",
    description: isAr ? "مشاريع أردوينو وإنترنت الأشياء — قريبًا" : "Arduino projects and IoT — Coming Soon",
    robots: { index: false },
  };
}

export default async function IotLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const portal = getPortalById("iot-lab")!;
  return <ComingSoonPortal portal={portal} locale={locale} />;
}
