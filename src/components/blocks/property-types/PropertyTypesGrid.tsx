import { ChevronRight } from "lucide-react";
import { mockPropertyTypes } from "@/data/mock-data";
import { getIcon } from "@/components/blocks/_utils/get-icon";

interface PropertyTypesGridProps {
  sectionLabel?: string;
  title?: string;
  types?: { label: string; iconName: string; href: string }[];
  accentColor?: string;
}

export default function PropertyTypesGrid({
  sectionLabel = "Categorías",
  title = "Explorar por Tipo de Propiedad",
  types = mockPropertyTypes,
  accentColor = "#c9a96e",
}: PropertyTypesGridProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {types.map((t, i) => {
            const IconComponent = getIcon(t.iconName);
            return (
              <a key={i} href={t.href} className="group flex items-center gap-4 p-5 sm:p-6 transition-all duration-300 hover:shadow-md bg-white" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                  <IconComponent className="w-5 h-5" style={{ color: accentColor }} strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-light tracking-wide group-hover:opacity-70 transition-opacity">{t.label}</h3>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity text-neutral-900" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
