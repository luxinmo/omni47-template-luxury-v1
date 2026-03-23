import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Bed, Bath, Maximize, MapPin, Car, Fence, Phone, Mail } from "lucide-react";
import { brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

const PROPERTY = {
  ref: "PE-IBZ-2847",
  title: "Stunning Contemporary Villa with Panoramic Sea Views",
  location: "Santa Eulalia del Río, Ibiza",
  price: "€4,650,000",
  beds: 5, baths: 4, sqm: 420, plot: 1200, garage: 2, year: 2023,
  energyClass: "A",
  description:
    "This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living across 420 m² of impeccably finished space.",
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
    "Air Conditioning", "Alarm System", "Double Garage", "Garden",
  ],
  images: [heroImg, detail1, detail2, detail3],
};

const PropertyPdfV3: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!sheetRef.current) return;
    const canvas = await html2canvas(sheetRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FAF8F5",
    });
    const link = document.createElement("a");
    link.download = `${PROPERTY.ref}-ficha-v3.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const p = PROPERTY;

  return (
    <div className="min-h-screen bg-[#E2DCD4] flex flex-col items-center py-8 px-4 font-sans">
      {/* Download button */}
      <button
        onClick={handleDownload}
        className="mb-6 flex items-center gap-2 bg-[#2D2926] text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-[#8B6F47] transition-colors print:hidden"
      >
        <Download className="w-4 h-4" />
        DOWNLOAD PDF
      </button>

      {/* ─── A4 Sheet ─── */}
      <div
        ref={sheetRef}
        className="w-[794px] bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col"
        style={{ height: 1123, fontFamily: "'Jost', Helvetica, sans-serif" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-[#2D2926]">
          <div>
            <span className="text-white text-lg font-light tracking-[0.3em]">{brand.name}</span>
            <span className="text-[#8B6F47] text-[10px] ml-2 tracking-[0.2em] font-light">{brand.subtitle}</span>
          </div>
          <span className="text-white/50 text-[10px] tracking-wider">REF: {p.ref}</span>
        </div>

        {/* Hero image */}
        <div className="relative h-[340px] overflow-hidden">
          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2D2926]/80 to-transparent p-6">
            <h1 className="text-white text-[22px] font-light leading-tight">{p.title}</h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-3 h-3 text-[#8B6F47]" />
              <span className="text-white/70 text-xs">{p.location}</span>
            </div>
          </div>
        </div>

        {/* Price + Specs bar */}
        <div className="flex items-center justify-between px-8 py-3 bg-white border-b border-[#E2DCD4]">
          <span className="text-[#2D2926] text-2xl font-light">{p.price}</span>
          <div className="flex items-center gap-5 text-[#6B6560] text-xs">
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds} Beds</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths} Baths</span>
            <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {p.sqm} m²</span>
            <span className="flex items-center gap-1"><Fence className="w-3.5 h-3.5" /> {p.plot} m²</span>
            <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {p.garage}</span>
          </div>
        </div>

        {/* Full-width content (no sidebar) */}
        <div className="flex-1 flex flex-col px-8 py-5 gap-4">
          {/* Description */}
          <div>
            <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">DESCRIPTION</h2>
            <p className="text-[#2D2926] text-[11px] leading-[1.7] font-light">{p.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">FEATURES</h2>
            <div className="grid grid-cols-4 gap-x-4 gap-y-1.5">
              {p.features.map((f) => (
                <span key={f} className="text-[10px] text-[#6B6560] flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#8B6F47]" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Details table */}
          <div>
            <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">DETAILS</h2>
            <div className="grid grid-cols-4 gap-x-6 gap-y-1.5">
              {[
                ["Type", "Villa"],
                ["Year", String(p.year)],
                ["Built", `${p.sqm} m²`],
                ["Plot", `${p.plot} m²`],
                ["Bedrooms", String(p.beds)],
                ["Bathrooms", String(p.baths)],
                ["Garage", `${p.garage} cars`],
                ["Energy", p.energyClass],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[#E2DCD4] pb-1 text-[10px]">
                  <span className="text-[#6B6560]">{k}</span>
                  <span className="text-[#2D2926] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Gallery photos */}
          <div className="grid grid-cols-4 gap-2 mt-auto">
            {[p.images[0], p.images[1], p.images[2], p.images[3]].map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-[#2D2926] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4 text-[9px] text-white/50">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {contact.phone}</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {contact.email}</span>
          </div>
          <span className="text-white/30 text-[8px] tracking-wider">{brand.fullName} © {new Date().getFullYear()}</span>
        </div>
      </div>

      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PropertyPdfV3;
