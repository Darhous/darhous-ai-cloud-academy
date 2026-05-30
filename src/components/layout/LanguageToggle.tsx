"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  locale: string;
}

export default function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "ar" ? "en" : "ar";
    // Replace /ar/ or /en/ at the start of the path
    const newPath = pathname.replace(/^\/(ar|en)/, `/${next}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 hover:scale-105"
      style={{
        borderColor: "var(--color-outline-variant)",
        color: "var(--color-on-surface-variant)",
        background: "var(--color-surface-container)",
      }}
      aria-label="Switch language"
    >
      <Globe size={14} />
      <span>{locale === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}
