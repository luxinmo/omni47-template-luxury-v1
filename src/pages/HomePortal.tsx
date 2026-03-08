import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Twitter, ArrowRight } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";

import portalHero from "@/assets/portal-hero.jpg";
import destIbiza from "@/assets/dest-ibiza.jpg";
import destMallorca from "@/assets/dest-mallorca.jpg";
import destMarbella from "@/assets/dest-marbella.jpg";
import destCostaBlanca from "@/assets/dest-costa-blanca.jpg";
import destBarcelona from "@/assets/dest-barcelona.jpg";
import destMadrid from "@/assets/dest-madrid.jpg";
import propVillaIbiza from "@/assets/prop-villa-ibiza.jpg";
import propPenthouseMarbella from "@/assets/prop-penthouse-marbella.jpg";
import propEstateMallorca from "@/assets/prop-estate-mallorca.jpg";
import investHotel from "@/assets/invest-hotel.jpg";
import investDevelopment from "@/assets/invest-development.jpg";
import magazineMain from "@/assets/magazine-main.jpg";
import catBeachfront from "@/assets/cat-beachfront.jpg";
import catGolf from "@/assets/cat-golf.jpg";
import catLuxuryVillas from "@/assets/cat-luxury-villas.jpg";
import catSpa from "@/assets/cat-spa.jpg";
import catFincas from "@/assets/cat-fincas.jpg";
import catOffmarket from "@/assets/cat-offmarket.jpg";

/* ─── Data ─── */
const COLLECTIONS = [
  { name: "Primera línea del mar", img: catBeachfront },
  { name: "Cerca del golf", img: catGolf },
  { name: "Luxury Villas +3M", img: catLuxuryVillas },
  { name: "With SPA", img: catSpa },
  { name: "Fincas", img: catFincas },
  { name: "Off-Market", img: catOffmarket },
];
const DESTINATIONS = [
  { name: "Ibiza", img: destIbiza, count: 124 },
  { name: "Mallorca", img: destMallorca, count: 208 },
  { name: "Marbella", img: destMarbella, count: 176 },
  { name: "Costa Blanca", img: destCostaBlanca, count: 95 },
  { name: "Barcelona", img: destBarcelona, count: 142 },
  { name: "Madrid", img: destMadrid, count: 163 },
];

const PROPERTIES = [
  { title: "Modern Sea View Villa", location: "Ibiza", price: "€3,200,000", img: propVillaIbiza },
  { title: "Luxury Penthouse", location: "Marbella", price: "€2,850,000", img: propPenthouseMarbella },
  { title: "Private Estate", location: "Mallorca", price: "€5,400,000", img: propEstateMallorca },
];

const INVESTMENTS = [
  { title: "Investment Properties", desc: "High-yield luxury assets in prime locations.", img: propVillaIbiza },
  { title: "Boutique Hotels", desc: "Exclusive hotel opportunities across the Mediterranean.", img: investHotel },
  { title: "Off-Market Deals", desc: "Discreet access to properties not publicly listed.", img: destMarbella },
  { title: "Development Projects", desc: "New-build projects with strong capital growth potential.", img: investDevelopment },
];

const MAGAZINE_ARTICLES = [
  { title: "Luxury Real Estate Market Trends for 2026", category: "Market Insight", date: "Mar 2026", img: magazineMain, large: true },
  { title: "Best Destinations for High-End Property Investment", category: "Investment", date: "Feb 2026", img: destBarcelona },
  { title: "Architectural Trends in Luxury Villas", category: "Architecture", date: "Jan 2026", img: propPenthouseMarbella },
  { title: "The Rise of Sustainable Luxury Living", category: "Lifestyle", date: "Dec 2025", img: destMallorca },
];

const NAV_ITEMS = ["Properties", "Destinations", "Investments", "Off-Market", "Magazine", "About"];

