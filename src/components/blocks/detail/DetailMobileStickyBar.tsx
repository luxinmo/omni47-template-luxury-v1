import React from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";

interface DetailMobileStickyBarProps {
  phone?: string;
  whatsapp?: string;
  onEnquiry?: () => void;
}

/**
 * DetailMobileStickyBar — Fixed bottom contact bar for mobile/tablet.
 * Shows Call, WhatsApp, and Enquiry buttons.
 * In the catalog it renders inline; in production it should be `fixed bottom-0`.
 */
const DetailMobileStickyBar: React.FC<DetailMobileStickyBarProps> = ({
  phone = "+34 600 123 456",
  whatsapp = "34600123456",
  onEnquiry,
}) => {
  return (
    <div className="bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-0">
      <a href={`tel:${phone}`} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
        <Phone className="w-4 h-4" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Call</span>
      </a>
      <div className="w-px h-8 bg-neutral-200" />
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[#25D366] hover:bg-neutral-50 transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-medium">WhatsApp</span>
      </a>
      <div className="w-px h-8 bg-neutral-200" />
      <button onClick={onEnquiry} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
        <Mail className="w-4 h-4" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-medium">Enquiry</span>
      </button>
    </div>
  );
};

export default DetailMobileStickyBar;
