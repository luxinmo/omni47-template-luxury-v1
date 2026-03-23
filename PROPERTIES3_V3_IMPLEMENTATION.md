# LuxuryPropertyListingV3 — Implementación Pixel-Perfect

> **Ruta:** `/properties3`  
> **Archivo:** `src/components/luxury/LuxuryPropertyListingV3.tsx`  
> **Líneas:** 1,830  
> **Componente:** `LuxuryPropertyListingV3` (default export)

---

## 📐 Arquitectura General

Usa `<Layout>` como wrapper con navbar y footer. Toda la lógica de filtrado, ordenación y visualización está dentro del componente.

```
┌─────────────────────────────────────────────────┐
│ LAYOUT (Navbar + Footer)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─── MOBILE/TABLET ──────────────────────────┐ │
│ │ Sticky Search Bar (top-[64px])              │ │
│ │ · Location button → Location Popup          │ │
│ │ · Filter button → Filter Sheet              │ │
│ │ · Results count + Sort → Sort Sheet         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─── DESKTOP ─────────────────────────────────┐ │
│ │ Sticky Bar (top-[64px]/[80px])              │ │
│ │ · Breadcrumbs                               │ │
│ │ · LocationSearchDropdown + divider          │ │
│ │ · Filters button → FilterSidebar            │ │
│ │ · Type / Price / Beds / Amenities dropdowns │ │
│ │ · New Builds toggle                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ OVERLAYS:                                       │
│ · FilterSidebar (desktop, slide from left)      │
│ · MobileFilterSheet (fullscreen)                │
│ · MobileSortSheet (bottom action sheet)         │
│ · MobileLocationPopup (fullscreen, 3-level)     │
│ · MobilePriceSelect (bottom sheet per input)    │
│ · Enquiry Modal (standard + off-market)         │
│                                                 │
│ PROPERTY STORIES (Instagram-style carousel)     │
│                                                 │
│ MAIN RESULTS:                                   │
│ · Active filter chips                           │
│ · Results header + sort (desktop dropdown)      │
│ · Property list:                                │
│   - PropertyCard (standard)                     │
│   - OffMarketPropertyCard (blurred, modal)      │
│   - BrandedResidencePromoCard (at index 2)      │
│   - NewDevPromoCard (at index 4)                │
│ · Pagination                                    │
│                                                 │
│ MOBILE: Bottom Sticky Nav (Call/Chat/Contact)   │
└─────────────────────────────────────────────────┘
```

---

## 🎛️ Estado Interno

| Variable | Tipo | Default | Propósito |
|----------|------|---------|-----------|
| `filtersOpen` | `boolean` | `false` | Sidebar/Sheet de filtros visible |
| `sortOpen` | `boolean` | `false` | Sort dropdown/sheet visible |
| `sortValue` | `string` | `"premium"` | Criterio de ordenación actual |
| `filters` | `FilterState` | `defaultFilters` | Estado completo de todos los filtros |
| `mobileSearch` | `string` | `""` | Input de búsqueda móvil (no usado activamente) |
| `locationPopupOpen` | `boolean` | `false` | Popup de ubicación móvil visible |
| `enquiryProperty` | `Property \| null` | `null` | Propiedad seleccionada para enquiry modal |
| `storiesActive` | `boolean` | `false` | Stories en reproducción (oculta bottom nav) |

---

## 📋 FilterState Interface

```typescript
interface FilterState {
  locations: { id: string; name: string; path: string; type: string }[];
  listingMode: "sale" | "rent" | "holiday";
  types: string[];          // ej: ["Villa", "Modern Villa"]
  priceMin: string;         // ej: "1000000"
  priceMax: string;
  hidePriceOnRequest: boolean;
  areaMin: string;          // m²
  areaMax: string;
  beds: string;             // "Any" | "1+" | "2+" | ...
  baths: string;
  amenities: string[];      // ej: ["Sea Views", "Pool"]
  newBuilds: boolean;
  quickTags: string[];      // ej: ["Luxury", "Modern"]
}
```

