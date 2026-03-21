import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Phone, Fence, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Grid3X3, TrendingUp,
  ArrowRight, MessageCircle, Send, BellRing,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { brand, navLeft, navRight, languages, currencies, areaUnits } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
import DetailPriceAlertModal from "@/components/blocks/detail/DetailPriceAlertModal";
import LuxuryPhoneInput from "./LuxuryPhoneInput";
import LuxuryMortgageCalculator from "./LuxuryMortgageCalculator";

import { useIsMobile } from "@/hooks/use-mobile";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import agencyLogo from "@/assets/agency-logo.png";
import luxinmoLogo from "@/assets/luxinmo-logo.png";

/* ─── Data (same as V6) ─── */
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
  areaVideoUrl: "",
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
    logo: null,
  },
  lat: 38.9848,
  lng: 1.5326,
};

const SIMILAR = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, tag: "FOR SALE", href: "/property/3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, tag: "FOR SALE", href: "/property/3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, tag: "FOR SALE", href: "/property/3003" },
];

const MARKET_DATA = [
  { label: "Average Villa Price", value: "€3,800,000", trend: "+12% YoY", pct: 75 },
  { label: "Price per m²", value: "€8,500/m²", trend: "+8% YoY", pct: 62 },
  { label: "Demand Index", value: "Very High", trend: "Rising", pct: 88 },
  { label: "Avg. Days on Market", value: "45 days", trend: "-15% YoY", pct: 35 },
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
  { label: "Sea View Properties Ibiza", href: "/properties?feature=sea-views&location=ibiza", count: 52 },
  { label: "Beachfront Villas Ibiza", href: "/properties?feature=beachfront&type=villa&location=ibiza", count: 18 },
];

/* ─── Collapsible Section ─── */
const Section = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-0 text-left"
      >
        <h2 className="text-[16px] sm:text-[18px] font-medium text-luxury-black">{title}</h2>
        <ChevronDown className={cn("w-5 h-5 text-luxury-black/40 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-[3000px] pb-6" : "max-h-0")}>
        {children}
      </div>
    </div>
  );
};

