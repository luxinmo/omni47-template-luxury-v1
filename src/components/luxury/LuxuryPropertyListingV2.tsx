import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search, SlidersHorizontal, X, ChevronDown, ChevronRight,
  Bed, Bath, Maximize, MapPin, Mail, Lock, Eye, Phone, User, Crown,
  ArrowRight, Building2, Menu, ArrowUpDown, MessageCircle, Bot, Send,
} from "lucide-react";
import { brand } from "@/config/template";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import heroImg from "@/assets/luxury-hero.jpg";
import LocationSearchDropdown from "./LocationSearchDropdown";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

/* ─── Types ─── */
interface FilterState {
  locations: { id: string; name: string; path: string; type: string }[];
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
}

const defaultFilters: FilterState = {
  locations: [],
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
};

/* ─── Constants ─── */
const TYPE_OPTIONS_WITH_SUBTYPES: { label: string; subtypes?: string[] }[] = [
  { label: "Villa", subtypes: ["Modern Villa", "Traditional Villa", "Luxury Villa"] },
  { label: "Penthouse", subtypes: ["Duplex Penthouse", "Sky Penthouse"] },
  { label: "Apartment", subtypes: ["Ground Floor", "Duplex", "Studio", "Loft"] },
  { label: "Finca" },
  { label: "New Build" },
  { label: "Land", subtypes: ["Urban", "Rustic"] },
];
const TYPE_OPTIONS = TYPE_OPTIONS_WITH_SUBTYPES.map(t => t.label);
const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const BATH_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];
const AMENITY_SIDEBAR = ["Sea Views", "Pool", "Garden", "Garage", "Terrace", "Smart Home", "Gym", "Wine Cellar"];
const AMENITY_GROUPS = [
  { title: "View", items: ["Panoramic View", "Sea Views", "Mountain View", "Golf View"] },
  { title: "Outdoor", items: ["Garden", "Pool", "Terrace", "Garage", "Balcony", "Private Beach"] },
  { title: "Indoor", items: ["Air Conditioning", "Fireplace", "Gym", "Wine Cellar", "Cinema", "Elevator", "Jacuzzi", "Sauna", "Smart Home"] },
];
const PRICE_PRESETS = [
  { label: "€500K", value: "500000" },
  { label: "€1M", value: "1000000" },
  { label: "€2M", value: "2000000" },
  { label: "€5M", value: "5000000" },
  { label: "€10M", value: "10000000" },
];

const SORT_OPTIONS = [
  { value: "premium", label: "Premium" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "beds-desc", label: "Most Bedrooms" },
  { value: "area-desc", label: "Largest Area" },
];

