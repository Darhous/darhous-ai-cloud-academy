import type { Metadata } from "next";
import CertificatesClient from "./CertificatesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "شهاداتي" : "My Certificates",
    description: isAr
      ? "استعرض شهاداتك المكتسبة من دورات أكاديمية درهوس واطبعها أو شاركها"
      : "View your earned certificates from Darhous Academy courses, print or share them",
    robots: { index: false, follow: false },
  };
}

export default async function CertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CertificatesClient locale={locale} />;
}
