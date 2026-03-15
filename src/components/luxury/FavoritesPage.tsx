import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, Bed, Bath, Maximize, MapPin, Trash2, Share2, X, ArrowRight,
  Grid3X3, List, SlidersHorizontal,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts, brand } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

/* ─── Mock saved properties ─── */
const SAVED_PROPERTIES = [
  { id: "1", image: heroImg, name: "Luxury Villa Santa Eulalia", location: "Santa Eulalia del Río, Ibiza", price: "€4,650,000", beds: 5, baths: 4, sqm: 420, plot: 1200, ref: "PE-IBZ-2847", tag: "FOR SALE", style: "Contemporary", href: "/property6/1", savedAt: "2026-03-14" },
  { id: "2", image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, plot: 1800, ref: "PE-IBZ-3001", tag: "FOR SALE", style: "Luxury", href: "/property6/2", savedAt: "2026-03-13" },
  { id: "3", image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, plot: 0, ref: "PE-IBZ-3002", tag: "FOR SALE", style: "Modern", href: "/property6/3", savedAt: "2026-03-12" },
  { id: "4", image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, plot: 3500, ref: "PE-IBZ-3003", tag: "FOR SALE", style: "Traditional", href: "/property6/4", savedAt: "2026-03-11" },
  { id: "5", image: detail1, name: "Sea View Apartment Talamanca", location: "Talamanca, Ibiza", price: "€1,250,000", beds: 2, baths: 2, sqm: 120, plot: 0, ref: "PE-IBZ-4001", tag: "FOR SALE", style: "Modern", href: "/property6/5", savedAt: "2026-03-10" },
  { id: "6", image: detail2, name: "Cliff Edge Villa Roca Llisa", location: "Roca Llisa, Ibiza", price: "€8,400,000", beds: 6, baths: 7, sqm: 680, plot: 2200, ref: "PE-IBZ-4002", tag: "FOR SALE", style: "Contemporary", href: "/property6/6", savedAt: "2026-03-09" },
];

const SORT_OPTIONS = [
  { value: "date-desc", label: "Recently Saved" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "beds-desc", label: "Most Bedrooms" },
  { value: "size-desc", label: "Largest First" },
];

