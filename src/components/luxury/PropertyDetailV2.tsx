import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight,
  X, Check, Car, Fence, Phone, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Shield, Sparkles, Clock,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { brand, navLeft, navRight } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
import LuxuryPhoneInput from "./LuxuryPhoneInput";
import LuxuryMortgageCalculator from "./LuxuryMortgageCalculator";
import LuxuryNearbyPlaces from "./LuxuryNearbyPlaces";
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
  breadcrumb: ["Spain", "Balearic Islands", "Ibiza", "Santa Eulalia del Río"],
  price: "€4,650,000",
  originalPrice: "€5,200,000",
  discount: 11,
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
    { icon: Star, label: "Exclusive", detail: "Exclusive property" },
    { icon: Shield, label: "Gated Community", detail: "24/7 security" },
    { icon: Sparkles, label: "Newly Built", detail: "Completed 2023" },
    { icon: Clock, label: "Turnkey", detail: "Move-in ready" },
  ],
  agent: {
    name: "Isabella Martínez",
    role: "Senior Property Advisor",
    phone: "+34 600 123 456",
    email: "isabella@prestigeestates.com",
  },
};

const SIMILAR = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, style: "Luxury", tag: "FOR SALE", ref: "PE-IBZ-3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, style: "Modern", tag: "FOR SALE", ref: "PE-IBZ-3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, style: "Traditional", tag: "FOR SALE", ref: "PE-IBZ-3003" },
];

