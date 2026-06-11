import type { Metadata } from "next";
import { FileText, AlertTriangle, Bot, Lock, Scale, Info } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "شروط الخدمة" : "Terms of Service",
    description: isAr
      ? "شروط استخدام NexaLearn"
      : "NexaLearn terms of service",
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const sections = isAr
    ? [
        {
          icon: <Info size={20} />,
          title: "الغرض من المنصة",
          content: [
            "NexaLearn منصة تعليمية مجانية تهدف إلى تعليم الذكاء الاصطناعي والكلاود باللغة العربية.",
            "المحتوى المقدَّم للأغراض التعليمية فقط وليس استشارة مهنية أو تقنية رسمية.",
          ],
        },
        {
          icon: <Bot size={20} />,
          title: "استخدام ميزات الذكاء الاصطناعي",
          content: [
            "ميزات الذكاء الاصطناعي — مساعد NexaLearn، استوديو البرومبتات، مولّد خطط التعلم — مُقدَّمة كأدوات مساعدة في التعلم.",
            "مخرجات الذكاء الاصطناعي قابلة للخطأ — تحقق دائمًا من المعلومات قبل الاعتماد عليها.",
            "أنت مسؤول مسؤولية كاملة عن كيفية استخدام مخرجات الذكاء الاصطناعي.",
            "لا تُدخل كلمات مرور أو مفاتيح API أو بيانات شخصية حساسة في نماذج الذكاء الاصطناعي.",
            "يُمنع استخدام المساعد الذكي لأغراض ضارة أو غير قانونية.",
          ],
        },
        {
          icon: <AlertTriangle size={20} />,
          title: "حدود المسؤولية",
          content: [
            "لا نضمن دقة كل مخرجات الذكاء الاصطناعي في جميع الأوقات.",
            "المنصة مُقدَّمة 'كما هي' — نسعى دائمًا للتحسين لكن لا نضمن توافرها بنسبة 100%.",
            "لا نتحمل مسؤولية أي قرارات تتخذها بناءً على محتوى المنصة.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "البيانات والخصوصية",
          content: [
            "نستخدم Supabase Auth لإدارة حسابات المستخدمين. يمكنك التسجيل بالبريد الإلكتروني أو عبر Google.",
            "نحفظ بيانات التعلم (تقدم الدورات، نتائج الاختبارات) وبيانات الملف الشخصي في قاعدة بيانات مشفّرة.",
            "لا ندعم تسجيل الدخول بـ Apple حالياً.",
            "ميزات الذكاء الاصطناعي تُرسل مدخلاتك إلى Google Gemini API عبر خادمنا فقط.",
            "راجع سياسة الخصوصية للمزيد من التفاصيل الكاملة.",
          ],
        },
        {
          icon: <Scale size={20} />,
          title: "حقوق الملكية الفكرية",
          content: [
            "محتوى المنصة — الدورات، المقالات، المشاريع، البرومبتات — مُقدَّم للاستخدام التعليمي الشخصي.",
            "لا يُسمح بإعادة نشر المحتوى تجاريًا دون إذن مسبق.",
            "أسماء الأدوات والمنتجات المذكورة تعود لأصحابها المعنيين.",
          ],
        },
        {
          icon: <FileText size={20} />,
          title: "التعديلات على الشروط",
          content: [
            "نحتفظ بحق تعديل هذه الشروط في أي وقت.",
            "التعديلات الجوهرية ستُعلَن على المنصة.",
            "الاستمرار في استخدام المنصة بعد التعديل يعني موافقتك على الشروط الجديدة.",
            "تواصل معنا لأي استفسار عبر صفحة التواصل.",
          ],
        },
      ]
    : [
        {
          icon: <Info size={20} />,
          title: "Platform Purpose",
          content: [
            "NexaLearn is a free educational platform focused on teaching AI and Cloud in Arabic.",
            "All content is provided for educational purposes only and does not constitute professional or technical advice.",
          ],
        },
        {
          icon: <Bot size={20} />,
          title: "AI Features Usage",
          content: [
            "AI features — NexaLearn Mentor, Prompt Studio, Roadmap Generator — are provided as learning assistance tools.",
            "AI outputs can be inaccurate — always verify information before relying on it.",
            "You are solely responsible for how you use AI-generated outputs.",
            "Do not enter passwords, API keys, or sensitive personal data into AI forms.",
            "Using the AI assistant for harmful or illegal purposes is prohibited.",
          ],
        },
        {
          icon: <AlertTriangle size={20} />,
          title: "Limitation of Liability",
          content: [
            "We do not guarantee the accuracy of all AI outputs at all times.",
            "The platform is provided 'as is' — we strive to improve continuously but do not guarantee 100% uptime.",
            "We are not responsible for any decisions you make based on platform content.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "Data & Privacy",
          content: [
            "We use Supabase Auth to manage user accounts. You can register via email or Google OAuth.",
            "We store learning data (course progress, quiz results) and profile data in an encrypted database.",
            "Apple Sign-In is not currently supported.",
            "AI features send your inputs to Google Gemini API via our server only — never directly from your browser.",
            "See the Privacy Policy for complete details.",
          ],
        },
        {
          icon: <Scale size={20} />,
          title: "Intellectual Property",
          content: [
            "Platform content — courses, articles, projects, prompts — is provided for personal educational use.",
            "Commercial republication of content is not permitted without prior permission.",
            "Tool and product names mentioned belong to their respective owners.",
          ],
        },
        {
          icon: <FileText size={20} />,
          title: "Terms Modifications",
          content: [
            "We reserve the right to modify these terms at any time.",
            "Significant changes will be announced on the platform.",
            "Continued use of the platform after changes constitutes your agreement to the new terms.",
            "Contact us with any questions via the Contact page.",
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
            background: "rgba(208,188,255,0.08)",
            border: "1px solid rgba(208,188,255,0.2)",
            color: "var(--color-secondary)",
          }}
        >
          <FileText size={12} />
          {isAr ? "آخر تحديث: مايو 2026" : "Last updated: May 2026"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "شروط الخدمة" : "Terms of Service"}
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "شروط بسيطة وواضحة لاستخدام NexaLearn."
            : "Simple and clear terms for using NexaLearn."}
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
                style={{ background: "rgba(208,188,255,0.1)", color: "var(--color-secondary)" }}
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
          background: "rgba(208,188,255,0.04)",
          border: "1px solid rgba(208,188,255,0.12)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "لأي استفسار حول شروط الخدمة، تواصل معنا عبر "
            : "For any questions about these terms, reach us via "}
          <a
            href={`/${locale}/contact`}
            className="font-mono transition-opacity hover:opacity-70"
            style={{ color: "var(--color-secondary)" }}
          >
            {isAr ? "صفحة التواصل" : "the Contact page"}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
