# FUNCTIONAL AUDIT — Luxury Real Estate Template

> Inventario completo de funcionalidades implementadas en el código actual.
> Generado: 2026-03-02

---

## 1. Home2LandingPage (`/`)

### Datos que consume (hardcoded)
| Constante | Campos | Tipos |
|---|---|---|
| `HERO_SLIDES` | `image`, `headline`, `sub` | `string` × 3 |
| `PROPERTIES` | `image`, `name`, `location`, `price`, `beds`, `baths`, `sqm`, `ref` | `string` × 5, `number` × 3 |
| `OFF_MARKET` | `image`, `name`, `location`, `price`, `beds`, `baths`, `sqm`, `ref` | `string` × 5, `number` × 3 |
| `NEW_DEVELOPMENTS` | `image`, `name`, `location`, `priceFrom`, `units`, `completion` | `string` × 4, `number` × 1 |
| `NEW_DEV_STATS` | `value`, `label`, `icon` | `string` × 2, `LucideIcon` |
| `DESTINATIONS` | `name`, `count`, `image` | `string` × 2, `number` |
| `SERVICES` | `num`, `title`, `desc`, `icon` | `string` × 3, `LucideIcon` |
| `BLOG_POSTS` | `image`, `date`, `title`, `excerpt` | `string` × 4 |
| `STATS` | `value`, `label` | `string` × 2 |
| `TESTIMONIALS` | `quote`, `author`, `location` | `string` × 3 |

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Click indicador hero slide | `button` | Cambia `currentSlide` |
| Click indicador testimonial | `button` | Cambia `activeTestimonial` |
| Click "All Properties" | `<a href="/properties">` | Navega a `/properties` |
| Click "Sell With Us" | `<a href="/contact">` | Navega a `/contact` |
| Click "Request Access" (off-market) | `<a href="#">` | No implementado (placeholder `#`) |
| Click "Watch Our Story" | Visual only | No implementado (sin href real) |
| Click card de propiedad | `cursor-pointer` | Solo visual, no enlaza a detalle |
| Click destino | `<a href="#">` | No implementado |
| Click blog post | `<a href="/blog">` | Navega a `/blog` |
| Newsletter submit | `form onSubmit` | `e.preventDefault()` — no envía nada |

### Estado interno
| Estado | Tipo | Uso |
|---|---|---|
| `currentSlide` | `number` | Índice del hero slide activo |
| `activeTestimonial` | `number` | Índice del testimonial activo |

### Auto-timers
- Hero slider: auto-avanza cada 6000ms
- Testimonial: auto-avanza cada 5000ms

### APIs necesarias
**Ninguna.** Todos los datos son hardcoded.

### Componentes externos
- `Layout` (Navbar + Footer wrapper)
- `FadeIn` (animación de entrada con IntersectionObserver)
- `SEOHead` (react-helmet-async)
- Iconos de `lucide-react`: `Bed`, `Bath`, `Maximize`, `ArrowRight`, `ArrowUpRight`, `Lock`, `EyeOff`, `Shield`, `Play`, `Quote`, `MapPin`, `Building2`, `TrendingUp`, `Globe`, `ChevronRight`

---

## 2. LuxuryPropertyListing (`/properties`)

### Datos que consume (hardcoded)
| Constante | Campos | Tipos |
|---|---|---|
| `PROPERTIES` (6 items) | `id`, `image`, `gallery`, `tag`, `style`, `location`, `title`, `excerpt`, `beds`, `baths`, `sqm`, `plot`, `price`, `features` | `number`, `string[]`, `string` × 7, `number` × 4, `string[]` |
| `TYPE_OPTIONS_WITH_SUBTYPES` | `label`, `subtypes?` | `string`, `string[]?` |
| `BED_OPTIONS` | — | `string[]` ("Any", "1+", ...) |
| `BATH_OPTIONS` | — | `string[]` |
| `AMENITY_GROUPS` | `title`, `items` | `string`, `string[]` |
| `AMENITY_SIDEBAR` | — | `string[]` (8 items) |
| `PRICE_PRESETS` | `label`, `value` | `string` × 2 |
| Popular locations | — | 18 strings hardcoded inline |

