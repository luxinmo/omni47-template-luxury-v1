# Resumen del Proyecto

- **Total páginas:** 22
- **Total secciones únicas:** ~65
- **Bloques ya extraídos:** 29 (en `src/components/blocks/`)
- **Bloques pendientes de extraer:** ~36
- **Features sin backend Omni47:** 12 (5 solo UI, 4 media, 3 futura)
- **Responsive completado:** 18 de 22 páginas (Portal y PDFs no usan Layout responsive)

---

## Páginas

### 1. Home (4 variantes)

| Variante | Ruta | Secciones que contiene | Responsive |
|----------|------|------------------------|------------|
| Home 2 (default) | `/` | Hero Carousel, Stats Ribbon, Featured 4-col, About+Services Split, Destinations Grid, New Developments Grid, Testimonial Cinematic, Off-Market Split, Journal Editorial, Newsletter | ✅ |
| Home 3 | `/home3` | Hero Carousel, Stats Ribbon, Featured 3-col, Destinations Grid, Property Types Grid, Collections Landscape, Branded Fullwidth, New Dev Grid, Off-Market Split, Finder Form Split, Market Data Cards, Journal Editorial, Areas Text List, Newsletter | ✅ |
| Home 4 | `/home4` | Hero Carousel + Lead CTAs, Finder Form Centered, Featured 3-col + Request CTA, Off-Market Split, New Dev Grid, Collections Landscape, Market Data Cards, Trust Icons, Journal Editorial, Areas Text List, Newsletter, Chatbot Panel | ✅ |
| Portal | `/portal` | Hero Editorial Left, Stats Bar Dividers, Intro Split Image, Collections Tagged, Destinations Asymmetric, Featured Grid Portrait, Parallax Quote, Investment Grid, Off-Market (Portal variant), Magazine/Journal, Newsletter Bordered, Footer Editorial | ✅ |

### 2. Detalle de Propiedad (5 variantes)

| Variante | Ruta | Secciones que contiene | Responsive |
|----------|------|------------------------|------------|
| Detail V2 | `/property2/:id` | Image Gallery, Breadcrumb, Info Header, Price Block, Features Grid, Description, Mortgage Calculator, Nearby Places, Contact Form, Phone Input, Related Properties | ✅ |
| Detail V3 | `/property3/:id` | Similar a V2 con layout diferente | ✅ |
| Detail V4 | `/property4/:id` | Similar a V2 con layout simplificado | ✅ |
| Detail V5 | `/property5/:id` | Gallery, SEO-optimized header, Info, Features, Description, Mortgage Calc, Nearby, Contact | ✅ |
| Detail V6 | `/property6/:id` | Gallery, Info Header, Agency Info, Price+Stats, Description, Features, Mortgage, Nearby, Contact, Related (más completo, 1273 líneas) | ✅ |

### 3. Listado / Búsqueda

| Variante | Ruta | Secciones | Responsive |
|----------|------|-----------|------------|
| Property Listing | `/properties` | Hero Mini, Search Bar, Filters Panel (collapsible), Location Search Dropdown, Property Grid (toggle grid/list), Pagination, Sidebar Filters | ✅ |

### 4. Branded Residences (2 páginas)

| Página | Ruta | Secciones | Responsive |
|--------|------|-----------|------------|
| Listado | `/branded-residences` | Hero, Filter Bar, Grid Cards con Progress Bar, Stats | ✅ |
| Detalle | `/branded-residences/:slug` | Gallery, Info, Units Table, Amenities, Brand Info, Contact Form, Progress Bar, Map Placeholder | ✅ |

### 5. New Developments (2 páginas)

| Página | Ruta | Secciones | Responsive |
|--------|------|-----------|------------|
| Listado | `/new-developments` | Hero, Filter Bar, Grid Cards con Progress, Stats | ✅ |
| Detalle | `/new-developments/:slug` | Gallery, Info, Units Table, Amenities, Developer Info, Contact Form, Floor Plans, Map | ✅ |

### 6. Blog (2 páginas)

| Página | Ruta | Secciones | Responsive |
|--------|------|-----------|------------|
| Blog Listing | `/blog` | Hero, Search Bar, Categories Filter, Featured Article, Article Grid, Newsletter CTA | ✅ |
| Blog Detail | `/blog/:slug` | Hero Image, Article Content, Author, Tags, FAQ Accordion, Social Share, Related Articles, Newsletter | ✅ |

