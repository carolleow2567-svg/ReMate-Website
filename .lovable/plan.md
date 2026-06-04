# ReMate — Screen Planning Blueprint

13 screens, structured for the MVP demo. Planning only — no code, no implementation details.

---

## 1. Landing Page  `/`

**Purpose:** Convert first-time visitors into registered users and communicate the circular-economy value proposition.
**Primary user goal:** Understand what ReMate does in <10 seconds and sign up or browse.

**Key components:** Sticky nav, hero, live impact counter, "How it works" 3-step strip, featured material categories, sample listing cards, testimonial/persona quotes, SDG 9 badge strip, footer.

**Required sections:**
1. Hero — headline, sub-headline, dual CTA (List waste / Find materials)
2. Live Impact Counter — total kg diverted, tonnes CO₂e saved, transactions
3. How It Works — List → Match → Pickup → Impact
4. Material Categories grid (Timber, Metal, Plastic, C&D, Packaging, Other)
5. Featured Listings carousel
6. Why ReMate (3 differentiators: Smart Match, Impact Analysis, Anticipatory)
7. SDG 9 alignment block
8. Footer (links, language toggle EN/BM)

**Layout:** Full-width vertical stack, mobile-first single column → 2/3-col grids on desktop.
**CTAs:** "List Your Waste", "Browse Materials", "Sign Up Free", "Login".
**Navigation destinations:** Registration, Login, Marketplace Dashboard (guest preview), About/SDG, Material Details (via featured cards).
**Data required:** Aggregate impact stats, featured listings (6–8), categories.
**Flow relationships:** Entry point → Registration / Login / Marketplace Dashboard.

---

## 2. Registration  `/register`

**Purpose:** Create a verified account with role selection.
**Primary goal:** Sign up in under 90 seconds.

**Key components:** Role selector (Generator / Seeker / Both), form fields, password strength meter, T&C checkbox, social-login buttons, language toggle.

**Required sections:**
1. Role selection (visual cards)
2. Account form (name, email, phone, password)
3. Optional business details (SSM number for verification badge)
4. Location (state/city for matching)
5. Submit + "Already have account? Login"

**Layout:** Centered single-column card, progress indicator (Role → Details → Verify).
**CTAs:** "Create Account", "Continue with Google", "Login instead".
**Navigation:** Login, Email-verification screen, Marketplace Dashboard (post-signup).
**Data required:** User input → user record + role + verification status.
**Flow relationships:** From Landing/Login → into Marketplace Dashboard.

---

## 3. Login  `/login`

**Purpose:** Authenticate returning users.
**Primary goal:** Log in fast and land where they were last working.

**Key components:** Email/password fields, social login, "Forgot password", "Remember me".

**Required sections:** Form, secondary actions (forgot/register), language toggle.
**Layout:** Centered card, same shell as Registration for consistency.
**CTAs:** "Login", "Forgot Password", "Create Account".
**Navigation:** Marketplace Dashboard on success; Registration; Password reset.
**Data required:** Credentials → session token.
**Flow relationships:** Entry → Dashboard.

---

## 4. Marketplace Dashboard  `/dashboard`

**Purpose:** Personalized home hub showing matches, listings, activity, and quick actions.
**Primary goal:** See what's relevant *to me* right now and act on it.

**Key components:** Top nav with search bar, role-aware widgets, smart match feed, quick-action tiles, activity timeline, mini impact summary.

**Required sections:**
1. Greeting + role badge + quick stats (active listings / matches / pending pickups)
2. Quick Actions (Create Listing, Search, View Map, Wishlist)
3. Smart Matches feed (ranked cards with match %)
4. Recent activity / messages snippet
5. Mini Impact widget (link to full Sustainability Dashboard)
6. Recommended categories

**Layout:** Sidebar nav (desktop) / bottom-tab nav (mobile); main content 2-column on desktop (feed + sidebar widgets).
**CTAs:** "Create Listing", "Browse All", "View Matches", "Open Map".
**Navigation:** Search, Map View, Material Details, Create Listing, Profile, Sustainability Dashboard, Cart.
**Data required:** User profile, smart matches, recent listings, notifications, impact summary.
**Flow relationships:** Central hub — connects to every authenticated screen.

