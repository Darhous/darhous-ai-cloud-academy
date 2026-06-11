import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";

export function PreviewCTA({
  locale,
  primary = "register",
}: {
  locale: string;
  primary?: "register" | "mentor";
}) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const primaryHref = `/${locale}/${primary}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link href={primaryHref}>
        <ShimmerButton
          className="min-h-12 px-6 font-semibold"
          shimmerColor="#ffffff"
          background="linear-gradient(135deg, #1689b8, #6557d9)"
        >
          <span className="flex items-center gap-2">
            {isAr ? "ابدأ رحلتك الآن" : "Start your journey"}
            <Arrow size={17} aria-hidden />
          </span>
        </ShimmerButton>
      </Link>
      <Link
        href={`/${locale}/mentor`}
        className="inline-flex items-center min-h-12 border border-white/15 bg-white/5 px-6 text-white rounded-lg hover:bg-white/10 transition-colors"
      >
        {isAr ? "اسأل المرشد الذكي" : "Ask the AI mentor"}
      </Link>
    </div>
  );
}

