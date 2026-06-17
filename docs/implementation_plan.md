
Archivos a Modificar
1. Apps Script (Code.gs) — [NUEVO]
Script que recibe form_type y enruta a la hoja correcta
El usuario debe desplegarlo en script.google.com
2. 
merch.html
Agregar modal Bootstrap con formulario wishlist (name, email, phone, product oculto, message)
Botones "Add to Wishlist" → abren modal y pre-rellenan product
Agregar <script> de Bootstrap JS + 
main.js
3. 
contact.html
Agregar campo phone al formulario de contacto
Agregar form_type=contact oculto
Reemplazar sección mailto: con formulario de newsletter (name, email, phone)
4. 
album.html
Reemplazar botón "Join the Ritual" con formulario inline compacto (name, email, phone)
form_type=wishlist, product=Physical Formats Waiting List ocultos
5. 
shows.html
Implementar tabs Upcoming/Past con botones .filter-btn
Restructurar shows en cards dentro de contenedores filtrables
Mantener galería de fotos debajo
6. 
main.js
Función reutilizable submitForm() para AJAX
Lógica del modal wishlist (pre-rellenar product)
Lógica de tabs para Shows
Aplicar a todos los formularios del sitio
7. 
style.css
Estilos modal wishlist (dark theme)
Estilos formulario newsletter inline
Estilos formulario compacto album
Estilos show cards (upcoming + past)
Estados de loading y mensajes de éxito
Verificación
Abrir cada página y verificar render visual
Probar envío de cada formulario (loading → éxito → reset)
Probar tabs en Shows (filtrado correcto)
Probar modal wishlist desde merch (pre-rellena producto)
Integración real: usuario despliega Apps Script y prueba que datos llegan al Sheet