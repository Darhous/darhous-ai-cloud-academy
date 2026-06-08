import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Cpu, Trophy, Package, Monitor, FileCheck, Sparkles } from "lucide-react";
import PortalPageWrapper from "@/components/ui/PortalPageWrapper";
import PortalIdentityIntro from "@/components/portal/PortalIdentityIntro";
import { lessonsData } from "@/data/iot/lessons";
import type { Lesson } from "@/data/iot/lessons";
import { projectsData } from "@/data/iot/projects";
import type { Project } from "@/data/iot/projects";
import { challengesData } from "@/data/iot/challenges";
import type { Challenge } from "@/data/iot/challenges";
import { componentsData } from "@/data/iot/components";
import type { ComponentData } from "@/data/iot/components";
import { pathsData } from "@/data/iot/paths";
import type { PathData } from "@/data/iot/paths";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface LessonRow extends Record<string, unknown> {
  id: string; title: string; category: string; duration: string; description: string; content: string;
  components_needed: string[]; wiring_notes: string; code_example: string; common_mistakes: string;
  simulator_link?: string; next_lesson_id?: string; title_en?: string; category_en?: string;
  description_en?: string; content_en?: string; wiring_notes_en?: string; common_mistakes_en?: string;
}
function mapLessonRow(row: LessonRow): Lesson {
  return {
    id: row.id, title: row.title, category: row.category, duration: row.duration, description: row.description,
    content: row.content, componentsNeeded: row.components_needed ?? [], wiringNotes: row.wiring_notes,
    codeExample: row.code_example, commonMistakes: row.common_mistakes, simulatorLink: row.simulator_link,
    nextLessonId: row.next_lesson_id, titleEn: row.title_en, categoryEn: row.category_en,
    descriptionEn: row.description_en, contentEn: row.content_en, wiringNotesEn: row.wiring_notes_en,
    commonMistakesEn: row.common_mistakes_en,
  };
}
async function fetchAllLessons(): Promise<Lesson[]> {
  const dbLessons = await fetchPublishedList<LessonRow, Lesson>({
    table: "iot_lessons", mapRow: mapLessonRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbLessons, lessonsData);
}

interface ProjectRow extends Record<string, unknown> {
  id: string; title: string; category: string; difficulty: Project["difficulty"]; duration: string;
  description: string; features: string[]; components: string[]; wiring_guide: string; code_snippet: string;
  video_url?: string; simulator_link?: string;
}
function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id, title: row.title, category: row.category, difficulty: row.difficulty, duration: row.duration,
    description: row.description, features: row.features ?? [], components: row.components ?? [],
    wiringGuide: row.wiring_guide, codeSnippet: row.code_snippet, videoUrl: row.video_url, simulatorLink: row.simulator_link,
  };
}
async function fetchAllProjects(): Promise<Project[]> {
  const dbProjects = await fetchPublishedList<ProjectRow, Project>({
    table: "iot_projects", mapRow: mapProjectRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbProjects, projectsData);
}

interface ChallengeRow extends Record<string, unknown> {
  id: string; title: string; description: string; level: Challenge["level"];
  xp_reward: number; badge_id?: string; tasks: string[];
}
function mapChallengeRow(row: ChallengeRow): Challenge {
  return { id: row.id, title: row.title, description: row.description, level: row.level, xpReward: row.xp_reward, badgeId: row.badge_id, tasks: row.tasks ?? [] };
}
async function fetchAllChallenges(): Promise<Challenge[]> {
  const dbChallenges = await fetchPublishedList<ChallengeRow, Challenge>({
    table: "iot_challenges", mapRow: mapChallengeRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbChallenges, challengesData);
}

interface ComponentRow extends Record<string, unknown> {
  id: string; name: string; category: ComponentData["category"]; description: string;
  pins: { name: string; description: string }[]; price_range?: string; buy_link?: string;
}
function mapComponentRow(row: ComponentRow): ComponentData {
  return { id: row.id, name: row.name, category: row.category, description: row.description, pins: row.pins ?? [], priceRange: row.price_range, buyLink: row.buy_link };
}
async function fetchAllComponents(): Promise<ComponentData[]> {
  const dbComponents = await fetchPublishedList<ComponentRow, ComponentData>({
    table: "iot_components", mapRow: mapComponentRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbComponents, componentsData);
}

interface PathRow extends Record<string, unknown> {
  id: string; title: string; english_title: string; level: PathData["level"]; duration: string;
  target_learner: string; prerequisites: string; description: string; modules: string[];
  related_lessons: string[]; related_projects: string[]; related_code_examples: string[]; related_components: string[];
  final_project: string; cta_text: string;
}
function mapPathRow(row: PathRow): PathData {
  return {
    id: row.id, title: row.title, englishTitle: row.english_title, level: row.level, duration: row.duration,
    targetLearner: row.target_learner, prerequisites: row.prerequisites, description: row.description,
    modules: row.modules ?? [], relatedLessons: row.related_lessons ?? [], relatedProjects: row.related_projects ?? [],
    relatedCodeExamples: row.related_code_examples ?? [], relatedComponents: row.related_components ?? [],
    finalProject: row.final_project, ctaText: row.cta_text,
  };
}
async function fetchAllPaths(): Promise<PathData[]> {
  const dbPaths = await fetchPublishedList<PathRow, PathData>({
    table: "iot_paths", mapRow: mapPathRow, match: { portal_id: "iot-lab" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbPaths, pathsData);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مختبر درهوس لإنترنت الأشياء والأردوينو | درهوس" : "Darhous IoT Lab | Darhous",
    description: isAr
      ? "59 درس أردوينو، 72 مشروع، 40 تحدي برمجي، ومكتبة المكونات الإلكترونية الشاملة."
      : "59 Arduino lessons, 72 projects, 40 coding challenges, and comprehensive component library.",
    robots: { index: true },
    openGraph: {
      title: isAr ? "مختبر درهوس للـ IoT والأردوينو" : "Darhous IoT Lab",
      description: isAr
        ? "59 درس أردوينو، 72 مشروع عملي، 40 تحدي، ومحاكي تفاعلي — ابدأ رحلتك في إنترنت الأشياء."
        : "59 Arduino lessons, 72 hands-on projects, 40 challenges, and interactive simulator — start your IoT journey.",
      url: `/${locale}/iot-lab`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function IotLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [allLessons, allProjects, allChallenges, allComponents, allPaths] = await Promise.all([
    fetchAllLessons(),
    fetchAllProjects(),
    fetchAllChallenges(),
    fetchAllComponents(),
    fetchAllPaths(),
  ]);

  const SECTIONS = [
    {
      href: "/iot-lab/paths",
      icon: <BookOpen size={20} />,
      titleAr: "مسارات التعلم",
      descAr: "مسارات منظمة من الصفر: أردوينو للمبتدئين، أساسيات الإلكترونيات، الحساسات، والشاشات.",
      color: "#f97316",
      count: allPaths.length,
      unit: "مسار",
    },
    {
      href: "/iot-lab/lessons",
      icon: <Cpu size={20} />,
      titleAr: "الدروس",
      descAr: "دروس تفاعلية بالعربية مع كود مثال، مخطط التوصيل، والأخطاء الشائعة لكل درس.",
      color: "#8ed5ff",
      count: allLessons.length,
      unit: "درس",
    },
    {
      href: "/iot-lab/projects",
      icon: <Trophy size={20} />,
      titleAr: "المشاريع",
      descAr: "72 مشروع من السهل للتخرج — كل مشروع بمكونات، مخطط توصيل، وكود جاهز.",
      color: "#4ade80",
      count: allProjects.length,
      unit: "مشروع",
    },
    {
      href: "/iot-lab/challenges",
      icon: <Trophy size={20} />,
      titleAr: "التحديات",
      descAr: "تحديات برمجية مرتبة بالصعوبة مع نقاط XP وشارات — اختبر مهاراتك.",
      color: "#d0bcff",
      count: allChallenges.length,
      unit: "تحدي",
    },
    {
      href: "/iot-lab/component-library",
      icon: <Package size={20} />,
      titleAr: "مكتبة المكونات",
      descAr: "دليل شامل للمكونات الإلكترونية: الوصف، الاستخدام، ومثال توصيل لكل مكوّن.",
      color: "#fbbf24",
      count: allComponents.length,
      unit: "مكوّن",
    },
    {
      href: "/iot-lab/simulator",
      icon: <Monitor size={20} />,
      titleAr: "المحاكي التفاعلي",
      descAr: "جرّب مشاريع الأردوينو مباشرة في المتصفح عبر Wokwi بدون أي أجهزة.",
      color: "#3ce0fb",
      count: null,
      unit: "",
    },
    {
      href: "/iot-lab/exams",
      icon: <FileCheck size={20} />,
      titleAr: "الاختبارات",
      descAr: "اختبر فهمك للمفاهيم الإلكترونية والبرمجة واحصل على شهادة إنجاز.",
      color: "#f87171",
      count: null,
      unit: "",
    },
  ];

  return (
    <PortalPageWrapper>
    <div className="min-h-screen relative" dir="rtl">
      {/* Ambient orbs */}
      <div className="fixed pointer-events-none z-0" style={{ top: 0, right: 0, width: "55vw", height: "55vw", background: "radial-gradient(circle, var(--portal-color-subtle) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="fixed pointer-events-none z-0" style={{ bottom: 0, left: 0, width: "40vw", height: "40vw", background: "radial-gradient(circle, var(--portal-color-faint) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="container-xl py-16 relative z-10">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono mb-12 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
          <ArrowRight size={14} />العودة للرئيسية
        </Link>

        {/* Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6" style={{ background: "var(--portal-color-subtle)", border: "1px solid var(--portal-color-glow)", color: "var(--portal-color)" }}>
            <Sparkles size={14} />مختبر إنترنت الأشياء والأردوينو
          </div>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6" style={{ background: "var(--portal-color-subtle)", border: "1px solid var(--portal-color-glow)", boxShadow: "0 0 60px var(--portal-color-glow)" }}>
            🔌
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight" style={{ color: "var(--color-on-surface)" }}>
            مختبر درهوس{" "}
            <span className="bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(135deg, #f97316, #fb923c)" }}>
              للأردوينو وإنترنت الأشياء
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)", maxWidth: 580, margin: "0 auto" }}>
            تعلم برمجة الأردوينو بالعربية — من أول بلينك إلى مشاريع IoT متكاملة، بدروس وتحديات ومشاريع تطبيقية.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 py-6 rounded-2xl" style={{ background: "var(--portal-color-faint)", border: "1px solid var(--portal-color-border)" }}>
          {[
            { v: `${allLessons.length}+`, l: "درس تعليمي" },
            { v: `${allProjects.length}`, l: "مشروع تطبيقي" },
            { v: `${allChallenges.length}+`, l: "تحدي برمجي" },
            { v: `${allComponents.length}+`, l: "مكوّن إلكتروني" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: "var(--portal-color)" }}>{s.v}</div>
              <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Portal identity intro — Phase 9C */}
        <PortalIdentityIntro portalKey="iot-lab" locale={locale} sectionClass="mb-16" />

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SECTIONS.map((sec) => (
            <Link
              key={sec.href}
              href={`/${locale}${sec.href}`}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:scale-[1.01]"
              style={{ border: `1px solid ${sec.color}18`, textDecoration: "none" }}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${sec.color}12`, border: `1px solid ${sec.color}22`, color: sec.color }}>
                  {sec.icon}
                </div>
                {sec.count !== null && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${sec.color}12`, color: sec.color, border: `1px solid ${sec.color}20` }}>
                    {sec.count} {sec.unit}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>{sec.titleAr}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{sec.descAr}</p>
              </div>
              <div className="w-full text-center py-2 rounded-lg text-sm font-mono font-medium mt-auto" style={{ background: `${sec.color}10`, border: `1px solid ${sec.color}25`, color: sec.color }}>
                دخول
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center rounded-3xl p-10" style={{ background: "var(--portal-color-faint)", border: "1px solid var(--portal-color-border)" }}>
          <h2 className="font-bold text-2xl mb-3" style={{ color: "var(--color-on-surface)" }}>ابدأ رحلتك مع الأردوينو</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>لا تحتاج أي خبرة سابقة — ابدأ من أول درس وصل لمشاريع IoT متكاملة.</p>
          <Link href={`/${locale}/iot-lab/paths`} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm" style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#0c0e12", boxShadow: "0 0 30px var(--portal-color-glow)" }}>
            <BookOpen size={16} />ابدأ من مسارات التعلم
          </Link>
        </div>
      </div>
    </div>
    </PortalPageWrapper>
  );
}
