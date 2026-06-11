"use client";

import { useState, useId } from "react";
import { Mail, Sparkles, CheckCircle, ChevronDown } from "lucide-react";

type Variant = "hero" | "compact" | "footer";

interface CommunitySignupProps {
  locale: string;
  variant?: Variant;
  source?: string;
}

const LEVELS = [
  { value: "beginner",     ar: "مبتدئ",  en: "Beginner"     },
  { value: "intermediate", ar: "متوسط",  en: "Intermediate" },
  { value: "advanced",     ar: "متقدم",  en: "Advanced"     },
];

const INTERESTS = [
  { value: "AI Tools",             en: "AI Tools",             ar: "أدوات AI"               },
  { value: "Claude Code",          en: "Claude Code",          ar: "Claude Code"            },
  { value: "Prompt Engineering",   en: "Prompt Engineering",   ar: "هندسة البرومبتات"       },
  { value: "Gemini Nano Banana",   en: "Gemini Nano Banana",   ar: "Gemini Nano Banana"     },
  { value: "Cloud",                en: "Cloud",                ar: "الكلاود"                },
  { value: "Projects",             en: "Projects",             ar: "المشاريع العملية"        },
  { value: "All Updates",          en: "All Updates",          ar: "جميع التحديثات"         },
];

export default function CommunitySignup({ locale, variant = "hero", source = "website" }: CommunitySignupProps) {
  const isAr = locale === "ar";
  const uid = useId();

  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // SSR-safe joined check
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  // Check localStorage on mount (client only)
  const checkJoined = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("community_joined") === "1";
    }
    return false;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checkJoined()) { setAlreadyJoined(true); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg(isAr ? "البريد الإلكتروني غير صحيح" : "Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/community/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          level: level || undefined,
          interest: interest || undefined,
          source,
          locale,
        }),
      });
      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          localStorage.setItem("community_joined", "1");
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? (isAr ? "حدث خطأ، حاول مجدداً" : "Something went wrong. Please try again."));
        setStatus("error");
      }
    } catch {
      setErrorMsg(isAr ? "تعذّر الاتصال بالخادم" : "Connection error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success" || alreadyJoined) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-6 px-6 rounded-2xl text-center"
        style={{
          background: "rgba(74,222,128,0.07)",
          border: "1px solid rgba(74,222,128,0.2)",
        }}
      >
        <CheckCircle size={32} style={{ color: "#4ade80" }} />
        <p className="font-semibold text-base" style={{ color: "var(--color-on-surface)" }}>
          {isAr
            ? "تم تسجيلك بنجاح في مجتمع NexaLearn."
            : "You have joined the NexaLearn AI Community successfully."}
        </p>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "راقب بريدك للتحديثات القادمة."
            : "Watch your inbox for future updates."}
        </p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs font-mono tracking-wide uppercase" style={{ color: "var(--color-tertiary)" }}>
          {isAr ? "مجتمع NexaLearn" : "NexaLearn Community"}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor={`${uid}-email-footer`} className="sr-only">
            {isAr ? "البريد الإلكتروني" : "Email address"}
          </label>
          <input
            id={`${uid}-email-footer`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isAr ? "بريدك الإلكتروني" : "Your email"}
            required
            className="flex-1 min-w-0 px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-3 py-2 rounded-xl text-sm font-mono font-semibold shrink-0 transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ background: "var(--color-tertiary)", color: "#000" }}
          >
            {status === "loading" ? "..." : (isAr ? "انضم" : "Join")}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs" style={{ color: "#f87171" }}>{errorMsg}</p>
        )}
        <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
          {isAr ? "لن نرسل رسائل مزعجة أبداً." : "No spam, ever."}
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className="rounded-2xl p-5 flex flex-col gap-4"
        style={{
          background: "rgba(60,224,251,0.04)",
          border: "1px solid rgba(60,224,251,0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <Mail size={16} style={{ color: "var(--color-tertiary)" }} />
          <span className="font-mono text-xs tracking-wider uppercase" style={{ color: "var(--color-tertiary)" }}>
            {isAr ? "مجتمع NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Community"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor={`${uid}-email-compact`} className="sr-only">
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <input
            id={`${uid}-email-compact`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"}
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2.5 rounded-xl text-sm font-mono font-bold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--color-tertiary)", color: "#000" }}
          >
            {status === "loading"
              ? (isAr ? "جارٍ التسجيل..." : "Joining...")
              : (isAr ? "انضم الآن" : "Join Now")}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-center" style={{ color: "#f87171" }}>{errorMsg}</p>
        )}
      </div>
    );
  }

  // Hero variant — full featured
  return (
    <div
      className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(60,224,251,0.08) 0%, rgba(142,213,255,0.05) 50%, rgba(208,188,255,0.07) 100%)",
        border: "1px solid rgba(60,224,251,0.15)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px", height: "400px",
          top: "-100px", right: "-100px",
          background: "radial-gradient(circle, rgba(60,224,251,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "300px", height: "300px",
          bottom: "-80px", left: "-80px",
          background: "radial-gradient(circle, rgba(208,188,255,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(60,224,251,0.12)", border: "1px solid rgba(60,224,251,0.25)" }}
          >
            <Sparkles size={18} style={{ color: "var(--color-tertiary)" }} />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "مجتمع NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Community"}
            </p>
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "مجتمع NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Community"}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "انضم ليصلك أسبوعيًا أفضل أدوات الذكاء الاصطناعي، برومبتات Claude، تريندات Gemini Nano Banana، مشاريع عملية، ومسارات تعلم وتحديثات المنصة."
            : "Join to receive weekly AI tools, Claude prompts, Gemini Nano Banana trends, practical projects, learning paths, and platform updates."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Email */}
            <div className="md:col-span-1">
              <label htmlFor={`${uid}-email-hero`} className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "البريد الإلكتروني *" : "Email *"}
              </label>
              <input
                id={`${uid}-email-hero`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? "your@email.com" : "your@email.com"}
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
              />
            </div>

            {/* Level */}
            <div className="relative">
              <label htmlFor={`${uid}-level`} className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "مستواك" : "Your level"}
              </label>
              <select
                id={`${uid}-level`}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: level ? "var(--color-on-surface)" : "var(--color-on-surface-variant)",
                }}
              >
                <option value="">{isAr ? "اختر مستواك (اختياري)" : "Select level (optional)"}</option>
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{isAr ? l.ar : l.en}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute top-[38px] end-3 pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }} />
            </div>

            {/* Interest */}
            <div className="relative">
              <label htmlFor={`${uid}-interest`} className="block text-xs font-mono mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "اهتمامك الرئيسي" : "Main interest"}
              </label>
              <select
                id={`${uid}-interest`}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: interest ? "var(--color-on-surface)" : "var(--color-on-surface-variant)",
                }}
              >
                <option value="">{isAr ? "اختر اهتمامك (اختياري)" : "Select interest (optional)"}</option>
                {INTERESTS.map((i) => (
                  <option key={i.value} value={i.value}>{isAr ? i.ar : i.en}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute top-[38px] end-3 pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="glow-button-primary font-mono font-bold px-8 py-3 rounded-xl text-sm inline-flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
              style={{ color: "#fff" }}
            >
              <Sparkles size={15} />
              {status === "loading"
                ? (isAr ? "جارٍ التسجيل..." : "Joining...")
                : (isAr ? "انضم الآن" : "Join Now")}
            </button>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}>
              {isAr
                ? "لن نرسل رسائل مزعجة. نستخدم بريدك فقط لتحديثات المنصة والمحتوى التعليمي."
                : "No spam. Your email is used only for platform updates and educational content."}
            </p>
          </div>

          {status === "error" && (
            <p className="text-sm" style={{ color: "#f87171" }}>{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
