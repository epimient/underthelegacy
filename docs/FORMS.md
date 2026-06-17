# Sistema de Formularios

El sitio cuenta con **3 tipos de formulario** que envían datos a un Google Sheet mediante Google Apps Script.

## Tipos de Formulario

| Formulario | form_type | Página | Hoja en Sheet |
|---|---|---|---|
| Contacto directo | `contact` | contact.html (popup flotante) | **Contacts** |
| Newsletter | `newsletter` | contact.html (contenido principal) | **Newsletter** |
| Wishlist / Waitlist | `wishlist` | merch.html (modal) + album.html (modal) | **Wishlist** |

## Frontend (`assets/js/main.js`)

### Función `submitForm(form, successCallback)`

Función reutilizable que maneja todos los envíos:

```js
function submitForm(form, successCallback) {
  const data = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  // 1. Deshabilita botón y muestra "Sending..."
  // 2. fetch POST a APPS_SCRIPT_URL con mode: 'no-cors'
  // 3. En éxito: resetea form, ejecuta callback, habilita botón
  // 4. En error: console.error + alert()
}
```

### Handlers específicos

| Formulario | ID | Handler |
|---|---|---|
| Contacto | `#contactForm` | Submit → oculta form, muestra `#formSuccess` |
| Newsletter | `#newsletterForm` | Submit → oculta form, muestra `#newsletterSuccess` |
| Waitlist álbum | `#waitlistForm` | Submit → concatena checkboxes en `#waitlistProduct`, envía, muestra `#waitlistSuccess` |
| Wishlist merch | `#wishlistForm` | Submit → envía, oculta form, muestra `#wishlistSuccess` |

### Lógica extra

- **Modal waitlist álbum**: Antes de enviar, lee los checkboxes marcados (Cassette, CD, Black Vinyl, Red Vinyl) y los concatena en el campo oculto `product`. Al cerrar el modal, resetea el formulario.
- **Modal wishlist merch**: Al abrir, pre-rellena `#wishlistProduct` con el `data-product` del botón clickeado. Al cerrar, resetea el formulario.
- **Popup contacto**: Botón flotante toggle. Clic fuera cierra el popup.

## Backend (`docs/Code.gs`)

### Función `doPost(e)`

```js
function doPost(e) {
  const formType = e.parameter.form_type;
  switch (formType) {
    case 'wishlist':  // → Hoja "Wishlist"
    case 'newsletter': // → Hoja "Newsletter"
    default:           // → Hoja "Contacts"
  }
  targetSheet.appendRow(rowData);
  return ContentService.createTextOutput(
    JSON.stringify({ result: 'success', type: formType })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Función `getOrCreateSheet(spreadsheet, sheetName, headers)`

Crea la hoja si no existe, con headers en negrita. Reutilizable para los 3 casos.

### Manejo de Errores

Try/catch en `doPost`. En caso de error responde `{ result: "error", message: "..." }`.

## Google Sheets — Schema

El script se vincula a **1 solo Google Sheet** con 3 hojas (tabs) que se crean automáticamente.

### Hoja: Contacts

| Columna | Campo del Formulario |
|---|---|
| Timestamp | `new Date()` (autogenerado) |
| Name | `name` |
| Email | `email` |
| Phone | `phone` |
| Subject | `subject` |
| Message | `message` |

### Hoja: Newsletter

| Columna | Campo del Formulario |
|---|---|
| Timestamp | `new Date()` |
| Name | `name` |
| Email | `email` |
| Phone | `phone` |

### Hoja: Wishlist

| Columna | Campo del Formulario |
|---|---|
| Timestamp | `new Date()` |
| Name | `name` |
| Email | `email` |
| Phone | `phone` |
| Product | `product` (nombre del producto o formatos concatenados) |
| Message | `message` |

## Despliegue de Apps Script

1. Abrir el Google Sheet destino
2. Extensiones → Apps Script
3. Pegar `docs/Code.gs`
4. Guardar e Implementar → Nueva implementación → Aplicación web
   - Ejecutar como: tu cuenta
   - Quién tiene acceso: Cualquiera
5. Copiar URL del deploy
6. Actualizar en `assets/js/main.js` línea 6 (`APPS_SCRIPT_URL`)
7. Actualizar en `contact.html` línea 57 (atributo `action` del form, como fallback)

## Notas Técnicas

- `mode: 'no-cors'` en fetch: el frontend no puede leer la respuesta del servidor. Siempre muestra éxito aunque el servidor falle. La validación real se hace revisando el Sheet.
- Los formularios sin `action` attribute usan JavaScript para enviar. Los que tienen `action` funcionan como fallback si JS falla.
- El campo `product` en el modal del álbum se construye dinámicamente concatenando checkboxes seleccionados.
