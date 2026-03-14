import { ArrowRight } from "lucide-react";

interface IntroSplitImageProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
  paragraphs?: string[];
  ctaText?: string;
  ctaHref?: string;
  ctaNote?: string;
  image?: string;
  overlayValue?: string;
  overlayLabel?: string;
}

export default function IntroSplitImage({
  sectionLabel = "Acceso",
  title = "Your gateway to",
  titleItalic = "exceptional",
  paragraphs = [
    "Somos el marketplace global definitivo dedicado exclusivamente al inmobiliario de lujo por encima de €1.000.000. Conectamos compradores exigentes e inversores con las mejores propiedades del Mediterráneo y más allá.",
    "Cada propiedad listada en nuestra plataforma ha sido personalmente verificada por nuestro equipo de especialistas.",
  ],
  ctaText = "Solicitar Acceso",
  ctaHref = "#",
  ctaNote = "Solo propiedades por encima de €1M",
  image = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  overlayValue = "€1M+",
  overlayLabel = "Precio mínimo de listado",
}: IntroSplitImageProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-neutral-300" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">{sectionLabel}</p>
          </div>
          <h2 className="text-[26px] sm:text-[36px] lg:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.2] mb-8">
            {title}<br />
            <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{titleItalic}</span> real estate
          </h2>
          <div className="space-y-5 text-[14px] sm:text-[15px] font-light text-neutral-500 leading-[1.8]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a href={ctaHref} className="group px-8 py-3.5 bg-neutral-900 text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-800 transition-colors flex items-center gap-3">
              {ctaText} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            {ctaNote && <span className="text-[12px] text-neutral-300 font-light tracking-wide">{ctaNote}</span>}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          {overlayValue && (
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-5 sm:p-8 shadow-lg max-w-[220px] sm:max-w-[260px]">
              <p className="text-[28px] sm:text-[36px] font-extralight text-neutral-900 tracking-[-0.02em] mb-1">{overlayValue}</p>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light">{overlayLabel}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
