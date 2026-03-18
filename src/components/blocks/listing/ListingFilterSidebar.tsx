/**
 * LISTING FILTER SIDEBAR (Desktop)
 * Full-height slide-in panel with grouped filters: Property Type (with subtypes),
 * Price range with presets, Living area, Bedrooms, Bathrooms, Amenities.
 * Includes "Clear all" + "Show results" sticky footer.
 * Origin: LuxuryPropertyListingV2 → FilterSidebar
 */

import { X, ChevronDown } from "lucide-react";

/* ─── Types ─── */
export interface SidebarFilterState {
  types: string[];
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  beds: string;
  baths: string;
  amenities: string[];
}

interface TypeWithSubtypes { label: string; subtypes?: string[] }

export interface ListingFilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: SidebarFilterState;
  onChange: (f: SidebarFilterState) => void;
  typeOptions?: TypeWithSubtypes[];
  bedOptions?: string[];
  bathOptions?: string[];
  pricePresets?: { label: string; value: string }[];
  amenities?: string[];
}

/* ─── Defaults ─── */
const DEFAULT_TYPES: TypeWithSubtypes[] = [
  { label: "Villa", subtypes: ["Modern Villa", "Traditional Villa", "Luxury Villa"] },
  { label: "Penthouse", subtypes: ["Duplex Penthouse", "Sky Penthouse"] },
  { label: "Apartment", subtypes: ["Ground Floor", "Duplex", "Studio", "Loft"] },
  { label: "Finca" },
  { label: "New Build" },
  { label: "Land", subtypes: ["Urban", "Rustic"] },
];
const DEFAULT_BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const DEFAULT_BATHS = ["Any", "1+", "2+", "3+", "4+"];
const DEFAULT_PRESETS = [
  { label: "€500K", value: "500000" },
  { label: "€1M", value: "1000000" },
  { label: "€2M", value: "2000000" },
  { label: "€5M", value: "5000000" },
  { label: "€10M", value: "10000000" },
];
const DEFAULT_AMENITIES = ["Sea Views", "Pool", "Garden", "Garage", "Terrace", "Smart Home", "Gym", "Wine Cellar"];

const EMPTY: SidebarFilterState = { types: [], priceMin: "", priceMax: "", areaMin: "", areaMax: "", beds: "Any", baths: "Any", amenities: [] };

export default function ListingFilterSidebar({
  open,
  onClose,
  filters,
  onChange,
  typeOptions = DEFAULT_TYPES,
  bedOptions = DEFAULT_BEDS,
  bathOptions = DEFAULT_BATHS,
  pricePresets = DEFAULT_PRESETS,
  amenities = DEFAULT_AMENITIES,
}: ListingFilterSidebarProps) {
  if (!open) return null;
  const toggleType = (t: string) => onChange({ ...filters, types: filters.types.includes(t) ? filters.types.filter(x => x !== t) : [...filters.types, t] });
  const toggleAmenity = (a: string) => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] });

  return (
    <>
      <div className="fixed inset-0 bg-neutral-900/30 z-40" onClick={onClose} />
      <aside className="fixed top-0 left-0 h-full w-[340px] bg-white z-50 overflow-y-auto border-r border-neutral-200 shadow-lg animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <h2 className="text-[17px] font-medium text-neutral-900">Filters</h2>
          <button onClick={onClose} className="text-neutral-900/50 hover:text-neutral-900 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-8">
          {/* Property type */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Property type</h3>
            <div className="space-y-3">
              {typeOptions.map((t) => (
                <label key={t.label} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={filters.types.includes(t.label)} onChange={() => toggleType(t.label)} className="w-[18px] h-[18px] border-neutral-300 rounded accent-neutral-900" />
                    <span className="text-[15px] text-neutral-900/80 group-hover:text-neutral-900 transition-colors">{t.label}</span>
                  </div>
                  {t.subtypes && <span className="text-[13px] text-neutral-900/45 flex items-center gap-1">All subtypes <ChevronDown className="w-3 h-3" /></span>}
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Price range</h3>
            <div className="flex gap-3 mb-3">
              <input type="text" value={filters.priceMin} onChange={(e) => onChange({ ...filters, priceMin: e.target.value })} placeholder="€ No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
              <input type="text" value={filters.priceMax} onChange={(e) => onChange({ ...filters, priceMax: e.target.value })} placeholder="€ No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
            </div>
            <div className="flex flex-wrap gap-2">
              {pricePresets.map(p => (
                <button key={p.value} onClick={() => onChange({ ...filters, priceMin: filters.priceMin === p.value ? "" : p.value })} className={`text-[12px] px-3 py-1 rounded-full border transition-colors ${filters.priceMin === p.value ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-900/60 hover:border-neutral-900/40"}`}>{p.label}+</button>
              ))}
            </div>
          </div>

          {/* Living area */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Living area</h3>
            <div className="flex gap-3">
              <input type="text" value={filters.areaMin} onChange={(e) => onChange({ ...filters, areaMin: e.target.value })} placeholder="No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
              <input type="text" value={filters.areaMax} onChange={(e) => onChange({ ...filters, areaMax: e.target.value })} placeholder="No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
            </div>
            <span className="text-[12px] text-neutral-900/45 mt-1.5 block">m²</span>
          </div>

          {/* Bedrooms */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Bedrooms</h3>
            <div className="flex gap-2">
              {bedOptions.map((b) => (
                <button key={b} onClick={() => onChange({ ...filters, beds: b })} className={`px-4 py-2 text-[14px] border rounded-md transition-all duration-200 ${filters.beds === b ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300 text-neutral-900/65 hover:border-neutral-900/40"}`}>{b}</button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Bathrooms</h3>
            <div className="flex gap-2">
              {bathOptions.map((b) => (
                <button key={b} onClick={() => onChange({ ...filters, baths: b })} className={`px-4 py-2 text-[14px] border rounded-md transition-all duration-200 ${filters.baths === b ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300 text-neutral-900/65 hover:border-neutral-900/40"}`}>{b}</button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-4">Amenities</h3>
            <div className="space-y-3">
              {amenities.map((a) => (
                <label key={a} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={filters.amenities.includes(a)} onChange={() => toggleAmenity(a)} className="w-[18px] h-[18px] border-neutral-300 rounded accent-neutral-900" />
                  <span className="text-[15px] text-neutral-900/75 group-hover:text-neutral-900 transition-colors">{a}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 border-t border-neutral-200 bg-white p-5 flex gap-4 items-center">
          <button onClick={() => onChange(EMPTY)} className="text-[13px] text-neutral-900/50 hover:text-neutral-900 transition-colors font-light">Clear all</button>
          <button onClick={onClose} className="flex-1 bg-neutral-900 text-white text-[13px] tracking-[0.1em] uppercase py-3 rounded-md hover:bg-neutral-900/85 transition-all duration-300 font-medium">Show results</button>
        </div>
      </aside>
    </>
  );
}
