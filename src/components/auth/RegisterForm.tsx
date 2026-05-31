"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import OAuthButtons from "./OAuthButtons";

interface Props {
  locale: string;
  isAr: boolean;
}

export default function RegisterForm({ locale, isAr }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError(isAr ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل." : "Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError(isAr ? "Supabase غير مُهيأ." : "Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim(), locale },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback?locale=${locale}`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Fire-and-forget welcome email
    fetch("/api/email/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), name: fullName.trim(), locale }),
    }).catch(() => {});

    setTimeout(() => router.push(`/${locale}/dashboard`), 2000);
  }

  const inputStyle = {
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
  };

  if (success) {
    return (
      <div
        className="text-center px-4 py-10 rounded-2xl"
        style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}
      >
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تم إنشاء حسابك!" : "Account created!"}
        </h3>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "تحقق من بريدك الإلكتروني لتأكيد الحساب."
            : "Check your email to confirm your account."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <OAuthButtons locale={locale} isAr={isAr} />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--color-outline-variant)" }} />
        <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "أو أنشئ حسابًا" : "or create account"}
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--color-outline-variant)" }} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full name */}
        <div>
          <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "الاسم الكامل" : "Full Name"}
          </label>
          <div className="relative">
            <User size={15} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder={isAr ? "اسمك الكامل" : "Your full name"}
              className="w-full ps-9 pe-4 py-3 rounded-xl outline-none text-sm"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <div className="relative">
            <Mail size={15} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
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

        {/* Password */}
        <div>
          <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "كلمة المرور" : "Password"}
          </label>
          <div className="relative">
            <Lock size={15} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="min 6 characters"
              className="w-full ps-9 pe-10 py-3 rounded-xl outline-none text-sm"
              style={inputStyle}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute top-1/2 -translate-y-1/2 end-3 p-1 rounded hover:opacity-70"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(255,100,100,0.07)", border: "1px solid rgba(255,100,100,0.2)", color: "#ff7070" }}>
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password || !fullName}
          className="glow-button-primary text-white font-mono py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <UserPlus size={16} />
          )}
          {isAr ? "إنشاء الحساب" : "Create Account"}
        </button>
      </form>

      <p className="text-xs text-center" style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}>
        {isAr
          ? "بإنشاء حساب، أنت توافق على شروط الخدمة وسياسة الخصوصية."
          : "By creating an account, you agree to our Terms of Service and Privacy Policy."}
      </p>

      <p className="text-center text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
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
