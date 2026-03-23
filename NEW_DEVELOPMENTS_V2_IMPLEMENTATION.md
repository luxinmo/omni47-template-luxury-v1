# NEW DEVELOPMENTS V2 — Documentación Pixel-Perfect Completa

> **Ruta**: `/new-developments2`  
> **Archivo**: `src/components/luxury/NewDevelopmentsPageV2.tsx`  
> **Líneas**: 377  
> **Última actualización**: 2026-03-23

---

## 1. Mapa de Archivos

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| `src/components/luxury/NewDevelopmentsPageV2.tsx` | 1–377 | Página completa (monolítica) |
| `src/components/shared/FadeIn.tsx` | 1–37 | Animación de entrada con IntersectionObserver |
| `src/components/shared/SEOHead.tsx` | — | Meta tags, Open Graph, Twitter Card |
| `src/components/layout/Layout.tsx` | — | Wrapper con navbar + footer |
| `src/config/template.ts` | — | Tokens de diseño: `palette`, `fonts` |
| `src/hooks/use-mobile.tsx` | — | Hook `useIsMobile()` para lógica condicional por breakpoint |

### Ubicación de cada pieza dentro del archivo principal

| Pieza | Líneas | Descripción |
|-------|--------|-------------|
| Imports | 1–14 | React, router, icons, layout, config, assets |
| `NewDevelopment` interface | 17–35 | Modelo de datos |
| `NEW_DEVELOPMENTS` (mock data) | 38–87 | 6 promociones de ejemplo |
| Filtros derivados + `fmt()` | 89–95 | `ALL_LOCATIONS`, `ALL_STATUSES`, etc. |
| `FilterSelect` componente | 97–119 | Dropdown nativo estilizado |
| `DevCard` componente | 121–218 | Tarjeta de promoción responsive |
| `NewDevelopmentsPageV2` página | 220–377 | Componente principal con estado y layout |

---

## 2. Filosofía de Diseño

Página de listado de obra nueva **sin hero visual**. A diferencia de `/new-developments` (V1), esta versión prioriza el **acceso directo al contenido**: título SEO + texto descriptivo → filtros → tarjetas de promoción. El usuario llega y ve inmediatamente las promociones disponibles sin scroll.

**Sentido**: En un contexto de remarketing o tráfico orgánico, el usuario ya sabe lo que busca. El hero es un obstáculo.

---

## 3. Modelo de Datos

### 3.1 Interface `NewDevelopment` (líneas 17–35)

```ts
interface NewDevelopment {
  slug: string;              // URL-friendly ID → enlace a /new-developments/:slug
  image: string;             // Imagen principal de la promoción
  name: string;              // Nombre del proyecto
  location: string;          // "Ciudad, Zona" (display)
  municipality: string;      // Municipio (para filtrado)
  developer: string;         // Nombre del promotor
  delivery: string;          // Fecha estimada de entrega (ej. "Q2 2027")
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;      // % de construcción completada (0-100)
  availableUnits: number;    // Unidades disponibles actualmente
  totalUnits: number;        // Total de unidades del proyecto
  priceMin: number;          // Precio mínimo (EUR)
  priceMax: number;          // Precio máximo (EUR)
  typologies: { type: string; from: number }[];
  units: { ref: string; type: string; price: number; beds: number; sqm: number }[];
  description: string;       // Para detalle y meta description (no se muestra en card)
  trending?: boolean;        // Marca visual de tendencia
}
```

### 3.2 Filtros Derivados (líneas 89–93)

```ts
ALL_LOCATIONS   = [...new Set(developments.map(d => d.municipality))]
ALL_STATUSES    = [...new Set(developments.map(d => d.status))]
ALL_TYPOLOGIES  = [...new Set(developments.flatMap(d => d.typologies.map(t => t.type)))]
ALL_DELIVERIES  = [...new Set(developments.map(d => d.delivery))].sort()
```

**Sentido**: Los filtros se generan dinámicamente desde los datos. Con backend, vendrán del API (faceted search).

### 3.3 Formato de Precios (línea 95)

```ts
const fmt = (n: number) => new Intl.NumberFormat("de-DE", {
  style: "currency", currency: "EUR", maximumFractionDigits: 0
}).format(n);
```

