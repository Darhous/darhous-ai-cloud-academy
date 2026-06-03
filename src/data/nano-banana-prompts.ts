export type NanaBananaDifficulty = "beginner" | "intermediate" | "advanced";
export type NanaBananaCategory =
  | "portrait"
  | "art"
  | "product"
  | "social"
  | "fun"
  | "professional";

export interface NanaBananaPrompt {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: NanaBananaCategory;
  categoryLabelAr: string;
  categoryLabelEn: string;
  difficulty: NanaBananaDifficulty;
  bestInputAr: string;
  bestInputEn: string;
  promptAr: string;
  promptEn: string;
  accent: string;
  gradient: string;
  emoji: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

export const nanaBananaPrompts: NanaBananaPrompt[] = [
  {
    id: "3d-collectible-figurine",
    titleAr: "تمثال Collectible ثلاثي الأبعاد",
    titleEn: "3D Collectible Figurine",
    descriptionAr: "حوّل صورتك إلى تمثال بلاستيكي قابل للتحصيل بأسلوب ألعاب الفن الحديثة.",
    descriptionEn: "Transform your photo into a premium plastic collectible figurine with modern toy-art aesthetics.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تمثالاً بلاستيكياً ثلاثي الأبعاد بأسلوب Collectible Toy Art.
الأسلوب: تمثال بلاستيكي لامع عالي التفاصيل، ألوان حيوية، إضاءة استوديو متخصصة.
التركيب: التمثال على قاعدة زجاجية شفافة، خلفية بيضاء أو رمادية فاتحة.
الإضاءة: إضاءة ناعمة من الأعلى مع انعكاسات على السطح اللامع.
جودة: 8K، تصوير منتج احترافي، تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة بالتمثال.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-gloss 3D plastic collectible figurine in the style of designer toy art.
Style: Premium vinyl figurine, vibrant colors, studio-grade lighting with surface reflections.
Composition: Figurine on a clear acrylic base, clean white or light gray background.
Lighting: Soft overhead light with specular highlights on the plastic surface.
Quality: 8K, professional product photography, hyper-detailed rendering.
Do not add any unrelated text or elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "🏆",
    tags: ["3D", "Collectible", "Toy", "Figurine"],
    featured: true,
  },
  {
    id: "action-figure-box",
    titleAr: "علبة Action Figure",
    titleEn: "Action Figure Box",
    descriptionAr: "حوّل نفسك إلى شخصية أكشن داخل علبة لعبة أصلية بتصميم احترافي.",
    descriptionEn: "Turn yourself into an action figure packaged in a branded toy box.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة كاملة للجسم أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Action Figure داخل علبة لعبة مُصممة احترافياً.
الأسلوب: علبة لعبة بلاستيكية تجارية، نافذة شفافة تُظهر الشخصية، خلفية وإطار ملون.
التفاصيل: اكتب على العلبة "Limited Edition" واسم يعكس هوية الشخص العامة.
الجودة: صورة منتج احترافية، إضاءة استوديو، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an action figure packaged inside a professional toy box.
Style: Retail plastic toy box with blister packaging, transparent window showing the figure, colorful graphic background.
Details: "Limited Edition" label, bold title reflecting the subject's general persona.
Quality: Professional product shot, studio lighting, 4K render.`,
    accent: "#3b82f6",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "📦",
    tags: ["Action Figure", "Toy Box", "Packaging"],
    featured: true,
  },
  {
    id: "cinematic-portrait",
    titleAr: "بورتريه سينمائي احترافي",
    titleEn: "Cinematic Profile Portrait",
    descriptionAr: "تحويل صورتك إلى لقطة سينمائية بأسلوب أفلام هوليوود.",
    descriptionEn: "Transform your photo into a dramatic Hollywood-style cinematic portrait.",
    category: "portrait",
    categoryLabelAr: "بورتريه",
    categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه في إضاءة جيدة",
    bestInputEn: "Clear face photo with decent lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي بأسلوب هوليوود مع إضاءة دراماتيكية.
الأسلوب: Cinematic portrait، لون فيلم "teal and orange"، عمق ميدان ضيق.
الإضاءة: Rembrandt lighting، ظلال ناعمة، تدرج لوني عميق.
الخلفية: بوكيه متناسق، ألوان داكنة دافئة.
الجودة: 8K، Canon EF 85mm f/1.4، RAW processing.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dramatic cinematic portrait in Hollywood style.
Style: Cinematic color grade with teal-and-orange LUT, shallow depth of field.
Lighting: Rembrandt lighting pattern, soft gradients, deep tonal contrast.
Background: Consistent bokeh, warm dark tones.
Quality: 8K, Canon EF 85mm f/1.4 equivalent, cinematic RAW processing.`,
    accent: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(251,113,133,0.06) 100%)",
    emoji: "🎬",
    tags: ["Cinematic", "Portrait", "Hollywood", "Color Grade"],
    featured: true,
  },
  {
    id: "luxury-magazine-cover",
    titleAr: "غلاف مجلة فاخر",
    titleEn: "Luxury Magazine Cover",
    descriptionAr: "اجعل صورتك غلاف مجلة فاخرة بتصميم احترافي عالي المستوى.",
    descriptionEn: "Turn your photo into a premium luxury magazine cover.",
    category: "professional",
    categoryLabelAr: "احترافي",
    categoryLabelEn: "Professional",
    difficulty: "intermediate",
    bestInputAr: "صورة نصف الجسم أو الوجه في إضاءة جيدة",
    bestInputEn: "Upper-body or face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف مجلة راقية وفاخرة.
التصميم: غلاف مجلة احترافي بنمط Vogue/Forbes، خطوط عناوين أنيقة، شعار مجلة وهمي.
الألوان: ذهبي، كريمي، أبيض وأسود أنيق.
الإضاءة: High-key lighting، إضاءة استوديو بيضاء ناعمة.
النص: عناوين عامة وهمية (لا تستخدم أسماء حقيقية).
الجودة: Print-ready، 300dpi، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a luxury premium magazine cover.
Design: Professional magazine cover in Vogue/Forbes style, elegant headline typography, fictional magazine logo.
Colors: Gold, cream, clean black and white elegance.
Lighting: High-key studio lighting, soft white fill.
Text: Generic placeholder headlines (no real names or brands).
Quality: Print-ready, 300dpi, 4K.`,
    accent: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(245,158,11,0.06) 100%)",
    emoji: "📔",
    tags: ["Magazine", "Luxury", "Cover", "Vogue Style"],
  },
  {
    id: "cyberpunk-city-poster",
    titleAr: "بوستر مدينة سايبربانك",
    titleEn: "Cyberpunk City Poster",
    descriptionAr: "ضع صورتك في عالم مستقبلي نيوني مع مدينة سايبربانك.",
    descriptionEn: "Place yourself in a neon-lit futuristic cyberpunk cityscape.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للشخص، يُفضل الجسم كاملاً",
    bestInputEn: "Clear person photo, full body preferred",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر Cyberpunk مستقبلي لمدينة نيونية.
الأسلوب: Cyberpunk 2077 aesthetic، مدينة مستقبلية، إضاءة نيون زرقاء وبنفسجية وبنزهرية.
البيئة: أبراج زجاجية، لافتات نيون، أمطار على الأرض.
الشخصية: مدمجة في المشهد كبطل في عالم مستقبلي.
الجودة: Movie poster quality، 4K، تصميم تشويقي.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic cyberpunk city poster.
Style: Cyberpunk 2077 aesthetic with neon-lit urban environment, blue/purple/magenta glow.
Environment: Glass skyscrapers, neon signs, rain-soaked reflective streets.
Character: Integrated into the scene as a hero in a dystopian future world.
Quality: Movie poster quality, 4K, dramatic composition.`,
    accent: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.08) 100%)",
    emoji: "🌆",
    tags: ["Cyberpunk", "Neon", "Futuristic", "City Poster"],
    featured: true,
  },
  {
    id: "vintage-90s-film",
    titleAr: "فيلم كلاسيكي التسعينات",
    titleEn: "Vintage 90s Film Look",
    descriptionAr: "أعد صورتك إلى جماليات الفيلم الكلاسيكي في التسعينات.",
    descriptionEn: "Give your photo a nostalgic analog film look from the 90s.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
طبّق أسلوب فيلم التسعينات الكلاسيكي الأنالوجي.
الأسلوب: Film grain، ألوان دافئة مُشبعة، grain texture واضح.
التلوين: Faded highlights، lifted shadows، Kodak Gold color palette.
الإطار: Soft vignette على الأطراف.
الإضاءة: ضوء طبيعي دافئ، Golden hour feeling.
الجودة: صورة فيلم 35mm محاكاة، تأثير authentic analog.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Apply a nostalgic 90s analog film aesthetic.
Style: Film grain texture, warm saturated tones, visible grain.
Color: Faded highlights, lifted shadows, Kodak Gold color palette.
Frame: Soft vignette around edges.
Lighting: Warm natural light, golden hour feeling.
Quality: 35mm film simulation, authentic analog look.`,
    accent: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(251,191,36,0.06) 100%)",
    emoji: "📸",
    tags: ["Vintage", "90s", "Film", "Analog", "Nostalgic"],
  },
  {
    id: "polaroid-memory-wall",
    titleAr: "جدار الذكريات بولارويد",
    titleEn: "Polaroid Memory Wall",
    descriptionAr: "حوّل صورتك إلى مجموعة صور بولارويد على لوح فليني.",
    descriptionEn: "Create a charming Polaroid memory wall collage from your photo.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة واحدة واضحة أو أكثر",
    bestInputEn: "One or more clear photos",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مجموعة صور بولارويد كلاسيكية على جدار خشبي دافئ.
الأسلوب: صور بولارويد حقيقية المظهر، يد مكتوبة فارغة بالأسفل، دبابيس خشبية.
الترتيب: 4-6 صور مُرتبة بشكل طبيعي وغير متناظر.
الخلفية: جدار خشبي دافئ أو لوح فليني.
الإضاءة: ضوء طبيعي دافئ من نافذة جانبية.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a charming Polaroid photo wall collage.
Style: Authentic-looking Polaroid prints with handwritten caption space, wooden pins.
Layout: 4-6 photos arranged naturally and asymmetrically.
Background: Warm wooden wall or cork board.
Lighting: Warm natural window light.`,
    accent: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(52,211,153,0.06) 100%)",
    emoji: "🖼️",
    tags: ["Polaroid", "Memory", "Collage", "Vintage"],
  },
  {
    id: "linkedin-headshot",
    titleAr: "صورة LinkedIn الاحترافية",
    titleEn: "Professional LinkedIn Headshot",
    descriptionAr: "احصل على صورة بروفايل احترافية بجودة استوديو لـ LinkedIn.",
    descriptionEn: "Get a studio-quality professional headshot perfect for LinkedIn.",
    category: "professional",
    categoryLabelAr: "احترافي",
    categoryLabelEn: "Professional",
    difficulty: "beginner",
    bestInputAr: "صورة للوجه في أي إضاءة",
    bestInputEn: "Face photo in any lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة بروفايل احترافية لـ LinkedIn.
الأسلوب: Headshot استوديو احترافي، خلفية رمادية/بيضاء ناعمة.
الإضاءة: Three-point studio lighting، ناعمة ومتوازنة.
الزاوية: أمامية أو نصف الجسم، تعبير واثق وودود.
الملابس: محترفة وأنيقة (إذا كانت ظاهرة).
الجودة: LinkedIn profile quality، 4K، حواف حادة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional LinkedIn profile headshot.
Style: Corporate studio headshot, clean gray or white background.
Lighting: Three-point studio lighting, soft and balanced.
Angle: Front-facing or half-body, confident and approachable expression.
Attire: Professional and polished (if visible).
Quality: LinkedIn-ready, 4K, sharp edges.`,
    accent: "#0a66c2",
    gradient: "linear-gradient(135deg, rgba(10,102,194,0.18) 0%, rgba(56,189,248,0.06) 100%)",
    emoji: "💼",
    tags: ["LinkedIn", "Headshot", "Professional", "Corporate"],
  },
  {
    id: "ai-product-ad",
    titleAr: "إعلان منتج AI احترافي",
    titleEn: "AI Product Advertisement",
    descriptionAr: "ضع صورتك في إعلان منتج تقني لامع ومبهر.",
    descriptionEn: "Feature yourself in a sleek tech product advertisement.",
    category: "product",
    categoryLabelAr: "منتج",
    categoryLabelEn: "Product",
    difficulty: "advanced",
    bestInputAr: "صورة نصف الجسم أو كاملة",
    bestInputEn: "Half-body or full photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ إعلان منتج تقني احترافي بأسلوب Apple/Google.
الأسلوب: إعلان منتج عالي التقنية، خلفية داكنة مُدرجة، عناصر UI/UX خلف الشخص.
العناصر: شاشات تقنية floating، أيقونات AI، خطوط نيون.
الإضاءة: Rim light أزرق/بنفسجي من الخلف، Key light أمامي.
النص: "Powered by AI" أو عبارة عامة فقط.
الجودة: Commercial ad quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sleek tech product advertisement in Apple/Google style.
Style: High-tech product ad, dark gradient background, floating UI/UX elements.
Elements: Floating screens, AI icons, neon accent lines.
Lighting: Blue/violet rim light from behind, soft key light in front.
Text: Only generic text like "Powered by AI".
Quality: Commercial ad quality, 4K.`,
    accent: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 100%)",
    emoji: "📱",
    tags: ["Advertisement", "Tech", "AI", "Product"],
  },
  {
    id: "phone-wallpaper-poster",
    titleAr: "بوستر خلفية الجوال",
    titleEn: "Phone Wallpaper Poster",
    descriptionAr: "حوّل صورتك إلى بوستر فني جاهز لاستخدامه خلفية للجوال.",
    descriptionEn: "Transform your photo into a stunning phone wallpaper-ready poster.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر فني بنسبة أبعاد 9:16 مثالي كخلفية جوال.
الأسلوب: خلفية جوال فنية عصرية، تدرج لوني جميل، عناصر فنية طائفة.
التكوين: الشخص في المركز أو الثلث السفلي، مساحة للنص في الأعلى.
الألوان: تدرج بنفسجي/أزرق/أسود أو اختار ألوانًا تناسب الصورة.
الجودة: 4K portrait، مُحسّن للشاشات الحديثة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic poster in 9:16 ratio perfect as a phone wallpaper.
Style: Modern artistic phone wallpaper, beautiful color gradient, floating artistic elements.
Composition: Subject centered or in lower third, space for text at top.
Colors: Purple/blue/black gradient or colors matching the subject's aesthetic.
Quality: 4K portrait orientation, optimized for modern displays.`,
    accent: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.08) 100%)",
    emoji: "📲",
    tags: ["Wallpaper", "Phone", "Poster", "Vertical"],
  },
  {
    id: "miniature-diorama",
    titleAr: "مشهد ديوراما مصغّر",
    titleEn: "Miniature Diorama Scene",
    descriptionAr: "ضع صورتك في عالم ديوراما مصغّر مبهر ومثير للخيال.",
    descriptionEn: "Place yourself in a charming miniature diorama world.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة كاملة أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهد ديوراما مصغّر جميل.
الأسلوب: Tilt-shift miniature effect، عالم صغير مُفصّل، ألوان حيوية.
البيئة: مشهد مدني أو طبيعي مصغّر، أشخاص صغار، مبانٍ مُصغّرة.
التركيب: الشخص يبدو عملاقًا في عالم صغير، عمق ميدان واضح.
الجودة: Tilt-shift photography simulation، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a charming miniature diorama scene.
Style: Tilt-shift miniature effect, detailed tiny world, vivid colors.
Environment: Miniature urban or nature scene with tiny people and buildings.
Composition: Subject appears giant in a miniature world, clear depth of field.
Quality: Tilt-shift photography simulation, 4K.`,
    accent: "#22c55e",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(16,185,129,0.06) 100%)",
    emoji: "🌍",
    tags: ["Miniature", "Diorama", "Tilt-Shift", "Tiny World"],
  },
  {
    id: "sticker-pack-style",
    titleAr: "أسلوب ملصقات Sticker Pack",
    titleEn: "Sticker Pack Style",
    descriptionAr: "حوّل صورتك إلى شخصية ملصقات رقمية بأسلوب كرتوني.",
    descriptionEn: "Turn your photo into cute digital sticker characters.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه",
    bestInputEn: "Face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مجموعة ملصقات رقمية كرتونية.
الأسلوب: Cartoon sticker style، خطوط خارجية سميكة بيضاء، ألوان حيوية مُشبعة.
التعبيرات: 6 ملصقات مختلفة تعبر عن مشاعر مختلفة.
الخلفية: شفافة أو بيضاء نقية.
الجودة: Vector-like quality، clean edges، 4K PNG style.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a digital cartoon sticker pack.
Style: Cute cartoon sticker style, bold white outline, vivid saturated colors.
Expressions: 6 stickers showing different emotions.
Background: Transparent or pure white.
Quality: Vector-like quality, clean edges, 4K PNG style.`,
    accent: "#f472b6",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "🎨",
    tags: ["Sticker", "Cartoon", "Emoji", "Fun"],
  },
  {
    id: "sports-trading-card",
    titleAr: "بطاقة رياضية Trading Card",
    titleEn: "Sports Trading Card",
    descriptionAr: "صوّر نفسك كبطل رياضي على بطاقة جمع رياضية احترافية.",
    descriptionEn: "Feature yourself as a champion on a professional sports trading card.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "intermediate",
    bestInputAr: "صورة كاملة للجسم أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة رياضية Trading Card احترافية.
التصميم: إطار بطاقة رياضية احترافية، خلفية حيوية مع نمط هندسي، إحصاءات وهمية عامة.
الألوان: ذهبي، أحمر، أزرق أو ألوان تناسب الشخص.
النص: وضع تسمية عامة وهمية (مثل "MVP Player").
الجودة: Collector card print quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional sports trading card.
Design: Professional sports card frame, dynamic background with geometric pattern, fictional generic stats.
Colors: Gold, red, blue or colors matching the subject.
Text: Generic placeholder label (e.g., "MVP Player").
Quality: Collector card print quality, 4K.`,
    accent: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "🏅",
    tags: ["Sports Card", "Trading Card", "MVP", "Collector"],
  },
  {
    id: "travel-postcard",
    titleAr: "بطاقة سفر Postcard",
    titleEn: "Travel Postcard",
    descriptionAr: "أنشئ بطاقة بريدية سياحية جميلة من صورتك.",
    descriptionEn: "Create a beautiful travel postcard from your photo.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة مع أو بدون شخص",
    bestInputEn: "Any photo with or without a person",
    promptAr: `استخدم الصورة المرفقة كمرجع أساسي.
أنشئ بطاقة بريدية سياحية كلاسيكية.
التصميم: إطار بطاقة بريدية كلاسيكية، خط كتابة جميل، طوابع وهمية.
الأسلوب: Vintage travel postcard، ألوان دافئة.
النص: عنوان وجهة عامة وهمي فقط، لا تستخدم أسماء حقيقية.
الجودة: Print-quality postcard، 4K.`,
    promptEn: `Use the uploaded image as the primary reference.
Create a classic travel postcard.
Design: Classic postcard frame, elegant handwriting font, fictional stamps.
Style: Vintage travel postcard aesthetic, warm tones.
Text: Generic fictional destination name only, no real place names required.
Quality: Print-quality postcard, 4K.`,
    accent: "#84cc16",
    gradient: "linear-gradient(135deg, rgba(132,204,22,0.18) 0%, rgba(34,197,94,0.06) 100%)",
    emoji: "✈️",
    tags: ["Postcard", "Travel", "Vintage", "Tourism"],
  },
  {
    id: "double-exposure",
    titleAr: "التعرض المزدوج Surreal",
    titleEn: "Surreal Double Exposure",
    descriptionAr: "دمج صورتك مع مناظر طبيعية أو معمارية في أسلوب فني مذهل.",
    descriptionEn: "Blend your photo with landscapes in a stunning artistic double exposure.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو الجسم",
    bestInputEn: "Clear face or body silhouette",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تأثير التعرض المزدوج الفني.
الأسلوب: Double exposure photography art، دمج الشخص مع منظر طبيعي (غابة، سماء، مدينة).
التلوين: أبيض وأسود مع لمسات لون واحد (أزرق أو ذهبي).
التركيب: صورة الشخص كإطار للمنظر الداخلي.
الجودة: Fine art photography, 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a surreal double exposure photography effect.
Style: Double exposure art blending the person with a landscape (forest, sky, city).
Color: Black and white with a single accent color (blue or gold).
Composition: Subject's silhouette framing the interior landscape.
Quality: Fine art photography, 8K.`,
    accent: "#3ce0fb",
    gradient: "linear-gradient(135deg, rgba(60,224,251,0.2) 0%, rgba(99,102,241,0.06) 100%)",
    emoji: "🌌",
    tags: ["Double Exposure", "Surreal", "Fine Art", "Silhouette"],
    featured: true,
  },
  {
    id: "neon-music-cover",
    titleAr: "غلاف موسيقى نيوني",
    titleEn: "Neon Music Cover Art",
    descriptionAr: "أنشئ غلاف ألبوم موسيقي نيوني لامع بأسلوب عصري مثير.",
    descriptionEn: "Create a neon-glowing music album cover in a bold modern style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف ألبوم موسيقي نيوني.
الأسلوب: Music album cover art، نيون glow، خلفية داكنة مُتدرجة.
الألوان: Neon pink/purple/cyan على خلفية سوداء عميقة.
العناصر: تأثيرات نيون، موجات صوت خلفية، إضاءة ريم نيونية.
النص: فارغ أو "Artist Name" عامة فقط.
الجودة: Streaming platform cover, 4K square format.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a neon music album cover.
Style: Music album cover art, neon glow effects, dark gradient background.
Colors: Neon pink/purple/cyan on deep black background.
Elements: Neon effects, sound wave patterns in background, neon rim lighting.
Text: Leave blank or generic "Artist Name" placeholder only.
Quality: Streaming platform ready, 4K square format.`,
    accent: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(139,92,246,0.08) 100%)",
    emoji: "🎵",
    tags: ["Music Cover", "Album Art", "Neon", "Glow"],
  },
  {
    id: "arabic-calligraphy-poster",
    titleAr: "بوستر خط عربي فني",
    titleEn: "Arabic Calligraphy Poster",
    descriptionAr: "دمج صورتك مع فن الخط العربي في تصميم بوستر راقٍ.",
    descriptionEn: "Blend your photo with Arabic calligraphy in an elegant poster design.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر فني يجمع الصورة مع فن الخط العربي.
الأسلوب: فن خط عربي كلاسيكي، زخارف إسلامية، ألوان ذهبية وعاجية.
التكوين: الصورة كخلفية ناعمة، فوقها خط عربي جميل بعبارة إيجابية عامة.
الألوان: ذهبي، بورجندي، أزرق فاخر.
الجودة: Print-quality art poster, 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic poster blending the photo with Arabic calligraphy.
Style: Classic Arabic calligraphy art, geometric Islamic patterns, gold and ivory tones.
Composition: Photo as soft background, beautiful Arabic calligraphy overlaid with a general positive phrase.
Colors: Gold, burgundy, deep blue.
Quality: Print-quality art poster, 4K.`,
    accent: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.08) 100%)",
    emoji: "✍️",
    tags: ["Arabic", "Calligraphy", "Islamic Art", "Poster"],
  },
  {
    id: "youtube-thumbnail",
    titleAr: "تصميم مصغرة YouTube",
    titleEn: "YouTube Thumbnail Style",
    descriptionAr: "أنشئ تصميم مصغرة YouTube مبهر يضمن أعلى نسبة نقر.",
    descriptionEn: "Create a high-CTR YouTube thumbnail that demands attention.",
    category: "social",
    categoryLabelAr: "سوشيال ميديا",
    categoryLabelEn: "Social Media",
    difficulty: "beginner",
    bestInputAr: "صورة نصف الجسم مع تعبير واضح",
    bestInputEn: "Half-body photo with expressive face",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مصغّرة YouTube مبهرة وعالية النقرات.
الأسلوب: YouTube thumbnail احترافي، خلفية حيوية، تعبيرات مبالغ بها تعبيريًا.
العناصر: خلفية ملونة حيوية، نصوص عريضة لامعة عامة، سهم أو عناصر تشويقية.
الألوان: أصفر/أحمر/أزرق ساطع.
الجودة: 1280x720 HD quality، print-sharp.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-CTR YouTube thumbnail.
Style: Professional YouTube thumbnail, dynamic background, exaggerated expressive reaction.
Elements: Vivid background, bold glowing text placeholders, arrows or attention elements.
Colors: Bright yellow/red/blue.
Quality: 1280x720 HD quality, print-sharp.`,
    accent: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "▶️",
    tags: ["YouTube", "Thumbnail", "Content Creator", "CTR"],
    featured: true,
  },
  {
    id: "futuristic-id-card",
    titleAr: "بطاقة هوية مستقبلية",
    titleEn: "Futuristic ID Card Mockup",
    descriptionAr: "أنشئ بطاقة هوية خيالية مستقبلية بأسلوب سايبربانك.",
    descriptionEn: "Create a fictional sci-fi futuristic ID card in cyberpunk style.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه واضحة",
    bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة هوية خيالية مستقبلية.
التصميم: بطاقة هوية رقمية مستقبلية، هولوجرام، شريط بيانات مُشفّر.
الأسلوب: Cyberpunk ID card، ألوان زرقاء/سيان، رموز رقمية.
البيانات: معلومات خيالية عامة (رقم عشوائي، رتبة خيالية).
الجودة: High-detail graphic design, 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fictional futuristic ID card.
Design: Digital future identity card with hologram effects, encrypted data strip.
Style: Cyberpunk ID card, blue/cyan color scheme, digital code patterns.
Data: All fictional generic data (random number, fictional rank).
Quality: High-detail graphic design, 4K.`,
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🪪",
    tags: ["ID Card", "Futuristic", "Sci-Fi", "Hologram"],
  },
  {
    id: "toy-packaging",
    titleAr: "علبة لعبة Toy Packaging",
    titleEn: "Toy Packaging Mockup",
    descriptionAr: "صمّم علبة لعبة احترافية تحتوي على شخصيتك.",
    descriptionEn: "Design a professional toy packaging box featuring your likeness.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "intermediate",
    bestInputAr: "صورة كاملة أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ علبة لعبة احترافية بتصميم تجاري عالي الجودة.
التصميم: علبة لعبة ورقية بألوان حيوية، نوافذ عرض، شعار وهمي، وصف لعبة وهمي.
الأسلوب: Retail toy packaging، صور الشخصية على الجوانب.
الألوان: زرق/أحمر/أصفر أو ألوان مميزة.
الجودة: Product packaging design quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional toy packaging box with high-quality commercial design.
Design: Retail toy box with vivid colors, display windows, fictional logo, fictional product description.
Style: Retail toy packaging, character images on sides.
Colors: Blue/red/yellow or distinctive brand colors.
Quality: Product packaging design quality, 4K.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "🎁",
    tags: ["Toy Packaging", "Box Design", "Retail", "Product"],
  },
  // --- New prompts batch ---
  {
    id: "anime-portrait",
    titleAr: "أنمي ياباني فني",
    titleEn: "Anime Character Portrait",
    descriptionAr: "حوّل صورتك إلى شخصية أنمي يابانية بأسلوب استوديو احترافي.",
    descriptionEn: "Transform your photo into a Japanese anime character in professional studio style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه في إضاءة جيدة",
    bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
حوّل الصورة إلى شخصية أنمي يابانية بأسلوب استوديو احترافي.
الأسلوب: Anime art style، عيون كبيرة، خطوط واضحة ونظيفة، إضاءة ناعمة.
الألوان: ألوان مشبعة وحيوية مع تدرجات ناعمة.
الخلفية: بسيطة أو gradient خفيف يناسب الشخصية.
الجودة: High-quality anime illustration، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Transform the photo into a Japanese anime character in professional studio style.
Style: Anime art style with large expressive eyes, clean linework, soft shading.
Colors: Vibrant saturated colors with smooth gradients.
Background: Simple or light gradient complementing the character.
Quality: High-quality anime illustration, 4K.`,
    accent: "#f472b6",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(139,92,246,0.08) 100%)",
    emoji: "⛩️",
    tags: ["Anime", "Japanese", "Art Style", "Illustration"],
    featured: true,
  },
  {
    id: "watercolor-portrait",
    titleAr: "بورتريه ألوان مائية",
    titleEn: "Watercolor Portrait",
    descriptionAr: "حوّل صورتك إلى لوحة ألوان مائية فنية رائعة.",
    descriptionEn: "Transform your photo into a beautiful artistic watercolor painting.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة ألوان مائية فنية.
الأسلوب: Watercolor painting، حواف ناعمة ومتداخلة، تدفق الألوان الطبيعي، ملمس الورق واضح.
الألوان: ألوان دافئة أو باردة حسب مزاج الصورة، شفافية اللون محفوظة.
الخلفية: بيضاء أو ورقية مع رشات لون عشوائية.
الجودة: Fine art watercolor، 8K، ملمس حقيقي للفرشاة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic watercolor painting.
Style: Watercolor painting with soft bleeding edges, natural color flow, visible paper texture.
Colors: Warm or cool palette matching the mood, transparent color washes preserved.
Background: White or paper texture with random color splashes.
Quality: Fine art watercolor, 8K, authentic brushstroke texture.`,
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(167,243,208,0.08) 100%)",
    emoji: "🎨",
    tags: ["Watercolor", "Painting", "Fine Art", "Soft"],
  },
  {
    id: "oil-painting-classic",
    titleAr: "لوحة زيتية كلاسيكية",
    titleEn: "Classic Oil Painting",
    descriptionAr: "اجعل صورتك لوحة زيتية كلاسيكية بأسلوب أساتذة الرسم القديم.",
    descriptionEn: "Turn your photo into a classical oil painting in the style of old masters.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه أو نصف الجسم في إضاءة جيدة",
    bestInputEn: "Face or half-body photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة زيتية كلاسيكية بأسلوب أساتذة الرسم.
الأسلوب: Classical oil painting، ضربات الفرشاة واضحة، عمق وإضاءة تشبه Rembrandt.
الإضاءة: Chiaroscuro (ضوء وظل قوي)، ألوان دافئة غنية.
الإطار: مع إطار لوحة كلاسيكي ذهبي خشبي.
الجودة: Museum-quality oil painting، 8K، ملمس القماش واضح.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a classical oil painting in old masters style.
Style: Classical oil painting technique, visible brushstrokes, Rembrandt-like depth and lighting.
Lighting: Chiaroscuro (strong light and shadow), warm rich colors.
Frame: Classic ornate golden wooden frame included.
Quality: Museum-quality oil painting, 8K, visible canvas texture.`,
    accent: "#92400e",
    gradient: "linear-gradient(135deg, rgba(146,64,14,0.2) 0%, rgba(212,175,55,0.08) 100%)",
    emoji: "🖼️",
    tags: ["Oil Painting", "Classical", "Old Masters", "Rembrandt"],
  },
  {
    id: "superhero-costume",
    titleAr: "شخصية Superhero",
    titleEn: "Superhero Character",
    descriptionAr: "أصبح بطلاً خارقاً في بوستر فيلم مارفل-ستايل مذهل.",
    descriptionEn: "Become a superhero in a stunning Marvel-style movie poster.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "intermediate",
    bestInputAr: "صورة كاملة للجسم أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Superhero بأسلوب بوستر Marvel/DC.
الزي: زي بطل خارق حديث (لا تستخدم أزياء حقيقية معروفة)، ألوان مميزة، كاب أو درع.
الخلفية: مدينة تحت الهجوم، سماء درامية، ضوء متفجر من الخلف.
الإضاءة: Rim light قوي، Lens flare، تأثيرات قوى خارقة.
الجودة: Movie poster quality، 4K، درامية عالية.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a superhero character in Marvel/DC movie poster style.
Costume: Modern original superhero suit (no real copyrighted designs), distinctive colors, cape or armor.
Background: City under attack, dramatic sky, explosive backlight.
Lighting: Strong rim light, lens flares, superpower energy effects.
Quality: Movie poster quality, 4K, high drama.`,
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "🦸",
    tags: ["Superhero", "Marvel Style", "Action", "Poster"],
    featured: true,
  },
  {
    id: "fantasy-book-cover",
    titleAr: "غلاف رواية فانتازيا",
    titleEn: "Fantasy Novel Cover",
    descriptionAr: "أصبح بطل رواية فانتازيا ملحمية على غلاف كتاب مذهل.",
    descriptionEn: "Become the hero of an epic fantasy novel on a stunning book cover.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة كاملة أو نصف الجسم",
    bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف رواية فانتازيا ملحمية.
الأسلوب: Epic fantasy book cover art، تصميم مثل Brandon Sanderson novels.
البيئة: مملكة خيالية، قلاع سحابية، مخلوقات أسطورية في الخلفية.
الشخصية: بزي فانتازيا، سيف أو عصا سحرية، هالة ضوئية سحرية.
النص: "EPIC FANTASY" كعنوان وهمي بخط احترافي.
الجودة: Publisher-quality cover art، 4K، درامي وملحمي.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an epic fantasy novel book cover.
Style: Epic fantasy book cover art, style reminiscent of Sanderson or Tolkien novels.
Environment: Fictional kingdom, cloud castles, mythical creatures in the background.
Character: Fantasy attire, sword or magic staff, glowing magical aura.
Text: "EPIC FANTASY" as fictional title in professional typography.
Quality: Publisher-quality cover art, 4K, dramatic and epic.`,
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(219,39,119,0.08) 100%)",
    emoji: "📖",
    tags: ["Fantasy", "Book Cover", "Epic", "Novel"],
  },
  {
    id: "comic-book-panel",
    titleAr: "لوحة كوميك مارفل",
    titleEn: "Marvel-Style Comic Panel",
    descriptionAr: "حوّل صورتك إلى لوحة كوميك ملونة بأسلوب Marvel الكلاسيكي.",
    descriptionEn: "Turn your photo into a colorful comic panel in classic Marvel style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه أو الجسم",
    bestInputEn: "Clear face or body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة كوميك بأسلوب Marvel/DC الكلاسيكي.
الأسلوب: Comic book art، Ben-Day dots، خطوط سميكة، ألوان مسطحة حيوية.
عناصر: فقاعات حوار فارغة، خطوط حركة، تأثيرات صوتية (POW/ZAP).
الإطار: حد لوحة كوميك أسود سميك.
الجودة: Classic comic book printing style، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a comic book panel in classic Marvel/DC style.
Style: Comic book art with Ben-Day dots, bold outlines, flat vivid colors.
Elements: Empty speech bubbles, motion lines, sound effects (POW/ZAP).
Frame: Thick black comic panel border.
Quality: Classic comic book printing style, 4K.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "💥",
    tags: ["Comic Book", "Marvel Style", "Cartoon", "Pop Art"],
  },
  {
    id: "fashion-editorial",
    titleAr: "تصوير أزياء Editorial",
    titleEn: "Fashion Editorial Shoot",
    descriptionAr: "احصل على صورة تصوير أزياء احترافية بأسلوب مجلات الموضة العالمية.",
    descriptionEn: "Get a professional fashion editorial photo in the style of global fashion magazines.",
    category: "professional",
    categoryLabelAr: "احترافي",
    categoryLabelEn: "Professional",
    difficulty: "intermediate",
    bestInputAr: "صورة نصف الجسم أو كاملة في إضاءة جيدة",
    bestInputEn: "Half or full-body photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة تصوير أزياء Editorial احترافية.
الأسلوب: High-fashion editorial، أسلوب مجلة Vogue/Harper's Bazaar.
الملابس: أزياء راقية ومعاصرة تناسب هوية الشخص.
الخلفية: استوديو نقي أو موقع أرستقراطي.
الإضاءة: إضاءة استوديو احترافية، ظلال دراماتيكية.
الجودة: Fashion magazine quality، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional fashion editorial photo.
Style: High-fashion editorial, Vogue/Harper's Bazaar magazine aesthetic.
Clothing: Elegant contemporary fashion matching the subject's identity.
Background: Clean studio or aristocratic location.
Lighting: Professional studio lighting with dramatic shadows.
Quality: Fashion magazine quality, 8K.`,
    accent: "#9333ea",
    gradient: "linear-gradient(135deg, rgba(147,51,234,0.18) 0%, rgba(219,39,119,0.06) 100%)",
    emoji: "👗",
    tags: ["Fashion", "Editorial", "Vogue Style", "Magazine"],
  },
  {
    id: "instagram-aesthetic",
    titleAr: "صورة Instagram Aesthetic",
    titleEn: "Instagram Aesthetic Shot",
    descriptionAr: "أنشئ صورة Instagram مثالية بأعلى جودة جمالية.",
    descriptionEn: "Create the perfect Instagram photo with peak aesthetic quality.",
    category: "social",
    categoryLabelAr: "سوشيال ميديا",
    categoryLabelEn: "Social Media",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة Instagram aesthetic مثالية.
الأسلوب: Instagram aesthetic photography، ألوان متناسقة وناعمة، Moody أو Airy حسب المزاج.
التعديل: تعديل لوني متسق، تباين ناعم، إضاءة طبيعية جميلة.
التكوين: Rule of thirds، عمق ميدان ناعم.
الجودة: 4K portrait، شبكة Instagram-ready.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create the perfect Instagram aesthetic photo.
Style: Instagram aesthetic photography, cohesive and soft color palette, moody or airy depending on mood.
Editing: Consistent color grade, soft contrast, beautiful natural lighting.
Composition: Rule of thirds, soft depth of field.
Quality: 4K portrait, Instagram-ready grid.`,
    accent: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(245,158,11,0.06) 100%)",
    emoji: "📷",
    tags: ["Instagram", "Aesthetic", "Social Media", "Feed"],
  },
  {
    id: "retro-game-sprite",
    titleAr: "شخصية لعبة Pixel Art",
    titleEn: "Retro Pixel Game Character",
    descriptionAr: "حوّل نفسك إلى شخصية لعبة فيديو Pixel Art رجعية مبهجة.",
    descriptionEn: "Turn yourself into a charming retro pixel art video game character.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه",
    bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Pixel Art رجعية.
الأسلوب: 16-bit pixel art style، محدودية الألوان المتعمدة، حواف مربعة واضحة.
التصميم: شخصية بحجم متوسط مع إطارات حركة (وقوف، هجوم، قفز).
البيئة: خلفية level-design رجعية بسيطة.
الإضافات: شريط HP/XP وهمي، نقاط وهمية.
الجودة: Authentic pixel art، 4K upscale.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a retro pixel art character.
Style: 16-bit pixel art with intentional limited color palette, visible square pixels.
Design: Medium-sized character sprite with animation poses (idle, attack, jump).
Environment: Simple retro level-design background.
Extras: Fictional HP/XP bar, score display.
Quality: Authentic pixel art, 4K upscale.`,
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(16,185,129,0.08) 100%)",
    emoji: "🕹️",
    tags: ["Pixel Art", "Retro Game", "8-bit", "Sprite"],
  },
  {
    id: "lego-minifigure",
    titleAr: "شخصية Lego مُجسّمة",
    titleEn: "Lego Minifigure",
    descriptionAr: "حوّل نفسك إلى شخصية Lego بلاستيكية مثالية التفاصيل.",
    descriptionEn: "Transform yourself into a perfectly detailed Lego minifigure.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Lego Minifigure بتفاصيل مثالية.
الأسلوب: Official Lego minifigure style، بلاستيك لامع، تعابير وجه Lego المميزة.
التفاصيل: ملابس Lego تعكس هوية الشخص، اكسسوارات Lego مناسبة.
الخلفية: قطع Lego مبنية في الخلفية أو بيضاء نقية.
الإضاءة: Studio lighting، انعكاسات البلاستيك.
الجودة: Official Lego product quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Lego minifigure with perfect details.
Style: Official Lego minifigure style, shiny plastic, signature Lego facial expressions.
Details: Lego-style clothing matching the subject's identity, appropriate Lego accessories.
Background: Built Lego pieces in background or pure white.
Lighting: Studio lighting, plastic reflections.
Quality: Official Lego product quality, 4K.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "🧱",
    tags: ["Lego", "Minifigure", "Toy", "Plastic"],
  },
  {
    id: "claymation-style",
    titleAr: "أسلوب Clay / كلايماشن",
    titleEn: "Claymation Character",
    descriptionAr: "حوّل صورتك إلى شخصية طين كلايماشن مرحة وجذابة.",
    descriptionEn: "Transform your photo into a charming and fun claymation character.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Claymation من الطين المُشكّل.
الأسلوب: Stop-motion claymation style، ملمس الطين واضح، مفاصل مرئية.
التفاصيل: أصابع من الطين، تعابير وجه مبالغ بها مرحة، تفاصيل ملابس من الطين.
الخلفية: مشهد Claymation مبني من الطين.
الإضاءة: إضاءة ناعمة مع ظلال Claymation characteristic.
الجودة: High-detail clay render، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a claymation character made of shaped clay.
Style: Stop-motion claymation aesthetic, visible clay texture, visible joints.
Details: Clay fingers, exaggerated fun facial expressions, clay clothing details.
Background: Claymation scene built from clay.
Lighting: Soft lighting with characteristic claymation shadows.
Quality: High-detail clay render, 4K.`,
    accent: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,179,8,0.08) 100%)",
    emoji: "🏺",
    tags: ["Claymation", "Clay", "Stop Motion", "Cute"],
  },
  {
    id: "renaissance-portrait",
    titleAr: "بورتريه عصر النهضة",
    titleEn: "Renaissance Portrait",
    descriptionAr: "اجعل صورتك لوحة بورتريه من عصر النهضة الإيطالي بأسلوب Da Vinci.",
    descriptionEn: "Turn your photo into an Italian Renaissance portrait in Da Vinci style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة بورتريه من عصر النهضة الإيطالي.
الأسلوب: Italian Renaissance portrait، تقنية Sfumato، ألوان زيتية دافئة وعميقة.
الزي: ملابس عصر النهضة الأوروبي الأنيق.
الخلفية: منظر طبيعي إيطالي أو جدار حجري داكن بأسلوب Da Vinci.
الإضاءة: Chiaroscuro خفيف، ضوء طبيعي من جانب واحد.
الجودة: Museum-quality painting، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Italian Renaissance portrait painting.
Style: Italian Renaissance portrait technique with sfumato, warm and deep oil colors.
Attire: Elegant European Renaissance period clothing.
Background: Italian landscape or dark stone wall in Da Vinci style.
Lighting: Subtle chiaroscuro, natural light from one side.
Quality: Museum-quality painting, 8K.`,
    accent: "#b45309",
    gradient: "linear-gradient(135deg, rgba(180,83,9,0.2) 0%, rgba(212,175,55,0.08) 100%)",
    emoji: "🏛️",
    tags: ["Renaissance", "Da Vinci", "Historical", "Oil Painting"],
  },
  {
    id: "space-astronaut",
    titleAr: "رائد فضاء في الكون",
    titleEn: "Space Astronaut",
    descriptionAr: "أصبح رائد فضاء في مشهد كوني مذهل.",
    descriptionEn: "Become an astronaut in a breathtaking cosmic scene.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة رائد فضاء في الفضاء الخارجي.
الزي: بدلة فضاء NASA احترافية مفصّلة.
البيئة: خارج المحطة الفضائية مع الأرض في الخلفية، نجوم، مجرة.
التفاصيل: انعكاس الكون في خوذة الرائد.
الإضاءة: إضاءة شمسية حادة من جانب واحد، الجانب الآخر في الظل الكامل.
الجودة: NASA photography quality، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a space astronaut photo in outer space.
Suit: Detailed professional NASA-style spacesuit.
Environment: Outside a space station with Earth visible in background, stars, galaxy.
Details: Reflection of the cosmos in the astronaut's visor.
Lighting: Sharp one-sided sunlight, other side in complete shadow.
Quality: NASA photography quality, 8K.`,
    accent: "#1d4ed8",
    gradient: "linear-gradient(135deg, rgba(29,78,216,0.2) 0%, rgba(109,40,217,0.08) 100%)",
    emoji: "🚀",
    tags: ["Space", "Astronaut", "NASA", "Cosmic"],
    featured: true,
  },
  {
    id: "underwater-fantasy",
    titleAr: "عالم تحت الماء الخيالي",
    titleEn: "Underwater Fantasy World",
    descriptionAr: "ضع نفسك في عالم تحت الماء خيالي مع مخلوقات البحر والمرجان.",
    descriptionEn: "Place yourself in a magical underwater world with sea creatures and coral.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهداً خيالياً تحت الماء.
البيئة: عالم مائي سحري، مرجان ملون، قناديل بحر متوهجة، أسماك استوائية.
الشخصية: مدمجة في المشهد المائي مع تأثيرات الفقاعات والضوء.
الألوان: أزرق وأخضر وفيروزي مع توهج bioluminescent.
الإضاءة: ضوء مرشّح من السطح، توهج bioluminescence.
الجودة: Cinematic underwater photography، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical underwater fantasy scene.
Environment: Magical aquatic world, colorful coral, glowing jellyfish, tropical fish.
Character: Integrated into the aquatic scene with bubble effects and light rays.
Colors: Blue, green, and teal with bioluminescent glow.
Lighting: Filtered light from the surface, bioluminescence glow.
Quality: Cinematic underwater photography, 8K.`,
    accent: "#0891b2",
    gradient: "linear-gradient(135deg, rgba(8,145,178,0.2) 0%, rgba(16,185,129,0.08) 100%)",
    emoji: "🌊",
    tags: ["Underwater", "Fantasy", "Ocean", "Bioluminescent"],
  },
  {
    id: "robot-cyborg",
    titleAr: "تحول الروبوت / Cyborg",
    titleEn: "Robot / Cyborg Transformation",
    descriptionAr: "حوّل نفسك إلى نصف إنسان نصف آلة بأسلوب Sci-Fi مذهل.",
    descriptionEn: "Transform yourself into half-human half-machine in stunning Sci-Fi style.",
    category: "fun",
    categoryLabelAr: "ترفيه",
    categoryLabelEn: "Fun",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تحول Cyborg / روبوت نصف إنسان.
الأسلوب: Cyberpunk cyborg، نصف وجه معدني بأجزاء ميكانيكية، نصف بشري طبيعي.
التفاصيل: أجزاء تيتانيوم لامعة، أسلاك، LED متوهج، عيون مُحسّنة.
الإضاءة: Neon glow أزرق/أحمر على الأجزاء المعدنية.
الخلفية: ورشة Cyberpunk أو خلفية رقمية.
الجودة: Cinematic Sci-Fi quality، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a half-human half-robot cyborg transformation.
Style: Cyberpunk cyborg, half metallic face with mechanical parts, half natural human.
Details: Shiny titanium parts, wires, glowing LEDs, enhanced eyes.
Lighting: Blue/red neon glow on metallic parts.
Background: Cyberpunk workshop or digital background.
Quality: Cinematic Sci-Fi quality, 8K.`,
    accent: "#64748b",
    gradient: "linear-gradient(135deg, rgba(100,116,139,0.2) 0%, rgba(6,182,212,0.08) 100%)",
    emoji: "🤖",
    tags: ["Cyborg", "Robot", "Sci-Fi", "Cyberpunk"],
  },
  {
    id: "stained-glass-art",
    titleAr: "فن الزجاج الملون",
    titleEn: "Stained Glass Art",
    descriptionAr: "حوّل صورتك إلى عمل فني من الزجاج الملون المُضاء.",
    descriptionEn: "Transform your photo into a stunning illuminated stained glass artwork.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل فني من الزجاج الملون (Stained Glass).
الأسلوب: Gothic stained glass window art، خطوط سوداء سميكة بين الألوان، ألوان زجاجية شفافة مضيئة.
الألوان: أزرق ملكي، أحمر روبي، ذهبي، أخضر زمردي، بنفسجي.
الإضاءة: ضوء من خلف الزجاج يُضيء الألوان.
الإطار: إطار نافذة كنسية حجري.
الجودة: Fine art illustration، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a stained glass artwork.
Style: Gothic stained glass window art, thick black leading between colors, translucent glowing glass colors.
Colors: Royal blue, ruby red, gold, emerald green, violet.
Lighting: Backlit illumination through the glass colors.
Frame: Stone church window frame.
Quality: Fine art illustration, 4K.`,
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "🪟",
    tags: ["Stained Glass", "Gothic", "Church Art", "Colorful"],
  },
  {
    id: "pop-art-warhol",
    titleAr: "بوب آرت أسلوب Warhol",
    titleEn: "Pop Art Warhol Style",
    descriptionAr: "أصبح أيقونة ثقافية في أسلوب Andy Warhol الكلاسيكي.",
    descriptionEn: "Become a cultural icon in classic Andy Warhol pop art style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل Pop Art بأسلوب Andy Warhol.
الأسلوب: Andy Warhol pop art، شبكة 4 نسخ بألوان مختلفة، ألوان صارخة مسطحة.
الألوان: كل نسخة بلون خلفية مختلف (أصفر، بنفسجي، أخضر، أحمر وردي).
التقنية: طباعة سيلك Silk-screen print appearance، حواف واضحة.
الجودة: Classic pop art print quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Andy Warhol-style pop art piece.
Style: Andy Warhol pop art, 4-panel grid each with different colors, flat bold colors.
Colors: Each panel with different background (yellow, violet, green, hot pink).
Technique: Silk-screen print appearance, clean sharp edges.
Quality: Classic pop art print quality, 4K.`,
    accent: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(234,179,8,0.08) 100%)",
    emoji: "🎭",
    tags: ["Pop Art", "Warhol", "Silk Screen", "Iconic"],
    featured: true,
  },
  {
    id: "low-poly-art",
    titleAr: "فن Low Poly الهندسي",
    titleEn: "Low Poly Geometric Art",
    descriptionAr: "حوّل صورتك إلى عمل فني هندسي Low Poly عصري.",
    descriptionEn: "Transform your photo into a modern geometric Low Poly artwork.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل فني Low Poly هندسي.
الأسلوب: Low poly geometric art، مثلثات هندسية، أسلوب Faceted 3D render.
الألوان: تدرجات لونية حديثة، كل مثلث بلون مختلف ضمن التدرج.
الخلفية: بيضاء أو داكنة بسيطة تُبرز العمل.
الجودة: Vector geometric art quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a low poly geometric artwork.
Style: Low poly geometric art, triangulated facets, faceted 3D render aesthetic.
Colors: Modern color gradients, each facet a different shade within the gradient.
Background: Clean white or dark simple background to highlight the art.
Quality: Vector geometric art quality, 4K.`,
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🔷",
    tags: ["Low Poly", "Geometric", "3D Art", "Modern"],
  },
  {
    id: "grunge-rock-poster",
    titleAr: "بوستر روك / Grunge",
    titleEn: "Grunge Rock Poster",
    descriptionAr: "أنشئ بوستر روك grunge مذهل بأسلوب الملصقات الموسيقية الكلاسيكية.",
    descriptionEn: "Create a stunning grunge rock poster in classic music poster style.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة نصف الجسم أو كاملة",
    bestInputEn: "Half or full-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر موسيقى روك Grunge.
الأسلوب: Grunge rock poster، ملصق مطبوع خشن، ألوان باهتة ومحترقة.
التأثيرات: تأثيرات حرق وبقع وتشويش، ورق مُتقادم.
الألوان: أسود، أحمر داكن، بني، أصفر باهت.
النص: اسم فرقة وهمية وتاريخ وهمي بخط خشن.
الجودة: Authentic gig poster quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a grunge rock music poster.
Style: Grunge rock poster with rough printed aesthetic, faded and burnt colors.
Effects: Burn marks, ink splatters, distortion effects, aged paper look.
Colors: Black, dark red, brown, faded yellow.
Text: Fictional band name and date in rough typeface.
Quality: Authentic gig poster quality, 4K.`,
    accent: "#78350f",
    gradient: "linear-gradient(135deg, rgba(120,53,15,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "🎸",
    tags: ["Grunge", "Rock Poster", "Music", "Vintage Print"],
  },
  {
    id: "luxury-perfume-ad",
    titleAr: "إعلان عطر فاخر",
    titleEn: "Luxury Perfume Advertisement",
    descriptionAr: "احضر في إعلان عطر فاخر بأسلوب Dior أو Chanel.",
    descriptionEn: "Appear in a luxury perfume advertisement in Dior or Chanel style.",
    category: "product",
    categoryLabelAr: "منتج",
    categoryLabelEn: "Product",
    difficulty: "intermediate",
    bestInputAr: "صورة نصف الجسم أو كاملة في إضاءة جيدة",
    bestInputEn: "Half or full-body photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ إعلان عطر فاخر.
الأسلوب: Luxury perfume campaign photography، أسلوب Dior/Chanel.
العناصر: زجاجة عطر أنيقة وهمية، ألوان ذهبية وفضية وعاجية.
الخلفية: بيئة فاخرة (قصر، حديقة باريسية، مرآة كبيرة).
الإضاءة: إضاءة سينمائية ناعمة وفاخرة.
النص: "Parfum de Luxe" أو نص عام وهمي فقط.
الجودة: Fashion campaign quality، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a luxury perfume advertisement.
Style: Luxury perfume campaign photography in Dior/Chanel style.
Elements: Fictional elegant perfume bottle, gold, silver, and ivory tones.
Background: Luxurious setting (palace, Parisian garden, grand mirror).
Lighting: Soft cinematic luxury lighting.
Text: "Parfum de Luxe" or generic fictional placeholder only.
Quality: Fashion campaign quality, 8K.`,
    accent: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.06) 100%)",
    emoji: "🌹",
    tags: ["Perfume Ad", "Luxury", "Fashion Campaign", "Fragrance"],
  },
  {
    id: "food-product-shot",
    titleAr: "تصوير منتج غذائي احترافي",
    titleEn: "Professional Food Product Shot",
    descriptionAr: "أنشئ تصوير منتج غذائي احترافي يشهّي ويُبرز أي طبق.",
    descriptionEn: "Create professional food product photography that makes any dish irresistible.",
    category: "product",
    categoryLabelAr: "منتج",
    categoryLabelEn: "Product",
    difficulty: "beginner",
    bestInputAr: "صورة للطبق أو المنتج الغذائي",
    bestInputEn: "Photo of the dish or food product",
    promptAr: `استخدم الصورة المرفقة كمرجع للطبق أو المنتج الغذائي.
أنشئ تصوير منتج غذائي احترافي يبدو شهياً ومُبهجاً.
الأسلوب: Food photography، flat lay أو 45-degree angle.
الإضاءة: Natural window light أو إضاءة استوديو ناعمة، highlight على التفاصيل.
السطح: طاولة خشبية دافئة أو رخام أبيض أنيق.
الإكسسوارات: مكونات طازجة حولها، أدوات مطبخ أنيقة.
الجودة: Restaurant menu quality، 4K، شهي جداً.`,
    promptEn: `Use the uploaded image as the primary reference for the dish or food product.
Create professional food product photography that looks appetizing and delightful.
Style: Food photography, flat lay or 45-degree angle.
Lighting: Natural window light or soft studio light highlighting texture details.
Surface: Warm wooden table or elegant white marble.
Props: Fresh ingredients around it, elegant kitchen tools.
Quality: Restaurant menu quality, 4K, extremely appetizing.`,
    accent: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,179,8,0.08) 100%)",
    emoji: "🍽️",
    tags: ["Food Photography", "Product Shot", "Menu", "Culinary"],
  },
  {
    id: "street-photography-edit",
    titleAr: "تحرير تصوير الشارع",
    titleEn: "Street Photography Edit",
    descriptionAr: "أعطِ صورتك طابع تصوير الشارع الاحترافي والأصيل.",
    descriptionEn: "Give your photo an authentic professional street photography aesthetic.",
    category: "portrait",
    categoryLabelAr: "بورتريه",
    categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "أي صورة في بيئة خارجية",
    bestInputEn: "Any photo in an outdoor setting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
طبّق أسلوب Street Photography الاحترافي.
الأسلوب: Candid street photography، grain طبيعي، تعديل Moody Urban.
التلوين: ألوان هادئة أو أبيض وأسود مع لمسات لون انتقائية.
البيئة: إذا كانت الخلفية عشوائية، حسّنها لتبدو شارعاً حضرياً جميلاً.
الإضاءة: Golden hour أو إضاءة حضرية ليلية دافئة.
الجودة: Leica camera quality، authentic grain، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Apply professional street photography aesthetic.
Style: Candid street photography, natural grain, moody urban edit.
Color: Muted tones or black and white with selective color accents.
Environment: If background is random, enhance it to look like a beautiful urban street.
Lighting: Golden hour or warm urban night lighting.
Quality: Leica camera quality, authentic grain, 4K.`,
    accent: "#475569",
    gradient: "linear-gradient(135deg, rgba(71,85,105,0.2) 0%, rgba(100,116,139,0.08) 100%)",
    emoji: "🏙️",
    tags: ["Street Photography", "Urban", "Moody", "Candid"],
  },
  {
    id: "bw-fine-art",
    titleAr: "بورتريه أبيض وأسود فني",
    titleEn: "B&W Fine Art Portrait",
    descriptionAr: "لوحة بورتريه فنية بالأبيض والأسود بأسلوب أساتذة التصوير.",
    descriptionEn: "Fine art black and white portrait in the style of master photographers.",
    category: "portrait",
    categoryLabelAr: "بورتريه",
    categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه في أي إضاءة",
    bestInputEn: "Face photo in any lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فني بالأبيض والأسود.
الأسلوب: Fine art B&W portrait، أسلوب Ansel Adams أو Annie Leibovitz.
التعديل: تباين عالي الجودة، ظلال عميقة، هايلايت ناصع.
الإضاءة: إضاءة انتقائية تُبرز ملامح الوجه بشكل مذهل.
الملمس: تفاصيل جلد الوجه واضحة وعميقة، حادة جداً.
الجودة: Museum portrait photography، 8K، grain خفيف للأصالة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art black and white portrait.
Style: Fine art B&W portrait in Ansel Adams or Annie Leibovitz style.
Editing: High-quality contrast, deep shadows, crisp highlights.
Lighting: Selective lighting that dramatically highlights facial features.
Texture: Very sharp and detailed skin texture visible.
Quality: Museum portrait photography, 8K, subtle grain for authenticity.`,
    accent: "#374151",
    gradient: "linear-gradient(135deg, rgba(55,65,81,0.2) 0%, rgba(107,114,128,0.08) 100%)",
    emoji: "🖤",
    tags: ["Black & White", "Fine Art", "Portrait", "Contrast"],
  },
  {
    id: "tiktok-creator-card",
    titleAr: "بطاقة TikTok Creator",
    titleEn: "TikTok Creator Card",
    descriptionAr: "أنشئ بطاقة Creator مبهرة بتصميم TikTok عصري.",
    descriptionEn: "Create a stunning TikTok-style creator card with modern design.",
    category: "social",
    categoryLabelAr: "سوشيال ميديا",
    categoryLabelEn: "Social Media",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة TikTok Creator عصرية.
الأسلوب: TikTok-inspired card design، تدرجات نيونية، أسلوب Gen-Z عصري.
العناصر: إطار بروفايل TikTok وهمي، عداد followers وهمي، أيقونة TikTok.
الألوان: أسود مع نيون وردي/أحمر/أبيض.
الجودة: Social media ready، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a modern TikTok creator card.
Style: TikTok-inspired card design, neon gradients, Gen-Z modern aesthetic.
Elements: Fictional TikTok profile frame, fictional follower counter, TikTok icon style.
Colors: Black with neon pink/red/white.
Quality: Social media ready, 4K.`,
    accent: "#ff0050",
    gradient: "linear-gradient(135deg, rgba(255,0,80,0.2) 0%, rgba(0,242,234,0.08) 100%)",
    emoji: "📱",
    tags: ["TikTok", "Creator", "Social Media", "Gen-Z"],
  },
  {
    id: "twitter-banner",
    titleAr: "غلاف Twitter/X احترافي",
    titleEn: "Professional Twitter/X Banner",
    descriptionAr: "أنشئ غلاف Twitter/X احترافياً يعكس هويتك الرقمية.",
    descriptionEn: "Create a professional Twitter/X banner that reflects your digital identity.",
    category: "social",
    categoryLabelAr: "سوشيال ميديا",
    categoryLabelEn: "Social Media",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة",
    bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف Twitter/X Banner احترافي.
الأبعاد: 1500x500 بكسل (نسبة 3:1).
الأسلوب: بانر احترافي نظيف، تدرج لوني عصري، مساحة كافية لصورة البروفايل.
العناصر: نص وظيفة/اهتمام عام وهمي، تصميم هندسي خفيف.
الألوان: تدرج أزرق/بنفسجي أو حسب مزاج الصورة.
الجودة: Twitter header quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional Twitter/X banner.
Dimensions: 1500x500 pixels (3:1 ratio).
Style: Clean professional banner, modern color gradient, adequate space for profile picture.
Elements: Fictional role/interest text, subtle geometric design.
Colors: Blue/violet gradient or matching the subject's mood.
Quality: Twitter header quality, 4K.`,
    accent: "#1d9bf0",
    gradient: "linear-gradient(135deg, rgba(29,155,240,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🐦",
    tags: ["Twitter", "X", "Banner", "Social Media", "Header"],
  },
  {
    id: "motivational-poster",
    titleAr: "بوستر تحفيزي احترافي",
    titleEn: "Professional Motivational Poster",
    descriptionAr: "أنشئ بوستراً تحفيزياً راقياً جاهزاً للطباعة أو النشر.",
    descriptionEn: "Create a premium motivational poster ready for print or sharing.",
    category: "professional",
    categoryLabelAr: "احترافي",
    categoryLabelEn: "Professional",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة أو بدون صورة",
    bestInputEn: "Any clear photo or no photo needed",
    promptAr: `استخدم الصورة المرفقة (إن وُجدت) كمرجع بصري.
أنشئ بوستر تحفيزي احترافي عالي الجودة.
الأسلوب: Motivational poster design، مستوحى من Nike/Apple campaigns.
التصميم: تدرج داكن عميق، نص تحفيزي عام وهمي بخط Bold كبير.
الألوان: أسود وذهبي أو أبيض وأزرق داكن.
الإضاءة: Dramatic lighting إذا كان هناك شخص.
الجودة: Print-quality poster، 4K، A3 format ready.`,
    promptEn: `Use the uploaded image (if provided) as a visual reference.
Create a high-quality professional motivational poster.
Style: Motivational poster design inspired by Nike/Apple campaigns.
Design: Deep dark gradient, generic fictional motivational text in large Bold font.
Colors: Black and gold or white and dark blue.
Lighting: Dramatic lighting if a person is present.
Quality: Print-quality poster, 4K, A3 format ready.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(0,0,0,0.08) 100%)",
    emoji: "💪",
    tags: ["Motivational", "Poster", "Inspirational", "Print Ready"],
  },
  {
    id: "resume-professional-photo",
    titleAr: "صورة CV / السيرة الذاتية",
    titleEn: "Professional CV / Resume Photo",
    descriptionAr: "احصل على صورة سيرة ذاتية احترافية مثالية لأي وظيفة.",
    descriptionEn: "Get a perfect professional CV photo ready for any job application.",
    category: "professional",
    categoryLabelAr: "احترافي",
    categoryLabelEn: "Professional",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة للوجه أو نصف الجسم",
    bestInputEn: "Any clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة سيرة ذاتية احترافية مثالية.
الأسلوب: CV/resume professional headshot، تعبير واثق وودود.
الخلفية: أبيض نقي أو رمادي فاتح أنيق.
الملابس: بدلة رسمية أو ملابس احترافية مناسبة (إذا كانت ظاهرة).
الإضاءة: Three-point studio lighting، ناعمة ومتوازنة تماماً.
الجودة: Passport/ID photo quality، 4K، صالحة للطباعة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a perfect professional CV/resume photo.
Style: Professional CV headshot, confident and approachable expression.
Background: Pure white or elegant light gray.
Attire: Formal suit or professional business casual (if visible).
Lighting: Three-point studio lighting, perfectly soft and balanced.
Quality: Passport/ID photo quality, 4K, print-ready.`,
    accent: "#0f172a",
    gradient: "linear-gradient(135deg, rgba(15,23,42,0.18) 0%, rgba(59,130,246,0.06) 100%)",
    emoji: "📋",
    tags: ["CV Photo", "Resume", "Professional", "Job Application"],
  },
  {
    id: "ghibli-scene",
    titleAr: "مشهد جيبلي Studio Ghibli",
    titleEn: "Studio Ghibli Inspired Scene",
    descriptionAr: "حوّل نفسك وبيئتك إلى مشهد مذهل بأسلوب Studio Ghibli.",
    descriptionEn: "Transform yourself and your surroundings into a breathtaking Studio Ghibli-style scene.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الشخص أو أي مشهد",
    bestInputEn: "Person photo or any scene",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهداً بأسلوب Studio Ghibli.
الأسلوب: Studio Ghibli animation style، مستوحى من Spirited Away أو Howl's Moving Castle.
البيئة: طبيعة ساحرة، أشجار ضخمة، سماء زرقاء بغيوم ناصعة.
الشخصية: بأسلوب Ghibli الكرتوني، تعابير ناعمة وحيوية.
التفاصيل: ضوء شمس ذهبي يتسلل بين الأشجار، مخلوقات خيالية صغيرة.
الجودة: Ghibli film quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a scene in Studio Ghibli style.
Style: Studio Ghibli animation style inspired by Spirited Away or Howl's Moving Castle.
Environment: Enchanting nature, massive trees, vivid blue sky with puffy white clouds.
Character: In Ghibli's distinctive soft cartoon style with expressive features.
Details: Golden sunlight filtering through trees, tiny fantastical creatures in the scene.
Quality: Ghibli film quality, 4K.`,
    accent: "#4ade80",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.2) 0%, rgba(56,189,248,0.08) 100%)",
    emoji: "🌿",
    tags: ["Ghibli", "Anime", "Nature", "Fantasy", "Studio Ghibli"],
    featured: true,
  },
  {
    id: "egyptian-pharaoh",
    titleAr: "فرعون مصري قديم",
    titleEn: "Ancient Egyptian Pharaoh",
    descriptionAr: "تحول إلى فرعون مصري قديم في لوحة جدارية أو تمثال ملكي.",
    descriptionEn: "Transform into an ancient Egyptian pharaoh in a royal mural or statue.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تصويراً تاريخياً بأسلوب الفراعنة المصريين القدامى.
الزي: تاج فرعوني، قلادة ذهبية، خافا (Khat) أو Nemes headcloth.
الخلفية: معبد مصري قديم، هيروغليفية ذهبية على الجدران.
الألوان: ذهبي، أزرق ملكي، أحمر، أسود.
الأسلوب: فن مصري قديم مع واقعية عالية (hybrid style).
الجودة: Historical art quality، 4K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a historical ancient Egyptian pharaoh depiction.
Attire: Pharaonic crown, golden collar necklace, Khat or Nemes headcloth.
Background: Ancient Egyptian temple, golden hieroglyphics on walls.
Colors: Gold, royal blue, red, black.
Style: Ancient Egyptian art combined with high realism (hybrid style).
Quality: Historical art quality, 4K.`,
    accent: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.08) 100%)",
    emoji: "🏺",
    tags: ["Egyptian", "Pharaoh", "Historical", "Ancient"],
  },
  {
    id: "nature-forest-spirit",
    titleAr: "روح الغابة والطبيعة",
    titleEn: "Nature Forest Spirit",
    descriptionAr: "تحول إلى روح الطبيعة والغابة في مشهد خيالي ساحر.",
    descriptionEn: "Transform into a nature forest spirit in an enchanting fantasy scene.",
    category: "art",
    categoryLabelAr: "فن",
    categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة الوجه أو نصف الجسم",
    bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهد روح الطبيعة والغابة الخيالية.
الأسلوب: Fantasy nature spirit، عناصر نباتية مدمجة مع الشخص.
التفاصيل: أوراق شجر وأزهار تنمو من الشعر والملابس، وجه يلمع بضوء أخضر ذهبي.
البيئة: غابة سحرية، ضوء متشعشع، مخلوقات صغيرة وهمية.
الألوان: أخضر زمردي، ذهبي، بني دافئ، وهج أبيض.
الجودة: Fantasy digital art، 8K.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fantasy nature forest spirit scene.
Style: Fantasy nature spirit with botanical elements integrated into the person.
Details: Leaves and flowers growing from hair and clothes, face glowing with green-golden light.
Environment: Enchanted forest, dappled light, tiny fantastical creatures.
Colors: Emerald green, gold, warm brown, white glow.
Quality: Fantasy digital art, 8K.`,
    accent: "#15803d",
    gradient: "linear-gradient(135deg, rgba(21,128,61,0.2) 0%, rgba(212,175,55,0.08) 100%)",
    emoji: "🌲",
    tags: ["Nature Spirit", "Forest", "Fantasy", "Botanical"],
  },

  // ── Batch: AI Portrait Transformations ────────────────────
  {
    id: "golden-hour-beach",
    titleAr: "غروب الشاطئ الذهبي",
    titleEn: "Golden Hour Beach Sunset",
    descriptionAr: "إضاءة غروب ذهبية دافئة مع بوكيه المحيط.",
    descriptionEn: "Warm golden sunset beach portrait with ocean bokeh.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم", bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه شاطئي سينمائي عند غروب الشمس الذهبي.
الأسلوب: إضاءة ساعة ذهبية دافئة بتدرجات الأمبر والذهبي والوردي الذهبي.
الإضاءة: ضوء مباشر خلفي ناعم من المغيب، هالة ذهبية محيطة بالشخص.
الخلفية: بوكيه محيط ناعم، موج هادئ، سماء ملوّنة.
الجودة: فوتوريالستيك سينمائي، 8K، Canon EF 85mm f/1.4.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a cinematic beach portrait at golden hour sunset.
Style: Warm golden hour light with amber, gold, and rose-gold gradients.
Lighting: Soft backlit glow from the setting sun, golden halo around the subject.
Background: Soft ocean bokeh, gentle waves, colorful painted sky.
Quality: Cinematic photorealistic, 8K, Canon EF 85mm f/1.4 equivalent.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "🌅",
    tags: ["Golden Hour", "Beach", "Sunset", "Cinematic"],
    image: "/nano-banana/styles/nb-01-golden-hour.png",
  },
  {
    id: "blue-hour-city",
    titleAr: "الساعة الزرقاء المدينية",
    titleEn: "Blue Hour City Portrait",
    descriptionAr: "بورتريه حضري في الساعة الزرقاء مع بوكيه أضواء المدينة.",
    descriptionEn: "Moody urban portrait in blue hour with city lights bokeh.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه حضري مزاجي في الساعة الزرقاء بعد الغروب.
الأسلوب: Cinematic urban portrait، درجة ألوان زرقاء باردة عميقة، عمق ميدان ضيق.
الإضاءة: ضوء أمامي لطيف من الأضواء الحضرية مع هالة خلفية زرقاء باردة.
الخلفية: ناطحات سحاب بوكيه بأضواء مُضببة، بخار خفيف من الشوارع.
الجودة: سينمائي 4K، Sony 85mm f/1.4 GM، حبوب فيلم ناعمة.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a moody urban portrait in the cinematic blue hour after sunset.
Style: Deep cool blue color grade, shallow depth of field, melancholy introspective mood.
Lighting: Soft front fill from urban ambient lights, cool blue backlight halo.
Background: Bokeh city skyscraper lights blurred behind, light street fog.
Quality: Cinematic 4K, Sony 85mm f/1.4 GM equivalent, subtle film grain.
Do not add any unrelated elements.`,
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🌆",
    tags: ["Blue Hour", "City", "Urban", "Moody"],
    image: "/nano-banana/styles/nb-03-blue-hour.png",
  },
  {
    id: "rembrandt-lighting",
    titleAr: "إضاءة رامبرانت الدرامية",
    titleEn: "Dramatic Rembrandt Lighting",
    descriptionAr: "إضاءة كياروسكورو درامية بأسلوب رامبرانت على خلفية سوداء.",
    descriptionEn: "Deep chiaroscuro lighting in Rembrandt style on pure black background.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه كياروسكورو درامي بأسلوب رامبرانت الهولندي الكلاسيكي.
الأسلوب: كياروسكورو مدرسة هولندا الذهبية، مثلث رامبرانت واضح على الخد.
الإضاءة: مصدر ضوء واحد جانبي دافئ، ظلال عميقة لا رحمة فيها، خط نور حاد على الأنف.
الخلفية: خلفية سوداء داكنة كاملة بلا عناصر مشتتة.
الجودة: 8K، دقة جلد وعيون بمستوى النهضة الإيطالية.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dramatic chiaroscuro portrait in Rembrandt's Dutch Golden Age tradition.
Style: Dutch Golden Age chiaroscuro, clear Rembrandt triangle on the cheek.
Lighting: Single warm directional side light, merciless deep shadows, sharp nose light line.
Background: Pure pitch black background with no distracting elements.
Quality: 8K, Italian Renaissance-level skin and eye detail.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(120,53,15,0.08) 100%)",
    emoji: "🕯️",
    tags: ["Rembrandt", "Chiaroscuro", "Portrait", "Drama"],
    image: "/nano-banana/styles/nb-04-rembrandt.png",
  },
  {
    id: "film-noir-portrait",
    titleAr: "نوار أبيض وأسود",
    titleEn: "Film Noir Portrait",
    descriptionAr: "بورتريه نوار بالأبيض والأسود مع مطر على أرصفة الليل.",
    descriptionEn: "High contrast film noir portrait with rain on cobblestone streets.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فيلم نوار بالأبيض والأسود بأسلوب هوليوود الأربعينات.
الأسلوب: أبيض وأسود عالي التباين، ظلال شرائط نافذة عريانة على الوجه، حبوب فيلم 35mm أصيل.
الإضاءة: مصدر ضوء واحد قاسٍ جانبي، خطوط ظل حادة تقطع الوجه.
الخلفية: أرصفة مبلطة مبللة بالمطر الثقيل، انعكاسات نيون على البرك.
الجودة: 4K، أسلوب تطوير Kodak Tri-X عالي التباين، حبوب حية واضحة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a 1940s Hollywood film noir portrait in high-contrast black and white.
Style: Extreme B&W contrast, venetian blind shadow stripes across the face, authentic 35mm film grain.
Lighting: Single harsh side light source, sharp shadow lines cutting across the face.
Background: Wet cobblestone streets in heavy rain, neon reflections in puddles.
Quality: 4K, Kodak Tri-X high-contrast development style, vivid visible grain.
Do not add any unrelated elements.`,
    accent: "#94a3b8",
    gradient: "linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)",
    emoji: "🎩",
    tags: ["Film Noir", "Black & White", "1940s", "Cinematic"],
    image: "/nano-banana/styles/nb-05-film-noir.png",
  },
  {
    id: "watercolor-impressionist",
    titleAr: "رسم مائي انطباعي",
    titleEn: "Impressionist Watercolor Portrait",
    descriptionAr: "لوحة ألوان مائية انطباعية ناعمة بنسيج الورق.",
    descriptionEn: "Delicate impressionist watercolor fine art portrait.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة ألوان مائية انطباعية بأسلوب الفن الرفيع الأوروبي.
الأسلوب: غسيل مائي انطباعي شفاف، حواف ناعمة متدفقة، لوحة باستيل حالمة.
النسيج: نسيج ورق خشن واضح، ضربات فرشاة عفوية ناعمة، بقع لون مرئية.
الخلفية: ضبابية انطباعية بألوان باستيل فاتحة، بوكيه ناعم.
الجودة: قطعة معرض فنية راقية، جودة Arches hot-press 300 DPI.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an impressionist watercolor painting in European fine art gallery style.
Style: Transparent watercolor washes, soft flowing edges, dreamy pastel palette.
Texture: Rough watercolor paper grain visible, spontaneous brushwork, color blooms.
Background: Impressionist soft blur in light pastels, gentle bokeh.
Quality: Premium fine art gallery piece, 300 DPI Arches paper quality.
Do not add any unrelated elements.`,
    accent: "#c084fc",
    gradient: "linear-gradient(135deg, rgba(192,132,252,0.2) 0%, rgba(96,165,250,0.08) 100%)",
    emoji: "🎨",
    tags: ["Watercolor", "Impressionist", "Fine Art", "Pastel"],
    image: "/nano-banana/styles/nb-07-watercolor.png",
  },
  {
    id: "ghibli-anime-cel",
    titleAr: "أنمي جيبلي بالألوان المسطحة",
    titleEn: "Studio Ghibli Cel Shading",
    descriptionAr: "بورتريه أنمي بأسلوب استوديو جيبلي مع تظليل مسطح.",
    descriptionEn: "Soft cel-shaded anime portrait in Miyazaki's Ghibli style.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه في إضاءة جيدة", bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أنمي بأسلوب رسوم استوديو جيبلي المميز.
الأسلوب: رسوم جيبلي، عيون كبيرة لامعة معبّرة، تظليل مسطح ناعم بتدرجات محدودة.
الألوان: لوحة ألوان جيبلي الأصيلة، ألوان طبيعية دافئة مع لمسات سحرية.
الخلفية: خلفية طبيعية جميلة بأسلوب الإخراج الفني لميازاكي، حقل أو غابة.
الجودة: جودة أنيميشن استوديو 2K، تفاصيل دقيقة في الشعر والعيون.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an anime portrait in Studio Ghibli's distinctive animation art style.
Style: Ghibli anime illustration, large luminous expressive eyes, soft cel shading with limited gradients.
Colors: Authentic Ghibli warm natural palette with magical touches.
Background: Beautiful nature background in Miyazaki's art direction, field or forest setting.
Quality: 2K studio animation quality, detailed hair and eye rendering.
Do not add any unrelated elements.`,
    accent: "#34d399",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(74,222,128,0.08) 100%)",
    emoji: "🌸",
    tags: ["Ghibli", "Anime", "Cel Shading", "Miyazaki"],
    image: "/nano-banana/styles/nb-08-ghibli.png",
  },
  {
    id: "marvel-comic-art",
    titleAr: "كوميك ماربل",
    titleEn: "Marvel Comic Book Art",
    descriptionAr: "رسم كوميكس بأسلوب ماربل الكلاسيكي مع ألوان جريئة.",
    descriptionEn: "Classic Marvel comic book illustration with bold ink and halftone.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة واضحة للوجه أو الجسم", bestInputEn: "Clear face or body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ رسم كوميكس بطولي بأسلوب ماربل/DC الكلاسيكي.
الأسلوب: خطوط حبر سميكة جريئة، ألوان أساسية حيوية متشبعة، نقاط هالفتون مرئية.
التفاصيل: تأثير طباعة كوميكس أصيل، تعبير بطولي ديناميكي قوي، تأثير جاك كيربي.
الخلفية: خلفية كوميكس شعاعية أو بُقعية، سطح ورق أبيض.
الجودة: 4K، رسم متسق يدوي احترافي، أسلوب الكوميكس السبعيني الكلاسيكي.
لا تضف أي فقاعات حوار أو نصوص.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a heroic comic book illustration in classic Marvel/DC style.
Style: Bold thick ink outlines, vibrant saturated primary colors, visible halftone dot pattern.
Details: Authentic comic printing effect, dynamic heroic expression, Jack Kirby influence.
Background: Radial or burst comic-style background, white paper surface.
Quality: 4K, consistent professional hand-drawn illustration, classic 1970s comic style.
Do not add any speech bubbles or text.`,
    accent: "#f87171",
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "💥",
    tags: ["Marvel", "Comic Book", "Halftone", "Jack Kirby"],
    image: "/nano-banana/styles/nb-09-marvel-comic.png",
  },
  {
    id: "fantasy-knight-golden",
    titleAr: "فارس الخيال بالدرع الذهبي",
    titleEn: "Epic Fantasy Knight",
    descriptionAr: "محارب خيالي ملحمي في درع ذهبي محفور مع تنين وقلعة.",
    descriptionEn: "Epic fantasy warrior in ornate golden armor with dragon and castle.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه محارب خيالي ملحمي في درع ذهبي مزخرف.
الأسلوب: فن خيال ملحمي عالي الدقة، درع ذهبي محفور بالأحجار الكريمة والرونز المتوهجة.
الإضاءة: أشعة إلهية دراماتيكية من الأعلى، توهجات سحرية ذهبية من الرونز.
الخلفية: تنين ضخم يحلق وقلعة محترقة في العمق، سحب ملحمية متلاطمة.
الجودة: 4K، رسم رقمي احترافي بأسلوب World of Warcraft، تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an epic fantasy warrior portrait in ornate golden armor.
Style: High-fidelity epic fantasy art, golden armor engraved with gemstones and glowing runes.
Lighting: Dramatic divine god-rays from above, magical golden glow from the runes.
Background: Massive dragon soaring behind, burning castle in the distance, epic storm clouds.
Quality: 4K, professional digital art in World of Warcraft style, hyper-detailed rendering.
Do not add any unrelated elements.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "⚔️",
    tags: ["Fantasy", "Knight", "Dragon", "Epic"],
    image: "/nano-banana/styles/nb-11-fantasy-knight.png",
  },
  {
    id: "astronaut-nebula",
    titleAr: "رائد الفضاء والسديم",
    titleEn: "Astronaut in Nebula",
    descriptionAr: "رائد فضاء بدلة مستقبلية مع سديم ومجرات مذهلة خلفه.",
    descriptionEn: "Futuristic astronaut in sleek spacesuit with swirling nebula.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم", bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه رائد فضاء مستقبلي في محيط كوني مذهل.
الأسلوب: بدلة فضاء أنيقة متوهجة بتفاصيل تقنية، خوذة لامعة تعكس الكون.
الإضاءة: ضوء كوني بارد من النجوم والسديم، انعكاسات على الخوذة.
الخلفية: سديم دوار ملوّن بالبنفسجي والأزرق والوردي، مجرات بعيدة ونجوم لامعة.
الجودة: دقة NASA السينمائية، 4K، تصوير فضائي احترافي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic astronaut portrait in a stunning cosmic environment.
Style: Sleek futuristic spacesuit with glowing accents, reflective visor showing the galaxy.
Lighting: Cold cosmic light from stars and nebula, visor reflections.
Background: Swirling nebula in purple, blue, and pink tones, distant galaxies, glittering stars.
Quality: NASA cinematic quality, 4K, professional astrophotography composite.
Do not add any unrelated elements.`,
    accent: "#818cf8",
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.2) 0%, rgba(109,40,217,0.08) 100%)",
    emoji: "🚀",
    tags: ["Astronaut", "Nebula", "Space", "NASA"],
    image: "/nano-banana/styles/nb-12-astronaut.png",
  },
  {
    id: "cyberpunk-neon-tokyo",
    titleAr: "سايبربانك نيون طوكيو",
    titleEn: "Cyberpunk Neon Tokyo",
    descriptionAr: "أجواء سايبربانك مع إضاءة نيون وردية وفيروزية في طوكيو الممطرة.",
    descriptionEn: "Cyberpunk 2077 neon aesthetic in rainy Tokyo alleyway.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سايبربانك في طوكيو المستقبلية الليلية الممطرة.
الأسلوب: جمالية Cyberpunk 2077، تعديلات سيبرانية متوهجة، ملابس وسائط عالية التقنية.
الإضاءة: أضواء نيون وردية وفيروزية تعكس على الوجه والمطر، ظلال مدينية معقدة.
الخلفية: زقاق طوكيو الليلي الضيق، إعلانات هولوغرامية يابانية طائفة، مطر ثقيل.
الجودة: فن رقمي سينمائي، 4K، أسلوب Blade Runner 2049 الحديث.
لا تضف أي نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a cyberpunk portrait in a rain-soaked futuristic Tokyo night.
Style: Cyberpunk 2077 aesthetic, glowing cyber augmentations, high-tech streetwear.
Lighting: Pink and cyan neon lights reflecting off face and rain, complex urban shadows.
Background: Narrow Tokyo night alley, floating Japanese holographic advertisements, heavy rain.
Quality: Cinematic digital art, 4K, modern Blade Runner 2049 aesthetic.
Do not add any unrelated text.`,
    accent: "#f472b6",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(34,211,238,0.08) 100%)",
    emoji: "🌃",
    tags: ["Cyberpunk", "Neon", "Tokyo", "Rain"],
    image: "/nano-banana/styles/nb-13-cyberpunk.png",
  },
  {
    id: "ancient-wizard-archmage",
    titleAr: "الساحر الأكبر القديم",
    titleEn: "Ancient Archmage Wizard",
    descriptionAr: "ساحر عجوز قوي مع عصا متوهجة ومكتبة السحر القديم.",
    descriptionEn: "Ancient archmage wizard with crackling magical staff and grimoire library.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ساحر كبير قديم بقوى سحرية هائلة.
الأسلوب: فن خيال ملحمي، عصا سحرية تتشقق بالبرق الأرجواني، رداء طويل منقوش بالرونز المتوهجة.
الإضاءة: ضوء سحري دراماتيكي من العصا، عيون متوهجة بالطاقة السحرية.
الخلفية: مكتبة ضخمة من كتب السحر القديمة تصل للسقف، أعمدة حجرية وشموع طائفة.
الجودة: 4K، رسم رقمي خيال ملحمي، أسلوب Lord of the Rings السينمائي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of an ancient wise archmage with immense magical power.
Style: Epic fantasy art, magical staff crackling with purple lightning, long robe with glowing rune inscriptions.
Lighting: Dramatic magical light from the staff, glowing eyes radiating power.
Background: Towering library of ancient grimoires, stone pillars, floating candles.
Quality: 4K, epic fantasy digital art, Lord of the Rings cinematic style.
Do not add any unrelated elements.`,
    accent: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(124,58,237,0.08) 100%)",
    emoji: "🧙",
    tags: ["Wizard", "Magic", "Fantasy", "Archmage"],
    image: "/nano-banana/styles/nb-14-wizard.png",
  },
  {
    id: "elven-royalty-silver",
    titleAr: "ملكة الإلف بالتاج الفضي",
    titleEn: "High Elven Royalty",
    descriptionAr: "ملكة إلفية راقية بتاج من الكروم الحية في غابة متوهجة.",
    descriptionEn: "High Elven queen with silver living vine crown in enchanted forest.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكة إلفية راقية وأثيرية في غابة سحرية.
الأسلوب: جمال إلفي نقي راقٍ، آذان مدببة أنيقة، تاج فضي من كروم وزهور حية، روب حريري شفاف.
الإضاءة: ضوء بيولومينسنت أخضر ذهبي من الغابة، توهج أثيري هادئ حول الشخص.
الخلفية: غابة مسحورة بحشرات يراعة بيولومينسنت تحوم، أشجار عملاقة قديمة.
الجودة: 4K، فن خيال راقٍ بأسلوب إلف Lord of the Rings.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a regal ethereal High Elven queen portrait in an enchanted forest.
Style: Pure elegant elven beauty, graceful pointed ears, silver crown of living vines and flowers, translucent silk robes.
Lighting: Green-golden bioluminescent light from the forest, ethereal soft glow around subject.
Background: Enchanted forest with bioluminescent fireflies, towering ancient trees.
Quality: 4K, high fantasy art in Lord of the Rings Elves style.
Do not add any unrelated elements.`,
    accent: "#34d399",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(167,243,208,0.08) 100%)",
    emoji: "🧝",
    tags: ["Elven", "Fantasy", "Silver Crown", "Enchanted"],
    image: "/nano-banana/styles/nb-15-elven.png",
  },
  {
    id: "pharaoh-golden-crown",
    titleAr: "فرعون مصري بالتاج الذهبي",
    titleEn: "Egyptian Pharaoh Portrait",
    descriptionAr: "فرعون مصري قديم بتاج ذهبي مزخرف وهيروغليفية.",
    descriptionEn: "Ancient Egyptian pharaoh with ornate golden headdress and pyramids.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فرعون مصري عظيم في كامل مجده الإمبراطوري.
الأسلوب: فرعوني مصري قديم، تاج نمس ذهبي مزخرف بالكوبرا الإلهية، كحل مصري، مجوهرات لازوردية.
الإضاءة: ضوء رسمي دراماتيكي ذهبي كالإله رع، أشعة شمسية جلالية.
الخلفية: الأهرام الثلاث الكبرى مع هيروغليفية ذهبية منحوتة وحراس إلهيون.
الجودة: 4K، تفاصيل تاريخية دقيقة، جودة متحف البريطاني.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of a magnificent Egyptian pharaoh in full imperial splendor.
Style: Ancient Egyptian pharaoh, golden Nemes headdress with divine cobra uraeus, dramatic kohl eye makeup, lapis lazuli jewelry.
Lighting: Dramatic golden formal light like the sun god Ra, majestic solar rays.
Background: The three Great Pyramids with golden carved hieroglyphics and divine guardians.
Quality: 4K, historically accurate details, British Museum quality rendering.
Do not add any unrelated elements.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(212,175,55,0.08) 100%)",
    emoji: "🏺",
    tags: ["Pharaoh", "Egypt", "Ancient", "Golden Crown"],
    image: "/nano-banana/styles/nb-16-pharaoh.png",
  },
  {
    id: "arabian-nights-royal",
    titleAr: "ليالي عربية ملكية",
    titleEn: "Arabian Nights Royalty",
    descriptionAr: "ملكية بألف ليلة وليلة مع قصر وفوانيس ذهبية طائرة.",
    descriptionEn: "Arabian Nights royalty with ornate headdress and glowing lanterns.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكية ألف ليلة وليلة بأجواء شرقية ساحرة.
الأسلوب: ملابس ملكية شرقية فاخرة، غطاء رأس فيروزي وذهبي مرصع بالجواهر، روب حرير مطرّز.
الإضاءة: ضوء فوانيس ذهبية دافئة، توهج برتقالي ذهبي سحري يملأ المشهد.
الخلفية: فناء قصر رخامي ضخم بنافورات وبساتين، فوانيس ذهبية تطفو في الهواء.
الجودة: 4K، تفاصيل نسيج راقية، فن شرقي فاخر.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Arabian Nights royalty portrait with enchanting Eastern atmosphere.
Style: Luxurious royal Eastern attire, ornate turquoise and gold jeweled headdress, embroidered silk robes.
Lighting: Warm golden lantern light, magical golden-orange glow filling the scene.
Background: Grand marble palace courtyard with fountains and gardens, golden lanterns floating in the air.
Quality: 4K, exquisite fabric detail rendering, luxury Oriental art style.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(180,83,9,0.08) 100%)",
    emoji: "🕌",
    tags: ["Arabian Nights", "Royalty", "Lanterns", "Palace"],
    image: "/nano-banana/styles/nb-19-arabian.png",
  },
  {
    id: "roman-emperor-toga",
    titleAr: "إمبراطور روماني",
    titleEn: "Roman Emperor Portrait",
    descriptionAr: "إمبراطور روماني مهيب بالتوغا وإكليل الغار أمام الأعمدة.",
    descriptionEn: "Majestic Roman Emperor in imperial toga with laurel wreath and marble columns.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إمبراطور روماني مهيب في كامل هيبته الإمبراطورية.
الأسلوب: توغا إمبراطورية بنفسجية كلاسيكية مزيّنة، إكليل غار ذهبي، تعبير قيادي سلطوي.
الإضاءة: إضاءة رسمية كلاسيكية تُبرز الكبرياء والجلال، ضوء دراماتيكي.
الخلفية: أعمدة رخامية ضخمة وقوس الانتصار، منظر روما الإمبراطورية.
الجودة: 4K، دقة تاريخية، جودة فيلم ملحمي بأسلوب Gladiator.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of a majestic Roman Emperor in full imperial grandeur.
Style: Classic purple imperial toga, golden laurel wreath, commanding authoritative expression.
Lighting: Formal classical lighting emphasizing power and dignity, dramatic light.
Background: Massive marble columns and triumphal arch, Imperial Rome view.
Quality: 4K, historical accuracy, epic film quality in Gladiator style.
Do not add any unrelated elements.`,
    accent: "#94a3b8",
    gradient: "linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)",
    emoji: "🏛️",
    tags: ["Roman", "Emperor", "Classical", "Toga"],
    image: "/nano-banana/styles/nb-20-roman.png",
  },
  {
    id: "dark-academia-library",
    titleAr: "أكاديمية مظلمة وكتب قديمة",
    titleEn: "Dark Academia Gothic Library",
    descriptionAr: "مكتبة قوطية بأضواء الشموع وأجواء الأكاديمية الغامضة.",
    descriptionEn: "Candlelit Gothic university library with dark academia mystery.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أكاديمية مظلمة بأجواء جامعة قوطية غامضة.
الأسلوب: جماليات Dark Academia، ملابس تويد كلاسيكية، عالم فكري هادئ وغامض.
الإضاءة: ضوء شموع دافئ عنبري، ظلال ناعمة معبّرة، نوافذ زجاجية عتيقة.
الخلفية: مكتبة جامعية قوطية ضخمة، رفوف كتب جلدية ترتفع للسقف، سلالم خشبية عريقة.
الجودة: 4K، درجة ألوان عنبرية دافئة، أسلوب أكسفورد التاريخي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dark academia portrait with mysterious Gothic university atmosphere.
Style: Dark Academia aesthetics, classic tweed clothing, quiet intellectual mood.
Lighting: Warm amber candlelight, expressive soft shadows, antique stained glass windows.
Background: Grand Gothic university library, leather-bound books towering to the ceiling, antique wooden staircases.
Quality: 4K, warm amber color grade, Oxford historical style.
Do not add any unrelated elements.`,
    accent: "#78716c",
    gradient: "linear-gradient(135deg, rgba(120,113,108,0.2) 0%, rgba(92,64,14,0.08) 100%)",
    emoji: "📚",
    tags: ["Dark Academia", "Gothic", "Library", "Oxford"],
    image: "/nano-banana/styles/nb-23-dark-academia.png",
  },
  {
    id: "cottagecore-wildflower",
    titleAr: "كوتيج كور في المرج المزهر",
    titleEn: "Cottagecore Wildflower Meadow",
    descriptionAr: "بورتريه ريفي دافئ في مرج مزهر عند الساعة الذهبية.",
    descriptionEn: "Pastoral cottagecore portrait in a sun-drenched wildflower meadow.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه كوتيج كور ريفي دافئ في مرج زهور برية مشمس.
الأسلوب: جماليات Cottagecore الريفية الأصيلة، قبعة قش منسوجة، ملابس كتانية ناعمة.
الإضاءة: ضوء ذهبي دافئ يتسرب عبر الأعشاب الطويلة، بوكيه خوخي ناعم.
الخلفية: مرج مشمس بالزهور البرية الملونة (بابونج، خشخاش، أقحوان)، أشجار متفرقة.
الجودة: 4K، درجة ألوان فيلم إيجابي دافئة، أسلوب الساعة الذهبية الانطباعي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a warm rural cottagecore portrait in a sun-drenched wildflower meadow.
Style: Authentic Cottagecore pastoral aesthetics, woven straw hat, soft linen clothing.
Lighting: Warm golden light filtering through tall grass, soft peachy bokeh.
Background: Sunny meadow with colorful wildflowers (chamomile, poppies, daisies), scattered trees.
Quality: 4K, warm positive film color grade, golden hour impressionist photography style.
Do not add any unrelated elements.`,
    accent: "#86efac",
    gradient: "linear-gradient(135deg, rgba(134,239,172,0.2) 0%, rgba(74,222,128,0.08) 100%)",
    emoji: "🌻",
    tags: ["Cottagecore", "Wildflower", "Meadow", "Golden Hour"],
    image: "/nano-banana/styles/nb-24-cottagecore.png",
  },
  {
    id: "editorial-flash-lime",
    titleAr: "أزياء إيديتوريال جريء",
    titleEn: "Bold Editorial Fashion",
    descriptionAr: "تصوير أزياء إيديتوريال جريء بخلفية خضراء حارة وفلاش مباشر.",
    descriptionEn: "Stark editorial fashion portrait on lime green background with direct flash.",
    category: "social", categoryLabelAr: "سوشيال ميديا", categoryLabelEn: "Social Media",
    difficulty: "intermediate",
    bestInputAr: "صورة نصف الجسم أو الوجه", bestInputEn: "Half-body or face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أزياء إيديتوريال جريء بأسلوب تصوير معاصر.
الأسلوب: Flat flash photography مباشر، ألوان حادة جريئة، طاقة جيل Z المعاصر.
الإضاءة: فلاش مباشر من الكاميرا، ظلال مسطحة، بدون تدرجات معقدة.
الخلفية: خلفية خضراء ليموني حارة موحدة، بدون فوضى.
الجودة: 4K، جودة مجلة أزياء مطبوعة، صورة حادة واضحة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a bold editorial fashion portrait in contemporary photography style.
Style: Flat direct flash photography, vivid bold colors, modern Gen-Z aesthetic energy.
Lighting: Direct on-camera flash, flat shadows, no complex gradients.
Background: Uniform hot lime green background, no clutter.
Quality: 4K, printed fashion magazine quality, sharp and clear.
Do not add any unrelated elements.`,
    accent: "#4ade80",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.2) 0%, rgba(34,197,94,0.08) 100%)",
    emoji: "💚",
    tags: ["Editorial", "Fashion", "Lime Green", "Gen-Z"],
    image: "/nano-banana/styles/nb-25-editorial.png",
  },
  {
    id: "autumn-leaves-tornado",
    titleAr: "إعصار أوراق الخريف",
    titleEn: "Autumn Leaves Tornado",
    descriptionAr: "بورتريه سحري محاط بإعصار من أوراق الخريف البرتقالية والحمراء.",
    descriptionEn: "Magical portrait surrounded by a tornado of fall maple leaves.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه أو الجسم", bestInputEn: "Clear face or body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سحري محاط بإعصار من أوراق الخريف الاحتراقية.
الأسلوب: موجة لوليّة من أوراق القيقب بألوان الحريق الخريفي، أوراق في حركة متجمدة.
الإضاءة: ضوء خريفي دافئ برتقالي ذهبي، تسريب ضوء ذهبي عبر سحابة الأوراق.
الخلفية: غابة ضبابية ضيقة بأشجار عارية، ضوء خافت دافئ.
الجودة: 4K، تصوير لحظة احترافية، تفاصيل عالية دقيقة لكل ورقة.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical portrait surrounded by a tornado of fiery autumn leaves.
Style: Swirling vortex of maple leaves in autumn fire colors, leaves frozen in motion.
Lighting: Warm orange-golden autumn light, golden light shafts through the leaf cloud.
Background: Narrow misty forest with bare trees, soft warm ambient light.
Quality: 4K, professional moment photography, hyper-detailed individual leaves.
Do not add any unrelated elements.`,
    accent: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "🍂",
    tags: ["Autumn", "Leaves", "Tornado", "Fall"],
    image: "/nano-banana/styles/nb-26-autumn.png",
  },
  {
    id: "cherry-blossom-sakura",
    titleAr: "زخات أزهار الكرز اليابانية",
    titleEn: "Cherry Blossom Sakura Shower",
    descriptionAr: "بورتريه ياباني رومانسي تحت زخة أزهار الكرز الوردية.",
    descriptionEn: "Tender Japanese portrait in a shower of pink cherry blossom petals.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ياباني رومانسي رقيق تحت زخات أزهار الكرز.
الأسلوب: بتلات ساكورا تتساقط كعاصفة وردية بطيئة، جو ياباني ربيعي حالم وعاطفي.
الإضاءة: ضوء ربيعي ناعم منتشر، بوكيه وردي حالم في كل مكان.
الخلفية: مسار ياباني قديم تصطف على جانبيه أشجار كرز متفتحة، معبد في العمق.
الجودة: 4K، درجة ألوان وردية فاتحة حالمة، أسلوب التصوير الياباني الحساس.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a tender romantic Japanese portrait under a shower of cherry blossom petals.
Style: Sakura petals falling like a slow pink blizzard, dreamy emotional Japanese spring atmosphere.
Lighting: Soft diffused spring light, dreamy pink bokeh everywhere.
Background: Ancient Japanese path lined with blooming cherry trees, temple in the distance.
Quality: 4K, dreamy light pink color grade, sensitive Japanese photography style.
Do not add any unrelated elements.`,
    accent: "#f9a8d4",
    gradient: "linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(244,114,182,0.08) 100%)",
    emoji: "🌸",
    tags: ["Cherry Blossom", "Sakura", "Japan", "Spring"],
    image: "/nano-banana/styles/nb-28-cherry.png",
  },
  {
    id: "lightning-storm-drama",
    titleAr: "عاصفة البرق الدرامية",
    titleEn: "Dramatic Lightning Storm",
    descriptionAr: "بورتريه قوي مع بروق متعددة تضرب خلفه في سماء عاصفة.",
    descriptionEn: "Zeus-like portrait with multiple lightning bolts striking behind.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم", bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه قوي دراماتيكي مع عاصفة برق هائلة.
الأسلوب: قوة إلهية هائلة، برق متفرع في السماء، كهرباء في الهواء تشعّ على الجلد.
الإضاءة: وميض برق كثيف فوري، ظلال حادة قاسية، توهج بنفسجي أبيض من البرق.
الخلفية: سماء عاصفة متلاطمة مظلمة، سحب انفجارية، مطر عمودي ثقيل.
الجودة: فوتوريالستيك National Geographic، 4K، تصوير عاصفة احترافي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a powerful dramatic portrait with a massive lightning storm.
Style: God-like immense power, branching lightning across the sky, electricity in the air radiating on skin.
Lighting: Intense instantaneous lightning flash, harsh sharp shadows, purple-white glow from lightning.
Background: Dark churning storm sky, explosive clouds, heavy vertical rain.
Quality: Photorealistic National Geographic quality, 4K, professional storm photography.
Do not add any unrelated elements.`,
    accent: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "⚡",
    tags: ["Lightning", "Storm", "Zeus", "Drama"],
    image: "/nano-banana/styles/nb-29-lightning.png",
  },
  {
    id: "bioluminescent-ocean",
    titleAr: "المحيط البيولومينسنت الليلي",
    titleEn: "Bioluminescent Ocean Night",
    descriptionAr: "على شاطئ محيط متوهج بيولومينسنت بالليل مع درب التبانة.",
    descriptionEn: "Standing at the edge of a glowing bioluminescent ocean with Milky Way reflection.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو الجسم", bestInputEn: "Clear face or body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ليلي سحري عند شاطئ محيط بيولومينسنت.
الأسلوب: توهج البلانكتون البيولومينسنت الأزرق الفيروزي، مشهد طبيعي نادر مُضاء ذاتياً.
الإضاءة: ضوء أزرق فيروزي بيولومينسنت يضيء الشخص من الأسفل، سماء نجومية فوق.
الخلفية: أمواج بيولومينسنت تتكسر على الشاطئ الليلي، انعكاس درب التبانة على الماء.
الجودة: 4K، تصوير طبيعة احترافي، أسلوب وثائقي David Attenborough.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical nighttime portrait at a bioluminescent ocean shore.
Style: Glowing blue-teal bioluminescent plankton, rare self-illuminated natural scene.
Lighting: Blue-teal bioluminescent glow lighting the subject from below, starry sky above.
Background: Bioluminescent waves breaking on the night beach, Milky Way reflection in water.
Quality: 4K, professional nature photography, David Attenborough documentary style.
Do not add any unrelated elements.`,
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(6,182,212,0.08) 100%)",
    emoji: "🌊",
    tags: ["Bioluminescent", "Ocean", "Milky Way", "Night"],
    image: "/nano-banana/styles/nb-30-bioluminescent.png",
  },
  {
    id: "hollywood-teal-orange",
    titleAr: "هوليوود تيل وأورانج",
    titleEn: "Hollywood Teal & Orange Grade",
    descriptionAr: "درجة لون سينمائية هوليوودية بألوان تيل وأورانج مع عدسة أنامورفيك.",
    descriptionEn: "Hollywood blockbuster teal-orange color grade with anamorphic lens flare.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي هوليوودي بدرجة ألوان تيل وأورانج الكلاسيكية.
الأسلوب: LUT سينمائي تيل-أورانج هوليوودي عميق، عدسة أنامورفيك، شخصية بطولة أكشن.
الإضاءة: ضوء أمامي برتقالي دافئ على الجلد مقابل ظلال فيروزية باردة، تباين قوي.
الخلفية: مشهد سينمائي ببوكيه عميق، أضواء خلفية فيروزية خافتة.
الجودة: 8K DCI، معالجة DI احترافية، جودة إنتاج ضخم.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Hollywood cinematic portrait with the classic teal-and-orange color grade.
Style: Deep Hollywood teal-orange LUT, anamorphic lens flare, action hero look.
Lighting: Warm orange front key light on skin contrasted with cool teal shadows, high contrast.
Background: Cinematic scene with deep bokeh, subtle cool teal background accents.
Quality: 8K DCI, professional DI processing, blockbuster production quality.
Do not add any unrelated elements.`,
    accent: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(6,182,212,0.08) 100%)",
    emoji: "🎬",
    tags: ["Hollywood", "Teal & Orange", "Color Grade", "Anamorphic"],
    image: "/nano-banana/styles/nb-31-hollywood.png",
  },
  {
    id: "extreme-bw-grain",
    titleAr: "أبيض وأسود كونتراست شديد",
    titleEn: "Extreme B&W High Contrast",
    descriptionAr: "بورتريه فني أبيض وأسود بكونتراست شديد وحبوب فيلم.",
    descriptionEn: "Extreme high contrast fine art B&W portrait with deep shadows and film grain.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فني بالأبيض والأسود بكونتراست قصوى وحبوب فيلم درامية.
الأسلوب: كونتراست أقصى، سواد عميق كامل وهايلايت منفجر، أسلوب Sebastião Salgado.
الإضاءة: مصدر ضوء واحد قاسٍ جانبي، ظلال لا رحمة فيها، ضوء مباشر حاد.
الخلفية: خلفية تكاد تكون سوداء بالكامل، بدون تشتيت.
الجودة: 4K، حبوب فيلم ISO 3200 دراماتيكية، تطوير Ilford HP5 حاد.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art B&W portrait with extreme high contrast and dramatic film grain.
Style: Maximum contrast, deep crushed blacks and blown highlights, Sebastião Salgado style.
Lighting: Single harsh side light source, merciless shadows, hard direct light.
Background: Near-black dark background with no distractions.
Quality: 4K, dramatic ISO 3200 film grain, sharp Ilford HP5 development.
Do not add any unrelated elements.`,
    accent: "#e2e8f0",
    gradient: "linear-gradient(135deg, rgba(226,232,240,0.2) 0%, rgba(71,85,105,0.08) 100%)",
    emoji: "🖤",
    tags: ["Black & White", "High Contrast", "Film Grain", "Fine Art"],
    image: "/nano-banana/styles/nb-32-extreme-bw.png",
  },
  {
    id: "duotone-cobalt-magenta",
    titleAr: "دوتون كوبالت وماجنتا",
    titleEn: "Duotone Cobalt & Magenta",
    descriptionAr: "بورتريه إيديتوريال بألوان ثنائية الكوبالت الكهربائي والوردي الماجنتا.",
    descriptionEn: "Modern editorial duotone in electric cobalt blue and magenta pink.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيديتوريال حديث بتأثير الدوتون باللونين الكوبالت والماجنتا.
الأسلوب: تأثير Duotone جرافيكي، كوبالت أزرق كهربائي في الظلال، ماجنتا وردي حار في الهايلايت.
الإضاءة: إضاءة موحدة ناعمة لإبراز تأثير الدوتون بالكامل، بدون ظلال معقدة.
الخلفية: خلفية رمادية محايدة أو بيضاء لإبراز اللونين.
الجودة: 4K، جودة تصميم جرافيك غلاف مجلة، أسلوب Andy Warhol الرقمي.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a modern editorial portrait with duotone effect in cobalt and magenta.
Style: Graphic design duotone effect, electric cobalt blue in shadows, hot magenta pink in highlights.
Lighting: Uniform soft lighting to maximize the duotone effect, no complex shadows.
Background: Neutral gray or white background to make the dual colors pop.
Quality: 4K, graphic magazine cover design quality, digital Andy Warhol style.
Do not add any unrelated elements.`,
    accent: "#f472b6",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(96,165,250,0.08) 100%)",
    emoji: "🎭",
    tags: ["Duotone", "Cobalt", "Magenta", "Editorial"],
    image: "/nano-banana/styles/nb-33-duotone.png",
  },
  {
    id: "vintage-sepia-photo",
    titleAr: "صورة سيبيا عتيقة عشرينات القرن",
    titleEn: "1920s Vintage Sepia Photograph",
    descriptionAr: "صورة فوتوغرافية عتيقة بأسلوب عشرينات القرن مع خدوش الفيلم.",
    descriptionEn: "Authentic 1920s faded sepia photograph with Art Deco fashion.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة للوجه", bestInputEn: "Any clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة فوتوغرافية أثرية عتيقة بأسلوب عشرينات القرن العشرين.
الأسلوب: سيبيا باهت بمسحة صفراء قديمة، أزياء آرت ديكو من العشرينات، ملصق موضة فينتاج.
النسيج: خدوش الفيلم والغبار الدقيق، تلاشٍ زمني، حدة مخففة كالصور القديمة.
التأطير: إطار بيضاوي أو مستطيل بحواف ناعمة وتلاشٍ، ورق عتيق في الخلفية.
الجودة: أصالة تاريخية عالية، نسيج ورق صور عتيق، جودة متحف.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an archival vintage photograph in 1920s period style.
Style: Faded sepia with slight yellow cast, Art Deco 1920s fashion, vintage Vogue portrait.
Texture: Film scratches, subtle dust particles, time damage, slightly reduced sharpness.
Framing: Oval or rectangular frame with soft edges and fade, antique paper background.
Quality: High historical authenticity, antique photo paper texture, museum quality.
Do not add any unrelated elements.`,
    accent: "#d97706",
    gradient: "linear-gradient(135deg, rgba(217,119,6,0.2) 0%, rgba(180,83,9,0.08) 100%)",
    emoji: "📷",
    tags: ["1920s", "Vintage", "Sepia", "Art Deco"],
    image: "/nano-banana/styles/nb-34-vintage-sepia.png",
  },
  {
    id: "infrared-surreal",
    titleAr: "تصوير إنفراريد حالم",
    titleEn: "Surreal Infrared Photography",
    descriptionAr: "تأثير التصوير بالإنفراريد مع جلد متوهج وسماء أرجوانية حالمة.",
    descriptionEn: "Infrared photography effect with glowing ethereal skin and surreal purple sky.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سوريالي بتأثير التصوير الإنفراريد الاحترافي.
الأسلوب: محاكاة فيلم إنفراريد، جلد يتوهج بلون أبيض أثيري كالنور الداخلي.
الألوان: سماء سوداء أو بنفسجية داكنة سريالية، أوراق شجر بيضاء لامعة، جلد شفاف متوهج.
الخلفية: مشهد طبيعي بأشجار بيضاء لامعة، سماء دراماتيكية داكنة، غابة حالمة.
الجودة: 4K، محاكاة فيلم Kodak Aerochrome، درجة ألوان Technicolor خيالية.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a surreal portrait with professional infrared photography simulation.
Style: Infrared film simulation, skin glowing ethereal white from within.
Colors: Black or dark surreal purple sky, bright white glowing leaves, translucent ethereal skin.
Background: Natural setting with glowing white trees, dark dramatic sky, dreamlike forest.
Quality: 4K, Kodak Aerochrome film simulation, Technicolor fantasy color grade.
Do not add any unrelated elements.`,
    accent: "#86efac",
    gradient: "linear-gradient(135deg, rgba(134,239,172,0.2) 0%, rgba(167,139,250,0.08) 100%)",
    emoji: "🌿",
    tags: ["Infrared", "Surreal", "Purple Sky", "Ethereal"],
    image: "/nano-banana/styles/nb-35-infrared.png",
  },
  {
    id: "smoke-bomb-crimson",
    titleAr: "انفجار قنبلة الدخان",
    titleEn: "Crimson & Cobalt Smoke Bomb",
    descriptionAr: "تصوير ديناميكي مع انفجارات دخان قرمزي وكوبالتي.",
    descriptionEn: "Dynamic smoke bomb photography with crimson and cobalt explosions.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الجسم كاملة أو نصف الجسم", bestInputEn: "Full or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ديناميكي مع انفجارات قنبلة الدخان القرمزية والكوبالتية.
الأسلوب: تصوير قنبلة دخان عالي الطاقة، دخان قرمزي وكوبالتي يتدفق ويلتف بديناميكية.
الإضاءة: ضوء عاكس من الدخان الملون، ظلال تدريجية ملونة حول الشخص.
الخلفية: خلفية داكنة لإبراز الدخان الملون، بيئة خارجية مفتوحة.
الجودة: 4K، تصوير حركة احترافي، ألوان حيوية متشبعة.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dynamic portrait with crimson and cobalt smoke bomb explosions.
Style: High-energy smoke bomb photography, billowing crimson and cobalt smoke swirling dynamically.
Lighting: Reflected light from the colorful smoke, graduated colored shadows around the subject.
Background: Dark background to highlight the colorful smoke, open outdoor setting.
Quality: 4K, professional action photography, vivid saturated colors.
Do not add any unrelated elements.`,
    accent: "#f87171",
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(96,165,250,0.08) 100%)",
    emoji: "💨",
    tags: ["Smoke Bomb", "Crimson", "Cobalt", "Dynamic"],
    image: "/nano-banana/styles/nb-37-smoke-bomb.png",
  },
  {
    id: "holographic-prismatic",
    titleAr: "ضوء هولوغرافي قوس قزح",
    titleEn: "Holographic Prismatic Rainbow",
    descriptionAr: "انعكاسات قوس قزح البريزمية والهولوغرامية على الوجه.",
    descriptionEn: "Holographic prismatic rainbow light refractions with iridescent glow.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيديتوريال مستقبلي بانعكاسات ضوء هولوغرافي بريزمي.
الأسلوب: انكسار طيفي قوس قزح كامل عبر الوجه، ألوان بريزمية بديعة كفقاعة الصابون.
الإضاءة: ضوء هولوغرافي متشعب من كل الاتجاهات، انعكاسات ملونة تغطي الوجه والجسم.
الخلفية: خلفية بيضاء أو رمادية لإبراز الانكسارات الملونة.
الجودة: 4K، جودة إيديتوريال Vogue مستقبلي، بريزما بصرية عالية الدقة.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic editorial portrait with holographic prismatic light refractions.
Style: Full rainbow spectrum refractions across face, beautiful soap-bubble iridescent colors.
Lighting: Holographic light radiating from all directions, colorful reflections covering face and body.
Background: White or gray background to fully showcase the colorful refractions.
Quality: 4K, futuristic Vogue editorial quality, high-definition optical prism rendering.
Do not add any unrelated elements.`,
    accent: "#c084fc",
    gradient: "linear-gradient(135deg, rgba(192,132,252,0.2) 0%, rgba(34,211,238,0.08) 100%)",
    emoji: "🌈",
    tags: ["Holographic", "Prismatic", "Rainbow", "Iridescent"],
    image: "/nano-banana/styles/nb-38-holographic.png",
  },
  {
    id: "double-exposure-forest",
    titleAr: "التعريض المزدوج غابة وجبال",
    titleEn: "Double Exposure Pine Forest",
    descriptionAr: "تعريض مزدوج فني يمزج صلويت الشخص مع غابة صنوبر وجبال.",
    descriptionEn: "Fine art double exposure blending silhouette with pine forest and mountains.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو الجسم", bestInputEn: "Clear face or body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة فنية بتقنية التعريض المزدوج تمزج الصلويت مع الطبيعة.
الأسلوب: صلويت الشخص مملوء بغابة صنوبر كثيفة وجبال ثلجية، مزج سلس أبيض وأسود.
الألوان: درجة ألوان الساعة الزرقاء الباردة، ألوان معدنية زرقاء وسيانية.
التقنية: مزج طبقات (screen/multiply)، حواف الصلويت حادة وخطية.
الجودة: 4K، تصوير فني تجريدي احترافي، جودة طباعة Fine Art.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art double exposure piece blending silhouette with nature.
Style: Subject silhouette filled with dense pine forest and snowy mountain peaks, seamless B&W blend.
Colors: Cold blue hour color grade, metallic blue and cyan tones.
Technique: Layer blending (screen/multiply), sharp clean silhouette edges.
Quality: 4K, professional abstract fine art photography, Fine Art print quality.
Do not add any unrelated elements.`,
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(52,211,153,0.08) 100%)",
    emoji: "🌲",
    tags: ["Double Exposure", "Pine Forest", "Mountains", "Silhouette"],
    image: "/nano-banana/styles/nb-39-double-exp.png",
  },
  {
    id: "paris-eiffel-golden",
    titleAr: "باريس عند غروب الشمس",
    titleEn: "Paris Golden Hour Eiffel",
    descriptionAr: "بورتريه رومانسي في باريس مع برج إيفل المضيء عند الغروب.",
    descriptionEn: "Romantic Paris portrait with glowing Eiffel Tower at golden hour.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه رومانسي في باريس خلال ساعة الغروب الذهبي.
الأسلوب: أجواء فرنسية رومانسية راقية، ملابس أنيقة باريسية، تعبير دافئ بهيج.
الإضاءة: ضوء غروب ذهبي دافئ يغمر المشهد، هالة ذهبية خلف البرج الشهير.
الخلفية: برج إيفل يتوهج بالذهبي في الخلف، رصيف مقهى باريسي أنيق.
الجودة: 4K، تصوير سفر احترافي، درجة ألوان رومانسية دافئة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a romantic portrait in Paris during golden hour sunset.
Style: Elegant romantic French atmosphere, chic Parisian attire, warm joyful expression.
Lighting: Warm golden sunset light flooding the scene, golden halo behind the iconic tower.
Background: Eiffel Tower glowing golden behind, elegant Parisian sidewalk café.
Quality: 4K, professional travel photography, warm romantic color grade.
Do not add any unrelated elements.`,
    accent: "#f9a8d4",
    gradient: "linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "🗼",
    tags: ["Paris", "Eiffel Tower", "Golden Hour", "Romantic"],
    image: "/nano-banana/styles/nb-41-paris.png",
  },
  {
    id: "underwater-coral-reef",
    titleAr: "تحت الماء في الشعاب المرجانية",
    titleEn: "Underwater Coral Reef Portrait",
    descriptionAr: "بورتريه تحت الماء في شعاب مرجانية ملونة بمياه الكاريبي.",
    descriptionEn: "Vibrant underwater portrait in crystal Caribbean coral reef.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم", bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه احترافي تحت الماء في شعاب مرجانية استوائية زاهية.
الأسلوب: تصوير تحت الماء احترافي، شعاب مرجانية ملونة حية، وزن صفري سلمي.
الإضاءة: أشعة الشمس تخترق الماء بتموجات caustics على الجلد، ضوء أزرق فيروزي ناعم.
الخلفية: شعاب مرجانية استوائية كثيفة، أسماك ملونة تحلق حوله، ماء كريستالي صافٍ.
الجودة: 4K، تصوير تحت الماء احترافي، جودة National Geographic مائي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional underwater portrait in vibrant tropical coral reef.
Style: Professional underwater photography, colorful living coral reefs, peaceful weightlessness.
Lighting: Sunlight rays penetrating the water with caustics rippling on skin, soft blue-teal ambient.
Background: Dense tropical coral reef, colorful tropical fish swimming around, crystal clear water.
Quality: 4K, professional underwater photography, National Geographic aquatic quality.
Do not add any unrelated elements.`,
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(16,185,129,0.08) 100%)",
    emoji: "🐠",
    tags: ["Underwater", "Coral Reef", "Caribbean", "Turquoise"],
    image: "/nano-banana/styles/nb-43-underwater.png",
  },
  {
    id: "nyc-times-square",
    titleAr: "تايمز سكوير نيويورك",
    titleEn: "NYC Times Square Night",
    descriptionAr: "بورتريه في تايمز سكوير مع لافتات LED ضخمة وحيوية المدينة.",
    descriptionEn: "Portrait in blazing Times Square with massive LED billboards.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه حضري نابض في تايمز سكوير نيويورك الليلي.
الأسلوب: تصوير وثائقي شارعي حضري، طاقة نيويورك الحيوية الليلية المتوثبة.
الإضاءة: إضاءة متعددة المصادر من اللافتات LED الضخمة بألوان مختلطة جريئة.
الخلفية: لافتات LED ضخمة تغطي كل شيء، سيارات أجرة صفراء في حركة، حشود المارة.
الجودة: 4K، تصوير شارعي احترافي ليلي، أسلوب المصور الصحفي.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a vibrant urban portrait at night in Times Square, New York City.
Style: Urban street documentary photography, pulsating NYC night energy.
Lighting: Multi-source lighting from massive LED billboards in bold mixed colors.
Background: Massive LED billboards covering everything, moving yellow taxis, crowds of pedestrians.
Quality: 4K, professional nighttime street photography, photojournalist style.
Do not add any unrelated elements.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "🗽",
    tags: ["NYC", "Times Square", "LED", "New York"],
    image: "/nano-banana/styles/nb-44-nyc.png",
  },
  {
    id: "santorini-greek-isle",
    titleAr: "سانتوريني اليونانية",
    titleEn: "Santorini Greek Island",
    descriptionAr: "بورتريه في سانتوريني مع المباني البيضاء والقباب الزرقاء.",
    descriptionEn: "Portrait in iconic Santorini with white Cycladic buildings and blue domes.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيجابي مشمس في جزيرة سانتوريني اليونانية الأيقونية.
الأسلوب: أجواء متوسطية دافئة، مبانٍ بيضاء ناصعة دوارية، قباب كنائس زرقاء فاقعة.
الإضاءة: ضوء شمسي متوسطي ساطع ودافئ، انعكاس الشمس على البحر الأزرق.
الخلفية: معمارية سيكلاديك بيضاء أيقونية، قباب كنائس زرقاء، بحر إيجه الفيروزي.
الجودة: 4K، تصوير سفر احترافي، درجة ألوان متوسطية مشرقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sunny positive portrait on the iconic Greek island of Santorini.
Style: Warm Mediterranean atmosphere, brilliant white Cycladic buildings, vivid blue church domes.
Lighting: Bright warm Mediterranean sunlight, sun reflection on the blue sea.
Background: Iconic white Cycladic architecture, blue church domes, turquoise Aegean sea.
Quality: 4K, professional travel photography, bright Mediterranean color grade.
Do not add any unrelated elements.`,
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(34,211,238,0.08) 100%)",
    emoji: "🇬🇷",
    tags: ["Santorini", "Greece", "Mediterranean", "Blue Domes"],
    image: "/nano-banana/styles/nb-45-santorini.png",
  },
  {
    id: "celestial-angel",
    titleAr: "ملاك سماوي بأجنحة ريش",
    titleEn: "Celestial Angel Portrait",
    descriptionAr: "بورتريه ملاك سماوي بأجنحة ريش بيضاء ضخمة وضوء إلهي.",
    descriptionEn: "Celestial angel with enormous white feathered wings and divine golden light.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملاك سماوي إلهي بأجنحة ريش ضخمة وضوء إلهي.
الأسلوب: ملاك سماوي نقي راقٍ، أجنحة ريش بيضاء ضخمة منتشرة بالكامل، تعبير هادئ حكيم.
الإضاءة: أشعة ضوء ذهبية إلهية تنهمر من السماء، هالة ذهبية، توهج أبيض أثيري.
الخلفية: سحب سماوية بيضاء ناعمة ولامعة، سماء أزرق سماوي، أشعة ذهبية تنتشر.
الجودة: 4K، فن مقدس راقٍ، أسلوب لوحات سقف كنائس النهضة الإيطالية.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a celestial divine angel portrait with enormous feathered wings and divine light.
Style: Pure regal celestial angel, enormous white feathered wings fully spread, serene wise expression.
Lighting: Golden divine light rays pouring from heaven, golden halo, ethereal white glow.
Background: Soft glowing white heavenly clouds, sky blue background, spreading golden rays.
Quality: 4K, high sacred art quality, Italian Renaissance church ceiling painting style.
Do not add any unrelated elements.`,
    accent: "#fef9c3",
    gradient: "linear-gradient(135deg, rgba(254,249,195,0.3) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "👼",
    tags: ["Angel", "Celestial", "Wings", "Divine"],
    image: "/nano-banana/styles/nb-47-angel.png",
  },
  {
    id: "post-apocalyptic-survivor",
    titleAr: "ناجٍ من نهاية العالم",
    titleEn: "Post-Apocalyptic Survivor",
    descriptionAr: "بورتريه جريء لناجٍ في مدينة مدمرة مع إضاءة قاسية.",
    descriptionEn: "Gritty post-apocalyptic survivor in ruined cityscape with harsh light.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "advanced",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه جريء لناجٍ في عالم ما بعد نهاية الكون.
الأسلوب: جماليات The Last of Us / Mad Max، ملابس متهالكة مُرقّعة، وجه يروي قصة النجاة.
الإضاءة: ضوء قاسٍ حاد من مصدر واحد، رماد وغبار في الهواء يتسرب الضوء منها.
الخلفية: مدينة كبرى منهارة محترقة، مبانٍ متهالكة، طبيعة تستعيد أرضها.
الجودة: 4K، جودة إنتاج لعبة AAA أو فيلم خيال علمي احترافي.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a gritty portrait of a survivor in a post-apocalyptic world.
Style: The Last of Us / Mad Max aesthetics, worn patched clothing, face showing a survival story.
Lighting: Harsh direct light from a single source, dust and ash in the air diffusing the light.
Background: Collapsed burned major city, crumbling buildings, nature reclaiming the ruins.
Quality: 4K, AAA game or professional sci-fi film production quality.
Do not add any unrelated elements.`,
    accent: "#f87171",
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(120,53,15,0.08) 100%)",
    emoji: "🌆",
    tags: ["Post-Apocalyptic", "Survivor", "Ruined City", "Gritty"],
    image: "/nano-banana/styles/nb-48-apocalyptic.png",
  },
  {
    id: "royal-throne-velvet",
    titleAr: "عرش ملكي مع مخمل وتاج",
    titleEn: "Royal Throne Portrait",
    descriptionAr: "بورتريه ملكي مهيب على عرش مزخرف مع مخمل وتاج.",
    descriptionEn: "Regal royal portrait on ornate throne with velvet crimson robes and jeweled crown.",
    category: "professional", categoryLabelAr: "احترافي", categoryLabelEn: "Professional",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكي مهيب بكامل أبهة العرش والتاج.
الأسلوب: بورتريه ملكي رسمي، روب مخمل قرمزي ذهبي الحدود، تاج مرصع بالجواهر الكريمة.
الإضاءة: إضاءة قاعة العرش المسرحية الدراماتيكية، مصادر ضوء متعددة رسمية.
الخلفية: عرش مزخرف فخم من الذهب والخشب الأصيل، قاعة قصر ضخمة بستائر حرير ذهبية.
الجودة: 4K، أسلوب بورتريه الحكام الرسمي، جودة فنان البلاط الملكي.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a majestic royal portrait in full throne and crown splendor.
Style: Formal royal portrait, crimson velvet robe with gold trim, jeweled crown studded with precious gems.
Lighting: Dramatic theatrical throne room lighting, multiple formal light sources.
Background: Ornate gold and antique wood throne, grand palace hall with golden silk curtains.
Quality: 4K, formal ruler portrait style, royal court painter quality.
Do not add any unrelated elements.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(180,83,9,0.08) 100%)",
    emoji: "👑",
    tags: ["Royal", "Throne", "Crown", "Velvet"],
    image: "/nano-banana/styles/nb-49-royal-throne.png",
  },
  {
    id: "sci-fi-holo-interface",
    titleAr: "واجهة هولوغرامية مستقبلية",
    titleEn: "Sci-Fi Holographic Interface",
    descriptionAr: "محاط بلوحات واجهة هولوغرامية طائفة وتدفقات بيانات.",
    descriptionEn: "Surrounded by floating holographic panels, cascading code and data streams.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "advanced",
    bestInputAr: "صورة واضحة للوجه أو نصف الجسم", bestInputEn: "Clear face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه خيال علمي محاط بلوحات واجهة هولوغرامية مستقبلية.
الأسلوب: جماليات Minority Report الحديثة، لوحات واجهة هولوغرامية شفافة طائرة، تدفقات بيانات.
الإضاءة: ضوء سيان مستقبلي بارد يعكس من اللوحات على الوجه، بيئة تقنية متوهجة.
الخلفية: فضاء مكتبي مستقبلي مظلم مع شاشات هولوغرامية لا حصر لها، مدينة مضيئة من خلف.
الجودة: 4K، جودة إنتاج فيلم خيال علمي ضخم، تأثيرات بصرية احترافية.
لا تضف أي نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sci-fi portrait surrounded by futuristic holographic interface panels.
Style: Modern Minority Report aesthetics, transparent floating holographic panels, cascading data streams.
Lighting: Cold cyan futuristic light reflecting from panels onto face, glowing tech environment.
Background: Dark futuristic workspace with countless holographic screens, lit city visible behind.
Quality: 4K, major sci-fi blockbuster production quality, professional VFX.
Do not add any unrelated text.`,
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🤖",
    tags: ["Sci-Fi", "Holographic", "Interface", "Minority Report"],
    image: "/nano-banana/styles/nb-50-sci-fi.png",
  },

  // ── Batch: Toy & Doll Styles ──────────────────────────────
  {
    id: "ghibli-portrait-hd",
    titleAr: "بورتريه جيبلي عالي الدقة",
    titleEn: "Studio Ghibli HD Portrait",
    descriptionAr: "بورتريه دقيق الفنية بأسلوب جيبلي مع إضاءة سحرية.",
    descriptionEn: "High-fidelity Ghibli anime portrait with magical soft lighting.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه في إضاءة جيدة", bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أنمي دقيق الجودة بأسلوب استوديو جيبلي عالي الدقة.
الأسلوب: أنيميشن جيبلي عالي الجودة، ملمس ريشي زيتي ناعم، ألوان دافئة غنية.
الإضاءة: إضاءة جيبلي السحرية الشهيرة، ضوء طبيعي مُرشَّح ناعم.
الخلفية: خلفية خضراء كثيفة بأسلوب رسوم جيبلي المتقن، أشجار وضوء شمسي.
الجودة: جودة 2K أنيميشن استوديو، تفاصيل دقيقة في الشعر والعيون والتعابير.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-fidelity anime portrait in detailed Studio Ghibli style.
Style: High-quality Ghibli animation, soft painterly oil-like texture, warm rich colors.
Lighting: Famous Ghibli magical lighting, soft natural filtered light.
Background: Dense green background in Ghibli's meticulous art style, trees and sunlight.
Quality: 2K studio animation quality, detailed rendering of hair, eyes, and expressions.
Do not add any unrelated elements.`,
    accent: "#34d399",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(74,222,128,0.08) 100%)",
    emoji: "🌿",
    tags: ["Ghibli", "Anime", "Painterly", "HD"],
    image: "/nano-banana/styles/nb-ghibli-hd.png",
  },
  {
    id: "chibi-3d-portrait",
    titleAr: "شخصية تشيبي ثلاثية الأبعاد",
    titleEn: "3D Chibi Character",
    descriptionAr: "شخصية تشيبي 3D مبهجة برأس كبير وجسم صغير.",
    descriptionEn: "Adorable 3D Chibi character with large head and small body.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه في إضاءة جيدة", bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية تشيبي ثلاثية الأبعاد مبهجة بنسبة رأس إلى جسم 1:2.
الأسلوب: شخصية Super Deformed تشيبي، رأس ضخم جذاب وجسم صغير بسيط.
التفاصيل: عيون كبيرة لامعة معبّرة جداً، تعبير وجه لطيف مبهج، شعر مفصل.
الإضاءة: إضاءة استوديو 3D لطيفة دافئة، ظلال ناعمة على ملمس اللعبة.
الخلفية: خلفية بيضاء نظيفة أو تدرجية ناعمة لإبراز الشخصية.
الجودة: 4K render ثلاثي الأبعاد، جودة لعبة Next-Gen.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a joyful 3D Chibi character with a 1:2 head-to-body ratio.
Style: Super Deformed Chibi character, large attractive head and small simple body.
Details: Large luminous very expressive eyes, adorable joyful expression, detailed hair.
Lighting: Gentle warm 3D studio lighting, soft shadows on the toy-like texture.
Background: Clean white or soft gradient background to showcase the character.
Quality: 4K 3D render, Next-Gen game quality.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "🎎",
    tags: ["Chibi", "3D", "Cute", "Toy Art"],
    image: "/nano-banana/styles/nb-chibi-3d.png",
  },
  {
    id: "action-fig-collector-v2",
    titleAr: "مجسم في صندوق جامع",
    titleEn: "Collector Action Figure Box",
    descriptionAr: "شخصية داخل صندوق جامع احترافي بنافذة بلاستيكية شفافة.",
    descriptionEn: "Action figure packaged in a professional collector's toy box.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة نصف الجسم أو كاملة", bestInputEn: "Half or full-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Action Figure داخل صندوق جامع احترافي عالي الجودة.
الأسلوب: صندوق لعبة بلاستيكي تجاري احترافي، نافذة شفافة تُظهر الشخصية بوضوح.
التفاصيل: طباعة صندوق ملونة مُصمَّمة باحترافية، علامة "Limited Edition 2026"، اسم الشخصية.
الإضاءة: إضاءة منتج استوديو احترافية موزعة بشكل متساوٍ.
الخلفية: خلفية بيضاء نظيفة لتصوير منتج تجاري أنيق.
الجودة: 4K، تصوير منتج احترافي، جودة إعلان تجاري.
لا تضف أي نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an action figure character inside a professional high-quality collector toy box.
Style: High-quality commercial plastic toy box, transparent window clearly showcasing the figure.
Details: Professionally designed colorful box printing, "Limited Edition 2026" label, character name.
Lighting: Professional studio product lighting, evenly distributed.
Background: Clean white background for clean commercial product photography.
Quality: 4K, professional product photography, commercial advertisement quality.
Do not add any unrelated text.`,
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.08) 100%)",
    emoji: "📦",
    tags: ["Action Figure", "Collector Box", "Toy", "Packaging"],
    image: "/nano-banana/styles/nb-action-fig-v2.png",
  },
  {
    id: "funko-pop-vinyl",
    titleAr: "شخصية فانكو بوب فينيل",
    titleEn: "Funko Pop Vinyl Figure",
    descriptionAr: "بورتريه بأسلوب دمية فانكو بوب الأيقونية برأس ضخم.",
    descriptionEn: "Iconic Funko Pop vinyl figure with oversized head and button eyes.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه", bestInputEn: "Face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية فانكو بوب فينيل أيقونية بالرأس الضخم والملامح المبسطة.
الأسلوب: فانكو بوب Classic فينيل، رأس ضخم بنسبة 1:3، عيون زرار سوداء كبيرة.
التفاصيل: ملامح وجه مبسطة أيقونية، ملابس الشخصية مُبسَّطة، نسب مميزة Funko.
الإضاءة: إضاءة استوديو 3D منتج، ملمس بلاستيك فينيل مطفأ ناعم.
الخلفية: صندوق فانكو بوب الأيقوني بنافذة شفافة، تصميم غلاف احترافي.
الجودة: 4K render ثلاثي الأبعاد، جودة Funko الرسمية.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an iconic Funko Pop vinyl figure with oversized head and simplified features.
Style: Classic Funko Pop vinyl, 1:3 oversized head, large black button eyes.
Details: Iconic simplified facial features, simplified character clothing, signature Funko proportions.
Lighting: 3D product studio lighting, smooth matte vinyl plastic texture.
Background: Iconic Funko Pop windowed collector box, professional cover design.
Quality: 4K 3D render, official Funko quality standard.
Do not add any unrelated elements.`,
    accent: "#8ed5ff",
    gradient: "linear-gradient(135deg, rgba(142,213,255,0.2) 0%, rgba(99,102,241,0.08) 100%)",
    emoji: "🧸",
    tags: ["Funko Pop", "Vinyl Figure", "Collector", "Toy"],
    image: "/nano-banana/styles/nb-funko-pop.png",
  },
  {
    id: "nendoroid-figure",
    titleAr: "شخصية نيندرويد أنمي",
    titleEn: "Nendoroid Anime Figure",
    descriptionAr: "شخصية نيندرويد أنمي سوبر ديفورمد مع مفاصل مرئية.",
    descriptionEn: "Super-deformed Nendoroid anime figure with visible joints.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه في إضاءة جيدة", bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية نيندرويد Super Deformed أنمي بمفاصل مرئية.
الأسلوب: نيندرويد Super Deformed الأيقوني، رأس كبير متناسق، جسم صغير قصير.
التفاصيل: وجه أنمي لطيف معبّر، مفاصل مرئية للذراعين والساقين، ملابس مُبسَّطة مفصلة.
الإضاءة: إضاءة استوديو ثلاثية الأبعاد ناعمة، ملمس مطفأ راقٍ.
الخلفية: قاعدة نيندرويد البيضاء الشفافة القياسية، أو خلفية بسيطة نظيفة.
الجودة: 4K render ثلاثي الأبعاد دقيق، جودة Good Smile Company.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an iconic Super Deformed Nendoroid anime figure with visible joints.
Style: Iconic Nendoroid Super Deformed, large proportional head, small short body.
Details: Cute expressive anime face, visible arm and leg joints, simplified detailed clothing.
Lighting: Soft 3D studio lighting, refined matte texture finish.
Background: Standard transparent white Nendoroid base, or clean simple background.
Quality: Detailed 4K 3D render, Good Smile Company product quality.
Do not add any unrelated elements.`,
    accent: "#f87171",
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(244,114,182,0.08) 100%)",
    emoji: "✨",
    tags: ["Nendoroid", "Anime Figure", "Super Deformed", "Cute"],
    image: "/nano-banana/styles/nb-nendoroid.png",
  },
  {
    id: "plush-stuffed-toy",
    titleAr: "لعبة قطيفة محشوة",
    titleEn: "Plush Stuffed Toy",
    descriptionAr: "تحويل بورتريه إلى لعبة قطيفة ناعمة مع تفاصيل خياطة.",
    descriptionEn: "Portrait transformed into a soft plush stuffed toy with stitched details.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم", bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ نسخة لعبة قطيفة محشوة دافئة ومحببة.
الأسلوب: لعبة قطيفة ناعمة بملمس قماش واضح ومحبوب، وجه بتعبير لطيف ودود.
التفاصيل: تفاصيل خياطة مرئية واضحة، عيون أزرار أو خيط، شعر ناعم قطيفة.
الإضاءة: إضاءة دافئة مريحة مغمورة، ضوء ناعم يبرز ملمس القطيفة.
الخلفية: خلفية دافئة ناعمة أو بيضاء نظيفة، أجواء منزلية مريحة.
الجودة: 4K render فائق الدقة، تفاصيل قماشية دقيقة جداً.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a warm loveable plush stuffed toy version.
Style: Soft plush toy with visible fabric texture, face with kind friendly expression.
Details: Clearly visible stitching details, button or thread eyes, soft fuzzy hair.
Lighting: Warm comfortable ambient lighting, soft light showcasing the plush texture.
Background: Soft warm or clean white background, cozy home atmosphere.
Quality: Hyperrealistic 4K render, very detailed fabric textures.
Do not add any unrelated elements.`,
    accent: "#d0bcff",
    gradient: "linear-gradient(135deg, rgba(208,188,255,0.2) 0%, rgba(244,114,182,0.08) 100%)",
    emoji: "🧸",
    tags: ["Plush", "Stuffed Toy", "Soft", "Cozy"],
    image: "/nano-banana/styles/nb-plush-toy.png",
  },
  {
    id: "barbie-dreamhouse",
    titleAr: "أسلوب باربي دريم هاوس",
    titleEn: "Barbie Dreamhouse Style",
    descriptionAr: "جمالية باربي الوردية البراقة مع شعر وماكياج مثالي.",
    descriptionEn: "Vibrant pink Barbie aesthetic with glamorous plastic look.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم", bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه بأسلوب عالم باربي دريم هاوس الوردي الزاهي.
الأسلوب: جماليات باربي أيقونية، ثيم وردي كانزاسي فاقع، بلاستيك لامع مثالي، كمال متصنّع.
التفاصيل: شعر مثالي مشفر، ماكياج لامع مثالي، ملابس موضة عالية جذابة.
الإضاءة: إضاءة وردية دافئة ناعمة من كل الاتجاهات، توهج مثالي.
الخلفية: غرفة دريم هاوس وردية لامعة، ديكورات باربي المميزة.
الجودة: 4K، جودة بلاستيك لامع فاخر، أسلوب إعلان Mattel Barbie.
لا تضف أي عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait in the vibrant pink Barbie Dreamhouse aesthetic.
Style: Iconic Barbie aesthetics, vivid hot pink theme, perfect shiny plastic, artificial perfection.
Details: Perfectly set hair, perfect glossy makeup, high-glamour fashion attire.
Lighting: Soft warm pink lighting from all directions, perfect soft glow.
Background: Gleaming pink Dreamhouse room, signature Barbie décor.
Quality: 4K, luxury shiny plastic quality, Mattel Barbie advertisement style.
Do not add any unrelated elements.`,
    accent: "#f9a8d4",
    gradient: "linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(244,114,182,0.08) 100%)",
    emoji: "👱",
    tags: ["Barbie", "Pink", "Dreamhouse", "Glamorous"],
    image: "/nano-banana/styles/nb-barbie.png",
  },
  {
    id: "bratz-doll-y2k",
    titleAr: "دمية براتز Y2K",
    titleEn: "Bratz Doll Y2K Aesthetic",
    descriptionAr: "جمالية دمية براتز Y2K مع عيون لوزية كبيرة وأزياء الألفية.",
    descriptionEn: "Bratz Doll Y2K aesthetic with large almond eyes and 2000s fashion.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه أو نصف الجسم", bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه بجمالية دمية براتز Y2K بأسلوب الألفينات الجريء.
الأسلوب: جمالية براتز Y2K الأيقونية، عيون لوزية كبيرة جريئة مع خط عيون سميك.
التفاصيل: شفاه لامعة مبالغ فيها، تعبير شخصية قوي، ملابس موضة الألفينات الجريئة.
الإضاءة: إضاءة براقة جريئة ساطعة، ألوان حيوية متشبعة.
الخلفية: خلفية ملونة جريئة أو بيئة موضة الألفينات.
الجودة: 4K، جودة دمية بلاستيكية براقة، أسلوب إعلان MGA Entertainment.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait in the bold Bratz Doll Y2K aesthetic.
Style: Iconic Bratz Y2K aesthetic, large bold almond eyes with heavy eyeliner.
Details: Exaggerated glossy lips, strong personality expression, bold 2000s fashion clothing.
Lighting: Bright bold vivid lighting, highly saturated colors.
Background: Bold colorful background or 2000s fashion environment.
Quality: 4K, glossy plastic doll quality, MGA Entertainment advertisement style.
Do not add any unrelated elements.`,
    accent: "#8ed5ff",
    gradient: "linear-gradient(135deg, rgba(142,213,255,0.2) 0%, rgba(208,188,255,0.08) 100%)",
    emoji: "💄",
    tags: ["Bratz", "Y2K", "2000s", "Doll Aesthetic"],
    image: "/nano-banana/styles/nb-bratz-y2k.png",
  },
  {
    id: "pop-mart-blind-box",
    titleAr: "دمية بوب مارت الصندوق المغلق",
    titleEn: "Pop Mart Blind Box Figure",
    descriptionAr: "شخصية بوب مارت فنية بإنهاء راتنج ناعم وتفاصيل خيالية.",
    descriptionEn: "Pop Mart designer blind box figure with smooth resin finish.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه", bestInputEn: "Face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية بوب مارت Designer Toy بأسلوب الصندوق المغلق الفني.
الأسلوب: جمالية لعبة مصمم راتنجي، ملمس راتنج ناعم مطفأ، تفاصيل نقية دقيقة الحرفية.
الألوان: لوحة ألوان باستيل حالمة مع تفاصيل متناقضة، أسلوب MOLLY أو DIMOO.
التفاصيل: تعبير عيون مُبسَّط حالم، ملامح نقية مختصرة، نسب شخصية مميزة.
الخلفية: تصوير منتج راقٍ على قاعدة شفافة، خلفية ناعمة متدرجة.
الجودة: 4K render راتنجي فائق الدقة، جودة تصوير منتج Pop Mart الرسمية.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Pop Mart Designer Toy character in blind box art style.
Style: Designer resin toy aesthetic, smooth matte resin finish, pure detailed craftsmanship.
Colors: Dreamy pastel color palette with contrasting details, MOLLY or DIMOO style.
Details: Simplified dreamy eye expression, pure minimal features, distinctive character proportions.
Background: Premium product photography on transparent base, soft gradient background.
Quality: Hyperrealistic 4K resin render, official Pop Mart product photography quality.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(249,168,212,0.08) 100%)",
    emoji: "🎁",
    tags: ["Pop Mart", "Blind Box", "Designer Toy", "Resin"],
    image: "/nano-banana/styles/nb-pop-mart.png",
  },

  // ── Batch: Nano Banana Prompt Lab Styles ──────────────────
  {
    id: "art-deco-flapper",
    titleAr: "آرت ديكو عشرينات القرن",
    titleEn: "1920s Art Deco Flapper",
    descriptionAr: "جمالية آرت ديكو الذهبية والسوداء بأنماط هندسية من عشرينات القرن.",
    descriptionEn: "Vintage 1920s Art Deco flapper style with gold and black geometric patterns.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه أو نصف الجسم", bestInputEn: "Face or half-body photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فينتاج بجماليات آرت ديكو عشرينات القرن الذهبية.
الأسلوب: أيقونية آرت ديكو الذهبية والسوداء، أنماط هندسية نقية رشيقة من عشرينات القرن.
التفاصيل: ملابس فلابر أنيقة بتفاصيل ذهبية، إكسسوارات من عقد اللؤلؤ وعصابة الرأس.
الإضاءة: إضاءة دراماتيكية كلاسيكية ذهبية من جانب واحد.
الخلفية: خلفية أنماط آرت ديكو هندسية ذهبية وسوداء، أسلوب ملصق فينتاج.
الجودة: 4K، أسلوب Erté الأيقوني، جودة فن رسم فيكتور راقٍ.
لا تضف أي نصوص أو عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a vintage portrait in golden 1920s Art Deco aesthetics.
Style: Iconic Art Deco gold and black, clean elegant geometric patterns from the 1920s.
Details: Elegant flapper outfit with gold details, pearl necklace and headband accessories.
Lighting: Classic dramatic single-side golden lighting.
Background: Art Deco geometric gold and black pattern background, vintage poster style.
Quality: 4K, iconic Erté style, high-quality fine art vector illustration.
Do not add any unrelated text or elements.`,
    accent: "#d97706",
    gradient: "linear-gradient(135deg, rgba(217,119,6,0.2) 0%, rgba(0,0,0,0.08) 100%)",
    emoji: "🎭",
    tags: ["Art Deco", "1920s", "Flapper", "Geometric"],
    image: "/nano-banana/styles/nb-art-deco.png",
  },
  {
    id: "funko-pop-3d-box",
    titleAr: "فانكو بوب ثلاثي الأبعاد احترافي",
    titleEn: "3D Funko Pop Studio",
    descriptionAr: "شخصية فانكو بوب ثلاثية الأبعاد بجودة استوديو احترافية.",
    descriptionEn: "Professional 3D Funko Pop vinyl figure with studio-quality render.",
    category: "fun", categoryLabelAr: "ترفيه", categoryLabelEn: "Fun",
    difficulty: "beginner",
    bestInputAr: "صورة الوجه", bestInputEn: "Face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية فانكو بوب ثلاثية الأبعاد بجودة استوديو احترافية عالية.
الأسلوب: فانكو بوب Classic فينيل 3D عالي الجودة، رأس ضخم مُبسَّط بشكل مثالي، نسب Funko أيقونية.
التفاصيل: عيون زرار مطفأة كبيرة، ملامح مُبسَّطة متقنة، ملابس الشخصية بتفاصيل دقيقة.
الإضاءة: إضاءة منتج استوديو احترافية ثلاثية، ملمس بلاستيك فينيل مطفأ راقٍ.
الخلفية: صندوق فانكو بوب الرسمي المُصمَّم باحترافية، خلفية بيضاء لتصوير المنتج.
الجودة: 8K render ثلاثي الأبعاد، معايير Funko الرسمية، جودة إعلان.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-quality studio-grade 3D Funko Pop figure.
Style: High-quality Classic Funko Pop Vinyl 3D, perfectly simplified oversized head, iconic Funko proportions.
Details: Large matte button eyes, refined simplified features, detailed character clothing.
Lighting: Professional triple studio product lighting, refined matte vinyl plastic texture.
Background: Professionally designed official Funko Pop box, white background for product photography.
Quality: 8K 3D render, official Funko standards, advertisement quality.
Do not add any unrelated elements.`,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)",
    emoji: "🏆",
    tags: ["Funko Pop", "3D", "Studio", "Collectible"],
    image: "/nano-banana/styles/nb-funko-3d-box.png",
  },
  {
    id: "cinematic-8k-studio",
    titleAr: "بورتريه سينمائي استوديو 8K",
    titleEn: "Cinematic Hollywood Studio 8K",
    descriptionAr: "بورتريه سينمائي هوليوودي بإضاءة استوديو احترافية بجودة 8K.",
    descriptionEn: "Professional Hollywood cinematic portrait with studio lighting at 8K.",
    category: "portrait", categoryLabelAr: "بورتريه", categoryLabelEn: "Portrait",
    difficulty: "intermediate",
    bestInputAr: "صورة واضحة للوجه", bestInputEn: "Clear face photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي هوليوودي بإضاءة استوديو احترافية متكاملة.
الأسلوب: بورتريه هوليوود احترافي للنجم، إضاءة استوديو ثلاثية النقطة متقنة.
الإضاءة: إضاءة ثلاثية النقطة (Key/Fill/Rim) متقنة، درجة ألوان سينمائية عميقة.
الخلفية: خلفية داكنة أو بوكيه ناعم سينمائي.
الجودة: 8K render HDR، معايير إنتاج هوليوود الحقيقي، مستوى حملة تصوير كبرى.
لا تضف أي نصوص أو عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional Hollywood cinematic portrait with complete studio lighting.
Style: Professional Hollywood star portrait, masterful three-point studio lighting.
Lighting: Expertly executed Key/Fill/Rim three-point lighting, deep cinematic color grade.
Background: Dark or soft cinematic bokeh background.
Quality: 8K HDR render, true Hollywood production standards, major campaign level.
Do not add any unrelated text or elements.`,
    accent: "#94a3b8",
    gradient: "linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)",
    emoji: "🎬",
    tags: ["Cinematic", "Hollywood", "Studio", "8K"],
    image: "/nano-banana/styles/nb-cinematic-studio.png",
  },
  {
    id: "oil-painting-master",
    titleAr: "لوحة زيتية كلاسيكية نهضوية",
    titleEn: "Classical Oil Painting Master",
    descriptionAr: "لوحة زيتية كلاسيكية بضربات فرشاة غنية وملمس قماش نهضوي.",
    descriptionEn: "Classical oil painting with thick brushstrokes and rich Renaissance textures.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "صورة الوجه في إضاءة جيدة", bestInputEn: "Face photo with good lighting",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة زيتية كلاسيكية بأسلوب مشايخ الرسم النهضويين.
الأسلوب: لوحة زيتية نهضة إيطالية كلاسيكية، ضربات فرشاة سميكة مرئية غنية، تدرجات عميقة.
الألوان: ألوان زيتية دافئة عميقة متشبعة، تناغم لوني من المدرسة الفلمنكية.
النسيج: نسيج قماش مشدود واضح، طبقات زيتية متعددة، تفاصيل جلد وشعر عالية الدقة.
الخلفية: خلفية داكنة دافئة كلاسيكية تبرز الوجه، بأسلوب إضاءة رامبرانت.
الجودة: جودة متحف فني عالمي، 8K تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a classical oil painting in the style of Renaissance master painters.
Style: Italian Renaissance classical oil painting, richly visible thick brushstrokes, deep gradients.
Colors: Deep warm saturated oil colors, Flemish school color harmony.
Texture: Visible stretched canvas texture, multiple oil layers, highly detailed skin and hair.
Background: Classic dark warm background highlighting the face, Rembrandt lighting style.
Quality: World art museum quality, 8K ultra-detailed rendering.
Do not add any unrelated elements.`,
    accent: "#92400e",
    gradient: "linear-gradient(135deg, rgba(146,64,14,0.2) 0%, rgba(212,175,55,0.08) 100%)",
    emoji: "🖼️",
    tags: ["Oil Painting", "Classical", "Renaissance", "Brushstrokes"],
    image: "/nano-banana/styles/nb-oil-classic.png",
  },
  {
    id: "cyberpunk-rain-digital",
    titleAr: "فن رقمي سايبربانك مدينة ممطرة",
    titleEn: "Cyberpunk Rain City Digital Art",
    descriptionAr: "فن رقمي سايبربانك مع شوارع ممطرة متلألئة وأضواء نيون.",
    descriptionEn: "Cyberpunk neon city digital art with glowing futuristic lights and rain.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "intermediate",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ فناً رقمياً سايبربانك بمدينة مستقبلية ممطرة ونيون متوهج.
الأسلوب: فن رقمي سايبربانك احترافي، مدينة مستقبلية بائسة بأضواء نيون ساطعة.
الإضاءة: أضواء نيون وردية وبنفسجية وفيروزية تعكس على الشوارع المبللة، تأثير مطري.
الخلفية: مشهد مدينة مستقبلية شاهق، مبانٍ معدنية مع إعلانات هولوغرامية، مطر متواصل.
الجودة: 4K، فن مفهوم سينمائي احترافي، أسلوب Blade Runner / Ghost in the Shell.
لا تضف أي نصوص أو عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create professional cyberpunk digital art in a rainy futuristic neon city.
Style: Professional cyberpunk digital concept art, dystopian futuristic city with blazing neon lights.
Lighting: Pink, purple, and cyan neon lights reflecting on rain-slicked streets, rain effect.
Background: Towering futuristic cityscape, metallic buildings with holographic advertisements, continuous rain.
Quality: 4K, professional cinematic concept art, Blade Runner / Ghost in the Shell style.
Do not add any unrelated text or elements.`,
    accent: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.08) 100%)",
    emoji: "🌆",
    tags: ["Cyberpunk", "Neon City", "Digital Art", "Rain"],
    image: "/nano-banana/styles/nb-cyber-city.png",
  },
  {
    id: "stained-glass-cathedral",
    titleAr: "زجاج ملون كنيسة كاتدرائية",
    titleEn: "Stained Glass Cathedral Art",
    descriptionAr: "فن الزجاج الملون بأسلوب الكاتدرائيات مع ألوان زاهية وأنماط معقدة.",
    descriptionEn: "Vibrant cathedral stained glass art with intricate patterns and divine light.",
    category: "art", categoryLabelAr: "فن", categoryLabelEn: "Art",
    difficulty: "beginner",
    bestInputAr: "أي صورة واضحة", bestInputEn: "Any clear photo",
    promptAr: `استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عملاً فنياً بأسلوب الزجاج الملون القوطي الكاتدرائي الراقي.
الأسلوب: فن الزجاج الملون القوطي الكلاسيكي، ألوان زاهية متشبعة وجريئة، خطوط رصاص سوداء واضحة.
الألوان: ألوان كاتدرائية راقية (أزرق كوبالت، أحمر قرمزي، ذهبي، أخضر زمردي)، شفافية الزجاج.
التفاصيل: خطوط رصاص "lead lines" محيطة بكل قطعة، تفاصيل وجه مُبسَّطة بأسلوب قوطي.
الإضاءة: أشعة ضوء إلهية تخترق الزجاج، ألوان الزجاج تصبغ المشهد.
الجودة: 4K، نسيج زجاج قوطي أصيل، أسلوب كاتدرائية Notre-Dame.
لا تضف أي نصوص أو عناصر غير مرتبطة.`,
    promptEn: `Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a piece of art in the Gothic cathedral stained glass style.
Style: Classic Gothic stained glass art, vibrant saturated bold colors, clear black lead lines.
Colors: Regal cathedral colors (cobalt blue, crimson, gold, emerald), glass transparency.
Details: Lead lines surrounding each glass piece, simplified Gothic-style face details.
Lighting: Divine light rays piercing through glass, colored light tinting the scene.
Quality: 4K, authentic Gothic glass texture, Notre-Dame Cathedral style.
Do not add any unrelated text or elements.`,
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(239,68,68,0.08) 100%)",
    emoji: "⛪",
    tags: ["Stained Glass", "Cathedral", "Gothic", "Divine Light"],
    image: "/nano-banana/styles/nb-stained-glass.png",
  },
];

export const nanaBananaCategories: { id: NanaBananaCategory; labelAr: string; labelEn: string }[] = [
  { id: "portrait", labelAr: "بورتريه", labelEn: "Portrait" },
  { id: "art", labelAr: "فن", labelEn: "Art" },
  { id: "product", labelAr: "منتج", labelEn: "Product" },
  { id: "social", labelAr: "سوشيال ميديا", labelEn: "Social Media" },
  { id: "fun", labelAr: "ترفيه", labelEn: "Fun" },
  { id: "professional", labelAr: "احترافي", labelEn: "Professional" },
];

export const nanaBananaDifficulties: { id: NanaBananaDifficulty; labelAr: string; labelEn: string; color: string }[] = [
  { id: "beginner", labelAr: "مبتدئ", labelEn: "Beginner", color: "#22c55e" },
  { id: "intermediate", labelAr: "متوسط", labelEn: "Intermediate", color: "#f59e0b" },
  { id: "advanced", labelAr: "متقدم", labelEn: "Advanced", color: "#ef4444" },
];
