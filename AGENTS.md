# AGENTS.md — Under the Legacy

## Stack

Zero-build static site. No package.json, no bundler, no runtime deps. All external resources via CDN.

- CSS: Bootstrap 5.3.3 + single `assets/css/style.css` (1345 lines)
- JS: `assets/js/main.js` (288 lines, deferred on most pages)
- Fonts: Cinzel (headings, uppercase, 2px letter-spacing) + Inter (body, weight 300)
- Color accent: `#8c304c` (crimson)
- Backend: Google Apps Script endpoint, `mode: 'no-cors'` — responses are opaque, success shown optimistically

## Pages

7 pages, each with EN/ES pair (`page.html` + `page.es.html`):

| Page | Purpose |
|------|---------|
| `index` | Video hero + CTAs |
| `band` | Bio + member cards |
| `album` | Vinyl hero + tracklist + platform icons + physical format waitlist |
| `merch` | Product grid with front/back image hover + wishlist modal |
| `shows` | Tabbed upcoming/past shows + video gallery + photo gallery |
| `contact` | Newsletter + floating chat popup |
| `news` | News/updates |

Language switcher in nav: flag emojis (🇬🇧/🇨🇴), `.lang-active` class on active flag.

## Images

- All merchandising images use **WebP** format (`product-image-primary` front + `product-image-secondary` back)
- **No `<picture>` wrappers** — direct `<img>` tags only (CSS selectors expect direct children)
- **No `width`/`height`** on images where CSS controls layout (e.g. `.logo img` height is CSS-set)
- Use `loading="lazy"` below the fold
- JPG/PNG → WebP: use `convert -quality 85 input.jpg output.webp`

## Merch Product Pattern

```html
<div class="product-card" data-category="t-shirt">
  <div class="product-image-container">
    <img src="..." class="product-image product-image-primary" width="800" height="800" loading="lazy">
    <img src="..." class="product-image product-image-secondary" width="800" height="800" loading="lazy">
  </div>
  <h3 class="product-title">Name</h3>
  <p class="product-desc">Description</p>
  <button class="btn btn-sm wishlist-trigger" data-bs-toggle="modal" data-bs-target="#wishlistModal"
    data-product="Name">Add to Wishlist</button>
</div>
```

Add new products at the end of the grid (before Poster 2 comment). Duplicate in `merch.es.html`.

## Forms

All forms submit via JS to `APPS_SCRIPT_URL` in `main.js:16`. The `submitForm()` helper:
- Disables button → shows `i18n.sending` → `fetch(mode:'no-cors')` → resets → shows success

Wishlist flow: merch `data-product` → contact form pre-fills subject via `?product=` URL param.

## JS Notes

- `index.html` and `band.html` load NO JavaScript (pure CSS landing pages)
- i18n: `document.documentElement.lang === 'es'` switches 5 JS strings (sending, error, noFormat, wishlistInquiry, wishlistTitle)
- Video modal: creates `bootstrap.Modal()` instance programmatically (not data API)
- `.btn-close-white` modals need manual reset on `hidden.bs.modal`

## CSS Conventions

- All styles in one file (alphabetical by page section)
- `.section-dark` uses `radial-gradient(circle at top, #151515, #050505)`
- Vintage grain via SVG `feTurbulence` overlay on `body::after`
- Image vintage filter: `filter: grayscale(0.85) sepia(0.25) contrast(1.15) brightness(0.85)`
- On hover, cards get crimson border (`#8c304c`) and color restore

## Key Quirks

- **Nav/footer are duplicated** across all 14 HTML files — editing nav means editing every file
- **`no-cors` mode** means fetch always resolves (no actual error handling for network failures)
- Member photos use `.member-photo-container` with absolute-positioned `.member-description` overlay
- Always add products to BOTH `merch.html` AND `merch.es.html`
- Albums/track names stay in English on both EN and ES pages
