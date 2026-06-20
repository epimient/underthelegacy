# Design System

## Visual Philosophy

The visual identity is built around the band's sonic territory: slow, heavy, hypnotic. Every design decision stems from three reference points:

- **70s heavy rock aesthetics** — vintage textures, grayscale imagery, analog warmth
- **Classic horror cinema** — high contrast, shadow dominance, atmospheric dread
- **Occult iconography** — ritualistic structure, crimson accents, monumental typography

The result is an immersive digital space that feels ancient, weathered, and ritualistic — never clean or modern.

---

## Color Palette

| Name | Hex | Role | Usage |
|---|---|---|---|
| Absolute black | `#000000` | Canvas | Body background, foundation of all layouts |
| Near black | `#050505` | Gradient core | Radial gradient center in `.section-dark` |
| Deep carbon | `#080808` | Surface | `.product-card` backgrounds |
| Carbon | `#0c0c0c` | Elevated surface | `.platform-link` backgrounds |
| Dark carbon | `#0d0d0d` | Component surface | Modal content, popup, `.past-show-card`, `.modal-content` |
| Dark gray | `#151515` | Gradient edge | Radial gradient outer edge in `.section-dark` |
| Border | `#1a1a1a` | Lines | Card borders, input borders, modal header dividers, footer top border |
| Input border | `#333333` | Form boundaries | Input fields default border, modal outer border |
| Medium gray | `#444444` | Filter border | `.filter-btn` default border |
| Muted text | `#888888` / `#aaaaaa` | Secondary content | Metadata, placeholders, muted text, `.tagline`, nav links default |
| Body text | `#e2e2e2` | Primary copy | All paragraph text, button text, form labels |
| Carmine / Crimson | `#8c304c` | Primary accent | Buttons, hover states, active filters, checked checkboxes, focus rings, social buttons, all interactive highlights |
| Light carmine | `#a83a5a` | Hover accent | `.chat-bubble` hover state, elevated interactive feedback |

### Color Usage Principles

- Crimson is the **only saturated color** in the system — it carries all emotional weight
- Black to dark carbon gradients create **infinite depth** — no hard boundaries between sections
- All grays are warm-toned, avoiding cold/industrial feel
- Text contrast is deliberately moderate (not pure white on black) to reduce eye strain and evoke aged print

---

## Typography System

### Font Selection

| Usage | Font | Category | Characteristics |
|---|---|---|---|
| Headings (h1-h3) | **Cinzel** | Serif (Google Fonts) | Roman Imperial capitals, monumental, inscribed |
| Navigation | **Cinzel** | Serif | Same monumental feel, uppercase |
| Dates, tags, status indicators | **Cinzel** | Serif | Consistency across all non-body text |
| Body text | **Inter** | Sans-serif (Google Fonts) | Neutral, highly legible, geometric |
| Form inputs, buttons | **Inter** | Sans-serif | Clean, functional, no decorative elements |

### Hierarchy

| Element | Font | Size | Weight | Letter-spacing | Transform |
|---|---|---|---|---|---|
| h1 | Cinzel | 2.6rem | 400 | 2px | Uppercase |
| h2 | Cinzel | 1.6rem | 400 | 2px | Uppercase |
| h3 (member cards) | Cinzel | 1.1rem | 400 | — | Uppercase |
| h3 (past shows) | Cinzel | 1rem | 400 | — | Uppercase |
| Nav links | Cinzel | 0.85rem | — | 1px | Uppercase |
| Tagline | Cinzel | 0.9rem | 400 | 3px | Uppercase |
| Release status | Cinzel | 0.9rem | 400 | 3px | Uppercase |
| Member name | Cinzel | 0.8rem | 400 | 1px | Uppercase |
| Past show date | Cinzel | 0.8rem | 400 | 0.1em | Uppercase |
| Modal title | Cinzel | — | 400 | 1px | Uppercase |
| Body paragraph | Inter | 1rem | 300 | 0.3px | — |
| Product title | — | 1.2rem | — | — | — |
| Product desc, btn-sm | — | 0.8–0.9rem | — | — | — |

### Typography Principles

- Cinzel creates a sense of **inscription and permanence** — fitting for a band named "Under The Legacy"
- Inter's weight 300 (light) at body size provides **airy readability** against dense dark backgrounds
- Generous letter-spacing (2–3px) on headings **slows down reading pace**, matching the band's doom tempo
- All headings are uppercase — no sentence case or title case appears in headings
- Body text is justified (`text-align: justify`) with `max-width: 820px` for comfortable line lengths

---

## Component Library

### Button System

