import { useState, useEffect, useRef } from "react";
import { Bed, Bath, Maximize, ArrowRight, ArrowUpRight, Instagram, Linkedin, MessageCircle, ChevronDown } from "lucide-react";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

/* ─── Data ─── */
const BRAND = "PRESTIGE ESTATES";

const HERO_SLIDES = [
  { image: heroImg, headline: "Live Beyond\nOrdinary", sub: "Curated estates for those who seek the exceptional" },
  { image: prop1, headline: "Elevated\nUrban Living", sub: "Penthouses in the world's most coveted addresses" },
  { image: prop2, headline: "Coastal\nPerfection", sub: "Beachfront estates crafted for an unparalleled lifestyle" },
  { image: prop3, headline: "Mountain\nRetreats", sub: "Private sanctuaries surrounded by nature's grandeur" },
];

const PROPERTIES = [
  { image: prop1, name: "The Skyline Penthouse", location: "Manhattan, New York", price: "€12,500,000", beds: 5, baths: 4, sqm: 420 },
  { image: prop2, name: "Villa Blanca Sur Mer", location: "Costa Brava, Spain", price: "€8,900,000", beds: 6, baths: 5, sqm: 680 },
  { image: prop3, name: "Alpine Glass Retreat", location: "Zermatt, Switzerland", price: "€15,200,000", beds: 7, baths: 6, sqm: 950 },
];

const SERVICES = [
  { num: "01", title: "Exclusive Access", desc: "Off-market properties and private listings reserved solely for our clientele." },
  { num: "02", title: "Private Office", desc: "Complete confidentiality managed through our dedicated Private Office division." },
  { num: "03", title: "White-Glove Service", desc: "Personal advisors guiding every step with meticulous attention to detail." },
  { num: "04", title: "Expert Negotiation", desc: "Decades securing the finest terms for discerning buyers and sellers." },
];

const BLOG_POSTS = [
  { image: prop2, date: "26 Feb 2026", title: "An Insider's Guide to Mediterranean Coastal Living", excerpt: "The Mediterranean coast has evolved from a seasonal escape into a strategic lifestyle hub..." },
  { image: prop1, date: "25 Feb 2026", title: "Dual Demand Drives Dubai's Ultra-Prime Market Edge", excerpt: "Key insights on the $500K–$1M segment growing 70% year-over-year..." },
  { image: prop3, date: "24 Feb 2026", title: "A Majestic Alpine Estate Near Zermatt", excerpt: "This remarkable historic estate stands as one of Europe's most captivating properties..." },
];

const CONTACT = { email: "hello@prestigeestates.com", phone: "+34 600 000 000", city: "Marbella, Spain" };

const STATS = [
  { value: "347", label: "Properties for Sale" },
  { value: "€2.1B", label: "Portfolio Value" },
  { value: "120+", label: "Off-Market Listings" },
  { value: "25+", label: "Years of Experience" },
];

/* ─── Hooks ─── */
function useContainerScrolled(ref: React.RefObject<HTMLElement | null>, threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > threshold);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [ref, threshold]);
  return scrolled;
}

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
};

/* ─── Styles ─── */
const font = {
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'Outfit', 'Inter', system-ui, sans-serif",
};

const palette = {
  bg: "#F7F4F0",       // warm cream
  bgAlt: "#EDE8E1",    // slightly deeper stone
  text: "#2C2824",     // warm charcoal (NOT black)
  textMuted: "#8C8278", // warm grey
  textLight: "#B5ADA4", // lighter muted
  accent: "#8B7355",   // warm bronze/mocha
  border: "#DDD6CC",   // warm border
  white: "#FFFDF9",    // off-white
  footerBg: "#2C2824", // warm dark (not black)
};

/* ═══════════════════════════════════════════════════════════ */

