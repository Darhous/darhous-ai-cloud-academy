import type { Metadata } from "next";
import { Shield, Lock, Database, Server, Eye, Cpu } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr
      ? "سياسة خصوصية أكاديمية درهوس للذكاء الاصطناعي — كيف نتعامل مع بياناتك"
      : "Darhous AI Cloud Academy privacy policy — how we handle your data",
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const sections = isAr
    ? [
        {
          icon: <Shield size={20} />,
          title: "نظرة عامة",
          content: [
            "أكاديمية درهوس للذكاء الاصطناعي والكلاود هي منصة تعليمية تُركّز على تعليم الذكاء الاصطناعي والكلاود باللغة العربية.",
            "نحرص على خصوصيتك ونسعى إلى الشفافية الكاملة في كيفية تعاملنا مع بياناتك.",
          ],
        },
        {
          icon: <Cpu size={20} />,
          title: "ميزات الذكاء الاصطناعي",
          content: [
            "بعض ميزات المنصة — مثل مساعد درهوس الذكي واستوديو البرومبتات ومولّد خطط التعلم — تستخدم Gemini API من Google.",
            "جميع طلبات الذكاء الاصطناعي تُعالَج عبر خادمنا فقط (server-side) — لا يصل مفتاح API إلى متصفحك.",
            "لا تُخزَّن محادثاتك في قاعدة بيانات. تنتهي المحادثة عند إغلاق الصفحة أو مسح المحادثة.",
            "لا تُدخل مفاتيح API أو كلمات مرور أو بيانات شخصية حساسة في نماذج المحادثة.",
          ],
        },
        {
          icon: <Database size={20} />,
          title: "البيانات المحفوظة محليًا",
          content: [
            "بعض البيانات تُحفظ في متصفحك المحلي عبر localStorage — ولا تُرسَل إلى خوادمنا:",
            "• المفضلات (الدورات، الأدوات، المشاريع، البرومبتات المفضلة)",
            "• البرومبتات المُنشأة بالذكاء الاصطناعي التي تختار حفظها",
            "• تفضيل الثيم (داكن/فاتح)",
            "يمكنك مسح هذه البيانات في أي وقت من إعدادات متصفحك.",
          ],
        },
        {
          icon: <Server size={20} />,
          title: "بيئة التطوير والنشر",
          content: [
            "المنصة منشورة على Vercel. مفاتيح API تُخزَّن في Vercel Environment Variables ولا تظهر في أي مكان في الكود المصدري.",
            "الكود المصدري متاح على GitHub، لكنه لا يحتوي على أي مفاتيح حقيقية أو بيانات حساسة.",
            "لا يوجد نظام تسجيل دخول أو قاعدة بيانات للمستخدمين حالياً.",
          ],
        },
        {
          icon: <Eye size={20} />,
          title: "ملفات تعريف الارتباط والتتبع",
          content: [
            "لا نستخدم ملفات تعريف ارتباط للتتبع أو التحليل التجاري حالياً.",
            "Vercel قد يجمع بيانات أداء مجهولة الهوية كجزء من خدمته — راجع سياسة خصوصية Vercel للمزيد.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "التزاماتنا",
          content: [
            "لن نبيع بياناتك لأي طرف ثالث.",
            "لن نُرسل بريدًا إلكترونيًا تجاريًا دون إذنك.",
            "سنُخبرك بأي تغييرات جوهرية في هذه السياسة.",
            "إذا كان لديك أي استفسار، تواصل معنا عبر صفحة التواصل.",
          ],
        },
      ]
    : [
        {
          icon: <Shield size={20} />,
          title: "Overview",
          content: [
            "Darhous AI Cloud Academy is an educational platform focused on teaching AI and Cloud in Arabic.",
            "We are committed to your privacy and full transparency about how we handle your data.",
          ],
        },
        {
          icon: <Cpu size={20} />,
          title: "AI Features",
          content: [
            "Some platform features — such as Darhous AI Mentor, Prompt Studio, and Roadmap Generator — use Google's Gemini API.",
            "All AI requests are processed server-side only — your API key never reaches your browser.",
            "Conversations are not stored in a database. They end when you close the page or clear the chat.",
            "Do not enter API keys, passwords, or sensitive personal data into chat forms.",
          ],
        },
        {
          icon: <Database size={20} />,
          title: "Locally Stored Data",
          content: [
            "Some data is saved in your browser's localStorage — and is never sent to our servers:",
            "• Favorites (courses, tools, projects, saved prompts)",
            "• AI-generated prompts you choose to save",
            "• Theme preference (dark/light)",
            "You can clear this data at any time from your browser settings.",
          ],
        },
        {
          icon: <Server size={20} />,
          title: "Deployment & Environment",
          content: [
            "The platform is deployed on Vercel. API keys are stored in Vercel Environment Variables and never appear in the source code.",
            "The source code is available on GitHub, but contains no real keys or sensitive data.",
            "There is currently no user login system or user database.",
          ],
        },
        {
          icon: <Eye size={20} />,
          title: "Cookies & Tracking",
          content: [
            "We do not use tracking or analytics cookies.",
            "Vercel may collect anonymized performance data as part of its service — see Vercel's Privacy Policy for details.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "Our Commitments",
          content: [
            "We will never sell your data to third parties.",
            "We will not send commercial emails without your permission.",
            "We will notify you of any significant changes to this policy.",
            "For any inquiries, contact us via the Contact page.",
          ],
        },
      ];

  return (
    <div className="container-xl py-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-5"
          style={{
            background: "rgba(142,213,255,0.08)",
            border: "1px solid rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          <Shield size={12} />
          {isAr ? "آخر تحديث: مايو 2026" : "Last updated: May 2026"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "نؤمن بالشفافية الكاملة. إليك كيف نتعامل مع بياناتك."
            : "We believe in full transparency. Here's how we handle your data."}
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((section, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(142,213,255,0.1)", color: "var(--color-primary)" }}
              >
                {section.icon}
              </div>
              <h2 className="font-display font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
                {section.title}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {section.content.map((line, j) => (
                <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact note */}
      <div
        className="mt-10 rounded-2xl p-6 text-center"
        style={{
          background: "rgba(142,213,255,0.04)",
          border: "1px solid rgba(142,213,255,0.12)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "لأي استفسار حول سياسة الخصوصية، تواصل معنا عبر "
            : "For any privacy questions, reach us via "}
          <a
            href={`/${locale}/contact`}
            className="font-mono transition-opacity hover:opacity-70"
            style={{ color: "var(--color-primary)" }}
          >
            {isAr ? "صفحة التواصل" : "the Contact page"}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
