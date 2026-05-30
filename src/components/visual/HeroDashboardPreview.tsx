"use client";

export default function HeroDashboardPreview({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <div className="relative w-full h-[480px] flex justify-center items-center">
      {/* Main terminal card */}
      <div
        className="glass-card rounded-2xl w-full max-w-md absolute z-10 animate-float-slow shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(142,213,255,0.08)" }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--color-tertiary)" }}>⚡</span>
            <span className="font-mono text-xs" style={{ color: "var(--color-on-surface)" }}>
              Claude_Environment
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-tertiary)", opacity: 0.7 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-primary)", opacity: 0.7 }} />
          </div>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-xs space-y-1.5 dir-ltr" style={{ direction: "ltr" }}>
          <div style={{ color: "var(--color-primary)" }}>import anthropic</div>
          <div style={{ color: "var(--color-primary)" }}>from tools import deploy</div>
          <div className="opacity-0 h-2" />
          <div>
            <span style={{ color: "var(--color-secondary)" }}>client</span>
            <span style={{ color: "var(--color-on-surface-variant)" }}> = anthropic.Anthropic()</span>
          </div>
          <div>
            <span style={{ color: "var(--color-secondary)" }}>response</span>
            <span style={{ color: "var(--color-on-surface-variant)" }}> = client.messages.create(</span>
          </div>
          <div style={{ color: "var(--color-on-surface-variant)", paddingLeft: "16px" }}>
            model=<span style={{ color: "var(--color-tertiary)" }}>"claude-opus-4-5"</span>,
          </div>
          <div style={{ color: "var(--color-on-surface-variant)", paddingLeft: "16px" }}>
            messages=[{"{"}role: <span style={{ color: "var(--color-tertiary)" }}>"user"</span>{"}"}]
          </div>
          <div style={{ color: "var(--color-on-surface-variant)" }}>)</div>
          <div className="opacity-0 h-2" />
          <div className="flex items-center gap-1">
            <span style={{ color: "var(--color-tertiary)" }}>&gt;</span>
            <span
              className="animate-pulse"
              style={{ color: "var(--color-primary)", borderRight: "2px solid var(--color-primary)", paddingRight: "2px" }}
            >
              deploy.cloud_run(response)
            </span>
          </div>

          {/* Status bar */}
          <div
            className="mt-4 pt-3 border-t flex items-center gap-3"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-tertiary)" }} />
              <span className="text-xs" style={{ color: "var(--color-tertiary)" }}>Build</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80", animationDelay: "0.3s" }} />
              <span className="text-xs" style={{ color: "#4ade80" }}>Test</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
              <span className="text-xs" style={{ color: "var(--color-primary)" }}>Deploy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating metric card — progress ring */}
      <div
        className="glass-panel rounded-xl absolute -start-4 md:-start-12 top-[10%] z-20 animate-float-fast p-4"
        style={{ zIndex: 20 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" style={{ stroke: "var(--color-surface-container-high)" }} />
              <circle
                cx="18" cy="18" r="16" fill="none" strokeWidth="3"
                style={{ stroke: "var(--color-primary)" }}
                strokeDasharray="100"
                strokeDashoffset="25"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono" style={{ color: "var(--color-primary)" }}>
              75%
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "إنجاز المسار" : "Path Progress"}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              MLOps & Cloud
            </div>
          </div>
        </div>
      </div>

      {/* Floating tools card */}
      <div
        className="glass-panel rounded-xl absolute -end-4 md:-end-8 bottom-[15%] z-20 animate-float-slow p-3 delay-300"
        style={{ zIndex: 20 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ background: "rgba(87,27,193,0.3)" }}
          >
            <span style={{ color: "var(--color-secondary)" }}>🛠️</span>
          </div>
          <div>
            <div className="text-base font-bold" style={{ color: "var(--color-on-surface)" }}>
              50+ {isAr ? "أداة" : "Tools"}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "متاحة للتجربة" : "Ready to use"}
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="env-orb env-orb-blue absolute top-0 left-0 opacity-40" style={{ width: "300px", height: "300px" }} />
      <div className="env-orb env-orb-violet absolute bottom-0 right-0 opacity-30" style={{ width: "250px", height: "250px" }} />
    </div>
  );
}
