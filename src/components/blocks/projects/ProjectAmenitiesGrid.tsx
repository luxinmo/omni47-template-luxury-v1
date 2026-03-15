import { Waves, Dumbbell, UtensilsCrossed, Car, ShieldCheck, Wifi, Sparkles, Users, LucideIcon } from "lucide-react";

interface Amenity {
  icon?: LucideIcon;
  label?: string;
}

interface ProjectAmenitiesGridProps {
  sectionLabel?: string;
  title?: string;
  amenities?: Amenity[];
  accentColor?: string;
}

export default function ProjectAmenitiesGrid({
  sectionLabel = "Lifestyle",
  title = "Amenities & Facilities",
  amenities = [
    { icon: Waves, label: "Private beach club" },
    { icon: Dumbbell, label: "Fitness & wellness centre" },
    { icon: UtensilsCrossed, label: "Fine dining restaurants" },
    { icon: Car, label: "Valet parking" },
    { icon: Wifi, label: "Smart home system" },
    { icon: ShieldCheck, label: "24h security" },
    { icon: Users, label: "Children's club" },
    { icon: Sparkles, label: "Spa & treatments" },
  ],
  accentColor = "#8b6f47",
}: ProjectAmenitiesGridProps) {
  return (
    <div>
      <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
      <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {amenities.map((a, i) => {
          const Icon = a.icon || Sparkles;
          return (
            <div key={i} className="flex flex-col items-center text-center p-5 rounded-sm bg-[#f8f6f3]">
              <Icon className="w-6 h-6 mb-3" style={{ color: accentColor }} />
              <span className="text-[13px] font-light text-[#2C2825]">{a.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
