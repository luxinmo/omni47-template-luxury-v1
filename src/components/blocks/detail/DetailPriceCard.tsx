/**
 * DETAIL PRICE CARD
 * Sticky sidebar price card with CTA buttons.
 * Origin: PropertyDetail V6
 */

import { Phone, MessageCircle, Mail, Home, BellRing } from "lucide-react";

interface DetailPriceCardProps {
  tag?: string;
  priceFormatted?: string;
  originalPrice?: string;
  discount?: number;
  pricePerSqm?: string;
  alsoForRent?: boolean;
  rentalPrice?: string;
  ref?: string;
  phone?: string;
  whatsapp?: string;
  ctaText?: string;
  onEnquiryClick?: () => void;
}

const DetailPriceCard = ({
  tag = "FOR SALE",
  priceFormatted = "€4,650,000",
  originalPrice = "€5,200,000",
  discount = 11,
  pricePerSqm = "€11,071/m²",
  alsoForRent = true,
  rentalPrice = "€18,500/mes",
  ref: refCode = "PE-IBZ-2847",
  phone = "+34 600 123 456",
  whatsapp = "34600123456",
  ctaText = "Send Enquiry",
  onEnquiryClick,
}: DetailPriceCardProps) => (
  <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6">
    {/* Tag */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] tracking-[0.15em] uppercase border border-neutral-400 text-neutral-600 px-2.5 py-1 font-medium">{tag}</span>
    </div>

    {/* Price */}
    <div className="flex flex-wrap items-baseline gap-3 mb-1">
      <p className="text-[32px] font-medium text-neutral-900 tracking-tight leading-none">{priceFormatted}</p>
      {originalPrice && <span className="text-[14px] text-neutral-300 line-through font-light">{originalPrice}</span>}
      {discount > 0 && (
        <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-amber-700 bg-amber-700/10 px-2 py-0.5">-{discount}%</span>
      )}
    </div>
    <div className="flex items-center gap-2.5 mb-1">
      <p className="text-[12px] text-neutral-500">{pricePerSqm}</p>
      <span className="w-px h-3 bg-neutral-200" />
      <button className="group/alert flex items-center gap-1.5 text-[11px] tracking-[0.06em] text-luxury-gold/80 hover:text-luxury-gold font-light transition-colors">
        <BellRing className="w-3 h-3 group-hover/alert:animate-[wiggle_0.4s_ease-in-out]" strokeWidth={1.4} />
        Avísame si baja el precio
      </button>
    </div>
    {alsoForRent && (
      <p className="text-[13px] text-neutral-500 mb-4 flex items-center gap-1.5">
        <Home className="w-3.5 h-3.5 text-amber-700/80" /> Also for rent: <span className="font-medium text-neutral-700">{rentalPrice}</span>
      </p>
    )}

    {/* CTA buttons */}
    <div className="flex gap-2 mb-2">
      <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-800 transition-all">
        <Phone className="w-3.5 h-3.5" /> Call
      </a>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-[#22bf5b] transition-all">
        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
      </a>
    </div>
    <button
      onClick={onEnquiryClick}
      className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-neutral-900 text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all mb-5"
    >
      <Mail className="w-3.5 h-3.5" /> {ctaText}
    </button>

    {/* Footer */}
    <div className="border-t border-neutral-200 pt-5">
      <p className="text-[13px] text-neutral-400 font-light leading-relaxed text-center">
        Get in touch for a personal consultation or to arrange a private viewing.
      </p>
      <p className="text-[14px] text-neutral-500 font-mono text-center mt-3 tracking-[0.05em]">REF-{refCode}</p>
    </div>
  </div>
);

export default DetailPriceCard;
