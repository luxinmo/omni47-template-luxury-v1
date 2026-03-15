import { useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Building2, CalendarDays, TrendingUp, Phone, Mail, MessageCircle,
  CheckCircle2, Waves, Dumbbell, Car, ShieldCheck, Wifi,
  Sparkles, Users, X, Clock, BedDouble, Maximize, Bath,
  Grid3X3, Send, Home, Shield, CheckCircle,
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
  sqm: number;
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
  };
  highlights: string[];
  trending?: boolean;
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
      { ref: "MR-4A", type: "Apartment", beds: 2, sqm: 95, price: 485000, status: "Available" },
      { ref: "MR-7B", type: "Apartment", beds: 2, sqm: 110, price: 540000, status: "Available" },
      { ref: "MR-12B", type: "Penthouse", beds: 3, sqm: 160, price: 890000, status: "Available" },
      { ref: "MR-15A", type: "Penthouse", beds: 3, sqm: 175, price: 1050000, status: "Reserved" },
      { ref: "MR-8C", type: "Duplex", beds: 3, sqm: 135, price: 720000, status: "Available" },
      { ref: "MR-2A", type: "Apartment", beds: 2, sqm: 85, price: 485000, status: "Sold" },
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
    },
    highlights: [
      "200 metres from the beach",
      "55% construction completed",
      "Flexible payment plan during build period",
      "Energy efficiency rating A",
      "Bank guarantee on all deposits",
    ],
    trending: true,
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
      "The View Jávea is an exclusive collection of 24 luxury villas and penthouses perched on a privileged hillside with uninterrupted views across Jávea bay and the Montgó Natural Park. Every home has been designed to maximise natural light and the spectacular Mediterranean panorama.",
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
      { ref: "VJ-1A", type: "Villa", beds: 4, sqm: 280, price: 1200000, status: "Available" },
      { ref: "VJ-5B", type: "Penthouse", beds: 3, sqm: 220, price: 1900000, status: "Available" },
      { ref: "VJ-9C", type: "Villa", beds: 4, sqm: 310, price: 1450000, status: "Available" },
      { ref: "VJ-3A", type: "Villa", beds: 4, sqm: 295, price: 1350000, status: "Reserved" },
    ],
    location_data: {
      area: "Jávea, Costa Blanca",
      nearbyPlaces: [
        { name: "Arenal Beach", distance: "2 km" },
        { name: "Jávea Port", distance: "3 km" },
        { name: "Montgó Natural Park", distance: "1 km" },
        { name: "Club de Golf Jávea", distance: "4 km" },
      ],
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
      "One Green Way is a pioneering sustainable development in Moraira that combines luxury living with environmental responsibility. Set in a lush green valley with panoramic sea views, the development offers 42 eco-luxury villas powered by solar energy and designed to achieve near-zero energy consumption.",
      "Each villa features passive house principles, solar panels, rainwater harvesting, electric car charging points and fully integrated smart home systems. Interiors use sustainable materials — reclaimed oak, natural stone and non-toxic finishes.",
      "The masterplan includes communal organic gardens, walking trails, a co-working hub and a community wellness centre. It's a vision for the future of luxury living on the Costa Blanca.",
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
      { ref: "OGW-2A", type: "Villa", beds: 3, sqm: 240, price: 890000, status: "Available" },
      { ref: "OGW-7B", type: "Villa", beds: 4, sqm: 320, price: 1350000, status: "Available" },
      { ref: "OGW-12C", type: "Townhouse", beds: 3, sqm: 180, price: 650000, status: "Available" },
    ],
    location_data: {
      area: "Moraira, Costa Blanca",
      nearbyPlaces: [
        { name: "Moraira Beach", distance: "2.5 km" },
        { name: "Club Náutico Moraira", distance: "3 km" },
        { name: "Ifach Golf Club", distance: "5 km" },
      ],
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
      "Every apartment features open-plan living areas, large terraces oriented for maximum sun and sea views, and high-quality finishes throughout. The communal facilities include a stunning infinity pool, fully equipped gym, co-working space and dedicated children's area.",
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
      { ref: "CS-3A", type: "Apartment", beds: 2, sqm: 85, price: 395000, status: "Available" },
      { ref: "CS-10B", type: "Penthouse", beds: 3, sqm: 145, price: 680000, status: "Available" },
      { ref: "CS-6C", type: "Apartment", beds: 2, sqm: 98, price: 450000, status: "Available" },
      { ref: "CS-1A", type: "Apartment", beds: 2, sqm: 82, price: 395000, status: "Sold" },
    ],
    location_data: {
      area: "Calpe, Costa Blanca",
      nearbyPlaces: [
        { name: "Playa de la Fossa", distance: "200 m" },
        { name: "Peñón de Ifach", distance: "1.5 km" },
        { name: "Calpe Town Centre", distance: "1 km" },
      ],
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
      "Sky Villas Benidorm is a striking high-rise development that redefines luxury living on the Costa Blanca. With just 4 units remaining and 90% of construction complete, this is a last-chance opportunity to own in one of Benidorm's most iconic new towers.",
      "Each apartment offers panoramic views from floor-to-ceiling windows, premium finishes and spacious terraces. The building features a rooftop infinity pool with 360-degree views, concierge service, underground parking and direct access to Poniente beach.",
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
      { ref: "SV-42A", type: "Penthouse", beds: 3, sqm: 190, price: 1200000, status: "Available" },
      { ref: "SV-38B", type: "Apartment", beds: 2, sqm: 105, price: 520000, status: "Available" },
      { ref: "SV-44C", type: "Penthouse", beds: 3, sqm: 205, price: 1500000, status: "Reserved" },
    ],
    location_data: {
      area: "Benidorm, Costa Blanca",
      nearbyPlaces: [
        { name: "Poniente Beach", distance: "50 m" },
        { name: "Terra Mítica", distance: "5 km" },
        { name: "Benidorm Old Town", distance: "2 km" },
      ],
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
      "Vista Marina is a stylish residential development overlooking Dénia's picturesque marina. With 38 elegantly designed apartments, the project offers a perfect blend of waterfront lifestyle and historic charm, just steps from Dénia's renowned restaurants and the UNESCO-listed old town.",
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
      { ref: "VM-5A", type: "Apartment", beds: 2, sqm: 80, price: 340000, status: "Available" },
      { ref: "VM-14B", type: "Duplex", beds: 3, sqm: 130, price: 580000, status: "Available" },
      { ref: "VM-9C", type: "Apartment", beds: 2, sqm: 92, price: 420000, status: "Available" },
    ],
    location_data: {
      area: "Dénia, Costa Blanca",
      nearbyPlaces: [
        { name: "Dénia Marina", distance: "100 m" },
        { name: "Dénia Castle", distance: "500 m" },
        { name: "Las Marinas Beach", distance: "1.5 km" },
      ],
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
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const NewDevelopmentDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const p = project;

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gridView, setGridView] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [filterType, setFilterType] = useState<string>("All");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: `Hello! I'm here to help you with any questions about ${p.name}. How can I assist you?` },
  ]);
  const [chatInput, setChatInput] = useState("");

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

  const lbTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleLbTouchStart = useCallback((e: React.TouchEvent) => {
    lbTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!lbTouchStart.current) return;
    const dx = e.changedTouches[0].clientX - lbTouchStart.current.x;
    const dy = e.changedTouches[0].clientY - lbTouchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setLightbox((prev) => prev !== null ? Math.min(prev + 1, p.images.length - 1) : null);
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
        { role: "bot", text: `Thank you for your interest in ${p.name}. An advisor will follow up with you shortly.` },
      ]);
    }, 1000);
  };

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
        {/* Mobile swipe gallery */}
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
          <div className="absolute top-4 left-4 z-20">
            <Link to="/new-developments" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[12px] tracking-wide transition-colors drop-shadow-md">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>

        {/* Desktop mosaic */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={p.images[0]} alt={p.name} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute top-6 left-6 z-20">
              <Link to="/new-developments" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] tracking-wide transition-colors drop-shadow-md">
                <ArrowLeft className="w-4 h-4" /> All New Developments
              </Link>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[11px] tracking-[0.2em] font-medium uppercase" style={{ color: palette.text }}>{brand.name}</span>
            </div>
          </div>
          {p.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(i + 1)}>
              <img src={img} alt={`${p.name} — photo ${i + 2}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              {i === 3 && p.images.length > 5 && (
                <button onClick={(e) => { e.stopPropagation(); setGridView(true); }} className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 text-white text-sm tracking-wide">
                  <Grid3X3 className="w-4 h-4" /> +{p.images.length - 5} photos
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm text-white" style={{ background: statusColor(p.status) }}>
                  {p.status}
                </span>
                {p.trending && (
                  <span className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm" style={{ background: palette.accent, color: palette.white }}>
                    <TrendingUp className="w-3 h-3 inline mr-1" /> Trending
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-2" style={{ fontFamily: fonts.heading, color: palette.text }}>
                {p.name}
              </h1>
              <div className="flex items-center gap-2 text-sm mb-4" style={{ color: palette.textMuted }}>
                <MapPin className="w-4 h-4" /> {p.location}
              </div>
              <div className="flex flex-wrap gap-6 text-sm" style={{ color: palette.textLight }}>
                <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Delivery: {p.delivery}</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {p.availableUnits}/{p.totalUnits} units available</span>
                <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> By {p.developer}</span>
              </div>
            </FadeIn>

            {/* Price range */}
            <FadeIn>
              <div className="p-6 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Price range</p>
                <p className="text-2xl font-light" style={{ fontFamily: fonts.heading, color: palette.text }}>
                  {fmt(p.priceMin)} — {fmt(p.priceMax)}
                </p>
              </div>
            </FadeIn>

            {/* Construction progress */}
            <FadeIn>
              <div className="p-6 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.textMuted }}>Construction progress</p>
                  <p className="text-sm font-medium" style={{ color: palette.text }}>{p.construction}%</p>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: palette.border }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.construction}%`, background: statusColor(p.status) }} />
                </div>
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn>
              <h2 className="text-lg font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>About this development</h2>
              <div className="space-y-4">
                {p.longDescription.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: palette.textLight }}>{para}</p>
                ))}
              </div>
            </FadeIn>

            {/* Highlights */}
            <FadeIn>
              <h2 className="text-lg font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>Key highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-sm border" style={{ borderColor: palette.border }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: statusColor(p.status) }} />
                    <span className="text-sm" style={{ color: palette.text }}>{h}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Amenities */}
            <FadeIn>
              <h2 className="text-lg font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>Amenities & facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {p.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-sm border" style={{ borderColor: palette.border }}>
                    <a.icon className="w-5 h-5 shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[12px]" style={{ color: palette.text }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Typologies */}
            <FadeIn>
              <h2 className="text-lg font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>Available typologies</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {p.typologies.map((t, i) => (
                  <div key={i} className="p-5 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>{t.type}</p>
                    <p className="text-lg font-light mb-1" style={{ fontFamily: fonts.heading, color: palette.text }}>From {fmt(t.from)}</p>
                    <p className="text-[12px]" style={{ color: palette.textLight }}>{t.sqmRange}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Units table */}
            <FadeIn>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-medium tracking-tight" style={{ fontFamily: fonts.heading, color: palette.text }}>Units</h2>
                <div className="flex gap-2">
                  {typologyOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border transition-all"
                      style={filterType === t
                        ? { background: palette.text, color: palette.white, borderColor: palette.text }
                        : { background: "transparent", color: palette.textMuted, borderColor: palette.border }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto border rounded-sm" style={{ borderColor: palette.border }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: palette.card }}>
                      {["Ref", "Type", "Beds", "m²", "Price", "Status"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium" style={{ color: palette.textMuted, borderBottom: `1px solid ${palette.border}` }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnits.map((u, i) => {
                      const st = unitStatusStyle(u.status);
                      return (
                        <tr key={i} className="transition-colors hover:bg-black/[0.02]" style={{ borderBottom: `1px solid ${palette.border}` }}>
                          <td className="px-4 py-3 font-medium" style={{ color: palette.text }}>{u.ref}</td>
                          <td className="px-4 py-3" style={{ color: palette.textLight }}>{u.type}</td>
                          <td className="px-4 py-3" style={{ color: palette.textLight }}>{u.beds}</td>
                          <td className="px-4 py-3" style={{ color: palette.textLight }}>{u.sqm}</td>
                          <td className="px-4 py-3 font-medium" style={{ color: palette.text }}>{fmt(u.price)}</td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            {/* Location */}
            <FadeIn>
              <h2 className="text-lg font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>Location</h2>
              <div className="p-6 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                <p className="text-sm font-medium mb-4" style={{ color: palette.text }}>{p.location_data.area}</p>
                <div className="space-y-2">
                  {p.location_data.nearbyPlaces.map((pl, i) => (
                    <div key={i} className="flex justify-between items-center text-sm py-1.5" style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <span style={{ color: palette.textLight }}>{pl.name}</span>
                      <span className="font-medium" style={{ color: palette.text }}>{pl.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Enquiry card */}
              <FadeIn>
                <div className="p-6 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                  <h3 className="text-sm font-medium tracking-tight mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>
                    Interested in {p.name}?
                  </h3>
                  {!enquirySent ? (
                    <div className="space-y-3">
                      <input type="text" placeholder="Full name" className="w-full text-sm px-3 py-2.5 border rounded-sm outline-none focus:ring-1" style={{ borderColor: palette.border, color: palette.text }} />
                      <input type="email" placeholder="Email address" className="w-full text-sm px-3 py-2.5 border rounded-sm outline-none focus:ring-1" style={{ borderColor: palette.border, color: palette.text }} />
                      <input type="tel" placeholder="Phone number" className="w-full text-sm px-3 py-2.5 border rounded-sm outline-none focus:ring-1" style={{ borderColor: palette.border, color: palette.text }} />
                      <textarea placeholder="Message (optional)" rows={3} className="w-full text-sm px-3 py-2.5 border rounded-sm outline-none focus:ring-1 resize-none" style={{ borderColor: palette.border, color: palette.text }} />
                      <button
                        onClick={() => setEnquirySent(true)}
                        className="w-full py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium text-white rounded-sm transition-opacity hover:opacity-90"
                        style={{ background: palette.text }}
                      >
                        Request information
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: "#2a7d5f" }} />
                      <p className="text-sm font-medium" style={{ color: palette.text }}>Thank you!</p>
                      <p className="text-[12px] mt-1" style={{ color: palette.textMuted }}>We'll be in touch within 24 hours.</p>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Quick contact */}
              <FadeIn>
                <div className="p-6 rounded-sm border space-y-3" style={{ borderColor: palette.border }}>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.textMuted }}>Quick contact</h3>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity" style={{ color: palette.text }}>
                    <Phone className="w-4 h-4" /> {contact.phone}
                  </a>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity" style={{ color: palette.text }}>
                    <Mail className="w-4 h-4" /> {contact.email}
                  </a>
                  <a href={`https://wa.me/${contact.whatsapp?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity" style={{ color: palette.text }}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </FadeIn>

              {/* Developer info */}
              <FadeIn>
                <div className="p-6 rounded-sm border" style={{ borderColor: palette.border, background: palette.card }}>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.textMuted }}>Developer</h3>
                  <p className="text-sm font-medium" style={{ color: palette.text }}>{p.developer}</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <Dialog open={lightbox !== null} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-none overflow-hidden" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
          {lightbox !== null && (
            <>
              <img src={p.images[lightbox]} alt="" className="w-full h-full object-contain" />
              {lightbox > 0 && (
                <button onClick={() => setLightbox(lightbox - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              )}
              {lightbox < p.images.length - 1 && (
                <button onClick={() => setLightbox(lightbox + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {lightbox + 1} / {p.images.length}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── GRID VIEW DIALOG ── */}
      <Dialog open={gridView} onOpenChange={setGridView}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
          <h3 className="text-lg font-medium mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>All photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {p.images.map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm cursor-pointer" onClick={() => { setGridView(false); setLightbox(i); }}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── FLOATING CHAT ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-3 w-80 rounded-lg shadow-2xl border overflow-hidden" style={{ background: palette.white, borderColor: palette.border }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: palette.text }}>
              <span className="text-white text-[12px] tracking-[0.1em] uppercase font-medium">Chat with us</span>
              <button onClick={() => setChatOpen(false)}><X className="w-4 h-4 text-white/70 hover:text-white" /></button>
            </div>
            <div className="h-64 overflow-y-auto p-3 space-y-2">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] ${m.role === "user" ? "bg-black text-white" : ""}`} style={m.role === "bot" ? { background: palette.card, color: palette.text } : {}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex gap-2" style={{ borderColor: palette.border }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Type a message…"
                className="flex-1 text-sm px-3 py-2 border rounded-sm outline-none"
                style={{ borderColor: palette.border }}
              />
              <button onClick={handleChatSend} className="p-2 rounded-sm text-white" style={{ background: palette.text }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105"
          style={{ background: palette.text }}
        >
          {chatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>
    </Layout>
  );
};

export default NewDevelopmentDetailPage;
