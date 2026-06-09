# Pilot Selection

## Selected Pilot Table/Type
`automation_glossary` (Glossary Type)

## Rejected Candidate
`career_glossary`

**Reason for Rejection:** Although it is simple glossary content, it is entirely omitted from the `CMS_REGISTRY`. Creating a publishing workflow for an unregistered table breaks the explicit instruction to avoid duplicating CMS mechanisms. `automation_glossary` offers the same low-risk schema while integrating seamlessly into existing `CMS_REGISTRY` generic loops.

## Allowlist Contents
`["automation_glossary"]`

## Tables Enabled Count
1

## Lifecycle Actions Available
- `publish` (via patching status to "published")
- `return_to_draft` (via patching status to "draft")
- `archive` (via dedicated button or patching status to "archived")

## Supported Statuses
- `published`
- `draft`
- `archived`

## Known Limitations
The UI for `GenericCmsTypePanel` conditionally disables state changes for non-pilot tables. If administrators attempt API manipulation on non-pilot tables, they will gracefully encounter a `403` locked error. This strict enforcement prevents accidental or malicious activation of content outside the pilot scope.
