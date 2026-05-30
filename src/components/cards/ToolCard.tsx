import type { Tool } from "@/data/tools";
import Badge from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import FavoriteButton from "@/components/features/FavoriteButton";
import Link from "next/link";

interface ToolCardProps {
  tool: Tool;
  locale: string;
}

const pricingColors = {
  free: "tertiary",
  freemium: "secondary",
  paid: "outline",
  "open-source": "primary",
} as const;

const pricingLabel = {
  free:         { ar: "مجاني",         en: "Free"         },
  freemium:     { ar: "مجاني جزئيًا",   en: "Freemium"     },
  paid:         { ar: "مدفوع",         en: "Paid"         },
  "open-source":{ ar: "مفتوح المصدر",   en: "Open Source"  },
};

export default function ToolCard({ tool, locale }: ToolCardProps) {
  const isAr = locale === "ar";

  return (
    <Link
      href={`/${locale}/tools/${tool.id}`}
      className="glass-card rounded-2xl p-5 flex flex-col gap-3 glow-hover transition-all duration-300 hover:-translate-y-1 group"
      style={{ textDecoration: "none" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            className="font-display font-semibold text-base group-hover:text-primary transition-colors"
            style={{ color: "var(--color-on-surface)" }}
          >
            {tool.name}
          </h3>
          <p className="text-xs font-mono mt-0.5" style={{ color: "var(--color-outline)" }}>
            {tool.category}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FavoriteButton id={tool.id} type="tool" locale={locale} />
          <Badge variant={pricingColors[tool.pricingType]}>
            {isAr ? pricingLabel[tool.pricingType].ar : pricingLabel[tool.pricingType].en}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? tool.shortDescriptionAr : tool.shortDescriptionEn}
      </p>

      {/* Best for */}
      <div
        className="text-xs font-mono px-3 py-1.5 rounded-lg"
        style={{ background: "var(--color-surface-container-high)", color: "var(--color-tertiary)" }}
      >
        {isAr ? "الأفضل لـ: " : "Best for: "}{tool.bestFor}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <Badge variant={tool.level === "beginner" ? "beginner" : tool.level === "intermediate" ? "intermediate" : "advanced"}>
          {tool.level}
        </Badge>
        {tool.featured && (
          <span className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
            <ExternalLink size={12} />
            {isAr ? "مميز" : "Featured"}
          </span>
        )}
      </div>
    </Link>
  );
}
