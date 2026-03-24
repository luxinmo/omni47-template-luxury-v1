# MOBILE FILTER SHEET — Implementación Pixel-Perfect

> **Archivo fuente**: `src/components/luxury/LuxuryPropertyListingV3.tsx` líneas 973–1258
> **Componentes internos**: `MobilePriceSelect` + `MobileFilterSheet`
> **Ruta**: `/properties3` (solo visible en móvil/tablet)

---

## 1. DATOS Y CONSTANTES NECESARIAS

### 1.1 FilterState (interfaz completa)

```typescript
interface FilterState {
  locations: { id: string; name: string; path: string; type: string }[];
  listingMode: "sale" | "rent" | "holiday";
  types: string[];
  priceMin: string;
  priceMax: string;
  hidePriceOnRequest: boolean;
  areaMin: string;
  areaMax: string;
  beds: string;
  baths: string;
  amenities: string[];
  newBuilds: boolean;
  quickTags: string[];
}

const defaultFilters: FilterState = {
  locations: [],
  listingMode: "sale",
  types: [],
  priceMin: "",
  priceMax: "",
  hidePriceOnRequest: false,
  areaMin: "",
  areaMax: "",
  beds: "Any",
  baths: "Any",
  amenities: [],
  newBuilds: false,
  quickTags: [],
};
```

### 1.2 Categorías de tipo para móvil

```typescript
const MOBILE_TYPE_CATEGORIES = [
  { label: "Houses", subtypes: ["Villa", "Modern Villa", "Traditional Villa", "Luxury Villa", "Finca", "Townhouse", "Bungalow"] },
  { label: "Flats", subtypes: ["Apartment", "Penthouse", "Duplex Penthouse", "Sky Penthouse", "Ground Floor", "Duplex", "Studio", "Loft"] },
  { label: "Lands", subtypes: ["Urban Land", "Rustic Land", "Building Plot"] },
];
```

### 1.3 Presets de precio móvil

```typescript
const MOBILE_PRICE_OPTIONS = [
  { label: "Min", value: "" },
  { label: "200.000€", value: "200000" },
  { label: "400.000€", value: "400000" },
  { label: "600.000€", value: "600000" },
  { label: "800.000€", value: "800000" },
  { label: "1M", value: "1000000" },
  { label: "2M", value: "2000000" },
  { label: "4M", value: "4000000" },
  { label: "6M", value: "6000000" },
  { label: "Max", value: "" },
];
```

### 1.4 Opciones de dormitorios, baños, amenities y quick tags

```typescript
const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const BATH_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];
const AMENITY_SIDEBAR = ["Sea Views", "Pool", "Garden", "Garage", "Terrace", "Smart Home", "Gym", "Wine Cellar"];
const QUICK_TAGS = ["New Build", "Luxury", "Modern", "Sea Views", "1ª Línea Mar"];
```

### 1.5 Helpers requeridos

```typescript
const formatPrice = (val: string) => {
  const n = parseInt(val);
  if (isNaN(n)) return val;
  if (n >= 1000000) return `€${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `€${(n / 1000).toFixed(0)}K`;
  return `€${n}`;
};

interface ActiveChip { key: string; label: string; group: string; }

