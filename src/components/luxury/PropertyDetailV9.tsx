import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Phone, Fence, Mail, ChevronDown, CalendarDays,
  Play, View, FileDown, Home, Grid3X3, TrendingUp,
  ArrowRight, MessageCircle, Send, BellRing, ArrowUpRight,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { brand, navLeft, navRight, languages } from "@/config/template";
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
const P = {
  title: "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  subtitle: "Contemporary villa with panoramic Mediterranean sea views",
  breadcrumb: ["Home", "Ibiza", "Santa Eulalia del Río"],
  breadcrumbLinks: ["/", "/properties?location=ibiza", "/properties?location=santa-eulalia"],
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
  hasVideo: true,
  hasVirtualTour: true,
  images: [heroImg, detail1, detail2, detail3, prop1, prop2, prop3],
  description: `This exceptional luxury villa for sale in Santa Eulalia del Río, Ibiza, is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, this contemporary Ibiza villa seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.

The ground floor features a grand open-plan living area with floor-to-ceiling windows that frame the stunning Mediterranean views, a designer kitchen with Gaggenau appliances, and direct access to the infinity pool terrace. The master suite occupies a private wing with a spa-inspired bathroom, walk-in dressing room, and a private terrace overlooking the sea.

Upstairs, four additional en-suite bedrooms each enjoy their own terrace and sea views. The lower level houses a home cinema, wine cellar, gym, and staff quarters. Surrounded by mature Mediterranean gardens with automated irrigation, this luxury villa in Ibiza includes a double garage, solar panels, and state-of-the-art home automation.`,
  highlights: [
    "Panoramic sea views over the Mediterranean and Formentera",
    "Infinity pool with sunset terrace",
    "Floor-to-ceiling windows throughout",
    "Contemporary architecture by award-winning studio",
    "Prime Santa Eulalia location",
    "Smart home automation and solar panels",
  ],
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
    "Air Conditioning", "Alarm System", "Double Garage", "Garden",
    "Terrace", "Staff Quarters", "Elevator", "Laundry Room",
  ],
  agency: { name: brand.fullName, phone: "+34 600 123 456", whatsapp: "34600123456", email: "info@prestigeestates.com" },
  lat: 38.9848, lng: 1.5326,
};

const SIMILAR = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, href: "/property/3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, href: "/property/3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, href: "/property/3003" },
];

const MARKET_DATA = [
  { label: "Avg Villa Price", value: "€3.8M", trend: "+12%", pct: 75 },
  { label: "Price / m²", value: "€8,500", trend: "+8%", pct: 62 },
  { label: "Demand", value: "Very High", trend: "Rising", pct: 88 },
  { label: "Days on Market", value: "45", trend: "-15%", pct: 35 },
];

const INTERNAL_LINKS = [
  "Luxury Villas in Ibiza", "Apartments in Ibiza", "New Developments Ibiza",
  "Properties in Santa Eulalia", "Beachfront Properties Ibiza", "Sea View Properties",
];

