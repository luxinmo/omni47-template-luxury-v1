# NEW DEVELOPMENTS V2 — Implementación Pixel-Perfect

> **Ruta**: `/new-developments2`  
> **Archivo**: `src/components/luxury/NewDevelopmentsPageV2.tsx`  
> **Líneas**: ~377  
> **Última actualización**: 2026-03-23

---

## 1. Filosofía de Diseño

Página de listado de obra nueva **sin hero visual**. A diferencia de `/new-developments` (V1), esta versión prioriza el **acceso directo al contenido**: título SEO + texto descriptivo → filtros → tarjetas de promoción. El usuario llega y ve inmediatamente las promociones disponibles sin scroll.

**Sentido**: En un contexto de remarketing o tráfico orgánico, el usuario ya sabe lo que busca. El hero es un obstáculo. Eliminar el hero y las secciones informativas (benefits, off-plan explanation) reduce el tiempo hasta la primera interacción con el contenido real.

---

## 2. Arquitectura de la Página

```
┌─────────────────────────────────────────────────┐
│  Layout (navVariant="solid")                     │
│  ┌─────────────────────────────────────────────┐ │
│  │  SEOHead                                     │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Section: Título + Texto SEO                 │ │
│  │  ├── Etiqueta "New Developments" + icono     │ │
│  │  ├── H1: "Off-Plan Properties in Spain"      │ │
│  │  └── Párrafo descriptivo (max-w-3xl)         │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Mobile: Sticky Filter Bar (top-[52px])      │ │
│  │  ├── Contador de resultados                  │ │
│  │  └── Botón "Filters" con badge contador      │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Mobile: Collapsible Filter Panel            │ │
│  │  └── Grid 2 columnas de FilterSelect         │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Desktop: Filter Bar (4 columnas)            │ │
│  │  ├── Location / Status / Typology / Delivery │ │
│  │  └── "Clear all filters" (condicional)       │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Contador de resultados (desktop)            │ │
│  ├─────────────────────────────────────────────┤ │
│  │  Lista de DevCards                           │ │
│  │  ├── DevCard 1                               │ │
│  │  ├── DevCard 2                               │ │
│  │  └── ...                                     │ │
│  ├─────────────────────────────────────────────┤ │
│  │  SEO: Browse by Location (enlaces internos)  │ │
│  └─────────────────────────────────────────────┘ │
│  Footer                                          │
└─────────────────────────────────────────────────┘
```

---

## 3. Modelo de Datos

