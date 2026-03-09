# Property PDF Sheets — Implementation Guide

## Overview

Two PDF property sheet formats are available, accessible from the property detail page via a click-based Popover dropdown on the download icon button:

| Format | Route | Pages | Purpose |
|---|---|---|---|
| **V1 — Ficha** | `/pdf-v1` | 1 page | Quick single-page property summary |
| **V2 — Catálogo** | `/pdf-v2` | 3 pages | Full catalog with gallery, specs, and agent contact |

---

## File Locations

| File | Purpose |
|---|---|
| `src/components/pdf/PropertyPdfV1.tsx` | Single-page property sheet component |
| `src/components/pdf/PropertyPdfV2.tsx` | 3-page catalog component |
| `src/App.tsx` (routes) | Routes `/pdf-v1` and `/pdf-v2` |
| `src/components/luxury/PropertyDetailPage.tsx` | Popover download trigger (FileDown icon) |

---

## V1 — Single Page (Ficha)

### Layout (794×1123px = A4 at 96dpi):

```
┌─────────────────────────────────────┐
│ PRESTIGE REAL ESTATE    REF: PE-... │  ← Dark header bar
├─────────────────────────────────────┤
│                                     │
│         HERO IMAGE (360px)          │  ← Title + location overlaid
│         with gradient overlay       │
│                                     │
├─────────────────────────────────────┤
│ €4,650,000   5BD 4BA 420m² 1200m²  │  ← Price + specs bar
├──────────────────────┬──────────────┤
│                      │ YOUR ADVISOR │
│   DESCRIPTION        │ Name         │
│   Property text...   │ Phone/Email  │
│                      ├──────────────┤
│   FEATURES           │ DETAILS      │
│   • Pool • Views ... │ Type: Villa  │
│                      │ Year: 2023   │
│  [Photo][Photo][Photo]│ [QR Code]   │  ← 3 thumbnails
├──────────────────────┴──────────────┤
│ email · phone          © PRESTIGE   │  ← Dark footer bar
└─────────────────────────────────────┘
```

### Key design elements:
- **Hero image**: 360px height with gradient overlay and title/location
- **Thumbnails**: 3 images below description (`images.slice(1, 4)`, `h-[90px]`, `flex-1`)
- **Colors**: `#FAF8F5` (background), `#2D2926` (dark bars), `#8B6F47` (accent/gold)
- **Font**: Jost, light weight for elegance
- **Section headers**: 10px uppercase gold with letter-spacing
- **Feature dots**: Small gold circles as bullet points
- **QR placeholder**: Dashed border box with "Scan to view online"

### Data shape (V1):
```typescript
{
  ref: string;
  title: string;
  location: string;
  price: string;
  beds: number; baths: number; sqm: number; plot: number; garage: number; year: number;
  energyClass: string;
  description: string;
  features: string[];        // 12 items, displayed in 3-column grid
  images: string[];          // [hero, thumb1, thumb2, thumb3] — 4 images
  agent: { name, role, phone, email };
}
```

---

## V2 — Catalog (3 Pages)

### Page 1 — Cover:
- Full-bleed hero image with gradient overlay (`from-[#2D2926] via-[#2D2926]/30 to-transparent`)
- "EXCLUSIVE" gold badge + "VILLA" outlined badge
- Title, subtitle (italic), location with MapPin icon
- Price prominently displayed with key specs (beds, baths, area, plot)

### Page 2 — Details:
- 3-image photo grid (`h-[240px]`, `grid-cols-3`)
- Full property description (whitespace-pre-line for paragraphs)
- 4-column specifications grid (white cards with border)
- Features list with gold Star icons (4-column grid)
- Additional description continuation at bottom

### Page 3 — Gallery + Contact:

**IMPORTANT**: This page uses a split layout with absolute positioning for the bottom section to prevent overflow:

```
┌─────────────────────────────────────┐
│ PRESTIGE REAL ESTATE    REF · 3/3   │  ← HeaderBar
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────┬─────────────┐      │
│  │             │   Image 2   │      │  ← Gallery grid (300px)
│  │   Image 1   ├─────────────┤      │    with overflow:hidden wrappers
│  │             │   Image 3   │      │
│  └─────────────┴─────────────┘      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ IM │ YOUR DEDICATED ADVISOR │    │  ← Agent card (border)
│  │    │ Isabella Martínez      │    │
│  └─────────────────────────────┘    │
│                                     │
│         (flexible space)            │
│                                     │
│  ─────── Disclaimer ────────        │  ← position:absolute bottom
│                                     │
│  ┌─────────────────────────────┐    │
│  │ LOCATION          ┌──────┐ │    │  ← Dark bg, at very bottom
│  │ 📍 Santa Eulalia  │ 🌐   │ │    │
│  │ Description...    └──────┘ │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│ email · phone          © PRESTIGE   │  ← FooterBar
└─────────────────────────────────────┘
```

