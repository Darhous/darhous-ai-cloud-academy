import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import { Bot, Target, Heart, Zap } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "عن المنصة" : "About",
    description: isAr
      ? "أكاديمية درهوس للذكاء الاصطناعي — منصة عربية تعليمية تجمع بين الجودة والعملية والمجتمع"
      : "Darhous AI Cloud Academy — Arabic learning platform combining quality, practicality, and community",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const values = isAr
    ? [
        { icon: <Target size={22} />, title: "مهمتنا", desc: "جعل تعليم الذكاء الاصطناعي متاحًا ومفيدًا لكل عربي يريد البناء في عالم AI." },
        { icon: <Heart size={22} />, title: "قيمنا", desc: "التعليم العملي. المحتوى الأصيل. اللغة العربية أولًا. المجتمع قبل الأرباح." },
        { icon: <Zap size={22} />, title: "رؤيتنا", desc: "أن نكون المرجع الأول في العالم العربي لتعلم الذكاء الاصطناعي والكلاود." },
      ]
    : [
        { icon: <Target size={22} />, title: "Our Mission", desc: "Make AI education accessible and practical for every Arab developer who wants to build in the AI world." },
        { icon: <Heart size={22} />, title: "Our Values", desc: "Practical education. Authentic content. Arabic-first. Community before profit." },
        { icon: <Zap size={22} />, title: "Our Vision", desc: "To be the number one Arabic reference for learning AI and Cloud." },
      ];

  const stats = [
    { value: "12+", label: isAr ? "مسار تعليمي" : "Learning Paths" },
    { value: "100+", label: isAr ? "درس مقترح" : "Lessons" },
    { value: "50+", label: isAr ? "أداة AI" : "AI Tools" },
    { value: "30+", label: isAr ? "مشروع عملي" : "Projects" },
  ];

  return (
    <div className="container-xl py-16 flex flex-col gap-16">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "عن المنصة" : "About"}
          title={isAr ? "عن أكاديمية درهوس" : "About Darhous AI Cloud Academy"}
          subtitle={isAr
            ? "مبنية للمتعلمين العرب الذين يريدون إتقان الذكاء الاصطناعي بدون عوائق"
            : "Built for Arab learners who want to master AI without barriers"}
        />
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Bot size={32} style={{ color: "var(--color-tertiary)" }} />
            <h2 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "قصة المنصة" : "Our Story"}
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            <p>
              {isAr
                ? "أكاديمية درهوس للذكاء الاصطناعي والكلاود وُلدت من حاجة حقيقية: المتعلم العربي يريد تعلم AI بلغته، بمحتوى عملي، وبطريقة منظمة تأخذه من الصفر إلى بناء مشاريع حقيقية."
                : "Darhous AI Cloud Academy was born from a real need: Arab learners want to learn AI in their language, with practical content, and an organized way that takes them from zero to building real projects."}
            </p>
            <p>
              {isAr
                ? "نحن لسنا مجرد موقع آخر للدورات. نحن نبني منظومة تعليمية متكاملة تشمل المسارات والأدوات والمشاريع والمجتمع — كل ما يحتاجه المطور العربي لبناء مستقبله في عالم الذكاء الاصطناعي."
                : "We're not just another course site. We're building a comprehensive learning ecosystem that includes paths, tools, projects, and community — everything an Arab developer needs to build their future in the AI world."}
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v) => (
          <div
            key={v.title}
            className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}
            >
              {v.icon}
            </div>
            <h3 className="font-display font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>{v.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        style={{ background: "var(--color-surface-container)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display font-bold text-4xl mb-2 gradient-text">{s.value}</div>
            <div className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
