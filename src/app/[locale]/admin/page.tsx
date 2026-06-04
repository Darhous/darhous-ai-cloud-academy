import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { getServerSession } from "@/lib/auth/session";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "لوحة الإدارة" : "Admin Dashboard",
    description: isAr ? "لوحة تحكم المشرف — إدارة المستخدمين والمحتوى." : "Admin control panel — manage users and content.",
    robots: { index: false, follow: false },
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { profile } = await getServerSession();

  if (!profile || profile.role !== "admin") {
    redirect(`/${locale}/login?next=/${locale}/admin`);
  }

  return <AdminDashboardClient locale={locale} />;
}
