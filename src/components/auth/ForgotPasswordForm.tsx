"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, SendHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  locale: string;
  isAr: boolean;
}

export default function ForgotPasswordForm({ locale, isAr }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError(isAr ? "Supabase غير مُهيأ." : "Supabase is not configured.");
      setLoading(false);
      return;
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${siteUrl}/auth/callback?type=recovery&locale=${locale}`,
      }
    );

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  const inputStyle = {
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
  };

  if (sent) {
    return (
      <div
        className="text-center px-4 py-10 rounded-2xl"
        style={{
          background: "rgba(74,222,128,0.07)",
          border: "1px solid rgba(74,222,128,0.2)",
        }}
      >
        <div className="text-4xl mb-3">📬</div>
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? "تم إرسال الرابط!" : "Check your inbox!"}
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? `أرسلنا رابط إعادة تعيين كلمة المرور إلى ${email}`
            : `We sent a password reset link to ${email}`}
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}
        >
          {isAr
            ? "لم تصلك الرسالة؟ تحقق من مجلد الرسائل المزعجة."
            : "Didn't receive it? Check your spam folder."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            className="block text-sm font-mono mb-2"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute top-1/2 -translate-y-1/2 start-3"
              style={{ color: "var(--color-on-surface-variant)" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full ps-9 pe-4 py-3 rounded-xl outline-none text-sm"
              style={inputStyle}
              dir="ltr"
            />
          </div>
        </div>

        {error && (
          <p
            className="text-xs px-3 py-2 rounded-lg"
            style={{
              background: "rgba(255,100,100,0.07)",
              border: "1px solid rgba(255,100,100,0.2)",
              color: "#ff7070",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="glow-button-primary text-white font-mono py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <SendHorizontal size={16} />
          )}
          {isAr ? "إرسال رابط الإعادة" : "Send Reset Link"}
        </button>
      </form>

      <p
        className="text-center text-sm"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {isAr ? "تذكرت كلمة المرور؟" : "Remember your password?"}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-semibold transition-opacity hover:opacity-80"
          style={{ color: "var(--color-primary)" }}
        >
          {isAr ? "تسجيل الدخول" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
