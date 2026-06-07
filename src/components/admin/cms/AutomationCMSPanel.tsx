"use client";

import { useState } from "react";
import { AUTOMATION_CMS_TYPES } from "@/lib/admin/cms-registry";
import { GenericCmsTypePanel } from "@/components/admin/cms/GenericCmsTypePanel";

/**
 * Automation portal CMS — internal sub-tab bar over the 11 Automation
 * content types (paths, tools, case studies, checklists, comparisons,
 * glossary, labs, services, use cases, prompts, workflows), each rendered
 * generically by GenericCmsTypePanel from its CmsTypeConfig.
 *
 * Mirrors the sub-tab bar styling already used by the Nano Banana tab
 * (AdminDashboardClient.tsx ~L2310) — same className/color-token pattern,
 * just keyed off the registry instead of a hand-written list.
 */
export function AutomationCMSPanel({ isAr }: { isAr: boolean }) {
  const [activeKey, setActiveKey] = useState<string>(AUTOMATION_CMS_TYPES[0].key);
  const active = AUTOMATION_CMS_TYPES.find((t) => t.key === activeKey) ?? AUTOMATION_CMS_TYPES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 flex-wrap">
        {AUTOMATION_CMS_TYPES.map((t) => (
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
