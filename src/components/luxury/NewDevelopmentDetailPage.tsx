import { useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Building2, CalendarDays, TrendingUp, Phone, Mail, MessageCircle,
  CheckCircle2, Waves, Dumbbell, Car, ShieldCheck, Wifi,
  Sparkles, Users, X, Calendar, Clock, Globe, BedDouble, Maximize,
  Grid3X3, Send, Home,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { brand, palette, fonts, contact } from "@/config/template";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import heroImg from "@/assets/luxury-hero.jpg";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface Unit {
  ref: string;
  type: string;
  beds: number;
  baths: number;
  sqm: number;
  floor: string;
  orientation: string;
  price: number;
  status: "Available" | "Reserved" | "Sold";
}

interface NewDevProject {
  slug: string;
  name: string;
  developer: string;
  location: string;
  municipality: string;
  delivery: string;
  status: "Pre-Launch" | "Selling" | "Under Construction" | "Last Units";
  construction: number;
  totalUnits: number;
  availableUnits: number;
  priceMin: number;
  priceMax: number;
  description: string;
  longDescription: string[];
  images: string[];
  amenities: { icon: any; label: string }[];
  typologies: { type: string; from: number; sqmRange: string }[];
  units: Unit[];
  location_data: {
    area: string;
    nearbyPlaces: { name: string; distance: string }[];
    airport?: string;
    airportDistance?: string;
  };
  highlights: string[];
  trending?: boolean;
  estimatedROI?: string;
}

const PROJECTS: NewDevProject[] = [
  {
    slug: "marea-residences-altea",
    name: "Marea Residences",
    developer: "Grupo Prasa",
    location: "Altea, Costa Blanca",
    municipality: "Altea",
    delivery: "Q2 2027",
    status: "Selling",
    construction: 55,
    totalUnits: 64,
    availableUnits: 28,
    priceMin: 485000,
    priceMax: 1250000,
    description: "Contemporary beachfront apartments with panoramic sea views, communal pools, landscaped gardens and underground parking in Altea's most sought-after location.",
    longDescription: [
      "Marea Residences is a landmark development in Altea, one of the most charming towns on Spain's Costa Blanca. Set on a privileged beachfront plot, this contemporary residential complex offers 64 meticulously designed homes ranging from stylish 2-bedroom apartments to expansive penthouses and duplexes.",
      "Each home features floor-to-ceiling windows framing panoramic Mediterranean views, premium porcelain finishes, fully fitted kitchens with Bosch appliances and pre-installed home automation systems. The architecture blends seamlessly with Altea's whitewashed old town aesthetic while delivering modern living standards.",
      "Residents enjoy communal infinity pools, landscaped Mediterranean gardens, a fully equipped gym, children's play areas and underground parking. The development is located just 200 metres from the beach, with easy access to Altea's marina, restaurants and the charming old town.",
      "With 55% of construction completed and strong buyer demand, Marea Residences offers an excellent opportunity for both lifestyle buyers and investors seeking capital appreciation in one of the Costa Blanca's most desirable locations.",
    ],
    images: [prop1, detail1, detail2, detail3, prop2, prop3, heroImg],
    amenities: [
      { icon: Waves, label: "Infinity pool" },
      { icon: Dumbbell, label: "Fully equipped gym" },
      { icon: Car, label: "Underground parking" },
      { icon: Users, label: "Children's play area" },
      { icon: Wifi, label: "Smart home system" },
      { icon: ShieldCheck, label: "24h CCTV security" },
      { icon: Sparkles, label: "Landscaped gardens" },
    ],
    typologies: [
      { type: "Apartment", from: 485000, sqmRange: "85 – 120 m²" },
      { type: "Penthouse", from: 890000, sqmRange: "140 – 180 m²" },
      { type: "Duplex", from: 720000, sqmRange: "120 – 150 m²" },
    ],
    units: [
      { ref: "MR-4A", type: "Apartment", beds: 2, baths: 2, sqm: 95, floor: "4th", orientation: "South-East", price: 485000, status: "Available" },
      { ref: "MR-7B", type: "Apartment", beds: 2, baths: 2, sqm: 110, floor: "7th", orientation: "South", price: 540000, status: "Available" },
      { ref: "MR-12B", type: "Penthouse", beds: 3, baths: 2, sqm: 160, floor: "12th", orientation: "South", price: 890000, status: "Available" },
      { ref: "MR-15A", type: "Penthouse", beds: 3, baths: 3, sqm: 175, floor: "15th", orientation: "South-West", price: 1050000, status: "Reserved" },
      { ref: "MR-8C", type: "Duplex", beds: 3, baths: 2, sqm: 135, floor: "8th", orientation: "East", price: 720000, status: "Available" },
      { ref: "MR-2A", type: "Apartment", beds: 2, baths: 2, sqm: 85, floor: "2nd", orientation: "East", price: 485000, status: "Sold" },
    ],
    location_data: {
      area: "Altea, Costa Blanca",
      nearbyPlaces: [
        { name: "Playa de l'Espigó", distance: "200 m" },
        { name: "Altea Old Town", distance: "800 m" },
        { name: "Club Náutico de Altea", distance: "1.2 km" },
        { name: "Altea Hills Golf", distance: "3 km" },
        { name: "Hospital Marina Baixa", distance: "8 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "65 km",
    },
    highlights: [
      "200 metres from the beach",
      "55% construction completed",
      "Flexible payment plan during build period",
      "Energy efficiency rating A",
      "Bank guarantee on all deposits",
    ],
    trending: true,
    estimatedROI: "5 – 7%",
  },
  {
    slug: "the-view-javea",
    name: "The View Jávea",
    developer: "TM Real Estate Group",
    location: "Jávea, Costa Blanca",
    municipality: "Jávea",
    delivery: "Q4 2026",
    status: "Under Construction",
    construction: 72,
    totalUnits: 24,
    availableUnits: 10,
    priceMin: 1200000,
    priceMax: 2800000,
    description: "Exclusive hillside villas and penthouses with infinity pools overlooking Jávea bay. Designed by award-winning architects with premium finishes.",
    longDescription: [
      "The View Jávea is an exclusive collection of 24 luxury villas and penthouses perched on a privileged hillside with uninterrupted views across Jávea bay and the Montgó Natural Park.",
      "Interiors feature Travertine marble, bespoke oak joinery, Gaggenau kitchens and floor-to-ceiling glazing. Each villa includes a private infinity pool, landscaped garden and covered terraces ideal for year-round outdoor living.",
      "With 72% of construction complete and only 10 units remaining, The View represents one of the last opportunities to acquire a new-build luxury villa in Jávea's most coveted location.",
    ],
    images: [detail2, prop2, detail1, prop3, heroImg],
    amenities: [
      { icon: Waves, label: "Private infinity pool" },
      { icon: Dumbbell, label: "Private gym" },
      { icon: Car, label: "Double garage" },
      { icon: ShieldCheck, label: "Gated community" },
      { icon: Wifi, label: "Home automation" },
      { icon: Sparkles, label: "Landscaped gardens" },
    ],
    typologies: [
      { type: "Villa", from: 1200000, sqmRange: "280 – 350 m²" },
      { type: "Penthouse", from: 1900000, sqmRange: "200 – 250 m²" },
    ],
    units: [
      { ref: "VJ-1A", type: "Villa", beds: 4, baths: 4, sqm: 280, floor: "Ground", orientation: "South", price: 1200000, status: "Available" },
      { ref: "VJ-5B", type: "Penthouse", beds: 3, baths: 3, sqm: 220, floor: "Top", orientation: "South-West", price: 1900000, status: "Available" },
      { ref: "VJ-9C", type: "Villa", beds: 4, baths: 4, sqm: 310, floor: "Ground", orientation: "South", price: 1450000, status: "Available" },
      { ref: "VJ-3A", type: "Villa", beds: 4, baths: 3, sqm: 295, floor: "Ground", orientation: "South-West", price: 1350000, status: "Reserved" },
    ],
    location_data: {
      area: "Jávea, Costa Blanca",
      nearbyPlaces: [
        { name: "Arenal Beach", distance: "2 km" },
        { name: "Jávea Port", distance: "3 km" },
        { name: "Montgó Natural Park", distance: "1 km" },
        { name: "Club de Golf Jávea", distance: "4 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "90 km",
    },
    highlights: [
      "72% construction completed",
      "Private infinity pool in every villa",
      "Award-winning architecture",
      "Only 10 units remaining",
    ],
  },
  {
    slug: "one-green-way-moraira",
    name: "One Green Way",
    developer: "Vapf",
    location: "Moraira, Costa Blanca",
    municipality: "Moraira",
    delivery: "Q1 2028",
    status: "Pre-Launch",
    construction: 0,
    totalUnits: 42,
    availableUnits: 42,
    priceMin: 890000,
    priceMax: 2100000,
    description: "Sustainable luxury villas nestled in a green valley with sea views. Solar-powered, smart home technology and private gardens in every home.",
    longDescription: [
      "One Green Way is a pioneering sustainable development in Moraira that combines luxury living with environmental responsibility. Set in a lush green valley with panoramic sea views, the development offers 42 eco-luxury villas.",
      "Each villa features passive house principles, solar panels, rainwater harvesting, electric car charging points and fully integrated smart home systems.",
      "The masterplan includes communal organic gardens, walking trails, a co-working hub and a community wellness centre.",
    ],
    images: [detail3, prop1, detail2, heroImg, prop3],
    amenities: [
      { icon: Sparkles, label: "Organic gardens" },
      { icon: Dumbbell, label: "Wellness centre" },
      { icon: Car, label: "EV charging" },
      { icon: Wifi, label: "Smart home" },
      { icon: ShieldCheck, label: "Gated access" },
      { icon: Users, label: "Co-working hub" },
    ],
    typologies: [
      { type: "Villa", from: 890000, sqmRange: "220 – 350 m²" },
      { type: "Townhouse", from: 650000, sqmRange: "160 – 200 m²" },
    ],
    units: [
      { ref: "OGW-2A", type: "Villa", beds: 3, baths: 3, sqm: 240, floor: "Ground", orientation: "South", price: 890000, status: "Available" },
      { ref: "OGW-7B", type: "Villa", beds: 4, baths: 4, sqm: 320, floor: "Ground", orientation: "South-West", price: 1350000, status: "Available" },
      { ref: "OGW-12C", type: "Townhouse", beds: 3, baths: 2, sqm: 180, floor: "Ground", orientation: "East", price: 650000, status: "Available" },
    ],
    location_data: {
      area: "Moraira, Costa Blanca",
      nearbyPlaces: [
        { name: "Moraira Beach", distance: "2.5 km" },
        { name: "Club Náutico Moraira", distance: "3 km" },
        { name: "Ifach Golf Club", distance: "5 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "85 km",
    },
    highlights: [
      "Net-zero energy design",
      "Solar-powered with battery storage",
      "Organic community gardens",
      "Pre-launch pricing available",
    ],
  },
  {
    slug: "costa-serena-calpe",
    name: "Costa Serena",
    developer: "Grupo TM",
    location: "Calpe, Costa Blanca",
    municipality: "Calpe",
    delivery: "Q3 2027",
    status: "Selling",
    construction: 30,
    totalUnits: 36,
    availableUnits: 18,
    priceMin: 395000,
    priceMax: 950000,
    description: "Mediterranean-style apartments just 200 metres from Calpe beach. Communal pool, gym, co-working space and children's play area.",
    longDescription: [
      "Costa Serena brings contemporary Mediterranean living to one of Calpe's best beachfront locations. Just 200 metres from the sand, this boutique development of 36 homes offers the perfect balance of beach lifestyle and modern comfort.",
      "Every apartment features open-plan living areas, large terraces oriented for maximum sun and sea views, and high-quality finishes throughout.",
    ],
    images: [prop3, detail1, prop1, detail3, heroImg],
    amenities: [
      { icon: Waves, label: "Infinity pool" },
      { icon: Dumbbell, label: "Gym" },
      { icon: Users, label: "Co-working" },
      { icon: Car, label: "Parking" },
      { icon: ShieldCheck, label: "Security" },
    ],
    typologies: [
      { type: "Apartment", from: 395000, sqmRange: "80 – 110 m²" },
      { type: "Penthouse", from: 680000, sqmRange: "130 – 160 m²" },
    ],
    units: [
      { ref: "CS-3A", type: "Apartment", beds: 2, baths: 2, sqm: 85, floor: "3rd", orientation: "South", price: 395000, status: "Available" },
      { ref: "CS-10B", type: "Penthouse", beds: 3, baths: 2, sqm: 145, floor: "10th", orientation: "South-West", price: 680000, status: "Available" },
      { ref: "CS-6C", type: "Apartment", beds: 2, baths: 2, sqm: 98, floor: "6th", orientation: "East", price: 450000, status: "Available" },
      { ref: "CS-1A", type: "Apartment", beds: 2, baths: 1, sqm: 82, floor: "1st", orientation: "North", price: 395000, status: "Sold" },
    ],
    location_data: {
      area: "Calpe, Costa Blanca",
      nearbyPlaces: [
        { name: "Playa de la Fossa", distance: "200 m" },
        { name: "Peñón de Ifach", distance: "1.5 km" },
        { name: "Calpe Town Centre", distance: "1 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "75 km",
    },
    highlights: [
      "200m from the beach",
      "Co-working space included",
      "Flexible payment plan",
      "30% construction completed",
    ],
    trending: true,
  },
  {
    slug: "sky-villas-benidorm",
    name: "Sky Villas",
    developer: "Aedas Homes",
    location: "Benidorm, Costa Blanca",
    municipality: "Benidorm",
    delivery: "Q2 2026",
    status: "Last Units",
    construction: 90,
    totalUnits: 48,
    availableUnits: 4,
    priceMin: 520000,
    priceMax: 1800000,
    description: "High-rise luxury with panoramic views from every floor. Rooftop infinity pool, concierge service and direct beach access.",
    longDescription: [
      "Sky Villas Benidorm is a striking high-rise development that redefines luxury living on the Costa Blanca. With just 4 units remaining and 90% of construction complete, this is a last-chance opportunity.",
      "Each apartment offers panoramic views from floor-to-ceiling windows, premium finishes and spacious terraces. The building features a rooftop infinity pool with 360-degree views, concierge service and direct access to Poniente beach.",
    ],
    images: [prop2, detail2, prop3, heroImg],
    amenities: [
      { icon: Waves, label: "Rooftop pool" },
      { icon: ShieldCheck, label: "Concierge" },
      { icon: Car, label: "Underground parking" },
      { icon: Dumbbell, label: "Fitness centre" },
    ],
    typologies: [
      { type: "Apartment", from: 520000, sqmRange: "95 – 130 m²" },
      { type: "Penthouse", from: 1200000, sqmRange: "170 – 210 m²" },
    ],
    units: [
      { ref: "SV-42A", type: "Penthouse", beds: 3, baths: 3, sqm: 190, floor: "42nd", orientation: "South", price: 1200000, status: "Available" },
      { ref: "SV-38B", type: "Apartment", beds: 2, baths: 2, sqm: 105, floor: "38th", orientation: "South-East", price: 520000, status: "Available" },
      { ref: "SV-44C", type: "Penthouse", beds: 3, baths: 3, sqm: 205, floor: "44th", orientation: "South-West", price: 1500000, status: "Reserved" },
    ],
    location_data: {
      area: "Benidorm, Costa Blanca",
      nearbyPlaces: [
        { name: "Poniente Beach", distance: "50 m" },
        { name: "Terra Mítica", distance: "5 km" },
        { name: "Benidorm Old Town", distance: "2 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "55 km",
    },
    highlights: [
      "Only 4 units remaining",
      "90% construction completed",
      "Ready Q2 2026",
      "Direct beach access",
    ],
  },
  {
    slug: "vista-marina-denia",
    name: "Vista Marina",
    developer: "Neinor Homes",
    location: "Dénia, Costa Blanca",
    municipality: "Dénia",
    delivery: "Q4 2027",
    status: "Under Construction",
    construction: 40,
    totalUnits: 38,
    availableUnits: 22,
    priceMin: 340000,
    priceMax: 780000,
    description: "Elegant apartments overlooking Dénia's marina with direct access to restaurants, shops and the historic old town.",
    longDescription: [
      "Vista Marina is a stylish residential development overlooking Dénia's picturesque marina. With 38 elegantly designed apartments, the project offers a perfect blend of waterfront lifestyle and historic charm.",
      "Each apartment features open-plan living, quality finishes and generous terraces with marina or sea views. Communal facilities include a pool, gym and landscaped gardens.",
    ],
    images: [detail1, prop2, detail3, prop1, heroImg],
    amenities: [
      { icon: Waves, label: "Communal pool" },
      { icon: Dumbbell, label: "Gym" },
      { icon: Car, label: "Parking" },
      { icon: Sparkles, label: "Gardens" },
    ],
    typologies: [
      { type: "Apartment", from: 340000, sqmRange: "75 – 100 m²" },
      { type: "Duplex", from: 580000, sqmRange: "120 – 145 m²" },
    ],
    units: [
      { ref: "VM-5A", type: "Apartment", beds: 2, baths: 1, sqm: 80, floor: "5th", orientation: "South", price: 340000, status: "Available" },
      { ref: "VM-14B", type: "Duplex", beds: 3, baths: 2, sqm: 130, floor: "14th", orientation: "South-West", price: 580000, status: "Available" },
      { ref: "VM-9C", type: "Apartment", beds: 2, baths: 2, sqm: 92, floor: "9th", orientation: "East", price: 420000, status: "Available" },
    ],
    location_data: {
      area: "Dénia, Costa Blanca",
      nearbyPlaces: [
        { name: "Dénia Marina", distance: "100 m" },
        { name: "Dénia Castle", distance: "500 m" },
        { name: "Las Marinas Beach", distance: "1.5 km" },
      ],
      airport: "Alicante-Elche (ALC)",
      airportDistance: "95 km",
    },
    highlights: [
      "Overlooking Dénia marina",
      "Walking distance to old town",
      "40% construction completed",
      "Flexible payment terms",
    ],
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const statusColor = (s: string) => {
  if (s === "Pre-Launch") return palette.accent;
  if (s === "Selling") return "#2a7d5f";
  if (s === "Under Construction") return "#c0862b";
  if (s === "Last Units") return "#c0392b";
  return palette.textLight;
};

const unitStatusStyle = (s: string) => {
  if (s === "Available") return { color: "#2a7d5f", bg: "#2a7d5f12" };
  if (s === "Reserved") return { color: "#e67e22", bg: "#e67e2212" };
  return { color: "#999", bg: "#99999912" };
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT — mirrors BrandedResidenceDetailPage layout
   ═══════════════════════════════════════════════════════════ */

const NewDevelopmentDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const p = project;

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gridView, setGridView] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");
  const [enquirySent, setEnquirySent] = useState(false);
  const [visitSent, setVisitSent] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: `Hello! I'm here to help you with any questions about ${p.name}. How can I assist you?` },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Hero swipe logic
  const heroTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleHeroTouchStart = useCallback((e: React.TouchEvent) => {
    heroTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleHeroTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!heroTouchStart.current) return;
    const dx = e.changedTouches[0].clientX - heroTouchStart.current.x;
    const dy = e.changedTouches[0].clientY - heroTouchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setHeroSlide((s) => Math.min(s + 1, p.images.length - 1));
      else setHeroSlide((s) => Math.max(s - 1, 0));
    }
    heroTouchStart.current = null;
  }, [p.images.length]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: `Thank you for your interest in ${p.name}. An advisor will follow up with you shortly. Feel free to ask me anything else!` },
      ]);
    }, 1000);
  };

  // Lightbox swipe logic
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

  const availableUnits = p.units.filter((u) => u.status !== "Sold");
  const filteredUnits = filterType === "All" ? p.units : p.units.filter((u) => u.type === filterType);
  const typologyOptions = ["All", ...new Set(p.units.map((u) => u.type))];

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop={false} showLanguage>
      <SEOHead
        title={`${p.name} — New Development in ${p.location}`}
        description={p.description}
      />

      {/* ── HERO GALLERY ── */}
      <section aria-label="Project photos">
        {/* Swipeable gallery for mobile & tablet */}
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleHeroTouchStart} onTouchEnd={handleHeroTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {p.images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`${p.name} — photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full">
            {heroSlide + 1} / {p.images.length}
          </div>
          {p.estimatedROI && (
            <div className="absolute bottom-3 left-4 z-20 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-sm">
              <p className="text-[8px] tracking-[0.2em] uppercase font-medium text-white/60 mb-0.5">Est. ROI</p>
              <p className="text-sm font-light text-white">{p.estimatedROI}</p>
            </div>
          )}
          <div className="absolute top-4 left-4 z-20">
            <Link to="/new-developments" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[12px] tracking-wide transition-colors drop-shadow-md">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>

        {/* Mosaic grid for desktop (lg+) */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.name} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute top-6 left-6 z-20">
              <Link to="/new-developments" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] tracking-wide transition-colors drop-shadow-md">
                <ArrowLeft className="w-4 h-4" /> All New Developments
              </Link>
            </div>
            {p.estimatedROI && (
              <div className="absolute bottom-4 left-4 z-20 px-4 py-3 bg-black/50 backdrop-blur-sm rounded-sm">
                <p className="text-[9px] tracking-[0.2em] uppercase font-medium text-white/60 mb-0.5">Est. ROI</p>
                <p className="text-lg font-light text-white">{p.estimatedROI}</p>
              </div>
            )}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[11px] tracking-[0.2em] font-medium uppercase" style={{ color: palette.text }}>{brand.name}</span>
            </div>
          </div>
          {p.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(i + 1)}>
              <img src={img} alt={`${p.name} — photo ${i + 2}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
          {p.images.length > 4 && (
            <div className="absolute bottom-3 right-3 z-10" style={{ gridColumn: '4', gridRow: '2' }} />
          )}
        </div>
        <div className="hidden lg:block relative">
          <button onClick={() => setGridView(true)} className="absolute -top-[52px] right-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md hover:bg-white transition-all" style={{ color: palette.text }}>
            <Grid3X3 className="w-4 h-4" /> Show all photos
          </button>
        </div>
      </section>

      {/* ── TITLE + INFO BELOW IMAGE ── */}
      <section className="border-b" style={{ background: palette.white, borderColor: palette.border }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2" style={{ background: `${statusColor(p.status)}10`, border: `1px solid ${statusColor(p.status)}30` }}>
              <Building2 className="w-4 h-4" style={{ color: statusColor(p.status) }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-light" style={{ color: statusColor(p.status) }}>{p.status}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1] mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.05em", color: palette.text }}>
              {p.name}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="w-4 h-4" style={{ color: palette.textLight }} />
              <span className="text-[14px] font-light" style={{ color: palette.textMuted }}>{p.location}</span>
              <span style={{ color: palette.border }}>·</span>
              <span className="text-[14px] font-light" style={{ color: palette.textMuted }}>Delivery {p.delivery}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-xl sm:text-2xl font-extralight" style={{ color: palette.text }}>{fmt(p.priceMin)} — {fmt(p.priceMax)}</span>
              {p.trending && (
                <span className="ml-2 px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium rounded-sm flex items-center gap-1" style={{ color: palette.accent, border: `1px solid ${palette.accent}50`, background: `${palette.accent}10` }}>
                  <TrendingUp className="w-3 h-3" /> Trending
                </span>
              )}
            </div>
          </FadeIn>

          {/* Stats ribbon inline */}
          <div className="flex flex-wrap gap-6 sm:gap-10 pt-6 border-t" style={{ borderColor: palette.border }}>
            {[
              { label: "Total Units", value: String(p.totalUnits) },
              { label: "Available", value: String(p.availableUnits) },
              { label: "Construction", value: `${p.construction}%` },
              { label: "Delivery", value: p.delivery },
              { label: "Developer", value: p.developer },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.textLight }}>{s.label}</p>
                <p className="text-[17px] font-light" style={{ color: palette.text }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 sm:py-24" style={{ background: palette.white }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">

            {/* Left column */}
            <div>
              {/* About */}
              <FadeIn>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>About the Project</p>
                <h2 className="text-2xl sm:text-3xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>{p.name}</h2>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                  {p.longDescription.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={0.1}>
                <div className="mt-12 p-8 rounded-sm" style={{ background: palette.bg }}>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: palette.accent }}>Key Highlights</h3>
                  <div className="space-y-3">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                        <span className="text-[14px] font-light" style={{ color: palette.text }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Download Brochure */}
              <FadeIn delay={0.12}>
                <div className="mt-12 p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.accent }}>Download</p>
                    <h3 className="text-lg font-light mb-1" style={{ fontFamily: fonts.heading, color: palette.text }}>{p.name} Brochure</h3>
                    <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>
                      Floor plans, specifications, amenities, pricing and investment details in a single document.
                    </p>
                  </div>
                  <button
                    onClick={() => { setShowEnquiry(true); setEnquirySent(false); }}
                    className="shrink-0 inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-light px-8 py-3.5 transition-all hover:opacity-90 rounded-sm"
                    style={{ background: palette.accent, color: "#fff" }}
                  >
                    <ArrowRight className="w-4 h-4 -rotate-90" /> Download PDF
                  </button>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn delay={0.15}>
                <div className="mt-14">
                  <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Lifestyle</p>
                  <h2 className="text-2xl font-extralight mb-8" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Amenities & Facilities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {p.amenities.map((a, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-5 rounded-sm" style={{ background: palette.bg }}>
                        <a.icon className="w-6 h-6 mb-3" style={{ color: palette.accent }} />
                        <span className="text-[13px] font-light" style={{ color: palette.text }}>{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right column — Sticky sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
              {/* Price card */}
              <div className="p-6 rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4" style={{ color: palette.accent }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>New Development</span>
                </div>
                <p className="text-[24px] font-extralight mb-1" style={{ color: palette.text }}>{fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
                <p className="text-[12px] font-light mb-6" style={{ color: palette.textLight }}>{availableUnits.length} of {p.totalUnits} units available</p>

                {/* Construction progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: palette.textLight }}>Construction</span>
                    <span className="text-[14px] font-light" style={{ color: palette.text }}>{p.construction}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: palette.bg }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.construction}%`, background: palette.accent }} />
                  </div>
                </div>

                {/* Typologies */}
                <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${palette.border}` }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.textLight }}>Typologies</p>
                  {p.typologies.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{t.type} <span className="text-[11px]" style={{ color: palette.textLight }}>({t.sqmRange})</span></span>
                      <span className="text-[13px] font-light" style={{ color: palette.text }}>from {fmt(t.from)}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <button
                  onClick={() => { setShowEnquiry(true); setEnquirySent(false); }}
                  className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 mb-3 transition-all hover:opacity-90"
                  style={{ background: palette.accent, color: "#fff" }}
                >
                  <Mail className="w-4 h-4" /> Request Information
                </button>
                <button
                  onClick={() => { setShowVisit(true); setVisitSent(false); }}
                  className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-light py-3.5 transition-all hover:opacity-80"
                  style={{ border: `1px solid ${palette.accent}60`, color: palette.accent }}
                >
                  <Calendar className="w-4 h-4" /> Schedule a Visit
                </button>

                {/* Direct contact */}
                <div className="mt-5 pt-5 flex items-center justify-center gap-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <span style={{ color: palette.border }}>|</span>
                  <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-[12px] font-light transition-opacity hover:opacity-60" style={{ color: palette.textMuted }}>
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Location card */}
              <div className="p-6 rounded-sm border" style={{ background: palette.white, borderColor: palette.border }}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: palette.accent }}>Location</p>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                  <span className="text-[14px] font-light" style={{ color: palette.text }}>{p.location_data.area}</span>
                </div>
                <div className="space-y-2.5 mb-4">
                  {p.location_data.nearbyPlaces.map((pl, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{pl.name}</span>
                      <span className="text-[12px] font-light" style={{ color: palette.textLight }}>{pl.distance}</span>
                    </div>
                  ))}
                </div>
                {p.location_data.airport && (
                  <div className="pt-3" style={{ borderTop: `1px solid ${palette.border}` }}>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                      <span className="text-[13px] font-light" style={{ color: palette.textMuted }}>{p.location_data.airport} — {p.location_data.airportDistance}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNITS TABLE ── */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Availability</p>
              <h2 className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Available Units</h2>
              <p className="text-[14px] font-light mt-3" style={{ color: palette.textMuted }}>
                {availableUnits.length} of {p.totalUnits} units currently available
              </p>
            </div>
          </FadeIn>

          {/* Filter */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {typologyOptions.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-light transition-all rounded-sm"
                style={{
                  background: filterType === t ? palette.accent : "transparent",
                  color: filterType === t ? "#fff" : palette.textMuted,
                  border: `1px solid ${filterType === t ? palette.accent : palette.border}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Table — desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: `2px solid ${palette.border}` }}>
                  {["Ref", "Type", "Beds", "Baths", "Size", "Floor", "Price", "Status", ""].map((h, i) => (
                    <th key={i} className="py-3 px-3 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.textLight }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map((u, i) => {
                  const st = unitStatusStyle(u.status);
                  return (
                    <tr key={i} className="transition-colors" style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <td className="py-4 px-3 text-[13px] font-medium" style={{ color: palette.text }}>{u.ref}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.type}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.beds}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.baths}</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.text }}>{u.sqm} m²</td>
                      <td className="py-4 px-3 text-[13px] font-light" style={{ color: palette.textMuted }}>{u.floor}</td>
                      <td className="py-4 px-3 text-[14px] font-light" style={{ color: palette.text }}>{fmt(u.price)}</td>
                      <td className="py-4 px-3">
                        <span className="text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        {u.status === "Available" && (
                          <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="text-[11px] tracking-[0.1em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                            Enquire
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <div className="sm:hidden space-y-3">
            {filteredUnits.map((u, i) => {
              const st = unitStatusStyle(u.status);
              return (
                <div key={i} className="p-4 rounded-sm border" style={{ borderColor: palette.border, background: palette.white }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium" style={{ color: palette.text }}>{u.ref}</span>
                    <span className="text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                      {u.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] font-light mb-2" style={{ color: palette.textMuted }}>
                    <span>{u.type}</span>
                    <span>{u.beds} bed · {u.baths} bath</span>
                    <span>{u.sqm} m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-light" style={{ color: palette.text }}>{fmt(u.price)}</span>
                    {u.status === "Available" && (
                      <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="text-[11px] tracking-[0.1em] uppercase font-light" style={{ color: palette.accent }}>
                        Enquire
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <FadeIn>
            <Building2 className="w-8 h-8 mx-auto mb-6" style={{ color: palette.accent }} />
            <h2 className="text-2xl sm:text-3xl font-extralight leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.06em", color: palette.text }}>
              Interested in {p.name}?
            </h2>
            <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: palette.textMuted }}>
              Contact our specialist team for private viewings, floor plans, investment analysis and priority access.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                Request Information
              </button>
              <button onClick={() => { setShowVisit(true); setVisitSent(false); }} className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-10 py-4 transition-all hover:opacity-80" style={{ border: `1px solid ${palette.accent}60`, color: palette.accent }}>
                Schedule a Visit
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         FULLSCREEN LIGHTBOX
         ══════════════════════════════════════════════════════ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" role="dialog" aria-label="Photo gallery">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px] font-light">
              {lightbox < p.images.length ? `${lightbox + 1} / ${p.images.length}` : "Contact"}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/50 hover:text-white transition-colors" aria-label="Grid view">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white transition-colors" aria-label="Close gallery">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 relative flex items-center justify-center min-h-0"
            onTouchStart={handleLbTouchStart}
            onTouchEnd={handleLbTouchEnd}
          >
            {lightbox < p.images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && (
                  <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white transition-colors" aria-label="Previous photo">
                    <ChevronLeft className="w-8 h-8" strokeWidth={1} />
                  </button>
                )}
                <img src={p.images[lightbox]} alt={`${p.name} — photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain relative z-0" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white transition-colors" aria-label="Next photo">
                  <ChevronRight className="w-8 h-8" strokeWidth={1} />
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <Building2 className="w-6 h-6 mx-auto mb-3" style={{ color: "#c9a96e" }} />
                  <h3 className="text-[22px] sm:text-[28px] font-light text-white tracking-[0.04em] uppercase mb-2 leading-tight">{p.name}</h3>
                  <p className="text-[14px] text-white/50 font-light mb-1">{p.location}</p>
                  <p className="text-[24px] font-light text-white/90 mb-8">{fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${contact.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1a1816] text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                      <Mail className="w-3.5 h-3.5" /> Enquiry
                    </button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] tracking-[0.1em] uppercase transition-colors flex items-center gap-1 mx-auto">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to photos
                  </button>
                </div>
              </div>
            )}
          </div>

          {lightbox < p.images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] shrink-0 overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`} aria-label={`View photo ${i + 1}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── GRID VIEW (all photos) ─── */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto" role="dialog" aria-label="All photos">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/50 text-[13px] font-light">{p.images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/50 hover:text-white transition-colors" aria-label="Close grid view">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setGridView(false); setLightbox(i); }}
                className="relative aspect-[4/3] overflow-hidden group"
                aria-label={`View photo ${i + 1}`}
              >
                <img src={img} alt={`${p.name} — photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 text-white/70 text-[11px] font-light">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="px-4 sm:px-8 py-10 text-center shrink-0">
            <Building2 className="w-6 h-6 mx-auto mb-3" style={{ color: "#c9a96e" }} />
            <h3 className="text-[18px] sm:text-[22px] font-light text-white/90 tracking-[0.04em] uppercase mb-2">{p.name}</h3>
            <p className="text-[13px] text-white/40 font-light mb-6">{p.location} · {fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={`tel:${contact.phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1a1816] text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button onClick={() => { setGridView(false); setShowEnquiry(true); setEnquirySent(false); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                <Mail className="w-3.5 h-3.5" /> Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
         ENQUIRY MODAL
         ══════════════════════════════════════════════════════ */}
      <Dialog open={showEnquiry} onOpenChange={setShowEnquiry}>
        <DialogContent className="sm:max-w-[480px] p-0 border-0 overflow-hidden" overlayClassName="!z-[110]" style={{ zIndex: 110 }}>
          {!enquirySent ? (
            <div className="p-8">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4" style={{ color: palette.accent }} />
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>New Development</span>
              </div>
              <h3 className="text-xl font-light mb-1" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
              <p className="text-[12px] font-light mb-6" style={{ color: palette.textMuted }}>{p.location}</p>
              <form onSubmit={(e) => { e.preventDefault(); setEnquirySent(true); }} className="space-y-4">
                <input placeholder="Full Name *" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Email *" type="email" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Phone" type="tel" className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <textarea placeholder="I'm interested in this project..." rows={3} className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e] resize-none" style={{ borderColor: palette.border }} />
                <button type="submit" className="w-full py-3.5 text-[12px] tracking-[0.18em] uppercase font-light transition-opacity hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                  Send Enquiry
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#2a7d5f" }} />
              <h3 className="text-xl font-light mb-2" style={{ fontFamily: fonts.heading }}>Thank You</h3>
              <p className="text-[14px] font-light mb-6" style={{ color: palette.textMuted }}>
                Our specialist will contact you within 24 hours with detailed information about {p.name}.
              </p>
              <button onClick={() => setShowEnquiry(false)} className="text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════
         VISIT MODAL
         ══════════════════════════════════════════════════════ */}
      <Dialog open={showVisit} onOpenChange={setShowVisit}>
        <DialogContent className="sm:max-w-[480px] p-0 border-0 overflow-hidden" overlayClassName="!z-[110]" style={{ zIndex: 110 }}>
          {!visitSent ? (
            <div className="p-8">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" style={{ color: palette.accent }} />
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.accent }}>Schedule a Visit</span>
              </div>
              <h3 className="text-xl font-light mb-1" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
              <p className="text-[12px] font-light mb-6" style={{ color: palette.textMuted }}>{p.location}</p>
              <form onSubmit={(e) => { e.preventDefault(); setVisitSent(true); }} className="space-y-4">
                <input placeholder="Full Name *" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Email *" type="email" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <input placeholder="Phone *" type="tel" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }} />
                  <select required className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e]" style={{ borderColor: palette.border }}>
                    <option value="">Preferred Time</option>
                    <option>Morning (9:00 – 12:00)</option>
                    <option>Afternoon (12:00 – 16:00)</option>
                    <option>Evening (16:00 – 19:00)</option>
                  </select>
                </div>
                <textarea placeholder="Any specific requirements or questions..." rows={2} className="w-full px-4 py-3 text-[13px] font-light border rounded-sm outline-none focus:border-[#c9a96e] resize-none" style={{ borderColor: palette.border }} />
                <button type="submit" className="w-full py-3.5 text-[12px] tracking-[0.18em] uppercase font-light transition-opacity hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                  Request Visit
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "#2a7d5f" }} />
              <h3 className="text-xl font-light mb-2" style={{ fontFamily: fonts.heading }}>Visit Requested</h3>
              <p className="text-[14px] font-light mb-6" style={{ color: palette.textMuted }}>
                We'll confirm your visit to {p.name} within 24 hours. Our specialist will coordinate directly with you.
              </p>
              <button onClick={() => setShowVisit(false)} className="text-[12px] tracking-[0.15em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ CHATBOT BUTTON + PANEL ═══ */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all bottom-[72px] right-4 lg:bottom-6 lg:right-6"
          style={{ background: palette.text, color: palette.white }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}

      {chatOpen && (
        <div className="fixed z-50 bg-white border shadow-xl flex flex-col inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[520px] lg:rounded-lg lg:overflow-hidden" style={{ borderColor: palette.border }}>
          <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: palette.border, background: palette.bg }}>
            <span className="text-[13px] font-medium tracking-wide" style={{ color: palette.text }}>{brand.fullName}</span>
            <button onClick={() => setChatOpen(false)} className="transition-colors" style={{ color: palette.textLight }} aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0" style={{ borderColor: palette.border, background: `${palette.bg}80` }}>
            <div className="w-16 h-12 rounded overflow-hidden shrink-0">
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: palette.text }}>{p.name}</p>
              <p className="text-[15px] font-light" style={{ color: palette.text }}>{fmt(p.priceMin)} — {fmt(p.priceMax)}</p>
              <p className="text-[11px] font-light" style={{ color: palette.textMuted }}>{p.location}</p>
            </div>
          </div>

          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-lg ${msg.role === "bot" ? "mr-auto" : "ml-auto"}`} style={{ background: msg.role === "bot" ? palette.bg : palette.text, color: msg.role === "bot" ? palette.textMuted : palette.white }}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t px-3 py-3 flex items-center gap-2" style={{ borderColor: palette.border }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
              placeholder="Ask about this project..."
              className="flex-1 text-[13px] px-3 py-2 border rounded-full focus:outline-none transition-colors"
              style={{ color: palette.text, borderColor: palette.border }}
            />
            <button onClick={handleChatSend} className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 transition-colors" style={{ background: palette.text, color: palette.white }} aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-0" style={{ borderColor: palette.border }}>
        <a href={`tel:${contact.phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 transition-colors hover:bg-neutral-50" style={{ color: palette.text }}>
          <Phone className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span>
        </a>
        <div className="w-px h-8" style={{ background: palette.border }} />
        <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366] transition-colors hover:bg-neutral-50">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span>
        </a>
        <div className="w-px h-8" style={{ background: palette.border }} />
        <button onClick={() => { setShowEnquiry(true); setEnquirySent(false); }} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 transition-colors hover:bg-neutral-50" style={{ color: palette.text }}>
          <Mail className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Enquiry</span>
        </button>
      </div>
      <div className="lg:hidden h-16" />
    </Layout>
  );
};

export default NewDevelopmentDetailPage;
