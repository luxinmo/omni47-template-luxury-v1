/**
 * LISTING SEARCH BAR (Desktop)
 * Sticky horizontal bar with location search, filter chip-dropdowns (Type, Price, Beds, Amenities),
 * "New Builds" toggle, breadcrumb trail, and active-filter chip strip with "Clear all".
 * Origin: LuxuryPropertyListingV2
 *
 * Props let the host app customise every option list, callbacks, and labels.
 * Internal dropdown state is self-contained; filter *values* are lifted via onChange.
 */

import { useState, useRef, useEffect } from "react";
import {
  Search, SlidersHorizontal, X, ChevronDown, ChevronRight,
} from "lucide-react";

/* ─── Types ─── */
export interface ListingFilterState {
  types: string[];
  priceMin: string;
  priceMax: string;
  hidePriceOnRequest: boolean;
  beds: string;
  amenities: string[];
  newBuilds: boolean;
}

interface PricePreset { label: string; value: string }

interface AmenityGroup { title: string; items: string[] }

export interface ListingSearchBarProps {
  /** Current filter values (controlled) */
  filters: ListingFilterState;
  /** Callback when any filter changes */
  onChange: (next: ListingFilterState) => void;
  /** Open the full filter sidebar */
  onOpenFilters?: () => void;
  /** Total results count to display */
  resultsCount?: number;
  /** Property type options */
  typeOptions?: string[];
  /** Bedroom selector options */
  bedOptions?: string[];
  /** Preset price buttons (min side) */
  pricePresetsMin?: PricePreset[];
  /** Preset price buttons (max side) */
  pricePresetsMax?: PricePreset[];
  /** Amenity groups with title + items */
  amenityGroups?: AmenityGroup[];
  /** Breadcrumb segments */
  breadcrumbs?: { label: string; href?: string }[];
  /** Sort label text */
  sortLabel?: string;
  /** Slot: custom location search component */
  locationSlot?: React.ReactNode;
}

/* ─── Defaults ─── */
const DEFAULT_TYPES = ["Villa", "Penthouse", "Apartment", "Finca", "New Build", "Land"];
const DEFAULT_BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const DEFAULT_PRICE_MIN: PricePreset[] = [
  { label: "€500K", value: "500000" },
  { label: "€1M", value: "1000000" },
  { label: "€2M", value: "2000000" },
];
const DEFAULT_PRICE_MAX: PricePreset[] = [
  { label: "€2M", value: "2000000" },
  { label: "€5M", value: "5000000" },
  { label: "€10M", value: "10000000" },
];
const DEFAULT_AMENITY_GROUPS: AmenityGroup[] = [
  { title: "View", items: ["Panoramic View", "Sea Views", "Mountain View", "Golf View"] },
  { title: "Outdoor", items: ["Garden", "Pool", "Terrace", "Garage", "Balcony", "Private Beach"] },
  { title: "Indoor", items: ["Air Conditioning", "Fireplace", "Gym", "Wine Cellar", "Cinema", "Elevator", "Jacuzzi", "Sauna", "Smart Home"] },
];
const DEFAULT_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "All Locations" },
];

/* ─── Dropdown hook ─── */
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

