import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Crown, ArrowRight, Star, Shield, Sparkles, Users, TrendingUp, X, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts } from "@/config/template";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import heroImg from "@/assets/luxury-hero.jpg";

/* ── Types ── */
interface BrandedResidence {
  slug: string;
  image: string;
  name: string;
  location: string;
  municipality: string;
  brand: string;
  developer: string;
  delivery: string;
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;
  availableUnits: number;
  totalUnits: number;
  priceMin: number;
  priceMax: number;
  typologies: { type: string; from: number }[];
  units: { ref: string; type: string; price: number }[];
  description: string;
  trending?: boolean;
}

/* ── Data ── */
const BRANDED_RESIDENCES: BrandedResidence[] = [
  {
    slug: "four-seasons-marbella", municipality: "Marbella",
    image: prop1, name: "Four Seasons Private Residences", location: "Marbella, Costa del Sol", brand: "Four Seasons", developer: "Four Seasons Hotels", delivery: "Q2 2027",
    status: "Selling", construction: 45, availableUnits: 8, totalUnits: 32, priceMin: 3500000, priceMax: 8200000, trending: true,
    typologies: [{ type: "Penthouse", from: 5200000 }, { type: "Villa", from: 6800000 }, { type: "Apartment", from: 3500000 }],
    units: [{ ref: "FS-4A", type: "Penthouse", price: 5200000 }, { ref: "FS-7B", type: "Villa", price: 7400000 }, { ref: "FS-2C", type: "Apartment", price: 3500000 }],
    description: "Oceanfront residences with full Four Seasons hotel services, private beach club and world-class spa.",
  },
  {
    slug: "ritz-carlton-ibiza", municipality: "Ibiza",
    image: detail2, name: "The Ritz-Carlton Residences", location: "Ibiza", brand: "Ritz-Carlton", developer: "Marriott International", delivery: "Q4 2028",
    status: "Pre-Launch", construction: 0, availableUnits: 18, totalUnits: 18, priceMin: 4200000, priceMax: 12000000,
    typologies: [{ type: "Penthouse", from: 8500000 }, { type: "Villa", from: 4200000 }],
    units: [{ ref: "RC-1A", type: "Penthouse", price: 8500000 }, { ref: "RC-3B", type: "Villa", price: 4200000 }, { ref: "RC-5C", type: "Villa", price: 5100000 }],
    description: "Ultra-luxury residences featuring panoramic sea views, concierge services and exclusive marina access.",
  },
  {
    slug: "mandarin-oriental-altea", municipality: "Altea",
    image: detail3, name: "Mandarin Oriental Residences", location: "Altea, Costa Blanca", brand: "Mandarin Oriental", developer: "Mandarin Oriental Hotel Group", delivery: "Q1 2027",
    status: "Selling", construction: 62, availableUnits: 12, totalUnits: 45, priceMin: 2800000, priceMax: 6500000,
    typologies: [{ type: "Apartment", from: 2800000 }, { type: "Penthouse", from: 4900000 }],
    units: [{ ref: "MO-11B", type: "Apartment", price: 2800000 }, { ref: "MO-8A", type: "Penthouse", price: 4900000 }, { ref: "MO-15C", type: "Apartment", price: 3200000 }],
    description: "Elegant Mediterranean homes with signature Mandarin Oriental hospitality, wellness centre and fine dining.",
  },
  {
    slug: "aman-javea", municipality: "Jávea",
    image: prop3, name: "Aman Residences", location: "Jávea, Costa Blanca", brand: "Aman", developer: "Aman Group", delivery: "Q3 2028",
    status: "Pre-Launch", construction: 0, availableUnits: 12, totalUnits: 12, priceMin: 5100000, priceMax: 15000000,
    typologies: [{ type: "Villa", from: 5100000 }, { type: "Estate", from: 9800000 }],
    units: [{ ref: "AM-1", type: "Villa", price: 5100000 }, { ref: "AM-2", type: "Estate", price: 9800000 }],
    description: "Serene clifftop villas designed with Aman's philosophy of peace, offering unparalleled privacy and natural beauty.",
  },
  {
    slug: "w-residences-benidorm", municipality: "Benidorm",
    image: prop2, name: "W Residences", location: "Benidorm, Costa Blanca", brand: "W Hotels", developer: "Marriott International", delivery: "Q2 2026",
    status: "Last Units", construction: 92, availableUnits: 3, totalUnits: 56, priceMin: 1900000, priceMax: 4500000, trending: true,
    typologies: [{ type: "Penthouse", from: 3200000 }, { type: "Apartment", from: 1900000 }],
    units: [{ ref: "W-42A", type: "Penthouse", price: 3200000 }, { ref: "W-38B", type: "Apartment", price: 1900000 }, { ref: "W-44C", type: "Penthouse", price: 3800000 }],
    description: "Bold, contemporary living with W's signature energy — rooftop pools, DJ sessions and vibrant social spaces.",
  },
  {
    slug: "six-senses-moraira", municipality: "Moraira",
    image: detail1, name: "Six Senses Residences", location: "Moraira, Costa Blanca", brand: "Six Senses", developer: "IHG Hotels", delivery: "Q4 2027",
    status: "Under Construction", construction: 35, availableUnits: 14, totalUnits: 22, priceMin: 3200000, priceMax: 7800000,
    typologies: [{ type: "Villa", from: 3200000 }, { type: "Penthouse", from: 5600000 }],
    units: [{ ref: "SS-6A", type: "Villa", price: 3200000 }, { ref: "SS-9B", type: "Penthouse", price: 5600000 }, { ref: "SS-3C", type: "Villa", price: 4100000 }],
    description: "Sustainable luxury homes integrated into nature with Six Senses' renowned wellness and sustainability programmes.",
  },
];