const Home2LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrolled = useContainerScrolled(containerRef);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const NAV_LINKS = ["Properties", "Services", "About", "Journal", "Contact"];

  return (
    <div ref={containerRef} className="flex-1 overflow-auto relative" style={{ background: palette.bg, color: palette.text, fontFamily: font.body }}>

      {/* ─── NAVBAR ─── */}
      <nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${palette.white}f0` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04)" : "none",
          marginBottom: scrolled ? 0 : "-72px",
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 h-[72px]">
          {/* Logo */}
          <div className="flex flex-col">
            <span
              className="text-[15px] sm:text-[17px] tracking-[0.35em] font-light transition-colors duration-300"
              style={{ fontFamily: font.heading, color: scrolled ? palette.text : "#fff" }}
            >
              {BRAND}
            </span>
            <span
              className="text-[7px] tracking-[0.4em] uppercase font-light transition-colors duration-300"
              style={{ color: scrolled ? palette.textLight : "rgba(255,255,255,0.4)" }}
            >
              Luxury Real Estate
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[12px] tracking-[0.12em] uppercase font-light transition-colors duration-300 hover:opacity-70"
                style={{ color: scrolled ? palette.text : "#fff" }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 transition-all duration-300"
              style={{
                border: `1px solid ${scrolled ? palette.accent : "rgba(255,255,255,0.35)"}`,
                color: scrolled ? palette.accent : "#fff",
              }}
            >
              Book a Tour
            </a>
            <button
              className="lg:hidden transition-colors duration-300"
              style={{ color: scrolled ? palette.text : "#fff" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden animate-in slide-in-from-top-2 duration-200" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l} href="#" className="text-[13px] tracking-[0.12em] uppercase font-light py-3" style={{ color: palette.text, borderBottom: `1px solid ${palette.border}30` }}>{l}</a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-[60vh] sm:h-[75vh] lg:h-[90vh] min-h-[450px] flex items-end overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[2s] ease-in-out" style={{ opacity: currentSlide === i ? 1 : 0 }}>
            <img src={slide.image} alt="" className="w-full h-full object-cover" style={{ transform: currentSlide === i ? "scale(1.06)" : "scale(1)", transition: "transform 8s ease-out" }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,40,36,0.65) 0%, rgba(44,40,36,0.05) 50%, rgba(44,40,36,0.15) 100%)" }} />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <FadeIn>
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase mb-4 sm:mb-6 font-light" style={{ color: "rgba(255,255,255,0.45)", fontFamily: font.body }}>
              The World's Finest Properties
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-5 sm:mb-7 whitespace-pre-line"
              style={{ color: "#fff", fontFamily: font.heading, letterSpacing: "-0.02em" }}
            >
              {HERO_SLIDES[currentSlide].headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-sm sm:text-base max-w-md mb-7 sm:mb-10 font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: font.body }}>
              {HERO_SLIDES[currentSlide].sub}
            </p>
          </FadeIn>
          <FadeIn delay={0.38}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent, color: "#fff" }}
              >
                Explore Collection <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-light px-8 py-3.5 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
              >
                Private Tour
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-5 sm:bottom-8 right-6 lg:right-12 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="transition-all duration-500" style={{ width: currentSlide === i ? 32 : 16, height: 2, borderRadius: 2, background: currentSlide === i ? "#fff" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.white }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            <FadeIn className="md:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase mb-3 font-medium" style={{ color: palette.accent }}>About Us</p>
              <h2 className="text-2xl md:text-3xl font-light leading-[1.2]" style={{ fontFamily: font.heading }}>
                A Legacy of Excellence
              </h2>
            </FadeIn>
            <FadeIn className="md:col-span-8" delay={0.1}>
              <p className="text-[14px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                Prestige Estates is a curated luxury real estate advisory specialising in the most exclusive properties across Ibiza and the Costa Blanca. From breathtaking seafront villas and penthouses to prestigious golf-side estates and new-build residences, we offer a bespoke service built on trust, discretion, and an uncompromising eye for quality.
              </p>
              <div className="mt-6 h-[1px]" style={{ background: `linear-gradient(to right, ${palette.accent}40, transparent)` }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-14 md:py-18" style={{ background: palette.bgAlt }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-[2.75rem] font-light" style={{ fontFamily: font.heading, color: palette.accent }}>{s.value}</p>
                  <p className="text-[11px] tracking-[0.12em] uppercase mt-2 font-light" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-10 sm:mb-14">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase mb-2 font-medium" style={{ color: palette.accent }}>Portfolio</p>
                <h2 className="text-2xl md:text-4xl font-light" style={{ fontFamily: font.heading }}>Featured Properties</h2>
              </div>
              <a href="#" className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROPERTIES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/5]" style={{ borderRadius: 4 }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center" style={{ background: "rgba(44,40,36,0.35)" }}>
                      <span className="text-[11px] tracking-[0.2em] uppercase text-white border border-white/50 px-5 py-2.5 backdrop-blur-sm">View Details</span>
                    </div>
                  </div>
                  <div className="pt-4 space-y-1.5">
                    <p className="text-[10px] tracking-[0.18em] uppercase font-light" style={{ color: palette.textLight }}>{p.location}</p>
                    <h3 className="text-[17px] font-light" style={{ fontFamily: font.heading }}>{p.name}</h3>
                    <p className="text-[15px] font-normal" style={{ color: palette.accent }}>{p.price}</p>
                    <div className="flex items-center gap-4 pt-1 text-[11px] font-light" style={{ color: palette.textMuted }}>
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths}</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {p.sqm} m²</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10 sm:hidden">
              <a href="#" className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase font-medium" style={{ color: palette.accent }}>
                View All Properties <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.35em] uppercase mb-3 font-medium" style={{ color: palette.accent }}>Why Choose Us</p>
              <h2 className="text-2xl md:text-4xl font-light" style={{ fontFamily: font.heading }}>A Standard Apart</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: palette.border }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 md:p-10 group transition-colors duration-500 hover:bg-white/80" style={{ background: palette.white }}>
                  <span className="text-[11px] font-medium tracking-wider block mb-4" style={{ color: palette.accent }}>{s.num}</span>
                  <h3 className="text-[18px] font-light mb-3" style={{ fontFamily: font.heading }}>{s.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNAL / BLOG ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-10 sm:mb-14">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase mb-2 font-medium" style={{ color: palette.accent }}>Insights</p>
                <h2 className="text-2xl md:text-4xl font-light" style={{ fontFamily: font.heading }}>The Journal</h2>
              </div>
              <a href="#" className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                All Articles <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <a href="#" className="group block">
                  <div className="overflow-hidden aspect-[3/2]" style={{ borderRadius: 4 }}>
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="pt-4 space-y-2">
                    <span className="text-[10px] tracking-[0.18em] uppercase font-light" style={{ color: palette.textLight }}>{post.date}</span>
                    <h4 className="text-[16px] font-light leading-[1.35] group-hover:opacity-70 transition-opacity" style={{ fontFamily: font.heading }}>{post.title}</h4>
                    <p className="text-[12px] leading-[1.7] font-light line-clamp-2" style={{ color: palette.textMuted }}>{post.excerpt}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.bgAlt }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase mb-3 font-medium" style={{ color: palette.accent }}>Stay Informed</p>
            <h2 className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: font.heading }}>The Private List</h2>
            <p className="text-[13px] font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
              Receive exclusive off-market listings, market insights and invitations to private viewings — delivered discreetly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3.5 text-[13px] focus:outline-none transition-colors duration-300"
                style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-90 whitespace-nowrap"
                style={{ background: palette.accent, color: "#fff" }}
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] mt-4 font-light" style={{ color: palette.textLight }}>We respect your privacy. Unsubscribe at any time.</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: palette.footerBg }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div>
              <span className="text-[15px] tracking-[0.3em] font-light block mb-3" style={{ fontFamily: font.heading, color: "#fff" }}>{BRAND}</span>
              <p className="text-[12px] leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
                Curating extraordinary homes for exceptional lives since 2010.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Quick Links</h4>
              <ul className="space-y-2.5">
                {["Properties", "Services", "About Us", "Contact", "Privacy"].map((l) => (
                  <li key={l}><a href="#" className="text-[12px] font-light transition-colors duration-300 hover:text-white/60" style={{ color: "rgba(255,255,255,0.25)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Contact</h4>
              <ul className="space-y-2.5 text-[12px] font-light" style={{ color: "rgba(255,255,255,0.25)" }}>
                <li>{CONTACT.email}</li>
                <li>{CONTACT.phone}</li>
                <li>{CONTACT.city}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Follow</h4>
              <div className="flex gap-3">
                {[Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:border-white/25" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] tracking-wider font-light" style={{ color: "rgba(255,255,255,0.15)" }}>© 2025 {BRAND}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home2LandingPage;
