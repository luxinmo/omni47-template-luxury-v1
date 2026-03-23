# PropertyDetailV6 — Implementación Pixel-Perfect

> **Ruta:** `/property6/:id`  
> **Archivo:** `src/components/luxury/PropertyDetailV6.tsx`  
> **Líneas:** 1,295  
> **Componente:** `PropertyDetailV6` (default export)

---

## 📐 Arquitectura General

Página monolítica autónoma (no usa `<Layout>`). Incluye su propia navbar, footer, y todos los overlays.  
Layout principal: **2 columnas** en desktop (7/5 grid), **1 columna** en mobile/tablet.

```
┌─────────────────────────────────────────────────┐
│ NAVBAR (sticky top-0, z-50)                     │
├─────────────────────────────────────────────────┤
│ HERO GALLERY                                    │
│  Mobile: carousel swipeable                     │
│  Desktop: mosaic 4x2 grid                       │
├───────────────────────┬─────────────────────────┤
│ LEFT COLUMN (col-7)   │ RIGHT COLUMN (col-5)    │
│ · Breadcrumb          │ · Sticky Price Card     │
│ · Title + Address     │   (top-[84px])          │
│ · Price (mobile only) │ · Tag + PDF download    │
│ · Specs Grid 4-col    │ · Price + discount      │
│ · Tags                │ · CTA buttons           │
│ · About (expandable)  │ · Agency info           │
│ · Characteristics     │ · Price alert CTA       │
│ · Features & Amenities│                         │
│ · Floor Plans         │                         │
│ · Market Data         │                         │
│ · Nearby Areas        │                         │
│ · Mortgage Calculator │                         │
├───────────────────────┴─────────────────────────┤
│ BUYER'S GUIDE BANNER                            │
│ ABOUT AREA (full-width, 2-col text + map/video) │
│ SIMILAR PROPERTIES (3-col grid)                 │
│ INTERNAL SEO LINKS (pill buttons)               │
│ NEWSLETTER                                      │
│ RECENTLY VIEWED (horizontal scroll)             │
│ FOOTER                                          │
├─────────────────────────────────────────────────┤
│ OVERLAYS:                                       │
│ · Enquiry Modal (3-stage)                       │
│ · Language Modal                                │
│ · Lightbox (fullscreen)                         │
│ · Grid View (all photos)                        │
│ · Chatbot Panel                                 │
│ · Price Alert Modal                             │
│ · Mobile Sticky Bar (fixed bottom)              │
│ · Mobile Menu (fullscreen)                      │
└─────────────────────────────────────────────────┘
```

---

## 🎛️ Estado Interno (21 variables)

| Variable | Tipo | Default | Propósito |
|----------|------|---------|-----------|
| `lightbox` | `number \| null` | `null` | Índice de foto en lightbox. `null` = cerrado. Si `>= images.length` = slide de contacto |
| `liked` | `boolean` | `false` | Propiedad guardada como favorita |
| `expandDesc` | `boolean` | `false` | Descripción expandida o colapsada (12 líneas máx) |
| `enquiryOpen` | `boolean` | `false` | Modal de consulta visible |
| `enquirySent` | `"idle" \| "thanks" \| "suggestions"` | `"idle"` | Stage del flujo de enquiry (formulario → gracias → sugerencias) |
| `wantVisit` | `boolean` | `false` | Checkbox "quiero visita" en enquiry |
| `visitDate` | `Date \| undefined` | `undefined` | Fecha seleccionada para visita |
| `visitTime` | `string` | `""` | Hora seleccionada para visita |
| `chatOpen` | `boolean` | `false` | Panel de chatbot visible |
| `langOpen` | `boolean` | `false` | Modal de idioma visible |
| `currentLang` | `string` | `"EN"` | Idioma seleccionado |
| `currentCurrency` | `string` | `"EUR"` | Moneda seleccionada |
| `currentUnit` | `string` | `"m2"` | Unidad de área seleccionada |
| `mobileMenuOpen` | `boolean` | `false` | Menú móvil fullscreen |
| `heroSlide` | `number` | `0` | Slide actual del carrusel hero (mobile) |
| `chatMessages` | `{role, text}[]` | Bot greeting | Historial de mensajes del chatbot |
| `chatInput` | `string` | `""` | Input actual del chatbot |
| `gridView` | `boolean` | `false` | Vista de cuadrícula de todas las fotos |
| `priceAlertOpen` | `boolean` | `false` | Modal de alerta de precio |

