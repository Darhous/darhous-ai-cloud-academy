import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import SocialLinksBar from "@/components/layout/SocialLinksBar";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Send } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebook, FaWhatsapp } from "react-icons/fa";

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

const socialCards = [
  { icon: FaInstagram,  labelAr: "إنستغرام",  labelEn: "Instagram", href: "https://www.instagram.com/darhous/",      color: "#E1306C", bg: "rgba(225,48,108,0.08)",  border: "rgba(225,48,108,0.22)" },
  { icon: FaLinkedinIn, labelAr: "لينكد إن",  labelEn: "LinkedIn",  href: "https://www.linkedin.com/in/darhous/",     color: "#0A66C2", bg: "rgba(10,102,194,0.08)",   border: "rgba(10,102,194,0.22)" },
  { icon: FaFacebook,   labelAr: "فيسبوك",    labelEn: "Facebook",  href: "https://www.facebook.com/ahmed.darhous",   color: "#1877F2", bg: "rgba(24,119,242,0.08)",   border: "rgba(24,119,242,0.22)" },
  { icon: FaWhatsapp,   labelAr: "واتساب",    labelEn: "WhatsApp",  href: "https://wa.me/201030002331",               color: "#25D366", bg: "rgba(37,211,102,0.08)",   border: "rgba(37,211,102,0.22)" },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

      {/* Social hero block */}
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
          <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: "var(--color-primary)" }}>
            {isAr ? "المنصات الرسمية" : "Official Channels"}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "تواصل معنا عبر المنصات الرسمية" : "Connect Through Official Platforms"}
          </h2>
          <p className="text-sm mb-7 max-w-lg" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تابع آخر تحديثات أكاديمية درهوس وتواصل معنا مباشرة عبر المنصات الرسمية."
              : "Follow Darhous Academy updates and connect directly through the official channels."}
          </p>
          <SocialLinksBar locale={locale} variant="page" />
        </div>
      </div>

      {/* Social cards grid */}
      <div>
        <h3 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تواصل معنا الآن" : "Contact us now"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialCards.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAr ? item.labelAr : item.labelEn}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: item.bg, border: `1px solid ${item.border}`, textDecoration: "none" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                >
                  <Icon style={{ color: item.color, fontSize: "28px" }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: item.color }}>
                  {isAr ? item.labelAr : item.labelEn}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main grid: form + info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto w-full">

        {/* Contact Form — client component with /api/contact */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}
            >
              <Send size={18} />
            </div>
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "أرسل رسالة" : "Send a Message"}
            </h2>
          </div>
          <ContactForm locale={locale} isAr={isAr} />
          {/* Mailto fallback */}
          <p className="text-xs text-center" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
            {isAr ? "أو راسلنا مباشرة: " : "Or email us directly: "}
            <a href="mailto:ahmeddarhous@gmail.com"
              className="font-mono transition-opacity hover:opacity-80"
              style={{ color: "var(--color-primary)" }}>
              ahmeddarhous@gmail.com
            </a>
          </p>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-5">
          {/* Email card */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-base mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "البريد الإلكتروني" : "Email"}
            </h2>
            <a
              href="mailto:ahmeddarhous@gmail.com"
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}
              >
                <Mail size={18} />
              </div>
              <div>
                <div className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "تواصل مباشر" : "Direct contact"}
                </div>
                <div className="text-sm font-mono" style={{ color: "var(--color-primary)" }}>
                  ahmeddarhous@gmail.com
                </div>
              </div>
            </a>
          </div>

          {/* Social quick access */}
          <div className="glass-card rounded-2xl p-6">
            <p className="font-mono text-xs tracking-wider uppercase mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "تابعنا" : "Follow us"}
            </p>
            <SocialLinksBar locale={locale} variant="footer" />
          </div>

          {/* Response time */}
          <div
            className="glass-card rounded-2xl p-6"
            style={{ border: "1px solid rgba(142,213,255,0.1)" }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "وقت الاستجابة" : "Response Time"}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr
                    ? "نسعى للرد في غضون 24-48 ساعة."
                    : "We aim to respond within 24–48 hours."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
