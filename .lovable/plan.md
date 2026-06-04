# ReMate — UX & Visual Design Strategy

Strategy only. No screens, no code. Builds on the approved product plan and 13-screen blueprint.

---

## 1. Design Principles

1. **Clarity over cleverness** — every screen answers "what is this, what can I do, what happens next?" within 3 seconds. *Why:* marketplace users juggle listings, sellers, logistics; cognitive load directly kills conversion and trust.
2. **Impact made tangible** — every transaction surfaces measurable environmental value (kg, CO₂e, equivalences). *Why:* turns abstract "sustainability" into a felt reward, reinforcing brand and SDG 9 alignment.
3. **Trust by transparency** — verification badges, ratings, seller history, location proximity, and clear pricing/terms shown upfront. *Why:* peer-to-peer waste exchange depends on stranger-to-stranger trust; transparency is the cheapest trust currency.
4. **Mobile-first, desktop-amplified** — designed for one-thumb use on a Malaysian construction site, then scaled up for power users (ESG officers, recyclers). *Why:* primary generators work offsite; secondary users analyze on desktop.
5. **Calm green, not eco-cliché** — restrained green palette, generous whitespace, no leaves/recycle-arrow visual clichés. *Why:* differentiates from amateur "green" sites; signals modern infrastructure (SDG 9).
6. **Bilingual-native (EN/BM)** — layouts accommodate ~30% text expansion for Bahasa Malaysia without breaking. *Why:* serves the actual user base, not an idealized one.
7. **Action-oriented empty states** — never a dead end; every empty list suggests the next action. *Why:* a new two-sided marketplace will have sparse data — empty states are the product.

---

## 2. Design System

**Color tokens (semantic, oklch in code):**

| Token | Value | Use |
|---|---|---|
| `--primary` | `#059669` (emerald-600) | CTAs, active states, brand marks |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--primary-soft` | emerald-50 tint | Hover, badges, soft surfaces |
| `--background` | `#F9FAFB` | App background |
| `--surface` | `#FFFFFF` | Cards, modals, inputs |
| `--foreground` | `#1F2937` | Body text |
| `--muted-foreground` | slate-500 | Secondary text |
| `--border` | slate-200 | Dividers, input borders |
| `--success` | emerald-600 (same as primary) | Confirmations |
| `--warning` | amber-500 | Pickup-soon, low-stock |
| `--destructive` | rose-600 | Cancel, delete |
| `--impact` | teal-600 | Reserved for impact metrics only |
| `--condition-a` / `--b` / `--c` | emerald / amber / slate | Material condition grades |

*Why a separate `--impact` token:* impact numbers must visually pop against generic UI greens; reserving one teal-leaning hue makes "5.2 kg CO₂e saved" feel like a distinct currency, not a button color.

**Elevation:** 3 levels only — flat (`--surface`), raised card (soft shadow), modal/sheet (stronger shadow + backdrop). *Why:* fewer levels = faster scanning; Airbnb/Stripe both restrict elevation depth.

**Radius:** 12px cards, 8px inputs/buttons, 999px pills/badges. *Why:* soft enough to feel friendly (Airbnb), sharp enough to feel infrastructural (Stripe).

**Spacing scale:** Tailwind default (4-pt grid). Section vertical rhythm 64/96/128 on desktop, 40/56/72 on mobile.

**Iconography:** Lucide, 1.5px stroke, single weight throughout. No filled icons except for active tab states. *Why:* consistency > expressiveness for a utility marketplace.

**Motion:** 150–200ms ease-out for micro; 300ms for page/sheet transitions; impact counters animate up over ~800ms. *Why:* fast enough to feel responsive, slow enough to make impact numbers feel earned.

---

## 3. Typography Hierarchy

**Family:** Inter (UI) + Inter Display weights for hero. One family = one network request, perfect BM/EN coverage, neutral and infrastructural.

