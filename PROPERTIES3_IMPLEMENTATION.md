# /properties3 — Property Listing V3 — Implementation Guide

## Overview

**Route:** `/properties3`  
**Component:** `src/components/luxury/LuxuryPropertyListingV3.tsx`  
**Lines:** ~1830  
**Purpose:** Unified property listing page with advanced filtering, Instagram-style Stories, promo cards for Branded Residences and New Developments, Off-Market restricted cards, and enquiry modals.

---

## Page Architecture

```
Layout (activePath="/properties")
├── SEOHead
├── [Mobile] MobileLocationPopup (fullscreen, z-200)
├── [Mobile] Sticky Search Bar (top-[64px], z-40)
│   ├── Location search button → opens MobileLocationPopup
│   ├── Filter button → opens MobileFilterSheet
│   └── Results count + Sort button → opens MobileSortSheet
├── [Desktop] Sticky Breadcrumbs + Filter Bar (top-[64px], z-50)
│   ├── LocationSearchDropdown (380px)
│   ├── Filters button → opens FilterSidebar (drawer, z-50)
│   ├── TypeDropdown
│   ├── PriceDropdown (with Sale/Rent/Holiday toggle)
│   ├── BedsDropdown
│   ├── AmenitiesDropdown (grouped: View, Outdoor, Indoor)
│   └── New Builds toggle
├── PropertyStories (z-10)
├── Main Results Grid
│   ├── Active filter chips (removable)
│   ├── Results header + Sort dropdown
│   ├── Property cards (list or 2-col tablet grid)
│   │   ├── PropertyCard (standard listing)
│   │   ├── OffMarketPropertyCard (blurred, restricted)
│   │   ├── BrandedResidencePromoCard (injected at position 2)
│   │   └── NewDevPromoCard (injected at position 4)
│   └── Pagination (Next + numbered)
├── [Mobile] Bottom Sticky Navigation (Call / Chat / Contact)
└── Enquiry Modal (triggered by Mail icon on PropertyCard)
```

---

## Data Structures

### FilterState

```typescript
interface FilterState {
  locations: { id: string; name: string; path: string; type: string }[];
  listingMode: "sale" | "rent" | "holiday";
  types: string[];
  priceMin: string;
  priceMax: string;
  hidePriceOnRequest: boolean;
  areaMin: string;
  areaMax: string;
  beds: string;        // "Any" | "1+" | "2+" | "3+" | "4+" | "5+"
  baths: string;       // "Any" | "1+" | "2+" | "3+" | "4+"
  amenities: string[];
  newBuilds: boolean;
  quickTags: string[];
}
```

### Property Data

```typescript
{
  id: number;
  image: string;
  gallery: string[];
  tag: string;         // "FOR SALE" | "NEW BUILD" | "OFF-MARKET"
  style: string;       // "Contemporary" | "Luxury" | "Traditional" | etc.
  location: string;
  title: string;       // Empty for off-market (auto-generated)
  excerpt: string;     // Empty for off-market
  beds: number;
  baths: number;
  sqm: number;
  plot: number | null;
  price: string;
  features: string[];
  offmarket: boolean;
}
```

---

## Component Inventory

### Internal Components (defined in LuxuryPropertyListingV3.tsx)

| Component | Type | Description |
|-----------|------|-------------|
| `TypeDropdown` | Desktop | Checkbox dropdown for property types |
| `PriceDropdown` | Desktop | Min/Max inputs + Sale/Rent/Holiday toggle + presets |
| `BedsDropdown` | Desktop | Pill selector (Any, 1+, 2+, ...) |
| `AmenitiesDropdown` | Desktop | Grouped chips (View, Outdoor, Indoor) |
| `FilterSidebar` | Desktop | Left drawer (420px) with full filter panel |
| `MobileLocationPopup` | Mobile | Fullscreen location picker with zones → cities → areas hierarchy + map toggle |
| `MobileFilterSheet` | Mobile | Fullscreen filter sheet matching FilterSidebar |
| `MobileSortSheet` | Mobile | Bottom sheet with sort options |
| `MobilePriceSelect` | Mobile | Bottom popup with manual input + preset buttons |
| `PropertyCard` | Both | Standard property listing card |
| `OffMarketPropertyCard` | Both | Blurred card with lock icon, opens enquiry modal |
| `BrandedResidencePromoCard` | Both | Branded residence promotional card (gold accent) |
| `NewDevPromoCard` | Both | New development promotional card |

