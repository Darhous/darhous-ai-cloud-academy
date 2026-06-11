"use client";

import { useState } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shadcn/ui/card";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { portals } from "@/config/portals";
import { CheckCircle2, ChevronRight, Target } from "lucide-react";

const GOAL_CATEGORIES = [
  { id: "career", labelAr: "أهداف مهنية", labelEn: "Career Goals" },
  { id: "skills", labelAr: "تطوير المهارات", labelEn: "Skill Building" },
  { id: "projects", labelAr: "مشاريع عملية", labelEn: "Practical Projects" },
];

const GOALS = {
  career: [
    { id: "c1", titleAr: "دخول سوق العمل التقني", titleEn: "Enter Tech Industry", descAr: "بناء سيرة ذاتية قوية واجتياز المقابلات", descEn: "Build strong CV & pass interviews", portals: ["career", "digital-exams"] },
    { id: "c2", titleAr: "تعلم الذكاء الاصطناعي", titleEn: "Become AI Engineer", descAr: "احتراف النماذج اللغوية والأدوات الذكية", descEn: "Master LLMs and smart tools", portals: ["claude-generator", "nano-banana"] },
  ],
  skills: [
    { id: "s1", titleAr: "التحول الرقمي", titleEn: "Digital Transformation", descAr: "إتقان أدوات الأوفيس وأساسيات التقنية", descEn: "Master Office tools & tech basics", portals: ["digital-exams", "language"] },
    { id: "s2", titleAr: "أتمتة الأعمال", titleEn: "Business Automation", descAr: "توفير الوقت عبر أتمتة المهام اليومية", descEn: "Save time by automating daily tasks", portals: ["automation", "claude-generator"] },
  ],
  projects: [
    { id: "p1", titleAr: "صناعة المحتوى بالذكاء الاصطناعي", titleEn: "AI Content Creation", descAr: "إنتاج نصوص وصور احترافية", descEn: "Generate pro text and images", portals: ["nano-banana", "claude-generator"] },
    { id: "p2", titleAr: "برمجة الروبوتات والإنترنت", titleEn: "IoT & Robotics", descAr: "بناء مشاريع أردوينو وإنترنت الأشياء", descEn: "Build Arduino & IoT projects", portals: ["iot-lab"] },
  ]
};

export default function GoalGatewayHero({ locale, scrollToPath }: { locale: string; scrollToPath: () => void }) {
  const isAr = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState("career");
  const [selectedGoalId, setSelectedGoalId] = useState("c1");
  const shouldReduceMotion = useReducedMotion();

  // Find current goal portals
  const allGoals = [...GOALS.career, ...GOALS.skills, ...GOALS.projects];
  const currentGoal = allGoals.find(g => g.id === selectedGoalId) || allGoals[0];
  const recommendedPortals = currentGoal.portals.map(id => portals.find(p => p.id === id)).filter(Boolean);

  const activeGoals = GOALS[selectedCategory as keyof typeof GOALS] || GOALS.career;

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center pt-32 pb-16 px-4 md:px-8">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />

      {/* Hero Intro */}
      <div className="z-10 text-center max-w-4xl mb-12">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium"
        >
          <Target className="w-4 h-4" />
          {isAr ? "مرحباً بك في NexaLearn" : "Welcome to NexaLearn"}
        </motion.div>
        <motion.h1 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
        >
          {isAr ? "ما هو هدفك اليوم؟" : "What is your goal today?"}
        </motion.h1>
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          {isAr 
            ? "اختر هدفك وسيقوم الذكاء الاصطناعي بتصميم مسار تعليمي مخصص لك للوصول إليه بأسرع وقت." 
            : "Select your goal and our AI will design a personalized learning path to get you there faster."}
        </motion.p>
      </div>

      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
        {/* Left Column: Interactive Selector */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {isAr ? "1. حدد مجال اهتمامك" : "1. Select your focus area"}
            </h2>
            <div className="flex gap-2 w-full rounded-xl border border-border/50 bg-background/50 backdrop-blur-md p-1" role="tablist" aria-label="Goal Categories">
              {GOAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedGoalId(GOALS[cat.id as keyof typeof GOALS][0].id);
                  }}
                  className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-xl font-semibold">
              {isAr ? "2. اختر هدفك الرئيسي" : "2. Choose your primary goal"}
            </h2>
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                {activeGoals.map((goal) => {
                  const isSelected = selectedGoalId === goal.id;
                  return (
                    <Card 
                      key={goal.id}
                      onClick={() => setSelectedGoalId(goal.id)}
                      className={`cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'border-primary shadow-md bg-primary/5' : 'border-border/50 hover:border-primary/50'}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className={`mt-1 p-1 rounded-full ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{isAr ? goal.titleAr : goal.titleEn}</CardTitle>
                          <CardDescription>{isAr ? goal.descAr : goal.descEn}</CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Adaptive Recommended Path */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {isAr ? "مسارك الموصى به" : "Recommended Path"}
              <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium">
                {isAr ? "مخصص لك" : "Personalized"}
              </span>
            </h2>
          </div>
          
          <div className="bg-card border rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGoalId}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {isAr ? currentGoal.titleAr : currentGoal.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {isAr 
                      ? "لتحقيق هذا الهدف، نوصي بالبدء بهذه البوابات التعليمية بالترتيب:" 
                      : "To achieve this goal, we recommend starting with these portals in order:"}
                  </p>
                </div>

                <BentoGrid className="grid-cols-1 md:grid-cols-2 md:auto-rows-[14rem] gap-4">
                  {recommendedPortals.map((portal, idx) => (
                    <BentoGridItem
                      key={portal?.id}
                      title={isAr ? portal?.titleAr : portal?.titleEn}
                      description={isAr ? portal?.descriptionAr : portal?.descriptionEn}
                      header={
                        <div 
                          className="flex flex-1 w-full h-full min-h-[5rem] rounded-xl relative overflow-hidden group" 
                          style={{ background: portal?.gradient }}
                        >
                          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur text-xs font-bold px-2 py-1 rounded-md">
                            {isAr ? `خطوة ${idx + 1}` : `Step ${idx + 1}`}
                          </div>
                          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                        </div>
                      }
                      icon={<span className="text-2xl">{portal?.icon}</span>}
                      className={recommendedPortals.length === 1 || idx === 0 && recommendedPortals.length === 3 ? "md:col-span-2" : ""}
                    />
                  ))}
                </BentoGrid>
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-8 flex justify-end">
              <ShimmerButton onClick={scrollToPath} className="w-full sm:w-auto px-8 py-3 text-base">
                <span className="flex items-center gap-2">
                  {isAr ? "ابدأ مسارك الآن" : "Start Your Path Now"}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
