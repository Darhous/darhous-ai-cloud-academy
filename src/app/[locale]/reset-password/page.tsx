import type { Metadata } from "next";
import Link from "next/link";
import { Bot } from "lucide-react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { supabaseConfigured } from "@/lib/supabase/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "إعادة تعيين كلمة المرور" : "Reset Password",
    robots: { index: false },
  };
}

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient atmosphere — Digital Depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(142,213,255,0.07) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(74,222,128,0.04) 0%, transparent 70%)" }} />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-display font-bold text-xl mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            <Bot size={26} style={{ color: "var(--color-tertiary)" }} />
            {isAr ? "أكاديمية درهوس" : "Darhous AI"}
          </Link>
          <h1
            className="font-display font-bold text-2xl mt-4 mb-1"
            style={{ color: "var(--color-on-surface)" }}
          >
            {isAr ? "تعيين كلمة مرور جديدة" : "Set a new password"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "اختر كلمة مرور قوية لحسابك"
              : "Choose a strong password for your account"}
          </p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
            boxShadow: "0 0 40px rgba(74,222,128,0.04)",
          }}
        >
          {supabaseConfigured ? (
            <ResetPasswordForm locale={locale} isAr={isAr} />
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "var(--color-on-surface)" }}
              >
                {isAr ? "نظام المصادقة غير مُهيأ" : "Auth not configured"}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