/* ─── Sub-components ─── */
const TypeDropdown = ({ selected, options, onToggle }: { selected: string[]; options: string[]; onToggle: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 shrink-0 ${selected.length > 0 ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/65 hover:border-neutral-900/30"}`}>
        Type {selected.length > 0 && <span className="bg-white text-neutral-900 text-[12px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{selected.length}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[300px] py-2 z-50">
          {options.map((t) => (
            <label key={t} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors">
              <input type="checkbox" checked={selected.includes(t)} onChange={() => onToggle(t)} className="w-4 h-4 border-neutral-300 rounded-sm accent-neutral-900" />
              <span className="text-[14px] text-neutral-900/80">{t}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const PriceDropdown = ({ priceMin, priceMax, hidePOR, presetsMin, presetsMax, onMinChange, onMaxChange, onHidePORChange }: {
  priceMin: string; priceMax: string; hidePOR: boolean;
  presetsMin: PricePreset[]; presetsMax: PricePreset[];
  onMinChange: (v: string) => void; onMaxChange: (v: string) => void; onHidePORChange: (v: boolean) => void;
}) => {
  const { open, setOpen, ref } = useDropdown();
  const hasValue = priceMin || priceMax;
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${hasValue ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/65 hover:border-neutral-900/30"}`}>
        Price {hasValue && "●"} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl w-[400px] p-6 z-50">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-[12px] uppercase tracking-wider text-neutral-900/65 font-medium mb-2 block">Min price</label>
              <input type="text" value={priceMin} onChange={(e) => onMinChange(e.target.value)} placeholder="€ No Min" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40 focus:ring-1 focus:ring-neutral-900/10" />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {presetsMin.map(p => (
                  <button key={p.value} onClick={() => onMinChange(p.value)} className={`text-[12px] px-3 py-1 rounded-full border transition-colors font-light ${priceMin === p.value ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-900/65 hover:border-neutral-900/40"}`}>{p.label}</button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[12px] uppercase tracking-wider text-neutral-900/65 font-medium mb-2 block">Max price</label>
              <input type="text" value={priceMax} onChange={(e) => onMaxChange(e.target.value)} placeholder="€ No Max" className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40 focus:ring-1 focus:ring-neutral-900/10" />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {presetsMax.map(p => (
                  <button key={p.value} onClick={() => onMaxChange(p.value)} className={`text-[12px] px-3 py-1 rounded-full border transition-colors font-light ${priceMax === p.value ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-900/65 hover:border-neutral-900/40"}`}>{p.label}</button>
                ))}
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer mt-1 pt-3 border-t border-neutral-100">
            <input type="checkbox" checked={hidePOR} onChange={() => onHidePORChange(!hidePOR)} className="w-4 h-4 border-neutral-300 rounded-sm accent-neutral-900" />
            <span className="text-[14px] text-neutral-900/75">Hide "Price on Request" listings</span>
          </label>
        </div>
      )}
    </div>
  );
};

const BedsDropdown = ({ selected, options, onChange }: { selected: string; options: string[]; onChange: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${selected !== "Any" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/65 hover:border-neutral-900/30"}`}>
        Beds {selected !== "Any" && <span className="text-[12px]">{selected}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[320px] p-5 z-50">
          <div className="flex gap-1">
            {options.map((b) => (
              <button key={b} onClick={() => onChange(b)} className={`flex-1 py-2 text-[13px] border transition-all duration-200 ${selected === b ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-900/60 hover:border-neutral-900/30"}`}>{b}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AmenitiesDropdown = ({ selected, groups, onToggle }: { selected: string[]; groups: AmenityGroup[]; onToggle: (v: string) => void }) => {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 border text-[14px] px-4 py-2 rounded-full transition-all duration-200 ${selected.length > 0 ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/65 hover:border-neutral-900/30"}`}>
        Amenities {selected.length > 0 && <span className="bg-white text-neutral-900 text-[12px] w-4 h-4 rounded-full flex items-center justify-center font-medium">{selected.length}</span>} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-sm shadow-lg w-[480px] max-h-[420px] overflow-y-auto p-5 z-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] text-neutral-900/40 uppercase tracking-wide">Select amenities</span>
            {selected.length > 0 && <button onClick={() => selected.forEach(s => onToggle(s))} className="text-[12px] text-neutral-900/50 hover:text-neutral-900">Clear</button>}
          </div>
          {groups.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              <h4 className="text-[14px] font-medium text-neutral-900 mb-3">{group.title}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <button key={item} onClick={() => onToggle(item)} className={`flex items-center gap-1.5 border rounded-full px-3.5 py-1.5 text-[12px] transition-all duration-200 ${selected.includes(item) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/60 hover:border-neutral-900/40"}`}>{item}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main component ─── */
export default function ListingSearchBar({
  filters,
  onChange,
  onOpenFilters,
  resultsCount,
  typeOptions = DEFAULT_TYPES,
  bedOptions = DEFAULT_BEDS,
  pricePresetsMin = DEFAULT_PRICE_MIN,
  pricePresetsMax = DEFAULT_PRICE_MAX,
  amenityGroups = DEFAULT_AMENITY_GROUPS,
  breadcrumbs = DEFAULT_BREADCRUMBS,
  sortLabel = "Premium",
  locationSlot,
}: ListingSearchBarProps) {
  const toggleType = (t: string) => onChange({ ...filters, types: filters.types.includes(t) ? filters.types.filter(x => x !== t) : [...filters.types, t] });
  const toggleAmenity = (a: string) => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] });

  return (
    <div className="sticky top-[64px] sm:top-[80px] z-40 bg-white border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 pt-3.5 pb-2.5 text-[13px] tracking-[0.04em] text-neutral-900/60 font-normal">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="w-3 h-3 text-neutral-900/35" />}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-neutral-900 transition-colors">{crumb.label}</a>
              ) : (
                <span className="text-neutral-900 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Location slot */}
        {locationSlot && <div className="pb-3">{locationSlot}</div>}

        {/* Filter chips row */}
        <div className="flex items-center gap-2 md:gap-3 pb-3 overflow-x-auto">
          <button onClick={onOpenFilters} className="flex items-center gap-1.5 bg-neutral-900 text-white text-[14px] px-4 py-2 rounded-full hover:bg-neutral-900/85 transition-all duration-200 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <TypeDropdown selected={filters.types} options={typeOptions} onToggle={toggleType} />
          <PriceDropdown priceMin={filters.priceMin} priceMax={filters.priceMax} hidePOR={filters.hidePriceOnRequest} presetsMin={pricePresetsMin} presetsMax={pricePresetsMax} onMinChange={v => onChange({ ...filters, priceMin: v })} onMaxChange={v => onChange({ ...filters, priceMax: v })} onHidePORChange={v => onChange({ ...filters, hidePriceOnRequest: v })} />
          <BedsDropdown selected={filters.beds} options={bedOptions} onChange={v => onChange({ ...filters, beds: v })} />
          <AmenitiesDropdown selected={filters.amenities} groups={amenityGroups} onToggle={toggleAmenity} />
          <button onClick={() => onChange({ ...filters, newBuilds: !filters.newBuilds })} className={`text-[14px] px-4 py-2 rounded-full transition-all duration-200 shrink-0 border ${filters.newBuilds ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/65 hover:border-neutral-900/30"}`}>New Builds</button>
        </div>
      </div>
    </div>
  );
}
