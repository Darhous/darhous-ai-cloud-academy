"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import OAuthButtons from "./OAuthButtons";

interface Props {
  locale: string;
  isAr: boolean;
}

export default function LoginForm({ locale, isAr }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
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

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(
        isAr
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
          : "Invalid email or password."
      );
      setLoading(false);
      return;
    }

    // Check role and redirect
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "admin") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}/dashboard`);
      }
      router.refresh();
    }

    setLoading(false);
  }

  const inputStyle = {
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* OAuth */}
      <OAuthButtons locale={locale} isAr={isAr} />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--color-outline-variant)" }} />
        <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "أو" : "or"}
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--color-outline-variant)" }} />
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "كلمة المرور" : "Password"}
            </label>
            <Link
              href={`/${locale}/forgot-password`}
              className="text-xs transition-opacity hover:opacity-80"
              style={{ color: "var(--color-primary)" }}
            >
              {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
            </Link>
          </div>
          <div className="relative">
            <Lock size={15} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--color-on-surface-variant)" }} />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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
          disabled={loading || !email || !password}
          className="glow-button-primary text-white font-mono py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <LogIn size={16} />
          )}
          {isAr ? "الدخول بالبريد الإلكتروني" : "Sign in with Email"}
        </button>
      </form>

      <p className="text-center text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
        <Link
          href={`/${locale}/register`}
          className="font-semibold transition-opacity hover:opacity-80"
          style={{ color: "var(--color-primary)" }}
        >
          {isAr ? "إنشاء حساب" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
