"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  locale: string;
  isAr: boolean;
}

export default function ResetPasswordForm({ locale, isAr }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setHasSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError(
        isAr
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل."
          : "Password must be at least 6 characters."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError(
        isAr
          ? "كلمتا المرور غير متطابقتين."
          : "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError(isAr ? "Supabase غير مُهيأ." : "Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push(`/${locale}/dashboard`), 2500);
  }

  const inputStyle = {
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
  };

  if (hasSession === null) {
    return (
      <div className="flex justify-center py-10">
        <span
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{
            borderColor: "var(--color-outline-variant)",
            borderTopColor: "var(--color-primary)",
          }}
        />
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-4">🔗</div>
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? "الرابط منتهي الصلاحية" : "Link expired or invalid"}
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? "انتهت صلاحية رابط إعادة تعيين كلمة المرور. يرجى طلب رابط جديد."
            : "This password reset link has expired. Please request a new one."}
        </p>
        <Link
          href={`/${locale}/forgot-password`}
          className="glow-button-primary text-white font-mono py-2.5 px-6 rounded-xl inline-flex items-center gap-2 text-sm"
        >
          {isAr ? "طلب رابط جديد" : "Request new link"}
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div
        className="text-center px-4 py-10 rounded-2xl"
        style={{
          background: "rgba(74,222,128,0.07)",
          border: "1px solid rgba(74,222,128,0.2)",
        }}
      >
        <div className="text-4xl mb-3">✅</div>
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? "تم تغيير كلمة المرور!" : "Password updated!"}
        </h3>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "جاري توجيهك إلى لوحة التحكم..."
            : "Redirecting you to your dashboard..."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          className="block text-sm font-mono mb-2"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? "كلمة المرور الجديدة" : "New Password"}
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute top-1/2 -translate-y-1/2 start-3"
            style={{ color: "var(--color-on-surface-variant)" }}
          />
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

      <div>
        <label
          className="block text-sm font-mono mb-2"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? "تأكيد كلمة المرور" : "Confirm Password"}
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute top-1/2 -translate-y-1/2 start-3"
            style={{ color: "var(--color-on-surface-variant)" }}
          />
          <input
            type={showPw ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
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
        disabled={loading || !password || !confirmPassword}
        className="glow-button-primary text-white font-mono py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <KeyRound size={16} />
        )}
        {isAr ? "تعيين كلمة المرور الجديدة" : "Set New Password"}
      </button>
    </form>
  );
}
