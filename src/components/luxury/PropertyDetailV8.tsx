import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Phone, Fence, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Grid3X3, TrendingUp,
  ArrowRight, MessageCircle, Send, BellRing, ArrowUpRight,
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
  { label: "Properties in Ibiza", href: "#", count: 124 },
  { label: "Villas in Ibiza", href: "#", count: 67 },
  { label: "Properties in Santa Eulalia", href: "#", count: 38 },
  { label: "Luxury Villas Ibiza", href: "#", count: 29 },
  { label: "Sea View Properties Ibiza", href: "#", count: 52 },
];

/* ─── Component ─── */
const PropertyDetailV8 = () => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm here to help you with any questions about this property. How can I assist you?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [gridView, setGridView] = useState(false);
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const [expandFeatures, setExpandFeatures] = useState(false);
  const isMobile = useIsMobile();

  const p = PROPERTY;

  // Swipe refs
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

  const specs = [
    { icon: Bed, val: p.beds, label: "Bedrooms" },
    { icon: Bath, val: p.baths, label: "Bathrooms" },
    { icon: Maximize, val: `${p.sqm} m²`, label: "Built" },
    { icon: Fence, val: `${p.plot.toLocaleString()} m²`, label: "Plot" },
  ];

  return (
    <div className="flex-1 bg-luxury-cream text-luxury-black font-sans">
      <SEOHead title={p.title} description={p.subtitle} type="article" image={heroImg} />

      {/* ═══ NAVBAR — Transparent over hero ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-luxury-black/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 md:px-8 lg:px-12 h-[56px] lg:h-[64px]">
          <div className="flex items-center gap-8">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/40 hover:text-luxury-black transition-colors">
                <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-4 h-3 object-cover rounded-[1px]" />
                <span className="text-[10px] tracking-[0.15em] font-medium">{currentLang}</span>
              </button>
              {navLeft.map((l) => (
                <Link key={l.label} to={l.href} className="text-[11px] tracking-[0.18em] uppercase font-light text-luxury-black/45 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[14px] lg:text-[16px] tracking-[0.35em] font-light text-luxury-black">{brand.fullName}</span>
            <span className="text-[8px] lg:text-[9px] tracking-[0.4em] uppercase font-light text-luxury-black/35">{brand.subtitle}</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {navRight.map((l) => (
                <Link key={l.label} to={l.href} className="text-[11px] tracking-[0.18em] uppercase font-light text-luxury-black/45 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-5 h-[56px] border-b border-luxury-black/5 shrink-0">
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
            <Link to="/" className="flex flex-col items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-[14px] tracking-[0.35em] font-light">{brand.fullName}</span>
            </Link>
            <div className="w-5" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-12">
            {[...navLeft, ...navRight].map((item) => (
              <Link key={item.label} to={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[16px] tracking-[0.15em] uppercase font-light py-4 text-luxury-black/70 border-b border-luxury-black/5 text-center hover:text-luxury-black transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-12 py-8 shrink-0">
            <a href={`tel:${p.agency.phone}`} className="w-full flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.12em] uppercase py-3.5">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      )}

      {/* ═══ HERO GALLERY ═══ */}
      <section className="pt-[56px] lg:pt-[64px]" aria-label="Property photos">
        {/* Mobile: swipeable */}
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {p.images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[4/3]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`${p.title} — photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {p.images.map((_, i) => (
              <button key={i} onClick={() => setHeroSlide(i)} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === heroSlide ? "bg-white w-4" : "bg-white/50")} />
            ))}
          </div>
          {/* Floating actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button onClick={() => setLiked(!liked)} className={cn("w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all", liked ? "bg-luxury-black text-white" : "bg-white/80 text-luxury-black/70")}>
              <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-luxury-black/70">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {p.hasVideo && (
              <button className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-luxury-black text-[11px] tracking-[0.08em] uppercase font-medium px-3 py-2 rounded-full">
                <Play className="w-3.5 h-3.5" /> Video
              </button>
            )}
          </div>
        </div>

        {/* Desktop: cinematic mosaic */}
        <div className="hidden lg:grid grid-cols-12 gap-1 h-[640px]">
          {/* Hero — large left */}
          <div className="col-span-7 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.title} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            {/* Floating brand badge */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/70 bg-luxury-black/40 backdrop-blur-sm px-4 py-2">{brand.name}</span>
            </div>
          </div>
          {/* Right column */}
          <div className="col-span-5 grid grid-rows-3 gap-1">
            <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(1)}>
              <img src={p.images[1]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Save / Share on first right tile */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className={cn("flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md transition-all", liked ? "bg-luxury-black text-white" : "bg-white/85 text-luxury-black/80 hover:bg-white")}>
                  <Heart className="w-3 h-3" fill={liked ? "currentColor" : "none"} /> {liked ? "Saved" : "Save"}
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-luxury-black/80 text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-white transition-all">
                  <Share2 className="w-3 h-3" /> Share
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(2)}>
              <img src={p.images[2]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Video / 3D Tour */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                {p.hasVideo && (
                  <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-luxury-black text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-white transition-all">
                    <Play className="w-3 h-3" /> Video
                  </button>
                )}
                {p.hasVirtualTour && (
                  <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-luxury-black text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-white transition-all">
                    <View className="w-3 h-3" /> 3D Tour
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(3)}>
                <img src={p.images[3]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(4)}>
                <img src={p.images[4]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <button onClick={(e) => { e.stopPropagation(); setGridView(true); }} className="absolute inset-0 bg-luxury-black/40 flex items-center justify-center text-white text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-luxury-black/50 transition-colors gap-2">
                  <Grid3X3 className="w-4 h-4" /> All photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">

        {/* ─── Breadcrumb ─── */}
        <nav className="py-4 hidden sm:block" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[11px] text-luxury-black/40 font-light tracking-[0.05em]">
            {p.breadcrumb.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i < p.breadcrumb.length - 1 ? (
                  <Link to={p.breadcrumbLinks[i]} className="hover:text-luxury-black transition-colors">{crumb}</Link>
                ) : (
                  <span className="text-luxury-black/60">{crumb}</span>
                )}
                {i < p.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3 text-luxury-black/20" />}
              </li>
            ))}
          </ol>
        </nav>

        {/* ─── TWO-COLUMN LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 pb-16">

          {/* ─── LEFT: Content ─── */}
          <div className="lg:col-span-7 pt-4 lg:pt-0">

            {/* Exclusive badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-medium text-luxury-gold border border-luxury-gold/30 bg-luxury-gold/5 px-3 py-1.5">
                <Star className="w-3 h-3" strokeWidth={1.5} /> Exclusive
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-luxury-black/30 border border-luxury-black/10 px-3 py-1.5">{p.tag}</span>
            </div>

            {/* Title — serif editorial */}
            <h1 className="font-cormorant text-[28px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-light text-luxury-black leading-[1.1] tracking-[0.01em] mb-3">
              {p.title}
            </h1>

            {/* Location */}
            <p className="text-[12px] text-luxury-black/40 font-light tracking-[0.12em] uppercase flex items-center gap-2 mb-5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
              {p.location} · {p.region}
            </p>

            {/* Mobile price */}
            <div className="lg:hidden mb-6 pb-6 border-b border-luxury-black/8">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <p className="font-cormorant text-[36px] font-light text-luxury-black leading-none">{p.priceFormatted}</p>
                <span className="text-[13px] text-luxury-black/25 line-through font-light">{p.originalPrice}</span>
                <span className="text-[10px] font-medium tracking-[0.1em] text-luxury-gold">-{p.discount}%</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-luxury-black/45 font-light">
                <span>{p.pricePerSqm}</span>
                {p.alsoForRent && (
                  <span className="flex items-center gap-1">
                    <Home className="w-3 h-3 text-luxury-gold/70" /> Rent: <strong className="font-medium text-luxury-black/60">{p.rentalPrice}</strong>
                  </span>
                )}
              </div>
              <button onClick={() => setPriceAlertOpen(true)} className="group flex items-center gap-1.5 text-[11px] text-luxury-gold/80 hover:text-luxury-gold font-light mt-2 transition-colors">
                <BellRing className="w-3 h-3 group-hover:animate-[wiggle_0.4s_ease-in-out]" strokeWidth={1.4} />
                Avísame si baja el precio
              </button>
            </div>

            {/* Specs — elegant horizontal */}
            <div className="flex items-stretch gap-0 mb-8 border border-luxury-black/8 divide-x divide-luxury-black/8">
              {specs.map((s, i) => (
                <div key={i} className="flex-1 py-4 px-3 text-center">
                  <s.icon className="w-4 h-4 text-luxury-gold/60 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-[16px] sm:text-[18px] font-cormorant font-light text-luxury-black leading-tight mb-0.5">{s.val}</p>
                  <p className="text-[9px] tracking-[0.12em] uppercase text-luxury-black/40 font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Gated Community", "Newly Built", "Sea Views", p.style, `Year ${p.year}`].map((tag, i) => (
                <span key={i} className="text-[11px] text-luxury-black/60 border border-luxury-black/10 px-3 py-1.5 font-light tracking-[0.04em]">{tag}</span>
              ))}
            </div>

            {/* ─── ABOUT ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-4">About This Property</h2>
              <div className={cn("text-[14px] leading-[2] text-luxury-black/75 font-light whitespace-pre-line", !expandDesc && "line-clamp-[10]")}>
                {p.description}
              </div>
              <button onClick={() => setExpandDesc(!expandDesc)} className="flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.12em] uppercase text-luxury-gold/80 hover:text-luxury-gold font-medium transition-colors">
                {expandDesc ? "Show less" : "Read more"} <ChevronDown className={cn("w-3 h-3 transition-transform", expandDesc && "rotate-180")} />
              </button>
            </section>

            {/* Highlights */}
            <section className="mb-10 bg-white border border-luxury-black/6 p-6 lg:p-8">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {p.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-[13px] text-luxury-black/75 font-light leading-relaxed">
                    <Star className="w-3.5 h-3.5 text-luxury-gold/50 mt-0.5 shrink-0" strokeWidth={1.5} />
                    {h}
                  </div>
                ))}
              </div>
            </section>

            {/* ─── CHARACTERISTICS ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Characteristics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {[
                  { label: "Reference", value: p.ref },
                  { label: "Property Type", value: "Detached Villa" },
                  { label: "Built Area", value: `${p.sqm} m²` },
                  { label: "Plot Size", value: `${p.plot.toLocaleString()} m²` },
                  { label: "Bedrooms", value: p.beds },
                  { label: "Bathrooms", value: p.baths },
                  { label: "Year Built", value: p.year },
                  { label: "Energy Rating", value: p.energyClass },
                  { label: "Garage", value: `${p.garage} cars` },
                  { label: "Status", value: p.status },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-luxury-black/6">
                    <span className="text-[13px] text-luxury-black/50 font-light">{row.label}</span>
                    <span className="text-[13px] text-luxury-black font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Features & Amenities</h2>
              <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 overflow-hidden transition-all", !expandFeatures && "max-h-[160px]")}>
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[13px] text-luxury-black/70 font-light">
                    <div className="w-1 h-1 rounded-full bg-luxury-gold/50 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              {p.features.length > 9 && (
                <button onClick={() => setExpandFeatures(!expandFeatures)} className="flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.12em] uppercase text-luxury-gold/80 hover:text-luxury-gold font-medium transition-colors">
                  {expandFeatures ? "Show less" : `Show all ${p.features.length}`} <ChevronDown className={cn("w-3 h-3 transition-transform", expandFeatures && "rotate-180")} />
                </button>
              )}
            </section>

            {/* ─── FLOOR PLANS ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Floor Plans</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Ground Floor", "First Floor"].map((floor, i) => (
                  <div key={i} className="bg-white border border-luxury-black/6 overflow-hidden">
                    <div className="aspect-[4/3] flex items-center justify-center text-luxury-black/20">
                      <div className="text-center">
                        <Grid3X3 className="w-8 h-8 mx-auto mb-2" strokeWidth={1} />
                        <p className="text-[12px] font-light">{floor} Plan</p>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-luxury-black/6">
                      <p className="text-[13px] font-medium text-luxury-black">{floor}</p>
                      <p className="text-[11px] text-luxury-black/40 font-light">{i === 0 ? `${Math.round(p.sqm * 0.6)} m²` : `${Math.round(p.sqm * 0.4)} m²`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── MARKET DATA ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Market Insights — Santa Eulalia</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {MARKET_DATA.map((d, i) => (
                  <div key={i} className="bg-white border border-luxury-black/6 p-5">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-luxury-black/40 font-medium mb-1.5">{d.label}</p>
                    <p className="font-cormorant text-[22px] font-light text-luxury-black mb-2.5">{d.value}</p>
                    <div className="w-full h-1 bg-luxury-black/5 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-luxury-gold/50 rounded-full transition-all duration-700" style={{ width: `${d.pct}%` }} />
                    </div>
                    <p className="text-[11px] text-luxury-gold/70 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {d.trend}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── LOCATION ─── */}
            <section className="mb-10">
              <h2 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black mb-5">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-luxury-black/6 h-[280px] flex items-center justify-center text-luxury-black/30 text-[13px] font-light">
                  <MapPin className="w-5 h-5 mr-1.5" /> Interactive Map
                </div>
                <div>
                  <p className="text-[14px] leading-[1.9] text-luxury-black/70 font-light mb-5">
                    Santa Eulalia del Río is one of Ibiza's most sought-after municipalities, renowned for its relaxed Mediterranean lifestyle, pristine beaches, and thriving culinary scene.
                  </p>
                  <div className="space-y-2">
                    {NEARBY_AREAS.slice(0, 4).map((a, i) => (
                      <Link key={i} to={a.href} className="flex items-center justify-between py-2 border-b border-luxury-black/5 text-[13px] text-luxury-black/60 font-light hover:text-luxury-black transition-colors group">
                        <span>{a.label}</span>
                        <span className="flex items-center gap-2 text-[12px] text-luxury-black/30">
                          {a.count} <ArrowUpRight className="w-3 h-3 group-hover:text-luxury-gold transition-colors" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ─── MORTGAGE ─── */}
            <section className="mb-10">
              <LuxuryMortgageCalculator />
            </section>
          </div>

          {/* ─── RIGHT: Sticky Sidebar ─── */}
          <aside className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-[80px] space-y-6">

              {/* Price Card */}
              <div className="bg-white border border-luxury-black/6 p-7">
                {/* PDF dropdown */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/30 font-medium">{p.tag}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-7 h-7 flex items-center justify-center text-luxury-black/30 hover:text-luxury-black transition-colors" aria-label="Download brochure">
                        <FileDown className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[170px] p-0 rounded-none border-luxury-black/10">
                      <Link to="/pdf-v1" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors">FICHA (1 PAGE)</Link>
                      <Link to="/pdf-v2" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors border-t border-luxury-black/5">CATÁLOGO (3 PAGES)</Link>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Price */}
                <p className="font-cormorant text-[38px] font-light text-luxury-black leading-none mb-1">{p.priceFormatted}</p>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[13px] text-luxury-black/25 line-through font-light">{p.originalPrice}</span>
                  <span className="text-[10px] font-medium tracking-[0.1em] text-luxury-gold bg-luxury-gold/8 px-2 py-0.5">-{p.discount}%</span>
                </div>
                <p className="text-[12px] text-luxury-black/40 font-light mb-1">{p.pricePerSqm}</p>
                {p.alsoForRent && (
                  <p className="text-[12px] text-luxury-black/50 mb-5 flex items-center gap-1.5">
                    <Home className="w-3 h-3 text-luxury-gold/60" /> Also for rent: <span className="font-medium text-luxury-black/70">{p.rentalPrice}</span>
                  </p>
                )}

                {/* CTA */}
                <div className="flex gap-2 mb-2">
                  <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[11px] tracking-[0.12em] uppercase py-3 hover:bg-luxury-black/85 transition-all">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.12em] uppercase py-3 hover:bg-[#22bf5b] transition-all">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
                <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-luxury-black/15 text-luxury-black text-[11px] tracking-[0.12em] uppercase py-3 hover:bg-luxury-black/3 transition-all mb-5">
                  <Mail className="w-3.5 h-3.5" /> Send Enquiry
                </button>

                {/* Ref + Price Alert */}
                <div className="border-t border-luxury-black/6 pt-5">
                  <p className="text-[12px] text-luxury-black/35 font-light text-center mb-3">
                    Get in touch for a personal consultation or to arrange a private viewing.
                  </p>
                  <p className="text-[13px] text-luxury-black/50 font-mono text-center tracking-[0.08em] mb-4">REF-{p.ref}</p>
                  <button onClick={() => setPriceAlertOpen(true)} className="group w-full flex items-center justify-center gap-2 border border-luxury-gold/25 bg-luxury-gold/5 text-luxury-gold hover:bg-luxury-gold/10 text-[11px] tracking-[0.1em] uppercase font-medium py-2.5 transition-all">
                    <BellRing className="w-3 h-3 group-hover:animate-[wiggle_0.4s_ease-in-out]" strokeWidth={1.5} />
                    Avísame si baja el precio
                  </button>
                </div>
              </div>

              {/* Agent card */}
              <div className="bg-white border border-luxury-black/6 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-luxury-black/5 mx-auto mb-3 flex items-center justify-center text-luxury-black/30 text-[18px] font-cormorant font-light">
                  {brand.fullName.charAt(0)}
                </div>
                <p className="text-[13px] font-medium text-luxury-black tracking-[0.05em] mb-1">{brand.fullName}</p>
                <p className="text-[11px] text-luxury-black/40 font-light mb-4">Luxury Real Estate Advisors</p>
                <a href={`tel:${p.agency.phone}`} className="text-[12px] text-luxury-black/60 font-light hover:text-luxury-black transition-colors flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3" /> {p.agency.phone}
                </a>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* ─── BUYER'S GUIDE ─── */}
      <section className="border-t border-luxury-black/6">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-12">
          <div className="bg-white border border-luxury-black/6 p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-medium mb-1.5">Free Download</p>
              <h3 className="font-cormorant text-[22px] lg:text-[26px] font-light text-luxury-black">Buyer's Guide to Luxury Property in Ibiza</h3>
              <p className="text-[13px] text-luxury-black/45 font-light mt-1.5 max-w-lg">Taxes, legal process, golden visa, and market insights.</p>
            </div>
            <button className="shrink-0 bg-luxury-black text-white text-[11px] tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-luxury-black/85 transition-all">
              Download Guide
            </button>
          </div>
        </div>
      </section>

      {/* ─── SIMILAR ─── */}
      <section className="border-t border-luxury-black/6" aria-label="Similar properties">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-14">
          <h2 className="font-cormorant text-[26px] lg:text-[32px] font-light text-luxury-black mb-10">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="group">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-luxury-black px-2.5 py-1 font-medium">{s.tag}</span>
                </div>
                <p className="text-[11px] tracking-[0.12em] uppercase text-luxury-black/40 mb-1">{s.location}</p>
                <h3 className="text-[15px] font-medium text-luxury-black mb-2 group-hover:text-luxury-gold transition-colors">{s.name}</h3>
                <div className="flex items-center gap-4 text-[12px] text-luxury-black/45 font-light mb-3">
                  <span>{s.beds} beds</span>
                  <span>{s.baths} baths</span>
                  <span>{s.sqm} m²</span>
                </div>
                <p className="font-cormorant text-[22px] font-light text-luxury-black">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO LINKS ─── */}
      <section className="border-t border-luxury-black/6 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-10">
          <h2 className="font-cormorant text-[20px] font-light text-luxury-black mb-5">Explore Properties in Ibiza</h2>
          <div className="flex flex-wrap gap-2">
            {INTERNAL_LINKS.map((link, i) => (
              <Link key={i} to={link.href} className="text-[12px] text-luxury-black/50 font-light border border-luxury-black/8 px-4 py-2 hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all duration-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-luxury-black/6 bg-luxury-cream">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-cormorant text-[26px] lg:text-[30px] font-light text-luxury-black">Get Luxury Trends & Tips</h2>
              <p className="text-[13px] text-luxury-black/45 font-light mt-2 leading-relaxed">Receive our top luxury picks delivered to your inbox each week.</p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 border border-luxury-black/12 bg-white px-4 py-3 text-[14px] text-luxury-black placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors" />
              <button type="submit" className="bg-luxury-black text-white text-[11px] tracking-[0.12em] uppercase px-6 py-3 hover:bg-luxury-black/85 transition-all shrink-0">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── RECENTLY VIEWED ─── */}
      <section className="border-t border-luxury-black/6 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-8">
          <p className="text-[13px] font-medium text-luxury-black mb-4 tracking-[0.05em]">Recently Viewed</p>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[...SIMILAR, ...SIMILAR].slice(0, 5).map((s, i) => (
              <Link key={i} to={s.href} className="shrink-0 w-[160px] group">
                <div className="overflow-hidden aspect-[4/3] mb-2">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-[12px] text-luxury-black/70 font-light leading-snug line-clamp-2">{s.name}</p>
                <p className="font-cormorant text-[15px] text-luxury-black mt-0.5">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-luxury-black">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm tracking-[0.25em] text-white/40 font-light">{brand.fullName}</span>
            <p className="text-[12px] text-white/20 tracking-wider font-light">© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══ ENQUIRY MODAL ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={(open) => { setEnquiryOpen(open); if (!open) setEnquirySent("idle"); }}>
        <DialogContent overlayClassName="!z-[110]" className="max-w-lg p-0 rounded-none border border-luxury-black/10 overflow-hidden shadow-2xl !z-[110]">
          {enquirySent === "idle" && (
            <>
              <div className="p-5 pb-0">
                <div className="flex gap-3 mb-4 bg-luxury-cream/50 border border-luxury-black/6 overflow-hidden">
                  <img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover shrink-0" />
                  <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                    <DialogTitle className="text-[12px] font-medium text-luxury-black leading-tight line-clamp-2 uppercase tracking-[0.02em]">{p.title}</DialogTitle>
                    <DialogDescription className="font-cormorant text-[16px] text-luxury-black mt-1">{p.priceFormatted}</DialogDescription>
                    <span className="text-[10px] text-luxury-black/30 font-mono tracking-[0.05em] mt-0.5">REF-{p.ref}</span>
                  </div>
                </div>
              </div>
              <form className="p-6 pt-2 space-y-3" onSubmit={(e) => { e.preventDefault(); setEnquirySent("thanks"); setTimeout(() => setEnquirySent("suggestions"), 5000); }}>
                <input type="text" placeholder="Full name" className="w-full border border-luxury-black/10 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors bg-transparent" />
                <input type="email" placeholder="Email address" className="w-full border border-luxury-black/10 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors bg-transparent" />
                <LuxuryPhoneInput />
                <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-luxury-black/10 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors resize-none bg-transparent" />

                <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                  <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-luxury-black/15 accent-luxury-black" />
                  <span className="text-[13px] text-luxury-black/60 font-light flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-luxury-black/30" /> I'd like to schedule a visit
                  </span>
                </label>

                {wantVisit && (
                  <div className="space-y-2 bg-luxury-cream/30 border border-luxury-black/6 p-3">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-luxury-black/35 font-medium mb-1">Preferred Date & Time</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className={cn("w-full flex items-center gap-2 border border-luxury-black/10 px-4 py-2.5 text-[14px] text-left transition-all hover:border-luxury-black/25 bg-white", !visitDate && "text-luxury-black/30")}>
                          <CalendarDays className="w-4 h-4 text-luxury-black/25 shrink-0" />
                          {visitDate ? format(visitDate, "PPP") : "Select a date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="w-full border border-luxury-black/10 px-4 py-2.5 text-[14px] text-luxury-black appearance-none cursor-pointer focus:outline-none focus:border-luxury-black/25 transition-all bg-white">
                      <option value="" disabled>Select a time</option>
                      {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 border-luxury-black/15 mt-0.5 accent-luxury-black" />
                  <span className="text-[11px] text-luxury-black/40 font-light leading-relaxed">
                    I accept the <a href="#" className="underline hover:text-luxury-black transition-colors">privacy policy</a> and consent to receive communications.
                  </span>
                </label>

                <button type="submit" className="w-full bg-luxury-black text-white text-[12px] tracking-[0.14em] uppercase py-3.5 hover:bg-luxury-black/85 transition-all mt-2">
                  Send Enquiry
                </button>
              </form>
            </>
          )}
          {enquirySent === "thanks" && (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-luxury-gold" />
              </div>
              <DialogTitle className="font-cormorant text-[24px] font-light text-luxury-black mb-2">Thank You</DialogTitle>
              <DialogDescription className="text-[13px] text-luxury-black/50 font-light leading-relaxed">
                Your enquiry has been sent. A luxury property advisor will contact you within the next 24 hours.
              </DialogDescription>
            </div>
          )}
          {enquirySent === "suggestions" && (
            <div className="p-5">
              <DialogTitle className="sr-only">Suggestions</DialogTitle>
              <DialogDescription className="sr-only">Similar properties you may like</DialogDescription>
              <div className="border-t border-luxury-black/6 pt-4 mb-3">
                <p className="text-[14px] font-medium text-luxury-black mb-1">You May Also Like</p>
                <p className="text-[12px] text-luxury-black/40 font-light">Similar properties that may interest you</p>
              </div>
              <div className="space-y-2.5">
                {SIMILAR.map((s, i) => (
                  <Link key={i} to={s.href} onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="flex gap-3 bg-luxury-cream/30 border border-luxury-black/6 overflow-hidden hover:bg-luxury-cream/60 transition-all group">
                    <img src={s.image} alt={s.name} className="w-24 h-18 object-cover shrink-0" />
                    <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                      <p className="text-[11px] text-luxury-black/40 font-light">{s.location}</p>
                      <p className="text-[13px] font-medium text-luxury-black line-clamp-1 group-hover:text-luxury-gold transition-colors">{s.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[12px] text-luxury-black/40 font-light">
                        <span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span>
                      </div>
                      <p className="font-cormorant text-[16px] text-luxury-black mt-1">{s.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="w-full mt-5 border border-luxury-black/10 text-luxury-black text-[11px] tracking-[0.12em] uppercase py-3 hover:bg-luxury-black/3 transition-all">
                Back to Property
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ LANGUAGE MODAL ═══ */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-md p-6 rounded-none border border-luxury-black/10 shadow-2xl">
          <DialogTitle className="text-[10px] tracking-[0.2em] uppercase font-medium text-luxury-black/35 mb-5">Select Language</DialogTitle>
          <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }} className={cn("flex flex-col items-center gap-2 px-3 py-4 text-[12px] border transition-colors", currentLang === lang.code ? "bg-luxury-cream/50 border-luxury-black/15 font-medium" : "border-transparent text-luxury-black/45 font-light hover:bg-luxury-cream/30")}>
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ MOBILE STICKY BAR ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-luxury-black/8 flex items-center">
        <a href={`tel:${p.agency.phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-luxury-cream/50 transition-colors">
          <Phone className="w-4 h-4" />
          <span className="text-[9px] tracking-[0.12em] uppercase font-medium">Call</span>
        </a>
        <div className="w-px h-8 bg-luxury-black/8" />
        <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366] hover:bg-luxury-cream/50 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[9px] tracking-[0.12em] uppercase font-medium">WhatsApp</span>
        </a>
        <div className="w-px h-8 bg-luxury-black/8" />
        <button onClick={() => setEnquiryOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black hover:bg-luxury-cream/50 transition-colors">
          <Mail className="w-4 h-4" />
          <span className="text-[9px] tracking-[0.12em] uppercase font-medium">Enquiry</span>
        </button>
      </div>

      {/* ═══ CHATBOT ═══ */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed z-50 w-14 h-14 rounded-full bg-luxury-black text-white shadow-xl flex items-center justify-center hover:bg-luxury-black/85 transition-all bottom-[72px] right-4 lg:bottom-6 lg:right-6" aria-label="Open chat">
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
      {chatOpen && (
        <div className="fixed z-50 bg-white border border-luxury-black/8 shadow-2xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-luxury-black/6 bg-luxury-cream/30">
            <span className="text-[12px] font-medium text-luxury-black tracking-[0.08em]">{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="text-luxury-black/30 hover:text-luxury-black transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-luxury-black/5">
            <div className="w-14 h-10 overflow-hidden shrink-0"><img src={p.images[0]} alt="" className="w-full h-full object-cover" /></div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-luxury-black truncate">Luxury Villa Ibiza</p>
              <p className="font-cormorant text-[15px] text-luxury-black">{p.priceFormatted}</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5", msg.role === "bot" ? "bg-luxury-cream/50 text-luxury-black/75 mr-auto" : "bg-luxury-black text-white ml-auto")}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="border-t border-luxury-black/6 px-3 py-3 flex items-center gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleChatSend()} placeholder="Ask about this property..." className="flex-1 text-[13px] text-luxury-black placeholder:text-luxury-black/25 px-3 py-2 border border-luxury-black/8 focus:outline-none focus:border-luxury-black/20 transition-colors bg-transparent" />
            <button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center bg-luxury-black text-white hover:bg-luxury-black/85 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" role="dialog">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/40 text-[12px] font-light">{lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/40 hover:text-white transition-colors"><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setLightbox(null)} className="text-white/40 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
            {lightbox < p.images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/25 hover:text-white transition-colors"><ChevronLeft className="w-8 h-8" strokeWidth={1} /></button>}
                <img src={p.images[lightbox]} alt="" className="max-w-[90vw] max-h-full object-contain relative z-0" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/25 hover:text-white transition-colors"><ChevronRight className="w-8 h-8" strokeWidth={1} /></button>
              </>
            ) : (
              /* Contact CTA slide */
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <h3 className="font-cormorant text-[26px] sm:text-[34px] font-light text-white leading-tight mb-2">{p.title}</h3>
                  <p className="text-[13px] text-white/40 font-light mb-1">{p.location}</p>
                  <p className="text-[12px] text-white/25 font-mono tracking-[0.08em] mb-2">REF-{p.ref}</p>
                  <p className="font-cormorant text-[28px] font-light text-white/85 mb-8">{p.priceFormatted}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <button onClick={() => setEnquiryOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/25 text-white text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                      <Mail className="w-3.5 h-3.5" /> Enquiry
                    </button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/25 hover:text-white/50 text-[11px] tracking-[0.12em] uppercase transition-colors flex items-center gap-1 mx-auto">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to photos
                  </button>
                </div>
              </div>
            )}
          </div>
          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={cn("w-[52px] h-[36px] shrink-0 overflow-hidden transition-all", i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-30 hover:opacity-60")}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── GRID VIEW ─── */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto" role="dialog">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/40 text-[12px] font-light">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/40 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 p-2 sm:p-4">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group">
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 text-white/50 text-[11px] font-light">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="px-4 sm:px-8 py-10 text-center shrink-0">
            <h3 className="font-cormorant text-[22px] font-light text-white/80 mb-2">{p.title}</h3>
            <p className="text-[12px] text-white/30 font-mono tracking-[0.08em] mb-6">REF-{p.ref}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-white/90 transition-all"><Phone className="w-3.5 h-3.5" /> Call</a>
              <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
              <button onClick={() => { setGridView(false); setEnquiryOpen(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/25 text-white text-[11px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-white/10 transition-all"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom spacer for mobile sticky bar */}
      <div className="lg:hidden h-16" />

      {/* Price Alert Modal */}
      <DetailPriceAlertModal open={priceAlertOpen} onOpenChange={setPriceAlertOpen} propertyRef={p.ref} propertyTitle={p.title} priceFormatted={p.priceFormatted} propertyImage={p.images[0]} propertyLocation={p.location} />
    </div>
  );
};

export default PropertyDetailV8;
