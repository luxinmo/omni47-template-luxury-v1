/**
 * DETAIL AMENITIES FULL
 * Comprehensive amenities & facilities block with ALL options organised by category.
 * Every icon is a Lucide SVG — fully scalable and colour-configurable via props.
 * Origin: Omni47 Catalog (Features)
 */

import { useState } from "react";
import {
  Home, TreePine, Columns3, Warehouse, UtensilsCrossed, DoorOpen, Car, Trees,
  Fence, Gauge, Wifi, ShieldCheck, Waves, Dumbbell, Sparkles, Users, Wind,
  Flame, Thermometer, Droplets, Lock, Eye, Mountain, Anchor, Ship, Sun,
  Building, Bath, AirVent, Snowflake, FireExtinguisher, Fuel, WashingMachine,
  Zap, DoorClosed, CookingPot, GlassWater, Grape, Theater, Baby,
  Blinds, CircleDot, PersonStanding, Coffee, BriefcaseBusiness,
  HeartPulse, ChevronDown, ChevronUp,
  // Better-matched icons
  Plane, BedDouble, Shirt, Beef, Landmark, Sailboat, ParkingCircle,
  Bell, BookOpen, Bike, Tv, Accessibility, Flower2, Leaf, Recycle,
  Plug, ShoppingCart, CreditCard, Compass, Footprints, Dog, Tent,
  Sunrise, Sunset, Package, ArrowUpDown, Cctv, Router, Bus,
  Martini, Armchair, Sofa, Wrench, MapPin, Store, LandPlot,
  Binoculars, Trophy, Music, Mic, Apple, PaintBucket,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Amenity item ────────────────────────────────────────────── */
export interface AmenityItem {
  icon: LucideIcon;
  label: string;
}

export interface AmenityCategory {
  title: string;
  highlight?: boolean;
  items: AmenityItem[];
}

/* ─── Default full catalog (from Omni47 Features) ─────────────── */
const DEFAULT_CATEGORIES: AmenityCategory[] = [
  {
    title: "Kitchen & Interior",
    items: [
      { icon: Home, label: "Furnished" },
      { icon: UtensilsCrossed, label: "Kitchen" },
      { icon: CookingPot, label: "Open Kitchen" },
      { icon: DoorOpen, label: "Interconnected Garden" },
      { icon: Columns3, label: "Inner Courtyard" },
      { icon: ParkingCircle, label: "Parking Private" },
      { icon: Gauge, label: "Storage" },
      { icon: Warehouse, label: "Basement" },
      { icon: WashingMachine, label: "Laundry" },
      { icon: Shirt, label: "Dressing Room" },
      { icon: Package, label: "Pantry" },
      { icon: Sofa, label: "Open Plan Living" },
      { icon: Armchair, label: "Walk-in Closet" },
      { icon: Bath, label: "En-suite Bathroom" },
      { icon: DoorClosed, label: "Guest Toilet" },
      { icon: PaintBucket, label: "Marble Floors" },
      { icon: LandPlot, label: "Parquet Floors" },
      { icon: ArrowUpDown, label: "Double Height Ceiling" },
      { icon: Wrench, label: "Utility Room" },
      { icon: BedDouble, label: "Staff Quarters" },
    ],
  },
  {
    title: "Outdoor & Garden",
    highlight: true,
    items: [
      { icon: TreePine, label: "Garden Private" },
      { icon: Trees, label: "Garden Community" },
      { icon: BedDouble, label: "Guest House" },
      { icon: Fence, label: "Terrace" },
      { icon: Columns3, label: "Balcony" },
      { icon: Sun, label: "Solarium" },
      { icon: Grape, label: "Wine Cellar" },
      { icon: Flame, label: "Fireplace" },
      { icon: Trophy, label: "Tennis Court" },
      { icon: Beef, label: "Barbecue" },
      { icon: Theater, label: "Home Cinema" },
      { icon: Tent, label: "Pergola" },
      { icon: Droplets, label: "Outdoor Shower" },
      { icon: CookingPot, label: "Summer Kitchen" },
      { icon: Sunrise, label: "Rooftop Terrace" },
      { icon: Flower2, label: "Landscaped Gardens" },
      { icon: Leaf, label: "Organic Garden" },
      { icon: Droplets, label: "Garden Irrigation" },
    ],
  },
  {
    title: "Climate & Energy",
    highlight: true,
    items: [
      { icon: Snowflake, label: "Air Conditioning" },
      { icon: AirVent, label: "Air Central" },
      { icon: Wind, label: "Air Split" },
      { icon: FireExtinguisher, label: "Fire Extinguishers" },
      { icon: Fuel, label: "City Gas" },
      { icon: Thermometer, label: "Heating" },
      { icon: Thermometer, label: "Central Heating" },
      { icon: Thermometer, label: "Gas Heating" },
      { icon: Thermometer, label: "Oil Heating" },
      { icon: Thermometer, label: "Floor Heating" },
      { icon: Thermometer, label: "Floor Heating Bathroom" },
      { icon: Zap, label: "Solar Panels" },
      { icon: Zap, label: "Multifuel" },
      { icon: Plug, label: "Electric Car Charging" },
      { icon: Recycle, label: "Recycling System" },
      { icon: Droplets, label: "Water Treatment" },
      { icon: Snowflake, label: "Underfloor Cooling" },
    ],
  },
  {
    title: "Wellness & Pool",
    highlight: true,
    items: [
      { icon: Waves, label: "Heated Pool" },
      { icon: Waves, label: "Indoor Pool" },
      { icon: Waves, label: "Infinity Pool" },
      { icon: Waves, label: "Plunge Pool" },
      { icon: GlassWater, label: "Jacuzzi" },
      { icon: Sparkles, label: "Sauna" },
      { icon: Bath, label: "Turkish Bath" },
      { icon: HeartPulse, label: "Hydro-Massage" },
      { icon: Dumbbell, label: "Gym" },
      { icon: Sparkles, label: "Spa & Treatments" },
      { icon: HeartPulse, label: "Yoga Studio" },
      { icon: Leaf, label: "Meditation Room" },
    ],
  },
  {
    title: "Security & Access",
    items: [
      { icon: Lock, label: "Alarm" },
      { icon: ShieldCheck, label: "Security Villa" },
      { icon: Blinds, label: "Sliding Door" },
      { icon: Blinds, label: "Electric Blinds" },
      { icon: CircleDot, label: "Double Glazing" },
      { icon: PersonStanding, label: "Doorman" },
      { icon: Fence, label: "Gated Complex" },
      { icon: ArrowUpDown, label: "Lift" },
      { icon: Wifi, label: "Smart Home" },
      { icon: Cctv, label: "CCTV Surveillance" },
      { icon: Bell, label: "Intercom" },
      { icon: Accessibility, label: "Wheelchair Access" },
      { icon: Dog, label: "Pets Allowed" },
    ],
  },
  {
    title: "Community Services",
    highlight: true,
    items: [
      { icon: ShieldCheck, label: "Service Estate 24h" },
      { icon: Dumbbell, label: "Gym Community" },
      { icon: Trophy, label: "Paddle Community" },
      { icon: Trophy, label: "Tennis Community" },
      { icon: Coffee, label: "Restaurant" },
      { icon: Users, label: "Social Room" },
      { icon: BriefcaseBusiness, label: "Coworking" },
      { icon: Baby, label: "Children's Hall" },
      { icon: Baby, label: "Children's Club" },
      { icon: ArrowUpDown, label: "Lift Community" },
      { icon: Car, label: "Automobile Hall" },
      { icon: Waves, label: "Heated Pool Community" },
      { icon: Waves, label: "Indoor Pool Community" },
      { icon: GlassWater, label: "Jacuzzi Community" },
      { icon: Sparkles, label: "Sauna Community" },
      { icon: Baby, label: "Children Pool" },
      { icon: Waves, label: "Private Beach Club" },
      { icon: UtensilsCrossed, label: "Fine Dining Restaurants" },
      { icon: ParkingCircle, label: "Valet Parking" },
      { icon: ShieldCheck, label: "24h Security" },
      { icon: Bell, label: "Concierge" },
      { icon: BookOpen, label: "Library" },
      { icon: Bike, label: "Bike Storage" },
      { icon: Martini, label: "Bar & Lounge" },
      { icon: Music, label: "Entertainment Room" },
      { icon: Footprints, label: "Running Track" },
      { icon: Baby, label: "Kids Playground" },
      { icon: LandPlot, label: "Mini Golf" },
      { icon: Bus, label: "Shuttle Service" },
      { icon: Mic, label: "Events Hall" },
      { icon: Shirt, label: "Laundry Service" },
      { icon: Bell, label: "Room Service" },
      { icon: Compass, label: "Tour Desk" },
    ],
  },
  {
    title: "Location & Views",
    highlight: true,
    items: [
      { icon: Waves, label: "First Line Beach" },
      { icon: Waves, label: "Second Line Beach" },
      { icon: Anchor, label: "Close Port" },
      { icon: LandPlot, label: "Front Line Golf" },
      { icon: Landmark, label: "Center City" },
      { icon: Droplets, label: "Close River" },
      { icon: Sailboat, label: "Close Sea" },
      { icon: Waves, label: "Close Surf" },
      { icon: Plane, label: "Close Airport" },
      { icon: Eye, label: "Sea View" },
      { icon: Mountain, label: "Mountain View" },
      { icon: LandPlot, label: "Golf View" },
      { icon: Landmark, label: "City View" },
      { icon: TreePine, label: "Countryside View" },
      { icon: Sunset, label: "Sunset Views" },
      { icon: Sunrise, label: "Sunrise Views" },
      { icon: Binoculars, label: "Panoramic Views" },
      { icon: Ship, label: "Marina" },
      { icon: Sailboat, label: "Water Sports" },
      { icon: Anchor, label: "Private Dock" },
      { icon: MapPin, label: "Close to Schools" },
      { icon: Store, label: "Close to Shops" },
      { icon: ShoppingCart, label: "Supermarket Nearby" },
      { icon: CreditCard, label: "ATM Nearby" },
      { icon: Apple, label: "Local Market" },
      { icon: Tv, label: "Satellite TV" },
      { icon: Router, label: "Fibre Internet" },
    ],
  },
];

/* ─── Props ───────────────────────────────────────────────────── */
interface DetailAmenitiesFullProps {
  sectionLabel?: string;
  title?: string;
  categories?: AmenityCategory[];
  accentColor?: string;
  iconSize?: number;
  columns?: 2 | 3 | 4;
  collapsible?: boolean;
}

/* ─── Component ───────────────────────────────────────────────── */
const DetailAmenitiesFull = ({
  sectionLabel = "Features",
  title = "Amenities & Facilities",
  categories = DEFAULT_CATEGORIES,
  accentColor = "#8b6f47",
  iconSize = 20,
  columns = 4,
  collapsible = true,
}: DetailAmenitiesFullProps) => {
  const [openCats, setOpenCats] = useState<Set<number>>(() => new Set(categories.map((_, i) => i)));

  const toggle = (idx: number) => {
    if (!collapsible) return;
    setOpenCats((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const colsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3 font-normal"
          style={{ color: accentColor }}
        >
          {sectionLabel}
        </p>
        <h2
          className="text-2xl sm:text-3xl font-extralight mb-10"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}
        >
          {title}
        </h2>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((cat, catIdx) => {
            const isOpen = openCats.has(catIdx);
            return (
              <div
                key={catIdx}
                className={cn(
                  "border rounded-sm overflow-hidden",
                  cat.highlight ? "border-neutral-200" : "border-neutral-100"
                )}
              >
                {/* Category header */}
                <button
                  onClick={() => toggle(catIdx)}
                  className={cn(
                    "w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors",
                    cat.highlight ? "bg-neutral-50" : "bg-white hover:bg-neutral-50"
                  )}
                >
                  <span
                    className="text-[13px] font-medium tracking-[0.1em] uppercase"
                    style={{ color: cat.highlight ? accentColor : "#2C2825" }}
                  >
                    {cat.title}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400 font-light">
                      {cat.items.length}
                    </span>
                    {collapsible &&
                      (isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      ))}
                  </span>
                </button>

                {/* Items grid */}
                {isOpen && (
                  <div className={cn("grid gap-3 p-5 pt-2", colsClass)}>
                    {cat.items.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-2 px-3 rounded-sm bg-[#faf9f7] hover:bg-[#f3f1ed] transition-colors"
                        >
                          <Icon
                            className="shrink-0"
                            style={{ color: accentColor, width: iconSize, height: iconSize }}
                            strokeWidth={1.5}
                          />
                          <span className="text-[13px] font-light text-[#2C2825]">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailAmenitiesFull;