---

## 🏗️ Secciones Detalladas

### 1. DESKTOP STICKY SEARCH BAR (líneas 1638-1662)

**Qué hace:** Barra de búsqueda y filtros fija debajo de la navbar.

**Especificaciones:**
- `sticky top-[64px] sm:top-[80px] z-50 bg-white border-b border-neutral-200`
- Max width: `max-w-[1400px]`
- **Row 1:** Breadcrumbs (Home > Properties > All Locations)
- **Row 2:** 
  - `LocationSearchDropdown` (w-[380px]) — componente externo
  - Divider vertical `w-px h-8 bg-neutral-200`
  - Botón "Filters" con badge de count → abre FilterSidebar
  - `TypeDropdown` — checkboxes para tipos de propiedad
  - `PriceDropdown` — inputs numéricos + presets + toggle Sale/Rent/Holiday
  - `BedsDropdown` — botones de selección única
  - `AmenitiesDropdown` — pills toggleables agrupados por categoría
  - Toggle "New Builds" — pill on/off

**Patrón de dropdown activo:** Cuando tiene selección, el botón pasa a `bg-luxury-black text-white` con badge counter blanco.

**Sentido:** Acceso rápido a filtros sin scroll. El LocationSearch está separado por divider porque es el filtro primario.

### 2. MOBILE STICKY SEARCH BAR (líneas 1597-1636)

**Qué hace:** Versión compacta para mobile/tablet.

**Especificaciones:**
- `sticky top-[64px] z-40 bg-white border-b border-neutral-200 px-3 py-2.5`
- **Row 1:** Location button (flex-1) + Filter button (w-10 h-10)
  - Location muestra nombres seleccionados o placeholder
  - Badge de count en location si hay selecciones
  - Filter tiene badge rojo si hay filtros activos
- **Row 2:** Results count (izquierda) + Sort button (derecha)
  - Sort muestra label actual, abre MobileSortSheet

**Sentido:** En mobile el espacio es limitado. Location y filtros son las acciones principales. Sort está secundario pero accesible.

### 3. DESKTOP DROPDOWNS (líneas 127-253)

#### TypeDropdown
- `w-[300px]`, checkboxes con labels
- 6 tipos base: Villa, Penthouse, Apartment, Finca, New Build, Land
- Badge de conteo cuando hay selección

#### PriceDropdown
- `w-[420px]`, la más compleja
- **Toggle triple:** For Sale / For Rent / Holiday (cambia contexto de precios)
- Inputs numéricos: Min + Max con `inputMode="numeric"`
- **Smart presets logic:**
  - Si NO hay min seleccionado → muestra presets de mínimo
  - Si HAY min seleccionado → muestra solo presets mayores que el min seleccionado
- Checkbox "Hide Price on Request"
- Focus ring: `focus:ring-1 focus:ring-luxury-black/10`

**Sentido:** La lógica smart de presets evita que el usuario seleccione un max menor que el min. El triple toggle contextualiza los rangos de precio.

#### BedsDropdown
- `w-[320px]`, botones en fila
- Options: Any, 1+, 2+, 3+, 4+, 5+
- Selección única (no multi)

#### AmenitiesDropdown
- `w-[480px] max-h-[420px] overflow-y-auto`
- Agrupados: View (4), Outdoor (6), Indoor (9) = 19 amenities
- Pills toggleables, no checkboxes
- Botón "Clear" cuando hay selección

### 4. FILTER SIDEBAR — Desktop (líneas 304-509)

**Qué hace:** Panel lateral deslizante desde la izquierda.

**Especificaciones:**
- `fixed top-0 left-0 h-full w-[420px] z-50`
- Backdrop: `bg-luxury-black/40 backdrop-blur-sm`
- Animación: `animate-in slide-in-from-left duration-300`

