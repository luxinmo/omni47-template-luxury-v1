import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Twitter, ArrowRight, ArrowUpRight, Play, ChevronDown } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";

import portalHero from "@/assets/portal-hero.jpg";
import destIbiza from "@/assets/dest-ibiza.jpg";
import destMallorca from "@/assets/dest-mallorca.jpg";
import destMarbella from "@/assets/dest-marbella.jpg";
import destCostaBlanca from "@/assets/dest-costa-blanca.jpg";
import destBarcelona from "@/assets/dest-barcelona.jpg";
import destMadrid from "@/assets/dest-madrid.jpg";
import propVillaIbiza from "@/assets/prop-villa-ibiza.jpg";
import propPenthouseMarbella from "@/assets/prop-penthouse-marbella.jpg";
import propEstateMallorca from "@/assets/prop-estate-mallorca.jpg";
import investHotel from "@/assets/invest-hotel.jpg";
import investDevelopment from "@/assets/invest-development.jpg";
import magazineMain from "@/assets/magazine-main.jpg";
import catBeachfront from "@/assets/cat-beachfront.jpg";
import catGolf from "@/assets/cat-golf.jpg";
import catLuxuryVillas from "@/assets/cat-luxury-villas.jpg";
import catSpa from "@/assets/cat-spa.jpg";
import catFincas from "@/assets/cat-fincas.jpg";
import catOffmarket from "@/assets/cat-offmarket.jpg";

