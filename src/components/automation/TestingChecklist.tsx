"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  id: string;
  items: string[];
}

function storageKey(id: string) {
  return `darhous:automation:checklist:${id}`;
}

function readChecked(id: string): boolean[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(id));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TestingChecklist({ id, items }: Props) {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const stored = readChecked(id);
    setChecked(items.map((_, i) => stored[i] ?? false));
  }, [id, items]);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(storageKey(id), JSON.stringify(next));
      return next;
    });
  }

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
              onClick={() => toggle(i)}
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
