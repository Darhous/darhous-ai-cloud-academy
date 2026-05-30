import { Sparkles } from "lucide-react";

interface Props {
  isAr: boolean;
}

export default function MentorHero({ isAr }: Props) {
  return (
    <div className="text-center pt-10 pb-4 px-4">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-5"
        style={{
          background: "rgba(142,213,255,0.08)",
          border: "1px solid rgba(142,213,255,0.2)",
          color: "var(--color-primary)",
        }}
      >
        <Sparkles size={12} />
        {isAr ? "مدعوم بـ Gemini 2.5 Flash" : "Powered by Gemini 2.5 Flash"}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        <span className="gradient-text">
          {isAr ? "مرشد درهوس للذكاء الاصطناعي" : "Darhous AI Mentor"}
        </span>
      </h1>

      <p
        className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {isAr
          ? "مساعدك الذكي الشخصي — اسأل، تعلم، راجع كودك، وخطط مسيرتك المهنية في الذكاء الاصطناعي"
          : "Your personal AI assistant — ask questions, learn concepts, review code, and plan your AI career"}
      </p>
    </div>
  );
}
