import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

type Messages = typeof en;

const messages: Record<string, Messages> = { ar, en };

export function getMessages(locale: string): Messages {
  return messages[locale] ?? messages.en;
}

export function t(locale: string, key: string): string {
  const msgs = getMessages(locale);
  const keys = key.split(".");
  let result: unknown = msgs;
  for (const k of keys) {
    if (result && typeof result === "object" && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === "string" ? result : key;
}

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
