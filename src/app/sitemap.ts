import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";
const locales = ["ar", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/courses", "/paths", "/tools", "/claude", "/cloud",
    "/projects", "/prompts", "/blog", "/glossary", "/about", "/contact",
    "/mentor", "/dashboard", "/prompt-studio", "/claude-code-generator",
    "/tool-recommender", "/roadmap-generator", "/privacy", "/terms",
    "/nano-banana-prompts", "/login", "/register",
    "/forgot-password",
  ];

  // Admin pages excluded (noindex anyway)

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : path === "/nano-banana-prompts" ? 0.9 : 0.8,
    }))
  );

  const courseEntries = locales.flatMap((locale) =>
    courses.map((c) => ({
      url: `${BASE_URL}/${locale}/courses/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const toolEntries = locales.flatMap((locale) =>
    tools.map((t) => ({
      url: `${BASE_URL}/${locale}/tools/${t.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${BASE_URL}/${locale}/projects/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((b) => ({
      url: `${BASE_URL}/${locale}/blog/${b.id}`,
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: b.featured ? 0.75 : 0.65,
    }))
  );

  return [...staticEntries, ...courseEntries, ...toolEntries, ...projectEntries, ...blogEntries];
}