/* ─── Component ─── */
const PropertyDetailV7 = () => {
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
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm here to help you with any questions about this property. How can I assist you?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [gridView, setGridView] = useState(false);
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const isMobile = useIsMobile();

  const p = PROPERTY;

  // Swipe logic
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setHeroSlide((s) => Math.min(s + 1, p.images.length - 1));
      else setHeroSlide((s) => Math.max(s - 1, 0));
    }
    touchStart.current = null;
  }, [p.images.length]);

  // Lightbox swipe
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

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: `Thank you for your interest in this property in ${p.location}. An advisor will follow up with you shortly.` },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans">
      <SEOHead
        title={p.title}
        description={`${p.title} — ${p.beds} bedrooms, ${p.baths} bathrooms, ${p.sqm} m² built. ${p.priceFormatted}.`}
        type="article"
        image={heroImg}
        canonical={`https://luxinmo.com/property/${p.ref}`}
      />

      {/* ─── NAVBAR — slim on mobile ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm" aria-label="Main navigation">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10 h-[52px] md:h-[60px] lg:h-[68px]">
          <div className="flex items-center gap-6 lg:gap-10 flex-1">
            <button className="lg:hidden text-luxury-black/70" aria-label="Open menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/50 hover:text-luxury-black transition-colors">
                <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                <span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span>
              </button>
              {navLeft.map((l) => (
                <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <Link to="/" className="flex flex-col items-center justify-center shrink-0">
            <span className="text-[14px] md:text-lg lg:text-xl tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.35em] uppercase font-light text-luxury-black/40 hidden sm:block">{brand.subtitle}</span>
          </Link>
          <div className="flex items-center justify-end gap-6 lg:gap-10 flex-1">
            <div className="hidden lg:flex items-center gap-10">
              {navRight.map((l) => (
                <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-[52px] border-b border-neutral-100 shrink-0">
            <button className="text-luxury-black/70" onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
            <Link to="/" className="flex flex-col items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-[14px] tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
            </Link>
            <div className="w-5" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-10">
            {[...navLeft, ...navRight].map((item) => (
              <Link key={item.label} to={item.href} className="text-[18px] tracking-[0.15em] uppercase font-light py-4 text-luxury-black/80 border-b border-neutral-100 last:border-b-0 text-center" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-10 pb-8 flex flex-col items-center gap-4 shrink-0">
            <a href={`tel:${p.agency.phone}`} className="w-full flex items-center justify-center gap-2 bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3.5">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      )}

      {/* ═══ HERO GALLERY ═══ */}
      <section aria-label="Property photos">
        {/* Mobile: taller hero, edge-to-edge */}
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {p.images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[3/4] sm:aspect-[4/3]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`${p.title} — photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {/* Slide dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {p.images.map((_, i) => (
              <button key={i} onClick={() => setHeroSlide(i)} className={cn("rounded-full transition-all duration-300", heroSlide === i ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50")} />
            ))}
          </div>
          {/* Top overlay actions */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <Link to="/properties" className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={() => setLiked(!liked)} className={cn("w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors", liked ? "bg-white text-luxury-black" : "bg-black/30 text-white")} aria-label="Save">
                <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          {/* Bottom overlay: quick actions */}
          <div className="absolute bottom-4 right-3 flex items-center gap-2">
            {p.hasVideo && (
              <button className="h-8 px-3 rounded-full bg-black/40 backdrop-blur-sm flex items-center gap-1.5 text-white text-[11px] font-medium">
                <Play className="w-3.5 h-3.5" /> Video
              </button>
            )}
            <button onClick={() => setGridView(true)} className="h-8 px-3 rounded-full bg-black/40 backdrop-blur-sm flex items-center gap-1.5 text-white text-[11px] font-medium">
              <Grid3X3 className="w-3.5 h-3.5" /> {p.images.length}
            </button>
          </div>
        </div>

        {/* Desktop mosaic (same as V6) */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.title} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[11px] tracking-[0.2em] font-medium text-luxury-black uppercase">{brand.name}</span>
            </div>
          </div>
          {p.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(i + 1)}>
              <img src={img} alt={`${p.title} — photo ${i + 2}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {i === 3 && (
                <button onClick={(e) => { e.stopPropagation(); setGridView(true); }} className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-luxury-black text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md hover:bg-white transition-all">
                  <Grid3X3 className="w-4 h-4" /> Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── MOBILE: Sticky price summary card (below hero) ─── */}
      <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[11px] tracking-[0.12em] uppercase text-luxury-black/45 font-medium">{p.tag}</p>
            <p className="text-[24px] font-medium text-luxury-black tracking-tight leading-none mt-0.5">{p.priceFormatted}</p>
          </div>
          <div className="text-right">
            <span className="text-[12px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
            <span className="ml-1.5 text-[10px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-1.5 py-0.5">-{p.discount}%</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-luxury-black/60 font-light">
          <span>{p.pricePerSqm}</span>
          {p.alsoForRent && (
            <span className="flex items-center gap-1"><Home className="w-3 h-3 text-luxury-gold/80" /> Rent: <strong className="font-medium text-luxury-black/70">{p.rentalPrice}</strong></span>
          )}
        </div>
        <button onClick={() => setPriceAlertOpen(true)} className="group flex items-center gap-1.5 text-[11px] tracking-[0.06em] text-luxury-gold/80 hover:text-luxury-gold font-light transition-colors mt-1.5">
          <BellRing className="w-3 h-3" strokeWidth={1.4} />
          Avísame si baja el precio
        </button>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-7">

            {/* Breadcrumb — tablet+ */}
            <nav aria-label="Breadcrumb" className="mb-3 hidden sm:block">
              <ol className="flex items-center gap-2 text-[13px] text-luxury-black/50 font-light">
                {p.breadcrumb.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {i < p.breadcrumb.length - 1 ? (
                      <Link to={p.breadcrumbLinks[i]} className="hover:text-luxury-black transition-colors">{crumb}</Link>
                    ) : (
                      <span className="text-luxury-black/70 font-normal">{crumb}</span>
                    )}
                    {i < p.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3 text-luxury-black/30" />}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[36px] font-medium text-luxury-black leading-tight tracking-[0.02em] uppercase mb-1">
              {p.title}
            </h1>

            {/* Location */}
            <p className="text-[12px] text-luxury-black/50 font-light tracking-[0.08em] uppercase mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              {p.location} · {p.region}
            </p>

            {/* Desktop: inline price (hidden on mobile since we have sticky card) */}
            <div className="hidden lg:flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
              <p className="text-[30px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
              <span className="text-[14px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
              <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
              <span className="text-[12px] text-luxury-black/45 font-light">{p.pricePerSqm}</span>
              {p.alsoForRent && (
                <span className="text-[13px] text-luxury-black/50 flex items-center gap-1">
                  <Home className="w-3 h-3 text-luxury-gold/80" /> Rent: <span className="font-medium text-luxury-black/70">{p.rentalPrice}</span>
                </span>
              )}
            </div>

            {/* Property specs — horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide mb-3">
              {[
                { icon: Bed, label: "Beds", value: p.beds },
                { icon: Bath, label: "Baths", value: p.baths },
                { icon: Maximize, label: "Built", value: `${p.sqm} m²` },
                { icon: Fence, label: "Plot", value: `${p.plot.toLocaleString()} m²` },
              ].map((s, i) => (
                <div key={i} className="shrink-0 bg-neutral-50 border border-neutral-200 rounded-sm px-4 py-2.5 flex items-center gap-2.5 min-w-0">
                  <s.icon className="w-4 h-4 text-luxury-black/40 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[15px] font-light text-luxury-black leading-tight">{s.value}</p>
                    <p className="text-[9px] tracking-[0.1em] uppercase text-luxury-black/50 font-medium">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[11px] text-luxury-gold font-medium border border-luxury-gold/40 bg-luxury-gold/5 px-3 py-1.5 tracking-[0.05em] flex items-center gap-1">
                <Star className="w-3 h-3" strokeWidth={1.5} /> Exclusive
              </span>
              {["Sea Views", "Newly Built", "Gated Community"].map((tag, i) => (
                <span key={i} className="text-[11px] text-luxury-black/70 border border-neutral-200 px-3 py-1.5 font-light">
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile: Agent card */}
            <div className="lg:hidden bg-neutral-50 border border-neutral-200 rounded-sm p-3.5 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-luxury-black flex items-center justify-center text-white text-[12px] tracking-[0.1em] font-medium shrink-0">
                {brand.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-luxury-black truncate">{brand.fullName}</p>
                <p className="text-[11px] text-luxury-black/45 font-light">REF-{p.ref}</p>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="shrink-0 bg-luxury-black text-white text-[11px] tracking-[0.1em] uppercase px-4 py-2 hover:bg-luxury-black/85 transition-all">
                Enquiry
              </button>
            </div>

            {/* ─── COLLAPSIBLE SECTIONS (mobile-friendly) ─── */}

            {/* Description — always open */}
            <Section title="About This Property" defaultOpen={true}>
              <div className={cn("text-[14px] leading-[1.85] text-luxury-black/80 font-light whitespace-pre-line", !expandDesc && "line-clamp-[8]")}>
                {p.description}
              </div>
              <button onClick={() => setExpandDesc(!expandDesc)} className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-luxury-black/70 hover:text-luxury-black font-medium transition-colors">
                {expandDesc ? "Show less" : "Read more"} <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", expandDesc && "rotate-180")} />
              </button>
            </Section>

            {/* Highlights */}
            <Section title="Key Highlights" defaultOpen={true}>
              <div className="grid grid-cols-1 gap-2">
                {p.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-luxury-black/80 font-light">
                    <Check className="w-4 h-4 text-luxury-gold/70 shrink-0 mt-0.5" strokeWidth={2} />
                    {h}
                  </div>
                ))}
              </div>
            </Section>

            {/* Basic Characteristics */}
            <Section title="Basic Characteristics" defaultOpen={false}>
              <div className="space-y-0">
                {[
                  { label: "Reference", value: p.ref },
                  { label: "Property type", value: "Detached house" },
                  { label: "Price", value: p.priceFormatted },
                  { label: "Built area", value: `${p.sqm} m²` },
                  { label: "Plot", value: `${p.plot.toLocaleString()} m²` },
                  { label: "Bedrooms", value: p.beds },
                  { label: "Bathrooms", value: p.baths },
                  { label: "Year built", value: p.year },
                  { label: "Energy rating", value: p.energyClass },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-100">
                    <span className="text-[13px] text-luxury-black/70 font-light">{row.label}</span>
                    <span className="text-[13px] text-luxury-black font-medium">{String(row.value)}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Features & Amenities */}
            <Section title="Features & Amenities" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-luxury-black/75 font-light">
                    <Check className="w-3.5 h-3.5 text-luxury-black/40 shrink-0" strokeWidth={2} />
                    {f}
                  </div>
                ))}
              </div>
            </Section>

            {/* Floor Plans */}
            <Section title="Floor Plans" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-3">
                {["Ground Floor", "First Floor"].map((floor, i) => (
                  <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                    <div className="aspect-[4/3] flex items-center justify-center text-luxury-black/30">
                      <Grid3X3 className="w-8 h-8 text-luxury-black/15" strokeWidth={1} />
                    </div>
                    <div className="px-3 py-2 border-t border-neutral-200">
                      <p className="text-[13px] font-medium text-luxury-black">{floor}</p>
                      <p className="text-[11px] text-luxury-black/50 font-light">{i === 0 ? `${Math.round(p.sqm * 0.6)} m²` : `${Math.round(p.sqm * 0.4)} m²`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Market Data */}
            <Section title="Real Estate Market" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-3">
                {MARKET_DATA.map((d, i) => (
                  <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-3">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-luxury-black/55 font-medium mb-1">{d.label}</p>
                    <p className="text-[18px] font-light text-luxury-black mb-1.5">{d.value}</p>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-luxury-gold/60 rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                    <p className="text-[11px] text-luxury-gold/80 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {d.trend}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Nearby Areas */}
            <Section title="Nearby Areas" defaultOpen={false}>
              <div className="grid grid-cols-1 gap-2">
                {NEARBY_AREAS.map((area, i) => (
                  <Link key={i} to={area.href} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-sm px-3.5 py-2.5 hover:bg-neutral-100 transition-all group">
                    <span className="text-[13px] text-luxury-black/80 font-light group-hover:text-luxury-black transition-colors">{area.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-luxury-black/40">{area.count}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-luxury-black/30 group-hover:text-luxury-black/60 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Mortgage Calculator */}
            <Section title="Mortgage Calculator" defaultOpen={false}>
              <LuxuryMortgageCalculator propertyPrice={p.price} />
            </Section>

            {/* Location */}
            <Section title="Location" defaultOpen={false}>
              <div className="bg-neutral-50 border border-neutral-200 h-[220px] sm:h-[280px] flex items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm">
                <MapPin className="w-5 h-5 mr-1.5" /> Interactive Map
              </div>
              <p className="text-[12px] text-luxury-black/45 font-light flex items-center gap-1.5 mt-2">
                <MapPin className="w-3 h-3" /> {p.location}, {p.region}
              </p>
            </Section>
          </div>

          {/* ─── RIGHT COLUMN (desktop sticky price card) ─── */}
          <aside className="hidden lg:block lg:col-span-5">
            <div className="sticky top-[76px] bg-white border border-neutral-200 rounded-sm p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.15em] uppercase text-luxury-black/40 font-medium">{p.tag}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black transition-all">
                      <FileDown className="w-3.5 h-3.5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-[180px] p-0 rounded-none border-luxury-black/10">
                    <Link to="/pdf-v1" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors">FICHA (1 PAGE)</Link>
                    <Link to="/pdf-v2" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors border-t border-neutral-100">CATÁLOGO (3 PAGES)</Link>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <p className="text-[32px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
                <span className="text-[14px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
              </div>
              <p className="text-[12px] text-luxury-black/60 mb-1">{p.pricePerSqm}</p>
              {p.alsoForRent && (
                <p className="text-[13px] text-luxury-black/60 mb-4 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-luxury-gold/80" /> Also for rent: <span className="font-medium text-luxury-black/80">{p.rentalPrice}</span>
                </p>
              )}

              <div className="flex gap-2 mb-2">
                <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85 transition-all">
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
                <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-[#22bf5b] transition-all">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all mb-5">
                <Mail className="w-3.5 h-3.5" /> Send Enquiry
              </button>

              <div className="border-t border-neutral-200 pt-5">
                <p className="text-[13px] text-luxury-black/55 font-light leading-relaxed text-center">
                  Get in touch for a personal consultation or to arrange a private viewing.
                </p>
                <p className="text-[14px] text-luxury-black/70 font-mono text-center mt-3 tracking-[0.05em]">REF-{p.ref}</p>
                <button onClick={() => setPriceAlertOpen(true)} className="group w-full flex items-center justify-center gap-2 border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold hover:bg-luxury-gold/10 text-[12px] tracking-[0.08em] uppercase font-medium py-2.5 mt-4 transition-all">
                  <BellRing className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Avísame si baja el precio
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ─── SIMILAR PROPERTIES ─── */}
      <section className="border-t border-neutral-200" aria-label="Similar properties">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <h2 className="text-[16px] sm:text-xl font-light text-luxury-black tracking-tight mb-5 lg:mb-8">Similar Properties</h2>
          {/* Mobile: horizontal scroll */}
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="shrink-0 w-[260px] group bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-2 left-2 text-[10px] tracking-[0.12em] uppercase bg-white/90 backdrop-blur-sm text-luxury-black px-2 py-0.5 font-medium">{s.tag}</span>
                </div>
                <div className="p-3.5">
                  <p className="text-[11px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">{s.location}</p>
                  <h3 className="text-[13px] font-medium text-luxury-black mb-2 line-clamp-1">{s.name}</h3>
                  <div className="flex items-center gap-3 mb-2 text-[12px] text-luxury-black/55 font-light">
                    <span>{s.beds} beds</span>
                    <span>{s.baths} baths</span>
                    <span>{s.sqm} m²</span>
                  </div>
                  <p className="text-[17px] font-extralight text-luxury-black">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="group bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[11px] tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-luxury-black px-2.5 py-1 font-medium">{s.tag}</span>
                </div>
                <div className="p-6">
                  <p className="text-[12px] tracking-[0.14em] uppercase text-luxury-black/55 mb-1">{s.location}</p>
                  <h3 className="text-[15px] font-medium text-luxury-black mb-3">{s.name}</h3>
                  <div className="flex items-center gap-5 mb-4 text-[13px] text-luxury-black/60 font-light">
                    <span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span>
                  </div>
                  <p className="text-xl font-extralight text-luxury-black">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO LINKS ─── */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <h2 className="text-[15px] font-light text-luxury-black tracking-tight mb-4">Explore Properties in Ibiza</h2>
          <div className="flex flex-wrap gap-2">
            {INTERNAL_LINKS.map((link, i) => (
              <Link key={i} to={link.href} className="text-[12px] text-luxury-black/60 font-light border border-neutral-200 bg-white rounded-full px-4 py-2 hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-lg md:text-xl font-light text-luxury-black">Get Luxury Trends & Tips</h2>
              <p className="text-[13px] text-luxury-black/55 font-light mt-1.5">Receive our top luxury picks delivered to your inbox each week.</p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 border border-neutral-300 px-4 py-3 text-[16px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors" />
              <button type="submit" className="shrink-0 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase px-5 py-3 hover:bg-luxury-black/85 transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-luxury-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-sm tracking-[0.25em] text-white/40 font-light">{brand.fullName}</span>
            <p className="text-[12px] text-white/20 tracking-wider font-light">© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══ ENQUIRY MODAL ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={(open) => { setEnquiryOpen(open); if (!open) setEnquirySent("idle"); }}>
        <DialogContent overlayClassName="!z-[110]" className="max-w-lg p-0 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl !z-[110]">
          {enquirySent === "idle" && (
            <>
              <div className="p-5 pb-0">
                <div className="flex gap-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                  <img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover shrink-0" />
                  <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                    <DialogTitle className="text-[13px] font-medium text-luxury-black leading-tight line-clamp-2 uppercase tracking-[0.02em]">{p.title}</DialogTitle>
                    <DialogDescription className="text-[14px] text-luxury-black/80 font-medium mt-1">{p.priceFormatted}</DialogDescription>
                    <span className="text-[11px] text-luxury-black/40 font-mono tracking-[0.05em] mt-0.5">REF-{p.ref}</span>
                  </div>
                </div>
              </div>
              <form className="p-6 pt-2 space-y-3" onSubmit={(e) => { e.preventDefault(); setEnquirySent("thanks"); setTimeout(() => setEnquirySent("suggestions"), 5000); }}>
                <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[16px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
                <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[16px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
                <LuxuryPhoneInput />
                <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[16px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 resize-none rounded-sm" />
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-neutral-300 rounded accent-luxury-black" />
                  <span className="text-[13px] text-luxury-black/70 font-light flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-luxury-black/40" /> I'd like to schedule a visit
                  </span>
                </label>
                {wantVisit && (
                  <div className="space-y-2 bg-neutral-50 border border-neutral-200 p-3 rounded-sm">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className={cn("w-full flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[14px] text-left rounded-sm bg-white", !visitDate && "text-luxury-black/35")}>
                          <CalendarDays className="w-4 h-4 text-luxury-black/35 shrink-0" />
                          {visitDate ? format(visitDate, "PPP") : "Select a date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black focus:outline-none rounded-sm bg-white">
                      <option value="" disabled>Select a time</option>
                      {["09:00","10:00","11:00","12:00","16:00","17:00","18:00","19:00"].map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 border-neutral-300 rounded accent-luxury-black mt-0.5" />
                  <span className="text-[12px] text-luxury-black/50 font-light leading-relaxed">
                    I accept the <a href="#" className="underline">privacy policy</a> and consent to receive communications.
                  </span>
                </label>
                <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3.5 hover:bg-luxury-black/85 transition-all">
                  {wantVisit ? "Request Visit" : "Send Enquiry"}
                </button>
              </form>
            </>
          )}
          {enquirySent === "thanks" && (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-luxury-gold" />
              </div>
              <DialogTitle className="text-[18px] font-medium text-luxury-black mb-2">Thank You!</DialogTitle>
              <DialogDescription className="text-[14px] text-luxury-black/60 font-light">
                We'll get back to you within 24 hours.
              </DialogDescription>
            </div>
          )}
          {enquirySent === "suggestions" && (
            <div className="p-5">
              <DialogTitle className="sr-only">Similar properties</DialogTitle>
              <DialogDescription className="sr-only">Properties you may also like</DialogDescription>
              <div className="border-t border-neutral-200 pt-4 mb-3">
                <p className="text-[14px] font-medium text-luxury-black mb-1">You May Also Like</p>
              </div>
              <div className="space-y-2.5">
                {SIMILAR.map((s, i) => (
                  <Link key={i} to={s.href} onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="flex gap-3 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:bg-neutral-100 transition-all group">
                    <img src={s.image} alt={s.name} className="w-24 h-18 object-cover shrink-0" />
                    <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                      <p className="text-[11px] text-luxury-black/50 font-light">{s.location}</p>
                      <p className="text-[13px] font-medium text-luxury-black line-clamp-1">{s.name}</p>
                      <p className="text-[15px] font-light text-luxury-black mt-1">{s.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="w-full mt-4 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all">
                Back to Property
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ LANGUAGE MODAL ═══ */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 shadow-xl">
          <DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle>
          <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                className={cn("flex flex-col items-center gap-2 px-3 py-4 rounded-sm text-[13px] border transition-colors", currentLang === lang.code ? "bg-neutral-50 border-neutral-300 text-luxury-black font-medium" : "border-transparent text-luxury-black/55 font-light hover:bg-neutral-50")}>
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ MOBILE STICKY CONTACT BAR ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center">
        <a href={`tel:${p.agency.phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-neutral-50 transition-colors">
          <Phone className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span>
        </a>
        <div className="w-px h-8 bg-neutral-200" />
        <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366] hover:bg-neutral-50 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span>
        </a>
        <div className="w-px h-8 bg-neutral-200" />
        <button onClick={() => setEnquiryOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-neutral-50 transition-colors">
          <Mail className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Enquiry</span>
        </button>
      </div>

      {/* ═══ CHATBOT ═══ */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed z-50 w-14 h-14 rounded-full bg-luxury-black text-white shadow-lg flex items-center justify-center hover:bg-luxury-black/85 transition-all bottom-[72px] right-4 lg:bottom-6 lg:right-6" aria-label="Open chat">
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
      {chatOpen && (
        <div className="fixed z-50 bg-white border border-neutral-200 shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
            <span className="text-[13px] font-medium text-luxury-black tracking-wide">{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="text-luxury-black/40 hover:text-luxury-black transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
            <div className="w-12 h-9 rounded overflow-hidden shrink-0">
              <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-luxury-black truncate">Luxury Villa Ibiza</p>
              <p className="text-[14px] font-light text-luxury-black">{p.priceFormatted}</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg", msg.role === "bot" ? "bg-neutral-100 text-luxury-black/80 mr-auto" : "bg-luxury-black text-white ml-auto")}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 px-3 py-3 flex items-center gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleChatSend()} placeholder="Ask about this property..."
              className="flex-1 text-[16px] text-luxury-black placeholder:text-luxury-black/30 px-3 py-2 border border-neutral-200 rounded-full focus:outline-none focus:border-luxury-black/30 transition-colors" />
            <button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center rounded-full bg-luxury-black text-white shrink-0"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* ─── LIGHTBOX ─── */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px] font-light">
              {lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/50 hover:text-white transition-colors"><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
            {lightbox < p.images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white"><ChevronLeft className="w-8 h-8" strokeWidth={1} /></button>}
                <img src={p.images[lightbox]} alt={`Photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain relative z-0" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white"><ChevronRight className="w-8 h-8" strokeWidth={1} /></button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <h3 className="text-[20px] sm:text-[28px] font-light text-white tracking-[0.04em] uppercase mb-2">{p.title}</h3>
                  <p className="text-[24px] font-light text-white/90 mb-8">{p.priceFormatted}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Phone className="w-3.5 h-3.5" /> Call</a>
                    <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                    <button onClick={() => setEnquiryOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] tracking-[0.1em] uppercase flex items-center gap-1 mx-auto">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to photos
                  </button>
                </div>
              </div>
            )}
          </div>
          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={cn("w-[56px] h-[40px] shrink-0 overflow-hidden transition-all", i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70")}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── GRID VIEW ─── */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/50 text-[13px] font-light">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group">
                <img src={img} alt={`Photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute bottom-2 left-2 text-white/70 text-[11px] font-light">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom padding for sticky bar */}
      <div className="lg:hidden h-16" />

      {/* Price Alert Modal */}
      <DetailPriceAlertModal open={priceAlertOpen} onOpenChange={setPriceAlertOpen} propertyRef={p.ref} propertyTitle={p.title} priceFormatted={p.priceFormatted} propertyImage={p.images[0]} propertyLocation={p.location} />
    </div>
  );
};

export default PropertyDetailV7;
