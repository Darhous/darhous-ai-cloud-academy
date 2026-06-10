# Brand, Metadata, OG, and Certificate Audit

## NexaLearn Coverage

The root layout and dynamic `/og` route use NexaLearn. The localized application shell does not consistently inherit that identity.

## Old Brand Surfaces

- `src/app/[locale]/layout.tsx`: old titles, site name, Twitter metadata, JSON-LD, and `/og-image.svg`.
- `src/app/[locale]/page.tsx`: Darhous Smart Learning OS / منصة درهوس metadata.
- `src/components/layout/Navbar.tsx` and `Footer.tsx`: old Darhous identity.
- `public/manifest.webmanifest`: old name and short name.
- `public/og-image.svg`: old English and Arabic brand.
- README, onboarding, social text, dashboard labels, mentor labels, community surfaces, and email templates retain old names.

## Certificate Brand Surfaces

- `CertificateTemplate.tsx`: `DARHOUS`, `DARHOUS ACADEMY`, Darhous Academy signature/footer/domain.
- `portalConfig.ts`: old program names in certificate body copy.
- Verification clients and metadata: old issuer and return labels.
- Generated PDF filenames and verification URLs retain the old domain/name.

## Assessment

Phase 5G changed only part of the metadata stack. The product currently presents mixed NexaLearn and Darhous Academy identities. Certificates require an explicit brand/name/logo phase and cannot be assumed NexaLearn-ready.

