import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Phone, Fence, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Grid3X3, Car, Shield, Sparkles, Clock,
  ArrowRight, MessageCircle, Send, ChevronRight as ChevRight,
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
  title: "Stunning Contemporary Villa with Panoramic Sea Views",
  subtitle: "An architectural masterpiece on the Mediterranean coast",
  breadcrumb: ["Home", "Ibiza", "Santa Eulalia del Río", "Contemporary Villa"],
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
  description: `This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.

The ground floor features a grand open-plan living area with floor-to-ceiling windows, a designer kitchen with Gaggenau appliances, and direct access to the infinity pool terrace. The master suite occupies a private wing with a spa-inspired bathroom, walk-in dressing room, and a private terrace.

Upstairs, four additional en-suite bedrooms each enjoy their own terrace and sea views. The lower level houses a home cinema, wine cellar, gym, and staff quarters. Surrounded by mature Mediterranean gardens with automated irrigation, the property includes a double garage, solar panels, and state-of-the-art home automation.`,
  features: [
    "Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar",
    "Gym", "Solar Panels", "Smart Home", "Underfloor Heating",
    "Air Conditioning", "Alarm System", "Double Garage", "Garden",
    "Terrace", "Staff Quarters", "Elevator", "Laundry Room",
  ],
  highlights: [
    "Panoramic sea views over the Mediterranean and Formentera",
    "Infinity pool with sunset terrace",
    "Floor-to-ceiling windows throughout",
    "Contemporary architecture by award-winning studio",
  ],
  agency: {
    name: brand.fullName,
    phone: "+34 600 123 456",
    whatsapp: "34600123456",
    email: "info@prestigeestates.com",
  },
};

const SIMILAR = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, tag: "FOR SALE", href: "/property2/3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, tag: "FOR SALE", href: "/property2/3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, tag: "FOR SALE", href: "/property2/3003" },
];

