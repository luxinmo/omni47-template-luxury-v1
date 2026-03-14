import { ArrowUpRight } from "lucide-react";
import { mockProperties } from "@/data/mock-data";

interface FeaturedGridPortraitProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
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
  }[];
}

export default function FeaturedGridPortrait({
  sectionLabel = "Curated Selection",
  title = "Featured",
  titleItalic = "Properties",
  viewAllText = "View all",
  viewAllHref = "#",
  properties = mockProperties.slice(0, 3),
}: FeaturedGridPortraitProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {properties.map((p, i) => (
          <div key={p.id || i} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>
              </div>
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light mb-2">{p.location}</p>
            <h3 className="text-[18px] sm:text-[22px] font-extralight text-neutral-900 tracking-[0.01em] mb-3 group-hover:text-neutral-500 transition-colors duration-300">{p.title}</h3>
            <p className="text-[16px] font-light text-neutral-900 mb-4">{p.price}</p>
            <div className="flex gap-4 text-[11px] text-neutral-400 font-light tracking-wide">
              <span>{p.beds} Beds</span>
              <span className="text-neutral-200">·</span>
              <span>{p.baths} Baths</span>
              <span className="text-neutral-200">·</span>
              <span>{p.sqm} m²</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
