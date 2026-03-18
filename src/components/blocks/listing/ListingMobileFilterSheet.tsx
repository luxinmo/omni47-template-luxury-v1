/**
 * LISTING MOBILE FILTER SHEET
 * Fullscreen overlay with expandable property type categories (Houses/Flats/Lands),
 * quick-tag chips, price selector, bedrooms, bathrooms, area inputs, amenity chips,
 * and buy/rent toggle. Sticky footer with "Clear all" + "Show N properties".
 * Origin: LuxuryPropertyListingV2 → MobileFilterSheet
 */

import { useState } from "react";
import { X, ChevronDown, Bed, Bath, Maximize, MapPin, Building2 } from "lucide-react";

/* ─── Types ─── */
export interface MobileFilterState {
  types: string[];
  quickTags: string[];
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  areaMin: string;
  areaMax: string;
  amenities: string[];
  listingMode: "sale" | "rent";
}

interface TypeCategory { label: string; subtypes: string[] }

export interface ListingMobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: MobileFilterState;
  onChange: (f: MobileFilterState) => void;
  resultsCount?: number;
  typeCategories?: TypeCategory[];
  quickTags?: string[];
  bedOptions?: string[];
  bathOptions?: string[];
  amenities?: string[];
}

/* ─── Defaults ─── */
const DEFAULT_CATEGORIES: TypeCategory[] = [
  { label: "Houses", subtypes: ["Villa", "Modern Villa", "Traditional Villa", "Luxury Villa", "Finca", "Townhouse", "Bungalow"] },
  { label: "Flats", subtypes: ["Apartment", "Penthouse", "Duplex Penthouse", "Sky Penthouse", "Ground Floor", "Duplex", "Studio", "Loft"] },
  { label: "Lands", subtypes: ["Urban Land", "Rustic Land", "Building Plot"] },
];
const DEFAULT_QUICK_TAGS = ["New Build", "Luxury", "Modern", "Sea Views", "1ª Línea Mar"];
const DEFAULT_BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const DEFAULT_BATHS = ["Any", "1+", "2+", "3+", "4+"];
const DEFAULT_AMENITIES = ["Sea Views", "Pool", "Garden", "Garage", "Terrace", "Smart Home", "Gym", "Wine Cellar"];

const EMPTY: MobileFilterState = { types: [], quickTags: [], priceMin: "", priceMax: "", beds: "Any", baths: "Any", areaMin: "", areaMax: "", amenities: [], listingMode: "sale" };

