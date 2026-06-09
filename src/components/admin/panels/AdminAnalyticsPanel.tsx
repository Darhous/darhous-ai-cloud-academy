"use client";

import React from "react";
import { Users, BarChart2, Globe, MessageSquare } from "lucide-react";
import { portals as allPortals } from "@/config/portals";
import { StatCard } from "../AdminDashboardClient";

interface AdminAnalyticsPanelProps {
  isAr: boolean;
  users: unknown[];
  subscribers: unknown[];
  messages: unknown[];
  analyticsTotal: number;
  analyticsLoading: boolean;
  analyticsData: { portal: string; count: number }[];
  analyticsEventCounts: { name: string; count: number }[];
}

export function AdminAnalyticsPanel({
  isAr,
  users,
  subscribers,
  messages,
  analyticsTotal,
  analyticsLoading,
  analyticsData,
  analyticsEventCounts,
}: AdminAnalyticsPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "تحليلات المنصة" : "Platform Analytics"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Users size={20} />} value={users.length} label={isAr ? "مستخدمون كلي" : "Total Users"} color="var(--color-primary)" />
        <StatCard icon={<BarChart2 size={20} />} value={subscribers.length} label={isAr ? "مشتركو النشرة" : "Newsletter Subs"} color="var(--color-secondary)" />
        <StatCard icon={<Globe size={20} />} value={`${allPortals.filter((p) => p.status === "available").length}/7`} label={isAr ? "بوابات مفعّلة" : "Active Portals"} color="#4ade80" />
        <StatCard icon={<MessageSquare size={20} />} value={messages.length} label={isAr ? "رسائل التواصل" : "Contact Messages"} color="#f59e0b" />
      </div>
      <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "نشاط البوابات (analytics_events)" : "Portal Activity (analytics_events)"}
          </h3>
          {analyticsTotal >= 0 && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
              {analyticsTotal} {isAr ? "حدث إجمالي" : "total events"}
            </span>
          )}
        </div>

        {analyticsLoading ? (
          <p className="text-xs font-mono text-center py-4" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
        ) : analyticsTotal === 0 ? (
          <div className="text-center py-6">
            <p className="text-2xl mb-2">📊</p>
            <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "لا توجد أحداث مسجّلة بعد. ستظهر بيانات حقيقية هنا عند بدء المستخدمين التفاعل." : "No events recorded yet. Real data will appear here as users interact with the platform."}
            </p>
          </div>
        ) : analyticsData.length > 0 ? (
          <div className="flex flex-col gap-3">
            {(() => {
              const maxCount = analyticsData[0]?.count ?? 1;
              return analyticsData.slice(0, 8).map(({ portal, count }) => {
                const portalMeta = allPortals.find((p) => p.id === portal);
                const pct = Math.round((count / maxCount) * 100);
                const color = portalMeta?.color ?? "#8ed5ff";
                return (
                  <div key={portal} className="flex items-center gap-3">
                    <span className="text-base flex-shrink-0">{portalMeta?.icon ?? "📊"}</span>
                    <p className="text-xs flex-shrink-0 w-32 truncate" style={{ color: "var(--color-on-surface)" }}>
                      {portalMeta ? (isAr ? portalMeta.titleAr : portalMeta.titleEn) : portal}
                    </p>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="text-xs font-mono flex-shrink-0 w-10 text-right" style={{ color }}>{count}</span>
                  </div>
                );
              });
            })()}
          </div>
        ) : null}

        {/* Event breakdown */}
        {analyticsEventCounts.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-mono mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "الأحداث الأكثر شيوعًا" : "Top Events"}
            </p>
            <div className="flex flex-wrap gap-2">
              {analyticsEventCounts.slice(0, 10).map(({ name, count }) => (
                <span key={name} className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {name} <strong style={{ color: "var(--color-primary)" }}>×{count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
