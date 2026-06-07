"use client";

import { ToggleLeft, ToggleRight } from "lucide-react";

/**
 * Reusable bilingual admin form-field primitives.
 *
 * Extracted 1:1 from the inline styles already used in the Blog and Nano
 * Banana admin tabs (AdminDashboardClient.tsx) so future per-type content
 * forms (courses, tools, projects, paths, ...) can compose a consistent UI
 * without re-typing the same className/style strings — zero visual change
 * versus the existing tabs.
 */

const FIELD_BORDER = "1px solid rgba(255,255,255,0.12)";
const FIELD_BG_SELECT = "rgba(0,0,0,0.2)";

const fieldClass = "px-3 py-2 rounded-lg text-sm bg-transparent";
const fieldStyle = { border: FIELD_BORDER, color: "var(--color-on-surface)" } as const;
const selectStyle = { ...fieldStyle, background: FIELD_BG_SELECT } as const;

interface LabelProps {
  children: React.ReactNode;
}

export function FieldLabel({ children }: LabelProps) {
  return (
    <label className="text-xs font-mono mb-1.5 block" style={{ color: "var(--color-on-surface-variant)" }}>
      {children}
    </label>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
  mono?: boolean;
}

export function AdminTextField({ label, value, onChange, placeholder, required, dir, mono }: TextFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${fieldClass} w-full ${mono ? "font-mono" : ""}`}
        style={dir ? { ...fieldStyle, direction: dir } : fieldStyle}
      />
    </div>
  );
}

interface TextAreaFieldProps extends Omit<TextFieldProps, "mono"> {
  rows?: number;
}

export function AdminTextAreaField({ label, value, onChange, placeholder, required, dir, rows = 3 }: TextAreaFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${fieldClass} w-full resize-y`}
        style={dir ? { ...fieldStyle, direction: dir } : fieldStyle}
      />
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export function AdminSelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldClass} w-full`} style={selectStyle}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

const STATUS_OPTIONS: SelectOption[] = [
  { value: "published", label: "Published ✅" },
  { value: "draft", label: "Draft 📝" },
  { value: "archived", label: "Archived 🗄️" },
];

interface StatusFieldProps {
  value: "published" | "draft" | "archived";
  onChange: (value: "published" | "draft" | "archived") => void;
  label?: string;
}

/** Status select — published/draft/archived (matches the convention used by blog_posts and nano_banana_custom_prompts). */
export function AdminStatusField({ value, onChange, label = "Status" }: StatusFieldProps) {
  return (
    <AdminSelectField
      label={label}
      value={value}
      onChange={(v) => onChange(v as "published" | "draft" | "archived")}
      options={STATUS_OPTIONS}
    />
  );
}

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** Featured on/off toggle — matches the ToggleLeft/ToggleRight pattern in Blog & Nano Banana forms. */
export function AdminToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(!checked)} className="transition-all">
        {checked ? (
          <ToggleRight size={24} style={{ color: "var(--color-primary)" }} />
        ) : (
          <ToggleLeft size={24} style={{ color: "var(--color-on-surface-variant)" }} />
        )}
      </button>
      <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{label}</span>
    </div>
  );
}

interface TagsFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Comma-separated tags input — split/joined to string[] by the caller on save (matches existing blog/nano-banana forms). */
export function AdminTagsField({ label, value, onChange, placeholder = "tag-a, tag-b, tag-c" }: TagsFieldProps) {
  return <AdminTextField label={label} value={value} onChange={onChange} placeholder={placeholder} mono />;
}

interface SortOrderFieldProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

export function AdminSortOrderField({ label = "Sort order", value, onChange }: SortOrderFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={`${fieldClass} w-full`}
        style={fieldStyle}
      />
    </div>
  );
}

/** Parse the comma-separated tags input into a clean string[] for the API payload. */
export function parseTags(raw: string): string[] {
  return raw.trim() ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
}
