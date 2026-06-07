"use client";

import { useState } from "react";
import { DIGITAL_EXAMS_CMS_TYPES } from "@/lib/admin/cms-registry";
import { GenericCmsTypePanel } from "@/components/admin/cms/GenericCmsTypePanel";

/**
 * Digital Exams portal CMS — currently a single content type (exam_subjects,
 * ~9 subjects × ~100 questions each as JSONB). Kept as a sub-tab-bar wrapper
 * (rather than rendering GenericCmsTypePanel directly) so future exam content
 * types can be registered without changing the AdminDashboardClient wiring —
 * consistent with AutomationCMSPanel / IoTCMSPanel.
 */
export function ExamsCMSPanel({ isAr }: { isAr: boolean }) {
  const [activeKey, setActiveKey] = useState<string>(DIGITAL_EXAMS_CMS_TYPES[0].key);
  const active = DIGITAL_EXAMS_CMS_TYPES.find((t) => t.key === activeKey) ?? DIGITAL_EXAMS_CMS_TYPES[0];

  return (
    <div className="flex flex-col gap-6">
      {DIGITAL_EXAMS_CMS_TYPES.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {DIGITAL_EXAMS_CMS_TYPES.map((t) => (
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
      )}

      <GenericCmsTypePanel key={active.key} config={active} isAr={isAr} />
    </div>
  );
}