/* ── Derived filter options ── */
const ALL_LOCATIONS = [...new Set(BRANDED_RESIDENCES.map(r => r.municipality))];
const ALL_STATUSES = [...new Set(BRANDED_RESIDENCES.map(r => r.status))];
const ALL_TYPOLOGIES = [...new Set(BRANDED_RESIDENCES.flatMap(r => r.typologies.map(t => t.type)))];
const ALL_DELIVERIES = [...new Set(BRANDED_RESIDENCES.map(r => r.delivery))].sort();
const ALL_BRANDS = [...new Set(BRANDED_RESIDENCES.map(r => r.brand))];
const LOCATION_SLUGS: Record<string, string> = {};
ALL_LOCATIONS.forEach(loc => { LOCATION_SLUGS[loc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")] = loc; });

const BENEFITS = [
  { icon: Star, title: "Five-Star Services", description: "Enjoy hotel-grade concierge, housekeeping, dining and spa services in the comfort of your own home." },
  { icon: Shield, title: "Strong Investment", description: "Branded residences typically command 25–35% premium over comparable non-branded properties." },
  { icon: Sparkles, title: "World-Class Amenities", description: "Private pools, fitness centres, fine dining, beach clubs and wellness spas at your doorstep." },
  { icon: Users, title: "Global Community", description: "Join an exclusive community of like-minded owners who appreciate the finer things in life." },
];

const fmt = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ── Elegant Select Dropdown ── */
const FilterSelect = ({ label, value, options, onChange }: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) => (
  <div className="flex-1 min-w-[160px]">
    <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: palette.accent }}>{label}</p>
    <div className="relative">
      <select
        value={value || ""}
        onChange={e => onChange(e.target.value || null)}
        className="w-full appearance-none bg-transparent text-[13px] tracking-[0.04em] font-light pl-4 pr-10 py-3 rounded-none cursor-pointer transition-all duration-200 focus:outline-none"
        style={{
          border: `1px solid ${palette.border}`,
          color: value ? palette.text : palette.textMuted,
          background: palette.white,
        }}
      >
        <option value="">All {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: palette.textLight }} />
    </div>
  </div>
);

