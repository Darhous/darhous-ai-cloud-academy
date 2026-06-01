// Ported from legacy backend/services/ai_feedback.py — rule-based, no API call

export type SkillStatus = "excellent" | "good" | "developing" | "needs_work";

export interface SkillAnalysis {
  percentage: number;
  status: SkillStatus;
  note: string;
}

export interface LanguageFeedback {
  strengths: string[];
  weaknesses: string[];
  advice: string[];
  encouragement: string;
  skill_analysis: { grammar: SkillAnalysis; vocabulary: SkillAnalysis; reading: SkillAnalysis };
  weekly_plan: string[];
  next_milestone: string;
  next_level: string;
}

const NEXT_LEVEL_MAP: Record<string, string> = {
  A1A: "A1B", A1B: "A2A", A2A: "A2B", A2B: "B1A",
  B1A: "B1B", B1B: "B2A", B2A: "B2B", B2B: "C1A",
  C1A: "C1B", C1B: "C2",  C2:  "C2",
};

const WEEKLY_PLANS: Record<string, string[]> = {
  A1A: [
    "Mon/Wed/Fri: 30 min — Duolingo English basics + alphabet pronunciation",
    "Tue/Thu: 20 min — Watch English cartoons with English subtitles",
    "Weekend: Write 5 simple sentences about your daily routine",
  ],
  A1B: [
    "Mon/Wed/Fri: 30 min — BBC Learning English 'The Flatmates' podcast",
    "Tue/Thu: 20 min — Anki flashcards (50 new A1 words per week)",
    "Weekend: Have a 5-minute conversation with a language exchange partner",
  ],
  A2A: [
    "Mon/Wed/Fri: 45 min — English Grammar in Use (Elementary) — 2 units/week",
    "Tue/Thu: 30 min — Read graded readers Level 2 (Oxford Bookworms)",
    "Weekend: Write a short paragraph (100 words) describing a place you like",
  ],
  A2B: [
    "Mon/Wed/Fri: 45 min — BBC Learning English 'News Report' (slow speed)",
    "Tue/Thu: 30 min — Vocabulary: Quizlet A2-B1 word sets (100 words/week)",
    "Weekend: Write a simple email to a friend using new vocabulary",
  ],
  B1A: [
    "Mon/Wed/Fri: 1 hour — English Grammar in Use (Intermediate) — 3 units/week",
    "Tue/Thu: 45 min — Read BBC News articles and summarize in 50 words",
    "Weekend: IELTS General Training practice test (one section per week)",
  ],
  B1B: [
    "Mon/Wed/Fri: 1 hour — Listen to 'English Learning for Curious Minds' podcast",
    "Tue/Thu: 45 min — Advanced Grammar in Use (B2) — 2 units/week",
    "Weekend: Write a 200-word structured essay on a given topic",
  ],
  B2A: [
    "Mon/Wed/Fri: 1 hour — Read The Guardian / BBC — 2 articles, summarize & critique",
    "Tue/Thu: 1 hour — Cambridge B2 First practice tests (focus on Use of English)",
    "Weekend: Write a formal essay (250 words) with introduction, body, conclusion",
  ],
  B2B: [
    "Mon/Wed/Fri: 1 hour — The Economist or Foreign Affairs — read and take notes",
    "Tue/Thu: 1 hour — Cambridge C1 Advanced preparation materials",
    "Weekend: Record yourself speaking for 3 minutes on a complex topic, then review",
  ],
  C1A: [
    "Mon/Wed/Fri: 1 hour — Read academic papers or literary fiction in English",
    "Tue/Thu: 1 hour — Cambridge C1 Advanced or IELTS 7.0+ practice papers",
    "Weekend: Write a discursive essay (300 words) using advanced vocabulary and hedging language",
  ],
  C1B: [
    "Mon/Wed/Fri: Immerse in native content — TED Talks, academic lectures, quality journalism",
    "Tue/Thu: Cambridge C2 Proficiency (CPE) preparation materials",
    "Weekend: Write a critical analysis (400 words) of an article or argument",
  ],
  C2: [
    "Daily: Maintain fluency — read literary fiction, academic journals, quality journalism",
    "Weekly: Engage in complex discussions or debates in English",
    "Monthly: Consider taking the Cambridge C2 Proficiency (CPE) exam to certify your level",
  ],
};