function buildActiveChips(f: FilterState): ActiveChip[] {
  const chips: ActiveChip[] = [];
  f.locations.forEach(l => chips.push({ key: `loc-${l.id}`, label: l.name, group: "location" }));
  f.types.forEach(t => chips.push({ key: `type-${t}`, label: t, group: "type" }));
  if (f.priceMin && f.priceMax) chips.push({ key: "price-range", label: `${formatPrice(f.priceMin)} – ${formatPrice(f.priceMax)}`, group: "price" });
  else if (f.priceMin) chips.push({ key: "price-min", label: `From ${formatPrice(f.priceMin)}`, group: "price" });
  else if (f.priceMax) chips.push({ key: "price-max", label: `Up to ${formatPrice(f.priceMax)}`, group: "price" });
  if (f.areaMin || f.areaMax) {
    const minL = f.areaMin ? `${f.areaMin} m²` : "";
    const maxL = f.areaMax ? `${f.areaMax} m²` : "";
    chips.push({ key: "area", label: minL && maxL ? `${minL} – ${maxL}` : minL ? `From ${minL}` : `Up to ${maxL}`, group: "area" });
  }
  if (f.beds !== "Any") chips.push({ key: "beds", label: `${f.beds} Beds`, group: "beds" });
  if (f.baths !== "Any") chips.push({ key: "baths", label: `${f.baths} Baths`, group: "baths" });
  f.amenities.forEach(a => chips.push({ key: `amenity-${a}`, label: a, group: "amenity" }));
  f.quickTags.forEach(t => chips.push({ key: `quick-${t}`, label: t, group: "quickTag" }));
  if (f.newBuilds) chips.push({ key: "newbuilds", label: "New Builds", group: "newBuilds" });
  if (f.hidePriceOnRequest) chips.push({ key: "hide-por", label: "Hide Price on Request", group: "hidePOR" });
  return chips;
}

function removeChip(f: FilterState, chip: ActiveChip): FilterState {
  const next = { ...f };
  switch (chip.group) {
    case "location": next.locations = f.locations.filter(l => `loc-${l.id}` !== chip.key); break;
    case "type": next.types = f.types.filter(t => t !== chip.label); break;
    case "price": next.priceMin = ""; next.priceMax = ""; break;
    case "area": next.areaMin = ""; next.areaMax = ""; break;
    case "beds": next.beds = "Any"; break;
    case "baths": next.baths = "Any"; break;
    case "amenity": next.amenities = f.amenities.filter(a => a !== chip.label); break;
    case "quickTag": next.quickTags = f.quickTags.filter(t => t !== chip.label); break;
    case "newBuilds": next.newBuilds = false; break;
    case "hidePOR": next.hidePriceOnRequest = false; break;
  }
  return next;
}
```

---

## 2. COMPONENTE: MobilePriceSelect

> Selector de precio con botón trigger + popup bottom-sheet con input editable y presets.

### 2.1 Props

```typescript
interface MobilePriceSelectProps {
  value: string;                          // valor actual ("1000000", "" etc)
  onChange: (v: string) => void;          // callback al confirmar
  options: typeof MOBILE_PRICE_OPTIONS;   // lista de presets
  placeholder: string;                    // "Min" | "Max"
}
```

### 2.2 Estado interno

```typescript
const [popupOpen, setPopupOpen] = useState(false);
const [tempValue, setTempValue] = useState("");
const inputRef = useRef<HTMLInputElement>(null);
```

### 2.3 Lógica de formato de display

```typescript
// Para el botón trigger y el input:
const displayValue = value
  ? (parseInt(value) >= 1000000
    ? `${(parseInt(value) / 1000000)}M€`
    : `${parseInt(value).toLocaleString("es-ES")}€`)
  : "";

// Para el input temporal dentro del popup:
const tempDisplay = tempValue
  ? (parseInt(tempValue) >= 1000000
    ? `${(parseInt(tempValue) / 1000000)}M€`
    : `${parseInt(tempValue).toLocaleString("es-ES")}€`)
  : "";
```

### 2.4 Funciones

```typescript
const openPopup = () => {
  setTempValue(value);      // pre-cargar valor actual
  setPopupOpen(true);
  setTimeout(() => inputRef.current?.focus(), 100);  // autofocus con delay
};

const confirm = (v: string) => {
  onChange(v);
  setPopupOpen(false);
};
```

### 2.5 Código JSX completo — Botón trigger

```jsx
<button
  onClick={openPopup}
  className="flex-1 flex items-center justify-between border border-neutral-200 rounded-lg px-4 py-3"
>
  <span className={`text-[16px] ${displayValue ? "text-luxury-black" : "text-luxury-black/35"}`}>
    {displayValue || placeholder}
  </span>
  <ChevronDown className="w-4 h-4 text-luxury-black/40" />
