# ReMate — Complete Product & Design Planning Document

**Project:** ReMate — A Web-Based Waste-to-Resource Marketplace for Circular Economy Enablement Using Smart Matching System and Sustainability Impact Analysis
**Institution:** Universiti Tun Hussein Onn Malaysia (UTHM) — FSKTM
**Course:** BIC31502 Creativity and Innovation
**SDG Alignment:** SDG 9 — Industry, Innovation and Infrastructure
**Sustainability Competency:** SC2 — Anticipatory Thinking
**Document type:** Planning only (no code, no schemas, no implementation)

---

## 1. Product Vision

To become Malaysia's trusted digital infrastructure for the circular economy — a marketplace where every discarded material finds a second life, and every transaction generates a measurable, anticipatory sustainability impact. ReMate reframes "waste" as "resource" by connecting industrial generators, SMEs, recyclers, and creators on one transparent platform that turns environmental responsibility into a quantifiable business advantage.

---

## 2. Problem Statement

Across Malaysia's construction, manufacturing, and SME sectors, large volumes of reusable materials — timber offcuts, scrap metal, plastics, packaging, and construction debris — are sent to landfill not because they lack value, but because there is no centralized, trusted channel that connects those who produce them with those who need them.

The result:
- Generators pay disposal fees for materials others would buy.
- Buyers, recyclers, and makers cannot locate consistent supply.
- Environmental impact (CO₂, landfill diversion) is invisible to decision-makers.
- ESG reporting remains anecdotal, not data-driven.

The absence of a structured digital marketplace is therefore both an **economic inefficiency** and a **sustainability failure** directly relevant to **SDG 9** (resilient infrastructure, sustainable industrialization, innovation).

---

## 3. Value Proposition

> "List what you'd throw away. Find what others need. See your impact."

**For Waste Providers** — Turn disposal cost into revenue and ESG credit.
**For Material Buyers** — Discover affordable, verified, location-matched materials.
**For Administrators** — Govern a trusted, measurable circular ecosystem.
**For Society & SDG 9** — Transparent, anticipatory sustainability data that quantifies infrastructure-level impact.

**Differentiators**
1. **Smart Matching** — auto-pairs supply and demand by category, quantity, location, and condition.
2. **Sustainability Impact Analysis** — every transaction reports kg diverted + CO₂e saved + equivalences.
3. **Anticipatory Forecasting (SC2)** — predicts future impact, supply, and demand trends.
4. **Trust by transparency** — verification, ratings, location proximity, clear terms.

---

## 4. User Personas

### 4.1 Waste Provider — "Encik Hafiz"
- **Role:** Site supervisor, mid-size contractor in Johor Bahru.
- **Age / Tech:** 38 / mobile-first, WhatsApp-fluent, light web user.
- **Goals:** Clear surplus materials fast; avoid disposal fees; show client an ESG receipt.
- **Pain points:** No buyers in network; manual listing on Facebook is unreliable; no proof of diversion.
- **Needs:** 60-second listing flow, mobile photo upload, pickup scheduling.

### 4.2 Material Buyer — "Sara, Eco-Designer & Recycler"
- **Role:** Small business owner producing upcycled furniture.
- **Age / Tech:** 29 / digital-native, desktop + mobile.
- **Goals:** Source affordable timber and metal weekly; verify condition before pickup.
- **Pain points:** Inconsistent supply; long drives for wrong material; no quality signal.
- **Needs:** Filters, map view, condition grading, seller trust signals, request cart.

### 4.3 Platform Administrator — "Dr. Lim, Sustainability Officer"
- **Role:** Platform operator and ESG analyst.
- **Goals:** Verify users, monitor disputes, ensure data quality, export SDG 9 impact reports.
- **Pain points:** Fraudulent listings, unverified weights, inability to forecast trends.
- **Needs:** Moderation queue, verification tools, analytics, anticipatory dashboards.

---

## 5. User Journey Mapping

### Waste Provider Journey
Discover → Register → Verify → Create Listing → Receive Matches → Confirm Reservation → Schedule Pickup → Complete Transaction → View Impact → Share Impact Card.

| Stage | Emotion | Touchpoint | Opportunity |
|---|---|---|---|
| Discover | Curious | Landing page, social share | Bold "List your waste" CTA |
| List | Hopeful but rushed | Create Listing wizard | Auto-save, AI category suggest |
| Match | Anticipating | Smart Match notification | "X buyers nearby" badge |
| Complete | Proud | Transaction Success | Impact metric + share card |

