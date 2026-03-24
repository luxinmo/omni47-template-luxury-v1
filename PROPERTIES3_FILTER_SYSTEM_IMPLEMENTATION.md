# PROPERTIES3 — Filter System Implementation Guide

> **Scope**: Only the filter/search system. No property cards, no page layout, no footer.

---

## 1. ARCHITECTURE OVERVIEW

The filter system has **6 components** across 2 contexts (desktop/mobile):

| Component | Context | Location | Purpose |
|---|---|---|---|
| **Desktop Dropdowns** (Type, Price, Beds, Amenities) | Desktop | Inline in `LuxuryPropertyListingV3.tsx` (lines 127–253) | Quick inline filters on sticky search bar |
| **FilterSidebar** | Desktop + Tablet | Inline in `LuxuryPropertyListingV3.tsx` (lines 305–509) | Full slide-in panel with ALL filters |
| **ListingMobileFilterSheet** | Mobile | `/blocks/listing/ListingMobileFilterSheet.tsx` | Fullscreen overlay with all mobile filters |
| **ListingMobileSortSheet** | Mobile | `/blocks/listing/ListingMobileSortSheet.tsx` | Bottom sheet for sort options |
| **ListingMobileSearchBar** | Mobile | `/blocks/listing/ListingMobileSearchBar.tsx` | Sticky bar with location/sort/filter buttons |
| **Active Chips Strip** | Both | Inline in V3 (lines 266–302) | Visual pills showing active filters with X remove |

---

## 2. DATA MODEL — FilterState

```typescript
interface FilterState {
  locations: { id: string; name: string; path: string; type: string }[];
  listingMode: "sale" | "rent" | "holiday";
  types: string[];            // e.g. ["Villa", "Penthouse"]
  priceMin: string;           // Raw numeric string: "500000"
  priceMax: string;           // Raw numeric string: "2000000"
  hidePriceOnRequest: boolean;
  areaMin: string;            // m² as string
  areaMax: string;
  beds: string;               // "Any" | "1+" | "2+" | "3+" | "4+" | "5+"
  baths: string;              // "Any" | "1+" | "2+" | "3+" | "4+"
  amenities: string[];        // e.g. ["Sea Views", "Pool"]
  newBuilds: boolean;
  quickTags: string[];        // e.g. ["Luxury", "Modern"]
}
```

### Default state (empty):
```typescript
const defaultFilters: FilterState = {
  locations: [], listingMode: "sale", types: [],
  priceMin: "", priceMax: "", hidePriceOnRequest: false,
  areaMin: "", areaMax: "", beds: "Any", baths: "Any",
  amenities: [], newBuilds: false, quickTags: [],
};
```

---

## 3. CONSTANTS — Filter Options

### Property Types (with subtypes for sidebar/mobile):
```typescript
const MOBILE_TYPE_CATEGORIES = [
  { label: "Houses", subtypes: ["Villa", "Modern Villa", "Traditional Villa", "Luxury Villa", "Finca", "Townhouse", "Bungalow"] },
  { label: "Flats", subtypes: ["Apartment", "Penthouse", "Duplex Penthouse", "Sky Penthouse", "Ground Floor", "Duplex", "Studio", "Loft"] },
  { label: "Lands", subtypes: ["Urban Land", "Rustic Land", "Building Plot"] },
];
```

### Property Types (flat, for desktop dropdowns):
```typescript
const TYPE_OPTIONS = ["Villa", "Penthouse", "Apartment", "Finca", "New Build", "Land"];
```

### Beds / Baths:
```typescript
const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const BATH_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];
```

### Price presets (desktop):
```typescript
const PRICE_PRESETS = [
  { label: "€500K", value: "500000" },
  { label: "€1M", value: "1000000" },
  { label: "€2M", value: "2000000" },
  { label: "€5M", value: "5000000" },
  { label: "€10M", value: "10000000" },
];
```

### Amenities (sidebar simple list):
```typescript
const AMENITY_SIDEBAR = ["Sea Views", "Pool", "Garden", "Garage", "Terrace", "Smart Home", "Gym", "Wine Cellar"];
```