### 7. Otras páginas

| Página | Ruta | Secciones | Responsive | Descripción |
|--------|------|-----------|------------|-------------|
| Contact V1 | `/contact` | Office Selector, Multi-Office Map Placeholder, Contact Form, Hours | ✅ | Formulario con selector de oficinas |
| Contact V2 | `/contact2` | Reasons Grid, Office Tabs, Contact Form, Map Placeholder | ✅ | Versión con motivos de contacto |
| Favorites | `/favorites` | Header, Grid/List Toggle, Saved Properties Grid, Sort, Share Collection, Empty State | ✅ | Página de favoritos (localStorage) |
| System Pages | `/page/:slug` | Hero Image, Breadcrumb, Content (HTML), Back Link | ✅ | About, Terms, Privacy |
| Blocks Catalog | `/blocks` | Header, Category Grid, Expandable Preview per Block | ✅ | Catálogo visual de bloques |
| PDF V1 | `/pdf-v1` | Property Sheet Layout, Download Button | ❌ | Ficha PDF simple (html2canvas) |
| PDF V2 | `/pdf-v2` | Property Sheet Multi-page Layout, Download Button | ❌ | Ficha PDF completa (html2canvas) |
| 404 | `*` | Not Found Message, Link to Home | ✅ | Página 404 |

---

## Secciones únicas encontradas

### Heroes — 3 variantes
1. **HeroCarouselCenter** — Carousel fullscreen con slides, headline centrado, dots. (Home2, Home3, Home4)
2. **HeroEditorialLeft** — Hero fullscreen con contenido alineado a la izquierda, tipografía Playfair Display. (Portal)
3. **HeroMini** — Hero reducido con imagen de fondo para páginas interiores. (Blog Detail, Contact)

### Stats / Ribbons — 2 variantes
1. **StatsRibbon** — 4 stats centrados con divisores verticales, fondo blanco. (Home2, Home3, Home4)
2. **StatsBarDividers** — Stats con grid dividido, estilo editorial neutro. (Portal)

### Propiedades Destacadas — 3 variantes
1. **FeaturedGrid4Col** — Grid de 4 columnas, aspect 3:4, overlay hover. (Home2)
2. **FeaturedGrid3Col** — Grid de 3 columnas, aspect 4:3, con links. (Home3, Home4)
3. **FeaturedGridPortrait** — Grid 3 columnas estilo portrait, tipografía editorial. (Portal)

### Destinos / Zonas — 2 variantes
1. **DestinationsGridTall** — Grid de 6 columnas con aspect 2:3 vertical. (Home2, Home3)
2. **DestinationsAsymmetric** — 2 grandes + 4 pequeños, grid asimétrico. (Portal)

### Tipos de Propiedad — 1 variante
1. **PropertyTypesGrid** — Grid de iconos con chevron, fondo blanco con borde. (Home3)

### Colecciones / Lifestyle — 2 variantes
1. **CollectionsLandscape** — Grid 3 columnas, aspect 16:10, overlay gradient. (Home3, Home4)
2. **CollectionsTagged** — Grid con tags en esquina, aspect 4:3, estilo editorial. (Portal)

### Branded Residences — 1 variante
1. **BrandedFullwidth** — CTA fullwidth con imagen de fondo, badge Crown dorado. (Home3)

### Nuevas Promociones — 1 variante
1. **NewdevGridSimple** — Grid 3 columnas con badge "New Build" y fecha de entrega. (Home2, Home3, Home4)

### Off-Market — 2 variantes
1. **OffmarketSplit** — Split 50/50 imagen+texto, fondo oscuro, accent dorado. (Home2, Home3, Home4)
2. **OffmarketPortal** — Split con grid lg:2col, bg-neutral-900, estilo editorial. (Portal) ⏳ NO extraído

### Sobre / Servicios — 2 variantes
1. **AboutServicesSplit** — Split 2 columnas: texto izquierda + grid de servicios 2x2 derecha. (Home2)
2. **IntroSplitImage** — Split imagen+texto con stat overlay, estilo editorial. (Portal)

