"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  locale: string;
  isAr: boolean;
}

export default function ContactForm({ locale, isAr }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : (isAr ? "حدث خطأ، حاول مرة أخرى" : "An error occurred. Please try again."));
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 size={48} style={{ color: "var(--color-tertiary)" }} />
        <p className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تم إرسال رسالتك!" : "Message sent!"}
        </p>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "سنتواصل معك قريباً على بريدك الإلكتروني." : "We'll get back to you soon via email."}
        </p>
        <button onClick={() => setSent(false)} className="text-sm underline opacity-60 hover:opacity-100"
          style={{ color: "var(--color-primary)" }}>
          {isAr ? "إرسال رسالة أخرى" : "Send another message"}
        </button>
      </div>
    );
  }

  const inputStyle = {
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
  };
  const labelStyle = { color: "var(--color-on-surface-variant)" };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-mono mb-2" style={labelStyle}>
          {isAr ? "الاسم *" : "Name *"}
        </label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm"
          style={inputStyle}
          placeholder={isAr ? "اسمك الكامل" : "Your full name"} />
      </div>
      <div>
        <label className="block text-sm font-mono mb-2" style={labelStyle}>
          {isAr ? "البريد الإلكتروني *" : "Email *"}
        </label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm"
          style={inputStyle}
          placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-mono mb-2" style={labelStyle}>
          {isAr ? "الموضوع (اختياري)" : "Subject (optional)"}
        </label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm"
          style={inputStyle}
          placeholder={isAr ? "موضوع الرسالة" : "Message subject"} />
      </div>
      <div>
        <label className="block text-sm font-mono mb-2" style={labelStyle}>
          {isAr ? "رسالتك *" : "Message *"}
        </label>
        <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none"
          style={inputStyle}
          placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."} />
      </div>
      {error && (
        <p className="text-xs" style={{ color: "var(--color-error)" }}>{error}</p>
      )}
      <button type="submit" disabled={sending || !name.trim() || !email.trim() || !message.trim()}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
        {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {sending ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الرسالة" : "Send Message")}
      </button>
    </form>
  );
}
