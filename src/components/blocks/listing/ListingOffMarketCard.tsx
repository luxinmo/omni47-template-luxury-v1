/**
 * LISTING OFF-MARKET PROPERTY CARD
 * Card for off-market properties in the listing grid.
 * Displays blurred image with lock icon, property specs, features, and price.
 * Access is restricted — clicking opens an enquiry modal with property photo + REF.
 * The modal captures lead data before granting access to property details.
 * Origin: LuxuryPropertyListingV2
 *
 * Props:
 * - image: Property image URL (will be blurred)
 * - style: Property type label (e.g. "Luxury Villa", "Penthouse")
 * - location: Location string
 * - beds, baths, sqm, plot: Property specs
 * - price: Price string (can be real price or "Price on Request")
 * - features: Array of feature labels
 * - ref_code: Property reference (e.g. "REF-0010")
 */

import { useState } from "react";
import { Lock, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import prop2 from "@/assets/luxury-property-2.jpg";

interface ListingOffMarketCardProps {
  image?: string;
  style?: string;
  location?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  plot?: number | null;
  price?: string;
  features?: string[];
  ref_code?: string;
}

const ListingOffMarketCard = ({
  image = prop2,
  style = "Luxury Villa",
  location = "Ibiza",
  beds = 7,
  baths = 6,
  sqm = 650,
  plot = 3500,
  price = "Price on Request",
  features = ["Sea Views", "Infinity Pool", "Guest House", "Wine Cellar"],
  ref_code = "REF-0010",
}: ListingOffMarketCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const offmarketTitle = `${style.toUpperCase()} FOR SALE OFF-MARKET`;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer relative"
      >
        {/* Image — blurred */}
        <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]">
          <img src={image} alt="Off-market" className="w-full h-full object-cover absolute inset-0 filter blur-lg scale-110" />
          <div className="absolute inset-0 bg-neutral-900/40 flex flex-col items-center justify-center gap-3">
            <Lock className="w-8 h-8 text-white/80" />
            <span className="text-[12px] tracking-[0.2em] uppercase text-white/90 font-medium">Off-Market</span>
          </div>
          {isMobile && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-white text-[17px] font-semibold tracking-wide drop-shadow-md">
                {price}
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div className="md:col-span-7 flex flex-col p-5 md:p-6 lg:p-8">
          {!isMobile && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] tracking-[0.15em] uppercase border border-neutral-900/30 text-neutral-900/70 px-2.5 py-1 font-medium bg-amber-50">
                OFF-MARKET
              </span>
              <Lock className="w-4 h-4 text-neutral-900/30" />
            </div>
          )}
          <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-900/60 mb-1">{location}</p>
          <h2 className="text-[17px] md:text-[19px] font-medium text-neutral-900 leading-snug mb-1.5">{offmarketTitle}</h2>
          <p className="text-[13px] text-neutral-900/50 font-light mb-3 italic flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> Exclusive listing — access restricted. Contact us to receive details.
          </p>

          {/* Specs */}
          <div className="flex items-center gap-7 mb-4">
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
          <div className="flex flex-wrap gap-2.5 mb-4">
            {features.map((f, i) => (
              <span key={i} className="text-[12px] text-neutral-900/55 font-light flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-neutral-900/30" />
                {f}
              </span>
            ))}
          </div>

          {/* Desktop: price + request access */}
          {!isMobile && (
            <div className="mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between">
              <p className="text-2xl md:text-[28px] font-extralight text-neutral-900 tracking-tight">{price}</p>
              <span className="text-[12px] tracking-[0.1em] uppercase text-neutral-900/50 font-light flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Request access
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[520px] rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-end px-5 pt-4 pb-0">
                <button onClick={() => setModalOpen(false)} className="text-neutral-900/40 hover:text-neutral-900 z-10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Property preview card */}
              <div className="p-5 pt-3 pb-0">
                <div className="flex gap-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                  <img src={image} alt={offmarketTitle} className="w-24 h-20 object-cover shrink-0 filter blur-sm" />
                  <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                    <p className="text-[13px] font-medium text-neutral-900 leading-tight line-clamp-2 uppercase tracking-[0.02em]">
                      {offmarketTitle}
                    </p>
                    <p className="text-[14px] text-neutral-900/70 font-medium mt-1">{price}</p>
                    <span className="text-[11px] text-neutral-900/40 font-mono tracking-[0.05em] mt-0.5">{ref_code}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-neutral-900/50" />
                  <span className="text-[12px] tracking-[0.15em] uppercase text-neutral-900/60 font-medium">Private Listing</span>
                </div>
                <p className="text-[13px] text-neutral-900/55 font-light leading-relaxed">
                  This property is part of our exclusive off-market portfolio. Complete the form below and a specialist will contact you with full details.
                </p>
              </div>

              <form
                className="p-5 pt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setModalOpen(false);
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/40 focus:outline-none focus:border-neutral-900/50 transition-colors rounded-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/40 focus:outline-none focus:border-neutral-900/50 transition-colors rounded-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/40 focus:outline-none focus:border-neutral-900/50 transition-colors rounded-sm"
                />
                <textarea
                  placeholder="I'm interested in this property..."
                  rows={3}
                  className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-900/40 focus:outline-none focus:border-neutral-900/50 transition-colors resize-none rounded-sm"
                />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-neutral-900" />
                  <span className="text-[12px] text-neutral-900/50 font-light leading-relaxed">
                    I accept the terms and privacy policy.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-neutral-900 text-white text-[13px] tracking-[0.12em] uppercase py-3.5 hover:bg-neutral-900/85 transition-all"
                >
                  Request Property Details
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListingOffMarketCard;
