import { useState, useEffect } from "react";
import { Bed, Bath, Maximize, ArrowRight, ArrowUpRight, Lock, EyeOff, Shield, Play, Quote, MapPin, Building2, TrendingUp, Globe, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";

/* ─── Data (configurable — replace with props or API) ─── */
const HERO_SLIDES = [
  { image: heroImg, headline: "Elevating the Real Estate Industry", sub: "JOIN OUR PATH" },
  { image: prop1, headline: "Exceptional Homes for Exceptional Lives", sub: "DISCOVER THE COLLECTION" },
  { image: prop2, headline: "Where Luxury Meets the Sea", sub: "COASTAL LIVING REDEFINED" },
  { image: prop3, headline: "Private Mountain Sanctuaries", sub: "NATURE'S GRANDEUR AWAITS" },
];

const PROPERTIES = [
  { image: prop1, name: "The Skyline Penthouse", location: "Manhattan, New York", price: "€12,500,000", beds: 5, baths: 4, sqm: 420, ref: "D4522" },
  { image: prop2, name: "Villa Blanca Sur Mer", location: "Costa Brava, Spain", price: "€8,900,000", beds: 6, baths: 5, sqm: 680, ref: "D3871" },
  { image: prop3, name: "Alpine Glass Retreat", location: "Zermatt, Switzerland", price: "€15,200,000", beds: 7, baths: 6, sqm: 950, ref: "D5104" },
  { image: detail1, name: "Seaside Modern Estate", location: "Ibiza, Spain", price: "€6,750,000", beds: 4, baths: 3, sqm: 380, ref: "D6290" },
];

const OFF_MARKET = [
  { image: prop3, name: "Sierra Blanca Palace", location: "Marbella Golden Mile", price: "€28,000,000", beds: 9, baths: 10, sqm: 2400, ref: "OM-001" },
  { image: heroImg, name: "La Zagaleta Crown Estate", location: "Benahavís, Málaga", price: "€19,500,000", beds: 8, baths: 7, sqm: 1800, ref: "OM-002" },
];

const NEW_DEVELOPMENTS = [
  { image: prop1, name: "Marea Residences", location: "Estepona, Málaga", priceFrom: "From €485,000", units: 64, completion: "Q2 2027" },
  { image: prop2, name: "The View Marbella", location: "Benahavís", priceFrom: "From €1,200,000", units: 24, completion: "Q4 2026" },
  { image: prop3, name: "One Green Way", location: "San Roque, Cádiz", priceFrom: "From €890,000", units: 42, completion: "Q1 2028" },
];

const NEW_DEV_STATS = [
  { value: "48", label: "Active Projects", icon: Building2 },
  { value: "€1.4B", label: "Total Value", icon: TrendingUp },
  { value: "12", label: "Locations", icon: Globe },
];

const DESTINATIONS = [
  { name: "Costa del Sol", count: 142, image: heroImg },
  { name: "Costa Blanca", count: 87, image: prop1 },
  { name: "Near Golf", count: 63, image: prop2 },
  { name: "Ibiza", count: 45, image: prop3 },
  { name: "Mallorca", count: 38, image: heroImg },
  { name: "Barcelona", count: 29, image: prop1 },
];

const SERVICES = [
  { num: "01", title: "Exclusive Access", desc: "Off-market properties and private listings reserved solely for our clientele.", icon: Lock },
  { num: "02", title: "Private Office", desc: "Complete confidentiality managed through our dedicated Private Office division.", icon: Shield },
  { num: "03", title: "White-Glove Service", desc: "Personal advisors guiding every step with meticulous attention to detail.", icon: ArrowUpRight },
  { num: "04", title: "Expert Negotiation", desc: "Decades securing the finest terms for discerning buyers and sellers.", icon: ArrowUpRight },
];

const BLOG_POSTS = [
  { image: prop2, date: "26 Feb 2026", title: "An Insider's Guide to Mediterranean Coastal Living", excerpt: "The Mediterranean coast has evolved from a seasonal escape into a strategic lifestyle hub..." },
  { image: prop1, date: "25 Feb 2026", title: "Dual Demand Drives Dubai's Ultra-Prime Market Edge", excerpt: "Key insights on the $500K–$1M segment growing 70% year-over-year..." },
  { image: prop3, date: "24 Feb 2026", title: "A Majestic Alpine Estate Near Zermatt", excerpt: "This remarkable historic estate stands as one of Europe's most captivating properties..." },
];

const STATS = [
  { value: "347", label: "Properties for Sale" },
  { value: "€2.1B", label: "Portfolio Value" },
  { value: "120+", label: "Off-Market Listings" },
  { value: "25", label: "Years of Experience" },
];

const TESTIMONIALS = [
  { quote: "Prestige made our dream of owning a Mediterranean villa a seamless, unforgettable experience.", author: "James & Victoria H.", location: "London, UK" },
  { quote: "Their discretion and expertise in off-market deals is unmatched in the industry.", author: "Ahmad Al-Rashid", location: "Dubai, UAE" },
  { quote: "From the first viewing to the final signature, every detail was handled with absolute precision.", author: "Sophie Müller", location: "Zürich, Switzerland" },
];

/* ═══════════════════════════════════════════════════════════ */

const Home2LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false}>
      <SEOHead
        title="Luxury Real Estate"
        description="Prestige Estates curates extraordinary luxury homes across the Mediterranean. Discover villas, penthouses, fincas and new-build properties in Ibiza, Marbella, Mallorca and more."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": brand.fullName,
          "description": brand.tagline,
          "url": "/",
          "contactPoint": { "@type": "ContactPoint", "telephone": contact.phone, "email": contact.email, "contactType": "sales" },
          "areaServed": ["Spain", "Mediterranean"],
        }}
      />

      {/* ─── HERO ─── */}
      <section aria-label="Hero" className="relative h-[60vh] sm:h-[80vh] lg:h-[100vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[2s] ease-in-out" style={{ opacity: currentSlide === i ? 1 : 0 }}>
            <img src={slide.image} alt={slide.headline} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" style={{ transform: currentSlide === i ? "scale(1.04)" : "scale(1)", transition: "transform 8s ease-out" }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.25) 100%)" }} />
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
          <FadeIn>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.15] sm:leading-[1.2] mb-4 sm:mb-5" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              {HERO_SLIDES[currentSlide].headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[11px] sm:text-sm tracking-[0.25em] uppercase font-light mb-7 sm:mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
              {HERO_SLIDES[currentSlide].sub}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <a href="/properties" className="w-full sm:w-auto bg-white text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2" style={{ color: palette.text }}>
                All Properties <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="w-full sm:w-auto border border-white/40 text-white text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#2D2926] transition-all duration-300 backdrop-blur-sm text-center">
                Sell With Us
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 right-6 lg:right-12 flex gap-2.5 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="transition-all duration-500" style={{ width: currentSlide === i ? 36 : 18, height: 2, borderRadius: 1, background: currentSlide === i ? "#fff" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="py-10 sm:py-14" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center" style={{ borderRight: i < 3 ? `1px solid ${palette.border}` : "none" }}>
                  <p className="text-3xl sm:text-4xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Featured Properties</h2>
              </div>
              <a href="/properties" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                View All <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {PROPERTIES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                      <span className="text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-7 py-3 font-light">View</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                      <span className="text-xs tracking-[0.15em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>Ref: {p.ref}</span>
                    </div>
                  </div>
                  <div className="pt-5 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                      <p className="text-xs tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{p.location}</p>
                    </div>
                    <h3 className="text-lg font-light tracking-wide" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
                    <p className="text-base font-normal" style={{ color: palette.accent }}>{p.price}</p>
                    <div className="flex items-center gap-5 pt-1 text-[13px] font-light" style={{ color: palette.textMuted }}>
                      <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {p.beds}</span>
                      <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {p.baths}</span>
                      <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {p.sqm} m²</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT + SERVICES (COMBINED EDITORIAL) ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — About */}
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>About Us</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                A Legacy of<br />Excellence
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted }}>
                {brand.fullName} is a curated luxury real estate advisory specialising in the most exclusive properties across the Mediterranean. From breathtaking seafront villas to prestigious golf-side estates, we offer a bespoke service built on trust, discretion, and an uncompromising eye for quality.
              </p>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-105" style={{ border: `1px solid ${palette.accent}50` }}>
                  <Play className="w-4 h-4 ml-0.5" style={{ color: palette.accent }} />
                </div>
                <span className="text-xs tracking-[0.12em] uppercase font-light group-hover:opacity-70 transition-opacity" style={{ color: palette.accent }}>Watch Our Story</span>
              </div>
            </FadeIn>
            {/* Right — Services grid */}
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-0">
                {SERVICES.map((s, i) => (
                  <div key={i} className="p-6 sm:p-7" style={{ borderBottom: i < 2 ? `1px solid ${palette.border}` : "none", borderRight: i % 2 === 0 ? `1px solid ${palette.border}` : "none" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ border: `1px solid ${palette.border}` }}>
                      <s.icon className="w-4 h-4" style={{ color: palette.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[15px] font-light mb-2 tracking-wide" style={{ fontFamily: fonts.heading }}>{s.title}</h3>
                    <p className="text-[13px] leading-[1.7] font-light" style={{ color: palette.textMuted }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── DESTINATIONS ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Explore</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Browse by Destination</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATIONS.map((d, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <a href="#" className="group block relative overflow-hidden aspect-[3/4]">
                  <img src={d.image} alt={`Properties in ${d.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-[15px] font-light tracking-wide text-white mb-1" style={{ fontFamily: fonts.heading }}>{d.name}</h3>
                    <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.55)" }}>{d.count} properties</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEW DEVELOPMENTS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.newDevBg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>New Build</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>New Developments</h2>
                <p className="text-[14px] font-light mt-3 max-w-lg" style={{ color: palette.textMuted }}>
                  Discover the finest new-build projects across Spain's most sought-after locations.
                </p>
              </div>
              <div className="flex items-center gap-8 shrink-0">
                {NEW_DEV_STATS.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent }}>{s.value}</p>
                    <p className="text-[10px] tracking-[0.1em] uppercase mt-1 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {NEW_DEVELOPMENTS.map((d, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group cursor-pointer" style={{ background: palette.white }}>
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={d.image} alt={`${d.name} — New development in ${d.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]" />
                    <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: palette.accent }}>
                      <span className="text-xs tracking-[0.15em] uppercase font-light text-white">New Build</span>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm">
                      <span className="text-xs font-light" style={{ color: palette.text }}>{d.completion}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                      <p className="text-xs tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>{d.location}</p>
                    </div>
                    <h3 className="text-lg font-light tracking-wide" style={{ fontFamily: fonts.heading }}>{d.name}</h3>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-base font-normal" style={{ color: palette.accent }}>{d.priceFrom}</p>
                      <span className="text-sm font-light" style={{ color: palette.textMuted }}>{d.units} units</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL CINEMATIC ═══ */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={prop2} alt="Client testimonial" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,20,0.55)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <Quote className="w-8 h-8 mx-auto mb-6" style={{ color: "rgba(255,255,255,0.2)" }} strokeWidth={1} />
            <p className="text-lg sm:text-2xl md:text-3xl font-extralight leading-[1.5] italic" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.03em" }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-sm tracking-[0.15em] uppercase font-light" style={{ color: "rgba(255,255,255,0.7)" }}>{TESTIMONIALS[activeTestimonial].author}</span>
              <span className="text-xs tracking-[0.1em] font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{TESTIMONIALS[activeTestimonial].location}</span>
            </div>
            <div className="flex gap-2 justify-center mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className="transition-all duration-500" style={{ width: i === activeTestimonial ? 24 : 8, height: 2, borderRadius: 1, background: i === activeTestimonial ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ OFF-MARKET ═══ */}
      <section className="py-0" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <FadeIn className="relative overflow-hidden min-h-[360px] md:min-h-[560px]">
              <img src={prop3} alt="Exclusive off-market luxury property" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, transparent 30%, rgba(30,28,26,0.95) 100%)" }} />
              <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(30,28,26,0.9) 100%)" }} />
              <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5" style={{ background: "rgba(30,28,26,0.7)", backdropFilter: "blur(12px)" }}>
                <EyeOff className="w-3.5 h-3.5" style={{ color: palette.offMarketAccent }} />
                <span className="text-xs tracking-[0.15em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Off-Market</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-20">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-[1px]" style={{ background: palette.offMarketAccent }} />
                <p className="text-xs tracking-[0.3em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Private & Confidential</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extralight leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, color: "#fff", letterSpacing: "0.06em" }}>
                Off-Market<br />Collection
              </h2>
              <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
                Not all properties are publicly available. Our off-market collection features exclusive listings shown only to verified buyers through our private network.
              </p>
              <a href="#" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-500 hover:opacity-90 self-start" style={{ background: palette.offMarketAccent, color: palette.offMarketBg }}>
                <Lock className="w-4 h-4" /> Request Access
              </a>
              <p className="text-xs font-light mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: palette.offMarketAccent }} className="font-normal">120+</span> off-market properties currently available
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── JOURNAL ─── */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-10 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Insights</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Journal</h2>
              </div>
              <a href="/blog" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                All Articles <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <FadeIn className="md:col-span-7">
              <a href="/blog" className="group block">
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105" />
                </div>
                <div className="pt-5 space-y-2">
                  <span className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.textLight }}>{BLOG_POSTS[0].date}</span>
                  <h4 className="text-xl font-light leading-[1.35] group-hover:opacity-70 transition-opacity tracking-wide" style={{ fontFamily: fonts.heading }}>{BLOG_POSTS[0].title}</h4>
                  <p className="text-sm leading-[1.7] font-light" style={{ color: palette.textMuted }}>{BLOG_POSTS[0].excerpt}</p>
                </div>
              </a>
            </FadeIn>
            <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
              {BLOG_POSTS.slice(1).map((post, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <a href="/blog" className="group flex gap-4">
                    <div className="overflow-hidden aspect-square w-28 shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.textLight }}>{post.date}</span>
                      <h4 className="text-[15px] font-light leading-[1.4] group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading }}>{post.title}</h4>
                      <p className="text-sm leading-[1.5] font-light line-clamp-2" style={{ color: palette.textMuted }}>{post.excerpt}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.bgAlt }}>
        <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Stay Informed</p>
            <h2 className="text-2xl md:text-3xl font-extralight mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Private List</h2>
            <p className="text-sm font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
              Receive exclusive off-market listings, market insights and invitations to private viewings — delivered discreetly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 px-5 py-4 text-sm tracking-[0.05em] focus:outline-none transition-colors duration-300" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} />
              <button type="submit" className="text-xs tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 whitespace-nowrap" style={{ background: palette.accent, color: "#fff" }}>
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-4 font-light" style={{ color: palette.textLight }}>We respect your privacy. Unsubscribe at any time.</p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Home2LandingPage;
