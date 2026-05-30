import type { Metadata } from "next";
import StudentDashboardClient from "@/components/dashboard/StudentDashboardClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "لوحة الطالب" : "Student Dashboard",
    description: isAr
      ? "مركز تحكم التعلم الشخصي — تابع تقدمك، برومبتاتك، ونتائجك."
      : "Personal learning command center — track your progress, prompts, and results.",
    robots: { index: false },
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentDashboardClient locale={locale} />;
}
