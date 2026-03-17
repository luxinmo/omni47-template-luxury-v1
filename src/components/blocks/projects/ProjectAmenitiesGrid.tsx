/**
 * PROJECT AMENITIES GRID
 * Full amenities icon grid with ALL options from the Omni47 catalog.
 * Every icon is Lucide SVG — fully scalable and colour-configurable.
 * Used by: BrandedAmenities, NewDevAmenities, NewDevCombo
 */

import {
  Waves, Dumbbell, UtensilsCrossed, Car, ShieldCheck, Wifi, Sparkles, Users,
  Home, TreePine, Columns3, Warehouse, DoorOpen, Fence, Gauge, Wind,
  Flame, Thermometer, Droplets, Lock, Eye, Mountain, Anchor, Ship, Sun,
  Building, Bath, AirVent, Snowflake, FireExtinguisher, Fuel, WashingMachine,
  Zap, DoorClosed, CookingPot, GlassWater, Grape, Theater, Baby,
  Blinds, CircleDot, PersonStanding, Coffee, BriefcaseBusiness,
  HeartPulse, Trees, LandPlot,
  // Better-matched icons
  Plane, BedDouble, Shirt, Beef, Landmark, Sailboat, ParkingCircle,
  Bell, BookOpen, Bike, Tv, Accessibility, Flower2, Leaf, Recycle,
  Plug, ShoppingCart, CreditCard, Compass, Footprints, Dog, Tent,
  Sunrise, Sunset, Package, ArrowUpDown, Cctv, Router, Bus,
  Martini, Armchair, Sofa, Wrench, MapPin, Store,
  Binoculars, Trophy, Music, Mic, Apple, PaintBucket,
  type LucideIcon,
} from "lucide-react";

export interface Amenity {
  icon?: LucideIcon;
  label?: string;
  category?: string;
}

interface ProjectAmenitiesGridProps {
  sectionLabel?: string;
  title?: string;
  amenities?: Amenity[];
  accentColor?: string;
  columns?: 2 | 3 | 4;
}

