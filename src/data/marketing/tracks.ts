// Marketing Academy — the 16 learning tracks (Track → Module → Lesson → Topic).
// See docs/marketing-portal/BLUEPRINT.md for the design rationale.
// Flagship tracks (T1 Foundations, T16 MCP) are expanded to Topic depth as
// reference; all others are expanded to Module → Lesson.

import type { MarketingTrack } from "./types";

export const marketingTracks: MarketingTrack[] = [
  // ── T1 — Marketing Foundations (flagship, topic depth) ──────────────────
  {
    id: "marketing-foundations",
    order: 1,
    titleAr: "أساسيات التسويق",
    titleEn: "Marketing Foundations",
    descriptionAr:
      "النموذج الذهني للتسويق الحديث: العميل، القمع التسويقي، عرض القيمة، القنوات، ورياضيات التسويق.",
    descriptionEn:
      "The mental model of modern marketing: customer, funnel, value proposition, channels, and marketing math.",
    stage: "beginner",
    difficulty: 1,
    durationHours: 8,
    icon: "🎯",
    color: "#22c55e",
    skillsAr: ["بحث السوق", "عرض القيمة", "التفكير بالقمع", "رياضيات التسويق (CAC, LTV, ROAS)"],
    skillsEn: ["Market research", "Value proposition", "Funnel thinking", "Marketing math (CAC, LTV, ROAS)"],
    prereqs: [],
    finalProjectAr: "ملخص استراتيجية «العلامة في صندوق» لنشاط محلي حقيقي.",
    finalProjectEn: "\"Brand-in-a-Box\" strategy brief for a real local business.",
    featured: true,
    modules: [
      {
        id: "mf-m1",
        titleAr: "العقلية التسويقية",
        titleEn: "The Marketing Mindset",
        lessons: [
          {
            id: "mf-l1-1",
            titleAr: "ما هو التسويق حقًا (وما ليس كذلك)",
            titleEn: "What marketing really is (and isn't)",
            estMinutes: 25,
            topics: [
              { id: "mf-t1", titleAr: "الانتباه ← الثقة ← الفعل", titleEn: "Attention → trust → action" },
              { id: "mf-t2", titleAr: "العلامة مقابل الطلب مقابل النمو", titleEn: "Brand vs demand vs growth" },
              { id: "mf-t3", titleAr: "تبادل القيمة", titleEn: "The value exchange" },
            ],
          },
          {
            id: "mf-l1-2",
            titleAr: "رحلة العميل الحديثة",
            titleEn: "The modern customer journey",
            estMinutes: 30,
            topics: [
              { id: "mf-t4", titleAr: "AIDA والمنتصف الفوضوي", titleEn: "AIDA & the messy middle" },
              { id: "mf-t5", titleAr: "نقاط التماس واللحظات الدقيقة", titleEn: "Touchpoints & micro-moments" },
            ],
          },
          {
            id: "mf-l1-3",
            titleAr: "رياضيات التسويق التي يجب أن تعرفها",
            titleEn: "Marketing math you must know",
            estMinutes: 35,
            topics: [
              { id: "mf-t6", titleAr: "CAC و LTV وفترة الاسترداد", titleEn: "CAC, LTV, payback" },
              { id: "mf-t7", titleAr: "ROAS و CTR و CVR و AOV", titleEn: "ROAS, CTR, CVR, AOV" },
            ],
          },
        ],
      },
      {
        id: "mf-m2",
        titleAr: "بحث العميل والسوق",
        titleEn: "Customer & Market Research",
        lessons: [
          { id: "mf-l2-1", titleAr: "تحديد العميل المثالي (ICP) والشخصيات", titleEn: "Finding your ICP & personas", estMinutes: 30 },
          { id: "mf-l2-2", titleAr: "تعدين صوت العميل (مراجعات، مجتمعات، AI)", titleEn: "Voice-of-customer mining (reviews, communities, AI)", estMinutes: 25 },
          { id: "mf-l2-3", titleAr: "المشهد التنافسي والفئة", titleEn: "Competitive & category landscape", estMinutes: 25 },
        ],
      },
      {
        id: "mf-m3",
        titleAr: "عرض القيمة والعرض",
        titleEn: "Value Proposition & Offer",
        lessons: [
          { id: "mf-l3-1", titleAr: "لوحة عرض القيمة", titleEn: "Value proposition canvas", estMinutes: 30 },
          { id: "mf-l3-2", titleAr: "تصميم العرض 101", titleEn: "Offer design 101", estMinutes: 30 },
          { id: "mf-l3-3", titleAr: "مقدمة في التسعير والتموضع", titleEn: "Pricing & positioning intro", estMinutes: 25 },
        ],
      },
      {
        id: "mf-m4",
        titleAr: "خريطة القنوات",
        titleEn: "The Channel Map",
        lessons: [
          { id: "mf-l4-1", titleAr: "المملوك / المكتسب / المدفوع", titleEn: "Owned / Earned / Paid", estMinutes: 25 },
          { id: "mf-l4-2", titleAr: "اختيار قناتك الأولى", titleEn: "Choosing your first channel", estMinutes: 25 },
          { id: "mf-l4-3", titleAr: "الميزانية وأهداف المؤشرات", titleEn: "Budgeting & KPI targets", estMinutes: 30 },
        ],
      },
      {
        id: "mf-m5",
        titleAr: "كابستون — ملخص الاستراتيجية",
        titleEn: "Capstone — Strategy Brief",
        lessons: [
          { id: "mf-l5-1", titleAr: "ابنِ وسلّم ملخص الاستراتيجية (مراجعة بالـ AI)", titleEn: "Build & submit your strategy brief (AI-reviewed)", estMinutes: 60 },
        ],
      },
    ],
  },

  // ── T2 — Branding & Positioning ─────────────────────────────────────────
  {
    id: "branding-positioning",
    order: 2,
    titleAr: "العلامة التجارية والتموضع",
    titleEn: "Branding & Positioning",
    descriptionAr: "ابنِ علامة يتم اختيارها لا مجرد رؤيتها: التموضع، تسلسل الرسائل، صوت العلامة، والهوية البصرية.",
    descriptionEn: "Build a brand that's chosen, not just seen: positioning, messaging, brand voice, and visual identity.",
    stage: "beginner",
    difficulty: 2,
    durationHours: 6,
    icon: "✨",
    color: "#22c55e",
    skillsAr: ["بيانات التموضع", "خرائط الرسائل", "أدلة صوت العلامة", "التمايز التنافسي"],
    skillsEn: ["Positioning statements", "Messaging maps", "Brand voice guides", "Competitive differentiation"],
    prereqs: ["marketing-foundations"],
    finalProjectAr: "كتيب العلامة v1 (تموضع + صوت + هوية صفحة واحدة).",
    finalProjectEn: "Brand Book v1 (positioning + voice + 1-page identity).",
    modules: [
      { id: "bp-m1", titleAr: "أساسيات التموضع", titleEn: "Positioning Foundations", lessons: [
        { id: "bp-l1-1", titleAr: "ما هو التموضع", titleEn: "What positioning is" },
        { id: "bp-l1-2", titleAr: "بيان التموضع", titleEn: "The positioning statement" },
        { id: "bp-l1-3", titleAr: "تصميم الفئة", titleEn: "Category design" },
      ]},
      { id: "bp-m2", titleAr: "الرسائل والصوت", titleEn: "Messaging & Voice", lessons: [
        { id: "bp-l2-1", titleAr: "تسلسل الرسائل الهرمي", titleEn: "Messaging hierarchy" },
        { id: "bp-l2-2", titleAr: "صوت ونبرة العلامة", titleEn: "Brand voice & tone" },
      ]},
      { id: "bp-m3", titleAr: "الهوية البصرية", titleEn: "Visual Identity", lessons: [
        { id: "bp-l3-1", titleAr: "أساسيات الهوية البصرية", titleEn: "Visual identity basics" },
        { id: "bp-l3-2", titleAr: "كابستون — كتيب العلامة", titleEn: "Capstone — Brand Book" },
      ]},
    ],
  },

  // ── T3 — Copywriting ────────────────────────────────────────────────────
  {
    id: "copywriting",
    order: 3,
    titleAr: "كتابة الإعلانات (Copywriting)",
    titleEn: "Copywriting",
    descriptionAr: "الإقناع على الصفحة: الأطر (AIDA, PAS, BAB)، العناوين، الخطافات، العروض، الإعلانات، الإيميلات، صفحات الهبوط.",
    descriptionEn: "Persuasion on the page: frameworks (AIDA, PAS, BAB), headlines, hooks, offers, ads, emails, landing pages.",
    stage: "beginner",
    difficulty: 2,
    durationHours: 10,
    icon: "✍️",
    color: "#22c55e",
    skillsAr: ["كتابة العناوين", "تصميم العروض", "نسخ الإعلانات", "تسلسلات الإيميل", "نسخ صفحات الهبوط"],
    skillsEn: ["Headline writing", "Offer design", "Ad copy", "Email sequences", "Landing-page copy"],
    prereqs: ["marketing-foundations"],
    finalProjectAr: "حزمة نسخ كاملة: 10 إعلانات + صفحة هبوط + سلسلة ترحيب 5 إيميلات.",
    finalProjectEn: "Full Copy Pack: 10 ads + 1 landing page + 5-email welcome sequence.",
    featured: true,
    modules: [
      { id: "cw-m1", titleAr: "أطر الإقناع", titleEn: "Persuasion Frameworks", lessons: [
        { id: "cw-l1-1", titleAr: "AIDA و PAS و BAB و 4Cs", titleEn: "AIDA, PAS, BAB & the 4Cs" },
        { id: "cw-l1-2", titleAr: "البحث قبل الكتابة", titleEn: "Research before writing" },
      ]},
      { id: "cw-m2", titleAr: "العناوين والخطافات", titleEn: "Headlines & Hooks", lessons: [
        { id: "cw-l2-1", titleAr: "صيغ العناوين التي تعمل", titleEn: "Headline formulas that work" },
        { id: "cw-l2-2", titleAr: "الخطافات لأول 3 ثوانٍ", titleEn: "Hooks for the first 3 seconds" },
      ]},
      { id: "cw-m3", titleAr: "النسخ عبر القنوات", titleEn: "Copy Across Channels", lessons: [
        { id: "cw-l3-1", titleAr: "نسخ الإعلانات", titleEn: "Ad copy" },
        { id: "cw-l3-2", titleAr: "نسخ الإيميل", titleEn: "Email copy" },
        { id: "cw-l3-3", titleAr: "نسخ صفحة الهبوط و VSL", titleEn: "Landing page & VSL copy" },
      ]},
      { id: "cw-m4", titleAr: "كابستون", titleEn: "Capstone", lessons: [
        { id: "cw-l4-1", titleAr: "حزمة النسخ الكاملة", titleEn: "The Full Copy Pack" },
      ]},
    ],
  },

  // ── T4 — Content Marketing ──────────────────────────────────────────────
  {
    id: "content-marketing",
    order: 4,
    titleAr: "تسويق المحتوى",
    titleEn: "Content Marketing",
    descriptionAr: "ابنِ محرك محتوى: استراتيجية الركائز، الصيغ، إعادة الاستخدام، تقويم التحرير، والتوزيع بمساعدة الـ AI.",
    descriptionEn: "Build a content engine: pillar strategy, formats, repurposing, editorial calendars, AI-assisted production.",
    stage: "intermediate",
    difficulty: 2,
    durationHours: 10,
    icon: "📝",
    color: "#3b82f6",
    skillsAr: ["استراتيجية المحتوى", "الكتابة الواعية بـ SEO", "نظام إعادة الاستخدام", "عمليات التقويم"],
    skillsEn: ["Content strategy", "SEO-aware writing", "Repurposing system", "Calendar ops"],
    prereqs: ["marketing-foundations", "copywriting"],
    finalProjectAr: "محرك محتوى 30 يومًا (ركيزة + 30 قطعة معاد استخدامها + تقويم).",
    finalProjectEn: "30-Day Content Engine (pillar + 30 repurposed pieces + calendar).",
    modules: [
      { id: "cm-m1", titleAr: "استراتيجية المحتوى", titleEn: "Content Strategy", lessons: [
        { id: "cm-l1-1", titleAr: "الركائز والمجموعات", titleEn: "Pillars & clusters" },
        { id: "cm-l1-2", titleAr: "خريطة الصيغ", titleEn: "Format map" },
      ]},
      { id: "cm-m2", titleAr: "الإنتاج وإعادة الاستخدام", titleEn: "Production & Repurposing", lessons: [
        { id: "cm-l2-1", titleAr: "نظام إعادة الاستخدام 1←10", titleEn: "1→10 repurposing system" },
        { id: "cm-l2-2", titleAr: "الإنتاج بمساعدة الـ AI", titleEn: "AI-assisted production" },
      ]},
      { id: "cm-m3", titleAr: "التوزيع والتقويم", titleEn: "Distribution & Calendar", lessons: [
        { id: "cm-l3-1", titleAr: "بناء تقويم تحريري", titleEn: "Build an editorial calendar" },
        { id: "cm-l3-2", titleAr: "كابستون — محرك المحتوى", titleEn: "Capstone — Content Engine" },
      ]},
    ],
  },

  // ── T5 — Social Media Marketing ─────────────────────────────────────────
  {
    id: "social-media-marketing",
    order: 5,
    titleAr: "التسويق عبر وسائل التواصل",
    titleEn: "Social Media Marketing",
    descriptionAr: "النمو العضوي عبر Instagram و TikTok و LinkedIn و X و YouTube: الخطافات، الصيغ، المجتمع، وتعاون المبدعين.",
    descriptionEn: "Organic growth across Instagram, TikTok, LinkedIn, X, YouTube: hooks, formats, community, creator collabs.",
    stage: "intermediate",
    difficulty: 2,
    durationHours: 9,
    icon: "📱",
    color: "#3b82f6",
    skillsAr: ["استراتيجية المنصات", "كتابة المحتوى القصير", "إدارة المجتمع", "التحليلات"],
    skillsEn: ["Platform strategy", "Short-form scripting", "Community management", "Analytics"],
    prereqs: ["marketing-foundations"],
    finalProjectAr: "خطة نمو اجتماعي 90 يومًا لمنصة واحدة مع دفعات محتوى.",
    finalProjectEn: "90-Day Social Growth Plan for one platform with content batches.",
    modules: [
      { id: "sm-m1", titleAr: "استراتيجية المنصات", titleEn: "Platform Strategy", lessons: [
        { id: "sm-l1-1", titleAr: "اختيار المنصة المناسبة", titleEn: "Choosing the right platform" },
        { id: "sm-l1-2", titleAr: "تشريح المحتوى الفيروسي", titleEn: "Anatomy of viral content" },
      ]},
      { id: "sm-m2", titleAr: "الإنتاج القصير", titleEn: "Short-Form Production", lessons: [
        { id: "sm-l2-1", titleAr: "كتابة الريلز و TikTok", titleEn: "Scripting Reels & TikTok" },
        { id: "sm-l2-2", titleAr: "الخطافات والـ SEO والهاشتاجات", titleEn: "Hooks, SEO & hashtags" },
      ]},
      { id: "sm-m3", titleAr: "المجتمع والنمو", titleEn: "Community & Growth", lessons: [
        { id: "sm-l3-1", titleAr: "إدارة المجتمع والتعاونات", titleEn: "Community management & collabs" },
        { id: "sm-l3-2", titleAr: "كابستون — خطة 90 يومًا", titleEn: "Capstone — 90-Day Plan" },
      ]},
    ],
  },

  // ── T6 — SEO & Organic Growth ───────────────────────────────────────────
  {
    id: "seo-organic-growth",
    order: 6,
    titleAr: "تحسين محركات البحث والنمو العضوي",
    titleEn: "SEO & Organic Growth",
    descriptionAr: "كيف يعمل البحث، بحث الكلمات المفتاحية، on-page، أساسيات التقنية، بناء الروابط، السلطة الموضوعية، وبحث الـ AI (GEO/AEO).",
    descriptionEn: "How search works, keyword research, on-page, technical basics, link building, topical authority, AI-search (GEO/AEO).",
    stage: "intermediate",
    difficulty: 3,
    durationHours: 11,
    icon: "🔍",
    color: "#3b82f6",
    skillsAr: ["بحث الكلمات المفتاحية", "تحسين on-page", "موجزات المحتوى", "تدقيقات SEO"],
    skillsEn: ["Keyword research", "On-page optimization", "Content briefs", "SEO audits"],
    prereqs: ["content-marketing"],
    finalProjectAr: "تدقيق SEO + 3 موجزات محتوى محسّنة لموقع حقيقي.",
    finalProjectEn: "SEO Audit + 3 Optimized Briefs for a real site.",
    modules: [
      { id: "seo-m1", titleAr: "كيف يعمل البحث", titleEn: "How Search Works", lessons: [
        { id: "seo-l1-1", titleAr: "الزحف والفهرسة والترتيب", titleEn: "Crawling, indexing, ranking" },
        { id: "seo-l1-2", titleAr: "نية البحث", titleEn: "Search intent" },
      ]},
      { id: "seo-m2", titleAr: "الكلمات المفتاحية و on-page", titleEn: "Keywords & On-Page", lessons: [
        { id: "seo-l2-1", titleAr: "بحث الكلمات المفتاحية", titleEn: "Keyword research" },
        { id: "seo-l2-2", titleAr: "تحسين on-page", titleEn: "On-page optimization" },
      ]},
      { id: "seo-m3", titleAr: "التقنية والسلطة", titleEn: "Technical & Authority", lessons: [
        { id: "seo-l3-1", titleAr: "أساسيات SEO التقني", titleEn: "Technical SEO basics" },
        { id: "seo-l3-2", titleAr: "الروابط والسلطة الموضوعية", titleEn: "Links & topical authority" },
        { id: "seo-l3-3", titleAr: "كابستون — تدقيق SEO", titleEn: "Capstone — SEO Audit" },
      ]},
    ],
  },

  // ── T7 — Email Marketing ────────────────────────────────────────────────
  {
    id: "email-marketing",
    order: 7,
    titleAr: "التسويق عبر البريد الإلكتروني",
    titleEn: "Email Marketing",
    descriptionAr: "القوائم، قابلية التسليم، التقسيم، دورة الحياة (ترحيب، رعاية، استعادة)، البث مقابل التدفقات، وعزو الإيرادات.",
    descriptionEn: "Lists, deliverability, segmentation, lifecycle (welcome, nurture, win-back), broadcast vs flows, revenue attribution.",
    stage: "intermediate",
    difficulty: 2,
    durationHours: 8,
    icon: "📧",
    color: "#3b82f6",
    skillsAr: ["بناء القوائم", "التقسيم", "تصميم التدفقات", "قابلية التسليم", "اختبار A/B"],
    skillsEn: ["List building", "Segmentation", "Flow design", "Deliverability", "A/B subject lines"],
    prereqs: ["copywriting"],
    finalProjectAr: "نظام إيميل لدورة الحياة (ترحيب + سلة متروكة + استعادة).",
    finalProjectEn: "Lifecycle Email System (welcome + abandoned + win-back flows).",
    modules: [
      { id: "em-m1", titleAr: "الأساسيات والقابلية للتسليم", titleEn: "Foundations & Deliverability", lessons: [
        { id: "em-l1-1", titleAr: "بناء وتنظيف القوائم", titleEn: "Building & cleaning lists" },
        { id: "em-l1-2", titleAr: "قابلية التسليم وصحة المرسل", titleEn: "Deliverability & sender health" },
      ]},
      { id: "em-m2", titleAr: "التدفقات ودورة الحياة", titleEn: "Flows & Lifecycle", lessons: [
        { id: "em-l2-1", titleAr: "تدفقات الترحيب والرعاية", titleEn: "Welcome & nurture flows" },
        { id: "em-l2-2", titleAr: "السلة المتروكة والاستعادة", titleEn: "Abandoned & win-back" },
      ]},
      { id: "em-m3", titleAr: "التحسين", titleEn: "Optimization", lessons: [
        { id: "em-l3-1", titleAr: "اختبار A/B والتقسيم", titleEn: "A/B testing & segmentation" },
        { id: "em-l3-2", titleAr: "كابستون — نظام دورة الحياة", titleEn: "Capstone — Lifecycle System" },
      ]},
    ],
  },

  // ── T8 — Meta Ads ───────────────────────────────────────────────────────
  {
    id: "meta-ads",
    order: 8,
    titleAr: "إعلانات Meta (فيسبوك/إنستغرام)",
    titleEn: "Meta Ads (Facebook/Instagram)",
    descriptionAr: "الحزمة الكاملة: Business Manager، البكسل/CAPI، هياكل الحملات (ABO/CBO)، اختبار الإبداع، الجماهير، التوسيع، والقياس.",
    descriptionEn: "Full Meta stack: Business Manager, pixel/CAPI, campaign structures (ABO/CBO), creative testing, audiences, scaling, measurement.",
    stage: "intermediate",
    difficulty: 3,
    durationHours: 12,
    icon: "📘",
    color: "#3b82f6",
    skillsAr: ["إعداد الحملات", "استراتيجية الجماهير", "اختبار الإبداع", "البكسل/CAPI", "التوسيع", "التقارير"],
    skillsEn: ["Campaign setup", "Audience strategy", "Creative testing", "Pixel/CAPI", "Scaling", "Reporting"],
    prereqs: ["marketing-foundations", "copywriting"],
    finalProjectAr: "خطة حملة Meta حية + محاكاة شراء وسائط (حسّن على مدى 7 أيام).",
    finalProjectEn: "Live Meta Campaign Plan + Media Buying Sim (optimize over 7 days).",
    featured: true,
    modules: [
      { id: "ma-m1", titleAr: "الإعداد والبنية التحتية", titleEn: "Setup & Infrastructure", lessons: [
        { id: "ma-l1-1", titleAr: "Business Manager والأصول", titleEn: "Business Manager & assets" },
        { id: "ma-l1-2", titleAr: "البكسل و Conversions API", titleEn: "Pixel & Conversions API" },
      ]},
      { id: "ma-m2", titleAr: "هيكل الحملات والجماهير", titleEn: "Campaign Structure & Audiences", lessons: [
        { id: "ma-l2-1", titleAr: "ABO مقابل CBO", titleEn: "ABO vs CBO" },
        { id: "ma-l2-2", titleAr: "الجماهير: مخصصة ومشابهة وواسعة", titleEn: "Audiences: custom, lookalike, broad" },
      ]},
      { id: "ma-m3", titleAr: "الإبداع والتوسيع", titleEn: "Creative & Scaling", lessons: [
        { id: "ma-l3-1", titleAr: "اختبار الإبداع منهجيًا", titleEn: "Systematic creative testing" },
        { id: "ma-l3-2", titleAr: "التوسيع والقراءة", titleEn: "Scaling & reading results" },
        { id: "ma-l3-3", titleAr: "كابستون — محاكاة شراء الوسائط", titleEn: "Capstone — Media Buying Sim" },
      ]},
    ],
  },

  // ── T9 — Google Ads ─────────────────────────────────────────────────────
  {
    id: "google-ads",
    order: 9,
    titleAr: "إعلانات Google (بحث/PMax/YouTube)",
    titleEn: "Google Ads (Search/PMax/YouTube)",
    descriptionAr: "البحث، Performance Max، العرض، YouTube، Shopping: أنواع المطابقة، Quality Score، استراتيجيات المزايدة، الكلمات السلبية، وتتبع التحويل.",
    descriptionEn: "Search, Performance Max, Display, YouTube, Shopping: match types, Quality Score, bidding, negatives, conversion tracking.",
    stage: "advanced",
    difficulty: 3,
    durationHours: 12,
    icon: "🔎",
    color: "#a855f7",
    skillsAr: ["بناء حملات البحث", "استراتيجية الكلمات السلبية", "المزايدة", "تتبع التحويل", "PMax"],
    skillsEn: ["Search campaign builds", "Negative keyword strategy", "Bidding", "Conversion tracking", "PMax"],
    prereqs: ["marketing-foundations"],
    finalProjectAr: "بناء حساب بحث + PMax مع خطة تتبع تحويل.",
    finalProjectEn: "Search + PMax Account Build with a conversion tracking plan.",
    modules: [
      { id: "ga-m1", titleAr: "أساسيات حملات البحث", titleEn: "Search Fundamentals", lessons: [
        { id: "ga-l1-1", titleAr: "هيكل الحساب وأنواع المطابقة", titleEn: "Account structure & match types" },
        { id: "ga-l1-2", titleAr: "Quality Score والملاءمة", titleEn: "Quality Score & relevance" },
      ]},
      { id: "ga-m2", titleAr: "المزايدة والتتبع", titleEn: "Bidding & Tracking", lessons: [
        { id: "ga-l2-1", titleAr: "استراتيجيات المزايدة", titleEn: "Bidding strategies" },
        { id: "ga-l2-2", titleAr: "تتبع التحويل", titleEn: "Conversion tracking" },
      ]},
      { id: "ga-m3", titleAr: "PMax و YouTube", titleEn: "PMax & YouTube", lessons: [
        { id: "ga-l3-1", titleAr: "حملات Performance Max", titleEn: "Performance Max campaigns" },
        { id: "ga-l3-2", titleAr: "كابستون — بناء الحساب", titleEn: "Capstone — Account Build" },
      ]},
    ],
  },

  // ── T10 — TikTok Ads ────────────────────────────────────────────────────
  {
    id: "tiktok-ads",
    order: 10,
    titleAr: "إعلانات TikTok",
    titleEn: "TikTok Ads",
    descriptionAr: "TikTok Ads Manager، Spark Ads، محتوى المبدعين، إبداعات مدفوعة بالخطاف، بكسل TikTok، وسرعة تكرار الإبداع.",
    descriptionEn: "TikTok Ads Manager, Spark Ads, creator content, hook-driven creatives, TikTok pixel, creative iteration velocity.",
    stage: "advanced",
    difficulty: 3,
    durationHours: 8,
    icon: "🎵",
    color: "#a855f7",
    skillsAr: ["إعداد حملات TikTok", "موجزات UGC", "Spark Ads", "التوسيع"],
    skillsEn: ["TikTok campaign setup", "UGC creative briefs", "Spark Ads", "Scaling"],
    prereqs: ["social-media-marketing", "meta-ads"],
    finalProjectAr: "موجز إبداع وحملة TikTok (10 خطافات + استهداف).",
    finalProjectEn: "TikTok Creative + Campaign Brief (10 hook variations + targeting).",
    modules: [
      { id: "ta-m1", titleAr: "أساسيات المنصة", titleEn: "Platform Fundamentals", lessons: [
        { id: "ta-l1-1", titleAr: "Ads Manager والبكسل", titleEn: "Ads Manager & pixel" },
        { id: "ta-l1-2", titleAr: "Spark Ads ومحتوى المبدعين", titleEn: "Spark Ads & creator content" },
      ]},
      { id: "ta-m2", titleAr: "الإبداع والتوسيع", titleEn: "Creative & Scaling", lessons: [
        { id: "ta-l2-1", titleAr: "موجزات إبداع مدفوعة بالخطاف", titleEn: "Hook-driven creative briefs" },
        { id: "ta-l2-2", titleAr: "كابستون — موجز الحملة", titleEn: "Capstone — Campaign Brief" },
      ]},
    ],
  },

  // ── T11 — Sales Funnels ─────────────────────────────────────────────────
  {
    id: "sales-funnels",
    order: 11,
    titleAr: "قمع المبيعات (Funnels)",
    titleEn: "Sales Funnels",
    descriptionAr: "العرض ← بنية القمع. المغناطيس، التريب واير، العرض الأساسي، الترقيات، VSLs، قمع الويبينار، ورياضيات القمع.",
    descriptionEn: "Offer → funnel architecture. Lead magnets, tripwires, core offers, upsells, VSLs, webinar funnels, funnel math.",
    stage: "advanced",
    difficulty: 3,
    durationHours: 10,
    icon: "🪜",
    color: "#a855f7",
    skillsAr: ["رسم القمع", "تكديس العروض", "تسلسل الصفحات", "رياضيات القمع"],
    skillsEn: ["Funnel mapping", "Offer stacking", "Page sequencing", "Funnel math"],
    prereqs: ["copywriting", "email-marketing"],
    finalProjectAr: "مخطط قمع شامل (خريطة + صفحات + إيميل + نموذج مؤشرات).",
    finalProjectEn: "End-to-End Funnel Blueprint (map + pages + email + KPI model).",
    featured: true,
    modules: [
      { id: "sf-m1", titleAr: "العروض وبنية القمع", titleEn: "Offers & Funnel Architecture", lessons: [
        { id: "sf-l1-1", titleAr: "المغناطيس والتريب واير والعرض الأساسي", titleEn: "Lead magnet, tripwire, core offer" },
        { id: "sf-l1-2", titleAr: "الترقيات و VSLs", titleEn: "Upsells & VSLs" },
      ]},
      { id: "sf-m2", titleAr: "الصفحات والتسلسل", titleEn: "Pages & Sequencing", lessons: [
        { id: "sf-l2-1", titleAr: "تسلسل صفحات القمع", titleEn: "Funnel page sequencing" },
        { id: "sf-l2-2", titleAr: "رياضيات القمع والمؤشرات", titleEn: "Funnel math & KPIs" },
      ]},
      { id: "sf-m3", titleAr: "كابستون", titleEn: "Capstone", lessons: [
        { id: "sf-l3-1", titleAr: "مخطط القمع الشامل", titleEn: "End-to-End Funnel Blueprint" },
      ]},
    ],
  },

  // ── T12 — CRO ───────────────────────────────────────────────────────────
  {
    id: "conversion-optimization",
    order: 12,
    titleAr: "تحسين معدل التحويل (CRO)",
    titleEn: "Conversion Rate Optimization",
    descriptionAr: "علم «المزيد من نفس الزيارات»: الاستدلالات، تصميم الفرضيات، اختبار A/B، الدلالة الإحصائية، روافع UX/النسخ.",
    descriptionEn: "The science of \"more from the same traffic\": heuristics, hypotheses, A/B testing, significance, UX/copy levers.",
    stage: "advanced",
    difficulty: 4,
    durationHours: 9,
    icon: "📊",
    color: "#a855f7",
    skillsAr: ["تدقيقات CRO", "كتابة الفرضيات", "تصميم التجارب", "تحليل النتائج"],
    skillsEn: ["CRO audits", "Hypothesis writing", "Experiment design", "Results analysis"],
    prereqs: ["sales-funnels"],
    finalProjectAr: "تفكيك CRO + خارطة طريق اختبار (10 تجارب مرتبة).",
    finalProjectEn: "CRO Teardown + Test Roadmap (10 prioritized experiments).",
    modules: [
      { id: "cro-m1", titleAr: "أساسيات CRO", titleEn: "CRO Foundations", lessons: [
        { id: "cro-l1-1", titleAr: "الاستدلالات ومناطق الاحتكاك", titleEn: "Heuristics & friction zones" },
        { id: "cro-l1-2", titleAr: "كتابة فرضية قوية", titleEn: "Writing a strong hypothesis" },
      ]},
      { id: "cro-m2", titleAr: "التجارب والإحصاء", titleEn: "Experiments & Statistics", lessons: [
        { id: "cro-l2-1", titleAr: "تصميم اختبار A/B", titleEn: "Designing an A/B test" },
        { id: "cro-l2-2", titleAr: "الدلالة الإحصائية والقراءة", titleEn: "Significance & reading results" },
        { id: "cro-l2-3", titleAr: "كابستون — خارطة طريق الاختبار", titleEn: "Capstone — Test Roadmap" },
      ]},
    ],
  },

  // ── T13 — Analytics & Attribution ───────────────────────────────────────
  {
    id: "analytics-attribution",
    order: 13,
    titleAr: "التحليلات والعزو",
    titleEn: "Analytics & Attribution",
    descriptionAr: "GA4، الأحداث، التحويلات، انضباط UTM، اللوحات، نماذج العزو، التتبع من جانب الخادم، واتخاذ القرار من البيانات.",
    descriptionEn: "GA4, events, conversions, UTM discipline, dashboards, attribution models, server-side tracking, data-driven decisions.",
    stage: "advanced",
    difficulty: 4,
    durationHours: 10,
    icon: "📈",
    color: "#a855f7",
    skillsAr: ["إعداد GA4", "نمذجة الأحداث/التحويلات", "اللوحات", "إجادة العزو"],
    skillsEn: ["GA4 setup", "Event/conversion modeling", "Dashboards", "Attribution literacy"],
    prereqs: ["meta-ads"],
    finalProjectAr: "خطة قياس + مواصفات لوحة GA4.",
    finalProjectEn: "Measurement Plan + GA4 Dashboard Spec.",
    modules: [
      { id: "an-m1", titleAr: "أساسيات GA4", titleEn: "GA4 Foundations", lessons: [
        { id: "an-l1-1", titleAr: "الأحداث والتحويلات", titleEn: "Events & conversions" },
        { id: "an-l1-2", titleAr: "انضباط UTM", titleEn: "UTM discipline" },
      ]},
      { id: "an-m2", titleAr: "اللوحات والعزو", titleEn: "Dashboards & Attribution", lessons: [
        { id: "an-l2-1", titleAr: "بناء اللوحات", titleEn: "Building dashboards" },
        { id: "an-l2-2", titleAr: "نماذج العزو", titleEn: "Attribution models" },
        { id: "an-l2-3", titleAr: "كابستون — خطة القياس", titleEn: "Capstone — Measurement Plan" },
      ]},
    ],
  },

  // ── T14 — Marketing Automation ──────────────────────────────────────────
  {
    id: "marketing-automation",
    order: 14,
    titleAr: "أتمتة التسويق",
    titleEn: "Marketing Automation",
    descriptionAr: "CRM، إدارة العملاء المحتملين، أتمتة دورة الحياة، والتنسيق بدون كود مع n8n/Make/Zapier، بالإضافة إلى WhatsApp و Telegram.",
    descriptionEn: "CRM, lead management, lifecycle automation, no-code orchestration with n8n/Make/Zapier, plus WhatsApp & Telegram.",
    stage: "advanced",
    difficulty: 4,
    durationHours: 14,
    icon: "⚙️",
    color: "#a855f7",
    skillsAr: ["عمليات CRM", "تسجيل العملاء المحتملين", "الأتمتة متعددة الأدوات", "Webhooks/APIs", "تدفقات البوت"],
    skillsEn: ["CRM ops", "Lead scoring", "Multi-tool automation", "Webhook/API basics", "Chatbot flows"],
    prereqs: ["email-marketing", "sales-funnels"],
    finalProjectAr: "آلة العميل المحتمل ← العميل (التقاط ← تسجيل ← رعاية ← تنبيه المبيعات ← تقرير).",
    finalProjectEn: "Automated Lead-to-Customer Machine (capture → score → nurture → sales alert → report).",
    featured: true,
    modules: [
      { id: "au-m1", titleAr: "CRM وإدارة العملاء المحتملين", titleEn: "CRM & Lead Management", lessons: [
        { id: "au-l1-1", titleAr: "أساسيات CRM", titleEn: "CRM foundations" },
        { id: "au-l1-2", titleAr: "تسجيل وتوجيه العملاء المحتملين", titleEn: "Lead scoring & routing" },
      ]},
      { id: "au-m2", titleAr: "أتمتة الإيميل والرسائل", titleEn: "Email & Messaging Automation", lessons: [
        { id: "au-l2-1", titleAr: "أتمتة الإيميل لدورة الحياة", titleEn: "Email lifecycle automation" },
        { id: "au-l2-2", titleAr: "أتمتة WhatsApp", titleEn: "WhatsApp automation" },
        { id: "au-l2-3", titleAr: "أتمتة Telegram", titleEn: "Telegram automation" },
      ]},
      { id: "au-m3", titleAr: "التنسيق بدون كود", titleEn: "No-Code Orchestration", lessons: [
        { id: "au-l3-1", titleAr: "n8n: التدفقات والـ webhooks", titleEn: "n8n: workflows & webhooks" },
        { id: "au-l3-2", titleAr: "Make و Zapier", titleEn: "Make & Zapier" },
        { id: "au-l3-3", titleAr: "كابستون — آلة العميل المحتمل ← العميل", titleEn: "Capstone — Lead-to-Customer Machine" },
      ]},
    ],
  },

  // ── T15 — AI Marketing ──────────────────────────────────────────────────
  {
    id: "ai-marketing",
    order: 15,
    titleAr: "التسويق بالذكاء الاصطناعي",
    titleEn: "AI Marketing",
    descriptionAr: "استخدم الـ AI عبر سير عمل التسويق كله: البحث، الاستراتيجية، النسخ، المحتوى، الإبداع، التحليل، وأنظمة البرومبت الموثوقة.",
    descriptionEn: "Use AI across the whole marketing workflow: research, strategy, copy, content, creative, analysis, and reliable prompt systems.",
    stage: "expert",
    difficulty: 4,
    durationHours: 12,
    icon: "🤖",
    color: "#ec4899",
    skillsAr: ["هندسة البرومبت للتسويق", "خطوط أنابيب المحتوى/الإبداع بالـ AI", "التحليل بالـ AI", "الحواجز"],
    skillsEn: ["Prompt engineering for marketing", "AI content/creative pipelines", "AI analysis", "Guardrails"],
    prereqs: ["copywriting", "content-marketing"],
    finalProjectAr: "حزمة سير عمل تسويق بالـ AI (بحث + نسخ + محتوى + نظام برومبت تحليل).",
    finalProjectEn: "AI Marketing Workflow Pack (research + copy + content + analysis prompt system).",
    featured: true,
    modules: [
      { id: "aim-m1", titleAr: "هندسة البرومبت للتسويق", titleEn: "Prompt Engineering for Marketing", lessons: [
        { id: "aim-l1-1", titleAr: "أنظمة البرومبت الموثوقة", titleEn: "Reliable prompt systems" },
        { id: "aim-l1-2", titleAr: "السياق والصوت والحواجز", titleEn: "Context, voice & guardrails" },
      ]},
      { id: "aim-m2", titleAr: "خطوط الإنتاج بالـ AI", titleEn: "AI Production Pipelines", lessons: [
        { id: "aim-l2-1", titleAr: "النسخ والمحتوى بالـ AI", titleEn: "AI copy & content" },
        { id: "aim-l2-2", titleAr: "الإبداع البصري بالـ AI", titleEn: "AI visual creative" },
      ]},
      { id: "aim-m3", titleAr: "التحليل والكابستون", titleEn: "Analysis & Capstone", lessons: [
        { id: "aim-l3-1", titleAr: "تحليل الأداء بالـ AI", titleEn: "AI performance analysis" },
        { id: "aim-l3-2", titleAr: "كابستون — حزمة سير العمل", titleEn: "Capstone — Workflow Pack" },
      ]},
    ],
  },

  // ── T16 — MCP Marketing Systems (flagship, topic depth) ─────────────────
  {
    id: "mcp-marketing-systems",
    order: 16,
    titleAr: "أنظمة التسويق بالـ MCP",
    titleEn: "MCP Marketing Systems",
    descriptionAr:
      "ابنِ أنظمة تسويق وكيلة بـ Model Context Protocol: أساسيات MCP، استدعاء الأدوات، بناء خادم MCP، وربط الوكلاء بـ Meta و Google Ads و GA4 ومولدات المحتوى والتقارير.",
    descriptionEn:
      "Build agentic marketing systems with the Model Context Protocol: MCP fundamentals, tool-calling, building an MCP server, and connecting agents to Meta, Google Ads, GA4, content generators, and reporting.",
    stage: "expert",
    difficulty: 5,
    durationHours: 16,
    icon: "🧩",
    color: "#ec4899",
    skillsAr: ["بنية MCP", "استدعاء الأدوات/الدوال", "بناء مساعدي التسويق", "تنسيق الوكلاء", "الأمان/المراقبة"],
    skillsEn: ["MCP architecture", "Tool/function calling", "Building marketing assistants", "Agent orchestration", "Safety/observability"],
    prereqs: ["marketing-automation", "ai-marketing"],
    finalProjectAr: "كابستون — وكيل تسويق ذاتي (MCP) يسحب بيانات الإعلانات، يقترح التحسينات، يولّد المحتوى، وينتج تقريرًا أسبوعيًا.",
    finalProjectEn: "Capstone — Autonomous Marketing Agent (MCP) that pulls ad data, proposes optimizations, generates content, and produces a weekly report.",
    featured: true,
    modules: [
      {
        id: "mcp-m1",
        titleAr: "أساسيات التسويق الوكيلي",
        titleEn: "Agentic Marketing Foundations",
        lessons: [
          { id: "mcp-l1-1", titleAr: "ما هو وكيل الـ AI (مقابل البوت)", titleEn: "What is an AI agent (vs a chatbot)", estMinutes: 25,
            topics: [
              { id: "mcp-t1", titleAr: "الإدراك ← التخطيط ← الفعل", titleEn: "Perceive → plan → act" },
              { id: "mcp-t2", titleAr: "حلقات الوكيل", titleEn: "Agent loops" },
            ] },
          { id: "mcp-l1-2", titleAr: "استدعاء الأدوات ومخططات الدوال", titleEn: "Tool calling & function schemas", estMinutes: 30,
            topics: [
              { id: "mcp-t3", titleAr: "تعريف الأداة", titleEn: "Defining a tool" },
              { id: "mcp-t4", titleAr: "مخططات JSON للمعاملات", titleEn: "JSON schemas for parameters" },
            ] },
          { id: "mcp-l1-3", titleAr: "النموذج الذهني لـ MCP", titleEn: "The MCP mental model", estMinutes: 30,
            topics: [
              { id: "mcp-t5", titleAr: "العملاء والخوادم والأدوات والموارد", titleEn: "Clients, servers, tools, resources" },
            ] },
        ],
      },
      {
        id: "mcp-m2",
        titleAr: "أساسيات MCP",
        titleEn: "MCP Fundamentals",
        lessons: [
          { id: "mcp-l2-1", titleAr: "تشريح خادم MCP", titleEn: "Anatomy of an MCP server", estMinutes: 35 },
          { id: "mcp-l2-2", titleAr: "كشف الأدوات والموارد والبرومبتات", titleEn: "Exposing tools, resources, prompts", estMinutes: 30 },
          { id: "mcp-l2-3", titleAr: "النقل والمصادقة والأمان", titleEn: "Transport, auth, and safety", estMinutes: 30 },
        ],
      },
      {
        id: "mcp-m3",
        titleAr: "بناء أدوات التسويق",
        titleEn: "Building Marketing Tools",
        lessons: [
          { id: "mcp-l3-1", titleAr: "أداة get_ad_performance", titleEn: "A get_ad_performance tool", estMinutes: 35 },
          { id: "mcp-l3-2", titleAr: "أداة generate_ad_copy", titleEn: "A generate_ad_copy tool", estMinutes: 30 },
          { id: "mcp-l3-3", titleAr: "أداة create_report", titleEn: "A create_report tool", estMinutes: 30 },
        ],
      },
      {
        id: "mcp-m4",
        titleAr: "تكاملات المنصات (MCP)",
        titleEn: "Platform Integrations (MCP)",
        lessons: [
          { id: "mcp-l4-1", titleAr: "تكامل Meta Ads MCP", titleEn: "Meta Ads MCP integration", estMinutes: 40 },
          { id: "mcp-l4-2", titleAr: "تكامل Google Ads MCP", titleEn: "Google Ads MCP integration", estMinutes: 40 },
          { id: "mcp-l4-3", titleAr: "تكامل التحليلات (GA4) MCP", titleEn: "Analytics (GA4) MCP integration", estMinutes: 35 },
        ],
      },
      {
        id: "mcp-m5",
        titleAr: "التنسيق والموثوقية",
        titleEn: "Orchestration & Reliability",
        lessons: [
          { id: "mcp-l5-1", titleAr: "حلقات وكيل متعددة الأدوات", titleEn: "Multi-tool agent loops", estMinutes: 30 },
          { id: "mcp-l5-2", titleAr: "الحواجز والموافقات والإنسان في الحلقة", titleEn: "Guardrails, approvals, human-in-the-loop", estMinutes: 30 },
          { id: "mcp-l5-3", titleAr: "المراقبة والتقييمات", titleEn: "Observability & evals", estMinutes: 30 },
        ],
      },
      {
        id: "mcp-m6",
        titleAr: "كابستون — وكيل التسويق الذاتي",
        titleEn: "Capstone — Autonomous Marketing Agent",
        lessons: [
          { id: "mcp-l6-1", titleAr: "اشحن الوكيل + سجّل عرضًا توضيحيًا", titleEn: "Ship the agent + record a demo", estMinutes: 90 },
        ],
      },
    ],
  },
];

export function getTrackById(id: string): MarketingTrack | undefined {
  return marketingTracks.find((t) => t.id === id);
}