/* ─── Fade-in on scroll ─── */
const FadeSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s` }}>
      {children}
    </div>
  );
};

/* ─── Data ─── */
const COLLECTIONS = [
  { name: "Primera línea del mar", tag: "Beachfront", img: catBeachfront },
  { name: "Cerca del golf", tag: "Golf", img: catGolf },
  { name: "Luxury Villas +3M", tag: "Ultra Luxury", img: catLuxuryVillas },
  { name: "With SPA", tag: "Wellness", img: catSpa },
  { name: "Fincas", tag: "Country Estates", img: catFincas },
  { name: "Off-Market", tag: "Exclusive", img: catOffmarket },
];

const DESTINATIONS = [
  { name: "Ibiza", img: destIbiza, count: 124, tagline: "Island of Light" },
  { name: "Mallorca", img: destMallorca, count: 208, tagline: "Mediterranean Jewel" },
  { name: "Marbella", img: destMarbella, count: 176, tagline: "Golden Coast" },
  { name: "Costa Blanca", img: destCostaBlanca, count: 95, tagline: "White Shores" },
  { name: "Barcelona", img: destBarcelona, count: 142, tagline: "Urban Elegance" },
  { name: "Madrid", img: destMadrid, count: 163, tagline: "Capital Grandeur" },
];

const PROPERTIES = [
  { title: "Modern Sea View Villa", location: "Ibiza", price: "€3,200,000", beds: 5, baths: 4, sqm: 420, img: propVillaIbiza },
  { title: "Luxury Penthouse", location: "Marbella", price: "€2,850,000", beds: 4, baths: 3, sqm: 310, img: propPenthouseMarbella },
  { title: "Private Estate", location: "Mallorca", price: "€5,400,000", beds: 7, baths: 6, sqm: 850, img: propEstateMallorca },
];

const INVESTMENTS = [
  { title: "Investment Properties", desc: "High-yield luxury assets in prime locations across the Mediterranean.", img: propVillaIbiza, label: "From €1.2M" },
  { title: "Boutique Hotels", desc: "Exclusive hotel opportunities with proven returns.", img: investHotel, label: "8-12% ROI" },
  { title: "Off-Market Deals", desc: "Discreet access to properties not publicly listed.", img: destMarbella, label: "Private" },
  { title: "Development Projects", desc: "New-build projects with strong capital growth.", img: investDevelopment, label: "Pre-launch" },
];

const MAGAZINE_ARTICLES = [
  { title: "Luxury Real Estate Market Trends for 2026", category: "Market Insight", date: "Mar 2026", readTime: "8 min", img: magazineMain, large: true },
  { title: "Best Destinations for High-End Property Investment", category: "Investment", date: "Feb 2026", readTime: "6 min", img: destBarcelona },
  { title: "Architectural Trends in Luxury Villas", category: "Architecture", date: "Jan 2026", readTime: "5 min", img: propPenthouseMarbella },
  { title: "The Rise of Sustainable Luxury Living", category: "Lifestyle", date: "Dec 2025", readTime: "7 min", img: destMallorca },
];

const STATS = [
  { number: "2,400+", label: "Luxury Properties" },
  { number: "€8.2B", label: "Portfolio Value" },
  { number: "6", label: "Prime Destinations" },
  { number: "98%", label: "Client Satisfaction" },
];

const NAV_ITEMS = ["Properties", "Destinations", "Investments", "Off-Market", "Magazine", "About"];

const FOOTER_COLS = [
  { title: "Properties", links: ["For Sale", "For Rent", "New Developments", "Off-Market"] },
  { title: "Destinations", links: ["Ibiza", "Mallorca", "Marbella", "Barcelona", "Madrid"] },
  { title: "Investments", links: ["Investment Properties", "Boutique Hotels", "Development Projects"] },
  { title: "Magazine", links: ["Market Trends", "Architecture", "Lifestyle", "Investment Guides"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
];

/* ─── Component ─── */
const HomePortal = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Jost', sans-serif" }}>
      <SEOHead
        title="LuxuryWorldPortal — Global Marketplace for Exceptional Real Estate"
        description="Discover luxury properties, investment opportunities and exclusive real estate in the world's most prestigious destinations."
      />

      {/* ══════ NAVBAR ══════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : ""}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-16 h-[80px]">
          <Link to="/portal" className={`text-[18px] tracking-[0.4em] font-extralight transition-colors duration-500 ${scrolled ? "text-neutral-900" : "text-white"}`}>
            LUXURYWORLDPORTAL
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button key={item} className={`text-[11px] tracking-[0.18em] uppercase font-light transition-colors duration-500 ${scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-white/70 hover:text-white"}`}>
                {item}
              </button>
            ))}
          </div>
          <button className={`lg:hidden transition-colors duration-500 ${scrolled ? "text-neutral-900" : "text-white"}`} onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        {mobileNav && (
          <div className="lg:hidden bg-white border-t border-neutral-100">
            <div className="px-6 py-8 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button key={item} className="text-left text-[14px] tracking-[0.08em] font-light py-3 text-neutral-700 border-b border-neutral-50 hover:text-neutral-900 transition-colors" onClick={() => setMobileNav(false)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <img src={portalHero} alt="Luxury Mediterranean villa with infinity pool at sunset" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/50" strokeWidth={1} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-[1440px] mx-auto">
          <div className="max-w-[800px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-white/40" />
              <span className="text-white/60 text-[11px] tracking-[0.5em] uppercase font-light">
                Est. 2024 — Mediterranean & Beyond
              </span>
            </div>
            <h1 className="text-white text-[48px] sm:text-[64px] lg:text-[80px] font-extralight leading-[0.95] tracking-[-0.02em] mb-8">
              Luxury<br />
              <span className="italic font-light" style={{ fontFamily: "'Playfair Display', serif" }}>World</span><br />
              Portal
            </h1>
            <p className="text-white/60 text-[15px] sm:text-[17px] font-light leading-[1.7] max-w-[480px] mb-12">
              Curating the world's most exceptional properties. From Mediterranean villas to private estates — discover real estate that transcends the ordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group px-10 py-4 bg-white text-neutral-900 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-neutral-50 transition-all duration-300 flex items-center gap-3">
                Explore Properties
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="px-10 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-light hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                View Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <FadeSection>
        <section className="border-b border-neutral-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-neutral-100">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:px-8">
                  <p className="text-[32px] sm:text-[40px] font-extralight text-neutral-900 tracking-[-0.02em] mb-1">{s.number}</p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ══════ COLLECTIONS / BROWSE BY LIFESTYLE ══════ */}
      <FadeSection>
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-neutral-300" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Collections</p>
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
                Browse by<br />
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Lifestyle</span>
              </h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group">
              View all collections <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {COLLECTIONS.map((c, i) => (
              <FadeSection key={c.name} delay={i * 0.08}>
                <div className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
                  <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-all duration-500 group-hover:from-black/70" />
                  <div className="absolute top-5 left-5">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-light bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">{c.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-white text-[16px] sm:text-[20px] font-light tracking-[0.02em] leading-tight">{c.name}</h3>
                    <div className="mt-3 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-light">Explore</span>
                      <ArrowRight className="w-3 h-3 text-white/60" />
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* ══════ DESTINATIONS ══════ */}
      <FadeSection>
        <section className="bg-neutral-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-neutral-300" />
                  <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Explore</p>
                </div>
                <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
                  Featured<br />
                  <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Destinations</span>
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group">
                All destinations <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
            {/* Asymmetric grid: 2 large + 4 small */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {DESTINATIONS.map((d, i) => (
                <FadeSection key={d.name} delay={i * 0.06} className={i < 2 ? "lg:col-span-2" : ""}>
                  <div className={`group relative overflow-hidden cursor-pointer ${i < 2 ? "aspect-[16/10]" : "aspect-[3/4]"}`}>
                    <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 group-hover:from-black/70" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-light mb-1">{d.tagline}</p>
                      <h3 className="text-white text-[22px] sm:text-[28px] font-extralight tracking-[0.02em]">{d.name}</h3>
                      <p className="text-white/50 text-[12px] tracking-[0.1em] font-light mt-1">{d.count} properties</p>
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ══════ FEATURED PROPERTIES ══════ */}
      <FadeSection>
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-neutral-300" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Curated Selection</p>
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
                Featured<br />
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Properties</span>
              </h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group">
              View all <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PROPERTIES.map((p, i) => (
              <FadeSection key={p.title} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light mb-2">{p.location}</p>
                  <h3 className="text-[18px] sm:text-[22px] font-extralight text-neutral-900 tracking-[0.01em] mb-3 group-hover:text-neutral-500 transition-colors duration-300">{p.title}</h3>
                  <p className="text-[16px] font-light text-neutral-900 mb-4">{p.price}</p>
                  <div className="flex gap-4 text-[11px] text-neutral-400 font-light tracking-wide">
                    <span>{p.beds} Beds</span>
                    <span className="text-neutral-200">·</span>
                    <span>{p.baths} Baths</span>
                    <span className="text-neutral-200">·</span>
                    <span>{p.sqm} m²</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* ══════ PARALLAX QUOTE ══════ */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <img src={catLuxuryVillas} alt="Luxury architecture" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4)" }} />
        <FadeSection className="relative z-10 text-center px-6 max-w-[700px]">
          <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase font-light mb-6">Our Philosophy</p>
          <blockquote className="text-white text-[24px] sm:text-[32px] lg:text-[38px] font-extralight leading-[1.4] tracking-[0.01em] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Every exceptional property tells a story. We curate the ones worth living."
          </blockquote>
          <div className="w-12 h-[1px] bg-white/30 mx-auto mt-8" />
        </FadeSection>
      </section>

      {/* ══════ INVESTMENT OPPORTUNITIES ══════ */}
      <FadeSection>
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-neutral-300" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Opportunities</p>
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
                Investment<br />
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Opportunities</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INVESTMENTS.map((inv, i) => (
              <FadeSection key={inv.title} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-5 relative">
                    <img src={inv.img} alt={inv.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] tracking-[0.2em] uppercase font-medium bg-white text-neutral-900 px-3 py-1.5">{inv.label}</span>
                    </div>
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] font-light text-neutral-900 tracking-[0.01em] mb-2 group-hover:text-neutral-500 transition-colors duration-300">{inv.title}</h3>
                  <p className="text-[13px] font-light text-neutral-400 leading-relaxed">{inv.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* ══════ MAGAZINE ══════ */}
      <FadeSection>
        <section className="bg-neutral-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-neutral-300" />
                  <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Editorial</p>
                </div>
                <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
                  The<br />
                  <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Magazine</span>
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group">
                All articles <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Large article */}
              <FadeSection>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img src={MAGAZINE_ARTICLES[0].img} alt={MAGAZINE_ARTICLES[0].title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-900 font-medium bg-neutral-200 px-2.5 py-1">{MAGAZINE_ARTICLES[0].category}</span>
                    <span className="text-[11px] tracking-[0.1em] text-neutral-400 font-light">{MAGAZINE_ARTICLES[0].date}</span>
                    <span className="text-neutral-200">·</span>
                    <span className="text-[11px] tracking-[0.1em] text-neutral-400 font-light">{MAGAZINE_ARTICLES[0].readTime}</span>
                  </div>
                  <h3 className="text-[24px] sm:text-[28px] font-extralight text-neutral-900 leading-[1.3] group-hover:text-neutral-500 transition-colors duration-300">{MAGAZINE_ARTICLES[0].title}</h3>
                </div>
              </FadeSection>
              {/* Small articles */}
              <div className="flex flex-col gap-8 lg:gap-10">
                {MAGAZINE_ARTICLES.slice(1).map((a, i) => (
                  <FadeSection key={a.title} delay={i * 0.1}>
                    <div className="group cursor-pointer flex gap-5 sm:gap-6">
                      <div className="w-[130px] sm:w-[180px] flex-shrink-0 aspect-[4/3] overflow-hidden">
                        <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-900 font-medium bg-neutral-200 px-2 py-0.5">{a.category}</span>
                          <span className="text-[10px] tracking-[0.1em] text-neutral-400 font-light">{a.readTime}</span>
                        </div>
                        <h3 className="text-[15px] sm:text-[17px] font-light text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors duration-300">{a.title}</h3>
                        <span className="text-[11px] text-neutral-300 font-light mt-2">{a.date}</span>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ══════ NEWSLETTER ══════ */}
      <FadeSection>
        <section className="border-t border-neutral-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
            <div className="max-w-[640px] mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-neutral-300" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">Newsletter</p>
                <div className="w-8 h-[1px] bg-neutral-300" />
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-extralight text-neutral-900 mb-4 leading-[1.2]">
                Stay <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Informed</span>
              </h2>
              <p className="text-[14px] font-light text-neutral-400 leading-relaxed mb-10">
                Receive curated insights on global luxury real estate, market trends, and exclusive off-market opportunities directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 border border-neutral-200 text-[13px] font-light placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
                />
                <button className="px-10 py-4 bg-neutral-900 text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-800 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-neutral-300 font-light mt-4">By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-neutral-900 mb-5">{col.title}</p>
                {col.links.map((link) => (
                  <button key={link} className="block text-[13px] font-light text-neutral-400 hover:text-neutral-900 transition-colors py-1.5">
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-neutral-100">
            <span className="text-[12px] tracking-[0.35em] font-extralight text-neutral-400">LUXURYWORLDPORTAL</span>
            <div className="flex gap-2">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-neutral-700 transition-colors">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-neutral-300 font-light">© {new Date().getFullYear()} LuxuryWorldPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePortal;
