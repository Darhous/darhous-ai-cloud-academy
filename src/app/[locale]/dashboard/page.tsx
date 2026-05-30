import type { Metadata } from "next";
import { Lock, TrendingUp, BookOpen, Save, Award, Brain, Cloud, Activity } from "lucide-react";
import Badge from "@/components/ui/Badge";
import MySpacePanel from "@/components/features/MySpacePanel";
import SavedPromptsPanel from "@/components/features/SavedPromptsPanel";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "لوحة تحكم الطالب — قريبًا" : "Student Dashboard — Coming Soon",
    description: isAr
      ? "مركز قيادة التعلم الشخصي — تتبع التقدم والشهادات ومختبرات الكلاود قريبًا"
      : "Personal learning command center — progress tracking, certificates, and cloud labs coming soon",
    robots: { index: false },
  };
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const features = isAr
    ? [
        { icon: <TrendingUp size={20} />, title: "تتبع التقدم", desc: "مشاهدة تقدمك في كل مسار ودورة" },
        { icon: <BookOpen size={20} />, title: "الدورات المحفوظة", desc: "الوصول السريع لدوراتك المفضلة" },
        { icon: <Save size={20} />, title: "المطالبات المحفوظة", desc: "مكتبة المطالبات الشخصية الخاصة بك" },
        { icon: <Award size={20} />, title: "الشهادات", desc: "شهادات إتمام الدورات والمسارات" },
        { icon: <Brain size={20} />, title: "مساعد AI", desc: "مساعد AI شخصي لمساعدتك في التعلم" },
        { icon: <Cloud size={20} />, title: "مختبرات الكلاود", desc: "مختبرات سحابية تفاعلية للتدريب" },
        { icon: <Activity size={20} />, title: "خريطة المهارات", desc: "خريطة بصرية لمهاراتك المكتسبة" },
        { icon: <TrendingUp size={20} />, title: "التسلسل اليومي", desc: "تتبع أيام التعلم المتتالية" },
      ]
    : [
        { icon: <TrendingUp size={20} />, title: "Progress Tracking", desc: "Track your progress in every path and course" },
        { icon: <BookOpen size={20} />, title: "Saved Courses", desc: "Quick access to your favorite courses" },
        { icon: <Save size={20} />, title: "Saved Prompts", desc: "Your personal prompt library" },
        { icon: <Award size={20} />, title: "Certificates", desc: "Course and path completion certificates" },
        { icon: <Brain size={20} />, title: "AI Assistant", desc: "Personal AI assistant to help you learn" },
        { icon: <Cloud size={20} />, title: "Cloud Labs", desc: "Interactive cloud labs for practice" },
        { icon: <Activity size={20} />, title: "Skill Map", desc: "Visual map of your acquired skills" },
        { icon: <TrendingUp size={20} />, title: "Learning Streak", desc: "Track consecutive learning days" },
      ];

  return (
    <div className="container-xl py-16 flex flex-col items-center gap-12">
      {/* Coming Soon Banner */}
      <div
        className="w-full rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.2) 0%, rgba(87,27,193,0.15) 100%)",
          border: "1px solid rgba(142,213,255,0.1)",
        }}
      >
        <div className="env-orb env-orb-blue absolute -top-20 left-0 opacity-40" style={{ width: "300px", height: "300px" }} />
        <div className="env-orb env-orb-violet absolute -bottom-20 right-0 opacity-30" style={{ width: "300px", height: "300px" }} />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <Lock size={40} style={{ color: "var(--color-primary)" }} />
          </div>
          <Badge variant="secondary" className="mb-4">
            {isAr ? "قريبًا" : "Coming Soon"}
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لوحة تحكم الطالب" : "Student Dashboard"}
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "مركز قيادة التعلم الشخصي بالذكاء الاصطناعي قيد الإنشاء. سيكون متاحًا قريبًا!"
              : "Your personal AI learning command center is under construction. Coming soon!"}
          </p>
        </div>
      </div>

      {/* Preview of features */}
      <div className="w-full">
        <h2 className="font-display font-bold text-2xl mb-6 text-center" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "ما يمكنك توقعه" : "What to Expect"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 opacity-70"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-surface-container-high)", color: "var(--color-primary)" }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{f.title}</h3>
              <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard preview mockup */}
      <div
        className="w-full rounded-2xl p-6 relative"
        style={{ background: "var(--color-surface-container)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <div className="text-center">
            <Lock size={32} className="mx-auto mb-3" style={{ color: "var(--color-primary)" }} />
            <p className="font-mono font-bold" style={{ color: "var(--color-primary)" }}>
              {isAr ? "قريبًا" : "Coming Soon"}
            </p>
          </div>
        </div>

        {/* Mock dashboard content (blurred behind) */}
        <div className="grid grid-cols-3 gap-4 blur-sm pointer-events-none select-none">
          {["Progress: 75%", "Streak: 14 days", "Courses: 3"].map((item) => (
            <div key={item} className="glass-card rounded-xl p-4">
              <p className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Space — localStorage favorites */}
      <MySpacePanel locale={locale} />

      {/* Saved generated prompts */}
      <SavedPromptsPanel locale={locale} />
    </div>
  );
}
