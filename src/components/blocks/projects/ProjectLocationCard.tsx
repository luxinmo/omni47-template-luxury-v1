import { MapPin, Globe } from "lucide-react";

interface NearbyPlace {
  name: string;
  distance: string;
}

interface ProjectLocationCardProps {
  area?: string;
  nearbyPlaces?: NearbyPlace[];
  airport?: string;
  airportDistance?: string;
  accentColor?: string;
}

export default function ProjectLocationCard({
  area = "Marbella, Costa del Sol",
  nearbyPlaces = [
    { name: "Marbella Golden Mile", distance: "4 km" },
    { name: "Puerto Banús", distance: "8 km" },
    { name: "La Quinta Golf", distance: "6 km" },
    { name: "Playa de Guadalmina", distance: "0.3 km" },
    { name: "Hospital Costa del Sol", distance: "12 km" },
  ],
  airport = "Málaga-Costa del Sol (AGP)",
  airportDistance = "55 km",
  accentColor = "#8b6f47",
}: ProjectLocationCardProps) {
  return (
    <div className="p-6 rounded-sm border border-[#e8e4df] bg-white">
      <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: accentColor }}>Location</p>
      <div className="flex items-start gap-2 mb-4">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
        <span className="text-[14px] font-light text-[#2C2825]">{area}</span>
      </div>
      <div className="space-y-2.5 mb-4">
        {nearbyPlaces.map((pl, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[13px] font-light text-[#8a8580]">{pl.name}</span>
            <span className="text-[12px] font-light text-[#b0aaa3]">{pl.distance}</span>
          </div>
        ))}
      </div>
      {airport && (
        <div className="pt-3 border-t border-[#e8e4df]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#b0aaa3]" />
            <span className="text-[13px] font-light text-[#8a8580]">{airport} — {airportDistance}</span>
          </div>
        </div>
      )}
    </div>
  );
}
