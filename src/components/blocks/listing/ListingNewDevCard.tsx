/**
 * LISTING NEW DEVELOPMENT PROMO CARD
 * Promotional card injected into property listings for new developments.
 * Displays project image, name, description, available units, delivery date, and price range.
 * Mobile: price overlay with gradient, units/delivery shown in content area.
 * Desktop: full layout with price footer.
 * Origin: LuxuryPropertyListingV2
 *
 * Props:
 * - image: Project image URL
 * - name: Project name
 * - location: Location string
 * - description: Short project description
 * - priceRange: Price range string (e.g. "€485,000 — €1,250,000")
 * - availableUnits: Number of available units
 * - delivery: Delivery date string (e.g. "Q4 2026")
 * - href: Link destination
 */

import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

import detail1 from "@/assets/property-detail-1.jpg";

interface ListingNewDevCardProps {
  image?: string;
  name?: string;
  location?: string;
  description?: string;
  priceRange?: string;
  availableUnits?: number;
  delivery?: string;
  href?: string;
}

const ListingNewDevCard = ({
  image = detail1,
  name = "MAREA RESIDENCES",
  location = "Altea · Costa Blanca",
  description = "Contemporary beachfront apartments with panoramic sea views and communal pools.",
  priceRange = "€485,000 — €1,250,000",
  availableUnits = 12,
  delivery = "Q4 2026",
  href = "#",
}: ListingNewDevCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Link
      to={href}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 bg-[hsl(30,20%,96%)] border border-neutral-900/10"
    >
      {/* Image */}
      <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-neutral-900/80 text-white text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-sm">
          <Building2 className="w-3 h-3" /> New Development
        </span>
        {isMobile && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 text-white text-[17px] font-semibold tracking-wide drop-shadow-md">
              {priceRange}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
        <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-900/60 mb-1">{location}</p>
        <h2 className="text-[17px] md:text-[19px] font-medium text-neutral-900 leading-snug mb-1.5">{name}</h2>
        <p className="text-[14px] text-neutral-900/60 font-light leading-relaxed mb-3 line-clamp-2">{description}</p>

        {/* Units & Delivery */}
        <div className="flex items-center gap-4 text-[13px] text-neutral-900/55 font-light">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-neutral-900/40" /> {availableUnits} units available
          </span>
          <span>Delivery {delivery}</span>
        </div>

        {/* Desktop: price at bottom */}
        {!isMobile && (
          <div className="mt-auto pt-5 border-t border-neutral-100">
            <p className="text-2xl md:text-[28px] font-extralight text-neutral-900 tracking-tight">{priceRange}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ListingNewDevCard;
