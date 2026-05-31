export type MentorTone = "friendly" | "formal" | "energetic" | "calm";
export type MentorPersonality = "coach" | "teacher" | "advisor" | "motivator";
export type MentorLanguage = "ar" | "en" | "bilingual";

export interface AIMentorSettings {
  personality: MentorPersonality;
  tone: MentorTone;
  language: MentorLanguage;
  allowedTopics: string[];
  restrictedTopics: string[];
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  enableStreaming: boolean;
  greetingAr: string;
  greetingEn: string;
}

export const defaultMentorSettings: AIMentorSettings = {
  personality: "coach",
  tone: "friendly",
  language: "bilingual",
  allowedTopics: ["AI", "learning", "career", "technology", "automation", "IoT", "language"],
  restrictedTopics: [],
  systemPrompt:
    "أنت مرشد تعليمي ذكي من منصة درهوس. مهمتك مساعدة المتعلمين العرب على بناء مسارات تعلم مخصصة. كن ودودًا، تشجيعيًا، وعمليًا.",
  maxTokens: 1024,
  temperature: 0.7,
  enableStreaming: true,
  greetingAr: "مرحبًا! أنا مرشدك الذكي من درهوس. كيف أقدر أساعدك اليوم؟",
  greetingEn: "Hello! I'm your AI mentor from Darhous. How can I help you today?",
};
