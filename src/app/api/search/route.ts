import "server-only";
import { NextResponse } from "next/server";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { prompts } from "@/data/prompts";
import { nanaBananaPrompts } from "@/data/nano-banana-prompts";

export interface SearchResult {
  type: "course" | "tool" | "project" | "blog" | "prompt" | "nano_banana";
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  href: string;
  tags?: string[];
}

function scoreMatch(text: string, query: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 70;
  const words = q.split(" ");
  const matchCount = words.filter((w) => w.length > 2 && t.includes(w)).length;
  return Math.round((matchCount / words.length) * 50);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const locale = searchParams.get("locale") ?? "ar";
  const type = searchParams.get("type") ?? "all";
  const limitParam = parseInt(searchParams.get("limit") ?? "20", 10);
  const limit = Math.min(Math.max(1, limitParam), 50);

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], query });
  }

  const results: Array<SearchResult & { score: number }> = [];
  const q = query.toLowerCase();

  // Courses
  if (type === "all" || type === "course") {
    for (const c of courses.filter((c) => !c.comingSoon)) {
      const searchText = `${c.titleAr} ${c.titleEn} ${c.descriptionAr} ${c.descriptionEn} ${c.category} ${c.skills?.join(" ") ?? ""}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "course",
          id: c.id,
          titleAr: c.titleAr,
          titleEn: c.titleEn,
          descriptionAr: c.descriptionAr,
          descriptionEn: c.descriptionEn,
          href: `/${locale}/courses/${c.id}`,
          tags: c.skills,
          score,
        });
      }
    }
  }

  // Tools
  if (type === "all" || type === "tool") {
    for (const t of tools) {
      const searchText = `${t.name} ${t.shortDescriptionAr} ${t.shortDescriptionEn} ${t.category} ${t.tags.join(" ")}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "tool",
          id: t.id,
          titleAr: t.name,
          titleEn: t.name,
          descriptionAr: t.shortDescriptionAr,
          descriptionEn: t.shortDescriptionEn,
          href: `/${locale}/tools/${t.id}`,
          tags: t.tags,
          score,
        });
      }
    }
  }

  // Projects
  if (type === "all" || type === "project") {
    for (const p of projects) {
      const searchText = `${p.titleAr} ${p.titleEn} ${p.descriptionAr} ${p.descriptionEn} ${p.stack?.join(" ") ?? ""} ${p.category}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "project",
          id: p.id,
          titleAr: p.titleAr,
          titleEn: p.titleEn,
          descriptionAr: p.descriptionAr,
          descriptionEn: p.descriptionEn,
          href: `/${locale}/projects/${p.id}`,
          tags: p.stack,
          score,
        });
      }
    }
  }

  // Blog
  if (type === "all" || type === "blog") {
    for (const b of blogPosts) {
      const searchText = `${b.titleAr} ${b.titleEn} ${b.excerptAr ?? ""} ${b.excerptEn ?? ""} ${b.tags?.join(" ") ?? ""}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "blog",
          id: b.id,
          titleAr: b.titleAr,
          titleEn: b.titleEn,
          descriptionAr: b.excerptAr ?? b.titleAr,
          descriptionEn: b.excerptEn ?? b.titleEn,
          href: `/${locale}/blog/${b.id}`,
          tags: b.tags,
          score,
        });
      }
    }
  }

  // Prompts
  if (type === "all" || type === "prompt") {
    for (const p of prompts) {
      const searchText = `${p.titleAr} ${p.titleEn} ${p.useCaseAr} ${p.useCaseEn} ${p.category} ${p.tags?.join(" ") ?? ""}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "prompt",
          id: p.id,
          titleAr: p.titleAr,
          titleEn: p.titleEn,
          descriptionAr: p.useCaseAr,
          descriptionEn: p.useCaseEn,
          href: `/${locale}/prompts`,
          tags: p.tags ?? [p.category],
          score,
        });
      }
    }
  }

  // Nano Banana prompts
  if (type === "all" || type === "nano_banana") {
    for (const n of nanaBananaPrompts) {
      const searchText = `${n.titleAr} ${n.titleEn} ${n.category} ${n.descriptionAr} ${n.descriptionEn}`;
      const score = scoreMatch(searchText, q);
      if (score > 0) {
        results.push({
          type: "nano_banana",
          id: n.id,
          titleAr: n.titleAr,
          titleEn: n.titleEn,
          descriptionAr: n.descriptionAr,
          descriptionEn: n.descriptionEn,
          href: `/${locale}/nano-banana-prompts`,
          tags: [n.category, n.difficulty],
          score,
        });
      }
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return NextResponse.json({
    results: results.slice(0, limit).map(({ score: _score, ...r }) => r),
    total: results.length,
    query,
  });
}
