# Property PDF Sheets — Implementation Guide

## Overview

Two PDF property sheet formats are available, accessible from the property detail page via a hover dropdown on the download icon button:

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
| `src/components/luxury/PropertyDetailPage.tsx` (line ~209) | Download dropdown trigger |

---

## V1 — Single Page (Ficha)

### Layout (794×1123px = A4 at 96dpi):

```
┌─────────────────────────────────────┐
│ PRESTIGE REAL ESTATE    REF: PE-... │  ← Dark header bar
├─────────────────────────────────────┤
│                                     │
│         HERO IMAGE (320px)          │  ← Title + location overlaid
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
│   [Photo] [Photo]    │ [QR Code]    │
├──────────────────────┴──────────────┤
│ email · phone          © PRESTIGE   │  ← Dark footer bar
└─────────────────────────────────────┘
```

### Key design elements:
- **Colors**: `#FAF8F5` (background), `#2D2926` (dark bars), `#8B6F47` (accent/gold)
- **Font**: Jost, light weight for elegance
- **Section headers**: 10px uppercase gold with letter-spacing
- **Feature dots**: Small gold circles as bullet points

---

## V2 — Catalog (3 Pages)

### Page 1 — Cover:
- Full-bleed hero image with gradient overlay
- Title, subtitle, location, price prominently displayed
- "EXCLUSIVE" and "VILLA" tag badges
- Key specs (beds, baths, area) at bottom

### Page 2 — Details:
- 3-image photo grid (240px height)
- Full property description
- 4-column specifications grid (white cards with border)
- Features list with gold star icons
- Additional description continuation

### Page 3 — Gallery + Contact:
- Large 2-column gallery grid (420px height)
- Location section with dark background and map placeholder
- Agent contact card with initials avatar
- Legal disclaimer

### Shared sub-components:
```tsx
<HeaderBar pageNum={1} total={3} />  // Brand + REF + page counter
<FooterBar />                         // Contact + copyright
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
- **V2**: Downloads 3 sequential PNGs (one per page)

---

## Trigger in Property Detail Page

Located in `PropertyDetailPage.tsx` (~line 209), the FileDown icon button has a hover dropdown:

```tsx
<div className="relative group">
  <button title="Download PDF">
    <FileDown />
  </button>
  <div className="absolute ... opacity-0 group-hover:opacity-100">
    <Link to="/pdf-v1" target="_blank">FICHA (1 PAGE)</Link>
    <Link to="/pdf-v2" target="_blank">CATÁLOGO (3 PAGES)</Link>
  </div>
</div>
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
