"use client";

import { Heart } from "lucide-react";
import { useLocalFavorites } from "@/hooks/useLocalFavorites";

type FavoriteType = "tool" | "prompt" | "course" | "project";

interface FavoriteButtonProps {
  id: string;
  type: FavoriteType;
  locale?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({ id, type, locale, size = "sm" }: FavoriteButtonProps) {
  const { toggle, isFavorite, mounted } = useLocalFavorites(type);
  const isAr = locale === "ar";

  if (!mounted) return null;

  const saved = isFavorite(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      title={saved ? (isAr ? "إزالة من المفضلة" : "Remove from favorites") : (isAr ? "حفظ في المفضلة" : "Save to favorites")}
      className="flex items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        color: saved ? "#f87171" : "var(--color-on-surface-variant)",
        padding: size === "sm" ? "4px" : "8px",
      }}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={size === "sm" ? 14 : 18}
        fill={saved ? "#f87171" : "none"}
        strokeWidth={1.5}
      />
    </button>
  );
}