const ALL_AMENITIES: Amenity[] = [
  // ── Kitchen & Interior ──────────────────────────────
  { icon: Home, label: "Furnished", category: "Interior" },
  { icon: UtensilsCrossed, label: "Kitchen", category: "Interior" },
  { icon: CookingPot, label: "Open Kitchen", category: "Interior" },
  { icon: DoorOpen, label: "Interconnected Garden", category: "Interior" },
  { icon: Columns3, label: "Inner Courtyard", category: "Interior" },
  { icon: ParkingCircle, label: "Parking Private", category: "Interior" },
  { icon: Gauge, label: "Storage", category: "Interior" },
  { icon: Warehouse, label: "Basement", category: "Interior" },
  { icon: WashingMachine, label: "Laundry", category: "Interior" },
  { icon: Shirt, label: "Dressing Room", category: "Interior" },
  { icon: Package, label: "Pantry", category: "Interior" },
  { icon: Sofa, label: "Open Plan Living", category: "Interior" },
  { icon: Armchair, label: "Walk-in Closet", category: "Interior" },
  { icon: Bath, label: "En-suite Bathroom", category: "Interior" },
  { icon: DoorClosed, label: "Guest Toilet", category: "Interior" },
  { icon: PaintBucket, label: "Marble Floors", category: "Interior" },
  { icon: LandPlot, label: "Parquet Floors", category: "Interior" },
  { icon: ArrowUpDown, label: "Double Height Ceiling", category: "Interior" },
  { icon: Wrench, label: "Utility Room", category: "Interior" },
  { icon: BedDouble, label: "Staff Quarters", category: "Interior" },

  // ── Outdoor & Garden ────────────────────────────────
  { icon: TreePine, label: "Garden Private", category: "Outdoor" },
  { icon: Trees, label: "Garden Community", category: "Outdoor" },
  { icon: BedDouble, label: "Guest House", category: "Outdoor" },
  { icon: Fence, label: "Terrace", category: "Outdoor" },
  { icon: Columns3, label: "Balcony", category: "Outdoor" },
  { icon: Sun, label: "Solarium", category: "Outdoor" },
  { icon: Grape, label: "Wine Cellar", category: "Outdoor" },
  { icon: Flame, label: "Fireplace", category: "Outdoor" },
  { icon: Trophy, label: "Tennis Court", category: "Outdoor" },
  { icon: Beef, label: "Barbecue", category: "Outdoor" },
  { icon: Theater, label: "Home Cinema", category: "Outdoor" },
  { icon: Tent, label: "Pergola", category: "Outdoor" },
  { icon: Droplets, label: "Outdoor Shower", category: "Outdoor" },
  { icon: CookingPot, label: "Summer Kitchen", category: "Outdoor" },
  { icon: Sunrise, label: "Rooftop Terrace", category: "Outdoor" },
  { icon: Flower2, label: "Landscaped Gardens", category: "Outdoor" },
  { icon: Leaf, label: "Organic Garden", category: "Outdoor" },
  { icon: Droplets, label: "Garden Irrigation", category: "Outdoor" },

  // ── Climate & Energy ────────────────────────────────
  { icon: Snowflake, label: "Air Conditioning", category: "Climate" },
  { icon: AirVent, label: "Air Central", category: "Climate" },
  { icon: Wind, label: "Air Split", category: "Climate" },
  { icon: FireExtinguisher, label: "Fire Extinguishers", category: "Climate" },
  { icon: Fuel, label: "City Gas", category: "Climate" },
  { icon: Thermometer, label: "Heating", category: "Climate" },
  { icon: Thermometer, label: "Central Heating", category: "Climate" },
  { icon: Thermometer, label: "Gas Heating", category: "Climate" },
  { icon: Thermometer, label: "Oil Heating", category: "Climate" },
  { icon: Thermometer, label: "Floor Heating", category: "Climate" },
  { icon: Thermometer, label: "Floor Heating Bathroom", category: "Climate" },
  { icon: Zap, label: "Solar Panels", category: "Climate" },
  { icon: Zap, label: "Multifuel", category: "Climate" },
  { icon: Plug, label: "Electric Car Charging", category: "Climate" },
  { icon: Recycle, label: "Recycling System", category: "Climate" },
  { icon: Droplets, label: "Water Treatment", category: "Climate" },
  { icon: Snowflake, label: "Underfloor Cooling", category: "Climate" },

  // ── Wellness & Pool ─────────────────────────────────
  { icon: Waves, label: "Heated Pool", category: "Wellness" },
  { icon: Waves, label: "Indoor Pool", category: "Wellness" },
  { icon: Waves, label: "Infinity Pool", category: "Wellness" },
  { icon: Waves, label: "Plunge Pool", category: "Wellness" },
  { icon: GlassWater, label: "Jacuzzi", category: "Wellness" },
  { icon: Sparkles, label: "Sauna", category: "Wellness" },
  { icon: Bath, label: "Turkish Bath", category: "Wellness" },
  { icon: HeartPulse, label: "Hydro-Massage", category: "Wellness" },
  { icon: Dumbbell, label: "Gym", category: "Wellness" },
  { icon: Sparkles, label: "Spa & Treatments", category: "Wellness" },
  { icon: HeartPulse, label: "Yoga Studio", category: "Wellness" },
  { icon: Leaf, label: "Meditation Room", category: "Wellness" },

  // ── Security & Access ───────────────────────────────
  { icon: Lock, label: "Alarm", category: "Security" },
  { icon: ShieldCheck, label: "Security Villa", category: "Security" },
  { icon: Blinds, label: "Sliding Door", category: "Security" },
  { icon: Blinds, label: "Electric Blinds", category: "Security" },
  { icon: CircleDot, label: "Double Glazing", category: "Security" },
  { icon: PersonStanding, label: "Doorman", category: "Security" },
  { icon: Fence, label: "Gated Complex", category: "Security" },
  { icon: ArrowUpDown, label: "Lift", category: "Security" },
  { icon: Wifi, label: "Smart Home System", category: "Security" },
  { icon: Cctv, label: "CCTV Surveillance", category: "Security" },
  { icon: Bell, label: "Intercom", category: "Security" },
  { icon: Accessibility, label: "Wheelchair Access", category: "Security" },
  { icon: Dog, label: "Pets Allowed", category: "Security" },

  // ── Community Services ──────────────────────────────
  { icon: ShieldCheck, label: "Service Estate 24h", category: "Community" },
  { icon: Dumbbell, label: "Gym Community", category: "Community" },
  { icon: Trophy, label: "Paddle Community", category: "Community" },
  { icon: Trophy, label: "Tennis Community", category: "Community" },
  { icon: Coffee, label: "Restaurant", category: "Community" },
  { icon: Users, label: "Social Room", category: "Community" },
  { icon: BriefcaseBusiness, label: "Coworking", category: "Community" },
  { icon: Baby, label: "Children's Hall", category: "Community" },
  { icon: Baby, label: "Children's Club", category: "Community" },
  { icon: ArrowUpDown, label: "Lift Community", category: "Community" },
  { icon: Car, label: "Automobile Hall", category: "Community" },
  { icon: Waves, label: "Heated Pool Community", category: "Community" },
  { icon: Waves, label: "Indoor Pool Community", category: "Community" },
  { icon: GlassWater, label: "Jacuzzi Community", category: "Community" },
  { icon: Sparkles, label: "Sauna Community", category: "Community" },
  { icon: Baby, label: "Children Pool", category: "Community" },
  { icon: Waves, label: "Private Beach Club", category: "Community" },
  { icon: UtensilsCrossed, label: "Fine Dining Restaurants", category: "Community" },
  { icon: ParkingCircle, label: "Valet Parking", category: "Community" },
  { icon: ShieldCheck, label: "24h Security", category: "Community" },
  { icon: Bell, label: "Concierge", category: "Community" },
  { icon: BookOpen, label: "Library", category: "Community" },
  { icon: Bike, label: "Bike Storage", category: "Community" },
  { icon: Martini, label: "Bar & Lounge", category: "Community" },
  { icon: Music, label: "Entertainment Room", category: "Community" },
  { icon: Footprints, label: "Running Track", category: "Community" },
  { icon: Baby, label: "Kids Playground", category: "Community" },
  { icon: LandPlot, label: "Mini Golf", category: "Community" },
  { icon: Bus, label: "Shuttle Service", category: "Community" },
  { icon: Mic, label: "Events Hall", category: "Community" },
  { icon: Shirt, label: "Laundry Service", category: "Community" },
  { icon: Bell, label: "Room Service", category: "Community" },
  { icon: Compass, label: "Tour Desk", category: "Community" },

  // ── Location & Views ────────────────────────────────
  { icon: Waves, label: "First Line Beach", category: "Location" },
  { icon: Waves, label: "Second Line Beach", category: "Location" },
  { icon: Anchor, label: "Close Port", category: "Location" },
  { icon: LandPlot, label: "Front Line Golf", category: "Location" },
  { icon: Landmark, label: "Center City", category: "Location" },
  { icon: Droplets, label: "Close River", category: "Location" },
  { icon: Sailboat, label: "Close Sea", category: "Location" },
  { icon: Waves, label: "Close Surf", category: "Location" },
  { icon: Plane, label: "Close Airport", category: "Location" },
  { icon: Eye, label: "Sea View", category: "Location" },
  { icon: Mountain, label: "Mountain View", category: "Location" },
  { icon: LandPlot, label: "Golf View", category: "Location" },
  { icon: Landmark, label: "City View", category: "Location" },
  { icon: TreePine, label: "Countryside View", category: "Location" },
  { icon: Sunset, label: "Sunset Views", category: "Location" },
  { icon: Sunrise, label: "Sunrise Views", category: "Location" },
  { icon: Binoculars, label: "Panoramic Views", category: "Location" },
  { icon: Ship, label: "Marina", category: "Location" },
  { icon: Sailboat, label: "Water Sports", category: "Location" },
  { icon: Anchor, label: "Private Dock", category: "Location" },
  { icon: MapPin, label: "Close to Schools", category: "Location" },
  { icon: Store, label: "Close to Shops", category: "Location" },
  { icon: ShoppingCart, label: "Supermarket Nearby", category: "Location" },
  { icon: CreditCard, label: "ATM Nearby", category: "Location" },
  { icon: Apple, label: "Local Market", category: "Location" },
  { icon: Tv, label: "Satellite TV", category: "Location" },
  { icon: Router, label: "Fibre Internet", category: "Location" },
];

export default function ProjectAmenitiesGrid({
  sectionLabel = "Lifestyle",
  title = "Amenities & Facilities",
  amenities = ALL_AMENITIES,
  accentColor = "#8b6f47",
  columns = 4,
}: ProjectAmenitiesGridProps) {
  const colsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div>
      <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
      <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>{title}</h2>
      <div className={`grid ${colsClass} gap-4`}>
        {amenities.map((a, i) => {
          const Icon = a.icon || Sparkles;
          return (
            <div key={i} className="flex flex-col items-center text-center p-5 rounded-sm bg-[#f8f6f3]">
              <Icon className="w-6 h-6 mb-3" style={{ color: accentColor }} strokeWidth={1.5} />
              <span className="text-[13px] font-light text-[#2C2825]">{a.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ALL_AMENITIES };
