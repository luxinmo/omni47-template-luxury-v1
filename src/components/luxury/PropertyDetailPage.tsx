import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize, MapPin, Download, Share2, Heart, Calendar, Clock, Phone, Mail, User, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { palette, fonts, brand } from "@/config/template";

import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

/* ─── Mock Data ─── */
const PROPERTIES = [
  {
    id: 1, images: [heroImg, detail1, detail2, detail3],
    tag: "FOR SALE", style: "Contemporary", location: "Santa Eulalia del Río · Ibiza",
    title: "Stunning Contemporary Villa with Panoramic Sea Views",
    description: `This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera.

Designed by a renowned architect, every detail has been carefully considered to blend indoor and outdoor living seamlessly. Floor-to-ceiling windows flood the interior with natural light, while the open-plan living area leads onto a spectacular infinity pool terrace.

The property features five en-suite bedrooms, a state-of-the-art kitchen with premium Gaggenau appliances, a private cinema room, wine cellar, and a fully equipped gym. The landscaped gardens include mature Mediterranean plantings, an outdoor kitchen, and a guest house.

Smart home technology controls lighting, climate, security, and entertainment throughout. A four-car garage with electric vehicle charging completes this extraordinary residence.`,
    beds: 5, baths: 4, sqm: 420, plot: 1200, price: "€4,650,000",
    pricePerSqm: "€11,071/m²",
    rentalPrice: "€18,500/month",
    features: ["Sea Views", "Infinity Pool", "Smart Home", "Garage", "Wine Cellar", "Cinema Room", "Gym", "Guest House"],
    exclusive: true,
    alsoForRent: true,
    ref: "REF-0001",
    yearBuilt: 2022,
    energyRating: "A",
    orientation: "South-West",
    parking: "4 cars",
  },
  {
    id: 2, images: [prop1, detail3, heroImg, detail1],
    tag: "FOR SALE", style: "Luxury", location: "Marina Botafoch · Ibiza",
    title: "Luxury Penthouse with Rooftop Terrace and Harbour Views",
    description: `Exceptional penthouse located in the prestigious Marina Botafoch area, offering stunning views over Dalt Vila and the harbour.

Features include a private rooftop terrace with jacuzzi, open-plan living with designer finishes, and three spacious bedrooms each with en-suite bathrooms. The gourmet kitchen is equipped with top-of-the-line Miele appliances.

Residents enjoy 24-hour concierge service, underground parking, and direct access to the marina promenade.`,
    beds: 3, baths: 3, sqm: 210, plot: null as number | null, price: "€3,100,000",
    pricePerSqm: "€14,762/m²",
    rentalPrice: null as string | null,
    features: ["Terrace", "Harbour Views", "Jacuzzi", "Concierge", "Elevator"],
    exclusive: false,
    alsoForRent: false,
    ref: "REF-0002",
    yearBuilt: 2020,
    energyRating: "B",
    orientation: "East",
    parking: "2 cars",
  },
  {
    id: 3, images: [prop2, detail1, detail2, prop3],
    tag: "FOR SALE", style: "Traditional", location: "San José · Ibiza",
    title: "Traditional Finca with Modern Renovation and Private Pool",
    description: `A beautifully restored traditional Ibicencan finca set within 15,000 m² of private land with olive and almond trees.

The property combines authentic character with contemporary luxury. Original stone walls and wooden beams have been preserved, while modern amenities ensure complete comfort. Six bedrooms and five bathrooms accommodate family and guests in style.

The grounds include a heated swimming pool, outdoor dining area, organic vegetable garden, and a separate guest house. Located just minutes from the charming village of San José.`,
    beds: 6, baths: 5, sqm: 480, plot: 15000, price: "€5,800,000",
    pricePerSqm: "€12,083/m²",
    rentalPrice: "€25,000/month",
    features: ["Pool", "Garden", "Guest House", "Parking", "Olive Grove", "Organic Garden"],
    exclusive: true,
    alsoForRent: true,
    ref: "REF-0003",
    yearBuilt: 1890,
    energyRating: "C",
    orientation: "South",
    parking: "6 cars",
  },
  {
    id: 4, images: [prop3, detail3, heroImg, prop1],
    tag: "FOR SALE", style: "Modern", location: "Altea · Costa Blanca",
    title: "Modern Villa with Infinity Pool Overlooking the Mediterranean",
    description: `Architecturally striking villa perched on the hillside of Altea with sweeping views of the Mediterranean coastline.

Floor-to-ceiling windows flood the interiors with natural light, creating a seamless connection between indoor and outdoor living spaces. The minimalist design showcases premium materials including Italian marble, oak flooring, and brushed steel finishes.

Highlights include a stunning infinity pool with sun deck, a home cinema, a temperature-controlled wine cellar, and a professional-grade kitchen perfect for entertaining.`,
    beds: 4, baths: 4, sqm: 350, plot: 800, price: "€2,950,000",
    pricePerSqm: "€8,429/m²",
    rentalPrice: null as string | null,
    features: ["Infinity Pool", "Sea Views", "Home Cinema", "Wine Cellar", "Italian Marble"],
    exclusive: false,
    alsoForRent: false,
    ref: "REF-0004",
    yearBuilt: 2023,
    energyRating: "A",
    orientation: "South-East",
    parking: "3 cars",
  },
];

