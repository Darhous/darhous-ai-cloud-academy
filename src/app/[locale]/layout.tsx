import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPaletteProvider from "@/components/features/CommandPaletteProvider";
import MentorFloatingButton from "@/components/mentor/MentorFloatingButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionProvider from "@/components/providers/MotionProvider";
import { locales } from "@/lib/i18n";
import { getDir } from "@/lib/utils";

const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";

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
      default: "NexaLearn by Ahmed Darhous",
      template: "%s | NexaLearn",
    },
    description: isAr
      ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية"
      : "A practical AI and Cloud learning platform from zero to real-world projects",
    keywords: isAr
      ? ["ذكاء اصطناعي", "كلاود", "claude", "تعلم آلة", "برمجة", "دورات", "أكاديمية"]
      : ["AI", "Cloud", "Claude", "Machine Learning", "Arabic AI", "Courses", "Academy"],
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: "website",
      locale: isAr ? "ar_AR" : "en_US",
      siteName: "NexaLearn by Ahmed Darhous",
      title: "NexaLearn by Ahmed Darhous",
      description: isAr
        ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود"
        : "A practical AI and Cloud learning platform",
      images: [
        {
          url: `${BASE_URL}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: "NexaLearn by Ahmed Darhous",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NexaLearn by Ahmed Darhous",
      images: [`${BASE_URL}/og-image.svg`],
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
  const isAr = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "NexaLearn by Ahmed Darhous",
        description: isAr
          ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود"
          : "A practical AI and Cloud learning platform",
        inLanguage: [isAr ? "ar" : "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/${locale}/tools?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${BASE_URL}/#organization`,
        name: "NexaLearn by Ahmed Darhous",
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.svg`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "ahmeddarhous@gmail.com",
          contactType: "customer support",
        },
        sameAs: [
          "https://www.instagram.com/darhous/",
          "https://www.linkedin.com/in/darhous/",
          "https://www.facebook.com/ahmed.darhous",
        ],
      },
    ],
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#00668a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Inline theme init — prevents flash of wrong theme on refresh */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body dir={dir} className="bg-grid-overlay min-h-screen flex flex-col" suppressHydrationWarning>
        <MotionProvider>
          {/* Skip to main content — keyboard / screen-reader a11y */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
            style={{
              background: "var(--color-primary)",
              color: "#0c0e12",
              insetInlineStart: "1rem",
            }}
          >
            {isAr ? "تخطى إلى المحتوى الرئيسي" : "Skip to main content"}
          </a>

          {/* Single ambient orb — reduced from 3 for visual calm + performance */}
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
          </div>

          <Navbar locale={locale} />
          <CommandPaletteProvider locale={locale} />
          <MentorFloatingButton locale={locale} />
          <ScrollToTop />
          <main id="main-content" className="flex-1 relative z-10" style={{ paddingTop: "64px" }}>
            {children}
          </main>
          <Footer locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
