# Under The Legacy - Sitio Web Oficial

> Un sitio web promocional estático para la banda de heavy psych / stoner doom, Under The Legacy.

Este proyecto es un sitio web de múltiples páginas, totalmente responsivo, diseñado para servir como la presencia digital oficial de la banda. Está construido con un enfoque en una fuerte identidad visual que refleja la estética oscura y de "occult rock" de la banda.

## ✨ Características

*   **Página de Inicio:** Una página de aterrizaje con imagen de héroe a pantalla completa, navegación principal y llamadas a la acción.
*   **Página de la Banda:** Una página biográfica completa que incluye:
    *   La historia de origen de la banda y su identidad artística en un diseño de dos columnas.
    *   Una foto grupal visualmente estilizada.
    *   Una cuadrícula responsiva de perfiles de miembros con descripciones que aparecen al pasar el cursor y enlaces a cuentas individuales de Instagram.
*   **Página de Merch:** Una galería estilo e-commerce funcional para conceptos de mercancía.
    *   Cuenta con un filtro interactivo para diferentes categorías de productos (Camisetas, Pósters), impulsado por JavaScript puro.
    *   Incluye un efecto hover de dos imágenes para cada producto (ej. vista frontal/trasera).
    *   Un sistema de "lista de deseos" que dirige a los fans interesados al correo de contacto de la banda para medir el interés antes de la producción.
*   **Páginas de Música, Shows y Contacto:** Páginas dedicadas con información sobre lanzamientos, presentaciones en vivo y detalles de contacto.

### Funcionalidad de Formularios y Lista de Deseos

El sitio cuenta con un sistema de contacto dinámico integrado con Google Apps Script.

1.  **Formulario de Contacto:**
    *   El formulario en `contact.html` envía datos mediante una petición POST a un **Google Apps Script Web App**.
    *   Esto permite recibir mensajes directamente en una hoja de cálculo o correo electrónico sin necesidad de un servidor backend tradicional (PHP, Node.js, etc.).
    *   El script maneja la validación y el envío, y el frontend muestra mensajes de éxito o error sin recargar la página gracias a `fetch()`.

2.  **Lista de Deseos (Wishlist):**
    *   En la página de **Merch**, cada producto tiene un botón de "Add to Wishlist".
    *   Este botón es un enlace a la página de contacto que incluye un parámetro URL: `contact.html?product=NombreDelProducto`.
    *   **Lógica en JavaScript (`main.js`):** Al cargar la página de contacto, el script detecta este parámetro. Si existe:
        *   Pre-rellena el campo "Asunto" (Subject) del formulario con el texto: `Wishlist Inquiry: NombreDelProducto`.
        *   Automáticamente pone el foco en el campo de "Mensaje" para que el usuario pueda escribir inmediatamente.

## 🛠️ Tecnologías Usadas

*   **HTML5**
*   **CSS3**
*   **Bootstrap 5:** Para la base del diseño responsivo y la cuadrícula.
*   **Vanilla JavaScript:** Para el filtro de mercancía y la lógica del formulario/parámetros URL.
*   **Google Fonts:** Para tipografía personalizada (`Cinzel` & `Inter`).

## 🚀 Cómo Ver el Sitio

Este es un sitio web estático. Para verlo, simplemente abre cualquiera de los archivos `.html` (por ejemplo, `index.html`) en un navegador web moderno. No se requiere servidor.

## 🎨 Diseño y Estética

El diseño es intencionalmente oscuro y atmosférico, inspirándose en el rock pesado de los 70, el cine de terror clásico y temas ocultistas. La paleta de colores, la tipografía y las imágenes trabajan juntas para crear una experiencia inmersiva que coincide con el sonido de la banda.

## 📝 Notas

*   Las imágenes para los miembros de la banda, la foto grupal y los artículos de mercancía son propias de la banda. Para reemplazarlos, agrega tus imágenes reales al directorio `assets/img/` y actualiza las rutas en los archivos `.html` correspondientes.
*   La funcionalidad de contacto actualmente apunta a un script de Google Apps (`script.google.com`). Asegúrate de que el endpoint esté activo y configurado correctamente para recibir los envíos.
