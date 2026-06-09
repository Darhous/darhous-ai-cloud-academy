# Phase 5G: Metadata and Open Graph Changes

## Modified Surfaces

### 1. `src/app/layout.tsx`
Updated the core global metadata properties.
- **Before**: `default: "Darhous AI Cloud Academy | أكاديمية درهوس"`
- **After**: `default: "NexaLearn by Darhous | منصة تعلم ذكية من درهوس"`
- **Template Before**: `template: "%s | Darhous AI"`
- **Template After**: `template: "%s | NexaLearn"`

### 2. `src/lib/constants.ts`
Updated internal branding constants used for SEO, headings, and sharing endpoints.
- **Before**: `SITE_NAME = "Darhous AI Cloud Academy"`
- **After**: `SITE_NAME = "NexaLearn by Darhous"`
- **Before**: `SITE_NAME_AR = "أكاديمية درهوس للذكاء الاصطناعي والكلاود"`
- **After**: `SITE_NAME_AR = "نكسا ليرن | منصة تعلم ذكية من درهوس"`

### 3. `src/app/og/route.tsx`
Updated dynamically generated Open Graph share imagery to ensure the external footprint displays the launch candidate brand.
- **English Title Before**: `Darhous AI Cloud Academy`
- **English Title After**: `NexaLearn by Darhous`
- **Arabic Title Before**: `أكاديمية درهوس للذكاء الاصطناعي والكلاود`
- **Arabic Title After**: `منصة تعلم ذكية من درهوس`
