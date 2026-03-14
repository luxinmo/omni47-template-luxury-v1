import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bed, Bath, Maximize, ArrowRight, ArrowUpRight, Lock, EyeOff,
  MapPin, ChevronRight, Home, Building2, Waves, Sun, Eye, TreePine,
  Cpu, TrendingUp, BarChart3, Activity, Target, Send, MessageCircle,
  Users, Globe, Award, Briefcase, X,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts, contact } from "@/config/template";
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

const LIFESTYLE_COLLECTIONS = [
  { label: "Sea View Villas", image: prop2, href: "/properties?collection=sea-views" },
  { label: "Beachfront Homes", image: heroImg, href: "/properties?collection=beachfront" },
  { label: "Golf Properties", image: prop3, href: "/properties?collection=golf" },
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

const TRUST_STATS = [
  { value: "15+", label: "Years of Experience", icon: Award },
  { value: "3,200+", label: "International Clients", icon: Users },
  { value: "€2.1B", label: "Portfolio Value", icon: Briefcase },
  { value: "120", label: "Developer Partners", icon: Globe },
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
    { name: "Denia", href: "/properties?location=denia" },
  ],
  "Ibiza": [
    { name: "Santa Eulalia", href: "/properties?location=santa-eulalia" },
    { name: "San José", href: "/properties?location=san-jose" },
    { name: "San Antonio", href: "/properties?location=san-antonio" },
    { name: "Ibiza Town", href: "/properties?location=ibiza-town" },
    { name: "Es Cubells", href: "/properties?location=es-cubells" },
  ],
};