**Scale (mobile → desktop):**

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display (hero) | 36 → 56px | 600 | -2% |
| H1 (page title) | 28 → 36px | 600 | -1% |
| H2 (section) | 22 → 28px | 600 | -1% |
| H3 (card title) | 18 → 20px | 600 | 0 |
| Body | 15 → 16px | 400 | 0 |
| Body-small (meta) | 13 → 14px | 400 | 0 |
| Label/caption | 12 → 12px | 500 uppercase | +4% |
| Metric (KPI) | 32 → 48px | 700 tabular-nums | -2% |
| Metric-small | 20 → 24px | 700 tabular-nums | -1% |

*Why tabular-nums for metrics:* KPI tiles and impact counters must align vertically across multiple cards — proportional digits look chaotic.
*Why a separate metric scale:* impact numbers are the product, not just text — Stripe-style numeric emphasis.

---

## 4. Layout Framework

- **Grid:** 12-column desktop, 8px gutter base, max content width 1280px (wider 1440px for Sustainability Dashboard charts).
- **Breakpoints:** sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.
- **Two-column patterns:** detail screens use 7/5 split (content/sticky aside); cart/checkout use 8/4 with sticky summary right.
- **Dashboard grid:** 4 KPI tiles per row desktop → 2×2 tablet → stacked mobile; charts span 6 or 12 cols.
- **Container padding:** 16 mobile / 24 tablet / 32 desktop; never edge-to-edge content on desktop.
- **Vertical rhythm:** consistent 8/12/16/24/32/48/64 spacing tokens — no arbitrary margins.

*Why these specifics:* Airbnb/Etsy-style breathing room signals quality; the 7/5 split keeps detail+action visible without scrolling on laptops.

---

## 5. Navigation Strategy

**Authenticated shell:**
- **Desktop:** persistent left sidebar (64px collapsed / 240px expanded) — Dashboard, Search, Map, My Listings, Cart, Impact, Profile. Top bar = global search + create-listing button + notifications + avatar.
- **Mobile:** bottom tab bar (5 items max: Home, Search, Create [center FAB], Impact, Profile). Top app bar = contextual title + notifications. Cart accessed via top-right icon with badge.
- **Tablet:** rail nav (icon-only sidebar) + top bar — bridges the two.

**Public shell (Landing/Auth):** transparent top nav over hero, sticky on scroll; mobile = hamburger sheet.

**Breadcrumbs:** desktop only, on deep screens (Material Details, Settings sub-pages). Mobile uses back-arrow with screen title.

**Global search:** ⌘K palette on desktop for power users (categories, listings, sellers, my pages). *Why:* recyclers and ESG officers spend hours on the platform — keyboard nav is a retention feature.

*Why a center FAB for Create:* listing is the single most valuable generator action; visual gravity = behavioral nudge.

---

## 6. Card Design Guidelines

**Anatomy (listing card):**
1. 4:3 image (lazy, blurhash placeholder)
2. Condition badge top-left (A/B/C, color-coded)
3. Save (heart) icon top-right
4. Title (1 line, truncate)
5. Material category + quantity meta row
6. Distance + price row (price = "Free" / "RM X" / "Negotiable")
7. Impact hint footer: "Reuse saves ~X kg CO₂e" in `--impact` color, small caps label
8. Hover (desktop): gentle lift (2px) + shadow deepen, image zooms 1.03

*Why the impact footer on every card:* turns browsing into a constant brand reinforcement loop — every scroll teaches the user that this platform is about measurable impact.

**Variants:**
- **Compact** (search results grid): smaller image, no impact hint footer to keep density.
- **Featured** (landing/dashboard): larger image, seller avatar + verification badge inline.
- **Match card** (Smart Match feed): adds a match-% chip in primary color and "why matched" 1-liner.

**Consistency rules:** all cards share radius (12px), border (1px slate-200), padding (16px), and shadow tier — variation only in content, not chrome.

---

## 7. Marketplace Design Language

- **Density:** medium — Etsy-style 3-col desktop / 2-col tablet / 1-col mobile result grid. Not Pinterest masonry (item comparison needs uniform card heights).
- **Filtering pattern:** Airbnb-style — chip row of active filters above results + collapsible left panel (desktop) / bottom sheet (mobile).
- **List ↔ Map toggle:** persistent toggle in result header (Search ↔ Map). Map view = Airbnb pattern — pins linked to visible card row; hovering a card highlights its pin.
- **Smart Match surfacing:** a horizontal "Matched for you" rail at top of Dashboard and Search results, visually distinct (soft primary background tint, match-% chip on each card).
- **Seller trust block:** wherever a seller appears, show avatar + name + verification badge + star rating + response time in that exact order. *Why:* trust signals only work when they're predictable across the product.
- **Photography style guidance:** real, slightly imperfect photos of materials (not stock perfection). Earthy, well-lit, in-context. Communicates authenticity and ground-truth supply.