### FilterState (interfaz de filtro)
```ts
{
  locations: { id: string; name: string; path: string; type: string }[];
  types: string[];
  priceMin: string;
  priceMax: string;
  hidePriceOnRequest: boolean;
  areaMin: string;
  areaMax: string;
  beds: string;       // "Any" | "1+" | "2+" | ...
  baths: string;      // "Any" | "1+" | ...
  amenities: string[];
  newBuilds: boolean;
}
```

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Location search (chips) | `LocationSearchDropdown` | Añade/quita locations al filtro |
| Click "Filters" button | `button` | Abre `FilterSidebar` (slide-in izquierda) |
| Type dropdown | `TypeDropdown` (checkboxes) | Toggle tipos en `filters.types` |
| Price dropdown | `PriceDropdown` | Inputs min/max + presets + hide POR toggle |
| Beds dropdown | `BedsDropdown` | Selección de opciones de camas |
| Amenities dropdown | `AmenitiesDropdown` | Toggle múltiple con grupos |
| "New Builds" toggle | `button` | Toggle `filters.newBuilds` |
| Remove chip | `button (X)` | Ejecuta `removeChip()` |
| "Clear all" chips | `button` | Resetea a `defaultFilters` |
| Sort button | `button` | **No implementado** (solo muestra "Premium") |
| Pagination (Next / números) | `button` | **No implementado** (visual only) |
| Click property card | `<a href="/property/{id}">` | Navega a detalle |
| Email icon en card | `button` | `e.preventDefault()` — no acción |
| Newsletter submit | `form` | `e.preventDefault()` |
| Sidebar "Clear all" | `button` | Resetea filtros a default |
| Sidebar "Show results" | `button` | Cierra sidebar |

### Estado interno
| Estado | Tipo |
|---|---|
| `filtersOpen` | `boolean` |
| `filters` | `FilterState` |

### APIs necesarias
**Ninguna.** Filtrado no se aplica realmente a los datos; los 6 properties siempre se muestran.

### Componentes externos
- `LocationSearchDropdown` (con búsqueda, chips, recent searches via localStorage)
- `SEOHead`
- Iconos de `lucide-react`: `Search`, `SlidersHorizontal`, `X`, `ChevronDown`, `ChevronRight`, `Bed`, `Bath`, `Maximize`, `MapPin`, `Mail`
- **No usa** el componente `Layout` global — tiene su propio navbar y footer inline

---

## 3. PropertyDetailPage (`/property/:id`)

### Datos que consume (hardcoded)
| Constante | Campos |
|---|---|
| `PROPERTY` | `title`, `subtitle`, `breadcrumb[]`, `price`, `originalPrice`, `discount`, `rentalPrice`, `alsoForRent`, `beds`, `baths`, `sqm`, `plot`, `garage`, `year`, `ref`, `energyClass`, `status`, `hasVideo`, `hasVirtualTour`, `videoUrl`, `virtualTourUrl`, `images[]`, `description`, `features[]`, `highlights[]`, `agent{name,role,phone,email}` |
| `SIMILAR` (3 items) | `image`, `name`, `location`, `price`, `beds`, `baths`, `sqm` |

> **Nota:** El param `:id` de la URL NO se usa. Siempre muestra la misma propiedad hardcoded.

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Click hero image | `onClick` | Abre lightbox (`setLightbox(0)`) |
| Click thumbnail | `onClick` | Abre lightbox en ese índice |
| Lightbox: prev/next | `button` | Navega entre imágenes |
| Lightbox: close (X o click fondo) | `button/div onClick` | Cierra lightbox |
| Like (heart) | `button` | Toggle `liked` state (visual solo) |
| Share | `button` | **No implementado** |
| Download PDF | `button` | **No implementado** |
| "Read more" / "Show less" (descripción) | `button` | Toggle `expandDesc` |
| Video badge | `<a href="#">` | Enlace placeholder |
| 360° badge | `<a href="#">` | Enlace placeholder |
| Contact form submit | `form onSubmit` | `e.preventDefault()` — no envía |
| "Schedule visit" checkbox | `checkbox` | Toggle `wantVisit`, muestra date/time picker |
| Visit date picker | `Calendar` (Popover) | Selecciona fecha en `visitDate` |
| Visit time select | `<select>` | Selecciona hora en `visitTime` |
| Terms checkbox | `checkbox` | Visual only |
| "Call Directly" | `<a href="tel:...">` | Inicia llamada telefónica |
| Click similar property | `<a href="#">` | Enlace placeholder |
| Recently viewed scroll | horizontal scroll | Scroll manual |