const ADVISOR = {
  name: "Sofia Martinez",
  title: "Senior Property Advisor",
  phone: "+34 600 000 000",
  email: "sofia@prestigeestates.com",
  image: null,
};

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

/* ─── Gallery ─── */
const ImageGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        <img
          src={images[current]}
          alt={`${title} - Photo ${current + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: palette.text }} />
            </button>
            <button
              onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5" style={{ color: palette.text }} />
            </button>
          </>
        )}
        {/* Counter */}
        <span
          className="absolute bottom-4 right-4 text-[13px] px-3 py-1.5 rounded-full backdrop-blur-sm"
          style={{ background: "rgba(45,41,38,0.6)", color: "#fff" }}
        >
          {current + 1} / {images.length}
        </span>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative flex-1 aspect-[16/10] overflow-hidden rounded-sm transition-opacity"
            style={{ opacity: i === current ? 1 : 0.5 }}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            {i === current && (
              <div className="absolute inset-0 border-2" style={{ borderColor: palette.accent }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Recently Viewed Card ─── */
const RecentlyViewedCard = ({ property }: { property: typeof PROPERTIES[0] }) => (
  <Link
    to={`/property/${property.id}`}
    className="group flex-shrink-0 w-[280px] rounded-sm overflow-hidden border transition-shadow hover:shadow-md"
    style={{ borderColor: palette.border, background: palette.white }}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <p className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ color: palette.textLight }}>
        {property.location}
      </p>
      <h4 className="text-[14px] font-medium leading-snug mb-2 line-clamp-1" style={{ color: palette.text }}>
        {property.title}
      </h4>
      <div className="flex items-center gap-4 text-[12px] mb-2" style={{ color: palette.textMuted }}>
        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.beds}</span>
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.baths}</span>
        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{property.sqm} m²</span>
      </div>
      <p className="text-[15px] font-medium" style={{ color: palette.text }}>{property.price}</p>
    </div>
  </Link>
);

/* ─── Main Component ─── */
const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = PROPERTIES.find((p) => p.id === Number(id)) || PROPERTIES[0];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [saved, setSaved] = useState(false);

  const recentlyViewed = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 4);

  return (
    <Layout navVariant="solid" activePath="/properties">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase" style={{ color: palette.textLight }}>
          <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/properties" className="hover:opacity-70 transition-opacity">Properties</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: palette.text }}>{property.ref}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left column: content */}
          <div className="lg:col-span-8">
            {/* Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Badges */}
            <div className="flex items-center gap-3 mt-6">
              {property.exclusive && (
                <span
                  className="text-[11px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 rounded-sm"
                  style={{ background: palette.accent, color: palette.white }}
                >
                  Exclusive
                </span>
              )}
              {property.alsoForRent && (
                <span
                  className="text-[11px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 rounded-sm border"
                  style={{ borderColor: palette.accent, color: palette.accent }}
                >
                  Also for Rent
                </span>
              )}
              <span
                className="text-[11px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 rounded-sm border"
                style={{ borderColor: palette.border, color: palette.textMuted }}
              >
                {property.tag}
              </span>
            </div>

            {/* Title & Location */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" style={{ color: palette.accent }} />
                <span className="text-[13px] tracking-[0.12em] uppercase" style={{ color: palette.textMuted }}>
                  {property.location}
                </span>
              </div>
              <h1
                className="text-[28px] md:text-[34px] font-light leading-tight mb-2"
                style={{ fontFamily: fonts.heading, color: palette.text }}
              >
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-[13px]" style={{ color: palette.textLight }}>
                <span>{property.style}</span>
                <span style={{ color: palette.border }}>|</span>
                <span className="font-mono tracking-wide">{property.ref}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 p-5 rounded-sm" style={{ background: palette.bgAlt }}>
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-[28px] font-medium" style={{ color: palette.text }}>
                  {property.price}
                </span>
                <span className="text-[13px]" style={{ color: palette.textLight }}>
                  {property.pricePerSqm}
                </span>
              </div>
              {property.alsoForRent && property.rentalPrice && (
                <p className="text-[14px] mt-2" style={{ color: palette.accent }}>
                  Rental available: {property.rentalPrice}
                </p>
              )}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Bedrooms", value: property.beds, icon: Bed },
                { label: "Bathrooms", value: property.baths, icon: Bath },
                { label: "Built Area", value: `${property.sqm} m²`, icon: Maximize },
                ...(property.plot ? [{ label: "Plot Size", value: `${property.plot.toLocaleString()} m²`, icon: MapPin }] : []),
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center p-4 rounded-sm border text-center"
                  style={{ borderColor: palette.border }}
                >
                  <spec.icon className="w-5 h-5 mb-2" style={{ color: palette.accent }} />
                  <span className="text-[11px] tracking-[0.12em] uppercase mb-1" style={{ color: palette.textLight }}>
                    {spec.label}
                  </span>
                  <span className="text-[18px] font-light" style={{ color: palette.text }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { label: "Year Built", value: property.yearBuilt },
                { label: "Energy Rating", value: property.energyRating },
                { label: "Orientation", value: property.orientation },
                { label: "Parking", value: property.parking },
              ].map((detail) => (
                <div key={detail.label} className="py-3 border-b" style={{ borderColor: palette.border }}>
                  <span className="text-[11px] tracking-[0.12em] uppercase block mb-0.5" style={{ color: palette.textLight }}>
                    {detail.label}
                  </span>
                  <span className="text-[15px]" style={{ color: palette.text }}>{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2
                className="text-[20px] font-medium mb-5"
                style={{ fontFamily: fonts.heading, color: palette.text }}
              >
                Description
              </h2>
              <div
                className="text-[15px] leading-[1.8] whitespace-pre-line"
                style={{ color: palette.textMuted }}
              >
                {property.description}
              </div>
            </div>

            {/* Features */}
            <div className="mt-10">
              <h2
                className="text-[20px] font-medium mb-5"
                style={{ fontFamily: fonts.heading, color: palette.text }}
              >
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 py-2">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[14px]" style={{ color: palette.text }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-10 pt-8 border-t" style={{ borderColor: palette.border }}>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[13px] tracking-[0.08em] uppercase transition-colors hover:opacity-80"
                style={{ background: palette.text, color: palette.white }}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[13px] tracking-[0.08em] uppercase border transition-colors hover:opacity-80"
                style={{ borderColor: palette.border, color: palette.text }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[13px] tracking-[0.08em] uppercase border transition-colors hover:opacity-80"
                style={{
                  borderColor: saved ? palette.accent : palette.border,
                  color: saved ? palette.accent : palette.text,
                  background: saved ? `${palette.accent}10` : "transparent",
                }}
              >
                <Heart className="w-4 h-4" fill={saved ? palette.accent : "none"} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Right column: sticky advisor sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[100px] space-y-6">
              {/* Advisor card */}
              <div className="rounded-sm border p-6" style={{ borderColor: palette.border, background: palette.white }}>
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: palette.bgAlt }}
                  >
                    <User className="w-6 h-6" style={{ color: palette.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-medium" style={{ color: palette.text }}>
                      {ADVISOR.name}
                    </h3>
                    <p className="text-[12px]" style={{ color: palette.textLight }}>
                      {ADVISOR.title}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`tel:${ADVISOR.phone}`}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-sm text-[13px] transition-colors hover:opacity-80"
                    style={{ background: palette.text, color: palette.white }}
                  >
                    <Phone className="w-4 h-4" />
                    {ADVISOR.phone}
                  </a>
                  <a
                    href={`mailto:${ADVISOR.email}`}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-sm text-[13px] border transition-colors hover:opacity-80"
                    style={{ borderColor: palette.border, color: palette.text }}
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>

              {/* Schedule a visit */}
              <div className="rounded-sm border p-6" style={{ borderColor: palette.border, background: palette.white }}>
                <h3 className="text-[16px] font-medium mb-1" style={{ color: palette.text }}>
                  Schedule a Visit
                </h3>
                <p className="text-[13px] mb-5" style={{ color: palette.textLight }}>
                  Book a private viewing of this property
                </p>

                {/* Date selector */}
                <label className="block mb-4">
                  <span className="text-[11px] tracking-[0.12em] uppercase block mb-2" style={{ color: palette.textLight }}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
                    Preferred Date
                  </span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded-sm px-3 py-2.5 text-[14px] focus:outline-none transition-colors"
                    style={{
                      borderColor: palette.border,
                      color: palette.text,
                      fontFamily: fonts.body,
                    }}
                  />
                </label>

                {/* Time slots */}
                <div className="mb-5">
                  <span className="text-[11px] tracking-[0.12em] uppercase block mb-2" style={{ color: palette.textLight }}>
                    <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                    Preferred Time
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className="py-2 text-[13px] rounded-sm border transition-colors"
                        style={{
                          borderColor: selectedTime === time ? palette.accent : palette.border,
                          background: selectedTime === time ? palette.accent : "transparent",
                          color: selectedTime === time ? palette.white : palette.textMuted,
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-sm text-[13px] tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-90"
                  style={{ background: palette.accent, color: palette.white }}
                >
                  Request Viewing
                </button>
              </div>

              {/* Quick facts */}
              <div className="rounded-sm border p-6" style={{ borderColor: palette.border, background: palette.white }}>
                <h3 className="text-[14px] font-medium mb-4" style={{ color: palette.text }}>
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Reference", value: property.ref },
                    { label: "Type", value: property.style },
                    { label: "Energy Rating", value: property.energyRating },
                    { label: "Year Built", value: String(property.yearBuilt) },
                    { label: "Orientation", value: property.orientation },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-[13px]">
                      <span style={{ color: palette.textLight }}>{item.label}</span>
                      <span style={{ color: palette.text }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-20 pt-10 border-t" style={{ borderColor: palette.border }}>
          <h2
            className="text-[22px] font-light mb-6"
            style={{ fontFamily: fonts.heading, color: palette.text }}
          >
            Recently Viewed
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {recentlyViewed.map((p) => (
              <RecentlyViewedCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