### 3.1 Interface `NewDevelopment`

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
  typologies: { type: string; from: number }[];  // Tipos disponibles con precio desde
  units: { ref: string; type: string; price: number; beds: number; sqm: number }[];  // Unidades específicas
  description: string;       // Descripción del proyecto (no se usa en card, solo en data)
  trending?: boolean;        // Marca visual de tendencia
}
```

**Sentido de cada campo**:
- `municipality` se usa para filtrado, `location` para display (puede incluir zona turística)
- `status` controla badges visuales: "Last Units" muestra badge negro en la imagen
- `trending` muestra badge "Trending" con icono TrendingUp en la imagen
- `typologies` vs `units`: tipologías son resumen (Apartment from €X), units son detalles específicos (ref, beds, sqm)
- `description` existe en data pero NO se muestra en la tarjeta (se usa en la página de detalle)

### 3.2 Filtros Derivados

```ts
ALL_LOCATIONS   = [...new Set(developments.map(d => d.municipality))]
ALL_STATUSES    = [...new Set(developments.map(d => d.status))]
ALL_TYPOLOGIES  = [...new Set(developments.flatMap(d => d.typologies.map(t => t.type)))]
ALL_DELIVERIES  = [...new Set(developments.map(d => d.delivery))].sort()
```

**Sentido**: Los filtros se generan dinámicamente desde los datos. No hay opciones hardcodeadas. Cuando se conecte al backend, estos arrays vendrán del API (faceted search).

---

## 4. Estado Interno

| Variable | Tipo | Default | Propósito |
|----------|------|---------|-----------|
| `filterLocation` | `string \| null` | `null` | Municipio seleccionado |
| `filterStatus` | `string \| null` | `null` | Estado de la promoción |
| `filterTypology` | `string \| null` | `null` | Tipo de unidad |
| `filterDelivery` | `string \| null` | `null` | Fecha de entrega |
| `showMobileFilters` | `boolean` | `false` | Panel de filtros móvil abierto/cerrado |

### Variables Derivadas

| Variable | Lógica |
|----------|--------|
| `filtered` | `useMemo` — aplica los 4 filtros con AND lógico |
| `hasFilters` | `boolean` — si algún filtro está activo (muestra "Clear all") |
| `activeFilterCount` | `number` — cuenta de filtros activos (badge en botón móvil) |

---

## 5. Componentes Internos

### 5.1 `FilterSelect`

Dropdown nativo estilizado con apariencia custom.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Etiqueta superior (ej. "Location") |
| `value` | `string \| null` | Valor seleccionado |
| `options` | `string[]` | Opciones disponibles |
| `onChange` | `(v: string \| null) => void` | Callback de cambio |

**UX crítica**: `font-size: 16px` en móvil (`text-[16px] sm:text-[13px]`) para **prevenir zoom automático en iOS Safari** al enfocar el select.

**Sentido**: Se usa un `<select>` nativo en lugar de un dropdown custom porque en móvil el select nativo ofrece mejor UX (picker nativo del OS). El icono `ChevronDown` se superpone como indicador visual.

### 5.2 `DevCard`

Tarjeta horizontal (desktop) / vertical (móvil) de promoción.

#### Layout Responsive

| Breakpoint | Layout | Imagen | Contenido |
|------------|--------|--------|-----------|
| **Móvil** (<640px) | Vertical (flex-col) | 260px min-h, edge-to-edge (sin border-x) | Padding 16px, precio en overlay sobre imagen |
| **Tablet** (640-1023px) | Vertical (flex-col) | 240px min-h, con bordes y rounded-sm | Padding 24px, tipologías + unidades visibles |
| **Desktop** (1024px+) | Horizontal (flex-row) | 44% width, 360px min-h | Padding 32px, precio inline, todo visible |

#### Anatomía de la Tarjeta

```
┌──────────────────────────────────────────────────────────┐
│  IMAGEN (44% desktop / 100% mobile)                      │
│  ┌──────────┐                           ┌──────────────┐ │
│  │Last Units│                           │ ↗ Trending   │ │
│  └──────────┘                           └──────────────┘ │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓ gradient (mobile only) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  €485.000 — €1.250.000  (mobile overlay)                 │
├──────────────────────────────────────────────────────────┤
│  CONTENT                                                  │
│  Location · [New Development]            [Status Badge]   │
│  Nombre del Proyecto (h3)                                 │
│  Developer · Delivery Q2 2027                             │
│  ┌──────────┬──────────┬──────────┐                      │
│  │Available │  Built   │ Delivery │  ← Stats row          │
│  │ 28 / 64  │   55%   │ Q2 2027  │                      │
│  └──────────┴──────────┴──────────┘                      │
│  €485.000 — €1.250.000  (desktop only)                   │
│  ┌─ Typologies ────────┬─ Available Units ──────────┐    │
│  │ Apartment from €485k │ MR-4A · Apt · 2bd · 95m²  │ sm+│
│  │ Penthouse from €890k │ MR-12B · PH · 3bd · 160m² │    │
│  └─────────────────────┴───────────────────────────┘    │
│  [Apt from €485k] [PH from €890k]  ← mobile chips       │
│  ─────────────────────────────────────────────────────   │
│  28 of 64 available · 55% built        View [Project] →  │
└──────────────────────────────────────────────────────────┘
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
| Rounded corners | ❌ | ✅ | ✅ |

**Sentido del price overlay móvil**: En móvil el precio es la información más importante. Mostrarlo sobre la imagen con un gradient oscuro permite al usuario escanear rápidamente sin necesidad de leer el contenido debajo.

**Sentido de ocultar typologies/units en móvil**: En pantalla pequeña, la densidad de información es contraproducente. Se reemplazan por chips compactos que muestran el resumen esencial.

---

## 6. Secciones de la Página

### 6.1 Título + Texto SEO

- **Padding top**: `pt-20 sm:pt-28 md:pt-32` — compensa la navbar fija
- **Contenido**:
  - Etiqueta con icono Building2 + "New Developments"
  - H1: `text-[26px] sm:text-4xl md:text-5xl font-extralight`
  - Párrafo SEO: max-width 3xl, describe el valor de comprar sobre plano
