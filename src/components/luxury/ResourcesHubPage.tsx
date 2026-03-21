/**
 * RESOURCES HUB PAGE
 * Categorized index of all content pages: Company, Portals, Guides, Locations.
 * Editorial card-grid layout, visually distinct from the blog.
 * Route: /resources
 */

import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, BookOpen, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts, brand } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";

/* ─── Page Data ─── */
interface PageItem {
  slug: string;
  title: string;
  excerpt: string;
  status: "live" | "soon";
}

interface CategorySection {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  pages: PageItem[];
}

const CATEGORIES: CategorySection[] = [
  {
    id: "company",
    label: "Company",
    title: "About Us",
    description: "Learn more about who we are, our team, and career opportunities.",
    icon: Building2,
    accentColor: palette.accent,
    pages: [
      { slug: "about-us", title: "About Us", excerpt: "Our story, values, and commitment to luxury real estate.", status: "live" },
      { slug: "work-with-us", title: "Work With Us", excerpt: "Join our team of international real estate professionals.", status: "soon" },
      { slug: "our-offices", title: "Our Offices", excerpt: "Visit us in Marbella, Ibiza, Jávea and more.", status: "soon" },
      { slug: "privacy-policy", title: "Privacy Policy", excerpt: "How we protect your data and respect your privacy.", status: "soon" },
    ],
  },
  {
    id: "portals",
    label: "Portals",
    title: "Real Estate Portals",
    description: "Find our listings on the most prestigious international property platforms.",
    icon: Globe,
    accentColor: "#4A7C6F",
    pages: [
      { slug: "idealista", title: "Idealista", excerpt: "Spain's leading real estate portal with millions of monthly visitors.", status: "soon" },
      { slug: "fotocasa", title: "Fotocasa", excerpt: "One of the most popular property search platforms in Spain.", status: "soon" },
      { slug: "thinkspain", title: "ThinkSpain", excerpt: "The UK's top portal for Spanish property seekers.", status: "soon" },
      { slug: "kyero", title: "Kyero", excerpt: "Connecting international buyers with Spanish properties since 2003.", status: "soon" },
      { slug: "rightmove", title: "Rightmove Overseas", excerpt: "The UK's number one property portal, now with overseas listings.", status: "soon" },
      { slug: "jamesedition", title: "JamesEdition", excerpt: "The world's largest luxury marketplace for premium properties.", status: "soon" },
      { slug: "green-acres", title: "Green Acres", excerpt: "Specialist portal for European property, popular in France and UK.", status: "soon" },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    title: "Buyer Guides & Resources",
    description: "Expert guides to help you navigate the Spanish property market with confidence.",
    icon: BookOpen,
    accentColor: "#6B5B8D",
    pages: [
      { slug: "golden-visa", title: "Golden Visa Spain", excerpt: "Everything you need to know about Spain's residency-by-investment programme.", status: "soon" },
      { slug: "buyers-guide-for-valencian-community", title: "Buyer's Guide — Valencia", excerpt: "A complete guide to purchasing property in the Valencian Community.", status: "soon" },
      { slug: "buyers-guide-for-balearic-islands", title: "Buyer's Guide — Balearics", excerpt: "Navigate the property market in Ibiza, Mallorca, and Menorca.", status: "soon" },
      { slug: "real-estate-glossary", title: "Real Estate Glossary", excerpt: "Key terms and definitions for international property buyers.", status: "soon" },
    ],
  },
  {
    id: "locations",
    label: "Locations",
    title: "Featured Locations",
    description: "Discover the most sought-after areas across the Mediterranean coast and islands.",
    icon: MapPin,
    accentColor: "#B8763E",
    pages: [
      { slug: "altea-hills", title: "Altea Hills", excerpt: "Exclusive hillside community with panoramic sea views on the Costa Blanca.", status: "soon" },
      { slug: "cala-tarida", title: "Cala Tarida", excerpt: "Stunning sunset beach on Ibiza's west coast.", status: "soon" },
      { slug: "cala-vadella", title: "Cala Vadella", excerpt: "A sheltered bay surrounded by pine-clad hills in southwest Ibiza.", status: "soon" },
      { slug: "cala-salada", title: "Cala Salada", excerpt: "One of Ibiza's most beautiful and unspoiled coves.", status: "soon" },
      { slug: "arenal-beach-javea", title: "Arenal Beach, Jávea", excerpt: "The vibrant heart of Jávea's coastal social scene.", status: "soon" },
      { slug: "cala-comte", title: "Cala Comte", excerpt: "Crystal-clear waters and legendary sunsets in western Ibiza.", status: "soon" },
      { slug: "roca-llisa", title: "Roca Llisa", excerpt: "Prestigious gated community near Ibiza's best golf course.", status: "soon" },
      { slug: "cala-saladeta", title: "Cala Saladeta", excerpt: "A hidden gem nestled beside Cala Salada with turquoise waters.", status: "soon" },
      { slug: "cala-granadella", title: "Cala Granadella", excerpt: "Award-winning beach tucked between dramatic cliffs near Jávea.", status: "soon" },
    ],
  },
];

/* ─── Category Nav Pill ─── */
const CategoryPill = ({
  label,
  icon: Icon,
  active,
  color,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  active: boolean;
  color: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] tracking-[0.05em] uppercase transition-all duration-300"
    style={{
      background: active ? color : "transparent",
      color: active ? palette.white : palette.textMuted,
      border: `1px solid ${active ? color : palette.border}`,
      fontFamily: fonts.body,
      fontWeight: active ? 600 : 400,
    }}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

/* ─── Page Card ─── */
const PageCard = ({
  page,
  accentColor,
}: {
  page: PageItem;
  accentColor: string;
}) => (
  <Link
    to={page.status === "live" ? `/page2/${page.slug}` : "#"}
    className="group block rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5"
    style={{
      background: palette.white,
      border: `1px solid ${palette.border}`,
      opacity: page.status === "soon" ? 0.65 : 1,
      pointerEvents: page.status === "soon" ? "none" : "auto",
    }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3
            className="text-[16px] font-semibold tracking-tight group-hover:opacity-80 transition-opacity"
            style={{ color: palette.text, fontFamily: fonts.heading }}
          >
            {page.title}
          </h3>
          {page.status === "soon" && (
            <span
              className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
              style={{ background: palette.bgAlt, color: palette.textLight }}
            >
              Soon
            </span>
          )}
        </div>
        <p className="text-[13px] leading-[1.6]" style={{ color: palette.textMuted }}>
          {page.excerpt}
        </p>
      </div>
      {page.status === "live" && (
        <ArrowRight
          className="w-4 h-4 mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1"
          style={{ color: accentColor }}
        />
      )}
    </div>
  </Link>
);

/* ─── Main Component ─── */
import { useState } from "react";

const ResourcesHubPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = activeCategory
    ? CATEGORIES.filter((c) => c.id === activeCategory)
    : CATEGORIES;

  return (
    <Layout>
      <SEOHead
        title={`Resources & Guides — ${brand.name}`}
        description="Explore our company pages, buyer guides, featured locations, and real estate portal listings."
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: palette.text }}>
        <img
          src={heroImg}
          alt="Resources"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-4"
            style={{ color: palette.accent }}
          >
            Knowledge Centre
          </p>
          <h1
            className="text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-4"
            style={{ color: palette.white, fontFamily: fonts.heading }}
          >
            Resources & Guides
          </h1>
          <p
            className="text-[15px] sm:text-[16px] max-w-xl mx-auto leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Everything you need to navigate luxury real estate — from buyer guides and location profiles to our company and partner portals.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 -mt-6 relative z-20">
        <div
          className="flex flex-wrap items-center gap-2 p-3 rounded-sm shadow-lg"
          style={{ background: palette.white, border: `1px solid ${palette.border}` }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="px-5 py-2.5 rounded-full text-[13px] tracking-[0.05em] uppercase transition-all duration-300"
            style={{
              background: !activeCategory ? palette.text : "transparent",
              color: !activeCategory ? palette.white : palette.textMuted,
              border: `1px solid ${!activeCategory ? palette.text : palette.border}`,
              fontFamily: fonts.body,
              fontWeight: !activeCategory ? 600 : 400,
            }}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              active={activeCategory === cat.id}
              color={cat.accentColor}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-16">
        {visibleCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: cat.accentColor + "18" }}
                >
                  <Icon className="w-4 h-4" style={{ color: cat.accentColor }} />
                </div>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: cat.accentColor }}
                >
                  {cat.label}
                </p>
              </div>
              <h2
                className="text-[24px] sm:text-[28px] font-bold tracking-tight mb-2"
                style={{ color: palette.text, fontFamily: fonts.heading }}
              >
                {cat.title}
              </h2>
              <p className="text-[14px] mb-8 max-w-2xl" style={{ color: palette.textMuted }}>
                {cat.description}
              </p>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.pages.map((page) => (
                  <PageCard key={page.slug} page={page} accentColor={cat.accentColor} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Stats ribbon */}
      <div
        className="py-12"
        style={{ background: palette.bg, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "24", label: "Content Pages" },
            { value: "9", label: "Locations" },
            { value: "7", label: "Partner Portals" },
            { value: "4", label: "Buyer Guides" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[32px] font-bold" style={{ color: palette.accent, fontFamily: fonts.heading }}>
                {stat.value}
              </p>
              <p className="text-[12px] tracking-[0.1em] uppercase" style={{ color: palette.textMuted }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesHubPage;
