"use client";

const TECH_ITEMS: { label: string; color: string }[] = [
  { label: "كلود AI",                          color: "#8ed5ff" },
  { label: "نكست.جي إس",                        color: "#d0bcff" },
  { label: "رياكت",                             color: "#3ce0fb" },
  { label: "سوبابيس",                           color: "#4ade80" },
  { label: "تيلويند",                           color: "#38bdf8" },
  { label: "فيرسيل",                            color: "#c1c6d7" },
  { label: "تايب سكريبت",                       color: "#60a5fa" },
  { label: "فريمر موشن",                        color: "#c084fc" },
  { label: "بايثون",                            color: "#fbbf24" },
  { label: "أتمتة",                             color: "#f97316" },
  { label: "إنترنت الأشياء",                    color: "#34d399" },
  { label: "كلاود",                             color: "#fb7185" },
  { label: "أكاديمية الذكاء الاصطناعي",         color: "#8ed5ff" },
  { label: "بوابة اللغة",                       color: "#d0bcff" },
  { label: "اختبارات التحول الرقمي",            color: "#3ce0fb" },
  { label: "بوابة NexaLearn المهنية",           color: "#fbbf24" },
  { label: "أكاديمية NexaLearn للأتمتة",        color: "#4ade80" },
  { label: "مختبر NexaLearn لإنترنت الأشياء",  color: "#f97316" },
  { label: "نانو بانانا",                        color: "#fb923c" },
  { label: "بوابات قادمة",                      color: "#a78bfa" },
];

const REPEAT = 8;
const ITEM_FONT: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif",
  letterSpacing: "0.04em",
};

function MarqueeRow({
  label,
  color,
  goLeft,
  duration,
}: {
  label: string;
  color: string;
  goLeft: boolean;
  duration: number;
}) {
  const cell = (keyPrefix: string) =>
    Array.from({ length: REPEAT }, (_, i) => (
      <span key={`${keyPrefix}-${i}`} className="inline-flex items-center flex-shrink-0">
        <span
          className="text-[11px] md:text-[13px] font-semibold whitespace-nowrap px-5"
          style={{ ...ITEM_FONT, color }}
        >
          {label}
        </span>
        <span className="text-[9px] flex-shrink-0" style={{ color, opacity: 0.22 }}>
          ✦
        </span>
      </span>
    ));

  return (
    <div className="overflow-hidden py-[2px]">
      <div
        className="inline-flex"
        style={{
          animation: `${goLeft ? "marquee" : "marquee-rtl"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {cell("a")}
        {cell("b")}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="w-full mask-edges-x" style={{ direction: "ltr" }}>
      {TECH_ITEMS.map((tech, i) => (
        <MarqueeRow
          key={tech.label}
          label={tech.label}
          color={tech.color}
          goLeft={i % 2 === 0}
          duration={13 + i * 0.85}
        />
      ))}
    </div>
  );
}
