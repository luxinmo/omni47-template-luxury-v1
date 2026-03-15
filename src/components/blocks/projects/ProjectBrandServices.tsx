import { Star } from "lucide-react";

interface ProjectBrandServicesProps {
  sectionLabel?: string;
  brandName?: string;
  title?: string;
  services?: string[];
  accentColor?: string;
}

export default function ProjectBrandServices({
  sectionLabel,
  brandName = "Four Seasons",
  title = "Five-Star Services Included",
  services = [
    "24-hour concierge",
    "In-residence dining",
    "Daily housekeeping",
    "Private chef service",
    "Laundry & dry cleaning",
    "Personal shopping",
    "Airport transfers",
    "Yacht & jet charter",
    "Event planning",
    "Pet care services",
  ],
  accentColor = "#8b6f47",
}: ProjectBrandServicesProps) {
  return (
    <div>
      <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel || `${brandName} Services`}</p>
      <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {services.map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-[#e8e4df]">
            <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor }} />
            <span className="text-[14px] font-light text-[#2C2825]">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
