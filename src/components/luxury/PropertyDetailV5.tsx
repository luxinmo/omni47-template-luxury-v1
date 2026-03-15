import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Car, Fence, Phone, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Grid3X3, TrendingUp, Zap,
  ArrowRight, MessageCircle, Send,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { brand, navLeft, navRight, languages, currencies, areaUnits } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
import LuxuryPhoneInput from "./LuxuryPhoneInput";
import LuxuryMortgageCalculator from "./LuxuryMortgageCalculator";
import LuxuryNearbyPlaces from "./LuxuryNearbyPlaces";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

/* ─── Data ─── */
const PROPERTY = {
  title: "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  subtitle: "Contemporary villa with panoramic Mediterranean sea views",
  breadcrumb: ["Home", "Ibiza", "Santa Eulalia del Río", "Luxury Villa"],
  breadcrumbLinks: ["/", "/properties?location=ibiza", "/properties?location=santa-eulalia", ""],
  location: "Santa Eulalia del Río, Ibiza",
  region: "Balearic Islands, Spain",
  price: 4650000,
  priceFormatted: "€4,650,000",
  originalPrice: "€5,200,000",
  discount: 11,
  pricePerSqm: "€11,071/m²",
  rentalPrice: "€18,500/mes",
  alsoForRent: true,
  beds: 5, baths: 4, sqm: 420, plot: 1200, garage: 2, year: 2023,
  ref: "PE-IBZ-2847",
  energyClass: "A",
  status: "Available",
  tag: "FOR SALE",
  style: "Contemporary",
  hasVideo: true,
  hasVirtualTour: true,
  videoUrl: "#",
  virtualTourUrl: "#",
  images: [heroImg, detail1, detail2, detail3, prop1, prop2, prop3],
  description: `This exceptional luxury villa for sale in Santa Eulalia del Río, Ibiza, is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, this contemporary Ibiza villa seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.

The ground floor features a grand open-plan living area with floor-to-ceiling windows that frame the stunning Mediterranean views, a designer kitchen with Gaggenau appliances, and direct access to the infinity pool terrace. The master suite occupies a private wing with a spa-inspired bathroom, walk-in dressing room, and a private terrace overlooking the sea.

Upstairs, four additional en-suite bedrooms each enjoy their own terrace and sea views. The lower level houses a home cinema, wine cellar, gym, and staff quarters. Surrounded by mature Mediterranean gardens with automated irrigation, this luxury villa in Ibiza includes a double garage, solar panels, and state-of-the-art home automation.

Located in the sought-after area of Santa Eulalia del Río, this property offers easy access to pristine beaches, world-class restaurants, international schools, and Ibiza Town — making it an ideal primary residence or investment property in one of the Mediterranean's most exclusive destinations.`,
  highlights: [
    "Panoramic sea views over the Mediterranean and Formentera",
    "Infinity pool with sunset terrace",
    "Floor-to-ceiling windows throughout",
    "Contemporary architecture by award-winning studio",
    "Prime Santa Eulalia location, close to beaches and amenities",
    "Smart home automation and solar panels",
  ],
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
    "Air Conditioning", "Alarm System", "Double Garage", "Garden",
    "Terrace", "Staff Quarters", "Elevator", "Laundry Room",
  ],
  agency: {
    name: brand.fullName,
    phone: "+34 600 123 456",
    whatsapp: "34600123456",
    email: "info@prestigeestates.com",
  },
  lat: 38.9848,
  lng: 1.5326,
};

const SIMILAR = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, tag: "FOR SALE", href: "/property5/3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, tag: "FOR SALE", href: "/property5/3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, tag: "FOR SALE", href: "/property5/3003" },
];

const MARKET_DATA = [
  { label: "Average Villa Price", value: "€3,800,000", trend: "+12% YoY" },
  { label: "Price per m²", value: "€8,500/m²", trend: "+8% YoY" },
  { label: "Demand Index", value: "Very High", trend: "Rising" },
  { label: "Avg. Days on Market", value: "45 days", trend: "-15% YoY" },
];

