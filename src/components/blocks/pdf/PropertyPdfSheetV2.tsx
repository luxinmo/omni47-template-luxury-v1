/**
 * PROPERTY PDF SHEET V2
 * Three-page A4 catalog with hero, gallery, features, agent card and location block.
 * Origin: PropertyPdfV2
 * Note: Renders as preview-only (no download button) for the block catalog.
 */

import { Bed, Bath, Maximize, MapPin, Car, Phone, Mail, Globe, Star } from "lucide-react";
import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

interface PropertyPdfSheetV2Props {
  brandName?: string;
  brandSubtitle?: string;
  pageToShow?: 1 | 2 | 3;
}

const PropertyPdfSheetV2 = ({
  brandName = "PRESTIGE",
  brandSubtitle = "ESTATES",
  pageToShow = 1,
}: PropertyPdfSheetV2Props) => {
  const ref = "PE-IBZ-2847";
  const title = "Stunning Contemporary Villa with Panoramic Sea Views";
  const location = "Santa Eulalia del Río, Ibiza";
  const price = "€4,650,000";

  const Header = ({ pageNum }: { pageNum: number }) => (
    <div className="flex items-center justify-between px-8 py-3 bg-[#2D2926]">
      <div>
        <span className="text-white text-base font-light tracking-[0.3em]">{brandName}</span>
        <span className="text-[#8B6F47] text-[9px] ml-2 tracking-[0.2em] font-light">{brandSubtitle}</span>
      </div>
      <span className="text-white/40 text-[9px] tracking-wider">REF: {ref} · {pageNum}/3</span>
    </div>
  );

  const Footer = () => (
    <div className="px-8 py-2.5 bg-[#2D2926] flex items-center justify-between mt-auto">
      <span className="text-white/50 text-[8px]">info@prestigeestates.com · +34 952 123 456</span>
      <span className="text-white/30 text-[7px] tracking-wider">{brandName} {brandSubtitle} © {new Date().getFullYear()}</span>
    </div>
  );

  const pageStyle = { width: 794, height: 1123, fontFamily: "'Jost', Helvetica, sans-serif" };

  if (pageToShow === 1) {
    return (
      <div className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col mx-auto" style={pageStyle}>
        <Header pageNum={1} />
        <div className="relative h-[480px] overflow-hidden">
          <img src={heroImg} alt={title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <p className="text-[#8B6F47] text-[10px] tracking-[0.25em] uppercase mb-2">Exclusive Property</p>
            <h1 className="text-white text-[26px] font-light tracking-[0.02em] leading-[1.15] mb-2">{title}</h1>
            <p className="text-white/65 text-[12px] flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E0DCD4]">
          <span className="text-[28px] font-light text-[#2D2926]">{price}</span>
          <div className="flex items-center gap-5 text-[12px] text-[#8B7B6B]">
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> 5 Beds</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> 4 Baths</span>
            <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> 420 m²</span>
            <span>Plot: 1,200 m²</span>
          </div>
        </div>
        <div className="px-8 py-6 flex-1">
          <p className="text-[12px] leading-[1.85] text-[#5C5347]">
            This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (pageToShow === 2) {
    return (
      <div className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col mx-auto" style={pageStyle}>
        <Header pageNum={2} />
        <div className="px-8 pt-6 pb-3 grid grid-cols-3 gap-2 h-[280px]">
          {[detail1, detail2, detail3].map((img, i) => (
            <div key={i} className="overflow-hidden"><img src={img} alt={`Photo ${i + 2}`} className="w-full h-full object-cover" /></div>
          ))}
        </div>
        <div className="px-8 py-5 flex-1">
          <h2 className="text-[16px] font-light tracking-[0.15em] uppercase text-[#2D2926] mb-4">Key Features</h2>
          <div className="grid grid-cols-4 gap-2">
            {["Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar", "Gym", "Solar Panels", "Smart Home", "Underfloor Heating", "Air Conditioning", "Alarm System", "Double Garage", "Garden"].map((f, i) => (
              <span key={i} className="text-[10px] text-[#8B7B6B] py-2 px-2 bg-[#F0ECE5] text-center tracking-wide flex items-center justify-center gap-1">
                <Star className="w-2.5 h-2.5 text-[#8B6F47]" /> {f}
              </span>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col mx-auto" style={pageStyle}>
      <Header pageNum={3} />
      <div className="px-8 py-6 flex-1">
        <h2 className="text-[16px] font-light tracking-[0.15em] uppercase text-[#2D2926] mb-4">Your Advisor</h2>
        <div className="flex items-start gap-4 p-5 bg-[#F0ECE5] mb-8">
          <div className="w-14 h-14 rounded-full bg-[#2D2926] flex items-center justify-center text-white text-[14px] font-light">IM</div>
          <div>
            <p className="text-[14px] font-medium text-[#2D2926]">Isabella Martínez</p>
            <p className="text-[11px] text-[#8B7B6B] mb-2">Senior Property Advisor</p>
            <p className="text-[10px] text-[#8B7B6B] flex items-center gap-1"><Phone className="w-3 h-3" /> +34 600 123 456</p>
            <p className="text-[10px] text-[#8B7B6B] flex items-center gap-1"><Mail className="w-3 h-3" /> isabella@prestigeestates.com</p>
          </div>
        </div>
        <h2 className="text-[16px] font-light tracking-[0.15em] uppercase text-[#2D2926] mb-4">Location</h2>
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 mt-0.5 text-[#8B6F47]" />
          <span className="text-[13px] text-[#5C5347]">Santa Eulalia del Río, Ibiza, Spain</span>
        </div>
        <div className="space-y-1.5 text-[11px] text-[#8B7B6B]">
          <p>Beach — 800m · Airport — 15 min · Marina — 2 km · Town Centre — 1.5 km</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyPdfSheetV2;
