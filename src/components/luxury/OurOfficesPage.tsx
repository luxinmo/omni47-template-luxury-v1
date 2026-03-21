import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, Globe, Users, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts, brand } from "@/config/template";

import heroImg from "@/assets/offices-hero.jpg";
import marbellaImg from "@/assets/office-marbella.jpg";
import ibizaImg from "@/assets/office-ibiza.jpg";
import mallorcaImg from "@/assets/office-mallorca.jpg";
import interiorImg from "@/assets/office-interior.jpg";

/* ─── Data ─── */
const OFFICES = [
  {
    id: "marbella",
    name: "Marbella",
    label: "Headquarters",
    region: "Costa del Sol",
    image: marbellaImg,
    description: "Our flagship office on the Golden Mile — the epicentre of luxury real estate on the Costa del Sol. A dedicated team of multilingual advisors awaits you in a setting designed for discretion and comfort.",
    address: "Av. Ricardo Soriano, 72, Planta 1ª\n29601 Marbella, Málaga",
    phone: "+34 952 123 456",
    email: "marbella@prestigeestates.com",
    hours: "Mon – Fri  09:00 – 19:00\nSat  10:00 – 14:00",
    languages: ["English", "Spanish", "German", "French", "Russian", "Arabic"],
    team: 14,
    lat: 36.51,
    lng: -4.88,
  },
  {
    id: "ibiza",
    name: "Ibiza",
    label: "Balearic Islands",
    region: "Ibiza",
    image: ibizaImg,
    description: "Nestled in the heart of Ibiza Town, our island office specialises in exclusive waterfront villas, fincas and contemporary retreats across the White Isle.",
    address: "Paseo Vara de Rey, 15, 2º\n07800 Ibiza",
    phone: "+34 971 234 567",
    email: "ibiza@prestigeestates.com",
    hours: "Mon – Fri  09:30 – 18:30",
    languages: ["English", "Spanish", "German", "Italian"],
    team: 8,
    lat: 38.91,
    lng: 1.43,
  },
  {
    id: "mallorca",
    name: "Palma de Mallorca",
    label: "Balearic Islands",
    region: "Mallorca",
    image: mallorcaImg,
    description: "Located in the historic Paseo del Borne, our Palma office brings unrivalled knowledge of the Mallorcan market — from Son Vida estates to Port Andratx waterfront.",
    address: "Paseo del Borne, 28, Entresuelo\n07012 Palma de Mallorca",
    phone: "+34 971 345 678",
    email: "mallorca@prestigeestates.com",
    hours: "Mon – Fri  09:00 – 18:00",
    languages: ["English", "Spanish", "German", "Swedish"],
    team: 10,
    lat: 39.57,
    lng: 2.65,
  },
];

const STATS = [
  { value: "3", label: "Offices" },
  { value: "32+", label: "Advisors" },
  { value: "14", label: "Languages" },
  { value: "24/7", label: "Concierge" },
];

