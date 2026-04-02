import { useState, useEffect } from "react";
import NewsletterPreferencesModal from "@/components/blocks/cta/NewsletterPreferencesModal";
import { Link } from "react-router-dom";
import {
  Bed, Bath, Maximize, ArrowRight, ArrowUpRight, Lock, EyeOff,
  Play, Quote, MapPin, ChevronRight, Home, Building2, Waves,
  Mountain, PenTool, Sun, Eye, TreePine, Cpu, TrendingUp,
  BarChart3, Activity, Target, Send, Crown, X, Film,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts, contact } from "@/config/template";

import OffmarketWizardModal from "@/components/blocks/offmarket/OffmarketWizardModal";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const STATS = [
  { value: "347", label: "Properties" },
  { value: "€2.1B", label: "Total Value" },
  { value: "120", label: "Developers" },
  { value: "25", label: "Countries" },
];

const PROPERTIES = [
  { image: prop1, name: "The Skyline Penthouse", location: "Altea, Costa Blanca", price: "€12,500,000", beds: 5, baths: 4, sqm: 420, ref: "D4522", href: "/property6/1" },
  { image: prop2, name: "Villa Blanca Sur Mer", location: "Jávea, Costa Blanca", price: "€8,900,000", beds: 6, baths: 5, sqm: 680, ref: "D3871", href: "/property6/2" },
  { image: prop3, name: "Alpine Glass Retreat", location: "Moraira, Costa Blanca", price: "€15,200,000", beds: 7, baths: 6, sqm: 950, ref: "D5104", href: "/property6/3" },
  { image: detail1, name: "Seaside Modern Estate", location: "Ibiza, Balearics", price: "€6,750,000", beds: 4, baths: 3, sqm: 380, ref: "D6290", href: "/property6/4" },
  { image: detail2, name: "Cliff Edge Villa", location: "Benissa, Costa Blanca", price: "€4,200,000", beds: 5, baths: 4, sqm: 350, ref: "D7801", href: "/property6/5" },
  { image: detail3, name: "Marina Bay Residence", location: "Marbella, Costa del Sol", price: "€9,100,000", beds: 6, baths: 5, sqm: 520, ref: "D8432", href: "/property6/6" },
];

const DESTINATIONS = [
  { name: "Altea", count: 64, image: prop1, href: "/properties?location=altea" },
  { name: "Jávea", count: 87, image: prop2, href: "/properties?location=javea" },
  { name: "Moraira", count: 52, image: prop3, href: "/properties?location=moraira" },
  { name: "Benissa", count: 38, image: detail1, href: "/properties?location=benissa" },
  { name: "Ibiza", count: 45, image: heroImg, href: "/properties?location=ibiza" },
  { name: "Marbella", count: 71, image: detail2, href: "/properties?location=marbella" },
];

const PROPERTY_TYPES = [
  { label: "Luxury Villas", icon: Home, href: "/properties?type=villas" },
  { label: "Sea View Properties", icon: Waves, href: "/properties?type=sea-view" },
  { label: "Beachfront Homes", icon: Sun, href: "/properties?type=beachfront" },
  { label: "Modern Villas", icon: PenTool, href: "/properties?type=modern" },
  { label: "Penthouses", icon: Building2, href: "/properties?type=penthouses" },
  { label: "New Developments", icon: TrendingUp, href: "/properties?type=new-developments" },
];

const LIFESTYLE_COLLECTIONS = [
  { label: "Homes with Sea Views", image: prop2, href: "/properties?collection=sea-views" },
  { label: "Golf Properties", image: prop3, href: "/properties?collection=golf" },
  { label: "Beachfront Villas", image: heroImg, href: "/properties?collection=beachfront" },
  { label: "Modern Architecture", image: prop1, href: "/properties?collection=modern" },
  { label: "Private Estates", image: detail1, href: "/properties?collection=estates" },
  { label: "Smart Homes", image: detail3, href: "/properties?collection=smart" },
];

