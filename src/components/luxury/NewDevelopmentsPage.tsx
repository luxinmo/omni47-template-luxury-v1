import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, MapPin, ArrowRight, TrendingUp, Home, CheckCircle, Shield, X, ChevronDown } from "lucide-react";
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
interface NewDevelopment {
  slug: string;
  image: string;
  name: string;
  location: string;
  municipality: string;
  developer: string;
  delivery: string;
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;
  availableUnits: number;
  totalUnits: number;
  priceMin: number;
  priceMax: number;
  typologies: { type: string; from: number }[];
  units: { ref: string; type: string; price: number; beds: number; sqm: number }[];
  description: string;
  trending?: boolean;
}

/* ── Data ── */
const NEW_DEVELOPMENTS: NewDevelopment[] = [
  {
    slug: "marea-residences-altea", municipality: "Altea",
    image: prop1, name: "Marea Residences", location: "Altea, Costa Blanca", developer: "Grupo Prasa", delivery: "Q2 2027",
    status: "Selling", construction: 55, availableUnits: 28, totalUnits: 64, priceMin: 485000, priceMax: 1250000, trending: true,
    typologies: [{ type: "Apartment", from: 485000 }, { type: "Penthouse", from: 890000 }, { type: "Duplex", from: 720000 }],
    units: [{ ref: "MR-4A", type: "Apartment", price: 485000, beds: 2, sqm: 95 }, { ref: "MR-12B", type: "Penthouse", price: 890000, beds: 3, sqm: 160 }, { ref: "MR-8C", type: "Duplex", price: 720000, beds: 3, sqm: 135 }],
    description: "Contemporary beachfront apartments with panoramic sea views, communal pools, landscaped gardens and underground parking in Altea's most sought-after location.",
  },
  {
    slug: "the-view-javea", municipality: "Jávea",
    image: detail2, name: "The View Jávea", location: "Jávea, Costa Blanca", developer: "TM Real Estate Group", delivery: "Q4 2026",
    status: "Under Construction", construction: 72, availableUnits: 10, totalUnits: 24, priceMin: 1200000, priceMax: 2800000,
    typologies: [{ type: "Villa", from: 1200000 }, { type: "Penthouse", from: 1900000 }],
    units: [{ ref: "VJ-1A", type: "Villa", price: 1200000, beds: 4, sqm: 280 }, { ref: "VJ-5B", type: "Penthouse", price: 1900000, beds: 3, sqm: 220 }, { ref: "VJ-9C", type: "Villa", price: 1450000, beds: 4, sqm: 310 }],
    description: "Exclusive hillside villas and penthouses with infinity pools overlooking Jávea bay. Designed by award-winning architects with premium finishes.",
  },
  {
    slug: "one-green-way-moraira", municipality: "Moraira",
    image: detail3, name: "One Green Way", location: "Moraira, Costa Blanca", developer: "Vapf", delivery: "Q1 2028",
    status: "Pre-Launch", construction: 0, availableUnits: 42, totalUnits: 42, priceMin: 890000, priceMax: 2100000,
    typologies: [{ type: "Villa", from: 890000 }, { type: "Townhouse", from: 650000 }],
    units: [{ ref: "OGW-2A", type: "Villa", price: 890000, beds: 3, sqm: 240 }, { ref: "OGW-7B", type: "Villa", price: 1350000, beds: 4, sqm: 320 }],
    description: "Sustainable luxury villas nestled in a green valley with sea views. Solar-powered, smart home technology and private gardens in every home.",
  },
  {
    slug: "costa-serena-calpe", municipality: "Calpe",
    image: prop3, name: "Costa Serena", location: "Calpe, Costa Blanca", developer: "Grupo TM", delivery: "Q3 2027",
    status: "Selling", construction: 30, availableUnits: 18, totalUnits: 36, priceMin: 395000, priceMax: 950000, trending: true,
    typologies: [{ type: "Apartment", from: 395000 }, { type: "Penthouse", from: 680000 }],
    units: [{ ref: "CS-3A", type: "Apartment", price: 395000, beds: 2, sqm: 85 }, { ref: "CS-10B", type: "Penthouse", price: 680000, beds: 3, sqm: 145 }, { ref: "CS-6C", type: "Apartment", price: 450000, beds: 2, sqm: 98 }],
    description: "Mediterranean-style apartments just 200 metres from Calpe beach. Communal pool, gym, co-working space and children's play area.",
  },
  {
    slug: "sky-villas-benidorm", municipality: "Benidorm",
    image: prop2, name: "Sky Villas", location: "Benidorm, Costa Blanca", developer: "Aedas Homes", delivery: "Q2 2026",
    status: "Last Units", construction: 90, availableUnits: 4, totalUnits: 48, priceMin: 520000, priceMax: 1800000,
    typologies: [{ type: "Apartment", from: 520000 }, { type: "Penthouse", from: 1200000 }],
    units: [{ ref: "SV-42A", type: "Penthouse", price: 1200000, beds: 3, sqm: 190 }, { ref: "SV-38B", type: "Apartment", price: 520000, beds: 2, sqm: 105 }],
    description: "High-rise luxury with panoramic views from every floor. Rooftop infinity pool, concierge service and direct beach access.",
  },
  {
    slug: "vista-marina-denia", municipality: "Dénia",
    image: detail1, name: "Vista Marina", location: "Dénia, Costa Blanca", developer: "Neinor Homes", delivery: "Q4 2027",
    status: "Under Construction", construction: 40, availableUnits: 22, totalUnits: 38, priceMin: 340000, priceMax: 780000,
    typologies: [{ type: "Apartment", from: 340000 }, { type: "Duplex", from: 580000 }],
    units: [{ ref: "VM-5A", type: "Apartment", price: 340000, beds: 2, sqm: 80 }, { ref: "VM-14B", type: "Duplex", price: 580000, beds: 3, sqm: 130 }, { ref: "VM-9C", type: "Apartment", price: 420000, beds: 2, sqm: 92 }],
    description: "Elegant apartments overlooking Dénia's marina with direct access to restaurants, shops and the historic old town.",
  },
];

