import { STATS } from "@/lib/constants";

interface StatsProps {
  locale: string;
}

const colorMap: Record<string, string> = {
  primary:   "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary:  "var(--color-tertiary)",
};

export default function Stats({ locale }: StatsProps) {
  const isAr = locale === "ar";
  const stats = isAr ? STATS.ar : STATS.en;

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "var(--color-surface-container)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative z-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-6 text-center"
            style={{
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : undefined,
            }}
          >
            <div
              className="font-display font-bold text-3xl mb-1"
              style={{ color: colorMap[stat.color] ?? "var(--color-primary)" }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
