"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSaved, toggleSaved as lsToggle } from "@/lib/automation/savedRecipes";

const LAB_KEY = (id: string) => `darhous:automation:lab:${id}`;
const CHECKLIST_KEY = (id: string) => `darhous:automation:checklist:${id}`;

function lsReadBoolArr(key: string, len: number): boolean[] {
  if (typeof window === "undefined") return Array(len).fill(false);
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : Array(len).fill(false);
  } catch {
    return Array(len).fill(false);
  }
}

async function syncToServer(payload: object) {
  await fetch("/api/automation/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
}

/* ── Saved Recipes ──────────────────────────────────────────── */
export function useSavedRecipe(recipeId: string) {
  const [saved, setSaved] = useState(false);
  const supabase = createClient();
  const synced = useRef(false);

  useEffect(() => {
    setSaved(lsToggle(recipeId) === false ? getSaved().includes(recipeId) : getSaved().includes(recipeId));
    setSaved(getSaved().includes(recipeId));

    if (!synced.current && supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return;
        supabase
          .from("automation_saved_recipes")
          .select("recipe_id")
          .eq("user_id", user.id)
          .eq("recipe_id", recipeId)
          .maybeSingle()
          .then(({ data }) => {
            if (data) {
              setSaved(true);
              localStorage.setItem(
                "darhous:automation:saved",
                JSON.stringify([...new Set([...getSaved(), recipeId])])
              );
            }
            synced.current = true;
          });
      });
    }
  }, [recipeId, supabase]);

  const toggle = useCallback(async () => {
    const next = lsToggle(recipeId);
    setSaved(next);
    await syncToServer({ type: next ? "save_recipe" : "unsave_recipe", recipeId });
  }, [recipeId]);

  return { saved, toggle };
}

/* ── Lab Progress ───────────────────────────────────────────── */
export function useLabProgress(labId: string, totalItems: number) {
  const [checked, setChecked] = useState<boolean[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const ls = lsReadBoolArr(LAB_KEY(labId), totalItems);
    setChecked(ls);

    if (!supabase) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("automation_lab_progress")
        .select("checked_items")
        .eq("user_id", user.id)
        .eq("lab_id", labId)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.checked_items) {
            const server = data.checked_items as boolean[];
            const merged = ls.map((v, i) => v || (server[i] ?? false));
            setChecked(merged);
            localStorage.setItem(LAB_KEY(labId), JSON.stringify(merged));
          }
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labId, totalItems]);

  const toggleItem = useCallback(async (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(LAB_KEY(labId), JSON.stringify(next));
      syncToServer({ type: "lab_progress", labId, checkedItems: next });
      return next;
    });
  }, [labId]);

  return { checked, toggleItem };
}

/* ── Recipe Checklist ───────────────────────────────────────── */
export function useRecipeChecklist(recipeId: string, totalItems: number) {
  const [checked, setChecked] = useState<boolean[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const ls = lsReadBoolArr(CHECKLIST_KEY(recipeId), totalItems);
    setChecked(ls);

    if (!supabase) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("automation_recipe_checklist")
        .select("checked_items")
        .eq("user_id", user.id)
        .eq("recipe_id", recipeId)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.checked_items) {
            const server = data.checked_items as boolean[];
            const merged = ls.map((v, i) => v || (server[i] ?? false));
            setChecked(merged);
            localStorage.setItem(CHECKLIST_KEY(recipeId), JSON.stringify(merged));
          }
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId, totalItems]);

  const toggleItem = useCallback(async (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(CHECKLIST_KEY(recipeId), JSON.stringify(next));
      syncToServer({ type: "recipe_checklist", recipeId, checkedItems: next });
      return next;
    });
  }, [recipeId]);

  return { checked, toggleItem };
}