Locale `de-DE` → punto como separador de miles (€485.000). Sin decimales.

---

## 4. Estado Interno (líneas 222–247)

| Variable | Tipo | Default | Propósito |
|----------|------|---------|-----------|
| `filterLocation` | `string \| null` | `null` | Municipio seleccionado |
| `filterStatus` | `string \| null` | `null` | Estado de la promoción |
| `filterTypology` | `string \| null` | `null` | Tipo de unidad |
| `filterDelivery` | `string \| null` | `null` | Fecha de entrega |
| `showMobileFilters` | `boolean` | `false` | Panel de filtros móvil abierto/cerrado |

### Variables Derivadas (líneas 229–240)

| Variable | Lógica |
|----------|--------|
| `filtered` | `useMemo` — aplica los 4 filtros con AND lógico |
| `hasFilters` | `boolean` — si algún filtro está activo (muestra "Clear all") |
| `activeFilterCount` | `number` — cuenta de filtros activos (badge en botón móvil) |

---

## 5. Componentes — Diseño Pixel-Perfect

### 5.1 `FilterSelect` (líneas 97–119)

**Archivo**: `NewDevelopmentsPageV2.tsx`, inline.

Dropdown nativo estilizado con apariencia custom.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Etiqueta superior (ej. "Location") |
| `value` | `string \| null` | Valor seleccionado |
| `options` | `string[]` | Opciones disponibles |
| `onChange` | `(v: string \| null) => void` | Callback de cambio |

#### Diseño pixel-perfect

```
┌─────────────────────────────────┐
│  LOCATION                       │  ← label: text-[10px] sm:text-[11px], tracking-[0.25em], uppercase, palette.accent
├─────────────────────────────────┤
│  All                        ▼   │  ← select: text-[16px] sm:text-[13px], font-light, tracking-[0.04em]
│                                 │     border: 1px solid palette.border
│                                 │     bg: palette.white
│                                 │     padding: pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3
│                                 │     ▼ = ChevronDown w-4 h-4, palette.textLight
└─────────────────────────────────┘
```

**UX crítica**: `font-size: 16px` en móvil (`text-[16px] sm:text-[13px]`) para **prevenir zoom automático en iOS Safari** al enfocar el select.

**Sentido**: Se usa `<select>` nativo porque en móvil ofrece el picker nativo del OS → mejor UX que un dropdown custom.

---

### 5.2 `DevCard` (líneas 121–218)

**Archivo**: `NewDevelopmentsPageV2.tsx`, inline.

Tarjeta horizontal (desktop) / vertical (móvil) de promoción.

#### Layout Responsive

| Breakpoint | Layout | Imagen | Contenido |
|------------|--------|--------|-----------|
| **Móvil** (<640px) | Vertical (flex-col) | 260px min-h, edge-to-edge (sin border-x, rounded-none) | Padding 16px (p-4), precio en overlay sobre imagen |
| **Tablet** (640-1023px) | Vertical (flex-col) | 240px min-h, con border-x y rounded-sm | Padding 24px (p-6), tipologías + unidades visibles |
| **Desktop** (1024px+) | Horizontal (flex-row) | 44% width, 360px min-h | Padding 32px (p-8), precio inline, todo visible |

#### Anatomía visual completa

