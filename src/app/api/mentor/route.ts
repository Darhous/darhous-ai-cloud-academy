import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { mentorModes } from "@/data/mentor";
import type { MentorModeId } from "@/data/mentor";
import type { MentorApiRequest } from "@/lib/mentor-context";

const VALID_MODES: MentorModeId[] = ["ask", "prompt", "claude_code", "path", "tools", "project"];
const MAX_MESSAGE_LENGTH = 4000;
const MAX_MESSAGES_IN_HISTORY = 20;

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "AI Mentor is not configured. Missing GEMINI_API_KEY.", missingKey: true },
      { status: 503 }
    );
  }

  try {
    const body: MentorApiRequest = await req.json();
    const { messages, mode, locale } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Limit history depth
    const trimmedMessages = messages.slice(-MAX_MESSAGES_IN_HISTORY);

    // Validate individual message lengths
    for (const msg of trimmedMessages) {
      if (!msg.content || typeof msg.content !== "string") {
        return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
          { error: locale === "ar"
            ? "الرسالة طويلة جداً. الحد الأقصى 4000 حرف."
            : "Message too long. Maximum 4000 characters." },
          { status: 400 }
        );
      }
    }

    // Validate and normalize mode
    const safeMode: MentorModeId = VALID_MODES.includes(mode as MentorModeId)
      ? (mode as MentorModeId)
      : "ask";

    const mentorMode =
      mentorModes.find((m) => m.id === safeMode) ?? mentorModes[0];
    const systemPrompt =
      locale === "ar" ? mentorMode.systemPromptAr : mentorMode.systemPromptEn;

    const reply = await callGemini(trimmedMessages, systemPrompt);

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // Redact any key that might appear in the error string
    const safeMessage = message.replace(/key=\S+/gi, "key=[REDACTED]");
    console.error("[Mentor API]", safeMessage);

    // Handle Gemini rate limit errors gracefully
    if (safeMessage.includes("429") || safeMessage.toLowerCase().includes("quota")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get a response from AI. Please try again." },
      { status: 500 }
    );
  }
}