**Refs:**
- `lbTouchStart` — coordenadas de inicio de swipe en lightbox
- `touchStart` — coordenadas de inicio de swipe en hero

---

## 🏗️ Secciones Detalladas

### 1. NAVBAR (líneas 268-298)

**Qué hace:** Barra de navegación sticky con logo centrado, idioma a la izquierda, links a ambos lados.

**Especificaciones:**
- `sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm`
- Altura: `h-[60px]` mobile, `h-[68px]` desktop
- Max width: `max-w-[1400px]`
- Logo: `brand.fullName` + `brand.subtitle` centrados
- Left: Selector de idioma (bandera + código) + `navLeft` links
- Right: `navRight` links
- Mobile: Botón hamburguesa que abre menú fullscreen
- Links: `text-[13px] tracking-[0.14em] uppercase font-light`

**Sentido:** Navegación global coherente con estética editorial. El idioma queda a la izquierda para mercado internacional.

### 2. MOBILE MENU (líneas 300-386)

**Qué hace:** Overlay fullscreen cuando se abre el menú en mobile.

**Especificaciones:**
- `fixed inset-0 z-[100] bg-white`
- Header replica el navbar (X a la izquierda, logo centrado)
- Links centrados verticalmente, `text-[18px] tracking-[0.15em] uppercase`
- Selectores de: Idioma (banderas), Moneda, Unidades de área
- CTA inferior: botón "Call Us" full width + nombre de marca

**Sentido:** En mobile el menú necesita espacio para preferencias (idioma/moneda/unidades) que en desktop están en la navbar o modales.

### 3. HERO GALLERY (líneas 388-472)

#### Mobile/Tablet (`lg:hidden`):
- Carrusel swipeable con `translateX(-${heroSlide * 100}%)`
- Aspect ratio: `aspect-[4/3]` mobile, `aspect-[16/10]` tablet (`sm:`)
- Contador: `bg-black/50 backdrop-blur-sm` centrado abajo
- Barra de acciones debajo: Video, PDF a la izquierda; Share, Save a la derecha
- Touch: 50px threshold, detección horizontal vs vertical

#### Desktop (`lg:grid`):
- Grid `grid-cols-4 grid-rows-2 gap-1.5 h-[620px]`
- Imagen principal: `col-span-2 row-span-2` con brand badge
- 4 imágenes secundarias con hover scale `group-hover:scale-105`
- Imagen superior derecha: botones Share + Save con `bg-white/90 backdrop-blur-sm`
- Imagen inferior izquierda: botones Video + 3D Tour
- Imagen inferior derecha: botón "Show all photos" que abre Grid View
- Cada imagen abre lightbox al hacer click

**Sentido:** El mosaico maximiza la superficie visual sin scroll. En mobile, el carrusel es el patrón más natural para fotos.

### 4. BREADCRUMB (líneas 484-501)

- `hidden sm:block` — oculto en mobile pequeño
- Schema.org `BreadcrumbList` con `itemProp`
- Separador: `ChevronRight w-3 h-3`
- Links interactivos excepto el último (span)

### 5. TÍTULO + DIRECCIÓN (líneas 503-512)

- H1: `text-[20px] sm:[24px] md:[30px] lg:[36px]` uppercase, tracking `[0.04em]`
- Dirección: `text-[12px] sm:[13px]` con icono MapPin, tracking `[0.1em]` uppercase

### 6. PRECIO INLINE — Mobile/Tablet (líneas 514-529)

- `lg:hidden` — solo visible cuando NO hay sidebar de precio
- Precio principal: `text-[26px] sm:[30px]` + precio original tachado + badge descuento gold
- Precio por m² + alquiler opcional
- CTA "Avísame si baja el precio" con icono BellRing y animación wiggle

**Sentido:** En mobile no hay sidebar derecha, así que el precio debe estar inline inmediatamente visible.

### 7. SPECS GRID (líneas 531-550)