```
┌──────────────────────────────────────────────────────────────────┐
│  IMAGEN (lg:w-[44%] / 100% en mobile)                           │
│  ┌────────────┐                                ┌──────────────┐ │
│  │ Last Units │ top-3 left-3                    │ ↗ Trending   │ │
│  │ text-[10px] │ bg-black/60                    │ top-3 right-3│ │
│  │ tracking-[0.12em]│ backdrop-blur-sm          │ text-[10px]  │ │
│  │ uppercase  │ rounded-sm                      │ TrendingUp   │ │
│  │ px-2.5 py-1│                                 │ w-3 h-3     │ │
│  └────────────┘                                 └──────────────┘ │
│                                                                  │
│  ▓▓▓ gradient h-16 bg-gradient-to-t from-black/60 (lg:hidden) ▓ │
│  €485.000 — €1.250.000                                           │
│  ↑ bottom-3 left-3, text-[17px] font-semibold text-white        │
│    tracking-wide drop-shadow-md (lg:hidden)                      │
├──────────────────────────────────────────────────────────────────┤
│  CONTENT (flex-1, p-4 sm:p-6 lg:p-8, flex flex-col)             │
│                                                                  │
│  ┌── Header (flex justify-between, mb-1) ─────────────────────┐ │
│  │ Altea, Costa Blanca                   [Under Construction]  │ │
│  │ ↑ text-[11px] tracking-[0.15em]       ↑ text-[10px] sm:[11]│ │
│  │   uppercase, palette.textMuted          tracking-[0.1em]   │ │
│  │ [New Development] (hidden sm:inline)    uppercase, border   │ │
│  │  text-[10px] tracking-[0.1em]           px-2 py-0.5       │ │
│  │  border palette.border                  palette.text + 30% │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Marea Residences                                                │
│  ↑ h3: text-lg sm:text-xl lg:text-[22px]                        │
│    font-light tracking-wide, fonts.heading, mb-1                 │
│                                                                  │
│  Grupo Prasa · Delivery Q2 2027                                  │
│  ↑ text-[12px] sm:text-[13px] font-light, palette.textMuted     │
│    mb-3 sm:mb-4                                                  │
│                                                                  │
│  ┌── Stats Row (flex gap-4 sm:gap-6, border-bottom) ──────────┐ │
│  │  Available        Built           Delivery                  │ │
│  │  ↑ text-[9px]     ↑ text-[9px]    ↑ text-[9px]             │ │
│  │  tracking-[0.2em] tracking-[0.2em] tracking-[0.2em]        │ │
│  │  uppercase         uppercase       uppercase                │ │
│  │  palette.textLight palette.textLight palette.textLight      │ │
│  │  mb-0.5 sm:mb-1   mb-0.5 sm:mb-1  mb-0.5 sm:mb-1          │ │
│  │                                                             │ │
│  │  28 / 64          55%             Q2 2027                   │ │
│  │  ↑ text-[15px]    ↑ text-[15px]   ↑ text-[15px]            │ │
│  │    sm:text-[17px]   sm:text-[17px]  sm:text-[17px]          │ │
│  │    font-light       font-light      font-light              │ │
│  │  "/ 64" = text-[12px] sm:text-[13px] palette.textLight     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ↑ padding: mb-3 sm:mb-4, pb-3 sm:pb-4                          │
│                                                                  │
│  €485.000 — €1.250.000  (hidden lg:block)                        │
│  ↑ text-[22px] lg:text-[24px] font-light, palette.text, mb-4    │
│                                                                  │
│  ┌── Typologies + Units (hidden sm:flex, flex-row gap-6) ──────┐ │
│  │  Typologies              Available Units                    │ │
│  │  ↑ text-[9px]            ↑ text-[9px]                      │ │
│  │  tracking-[0.2em] mb-2   tracking-[0.2em] mb-2             │ │
│  │  palette.textLight       palette.textLight                  │ │
│  │                                                             │ │
│  │  Apartment from €485.000   MR-4A · Apt · 2 bed · 95 m²     │ │
│  │  Penthouse from €890.000   MR-12B · PH · 3 bed · 160 m²    │ │
│  │  ↑ text-[13px] font-light ↑ text-[13px] font-light         │ │
│  │    leading-relaxed          leading-relaxed                 │ │
│  │    palette.textMuted        palette.textMuted               │ │
│  │    "from €X" = palette.text ref = palette.text              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ↑ mb-5                                                          │
│                                                                  │
│  ┌── Mobile Chips (flex sm:hidden, flex-wrap gap-2) ───────────┐ │
│  │  [Apartment from €485.000] [Penthouse from €890.000]        │ │
│  │  ↑ text-[12px] font-light px-2.5 py-1 rounded-sm           │ │
│  │    bg: palette.bg, color: palette.textMuted                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ↑ mb-3                                                          │
│                                                                  │
│  ┌── Footer (mt-auto, flex justify-between, border-top) ──────┐ │
│  │  28 of 64 available · 55% built         View Project →     │ │
│  │  ↑ text-[11px] sm:text-[12px]           ↑ text-[11px]      │ │
│  │    font-light, palette.textLight          sm:text-[12px]    │ │
│  │  "· 55% built" solo si construction > 0   tracking-[0.15em]│ │
│  │                                           uppercase         │ │
│  │  Mobile: "View →" (sin "Project")         palette.accent    │ │
│  │  Desktop: "View Project →"                ArrowRight w-3.5  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ↑ pt-3 sm:pt-4                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Elementos Condicionales por Breakpoint

| Elemento | Móvil | Tablet (sm) | Desktop (lg) |
|----------|-------|-------------|--------------|
| Price overlay (gradient) | ✅ | ✅ | ❌ |
| Price inline | ❌ | ❌ | ✅ |
| Badge "New Development" | ❌ | ✅ | ✅ |
| Typologies + Units (tabla) | ❌ | ✅ | ✅ |
| Typology chips | ✅ | ❌ | ❌ |
| "View Project" (full text) | ❌ | ✅ | ✅ |
| "View →" (short) | ✅ | ❌ | ❌ |
| Border-x (laterales) | ❌ | ✅ | ✅ |
| Rounded corners | ❌ (rounded-none) | ✅ (rounded-sm) | ✅ (rounded-sm) |

#### Card container

```
className="group flex flex-col lg:flex-row overflow-hidden rounded-none sm:rounded-sm border-x-0 sm:border-x border-y sm:border"
style={{ background: palette.white, borderColor: palette.border }}
```

#### Imagen

```
className="relative lg:w-[44%] min-h-[260px] sm:min-h-[240px] lg:min-h-[360px] overflow-hidden"
```

- `img`: `absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]`
- Loading: `lazy`

---

## 6. Secciones de la Página — Diseño Pixel-Perfect

### 6.1 Título + Texto SEO (líneas 256–274)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 256–274.

```
┌─────────────────────────────────────────────────────────────────┐
│  padding: pt-20 sm:pt-28 md:pt-32 pb-6 sm:pb-10 md:pb-16      │
│  background: palette.white                                      │
│  container: max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12       │
│                                                                 │
│  🏗 New Developments                                            │
│  ↑ Building2 w-4 h-4 + text-[11px] tracking-[0.25em]           │
│    uppercase font-medium, palette.accent, mb-3 sm:mb-4          │
│                                                                 │
│  Off-Plan Properties in Spain                                   │
│  ↑ H1: text-[26px] sm:text-4xl md:text-5xl                     │
│    font-extralight leading-[1.1] tracking-[0.04em]              │
│    fonts.heading, palette.text, mb-3 sm:mb-5                    │
│                                                                 │
│  Explore our curated portfolio of new-build...                  │
│  ↑ p: text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9]│
│    font-light max-w-3xl, palette.textMuted                      │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Barra de Filtros Móvil — Sticky (líneas 277–296)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 277–296.  
**Condición**: Solo `isMobile`.