### Estado interno
| Estado | Tipo | Uso |
|---|---|---|
| `lightbox` | `number \| null` | Índice de imagen en lightbox |
| `liked` | `boolean` | Estado del corazón |
| `expandDesc` | `boolean` | Descripción expandida |
| `wantVisit` | `boolean` | Muestra selector de visita |
| `visitDate` | `Date \| undefined` | Fecha de visita seleccionada |
| `visitTime` | `string` | Hora de visita seleccionada |

### APIs necesarias
**Ninguna.**

### Componentes externos
- `LuxuryPhoneInput` (input de teléfono con selector de país y detección de timezone)
- `LuxuryMortgageCalculator` (calculadora de hipoteca con sliders)
- `LuxuryNearbyPlaces` (grid de lugares cercanos por categoría)
- `Popover` + `Calendar` (radix-ui, date-picker)
- `SEOHead`
- `cn` (className merger)
- `format` de `date-fns`
- **No usa** el componente `Layout` global — tiene su propio navbar inline

---

## 4. BlogListingPage (`/blog`)

### Datos que consume (hardcoded)
| Constante | Campos |
|---|---|
| `BLOG_POSTS` (8 items) | `id`, `image`, `date`, `category`, `title`, `excerpt`, `author`, `readTime`, `featured` |
| `CATEGORIES` (7 items) | `slug`, `label` |
| `LANGUAGES` | importado de config (`code`, `label`) |

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Search input | `<input text>` | Filtra posts por `title` y `excerpt` (case-insensitive) |
| Category buttons | `button[]` | Filtra por `category`; resetea `visibleCount` |
| Click post card | `<Link to="/blog/{id}">` | Navega a detalle |
| "Load More Articles" | `button` | Incrementa `visibleCount` en 6 |
| Language selector (desktop) | `button` dropdown | Cambia `currentLang` (visual only) |
| Language selector (mobile) | `button[]` | Cambia `currentLang` (visual only) |
| Mobile menu toggle | `button` | Toggle `mobileMenuOpen` |
| Newsletter submit | `form` | `e.preventDefault()` |

### Filtrado implementado
```
matchesCategory = activeCategory === "all" || post.category === activeCategory
matchesSearch = searchQuery === "" || title.includes(query) || excerpt.includes(query)
```
- Featured post solo se muestra si `activeCategory === "all"` y `searchQuery === ""`
- Posts regulares limitados por `visibleCount` (default 6)

### Estado interno
| Estado | Tipo |
|---|---|
| `mobileMenuOpen` | `boolean` |
| `langOpen` | `boolean` |
| `currentLang` | `string` (default "EN") |
| `activeCategory` | `string` (default "all") |
| `searchQuery` | `string` |
| `visibleCount` | `number` (default 6) |

### APIs necesarias
**Ninguna.**

### Componentes externos
- `SEOHead`
- `FadeIn` (definido localmente, no importado del shared)
- `useContainerScrolled` (hook local)
- Iconos: `ArrowRight`, `Search`, `Instagram`, `Linkedin`, `MessageCircle`
- **No usa** el componente `Layout` global — tiene navbar y footer propios inline

---

## 5. BlogDetailPage (`/blog/:slug`)

### Datos que consume (hardcoded)
| Constante | Campos |
|---|---|
| `POSTS` (3 entries: "1", "2", "3") | `image`, `date`, `category`, `title`, `subtitle`, `author`, `readTime`, `tags[]`, `faq[]`, `content` (HTML string) |
| `TRENDING` (4 items) | `id`, `image`, `title`, `category`, `date` |
| `CATEGORIES_NAV` | 6 categorías como strings |

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| FAQ accordion (click pregunta) | `button` | Toggle `openIndex` — expande/colapsa respuesta |
| Social share icons (sidebar) | `<a href="#">` | Placeholder (5 iconos: Facebook, Twitter, Linkedin, Instagram, Share2) |
| "Back to top" button | `button` | Scroll suave al top del container |
| Click trending article | `<Link to="/blog/{id}">` | Navega a otro artículo |
| Category bar links | `<Link to="/blog">` | Navega a blog listing |
| "Join The Private List" link | `<Link to="/register">` | Enlace a ruta `/register` (no existe) |
| Newsletter subscribe | `input + button` | **No implementado** (no tiene form/onSubmit) |

