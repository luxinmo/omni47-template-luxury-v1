import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { mockHeroSlides } from "@/data/mock-data";

interface HeroCarouselCenterProps {
  slides?: { image: string; headline: string; sub: string }[];
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  autoPlayInterval?: number;
  overlayGradient?: string;
}

export default function HeroCarouselCenter({
  slides = mockHeroSlides,
  ctaPrimaryText = "Ver Propiedades",
  ctaPrimaryHref = "#",
  ctaSecondaryText = "Vender con Nosotros",
  ctaSecondaryHref = "#",
  autoPlayInterval = 6000,
  overlayGradient = "linear-gradient(to top, rgba(26,23,20,0.6) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.25) 100%)",
}: HeroCarouselCenterProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  return (
    <section className="relative h-[60vh] sm:h-[80vh] lg:h-[100vh] min-h-[420px] flex items-center justify-center overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[2s] ease-in-out" style={{ opacity: currentSlide === i ? 1 : 0 }}>
          <img src={slide.image} alt={slide.headline} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" style={{ transform: currentSlide === i ? "scale(1.04)" : "scale(1)", transition: "transform 8s ease-out" }} />
        </div>
      ))}
      <div className="absolute inset-0" style={{ background: overlayGradient }} />
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.15] sm:leading-[1.2] mb-4 sm:mb-5 text-white" style={{ letterSpacing: "0.06em" }}>
          {slides[currentSlide].headline}
        </h1>
        <p className="text-[11px] sm:text-sm tracking-[0.25em] uppercase font-light mb-7 sm:mb-10 text-white/55">
          {slides[currentSlide].sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <a href={ctaPrimaryHref} className="w-full sm:w-auto bg-white text-neutral-900 text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2">
            {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
          </a>
          <a href={ctaSecondaryHref} className="w-full sm:w-auto border border-white/40 text-white text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-neutral-900 transition-all duration-300 backdrop-blur-sm text-center">
            {ctaSecondaryText}
          </a>
        </div>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 right-6 lg:right-12 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className="transition-all duration-500" style={{ width: currentSlide === i ? 36 : 18, height: 2, borderRadius: 1, background: currentSlide === i ? "#fff" : "rgba(255,255,255,0.25)" }} />
        ))}
      </div>
    </section>
  );
}