```
┌─────────────────────────────────────────────────────────────────┐
│  sticky top-[52px] z-30                                         │
│  flex items-center justify-between                              │
│  px-4 py-3                                                      │
│  background: palette.white                                      │
│  borderBottom: 1px solid palette.border                         │
│                                                                 │
│  6 developments              [🔧 Filters (3)]                  │
│  ↑ text-[13px] font-light    ↑ text-[13px] tracking-[0.08em]   │
│    palette.textMuted            uppercase font-light            │
│                                 px-3 py-2 rounded-sm            │
│                                 border: 1px solid palette.border│
│                                 SlidersHorizontal w-3.5 h-3.5   │
│                                                                 │
│                               (3) = badge:                      │
│                                 w-5 h-5 rounded-full            │
│                                 text-[10px] text-white           │
│                                 bg: palette.accent              │
│                                 solo si activeFilterCount > 0   │
└─────────────────────────────────────────────────────────────────┘
```

**Sentido del `top-[52px]`**: Se ancla debajo de la navbar (que mide 52px).

### 6.3 Panel de Filtros Móvil — Colapsable (líneas 298–313)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 298–313.  
**Condición**: `isMobile && showMobileFilters`.

```
┌─────────────────────────────────────────────────────────────────┐
│  px-4 py-4 space-y-4                                            │
│  background: palette.bg                                         │
│  borderBottom: 1px solid palette.border                         │
│                                                                 │
│  ┌── grid grid-cols-2 gap-3 ──────────────────────────────────┐ │
│  │  [Location ▼]    [Status ▼]                                │ │
│  │  [Typology ▼]    [Delivery ▼]                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ✕ Clear all   (solo si hasFilters)                             │
│  ↑ text-[12px] tracking-[0.1em] uppercase font-light           │
│    palette.textMuted, X w-3.5 h-3.5                             │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 Barra de Filtros Desktop (líneas 319–334)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 319–334.  
**Condición**: `!isMobile`.

```
┌─────────────────────────────────────────────────────────────────┐
│  mb-8 p-6 sm:p-8 rounded-sm mx-4 sm:mx-0                       │
│  background: palette.bg                                         │
│  border: 1px solid palette.border                               │
│                                                                 │
│  ┌── grid grid-cols-2 lg:grid-cols-4 gap-5 ───────────────────┐ │
│  │  [Location ▼]  [Status ▼]  [Typology ▼]  [Delivery ▼]    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ── border-top (mt-5 pt-4) ──  (solo si hasFilters)             │
│  ✕ Clear all filters                                            │
│  ↑ text-[12px] tracking-[0.1em] uppercase font-light           │
│    palette.textMuted, hover:opacity-60                          │
└─────────────────────────────────────────────────────────────────┘
```

### 6.5 Contador de Resultados Desktop (líneas 338–342)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 338–342.  
**Condición**: `!isMobile`.

```
6 developments found
↑ text-[13px] font-light, palette.textLight
  mb-6 pb-4 px-4 sm:px-0
  borderBottom: 1px solid palette.border
