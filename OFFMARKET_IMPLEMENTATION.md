# Off-Market Properties — Implementation Guide

## Overview

Off-market properties are exclusive listings that are **not publicly accessible**. They appear in the standard property listing (`/properties`) but with restricted visibility: blurred images, masked addresses, and a fixed descriptive text. Clicking on an off-market card opens a **modal with an inquiry form** instead of navigating to a property detail page.

---

## File Location

**All off-market logic is contained in a single file:**

```
src/components/luxury/LuxuryPropertyListing.tsx
```

### Components inside the file (in order of appearance):

| Component | Lines (approx.) | Purpose |
|---|---|---|
| `OffMarketModal` | ~547–650 | Full-screen modal with explanation text + contact form |
| `OffMarketPropertyCard` | ~666–748 | Horizontal card with blurred image, masked data, and click handler |
| Rendering logic | ~900 (inside `PROPERTIES.map()`) | Conditional: `offmarket ? OffMarketPropertyCard : PropertyCard` |

---

## Data Model

Off-market properties use the **same data structure** as regular properties, with one additional field:

```typescript
{
  id: 10,
  image: prop2,                          // Image (will be displayed BLURRED)
  gallery: [prop2],                      // Not used — modal replaces detail page
  tag: "OFF-MARKET",                     // Fixed tag
  style: "Luxury Villa",                 // Subtype — used to generate the title
  location: "Ibiza",                     // General area only (not exact address)
  title: "",                             // IGNORED — title is auto-generated
  excerpt: "",                           // IGNORED — fixed text is used instead
  beds: 7,                               // Shown normally
  baths: 6,                              // Shown normally
  sqm: 650,                              // Shown normally
  plot: 3500,                            // Shown normally (null if N/A)
  price: "Price on Request",             // Fixed — always "Price on Request"
  features: ["Sea Views", "Pool", ...],  // Shown normally
  offmarket: true,                       // ← THIS FLAG triggers off-market behavior
}
```

### Key rules:
- `offmarket: true` → renders `OffMarketPropertyCard` instead of `PropertyCard`
- `title` and `excerpt` fields are **ignored** — the card generates them automatically
- `image` is displayed with CSS `blur-lg` filter
- `location` is **never shown** on the card — replaced by `**********`

---

## Off-Market Property Card (`OffMarketPropertyCard`)

### Visual differences vs. standard card:

| Element | Standard Card | Off-Market Card |
|---|---|---|
| **Image** | Clear, with hover zoom | **Blurred** (`filter blur-lg scale-110`) + dark overlay with Lock icon |
| **Tag badge** | `FOR SALE` / `NEW BUILD` | `OFF-MARKET` with amber background |
| **Address line** | Full location | `**********` (masked) |
| **Subtype line** | `Detached houses \| Style \| REF-XXXX` | `{style} \| REF-XXXX` |
| **Title** | Property-specific title | `{STYLE} FOR SALE OFF-MARKET` (auto-generated) |
| **Description** | Property-specific excerpt | Fixed text (italic): *"This property is part of our exclusive off-market portfolio..."* |
| **Specs** | Beds, Baths, Built, Plot | ✅ Same — shown normally |
| **Features** | Property features | ✅ Same — shown normally |
| **Price** | Numeric price | `Price on Request` (italic, lighter opacity) |
| **Bottom-right** | — | `🔒 Request access` label |
| **Click action** | Navigates to `/property/:id` | **Opens `OffMarketModal`** |

### Title generation logic:
```typescript
const offmarketTitle = `${property.style.toUpperCase()} FOR SALE OFF-MARKET`;
// Example output: "LUXURY VILLA FOR SALE OFF-MARKET"
```

### Fixed description text:
```
"This property is part of our exclusive off-market portfolio. Details, images and exact 
location are only disclosed to qualified buyers through a personal consultation with 
one of our advisors."
```

### Image blur CSS:
```html
<img class="filter blur-lg scale-110" />
<!-- scale-110 prevents blur edges from showing white gaps -->
```

### Overlay on image:
```html
<div class="absolute inset-0 bg-luxury-black/40 flex flex-col items-center justify-center gap-3">
  <Lock icon />
  <span>Off-Market</span>
  <span>Click to request access</span>
</div>
```

---

## Off-Market Modal (`OffMarketModal`)

