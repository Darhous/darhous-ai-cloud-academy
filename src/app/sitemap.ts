import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { curatedWorkflows } from "@/data/automation/workflowLibrary";
import { automationLabsV2 } from "@/data/automation/automationLabsV2";
import { lessonsData } from "@/data/iot/lessons";
import { projectsData } from "@/data/iot/projects";
import { challengesData } from "@/data/iot/challenges";
import { componentsData } from "@/data/iot/components";
const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";
const locales = ["ar", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Public content pages only — no auth/private pages
  const staticPages = [
    "", "/courses", "/paths", "/tools", "/claude", "/cloud",
    "/projects", "/prompts", "/blog", "/glossary", "/about", "/contact",
    "/mentor", "/prompt-studio", "/claude-code-generator",
    "/tool-recommender", "/roadmap-generator", "/privacy", "/terms",
    "/nano-banana-prompts",
    // v3 new public pages
    "/search", "/challenges", "/leaderboard",
    "/prompt-battle", "/prompt-score", "/compare-tools",
    "/project-generator",
    // v4 ecosystem portals (landing pages only — /assessment and /results are noindex, excluded from sitemap)
    "/ai-academy", "/language", "/language/history",
    "/digital-exams", "/digital-exams/mixed", "/digital-exams/library",
    // v5 full native portals
    "/career", "/career/cv-analyzer", "/career/builder", "/career/jobs", "/career/interview", "/career/templates",
    "/automation", "/automation/templates", "/automation/tools", "/automation/paths", "/automation/services", "/automation/labs",
    "/iot-lab", "/iot-lab/paths", "/iot-lab/lessons", "/iot-lab/projects", "/iot-lab/challenges",
    "/iot-lab/component-library", "/iot-lab/simulator", "/iot-lab/exams",
  ];
  // Excluded from sitemap (noindex or private):
  // /login, /register, /forgot-password, /reset-password,
  // /dashboard, /profile, /onboarding, /admin,
  // /certificates, /learning-plans (private user data)

  // Admin pages excluded (noindex anyway)

  const v3Pages = new Set(["/search", "/challenges", "/leaderboard", "/prompt-battle", "/prompt-score", "/compare-tools", "/project-generator"]);

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : path === "/nano-banana-prompts" ? 0.9 : v3Pages.has(path) ? 0.85 : 0.8,
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

  // Automation Recipe Library — all visible curated workflows (25)
  const workflowEntries = locales.flatMap((locale) =>
    curatedWorkflows
      .filter((w) => w.visible !== false)
      .map((w) => ({
        url: `${BASE_URL}/${locale}/automation/templates/${w.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }))
  );

  // Automation Labs — 15 labs × 2 locales = 30 entries
  const labEntries = locales.flatMap((locale) =>
    automationLabsV2.map((lab) => ({
      url: `${BASE_URL}/${locale}/automation/labs/${lab.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // IoT Lab detail pages — Arabic only (content is currently Arabic-only)
  // /en detail pages are excluded from sitemap to avoid noindex conflicts
  const iotLessonEntries = lessonsData.map((item) => ({
    url: `${BASE_URL}/ar/iot-lab/lessons/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const iotProjectEntries = projectsData.map((item) => ({
    url: `${BASE_URL}/ar/iot-lab/projects/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const iotChallengeEntries = challengesData.map((item) => ({
    url: `${BASE_URL}/ar/iot-lab/challenges/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const iotComponentEntries = componentsData.map((item) => ({
    url: `${BASE_URL}/ar/iot-lab/component-library/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // Digital Exams subjects are excluded from sitemap — each subject page is noindex
  // (interactive exam pages, not landing content)

  return [
    ...staticEntries,
    ...courseEntries,
    ...toolEntries,
    ...projectEntries,
    ...blogEntries,
    ...workflowEntries,
    ...labEntries,
    ...iotLessonEntries,
    ...iotProjectEntries,
    ...iotChallengeEntries,
    ...iotComponentEntries,
  ];
}
