"use client";

import { useState, useEffect, useCallback } from "react";

type FavoriteType = "tool" | "prompt" | "course" | "project";

const STORAGE_KEYS: Record<FavoriteType, string> = {
  tool:    "fav_tools",
  prompt:  "fav_prompts",
  course:  "fav_courses",
  project: "fav_projects",
};

function getStored(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStored(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {}
}

export function useLocalFavorites(type: FavoriteType) {
  const key = STORAGE_KEYS[type];
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getStored(key));
    setMounted(true);
  }, [key]);

  const toggle = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        setStored(key, next);
        return next;
      });
    },
    [key]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite, mounted };
}

// Combined hook for Dashboard
export function useAllFavorites() {
  const [data, setData] = useState({
    tools: [] as string[],
    prompts: [] as string[],
    courses: [] as string[],
    projects: [] as string[],
  });

  useEffect(() => {
    setData({
      tools:    getStored(STORAGE_KEYS.tool),
      prompts:  getStored(STORAGE_KEYS.prompt),
      courses:  getStored(STORAGE_KEYS.course),
      projects: getStored(STORAGE_KEYS.project),
    });
  }, []);

  return data;
}
