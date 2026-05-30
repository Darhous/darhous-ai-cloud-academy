import type { Metadata } from "next";
import OnboardingClient from "@/components/onboarding/OnboardingClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مرحباً بك — إعداد الحساب" : "Welcome — Account Setup",
    robots: { index: false },
  };
}

export default async function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <OnboardingClient locale={locale} />;
}
