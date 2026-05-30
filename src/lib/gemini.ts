// Server-only — never import this file from client components

interface GeminiPart {
  text: string;
  thought?: boolean;
}

interface GeminiContent {
  role: string;
  parts: GeminiPart[];
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

export interface GeminiMessage {
  role: "user" | "model";
  content: string;
}

export async function callGemini(
  messages: GeminiMessage[],
  systemPrompt: string,
  model?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const modelId = model ?? process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

  const contents: GeminiContent[] = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const requestBody = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.9,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errData: GeminiResponse = await res.json().catch(() => ({}));
    throw new Error(
      `Gemini API error ${res.status}: ${errData?.error?.message ?? res.statusText}`
    );
  }

  const data: GeminiResponse = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];

  // Filter thought parts (gemini-2.5-flash thinking model emits these)
  const text = parts
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();

  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  return text;
}