---

## 8. Sustainability Dashboard Design Language

This is the SDG 9 showcase — different visual register from the marketplace, signaling "analytics", not "shopping".

- **Layout:** 4-KPI top row, 2 charts middle row, anticipatory forecast band, share/export footer.
- **KPI tiles:** white surface, large tabular-nums metric in `--impact` teal, label in uppercase small caps, delta vs previous period in green/red micro-pill, sparkline at bottom.
- **Charts:** stacked bar (impact over time, by category), donut (category share), cumulative line (lifetime diversion). Two-color palette per chart: `--impact` teal + neutral slate fills, no rainbow categorical colors. *Why:* keeps focus on the message ("we're going up"), not on decoding a legend.
- **Equivalences:** rendered as illustrated micro-cards ("= 12 trees / = 4 months household electricity / = 38 km not driven"). Iconography from Lucide, single-stroke, no emoji.
- **Anticipatory panel:** visually separated by a soft tinted background band, labeled "Forecast" with a small ✦ marker; dashed projection lines distinguish predicted from actual. *Why:* judges/lecturers immediately see the SC2 Anticipatory Thinking layer as a deliberate feature, not a generic chart.
- **Shareable Impact Card:** 1:1 social-export composition with brand mark, user name, headline metric, and equivalence. *Why:* every share is free top-of-funnel marketing tied to a real impact claim.

---

## 9. Form Design Standards

- **One column always.** Fields stack vertically; multi-column only for paired short fields (city/postcode).
- **Labels above inputs**, never floating-only or placeholder-only. *Why:* placeholder-as-label fails accessibility and BM translation.
- **Helper text below**, error replaces helper in destructive color with icon prefix.
- **Required marker** = subtle "Required" text label, not asterisks. *Why:* clearer for non-technical users.
- **Multi-step (Create Listing):** progress bar with step labels, persistent Back/Next footer, autosave draft every step, "Save draft" always available.
- **Inputs:** 44px min height (touch target), 8px radius, 1px slate-200 border, 2px primary focus ring with 2px offset.
- **Buttons:** primary (filled emerald), secondary (outline), ghost (text), destructive (rose). One primary CTA per screen — never two competing.
- **File upload:** drag-drop zone with mobile-camera fallback; show compression preview + thumbnail; allow reorder. *Why:* generator photos taken on dusty sites; the upload experience must forgive bad input.
- **Inline validation:** on blur, never on keystroke (except password strength).
- **Smart defaults:** prefill location from profile, suggest category from photo (AI), default availability to "next 7 days".

---

## 10. Accessibility Standards

Target WCAG 2.1 AA throughout.

- **Color contrast:** body text ≥ 4.5:1, large text ≥ 3:1. Primary emerald-600 on white passes; never use primary on `--background` for body text.
- **Never color alone:** condition grades, impact deltas, statuses combine color + icon + label.
- **Focus visible:** 2px primary ring + 2px offset on every interactive element, including cards.
- **Touch targets:** ≥ 44×44px on mobile (use shadcn defaults; icon buttons get `min-h-11 min-w-11`).
- **Semantic HTML:** one `<main>` per page (in root layout), proper h1→h6 order, `<nav>`/`<aside>`/`<section>` landmarks.
- **Icon-only buttons:** every one gets `aria-label`. *Why:* the most common shadcn a11y gap.
- **Forms:** every input has an associated `<label>`, errors use `aria-describedby` + `aria-invalid`.
- **Images:** every listing image has alt = "{material type}, {condition}, {quantity}"; decorative images use `alt=""`.
- **Reduced motion:** respect `prefers-reduced-motion` — disable parallax, counter animations, hover lifts.
- **Keyboard:** full keyboard navigation; ⌘K palette; ESC closes sheets/modals.
- **Language attribute:** `<html lang>` toggles with EN/BM selection.
- **Screen reader live regions:** cart badge updates, toast notifications, impact-counter completion announced politely.

