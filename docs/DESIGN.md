# Sistema de Diseño

## Filosofía Visual

Estética oscura, atmosférica e inmersiva inspirada en el heavy rock de los 70, el cine de terror clásico y la iconografía ocultista. Cada elemento visual está diseñado para reforzar la identidad sónica de la banda: lenta, pesada, hipnótica.

## Paleta de Colores

| Color | HEX | Uso |
|---|---|---|
| Negro absoluto | `#000000` | Fondo del body |
| Negro profundo | `#080808` | Fondos de secciones claras |
| Carbón | `#0d0d0d` | Cards, modales, fondos de componentes |
| Gris oscuro | `#151515` | Gradiente base de `section-dark` |
| Borde | `#1a1a1a` | Bordes de cards, inputs, modales |
| Borde input | `#333333` | Bordes de inputs |
| Carmesí | `#8c304c` | Acento principal: botones, hover, enlaces, detalles |
| Carmesí hover | `#a83a5a` | Hover de botones y elementos interactivos |
| Texto principal | `#e2e2e2` | Color base del texto |
| Texto secundario | `#888` / `#aaa` | Metadatos, placeholders, texto muted |

## Tipografía

| Uso | Fuente | Peso | Transformación |
|---|---|---|---|
| Headings (h1-h3) | **Cinzel** (serif) | 400, 600 | Uppercase, letter-spacing 2px |
| Body text | **Inter** (sans-serif) | 300, 400 | — |
| Fechas en shows | **Cinzel** | 400 | Uppercase, letter-spacing 0.1em |
| Navegación | **Cinzel** | — | Uppercase |

Cargadas desde Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400&display=swap" rel="stylesheet">
```

## Componentes

### Botones (`.btn`)

```css
.btn {
  background: transparent;
  border: 1px solid #8c304c;
  color: #e2e2e2;
  letter-spacing: 1px;
  padding: 12px 26px;
  border-radius: 0;
  transition: background-color 0.3s, color 0.3s;
}
.btn:hover {
  background: #8c304c;
  color: #fff;
}
```

Botones cuadrados (sin border-radius), contorno carmesí que se rellena en hover.

### Formularios (`.form-control`)

```css
.form-control {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #e2e2e2;
}
.form-control:focus {
  border-color: #8c304c;
  box-shadow: 0 0 0 0.25rem rgba(140, 48, 76, 0.25);
}
```

Inputs oscuros con borde carmesí al enfocar.

### Modal

```css
.modal-content { background: #0d0d0d; border: 1px solid #333; }
.modal-header  { background: #0d0d0d; border-bottom: 1px solid #1a1a1a; }
.modal-body    { background: #0d0d0d; }
```

Modales Bootstrap completamente oscuros, botón de cerrar con clase `btn-close-white`.

### Checkboxes (`.form-check-input`)

```css
.form-check-input { background: #1a1a1a; border: 1px solid #333; }
.form-check-input:checked { background: #8c304c; border-color: #8c304c; }
```

### Navegación

```css
nav {
  position: absolute;
  top: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
}
```

Sobrepuesta al hero, transparente hacia abajo. Logo a la izquierda, enlaces a la derecha.

### Hero (index.html)

Video fullscreen con overlay semitransparente, logo centrado, tagline y botones CTA.

```css
.hero-cover { min-height: 100vh; position: relative; overflow: hidden; }
.hero-video { position: absolute; inset: 0; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
```

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

Imagen de la banda como fondo con overlay oscuro, versión compacta del hero principal.

### Cards de Past Shows

Cards con imagen 16:9, borde sutil, hover con borde carmesí y zoom en imagen.

```css
.past-show-card { background: #0d0d0d; border: 1px solid #1a1a1a; }
.past-show-card:hover { border-color: #8c304c; }
.past-show-img { aspect-ratio: 16/9; overflow: hidden; }
.past-show-card:hover .past-show-img img { transform: scale(1.05); }
```

### Chat Bubble (contacto flotante)

Botón circular fijo en esquina inferior derecha, con popup que se desliza hacia arriba.

```css
.chat-bubble {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  width: 56px; height: 56px; border-radius: 50%;
  background: #8c304c; color: #fff;
  box-shadow: 0 4px 20px rgba(140,48,76,0.4);
}
.contact-popup {
  position: fixed; bottom: 5rem; right: 1.5rem;
  width: 340px; max-height: 480px;
  background: #0d0d0d; border: 1px solid #333; border-radius: 12px;
}
```

### Gallery (shows.html)

Grid de imágenes cuadradas con efecto de zoom en hover y overlay interior oscuro.

```css
.gallery-img-wrapper {
  width: 100%; padding-bottom: 100%;
  overflow: hidden; border: 1px solid #1a1a1a;
  box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.7);
}
.gallery-img-wrapper img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.3s;
}
.gallery-img-wrapper img:hover { transform: scale(1.05); }
```

## Efectos Globales

### Textura de Grano

```css
body::after {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* ruido SVG */
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

Capa de ruido visual sobre toda la página para texturizar el fondo negro.

### Filtros en Imágenes (`.platform-image`)

```css
.platform-image {
  filter: grayscale(0.5) contrast(1.1);
  box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.7);
}
```

Imágenes con 50% de saturación reducida y contraste aumentado, consistente en todo el sitio.

### Hover en Cards de Miembros (band.html)

Al pasar el cursor, aparecen descripciones de cada miembro, imagen pierde escala de grises.

## Layout por Página

| Página | Layout principal |
|---|---|
| index.html | Hero fullscreen + CTAs centrados |
| band.html | Intro texto 2 columnas + grid de 4 miembros 2×2 |
| album.html | Carrusel full-width + Listen 2 columnas + Physical Formats 2 columnas |
| merch.html | Filter bar + grid 3 columnas responsive |
| shows.html | Tabs + upcoming 2 columnas + past cards 3 columnas + gallery 3 columnas |
| contact.html | Hero background + newsletter centrado + social icons |

## Responsividad

- Bootstrap 5.3.3 grid system
- `col-md-6`, `col-lg-4`, etc. para adaptar columnas
- Breakpoints estándar Bootstrap: sm (576px), md (768px), lg (992px), xl (1200px)
- Navegación: flexbox, wrap en pantallas pequeñas
- Imágenes: `img-fluid` para escalado responsivo