---

## 5. Search & Advanced Filters  `/search`

**Purpose:** Let seekers find materials precisely.
**Primary goal:** Narrow thousands of listings to the right few.

**Key components:** Search bar, filter sidebar/sheet, sort dropdown, results grid, save-search button, toggle (List / Map).

**Required sections:**
1. Search input + recent searches
2. Filters: category, sub-type, condition grade (A/B/C), quantity range, distance radius, price (free/negotiable/fixed), availability window, seller rating
3. Active filter chips
4. Results grid with pagination/infinite scroll
5. Empty/zero-state with smart suggestions
6. Save Search CTA

**Layout:** Left filter panel (desktop) / slide-up sheet (mobile); results in responsive card grid.
**CTAs:** "Apply Filters", "Save Search", "Switch to Map", "Clear All".
**Navigation:** Material Details, Map View, Cart (add quick-reserve).
**Data required:** Listings index, filter taxonomy, user wishlist (for match scoring).
**Flow relationships:** Dashboard → Search → Material Details → Cart.

---

## 6. Geolocation Map View  `/map`

**Purpose:** Visualize listings spatially to optimize pickup logistics.
**Primary goal:** Find nearby materials and plan routes.

**Key components:** Full-screen map, geo-clustered pins color-coded by category, pin popovers, filter bar overlay, list-toggle, "Use my location", radius slider.

**Required sections:**
1. Map canvas
2. Top filter overlay (category, distance)
3. Pin detail popover (thumbnail, title, distance, quantity, condition, "View" / "Reserve")
4. Bottom drawer: list of pins in current viewport
5. Heatmap toggle (Future: demand density)

**Layout:** Map fills viewport; floating UI panels overlay.
**CTAs:** "Use My Location", "View Listing", "Reserve", "Switch to List".
**Navigation:** Material Details, Search, Cart.
**Data required:** Geo-tagged listings, user location, category taxonomy.
**Flow relationships:** Search ↔ Map (same data, two views) → Material Details.

---

## 7. Material Details  `/listing/:id`

**Purpose:** Provide full information for a reservation decision.
**Primary goal:** Decide whether to reserve / add to cart.

**Key components:** Photo gallery, title, key specs panel, seller card, location map snippet, projected impact preview, similar listings, sticky action bar.

**Required sections:**
1. Photo gallery (≥3 images, zoomable)
2. Title + category + condition grade badge
3. Specs: quantity, dimensions, material sub-type, price/free, availability window
4. Description
5. Seller card (name, verification badge, rating, response time, message button)
6. Pickup location (map snippet + general area, exact on reservation)
7. **Projected Impact panel** — "Reusing this saves X kg CO₂e, Y kg landfill"
8. Similar / recommended listings
9. Sticky action bar: Add to Cart / Reserve / Message

**Layout:** Two-column desktop (gallery left, info right); single-column mobile with sticky CTA.
**CTAs:** "Add to Cart", "Reserve Now", "Message Seller", "Save".
**Navigation:** Cart, Chat thread, Seller Profile, Map View.
**Data required:** Listing record, seller profile, impact factors, similar listings.
**Flow relationships:** Search/Map/Dashboard → Material Details → Cart → Checkout.

---

## 8. Create Waste Listing  `/listing/new`

**Purpose:** Let generators publish a listing quickly.
**Primary goal:** Publish in under 60 seconds.

**Key components:** Multi-step wizard, photo uploader (with compression preview), category auto-suggest, quantity/unit selector, pickup scheduler, recurring toggle, preview pane.

**Required sections (4 steps):**
1. **Photos & Category** — upload ≥3 photos, auto-detected category (editable)
2. **Specs** — quantity + unit, condition grade A/B/C, material sub-type, description
3. **Pickup & Price** — address, availability window, price type (free/negotiable/fixed), recurring schedule
4. **Review & Publish** — preview card + projected impact estimate

