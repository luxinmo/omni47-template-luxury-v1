import { ArrowRight } from "lucide-react";
import { mockAreas } from "@/data/mock-data";

interface AreasTextListProps {
  sectionLabel?: string;
  title?: string;
  areas?: Record<string, { name: string; href: string }[]>;
  accentColor?: string;
}

export default function AreasTextList({
  sectionLabel = "Ubicaciones",
  title = "Áreas que Cubrimos",
  areas = mockAreas,
  accentColor = "#c9a96e",
}: AreasTextListProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {Object.entries(areas).map(([region, regionAreas]) => (
            <div key={region}>
              <h3 className="text-lg font-light tracking-wide mb-6 pb-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>{region}</h3>
              <ul className="space-y-3">
                {regionAreas.map((area) => (
                  <li key={area.name}>
                    <a href={area.href} className="flex items-center justify-between group py-1.5 transition-colors hover:opacity-70">
                      <span className="text-[15px] font-light text-neutral-400">{area.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
