# Security and Privacy Audit

## Positive Controls

- Admin page and sampled admin APIs enforce server-side role checks.
- Generic table names are restricted through a registry whitelist.
- Draft preview is admin-only, table-whitelisted, and draft-filtered.
- Public Tier-A helpers use published-only queries.
- Mentor endpoints apply rate limits and redact API keys from logged errors.
- No tracked `.env` or obvious private-key file was found by the filename scan.

## High Risks

- Language and exam PDF certificate endpoints lack authentication/ownership checks while using service-role access.
- Those `GET` handlers mutate database rows by assigning certificate IDs.
- Generic CMS permits hard deletion across all registered tables.
- Generic CMS editing is inconsistent with the publishing lock and can fail in normal admin use.

## Medium Risks

- Public verification intentionally reveals holder names and result detail for valid codes; privacy expectations should be documented.
- Nano Banana admin deletion includes storage deletion and requires explicit operational safeguards.
- Several APIs use privileged clients correctly only after auth; future refactors must preserve that ordering.

No secrets are reproduced in this report.

