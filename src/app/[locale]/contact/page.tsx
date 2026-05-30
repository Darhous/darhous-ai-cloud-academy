import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import { Mail, MessageSquare, GitBranch } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تواصل معنا" : "Contact",
    description: isAr
      ? "تواصل مع فريق أكاديمية درهوس — للاستفسارات والتعاون والشراكات"
      : "Contact the Darhous AI Academy team — for inquiries, collaboration, and partnerships",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "تواصل معنا" : "Contact"}
          title={isAr ? "تواصل معنا" : "Get in Touch"}
          subtitle={isAr
            ? "هل لديك سؤال أو تريد التعاون؟ نحب أن نسمع منك."
            : "Have a question or want to collaborate? We'd love to hear from you."}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto w-full">
        {/* Contact form */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-5">
          <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "أرسل رسالة" : "Send a Message"}
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "الاسم" : "Name"}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                placeholder={isAr ? "اسمك الكامل" : "Your full name"}
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "الرسالة" : "Message"}
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                placeholder={isAr ? "رسالتك هنا..." : "Your message here..."}
              />
            </div>
            <button className="glow-button-primary text-white font-mono py-3 rounded-xl">
              {isAr ? "إرسال الرسالة" : "Send Message"}
            </button>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "طرق أخرى للتواصل" : "Other Ways to Reach Us"}
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: isAr ? "البريد الإلكتروني" : "Email", value: "hello@darhous-ai.academy", color: "var(--color-primary)" },
                { icon: <GitBranch size={18} />, label: "GitHub", value: "github.com/darhous-ai", color: "var(--color-on-surface)" },
                { icon: <MessageSquare size={18} />, label: "Twitter / X", value: "@darhous_ai", color: "#60a5fa" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--color-surface-container-high)", color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{item.label}</div>
                    <div className="text-sm font-mono" style={{ color: "var(--color-on-surface)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="glass-card rounded-2xl p-6"
            style={{ border: "1px solid rgba(142,213,255,0.1)" }}
          >
            <MessageSquare size={22} className="mb-3" style={{ color: "var(--color-tertiary)" }} />
            <h3 className="font-display font-semibold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "انضم للمجتمع" : "Join the Community"}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr
                ? "انضم إلى مجتمعنا على Discord للتواصل مع متعلمين آخرين والحصول على دعم تقني."
                : "Join our Discord community to connect with other learners and get technical support."}
            </p>
            <button className="mt-4 glow-button-secondary font-mono text-sm px-5 py-2.5 rounded-xl" style={{ color: "var(--color-secondary)" }}>
              {isAr ? "انضم للديسكورد" : "Join Discord"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
