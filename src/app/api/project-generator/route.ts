import "server-only";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { aiGuard } from "@/lib/ai-guard";
import { callGemini } from "@/lib/gemini";

interface ProjectIdea {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: string[];
  stack: string[];
  steps: string[];
  claudeCodePrompt: string;
  deploymentChecklist: string[];
  estimatedTime: string;
}

function localProjectGenerator(level: string, stack: string, _goal: string): ProjectIdea {
  const projects = {
    beginner: {
      title: { ar: "بوت للأسئلة الشائعة", en: "FAQ Chatbot" },
      description: { ar: "بوت ذكاء اصطناعي يجيب على الأسئلة الشائعة باستخدام Claude API", en: "An AI chatbot that answers FAQs using the Claude API" },
      features: ["Text input/output", "Pre-defined FAQ pairs", "AI fallback for unknown questions"],
      stack: stack.includes("Python") ? ["Python", "FastAPI", "Claude API"] : ["Next.js", "Claude API", "Tailwind CSS"],
      steps: ["Set up project", "Add Claude API key", "Build FAQ data", "Create chat UI", "Connect API", "Deploy"],
      claudeCodePrompt: "Build a simple FAQ chatbot using Claude API. Add a chat interface, pre-defined FAQ responses, and AI fallback for unknown questions. Use TypeScript and Next.js.",
      deploymentChecklist: ["Add CLAUDE_API_KEY to env", "Push to GitHub", "Deploy to Vercel"],
      estimatedTime: "2-4 hours",
    },
    intermediate: {
      title: { ar: "نظام تحليل السيرة الذاتية", en: "Resume Analyzer" },
      description: { ar: "أداة تحلل السيرة الذاتية وتعطي توصيات لتحسينها", en: "Tool that analyzes resumes and gives improvement recommendations" },
      features: ["PDF upload", "AI analysis", "Score + improvements", "Export results"],
      stack: ["Next.js", "Claude API", "Supabase", "Tailwind CSS"],
      steps: ["Parse PDF", "Send to Claude", "Display analysis", "Save results", "Add auth", "Deploy"],
      claudeCodePrompt: "Build a resume analyzer with Claude API. Allow PDF upload, analyze with Claude, display score and improvements, save results to Supabase.",
      deploymentChecklist: ["Configure Supabase", "Add API keys", "Test with sample CV", "Deploy to Vercel"],
      estimatedTime: "1-2 days",
    },
    advanced: {
      title: { ar: "منصة RAG للمعرفة الشخصية", en: "Personal Knowledge RAG Platform" },
      description: { ar: "منصة لاستيراد المستندات وإنشاء قاعدة معرفة شخصية مع بحث دلالي", en: "Platform to import documents and create a personal knowledge base with semantic search" },
      features: ["Document upload", "Vector embeddings", "Semantic search", "AI chat over docs"],
      stack: ["Next.js", "Claude/Gemini API", "Supabase + pgvector", "LangChain"],
      steps: ["Set up pgvector", "Build upload pipeline", "Generate embeddings", "Implement search", "Build chat UI", "Add auth", "Deploy"],
      claudeCodePrompt: "Build a personal knowledge base RAG platform. Accept document uploads, generate embeddings, store in Supabase with pgvector, implement semantic search, and add AI chat over documents.",
      deploymentChecklist: ["Enable pgvector in Supabase", "Configure embedding model", "Set up storage", "Test RAG pipeline", "Deploy"],
      estimatedTime: "3-5 days",
    },
  };

  return projects[level as keyof typeof projects] ?? projects.beginner;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`project-gen:${ip}`, { limit: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  const guard = await aiGuard(req);
  if (guard instanceof Response) return guard;

  const body = await req.json().catch(() => ({}));
  const { level, goal, stack, timeAvailable, interests } = body as {
    level?: string; goal?: string; stack?: string; timeAvailable?: string; interests?: string;
  };

  if (!level || !goal?.trim()) {
    return NextResponse.json({ error: "level and goal required" }, { status: 400 });
  }

  let project: ProjectIdea;
  let source = "local";

  if (process.env.GEMINI_API_KEY) {
    try {
      const aiText = await callGemini(
        [{
          role: "user",
          content: `Generate a unique AI project idea for a ${level} developer interested in ${interests ?? "AI"} with this goal: "${goal}". Time available: ${timeAvailable ?? "flexible"}. Preferred stack: ${stack ?? "any"}.\n\nReturn ONLY valid JSON with these keys:\n- title: {ar: string, en: string}\n- description: {ar: string, en: string}\n- features: string[] (5-7 items)\n- stack: string[] (3-5 items)\n- steps: string[] (5-8 items)\n- claudeCodePrompt: string (detailed prompt to build this with Claude Code)\n- deploymentChecklist: string[] (3-5 items)\n- estimatedTime: string`,
        }],
        "You are a creative AI project idea generator. Generate practical, buildable projects. Return valid JSON only.",
      );
      const clean = aiText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      project = JSON.parse(clean);
      source = "ai";
    } catch {
      project = localProjectGenerator(level, stack ?? "", goal);
    }
  } else {
    project = localProjectGenerator(level, stack ?? "", goal);
  }

  return NextResponse.json({ project, source });
}
