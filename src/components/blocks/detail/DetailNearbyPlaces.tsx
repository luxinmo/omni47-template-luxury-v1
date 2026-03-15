/**
 * DETAIL NEARBY PLACES
 * Categorized nearby points of interest.
 * Origin: PropertyDetail V2–V5 (LuxuryNearbyPlaces)
 */

import { getIcon } from "@/components/blocks/_utils/get-icon";

interface Place {
  name: string;
  distance: string;
  travelTime?: string;
  travelMode?: "walk" | "drive";
}

interface Category {
  iconName: string;
  label: string;
  places: Place[];
}

interface DetailNearbyPlacesProps {
  title?: string;
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { iconName: "Palmtree", label: "Beaches", places: [
    { name: "Cala Llenya", distance: "1.2 km", travelTime: "15 min", travelMode: "walk" },
    { name: "Es Canar Beach", distance: "2.8 km", travelTime: "35 min", travelMode: "walk" },
  ]},
  { iconName: "GraduationCap", label: "Education", places: [
    { name: "Santa Eulalia International School", distance: "1.8 km", travelTime: "4 min", travelMode: "drive" },
  ]},
  { iconName: "Heart", label: "Health", places: [
    { name: "Santa Eulalia Medical Centre", distance: "2.1 km", travelTime: "5 min", travelMode: "drive" },
  ]},
  { iconName: "ShoppingBag", label: "Shopping", places: [
    { name: "Santa Eulalia Town Centre", distance: "2.0 km", travelTime: "4 min", travelMode: "drive" },
  ]},
  { iconName: "Bus", label: "Transport", places: [
    { name: "Ibiza Airport (IBZ)", distance: "20 km", travelTime: "25 min", travelMode: "drive" },
  ]},
  { iconName: "UtensilsCrossed", label: "Restaurants", places: [
    { name: "Es Terral", distance: "1.5 km", travelTime: "18 min", travelMode: "walk" },
    { name: "Amante Beach Club", distance: "5.2 km", travelTime: "10 min", travelMode: "drive" },
  ]},
];

const DetailNearbyPlaces = ({
  title = "What's Nearby",
  categories = defaultCategories,
}: DetailNearbyPlacesProps) => (
  <section className="border-t border-neutral-200 pt-6">
    <p className="text-[12px] tracking-[0.25em] uppercase text-neutral-500 font-light mb-5">{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {categories.map((cat, ci) => {
        const Icon = getIcon(cat.iconName);
        return (
          <div key={ci}>
            <div className="flex items-center gap-1.5 mb-3">
              <Icon className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
              <h3 className="text-[13px] font-medium tracking-[0.12em] uppercase text-neutral-600">{cat.label}</h3>
            </div>
            <div className="space-y-2">
              {cat.places.map((place, pi) => (
                <div key={pi} className="flex items-center justify-between text-[14px]">
                  <span className="text-neutral-700 font-light">{place.name}</span>
                  <div className="flex items-center gap-2 text-neutral-500 text-[13px] font-light">
                    <span>{place.distance}</span>
                    {place.travelTime && (
                      <>
                        <span className="text-neutral-300">·</span>
                        <span>{place.travelMode === "walk" ? "🚶" : "🚗"} {place.travelTime}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default DetailNearbyPlaces;