*Why this rigor:* a public marketplace will be used by older generators, low-vision ESG analysts, and visitors on poor mobile networks; accessibility = reachable market.

---

## 11. Responsive Desktop Experience Strategy

Mobile-first, but desktop is not a stretched mobile — it earns its own layout.

- **Desktop-only enhancements:**
  - Persistent sidebar nav with collapse
  - ⌘K command palette
  - Hover-preview on listing cards (peek details without click)
  - Linked map ↔ list interaction on Search
  - Multi-pane Sustainability Dashboard with larger charts
  - Drag-and-drop in Create Listing photo step
  - Inline detail drawer for listings inside search (avoid full nav)
- **Tablet:** rail nav, 2-column grids, sheets instead of modals.
- **Mobile:** bottom tabs + FAB, sheets for filters, sticky bottom CTAs on detail/cart/checkout.
- **Wide screens (>1440px):** cap content at 1280–1440px and center; never edge-to-edge text.
- **Performance budget:** LCP < 2.5s on 4G, images responsive (srcset), route-level code splitting, blurhash placeholders. *Why:* perceived speed is a trust signal.

---

## 12. User Experience Guidelines

- **First 10 seconds rule:** Landing page must communicate what + for whom + proof in 10 seconds. Hero headline + dual CTA + live impact counter.
- **Progressive disclosure:** never show 12 filters when 4 are used 90% of the time; "More filters" reveals the rest.
- **Optimistic UI:** Save, Add-to-cart, Reserve respond instantly with rollback on error. *Why:* the platform feels fast even on poor JB/KL mobile networks.
- **Friction where it matters:** Checkout requires explicit pickup-slot confirmation and a sustainability commitment checkbox — *intentional* friction that reinforces brand values and prevents no-shows.
- **Anti-friction elsewhere:** signup ≤ 90s, listing creation ≤ 60s, search-to-reserve ≤ 3 taps.
- **Empty states as onboarding:** every empty list = headline + illustration + primary action + secondary "see example".
- **Toast vs modal:** success/info = toast (3s, top-right); destructive confirmations = modal; multi-step input = sheet/page.
- **Error tone:** never blame the user. "Couldn't reach the server — try again" not "Invalid request".
- **Loading states:** skeleton screens matching final layout (not spinners) for lists/cards; spinners only for actions <2s.
- **Trust micro-moments:** verification badge, "responds in ~2h", "12 successful pickups", "Member since 2025" — sprinkled, never bunched.
- **Sustainability reinforcement loop:** every meaningful action ends with an impact moment — listing published ("Could divert ~X kg from landfill"), reservation made ("Locks in ~Y kg CO₂e saved"), pickup confirmed ("Impact added to your dashboard"). *Why:* turns transactional behavior into identity behavior.
- **Bilingual UX:** language toggle persistent in footer + profile settings; key terms (Smart Match, Impact, Reserve) keep English to preserve product identity; descriptive copy localizes fully.
- **Onboarding:** role-specific 3-step tour after signup (Generator: list → match → impact; Seeker: search → reserve → impact). Skippable.

---

## Why this strategy works

- **Usability:** shadcn primitives + restrained tokens + predictable navigation + WCAG AA = low cognitive load and broad reach.
- **Trust:** transparent seller blocks, verification badges, consistent card chrome, calm color palette, no dark patterns at checkout — reads as a real piece of infrastructure (Stripe-grade), not a hobby project.
- **Sustainability branding:** restrained green + reserved `--impact` token + per-card impact hint + dashboard as showcase + reinforcement loop = sustainability felt at every step, never preached.
- **Demo impact:** Sustainability Dashboard, live impact counters, anticipatory forecast band, and shareable Impact Card give clear "wow" moments for SDG 9 evaluation.

---

**Next step after approval:** generate 3 rendered design directions (locked tokens: emerald `#059669`, Inter, mobile-first 12-col) and have the user pick one before building MVP screens.
