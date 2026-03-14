import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { mockFooterColumns, mockSocialLinks } from "@/data/mock-data";

interface FooterEditorialProps {
  brandName?: string;
  brandSubtitle?: string;
  tagline?: string;
  columns?: { title: string; items: string[] }[];
  social?: { instagram: string; linkedin: string; facebook: string; twitter: string };
  legalLinks?: string[];
}

export default function FooterEditorial({
  brandName = "PRESTIGE",
  brandSubtitle = "Real Estate",
  tagline = "Curating extraordinary homes for exceptional lives. Exclusively properties above €1M across the Mediterranean.",
  columns = [
    { title: "Propiedades", items: ["En Venta", "Alquiler", "Obra Nueva", "Off-Market"] },
    { title: "Destinos", items: ["Ibiza", "Mallorca", "Marbella", "Barcelona", "Madrid"] },
    { title: "Inversión", items: ["Propiedades", "Hoteles Boutique", "Proyectos"] },
    { title: "Magazine", items: ["Mercado", "Arquitectura", "Lifestyle", "Guías"] },
    { title: "Acceso", items: ["Registro", "Login", "Contacto"] },
  ],
  social = mockSocialLinks,
  legalLinks = ["Política de Privacidad", "Términos de Uso", "Política de Cookies", "Sitemap"],
}: FooterEditorialProps) {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 sm:pt-28 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <span className="text-[18px] tracking-[0.5em] font-extralight block mb-1">{brandName}</span>
            <span className="text-[8px] tracking-[0.5em] uppercase font-light block mb-6 text-white/30">{brandSubtitle}</span>
            <p className="text-[13px] font-light leading-[1.8] text-white/40 max-w-[300px]">{tagline}</p>
            <div className="flex gap-3 mt-8">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300">
                  <Icon className="w-4 h-4" strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[9px] tracking-[0.25em] uppercase font-medium text-white/25 mb-5">{col.title}</p>
                {col.items.map((link) => (
                  <button key={link} className="block text-[12px] font-light text-white/45 hover:text-white transition-colors duration-300 py-1.5">
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] font-light text-white/20">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <button key={l} className="text-[10px] tracking-[0.1em] font-light text-white/20 hover:text-white/50 transition-colors duration-300">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
