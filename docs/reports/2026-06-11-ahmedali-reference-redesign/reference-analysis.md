# Reference Site Analysis — ahmedali.online
**Date:** 2026-06-11  
**Analyst:** Claude Sonnet 4.6 (UI/UX Pro Max governed)  
**Purpose:** Extract structural and UX DNA to rebuild NexaLearn design-lab concepts

---

## 1. Complete Section Map (In Order)

| # | Section | Reference Label | NexaLearn Adaptation |
|---|---------|----------------|----------------------|
| 1 | Navbar | "Ahmed." + Links + AR toggle + "Let's Talk" | "NexaLearn" + Portal links + AR/EN + "Enroll Free" |
| 2 | Hero | Headline + Sub + CTAs + Availability Badge | Platform headline + AI tagline + CTA + "Platform is Live" badge |
| 3 | Trusted By | Client logos grid (Ooredoo, QNB, Amazon...) | Technology partner logos (Google, OpenAI, Microsoft, AWS...) |
| 4 | Skills Marquee | Horizontal ticker (Performance Marketing, SEO...) | Portal/skill ticker (AI Academy, Language Portal, IoT Lab...) |
| 5 | About | Profile card: 5+ Years, 50+ Projects, 4 Countries | Platform card: 3 Years, 300+ Courses, 5K+ Students |
| 6 | Services | 6 numbered cards with tags | 6 Learning Portals with feature tags |
| 7 | How I Work | 4-step approach (Research → System → Ship → Measure) | How Learning Works (Assess → Learn → Practice → Certify) |
| 8 | Featured Projects | 8 project cards with images + metrics | Featured Learning Paths with outcomes |
| 9 | Impact Numbers | Years, Attendees, Countries, Budget | Students, Courses, Portals, Certificates |
| 10 | Experience Timeline | Career history cards | Student Journey / Roadmap steps |
| 11 | Key Clients | Client highlight row | Partner Platform highlights |
| 12 | Certifications | Google, HP LIFE, etc. | Platform-issued certifications |
| 13 | Contact | Form + social links | Start Learning CTA + contact |
| 14 | Footer | Links + copyright | Links + NexaLearn brand |
| F | Floating | "Ask Ahmed" chat widget | "Ask AI Mentor" floating widget |

---

## 2. Hero Section Analysis

- **Headline style:** Large bold serif/display font, 2-line break, accent word styled differently
- **Subheadline:** Location/context info, secondary muted color
- **Availability badge:** Top-left, green dot pulsing, "Available for Work" text
- **CTA Primary:** Solid button, accent color (green)
- **CTA Secondary:** Outline/ghost button, same row
- **Layout:** Centered, typography-first, no large hero image
- **Motion:** Fade-in stagger on load

---

## 3. Navbar Analysis

- **Logo:** "Ahmed." — simple text with period, bold
- **Links:** About, Services, Projects, Experience, Certifications, Contact
- **Language toggle:** Flag icon → /ar link
- **CTA button:** "Let's Talk" — small, filled, accent color
- **Position:** Sticky top, subtle backdrop blur on scroll
- **Mobile:** Collapses to hamburger

---

## 4. Trusted By / Logos Section

- Horizontal grid of 7-8 company logos
- Logos appear twice (visual repetition for emphasis)
- Neutral/muted styling — no color
- Label: "Trusted by" or similar

---

## 5. Skills/Portal Marquee

- Single horizontal infinite scroll ticker
- Items: text with separator (•) between
- Two rows or one fast row
- Black on light / white on dark
- No hover interaction
- Repeats for seamless loop

---

## 6. About / Platform Card

- Two-column layout: image left / stats right
- 3 key stats in a row (years, projects, countries)
- Bio/description paragraph
- CTA button at bottom
- Rounded card with subtle border

---

## 7. Services / Learning Portals

- 6-card grid (2 columns on mobile, 3 on desktop)
- Number badge (01-06) top-left of each card
- Card title + description + technology tags
- Subtle illustration/icon at top
- Hover: slight scale or border highlight

---

## 8. Approach / How Learning Works

- 4-step horizontal or vertical flow
- Each step: number + title + description + bullets
- Connected visually (line or gradient)
- Research → System → Ship → Measure adapts to: Assess → Learn → Practice → Certify

---

## 9. Featured Projects / Learning Paths

- Card grid with images
- Year + category tags
- Title, description, outcome metrics
- Tech stack icons at bottom
- "Visit" / "Start" CTA link
- 8 items displayed

---

## 10. Impact Numbers

- 4 stat boxes in a row
- Large number + label + sublabel
- Slight animation on scroll (count up)
- Clean white/dark background, no decorative elements

---

## 11. Experience Timeline / Student Journey

- Timeline: left line, cards on right
- Each card: role/step + company/portal + date/duration + bullets
- Reverse chronological for career; sequential for student journey

---

## 12. Certifications Section

- Grid of certification badges
- Issuer + name + validity date
- Subtle card border
- 4-6 shown

---

## 13. Contact Section

- Clean form: name + email + message + submit
- Social links row (LinkedIn, WhatsApp, email)
- "Let's build something" type headline

---

## 14. Footer

- 3-4 columns: brand, nav links, contact, social
- Copyright line
- Language toggle
- Final tagline

---

## 15. Floating AI Chat Widget

- Bottom-right fixed position
- Circular button with avatar/icon
- Opens chat-like overlay
- Shows: online status + quick options (3 buttons)
- "Ask Ahmed" → "Ask AI Mentor" for NexaLearn

---

## 16. Color & Typography System

**Reference site:**
- Background: White (light), near-black (#0a0a0a) sections
- Text: #0a0a0a (primary), #666 (muted)
- Accent: Green (#22c55e or similar)
- Cards: White with border-gray-200
- Badges: Green bg + white text

**NexaLearn adaptation (from existing CSS vars):**
- `--color-background: #0c0e12`
- `--color-surface: #111318`
- `--color-primary: #8ed5ff`
- `--color-secondary: #d0bcff`
- `--color-tertiary: #3ce0fb`
- `--color-on-surface: #e2e2e8`

---

## 17. Spacing & Grid

- Container max-width: 1200px-1400px
- Section padding: py-20 to py-32
- Card gap: gap-6 to gap-8
- Grid: 1 col mobile → 2 col tablet → 3 col desktop

---

## 18. Micro-Interactions

- Buttons: hover scale 1.02, transition 200ms
- Cards: hover shadow elevation
- Badge: pulsing green dot (animate-pulse)
- Marquee: constant infinite scroll
- Numbers: count-up on scroll (IntersectionObserver)
- Skills: fade-stagger on load

---

## 19. What Transfers Well to NexaLearn

- Availability badge → Platform is Live badge
- "Trusted by" logos → Technology partners (Google, OpenAI, MS)
- Skills marquee → Portal/tool marquee
- 6 service cards → 6 learning portals
- 4-step approach → 4-step learning journey
- Impact numbers → Platform metrics
- Experience timeline → Student journey roadmap
- Floating chat widget → Floating AI mentor preview
- Certifications grid → Platform certificates

---

## 20. What NOT to Copy Literally

- Personal biography (replace with platform story)
- Client project images (replace with learning path screenshots)
- Country flags on projects (replace with portal categories)
- "Download CV" CTA (replace with "Enroll Free" / "Start Learning")
- Career history (replace with student journey / roadmap)
- Personal contact info (replace with platform contact)
- "Ahmed Ali" brand (replace with "NexaLearn by Darhous")