### Material Buyer Journey
Search → Filter → View Details → Add to Request Cart → Checkout → Pickup → Rate Seller → View Cumulative Impact.

### Administrator Journey
Login → Moderation Queue → Verification → Disputes → Analytics → Export ESG / SDG 9 report.

---

## 6. Information Architecture

```text
ReMate
├── Public
│   ├── Landing Page
│   ├── Registration
│   └── Login
├── Authenticated (Generator + Buyer shared shell)
│   ├── Marketplace Dashboard
│   │   ├── Smart Match rail
│   │   ├── Recent listings
│   │   └── Personal KPIs
│   ├── Search & Filters
│   │   └── List ↔ Map toggle
│   ├── Material Details
│   ├── Create Listing (multi-step)
│   ├── Request Cart
│   ├── Checkout
│   ├── Transaction Success
│   ├── User Profile
│   │   ├── My Listings
│   │   ├── My Requests
│   │   ├── Verification
│   │   └── Settings (language EN/BM)
│   └── Sustainability Dashboard
│       ├── KPI tiles
│       ├── Charts (historical)
│       ├── Anticipatory Forecast (SC2)
│       └── Shareable Impact Card
└── Admin (separate role)
    ├── Moderation
    ├── Verification
    ├── Disputes
    └── Analytics & Exports
```

---

## 7. MVP Scope (Version 1)

**In scope**
- Email registration + role selection (Provider / Buyer)
- Listing creation with photos, category, quantity, condition, location, price
- Browse, search, filter, map view
- Smart Matching (rule-based v1: category + radius + quantity)
- Request Cart + Checkout (pickup-based, no payment integration in v1)
- Transaction Success with impact summary
- Sustainability Dashboard (kg diverted, CO₂e saved, equivalences)
- Basic anticipatory forecast (linear projection from history)
- User Profile + ratings

**Out of scope (v2+)**
- In-app payments / escrow
- Logistics partner integration
- AI photo recognition for category
- Mobile native apps
- Multi-tenant enterprise dashboards

---

## 8. Screen Planning

### 8.1 Landing Page
- **Purpose:** Communicate ReMate's promise in 10 seconds and convert visitors to signups.
- **User Goal:** Understand what it does, for whom, and try it.
- **Main Sections:** Hero (headline + dual CTA + live impact counter); How it Works (3 steps); Category showcase; Smart Match teaser; Sustainability impact strip; Testimonials; FAQ; Footer.
- **Key UI Components:** Hero block, animated impact counter, category cards, step illustrations, CTA buttons, language toggle.
- **Primary CTA:** "Get Started — Free".

### 8.2 Registration
- **Purpose:** Onboard new users in under 90 seconds.
- **User Goal:** Create an account and pick a role.
- **Main Sections:** Brand panel (left, value prop); Form (right) — name, email, password, role select (Provider/Buyer/Both), location, T&Cs.
- **Key UI Components:** Stepper (optional), role selector cards, password strength meter, Google OAuth button.
- **Primary CTA:** "Create Account".

### 8.3 Login
- **Purpose:** Return users access account quickly and securely.
- **User Goal:** Sign in.
- **Main Sections:** Brand panel; Form — email, password, remember me, forgot password, OAuth.
- **Key UI Components:** Input fields, OAuth buttons, inline error.
- **Primary CTA:** "Sign In".

### 8.4 Marketplace Dashboard
- **Purpose:** Personalized home — surface matches, recent activity, and impact-at-a-glance.
- **User Goal:** Discover relevant materials and act fast.
- **Main Sections:** Greeting + quick KPI strip; "Matched for you" rail; Recently added; Categories grid; Nearby map preview; Personal impact mini-card.
- **Key UI Components:** Listing cards, KPI tiles, horizontal rail, map preview, FAB "Create Listing".
- **Primary CTA:** "Create Listing" (FAB).

### 8.5 Search & Filters
- **Purpose:** Help buyers find the right material precisely.
- **User Goal:** Narrow results to suitable items.
- **Main Sections:** Search bar + active-filter chips; Filter panel (category, condition A/B/C, distance, price, quantity, availability); Results grid; List ↔ Map toggle.
- **Key UI Components:** Filter chips, collapsible panel/bottom sheet, sort dropdown, result cards, map pins linked to cards.
- **Primary CTA:** "Apply Filters" / per-card "View".

### 8.6 Material Details
- **Purpose:** Provide enough trust and information to reserve.
- **User Goal:** Decide to request the material.
- **Main Sections:** Photo gallery; Title + price + condition; Quantity/dimensions; Description; Pickup location + map; Seller trust block (avatar, verification, rating, response time); Impact estimate; Related listings.
- **Key UI Components:** Image carousel, sticky action bar (mobile), seller card, embedded map, impact pill.
- **Primary CTA:** "Add to Request Cart".

