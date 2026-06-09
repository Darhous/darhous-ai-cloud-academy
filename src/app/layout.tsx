import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://darhous-ai-cloud-academy.vercel.app"),
  title: {
    default: "NexaLearn by Darhous | منصة تعلم ذكية من درهوس",
    template: "%s | NexaLearn",
  },
  description: "A practical AI and Cloud learning platform. منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود.",
  openGraph: {
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