### Testimonios — 2 variantes
1. **TestimonialCinematic** — Fullscreen con imagen, overlay, quote rotativo con dots. (Home2)
2. **TestimonialParallaxQuote** — Quote centrado sobre imagen con filtro oscuro. (Portal)

### Property Finder / Concierge — 2 variantes
1. **FinderFormCentered** — Formulario 4 campos centrado con botón "Find My Property". (Home4)
2. **FinderFormSplit** — Split 2 columnas: texto izquierda + formulario derecha. (Home3) ⏳ NO extraído

### Market Insights — 1 variante
1. **MarketDataCards** — Grid 4 cards con icono, valor, label y badge de cambio. (Home3, Home4)

### Trust / Confianza — 1 variante
1. **TrustIcons** — Grid 4 elementos con iconos circulares y stats. (Home4)

### Journal / Blog — 2 variantes
1. **JournalEditorial** — Layout 7+5 columnas: artículo grande + sidebar con thumbnails. (Home2, Home3, Home4)
2. **MagazineEditorial** — Layout 2 columnas con artículo grande + lista lateral con categorías. (Portal) ⏳ NO extraído

### Áreas — 1 variante
1. **AreasTextList** — Grid 2 columnas de listas de links por región. (Home3, Home4)

### Inversiones — 1 variante
1. **InvestmentGrid** — Grid 4 columnas, aspect 3:4 con labels de ROI. (Portal)

### Newsletter / CTA — 2 variantes
1. **NewsletterCentered** — Centrado con input + botón, fondo bgAlt. (Home2, Home3, Home4)
2. **NewsletterBordered** — Centrado con líneas decorativas laterales, estilo editorial. (Portal)

### Navbar — 2 variantes
1. **NavbarLuxury** — Navbar con hamburger, brand centrado, language selector, links desktop. (Layout — usado en todas las páginas excepto Portal)
2. **NavbarPortal** — Navbar editorial propio con items diferentes, sin Layout compartido. (Portal) ⏳ NO extraído

### Footer — 2 variantes
1. **FooterLuxury** — Footer con 4 columnas, social, legal. (Layout — usado en todas las páginas excepto Portal)
2. **FooterEditorial** — Footer 5 columnas, estilo editorial con social icons. (Portal)

### Chatbot — 1 variante
1. **ChatbotPanel** — Panel flotante con quick replies, mensajes, input. (Home4) ⏳ NO extraído

---

### Detalle — Secciones (NO extraídas como bloques)

| Sección | Variantes | Usada en |
|---------|-----------|----------|
| Image Gallery (carousel + grid) | 5 (V2-V6 difieren en layout) | PropertyDetail V2–V6 |
| Info Header (título, ubicación, precio, badges) | 5 | PropertyDetail V2–V6 |
| Features Grid (amenities, iconos) | 3 (simple, expandable, categorized) | V2, V3/V4, V5/V6 |
| Description Block | 2 (simple, con columnas) | V2–V4, V5/V6 |
| Contact Form (sidebar) | 3 (simple, con phone input, con calendar) | V2–V6 |
| Mortgage Calculator | 1 | V2–V6 |
| Nearby Places | 1 | V2–V5 |
| Related Properties | 2 (grid simple, carousel) | V2, V6 |
| Breadcrumb | 1 | V2–V6 |
| Price Block (con descuento, per sqm, rental) | 2 | V2/V3, V5/V6 |
| Agency Info Block | 1 | V6 |
| Energy Class Badge | 1 | V2–V6 |

### Branded Residences Detail — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Detail Gallery | BrandedResidenceDetailPage |
| Brand Info Header | BrandedResidenceDetailPage |
| Units Table | BrandedResidenceDetailPage |
| Amenities Grid | BrandedResidenceDetailPage |
| Construction Progress | BrandedResidenceDetailPage |
| Contact/Enquiry Form | BrandedResidenceDetailPage |

### New Development Detail — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Detail Gallery | NewDevelopmentDetailPage |
| Developer Info | NewDevelopmentDetailPage |
| Units Table | NewDevelopmentDetailPage |
| Floor Plans Section | NewDevelopmentDetailPage |
| Amenities Grid | NewDevelopmentDetailPage |
| Construction Progress | NewDevelopmentDetailPage |
| Contact Form | NewDevelopmentDetailPage |

