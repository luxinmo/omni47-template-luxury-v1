import React from "react";
import { Bed, Bath, Maximize, Fence, Car } from "lucide-react";

interface DetailInfoHeaderInlineProps {
  title?: string;
  subtitle?: string;
  location?: string;
  style?: string;
  ref?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number;
  garage?: number;
}

/**
 * DetailInfoHeaderInline — V3 layout: icon+value+label in a horizontal flex row.
 * Different from V6's compact 4-col grid boxes.
 */
const DetailInfoHeaderInline: React.FC<DetailInfoHeaderInlineProps> = ({
  title = "Stunning Contemporary Villa with Panoramic Sea Views",
  subtitle = "An architectural masterpiece on the Mediterranean coast",
  location = "Santa Eulalia del Río, Ibiza",
  style = "Contemporary",
  ref: refCode = "PE-IBZ-2847",
  beds = 5,
  baths = 4,
  sqm = 420,
  plot = 1200,
  garage = 2,
}) => {
  const specs = [
    { icon: Bed, label: "Beds", value: beds },
    { icon: Bath, label: "Baths", value: baths },
    { icon: Maximize, label: "Built", value: `${sqm} m²` },
    { icon: Fence, label: "Plot", value: `${plot.toLocaleString()} m²` },
    { icon: Car, label: "Garage", value: garage },
  ];

  return (
    <section>
      <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-500 mb-1">{location}</p>
      <p className="text-[13px] text-neutral-400 font-light mb-2">
        Detached houses <span className="mx-1 text-neutral-300">|</span> <span className="italic">{style}</span> <span className="mx-1 text-neutral-300">|</span> <span className="font-mono text-neutral-400 text-[12px]">REF-{refCode}</span>
      </p>
      <h1 className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] font-medium text-neutral-900 leading-snug uppercase tracking-[0.01em] mb-2">
        {title}
      </h1>
      <p className="text-[14px] text-neutral-500 font-light leading-relaxed">{subtitle}</p>

      {/* Inline specs row with icons */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
        {specs.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[13px] sm:text-[14px] text-neutral-700">
            <s.icon className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
            <span className="font-light">{s.value}</span>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailInfoHeaderInline;