**Secciones:**
1. **Header:** Título + "Clear filters" + Close button
2. **Active chips:** Si hay filtros activos, strip horizontal con X por chip
3. **Property Type:** 3 categorías expandibles (Houses, Flats, Lands)
   - Checkbox "All" por categoría → selecciona todos los subtipos
   - Badge rojo con conteo parcial
   - Expandir → lista de subtipos con checkboxes individuales
4. **Quick Tags:** Pills toggleables (New Build, Luxury, Modern, Sea Views, 1ª Línea Mar)
5. **Price:** Inputs manuales + smart presets (misma lógica que dropdown)
6. **Bedrooms:** Botones de selección (Any a 5+)
7. **Bathrooms:** Botones de selección (Any a 4+)
8. **Living Area:** Inputs Min/Max (m²)
9. **Amenities:** 8 pills toggleables
10. **Listing Mode:** Toggle Sale/Rent/Holiday en card `bg-neutral-50`
11. **Sticky footer:** "Clear all" + "Show {N} properties"

**Sentido:** El sidebar contiene TODOS los filtros posibles. Es la versión expandida de lo que los dropdowns muestran parcialmente.

### 5. MOBILE LOCATION POPUP (líneas 629-971)

**Qué hace:** Selector de ubicación fullscreen con jerarquía de 3 niveles.

**Especificaciones:**
- `fixed inset-0 z-[200] bg-white`
- Animación: `animate-in slide-in-from-bottom duration-300`

**Estructura jerárquica:**
```
Zone (Tourist Zone)
  └── City
       └── Area (urbanización)
```

**4 zonas turísticas con datos:**
- Ibiza (48 props): 5 ciudades, múltiples áreas
- Mallorca (35 props): 7 ciudades con áreas
- Costa del Sol (109 props): 9 ciudades, áreas detalladas
- Costa Blanca (37 props): 9 ciudades con áreas

**UX Flow:**

**Vista inicial:**
- Lista de zonas turísticas (click → drill down)
- Popular locations como pills debajo

**Búsqueda global:**
- Input en top (`text-[16px] bg-neutral-100 rounded-lg`)
- Busca en ALL_SEARCHABLE (ciudades + áreas)
- Resultados muestran nombre + zona + tipo
- Checkbox por resultado

**Vista de zona (drill down):**
- Back button en header
- "All {Zone}" checkbox para seleccionar toda la zona
- Lista alfabética agrupada por letra (sticky letter headers)
- Ciudades con:
  - MapPin icon + nombre + contador
  - Si tiene áreas: botón "All" o "{N} areas" expandible
  - Al expandir: lista de áreas con checkboxes individuales

**Chips de selección:**
- Strip horizontal debajo del search
- Cada chip con X para eliminar
- Botón "Clear" global

**Mapa:**
- Toggle mapa/lista en header
- Leaflet con tiles de CartoDB light
- `h-[180px]` debajo del search

**Footer sticky:**
- "Clear all" + "Apply ({N})"

**Sentido:** La jerarquía Zone > City > Area refleja cómo los compradores internacionales piensan: primero la costa/isla, luego el municipio, luego la zona específica.

### 6. MOBILE FILTER SHEET (líneas 1053-1258)

**Qué hace:** Versión mobile del FilterSidebar.

**Especificaciones:**
- Fullscreen en mobile, `max-h-[85vh] rounded-t-2xl` en tablet
- Mismas secciones que FilterSidebar pero optimizadas para touch
- Precio usa `MobilePriceSelect` en lugar de inputs directos

### 7. MOBILE PRICE SELECT (líneas 973-1051)

**Qué hace:** Selector de precio custom para mobile con bottom sheet.

**Especificaciones:**
- Botón trigger: muestra precio formateado o placeholder
- Bottom sheet al tocar:
  - Header con título + close
  - Input numérico editable con símbolo € + botón "OK"
  - Lista de presets scrolleable
  - Preset activo: `bg-neutral-100 font-medium`

**Smart formatting:**
- `>= 1M` → `"2M€"`
- `< 1M` → `"600.000€"` (formato español)

### 8. MOBILE SORT SHEET (líneas 1260-1292)

