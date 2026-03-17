import React from "react";
import { Phone, MessageCircle, Mail, BellRing } from "lucide-react";

interface DetailInfoHeaderCardProps {
  title?: string;
  subtitle?: string;
  location?: string;
  style?: string;
  ref?: string;
  tag?: string;
  priceFormatted?: string;
  originalPrice?: string;
  discount?: number;
  pricePerSqm?: string;
  rentalPrice?: string;
  alsoForRent?: boolean;
  specs?: { label: string; value: string | number }[];
  features?: string[];
  phone?: string;
  whatsapp?: string;
  onEnquiry?: () => void;
}

/**
 * DetailInfoHeaderCard — V4 layout: full-width summary card with 2-column grid
 * (info left + price right), feature dots, and CTA buttons — all inside a card.
 * Different from V6's separate title + sticky price card.
 */
const DetailInfoHeaderCard: React.FC<DetailInfoHeaderCardProps> = ({
  title = "Stunning Contemporary Villa with Panoramic Sea Views",
  subtitle = "An architectural masterpiece on the Mediterranean coast",
  location = "Santa Eulalia del Río, Ibiza",
  style = "Contemporary",
  ref: refCode = "PE-IBZ-2847",
  tag = "FOR SALE",
  priceFormatted = "€4,650,000",
  originalPrice = "€5,200,000",
  discount = 11,
  pricePerSqm = "€11,071/m²",
  rentalPrice = "€18,500/mes",
  alsoForRent = true,
  specs = [
    { label: "Beds", value: 5 },
    { label: "Baths", value: 4 },
    { label: "Built", value: "420 m²" },
    { label: "Plot", value: "1,200 m²" },
    { label: "Garage", value: 2 },
  ],
  features = ["Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar", "Gym", "Solar Panels"],
  phone = "+34 600 123 456",
  whatsapp = "34600123456",
  onEnquiry,
}) => {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Info */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] tracking-[0.15em] uppercase border border-neutral-400 text-neutral-600 px-2.5 py-1 font-medium">{tag}</span>
            <span className="font-mono text-neutral-400 tracking-wide text-[12px]">REF-{refCode}</span>
          </div>
          <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-500 mb-1">{location}</p>
          <p className="text-[13px] text-neutral-400 font-light mb-2">
            Detached houses <span className="mx-1 text-neutral-300">|</span> <span className="italic">{style}</span>
          </p>
          <h2 className="text-[18px] sm:text-[19px] md:text-[22px] font-medium text-neutral-900 leading-snug mb-2 uppercase">{title}</h2>
          <p className="text-[14px] text-neutral-500 font-light leading-relaxed mb-5">{subtitle}</p>

          {/* Specs row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-7">
            {specs.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[11px] sm:text-[12px] tracking-[0.1em] uppercase text-neutral-500 mb-0.5">{s.label}</p>
                <p className="text-[14px] sm:text-[16px] text-neutral-900 font-light">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Feature dots */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {features.map((f, i) => (
              <span key={i} className="text-[12px] text-neutral-500 font-light flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />{f}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Price + CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <p className="text-[28px] sm:text-[32px] font-extralight text-neutral-900 tracking-tight leading-none">{priceFormatted}</p>
              <span className="text-[14px] text-neutral-400 line-through font-light">{originalPrice}</span>
              <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-amber-600 bg-amber-50 px-2 py-0.5">-{discount}%</span>
            </div>
            <p className="text-[12px] text-neutral-500 mb-1">{pricePerSqm}</p>
            <button className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-amber-700 hover:text-amber-800 font-medium mt-1 transition-colors">
              <BellRing className="w-3.5 h-3.5" strokeWidth={1.5} />
              Avísame si baja el precio
            </button>
            {alsoForRent && (
              <p className="text-[13px] text-neutral-500 mb-6 flex items-center gap-1.5">
                Also for rent: <span className="font-medium text-neutral-700">{rentalPrice}</span>
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-800">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-[#22bf5b]">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
            <button onClick={onEnquiry} className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-neutral-900 text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100">
              <Mail className="w-3.5 h-3.5" /> Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfoHeaderCard;
