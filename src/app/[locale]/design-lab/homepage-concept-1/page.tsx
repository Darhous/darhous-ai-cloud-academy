import React from "react";
import HomePageConcept from "@/components/design-lab/homepage-concept-1/HomePageConcept";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexaLearn - Concept 1: AI Command Center",
  description: "Futuristic AI learning operating system homepage concept.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Concept1Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePageConcept locale={locale} />;
}