- `grid grid-cols-4 gap-1.5 sm:gap-2`
- Cada celda: `bg-neutral-50 border border-neutral-200 rounded-sm`
- Icono (Bed/Bath/Maximize/Fence) + valor + label
- Debajo: Year built + Status en línea separada

**Sentido:** Vista compacta de las 4 métricas clave que el comprador busca primero.

### 8. PROPERTY TAGS (líneas 553-563)

- Tag "Exclusive" con borde gold y icono Star
- Tags genéricos: borde neutral, font-light
- `flex flex-wrap gap-2`

### 9. ABOUT THIS PROPERTY (líneas 565-574)

- Texto con `line-clamp-[12]` cuando colapsado
- Botón "Read more / Show less" con chevron animado (`rotate-180`)
- `whitespace-pre-line` para respetar párrafos del CMS

**Sentido:** La descripción larga se trunca para no abrumar, pero siempre es accesible.

### 10. BASIC CHARACTERISTICS (líneas 576-608)

- `grid grid-cols-1 md:grid-cols-2 gap-x-12`
- Filas: label a la izquierda, valor a la derecha, separadas por `border-b`
- Columna 1: Reference, Property type, Price, Built area, Energy rating
- Columna 2: Bedrooms, Bathrooms, Useful area, Plot

### 11. FEATURES & AMENITIES (líneas 610-621)

- `grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3`
- Check icon + nombre por cada feature
- 16 features en el mock

### 12. FLOOR PLANS (líneas 623-642)

- `grid grid-cols-1 sm:grid-cols-2 gap-4`
- Placeholder: icono Grid3X3 centrado con texto del piso
- Footer con nombre del piso y superficie

### 13. MARKET DATA (líneas 645-664)

- `grid grid-cols-2 gap-4`
- 4 tarjetas: label, valor grande, barra de progreso (gold), trend con TrendingUp
- Texto explicativo debajo

**Sentido:** Contexto de mercado para que el comprador entienda si el precio es justo.

### 14. NEARBY AREAS (líneas 666-679)

- `grid grid-cols-1 sm:grid-cols-2 gap-3`
- Links con contador de propiedades
- Hover: `bg-neutral-100 border-neutral-300`

### 15. MORTGAGE CALCULATOR (líneas 681-686)

- Componente externo `<LuxuryMortgageCalculator />`
- Wrapper con overrides CSS para integración visual

### 16. STICKY PRICE CARD — Desktop (líneas 689-753)

