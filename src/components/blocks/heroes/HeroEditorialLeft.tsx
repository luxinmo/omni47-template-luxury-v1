import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroEditorialLeftProps {
  backgroundImage?: string;
  badgeText?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  showScrollIndicator?: boolean;
}

export default function HeroEditorialLeft({
  backgroundImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
  badgeText = "Est. 2024 — Mediterranean & Beyond",
  titleLine1 = "Luxury",
  titleLine2 = "World",
  titleLine3 = "Portal",
  description = "Curating the world's most exceptional properties. From Mediterranean villas to private estates — discover real estate that transcends the ordinary.",
  ctaPrimaryText = "Explorar Propiedades",
  ctaPrimaryHref = "#",
  ctaSecondaryText = "Ver Destinos",
  ctaSecondaryHref = "#",
  showScrollIndicator = true,
}: HeroEditorialLeftProps) {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />

      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/50" strokeWidth={1} />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-[1440px] mx-auto">
        <div className="max-w-[800px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-white/40" />
            <span className="text-white/60 text-[11px] tracking-[0.5em] uppercase font-light">
              {badgeText}
            </span>
          </div>
          <h1 className="text-white text-[48px] sm:text-[64px] lg:text-[80px] font-extralight leading-[0.95] tracking-[-0.02em] mb-8">
            {titleLine1}<br />
            <span className="italic font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{titleLine2}</span><br />
            {titleLine3}
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[17px] font-light leading-[1.7] max-w-[480px] mb-12">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={ctaPrimaryHref} className="group px-10 py-4 bg-white text-neutral-900 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-neutral-50 transition-all duration-300 flex items-center gap-3">
              {ctaPrimaryText}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={ctaSecondaryHref} className="px-10 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-light hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              {ctaSecondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
