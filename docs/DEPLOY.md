# Guía de Despliegue

## Despliegue del Sitio Web

### Opción 1: GitHub Pages

1. Subir el repositorio a GitHub
2. Ir a Settings → Pages
3. Seleccionar `main` branch como fuente, carpeta `/ (root)`
4. El sitio queda disponible en `https://[usuario].github.io/underthelegacy/`

Si tienes un dominio personalizado, agrega un archivo `CNAME` con tu dominio y configúralo en GitHub Pages.

### Opción 2: Servidor estático (alternativa)

El sitio es 100% estático. Puedes copiar todos los archivos a cualquier servidor web (Apache, Nginx, Netlify, Vercel, etc.) sin configuración adicional.

## Despliegue de Apps Script

### Requisitos

- Una cuenta de Google
- El Google Sheet donde quieres recibir los datos

### Pasos

1. Ve a [sheets.new](https://sheets.new) y crea un nuevo Sheet
2. Ponle nombre, ej: "Under The Legacy — Forms"
3. Extensiones → Apps Script
4. Borra el código por defecto
5. Copia todo el contenido de `docs/Code.gs` y pégalo
6. Guarda (Ctrl + S) con nombre ej: "FormHandler"
7. Implementar → Nueva implementación
   - Tipo: Aplicación web
   - Ejecutar como: Tu cuenta
   - Quién tiene acceso: Cualquiera
8. Implementar → Autorizar → Copiar URL

### Actualizar URL en el Sitio

La URL del deploy debe actualizarse en 2 lugares:

| Archivo | Línea | Contenido |
|---|---|---|
| `assets/js/main.js` | 6 | `const APPS_SCRIPT_URL = '...'` |
| `contact.html` | 57 | `action="..."` (fallback, no esencial) |

## Verificación

Después de desplegar:

1. Abrir cada página en el navegador
2. Enviar un formulario de prueba
3. Revisar el Google Sheet — debería aparecer una nueva fila con los datos

## Mantenimiento

- Si el Sheet se llena, los datos no se pierden. Apps Script seguirá agregando filas.
- Si cambias de Sheet, solo necesitas vincular el nuevo Sheet en el editor de Apps Script (o cambiar `SpreadsheetApp.getActiveSpreadsheet()` por `SpreadsheetApp.openById('ID_DEL_NUEVO_SHEET')`).
