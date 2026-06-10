# Certificates and Verification Audit

## Working Components

- Course certificate listing/issuance API is authenticated.
- Public verification API resolves language, exam, course, and admin-issued certificates.
- Localized verification redirects exist.
- Verification pages are marked `noindex`.
- PDF generation includes QR verification links.

## Security and Correctness Risks

- `/api/certificates/language/[id]` and `/api/certificates/exams/[id]` do not authenticate the requester or verify ownership.
- Both use the service-role client to read result/profile/auth data.
- Both assign and persist a new certificate ID during `GET` if one does not exist.
- Anyone who obtains a result ID could trigger certificate generation and receive holder/result information.
- The verification API comment says it checks three systems but the implementation checks four.

## Route and Brand Fragmentation

- Course certificate cards link to `/certificates/verify/[code]`.
- PDF QR generation links to `/[locale]/certificates/verify/[certId]`.
- Language results use `/[locale]/language/verify/[certId]`, which redirects again.
- Templates and verification surfaces use Darhous Academy names, marks, issuer text, domain, and filenames.

Certificates need both an authorization fix and a dedicated NexaLearn certificate brand phase.

