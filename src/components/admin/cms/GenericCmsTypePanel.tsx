"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { CmsFieldConfig, CmsTypeConfig } from "@/lib/admin/cms-registry";
import {
  AdminTextField,
  AdminTextAreaField,
  AdminSelectField,
  AdminStatusField,
  AdminToggleField,
  AdminTagsField,
} from "@/components/admin/content-form/fields";

/**
 * Generic list+form admin panel for ANY CmsTypeConfig from the registry.
 *
 * Why generic: 22 content types × hand-written list/form/CRUD-wiring would be
 * ~8000 lines of near-identical code (see the existing ai-paths-cms tab for
 * what one hand-rolled type costs). Instead this single component renders the
 * list view + bilingual form from `config.fields`, talking to the generic
 * /api/admin/cms/[table] + [id] routes — visually consistent with the
 * existing hand-rolled tabs (same glass-card / color tokens / button styles)
 * but driven entirely by data.
 *
 * State is fully self-contained (no parent state threading needed), which
 * keeps AdminDashboardClient from growing 22× more useState calls.
 */

type DbRow = {
  id: string;
  status: "published" | "draft" | "archived";
  featured: boolean;
  sort_order: number;
  updated_at?: string;
  [key: string]: unknown;
};

type FormState = Record<string, string | boolean>;

const slugifyId = (text: string) =>
  text.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 80);

function buildDefaultForm(config: CmsTypeConfig): FormState {
  const form: FormState = {
    id: "",
    [config.titleField]: "",
    status: "draft",
    featured: false,
    sort_order: "0",
  };
  for (const f of config.fields) {
    if (f.name === config.titleField) continue;
    form[f.name] = f.kind === "toggle" ? Boolean(f.default ?? false) : String(f.default ?? "");
  }
  return form;
}

function valueToFormString(field: CmsFieldConfig, raw: unknown): string {
  if (raw === null || raw === undefined) return field.kind === "number" ? "0" : "";
  if (field.kind === "jsonb") return typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);
  if (field.kind === "array") return Array.isArray(raw) ? raw.join(", ") : String(raw);
  if (field.kind === "lines") return Array.isArray(raw) ? raw.join("\n") : String(raw);
  if (field.kind === "number") return String(raw ?? 0);
  return String(raw ?? "");
}

interface Props {
  config: CmsTypeConfig;
  isAr: boolean;
}

