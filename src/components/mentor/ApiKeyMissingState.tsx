interface Props {
  isAr: boolean;
}

export default function ApiKeyMissingState({ isAr }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
        style={{
          background: "rgba(255,100,100,0.08)",
          border: "1px solid rgba(255,100,100,0.2)",
        }}
      >
        ⚙️
      </div>
      <h2 className="text-xl font-bold mb-3" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "المرشد غير متاح حالياً" : "Mentor Unavailable"}
      </h2>
      <p
        className="text-sm max-w-sm leading-relaxed"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {isAr
          ? "لم يتم تكوين خدمة الذكاء الاصطناعي. يرجى إضافة GEMINI_API_KEY في ملف .env.local وإعادة تشغيل الخادم."
          : "The AI service is not configured. Please add GEMINI_API_KEY to your .env.local file and restart the server."}
      </p>
      <div
        className="mt-6 px-4 py-2 rounded-lg text-xs font-mono"
        style={{
          background: "var(--color-surface-container)",
          border: "1px solid var(--color-outline-variant)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        GEMINI_API_KEY=your_key_here
      </div>
    </div>
  );
}
