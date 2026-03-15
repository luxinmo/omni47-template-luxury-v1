import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

interface DetailAgencyInfoProps {
  name?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  description?: string;
  ref?: string;
}

const DetailAgencyInfo: React.FC<DetailAgencyInfoProps> = ({
  name = "Prestige Estates International",
  phone = "+34 600 123 456",
  email = "info@prestigeestates.com",
  whatsapp = "34600123456",
  description = "Get in touch for a personal consultation or to arrange a private viewing of this property.",
  ref: refCode = "PE-IBZ-2847",
}) => {
  return (
    <section className="border border-neutral-200 rounded-sm p-6">
      <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-medium mb-4">Listed by</p>

      <h3 className="text-[16px] font-medium text-neutral-900 tracking-[0.04em] mb-2">{name}</h3>
      <p className="text-[13px] text-neutral-500 font-light leading-relaxed mb-5">{description}</p>

      <div className="space-y-2.5 mb-5">
        <a href={`tel:${phone}`} className="flex items-center gap-3 text-[14px] text-neutral-700 font-light hover:text-neutral-900 transition-colors">
          <Phone className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
          {phone}
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-3 text-[14px] text-neutral-700 font-light hover:text-neutral-900 transition-colors">
          <Mail className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
          {email}
        </a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[14px] text-[#25D366] font-light hover:text-[#1da851] transition-colors">
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          WhatsApp
        </a>
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <p className="text-[14px] text-neutral-500 font-mono text-center tracking-[0.05em]">REF-{refCode}</p>
      </div>
    </section>
  );
};

export default DetailAgencyInfo;