- **Sentido**: El H1 y el párrafo están optimizados para SEO. El título usa "Off-Plan Properties in Spain" como keyword principal. El texto incluye porcentajes y términos clave ("pre-construction prices", "bank-guaranteed deposit protection").

### 6.2 Barra de Filtros Móvil (Sticky)

- **Posición**: `sticky top-[52px] z-30` — se ancla debajo de la navbar (52px)
- **Contenido**: Contador de resultados (izquierda) + Botón "Filters" (derecha)
- **Badge**: Círculo con color accent mostrando el número de filtros activos
- **Sentido**: En móvil los filtros no caben en pantalla. El botón sticky permite acceder a ellos en cualquier momento del scroll. El badge numérico comunica que hay filtros activos sin necesidad de abrir el panel.

### 6.3 Panel de Filtros Móvil (Colapsable)

- **Trigger**: `showMobileFilters` toggle
- **Layout**: Grid 2 columnas (`grid-cols-2 gap-3`)
- **Background**: `palette.bg` para distinguir visualmente del contenido
- **Incluye**: 4 FilterSelect + botón "Clear all" condicional
- **Sentido**: Grid de 2 columnas en lugar de 1 aprovecha mejor el ancho en móvil sin ser demasiado apretado. Se colapsa para no ocupar espacio permanente.

### 6.4 Barra de Filtros Desktop

- **Layout**: Grid 4 columnas (`grid-cols-2 lg:grid-cols-4`)
- **Background**: `palette.bg` con borde
- **Padding**: `p-6 sm:p-8`
- **Incluye**: 4 FilterSelect + "Clear all filters" condicional
- **Solo visible**: cuando `!isMobile`
- **Sentido**: En desktop hay espacio suficiente para mostrar los 4 filtros en una sola fila. El fondo diferenciado separa visualmente los controles del contenido.

### 6.5 Contador de Resultados (Desktop)

- **Formato**: `"X development(s) found"`
- **Estilo**: `text-[13px] font-light` con border-bottom separador
- **Solo visible**: cuando `!isMobile` (en móvil está en la sticky bar)

### 6.6 Lista de Tarjetas

- **Spacing**: `space-y-4 sm:space-y-6` — 16px entre cards en móvil, 24px en tablet+
- **Container**: `px-0 sm:px-6 lg:px-12` — edge-to-edge en móvil
- **Empty state**: Icono Building2 + texto + botón "Clear filters"
- **Animación**: `FadeIn` con delay escalonado (`i * 0.08`)

### 6.7 SEO: Browse by Location

- **Posición**: Final de la página, separada por border-top
- **Contenido**: Lista de municipios con conteo de promociones
- **Sentido**: Internal linking para SEO. Cada ubicación podría enlazar a una versión filtrada de la página (preparado para implementar con query params o subrutas).

---

## 7. Z-Index Stack

| Elemento | z-index | Notas |
|----------|---------|-------|
| Mobile sticky filter bar | `z-30` | Debajo de navbar, encima del contenido |
| Layout navbar | `z-40` | Definido en Layout.tsx |
| Back to top button | `z-40` | Definido en Layout.tsx |

---

## 8. Formato de Precios

```ts
const fmt = (n: number) => new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
}).format(n);
```

- **Locale**: `de-DE` — usa punto como separador de miles (€485.000)
- **Sentido**: Formato europeo estándar para el mercado español/europeo. Sin decimales porque los precios inmobiliarios no requieren céntimos.

---

## 9. Dependencias

| Dependencia | Uso |
|-------------|-----|
| `Layout` | Wrapper con navbar + footer |
| `SEOHead` | Meta tags, Open Graph, Twitter Card |
| `FadeIn` | Animación de entrada con intersection observer |
| `useIsMobile` | Detección de breakpoint para lógica condicional |
| `palette` / `fonts` | Tokens de diseño centralizados |
| `lucide-react` | Iconos: Building2, X, ChevronDown, TrendingUp, ArrowRight, SlidersHorizontal |

---

## 10. Implementación Backend — Requisitos

### 10.1 API Endpoints Necesarios

| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `GET /api/new-developments` | GET | Lista de promociones con filtros | `?location=&status=&typology=&delivery=&page=&limit=` |
| `GET /api/new-developments/:slug` | GET | Detalle de una promoción | — |
| `GET /api/new-developments/filters` | GET | Opciones de filtro disponibles (faceted) | — |

