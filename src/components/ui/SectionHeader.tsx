interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  locale?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  locale: _locale,
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-start items-start",
    center: "text-center items-center",
    right: "text-end items-end",
  }[align];

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {badge && (
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider w-max"
          style={{
            background: "rgba(142,213,255,0.08)",
            borderColor: "rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--color-tertiary)" }} />
          {badge}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--color-on-surface)" }}>
        {titleHighlight ? (
          <>
            {title.split(titleHighlight)[0]}
            <span className="gradient-text">{titleHighlight}</span>
            {title.split(titleHighlight)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-lg max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
