import type { Metadata } from "next";
import Link from "next/link";
import { Bot } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { supabaseConfigured } from "@/lib/supabase/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تسجيل الدخول" : "Sign In",
    description: isAr
      ? "تسجيل الدخول إلى NexaLearn"
      : "Sign in to NexaLearn",
    robots: { index: false },
  };
}

export default async function LoginPage({
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
      <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(208,188,255,0.05) 0%, transparent 70%)" }} />
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 font-display font-bold text-xl mb-2" style={{ color: "var(--color-primary)" }}>
            <Bot size={26} style={{ color: "var(--color-tertiary)" }} />
            {isAr ? "NexaLearn" : "NexaLearn"}
          </Link>
          <h1 className="font-display font-bold text-2xl mt-4 mb-1" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "تسجيل الدخول إلى NexaLearn" : "Sign in to NexaLearn"}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "ادخل وابدأ رحلتك التعليمية"
              : "Welcome back to your learning journey"}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "var(--color-surface-container)",
            border: "1px solid var(--color-outline-variant)",
            boxShadow: "0 0 40px rgba(142,213,255,0.04)",
          }}
        >
          {supabaseConfigured ? (
            <LoginForm locale={locale} isAr={isAr} />
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
      <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "نظام المصادقة غير مُهيأ" : "Auth not configured"}
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? "يجب إعداد متغيرات Supabase البيئية لتفعيل تسجيل الدخول. راجع SUPABASE_SETUP.md."
          : "Supabase environment variables must be set to enable login. See SUPABASE_SETUP.md."}
      </p>
      <div
        className="text-xs font-mono text-start px-4 py-3 rounded-xl"
        style={{ background: "rgba(0,0,0,0.2)", color: "var(--color-on-surface-variant)" }}
      >
        NEXT_PUBLIC_SUPABASE_URL<br />
        NEXT_PUBLIC_SUPABASE_ANON_KEY
      </div>
    </div>
  );
}
