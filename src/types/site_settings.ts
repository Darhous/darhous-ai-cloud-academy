export interface SiteSettings {
  heroTitle: { ar: string; en: string };
  heroSubtitle: { ar: string; en: string };
  heroCta1: { ar: string; en: string };
  heroCta2: { ar: string; en: string };
  heroCta3: { ar: string; en: string };
  sectionVisibility: {
    beginnerPath: boolean;
    ecosystemMap: boolean;
    aiMentorShowcase: boolean;
    stats: boolean;
    portalGrid: boolean;
    journey4Steps: boolean;
    whyDarhous: boolean;
    communitySignup: boolean;
    finalCta: boolean;
  };
  faqs: Array<{ questionAr: string; questionEn: string; answerAr: string; answerEn: string }>;
  finalCtaTitle: { ar: string; en: string };
  finalCtaSubtitle: { ar: string; en: string };
}

export const defaultSiteSettings: SiteSettings = {
  heroTitle: {
    ar: "ابدأ من الصفر… ودع الذكاء الاصطناعي يبني لك طريقك التعليمي والمهني",
    en: "Start from Zero — Let AI Build Your Learning & Career Path",
  },
  heroSubtitle: {
    ar: "منصة درهوس الذكية تفهمك وتضع لك خطة واضحة خطوة بخطوة — حتى لو لا تعرف من أين تبدأ",
    en: "Darhous Smart Platform understands you and builds a clear plan step by step — even if you don't know where to start",
  },
  heroCta1: { ar: "أنا مبتدئ وعايز أبدأ", en: "I'm a beginner and want to start" },
  heroCta2: { ar: "عايز أتعلم مهارة محددة", en: "I want to learn a specific skill" },
  heroCta3: { ar: "عايز أطور شغلي أو أشتغل", en: "I want to advance my career" },
  sectionVisibility: {
    beginnerPath: true,
    ecosystemMap: true,
    aiMentorShowcase: true,
    stats: true,
    portalGrid: true,
    journey4Steps: true,
    whyDarhous: true,
    communitySignup: true,
    finalCta: true,
  },
  faqs: [],
  finalCtaTitle: {
    ar: "ابدأ الآن… حتى لو لا تعرف من أين تبدأ",
    en: "Start Now — Even If You Don't Know Where to Begin",
  },
  finalCtaSubtitle: {
    ar: "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف",
    en: "The AI Mentor builds your path, step by step, from zero to mastery",
  },
};
