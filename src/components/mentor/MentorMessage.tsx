import type { MentorMessage as MsgType } from "@/lib/mentor-context";
import MentorResponseActions from "./MentorResponseActions";

interface Props {
  message: MsgType;
  isAr: boolean;
  isLast?: boolean;
  onRegenerate?: () => void;
}

export default function MentorMessage({ message, isAr, isLast, onRegenerate }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1"
        style={{
          background: isUser ? "rgba(142,213,255,0.12)" : "rgba(208,188,255,0.10)",
          border: isUser
            ? "1px solid rgba(142,213,255,0.25)"
            : "1px solid rgba(208,188,255,0.2)",
        }}
      >
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Bubble + actions */}
      <div
        className={`flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className="px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            background: isUser
              ? "rgba(142,213,255,0.08)"
              : "var(--color-surface-container)",
            border: isUser
              ? "1px solid rgba(142,213,255,0.18)"
              : "1px solid var(--color-outline-variant)",
            color: "var(--color-on-surface)",
            borderRadius: isUser
              ? isAr
                ? "16px 16px 16px 4px"
                : "16px 16px 4px 16px"
              : isAr
              ? "16px 16px 4px 16px"
              : "16px 16px 16px 4px",
          }}
        >
          {message.content}
        </div>

        {!isUser && (
          <MentorResponseActions
            text={message.content}
            isAr={isAr}
            onRegenerate={isLast ? onRegenerate : undefined}
          />
        )}
      </div>
    </div>
  );
}
