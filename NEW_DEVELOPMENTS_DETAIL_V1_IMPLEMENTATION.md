# NEW DEVELOPMENTS DETAIL V1 — Implementation Guide

> **Route:** `/new-developments/:slug`
> **File:** `src/components/luxury/NewDevelopmentDetailPage.tsx`
> **Lines:** 1 176
> **Status:** Production — monolithic page component

---

## 0 — Architecture Overview

This page is a **self-contained monolithic component** (no block decomposition). All data, utilities, sub-components, and modals live inside a single file. It mirrors the architecture of `BrandedResidenceDetailPage.tsx`.

### Dependencies

| Dependency                | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `react-router-dom`        | `useParams` to read `:slug`, `<Link>` for nav |
| `Layout`                  | Wraps page with Navbar + Footer               |
| `FadeIn`                  | Scroll-triggered reveal animation             |
| `SEOHead`                 | `<title>` and `<meta description>`            |
| `Dialog / DialogContent`  | Radix-based modal for enquiry/visit forms     |
| `config/template.ts`      | `brand`, `palette`, `fonts`, `contact`         |
| `lucide-react`            | All icons                                     |
| 7 image imports           | Static assets for hero + unit placeholders    |

### State Variables (14 total)

| Variable        | Type                          | Purpose                          |
| --------------- | ----------------------------- | -------------------------------- |
| `lightbox`      | `number \| null`              | Currently open photo index       |
| `gridView`      | `boolean`                     | Show all-photos grid overlay     |
| `showEnquiry`   | `boolean`                     | Enquiry modal visibility         |
| `showVisit`     | `boolean`                     | Visit modal visibility           |
| `filterType`    | `string`                      | Active unit type filter          |
| `enquirySent`   | `boolean`                     | Enquiry form success state       |
| `visitSent`     | `boolean`                     | Visit form success state         |
| `heroSlide`     | `number`                      | Current mobile hero image index  |
| `chatOpen`      | `boolean`                     | Chat panel visibility            |
| `chatMessages`  | `{role,text}[]`               | Chat conversation history        |
| `chatInput`     | `string`                      | Current chat input value         |
| `heroTouchStart`| `ref {x,y}`                   | Touch start coords (hero swipe)  |
| `lbTouchStart`  | `ref {x,y}`                   | Touch start coords (lightbox)    |

### Derived State

| Variable          | Derivation                                            |
| ----------------- | ----------------------------------------------------- |
| `availableUnits`  | `p.units.filter(u => u.status !== "Sold")`            |
| `filteredUnits`   | Filter by `filterType` or show all if "All"           |
| `typologyOptions` | `["All", ...unique unit types]`                       |

---

## 1 — Data Model

### `NewDevProject` interface

```typescript
interface NewDevProject {
  slug: string;                    // URL parameter
  name: string;                    // "Marea Residences"
  developer: string;               // "Grupo Prasa"
  location: string;                // "Altea, Costa Blanca"
  municipality: string;            // "Altea"
  delivery: string;                // "Q2 2027"
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;            // 0–100 percentage
  totalUnits: number;
  availableUnits: number;
  priceMin: number;
  priceMax: number;
  description: string;             // Short desc for SEO
  longDescription: string[];       // Array of paragraphs
  images: string[];                // 5–7 image URLs
  amenities: { icon: any; label: string }[];
  typologies: { type: string; from: number; sqmRange: string }[];
  units: Unit[];
  location_data: {
    area: string;
    nearbyPlaces: { name: string; distance: string }[];
    airport?: string;
    airportDistance?: string;
  };
  highlights: string[];
  trending?: boolean;
  estimatedROI?: string;           // e.g. "5 – 7%"
}
```

### `Unit` interface

```typescript
interface Unit {
  ref: string;           // "MR-4A"
  type: string;          // "Apartment" | "Penthouse" | "Duplex" | "Villa"
  beds: number;
  baths: number;
  sqm: number;
  floor: string;         // "4th", "Ground", "Top"
  orientation: string;   // "South-East", "South", etc.
  price: number;
  status: "Available" | "Reserved" | "Sold";
}
```

### Utility Functions

```typescript
// Price formatting — German locale with EUR currency, no decimals
const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

// Status color mapping
const statusColor = (s: string) => {
  "Pre-Launch"         → palette.accent  (#8B6F47)
  "Selling"            → "#2a7d5f"       (green)
  "Under Construction" → "#c0862b"       (amber)
  "Last Units"         → "#c0392b"       (red)
};

// Unit status styling
const unitStatusStyle = (s: string) => {
  "Available" → { color: "#2a7d5f", bg: "#2a7d5f12" }
  "Reserved"  → { color: "#e67e22", bg: "#e67e2212" }
  "Sold"      → { color: "#999",    bg: "#99999912" }
};
```

---

## 2 — Page Sections (in render order)

---

### SECTION 1: Hero Gallery

**Location:** Lines 499–558
**Breakpoints:** Mobile/Tablet (`lg:hidden`) vs Desktop (`hidden lg:grid`)

