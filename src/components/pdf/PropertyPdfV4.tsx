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
  price: "4,650,000",
  beds: 5, baths: 4, sqm: 420, plot: 1200, year: 2023,
  energyClass: "A",
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Smart Home System", "Solar Panels", "Double Garage",
  ],
  images: [heroImg, detail1, detail2],
};

const SPECS = [
  { icon: Home, value: `${PROPERTY.sqm} m²`, label: "built area" },
  { icon: BedDouble, value: String(PROPERTY.beds), label: "bedrooms" },
  { icon: Bath, value: String(PROPERTY.baths), label: "bathrooms" },
  { icon: ArrowUpDown, value: `${PROPERTY.plot} m²`, label: "Land area" },
];

const ENERGY_COLORS: Record<string, string> = {
  A: "#00A651", B: "#50B848", C: "#BDD630", D: "#FFF200", E: "#FDB913", F: "#F37021", G: "#ED1C24",
};

const EnergyChart: React.FC<{ activeClass: string }> = ({ activeClass }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {["A", "B", "C", "D", "E", "F", "G"].map((letter, i) => {
      const width = 28 + i * 10;
      const isActive = letter === activeClass;
      return (
        <div key={letter} style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <div
            style={{
              width, height: 14,
              background: ENERGY_COLORS[letter],
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: "#fff",
              borderRadius: "2px 6px 6px 2px",
              opacity: isActive ? 1 : 0.7,
              border: isActive ? "2px solid #2D2926" : "none",
            }}
          >
            {letter}
          </div>
        </div>
      );
    })}
  </div>
);

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

      {/* A3 Landscape Sheet */}
      <div
        ref={sheetRef}
        className="overflow-hidden"
        style={{
          width: 1587,
          height: 1123,
          display: "grid",
          gridTemplateColumns: "52% 48%",
          background: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(0,0,0,.15)",
        }}
      >
        {/* ── LEFT: Images ── */}
        <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%" }}>
          <div style={{ overflow: "hidden" }}>
            <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 320 }}>
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
            padding: "44px 48px 36px",
            display: "flex",
            flexDirection: "column",
            background: "#FFFFFF",
          }}
        >
          {/* Header: Logo + Contact */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 42, fontWeight: 400, letterSpacing: ".18em", color: "#2D2926" }}>
                {brand.name}
              </div>
              <span style={{ fontSize: 11, letterSpacing: ".22em", color: "#8B6F47", display: "block", marginTop: 0 }}>
                {brand.subtitle}
              </span>
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: "#2D2926", lineHeight: 1.7 }}>
              <div>{contact.phone}</div>
              <div>{contact.email}</div>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 28, fontWeight: 300, color: "#2D2926", lineHeight: 1.35, marginBottom: 20 }}>
            {p.title}
          </h1>

          {/* Location + Ref */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid #2D2926", paddingBottom: 10, marginBottom: 28 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#2D2926" }}>{p.location}</span>
            <span style={{ fontSize: 18, color: "#2D2926" }}>ref. <b>{p.ref}</b></span>
          </div>

          {/* Specs + Features side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, gap: 0 }}>
            {/* Specs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingRight: 32 }}>
              {SPECS.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Icon style={{ width: 32, height: 32, color: "#2D2926", strokeWidth: 1.5 }} />
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#2D2926" }}>{value}</div>
                    <div style={{ fontSize: 13, color: "#6B6560" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {p.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: "#2D2926" }}>
                  <Check style={{ width: 18, height: 18, color: "#2D2926", strokeWidth: 3 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Price + Energy + QR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 20 }}>
            {/* Price */}
            <div style={{ fontSize: 72, fontWeight: 800, color: "#2D2926", letterSpacing: "-.02em", lineHeight: 1 }}>
              {p.price}
            </div>

            {/* Energy Chart */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#2D2926", marginBottom: 4, borderBottom: "2px solid #8B6F47", paddingBottom: 3, display: "inline-block" }}>
                Energy Efficiency
              </div>
              <EnergyChart activeClass={p.energyClass} />
            </div>

            {/* QR */}
            <div
              style={{
                width: 110, height: 110, border: "1px dashed #ccc",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, color: "#9A938B", textAlign: "center", lineHeight: 1.3,
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