</button>
```

**CSS del botón trigger:**
| Propiedad | Valor |
|-----------|-------|
| display | `flex` (flex-1 para ocupar 50%) |
| justify | `space-between` |
| border | `1px solid neutral-200` |
| border-radius | `0.5rem` (rounded-lg) |
| padding | `1rem 1rem` (px-4 py-3) |
| font-size texto | `16px` (CRÍTICO: evita zoom en iOS) |
| color con valor | `text-luxury-black` |
| color placeholder | `text-luxury-black/35` |
| icono ChevronDown | `w-4 h-4`, color `text-luxury-black/40` |

### 2.6 Código JSX completo — Popup bottom-sheet

```jsx
{popupOpen && (
  <div
    className="fixed inset-0 z-[200] flex items-end justify-center"
    onClick={() => setPopupOpen(false)}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/40 animate-in fade-in duration-200" />

    {/* Sheet */}
    <div
      className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <h4 className="text-[16px] font-medium text-luxury-black">
          {placeholder} price
        </h4>
        <button onClick={() => setPopupOpen(false)} className="text-luxury-black/40">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Custom input */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
          <span className="pl-4 text-luxury-black/40 text-[16px]">€</span>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={tempDisplay}
            onChange={(e) => setTempValue(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => { if (e.key === "Enter") confirm(tempValue); }}
            placeholder="Type amount"
            className="w-full px-3 py-3.5 text-[16px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none"
          />
          {tempValue && (
            <button
              onClick={() => confirm(tempValue)}
              className="pr-4 text-luxury-black font-medium text-[14px] whitespace-nowrap"
            >
              OK
            </button>
          )}
        </div>
      </div>

      {/* Preset options */}
      <div className="px-2 pb-6 max-h-[45vh] overflow-y-auto">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => confirm(opt.value)}
            className={`w-full text-left px-5 py-3 text-[15px] rounded-lg transition-colors ${
              value === opt.value && opt.value
                ? "text-luxury-black font-medium bg-neutral-100"
                : "text-luxury-black/70 active:bg-neutral-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)}
```

**CSS del popup:**
| Elemento | Clases clave |
|----------|-------------|
| Contenedor fijo | `fixed inset-0 z-[200] flex items-end justify-center` |
| Backdrop | `absolute inset-0 bg-black/40 animate-in fade-in duration-200` |
| Sheet | `relative w-full max-w-lg bg-white rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out` |
| Header | `flex items-center justify-between px-5 py-4 border-b border-neutral-100` |
| Input wrapper | `flex items-center border border-neutral-200 rounded-lg overflow-hidden` |
| Input | `w-full px-3 py-3.5 text-[16px] focus:outline-none` — **16px para evitar zoom iOS** |
| Botón OK | `pr-4 text-luxury-black font-medium text-[14px] whitespace-nowrap` — solo visible si `tempValue` existe |
| Lista presets | `px-2 pb-6 max-h-[45vh] overflow-y-auto` |
| Preset activo | `text-luxury-black font-medium bg-neutral-100` |
| Preset inactivo | `text-luxury-black/70 active:bg-neutral-50` |

**Animaciones:**
- Backdrop: `animate-in fade-in duration-200`
- Sheet: `animate-in slide-in-from-bottom duration-500 ease-out`

**Lógica importante:**
- `inputMode="numeric"` muestra teclado numérico en móvil
- `onChange` filtra solo números: `e.target.value.replace(/[^0-9]/g, "")`
- `Enter` confirma el valor
- El botón "OK" solo aparece si hay valor temporal
- `e.stopPropagation()` en el sheet previene cierre al tocar dentro

---

## 3. COMPONENTE: MobileFilterSheet

> Overlay fullscreen con todos los filtros organizados verticalmente.

### 3.1 Props

```typescript
interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (f: FilterState) => void;
}
```

### 3.2 Estado interno

```typescript
const [expandedCat, setExpandedCat] = useState<string | null>(null);
```

### 3.3 Variables derivadas y funciones toggle

```typescript
if (!open) return null;

const activeCount = buildActiveChips(filters).length;

const toggleType = (t: string) =>
  onChange({
    ...filters,
    types: filters.types.includes(t)
      ? filters.types.filter(x => x !== t)
      : [...filters.types, t]
  });

const toggleQuickTag = (t: string) =>
  onChange({
    ...filters,
    quickTags: filters.quickTags.includes(t)
      ? filters.quickTags.filter(x => x !== t)
      : [...filters.quickTags, t]
  });

const minPriceOptions = MOBILE_PRICE_OPTIONS.filter(o => o.label !== "Max");
const maxPriceOptions = MOBILE_PRICE_OPTIONS.filter(o => o.label !== "Min");
```

### 3.4 ESTRUCTURA COMPLETA JSX

```jsx
<>
  {/* BACKDROP */}
  <div
    className="fixed inset-0 bg-luxury-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200"
    onClick={onClose}
  />

  {/* PANEL PRINCIPAL */}
  <div className="fixed inset-x-0 bottom-0 top-0 md:top-auto md:max-h-[85vh] z-50 bg-white md:rounded-t-2xl md:shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out flex flex-col">
```

**CSS del panel:**
| Propiedad | Móvil | Tablet (md:) |
|-----------|-------|-------------|
| position | `fixed inset-x-0 bottom-0 top-0` (fullscreen) | `md:top-auto md:max-h-[85vh]` (85% alto) |
| z-index | `z-50` | `z-50` |
| background | `bg-white` | `bg-white` |
| border-radius | ninguno | `md:rounded-t-2xl` |
| shadow | ninguna | `md:shadow-2xl` |
| animación | `animate-in slide-in-from-bottom duration-500 ease-out` | igual |
| layout | `flex flex-col` | `flex flex-col` |

---

#### 3.4.1 HEADER

```jsx
<div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200">
  <button onClick={onClose} className="text-luxury-black/70">
    <X className="w-5 h-5" />
  </button>
  <button
    onClick={() => onChange(defaultFilters)}
    className="text-[14px] font-medium text-luxury-black"
  >
    Clear filters
  </button>
</div>
```

**CSS:**
| Propiedad | Valor |
|-----------|-------|
| layout | `flex items-center justify-between` |
| padding | `px-4 py-3.5` |
| borde inferior | `border-b border-neutral-200` |
| botón X | `text-luxury-black/70`, icono `w-5 h-5` |
| botón Clear | `text-[14px] font-medium text-luxury-black` |

---

#### 3.4.2 ACTIVE CHIPS (condicional)

```jsx
{activeCount > 0 && (
  <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-neutral-100">
    {buildActiveChips(filters).map(chip => (
      <span
        key={chip.key}
        className="inline-flex items-center gap-1.5 bg-neutral-100 text-luxury-black text-[12px] font-medium rounded-full pl-3 pr-2 py-1.5"
      >
        {chip.label}
        <button
          onClick={() => onChange(removeChip(filters, chip))}
          className="text-luxury-black/40 hover:text-luxury-black/70"
        >
          <X className="w-3 h-3" />
        </button>
      </span>
    ))}
  </div>
)}
```

**CSS de cada chip:**
| Propiedad | Valor |
|-----------|-------|
| layout | `inline-flex items-center gap-1.5` |
| background | `bg-neutral-100` |
| texto | `text-luxury-black text-[12px] font-medium` |
| border-radius | `rounded-full` |
| padding | `pl-3 pr-2 py-1.5` |
| botón X | `text-luxury-black/40 hover:text-luxury-black/70`, icono `w-3 h-3` |

---

#### 3.4.3 SCROLLABLE CONTENT

```jsx
<div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
```

**CSS:** `flex-1` para ocupar espacio restante, `overflow-y-auto` scroll vertical, `px-4 py-5` padding, `space-y-6` gap 1.5rem entre secciones.

---

#### 3.4.4 SECCIÓN: Property Type

```jsx
<div>
  {/* Título con icono y badge */}
  <div className="flex items-center gap-2.5 mb-4">
    <Building2 className="w-5 h-5 text-luxury-black/50" />
    <h3 className="text-[16px] font-medium text-luxury-black">Property Type</h3>
    {filters.types.length > 0 && (
      <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
        {filters.types.length}
      </span>
    )}
  </div>

  {/* Lista de categorías */}
  <div className="space-y-1">
    {MOBILE_TYPE_CATEGORIES.map((cat) => {
      const isExpanded = expandedCat === cat.label;
      const selectedInCat = cat.subtypes.filter(s => filters.types.includes(s)).length;
      const allSelected = cat.subtypes.every(s => filters.types.includes(s));

      const toggleAll = () => {
        if (allSelected) {
          onChange({ ...filters, types: filters.types.filter(t => !cat.subtypes.includes(t)) });
        } else {
          const newTypes = [...new Set([...filters.types, ...cat.subtypes])];
          onChange({ ...filters, types: newTypes });
        }
      };

      return (
        <div key={cat.label}>
          {/* Fila de categoría: checkbox + label + flecha */}
          <div className="flex items-center gap-0 rounded-lg border border-neutral-200 overflow-hidden">
            {/* Checkbox para seleccionar TODOS los subtipos */}
            <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black"
              />
              <span className="text-[15px] text-luxury-black/80 font-medium">
                {cat.label}
              </span>
              {/* Badge de selección parcial */}
              {selectedInCat > 0 && !allSelected && (
                <span className="bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {selectedInCat}
                </span>
              )}
            </label>

            {/* Botón expandir/colapsar */}
            <button
              onClick={() => setExpandedCat(isExpanded ? null : cat.label)}
              className="px-4 py-3.5 text-luxury-black/30 hover:text-luxury-black/60 transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Subtipos expandidos */}
          {isExpanded && (
            <div className="ml-6 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
              {cat.subtypes.map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.types.includes(sub)}
                    onChange={() => toggleType(sub)}
                    className="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black"
                  />
                  <span className="text-[14px] text-luxury-black/75">{sub}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
```

**Lógica de categorías:**
- Solo UNA categoría expandida a la vez (`expandedCat` es string | null)
- Checkbox de categoría selecciona/deselecciona TODOS sus subtipos
- Badge rojo solo aparece con selección parcial (`selectedInCat > 0 && !allSelected`)
- Badge global en el título muestra total de tipos seleccionados

**CSS de categoría:**
| Elemento | Clases |
|----------|--------|
| Fila categoría | `flex items-center gap-0 rounded-lg border border-neutral-200 overflow-hidden` |
| Label con checkbox | `flex items-center gap-3 px-4 py-3.5 cursor-pointer flex-1` |
| Checkbox | `w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black` |
| Texto categoría | `text-[15px] text-luxury-black/80 font-medium` |
| Badge parcial | `bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold` |
| Botón expand | `px-4 py-3.5 text-luxury-black/30 hover:text-luxury-black/60 transition-colors` |
| ChevronDown | `w-4 h-4 transition-transform duration-200` + `rotate-180` cuando expandido |
| Contenedor subtipos | `ml-6 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200` |
| Label subtipo | `flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 rounded-lg transition-colors` |
| Texto subtipo | `text-[14px] text-luxury-black/75` |

---

#### 3.4.5 SECCIÓN: Quick Filters

```jsx
<div>
  <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-3">
    Quick filters
  </p>
  <div className="flex flex-wrap gap-2">
    {QUICK_TAGS.map((tag) => (
      <button
        key={tag}
        onClick={() => toggleQuickTag(tag)}
        className={`px-4 py-2 text-[13px] rounded-full border transition-all ${
          filters.quickTags.includes(tag)
            ? "border-luxury-black bg-luxury-black text-white"
            : "border-neutral-200 text-luxury-black/60"
        }`}
      >
        {tag}
      </button>
    ))}
  </div>
</div>
```

**CSS:**
| Elemento | Clases |
|----------|--------|
| Label | `text-[12px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-3` |
| Contenedor chips | `flex flex-wrap gap-2` |
| Chip inactivo | `px-4 py-2 text-[13px] rounded-full border border-neutral-200 text-luxury-black/60 transition-all` |
| Chip activo | `px-4 py-2 text-[13px] rounded-full border border-luxury-black bg-luxury-black text-white transition-all` |

---

#### 3.4.6 SECCIÓN: Price

```jsx
<div>
  <div className="flex items-center gap-2.5 mb-4">
    <span className="text-luxury-black/50 text-lg">€</span>
    <h3 className="text-[16px] font-medium text-luxury-black">Price</h3>
  </div>
  <div className="flex gap-3">
    <MobilePriceSelect
      value={filters.priceMin}
      onChange={(v) => onChange({ ...filters, priceMin: v })}
      options={minPriceOptions}
      placeholder="Min"
    />
    <MobilePriceSelect
      value={filters.priceMax}
      onChange={(v) => onChange({ ...filters, priceMax: v })}
      options={maxPriceOptions}
      placeholder="Max"
    />
  </div>
</div>
```

**Lógica de filtrado de opciones:**
- `minPriceOptions` = `MOBILE_PRICE_OPTIONS.filter(o => o.label !== "Max")` — excluye "Max" de la lista de mínimos
- `maxPriceOptions` = `MOBILE_PRICE_OPTIONS.filter(o => o.label !== "Min")` — excluye "Min" de la lista de máximos
- Los dos selectores van en `flex gap-3`, cada uno `flex-1` (50% ancho)

---

#### 3.4.7 SECCIÓN: Bedrooms

```jsx
<div>
  <div className="flex items-center gap-2.5 mb-4">
    <Bed className="w-5 h-5 text-luxury-black/50" />
    <h3 className="text-[16px] font-medium text-luxury-black">Bedrooms</h3>
  </div>
  <div className="flex gap-2">
    {BED_OPTIONS.map((b) => (
      <button
        key={b}
        onClick={() => onChange({ ...filters, beds: b })}
        className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${
          filters.beds === b
            ? "bg-luxury-black text-white border-luxury-black"
            : "border-neutral-200 text-luxury-black/60"
        }`}
      >
        {b}
      </button>
    ))}
  </div>