- `lg:col-span-5 lg:self-start`
- `lg:sticky lg:top-[84px] lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto`
- Schema.org Offer meta tags
- Tag (FOR SALE) + PDF download popover (Ficha 1 página / Catálogo 3 páginas)
- Precio grande `text-[32px]` + original tachado + badge descuento
- Precio por m² + "Also for rent" con icono Home gold
- CTAs: Call (negro) + WhatsApp (verde #25D366) + Send Enquiry (borde)
- Agency info + REF centrado
- CTA "Avísame si baja el precio" con borde gold

**Sentido:** El sidebar sticky es el principal punto de conversión. Siempre visible mientras el usuario scrollea.

### 17. BUYER'S GUIDE BANNER (líneas 758-770)

- Banner horizontal: título + descripción + botón "Download Guide"
- `border border-neutral-200 rounded-sm`

### 18. ABOUT AREA (líneas 772-820)

- Full width, 2 columnas en desktop
- Texto con highlights en `<strong>`
- Video del área o placeholder

### 19. SIMILAR PROPERTIES (líneas 822-847)

- `grid grid-cols-1 md:grid-cols-3 gap-8`
- Cards con imagen, tag, ubicación, nombre, specs, precio
- Link con hover shadow

### 20. INTERNAL SEO LINKS (líneas 849-861)

- `bg-neutral-50` fondo
- Pills con hover: `hover:bg-luxury-black hover:text-white`
- 8 links internos

### 21. NEWSLETTER (líneas 863-877)

- 2 columnas: texto + formulario
- Input email + botón submit full width

### 22. RECENTLY VIEWED (líneas 879-895)

- Scroll horizontal (`overflow-x-auto`)
- Thumbnails de 150px con nombre y precio
- 5 items (datos mock duplicados)

### 23. FOOTER (líneas 897-905)

- `bg-luxury-black` minimal
- Brand name + copyright

---

## 🔲 Overlays y Modales

### ENQUIRY MODAL (líneas 907-1041)

**3 stages secuenciales:**

**Stage 1 — FORM (`enquirySent === "idle"`):**
- Property preview card (imagen 96x80 + título + precio + REF)
- Campos: Full name, Email, Phone (LuxuryPhoneInput), Message
- Checkbox "I'd like to schedule a visit" → expande selector fecha/hora
  - Fecha: Calendar popover con `disabled` para fechas pasadas
  - Hora: Select con slots de 30 min (9:00-19:00)
- Checkbox terms + privacy con links
- Botón "Send Enquiry" o "Request Visit" según checkbox

**Stage 2 — THANK YOU (`enquirySent === "thanks"`):**
- Icono check en círculo gold
- Texto de confirmación con título y REF
- Animación "Finding similar properties…" con dot pulsante
- Auto-transición a stage 3 después de 5 segundos

**Stage 3 — SUGGESTIONS (`enquirySent === "suggestions"`):**
- Mismo header de thank you
- Grid de 3 propiedades similares (imagen + detalles)
- Botón "Back to Property"

**Sentido:** Flow de conversión optimizado: no es solo un formulario, sino una experiencia que mantiene engagement con sugerencias post-envío.

### LANGUAGE MODAL (líneas 1043-1061)

- `grid grid-cols-3 gap-2`
- Banderas (40x30) + nombre del idioma
- Selección activa: `bg-neutral-50 border-neutral-300`

### CHATBOT (líneas 1081-1138)

- Botón flotante: `w-14 h-14 rounded-full` en `bottom-[72px] right-4` (mobile, sobre sticky bar) o `bottom-6 right-6` (desktop)
- Panel: fullscreen en mobile (`inset-0`), card en desktop (`w-[380px] h-[520px]`)
- Header con brand name + close
- Preview de propiedad (imagen + título + precio + ubicación)
- Mensajes: bot en `bg-neutral-100`, user en `bg-luxury-black text-white`
- Input con botón Send circular
- Respuestas mock con delay 1s

**Sentido:** Chat widget omnipresente para capturar dudas inmediatas sin salir de la página.

### LIGHTBOX (líneas 1143-1229)

- `fixed inset-0 z-[100] bg-black/95`
- Contador: `{n} / {total}` o "Contact"
- Botón Grid View + Close en top bar
- Navegación:
  - **PC:** Zonas de click invisibles (50% izquierda = prev, 50% derecha = next) con cursores `cursor-w-resize` / `cursor-e-resize`
  - **Mobile/Tablet:** Swipe touch (50px threshold)
  - Flechas visibles (`hidden lg:flex`)
- **Contact CTA Slide** (después de la última foto):
  - Primera imagen blur `blur-xl opacity-30` de fondo
  - Título, ubicación, REF, precio
  - 3 botones: Call, WhatsApp, Enquiry
  - "Back to photos" link
- Thumbnails en footer: `w-[56px] h-[40px]`, activo con `ring-2 ring-white`

### GRID VIEW (líneas 1232-1276)

- `fixed inset-0 z-[100] bg-black/95 overflow-y-auto`
- Sticky top bar con contador + close
- Grid: `grid-cols-2 sm:3 lg:4 gap-1.5`
- Click en imagen → cierra grid, abre lightbox en esa foto
- Contact CTA al final de la grid

### MOBILE STICKY BAR (líneas 1063-1079)

- `fixed bottom-0 z-50 bg-white border-t shadow`
- 3 botones: Call, WhatsApp, Enquiry
- Separadores: `w-px h-8 bg-neutral-200`
- Icons `w-4 h-4` + text `text-[10px] tracking-[0.1em] uppercase`
- WhatsApp en `text-[#25D366]`

### PRICE ALERT MODAL (líneas 1281-1290)

- Componente externo: `<DetailPriceAlertModal>`
- Props: ref, título, precio, imagen, ubicación

---

## 🎨 Tokens de Diseño Usados

| Token | Uso |
|-------|-----|
| `text-luxury-black` | Color principal de texto |
| `text-luxury-black/XX` | Opacidades (85, 80, 70, 60, 55, 50, 45, 40, 35, 30, 20) |
| `text-luxury-gold` | Acentos premium (descuento, alertas, exclusive tag) |
| `bg-luxury-gold/10`, `bg-luxury-gold/5` | Fondos sutiles gold |
| `border-luxury-gold/40`, `border-luxury-gold/30` | Bordes gold |
| `bg-neutral-50` | Fondos de tarjetas y secciones |
| `border-neutral-200` | Bordes principales |
| `border-neutral-100` | Bordes sutiles (separadores internos) |
| `#25D366` | WhatsApp green (hardcoded) |

---

## 📊 SEO & Schema.org

5 schemas JSON-LD en `@graph`:
1. **RealEstateListing** — precio, seller, imágenes
2. **Product** — para Google Shopping / rich results
3. **Residence** — floorSize, rooms, yearBuilt, geo
4. **Place** — localización con geo coordinates
5. **BreadcrumbList** — migas de pan

HTML semántico: `itemScope`, `itemProp` en secciones relevantes.

Meta tags via `<SEOHead>`:
- Title: título de la propiedad
- Description: resumen con specs y precio
- Canonical URL
- og:image

---

## 📱 Breakpoints Responsive

| Elemento | Mobile (<640px) | Tablet (640-1023px) | Desktop (≥1024px) |
|----------|----------------|--------------------|--------------------|
| Gallery | Carousel swipe | Carousel swipe | Mosaic 4x2 grid |
| Layout | 1 columna | 1 columna | 2 columnas (7/5) |
| Precio | Inline bajo título | Inline bajo título | Sidebar sticky |
| Specs | 4-col grid compacto | 4-col grid | 4-col grid |
| Sticky bar | Call/WA/Enquiry fixed bottom | Call/WA/Enquiry fixed bottom | Hidden |
| Chatbot | Fullscreen | Fullscreen | Card 380x520 |
| Menu | Fullscreen overlay | Fullscreen overlay | Inline navbar |
| Breadcrumb | Hidden | Visible | Visible |

---

## 🔗 Dependencias

| Componente/Módulo | Ruta |
|-------------------|------|
| `LuxuryPhoneInput` | `./LuxuryPhoneInput` |
| `LuxuryMortgageCalculator` | `./LuxuryMortgageCalculator` |
| `DetailPriceAlertModal` | `@/components/blocks/detail/DetailPriceAlertModal` |
| `SEOHead` | `@/components/shared/SEOHead` |
| `brand, navLeft, navRight, languages, currencies, areaUnits` | `@/config/template` |
| `Dialog, DialogContent, DialogTitle, DialogDescription` | `@/components/ui/dialog` |
| `Popover, PopoverContent, PopoverTrigger` | `@/components/ui/popover` |
| `Calendar` | `@/components/ui/calendar` |
| `useIsMobile` | `@/hooks/use-mobile` |
| 7 asset images | `@/assets/*` |

---

## 🔌 APIs Pendientes (Backend)

| Endpoint | Propósito |
|----------|-----------|
| `GET /api/properties/:id` | Datos de la propiedad (reemplaza PROPERTY hardcoded) |
| `GET /api/properties/:id/similar` | Propiedades similares |
| `GET /api/market-data/:location` | Datos de mercado por zona |
| `POST /api/enquiries` | Envío de formulario de consulta |
| `POST /api/price-alerts` | Registro de alerta de precio |
| `POST /api/chat` | Mensajes al chatbot (actualmente mock) |
| `POST /api/newsletter` | Suscripción newsletter |
| `GET /api/recently-viewed` | Propiedades vistas recientemente (actualmente mock) |
| `GET /api/properties/:id/brochure` | Descarga PDF (actualmente link estático) |

---

## 🧩 Z-Index Stack

| Capa | z-index | Elemento |
|------|---------|----------|
| Navbar | 50 | `sticky top-0` |
| Mobile sticky bar | 50 | `fixed bottom-0` |
| Chatbot button | 50 | `fixed` |
| Chatbot panel | 50 | `fixed` |
| Lightbox / Grid View | 100 | `fixed inset-0` |
| Mobile menu | 100 | `fixed inset-0` |
| Enquiry modal overlay | 110 | Custom `overlayClassName` |
| Enquiry modal content | 110 | Custom `className` |