**Layout:** Step progress bar at top; one section per step; persistent "Back / Next" footer.
**CTAs:** "Next", "Back", "Save Draft", "Publish Listing".
**Navigation:** Dashboard, My Listings, the newly created Material Details.
**Data required:** Categories, condition grades, impact factors, user address book.
**Flow relationships:** Dashboard → Create → Material Details (auto-redirect after publish).

---

## 9. User Profile  `/profile`

**Purpose:** Manage identity, verification, preferences, and view public reputation.
**Primary goal:** Build trust and control account settings.

**Key components:** Avatar, name, role badge, verification status, ratings summary, tabs (Overview / Listings / Reviews / Settings), language toggle, logout.

**Required sections:**
1. Profile header (avatar, name, badges, rating, member since)
2. Tabs:
   - Overview: bio, location, mini impact stats
   - My Listings (Generator) / Wishlist (Seeker)
   - Reviews received
   - Settings: account, notifications, language EN/BM, privacy, verification upload
3. Logout

**Layout:** Header + tabbed content; settings as forms in cards.
**CTAs:** "Edit Profile", "Verify Business", "Save Changes", "Logout".
**Navigation:** Sustainability Dashboard, My Listings, Login (post-logout).
**Data required:** User record, listings, reviews, notification prefs.
**Flow relationships:** Accessible from any authenticated screen via avatar menu.

---

## 10. Sustainability Dashboard  `/impact`

**Purpose:** Visualize personal/business environmental impact — the SDG 9 showcase screen.
**Primary goal:** Quantify, reflect on, and share contribution.

**Key components:** KPI tiles, time-range filter, charts, equivalence translations, shareable Impact Card, export button, anticipatory forecast panel.

**Required sections:**
1. **KPI tiles:** kg diverted, tonnes CO₂e avoided, transactions, water/energy avoided
2. **Time range filter** (week / month / quarter / year / all)
3. **Charts:** stacked bar (impact over time), donut (impact by material category), line (cumulative diversion)
4. **Equivalences:** "= 12 trees planted", "= 4 months household electricity"
5. **Anticipatory panel (SC2):** projected next-month impact based on activity trend; supply/demand forecast
6. **Shareable Impact Card** — generates an image for LinkedIn/Instagram
7. **ESG Export** — PDF/CSV download (business accounts)

**Layout:** Dashboard grid — KPI row → charts row → forecast → share/export.
**CTAs:** "Share Impact Card", "Export ESG Report", "View Forecast".
**Navigation:** Profile, Dashboard.
**Data required:** Completed transactions, material impact factors, forecast model output.
**Flow relationships:** Accessible from Dashboard, Profile, and post-transaction Success screen.

---

## 11. Materials Request Cart  `/cart`

**Purpose:** Hold one or multiple reservation requests before committing to checkout.
**Primary goal:** Review, adjust, and confirm pickup intent.

**Key components:** Item list with thumbnails, per-item quantity/notes, per-item pickup-slot picker, per-item seller info, combined impact preview, summary panel.

**Required sections:**
1. Cart items (thumbnail, title, qty requested, seller, distance, price)
2. Per-item controls: edit quantity, choose pickup slot, message seller, remove
3. Grouping by seller (multiple sellers = multiple pickup coordinations)
4. **Combined Impact Preview** — total kg + CO₂e if reservations complete
5. Summary panel: total items, total cost (if any), # of pickups required
6. Notes field
7. Proceed CTA

**Layout:** Two-column desktop (items list left, summary sticky right); single-column mobile with sticky bottom summary.
**CTAs:** "Proceed to Checkout", "Continue Browsing", "Remove", "Save for Later".
**Navigation:** Checkout, Material Details, Search.
**Data required:** Cart state, listings, seller availability slots, impact factors.
**Flow relationships:** Material Details → Cart → Checkout.

---

## 12. Checkout  `/checkout`

