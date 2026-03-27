import { useRef, useState, useEffect } from "react";
import { palette, fonts, brand } from "@/config/template";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import {
  Lock,
  Eye,
  ShieldCheck,
  BarChart3,
  Brain,
  Zap,
  Clock,
  UserCheck,
  Target,
  Scale,
  Compass,
  Ship,
  Gem,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Elite palette ─── */
const elite = {
  black: "#0A0A0A",
  charcoal: "#1A1A1A",
  darkGray: "#2A2A2A",
  midGray: "#6B6B6B",
  lightGray: "#A0A0A0",
  cream: "#F5F0E8",
  gold: "#C9A96E",
  goldLight: "#D4BA85",
  goldDark: "#A88B4A",
  white: "#FAFAFA",
};

/* ─── Stats ─── */
const STATS = [
  { value: "+700", label: "Transactions Closed" },
  { value: "€100M+", label: "Annual Volume" },
  { value: "75%", label: "International Clients" },
];

/* ─── Off-market items ─── */
const OFFMARKET_ITEMS = [
  { icon: Lock, text: "Private villas in Ibiza" },
  { icon: Gem, text: "High-value assets" },
  { icon: ShieldCheck, text: "Discreet sellers" },
  { icon: Eye, text: "Confidential transactions" },
];

const OFFMARKET_ACCESS = [
  "Direct client qualification",
  "Private introductions",
  "Encrypted documentation",
  "Controlled access environments",
];

/* ─── Technology sub-blocks ─── */
const TECH_BLOCKS = [
  {
    icon: BarChart3,
    title: "Data & Market Intelligence",
    items: ["500,000+ properties analyzed", "Micro-location pricing", "Market trend prediction"],
  },
  {
    icon: Zap,
    title: "Proprietary CRM",
    items: ["Response under 5 minutes", "Automated workflows", "Behavioral client profiling"],
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    items: ["Matching precision", "Opportunity detection", "Real-time insights"],
  },
];

/* ─── System steps ─── */
const SYSTEM_STEPS = [
  { icon: Clock, text: "Immediate response" },
  { icon: UserCheck, text: "Deep client profiling" },
  { icon: Target, text: "Strategic property selection" },
  { icon: Scale, text: "Controlled negotiation" },
  { icon: ShieldCheck, text: "Legal supervision" },
];

/* ─── Founder qualities ─── */
const FOUNDER_QUALITIES = [
  "Market understanding",
  "Strategic thinking",
  "System-based operations",
];

/* ─── Experience services ─── */
const EXPERIENCE_SERVICES = [
  { icon: Compass, label: "Private tours" },
  { icon: Gem, label: "Concierge services" },
  { icon: Ship, label: "Yacht and travel coordination" },
  { icon: Target, label: "Lifestyle integration" },
];

/* ─── Ethics ─── */
const ETHICS = [
  "No misinformation",
  "No price manipulation",
  "No exposure without consent",
  "Total confidentiality",
];

/* ─────────────────── COMPONENT ─────────────────── */
export default function AboutPageV5() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout showNavbar showFooter navVariant="transparent">
      <SEOHead
        title="About Luxinmo — Private Access to Luxury Real Estate"
        description="Luxinmo is not a real estate agency. It is a system of access to luxury properties through data, technology and private networks."
      />

      {/* ═══════════════════════════════════════════
          1. HERO — CINEMATIC
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: elite.black }}
      >
        {/* Video / image background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury property at dusk"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35, filter: "brightness(0.6) saturate(0.8)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${elite.black}CC 0%, ${elite.black}88 40%, ${elite.black}DD 100%)`,
            }}
          />
        </div>

        {/* Content */}
        <div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] mb-8 uppercase tracking-[0.08em]"
            style={{ color: elite.white, fontFamily: fonts.heading }}
          >
            Luxury Is Not Listed.
            <br />
            <span style={{ color: elite.gold }}>It's Accessed.</span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 max-w-2xl mx-auto"
            style={{ color: elite.lightGray, fontFamily: fonts.body }}
          >
            We give our clients access to properties that never reach the market
            — through data, technology and private networks.
          </p>

          <p
            className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-12"
            style={{ color: elite.midGray, fontFamily: fonts.body }}
          >
            Off-Market · Private Clients · Strategic Advisory
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 hover:scale-105"
            style={{
              background: elite.gold,
              color: elite.black,
              fontFamily: fonts.body,
            }}
          >
            Request Private Access
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="w-px h-12"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${elite.gold}60 100%)`,
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. STATUS METRICS
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.charcoal }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.15} className="text-center">
                <p
                  className="text-4xl md:text-5xl font-extralight mb-2"
                  style={{ color: elite.gold, fontFamily: fonts.heading }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs uppercase tracking-[0.25em]"
                  style={{ color: elite.midGray, fontFamily: fonts.body }}
                >
                  {s.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. ACCESS
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.black }}>
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <FadeIn>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-8"
              style={{ color: elite.gold, fontFamily: fonts.body }}
            >
              Core Principle
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-[0.06em] mb-12"
              style={{ color: elite.white, fontFamily: fonts.heading }}
            >
              Access Defines Everything
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="text-base sm:text-lg font-light leading-[2] mb-16 space-y-1"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              <p>Most luxury properties are never published.</p>
              <p className="mt-4">They are not on portals.</p>
              <p>They are not searchable.</p>
              <p>They are not visible.</p>
              <p className="mt-4">They are accessed through relationships.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <blockquote
              className="text-2xl sm:text-3xl md:text-4xl font-extralight italic leading-tight mb-14"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              "The best properties are never online."
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.45}>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] font-light border transition-all duration-500 hover:scale-105"
              style={{
                borderColor: elite.gold,
                color: elite.gold,
                fontFamily: fonts.body,
              }}
            >
              Request Off-Market Access
              <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. OFF-MARKET INTELLIGENCE
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.charcoal }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <FadeIn className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: elite.gold, fontFamily: fonts.body }}
            >
              Our Edge
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-[0.06em] mb-6"
              style={{ color: elite.white, fontFamily: fonts.heading }}
            >
              Off-Market Intelligence
            </h2>
            <p
              className="text-base font-light max-w-2xl mx-auto"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              At Luxinmo, a significant part of our operations happens outside the public market.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mb-20">
            {/* Left — assets */}
            <FadeIn delay={0.15}>
              <div className="space-y-6">
                {OFFMARKET_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ border: `1px solid ${elite.gold}30` }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: elite.gold }} />
                    </div>
                    <p
                      className="text-sm font-light"
                      style={{ color: elite.lightGray, fontFamily: fonts.body }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right — access methods */}
            <FadeIn delay={0.3}>
              <p
                className="text-xs uppercase tracking-[0.25em] mb-6"
                style={{ color: elite.midGray, fontFamily: fonts.body }}
              >
                Properties are shared through
              </p>
              <div className="space-y-4">
                {OFFMARKET_ACCESS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: elite.gold }} />
                    <p
                      className="text-sm font-light"
                      style={{ color: elite.lightGray, fontFamily: fonts.body }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="text-center">
            <p
              className="text-xl sm:text-2xl md:text-3xl font-extralight italic"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              "Access is the real luxury."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. TECHNOLOGY — INTELLIGENCE
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.black }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <FadeIn className="text-center mb-6">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: elite.gold, fontFamily: fonts.body }}
            >
              Infrastructure
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-[0.06em] mb-6"
              style={{ color: elite.white, fontFamily: fonts.heading }}
            >
              Intelligence Behind Every Decision
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="text-center mb-16">
            <p
              className="text-base font-light max-w-2xl mx-auto leading-relaxed"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              Our advantage is not only access.
              <br />
              It is how we operate.
            </p>
            <p
              className="text-sm font-light mt-4 max-w-2xl mx-auto"
              style={{ color: elite.midGray, fontFamily: fonts.body }}
            >
              We have built our own internal systems combining:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-20">
            {TECH_BLOCKS.map((block, i) => (
              <FadeIn key={i} delay={i * 0.15 + 0.2}>
                <div
                  className="p-8 h-full"
                  style={{ border: `1px solid ${elite.darkGray}`, background: `${elite.charcoal}40` }}
                >
                  <block.icon className="w-5 h-5 mb-5" style={{ color: elite.gold }} />
                  <h3
                    className="text-sm uppercase tracking-[0.15em] mb-6"
                    style={{ color: elite.white, fontFamily: fonts.heading }}
                  >
                    {block.title}
                  </h3>
                  <div className="space-y-3">
                    {block.items.map((item, j) => (
                      <p
                        key={j}
                        className="text-sm font-light"
                        style={{ color: elite.lightGray, fontFamily: fonts.body }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center">
            <p
              className="text-xl sm:text-2xl md:text-3xl font-extralight italic"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              "Precision is the new form of exclusivity."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. SYSTEM
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.cream }}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          <FadeIn className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: elite.goldDark, fontFamily: fonts.body }}
            >
              Process
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-[0.06em] mb-8"
              style={{ color: elite.black, fontFamily: fonts.heading }}
            >
              A Controlled System
            </h2>
            <div
              className="text-base font-light leading-[2] max-w-xl mx-auto"
              style={{ color: elite.midGray, fontFamily: fonts.body }}
            >
              <p>Every interaction is structured.</p>
              <p>Every decision is informed.</p>
              <p>Every negotiation is intentional.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-md mx-auto space-y-6 mb-16">
              {SYSTEM_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ border: `1px solid ${elite.goldDark}30`, background: `${elite.white}` }}
                  >
                    <step.icon className="w-4 h-4" style={{ color: elite.goldDark }} />
                  </div>
                  <p
                    className="text-sm font-light tracking-wide"
                    style={{ color: elite.black, fontFamily: fonts.body }}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35} className="text-center">
            <p
              className="text-xl sm:text-2xl md:text-3xl font-extralight italic"
              style={{ color: elite.goldDark, fontFamily: fonts.heading }}
            >
              "We don't improvise. We execute."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. FOUNDER — MINIMAL
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.black }}>
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <FadeIn>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: elite.gold, fontFamily: fonts.body }}
            >
              Leadership
            </p>
            <p
              className="text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              Founded by Arman Yeghiazaryan, Luxinmo is built on execution, negotiation and technology.
            </p>
            <p
              className="text-sm font-light mb-10"
              style={{ color: elite.midGray, fontFamily: fonts.body }}
            >
              With over 700 closed transactions, his approach combines:
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-14">
              {FOUNDER_QUALITIES.map((q, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: elite.gold }} />
                  <p
                    className="text-sm font-light"
                    style={{ color: elite.lightGray, fontFamily: fonts.body }}
                  >
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p
              className="text-xl sm:text-2xl md:text-3xl font-extralight italic"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              "Build the system. Control the outcome."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. EXPERIENCE — BEYOND PROPERTY
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.charcoal }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.3em] mb-6"
                style={{ color: elite.gold, fontFamily: fonts.body }}
              >
                Lifestyle
              </p>
              <h2
                className="text-3xl sm:text-4xl font-extralight uppercase tracking-[0.06em] mb-6"
                style={{ color: elite.white, fontFamily: fonts.heading }}
              >
                Beyond Property
              </h2>
              <p
                className="text-base font-light leading-relaxed mb-10"
                style={{ color: elite.lightGray, fontFamily: fonts.body }}
              >
                We design the entire experience around the client.
              </p>

              <div className="space-y-5">
                {EXPERIENCE_SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <s.icon className="w-4 h-4" style={{ color: elite.gold }} />
                    <p
                      className="text-sm font-light"
                      style={{ color: elite.lightGray, fontFamily: fonts.body }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="text-lg sm:text-xl font-extralight italic mt-12"
                style={{ color: elite.gold, fontFamily: fonts.heading }}
              >
                "Luxury is how the process feels."
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Luxury lifestyle experience"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85) saturate(0.9)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 60%, ${elite.charcoal}CC 100%)`,
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. ETHICS — DARK
      ═══════════════════════════════════════════ */}
      <section style={{ background: elite.black }}>
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <FadeIn>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: elite.gold, fontFamily: fonts.body }}
            >
              Principles
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-[0.06em] mb-6"
              style={{ color: elite.white, fontFamily: fonts.heading }}
            >
              Discretion & Integrity
            </h2>
            <p
              className="text-base font-light mb-12"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              In a market driven by visibility, we operate with control.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-14">
              {ETHICS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 px-4"
                  style={{ border: `1px solid ${elite.darkGray}` }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: elite.gold }} />
                  <p
                    className="text-sm font-light text-left"
                    style={{ color: elite.lightGray, fontFamily: fonts.body }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p
              className="text-xl sm:text-2xl md:text-3xl font-extralight italic"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              "Trust is built in what is not said."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FINAL STATEMENT + CTA
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: elite.black }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${elite.charcoal} 0%, ${elite.black} 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 md:py-40 text-center">
          <FadeIn>
            <div
              className="text-lg sm:text-xl md:text-2xl font-light leading-[2] mb-12"
              style={{ color: elite.lightGray, fontFamily: fonts.body }}
            >
              <p>Luxinmo is not a real estate agency.</p>
              <p className="mt-4">It is a system of access.</p>
              <p className="mt-4">
                A structure built to operate where the market is not visible.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight uppercase tracking-[0.06em] mb-16"
              style={{ color: elite.gold, fontFamily: fonts.heading }}
            >
              If it's public, it's already late.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 hover:scale-105"
              style={{
                background: elite.gold,
                color: elite.black,
                fontFamily: fonts.body,
              }}
            >
              Request Private Access
              <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