/* ─── Dropdown Hook ─── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return { open, setOpen, ref };
}

/* ─── Desktop Dropdown Components ─── */
const TypeDropdown = ({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 shrink-0 ${selected.length > 0 ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30"}`}>
        Type {selected.length > 0 && <span className="bg-white text-luxury-black text-[12px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{selected.length}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[300px] py-2 z-50">
          {TYPE_OPTIONS.map((t) => (
            <label key={t} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors">
              <input type="checkbox" checked={selected.includes(t)} onChange={() => onToggle(t)} className="w-4 h-4 border-neutral-300 rounded-sm accent-luxury-black" />
              <span className="text-[14px] text-luxury-black/80">{t}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const PriceDropdown = ({ priceMin, priceMax, hidePOR, onMinChange, onMaxChange, onHidePORChange }: {
  priceMin: string; priceMax: string; hidePOR: boolean;
  onMinChange: (v: string) => void; onMaxChange: (v: string) => void; onHidePORChange: (v: boolean) => void;
}) => {
  const { open, setOpen, ref } = useDropdown();
  const hasValue = priceMin || priceMax;
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${hasValue ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30"}`}>
        Price {hasValue && "●"} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl w-[400px] p-6 z-50">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-[12px] uppercase tracking-wider text-luxury-black/65 font-medium mb-2 block">Min price</label>
              <input type="text" value={priceMin} onChange={(e) => onMinChange(e.target.value)} placeholder="€ No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40 focus:ring-1 focus:ring-luxury-black/10" />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {PRICE_PRESETS.slice(0, 3).map(p => (
                  <button key={p.value} onClick={() => onMinChange(p.value)} className={`text-[12px] px-3 py-1 rounded-full border transition-colors font-light ${priceMin === p.value ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-300 text-luxury-black/65 hover:border-luxury-black/40"}`}>{p.label}</button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[12px] uppercase tracking-wider text-luxury-black/65 font-medium mb-2 block">Max price</label>
              <input type="text" value={priceMax} onChange={(e) => onMaxChange(e.target.value)} placeholder="€ No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40 focus:ring-1 focus:ring-luxury-black/10" />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {PRICE_PRESETS.slice(2).map(p => (
                  <button key={p.value} onClick={() => onMaxChange(p.value)} className={`text-[12px] px-3 py-1 rounded-full border transition-colors font-light ${priceMax === p.value ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-300 text-luxury-black/65 hover:border-luxury-black/40"}`}>{p.label}</button>
                ))}
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer mt-1 pt-3 border-t border-neutral-100">
            <input type="checkbox" checked={hidePOR} onChange={() => onHidePORChange(!hidePOR)} className="w-4 h-4 border-neutral-300 rounded-sm accent-luxury-black" />
            <span className="text-[14px] text-luxury-black/75">Hide "Price on Request" listings</span>
          </label>
        </div>
      )}
    </div>
  );
};

const BedsDropdown = ({ selected, onChange }: { selected: string; onChange: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${selected !== "Any" ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30"}`}>
        Beds {selected !== "Any" && <span className="text-[12px]">{selected}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[320px] p-5 z-50">
          <div className="flex gap-1">
            {BED_OPTIONS.map((b) => (
              <button key={b} onClick={() => onChange(b)} className={`flex-1 py-2 text-[13px] border transition-all duration-200 ${selected === b ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-200 text-luxury-black/60 hover:border-luxury-black/30"}`}>{b}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AmenitiesDropdown = ({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${selected.length > 0 ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30"}`}>
        Amenities {selected.length > 0 && <span className="bg-white text-luxury-black text-[12px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{selected.length}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[480px] max-h-[420px] overflow-y-auto p-5 z-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] text-luxury-black/40 uppercase tracking-wide">Select amenities</span>
            {selected.length > 0 && <button onClick={() => selected.forEach(s => onToggle(s))} className="text-[12px] text-luxury-black/50 hover:text-luxury-black">Clear</button>}
          </div>
          {AMENITY_GROUPS.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              <h4 className="text-[14px] font-medium text-luxury-black mb-3">{group.title}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <button key={item} onClick={() => onToggle(item)} className={`flex items-center gap-1.5 border rounded-full px-3.5 py-1.5 text-[12px] transition-all duration-200 ${selected.includes(item) ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/60 hover:border-luxury-black/40"}`}>{item}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Helpers ─── */
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
    case "newBuilds": next.newBuilds = false; break;
    case "hidePOR": next.hidePriceOnRequest = false; break;
  }
  return next;
}

/* ─── Filter Sidebar (Desktop) ─── */
const FilterSidebar = ({ open, onClose, filters, onChange }: { open: boolean; onClose: () => void; filters: FilterState; onChange: (f: FilterState) => void }) => {
  if (!open) return null;
  const toggleType = (t: string) => onChange({ ...filters, types: filters.types.includes(t) ? filters.types.filter(x => x !== t) : [...filters.types, t] });
  const toggleAmenity = (a: string) => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] });

  return (
    <>
      <div className="fixed inset-0 bg-luxury-black/30 z-40" onClick={onClose} />
      <aside className="fixed top-0 left-0 h-full w-[340px] bg-white z-50 overflow-y-auto border-r border-neutral-200 shadow-lg animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <h2 className="text-[17px] font-medium text-luxury-black">Filters</h2>
          <button onClick={onClose} className="text-luxury-black/50 hover:text-luxury-black transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Property type</h3>
            <div className="space-y-3">
              {TYPE_OPTIONS_WITH_SUBTYPES.map((t) => (
                <label key={t.label} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={filters.types.includes(t.label)} onChange={() => toggleType(t.label)} className="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black" />
                    <span className="text-[15px] text-luxury-black/80 group-hover:text-luxury-black transition-colors">{t.label}</span>
                  </div>
                  {t.subtypes && <span className="text-[13px] text-luxury-black/45 flex items-center gap-1">All subtypes <ChevronDown className="w-3 h-3" /></span>}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Price range</h3>
            <div className="flex gap-3 mb-3">
              <input type="text" value={filters.priceMin} onChange={(e) => onChange({ ...filters, priceMin: e.target.value })} placeholder="€ No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
              <input type="text" value={filters.priceMax} onChange={(e) => onChange({ ...filters, priceMax: e.target.value })} placeholder="€ No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map(p => (
                <button key={p.value} onClick={() => onChange({ ...filters, priceMin: filters.priceMin === p.value ? "" : p.value })} className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${filters.priceMin === p.value ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-300 text-luxury-black/60 hover:border-luxury-black/40"}`}>{p.label}+</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Living area</h3>
            <div className="flex gap-3">
              <input type="text" value={filters.areaMin} onChange={(e) => onChange({ ...filters, areaMin: e.target.value })} placeholder="No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
              <input type="text" value={filters.areaMax} onChange={(e) => onChange({ ...filters, areaMax: e.target.value })} placeholder="No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
            </div>
            <span className="text-[12px] text-luxury-black/45 mt-1.5 block">m²</span>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Bedrooms</h3>
            <div className="flex gap-2">
              {BED_OPTIONS.map((b) => (
                <button key={b} onClick={() => onChange({ ...filters, beds: b })} className={`px-4 py-2 text-[14px] border rounded-md transition-all duration-200 ${filters.beds === b ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-300 text-luxury-black/65 hover:border-luxury-black/40"}`}>{b}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Bathrooms</h3>
            <div className="flex gap-2">
              {BATH_OPTIONS.map((b) => (
                <button key={b} onClick={() => onChange({ ...filters, baths: b })} className={`px-4 py-2 text-[14px] border rounded-md transition-all duration-200 ${filters.baths === b ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-300 text-luxury-black/65 hover:border-luxury-black/40"}`}>{b}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-luxury-black mb-4">Amenities</h3>
            <div className="space-y-3">
              {AMENITY_SIDEBAR.map((a) => (
                <label key={a} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={filters.amenities.includes(a)} onChange={() => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] })} className="w-[18px] h-[18px] border-neutral-300 rounded accent-luxury-black" />
                  <span className="text-[15px] text-luxury-black/75 group-hover:text-luxury-black transition-colors">{a}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 border-t border-neutral-200 bg-white p-5 flex gap-4 items-center">
          <button onClick={() => onChange(defaultFilters)} className="text-[13px] text-luxury-black/50 hover:text-luxury-black transition-colors font-light">Clear all</button>
          <button onClick={onClose} className="flex-1 bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 rounded-md hover:bg-luxury-black/85 transition-all duration-300 font-medium">Show results</button>
        </div>
      </aside>
    </>
  );
};

/* ─── Mobile Filter Sheet (fullscreen) ─── */
const MobileFilterSheet = ({ open, onClose, filters, onChange }: { open: boolean; onClose: () => void; filters: FilterState; onChange: (f: FilterState) => void }) => {
  if (!open) return null;
  const activeCount = buildActiveChips(filters).length;
  const toggleType = (t: string) => onChange({ ...filters, types: filters.types.includes(t) ? filters.types.filter(x => x !== t) : [...filters.types, t] });

  return (
    <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200">
        <button onClick={onClose} className="text-luxury-black/70"><X className="w-5 h-5" /></button>
        <button onClick={() => onChange(defaultFilters)} className="text-[14px] font-medium text-luxury-black">Clear filters</button>
      </div>

      {/* Active chips */}
      {activeCount > 0 && (
        <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-neutral-100">
          {buildActiveChips(filters).map(chip => (
            <span key={chip.key} className="inline-flex items-center gap-1.5 bg-neutral-100 text-luxury-black text-[12px] font-medium rounded-full pl-3 pr-2 py-1.5">
              {chip.label}
              <button onClick={() => onChange(removeChip(filters, chip))} className="text-luxury-black/40 hover:text-luxury-black/70"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Property Type */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Building2 className="w-5 h-5 text-luxury-black/50" />
            <h3 className="text-[16px] font-medium text-luxury-black">Property Type</h3>
            {filters.types.length > 0 && <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{filters.types.length}</span>}
          </div>
          <div className="space-y-1">
            {TYPE_OPTIONS_WITH_SUBTYPES.map((t) => (
              <button key={t.label} onClick={() => toggleType(t.label)} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all ${filters.types.includes(t.label) ? "border-luxury-black bg-neutral-50" : "border-neutral-200"}`}>
                <span className="text-[15px] text-luxury-black/80">{t.label}</span>
                <ChevronRight className="w-4 h-4 text-luxury-black/30" />
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-luxury-black/50 text-lg">€</span>
            <h3 className="text-[16px] font-medium text-luxury-black">Price</h3>
          </div>
          <div className="flex gap-3">
            <input type="text" value={filters.priceMin} onChange={(e) => onChange({ ...filters, priceMin: e.target.value })} placeholder="Min" className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
            <input type="text" value={filters.priceMax} onChange={(e) => onChange({ ...filters, priceMax: e.target.value })} placeholder="Max" className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Bed className="w-5 h-5 text-luxury-black/50" />
            <h3 className="text-[16px] font-medium text-luxury-black">Bedrooms</h3>
          </div>
          <div className="flex gap-2">
            {BED_OPTIONS.map((b) => (
              <button key={b} onClick={() => onChange({ ...filters, beds: b })} className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${filters.beds === b ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-200 text-luxury-black/60"}`}>{b}</button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Bath className="w-5 h-5 text-luxury-black/50" />
            <h3 className="text-[16px] font-medium text-luxury-black">Bathrooms</h3>
          </div>
          <div className="flex gap-2">
            {BATH_OPTIONS.map((b) => (
              <button key={b} onClick={() => onChange({ ...filters, baths: b })} className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${filters.baths === b ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-200 text-luxury-black/60"}`}>{b}</button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Maximize className="w-5 h-5 text-luxury-black/50" />
            <h3 className="text-[16px] font-medium text-luxury-black">Living Area (m²)</h3>
          </div>
          <div className="flex gap-3">
            <input type="text" value={filters.areaMin} onChange={(e) => onChange({ ...filters, areaMin: e.target.value })} placeholder="Min" className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
            <input type="text" value={filters.areaMax} onChange={(e) => onChange({ ...filters, areaMax: e.target.value })} placeholder="Max" className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-luxury-black placeholder:text-luxury-black/35 focus:outline-none focus:border-luxury-black/40" />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <MapPin className="w-5 h-5 text-luxury-black/50" />
            <h3 className="text-[16px] font-medium text-luxury-black">Amenities</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {AMENITY_SIDEBAR.map((a) => (
              <button key={a} onClick={() => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] })} className={`px-4 py-2 text-[13px] rounded-full border transition-all ${filters.amenities.includes(a) ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/60"}`}>{a}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="border-t border-neutral-200 px-4 py-3 flex items-center gap-3 bg-white">
        <button onClick={onClose} className="flex-1 bg-luxury-black text-white text-[14px] tracking-[0.08em] uppercase py-3.5 rounded-lg font-medium">
          Show {8} properties
        </button>
      </div>
    </div>
  );
};

/* ─── Mobile Sort Sheet (bottom action sheet) ─── */
const MobileSortSheet = ({ open, onClose, selected, onSelect }: { open: boolean; onClose: () => void; selected: string; onSelect: (v: string) => void }) => {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-luxury-black/40 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="bg-white rounded-t-2xl shadow-2xl max-h-[70vh] flex flex-col">
          <div className="text-center py-4 border-b border-neutral-100">
            <div className="w-10 h-1 rounded-full bg-neutral-300 mx-auto mb-3" />
            <p className="text-[14px] text-luxury-black/50 font-light">Sort by</p>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onSelect(opt.value); onClose(); }}
                className={`w-full text-left px-6 py-4 text-[16px] transition-colors ${selected === opt.value ? "text-luxury-black font-medium bg-neutral-50" : "text-luxury-black/70 font-light"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="border-t border-neutral-100 p-4">
            <button onClick={onClose} className="w-full py-3.5 text-[15px] font-medium text-luxury-black border border-neutral-200 rounded-xl">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Properties Data ─── */
const PROPERTIES = [
  { id: 1, image: heroImg, gallery: [heroImg, detail1, detail2], tag: "FOR SALE", style: "Contemporary", location: "Santa Eulalia del Río · Ibiza", title: "STUNNING CONTEMPORARY VILLA WITH PANORAMIC SEA VIEWS", excerpt: "This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera...", beds: 5, baths: 4, sqm: 420, plot: 1200, price: "€4,650,000", features: ["Sea Views", "Infinity Pool", "Smart Home", "Garage"], offmarket: false },
  { id: 2, image: prop1, gallery: [prop1, detail3, heroImg], tag: "FOR SALE", style: "Luxury", location: "Marina Botafoch · Ibiza", title: "LUXURY PENTHOUSE WITH ROOFTOP TERRACE AND HARBOUR VIEWS", excerpt: "Exceptional penthouse located in the prestigious Marina Botafoch area, offering stunning views over Dalt Vila and the harbour...", beds: 3, baths: 3, sqm: 210, plot: null as number | null, price: "€3,100,000", features: ["Terrace", "Harbour Views", "Modern", "Elevator"], offmarket: false },
  { id: 10, image: prop2, gallery: [prop2], tag: "OFF-MARKET", style: "Luxury Villa", location: "Ibiza", title: "", excerpt: "", beds: 7, baths: 6, sqm: 650, plot: 3500, price: "Price on Request", features: ["Sea Views", "Infinity Pool", "Guest House", "Wine Cellar"], offmarket: true },
  { id: 3, image: prop2, gallery: [prop2, detail1, detail2], tag: "FOR SALE", style: "Traditional", location: "San José · Ibiza", title: "TRADITIONAL FINCA WITH MODERN RENOVATION AND PRIVATE POOL", excerpt: "A beautifully restored traditional Ibicencan finca set within 15,000 m² of private land...", beds: 6, baths: 5, sqm: 480, plot: 15000, price: "€5,800,000", features: ["Pool", "Garden", "Guest House", "Parking"], offmarket: false },
  { id: 4, image: prop3, gallery: [prop3, detail3, heroImg], tag: "FOR SALE", style: "Modern", location: "Altea · Costa Blanca", title: "MODERN VILLA WITH INFINITY POOL OVERLOOKING THE MEDITERRANEAN", excerpt: "Architecturally striking villa perched on the hillside of Altea with sweeping views...", beds: 4, baths: 4, sqm: 350, plot: 800, price: "€2,950,000", features: ["Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar"], offmarket: false },
  { id: 11, image: detail3, gallery: [detail3], tag: "OFF-MARKET", style: "Penthouse", location: "Marbella", title: "", excerpt: "", beds: 4, baths: 3, sqm: 320, plot: null as number | null, price: "Price on Request", features: ["Panoramic View", "Terrace", "Smart Home", "Jacuzzi"], offmarket: true },
  { id: 5, image: detail1, gallery: [detail1, prop1, prop2], tag: "NEW BUILD", style: "Modern", location: "Sant Antoni de Portmany · Ibiza", title: "MODERN IBIZA-STYLE FLAT WITH LARGE TERRACE", excerpt: "Modern Ibiza-style flat for sale in Sant Antoni de Portmany...", beds: 1, baths: 1, sqm: 70, plot: null as number | null, price: "€530,000", features: ["Terrace", "Modern", "Community Pool", "Parking"], offmarket: false },
  { id: 6, image: detail2, gallery: [detail2, prop3, heroImg], tag: "FOR SALE", style: "Classic", location: "Jávea · Costa Blanca", title: "FRONTLINE GOLF ESTATE WITH MOUNTAIN AND SEA VIEWS", excerpt: "Impressive estate located on the frontline of a prestigious golf course in Jávea...", beds: 5, baths: 5, sqm: 520, plot: 2500, price: "€3,750,000", features: ["Golf Views", "Pool", "Gym", "Staff Quarters"], offmarket: false },
];

/* ─── Branded Residence Card ─── */
const BrandedResidencePromoCard = () => (
  <Link to="/branded-residences/four-seasons-marbella" className="group relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-sm overflow-hidden mb-6 hover:shadow-lg transition-all duration-300 bg-[hsl(36,18%,96%)] border border-luxury-gold/25 ring-1 ring-luxury-gold/10">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
    <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
      <img src={prop1} alt="Four Seasons Private Residences" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-luxury-gold text-white text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-sm"><Crown className="w-3 h-3" /> Branded Residence</span>
    </div>
    <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
      <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">Marbella · Costa del Sol</p>
      <h2 className="text-[17px] md:text-[19px] font-medium text-luxury-black leading-snug mb-1.5">FOUR SEASONS PRIVATE RESIDENCES</h2>
      <p className="text-[14px] text-luxury-black/60 font-light leading-relaxed mb-5 line-clamp-2">Oceanfront residences with full Four Seasons hotel services, private beach club and world-class spa.</p>
      <div className="mt-auto pt-5 border-t border-neutral-100">
        <p className="text-2xl md:text-[28px] font-extralight text-luxury-black tracking-tight">€3,500,000 — €8,200,000</p>
      </div>
    </div>
  </Link>
);

/* ─── New Dev Promo Card ─── */
const NewDevPromoCard = () => (
  <Link to="/new-developments/marea-residences-altea" className="group relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-sm overflow-hidden mb-6 hover:shadow-lg transition-all duration-300 bg-[hsl(30,20%,96%)] border border-luxury-black/10">
    <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
      <img src={detail1} alt="Marea Residences" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-luxury-black/80 text-white text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-sm"><Building2 className="w-3 h-3" /> New Development</span>
    </div>
    <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
      <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">Altea · Costa Blanca</p>
      <h2 className="text-[17px] md:text-[19px] font-medium text-luxury-black leading-snug mb-1.5">MAREA RESIDENCES</h2>
      <p className="text-[14px] text-luxury-black/60 font-light leading-relaxed mb-5 line-clamp-2">Contemporary beachfront apartments with panoramic sea views and communal pools.</p>
      <div className="mt-auto pt-5 border-t border-neutral-100">
        <p className="text-2xl md:text-[28px] font-extralight text-luxury-black tracking-tight">€485,000 — €1,250,000</p>
      </div>
    </div>
  </Link>
);

/* ─── Property Card ─── */
const PropertyCard = ({ property }: { property: typeof PROPERTIES[0] }) => (
  <a href={`/property/${property.id}`} className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
    <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
      <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
      {property.tag === "NEW BUILD" && <span className="absolute top-3 left-3 bg-luxury-black/60 backdrop-blur-sm text-white text-[12px] tracking-[0.12em] uppercase font-medium px-2.5 py-1">New Build</span>}
      {property.gallery.length > 1 && <span className="absolute bottom-3 right-3 bg-luxury-black/60 text-white text-[12px] px-2 py-1 font-light">1/{property.gallery.length}</span>}
    </div>
    <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{property.tag}</span>
        <button onClick={(e) => e.preventDefault()} className="text-luxury-black/30 hover:text-luxury-black transition-colors"><Mail className="w-4.5 h-4.5" /></button>
      </div>
      <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">{property.location}</p>
      <p className="text-[13px] text-luxury-black/55 font-light mb-1.5">Detached houses <span className="mx-1 text-luxury-black/30">|</span> <span className="italic">{property.style}</span> <span className="mx-1 text-luxury-black/30">|</span> <span className="font-mono text-luxury-black/45 tracking-wide text-[12px]">REF-{String(property.id).padStart(4, "0")}</span></p>
      <h2 className="text-[17px] md:text-[19px] font-medium text-luxury-black leading-snug mb-1.5 group-hover:text-luxury-black/75 transition-colors duration-300">{property.title}</h2>
      <p className="text-[14px] text-luxury-black/60 font-light leading-relaxed mb-5 line-clamp-2">{property.excerpt}</p>
      <div className="flex items-center gap-7 mb-5">
        <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Beds</p><p className="text-[16px] text-luxury-black font-light">{property.beds}</p></div>
        <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Baths</p><p className="text-[16px] text-luxury-black font-light">{property.baths}</p></div>
        <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Built</p><p className="text-[16px] text-luxury-black font-light">{property.sqm} m²</p></div>
        {property.plot && <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Plot</p><p className="text-[16px] text-luxury-black font-light">{property.plot.toLocaleString()} m²</p></div>}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {property.features.map((f, i) => <span key={i} className="text-[12px] text-luxury-black/55 font-light flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-luxury-black/30" />{f}</span>)}
      </div>
      <div className="mt-auto pt-5 border-t border-neutral-100">
        <p className="text-2xl md:text-[28px] font-extralight text-luxury-black tracking-tight">{property.price}</p>
      </div>
    </div>
  </a>
);

/* ─── Off-Market Card ─── */
const OffMarketPropertyCard = ({ property }: { property: typeof PROPERTIES[0] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const offmarketTitle = `${property.style.toUpperCase()} FOR SALE OFF-MARKET`;
  return (
    <>
      <div onClick={() => setModalOpen(true)} className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300 cursor-pointer relative">
        <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
          <img src={property.image} alt="Off-market" className="w-full h-full object-cover absolute inset-0 filter blur-lg scale-110" />
          <div className="absolute inset-0 bg-luxury-black/40 flex flex-col items-center justify-center gap-3">
            <Lock className="w-8 h-8 text-white/80" />
            <span className="text-[12px] tracking-[0.2em] uppercase text-white/90 font-medium">Off-Market</span>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium bg-amber-50">OFF-MARKET</span>
            <Lock className="w-4 h-4 text-luxury-black/30" />
          </div>
          <h2 className="text-[17px] md:text-[19px] font-medium text-luxury-black leading-snug mb-1.5">{offmarketTitle}</h2>
          <p className="text-[14px] text-luxury-black/60 font-light leading-relaxed mb-5 line-clamp-2 italic">This property is part of our exclusive off-market portfolio.</p>
          <div className="flex items-center gap-7 mb-5">
            <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Beds</p><p className="text-[16px] text-luxury-black font-light">{property.beds}</p></div>
            <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Baths</p><p className="text-[16px] text-luxury-black font-light">{property.baths}</p></div>
            <div className="text-center"><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Built</p><p className="text-[16px] text-luxury-black font-light">{property.sqm} m²</p></div>
          </div>
          <div className="mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between">
            <p className="text-2xl md:text-[28px] font-extralight text-luxury-black/50 tracking-tight italic">Price on Request</p>
            <span className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 font-light flex items-center gap-1.5"><Lock className="w-3 h-3" /> Request access</span>
          </div>
        </div>
      </div>
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-luxury-black/60 backdrop-blur-sm z-50" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[520px] rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto p-6">
              <button onClick={() => setModalOpen(false)} className="float-right text-luxury-black/40 hover:text-luxury-black"><X className="w-5 h-5" /></button>
              <div className="flex items-center gap-2 mb-3"><Lock className="w-4 h-4 text-luxury-black/50" /><span className="text-[12px] tracking-[0.15em] uppercase text-luxury-black/60 font-medium">Private Listing</span></div>
              <h3 className="text-[18px] font-medium text-luxury-black">{property.style} for sale off-market</h3>
              <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
                <input type="text" required placeholder="Full name" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:border-luxury-black/40" />
                <input type="email" required placeholder="Email" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:border-luxury-black/40" />
                <input type="tel" placeholder="Phone" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:border-luxury-black/40" />
                <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.12em] uppercase py-3.5 hover:bg-luxury-black/85 transition-all">Request Property Dossier</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/* ─── MAIN COMPONENT ─── */
/* ═══════════════════════════════════════════════════════════ */

const LuxuryPropertyListingV2 = () => {
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("premium");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileSearch, setMobileSearch] = useState("");

  const toggleType = (t: string) => setFilters(f => ({ ...f, types: f.types.includes(t) ? f.types.filter(x => x !== t) : [...f.types, t] }));
  const toggleAmenity = (a: string) => setFilters(f => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a] }));
  const activeChips = buildActiveChips(filters);
  const activeFilterCount = activeChips.length;

  return (
    <Layout activePath="/properties" background="#fff" showBackToTop={!isMobile}>
      <SEOHead title="Luxury Properties for Sale" description="Discover luxury villas, penthouses and more." />

      {/* ─── MOBILE: Sticky search bar ─── */}
      {isMobile && (
        <div className="sticky top-[64px] z-40 bg-white border-b border-neutral-200 px-3 py-2.5">
          {/* Search row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-black/40" strokeWidth={1.5} />
              <input
                type="text"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full pl-9 pr-3 py-2.5 text-[14px] bg-neutral-100 rounded-lg text-luxury-black placeholder:text-luxury-black/40 focus:outline-none focus:bg-neutral-200/70 transition-colors"
              />
              {mobileSearch && (
                <button onClick={() => setMobileSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-black/40">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Sort button */}
            <button
              onClick={() => setSortOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-luxury-black/60 hover:bg-neutral-50 transition-colors shrink-0"
            >
              <ArrowUpDown className="w-4.5 h-4.5" />
            </button>
            {/* Filter button */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-luxury-black/60 hover:bg-neutral-50 transition-colors shrink-0"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>
              )}
            </button>
          </div>
          {/* Results count */}
          <p className="text-[13px] text-luxury-black/50 font-light text-center mt-2">{PROPERTIES.length} properties</p>
        </div>
      )}

      {/* ─── DESKTOP: Sticky breadcrumbs + search bar ─── */}
      {!isMobile && (
        <div className="sticky top-[64px] sm:top-[80px] z-40 bg-white border-b border-neutral-200">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-2 pt-3.5 pb-2.5 text-[13px] tracking-[0.04em] text-luxury-black/60 font-normal">
              <a href="/" className="hover:text-luxury-black transition-colors">Home</a>
              <ChevronRight className="w-3 h-3 text-luxury-black/35" />
              <a href="/properties" className="hover:text-luxury-black transition-colors">Properties</a>
              <ChevronRight className="w-3 h-3 text-luxury-black/35" />
              <span className="text-luxury-black font-medium">All Locations</span>
            </div>
            <div className="pb-3">
              <LocationSearchDropdown selected={filters.locations} onSelectedChange={(locs) => setFilters(f => ({ ...f, locations: locs }))} className="w-full md:w-[420px]" />
            </div>
            <div className="flex items-center gap-2 md:gap-3 pb-3 overflow-x-auto">
              <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-1.5 bg-luxury-black text-white text-[14px] px-4 py-2 rounded-full hover:bg-luxury-black/85 transition-all duration-200 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
              <TypeDropdown selected={filters.types} onToggle={toggleType} />
              <PriceDropdown priceMin={filters.priceMin} priceMax={filters.priceMax} hidePOR={filters.hidePriceOnRequest} onMinChange={v => setFilters(f => ({ ...f, priceMin: v }))} onMaxChange={v => setFilters(f => ({ ...f, priceMax: v }))} onHidePORChange={v => setFilters(f => ({ ...f, hidePriceOnRequest: v }))} />
              <BedsDropdown selected={filters.beds} onChange={v => setFilters(f => ({ ...f, beds: v }))} />
              <AmenitiesDropdown selected={filters.amenities} onToggle={toggleAmenity} />
              <button onClick={() => setFilters(f => ({ ...f, newBuilds: !f.newBuilds }))} className={`text-[14px] px-4 py-2 rounded-full transition-all duration-200 shrink-0 border ${filters.newBuilds ? "border-luxury-black bg-luxury-black text-white" : "border-neutral-200 text-luxury-black/65 hover:border-luxury-black/30"}`}>New Builds</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FILTER / SORT Overlays ─── */}
      {isMobile ? (
        <>
          <MobileFilterSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} onChange={setFilters} />
          <MobileSortSheet open={sortOpen} onClose={() => setSortOpen(false)} selected={sortValue} onSelect={setSortValue} />
        </>
      ) : (
        <FilterSidebar open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} onChange={setFilters} />
      )}

      {/* ─── RESULTS ─── */}
      <main className={`max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 py-6 md:py-8 ${isMobile ? "pb-24" : ""}`}>
        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {activeChips.map((chip) => (
              <span key={chip.key} className="inline-flex items-center gap-1.5 bg-neutral-100 text-luxury-black text-[12px] font-medium rounded-full pl-3 pr-2 py-1.5 whitespace-nowrap">
                {chip.label}
                <button onClick={() => setFilters(f => removeChip(f, chip))} className="text-luxury-black/40 hover:text-luxury-black/70 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button onClick={() => setFilters(defaultFilters)} className="text-[12px] text-luxury-black/40 hover:text-luxury-black/70 underline transition-colors ml-1">Clear all</button>
          </div>
        )}

        {/* Results header — desktop only */}
        {!isMobile && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-extralight text-luxury-black tracking-[0.02em] leading-snug">Luxury Properties for Sale</h1>
              <p className="text-[14px] sm:text-[15px] text-luxury-black/60 font-light mt-3 max-w-3xl leading-relaxed">Discover the finest selection of luxury villas, penthouses, fincas and new-build properties across Ibiza and the Costa Blanca.</p>
            </div>
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-200">
              <p className="text-[14px] text-luxury-black/55 font-light">{PROPERTIES.length} properties found</p>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-luxury-black/50 font-light">Sort:</span>
                <button className="text-[13px] text-luxury-black font-medium flex items-center gap-1">Premium <ChevronDown className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </>
        )}

        {/* Property list */}
        <div>
          {PROPERTIES.map((p, idx) => (
            <div key={p.id}>
              {idx === 2 && <BrandedResidencePromoCard />}
              {idx === 4 && <NewDevPromoCard />}
              {p.offmarket ? <OffMarketPropertyCard property={p} /> : <PropertyCard property={p} />}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex flex-col items-center gap-5">
          <button className="border border-neutral-300 text-luxury-black/70 text-[13px] px-16 py-3 rounded-full hover:bg-luxury-black hover:text-white transition-all duration-300">Next</button>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((n) => (
              <button key={n} className={`w-8 h-8 text-[13px] rounded-full transition-all duration-200 ${n === 1 ? "border border-luxury-black text-luxury-black font-medium" : "text-luxury-black/50 hover:text-luxury-black"}`}>{n}</button>
            ))}
            <span className="text-luxury-black/30 px-1">…</span>
            <button className="w-8 h-8 text-[13px] text-luxury-black/50 hover:text-luxury-black rounded-full">50</button>
          </div>
        </div>
      </main>

      {/* ─── MOBILE: Bottom Sticky Navigation Bar ─── */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center">
            <a href="tel:+34600123456" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-neutral-50 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span>
            </a>
            <div className="w-px h-8 bg-neutral-200" />
            <a href="https://wa.me/34600123456" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366] hover:bg-neutral-50 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span>
            </a>
            <div className="w-px h-8 bg-neutral-200" />
            <button className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-neutral-50 transition-colors">
              <Bot className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Chatbot</span>
            </button>
            <div className="w-px h-8 bg-neutral-200" />
            <Link to="/contact" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-neutral-50 transition-colors">
              <Send className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Contact</span>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LuxuryPropertyListingV2;
