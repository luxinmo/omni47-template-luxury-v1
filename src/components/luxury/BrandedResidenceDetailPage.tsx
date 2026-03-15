import { useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Crown, MapPin, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Building2, CalendarDays, TrendingUp, Percent, Phone, Mail, MessageCircle,
  CheckCircle2, Waves, Dumbbell, UtensilsCrossed, Car, ShieldCheck, Wifi,
  Sparkles, Star, Users, X, Calendar, Clock, Globe, BedDouble, Maximize, Bath,
  Grid3X3,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts, contact } from "@/config/template";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import heroImg from "@/assets/luxury-hero.jpg";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface Unit {
  ref: string;
  type: string;
  beds: number;
  baths: number;
  sqm: number;
  floor: string;
  orientation: string;
  price: number;
  status: "Available" | "Reserved" | "Sold";
}

interface BrandedProject {
  slug: string;
  name: string;
  brand: string;
  developer: string;
  location: string;
  delivery: string;
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;
  totalUnits: number;
  priceMin: number;
  priceMax: number;
  description: string;
  longDescription: string[];
  images: string[];
  amenities: { icon: any; label: string }[];
  services: string[];
  typologies: { type: string; from: number; sqmRange: string }[];
  units: Unit[];
  location_data: {
    area: string;
    nearbyPlaces: { name: string; distance: string }[];
    airport: string;
    airportDistance: string;
  };
  highlights: string[];
  estimatedROI?: string;
}