/* ── Branded Card ── */
const BrandedCard = ({ r, i }: { r: BrandedResidence; i: number }) => (
  <FadeIn delay={i * 0.08}>
    <div className="group flex flex-col lg:flex-row overflow-hidden rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
      <div className="relative lg:w-[44%] min-h-[240px] lg:min-h-[360px] overflow-hidden">
        <img src={r.image} alt={`${r.name} — ${r.brand}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
        {r.status === "Last Units" && (
          <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">Last units</span>
        )}
        {r.trending && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" /> Trending
          </span>
        )}
      </div>
      <div className="flex-1 p-6 lg:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: palette.textMuted }}>{r.location}</span>
            <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase rounded-sm border" style={{ borderColor: palette.border, color: palette.textMuted }}>Branded</span>
          </div>
          <span className="text-[11px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 rounded-sm" style={{ color: palette.text, border: `1px solid ${palette.text}30` }}>
            {r.status}
          </span>
        </div>
        <h3 className="text-xl lg:text-[22px] font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{r.name}</h3>
        <p className="text-[13px] font-light mb-4" style={{ color: palette.textMuted }}>{r.developer} · Delivery {r.delivery}</p>
        <div className="flex gap-6 mb-4 pb-4" style={{ borderBottom: `1px solid ${palette.border}` }}>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Availability</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{r.availableUnits} <span className="text-[13px]" style={{ color: palette.textLight }}>/ {r.totalUnits}</span></p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Construction</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{r.construction}%</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Delivery</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{r.delivery}</p>
          </div>
        </div>
        <p className="text-[22px] lg:text-[24px] font-light mb-4" style={{ color: palette.text }}>{fmt(r.priceMin)} — {fmt(r.priceMax)}</p>
        <div className="flex flex-col sm:flex-row gap-6 mb-5">
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textLight }}>Typologies</p>
            {r.typologies.map((t) => (
              <p key={t.type} className="text-[13px] font-light leading-relaxed" style={{ color: palette.textMuted }}>{t.type} from <span style={{ color: palette.text }}>{fmt(t.from)}</span></p>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textLight }}>Available Units</p>
            {r.units.map((u) => (
              <p key={u.ref} className="text-[13px] font-light leading-relaxed" style={{ color: palette.textMuted }}>
                <span style={{ color: palette.text }}>{u.ref}</span> · {u.type} · {fmt(u.price)}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
          <p className="text-[12px] font-light" style={{ color: palette.textLight }}>
            {r.availableUnits === r.totalUnits ? "All units available" : `${r.availableUnits} of ${r.totalUnits} available`}
            {r.construction > 0 && <span className="ml-3">{r.construction}% built</span>}
          </p>
          <Link to={`/branded-residences/${r.slug}`} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
            View Project <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  </FadeIn>
);

/* ── Page ── */
const BrandedResidencesPage = () => {
  const { location: locationSlug } = useParams<{ location?: string }>();
  const locationFromUrl = locationSlug ? LOCATION_SLUGS[locationSlug] || null : null;

  const [filterLocation, setFilterLocation] = useState<string | null>(locationFromUrl);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterTypology, setFilterTypology] = useState<string | null>(null);
  const [filterDelivery, setFilterDelivery] = useState<string | null>(null);
  const [filterBrand, setFilterBrand] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return BRANDED_RESIDENCES.filter(r => {
      if (filterLocation && r.municipality !== filterLocation) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (filterTypology && !r.typologies.some(t => t.type === filterTypology)) return false;
      if (filterDelivery && r.delivery !== filterDelivery) return false;
      if (filterBrand && r.brand !== filterBrand) return false;
      return true;
    });
  }, [filterLocation, filterStatus, filterTypology, filterDelivery, filterBrand]);

  const hasFilters = filterLocation || filterStatus || filterTypology || filterDelivery || filterBrand;

  const clearFilters = () => {
    setFilterLocation(null);
    setFilterStatus(null);
    setFilterTypology(null);
    setFilterDelivery(null);
    setFilterBrand(null);
  };

  const pageTitle = locationFromUrl
    ? `Branded Residences in ${locationFromUrl} — Luxury Hospitality Living`
    : "Branded Residences — Luxury Hospitality Living in Spain";

  const pageH1 = locationFromUrl
    ? `Branded Residences in ${locationFromUrl}`
    : "Branded Residences";

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false} showLanguage>
      <SEOHead title={pageTitle} description={`Discover branded residences${locationFromUrl ? ` in ${locationFromUrl}` : " across Spain"} by Four Seasons, Ritz-Carlton, Mandarin Oriental, Aman and more. Five-star services, world-class amenities and exceptional investment value.`} />

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
              {pageH1}
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
              <p>Branded residences are luxury homes developed in partnership with world-renowned hospitality brands such as Four Seasons, Ritz-Carlton, Mandarin Oriental, Aman and Six Senses. These properties carry the name, design standards and service philosophy of an internationally recognised hotel brand.</p>
              <p>Owners enjoy the privacy of owning a home combined with exceptional amenities: 24-hour concierge, housekeeping, spa and wellness facilities, fine dining and members-only clubs — all managed to five-star standards.</p>
              <p>From an investment perspective, branded residences command a <strong style={{ color: palette.text }}>25–35% price premium</strong> over comparable non-branded properties and tend to hold their value significantly better during market downturns.</p>
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
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our Portfolio</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Available Branded Residences</h2>
              <p className="text-[14px] font-light mt-4 max-w-2xl mx-auto" style={{ color: palette.textMuted }}>
                Explore our curated selection of branded residence projects across Spain's most prestigious locations.
              </p>
            </div>
          </FadeIn>

          {/* ── Filter Bar ── */}
          <div className="mb-10 p-6 sm:p-8 rounded-sm" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              <FilterSelect label="Location" value={filterLocation} options={ALL_LOCATIONS} onChange={setFilterLocation} />
              <FilterSelect label="Brand" value={filterBrand} options={ALL_BRANDS} onChange={setFilterBrand} />
              <FilterSelect label="Status" value={filterStatus} options={ALL_STATUSES} onChange={setFilterStatus} />
              <FilterSelect label="Typology" value={filterTypology} options={ALL_TYPOLOGIES} onChange={setFilterTypology} />
              <FilterSelect label="Delivery" value={filterDelivery} options={ALL_DELIVERIES} onChange={setFilterDelivery} />
            </div>
            {hasFilters && (
              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                <button onClick={clearFilters} className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.1em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              </div>
            )}
          </div>

          <p className="text-[13px] font-light mb-6 pb-4" style={{ color: palette.textLight, borderBottom: `1px solid ${palette.border}` }}>
            {filtered.length} residence{filtered.length !== 1 ? "s" : ""} found
          </p>

          <div className="space-y-6">
            {filtered.length > 0 ? (
              filtered.map((r, i) => <BrandedCard key={r.slug} r={r} i={i} />)
            ) : (
              <div className="text-center py-20">
                <Crown className="w-10 h-10 mx-auto mb-4" style={{ color: palette.textLight }} />
                <p className="text-[15px] font-light" style={{ color: palette.textMuted }}>No branded residences match your current filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[13px] underline font-light" style={{ color: palette.accent }}>Clear filters</button>
              </div>
            )}
          </div>

          {/* Location links for SEO */}
          <div className="mt-16 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: palette.textLight }}>Browse by Location</p>
            <div className="flex flex-wrap gap-3">
              {ALL_LOCATIONS.map(loc => {
                const slug = loc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
                const count = BRANDED_RESIDENCES.filter(r => r.municipality === loc).length;
                return (
                  <Link key={loc} to={`/branded-residences/in/${slug}`} className="text-[13px] font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                    {loc} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 md:py-36" style={{ background: "#2C2825" }}>
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