/* ─── Component ─── */
const PropertyDetailV9 = () => {
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
  const [gridView, setGridView] = useState(false);
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! How can I help you with this property?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const isMobile = useIsMobile();

  const p = P;

  // Touch swipe
  const touchRef = useRef<{ x: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchRef.current = { x: e.touches[0].clientX }; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent, max: number) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setHeroSlide(s => Math.min(s + 1, max - 1));
      else setHeroSlide(s => Math.max(s - 1, 0));
    }
    touchRef.current = null;
  }, []);

  const lbRef = useRef<{ x: number } | null>(null);
  const onLbStart = useCallback((e: React.TouchEvent) => { lbRef.current = { x: e.touches[0].clientX }; }, []);
  const onLbEnd = useCallback((e: React.TouchEvent) => {
    if (!lbRef.current) return;
    const dx = e.changedTouches[0].clientX - lbRef.current.x;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setLightbox(prev => prev !== null ? Math.min(prev + 1, p.images.length) : null);
      else setLightbox(prev => prev !== null ? Math.max(prev - 1, 0) : null);
    }
    lbRef.current = null;
  }, [p.images.length]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: "user", text: chatInput.trim() }]);
    setChatInput("");
    setTimeout(() => setChatMessages(prev => [...prev, { role: "bot", text: `Thank you for your interest. An advisor will contact you shortly.` }]), 1000);
  };

  const specs = [
    { icon: Bed, val: p.beds, label: "Beds" },
    { icon: Bath, val: p.baths, label: "Baths" },
    { icon: Maximize, val: `${p.sqm} m²`, label: "Built" },
    { icon: Fence, val: `${p.plot.toLocaleString()} m²`, label: "Plot" },
  ];

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans">
      <SEOHead title={p.title} description={p.subtitle} type="article" image={heroImg} />

      {/* ═══ NAVBAR — ultra-minimal ═══ */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100" aria-label="Main navigation">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 lg:px-10 h-[56px] lg:h-[64px]">
          <div className="flex items-center gap-8 flex-1">
            <button className="lg:hidden" aria-label="Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/40 hover:text-luxury-black transition-colors">
                <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                <span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span>
              </button>
              {navLeft.map(l => (
                <Link key={l.label} to={l.href} className="text-[12px] tracking-[0.16em] uppercase text-luxury-black/45 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <Link to="/" className="text-center shrink-0">
            <span className="text-[15px] lg:text-[17px] tracking-[0.35em] text-luxury-black">{brand.fullName}</span>
          </Link>
          <div className="flex items-center justify-end gap-8 flex-1">
            <div className="hidden lg:flex items-center gap-8">
              {navRight.map(l => (
                <Link key={l.label} to={l.href} className="text-[12px] tracking-[0.16em] uppercase text-luxury-black/45 hover:text-luxury-black transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-5 h-[56px] border-b border-neutral-100 shrink-0">
            <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
            <span className="text-[15px] tracking-[0.35em]">{brand.fullName}</span>
            <div className="w-5" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-10">
            {[...navLeft, ...navRight].map(item => (
              <Link key={item.label} to={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[16px] tracking-[0.15em] uppercase py-4 text-luxury-black/70 border-b border-neutral-100 last:border-0 text-center hover:text-luxury-black transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ═══ GALLERY — compact, 2+2 grid ═══ */}
      <section>
        {/* Mobile swipe */}
        <div className="lg:hidden relative" onTouchStart={onTouchStart} onTouchEnd={e => onTouchEnd(e, p.images.length)}>
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {p.images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[16/10]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`Photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-sm">{heroSlide + 1} / {p.images.length}</span>
          {/* Mobile action bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              {p.hasVideo && <button className="text-[12px] text-luxury-black/60 flex items-center gap-1"><Play className="w-3.5 h-3.5" /> Video</button>}
              <Link to="/pdf-v2" target="_blank" className="text-[12px] text-luxury-black/60 flex items-center gap-1"><FileDown className="w-3.5 h-3.5" /> PDF</Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-luxury-black/40"><Share2 className="w-4 h-4" /></button>
              <button onClick={() => setLiked(!liked)} className={liked ? "text-luxury-black" : "text-luxury-black/40"}>
                <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: hero left + 2 stacked right, constrained and shorter */}
        <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-[2px] h-[52vh] min-h-[420px] max-h-[560px] max-w-[1320px] mx-auto relative">
          {/* Hero */}
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); }} className="bg-white/90 backdrop-blur-sm text-luxury-black text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-white transition-all">
                <Share2 className="w-3 h-3" /> Share
              </button>
              <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} className={cn("text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all", liked ? "bg-luxury-black text-white" : "bg-white/90 backdrop-blur-sm text-luxury-black hover:bg-white")}>
                <Heart className="w-3 h-3" fill={liked ? "currentColor" : "none"} /> Save
              </button>
            </div>
          </div>
          {/* Right: 2 rows */}
          <div className="grid grid-rows-2 gap-[2px]">
            <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(1)}>
              <img src={p.images[1]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(2)}>
              <img src={p.images[2]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {p.hasVideo && <button onClick={e => e.stopPropagation()} className="bg-white/90 backdrop-blur-sm text-luxury-black text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5"><Play className="w-3 h-3" /> Video</button>}
                {p.hasVirtualTour && <button onClick={e => e.stopPropagation()} className="bg-white/90 backdrop-blur-sm text-luxury-black text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5"><View className="w-3 h-3" /> 3D</button>}
              </div>
              <button onClick={e => { e.stopPropagation(); setGridView(true); }} className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white transition-all shadow-sm">
                <Grid3X3 className="w-3.5 h-3.5" /> All photos
              </button>
            </div>
          </div>

          {/* ─── Floating price card ─── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[460px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 z-20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium">{p.tag}</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-[26px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
                  <span className="text-[13px] text-luxury-black/25 line-through">{p.originalPrice}</span>
                  <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-luxury-gold">-{p.discount}%</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-luxury-black/45">
                  <span>{p.pricePerSqm}</span>
                  {p.alsoForRent && (
                    <>
                      <span className="w-px h-3 bg-neutral-200" />
                      <span className="flex items-center gap-1"><Home className="w-3 h-3 text-luxury-gold/70" /> Rent: <strong className="font-medium text-luxury-black/65">{p.rentalPrice}</strong></span>
                    </>
                  )}
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-8 h-8 flex items-center justify-center text-luxury-black/30 hover:text-luxury-black transition-colors"><FileDown className="w-4 h-4" /></button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[160px] p-0 rounded-none border-luxury-black/10">
                  <Link to="/pdf-v1" target="_blank" className="block px-4 py-2.5 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50">FICHA</Link>
                  <Link to="/pdf-v2" target="_blank" className="block px-4 py-2.5 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 border-t border-neutral-100">CATÁLOGO</Link>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 mb-2">
              <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[11px] tracking-[0.12em] uppercase py-2.5 hover:bg-luxury-black/85 transition-all">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.12em] uppercase py-2.5 hover:bg-[#22bf5b] transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
            <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-neutral-200 text-luxury-black text-[11px] tracking-[0.12em] uppercase py-2.5 hover:bg-neutral-50 transition-all mb-4">
              <Mail className="w-3.5 h-3.5" /> Send Enquiry
            </button>

            <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
              <p className="text-[11px] text-luxury-black/35 font-mono tracking-[0.05em]">REF-{p.ref}</p>
              <button onClick={() => setPriceAlertOpen(true)} className="group flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-luxury-gold/70 hover:text-luxury-gold transition-colors">
                <BellRing className="w-3 h-3 group-hover:animate-[wiggle_0.4s_ease-in-out]" strokeWidth={1.5} />
                Avísame si baja el precio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile price ── */}
      <div className="lg:hidden px-4 pt-4 pb-3">
        <div className="flex items-baseline gap-3 mb-1">
          <p className="text-[24px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
          <span className="text-[12px] text-luxury-black/30 line-through">{p.originalPrice}</span>
          <span className="text-[10px] font-medium text-luxury-gold">-{p.discount}%</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-luxury-black/45 mb-1.5">
          <span>{p.pricePerSqm}</span>
          {p.alsoForRent && <span className="flex items-center gap-1"><Home className="w-3 h-3 text-luxury-gold/70" /> {p.rentalPrice}</span>}
        </div>
        <button onClick={() => setPriceAlertOpen(true)} className="group flex items-center gap-1.5 text-[10px] text-luxury-gold/70 hover:text-luxury-gold transition-colors">
          <BellRing className="w-3 h-3" strokeWidth={1.4} /> Avísame si baja el precio
        </button>
      </div>

      {/* ═══ CONTENT ═══ */}
      <main className="max-w-[860px] mx-auto px-5 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="mb-4 hidden sm:block">
          <ol className="flex items-center gap-1.5 text-[12px] text-luxury-black/40">
            {p.breadcrumb.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <Link to={p.breadcrumbLinks[i]} className="hover:text-luxury-black transition-colors">{c}</Link>
                {i < p.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3 text-luxury-black/20" />}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-[22px] sm:text-[28px] lg:text-[34px] font-medium text-luxury-black leading-[1.15] tracking-[0.04em] uppercase mb-2">
          {p.title}
        </h1>
        <p className="text-[12px] text-luxury-black/40 tracking-[0.12em] uppercase flex items-center gap-1.5 mb-5">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /> {p.location}
        </p>

        {/* Specs — minimal horizontal line */}
        <div className="flex items-center gap-6 py-4 border-y border-neutral-100 mb-6">
          {specs.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-luxury-black/70">
              <s.icon className="w-4 h-4 text-luxury-black/30" strokeWidth={1.5} />
              <span className="font-medium">{s.val}</span>
              <span className="text-luxury-black/35 text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <section className="mb-8">
          <div className={cn("text-[14px] leading-[1.85] text-luxury-black/75 font-light whitespace-pre-line", !expandDesc && "line-clamp-[8]")}>
            {p.description}
          </div>
          <button onClick={() => setExpandDesc(!expandDesc)} className="mt-2 text-[11px] tracking-[0.1em] uppercase text-luxury-black/50 hover:text-luxury-black flex items-center gap-1 transition-colors">
            {expandDesc ? "Less" : "Read more"} <ChevronDown className={cn("w-3 h-3 transition-transform", expandDesc && "rotate-180")} />
          </button>
        </section>

        {/* Highlights */}
        <section className="mb-8">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-3">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {p.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-luxury-black/70 font-light">
                <Check className="w-3.5 h-3.5 text-luxury-gold/60 mt-0.5 shrink-0" strokeWidth={2} /> {h}
              </div>
            ))}
          </div>
        </section>

        {/* Characteristics */}
        <section className="border-t border-neutral-100 pt-6 mb-8">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-4">Characteristics</h2>
          <div className="grid grid-cols-2 gap-x-10">
            {[
              [
                { l: "Reference", v: p.ref }, { l: "Type", v: "Detached house" }, { l: "Price", v: p.priceFormatted },
                { l: "Built area", v: `${p.sqm} m²` }, { l: "Energy", v: p.energyClass },
              ],
              [
                { l: "Bedrooms", v: p.beds }, { l: "Bathrooms", v: p.baths },
                { l: "Useful area", v: `${Math.round(p.sqm * 0.67)} m²` }, { l: "Plot", v: `${p.plot.toLocaleString()} m²` },
                { l: "Garage", v: `${p.garage} cars` },
              ],
            ].map((col, ci) => (
              <div key={ci}>
                {col.map((r, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-neutral-100 text-[13px]">
                    <span className="text-luxury-black/50 font-light">{r.l}</span>
                    <span className="text-luxury-black font-medium">{r.v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-neutral-100 pt-6 mb-8">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-4">Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
            {p.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] text-luxury-black/65 font-light">
                <Check className="w-3 h-3 text-luxury-black/30" strokeWidth={2} /> {f}
              </div>
            ))}
          </div>
        </section>

        {/* Floor Plans */}
        <section className="border-t border-neutral-100 pt-6 mb-8">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-4">Floor Plans</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Ground Floor", "First Floor"].map((floor, i) => (
              <div key={i} className="border border-neutral-100 overflow-hidden">
                <div className="aspect-[4/3] flex items-center justify-center text-luxury-black/20">
                  <Grid3X3 className="w-8 h-8" strokeWidth={1} />
                </div>
                <div className="px-3 py-2 border-t border-neutral-100">
                  <p className="text-[13px] font-medium text-luxury-black">{floor}</p>
                  <p className="text-[11px] text-luxury-black/40">{i === 0 ? `${Math.round(p.sqm * 0.6)} m²` : `${Math.round(p.sqm * 0.4)} m²`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Data */}
        <section className="border-t border-neutral-100 pt-6 mb-8">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-4">Market Insights — Santa Eulalia</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MARKET_DATA.map((d, i) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.1em] uppercase text-luxury-black/40 mb-1">{d.label}</p>
                <p className="text-[18px] font-light text-luxury-black mb-1.5">{d.value}</p>
                <div className="w-full h-1 bg-neutral-100 overflow-hidden mb-1">
                  <div className="h-full bg-luxury-gold/50 transition-all duration-700" style={{ width: `${d.pct}%` }} />
                </div>
                <p className="text-[10px] text-luxury-gold/70 flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /> {d.trend}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mortgage */}
        <section className="border-t border-neutral-100 pt-6 mb-8">
          <LuxuryMortgageCalculator />
        </section>
      </main>

      {/* ─── SIMILAR ─── */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-10">
          <h2 className="text-[11px] tracking-[0.18em] uppercase text-luxury-black/40 font-medium mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="group">
                <div className="overflow-hidden aspect-[4/3] mb-3">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-[11px] text-luxury-black/40 tracking-[0.08em] uppercase mb-1">{s.location}</p>
                <h3 className="text-[14px] font-medium text-luxury-black mb-1 group-hover:text-luxury-black/65 transition-colors">{s.name}</h3>
                <div className="flex gap-4 text-[12px] text-luxury-black/45 mb-2">
                  <span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span>
                </div>
                <p className="text-[18px] font-light text-luxury-black">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO ─── */}
      <section className="border-t border-neutral-100 bg-neutral-50/50">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-8">
          <div className="flex flex-wrap gap-2">
            {INTERNAL_LINKS.map((l, i) => (
              <Link key={i} to="#" className="text-[12px] text-luxury-black/50 border border-neutral-200 px-4 py-2 hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all duration-300">{l}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[600px] mx-auto px-5 py-12 text-center">
          <h2 className="text-[18px] font-light text-luxury-black mb-2">Stay Informed</h2>
          <p className="text-[13px] text-luxury-black/45 font-light mb-5">Receive curated luxury property picks weekly.</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email" className="flex-1 border border-neutral-200 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors" />
            <button type="submit" className="bg-luxury-black text-white text-[11px] tracking-[0.12em] uppercase px-6 py-2.5 hover:bg-luxury-black/85 transition-all">Subscribe</button>
          </form>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-luxury-black">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-8 flex items-center justify-between">
          <span className="text-[12px] tracking-[0.25em] text-white/30">{brand.fullName}</span>
          <p className="text-[11px] text-white/15 tracking-wider">© {new Date().getFullYear()}</p>
        </div>
      </footer>

      {/* ═══ ENQUIRY MODAL ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={open => { setEnquiryOpen(open); if (!open) setEnquirySent("idle"); }}>
        <DialogContent overlayClassName="!z-[110]" className="max-w-lg p-0 rounded-none border border-neutral-200 overflow-hidden shadow-xl !z-[110]">
          {enquirySent === "idle" && (
            <>
              <div className="p-5 pb-0">
                <div className="flex gap-3 mb-4 border border-neutral-100 overflow-hidden">
                  <img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover shrink-0" />
                  <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                    <DialogTitle className="text-[12px] font-medium text-luxury-black leading-tight line-clamp-2 uppercase tracking-[0.02em]">{p.title}</DialogTitle>
                    <DialogDescription className="text-[14px] text-luxury-black/80 font-medium mt-1">{p.priceFormatted}</DialogDescription>
                    <span className="text-[10px] text-luxury-black/35 font-mono tracking-[0.05em] mt-0.5">REF-{p.ref}</span>
                  </div>
                </div>
              </div>
              <form className="p-5 pt-1 space-y-2.5" onSubmit={e => { e.preventDefault(); setEnquirySent("thanks"); setTimeout(() => setEnquirySent("suggestions"), 5000); }}>
                <input type="text" placeholder="Full name" className="w-full border border-neutral-200 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors" />
                <input type="email" placeholder="Email" className="w-full border border-neutral-200 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors" />
                <LuxuryPhoneInput />
                <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-200 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/25 focus:outline-none focus:border-luxury-black/30 transition-colors resize-none" />
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="checkbox" checked={wantVisit} onChange={e => setWantVisit(e.target.checked)} className="w-4 h-4 accent-luxury-black" />
                  <span className="text-[12px] text-luxury-black/60 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-luxury-black/35" /> Schedule a visit</span>
                </label>
                {wantVisit && (
                  <div className="space-y-2 bg-neutral-50 border border-neutral-100 p-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className={cn("w-full flex items-center gap-2 border border-neutral-200 px-4 py-2.5 text-[14px] bg-white", !visitDate && "text-luxury-black/30")}>
                          <CalendarDays className="w-4 h-4 text-luxury-black/30 shrink-0" />
                          {visitDate ? format(visitDate, "PPP") : "Select date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={d => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <select value={visitTime} onChange={e => setVisitTime(e.target.value)} className="w-full border border-neutral-200 px-4 py-2.5 text-[14px] bg-white appearance-none cursor-pointer focus:outline-none">
                      <option value="" disabled>Select time</option>
                      {["09:00","10:00","11:00","12:00","16:00","17:00","18:00"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 accent-luxury-black" />
                  <span className="text-[11px] text-luxury-black/40 leading-relaxed">I accept the <a href="#" className="underline">privacy policy</a>.</span>
                </label>
                <button type="submit" className="w-full bg-luxury-black text-white text-[12px] tracking-[0.12em] uppercase py-3 hover:bg-luxury-black/85 transition-all mt-1">Send Enquiry</button>
              </form>
            </>
          )}
          {enquirySent === "thanks" && (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-luxury-gold" />
              </div>
              <DialogTitle className="text-[18px] font-medium text-luxury-black mb-1">Thank You</DialogTitle>
              <DialogDescription className="text-[13px] text-luxury-black/45 font-light">An advisor will contact you within 24 hours.</DialogDescription>
            </div>
          )}
          {enquirySent === "suggestions" && (
            <div className="p-5">
              <DialogTitle className="sr-only">Suggestions</DialogTitle>
              <DialogDescription className="sr-only">Similar properties</DialogDescription>
              <p className="text-[11px] tracking-[0.15em] uppercase text-luxury-black/40 font-medium mb-3">You May Also Like</p>
              <div className="space-y-2">
                {SIMILAR.map((s, i) => (
                  <Link key={i} to={s.href} onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="flex gap-3 border border-neutral-100 overflow-hidden hover:bg-neutral-50 transition-all group">
                    <img src={s.image} alt={s.name} className="w-20 h-16 object-cover shrink-0" />
                    <div className="py-1.5 pr-3 flex flex-col justify-center min-w-0">
                      <p className="text-[12px] font-medium text-luxury-black line-clamp-1">{s.name}</p>
                      <p className="text-[10px] text-luxury-black/40">{s.location}</p>
                      <p className="text-[14px] font-light text-luxury-black mt-0.5">{s.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <button onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="w-full mt-4 border border-neutral-200 text-luxury-black text-[11px] tracking-[0.1em] uppercase py-2.5 hover:bg-neutral-50 transition-all">Close</button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ LANGUAGE ═══ */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-sm p-5 rounded-none border border-neutral-200">
          <DialogTitle className="text-[10px] tracking-[0.18em] uppercase text-luxury-black/35 mb-4">Language</DialogTitle>
          <DialogDescription className="sr-only">Choose language</DialogDescription>
          <div className="grid grid-cols-3 gap-2">
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }} className={cn("flex flex-col items-center gap-1.5 py-3 text-[12px] border transition-colors", currentLang === lang.code ? "border-luxury-black/20 bg-neutral-50 font-medium" : "border-transparent text-luxury-black/45 hover:bg-neutral-50")}>
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-8 h-6 object-cover rounded-[2px]" />
                {lang.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ MOBILE STICKY BAR ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex">
        <a href={`tel:${p.agency.phone}`} className="flex-1 flex flex-col items-center py-2.5 text-luxury-black">
          <Phone className="w-4 h-4" /><span className="text-[9px] tracking-[0.1em] uppercase mt-0.5">Call</span>
        </a>
        <div className="w-px bg-neutral-100" />
        <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center py-2.5 text-[#25D366]">
          <MessageCircle className="w-4 h-4" /><span className="text-[9px] tracking-[0.1em] uppercase mt-0.5">WhatsApp</span>
        </a>
        <div className="w-px bg-neutral-100" />
        <button onClick={() => setEnquiryOpen(true)} className="flex-1 flex flex-col items-center py-2.5 text-luxury-black">
          <Mail className="w-4 h-4" /><span className="text-[9px] tracking-[0.1em] uppercase mt-0.5">Enquiry</span>
        </button>
      </div>

      {/* ═══ CHATBOT ═══ */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed z-50 w-12 h-12 rounded-full bg-luxury-black text-white shadow-lg flex items-center justify-center hover:bg-luxury-black/85 transition-all bottom-[65px] right-4 lg:bottom-5 lg:right-5" aria-label="Chat">
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
      {chatOpen && (
        <div className="fixed z-50 bg-white border border-neutral-200 shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-5 lg:right-5 lg:w-[360px] lg:h-[480px] lg:rounded-lg lg:overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
            <span className="text-[12px] tracking-[0.1em] text-luxury-black">{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="text-luxury-black/30 hover:text-luxury-black transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-100">
            <img src={p.images[0]} alt="" className="w-14 h-10 rounded object-cover" />
            <div>
              <p className="text-[12px] font-medium text-luxury-black truncate">Luxury Villa Ibiza</p>
              <p className="text-[14px] font-light text-luxury-black">{p.priceFormatted}</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-3 space-y-2.5">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3 py-2 rounded-lg", msg.role === "bot" ? "bg-neutral-100 text-luxury-black/75 mr-auto" : "bg-luxury-black text-white ml-auto")}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-100 px-3 py-2.5 flex items-center gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChatSend()} placeholder="Ask about this property..." className="flex-1 text-[13px] px-3 py-2 border border-neutral-200 rounded-full focus:outline-none focus:border-luxury-black/25 transition-colors" />
            <button onClick={handleChatSend} className="w-8 h-8 rounded-full bg-luxury-black text-white flex items-center justify-center shrink-0"><Send className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/40 text-[12px]">{lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/35 hover:text-white transition-colors"><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setLightbox(null)} className="text-white/35 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={onLbStart} onTouchEnd={onLbEnd}>
            {lightbox < p.images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/25 hover:text-white transition-colors"><ChevronLeft className="w-7 h-7" strokeWidth={1} /></button>}
                <img src={p.images[lightbox]} alt="" className="max-w-[90vw] max-h-full object-contain" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/25 hover:text-white transition-colors"><ChevronRight className="w-7 h-7" strokeWidth={1} /></button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20" />
                <div className="relative z-10 text-center px-6 max-w-md">
                  <h3 className="text-[20px] sm:text-[26px] font-light text-white tracking-[0.04em] uppercase mb-2">{p.title}</h3>
                  <p className="text-[12px] text-white/30 font-mono tracking-[0.05em] mb-1">REF-{p.ref}</p>
                  <p className="text-[22px] font-light text-white/80 mb-6">{p.priceFormatted}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><Phone className="w-3.5 h-3.5" /> Call</a>
                    <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                    <button onClick={() => setEnquiryOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/25 text-white text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-6 text-white/25 hover:text-white/50 text-[11px] tracking-[0.1em] uppercase flex items-center gap-1 mx-auto"><ChevronLeft className="w-3 h-3" /> Photos</button>
                </div>
              </div>
            )}
          </div>
          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-2.5 flex gap-1 overflow-x-auto justify-center">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={cn("w-[50px] h-[36px] shrink-0 overflow-hidden transition-all", i === lightbox ? "ring-1 ring-white opacity-100" : "opacity-30 hover:opacity-60")}>
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
            <span className="text-white/40 text-[12px]">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/35 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group">
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>
          <div className="px-6 py-8 text-center shrink-0">
            <h3 className="text-[16px] font-light text-white/80 tracking-[0.04em] uppercase mb-1">{p.title}</h3>
            <p className="text-[11px] text-white/25 font-mono mb-5">REF-{p.ref}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
              <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><Phone className="w-3.5 h-3.5" /> Call</a>
              <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
              <button onClick={() => { setGridView(false); setEnquiryOpen(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/25 text-white text-[11px] tracking-[0.1em] uppercase px-7 py-2.5"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden h-14" />

      <DetailPriceAlertModal open={priceAlertOpen} onOpenChange={setPriceAlertOpen} propertyRef={p.ref} propertyTitle={p.title} priceFormatted={p.priceFormatted} propertyImage={p.images[0]} propertyLocation={p.location} />
    </div>
  );
};

export default PropertyDetailV9;
