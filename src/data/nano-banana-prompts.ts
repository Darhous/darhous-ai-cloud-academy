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