### Amenities (dropdown grouped):
```typescript
const AMENITY_GROUPS = [
  { title: "View", items: ["Panoramic View", "Sea Views", "Mountain View", "Golf View"] },
  { title: "Outdoor", items: ["Garden", "Pool", "Terrace", "Garage", "Balcony", "Private Beach"] },
  { title: "Indoor", items: ["Air Conditioning", "Fireplace", "Gym", "Wine Cellar", "Cinema", "Elevator", "Jacuzzi", "Sauna", "Smart Home"] },
];
```

### Quick Tags:
```typescript
const QUICK_TAGS = ["New Build", "Luxury", "Modern", "Sea Views", "1ª Línea Mar"];
```

### Sort Options:
```typescript
const SORT_OPTIONS = [
  { value: "premium", label: "Premium" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "beds-desc", label: "Most Bedrooms" },
  { value: "area-desc", label: "Largest Area" },
];
```

---

## 4. DESKTOP DROPDOWNS (Inline on Search Bar)

### 4.1 useDropdown Hook

**Purpose**: Manage open/close state + click-outside-to-close for each dropdown.

```typescript
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return { open, setOpen, ref };
}
```

### 4.2 TypeDropdown

**Trigger button HTML**:
```html
<div class="relative shrink-0"> <!-- ref={ref} -->
  <button class="flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 shrink-0
    /* INACTIVE: */ border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30
    /* ACTIVE: */  border-luxury-black bg-luxury-black text-white">
    Type
    <!-- Badge (only when selected.length > 0): -->
    <span class="bg-white text-luxury-black text-[12px] w-4 h-4 rounded-full flex items-center justify-center font-medium">2</span>
    <ChevronDown class="w-3.5 h-3.5" />
  </button>
</div>
```

**Dropdown panel HTML** (appears when open):
```html
<div class="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[300px] py-2 z-[60]">
  <!-- Repeat for each TYPE_OPTIONS -->
  <label class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors">
    <input type="checkbox" class="w-4 h-4 border-neutral-300 rounded-sm accent-luxury-black" />
    <span class="text-[14px] text-luxury-black/80">Villa</span>
  </label>
</div>
```

**CSS key rules**:
- Trigger: `rounded-full`, `px-4 py-2`, `text-[14px]`
- Active state: bg fills to `luxury-black`, text becomes `white`, badge becomes `bg-white text-luxury-black`
- Panel: `w-[300px]`, `rounded-sm`, `shadow-lg`, `z-[60]`
- Checkbox accent: `accent-luxury-black`

**Logic**: Multi-select toggle. Each click adds/removes from `filters.types[]`.

---

### 4.3 PriceDropdown — ⭐ SMART PRICE LOGIC

**This is the most complex dropdown.** It has 3 states:

#### State A: No min selected → Show min presets
```
┌─────────────────────────────────────┐
│ [For Sale] [For Rent] [Holiday]     │  ← Listing mode toggle
│                                     │
│ Min price          Max price        │
│ ┌──────────┐     ┌──────────┐      │
│ │ € No Min │     │ € No Max │      │
│ └──────────┘     └──────────┘      │
│                                     │
│ Select minimum                      │
│ [€500K] [€1M] [€2M] [€5M] [€10M]  │  ← All presets shown
│                                     │
│ ☐ Hide "Price on Request" listings  │
└─────────────────────────────────────┘
```

#### State B: Min selected → Show FILTERED max presets (only values > min)
```
┌─────────────────────────────────────┐
│ [For Sale] [For Rent] [Holiday]     │
│                                     │
│ Min price          Max price        │
│ ┌──────────┐     ┌──────────┐      │
│ │ 1000000  │     │ € No Max │      │
│ └──────────┘     └──────────┘      │
│                                     │
│ Select maximum                      │
│ [€2M] [€5M] [€10M]                 │  ← Only presets > €1M
│                                     │
│ ☐ Hide "Price on Request" listings  │
└─────────────────────────────────────┘
```

