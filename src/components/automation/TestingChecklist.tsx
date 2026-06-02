"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useRecipeChecklist } from "@/hooks/useAutomationProgress";

interface Props { id: string; items: string[] }

export default function TestingChecklist({ id, items }: Props) {
  const { checked, toggleItem } = useRecipeChecklist(id, items.length);

  const doneCount = checked.filter(Boolean).length;
  const total = items.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono" style={{ color: "#3ce0fb" }}>
          {doneCount}/{total} مكتمل
        </span>
        <div className="h-1.5 rounded-full flex-1 mr-3" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: total ? `${(doneCount / total) * 100}%` : "0%", background: "#3ce0fb" }}
          />
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggleItem(i)}
              className="w-full flex items-start gap-2 text-sm text-right transition-opacity hover:opacity-80"
              style={{ color: checked[i] ? "var(--color-on-surface-variant)" : "var(--color-on-surface)" }}
            >
              {checked[i]
                ? <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "#3ce0fb" }} />
                : <Circle size={15} className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }} />
              }
              <span style={{ textDecoration: checked[i] ? "line-through" : "none" }}>{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
