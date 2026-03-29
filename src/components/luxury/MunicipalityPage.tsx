/**
 * MUNICIPALITY DETAIL PAGE
 * Luxury editorial page for Costa Blanca municipalities.
 * Route: /municipality/:slug
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Play, Sun, Thermometer, Home, MapPin, Plane, Train, Anchor, GraduationCap, ShoppingBag, Hospital, Trees, Utensils, Waves, ArrowRight, Phone, TrendingUp, Users, Building2, Landmark, Star, Wine, Sailboat, Dumbbell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts, brand } from "@/config/template";

/* ─── Mock Data ─── */

const MUNICIPALITY = {
  name: "Altea",
  tagline: "The Dome of the Mediterranean",
  province: "Alicante",
  region: "Costa Blanca",
  country: "Spain",
  heroImage: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=1920&q=80",
  heroVideo: "",
  population: 24592,
  foreignPct: 34.51,
  avgTemp: "18.3°C",
  sunnyDays: 320,
  avgPriceM2: 2450,
  badge: "Capital Cultural de la Comunitat Valenciana",
  introTitle: "Discover Altea",
  introText: [
    "Perched on a sun-drenched hilltop overlooking the Mediterranean, Altea is the jewel of the Costa Blanca's northern coast. Its iconic blue-domed church, Nuestra Señora del Consuelo, crowns a labyrinth of whitewashed streets that cascade down to a picturesque seafront promenade lined with artisan boutiques, galleries, and restaurants.",
    "Declared the Cultural Capital of the Comunitat Valenciana, Altea is home to the Faculty of Fine Arts of the Miguel Hernández University, attracting a vibrant community of artists, writers, and musicians. The town's bohemian spirit coexists harmoniously with its growing international community — over 34% of residents are foreign nationals, drawn by the exceptional quality of life, mild climate, and authentic Mediterranean charm.",
    "Unlike the high-rise developments that characterise other coastal towns, Altea has fiercely protected its architectural identity. Strict urban planning ensures that the old town's character remains intact, making it one of the most desirable and exclusive addresses on the entire Costa Blanca.",
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  ],
};

const MARKET_DATA = {
  priceM2: { value: "€2,450", trend: "+8.2%", label: "Average price per m²", sub: "Free market housing", source: "Ministry of Housing, Q3 2025", history: [1820, 1950, 2050, 2180, 2310, 2450] },
  transactions: { value: "342", label: "Property sales last 12 months", resale: 67, newBuild: 33, source: "Ministry of Housing" },
  international: { value: "45%", label: "Of all transactions by foreign buyers", buyers: [{ flag: "🇬🇧", country: "British", pct: 18 }, { flag: "🇳🇱", country: "Dutch", pct: 12 }, { flag: "🇧🇪", country: "Belgian", pct: 8 }, { flag: "🇩🇪", country: "German", pct: 7 }], source: "College of Property Registrars" },
  mortgage: { value: "€285,000", label: "Average mortgage for foreign buyers", details: "2.8% avg. interest rate · 22 years avg. term", source: "College of Property Registrars" },
};

const DEMOGRAPHICS = {
  total: 24592,
  segments: [{ label: "Spanish", pct: 65, color: palette.accent }, { label: "European", pct: 26, color: "#1B365D" }, { label: "Other", pct: 9, color: palette.textLight }],
  nationalities: [
    { flag: "🇷🇴", country: "Romania", residents: 876 },
    { flag: "🇬🇧", country: "United Kingdom", residents: 862 },
    { flag: "🇳🇱", country: "Netherlands", residents: 803 },
    { flag: "🇷🇺", country: "Russia", residents: 689 },
    { flag: "🇧🇪", country: "Belgium", residents: 436 },
    { flag: "🇩🇪", country: "Germany", residents: 365 },
    { flag: "🇲🇦", country: "Morocco", residents: 319 },
    { flag: "🇫🇷", country: "France", residents: 256 },
    { flag: "🇮🇹", country: "Italy", residents: 235 },
    { flag: "🇳🇴", country: "Norway", residents: 180 },
  ],
};

