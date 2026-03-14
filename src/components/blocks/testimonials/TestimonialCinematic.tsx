import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { mockTestimonials } from "@/data/mock-data";

interface TestimonialCinematicProps {
  testimonials?: { text: string; name: string; country: string }[];
  backgroundImage?: string;
  autoPlayInterval?: number;
  overlayOpacity?: number;
}

export default function TestimonialCinematic({
  testimonials = mockTestimonials.map(t => ({ text: t.text, name: t.name, country: t.country })),
  backgroundImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  autoPlayInterval = 5000,
  overlayOpacity = 0.55,
}: TestimonialCinematicProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), autoPlayInterval);
    return () => clearInterval(timer);
  }, [testimonials.length, autoPlayInterval]);

  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <img src={backgroundImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `rgba(26,23,20,${overlayOpacity})` }} />
      <div className="relative z-10 text-center px-5 max-w-3xl">
        <Quote className="w-8 h-8 mx-auto mb-6 text-white/20" strokeWidth={1} />
        <p className="text-lg sm:text-2xl md:text-3xl font-extralight leading-[1.5] italic text-white" style={{ letterSpacing: "0.03em" }}>
          "{testimonials[active].text}"
        </p>
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-sm tracking-[0.15em] uppercase font-light text-white/70">{testimonials[active].name}</span>
          <span className="text-xs tracking-[0.1em] font-light text-white/45">{testimonials[active].country}</span>
        </div>
        <div className="flex gap-2 justify-center mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="transition-all duration-500" style={{ width: i === active ? 24 : 8, height: 2, borderRadius: 1, background: i === active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
