"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Trash2, Loader2, ShieldAlert } from "lucide-react";
import MentorMessage from "./MentorMessage";
import MentorSuggestionCards from "./MentorSuggestionCards";
import ApiKeyMissingState from "./ApiKeyMissingState";
import {
  type MentorMessage as MsgType,
  type MentorApiResponse,
  createMessageId,
  formatForGemini,
} from "@/lib/mentor-context";
import type { MentorModeId } from "@/data/mentor";

const MAX_INPUT_LENGTH = 4000;
const COOLDOWN_MS = 3000;

interface Props {
  modeId: MentorModeId;
  locale: string;
  isAr: boolean;
  initialMessage?: string;
}

async function streamMentorReply(
  history: MsgType[],
  mode: string,
  locale: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (err: string) => void
): Promise<void> {
  try {
    const res = await fetch("/api/mentor-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: formatForGemini(history), mode, locale }),
    });

    // Fallback: if streaming not available, use regular endpoint
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      if (data.missingKey) { onError("missingKey"); return; }
      if (data.reply) { onToken(data.reply); onDone(); return; }
      onError(data.error ?? "unknown");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const raw = line.slice(5).trim();
        if (raw === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(raw);
          if (parsed.error) { onError(parsed.error); return; }
          if (parsed.missingKey) { onError("missingKey"); return; }
          if (parsed.token) onToken(parsed.token);
        } catch { /* skip */ }
      }
    }
    onDone();
  } catch {
    onError("network_error");
  }
}