const INTERNAL_LINKS = [
  { label: "Luxury Villas in Ibiza", href: "/properties?type=villa&location=ibiza" },
  { label: "Apartments in Ibiza", href: "/properties?type=apartment&location=ibiza" },
  { label: "New Developments Ibiza", href: "/properties?type=new-development&location=ibiza" },
  { label: "Properties in Santa Eulalia", href: "/properties?location=santa-eulalia" },
  { label: "Beachfront Properties Ibiza", href: "/properties?feature=beachfront&location=ibiza" },
  { label: "Properties with Sea Views", href: "/properties?feature=sea-views&location=ibiza" },
];

const NEARBY_AREAS = [
  { label: "Properties in Ibiza", href: "/properties?location=ibiza", count: 124 },
  { label: "Villas in Ibiza", href: "/properties?type=villa&location=ibiza", count: 67 },
  { label: "Properties in Santa Eulalia", href: "/properties?location=santa-eulalia", count: 38 },
  { label: "Luxury Villas Ibiza", href: "/properties?type=villa&location=ibiza&luxury=true", count: 29 },
];

/* ─── JSON-LD ─── */
const generateJsonLd = () => {
  const p = PROPERTY;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "RealEstateListing", name: p.title, description: p.subtitle, url: `https://luxinmo.com/property/${p.ref}`, datePosted: "2024-12-01", image: p.images, offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", seller: { "@type": "RealEstateAgent", name: brand.fullName } } },
    { "@type": "Residence", name: p.title, floorSize: { "@type": "QuantitativeValue", value: p.sqm, unitCode: "MTK" }, numberOfBedrooms: p.beds, numberOfBathroomsTotal: p.baths, yearBuilt: p.year, address: { "@type": "PostalAddress", addressLocality: "Santa Eulalia del Río", addressRegion: "Ibiza", addressCountry: "ES" }, geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } },
    { "@type": "BreadcrumbList", itemListElement: p.breadcrumb.map((name, i) => ({ "@type": "ListItem", position: i + 1, name, item: i < p.breadcrumb.length - 1 ? `https://luxinmo.com${p.breadcrumbLinks[i]}` : undefined })) },
  ]};
};