/* ── Derived filter options ── */
const ALL_LOCATIONS = [...new Set(NEW_DEVELOPMENTS.map(d => d.municipality))];
const ALL_STATUSES = [...new Set(NEW_DEVELOPMENTS.map(d => d.status))];
const ALL_TYPOLOGIES = [...new Set(NEW_DEVELOPMENTS.flatMap(d => d.typologies.map(t => t.type)))];
const ALL_DELIVERIES = [...new Set(NEW_DEVELOPMENTS.map(d => d.delivery))].sort();
const LOCATION_SLUGS: Record<string, string> = {};
ALL_LOCATIONS.forEach(loc => { LOCATION_SLUGS[loc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")] = loc; });

const BENEFITS = [
  { icon: CheckCircle, title: "Off-Plan Prices", description: "Buy at pre-construction prices with payment plans spread over the build period — typically 20–30% below completed values." },
  { icon: TrendingUp, title: "Capital Growth", description: "New developments in prime locations historically appreciate 15–25% from launch to handover, offering strong capital growth." },
  { icon: Home, title: "Modern Standards", description: "Energy-efficient construction, smart home integration, contemporary design and the latest building regulations fully met." },
  { icon: Shield, title: "Legal Protection", description: "Spanish law requires bank guarantees on off-plan deposits, protecting your investment throughout the construction period." },
];

const fmt = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ── Elegant Select Dropdown ── */
const FilterSelect = ({ label, value, options, onChange }: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) => (
  <div className="flex-1 min-w-[180px]">
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

/* ── Development Card ── */
const DevCard = ({ d, i }: { d: NewDevelopment; i: number }) => (
  <FadeIn delay={i * 0.08}>
    <div className="group flex flex-col lg:flex-row overflow-hidden rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
      <div className="relative lg:w-[44%] min-h-[240px] lg:min-h-[360px] overflow-hidden">
        <img src={d.image} alt={`${d.name} — ${d.location}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
        {d.status === "Last Units" && (
          <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">Last units</span>
        )}
        {d.trending && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase font-medium text-white rounded-sm bg-black/60 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" /> Trending
          </span>
        )}
      </div>
      <div className="flex-1 p-6 lg:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: palette.textMuted }}>{d.location}</span>
            <span className="px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase rounded-sm border" style={{ borderColor: palette.border, color: palette.textMuted }}>New Development</span>
          </div>
          <span className="text-[11px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 rounded-sm" style={{ color: palette.text, border: `1px solid ${palette.text}30` }}>
            {d.status}
          </span>
        </div>
        <h3 className="text-xl lg:text-[22px] font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{d.name}</h3>
        <p className="text-[13px] font-light mb-4" style={{ color: palette.textMuted }}>{d.developer} · Delivery {d.delivery}</p>
        <div className="flex gap-6 mb-4 pb-4" style={{ borderBottom: `1px solid ${palette.border}` }}>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Availability</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{d.availableUnits} <span className="text-[13px]" style={{ color: palette.textLight }}>/ {d.totalUnits}</span></p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Construction</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{d.construction}%</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>Delivery</p>
            <p className="text-[17px] font-light" style={{ color: palette.text }}>{d.delivery}</p>
          </div>
        </div>
        <p className="text-[22px] lg:text-[24px] font-light mb-4" style={{ color: palette.text }}>{fmt(d.priceMin)} — {fmt(d.priceMax)}</p>
        <div className="flex flex-col sm:flex-row gap-6 mb-5">
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textLight }}>Typologies</p>
            {d.typologies.map((t) => (
              <p key={t.type} className="text-[13px] font-light leading-relaxed" style={{ color: palette.textMuted }}>{t.type} from <span style={{ color: palette.text }}>{fmt(t.from)}</span></p>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textLight }}>Available Units</p>
            {d.units.map((u) => (
              <p key={u.ref} className="text-[13px] font-light leading-relaxed" style={{ color: palette.textMuted }}>
                <span style={{ color: palette.text }}>{u.ref}</span> · {u.type} · {u.beds} bed · {u.sqm} m² · {fmt(u.price)}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
          <p className="text-[12px] font-light" style={{ color: palette.textLight }}>
            {d.availableUnits === d.totalUnits ? "All units available" : `${d.availableUnits} of ${d.totalUnits} available`}
            {d.construction > 0 && <span className="ml-3">{d.construction}% built</span>}
          </p>
          <Link to={`/new-developments/${d.slug}`} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
            View Project <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  </FadeIn>
);

/* ── Page ── */
const NewDevelopmentsPage = () => {
  const { location: locationSlug } = useParams<{ location?: string }>();
  const locationFromUrl = locationSlug ? LOCATION_SLUGS[locationSlug] || null : null;

  const [filterLocation, setFilterLocation] = useState<string | null>(locationFromUrl);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterTypology, setFilterTypology] = useState<string | null>(null);
  const [filterDelivery, setFilterDelivery] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return NEW_DEVELOPMENTS.filter(d => {
      if (filterLocation && d.municipality !== filterLocation) return false;
      if (filterStatus && d.status !== filterStatus) return false;
      if (filterTypology && !d.typologies.some(t => t.type === filterTypology)) return false;
      if (filterDelivery && d.delivery !== filterDelivery) return false;
      return true;
    });
  }, [filterLocation, filterStatus, filterTypology, filterDelivery]);

  const hasFilters = filterLocation || filterStatus || filterTypology || filterDelivery;

  const clearFilters = () => {
    setFilterLocation(null);
    setFilterStatus(null);
    setFilterTypology(null);
    setFilterDelivery(null);
  };

  const pageTitle = locationFromUrl
    ? `New Developments in ${locationFromUrl} — Off-Plan Properties`
    : "New Developments — Off-Plan Properties in Spain";

  const pageH1 = locationFromUrl
    ? `New Developments in ${locationFromUrl}`
    : "New Developments";

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false} showLanguage>
      <SEOHead title={pageTitle} description={`Discover new developments and off-plan properties${locationFromUrl ? ` in ${locationFromUrl}` : " across Spain"}. Buy at pre-construction prices with payment plans and bank-guaranteed deposits.`} />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <img src={heroImg} alt="New developments luxury living" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,24,22,0.5) 0%, rgba(26,24,22,0.7) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2" style={{ background: "rgba(139,111,71,0.15)", border: "1px solid rgba(139,111,71,0.3)" }}>
              <Building2 className="w-4 h-4" style={{ color: palette.accent }} />
              <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: palette.accent }}>New Developments</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              {pageH1}
            </h1>
            <p className="text-[16px] sm:text-lg font-light leading-[1.8] max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
              Discover exclusive off-plan developments across Spain's most desirable locations. Buy at pre-construction prices with flexible payment plans and full legal protection.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90 text-white" style={{ background: palette.accent }}>
              <Building2 className="w-4 h-4" /> Request Information
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* WHAT ARE NEW DEVELOPMENTS */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Understanding Off-Plan</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Why Buy Off-Plan in Spain?</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-6 text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
              <p>New-build properties in Spain represent one of the smartest investments in the Mediterranean real estate market. Buying off-plan allows you to secure a home at pre-construction prices, typically <strong style={{ color: palette.text }}>20–30% below</strong> the value of the completed property at handover.</p>
              <p>Spanish law provides robust consumer protection for off-plan buyers. Developers are required to provide bank guarantees on all deposits, ensuring your money is protected. Payment plans are typically structured over the construction period, with 30% paid during the build and 70% upon completion.</p>
              <p>Modern new-build homes meet the latest energy efficiency standards, feature contemporary design and smart home technology, and come with full manufacturer warranties.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY NEW DEVELOPMENTS */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Advantages</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The New Development Advantage</h2>
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

      {/* DEVELOPMENTS LISTING */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our Portfolio</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Available New Developments</h2>
              <p className="text-[14px] font-light mt-4 max-w-2xl mx-auto" style={{ color: palette.textMuted }}>
                Explore our curated selection of new development projects across Spain's most sought-after coastal destinations.
              </p>
            </div>
          </FadeIn>

          {/* ── Filter Bar ── */}
          <div className="mb-10 p-6 sm:p-8 rounded-sm" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
            {/* Location row */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Location</p>
              <div className="flex flex-wrap gap-2.5">
                <Chip label="All" active={!filterLocation} onClick={() => setFilterLocation(null)} />
                {ALL_LOCATIONS.map(loc => (
                  <Chip key={loc} label={loc} active={filterLocation === loc} onClick={() => setFilterLocation(filterLocation === loc ? null : loc)} />
                ))}
              </div>
            </div>

            {/* Status + Typology row */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-6">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Status</p>
                <div className="flex flex-wrap gap-2.5">
                  {ALL_STATUSES.map(s => (
                    <Chip key={s} label={s} active={filterStatus === s} onClick={() => setFilterStatus(filterStatus === s ? null : s)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Typology</p>
                <div className="flex flex-wrap gap-2.5">
                  {ALL_TYPOLOGIES.map(t => (
                    <Chip key={t} label={t} active={filterTypology === t} onClick={() => setFilterTypology(filterTypology === t ? null : t)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery row */}
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Delivery</p>
              <div className="flex flex-wrap gap-2.5">
                {ALL_DELIVERIES.map(d => (
                  <Chip key={d} label={d} active={filterDelivery === d} onClick={() => setFilterDelivery(filterDelivery === d ? null : d)} />
                ))}
              </div>
            </div>

            {hasFilters && (
              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                <button onClick={clearFilters} className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.1em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Results count */}
          <p className="text-[13px] font-light mb-6 pb-4" style={{ color: palette.textLight, borderBottom: `1px solid ${palette.border}` }}>
            {filtered.length} development{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Cards */}
          <div className="space-y-6">
            {filtered.length > 0 ? (
              filtered.map((d, i) => <DevCard key={d.slug} d={d} i={i} />)
            ) : (
              <div className="text-center py-20">
                <Building2 className="w-10 h-10 mx-auto mb-4" style={{ color: palette.textLight }} />
                <p className="text-[15px] font-light" style={{ color: palette.textMuted }}>No developments match your current filters.</p>
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
                const count = NEW_DEVELOPMENTS.filter(d => d.municipality === loc).length;
                return (
                  <Link key={loc} to={`/new-developments/in/${slug}`} className="text-[13px] font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
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
            <Building2 className="w-8 h-8 mx-auto mb-6" style={{ color: palette.accent }} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              Interested in New Developments?
            </h2>
            <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
              Contact our specialist team for private viewings, floor plans, payment schedules and exclusive pre-launch access to new development projects across Spain.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-90 text-white" style={{ background: palette.accent }}>
                Schedule a Consultation
              </Link>
              <Link to="/properties" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all duration-500 hover:opacity-80" style={{ border: `1px solid ${palette.accent}60`, color: palette.accent }}>
                Browse All Properties
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default NewDevelopmentsPage;