### External Components

| Component | Path | Description |
|-----------|------|-------------|
| `PropertyStories` | `blocks/listing/PropertyStories.tsx` | Instagram-style story carousel |
| `LocationSearchDropdown` | `luxury/LocationSearchDropdown.tsx` | Autocomplete location search |
| `Layout` | `layout/Layout.tsx` | Page shell (Navbar + Footer) |
| `SEOHead` | `shared/SEOHead.tsx` | Meta tags |

---

## Feature: Property Stories

**Component:** `src/components/blocks/listing/PropertyStories.tsx`  
**Position:** Between the search/filter bar and the results grid.  
**Z-index:** `z-10` (below search bar z-40/z-50)

### Current Behavior (Frontend)

- **5 curated story groups:** Trending, Best €/m², 1ª Línea (Beachfront), New Listing, Most Saved
- **3 properties per group** shown as full-screen stories
- **Auto-advance:** 10 seconds per property, 8 seconds for end card
- **Progress bars:** Segmented progress indicators (one per property + end card)
- **End card:** Summary showing total count + CTA button ("Ver todas las propiedades...")
- **Viewed state:** Circles dim (grey border) after viewing. "Al día" indicator when all viewed.
- **Navigation:** Tap left 1/3 = previous, tap right 2/3 = next

### Admin Panel Requirements (WEB / CMS)

> ⚠️ **PENDIENTE DE DESARROLLO EN ADMIN**

El CMS (WEB / CMS) debe incluir una sección **"Stories"** bajo el apartado de Contenido o Marketing que permita:

#### 1. Gestión de Story Groups (CRUD + Reordenar)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `label` | string | Sí | Nombre mostrado debajo del círculo (ej: "Trending") |
| `icon` | select | Sí | Elegir entre set de iconos predefinidos |
| `gradient` | select | Sí | Tema de gradiente (paleta predefinida) |
| `coverImage` | image upload | Sí | Miniatura del círculo |
| `enabled` | boolean | Sí | Activar/desactivar visibilidad |
| `sortOrder` | number | Sí | Drag-and-drop para ordenar |
| `filterType` | enum | Sí | Cómo se seleccionan propiedades: `manual`, `auto-filter`, `smart` |
| `filterCriteria` | object | Condicional | Si es auto-filter: reglas (ej: "views > 200 esta semana") |
| `ctaLabel` | string | Sí | Texto del botón en la tarjeta final |
| `ctaHref` | string | Sí | Enlace del botón en la tarjeta final |
| `maxProperties` | number | Sí | Máximo de propiedades mostradas (default: 5) |

#### 2. Modos de Asignación de Propiedades

- **Manual:** El admin selecciona propiedades específicas para cada grupo y las ordena
- **Automático (Auto-filter):** El sistema selecciona automáticamente según criterios configurados:
  - Más vistas esta semana → Trending
  - Mejor precio/m² → Best €/m²
  - Con tag "Beachfront" o "1ª Línea" → Beachfront
  - Más recientes (últimos 7 días) → New Listing
  - Más guardadas en favoritos → Most Saved
- **Smart:** Algoritmo que combina múltiples señales

#### 3. Desde la Ficha de Propiedad

En la edición de cada propiedad, sección **"Stories"**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `showInStories` | boolean | Permitir que esta propiedad aparezca en stories |
| `storyGroups` | multi-select | En qué grupos puede aparecer (solo si asignación manual) |
| `storyReason` | string | Texto personalizado del badge de contexto (ej: "324 views this week"). Si vacío, auto-generado |
| `storyImage` | image (opcional) | Imagen alternativa para stories. Si vacía, usa la imagen principal |

