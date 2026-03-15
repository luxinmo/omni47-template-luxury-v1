import { Link } from "react-router-dom";
import { Crown, MapPin, ArrowRight, Star, Building2, Shield, Sparkles, Users } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts } from "@/config/template";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import heroImg from "@/assets/luxury-hero.jpg";

const BRANDED_RESIDENCES = [
  { image: prop1, name: "Four Seasons Private Residences", location: "Marbella, Costa del Sol", brand: "Four Seasons", priceFrom: "From €3,500,000", units: 32, status: "Under Construction", description: "Oceanfront residences with full Four Seasons hotel services, private beach club and world-class spa." },
  { image: detail2, name: "The Ritz-Carlton Residences", location: "Ibiza", brand: "Ritz-Carlton", priceFrom: "From €4,200,000", units: 18, status: "Pre-Launch", description: "Ultra-luxury residences featuring panoramic sea views, concierge services and exclusive marina access." },
  { image: detail3, name: "Mandarin Oriental Residences", location: "Altea, Costa Blanca", brand: "Mandarin Oriental", priceFrom: "From €2,800,000", units: 45, status: "Selling", description: "Elegant Mediterranean homes with signature Mandarin Oriental hospitality, wellness centre and fine dining." },
  { image: prop3, name: "Aman Residences", location: "Jávea, Costa Blanca", brand: "Aman", priceFrom: "From €5,100,000", units: 12, status: "Pre-Launch", description: "Serene clifftop villas designed with Aman's philosophy of peace, offering unparalleled privacy and natural beauty." },
  { image: prop2, name: "W Residences", location: "Benidorm, Costa Blanca", brand: "W Hotels", priceFrom: "From €1,900,000", units: 56, status: "Selling", description: "Bold, contemporary living with W's signature energy — rooftop pools, DJ sessions and vibrant social spaces." },
  { image: detail1, name: "Six Senses Residences", location: "Moraira, Costa Blanca", brand: "Six Senses", priceFrom: "From €3,200,000", units: 22, status: "Under Construction", description: "Sustainable luxury homes integrated into nature with Six Senses' renowned wellness and sustainability programmes." },
];

const BENEFITS = [
  { icon: Star, title: "Five-Star Services", description: "Enjoy hotel-grade concierge, housekeeping, dining and spa services in the comfort of your own home." },
  { icon: Shield, title: "Strong Investment", description: "Branded residences typically command 25–35% premium over comparable non-branded properties." },
  { icon: Sparkles, title: "World-Class Amenities", description: "Private pools, fitness centres, fine dining, beach clubs and wellness spas at your doorstep." },
  { icon: Users, title: "Global Community", description: "Join an exclusive community of like-minded owners who appreciate the finer things in life." },
];

const BrandedResidencesPage = () => {
  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false}>
      <SEOHead
        title="Branded Residences — Luxury Hospitality Living in Spain"
        description="Discover branded residences by Four Seasons, Ritz-Carlton, Mandarin Oriental, Aman and more in Costa Blanca, Ibiza and Marbella. Five-star services, world-class amenities and exceptional investment value."
      />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <img src={heroImg} alt="Branded residences luxury living" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,24,22,0.5) 0%, rgba(26,24,22,0.7) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2" style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <Crown className="w-4 h-4" style={{ color: "#c9a96e" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: "#c9a96e" }}>Five-Star Living</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Branded Residences
            </h1>
            <p className="text-[16px] sm:text-lg font-light leading-[1.8] max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
              Live within the world's most prestigious hospitality brands. Discover exclusive residences offering five-star services, world-class amenities and exceptional investment value.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90" style={{ background: "#c9a96e", color: "#1a1816" }}>
              <Crown className="w-4 h-4" /> Request Information
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* WHAT ARE BRANDED RESIDENCES */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Understanding the Concept</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>What Are Branded Residences?</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-6 text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
              <p>
                Branded residences are luxury homes developed in partnership with world-renowned hospitality brands such as Four Seasons, Ritz-Carlton, Mandarin Oriental, Aman and Six Senses. Unlike traditional real estate, these properties carry the name, design standards and service philosophy of an internationally recognised hotel brand — bringing five-star living into a private residential setting.
              </p>
              <p>
                Owners enjoy the best of both worlds: the privacy and permanence of owning a home, combined with the exceptional amenities and services typically reserved for guests of the finest hotels. This includes 24-hour concierge, housekeeping, valet parking, private chefs, spa and wellness facilities, fitness centres, fine dining restaurants and members-only beach or golf clubs — all managed to the exacting standards of the hospitality brand.
              </p>
              <p>
                From an investment perspective, branded residences are among the most resilient segments of the luxury property market. According to leading global consultancies, branded residences command a <strong style={{ color: palette.text }}>25–35% price premium</strong> over comparable non-branded properties and tend to hold their value significantly better during market downturns. The brand association also provides a built-in rental programme, global marketing reach and professional management — making them an attractive option for both lifestyle buyers and investors.
              </p>
              <p>
                Spain has emerged as one of Europe's most dynamic markets for branded residences, with new projects launching along the Costa del Sol, Costa Blanca, Ibiza and Mallorca. These developments attract an international clientele seeking a Mediterranean lifestyle with the assurance of world-class quality and service.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY BRANDED RESIDENCES */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Why Choose</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Branded Residence Advantage</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: palette.white }}>
                    <b.icon className="w-6 h-6" style={{ color: palette.accent }} />
                  </div>
                  <h3 className="text-base font-light tracking-wide mb-3" style={{ fontFamily: fonts.heading }}>{b.title}</h3>
                  <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{b.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENCES LISTING */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our Portfolio</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Available Branded Residences</h2>
              <p className="text-[14px] font-light mt-4 max-w-2xl mx-auto" style={{ color: palette.textMuted }}>
                Explore our curated selection of branded residence projects across Spain's most prestigious locations.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {BRANDED_RESIDENCES.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group cursor-pointer overflow-hidden" style={{ background: palette.white }}>
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={r.image} alt={`${r.name} — ${r.brand} branded residence in ${r.location}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm">
                      <span className="text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: palette.accent }}>{r.brand}</span>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: r.status === "Pre-Launch" ? palette.accent : r.status === "Selling" ? "#2a7d5f" : palette.textLight }}>
                      <span className="text-[10px] tracking-[0.12em] uppercase font-light text-white">{r.status}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                      <p className="text-xs tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>{r.location}</p>
                    </div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide mb-3" style={{ fontFamily: fonts.heading }}>{r.name}</h3>
                    <p className="text-[13px] leading-[1.8] font-light mb-4" style={{ color: palette.textMuted }}>{r.description}</p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                      <p className="text-base font-normal" style={{ color: palette.accent }}>{r.priceFrom}</p>
                      <span className="text-sm font-light" style={{ color: palette.textMuted }}>{r.units} residences</span>
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60 mt-4" style={{ color: palette.accent }}>
                      Request Information <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 md:py-36" style={{ background: "#000000" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <FadeIn>
            <Crown className="w-8 h-8 mx-auto mb-6" style={{ color: "#c9a96e" }} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Interested in Branded Residences?
            </h2>
            <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
              Contact our specialist team for private viewings, investment analysis and exclusive pre-launch access to branded residence projects across Spain.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90" style={{ background: "#c9a96e", color: "#1a1816" }}>
                Schedule a Consultation
              </Link>
              <Link to="/properties" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-80" style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}>
                Browse All Properties
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default BrandedResidencesPage;
