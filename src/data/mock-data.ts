/* ═══════════════════════════════════════════════════════════
   MOCK DATA — Centralized sample data for all blocks
   ═══════════════════════════════════════════════════════════ */

export const mockProperties = [
  {
    id: "1",
    title: "Villa Mediterránea con Piscina Infinity",
    location: "Altea, Costa Blanca",
    price: "€2,500,000",
    priceNumber: 2500000,
    currency: "€",
    beds: 5,
    baths: 4,
    sqm: 420,
    plot: 1200,
    ref: "D4522",
    badge: "Destacada",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    href: "#",
  },
  {
    id: "2",
    title: "Penthouse Frente al Mar",
    location: "Jávea, Costa Blanca",
    price: "€1,850,000",
    priceNumber: 1850000,
    currency: "€",
    beds: 3,
    baths: 3,
    sqm: 280,
    plot: 0,
    ref: "D3871",
    badge: "Nueva",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    href: "#",
  },
  {
    id: "3",
    title: "Villa Moderna con Vistas al Golf",
    location: "Moraira, Costa Blanca",
    price: "€3,200,000",
    priceNumber: 3200000,
    currency: "€",
    beds: 6,
    baths: 5,
    sqm: 650,
    plot: 2000,
    ref: "D5104",
    badge: "Exclusiva",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    href: "#",
  },
  {
    id: "4",
    title: "Casa Adosada de Lujo",
    location: "Benissa, Costa Blanca",
    price: "€890,000",
    priceNumber: 890000,
    currency: "€",
    beds: 4,
    baths: 3,
    sqm: 320,
    plot: 500,
    ref: "D6290",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    href: "#",
  },
  {
    id: "5",
    title: "Villa Contemporánea en Acantilado",
    location: "Calpe, Costa Blanca",
    price: "€4,200,000",
    priceNumber: 4200000,
    currency: "€",
    beds: 5,
    baths: 4,
    sqm: 480,
    plot: 1500,
    ref: "D7801",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    ],
    href: "#",
  },
  {
    id: "6",
    title: "Ático de Diseño con Terraza",
    location: "Dénia, Costa Blanca",
    price: "€1,100,000",
    priceNumber: 1100000,
    currency: "€",
    beds: 3,
    baths: 2,
    sqm: 190,
    plot: 0,
    ref: "D8432",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    ],
    href: "#",
  },
];

