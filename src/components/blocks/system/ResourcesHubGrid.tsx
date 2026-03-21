/**
 * RESOURCES HUB GRID
 * Categorized index of content pages grouped by type (Company, Portals, Guides, Locations).
 * Features: sticky tab filter, inline search, thumbnail cards, stats ribbon.
 * Distinct from blog — editorial card layout with category sections.
 * Origin: ResourcesHubPage
 * Route: /resources
 *
 * Props:
 * - heroTitle: main heading text
 * - heroSubtitle: supporting paragraph
 * - heroLabel: small uppercase label above title
 * - heroImage: background image URL
 * - categories: array of { id, label, title, description, icon, pages[] }
 * - stats: array of { value, label } for the stats ribbon
 * - linkPrefix: URL prefix for page cards (default "/page2/")
 * - liveSlugs: Set of slugs that have real content (others render as non-clickable)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, BookOpen, MapPin, Search, X } from "lucide-react";
import { palette, fonts } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";

/* ─── Thumbnail helper ─── */
const thumb = (slug: string, idx: number) =>
  `https://images.unsplash.com/photo-${[
    "1600596542815-ffad4c1539a9",
    "1600585154340-be6161a56a0c",
    "1512917774080-9991f1c4c750",
    "1564013799919-ab600027ffc6",
    "1582407947304-fd86f028f716",
    "1506905925346-21bda4d32df4",
    "1580587771525-78b9dba3b914",
    "1613490493805-039cce1659ea",
    "1523217553820-cf6de6ce5837",
    "1502672260266-1c1ef2d93688",
    "1560448204771-d5bebb9e4836",
    "1599809275671-b5942cabc7a2",
  ][idx % 12]}?w=400&h=300&fit=crop&auto=format`;

/* ─── Types ─── */
interface PageItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

interface CategorySection {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  pages: PageItem[];
}

interface StatItem {
  value: string;
  label: string;
}

/* ─── Default demo data ─── */
let imgIdx = 0;
const p = (slug: string, title: string, excerpt: string): PageItem => ({
  slug, title, excerpt, image: thumb(slug, imgIdx++),
});

const DEMO_CATEGORIES: CategorySection[] = [
  {
    id: "company", label: "Company", title: "About Us",
    description: "Learn more about who we are, our team, and career opportunities.",
    icon: Building2,
    pages: [
      p("about-us", "About Us", "Our story, values, and commitment to luxury real estate."),
      p("work-with-us", "Work With Us", "Join our team of international real estate professionals."),
      p("our-offices", "Our Offices", "Visit us in Marbella, Ibiza, Jávea and more."),
      p("privacy-policy", "Privacy Policy", "How we protect your data and respect your privacy."),
    ],
  },
  {
    id: "portals", label: "Portals", title: "Real Estate Portals",
    description: "Find our listings on the most prestigious international property platforms.",
    icon: Globe,
    pages: [
      p("idealista", "Idealista", "Spain's leading real estate portal."),
      p("fotocasa", "Fotocasa", "One of the most popular property platforms in Spain."),
      p("kyero", "Kyero", "Connecting international buyers with Spanish properties."),
      p("rightmove", "Rightmove Overseas", "The UK's number one property portal."),
    ],
  },
  {
    id: "guides", label: "Guides", title: "Buyer Guides & Resources",
    description: "Expert guides to help you navigate the Spanish property market.",
    icon: BookOpen,
    pages: [
      p("golden-visa", "Golden Visa Spain", "Spain's residency-by-investment programme."),
      p("buyers-guide-valencia", "Buyer's Guide — Valencia", "A complete guide for the Valencian Community."),
    ],
  },
  {
    id: "locations", label: "Locations", title: "Featured Locations",
    description: "Discover the most sought-after areas across the Mediterranean.",
    icon: MapPin,
    pages: [
      p("altea-hills", "Altea Hills", "Exclusive hillside community on the Costa Blanca."),
      p("cala-comte", "Cala Comte", "Crystal-clear waters and legendary sunsets."),
      p("cala-granadella", "Cala Granadella", "Award-winning beach near Jávea."),
    ],
  },
];

const DEMO_STATS: StatItem[] = [
  { value: "24", label: "Content Pages" },
  { value: "9", label: "Locations" },
  { value: "7", label: "Partner Portals" },
  { value: "4", label: "Buyer Guides" },
];

const DEMO_LIVE = new Set(["about-us", "about", "terms", "privacy", "services"]);

/* ─── Props ─── */
interface ResourcesHubGridProps {
  heroTitle?: string;
  heroSubtitle?: string;
  heroLabel?: string;
  heroImage?: string;
  categories?: CategorySection[];
  stats?: StatItem[];
  linkPrefix?: string;
  liveSlugs?: Set<string>;
}

