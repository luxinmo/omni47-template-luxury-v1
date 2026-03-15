import { ArrowRight, TrendingUp, Crown, Building2 } from "lucide-react";

interface Typology {
  type: string;
  from: number;
}

interface ProjectUnit {
  ref: string;
  type: string;
  price: number;
  beds?: number;
  sqm?: number;
}

interface ProjectCardProps {
  variant?: "branded" | "newdev";
  image?: string;
  name?: string;
  location?: string;
  brand?: string;
  developer?: string;
  delivery?: string;
  status?: string;
  construction?: number;
  availableUnits?: number;
  totalUnits?: number;
  priceMin?: number;
  priceMax?: number;
  typologies?: Typology[];
  units?: ProjectUnit[];
  trending?: boolean;
  href?: string;
  accentColor?: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function ProjectCard({
  variant = "branded",
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  name = "Four Seasons Private Residences",
  location = "Marbella, Costa del Sol",
  brand = "Four Seasons",
  developer = "Four Seasons Hotels",
  delivery = "Q2 2027",
  status = "Selling",
  construction = 45,
  availableUnits = 8,
  totalUnits = 32,
  priceMin = 3500000,
  priceMax = 8200000,
  typologies = [
    { type: "Penthouse", from: 5200000 },
    { type: "Villa", from: 6800000 },
    { type: "Apartment", from: 3500000 },
  ],
  units = [
    { ref: "FS-4A", type: "Penthouse", price: 5200000 },
    { ref: "FS-7B", type: "Villa", price: 7400000 },
    { ref: "FS-2C", type: "Apartment", price: 3500000 },
  ],
  trending = false,
  href = "#",
  accentColor = "#8b6f47",
}: ProjectCardProps) {
  const isBranded = variant === "branded";
  const badgeLabel = isBranded ? "Branded" : "New Development";
  const Icon = isBranded ? Crown : Building2;

  return (
    <div className="group flex flex-col lg:flex-row overflow-hidden rounded-sm border border-[#e8e4df] bg-white">
      {/* Image */}
      <div className="relative lg:w-[44%] min-h-[240px] lg:min-h-[360px] overflow-hidden">
        <img src={image} alt={`${name} — ${isBranded ? brand : developer}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
        {status === "Last Units" && (
          <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">Last units</span>
        )}
        {trending && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" /> Trending
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#8a8580]">{location}</span>
            <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase rounded-sm border border-[#e8e4df] text-[#8a8580]">{badgeLabel}</span>
          </div>
          <span className="text-[11px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 rounded-sm text-[#2C2825] border border-[#2C282530]">
            {status}
          </span>
        </div>

        <h3 className="text-xl lg:text-[22px] font-light tracking-wide mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{name}</h3>
        <p className="text-[13px] font-light mb-4 text-[#8a8580]">{isBranded ? brand : developer} · Delivery {delivery}</p>

        {/* Stats */}
        <div className="flex gap-6 mb-4 pb-4 border-b border-[#e8e4df]">
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1 text-[#b0aaa3]">Availability</p>
            <p className="text-[17px] font-light text-[#2C2825]">{availableUnits} <span className="text-[13px] text-[#b0aaa3]">/ {totalUnits}</span></p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1 text-[#b0aaa3]">Construction</p>
            <p className="text-[17px] font-light text-[#2C2825]">{construction}%</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1 text-[#b0aaa3]">Delivery</p>
            <p className="text-[17px] font-light text-[#2C2825]">{delivery}</p>
          </div>
        </div>

        {/* Price */}
        <p className="text-[22px] lg:text-[24px] font-light mb-4 text-[#2C2825]">{fmt(priceMin)} — {fmt(priceMax)}</p>

        {/* Typologies + Units */}
        <div className="flex flex-col sm:flex-row gap-6 mb-5">
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2 text-[#b0aaa3]">Typologies</p>
            {typologies.map((t) => (
              <p key={t.type} className="text-[13px] font-light leading-relaxed text-[#8a8580]">{t.type} from <span className="text-[#2C2825]">{fmt(t.from)}</span></p>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2 text-[#b0aaa3]">Available Units</p>
            {units.map((u) => (
              <p key={u.ref} className="text-[13px] font-light leading-relaxed text-[#8a8580]">
                <span className="text-[#2C2825]">{u.ref}</span> · {u.type} · {fmt(u.price)}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#e8e4df]">
          <p className="text-[12px] font-light text-[#b0aaa3]">
            {availableUnits === totalUnits ? "All units available" : `${availableUnits} of ${totalUnits} available`}
            {construction > 0 && <span className="ml-3">{construction}% built</span>}
          </p>
          <a href={href} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: accentColor }}>
            View Project <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