export const mockDestinations = [
  { id: "1", name: "Altea", slug: "altea", propertyCount: 64, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80", tagline: "Perla del Mediterráneo", href: "#" },
  { id: "2", name: "Jávea", slug: "javea", propertyCount: 87, image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80", tagline: "Calas Secretas", href: "#" },
  { id: "3", name: "Moraira", slug: "moraira", propertyCount: 52, image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", tagline: "Exclusividad Costera", href: "#" },
  { id: "4", name: "Benissa", slug: "benissa", propertyCount: 38, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", tagline: "Costa Virgen", href: "#" },
  { id: "5", name: "Calpe", slug: "calpe", propertyCount: 45, image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80", tagline: "El Peñón", href: "#" },
  { id: "6", name: "Dénia", slug: "denia", propertyCount: 71, image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80", tagline: "Gastronomía y Playa", href: "#" },
];

export const mockTestimonials = [
  {
    id: "1",
    name: "Sophie Laurent",
    country: "Francia",
    avatar: "",
    rating: 5,
    text: "Una experiencia increíble. La villa superó todas nuestras expectativas y el servicio fue impecable de principio a fin.",
    propertyTitle: "Villa Mediterránea",
    date: "Agosto 2025",
  },
  {
    id: "2",
    name: "James & Victoria H.",
    country: "Reino Unido",
    avatar: "",
    rating: 5,
    text: "Hicieron que nuestro sueño de tener una villa mediterránea fuera una experiencia fluida e inolvidable.",
    propertyTitle: "Penthouse Frente al Mar",
    date: "Julio 2025",
  },
  {
    id: "3",
    name: "Ahmad Al-Rashid",
    country: "Emiratos Árabes",
    avatar: "",
    rating: 5,
    text: "Su discreción y experiencia en operaciones off-market son incomparables en la industria.",
    propertyTitle: "Villa Contemporánea",
    date: "Junio 2025",
  },
  {
    id: "4",
    name: "Sophie Müller",
    country: "Suiza",
    avatar: "",
    rating: 5,
    text: "Desde la primera visita hasta la firma final, cada detalle fue manejado con absoluta precisión.",
    propertyTitle: "Casa de Lujo",
    date: "Mayo 2025",
  },
];

export const mockBlogPosts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    date: "26 Feb 2026",
    category: "Mercado",
    title: "Guía Insider para la Vida Costera Mediterránea",
    excerpt: "La costa mediterránea ha evolucionado de un escape estacional a un hub estratégico de estilo de vida...",
    author: "Equipo Editorial",
    readTime: "8 min",
    href: "#",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    date: "25 Feb 2026",
    category: "Inversión",
    title: "La Demanda Dual Impulsa el Mercado Prime de Costa Blanca",
    excerpt: "Datos clave sobre el segmento de €500K–€1M creciendo un 70% interanual...",
    author: "Equipo Editorial",
    readTime: "6 min",
    href: "#",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    date: "24 Feb 2026",
    category: "Lifestyle",
    title: "Invertir en Ibiza: Guía Completa del Comprador",
    excerpt: "Este notable mercado sigue atrayendo compradores internacionales que buscan propiedades lifestyle premium...",
    author: "Equipo Editorial",
    readTime: "7 min",
    href: "#",
  },
];

export const mockNewDevelopments = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    name: "Marea Residences",
    location: "Altea, Costa Blanca",
    priceFrom: "Desde €485.000",
    units: 64,
    completion: "Q2 2027",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    name: "The View Jávea",
    location: "Jávea",
    priceFrom: "Desde €1.200.000",
    units: 24,
    completion: "Q4 2026",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    name: "One Green Way",
    location: "Moraira",
    priceFrom: "Desde €890.000",
    units: 42,
    completion: "Q1 2028",
  },
];

export const mockStats = [
  { value: "347", label: "Propiedades en Venta" },
  { value: "€2.1B", label: "Valor del Portfolio" },
  { value: "120+", label: "Off-Market" },
  { value: "25", label: "Años de Experiencia" },
];

export const mockServices = [
  { num: "01", title: "Acceso Exclusivo", desc: "Propiedades off-market y listados privados reservados para nuestra clientela.", iconName: "Lock" as const },
  { num: "02", title: "Oficina Privada", desc: "Confidencialidad completa gestionada a través de nuestra división Private Office.", iconName: "Shield" as const },
  { num: "03", title: "Servicio Premium", desc: "Asesores personales guiando cada paso con atención meticulosa al detalle.", iconName: "ArrowUpRight" as const },
  { num: "04", title: "Negociación Experta", desc: "Décadas asegurando los mejores términos para compradores y vendedores exigentes.", iconName: "ArrowUpRight" as const },
];

export const mockMarketData = [
  { label: "Precio Medio Villa", value: "€1.85M", change: "+12%", iconName: "BarChart3" as const },
  { label: "Precio por m²", value: "€3.420", change: "+8%", iconName: "Activity" as const },
  { label: "Nivel de Demanda", value: "Alto", change: "↑", iconName: "TrendingUp" as const },
  { label: "Tendencia", value: "Creciente", change: "+15% YoY", iconName: "Target" as const },
];

export const mockTrustStats = [
  { value: "15+", label: "Años de Experiencia", iconName: "Award" as const },
  { value: "3.200+", label: "Clientes Internacionales", iconName: "Users" as const },
  { value: "€2.1B", label: "Valor del Portfolio", iconName: "Briefcase" as const },
  { value: "120", label: "Socios Promotores", iconName: "Globe" as const },
];

export const mockCollections = [
  { id: "1", label: "Villas con Vistas al Mar", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", tag: "Sea View", href: "#" },
  { id: "2", label: "Propiedades de Golf", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", tag: "Golf", href: "#" },
  { id: "3", label: "Casas Frente a la Playa", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", tag: "Beachfront", href: "#" },
  { id: "4", label: "Arquitectura Moderna", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", tag: "Modern", href: "#" },
  { id: "5", label: "Fincas Privadas", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", tag: "Estates", href: "#" },
  { id: "6", label: "Smart Homes", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", tag: "Smart", href: "#" },
];

export const mockPropertyTypes = [
  { label: "Villas de Lujo", iconName: "Home" as const, href: "#" },
  { label: "Propiedades con Vistas al Mar", iconName: "Waves" as const, href: "#" },
  { label: "Casas Frente a la Playa", iconName: "Sun" as const, href: "#" },
  { label: "Villas Modernas", iconName: "PenTool" as const, href: "#" },
  { label: "Áticos", iconName: "Building2" as const, href: "#" },
  { label: "Obra Nueva", iconName: "TrendingUp" as const, href: "#" },
];

export const mockAreas: Record<string, { name: string; href: string }[]> = {
  "Costa Blanca": [
    { name: "Altea", href: "#" },
    { name: "Jávea", href: "#" },
    { name: "Moraira", href: "#" },
    { name: "Benissa", href: "#" },
    { name: "Calpe", href: "#" },
  ],
  "Ibiza": [
    { name: "Santa Eulalia", href: "#" },
    { name: "San José", href: "#" },
    { name: "San Antonio", href: "#" },
    { name: "Ibiza Town", href: "#" },
  ],
};

export const mockInvestments = [
  { id: "1", title: "Propiedades de Inversión", desc: "Activos de lujo de alto rendimiento en ubicaciones prime del Mediterráneo.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", label: "Desde €1.2M" },
  { id: "2", title: "Hoteles Boutique", desc: "Oportunidades hoteleras exclusivas con retornos probados.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", label: "8-12% ROI" },
  { id: "3", title: "Off-Market Deals", desc: "Acceso discreto a propiedades no listadas públicamente.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", label: "Privado" },
  { id: "4", title: "Proyectos de Desarrollo", desc: "Proyectos de obra nueva con fuerte crecimiento de capital.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", label: "Pre-lanzamiento" },
];

export const mockHeroSlides = [
  { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80", headline: "Elevando el Sector Inmobiliario", sub: "ÚNETE A NUESTRO CAMINO" },
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80", headline: "Hogares Excepcionales para Vidas Excepcionales", sub: "DESCUBRE LA COLECCIÓN" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80", headline: "Donde el Lujo Encuentra el Mar", sub: "VIDA COSTERA REDEFINIDA" },
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80", headline: "Santuarios Privados de Montaña", sub: "LA GRANDEZA DE LA NATURALEZA" },
];

export const mockBrandedResidences = [
  { id: "1", name: "Four Seasons Private Residences", brand: "Four Seasons", location: "Marbella", priceFrom: "Desde €3.500.000", status: "En Construcción", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" },
  { id: "2", name: "The Ritz-Carlton Residences", brand: "Ritz-Carlton", location: "Ibiza", priceFrom: "Desde €4.200.000", status: "Pre-Lanzamiento", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { id: "3", name: "Mandarin Oriental Residences", brand: "Mandarin Oriental", location: "Barcelona", priceFrom: "Desde €5.800.000", status: "En Venta", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: "4", name: "Aman Residences", brand: "Aman", location: "Mallorca", priceFrom: "Desde €8.000.000", status: "Últimas Unidades", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
];

export const mockAgent = {
  name: "Carlos Martínez",
  role: "Director de Ventas",
  phone: "+34 600 000 000",
  email: "carlos@agencia.com",
  image: "",
  languages: ["Español", "Inglés", "Francés", "Alemán"],
  responseTime: "< 1 hora",
  responseRate: "99%",
};

export const mockAmenities = [
  { id: "1", iconName: "Waves" as const, label: "Piscina privada" },
  { id: "2", iconName: "Wifi" as const, label: "WiFi alta velocidad" },
  { id: "3", iconName: "Car" as const, label: "Parking privado" },
  { id: "4", iconName: "AirVent" as const, label: "Aire acondicionado" },
  { id: "5", iconName: "Tv" as const, label: "Smart TV" },
  { id: "6", iconName: "UtensilsCrossed" as const, label: "Cocina equipada" },
  { id: "7", iconName: "WashingMachine" as const, label: "Lavadora" },
  { id: "8", iconName: "Dumbbell" as const, label: "Gimnasio" },
];

export const mockNearbyPlaces = {
  "Restaurantes": [
    { name: "Restaurante El Faro", distance: "0.8 km" },
    { name: "La Terraza Mediterránea", distance: "1.2 km" },
  ],
  "Playas": [
    { name: "Playa del Albir", distance: "0.5 km" },
    { name: "Cala Baladrar", distance: "2.1 km" },
  ],
  "Supermercados": [
    { name: "Mercadona", distance: "1.0 km" },
    { name: "Consum", distance: "1.5 km" },
  ],
  "Hospitales": [
    { name: "Hospital Marina Baixa", distance: "5.0 km" },
  ],
};

export const mockPropertyDetail = {
  title: "Villa Mediterránea con Piscina Infinity",
  subtitle: "Diseño contemporáneo con vistas panorámicas al mar",
  location: "Altea, Costa Blanca",
  price: "€2,500,000",
  originalPrice: "€2,750,000",
  discount: "9%",
  beds: 5,
  baths: 4,
  sqm: 420,
  plot: 1200,
  garage: 2,
  year: 2023,
  ref: "D4522",
  energyClass: "A",
  status: "En Venta",
  description: "Esta excepcional villa ofrece un diseño contemporáneo con vistas panorámicas al mar Mediterráneo. Ubicada en una de las zonas más exclusivas de Altea, la propiedad cuenta con acabados de alta calidad, domótica integrada y una espectacular piscina infinity que se funde con el horizonte marino.",
  features: [
    "Piscina infinity con vistas al mar",
    "Sistema domótico integrado",
    "Suelos de mármol travertino",
    "Cocina Bulthaup equipada",
    "Bodega climatizada",
    "Gimnasio privado",
    "Jardín paisajístico",
    "Garaje doble",
  ],
  highlights: [
    "Primera línea con acceso directo al mar",
    "Diseño de arquitecto premiado",
    "Certificación energética A",
  ],
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
  ],
  agent: mockAgent,
};

export const mockFooterColumns = [
  {
    title: "Propiedades",
    items: [
      { label: "En Venta", href: "#" },
      { label: "Alquiler", href: "#" },
      { label: "Obra Nueva", href: "#" },
      { label: "Off-Market", href: "#" },
    ],
  },
  {
    title: "Destinos",
    items: [
      { label: "Costa Blanca", href: "#" },
      { label: "Ibiza", href: "#" },
      { label: "Marbella", href: "#" },
      { label: "Mallorca", href: "#" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Sobre Nosotros", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Trabaja con Nosotros", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export const mockSocialLinks = {
  instagram: "#",
  linkedin: "#",
  facebook: "#",
  twitter: "#",
};

export const mockNavItems = {
  left: [
    { label: "Inicio", href: "/" },
    { label: "Propiedades", href: "/properties" },
    { label: "Alquiler", href: "/rentals" },
  ],
  right: [
    { label: "Nosotros", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contact" },
  ],
};

export const mockLanguages = [
  { code: "ES", label: "Español" },
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Русский" },
  { code: "NL", label: "Nederlands" },
  { code: "PL", label: "Polski" },
];
