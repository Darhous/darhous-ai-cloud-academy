"use client";

import { createClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

interface Props {
  locale: string;
  isAr: boolean;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app";

export default function OAuthButtons({ locale, isAr }: Props) {
  const redirectTo = `${siteUrl}/auth/callback?locale=${locale}`;

  async function signInWithGoogle() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-98"
        style={{
          background: "var(--color-surface-container)",
          border: "1px solid var(--color-outline-variant)",
          color: "var(--color-on-surface)",
        }}
      >
        <FcGoogle size={20} />
        {isAr ? "المتابعة باستخدام Google" : "Continue with Google"}
      </button>
    </div>
  );
}
