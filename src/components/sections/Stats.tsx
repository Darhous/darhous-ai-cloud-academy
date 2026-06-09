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
      className="relative overflow-hidden rounded-3xl glass-panel-promax"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative z-10 p-2">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-8 text-center transition-transform hover:scale-105 duration-300"
            style={{
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : undefined,
            }}
          >
            <div
              className="font-display font-bold text-4xl mb-2"
              style={{ color: colorMap[stat.color] ?? "var(--color-primary)", textShadow: `0 0 20px ${colorMap[stat.color]}40` }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-xs tracking-wide uppercase" style={{ color: "var(--color-on-surface-variant)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
