/**
 * LISTING PROPERTY CARD
 * Horizontal card for property listings with mobile-optimized layout.
 * Mobile: price overlay with gradient on image, no tag/mail icon, no excerpt.
 * Desktop: full layout with tag, mail icon, excerpt, features, price footer.
 * Origin: LuxuryPropertyListingV2
 * 
 * Props:
 * - image: Property image URL
 * - tag: Listing tag (e.g. "FOR SALE", "NEW BUILD")
 * - style: Property style label (e.g. "Contemporary", "Traditional")
 * - location: Location string
 * - title: Property title (uppercase)
 * - excerpt: Description text (desktop only)
 * - beds, baths, sqm, plot: Property specs
 * - price: Formatted price string
 * - features: Array of feature labels
 * - ref: Property reference code
 * - href: Link destination
 * - galleryCount: Number of gallery images (shows counter badge)
 */

import { useState } from "react";
import { Bed, Bath, Maximize, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";

interface ListingPropertyCardProps {
  image?: string;
  tag?: string;
  style?: string;
  location?: string;
  title?: string;
  excerpt?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number | null;
  price?: string;
  features?: string[];
  ref_code?: string;
  href?: string;
  galleryCount?: number;
}

const ListingPropertyCard = ({
  image = heroImg,
  tag = "FOR SALE",
  style = "Contemporary",
  location = "Santa Eulalia del Río · Ibiza",
  title = "STUNNING CONTEMPORARY VILLA WITH PANORAMIC SEA VIEWS",
  excerpt = "This exceptional contemporary villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea...",
  beds = 5,
  baths = 4,
  sqm = 420,
  plot = 1200,
  price = "€4,650,000",
  features = ["Sea Views", "Infinity Pool", "Smart Home", "Garage"],
  ref_code = "REF-0001",
  href = "#",
  galleryCount = 3,
}: ListingPropertyCardProps) => {
  const isMobile = useIsMobile();

  return (
    <a
      href={href}
      className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
        {tag === "NEW BUILD" && (
          <span className="absolute top-3 left-3 bg-neutral-900/60 backdrop-blur-sm text-white text-[12px] tracking-[0.12em] uppercase font-medium px-2.5 py-1">
            New Build
          </span>
        )}
        {galleryCount > 1 && (
          <span className="absolute bottom-3 right-3 bg-neutral-900/60 text-white text-[12px] px-2 py-1 font-light">
            1/{galleryCount}
          </span>
        )}
        {/* Mobile: price overlay with gradient */}
        {isMobile && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 text-white text-[17px] font-semibold tracking-wide drop-shadow-md">
              {price}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
        {/* Desktop: tag + mail icon */}
        {!isMobile && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] tracking-[0.15em] uppercase border border-neutral-900/30 text-neutral-900/70 px-2.5 py-1 font-medium">
              {tag}
            </span>
            <button onClick={(e) => e.preventDefault()} className="text-neutral-900/30 hover:text-neutral-900 transition-colors">
              <Mail className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-900/60 mb-1">{location}</p>
        <p className="text-[13px] text-neutral-900/55 font-light mb-1.5">
          Detached houses <span className="mx-1 text-neutral-900/30">|</span>{" "}
          <span className="italic">{style}</span>{" "}
          <span className="mx-1 text-neutral-900/30">|</span>{" "}
          <span className="font-mono text-neutral-900/45 tracking-wide text-[12px]">{ref_code}</span>
        </p>
        <h2 className="text-[17px] md:text-[19px] font-medium text-neutral-900 leading-snug mb-1.5 group-hover:text-neutral-900/75 transition-colors duration-300">
          {title}
        </h2>
        {!isMobile && (
          <p className="text-[14px] text-neutral-900/60 font-light leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
        )}

        {/* Specs */}
        <div className="flex items-center gap-7 mb-5">
          <div className="text-center">
            <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/50 mb-0.5">Beds</p>
            <p className="text-[16px] text-neutral-900 font-light">{beds}</p>
          </div>
          <div className="text-center">
            <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/50 mb-0.5">Baths</p>
            <p className="text-[16px] text-neutral-900 font-light">{baths}</p>
          </div>
          <div className="text-center">
            <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/50 mb-0.5">Built</p>
            <p className="text-[16px] text-neutral-900 font-light">{sqm} m²</p>
          </div>
          {plot && (
            <div className="text-center">
              <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/50 mb-0.5">Plot</p>
              <p className="text-[16px] text-neutral-900 font-light">{plot.toLocaleString()} m²</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2.5">
          {features.map((f, i) => (
            <span key={i} className="text-[12px] text-neutral-900/55 font-light flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-neutral-900/30" />
              {f}
            </span>
          ))}
        </div>

        {/* Desktop: price at bottom */}
        {!isMobile && (
          <div className="mt-auto pt-5 border-t border-neutral-100">
            <p className="text-2xl md:text-[28px] font-extralight text-neutral-900 tracking-tight">{price}</p>
          </div>
        )}
      </div>
    </a>
  );
};

export default ListingPropertyCard;
