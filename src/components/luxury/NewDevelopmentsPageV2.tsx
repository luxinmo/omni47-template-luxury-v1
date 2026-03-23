import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Building2, X, ChevronDown, TrendingUp, ArrowRight } from "lucide-react";
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

const fmt = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ── Filter Select ── */
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
        style={{ border: `1px solid ${palette.border}`, color: value ? palette.text : palette.textMuted, background: palette.white }}
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
const NewDevelopmentsPageV2 = () => {
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
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

  return (
    <Layout navVariant="solid" activePath="/new-developments" showBackToTop>
      <SEOHead
        title="New Developments — Off-Plan Properties in Spain"
        description="Discover exclusive new developments and off-plan properties across Spain's most desirable coastal locations. Buy at pre-construction prices with flexible payment plans and full legal protection."
      />

      {/* ── Title + SEO Text (replaces Hero) ── */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16" style={{ background: palette.white }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4" style={{ color: palette.accent }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-medium" style={{ color: palette.accent }}>New Developments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight leading-[1.1] mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em", color: palette.text }}>
              Off-Plan Properties in Spain
            </h1>
            <p className="text-[15px] leading-[1.9] font-light max-w-3xl" style={{ color: palette.textMuted }}>
              Explore our curated portfolio of new-build developments across Spain's most sought-after coastal destinations. 
              Buying off-plan lets you secure a home at pre-construction prices — typically 20–30% below completed values — with 
              flexible payment plans spread over the build period and full bank-guaranteed deposit protection under Spanish law.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Filter Bar + Listings ── */}
      <section className="pb-16 sm:pb-24" style={{ background: palette.white }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
          {/* Filter Bar */}
          <div className="mb-8 p-6 sm:p-8 rounded-sm" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <FilterSelect label="Location" value={filterLocation} options={ALL_LOCATIONS} onChange={setFilterLocation} />
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
                const count = NEW_DEVELOPMENTS.filter(d => d.municipality === loc).length;
                return (
                  <span key={loc} className="text-[13px] font-light" style={{ color: palette.accent }}>
                    {loc} ({count})
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewDevelopmentsPageV2;
