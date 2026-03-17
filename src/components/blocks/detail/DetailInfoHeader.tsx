/**
 * DETAIL INFO HEADER
 * Property title, location, inline price (mobile), specs grid.
 * Origin: PropertyDetail V6
 */

import { Bed, Bath, Maximize, Fence, MapPin, Star, Home, BellRing } from "lucide-react";

interface DetailInfoHeaderProps {
  title?: string;
  location?: string;
  region?: string;
  priceFormatted?: string;
  originalPrice?: string;
  discount?: number;
  pricePerSqm?: string;
  rentalPrice?: string;
  alsoForRent?: boolean;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number;
  year?: number;
  status?: string;
  tags?: string[];
  exclusiveLabel?: string;
}

const DetailInfoHeader = ({
  title = "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  location = "Santa Eulalia del Río, Ibiza",
  region = "Balearic Islands, Spain",
  priceFormatted = "€4,650,000",
  originalPrice = "€5,200,000",
  discount = 11,
  pricePerSqm = "€11,071/m²",
  rentalPrice = "€18,500/mes",
  alsoForRent = true,
  beds = 5,
  baths = 4,
  sqm = 420,
  plot = 1200,
  year = 2023,
  status = "Available",
  tags = ["Gated Community", "Newly Built", "Sea Views"],
  exclusiveLabel = "Exclusive",
}: DetailInfoHeaderProps) => (
  <div>
    {/* Title */}
    <h1 className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-medium text-neutral-900 leading-tight tracking-[0.04em] uppercase mb-1">
      {title}
    </h1>

    {/* Address */}
    <p className="text-[12px] sm:text-[13px] text-neutral-400 font-light tracking-[0.1em] uppercase mb-2 flex items-center gap-2">
      <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
      {location} · {region}
    </p>

    {/* Inline price (mobile/tablet) */}
    <div className="lg:hidden flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
      <p className="text-[26px] sm:text-[30px] font-medium text-neutral-900 tracking-tight leading-none">{priceFormatted}</p>
      {originalPrice && <span className="text-[13px] text-neutral-300 line-through font-light">{originalPrice}</span>}
      {discount > 0 && <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-amber-700">-{discount}%</span>}
      <span className="text-[11px] text-neutral-400 font-light">{pricePerSqm}</span>
      {alsoForRent && (
        <span className="text-[12px] text-neutral-500 flex items-center gap-1">
          <Home className="w-3 h-3 text-amber-700/80" /> Rent: <span className="font-medium text-neutral-600">{rentalPrice}</span>
        </span>
      )}
    </div>

    {/* Compact specs grid */}
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
      {[
        { icon: Bed, label: "Bedrooms", value: beds },
        { icon: Bath, label: "Bathrooms", value: baths },
        { icon: Maximize, label: "Built Area", value: `${sqm} m²` },
        { icon: Fence, label: plot ? "Plot Size" : "Useful Area", value: plot ? `${plot.toLocaleString()} m²` : `${sqm} m²` },
      ].map((s, i) => (
        <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-2 sm:p-2.5 text-center">
          <s.icon className="w-4 h-4 text-neutral-400 mx-auto mb-1.5" strokeWidth={1.5} />
          <p className="text-[14px] sm:text-[16px] font-light text-neutral-900 mb-0.5 leading-tight">{s.value}</p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-neutral-500 font-medium leading-tight">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-4 mt-2 text-[11px] sm:text-[12px] text-neutral-500 font-light">
      <span>Year built: <strong className="font-medium text-neutral-700">{year}</strong></span>
      <span className="text-neutral-300">·</span>
      <span>Status: <strong className="font-medium text-neutral-700">{status}</strong></span>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {exclusiveLabel && (
        <span className="text-[12px] text-amber-700 font-medium border border-amber-700/40 bg-amber-700/5 px-3.5 py-2 tracking-[0.05em] flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" strokeWidth={1.5} /> {exclusiveLabel}
        </span>
      )}
      {tags.map((tag, i) => (
        <span key={i} className="text-[12px] text-neutral-700 border border-neutral-200 px-3.5 py-2 font-light">{tag}</span>
      ))}
    </div>
  </div>
);

export default DetailInfoHeader;