- Bottom action sheet con backdrop blur
- Drag handle (pill gris centrada)
- 7 opciones: Premium, Price Low/High, Newest, Oldest, Most Bedrooms, Largest Area
- Selección: `font-medium bg-neutral-50`
- Cancel button

### 9. PROPERTY STORIES (línea 1676-1678)

- Componente externo: `<PropertyStories>`
- `onActiveChange={setStoriesActive}` → cuando se reproduce una story, oculta el bottom nav
- Mobile: full width con border-bottom
- Desktop: dentro de `max-w-[1400px]` con padding

### 10. ACTIVE FILTER CHIPS (líneas 1682-1693)

- `flex flex-wrap items-center gap-2`
- Chips: `bg-neutral-100 text-[12px] font-medium rounded-full`
- X button por chip
- "Clear all" link underlined

**Lógica de buildActiveChips():**
- Locations → 1 chip por ubicación
- Types → 1 chip por tipo
- Price → 1 chip (rango, "From X", o "Up to X")
- Area → 1 chip
- Beds/Baths → 1 chip si ≠ "Any"
- Amenities → 1 chip por amenity
- Quick tags → 1 chip por tag
- New Builds → 1 chip
- Hide POR → 1 chip

---

## 🃏 Card Variants (4 tipos)

### PropertyCard (líneas 1410-1458)

**Layout responsive:**
- **Desktop:** `grid-cols-12` → imagen col-5 + contenido col-7 + `mb-6`
- **Tablet:** `grid-cols-1` (apilado) dentro de `grid grid-cols-2 gap-4`
- **Mobile:** `grid-cols-1` full width

**Imagen:**
- `aspect-[16/10] min-h-[180px]`
- Tag "NEW BUILD" badge si aplica
- Gallery counter `1/{total}` esquina inferior derecha
- **Mobile/Tablet:** Gradiente oscuro bottom + precio superpuesto `text-[17px] font-semibold`

**Contenido:**
- **Desktop only:** Tag badge + Mail icon (abre enquiry modal)
- Location: `tracking-[0.14em] uppercase`
- Subtitle: "Detached houses | Style | REF-XXXX"
- Title: H2, `text-[15px] md:[19px]` uppercase
- **Desktop only:** Excerpt (2 líneas max)
- Specs grid: 4 columnas (Beds, Baths, Built, Plot)
  - Cada una: label `text-[11px] uppercase` + valor `text-[15px]`
- **Desktop only:** Features como pills con bullet dots
- **Desktop only:** Precio `text-2xl md:[28px] font-extralight` en footer con border-top

**Sentido:** La tarjeta es el elemento de conversión principal. En desktop muestra toda la info; en mobile prioriza imagen + precio + specs.

### OffMarketPropertyCard (líneas 1460-1558)

**Diferencias vs PropertyCard:**
- Imagen: `filter blur-lg scale-110` + overlay `bg-luxury-black/40`
- Lock icon grande + texto "Off-Market" centrado
- Badge "OFF-MARKET" con `bg-amber-50`
- Excerpt italic con Lock icon: "Exclusive listing — contact us..."
- Footer: precio + "Request access" con Lock icon
- **Click en toda la tarjeta** → abre modal (no link)

**Modal Off-Market:**
- Backdrop: `bg-luxury-black/60 backdrop-blur-sm`
- Preview con imagen blurred
- Lock icon + "Private Listing" label
- Texto explicativo
- Form: Full name, Email, Phone, Message
- Terms checkbox
- CTA: "Request Property Details"

**Sentido:** Off-market genera exclusividad y urgencia. El blur visual indica contenido premium detrás de una barrera de lead capture.

### BrandedResidencePromoCard (líneas 1307-1356)

**Diferencias vs PropertyCard:**
- Badge: Crown icon + "Branded Residence" en `bg-luxury-gold`
- **Desktop:** Tag badge en gold con border gold
- Location, subtitle con "Branded Residence | Four Seasons | REF-BR01"
- Specs muestran rangos: "3–5" beds, "180–450 m²"
- Features: Beach Club, Spa, Concierge, Q2 2027
- Link a: `/branded-residences/four-seasons-marbella`

