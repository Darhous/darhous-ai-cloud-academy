import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedShowcaseCarousel from "@/components/layout/FeaturedShowcaseCarousel";
import CommandPaletteProvider from "@/components/features/CommandPaletteProvider";
import MentorFloatingButton from "@/components/mentor/MentorFloatingButton";
import { locales } from "@/lib/i18n";
import { getDir } from "@/lib/utils";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: {
      default: isAr
        ? "أكاديمية درهوس للذكاء الاصطناعي والكلاود"
        : "Darhous AI Cloud Academy",
      template: isAr
        ? "%s | أكاديمية درهوس"
        : "%s | Darhous AI Academy",
    },
    description: isAr
      ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية"
      : "A practical AI and Cloud learning platform from zero to real-world projects",
    keywords: isAr
      ? ["ذكاء اصطناعي", "كلاود", "claude", "تعلم آلة", "برمجة", "دورات", "أكاديمية"]
      : ["AI", "Cloud", "Claude", "Machine Learning", "Arabic AI", "Courses", "Academy"],
    metadataBase: new URL("https://darhous-ai-cloud-academy.vercel.app"),
    openGraph: {
      type: "website",
      locale: isAr ? "ar_AR" : "en_US",
      siteName: isAr ? "أكاديمية درهوس للذكاء الاصطناعي" : "Darhous AI Cloud Academy",
      title: isAr ? "أكاديمية درهوس للذكاء الاصطناعي والكلاود" : "Darhous AI Cloud Academy",
      description: isAr
        ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود"
        : "A practical AI and Cloud learning platform",
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? "أكاديمية درهوس للذكاء الاصطناعي" : "Darhous AI Cloud Academy",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const dir = getDir(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Inline theme init — prevents flash of wrong theme on refresh */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'dark';
    if (t === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
            `.trim(),
          }}
        />
      </head>
      <body dir={dir} className="bg-grid-overlay min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Fixed full-viewport ambient orbs — matching Stitch design */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute top-[-10%] right-[-5%] rounded-full"
            style={{
              width: "50vw",
              height: "50vw",
              background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[-5%] rounded-full"
            style={{
              width: "45vw",
              height: "45vw",
              background: "radial-gradient(circle, rgba(87,27,193,0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute top-[40%] left-[30%] rounded-full"
            style={{
              width: "30vw",
              height: "30vw",
              background: "radial-gradient(circle, rgba(60,224,251,0.04) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <Navbar locale={locale} />
        <div style={{ paddingTop: "64px" }}>
          <FeaturedShowcaseCarousel locale={locale} />
        </div>
        <CommandPaletteProvider locale={locale} />
        <MentorFloatingButton locale={locale} />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
