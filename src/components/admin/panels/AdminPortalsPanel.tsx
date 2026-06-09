import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { portals as allPortals } from "@/config/portals";

interface AdminPortalsPanelProps {
  isAr: boolean;
  locale: string;
}

export const AdminPortalsPanel: React.FC<AdminPortalsPanelProps> = ({ isAr, locale }) => {
  const [portalVisibility, setPortalVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(allPortals.map((p) => [p.id, true]))
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "إدارة البوابات" : "Portal Manager"}
        </h2>
        <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
          {allPortals.filter((p) => p.status === "available").length} {isAr ? "متاح" : "live"}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {allPortals.map((portal) => (
          <div key={portal.id} className="glass-card rounded-2xl p-4 flex items-center gap-4"
            style={{ border: `1px solid ${portal.color}15` }}>
            <span className="text-2xl flex-shrink-0">{portal.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portal.titleAr : portal.titleEn}
                </p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: portal.status === "available" ? "rgba(74,222,128,0.12)" : "rgba(148,163,184,0.1)", color: portal.status === "available" ? "#4ade80" : "#94a3b8" }}>
                  {portal.status}
                </span>
                <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{portal.href}</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                {portal.features.slice(0, 3).join(" · ")}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setPortalVisibility((prev) => ({ ...prev, [portal.id]: !prev[portal.id] }))}
                title={portalVisibility[portal.id] ? "Hide" : "Show"}
                style={{ color: portalVisibility[portal.id] ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                {portalVisibility[portal.id] ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <Link href={`/${locale}${portal.href}`} target="_blank"
                className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-on-surface-variant)" }}>
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