const FOOTER_COLS = [
  { title: "Properties", links: ["For Sale", "For Rent", "New Developments", "Off-Market"] },
  { title: "Destinations", links: ["Ibiza", "Mallorca", "Marbella", "Barcelona", "Madrid"] },
  { title: "Investments", links: ["Investment Properties", "Boutique Hotels", "Development Projects"] },
  { title: "Magazine", links: ["Market Trends", "Architecture", "Lifestyle", "Investment Guides"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
];

/* ─── Component ─── */
const HomePortal = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Jost', sans-serif" }}>
      <SEOHead
        title="LuxuryWorldPortal — Global Marketplace for Exceptional Real Estate"
        description="Discover luxury properties, investment opportunities and exclusive real estate in the world's most prestigious destinations."
      />

      {/* ══════ NAVBAR ══════ */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-16 h-[72px]">
          <Link to="/portal" className="text-white text-[20px] tracking-[0.35em] font-light">
            LUXURYWORLDPORTAL
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className="text-[12px] tracking-[0.14em] uppercase font-light text-white/80 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="lg:hidden text-white" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        {mobileNav && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-100">
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button key={item} className="text-left text-[14px] tracking-[0.06em] font-light py-3 text-neutral-700 border-b border-neutral-100" onClick={() => setMobileNav(false)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img src={portalHero} alt="Luxury Mediterranean villa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-24 px-6 lg:px-16 max-w-[1440px] mx-auto">
          <h1 className="text-white text-[11px] tracking-[0.5em] uppercase font-light mb-4 opacity-70">
            Global Marketplace for Exceptional Real Estate
          </h1>
          <p className="text-white text-[36px] sm:text-[52px] lg:text-[64px] font-light leading-[1.1] tracking-[0.02em] max-w-[700px] mb-6">
            LuxuryWorld<br />Portal
          </p>
          <p className="text-white/70 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-[520px] mb-10">
            Discover luxury properties, investment opportunities and exclusive real estate in the world's most prestigious destinations.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3.5 bg-white text-neutral-900 text-[12px] tracking-[0.16em] uppercase font-medium hover:bg-neutral-100 transition-colors">
              Explore Properties
            </button>
            <button className="px-8 py-3.5 border border-white/40 text-white text-[12px] tracking-[0.16em] uppercase font-light hover:bg-white/10 transition-colors">
              View Destinations
            </button>
          </div>
        </div>
      </section>

      {/* ══════ DESTINATIONS ══════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-2">Explore</p>
            <h2 className="text-[28px] sm:text-[36px] font-light tracking-[0.02em] text-neutral-900">Featured Destinations</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors font-light">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {DESTINATIONS.map((d) => (
            <div key={d.name} className="group relative aspect-[4/5] overflow-hidden cursor-pointer">
              <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <h3 className="text-white text-[18px] sm:text-[22px] font-light tracking-[0.04em]">{d.name}</h3>
                <p className="text-white/60 text-[12px] tracking-[0.1em] font-light mt-1">{d.count} properties</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ DIVIDER ══════ */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16"><div className="border-t border-neutral-100" /></div>

      {/* ══════ FEATURED PROPERTIES ══════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-2">Curated Selection</p>
            <h2 className="text-[28px] sm:text-[36px] font-light tracking-[0.02em] text-neutral-900">Featured Properties</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors font-light">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROPERTIES.map((p) => (
            <div key={p.title} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light mb-1.5">{p.location}</p>
              <h3 className="text-[18px] sm:text-[20px] font-light text-neutral-900 tracking-[0.01em] mb-2 group-hover:text-neutral-600 transition-colors">{p.title}</h3>
              <p className="text-[15px] font-light text-neutral-500">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ DIVIDER ══════ */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16"><div className="border-t border-neutral-100" /></div>

      {/* ══════ INVESTMENT OPPORTUNITIES ══════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-28">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-2">Opportunities</p>
          <h2 className="text-[28px] sm:text-[36px] font-light tracking-[0.02em] text-neutral-900">Investment Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INVESTMENTS.map((inv) => (
            <div key={inv.title} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-5">
                <img src={inv.img} alt={inv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-light text-neutral-900 tracking-[0.01em] mb-2 group-hover:text-neutral-600 transition-colors">{inv.title}</h3>
              <p className="text-[13px] font-light text-neutral-400 leading-relaxed">{inv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ DIVIDER ══════ */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16"><div className="border-t border-neutral-100" /></div>

      {/* ══════ MAGAZINE ══════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-2">Editorial</p>
            <h2 className="text-[28px] sm:text-[36px] font-light tracking-[0.02em] text-neutral-900">The Magazine</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors font-light">
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large article */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden mb-5">
              <img src={MAGAZINE_ARTICLES[0].img} alt={MAGAZINE_ARTICLES[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light">{MAGAZINE_ARTICLES[0].category}</span>
              <span className="text-neutral-200">·</span>
              <span className="text-[11px] tracking-[0.1em] text-neutral-300 font-light">{MAGAZINE_ARTICLES[0].date}</span>
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-light text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">{MAGAZINE_ARTICLES[0].title}</h3>
          </div>
          {/* Small articles */}
          <div className="flex flex-col gap-8">
            {MAGAZINE_ARTICLES.slice(1).map((a) => (
              <div key={a.title} className="group cursor-pointer flex gap-5">
                <div className="w-[140px] sm:w-[180px] flex-shrink-0 aspect-[4/3] overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light">{a.category}</span>
                    <span className="text-neutral-200">·</span>
                    <span className="text-[10px] tracking-[0.1em] text-neutral-300 font-light">{a.date}</span>
                  </div>
                  <h3 className="text-[15px] sm:text-[17px] font-light text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">{a.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ NEWSLETTER ══════ */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 sm:py-24">
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">Newsletter</p>
            <h2 className="text-[24px] sm:text-[30px] font-light text-neutral-900 mb-4">Stay Informed</h2>
            <p className="text-[14px] font-light text-neutral-400 leading-relaxed mb-8">
              Stay informed about global luxury real estate opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 border border-neutral-200 text-[13px] font-light placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
              />
              <button className="px-8 py-3.5 bg-neutral-900 text-white text-[12px] tracking-[0.14em] uppercase font-medium hover:bg-neutral-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] tracking-[0.25em] uppercase font-medium text-neutral-400 mb-4">{col.title}</p>
                {col.links.map((link) => (
                  <button key={link} className="block text-[13px] font-light text-neutral-500 hover:text-neutral-900 transition-colors py-1">
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-100">
            <span className="text-[13px] tracking-[0.3em] font-light text-neutral-400">LUXURYWORLDPORTAL</span>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-9 h-9 flex items-center justify-center border border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-400 transition-colors">
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-neutral-300 font-light">© {new Date().getFullYear()} LuxuryWorldPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePortal;