**Sentido:** Promo card integrada visualmente como una propiedad más pero con identidad de marca premium.

### NewDevPromoCard (líneas 1358-1408)

**Diferencias vs PropertyCard:**
- Badge: Building2 icon + "New Development" en `bg-luxury-black/60 backdrop-blur-sm`
- Subtitle: "New Development | Residential | REF-ND01"
- Specs muestran rangos: "1–4" beds, "65–280 m²"
- Features: Sea Views, Pool, Parking, Q4 2026
- Link a: `/new-developments/marea-residences-altea`

### Posicionamiento de Promo Cards

```javascript
PROPERTIES.forEach((p, idx) => {
  if (idx === 2) items.push(<BrandedResidencePromoCard />);
  if (idx === 4) items.push(<NewDevPromoCard />);
  items.push(p.offmarket ? <OffMarketPropertyCard /> : <PropertyCard />);
});
```

Las promo cards se insertan **antes** del índice 2 y 4, intercaladas naturalmente.

---

## 🔍 Sistema de Búsqueda Desktop

### LocationSearchDropdown

- Componente externo importado (`./LocationSearchDropdown`)
- `w-[380px] shrink-0`
- Maneja `selected` y `onSelectedChange` igual que el mobile popup
- Funcionalidad de autocompletado con la misma jerarquía de datos

---

## 📊 Datos de Ubicación

### 4 Tourist Zones

| Zona | Properties | Ciudades | Áreas |
|------|-----------|----------|-------|
| Ibiza | 48 | 5 (Ibiza Town, San Antonio, San José, San Juan, Santa Eulalia) | 11 |
| Mallorca | 35 | 7 (Andratx, Calvià, Deià, Palma, Pollença, Sóller, Valldemossa) | 8 |
| Costa del Sol | 109 | 9 (Benahavís, Benalmádena, Estepona, Fuengirola, Málaga, Marbella, Mijas, Nerja, Sotogrande) | 13 |
| Costa Blanca | 37 | 9 (Alicante, Altea, Benidorm, Calpe, Dénia, Jávea, Moraira, Torrevieja, Villajoyosa) | 7 |

### Popular Cities (acceso rápido)
Marbella (62), Jávea (22), Ibiza Town (18), Estepona (28), Altea (15), Palma (12)

---

## 📊 Sort Options

| Value | Label |
|-------|-------|
| `premium` | Premium (default) |
| `price-asc` | Price: Low to High |
| `price-desc` | Price: High to Low |
| `newest` | Newest First |
| `oldest` | Oldest First |
| `beds-desc` | Most Bedrooms |
| `area-desc` | Largest Area |

---

## 📱 Breakpoints Responsive

| Elemento | Mobile (<768px) | Tablet (768-1023px) | Desktop (≥1024px) |
|----------|----------------|--------------------|--------------------|
| Search bar | Sticky, location + filter buttons | Mismo que mobile | Full horizontal con dropdowns |
| Filters | MobileFilterSheet (fullscreen) | MobileFilterSheet (85vh) | FilterSidebar (420px, left) |
| Sort | MobileSortSheet (bottom) | MobileSortSheet (bottom) | Dropdown inline |
| Location | MobileLocationPopup (fullscreen) | MobileLocationPopup (fullscreen) | LocationSearchDropdown (inline) |
| Cards | 1 col, full width (px-0) | 2 col grid | 1 col horizontal (12-col grid) |
| Card image | aspect-[16/10], price overlay | aspect-[16/10], price overlay | col-5, full height |
| Card content | Minimal (title, specs) | Minimal (title, specs) | Full (tag, excerpt, features, price) |
| Stories | Full width, border-bottom | Full width, border-bottom | max-w-[1400px] with padding |
| Bottom nav | Fixed (Call/Chat/Contact) | Fixed (Call/Chat/Contact) | Hidden |
| Pagination | Full width | Full width | Centered |

