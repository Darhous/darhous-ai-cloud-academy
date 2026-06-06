import type { Metadata } from "next";
import Link from "next/link";
import { Bot } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { supabaseConfigured } from "@/lib/supabase/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "نسيت كلمة المرور" : "Forgot Password",
    description: isAr
      ? "إعادة تعيين كلمة مرور أكاديمية درهوس للذكاء الاصطناعي"
      : "Reset your Darhous AI Cloud Academy password",
    robots: { index: false },
  };
}

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient atmosphere — Digital Depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(60,224,251,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(142,213,255,0.04) 0%, transparent 70%)" }} />
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
            {isAr ? "نسيت كلمة المرور؟" : "Forgot your password?"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "أدخل بريدك الإلكتروني وسنرسل لك رابط الإعادة"
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
            boxShadow: "0 0 40px rgba(60,224,251,0.04)",
          }}
        >
          {supabaseConfigured ? (
            <ForgotPasswordForm locale={locale} isAr={isAr} />
          ) : (
            <SupabaseNotConfigured isAr={isAr} />
          )}
        </div>
      </div>
    </div>
  );
}

function SupabaseNotConfigured({ isAr }: { isAr: boolean }) {
  return (
    <div className="text-center py-6">
      <div className="text-4xl mb-4">⚙️</div>
      <h3
        className="font-bold text-lg mb-2"
        style={{ color: "var(--color-on-surface)" }}
      >
        {isAr ? "نظام المصادقة غير مُهيأ" : "Auth not configured"}
      </h3>
      <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "يجب إعداد متغيرات Supabase البيئية لتفعيل إعادة تعيين كلمة المرور."
          : "Supabase environment variables must be set to enable password reset."}
      </p>
    </div>
  );
}