#### 4. Configuración Global de Stories

| Ajuste | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Mostrar/ocultar la franja de stories en el listado |
| `autoAdvanceDuration` | number (seg) | `10` | Segundos por slide de propiedad |
| `endCardDuration` | number (seg) | `8` | Segundos en la tarjeta final |
| `maxPropertiesPerGroup` | number | `5` | Máximo de propiedades por grupo |

> 📄 Ver documentación técnica completa en `STORIES_IMPLEMENTATION.md`

---

## Feature: Off-Market Properties

> ✅ **IMPLEMENTADO EN FRONTEND — Activación funcional**

### Comportamiento Actual

- Las propiedades con `offmarket: true` en el array `PROPERTIES` se renderizan como `OffMarketPropertyCard`
- **Imagen:** Borrosa (`blur-lg scale-110`) con overlay oscuro + icono Lock
- **Título:** Auto-generado: `"{STYLE} FOR SALE OFF-MARKET"` (ej: "LUXURY VILLA FOR SALE OFF-MARKET")
- **Dirección:** Se muestra pero el contenido es restringido visualmente
- **REF:** Auto-generado desde el ID: `REF-{id.padStart(4, "0")}`
- **Features + Specs:** Se muestran normalmente (beds, baths, sqm, plot)
- **Precio:** Puede ser real o "Price on Request"
- **Click:** Abre modal de consulta privada con:
  - Preview de la propiedad (imagen borrosa + título + precio + REF)
  - Texto explicativo sobre portfolio exclusivo
  - Formulario: nombre, email, teléfono, mensaje, checkbox RGPD
  - Submit cierra el modal (pendiente integración backend)

### Activación

Para marcar una propiedad como off-market, se establece el flag `offmarket: true` en los datos de la propiedad. La lógica de renderizado en el grid es:

```tsx
p.offmarket
  ? <OffMarketPropertyCard key={p.id} property={p} />
  : <PropertyCard key={p.id} property={p} onEnquiry={...} />
```

### Pendiente Backend
- Envío real del formulario de consulta (captura de lead)
- Tracking de visualizaciones de propiedades off-market
- Control de acceso post-registro

---

## Feature: Branded Residence Promo Card

> ⚠️ **NO IMPLEMENTADO EN ADMIN — Preparado para desarrollo futuro**

### Estado Actual (Frontend Only)

- Se inyecta como `BrandedResidencePromoCard` en la posición 2 del grid de resultados
- **Datos hardcoded:** Four Seasons Private Residences, Marbella
- **Diseño:** Mismo layout que PropertyCard pero con:
  - Badge dorado: "BRANDED RESIDENCE" con icono Crown
  - Subtítulo: `Branded Residence | Four Seasons | REF-BR01`
  - Specs con rangos: "3–5 Beds", "180–450 m²"
  - Features: Beach Club, Spa, Concierge, Q2 2027
  - Precio rango: "€3,500,000 — €8,200,000"
- **Link:** Navega a `/branded-residences/four-seasons-marbella`

### Requisitos para Admin

El panel de administración necesita:

1. **Sección "Branded Residences"** para gestionar proyectos de branded residences
2. **Toggle de inyección** para decidir si mostrar la promo card en el listado de propiedades
3. **Selector de proyecto:** Elegir qué branded residence promocionar
4. **Posición en grid:** Configurar en qué posición del listado aparece
5. **Datos dinámicos:** Todos los campos actualmente hardcoded deben ser configurables

> 📄 Ver arquitectura de bloques compartida en `BLOCKS_CATALOG.md` (categoría "Projects")

---

## Feature: New Development Promo Card

> ⚠️ **NO IMPLEMENTADO EN ADMIN — Preparado para desarrollo futuro**

### Estado Actual (Frontend Only)

