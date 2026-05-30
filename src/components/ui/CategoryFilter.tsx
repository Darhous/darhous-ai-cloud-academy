"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
  allLabel?: string;
  /** Optional map of value → display label (for translations) */
  labelMap?: Record<string, string>;
}

export default function CategoryFilter({ categories, active, onChange, allLabel = "All", labelMap }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider border transition-all duration-200 hover:scale-105 ${
          active === "all" ? "filter-chip-active" : ""
        }`}
        style={{
          background: active === "all" ? undefined : "var(--color-surface-container)",
          borderColor: active === "all" ? undefined : "var(--color-outline-variant)",
          color: active === "all" ? undefined : "var(--color-on-surface-variant)",
        }}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider border transition-all duration-200 hover:scale-105 ${
            active === cat ? "filter-chip-active" : ""
          }`}
          style={{
            background: active === cat ? undefined : "var(--color-surface-container)",
            borderColor: active === cat ? undefined : "var(--color-outline-variant)",
            color: active === cat ? undefined : "var(--color-on-surface-variant)",
          }}
        >
          {labelMap?.[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}