### Listing Page — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Search Bar + Location Dropdown | LuxuryPropertyListing |
| Filters Panel (collapsible, multi-select) | LuxuryPropertyListing |
| Property Card (grid mode) | LuxuryPropertyListing |
| Property Card (list mode) | LuxuryPropertyListing |
| Pagination | LuxuryPropertyListing |
| Sort Dropdown | LuxuryPropertyListing |

### Blog — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Blog Search + Category Filter | BlogListingPage |
| Blog Article Card | BlogListingPage |
| Blog Featured Article | BlogListingPage |
| Article Content Renderer | BlogDetailPage |
| FAQ Accordion | BlogDetailPage |
| Social Share Bar | BlogDetailPage |
| Author Block | BlogDetailPage |

### Contact — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Office Selector (multi) | ContactPage |
| Office Tabs | ContactPageV2 |
| Contact Form (standalone) | ContactPage, ContactPageV2 |
| Reasons Grid | ContactPageV2 |

### Favorites — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| Favorites Grid/List Toggle | FavoritesPage |
| Saved Property Card | FavoritesPage |
| Share Collection Dialog | FavoritesPage |
| Empty State | FavoritesPage |

### PDF — Secciones (NO extraídas)

| Sección | Usada en |
|---------|----------|
| PDF Property Sheet V1 (1 page) | PropertyPdfV1 |
| PDF Property Sheet V2 (multi-page) | PropertyPdfV2 |

---

## Features sin backend en Omni47

| Feature | Dónde aparece | Qué necesitaría en backend | Prioridad |
|---------|---------------|---------------------------|-----------|
| Favoritos (localStorage) | FavoritesPage, Detail V6 | Tabla `favorites` con user_id, property_id | 🟡 Media |
| Formulario de contacto | ContactPage, ContactPageV2, PropertyDetail V2-V6 | Endpoint de email / tabla `enquiries` | 🟡 Media |
| Newsletter suscripción | Home2/3/4, Blog | Tabla `newsletter_subscribers`, integración Mailchimp | 🟡 Media |
| Chatbot IA | Home4 (panel flotante) | WebSocket / API IA, historial de conversaciones | 🔴 Futura |
| Blog / Journal contenido | BlogListing, BlogDetail | CMS o tabla `posts` con editor WYSIWYG | 🟡 Media |
| Búsqueda de propiedades | LuxuryPropertyListing | API de propiedades con filtros, paginación, geolocalización | 🔴 Futura |
| Reserva de visita (calendario) | PropertyDetail V2 | Sistema de citas, sync calendario | 🔴 Futura |
| Calculadora hipoteca | PropertyDetail V2-V6 | Solo frontend, sin backend | 🟢 Solo UI |
| Selector de idioma/moneda/unidades | Navbar (Dialog) | Solo frontend (estado local), sin backend | 🟢 Solo UI |
| Compartir colección favoritos | FavoritesPage | Solo genera URL con query params | 🟢 Solo UI |
| Nearby Places / Mapa | PropertyDetail V2-V5 | Google Maps API / Mapbox, datos de POIs | 🟢 Solo UI (mock) |
| PDF Export (html2canvas) | PropertyPdfV1, PropertyPdfV2 | Solo frontend, sin backend | 🟢 Solo UI |

---

## Estado de extracción

### ✅ Ya extraídos en `src/components/blocks/` (29 bloques)