const NEW_DEVELOPMENTS = [
  { image: prop1, name: "Marea Residences", location: "Altea, Costa Blanca", priceFrom: "From €485,000", units: 64, completion: "Q2 2027" },
  { image: prop2, name: "The View Jávea", location: "Jávea", priceFrom: "From €1,200,000", units: 24, completion: "Q4 2026" },
  { image: prop3, name: "One Green Way", location: "Moraira", priceFrom: "From €890,000", units: 42, completion: "Q1 2028" },
];

const MARKET_DATA = [
  { label: "Avg. Villa Price", value: "€1.85M", change: "+12%", icon: BarChart3 },
  { label: "Price per m²", value: "€3,420", change: "+8%", icon: Activity },
  { label: "Demand Level", value: "High", change: "↑", icon: TrendingUp },
  { label: "Market Trend", value: "Growing", change: "+15% YoY", icon: Target },
];

const BLOG_POSTS = [
  { image: prop2, date: "26 Feb 2026", title: "An Insider's Guide to Mediterranean Coastal Living", excerpt: "The Mediterranean coast has evolved from a seasonal escape into a strategic lifestyle hub...", href: "/blog/mediterranean-living" },
  { image: prop1, date: "25 Feb 2026", title: "Dual Demand Drives Costa Blanca's Prime Market", excerpt: "Key insights on the €500K–€1M segment growing 70% year-over-year...", href: "/blog/costa-blanca-market" },
  { image: prop3, date: "24 Feb 2026", title: "Investing in Ibiza: A Complete Buyer's Guide", excerpt: "This remarkable market continues to attract international buyers seeking premium lifestyle properties...", href: "/blog/ibiza-buyers-guide" },
];

