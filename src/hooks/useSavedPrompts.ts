"use client";

import { useState, useEffect, useCallback } from "react";

export interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  category: string;
  source: "prompt-studio" | "claude-generator" | "roadmap" | "mentor";
  savedAt: number;
}

const STORAGE_KEY = "saved_generated_prompts";

function getStored(): SavedPrompt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPrompt[]) : [];
  } catch {
    return [];
  }
}

function setStored(items: SavedPrompt[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useSavedPrompts() {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSavedPrompts(getStored());
    setMounted(true);
  }, []);

  const save = useCallback(
    (item: Omit<SavedPrompt, "id" | "savedAt">): string => {
      const newItem: SavedPrompt = {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        savedAt: Date.now(),
      };
      setSavedPrompts((prev) => {
        const next = [newItem, ...prev].slice(0, 50);
        setStored(next);
        return next;
      });
      return newItem.id;
    },
    []
  );

  const remove = useCallback((id: string) => {
    setSavedPrompts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setStored(next);
      return next;
    });
  }, []);

  return { savedPrompts, save, remove, mounted };
}
