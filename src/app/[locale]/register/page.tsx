import type { Metadata } from "next";
import Link from "next/link";
import { Bot } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import { supabaseConfigured } from "@/lib/supabase/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "إنشاء حساب" : "Create Account",
    description: isAr
      ? "أنشئ حسابك في أكاديمية درهوس للذكاء الاصطناعي"
      : "Create your account at Darhous AI Cloud Academy",
    robots: { index: false },
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 font-display font-bold text-xl mb-2" style={{ color: "var(--color-primary)" }}>
            <Bot size={26} style={{ color: "var(--color-tertiary)" }} />
            {isAr ? "أكاديمية درهوس" : "Darhous AI"}
          </Link>
          <h1 className="font-display font-bold text-2xl mt-4 mb-1" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "إنشاء حساب جديد" : "Create your account"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "انضم لآلاف المتعلمين في أكاديمية درهوس"
              : "Join thousands of learners at Darhous AI Academy"}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
          }}
        >
          {supabaseConfigured ? (
            <RegisterForm locale={locale} isAr={isAr} />
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "نظام المصادقة غير مُهيأ" : "Auth not configured"}
              </h3>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr
                  ? "يجب إعداد متغيرات Supabase البيئية. راجع SUPABASE_SETUP.md."
                  : "Supabase env variables must be configured. See SUPABASE_SETUP.md."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