export default function MentorChat({ modeId, locale, isAr, initialMessage }: Props) {
  const [messages, setMessages] = useState<MsgType[]>([]);
  const [input, setInput] = useState(initialMessage ?? "");
  const [loading, setLoading] = useState(false);
  const [missingKey, setMissingKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cleanup cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  const addAndSend = useCallback(
    async (userText: string, base: MsgType[]) => {
      if (loading || cooldown) return;
      if (!userText.trim()) return;

      const userMsg: MsgType = {
        id: createMessageId(),
        role: "user",
        content: userText.trim(),
        timestamp: Date.now(),
        modeId,
      };
      const history = [...base, userMsg];

      setMessages(history);
      setInput("");
      setErrorMsg(null);
      setLoading(true);
      setCooldown(true);
      cooldownTimer.current = setTimeout(() => setCooldown(false), COOLDOWN_MS);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Start streaming: add empty assistant message, then fill tokens
      const aiId = createMessageId();
      const aiMsg: MsgType = { id: aiId, role: "assistant", content: "", timestamp: Date.now(), modeId };
      setMessages([...history, aiMsg]);

      let accumulated = "";

      await streamMentorReply(
        history,
        modeId,
        locale,
        (token) => {
          accumulated += token;
          setMessages((prev) =>
            prev.map((m) => m.id === aiId ? { ...m, content: accumulated } : m)
          );
        },
        () => { setLoading(false); },
        (err) => {
          if (err === "missingKey") { setMissingKey(true); setLoading(false); return; }
          const msg = err === "network_error"
            ? (isAr ? "تعذّر الاتصال بالخادم." : "Connection failed.")
            : (isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "An error occurred. Please try again.");
          setErrorMsg(msg);
          setMessages((prev) => prev.filter((m) => m.id !== aiId));
          setLoading(false);
        }
      );
    },
    [modeId, locale, isAr, loading, cooldown]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || cooldown) return;
    addAndSend(input, messages);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || loading || cooldown) return;
      addAndSend(input, messages);
    }
  };

  const handleRegenerate = useCallback(() => {
    if (loading || messages.length < 2) return;
    const lastAiIdx = messages.map((m) => m.role).lastIndexOf("assistant");
    if (lastAiIdx < 1) return;
    const lastUserMsg = messages[lastAiIdx - 1];
    if (lastUserMsg?.role !== "user") return;
    const base = messages.slice(0, lastAiIdx - 1);
    addAndSend(lastUserMsg.content, base);
  }, [messages, loading, addAndSend]);

  const clearChat = () => {
    setMessages([]);
    setErrorMsg(null);
  };

  if (missingKey) {
    return <ApiKeyMissingState isAr={isAr} />;
  }

  return (
    <div
      className="flex flex-col max-w-3xl mx-auto w-full px-4"
      style={{ height: "calc(100vh - 370px)", minHeight: "380px" }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-2" style={{ scrollBehavior: "smooth" }}>
        {messages.length === 0 && !loading ? (
          <MentorSuggestionCards
            modeId={modeId}
            isAr={isAr}
            onSelect={(text) => addAndSend(text, [])}
          />
        ) : (
          <>
            {messages.map((msg, i) => (
              <MentorMessage
                key={msg.id}
                message={msg}
                isAr={isAr}
                isLast={i === messages.length - 1 && msg.role === "assistant"}
                onRegenerate={
                  i === messages.length - 1 && msg.role === "assistant"
                    ? handleRegenerate
                    : undefined
                }
              />
            ))}

            {loading && (
              <div className="flex gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: "rgba(208,188,255,0.10)",
                    border: "1px solid rgba(208,188,255,0.2)",
                  }}
                >
                  🤖
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-2"
                  style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                  }}
                >
                  <Loader2
                    size={14}
                    className="animate-spin"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "يفكر..." : "Thinking..."}
                  </span>
                </div>
              </div>
            )}

            {errorMsg && !loading && (
              <div
                className="text-sm px-4 py-3 rounded-xl mb-4 text-center max-w-sm mx-auto"
                style={{
                  background: "rgba(255,100,100,0.07)",
                  border: "1px solid rgba(255,100,100,0.18)",
                  color: "#ff7070",
                }}
              >
                ⚠️ {errorMsg}
              </div>
            )}
          </>
        )}
        <div ref={endRef} />
      </div>

      {/* Input area */}
      <div
        className="border-t pt-3 pb-4 flex-shrink-0"
        style={{ borderColor: "var(--color-outline-variant)" }}
      >
        {messages.length > 0 && (
          <div className="flex justify-end mb-2">
            <button
              onClick={clearChat}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-opacity hover:opacity-70"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <Trash2 size={11} />
              {isAr ? "مسح المحادثة" : "Clear chat"}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value.slice(0, MAX_INPUT_LENGTH));
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isAr
                  ? "اسألني أي شيء... (Enter للإرسال، Shift+Enter لسطر جديد)"
                  : "Ask me anything... (Enter to send, Shift+Enter for new line)"
              }
              rows={1}
              disabled={loading || cooldown}
              className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                color: "var(--color-on-surface)",
                maxHeight: "120px",
                minHeight: "46px",
                lineHeight: "1.5",
              }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
              }}
            />
            {input.length > 3000 && (
              <span
                className="absolute bottom-2 end-2 text-[10px] font-mono"
                style={{
                  color: input.length >= MAX_INPUT_LENGTH ? "#ff7070" : "var(--color-on-surface-variant)",
                  opacity: 0.7,
                }}
              >
                {input.length}/{MAX_INPUT_LENGTH}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading || cooldown}
            className="glow-button-primary p-3 rounded-xl flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={16} className="text-white" />
          </button>
        </form>

        {/* Security notice */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <ShieldAlert size={11} style={{ color: "var(--color-on-surface-variant)", opacity: 0.4 }} />
          <p
            className="text-xs text-center"
            style={{ color: "var(--color-on-surface-variant)", opacity: 0.4 }}
          >
            {isAr
              ? "لا تُدخل مفاتيح API أو بيانات حساسة · قد يخطئ الذكاء الاصطناعي"
              : "Never enter API keys or sensitive data · AI can make mistakes"}
          </p>
        </div>
      </div>
    </div>
  );
}