```css
.btn {
  background: transparent;
  border: 1px solid #8c304c;
  color: #e2e2e2;
  letter-spacing: 1px;
  padding: 12px 26px;
  border-radius: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.btn:hover {
  background: #8c304c;
  color: #ffffff;
}
```

**Rules:**
- Square corners (`border-radius: 0`) — hard edges reinforce heaviness
- Outlined by default (transparent fill, crimson border)
- Solid crimson fill on hover — no outline variant
- Two sizes: standard (12px/26px padding) and small (8px/20px, 0.8rem)
- 0.3s ease transition on background-color and color

### Filter Buttons

```css
.filter-btn {
  background: transparent;
  border: 1px solid #444;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
.filter-btn:hover {
  border-color: #8c304c;
  color: #e2e2e2;
}
.filter-btn.active {
  background: #8c304c;
  border-color: #8c304c;
  color: #ffffff;
}
```

Used for merch category filtering and show tab switching. Active state is solid crimson; inactive is outlined gray.

### Form Controls

```css
.form-control {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #e2e2e2;
  border-radius: 0;
}
.form-control:focus {
  border-color: #8c304c;
  box-shadow: 0 0 0 0.25rem rgba(140, 48, 76, 0.25);
}
.form-control::placeholder {
  color: #aaa;
}
```

**Rules:**
- Dark input background (`#1a1a1a`) blends with body black
- Default border is subtle `#333`
- Focus state triggers crimson border + crimson glow ring — the only focus indicator
- Square corners consistent with button style

### Checkboxes

```css
.form-check-input {
  background: #1a1a1a;
  border: 1px solid #333;
}
.form-check-input:checked {
  background: #8c304c;
  border-color: #8c304c;
}
```

Dark until checked, then solid crimson fill.

### Navigation

```css
nav {
  position: absolute;
  top: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0));
}
```

- Positioned absolutely, overlays the hero section
- Gradient fades from 80% black at top to fully transparent at bottom — no hard edge
- Logo (horizontal variant) on the left, five links on the right
- No hamburger menu — links are always visible (only 6 pages)
- Nav link default color: `#aaa`, hover: `#8c304c`

### Hero Pattern (index.html)

```css
.hero-cover {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
}
```

- Full-viewport video background with muted autoplay, poster image fallback
- Semi-transparent black overlay (45%) ensures content readability
- Centered content: logo image (with drop-shadow, opacity 0.7), tagline, two CTA buttons
- No JavaScript required — pure CSS

### Contact Hero (contact.html)

```css
.contact-hero {
  background: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
              url('../img/the_band.png') center / cover no-repeat;
  min-height: 50vh;
  display: flex;
  align-items: center;
}
```

Compact hero variant using the band group photo as background with a darker overlay (65%). Half the height of the main hero.

### Release Carousel (album.html)

Bootstrap 5 carousel with custom overlay treatment:
- Each slide has a full-width background image relevant to the release
- `.carousel-overlay`: 60% black (`rgba(0,0,0,0.6)`) for readability
- `.carousel-caption-custom`: centered over the overlay with release title, status badge, and description
- Gradient left/right edges on the carousel for smooth visual transition

### Card Systems

**Product Cards (merch.html):**
```css
.product-card {
  background: #080808;
  border: 1px solid #1a1a1a;
  padding: 20px;
  text-align: center;
  transition: border-color 0.3s ease;
}
.product-card:hover {
  border-color: #8c304c;
}
.product-image-container {
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
}
.product-image-container.poster-image-container {
  aspect-ratio: 5 / 7;
}
```

**Past Show Cards (shows.html):**
```css
.past-show-card {
  background: #0d0d0d;
  border: 1px solid #1a1a1a;
  transition: border-color 0.3s ease;
}
.past-show-card:hover {
  border-color: #8c304c;
}
.past-show-img {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.past-show-card:hover .past-show-img img {
  transform: scale(1.05);
}
```

**Member Cards (band.html):**
```css
.member-photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  filter: grayscale(1) contrast(1.1);
  transition: filter 0.4s ease;
}
.member-photo-container:hover .member-photo {
  filter: grayscale(0.5) contrast(1) brightness(0.7);
}
.member-description {
  position: absolute;
  inset: 0;
  background: rgba(15,10,10,0.85);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.member-photo-container:hover .member-description {
  opacity: 1;
}
```

All card types share: carbon background, subtle border, hover state that either brightens the border or turns it crimson.

### Platform Links

```css
.platform-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0c0c0c;
  border: 1px solid #222;
  padding: 10px 20px;
  color: #ccc;
  transition: all 0.3s ease;
}
.platform-link:hover {
  background: #8c304c;
  border-color: #8c304c;
  color: #fff;
}
```

