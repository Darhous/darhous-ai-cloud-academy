import "server-only";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Fallback: if OPENROUTER_API_KEY not set, uses Gemini directly
const USE_OPENROUTER = !!process.env.OPENROUTER_API_KEY;

export async function callAI(
  messages: { role: "user" | "model"; content: string }[],
  systemPrompt: string,
  maxTokens = 2048
): Promise<string> {
  if (!USE_OPENROUTER) {
    // fallback to existing gemini.ts
    const { callGemini } = await import("./gemini");
    return callGemini(messages, systemPrompt, undefined, maxTokens);
  }

  const apiKey = process.env.OPENROUTER_API_KEY!;
  const model = process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash";

  const chatMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role === "model" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    })),
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexalearn.vercel.app",
      "X-Title": "NexaLearn AI Mentor",
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`OpenRouter error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content ?? "";
  if (!text) throw new Error("Empty response from OpenRouter");
  return text;
}

export async function streamAI(
  messages: { role: "user" | "model"; content: string }[],
  systemPrompt: string
): Promise<ReadableStream<Uint8Array>> {
  if (!USE_OPENROUTER) {
    // Gemini streaming fallback — caller handles it separately
    throw new Error("OPENROUTER_NOT_CONFIGURED");
  }

  const apiKey = process.env.OPENROUTER_API_KEY!;
  const model = process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash";

  const chatMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role === "model" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    })),
  ];

  const upstreamRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexalearn.vercel.app",
      "X-Title": "NexaLearn AI Mentor",
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!upstreamRes.ok || !upstreamRes.body) {
    throw new Error(`OpenRouter stream error ${upstreamRes.status}`);
  }

  // Transform OpenRouter SSE → our SSE format { token: "..." }
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      const reader = upstreamRes.body!.getReader();
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
              const token = parsed?.choices?.[0]?.delta?.content;
              if (token && typeof token === "string") {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
              }
            } catch { /* skip malformed */ }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });
}