/* ─── Component ─── */
const PropertyDetailV5 = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [expandDesc, setExpandDesc] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySent, setEnquirySent] = useState<"idle" | "thanks" | "suggestions">("idle");
  const [wantVisit, setWantVisit] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [currentCurrency, setCurrentCurrency] = useState("EUR");
  const [currentUnit, setCurrentUnit] = useState("m2");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [gridView, setGridView] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([{ role: "bot", text: "Hello! How can I help you with this property?" }]);
  const [chatInput, setChatInput] = useState("");
  const isMobile = useIsMobile();
  const p = PROPERTY;

  const lbTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleLbTouchStart = useCallback((e: React.TouchEvent) => { lbTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, []);
  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => { if (!lbTouchStart.current) return; const dx = e.changedTouches[0].clientX - lbTouchStart.current.x; if (Math.abs(dx) > 50) { dx < 0 ? setLightbox(prev => prev !== null ? Math.min(prev + 1, p.images.length) : null) : setLightbox(prev => prev !== null ? Math.max(prev - 1, 0) : null); } lbTouchStart.current = null; }, [p.images.length]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => { if (!touchStart.current) return; const dx = e.changedTouches[0].clientX - touchStart.current.x; if (Math.abs(dx) > 50) { dx < 0 ? setHeroSlide(s => Math.min(s + 1, p.images.length - 1)) : setHeroSlide(s => Math.max(s - 1, 0)); } touchStart.current = null; }, [p.images.length]);
  const handleChatSend = () => { if (!chatInput.trim()) return; setChatMessages(prev => [...prev, { role: "user", text: chatInput.trim() }]); setChatInput(""); setTimeout(() => { setChatMessages(prev => [...prev, { role: "bot", text: `Thank you for your interest. An advisor will follow up shortly.` }]); }, 1000); };

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans">
      <SEOHead title={p.title} description={`${p.title} — ${p.beds} bedrooms, ${p.baths} bathrooms, ${p.sqm} m² built. ${p.priceFormatted}.`} type="article" image={heroImg} jsonLd={generateJsonLd()} canonical={`https://luxinmo.com/property/${p.ref}`} />

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10 h-[60px] md:h-[68px]">
          <div className="flex items-center gap-6 lg:gap-10 flex-1">
            <button className="lg:hidden text-luxury-black/70" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-6 h-6" /></button>
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/50 hover:text-luxury-black transition-colors"><img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" /><span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span></button>
              {navLeft.map(l => <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>)}
            </div>
          </div>
          <Link to="/" className="flex flex-col items-center shrink-0"><span className="text-base md:text-lg lg:text-xl tracking-[0.3em] font-light">{brand.fullName}</span><span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-light text-luxury-black/40">{brand.subtitle}</span></Link>
          <div className="flex items-center justify-end gap-6 lg:gap-10 flex-1"><div className="hidden lg:flex items-center gap-10">{navRight.map(l => <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>)}</div></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-[60px] border-b border-neutral-100 shrink-0"><button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button><Link to="/" className="flex flex-col items-center" onClick={() => setMobileMenuOpen(false)}><span className="text-base tracking-[0.3em] font-light">{brand.fullName}</span></Link><div className="w-6" /></div>
          <div className="flex-1 flex flex-col justify-center px-10">{[...navLeft, ...navRight].map(item => <Link key={item.label} to={item.href} className="text-[18px] tracking-[0.15em] uppercase font-light py-4 text-luxury-black/80 border-b border-neutral-100 text-center" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>)}</div>
          <div className="px-10 py-6 border-t border-neutral-100 shrink-0"><p className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/40 font-medium mb-3 text-center">Language</p><div className="flex flex-wrap justify-center gap-2">{languages.map(lang => <button key={lang.code} onClick={() => setCurrentLang(lang.code)} className={`flex items-center gap-1.5 px-3 py-2 text-[12px] rounded-sm border ${currentLang === lang.code ? "border-luxury-black/30 bg-neutral-50 font-medium" : "border-neutral-200 font-light text-luxury-black/55"}`}><img src={`https://flagcdn.com/20x15/${lang.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />{lang.code}</button>)}</div></div>
          <div className="px-10 pb-4 shrink-0"><p className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/40 font-medium mb-3 text-center">Currency</p><div className="flex flex-wrap justify-center gap-2">{currencies.map(c => <button key={c.code} onClick={() => setCurrentCurrency(c.code)} className={`px-3 py-2 text-[12px] rounded-sm border ${currentCurrency === c.code ? "border-luxury-black/30 bg-neutral-50 font-medium" : "border-neutral-200 font-light text-luxury-black/55"}`}>{c.label}</button>)}</div></div>
          <div className="px-10 pb-8 shrink-0"><a href={`tel:${p.agency.phone}`} className="w-full flex items-center justify-center gap-2 bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3.5"><Phone className="w-4 h-4" /> Call Us</a></div>
        </div>
      )}

      {/* ═══ HERO GALLERY ═══ */}
      <section>
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>{p.images.map((img, i) => <div key={i} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]" onClick={() => setLightbox(i)}><img src={img} alt={`Photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" /></div>)}</div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full">{heroSlide + 1} / {p.images.length}</div>
        </div>
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-3.5">{p.hasVideo && <button className="flex items-center gap-1.5 text-[13px] text-luxury-black/70 font-medium"><Play className="w-4 h-4" /> Video</button>}<Link to="/pdf-v2" target="_blank" className="flex items-center gap-1.5 text-[13px] text-luxury-black/70 font-medium"><FileDown className="w-4 h-4" /> PDF</Link></div>
          <div className="flex items-center gap-3.5"><button className="text-luxury-black/50"><Share2 className="w-[18px] h-[18px]" /></button><button onClick={() => setLiked(!liked)} className={liked ? "text-luxury-black" : "text-luxury-black/50"}><Heart className="w-[18px] h-[18px]" fill={liked ? "currentColor" : "none"} /></button></div>
        </div>
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[540px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}><img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /><div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm"><span className="text-[11px] tracking-[0.2em] font-medium uppercase">{brand.name}</span></div></div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(1)}><img src={p.images[1]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(2)}><img src={p.images[2]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute top-3 right-3 flex items-center gap-2"><button onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm"><Share2 className="w-3.5 h-3.5" /> Share</button><button onClick={e => { e.stopPropagation(); setLiked(!liked); }} className={`flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm ${liked ? "bg-luxury-black text-white" : "bg-white/90 backdrop-blur-sm text-luxury-black"}`}><Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} /> Save</button></div></div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(3)}><img src={p.images[3]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute bottom-3 left-3 flex items-center gap-2">{p.hasVideo && <button onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3 py-2 rounded-full shadow-sm"><Play className="w-3.5 h-3.5" /> Video</button>}</div></div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(4)}><img src={p.images[4]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><button onClick={e => { e.stopPropagation(); setGridView(true); }} className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-luxury-black text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md"><Grid3X3 className="w-4 h-4" /> Show all photos</button></div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 lg:py-8" itemScope itemType="https://schema.org/Residence">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5 hidden sm:block">
          <ol className="flex items-center gap-2 text-[13px] text-luxury-black/50 font-light" itemScope itemType="https://schema.org/BreadcrumbList">
            {p.breadcrumb.map((crumb, i) => (<li key={i} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">{i < p.breadcrumb.length - 1 ? <Link to={p.breadcrumbLinks[i]} className="hover:text-luxury-black" itemProp="item"><span itemProp="name">{crumb}</span></Link> : <span className="text-luxury-black/70 font-normal" itemProp="name">{crumb}</span>}<meta itemProp="position" content={String(i + 1)} />{i < p.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3 text-luxury-black/30" />}</li>))}
          </ol>
        </nav>

        {/* Two columns: content + sticky price card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-7">
            {/* Title */}
            <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">{p.location} · {p.region}</p>
            <p className="text-[13px] text-luxury-black/50 font-light mb-2">Detached villa <span className="mx-1 text-luxury-black/25">|</span> <span className="italic">{p.style}</span> <span className="mx-1 text-luxury-black/25">|</span> <span className="font-mono text-luxury-black/40 text-[12px]">REF-{p.ref}</span></p>
            <h1 className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] font-medium text-luxury-black leading-snug tracking-[0.01em] mb-2" itemProp="name">{p.title}</h1>
            <p className="text-[14px] sm:text-[15px] text-luxury-black/55 font-light leading-relaxed">{p.subtitle}</p>

            {/* Inline price mobile */}
            <div className="lg:hidden flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-3 mb-4">
              <p className="text-[26px] sm:text-[30px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
              <span className="text-[13px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
              <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-luxury-gold">-{p.discount}%</span>
              <span className="text-[11px] text-luxury-black/45 font-light">{p.pricePerSqm}</span>
            </div>

            {/* Key facts grid */}
            <section className="mb-8 pb-8 border-b border-neutral-200 mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                {[{ icon: Bed, label: "Bedrooms", value: p.beds }, { icon: Bath, label: "Bathrooms", value: p.baths }, { icon: Maximize, label: "Built Area", value: `${p.sqm} m²` }, { icon: Fence, label: "Plot Size", value: `${p.plot.toLocaleString()} m²` }, { icon: Car, label: "Garage", value: `${p.garage} cars` }, { icon: Zap, label: "Energy", value: p.energyClass }].map((s, i) => (
                  <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-3 sm:p-4 text-center"><s.icon className="w-5 h-5 text-luxury-black/35 mx-auto mb-2" strokeWidth={1.5} /><p className="text-[16px] sm:text-[20px] font-light text-luxury-black mb-0.5">{s.value}</p><p className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-luxury-black/50 font-medium">{s.label}</p></div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 text-[13px] text-luxury-black/50 font-light"><span>Year built: <strong className="font-medium text-luxury-black/70">{p.year}</strong></span><span className="text-luxury-black/20">·</span><span>Status: <strong className="font-medium text-luxury-black/70">{p.status}</strong></span></div>
            </section>

            {/* Highlights */}
            <section className="mb-8 pb-8 border-b border-neutral-200">
              <h2 className="text-[15px] font-medium text-luxury-black mb-4">Property Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">{p.highlights.map((h, i) => <li key={i} className="flex items-start gap-3 text-[14px] text-luxury-black/75 font-light"><Star className="w-4 h-4 text-luxury-gold/70 shrink-0 mt-0.5" strokeWidth={1.5} />{h}</li>)}</ul>
            </section>

            {/* About */}
            <section className="mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-4">About This Property</h2>
              <div className={`text-[14px] leading-[1.9] text-luxury-black/75 font-light whitespace-pre-line ${!expandDesc ? "line-clamp-8" : ""}`} itemProp="description">{p.description}</div>
              <button onClick={() => setExpandDesc(!expandDesc)} className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-luxury-black/60 hover:text-luxury-black font-medium">{expandDesc ? "Show less" : "Read full description"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandDesc ? "rotate-180" : ""}`} /></button>
            </section>

            {/* Features */}
            <section className="border-t border-neutral-200 pt-8 mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">{p.features.map((f, i) => <div key={i} className="flex items-center gap-2 text-[14px] text-luxury-black/70 font-light"><Check className="w-3.5 h-3.5 text-luxury-black/35" strokeWidth={2} />{f}</div>)}</div>
            </section>

            {/* Location */}
            <section className="border-t border-neutral-200 pt-8 mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-3">Location</h2>
              <p className="text-[13px] text-luxury-black/60 font-light mb-4 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-luxury-black/40" /> {p.location}, {p.region}</p>
              <div className="bg-neutral-50 border border-neutral-200 h-[280px] flex items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm"><MapPin className="w-5 h-5 mr-1.5" /> Interactive Map</div>
            </section>

            <LuxuryNearbyPlaces />

            {/* About Area */}
            <section className="border-t border-neutral-200 pt-8 mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-4">About Santa Eulalia del Río</h2>
              <div className="text-[14px] leading-[1.9] text-luxury-black/70 font-light space-y-4">
                <p>Santa Eulalia del Río is one of Ibiza's most sought-after municipalities, renowned for its relaxed Mediterranean lifestyle, pristine beaches, and thriving culinary scene.</p>
                <p>The Ibiza real estate market in Santa Eulalia continues to attract international buyers seeking luxury villas with sea views, contemporary architecture, and proximity to nature.</p>
              </div>
            </section>

            {/* Market Insights */}
            <section className="border-t border-neutral-200 pt-8 mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Real Estate Market in Santa Eulalia</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">{MARKET_DATA.map((d, i) => <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-3 sm:p-4"><p className="text-[11px] tracking-[0.12em] uppercase text-luxury-black/50 font-medium mb-1">{d.label}</p><p className="text-[18px] sm:text-[20px] font-light text-luxury-black">{d.value}</p><p className="text-[12px] text-luxury-gold/80 font-medium flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" /> {d.trend}</p></div>)}</div>
            </section>

            {/* Nearby Areas */}
            <section className="border-t border-neutral-200 pt-8 mb-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Nearby Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{NEARBY_AREAS.map((area, i) => <Link key={i} to={area.href} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-sm px-4 py-3 hover:bg-neutral-100 transition-all group"><span className="text-[14px] text-luxury-black/75 font-light">{area.label}</span><span className="flex items-center gap-2 text-[12px] text-luxury-black/45">{area.count} properties <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span></Link>)}</div>
            </section>

            <LuxuryMortgageCalculator />
          </div>

          {/* Sticky Price Card */}
          <aside className="lg:col-span-5 lg:self-start">
            <div className="hidden lg:block lg:sticky lg:top-[84px] bg-neutral-50 border border-neutral-200 rounded-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{p.tag}</span>
                <Popover><PopoverTrigger asChild><button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black transition-all"><FileDown className="w-3.5 h-3.5" /></button></PopoverTrigger><PopoverContent align="end" className="w-[180px] p-0 rounded-none border-luxury-black/10"><Link to="/pdf-v1" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider hover:bg-neutral-50">FICHA (1 PAGE)</Link><Link to="/pdf-v2" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider hover:bg-neutral-50 border-t border-neutral-100">CATÁLOGO (3 PAGES)</Link></PopoverContent></Popover>
              </div>
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <p className="text-[32px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
                <span className="text-[14px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
              </div>
              <p className="text-[12px] text-luxury-black/60 mb-1">{p.pricePerSqm}</p>
              {p.alsoForRent && <p className="text-[13px] text-luxury-black/60 mb-4 flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-luxury-gold/80" /> Also for rent: <span className="font-medium text-luxury-black/80">{p.rentalPrice}</span></p>}
              <div className="flex gap-2 mb-2">
                <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85"><Phone className="w-3.5 h-3.5" /> Call</a>
                <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-[#22bf5b]"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 mb-5"><Mail className="w-3.5 h-3.5" /> Send Enquiry</button>
              <div className="border-t border-neutral-200 pt-5"><p className="text-[13px] text-luxury-black/55 font-light text-center">Get in touch for a personal consultation.</p><p className="text-[14px] text-luxury-black/70 font-mono text-center mt-3">REF-{p.ref}</p></div>
            </div>
          </aside>
        </div>
      </main>

      {/* Similar Properties */}
      <section className="border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <h2 className="text-xl font-light text-luxury-black tracking-tight mb-6">Similar Properties You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{SIMILAR.map((s, i) => <Link key={i} to={s.href} className="group bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow"><div className="relative overflow-hidden aspect-[4/3]"><img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><span className="absolute top-3 left-3 text-[11px] tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm px-2.5 py-1 font-medium">{s.tag}</span></div><div className="p-5"><p className="text-[12px] tracking-[0.14em] uppercase text-luxury-black/55 mb-1">{s.location}</p><h3 className="text-[15px] font-medium mb-3">{s.name}</h3><div className="flex items-center gap-5 mb-3 text-[13px] text-luxury-black/60 font-light"><span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span></div><p className="text-xl font-extralight tracking-tight">{s.price}</p></div></Link>)}</div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <h2 className="text-lg font-light text-luxury-black tracking-tight mb-5">Explore Properties in Ibiza</h2>
          <div className="flex flex-wrap gap-3">{INTERNAL_LINKS.map((link, i) => <Link key={i} to={link.href} className="text-[13px] text-luxury-black/65 font-light border border-neutral-200 bg-white rounded-full px-5 py-2.5 hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all">{link.label}</Link>)}</div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-neutral-100"><div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12"><div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div><h2 className="text-xl md:text-2xl font-light tracking-tight">Get Luxury Trends & Tips</h2><p className="text-[13px] text-luxury-black/55 font-light mt-2">Receive our top luxury picks delivered to your inbox each week.</p></div><form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}><input type="email" placeholder="Your email address" className="w-full border border-neutral-300 px-4 py-3 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40" /><button type="submit" className="bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 w-full hover:bg-luxury-black/85">Subscribe</button></form></div></div></section>

      {/* Recently Viewed */}
      <section className="border-t border-neutral-200"><div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8"><p className="text-[14px] font-normal mb-4">Recently Viewed</p><div className="flex gap-3 overflow-x-auto pb-2">{[...SIMILAR, ...SIMILAR].slice(0, 5).map((s, i) => <Link key={i} to={s.href} className="shrink-0 w-[150px] group"><div className="relative overflow-hidden aspect-[4/3] mb-1.5"><img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div><p className="text-[12px] text-luxury-black/85 font-light line-clamp-2">{s.name}</p><p className="text-[13px] font-normal mt-0.5">{s.price}</p></Link>)}</div></div></section>

      {/* Footer */}
      <footer className="bg-luxury-black"><div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10"><div className="flex flex-col md:flex-row items-center justify-between gap-4"><span className="text-sm tracking-[0.25em] text-white/40 font-light">{brand.fullName}</span><p className="text-[12px] text-white/20 tracking-wider font-light">© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p></div></div></footer>

      {/* ═══ ENQUIRY MODAL ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={open => { setEnquiryOpen(open); if (!open) setEnquirySent("idle"); }}>
        <DialogContent overlayClassName="!z-[110]" className="max-w-lg p-0 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl !z-[110]">
          {enquirySent === "idle" && (<><div className="p-5 pb-0"><div className="flex gap-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden"><img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover shrink-0" /><div className="py-2 pr-3 flex flex-col justify-center min-w-0"><DialogTitle className="text-[13px] font-medium leading-tight line-clamp-2 uppercase tracking-[0.02em]">{p.title}</DialogTitle><DialogDescription className="text-[14px] text-luxury-black/80 font-medium mt-1">{p.priceFormatted}</DialogDescription><span className="text-[11px] text-luxury-black/40 font-mono mt-0.5">REF-{p.ref}</span></div></div></div>
            <form className="p-6 pt-2 space-y-3" onSubmit={e => { e.preventDefault(); setEnquirySent("thanks"); setTimeout(() => setEnquirySent("suggestions"), 5000); }}>
              <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
              <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
              <LuxuryPhoneInput />
              <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 resize-none rounded-sm" />
              <label className="flex items-center gap-2 cursor-pointer select-none py-1"><input type="checkbox" checked={wantVisit} onChange={e => setWantVisit(e.target.checked)} className="w-4 h-4 accent-luxury-black" /><span className="text-[13px] text-luxury-black/70 font-light flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-luxury-black/40" />I'd like to schedule a visit</span></label>
              {wantVisit && (<div className="space-y-2 bg-neutral-50 border border-neutral-200 p-3 rounded-sm"><Popover><PopoverTrigger asChild><button type="button" className={cn("w-full flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[14px] text-left rounded-sm bg-white", !visitDate && "text-luxury-black/35")}><CalendarDays className="w-4 h-4 text-luxury-black/35" />{visitDate ? format(visitDate, "PPP") : "Select a date"}</button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={d => d < new Date()} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover><select value={visitTime} onChange={e => setVisitTime(e.target.value)} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] appearance-none cursor-pointer focus:outline-none rounded-sm bg-white"><option value="" disabled>Select a time</option>{["09:00","10:00","11:00","12:00","16:00","17:00","18:00"].map(t => <option key={t} value={t}>{t}</option>)}</select></div>)}
              <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" className="mt-1 accent-luxury-black" /><span className="text-[12px] text-luxury-black/55 font-light">I accept the <Link to="/page/terms" className="underline">terms</Link> and <Link to="/page/privacy" className="underline">privacy policy</Link>.</span></label>
              <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85">{wantVisit ? "Request Visit" : "Send Enquiry"}</button>
            </form></>)}
          {(enquirySent === "thanks" || enquirySent === "suggestions") && (<div className="p-6 max-h-[80vh] overflow-y-auto"><DialogTitle className="sr-only">Enquiry sent</DialogTitle><DialogDescription className="sr-only">Thank you</DialogDescription><div className="text-center py-6"><div className="w-14 h-14 rounded-full bg-luxury-black/5 flex items-center justify-center mx-auto mb-4"><Check className="w-7 h-7" /></div><h3 className="text-[18px] font-medium mb-2">Thank You</h3><p className="text-[14px] text-luxury-black/55 font-light">We'll be in touch shortly.</p></div>{enquirySent === "suggestions" && (<><p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/40 font-medium mb-3 mt-4">You may also like</p><div className="space-y-2">{SIMILAR.map((s, i) => <Link key={i} to={s.href} onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="flex gap-3 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:bg-neutral-100"><img src={s.image} alt={s.name} className="w-24 h-18 object-cover shrink-0" /><div className="py-2 pr-3 flex flex-col justify-center min-w-0"><p className="text-[11px] text-luxury-black/50">{s.location}</p><p className="text-[13px] font-medium line-clamp-1">{s.name}</p><p className="text-[15px] font-light mt-1">{s.price}</p></div></Link>)}</div><button onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="w-full mt-5 border border-neutral-300 text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100">Back to Property</button></>)}</div>)}
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}><DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 shadow-xl"><DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle><DialogDescription className="sr-only">Choose language</DialogDescription><div className="grid grid-cols-3 gap-2">{languages.map(lang => <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }} className={`flex flex-col items-center gap-2 px-3 py-4 rounded-sm text-[13px] border transition-colors ${currentLang === lang.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent text-luxury-black/55 font-light hover:bg-neutral-50"}`}><img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" /><span>{lang.label}</span></button>)}</div></DialogContent></Dialog>

      {/* Sticky Mobile Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center">
        <a href={`tel:${p.agency.phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black"><Phone className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span></a><div className="w-px h-8 bg-neutral-200" />
        <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366]"><MessageCircle className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span></a><div className="w-px h-8 bg-neutral-200" />
        <button onClick={() => setEnquiryOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black"><Mail className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">Enquiry</span></button>
      </div>

      {/* Chatbot */}
      {!chatOpen && <button onClick={() => setChatOpen(true)} className="fixed z-50 w-14 h-14 rounded-full bg-luxury-black text-white shadow-lg flex items-center justify-center hover:bg-luxury-black/85 bottom-[72px] right-4 lg:bottom-6 lg:right-6"><MessageCircle className="w-5 h-5" /></button>}
      {chatOpen && (<div className="fixed z-50 bg-white border border-neutral-200 shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden"><div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50"><span className="text-[13px] font-medium tracking-wide">{brand.fullName}</span><button onClick={() => setChatOpen(false)}><X className="w-4 h-4 text-luxury-black/40" /></button></div><div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50/50"><div className="w-16 h-12 rounded overflow-hidden shrink-0"><img src={p.images[0]} alt="" className="w-full h-full object-cover" /></div><div className="min-w-0"><p className="text-[13px] font-medium truncate">Luxury Villa Ibiza</p><p className="text-[15px] font-light">{p.priceFormatted}</p></div></div><div className="flex-1 overflow-auto px-4 py-4 space-y-3">{chatMessages.map((msg, i) => <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg", msg.role === "bot" ? "bg-neutral-100 mr-auto" : "bg-luxury-black text-white ml-auto")}>{msg.text}</div>)}</div><div className="border-t border-neutral-200 px-3 py-3 flex items-center gap-2"><input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChatSend()} placeholder="Ask about this property..." className="flex-1 text-[13px] placeholder:text-luxury-black/30 px-3 py-2 border border-neutral-200 rounded-full focus:outline-none" /><button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center rounded-full bg-luxury-black text-white"><Send className="w-4 h-4" /></button></div></div>)}

      {/* Lightbox */}
      {lightbox !== null && !gridView && (<div className="fixed inset-0 z-[100] bg-black/95 flex flex-col"><div className="flex items-center justify-between px-4 py-3 shrink-0"><span className="text-white/50 text-[13px]">{lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}</span><div className="flex items-center gap-3"><button onClick={() => setGridView(true)} className="text-white/50 hover:text-white"><Grid3X3 className="w-5 h-5" /></button><button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button></div></div><div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>{lightbox < p.images.length ? (<><div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} /><div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />{lightbox > 0 && <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white"><ChevronLeft className="w-8 h-8" strokeWidth={1} /></button>}<img src={p.images[lightbox]} alt={`Photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain relative z-0" /><button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white"><ChevronRight className="w-8 h-8" strokeWidth={1} /></button></>) : (<div className="absolute inset-0 flex items-center justify-center"><img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" /><div className="relative z-10 text-center px-6 max-w-lg"><h3 className="text-[22px] sm:text-[28px] font-light text-white uppercase mb-2">{p.title}</h3><p className="text-[13px] text-white/35 font-mono mb-2">REF-{p.ref}</p><p className="text-[24px] font-light text-white/90 mb-8">{p.priceFormatted}</p><div className="flex flex-col sm:flex-row items-center justify-center gap-3"><a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Phone className="w-3.5 h-3.5" /> Call</a><a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a><button onClick={() => setEnquiryOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Mail className="w-3.5 h-3.5" /> Enquiry</button></div><button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] uppercase flex items-center gap-1 mx-auto"><ChevronLeft className="w-3.5 h-3.5" /> Back to photos</button></div></div>)}</div>{lightbox < p.images.length && <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">{p.images.map((img, i) => <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] shrink-0 overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>)}</div>}</div>)}

      {/* Grid View */}
      {gridView && (<div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto"><div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm"><span className="text-white/50 text-[13px]">{p.images.length} Photos</span><button onClick={() => setGridView(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button></div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">{p.images.map((img, i) => <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group"><img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /><span className="absolute bottom-2 left-2 text-white/70 text-[11px]">{i + 1}</span></button>)}</div></div>)}

      <div className="lg:hidden h-16" />
    </div>
  );
};

export default PropertyDetailV5;
