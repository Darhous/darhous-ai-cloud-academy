import {
  Bot,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Globe2,
  ImageIcon,
  MonitorCheck,
  Orbit,
  type LucideIcon,
} from "lucide-react";
import { portals } from "@/config/portals";
import { STATS } from "@/lib/constants";

const portalIcons: Record<string, LucideIcon> = {
  "ai-academy": Bot,
  language: Globe2,
  "digital-exams": MonitorCheck,
  career: BriefcaseBusiness,
  automation: CircuitBoard,
  "iot-lab": Cpu,
  "nano-banana": ImageIcon,
  "coming-soon": Orbit,
};

export const previewPortals = portals.map((portal) => ({
  ...portal,
  Icon: portalIcons[portal.id] ?? Orbit,
}));

export const previewStats = STATS;

export const concepts = [
  {
    number: 1,
    slug: "homepage-concept-1",
    nameEn: "AI Command Center",
    nameAr: "مركز قيادة الذكاء الاصطناعي",
    bestEn: "Platform intelligence and ecosystem depth",
    bestAr: "إبراز ذكاء المنصة وعمق النظام البيئي",
    motionEn: "High",
    motionAr: "مرتفع",
    riskEn: "Medium",
    riskAr: "متوسط",
    libraries: "HeroUI, shadcn/ui, Magic UI, Aceternity",
  },
  {
    number: 2,
    slug: "homepage-concept-2",
    nameEn: "The Learning Journey",
    nameAr: "رحلة التعلم",
    bestEn: "Guided transformation and outcomes",
    bestAr: "رحلة موجهة ونتائج واضحة",
    motionEn: "Medium",
    motionAr: "متوسط",
    riskEn: "Low",
    riskAr: "منخفض",
    libraries: "HeroUI, shadcn/ui, Magic UI, Aceternity",
  },
  {
    number: 3,
    slug: "homepage-concept-3",
    nameEn: "Silent Authority",
    nameAr: "الثقة الهادئة",
    bestEn: "Trust, clarity, and launch readiness",
    bestAr: "الثقة والوضوح والجاهزية للإطلاق",
    motionEn: "Low",
    motionAr: "منخفض",
    riskEn: "Low",
    riskAr: "منخفض",
    libraries: "HeroUI, shadcn/ui, Magic UI, Aceternity",
  },
  {
    number: 4,
    slug: "homepage-concept-4",
    nameEn: "Portal Constellation",
    nameAr: "كوكبة البوابات",
    bestEn: "Maximum cinematic impact",
    bestAr: "أعلى تأثير سينمائي",
    motionEn: "Very high",
    motionAr: "مرتفع جدًا",
    riskEn: "High",
    riskAr: "مرتفع",
    libraries: "Aceternity, Magic UI, shadcn/ui, HeroUI",
  },
  {
    number: 5,
    slug: "homepage-concept-5",
    nameEn: "Goal Gateway",
    nameAr: "بوابة الهدف",
    bestEn: "Conversion and personalized starts",
    bestAr: "التحويل والبدايات المخصصة",
    motionEn: "Medium",
    motionAr: "متوسط",
    riskEn: "Medium",
    riskAr: "متوسط",
    libraries: "HeroUI, shadcn/ui, Magic UI, Aceternity",
  },
] as const;

export const journeySteps = {
  ar: [
    ["01", "اختر هدفك", "حدد مستواك واهتمامك والوقت المتاح لك."],
    ["02", "المرشد يبني خطتك", "تحصل على مسار أسبوعي يناسب ظروفك."],
    ["03", "تعلّم وطبّق", "ادخل البوابات وابنِ مشاريع حقيقية."],
    ["04", "احصل على شهادة", "وثّق تقدمك وانتقل للخطوة التالية."],
  ],
  en: [
    ["01", "Choose your goal", "Set your level, interest, and available time."],
    ["02", "The mentor builds your plan", "Receive a weekly route shaped around you."],
    ["03", "Learn and apply", "Enter the portals and build real projects."],
    ["04", "Earn your certificate", "Verify progress and move to the next step."],
  ],
};

export const platformBenefits = {
  ar: [
    "منصة عربية ذكية",
    "حساب واحد لكل البوابات",
    "تعليم قائم على المشاريع",
    "اختبارات وتقارير فورية",
    "ربط التعلم بالتوظيف",
    "مرشد AI شخصي",
    "لوحة تحكم موحدة",
    "تجربة حديثة ومدروسة",
  ],
  en: [
    "Arabic-first platform",
    "One account for every portal",
    "Project-based learning",
    "Instant tests and reports",
    "Learning connected to careers",
    "Personal AI mentor",
    "Unified dashboard",
    "A modern, considered experience",
  ],
};

