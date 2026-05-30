import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  labelAr: string;
  labelEn: string;
  href?: string;
}

interface BreadcrumbsProps {
  locale: string;
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ locale, items }: BreadcrumbsProps) {
  const isAr = locale === "ar";
  const Sep = isAr ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
      className="flex items-center flex-wrap gap-1 text-xs font-mono mb-6"
      style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const label = isAr ? item.labelAr : item.labelEn;

        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <Sep
                size={12}
                style={{ color: "var(--color-outline)", flexShrink: 0 }}
                aria-hidden="true"
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-opacity hover:opacity-100"
                style={{ color: "var(--color-on-surface-variant)", textDecoration: "none" }}
              >
                {label}
              </Link>
            ) : (
              <span
                style={{
                  color: isLast ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  opacity: isLast ? 1 : undefined,
                  fontWeight: isLast ? 500 : undefined,
                }}
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
