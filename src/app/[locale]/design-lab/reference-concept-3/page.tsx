import Concept3 from "@/components/design-lab/reference-concept-3/Concept3";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Design Lab · Concept 3 · Arabic RTL Excellence",
};

export default async function ReferenceConcept3Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Concept3 locale={locale} />;
}
