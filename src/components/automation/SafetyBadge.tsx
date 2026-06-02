"use client";

import { ShieldCheck, ShieldAlert, ShieldX, Shield } from "lucide-react";
import type { SafetyStatus } from "@/data/automation/types";

interface Props {
  status: SafetyStatus;
  notes?: string;
  className?: string;
}

const CONFIG: Record<SafetyStatus, { color: string; bg: string; border: string; icon: React.ReactNode; label: string }> = {
  "آمن": {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
    icon: <ShieldCheck size={13} />,
    label: "آمن للاستخدام",
  },
  "يحتاج مراجعة": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    icon: <ShieldAlert size={13} />,
    label: "يحتاج مراجعة",
  },
  "متقدم": {
    color: "#8ed5ff",
    bg: "rgba(142,213,255,0.08)",
    border: "rgba(142,213,255,0.2)",
    icon: <Shield size={13} />,
    label: "للمستخدم المتقدم",
  },
  "غير آمن": {
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    icon: <ShieldX size={13} />,
    label: "يحتاج احتياطات",
  },
};

export default function SafetyBadge({ status, notes, className = "" }: Props) {
  const cfg = CONFIG[status];

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      >
        {cfg.icon}
        {cfg.label}
      </span>
      {notes && (
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
          {notes}
        </p>
      )}
    </div>
  );
}