#### 1A — Mobile/Tablet: Swipeable Gallery

```
HTML Structure:
<section aria-label="Project photos">
  <div class="lg:hidden relative overflow-hidden">     ← Container
    <div class="flex transition-transform">             ← Slide track
      <div class="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]">  ← Each slide
        <img>
      </div>
    </div>
    <div class="absolute bottom-3 left-1/2 ...">       ← Counter "1 / 7"
    <div class="absolute bottom-3 left-4 ...">         ← ROI badge (conditional)
    <div class="absolute top-4 left-4 ...">            ← Back link
  </div>
```

**CSS Specs:**

| Element       | Classes / Styles                                                    |
| ------------- | ------------------------------------------------------------------- |
| Container     | `lg:hidden relative overflow-hidden`                                |
| Slide track   | `flex transition-transform duration-300 ease-out`                   |
| Transform     | `style={{ transform: translateX(-${heroSlide * 100}%) }}`           |
| Each slide    | `w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]`                   |
| Image         | `w-full h-full object-cover`                                       |
| Counter pill  | `absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full` |
| ROI badge     | `absolute bottom-3 left-4 z-20 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-sm` |
| ROI label     | `text-[8px] tracking-[0.2em] uppercase font-medium text-white/60 mb-0.5` |
| ROI value     | `text-sm font-light text-white`                                    |
| Back link     | `absolute top-4 left-4 z-20` → inner: `inline-flex items-center gap-2 text-white/70 hover:text-white text-[12px] tracking-wide drop-shadow-md` |

**Functionality:**
- Touch swipe detection via `onTouchStart` / `onTouchEnd` handlers
- Minimum horizontal swipe distance: **50px** (ignores vertical swipes)
- Swipe left → next slide (clamped to `images.length - 1`)
- Swipe right → previous slide (clamped to 0)
- Click on any slide → opens lightbox at that index

#### 1B — Desktop: Mosaic Grid

```
HTML Structure:
<div class="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
  <div class="col-span-2 row-span-2">         ← Main image (large, 50%)
    <img>
    <Link "← All New Developments">            ← Back nav (top-left)
    <div ROI badge>                            ← Bottom-left (conditional)
    <div brand badge>                          ← Bottom-right
  </div>
  <div> × 4                                    ← 4 secondary images
    <img>
  </div>
</div>
<div class="hidden lg:block relative">
  <button "Show all photos">                   ← Opens gridView overlay
</div>
```

**CSS Specs:**

| Element         | Classes / Styles                                                      |
| --------------- | --------------------------------------------------------------------- |
| Grid container  | `hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]`          |
| Main image cell | `col-span-2 row-span-2 relative overflow-hidden cursor-pointer group` |
| Image           | `w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]` |
| Secondary cells | `relative overflow-hidden cursor-pointer group`                      |
| Sec. image      | `w-full h-full object-cover transition-transform duration-700 group-hover:scale-105` |
| Back link       | `absolute top-6 left-6 z-20` → inner: `text-[13px] tracking-wide text-white/70 hover:text-white drop-shadow-md` |
| ROI badge       | `absolute bottom-4 left-4 z-20 px-4 py-3 bg-black/50 backdrop-blur-sm rounded-sm` |
| Brand badge     | `absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm` → `text-[11px] tracking-[0.2em] font-medium uppercase` |
| "Show all" btn  | `absolute -top-[52px] right-5 bg-white/90 backdrop-blur-sm text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md hover:bg-white` |

**Functionality:**
- Click any image → opens lightbox at that index
- "Show all photos" button → sets `gridView = true`
- Grid shows first 5 images: 1 large (2×2) + 4 small (1×1)

---

### SECTION 2: Title + Info Bar

**Location:** Lines 561–604

```
HTML Structure:
<section class="border-b" style="bg: palette.white">
  <div class="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-10">
    <FadeIn>
      <div status badge>          ← "Selling" / "Pre-Launch" etc.
      <h1>                        ← Project name
      <div location + delivery>   ← MapPin icon + location text + delivery
      <div price + trending>      ← Price range + optional trending badge
    </FadeIn>
    <div stats ribbon>            ← 5 stats in a row
  </div>
</section>
```

**CSS Specs:**