const FavoritesPage = () => {
  const [saved, setSaved] = useState(SAVED_PROPERTIES);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date-desc");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const removeProperty = (id: string) => {
    setSaved((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
  };

  const sortedProperties = [...saved].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return parseInt(a.price.replace(/[€,.]/g, "")) - parseInt(b.price.replace(/[€,.]/g, ""));
      case "price-desc": return parseInt(b.price.replace(/[€,.]/g, "")) - parseInt(a.price.replace(/[€,.]/g, ""));
      case "beds-desc": return b.beds - a.beds;
      case "size-desc": return b.sqm - a.sqm;
      default: return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
  });

  return (
    <Layout activePath="/favorites" showLanguage>
      <SEOHead title="Saved Properties" description="Your curated collection of luxury properties." />

      {/* ─── HERO HEADER ─── */}
      <section className="border-b" style={{ borderColor: palette.border }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textLight }}>
                  Your Collection
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.04em]" style={{ fontFamily: fonts.heading, color: palette.text }}>
                  Saved Properties
                </h1>
                <p className="text-[14px] font-light mt-2 max-w-lg" style={{ color: palette.textMuted }}>
                  {saved.length} {saved.length === 1 ? "property" : "properties"} in your collection
                </p>
              </div>
              {saved.length > 0 && (
                <div className="flex items-center gap-3">
                  {/* View toggle */}
                  <div className="flex border rounded-sm overflow-hidden" style={{ borderColor: palette.border }}>
                    <button
                      onClick={() => setViewMode("grid")}
                      className="p-2 transition-colors"
                      style={{ background: viewMode === "grid" ? palette.text : "transparent", color: viewMode === "grid" ? palette.white : palette.textMuted }}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className="p-2 transition-colors"
                      style={{ background: viewMode === "list" ? palette.text : "transparent", color: viewMode === "list" ? palette.white : palette.textMuted }}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-[13px] border px-3 py-2 appearance-none cursor-pointer focus:outline-none transition-colors rounded-sm"
                    style={{ borderColor: palette.border, color: palette.text, background: palette.white }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── EMPTY STATE ─── */}
      {saved.length === 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
          <FadeIn>
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${palette.accent}10` }}>
                <Heart className="w-7 h-7" style={{ color: palette.accent }} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-light mb-2" style={{ color: palette.text, fontFamily: fonts.heading }}>
                No Saved Properties Yet
              </h2>
              <p className="text-[14px] font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
                Browse our luxury collection and tap the heart icon to save properties you love. They'll appear here for easy access.
              </p>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-85"
                style={{ background: palette.text, color: palette.white }}
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </section>
      )}

      {/* ─── GRID VIEW ─── */}
      {saved.length > 0 && viewMode === "grid" && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sortedProperties.map((prop, i) => (
              <FadeIn key={prop.id} delay={i * 0.05}>
                <div className="group border rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-md relative" style={{ borderColor: palette.border, background: palette.white }}>
                  {/* Image */}
                  <Link to={prop.href} className="block relative overflow-hidden aspect-[4/3]">
                    <img src={prop.image} alt={prop.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium" style={{ background: `${palette.white}e6`, color: palette.text }}>
                      {prop.tag}
                    </span>
                  </Link>

                  {/* Actions overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors" style={{ background: `${palette.white}e6` }} aria-label="Share">
                      <Share2 className="w-3.5 h-3.5" style={{ color: palette.textMuted }} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(prop.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors hover:bg-red-50"
                      style={{ background: `${palette.white}e6` }}
                      aria-label="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>

                  {/* Info */}
                  <Link to={prop.href} className="block p-5">
                    <p className="text-[12px] tracking-[0.12em] uppercase font-light mb-1 flex items-center gap-1.5" style={{ color: palette.textMuted }}>
                      <MapPin className="w-3 h-3" strokeWidth={1.5} />
                      {prop.location}
                    </p>
                    <h3 className="text-[15px] font-medium leading-snug mb-3 line-clamp-2 group-hover:opacity-75 transition-opacity" style={{ color: palette.text }}>
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-3 text-[13px] font-light" style={{ color: palette.textMuted }}>
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.baths}</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.sqm} m²</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-light tracking-tight" style={{ color: palette.text }}>{prop.price}</p>
                      <span className="text-[11px] font-mono tracking-wider" style={{ color: palette.textLight }}>REF-{prop.ref}</span>
                    </div>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ─── LIST VIEW ─── */}
      {saved.length > 0 && viewMode === "list" && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="space-y-3">
            {sortedProperties.map((prop, i) => (
              <FadeIn key={prop.id} delay={i * 0.03}>
                <div className="group flex flex-col sm:flex-row border rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-md" style={{ borderColor: palette.border, background: palette.white }}>
                  {/* Image */}
                  <Link to={prop.href} className="block sm:w-[280px] lg:w-[320px] shrink-0">
                    <div className="relative overflow-hidden aspect-[16/10] sm:h-full">
                      <img src={prop.image} alt={prop.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium" style={{ background: `${palette.white}e6`, color: palette.text }}>
                        {prop.tag}
                      </span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] tracking-[0.12em] uppercase font-light mb-1 flex items-center gap-1.5" style={{ color: palette.textMuted }}>
                            <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.5} />
                            {prop.location}
                          </p>
                          <Link to={prop.href}>
                            <h3 className="text-[16px] sm:text-[17px] font-medium leading-snug group-hover:opacity-75 transition-opacity" style={{ color: palette.text }}>
                              {prop.name}
                            </h3>
                          </Link>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: palette.border, color: palette.textMuted }} aria-label="Share">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(prop.id)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-red-50 hover:border-red-200"
                            style={{ borderColor: palette.border }}
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[13px] font-light mb-2" style={{ color: palette.textMuted }}>
                        {prop.style} <span style={{ color: palette.textLight }}>·</span> REF-{prop.ref}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-center gap-5 text-[13px] font-light" style={{ color: palette.textMuted }}>
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.beds} beds</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.baths} baths</span>
                        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.sqm} m²</span>
                        {prop.plot > 0 && <span className="hidden md:flex items-center gap-1">Plot: {prop.plot.toLocaleString()} m²</span>}
                      </div>
                      <p className="text-xl font-light tracking-tight" style={{ color: palette.text }}>{prop.price}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      {saved.length > 0 && (
        <section className="border-t" style={{ borderColor: palette.border }}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="text-xl font-light mb-1" style={{ color: palette.text, fontFamily: fonts.heading }}>Looking for Something Else?</h2>
                <p className="text-[14px] font-light" style={{ color: palette.textMuted }}>Browse our full collection of luxury properties across the Mediterranean.</p>
              </div>
              <Link
                to="/properties"
                className="shrink-0 flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-85"
                style={{ background: palette.text, color: palette.white }}
              >
                View All Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── DELETE CONFIRMATION OVERLAY ─── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-sm p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()} style={{ color: palette.text }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-medium">Remove Property</h3>
              <button onClick={() => setConfirmDelete(null)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[14px] font-light mb-6" style={{ color: palette.textMuted }}>
              Are you sure you want to remove this property from your saved collection?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 text-[12px] tracking-[0.1em] uppercase py-2.5 border transition-colors hover:bg-neutral-50"
                style={{ borderColor: palette.border, color: palette.text }}
              >
                Cancel
              </button>
              <button
                onClick={() => removeProperty(confirmDelete)}
                className="flex-1 text-[12px] tracking-[0.1em] uppercase py-2.5 bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FavoritesPage;
