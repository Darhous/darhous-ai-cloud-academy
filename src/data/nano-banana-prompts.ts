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
