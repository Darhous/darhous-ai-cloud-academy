import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ExternalLink, GitBranch, CheckCircle, Monitor } from "lucide-react";
import CommunitySignup from "@/components/community/CommunitySignup";

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
  };
}

const examCategories = {
  ar: [
    { icon: "💻", title: "اختبارات تقنية المعلومات IT", topics: ["Hardware & Software", "Networks", "Operating Systems", "Cloud Basics"] },
    { icon: "📝", title: "مايكروسوفت ورد Word", topics: ["Document Formatting", "Tables & Images", "Mail Merge", "Advanced Editing"] },
    { icon: "📊", title: "مايكروسوفت إكسيل Excel", topics: ["Formulas & Functions", "Charts & Graphs", "Pivot Tables", "Data Analysis"] },
    { icon: "🎯", title: "باوربوينت PowerPoint", topics: ["Slide Design", "Animations", "Transitions", "Presentation Skills"] },
    { icon: "🗄️", title: "أكسيس Access", topics: ["Database Design", "Queries", "Forms & Reports", "Relationships"] },
    { icon: "🔐", title: "الأمن السيبراني", topics: ["Network Security", "Password Policies", "Phishing Awareness", "Data Protection"] },
    { icon: "🌐", title: "مهارات التحول الرقمي", topics: ["Digital Literacy", "Cloud Services", "E-Government", "Digital Communication"] },
  ],
  en: [
    { icon: "💻", title: "IT Fundamentals", topics: ["Hardware & Software", "Networks", "Operating Systems", "Cloud Basics"] },
    { icon: "📝", title: "Microsoft Word", topics: ["Document Formatting", "Tables & Images", "Mail Merge", "Advanced Editing"] },
    { icon: "📊", title: "Microsoft Excel", topics: ["Formulas & Functions", "Charts & Graphs", "Pivot Tables", "Data Analysis"] },
    { icon: "🎯", title: "PowerPoint", topics: ["Slide Design", "Animations", "Transitions", "Presentation Skills"] },
    { icon: "🗄️", title: "Microsoft Access", topics: ["Database Design", "Queries", "Forms & Reports", "Relationships"] },
    { icon: "🔐", title: "Cybersecurity", topics: ["Network Security", "Password Policies", "Phishing Awareness", "Data Protection"] },
    { icon: "🌐", title: "Digital Transformation Skills", topics: ["Digital Literacy", "Cloud Services", "E-Government", "Digital Communication"] },
  ],
};

const INTEGRATION_STATUS = {
  externalUrl: "https://github.com/Darhous/Exams_Platform",
};

export default async function DigitalExamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const categories = isAr ? examCategories.ar : examCategories.en;

  return (
    <div className="flex flex-col gap-20 pb-20 relative">
      {/* Ambient */}
      <div className="fixed top-0 start-0 pointer-events-none z-0" style={{ width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(60,224,251,0.05) 0%, transparent 65%)", filter: "blur(120px)" }} />

      <div className="container-xl pt-10 relative z-10">
        {/* Back */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {isAr ? "منصة درهوس" : "Darhous Platform"}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4" style={{ background: "rgba(60,224,251,0.08)", borderColor: "rgba(60,224,251,0.25)", color: "#3ce0fb" }}>
              💻 {isAr ? "اختبارات التحول الرقمي" : "Digital Exams Portal"} &nbsp;·&nbsp;
              <span className="text-green-400">{isAr ? "متاح الآن" : "Available Now"}</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "اختبارات التحول الرقمي" : "Digital Transformation Exams"}
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "اختبارات شاملة في IT وWord وExcel وPowerPoint وAccess والأمن السيبراني ومهارات التحول الرقمي — قيّم نفسك واحصل على شهادة."
                : "Comprehensive exams in IT, Word, Excel, PowerPoint, Access, Cybersecurity, and digital transformation skills — assess yourself and earn a certificate."}
            </p>
          </div>

          {/* CTA card */}
          <div className="glass-card rounded-2xl p-6 min-w-[260px] flex flex-col gap-4" style={{ border: "1px solid rgba(60,224,251,0.15)" }}>
            <div className="flex items-center gap-2">
              <Monitor size={18} style={{ color: "#3ce0fb" }} />
              <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "ابدأ الاختبار الآن" : "Start Your Exam Now"}
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "7 فئات من الاختبارات متاحة" : "7 exam categories available"}
            </p>
            <a
              href={INTEGRATION_STATUS.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono transition-all hover:opacity-80"
              style={{ background: "rgba(60,224,251,0.12)", border: "1px solid rgba(60,224,251,0.3)", color: "#3ce0fb" }}
            >
              <ExternalLink size={14} />
              {isAr ? "فتح منصة الاختبارات" : "Open Exams Platform"}
            </a>
            <div className="flex items-center gap-2 text-xs p-2.5 rounded-lg" style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80" }}>
              <CheckCircle size={12} />
              {isAr ? "دمج الحساب الموحد قيد التطوير" : "Unified account integration in progress"}
            </div>
          </div>
        </div>

        {/* Exam categories */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "فئات الاختبارات" : "Exam Categories"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(60,224,251,0.08)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                  <h3 className="font-bold text-sm leading-snug" style={{ color: "var(--color-on-surface)" }}>{cat.title}</h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {cat.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#3ce0fb" }} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Integration info */}
        <div className="rounded-2xl p-6 mb-14 flex flex-col sm:flex-row items-start gap-4" style={{ background: "rgba(60,224,251,0.04)", border: "1px solid rgba(60,224,251,0.12)" }}>
          <GitBranch size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#3ce0fb" }} />
          <div className="flex-1">
            <p className="font-bold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "حالة الدمج مع المنصة الموحدة" : "Integration Status with Unified Platform"}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "منصة الاختبارات جاهزة ومتاحة كمنصة مستقلة. نعمل على دمجها مع نظام حساب درهوس الموحد لحفظ نتائجك تلقائياً في لوحة التحكم."
                : "The exams platform is ready and available as a standalone platform. We are working on integrating it with the Darhous unified account system to automatically save your results to the dashboard."}
            </p>
          </div>
          <a href={INTEGRATION_STATUS.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono flex-shrink-0 transition-opacity hover:opacity-80" style={{ color: "#3ce0fb" }}>
            GitHub <ExternalLink size={11} />
          </a>
        </div>

        {/* Community Signup */}
        <div className="max-w-xl mx-auto">
          <p className="text-center text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "اشترك لتعرف عند اكتمال الدمج" : "Subscribe to know when full integration is complete"}
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
  );
}
