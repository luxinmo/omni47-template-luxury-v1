import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Bed, Bath, Maximize, MapPin, Car, Fence, Phone, Mail, Globe, Star } from "lucide-react";
import { brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

/* ─── Sample data ─── */
const PROPERTY = {
  ref: "PE-IBZ-2847",
  title: "Stunning Contemporary Villa with Panoramic Sea Views",
  subtitle: "An architectural masterpiece on the Mediterranean coast",
  location: "Santa Eulalia del Río, Ibiza",
  price: "€4,650,000",
  beds: 5, baths: 4, sqm: 420, plot: 1200, garage: 2, year: 2023,
  energyClass: "A",
  description:
    "This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.\n\nThe ground floor features a grand open-plan living area with floor-to-ceiling windows, a designer kitchen with Gaggenau appliances, and direct access to the infinity pool terrace. The master suite occupies a private wing with a spa-inspired bathroom, walk-in dressing room, and a private terrace.",
  shortDesc:
    "Upstairs, four additional en-suite bedrooms each enjoy their own terrace and sea views. The lower level houses a home cinema, wine cellar, gym, and staff quarters. Surrounded by mature Mediterranean gardens with automated irrigation.",
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
    "Air Conditioning", "Alarm System", "Double Garage", "Garden",
    "Terrace", "Staff Quarters", "Elevator", "Laundry Room",
  ],
  images: [heroImg, detail1, detail2, detail3, prop1, prop2, prop3],
  agent: {
    name: "Isabella Martínez",
    role: "Senior Property Advisor",
    phone: "+34 600 123 456",
    email: "isabella@prestigeestates.com",
  },
};

/* ─── Shared sub-components ─── */
const HeaderBar: React.FC<{ pageNum: number; total: number }> = ({ pageNum, total }) => (
  <div className="flex items-center justify-between px-8 py-3 bg-[#2D2926]">
    <div>
      <span className="text-white text-base font-light tracking-[0.3em]">{brand.name}</span>
      <span className="text-[#8B6F47] text-[9px] ml-2 tracking-[0.2em] font-light">{brand.subtitle}</span>
    </div>
    <span className="text-white/40 text-[9px] tracking-wider">REF: {PROPERTY.ref} · {pageNum}/{total}</span>
  </div>
);

const FooterBar: React.FC = () => (
  <div className="px-8 py-2.5 bg-[#2D2926] flex items-center justify-between mt-auto">
    <span className="text-white/50 text-[8px]">{contact.email} · {contact.phone}</span>
    <span className="text-white/30 text-[7px] tracking-wider">{brand.fullName} © {new Date().getFullYear()}</span>
  </div>
);

const pageStyle: React.CSSProperties = {
  width: 794,
  height: 1123,
  fontFamily: "'Jost', Helvetica, sans-serif",
};