const PROJECTS: BrandedProject[] = [
  {
    slug: "four-seasons-marbella",
    name: "Four Seasons Private Residences",
    brand: "Four Seasons",
    developer: "Four Seasons Hotels & Resorts",
    location: "Marbella, Costa del Sol",
    delivery: "Q2 2027",
    status: "Selling",
    construction: 45,
    totalUnits: 32,
    priceMin: 3500000,
    priceMax: 8200000,
    description: "Oceanfront residences with full Four Seasons hotel services, private beach club and world-class spa.",
    longDescription: [
      "Four Seasons Private Residences Marbella represents the pinnacle of branded luxury living on the Costa del Sol. Set on a privileged oceanfront plot between Marbella and Estepona, this exclusive development offers 32 meticulously designed residences ranging from spacious apartments to grand penthouses and private villas.",
      "Each home has been designed in collaboration with internationally acclaimed architects, featuring floor-to-ceiling windows that frame panoramic Mediterranean views, premium natural stone finishes, bespoke Italian kitchens and state-of-the-art home automation systems. The interiors reflect Four Seasons' signature aesthetic — understated elegance with meticulous attention to detail.",
      "Residents enjoy full access to Four Seasons hotel services: 24-hour concierge, in-residence dining, housekeeping, valet parking, private chef arrangements and priority reservations at the hotel's restaurants and spa. The development includes a private residents' beach club, infinity pool, fitness centre, children's club and landscaped Mediterranean gardens.",
      "With 45% of construction completed and over 60% of units already sold, Four Seasons Private Residences Marbella is one of the most sought-after branded developments in Southern Europe. Its prime location offers easy access to Marbella's Golden Mile, world-class golf courses and Málaga international airport.",
    ],
    images: [prop1, detail1, detail2, detail3, prop2, prop3, heroImg],
    amenities: [
      { icon: Waves, label: "Private beach club" },
      { icon: Dumbbell, label: "Fitness & wellness centre" },
      { icon: UtensilsCrossed, label: "Fine dining restaurants" },
      { icon: Car, label: "Valet parking" },
      { icon: Wifi, label: "Smart home system" },
      { icon: ShieldCheck, label: "24h security" },
      { icon: Users, label: "Children's club" },
      { icon: Sparkles, label: "Spa & treatments" },
    ],
    services: [
      "24-hour concierge",
      "In-residence dining",
      "Daily housekeeping",
      "Private chef service",
      "Laundry & dry cleaning",
      "Personal shopping",
      "Airport transfers",
      "Yacht & jet charter",
      "Event planning",
      "Pet care services",
    ],
    typologies: [
      { type: "Apartment", from: 3500000, sqmRange: "180 – 250 m²" },
      { type: "Penthouse", from: 5200000, sqmRange: "280 – 380 m²" },
      { type: "Villa", from: 6800000, sqmRange: "420 – 650 m²" },
    ],
    units: [
      { ref: "FS-2C", type: "Apartment", beds: 3, baths: 3, sqm: 195, floor: "2nd", orientation: "South-East", price: 3500000, status: "Available" },
      { ref: "FS-3A", type: "Apartment", beds: 3, baths: 3, sqm: 210, floor: "3rd", orientation: "South", price: 3850000, status: "Available" },
      { ref: "FS-4A", type: "Penthouse", beds: 4, baths: 4, sqm: 320, floor: "4th", orientation: "South-West", price: 5200000, status: "Available" },
      { ref: "FS-4B", type: "Penthouse", beds: 4, baths: 5, sqm: 365, floor: "4th", orientation: "South", price: 5900000, status: "Reserved" },
      { ref: "FS-7B", type: "Villa", beds: 5, baths: 5, sqm: 480, floor: "Ground", orientation: "South", price: 7400000, status: "Available" },
      { ref: "FS-8A", type: "Villa", beds: 6, baths: 6, sqm: 620, floor: "Ground", orientation: "South-West", price: 8200000, status: "Available" },
      { ref: "FS-1A", type: "Apartment", beds: 2, baths: 2, sqm: 180, floor: "1st", orientation: "East", price: 3500000, status: "Sold" },
      { ref: "FS-5A", type: "Penthouse", beds: 5, baths: 5, sqm: 380, floor: "5th", orientation: "South", price: 6200000, status: "Sold" },
    ],
    location_data: {
      area: "Marbella, Costa del Sol",
      nearbyPlaces: [
        { name: "Marbella Golden Mile", distance: "4 km" },
        { name: "Puerto Banús", distance: "8 km" },
        { name: "La Quinta Golf", distance: "6 km" },
        { name: "Playa de Guadalmina", distance: "0.3 km" },
        { name: "Hospital Costa del Sol", distance: "12 km" },
      ],
      airport: "Málaga-Costa del Sol (AGP)",
      airportDistance: "55 km",
    },
    highlights: [
      "Beachfront location with direct sea access",
      "Full Four Seasons hotel services included",
      "Award-winning architectural design",
      "Optional rental programme managed by Four Seasons",
      "Energy efficiency rating A",
    ],
    estimatedROI: "6 – 8%",
  },
  {
    slug: "ritz-carlton-ibiza",
    name: "The Ritz-Carlton Residences",
    brand: "Ritz-Carlton",
    developer: "Marriott International",
    location: "Ibiza",
    delivery: "Q4 2028",
    status: "Pre-Launch",
    construction: 0,
    totalUnits: 18,
    priceMin: 4200000,
    priceMax: 12000000,
    description: "Ultra-luxury residences featuring panoramic sea views, concierge services and exclusive marina access.",
    longDescription: [
      "The Ritz-Carlton Residences Ibiza is set to become the island's most exclusive residential address. Located on a dramatic clifftop site overlooking the Mediterranean, this collection of just 18 residences offers unparalleled privacy, breathtaking views and the legendary service of The Ritz-Carlton.",
      "Each residence has been designed by a Pritzker Prize-winning architect, with interiors that blend Ibiza's bohemian spirit with Ritz-Carlton's timeless sophistication. Expect vast terraces, private plunge pools, natural stone and timber finishes and floor-to-ceiling glazing that brings the outside in.",
      "The development will feature a private marina berth for each residence, a world-class wellness centre, two signature restaurants and a members-only rooftop lounge with 360-degree views of the island. Residents will enjoy dedicated concierge, private security and priority access to Ritz-Carlton hotels worldwide.",
    ],
    images: [detail2, prop2, detail1, prop3, heroImg],
    amenities: [
      { icon: Waves, label: "Private marina" },
      { icon: Dumbbell, label: "World-class wellness" },
      { icon: UtensilsCrossed, label: "Signature restaurants" },
      { icon: ShieldCheck, label: "Private security" },
      { icon: Sparkles, label: "Rooftop lounge" },
      { icon: Car, label: "Underground parking" },
    ],
    services: ["24-hour concierge", "In-residence dining", "Housekeeping", "Marina management", "Private chef", "Event planning"],
    typologies: [
      { type: "Villa", from: 4200000, sqmRange: "350 – 500 m²" },
      { type: "Penthouse", from: 8500000, sqmRange: "450 – 680 m²" },
    ],
    units: [
      { ref: "RC-1A", type: "Penthouse", beds: 5, baths: 5, sqm: 520, floor: "Top", orientation: "South", price: 8500000, status: "Available" },
      { ref: "RC-3B", type: "Villa", beds: 4, baths: 4, sqm: 380, floor: "Ground", orientation: "South-West", price: 4200000, status: "Available" },
      { ref: "RC-5C", type: "Villa", beds: 5, baths: 5, sqm: 450, floor: "Ground", orientation: "South", price: 5100000, status: "Available" },
    ],
    location_data: {
      area: "South-East Coast, Ibiza",
      nearbyPlaces: [
        { name: "Ibiza Town", distance: "8 km" },
        { name: "Cala Llonga", distance: "2 km" },
        { name: "Santa Eulalia", distance: "5 km" },
      ],
      airport: "Ibiza Airport (IBZ)",
      airportDistance: "12 km",
    },
    highlights: [
      "Only 18 residences — extreme exclusivity",
      "Private marina berth per residence",
      "Pritzker Prize-winning architect",
      "360° panoramic views",
    ],
    estimatedROI: "5 – 7%",
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const statusColor = (s: string) => {
  if (s === "Pre-Launch") return palette.accent;
  if (s === "Selling") return "#2a7d5f";
  if (s === "Last Units") return "#c0392b";
  return palette.textLight;
};

const unitStatusStyle = (s: string) => {
  if (s === "Available") return { color: "#2a7d5f", bg: "#2a7d5f12" };
  if (s === "Reserved") return { color: "#e67e22", bg: "#e67e2212" };
  return { color: "#999", bg: "#99999912" };
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const BrandedResidenceDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const p = project;

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gridView, setGridView] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");
  const [enquirySent, setEnquirySent] = useState(false);
  const [visitSent, setVisitSent] = useState(false);

  // Lightbox swipe logic
  const lbTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleLbTouchStart = useCallback((e: React.TouchEvent) => {
    lbTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!lbTouchStart.current) return;
    const dx = e.changedTouches[0].clientX - lbTouchStart.current.x;
    const dy = e.changedTouches[0].clientY - lbTouchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setLightbox((prev) => prev !== null ? Math.min(prev + 1, p.images.length) : null);
      else setLightbox((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
    }
    lbTouchStart.current = null;
  }, [p.images.length]);

  const availableUnits = p.units.filter((u) => u.status !== "Sold");
  const filteredUnits = filterType === "All" ? p.units : p.units.filter((u) => u.type === filterType);
  const typologyOptions = ["All", ...new Set(p.units.map((u) => u.type))];

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false}>
      <SEOHead
        title={`${p.name} — ${p.brand} Branded Residences in ${p.location}`}
        description={p.description}
      />

      {/* ── HERO FULLSCREEN ── */}
      <section className="relative h-[85vh] min-h-[600px]">
        <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,24,22,0.3) 0%, rgba(26,24,22,0.75) 100%)" }} />

        {/* Back link */}
        <div className="absolute top-24 left-6 sm:left-10 z-20">
          <Link to="/branded-residences" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] tracking-wide transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Branded Residences
          </Link>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 px-5 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2" style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <Crown className="w-4 h-4" style={{ color: "#c9a96e" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-light" style={{ color: "#c9a96e" }}>{p.brand}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1] mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.05em" }}>
              {p.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-4 h-4 text-white/50" />
              <span className="text-[14px] font-light text-white/60">{p.location}</span>
              <span className="text-white/20">·</span>
              <span className="text-[14px] font-light text-white/60">Delivery {p.delivery}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl sm:text-3xl font-extralight text-white">{fmt(p.priceMin)} — {fmt(p.priceMax)}</span>
              <span className="ml-2 px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium rounded-sm" style={{ color: statusColor(p.status), border: `1px solid ${statusColor(p.status)}50`, background: `${statusColor(p.status)}10` }}>
                {p.status}
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Gallery count */}
        <button onClick={() => setLightbox(0)} className="absolute bottom-6 right-6 sm:right-10 z-20 flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-sm text-white text-[12px] tracking-wide hover:bg-black/60 transition-colors rounded-sm">
          View {p.images.length} Photos
        </button>
      </section>

      {/* ── STATS RIBBON ── */}
      <section className="border-b" style={{ background: palette.white, borderColor: palette.border }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-6 flex flex-wrap gap-8 sm:gap-12">
          {[
            { label: "Total Units", value: String(p.totalUnits) },
            { label: "Available", value: String(availableUnits.length) },
            { label: "Construction", value: `${p.construction}%` },
            { label: "Delivery", value: p.delivery },
            { label: "Developer", value: p.developer },
            ...(p.estimatedROI ? [{ label: "Est. ROI", value: p.estimatedROI }] : []),
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>{s.label}</p>
              <p className="text-[17px] font-light" style={{ color: palette.text }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ── MAIN CONTENT ── */}
      <section className="py-16 sm:py-24" style={{ background: palette.white }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">

            {/* Left column */}
            <div>
              {/* About */}
              <FadeIn>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>About the Project</p>
                <h2 className="text-2xl sm:text-3xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>{p.name}</h2>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                  {p.longDescription.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={0.1}>
                <div className="mt-12 p-8 rounded-sm" style={{ background: palette.bg }}>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: palette.accent }}>Key Highlights</h3>
                  <div className="space-y-3">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                        <span className="text-[14px] font-light" style={{ color: palette.text }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Download Brochure */}
              <FadeIn delay={0.12}>
                <div className="mt-12 p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.accent }}>Download</p>
                    <h3 className="text-lg font-light mb-1" style={{ fontFamily: fonts.heading, color: palette.text }}>{p.name} Brochure</h3>
                    <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>
                      Floor plans, specifications, amenities, pricing and investment details in a single document.
                    </p>
                  </div>
                  <button
                    onClick={() => { setShowEnquiry(true); setEnquirySent(false); }}
                    className="shrink-0 inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-light px-8 py-3.5 transition-all hover:opacity-90 rounded-sm"
                    style={{ background: palette.accent, color: "#fff" }}
                  >
                    <ArrowRight className="w-4 h-4 -rotate-90" /> Download PDF
                  </button>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn delay={0.15}>
                <div className="mt-14">
                  <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Lifestyle</p>
                  <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Amenities & Facilities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {p.amenities.map((a, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-5 rounded-sm" style={{ background: palette.bg }}>
                        <a.icon className="w-6 h-6 mb-3" style={{ color: palette.accent }} />
                        <span className="text-[13px] font-light" style={{ color: palette.text }}>{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Brand Services */}
              <FadeIn delay={0.2}>
                <div className="mt-14">
                  <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>{p.brand} Services</p>
                  <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Five-Star Services Included</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {p.services.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${palette.border}` }}>
                        <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: palette.accent }} />
                        <span className="text-[14px] font-light" style={{ color: palette.text }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right column — Sticky sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
              {/* Price card */}
              <div className="p-6 rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4" style={{ color: palette.accent }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>{p.brand}</span>
                </div>
                <p className="text-[24px] font-extralight mb-1" style={{ color: palette.text }}>{fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
                <p className="text-[12px] font-light mb-6" style={{ color: palette.textLight }}>{availableUnits.length} of {p.totalUnits} units available</p>

                {/* Construction progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: palette.textLight }}>Construction</span>
                    <span className="text-[14px] font-light" style={{ color: palette.text }}>{p.construction}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: palette.bg }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.construction}%`, background: palette.accent }} />
                  </div>
                </div>

                {/* Typologies */}
                <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${palette.border}` }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.textLight }}>Typologies</p>
                  {p.typologies.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{t.type} <span className="text-[11px]" style={{ color: palette.textLight }}>({t.sqmRange})</span></span>
                      <span className="text-[13px] font-light" style={{ color: palette.text }}>from {fmt(t.from)}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <button
                  onClick={() => { setShowEnquiry(true); setEnquirySent(false); }}
                  className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 mb-3 transition-all hover:opacity-90"
                   style={{ background: palette.accent, color: "#fff" }}
                >
                  <Mail className="w-4 h-4" /> Request Information
                </button>
                <button
                  onClick={() => { setShowVisit(true); setVisitSent(false); }}
                  className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 transition-all hover:opacity-80"
                  style={{ border: `1px solid ${palette.accent}60`, color: palette.accent }}
                >
                  <Calendar className="w-4 h-4" /> Schedule a Visit
                </button>

                {/* Direct contact */}
                <div className="mt-5 pt-5 flex items-center justify-center gap-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <span style={{ color: palette.border }}>|</span>
                  <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Location card */}
              <div className="p-6 rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: palette.accent }}>Location</p>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                  <span className="text-[14px] font-light" style={{ color: palette.text }}>{p.location_data.area}</span>
                </div>
                <div className="space-y-2.5 mb-4">
                  {p.location_data.nearbyPlaces.map((pl, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{pl.name}</span>
                      <span className="text-[12px] font-light" style={{ color: palette.textLight }}>{pl.distance}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3" style={{ borderTop: `1px solid ${palette.border}` }}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                    <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{p.location_data.airport} — {p.location_data.airportDistance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNITS TABLE ── */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Availability</p>
              <h2 className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Available Units</h2>
              <p className="text-[14px] font-light mt-3" style={{ color: palette.textMuted }}>
                {availableUnits.length} of {p.totalUnits} units currently available
              </p>
            </div>
          </FadeIn>

          {/* Filter */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {typologyOptions.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-light transition-all rounded-sm"
                style={{
                  background: filterType === t ? palette.accent : "transparent",
                  color: filterType === t ? "#fff" : palette.textMuted,
                  border: `1px solid ${filterType === t ? palette.accent : palette.border}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: `2px solid ${palette.border}` }}>
                  {["Ref", "Type", "Beds", "Baths", "Size", "Floor", "Price", "Status", ""].map((h, i) => (
                    <th key={i} className="py-3 px-3 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.textLight }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map((u, i) => {
                  const st = unitStatusStyle(u.status);
                  return (
                    <tr key={i} className="transition-colors" style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <td className="py-4 px-3 text-[13px] font-medium" style={{ color: palette.text }}>{u.ref}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.type}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.beds}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.baths}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.text }}>{u.sqm} m²</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.floor}</td>
                      <td className="py-4 px-3 text-[14px] font-light" style={{ color: palette.text }}>{fmt(u.price)}</td>
                      <td className="py-4 px-3">
                        <span className="inline-flex px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-medium rounded-sm" style={{ color: st.color, background: st.bg }}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        {u.status === "Available" && (
                          <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="text-[11px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                            Enquire
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <FadeIn>
            <Crown className="w-8 h-8 mx-auto mb-6" style={{ color: palette.accent }} />
            <h2 className="text-2xl sm:text-3xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em", color: palette.text }}>
              Interested in {p.name}?
            </h2>
            <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: palette.textMuted }}>
              Contact our specialist team for private viewings, floor plans, investment analysis and priority access.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                Request Information
              </button>
              <button onClick={() => { setShowVisit(true); setVisitSent(false); }} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all hover:opacity-80" style={{ border: `1px solid ${palette.accent}60`, color: palette.accent }}>
                Schedule a Visit
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         FULLSCREEN LIGHTBOX (V6 style)
         ══════════════════════════════════════════════════════ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" role="dialog" aria-label="Photo gallery">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px] font-light">
              {lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/50 hover:text-white transition-colors" aria-label="Grid view">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white transition-colors" aria-label="Close gallery">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div
            className="flex-1 relative flex items-center justify-center min-h-0"
            onTouchStart={handleLbTouchStart}
            onTouchEnd={handleLbTouchEnd}
          >
            {lightbox < p.images.length ? (
              <>
                {/* Left click zone (PC) */}
                <div
                  className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize"
                  onClick={() => setLightbox(Math.max(lightbox - 1, 0))}
                />
                {/* Right click zone (PC) — goes to contact slide after last photo */}
                <div
                  className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize"
                  onClick={() => setLightbox(lightbox + 1)}
                />

                {/* Visible arrows */}
                {lightbox > 0 && (
                  <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white transition-colors" aria-label="Previous photo">
                    <ChevronLeft className="w-8 h-8" strokeWidth={1} />
                  </button>
                )}
                <img src={p.images[lightbox]} alt={`${p.name} — photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain relative z-0" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white transition-colors" aria-label="Next photo">
                  <ChevronRight className="w-8 h-8" strokeWidth={1} />
                </button>
              </>
            ) : (
              /* ── Contact CTA slide (after last photo) ── */
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <Crown className="w-6 h-6 mx-auto mb-3" style={{ color: "#c9a96e" }} />
                  <h3 className="text-[22px] sm:text-[28px] font-light text-white tracking-[0.04em] uppercase mb-2 leading-tight">{p.name}</h3>
                  <p className="text-[14px] text-white/50 font-light mb-1">{p.location}</p>
                  <p className="text-[24px] font-light text-white/90 mb-8">{fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${contact.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1a1816] text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                      <Mail className="w-3.5 h-3.5" /> Enquiry
                    </button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] tracking-[0.1em] uppercase transition-colors flex items-center gap-1 mx-auto">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to photos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] shrink-0 overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`} aria-label={`View photo ${i + 1}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── GRID VIEW (all photos) ─── */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto" role="dialog" aria-label="All photos">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/50 text-[13px] font-light">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/50 hover:text-white transition-colors" aria-label="Close grid view">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setGridView(false); setLightbox(i); }}
                className="relative aspect-[4/3] overflow-hidden group"
                aria-label={`View photo ${i + 1}`}
              >
                <img src={img} alt={`${p.name} — photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 text-white/70 text-[11px] font-light">{i + 1}</span>
              </button>
            ))}
          </div>
          {/* Contact CTA at the end */}
          <div className="px-4 sm:px-8 py-10 text-center shrink-0">
            <Crown className="w-6 h-6 mx-auto mb-3" style={{ color: "#c9a96e" }} />
            <h3 className="text-[18px] sm:text-[22px] font-light text-white/90 tracking-[0.04em] uppercase mb-2">{p.name}</h3>
            <p className="text-[13px] text-white/40 font-light mb-6">{p.location} · {fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={`tel:${contact.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1a1816] text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button onClick={() => { setGridView(false); setShowEnquiry(true); setEnquirySent(false); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                <Mail className="w-3.5 h-3.5" /> Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
         ENQUIRY MODAL
         ══════════════════════════════════════════════════════ */}
      <Dialog open={showEnquiry} onOpenChange={setShowEnquiry}>
        <DialogContent className="sm:max-w-[480px] p-0 border-0 overflow-hidden" overlayClassName="!z-[110]" style={{ zIndex: 110 }}>
          {!enquirySent ? (
            <div className="p-8">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4" style={{ color: palette.accent }} />
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>{p.brand}</span>
              </div>
              <h3 className="text-xl font-light mb-1" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
              <p className="text-[12px] font-light mb-6" style={{ color: palette.textMuted }}>{p.location}</p>
              <form onSubmit={(e) => { e.preventDefault(); setEnquirySent(true); }} className="space-y-4">
                <input placeholder="Full Name *" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Email *" type="email" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Phone" type="tel" className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <textarea placeholder="I'm interested in this project..." rows={3} className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e] resize-none" style={{ borderColor: palette.border }} />
                <button type="submit" className="w-full py-3.5 text-[12px] tracking-[0.18em] uppercase font-light transition-opacity hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                  Send Enquiry
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#2a7d5f" }} />
              <h3 className="text-xl font-light mb-2" style={{ fontFamily: fonts.heading }}>Thank You</h3>
              <p className="text-[14px] font-light mb-6" style={{ color: palette.textMuted }}>
                Our {p.brand} specialist will contact you within 24 hours with detailed information about {p.name}.
              </p>
              <button onClick={() => setShowEnquiry(false)} className="text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════
         VISIT MODAL
         ══════════════════════════════════════════════════════ */}
      <Dialog open={showVisit} onOpenChange={setShowVisit}>
        <DialogContent className="sm:max-w-[480px] p-0 border-0 overflow-hidden" overlayClassName="!z-[110]" style={{ zIndex: 110 }}>
          {!visitSent ? (
            <div className="p-8">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" style={{ color: palette.accent }} />
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>Schedule a Visit</span>
              </div>
              <h3 className="text-xl font-light mb-1" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
              <p className="text-[12px] font-light mb-6" style={{ color: palette.textMuted }}>{p.location}</p>
              <form onSubmit={(e) => { e.preventDefault(); setVisitSent(true); }} className="space-y-4">
                <input placeholder="Full Name *" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Email *" type="email" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Phone *" type="tel" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                  <select required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }}>
                    <option value="">Preferred Time</option>
                    <option>Morning (9:00 – 12:00)</option>
                    <option>Afternoon (12:00 – 16:00)</option>
                    <option>Evening (16:00 – 19:00)</option>
                  </select>
                </div>
                <textarea placeholder="Any specific requirements or questions..." rows={2} className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e] resize-none" style={{ borderColor: palette.border }} />
                <button type="submit" className="w-full py-3.5 text-[12px] tracking-[0.18em] uppercase font-light transition-opacity hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                  Request Visit
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#2a7d5f" }} />
              <h3 className="text-xl font-light mb-2" style={{ fontFamily: fonts.heading }}>Visit Requested</h3>
              <p className="text-[14px] font-light mb-6" style={{ color: palette.textMuted }}>
                We'll confirm your visit to {p.name} within 24 hours. Our specialist will coordinate directly with you.
              </p>
              <button onClick={() => setShowVisit(false)} className="text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BrandedResidenceDetailPage;
