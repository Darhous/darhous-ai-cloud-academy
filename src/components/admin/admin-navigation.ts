import {
  Activity, BookOpen, Globe, Users, Award, TrendingUp, Palette,
  Shield, Zap, BarChart2, Wrench, Bot, Sparkles, FileText,
  MessageSquare, GraduationCap, Rocket, Map, Bell, Edit3, Database, Eye
} from "lucide-react";

export type AdminTab =
  | "overview" | "site-builder" | "portals" | "users"
  | "certificates" | "mentor-control" | "content" | "email"
  | "analytics" | "theme" | "audit" | "language" | "automation" | "digital-exams"
  | "career" | "iot-lab" | "ai-academy" | "nano-banana" | "blog" | "ai-glossary" | "ai-tools-cms" | "ai-prompts-cms" | "ai-courses-cms" | "ai-projects-cms" | "ai-paths-cms"
  | "automation-cms" | "iot-cms" | "exams-cms" | "draft-preview";

import React from "react";

export interface NavItem {
  id: AdminTab;
  labelAr: string;
  labelEn: string;
  icon: React.ElementType;
}

export interface NavGroup {
  id: string;
  labelAr: string;
  labelEn: string;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    id: "overview", labelAr: "نظرة عامة", labelEn: "Overview",
    items: [
      { id: "overview", labelAr: "النظرة العامة", labelEn: "Overview", icon: Activity },
      { id: "analytics", labelAr: "التحليلات", labelEn: "Analytics", icon: TrendingUp }
    ]
  },
  {
    id: "content", labelAr: "المحتوى", labelEn: "Content / CMS",
    items: [
      { id: "blog", labelAr: "المدونة", labelEn: "Blog", icon: FileText },
      { id: "ai-courses-cms", labelAr: "الدورات", labelEn: "Courses", icon: GraduationCap },
      { id: "ai-projects-cms", labelAr: "المشاريع", labelEn: "Projects", icon: Rocket },
      { id: "ai-paths-cms", labelAr: "المسارات", labelEn: "Paths", icon: Map },
      { id: "ai-tools-cms", labelAr: "أدوات AI", labelEn: "AI Tools", icon: Wrench },
      { id: "ai-prompts-cms", labelAr: "المطالبات", labelEn: "Prompts", icon: MessageSquare },
      { id: "ai-glossary", labelAr: "المسرد", labelEn: "Glossary", icon: BookOpen },
      { id: "automation-cms", labelAr: "محتوى الأتمتة", labelEn: "Automation Content", icon: Zap },
      { id: "iot-cms", labelAr: "محتوى IoT", labelEn: "IoT Content", icon: Wrench },
      { id: "exams-cms", labelAr: "محتوى الاختبارات", labelEn: "Exams Content", icon: BarChart2 },
      { id: "content", labelAr: "المحتوى المجمع", labelEn: "Legacy Content", icon: Database }
    ]
  },
  {
    id: "review", labelAr: "المراجعة", labelEn: "Review / Drafts",
    items: [
      { id: "draft-preview", labelAr: "مراجعة المسودات", labelEn: "Draft Preview", icon: Eye }
    ]
  },
  {
    id: "users", labelAr: "المستخدمون والطلاب", labelEn: "Users / Students",
    items: [
      { id: "users", labelAr: "المستخدمون", labelEn: "Users", icon: Users },
      { id: "certificates", labelAr: "الشهادات", labelEn: "Certificates", icon: Award },
      { id: "email", labelAr: "الإيميلات", labelEn: "Email & Notify", icon: Bell }
    ]
  },
  {
    id: "portals", labelAr: "التعلم والبوابات", labelEn: "Learning / Portals",
    items: [
      { id: "portals", labelAr: "إدارة البوابات", labelEn: "Portal Manager", icon: Globe },
      { id: "ai-academy", labelAr: "أكاديمية AI", labelEn: "AI Academy", icon: Bot },
      { id: "iot-lab", labelAr: "مختبر IoT", labelEn: "IoT Lab", icon: Wrench },
      { id: "career", labelAr: "بوابة المهنة", labelEn: "Career Hub", icon: Award },
      { id: "automation", labelAr: "بوابة الأتمتة", labelEn: "Automation Portal", icon: Zap },
      { id: "language", labelAr: "بوابة اللغة", labelEn: "Language Portal", icon: Globe },
      { id: "nano-banana", labelAr: "🍌 Nano Banana", labelEn: "Nano Banana", icon: Sparkles },
      { id: "digital-exams", labelAr: "الاختبارات الرقمية", labelEn: "Digital Exams", icon: BarChart2 }
    ]
  },
  {
    id: "system", labelAr: "النظام والعمليات", labelEn: "Operations / System",
    items: [
      { id: "site-builder", labelAr: "بناء الموقع", labelEn: "Site Builder", icon: Edit3 },
      { id: "theme", labelAr: "الهوية والتصميم", labelEn: "Theme & Branding", icon: Palette },
      { id: "mentor-control", labelAr: "إعدادات المرشد", labelEn: "AI Mentor Control", icon: Bot },
      { id: "audit", labelAr: "سجل الأمان", labelEn: "Security & Audit", icon: Shield }
    ]
  }
];