### Estado interno
| Estado | Tipo | Uso |
|---|---|---|
| `scrolled` (via `useContainerScrolled`) | `boolean` | Cambia estilo del navbar |
| `openIndex` (en `FaqSection`) | `number \| null` | FAQ item abierto |

### Renderizado especial
- El contenido del artículo se renderiza con `dangerouslySetInnerHTML`
- Estilos inyectados via `<style>` tag inline para `.blog-article-content`

### APIs necesarias
**Ninguna.**

### Componentes externos
- `SEOHead`
- `useContainerScrolled` (hook local)
- `FaqSection` (componente local con acordeón)
- Iconos: `ArrowLeft`, `Clock`, `Calendar`, `User`, `Tag`, `Instagram`, `Linkedin`, `MessageCircle`, `Facebook`, `Twitter`, `Share2`, `ChevronUp`, `Plus`, `Minus`
- **No usa** el componente `Layout` global — tiene navbar y footer propios inline

---

## 6. ContactPage (`/contact`)

### Datos que consume (hardcoded)
| Constante | Campos |
|---|---|
| `OFFICES` (3 items) | `id`, `name`, `label`, `image`, `address`, `phone`, `email`, `hours`, `lat`, `lng` |

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Toggle office selection | `button[]` | Toggle id en `selectedOffices` (mínimo 1 siempre seleccionado) |
| Contact form submit | `form onSubmit` | Muestra "Message Sent" durante 4 segundos, luego resetea |
| "Get Directions" | `<a target="_blank">` | Abre Google Maps directions al lat/lng de la oficina |
| Privacy Policy link | `<Link to="/page/privacy">` | Navega a página de privacidad |

### Campos del formulario
| Campo | Tipo | Requerido |
|---|---|---|
| Full Name | `text` | ✅ |
| Email | `email` | ✅ |
| Phone | `tel` | ❌ |
| Subject | `select` (6 options + empty) | ❌ |
| Message | `textarea` | ✅ |

### Opciones de Subject
`buying`, `selling`, `valuation`, `investment`, `rental`, `other`

### Estado interno
| Estado | Tipo |
|---|---|
| `selectedOffices` | `string[]` (default: primer office) |
| `formName` | `string` |
| `formEmail` | `string` |
| `formPhone` | `string` |
| `formSubject` | `string` |
| `formMessage` | `string` |
| `submitted` | `boolean` |

### APIs necesarias
**Ninguna.** El formulario no envía datos a ningún backend.

### Componentes externos
- `Layout` (usa el componente global)
- `FadeIn`
- `SEOHead`
- Iconos: `MapPin`, `Phone`, `Mail`, `Clock`, `ArrowRight`, `Check`, `Navigation`

---

## 7. SystemPage (`/page/:slug`)

### Datos que consume (hardcoded)
| Slug | Título | Tiene imagen |
|---|---|---|
| `about` | `About ${brand.fullName}` | ✅ (heroImg) |
| `terms` | Terms & Conditions | ❌ |
| `privacy` | Privacy Policy | ❌ |

Cada page tiene: `title`, `subtitle?`, `image?`, `content` (HTML string).

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Ninguna interacción | — | Página estática de solo lectura |

### Estado interno
**Ninguno.**

### Renderizado especial
- El contenido se renderiza con `dangerouslySetInnerHTML`
- Estilos inyectados via `<style>` tag para `.system-page-content`
- Si el slug no existe, muestra la página "about" como fallback

### APIs necesarias
**Ninguna.**

### Componentes externos
- `Layout` (usa el componente global)
- `SEOHead`

---

## 8. Navbar (`src/components/layout/Navbar.tsx`)

### Props
| Prop | Tipo | Default | Uso |
|---|---|---|---|
| `variant` | `"transparent" \| "solid"` | `"solid"` | Estilo visual; transparent se usa sobre hero images |
| `scrolled` | `boolean` | `false` | Cambia de transparent a solid al hacer scroll |
| `showLanguage` | `boolean` | `false` | Muestra/oculta selector de idioma |
| `activePath` | `string?` | — | Resalta el enlace de navegación activo |