const NEIGHBORHOODS = [
  { name: "Altea Hills", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", priceFrom: "€450,000", properties: 12, type: "Luxury villas with sea views" },
  { name: "Altea la Vella", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", priceFrom: "€320,000", properties: 8, type: "Traditional fincas & townhouses" },
  { name: "Cap Negret", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", priceFrom: "€380,000", properties: 6, type: "Beachfront apartments & villas" },
  { name: "Casco Antiguo", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80", priceFrom: "€275,000", properties: 15, type: "Charming townhouses & penthouses" },
];

const BEACHES = [
  { name: "Playa de la Roda", desc: "Pebble beach, town centre" },
  { name: "Cap Blanch", desc: "Largest beach, connects to Albir", badge: "Blue Flag" },
  { name: "L'Olla", desc: "Rocky cove, crystal clear water" },
  { name: "Solsida", desc: "Secluded, naturist-friendly" },
];

const INFRASTRUCTURE = [
  { icon: Plane, title: "Alicante-Elche Airport", detail: "70 km · 45 min drive", sub: "180+ destinations" },
  { icon: Train, title: "TRAM Alicante-Dénia", detail: "Station in Altea", sub: "Direct connection" },
  { icon: Anchor, title: "Club Náutico de Altea", detail: "Marina with 306 berths", sub: "Sailing & water sports" },
  { icon: Trees, title: "Golf Courses", detail: "3 courses within 20 km", sub: "Don Cayo, Villaitana, Altea Golf" },
  { icon: Hospital, title: "Hospital Marina Baixa", detail: "5 km · Public + private clinics", sub: "Full medical services" },
  { icon: GraduationCap, title: "International Schools", detail: "4 within 15 km", sub: "British, German, Scandinavian" },
];

const PROPERTIES = [
  { id: "1", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", price: "€1,850,000", beds: 4, baths: 3, sqm: 320, location: "Altea Hills" },
  { id: "2", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", price: "€2,400,000", beds: 5, baths: 4, sqm: 480, location: "Cap Negret" },
  { id: "3", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", price: "€975,000", beds: 3, baths: 2, sqm: 185, location: "Altea la Vella" },
  { id: "4", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", price: "€3,200,000", beds: 6, baths: 5, sqm: 650, location: "Altea Hills" },
  { id: "5", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", price: "€780,000", beds: 3, baths: 2, sqm: 160, location: "Casco Antiguo" },
  { id: "6", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", price: "€1,250,000", beds: 4, baths: 3, sqm: 280, location: "Cap Negret" },
];

const GUIDES = [
  { image: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80", title: "The Complete Guide to Buying Property in Altea", excerpt: "Everything you need to know about the purchase process, taxes, and legal requirements for foreign buyers.", time: "12 min read", date: "March 2025" },
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", title: "Living in Altea: An Expat's Perspective", excerpt: "A first-hand account of relocating to Altea — from finding the right neighbourhood to integrating into the community.", time: "8 min read", date: "February 2025" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", title: "Altea vs Jávea: Which Town is Right for You?", excerpt: "A detailed comparison of two of the Costa Blanca's most sought-after municipalities for international buyers.", time: "10 min read", date: "January 2025" },
];

type POICategory = "All" | "Restaurants" | "Beach Clubs" | "Golf" | "Wellness & Spa" | "Marinas";

interface POI {
  name: string;
  rating: number;
  reviews: number;
  category: POICategory;
  type: string;
  address: string;
  image: string;
  mapsUrl: string;
}

const DINING_CATEGORIES: POICategory[] = ["All", "Restaurants", "Beach Clubs", "Golf", "Wellness & Spa", "Marinas"];

const DINING_POIS: POI[] = [
  { name: "Rumors Altea", rating: 4.8, reviews: 1777, category: "Restaurants", type: "Creative Mediterranean cuisine with stunning terrace", address: "Carrer Calvari, 1", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Rumors+Altea" },
  { name: "Nilah Altea", rating: 4.7, reviews: 1949, category: "Restaurants", type: "Belgian-Mediterranean fusion with harbour views", address: "Avinguda del Port, 21", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Nilah+Altea" },
  { name: "La Bottega dei Sapori", rating: 4.7, reviews: 733, category: "Restaurants", type: "Authentic Italian in the heart of the old town", address: "Carrer Concepció, 16", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", mapsUrl: "https://maps.google.com/?q=La+Bottega+dei+Sapori+Altea" },
  { name: "Oustau de Altea", rating: 4.5, reviews: 3387, category: "Restaurants", type: "French-Mediterranean haute cuisine", address: "Carrer Major, 5", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Oustau+de+Altea" },
  { name: "Diferens Altea", rating: 4.5, reviews: 5206, category: "Restaurants", type: "Brunch & Mediterranean on the promenade", address: "Avinguda del Port, 1", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Diferens+Altea" },
  { name: "De LAB Beach Lounge", rating: 4.4, reviews: 2170, category: "Beach Clubs", type: "Beachfront dining & cocktails with sunset views", address: "Carr. del Albir, 17", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", mapsUrl: "https://maps.google.com/?q=De+LAB+Beach+Lounge" },
  { name: "Olla Beach Bar", rating: 4.1, reviews: 869, category: "Beach Clubs", type: "Chiringuito & live music by the cove", address: "Partida la Olla, 11", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Olla+Beach+Bar+Altea" },
  { name: "Altea Club de Golf", rating: 4.3, reviews: 527, category: "Golf", type: "9-hole mountain course with panoramic sea views", address: "Urbanización Sierra Altea", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Altea+Club+de+Golf" },
  { name: "ZEM Wellness Clinic", rating: 4.8, reviews: 76, category: "Wellness & Spa", type: "5-Star Grand Luxury wellness clinic", address: "C. Suecia, Altea Hills", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", mapsUrl: "https://maps.google.com/?q=ZEM+Wellness+Clinic" },
  { name: "Senses Spa Experience", rating: 4.2, reviews: 67, category: "Wellness & Spa", type: "Resort spa, massage & thermal circuit", address: "Cam. Vell d'Altea, 51", image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Senses+Spa+Experience+Altea" },
  { name: "Puerto Deportivo de Altea", rating: 4.4, reviews: 1350, category: "Marinas", type: "Public marina with waterfront restaurants", address: "Altea Port", image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Puerto+Deportivo+de+Altea" },
  { name: "Club Náutico de Altea", rating: 4.4, reviews: 776, category: "Marinas", type: "Yacht club, sailing school & charter", address: "Avinguda del Port, 50", image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80", mapsUrl: "https://maps.google.com/?q=Club+Nautico+de+Altea" },
].filter(p => p.rating >= 4.0 && p.reviews >= 50).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);



const Sparkline = ({ data, color = palette.accent }: { data: number[]; color?: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

/* ─── Donut Chart Component ─── */

const DonutChart = ({ segments, centerLabel }: { segments: { label: string; pct: number; color: string }[]; centerLabel: string }) => {
  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const dashLength = (seg.pct / 100) * circumference;
          const dashOffset = -offset;
          offset += dashLength;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="transition-all duration-1000"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-medium" style={{ color: palette.text }}>{centerLabel.toLocaleString()}</span>
        <span className="text-[11px] tracking-[0.08em] uppercase" style={{ color: palette.textMuted }}>residents</span>
      </div>
    </div>
  );
};

/* ─── Section Title ─── */

const SectionTitle = ({ title, subtitle, align = "left" }: { title: string; subtitle?: string; align?: "left" | "center" }) => (
  <div className={`mb-10 lg:mb-14 ${align === "center" ? "text-center" : ""}`}>
    <h2
      className="text-[13px] tracking-[0.12em] uppercase font-medium mb-3"
      style={{ color: palette.accent }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-[28px] lg:text-[36px] font-light leading-[1.2]" style={{ color: palette.text, fontFamily: fonts.heading }}>
        {subtitle}
      </p>
    )}
  </div>
);

/* ─── Main Component ─── */

const MunicipalityPage = () => {
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const maxResidents = Math.max(...DEMOGRAPHICS.nationalities.map((n) => n.residents));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout navVariant="transparent" background={palette.white}>
      <SEOHead title={`${MUNICIPALITY.name} — Luxury Real Estate | ${brand.name}`} description={`Discover luxury properties in ${MUNICIPALITY.name}, ${MUNICIPALITY.region}. Market data, lifestyle guide, and exclusive listings.`} />

      {/* ── Sticky Nav ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
          background: palette.white,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4" style={{ color: palette.accent }} />
            <span className="text-[14px] font-medium" style={{ color: palette.text }}>{MUNICIPALITY.name}</span>
            <span className="text-[12px]" style={{ color: palette.textMuted }}>{MUNICIPALITY.region}</span>
          </div>
          <a
            href="/properties"
            className="text-[12px] tracking-[0.06em] uppercase font-medium px-5 py-2 rounded-sm transition-opacity hover:opacity-80"
            style={{ background: palette.accent, color: palette.white }}
          >
            View Properties
          </a>
        </div>
      </div>

      {/* ═══ SECTION 1 — Hero ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
        {MUNICIPALITY.heroVideo ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={MUNICIPALITY.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={MUNICIPALITY.heroImage} alt={MUNICIPALITY.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="max-w-[1280px] mx-auto px-6">
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.06em] uppercase text-white/60">
              <a href="/" className="hover:text-white/90 transition-colors">{MUNICIPALITY.country}</a>
              <ChevronRight className="w-3 h-3" />
              <a href="#" className="hover:text-white/90 transition-colors">{MUNICIPALITY.region}</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{MUNICIPALITY.name}</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 lg:pb-20 z-10">
          <h1
            className="text-[48px] sm:text-[64px] lg:text-[80px] font-light tracking-[0.04em] uppercase text-white mb-2"
            style={{ fontFamily: fonts.heading }}
          >
            {MUNICIPALITY.name}
          </h1>
          <p className="text-[16px] lg:text-[18px] text-white/80 font-light tracking-[0.02em] mb-10" style={{ fontFamily: fonts.heading }}>
            {MUNICIPALITY.tagline}
          </p>

          {/* Key Facts */}
          <div className="flex items-center gap-6 sm:gap-10">
            {[
              { icon: Thermometer, label: MUNICIPALITY.avgTemp + " average" },
              { icon: Sun, label: MUNICIPALITY.sunnyDays + " sunny days" },
              { icon: Home, label: `€${MUNICIPALITY.avgPriceM2.toLocaleString()}/m²` },
            ].map((fact, i) => (
              <div key={i} className="flex items-center gap-2.5 text-white/90">
                <fact.icon className="w-4 h-4 text-white/60" />
                <span className="text-[13px] tracking-[0.02em] font-light">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/50" />
        </div>
      </section>

      {/* ═══ SECTION 2 — Editorial Intro ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Text */}
            <FadeIn className="lg:col-span-7">
              <h2
                className="text-[32px] lg:text-[42px] font-light leading-[1.15] mb-8"
                style={{ color: palette.text, fontFamily: fonts.heading }}
              >
                {MUNICIPALITY.introTitle}
              </h2>
              <div className="space-y-5">
                {MUNICIPALITY.introText.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                    {p}
                  </p>
                ))}
              </div>
              <div
                className="inline-block mt-8 px-4 py-2 rounded-sm text-[11px] tracking-[0.08em] uppercase font-medium"
                style={{ background: palette.bgAlt, color: palette.accent }}
              >
                {MUNICIPALITY.badge}
              </div>
            </FadeIn>

            {/* Gallery Bento */}
            <FadeIn className="lg:col-span-5" delay={0.15}>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <div className="aspect-[16/10] overflow-hidden rounded-sm">
                    <img src={MUNICIPALITY.galleryImages[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                {MUNICIPALITY.galleryImages.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-sm">
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — Market Intelligence ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Market Data" subtitle="Real Estate Market Overview" align="center" />
            <p className="text-center text-[14px] font-light -mt-8 mb-12" style={{ color: palette.textMuted }}>
              Data-driven insights powered by official Spanish registries
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price Trend */}
            <FadeIn>
              <div className="p-6 lg:p-8 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[32px] lg:text-[38px] font-light" style={{ color: palette.text }}>{MARKET_DATA.priceM2.value}<span className="text-[16px]">/m²</span></p>
                    <p className="text-[13px] font-light mt-1" style={{ color: palette.textMuted }}>{MARKET_DATA.priceM2.label}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm" style={{ background: "#E8F5E9" }}>
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: "#2E7D32" }} />
                    <span className="text-[12px] font-medium" style={{ color: "#2E7D32" }}>{MARKET_DATA.priceM2.trend} YoY</span>
                  </div>
                </div>
                <Sparkline data={MARKET_DATA.priceM2.history} />
                <p className="text-[11px] mt-4" style={{ color: palette.textLight }}>Source: {MARKET_DATA.priceM2.source}</p>
              </div>
            </FadeIn>

            {/* Transactions */}
            <FadeIn delay={0.05}>
              <div className="p-6 lg:p-8 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                <p className="text-[32px] lg:text-[38px] font-light" style={{ color: palette.text }}>{MARKET_DATA.transactions.value}</p>
                <p className="text-[13px] font-light mt-1 mb-5" style={{ color: palette.textMuted }}>{MARKET_DATA.transactions.label}</p>
                <div className="w-full h-2 rounded-full overflow-hidden flex" style={{ background: palette.bgAlt }}>
                  <div className="h-full rounded-l-full" style={{ width: `${MARKET_DATA.transactions.resale}%`, background: palette.accent }} />
                  <div className="h-full rounded-r-full" style={{ width: `${MARKET_DATA.transactions.newBuild}%`, background: "#1B365D" }} />
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-[12px]" style={{ color: palette.textMuted }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: palette.accent }} /> {MARKET_DATA.transactions.resale}% Resale
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px]" style={{ color: palette.textMuted }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "#1B365D" }} /> {MARKET_DATA.transactions.newBuild}% New Build
                  </span>
                </div>
                <p className="text-[11px] mt-4" style={{ color: palette.textLight }}>Source: {MARKET_DATA.transactions.source}</p>
              </div>
            </FadeIn>

            {/* International Buyers */}
            <FadeIn delay={0.1}>
              <div className="p-6 lg:p-8 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                <p className="text-[32px] lg:text-[38px] font-light" style={{ color: palette.text }}>{MARKET_DATA.international.value}</p>
                <p className="text-[13px] font-light mt-1 mb-5" style={{ color: palette.textMuted }}>{MARKET_DATA.international.label}</p>
                <div className="space-y-2.5">
                  {MARKET_DATA.international.buyers.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[16px] w-6 text-center">{b.flag}</span>
                      <span className="text-[13px] font-light flex-1" style={{ color: palette.text }}>{b.country}</span>
                      <span className="text-[13px] font-medium" style={{ color: palette.accent }}>{b.pct}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] mt-4" style={{ color: palette.textLight }}>Source: {MARKET_DATA.international.source}</p>
              </div>
            </FadeIn>

            {/* Mortgage */}
            <FadeIn delay={0.15}>
              <div className="p-6 lg:p-8 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                <p className="text-[32px] lg:text-[38px] font-light" style={{ color: palette.text }}>{MARKET_DATA.mortgage.value}</p>
                <p className="text-[13px] font-light mt-1 mb-5" style={{ color: palette.textMuted }}>{MARKET_DATA.mortgage.label}</p>
                <p className="text-[14px] font-light" style={{ color: palette.text }}>{MARKET_DATA.mortgage.details}</p>
                <p className="text-[11px] mt-4" style={{ color: palette.textLight }}>Source: {MARKET_DATA.mortgage.source}</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="text-center mt-10">
              <a href="/contact" className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] font-medium transition-opacity hover:opacity-70" style={{ color: palette.accent }}>
                Want to know more about investing in {MUNICIPALITY.name}? Talk to our advisors
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 4 — Demographics ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Community" subtitle={`Who Lives in ${MUNICIPALITY.name}`} />
            <p className="text-[14px] font-light -mt-8 mb-12" style={{ color: palette.textMuted }}>A vibrant international community</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Donut */}
            <FadeIn className="flex flex-col items-center">
              <DonutChart segments={DEMOGRAPHICS.segments} centerLabel={DEMOGRAPHICS.total.toLocaleString()} />
              <div className="flex items-center gap-6 mt-6">
                {DEMOGRAPHICS.segments.map((s, i) => (
                  <span key={i} className="flex items-center gap-2 text-[12px]" style={{ color: palette.textMuted }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                    {s.label} {s.pct}%
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Nationality list */}
            <FadeIn delay={0.1}>
              <div className="space-y-3">
                {DEMOGRAPHICS.nationalities.map((n, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-[18px] w-7 text-center">{n.flag}</span>
                    <span className="text-[13px] font-light w-28 shrink-0" style={{ color: palette.text }}>{n.country}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: palette.bgAlt }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(n.residents / maxResidents) * 100}%`, background: palette.accent }}
                      />
                    </div>
                    <span className="text-[13px] font-medium w-12 text-right" style={{ color: palette.text }}>{n.residents.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] mt-6" style={{ color: palette.textLight }}>Source: INE — National Statistics Institute</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — Neighborhoods ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Explore" subtitle="Neighbourhoods & Areas" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEIGHBORHOODS.map((nb, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <a href="#" className="group block rounded-sm overflow-hidden" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={nb.image} alt={nb.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[16px] font-medium mb-1" style={{ color: palette.text }}>{nb.name}</h3>
                    <p className="text-[12px] font-light mb-3" style={{ color: palette.textMuted }}>{nb.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium" style={{ color: palette.accent }}>From {nb.priceFrom}</span>
                      <span className="text-[11px]" style={{ color: palette.textLight }}>{nb.properties} properties</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — Lifestyle ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Lifestyle" subtitle="The Mediterranean Lifestyle" align="center" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Climate */}
            <FadeIn>
              <div className="text-center lg:text-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-5" style={{ background: palette.bgAlt }}>
                  <Sun className="w-6 h-6" style={{ color: palette.accent }} />
                </div>
                <h3 className="text-[18px] font-medium mb-1" style={{ color: palette.text }}>Climate</h3>
                <p className="text-[26px] font-light mb-5" style={{ color: palette.accent }}>{MUNICIPALITY.sunnyDays} days of sunshine</p>
                <div className="space-y-2.5">
                  {[
                    { season: "Spring", temp: "21°C" },
                    { season: "Summer", temp: "32°C" },
                    { season: "Autumn", temp: "23°C" },
                    { season: "Winter", temp: "17°C" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{s.season}</span>
                      <span className="text-[14px] font-medium" style={{ color: palette.text }}>{s.temp}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[12px] font-light mt-4" style={{ color: palette.textLight }}>3,000+ hours of sunshine · 494mm annual rainfall</p>
              </div>
            </FadeIn>

            {/* Beaches */}
            <FadeIn delay={0.1}>
              <div className="text-center lg:text-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-5" style={{ background: palette.bgAlt }}>
                  <Waves className="w-6 h-6" style={{ color: palette.accent }} />
                </div>
                <h3 className="text-[18px] font-medium mb-1" style={{ color: palette.text }}>Beaches</h3>
                <p className="text-[14px] font-light mb-5" style={{ color: palette.textMuted }}>Pristine coves and blue-flag shores</p>
                <div className="space-y-3 text-left">
                  {BEACHES.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Waves className="w-4 h-4 mt-0.5 shrink-0" style={{ color: palette.accent }} />
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: palette.text }}>{b.name}</p>
                        <p className="text-[12px] font-light" style={{ color: palette.textMuted }}>{b.desc}</p>
                        {b.badge && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] tracking-[0.06em] uppercase font-medium rounded-sm" style={{ background: "#E3F2FD", color: "#1565C0" }}>
                            {b.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Gastronomy */}
            <FadeIn delay={0.2}>
              <div className="text-center lg:text-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-5" style={{ background: palette.bgAlt }}>
                  <Utensils className="w-6 h-6" style={{ color: palette.accent }} />
                </div>
                <h3 className="text-[18px] font-medium mb-1" style={{ color: palette.text }}>Gastronomy</h3>
                <p className="text-[14px] font-light mb-5" style={{ color: palette.textMuted }}>{MUNICIPALITY.name} is renowned for its culinary scene</p>
                <div className="space-y-4 text-left">
                  <p className="text-[13px] font-light leading-[1.8]" style={{ color: palette.textMuted }}>
                    From traditional rice dishes and fresh seafood on the seafront to innovative tapas in the old town's hidden plazas, Altea offers an extraordinary dining scene. The town hosts over 80 restaurants ranging from rustic family-run establishments to sophisticated fine dining.
                  </p>
                  <p className="text-[13px] font-light leading-[1.8]" style={{ color: palette.textMuted }}>
                    Don't miss the local <em>arroz a banda</em>, <em>espencat</em>, and the celebrated <em>borreta de melva</em> — dishes that have defined the town's gastronomic identity for generations.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — Infrastructure ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Connectivity" subtitle="Everything Within Reach" align="center" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INFRASTRUCTURE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className="p-6 rounded-sm flex items-start gap-5"
                  style={{ background: palette.white, border: `1px solid ${palette.border}` }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: palette.bgAlt }}>
                    <item.icon className="w-5 h-5" style={{ color: palette.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium mb-1" style={{ color: palette.text }}>{item.title}</h3>
                    <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>{item.detail}</p>
                    <p className="text-[12px] font-light mt-0.5" style={{ color: palette.textLight }}>{item.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8 — Properties ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="For Sale" subtitle={`Properties for Sale in ${MUNICIPALITY.name}`} />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROPERTIES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <a href={`/property7/${p.id}`} className="group block rounded-sm overflow-hidden" style={{ border: `1px solid ${palette.border}` }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.location} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] tracking-[0.08em] uppercase font-light mb-1" style={{ color: palette.textMuted }}>{p.location}</p>
                    <p className="text-[20px] font-light mb-3" style={{ color: palette.text }}>{p.price}</p>
                    <div className="flex items-center gap-4 text-[12px]" style={{ color: palette.textMuted }}>
                      <span>{p.beds} beds</span>
                      <span className="w-px h-3" style={{ background: palette.border }} />
                      <span>{p.baths} baths</span>
                      <span className="w-px h-3" style={{ background: palette.border }} />
                      <span>{p.sqm} m²</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mt-10">
              <a
                href="/properties"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase font-medium px-7 py-3 rounded-sm transition-opacity hover:opacity-80"
                style={{ background: palette.text, color: palette.white }}
              >
                View all properties in {MUNICIPALITY.name}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 9 — Guides ═══ */}
      <section className="py-20 lg:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn>
            <SectionTitle title="Guides" subtitle="Expert Guides" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUIDES.map((g, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <a href="/blog" className="group block rounded-sm overflow-hidden" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-[11px]" style={{ color: palette.textLight }}>
                      <span>{g.date}</span>
                      <span>·</span>
                      <span>{g.time}</span>
                    </div>
                    <h3 className="text-[16px] font-medium leading-[1.4] mb-2 group-hover:opacity-70 transition-opacity" style={{ color: palette.text }}>
                      {g.title}
                    </h3>
                    <p className="text-[13px] font-light leading-[1.7] line-clamp-2" style={{ color: palette.textMuted }}>{g.excerpt}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10 — CTA Final ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <img
          src={MUNICIPALITY.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
          <h2
            className="text-[30px] lg:text-[42px] font-light tracking-[0.02em] text-white mb-4"
            style={{ fontFamily: fonts.heading }}
          >
            Ready to Find Your Home in {MUNICIPALITY.name}?
          </h2>
          <p className="text-[15px] font-light text-white/70 mb-10 leading-[1.8]">
            Our local experts have been helping international buyers for over 15 years
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/properties"
              className="px-8 py-3 text-[12px] tracking-[0.06em] uppercase font-medium rounded-sm transition-opacity hover:opacity-80"
              style={{ background: palette.accent, color: palette.white }}
            >
              Browse Properties
            </a>
            <a
              href="/contact"
              className="px-8 py-3 text-[12px] tracking-[0.06em] uppercase font-medium rounded-sm border transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#FFFFFF" }}
            >
              Speak With an Advisor
            </a>
          </div>

          {/* Agent */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Agent" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-medium text-white">Carlos Martínez</p>
              <p className="text-[11px] text-white/60">Your {MUNICIPALITY.name} specialist</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MunicipalityPage;
