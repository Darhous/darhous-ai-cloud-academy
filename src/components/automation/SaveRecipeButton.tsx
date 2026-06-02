"use client";

import { Bookmark } from "lucide-react";
import { useSavedRecipe } from "@/hooks/useAutomationProgress";

interface Props { id: string }

export default function SaveRecipeButton({ id }: Props) {
  const { saved, toggle } = useSavedRecipe(id);

  return (
    <button
      onClick={toggle}
      title={saved ? "إلغاء الحفظ" : "حفظ الوصفة"}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
      style={{
        background: saved ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.05)",
        border: saved ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.1)",
        color: saved ? "#4ade80" : "var(--color-on-surface-variant)",
      }}
    >
      <Bookmark size={15} fill={saved ? "#4ade80" : "none"} />
      {saved ? "محفوظة" : "حفظ الوصفة"}
    </button>
  );
}