Used on album.html for streaming platform buttons. Square, dark, fills crimson on hover.

### Social Buttons

```css
.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #8c304c;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.social-btn:hover {
  background: transparent;
  color: #8c304c;
}
```

Circular, solid crimson default, inverts to outline on hover. Used on contact.html.

### Chat Bubble

```css
.chat-bubble {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #8c304c;
  color: #fff;
  box-shadow: 0 4px 20px rgba(140,48,76,0.4);
  transition: transform 0.2s ease, background 0.2s ease;
}
.chat-bubble:hover {
  transform: scale(1.1);
  background: #a83a5a;
}
.chat-bubble:active {
  transform: scale(0.95);
}
```

**Contact Popup:**
```css
.contact-popup {
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  width: 340px;
  max-height: 480px;
  background: #0d0d0d;
  border: 1px solid #333;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  display: none;
}
.contact-popup.open {
  display: block;
  animation: slideUp 0.25s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Forms inside the popup include: name, email, phone, subject, message. Success state replaces form content.

### Modal System

Fully overrides Bootstrap 5 modal defaults for dark theme:

```css
.modal-content { background: #0d0d0d; border: 1px solid #333; }
.modal-header  { background: #0d0d0d; border-bottom: 1px solid #1a1a1a; }
.modal-body    { background: #0d0d0d; }
.modal-header .btn-close { filter: invert(1); } /* btn-close-white equivalent */
```

Two modals exist:
1. **Waitlist Modal** (album.html) — Format selection checkboxes + personal info
2. **Wishlist Modal** (merch.html) — Product-specific inquiry form

Both have success states that replace the form after submission.

### Gallery Grid

```css
.gallery-img-wrapper {
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  border: 1px solid #1a1a1a;
  box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.7);
  position: relative;
}
.gallery-img-wrapper img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery-img-wrapper img:hover {
  transform: scale(1.05);
}
```

3-column grid of square images with inset vignette shadow and subtle zoom on hover. Used on shows.html.

---

## Image Treatment System

Three tiers of image filtering create visual hierarchy and thematic consistency:

### Tier 1: Hero Logo (index.html)
```css
.hero-logo {
  filter: drop-shadow(0 0 20px rgba(0,0,0,0.8)) contrast(1.05) saturate(0.9);
  opacity: 0.7;
}
```
Faded, ancient, slightly desaturated — as if unearthed after centuries.

### Tier 2: Band Photos (band.html)
```css
.band-story-image {
  filter: grayscale(1) contrast(1.1);
  box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.7);
}
```
Full grayscale, boosted contrast, vignetted corners — archival photography aesthetic.

### Tier 3: General Images (album.html platform section)
```css
.platform-image {
  filter: grayscale(0.5) contrast(1.1);
  box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.7);
}
```
Partial desaturation — muted, cohesive, supports the dark theme without full color removal.

### Member Photo Hover (band.html)
- Default: full grayscale (`grayscale(1)`) with contrast boost
- Hover: grayscale reduces to 50% (`grayscale(0.5)`), brightness drops to 0.7 — color emerges from darkness
- Description overlay fades in simultaneously (0.4s transition)

### Product Image Hover (merch.html)
- Primary image (front): visible by default, fades out (opacity 0) on card hover
- Secondary image (back or mockup): hidden by default, fades in (opacity 1) on card hover
- 0.4s ease-in-out transition for both

---

## Global Effects

### Grain Texture

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}
```

An inline SVG `<feTurbulence>` filter generates fractal noise directly in the browser — zero additional HTTP requests. At 3.5% opacity, it adds a subtle analog film grain over the entire page without distracting from content.

### Box Shadows

- **Cards:** Subtle `#1a1a1a` borders (no drop shadow) — flat design
- **Chat bubble:** Crimson glow — `0 4px 20px rgba(140,48,76,0.4)`
- **Contact popup:** Deep shadow — `0 8px 32px rgba(0,0,0,0.6)`
- **Form focus:** Crimson ring — `0 0 0 0.25rem rgba(140,48,76,0.25)`
- **Images:** Inset vignette — `inset 0 0 15px 5px rgba(0,0,0,0.7)`

### Transition Timings

| Duration | Usage |
|---|---|
| 0.2s ease | Chat bubble transform and background |
| 0.3s ease | Buttons, filter buttons, nav links, member social, platform links, social buttons, product cards, past show cards, gallery zoom |
| 0.4s ease | Member photo filter, member description overlay, product image swap |
| 0.4s ease-in-out | Product image opacity crossfade |
| 0.25s ease | Contact popup slide-up animation |

---

## Layout Patterns

### Fullscreen Hero
Used on `index.html`. Video or background image fills the viewport, content is centered vertically and horizontally, overlay ensures readability.

