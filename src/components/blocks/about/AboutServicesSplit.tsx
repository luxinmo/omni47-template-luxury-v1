import { Lock, Play, ArrowUpRight } from "lucide-react";
import { mockServices } from "@/data/mock-data";
import * as LucideIcons from "lucide-react";

interface AboutServicesSplitProps {
  sectionLabel?: string;
  title?: string;
  description?: string;
  showVideoButton?: boolean;
  videoButtonText?: string;
  services?: { num: string; title: string; desc: string; iconName: string }[];
  accentColor?: string;
  brandName?: string;
}

export default function AboutServicesSplit({
  sectionLabel = "Sobre Nosotros",
  title = "Un Legado de\nExcelencia",
  description = "Somos una asesoría inmobiliaria de lujo especializada en las propiedades más exclusivas del Mediterráneo. Desde impresionantes villas frente al mar hasta prestigiosas fincas junto al golf, ofrecemos un servicio personalizado basado en la confianza, la discreción y una mirada exigente hacia la calidad.",
  showVideoButton = true,
  videoButtonText = "Ver Nuestra Historia",
  services = mockServices,
  accentColor = "#c9a96e",
  brandName = "Prestige Estates",
}: AboutServicesSplitProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-extralight leading-[1.15] mb-6 whitespace-pre-line" style={{ letterSpacing: "0.04em" }}>
              {title}
            </h2>
            <div className="w-12 h-[1px] mb-8" style={{ background: accentColor }} />
            <p className="text-[15px] leading-[1.9] font-light mb-8 text-neutral-400">
              {description}
            </p>
            {showVideoButton && (
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-105" style={{ border: `1px solid ${accentColor}50` }}>
                  <Play className="w-4 h-4 ml-0.5" style={{ color: accentColor }} />
                </div>
                <span className="text-xs tracking-[0.12em] uppercase font-light group-hover:opacity-70 transition-opacity" style={{ color: accentColor }}>{videoButtonText}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-0">
            {services.map((s, i) => {
              const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>>)[s.iconName] || Lock;
              return (
                <div key={i} className="p-6 sm:p-7" style={{ borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                    <IconComponent className="w-4 h-4" style={{ color: accentColor }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-light mb-2 tracking-wide">{s.title}</h3>
                  <p className="text-[13px] leading-[1.7] font-light text-neutral-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