**Smart filtering logic** (key code):
```typescript
// When min is empty → show all presets for min selection
{!priceMin ? (
  <div>
    <p>Select minimum</p>
    {PRICE_PRESETS.map(p => <button onClick={() => onMinChange(p.value)}>{p.label}</button>)}
  </div>
) : (
  // When min is set → show only presets GREATER than min for max selection
  <div>
    <p>Select maximum</p>
    {PRICE_PRESETS.filter(p => parseInt(p.value) > parseInt(priceMin)).map(p =>
      <button onClick={() => onMaxChange(p.value)}>{p.label}</button>
    )}
  </div>
)}
```

**Panel HTML**:
```html
<div class="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl w-[420px] p-6 z-[60]">
  <!-- Listing mode toggle -->
  <div class="flex rounded-lg border border-neutral-200 overflow-hidden mb-5">
    <button class="flex-1 py-2 text-[13px] font-medium transition-all
      /* ACTIVE: */ bg-luxury-black text-white
      /* INACTIVE: */ bg-white text-luxury-black/60 hover:bg-neutral-50">For Sale</button>
    <button>For Rent</button>
    <button>Holiday</button>
  </div>

  <!-- Price inputs -->
  <div class="flex gap-4 mb-4">
    <div class="flex-1">
      <label class="text-[12px] uppercase tracking-wider text-luxury-black/65 font-medium mb-2 block">Min price</label>
      <input type="text" inputMode="numeric"
        class="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black
               placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40
               focus:ring-1 focus:ring-luxury-black/10"
        placeholder="€ No Min" />
    </div>
    <div class="flex-1"><!-- Same for max --></div>
  </div>

  <!-- Price presets (dynamic) -->
  <div>
    <p class="text-[11px] text-luxury-black/40 uppercase tracking-wider mb-2">Select minimum</p>
    <div class="flex flex-wrap gap-2">
      <button class="text-[12px] px-3 py-1 rounded-full border transition-colors font-light
        /* UNSELECTED: */ border-neutral-300 text-luxury-black/65 hover:border-luxury-black/40
        /* SELECTED: */ border-luxury-black bg-luxury-black text-white">€500K</button>
    </div>
  </div>

  <!-- Hide Price on Request -->
  <label class="flex items-center gap-2.5 cursor-pointer mt-1 pt-3 border-t border-neutral-100">
    <input type="checkbox" class="w-4 h-4 border-neutral-300 rounded-sm accent-luxury-black" />
    <span class="text-[14px] text-luxury-black/75">Hide "Price on Request" listings</span>
  </label>
</div>
```

**Input sanitization**: Only numbers allowed via `.replace(/[^0-9]/g, "")`.

---

### 4.4 BedsDropdown

**Panel HTML**:
```html
<div class="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[320px] p-5 z-[60]">
  <div class="flex gap-1">
    <!-- Repeat for each BED_OPTIONS -->
    <button class="flex-1 py-2 text-[13px] border transition-all duration-200
      /* ACTIVE: */ bg-luxury-black text-white border-luxury-black
      /* INACTIVE: */ border-neutral-200 text-luxury-black/60 hover:border-luxury-black/30">Any</button>
  </div>
</div>
```

**Logic**: Single-select. Click sets `filters.beds = value`.

---

### 4.5 AmenitiesDropdown

**Panel HTML**:
```html
<div class="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[480px] max-h-[420px] overflow-y-auto p-5 z-[60]">
  <!-- Header with clear -->
  <div class="flex items-center justify-between mb-4">
    <span class="text-[12px] text-luxury-black/40 uppercase tracking-wide">Select amenities</span>
    <button class="text-[12px] text-luxury-black/50 hover:text-luxury-black">Clear</button>
  </div>

  <!-- Grouped amenities -->
  <div class="mb-5 last:mb-0">
    <h4 class="text-[14px] font-medium text-luxury-black mb-3">View</h4>
    <div class="flex flex-wrap gap-2">
      <button class="flex items-center gap-1.5 border rounded-full px-3.5 py-1.5 text-[12px] transition-all duration-200
        /* ACTIVE: */ border-luxury-black bg-luxury-black text-white
        /* INACTIVE: */ border-neutral-200 text-luxury-black/60 hover:border-luxury-black/40">Panoramic View</button>
    </div>
  </div>
  <!-- Repeat for "Outdoor", "Indoor" groups -->
</div>
```

