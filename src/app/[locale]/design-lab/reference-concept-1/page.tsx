import Concept1 from "@/components/design-lab/reference-concept-1/Concept1";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Design Lab · Concept 1 · Reference Faithful",
};

export default async function ReferenceConcept1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Concept1 locale={locale} />;
}
