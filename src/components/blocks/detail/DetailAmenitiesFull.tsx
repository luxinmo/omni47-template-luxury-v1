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
  Building, Bed, Bath, Maximize, LandPlot, Ruler, ChevronDown, ChevronUp,
  AirVent, Snowflake, FireExtinguisher, Fuel, WashingMachine, Zap,
  DoorClosed, CookingPot, GlassWater, Grape, Theater, Gamepad2, Baby,
  ParkingCircle, Blinds, SlidersHorizontal, CircleDot, LayoutGrid,
  PersonStanding, Coffee, BriefcaseBusiness, Umbrella, HeartPulse,
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
      { icon: UtensilsCrossed, label: "Kitchen" },
      { icon: CookingPot, label: "Open Kitchen" },
      { icon: DoorOpen, label: "Interconnected Garden" },
      { icon: Columns3, label: "Inner Courtyard" },
      { icon: Home, label: "Furnished" },
      { icon: LayoutGrid, label: "Parking Private" },
      { icon: Gauge, label: "Storage" },
      { icon: Warehouse, label: "Basement" },
    ],
  },
  {
    title: "Outdoor & Garden",
    highlight: true,
    items: [
      { icon: TreePine, label: "Garden Private" },
      { icon: Trees, label: "Garden Community" },
      { icon: Home, label: "Guest House" },
      { icon: WashingMachine, label: "Laundry" },
      { icon: Grape, label: "Wine Cellar" },
      { icon: Flame, label: "Fireplace" },
      { icon: Sun, label: "Solarium" },
      { icon: Fence, label: "Terrace" },
      { icon: Columns3, label: "Balcony" },
      { icon: Gamepad2, label: "Tennis Court" },
      { icon: Flame, label: "Barbecue" },
      { icon: DoorClosed, label: "Dressing Room" },
      { icon: Theater, label: "Home Cinema" },
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
    ],
  },
  {
    title: "Wellness & Pool",
    highlight: true,
    items: [
      { icon: Waves, label: "Heated Pool" },
      { icon: Waves, label: "Indoor Pool" },
      { icon: GlassWater, label: "Jacuzzi" },
      { icon: Sparkles, label: "Sauna" },
      { icon: Bath, label: "Bathroom" },
      { icon: HeartPulse, label: "Hydro-Massage" },
      { icon: Dumbbell, label: "Gym" },
    ],
  },
  {
    title: "Security & Access",
    items: [
      { icon: Lock, label: "Alarm" },
      { icon: ShieldCheck, label: "Security Villa" },
      { icon: SlidersHorizontal, label: "Sliding Door" },
      { icon: Blinds, label: "Electric Blinds" },
      { icon: CircleDot, label: "Double Glazing" },
      { icon: PersonStanding, label: "Doorman" },
      { icon: Fence, label: "Gated Complex" },
      { icon: DoorOpen, label: "Lift" },
      { icon: Wifi, label: "Smart Home" },
    ],
  },
  {
    title: "Community Services",
    highlight: true,
    items: [
      { icon: ShieldCheck, label: "Service Estate 24h" },
      { icon: Dumbbell, label: "Gym Community" },
      { icon: Gamepad2, label: "Paddle Community" },
      { icon: Gamepad2, label: "Tennis Community" },
      { icon: Coffee, label: "Restaurant" },
      { icon: Users, label: "Social Room" },
      { icon: BriefcaseBusiness, label: "Coworking" },
      { icon: Baby, label: "Children's Hall" },
      { icon: DoorOpen, label: "Lift Community" },
      { icon: Car, label: "Automobile Hall" },
      { icon: Waves, label: "Heated Pool Community" },
      { icon: Waves, label: "Indoor Pool Community" },
      { icon: GlassWater, label: "Jacuzzi Community" },
      { icon: Sparkles, label: "Sauna Community" },
      { icon: Baby, label: "Children Pool" },
      { icon: Umbrella, label: "First Line Beach" },
      { icon: Umbrella, label: "Second Line Beach" },
    ],
  },
  {
    title: "Location & Views",
    highlight: true,
    items: [
      { icon: Anchor, label: "Close Port" },
      { icon: LandPlot, label: "Front Line Golf" },
      { icon: Building, label: "Center City" },
      { icon: Droplets, label: "Close River" },
      { icon: Ship, label: "Close Sea" },
      { icon: Waves, label: "Close Surf" },
      { icon: Building, label: "Close Airport" },
      { icon: Eye, label: "Sea View" },
      { icon: Mountain, label: "Mountain View" },
      { icon: LandPlot, label: "Golf View" },
      { icon: Building, label: "City View" },
      { icon: TreePine, label: "Countryside View" },
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
