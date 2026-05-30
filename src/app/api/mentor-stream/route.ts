import { NextRequest } from "next/server";
import { mentorModes } from "@/data/mentor";
import type { MentorModeId } from "@/data/mentor";
import type { MentorApiRequest } from "@/lib/mentor-context";

const VALID_MODES: MentorModeId[] = ["ask", "prompt", "claude_code", "path", "tools", "project"];
const MAX_MESSAGE_LENGTH = 4000;

export const runtime = "edge"; // Edge runtime for faster streaming

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "AI Mentor not configured", missingKey: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: MentorApiRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { messages, mode, locale } = body;
  if (!messages?.length) {
    return new Response(JSON.stringify({ error: "Messages required" }), { status: 400 });
  }

  for (const msg of messages.slice(-20)) {
    if ((msg.content?.length ?? 0) > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: locale === "ar" ? "الرسالة طويلة جداً" : "Message too long" }),
        { status: 400 }
      );
    }
  }

  const safeMode: MentorModeId = VALID_MODES.includes(mode as MentorModeId) ? (mode as MentorModeId) : "ask";
  const mentorMode = mentorModes.find((m) => m.id === safeMode) ?? mentorModes[0];
  const systemPrompt = locale === "ar" ? mentorMode.systemPromptAr : mentorMode.systemPromptEn;

  const apiKey = process.env.GEMINI_API_KEY;
  const modelId = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const trimmed = messages.slice(-20);
  const contents = trimmed.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const geminiRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048, topP: 0.9 },
    }),
  });

  if (!geminiRes.ok || !geminiRes.body) {
    const err = await geminiRes.text().catch(() => "Unknown error");
    return new Response(JSON.stringify({ error: `Gemini error: ${geminiRes.status}` }), { status: 500 });
  }

  // Transform Gemini SSE → our SSE format
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = geminiRes.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const jsonStr = line.slice(5).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const parts = parsed?.candidates?.[0]?.content?.parts ?? [];
              for (const part of parts) {
                if (part.thought || typeof part.text !== "string") continue;
                const chunk = `data: ${JSON.stringify({ token: part.text })}\n\n`;
                controller.enqueue(encoder.encode(chunk));
              }
            } catch { /* skip malformed */ }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
