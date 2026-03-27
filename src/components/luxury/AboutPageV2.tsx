import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Play, Quote, Users, Globe, Brain,
  Cpu, LineChart, Shield, Handshake, Building2, TrendingUp,
  Award, Eye, Target, Sparkles, BarChart3, Network, Zap,
  CheckCircle2, ChevronRight, MapPin, Phone
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

/* ─── Data ─── */
const STATS = [
  { value: "€2.1B", label: "Portfolio Value" },
  { value: "350+", label: "Properties Sold" },
  { value: "14", label: "Languages" },
  { value: "Since 2015", label: "Established" },
];

const TIMELINE = [
  { year: "2015", title: "Foundation", desc: "Prestige Estates was founded in Marbella with a clear vision: to redefine luxury real estate advisory on the Mediterranean coast." },
  { year: "2017", title: "Costa Blanca Expansion", desc: "Opened our second office on the Costa Blanca, bringing our white-glove service to the Alicante and Javea markets." },
  { year: "2019", title: "Off-Market Division", desc: "Launched our exclusive Private Office division, managing ultra-prime transactions with absolute discretion." },
  { year: "2021", title: "Technology Integration", desc: "Pioneered AI-driven property matching and virtual tours, becoming the first luxury agency in Spain with predictive analytics." },
  { year: "2023", title: "International Network", desc: "Established partnerships with 40+ agencies across 18 countries, creating Europe's most connected luxury property network." },
  { year: "2025", title: "AI-First Agency", desc: "Full integration of artificial intelligence across valuations, marketing, and client matching — setting the industry standard." },
];

const SELL_REASONS = [
  { icon: Eye, title: "Global Exposure", desc: "Your property showcased to qualified buyers across 60+ international portals and our private database of 12,000+ clients." },
  { icon: LineChart, title: "AI-Powered Pricing", desc: "Our proprietary algorithms analyse 200+ market variables to determine the optimal listing strategy for maximum return." },
  { icon: Shield, title: "Discretion Guaranteed", desc: "Off-market and whisper campaigns for clients who value privacy above all else." },
  { icon: Award, title: "Premium Presentation", desc: "Professional photography, cinematic video, 3D tours, and bespoke brochures — included as standard." },
  { icon: Handshake, title: "Expert Negotiation", desc: "Our team has negotiated over €800M in transactions, consistently securing 5-12% above market average." },
  { icon: Target, title: "Qualified Buyers Only", desc: "Every prospect is pre-vetted financially and personally, ensuring serious enquiries and efficient closings." },
];