const LEVEL_ADVICE: Record<string, string[]> = {
  A1A: [
    "Start with 'English Grammar in Use — Essential Grammar' (Murphy, Cambridge)",
    "Practice 20 new vocabulary words daily using Anki flashcard app (free)",
    "Watch English TV shows with subtitles to build listening intuition",
    "Focus on Present Simple, Past Simple, and Basic Articles first",
    "Use Duolingo for 15-minute daily practice to build the habit",
  ],
  A1B: [
    "Complete A1 grammar exercises focusing on present and past tenses",
    "Read simple English short stories — Oxford Graded Readers Level 1",
    "Practice basic conversation phrases with a language exchange partner (iTalki)",
    "Use apps like Babbel or Busuu for structured A1 content",
    "Learn 300 most common English words — they cover 65% of everyday speech",
  ],
  A2A: [
    "Study A2 grammar: comparatives, modal verbs (can/could/should), future tenses",
    "Read elementary-level news articles on BBC Learning English (bbclearningenglish.com)",
    "Practice writing short paragraphs (50-100 words) about daily topics",
    "Join a beginner English speaking group online (Facebook groups, Discord)",
    "Work through 'Essential Grammar in Use' by Raymond Murphy — complete all units",
  ],
  A2B: [
    "Work through 'English Grammar in Use' (Intermediate) — focus on A2-B1 units",
    "Start reading simple news articles on BBC Learning English daily",
    "Practice listening with 'The English We Speak' podcast (BBC) — 3 min episodes",
    "Write a short journal in English daily — even 3-4 sentences builds the habit",
    "Target vocabulary: phrasal verbs and collocations are key at this level",
  ],
  B1A: [
    "Study B1 grammar: reported speech, passive voice, relative clauses, conditionals",
    "Read intermediate-level articles (TIME for Kids, Breaking News English)",
    "Prepare for IELTS General Training — B1 level skills align perfectly",
    "Listen to 'English Learning for Curious Minds' podcast — fascinating topics",
    "Practice writing structured paragraphs with clear topic sentences and examples",
  ],
  B1B: [
    "Focus on expanding academic and professional vocabulary — use Quizlet B1-B2 sets",
    "Read newspaper articles from Reuters or BBC and summarize in your own words",
    "Practice writing structured paragraphs — topic sentence, evidence, explanation, link",
    "Work on B1-B2 grammar: wish/if only constructions, mixed conditionals",
    "Prepare for Cambridge B2 First (FCE) — it's achievable from your current level",
  ],
  B2A: [
    "Prepare seriously for B2 level exams — Cambridge B2 First or IELTS 5.5-6.0",
    "Read authentic academic articles and identify main argument and supporting evidence",
    "Practice advanced writing: essays, formal emails, reports (Cambridge style)",
    "Study advanced grammar: inversion, cleft sentences (It is... that), nominalization",
    "Build collocations vocabulary — 'make a decision' not 'do a decision'",
  ],
  B2B: [
    "Target C1 preparation — Cambridge C1 Advanced (CAE) is your next certification",
    "Read quality journalism: The Economist, Foreign Affairs, The Atlantic",
    "Practice writing discursive essays with sophisticated vocabulary and discourse markers",
    "Work on error correction exercises to eliminate fossilized mistakes",
    "Master register shifts: know when to use formal, semi-formal, and informal English",
  ],
  C1A: [
    "Engage with C1/C2 level texts: academic papers, quality journalism, literary fiction",
    "Practice precise vocabulary — synonyms, collocations, idiomatic expressions in context",
    "Develop nuanced writing skills: argumentation, tone, register, hedging language",
    "Consider taking the Cambridge C1 Advanced (CAE) exam to certify your level",
    "Focus on discourse-level skills: cohesion, coherence, and paragraph organization",
  ],
  C1B: [
    "Immerse in native-level content: academic lectures, quality podcasts, literary novels",
    "Focus on stylistic elements: hedging language, discourse markers ('Furthermore', 'Nevertheless')",
    "Prepare for Cambridge C2 Proficiency (CPE) or target IELTS 8.0+",
    "Practice teaching or explaining English concepts — the best way to reinforce mastery",
    "Develop awareness of dialect, register, and cultural references in English",
  ],
  C2: [
    "Congratulations on reaching the highest level of English proficiency!",
    "Maintain through regular reading of literary and academic texts in English",
    "Consider official C2 certification: Cambridge Proficiency Exam (CPE)",
    "Explore specialized vocabulary in your professional field or areas of interest",
    "Consider mentoring lower-level learners — teaching reinforces your own mastery",
  ],
};

function skillDetail(name: string, pct: number): SkillAnalysis {
  if (pct >= 80) return { percentage: Math.round(pct * 10) / 10, status: "excellent", note: `Excellent ${name.toLowerCase()} skills — performing at or above the expected level.` };
  if (pct >= 60) return { percentage: Math.round(pct * 10) / 10, status: "good",      note: `Good ${name.toLowerCase()} foundation — some gaps remain but overall solid performance.` };
  if (pct >= 40) return { percentage: Math.round(pct * 10) / 10, status: "developing", note: `${name} is developing — targeted practice will yield quick improvements.` };
  return            { percentage: Math.round(pct * 10) / 10, status: "needs_work",  note: `${name} needs significant attention — make this your primary study focus.` };
}