| Element          | Classes / Styles                                                          |
| ---------------- | ------------------------------------------------------------------------- |
| Section          | `border-b` + `background: palette.white` + `borderColor: palette.border` |
| Container        | `max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-10`          |
| Status badge     | `inline-flex items-center gap-2 px-4 py-2` + dynamic bg/border from `statusColor()` at 10%/30% opacity |
| Status icon      | `Building2 w-4 h-4` + `color: statusColor()`                            |
| Status text      | `text-[11px] tracking-[0.25em] uppercase font-light`                     |
| H1               | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1]` + `fontFamily: fonts.heading` + `letterSpacing: 0.05em` |
| Location row     | `flex items-center gap-3 mb-5`                                           |
| Location icon    | `MapPin w-4 h-4` + `color: palette.textLight`                            |
| Location text    | `text-[14px] font-light` + `color: palette.textMuted`                    |
| Separator        | `·` character + `color: palette.border`                                   |
| Price            | `text-xl sm:text-2xl font-extralight` + `color: palette.text`            |
| Trending badge   | `ml-2 px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium rounded-sm flex items-center gap-1` + accent border/bg at 50%/10% |
| Stats ribbon     | `flex flex-wrap gap-6 sm:gap-10 pt-6 border-t` + `borderColor: palette.border` |
| Stat label       | `text-[9px] tracking-[0.2em] uppercase font-medium mb-1` + `color: palette.textLight` |
| Stat value       | `text-[17px] font-light` + `color: palette.text`                         |

**Stats displayed:** Total Units, Available, Construction %, Delivery, Developer

---

### SECTION 3: Main Content (Two-Column Layout)

**Location:** Lines 606–763
**Layout:** `grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16`

#### 3A — Left Column: Description

```
HTML Structure:
<FadeIn>
  <p section-label>        ← "About the Project"
  <h2>                     ← Project name
  <div paragraphs>         ← longDescription array
</FadeIn>
```

**CSS Specs:**

| Element        | Classes / Styles                                                           |
| -------------- | -------------------------------------------------------------------------- |
| Section label  | `text-xs tracking-[0.3em] uppercase mb-3 font-normal` + `color: palette.accent` |
| H2             | `text-2xl sm:text-3xl font-extralight mb-8` + `fontFamily: fonts.heading` + `letterSpacing: 0.04em` |
| Paragraph wrap | `space-y-5 text-[15px] leading-[1.9] font-light` + `color: palette.textMuted` |

#### 3B — Left Column: Highlights

```
HTML Structure:
<FadeIn delay={0.1}>
  <div class="mt-12 p-8 rounded-sm" style="bg: palette.bg">
    <h3 section-label>
    <div>
      { highlights.map → <div><CheckCircle2/> <span text/></div> }
    </div>
  </div>
</FadeIn>
```

**CSS Specs:**

| Element         | Classes / Styles                                                          |
| --------------- | ------------------------------------------------------------------------- |
| Container       | `mt-12 p-8 rounded-sm` + `background: palette.bg`                        |
| H3 label        | `text-[11px] tracking-[0.2em] uppercase font-medium mb-5` + `color: palette.accent` |
| Each row        | `flex items-start gap-3`                                                  |
| Check icon      | `CheckCircle2 w-4 h-4 mt-0.5 flex-shrink-0` + `color: palette.accent`   |
| Text            | `text-[14px] font-light` + `color: palette.text`                         |
| Row spacing     | `space-y-3`                                                              |

#### 3C — Left Column: Download Brochure CTA

```
HTML Structure:
<FadeIn delay={0.12}>
  <div class="mt-12 p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6">
    <div flex-1>
      <p label>         ← "Download"
      <h3>              ← "{name} Brochure"
      <p description>
    </div>
    <button>            ← "Download PDF"
  </div>
</FadeIn>
```

**CSS Specs:**

| Element       | Classes / Styles                                                              |
| ------------- | ----------------------------------------------------------------------------- |
| Container     | `mt-12 p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6` + `background: palette.bg` + `border: 1px solid palette.border` |
| Label         | `text-[10px] tracking-[0.2em] uppercase font-medium mb-2` + `color: palette.accent` |
| H3            | `text-lg font-light mb-1` + `fontFamily: fonts.heading`                      |
| Description   | `text-[13px] font-light` + `color: palette.textMuted`                        |
| Button        | `shrink-0 inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-light px-8 py-3.5 rounded-sm hover:opacity-90` + `background: palette.accent` + `color: #fff` |

**Functionality:** Click opens enquiry modal (`setShowEnquiry(true)`)

#### 3D — Left Column: Amenities Grid

```
HTML Structure:
<FadeIn delay={0.15}>
  <div class="mt-14">
    <p section-label>     ← "Lifestyle"
    <h2>                  ← "Amenities & Facilities"
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      { amenities.map → card with icon + label }
    </div>
  </div>
</FadeIn>
```

**CSS Specs:**

| Element        | Classes / Styles                                                    |
| -------------- | ------------------------------------------------------------------- |
| Grid           | `grid grid-cols-2 sm:grid-cols-4 gap-4`                            |
| Amenity card   | `flex flex-col items-center text-center p-5 rounded-sm` + `background: palette.bg` |
| Icon           | `w-6 h-6 mb-3` + `color: palette.accent`                           |
| Label          | `text-[13px] font-light` + `color: palette.text`                   |

#### 3E — Right Column: Sticky Sidebar

**Layout:** `lg:sticky lg:top-28 lg:self-start space-y-6`
**Width:** Fixed at `380px` via grid column definition

##### Price Card

