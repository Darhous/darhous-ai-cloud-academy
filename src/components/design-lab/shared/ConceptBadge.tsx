"use client";

interface Props {
  number: number;
  name: string;
  locale: string;
}

export default function ConceptBadge({ number, name, locale }: Props) {
  const isAr = locale === "ar";
  return (
    <div
      className="fixed bottom-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
      style={{
        insetInlineEnd: "1rem",
        background: "rgba(142,213,255,0.08)",
        border: "1px solid rgba(142,213,255,0.2)",
        color: "var(--color-primary)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ opacity: 0.5 }}>
        {isAr ? "معاينة داخلية" : "Internal Preview"}
      </span>
      <span style={{ opacity: 0.3 }}>·</span>
      <span>
        {isAr ? `تصميم ${number}` : `Concept ${number}`}
      </span>
      <span style={{ opacity: 0.3 }}>—</span>
      <span>{name}</span>
    </div>
  );
}
