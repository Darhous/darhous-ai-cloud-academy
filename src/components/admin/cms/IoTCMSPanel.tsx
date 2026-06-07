"use client";

import { useState } from "react";
import { IOT_CMS_TYPES } from "@/lib/admin/cms-registry";
import { GenericCmsTypePanel } from "@/components/admin/cms/GenericCmsTypePanel";

/**
 * IoT Lab portal CMS — internal sub-tab bar over the 10 IoT content types
 * (components, code examples, projects, lessons, challenges, simulators,
 * paths, roadmaps, exams, troubleshooting). See AutomationCMSPanel for the
 * shared rationale; styling matches it 1:1 (just a different active-tab
 * accent isn't needed — same primary token keeps visual consistency).
 */
export function IoTCMSPanel({ isAr }: { isAr: boolean }) {
  const [activeKey, setActiveKey] = useState<string>(IOT_CMS_TYPES[0].key);
  const active = IOT_CMS_TYPES.find((t) => t.key === activeKey) ?? IOT_CMS_TYPES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 flex-wrap">
        {IOT_CMS_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveKey(t.key)}
            className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer"
            style={{
              background: activeKey === t.key ? "rgba(142,213,255,0.18)" : "rgba(255,255,255,0.04)",
              color: activeKey === t.key ? "var(--color-primary)" : "var(--color-on-surface-variant)",
              border: `1px solid ${activeKey === t.key ? "rgba(142,213,255,0.4)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      <GenericCmsTypePanel key={active.key} config={active} isAr={isAr} />
    </div>
  );
}
