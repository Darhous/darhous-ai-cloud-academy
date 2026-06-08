import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, Monitor } from "lucide-react";
import CommunitySignup from "@/components/community/CommunitySignup";
import { examSubjects } from "@/data/digital-exam-subjects";
import type { ExamSubject, ExamQuestion } from "@/data/digital-exam-subjects";
import PortalPageWrapper from "@/components/ui/PortalPageWrapper";
import PortalIdentityIntro from "@/components/portal/PortalIdentityIntro";
import { fetchPublishedList, mergeById } from "@/lib/content/read-with-fallback";

interface ExamSubjectRow extends Record<string, unknown> {
  id: string; label: string; label_ar: string; icon: string; color: string;
  description: string; description_ar: string; questions: ExamQuestion[];
}
function mapExamSubjectRow(row: ExamSubjectRow): ExamSubject {
  return {
    id: row.id, label: row.label, labelAr: row.label_ar, icon: row.icon, color: row.color,
    description: row.description, descriptionAr: row.description_ar, questions: row.questions ?? [],
  };
}
async function fetchExamSubjects(): Promise<ExamSubject[]> {
  const dbSubjects = await fetchPublishedList<ExamSubjectRow, ExamSubject>({
    table: "exam_subjects", mapRow: mapExamSubjectRow, match: { portal_id: "digital-exams" }, orderBy: { column: "sort_order", ascending: true },
  });
  return mergeById(dbSubjects, examSubjects);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اختبارات التحول الرقمي | درهوس" : "Digital Transformation Exams | Darhous",
    description: isAr
      ? "اختبارات IT وOffice والأمن السيبراني ومهارات التحول الرقمي"
      : "IT, Office suite, Cybersecurity, and digital transformation skills exams",
    robots: { index: true },
    openGraph: {
      title: isAr ? "اختبارات التحول الرقمي — درهوس" : "Digital Transformation Exams — Darhous",
      description: isAr
        ? "9 اختبارات معتمدة: IT، Word، Excel، PowerPoint، Access، تطبيقات الموبايل، الويب، الأمن السيبراني، البحث — 902+ سؤال — ابدأ مجاناً."
        : "9 certified exams: IT, Word, Excel, PowerPoint, Access, Mobile, WebApps, Cybersecurity, Internet Search — 902+ questions — free to start.",
      url: `/${locale}/digital-exams`,
      images: [{ url: "/og-image.svg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}


export default async function DigitalExamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const subjects = await fetchExamSubjects();

  return (
    <PortalPageWrapper>
    <div className="flex flex-col gap-20 pb-20 relative">
      {/* Ambient */}
      <div className="fixed top-0 start-0 pointer-events-none z-0" style={{ width: "50vw", height: "50vw", background: "radial-gradient(circle, var(--portal-color-faint) 0%, transparent 65%)", filter: "blur(120px)" }} />

      <div className="container-xl pt-10 relative z-10">
        {/* Back */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {isAr ? "منصة درهوس" : "Darhous Platform"}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4" style={{ background: "var(--portal-color-subtle)", borderColor: "var(--portal-color-glow)", color: "var(--portal-color)" }}>
              💻 {isAr ? "اختبارات التحول الرقمي" : "Digital Exams Portal"} &nbsp;·&nbsp;
              <span className="text-green-400">{isAr ? "متاح الآن" : "Available Now"}</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "اختبارات التحول الرقمي" : "Digital Transformation Exams"}
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "9 اختبارات شاملة · 902+ سؤال عشوائي في IT وWord وExcel وPowerPoint وAccess وتطبيقات الموبايل والويب والأمن السيبراني والبحث — قيّم نفسك واحصل على شهادة عند 80%+."
                : "9 comprehensive exams · 902+ random questions in IT, Word, Excel, PowerPoint, Access, Mobile, WebApps, Cybersecurity, Internet Search — assess yourself and earn a certificate at 80%+."}
            </p>
          </div>

          {/* CTA card */}
          <div className="glass-card rounded-2xl p-6 min-w-[260px] flex flex-col gap-4" style={{ border: "1px solid var(--portal-color-border)" }}>
            <div className="flex items-center gap-2">
              <Monitor size={18} style={{ color: "var(--portal-color)" }} />
              <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "ابدأ الاختبار الآن" : "Start Your Exam Now"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs px-2.5 py-1 rounded-full self-start" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}>
              <CheckCircle size={11} />
              {isAr ? "مدمج الآن" : "Now Integrated"}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "9 مواد · 902+ سؤال — النتائج والشهادات تُحفظ في حسابك" : "9 subjects · 902+ questions — results and certificates saved to your account"}
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <Link href={`/${locale}/digital-exams/mixed`} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#f59e0b" }}>
                🏆 {isAr ? "الامتحان المجمع الشامل" : "Mixed Comprehensive Exam"}
              </Link>
              <Link href={`/${locale}/digital-exams/library`} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--portal-color)" }}>
                📚 {isAr ? "المكتبة الرقمية" : "Digital Library"}
              </Link>
              <Link href={`/${locale}/digital-exams/history`} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#8ed5ff" }}>
                📊 {isAr ? "سجل أدائي" : "My Performance History"}
              </Link>
            </div>
          </div>
        </div>

        {/* Portal identity intro — Phase 9C */}
        <PortalIdentityIntro portalKey="digital-exams" locale={locale} sectionClass="mb-12" />

        {/* Exam categories */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "فئات الاختبارات" : "Exam Categories"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/${locale}/digital-exams/${subject.id}`}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                style={{ border: `1px solid ${subject.color}15`, textDecoration: "none" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{subject.icon}</span>
                  <h3 className="font-bold text-sm leading-snug" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? subject.labelAr : subject.label}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? subject.descriptionAr : subject.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-1">
                  <span className="text-[10px] font-mono" style={{ color: subject.color }}>
                    {subject.questions.length} {isAr ? "سؤال" : "q"}
                  </span>
                  <Arrow size={14} style={{ color: subject.color }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Integration info */}
        <div className="rounded-2xl p-6 mb-14 flex flex-col sm:flex-row items-start gap-4" style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)" }}>
          <CheckCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#4ade80" }} />
          <div className="flex-1">
            <p className="font-bold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "✅ مدمج بالكامل مع منصة درهوس" : "✅ Fully Integrated with Darhous Platform"}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "9 فئات · 902+ سؤال عشوائي · شهادة PDF عند 80%+ · امتحان مجمع شامل · مكتبة رقمية · سجل أداء مفصّل. نتائجك تُحفظ في حسابك وتظهر في لوحة التحكم الموحدة."
                : "9 categories · 902+ random questions · PDF certificate at 80%+ · mixed comprehensive exam · digital library · detailed performance history. Results saved to your account and appear on your unified dashboard."}
            </p>
          </div>
        </div>

        {/* Community Signup */}
        <div className="max-w-xl mx-auto">
          <p className="text-center text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "اشترك للحصول على آخر الاختبارات والأخبار" : "Subscribe for new exams and platform updates"}
          </p>
          <CommunitySignup locale={locale} variant="footer" source="digital-exams-portal" />
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono transition-opacity hover:opacity-80" style={{ color: "var(--color-primary)" }}>
            {isAr ? "عرض كل البوابات" : "View All Portals"} <Arrow size={14} />
          </Link>
        </div>
      </div>
    </div>
    </PortalPageWrapper>
  );
}
