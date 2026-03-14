import { ArrowUpRight } from "lucide-react";
import { mockDestinations } from "@/data/mock-data";

interface DestinationsAsymmetricProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
  viewAllText?: string;
  viewAllHref?: string;
  destinations?: { name: string; propertyCount: number; image: string; tagline: string }[];
}

export default function DestinationsAsymmetric({
  sectionLabel = "Explorar",
  title = "Featured",
  titleItalic = "Destinations",
  viewAllText = "All destinations",
  viewAllHref = "#",
  destinations = mockDestinations,
}: DestinationsAsymmetricProps) {
  return (
    <section className="bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-neutral-300" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">{sectionLabel}</p>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
              {title}<br />
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{titleItalic}</span>
            </h2>
          </div>
          <a href={viewAllHref} className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group">
            {viewAllText} <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {destinations.map((d, i) => (
            <div key={d.name || i} className={`group relative overflow-hidden cursor-pointer ${i < 2 ? "lg:col-span-2 aspect-[16/10]" : "aspect-[3/4]"}`}>
              <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 group-hover:from-black/70" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-light mb-1">{d.tagline}</p>
                <h3 className="text-white text-[22px] sm:text-[28px] font-extralight tracking-[0.02em]">{d.name}</h3>
                <p className="text-white/50 text-[12px] tracking-[0.1em] font-light mt-1">{d.propertyCount} properties</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