```
HTML Structure:
<div class="p-6 rounded-sm border">
  <div badge>              ← Building2 icon + "New Development"
  <p price-range>          ← "€485.000 — €1.250.000"
  <p availability>         ← "28 of 64 units available"
  
  <div construction>       ← Progress bar with percentage
    <div track h-1.5 rounded-full bg:palette.bg>
      <div fill h-full rounded-full bg:palette.accent width:N%>
    </div>
  </div>
  
  <div typologies>         ← List with type, sqm range, starting price
  
  <button primary>         ← "Request Information" (Mail icon)
  <button secondary>       ← "Schedule a Visit" (Calendar icon)
  
  <div contact>            ← Call | WhatsApp links
</div>
```

**CSS Specs:**

| Element             | Classes / Styles                                                       |
| ------------------- | ---------------------------------------------------------------------- |
| Card container      | `p-6 rounded-sm border` + `background: palette.white` + `borderColor: palette.border` |
| Category badge      | `flex items-center gap-2 mb-1` → icon `w-4 h-4` + text `text-[10px] tracking-[0.2em] uppercase` + `color: palette.accent` |
| Price               | `text-[24px] font-extralight mb-1` + `color: palette.text`            |
| Availability        | `text-[12px] font-light mb-6` + `color: palette.textLight`            |
| Progress label      | `text-[11px] tracking-[0.15em] uppercase` + `color: palette.textLight` |
| Progress value      | `text-[14px] font-light` + `color: palette.text`                      |
| Progress track      | `h-1.5 rounded-full` + `background: palette.bg`                       |
| Progress fill       | `h-full rounded-full transition-all duration-700` + `background: palette.accent` + `width: N%` |
| Typology section    | `mb-6 pb-6` + `borderBottom: 1px solid palette.border`                |
| Typology label      | `text-[10px] tracking-[0.2em] uppercase font-medium mb-3` + `color: palette.textLight` |
| Typology row        | `flex items-center justify-between py-1.5`                            |
| Typology type       | `text-[13px] font-light` + `color: palette.textMuted`                 |
| Typology sqm        | `text-[11px]` + `color: palette.textLight`                            |
| Typology price      | `text-[13px] font-light` + `color: palette.text`                      |
| Primary CTA button  | `w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 mb-3` + `background: palette.accent` + `color: #fff` |
| Secondary CTA button| `w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5` + `border: 1px solid ${palette.accent}60` + `color: palette.accent` |
| Contact links row   | `mt-5 pt-5 flex items-center justify-center gap-4` + `borderTop: 1px solid palette.border` |
| Contact link        | `flex items-center gap-2 text-[12px] font-light hover:opacity-60` + `color: palette.textMuted` |

##### Location Card

```
HTML Structure:
<div class="p-6 rounded-sm border">
  <p label>                  ← "Location"
  <div icon + area name>     ← MapPin + "Altea, Costa Blanca"
  <div nearby places list>   ← name vs distance, space-y-2.5
  <div airport>              ← Globe icon + airport name + distance
</div>
```

**CSS Specs:**

| Element           | Classes / Styles                                                     |
| ----------------- | -------------------------------------------------------------------- |
| Card container    | `p-6 rounded-sm border` + `background: palette.white` + `borderColor: palette.border` |
| Label             | `text-[10px] tracking-[0.2em] uppercase font-medium mb-4` + `color: palette.accent` |
| Area row          | `flex items-start gap-2 mb-4`                                       |
| Area icon         | `MapPin w-4 h-4 mt-0.5 flex-shrink-0` + `color: palette.accent`    |
| Area text         | `text-[14px] font-light` + `color: palette.text`                    |
| Place row         | `flex items-center justify-between`                                 |
| Place name        | `text-[13px] font-light` + `color: palette.textMuted`              |
| Place distance    | `text-[12px] font-light` + `color: palette.textLight`              |
| Airport section   | `pt-3` + `borderTop: 1px solid palette.border`                     |
| Airport icon      | `Globe w-3.5 h-3.5` + `color: palette.textLight`                   |
| Airport text      | `text-[13px] font-light` + `color: palette.textMuted`              |

---

### SECTION 4: Units Table

**Location:** Lines 766–867
**Background:** `palette.bg`

```
HTML Structure:
<section class="py-16 sm:py-24" style="bg: palette.bg">
  <div class="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
    <FadeIn>
      <div text-center>
        <p section-label>          ← "Availability"
        <h2>                       ← "Available Units"
        <p subtitle>               ← "28 of 64 units currently available"
      </div>
    </FadeIn>
    
    <div filter-buttons>           ← "All" | "Apartment" | "Penthouse" | "Duplex"
    
    <div class="hidden sm:block">  ← Desktop: <table>
    <div class="sm:hidden">        ← Mobile: card list
  </div>
</section>
```

#### 4A — Filter Buttons

**CSS Specs:**

| Element          | Classes / Styles                                                     |
| ---------------- | -------------------------------------------------------------------- |
| Container        | `flex items-center justify-center gap-2 mb-8`                       |
| Button (inactive)| `px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-light rounded-sm` + `background: transparent` + `color: palette.textMuted` + `border: 1px solid palette.border` |
| Button (active)  | Same classes + `background: palette.accent` + `color: #fff` + `border: 1px solid palette.accent` |