### Datos que consume (de config)
- `brand.name`, `brand.subtitle` — Logo
- `navLeft[]` — Links izquierdos (Home, Properties, Rentals)
- `navRight[]` — Links derechos (About, Guides & Blog, Contact)
- `languages[]` — Selector de idioma (EN, ES, DE, FR, RU)
- `palette.*` — Colores

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Mobile hamburger toggle | `button` | Toggle `mobileMenuOpen` |
| Language selector (desktop) | `button` dropdown | Toggle `langOpen`, selecciona idioma |
| Language selector (mobile) | `button[]` | Selecciona idioma |
| Nav link click | `<Link>` | Navegación SPA |
| Mobile nav link click | `<Link>` | Navega + cierra menú móvil |

### Estado interno
| Estado | Tipo |
|---|---|
| `mobileMenuOpen` | `boolean` |
| `langOpen` | `boolean` |
| `currentLang` | `string` (default "EN") |

### Comportamiento responsive
- Auto-cierra menú móvil en resize ≥ 1024px (`useEffect` con `resize` listener)
- Desktop: muestra links en línea + logo centrado
- Mobile: hamburger → menú desplegable con todos los links + selector de idioma

### APIs necesarias
**Ninguna.** El cambio de idioma es solo visual (cambia `currentLang` state pero no traduce nada).

---

## 9. Footer (`src/components/layout/Footer.tsx`)

### Datos que consume (de config)
- `brand.name`, `brand.subtitle`, `brand.fullName`, `brand.tagline`
- `footerColumns[]` — 4 columnas con `title` y `items[]{label, href}`
- `social.instagram`, `social.linkedin`, `social.facebook`, `social.twitter`
- `palette.footer` — Color de fondo

### Acciones del usuario
| Acción | Tipo | Comportamiento |
|---|---|---|
| Click link de columna | `<Link to={href}>` | Navegación SPA |
| Click icono social | `<a href="#">` | Placeholder (todos apuntan a `#`) |

### Estado interno
**Ninguno.** Es un componente puramente presentacional.

### APIs necesarias
**Ninguna.**

### Componentes externos
- Iconos: `Instagram`, `Linkedin`, `Facebook`, `Twitter`

---

## Resumen general

### Componentes auxiliares NO auditados arriba (pero usados)

| Componente | Ubicación | Funcionalidad |
|---|---|---|
| `FadeIn` | `src/components/shared/FadeIn.tsx` | Animación de entrada con IntersectionObserver |
| `SEOHead` | `src/components/shared/SEOHead.tsx` | Gestión de meta tags con react-helmet-async |
| `LuxuryPhoneInput` | `src/components/luxury/LuxuryPhoneInput.tsx` | Input de teléfono con selector de país (detección de timezone) |
| `LuxuryMortgageCalculator` | `src/components/luxury/LuxuryMortgageCalculator.tsx` | Calculadora de hipoteca con 4 sliders |
| `LuxuryNearbyPlaces` | `src/components/luxury/LuxuryNearbyPlaces.tsx` | Grid de lugares cercanos por categoría |
| `LocationSearchDropdown` | `src/components/luxury/LocationSearchDropdown.tsx` | Búsqueda de ubicaciones con chips + recent searches (localStorage) |

### APIs externas utilizadas
**CERO.** Todo el template funciona con datos hardcoded. No hay fetch, no hay axios, no hay llamadas a APIs.

### Estado persistente
- **localStorage**: Solo `LocationSearchDropdown` guarda búsquedas recientes.
- **No hay base de datos, no hay autenticación, no hay backend.**

### Formularios sin backend
| Formulario | Página | Acción actual |
|---|---|---|
| Newsletter (email) | Home, Blog Listing, Blog Detail, Property Listing, Property Detail | `e.preventDefault()` |
| Contact form | ContactPage | Muestra confirmación visual 4s, sin envío |
| Agent enquiry form | PropertyDetailPage | `e.preventDefault()` |

### Funcionalidades NO implementadas (placeholder `#` o sin acción)
1. Sort en Property Listing (solo muestra "Premium")
2. Paginación en Property Listing (visual only)
3. Compartir propiedad (botón Share)
4. Descargar PDF de propiedad
5. Video y tour virtual (enlaces `#`)
6. Links de redes sociales (todos `#`)
7. Cambio de idioma (solo cambia variable visual, sin traducción)
8. "Request Access" off-market
9. "Watch Our Story" en home
10. Link a `/register` en BlogDetailPage (ruta no existe)
11. Links de destinos en home (todos `#`)
