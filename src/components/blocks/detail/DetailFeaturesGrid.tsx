/**
 * DETAIL FEATURES GRID
 * Simple checklist grid of property amenities / features.
 * Origin: PropertyDetail V6
 */

import { Check } from "lucide-react";

interface DetailFeaturesGridProps {
  title?: string;
  features?: string[];
  columns?: 2 | 3;
}

const defaultFeatures = [
  "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
  "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
  "Air Conditioning", "Alarm System", "Double Garage", "Garden",
  "Terrace", "Staff Quarters", "Elevator", "Laundry Room",
];

const DetailFeaturesGrid = ({
  title = "Features & Amenities",
  features = defaultFeatures,
  columns = 3,
}: DetailFeaturesGridProps) => (
  <section className="border-t border-neutral-200 pt-8">
    <h2 className="text-[18px] font-medium text-neutral-900 mb-5">{title}</h2>
    <div className={`grid gap-x-4 gap-y-3 ${columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-[14px] text-neutral-700 font-light">
          <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" strokeWidth={2} />
          {f}
        </div>
      ))}
    </div>
  </section>
);

export default DetailFeaturesGrid;
