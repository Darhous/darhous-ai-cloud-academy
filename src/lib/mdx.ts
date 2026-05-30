// Server-only — reads MDX content files for blog posts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface MdxFrontmatter {
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  date: string;
  category: string;
  icon: string;
  tags: string[];
  readingTime: number;
}

export interface MdxPost {
  slug: string;
  frontmatter: MdxFrontmatter;
  content: string;
}

export function getMdxSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMdxPost(slug: string): MdxPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as MdxFrontmatter, content };
}

export function getAllMdxPosts(): MdxPost[] {
  return getMdxSlugs()
    .map((slug) => getMdxPost(slug))
    .filter((p): p is MdxPost => p !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}