const CHATBOT_QUICK = [
  "I'm looking for a villa in Jávea",
  "What off-market properties are available?",
  "I want to invest in Costa Blanca",
  "Tell me about new developments",
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const Home4LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm your luxury property assistant. How can I help you find your dream home in Costa Blanca or Ibiza?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const heroImages = [heroImg, prop1, prop2, prop3];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroImages.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const handleChatSend = (text?: string) => {
    const msg = text || chatInput;
    if (!msg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: msg },
      { role: "bot", text: "Thank you for your enquiry. One of our property advisors will be in touch shortly to discuss your requirements in detail." },
    ]);
    setChatInput("");
  };

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="Find Your Luxury Property in Costa Blanca & Ibiza"
        description="Discover exclusive luxury villas, sea-view properties and new developments in Costa Blanca and Ibiza. Request a personalised property search or chat with our advisors."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: brand.fullName,
          description: "Luxury real estate advisory specialising in Costa Blanca and Ibiza premium properties.",
          url: "/home4",
          areaServed: ["Costa Blanca", "Ibiza", "Marbella", "Spain"],
          contactPoint: { "@type": "ContactPoint", telephone: contact.phone, email: contact.email, contactType: "sales" },
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          1. HERO — LEAD FOCUSED
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
              Find Your Luxury Property in<br />Costa Blanca & Ibiza
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
              <Link to="/contact" className="border border-white/40 text-white text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#2D2926] transition-all duration-300 backdrop-blur-sm text-center">
                Request Property Search
              </Link>
              <button onClick={() => setChatOpen(true)} className="border border-white/40 text-white text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#2D2926] transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Chat with an Advisor
              </button>
            </div>
          </FadeIn>
        </div>

        {/* 2. CHATBOT PROMINENCE — Hero prompt */}
        <FadeIn delay={0.5}>
          <button
            onClick={() => setChatOpen(true)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-6 py-3.5 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-[12px] tracking-[0.1em] text-white font-light">Need help finding the perfect property? <span className="underline underline-offset-2">Chat with our assistant</span></span>
          </button>
        </FadeIn>

        <div className="absolute bottom-6 right-6 lg:right-12 flex gap-2.5 z-10">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="transition-all duration-500" style={{ width: currentSlide === i ? 36 : 18, height: 2, borderRadius: 1, background: currentSlide === i ? "#fff" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. PROPERTY FINDER BLOCK
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Property finder" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Concierge</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Let Us Find Your Perfect Property</h2>
              <p className="text-[14px] font-light mt-3 max-w-xl mx-auto" style={{ color: palette.textMuted }}>
                Tell us what you're looking for and our team will curate the best luxury homes for you.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form className="max-w-3xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Location</label>
                  <select className="w-full px-4 py-3 text-[14px] font-light appearance-none cursor-pointer focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>Costa Blanca</option>
                    <option>Ibiza</option>
                    <option>Marbella</option>
                    <option>Mallorca</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Budget</label>
                  <select className="w-full px-4 py-3 text-[14px] font-light appearance-none cursor-pointer focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>€500,000 – €1,000,000</option>
                    <option>€1,000,000 – €3,000,000</option>
                    <option>€3,000,000 – €5,000,000</option>
                    <option>€5,000,000 – €10,000,000</option>
                    <option>€10,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Property Type</label>
                  <select className="w-full px-4 py-3 text-[14px] font-light appearance-none cursor-pointer focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>Luxury Villa</option>
                    <option>Penthouse</option>
                    <option>Beachfront Home</option>
                    <option>New Development</option>
                    <option>Finca / Country House</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.textLight }}>Bedrooms</label>
                  <select className="w-full px-4 py-3 text-[14px] font-light appearance-none cursor-pointer focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}>
                    <option>Any</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5+</option>
                    <option>6+</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full text-[12px] tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2" style={{ background: palette.accent, color: "#fff" }}>
                <Send className="w-4 h-4" /> Find My Property
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. FEATURED PROPERTIES
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Featured luxury properties" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Featured Luxury Properties</h2>
              </div>
              <Link to="/properties" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                View All Properties <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PROPERTIES.slice(0, 6).map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group">
                  <Link to={p.href} className="block">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                        <span className="text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-7 py-3 font-light">View</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                        <span className="text-xs tracking-[0.12em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>Ref: {p.ref}</span>
                      </div>
                    </div>
                  </Link>
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
                    <button
                      onClick={() => setChatOpen(true)}
                      className="mt-3 text-[11px] tracking-[0.15em] uppercase font-normal px-5 py-2.5 transition-all duration-300 hover:opacity-90 flex items-center gap-2"
                      style={{ background: palette.accent, color: "#fff" }}
                    >
                      Request Details
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. OFF-MARKET COLLECTION
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
            <FadeIn delay={0.15} className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-20">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-[1px]" style={{ background: palette.offMarketAccent }} />
                <p className="text-xs tracking-[0.3em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Private & Confidential</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extralight leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, color: "#fff", letterSpacing: "0.06em" }}>
                Private Off-Market<br />Collection
              </h2>
              <p className="text-[15px] leading-[1.9] font-light mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                Exclusive properties available only to selected clients. Our off-market collection features premium listings shown only to verified buyers through our private network.
              </p>
              <p className="text-xs font-light mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: palette.offMarketAccent }} className="font-normal">120+</span> off-market properties currently available
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-500 hover:opacity-90 self-start" style={{ background: palette.offMarketAccent, color: palette.offMarketBg }}>
                <Lock className="w-4 h-4" /> Request Private Access
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. NEW DEVELOPMENTS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="New residential developments" className="py-16 sm:py-24 md:py-32" style={{ background: palette.newDevBg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>New Build</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>New Developments</h2>
                <p className="text-[14px] font-light mt-3 max-w-lg" style={{ color: palette.textMuted }}>Explore exclusive residential projects and off-plan opportunities.</p>
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
          7. LUXURY COLLECTIONS
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
          8. MARKET INSIGHTS
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Market insights" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bgAlt }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Data</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Costa Blanca & Ibiza Market Insights</h2>
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
          9. CLIENT TRUST BLOCK
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Trusted by international buyers" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Trust</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Trusted by International Buyers</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_STATS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ border: `1px solid ${palette.border}` }}>
                    <t.icon className="w-6 h-6" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extralight mb-2" style={{ fontFamily: fonts.heading, color: palette.text }}>{t.value}</p>
                  <p className="text-[11px] tracking-[0.15em] uppercase font-normal" style={{ color: palette.textLight }}>{t.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. JOURNAL
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="The Journal" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Insights</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Journal</h2>
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Read All Articles <ArrowUpRight className="w-4 h-4" />
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
          11. AREAS WE COVER
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Areas we cover" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
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
          12. NEWSLETTER
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Newsletter subscription" className="py-16 sm:py-24 md:py-32" style={{ background: palette.bgAlt }}>
        <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Stay Informed</p>
            <h2 className="text-2xl md:text-3xl font-extralight mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Private List</h2>
            <p className="text-sm font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
              Receive exclusive listings and off-market opportunities delivered discreetly to your inbox.
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

      {/* ═══════════════════════════════════════════════════════
          CHATBOT PANEL
          ═══════════════════════════════════════════════════════ */}
      {/* Floating trigger */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110"
          style={{ background: palette.accent }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col shadow-2xl" style={{ height: 480, border: `1px solid ${palette.border}` }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ background: palette.accent }}>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm font-medium text-white">Property Assistant</p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-white/60">Online now</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: palette.bg }}>
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-3 text-[13px] leading-[1.6] font-light"
                  style={{
                    background: m.role === "user" ? palette.accent : palette.white,
                    color: m.role === "user" ? "#fff" : palette.text,
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    border: m.role === "bot" ? `1px solid ${palette.border}` : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {chatMessages.length <= 1 && (
            <div className="px-4 py-2 flex flex-wrap gap-2" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}` }}>
              {CHATBOT_QUICK.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleChatSend(q)}
                  className="text-[11px] tracking-[0.05em] px-3 py-1.5 transition-colors hover:opacity-80"
                  style={{ background: palette.white, border: `1px solid ${palette.border}`, color: palette.textMuted }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}
            onSubmit={(e) => { e.preventDefault(); handleChatSend(); }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-[13px] font-light focus:outline-none"
              style={{ color: palette.text }}
            />
            <button type="submit" className="transition-opacity hover:opacity-70" style={{ color: palette.accent }}>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Home4LandingPage;
