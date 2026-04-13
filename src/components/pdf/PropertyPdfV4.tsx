import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Home, BedDouble, Bath, ArrowUpDown, Check, Phone, Mail } from "lucide-react";
import { brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";

const PROPERTY = {
  ref: "PE-IBZ-2847",
  title: "Stunning Contemporary Villa with Panoramic Sea Views",
  location: "Santa Eulalia del Río, Ibiza",
  price: "€4,650,000",
  beds: 5, baths: 4, sqm: 420, plot: 1200, year: 2023,
  energyClass: "A",
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Smart Home System", "Solar Panels", "Double Garage",
  ],
  images: [heroImg, detail1, detail2],
};

const SPECS = [
  { icon: Home, value: `${PROPERTY.sqm} m²`, label: "Built area" },
  { icon: BedDouble, value: String(PROPERTY.beds), label: "Bedrooms" },
  { icon: Bath, value: String(PROPERTY.baths), label: "Bathrooms" },
  { icon: ArrowUpDown, value: `${PROPERTY.plot} m²`, label: "Land area" },
];

const PropertyPdfV4: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!sheetRef.current) return;
    const canvas = await html2canvas(sheetRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFFFFF",
    });
    const link = document.createElement("a");
    link.download = `${PROPERTY.ref}-ficha-a3.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const p = PROPERTY;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4" style={{ background: "#E2DCD4", fontFamily: "'Jost', Helvetica, sans-serif" }}>
      {/* Download */}
      <button
        onClick={handleDownload}
        className="mb-6 flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wider transition-colors print:hidden"
        style={{ background: "#2D2926", color: "#fff" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#8B6F47")}
        onMouseLeave={e => (e.currentTarget.style.background = "#2D2926")}
      >
        <Download className="w-4 h-4" />
        DOWNLOAD A3
      </button>

      {/* A3 Landscape Sheet: 1587 × 1123px */}
      <div
        ref={sheetRef}
        className="overflow-hidden"
        style={{
          width: 1587,
          height: 1123,
          display: "grid",
          gridTemplateColumns: "58% 42%",
          background: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(0,0,0,.15)",
        }}
      >
        {/* ── LEFT: Images ── */}
        <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%" }}>
          {/* Hero */}
          <div style={{ overflow: "hidden" }}>
            <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Thumbs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 260 }}>
            <div style={{ overflow: "hidden" }}>
              <img src={p.images[1]} alt="Detail 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <img src={p.images[2]} alt="Detail 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Info ── */}
        <div
          style={{
            padding: "48px 52px 40px",
            display: "flex",
            flexDirection: "column",
            background: "#FAF8F5",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: ".25em", color: "#2D2926" }}>
                {brand.name}
              </div>
              <span style={{ fontSize: 10, letterSpacing: ".2em", color: "#8B6F47", display: "block", marginTop: 2 }}>
                {brand.subtitle}
              </span>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: "#6B6560", lineHeight: 1.6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <Phone style={{ width: 10, height: 10 }} /> {contact.phone}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <Mail style={{ width: 10, height: 10 }} /> {contact.email}
              </div>
            </div>
          </div>

          {/* Accent line */}
          <div style={{ width: 60, height: 2, background: "#8B6F47", marginBottom: 20 }} />

          {/* Title */}
          <h1 style={{ fontSize: 26, fontWeight: 300, color: "#2D2926", lineHeight: 1.35, marginBottom: 24 }}>
            {p.title}
          </h1>

          {/* Location + Ref */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E2DCD4", paddingBottom: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#2D2926" }}>{p.location}</span>
            <span style={{ fontSize: 13, color: "#6B6560", fontWeight: 500 }}>ref. {p.ref}</span>
          </div>

          {/* Specs + Features */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
            {/* Specs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingRight: 36, borderRight: "1px solid #E2DCD4" }}>
              {SPECS.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#FAF8F5", border: "1px solid #E2DCD4", borderRadius: 4,
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: "#8B6F47" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#2D2926" }}>{value}</div>
                    <div style={{ fontSize: 11, color: "#6B6560", letterSpacing: ".05em" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ paddingLeft: 36, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#2D2926" }}>
                  <div
                    style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#8B6F47",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Check style={{ width: 11, height: 11, color: "#fff", strokeWidth: 2.5 }} />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #E2DCD4" }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 600, color: "#2D2926", letterSpacing: "-.02em" }}>
                <span style={{ fontSize: 20, color: "#8B6F47", fontWeight: 400 }}>€</span>4,650,000
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#6B6560", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 6 }}>
                Energy
              </div>
              <div
                style={{
                  width: 44, height: 44, background: "#2D9B3A", color: "#fff",
                  fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center",
                  justifyContent: "center", borderRadius: 4, margin: "0 auto",
                }}
              >
                {p.energyClass}
              </div>
            </div>
            <div
              style={{
                width: 80, height: 80, border: "1px dashed #E2DCD4",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, color: "#9A938B", textAlign: "center", lineHeight: 1.3,
              }}
            >
              QR<br />Scan to<br />view online
            </div>
          </div>
        </div>
      </div>

      <style>{`@media print { body{margin:0;padding:0} .print\\:hidden{display:none!important} }`}</style>
    </div>
  );
};

export default PropertyPdfV4;
