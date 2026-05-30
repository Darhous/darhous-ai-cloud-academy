import type { Metadata } from "next";
import ProfileSettingsClient from "@/components/profile/ProfileSettingsClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "إعدادات الحساب" : "Account Settings",
    description: isAr ? "إدارة ملفك الشخصي وتفضيلات التعلم" : "Manage your profile and learning preferences",
    robots: { index: false },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ProfileSettingsClient locale={locale} />;
}
