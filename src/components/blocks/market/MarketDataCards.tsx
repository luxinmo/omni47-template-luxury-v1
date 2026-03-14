import { mockMarketData } from "@/data/mock-data";
import { getIcon } from "@/components/blocks/_utils/get-icon";

interface MarketDataCardsProps {
  sectionLabel?: string;
  title?: string;
  data?: { label: string; value: string; change: string; iconName: string }[];
  accentColor?: string;
}

export default function MarketDataCards({
  sectionLabel = "Datos",
  title = "Costa Blanca & Ibiza Market Insights",
  data = mockMarketData,
  accentColor = "#c9a96e",
}: MarketDataCardsProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-neutral-100">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.map((m, i) => {
            const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>>)[m.iconName] || LucideIcons.BarChart3;
            return (
              <div key={i} className="p-6 text-center bg-white" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                <IconComponent className="w-5 h-5 mx-auto mb-4" style={{ color: accentColor }} strokeWidth={1.5} />
                <p className="text-2xl sm:text-3xl font-extralight mb-1 text-neutral-900">{m.value}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase font-normal mb-3 text-neutral-400">{m.label}</p>
                <span className="text-xs font-medium px-2.5 py-1" style={{ color: accentColor, background: `${accentColor}10` }}>
                  {m.change}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
