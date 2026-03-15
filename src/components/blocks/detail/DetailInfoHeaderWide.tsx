import React from "react";
import { Bed, Bath, Maximize, Fence, Car, Zap } from "lucide-react";

interface DetailInfoHeaderWideProps {
  title?: string;
  subtitle?: string;
  location?: string;
  region?: string;
  style?: string;
  ref?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number;
  garage?: number;
  energyClass?: string;
  year?: number;
  status?: string;
}

/**
 * DetailInfoHeaderWide — V5 layout: SEO-optimized header with 6-column specs grid
 * including Energy class and Garage. Different from V6's compact 4-col grid.
 */
const DetailInfoHeaderWide: React.FC<DetailInfoHeaderWideProps> = ({
  title = "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  subtitle = "Contemporary villa with panoramic Mediterranean sea views",
  location = "Santa Eulalia del Río, Ibiza",
  region = "Balearic Islands, Spain",
  style = "Contemporary",
  ref: refCode = "PE-IBZ-2847",
  beds = 5,
  baths = 4,
  sqm = 420,
  plot = 1200,
  garage = 2,
  energyClass = "A",
  year = 2023,
  status = "Available",
}) => {
  const specs = [
    { icon: Bed, label: "Bedrooms", value: beds },
    { icon: Bath, label: "Bathrooms", value: baths },
    { icon: Maximize, label: "Built Area", value: `${sqm} m²` },
    { icon: Fence, label: "Plot Size", value: `${plot.toLocaleString()} m²` },
    { icon: Car, label: "Garage", value: `${garage} cars` },
    { icon: Zap, label: "Energy", value: energyClass },
  ];

  return (
    <section>
      <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-500 mb-1">{location} · {region}</p>
      <p className="text-[13px] text-neutral-400 font-light mb-2">
        Detached villa <span className="mx-1 text-neutral-300">|</span> <span className="italic">{style}</span>{" "}
        <span className="mx-1 text-neutral-300">|</span> <span className="font-mono text-neutral-400 text-[12px]">REF-{refCode}</span>
      </p>
      <h1 className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] font-medium text-neutral-900 leading-snug tracking-[0.01em] mb-2">
        {title}
      </h1>
      <p className="text-[14px] sm:text-[15px] text-neutral-500 font-light leading-relaxed">{subtitle}</p>

      {/* 6-column specs grid with icon boxes */}
      <div className="mt-6 mb-8 pb-8 border-b border-neutral-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {specs.map((s, i) => (
            <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-3 sm:p-4 text-center">
              <s.icon className="w-5 h-5 text-neutral-400 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[16px] sm:text-[20px] font-light text-neutral-900 mb-0.5">{s.value}</p>
              <p className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-neutral-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[13px] text-neutral-500 font-light">
          <span>Year built: <strong className="font-medium text-neutral-700">{year}</strong></span>
          <span className="text-neutral-300">·</span>
          <span>Status: <strong className="font-medium text-neutral-700">{status}</strong></span>
        </div>
      </div>
    </section>
  );
};

export default DetailInfoHeaderWide;
