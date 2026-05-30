"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

interface Props {
  locale: string;
}

export default function MentorFloatingButton({ locale }: Props) {
  const pathname = usePathname();
  const isAr = locale === "ar";

  if (pathname.includes("/mentor")) return null;

  return (
    <Link
      href={`/${locale}/mentor`}
      className="fixed z-40 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
      style={{
        bottom: "24px",
        [isAr ? "left" : "right"]: "24px",
        background: "linear-gradient(135deg, rgba(142,213,255,0.12), rgba(208,188,255,0.12))",
        border: "1px solid rgba(142,213,255,0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(142,213,255,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      title={isAr ? "مرشد درهوس للذكاء الاصطناعي" : "Darhous AI Mentor"}
    >
      <Sparkles size={15} style={{ color: "var(--color-primary)" }} />
      <span
        className="text-xs font-medium hidden sm:block"
        style={{ color: "var(--color-primary)" }}
      >
        {isAr ? "مرشد AI" : "AI Mentor"}
      </span>
    </Link>
  );
}