/* ─── Component ─── */
const PropertyDetailV2 = () => {
  const [currentImage, setCurrentImage] = useState(0);
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
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm here to help you with any questions about this property. How can I assist you?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const isMobile = useIsMobile();
  const p = PROPERTY;

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (Math.abs(dx) > 50) { dx < 0 ? setHeroSlide(s => Math.min(s + 1, p.images.length - 1)) : setHeroSlide(s => Math.max(s - 1, 0)); }
    touchStart.current = null;
  }, [p.images.length]);

  const lbTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleLbTouchStart = useCallback((e: React.TouchEvent) => { lbTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, []);
  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!lbTouchStart.current) return;
    const dx = e.changedTouches[0].clientX - lbTouchStart.current.x;
    if (Math.abs(dx) > 50) { dx < 0 ? setLightbox(prev => prev !== null ? Math.min(prev + 1, p.images.length) : null) : setLightbox(prev => prev !== null ? Math.max(prev - 1, 0) : null); }
    lbTouchStart.current = null;
  }, [p.images.length]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => { setChatMessages(prev => [...prev, { role: "bot", text: `Thank you for your interest. An advisor will follow up shortly.` }]); }, 1000);
  };

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans">
      <SEOHead title={p.title} description={p.subtitle} type="article" />

      {/* ─── NAVBAR (V6 pattern) ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10 h-[60px] md:h-[68px]">
          <div className="flex items-center gap-6 lg:gap-10 flex-1">
            <button className="lg:hidden text-luxury-black/70" onClick={() => setMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/50 hover:text-luxury-black transition-colors">
                <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                <span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span>
              </button>
              {navLeft.map(l => <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>)}
            </div>
          </div>
          <Link to="/" className="flex flex-col items-center shrink-0">
            <span className="text-base md:text-lg lg:text-xl tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-light text-luxury-black/40">{brand.subtitle}</span>
          </Link>
          <div className="flex items-center justify-end gap-6 lg:gap-10 flex-1">
            <div className="hidden lg:flex items-center gap-10">
              {navRight.map(l => <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors">{l.label}</Link>)}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 md:px-6 h-[60px] md:h-[68px] border-b border-neutral-100 shrink-0">
            <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6 text-luxury-black/70" /></button>
            <Link to="/" className="flex flex-col items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-base md:text-lg tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
              <span className="text-[9px] tracking-[0.35em] uppercase font-light text-luxury-black/40">{brand.subtitle}</span>
            </Link>
            <div className="w-6" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-10">
            {[...navLeft, ...navRight].map(item => (
              <Link key={item.label} to={item.href} className="text-[18px] tracking-[0.15em] uppercase font-light py-4 text-luxury-black/80 border-b border-neutral-100 last:border-b-0 hover:text-luxury-black transition-colors text-center" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
            ))}
          </div>
          <div className="px-10 py-6 border-t border-neutral-100 shrink-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/40 font-medium mb-3 text-center">Language</p>
            <div className="flex flex-wrap justify-center gap-2">
              {languages.map(lang => (
                <button key={lang.code} onClick={() => setCurrentLang(lang.code)} className={`flex items-center gap-1.5 px-3 py-2 text-[12px] rounded-sm border transition-colors ${currentLang === lang.code ? "border-luxury-black/30 bg-neutral-50 font-medium text-luxury-black" : "border-neutral-200 font-light text-luxury-black/55"}`}>
                  <img src={`https://flagcdn.com/20x15/${lang.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />{lang.code}
                </button>
              ))}
            </div>
          </div>
          <div className="px-10 pb-4 shrink-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/40 font-medium mb-3 text-center">Currency</p>
            <div className="flex flex-wrap justify-center gap-2">
              {currencies.map(cur => (
                <button key={cur.code} onClick={() => setCurrentCurrency(cur.code)} className={`px-3 py-2 text-[12px] rounded-sm border transition-colors ${currentCurrency === cur.code ? "border-luxury-black/30 bg-neutral-50 font-medium text-luxury-black" : "border-neutral-200 font-light text-luxury-black/55"}`}>{cur.label}</button>
              ))}
            </div>
          </div>
          <div className="px-10 pb-6 shrink-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-black/40 font-medium mb-3 text-center">Units</p>
            <div className="flex flex-wrap justify-center gap-2">
              {areaUnits.map(u => (
                <button key={u.code} onClick={() => setCurrentUnit(u.code)} className={`px-3 py-2 text-[12px] rounded-sm border transition-colors ${currentUnit === u.code ? "border-luxury-black/30 bg-neutral-50 font-medium text-luxury-black" : "border-neutral-200 font-light text-luxury-black/55"}`}>{u.label}</button>
              ))}
            </div>
          </div>
          <div className="px-10 pb-8 flex flex-col items-center gap-4 shrink-0">
            <a href={`tel:${p.agency.phone}`} className="w-full flex items-center justify-center gap-2 bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3.5"><Phone className="w-4 h-4" /> Call Us</a>
          </div>
        </div>
      )}

      {/* ═══ HERO GALLERY ═══ */}
      <section>
        {/* Mobile swipe */}
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {p.images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`${p.title} — ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full">{heroSlide + 1} / {p.images.length}</div>
        </div>
        {/* Mobile actions bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-3.5">
            {p.hasVideo && <button className="flex items-center gap-1.5 text-[13px] text-luxury-black/70 font-medium"><Play className="w-4 h-4" /> Video</button>}
            <Link to="/pdf-v2" target="_blank" className="flex items-center gap-1.5 text-[13px] text-luxury-black/70 font-medium"><FileDown className="w-4 h-4" /> PDF</Link>
          </div>
          <div className="flex items-center gap-3.5">
            <button className="text-luxury-black/50"><Share2 className="w-[18px] h-[18px]" /></button>
            <button onClick={() => setLiked(!liked)} className={liked ? "text-luxury-black" : "text-luxury-black/50"}><Heart className="w-[18px] h-[18px]" fill={liked ? "currentColor" : "none"} /></button>
          </div>
        </div>

        {/* Desktop: Main image + thumbnails (V2's unique layout) */}
        <div className="hidden lg:block max-w-[1400px] mx-auto px-6 lg:px-10 pt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100 cursor-pointer group" onClick={() => setLightbox(currentImage)}>
                <img src={p.images[currentImage]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {p.hasVideo && <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 bg-luxury-black/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5"><Play className="w-3 h-3" fill="currentColor" /> Video</button>}
                  {p.hasVirtualTour && <button onClick={e => e.stopPropagation()} className="flex items-center gap-1 bg-luxury-black/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5"><View className="w-3 h-3" /> 360°</button>}
                </div>
                <span className="absolute bottom-3 left-3 bg-luxury-black/60 text-white text-[12px] px-2 py-1 font-light">{currentImage + 1}/{p.images.length}</span>
                <button onClick={e => { e.stopPropagation(); setCurrentImage((currentImage - 1 + p.images.length) % p.images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={e => { e.stopPropagation(); setCurrentImage((currentImage + 1) % p.images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-4 h-4" /></button>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm"><Share2 className="w-3.5 h-3.5" /> Share</button>
                  <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} className={`flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm ${liked ? "bg-luxury-black text-white" : "bg-white/90 text-luxury-black"}`}><Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} /> Save</button>
                </div>
              </div>
              <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
                {p.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)} className={`shrink-0 w-[72px] h-[52px] overflow-hidden transition-all ${i === currentImage ? "ring-2 ring-luxury-black opacity-100" : "opacity-50 hover:opacity-80"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div className="col-span-5">
              <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 lg:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{p.tag}</span>
                  <span className="font-mono text-luxury-black/45 tracking-wide text-[12px]">REF-{p.ref}</span>
                </div>
                <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">{p.location}</p>
                <p className="text-[13px] text-luxury-black/55 font-light mb-2">Detached houses <span className="mx-1 text-luxury-black/30">|</span> <span className="italic">{p.style}</span></p>
                <h1 className="text-[19px] md:text-[22px] font-medium text-luxury-black leading-snug mb-2 uppercase">{p.title}</h1>
                <div className="flex items-center gap-7 mb-5">
                  {[{ l: "Beds", v: p.beds }, { l: "Baths", v: p.baths }, { l: "Built", v: `${p.sqm} m²` }, { l: "Plot", v: `${p.plot.toLocaleString()} m²` }].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">{s.l}</p>
                      <p className="text-[16px] text-luxury-black font-light">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-5 border-t border-neutral-100">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <p className="text-2xl md:text-[28px] font-extralight text-luxury-black tracking-tight">{p.priceFormatted}</p>
                    <span className="text-[14px] text-luxury-black/40 line-through font-light">{p.originalPrice}</span>
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
                  </div>
                  {p.alsoForRent && <p className="text-[13px] text-luxury-black/50 mt-1.5 flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-luxury-gold/70" /> Also for rent: <span className="font-medium text-luxury-black/70">{p.rentalPrice}</span></p>}
                  <div className="flex gap-2 mt-4">
                    <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase py-3"><Phone className="w-3.5 h-3.5" /> Call</a>
                    <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                  </div>
                  <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 mt-2 hover:bg-neutral-100 transition-all"><Mail className="w-3.5 h-3.5" /> Send Enquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline price for mobile */}
      <div className="lg:hidden px-4 pt-4">
        <p className="text-[13px] tracking-[0.12em] uppercase text-luxury-black/60 mb-1">{p.location}</p>
        <h1 className="text-[20px] sm:text-[24px] font-medium text-luxury-black leading-tight uppercase mb-1">{p.title}</h1>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <p className="text-[26px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
          <span className="text-[13px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
          <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-luxury-gold">-{p.discount}%</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[{ icon: Bed, l: "Beds", v: p.beds }, { icon: Bath, l: "Baths", v: p.baths }, { icon: Maximize, l: "Built", v: <>{p.sqm} m<sup>2</sup></> }, { icon: Fence, l: "Plot", v: <>{p.plot.toLocaleString()} m<sup>2</sup></> }].map((s, i) => (
            <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-2 text-center">
              <s.icon className="w-4 h-4 text-luxury-black/40 mx-auto mb-1" strokeWidth={1.5} />
              <p className="text-[14px] font-light text-luxury-black mb-0.5 leading-tight">{s.v}</p>
              <p className="text-[9px] tracking-[0.08em] uppercase text-luxury-black/60 font-medium">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 space-y-8">
            {/* Description */}
            <section className="border-t border-neutral-200 pt-6">
              <h2 className="text-[18px] font-medium text-luxury-black mb-4">About This Property</h2>
              <div className={`text-[14px] leading-[1.9] text-luxury-black/85 font-light whitespace-pre-line ${!expandDesc ? "line-clamp-[8]" : ""}`}>{p.description}</div>
              <button onClick={() => setExpandDesc(!expandDesc)} className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-luxury-black/75 hover:text-luxury-black font-medium transition-colors">
                {expandDesc ? "Show less" : "Read more"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandDesc ? "rotate-180" : ""}`} />
              </button>
            </section>

            {/* Features */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[14px] text-luxury-black/80 font-light"><Check className="w-3.5 h-3.5 text-luxury-black/50" strokeWidth={2} />{f}</div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-3">Location</h2>
              <p className="text-[13px] text-luxury-black/60 font-light mb-4 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.location}, {p.region}</p>
              <div className="bg-neutral-50 border border-neutral-200 h-[260px] flex items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm"><MapPin className="w-5 h-5 mr-1.5" /> Interactive Map</div>
            </section>

            <LuxuryNearbyPlaces />
            <section className="border-t border-neutral-100 pt-8">
              <div className="[&_section]:border-t-0 [&_section]:pt-0">
                <LuxuryMortgageCalculator />
              </div>
            </section>
          </div>

          {/* Right: Sticky price card (desktop only — duplicates summary card for scroll persistence) */}
          <aside className="hidden lg:block lg:col-span-5 lg:self-start">
            <div className="lg:sticky lg:top-[84px] bg-neutral-50 border border-neutral-200 rounded-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{p.tag}</span>
                <Popover>
                  <PopoverTrigger asChild><button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black"><FileDown className="w-3.5 h-3.5" /></button></PopoverTrigger>
                  <PopoverContent align="end" className="w-[180px] p-0 rounded-none border-luxury-black/10">
                    <Link to="/pdf-v1" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50">FICHA (1 PAGE)</Link>
                    <Link to="/pdf-v2" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 border-t border-neutral-100">CATÁLOGO (3 PAGES)</Link>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <p className="text-[32px] font-medium text-luxury-black tracking-tight leading-none">{p.priceFormatted}</p>
                <span className="text-[14px] text-luxury-black/35 line-through font-light">{p.originalPrice}</span>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
              </div>
              <p className="text-[12px] text-luxury-black/60 mb-1">{p.pricePerSqm}</p>
              {p.alsoForRent && <p className="text-[13px] text-luxury-black/60 mb-4 flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-luxury-gold/80" /> Also for rent: <span className="font-medium text-luxury-black/80">{p.rentalPrice}</span></p>}
              <div className="flex gap-2 mb-2">
                <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase py-3"><Phone className="w-3.5 h-3.5" /> Call</a>
                <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all mb-5"><Mail className="w-3.5 h-3.5" /> Send Enquiry</button>
              <div className="border-t border-neutral-200 pt-5">
                <p className="text-[13px] text-luxury-black/55 font-light text-center">Get in touch for a personal consultation.</p>
                <p className="text-[14px] text-luxury-black/70 font-mono text-center mt-3 tracking-[0.05em]">REF-{p.ref}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ─── SIMILAR PROPERTIES ─── */}
      <section className="border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <h2 className="text-xl font-light text-luxury-black tracking-tight mb-8">Similar Properties You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="group border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[11px] tracking-[0.15em] uppercase bg-white/90 text-luxury-black px-2.5 py-1 font-medium">{s.tag}</span>
                </div>
                <div className="p-5">
                  <p className="text-[12px] tracking-[0.14em] uppercase text-luxury-black/55 mb-1">{s.location}</p>
                  <h3 className="text-[15px] font-medium text-luxury-black mb-3">{s.name}</h3>
                  <div className="flex items-center gap-5 mb-3 text-[13px] text-luxury-black/60 font-light"><span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span></div>
                  <p className="text-xl font-extralight text-luxury-black tracking-tight">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-luxury-black">Get Luxury Trends & Tips</h2>
              <p className="text-[13px] text-luxury-black/55 font-light mt-2">Receive our top picks delivered to your inbox each week.</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="w-full border border-neutral-300 px-4 py-3 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40" />
              <button type="submit" className="bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 w-full">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── RECENTLY VIEWED ─── */}
      <section className="border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <p className="text-[14px] font-normal text-luxury-black mb-4">Recently Viewed</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...SIMILAR, ...SIMILAR].slice(0, 5).map((s, i) => (
              <Link key={i} to={s.href} className="shrink-0 w-[150px] group">
                <div className="relative overflow-hidden aspect-[4/3] mb-1.5"><img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <p className="text-[12px] text-luxury-black/85 font-light leading-snug line-clamp-2">{s.name}</p>
                <p className="text-[13px] font-normal text-luxury-black mt-0.5">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-luxury-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm tracking-[0.25em] text-white/40 font-light">{brand.fullName}</span>
            <p className="text-[12px] text-white/20 tracking-wider font-light">© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══ ENQUIRY MODAL (V6 pattern) ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={open => { setEnquiryOpen(open); if (!open) setEnquirySent("idle"); }}>
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
              <form className="p-6 pt-2 space-y-3" onSubmit={e => { e.preventDefault(); setEnquirySent("thanks"); setTimeout(() => setEnquirySent("suggestions"), 5000); }}>
                <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
                <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 rounded-sm" />
                <LuxuryPhoneInput />
                <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 resize-none rounded-sm" />
                <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                  <input type="checkbox" checked={wantVisit} onChange={e => setWantVisit(e.target.checked)} className="w-4 h-4 accent-luxury-black" />
                  <span className="text-[13px] text-luxury-black/70 font-light flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-luxury-black/40" /> I'd like to schedule a visit</span>
                </label>
                {wantVisit && (
                  <div className="space-y-2 bg-neutral-50 border border-neutral-200 p-3 rounded-sm">
                    <p className="text-[11px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-1">Preferred Date & Time</p>
                    <Popover><PopoverTrigger asChild><button type="button" className={cn("w-full flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[14px] text-left rounded-sm bg-white", !visitDate && "text-luxury-black/35")}><CalendarDays className="w-4 h-4 text-luxury-black/35 shrink-0" />{visitDate ? format(visitDate, "PPP") : "Select a date"}</button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={d => d < new Date()} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
                    <select value={visitTime} onChange={e => setVisitTime(e.target.value)} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] appearance-none cursor-pointer focus:outline-none rounded-sm bg-white"><option value="" disabled>Select a time</option>{["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map(t => <option key={t} value={t}>{t}</option>)}</select>
                  </div>
                )}
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" className="mt-1 accent-luxury-black" /><span className="text-[12px] text-luxury-black/55 font-light">I accept the <Link to="/page/terms" className="underline">terms</Link> and <Link to="/page/privacy" className="underline">privacy policy</Link>.</span></label>
                <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3">{wantVisit ? "Request Visit" : "Send Enquiry"}</button>
              </form>
            </>
          )}
          {(enquirySent === "thanks" || enquirySent === "suggestions") && (
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <DialogTitle className="sr-only">Enquiry sent</DialogTitle>
              <DialogDescription className="sr-only">Thank you</DialogDescription>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-luxury-gold" strokeWidth={1.5} /></div>
                <h3 className="text-[18px] font-medium text-luxury-black mb-1">Thank You!</h3>
                <p className="text-[13px] text-luxury-black/60 font-light">Your enquiry for <span className="font-medium text-luxury-black/80">{p.title}</span> has been received.</p>
                <p className="text-[11px] text-luxury-black/35 font-mono mt-1">REF-{p.ref}</p>
              </div>
              {enquirySent === "thanks" && <div className="flex items-center justify-center gap-1.5 text-luxury-black/30 py-4"><div className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60 animate-pulse" /><span className="text-[12px] font-light">Finding similar properties…</span></div>}
              {enquirySent === "suggestions" && (
                <>
                  <div className="border-t border-neutral-200 pt-4 mb-3"><p className="text-[14px] font-medium text-luxury-black mb-1">You May Also Like</p></div>
                  <div className="space-y-2.5">
                    {SIMILAR.map((s, i) => (
                      <Link key={i} to={s.href} onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); setGridView(false); setLightbox(null); }} className="flex gap-3 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:bg-neutral-100 transition-all group">
                        <img src={s.image} alt={s.name} className="w-24 h-18 object-cover shrink-0" />
                        <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                          <p className="text-[11px] text-luxury-black/50 font-light">{s.location}</p>
                          <p className="text-[13px] font-medium text-luxury-black line-clamp-1">{s.name}</p>
                          <p className="text-[15px] font-light text-luxury-black mt-1">{s.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button onClick={() => { setEnquiryOpen(false); setEnquirySent("idle"); }} className="w-full mt-5 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all">Back to Property</button>
                </>
              )}
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
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }} className={`flex flex-col items-center gap-2 px-3 py-4 rounded-sm text-[13px] border transition-colors ${currentLang === lang.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent font-light hover:bg-neutral-50"}`}>
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" /><span>{lang.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ MOBILE STICKY CONTACT BAR ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-0">
        <a href={`tel:${p.agency.phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black"><Phone className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span></a>
        <div className="w-px h-8 bg-neutral-200" />
        <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366]"><MessageCircle className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span></a>
        <div className="w-px h-8 bg-neutral-200" />
        <button onClick={() => setEnquiryOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-luxury-black"><Mail className="w-4 h-4" /><span className="text-[10px] tracking-[0.1em] uppercase font-medium">Enquiry</span></button>
      </div>

      {/* ═══ CHATBOT ═══ */}
      {!chatOpen && <button onClick={() => setChatOpen(true)} className="fixed z-50 w-14 h-14 rounded-full bg-luxury-black text-white shadow-lg flex items-center justify-center bottom-[72px] right-4 lg:bottom-6 lg:right-6"><MessageCircle className="w-5 h-5" /></button>}
      {chatOpen && (
        <div className="fixed z-50 bg-white border border-neutral-200 shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
            <span className="text-[13px] font-medium text-luxury-black">{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="text-luxury-black/40 hover:text-luxury-black"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
            <div className="w-16 h-12 rounded overflow-hidden shrink-0"><img src={p.images[0]} alt="" className="w-full h-full object-cover" /></div>
            <div className="min-w-0"><p className="text-[13px] font-medium text-luxury-black truncate">{p.title}</p><p className="text-[15px] font-light text-luxury-black">{p.priceFormatted}</p></div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg", msg.role === "bot" ? "bg-neutral-100 text-luxury-black/80 mr-auto" : "bg-luxury-black text-white ml-auto")}>{msg.text}</div>)}
          </div>
          <div className="border-t border-neutral-200 px-3 py-3 flex items-center gap-2">
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChatSend()} placeholder="Ask about this property..." className="flex-1 text-[13px] px-3 py-2 border border-neutral-200 rounded-full focus:outline-none focus:border-luxury-black/30" />
            <button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center rounded-full bg-luxury-black text-white shrink-0"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* ═══ FULLSCREEN LIGHTBOX (V6 pattern) ═══ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px] font-light">{lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/50 hover:text-white"><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
            {lightbox < p.images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white"><ChevronLeft className="w-8 h-8" strokeWidth={1} /></button>}
                <img src={p.images[lightbox]} alt={`Photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white"><ChevronRight className="w-8 h-8" strokeWidth={1} /></button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <h3 className="text-[22px] sm:text-[28px] font-light text-white tracking-[0.04em] uppercase mb-2">{p.title}</h3>
                  <p className="text-[13px] text-white/35 font-mono mb-2">REF-{p.ref}</p>
                  <p className="text-[24px] font-light text-white/90 mb-8">{p.priceFormatted}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Phone className="w-3.5 h-3.5" /> Call</a>
                    <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                    <button onClick={() => setEnquiryOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] tracking-[0.1em] uppercase flex items-center gap-1 mx-auto"><ChevronLeft className="w-3.5 h-3.5" /> Back to photos</button>
                </div>
              </div>
            )}
          </div>
          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {p.images.map((img, i) => <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] shrink-0 overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>)}
            </div>
          )}
        </div>
      )}

      {/* ─── GRID VIEW ─── */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/50 text-[13px] font-light">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
            {p.images.map((img, i) => <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group"><img src={img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /><div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" /><span className="absolute bottom-2 left-2 text-white/70 text-[11px] font-light">{i + 1}</span></button>)}
          </div>
          <div className="px-4 sm:px-8 py-10 text-center shrink-0">
            <h3 className="text-[18px] font-light text-white/90 uppercase mb-2">{p.title}</h3>
            <p className="text-[13px] text-white/40 font-mono mb-6">REF-{p.ref}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={`tel:${p.agency.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-luxury-black text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Phone className="w-3.5 h-3.5" /> Call</a>
              <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
              <button onClick={() => { setGridView(false); setEnquiryOpen(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3"><Mail className="w-3.5 h-3.5" /> Enquiry</button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden h-16" />
    </div>
  );
};

export default PropertyDetailV2;
