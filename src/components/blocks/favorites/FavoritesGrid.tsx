import { Heart, Bed, Bath, Maximize, MapPin, Trash2, Share2, ArrowRight } from "lucide-react";

interface SavedProperty {
  image?: string;
  name?: string;
  location?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  ref?: string;
  tag?: string;
  href?: string;
}

interface FavoritesGridProps {
  properties?: SavedProperty[];
  onRemove?: (index: number) => void;
  accentColor?: string;
}

export default function FavoritesGrid({
  properties = [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", name: "Luxury Villa Santa Eulalia", location: "Santa Eulalia del Río, Ibiza", price: "€4,650,000", beds: 5, baths: 4, sqm: 420, ref: "PE-IBZ-2847", tag: "FOR SALE", href: "#" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, ref: "PE-IBZ-3001", tag: "FOR SALE", href: "#" },
    { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", name: "Modern Penthouse Marina", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, ref: "PE-IBZ-3002", tag: "FOR SALE", href: "#" },
  ],
  onRemove,
  accentColor = "#8b6f47",
}: FavoritesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {properties.map((prop, i) => (
        <div key={i} className="group border border-[#e8e4df] rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-md relative bg-white">
          {/* Image */}
          <a href={prop.href || "#"} className="block relative overflow-hidden aspect-[4/3]">
            <img src={prop.image} alt={prop.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium bg-white/90 text-[#2C2825]">
              {prop.tag}
            </span>
          </a>

          {/* Actions overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white/90" aria-label="Share">
              <Share2 className="w-3.5 h-3.5 text-[#8a8580]" />
            </button>
            {onRemove && (
              <button onClick={() => onRemove(i)} className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white/90 hover:bg-red-50" aria-label="Remove">
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            )}
          </div>

          {/* Info */}
          <a href={prop.href || "#"} className="block p-5">
            <p className="text-[12px] tracking-[0.12em] uppercase font-light mb-1 flex items-center gap-1.5 text-[#8a8580]">
              <MapPin className="w-3 h-3" strokeWidth={1.5} /> {prop.location}
            </p>
            <h3 className="text-[15px] font-medium leading-snug mb-3 line-clamp-2 group-hover:opacity-75 transition-opacity text-[#2C2825]">
              {prop.name}
            </h3>
            <div className="flex items-center gap-4 mb-3 text-[13px] font-light text-[#8a8580]">
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.beds}</span>
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.baths}</span>
              <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {prop.sqm} m²</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-light tracking-tight text-[#2C2825]">{prop.price}</p>
              <span className="text-[11px] font-mono tracking-wider text-[#b0aaa3]">REF-{prop.ref}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
