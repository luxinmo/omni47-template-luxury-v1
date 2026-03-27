# About & Team Pages — Implementation Guide

> **Rutas**: `/about3` → AboutPageV3 · `/team` → TeamPage  
> **Relación**: About3 muestra una **previsualización** del equipo (6 miembros) con enlace a `/team`. La página `/team` es el directorio completo.

---

## Tabla de contenidos

1. [Arquitectura general](#1-arquitectura-general)
2. [/about3 — AboutPageV3](#2-about3--aboutpagev3)
3. [/team — TeamPage](#3-team--teampage)
4. [Datos necesarios (API / CMS)](#4-datos-necesarios-api--cms)
5. [Design tokens utilizados](#5-design-tokens-utilizados)
6. [Componentes compartidos](#6-componentes-compartidos)

---

## 1. Arquitectura general

```
/about3  ──────────────────────────────────────────────
│  Hero (imagen fullscreen + overlay)
│  Stats Ribbon (4 KPIs)
│  Who We Are (texto + imagen split)
│  Timeline interactiva (2009–2025)
│  Team Preview (grid 2×3) ──────────► enlace a /team
│  Luxury Philosophy (4 pilares, fondo imagen)
│  Technology & AI (6 features, fondo oscuro)
│  Off-Market Access (split texto + features)
│  System / Process (5 pasos numerados)
│  Global Network (3 cards)
│  Experience Services (split imagen + lista)
│  Content & Video (CTA cinematic)
│  Ethics & Values (3 cards)
│  Testimonials (carrusel auto-rotate)
│  CTA final (2 botones)
└──────────────────────────────────────────────────────

/team  ────────────────────────────────────────────────
│  Header editorial (sin hero, navbar solid)
│  Stats Ribbon (4 KPIs del equipo)
│  Leadership (2 cards grandes, grid 1×2)
│  Advisors & Specialists (grid 2×4 responsive)
│  CTA "Join Us"
└──────────────────────────────────────────────────────
```

---

## 2. /about3 — AboutPageV3

### 2.1 Secciones en orden

| # | Sección | Layout | Fondo | Datos |
|---|---------|--------|-------|-------|
| 1 | **Hero** | Centrado, imagen fullscreen, gradient overlay | Imagen (`luxury-hero.jpg`) | Subtítulo, H1, 3 palabras clave |
| 2 | **Stats Ribbon** | `grid-cols-2 md:grid-cols-4` con separadores verticales | `palette.white` | 4 objetos `{ value, label }` |
| 3 | **Who We Are** | Split 2 columnas (texto / imagen) | `palette.white` | 2 párrafos de texto + imagen |
| 4 | **Timeline** | Desktop: dots horizontales clicables + contenido centrado. Mobile: vertical con línea | `palette.white` | Array `{ year, title, desc }` |
| 5 | **Team Preview** | `grid-cols-2 sm:grid-cols-3` (6 miembros) + botón "See Full Team" | `palette.white` | Array `{ name, role, office, image }` |
| 6 | **Philosophy** | 4 columnas con `gap-[1px]`, fondo imagen + overlay oscuro | Imagen (`luxury-property-2.jpg`) | Array `{ icon, title, desc }` |
| 7 | **Technology & AI** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, gap 1px | `palette.offMarketBg` (oscuro) | Array `{ icon, title, desc }` |
| 8 | **Off-Market** | Split 2 col (texto izq / features der) | `palette.white` | 3 features `{ icon, title, desc }` |
| 9 | **Process** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`, gap 1px | `palette.bg` | 5 pasos `{ num, title, desc }` |
| 10 | **Global Network** | `grid-cols-1 md:grid-cols-3` con borde exterior | `palette.white` | 3 items `{ icon, title, desc }` |
| 11 | **Experience** | Split 2 col (texto+imagen izq / lista der) | `palette.bg` | 4 servicios `{ icon, title, desc }` |
| 12 | **Content & Video** | Centrado, imagen fullscreen + overlay | Imagen | Texto + botón play |
| 13 | **Ethics** | `grid-cols-1 md:grid-cols-3` con borde | `palette.white` | 3 valores `{ icon, title, desc }` |
| 14 | **Testimonials** | Centrado, imagen fullscreen, auto-rotate 5s | Imagen | Array `{ quote, author, location }` |
| 15 | **CTA Final** | Centrado, 2 botones | `palette.bg` | Texto + enlaces |

### 2.2 Estado interno

```ts
const [activeTestimonial, setActiveTestimonial] = useState(0);  // auto-rotate cada 5s
const [activeTimeline, setActiveTimeline] = useState(1);          // timeline clickable (desktop)
```

### 2.3 Sección Team Preview — Detalle

La sección de equipo en `/about3` es una **previsualización** que muestra 6 miembros con:

- **Fotos en B&W** → color al hover (`grayscale group-hover:grayscale-0`)
- **Zoom sutil** al hover (`group-hover:scale-105`)
- **Overlay en hover**: gradient desde abajo con `MapPin` icon + nombre de oficina
- **Info bajo la foto**: nombre, rol, oficina (con MapPin)
- **Botón inferior**: "See Full Team · +7 more" → enlace a `/team`

**Datos mínimos por miembro (preview):**
```ts
{ name: string, role: string, office: string, image: string }
```

---

## 3. /team — TeamPage

> **IMPORTANTE**: Esta página debe implementarse como ruta independiente `/team` en el website.  
> Es el directorio completo del equipo, no una sección dentro de about.

### 3.1 Configuración de Layout

```tsx
<Layout navVariant="solid" activePath="/team" showBackToTop={false} showLanguage={true}>
```

- **Navbar**: variante `solid` (no transparente, a diferencia de about3)
- **Sin Hero**: la página empieza con un header editorial limpio

### 3.2 Secciones

#### 3.2.1 Header editorial

- Padding top: `pt-28 sm:pt-32` (compensa navbar sólida)
- Subtítulo: "Our People" (accent, uppercase, tracking-[0.3em])
- H1: "The Team Behind Luxinmo"
- Línea decorativa: 12×1px en color accent
- Párrafo descriptivo

#### 3.2.2 Stats Ribbon

- `grid-cols-2 md:grid-cols-4` con separadores verticales
- Fondo: `palette.bg` con bordes top/bottom
- **4 estadísticas del equipo:**

| value | label |
|-------|-------|
| 30+ | Team Members |
| 14 | Languages Spoken |
| 8 | Nationalities |
| 5 | Offices |

#### 3.2.3 Leadership (primeros 2 miembros)

- Label: "Leadership" (accent, uppercase)
- Grid: `grid-cols-1 md:grid-cols-2`
- Cards grandes con:
  - Foto `aspect-[4/5]` en B&W → color al hover
  - Overlay al hover: oficina (MapPin) + iconos LinkedIn/Mail
  - Nombre (text-xl), rol, descripción completa, oficina + idiomas

#### 3.2.4 Advisors & Specialists (miembros 3+)

- Label: "Our Advisors & Specialists"
- Grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
- Cards más compactas:
  - Foto `aspect-[3/4]` en B&W → color al hover
  - Overlay al hover: oficina + LinkedIn/Mail (iconos más pequeños)
  - Nombre (text-[14px]), rol, descripción, oficina + idiomas

#### 3.2.5 CTA "Join Us"

- Fondo: `palette.bg`
- Centrado, subtítulo + H2 + párrafo
- 2 botones: "Get in Touch" (accent sólido) + "About Luxinmo" (borde)

### 3.3 Efectos visuales

| Efecto | CSS |
|--------|-----|
| B&W → Color | `grayscale group-hover:grayscale-0 transition-all duration-500` |
| Zoom hover | `group-hover:scale-105` |
| Overlay oscuro | `bg-black/0 group-hover:bg-black/10 transition-colors duration-300` |
| Info overlay | `opacity-0 group-hover:opacity-100`, gradient `rgba(0,0,0,0.6) → transparent` |
| Social buttons | `bg-white/20 backdrop-blur-sm hover:bg-white/40` círculos |

---

## 4. Datos necesarios (API / CMS)

### 4.1 Team Members — Modelo de datos completo

> Estos datos son los que el **website debe obtener de la API/CMS** para `/team`.

```ts
interface TeamMember {
  name: string;           // "Arman Yeghiazaryan"
  role: string;           // "Founder & CEO"
  office: string;         // "Altea — HQ"
  image: string;          // URL de la foto (aspect 3:4 o 4:5)
  desc: string;           // Descripción profesional (1-2 frases)
  languages: string;      // "EN, ES, RU, AM"
  linkedin?: string;      // URL de LinkedIn (opcional)
  email?: string;         // Email de contacto (opcional)
  isLeadership: boolean;  // true para los 2 primeros (cards grandes)
}
```

### 4.2 Miembros actuales (datos de ejemplo)

| # | Nombre | Cargo | Oficina | Idiomas | Grupo |
|---|--------|-------|---------|---------|-------|
| 1 | Arman Yeghiazaryan | Founder & CEO | Altea — HQ | EN, ES, RU, AM | Leadership |
| 2 | Elena Martínez | Managing Director | Altea — HQ | ES, EN, FR | Leadership |
| 3 | David van der Berg | Head of International Sales | Netherlands | NL, EN, ES, DE | Advisor |
| 4 | Sofia Petrova | Head of Technology & AI | Altea — HQ | EN, RU, ES | Advisor |
| 5 | Carlos Ruiz | Head of Off-Market & Private Office | Ibiza | ES, EN, FR | Advisor |
| 6 | Anna Johansson | Senior Luxury Advisor | Ibiza | SV, EN, ES, DE | Advisor |
| 7 | Marco Bernardi | Senior Luxury Advisor | Jávea | IT, ES, EN | Advisor |
| 8 | Natalia Kovalenko | Client Relations Manager | Warsaw | RU, EN, ES, UK | Advisor |
| 9 | Thomas Weber | Marketing & Brand Director | Altea — HQ | DE, EN, ES | Advisor |
| 10 | Laura Sánchez | Legal & Compliance | Altea — HQ | ES, EN, FR | Advisor |

### 4.3 Team Stats (pueden ser dinámicos o estáticos)

```ts
interface TeamStat {
  value: string;   // "30+"
  label: string;   // "Team Members"
}
```

### 4.4 About Page — Datos adicionales

Además de los team members, `/about3` necesita estos datasets:

| Dataset | Campos | Uso |
|---------|--------|-----|
| `STATS` | `{ value, label }` | Stats ribbon (KPIs empresa) |
| `TIMELINE` | `{ year, title, desc }` | Timeline interactiva |
| `PHILOSOPHY_PILLARS` | `{ icon, title, desc }` | 4 pilares de filosofía |
| `TECH_FEATURES` | `{ icon, title, desc }` | 6 features tecnológicas |
| `OFFMARKET_FEATURES` | `{ icon, title, desc }` | 3 features off-market |
| `SYSTEM_STEPS` | `{ num, title, desc }` | 5 pasos del proceso |
| `GLOBAL_NETWORK` | `{ icon, title, desc }` | 3 tipos de red |
| `EXPERIENCE_SERVICES` | `{ icon, title, desc }` | 4 servicios lifestyle |
| `VALUES` | `{ icon, title, desc }` | 3 valores éticos |
| `TESTIMONIALS` | `{ quote, author, location }` | Testimonios (auto-rotate) |

### 4.5 Imágenes necesarias

| Imagen | Uso | Aspect ratio |
|--------|-----|--------------|
| Hero background | About3 hero + Content & Video | ~16:9, min 1920px wide |
| Who We Are | Split section derecha | 4:5 |
| Philosophy background | Sección filosofía | ~16:9 |
| Experience | Split section izquierda | 16:10 |
| Testimonial background | Carrusel testimonios | ~16:9 |
| Team member photos (×10) | Cards de equipo | 3:4 (advisors) o 4:5 (leadership) |

---

## 5. Design tokens utilizados

Todas las secciones usan tokens de `src/config/template.ts`:

```ts
// Fondos
palette.white    // Secciones claras principales
palette.bg       // Secciones alternas (ligero contraste)
palette.offMarketBg  // Secciones oscuras (Technology & AI)
palette.border   // Bordes y separadores

// Texto
palette.accent      // Subtítulos, highlights, números
palette.text        // Texto principal
palette.textMuted   // Párrafos descriptivos
palette.textLight   // Metadata (oficinas, idiomas)
palette.offMarketAccent  // Highlights en secciones oscuras

// Tipografía
fonts.heading    // H1, H2, H3, nombres
fonts.body       // Párrafos (implícito via CSS)
```

---

## 6. Componentes compartidos

| Componente | Ruta | Uso |
|------------|------|-----|
| `Layout` | `@/components/layout` | Wrapper con navbar + footer |
| `FadeIn` | `@/components/shared/FadeIn` | Animación de entrada (con prop `delay`) |
| `SEOHead` | `@/components/shared/SEOHead` | Meta tags (title, description) |

### Props de Layout relevantes

```ts
// About3
<Layout navVariant="transparent" activePath="/about3" showBackToTop={false} showLanguage={true}>

// Team
<Layout navVariant="solid" activePath="/team" showBackToTop={false} showLanguage={true}>
```

**Diferencia clave**: About3 usa `navVariant="transparent"` porque tiene hero con imagen. Team usa `navVariant="solid"` porque empieza con texto sobre fondo blanco.

---

## Resumen de implementación

1. **`/about3`** = página corporativa completa (12 secciones). Los datos del equipo son una previsualización (6 miembros, sin descripción ni idiomas).
2. **`/team`** = directorio completo del equipo, página independiente. Necesita el modelo `TeamMember` completo con `desc`, `languages`, `linkedin`, `email`.
3. La sección de equipo en `/about3` enlaza a `/team` con "See Full Team · +7 more".
4. Ambas páginas comparten el mismo estilo visual (B&W → color, overlays, tipografía luxury).