export default function ListingMobileFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  resultsCount = 0,
  typeCategories = DEFAULT_CATEGORIES,
  quickTags = DEFAULT_QUICK_TAGS,
  bedOptions = DEFAULT_BEDS,
  bathOptions = DEFAULT_BATHS,
  amenities = DEFAULT_AMENITIES,
}: ListingMobileFilterSheetProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  if (!open) return null;

  const toggleType = (t: string) => onChange({ ...filters, types: filters.types.includes(t) ? filters.types.filter(x => x !== t) : [...filters.types, t] });
  const toggleQuickTag = (t: string) => onChange({ ...filters, quickTags: filters.quickTags.includes(t) ? filters.quickTags.filter(x => x !== t) : [...filters.quickTags, t] });
  const toggleAmenity = (a: string) => onChange({ ...filters, amenities: filters.amenities.includes(a) ? filters.amenities.filter(x => x !== a) : [...filters.amenities, a] });

  return (
    <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200">
        <button onClick={onClose} className="text-neutral-900/70"><X className="w-5 h-5" /></button>
        <button onClick={() => onChange(EMPTY)} className="text-[14px] font-medium text-neutral-900">Clear filters</button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Property Type */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Building2 className="w-5 h-5 text-neutral-900/50" />
            <h3 className="text-[16px] font-medium text-neutral-900">Property Type</h3>
            {filters.types.length > 0 && <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{filters.types.length}</span>}
          </div>
          <div className="space-y-1">
            {typeCategories.map((cat) => {
              const isExpanded = expandedCat === cat.label;
              const selectedInCat = cat.subtypes.filter(s => filters.types.includes(s)).length;
              const allSelected = cat.subtypes.every(s => filters.types.includes(s));
              const toggleAll = () => {
                if (allSelected) onChange({ ...filters, types: filters.types.filter(t => !cat.subtypes.includes(t)) });
                else onChange({ ...filters, types: [...new Set([...filters.types, ...cat.subtypes])] });
              };
              return (
                <div key={cat.label}>
                  <div className="flex items-center gap-0 rounded-lg border border-neutral-200 overflow-hidden">
                    <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer flex-1">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-[18px] h-[18px] border-neutral-300 rounded accent-neutral-900" />
                      <span className="text-[15px] text-neutral-900/80 font-medium">{cat.label}</span>
                      {selectedInCat > 0 && !allSelected && <span className="bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{selectedInCat}</span>}
                    </label>
                    <button onClick={() => setExpandedCat(isExpanded ? null : cat.label)} className="px-4 py-3.5 text-neutral-900/30 hover:text-neutral-900/60 transition-colors">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
                      {cat.subtypes.map((sub) => (
                        <label key={sub} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 rounded-lg transition-colors">
                          <input type="checkbox" checked={filters.types.includes(sub)} onChange={() => toggleType(sub)} className="w-[18px] h-[18px] border-neutral-300 rounded accent-neutral-900" />
                          <span className="text-[14px] text-neutral-900/75">{sub}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Tags */}
        <div>
          <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/45 font-medium mb-3">Quick filters</p>
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag) => (
              <button key={tag} onClick={() => toggleQuickTag(tag)} className={`px-4 py-2 text-[13px] rounded-full border transition-all ${filters.quickTags.includes(tag) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/60"}`}>{tag}</button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-neutral-900/50 text-lg">€</span>
            <h3 className="text-[16px] font-medium text-neutral-900">Price</h3>
          </div>
          <div className="flex gap-3">
            <input type="text" value={filters.priceMin} onChange={(e) => onChange({ ...filters, priceMin: e.target.value })} placeholder="Min" className="flex-1 border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
            <input type="text" value={filters.priceMax} onChange={(e) => onChange({ ...filters, priceMax: e.target.value })} placeholder="Max" className="flex-1 border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Bed className="w-5 h-5 text-neutral-900/50" />
            <h3 className="text-[16px] font-medium text-neutral-900">Bedrooms</h3>
          </div>
          <div className="flex gap-2">
            {bedOptions.map((b) => (
              <button key={b} onClick={() => onChange({ ...filters, beds: b })} className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${filters.beds === b ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-900/60"}`}>{b}</button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Bath className="w-5 h-5 text-neutral-900/50" />
            <h3 className="text-[16px] font-medium text-neutral-900">Bathrooms</h3>
          </div>
          <div className="flex gap-2">
            {bathOptions.map((b) => (
              <button key={b} onClick={() => onChange({ ...filters, baths: b })} className={`flex-1 py-2.5 text-[14px] rounded-lg border transition-all ${filters.baths === b ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-900/60"}`}>{b}</button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Maximize className="w-5 h-5 text-neutral-900/50" />
            <h3 className="text-[16px] font-medium text-neutral-900">Living Area (m²)</h3>
          </div>
          <div className="flex gap-3">
            <input type="text" value={filters.areaMin} onChange={(e) => onChange({ ...filters, areaMin: e.target.value })} placeholder="Min" className="flex-1 border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
            <input type="text" value={filters.areaMax} onChange={(e) => onChange({ ...filters, areaMax: e.target.value })} placeholder="Max" className="flex-1 border border-neutral-200 rounded-lg px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-900/35 focus:outline-none focus:border-neutral-900/40" />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <MapPin className="w-5 h-5 text-neutral-900/50" />
            <h3 className="text-[16px] font-medium text-neutral-900">Amenities</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((a) => (
              <button key={a} onClick={() => toggleAmenity(a)} className={`px-4 py-2 text-[13px] rounded-full border transition-all ${filters.amenities.includes(a) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-900/60"}`}>{a}</button>
            ))}
          </div>
        </div>

        {/* Buy / Rent */}
        <div className="bg-neutral-50 rounded-xl p-5">
          <p className="text-[14px] font-medium text-neutral-900 mb-1">Are you looking to buy or rent?</p>
          <p className="text-[12px] text-neutral-900/45 mb-4">Select the type of listing you're interested in</p>
          <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
            <button onClick={() => onChange({ ...filters, listingMode: "sale" })} className={`flex-1 py-3 text-[14px] font-medium transition-all ${filters.listingMode === "sale" ? "bg-neutral-900 text-white" : "bg-white text-neutral-900/60"}`}>For Sale</button>
            <button onClick={() => onChange({ ...filters, listingMode: "rent" })} className={`flex-1 py-3 text-[14px] font-medium transition-all ${filters.listingMode === "rent" ? "bg-neutral-900 text-white" : "bg-white text-neutral-900/60"}`}>For Rent</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 px-4 py-3 flex items-center gap-3 bg-white">
        <button onClick={() => onChange(EMPTY)} className="px-4 py-3.5 text-[13px] text-neutral-900/50 font-medium">Clear all</button>
        <button onClick={onClose} className="flex-1 bg-neutral-900 text-white text-[14px] tracking-[0.08em] uppercase py-3.5 rounded-lg font-medium">Show {resultsCount} properties</button>
      </div>
    </div>
  );
}