**Purpose:** Confirm reservation(s), select payment (if applicable), and lock in pickup slots.
**Primary goal:** Commit confidently with all details visible.

**Key components:** Order review, pickup details per seller, payment method selector (if priced), terms acceptance, final impact projection, place-order CTA.

**Required sections:**
1. Reservation summary (items grouped by seller)
2. Pickup schedule confirmation per seller (date, time, contact person, vehicle type)
3. Delivery option (self-pickup / request logistics partner — future)
4. Payment (if listings have price): method, billing details
5. Terms & conditions + sustainability commitment checkbox
6. **Final Impact Projection** (highlighted)
7. Place Order CTA

**Layout:** Linear step-down single column on mobile; two-column desktop with sticky summary.
**CTAs:** "Confirm Reservation", "Back to Cart", "Edit Pickup".
**Navigation:** Cart (back), Transaction Success (forward).
**Data required:** Cart, user payment methods, seller schedules, T&C version.
**Flow relationships:** Cart → Checkout → Transaction Success.

---

## 13. Transaction Success  `/success/:transactionId`

**Purpose:** Confirm reservation, reinforce impact, drive next action.
**Primary goal:** Feel rewarded and know what happens next.

**Key components:** Success illustration/animation, transaction ID, reservation summary, **Impact gained** highlight, next-step checklist, shareable Impact Card, related actions.

**Required sections:**
1. Confirmation header ("Reservation confirmed!")
2. Transaction details (ID, items, pickup schedule, seller contact)
3. **Impact Earned panel** — kg diverted + CO₂e saved (animated counter)
4. Next steps checklist (Contact seller / Prepare transport / Confirm pickup / Leave review)
5. Shareable Impact Card
6. CTAs to continue journey

**Layout:** Centered celebratory layout, single column.
**CTAs:** "View Reservation", "Share Impact", "Back to Dashboard", "Browse More".
**Navigation:** Dashboard, Sustainability Dashboard, Chat with seller, Material Details.
**Data required:** Transaction record, computed impact, seller contact.
**Flow relationships:** Checkout → Success → Dashboard / Sustainability Dashboard / Chat.

---

## Cross-screen Flow Summary

```
Landing ─► Register ─► Dashboard ─┬─► Search ─► Material Details ─► Cart ─► Checkout ─► Success
        └► Login ────────┘         ├─► Map View ────┘                                      │
                                    ├─► Create Listing                                      │
                                    ├─► Profile                                             │
                                    └─► Sustainability Dashboard ◄────────────────────────┘
```

---

## Prioritization

**Highest priority for MVP (must demo):**
1. Landing — first impression
2. Registration
3. Login
4. Marketplace Dashboard
5. Search & Advanced Filters
6. Material Details
7. Create Waste Listing
8. Cart
9. Checkout
10. Transaction Success
11. Sustainability Dashboard

**Secondary for MVP polish:** User Profile, Geolocation Map View.

**Strongest presentation impact (judges/lecturer "wow" screens):**
1. **Sustainability Dashboard** — visual proof of measurable SDG impact
2. **Landing Page** — live impact counter sets the tone
3. **Geolocation Map View** — visually arresting, demonstrates spatial intelligence
4. **Transaction Success** — emotional payoff, shareable card moment
5. **Material Details** — projected-impact panel makes the value tangible

**Best SDG 9 alignment demonstration (Industry, Innovation, Infrastructure):**
1. **Sustainability Dashboard** — quantifies industrial-material reuse; ESG export = infrastructure for circular reporting
2. **Smart-Match feed on Marketplace Dashboard** — innovation in resource allocation
3. **Map View with anticipatory heatmap** — infrastructure-level visibility of material flows
4. **Create Waste Listing (recurring schedules)** — industrial process integration
5. **Transaction Success Impact Earned panel** — closes the loop, makes infrastructure-scale benefit visible per transaction

---

**Next step after approval:** generate 3 design directions (palette, typography, composition) and have the user select one before building any screens.
