interface TestimonialParallaxQuoteProps {
  backgroundImage?: string;
  sectionLabel?: string;
  quote?: string;
}

export default function TestimonialParallaxQuote({
  backgroundImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
  sectionLabel = "Nuestra Filosofía",
  quote = "Cada propiedad excepcional cuenta una historia. Nosotros seleccionamos las que merecen ser vividas.",
}: TestimonialParallaxQuoteProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4)" }} />
      <div className="relative z-10 text-center px-6 max-w-[700px]">
        <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase font-light mb-6">{sectionLabel}</p>
        <blockquote className="text-white text-[24px] sm:text-[32px] lg:text-[38px] font-extralight leading-[1.4] tracking-[0.01em] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          "{quote}"
        </blockquote>
        <div className="w-12 h-[1px] bg-white/30 mx-auto mt-8" />
      </div>
    </section>
  );
}
