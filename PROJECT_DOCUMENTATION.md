# FABIPETS.COM — Documentación Completa del Proyecto

> Sitio web de moda para mascotas — Landing page moderna con animaciones avanzadas

---

## Tabla de Contenidos

1. [Resumen del Proyecto](#1-resumen-del-proyecto)
2. [Tecnologías y Stack](#2-tecnologías-y-stack)
3. [Estructura de Directorios](#3-estructura-de-directorios)
4. [Arquitectura de la Aplicación](#4-arquitectura-de-la-aplicación)
5. [Secciones de la Página](#5-secciones-de-la-página)
6. [Configuración Central](#6-configuración-central)
7. [Estilos y Sistema de Diseño](#7-estilos-y-sistema-de-diseño)
8. [Animaciones y Efectos](#8-animaciones-y-efectos)
9. [Formularios](#9-formularios)
10. [Componentes Utilitarios](#10-componentes-utilitarios)
11. [Archivos de Configuración](#11-archivos-de-configuración)
12. [Scripts Disponibles](#12-scripts-disponibles)
13. [Imágenes y Assets](#13-imágenes-y-assets)
14. [Variables de Entorno](#14-variables-de-entorno)
15. [Dependencias](#15-dependencias)
16. [Consideraciones de Producción](#16-consideraciones-de-producción)
17. [Estado Actual y Pendientes](#17-estado-actual-y-pendientes)

---

## 1. Resumen del Proyecto

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | Fabipets |
| **Dominio** | fabipets.com |
| **Tipo** | SPA — Single Page Application (Landing Page) |
| **Propósito** | Tienda/showroom de ropa de diseñador para mascotas |
| **Idioma** | Inglés |
| **Hosting** | Estático (Vercel, Netlify o GitHub Pages) |
| **Líneas de código** | ~4,500+ líneas (sin node_modules) |

**Descripción:**
Fabipets es una landing page moderna y animada para una marca de moda para mascotas. Presenta colecciones de ropa, diseños personalizados, guía de tallas, testimonios y un lookbook fotográfico. El diseño usa una paleta blush/camel con animaciones avanzadas de GSAP y smooth scroll.

---

## 2. Tecnologías y Stack

### Core
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 19.2.0 | Librería UI principal |
| **TypeScript** | ~5.9.3 | Tipado estático |
| **Vite** | 7.2.4 | Build tool y dev server |

### Estilos
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Tailwind CSS** | 3.4.19 | Framework utility-first |
| **PostCSS** | 8.5.6 | Procesador CSS |
| **Autoprefixer** | 10.4.23 | Compatibilidad de navegadores |
| **tailwindcss-animate** | 1.0.7 | Animaciones Tailwind |

### Animaciones
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **GSAP** | 3.14.2 | Animaciones avanzadas + ScrollTrigger |
| **Lenis** | 1.0.42 (Studio Freight) | Smooth scroll |

### UI y Componentes
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Radix UI** | múltiples | Primitivos accesibles |
| **shadcn/ui** | — | Componentes React sobre Radix UI |
| **Lucide React** | 0.562.0 | Iconos SVG |
| **Embla Carousel React** | 8.6.0 | Carruseles accesibles |
| **Recharts** | 2.15.4 | Gráficos (incluido, sin uso activo) |

### Formularios y Validación
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React Hook Form** | 7.70.0 | Gestión de formularios |
| **@hookform/resolvers** | 5.2.2 | Resolvedores de validación |
| **Zod** | 4.3.5 | Validación de esquemas TypeScript |

### Utilidades
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **clsx** | 2.1.1 | Clases condicionales |
| **tailwind-merge** | 3.4.0 | Merge de clases Tailwind |
| **class-variance-authority** | 0.7.1 | Variantes type-safe |
| **date-fns** | 4.1.0 | Manipulación de fechas |
| **next-themes** | 0.4.6 | Tema oscuro/claro |
| **sonner** | 2.0.7 | Notificaciones toast |
| **vaul** | 1.1.2 | Drawer/modal primitivo |
| **cmdk** | 1.1.1 | Paleta de comandos |
| **input-otp** | 1.4.2 | Input OTP accesible |
| **react-day-picker** | 9.13.0 | Selector de fechas |
| **react-resizable-panels** | 4.2.2 | Paneles redimensionables |

---

## 3. Estructura de Directorios

```
fabipets.com/
└── app/
    ├── public/
    │   └── images/                     # Imágenes estáticas del sitio
    │       ├── collection_accessories.jpg
    │       ├── collection_costume.jpg
    │       ├── collection_dress.jpg
    │       ├── collection_shirt.jpg
    │       ├── contact_main.jpg
    │       ├── contact_small_01.jpg
    │       ├── contact_small_02.jpg
    │       ├── craft_detail.jpg
    │       ├── craft_main.jpg
    │       ├── custom_fit_detail.jpg
    │       ├── custom_fit_main.jpg
    │       ├── featured_suit_detail.jpg
    │       ├── featured_suit_main.jpg
    │       ├── hero_cat_pink.jpg
    │       ├── hero_dog_bow.jpg
    │       ├── hero_dog_costume.jpg
    │       ├── hero_dog_flowers.jpg
    │       ├── hero_dog_sunglasses.jpg
    │       ├── hero_paws_closeup.jpg
    │       ├── lookbook_01.jpg ... lookbook_05.jpg
    │       ├── size_guide_photo.jpg
    │       ├── testimonial_main.jpg
    │       └── testimonial_small.jpg
    ├── dist/                           # Build compilado (generado por `npm run build`)
    ├── src/
    │   ├── main.tsx                    # Punto de entrada React
    │   ├── App.tsx                     # Componente raíz con layout de scroll
    │   ├── App.css                     # Estilos específicos del App
    │   ├── index.css                   # Estilos globales, tipografía, clases utilitarias
    │   ├── config.ts                   # Configuración central del sitio (interfaces + constantes)
    │   ├── components/
    │   │   ├── Navigation.tsx          # Navbar fija con menú mobile
    │   │   ├── CustomCursor.tsx        # Cursor personalizado con GSAP
    │   │   ├── WhatsAppButton.tsx      # Botón flotante WhatsApp
    │   │   └── ui/                     # Componentes shadcn/ui (50+ archivos)
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       ├── form.tsx
    │   │       ├── input.tsx
    │   │       ├── dialog.tsx
    │   │       └── [...más componentes UI]
    │   ├── sections/                   # Secciones de la landing page
    │   │   ├── Hero.tsx                # Hero con collage de imágenes
    │   │   ├── FeaturedOutfit.tsx      # Producto destacado
    │   │   ├── CollectionGrid.tsx      # Grid de 4 colecciones
    │   │   ├── CustomDesign.tsx        # Formulario diseño personalizado
    │   │   ├── SizeGuide.tsx           # Guía de tallas
    │   │   ├── Testimonials.tsx        # Testimonios
    │   │   ├── Lookbook.tsx            # Galería masonry
    │   │   ├── CraftCare.tsx           # Valores y cuidado
    │   │   ├── Contact.tsx             # Contacto + footer
    │   │   ├── ProductShowcase.tsx     # Basado en config (actualmente vacío)
    │   │   ├── ColorPalette.tsx        # Basado en config (actualmente vacío)
    │   │   └── Finale.tsx              # Basado en config (config vacía)
    │   ├── hooks/
    │   │   └── use-mobile.ts           # Hook para detectar dispositivos móviles
    │   └── lib/
    │       └── utils.ts                # Utilidad cn() para merge de clases Tailwind
    ├── index.html                      # HTML principal
    ├── vite.config.ts                  # Configuración Vite
    ├── tailwind.config.js              # Tema Tailwind personalizado
    ├── postcss.config.js               # PostCSS
    ├── tsconfig.json                   # TypeScript raíz
    ├── tsconfig.app.json               # TypeScript para la app
    ├── tsconfig.node.json              # TypeScript para Node
    ├── eslint.config.js                # ESLint
    ├── components.json                 # Configuración shadcn/ui
    ├── package.json                    # Dependencias y scripts
    └── info.md                         # Documentación del template original
```

---

## 4. Arquitectura de la Aplicación

### Árbol de Componentes

```
App.tsx
├── <Navigation />           — Header fijo con scroll detection
├── <main>
│   ├── <Hero />             — Sección hero (id="hero")
│   ├── <FeaturedOutfit />   — Producto destacado (id="collection")
│   ├── <CollectionGrid />   — 4 colecciones
│   ├── <CustomDesign />     — Formulario personalización (id="custom")
│   ├── <SizeGuide />        — Guía de tallas
│   ├── <Testimonials />     — Testimonios
│   ├── <Lookbook />         — Galería (id="lookbook")
│   ├── <CraftCare />        — Valores
│   └── <Contact />          — Contacto + footer (id="contact")
├── <WhatsAppButton />        — Botón flotante fijo
├── <CustomCursor />          — Cursor personalizado (solo desktop)
└── .grain-overlay            — Capa de textura fija
```

### Flujo de datos
- No hay backend ni estado global (Redux, Zustand, etc.)
- Los datos de contenido están definidos como constantes en `src/config.ts`
- Los formularios usan estado local de React (`useState`)
- Sin persistencia: los datos del formulario se pierden al recargar

### IDs de navegación
| ID | Sección |
|----|---------|
| `#hero` | Hero |
| `#collection` | FeaturedOutfit + CollectionGrid |
| `#custom` | CustomDesign |
| `#lookbook` | Lookbook |
| `#contact` | Contact |

---

## 5. Secciones de la Página

### Hero (`src/sections/Hero.tsx` — 317 líneas)
- **Layout:** Collage de 6 imágenes en tarjetas redondeadas flotantes
- **Contenido:** Título, subtítulo, CTA "Explore the collection"
- **Animaciones:** Staggered entrance, parallax on scroll, fade out al salir
- **Imágenes:** hero_cat_pink, hero_dog_bow, hero_dog_costume, hero_dog_flowers, hero_dog_sunglasses, hero_paws_closeup

### FeaturedOutfit (`src/sections/FeaturedOutfit.tsx` — 197 líneas)
- **Layout:** Grid 12 columnas — imagen grande izquierda (6 cols), fotos pequeñas derechas (3 cols), panel texto (3 cols)
- **Contenido:** Producto destacado con precio y CTA a WhatsApp
- **Detalle:** Stamp animado "NEW"
- **Imágenes:** featured_suit_main, featured_suit_detail

### CollectionGrid (`src/sections/CollectionGrid.tsx` — 266 líneas)
- **Layout:** Grid 2×2 + banner full-width
- **Categorías:** Dresses, Shirts, Costumes, Accessories
- **Efectos:** Gradient overlay, descripción en hover
- **Imágenes:** collection_dress, collection_shirt, collection_costume, collection_accessories

### CustomDesign (`src/sections/CustomDesign.tsx` — 244 líneas)
- **Layout:** Imagen grande + panel detalles + formulario
- **Formulario:** name, whatsApp, pet name, idea (textarea)
- **Detalle:** Stamp "1 OF 1"
- **Imágenes:** custom_fit_main, custom_fit_detail

### SizeGuide (`src/sections/SizeGuide.tsx` — 246 líneas)
- **Contenido:** Tabla de tallas XS–XL con medidas en cm
- **Steps:** Measure → Adjust → Returns
- **Instrucciones:** Cómo tomar las medidas de la mascota
- **Imagen:** size_guide_photo

### Testimonials (`src/sections/Testimonials.tsx` — 187 líneas)
- **Layout:** Imagen grande + quote + stamp "LOVE"
- **Quote:** "The coat fits like it was made for her—because it was."
- **Imágenes:** testimonial_main, testimonial_small

### Lookbook (`src/sections/Lookbook.tsx` — 189 líneas)
- **Layout:** Grid masonry asimétrico con 5 imágenes
- **CTA:** Links a Instagram
- **Imágenes:** lookbook_01 … lookbook_05

### CraftCare (`src/sections/CraftCare.tsx` — 222 líneas)
- **Valores:** Soft fabrics, Reinforced stitching, Easy wash
- **Iconos:** Lucide React
- **Detalle:** Stamp "CARE"
- **Imágenes:** craft_main, craft_detail

### Contact (`src/sections/Contact.tsx` — 307 líneas)
- **Layout:** Imagen grande izquierda, pequeñas derechas, panel de contacto camel
- **Formulario:** name, email, message
- **Social links:** Instagram, Facebook
- **Footer:** Copyright
- **Imágenes:** contact_main, contact_small_01, contact_small_02

### Secciones basadas en config (estado incompleto)
| Sección | Archivo | Estado |
|---------|---------|--------|
| ProductShowcase | ProductShowcase.tsx | Config vacía, no renderiza contenido |
| ColorPalette | ColorPalette.tsx | Config vacía, no renderiza contenido |
| Finale | Finale.tsx | Config vacía, no renderiza contenido |

---

## 6. Configuración Central

El archivo `src/config.ts` centraliza las configuraciones del sitio mediante interfaces TypeScript:

```typescript
interface NavigationConfig { ... }
interface HeroConfig { ... }
interface ProductShowcaseConfig { ... }
interface ColorPaletteConfig { ... }
interface FinaleConfig { ... }
interface FooterConfig { ... }
interface SiteConfig { ... }
```

**Datos hardcodeados en el código (no en config.ts):**
- Número WhatsApp: `https://wa.me/1234567890`
- Email contacto: `info@fabipets.com`
- Links sociales: Instagram, Facebook

---

## 7. Estilos y Sistema de Diseño

### Paleta de Colores

| Variable CSS | Hex | Uso |
|--------------|-----|-----|
| `--blush` | `#F6B7C1` | Fondo principal (rosado suave) |
| `--blush-light` | `#FAD4DA` | Fondo secundario |
| `--camel` | `#D4A574` | Color primario/accent |
| `--camel-dark` | `#B88B5A` | Hover de primario |
| `--black` | `#111111` | Texto principal |
| `--white` | `#ffffff` | Texto sobre fondos oscuros |
| `--gray` | `#6F6F6F` | Texto secundario |

### Tipografía

| Tipo | Fuente | Peso | Uso |
|------|--------|------|-----|
| Display | Montserrat | 800 | Títulos, uppercase, letter-spacing -0.02em |
| Body | Open Sans / Inter | 300-400 | Párrafos y texto general |
| Mono | IBM Plex Mono | — | Tablas, código |

### Clases Utilitarias Personalizadas (`src/index.css`)

```css
.fabipets-card        /* bg-white, border 2.5px negro, shadow, rounded-[28px] */
.fabipets-card-sm     /* rounded-[18px] */
.btn-primary          /* bg-camel, text-white, px-6 py-3, rounded-full */
.btn-outline          /* border 2px negro, fondo transparente */
.card-shadow          /* box-shadow: 0 18px 40px rgba(0,0,0,0.1) */
.grain-overlay        /* Textura de ruido fija */
.hover-lift           /* Transform translateY(-8px) en hover */
.image-zoom           /* Scale 1.03 en hover */
```

### Keyframes Personalizados

| Nombre | Duración | Efecto |
|--------|----------|--------|
| `pulse-pink` | 4s | Scale 1 → 1.05 |
| `float` | 3s | TranslateY oscilante |
| `flip-in` | 1.2s | 3D rotateX |
| `slide-up` | 0.8s | Entrada desde abajo |
| `grid-line-draw` | 1s | Stroke dash animation |
| `accordion-down/up` | 0.2s | Acordeón |

### Responsive

- **Enfoque:** Mobile-first
- **Breakpoint principal:** `md` (768px)
- **Grids:** 1 columna mobile → 12 columnas desktop
- **Imágenes:** `object-cover` con aspect ratios variables

---

## 8. Animaciones y Efectos

### GSAP ScrollTrigger
Cada sección implementa animaciones con el patrón:
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(element, { fromVars }, {
      toVars,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reverse',
      }
    });
  }, containerRef);
  return () => ctx.revert(); // cleanup
}, []);
```

### Lenis Smooth Scroll
Configurado en `App.tsx` para scroll suave en toda la página.

### Z-Index Stack

```
z-9999  → grain-overlay (fixed)
z-9998  → cursor ring (custom cursor)
z-9997  → cursor dot (custom cursor)
z-50    → WhatsApp button, modals, tooltips
---
z-90    → Contact (sección + footer)
z-80    → CraftCare
z-70    → Lookbook
z-60    → Testimonials
z-50    → SizeGuide
z-40    → CustomDesign
z-30    → CollectionGrid
z-20    → FeaturedOutfit
z-10    → Hero
```

---

## 9. Formularios

### CustomDesign (`src/sections/CustomDesign.tsx`)
**Campos:**
- Name (text)
- WhatsApp number (text)
- Pet's name (text)
- Tell us your idea (textarea)

**Comportamiento:** Muestra `alert()` al enviar y resetea el formulario. Sin backend.

### Contact (`src/sections/Contact.tsx`)
**Campos:**
- Name (text)
- Email (email)
- Message (textarea)

**Comportamiento:** Muestra `alert()` al enviar y resetea el formulario. Sin backend.

> **Nota:** Ambos formularios usan `useState` local. Los datos no se guardan ni se envían a ningún servidor. Para producción se recomienda integrar un servicio como Formspree, EmailJS, o un backend propio.

---

## 10. Componentes Utilitarios

### Navigation (`src/components/Navigation.tsx`)
- Barra de navegación fija (`position: sticky/fixed`)
- Detección de scroll para aplicar `backdrop-blur`
- Links internos: Collection, Custom, Lookbook, Contact
- CTA: "Order on WhatsApp" → `https://wa.me/1234567890`
- Menú mobile con slide-in desde la derecha

### CustomCursor (`src/components/CustomCursor.tsx`)
- Cursor personalizado solo en desktop (no en dispositivos touch)
- Compuesto por: ring circular + punto central
- Ring crece en hover sobre elementos interactivos
- Dot sigue el mouse inmediatamente (sin delay)
- Implementado con GSAP para easing

### WhatsAppButton (`src/components/WhatsAppButton.tsx`)
- Botón flotante fijo en bottom-right
- Icono `MessageCircle` de Lucide React
- Animación `animate-pulse` infinita
- Enlace: `https://wa.me/1234567890`

### use-mobile Hook (`src/hooks/use-mobile.ts`)
```typescript
// Detecta si el dispositivo es móvil (< 768px)
const isMobile = useIsMobile();
```

### utils (`src/lib/utils.ts`)
```typescript
// Función cn() para merge de clases Tailwind
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 11. Archivos de Configuración

### `vite.config.ts`
```typescript
{
  plugins: [inspectAttr(), react()],
  base: './',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
}
```

### `tsconfig.app.json`
```json
{
  "target": "ES2022",
  "module": "ESNext",
  "jsx": "react-jsx",
  "strict": true,
  "moduleResolution": "bundler",
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### `tailwind.config.js`
- Colores personalizados: blush, camel y variantes
- Tipografía: Montserrat, Inter, IBM Plex Mono
- Animaciones personalizadas
- Contenido escaneado: `./index.html`, `./src/**/*.{ts,tsx}`

### `components.json` (shadcn/ui)
```json
{
  "style": "new-york",
  "tsx": true,
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  }
}
```

### `index.html`
```html
<title>Fabipets - Designer Fashion for Pets</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

---

## 12. Scripts Disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo (http://localhost:5173)
npm run build     # Compila TypeScript + Vite → dist/
npm run lint      # Ejecuta ESLint en el código fuente
npm run preview   # Previsualiza el build de producción localmente
```

### Setup inicial
```bash
cd app
npm install
npm run dev
```

---

## 13. Imágenes y Assets

Todas las imágenes están en `app/public/images/` y se referencian con rutas absolutas:
```tsx
<img src="/images/hero_dog_bow.jpg" alt="..." />
```

### Lista completa de imágenes requeridas

| Archivo | Sección | Rol |
|---------|---------|-----|
| `hero_cat_pink.jpg` | Hero | Collage tarjeta 1 |
| `hero_dog_bow.jpg` | Hero | Collage tarjeta 2 |
| `hero_dog_costume.jpg` | Hero | Collage tarjeta 3 |
| `hero_dog_flowers.jpg` | Hero | Collage tarjeta 4 |
| `hero_dog_sunglasses.jpg` | Hero | Collage tarjeta 5 |
| `hero_paws_closeup.jpg` | Hero | Collage tarjeta 6 |
| `featured_suit_main.jpg` | FeaturedOutfit | Imagen principal |
| `featured_suit_detail.jpg` | FeaturedOutfit | Detalle del producto |
| `collection_dress.jpg` | CollectionGrid | Categoría Dresses |
| `collection_shirt.jpg` | CollectionGrid | Categoría Shirts |
| `collection_costume.jpg` | CollectionGrid | Categoría Costumes |
| `collection_accessories.jpg` | CollectionGrid | Categoría Accessories |
| `custom_fit_main.jpg` | CustomDesign | Imagen principal |
| `custom_fit_detail.jpg` | CustomDesign | Detalle |
| `size_guide_photo.jpg` | SizeGuide | Foto guía |
| `testimonial_main.jpg` | Testimonials | Foto principal |
| `testimonial_small.jpg` | Testimonials | Foto secundaria |
| `lookbook_01.jpg` | Lookbook | Imagen 1 |
| `lookbook_02.jpg` | Lookbook | Imagen 2 |
| `lookbook_03.jpg` | Lookbook | Imagen 3 |
| `lookbook_04.jpg` | Lookbook | Imagen 4 |
| `lookbook_05.jpg` | Lookbook | Imagen 5 |
| `craft_main.jpg` | CraftCare | Imagen principal |
| `craft_detail.jpg` | CraftCare | Detalle |
| `contact_main.jpg` | Contact | Imagen principal |
| `contact_small_01.jpg` | Contact | Imagen pequeña 1 |
| `contact_small_02.jpg` | Contact | Imagen pequeña 2 |

---

## 14. Variables de Entorno

**Actualmente el proyecto no requiere variables de entorno.** Los valores están hardcodeados directamente en el código.

### Valores hardcodeados a actualizar

| Ubicación | Valor actual | Variable recomendada |
|-----------|-------------|----------------------|
| `Navigation.tsx`, `WhatsAppButton.tsx` | `https://wa.me/1234567890` | `VITE_WHATSAPP_PHONE` |
| `Contact.tsx` | `info@fabipets.com` | `VITE_CONTACT_EMAIL` |
| `Contact.tsx` | Links Instagram/Facebook | `VITE_INSTAGRAM_URL`, `VITE_FACEBOOK_URL` |

### `.env.example` recomendado
```env
VITE_WHATSAPP_PHONE=+1234567890
VITE_CONTACT_EMAIL=info@fabipets.com
VITE_INSTAGRAM_URL=https://instagram.com/fabipets
VITE_FACEBOOK_URL=https://facebook.com/fabipets
VITE_SITE_URL=https://fabipets.com
```

---

## 15. Dependencias

### `package.json` — Resumen

```json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Dependencias de producción
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "gsap": "^3.14.2",
  "@studio-freight/lenis": "^1.0.42",
  "tailwindcss": "^3.4.19",
  "lucide-react": "^0.562.0",
  "react-hook-form": "^7.70.0",
  "@hookform/resolvers": "^5.2.2",
  "zod": "^4.3.5",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0",
  "class-variance-authority": "^0.7.1",
  "date-fns": "^4.1.0",
  "sonner": "^2.0.7",
  "next-themes": "^0.4.6",
  "embla-carousel-react": "^8.6.0",
  "recharts": "^2.15.4",
  "vaul": "^1.1.2",
  "cmdk": "^1.1.1",
  "input-otp": "^1.4.2",
  "react-day-picker": "^9.13.0",
  "react-resizable-panels": "^4.2.2",
  "@radix-ui/*": "~14 paquetes"
}
```

### Dependencias de desarrollo
```json
{
  "typescript": "~5.9.3",
  "vite": "^7.2.4",
  "eslint": "^9.39.1",
  "tailwindcss-animate": "^1.0.7",
  "@vitejs/plugin-react": "...",
  "typescript-eslint": "^8.46.4",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "kimi-plugin-inspect-react": "^1.0.3"
}
```

---

## 16. Consideraciones de Producción

### Hosting
El proyecto genera archivos estáticos en `dist/`. Compatible con:
- **Vercel** (recomendado — detecta Vite automáticamente)
- **Netlify**
- **GitHub Pages** (requiere `base: '/'` en vite.config.ts)
- **AWS S3 + CloudFront**

### Build de producción
```bash
npm run build
# Genera: dist/index.html + dist/assets/ (CSS y JS minificados)
```

### SEO
- Meta tags básicos en `index.html`
- Para mejorar: agregar `react-helmet-async` para meta tags dinámicos
- Considerar SSR con Astro o Next.js si se necesita SEO profundo

### Performance
- Vite genera chunks optimizados automáticamente
- Las imágenes son estáticas (JPG) — considerar WebP y lazy loading
- GSAP y Lenis añaden ~100KB al bundle

### Seguridad
- Sin backend → superficie de ataque mínima
- HTTPS obligatorio en producción
- Considerar CSP (Content Security Policy) headers

### Formularios en producción
Los formularios actuales no envían datos. Para producción integrar:
- **Formspree** (sin código backend)
- **EmailJS** (envío de email desde el cliente)
- **Backend propio** (API REST o serverless functions)

---

## 17. Estado Actual y Pendientes

### Completado ✅
- [x] Layout completo de la landing page (9 secciones activas)
- [x] Animaciones GSAP con ScrollTrigger en todas las secciones
- [x] Smooth scroll con Lenis
- [x] Cursor personalizado (desktop)
- [x] Botón flotante WhatsApp
- [x] Navegación con menú mobile
- [x] Formularios con validación (estado local)
- [x] Responsive design (mobile-first)
- [x] Paleta de colores y tipografía personalizadas
- [x] Componentes shadcn/ui instalados

### Pendiente / Mejoras recomendadas ⚠️
- [ ] Conectar formularios a un backend o servicio de email
- [ ] Reemplazar número WhatsApp hardcodeado (`wa.me/1234567890`) con el real
- [ ] Reemplazar email hardcodeado (`info@fabipets.com`) con el real
- [ ] Completar secciones `ProductShowcase`, `ColorPalette` y `Finale` (config vacía)
- [ ] Agregar `README.md` en la raíz del proyecto
- [ ] Configurar variables de entorno para datos de contacto
- [ ] Optimizar imágenes a formato WebP
- [ ] Agregar lazy loading a imágenes
- [ ] Mejorar SEO con meta tags Open Graph y Twitter Cards
- [ ] Agregar tests (Vitest + Testing Library)
- [ ] Configurar CI/CD (GitHub Actions)
- [ ] Crear archivo `.env.example`

---

*Documentación generada el 2026-03-08*
