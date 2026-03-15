import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

interface Office {
  id?: string;
  name?: string;
  label?: string;
  image?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  lat?: number;
  lng?: number;
}

interface ContactOfficeTabsProps {
  sectionLabel?: string;
  title?: string;
  offices?: Office[];
  accentColor?: string;
}

export default function ContactOfficeTabs({
  sectionLabel = "Visit Us",
  title = "Our Offices",
  offices = [
    { id: "marbella", name: "Marbella", label: "Headquarters", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", address: "Av. Ricardo Soriano, 72, 29601 Marbella, Málaga", phone: "+34 952 123 456", email: "marbella@example.com", hours: "Mon–Fri 9:00–19:00 · Sat 10:00–14:00", lat: 36.51, lng: -4.88 },
    { id: "ibiza", name: "Ibiza", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", address: "Paseo Vara de Rey, 15, 07800 Ibiza", phone: "+34 971 234 567", email: "ibiza@example.com", hours: "Mon–Fri 9:30–18:30", lat: 38.91, lng: 1.43 },
    { id: "mallorca", name: "Palma de Mallorca", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", address: "Paseo del Borne, 28, 07012 Palma", phone: "+34 971 345 678", email: "mallorca@example.com", hours: "Mon–Fri 9:00–18:00", lat: 39.57, lng: 2.65 },
  ],
  accentColor = "#8b6f47",
}: ContactOfficeTabsProps) {
  const [activeOffice, setActiveOffice] = useState(offices[0]?.id || "");
  const office = offices.find((o) => o.id === activeOffice) || offices[0];

  return (
    <section className="py-16 md:py-24 bg-[#f8f6f3]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em] text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          {offices.map((o) => (
            <button
              key={o.id}
              onClick={() => setActiveOffice(o.id || "")}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-[12px] tracking-[0.08em] font-light transition-all duration-300"
              style={{
                border: `1px solid ${activeOffice === o.id ? "#2C2825" : "#e8e4df"}`,
                background: activeOffice === o.id ? "#2C2825" : "transparent",
                color: activeOffice === o.id ? "white" : "#8a8580",
              }}
            >
              {o.name}
            </button>
          ))}
        </div>

        {/* Active office card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-[#e8e4df] bg-white">
          <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
            <img src={office.image} alt={`Office in ${office.name}`} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: accentColor }}>{office.label}</p>
            <h3 className="text-[24px] font-extralight tracking-[0.02em] mb-6 text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>{office.name}</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} /><span className="text-[13px] font-light leading-[1.6] text-[#8a8580]">{office.address}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: accentColor }} /><a href={`tel:${office.phone}`} className="text-[13px] font-light hover:underline text-[#8a8580]">{office.phone}</a></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" style={{ color: accentColor }} /><a href={`mailto:${office.email}`} className="text-[13px] font-light hover:underline text-[#8a8580]">{office.email}</a></div>
              <div className="flex items-center gap-3"><Clock className="w-4 h-4 shrink-0" style={{ color: accentColor }} /><span className="text-[13px] font-light text-[#b0aaa3]">{office.hours}</span></div>
            </div>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80 self-start border border-[#2C2825] text-[#2C2825]">
              <Navigation className="w-3.5 h-3.5" /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
