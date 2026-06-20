# Under The Legacy — Official Website

Static promotional website for the heavy psych / stoner doom band Under The Legacy. Built as a multi-page, fully responsive site with a strong visual identity rooted in occult rock aesthetics. Zero build tools, zero runtime dependencies — pure static HTML/CSS/JS with a serverless Google Apps Script backend for form handling.

---

## Pages

| Page | Purpose | Key Features |
|---|---|---|
| `index.html` | Landing page | Fullscreen video hero, logo, tagline, CTA links to Music and Shows |
| `band.html` | Biography + Members | Two-column history layout, band group photo, "The Coven" member cards with grayscale hover revealing descriptions and Instagram links |
| `album.html` | Music releases | Bootstrap carousel with release slides (EP, single, comic), streaming platform links, physical format waitlist modal with format checkboxes (cassette, CD, vinyl) |
| `merch.html` | Product catalog | CSS Grid product cards with front/back image hover swap, category filter (All / T-Shirts / Posters), wishlist modal that pre-fills product name into contact form via URL parameter |
| `shows.html` | Live dates + Gallery | Tabbed upcoming/past shows, past show cards with 16:9 thumbnails and hover zoom, photo gallery grid with inset shadow and hover scale |
| `contact.html` | Contact + Newsletter | Newsletter signup section, floating chat bubble popup for direct messages, social media link buttons, URL parameter auto-fill for wishlist inquiries |

---

## Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + Bootstrap 5.3.3 |
| Icons | Bootstrap Icons 1.11.3 |
| Typography | Google Fonts (Cinzel + Inter) |
| Frontend logic | Vanilla JavaScript (ES6) |
| Backend | Google Apps Script (serverless) |
| Database | Google Sheets |
| Hosting | GitHub Pages |
| Version control | Git |

### Structure

No local dependencies. No package manager, bundler, or task runner. All external resources loaded via CDN. Navigation and footer are duplicated across all six HTML files — there is no template or partial system.

```
/
  index.html
  band.html
  album.html
  merch.html
  shows.html
  contact.html
  README.md
  assets/
    css/style.css       (779 lines, single stylesheet)
    js/main.js          (249 lines, single script)
    img/                (band photos, merch product images, show posters, music artwork)
  docs/
    ARCHITECTURE.md     — full technical documentation
    DESIGN.md           — design system specification
    FORMS.md            — form system documentation
    DEPLOY.md           — deployment guide
    ROADMAP.md          — evolution plan and 2026 goals
    Code.gs             — Google Apps Script backend
```

### External Dependencies (CDN)

| Resource | Loaded on |
|---|---|
| Bootstrap CSS 5.3.3 | All pages |
| Bootstrap JS Bundle 5.3.3 | `album.html`, `merch.html` |
| Bootstrap Icons 1.11.3 | `album.html`, `contact.html` |
| Google Fonts (Cinzel + Inter) | All pages |

### JavaScript Loading Strategy

`index.html` and `band.html` load no JavaScript at all — they are purely CSS-driven for optimal landing page performance. The other pages load `main.js` (deferred) only where interactivity is needed.

---

## Data Flow — Form System

The site has no traditional backend. All form submissions (contact, newsletter, merch wishlist, album waitlist) are handled via a Google Apps Script Web App endpoint.

```
User submits form
       |
       v
JavaScript (main.js) intercepts submit (e.preventDefault())
       |
       +-- Creates FormData from all fields
       +-- Disables button, shows "Sending..."
       |
       v
fetch(APPS_SCRIPT_URL, { method: 'POST', body: FormData, mode: 'no-cors' })
       |
       v
Google Apps Script (Code.gs :: doPost)
       |
       +-- Reads form_type: 'contact' | 'newsletter' | 'wishlist'
       +-- Writes row to the corresponding sheet tab
       +-- Returns JSON { result: "success", type: formType }
       |
       v
Frontend (opaque response due to no-cors mode)
       |
       +-- Resets form
       +-- Shows success message
       +-- Re-enables submit button
```

Three sheet tabs are auto-created: **Contacts**, **Newsletter**, **Wishlist**.

### Wishlist URL Parameter System

When a user clicks "Add to Wishlist" on the merch page, they are directed to `contact.html?product=ProductName`. The JavaScript on the contact page reads the URL parameter, pre-fills the subject field with "Wishlist Inquiry: ProductName", and sets focus to the message textarea.

---

## Design System

The visual identity communicates the band's genre through every design decision: absolute black foundations, crimson accent (`#8c304c`), vintage grain texture, ritualistic typography, and image treatments ranging from full grayscale to partial color reveal on interaction.

**Key principles:**
- Dark, atmospheric, immersive — inspired by 70s heavy rock, classic horror cinema, and occult iconography
- Single saturated color (`#8c304c`) used sparingly for blood/sacrifice connotations
- SVG noise overlay (`feTurbulence`) for analog film grain texture at zero HTTP cost
- Square corners on all UI elements — hard edges communicate heaviness
- Ritualistic semantic naming: "The Coven", "Forged Offerings", "Live Rituals", "Join the Ritual"

Full design system specification: [docs/DESIGN.md](docs/DESIGN.md)

---

## Documentation

- [Technical Architecture](docs/ARCHITECTURE.md) — Stack, sitemap, file structure, data flow, CDN dependencies
- [Design System](docs/DESIGN.md) — Color palette, typography, component library, image treatment, effects, layout patterns
- [Form System](docs/FORMS.md) — Frontend + Google Apps Script + Google Sheets schemas, `no-cors` limitations
- [Deployment Guide](docs/DEPLOY.md) — GitHub Pages setup, Apps Script deploy, URL configuration
- [Roadmap](docs/ROADMAP.md) — Evolution plan, community-building goals, 2026 quantitative targets
- [Backend Script](docs/Code.gs) — Google Apps Script source code for serverless form handling

---

## Local Development

This is a static site. No server required — open any `.html` file directly in a modern browser.

**To replace assets:** Add images to `assets/img/` (or the appropriate subdirectory) and update the `src` attributes in the corresponding HTML files.

**To configure the form endpoint:** Update the `APPS_SCRIPT_URL` constant in `assets/js/main.js` (line 6) and the fallback `action` attribute in `contact.html` (line 57) with your deployed Google Apps Script Web App URL.

---

## Notes

- Band member photos, group photos, and merchandise images are original assets. Replacements should preserve the same filenames or update corresponding HTML `src` paths.
- The contact form currently points to an active Google Apps Script endpoint. Verify the endpoint is deployed and accessible before any public launch.
- There is one orphaned file (`assets/img/ 2.png`) not referenced in any HTML page — it can be safely removed.