**Functionality:** Click sets `filterType` state → filters units array

#### 4B — Desktop Table (`hidden sm:block`)

```
HTML Structure:
<table class="w-full text-left">
  <thead>
    <tr style="borderBottom: 2px solid palette.border">
      <th> × 9 columns
    </tr>
  </thead>
  <tbody>
    <tr> per unit
      <td ref>
      <td type>
      <td beds>
      <td baths>
      <td sqm>
      <td floor>
      <td price>
      <td status badge>
      <td enquire button>
    </tr>
  </tbody>
</table>
```

**CSS Specs:**

| Element          | Classes / Styles                                                     |
| ---------------- | -------------------------------------------------------------------- |
| Table            | `w-full text-left`                                                   |
| TH               | `py-3 px-3 text-[10px] tracking-[0.2em] uppercase font-medium` + `color: palette.textLight` |
| TH border        | `borderBottom: 2px solid palette.border`                             |
| TD               | `py-4 px-3`                                                         |
| TD ref           | `text-[13px] font-medium` + `color: palette.text`                   |
| TD text          | `text-[13px] font-light` + `color: palette.textMuted`               |
| TD price         | `text-[14px] font-light` + `color: palette.text`                    |
| TD sqm           | `text-[13px] font-light` + `color: palette.text`                    |
| Row border       | `borderBottom: 1px solid palette.border`                             |
| Status badge     | `text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full` + dynamic color/bg from `unitStatusStyle()` |
| Enquire link     | `text-[11px] tracking-[0.1em] uppercase font-light hover:opacity-60` + `color: palette.accent` |

**Columns:** Ref, Type, Beds, Baths, Size, Floor, Price, Status, Enquire

#### 4C — Mobile Cards (`sm:hidden`)

```
HTML Structure:
<div class="sm:hidden space-y-3">
  { filteredUnits.map → 
    <div class="p-4 rounded-sm border">
      <div row> ref + status badge
      <div row> type · beds · baths · sqm
      <div row> price + enquire button
    </div>
  }
</div>
```

**CSS Specs:**

| Element          | Classes / Styles                                                     |
| ---------------- | -------------------------------------------------------------------- |
| Card container   | `p-4 rounded-sm border` + `borderColor: palette.border` + `background: palette.white` |
| Ref              | `text-[13px] font-medium` + `color: palette.text`                   |
| Specs row        | `flex items-center gap-4 text-[13px] font-light mb-2` + `color: palette.textMuted` |
| Price            | `text-[15px] font-light` + `color: palette.text`                    |
| Enquire          | `text-[11px] tracking-[0.1em] uppercase font-light` + `color: palette.accent` |

---

### SECTION 5: CTA Section

**Location:** Lines 870–891

```
HTML Structure:
<section class="py-20 sm:py-28" style="bg: palette.bg">
  <div class="max-w-[800px] mx-auto px-5 text-center">
    <FadeIn>
      <Building2 icon>
      <h2>                         ← "Interested in {name}?"
      <p>                          ← Contact copy
      <div flex buttons>
        <button primary>           ← "Request Information"
        <button secondary>         ← "Schedule a Visit"
      </div>
    </FadeIn>
  </div>
</section>
```

**CSS Specs:**

| Element         | Classes / Styles                                                         |
| --------------- | ------------------------------------------------------------------------ |
| Section         | `py-20 sm:py-28` + `background: palette.bg`                             |
| Container       | `max-w-[800px] mx-auto px-5 text-center`                                |
| Icon            | `Building2 w-8 h-8 mx-auto mb-6` + `color: palette.accent`             |
| H2              | `text-2xl sm:text-3xl font-extralight leading-[1.15] mb-6` + `fontFamily: fonts.heading` + `letterSpacing: 0.06em` |
| Description     | `text-[15px] leading-[1.9] font-light mb-10` + `color: palette.textMuted` |
| Buttons row     | `flex flex-col sm:flex-row items-center justify-center gap-4`           |
| Primary CTA     | `inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 hover:opacity-90` + `background: palette.accent` + `color: #fff` |
| Secondary CTA   | Same sizing + `border: 1px solid ${palette.accent}60` + `color: palette.accent` + `hover:opacity-80` |

---

### SECTION 6: Fullscreen Lightbox

**Location:** Lines 893–967
**Trigger:** `lightbox !== null && !gridView`
**Z-index:** `z-[100]`

```
HTML Structure:
<div class="fixed inset-0 z-[100] bg-black/95 flex flex-col">
  <div header>
    <span counter>       ← "1 / 7" or "Contact"
    <div>
      <button grid>      ← Opens all-photos grid
      <button close>     ← X icon
    </div>
  </div>
  
  <div class="flex-1 relative flex items-center justify-center min-h-0">
    {photo view OR contact slide}
  </div>
  
  <div thumbnail strip>  ← Horizontal scrollable thumbnails
</div>
```

