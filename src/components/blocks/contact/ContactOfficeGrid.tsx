import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

interface Office {
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

interface ContactOfficeGridProps {
  sectionLabel?: string;
  title?: string;
  offices?: Office[];
  accentColor?: string;
}

export default function ContactOfficeGrid({
  sectionLabel = "Visit Us",
  title = "Our Offices",
  offices = [
    { name: "Marbella", label: "Headquarters", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", address: "Av. Ricardo Soriano, 72, 29601 Marbella", phone: "+34 952 123 456", email: "marbella@example.com", hours: "Mon–Fri 9:00–19:00 · Sat 10:00–14:00", lat: 36.51, lng: -4.88 },
    { name: "Ibiza", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", address: "Paseo Vara de Rey, 15, 07800 Ibiza", phone: "+34 971 234 567", email: "ibiza@example.com", hours: "Mon–Fri 9:30–18:30", lat: 38.91, lng: 1.43 },
    { name: "Palma de Mallorca", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", address: "Paseo del Borne, 28, 07012 Palma", phone: "+34 971 345 678", email: "mallorca@example.com", hours: "Mon–Fri 9:00–18:00", lat: 39.57, lng: 2.65 },
  ],
  accentColor = "#8b6f47",
}: ContactOfficeGridProps) {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em] text-[#2C2825]">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, i) => (
            <div key={i} className="group border border-[#e8e4df]">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img src={office.image} alt={`Office in ${office.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,41,38,0.5) 0%, transparent 50%)" }} />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-[16px] font-light tracking-[0.04em] text-white">{office.name}</h3>
                  <p className="text-[10px] font-light tracking-[0.1em] text-white/60">{office.label}</p>
                </div>
              </div>
              <div className="p-5 space-y-2.5">
                <div className="flex items-start gap-2.5"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accentColor }} /><span className="text-[12px] font-light leading-[1.5] text-[#8a8580]">{office.address}</span></div>
                <div className="flex items-center gap-2.5"><Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} /><a href={`tel:${office.phone}`} className="text-[12px] font-light hover:underline text-[#8a8580]">{office.phone}</a></div>
                <div className="flex items-center gap-2.5"><Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} /><a href={`mailto:${office.email}`} className="text-[12px] font-light hover:underline text-[#8a8580]">{office.email}</a></div>
                <div className="flex items-center gap-2.5"><Clock className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} /><span className="text-[12px] font-light text-[#b0aaa3]">{office.hours}</span></div>
              </div>
              <div className="px-5 pb-5">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80 border border-[#e8e4df] text-[#2C2825]">
                  <Navigation className="w-3.5 h-3.5" /> Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
