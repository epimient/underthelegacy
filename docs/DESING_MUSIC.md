# design.md

# Vinylist UI Design System

## Descripción General

Interfaz de reproductor musical inspirada en un tocadiscos de vinilo.

El diseño combina:

* Minimalismo moderno
* Estética editorial
* Skeuomorfismo ligero
* Alto contraste
* Enfoque visual centrado en el álbum físico

El disco de vinilo funciona como el elemento principal de la composición y conecta visualmente las dos zonas funcionales de la interfaz.

---

# Layout General

## Estructura

La pantalla está dividida en dos áreas principales:

### Panel Izquierdo (40%)

Color:

* Negro profundo
* Azul oscuro muy oscuro

Función:

* Biblioteca musical
* Lista de reproducción
* Información del artista

### Panel Derecho (60%)

Color:

* Beige claro / marfil

Función:

* Información del álbum
* Controles
* Detalles de reproducción

### Elemento Central

Un vinilo gigante superpuesto entre ambos paneles.

Características:

* Rompe la cuadrícula tradicional
* Genera profundidad
* Funciona como punto focal
* Une visualmente ambas secciones

---

# Sistema de Grid

## Desktop

Grid principal:

* 12 columnas
* Contenedor centrado
* Margen amplio exterior

Distribución:

| Zona                | Ancho      |
| ------------------- | ---------- |
| Sidebar Musical     | 4 columnas |
| Contenido Principal | 8 columnas |

---

# Paleta de Colores

## Dark Side

Background Principal:

#05080D

Panel Oscuro:

#0B1017

Texto Principal:

#FFFFFF

Texto Secundario:

#8A919B

Rojo de acento:

#D62828

---

## Light Side

Background:

#ECE5D5

Texto Principal:

#111111

Texto Secundario:

#707070

Botones:

#FFFFFF

Bordes:

#D6D0C4

---

# Tipografía

Estilo recomendado:

* Inter
* Manrope
* SF Pro Display

Jerarquía:

### Título Principal

Peso:
700

Tamaño:
48px - 72px

Ejemplo:
"Adele"

---

### Títulos Secundarios

Peso:
600

Tamaño:
20px - 24px

---

### Texto Normal

Peso:
400

Tamaño:
14px - 16px

---

### Metadatos

Peso:
300

Tamaño:
12px

Color:
Texto secundario

---

# Componente: Vinilo

## Propósito

Elemento visual principal.

## Características

Tamaño:

400px - 500px

Forma:

Circular perfecta

Detalles:

* Varias capas radiales
* Brillos suaves
* Reflejos especulares
* Etiqueta central personalizada

Sombra:

box-shadow:
0 20px 50px rgba(0,0,0,0.4)

---

# Componente: Playlist

Ubicación:

Panel izquierdo

## Estructura

Fila:

* Número de pista
* Portada miniatura
* Título
* Duración

## Estado Activo

Background:

rgba(255,255,255,0.08)

Indicador:

Barra roja lateral

Hover:

rgba(255,255,255,0.05)

---

# Componente: Album Card

Ubicación:

Panel derecho

Contiene:

* Portada principal
* Portadas relacionadas
* Información del álbum

Layout:

Horizontal

---

# Botones

## Primary Button

Forma:

Pill

Border Radius:

999px

Altura:

40px

Color:

Blanco

Texto:

Negro

---

## Secondary Button

Fondo:

Transparente

Borde:

Ninguno

Texto:

Negro

---

# Barra Inferior

Visualización de audio.

Tipo:

Waveform Analyzer

Características:

* Barras verticales
* Rojo como color de actividad
* Fondo oscuro

Altura:

60px

---

# Profundidad Visual

Uso intensivo de:

* Superposición de capas
* Elementos fuera del grid
* Sombras suaves
* Contraste entre fondos

Evitar:

* Bordes duros
* Gradientes agresivos
* Saturación excesiva

---

# Responsive Design

## Mobile

Transformaciones:

* Vinilo reducido al 40%
* Playlist colapsable
* Información del álbum debajo del vinilo

Orden:

1. Vinilo
2. Álbum
3. Controles
4. Playlist

---

## Tablet

Dos columnas:

* Playlist
* Información del álbum

Vinilo centrado entre ambas.

---

# Animaciones

## Rotación del Vinilo

Duración:

8s - 15s

Timing:

linear

Estado:

solo durante reproducción

---

## Hover Playlist

Duración:

200ms

Transform:

translateX(4px)

---

## Botones

Duración:

150ms

Transform:

scale(1.03)

---

# UX Principles

* El álbum es el protagonista.
* La música debe sentirse física.
* Alto contraste para mejorar legibilidad.
* Navegación mínima.
* Interacciones suaves y elegantes.
* Priorizar emoción visual sobre densidad de información.
