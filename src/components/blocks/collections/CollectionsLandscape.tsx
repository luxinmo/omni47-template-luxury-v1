import { ArrowRight } from "lucide-react";
import { mockCollections } from "@/data/mock-data";

interface CollectionsLandscapeProps {
  sectionLabel?: string;
  title?: string;
  collections?: { label: string; image: string; href: string }[];
  accentColor?: string;
}

export default function CollectionsLandscape({
  sectionLabel = "Lifestyle",
  title = "Colecciones de Lujo",
  collections = mockCollections,
  accentColor = "#c9a96e",
}: CollectionsLandscapeProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {collections.map((c, i) => (
            <a key={i} href={c.href} className="group block relative overflow-hidden aspect-[16/10]">
              <img src={c.image} alt={c.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-[16px] font-light tracking-wide text-white">{c.label}</h3>
                <span className="text-xs tracking-[0.12em] uppercase font-light mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/70">
                  Explorar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
