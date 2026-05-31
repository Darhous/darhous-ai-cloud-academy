export type CVAnalysisResult = {
  overall_score: number;
  keyword_score: number;
  skills_score: number;
  experience_score: number;
  formatting_score: number;
  readability_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  weak_bullet_points: { original: string; suggestion: string }[];
  keywords_missing: string[];
  recommendations: string[];
  job_description_match_details?: string;
  role_optimization_suggestions: string[];
  raw?: string;
};

export type JobTarget = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  salary?: string;
  description: string;
  missingSkills?: string[];
  matchReasons?: string[];
  cvSuggestions?: string[];
};

export type InterviewEvaluation = {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  improved_answer: string;
};

export type CVData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: { company: string; role: string; period: string; desc: string }[];
  education: { degree: string; school: string; period: string }[];
  skills: string[];
};