**Key differences from other dropdowns**:
- Opens to the `right-0` instead of `left-0` (avoids overflow)
- Has `max-h-[420px] overflow-y-auto` for scrollable content
- Items are grouped by category with `h4` headers
- Has a "Clear" button in header that calls `onToggle` on each selected item
- Wider panel: `w-[480px]`

---

## 5. FILTER SIDEBAR (Desktop Slide-in Panel)

**File**: Inline in `LuxuryPropertyListingV3.tsx` (lines 305–509)

### 5.1 Layout Structure

```
┌──────────────────────────────────┐
│ [BACKDROP: fixed inset-0]        │
│ bg-luxury-black/40 backdrop-blur │
│ z-50, click → onClose            │
│                                  │
│ ┌─── SIDEBAR ──────────────┐    │
│ │ fixed top-0 left-0       │    │
│ │ h-full w-[420px]         │    │
│ │ bg-white z-50            │    │
│ │ shadow-2xl               │    │
│ │ flex flex-col             │    │
│ │                           │    │
│ │ ┌── HEADER ─────────────┐│    │
│ │ │ "Filters"  [Clear] [X]││    │
│ │ └───────────────────────┘│    │
│ │                           │    │
│ │ ┌── ACTIVE CHIPS ───────┐│    │
│ │ │ [Villa ×] [€1M+ ×]   ││    │
│ │ └───────────────────────┘│    │
│ │                           │    │
│ │ ┌── SCROLLABLE BODY ────┐│    │
│ │ │ overflow-y-auto        ││    │
│ │ │ px-6 py-6 space-y-7   ││    │
│ │ │                        ││    │
│ │ │ • Property Type        ││    │
│ │ │ • Quick Tags           ││    │
│ │ │ • Price                ││    │
│ │ │ • Bedrooms             ││    │
│ │ │ • Bathrooms            ││    │
│ │ │ • Living Area          ││    │
│ │ │ • Amenities            ││    │
│ │ │ • Listing Mode         ││    │
│ │ └────────────────────────┘│    │
│ │                           │    │
│ │ ┌── STICKY FOOTER ──────┐│    │
│ │ │ [Clear all] [Show N]  ││    │
│ │ └───────────────────────┘│    │
│ └───────────────────────────┘    │
└──────────────────────────────────┘
```

### 5.2 Animation

```css
/* Backdrop */
.backdrop {
  animation: fade-in 200ms ease-out;   /* animate-in fade-in duration-200 */
}

/* Sidebar panel */
.sidebar {
  animation: slide-in-from-left 300ms ease-out;  /* animate-in slide-in-from-left duration-300 */
}
```

### 5.3 Header HTML

```html
<div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
  <h2 class="text-[17px] font-medium text-luxury-black">Filters</h2>
  <div class="flex items-center gap-4">
    <button class="text-[14px] font-medium text-luxury-black/60 hover:text-luxury-black transition-colors">Clear filters</button>
    <button class="text-luxury-black/50 hover:text-luxury-black transition-colors">
      <X class="w-5 h-5" />
    </button>
  </div>
</div>
```

### 5.4 Active Chips Strip

**Appears only when filters are active** (`activeCount > 0`):

```html
<div class="px-6 py-3 flex flex-wrap gap-2 border-b border-neutral-100">
  <span class="inline-flex items-center gap-1.5 bg-neutral-100 text-luxury-black text-[12px] font-medium rounded-full pl-3 pr-2 py-1.5">
    Villa
    <button class="text-luxury-black/40 hover:text-luxury-black/70">
      <X class="w-3 h-3" />
    </button>
  </span>
</div>
```

### 5.5 Property Type Section (Expandable Categories)

**This is the most complex filter section.** Uses 3 categories (Houses, Flats, Lands) each expandable to show subtypes.

