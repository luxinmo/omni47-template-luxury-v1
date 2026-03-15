import { Crown, Building2, Mail, Calendar, Phone, MessageCircle } from "lucide-react";

interface Typology {
  type: string;
  from: number;
  sqmRange?: string;
}

interface ProjectPriceSidebarProps {
  variant?: "branded" | "newdev";
  brandName?: string;
  priceMin?: number;
  priceMax?: number;
  availableUnits?: number;
  totalUnits?: number;
  construction?: number;
  typologies?: Typology[];
  phone?: string;
  onEnquiry?: () => void;
  onScheduleVisit?: () => void;
  accentColor?: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function ProjectPriceSidebar({
  variant = "branded",
  brandName = "Four Seasons",
  priceMin = 3500000,
  priceMax = 8200000,
  availableUnits = 6,
  totalUnits = 32,
  construction = 45,
  typologies = [
    { type: "Apartment", from: 3500000, sqmRange: "180 – 250 m²" },
    { type: "Penthouse", from: 5200000, sqmRange: "280 – 380 m²" },
    { type: "Villa", from: 6800000, sqmRange: "420 – 650 m²" },
  ],
  phone = "+34 600 000 000",
  onEnquiry,
  onScheduleVisit,
  accentColor = "#8b6f47",
}: ProjectPriceSidebarProps) {
  const isBranded = variant === "branded";
  const Icon = isBranded ? Crown : Building2;
  const label = isBranded ? brandName : "New Development";

  return (
    <div className="space-y-6">
      {/* Price card */}
      <div className="p-6 rounded-sm border border-[#e8e4df] bg-white">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: accentColor }}>{label}</span>
        </div>
        <p className="text-[24px] font-extralight mb-1 text-[#2C2825]">{fmt(priceMin)} — {fmt(priceMax)}</p>
        <p className="text-[12px] font-light mb-6 text-[#b0aaa3]">{availableUnits} of {totalUnits} units available</p>

        {/* Construction progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b0aaa3]">Construction</span>
            <span className="text-[14px] font-light text-[#2C2825]">{construction}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#f8f6f3]">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${construction}%`, background: accentColor }} />
          </div>
        </div>

        {/* Typologies */}
        <div className="mb-6 pb-6 border-b border-[#e8e4df]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3 text-[#b0aaa3]">Typologies</p>
          {typologies.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-1.5">
              <span className="text-[13px] font-light text-[#8a8580]">
                {t.type} {t.sqmRange && <span className="text-[11px] text-[#b0aaa3]">({t.sqmRange})</span>}
              </span>
              <span className="text-[13px] font-light text-[#2C2825]">from {fmt(t.from)}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <button
          onClick={onEnquiry}
          className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 mb-3 transition-all hover:opacity-90 text-white"
          style={{ background: accentColor }}
        >
          <Mail className="w-4 h-4" /> Request Information
        </button>
        <button
          onClick={onScheduleVisit}
          className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 transition-all hover:opacity-80"
          style={{ border: `1px solid ${accentColor}60`, color: accentColor }}
        >
          <Calendar className="w-4 h-4" /> Schedule a Visit
        </button>

        {/* Direct contact */}
        <div className="mt-5 pt-5 flex items-center justify-center gap-4 border-t border-[#e8e4df]">
          <a href={`tel:${phone}`} className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60 text-[#8a8580]">
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
          <span className="text-[#e8e4df]">|</span>
          <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60 text-[#8a8580]">
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
