import { mockTrustStats } from "@/data/mock-data";
import { getIcon } from "@/components/blocks/_utils/get-icon";

interface TrustIconsProps {
  sectionLabel?: string;
  title?: string;
  stats?: { value: string; label: string; iconName: string }[];
  accentColor?: string;
}

export default function TrustIcons({
  sectionLabel = "Confianza",
  title = "Confianza de Compradores Internacionales",
  stats = mockTrustStats,
  accentColor = "#c9a96e",
}: TrustIconsProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((t, i) => {
            const IconComponent = getIcon(t.iconName);
            return (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                  <IconComponent className="w-6 h-6" style={{ color: accentColor }} strokeWidth={1.5} />
                </div>
                <p className="text-3xl sm:text-4xl font-extralight mb-2 text-neutral-900">{t.value}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase font-normal text-neutral-400">{t.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