const PARTNERS = [
  { region: "Northern Europe", countries: "UK, Germany, Sweden, Norway, Netherlands", agents: 14 },
  { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Bahrain", agents: 8 },
  { region: "Americas", countries: "USA, Canada, Mexico, Brazil", agents: 10 },
  { region: "Asia Pacific", countries: "Singapore, Hong Kong, Australia", agents: 6 },
  { region: "Mediterranean", countries: "France, Italy, Greece, Portugal", agents: 12 },
];

const TECH_FEATURES = [
  { icon: Brain, title: "Predictive Matching", desc: "Our AI analyses buyer behaviour patterns and lifestyle preferences to match clients with their ideal property before they even search." },
  { icon: BarChart3, title: "Market Intelligence", desc: "Real-time dashboards tracking price trends, absorption rates, and micro-market movements across every postcode we cover." },
  { icon: Sparkles, title: "Automated Valuations", desc: "Machine learning models trained on 50,000+ luxury transactions deliver instant, accurate property valuations within a 3% margin." },
  { icon: Zap, title: "Smart Marketing", desc: "AI-generated descriptions, dynamic ad targeting, and automated A/B testing ensure maximum visibility for every listing." },
  { icon: Network, title: "Blockchain Verification", desc: "Property documents, ownership history, and transaction records secured on blockchain for transparent, tamper-proof dealings." },
  { icon: Cpu, title: "Virtual Staging & Tours", desc: "Immersive 3D walkthroughs and AI-powered virtual staging let international buyers experience properties from anywhere in the world." },
];

const TESTIMONIALS = [
  { quote: "Their technology-driven approach and deep market knowledge helped us sell our villa 40% faster than the market average.", author: "James & Victoria H.", location: "London, UK" },
  { quote: "The discretion and professionalism of the Private Office team is unmatched. A truly exceptional experience.", author: "Ahmad Al-Rashid", location: "Dubai, UAE" },
  { quote: "From the AI property matching to the final signature, every detail was handled with absolute precision.", author: "Sophie Müller", location: "Zürich, Switzerland" },
];

/* ═══════════════════════════════════════════════ */

const AboutPageV2 = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout navVariant="transparent" activePath="/about2" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="About Us — Luxury Real Estate Redefined"
        description="Since 2015, Prestige Estates has pioneered AI-driven luxury real estate advisory across the Mediterranean. Discover our story, technology, and global network."
      />

      {/* ─── HERO ─── */}
      <section className="relative h-[55vh] sm:h-[65vh] lg:h-[75vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Prestige Estates headquarters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.7) 0%, rgba(26,23,20,0.2) 40%, rgba(26,23,20,0.35) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase font-light mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Established 2015 · Marbella
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extralight leading-[1.15] mb-5" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Redefining Luxury<br />Real Estate
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-12 h-[1px] mx-auto mb-5" style={{ background: palette.offMarketAccent }} />
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Where deep market expertise meets cutting-edge technology to deliver an unparalleled property experience.
            </p>
          </FadeIn>
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

      {/* ─── OUR STORY ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Born From a Vision<br />of Excellence
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted }}>
                Founded in 2015 in the heart of Marbella, {brand.fullName} emerged from a conviction that luxury real estate deserved a fundamentally different approach — one where technology amplifies human expertise, and every client interaction reflects the calibre of the properties we represent.
              </p>
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted }}>
                In a decade, we have grown from a boutique advisory into a technology-driven powerhouse, managing a portfolio exceeding €2.1 billion across Spain's most coveted addresses. Our team of 35 professionals speaks 14 languages and shares one obsession: delivering results that exceed expectations.
              </p>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ border: `1px solid ${palette.accent}50` }}>
                  <Play className="w-4 h-4 ml-0.5" style={{ color: palette.accent }} />
                </div>
                <span className="text-xs tracking-[0.12em] uppercase font-light group-hover:opacity-70 transition-opacity" style={{ color: palette.accent }}>Watch Our Story</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <img src={prop1} alt="Prestige Estates team" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-6 sm:p-8" style={{ background: palette.accent }}>
                  <p className="text-3xl sm:text-4xl font-extralight text-white" style={{ fontFamily: fonts.heading }}>10</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-white/70 mt-1">Years of<br />Excellence</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Milestones</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Our Journey</h2>
            </div>
          </FadeIn>

          {/* Desktop timeline */}
          <div className="hidden md:block">
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: palette.border }} />
              {TIMELINE.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTimeline(i)}
                  className="relative z-10 flex flex-col items-center gap-3 transition-all duration-300"
                >
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{ background: activeTimeline === i ? palette.accent : palette.border, transform: activeTimeline === i ? "scale(1.4)" : "scale(1)" }}
                  />
                  <span
                    className="text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300"
                    style={{ color: activeTimeline === i ? palette.accent : palette.textLight }}
                  >
                    {t.year}
                  </span>
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

          {/* Mobile timeline */}
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

      {/* ─── SELL WITH US ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Sellers</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Sell With Us</h2>
              <p className="text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: palette.textMuted }}>
                We don't just list properties — we craft bespoke strategies that maximise your return while respecting your timeline and privacy.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0" style={{ border: `1px solid ${palette.border}` }}>
            {SELL_REASONS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className="p-7 sm:p-9 group cursor-pointer transition-colors duration-300 hover:bg-[#FAF8F5] h-full"
                  style={{
                    borderRight: (i + 1) % 3 !== 0 ? `1px solid ${palette.border}` : "none",
                    borderBottom: i < 3 ? `1px solid ${palette.border}` : "none",
                  }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-colors duration-300" style={{ border: `1px solid ${palette.border}` }}>
                    <r.icon className="w-[18px] h-[18px]" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-light mb-3 tracking-wide" style={{ fontFamily: fonts.heading }}>{r.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{r.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="text-center mt-12 sm:mt-16">
              <a
                href="/sell"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent }}
              >
                Request a Free Valuation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PARTNER NETWORK ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Global Reach</p>
              <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Partner Network
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-8" style={{ color: palette.textMuted }}>
                Our carefully curated network of 40+ partner agencies across 18 countries gives your property exposure to the world's most qualified luxury buyers. Every partner shares our commitment to excellence and discretion.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4" style={{ border: `1px solid ${palette.border}` }}>
                  <p className="text-2xl font-extralight" style={{ color: palette.accent, fontFamily: fonts.heading }}>40+</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase mt-1 font-normal" style={{ color: palette.textLight }}>Partner Agencies</p>
                </div>
                <div className="text-center p-4" style={{ border: `1px solid ${palette.border}` }}>
                  <p className="text-2xl font-extralight" style={{ color: palette.accent, fontFamily: fonts.heading }}>18</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase mt-1 font-normal" style={{ color: palette.textLight }}>Countries</p>
                </div>
                <div className="text-center p-4" style={{ border: `1px solid ${palette.border}` }}>
                  <p className="text-2xl font-extralight" style={{ color: palette.accent, fontFamily: fonts.heading }}>12K+</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase mt-1 font-normal" style={{ color: palette.textLight }}>Active Buyers</p>
                </div>
              </div>
              <a href="/contact" className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Become a Partner <ArrowUpRight className="w-4 h-4" />
              </a>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-0">
                {PARTNERS.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-5 group cursor-pointer transition-colors duration-200 px-1"
                    style={{ borderBottom: `1px solid ${palette.border}` }}
                  >
                    <div className="flex items-center gap-4">
                      <Globe className="w-4 h-4 shrink-0" style={{ color: palette.accent }} strokeWidth={1.5} />
                      <div>
                        <h3 className="text-[15px] font-light tracking-wide" style={{ fontFamily: fonts.heading }}>{p.region}</h3>
                        <p className="text-[12px] font-light mt-0.5" style={{ color: palette.textLight }}>{p.countries}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-light" style={{ color: palette.textMuted }}>{p.agents} agencies</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: palette.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY & AI ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] tracking-[0.35em] uppercase mb-3 font-normal" style={{ color: palette.offMarketAccent }}>Innovation</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
                Technology & AI in<br />Luxury Real Estate
              </h2>
              <p className="text-[14px] sm:text-[15px] font-light max-w-2xl mx-auto leading-[1.8]" style={{ color: "rgba(255,255,255,0.5)" }}>
                We believe the future of luxury real estate lies at the intersection of human expertise and artificial intelligence. Our proprietary technology stack powers every aspect of our service.
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
              <p className="text-lg sm:text-xl font-extralight text-white italic mb-4 max-w-2xl mx-auto leading-[1.6]" style={{ fontFamily: fonts.heading }}>
                "Technology will never replace the art of personal service — but it will empower those who master it to deliver extraordinary results."
              </p>
              <p className="text-xs tracking-[0.15em] uppercase font-light" style={{ color: palette.offMarketAccent }}>
                — Our Philosophy
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIAL CINEMATIC ─── */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <img src={prop2} alt="Client testimonial" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,20,0.6)" }} />
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

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Get in Touch</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Ready to Experience<br />the Difference?
            </h2>
            <p className="text-[15px] font-light leading-[1.8] mb-10 max-w-lg mx-auto" style={{ color: palette.textMuted }}>
              Whether you're searching for the extraordinary or seeking the optimal strategy to sell, our team is ready to exceed your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/properties"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent }}
              >
                View Properties <ArrowRight className="w-4 h-4" />
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

export default AboutPageV2;