### 10.2 Respuesta esperada de `GET /api/new-developments`

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
    "deliveries": ["Q2 2026", "Q4 2026", "Q2 2027", "Q3 2027", "Q4 2027", "Q1 2028"]
  }
}
```

**Sentido del campo `filters`**: Devolver las opciones de filtro junto con los resultados permite mostrar solo opciones con resultados (faceted search) y evita una segunda llamada al API.

### 10.3 CMS — Campos Requeridos por Promoción

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `slug` | string | ✅ | Auto-generado desde nombre |
| `name` | string | ✅ | |
| `location` | string | ✅ | Display text |
| `municipality` | string | ✅ | Para filtrado (puede ser FK a tabla de municipios) |
| `developer` | string | ✅ | |
| `delivery` | string | ✅ | Formato "Q[1-4] YYYY" |
| `status` | enum | ✅ | Pre-Launch / Selling / Under Construction / Last Units |
| `construction` | integer | ✅ | 0-100 |
| `available_units` | integer | ✅ | |
| `total_units` | integer | ✅ | |
| `price_min` | integer | ✅ | EUR |
| `price_max` | integer | ✅ | EUR |
| `image` | file/url | ✅ | Imagen principal (aspect ~16:10) |
| `description` | text | ✅ | Para detalle y meta description |
| `trending` | boolean | ❌ | Default false |
| `typologies` | json/relation | ✅ | Array de {type, from} |
| `units` | json/relation | ✅ | Array de {ref, type, price, beds, sqm} |

### 10.4 Tabla de Base de Datos Sugerida

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

## 11. Paginación (Pendiente)

La versión actual no implementa paginación. Cuando el número de promociones supere ~12, añadir:

- **Desktop**: Paginación numérica debajo de las cards
- **Móvil**: Botón "Load more" (infinite scroll no recomendado para SEO)
- **API**: Parámetros `page` y `limit`

---

## 12. Diferencias con V1 (`/new-developments`)

| Aspecto | V1 | V2 |
|---------|----|----|
| Hero | Sí (70vh con imagen de fondo) | No |
| Sección "Why Buy Off-Plan" | Sí | No |
| Sección "Benefits" (4 cards) | Sí | No |
| CTA final | Sí (dark section) | No |
| URL params (location slug) | Sí (`/in/:location`) | No |
| Mobile sticky filter | No | Sí |
| Mobile filter panel colapsable | No | Sí |
| Edge-to-edge cards móvil | No | Sí |
| Price overlay en imagen (móvil) | No | Sí |
| Typology chips (móvil) | No | Sí |

**Sentido**: V2 es una versión más directa y funcional, ideal para tráfico que ya conoce la marca. V1 es mejor para landing pages orgánicas donde el usuario necesita contexto educativo sobre obra nueva.

---

## 13. Assets Requeridos

| Asset | Uso actual | Producción |
|-------|-----------|------------|
| `luxury-property-1.jpg` | Imagen mock Marea Residences | Reemplazar por imagen real del proyecto |
| `luxury-property-2.jpg` | Imagen mock Sky Villas | Reemplazar por imagen real del proyecto |
| `luxury-property-3.jpg` | Imagen mock Costa Serena | Reemplazar por imagen real del proyecto |
| `property-detail-1.jpg` | Imagen mock Vista Marina | Reemplazar por imagen real del proyecto |
| `property-detail-2.jpg` | Imagen mock The View Jávea | Reemplazar por imagen real del proyecto |
| `property-detail-3.jpg` | Imagen mock One Green Way | Reemplazar por imagen real del proyecto |

**Aspect ratio recomendado**: 16:10 para las imágenes de las tarjetas.

---

## 14. SEO

### Meta Tags
- **Title**: `"New Developments — Off-Plan Properties in Spain | {SITE_NAME}"`
- **Description**: 160 chars sobre nuevas promociones en España
- **H1**: Único: "Off-Plan Properties in Spain"

### Internal Linking
- Sección "Browse by Location" con links a cada municipio (preparado para subrutas)
- Cada tarjeta enlaza a `/new-developments/:slug`

### Preparado para JSON-LD
Cuando se implemente con datos reales, añadir schema `ItemList` con cada promoción como `ListItem`.
