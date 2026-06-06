-- ══════════════════════════════════════════════════════════════════
-- v21 — Nano Banana: seed static prompts into DB
-- Run in: Supabase Dashboard → SQL Editor
-- Safe to re-run: uses source_slug unique constraint
-- ══════════════════════════════════════════════════════════════════

-- Step 1: Add source_slug column for idempotent inserts
ALTER TABLE nano_banana_custom_prompts
  ADD COLUMN IF NOT EXISTS source_slug TEXT;

-- Step 2: Add unique constraint on source_slug (safe re-run)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'nano_banana_custom_prompts_source_slug_key'
  ) THEN
    ALTER TABLE nano_banana_custom_prompts
      ADD CONSTRAINT nano_banana_custom_prompts_source_slug_key
      UNIQUE (source_slug);
  END IF;
END $$;

-- Step 3: Insert all static prompts (ON CONFLICT DO NOTHING = idempotent)
INSERT INTO nano_banana_custom_prompts (
  title_ar, title_en, description_ar, description_en,
  category, category_label_ar, category_label_en,
  difficulty, best_input_ar, best_input_en,
  prompt_ar, prompt_en,
  accent, gradient, emoji, tags, featured,
  image_url, status, source_slug
) VALUES
  (
    'تمثال Collectible ثلاثي الأبعاد', '3D Collectible Figurine',
    'حوّل صورتك إلى تمثال بلاستيكي قابل للتحصيل بأسلوب ألعاب الفن الحديثة.', 'Transform your photo into a premium plastic collectible figurine with modern toy-art aesthetics.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تمثالاً بلاستيكياً ثلاثي الأبعاد بأسلوب Collectible Toy Art.
الأسلوب: تمثال بلاستيكي لامع عالي التفاصيل، ألوان حيوية، إضاءة استوديو متخصصة.
التركيب: التمثال على قاعدة زجاجية شفافة، خلفية بيضاء أو رمادية فاتحة.
الإضاءة: إضاءة ناعمة من الأعلى مع انعكاسات على السطح اللامع.
جودة: 8K، تصوير منتج احترافي، تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة بالتمثال.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-gloss 3D plastic collectible figurine in the style of designer toy art.
Style: Premium vinyl figurine, vibrant colors, studio-grade lighting with surface reflections.
Composition: Figurine on a clear acrylic base, clean white or light gray background.
Lighting: Soft overhead light with specular highlights on the plastic surface.
Quality: 8K, professional product photography, hyper-detailed rendering.
Do not add any unrelated text or elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)', '🏆',
    ARRAY['3D', 'Collectible', 'Toy', 'Figurine'], true,
    NULL, 'published', '3d-collectible-figurine'
  ),
  (
    'علبة Action Figure', 'Action Figure Box',
    'حوّل نفسك إلى شخصية أكشن داخل علبة لعبة أصلية بتصميم احترافي.', 'Turn yourself into an action figure packaged in a branded toy box.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة كاملة للجسم أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Action Figure داخل علبة لعبة مُصممة احترافياً.
الأسلوب: علبة لعبة بلاستيكية تجارية، نافذة شفافة تُظهر الشخصية، خلفية وإطار ملون.
التفاصيل: اكتب على العلبة "Limited Edition" واسم يعكس هوية الشخص العامة.
الجودة: صورة منتج احترافية، إضاءة استوديو، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an action figure packaged inside a professional toy box.
Style: Retail plastic toy box with blister packaging, transparent window showing the figure, colorful graphic background.
Details: "Limited Edition" label, bold title reflecting the subject''s general persona.
Quality: Professional product shot, studio lighting, 4K render.',
    '#3b82f6', 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.08) 100%)', '📦',
    ARRAY['Action Figure', 'Toy Box', 'Packaging'], true,
    NULL, 'published', 'action-figure-box'
  ),
  (
    'بورتريه سينمائي احترافي', 'Cinematic Profile Portrait',
    'تحويل صورتك إلى لقطة سينمائية بأسلوب أفلام هوليوود.', 'Transform your photo into a dramatic Hollywood-style cinematic portrait.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه في إضاءة جيدة', 'Clear face photo with decent lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي بأسلوب هوليوود مع إضاءة دراماتيكية.
الأسلوب: Cinematic portrait، لون فيلم "teal and orange"، عمق ميدان ضيق.
الإضاءة: Rembrandt lighting، ظلال ناعمة، تدرج لوني عميق.
الخلفية: بوكيه متناسق، ألوان داكنة دافئة.
الجودة: 8K، Canon EF 85mm f/1.4، RAW processing.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dramatic cinematic portrait in Hollywood style.
Style: Cinematic color grade with teal-and-orange LUT, shallow depth of field.
Lighting: Rembrandt lighting pattern, soft gradients, deep tonal contrast.
Background: Consistent bokeh, warm dark tones.
Quality: 8K, Canon EF 85mm f/1.4 equivalent, cinematic RAW processing.',
    '#ef4444', 'linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(251,113,133,0.06) 100%)', '🎬',
    ARRAY['Cinematic', 'Portrait', 'Hollywood', 'Color Grade'], true,
    NULL, 'published', 'cinematic-portrait'
  ),
  (
    'غلاف مجلة فاخر', 'Luxury Magazine Cover',
    'اجعل صورتك غلاف مجلة فاخرة بتصميم احترافي عالي المستوى.', 'Turn your photo into a premium luxury magazine cover.',
    'professional', 'احترافي', 'Professional',
    'intermediate', 'صورة نصف الجسم أو الوجه في إضاءة جيدة', 'Upper-body or face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف مجلة راقية وفاخرة.
التصميم: غلاف مجلة احترافي بنمط Vogue/Forbes، خطوط عناوين أنيقة، شعار مجلة وهمي.
الألوان: ذهبي، كريمي، أبيض وأسود أنيق.
الإضاءة: High-key lighting، إضاءة استوديو بيضاء ناعمة.
النص: عناوين عامة وهمية (لا تستخدم أسماء حقيقية).
الجودة: Print-ready، 300dpi، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a luxury premium magazine cover.
Design: Professional magazine cover in Vogue/Forbes style, elegant headline typography, fictional magazine logo.
Colors: Gold, cream, clean black and white elegance.
Lighting: High-key studio lighting, soft white fill.
Text: Generic placeholder headlines (no real names or brands).
Quality: Print-ready, 300dpi, 4K.',
    '#d4af37', 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(245,158,11,0.06) 100%)', '📔',
    ARRAY['Magazine', 'Luxury', 'Cover', 'Vogue Style'], false,
    NULL, 'published', 'luxury-magazine-cover'
  ),
  (
    'بوستر مدينة سايبربانك', 'Cyberpunk City Poster',
    'ضع صورتك في عالم مستقبلي نيوني مع مدينة سايبربانك.', 'Place yourself in a neon-lit futuristic cyberpunk cityscape.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للشخص، يُفضل الجسم كاملاً', 'Clear person photo, full body preferred',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر Cyberpunk مستقبلي لمدينة نيونية.
الأسلوب: Cyberpunk 2077 aesthetic، مدينة مستقبلية، إضاءة نيون زرقاء وبنفسجية وبنزهرية.
البيئة: أبراج زجاجية، لافتات نيون، أمطار على الأرض.
الشخصية: مدمجة في المشهد كبطل في عالم مستقبلي.
الجودة: Movie poster quality، 4K، تصميم تشويقي.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic cyberpunk city poster.
Style: Cyberpunk 2077 aesthetic with neon-lit urban environment, blue/purple/magenta glow.
Environment: Glass skyscrapers, neon signs, rain-soaked reflective streets.
Character: Integrated into the scene as a hero in a dystopian future world.
Quality: Movie poster quality, 4K, dramatic composition.',
    '#8b5cf6', 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.08) 100%)', '🌆',
    ARRAY['Cyberpunk', 'Neon', 'Futuristic', 'City Poster'], true,
    NULL, 'published', 'cyberpunk-city-poster'
  ),
  (
    'فيلم كلاسيكي التسعينات', 'Vintage 90s Film Look',
    'أعد صورتك إلى جماليات الفيلم الكلاسيكي في التسعينات.', 'Give your photo a nostalgic analog film look from the 90s.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
طبّق أسلوب فيلم التسعينات الكلاسيكي الأنالوجي.
الأسلوب: Film grain، ألوان دافئة مُشبعة، grain texture واضح.
التلوين: Faded highlights، lifted shadows، Kodak Gold color palette.
الإطار: Soft vignette على الأطراف.
الإضاءة: ضوء طبيعي دافئ، Golden hour feeling.
الجودة: صورة فيلم 35mm محاكاة، تأثير authentic analog.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Apply a nostalgic 90s analog film aesthetic.
Style: Film grain texture, warm saturated tones, visible grain.
Color: Faded highlights, lifted shadows, Kodak Gold color palette.
Frame: Soft vignette around edges.
Lighting: Warm natural light, golden hour feeling.
Quality: 35mm film simulation, authentic analog look.',
    '#f97316', 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(251,191,36,0.06) 100%)', '📸',
    ARRAY['Vintage', '90s', 'Film', 'Analog', 'Nostalgic'], false,
    NULL, 'published', 'vintage-90s-film'
  ),
  (
    'جدار الذكريات بولارويد', 'Polaroid Memory Wall',
    'حوّل صورتك إلى مجموعة صور بولارويد على لوح فليني.', 'Create a charming Polaroid memory wall collage from your photo.',
    'art', 'فن', 'Art',
    'beginner', 'صورة واحدة واضحة أو أكثر', 'One or more clear photos',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مجموعة صور بولارويد كلاسيكية على جدار خشبي دافئ.
الأسلوب: صور بولارويد حقيقية المظهر، يد مكتوبة فارغة بالأسفل، دبابيس خشبية.
الترتيب: 4-6 صور مُرتبة بشكل طبيعي وغير متناظر.
الخلفية: جدار خشبي دافئ أو لوح فليني.
الإضاءة: ضوء طبيعي دافئ من نافذة جانبية.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a charming Polaroid photo wall collage.
Style: Authentic-looking Polaroid prints with handwritten caption space, wooden pins.
Layout: 4-6 photos arranged naturally and asymmetrically.
Background: Warm wooden wall or cork board.
Lighting: Warm natural window light.',
    '#10b981', 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(52,211,153,0.06) 100%)', '🖼️',
    ARRAY['Polaroid', 'Memory', 'Collage', 'Vintage'], false,
    NULL, 'published', 'polaroid-memory-wall'
  ),
  (
    'صورة LinkedIn الاحترافية', 'Professional LinkedIn Headshot',
    'احصل على صورة بروفايل احترافية بجودة استوديو لـ LinkedIn.', 'Get a studio-quality professional headshot perfect for LinkedIn.',
    'professional', 'احترافي', 'Professional',
    'beginner', 'صورة للوجه في أي إضاءة', 'Face photo in any lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة بروفايل احترافية لـ LinkedIn.
الأسلوب: Headshot استوديو احترافي، خلفية رمادية/بيضاء ناعمة.
الإضاءة: Three-point studio lighting، ناعمة ومتوازنة.
الزاوية: أمامية أو نصف الجسم، تعبير واثق وودود.
الملابس: محترفة وأنيقة (إذا كانت ظاهرة).
الجودة: LinkedIn profile quality، 4K، حواف حادة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional LinkedIn profile headshot.
Style: Corporate studio headshot, clean gray or white background.
Lighting: Three-point studio lighting, soft and balanced.
Angle: Front-facing or half-body, confident and approachable expression.
Attire: Professional and polished (if visible).
Quality: LinkedIn-ready, 4K, sharp edges.',
    '#0a66c2', 'linear-gradient(135deg, rgba(10,102,194,0.18) 0%, rgba(56,189,248,0.06) 100%)', '💼',
    ARRAY['LinkedIn', 'Headshot', 'Professional', 'Corporate'], false,
    NULL, 'published', 'linkedin-headshot'
  ),
  (
    'إعلان منتج AI احترافي', 'AI Product Advertisement',
    'ضع صورتك في إعلان منتج تقني لامع ومبهر.', 'Feature yourself in a sleek tech product advertisement.',
    'product', 'منتج', 'Product',
    'advanced', 'صورة نصف الجسم أو كاملة', 'Half-body or full photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ إعلان منتج تقني احترافي بأسلوب Apple/Google.
الأسلوب: إعلان منتج عالي التقنية، خلفية داكنة مُدرجة، عناصر UI/UX خلف الشخص.
العناصر: شاشات تقنية floating، أيقونات AI، خطوط نيون.
الإضاءة: Rim light أزرق/بنفسجي من الخلف، Key light أمامي.
النص: "Powered by AI" أو عبارة عامة فقط.
الجودة: Commercial ad quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sleek tech product advertisement in Apple/Google style.
Style: High-tech product ad, dark gradient background, floating UI/UX elements.
Elements: Floating screens, AI icons, neon accent lines.
Lighting: Blue/violet rim light from behind, soft key light in front.
Text: Only generic text like "Powered by AI".
Quality: Commercial ad quality, 4K.',
    '#6366f1', 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 100%)', '📱',
    ARRAY['Advertisement', 'Tech', 'AI', 'Product'], false,
    NULL, 'published', 'ai-product-ad'
  ),
  (
    'بوستر خلفية الجوال', 'Phone Wallpaper Poster',
    'حوّل صورتك إلى بوستر فني جاهز لاستخدامه خلفية للجوال.', 'Transform your photo into a stunning phone wallpaper-ready poster.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر فني بنسبة أبعاد 9:16 مثالي كخلفية جوال.
الأسلوب: خلفية جوال فنية عصرية، تدرج لوني جميل، عناصر فنية طائفة.
التكوين: الشخص في المركز أو الثلث السفلي، مساحة للنص في الأعلى.
الألوان: تدرج بنفسجي/أزرق/أسود أو اختار ألوانًا تناسب الصورة.
الجودة: 4K portrait، مُحسّن للشاشات الحديثة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic poster in 9:16 ratio perfect as a phone wallpaper.
Style: Modern artistic phone wallpaper, beautiful color gradient, floating artistic elements.
Composition: Subject centered or in lower third, space for text at top.
Colors: Purple/blue/black gradient or colors matching the subject''s aesthetic.
Quality: 4K portrait orientation, optimized for modern displays.',
    '#a855f7', 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.08) 100%)', '📲',
    ARRAY['Wallpaper', 'Phone', 'Poster', 'Vertical'], false,
    NULL, 'published', 'phone-wallpaper-poster'
  ),
  (
    'مشهد ديوراما مصغّر', 'Miniature Diorama Scene',
    'ضع صورتك في عالم ديوراما مصغّر مبهر ومثير للخيال.', 'Place yourself in a charming miniature diorama world.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة كاملة أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهد ديوراما مصغّر جميل.
الأسلوب: Tilt-shift miniature effect، عالم صغير مُفصّل، ألوان حيوية.
البيئة: مشهد مدني أو طبيعي مصغّر، أشخاص صغار، مبانٍ مُصغّرة.
التركيب: الشخص يبدو عملاقًا في عالم صغير، عمق ميدان واضح.
الجودة: Tilt-shift photography simulation، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a charming miniature diorama scene.
Style: Tilt-shift miniature effect, detailed tiny world, vivid colors.
Environment: Miniature urban or nature scene with tiny people and buildings.
Composition: Subject appears giant in a miniature world, clear depth of field.
Quality: Tilt-shift photography simulation, 4K.',
    '#22c55e', 'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(16,185,129,0.06) 100%)', '🌍',
    ARRAY['Miniature', 'Diorama', 'Tilt-Shift', 'Tiny World'], false,
    NULL, 'published', 'miniature-diorama'
  ),
  (
    'أسلوب ملصقات Sticker Pack', 'Sticker Pack Style',
    'حوّل صورتك إلى شخصية ملصقات رقمية بأسلوب كرتوني.', 'Turn your photo into cute digital sticker characters.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه', 'Face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مجموعة ملصقات رقمية كرتونية.
الأسلوب: Cartoon sticker style، خطوط خارجية سميكة بيضاء، ألوان حيوية مُشبعة.
التعبيرات: 6 ملصقات مختلفة تعبر عن مشاعر مختلفة.
الخلفية: شفافة أو بيضاء نقية.
الجودة: Vector-like quality، clean edges، 4K PNG style.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a digital cartoon sticker pack.
Style: Cute cartoon sticker style, bold white outline, vivid saturated colors.
Expressions: 6 stickers showing different emotions.
Background: Transparent or pure white.
Quality: Vector-like quality, clean edges, 4K PNG style.',
    '#f472b6', 'linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(251,191,36,0.08) 100%)', '🎨',
    ARRAY['Sticker', 'Cartoon', 'Emoji', 'Fun'], false,
    NULL, 'published', 'sticker-pack-style'
  ),
  (
    'بطاقة رياضية Trading Card', 'Sports Trading Card',
    'صوّر نفسك كبطل رياضي على بطاقة جمع رياضية احترافية.', 'Feature yourself as a champion on a professional sports trading card.',
    'fun', 'ترفيه', 'Fun',
    'intermediate', 'صورة كاملة للجسم أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة رياضية Trading Card احترافية.
التصميم: إطار بطاقة رياضية احترافية، خلفية حيوية مع نمط هندسي، إحصاءات وهمية عامة.
الألوان: ذهبي، أحمر، أزرق أو ألوان تناسب الشخص.
النص: وضع تسمية عامة وهمية (مثل "MVP Player").
الجودة: Collector card print quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional sports trading card.
Design: Professional sports card frame, dynamic background with geometric pattern, fictional generic stats.
Colors: Gold, red, blue or colors matching the subject.
Text: Generic placeholder label (e.g., "MVP Player").
Quality: Collector card print quality, 4K.',
    '#ef4444', 'linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(245,158,11,0.08) 100%)', '🏅',
    ARRAY['Sports Card', 'Trading Card', 'MVP', 'Collector'], false,
    NULL, 'published', 'sports-trading-card'
  ),
  (
    'بطاقة سفر Postcard', 'Travel Postcard',
    'أنشئ بطاقة بريدية سياحية جميلة من صورتك.', 'Create a beautiful travel postcard from your photo.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة مع أو بدون شخص', 'Any photo with or without a person',
    'استخدم الصورة المرفقة كمرجع أساسي.
أنشئ بطاقة بريدية سياحية كلاسيكية.
التصميم: إطار بطاقة بريدية كلاسيكية، خط كتابة جميل، طوابع وهمية.
الأسلوب: Vintage travel postcard، ألوان دافئة.
النص: عنوان وجهة عامة وهمي فقط، لا تستخدم أسماء حقيقية.
الجودة: Print-quality postcard، 4K.', 'Use the uploaded image as the primary reference.
Create a classic travel postcard.
Design: Classic postcard frame, elegant handwriting font, fictional stamps.
Style: Vintage travel postcard aesthetic, warm tones.
Text: Generic fictional destination name only, no real place names required.
Quality: Print-quality postcard, 4K.',
    '#84cc16', 'linear-gradient(135deg, rgba(132,204,22,0.18) 0%, rgba(34,197,94,0.06) 100%)', '✈️',
    ARRAY['Postcard', 'Travel', 'Vintage', 'Tourism'], false,
    NULL, 'published', 'travel-postcard'
  ),
  (
    'التعرض المزدوج Surreal', 'Surreal Double Exposure',
    'دمج صورتك مع مناظر طبيعية أو معمارية في أسلوب فني مذهل.', 'Blend your photo with landscapes in a stunning artistic double exposure.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه أو الجسم', 'Clear face or body silhouette',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تأثير التعرض المزدوج الفني.
الأسلوب: Double exposure photography art، دمج الشخص مع منظر طبيعي (غابة، سماء، مدينة).
التلوين: أبيض وأسود مع لمسات لون واحد (أزرق أو ذهبي).
التركيب: صورة الشخص كإطار للمنظر الداخلي.
الجودة: Fine art photography, 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a surreal double exposure photography effect.
Style: Double exposure art blending the person with a landscape (forest, sky, city).
Color: Black and white with a single accent color (blue or gold).
Composition: Subject''s silhouette framing the interior landscape.
Quality: Fine art photography, 8K.',
    '#3ce0fb', 'linear-gradient(135deg, rgba(60,224,251,0.2) 0%, rgba(99,102,241,0.06) 100%)', '🌌',
    ARRAY['Double Exposure', 'Surreal', 'Fine Art', 'Silhouette'], true,
    NULL, 'published', 'double-exposure'
  ),
  (
    'غلاف موسيقى نيوني', 'Neon Music Cover Art',
    'أنشئ غلاف ألبوم موسيقي نيوني لامع بأسلوب عصري مثير.', 'Create a neon-glowing music album cover in a bold modern style.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف ألبوم موسيقي نيوني.
الأسلوب: Music album cover art، نيون glow، خلفية داكنة مُتدرجة.
الألوان: Neon pink/purple/cyan على خلفية سوداء عميقة.
العناصر: تأثيرات نيون، موجات صوت خلفية، إضاءة ريم نيونية.
النص: فارغ أو "Artist Name" عامة فقط.
الجودة: Streaming platform cover, 4K square format.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a neon music album cover.
Style: Music album cover art, neon glow effects, dark gradient background.
Colors: Neon pink/purple/cyan on deep black background.
Elements: Neon effects, sound wave patterns in background, neon rim lighting.
Text: Leave blank or generic "Artist Name" placeholder only.
Quality: Streaming platform ready, 4K square format.',
    '#ec4899', 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(139,92,246,0.08) 100%)', '🎵',
    ARRAY['Music Cover', 'Album Art', 'Neon', 'Glow'], false,
    NULL, 'published', 'neon-music-cover'
  ),
  (
    'بوستر خط عربي فني', 'Arabic Calligraphy Poster',
    'دمج صورتك مع فن الخط العربي في تصميم بوستر راقٍ.', 'Blend your photo with Arabic calligraphy in an elegant poster design.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر فني يجمع الصورة مع فن الخط العربي.
الأسلوب: فن خط عربي كلاسيكي، زخارف إسلامية، ألوان ذهبية وعاجية.
التكوين: الصورة كخلفية ناعمة، فوقها خط عربي جميل بعبارة إيجابية عامة.
الألوان: ذهبي، بورجندي، أزرق فاخر.
الجودة: Print-quality art poster, 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic poster blending the photo with Arabic calligraphy.
Style: Classic Arabic calligraphy art, geometric Islamic patterns, gold and ivory tones.
Composition: Photo as soft background, beautiful Arabic calligraphy overlaid with a general positive phrase.
Colors: Gold, burgundy, deep blue.
Quality: Print-quality art poster, 4K.',
    '#d4af37', 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.08) 100%)', '✍️',
    ARRAY['Arabic', 'Calligraphy', 'Islamic Art', 'Poster'], false,
    NULL, 'published', 'arabic-calligraphy-poster'
  ),
  (
    'تصميم مصغرة YouTube', 'YouTube Thumbnail Style',
    'أنشئ تصميم مصغرة YouTube مبهر يضمن أعلى نسبة نقر.', 'Create a high-CTR YouTube thumbnail that demands attention.',
    'social', 'سوشيال ميديا', 'Social Media',
    'beginner', 'صورة نصف الجسم مع تعبير واضح', 'Half-body photo with expressive face',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مصغّرة YouTube مبهرة وعالية النقرات.
الأسلوب: YouTube thumbnail احترافي، خلفية حيوية، تعبيرات مبالغ بها تعبيريًا.
العناصر: خلفية ملونة حيوية، نصوص عريضة لامعة عامة، سهم أو عناصر تشويقية.
الألوان: أصفر/أحمر/أزرق ساطع.
الجودة: 1280x720 HD quality، print-sharp.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-CTR YouTube thumbnail.
Style: Professional YouTube thumbnail, dynamic background, exaggerated expressive reaction.
Elements: Vivid background, bold glowing text placeholders, arrows or attention elements.
Colors: Bright yellow/red/blue.
Quality: 1280x720 HD quality, print-sharp.',
    '#ef4444', 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(245,158,11,0.08) 100%)', '▶️',
    ARRAY['YouTube', 'Thumbnail', 'Content Creator', 'CTR'], true,
    NULL, 'published', 'youtube-thumbnail'
  ),
  (
    'بطاقة هوية مستقبلية', 'Futuristic ID Card Mockup',
    'أنشئ بطاقة هوية خيالية مستقبلية بأسلوب سايبربانك.', 'Create a fictional sci-fi futuristic ID card in cyberpunk style.',
    'fun', 'ترفيه', 'Fun',
    'intermediate', 'صورة الوجه واضحة', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة هوية خيالية مستقبلية.
التصميم: بطاقة هوية رقمية مستقبلية، هولوجرام، شريط بيانات مُشفّر.
الأسلوب: Cyberpunk ID card، ألوان زرقاء/سيان، رموز رقمية.
البيانات: معلومات خيالية عامة (رقم عشوائي، رتبة خيالية).
الجودة: High-detail graphic design, 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fictional futuristic ID card.
Design: Digital future identity card with hologram effects, encrypted data strip.
Style: Cyberpunk ID card, blue/cyan color scheme, digital code patterns.
Data: All fictional generic data (random number, fictional rank).
Quality: High-detail graphic design, 4K.',
    '#06b6d4', 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🪪',
    ARRAY['ID Card', 'Futuristic', 'Sci-Fi', 'Hologram'], false,
    NULL, 'published', 'futuristic-id-card'
  ),
  (
    'علبة لعبة Toy Packaging', 'Toy Packaging Mockup',
    'صمّم علبة لعبة احترافية تحتوي على شخصيتك.', 'Design a professional toy packaging box featuring your likeness.',
    'fun', 'ترفيه', 'Fun',
    'intermediate', 'صورة كاملة أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ علبة لعبة احترافية بتصميم تجاري عالي الجودة.
التصميم: علبة لعبة ورقية بألوان حيوية، نوافذ عرض، شعار وهمي، وصف لعبة وهمي.
الأسلوب: Retail toy packaging، صور الشخصية على الجوانب.
الألوان: زرق/أحمر/أصفر أو ألوان مميزة.
الجودة: Product packaging design quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional toy packaging box with high-quality commercial design.
Design: Retail toy box with vivid colors, display windows, fictional logo, fictional product description.
Style: Retail toy packaging, character images on sides.
Colors: Blue/red/yellow or distinctive brand colors.
Quality: Product packaging design quality, 4K.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.08) 100%)', '🎁',
    ARRAY['Toy Packaging', 'Box Design', 'Retail', 'Product'], false,
    NULL, 'published', 'toy-packaging'
  ),
  (
    'أنمي ياباني فني', 'Anime Character Portrait',
    'حوّل صورتك إلى شخصية أنمي يابانية بأسلوب استوديو احترافي.', 'Transform your photo into a Japanese anime character in professional studio style.',
    'art', 'فن', 'Art',
    'beginner', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
حوّل الصورة إلى شخصية أنمي يابانية بأسلوب استوديو احترافي.
الأسلوب: Anime art style، عيون كبيرة، خطوط واضحة ونظيفة، إضاءة ناعمة.
الألوان: ألوان مشبعة وحيوية مع تدرجات ناعمة.
الخلفية: بسيطة أو gradient خفيف يناسب الشخصية.
الجودة: High-quality anime illustration، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Transform the photo into a Japanese anime character in professional studio style.
Style: Anime art style with large expressive eyes, clean linework, soft shading.
Colors: Vibrant saturated colors with smooth gradients.
Background: Simple or light gradient complementing the character.
Quality: High-quality anime illustration, 4K.',
    '#f472b6', 'linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(139,92,246,0.08) 100%)', '⛩️',
    ARRAY['Anime', 'Japanese', 'Art Style', 'Illustration'], true,
    NULL, 'published', 'anime-portrait'
  ),
  (
    'بورتريه ألوان مائية', 'Watercolor Portrait',
    'حوّل صورتك إلى لوحة ألوان مائية فنية رائعة.', 'Transform your photo into a beautiful artistic watercolor painting.',
    'art', 'فن', 'Art',
    'beginner', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة ألوان مائية فنية.
الأسلوب: Watercolor painting، حواف ناعمة ومتداخلة، تدفق الألوان الطبيعي، ملمس الورق واضح.
الألوان: ألوان دافئة أو باردة حسب مزاج الصورة، شفافية اللون محفوظة.
الخلفية: بيضاء أو ورقية مع رشات لون عشوائية.
الجودة: Fine art watercolor، 8K، ملمس حقيقي للفرشاة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an artistic watercolor painting.
Style: Watercolor painting with soft bleeding edges, natural color flow, visible paper texture.
Colors: Warm or cool palette matching the mood, transparent color washes preserved.
Background: White or paper texture with random color splashes.
Quality: Fine art watercolor, 8K, authentic brushstroke texture.',
    '#60a5fa', 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(167,243,208,0.08) 100%)', '🎨',
    ARRAY['Watercolor', 'Painting', 'Fine Art', 'Soft'], false,
    NULL, 'published', 'watercolor-portrait'
  ),
  (
    'لوحة زيتية كلاسيكية', 'Classic Oil Painting',
    'اجعل صورتك لوحة زيتية كلاسيكية بأسلوب أساتذة الرسم القديم.', 'Turn your photo into a classical oil painting in the style of old masters.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه أو نصف الجسم في إضاءة جيدة', 'Face or half-body photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة زيتية كلاسيكية بأسلوب أساتذة الرسم.
الأسلوب: Classical oil painting، ضربات الفرشاة واضحة، عمق وإضاءة تشبه Rembrandt.
الإضاءة: Chiaroscuro (ضوء وظل قوي)، ألوان دافئة غنية.
الإطار: مع إطار لوحة كلاسيكي ذهبي خشبي.
الجودة: Museum-quality oil painting، 8K، ملمس القماش واضح.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a classical oil painting in old masters style.
Style: Classical oil painting technique, visible brushstrokes, Rembrandt-like depth and lighting.
Lighting: Chiaroscuro (strong light and shadow), warm rich colors.
Frame: Classic ornate golden wooden frame included.
Quality: Museum-quality oil painting, 8K, visible canvas texture.',
    '#92400e', 'linear-gradient(135deg, rgba(146,64,14,0.2) 0%, rgba(212,175,55,0.08) 100%)', '🖼️',
    ARRAY['Oil Painting', 'Classical', 'Old Masters', 'Rembrandt'], false,
    NULL, 'published', 'oil-painting-classic'
  ),
  (
    'شخصية Superhero', 'Superhero Character',
    'أصبح بطلاً خارقاً في بوستر فيلم مارفل-ستايل مذهل.', 'Become a superhero in a stunning Marvel-style movie poster.',
    'fun', 'ترفيه', 'Fun',
    'intermediate', 'صورة كاملة للجسم أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Superhero بأسلوب بوستر Marvel/DC.
الزي: زي بطل خارق حديث (لا تستخدم أزياء حقيقية معروفة)، ألوان مميزة، كاب أو درع.
الخلفية: مدينة تحت الهجوم، سماء درامية، ضوء متفجر من الخلف.
الإضاءة: Rim light قوي، Lens flare، تأثيرات قوى خارقة.
الجودة: Movie poster quality، 4K، درامية عالية.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a superhero character in Marvel/DC movie poster style.
Costume: Modern original superhero suit (no real copyrighted designs), distinctive colors, cape or armor.
Background: City under attack, dramatic sky, explosive backlight.
Lighting: Strong rim light, lens flares, superpower energy effects.
Quality: Movie poster quality, 4K, high drama.',
    '#dc2626', 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(245,158,11,0.08) 100%)', '🦸',
    ARRAY['Superhero', 'Marvel Style', 'Action', 'Poster'], true,
    NULL, 'published', 'superhero-costume'
  ),
  (
    'غلاف رواية فانتازيا', 'Fantasy Novel Cover',
    'أصبح بطل رواية فانتازيا ملحمية على غلاف كتاب مذهل.', 'Become the hero of an epic fantasy novel on a stunning book cover.',
    'art', 'فن', 'Art',
    'advanced', 'صورة كاملة أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف رواية فانتازيا ملحمية.
الأسلوب: Epic fantasy book cover art، تصميم مثل Brandon Sanderson novels.
البيئة: مملكة خيالية، قلاع سحابية، مخلوقات أسطورية في الخلفية.
الشخصية: بزي فانتازيا، سيف أو عصا سحرية، هالة ضوئية سحرية.
النص: "EPIC FANTASY" كعنوان وهمي بخط احترافي.
الجودة: Publisher-quality cover art، 4K، درامي وملحمي.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an epic fantasy novel book cover.
Style: Epic fantasy book cover art, style reminiscent of Sanderson or Tolkien novels.
Environment: Fictional kingdom, cloud castles, mythical creatures in the background.
Character: Fantasy attire, sword or magic staff, glowing magical aura.
Text: "EPIC FANTASY" as fictional title in professional typography.
Quality: Publisher-quality cover art, 4K, dramatic and epic.',
    '#7c3aed', 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(219,39,119,0.08) 100%)', '📖',
    ARRAY['Fantasy', 'Book Cover', 'Epic', 'Novel'], false,
    NULL, 'published', 'fantasy-book-cover'
  ),
  (
    'لوحة كوميك مارفل', 'Marvel-Style Comic Panel',
    'حوّل صورتك إلى لوحة كوميك ملونة بأسلوب Marvel الكلاسيكي.', 'Turn your photo into a colorful comic panel in classic Marvel style.',
    'art', 'فن', 'Art',
    'beginner', 'صورة واضحة للوجه أو الجسم', 'Clear face or body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة كوميك بأسلوب Marvel/DC الكلاسيكي.
الأسلوب: Comic book art، Ben-Day dots، خطوط سميكة، ألوان مسطحة حيوية.
عناصر: فقاعات حوار فارغة، خطوط حركة، تأثيرات صوتية (POW/ZAP).
الإطار: حد لوحة كوميك أسود سميك.
الجودة: Classic comic book printing style، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a comic book panel in classic Marvel/DC style.
Style: Comic book art with Ben-Day dots, bold outlines, flat vivid colors.
Elements: Empty speech bubbles, motion lines, sound effects (POW/ZAP).
Frame: Thick black comic panel border.
Quality: Classic comic book printing style, 4K.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(239,68,68,0.08) 100%)', '💥',
    ARRAY['Comic Book', 'Marvel Style', 'Cartoon', 'Pop Art'], false,
    NULL, 'published', 'comic-book-panel'
  ),
  (
    'تصوير أزياء Editorial', 'Fashion Editorial Shoot',
    'احصل على صورة تصوير أزياء احترافية بأسلوب مجلات الموضة العالمية.', 'Get a professional fashion editorial photo in the style of global fashion magazines.',
    'professional', 'احترافي', 'Professional',
    'intermediate', 'صورة نصف الجسم أو كاملة في إضاءة جيدة', 'Half or full-body photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة تصوير أزياء Editorial احترافية.
الأسلوب: High-fashion editorial، أسلوب مجلة Vogue/Harper''s Bazaar.
الملابس: أزياء راقية ومعاصرة تناسب هوية الشخص.
الخلفية: استوديو نقي أو موقع أرستقراطي.
الإضاءة: إضاءة استوديو احترافية، ظلال دراماتيكية.
الجودة: Fashion magazine quality، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional fashion editorial photo.
Style: High-fashion editorial, Vogue/Harper''s Bazaar magazine aesthetic.
Clothing: Elegant contemporary fashion matching the subject''s identity.
Background: Clean studio or aristocratic location.
Lighting: Professional studio lighting with dramatic shadows.
Quality: Fashion magazine quality, 8K.',
    '#9333ea', 'linear-gradient(135deg, rgba(147,51,234,0.18) 0%, rgba(219,39,119,0.06) 100%)', '👗',
    ARRAY['Fashion', 'Editorial', 'Vogue Style', 'Magazine'], false,
    NULL, 'published', 'fashion-editorial'
  ),
  (
    'صورة Instagram Aesthetic', 'Instagram Aesthetic Shot',
    'أنشئ صورة Instagram مثالية بأعلى جودة جمالية.', 'Create the perfect Instagram photo with peak aesthetic quality.',
    'social', 'سوشيال ميديا', 'Social Media',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة Instagram aesthetic مثالية.
الأسلوب: Instagram aesthetic photography، ألوان متناسقة وناعمة، Moody أو Airy حسب المزاج.
التعديل: تعديل لوني متسق، تباين ناعم، إضاءة طبيعية جميلة.
التكوين: Rule of thirds، عمق ميدان ناعم.
الجودة: 4K portrait، شبكة Instagram-ready.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create the perfect Instagram aesthetic photo.
Style: Instagram aesthetic photography, cohesive and soft color palette, moody or airy depending on mood.
Editing: Consistent color grade, soft contrast, beautiful natural lighting.
Composition: Rule of thirds, soft depth of field.
Quality: 4K portrait, Instagram-ready grid.',
    '#ec4899', 'linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(245,158,11,0.06) 100%)', '📷',
    ARRAY['Instagram', 'Aesthetic', 'Social Media', 'Feed'], false,
    NULL, 'published', 'instagram-aesthetic'
  ),
  (
    'شخصية لعبة Pixel Art', 'Retro Pixel Game Character',
    'حوّل نفسك إلى شخصية لعبة فيديو Pixel Art رجعية مبهجة.', 'Turn yourself into a charming retro pixel art video game character.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Pixel Art رجعية.
الأسلوب: 16-bit pixel art style، محدودية الألوان المتعمدة، حواف مربعة واضحة.
التصميم: شخصية بحجم متوسط مع إطارات حركة (وقوف، هجوم، قفز).
البيئة: خلفية level-design رجعية بسيطة.
الإضافات: شريط HP/XP وهمي، نقاط وهمية.
الجودة: Authentic pixel art، 4K upscale.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a retro pixel art character.
Style: 16-bit pixel art with intentional limited color palette, visible square pixels.
Design: Medium-sized character sprite with animation poses (idle, attack, jump).
Environment: Simple retro level-design background.
Extras: Fictional HP/XP bar, score display.
Quality: Authentic pixel art, 4K upscale.',
    '#22d3ee', 'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(16,185,129,0.08) 100%)', '🕹️',
    ARRAY['Pixel Art', 'Retro Game', '8-bit', 'Sprite'], false,
    NULL, 'published', 'retro-game-sprite'
  ),
  (
    'شخصية Lego مُجسّمة', 'Lego Minifigure',
    'حوّل نفسك إلى شخصية Lego بلاستيكية مثالية التفاصيل.', 'Transform yourself into a perfectly detailed Lego minifigure.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Lego Minifigure بتفاصيل مثالية.
الأسلوب: Official Lego minifigure style، بلاستيك لامع، تعابير وجه Lego المميزة.
التفاصيل: ملابس Lego تعكس هوية الشخص، اكسسوارات Lego مناسبة.
الخلفية: قطع Lego مبنية في الخلفية أو بيضاء نقية.
الإضاءة: Studio lighting، انعكاسات البلاستيك.
الجودة: Official Lego product quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Lego minifigure with perfect details.
Style: Official Lego minifigure style, shiny plastic, signature Lego facial expressions.
Details: Lego-style clothing matching the subject''s identity, appropriate Lego accessories.
Background: Built Lego pieces in background or pure white.
Lighting: Studio lighting, plastic reflections.
Quality: Official Lego product quality, 4K.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.08) 100%)', '🧱',
    ARRAY['Lego', 'Minifigure', 'Toy', 'Plastic'], false,
    NULL, 'published', 'lego-minifigure'
  ),
  (
    'أسلوب Clay / كلايماشن', 'Claymation Character',
    'حوّل صورتك إلى شخصية طين كلايماشن مرحة وجذابة.', 'Transform your photo into a charming and fun claymation character.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Claymation من الطين المُشكّل.
الأسلوب: Stop-motion claymation style، ملمس الطين واضح، مفاصل مرئية.
التفاصيل: أصابع من الطين، تعابير وجه مبالغ بها مرحة، تفاصيل ملابس من الطين.
الخلفية: مشهد Claymation مبني من الطين.
الإضاءة: إضاءة ناعمة مع ظلال Claymation characteristic.
الجودة: High-detail clay render، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a claymation character made of shaped clay.
Style: Stop-motion claymation aesthetic, visible clay texture, visible joints.
Details: Clay fingers, exaggerated fun facial expressions, clay clothing details.
Background: Claymation scene built from clay.
Lighting: Soft lighting with characteristic claymation shadows.
Quality: High-detail clay render, 4K.',
    '#f97316', 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,179,8,0.08) 100%)', '🏺',
    ARRAY['Claymation', 'Clay', 'Stop Motion', 'Cute'], false,
    NULL, 'published', 'claymation-style'
  ),
  (
    'بورتريه عصر النهضة', 'Renaissance Portrait',
    'اجعل صورتك لوحة بورتريه من عصر النهضة الإيطالي بأسلوب Da Vinci.', 'Turn your photo into an Italian Renaissance portrait in Da Vinci style.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة بورتريه من عصر النهضة الإيطالي.
الأسلوب: Italian Renaissance portrait، تقنية Sfumato، ألوان زيتية دافئة وعميقة.
الزي: ملابس عصر النهضة الأوروبي الأنيق.
الخلفية: منظر طبيعي إيطالي أو جدار حجري داكن بأسلوب Da Vinci.
الإضاءة: Chiaroscuro خفيف، ضوء طبيعي من جانب واحد.
الجودة: Museum-quality painting، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Italian Renaissance portrait painting.
Style: Italian Renaissance portrait technique with sfumato, warm and deep oil colors.
Attire: Elegant European Renaissance period clothing.
Background: Italian landscape or dark stone wall in Da Vinci style.
Lighting: Subtle chiaroscuro, natural light from one side.
Quality: Museum-quality painting, 8K.',
    '#b45309', 'linear-gradient(135deg, rgba(180,83,9,0.2) 0%, rgba(212,175,55,0.08) 100%)', '🏛️',
    ARRAY['Renaissance', 'Da Vinci', 'Historical', 'Oil Painting'], false,
    NULL, 'published', 'renaissance-portrait'
  ),
  (
    'رائد فضاء في الكون', 'Space Astronaut',
    'أصبح رائد فضاء في مشهد كوني مذهل.', 'Become an astronaut in a breathtaking cosmic scene.',
    'fun', 'ترفيه', 'Fun',
    'intermediate', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة رائد فضاء في الفضاء الخارجي.
الزي: بدلة فضاء NASA احترافية مفصّلة.
البيئة: خارج المحطة الفضائية مع الأرض في الخلفية، نجوم، مجرة.
التفاصيل: انعكاس الكون في خوذة الرائد.
الإضاءة: إضاءة شمسية حادة من جانب واحد، الجانب الآخر في الظل الكامل.
الجودة: NASA photography quality، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a space astronaut photo in outer space.
Suit: Detailed professional NASA-style spacesuit.
Environment: Outside a space station with Earth visible in background, stars, galaxy.
Details: Reflection of the cosmos in the astronaut''s visor.
Lighting: Sharp one-sided sunlight, other side in complete shadow.
Quality: NASA photography quality, 8K.',
    '#1d4ed8', 'linear-gradient(135deg, rgba(29,78,216,0.2) 0%, rgba(109,40,217,0.08) 100%)', '🚀',
    ARRAY['Space', 'Astronaut', 'NASA', 'Cosmic'], true,
    NULL, 'published', 'space-astronaut'
  ),
  (
    'عالم تحت الماء الخيالي', 'Underwater Fantasy World',
    'ضع نفسك في عالم تحت الماء خيالي مع مخلوقات البحر والمرجان.', 'Place yourself in a magical underwater world with sea creatures and coral.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهداً خيالياً تحت الماء.
البيئة: عالم مائي سحري، مرجان ملون، قناديل بحر متوهجة، أسماك استوائية.
الشخصية: مدمجة في المشهد المائي مع تأثيرات الفقاعات والضوء.
الألوان: أزرق وأخضر وفيروزي مع توهج bioluminescent.
الإضاءة: ضوء مرشّح من السطح، توهج bioluminescence.
الجودة: Cinematic underwater photography، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical underwater fantasy scene.
Environment: Magical aquatic world, colorful coral, glowing jellyfish, tropical fish.
Character: Integrated into the aquatic scene with bubble effects and light rays.
Colors: Blue, green, and teal with bioluminescent glow.
Lighting: Filtered light from the surface, bioluminescence glow.
Quality: Cinematic underwater photography, 8K.',
    '#0891b2', 'linear-gradient(135deg, rgba(8,145,178,0.2) 0%, rgba(16,185,129,0.08) 100%)', '🌊',
    ARRAY['Underwater', 'Fantasy', 'Ocean', 'Bioluminescent'], false,
    NULL, 'published', 'underwater-fantasy'
  ),
  (
    'تحول الروبوت / Cyborg', 'Robot / Cyborg Transformation',
    'حوّل نفسك إلى نصف إنسان نصف آلة بأسلوب Sci-Fi مذهل.', 'Transform yourself into half-human half-machine in stunning Sci-Fi style.',
    'fun', 'ترفيه', 'Fun',
    'advanced', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تحول Cyborg / روبوت نصف إنسان.
الأسلوب: Cyberpunk cyborg، نصف وجه معدني بأجزاء ميكانيكية، نصف بشري طبيعي.
التفاصيل: أجزاء تيتانيوم لامعة، أسلاك، LED متوهج، عيون مُحسّنة.
الإضاءة: Neon glow أزرق/أحمر على الأجزاء المعدنية.
الخلفية: ورشة Cyberpunk أو خلفية رقمية.
الجودة: Cinematic Sci-Fi quality، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a half-human half-robot cyborg transformation.
Style: Cyberpunk cyborg, half metallic face with mechanical parts, half natural human.
Details: Shiny titanium parts, wires, glowing LEDs, enhanced eyes.
Lighting: Blue/red neon glow on metallic parts.
Background: Cyberpunk workshop or digital background.
Quality: Cinematic Sci-Fi quality, 8K.',
    '#64748b', 'linear-gradient(135deg, rgba(100,116,139,0.2) 0%, rgba(6,182,212,0.08) 100%)', '🤖',
    ARRAY['Cyborg', 'Robot', 'Sci-Fi', 'Cyberpunk'], false,
    NULL, 'published', 'robot-cyborg'
  ),
  (
    'فن الزجاج الملون', 'Stained Glass Art',
    'حوّل صورتك إلى عمل فني من الزجاج الملون المُضاء.', 'Transform your photo into a stunning illuminated stained glass artwork.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل فني من الزجاج الملون (Stained Glass).
الأسلوب: Gothic stained glass window art، خطوط سوداء سميكة بين الألوان، ألوان زجاجية شفافة مضيئة.
الألوان: أزرق ملكي، أحمر روبي، ذهبي، أخضر زمردي، بنفسجي.
الإضاءة: ضوء من خلف الزجاج يُضيء الألوان.
الإطار: إطار نافذة كنسية حجري.
الجودة: Fine art illustration، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a stained glass artwork.
Style: Gothic stained glass window art, thick black leading between colors, translucent glowing glass colors.
Colors: Royal blue, ruby red, gold, emerald green, violet.
Lighting: Backlit illumination through the glass colors.
Frame: Stone church window frame.
Quality: Fine art illustration, 4K.',
    '#7c3aed', 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(239,68,68,0.08) 100%)', '🪟',
    ARRAY['Stained Glass', 'Gothic', 'Church Art', 'Colorful'], false,
    NULL, 'published', 'stained-glass-art'
  ),
  (
    'بوب آرت أسلوب Warhol', 'Pop Art Warhol Style',
    'أصبح أيقونة ثقافية في أسلوب Andy Warhol الكلاسيكي.', 'Become a cultural icon in classic Andy Warhol pop art style.',
    'art', 'فن', 'Art',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل Pop Art بأسلوب Andy Warhol.
الأسلوب: Andy Warhol pop art، شبكة 4 نسخ بألوان مختلفة، ألوان صارخة مسطحة.
الألوان: كل نسخة بلون خلفية مختلف (أصفر، بنفسجي، أخضر، أحمر وردي).
التقنية: طباعة سيلك Silk-screen print appearance، حواف واضحة.
الجودة: Classic pop art print quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Andy Warhol-style pop art piece.
Style: Andy Warhol pop art, 4-panel grid each with different colors, flat bold colors.
Colors: Each panel with different background (yellow, violet, green, hot pink).
Technique: Silk-screen print appearance, clean sharp edges.
Quality: Classic pop art print quality, 4K.',
    '#ec4899', 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(234,179,8,0.08) 100%)', '🎭',
    ARRAY['Pop Art', 'Warhol', 'Silk Screen', 'Iconic'], true,
    NULL, 'published', 'pop-art-warhol'
  ),
  (
    'فن Low Poly الهندسي', 'Low Poly Geometric Art',
    'حوّل صورتك إلى عمل فني هندسي Low Poly عصري.', 'Transform your photo into a modern geometric Low Poly artwork.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عمل فني Low Poly هندسي.
الأسلوب: Low poly geometric art، مثلثات هندسية، أسلوب Faceted 3D render.
الألوان: تدرجات لونية حديثة، كل مثلث بلون مختلف ضمن التدرج.
الخلفية: بيضاء أو داكنة بسيطة تُبرز العمل.
الجودة: Vector geometric art quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a low poly geometric artwork.
Style: Low poly geometric art, triangulated facets, faceted 3D render aesthetic.
Colors: Modern color gradients, each facet a different shade within the gradient.
Background: Clean white or dark simple background to highlight the art.
Quality: Vector geometric art quality, 4K.',
    '#06b6d4', 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🔷',
    ARRAY['Low Poly', 'Geometric', '3D Art', 'Modern'], false,
    NULL, 'published', 'low-poly-art'
  ),
  (
    'بوستر روك / Grunge', 'Grunge Rock Poster',
    'أنشئ بوستر روك grunge مذهل بأسلوب الملصقات الموسيقية الكلاسيكية.', 'Create a stunning grunge rock poster in classic music poster style.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة نصف الجسم أو كاملة', 'Half or full-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بوستر موسيقى روك Grunge.
الأسلوب: Grunge rock poster، ملصق مطبوع خشن، ألوان باهتة ومحترقة.
التأثيرات: تأثيرات حرق وبقع وتشويش، ورق مُتقادم.
الألوان: أسود، أحمر داكن، بني، أصفر باهت.
النص: اسم فرقة وهمية وتاريخ وهمي بخط خشن.
الجودة: Authentic gig poster quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a grunge rock music poster.
Style: Grunge rock poster with rough printed aesthetic, faded and burnt colors.
Effects: Burn marks, ink splatters, distortion effects, aged paper look.
Colors: Black, dark red, brown, faded yellow.
Text: Fictional band name and date in rough typeface.
Quality: Authentic gig poster quality, 4K.',
    '#78350f', 'linear-gradient(135deg, rgba(120,53,15,0.2) 0%, rgba(239,68,68,0.08) 100%)', '🎸',
    ARRAY['Grunge', 'Rock Poster', 'Music', 'Vintage Print'], false,
    NULL, 'published', 'grunge-rock-poster'
  ),
  (
    'إعلان عطر فاخر', 'Luxury Perfume Advertisement',
    'احضر في إعلان عطر فاخر بأسلوب Dior أو Chanel.', 'Appear in a luxury perfume advertisement in Dior or Chanel style.',
    'product', 'منتج', 'Product',
    'intermediate', 'صورة نصف الجسم أو كاملة في إضاءة جيدة', 'Half or full-body photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ إعلان عطر فاخر.
الأسلوب: Luxury perfume campaign photography، أسلوب Dior/Chanel.
العناصر: زجاجة عطر أنيقة وهمية، ألوان ذهبية وفضية وعاجية.
الخلفية: بيئة فاخرة (قصر، حديقة باريسية، مرآة كبيرة).
الإضاءة: إضاءة سينمائية ناعمة وفاخرة.
النص: "Parfum de Luxe" أو نص عام وهمي فقط.
الجودة: Fashion campaign quality، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a luxury perfume advertisement.
Style: Luxury perfume campaign photography in Dior/Chanel style.
Elements: Fictional elegant perfume bottle, gold, silver, and ivory tones.
Background: Luxurious setting (palace, Parisian garden, grand mirror).
Lighting: Soft cinematic luxury lighting.
Text: "Parfum de Luxe" or generic fictional placeholder only.
Quality: Fashion campaign quality, 8K.',
    '#d4af37', 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.06) 100%)', '🌹',
    ARRAY['Perfume Ad', 'Luxury', 'Fashion Campaign', 'Fragrance'], false,
    NULL, 'published', 'luxury-perfume-ad'
  ),
  (
    'تصوير منتج غذائي احترافي', 'Professional Food Product Shot',
    'أنشئ تصوير منتج غذائي احترافي يشهّي ويُبرز أي طبق.', 'Create professional food product photography that makes any dish irresistible.',
    'product', 'منتج', 'Product',
    'beginner', 'صورة للطبق أو المنتج الغذائي', 'Photo of the dish or food product',
    'استخدم الصورة المرفقة كمرجع للطبق أو المنتج الغذائي.
أنشئ تصوير منتج غذائي احترافي يبدو شهياً ومُبهجاً.
الأسلوب: Food photography، flat lay أو 45-degree angle.
الإضاءة: Natural window light أو إضاءة استوديو ناعمة، highlight على التفاصيل.
السطح: طاولة خشبية دافئة أو رخام أبيض أنيق.
الإكسسوارات: مكونات طازجة حولها، أدوات مطبخ أنيقة.
الجودة: Restaurant menu quality، 4K، شهي جداً.', 'Use the uploaded image as the primary reference for the dish or food product.
Create professional food product photography that looks appetizing and delightful.
Style: Food photography, flat lay or 45-degree angle.
Lighting: Natural window light or soft studio light highlighting texture details.
Surface: Warm wooden table or elegant white marble.
Props: Fresh ingredients around it, elegant kitchen tools.
Quality: Restaurant menu quality, 4K, extremely appetizing.',
    '#f97316', 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,179,8,0.08) 100%)', '🍽️',
    ARRAY['Food Photography', 'Product Shot', 'Menu', 'Culinary'], false,
    NULL, 'published', 'food-product-shot'
  ),
  (
    'تحرير تصوير الشارع', 'Street Photography Edit',
    'أعطِ صورتك طابع تصوير الشارع الاحترافي والأصيل.', 'Give your photo an authentic professional street photography aesthetic.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'أي صورة في بيئة خارجية', 'Any photo in an outdoor setting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
طبّق أسلوب Street Photography الاحترافي.
الأسلوب: Candid street photography، grain طبيعي، تعديل Moody Urban.
التلوين: ألوان هادئة أو أبيض وأسود مع لمسات لون انتقائية.
البيئة: إذا كانت الخلفية عشوائية، حسّنها لتبدو شارعاً حضرياً جميلاً.
الإضاءة: Golden hour أو إضاءة حضرية ليلية دافئة.
الجودة: Leica camera quality، authentic grain، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Apply professional street photography aesthetic.
Style: Candid street photography, natural grain, moody urban edit.
Color: Muted tones or black and white with selective color accents.
Environment: If background is random, enhance it to look like a beautiful urban street.
Lighting: Golden hour or warm urban night lighting.
Quality: Leica camera quality, authentic grain, 4K.',
    '#475569', 'linear-gradient(135deg, rgba(71,85,105,0.2) 0%, rgba(100,116,139,0.08) 100%)', '🏙️',
    ARRAY['Street Photography', 'Urban', 'Moody', 'Candid'], false,
    NULL, 'published', 'street-photography-edit'
  ),
  (
    'بورتريه أبيض وأسود فني', 'B&W Fine Art Portrait',
    'لوحة بورتريه فنية بالأبيض والأسود بأسلوب أساتذة التصوير.', 'Fine art black and white portrait in the style of master photographers.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة الوجه في أي إضاءة', 'Face photo in any lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فني بالأبيض والأسود.
الأسلوب: Fine art B&W portrait، أسلوب Ansel Adams أو Annie Leibovitz.
التعديل: تباين عالي الجودة، ظلال عميقة، هايلايت ناصع.
الإضاءة: إضاءة انتقائية تُبرز ملامح الوجه بشكل مذهل.
الملمس: تفاصيل جلد الوجه واضحة وعميقة، حادة جداً.
الجودة: Museum portrait photography، 8K، grain خفيف للأصالة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art black and white portrait.
Style: Fine art B&W portrait in Ansel Adams or Annie Leibovitz style.
Editing: High-quality contrast, deep shadows, crisp highlights.
Lighting: Selective lighting that dramatically highlights facial features.
Texture: Very sharp and detailed skin texture visible.
Quality: Museum portrait photography, 8K, subtle grain for authenticity.',
    '#374151', 'linear-gradient(135deg, rgba(55,65,81,0.2) 0%, rgba(107,114,128,0.08) 100%)', '🖤',
    ARRAY['Black & White', 'Fine Art', 'Portrait', 'Contrast'], false,
    NULL, 'published', 'bw-fine-art'
  ),
  (
    'بطاقة TikTok Creator', 'TikTok Creator Card',
    'أنشئ بطاقة Creator مبهرة بتصميم TikTok عصري.', 'Create a stunning TikTok-style creator card with modern design.',
    'social', 'سوشيال ميديا', 'Social Media',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بطاقة TikTok Creator عصرية.
الأسلوب: TikTok-inspired card design، تدرجات نيونية، أسلوب Gen-Z عصري.
العناصر: إطار بروفايل TikTok وهمي، عداد followers وهمي، أيقونة TikTok.
الألوان: أسود مع نيون وردي/أحمر/أبيض.
الجودة: Social media ready، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a modern TikTok creator card.
Style: TikTok-inspired card design, neon gradients, Gen-Z modern aesthetic.
Elements: Fictional TikTok profile frame, fictional follower counter, TikTok icon style.
Colors: Black with neon pink/red/white.
Quality: Social media ready, 4K.',
    '#ff0050', 'linear-gradient(135deg, rgba(255,0,80,0.2) 0%, rgba(0,242,234,0.08) 100%)', '📱',
    ARRAY['TikTok', 'Creator', 'Social Media', 'Gen-Z'], false,
    NULL, 'published', 'tiktok-creator-card'
  ),
  (
    'غلاف Twitter/X احترافي', 'Professional Twitter/X Banner',
    'أنشئ غلاف Twitter/X احترافياً يعكس هويتك الرقمية.', 'Create a professional Twitter/X banner that reflects your digital identity.',
    'social', 'سوشيال ميديا', 'Social Media',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ غلاف Twitter/X Banner احترافي.
الأبعاد: 1500x500 بكسل (نسبة 3:1).
الأسلوب: بانر احترافي نظيف، تدرج لوني عصري، مساحة كافية لصورة البروفايل.
العناصر: نص وظيفة/اهتمام عام وهمي، تصميم هندسي خفيف.
الألوان: تدرج أزرق/بنفسجي أو حسب مزاج الصورة.
الجودة: Twitter header quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional Twitter/X banner.
Dimensions: 1500x500 pixels (3:1 ratio).
Style: Clean professional banner, modern color gradient, adequate space for profile picture.
Elements: Fictional role/interest text, subtle geometric design.
Colors: Blue/violet gradient or matching the subject''s mood.
Quality: Twitter header quality, 4K.',
    '#1d9bf0', 'linear-gradient(135deg, rgba(29,155,240,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🐦',
    ARRAY['Twitter', 'X', 'Banner', 'Social Media', 'Header'], false,
    NULL, 'published', 'twitter-banner'
  ),
  (
    'بوستر تحفيزي احترافي', 'Professional Motivational Poster',
    'أنشئ بوستراً تحفيزياً راقياً جاهزاً للطباعة أو النشر.', 'Create a premium motivational poster ready for print or sharing.',
    'professional', 'احترافي', 'Professional',
    'beginner', 'أي صورة واضحة أو بدون صورة', 'Any clear photo or no photo needed',
    'استخدم الصورة المرفقة (إن وُجدت) كمرجع بصري.
أنشئ بوستر تحفيزي احترافي عالي الجودة.
الأسلوب: Motivational poster design، مستوحى من Nike/Apple campaigns.
التصميم: تدرج داكن عميق، نص تحفيزي عام وهمي بخط Bold كبير.
الألوان: أسود وذهبي أو أبيض وأزرق داكن.
الإضاءة: Dramatic lighting إذا كان هناك شخص.
الجودة: Print-quality poster، 4K، A3 format ready.', 'Use the uploaded image (if provided) as a visual reference.
Create a high-quality professional motivational poster.
Style: Motivational poster design inspired by Nike/Apple campaigns.
Design: Deep dark gradient, generic fictional motivational text in large Bold font.
Colors: Black and gold or white and dark blue.
Lighting: Dramatic lighting if a person is present.
Quality: Print-quality poster, 4K, A3 format ready.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(0,0,0,0.08) 100%)', '💪',
    ARRAY['Motivational', 'Poster', 'Inspirational', 'Print Ready'], false,
    NULL, 'published', 'motivational-poster'
  ),
  (
    'صورة CV / السيرة الذاتية', 'Professional CV / Resume Photo',
    'احصل على صورة سيرة ذاتية احترافية مثالية لأي وظيفة.', 'Get a perfect professional CV photo ready for any job application.',
    'professional', 'احترافي', 'Professional',
    'beginner', 'أي صورة واضحة للوجه أو نصف الجسم', 'Any clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة سيرة ذاتية احترافية مثالية.
الأسلوب: CV/resume professional headshot، تعبير واثق وودود.
الخلفية: أبيض نقي أو رمادي فاتح أنيق.
الملابس: بدلة رسمية أو ملابس احترافية مناسبة (إذا كانت ظاهرة).
الإضاءة: Three-point studio lighting، ناعمة ومتوازنة تماماً.
الجودة: Passport/ID photo quality، 4K، صالحة للطباعة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a perfect professional CV/resume photo.
Style: Professional CV headshot, confident and approachable expression.
Background: Pure white or elegant light gray.
Attire: Formal suit or professional business casual (if visible).
Lighting: Three-point studio lighting, perfectly soft and balanced.
Quality: Passport/ID photo quality, 4K, print-ready.',
    '#0f172a', 'linear-gradient(135deg, rgba(15,23,42,0.18) 0%, rgba(59,130,246,0.06) 100%)', '📋',
    ARRAY['CV Photo', 'Resume', 'Professional', 'Job Application'], false,
    NULL, 'published', 'resume-professional-photo'
  ),
  (
    'مشهد جيبلي Studio Ghibli', 'Studio Ghibli Inspired Scene',
    'حوّل نفسك وبيئتك إلى مشهد مذهل بأسلوب Studio Ghibli.', 'Transform yourself and your surroundings into a breathtaking Studio Ghibli-style scene.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الشخص أو أي مشهد', 'Person photo or any scene',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهداً بأسلوب Studio Ghibli.
الأسلوب: Studio Ghibli animation style، مستوحى من Spirited Away أو Howl''s Moving Castle.
البيئة: طبيعة ساحرة، أشجار ضخمة، سماء زرقاء بغيوم ناصعة.
الشخصية: بأسلوب Ghibli الكرتوني، تعابير ناعمة وحيوية.
التفاصيل: ضوء شمس ذهبي يتسلل بين الأشجار، مخلوقات خيالية صغيرة.
الجودة: Ghibli film quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a scene in Studio Ghibli style.
Style: Studio Ghibli animation style inspired by Spirited Away or Howl''s Moving Castle.
Environment: Enchanting nature, massive trees, vivid blue sky with puffy white clouds.
Character: In Ghibli''s distinctive soft cartoon style with expressive features.
Details: Golden sunlight filtering through trees, tiny fantastical creatures in the scene.
Quality: Ghibli film quality, 4K.',
    '#4ade80', 'linear-gradient(135deg, rgba(74,222,128,0.2) 0%, rgba(56,189,248,0.08) 100%)', '🌿',
    ARRAY['Ghibli', 'Anime', 'Nature', 'Fantasy', 'Studio Ghibli'], true,
    NULL, 'published', 'ghibli-scene'
  ),
  (
    'فرعون مصري قديم', 'Ancient Egyptian Pharaoh',
    'تحول إلى فرعون مصري قديم في لوحة جدارية أو تمثال ملكي.', 'Transform into an ancient Egyptian pharaoh in a royal mural or statue.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ تصويراً تاريخياً بأسلوب الفراعنة المصريين القدامى.
الزي: تاج فرعوني، قلادة ذهبية، خافا (Khat) أو Nemes headcloth.
الخلفية: معبد مصري قديم، هيروغليفية ذهبية على الجدران.
الألوان: ذهبي، أزرق ملكي، أحمر، أسود.
الأسلوب: فن مصري قديم مع واقعية عالية (hybrid style).
الجودة: Historical art quality، 4K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a historical ancient Egyptian pharaoh depiction.
Attire: Pharaonic crown, golden collar necklace, Khat or Nemes headcloth.
Background: Ancient Egyptian temple, golden hieroglyphics on walls.
Colors: Gold, royal blue, red, black.
Style: Ancient Egyptian art combined with high realism (hybrid style).
Quality: Historical art quality, 4K.',
    '#d4af37', 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(180,83,9,0.08) 100%)', '🏺',
    ARRAY['Egyptian', 'Pharaoh', 'Historical', 'Ancient'], false,
    NULL, 'published', 'egyptian-pharaoh'
  ),
  (
    'روح الغابة والطبيعة', 'Nature Forest Spirit',
    'تحول إلى روح الطبيعة والغابة في مشهد خيالي ساحر.', 'Transform into a nature forest spirit in an enchanting fantasy scene.',
    'art', 'فن', 'Art',
    'advanced', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ مشهد روح الطبيعة والغابة الخيالية.
الأسلوب: Fantasy nature spirit، عناصر نباتية مدمجة مع الشخص.
التفاصيل: أوراق شجر وأزهار تنمو من الشعر والملابس، وجه يلمع بضوء أخضر ذهبي.
البيئة: غابة سحرية، ضوء متشعشع، مخلوقات صغيرة وهمية.
الألوان: أخضر زمردي، ذهبي، بني دافئ، وهج أبيض.
الجودة: Fantasy digital art، 8K.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fantasy nature forest spirit scene.
Style: Fantasy nature spirit with botanical elements integrated into the person.
Details: Leaves and flowers growing from hair and clothes, face glowing with green-golden light.
Environment: Enchanted forest, dappled light, tiny fantastical creatures.
Colors: Emerald green, gold, warm brown, white glow.
Quality: Fantasy digital art, 8K.',
    '#15803d', 'linear-gradient(135deg, rgba(21,128,61,0.2) 0%, rgba(212,175,55,0.08) 100%)', '🌲',
    ARRAY['Nature Spirit', 'Forest', 'Fantasy', 'Botanical'], false,
    NULL, 'published', 'nature-forest-spirit'
  ),
  (
    'غروب الشاطئ الذهبي', 'Golden Hour Beach Sunset',
    'إضاءة غروب ذهبية دافئة مع بوكيه المحيط.', 'Warm golden sunset beach portrait with ocean bokeh.',
    'portrait', 'بورتريه', 'Portrait',
    'beginner', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه شاطئي سينمائي عند غروب الشمس الذهبي.
الأسلوب: إضاءة ساعة ذهبية دافئة بتدرجات الأمبر والذهبي والوردي الذهبي.
الإضاءة: ضوء مباشر خلفي ناعم من المغيب، هالة ذهبية محيطة بالشخص.
الخلفية: بوكيه محيط ناعم، موج هادئ، سماء ملوّنة.
الجودة: فوتوريالستيك سينمائي، 8K، Canon EF 85mm f/1.4.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a cinematic beach portrait at golden hour sunset.
Style: Warm golden hour light with amber, gold, and rose-gold gradients.
Lighting: Soft backlit glow from the setting sun, golden halo around the subject.
Background: Soft ocean bokeh, gentle waves, colorful painted sky.
Quality: Cinematic photorealistic, 8K, Canon EF 85mm f/1.4 equivalent.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)', '🌅',
    ARRAY['Golden Hour', 'Beach', 'Sunset', 'Cinematic'], false,
    '/nano-banana/styles/nb-01-golden-hour.png', 'published', 'golden-hour-beach'
  ),
  (
    'الساعة الزرقاء المدينية', 'Blue Hour City Portrait',
    'بورتريه حضري في الساعة الزرقاء مع بوكيه أضواء المدينة.', 'Moody urban portrait in blue hour with city lights bokeh.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه حضري مزاجي في الساعة الزرقاء بعد الغروب.
الأسلوب: Cinematic urban portrait، درجة ألوان زرقاء باردة عميقة، عمق ميدان ضيق.
الإضاءة: ضوء أمامي لطيف من الأضواء الحضرية مع هالة خلفية زرقاء باردة.
الخلفية: ناطحات سحاب بوكيه بأضواء مُضببة، بخار خفيف من الشوارع.
الجودة: سينمائي 4K، Sony 85mm f/1.4 GM، حبوب فيلم ناعمة.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a moody urban portrait in the cinematic blue hour after sunset.
Style: Deep cool blue color grade, shallow depth of field, melancholy introspective mood.
Lighting: Soft front fill from urban ambient lights, cool blue backlight halo.
Background: Bokeh city skyscraper lights blurred behind, light street fog.
Quality: Cinematic 4K, Sony 85mm f/1.4 GM equivalent, subtle film grain.
Do not add any unrelated elements.',
    '#60a5fa', 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🌆',
    ARRAY['Blue Hour', 'City', 'Urban', 'Moody'], false,
    '/nano-banana/styles/nb-03-blue-hour.png', 'published', 'blue-hour-city'
  ),
  (
    'إضاءة رامبرانت الدرامية', 'Dramatic Rembrandt Lighting',
    'إضاءة كياروسكورو درامية بأسلوب رامبرانت على خلفية سوداء.', 'Deep chiaroscuro lighting in Rembrandt style on pure black background.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه كياروسكورو درامي بأسلوب رامبرانت الهولندي الكلاسيكي.
الأسلوب: كياروسكورو مدرسة هولندا الذهبية، مثلث رامبرانت واضح على الخد.
الإضاءة: مصدر ضوء واحد جانبي دافئ، ظلال عميقة لا رحمة فيها، خط نور حاد على الأنف.
الخلفية: خلفية سوداء داكنة كاملة بلا عناصر مشتتة.
الجودة: 8K، دقة جلد وعيون بمستوى النهضة الإيطالية.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dramatic chiaroscuro portrait in Rembrandt''s Dutch Golden Age tradition.
Style: Dutch Golden Age chiaroscuro, clear Rembrandt triangle on the cheek.
Lighting: Single warm directional side light, merciless deep shadows, sharp nose light line.
Background: Pure pitch black background with no distracting elements.
Quality: 8K, Italian Renaissance-level skin and eye detail.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(120,53,15,0.08) 100%)', '🕯️',
    ARRAY['Rembrandt', 'Chiaroscuro', 'Portrait', 'Drama'], false,
    '/nano-banana/styles/nb-04-rembrandt.png', 'published', 'rembrandt-lighting'
  ),
  (
    'نوار أبيض وأسود', 'Film Noir Portrait',
    'بورتريه نوار بالأبيض والأسود مع مطر على أرصفة الليل.', 'High contrast film noir portrait with rain on cobblestone streets.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فيلم نوار بالأبيض والأسود بأسلوب هوليوود الأربعينات.
الأسلوب: أبيض وأسود عالي التباين، ظلال شرائط نافذة عريانة على الوجه، حبوب فيلم 35mm أصيل.
الإضاءة: مصدر ضوء واحد قاسٍ جانبي، خطوط ظل حادة تقطع الوجه.
الخلفية: أرصفة مبلطة مبللة بالمطر الثقيل، انعكاسات نيون على البرك.
الجودة: 4K، أسلوب تطوير Kodak Tri-X عالي التباين، حبوب حية واضحة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a 1940s Hollywood film noir portrait in high-contrast black and white.
Style: Extreme B&W contrast, venetian blind shadow stripes across the face, authentic 35mm film grain.
Lighting: Single harsh side light source, sharp shadow lines cutting across the face.
Background: Wet cobblestone streets in heavy rain, neon reflections in puddles.
Quality: 4K, Kodak Tri-X high-contrast development style, vivid visible grain.
Do not add any unrelated elements.',
    '#94a3b8', 'linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)', '🎩',
    ARRAY['Film Noir', 'Black & White', '1940s', 'Cinematic'], false,
    '/nano-banana/styles/nb-05-film-noir.png', 'published', 'film-noir-portrait'
  ),
  (
    'رسم مائي انطباعي', 'Impressionist Watercolor Portrait',
    'لوحة ألوان مائية انطباعية ناعمة بنسيج الورق.', 'Delicate impressionist watercolor fine art portrait.',
    'art', 'فن', 'Art',
    'beginner', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة ألوان مائية انطباعية بأسلوب الفن الرفيع الأوروبي.
الأسلوب: غسيل مائي انطباعي شفاف، حواف ناعمة متدفقة، لوحة باستيل حالمة.
النسيج: نسيج ورق خشن واضح، ضربات فرشاة عفوية ناعمة، بقع لون مرئية.
الخلفية: ضبابية انطباعية بألوان باستيل فاتحة، بوكيه ناعم.
الجودة: قطعة معرض فنية راقية، جودة Arches hot-press 300 DPI.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an impressionist watercolor painting in European fine art gallery style.
Style: Transparent watercolor washes, soft flowing edges, dreamy pastel palette.
Texture: Rough watercolor paper grain visible, spontaneous brushwork, color blooms.
Background: Impressionist soft blur in light pastels, gentle bokeh.
Quality: Premium fine art gallery piece, 300 DPI Arches paper quality.
Do not add any unrelated elements.',
    '#c084fc', 'linear-gradient(135deg, rgba(192,132,252,0.2) 0%, rgba(96,165,250,0.08) 100%)', '🎨',
    ARRAY['Watercolor', 'Impressionist', 'Fine Art', 'Pastel'], false,
    '/nano-banana/styles/nb-07-watercolor.png', 'published', 'watercolor-impressionist'
  ),
  (
    'أنمي جيبلي بالألوان المسطحة', 'Studio Ghibli Cel Shading',
    'بورتريه أنمي بأسلوب استوديو جيبلي مع تظليل مسطح.', 'Soft cel-shaded anime portrait in Miyazaki''s Ghibli style.',
    'art', 'فن', 'Art',
    'beginner', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أنمي بأسلوب رسوم استوديو جيبلي المميز.
الأسلوب: رسوم جيبلي، عيون كبيرة لامعة معبّرة، تظليل مسطح ناعم بتدرجات محدودة.
الألوان: لوحة ألوان جيبلي الأصيلة، ألوان طبيعية دافئة مع لمسات سحرية.
الخلفية: خلفية طبيعية جميلة بأسلوب الإخراج الفني لميازاكي، حقل أو غابة.
الجودة: جودة أنيميشن استوديو 2K، تفاصيل دقيقة في الشعر والعيون.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an anime portrait in Studio Ghibli''s distinctive animation art style.
Style: Ghibli anime illustration, large luminous expressive eyes, soft cel shading with limited gradients.
Colors: Authentic Ghibli warm natural palette with magical touches.
Background: Beautiful nature background in Miyazaki''s art direction, field or forest setting.
Quality: 2K studio animation quality, detailed hair and eye rendering.
Do not add any unrelated elements.',
    '#34d399', 'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(74,222,128,0.08) 100%)', '🌸',
    ARRAY['Ghibli', 'Anime', 'Cel Shading', 'Miyazaki'], false,
    '/nano-banana/styles/nb-08-ghibli.png', 'published', 'ghibli-anime-cel'
  ),
  (
    'كوميك ماربل', 'Marvel Comic Book Art',
    'رسم كوميكس بأسلوب ماربل الكلاسيكي مع ألوان جريئة.', 'Classic Marvel comic book illustration with bold ink and halftone.',
    'art', 'فن', 'Art',
    'beginner', 'صورة واضحة للوجه أو الجسم', 'Clear face or body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ رسم كوميكس بطولي بأسلوب ماربل/DC الكلاسيكي.
الأسلوب: خطوط حبر سميكة جريئة، ألوان أساسية حيوية متشبعة، نقاط هالفتون مرئية.
التفاصيل: تأثير طباعة كوميكس أصيل، تعبير بطولي ديناميكي قوي، تأثير جاك كيربي.
الخلفية: خلفية كوميكس شعاعية أو بُقعية، سطح ورق أبيض.
الجودة: 4K، رسم متسق يدوي احترافي، أسلوب الكوميكس السبعيني الكلاسيكي.
لا تضف أي فقاعات حوار أو نصوص.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a heroic comic book illustration in classic Marvel/DC style.
Style: Bold thick ink outlines, vibrant saturated primary colors, visible halftone dot pattern.
Details: Authentic comic printing effect, dynamic heroic expression, Jack Kirby influence.
Background: Radial or burst comic-style background, white paper surface.
Quality: 4K, consistent professional hand-drawn illustration, classic 1970s comic style.
Do not add any speech bubbles or text.',
    '#f87171', 'linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(251,191,36,0.08) 100%)', '💥',
    ARRAY['Marvel', 'Comic Book', 'Halftone', 'Jack Kirby'], false,
    '/nano-banana/styles/nb-09-marvel-comic.png', 'published', 'marvel-comic-art'
  ),
  (
    'فارس الخيال بالدرع الذهبي', 'Epic Fantasy Knight',
    'محارب خيالي ملحمي في درع ذهبي محفور مع تنين وقلعة.', 'Epic fantasy warrior in ornate golden armor with dragon and castle.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه محارب خيالي ملحمي في درع ذهبي مزخرف.
الأسلوب: فن خيال ملحمي عالي الدقة، درع ذهبي محفور بالأحجار الكريمة والرونز المتوهجة.
الإضاءة: أشعة إلهية دراماتيكية من الأعلى، توهجات سحرية ذهبية من الرونز.
الخلفية: تنين ضخم يحلق وقلعة محترقة في العمق، سحب ملحمية متلاطمة.
الجودة: 4K، رسم رقمي احترافي بأسلوب World of Warcraft، تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an epic fantasy warrior portrait in ornate golden armor.
Style: High-fidelity epic fantasy art, golden armor engraved with gemstones and glowing runes.
Lighting: Dramatic divine god-rays from above, magical golden glow from the runes.
Background: Massive dragon soaring behind, burning castle in the distance, epic storm clouds.
Quality: 4K, professional digital art in World of Warcraft style, hyper-detailed rendering.
Do not add any unrelated elements.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.08) 100%)', '⚔️',
    ARRAY['Fantasy', 'Knight', 'Dragon', 'Epic'], false,
    '/nano-banana/styles/nb-11-fantasy-knight.png', 'published', 'fantasy-knight-golden'
  ),
  (
    'رائد الفضاء والسديم', 'Astronaut in Nebula',
    'رائد فضاء بدلة مستقبلية مع سديم ومجرات مذهلة خلفه.', 'Futuristic astronaut in sleek spacesuit with swirling nebula.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه رائد فضاء مستقبلي في محيط كوني مذهل.
الأسلوب: بدلة فضاء أنيقة متوهجة بتفاصيل تقنية، خوذة لامعة تعكس الكون.
الإضاءة: ضوء كوني بارد من النجوم والسديم، انعكاسات على الخوذة.
الخلفية: سديم دوار ملوّن بالبنفسجي والأزرق والوردي، مجرات بعيدة ونجوم لامعة.
الجودة: دقة NASA السينمائية، 4K، تصوير فضائي احترافي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic astronaut portrait in a stunning cosmic environment.
Style: Sleek futuristic spacesuit with glowing accents, reflective visor showing the galaxy.
Lighting: Cold cosmic light from stars and nebula, visor reflections.
Background: Swirling nebula in purple, blue, and pink tones, distant galaxies, glittering stars.
Quality: NASA cinematic quality, 4K, professional astrophotography composite.
Do not add any unrelated elements.',
    '#818cf8', 'linear-gradient(135deg, rgba(129,140,248,0.2) 0%, rgba(109,40,217,0.08) 100%)', '🚀',
    ARRAY['Astronaut', 'Nebula', 'Space', 'NASA'], false,
    '/nano-banana/styles/nb-12-astronaut.png', 'published', 'astronaut-nebula'
  ),
  (
    'سايبربانك نيون طوكيو', 'Cyberpunk Neon Tokyo',
    'أجواء سايبربانك مع إضاءة نيون وردية وفيروزية في طوكيو الممطرة.', 'Cyberpunk 2077 neon aesthetic in rainy Tokyo alleyway.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سايبربانك في طوكيو المستقبلية الليلية الممطرة.
الأسلوب: جمالية Cyberpunk 2077، تعديلات سيبرانية متوهجة، ملابس وسائط عالية التقنية.
الإضاءة: أضواء نيون وردية وفيروزية تعكس على الوجه والمطر، ظلال مدينية معقدة.
الخلفية: زقاق طوكيو الليلي الضيق، إعلانات هولوغرامية يابانية طائفة، مطر ثقيل.
الجودة: فن رقمي سينمائي، 4K، أسلوب Blade Runner 2049 الحديث.
لا تضف أي نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a cyberpunk portrait in a rain-soaked futuristic Tokyo night.
Style: Cyberpunk 2077 aesthetic, glowing cyber augmentations, high-tech streetwear.
Lighting: Pink and cyan neon lights reflecting off face and rain, complex urban shadows.
Background: Narrow Tokyo night alley, floating Japanese holographic advertisements, heavy rain.
Quality: Cinematic digital art, 4K, modern Blade Runner 2049 aesthetic.
Do not add any unrelated text.',
    '#f472b6', 'linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(34,211,238,0.08) 100%)', '🌃',
    ARRAY['Cyberpunk', 'Neon', 'Tokyo', 'Rain'], false,
    '/nano-banana/styles/nb-13-cyberpunk.png', 'published', 'cyberpunk-neon-tokyo'
  ),
  (
    'الساحر الأكبر القديم', 'Ancient Archmage Wizard',
    'ساحر عجوز قوي مع عصا متوهجة ومكتبة السحر القديم.', 'Ancient archmage wizard with crackling magical staff and grimoire library.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ساحر كبير قديم بقوى سحرية هائلة.
الأسلوب: فن خيال ملحمي، عصا سحرية تتشقق بالبرق الأرجواني، رداء طويل منقوش بالرونز المتوهجة.
الإضاءة: ضوء سحري دراماتيكي من العصا، عيون متوهجة بالطاقة السحرية.
الخلفية: مكتبة ضخمة من كتب السحر القديمة تصل للسقف، أعمدة حجرية وشموع طائفة.
الجودة: 4K، رسم رقمي خيال ملحمي، أسلوب Lord of the Rings السينمائي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of an ancient wise archmage with immense magical power.
Style: Epic fantasy art, magical staff crackling with purple lightning, long robe with glowing rune inscriptions.
Lighting: Dramatic magical light from the staff, glowing eyes radiating power.
Background: Towering library of ancient grimoires, stone pillars, floating candles.
Quality: 4K, epic fantasy digital art, Lord of the Rings cinematic style.
Do not add any unrelated elements.',
    '#a78bfa', 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(124,58,237,0.08) 100%)', '🧙',
    ARRAY['Wizard', 'Magic', 'Fantasy', 'Archmage'], false,
    '/nano-banana/styles/nb-14-wizard.png', 'published', 'ancient-wizard-archmage'
  ),
  (
    'ملكة الإلف بالتاج الفضي', 'High Elven Royalty',
    'ملكة إلفية راقية بتاج من الكروم الحية في غابة متوهجة.', 'High Elven queen with silver living vine crown in enchanted forest.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكة إلفية راقية وأثيرية في غابة سحرية.
الأسلوب: جمال إلفي نقي راقٍ، آذان مدببة أنيقة، تاج فضي من كروم وزهور حية، روب حريري شفاف.
الإضاءة: ضوء بيولومينسنت أخضر ذهبي من الغابة، توهج أثيري هادئ حول الشخص.
الخلفية: غابة مسحورة بحشرات يراعة بيولومينسنت تحوم، أشجار عملاقة قديمة.
الجودة: 4K، فن خيال راقٍ بأسلوب إلف Lord of the Rings.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a regal ethereal High Elven queen portrait in an enchanted forest.
Style: Pure elegant elven beauty, graceful pointed ears, silver crown of living vines and flowers, translucent silk robes.
Lighting: Green-golden bioluminescent light from the forest, ethereal soft glow around subject.
Background: Enchanted forest with bioluminescent fireflies, towering ancient trees.
Quality: 4K, high fantasy art in Lord of the Rings Elves style.
Do not add any unrelated elements.',
    '#34d399', 'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(167,243,208,0.08) 100%)', '🧝',
    ARRAY['Elven', 'Fantasy', 'Silver Crown', 'Enchanted'], false,
    '/nano-banana/styles/nb-15-elven.png', 'published', 'elven-royalty-silver'
  ),
  (
    'فرعون مصري بالتاج الذهبي', 'Egyptian Pharaoh Portrait',
    'فرعون مصري قديم بتاج ذهبي مزخرف وهيروغليفية.', 'Ancient Egyptian pharaoh with ornate golden headdress and pyramids.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فرعون مصري عظيم في كامل مجده الإمبراطوري.
الأسلوب: فرعوني مصري قديم، تاج نمس ذهبي مزخرف بالكوبرا الإلهية، كحل مصري، مجوهرات لازوردية.
الإضاءة: ضوء رسمي دراماتيكي ذهبي كالإله رع، أشعة شمسية جلالية.
الخلفية: الأهرام الثلاث الكبرى مع هيروغليفية ذهبية منحوتة وحراس إلهيون.
الجودة: 4K، تفاصيل تاريخية دقيقة، جودة متحف البريطاني.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of a magnificent Egyptian pharaoh in full imperial splendor.
Style: Ancient Egyptian pharaoh, golden Nemes headdress with divine cobra uraeus, dramatic kohl eye makeup, lapis lazuli jewelry.
Lighting: Dramatic golden formal light like the sun god Ra, majestic solar rays.
Background: The three Great Pyramids with golden carved hieroglyphics and divine guardians.
Quality: 4K, historically accurate details, British Museum quality rendering.
Do not add any unrelated elements.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(212,175,55,0.08) 100%)', '🏺',
    ARRAY['Pharaoh', 'Egypt', 'Ancient', 'Golden Crown'], false,
    '/nano-banana/styles/nb-16-pharaoh.png', 'published', 'pharaoh-golden-crown'
  ),
  (
    'ليالي عربية ملكية', 'Arabian Nights Royalty',
    'ملكية بألف ليلة وليلة مع قصر وفوانيس ذهبية طائرة.', 'Arabian Nights royalty with ornate headdress and glowing lanterns.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكية ألف ليلة وليلة بأجواء شرقية ساحرة.
الأسلوب: ملابس ملكية شرقية فاخرة، غطاء رأس فيروزي وذهبي مرصع بالجواهر، روب حرير مطرّز.
الإضاءة: ضوء فوانيس ذهبية دافئة، توهج برتقالي ذهبي سحري يملأ المشهد.
الخلفية: فناء قصر رخامي ضخم بنافورات وبساتين، فوانيس ذهبية تطفو في الهواء.
الجودة: 4K، تفاصيل نسيج راقية، فن شرقي فاخر.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an Arabian Nights royalty portrait with enchanting Eastern atmosphere.
Style: Luxurious royal Eastern attire, ornate turquoise and gold jeweled headdress, embroidered silk robes.
Lighting: Warm golden lantern light, magical golden-orange glow filling the scene.
Background: Grand marble palace courtyard with fountains and gardens, golden lanterns floating in the air.
Quality: 4K, exquisite fabric detail rendering, luxury Oriental art style.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(180,83,9,0.08) 100%)', '🕌',
    ARRAY['Arabian Nights', 'Royalty', 'Lanterns', 'Palace'], false,
    '/nano-banana/styles/nb-19-arabian.png', 'published', 'arabian-nights-royal'
  ),
  (
    'إمبراطور روماني', 'Roman Emperor Portrait',
    'إمبراطور روماني مهيب بالتوغا وإكليل الغار أمام الأعمدة.', 'Majestic Roman Emperor in imperial toga with laurel wreath and marble columns.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إمبراطور روماني مهيب في كامل هيبته الإمبراطورية.
الأسلوب: توغا إمبراطورية بنفسجية كلاسيكية مزيّنة، إكليل غار ذهبي، تعبير قيادي سلطوي.
الإضاءة: إضاءة رسمية كلاسيكية تُبرز الكبرياء والجلال، ضوء دراماتيكي.
الخلفية: أعمدة رخامية ضخمة وقوس الانتصار، منظر روما الإمبراطورية.
الجودة: 4K، دقة تاريخية، جودة فيلم ملحمي بأسلوب Gladiator.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait of a majestic Roman Emperor in full imperial grandeur.
Style: Classic purple imperial toga, golden laurel wreath, commanding authoritative expression.
Lighting: Formal classical lighting emphasizing power and dignity, dramatic light.
Background: Massive marble columns and triumphal arch, Imperial Rome view.
Quality: 4K, historical accuracy, epic film quality in Gladiator style.
Do not add any unrelated elements.',
    '#94a3b8', 'linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)', '🏛️',
    ARRAY['Roman', 'Emperor', 'Classical', 'Toga'], false,
    '/nano-banana/styles/nb-20-roman.png', 'published', 'roman-emperor-toga'
  ),
  (
    'أكاديمية مظلمة وكتب قديمة', 'Dark Academia Gothic Library',
    'مكتبة قوطية بأضواء الشموع وأجواء الأكاديمية الغامضة.', 'Candlelit Gothic university library with dark academia mystery.',
    'art', 'فن', 'Art',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أكاديمية مظلمة بأجواء جامعة قوطية غامضة.
الأسلوب: جماليات Dark Academia، ملابس تويد كلاسيكية، عالم فكري هادئ وغامض.
الإضاءة: ضوء شموع دافئ عنبري، ظلال ناعمة معبّرة، نوافذ زجاجية عتيقة.
الخلفية: مكتبة جامعية قوطية ضخمة، رفوف كتب جلدية ترتفع للسقف، سلالم خشبية عريقة.
الجودة: 4K، درجة ألوان عنبرية دافئة، أسلوب أكسفورد التاريخي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dark academia portrait with mysterious Gothic university atmosphere.
Style: Dark Academia aesthetics, classic tweed clothing, quiet intellectual mood.
Lighting: Warm amber candlelight, expressive soft shadows, antique stained glass windows.
Background: Grand Gothic university library, leather-bound books towering to the ceiling, antique wooden staircases.
Quality: 4K, warm amber color grade, Oxford historical style.
Do not add any unrelated elements.',
    '#78716c', 'linear-gradient(135deg, rgba(120,113,108,0.2) 0%, rgba(92,64,14,0.08) 100%)', '📚',
    ARRAY['Dark Academia', 'Gothic', 'Library', 'Oxford'], false,
    '/nano-banana/styles/nb-23-dark-academia.png', 'published', 'dark-academia-library'
  ),
  (
    'كوتيج كور في المرج المزهر', 'Cottagecore Wildflower Meadow',
    'بورتريه ريفي دافئ في مرج مزهر عند الساعة الذهبية.', 'Pastoral cottagecore portrait in a sun-drenched wildflower meadow.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه كوتيج كور ريفي دافئ في مرج زهور برية مشمس.
الأسلوب: جماليات Cottagecore الريفية الأصيلة، قبعة قش منسوجة، ملابس كتانية ناعمة.
الإضاءة: ضوء ذهبي دافئ يتسرب عبر الأعشاب الطويلة، بوكيه خوخي ناعم.
الخلفية: مرج مشمس بالزهور البرية الملونة (بابونج، خشخاش، أقحوان)، أشجار متفرقة.
الجودة: 4K، درجة ألوان فيلم إيجابي دافئة، أسلوب الساعة الذهبية الانطباعي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a warm rural cottagecore portrait in a sun-drenched wildflower meadow.
Style: Authentic Cottagecore pastoral aesthetics, woven straw hat, soft linen clothing.
Lighting: Warm golden light filtering through tall grass, soft peachy bokeh.
Background: Sunny meadow with colorful wildflowers (chamomile, poppies, daisies), scattered trees.
Quality: 4K, warm positive film color grade, golden hour impressionist photography style.
Do not add any unrelated elements.',
    '#86efac', 'linear-gradient(135deg, rgba(134,239,172,0.2) 0%, rgba(74,222,128,0.08) 100%)', '🌻',
    ARRAY['Cottagecore', 'Wildflower', 'Meadow', 'Golden Hour'], false,
    '/nano-banana/styles/nb-24-cottagecore.png', 'published', 'cottagecore-wildflower'
  ),
  (
    'أزياء إيديتوريال جريء', 'Bold Editorial Fashion',
    'تصوير أزياء إيديتوريال جريء بخلفية خضراء حارة وفلاش مباشر.', 'Stark editorial fashion portrait on lime green background with direct flash.',
    'social', 'سوشيال ميديا', 'Social Media',
    'intermediate', 'صورة نصف الجسم أو الوجه', 'Half-body or face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أزياء إيديتوريال جريء بأسلوب تصوير معاصر.
الأسلوب: Flat flash photography مباشر، ألوان حادة جريئة، طاقة جيل Z المعاصر.
الإضاءة: فلاش مباشر من الكاميرا، ظلال مسطحة، بدون تدرجات معقدة.
الخلفية: خلفية خضراء ليموني حارة موحدة، بدون فوضى.
الجودة: 4K، جودة مجلة أزياء مطبوعة، صورة حادة واضحة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a bold editorial fashion portrait in contemporary photography style.
Style: Flat direct flash photography, vivid bold colors, modern Gen-Z aesthetic energy.
Lighting: Direct on-camera flash, flat shadows, no complex gradients.
Background: Uniform hot lime green background, no clutter.
Quality: 4K, printed fashion magazine quality, sharp and clear.
Do not add any unrelated elements.',
    '#4ade80', 'linear-gradient(135deg, rgba(74,222,128,0.2) 0%, rgba(34,197,94,0.08) 100%)', '💚',
    ARRAY['Editorial', 'Fashion', 'Lime Green', 'Gen-Z'], false,
    '/nano-banana/styles/nb-25-editorial.png', 'published', 'editorial-flash-lime'
  ),
  (
    'إعصار أوراق الخريف', 'Autumn Leaves Tornado',
    'بورتريه سحري محاط بإعصار من أوراق الخريف البرتقالية والحمراء.', 'Magical portrait surrounded by a tornado of fall maple leaves.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه أو الجسم', 'Clear face or body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سحري محاط بإعصار من أوراق الخريف الاحتراقية.
الأسلوب: موجة لوليّة من أوراق القيقب بألوان الحريق الخريفي، أوراق في حركة متجمدة.
الإضاءة: ضوء خريفي دافئ برتقالي ذهبي، تسريب ضوء ذهبي عبر سحابة الأوراق.
الخلفية: غابة ضبابية ضيقة بأشجار عارية، ضوء خافت دافئ.
الجودة: 4K، تصوير لحظة احترافية، تفاصيل عالية دقيقة لكل ورقة.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical portrait surrounded by a tornado of fiery autumn leaves.
Style: Swirling vortex of maple leaves in autumn fire colors, leaves frozen in motion.
Lighting: Warm orange-golden autumn light, golden light shafts through the leaf cloud.
Background: Narrow misty forest with bare trees, soft warm ambient light.
Quality: 4K, professional moment photography, hyper-detailed individual leaves.
Do not add any unrelated elements.',
    '#f97316', 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(245,158,11,0.08) 100%)', '🍂',
    ARRAY['Autumn', 'Leaves', 'Tornado', 'Fall'], false,
    '/nano-banana/styles/nb-26-autumn.png', 'published', 'autumn-leaves-tornado'
  ),
  (
    'زخات أزهار الكرز اليابانية', 'Cherry Blossom Sakura Shower',
    'بورتريه ياباني رومانسي تحت زخة أزهار الكرز الوردية.', 'Tender Japanese portrait in a shower of pink cherry blossom petals.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ياباني رومانسي رقيق تحت زخات أزهار الكرز.
الأسلوب: بتلات ساكورا تتساقط كعاصفة وردية بطيئة، جو ياباني ربيعي حالم وعاطفي.
الإضاءة: ضوء ربيعي ناعم منتشر، بوكيه وردي حالم في كل مكان.
الخلفية: مسار ياباني قديم تصطف على جانبيه أشجار كرز متفتحة، معبد في العمق.
الجودة: 4K، درجة ألوان وردية فاتحة حالمة، أسلوب التصوير الياباني الحساس.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a tender romantic Japanese portrait under a shower of cherry blossom petals.
Style: Sakura petals falling like a slow pink blizzard, dreamy emotional Japanese spring atmosphere.
Lighting: Soft diffused spring light, dreamy pink bokeh everywhere.
Background: Ancient Japanese path lined with blooming cherry trees, temple in the distance.
Quality: 4K, dreamy light pink color grade, sensitive Japanese photography style.
Do not add any unrelated elements.',
    '#f9a8d4', 'linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(244,114,182,0.08) 100%)', '🌸',
    ARRAY['Cherry Blossom', 'Sakura', 'Japan', 'Spring'], false,
    '/nano-banana/styles/nb-28-cherry.png', 'published', 'cherry-blossom-sakura'
  ),
  (
    'عاصفة البرق الدرامية', 'Dramatic Lightning Storm',
    'بورتريه قوي مع بروق متعددة تضرب خلفه في سماء عاصفة.', 'Zeus-like portrait with multiple lightning bolts striking behind.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه قوي دراماتيكي مع عاصفة برق هائلة.
الأسلوب: قوة إلهية هائلة، برق متفرع في السماء، كهرباء في الهواء تشعّ على الجلد.
الإضاءة: وميض برق كثيف فوري، ظلال حادة قاسية، توهج بنفسجي أبيض من البرق.
الخلفية: سماء عاصفة متلاطمة مظلمة، سحب انفجارية، مطر عمودي ثقيل.
الجودة: فوتوريالستيك National Geographic، 4K، تصوير عاصفة احترافي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a powerful dramatic portrait with a massive lightning storm.
Style: God-like immense power, branching lightning across the sky, electricity in the air radiating on skin.
Lighting: Intense instantaneous lightning flash, harsh sharp shadows, purple-white glow from lightning.
Background: Dark churning storm sky, explosive clouds, heavy vertical rain.
Quality: Photorealistic National Geographic quality, 4K, professional storm photography.
Do not add any unrelated elements.',
    '#a78bfa', 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(99,102,241,0.08) 100%)', '⚡',
    ARRAY['Lightning', 'Storm', 'Zeus', 'Drama'], false,
    '/nano-banana/styles/nb-29-lightning.png', 'published', 'lightning-storm-drama'
  ),
  (
    'المحيط البيولومينسنت الليلي', 'Bioluminescent Ocean Night',
    'على شاطئ محيط متوهج بيولومينسنت بالليل مع درب التبانة.', 'Standing at the edge of a glowing bioluminescent ocean with Milky Way reflection.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه أو الجسم', 'Clear face or body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ليلي سحري عند شاطئ محيط بيولومينسنت.
الأسلوب: توهج البلانكتون البيولومينسنت الأزرق الفيروزي، مشهد طبيعي نادر مُضاء ذاتياً.
الإضاءة: ضوء أزرق فيروزي بيولومينسنت يضيء الشخص من الأسفل، سماء نجومية فوق.
الخلفية: أمواج بيولومينسنت تتكسر على الشاطئ الليلي، انعكاس درب التبانة على الماء.
الجودة: 4K، تصوير طبيعة احترافي، أسلوب وثائقي David Attenborough.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a magical nighttime portrait at a bioluminescent ocean shore.
Style: Glowing blue-teal bioluminescent plankton, rare self-illuminated natural scene.
Lighting: Blue-teal bioluminescent glow lighting the subject from below, starry sky above.
Background: Bioluminescent waves breaking on the night beach, Milky Way reflection in water.
Quality: 4K, professional nature photography, David Attenborough documentary style.
Do not add any unrelated elements.',
    '#22d3ee', 'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(6,182,212,0.08) 100%)', '🌊',
    ARRAY['Bioluminescent', 'Ocean', 'Milky Way', 'Night'], false,
    '/nano-banana/styles/nb-30-bioluminescent.png', 'published', 'bioluminescent-ocean'
  ),
  (
    'هوليوود تيل وأورانج', 'Hollywood Teal & Orange Grade',
    'درجة لون سينمائية هوليوودية بألوان تيل وأورانج مع عدسة أنامورفيك.', 'Hollywood blockbuster teal-orange color grade with anamorphic lens flare.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي هوليوودي بدرجة ألوان تيل وأورانج الكلاسيكية.
الأسلوب: LUT سينمائي تيل-أورانج هوليوودي عميق، عدسة أنامورفيك، شخصية بطولة أكشن.
الإضاءة: ضوء أمامي برتقالي دافئ على الجلد مقابل ظلال فيروزية باردة، تباين قوي.
الخلفية: مشهد سينمائي ببوكيه عميق، أضواء خلفية فيروزية خافتة.
الجودة: 8K DCI، معالجة DI احترافية، جودة إنتاج ضخم.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Hollywood cinematic portrait with the classic teal-and-orange color grade.
Style: Deep Hollywood teal-orange LUT, anamorphic lens flare, action hero look.
Lighting: Warm orange front key light on skin contrasted with cool teal shadows, high contrast.
Background: Cinematic scene with deep bokeh, subtle cool teal background accents.
Quality: 8K DCI, professional DI processing, blockbuster production quality.
Do not add any unrelated elements.',
    '#f97316', 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(6,182,212,0.08) 100%)', '🎬',
    ARRAY['Hollywood', 'Teal & Orange', 'Color Grade', 'Anamorphic'], false,
    '/nano-banana/styles/nb-31-hollywood.png', 'published', 'hollywood-teal-orange'
  ),
  (
    'أبيض وأسود كونتراست شديد', 'Extreme B&W High Contrast',
    'بورتريه فني أبيض وأسود بكونتراست شديد وحبوب فيلم.', 'Extreme high contrast fine art B&W portrait with deep shadows and film grain.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فني بالأبيض والأسود بكونتراست قصوى وحبوب فيلم درامية.
الأسلوب: كونتراست أقصى، سواد عميق كامل وهايلايت منفجر، أسلوب Sebastião Salgado.
الإضاءة: مصدر ضوء واحد قاسٍ جانبي، ظلال لا رحمة فيها، ضوء مباشر حاد.
الخلفية: خلفية تكاد تكون سوداء بالكامل، بدون تشتيت.
الجودة: 4K، حبوب فيلم ISO 3200 دراماتيكية، تطوير Ilford HP5 حاد.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art B&W portrait with extreme high contrast and dramatic film grain.
Style: Maximum contrast, deep crushed blacks and blown highlights, Sebastião Salgado style.
Lighting: Single harsh side light source, merciless shadows, hard direct light.
Background: Near-black dark background with no distractions.
Quality: 4K, dramatic ISO 3200 film grain, sharp Ilford HP5 development.
Do not add any unrelated elements.',
    '#e2e8f0', 'linear-gradient(135deg, rgba(226,232,240,0.2) 0%, rgba(71,85,105,0.08) 100%)', '🖤',
    ARRAY['Black & White', 'High Contrast', 'Film Grain', 'Fine Art'], false,
    '/nano-banana/styles/nb-32-extreme-bw.png', 'published', 'extreme-bw-grain'
  ),
  (
    'دوتون كوبالت وماجنتا', 'Duotone Cobalt & Magenta',
    'بورتريه إيديتوريال بألوان ثنائية الكوبالت الكهربائي والوردي الماجنتا.', 'Modern editorial duotone in electric cobalt blue and magenta pink.',
    'art', 'فن', 'Art',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيديتوريال حديث بتأثير الدوتون باللونين الكوبالت والماجنتا.
الأسلوب: تأثير Duotone جرافيكي، كوبالت أزرق كهربائي في الظلال، ماجنتا وردي حار في الهايلايت.
الإضاءة: إضاءة موحدة ناعمة لإبراز تأثير الدوتون بالكامل، بدون ظلال معقدة.
الخلفية: خلفية رمادية محايدة أو بيضاء لإبراز اللونين.
الجودة: 4K، جودة تصميم جرافيك غلاف مجلة، أسلوب Andy Warhol الرقمي.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a modern editorial portrait with duotone effect in cobalt and magenta.
Style: Graphic design duotone effect, electric cobalt blue in shadows, hot magenta pink in highlights.
Lighting: Uniform soft lighting to maximize the duotone effect, no complex shadows.
Background: Neutral gray or white background to make the dual colors pop.
Quality: 4K, graphic magazine cover design quality, digital Andy Warhol style.
Do not add any unrelated elements.',
    '#f472b6', 'linear-gradient(135deg, rgba(244,114,182,0.2) 0%, rgba(96,165,250,0.08) 100%)', '🎭',
    ARRAY['Duotone', 'Cobalt', 'Magenta', 'Editorial'], false,
    '/nano-banana/styles/nb-33-duotone.png', 'published', 'duotone-cobalt-magenta'
  ),
  (
    'صورة سيبيا عتيقة عشرينات القرن', '1920s Vintage Sepia Photograph',
    'صورة فوتوغرافية عتيقة بأسلوب عشرينات القرن مع خدوش الفيلم.', 'Authentic 1920s faded sepia photograph with Art Deco fashion.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة للوجه', 'Any clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ صورة فوتوغرافية أثرية عتيقة بأسلوب عشرينات القرن العشرين.
الأسلوب: سيبيا باهت بمسحة صفراء قديمة، أزياء آرت ديكو من العشرينات، ملصق موضة فينتاج.
النسيج: خدوش الفيلم والغبار الدقيق، تلاشٍ زمني، حدة مخففة كالصور القديمة.
التأطير: إطار بيضاوي أو مستطيل بحواف ناعمة وتلاشٍ، ورق عتيق في الخلفية.
الجودة: أصالة تاريخية عالية، نسيج ورق صور عتيق، جودة متحف.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an archival vintage photograph in 1920s period style.
Style: Faded sepia with slight yellow cast, Art Deco 1920s fashion, vintage Vogue portrait.
Texture: Film scratches, subtle dust particles, time damage, slightly reduced sharpness.
Framing: Oval or rectangular frame with soft edges and fade, antique paper background.
Quality: High historical authenticity, antique photo paper texture, museum quality.
Do not add any unrelated elements.',
    '#d97706', 'linear-gradient(135deg, rgba(217,119,6,0.2) 0%, rgba(180,83,9,0.08) 100%)', '📷',
    ARRAY['1920s', 'Vintage', 'Sepia', 'Art Deco'], false,
    '/nano-banana/styles/nb-34-vintage-sepia.png', 'published', 'vintage-sepia-photo'
  ),
  (
    'تصوير إنفراريد حالم', 'Surreal Infrared Photography',
    'تأثير التصوير بالإنفراريد مع جلد متوهج وسماء أرجوانية حالمة.', 'Infrared photography effect with glowing ethereal skin and surreal purple sky.',
    'art', 'فن', 'Art',
    'advanced', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سوريالي بتأثير التصوير الإنفراريد الاحترافي.
الأسلوب: محاكاة فيلم إنفراريد، جلد يتوهج بلون أبيض أثيري كالنور الداخلي.
الألوان: سماء سوداء أو بنفسجية داكنة سريالية، أوراق شجر بيضاء لامعة، جلد شفاف متوهج.
الخلفية: مشهد طبيعي بأشجار بيضاء لامعة، سماء دراماتيكية داكنة، غابة حالمة.
الجودة: 4K، محاكاة فيلم Kodak Aerochrome، درجة ألوان Technicolor خيالية.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a surreal portrait with professional infrared photography simulation.
Style: Infrared film simulation, skin glowing ethereal white from within.
Colors: Black or dark surreal purple sky, bright white glowing leaves, translucent ethereal skin.
Background: Natural setting with glowing white trees, dark dramatic sky, dreamlike forest.
Quality: 4K, Kodak Aerochrome film simulation, Technicolor fantasy color grade.
Do not add any unrelated elements.',
    '#86efac', 'linear-gradient(135deg, rgba(134,239,172,0.2) 0%, rgba(167,139,250,0.08) 100%)', '🌿',
    ARRAY['Infrared', 'Surreal', 'Purple Sky', 'Ethereal'], false,
    '/nano-banana/styles/nb-35-infrared.png', 'published', 'infrared-surreal'
  ),
  (
    'انفجار قنبلة الدخان', 'Crimson & Cobalt Smoke Bomb',
    'تصوير ديناميكي مع انفجارات دخان قرمزي وكوبالتي.', 'Dynamic smoke bomb photography with crimson and cobalt explosions.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الجسم كاملة أو نصف الجسم', 'Full or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ديناميكي مع انفجارات قنبلة الدخان القرمزية والكوبالتية.
الأسلوب: تصوير قنبلة دخان عالي الطاقة، دخان قرمزي وكوبالتي يتدفق ويلتف بديناميكية.
الإضاءة: ضوء عاكس من الدخان الملون، ظلال تدريجية ملونة حول الشخص.
الخلفية: خلفية داكنة لإبراز الدخان الملون، بيئة خارجية مفتوحة.
الجودة: 4K، تصوير حركة احترافي، ألوان حيوية متشبعة.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a dynamic portrait with crimson and cobalt smoke bomb explosions.
Style: High-energy smoke bomb photography, billowing crimson and cobalt smoke swirling dynamically.
Lighting: Reflected light from the colorful smoke, graduated colored shadows around the subject.
Background: Dark background to highlight the colorful smoke, open outdoor setting.
Quality: 4K, professional action photography, vivid saturated colors.
Do not add any unrelated elements.',
    '#f87171', 'linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(96,165,250,0.08) 100%)', '💨',
    ARRAY['Smoke Bomb', 'Crimson', 'Cobalt', 'Dynamic'], false,
    '/nano-banana/styles/nb-37-smoke-bomb.png', 'published', 'smoke-bomb-crimson'
  ),
  (
    'ضوء هولوغرافي قوس قزح', 'Holographic Prismatic Rainbow',
    'انعكاسات قوس قزح البريزمية والهولوغرامية على الوجه.', 'Holographic prismatic rainbow light refractions with iridescent glow.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيديتوريال مستقبلي بانعكاسات ضوء هولوغرافي بريزمي.
الأسلوب: انكسار طيفي قوس قزح كامل عبر الوجه، ألوان بريزمية بديعة كفقاعة الصابون.
الإضاءة: ضوء هولوغرافي متشعب من كل الاتجاهات، انعكاسات ملونة تغطي الوجه والجسم.
الخلفية: خلفية بيضاء أو رمادية لإبراز الانكسارات الملونة.
الجودة: 4K، جودة إيديتوريال Vogue مستقبلي، بريزما بصرية عالية الدقة.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a futuristic editorial portrait with holographic prismatic light refractions.
Style: Full rainbow spectrum refractions across face, beautiful soap-bubble iridescent colors.
Lighting: Holographic light radiating from all directions, colorful reflections covering face and body.
Background: White or gray background to fully showcase the colorful refractions.
Quality: 4K, futuristic Vogue editorial quality, high-definition optical prism rendering.
Do not add any unrelated elements.',
    '#c084fc', 'linear-gradient(135deg, rgba(192,132,252,0.2) 0%, rgba(34,211,238,0.08) 100%)', '🌈',
    ARRAY['Holographic', 'Prismatic', 'Rainbow', 'Iridescent'], false,
    '/nano-banana/styles/nb-38-holographic.png', 'published', 'holographic-prismatic'
  ),
  (
    'التعريض المزدوج غابة وجبال', 'Double Exposure Pine Forest',
    'تعريض مزدوج فني يمزج صلويت الشخص مع غابة صنوبر وجبال.', 'Fine art double exposure blending silhouette with pine forest and mountains.',
    'art', 'فن', 'Art',
    'advanced', 'صورة واضحة للوجه أو الجسم', 'Clear face or body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة فنية بتقنية التعريض المزدوج تمزج الصلويت مع الطبيعة.
الأسلوب: صلويت الشخص مملوء بغابة صنوبر كثيفة وجبال ثلجية، مزج سلس أبيض وأسود.
الألوان: درجة ألوان الساعة الزرقاء الباردة، ألوان معدنية زرقاء وسيانية.
التقنية: مزج طبقات (screen/multiply)، حواف الصلويت حادة وخطية.
الجودة: 4K، تصوير فني تجريدي احترافي، جودة طباعة Fine Art.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a fine art double exposure piece blending silhouette with nature.
Style: Subject silhouette filled with dense pine forest and snowy mountain peaks, seamless B&W blend.
Colors: Cold blue hour color grade, metallic blue and cyan tones.
Technique: Layer blending (screen/multiply), sharp clean silhouette edges.
Quality: 4K, professional abstract fine art photography, Fine Art print quality.
Do not add any unrelated elements.',
    '#60a5fa', 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(52,211,153,0.08) 100%)', '🌲',
    ARRAY['Double Exposure', 'Pine Forest', 'Mountains', 'Silhouette'], false,
    '/nano-banana/styles/nb-39-double-exp.png', 'published', 'double-exposure-forest'
  ),
  (
    'باريس عند غروب الشمس', 'Paris Golden Hour Eiffel',
    'بورتريه رومانسي في باريس مع برج إيفل المضيء عند الغروب.', 'Romantic Paris portrait with glowing Eiffel Tower at golden hour.',
    'art', 'فن', 'Art',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه رومانسي في باريس خلال ساعة الغروب الذهبي.
الأسلوب: أجواء فرنسية رومانسية راقية، ملابس أنيقة باريسية، تعبير دافئ بهيج.
الإضاءة: ضوء غروب ذهبي دافئ يغمر المشهد، هالة ذهبية خلف البرج الشهير.
الخلفية: برج إيفل يتوهج بالذهبي في الخلف، رصيف مقهى باريسي أنيق.
الجودة: 4K، تصوير سفر احترافي، درجة ألوان رومانسية دافئة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a romantic portrait in Paris during golden hour sunset.
Style: Elegant romantic French atmosphere, chic Parisian attire, warm joyful expression.
Lighting: Warm golden sunset light flooding the scene, golden halo behind the iconic tower.
Background: Eiffel Tower glowing golden behind, elegant Parisian sidewalk café.
Quality: 4K, professional travel photography, warm romantic color grade.
Do not add any unrelated elements.',
    '#f9a8d4', 'linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(245,158,11,0.08) 100%)', '🗼',
    ARRAY['Paris', 'Eiffel Tower', 'Golden Hour', 'Romantic'], false,
    '/nano-banana/styles/nb-41-paris.png', 'published', 'paris-eiffel-golden'
  ),
  (
    'تحت الماء في الشعاب المرجانية', 'Underwater Coral Reef Portrait',
    'بورتريه تحت الماء في شعاب مرجانية ملونة بمياه الكاريبي.', 'Vibrant underwater portrait in crystal Caribbean coral reef.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه احترافي تحت الماء في شعاب مرجانية استوائية زاهية.
الأسلوب: تصوير تحت الماء احترافي، شعاب مرجانية ملونة حية، وزن صفري سلمي.
الإضاءة: أشعة الشمس تخترق الماء بتموجات caustics على الجلد، ضوء أزرق فيروزي ناعم.
الخلفية: شعاب مرجانية استوائية كثيفة، أسماك ملونة تحلق حوله، ماء كريستالي صافٍ.
الجودة: 4K، تصوير تحت الماء احترافي، جودة National Geographic مائي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional underwater portrait in vibrant tropical coral reef.
Style: Professional underwater photography, colorful living coral reefs, peaceful weightlessness.
Lighting: Sunlight rays penetrating the water with caustics rippling on skin, soft blue-teal ambient.
Background: Dense tropical coral reef, colorful tropical fish swimming around, crystal clear water.
Quality: 4K, professional underwater photography, National Geographic aquatic quality.
Do not add any unrelated elements.',
    '#22d3ee', 'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(16,185,129,0.08) 100%)', '🐠',
    ARRAY['Underwater', 'Coral Reef', 'Caribbean', 'Turquoise'], false,
    '/nano-banana/styles/nb-43-underwater.png', 'published', 'underwater-coral-reef'
  ),
  (
    'تايمز سكوير نيويورك', 'NYC Times Square Night',
    'بورتريه في تايمز سكوير مع لافتات LED ضخمة وحيوية المدينة.', 'Portrait in blazing Times Square with massive LED billboards.',
    'art', 'فن', 'Art',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه حضري نابض في تايمز سكوير نيويورك الليلي.
الأسلوب: تصوير وثائقي شارعي حضري، طاقة نيويورك الحيوية الليلية المتوثبة.
الإضاءة: إضاءة متعددة المصادر من اللافتات LED الضخمة بألوان مختلطة جريئة.
الخلفية: لافتات LED ضخمة تغطي كل شيء، سيارات أجرة صفراء في حركة، حشود المارة.
الجودة: 4K، تصوير شارعي احترافي ليلي، أسلوب المصور الصحفي.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a vibrant urban portrait at night in Times Square, New York City.
Style: Urban street documentary photography, pulsating NYC night energy.
Lighting: Multi-source lighting from massive LED billboards in bold mixed colors.
Background: Massive LED billboards covering everything, moving yellow taxis, crowds of pedestrians.
Quality: 4K, professional nighttime street photography, photojournalist style.
Do not add any unrelated elements.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(239,68,68,0.08) 100%)', '🗽',
    ARRAY['NYC', 'Times Square', 'LED', 'New York'], false,
    '/nano-banana/styles/nb-44-nyc.png', 'published', 'nyc-times-square'
  ),
  (
    'سانتوريني اليونانية', 'Santorini Greek Island',
    'بورتريه في سانتوريني مع المباني البيضاء والقباب الزرقاء.', 'Portrait in iconic Santorini with white Cycladic buildings and blue domes.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه إيجابي مشمس في جزيرة سانتوريني اليونانية الأيقونية.
الأسلوب: أجواء متوسطية دافئة، مبانٍ بيضاء ناصعة دوارية، قباب كنائس زرقاء فاقعة.
الإضاءة: ضوء شمسي متوسطي ساطع ودافئ، انعكاس الشمس على البحر الأزرق.
الخلفية: معمارية سيكلاديك بيضاء أيقونية، قباب كنائس زرقاء، بحر إيجه الفيروزي.
الجودة: 4K، تصوير سفر احترافي، درجة ألوان متوسطية مشرقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sunny positive portrait on the iconic Greek island of Santorini.
Style: Warm Mediterranean atmosphere, brilliant white Cycladic buildings, vivid blue church domes.
Lighting: Bright warm Mediterranean sunlight, sun reflection on the blue sea.
Background: Iconic white Cycladic architecture, blue church domes, turquoise Aegean sea.
Quality: 4K, professional travel photography, bright Mediterranean color grade.
Do not add any unrelated elements.',
    '#60a5fa', 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(34,211,238,0.08) 100%)', '🇬🇷',
    ARRAY['Santorini', 'Greece', 'Mediterranean', 'Blue Domes'], false,
    '/nano-banana/styles/nb-45-santorini.png', 'published', 'santorini-greek-isle'
  ),
  (
    'ملاك سماوي بأجنحة ريش', 'Celestial Angel Portrait',
    'بورتريه ملاك سماوي بأجنحة ريش بيضاء ضخمة وضوء إلهي.', 'Celestial angel with enormous white feathered wings and divine golden light.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملاك سماوي إلهي بأجنحة ريش ضخمة وضوء إلهي.
الأسلوب: ملاك سماوي نقي راقٍ، أجنحة ريش بيضاء ضخمة منتشرة بالكامل، تعبير هادئ حكيم.
الإضاءة: أشعة ضوء ذهبية إلهية تنهمر من السماء، هالة ذهبية، توهج أبيض أثيري.
الخلفية: سحب سماوية بيضاء ناعمة ولامعة، سماء أزرق سماوي، أشعة ذهبية تنتشر.
الجودة: 4K، فن مقدس راقٍ، أسلوب لوحات سقف كنائس النهضة الإيطالية.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a celestial divine angel portrait with enormous feathered wings and divine light.
Style: Pure regal celestial angel, enormous white feathered wings fully spread, serene wise expression.
Lighting: Golden divine light rays pouring from heaven, golden halo, ethereal white glow.
Background: Soft glowing white heavenly clouds, sky blue background, spreading golden rays.
Quality: 4K, high sacred art quality, Italian Renaissance church ceiling painting style.
Do not add any unrelated elements.',
    '#fef9c3', 'linear-gradient(135deg, rgba(254,249,195,0.3) 0%, rgba(251,191,36,0.08) 100%)', '👼',
    ARRAY['Angel', 'Celestial', 'Wings', 'Divine'], false,
    '/nano-banana/styles/nb-47-angel.png', 'published', 'celestial-angel'
  ),
  (
    'ناجٍ من نهاية العالم', 'Post-Apocalyptic Survivor',
    'بورتريه جريء لناجٍ في مدينة مدمرة مع إضاءة قاسية.', 'Gritty post-apocalyptic survivor in ruined cityscape with harsh light.',
    'art', 'فن', 'Art',
    'advanced', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه جريء لناجٍ في عالم ما بعد نهاية الكون.
الأسلوب: جماليات The Last of Us / Mad Max، ملابس متهالكة مُرقّعة، وجه يروي قصة النجاة.
الإضاءة: ضوء قاسٍ حاد من مصدر واحد، رماد وغبار في الهواء يتسرب الضوء منها.
الخلفية: مدينة كبرى منهارة محترقة، مبانٍ متهالكة، طبيعة تستعيد أرضها.
الجودة: 4K، جودة إنتاج لعبة AAA أو فيلم خيال علمي احترافي.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a gritty portrait of a survivor in a post-apocalyptic world.
Style: The Last of Us / Mad Max aesthetics, worn patched clothing, face showing a survival story.
Lighting: Harsh direct light from a single source, dust and ash in the air diffusing the light.
Background: Collapsed burned major city, crumbling buildings, nature reclaiming the ruins.
Quality: 4K, AAA game or professional sci-fi film production quality.
Do not add any unrelated elements.',
    '#f87171', 'linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(120,53,15,0.08) 100%)', '🌆',
    ARRAY['Post-Apocalyptic', 'Survivor', 'Ruined City', 'Gritty'], false,
    '/nano-banana/styles/nb-48-apocalyptic.png', 'published', 'post-apocalyptic-survivor'
  ),
  (
    'عرش ملكي مع مخمل وتاج', 'Royal Throne Portrait',
    'بورتريه ملكي مهيب على عرش مزخرف مع مخمل وتاج.', 'Regal royal portrait on ornate throne with velvet crimson robes and jeweled crown.',
    'professional', 'احترافي', 'Professional',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه ملكي مهيب بكامل أبهة العرش والتاج.
الأسلوب: بورتريه ملكي رسمي، روب مخمل قرمزي ذهبي الحدود، تاج مرصع بالجواهر الكريمة.
الإضاءة: إضاءة قاعة العرش المسرحية الدراماتيكية، مصادر ضوء متعددة رسمية.
الخلفية: عرش مزخرف فخم من الذهب والخشب الأصيل، قاعة قصر ضخمة بستائر حرير ذهبية.
الجودة: 4K، أسلوب بورتريه الحكام الرسمي، جودة فنان البلاط الملكي.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a majestic royal portrait in full throne and crown splendor.
Style: Formal royal portrait, crimson velvet robe with gold trim, jeweled crown studded with precious gems.
Lighting: Dramatic theatrical throne room lighting, multiple formal light sources.
Background: Ornate gold and antique wood throne, grand palace hall with golden silk curtains.
Quality: 4K, formal ruler portrait style, royal court painter quality.
Do not add any unrelated elements.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(180,83,9,0.08) 100%)', '👑',
    ARRAY['Royal', 'Throne', 'Crown', 'Velvet'], false,
    '/nano-banana/styles/nb-49-royal-throne.png', 'published', 'royal-throne-velvet'
  ),
  (
    'واجهة هولوغرامية مستقبلية', 'Sci-Fi Holographic Interface',
    'محاط بلوحات واجهة هولوغرامية طائفة وتدفقات بيانات.', 'Surrounded by floating holographic panels, cascading code and data streams.',
    'fun', 'ترفيه', 'Fun',
    'advanced', 'صورة واضحة للوجه أو نصف الجسم', 'Clear face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه خيال علمي محاط بلوحات واجهة هولوغرامية مستقبلية.
الأسلوب: جماليات Minority Report الحديثة، لوحات واجهة هولوغرامية شفافة طائرة، تدفقات بيانات.
الإضاءة: ضوء سيان مستقبلي بارد يعكس من اللوحات على الوجه، بيئة تقنية متوهجة.
الخلفية: فضاء مكتبي مستقبلي مظلم مع شاشات هولوغرامية لا حصر لها، مدينة مضيئة من خلف.
الجودة: 4K، جودة إنتاج فيلم خيال علمي ضخم، تأثيرات بصرية احترافية.
لا تضف أي نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a sci-fi portrait surrounded by futuristic holographic interface panels.
Style: Modern Minority Report aesthetics, transparent floating holographic panels, cascading data streams.
Lighting: Cold cyan futuristic light reflecting from panels onto face, glowing tech environment.
Background: Dark futuristic workspace with countless holographic screens, lit city visible behind.
Quality: 4K, major sci-fi blockbuster production quality, professional VFX.
Do not add any unrelated text.',
    '#22d3ee', 'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🤖',
    ARRAY['Sci-Fi', 'Holographic', 'Interface', 'Minority Report'], false,
    '/nano-banana/styles/nb-50-sci-fi.png', 'published', 'sci-fi-holo-interface'
  ),
  (
    'بورتريه جيبلي عالي الدقة', 'Studio Ghibli HD Portrait',
    'بورتريه دقيق الفنية بأسلوب جيبلي مع إضاءة سحرية.', 'High-fidelity Ghibli anime portrait with magical soft lighting.',
    'art', 'فن', 'Art',
    'beginner', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه أنمي دقيق الجودة بأسلوب استوديو جيبلي عالي الدقة.
الأسلوب: أنيميشن جيبلي عالي الجودة، ملمس ريشي زيتي ناعم، ألوان دافئة غنية.
الإضاءة: إضاءة جيبلي السحرية الشهيرة، ضوء طبيعي مُرشَّح ناعم.
الخلفية: خلفية خضراء كثيفة بأسلوب رسوم جيبلي المتقن، أشجار وضوء شمسي.
الجودة: جودة 2K أنيميشن استوديو، تفاصيل دقيقة في الشعر والعيون والتعابير.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-fidelity anime portrait in detailed Studio Ghibli style.
Style: High-quality Ghibli animation, soft painterly oil-like texture, warm rich colors.
Lighting: Famous Ghibli magical lighting, soft natural filtered light.
Background: Dense green background in Ghibli''s meticulous art style, trees and sunlight.
Quality: 2K studio animation quality, detailed rendering of hair, eyes, and expressions.
Do not add any unrelated elements.',
    '#34d399', 'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(74,222,128,0.08) 100%)', '🌿',
    ARRAY['Ghibli', 'Anime', 'Painterly', 'HD'], false,
    '/nano-banana/styles/nb-ghibli-hd.png', 'published', 'ghibli-portrait-hd'
  ),
  (
    'شخصية تشيبي ثلاثية الأبعاد', '3D Chibi Character',
    'شخصية تشيبي 3D مبهجة برأس كبير وجسم صغير.', 'Adorable 3D Chibi character with large head and small body.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية تشيبي ثلاثية الأبعاد مبهجة بنسبة رأس إلى جسم 1:2.
الأسلوب: شخصية Super Deformed تشيبي، رأس ضخم جذاب وجسم صغير بسيط.
التفاصيل: عيون كبيرة لامعة معبّرة جداً، تعبير وجه لطيف مبهج، شعر مفصل.
الإضاءة: إضاءة استوديو 3D لطيفة دافئة، ظلال ناعمة على ملمس اللعبة.
الخلفية: خلفية بيضاء نظيفة أو تدرجية ناعمة لإبراز الشخصية.
الجودة: 4K render ثلاثي الأبعاد، جودة لعبة Next-Gen.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a joyful 3D Chibi character with a 1:2 head-to-body ratio.
Style: Super Deformed Chibi character, large attractive head and small simple body.
Details: Large luminous very expressive eyes, adorable joyful expression, detailed hair.
Lighting: Gentle warm 3D studio lighting, soft shadows on the toy-like texture.
Background: Clean white or soft gradient background to showcase the character.
Quality: 4K 3D render, Next-Gen game quality.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)', '🎎',
    ARRAY['Chibi', '3D', 'Cute', 'Toy Art'], false,
    '/nano-banana/styles/nb-chibi-3d.png', 'published', 'chibi-3d-portrait'
  ),
  (
    'مجسم في صندوق جامع', 'Collector Action Figure Box',
    'شخصية داخل صندوق جامع احترافي بنافذة بلاستيكية شفافة.', 'Action figure packaged in a professional collector''s toy box.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة نصف الجسم أو كاملة', 'Half or full-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية Action Figure داخل صندوق جامع احترافي عالي الجودة.
الأسلوب: صندوق لعبة بلاستيكي تجاري احترافي، نافذة شفافة تُظهر الشخصية بوضوح.
التفاصيل: طباعة صندوق ملونة مُصمَّمة باحترافية، علامة "Limited Edition 2026"، اسم الشخصية.
الإضاءة: إضاءة منتج استوديو احترافية موزعة بشكل متساوٍ.
الخلفية: خلفية بيضاء نظيفة لتصوير منتج تجاري أنيق.
الجودة: 4K، تصوير منتج احترافي، جودة إعلان تجاري.
لا تضف أي نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an action figure character inside a professional high-quality collector toy box.
Style: High-quality commercial plastic toy box, transparent window clearly showcasing the figure.
Details: Professionally designed colorful box printing, "Limited Edition 2026" label, character name.
Lighting: Professional studio product lighting, evenly distributed.
Background: Clean white background for clean commercial product photography.
Quality: 4K, professional product photography, commercial advertisement quality.
Do not add any unrelated text.',
    '#fbbf24', 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.08) 100%)', '📦',
    ARRAY['Action Figure', 'Collector Box', 'Toy', 'Packaging'], false,
    '/nano-banana/styles/nb-action-fig-v2.png', 'published', 'action-fig-collector-v2'
  ),
  (
    'شخصية فانكو بوب فينيل', 'Funko Pop Vinyl Figure',
    'بورتريه بأسلوب دمية فانكو بوب الأيقونية برأس ضخم.', 'Iconic Funko Pop vinyl figure with oversized head and button eyes.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه', 'Face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية فانكو بوب فينيل أيقونية بالرأس الضخم والملامح المبسطة.
الأسلوب: فانكو بوب Classic فينيل، رأس ضخم بنسبة 1:3، عيون زرار سوداء كبيرة.
التفاصيل: ملامح وجه مبسطة أيقونية، ملابس الشخصية مُبسَّطة، نسب مميزة Funko.
الإضاءة: إضاءة استوديو 3D منتج، ملمس بلاستيك فينيل مطفأ ناعم.
الخلفية: صندوق فانكو بوب الأيقوني بنافذة شفافة، تصميم غلاف احترافي.
الجودة: 4K render ثلاثي الأبعاد، جودة Funko الرسمية.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an iconic Funko Pop vinyl figure with oversized head and simplified features.
Style: Classic Funko Pop vinyl, 1:3 oversized head, large black button eyes.
Details: Iconic simplified facial features, simplified character clothing, signature Funko proportions.
Lighting: 3D product studio lighting, smooth matte vinyl plastic texture.
Background: Iconic Funko Pop windowed collector box, professional cover design.
Quality: 4K 3D render, official Funko quality standard.
Do not add any unrelated elements.',
    '#8ed5ff', 'linear-gradient(135deg, rgba(142,213,255,0.2) 0%, rgba(99,102,241,0.08) 100%)', '🧸',
    ARRAY['Funko Pop', 'Vinyl Figure', 'Collector', 'Toy'], false,
    '/nano-banana/styles/nb-funko-pop.png', 'published', 'funko-pop-vinyl'
  ),
  (
    'شخصية نيندرويد أنمي', 'Nendoroid Anime Figure',
    'شخصية نيندرويد أنمي سوبر ديفورمد مع مفاصل مرئية.', 'Super-deformed Nendoroid anime figure with visible joints.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية نيندرويد Super Deformed أنمي بمفاصل مرئية.
الأسلوب: نيندرويد Super Deformed الأيقوني، رأس كبير متناسق، جسم صغير قصير.
التفاصيل: وجه أنمي لطيف معبّر، مفاصل مرئية للذراعين والساقين، ملابس مُبسَّطة مفصلة.
الإضاءة: إضاءة استوديو ثلاثية الأبعاد ناعمة، ملمس مطفأ راقٍ.
الخلفية: قاعدة نيندرويد البيضاء الشفافة القياسية، أو خلفية بسيطة نظيفة.
الجودة: 4K render ثلاثي الأبعاد دقيق، جودة Good Smile Company.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create an iconic Super Deformed Nendoroid anime figure with visible joints.
Style: Iconic Nendoroid Super Deformed, large proportional head, small short body.
Details: Cute expressive anime face, visible arm and leg joints, simplified detailed clothing.
Lighting: Soft 3D studio lighting, refined matte texture finish.
Background: Standard transparent white Nendoroid base, or clean simple background.
Quality: Detailed 4K 3D render, Good Smile Company product quality.
Do not add any unrelated elements.',
    '#f87171', 'linear-gradient(135deg, rgba(248,113,113,0.2) 0%, rgba(244,114,182,0.08) 100%)', '✨',
    ARRAY['Nendoroid', 'Anime Figure', 'Super Deformed', 'Cute'], false,
    '/nano-banana/styles/nb-nendoroid.png', 'published', 'nendoroid-figure'
  ),
  (
    'لعبة قطيفة محشوة', 'Plush Stuffed Toy',
    'تحويل بورتريه إلى لعبة قطيفة ناعمة مع تفاصيل خياطة.', 'Portrait transformed into a soft plush stuffed toy with stitched details.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ نسخة لعبة قطيفة محشوة دافئة ومحببة.
الأسلوب: لعبة قطيفة ناعمة بملمس قماش واضح ومحبوب، وجه بتعبير لطيف ودود.
التفاصيل: تفاصيل خياطة مرئية واضحة، عيون أزرار أو خيط، شعر ناعم قطيفة.
الإضاءة: إضاءة دافئة مريحة مغمورة، ضوء ناعم يبرز ملمس القطيفة.
الخلفية: خلفية دافئة ناعمة أو بيضاء نظيفة، أجواء منزلية مريحة.
الجودة: 4K render فائق الدقة، تفاصيل قماشية دقيقة جداً.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a warm loveable plush stuffed toy version.
Style: Soft plush toy with visible fabric texture, face with kind friendly expression.
Details: Clearly visible stitching details, button or thread eyes, soft fuzzy hair.
Lighting: Warm comfortable ambient lighting, soft light showcasing the plush texture.
Background: Soft warm or clean white background, cozy home atmosphere.
Quality: Hyperrealistic 4K render, very detailed fabric textures.
Do not add any unrelated elements.',
    '#d0bcff', 'linear-gradient(135deg, rgba(208,188,255,0.2) 0%, rgba(244,114,182,0.08) 100%)', '🧸',
    ARRAY['Plush', 'Stuffed Toy', 'Soft', 'Cozy'], false,
    '/nano-banana/styles/nb-plush-toy.png', 'published', 'plush-stuffed-toy'
  ),
  (
    'أسلوب باربي دريم هاوس', 'Barbie Dreamhouse Style',
    'جمالية باربي الوردية البراقة مع شعر وماكياج مثالي.', 'Vibrant pink Barbie aesthetic with glamorous plastic look.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه بأسلوب عالم باربي دريم هاوس الوردي الزاهي.
الأسلوب: جماليات باربي أيقونية، ثيم وردي كانزاسي فاقع، بلاستيك لامع مثالي، كمال متصنّع.
التفاصيل: شعر مثالي مشفر، ماكياج لامع مثالي، ملابس موضة عالية جذابة.
الإضاءة: إضاءة وردية دافئة ناعمة من كل الاتجاهات، توهج مثالي.
الخلفية: غرفة دريم هاوس وردية لامعة، ديكورات باربي المميزة.
الجودة: 4K، جودة بلاستيك لامع فاخر، أسلوب إعلان Mattel Barbie.
لا تضف أي عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait in the vibrant pink Barbie Dreamhouse aesthetic.
Style: Iconic Barbie aesthetics, vivid hot pink theme, perfect shiny plastic, artificial perfection.
Details: Perfectly set hair, perfect glossy makeup, high-glamour fashion attire.
Lighting: Soft warm pink lighting from all directions, perfect soft glow.
Background: Gleaming pink Dreamhouse room, signature Barbie décor.
Quality: 4K, luxury shiny plastic quality, Mattel Barbie advertisement style.
Do not add any unrelated elements.',
    '#f9a8d4', 'linear-gradient(135deg, rgba(249,168,212,0.2) 0%, rgba(244,114,182,0.08) 100%)', '👱',
    ARRAY['Barbie', 'Pink', 'Dreamhouse', 'Glamorous'], false,
    '/nano-banana/styles/nb-barbie.png', 'published', 'barbie-dreamhouse'
  ),
  (
    'دمية براتز Y2K', 'Bratz Doll Y2K Aesthetic',
    'جمالية دمية براتز Y2K مع عيون لوزية كبيرة وأزياء الألفية.', 'Bratz Doll Y2K aesthetic with large almond eyes and 2000s fashion.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه بجمالية دمية براتز Y2K بأسلوب الألفينات الجريء.
الأسلوب: جمالية براتز Y2K الأيقونية، عيون لوزية كبيرة جريئة مع خط عيون سميك.
التفاصيل: شفاه لامعة مبالغ فيها، تعبير شخصية قوي، ملابس موضة الألفينات الجريئة.
الإضاءة: إضاءة براقة جريئة ساطعة، ألوان حيوية متشبعة.
الخلفية: خلفية ملونة جريئة أو بيئة موضة الألفينات.
الجودة: 4K، جودة دمية بلاستيكية براقة، أسلوب إعلان MGA Entertainment.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a portrait in the bold Bratz Doll Y2K aesthetic.
Style: Iconic Bratz Y2K aesthetic, large bold almond eyes with heavy eyeliner.
Details: Exaggerated glossy lips, strong personality expression, bold 2000s fashion clothing.
Lighting: Bright bold vivid lighting, highly saturated colors.
Background: Bold colorful background or 2000s fashion environment.
Quality: 4K, glossy plastic doll quality, MGA Entertainment advertisement style.
Do not add any unrelated elements.',
    '#8ed5ff', 'linear-gradient(135deg, rgba(142,213,255,0.2) 0%, rgba(208,188,255,0.08) 100%)', '💄',
    ARRAY['Bratz', 'Y2K', '2000s', 'Doll Aesthetic'], false,
    '/nano-banana/styles/nb-bratz-y2k.png', 'published', 'bratz-doll-y2k'
  ),
  (
    'دمية بوب مارت الصندوق المغلق', 'Pop Mart Blind Box Figure',
    'شخصية بوب مارت فنية بإنهاء راتنج ناعم وتفاصيل خيالية.', 'Pop Mart designer blind box figure with smooth resin finish.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه', 'Face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية بوب مارت Designer Toy بأسلوب الصندوق المغلق الفني.
الأسلوب: جمالية لعبة مصمم راتنجي، ملمس راتنج ناعم مطفأ، تفاصيل نقية دقيقة الحرفية.
الألوان: لوحة ألوان باستيل حالمة مع تفاصيل متناقضة، أسلوب MOLLY أو DIMOO.
التفاصيل: تعبير عيون مُبسَّط حالم، ملامح نقية مختصرة، نسب شخصية مميزة.
الخلفية: تصوير منتج راقٍ على قاعدة شفافة، خلفية ناعمة متدرجة.
الجودة: 4K render راتنجي فائق الدقة، جودة تصوير منتج Pop Mart الرسمية.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a Pop Mart Designer Toy character in blind box art style.
Style: Designer resin toy aesthetic, smooth matte resin finish, pure detailed craftsmanship.
Colors: Dreamy pastel color palette with contrasting details, MOLLY or DIMOO style.
Details: Simplified dreamy eye expression, pure minimal features, distinctive character proportions.
Background: Premium product photography on transparent base, soft gradient background.
Quality: Hyperrealistic 4K resin render, official Pop Mart product photography quality.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(249,168,212,0.08) 100%)', '🎁',
    ARRAY['Pop Mart', 'Blind Box', 'Designer Toy', 'Resin'], false,
    '/nano-banana/styles/nb-pop-mart.png', 'published', 'pop-mart-blind-box'
  ),
  (
    'آرت ديكو عشرينات القرن', '1920s Art Deco Flapper',
    'جمالية آرت ديكو الذهبية والسوداء بأنماط هندسية من عشرينات القرن.', 'Vintage 1920s Art Deco flapper style with gold and black geometric patterns.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه أو نصف الجسم', 'Face or half-body photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه فينتاج بجماليات آرت ديكو عشرينات القرن الذهبية.
الأسلوب: أيقونية آرت ديكو الذهبية والسوداء، أنماط هندسية نقية رشيقة من عشرينات القرن.
التفاصيل: ملابس فلابر أنيقة بتفاصيل ذهبية، إكسسوارات من عقد اللؤلؤ وعصابة الرأس.
الإضاءة: إضاءة دراماتيكية كلاسيكية ذهبية من جانب واحد.
الخلفية: خلفية أنماط آرت ديكو هندسية ذهبية وسوداء، أسلوب ملصق فينتاج.
الجودة: 4K، أسلوب Erté الأيقوني، جودة فن رسم فيكتور راقٍ.
لا تضف أي نصوص أو عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a vintage portrait in golden 1920s Art Deco aesthetics.
Style: Iconic Art Deco gold and black, clean elegant geometric patterns from the 1920s.
Details: Elegant flapper outfit with gold details, pearl necklace and headband accessories.
Lighting: Classic dramatic single-side golden lighting.
Background: Art Deco geometric gold and black pattern background, vintage poster style.
Quality: 4K, iconic Erté style, high-quality fine art vector illustration.
Do not add any unrelated text or elements.',
    '#d97706', 'linear-gradient(135deg, rgba(217,119,6,0.2) 0%, rgba(0,0,0,0.08) 100%)', '🎭',
    ARRAY['Art Deco', '1920s', 'Flapper', 'Geometric'], false,
    '/nano-banana/styles/nb-art-deco.png', 'published', 'art-deco-flapper'
  ),
  (
    'فانكو بوب ثلاثي الأبعاد احترافي', '3D Funko Pop Studio',
    'شخصية فانكو بوب ثلاثية الأبعاد بجودة استوديو احترافية.', 'Professional 3D Funko Pop vinyl figure with studio-quality render.',
    'fun', 'ترفيه', 'Fun',
    'beginner', 'صورة الوجه', 'Face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ شخصية فانكو بوب ثلاثية الأبعاد بجودة استوديو احترافية عالية.
الأسلوب: فانكو بوب Classic فينيل 3D عالي الجودة، رأس ضخم مُبسَّط بشكل مثالي، نسب Funko أيقونية.
التفاصيل: عيون زرار مطفأة كبيرة، ملامح مُبسَّطة متقنة، ملابس الشخصية بتفاصيل دقيقة.
الإضاءة: إضاءة منتج استوديو احترافية ثلاثية، ملمس بلاستيك فينيل مطفأ راقٍ.
الخلفية: صندوق فانكو بوب الرسمي المُصمَّم باحترافية، خلفية بيضاء لتصوير المنتج.
الجودة: 8K render ثلاثي الأبعاد، معايير Funko الرسمية، جودة إعلان.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a high-quality studio-grade 3D Funko Pop figure.
Style: High-quality Classic Funko Pop Vinyl 3D, perfectly simplified oversized head, iconic Funko proportions.
Details: Large matte button eyes, refined simplified features, detailed character clothing.
Lighting: Professional triple studio product lighting, refined matte vinyl plastic texture.
Background: Professionally designed official Funko Pop box, white background for product photography.
Quality: 8K 3D render, official Funko standards, advertisement quality.
Do not add any unrelated elements.',
    '#f59e0b', 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)', '🏆',
    ARRAY['Funko Pop', '3D', 'Studio', 'Collectible'], false,
    '/nano-banana/styles/nb-funko-3d-box.png', 'published', 'funko-pop-3d-box'
  ),
  (
    'بورتريه سينمائي استوديو 8K', 'Cinematic Hollywood Studio 8K',
    'بورتريه سينمائي هوليوودي بإضاءة استوديو احترافية بجودة 8K.', 'Professional Hollywood cinematic portrait with studio lighting at 8K.',
    'portrait', 'بورتريه', 'Portrait',
    'intermediate', 'صورة واضحة للوجه', 'Clear face photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ بورتريه سينمائي هوليوودي بإضاءة استوديو احترافية متكاملة.
الأسلوب: بورتريه هوليوود احترافي للنجم، إضاءة استوديو ثلاثية النقطة متقنة.
الإضاءة: إضاءة ثلاثية النقطة (Key/Fill/Rim) متقنة، درجة ألوان سينمائية عميقة.
الخلفية: خلفية داكنة أو بوكيه ناعم سينمائي.
الجودة: 8K render HDR، معايير إنتاج هوليوود الحقيقي، مستوى حملة تصوير كبرى.
لا تضف أي نصوص أو عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a professional Hollywood cinematic portrait with complete studio lighting.
Style: Professional Hollywood star portrait, masterful three-point studio lighting.
Lighting: Expertly executed Key/Fill/Rim three-point lighting, deep cinematic color grade.
Background: Dark or soft cinematic bokeh background.
Quality: 8K HDR render, true Hollywood production standards, major campaign level.
Do not add any unrelated text or elements.',
    '#94a3b8', 'linear-gradient(135deg, rgba(148,163,184,0.2) 0%, rgba(71,85,105,0.08) 100%)', '🎬',
    ARRAY['Cinematic', 'Hollywood', 'Studio', '8K'], false,
    '/nano-banana/styles/nb-cinematic-studio.png', 'published', 'cinematic-8k-studio'
  ),
  (
    'لوحة زيتية كلاسيكية نهضوية', 'Classical Oil Painting Master',
    'لوحة زيتية كلاسيكية بضربات فرشاة غنية وملمس قماش نهضوي.', 'Classical oil painting with thick brushstrokes and rich Renaissance textures.',
    'art', 'فن', 'Art',
    'intermediate', 'صورة الوجه في إضاءة جيدة', 'Face photo with good lighting',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ لوحة زيتية كلاسيكية بأسلوب مشايخ الرسم النهضويين.
الأسلوب: لوحة زيتية نهضة إيطالية كلاسيكية، ضربات فرشاة سميكة مرئية غنية، تدرجات عميقة.
الألوان: ألوان زيتية دافئة عميقة متشبعة، تناغم لوني من المدرسة الفلمنكية.
النسيج: نسيج قماش مشدود واضح، طبقات زيتية متعددة، تفاصيل جلد وشعر عالية الدقة.
الخلفية: خلفية داكنة دافئة كلاسيكية تبرز الوجه، بأسلوب إضاءة رامبرانت.
الجودة: جودة متحف فني عالمي، 8K تفاصيل عالية الدقة.
لا تضف أي عناصر أو نصوص غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a classical oil painting in the style of Renaissance master painters.
Style: Italian Renaissance classical oil painting, richly visible thick brushstrokes, deep gradients.
Colors: Deep warm saturated oil colors, Flemish school color harmony.
Texture: Visible stretched canvas texture, multiple oil layers, highly detailed skin and hair.
Background: Classic dark warm background highlighting the face, Rembrandt lighting style.
Quality: World art museum quality, 8K ultra-detailed rendering.
Do not add any unrelated elements.',
    '#92400e', 'linear-gradient(135deg, rgba(146,64,14,0.2) 0%, rgba(212,175,55,0.08) 100%)', '🖼️',
    ARRAY['Oil Painting', 'Classical', 'Renaissance', 'Brushstrokes'], false,
    '/nano-banana/styles/nb-oil-classic.png', 'published', 'oil-painting-master'
  ),
  (
    'فن رقمي سايبربانك مدينة ممطرة', 'Cyberpunk Rain City Digital Art',
    'فن رقمي سايبربانك مع شوارع ممطرة متلألئة وأضواء نيون.', 'Cyberpunk neon city digital art with glowing futuristic lights and rain.',
    'art', 'فن', 'Art',
    'intermediate', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ فناً رقمياً سايبربانك بمدينة مستقبلية ممطرة ونيون متوهج.
الأسلوب: فن رقمي سايبربانك احترافي، مدينة مستقبلية بائسة بأضواء نيون ساطعة.
الإضاءة: أضواء نيون وردية وبنفسجية وفيروزية تعكس على الشوارع المبللة، تأثير مطري.
الخلفية: مشهد مدينة مستقبلية شاهق، مبانٍ معدنية مع إعلانات هولوغرامية، مطر متواصل.
الجودة: 4K، فن مفهوم سينمائي احترافي، أسلوب Blade Runner / Ghost in the Shell.
لا تضف أي نصوص أو عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create professional cyberpunk digital art in a rainy futuristic neon city.
Style: Professional cyberpunk digital concept art, dystopian futuristic city with blazing neon lights.
Lighting: Pink, purple, and cyan neon lights reflecting on rain-slicked streets, rain effect.
Background: Towering futuristic cityscape, metallic buildings with holographic advertisements, continuous rain.
Quality: 4K, professional cinematic concept art, Blade Runner / Ghost in the Shell style.
Do not add any unrelated text or elements.',
    '#8b5cf6', 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.08) 100%)', '🌆',
    ARRAY['Cyberpunk', 'Neon City', 'Digital Art', 'Rain'], false,
    '/nano-banana/styles/nb-cyber-city.png', 'published', 'cyberpunk-rain-digital'
  ),
  (
    'زجاج ملون كنيسة كاتدرائية', 'Stained Glass Cathedral Art',
    'فن الزجاج الملون بأسلوب الكاتدرائيات مع ألوان زاهية وأنماط معقدة.', 'Vibrant cathedral stained glass art with intricate patterns and divine light.',
    'art', 'فن', 'Art',
    'beginner', 'أي صورة واضحة', 'Any clear photo',
    'استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية.
أنشئ عملاً فنياً بأسلوب الزجاج الملون القوطي الكاتدرائي الراقي.
الأسلوب: فن الزجاج الملون القوطي الكلاسيكي، ألوان زاهية متشبعة وجريئة، خطوط رصاص سوداء واضحة.
الألوان: ألوان كاتدرائية راقية (أزرق كوبالت، أحمر قرمزي، ذهبي، أخضر زمردي)، شفافية الزجاج.
التفاصيل: خطوط رصاص "lead lines" محيطة بكل قطعة، تفاصيل وجه مُبسَّطة بأسلوب قوطي.
الإضاءة: أشعة ضوء إلهية تخترق الزجاج، ألوان الزجاج تصبغ المشهد.
الجودة: 4K، نسيج زجاج قوطي أصيل، أسلوب كاتدرائية Notre-Dame.
لا تضف أي نصوص أو عناصر غير مرتبطة.', 'Use the uploaded image as the reference for the main subject, preserving identity, facial features, and core visual details.
Create a piece of art in the Gothic cathedral stained glass style.
Style: Classic Gothic stained glass art, vibrant saturated bold colors, clear black lead lines.
Colors: Regal cathedral colors (cobalt blue, crimson, gold, emerald), glass transparency.
Details: Lead lines surrounding each glass piece, simplified Gothic-style face details.
Lighting: Divine light rays piercing through glass, colored light tinting the scene.
Quality: 4K, authentic Gothic glass texture, Notre-Dame Cathedral style.
Do not add any unrelated text or elements.',
    '#7c3aed', 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(239,68,68,0.08) 100%)', '⛪',
    ARRAY['Stained Glass', 'Cathedral', 'Gothic', 'Divine Light'], false,
    '/nano-banana/styles/nb-stained-glass.png', 'published', 'stained-glass-cathedral'
  )
ON CONFLICT (source_slug) DO NOTHING;

-- Inserted 103 static prompts

