/**
 * PROPERTY PDF SHEET V1
 * Single-page A4 property sheet with hero image and thumbnail gallery.
 * Origin: PropertyPdfV1
 */

import { Bed, Bath, Maximize, MapPin, Car, Phone, Mail } from "lucide-react";
import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

interface PropertyPdfSheetV1Props {
  brandName?: string;
  brandSubtitle?: string;
  ref?: string;
  title?: string;
  location?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number;
  garage?: number;
  description?: string;
  features?: string[];
  images?: string[];
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
}

const PropertyPdfSheetV1 = ({
  brandName = "PRESTIGE",
  brandSubtitle = "ESTATES",
  ref: propRef = "PE-IBZ-2847",
  title = "Stunning Contemporary Villa with Panoramic Sea Views",
  location = "Santa Eulalia del Río, Ibiza",
  price = "€4,650,000",
  beds = 5,
  baths = 4,
  sqm = 420,
  plot = 1200,
  garage = 2,
  description = "This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living.",
  features = ["Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar", "Gym", "Solar Panels", "Smart Home", "Underfloor Heating"],
  images = [heroImg, detail1, detail2, detail3],
  agentName = "Isabella Martínez",
  agentPhone = "+34 600 123 456",
  agentEmail = "isabella@prestigeestates.com",
}: PropertyPdfSheetV1Props) => (
  <div className="w-[794px] bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col mx-auto" style={{ height: 1123, fontFamily: "'Jost', Helvetica, sans-serif" }}>
    {/* Header */}
    <div className="flex items-center justify-between px-8 py-4 bg-[#2D2926]">
      <div>
        <span className="text-white text-lg font-light tracking-[0.3em]">{brandName}</span>
        <span className="text-[#8B6F47] text-[10px] ml-2 tracking-[0.2em] font-light">{brandSubtitle}</span>
      </div>
      <span className="text-white/50 text-[10px] tracking-wider">REF: {propRef}</span>
    </div>

    {/* Hero */}
    <div className="relative h-[360px] overflow-hidden">
      <img src={images[0]} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h1 className="text-white text-[22px] font-light tracking-[0.02em] leading-[1.2] mb-1">{title}</h1>
        <p className="text-white/70 text-[12px] flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</p>
      </div>
    </div>

    {/* Price + specs */}
    <div className="flex items-center justify-between px-8 py-5 border-b border-[#E0DCD4]">
      <span className="text-[24px] font-light text-[#2D2926] tracking-wide">{price}</span>
      <div className="flex items-center gap-5 text-[12px] text-[#8B7B6B]">
        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {beds} Beds</span>
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {baths} Baths</span>
        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {sqm} m²</span>
        {plot > 0 && <span className="flex items-center gap-1">Plot: {plot} m²</span>}
        {garage > 0 && <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {garage}</span>}
      </div>
    </div>

    {/* Description */}
    <div className="px-8 py-5 flex-1">
      <p className="text-[12px] leading-[1.8] text-[#5C5347] mb-5">{description}</p>
      <div className="grid grid-cols-4 gap-2">
        {features.map((f, i) => (
          <span key={i} className="text-[10px] text-[#8B7B6B] py-1.5 px-2 bg-[#F0ECE5] text-center tracking-wide">{f}</span>
        ))}
      </div>
    </div>

    {/* Thumbnails */}
    <div className="px-8 pb-4">
      <div className="grid grid-cols-3 gap-2">
        {images.slice(1, 4).map((img, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden">
            <img src={img} alt={`Photo ${i + 2}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between px-8 py-3 bg-[#2D2926] mt-auto">
      <div className="flex items-center gap-4 text-[10px] text-white/60">
        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {agentPhone}</span>
        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {agentEmail}</span>
      </div>
      <span className="text-white/30 text-[8px] tracking-wider">{brandName} {brandSubtitle} © {new Date().getFullYear()}</span>
    </div>
  </div>
);

export default PropertyPdfSheetV1;