const AREAS = {
  "Costa Blanca": [
    { name: "Altea", href: "/properties?location=altea" },
    { name: "Jávea", href: "/properties?location=javea" },
    { name: "Moraira", href: "/properties?location=moraira" },
    { name: "Benissa", href: "/properties?location=benissa" },
    { name: "Calpe", href: "/properties?location=calpe" },
  ],
  "Ibiza": [
    { name: "Santa Eulalia", href: "/properties?location=santa-eulalia" },
    { name: "San José", href: "/properties?location=san-jose" },
    { name: "San Antonio", href: "/properties?location=san-antonio" },
    { name: "Ibiza Town", href: "/properties?location=ibiza-town" },
  ],
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const Home3LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [offmarketWizardOpen, setOffmarketWizardOpen] = useState(false);
  const [nlEmail, setNlEmail] = useState("");
  const [nlModalOpen, setNlModalOpen] = useState(false);
  
  const heroImages = [heroImg, prop1, prop2, prop3];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroImages.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <Layout navVariant="transparent" activePath="/" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="Luxury Real Estate in Costa Blanca & Ibiza — Villas, Sea-View Homes & New Developments"
        description="Discover exclusive luxury villas, sea-view properties and new developments in Costa Blanca and Ibiza. Prestige Estates curates the finest Mediterranean homes in Altea, Jávea, Moraira, Benissa and more."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: brand.fullName,
          description: "Luxury real estate advisory specialising in Costa Blanca and Ibiza premium properties.",
          url: "/home3",
          areaServed: ["Costa Blanca", "Ibiza", "Marbella", "Spain"],
          contactPoint: { "@type": "ContactPoint", telephone: contact.phone, email: contact.email, contactType: "sales" },
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Hero" className="relative h-[60vh] sm:h-[80vh] lg:h-[100vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {heroImages.map((img, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[2s] ease-in-out" style={{ opacity: currentSlide === i ? 1 : 0 }}>
            <img src={img} alt="Luxury Mediterranean property" loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" style={{ transform: currentSlide === i ? "scale(1.04)" : "scale(1)", transition: "transform 8s ease-out" }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.65) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.3) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-4xl">
          <FadeIn>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-extralight leading-[1.12] mb-5" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Luxury Real Estate in<br />Costa Blanca & Ibiza
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[13px] sm:text-[15px] font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Discover exclusive villas, sea-view homes and new developments in Spain's most prestigious Mediterranean locations.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
              <Link to="/properties" className="bg-white text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2" style={{ color: palette.text }}>
                Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/properties?type=new-developments" className="border border-white/40 text-white text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#2D2926] transition-all duration-300 backdrop-blur-sm text-center">
                New Developments
              </Link>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-6 right-6 lg:right-12 flex gap-2.5 z-10">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="transition-all duration-500" style={{ width: currentSlide === i ? 36 : 18, height: 2, borderRadius: 1, background: currentSlide === i ? "#fff" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. STATS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Company statistics" className="py-10 sm:py-14" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {STATS.map((s, i) => (
                <div key={i} className={`text-center ${i % 2 === 0 ? "border-r" : ""} ${i < 3 ? "md:border-r" : "md:border-r-0"} ${i % 2 !== 0 ? "border-r-0" : ""}`} style={{ borderColor: palette.border }}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. FEATURED PROPERTIES
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Featured luxury properties" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Featured Luxury Properties</h2>
                <p className="text-[14px] font-light mt-3 max-w-lg" style={{ color: palette.textMuted }}>A curated selection of exceptional villas and premium homes.</p>
              </div>
              <Link to="/properties" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                View All <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PROPERTIES.slice(0, 6).map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link to={p.href} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                      <span className="text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-7 py-3 font-light">View</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                      <span className="text-xs tracking-[0.12em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>Ref: {p.ref}</span>
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
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. BROWSE BY DESTINATION
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Browse by destination" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Explore</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Browse by Destination</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {DESTINATIONS.map((d, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link to={d.href} className="group block relative overflow-hidden aspect-[2/3]">
                  <img src={d.image} alt={`Luxury properties in ${d.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-[15px] font-light tracking-wide text-white mb-1" style={{ fontFamily: fonts.heading }}>{d.name}</h3>
                    <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.55)" }}>{d.count} properties</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. EXPLORE BY PROPERTY TYPE
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Explore by property type" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Categories</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Explore by Property Type</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {PROPERTY_TYPES.map((t, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <Link to={t.href} className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 transition-all duration-300 hover:shadow-md" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{ border: `1px solid ${palette.border}` }}>
                    <t.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[13px] sm:text-[15px] font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading }}>{t.label}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: palette.text }} />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. LIFESTYLE COLLECTIONS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Luxury lifestyle collections" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Lifestyle</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Luxury Collections</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {LIFESTYLE_COLLECTIONS.map((c, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <Link to={c.href} className="group block relative overflow-hidden aspect-[16/10]">
                  <img src={c.image} alt={c.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-[16px] font-light tracking-wide text-white" style={{ fontFamily: fonts.heading }}>{c.label}</h3>
                    <span className="text-xs tracking-[0.12em] uppercase font-light mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6b. BRANDED RESIDENCES
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Branded residences" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
        <img src={detail2} alt="Branded residence — luxury hospitality living" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,24,22,0.75) 0%, rgba(26,24,22,0.45) 50%, rgba(26,24,22,0.75) 100%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full" style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)" }}>
              <Crown className="w-4 h-4" style={{ color: "#c9a96e" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-normal" style={{ color: "#c9a96e" }}>Five-Star Living</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Branded Residences
            </h2>
            <p className="text-[15px] sm:text-base leading-[1.9] font-light max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Live within the world's most prestigious hospitality brands. Discover exclusive residences by Four Seasons, Ritz-Carlton, Mandarin Oriental and more — offering five-star services, world-class amenities and exceptional investment value.
            </p>
            <Link to="/branded-residences" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90" style={{ background: "#c9a96e", color: "#1a1816" }}>
              <Crown className="w-4 h-4" /> Discover Branded Residences
            </Link>
            <p className="text-xs font-light mt-8" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span style={{ color: "#c9a96e" }} className="font-normal">15+</span> branded residence projects available
            </p>
          </FadeIn>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════
          7. NEW DEVELOPMENTS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="New residential developments" className="py-16 sm:py-24 md:py-32" style={{ background: palette.newDevBg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>New Build</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>New Developments</h2>
                <p className="text-[14px] font-light mt-3 max-w-lg" style={{ color: palette.textMuted }}>Explore exclusive residential projects and off-plan properties in prime Mediterranean locations.</p>
              </div>
              <Link to="/properties?type=new-developments" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                View All <ArrowUpRight className="w-4 h-4" />
              </Link>
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

      {/* ═══════════════════════════════════════════════════════
          8. OFF-MARKET COLLECTION
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Off-market exclusive properties" style={{ background: palette.offMarketBg }}>
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
            <FadeIn delay={0.15} className="flex flex-col justify-center px-5 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20">
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
              <button onClick={() => setOffmarketWizardOpen(true)} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-500 hover:opacity-90 self-start" style={{ background: palette.offMarketAccent, color: palette.offMarketBg }}>
                <Lock className="w-4 h-4" /> Request Private Access
              </button>
              <p className="text-xs font-light mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: palette.offMarketAccent }} className="font-normal">120+</span> off-market properties currently available
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. PROPERTY FINDER / CONCIERGE
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Property finder service" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Concierge</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Let Us Find<br />Your Property
              </h2>
              <div className="w-12 h-[1px] mb-6" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                Tell us what you're looking for and our team will curate the best homes for you. From initial consultation to final viewing, we handle every detail with discretion and expertise.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Preferred Location</label>
                   <select className="w-full px-4 py-3 text-[16px] sm:text-[14px] font-light appearance-none cursor-pointer focus:outline-none transition-colors" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>Costa Blanca</option>
                    <option>Ibiza</option>
                    <option>Marbella</option>
                    <option>Mallorca</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Budget Range</label>
                   <select className="w-full px-4 py-3 text-[16px] sm:text-[14px] font-light appearance-none cursor-pointer focus:outline-none transition-colors" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>€500,000 – €1,000,000</option>
                    <option>€1,000,000 – €3,000,000</option>
                    <option>€3,000,000 – €5,000,000</option>
                    <option>€5,000,000 – €10,000,000</option>
                    <option>€10,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Property Type</label>
                  <select className="w-full px-4 py-3 text-[16px] sm:text-[14px] font-light appearance-none cursor-pointer focus:outline-none transition-colors" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>Luxury Villa</option>
                    <option>Penthouse</option>
                    <option>Beachfront Home</option>
                    <option>New Development</option>
                    <option>Finca / Country House</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-[12px] tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 mt-2" style={{ background: palette.accent, color: "#fff" }}>
                  <Send className="w-4 h-4" /> Request Property Search
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. MARKET INSIGHTS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Market insights for Costa Blanca and Ibiza" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bgAlt }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Data</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Costa Blanca & Ibiza<br className="sm:hidden" /> Market Insights</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {MARKET_DATA.map((m, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 text-center" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <m.icon className="w-5 h-5 mx-auto mb-4" style={{ color: palette.accent }} strokeWidth={1.5} />
                  <p className="text-2xl sm:text-3xl font-extralight mb-1" style={{ fontFamily: fonts.heading, color: palette.text }}>{m.value}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase font-normal mb-3" style={{ color: palette.textLight }}>{m.label}</p>
                  <span className="text-xs font-medium px-2.5 py-1" style={{ color: palette.accent, background: `${palette.accent}10` }}>
                    {m.change}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. JOURNAL
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="The Journal — real estate insights" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Insights</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Journal</h2>
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                All Articles <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <FadeIn className="md:col-span-7">
              <Link to={BLOG_POSTS[0].href} className="group block">
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105" />
                </div>
                <div className="pt-5 space-y-2">
                  <span className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.textLight }}>{BLOG_POSTS[0].date}</span>
                  <h3 className="text-xl font-light leading-[1.35] group-hover:opacity-70 transition-opacity tracking-wide" style={{ fontFamily: fonts.heading }}>{BLOG_POSTS[0].title}</h3>
                  <p className="text-sm leading-[1.7] font-light" style={{ color: palette.textMuted }}>{BLOG_POSTS[0].excerpt}</p>
                </div>
              </Link>
            </FadeIn>
            <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
              {BLOG_POSTS.slice(1).map((post, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <Link to={post.href} className="group flex gap-4">
                    <div className="overflow-hidden aspect-square w-28 shrink-0">
                      <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.textLight }}>{post.date}</span>
                      <h4 className="text-[15px] font-light leading-[1.4] group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading }}>{post.title}</h4>
                      <p className="text-sm leading-[1.5] font-light line-clamp-2" style={{ color: palette.textMuted }}>{post.excerpt}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. CINEMATIC BRAND POSITIONING
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image behind everything */}
        <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,18,16,0.75) 0%, rgba(20,18,16,0.85) 100%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-6 py-20 sm:py-28 md:py-36">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left — Text */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <Film className="w-4 h-4" style={{ color: palette.offMarketAccent, opacity: 0.6 }} />
                  <p className="text-[11px] tracking-[0.35em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Content & Storytelling</p>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-extralight text-white leading-[1.2] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
                  Cinematic Brand Positioning
                </h2>
                <p className="text-[14px] sm:text-[15px] font-light leading-[1.85] mb-10 max-w-md mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Every property deserves a story. Our in-house production team creates cinematic video content and editorial photography that positions each listing as a work of art.
                </p>
                <Link
                  to="/videos2"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:gap-4 px-7 py-3.5"
                  style={{ color: palette.offMarketAccent, border: `1px solid rgba(201,169,110,0.35)` }}
                >
                  Explore All Videos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right — Embedded Video */}
              <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                  title="Showreel"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: "none" }}
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. AREAS WE COVER
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Areas we cover in Costa Blanca and Ibiza" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Locations</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Areas We Cover</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {Object.entries(AREAS).map(([region, areas]) => (
                <div key={region}>
                  <h3 className="text-lg font-light tracking-wide mb-6 pb-3" style={{ fontFamily: fonts.heading, borderBottom: `1px solid ${palette.border}` }}>{region}</h3>
                  <ul className="space-y-3">
                    {areas.map((area) => (
                      <li key={area.name}>
                        <Link to={area.href} className="flex items-center justify-between group py-1.5 transition-colors hover:opacity-70">
                          <span className="text-[15px] font-light" style={{ color: palette.textMuted }}>{area.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: palette.accent }} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. NEWSLETTER
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Newsletter subscription" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bgAlt }}>
        <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Stay Informed</p>
            <h2 className="text-2xl md:text-3xl font-extralight mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Private List</h2>
            <p className="text-sm font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
              Receive exclusive off-market listings, market insights and invitations to private viewings — delivered discreetly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); if (nlEmail.trim()) setNlModalOpen(true); }}>
              <input type="email" value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} placeholder="Your email address" className="flex-1 px-5 py-4 text-[16px] sm:text-sm tracking-[0.05em] focus:outline-none transition-colors duration-300" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} required />
              <button type="submit" className="text-xs tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 whitespace-nowrap" style={{ background: palette.accent, color: "#fff" }}>
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-4 font-light" style={{ color: palette.textLight }}>We respect your privacy. Unsubscribe at any time.</p>
          </FadeIn>
        </div>
      </section>
    </Layout>
    <NewsletterPreferencesModal
      open={nlModalOpen}
      onClose={() => setNlModalOpen(false)}
      email={nlEmail}
      accentColor={palette.accent}
      onConfirm={() => setNlEmail("")}
    />
    <OffmarketWizardModal open={offmarketWizardOpen} onClose={() => setOffmarketWizardOpen(false)} accentColor={palette.offMarketAccent} bgColor={palette.offMarketBg} heroImage={prop3} />
    </>
  );
};

export default Home3LandingPage;
