import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { fetchDbProject } from "../../dbProjects";
import BuildProjectClient from "./BuildProjectClient";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.id === slug) ?? (await fetchDbProject(slug));
  const isAr = locale === "ar";
  if (!project) return { title: isAr ? "مشروع غير موجود" : "Project Not Found" };
  return {
    title: isAr ? `ابنِ: ${project.titleAr}` : `Build: ${project.titleEn}`,
    description: isAr ? project.descriptionAr : project.descriptionEn,
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return projects.flatMap((p) =>
    ["ar", "en"].map((locale) => ({ locale, slug: p.id }))
  );
}

export default async function BuildProjectPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.id === slug) ?? (await fetchDbProject(slug));
  if (!project) notFound();
  return <BuildProjectClient locale={locale} project={project} />;
}
