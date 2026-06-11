import Concept5 from "@/components/design-lab/reference-concept-5/Concept5";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Design Lab · Concept 5 · High-Conversion",
};

export default async function ReferenceConcept5Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Concept5 locale={locale} />;
}
