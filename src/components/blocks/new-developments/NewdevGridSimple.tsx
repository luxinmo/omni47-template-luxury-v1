import { MapPin } from "lucide-react";
import { mockNewDevelopments } from "@/data/mock-data";

interface NewdevGridSimpleProps {
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllHref?: string;
  developments?: { image: string; name: string; location: string; priceFrom: string; units: number; completion: string }[];
  accentColor?: string;
}

export default function NewdevGridSimple({
  sectionLabel = "Obra Nueva",
  title = "Nuevas Promociones",
  subtitle = "Explora proyectos residenciales exclusivos y propiedades sobre plano en ubicaciones prime del Mediterráneo.",
  viewAllText = "Ver Todas",
  viewAllHref = "#",
  developments = mockNewDevelopments,
  accentColor = "#c9a96e",
}: NewdevGridSimpleProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-neutral-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
            {subtitle && <p className="text-[14px] font-light mt-3 max-w-lg text-neutral-400">{subtitle}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {developments.map((d, i) => (
            <div key={i} className="group cursor-pointer bg-white">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img src={d.image} alt={`${d.name} — ${d.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]" />
                <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: accentColor }}>
                  <span className="text-xs tracking-[0.15em] uppercase font-light text-white">Obra Nueva</span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm">
                  <span className="text-xs font-light text-neutral-900">{d.completion}</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <p className="text-xs tracking-[0.1em] uppercase font-light text-neutral-400">{d.location}</p>
                </div>
                <h3 className="text-lg font-light tracking-wide">{d.name}</h3>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-base font-normal" style={{ color: accentColor }}>{d.priceFrom}</p>
                  <span className="text-sm font-light text-neutral-400">{d.units} unidades</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
