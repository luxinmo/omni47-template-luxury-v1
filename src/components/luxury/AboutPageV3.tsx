import { useState, useEffect } from "react";
import {
  ArrowRight, Play, Quote, Users, Globe, Brain, Cpu, LineChart,
  Shield, Handshake, Building2, TrendingUp, Award, Eye, Target,
  Sparkles, BarChart3, Network, Zap, CheckCircle2, ChevronRight,
  MapPin, Phone, Lock, Database, Bot, Video, Anchor, Plane,
  Car, Heart, Scale, FileCheck, UserCheck, Star, Gem, Crown,
  Briefcase, Layers, MonitorSmartphone, Rocket, MessageCircle
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

/* ─── Data ─── */

const STATS = [
  { value: "+700", label: "Transactions Closed" },
  { value: "€110M", label: "Annual Managed Offers" },
  { value: "1,000+", label: "Active Properties" },
  { value: "75%", label: "International Clients" },
];

const TIMELINE = [
  { year: "2009", title: "Galaxia XXI", desc: "Brothers Suren and Arman Yeghiazaryan create the first construction company dedicated exclusively to the construction of luxury homes in Alicante province." },
  { year: "2015", title: "Luxinmo Is Born", desc: "Founded by Arman Yeghiazaryan as part of Grupo Galaxia Development SL, Luxinmo Real Estate quickly positions itself as a leader in the luxury segment." },
  { year: "2017", title: "Big Data Investment", desc: "Development of proprietary 'Real Estate Market Control' software — monitoring every property on the market, analysing prices and competition in real time." },
  { year: "2019", title: "Exclusive Services", desc: "Launch of Luxinmo Exclusive Services for clients demanding absolute confidentiality and off-market access." },
  { year: "2020", title: "Ibiza Expansion", desc: "Second office opens in Sant Rafel De Sa Creu, Ibiza — bringing the data-driven approach to the Balearic luxury market." },
  { year: "2021", title: "International: Warsaw", desc: "First international office opens in Warsaw, Poland — connecting Eastern European buyers to Mediterranean luxury." },
  { year: "2022", title: "Jávea & Calpe", desc: "New offices in Jávea and Calpe strengthen total control of the Costa Blanca luxury corridor." },
  { year: "2024", title: "International: Netherlands", desc: "Expansion into the Netherlands market — connecting Dutch buyers and investors with Mediterranean luxury properties." },
  { year: "2025", title: "AI-First Agency", desc: "Full AI integration across valuations, buyer matching, marketing automation and market forecasting — setting the industry benchmark." },
];

const TEAM_PREVIEW = [
  { name: "Arman Yeghiazaryan", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", desc: "Visionary leader with 15+ years in luxury real estate and technology innovation." },
  { name: "Elena Martínez", role: "Managing Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", desc: "Oversees all operations across offices, ensuring the highest standards of client service." },
  { name: "David van der Berg", role: "Head of International Sales", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", desc: "Leads our cross-border transactions connecting European buyers to Mediterranean luxury." },
  { name: "Sofia Petrova", role: "Head of Technology & AI", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", desc: "Drives our AI strategy, from predictive analytics to automated client matching." },
  { name: "Carlos Ruiz", role: "Head of Off-Market & Private Office", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80", desc: "Manages our exclusive portfolio and confidential client network." },
];

const PHILOSOPHY_PILLARS = [
  { icon: MapPin, title: "Location", desc: "Prime addresses that define prestige and hold enduring value across market cycles." },
  { icon: Gem, title: "Architecture", desc: "Exceptional design by world-renowned architects that stands as a statement of refined living." },
  { icon: Star, title: "Experience", desc: "Every interaction, every viewing, every negotiation crafted to exceed the expectations of the most discerning clients." },
  { icon: Crown, title: "Scarcity", desc: "True luxury is defined by what cannot be replicated — unique properties in irreplaceable settings." },
];

const TECH_FEATURES = [
  { icon: MonitorSmartphone, title: "Proprietary CRM", desc: "Custom-built technology platform that manages the entire client journey — from first contact to post-sale — with zero dependency on third-party tools." },
  { icon: Zap, title: "Automated Responses", desc: "AI-powered instant responses in multiple languages, ensuring every lead receives personalised attention within seconds, 24/7." },
  { icon: Database, title: "Big Data Engine", desc: "Access to 500,000+ property data points across the Mediterranean. Real-time price tracking, absorption rates, and micro-market analytics." },
  { icon: Brain, title: "AI-Driven Matching", desc: "Machine learning algorithms analyse buyer behaviour, lifestyle preferences, and search patterns to surface ideal properties before clients even request them." },
  { icon: BarChart3, title: "Predictive Insights", desc: "Data models trained on thousands of luxury transactions forecast price movements, optimal listing times, and buyer demand with remarkable accuracy." },
  { icon: Sparkles, title: "Smart Marketing", desc: "AI-generated property descriptions, dynamic ad targeting, and automated A/B testing maximise visibility and engagement for every listing." },
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

const GLOBAL_NETWORK = [
  { icon: Building2, title: "Partner Agencies", desc: "Curated network of luxury agencies across Europe, Middle East, and the Americas sharing deal flow and buyer access." },
  { icon: TrendingUp, title: "Investors", desc: "Direct relationships with institutional and private investors seeking Mediterranean luxury assets with strong ROI potential." },
  { icon: Briefcase, title: "Family Offices", desc: "Trusted connections with family offices managing multi-generational wealth, seeking trophy assets and portfolio diversification." },
];

const EXPERIENCE_SERVICES = [
  { icon: Eye, title: "Private Tours", desc: "Bespoke property tours with dedicated advisors, helicopter transfers, and exclusive access to closed estates." },
  { icon: Users, title: "Concierge", desc: "Full lifestyle concierge — from interior design to school enrollment, relocation support to golden visa processing." },
  { icon: Anchor, title: "Yachts & Maritime", desc: "Charter arrangements, marina berths, and waterfront property pairings for the nautical lifestyle." },
  { icon: Plane, title: "Private Aviation", desc: "Coordination with jet charter services for international viewings and seamless arrival experiences." },
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

const AboutPageV3 = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout navVariant="transparent" activePath="/about3" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="About Luxinmo — Luxury Real Estate, Powered by Intelligence"
        description="Founded in 2015, Luxinmo combines data, technology and human expertise to redefine how luxury property is bought and sold across the Mediterranean."
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-extralight leading-[1.12] mb-6 uppercase" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Luxury Real Estate,<br />
              Powered by Intelligence
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-14 h-[1px] mx-auto mb-6" style={{ background: palette.offMarketAccent }} />
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.85] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              We combine data, technology and human expertise to redefine how luxury property is bought and sold.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-8 mt-8">
              {["Vision", "Discretion", "Excellence"].map((w, i) => (
                <span key={i} className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {w}
                </span>
              ))}
            </div>
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
                  <p className="text-3xl sm:text-4xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                A Data-Driven<br />Luxury Advisory
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted }}>
                Despite being a relatively young company, Luxinmo Real Estate is backed by a team with more than 25 years of experience in buying and selling luxury residential properties along the Costa Blanca — Alicante, Benidorm, El Albir, Altea, Moraira, Jávea, Denia — and Ibiza.
              </p>
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted }}>
                Within less than a decade since its birth in Altea, our brand has become highly regarded by customers, promoters and investors as one of the leaders in the sector. Today, Luxinmo operates as a data-driven luxury advisory firm — where every decision is backed by market intelligence.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <img src={prop1} alt="Luxinmo team" className="w-full aspect-[4/5] object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* ═══ TIMELINE ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>From 2009 to Today</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Our Journey</h2>
            </div>
          </FadeIn>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: palette.border }} />
              {TIMELINE.map((t, i) => (
                <button key={i} onClick={() => setActiveTimeline(i)} className="relative z-10 flex flex-col items-center gap-3 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full transition-all duration-300" style={{ background: activeTimeline === i ? palette.accent : palette.border, transform: activeTimeline === i ? "scale(1.4)" : "scale(1)" }} />
                  <span className="text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300" style={{ color: activeTimeline === i ? palette.accent : palette.textLight }}>{t.year}</span>
                </button>
              ))}
            </div>
            <FadeIn key={activeTimeline}>
              <div className="text-center max-w-2xl mx-auto pt-6">
                <h3 className="text-2xl font-extralight mb-4" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>{TIMELINE[activeTimeline].title}</h3>
                <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>{TIMELINE[activeTimeline].desc}</p>
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
                    <p className="text-xs tracking-[0.15em] uppercase font-normal mb-1" style={{ color: palette.accent }}>{t.year}</p>
                    <h3 className="text-lg font-light mb-2" style={{ fontFamily: fonts.heading }}>{t.title}</h3>
                    <p className="text-[13px] leading-[1.7] font-light" style={{ color: palette.textMuted }}>{t.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. LUXURY PHILOSOPHY ═══ */}
      <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
        <img src={prop2} alt="Luxury philosophy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.75)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] tracking-[0.35em] uppercase mb-4 font-normal" style={{ color: palette.offMarketAccent }}>Our Philosophy</p>
              <h2 className="text-2xl sm:text-3xl md:text-[2.8rem] font-extralight text-white leading-[1.2] mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
                Luxury Is Not Price
              </h2>
              <p className="text-[14px] sm:text-[15px] font-light max-w-lg mx-auto leading-[1.85]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Luxury is location, architecture, experience and scarcity.
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
                  <h3 className="text-[15px] font-light text-white mb-3 tracking-wider" style={{ fontFamily: fonts.heading }}>{p.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. TECHNOLOGY & AI ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] tracking-[0.35em] uppercase mb-3 font-normal" style={{ color: palette.offMarketAccent }}>Innovation</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
                Technology & AI in<br />Luxury Real Estate
              </h2>
              <p className="text-[14px] sm:text-[15px] font-light max-w-2xl mx-auto leading-[1.85]" style={{ color: "rgba(255,255,255,0.45)" }}>
                Luxury and AI go hand in hand. Our proprietary technology stack powers every aspect of the Luxinmo experience — from first contact to closing.
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
                  <h3 className="text-[16px] font-light text-white mb-3 tracking-wide" style={{ fontFamily: fonts.heading }}>{f.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-14 sm:mt-20 p-8 sm:p-12 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-lg sm:text-xl font-extralight text-white italic mb-4 max-w-2xl mx-auto leading-[1.6]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                "Technology will never replace the art of personal service — but it will empower those who master it to deliver extraordinary results."
              </p>
              <p className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.offMarketAccent }}>
                — Our Philosophy
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. OFF-MARKET ACCESS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Private Office</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Off-Market Access
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted }}>
                The most valuable properties are never published. Our Private Office provides confidential access to an exclusive portfolio of ultra-prime properties shared only within our vetted network.
              </p>
              <p className="text-lg sm:text-xl font-extralight italic mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: palette.accent }}>
                Access is the real luxury.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90" style={{ background: palette.accent }}>
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
                      <h3 className="text-[16px] font-light mb-2 tracking-wide" style={{ fontFamily: fonts.heading }}>{f.title}</h3>
                      <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 7. SYSTEM / PROCESS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our System</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Structured for Excellence</h2>
              <p className="text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: palette.textMuted }}>
                A proven, technology-enhanced process designed to deliver precision results at every stage.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px]" style={{ background: palette.border }}>
            {SYSTEM_STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-6 sm:p-7 h-full" style={{ background: palette.white }}>
                  <p className="text-3xl font-extralight mb-4" style={{ color: palette.accent, fontFamily: fonts.heading }}>{s.num}</p>
                  <h3 className="text-[15px] font-light mb-3 tracking-wide" style={{ fontFamily: fonts.heading }}>{s.title}</h3>
                  <p className="text-[12px] leading-[1.7] font-light" style={{ color: palette.textMuted }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. GLOBAL NETWORK ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Global Reach</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Our Network
              </h2>
              <p className="text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: palette.textMuted }}>
                Access to exclusive opportunities through our carefully cultivated network of agencies, investors, and family offices.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: `1px solid ${palette.border}` }}>
            {GLOBAL_NETWORK.map((n, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 sm:p-10 text-center h-full group cursor-pointer transition-colors duration-300 hover:bg-[#FAF8F5]" style={{ borderRight: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-105" style={{ border: `1px solid ${palette.border}` }}>
                    <n.icon className="w-6 h-6" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-light mb-3 tracking-wide" style={{ fontFamily: fonts.heading }}>{n.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{n.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. EXPERIENCE ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Beyond Real Estate</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                The Luxinmo<br />Experience
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted }}>
                We go far beyond property transactions. Our lifestyle concierge and experience services ensure every aspect of your Mediterranean journey is handled with the same precision and care as the property itself.
              </p>
              <div className="relative">
                <img src={prop3} alt="Luxinmo experience" className="w-full aspect-[16/10] object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-0 lg:pt-16">
                {EXPERIENCE_SERVICES.map((s, i) => (
                  <div key={i} className="flex gap-5 py-7 group cursor-pointer" style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300" style={{ border: `1px solid ${palette.border}` }}>
                      <s.icon className="w-[18px] h-[18px]" style={{ color: palette.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-light mb-2 tracking-wide" style={{ fontFamily: fonts.heading }}>{s.title}</h3>
                      <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 10. CONTENT & VIDEO ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <img src={heroImg} alt="Cinematic storytelling" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.8)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-5 font-normal" style={{ color: palette.offMarketAccent }}>Content & Storytelling</p>
            <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-extralight text-white leading-[1.2] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Cinematic Brand Positioning
            </h2>
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.85] mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Every property deserves a story. Our in-house production team creates cinematic video content and editorial photography that positions each listing as a work of art.
            </p>
            <div className="flex items-center justify-center gap-3 cursor-pointer group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ border: "1px solid rgba(201,169,110,0.4)" }}>
                <Play className="w-6 h-6 ml-1" style={{ color: palette.offMarketAccent }} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase font-light group-hover:opacity-70 transition-opacity" style={{ color: palette.offMarketAccent }}>Watch Showreel</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 11. ETHICS ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our Values</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Ethics & Integrity
              </h2>
              <p className="text-[15px] font-light max-w-lg mx-auto leading-[1.8]" style={{ color: palette.textMuted }}>
                The foundation of every relationship we build.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: `1px solid ${palette.border}` }}>
            {VALUES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 sm:p-10 text-center h-full" style={{ borderRight: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: `1px solid ${palette.border}` }}>
                    <v.icon className="w-6 h-6" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-light mb-3 tracking-wide" style={{ fontFamily: fonts.heading }}>{v.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{v.desc}</p>
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
            <p className="text-lg sm:text-2xl md:text-3xl font-extralight leading-[1.5] italic" style={{ color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.03em" }}>
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

      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>The Future</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Building the Future of<br />Luxury Real Estate
            </h2>
            <p className="text-[15px] font-light leading-[1.8] mb-10 max-w-lg mx-auto" style={{ color: palette.textMuted }}>
              Luxinmo is not just keeping pace with the future — we're defining it. Discover how our vision, technology, and team can serve your ambitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/properties"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent }}
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300 hover:bg-white"
                style={{ border: `1px solid ${palette.border}`, color: palette.text }}
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

export default AboutPageV3;
