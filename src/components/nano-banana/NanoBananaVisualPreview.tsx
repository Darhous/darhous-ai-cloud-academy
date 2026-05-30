"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Visual preview styles with CSS-based mockups (no external images, no real photos)
interface VisualStyle {
  id: string;
  labelAr: string;
  labelEn: string;
  emoji: string;
  gradient: string;
  border: string;
  description: { ar: string; en: string };
  samplePrompt: string;
}

const VISUAL_STYLES: VisualStyle[] = [
  {
    id: "figurine",
    labelAr: "مجسّم ثلاثي الأبعاد",
    labelEn: "3D Figurine",
    emoji: "🎭",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    border: "rgba(99,102,241,0.4)",
    description: { ar: "تحويل صورتك إلى مجسّم ثلاثي الأبعاد بأسلوب Pixar", en: "Transform into a 3D Pixar-style figurine" },
    samplePrompt: 'Transform my portrait photo into a high-quality 3D animated figurine, Pixar style, studio lighting, smooth plastic texture, vibrant colors, 8K resolution, white background',
  },
  {
    id: "magazine",
    labelAr: "غلاف مجلة",
    labelEn: "Magazine Cover",
    emoji: "📖",
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
    border: "rgba(251,191,36,0.4)",
    description: { ar: "صورتك على غلاف مجلة فاخرة", en: "Your photo on a luxury magazine cover" },
    samplePrompt: 'Transform my portrait into a high-fashion magazine cover photo, professional editorial lighting, Vogue style, sharp details, luxury aesthetic, bokeh background, 8K',
  },
  {
    id: "linkedin",
    labelAr: "صورة LinkedIn احترافية",
    labelEn: "LinkedIn Headshot",
    emoji: "💼",
    gradient: "linear-gradient(135deg, #0a1628 0%, #0e3460 50%, #1a4f9c 100%)",
    border: "rgba(59,130,246,0.4)",
    description: { ar: "صورة احترافية مثالية للشبكات المهنية", en: "Perfect professional photo for career networking" },
    samplePrompt: 'Transform my photo into a professional LinkedIn headshot, clean studio background, business casual attire, confident smile, sharp focus, professional lighting, corporate style',
  },
  {
    id: "cyberpunk",
    labelAr: "بوستر سايبربانك",
    labelEn: "Cyberpunk Poster",
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #0a0f1e 0%, #1a0a2e 50%, #0a1e2e 100%)",
    border: "rgba(0,255,200,0.4)",
    description: { ar: "صورتك في عالم مستقبلي نيون ساطع", en: "You in a neon-lit futuristic cyberpunk world" },
    samplePrompt: 'Transform my portrait into a cyberpunk character art, neon lights, futuristic city background, glowing tattoos, rain reflections, cinematic lighting, purple and teal tones, 8K',
  },
  {
    id: "polaroid",
    labelAr: "صورة بولارويد",
    labelEn: "Vintage Polaroid",
    emoji: "📸",
    gradient: "linear-gradient(135deg, #1a1208 0%, #2a1e0a 50%, #1a1208 100%)",
    border: "rgba(251,191,36,0.3)",
    description: { ar: "أسلوب كلاسيكي دافئ مع إطار بولارويد", en: "Warm classic style with Polaroid frame" },
    samplePrompt: 'Transform my photo into a vintage Polaroid photograph, slightly faded colors, warm tones, subtle grain, white Polaroid border, nostalgic 1970s aesthetic',
  },
  {
    id: "product-ad",
    labelAr: "إعلان منتج",
    labelEn: "Product Ad",
    emoji: "🎯",
    gradient: "linear-gradient(135deg, #0a0f1e 0%, #00668a22 100%)",
    border: "rgba(142,213,255,0.3)",
    description: { ar: "حوّل صورتك إلى بطولة إعلان احترافي", en: "Turn you into the star of a professional ad" },
    samplePrompt: 'Transform my portrait into a luxury brand advertisement photo, clean white background, professional product photography lighting, high-end aesthetic, minimalist design',
  },
  {
    id: "youtube",
    labelAr: "مصغّرة يوتيوب",
    labelEn: "YouTube Thumbnail",
    emoji: "▶️",
    gradient: "linear-gradient(135deg, #1a0000 0%, #3a0000 100%)",
    border: "rgba(239,68,68,0.4)",
    description: { ar: "مصغّرة يوتيوب جذابة تجعلك لا تُغلق التبويب", en: "Eye-catching YouTube thumbnail that stops the scroll" },
    samplePrompt: 'Transform my photo into a viral YouTube thumbnail face reaction, exaggerated surprised/excited expression, bold colors, high contrast, clean background, dramatic lighting',
  },
  {
    id: "arabic-poster",
    labelAr: "بوستر عربي فني",
    labelEn: "Arabic Art Poster",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #2a1500 50%, #1a0a00 100%)",
    border: "rgba(251,191,36,0.5)",
    description: { ar: "صورتك مع زخارف عربية إسلامية رائعة", en: "You with stunning Arabic Islamic geometric art" },
    samplePrompt: 'Transform my portrait into Arabic calligraphy art poster style, intricate geometric Islamic patterns, gold and deep blue colors, ornate borders, luxurious Middle Eastern aesthetic',
  },
  {
    id: "neon-cover",
    labelAr: "ألبوم موسيقى نيون",
    labelEn: "Neon Music Cover",
    emoji: "🎵",
    gradient: "linear-gradient(135deg, #0a0014 0%, #140028 100%)",
    border: "rgba(167,139,250,0.5)",
    description: { ar: "غلاف ألبوم موسيقي بأضواء النيون", en: "Music album cover with neon glow effects" },
    samplePrompt: 'Transform my photo into a music album cover with neon glow effects, synthwave aesthetic, purple and pink neon lights, dark atmosphere, artistic typography space',
  },
  {
    id: "sticker-pack",
    labelAr: "ستيكر ملوّن",
    labelEn: "Sticker Pack",
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #0a1208 0%, #1a2a0a 100%)",
    border: "rgba(74,222,128,0.4)",
    description: { ar: "ستيكر كرتوني ساحر من صورتك", en: "Adorable cartoon sticker from your photo" },
    samplePrompt: 'Transform my portrait into a cute cartoon sticker style, bold outlines, bright pastel colors, anime-inspired, chibi proportions, white background, multiple expressions',
  },
  {
    id: "action-figure",
    labelAr: "شخصية بطل",
    labelEn: "Action Figure",
    emoji: "🦸",
    gradient: "linear-gradient(135deg, #0a0f1e 0%, #1a0f0a 100%)",
    border: "rgba(249,115,22,0.4)",
    description: { ar: "تحوّل إلى بطل خارق في علبة فاخرة", en: "Become a superhero in a premium collector box" },
    samplePrompt: 'Transform my photo into a superhero action figure toy in collector packaging box, comic book style, dynamic pose, detailed costume, plastic toy texture, studio photography',
  },
  {
    id: "executive-portrait",
    labelAr: "بورتريه تنفيذي",
    labelEn: "Executive Portrait",
    emoji: "👑",
    gradient: "linear-gradient(135deg, #0a0a08 0%, #1a1a10 100%)",
    border: "rgba(251,191,36,0.3)",
    description: { ar: "صورة بورتريه فاخرة لرجال الأعمال", en: "Luxury portrait for business leaders" },
    samplePrompt: 'Transform my photo into a premium executive business portrait, dark studio background, rembrandt lighting, sharp suit, authoritative expression, large format photography style',
  },
];