```html
<div>
  <div class="flex items-center gap-2.5 mb-4">
    <Building2 class="w-5 h-5 text-luxury-black/50" />
    <h3 class="text-[15px] font-medium text-luxury-black">Property Type</h3>
    <!-- Badge: shows count of selected types -->
    <span class="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
  </div>

  <div class="space-y-1.5">
    <!-- Category row (e.g. "Houses") -->
    <div class="flex items-center gap-0 rounded-lg border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-colors">
      <!-- Left: checkbox + label -->
      <label class="flex items-center gap-3 px-4 py-3 cursor-pointer flex-1">
        <input type="checkbox" class="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black" />
        <span class="text-[14px] text-luxury-black/80 font-medium">Houses</span>
        <!-- Partial selection badge (shows when some but not all selected): -->
        <span class="bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
      </label>
      <!-- Right: expand/collapse chevron -->
      <button class="px-4 py-3 text-luxury-black/30 hover:text-luxury-black/60 transition-colors">
        <ChevronDown class="w-4 h-4 transition-transform duration-200
          /* EXPANDED: */ rotate-180" />
      </button>
    </div>

    <!-- Expanded subtypes (animated) -->
    <div class="ml-6 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
      <label class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 rounded-lg transition-colors">
        <input type="checkbox" class="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black" />
        <span class="text-[14px] text-luxury-black/75">Modern Villa</span>
      </label>
    </div>
  </div>
</div>
```

**Logic**:
- **toggleAll**: If all subtypes selected → deselect all in category. Otherwise → select all in category.
- **Partial badge**: Red badge with count appears when `selectedInCat > 0 && !allSelected`.
- **Expand state**: Only ONE category can be expanded at a time (accordion-style via `expandedCat` state).
- **Animation**: `animate-in slide-in-from-top-1 duration-200` on subtypes container.

### 5.6 Quick Tags

```html
<div>
  <p class="text-[12px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-3">Quick filters</p>
  <div class="flex flex-wrap gap-2">
    <button class="px-4 py-2 text-[13px] rounded-full border transition-all
      /* ACTIVE: */ border-luxury-black bg-luxury-black text-white
      /* INACTIVE: */ border-neutral-200 text-luxury-black/60 hover:border-neutral-300">New Build</button>
  </div>
</div>
```

**Logic**: Multi-select toggle chips.

### 5.7 Price Section (Sidebar version)

Same smart logic as PriceDropdown but simpler layout (no listing mode toggle here):

```html
<div>
  <div class="flex items-center gap-2.5 mb-4">
    <span class="text-luxury-black/50 text-lg">€</span>
    <h3 class="text-[15px] font-medium text-luxury-black">Price</h3>
  </div>
  <div class="flex gap-3 mb-3">
    <input type="text" placeholder="€ No Min"
      class="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[14px] text-luxury-black
             placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40 transition-colors" />
    <input type="text" placeholder="€ No Max" class="/* same */" />
  </div>
  <!-- Smart presets: same conditional logic as PriceDropdown -->
</div>
```

### 5.8 Bedrooms / Bathrooms

Identical pattern — single-select button row:

```html
<div class="flex gap-2">
  <button class="flex-1 py-2.5 text-[14px] rounded-lg border transition-all
    /* ACTIVE: */ bg-luxury-black text-white border-luxury-black
    /* INACTIVE: */ border-neutral-200 text-luxury-black/60 hover:border-neutral-300">Any</button>
</div>
```

### 5.9 Living Area

```html
<div class="flex gap-3">
  <input type="text" placeholder="Min"
    class="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[14px] text-luxury-black
           placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40 transition-colors" />
  <input type="text" placeholder="Max" class="/* same */" />
</div>
```

### 5.10 Amenities (Sidebar)

Flat chip list (not grouped like the dropdown):

```html
<div class="flex flex-wrap gap-2">
  <button class="px-4 py-2 text-[13px] rounded-full border transition-all
    /* ACTIVE: */ border-luxury-black bg-luxury-black text-white
    /* INACTIVE: */ border-neutral-200 text-luxury-black/60 hover:border-neutral-300">Sea Views</button>
</div>
```

### 5.11 Listing Mode (bottom card)

```html
<div class="bg-neutral-50 rounded-xl p-5">
  <p class="text-[14px] font-medium text-luxury-black mb-1">What type of listing are you looking for?</p>
  <p class="text-[12px] text-luxury-black/45 mb-4">Select the operation type</p>
  <div class="flex rounded-lg border border-neutral-200 overflow-hidden">
    <button class="flex-1 py-3 text-[14px] font-medium transition-all
      /* ACTIVE: */ bg-luxury-black text-white
      /* INACTIVE: */ bg-white text-luxury-black/60 hover:bg-neutral-100">For Sale</button>
    <button>For Rent</button>
    <button>Holiday</button>
  </div>
</div>
```

