import { Button as HeroButton, Card as HeroCard, Input as HeroInput } from "@heroui/react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { AnimatedGradientText } from "@/components/shadcn/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/shadcn/ui/animated-grid-pattern";
import { Button as ShadcnButton } from "@/components/shadcn/ui/button";
import {
  Card as ShadcnCard,
  CardContent as ShadcnCardContent,
  CardDescription as ShadcnCardDescription,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
} from "@/components/shadcn/ui/card";

export const metadata = {
  title: "UI Integration Lab",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UiLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="container-xl py-12 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-medium text-primary">
          {isAr ? "مختبر تكامل داخلي" : "Internal integration lab"}
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">
          {isAr ? "أساس مكتبات الواجهة" : "UI library foundation"}
        </h1>
        <p className="mt-4 text-on-surface-variant">
          {isAr
            ? "صفحة غير مرتبطة بالتنقل العام للتحقق من التوافق والأنماط فقط."
            : "An unlisted route for compilation and styling verification only."}
        </p>
      </header>

      <div className="grid gap-8">
        <section aria-labelledby="heroui-lab-title">
          <HeroCard className="glass-panel-promax">
            <HeroCard.Header>
              <HeroCard.Title id="heroui-lab-title">HeroUI v3</HeroCard.Title>
              <HeroCard.Description>
                {isAr ? "مكونات تشغيلية للنماذج والتطبيق." : "Operational application controls."}
              </HeroCard.Description>
            </HeroCard.Header>
            <HeroCard.Content className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <HeroInput
                aria-label={isAr ? "بريد تجريبي" : "Demo email"}
                placeholder={isAr ? "name@example.com" : "name@example.com"}
                type="email"
              />
              <HeroButton>{isAr ? "إجراء تجريبي" : "Demo action"}</HeroButton>
            </HeroCard.Content>
          </HeroCard>
        </section>

        <section aria-labelledby="shadcn-lab-title">
          <ShadcnCard>
            <ShadcnCardHeader>
              <ShadcnCardTitle id="shadcn-lab-title">shadcn/ui</ShadcnCardTitle>
              <ShadcnCardDescription>
                {isAr ? "Primitive محلي قابل للتعديل." : "Editable, project-owned primitives."}
              </ShadcnCardDescription>
            </ShadcnCardHeader>
            <ShadcnCardContent>
              <ShadcnButton>{isAr ? "زر محلي" : "Local primitive"}</ShadcnButton>
            </ShadcnCardContent>
          </ShadcnCard>
        </section>

        <section
          aria-labelledby="magic-lab-title"
          className="relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low p-8"
        >
          <AnimatedGridPattern
            className="[mask-image:radial-gradient(420px_circle_at_center,white,transparent)] opacity-40"
            duration={3}
            maxOpacity={0.25}
            numSquares={16}
          />
          <div className="relative z-10">
            <p id="magic-lab-title" className="mb-3 text-sm text-on-surface-variant">
              Magic UI
            </p>
            <AnimatedGradientText
              className="text-2xl font-bold md:text-3xl"
              colorFrom="#8ed5ff"
              colorTo="#d0bcff"
            >
              {isAr ? "حركة تسويقية مقيدة" : "Governed marketing motion"}
            </AnimatedGradientText>
          </div>
        </section>

        <section aria-labelledby="aceternity-lab-title">
          <h2 id="aceternity-lab-title" className="mb-4 text-xl font-bold">
            Aceternity UI
          </h2>
          <BentoGrid className="max-w-none md:auto-rows-[14rem]">
            <BentoGridItem
              className="md:col-span-2"
              header={<div className="h-full min-h-20 rounded-xl bg-surface-container" />}
              title={isAr ? "تخطيط بنتو تجريبي" : "Bento layout sample"}
              description={
                isAr
                  ? "للكروت السينمائية والسرد البصري بعد مراجعة الأداء."
                  : "For cinematic cards and visual storytelling after performance review."
              }
            />
            <BentoGridItem
              header={<div className="h-full min-h-20 rounded-xl bg-surface-container-high" />}
              title={isAr ? "بدون محتوى تجاري" : "No production content"}
              description={
                isAr ? "هذا المثال للتحقق من التكامل فقط." : "This sample only validates integration."
              }
            />
          </BentoGrid>
        </section>
      </div>
    </div>
  );
}