/* ─── Component ─── */
export default function OurOfficesPage() {
  const [activeId, setActiveId] = useState(OFFICES[0].id);
  const active = OFFICES.find((o) => o.id === activeId) || OFFICES[0];

  return (
    <Layout navVariant="transparent" activePath="/our-offices">
      <SEOHead
        title="Our Offices"
        description={`Visit ${brand.fullName} across the Mediterranean — Marbella, Ibiza & Palma de Mallorca. Multilingual luxury property advisors.`}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <img src={heroImg} alt="Mediterranean coastline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-20 md:pb-28 w-full">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: palette.accent, fontFamily: fonts.body }}>
              {brand.fullName}
            </p>
            <h1 className="text-[42px] md:text-[64px] lg:text-[76px] font-extralight leading-[1.05] tracking-[-0.01em] text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Offices
            </h1>
            <p className="text-[15px] md:text-[17px] font-light leading-[1.7] text-white/70 max-w-xl">
              Three exceptional locations across the Mediterranean, united by a single commitment — to deliver an unparalleled real estate experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS RIBBON ═══ */}
      <section style={{ background: palette.text }}>
        <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <span className="block text-[28px] md:text-[34px] font-extralight tracking-[-0.02em] text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.accent }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PHILOSOPHY STRIP ═══ */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[900px] mx-auto px-6 py-20 md:py-28 text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-6" style={{ color: palette.accent }}>Our Philosophy</p>
            <blockquote className="text-[22px] md:text-[28px] font-extralight leading-[1.55] tracking-[0.01em] italic" style={{ color: palette.text, fontFamily: "'Playfair Display', serif" }}>
              "Every office is designed as a sanctuary — a place where clients feel the same sense of refinement and tranquillity they seek in their future home."
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INTERIOR SHOWCASE ═══ */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img src={interiorImg} alt="Office interior" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center px-8 md:px-16 py-16 lg:py-0" style={{ background: palette.bg }}>
            <FadeIn>
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: palette.accent }}>The Experience</p>
              <h2 className="text-[26px] md:text-[32px] font-extralight leading-[1.3] mb-6" style={{ color: palette.text, fontFamily: "'Playfair Display', serif" }}>
                Designed for<br />Distinction
              </h2>
              <p className="text-[14px] font-light leading-[1.8] mb-6" style={{ color: palette.textMuted }}>
                Our offices are more than workspaces — they are an extension of the lifestyle we represent. Curated interiors, private consultation rooms and a welcoming ambience ensure every visit is an experience in itself.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Private viewings" },
                  { icon: Globe, label: "Multilingual team" },
                  { icon: Award, label: "Premium service" },
                  { icon: Clock, label: "Flexible hours" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" style={{ color: palette.accent }} />
                    <span className="text-[12px] tracking-[0.06em] font-light" style={{ color: palette.textMuted }}>{label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ OFFICE SELECTOR (tabs + detail) ═══ */}
      <section className="py-20 md:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Visit Us</p>
              <h2 className="text-[28px] md:text-[38px] font-extralight tracking-[0.01em]" style={{ color: palette.text, fontFamily: "'Playfair Display', serif" }}>
                Choose Your Destination
              </h2>
            </div>
          </FadeIn>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {OFFICES.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveId(o.id)}
                className="group relative px-8 py-3 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-500"
                style={{
                  background: activeId === o.id ? palette.text : "transparent",
                  color: activeId === o.id ? palette.white : palette.textMuted,
                  border: `1px solid ${activeId === o.id ? palette.text : palette.border}`,
                }}
              >
                {o.name}
              </button>
            ))}
          </div>

          {/* Active office — cinematic card */}
          <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden" style={{ border: `1px solid ${palette.border}` }}>
            {/* Image — spans 3 cols */}
            <div className="lg:col-span-3 relative overflow-hidden aspect-[16/10] lg:aspect-auto">
              <img
                key={active.id}
                src={active.image}
                alt={`${brand.name} ${active.name} office`}
                className="w-full h-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/60">{active.label}</span>
                <h3 className="text-[28px] md:text-[36px] font-extralight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {active.name}
                </h3>
              </div>
            </div>

            {/* Info — spans 2 cols */}
            <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between" style={{ background: palette.bg }}>
              <div>
                <p className="text-[13px] font-light leading-[1.8] mb-8" style={{ color: palette.textMuted }}>
                  {active.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[13px] font-light leading-[1.6] whitespace-pre-line" style={{ color: palette.textMuted }}>{active.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                    <a href={`tel:${active.phone}`} className="text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>{active.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                    <a href={`mailto:${active.email}`} className="text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>{active.email}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-1 shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[13px] font-light leading-[1.6] whitespace-pre-line" style={{ color: palette.textLight }}>{active.hours}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <span className="text-[10px] tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: palette.accent }}>Languages Spoken</span>
                  <div className="flex flex-wrap gap-1.5">
                    {active.languages.map((l) => (
                      <span key={l} className="px-2.5 py-1 text-[10px] tracking-[0.06em] font-light" style={{ background: palette.white, border: `1px solid ${palette.border}`, color: palette.textMuted }}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${active.lat},${active.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80"
                  style={{ background: palette.text, color: palette.white }}
                >
                  <Navigation className="w-3.5 h-3.5" /> Get Directions
                </a>
                <Link
                  to="/contact"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80"
                  style={{ border: `1px solid ${palette.text}`, color: palette.text }}
                >
                  Book a Visit <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALL OFFICES GRID (quick-glance) ═══ */}
      <section className="py-20 md:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>At a Glance</p>
              <h2 className="text-[28px] md:text-[38px] font-extralight" style={{ color: palette.text, fontFamily: "'Playfair Display', serif" }}>
                All Locations
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICES.map((office, i) => (
              <FadeIn key={office.id} delay={i * 0.12}>
                <div
                  className="group cursor-pointer overflow-hidden"
                  style={{ border: `1px solid ${palette.border}`, background: palette.white }}
                  onClick={() => { setActiveId(office.id); window.scrollTo({ top: document.getElementById("offices-selector")?.offsetTop || 600, behavior: "smooth" }); }}
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={office.image} alt={`Office in ${office.name}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
                    <div className="absolute bottom-4 left-5">
                      <h3 className="text-[18px] font-light tracking-[0.02em] text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{office.name}</h3>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-white/50">{office.region}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}>
                      <Users className="w-3 h-3 text-white/70" />
                      <span className="text-[10px] tracking-[0.08em] text-white/80">{office.team} advisors</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: palette.accent }} />
                      <span className="text-[12px] font-light leading-[1.5] whitespace-pre-line" style={{ color: palette.textMuted }}>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                      <a href={`tel:${office.phone}`} className="text-[12px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                      <a href={`mailto:${office.email}`} className="text-[12px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.email}</a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: palette.accent }}>Get in Touch</p>
            <h2 className="text-[26px] md:text-[34px] font-extralight leading-[1.3] mb-5" style={{ color: palette.text, fontFamily: "'Playfair Display', serif" }}>
              We'd love to welcome you
            </h2>
            <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ color: palette.textMuted }}>
              Whether you prefer to visit in person, schedule a video call or simply pick up the phone — our advisors are ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-10 py-3.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 hover:opacity-85"
                style={{ background: palette.accent, color: palette.white }}
              >
                Contact Us
              </Link>
              <a
                href="tel:+34952123456"
                className="px-10 py-3.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 hover:opacity-85"
                style={{ border: `1px solid ${palette.text}`, color: palette.text }}
              >
                Call Now
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