</div>
```

**CSS pills:**
| Estado | Clases |
|--------|--------|
| Inactivo | `flex-1 py-2.5 text-[14px] rounded-lg border border-neutral-200 text-luxury-black/60 transition-all` |
| Activo | `flex-1 py-2.5 text-[14px] rounded-lg border bg-luxury-black text-white border-luxury-black transition-all` |

**Lógica:** Selección única — al hacer click se reemplaza `filters.beds` con el valor seleccionado.

---

#### 3.4.8 SECCIÓN: Bathrooms

```jsx
<div>
  <div className="flex items-center gap-2.5 mb-4">
    <Bath className="w-5 h-5 text-luxury-black/50" />
    <h3 className="text-[16px] font-medium text-luxury-black">Bathrooms</h3>
  </div>
  <div className="flex gap-2">
    {BATH_OPTIONS.map((b) => (
      <button
        key={b}
        onClick={() => onChange({ ...filters, baths: b })}
        className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${
          filters.baths === b
            ? "bg-luxury-black text-white border-luxury-black"
            : "border-neutral-200 text-luxury-black/60"
        }`}
      >
        {b}
      </button>
    ))}
  </div>
</div>
```

Idéntico a Bedrooms pero con `BATH_OPTIONS` (4 opciones vs 6).

---

#### 3.4.9 SECCIÓN: Living Area

```jsx
<div>
  <div className="flex items-center gap-2.5 mb-4">
    <Maximize className="w-5 h-5 text-luxury-black/50" />
    <h3 className="text-[16px] font-medium text-luxury-black">Living Area (m²)</h3>
  </div>
  <div className="flex gap-3">
    <input
      type="text"
      value={filters.areaMin}
      onChange={(e) => onChange({ ...filters, areaMin: e.target.value })}
      placeholder="Min"
      className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40"
    />
    <input
      type="text"
      value={filters.areaMax}
      onChange={(e) => onChange({ ...filters, areaMax: e.target.value })}
      placeholder="Max"
      className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40"
    />
  </div>
</div>
```

**CSS inputs:**
| Propiedad | Valor |
|-----------|-------|
| width | `w-full` (cada uno 50% en flex gap-3) |
| border | `border border-neutral-200` |
| border-radius | `rounded-lg` |
| padding | `px-4 py-3` |
| font-size | `text-[15px]` |
| color | `text-luxury-black` |
| placeholder | `placeholder:text-luxury-black/35` |
| focus | `focus:outline-none focus:border-luxury-black/40` |

---

#### 3.4.10 SECCIÓN: Amenities

```jsx
<div>
  <div className="flex items-center gap-2.5 mb-4">
    <MapPin className="w-5 h-5 text-luxury-black/50" />
    <h3 className="text-[16px] font-medium text-luxury-black">Amenities</h3>
  </div>
  <div className="flex flex-wrap gap-2">
    {AMENITY_SIDEBAR.map((a) => (
      <button
        key={a}
        onClick={() => onChange({
          ...filters,
          amenities: filters.amenities.includes(a)
            ? filters.amenities.filter(x => x !== a)
            : [...filters.amenities, a]
        })}
        className={`px-4 py-2 text-[13px] rounded-full border transition-all ${
          filters.amenities.includes(a)
            ? "border-luxury-black bg-luxury-black text-white"
            : "border-neutral-200 text-luxury-black/60"
        }`}
      >
        {a}
      </button>
    ))}
  </div>
</div>
```

Misma lógica visual que Quick Tags. Toggle multi-selección.

---

#### 3.4.11 SECCIÓN: Listing Mode (Sale / Rent / Holiday)

```jsx
<div className="bg-neutral-50 rounded-xl p-5">
  <p className="text-[14px] font-medium text-luxury-black mb-1">
    What type of listing are you looking for?
  </p>
  <p className="text-[12px] text-luxury-black/45 mb-4">
    Select the operation type
  </p>
  <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
    <button
      onClick={() => onChange({ ...filters, listingMode: "sale" })}
      className={`flex-1 py-3 text-[14px] font-medium transition-all ${
        filters.listingMode === "sale"
          ? "bg-luxury-black text-white"
          : "bg-white text-luxury-black/60"
      }`}
    >
      For Sale
    </button>
    <button
      onClick={() => onChange({ ...filters, listingMode: "rent" })}
      className={`flex-1 py-3 text-[14px] font-medium transition-all ${
        filters.listingMode === "rent"
          ? "bg-luxury-black text-white"
          : "bg-white text-luxury-black/60"
      }`}
    >
      For Rent
    </button>
    <button
      onClick={() => onChange({ ...filters, listingMode: "holiday" })}
      className={`flex-1 py-3 text-[14px] font-medium transition-all ${
        filters.listingMode === "holiday"
          ? "bg-luxury-black text-white"
          : "bg-white text-luxury-black/60"
      }`}
    >
      Holiday
    </button>
  </div>
</div>
```

**CSS:**
| Elemento | Clases |
|----------|--------|
| Contenedor | `bg-neutral-50 rounded-xl p-5` |
| Título | `text-[14px] font-medium text-luxury-black mb-1` |
| Subtítulo | `text-[12px] text-luxury-black/45 mb-4` |
| Grupo botones | `flex rounded-lg border border-neutral-200 overflow-hidden` |
| Botón activo | `flex-1 py-3 text-[14px] font-medium bg-luxury-black text-white transition-all` |
| Botón inactivo | `flex-1 py-3 text-[14px] font-medium bg-white text-luxury-black/60 transition-all` |

**Lógica:** Selección única entre 3 opciones. Diferencia con V2: V3 tiene 3 opciones (sale/rent/holiday), V2 solo tiene 2 (sale/rent).

---

#### 3.4.12 FOOTER STICKY

```jsx
<div className="border-t border-neutral-200 px-4 py-3 flex items-center gap-3 bg-white">
  <button
    onClick={() => onChange(defaultFilters)}
    className="px-4 py-3.5 text-[13px] text-luxury-black/50 font-medium"
  >
    Clear all
  </button>
  <button
    onClick={onClose}
    className="flex-1 bg-luxury-black text-white text-[14px] tracking-[0.08em] uppercase py-3.5 rounded-lg font-medium"
  >
    Show {8} properties
  </button>
</div>
```

**CSS:**
| Elemento | Clases |
|----------|--------|
| Contenedor | `border-t border-neutral-200 px-4 py-3 flex items-center gap-3 bg-white` |
| Clear all | `px-4 py-3.5 text-[13px] text-luxury-black/50 font-medium` |
| CTA Show | `flex-1 bg-luxury-black text-white text-[14px] tracking-[0.08em] uppercase py-3.5 rounded-lg font-medium` |

**Nota:** El `{8}` está hardcoded. En producción debería ser `resultsCount` del backend.

---

## 4. ICONOS UTILIZADOS (lucide-react)

```typescript
import {
  X,              // cerrar, eliminar chip
  ChevronDown,    // expandir categoría, selector precio
  Bed,            // sección dormitorios
  Bath,           // sección baños
  Maximize,       // sección área
  MapPin,         // sección amenities
  Building2,      // sección tipo propiedad
} from "lucide-react";
```

---

## 5. Z-INDEX STACK

| Capa | z-index | Elemento |
|------|---------|----------|
| 1 | `z-50` | Backdrop del filter sheet |
| 2 | `z-50` | Panel del filter sheet |
| 3 | `z-[200]` | Popup del MobilePriceSelect (sobre el sheet) |

---

## 6. ANIMACIONES RESUMEN

| Elemento | Animación |
|----------|-----------|
| Backdrop filter sheet | `animate-in fade-in duration-200` |
| Panel filter sheet | `animate-in slide-in-from-bottom duration-500 ease-out` |
| Backdrop price popup | `animate-in fade-in duration-200` |
| Sheet price popup | `animate-in slide-in-from-bottom duration-500 ease-out` |
| Subtipos expandidos | `animate-in slide-in-from-top-1 duration-200` |
| ChevronDown rotación | `transition-transform duration-200` + clase `rotate-180` |
| Chips/botones | `transition-all` (cambio de color/bg instantáneo con suavizado) |
| Hover en subtipos | `transition-colors` |

---

## 7. DEPENDENCIAS

| Dependencia | Uso |
|-------------|-----|
| `react` | useState, useRef, useEffect |
| `lucide-react` | Iconos (X, ChevronDown, Bed, Bath, Maximize, MapPin, Building2) |
| `tailwindcss-animate` | Clases `animate-in`, `slide-in-from-bottom`, `fade-in`, `slide-in-from-top-1` |

---

## 8. NOTAS DE IMPLEMENTACIÓN

1. **Font-size 16px en inputs**: Obligatorio para evitar auto-zoom de Safari iOS al hacer focus
2. **accent-luxury-black en checkboxes**: Usa la propiedad CSS `accent-color` para colorear checkboxes nativos
3. **Solo 1 categoría expandida**: `expandedCat` es un string, no un array — cambiar a otra categoría cierra la anterior
4. **MobilePriceSelect sobre el filter sheet**: z-[200] vs z-50 — el popup de precio se renderiza sobre el sheet de filtros
5. **`e.stopPropagation()`**: En el popup de precio, evita que clicks internos cierren el popup
6. **Chips activos**: Se recalculan con `buildActiveChips()` en cada render, no se almacenan como estado separado