### 8.7 Create Listing
- **Purpose:** Frictionless multi-step listing for on-site users.
- **User Goal:** Publish a listing in ≤ 60 seconds.
- **Main Sections:** Step 1 Photos (drag-drop/camera); Step 2 Category & Condition; Step 3 Quantity, Dimensions, Price; Step 4 Location & Pickup window; Step 5 Review + estimated impact.
- **Key UI Components:** Progress bar, upload zone, category picker, condition grade selector, map picker, autosave indicator.
- **Primary CTA:** "Publish Listing".

### 8.8 User Profile
- **Purpose:** Manage identity, listings, requests, verification, and preferences.
- **User Goal:** Maintain trust and control account.
- **Main Sections:** Profile header (avatar, name, verification badge, rating); Tabs — My Listings / My Requests / Reviews / Verification / Settings (language, notifications).
- **Key UI Components:** Avatar uploader, tabbed nav, listing cards, verification checklist, toggle switches.
- **Primary CTA:** "Edit Profile" / "Verify Account".

### 8.9 Sustainability Dashboard (SDG 9 showcase)
- **Purpose:** Make environmental impact tangible and anticipatory.
- **User Goal:** See impact achieved and projected; export/share.
- **Main Sections:** 4 KPI tiles (kg diverted, CO₂e saved, transactions, partners); Charts (stacked bar over time, donut by category, cumulative line); Equivalences row (trees / km / electricity); **Anticipatory Forecast band (SC2)** with dashed projections; Shareable Impact Card; Export buttons (PDF/CSV).
- **Key UI Components:** KPI tiles with sparklines, charts, forecast panel with ✦ marker, share card composer.
- **Primary CTA:** "Share Impact" / "Export Report".

### 8.10 Request Cart
- **Purpose:** Aggregate selected materials before checkout.
- **User Goal:** Review and adjust requests.
- **Main Sections:** Items list (thumbnail, title, seller, qty, price, remove); Estimated total impact; Seller-grouped pickup notes; Summary aside.
- **Key UI Components:** Quantity stepper, remove button, impact subtotal, sticky summary, empty-state illustration.
- **Primary CTA:** "Proceed to Checkout".

### 8.11 Checkout
- **Purpose:** Confirm pickup logistics, terms, and sustainability commitment.
- **User Goal:** Finalize the reservation.
- **Main Sections:** Pickup slot selector per seller; Contact details; Notes; Sustainability commitment checkbox; Summary (items, total, projected impact).
- **Key UI Components:** Date/time picker, address card, checkbox, sticky summary.
- **Primary CTA:** "Confirm Reservation".

### 8.12 Transaction Success
- **Purpose:** Celebrate the action and reinforce impact identity.
- **User Goal:** Get confirmation and next steps.
- **Main Sections:** Success hero with animated impact counter; Pickup details + contact; "Added to your impact" mini-card; Suggestions (browse more / view dashboard); Shareable Impact Card.
- **Key UI Components:** Confetti-light animation (reduced-motion safe), impact card, share buttons, next-action CTAs.
- **Primary CTA:** "View My Impact".

---

## 9. Design System Planning

**Theme:** Modern startup · sustainability-focused · Airbnb-quality polish · restrained (no eco clichés).

### 9.1 Color Palette
| Token | Value | Role |
|---|---|---|
| Primary (Emerald) | `#059669` | CTAs, brand, active states |
| Primary soft | emerald-50 | Hover, tag backgrounds |
| Background | `#F9FAFB` | App background |
| Surface | `#FFFFFF` | Cards, modals, inputs |
| Foreground | `#1F2937` | Body text |
| Muted | slate-500 | Secondary text |
| Border | slate-200 | Dividers |
| Impact (Teal) | `#0D9488` | Reserved for sustainability metrics only |
| Warning | amber-500 | Pickup-soon, low-stock |
| Destructive | rose-600 | Cancel, delete |
| Condition A/B/C | emerald / amber / slate | Material grade signals |

### 9.2 Typography System
- **Family:** Inter (UI) + Inter Display (hero), tabular-nums for metrics.
- **Scale (mobile → desktop):** Display 36→56 · H1 28→36 · H2 22→28 · H3 18→20 · Body 15→16 · Small 13→14 · Label 12 uppercase · Metric 32→48 · Metric-sm 20→24.
- **Weights:** 400 body, 500 labels, 600 headings, 700 metrics.

