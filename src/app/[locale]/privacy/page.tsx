import type { Metadata } from "next";
import { Shield, Lock, Database, Server, Eye, Cpu, UserCircle, Key } from "lucide-react";

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
            "آخر تحديث لهذه السياسة: يونيو 2026.",
          ],
        },
        {
          icon: <UserCircle size={20} />,
          title: "نظام التسجيل والمصادقة",
          content: [
            "تستخدم المنصة نظام Supabase Auth لإدارة حسابات المستخدمين.",
            "يمكنك التسجيل بالبريد الإلكتروني وكلمة مرور، أو عبر Google OAuth.",
            "لا ندعم تسجيل الدخول عبر Apple حالياً.",
            "عند إنشاء حسابك، قد نحفظ: البريد الإلكتروني، الاسم الكامل، صورة الملف الشخصي (من Google إذا استخدمت OAuth)، دورك (طالب أو مسؤول).",
            "تُخزَّن البيانات في قاعدة بيانات Supabase PostgreSQL في منطقة أوروبا (eu-central-1).",
          ],
        },
        {
          icon: <Database size={20} />,
          title: "البيانات التي نجمعها ونخزنها",
          content: [
            "بيانات الحساب: البريد الإلكتروني، الاسم، الصورة، الدور، اللغة المفضلة.",
            "بيانات التعلم: تقدمك في الدورات، نتائج الاختبارات، الدروس المكتملة.",
            "البرومبتات المحفوظة: البرومبتات التي تختار حفظها في حسابك.",
            "بيانات الملف الشخصي: مستواك التعليمي، اهتماماتك، أهدافك (اختياري).",
            "رسائل التواصل: إذا راسلتنا عبر نموذج الاتصال، نحتفظ بالرسالة ونردّ عليها.",
            "لا نبيع أياً من هذه البيانات لأطراف ثالثة.",
          ],
        },
        {
          icon: <Cpu size={20} />,
          title: "ميزات الذكاء الاصطناعي",
          content: [
            "بعض ميزات المنصة — مثل مساعد درهوس الذكي واستوديو البرومبتات ومولّد خطط التعلم — تستخدم Gemini API من Google.",
            "جميع طلبات الذكاء الاصطناعي تُعالَج عبر خادمنا فقط (server-side) — مفتاح API لا يصل إلى متصفحك أبداً.",
            "لا تُخزَّن محادثاتك مع المساعد الذكي في قاعدة البيانات. تنتهي المحادثة عند إغلاق الصفحة أو مسحها.",
            "مدخلاتك في نماذج الذكاء الاصطناعي تُرسَل إلى Google Gemini API لمعالجتها — راجع سياسة خصوصية Google للمزيد.",
            "لا تُدخل كلمات مرور أو مفاتيح API أو بيانات شخصية حساسة في نماذج المحادثة.",
          ],
        },
        {
          icon: <Key size={20} />,
          title: "البيانات المحفوظة محليًا في المتصفح",
          content: [
            "بعض البيانات تُحفظ في متصفحك عبر localStorage فقط ولا تُرسَل إلى خوادمنا:",
            "• تفضيل الثيم (داكن/فاتح)",
            "• بعض البيانات المؤقتة للاختبارات إذا لم تكن مسجلاً دخولاً",
            "يمكنك مسح هذه البيانات في أي وقت من إعدادات متصفحك.",
          ],
        },
        {
          icon: <Server size={20} />,
          title: "البنية التحتية والنشر",
          content: [
            "المنصة منشورة على Vercel. المتغيرات الحساسة (مفاتيح API) تُخزَّن في Vercel Environment Variables ولا تظهر في الكود المصدري.",
            "قاعدة البيانات: Supabase PostgreSQL مع Row Level Security (RLS) مفعّل على جميع الجداول.",
            "المصادقة: Supabase Auth مع تشفير كامل للبيانات الحساسة.",
            "الكود المصدري متاح على GitHub لكنه لا يحتوي على أي مفاتيح حقيقية أو بيانات حساسة.",
          ],
        },
        {
          icon: <Eye size={20} />,
          title: "ملفات تعريف الارتباط والتتبع",
          content: [
            "نستخدم ملفات تعريف ارتباط ضرورية فقط لإدارة جلسة تسجيل الدخول (Supabase session cookies).",
            "لا نستخدم ملفات تعريف ارتباط للتتبع أو التحليل التجاري.",
            "Vercel قد يجمع بيانات أداء مجهولة الهوية — راجع سياسة خصوصية Vercel للمزيد.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "حقوقك والتزاماتنا",
          content: [
            "يمكنك حذف حسابك وبياناتك في أي وقت عبر صفحة إعدادات الحساب أو بالتواصل معنا.",
            "يمكنك طلب نسخة من بياناتك بالتواصل معنا.",
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
            "Last updated: June 2026.",
          ],
        },
        {
          icon: <UserCircle size={20} />,
          title: "Authentication System",
          content: [
            "The platform uses Supabase Auth to manage user accounts.",
            "You can register with email/password or via Google OAuth.",
            "Apple Sign-In is not supported at this time.",
            "When creating an account, we may store: email, full name, profile picture (from Google if using OAuth), and your role (student or admin).",
            "Data is stored in Supabase PostgreSQL in the Europe (eu-central-1) region.",
          ],
        },
        {
          icon: <Database size={20} />,
          title: "Data We Collect & Store",
          content: [
            "Account data: email, name, photo, role, preferred language.",
            "Learning data: course progress, quiz results, completed lessons.",
            "Saved prompts: prompts you choose to save to your account.",
            "Profile data: learning level, interests, goals (optional).",
            "Contact messages: if you contact us via the contact form, we retain your message to reply.",
            "We never sell any of this data to third parties.",
          ],
        },
        {
          icon: <Cpu size={20} />,
          title: "AI Features",
          content: [
            "Some platform features — AI Mentor, Prompt Studio, Roadmap Generator — use Google's Gemini API.",
            "All AI requests are processed server-side only — your API key never reaches your browser.",
            "AI chat conversations are not stored in the database. They end when you close or clear the chat.",
            "Your inputs to AI forms are sent to Google Gemini API for processing — see Google's Privacy Policy for details.",
            "Do not enter passwords, API keys, or sensitive personal data into AI chat forms.",
          ],
        },
        {
          icon: <Key size={20} />,
          title: "Locally Stored Data",
          content: [
            "Some data is saved in your browser's localStorage only and never sent to our servers:",
            "• Theme preference (dark/light)",
            "• Temporary quiz data if you're not logged in",
            "You can clear this data at any time from your browser settings.",
          ],
        },
        {
          icon: <Server size={20} />,
          title: "Infrastructure & Deployment",
          content: [
            "The platform is deployed on Vercel. Sensitive variables (API keys) are stored in Vercel Environment Variables and never appear in source code.",
            "Database: Supabase PostgreSQL with Row Level Security (RLS) enabled on all tables.",
            "Authentication: Supabase Auth with full encryption of sensitive data.",
            "Source code is available on GitHub but contains no real keys or sensitive data.",
          ],
        },
        {
          icon: <Eye size={20} />,
          title: "Cookies & Tracking",
          content: [
            "We use only necessary session cookies for managing your login session (Supabase session cookies).",
            "We do not use tracking or commercial analytics cookies.",
            "Vercel may collect anonymized performance data — see Vercel's Privacy Policy for details.",
          ],
        },
        {
          icon: <Lock size={20} />,
          title: "Your Rights & Our Commitments",
          content: [
            "You can delete your account and data at any time via Account Settings or by contacting us.",
            "You can request a copy of your data by contacting us.",
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
          {isAr ? "آخر تحديث: يونيو 2026" : "Last updated: June 2026"}
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
        style={{ background: "rgba(142,213,255,0.04)", border: "1px solid rgba(142,213,255,0.12)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "لأي استفسار حول سياسة الخصوصية، تواصل معنا عبر " : "For any privacy questions, reach us via "}
          <a href={`/${locale}/contact`} className="font-mono transition-opacity hover:opacity-70" style={{ color: "var(--color-primary)" }}>
            {isAr ? "صفحة التواصل" : "the Contact page"}
          </a>.
        </p>
      </div>
    </div>
  );
}