function getEncouragement(score: number, isIncomplete: boolean): string {
  if (isIncomplete) return "You didn't complete the full assessment, but the stages you finished already give us valuable insight into your English level. Take the full test to get your complete profile!";
  if (score >= 90)  return "Outstanding! You have achieved near-native English proficiency. Your dedication to language learning is truly impressive — C2 certification is within reach.";
  if (score >= 75)  return "Excellent work! You demonstrate strong command of English across all skill areas. With focused practice on your weaker points, you'll reach the next level quickly.";
  if (score >= 60)  return "Well done! You have a solid foundation in English. Keep challenging yourself with authentic materials and you'll continue to progress steadily.";
  if (score >= 45)  return "Good effort! You're progressing through the intermediate stages. Consistent daily practice — even 30 minutes — will accelerate your development significantly.";
  if (score >= 30)  return "Keep going! Every step forward counts. Focus on the fundamentals first, and build your skills systematically with the plan below.";
  return "Thank you for taking the assessment! Everyone starts somewhere, and identifying your starting point is the most important first step. Follow the study plan below and you'll see real progress within weeks.";
}

export function generateFeedback(
  score: number,
  level: string,
  grammar: number,
  vocabulary: number,
  reading: number,
  stagesCompleted: number,
  isIncomplete: boolean,
): LanguageFeedback {
  const strengths: string[] = [];
  if (grammar >= 70)    strengths.push(`Strong command of English grammar — ${Math.round(grammar)}% accuracy in grammar questions`);
  if (vocabulary >= 70) strengths.push(`Rich vocabulary and precise language use — ${Math.round(vocabulary)}% vocabulary score`);
  if (reading >= 70)    strengths.push(`Excellent reading comprehension and analytical skills — ${Math.round(reading)}% reading score`);
  if (score >= 80)      strengths.push("Consistent high performance across all language skill areas");
  if (score >= 60)      strengths.push("Good ability to apply language knowledge under test conditions");
  if (isIncomplete && stagesCompleted >= 5) strengths.push(`Demonstrated solid performance across ${stagesCompleted} completed stages`);
  if (strengths.length === 0) strengths.push("Completed the assessment and took the first step toward improving your English");

  const weaknesses: string[] = [];
  if (grammar < 50)    weaknesses.push(`Grammar needs significant work (${Math.round(grammar)}%) — focus on tenses, conditionals, and modal verbs`);
  else if (grammar < 70) weaknesses.push(`Grammar is developing (${Math.round(grammar)}%) — target advanced structures: inversion, subjunctive, cleft sentences`);
  if (vocabulary < 50) weaknesses.push(`Vocabulary range is limited (${Math.round(vocabulary)}%) — expand both general and academic vocabulary systematically`);
  else if (vocabulary < 70) weaknesses.push(`Vocabulary needs broadening (${Math.round(vocabulary)}%) — focus on collocations, phrasal verbs, and academic word list`);
  if (reading < 50)    weaknesses.push(`Reading comprehension needs development (${Math.round(reading)}%) — practice with graded texts and inference skills`);
  else if (reading < 70) weaknesses.push(`Reading skills are improving (${Math.round(reading)}%) — work on implicit meaning and author's purpose`);
  if (weaknesses.length === 0) weaknesses.push("No major weaknesses at this stage — keep challenging yourself with harder materials");

  const advice = [...(LEVEL_ADVICE[level] ?? LEVEL_ADVICE["B1A"])];
  if (grammar < 70)    advice.push("Dedicated grammar resource: 'English Grammar in Use' by Raymond Murphy — match the edition (Essential/Intermediate/Advanced) to your current level");
  if (vocabulary < 70) advice.push("Vocabulary strategy: use spaced-repetition (Anki app) with example sentences, not isolated word lists — context makes vocabulary stick");
  if (reading < 70)    advice.push("Active reading technique: after each paragraph, ask yourself — What is the main idea? What evidence supports it? What is implied but not stated?");
  if (isIncomplete)    advice.unshift(`You completed ${stagesCompleted} of 10 stages — retaking the full assessment will give you a more complete picture of your English level`);

  const nextLevel = NEXT_LEVEL_MAP[level] ?? level;
  const next_milestone = nextLevel === level
    ? "You're already at the highest level (C2)! Focus on maintaining and certifying your skills."
    : `Your next goal is ${nextLevel} — focus on the study recommendations below to get there.`;

  return {
    strengths,
    weaknesses,
    advice,
    encouragement: getEncouragement(score, isIncomplete),
    skill_analysis: {
      grammar:    skillDetail("Grammar", grammar),
      vocabulary: skillDetail("Vocabulary", vocabulary),
      reading:    skillDetail("Reading Comprehension", reading),
    },
    weekly_plan: WEEKLY_PLANS[level] ?? WEEKLY_PLANS["B1A"],
    next_milestone,
    next_level: nextLevel,
  };
}

// Career job suggestions (static fallback — used before API call resolves)
export const LEVEL_JOB_MAP: Record<string, string[]> = {
  A1: ["Local data-entry clerk", "Basic cashier / retail assistant"],
  A2: ["Entry-level customer assistant", "Local receptionist"],
  B1: ["Arabic-speaking customer support", "Junior admin assistant", "Entry-level call centre agent"],
  B2: ["International customer support", "Remote content writer", "Junior marketing specialist", "Digital sales representative"],
  C1: ["Senior international account manager", "Technical writer", "Product manager", "Business development executive"],
  C2: ["Executive / C-level international role", "Academic researcher", "Consultant", "Professional translator"],
};
