/**
 * LISTING MOBILE SEARCH BAR
 * Sticky compact bar for mobile: location selector button, sort button, filter button with badge.
 * Shows results count below. Designed to sit below the navbar (top-[64px]).
 * Origin: LuxuryPropertyListingV2 → mobile sticky search bar
 */

import { MapPin, ArrowUpDown, SlidersHorizontal } from "lucide-react";

export interface ListingMobileSearchBarProps {
  /** Selected location names */
  locationNames?: string[];
  /** Callback to open location popup */
  onOpenLocation?: () => void;
  /** Callback to open sort sheet */
  onOpenSort?: () => void;
  /** Callback to open filter sheet */
  onOpenFilters?: () => void;
  /** Active filter count (badge) */
  activeFilterCount?: number;
  /** Results count */
  resultsCount?: number;
  /** Placeholder text */
  placeholder?: string;
}

export default function ListingMobileSearchBar({
  locationNames = [],
  onOpenLocation,
  onOpenSort,
  onOpenFilters,
  activeFilterCount = 0,
  resultsCount = 0,
  placeholder = "Where? City, region...",
}: ListingMobileSearchBarProps) {
  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-neutral-200 px-3 py-2.5">
      {/* Search row */}
      <div className="flex items-center gap-2">
        <button onClick={onOpenLocation} className="flex-1 flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2.5 text-left">
          <MapPin className="w-4 h-4 text-neutral-900/40 shrink-0" strokeWidth={1.5} />
          {locationNames.length > 0 ? (
            <span className="text-[14px] text-neutral-900 truncate">{locationNames.join(", ")}</span>
          ) : (
            <span className="text-[14px] text-neutral-900/40">{placeholder}</span>
          )}
          {locationNames.length > 0 && (
            <span className="ml-auto bg-neutral-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold">{locationNames.length}</span>
          )}
        </button>
        <button onClick={onOpenSort} className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-900/60 hover:bg-neutral-50 transition-colors shrink-0">
          <ArrowUpDown className="w-4 h-4" />
        </button>
        <button onClick={onOpenFilters} className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-900/60 hover:bg-neutral-50 transition-colors shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>
          )}
        </button>
      </div>
      {/* Results count */}
      <p className="text-[13px] text-neutral-900/50 font-light text-center mt-2">{resultsCount} properties</p>
    </div>
  );
}