Opens when clicking any off-market card. Renders as a **fixed full-screen overlay** with `z-50`.

### Modal structure:

```
┌──────────────────────────────────────────┐
│ 🔒 Private Listing                   ✕  │
│ {Style} for sale off-market              │
│ REF-{id padded to 4 digits}             │
├──────────────────────────────────────────┤
│ 👁 This property is not publicly listed  │
│   and is only available through our      │
│   private network. The owner has         │
│   requested full discretion...           │
│                                          │
│   To receive the complete property       │
│   dossier — including exact location,    │
│   full photo gallery, floor plans and    │
│   pricing — please submit your enquiry   │
│   below.                                 │
├──────────────────────────────────────────┤
│ Beds: 7  │ Baths: 6 │ Built: 650 m²     │
├──────────────────────────────────────────┤
│ Full name *         │ Phone *            │
│ [_______________]   │ [______________]   │
│                                          │
│ Email *                                  │
│ [________________________________]       │
│                                          │
│ Message                                  │
│ [________________________________]       │
│ [________________________________]       │
│                                          │
│ [    REQUEST PROPERTY DOSSIER     ]      │
│                                          │
│   Your information is treated with       │
│   strict confidentiality.                │
└──────────────────────────────────────────┘
```

### Form fields:

| Field | Type | Required | Placeholder | Icon |
|---|---|---|---|---|
| Full name | `text` | ✅ | "Your name" | `User` |
| Phone | `tel` | ✅ | "+34 600 000 000" | `Phone` |
| Email | `email` | ✅ | "your@email.com" | `Mail` |
| Message | `textarea` (3 rows) | ❌ | "I would like to receive more information..." | — |

### Form submission:
Currently the form calls `e.preventDefault()` and closes the modal. **You must connect this to your backend** (e.g., email API, CRM webhook, database insert).

### Suggested backend integration:
```typescript
// Replace onSubmit handler with:
onSubmit={async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  await fetch('/api/offmarket-inquiry', {
    method: 'POST',
    body: JSON.stringify({
      propertyRef: `REF-${String(property.id).padStart(4, '0')}`,
      propertyStyle: property.style,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
    }),
  });
  // Show success toast
  onClose();
}}
```

---

## Rendering Logic

In the main `LuxuryPropertyListing` component, the property list renders conditionally:

```tsx
{/* Located inside <main> → property list div */}
<div>
  {PROPERTIES.map((p) =>
    p.offmarket
      ? <OffMarketPropertyCard key={p.id} property={p} />
      : <PropertyCard key={p.id} property={p} />
  )}
</div>
```

### To add a new off-market property:
Simply add an entry to the `PROPERTIES` array with `offmarket: true`:

```typescript
{
  id: 12,
  image: anyImage,
  gallery: [anyImage],
  tag: "OFF-MARKET",
  style: "Beachfront Estate",    // ← This becomes the title
  location: "Costa del Sol",     // ← Not displayed (masked)
  title: "",                     // ← Ignored
  excerpt: "",                   // ← Ignored
  beds: 8,
  baths: 7,
  sqm: 900,
  plot: 5000,
  price: "Price on Request",
  features: ["Private Beach", "Helipad", "Wine Cellar"],
  offmarket: true,               // ← Required
}
```

---

## Dependencies

The off-market components use these Lucide icons (already imported):

```typescript
import { Lock, Eye, Phone, User, Mail, X } from "lucide-react";
```

No additional npm packages are required.

---

## CSS Classes Used

| Class | Purpose |
|---|---|
| `filter blur-lg scale-110` | Blurs the property image |
| `bg-luxury-black/40` | Dark overlay on blurred image |
| `bg-amber-50` | Subtle warm background on OFF-MARKET badge |
| `animate-in fade-in zoom-in-95` | Modal entrance animation |
| `backdrop-blur-sm` | Frosted glass effect on modal backdrop |
| `cursor-pointer` | Indicates the card is clickable |

---

## Summary

| What | Where |
|---|---|
| Data flag | `offmarket: true` in PROPERTIES array |
| Card component | `OffMarketPropertyCard` in `LuxuryPropertyListing.tsx` |
| Modal component | `OffMarketModal` in `LuxuryPropertyListing.tsx` |
| Conditional render | `PROPERTIES.map()` inside `<main>` |
| Form action | Currently `preventDefault()` — connect to your backend |
