import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import type { previewPortals } from "../homepage-preview-data";

type PreviewPortal = (typeof previewPortals)[number];

export default function PortalPreviewCard({
  portal,
  locale,
  compact = false,
}: {
  portal: PreviewPortal;
  locale: string;
  compact?: boolean;
}) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Link href={`/${locale}${portal.href}`} className="group block h-full">
      <Card
        className="h-full overflow-hidden border-white/10 bg-white/[0.045] text-white transition-colors duration-200 hover:border-white/25"
        style={{ boxShadow: `inset 0 1px 0 ${portal.color}25` }}
      >
        <CardHeader className={compact ? "p-4 pb-2" : "p-5 pb-3"}>
          <div className="flex items-start justify-between gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
              style={{ color: portal.color, borderColor: `${portal.color}45`, background: `${portal.color}12` }}
            >
              <portal.Icon size={20} aria-hidden />
            </span>
            <Arrow className="opacity-45 transition-opacity group-hover:opacity-100" size={17} aria-hidden />
          </div>
          <CardTitle className="pt-3 text-base text-white">
            {isAr ? portal.titleAr : portal.titleEn}
          </CardTitle>
        </CardHeader>
        {!compact && (
          <CardContent className="p-5 pt-0">
            <p className="text-sm leading-6 text-white/62">
              {isAr ? portal.descriptionAr : portal.descriptionEn}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(isAr ? portal.features : portal.featuresEn ?? portal.features)
                .slice(0, 2)
                .map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border px-2.5 py-1 text-[11px]"
                    style={{ color: portal.color, borderColor: `${portal.color}35`, background: `${portal.color}0d` }}
                  >
                    {feature}
                  </span>
                ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}

