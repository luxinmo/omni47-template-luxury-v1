import { mockDestinations } from "@/data/mock-data";

interface DestinationsGridTallProps {
  sectionLabel?: string;
  title?: string;
  destinations?: { name: string; propertyCount: number; image: string; href: string }[];
  accentColor?: string;
  propertyCountSuffix?: string;
}

export default function DestinationsGridTall({
  sectionLabel = "Explorar",
  title = "Buscar por Destino",
  destinations = mockDestinations,
  accentColor = "#c9a96e",
  propertyCountSuffix = "propiedades",
}: DestinationsGridTallProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {destinations.map((d, i) => (
            <a key={d.name || i} href={d.href} className="group block relative overflow-hidden aspect-[2/3]">
              <img src={d.image} alt={`${d.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-[15px] font-light tracking-wide text-white mb-1">{d.name}</h3>
                <p className="text-xs font-light text-white/55">{d.propertyCount} {propertyCountSuffix}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