- Se inyecta como `NewDevPromoCard` en la posición 4 del grid de resultados
- **Datos hardcoded:** Marea Residences, Altea
- **Diseño:** Mismo layout que PropertyCard pero con:
  - Badge oscuro: "NEW DEVELOPMENT" con icono Building2
  - Subtítulo: `New Development | Residential | REF-ND01`
  - Specs con rangos: "1–4 Beds", "65–280 m²"
  - Features: Sea Views, Pool, Parking, Q4 2026
  - Precio rango: "€485,000 — €1,250,000"
- **Link:** Navega a `/new-developments/marea-residences-altea`

### Requisitos para Admin

Misma lógica que Branded Residence: gestionar desde Admin qué nuevo desarrollo se promociona y en qué posición.

---

## Feature: Enquiry Modal

> ✅ **IMPLEMENTADO EN FRONTEND**

### Tipos de Enquiry

1. **Enquiry estándar** (icono Mail en PropertyCard):
   - Preview de la propiedad (imagen real + título + precio + REF)
   - Formulario: nombre, email, teléfono, mensaje, RGPD
   - CTA: "Send Enquiry"

2. **Off-Market Enquiry** (click en OffMarketPropertyCard):
   - Preview de la propiedad (imagen borrosa + título auto-generado + precio + REF)
   - Texto "Private Listing" + explicación
   - Formulario idéntico
   - CTA: "Request Property Details"

### UX del Modal

- **Cierre:** Botón X en fila dedicada (no superpuesto al contenido) + click en backdrop
- **Scroll:** `max-h-[90vh] overflow-y-auto`
- **Z-index:** `z-50` (backdrop + modal)
- **Animación:** `fade-in zoom-in-95`

---

## Location System

### Hierarchy

```
Tourist Zone (Ibiza, Mallorca, Costa del Sol, Costa Blanca)
└── City (Ibiza Town, Marbella, Jávea...)
    └── Area (Marina Botafoch, Golden Mile, El Arenal...)
```

### Zones Defined

| Zone | Cities | Total Properties |
|------|--------|-----------------|
| Ibiza | 5 cities, 8 areas | 48 |
| Mallorca | 7 cities, 7 areas | 35 |
| Costa del Sol | 9 cities, 13 areas | 109 |
| Costa Blanca | 8 cities, 6 areas | 37 |

### Mobile Location Popup Features

- **Search:** Global search across all cities + areas
- **Zone drill-in:** Tap zone → see alphabetical city list with expandable areas
- **Select All:** Per-zone "All [Zone Name]" toggle
- **Area expansion:** When a city is selected, expand to show its areas
- **Map toggle:** Leaflet map with CartoDB tiles (center: Spain)
- **Chips:** Selected locations shown as removable chips
- **Footer:** "Clear all" + "Apply (N)" button

---

## Filter System

### Desktop Dropdowns

| Dropdown | Behavior |
|----------|----------|
| Type | Checkbox list: Villa, Penthouse, Apartment, Finca, New Build, Land |
| Price | Min/Max inputs + preset buttons + Sale/Rent/Holiday toggle + "Hide Price on Request" |
| Beds | Pill selector: Any, 1+, 2+, 3+, 4+, 5+ |
| Amenities | Grouped chips: View (4), Outdoor (6), Indoor (9) |
| New Builds | Simple toggle button |

### Desktop Filter Sidebar (Drawer)

- **Width:** 420px, slides from left
- **Z-index:** `z-50`
- **Sections:** Property Type (expandable categories), Quick Tags, Price, Bedrooms, Bathrooms, Living Area, Amenities, Listing Mode
- **Footer:** "Clear all" + "Show N properties"

### Mobile Filter Sheet

- **Fullscreen:** Fixed overlay
- **Same content** as FilterSidebar but with mobile-optimized inputs (MobilePriceSelect popup)
- **Footer:** "Clear all" + "Show N properties"

### Active Filter Chips

- Displayed above results
- Each chip removable individually
- "Clear all" link to reset