**Functionality:**
- **Photo navigation:** Desktop: invisible click zones (left/right halves) + arrow buttons. Mobile: touch swipe.
- **Extra slide:** After the last photo, `lightbox === images.length` shows a **contact slide** with blurred background, project info, and Call/WhatsApp/Enquiry buttons.
- **Thumbnail strip:** `w-[56px] h-[40px]` per thumb, active gets `ring-2 ring-white opacity-100`, inactive `opacity-40 hover:opacity-70`.

**CSS Specs:**

| Element           | Classes / Styles                                                    |
| ----------------- | ------------------------------------------------------------------- |
| Overlay           | `fixed inset-0 z-[100] bg-black/95 flex flex-col`                  |
| Header            | `flex items-center justify-between px-4 py-3 shrink-0`             |
| Counter           | `text-white/50 text-[13px] font-light`                             |
| Grid button       | `text-white/50 hover:text-white` → `Grid3X3 w-5 h-5`              |
| Close button      | `text-white/50 hover:text-white` → `X w-6 h-6`                    |
| Image             | `max-w-[90vw] max-h-full object-contain relative z-0`              |
| Left arrow        | `hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white` → `ChevronLeft w-8 h-8 strokeWidth={1}` |
| Right arrow       | Same, right-4 → `ChevronRight`                                     |
| Click zone left   | `hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize` |
| Click zone right  | Same, right-0, cursor-e-resize                                     |
| Contact slide bg  | `absolute inset-0 w-full h-full object-cover blur-xl opacity-30`   |
| Contact content   | `relative z-10 text-center px-6 max-w-lg`                          |
| Thumbnail strip   | `shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center`  |
| Thumbnail         | `w-[56px] h-[40px] shrink-0 overflow-hidden`                       |

---

### SECTION 7: Grid View (All Photos)

**Location:** Lines 970–1009
**Trigger:** `gridView === true`
**Z-index:** `z-[100]`

```
HTML Structure:
<div class="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto">
  <div sticky header>
    <span "N Photos">
    <button close>
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
    { images.map → clickable aspect-[4/3] thumbnails }
  </div>
  <div contact footer>   ← Brand icon, name, price, Call/WhatsApp/Enquiry
</div>
```

**CSS Specs:**

| Element       | Classes / Styles                                                        |
| ------------- | ----------------------------------------------------------------------- |
| Overlay       | `fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto`      |
| Sticky header | `sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0` |
| Grid          | `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4`   |
| Each thumb    | `relative aspect-[4/3] overflow-hidden group`                          |
| Thumb image   | `w-full h-full object-cover transition-transform duration-300 group-hover:scale-105` |
| Thumb overlay | `absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors` |
| Thumb number  | `absolute bottom-2 left-2 text-white/70 text-[11px] font-light`       |
| Footer section| `px-4 sm:px-8 py-10 text-center shrink-0`                              |

**Functionality:** Click thumbnail → close grid, open lightbox at that index

---

### SECTION 8: Enquiry Modal

**Location:** Lines 1014–1048
**Z-index:** Dialog overlay `!z-[110]`, content `z: 110`
**Width:** `sm:max-w-[480px]`

```
HTML Structure:
<Dialog>
  <DialogContent class="sm:max-w-[480px] p-0 border-0">
    {!enquirySent ? (
      <div class="p-8">
        <div badge>        ← Building2 + "New Development"
        <h3>               ← Project name
        <p>                ← Location
        <form>
          <input "Full Name *" required>
          <input "Email *" type=email required>
          <input "Phone" type=tel>
          <textarea "I'm interested..." rows=3>
          <button submit>  ← "Send Enquiry"
        </form>
      </div>
    ) : (
      <div class="p-8 text-center">
        <CheckCircle2 icon green>
        <h3 "Thank You">
        <p confirmation text>
        <button "Close">
      </div>
    )}
  </DialogContent>
</Dialog>
```

**CSS Specs (form inputs):**

| Element       | Classes / Styles                                                      |
| ------------- | --------------------------------------------------------------------- |
| Input         | `w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]` + `borderColor: palette.border` |
| Textarea      | Same as input + `resize-none`                                         |
| Submit button | `w-full py-3.5 text-[12px] tracking-[0.18em] uppercase font-light hover:opacity-90` + `background: palette.accent` + `color: #fff` |
| Success icon  | `CheckCircle2 w-12 h-12 mx-auto mb-4` + `color: #2a7d5f`            |
| Close link    | `text-[12px] tracking-[0.15em] uppercase font-light hover:opacity-60` + `color: palette.accent` |

---

### SECTION 9: Visit Modal

**Location:** Lines 1052–1095
**Identical structure to Enquiry Modal** with additional fields:

- Phone is `required`
- Date field: `<input type="date" required>`
- Time select: `<select>` with options Morning/Afternoon/Evening
- Date + Time in `grid grid-cols-2 gap-3`

**Functionality:** Submit sets `visitSent = true` → shows success state

---

