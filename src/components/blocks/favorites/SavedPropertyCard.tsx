/**
 * SAVED PROPERTY CARD
 * Individual card with image, specs, price, and hover actions (share/delete).
 * Origin: FavoritesPage
 */

import { Bed, Bath, Maximize, MapPin, Share2, Trash2 } from "lucide-react";

interface SavedPropertyCardProps {
  image?: string;
  name?: string;
  location?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  tag?: string;
  ref?: string;
  onRemove?: () => void;
  onShare?: () => void;
}

const SavedPropertyCard = ({
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  name = "Luxury Villa Santa Eulalia",
  location = "Santa Eulalia del Río, Ibiza",
  price = "€4,650,000",
  beds = 5,
  baths = 4,
  sqm = 420,
  tag = "FOR SALE",
  ref: propRef = "PE-IBZ-2847",
  onRemove,
  onShare,
}: SavedPropertyCardProps) => (
  <div className="group border border-neutral-200 rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-md relative bg-white">
    {/* Image */}
    <div className="relative overflow-hidden aspect-[4/3]">
      <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium bg-white/90 text-neutral-900">
        {tag}
      </span>
    </div>

    {/* Hover actions */}
    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={onShare} className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white/90" aria-label="Share">
        <Share2 className="w-3.5 h-3.5 text-neutral-500" />
      </button>
      <button onClick={onRemove} className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white/90 hover:bg-red-50" aria-label="Remove">
        <Trash2 className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>

    {/* Info */}
    <div className="p-5">
      <p className="text-[12px] tracking-[0.12em] uppercase font-light mb-1 flex items-center gap-1.5 text-neutral-500">
        <MapPin className="w-3 h-3" strokeWidth={1.5} />
        {location}
      </p>
      <h3 className="text-[15px] font-medium leading-snug mb-3 line-clamp-2 group-hover:opacity-75 transition-opacity text-neutral-900">
        {name}
      </h3>
      <div className="flex items-center gap-4 mb-3 text-[13px] font-light text-neutral-500">
        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" strokeWidth={1.5} /> {beds}</span>
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {baths}</span>
        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {sqm} m²</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-light tracking-tight text-neutral-900">{price}</p>
        <span className="text-[11px] font-mono tracking-wider text-neutral-400">REF-{propRef}</span>
      </div>
    </div>
  </div>
);

export default SavedPropertyCard;
