import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { mockFooterColumns, mockSocialLinks } from "@/data/mock-data";

interface FooterLuxuryProps {
  brandName?: string;
  brandSubtitle?: string;
  tagline?: string;
  fullName?: string;
  columns?: { title: string; items: { label: string; href: string }[] }[];
  social?: { instagram: string; linkedin: string; facebook: string; twitter: string };
  backgroundColor?: string;
}

export default function FooterLuxury({
  brandName = "PRESTIGE",
  brandSubtitle = "ESTATES",
  tagline = "Curating extraordinary homes for exceptional lives.",
  fullName = "Prestige Estates International",
  columns = mockFooterColumns,
  social = mockSocialLinks,
  backgroundColor = "#1a1816",
}: FooterLuxuryProps) {
  return (
    <footer style={{ background: backgroundColor }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl tracking-[0.4em] font-light block mb-1 text-white">{brandName}</span>
            <span className="text-[9px] tracking-[0.4em] uppercase font-light block mb-5 text-white/35">{brandSubtitle}</span>
            <p className="text-sm leading-relaxed font-light text-white/50">{tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4 text-white/40">{col.title}</p>
              {col.items.map((item) => (
                <a key={item.label} href={item.href} className="block text-[12px] font-light py-1 transition-opacity hover:opacity-70 text-white/60">
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-14 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[14px] tracking-[0.35em] font-light text-white/60">{fullName}</span>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: social.instagram },
              { Icon: Linkedin, href: social.linkedin },
              { Icon: Facebook, href: social.facebook },
              { Icon: Twitter, href: social.twitter },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:border-white/30 hover:text-white/60 text-white/35" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
          <p className="text-[10px] tracking-wider font-light text-white/20">
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
