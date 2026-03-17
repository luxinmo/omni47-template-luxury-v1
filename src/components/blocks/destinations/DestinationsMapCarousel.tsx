/**
 * DestinationsMapCarousel — Horizontal carousel of location cards
 * with map silhouette illustrations, description text, and property counts.
 * Inspired by luxury portal location browsers.
 */
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LocationItem {
  name: string;
  description: string;
  propertyCount: number;
  href: string;
}

interface DestinationsMapCarouselProps {
  sectionLabel?: string;
  title?: string;
  locations?: LocationItem[];
  countSuffix?: string;
}

const DEFAULT_LOCATIONS: LocationItem[] = [
  { name: "Alicante", description: "Find luxury properties in Alicante province", propertyCount: 879, href: "#" },
  { name: "Ibiza", description: "Find luxury properties in Cala Vadella, Santa Eulària, etc.", propertyCount: 157, href: "#" },
  { name: "Marbella", description: "Properties for sale in Marbella, Milla de Oro, Nueva Andalucía, etc.", propertyCount: 7, href: "#" },
  { name: "Calpe", description: "Luxury villas and apartments in Calpe with sea views", propertyCount: 138, href: "#" },
  { name: "Jávea", description: "Exclusive properties in Jávea, Montgo, Arenal and more", propertyCount: 87, href: "#" },
  { name: "Altea", description: "Find luxury homes in Altea, Sierra de Altea, Altea Hills", propertyCount: 64, href: "#" },
  { name: "Moraira", description: "Premium villas in Moraira, El Portet, Benimeit", propertyCount: 52, href: "#" },
  { name: "Dénia", description: "Properties in Dénia, Las Marinas, Montgo area", propertyCount: 71, href: "#" },
];

/* Simple abstract map silhouettes rendered as SVG */
const MAP_SHAPES: Record<string, React.ReactNode> = {
  Alicante: (
    <svg viewBox="0 0 120 90" className="w-full h-full">
      <path d="M20,70 Q25,20 50,25 Q65,10 85,30 Q100,45 95,65 Q80,80 60,75 Q35,85 20,70Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M40,45 Q45,35 55,40 Q60,38 58,45" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
  Ibiza: (
    <svg viewBox="0 0 120 90" className="w-full h-full">
      <path d="M30,60 Q25,35 45,25 Q60,18 75,30 Q90,40 85,55 Q75,70 55,68 Q35,72 30,60Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="45" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  Marbella: (
    <svg viewBox="0 0 120 90" className="w-full h-full">
      <path d="M15,50 Q20,25 45,20 Q70,15 90,30 Q105,45 95,60 Q75,75 50,70 Q25,68 15,50Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M45,40 L55,38 L60,42" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
  Calpe: (
    <svg viewBox="0 0 120 90" className="w-full h-full">
      <path d="M35,65 Q30,30 55,22 Q75,18 85,35 Q95,55 80,65 Q60,75 35,65Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M58,30 L60,22 L62,30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
};

const getMapShape = (name: string) => {
  if (MAP_SHAPES[name]) return MAP_SHAPES[name];
  // Generic fallback shape
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full">
      <path d="M25,60 Q20,30 50,20 Q75,15 90,35 Q100,50 85,65 Q65,78 40,72 Q28,70 25,60Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
};

export default function DestinationsMapCarousel({
  sectionLabel = "Explorar",
  title = "Buscar por Ubicación",
  locations = DEFAULT_LOCATIONS,
  countSuffix = "PROPERTIES",
}: DestinationsMapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector<HTMLElement>(":scope > a")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "next" ? cardW + 16 : -(cardW + 16), behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal text-luxury-gold">{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-[0.04em] text-foreground">{title}</h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative group/carousel">
          {/* Prev arrow */}
          <button
            onClick={() => scroll("prev")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full border border-border bg-background shadow-md flex items-center justify-center transition-all hover:shadow-lg ${canPrev ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => scroll("next")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full border border-border bg-background shadow-md flex items-center justify-center transition-all hover:shadow-lg ${canNext ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {locations.map((loc, i) => (
              <a
                key={loc.name || i}
                href={loc.href}
                className="group snap-start shrink-0 w-[260px] sm:w-[290px] bg-muted/40 border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 flex items-stretch"
              >
                {/* Map illustration */}
                <div className="w-[130px] sm:w-[140px] shrink-0 flex items-center justify-center p-5 text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                  {getMapShape(loc.name)}
                </div>

                {/* Text content */}
                <div className="flex-1 py-5 pr-5 flex flex-col justify-center min-w-0">
                  <h3 className="text-[14px] sm:text-[15px] font-medium tracking-[0.06em] uppercase text-foreground mb-1.5">
                    {loc.name}
                  </h3>
                  <p className="text-[12px] leading-[1.5] text-muted-foreground font-light line-clamp-2 mb-3">
                    {loc.description}
                  </p>
                  <p className="text-[13px] font-semibold tracking-[0.04em] text-primary">
                    {loc.propertyCount} {countSuffix}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
