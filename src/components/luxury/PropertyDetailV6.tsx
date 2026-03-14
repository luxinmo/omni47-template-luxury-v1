import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Menu,
  X, Check, Phone, Fence, Mail, ChevronDown, CalendarDays, Star,
  Play, View, FileDown, Home, Grid3X3, TrendingUp,
  ArrowRight, MessageCircle, Send,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { brand, navLeft, navRight, languages } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
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

/* ─── Data (reused from V5) ─── */
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
    logo: null, // uses brand text as logo
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
  { label: "Villas for Sale Ibiza", href: "/properties?type=villa&location=ibiza&status=sale" },
  { label: "Investment Properties Ibiza", href: "/properties?type=investment&location=ibiza" },
];

const NEARBY_AREAS = [
  { label: "Properties in Ibiza", href: "/properties?location=ibiza", count: 124 },
  { label: "Villas in Ibiza", href: "/properties?type=villa&location=ibiza", count: 67 },
  { label: "Properties in Santa Eulalia", href: "/properties?location=santa-eulalia", count: 38 },
  { label: "Luxury Villas Ibiza", href: "/properties?type=villa&location=ibiza&luxury=true", count: 29 },
  { label: "Sea View Properties Ibiza", href: "/properties?feature=sea-views&location=ibiza", count: 52 },
  { label: "Beachfront Villas Ibiza", href: "/properties?feature=beachfront&type=villa&location=ibiza", count: 18 },
];

/* ─── JSON-LD Schema ─── */
const generateJsonLd = () => {
  const p = PROPERTY;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: p.title,
        description: p.subtitle,
        url: `https://luxinmo.com/property/${p.ref}`,
        datePosted: "2024-12-01",
        image: p.images,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "RealEstateAgent", name: brand.fullName, url: "https://luxinmo.com" },
        },
      },
      {
        "@type": "Product",
        name: p.title,
        description: p.description.substring(0, 300),
        image: p.images[0],
        brand: { "@type": "Brand", name: brand.fullName },
        offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      },
      {
        "@type": "Residence",
        name: p.title,
        description: p.subtitle,
        floorSize: { "@type": "QuantitativeValue", value: p.sqm, unitCode: "MTK" },
        numberOfRooms: p.beds + p.baths,
        numberOfBedrooms: p.beds,
        numberOfBathroomsTotal: p.baths,
        yearBuilt: p.year,
        address: { "@type": "PostalAddress", addressLocality: "Santa Eulalia del Río", addressRegion: "Ibiza", addressCountry: "ES" },
        geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
        image: p.images,
      },
      {
        "@type": "Place",
        name: "Santa Eulalia del Río, Ibiza",
        address: { "@type": "PostalAddress", addressLocality: "Santa Eulalia del Río", addressRegion: "Ibiza, Balearic Islands", addressCountry: "ES" },
        geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: p.breadcrumb.map((name, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: i < p.breadcrumb.length - 1 ? `https://luxinmo.com${p.breadcrumbLinks[i]}` : undefined,
        })),
      },
    ],
  };
};