**Architecture of Page 3:**
- Top section (normal flow, `padding: 20px 32px`): Gallery grid + Agent card
- Bottom section (`position: absolute, bottom: 0`): Disclaimer + Location + FooterBar
- Gallery images wrapped in `overflow: hidden` divs to prevent bleed
- All sections use inline `style={{}}` for precise pixel control

### Shared sub-components:
```tsx
<HeaderBar pageNum={1} total={3} />  // Brand + REF + page counter
<FooterBar />                         // Contact + copyright
```

### Data shape (V2 — extends V1):
```typescript
{
  // ...all V1 fields, plus:
  subtitle: string;           // Italic tagline below title
  shortDesc: string;          // Continuation text for page 2 bottom
  features: string[];         // 16 items, displayed in 4-column grid with Star icons
  images: string[];           // 7 images total: [hero, detail1-3, gallery1-3]
}
```

---

## Download Mechanism

Uses `html2canvas` library (already installed) to capture each page as a high-res PNG:

```typescript
const canvas = await html2canvas(pageElement, {
  scale: 2,        // 2x resolution for print quality
  useCORS: true,   // Allow cross-origin images
  backgroundColor: "#FAF8F5",
});
const link = document.createElement("a");
link.download = `${PROPERTY.ref}-ficha.png`;
link.href = canvas.toDataURL("image/png");
link.click();
```

- **V1**: Downloads a single PNG
- **V2**: Downloads 3 sequential PNGs (one per page), iterating `querySelectorAll("[data-pdf-page]")`

---

## Trigger in Property Detail Page

Located in `PropertyDetailPage.tsx`, uses a **Popover** component (click-based, not hover):

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <button title="Download PDF">
      <FileDown />
    </button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-[180px] p-0 rounded-none">
    <Link to="/pdf-v1" target="_blank">FICHA (1 PAGE)</Link>
    <Link to="/pdf-v2" target="_blank">CATÁLOGO (3 PAGES)</Link>
  </PopoverContent>
</Popover>
```

---

## Customization for Production

### Connecting real property data:

Replace the hardcoded `PROPERTY` object with dynamic data. Options:

1. **URL params**: `/pdf-v1/:id` → fetch property by ID
2. **Context/props**: Pass property data via React context
3. **Query params**: `/pdf-v1?id=123` → use `useSearchParams`

Example:
```tsx
// In PropertyPdfV1.tsx
const { id } = useParams();
const { data: property } = useQuery(['property', id], () => fetchProperty(id));
```

### Adding a real QR code:
Replace the QR placeholder with a library like `qrcode.react`:
```tsx
import { QRCodeSVG } from 'qrcode.react';
<QRCodeSVG value={`https://yoursite.com/property/${id}`} size={56} />
```

### True PDF generation:
For actual PDF files instead of PNGs, consider:
- `jspdf` + `html2canvas` for client-side PDF
- Server-side rendering with Puppeteer/Playwright

---

## Dependencies

| Package | Purpose | Already installed? |
|---|---|---|
| `html2canvas` | Captures DOM as image | ✅ Yes |
| `lucide-react` | Icons | ✅ Yes |
| `@/components/ui/popover` | Download trigger | ✅ Yes (shadcn) |

---

## Design Tokens Used

| Token | Value | Usage |
|---|---|---|
| `#FAF8F5` | `palette.bg` | Page background |
| `#2D2926` | `palette.text` / `palette.footer` | Headers, footers, dark sections |
| `#8B6F47` | `palette.accent` | Gold accents, section headers, icons |
| `#6B6560` | `palette.textMuted` | Secondary text |
| `#9A938B` | `palette.textLight` | Tertiary text, disclaimers |
| `#E2DCD4` | `palette.border` | Borders, separators |
| `Jost` | `fonts.brand` | All typography |

All values sourced from `src/config/template.ts`.

---

## Known Constraints

- Page dimensions are fixed at **794×1123px** (A4 at 96dpi)
- V2 Page 3 uses **absolute positioning** for the bottom section (Location + Disclaimer + Footer) to prevent content overflow
- Gallery images in V2 Page 3 must be wrapped in `overflow: hidden` containers
- All styling in V2 Page 3 uses **inline styles** for precise pixel control within the fixed A4 canvas
