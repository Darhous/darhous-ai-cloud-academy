import type { BlogPost } from "@/data/blog";
import Link from "next/link";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/${locale}/blog/${post.id}`}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl">{post.icon}</span>
        {post.featured && (
          <Badge variant="tertiary">{isAr ? "مميز" : "Featured"}</Badge>
        )}
      </div>

      <div>
        <h3
          className="font-display font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-colors"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? post.titleAr : post.titleEn}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? post.excerptAr : post.excerptEn}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
          <span
            className="px-2 py-0.5 rounded"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-primary)" }}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readingTime} {isAr ? "دقيقة" : "min"}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-mono group-hover:gap-2 transition-all" style={{ color: "var(--color-primary)" }}>
          {isAr ? "اقرأ" : "Read"}
          <Arrow size={12} />
        </span>
      </div>
    </Link>
  );
}
