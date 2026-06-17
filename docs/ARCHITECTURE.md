# Arquitectura Técnica

## Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Markup | HTML5 | — |
| Estilos | CSS3 + Bootstrap | 5.3.3 |
| Iconos | Bootstrap Icons | 1.11.3 |
| Tipografía | Google Fonts (Cinzel + Inter) | — |
| Frontend | JavaScript (Vanilla ES6) | — |
| Backend | Google Apps Script | — |
| Base de datos | Google Sheets | — |
| Control de versiones | Git + GitHub | — |
| Hosting | GitHub Pages (inferido) | — |

Sin dependencias locales. No requiere npm, pip, webpack ni ningún gestor de paquetes.
Todos los recursos externos se cargan vía CDN.

## Sitemap

```
index.html      → Landing page con video hero fullscreen
band.html       → Biografía + miembros
album.html      → Releases + plataformas + waitlist físico
merch.html      → Catálogo de productos + wishlist modal
shows.html      → Shows (upcoming/past) + galería
contact.html    → Newsletter principal + popup de contacto flotante
```

Todas las páginas comparten navegación y footer idénticos (HTML estático duplicado, sin sistema de partials).

## Estructura de Archivos

```
/
├── index.html
├── band.html
├── album.html
├── merch.html
├── shows.html
├── contact.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css          → 780 líneas, todo el CSS del sitio
│   ├── js/
│   │   └── main.js             → 225 líneas, toda la interactividad
│   └── img/                    → Imágenes, videos, merch, shows
└── docs/
    ├── Code.gs                 → Backend Google Apps Script
    ├── cambios.md              → Plan de mejoras (detallado)
    ├── implementation_plan.md
    └── *.md                    → Documentación técnica y de diseño
```

## Flujo de Datos — Formularios

```
Usuario completa formulario
       │
       ▼
JavaScript (main.js) intercepta submit (e.preventDefault())
       │
       ├── Crea FormData con todos los campos
       ├── Muestra estado "Sending..." en el botón
       │
       ▼
fetch(APPS_SCRIPT_URL, { method: 'POST', body: FormData, mode: 'no-cors' })
       │
       ▼
Google Apps Script (Code.gs :: doPost)
       │
       ├── Lee form_type: 'contact' | 'newsletter' | 'wishlist'
       ├── Escribe fila en la hoja correspondiente del Sheet
       └── Responde { result: "success", type: formType }
       │
       ▼
Frontend (modo no-cors, no lee respuesta)
       │
       ├── Resetea el formulario
       ├── Muestra mensaje de éxito
       └── Habilita botón de submit nuevamente
```

## Archivos Clave

| Archivo | Propósito |
|---|---|
| `index.html` | Landing page con video hero, logo y CTAs a Music / Shows |
| `band.html` | Biografía, historia, cards de miembros con hover e Instagram |
| `album.html` | Carrusel de releases, enlaces a plataformas, modal waitlist con checkboxes de formatos |
| `merch.html` | Grid de productos con filtro (All/T-Shirts/Posters), hover front/back, modal wishlist |
| `shows.html` | Tabs Upcoming/Past, cards de shows pasados con miniatura, galería de fotos |
| `contact.html` | Newsletter como contenido principal, popup flotante tipo chat para contacto directo |
| `style.css` | Sistema de diseño completo: tema oscuro, tipografía, componentes, animaciones |
| `main.js` | Lógica de formularios, filtro de merch, tabs de shows, popup de contacto |
| `docs/Code.gs` | Backend serverless: recibe POST y escribe en Google Sheets |

## Dependencias Externas (CDN)

| Recurso | Cargado en |
|---|---|
| Bootstrap CSS `5.3.3` | Todas las páginas |
| Bootstrap JS Bundle `5.3.3` | album.html, merch.html |
| Bootstrap Icons `1.11.3` | album.html, contact.html |
| Google Fonts (Cinzel + Inter) | Todas las páginas |