---

## 🎨 Tokens de Diseño Usados

| Token | Uso |
|-------|-----|
| `text-luxury-black` | Color principal |
| `text-luxury-black/XX` | Opacidades |
| `bg-luxury-black` | Botones activos, toggles |
| `text-luxury-gold` | Branded badge |
| `bg-luxury-gold` | Branded badge background |
| `bg-neutral-50` | Card backgrounds |
| `bg-neutral-100` | Chip backgrounds, search input |
| `border-neutral-200` | Bordes principales |
| `bg-red-500` | Filter count badges |

---

## 🧩 Z-Index Stack

| Capa | z-index | Elemento |
|------|---------|----------|
| Layout navbar | 50 | Via Layout component |
| Desktop search bar | 50 | `sticky top-[64px]` |
| Mobile search bar | 40 | `sticky top-[64px]` |
| Bottom nav | 40 | `fixed bottom-0` |
| Dropdowns | 60 | Absolutos dentro de sticky |
| Filter/Sort overlays | 50 | `fixed` with backdrop |
| Location popup | 200 | `fixed inset-0` |
| MobilePriceSelect | 200 | `fixed inset-0` (within filter) |
| Stories | 10 | `relative z-10` |

---

## 🔗 Dependencias

| Componente/Módulo | Ruta | Función |
|-------------------|------|---------|
| `Layout` | `@/components/layout` | Wrapper con navbar/footer |
| `SEOHead` | `@/components/shared/SEOHead` | Meta tags |
| `LocationSearchDropdown` | `./LocationSearchDropdown` | Dropdown de ubicación desktop |
| `PropertyStories` | `@/components/blocks/listing/PropertyStories` | Instagram stories |
| `useIsMobile, useIsTablet` | `@/hooks/use-mobile` | Breakpoint hooks |
| `brand` | `@/config/template` | Brand name |
| 7 asset images | `@/assets/*` | Imágenes mock |
| `leaflet` | npm | Mapa en location popup (dynamic import) |

---

## 🔌 APIs Pendientes (Backend)

| Endpoint | Propósito |
|----------|-----------|
| `GET /api/properties` | Lista de propiedades con filtros y paginación |
| `GET /api/locations` | Jerarquía de ubicaciones con conteos dinámicos |
| `POST /api/enquiries` | Envío de formulario de consulta |
| `POST /api/off-market-requests` | Solicitud de acceso a propiedad off-market |
| `GET /api/promo-cards` | Cards de branded/newdev para inyectar dinámicamente |

---

## 🔄 Helpers y Utilidades

### `formatPrice(val: string): string`
- `≥ 1M` → `"€1M"` o `"€1.5M"`
- `≥ 1K` → `"€500K"`
- Otros → `"€{n}"`

### `buildActiveChips(filters: FilterState): ActiveChip[]`
Convierte el estado de filtros en array de chips mostrables. Cada chip tiene `key`, `label`, `group`.

### `removeChip(filters: FilterState, chip: ActiveChip): FilterState`
Devuelve nuevo FilterState sin el filtro del chip eliminado. Switch por `chip.group`.

### `useDropdown(): { open, setOpen, ref }`
Hook reutilizable para dropdowns con click-outside detection via `mousedown` event listener.

---

## 📝 Property Data (Mock)

8 propiedades hardcoded con estructura:

```typescript
{
  id: number;
  image: string;
  gallery: string[];
  tag: "FOR SALE" | "NEW BUILD" | "OFF-MARKET";
  style: string;
  location: string;
  title: string;       // uppercase, vacío para off-market
  excerpt: string;      // vacío para off-market
  beds: number;
  baths: number;
  sqm: number;
  plot: number | null;
  price: string;        // "€4,650,000" o "Price on Request"
  features: string[];
  offmarket: boolean;
}
```

**Distribución:**
- 6 propiedades estándar
- 2 propiedades off-market (id 10 y 11)
- 1 promo branded (insertada en posición 2)
- 1 promo new dev (insertada en posición 4)