function CopyBtn({ text, isAr }: { text: string; isAr: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-xl transition-all"
      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {isAr ? "نسخ البرومبت" : "Copy Prompt"}
    </button>
  );
}

// CSS-based visual mockup card (no real photos)
function StyleMockup({ style, isSelected }: { style: VisualStyle; isSelected: boolean }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: style.gradient,
        border: `2px solid ${isSelected ? style.border : "transparent"}`,
        aspectRatio: "3/4",
        minHeight: 160,
        transition: "all 0.3s ease",
      }}
    >
      {/* Demo portrait mockup (CSS only, no real photos) */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="rounded-full flex items-center justify-center text-3xl"
          style={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
            border: `2px solid ${style.border}`,
          }}
        >
          👤
        </div>
        <span style={{ fontSize: 32 }}>{style.emoji}</span>
      </div>
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl" style={{ background: `${style.border.replace("0.4", "0.08")}` }} />
      )}
    </div>
  );
}

export default function NanoBananaVisualPreview({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = VISUAL_STYLES[selectedIndex];

  function prev() { setSelectedIndex((i) => (i === 0 ? VISUAL_STYLES.length - 1 : i - 1)); }
  function next() { setSelectedIndex((i) => (i === VISUAL_STYLES.length - 1 ? 0 : i + 1)); }

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #100a1e 100%)",
        border: "1px solid rgba(167,139,250,0.2)",
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} style={{ color: "#a78bfa" }} />
          <p className="font-bold text-sm" style={{ color: "#a78bfa" }}>
            {isAr ? "معرض التحولات البصرية" : "Visual Transformation Gallery"}
          </p>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          {isAr ? "استخدم صورتك الشخصية مع هذه البرومبتات في Gemini أو Midjourney" : "Use your own photo with these prompts in Gemini or Midjourney"}
        </p>
      </div>

      {/* Style carousel */}
      <div className="px-6">
        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-3 scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {VISUAL_STYLES.map((style, i) => (
            <button
              key={style.id}
              onClick={() => setSelectedIndex(i)}
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all"
              style={{
                background: style.gradient,
                border: `2px solid ${i === selectedIndex ? style.border : "rgba(255,255,255,0.05)"}`,
                transform: i === selectedIndex ? "scale(1.1)" : "scale(1)",
              }}
              title={isAr ? style.labelAr : style.labelEn}
            >
              {style.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Selected style detail */}
      <div className="p-6 pt-4 flex flex-col md:flex-row gap-6">
        {/* Visual mockup */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <StyleMockup style={selected} isSelected />
            {/* Navigation arrows */}
            <button onClick={prev} className="absolute top-1/2 -translate-y-1/2 -start-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              {isAr ? <ChevronRight size={14} color="white" /> : <ChevronLeft size={14} color="white" />}
            </button>
            <button onClick={next} className="absolute top-1/2 -translate-y-1/2 -end-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              {isAr ? <ChevronLeft size={14} color="white" /> : <ChevronRight size={14} color="white" />}
            </button>
          </div>
          <p className="text-xs text-center font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
            {selectedIndex + 1} / {VISUAL_STYLES.length}
          </p>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-lg" style={{ color: "rgba(255,255,255,0.9)" }}>
              {selected.emoji} {isAr ? selected.labelAr : selected.labelEn}
            </h3>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              {isAr ? selected.description.ar : selected.description.en}
            </p>
          </div>

          {/* Sample prompt */}
          <div>
            <p className="text-xs font-mono font-bold mb-2" style={{ color: "#a78bfa" }}>
              {isAr ? "البرومبت الجاهز:" : "Ready prompt:"}
            </p>
            <p
              className="text-xs leading-relaxed p-3 rounded-xl font-mono"
              style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
              dir="ltr"
            >
              {selected.samplePrompt}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <CopyBtn text={selected.samplePrompt} isAr={isAr} />
            <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>
              <span>🖼️</span>
              {isAr ? "استخدم صورتك الشخصية" : "Use your own photo"}
            </div>
          </div>

          {/* Safety note */}
          <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
            {isAr
              ? "⚠️ استخدم صورك الشخصية فقط. لا تستخدم صور الآخرين بدون إذن. البرومبتات للاستخدام مع Gemini أو Midjourney."
              : "⚠️ Use only your own photos. Never use others' photos without permission. Prompts work with Gemini or Midjourney."}
          </p>
        </div>
      </div>
    </div>
  );
}
