/**
 * portalIntroData.ts — Phase 9C
 * Static data for PortalIdentityIntro component.
 * One entry per portal: stats pillars + 4-step learning journey.
 * NO backend, NO logic — visual layer only.
 */

export interface PortalStat {
  value: string;
  numericValue: number;  // for count-up animation
  labelEn: string;
  labelAr: string;
}

export interface PortalJourneyStep {
  num: string;
  titleEn: string;
  titleAr: string;
  isOutcome?: boolean; // last step gets filled portal-color treatment
}

export interface PortalIntroEntry {
  stats: PortalStat[];
  journey: PortalJourneyStep[];
}

export const portalIntroData: Record<string, PortalIntroEntry> = {
  automation: {
    stats: [
      { value: "25",  numericValue: 25,  labelEn: "Automation Templates",  labelAr: "قالب أتمتة" },
      { value: "15+", numericValue: 15,  labelEn: "Documented Tools",      labelAr: "أداة موثقة" },
      { value: "10+", numericValue: 10,  labelEn: "Learning Paths",        labelAr: "مسار تعلم" },
    ],
    journey: [
      { num: "01", titleEn: "Discover Opportunities",    titleAr: "اكتشف فرص الأتمتة" },
      { num: "02", titleEn: "Learn the Tools",           titleAr: "تعلم الأدوات" },
      { num: "03", titleEn: "Build Real Workflows",      titleAr: "ابنِ workflows حقيقية" },
      { num: "04", titleEn: "Automate & Scale",          titleAr: "أتمت واكبر", isOutcome: true },
    ],
  },

  language: {
    stats: [
      { value: "10",  numericValue: 10,  labelEn: "Adaptive Stages",       labelAr: "مرحلة تكيفية" },
      { value: "6",   numericValue: 6,   labelEn: "CEFR Levels",           labelAr: "مستوى CEFR" },
      { value: "100%",numericValue: 100, labelEn: "Instant Results",       labelAr: "نتائج فورية" },
    ],
    journey: [
      { num: "01", titleEn: "Take Level Assessment",     titleAr: "اختبر مستواك" },
      { num: "02", titleEn: "Get Skill Report",          titleAr: "اعرف نقاط قوتك وضعفك" },
      { num: "03", titleEn: "Follow Your Plan",          titleAr: "اتبع خطة التعلم" },
      { num: "04", titleEn: "Reach Your Target Level",   titleAr: "ابلغ مستواك المستهدف", isOutcome: true },
    ],
  },

  "digital-exams": {
    stats: [
      { value: "9",    numericValue: 9,   labelEn: "Exam Subjects",        labelAr: "مادة اختبار" },
      { value: "902+", numericValue: 902, labelEn: "Random Questions",     labelAr: "سؤال عشوائي" },
      { value: "80%",  numericValue: 80,  labelEn: "Pass = Certificate",   labelAr: "نجاح = شهادة" },
    ],
    journey: [
      { num: "01", titleEn: "Choose Your Subject",       titleAr: "اختر المادة" },
      { num: "02", titleEn: "Take the Exam",             titleAr: "ادخل الاختبار" },
      { num: "03", titleEn: "Review Your Results",       titleAr: "راجع نتائجك" },
      { num: "04", titleEn: "Earn Your Certificate",     titleAr: "احصل على شهادتك", isOutcome: true },
    ],
  },

  career: {
    stats: [
      { value: "ATS", numericValue: 100, labelEn: "Smart Score",           labelAr: "تقييم ذكي" },
      { value: "4",   numericValue: 4,   labelEn: "Career Tools",          labelAr: "أداة مهنية" },
      { value: "AI",  numericValue: 100, labelEn: "Powered Analysis",      labelAr: "تحليل ذكي" },
    ],
    journey: [
      { num: "01", titleEn: "Upload Your CV",            titleAr: "ارفع سيرتك الذاتية" },
      { num: "02", titleEn: "Get AI Analysis",           titleAr: "احصل على تحليل ذكي" },
      { num: "03", titleEn: "Prep for Interviews",       titleAr: "حضّر للمقابلات" },
      { num: "04", titleEn: "Land Your Next Job",        titleAr: "احصل على وظيفتك القادمة", isOutcome: true },
    ],
  },

  "iot-lab": {
    stats: [
      { value: "59",  numericValue: 59,  labelEn: "Arduino Lessons",       labelAr: "درس أردوينو" },
      { value: "72",  numericValue: 72,  labelEn: "Hands-on Projects",     labelAr: "مشروع تطبيقي" },
      { value: "40",  numericValue: 40,  labelEn: "Coding Challenges",     labelAr: "تحدي برمجي" },
    ],
    journey: [
      { num: "01", titleEn: "Learn the Basics",          titleAr: "تعلم الأساسيات" },
      { num: "02", titleEn: "Build Your First Project",  titleAr: "ابنِ أول مشروع" },
      { num: "03", titleEn: "Tackle Challenges",         titleAr: "واجه التحديات" },
      { num: "04", titleEn: "Create Real Devices",       titleAr: "اصنع أجهزة حقيقية", isOutcome: true },
    ],
  },

  "ai-academy": {
    stats: [
      { value: "18",  numericValue: 18,  labelEn: "AI Courses",            labelAr: "دورة AI" },
      { value: "62",  numericValue: 62,  labelEn: "AI Tools",              labelAr: "أداة AI" },
      { value: "27",  numericValue: 27,  labelEn: "AI Prompts",            labelAr: "برومبت جاهز" },
    ],
    journey: [
      { num: "01", titleEn: "Choose a Course",           titleAr: "اختر دورة" },
      { num: "02", titleEn: "Explore AI Tools",          titleAr: "استكشف أدوات AI" },
      { num: "03", titleEn: "Build AI Projects",         titleAr: "ابنِ مشاريع ذكاء اصطناعي" },
      { num: "04", titleEn: "Get Certified",             titleAr: "احصل على شهادتك", isOutcome: true },
    ],
  },

  "nano-banana": {
    stats: [
      { value: "100+", numericValue: 100, labelEn: "Prompt Styles",        labelAr: "ستايل برومبت" },
      { value: "6",    numericValue: 6,   labelEn: "Categories",           labelAr: "فئة" },
      { value: "3",    numericValue: 3,   labelEn: "Difficulty Levels",    labelAr: "مستوى صعوبة" },
    ],
    journey: [
      { num: "01", titleEn: "Browse Trending Styles",    titleAr: "استعرض الستايلات التريندية" },
      { num: "02", titleEn: "Copy the Prompt",           titleAr: "انسخ البرومبت" },
      { num: "03", titleEn: "Paste into Gemini",         titleAr: "الصق في Gemini" },
      { num: "04", titleEn: "Transform Your Photo",      titleAr: "حوّل صورتك", isOutcome: true },
    ],
  },
};
