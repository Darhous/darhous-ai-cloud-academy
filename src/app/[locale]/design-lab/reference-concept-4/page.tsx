import Concept4 from "@/components/design-lab/reference-concept-4/Concept4";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Design Lab · Concept 4 · SaaS Education Platform",
};

export default async function ReferenceConcept4Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Concept4 locale={locale} />;
}