export function GenericCmsTypePanel({ config, isAr }: Props) {
  const [view, setView] = useState<"list" | "form">("list");
  const [rows, setRows] = useState<DbRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => buildDefaultForm(config));

  const apiBase = `/api/admin/cms/${config.table}`;
  const titleLabel = config.fields.find((f) => f.name === config.titleField);

  async function loadRows() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(apiBase);
      if (res.ok) setRows(await res.json());
    } catch { /* silent */ } finally { setLoading(false); }
  }

  useEffect(() => {
    setView("list");
    setMsg(null);
    setEditId(null);
    setForm(buildDefaultForm(config));
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.table]);

  function openCreate() {
    setEditId(null);
    setForm(buildDefaultForm(config));
    setMsg(null);
    setView("form");
  }

  async function openEdit(row: DbRow) {
    setMsg(null);
    try {
      const res = await fetch(`${apiBase}/${row.id}`);
      if (!res.ok) { setMsg({ type: "err", text: isAr ? "فشل تحميل العنصر" : "Failed to load item" }); return; }
      const data = await res.json();
      const next: FormState = {
        id: String(data.id ?? ""),
        status: data.status ?? "draft",
        featured: Boolean(data.featured),
        sort_order: String(data.sort_order ?? 0),
      };
      for (const f of config.fields) {
        next[f.name] = valueToFormString(f, data[f.name]);
      }
      setForm(next);
      setEditId(row.id);
      setView("form");
    } catch { setMsg({ type: "err", text: "Error" }); }
  }

  async function handleArchive(row: DbRow) {
    const title = String(row[config.titleField] ?? row.id);
    if (!confirm(isAr ? `أرشفة "${title}"؟` : `Archive "${title}"?`)) return;
    const res = await fetch(`${apiBase}/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "archived" }) });
    if (res.ok) setRows((p) => p.map((x) => (x.id === row.id ? { ...x, status: "archived" } : x)));
  }

  async function handleDelete(row: DbRow) {
    const title = String(row[config.titleField] ?? row.id);
    if (!confirm(isAr ? `حذف "${title}" نهائياً؟` : `Delete "${title}" permanently?`)) return;
    const res = await fetch(`${apiBase}/${row.id}`, { method: "DELETE" });
    if (res.ok) setRows((p) => p.filter((x) => x.id !== row.id));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      // Client-side JSON validation for jsonb fields — friendlier than waiting for the server 400.
      for (const f of config.fields) {
        if (f.kind === "jsonb") {
          const raw = String(form[f.name] ?? "").trim();
          if (raw) {
            try { JSON.parse(raw); }
            catch { setMsg({ type: "err", text: isAr ? `صيغة JSON غير صحيحة في حقل "${f.labelAr}"` : `Invalid JSON in "${f.labelEn}"` }); return; }
          }
        }
      }

      const payload: Record<string, unknown> = {
        id: form.id,
        status: form.status,
        featured: form.featured,
        sort_order: Number(form.sort_order) || 0,
      };
      for (const f of config.fields) {
        payload[f.name] = form[f.name];
      }

      const url = editId ? `${apiBase}/${editId}` : apiBase;
      const method = editId ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as { error?: string }));
        setMsg({ type: "err", text: j.error ?? `Error ${res.status}` });
        return;
      }
      setMsg({ type: "ok", text: isAr ? "✅ تم الحفظ بنجاح" : "✅ Saved successfully" });
      await loadRows();
      setTimeout(() => setView("list"), 1200);
    } catch (err) {
      setMsg({ type: "err", text: err instanceof Error ? err.message : "Error" });
    } finally {
      setSaving(false);
    }
  }

  function renderField(f: CmsFieldConfig) {
    const value = form[f.name];
    const onChange = (v: string) => setForm((p) => ({ ...p, [f.name]: v }));
    const label = isAr ? f.labelAr : f.labelEn;

    switch (f.kind) {
      case "select":
        return (
          <AdminSelectField
            key={f.name}
            label={label}
            value={String(value ?? "")}
            onChange={onChange}
            options={f.options ?? []}
          />
        );
      case "toggle":
        return (
          <AdminToggleField
            key={f.name}
            label={label}
            checked={Boolean(value)}
            onChange={(checked) => setForm((p) => ({ ...p, [f.name]: checked }))}
          />
        );
      case "number":
        return (
          <AdminTextField
            key={f.name}
            label={label}
            value={String(value ?? "0")}
            onChange={(v) => onChange(v.replace(/[^0-9]/g, ""))}
            mono
            dir="ltr"
          />
        );
      case "array":
        return (
          <AdminTagsField
            key={f.name}
            label={`${label} (${isAr ? "مفصول بفواصل" : "comma-separated"})`}
            value={String(value ?? "")}
            onChange={onChange}
          />
        );
      case "lines":
        return (
          <AdminTextAreaField
            key={f.name}
            label={`${label} (${isAr ? "سطر لكل عنصر" : "one item per line"})`}
            value={String(value ?? "")}
            onChange={onChange}
            dir={f.dir ?? "rtl"}
            rows={f.rows ?? 5}
          />
        );
      case "jsonb":
        return (
          <AdminTextAreaField
            key={f.name}
            label={label}
            value={String(value ?? "")}
            onChange={onChange}
            dir="ltr"
            rows={f.rows ?? 8}
            placeholder="[]"
          />
        );
      case "textarea":
        return (
          <AdminTextAreaField
            key={f.name}
            label={`${label}${f.required ? " *" : ""}`}
            value={String(value ?? "")}
            onChange={onChange}
            dir={f.dir ?? "rtl"}
            rows={f.rows ?? 3}
            required={f.required}
          />
        );
      case "text":
      default:
        return (
          <AdminTextField
            key={f.name}
            label={`${label}${f.required ? " *" : ""}`}
            value={String(value ?? "")}
            onChange={onChange}
            dir={f.dir ?? "rtl"}
            required={f.required}
          />
        );
    }
  }

  const titleAr = isAr ? config.labelAr : config.labelEn;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
          {view === "list"
            ? `🧩 ${titleAr}`
            : (editId ? (isAr ? `✏️ تعديل عنصر — ${titleAr}` : `✏️ Edit — ${titleAr}`) : (isAr ? `✏️ عنصر جديد — ${titleAr}` : `✏️ New — ${titleAr}`))}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {view === "list" ? (
            <>
              <button onClick={loadRows} disabled={loading} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> {isAr ? "تحديث" : "Refresh"}
              </button>
              <button onClick={openCreate} className="flex items-center gap-1 text-xs font-mono px-4 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(142,213,255,0.12)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.25)" }}>
                + {isAr ? "عنصر جديد" : "New item"}
              </button>
            </>
          ) : (
            <button onClick={() => setView("list")} className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
              ← {isAr ? "رجوع للقائمة" : "Back to list"}
            </button>
          )}
        </div>
      </div>

      {msg && (
        <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: msg.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: msg.type === "ok" ? "#4ade80" : "#f87171" }}>
          {msg.text}
        </p>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="flex flex-col gap-3">
          {loading ? (
            <p className="text-xs font-mono text-center py-6" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
          ) : rows.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-3xl mb-3">🧩</p>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? `لا توجد عناصر في قاعدة البيانات بعد لـ «${config.labelAr}». اضغط «تحديث» أو «عنصر جديد».` : `No items in DB yet for «${config.labelEn}». Click «Refresh» or «New item».`}
              </p>
            </div>
          ) : (
            rows.map((row) => {
              const title = String(row[config.titleField] ?? row.id);
              return (
                <div key={row.id} className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap" style={{ border: `1px solid ${row.status === "published" ? "rgba(74,222,128,0.15)" : row.status === "draft" ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: row.status === "published" ? "rgba(74,222,128,0.12)" : row.status === "draft" ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)", color: row.status === "published" ? "#4ade80" : row.status === "draft" ? "#fbbf24" : "#888" }}>
                        {row.status}
                      </span>
                      {row.featured && <span className="text-xs font-mono" style={{ color: "#f59e0b" }}>⭐ featured</span>}
                    </div>
                    <p className="font-semibold text-sm mt-1 truncate" style={{ color: "var(--color-on-surface)" }}>{title}</p>
                    <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-on-surface-variant)" }}>#{row.id} · sort {row.sort_order} · {row.updated_at?.split("T")[0]}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {isAr ? "تعديل" : "Edit"}
                    </button>
                    {row.status !== "archived" && ["automation_glossary"].includes(config.table) && (
                      <button onClick={() => handleArchive(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(250,204,21,0.08)", color: "#fbbf24", border: "1px solid rgba(250,204,21,0.2)" }}>
                        {isAr ? "أرشفة" : "Archive"}
                      </button>
                    )}
                    <button onClick={() => handleDelete(row)} className="text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                      {isAr ? "حذف" : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── FORM VIEW ── */}
      {view === "form" && (
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              {isAr ? "المعلومات الأساسية" : "Basic Info"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {titleLabel && (
                <div>
                  {renderField(titleLabel)}
                </div>
              )}
              <AdminTextField
                label={isAr ? "المعرّف (id) *" : "ID (slug) *"}
                value={String(form.id ?? "")}
                onChange={(v) => setForm((p) => ({ ...p, id: slugifyId(v) }))}
                placeholder="my-item-id"
                required
                mono
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AdminStatusField
                label={isAr ? "الحالة" : "Status"}
                value={(form.status as "published" | "draft" | "archived") ?? "draft"}
                onChange={(v) => setForm((p) => ({ ...p, status: v }))}
                disabled={!["automation_glossary"].includes(config.table)}
              />
              <AdminTextField
                label={isAr ? "ترتيب العرض" : "Sort order"}
                value={String(form.sort_order ?? "0")}
                onChange={(v) => setForm((p) => ({ ...p, sort_order: v.replace(/[^0-9]/g, "") }))}
                mono
                dir="ltr"
              />
              <div className="flex items-end pb-2">
                <AdminToggleField
                  label={isAr ? "مميز" : "Featured"}
                  checked={Boolean(form.featured)}
                  onChange={(checked) => setForm((p) => ({ ...p, featured: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              {isAr ? "تفاصيل المحتوى" : "Content Details"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.fields.filter((f) => f.name !== config.titleField).map(renderField)}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-mono px-6 py-2.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: "rgba(142,213,255,0.15)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.3)" }}>
              {saving ? (isAr ? "جارٍ الحفظ…" : "Saving…") : (isAr ? "💾 حفظ" : "💾 Save")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
