import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import { mockProperties } from "@/data/mock-data";

interface FeaturedGrid4ColProps {
  sectionLabel?: string;
  title?: string;
  viewAllText?: string;
  viewAllHref?: string;
  properties?: {
    id: string;
    image: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqm: number;
    ref: string;
    href: string;
  }[];
  accentColor?: string;
}

export default function FeaturedGrid4Col({
  sectionLabel = "Portfolio",
  title = "Propiedades Destacadas",
  viewAllText = "Ver Todas",
  viewAllHref = "#",
  properties = mockProperties.slice(0, 4),
  accentColor = "#c9a96e",
}: FeaturedGrid4ColProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
          </div>
          <a href={viewAllHref} className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: accentColor }}>
            {viewAllText} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {properties.map((p, i) => (
            <a key={p.id || i} href={p.href} className="group block">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={p.image} alt={`${p.title} — ${p.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                  <span className="text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-7 py-3 font-light">Ver</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                  <span className="text-xs tracking-[0.15em] font-light text-white/60">Ref: {p.ref}</span>
                </div>
              </div>
              <div className="pt-5 space-y-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <p className="text-xs tracking-[0.12em] uppercase font-light text-neutral-400">{p.location}</p>
                </div>
                <h3 className="text-lg font-light tracking-wide">{p.title}</h3>
                <p className="text-base font-normal" style={{ color: accentColor }}>{p.price}</p>
                <div className="flex items-center gap-5 pt-1 text-[13px] font-light text-neutral-400">
                  <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {p.beds}</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {p.baths}</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {p.sqm} m²</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