const PropertyPdfV2: React.FC = () => {
  const sheetsRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!sheetsRef.current) return;
    const pages = sheetsRef.current.querySelectorAll<HTMLDivElement>("[data-pdf-page]");
    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true, backgroundColor: "#FAF8F5" });
      const link = document.createElement("a");
      link.download = `${PROPERTY.ref}-page-${i + 1}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const p = PROPERTY;

  return (
    <div className="min-h-screen bg-[#E2DCD4] flex flex-col items-center py-8 px-4 font-sans">
      <button
        onClick={handleDownload}
        className="mb-6 flex items-center gap-2 bg-[#2D2926] text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-[#8B6F47] transition-colors print:hidden"
      >
        <Download className="w-4 h-4" />
        DOWNLOAD CATALOG ({3} PAGES)
      </button>

      <div ref={sheetsRef} className="flex flex-col items-center gap-8">

        {/* ═══ PAGE 1 — Cover ═══ */}
        <div data-pdf-page className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col" style={pageStyle}>
          <HeaderBar pageNum={1} total={3} />

          {/* Full-bleed hero */}
          <div className="relative flex-1 overflow-hidden">
            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-[#2D2926]/30 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#8B6F47] text-white text-[9px] tracking-[0.15em]">EXCLUSIVE</span>
                <span className="px-3 py-1 border border-white/30 text-white text-[9px] tracking-[0.15em]">VILLA</span>
              </div>
              <h1 className="text-white text-3xl font-light leading-tight max-w-[500px]">{p.title}</h1>
              <p className="text-white/60 text-sm font-light mt-2 italic">{p.subtitle}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <MapPin className="w-3.5 h-3.5 text-[#8B6F47]" />
                <span className="text-white/70 text-xs">{p.location}</span>
              </div>
              
              {/* Price + key stats */}
              <div className="mt-6 flex items-end gap-8">
                <div>
                  <span className="text-[10px] text-[#8B6F47] tracking-[0.15em]">ASKING PRICE</span>
                  <p className="text-white text-3xl font-light mt-0.5">{p.price}</p>
                </div>
                <div className="flex items-center gap-5 text-white/60 text-xs pb-1">
                  <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds}</span>
                  <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths}</span>
                  <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {p.sqm} m²</span>
                  <span className="flex items-center gap-1"><Fence className="w-3.5 h-3.5" /> {p.plot} m²</span>
                </div>
              </div>
            </div>
          </div>

          <FooterBar />
        </div>

        {/* ═══ PAGE 2 — Details ═══ */}
        <div data-pdf-page className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col" style={pageStyle}>
          <HeaderBar pageNum={2} total={3} />

          <div className="flex-1 flex flex-col px-8 py-6 gap-5 overflow-hidden">
            {/* Photo grid */}
            <div className="grid grid-cols-3 gap-2 h-[240px]">
              {p.images.slice(1, 4).map((img, i) => (
                <img key={i} src={img} alt="" className="w-full h-full object-cover" />
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">PROPERTY DESCRIPTION</h2>
              <p className="text-[#2D2926] text-[11px] leading-[1.8] font-light whitespace-pre-line">{p.description}</p>
            </div>

            {/* Specs grid */}
            <div>
              <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-3">SPECIFICATIONS</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  ["Type", "Villa"],
                  ["Year Built", String(p.year)],
                  ["Built Area", `${p.sqm} m²`],
                  ["Plot Size", `${p.plot} m²`],
                  ["Bedrooms", String(p.beds)],
                  ["Bathrooms", String(p.baths)],
                  ["Garage", `${p.garage} cars`],
                  ["Energy Class", p.energyClass],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white p-3 border border-[#E2DCD4]">
                    <span className="text-[8px] text-[#9A938B] tracking-wider block">{k}</span>
                    <span className="text-[#2D2926] text-sm font-medium mt-0.5 block">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">FEATURES & AMENITIES</h2>
              <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                {p.features.map((f) => (
                  <span key={f} className="text-[10px] text-[#6B6560] flex items-center gap-1.5">
                    <Star className="w-2.5 h-2.5 text-[#8B6F47]" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Continuation */}
            <div className="mt-auto">
              <p className="text-[#2D2926] text-[11px] leading-[1.8] font-light">{p.shortDesc}</p>
            </div>
          </div>

          <FooterBar />
        </div>

        {/* ═══ PAGE 3 — Gallery + Contact ═══ */}
        <div data-pdf-page className="bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col" style={pageStyle}>
          <HeaderBar pageNum={3} total={3} />

          <div className="flex-1 flex flex-col px-8 py-6 gap-5 overflow-hidden">
            {/* Large gallery grid */}
            <div className="grid grid-cols-2 gap-2 h-[420px]">
              <img src={p.images[4]} alt="" className="w-full h-full object-cover" />
              <div className="grid grid-rows-2 gap-2">
                <img src={p.images[5]} alt="" className="w-full h-full object-cover" />
                <img src={p.images[6]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Location placeholder */}
            <div className="bg-[#2D2926] p-5 flex items-start gap-6">
              <div className="flex-1">
                <h2 className="text-[10px] text-[#8B6F47] tracking-[0.2em] font-medium mb-2">LOCATION</h2>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8B6F47]" />
                  <span className="text-white text-sm font-light">{p.location}</span>
                </div>
                <p className="text-white/60 text-[10px] leading-relaxed">
                  Located in one of Ibiza's most sought-after areas, this property offers easy access to pristine beaches, 
                  world-class restaurants, and the vibrant cultural scene of Santa Eulalia. The international airport is just 
                  20 minutes away.
                </p>
              </div>
              {/* Map placeholder */}
              <div className="w-[200px] h-[100px] bg-[#3D3A37] flex items-center justify-center">
                <Globe className="w-8 h-8 text-[#8B6F47]/40" />
              </div>
            </div>

            {/* Agent card */}
            <div className="flex items-center gap-6 border border-[#E2DCD4] p-5">
              <div className="w-16 h-16 bg-[#2D2926] flex items-center justify-center text-[#8B6F47] text-xl font-light">
                {p.agent.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h3 className="text-[10px] text-[#8B6F47] tracking-[0.15em] mb-1">YOUR DEDICATED ADVISOR</h3>
                <p className="text-[#2D2926] text-base font-light">{p.agent.name}</p>
                <p className="text-[#9A938B] text-[10px]">{p.agent.role}</p>
              </div>
              <div className="space-y-2 text-right">
                <div className="flex items-center gap-2 text-[11px] text-[#6B6560]">
                  <Phone className="w-3 h-3 text-[#8B6F47]" /> {p.agent.phone}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#6B6560]">
                  <Mail className="w-3 h-3 text-[#8B6F47]" /> {p.agent.email}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-auto border-t border-[#E2DCD4] pt-3">
              <p className="text-[8px] text-[#9A938B] leading-relaxed">
                Disclaimer: The information contained in this document is for general guidance only and does not constitute 
                an offer or contract. All measurements and descriptions are approximate. {brand.fullName} has not tested any 
                apparatus, equipment, fixtures, fittings or services and cannot verify they are in working order. Buyers are 
                advised to obtain verification from their solicitor or surveyor. Photographs are for illustration purposes only.
              </p>
            </div>
          </div>

          <FooterBar />
        </div>
      </div>

      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          [data-pdf-page] { break-after: page; }
        }
      `}</style>
    </div>
  );
};

export default PropertyPdfV2;
