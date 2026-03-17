/**
 * LISTING BRANDED RESIDENCE PROMO CARD
 * Promotional card injected into property listings for branded residences.
 * Premium styling with gold accents, crown badge, and gradient border.
 * Mobile: price overlay with gradient on image.
 * Desktop: full layout with price footer.
 * Origin: LuxuryPropertyListingV2
 *
 * Props:
 * - image: Project image URL
 * - name: Residence name
 * - location: Location string
 * - description: Short description
 * - priceRange: Price range string
 * - href: Link destination
 */

import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

import prop1 from "@/assets/luxury-property-1.jpg";

interface ListingBrandedCardProps {
  image?: string;
  name?: string;
  location?: string;
  description?: string;
  priceRange?: string;
  href?: string;
}

const ListingBrandedCard = ({
  image = prop1,
  name = "FOUR SEASONS PRIVATE RESIDENCES",
  location = "Marbella · Costa del Sol",
  description = "Oceanfront residences with full Four Seasons hotel services, private beach club and world-class spa.",
  priceRange = "€3,500,000 — €8,200,000",
  href = "#",
}: ListingBrandedCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Link
      to={href}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 bg-[hsl(36,18%,96%)] border border-amber-600/25 ring-1 ring-amber-600/10"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

      {/* Image */}
      <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-amber-600 text-white text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-sm">
          <Crown className="w-3 h-3" /> Branded Residence
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
        <p className="text-[14px] text-neutral-900/60 font-light leading-relaxed mb-5 line-clamp-2">{description}</p>

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

export default ListingBrandedCard;
