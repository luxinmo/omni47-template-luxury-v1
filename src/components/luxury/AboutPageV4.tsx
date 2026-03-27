import { useState, useEffect } from "react";
import {
  ArrowRight, Play, Quote, Users, Globe, Brain, Cpu, LineChart,
  Shield, Handshake, Building2, TrendingUp, Award, Eye, Target,
  Sparkles, BarChart3, Network, Zap, CheckCircle2, ChevronRight,
  MapPin, Phone, Lock, Database, Bot, Video, Anchor, Plane,
  Car, Heart, Scale, FileCheck, UserCheck, Star, Gem, Crown,
  Briefcase, Layers, MonitorSmartphone, Rocket, MessageCircle, Languages
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";

/* ─── Data (combined from luxinmo.com + V3) ─── */

const STATS = [
  { value: "+25", label: "Years of Experience" },
  { value: "+700", label: "Transactions Closed" },
  { value: "€110M", label: "Annual Managed Offers" },
  { value: "5", label: "Offices" },
];

const TIMELINE = [
  { year: "2009", title: "Galaxia XXI", desc: "Brothers Suren and Arman Yeghiazaryan create the first construction company dedicated exclusively to the construction of luxury homes in Alicante province." },
  { year: "2015", title: "Luxinmo Is Born", desc: "Founded by Arman Yeghiazaryan as part of Grupo Galaxia Development SL, Luxinmo Real Estate quickly positions itself as a leader in the luxury segment." },
  { year: "2017", title: "Big Data Investment", desc: "Development of proprietary 'Real Estate Market Control' software — monitoring every property on the market, analysing prices and competition in real time." },
  { year: "2019", title: "Exclusive Services", desc: "Launch of Luxinmo Exclusive Services for clients demanding absolute confidentiality and off-market access." },
  { year: "2020", title: "Ibiza Expansion", desc: "Second office opens in Sant Rafel De Sa Creu, Ibiza — bringing the data-driven approach to the Balearic luxury market." },
  { year: "2021", title: "International: Warsaw", desc: "First international office opens in Warsaw, Poland — connecting Eastern European buyers to Mediterranean luxury." },
  { year: "2022", title: "Jávea & Calpe", desc: "New offices in Jávea and Calpe strengthen total control of the Costa Blanca luxury corridor." },
  { year: "2025", title: "AI-First Agency", desc: "Full AI integration across valuations, buyer matching, marketing automation and market forecasting — setting the industry benchmark." },
];

const LEADERSHIP = [
  {
    name: "Arman Yeghiazaryan",
    role: "Founder & CEO",
    image: "https://www.luxinmo.com/images/pages/aboutus/arman.webp",
    quote: "Build the systems you need — don't depend on the ones that already exist.",
    bio: "Arman founded Luxinmo with a clear vision: merge technology with luxury real estate to create a new standard of service. His leadership has transformed the company from a local agency into a Mediterranean-wide technology-powered real estate firm, integrating proprietary CRM, Big Data analytics, and AI-driven processes.",
  },
  {
    name: "Suren Yeghiazaryan",
    role: "Co-Founder & Director",
    image: detail1,
    quote: "Excellence is not a goal — it's a system we build and refine every day.",
    bio: "Suren co-founded Galaxia XXI in 2009, pioneering the construction of contemporary luxury homes in Alicante. With deep expertise in high-quality materials and construction processes, he brings an unmatched understanding of what defines true luxury in residential architecture.",
  },
];

const PHILOSOPHY_PILLARS = [
  { icon: MapPin, title: "Location", desc: "Prime addresses that define prestige and hold enduring value across market cycles." },
  { icon: Gem, title: "Architecture", desc: "Exceptional design by world-renowned architects that stands as a statement of refined living." },
  { icon: Star, title: "Experience", desc: "Every interaction crafted to exceed the expectations of the most discerning clients." },
  { icon: Crown, title: "Scarcity", desc: "True luxury is defined by what cannot be replicated — unique properties in irreplaceable settings." },
];

const TECH_FEATURES = [
  { icon: MonitorSmartphone, title: "Proprietary CRM", desc: "Custom-built technology platform managing the entire client journey with zero dependency on third-party tools." },
  { icon: Database, title: "Big Data Engine", desc: "Luxinmo Big Data 'Real Estate Market Control' — monitoring every property, price movement, and competitor across the market." },
  { icon: Zap, title: "Automated Responses", desc: "AI-powered instant responses in multiple languages, ensuring every lead receives personalised attention within seconds, 24/7." },
  { icon: Brain, title: "AI-Driven Matching", desc: "Machine learning algorithms analyse buyer behaviour and lifestyle preferences to surface ideal properties proactively." },
  { icon: BarChart3, title: "Predictive Insights", desc: "Data models trained on thousands of luxury transactions forecast price movements and optimal listing times." },
  { icon: Sparkles, title: "Smart Marketing", desc: "AI-generated property descriptions, dynamic ad targeting, and automated A/B testing maximise visibility for every listing." },
];

const OFFICES = [
  { city: "Altea", region: "Costa Blanca", flag: "🇪🇸", type: "Headquarters" },
  { city: "Jávea", region: "Costa Blanca", flag: "🇪🇸", type: "Regional Office" },
  { city: "Calpe", region: "Costa Blanca", flag: "🇪🇸", type: "Regional Office" },
  { city: "Ibiza", region: "Balearic Islands", flag: "🇪🇸", type: "Island Office" },
  { city: "Warsaw", region: "Poland", flag: "🇵🇱", type: "International Office" },
];

const LANGUAGES = [
  "Spanish", "English", "Russian", "Dutch", "Polish", "German",
  "Armenian", "French", "Catalan", "Norwegian", "Swedish", "Romanian",
  "Portuguese", "Serbian"
];

const AREAS = [
  { name: "Altea Hills", zone: "Altea" },
  { name: "Villa Gadea", zone: "Altea" },
  { name: "Don Cayo Golf", zone: "Altea" },
  { name: "Mascarat", zone: "Altea" },
  { name: "Ambolo", zone: "Jávea" },
  { name: "La Granadella", zone: "Jávea" },
  { name: "Portitxol", zone: "Jávea" },
  { name: "Cabo de Las Huertas", zone: "Alicante" },
  { name: "Cumbre del Sol", zone: "Moraira" },
  { name: "Las Rotas-Montgó", zone: "Denia" },
];

const OFFMARKET_FEATURES = [
  { icon: Lock, title: "Private Network Only", desc: "Access to properties that never appear on public portals — shared exclusively within our vetted buyer network." },
  { icon: Shield, title: "Confidential Access", desc: "Every interaction protected by strict NDAs and controlled disclosure protocols for both buyer and seller." },
  { icon: Network, title: "Encrypted Sharing", desc: "Property details transmitted through secure, encrypted channels with time-limited access and viewing tracking." },
];

const SYSTEM_STEPS = [
  { num: "01", title: "Instant Response", desc: "Every enquiry receives a personalised response within seconds via our AI-assisted communication system." },
  { num: "02", title: "Client Profiling", desc: "Deep-dive consultation to understand lifestyle, investment goals, and property requirements with precision." },
  { num: "03", title: "Curated Selection", desc: "AI-matched shortlist of properties, including off-market opportunities, tailored to the client's exact criteria." },
  { num: "04", title: "Expert Negotiation", desc: "Senior advisors manage the entire transaction with strategic negotiation and legal coordination." },
  { num: "05", title: "Seamless Closing", desc: "End-to-end support through legal, fiscal, and administrative processes for a stress-free completion." },
];

const VALUES = [
  { icon: Scale, title: "Transparency", desc: "Clear pricing, honest valuations, and full disclosure at every stage of the transaction." },
  { icon: Lock, title: "Confidentiality", desc: "Absolute discretion in handling client data, property details, and financial information." },
  { icon: Heart, title: "Integrity", desc: "Ethical practice as a non-negotiable standard — we represent our clients' interests above all else." },
];

const TESTIMONIALS = [
  { quote: "Their technology-driven approach identified properties we would never have found through traditional channels. Truly impressive.", author: "James & Victoria H.", location: "London, UK" },
  { quote: "The discretion and professionalism of the Private Office is unmatched. They understand what ultra-high-net-worth clients need.", author: "Ahmad Al-Rashid", location: "Dubai, UAE" },
  { quote: "From AI matching to final signature, every detail was handled with absolute precision and genuine care.", author: "Sophie Müller", location: "Zürich, Switzerland" },
];

/* ═══════════════════════════════════════════════ */

const F = fonts.heading; // Single font — Jost everywhere

const AboutPageV4 = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout navVariant="transparent" activePath="/about4" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="About Luxinmo — Luxury Real Estate, Powered by Intelligence"
        description="Founded by Arman & Suren Yeghiazaryan. 25+ years of experience in luxury real estate across the Mediterranean. Technology-driven, client-first."
      />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Luxinmo headquarters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.75) 0%, rgba(20,18,16,0.15) 35%, rgba(20,18,16,0.45) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-light mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Since 2009 · Costa Blanca · Ibiza · Warsaw
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-extralight leading-[1.12] mb-6" style={{ color: "#fff", fontFamily: F, letterSpacing: "0.06em" }}>
              LUXURY REAL ESTATE,<br />
              POWERED BY INTELLIGENCE
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-14 h-[1px] mx-auto mb-6" style={{ background: palette.offMarketAccent }} />
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.85] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontFamily: F }}>
              More than 25 years of experience combining data, technology and human expertise to redefine luxury real estate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS RIBBON ═══ */}
      <section className="py-10 sm:py-14" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center" style={{ borderRight: i < 3 ? `1px solid ${palette.border}` : "none" }}>
                  <p className="text-3xl sm:text-4xl font-extralight" style={{ fontFamily: F, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight, fontFamily: F }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 2. WHO WE ARE ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent, fontFamily: F }}>Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                A Data-Driven<br />Luxury Advisory
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted, fontFamily: F }}>
                Despite being a relatively young company, Luxinmo Real Estate is backed by a team with more than 25 years of experience in buying and selling luxury residential properties along the Costa Blanca — Alicante, Benidorm, El Albir, Altea, Moraira, Jávea, Denia — and Ibiza.
              </p>
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted, fontFamily: F }}>
                Within less than a decade since its birth in Altea, our brand has become highly regarded by customers, promoters and investors as one of the leaders in the sector. Today, Luxinmo operates as a data-driven luxury advisory firm — where every decision is backed by market intelligence.
              </p>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ border: `1px solid ${palette.accent}50` }}>
                  <Play className="w-4 h-4 ml-0.5" style={{ color: palette.accent }} />
                </div>
                <span className="text-xs tracking-[0.12em] uppercase font-light group-hover:opacity-70 transition-opacity" style={{ color: palette.accent, fontFamily: F }}>Watch Our Story</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <img src={prop1} alt="Luxinmo team" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-6 sm:p-8" style={{ background: palette.accent }}>
                  <p className="text-3xl sm:text-4xl font-extralight text-white" style={{ fontFamily: F }}>2009</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-white/70 mt-1" style={{ fontFamily: F }}>Founded by the<br />Yeghiazaryan Brothers</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 3. LEADERSHIP ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Leadership</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                The Visionaries Behind Luxinmo
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {LEADERSHIP.map((leader, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <div className="group h-full" style={{ border: `1px solid ${palette.border}`, background: palette.white }}>
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={typeof leader.image === "string" ? leader.image : leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <h3 className="text-2xl sm:text-3xl font-extralight text-white mb-1" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                        {leader.name}
                      </h3>
                      <p className="text-[11px] tracking-[0.25em] uppercase text-white/70 font-normal" style={{ fontFamily: F }}>
                        {leader.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-[14px] leading-[1.85] font-light mb-6" style={{ color: palette.textMuted, fontFamily: F }}>
                      {leader.bio}
                    </p>
                    <div className="flex items-start gap-3 pt-5" style={{ borderTop: `1px solid ${palette.border}` }}>
                      <Quote className="w-4 h-4 mt-1 shrink-0" style={{ color: palette.accent }} strokeWidth={1.5} />
                      <p className="text-[14px] leading-[1.7] font-extralight italic" style={{ fontFamily: F, color: palette.text }}>
                        {leader.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Milestones</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: F, letterSpacing: "0.04em" }}>Our Journey</h2>
            </div>
          </FadeIn>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: palette.border }} />
              {TIMELINE.map((t, i) => (
                <button key={i} onClick={() => setActiveTimeline(i)} className="relative z-10 flex flex-col items-center gap-3 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full transition-all duration-300" style={{ background: activeTimeline === i ? palette.accent : palette.border, transform: activeTimeline === i ? "scale(1.4)" : "scale(1)" }} />
                  <span className="text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300" style={{ color: activeTimeline === i ? palette.accent : palette.textLight, fontFamily: F }}>{t.year}</span>
                </button>
              ))}
            </div>
            <FadeIn key={activeTimeline}>
              <div className="text-center max-w-2xl mx-auto pt-6">
                <h3 className="text-2xl font-extralight mb-4" style={{ fontFamily: F, letterSpacing: "0.04em" }}>{TIMELINE[activeTimeline].title}</h3>
                <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted, fontFamily: F }}>{TIMELINE[activeTimeline].desc}</p>
              </div>
            </FadeIn>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-8">
            {TIMELINE.map((t, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: palette.accent }} />
                    {i < TIMELINE.length - 1 && <div className="w-[1px] flex-1 mt-2" style={{ background: palette.border }} />}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs tracking-[0.15em] uppercase font-normal mb-1" style={{ color: palette.accent, fontFamily: F }}>{t.year}</p>
                    <h3 className="text-lg font-light mb-2" style={{ fontFamily: F }}>{t.title}</h3>
                    <p className="text-[13px] leading-[1.7] font-light" style={{ color: palette.textMuted, fontFamily: F }}>{t.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM & LANGUAGES ═══ */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent, fontFamily: F }}>Our Team</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                Multilingual Excellence
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted, fontFamily: F }}>
                With the aim of facilitating effective communication and providing personalised attention, we have agents who speak the native language of owners and buyers. From a simple phone consultation to assistance in preparing documents and managing mortgages — ensuring a complete and satisfactory experience.
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang, i) => (
                  <span key={i} className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 font-light" style={{ border: `1px solid ${palette.border}`, color: palette.textMuted, fontFamily: F }}>
                    {lang}
                  </span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <img src={prop3} alt="Luxinmo team" className="w-full aspect-[4/3] object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ LUXURY PHILOSOPHY ═══ */}
      <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
        <img src={prop2} alt="Luxury philosophy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.75)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] tracking-[0.35em] uppercase mb-4 font-normal" style={{ color: palette.offMarketAccent, fontFamily: F }}>Our Philosophy</p>
              <h2 className="text-2xl sm:text-3xl md:text-[2.8rem] font-extralight text-white leading-[1.2] mb-5" style={{ fontFamily: F, letterSpacing: "0.06em" }}>
                LUXURY IS NOT PRICE
              </h2>
              <p className="text-[14px] sm:text-[15px] font-light max-w-lg mx-auto leading-[1.85]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: F }}>
                Our philosophy is based on growth through the provision of the best service as a means of offering the best product.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(255,255,255,0.08)" }}>
            {PHILOSOPHY_PILLARS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-7 sm:p-9 text-center h-full" style={{ background: "rgba(20,18,16,0.85)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ border: "1px solid rgba(201,169,110,0.3)" }}>
                    <p.icon className="w-5 h-5" style={{ color: palette.offMarketAccent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-light text-white mb-3 tracking-wider" style={{ fontFamily: F }}>{p.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: "rgba(255,255,255,0.45)", fontFamily: F }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY & AI ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] tracking-[0.35em] uppercase mb-3 font-normal" style={{ color: palette.offMarketAccent, fontFamily: F }}>Innovation</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-5" style={{ fontFamily: F, letterSpacing: "0.06em" }}>
                TECHNOLOGY & AI IN<br />LUXURY REAL ESTATE
              </h2>
              <p className="text-[14px] sm:text-[15px] font-light max-w-2xl mx-auto leading-[1.85]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: F }}>
                We invest in the constant improvement of our own technology for market control and monitoring — from proprietary Big Data to AI-driven matching.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: "rgba(255,255,255,0.06)" }}>
            {TECH_FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-7 sm:p-9 transition-colors duration-300 hover:bg-white/[0.03] h-full" style={{ background: palette.offMarketBg }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ border: "1px solid rgba(201,169,110,0.3)" }}>
                    <f.icon className="w-[18px] h-[18px]" style={{ color: palette.offMarketAccent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-light text-white mb-3 tracking-wide" style={{ fontFamily: F }}>{f.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: "rgba(255,255,255,0.45)", fontFamily: F }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OFF-MARKET ACCESS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent, fontFamily: F }}>Exclusive Services</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                Off-Market Access
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted, fontFamily: F }}>
                Created in 2019, Luxinmo Exclusive Services is dedicated to satisfying the needs of the most demanding clients who seek absolute confidentiality. The most valuable properties are never published.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90" style={{ background: palette.accent, fontFamily: F }}>
                Request Access <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-0">
                {OFFMARKET_FEATURES.map((f, i) => (
                  <div key={i} className="flex gap-5 py-7" style={{ borderBottom: i < OFFMARKET_FEATURES.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ border: `1px solid ${palette.border}` }}>
                      <f.icon className="w-5 h-5" style={{ color: palette.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-light mb-2 tracking-wide" style={{ fontFamily: F }}>{f.title}</h3>
                      <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted, fontFamily: F }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Our Offices</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                5 Strategic Locations
              </h2>
              <p className="text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: palette.textMuted, fontFamily: F }}>
                From our headquarters in Altea to our international office in Warsaw — maximum control of the most prestigious areas.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px]" style={{ background: palette.border }}>
            {OFFICES.map((o, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-6 sm:p-7 text-center h-full" style={{ background: palette.white }}>
                  <p className="text-3xl mb-3">{o.flag}</p>
                  <h3 className="text-[16px] font-light mb-1 tracking-wide" style={{ fontFamily: F }}>{o.city}</h3>
                  <p className="text-[12px] font-light mb-2" style={{ color: palette.textMuted, fontFamily: F }}>{o.region}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: palette.accent, fontFamily: F }}>{o.type}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AREAS OF EXPERTISE ═══ */}
      <section className="py-16 sm:py-24" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Areas of Expertise</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                Prime Locations We Control
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[1px]" style={{ background: palette.border }}>
            {AREAS.map((a, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="p-5 sm:p-6 text-center h-full cursor-pointer transition-colors duration-300 hover:bg-[#FAF8F5]" style={{ background: palette.white }}>
                  <h3 className="text-[14px] font-light mb-1 tracking-wide" style={{ fontFamily: F }}>{a.name}</h3>
                  <p className="text-[11px] font-light" style={{ color: palette.textLight, fontFamily: F }}>{a.zone}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SYSTEM / PROCESS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Our System</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: F, letterSpacing: "0.04em" }}>Structured for Excellence</h2>
              <p className="text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: palette.textMuted, fontFamily: F }}>
                A proven, technology-enhanced process designed to deliver precision results at every stage.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px]" style={{ background: palette.border }}>
            {SYSTEM_STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-6 sm:p-7 h-full" style={{ background: palette.white }}>
                  <p className="text-3xl font-extralight mb-4" style={{ color: palette.accent, fontFamily: F }}>{s.num}</p>
                  <h3 className="text-[15px] font-light mb-3 tracking-wide" style={{ fontFamily: F }}>{s.title}</h3>
                  <p className="text-[12px] leading-[1.7] font-light" style={{ color: palette.textMuted, fontFamily: F }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ETHICS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent, fontFamily: F }}>Our Values</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
                Ethics & Integrity
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: `1px solid ${palette.border}` }}>
            {VALUES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 sm:p-10 text-center h-full" style={{ borderRight: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: `1px solid ${palette.border}` }}>
                    <v.icon className="w-6 h-6" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-light mb-3 tracking-wide" style={{ fontFamily: F }}>{v.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted, fontFamily: F }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <img src={prop2} alt="Client testimonial" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.65)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <Quote className="w-8 h-8 mx-auto mb-6" style={{ color: "rgba(255,255,255,0.2)" }} strokeWidth={1} />
            <p className="text-lg sm:text-2xl md:text-3xl font-extralight leading-[1.5] italic" style={{ color: "#fff", fontFamily: F, letterSpacing: "0.03em" }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-sm tracking-[0.15em] uppercase font-light" style={{ color: "rgba(255,255,255,0.7)", fontFamily: F }}>{TESTIMONIALS[activeTestimonial].author}</span>
              <span className="text-xs tracking-[0.1em] font-light" style={{ color: "rgba(255,255,255,0.45)", fontFamily: F }}>{TESTIMONIALS[activeTestimonial].location}</span>
            </div>
            <div className="flex gap-2 justify-center mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className="transition-all duration-500" style={{ width: i === activeTestimonial ? 24 : 8, height: 2, borderRadius: 1, background: i === activeTestimonial ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ GOALS / CTA ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent, fontFamily: F }}>Our Commitment</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-6" style={{ fontFamily: F, letterSpacing: "0.04em" }}>
              Building the Future of<br />Luxury Real Estate
            </h2>
            <p className="text-[15px] font-light leading-[1.8] mb-10 max-w-lg mx-auto" style={{ color: palette.textMuted, fontFamily: F }}>
              The challenge and commitment of Luxinmo is to grow and evolve by incorporating our clients into the dynamics of the contemporary market. We are convinced that the future is in the hands of those committed to technological development.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/properties"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent, fontFamily: F }}
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300 hover:bg-white"
                style={{ border: `1px solid ${palette.border}`, color: palette.text, fontFamily: F }}
              >
                <Phone className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
};

export default AboutPageV4;
