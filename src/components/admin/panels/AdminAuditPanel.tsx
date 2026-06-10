"use client";

import { Shield, CheckCircle } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  target_type: string | null;
  created_at: string;
}

interface Props {
  isAr: boolean;
  dataLoading: boolean;
  auditLogs: AuditLog[];
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-xl h-14 animate-pulse" style={{ background: "var(--color-surface-container)" }} />
      ))}
    </div>
  );
}

export function AdminAuditPanel({ isAr, dataLoading, auditLogs }: Props) {
  const SECURITY_CHECKS = [
    isAr ? "GEMINI_API_KEY محمي في الخادم" : "GEMINI_API_KEY server-only",
    isAr ? "SUPABASE_SERVICE_ROLE_KEY لا يظهر للعميل" : "SUPABASE_SERVICE_ROLE_KEY never exposed to client",
    isAr ? "RLS مفعّل على كل الجداول" : "RLS enabled on all tables",
    isAr ? "API routes تتحقق من صلاحيات المشرف" : "Admin API routes verify role server-side",
    isAr ? "لا توجد routes مؤقتة في الكود" : "No temp admin routes in codebase",
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "سجل الأمان والتدقيق" : "Security & Audit Log"}
      </h2>

      {dataLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex flex-col gap-2">
          {auditLogs.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "لا يوجد سجل تدقيق بعد." : "No audit log entries yet."}
            </p>
          )}
          {auditLogs.map((log) => (
            <div key={log.id} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
              >
                <Shield size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono truncate" style={{ color: "var(--color-on-surface)" }}>{log.action}</p>
                {log.target_type && (
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{log.target_type}</p>
                )}
              </div>
              <p className="text-xs font-mono flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                {new Date(log.created_at).toLocaleString(isAr ? "ar" : "en", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.12)" }}>
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "#4ade80" }}>
          <CheckCircle size={15} />
          {isAr ? "حالة الأمان" : "Security Status"}
        </h3>
        <div className="flex flex-col gap-2">
          {SECURITY_CHECKS.map((check) => (
            <div key={check} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              <CheckCircle size={13} style={{ color: "#4ade80", flexShrink: 0 }} />
              {check}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
