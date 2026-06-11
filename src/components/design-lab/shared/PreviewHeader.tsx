"use client";

import Link from "next/link";

interface Props {
  locale: string;
  conceptNumber: number;
  conceptName: string;
}

export default function PreviewHeader({ locale, conceptNumber, conceptName }: Props) {
  const isAr = locale === "ar";
  return (
    <div
      className="w-full flex items-center justify-between px-4 py-2 text-xs font-mono"
      style={{
        background: "rgba(251,191,36,0.04)",
        borderBottom: "1px solid rgba(251,191,36,0.08)",
        color: "rgba(251,191,36,0.6)",
      }}
    >
      <span>
        {isAr
          ? `معاينة داخلية — تصميم ${conceptNumber}: ${conceptName}`
          : `Internal Preview — Concept ${conceptNumber}: ${conceptName}`}
      </span>
      <Link
        href={`/${locale}/design-lab`}
        style={{ color: "rgba(251,191,36,0.5)" }}
        className="hover:opacity-100 transition-opacity"
      >
        {isAr ? "← كل التصميمات" : "All Concepts →"}
      </Link>
    </div>
  );
}