```

### 6.6 Lista de Tarjetas (líneas 344–355)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 344–355.

```
container: space-y-4 sm:space-y-6
wrapper: max-w-[1320px] mx-auto px-0 sm:px-6 lg:px-12

Empty state (py-20 px-4, text-center):
  Building2 w-10 h-10, palette.textLight, mb-4
  "No developments match..." text-[15px] font-light, palette.textMuted
  "Clear filters" mt-4 text-[13px] underline font-light, palette.accent
```

**Animación**: Cada `DevCard` envuelto en `FadeIn` con `delay={i * 0.08}`.

### 6.7 SEO: Browse by Location (líneas 357–370)

**Archivo**: `NewDevelopmentsPageV2.tsx`, líneas 357–370.

```
┌─────────────────────────────────────────────────────────────────┐
│  mt-12 sm:mt-16 pt-8 px-4 sm:px-0                              │
│  borderTop: 1px solid palette.border                            │
│                                                                 │
│  BROWSE BY LOCATION                                             │
│  ↑ text-[10px] tracking-[0.2em] uppercase font-medium mb-4     │
│    palette.textLight                                            │
│                                                                 │
│  Altea (1)  Jávea (1)  Moraira (1)  Calpe (1)  Benidorm (1)   │
│  ↑ flex flex-wrap gap-3                                         │
│    text-[13px] font-light, palette.accent                       │
│    count = filtro por municipality                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Z-Index Stack

| Elemento | z-index | Notas |
|----------|---------|-------|
| Mobile sticky filter bar | `z-30` | Debajo de navbar, encima del contenido |
| Layout navbar | `z-40` | Definido en Layout.tsx |
| Back to top button | `z-40` | Definido en Layout.tsx |

---

## 8. Dependencias

| Dependencia | Import | Uso |
|-------------|--------|-----|
| `Layout` | `@/components/layout` | Wrapper con navbar (`navVariant="solid"`) + footer. `activePath="/new-developments"`, `showBackToTop` |
| `SEOHead` | `@/components/shared/SEOHead` | Meta tags, Open Graph, Twitter Card |
| `FadeIn` | `@/components/shared/FadeIn` | Animación de entrada con IntersectionObserver (threshold 0.15, translateY 28px, duration 0.9s) |
| `useIsMobile` | `@/hooks/use-mobile` | Detección de breakpoint para lógica condicional |
| `palette` | `@/config/template` | Tokens de color: `.white`, `.bg`, `.text`, `.textMuted`, `.textLight`, `.accent`, `.border` |
| `fonts` | `@/config/template` | Token de fuente: `.heading` |
| `lucide-react` | — | Building2, X, ChevronDown, TrendingUp, ArrowRight, SlidersHorizontal |

