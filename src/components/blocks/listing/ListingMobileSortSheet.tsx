/**
 * LISTING MOBILE SORT SHEET
 * Bottom action sheet with sort options. Backdrop blur overlay + slide-up animation.
 * Origin: LuxuryPropertyListingV2 → MobileSortSheet
 */

export interface SortOption { value: string; label: string }

export interface ListingMobileSortSheetProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (value: string) => void;
  options?: SortOption[];
}

const DEFAULT_OPTIONS: SortOption[] = [
  { value: "premium", label: "Premium" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "beds-desc", label: "Most Bedrooms" },
  { value: "area-desc", label: "Largest Area" },
];

export default function ListingMobileSortSheet({
  open,
  onClose,
  selected,
  onSelect,
  options = DEFAULT_OPTIONS,
}: ListingMobileSortSheetProps) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="bg-white rounded-t-2xl shadow-2xl max-h-[70vh] flex flex-col">
          <div className="text-center py-4 border-b border-neutral-100">
            <div className="w-10 h-1 rounded-full bg-neutral-300 mx-auto mb-3" />
            <p className="text-[14px] text-neutral-900/50 font-light">Sort by</p>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onSelect(opt.value); onClose(); }}
                className={`w-full text-left px-6 py-4 text-[16px] transition-colors ${selected === opt.value ? "text-neutral-900 font-medium bg-neutral-50" : "text-neutral-900/70 font-light"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="border-t border-neutral-100 p-4">
            <button onClick={onClose} className="w-full py-3.5 text-[15px] font-medium text-neutral-900 border border-neutral-200 rounded-xl">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
