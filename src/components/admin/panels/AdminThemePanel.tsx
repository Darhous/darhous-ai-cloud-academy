import React from "react";

interface AdminThemePanelProps {
  isAr: boolean;
}

export const AdminThemePanel: React.FC<AdminThemePanelProps> = ({ isAr }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "الهوية البصرية والتصميم" : "Theme & Branding"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Colors */}
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-primary)" }}>
            {isAr ? "ألوان النظام" : "System Colors"}
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { n: "--color-primary", c: "#8ed5ff" },
              { n: "--color-secondary", c: "#d0bcff" },
              { n: "--color-tertiary", c: "#3ce0fb" },
              { n: "--color-background", c: "#0c0e12" },
            ].map((col) => (
              <div key={col.n} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: col.c, border: "1px solid rgba(255,255,255,0.1)" }} />
                <p className="text-xs font-mono flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{col.n}</p>
                <p className="text-xs font-mono" style={{ color: col.c }}>{col.c}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono mt-3" style={{ color: "var(--color-on-surface-variant)" }}>
            * {isAr ? "الألوان محددة في globals.css — Tailwind v4 CSS-based" : "Colors defined in globals.css — Tailwind v4 CSS-based"}
          </p>
        </div>

        {/* Social Links */}
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-secondary)" }}>
            {isAr ? "روابط التواصل" : "Social Links"}
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Instagram", url: "https://www.instagram.com/darhous/", c: "#E1306C" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/darhous/", c: "#0A66C2" },
              { label: "Facebook", url: "https://www.facebook.com/ahmed.darhous", c: "#1877F2" },
              { label: "WhatsApp", url: "https://wa.me/201030002331", c: "#25D366" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.c }} />
                <span className="text-xs font-mono w-20 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</span>
                <span className="text-[10px] font-mono truncate flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{s.url}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
        <h3 className="font-bold text-sm mb-3" style={{ color: "var(--color-tertiary)" }}>
          {isAr ? "نص التوقيع في الفوتر" : "Footer Signature"}
        </h3>
        <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
          designed by{" "}
          <a href="mailto:ahmeddarhous@gmail.com" style={{ color: "var(--color-primary)" }}>Ahmed Darhous</a>
          {" "}©
        </p>
      </div>
    </div>
  );
};
