/**
 * LISTING MOBILE STICKY NAV
 * Fixed bottom bar with Call / Chat / Contact actions.
 * Origin: LuxuryPropertyListingV2 → mobile bottom nav
 */

import { Phone, MessageCircle, Mail } from "lucide-react";

export interface ListingMobileStickyNavProps {
  phoneNumber?: string;
  onChat?: () => void;
  contactHref?: string;
}

export default function ListingMobileStickyNav({
  phoneNumber = "+34600123456",
  onChat,
  contactHref = "/contact",
}: ListingMobileStickyNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center">
        <a href={`tel:${phoneNumber}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
          <Phone className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span>
        </a>
        <div className="w-px h-8 bg-neutral-200" />
        <button onClick={onChat} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Chat</span>
        </button>
        <div className="w-px h-8 bg-neutral-200" />
        <a href={contactHref} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
          <Mail className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Contact</span>
        </a>
      </div>
    </div>
  );
}
