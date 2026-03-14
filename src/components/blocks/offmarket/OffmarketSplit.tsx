import { Lock, EyeOff } from "lucide-react";

interface OffmarketSplitProps {
  badgeText?: string;
  sectionLabel?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  countText?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  accentColor?: string;
}

export default function OffmarketSplit({
  badgeText = "Off-Market",
  sectionLabel = "Privado y Confidencial",
  title = "Colección\nOff-Market",
  description = "No todas las propiedades están disponibles públicamente. Nuestra colección off-market presenta listados exclusivos mostrados solo a compradores verificados a través de nuestra red privada.",
  ctaText = "Solicitar Acceso",
  ctaHref = "#",
  countText = "120+ propiedades off-market disponibles actualmente",
  backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  backgroundColor = "#1e1c1a",
  accentColor = "#c9a96e",
}: OffmarketSplitProps) {
  return (
    <section style={{ background: backgroundColor }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
          <div className="relative overflow-hidden min-h-[360px] md:min-h-[560px]">
            <img src={backgroundImage} alt="Exclusive off-market property" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(to right, transparent 30%, ${backgroundColor}f2 100%)` }} />
            <div className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(to bottom, transparent 40%, ${backgroundColor}e6 100%)` }} />
            <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5" style={{ background: `${backgroundColor}b3`, backdropFilter: "blur(12px)" }}>
              <EyeOff className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span className="text-xs tracking-[0.15em] uppercase font-normal" style={{ color: accentColor }}>{badgeText}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-20">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-[1px]" style={{ background: accentColor }} />
              <p className="text-xs tracking-[0.3em] uppercase font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extralight leading-[1.1] mb-6 text-white whitespace-pre-line" style={{ letterSpacing: "0.06em" }}>
              {title}
            </h2>
            <p className="text-[15px] leading-[1.9] font-light mb-10 text-white/55">
              {description}
            </p>
            <a href={ctaHref} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-500 hover:opacity-90 self-start" style={{ background: accentColor, color: backgroundColor }}>
              <Lock className="w-4 h-4" /> {ctaText}
            </a>
            {countText && (
              <p className="text-xs font-light mt-8 text-white/30">
                <span style={{ color: accentColor }} className="font-normal">120+</span> {countText.replace("120+ ", "")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