/* ─── Page Card ─── */
const PageCard = ({
  page,
  linkPrefix,
  liveSlugs,
}: {
  page: PageItem;
  linkPrefix: string;
  liveSlugs: Set<string>;
}) => {
  const hasPage = liveSlugs.has(page.slug);
  const Wrapper = hasPage ? Link : "div";
  const linkProps = hasPage ? { to: `${linkPrefix}${page.slug}` } : {};

  return (
    <Wrapper
      {...(linkProps as any)}
      className="group flex gap-4 rounded-sm p-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
      style={{ background: palette.white, border: `1px solid ${palette.border}` }}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-[72px] flex-shrink-0 rounded-sm overflow-hidden">
        <img src={page.image} alt={page.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[15px] font-semibold tracking-tight mb-1 group-hover:opacity-75 transition-opacity truncate" style={{ color: palette.text, fontFamily: fonts.heading }}>
          {page.title}
        </h3>
        <p className="text-[12px] leading-[1.5] line-clamp-2" style={{ color: palette.textMuted }}>{page.excerpt}</p>
      </div>
      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: palette.accent }} />
    </Wrapper>
  );
};

/* ─── Main Block ─── */
const ResourcesHubGrid = ({
  heroTitle = "Resources & Guides",
  heroSubtitle = "Everything you need to navigate luxury real estate — from buyer guides and location profiles to our company and partner portals.",
  heroLabel = "Knowledge Centre",
  heroImage = heroImg,
  categories = DEMO_CATEGORIES,
  stats = DEMO_STATS,
  linkPrefix = "/page2/",
  liveSlugs = DEMO_LIVE,
}: ResourcesHubGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.toLowerCase().trim();

  const visibleCategories = categories
    .filter((c) => !activeCategory || c.id === activeCategory)
    .map((c) => ({
      ...c,
      pages: query
        ? c.pages.filter((pg) => pg.title.toLowerCase().includes(query) || pg.excerpt.toLowerCase().includes(query))
        : c.pages,
    }))
    .filter((c) => c.pages.length > 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: palette.text }}>
        <img src={heroImage} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: palette.accent }}>{heroLabel}</p>
          <h1 className="text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-tight leading-[1.05] mb-4" style={{ color: palette.white, fontFamily: fonts.heading }}>
            {heroTitle}
          </h1>
          <p className="text-[15px] sm:text-[16px] max-w-xl mx-auto leading-[1.7]" style={{ color: "rgba(255,255,255,0.65)" }}>{heroSubtitle}</p>
        </div>
      </section>

      {/* Category Tabs */}
      <nav className="sticky top-0 z-30" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {[{ id: null, label: "All" }, ...categories.map((c) => ({ id: c.id, label: c.label }))].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id ?? "all"}
                onClick={() => setActiveCategory(tab.id)}
                className="relative px-4 py-4 text-[13px] tracking-[0.04em] uppercase whitespace-nowrap transition-colors"
                style={{ color: isActive ? palette.accent : palette.textMuted, fontFamily: fonts.body, fontWeight: isActive ? 600 : 400 }}
              >
                {tab.label}
                {isActive && <span className="absolute bottom-0 left-4 right-4 h-[2px]" style={{ background: palette.accent }} />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: palette.textLight }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages, guides, locations…"
            className="w-full pl-11 pr-10 py-3 text-[14px] rounded-sm outline-none transition-colors"
            style={{ background: palette.white, border: `1px solid ${palette.border}`, color: palette.text, fontFamily: fonts.body }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4" style={{ color: palette.textLight }} />
            </button>
          )}
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-16">
        {visibleCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: palette.accent + "18" }}>
                  <Icon className="w-4 h-4" style={{ color: palette.accent }} />
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: palette.accent }}>{cat.label}</p>
              </div>
              <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight mb-2" style={{ color: palette.text, fontFamily: fonts.heading }}>{cat.title}</h2>
              <p className="text-[14px] mb-8 max-w-2xl" style={{ color: palette.textMuted }}>{cat.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.pages.map((page) => (
                  <PageCard key={page.slug} page={page} linkPrefix={linkPrefix} liveSlugs={liveSlugs} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Stats Ribbon */}
      {stats.length > 0 && (
        <div className="py-12" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[32px] font-bold" style={{ color: palette.accent, fontFamily: fonts.heading }}>{stat.value}</p>
                <p className="text-[12px] tracking-[0.1em] uppercase" style={{ color: palette.textMuted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesHubGrid;
