// Shared types and helper functions for the Mentor feature.
// React state management lives in MentorPageClient.tsx.

export interface MentorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  modeId?: string;
}

export interface MentorApiRequest {
  messages: Array<{ role: "user" | "model"; content: string }>;
  mode: string;
  locale: string;
}

export interface MentorApiResponse {
  reply?: string;
  error?: string;
  missingKey?: boolean;
}

export function createMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatForGemini(
  messages: MentorMessage[]
): Array<{ role: "user" | "model"; content: string }> {
  return messages.map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    content: m.content,
  }));
}