### 9.3 Layout Structure
- 12-column grid, 1280px max (1440px for Sustainability Dashboard).
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280.
- Detail screens: 7/5 split (content / sticky aside).
- Spacing scale 4-pt: 4/8/12/16/24/32/48/64.
- Radius: 12px cards, 8px inputs, 999px pills.

### 9.4 Navigation Design
- **Desktop:** persistent left sidebar (collapsible 64/240px) + top bar with global search, notifications, avatar.
- **Mobile:** bottom tab bar (Home · Search · Create FAB · Impact · Profile).
- **Public:** transparent top nav over hero, sticky on scroll.
- ⌘K command palette for power users (desktop).

### 9.5 Card Design Style
- 4:3 image, condition badge top-left, save heart top-right.
- Title (1 line), category + quantity, distance + price, impact footer in `--impact` color.
- 12px radius, 1px slate-200 border, single soft shadow, hover lift 2px.
- Variants: Compact (dense grid), Featured (with seller block), Match card (% chip + "why matched").

### 9.6 Form Design Style
- Single column, labels above inputs, helper below.
- 44px min height, 8px radius, 2px primary focus ring.
- Multi-step wizards with progress bar, autosave, Back/Next persistent footer.
- One primary CTA per screen; inline validation on blur; smart defaults.

### 9.7 Dashboard Design Style
- Analytic register distinct from marketplace: more whitespace, tabular-nums, monochrome charts using `--impact` teal + slate.
- KPI tiles with delta pill + sparkline.
- Equivalences as illustrated micro-cards (trees / km / electricity).
- Anticipatory Forecast band — tinted background, dashed projection lines, ✦ marker — explicitly visualizes SC2 thinking.
- Shareable 1:1 Impact Card for social export.

**Motion:** 150–200ms micro, 300ms page/sheet, 800ms impact-counter; respects `prefers-reduced-motion`.
**Accessibility:** WCAG 2.1 AA — contrast, focus rings, semantic landmarks, alt text, EN/BM `lang` switching, 44px touch targets, screen-reader live regions for cart/impact.

---

## 10. MVP Development Priority

| Rank | Screen | Rationale |
|---|---|---|
| 1 | Landing Page | Front door; demo opener; conversion. |
| 2 | Registration | Required to enter the product. |
| 3 | Login | Required for return users. |
| 4 | Marketplace Dashboard | Core authenticated hub. |
| 5 | Create Listing | Without supply, no marketplace. |
| 6 | Search & Filters | Core discovery for buyers. |
| 7 | Material Details | Conversion-critical trust screen. |
| 8 | Request Cart | Bridges discovery to checkout. |
| 9 | Checkout | Closes the transaction loop. |
| 10 | Transaction Success | Reinforces impact identity. |
| 11 | Sustainability Dashboard | SDG 9 + SC2 showcase. |
| 12 | User Profile | Trust and account management. |

---

## 11. Presentation Strategy

**Most visually impressive**
1. Landing Page — animated impact counter, bold hero.
2. Sustainability Dashboard — KPIs, charts, anticipatory forecast.
3. Marketplace Dashboard — Smart Match rail, polished cards.
4. Transaction Success — celebratory impact moment + share card.

**Best demonstrate SDG 9 (Industry, Innovation, Infrastructure)**
1. Sustainability Dashboard — quantifies infrastructure-level circular impact.
2. Marketplace Dashboard with Smart Match — innovation in resource allocation.
3. Create Listing — converts industrial waste streams into shared infrastructure.
4. Transaction Success — closes the measurable loop.

**Recommended showcase order for final presentation**
1. **Landing Page** — 30s pitch, live counter establishes credibility.
2. **Create Listing** — show generator flow on mobile (real-site context).
3. **Marketplace Dashboard → Material Details** — show Smart Match + trust signals.
4. **Request Cart → Checkout → Transaction Success** — close the loop, reveal impact.
5. **Sustainability Dashboard with Anticipatory Forecast** — climax: SDG 9 + SC2 Anticipatory Thinking made visible.
6. **Profile (brief)** — verification, ratings, bilingual EN/BM toggle as trust + inclusivity proof.

**Why this order wins:** it tells a complete story — Problem (Landing) → Action (List) → Discovery (Match) → Outcome (Impact) — and ends on the strongest SDG 9 visual, leaving evaluators with a quantitative, future-facing impression aligned to SC2.

---

**End of planning document. Ready to proceed to rendered design directions on approval.**