### SECTION 10: Chat Panel

**Location:** Lines 1097–1152

```
HTML Structure:
{/* Floating button when closed */}
<button class="fixed z-50 w-14 h-14 rounded-full shadow-lg bottom-[72px] right-4 lg:bottom-6 lg:right-6">
  <MessageCircle>
</button>

{/* Chat panel when open */}
<div class="fixed z-50 bg-white border shadow-xl flex flex-col
            inset-0                                      ← mobile: fullscreen
            lg:inset-auto lg:bottom-6 lg:right-6         ← desktop: positioned
            lg:w-[380px] lg:h-[520px] lg:rounded-lg">
  <div header>             ← Brand name + close button
  <div property-context>   ← Small image + name + price + location
  <div messages>           ← Scrollable chat bubbles
  <div input-bar>          ← Text input + send button
</div>
```

**CSS Specs:**

| Element           | Classes / Styles                                                    |
| ----------------- | ------------------------------------------------------------------- |
| Float button      | `fixed z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bottom-[72px] right-4 lg:bottom-6 lg:right-6` + `background: palette.text` + `color: palette.white` |
| Panel (mobile)    | `fixed z-50 inset-0 bg-white border shadow-xl flex flex-col`       |
| Panel (desktop)   | `lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden` |
| Header            | `flex items-center justify-between px-4 py-3 border-b shrink-0` + `background: palette.bg` |
| Brand name        | `text-[13px] font-medium tracking-wide` + `color: palette.text`    |
| Property context  | `flex items-center gap-3 px-4 py-3 border-b shrink-0` + `background: ${palette.bg}80` |
| Context thumb     | `w-16 h-12 rounded overflow-hidden shrink-0`                       |
| Messages area     | `flex-1 overflow-auto px-4 py-4 space-y-3`                         |
| Bot bubble        | `max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg mr-auto` + `background: palette.bg` + `color: palette.textMuted` |
| User bubble       | Same + `ml-auto` + `background: palette.text` + `color: palette.white` |
| Input bar         | `border-t px-3 py-3 flex items-center gap-2`                       |
| Text input        | `flex-1 text-[13px] px-3 py-2 border rounded-full focus:outline-none` |
| Send button       | `w-9 h-9 flex items-center justify-center rounded-full shrink-0` + `background: palette.text` + `color: palette.white` |

**Functionality:**
- Bot auto-responds after 1000ms delay with generic message
- Enter key triggers send
- Mobile chat button positioned at `bottom-[72px]` to clear mobile bottom bar

---

### SECTION 11: Mobile Bottom Bar

**Location:** Lines 1154–1171

```
HTML Structure:
<div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
  <a Call>     ← Phone icon + "Call"
  <div separator>
  <a WhatsApp> ← MessageCircle icon + "WhatsApp" (green)
  <div separator>
  <button Enquiry> ← Mail icon + "Enquiry"
</div>
<div class="lg:hidden h-16" />   ← Spacer to prevent content occlusion
```

**CSS Specs:**

| Element       | Classes / Styles                                                       |
| ------------- | ---------------------------------------------------------------------- |
| Bar           | `lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-0` |
| Each button   | `flex-1 flex flex-col items-center justify-center gap-0.5 py-3 transition-colors hover:bg-neutral-50` |
| Icon          | `w-4 h-4`                                                             |
| Label         | `text-[10px] tracking-[0.1em] uppercase font-medium`                  |
| Separator     | `w-px h-8` + `background: palette.border`                             |
| Content spacer| `lg:hidden h-16` — prevents last content from hiding behind bar       |
| WhatsApp color| `text-[#25D366]` (fixed green, not themed)                             |

---

## 3 — Z-Index Stack

| Layer                 | Z-Index     | Element                       |
| --------------------- | ----------- | ----------------------------- |
| Mobile bottom bar     | `z-50`      | Call / WhatsApp / Enquiry     |
| Chat button/panel     | `z-50`      | Fixed chat interface          |
| Lightbox / Grid       | `z-[100]`   | Photo gallery overlay         |
| Modal overlays        | `!z-[110]`  | Enquiry / Visit dialogs       |
| Hero badges           | `z-20`      | Back link, ROI, brand         |

---

## 4 — Color Palette Reference

All colors from `src/config/template.ts`:

```
palette.bg          = "#FAF8F5"     ← Section backgrounds, amenity cards
palette.bgAlt       = "#F0ECE6"     ← (unused in this page)
palette.white       = "#FFFFFF"     ← Card backgrounds, main content bg
palette.text        = "#2D2926"     ← Headings, primary text
palette.textMuted   = "#6B6560"     ← Body text, descriptions
palette.textLight   = "#9A938B"     ← Labels, secondary info
palette.accent      = "#8B6F47"     ← CTAs, section labels, icons
palette.accentDark  = "#6E5636"     ← (unused in this page)
palette.border      = "#E2DCD4"     ← All borders, dividers
palette.footer      = "#000000"     ← (handled by Layout)
palette.newDevBg    = "#F7F4EF"     ← (unused — uses palette.bg instead)
```

