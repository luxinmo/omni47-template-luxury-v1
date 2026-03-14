import { Crown } from "lucide-react";

interface BrandedFullwidthProps {
  backgroundImage?: string;
  badgeText?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  countText?: string;
  accentColor?: string;
}

export default function BrandedFullwidth({
  backgroundImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  badgeText = "Five-Star Living",
  title = "Branded Residences",
  description = "Vive dentro de las marcas de hospitalidad más prestigiosas del mundo. Descubre residencias exclusivas de Four Seasons, Ritz-Carlton, Mandarin Oriental y más — ofreciendo servicios cinco estrellas, amenidades de clase mundial y excepcional valor de inversión.",
  ctaText = "Descubrir Branded Residences",
  ctaHref = "#",
  countText = "15+ proyectos de branded residences disponibles",
  accentColor = "#c9a96e",
}: BrandedFullwidthProps) {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <img src={backgroundImage} alt="Branded residence" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,24,22,0.75) 0%, rgba(26,24,22,0.45) 50%, rgba(26,24,22,0.75) 100%)" }} />
      <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full" style={{ background: `${accentColor}1f`, border: `1px solid ${accentColor}40` }}>
          <Crown className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-[11px] tracking-[0.25em] uppercase font-normal" style={{ color: accentColor }}>{badgeText}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] mb-6" style={{ letterSpacing: "0.06em" }}>
          {title}
        </h2>
        <p className="text-[15px] sm:text-base leading-[1.9] font-light max-w-2xl mx-auto mb-10 text-white/65">
          {description}
        </p>
        <a href={ctaHref} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90" style={{ background: accentColor, color: "#1a1816" }}>
          <Crown className="w-4 h-4" /> {ctaText}
        </a>
        {countText && (
          <p className="text-xs font-light mt-8 text-white/35">
            <span style={{ color: accentColor }} className="font-normal">15+</span> {countText.replace("15+ ", "")}
          </p>
        )}
      </div>
    </section>
  );
}
