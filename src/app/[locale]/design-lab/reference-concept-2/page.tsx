import Concept2 from "@/components/design-lab/reference-concept-2/Concept2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Design Lab · Concept 2 · Cinematic Enhanced",
};

export default async function ReferenceConcept2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Concept2 locale={locale} />;
}