/* ─── Component ─── */
const PropertyDetailV2 = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [expandDesc, setExpandDesc] = useState(false);
  const [wantVisit, setWantVisit] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState("");

  const p = PROPERTY;

  return (
    <div className="flex-1 overflow-auto bg-white text-luxury-black font-sans">
      <SEOHead
        title={p.title}
        description={p.subtitle}
        type="article"
      />

      {/* ─── NAVBAR (same as /properties) ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center px-6 lg:px-10 h-[68px]">
          <div className="hidden lg:flex items-center gap-10">
            <button className="text-luxury-black/50 hover:text-luxury-black transition-colors duration-300">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
            </button>
            {navLeft.map((l) => (
              <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors duration-300">{l.label}</Link>
            ))}
          </div>
          <div className="lg:hidden" />
          <Link to="/" className="flex flex-col items-center justify-center">
            <span className="text-lg md:text-xl tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
            <span className="text-[10px] tracking-[0.35em] uppercase font-light text-luxury-black/40">{brand.subtitle}</span>
          </Link>
          <div className="flex items-center justify-end gap-8">
            <div className="hidden lg:flex items-center gap-10">
              {navRight.map((l) => (
                <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors duration-300">{l.label}</Link>
              ))}
            </div>
            <button className="lg:hidden text-luxury-black/70">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── BREADCRUMB BAR ─── */}
      <div className="sticky top-[68px] z-40 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[13px] tracking-[0.04em] text-luxury-black/60 font-normal">
              <Link to="/" className="hover:text-luxury-black transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-luxury-black/35" />
              <Link to="/properties" className="hover:text-luxury-black transition-colors">Properties</Link>
              <ChevronRight className="w-3 h-3 text-luxury-black/35" />
              <span className="text-luxury-black font-medium">{p.breadcrumb[p.breadcrumb.length - 1]}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLiked(!liked)} className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${liked ? "bg-luxury-black text-white border-luxury-black" : "border-neutral-200 text-luxury-black/40 hover:text-luxury-black hover:border-neutral-400"}`}>
                <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black hover:border-neutral-400 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black hover:border-neutral-400 transition-all">
                    <FileDown className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[180px] p-0 rounded-none border-luxury-black/10">
                  <Link to="/pdf-v1" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors">FICHA (1 PAGE)</Link>
                  <Link to="/pdf-v2" target="_blank" className="block px-4 py-3 text-[11px] tracking-wider text-luxury-black hover:bg-neutral-50 transition-colors border-t border-neutral-100">CATÁLOGO (3 PAGES)</Link>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">

        {/* ─── TOP: IMAGE GALLERY + SUMMARY CARD ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

          {/* Gallery — left */}
          <div className="lg:col-span-7">
            {/* Main image */}
            <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100 cursor-pointer group" onClick={() => setLightbox(currentImage)}>
              <img src={p.images[currentImage]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {p.hasVideo && (
                  <a href={p.videoUrl} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 bg-luxury-black/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5">
                    <Play className="w-3 h-3" fill="currentColor" /> Video
                  </a>
                )}
                {p.hasVirtualTour && (
                  <a href={p.virtualTourUrl} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 bg-luxury-black/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5">
                    <View className="w-3 h-3" /> 360°
                  </a>
                )}
              </div>
              <span className="absolute bottom-3 left-3 bg-luxury-black/60 text-white text-[12px] px-2 py-1 font-light">
                {currentImage + 1}/{p.images.length}
              </span>
              {/* Arrows */}
              <button onClick={(e) => { e.stopPropagation(); setCurrentImage((currentImage - 1 + p.images.length) % p.images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-4 h-4 text-luxury-black" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentImage((currentImage + 1) % p.images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 text-luxury-black" />
              </button>
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`shrink-0 w-[72px] h-[52px] overflow-hidden transition-all ${i === currentImage ? "ring-2 ring-luxury-black opacity-100" : "opacity-50 hover:opacity-80"}`}
                >
                  <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Summary card — right (matches listing card style) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 lg:p-8 h-full flex flex-col">
              {/* Tag + ref */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{p.tag}</span>
                <span className="font-mono text-luxury-black/45 tracking-wide text-[12px]">REF-{p.ref}</span>
              </div>

              {/* Location */}
              <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">{p.breadcrumb.join(" · ")}</p>
              <p className="text-[13px] text-luxury-black/55 font-light mb-2">
                Detached houses <span className="mx-1 text-luxury-black/30">|</span> <span className="italic">{p.style}</span>
              </p>

              {/* Title */}
              <h1 className="text-[19px] md:text-[22px] font-medium text-luxury-black leading-snug mb-2 uppercase">
                {p.title}
              </h1>
              <p className="text-[14px] text-luxury-black/60 font-light leading-relaxed mb-5 line-clamp-2">
                {p.subtitle}
              </p>

              {/* Specs — same style as listing card */}
              <div className="flex items-center gap-7 mb-5">
                <div className="text-center">
                  <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Beds</p>
                  <p className="text-[16px] text-luxury-black font-light">{p.beds}</p>
                </div>
                <div className="text-center">
                  <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Baths</p>
                  <p className="text-[16px] text-luxury-black font-light">{p.baths}</p>
                </div>
                <div className="text-center">
                  <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Built</p>
                  <p className="text-[16px] text-luxury-black font-light">{p.sqm} m²</p>
                </div>
                <div className="text-center">
                  <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Plot</p>
                  <p className="text-[16px] text-luxury-black font-light">{p.plot.toLocaleString()} m²</p>
                </div>
              </div>

              {/* Feature dots */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {p.features.slice(0, 6).map((f, i) => (
                  <span key={i} className="text-[12px] text-luxury-black/55 font-light flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-luxury-black/30" />
                    {f}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="mt-auto pt-5 border-t border-neutral-100">
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="text-2xl md:text-[28px] font-extralight text-luxury-black tracking-tight">{p.price}</p>
                  <span className="text-[14px] text-luxury-black/40 line-through font-light">{p.originalPrice}</span>
                  <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-luxury-gold bg-luxury-gold/10 px-2 py-0.5">-{p.discount}%</span>
                </div>
                {p.alsoForRent && (
                  <p className="text-[13px] text-luxury-black/50 mt-1.5 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-luxury-gold/70" /> Also for rent: <span className="font-medium text-luxury-black/70">{p.rentalPrice}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── HIGHLIGHTS CHIPS ─── */}
        <div className="flex flex-wrap gap-2.5 mb-8 pb-8 border-b border-neutral-200">
          {p.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-[13px]">
              <h.icon className="w-3.5 h-3.5 text-luxury-black/40" strokeWidth={1.5} />
              <span className="text-luxury-black/70 font-light">{h.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-[13px]">
            <span className="text-luxury-black/50 font-light">Energy: <strong className="font-medium text-luxury-black/70">{p.energyClass}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-[13px]">
            <span className="text-luxury-black/50 font-light">Year: <strong className="font-medium text-luxury-black/70">{p.year}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-[13px]">
            <Car className="w-3.5 h-3.5 text-luxury-black/40" strokeWidth={1.5} />
            <span className="text-luxury-black/50 font-light">Garage: <strong className="font-medium text-luxury-black/70">{p.garage}</strong></span>
          </div>
        </div>

        {/* ─── BODY: DESCRIPTION + SIDEBAR ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: Description + Features + Map */}
          <div className="lg:col-span-7 space-y-8">

            {/* Description */}
            <div>
              <h2 className="text-[15px] font-medium text-luxury-black mb-4">Property Description</h2>
              <div className={`text-[14px] leading-[1.85] text-luxury-black/75 font-light whitespace-pre-line ${!expandDesc ? "line-clamp-6" : ""}`}>
                {p.description}
              </div>
              <button
                onClick={() => setExpandDesc(!expandDesc)}
                className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-luxury-black/60 hover:text-luxury-black font-medium transition-colors"
              >
                {expandDesc ? "Show less" : "Read more"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandDesc ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-neutral-200 pt-8">
              <h2 className="text-[15px] font-medium text-luxury-black mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[14px] text-luxury-black/70 font-light">
                    <Check className="w-3.5 h-3.5 text-luxury-black/35" strokeWidth={2} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-neutral-200 pt-8">
              <h2 className="text-[15px] font-medium text-luxury-black mb-3">Location</h2>
              <p className="text-[13px] text-luxury-black/60 font-light mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-luxury-black/40" /> {p.breadcrumb.join(" · ")}
              </p>
              <div className="bg-neutral-50 border border-neutral-200 h-[260px] flex items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm">
                <MapPin className="w-5 h-5 mr-1.5" /> Interactive Map
              </div>
            </div>

            {/* Nearby & Mortgage */}
            <LuxuryNearbyPlaces />
            <LuxuryMortgageCalculator />
          </div>

          {/* Right: Agent contact form */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px] space-y-5">
              <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6">
                <h3 className="text-[15px] font-medium text-luxury-black mb-1">{p.agent.name}</h3>
                <p className="text-[13px] text-luxury-black/55 font-light mb-5">{p.agent.role}</p>

                <form className="space-y-3 mb-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors rounded-sm" />
                  <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors rounded-sm" />
                  <LuxuryPhoneInput />
                  <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors resize-none rounded-sm" />

                  {/* Schedule visit */}
                  <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                    <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-neutral-300 rounded accent-luxury-black" />
                    <span className="text-[13px] text-luxury-black/70 font-light flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-luxury-black/40" />
                      I'd like to schedule a visit
                    </span>
                  </label>

                  {wantVisit && (
                    <div className="space-y-2 bg-white border border-neutral-200 p-3 rounded-sm">
                      <p className="text-[11px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-1">Preferred Date & Time</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-full flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[14px] text-left transition-all hover:border-luxury-black/40 rounded-sm",
                              !visitDate && "text-luxury-black/35"
                            )}
                          >
                            <CalendarDays className="w-4 h-4 text-luxury-black/35 shrink-0" />
                            {visitDate ? format(visitDate, "PPP") : "Select a date"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                      <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black appearance-none cursor-pointer focus:outline-none focus:border-luxury-black/40 transition-all rounded-sm">
                        <option value="" disabled>Select a time</option>
                        {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-luxury-black" />
                    <span className="text-[12px] text-luxury-black/55 font-light leading-relaxed">
                      I accept the <a href="#" className="underline hover:text-luxury-black">terms</a> and <a href="#" className="underline hover:text-luxury-black">privacy policy</a>.
                    </span>
                  </label>
                  <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85 transition-all duration-300">
                    {wantVisit ? "Request Visit" : "Send Enquiry"}
                  </button>
                </form>

                <a href={`tel:${p.agent.phone}`} className="flex items-center justify-center gap-2 text-luxury-black/70 text-[13px] tracking-[0.1em] uppercase py-3 w-full hover:bg-neutral-100 transition-all duration-300 font-light border border-neutral-200 rounded-sm">
                  <Phone className="w-4 h-4" /> Call Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── SIMILAR PROPERTIES (listing card style) ─── */}
      <section className="border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <h2 className="text-xl font-light text-luxury-black tracking-tight mb-6">Similar Properties</h2>
          <div className="space-y-6">
            {SIMILAR.map((s, i) => (
              <a key={i} href="#" className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[200px]">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
                </div>
                <div className="md:col-span-7 flex flex-col p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{s.tag}</span>
                    <span className="font-mono text-luxury-black/45 tracking-wide text-[12px]">{s.ref}</span>
                  </div>
                  <p className="text-[13px] tracking-[0.14em] uppercase text-luxury-black/60 mb-1">{s.location}</p>
                  <p className="text-[13px] text-luxury-black/55 font-light mb-1.5">
                    Detached houses <span className="mx-1 text-luxury-black/30">|</span> <span className="italic">{s.style}</span>
                  </p>
                  <h3 className="text-[17px] font-medium text-luxury-black leading-snug mb-4 uppercase group-hover:text-luxury-black/75 transition-colors">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-7 mb-4">
                    <div className="text-center">
                      <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Beds</p>
                      <p className="text-[16px] text-luxury-black font-light">{s.beds}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Baths</p>
                      <p className="text-[16px] text-luxury-black font-light">{s.baths}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/50 mb-0.5">Built</p>
                      <p className="text-[16px] text-luxury-black font-light">{s.sqm} m²</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-neutral-100">
                    <p className="text-2xl font-extralight text-luxury-black tracking-tight">{s.price}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-luxury-black tracking-tight">Get Luxury Trends & Tips</h2>
              <p className="text-[13px] text-luxury-black/55 font-light mt-2 leading-relaxed">Receive our top luxury picks and tips from our experts delivered to your inbox each week.</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="w-full border border-neutral-300 px-4 py-3 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors" />
              <button type="submit" className="bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 w-full hover:bg-luxury-black/85 transition-all duration-300">Subscribe to Newsletter</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-luxury-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm tracking-[0.25em] text-white/40 font-light">{brand.fullName}</span>
            <p className="text-[12px] text-white/20 tracking-wider font-light">© 2025 {brand.fullName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ─── LIGHTBOX ─── */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + p.images.length) % p.images.length); }} className="absolute left-4 text-white/30 hover:text-white transition-colors">
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
          </button>
          <img src={p.images[lightbox]} alt={`Photo ${lightbox + 1}`} className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % p.images.length); }} className="absolute right-4 text-white/30 hover:text-white transition-colors">
            <ChevronRight className="w-8 h-8" strokeWidth={1} />
          </button>
          <span className="absolute bottom-4 text-white/40 text-[13px] font-light">{lightbox + 1} / {p.images.length}</span>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailV2;