---

## 5 — Typography Scale

| Role              | Size                           | Weight          | Tracking           |
| ----------------- | ------------------------------ | --------------- | ------------------ |
| H1 (project name) | `text-2xl → lg:text-5xl`       | `font-extralight` | `0.05em`          |
| H2 (section)      | `text-2xl sm:text-3xl`         | `font-extralight` | `0.04em`          |
| Section label      | `text-xs`                     | `font-normal`     | `0.3em`           |
| Subsection label   | `text-[10px] / text-[11px]`   | `font-medium`     | `0.2em / 0.25em`  |
| Body text          | `text-[15px]`                 | `font-light`      | —                 |
| Small text         | `text-[13px] / text-[14px]`   | `font-light`      | —                 |
| Badges/buttons     | `text-[10px] / text-[12px]`   | `font-light / font-medium` | `0.1em – 0.18em` |
| Stats value        | `text-[17px]`                 | `font-light`      | —                 |
| Stats label        | `text-[9px]`                  | `font-medium`     | `0.2em`           |
| Price (hero)       | `text-xl sm:text-2xl`         | `font-extralight` | —                 |
| Price (sidebar)    | `text-[24px]`                 | `font-extralight` | —                 |
| Table header       | `text-[10px]`                 | `font-medium`     | `0.2em`           |
| Table cell         | `text-[13px] / text-[14px]`   | `font-light`      | —                 |

---

## 6 — Responsive Breakpoints Summary

| Breakpoint | Behavior                                                          |
| ---------- | ----------------------------------------------------------------- |
| **< 640px** (mobile) | Single column. Swipeable hero. Unit cards (no table). Mobile bottom bar visible. Chat is fullscreen. |
| **640–1023px** (tablet) | `sm:` prefix active. Hero aspect `16/10`. Unit table appears. Some 2-col grids. |
| **≥ 1024px** (desktop) | `lg:` prefix active. Mosaic hero grid. Sticky sidebar. Full table. Bottom bar hidden. Chat as floating panel. |

---

## 7 — Mock Data (6 projects)

| Slug                      | Name             | Status             | Units | Price Range             |
| ------------------------- | ---------------- | ------------------- | ----- | ----------------------- |
| `marea-residences-altea`  | Marea Residences | Selling             | 64    | €485K – €1.25M          |
| `the-view-javea`          | The View Jávea   | Under Construction  | 24    | €1.2M – €2.8M           |
| `one-green-way-moraira`   | One Green Way    | Pre-Launch          | 42    | €890K – €2.1M           |
| `costa-serena-calpe`      | Costa Serena     | Selling             | 36    | €395K – €950K           |
| `sky-villas-benidorm`     | Sky Villas       | Last Units          | 48    | €520K – €1.8M           |
| `vista-marina-denia`      | Vista Marina     | Under Construction  | 38    | €340K – €780K           |

---

## 8 — Backend Requirements

### API Endpoint

```
GET /api/new-developments/:slug

Response: NewDevProject (full object including units array)
```

### Suggested Schema

```sql
CREATE TABLE new_developments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  developer TEXT NOT NULL,
  location TEXT NOT NULL,
  municipality TEXT NOT NULL,
  delivery TEXT NOT NULL,
  status TEXT CHECK (status IN ('Pre-Launch','Selling','Under Construction','Last Units')),
  construction INTEGER DEFAULT 0 CHECK (construction BETWEEN 0 AND 100),
  total_units INTEGER NOT NULL,
  available_units INTEGER NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT[] NOT NULL,
  amenities JSONB NOT NULL DEFAULT '[]',
  typologies JSONB NOT NULL DEFAULT '[]',
  location_data JSONB NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  trending BOOLEAN DEFAULT FALSE,
  estimated_roi TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE new_development_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  development_id UUID REFERENCES new_developments(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE new_development_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  development_id UUID REFERENCES new_developments(id) ON DELETE CASCADE,
  ref TEXT NOT NULL,
  type TEXT NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL,
  sqm INTEGER NOT NULL,
  floor TEXT NOT NULL,
  orientation TEXT NOT NULL,
  price INTEGER NOT NULL,
  status TEXT CHECK (status IN ('Available','Reserved','Sold')) DEFAULT 'Available'
);
```

---

## 9 — SEO

| Meta              | Value                                                    |
| ----------------- | -------------------------------------------------------- |
| `<title>`         | `{name} — New Development in {location}`                 |
| `<meta desc>`     | `{description}` (short desc from data)                   |
| H1                | Single: project name                                     |
| Semantic sections | `<section aria-label="Project photos">` for hero         |
| Internal links    | Back link to `/new-developments`                         |

### JSON-LD (recommended)

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "{name}",
  "description": "{description}",
  "url": "/new-developments/{slug}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "{municipality}",
    "addressRegion": "Costa Blanca"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "{priceMin}",
    "highPrice": "{priceMax}",
    "priceCurrency": "EUR"
  }
}
```