### Two-Column Content
Used on `band.html` (history + photo), `album.html` (platforms section, physical formats), `shows.html` (upcoming show). Alternates content/visual using Bootstrap's `order-lg-*` classes. Stacks to single column below 992px.

### Content Grids

| Grid | Technique | Columns | Gap |
|---|---|---|---|
| Member cards | Flexbox | Up to 4 | 40px |
| Merch products | CSS Grid (`auto-fit`, `minmax(280px, 1fr)`) | Auto-responsive | 30px |
| Past shows | Bootstrap grid (`col-md-6 col-lg-4`) | 1–3 | Bootstrap g-4 |
| Gallery | Bootstrap grid (`col-md-6 col-lg-4`) | 1–3 | Bootstrap g-4 |

### Tab / Filter Pattern
Data-attribute-driven toggle with JavaScript:

```html
<button class="filter-btn active" data-filter="all">All</button>
<button class="filter-btn" data-filter="t-shirt">T-Shirts</button>
```

```javascript
// On click: read data-filter, iterate all items, show/hide based on match
// Active class toggled on the clicked button
```

Applied to: merch category filter (merch.html), upcoming/past show tabs (shows.html).

---

## Responsive Behavior

The site relies entirely on Bootstrap 5.3.3 grid system with **no custom media queries**.

| Breakpoint | Behavior |
|---|---|
| >= 1200px (xl) | 3-column grids active, full layout |
| >= 992px (lg) | Two-column layouts active, 3-column grids start |
| >= 768px (md) | Two-column stacks to single, 3-column becomes 2 |
| < 768px | Single column, grids collapse, nav links wrap |
| All sizes | Images use `img-fluid`, CSS Grid `auto-fit` handles merch columns |

**Limitations:**
- No hamburger menu — navigation links wrap on small screens, which may overflow
- No custom breakpoints for specific component behaviors
- Modal dialogs use Bootstrap defaults (full-width on mobile)

---

## Naming Conventions

Sections and features use ritualistic semantic language rather than generic labels:

| Generic | Site terminology |
|---|---|
| Band members | "The Coven" |
| Merchandise | "Forged Offerings" |
| Shows / concerts | "Live Rituals" |
| Newsletter signup | "Join the Ritual" |
| Social links section | "Follow the Path" |
| Album release | "Witness the Ritual" |
| Past shows | "Past Rituals" |
| Upcoming shows | "Upcoming Rituals" |
| Contact hero subtitle | "For booking, press, or to join the inner circle." |

This vocabulary reinforces the band's occult/ritualistic branding across all pages.

---

## Hover Effects Catalog

| Element | Default State | Hover State | Transition |
|---|---|---|---|
| Navigation links | `color: #aaa` | `color: #8c304c` | 0.3s |
| Primary buttons | Transparent bg, crimson border | Solid crimson bg, white text | 0.3s |
| Filter buttons | Transparent, gray border | Crimson border/text (active: solid) | 0.3s |
| Product cards | `#1a1a1a` border | `#8c304c` border | 0.3s |
| Member photos | Full grayscale, full brightness | 50% grayscale, 70% brightness | 0.4s |
| Member descriptions | Hidden (opacity 0) | Visible (opacity 1) | 0.4s |
| Product images | Front visible, back hidden | Front fades out, back fades in | 0.4s |
| Platform links | Dark bg, gray border | Solid crimson bg | 0.3s |
| Social buttons | Solid crimson bg, white icon | Transparent, crimson icon | 0.3s |
| Past show cards | `#1a1a1a` border | `#8c304c` border + image zoom 1.05 | 0.3s |
| Gallery images | No transform | Scale 1.05 | 0.3s |
| Chat bubble | Crimson, default size | Scale 1.1, lighter crimson | 0.2s |
| Chat bubble (active) | — | Scale 0.95 | 0.2s |
| Form inputs | `#333` border | Crimson border + glow ring | Instant (focus) |

---

## Page Layout Summary

| Page | Primary Pattern | Secondary Pattern | Tertiary |
|---|---|---|---|
| index.html | Fullscreen video hero | Centered CTA buttons | — |
| band.html | Two-column text + image | 2x2 member card grid | — |
| album.html | Full-width release carousel | Two-column Listen section + Physical Formats | Waitlist modal |
| merch.html | Filter bar | Auto-fit CSS Grid product cards (3 cols) | Wishlist modal |
| shows.html | Tab switcher (upcoming/past) | Upcoming: two-column card; Past: 3-col card grid | 3-col photo gallery |
| contact.html | Contact hero (50vh, background image) | Centered newsletter form | Floating chat popup + social grid |
