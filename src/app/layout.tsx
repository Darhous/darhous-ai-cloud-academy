import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Darhous AI Cloud Academy | أكاديمية درهوس",
    template: "%s | Darhous AI",
  },
  description: "A practical AI and Cloud learning platform. منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
