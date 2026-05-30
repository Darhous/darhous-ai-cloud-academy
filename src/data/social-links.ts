export type SocialLink = {
  id: string;
  labelAr: string;
  labelEn: string;
  href: string;
  icon: "instagram" | "linkedin" | "facebook" | "whatsapp";
  color: string;
  bg: string;
  external: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    labelAr: "إنستغرام",
    labelEn: "Instagram",
    href: "https://www.instagram.com/darhous/",
    icon: "instagram",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.1)",
    external: true,
  },
  {
    id: "linkedin",
    labelAr: "لينكد إن",
    labelEn: "LinkedIn",
    href: "https://www.linkedin.com/in/darhous/",
    icon: "linkedin",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
    external: true,
  },
  {
    id: "facebook",
    labelAr: "فيسبوك",
    labelEn: "Facebook",
    href: "https://www.facebook.com/ahmed.darhous",
    icon: "facebook",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.1)",
    external: true,
  },
  {
    id: "whatsapp",
    labelAr: "واتساب",
    labelEn: "WhatsApp",
    href: "https://wa.me/201030002331",
    icon: "whatsapp",
    color: "#25D366",
    bg: "rgba(37,211,102,0.1)",
    external: true,
  },
];
