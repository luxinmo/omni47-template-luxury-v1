import { ArrowRight, ArrowUpRight } from "lucide-react";
import { mockCollections } from "@/data/mock-data";

interface CollectionsTaggedProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
  viewAllText?: string;
  viewAllHref?: string;
  collections?: { label: string; image: string; tag: string; href: string }[];
}

export default function CollectionsTagged({
  sectionLabel = "Collections",
  title = "Browse by",
  titleItalic = "Lifestyle",
  viewAllText = "View all collections",
  viewAllHref = "#",
  collections = mockCollections,
}: CollectionsTaggedProps) {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {collections.map((c, i) => (
          <a key={i} href={c.href} className="group relative aspect-[4/3] overflow-hidden cursor-pointer block">
            <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-all duration-500 group-hover:from-black/70" />
            <div className="absolute top-5 left-5">
              <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-light bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">{c.tag}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-[16px] sm:text-[20px] font-light tracking-[0.02em] leading-tight">{c.label}</h3>
              <div className="mt-3 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-light">Explorar</span>
                <ArrowRight className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