---

## 9. Diferencias con V1 (`/new-developments`)

| Aspecto | V1 (`NewDevelopmentsPage.tsx`) | V2 (`NewDevelopmentsPageV2.tsx`) |
|---------|----|----|
| Hero | Sí (70vh con imagen de fondo) | No |
| Sección "Why Buy Off-Plan" | Sí | No |
| Sección "Benefits" (4 cards) | Sí | No |
| CTA final | Sí (dark section) | No |
| URL params (location slug) | Sí (`/in/:location`) | No |
| Mobile sticky filter | No | Sí |
| Mobile filter panel colapsable | No | Sí |
| Edge-to-edge cards móvil | No | Sí (rounded-none, border-x-0) |
| Price overlay en imagen (móvil) | No | Sí (gradient + text overlay) |
| Typology chips (móvil) | No | Sí |
| Min image height móvil | — | 260px |
| Card spacing móvil | — | space-y-4 (16px) |

---

## 10. Implementación Backend — Requisitos

### 10.1 API Endpoints Necesarios

| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `GET /api/new-developments` | GET | Lista con filtros | `?location=&status=&typology=&delivery=&page=&limit=` |
| `GET /api/new-developments/:slug` | GET | Detalle de una promoción | — |
| `GET /api/new-developments/filters` | GET | Opciones de filtro (faceted) | — |

### 10.2 Respuesta esperada

```json
{
  "data": [NewDevelopment],
  "total": 24,
  "page": 1,
  "limit": 12,
  "filters": {
    "locations": ["Altea", "Jávea", "Moraira"],
    "statuses": ["Pre-Launch", "Selling", "Under Construction", "Last Units"],
    "typologies": ["Apartment", "Penthouse", "Villa", "Duplex", "Townhouse"],
    "deliveries": ["Q2 2026", "Q4 2026", "Q2 2027"]
  }
}
```

### 10.3 Tabla de Base de Datos Sugerida

```sql
CREATE TABLE new_developments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  municipality TEXT NOT NULL,
  developer TEXT NOT NULL,
  delivery TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pre-Launch','Selling','Under Construction','Last Units')),
  construction INTEGER NOT NULL DEFAULT 0,
  available_units INTEGER NOT NULL,
  total_units INTEGER NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  trending BOOLEAN DEFAULT FALSE,
  typologies JSONB NOT NULL DEFAULT '[]',
  units JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_new_dev_municipality ON new_developments(municipality);
CREATE INDEX idx_new_dev_status ON new_developments(status);
CREATE INDEX idx_new_dev_delivery ON new_developments(delivery);
```

---

## 11. SEO

### Meta Tags
- **Title**: `"New Developments — Off-Plan Properties in Spain | {SITE_NAME}"`
- **Description**: 160 chars sobre nuevas promociones en España
- **H1**: Único: "Off-Plan Properties in Spain"

### Internal Linking
- Sección "Browse by Location" con links a cada municipio
- Cada tarjeta enlaza a `/new-developments/:slug`

### Preparado para JSON-LD
Cuando se implemente con datos reales, añadir schema `ItemList` con cada promoción como `ListItem`.

---

## 12. Assets Mock

| Variable | Asset | Uso |
|----------|-------|-----|
| `prop1` | `luxury-property-1.jpg` | Marea Residences |
| `prop2` | `luxury-property-2.jpg` | Sky Villas |
| `prop3` | `luxury-property-3.jpg` | Costa Serena |
| `detail1` | `property-detail-1.jpg` | Vista Marina |
| `detail2` | `property-detail-2.jpg` | The View Jávea |
| `detail3` | `property-detail-3.jpg` | One Green Way |

**Aspect ratio recomendado**: 16:10 para las imágenes de las tarjetas.

---

## 13. Paginación (Pendiente)

No implementada. Cuando supere ~12 promociones:
- **Desktop**: Paginación numérica
- **Móvil**: Botón "Load more" (infinite scroll no recomendado para SEO)
- **API**: Parámetros `page` y `limit`
