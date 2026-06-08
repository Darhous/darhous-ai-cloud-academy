"use client";

import { useState, useEffect } from "react";
import { DRAFT_PREVIEW_TABLES, DraftPreviewTableConfig } from "@/lib/admin/draft-content-preview-config";
import { RefreshCw, Search, ChevronRight, ChevronLeft, Eye, AlertTriangle } from "lucide-react";

export function DraftContentReviewPanel({ isAr }: { isAr: boolean }) {
  const [activeTable, setActiveTable] = useState<DraftPreviewTableConfig>(DRAFT_PREVIEW_TABLES[0]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const fetchRows = async (p = 1, s = search) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/draft-content-preview?table=${activeTable.table}&page=${p}&limit=20&search=${encodeURIComponent(s)}`);
      if (res.ok) {
        const json = await res.json();
        setRows(json.data || []);
        setTotalPages(json.totalPages || 1);
        setTotalCount(json.count || 0);
        setPage(json.page || 1);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setSelectedRow(null);
    fetchRows(1, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRows(1, search);
  };

  const getTitle = (row: any) => {
    for (const f of activeTable.titleFields) {
      if (row[f]) return String(row[f]);
    }
    return row.id;
  };

  const getExcerpt = (row: any) => {
    for (const f of activeTable.excerptFields) {
      if (row[f]) return String(row[f]);
    }
    return "";
  };

  const countMismatch = totalCount !== activeTable.expectedCount;

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="p-4 rounded-xl text-sm font-mono flex items-start gap-3" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
        <AlertTriangle className="shrink-0 mt-0.5" size={16} />
        <div>
          <strong>{isAr ? "وضع القراءة فقط" : "Read-Only Mode"}</strong>
          <p className="mt-1 opacity-90 leading-relaxed">
            {isAr 
              ? "هذه الواجهة مخصصة لمراجعة المسودات المستوردة فقط. تعديل، حذف، أو نشر المحتوى معطل عمداً لحماية بنية البيانات المعقدة."
              : "This interface is for reviewing imported drafts only. Editing, deleting, or publishing content is intentionally disabled to protect complex data structures."}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap pb-2 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {DRAFT_PREVIEW_TABLES.map((t) => (
          <button
            key={t.table}
            onClick={() => setActiveTable(t)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1"
            style={{
              background: activeTable.table === t.table ? "rgba(142,213,255,0.18)" : "transparent",
              color: activeTable.table === t.table ? "var(--color-primary)" : "var(--color-on-surface-variant)",
            }}
          >
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      {selectedRow ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSelectedRow(null)} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
              ← {isAr ? "رجوع للقائمة" : "Back to list"}
            </button>
          </div>
          
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(250,204,21,0.12)", color: "#fbbf24" }}>{selectedRow.status}</span>
                <span className="text-xs font-mono text-gray-500">#{selectedRow.id}</span>
              </div>
              <h2 className="text-xl font-bold">{getTitle(selectedRow)}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-gray-500 mb-1">Created At</p>
                <p>{selectedRow.created_at || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-gray-500 mb-1">Portal / Type</p>
                <p>{selectedRow.portal_id} / {selectedRow.content_type}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {Object.keys(selectedRow).map((key) => {
                if (["id", "status", "created_at", "updated_at", "portal_id", "content_type"].includes(key)) return null;
                const val = selectedRow[key];
                const isObj = val && typeof val === "object";
                
                return (
                  <div key={key} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs font-mono text-gray-500 mb-2">{key}</p>
                    {isObj ? (
                      <pre className="text-xs font-mono overflow-auto p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.3)" }} dir="ltr">
                        {JSON.stringify(val, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{String(val || "")}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-lg">{isAr ? activeTable.labelAr : activeTable.labelEn}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                  {isAr ? "العدد:" : "Count:"} <strong className={countMismatch ? "text-red-400" : "text-green-400"}>{totalCount}</strong> / {activeTable.expectedCount}
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder={isAr ? "بحث..." : "Search..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm bg-transparent border outline-none"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-on-surface)" }}
              />
              <button type="submit" className="p-2 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)" }}>
                <Search size={16} />
              </button>
              <button type="button" onClick={() => fetchRows(page, search)} className="p-2 rounded-lg cursor-pointer ml-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            {loading ? (
              <p className="text-center py-10 font-mono text-sm text-gray-500">Loading...</p>
            ) : rows.length === 0 ? (
              <p className="text-center py-10 font-mono text-sm text-gray-500">No records found.</p>
            ) : (
              rows.map((row) => (
                <div key={row.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between group cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setSelectedRow(row)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(250,204,21,0.12)", color: "#fbbf24" }}>{row.status}</span>
                      <span className="text-xs font-mono text-gray-500">#{row.id}</span>
                      {!row.title_ar && !row.title_en && <span className="text-xs text-red-400">Missing Titles</span>}
                    </div>
                    <p className="font-semibold text-sm truncate">{getTitle(row)}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{getExcerpt(row)}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-gray-500">{row.category || row.portal_id}</span>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                disabled={page <= 1}
                onClick={() => fetchRows(page - 1)}
                className="p-2 rounded-lg cursor-pointer disabled:opacity-30 bg-white/5 hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => fetchRows(page + 1)}
                className="p-2 rounded-lg cursor-pointer disabled:opacity-30 bg-white/5 hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
