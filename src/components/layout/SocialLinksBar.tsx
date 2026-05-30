"use client";

import { FaInstagram, FaLinkedinIn, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/data/social-links";

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
} as const;

interface Props {
  locale: string;
  variant?: "footer" | "page";
}

export default function SocialLinksBar({ locale, variant = "footer" }: Props) {
  const isAr = locale === "ar";

  if (variant === "page") {
    return (
      <div>
        <p
          className="font-mono text-xs tracking-wider uppercase mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          {isAr ? "تواصل معنا" : "Connect with us"}
        </p>
        <p
          className="text-sm mb-5 leading-relaxed"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr
            ? "تابع آخر تحديثات أكاديمية درهوس وتواصل معنا عبر المنصات الرسمية."
            : "Follow Darhous Academy updates and connect through the official channels."}
        </p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={isAr ? link.labelAr : link.labelEn}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: link.bg,
                  border: `1px solid ${link.color}30`,
                  color: link.color,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${link.color}25`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${link.color}60`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                }}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">
                  {isAr ? link.labelAr : link.labelEn}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // footer variant — icon-only circles
  return (
    <div className="flex gap-2.5 flex-wrap">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.id}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={isAr ? link.labelAr : link.labelEn}
            title={isAr ? link.labelAr : link.labelEn}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
            style={{
              background: link.bg,
              border: `1px solid ${link.color}30`,
              color: link.color,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${link.color}30`;
              (e.currentTarget as HTMLElement).style.borderColor = `${link.color}55`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
              (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
            }}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
