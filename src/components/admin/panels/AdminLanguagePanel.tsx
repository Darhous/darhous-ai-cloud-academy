"use client";

import { Download, AlertTriangle } from "lucide-react";

interface Props {
  isAr: boolean;
  langResults: Record<string, unknown>[];
  langLoading: boolean;
}

export function AdminLanguagePanel({ isAr, langResults, langLoading }: Props) {
  function downloadCSV() {
    const headers = ["User ID", "Level", "Score %", "Stages", "Flags", "Certificate", "Date"];
    const rows = langResults.map((r) => [
      (r.user_id as string).slice(0, 8),
      r.level as string,
      (r.score as number).toFixed(1),
      `${r.stages_completed as number}/10`,
      String((r.flags_count as number) ?? 0),
      r.certificate_id ? "Yes" : "No",
      new Date(r.created_at as string).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `language-results-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasResults = !langLoading && langResults.length > 0;
  const flagged = hasResults ? langResults.filter((r) => ((r.flags_count as number) ?? 0) > 0) : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Analytics summary */}
      {hasResults && (() => {
        const avgScore = langResults.reduce((s, r) => s + (r.score as number), 0) / langResults.length;
        const withCerts = langResults.filter((r) => r.certificate_id).length;
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: isAr ? "إجمالي الاختبارات" : "Total Attempts", value: langResults.length, color: "#d0bcff" },
              { label: isAr ? "متوسط النتيجة" : "Avg Score", value: `${avgScore.toFixed(1)}%`, color: "#4ade80" },
              { label: isAr ? "مع تنبيهات" : "Flagged", value: flagged.length, color: "#ef4444" },
              { label: isAr ? "الشهادات" : "Certificates", value: withCerts, color: "#fbbf24" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
                <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Level distribution */}
      {hasResults && (() => {
        const levels = langResults.reduce<Record<string, number>>((acc, r) => {
          const l = r.level as string;
          acc[l] = (acc[l] ?? 0) + 1;
          return acc;
        }, {});
        const sorted = Object.entries(levels).sort(([a], [b]) => a.localeCompare(b));
        const max = Math.max(...sorted.map(([, n]) => n));
        return (
          <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "توزيع المستويات" : "Level Distribution"}
            </h3>
            <div className="flex flex-col gap-2">
              {sorted.map(([level, count]) => (
                <div key={level} className="flex items-center gap-3 text-sm">
                  <span className="font-mono w-10 flex-shrink-0 font-bold" style={{ color: "#d0bcff" }}>{level}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                    <div className="h-full rounded-full" style={{ width: `${(count / max) * 100}%`, background: "#d0bcff" }} />
                  </div>
                  <span className="font-mono w-6 text-end flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Results table */}
      <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="font-bold text-sm mb-4 flex items-center justify-between" style={{ color: "var(--color-on-surface)" }}>
          <span>{isAr ? "نتائج الاختبارات" : "Assessment Results"}</span>
          {langResults.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                {langResults.length} {isAr ? "نتيجة" : "results"}
              </span>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg transition-opacity hover:opacity-70"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
              >
                <Download size={11} />
                {isAr ? "CSV" : "CSV"}
              </button>
            </div>
          )}
        </h3>
        {langLoading ? (
          <div className="h-8 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
        ) : langResults.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "لا توجد نتائج" : "No results yet"}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["User ID", "Level", "Score", "Stages", "Flags", "Cert", "Date"].map((h) => (
                    <th key={h} className="text-start pb-2 pr-4 font-bold" style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {langResults.map((r) => (
                  <tr key={r.id as string} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td className="py-2 pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{(r.user_id as string).slice(0, 8)}…</td>
                    <td className="py-2 pr-4 font-bold" style={{ color: "#d0bcff" }}>{r.level as string}</td>
                    <td className="py-2 pr-4" style={{ color: "var(--color-on-surface)" }}>{(r.score as number).toFixed(1)}%</td>
                    <td className="py-2 pr-4" style={{ color: "var(--color-on-surface-variant)" }}>{r.stages_completed as number}/10</td>
                    <td className="py-2 pr-4" style={{ color: ((r.flags_count as number) ?? 0) > 0 ? "#ef4444" : "var(--color-on-surface-variant)" }}>
                      {(r.flags_count as number) ?? 0}
                    </td>
                    <td className="py-2 pr-4" style={{ color: r.certificate_id ? "#4ade80" : "var(--color-on-surface-variant)" }}>
                      {r.certificate_id ? "✓" : "—"}
                    </td>
                    <td className="py-2" style={{ color: "var(--color-on-surface-variant)" }}>
                      {new Date(r.created_at as string).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Anti-cheat flags */}
      {flagged.length > 0 && (
        <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
            <AlertTriangle size={15} />
            {isAr ? "تقارير التنبيه (Anti-cheat)" : "Anti-Cheat Flags"}
          </h3>
          <div className="flex flex-col gap-2">
            {flagged.map((r) => (
              <div
                key={r.id as string}
                className="flex items-center gap-3 text-xs"
                style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px" }}
              >
                <span className="font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{(r.user_id as string).slice(0, 8)}…</span>
                <span className="font-bold" style={{ color: "#d0bcff" }}>{r.level as string}</span>
                <span style={{ color: "var(--color-on-surface-variant)" }}>{(r.score as number).toFixed(1)}%</span>
                <span className="font-bold" style={{ color: "#ef4444" }}>
                  {r.flags_count as number} flag{(r.flags_count as number) !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                  {new Date(r.created_at as string).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