---

## Responsive Behavior

### Breakpoints

| Viewport | Layout | Key differences |
|----------|--------|----------------|
| Mobile (<768px) | Single column, full-width cards | Sticky search bar, bottom nav, fullscreen modals |
| Tablet (768px–1024px) | 2-column grid (`grid-cols-2`) | Compact cards (no excerpt, no features), tablet-specific breadcrumbs |
| Desktop (>1024px) | Full horizontal cards (12-col grid) | Inline dropdowns, drawer sidebar, sort dropdown |

### Card Adaptations

- **Mobile:** Price overlay on image with gradient, no desktop tag/mail row, no excerpt, no features
- **Tablet:** Single column card layout within 2-col grid, compact stats, no excerpt
- **Desktop:** Full 5+7 column layout, all content visible including excerpt and features

---

## Sort Options

| Value | Label |
|-------|-------|
| `premium` | Premium (default) |
| `price-asc` | Price: Low to High |
| `price-desc` | Price: High to Low |
| `newest` | Newest First |
| `oldest` | Oldest First |
| `beds-desc` | Most Bedrooms |
| `area-desc` | Largest Area |

> ⚠️ La ordenación es actualmente visual only — no hay lógica de sorting implementada.

---

## Z-Index Stack

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Mobile Location Popup | `z-200` | MobileLocationPopup |
| Mobile Price Select | `z-200` | MobilePriceSelect popup |
| Modals (Enquiry / Off-Market) | `z-50` | Backdrop + Modal |
| Filter Sidebar / Sheet | `z-50` | FilterSidebar / MobileFilterSheet |
| Sort Sheet | `z-50` | MobileSortSheet |
| Dropdowns | `z-60` | Type, Price, Beds, Amenities |
| Search Bar (Desktop) | `z-50` | Sticky header |
| Search Bar (Mobile) | `z-40` | Sticky search |
| Stories | `z-10` | PropertyStories |
| Bottom Nav | `z-40` | Mobile sticky nav |

---

## Pending Backend Integration

| Feature | Status | Notes |
|---------|--------|-------|
| Property data from API | ❌ Pending | Currently hardcoded `PROPERTIES` array |
| Filter logic | ❌ Pending | UI functional, no actual filtering |
| Sort logic | ❌ Pending | UI functional, no actual sorting |
| Pagination | ❌ Pending | Visual only (Next button + page numbers) |
| Enquiry form submission | ❌ Pending | Currently `preventDefault()` + close modal |
| Off-Market lead capture | ❌ Pending | Form exists, no backend |
| Stories data from API | ❌ Pending | Hardcoded `STORY_GROUPS` in PropertyStories |
| Stories admin CRUD | ❌ Pending | CMS section needed (see Stories section above) |
| Branded Residence injection | ❌ Pending | Admin configuration needed |
| New Development injection | ❌ Pending | Admin configuration needed |
| Location data | ❌ Pending | Hardcoded `TOURIST_ZONES` with counts |
| Results count | ❌ Pending | Hardcoded "8 properties" in filter footer |

---

## File Dependencies

```
src/components/luxury/LuxuryPropertyListingV3.tsx
├── src/components/layout/Layout.tsx
├── src/components/shared/SEOHead.tsx
├── src/components/luxury/LocationSearchDropdown.tsx
├── src/components/blocks/listing/PropertyStories.tsx
├── src/hooks/use-mobile.tsx (useIsMobile, useIsTablet)
├── src/config/template.ts (brand)
└── src/assets/ (luxury-hero, property images)
```

---

## Related Documentation

- `STORIES_IMPLEMENTATION.md` — Detailed stories component architecture + admin schema
- `OFFMARKET_IMPLEMENTATION.md` — Off-market property flow (legacy V1)
- `BLOCKS_CATALOG.md` — Full component library index
- `FUNCTIONAL_AUDIT.md` — Feature audit across all pages
- `PROJECT_INVENTORY.md` — Page and section inventory