/* ─── Component ─── */
const PropertyDetailV6 = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [expandDesc, setExpandDesc] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [wantVisit, setWantVisit] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm here to help you with any questions about this property. How can I assist you?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const isMobile = useIsMobile();

  const p = PROPERTY;

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: `Thank you for your interest in this property in ${p.location}. An advisor will follow up with you shortly. In the meantime, feel free to ask me anything else!` },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans">
      <SEOHead
        title={p.title}
        description={`${p.title} — ${p.beds} bedrooms, ${p.baths} bathrooms, ${p.sqm} m² built. ${p.priceFormatted}. Contemporary villa with panoramic Mediterranean sea views in Santa Eulalia del Río, Ibiza.`}
        type="article"
        image={heroImg}
        jsonLd={generateJsonLd()}
        canonical={`https://luxinmo.com/property/${p.ref}`}
      />

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm" aria-label="Main navigation">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10 h-[60px] md:h-[68px]">
          {/* Left: hamburger on mobile/tablet, nav links on desktop */}
          <div className="flex items-center gap-6 lg:gap-10 flex-1">
            <button className="lg:hidden text-luxury-black/70" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => setLangOpen(true)} className="flex items-center gap-1.5 text-luxury-black/50 hover:text-luxury-black transition-colors duration-300" aria-label="Select language">
                <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                <span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span>
                <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {navLeft.map((l) => (
                <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors duration-300">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Center: logo */}
          <Link to="/" className="flex flex-col items-center justify-center shrink-0">
            <span className="text-base md:text-lg lg:text-xl tracking-[0.3em] font-light text-luxury-black">{brand.fullName}</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-light text-luxury-black/40">{brand.subtitle}</span>
          </Link>

          {/* Right: nav links on desktop, phone icon on tablet */}
          <div className="flex items-center justify-end gap-6 lg:gap-10 flex-1">
            <div className="hidden lg:flex items-center gap-10">
              {navRight.map((l) => (
                <Link key={l.label} to={l.href} className="text-[13px] tracking-[0.14em] uppercase font-light text-luxury-black/55 hover:text-luxury-black transition-colors duration-300">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ HERO GALLERY ═══ */}
      <section aria-label="Property photos">
        {/* Single photo for mobile & tablet */}
        <div className="lg:hidden relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => setLightbox(0)}>
          <img src={p.images[0]} alt={p.title} loading="eager" className="w-full h-full object-cover" />
        </div>
        {/* Actions bar below photo on mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2.5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            {p.hasVideo && (
              <button className="flex items-center gap-1.5 text-[12px] text-luxury-black/70 font-medium">
                <Play className="w-3.5 h-3.5" /> Video
              </button>
            )}
            <button onClick={() => setLightbox(0)} className="flex items-center gap-1.5 text-[12px] text-luxury-black/70 font-medium">
              <Grid3X3 className="w-3.5 h-3.5" /> {p.images.length} photos
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-luxury-black/50 hover:text-luxury-black transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => setLiked(!liked)} className={`transition-colors ${liked ? "text-luxury-black" : "text-luxury-black/50 hover:text-luxury-black"}`} aria-label={liked ? "Unsave" : "Save"}>
              <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Mosaic grid for desktop (lg+) */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[540px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.title} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[11px] tracking-[0.2em] font-medium text-luxury-black uppercase">{brand.name}</span>
            </div>
          </div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(1)}>
            <img src={p.images[1]} alt={`${p.title} — interior`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(2)}>
            <img src={p.images[2]} alt={`${p.title} — living area`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm hover:bg-white transition-all" aria-label="Share property">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className={`flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm transition-all ${liked ? "bg-luxury-black text-white" : "bg-white/90 backdrop-blur-sm text-luxury-black hover:bg-white"}`} aria-label={liked ? "Unsave property" : "Save property"}>
                <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} /> Save
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(3)}>
            <img src={p.images[3]} alt={`${p.title} — terrace`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {p.hasVideo && (
                <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3 py-2 rounded-full shadow-sm hover:bg-white transition-all">
                  <Play className="w-3.5 h-3.5" /> Video
                </button>
              )}
              {p.hasVirtualTour && (
                <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-luxury-black text-[12px] font-medium px-3 py-2 rounded-full shadow-sm hover:bg-white transition-all">
                  <View className="w-3.5 h-3.5" /> 3D Tour
                </button>
              )}
            </div>
          </div>
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(4)}>
            <img src={p.images[4]} alt={`${p.title} — pool`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <button onClick={(e) => { e.stopPropagation(); setLightbox(0); }} className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-luxury-black text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md hover:bg-white transition-all">
              <Grid3X3 className="w-4 h-4" /> Show all photos
            </button>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 lg:py-8" itemScope itemType="https://schema.org/Residence">

        {/* ─── TWO-COLUMN LAYOUT: Content + Sticky Price Card ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-7">

            {/* Breadcrumb — hide on small mobile */}
            <nav aria-label="Breadcrumb" className="mb-3 hidden sm:block">
              <ol className="flex items-center gap-2 text-[13px] text-luxury-black/50 font-light" itemScope itemType="https://schema.org/BreadcrumbList">
                {p.breadcrumb.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {i < p.breadcrumb.length - 1 ? (
                      <Link to={p.breadcrumbLinks[i]} className="hover:text-luxury-black transition-colors" itemProp="item">
                        <span itemProp="name">{crumb}</span>
                      </Link>
                    ) : (
                      <span className="text-luxury-black/70 font-normal" itemProp="name">{crumb}</span>
                    )}
                    <meta itemProp="position" content={String(i + 1)} />
                    {i < p.breadcrumb.length - 1 && <ChevronRight className="w-3 h-3 text-luxury-black/30" />}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Large Title */}
            <h1 className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-medium text-luxury-black leading-tight tracking-[0.04em] uppercase mb-1" itemProp="name">
              {p.title}
            </h1>

            {/* Address */}
            <p className="text-[12px] sm:text-[13px] text-luxury-black/50 font-light tracking-[0.1em] uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              Santa Eulalia del Río, Ibiza · Balearic Islands, Spain
            </p>

            {/* Compact property facts */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {[
                { icon: Bed, label: "Bedrooms", value: p.beds },
                { icon: Bath, label: "Bathrooms", value: p.baths },
                { icon: Maximize, label: "Built Area", value: <>{p.sqm} m<sup>2</sup></> },
                { icon: Fence, label: p.plot ? "Plot Size" : "Useful Area", value: p.plot ? <>{p.plot.toLocaleString()} m<sup>2</sup></> : <>{p.sqm} m<sup>2</sup></> },
              ].map((s, i) => (
                <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-2 sm:p-2.5 text-center">
                  <s.icon className="w-4 h-4 text-luxury-black/40 mx-auto mb-1.5" strokeWidth={1.5} />
                  <p className="text-[14px] sm:text-[16px] font-light text-luxury-black mb-0.5 leading-tight">{s.value}</p>
                  <p className="text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-luxury-black/60 font-medium leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 text-[11px] sm:text-[12px] text-luxury-black/60 font-light">
              <span>Year built: <strong className="font-medium text-luxury-black/80">{p.year}</strong></span>
              <span className="text-luxury-black/30">·</span>
              <span>Status: <strong className="font-medium text-luxury-black/80">{p.status}</strong></span>
            </div>

            {/* Property tags */}
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              <span className="text-[12px] text-luxury-gold font-medium border border-luxury-gold/40 bg-luxury-gold/5 px-3.5 py-2 tracking-[0.05em] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" strokeWidth={1.5} /> Exclusive
              </span>
              {["Gated Community", "Newly Built", "Sea Views"].map((tag, i) => (
                <span key={i} className="text-[12px] text-luxury-black/80 border border-neutral-200 px-3.5 py-2 font-light">
                  {tag}
                </span>
              ))}
            </div>

            {/* ─── ABOUT THIS PROPERTY ─── */}
            <section className="border-t border-neutral-200 pt-6">
              <h2 className="text-[18px] font-medium text-luxury-black mb-4">About This Property</h2>
              <div className={`text-[14px] leading-[1.9] text-luxury-black/85 font-light whitespace-pre-line ${!expandDesc ? "line-clamp-[12]" : ""}`} itemProp="description">
                {p.description}
              </div>
              <button onClick={() => setExpandDesc(!expandDesc)} className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-luxury-black/75 hover:text-luxury-black font-medium transition-colors">
                {expandDesc ? "Show less" : "Read more"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandDesc ? "rotate-180" : ""}`} />
              </button>
            </section>

            {/* ─── BASIC CHARACTERISTICS ─── */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Basic Characteristics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                  {[
                    { label: "Reference", value: p.ref },
                    { label: "Property type", value: "Detached house" },
                    { label: "Price", value: p.priceFormatted },
                    { label: "Built area", value: <>{p.sqm} m<sup>2</sup></> },
                    { label: "Energy rating", value: p.energyClass },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-200">
                      <span className="text-[14px] text-luxury-black/80 font-light">{row.label}</span>
                      <span className="text-[14px] text-luxury-black font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {[
                    { label: "Bedrooms", value: p.beds },
                    { label: "Bathrooms", value: p.baths },
                    { label: "Useful area", value: <>{Math.round(p.sqm * 0.67)} m<sup>2</sup></> },
                    { label: "Plot", value: <>{p.plot.toLocaleString()} m<sup>2</sup></> },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-200">
                      <span className="text-[14px] text-luxury-black/80 font-light">{row.label}</span>
                      <span className="text-[14px] text-luxury-black font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── FEATURES & AMENITIES ─── */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[14px] text-luxury-black/80 font-light">
                    <Check className="w-3.5 h-3.5 text-luxury-black/50" strokeWidth={2} />
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* ─── FLOOR PLANS ─── */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Floor Plans</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Ground Floor", "First Floor"].map((floor, i) => (
                  <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                    <div className="aspect-[4/3] flex items-center justify-center text-luxury-black/30">
                      <div className="text-center">
                        <Grid3X3 className="w-10 h-10 mx-auto mb-2 text-luxury-black/20" strokeWidth={1} />
                        <p className="text-[13px] font-light">{floor} Plan</p>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-neutral-200">
                      <p className="text-[14px] font-medium text-luxury-black">{floor}</p>
                      <p className="text-[12px] text-luxury-black/50 font-light">{i === 0 ? `${Math.round(PROPERTY.sqm * 0.6)} m²` : `${Math.round(PROPERTY.sqm * 0.4)} m²`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>


            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Real Estate Market in Santa Eulalia</h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {MARKET_DATA.map((d, i) => (
                  <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
                    <p className="text-[12px] tracking-[0.1em] uppercase text-luxury-black/65 font-medium mb-1">{d.label}</p>
                    <p className="text-[20px] font-light text-luxury-black mb-2">{d.value}</p>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden mb-1.5">
                      <div className="h-full bg-luxury-gold/60 rounded-full transition-all duration-700" style={{ width: `${d.pct}%` }} />
                    </div>
                    <p className="text-[12px] text-luxury-gold/80 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {d.trend}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[14px] leading-[1.85] text-luxury-black/80 font-light">
                The luxury villa market in Santa Eulalia, Ibiza, has experienced consistent growth over the past five years, driven by strong international demand and limited supply of premium coastal properties. Average prices for high-end villas have increased by approximately 12% year-on-year, with sea-view properties commanding the highest premiums. The area remains one of the most desirable locations in the Balearic Islands for both primary residences and investment properties.
              </p>
            </section>

            {/* ─── NEARBY AREAS ─── */}
            <section className="border-t border-neutral-200 pt-8">
              <h2 className="text-[18px] font-medium text-luxury-black mb-5">Nearby Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NEARBY_AREAS.map((area, i) => (
                  <Link key={i} to={area.href} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-sm px-4 py-3 hover:bg-neutral-100 hover:border-neutral-300 transition-all group">
                    <span className="text-[14px] text-luxury-black/85 font-light group-hover:text-luxury-black transition-colors">{area.label}</span>
                    <span className="flex items-center gap-2 text-[12px] text-luxury-black/60">
                      {area.count} properties <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ─── MORTGAGE CALCULATOR ─── */}
            <section className="border-t border-neutral-100 pt-8">
              <div className="[&_section]:border-t-0 [&_section]:pt-0 [&_.text-luxury-gold\/90]:text-luxury-black/40 [&_input[type=range]]:cursor-pointer">
                <LuxuryMortgageCalculator />
              </div>
            </section>
          </div>

          {/* ─── RIGHT COLUMN: Sticky Price Card ─── */}
          <aside className="lg:col-span-5 lg:self-start">
            <div className="lg:sticky lg:top-[84px] lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto bg-neutral-50 border border-neutral-200 rounded-sm p-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="EUR" />
              <meta itemProp="price" content={String(p.price)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />

              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.15em] uppercase border border-luxury-black/30 text-luxury-black/70 px-2.5 py-1 font-medium">{p.tag}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-luxury-black/40 hover:text-luxury-black hover:border-neutral-400 transition-all" aria-label="Download brochure">
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

              {/* CTA buttons */}
              <div className="flex gap-2 mb-2">
                <a href={`tel:${p.agency.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-luxury-black text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85 transition-all">
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
                <a href={`https://wa.me/${p.agency.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-[#22bf5b] transition-all">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-luxury-black text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all mb-5"
              >
                <Mail className="w-3.5 h-3.5" /> Send Enquiry
              </button>

              {/* Agency info */}
              <div className="border-t border-neutral-200 pt-5">
                <p className="text-[13px] text-luxury-black/55 font-light leading-relaxed text-center">
                  Get in touch for a personal consultation or to arrange a private viewing.
                </p>
                <p className="text-[14px] text-luxury-black/70 font-mono text-center mt-3 tracking-[0.05em]">REF-{p.ref}</p>
                
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* ─── BUYER'S GUIDE BANNER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <div className="border border-neutral-200 rounded-sm px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-luxury-black/35 font-medium mb-1">Free Download</p>
            <h3 className="text-[18px] font-light text-luxury-black tracking-tight">Buyer's Guide to Luxury Property in Ibiza</h3>
            <p className="text-[13px] text-luxury-black/50 font-light mt-1.5 max-w-lg">Taxes, legal process, golden visa, and market insights.</p>
          </div>
          <button className="shrink-0 border border-neutral-300 text-luxury-black text-[11px] tracking-[0.12em] uppercase px-6 py-3 hover:bg-luxury-black hover:text-white transition-all duration-300 rounded-sm">
            Download Guide
          </button>
        </div>
      </section>

      {/* ─── ABOUT SANTA EULALIA (full-width, above similar) ─── */}
      <section className="border-t border-neutral-200" aria-label="About Santa Eulalia del Río">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <h2 className="text-xl font-light text-luxury-black tracking-tight mb-6">About Santa Eulalia del Río</h2>

          {/* Lifestyle text */}
          <div className="text-[14px] leading-[1.9] text-luxury-black/70 font-light space-y-4 mb-8 max-w-4xl">
            <p>
              Santa Eulalia del Río is one of Ibiza's most sought-after municipalities, renowned for its relaxed Mediterranean lifestyle, pristine beaches, and thriving culinary scene. Situated on the eastern coast of the island, Santa Eulalia offers a perfect balance between tranquillity and convenience, with an elegant promenade, boutique shopping, and a vibrant marina.
            </p>
            <p>
              The Ibiza real estate market in Santa Eulalia continues to attract international buyers seeking luxury villas with sea views, contemporary architecture, and proximity to nature. With excellent international schools, year-round sunshine, and easy access to Ibiza Airport, the area is an ideal choice for families, remote professionals, and investors looking for premium Mediterranean properties.
            </p>
          </div>

          {/* Map + Video row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map */}
            <div>
              <div className="bg-neutral-50 border border-neutral-200 h-[300px] flex items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm">
                <MapPin className="w-5 h-5 mr-1.5" /> Interactive Map
              </div>
              <p className="text-[12px] text-luxury-black/45 font-light flex items-center gap-1.5 mt-2">
                <MapPin className="w-3 h-3" /> {p.location}, {p.region}
              </p>
            </div>
            {/* Area Video */}
            <div>
              {p.areaVideoUrl ? (
                <div className="h-[300px] rounded-sm overflow-hidden">
                  <iframe
                    src={p.areaVideoUrl}
                    title={`Video of ${p.location}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-neutral-50 border border-neutral-200 h-[300px] flex flex-col items-center justify-center text-luxury-black/40 text-[14px] font-light rounded-sm gap-2">
                  <Play className="w-8 h-8" strokeWidth={1} />
                  <span>Area Video</span>
                </div>
              )}
              <p className="text-[12px] text-luxury-black/45 font-light mt-2">Discover the lifestyle in {p.location.split(",")[0]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIMILAR PROPERTIES ─── */}
      <section className="border-t border-neutral-200" aria-label="Similar properties">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <h2 className="text-xl font-light text-luxury-black tracking-tight mb-8">Similar Properties You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SIMILAR.map((s, i) => (
              <Link key={i} to={s.href} className="group bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[11px] tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-luxury-black px-2.5 py-1 font-medium">{s.tag}</span>
                </div>
                <div className="p-6">
                  <p className="text-[12px] tracking-[0.14em] uppercase text-luxury-black/55 mb-1">{s.location}</p>
                  <h3 className="text-[15px] font-medium text-luxury-black mb-3 group-hover:text-luxury-black/75 transition-colors">{s.name}</h3>
                  <div className="flex items-center gap-5 mb-4 text-[13px] text-luxury-black/60 font-light">
                    <span>{s.beds} beds</span>
                    <span>{s.baths} baths</span>
                    <span>{s.sqm} m²</span>
                  </div>
                  <p className="text-xl font-extralight text-luxury-black tracking-tight">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERNAL SEO LINKS ─── */}
      <section className="border-t border-neutral-200 bg-neutral-50" aria-label="Explore more properties">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <h2 className="text-lg font-light text-luxury-black tracking-tight mb-5">Explore Properties in Ibiza</h2>
          <div className="flex flex-wrap gap-3">
            {INTERNAL_LINKS.map((link, i) => (
              <Link key={i} to={link.href} className="text-[13px] text-luxury-black/65 font-light border border-neutral-200 bg-white rounded-full px-5 py-2.5 hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all duration-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-neutral-100" aria-label="Newsletter signup">
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
            <p className="text-[12px] text-white/20 tracking-wider font-light">© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══ ENQUIRY MODAL ═══ */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="max-w-lg p-0 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl">
          <div className="p-5 pb-0">
            <div className="flex gap-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
              <img src={p.images[0]} alt={p.title} className="w-24 h-20 object-cover shrink-0" />
              <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                <DialogTitle className="text-[13px] font-medium text-luxury-black leading-tight line-clamp-2 uppercase tracking-[0.02em]">{p.title}</DialogTitle>
                <DialogDescription className="text-[14px] text-luxury-black/80 font-medium mt-1">{p.priceFormatted}</DialogDescription>
              </div>
            </div>
          </div>
          <form className="p-6 pt-2 space-y-3" onSubmit={(e) => { e.preventDefault(); setEnquiryOpen(false); }}>
            <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors rounded-sm" />
            <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors rounded-sm" />
            <LuxuryPhoneInput />
            <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black placeholder:text-luxury-black/30 focus:outline-none focus:border-luxury-black/40 transition-colors resize-none rounded-sm" />

            <label className="flex items-center gap-2 cursor-pointer select-none py-1">
              <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-neutral-300 rounded accent-luxury-black" />
              <span className="text-[13px] text-luxury-black/70 font-light flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-luxury-black/40" />
                I'd like to schedule a visit
              </span>
            </label>

            {wantVisit && (
              <div className="space-y-2 bg-neutral-50 border border-neutral-200 p-3 rounded-sm">
                <p className="text-[11px] tracking-[0.1em] uppercase text-luxury-black/45 font-medium mb-1">Preferred Date & Time</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className={cn("w-full flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[14px] text-left transition-all hover:border-luxury-black/40 rounded-sm bg-white", !visitDate && "text-luxury-black/35")}>
                      <CalendarDays className="w-4 h-4 text-luxury-black/35 shrink-0" />
                      {visitDate ? format(visitDate, "PPP") : "Select a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-luxury-black appearance-none cursor-pointer focus:outline-none focus:border-luxury-black/40 transition-all rounded-sm bg-white">
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
                I accept the <Link to="/page/terms" className="underline hover:text-luxury-black">terms</Link> and <Link to="/page/privacy" className="underline hover:text-luxury-black">privacy policy</Link>.
              </span>
            </label>
            <button type="submit" className="w-full bg-luxury-black text-white text-[13px] tracking-[0.1em] uppercase py-3 hover:bg-luxury-black/85 transition-all duration-300">
              {wantVisit ? "Request Visit" : "Send Enquiry"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ═══ LANGUAGE MODAL ═══ */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl">
          <DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle>
          <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-sm text-[13px] border transition-colors ${currentLang === lang.code ? "bg-neutral-50 border-neutral-300 text-luxury-black font-medium" : "border-transparent text-luxury-black/55 font-light hover:bg-neutral-50"}`}
              >
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ MOBILE & TABLET STICKY CONTACT BAR ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-0">
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

      {/* ═══ CHATBOT BUTTON + PANEL ═══ */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed z-50 w-14 h-14 rounded-full bg-luxury-black text-white shadow-lg flex items-center justify-center hover:bg-luxury-black/85 transition-all bottom-[72px] right-4 lg:bottom-6 lg:right-6"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}

      {chatOpen && (
        <div className="fixed z-50 bg-white border border-neutral-200 shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
            <span className="text-[13px] font-medium text-luxury-black tracking-wide">{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="text-luxury-black/40 hover:text-luxury-black transition-colors" aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Property card at top */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
            <div className="w-16 h-12 rounded overflow-hidden shrink-0">
              <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-luxury-black truncate">Luxury Villa Ibiza</p>
              <p className="text-[15px] font-light text-luxury-black">{p.priceFormatted}</p>
              <p className="text-[11px] text-luxury-black/50 font-light">{p.location}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg", msg.role === "bot" ? "bg-neutral-100 text-luxury-black/80 mr-auto" : "bg-luxury-black text-white ml-auto")}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 px-3 py-3 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
              placeholder="Ask about this property..."
              className="flex-1 text-[13px] text-luxury-black placeholder:text-luxury-black/30 px-3 py-2 border border-neutral-200 rounded-full focus:outline-none focus:border-luxury-black/30 transition-colors"
            />
            <button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center rounded-full bg-luxury-black text-white hover:bg-luxury-black/85 transition-colors shrink-0" aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── FULLSCREEN LIGHTBOX ─── */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)} role="dialog" aria-label="Photo gallery">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10" aria-label="Close gallery">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + p.images.length) % p.images.length); }} className="absolute left-4 text-white/30 hover:text-white transition-colors" aria-label="Previous photo">
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
          </button>
          <img src={p.images[lightbox]} alt={`${p.title} — photo ${lightbox + 1} of ${p.images.length}`} className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % p.images.length); }} className="absolute right-4 text-white/30 hover:text-white transition-colors" aria-label="Next photo">
            <ChevronRight className="w-8 h-8" strokeWidth={1} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
            {p.images.map((img, i) => (
              <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`} aria-label={`View photo ${i + 1}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <span className="absolute top-4 left-4 text-white/40 text-[13px] font-light">{lightbox + 1} / {p.images.length}</span>
        </div>
      )}

      {/* Bottom padding for mobile/tablet sticky bar */}
      <div className="lg:hidden h-16" />
    </div>
  );
};

export default PropertyDetailV6;
