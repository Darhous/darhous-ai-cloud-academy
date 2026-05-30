import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import SocialLinksBar from "@/components/layout/SocialLinksBar";
import { Mail, MessageSquare } from "lucide-react";

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
    <div className="container-xl py-16 flex flex-col gap-14">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "تواصل معنا" : "Contact"}
          title={isAr ? "تواصل معنا" : "Get in Touch"}
          subtitle={isAr
            ? "هل لديك سؤال أو تريد التعاون؟ نحب أن نسمع منك."
            : "Have a question or want to collaborate? We'd love to hear from you."}
        />
      </div>

      {/* Social channels — hero block */}
      <div
        className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.18) 0%, rgba(87,27,193,0.12) 100%)",
          border: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        <div className="env-orb env-orb-blue absolute -top-16 -start-16 opacity-30" style={{ width: "240px", height: "240px" }} />
        <div className="env-orb env-orb-violet absolute -bottom-16 -end-16 opacity-20" style={{ width: "200px", height: "200px" }} />
        <div className="relative z-10">
          <p
            className="font-mono text-xs tracking-wider uppercase mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "المنصات الرسمية" : "Official Channels"}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "تواصل معنا عبر المنصات الرسمية" : "Connect through Official Platforms"}
          </h2>
          <p className="text-sm mb-7 max-w-lg" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تابع آخر تحديثات أكاديمية درهوس وتواصل معنا عبر المنصات الرسمية — نسعد بتواصلك."
              : "Follow Darhous Academy updates and connect through the official channels — we'd love to hear from you."}
          </p>
          <SocialLinksBar locale={locale} variant="page" />
        </div>
      </div>

      {/* Main grid */}
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

        {/* Contact info + Quick links */}
        <div className="flex flex-col gap-6">
          {/* Quick social cards */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg mb-5" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "تواصل معنا الآن" : "Contact us now"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📸", labelAr: "إنستغرام", labelEn: "Instagram", href: "https://www.instagram.com/darhous/", color: "#E1306C", bg: "rgba(225,48,108,0.08)", border: "rgba(225,48,108,0.2)" },
                { icon: "💼", labelAr: "لينكد إن", labelEn: "LinkedIn", href: "https://www.linkedin.com/in/darhous/", color: "#0A66C2", bg: "rgba(10,102,194,0.08)", border: "rgba(10,102,194,0.2)" },
                { icon: "👤", labelAr: "فيسبوك", labelEn: "Facebook", href: "https://www.facebook.com/ahmed.darhous", color: "#1877F2", bg: "rgba(24,119,242,0.08)", border: "rgba(24,119,242,0.2)" },
                { icon: "💬", labelAr: "واتساب", labelEn: "WhatsApp", href: "https://wa.me/201030002331", color: "#25D366", bg: "rgba(37,211,102,0.08)", border: "rgba(37,211,102,0.2)" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isAr ? item.labelAr : item.labelEn}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    textDecoration: "none",
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-medium" style={{ color: item.color }}>
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Other contact */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-base mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "طرق أخرى للتواصل" : "Other Ways to Reach Us"}
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: isAr ? "البريد الإلكتروني" : "Email", value: "hello@darhous-ai.academy", color: "var(--color-primary)" },
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

          {/* Community card */}
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
                ? "انضم إلى مجتمعنا للتواصل مع متعلمين آخرين والحصول على دعم تقني."
                : "Join our community to connect with other learners and get technical support."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