### 5.12 Sticky Footer

```html
<div class="border-t border-neutral-200 px-6 py-4 flex items-center gap-4 bg-white">
  <button class="px-4 py-3 text-[13px] text-luxury-black/50 hover:text-luxury-black font-medium transition-colors">Clear all</button>
  <button class="flex-1 bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3.5 rounded-lg hover:bg-luxury-black/85 transition-all duration-300 font-medium">
    Show 8 properties
  </button>
</div>
```

---

## 6. MOBILE FILTER SHEET (Fullscreen)

**File**: `src/components/blocks/listing/ListingMobileFilterSheet.tsx`

### 6.1 Container

```html
<div class="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
```

**No backdrop overlay** — the sheet IS fullscreen white.

### 6.2 Header

```html
<div class="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200">
  <button class="text-neutral-900/70"><X class="w-5 h-5" /></button>
  <button class="text-[14px] font-medium text-neutral-900">Clear filters</button>
</div>
```

**Difference vs sidebar**: X is on the LEFT, "Clear filters" on the RIGHT.

### 6.3 Scrollable Body

```html
<div class="flex-1 overflow-y-auto px-4 py-5 space-y-6">
```

Contains same sections as sidebar but with mobile-specific styling:

| Section | Mobile differences |
|---|---|
| Property Type | Categories with `border rounded-lg`, expand/collapse with chevron rotation |
| Quick Tags | Same chip pattern |
| Price | Simple `flex gap-3` inputs, NO smart presets (just min/max text) |
| Bedrooms | `flex-1` buttons fill width equally |
| Bathrooms | Same as beds |
| Area | Simple min/max inputs |
| Amenities | Flat chips (not grouped) |
| Buy/Rent | `bg-neutral-50 rounded-xl p-5` card, 2-option toggle (no "Holiday") |

### 6.4 Sticky Footer

```html
<div class="border-t border-neutral-200 px-4 py-3 flex items-center gap-3 bg-white">
  <button class="px-4 py-3.5 text-[13px] text-neutral-900/50 font-medium">Clear all</button>
  <button class="flex-1 bg-neutral-900 text-white text-[14px] tracking-[0.08em] uppercase py-3.5 rounded-lg font-medium">
    Show 48 properties
  </button>
</div>
```

---

## 7. MOBILE SORT SHEET (Bottom)

**File**: `src/components/blocks/listing/ListingMobileSortSheet.tsx`

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50" />

<!-- Sheet -->
<div class="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
  <div class="bg-white rounded-t-2xl shadow-2xl max-h-[70vh] flex flex-col">
    <!-- Handle + title -->
    <div class="text-center py-4 border-b border-neutral-100">
      <div class="w-10 h-1 rounded-full bg-neutral-300 mx-auto mb-3" />
      <p class="text-[14px] text-neutral-900/50 font-light">Sort by</p>
    </div>

    <!-- Options -->
    <div class="flex-1 overflow-y-auto py-2">
      <button class="w-full text-left px-6 py-4 text-[16px] transition-colors
        /* SELECTED: */ text-neutral-900 font-medium bg-neutral-50
        /* UNSELECTED: */ text-neutral-900/70 font-light">Premium</button>
    </div>

    <!-- Cancel -->
    <div class="border-t border-neutral-100 p-4">
      <button class="w-full py-3.5 text-[15px] font-medium text-neutral-900 border border-neutral-200 rounded-xl">Cancel</button>
    </div>
  </div>
