# Smart Mentor / Digital Guide Audit

## Existing Capability

- Reachable from the navbar, homepage, floating button, and mentor page.
- Supports streaming responses with a non-stream fallback.
- Includes loading, error, missing-key, message-length, and rate-limit handling.
- Supports copy and regenerate actions.
- Uses locale-aware labels and RTL/LTR page structure.

## Weaknesses

- Assistant output is rendered with `whitespace-pre-wrap`; there is no Markdown or structured rich-response renderer.
- Long answers cannot reliably present headings, lists, links, tables, or code in a premium readable form.
- Copy errors are silently ignored and have no fallback.
- Fixed chat height `calc(100vh - 370px)` with a 380px minimum can be cramped on small mobile screens.
- Source/context display is not exposed to the user.
- The system-prompt learner-context separator is Arabic even for English requests.
- Branding remains Darhous AI Mentor rather than a coherent NexaLearn assistant identity.

## Classification

Copy exists, so the basic requirement is met. The mentor still needs a Smart Mentor Polish phase. It is not a blocker to controlled Live QA, but it is below premium launch quality.

