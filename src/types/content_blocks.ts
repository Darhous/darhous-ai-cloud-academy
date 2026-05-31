export type ContentBlockType = "hero" | "section" | "cta" | "faq" | "feature" | "portal-card" | "testimonial";

export interface ContentBlock {
  id: string;
  key: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  order: number;
  visible: boolean;
  type: ContentBlockType;
  imageUrl?: string;
  ctaHref?: string;
  ctaLabelAr?: string;
  ctaLabelEn?: string;
  metadata?: Record<string, unknown>;
}