</div>
```

---

## 8. MOBILE SEARCH BAR (Sticky)

**File**: `src/components/blocks/listing/ListingMobileSearchBar.tsx`

```html
<div class="sticky top-[64px] z-40 bg-white border-b border-neutral-200 px-3 py-2.5">
  <div class="flex items-center gap-2">
    <!-- Location button -->
    <button class="flex-1 flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2.5 text-left">
      <MapPin class="w-4 h-4 text-neutral-900/40 shrink-0" />
      <span class="text-[14px] text-neutral-900 truncate">Ibiza, Marbella</span>
      <!-- Location count badge -->
      <span class="ml-auto bg-neutral-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
    </button>

    <!-- Sort button -->
    <button class="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-900/60 hover:bg-neutral-50 transition-colors shrink-0">
      <ArrowUpDown class="w-4 h-4" />
    </button>

    <!-- Filter button with badge -->
    <button class="relative w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-900/60 hover:bg-neutral-50 transition-colors shrink-0">
      <SlidersHorizontal class="w-4 h-4" />
      <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
    </button>
  </div>

  <!-- Results count -->
  <p class="text-[13px] text-neutral-900/50 font-light text-center mt-2">48 properties</p>
</div>
```

---

## 9. HELPER FUNCTIONS

### 9.1 formatPrice

```typescript
const formatPrice = (val: string) => {
  const n = parseInt(val);
  if (isNaN(n)) return val;
  if (n >= 1000000) return `€${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `€${(n / 1000).toFixed(0)}K`;
  return `€${n}`;
};
// Examples: "500000" → "€500K", "1000000" → "€1M", "1500000" → "€1.5M"
```

### 9.2 buildActiveChips

Converts full `FilterState` into array of `{ key, label, group }` for rendering chip strip.

**Groups**: `location`, `type`, `price`, `area`, `beds`, `baths`, `amenity`, `quickTag`, `newBuilds`, `hidePOR`.

### 9.3 removeChip

Takes a chip and returns new `FilterState` with that filter removed. Uses `switch(chip.group)` to know which field to clear.

---

## 10. Z-INDEX STACK

| Layer | z-index | Element |
|---|---|---|
| Mobile Search Bar | `z-40` | Sticky below navbar |
| Filter Sidebar backdrop | `z-50` | Dark overlay |
| Filter Sidebar panel | `z-50` | Slide-in panel |
| Mobile Filter Sheet | `z-50` | Fullscreen white |
| Mobile Sort Sheet backdrop | `z-50` | Blur overlay |
| Mobile Sort Sheet panel | `z-50` | Bottom sheet |
| Desktop dropdown panels | `z-[60]` | Float above search bar |

---

## 11. ANIMATION SUMMARY

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Sidebar backdrop | `fade-in` | 200ms | ease-out |
| Sidebar panel | `slide-in-from-left` | 300ms | ease-out |
| Mobile filter sheet | `slide-in-from-bottom` | 300ms | ease-out |
| Mobile sort sheet | `slide-in-from-bottom` | 300ms | ease-out |
| Category subtypes expand | `slide-in-from-top-1` | 200ms | ease-out |
| Chevron rotation | `transform rotate-180` | 200ms | ease (via `transition-transform`) |
| All buttons/inputs | `transition-all` or `transition-colors` | default | default |

---

## 12. BLOCKS CATALOG REFERENCE

All filter components are visible at `/blocks` under the **Listing** category:

| Block ID | Name | Props for preview |
|---|---|---|
| `listing-search-bar` | Desktop Search Bar + Filter Chips | `filters`, `onChange` |
| `listing-filter-sidebar` | Desktop Filter Sidebar | `open=true`, `filters`, `onChange` |
| `listing-mobile-search-bar` | Mobile Sticky Search Bar | `resultsCount`, `activeFilterCount`, `locationNames` |
| `listing-mobile-filter-sheet` | Mobile Filter Sheet (Fullscreen) | `open=true`, `filters`, `onChange`, `resultsCount` |
| `listing-mobile-sort-sheet` | Mobile Sort Bottom Sheet | `open=true`, `selected`, `onSelect` |

> **Note**: The desktop inline dropdowns (Type, Price, Beds, Amenities) are NOT separate blocks.
> They live inside the search bar or can be found in `LuxuryPropertyListingV3.tsx` lines 127–253.
> The FilterSidebar in /blocks (`ListingFilterSidebar.tsx`) is a SIMPLIFIED version.
> The FULL version with expandable categories and smart price logic is inline in V3 (lines 305–509).