| # | Bloque | Categoría | Origen |
|---|--------|-----------|--------|
| 1 | HeroCarouselCenter | Heroes | Home2/3/4 |
| 2 | HeroEditorialLeft | Heroes | Portal |
| 3 | StatsRibbon | Stats | Home2/3/4 |
| 4 | StatsBarDividers | Stats | Portal |
| 5 | FeaturedGrid4Col | Featured Properties | Home2 |
| 6 | FeaturedGrid3Col | Featured Properties | Home3/4 |
| 7 | FeaturedGridPortrait | Featured Properties | Portal |
| 8 | DestinationsGridTall | Destinations | Home2/3 |
| 9 | DestinationsAsymmetric | Destinations | Portal |
| 10 | PropertyTypesGrid | Property Types | Home3 |
| 11 | CollectionsLandscape | Collections | Home3/4 |
| 12 | CollectionsTagged | Collections | Portal |
| 13 | BrandedFullwidth | Branded | Home3 |
| 14 | NewdevGridSimple | New Developments | Home2/3/4 |
| 15 | OffmarketSplit | Off-Market | Home2/3/4 |
| 16 | AboutServicesSplit | About | Home2 |
| 17 | IntroSplitImage | About | Portal |
| 18 | TestimonialCinematic | Testimonials | Home2 |
| 19 | TestimonialParallaxQuote | Testimonials | Portal |
| 20 | FinderFormCentered | Finder | Home4 |
| 21 | MarketDataCards | Market | Home3/4 |
| 22 | TrustIcons | Trust | Home4 |
| 23 | JournalEditorial | Journal | Home2/3/4 |
| 24 | AreasTextList | Areas | Home3/4 |
| 25 | InvestmentGrid | Investments | Portal |
| 26 | NewsletterCentered | CTA | Home2/3/4 |
| 27 | NewsletterBordered | CTA | Portal |
| 28 | NavbarLuxury | Navbar | Layout |
| 29 | FooterLuxury | Footer | Layout |

### ⏳ Pendientes de extraer

#### Secciones de Home pages
- **FinderFormSplit** — Home3 (variante split del finder)
- **OffmarketPortal** — Portal (variante editorial del off-market)
- **MagazineEditorial** — Portal (journal estilo magazine)
- **NavbarPortal** — Portal (navbar propio sin Layout)
- **ChatbotPanel** — Home4 (chatbot flotante)

#### Secciones de Property Detail (V2–V6)
- DetailGalleryCarousel (5 variantes)
- DetailInfoHeader (5 variantes)
- DetailFeaturesGrid (3 variantes)
- DetailDescriptionBlock (2 variantes)
- DetailContactForm (3 variantes)
- DetailMortgageCalculator (1)
- DetailNearbyPlaces (1)
- DetailRelatedProperties (2 variantes)
- DetailBreadcrumb (1)
- DetailPriceBlock (2 variantes)
- DetailAgencyInfo (1)
- DetailEnergyBadge (1)

#### Secciones de Branded Residences
- BrandedResidencesListingGrid
- BrandedResidenceDetailGallery
- BrandedResidenceUnitTable
- BrandedResidenceAmenities
- BrandedResidenceProgress

#### Secciones de New Developments
- NewDevListingGrid
- NewDevDetailGallery
- NewDevUnitTable
- NewDevFloorPlans
- NewDevAmenities
- NewDevProgress

#### Secciones de Blog
- BlogSearchFilter
- BlogArticleCard
- BlogFeaturedArticle
- ArticleContentRenderer
- BlogFAQAccordion
- BlogSocialShare

#### Secciones de Contact
- ContactOfficeSelector
- ContactOfficeTabs
- ContactFormStandalone
- ContactReasonsGrid

#### Secciones de Favorites
- FavoritesGrid
- SavedPropertyCard
- ShareCollectionDialog

#### Secciones de Listing
- ListingSearchBar
- ListingFiltersPanel
- ListingPropertyCard (grid + list)
- ListingPagination
- ListingSortDropdown

#### PDF
- PropertyPdfSheet (2 variantes)

### 🆕 Secciones nuevas (no existían en iteración 1)
- **ChatbotPanel** — Home4 — Panel de chat flotante con quick replies
- **FinderFormSplit** — Home3 — Formulario de búsqueda split con texto
- **BrandedFullwidth** — Home3 — CTA de branded residences
- **TrustIcons** — Home4 — Grid de confianza con iconos
- **FavoritesPage completa** — Página de favoritos con grid/list/share
- **BrandedResidenceDetailPage** — Detalle completo de branded residence (1034 líneas)
- **NewDevelopmentDetailPage** — Detalle completo de new development (1176 líneas)
- **PropertyDetailV6** — La variante más completa con agency info (1273 líneas)
- **ContactPageV2** — Variante de contacto con tabs y reasons
- **PropertyPdfV2** — Ficha PDF multi-página

---

*Inventario pre-extracción — Marzo 2026*
