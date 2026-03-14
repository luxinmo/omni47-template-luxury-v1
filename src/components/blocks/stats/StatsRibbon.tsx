import { mockStats } from "@/data/mock-data";

interface StatsRibbonProps {
  stats?: { value: string; label: string }[];
  backgroundColor?: string;
  accentColor?: string;
  showBorder?: boolean;
}

export default function StatsRibbon({
  stats = mockStats,
  backgroundColor = "#fff",
  accentColor = "#c9a96e",
  showBorder = true,
}: StatsRibbonProps) {
  return (
    <section className="py-10 sm:py-14" style={{ background: backgroundColor, borderBottom: showBorder ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center" style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
              <p className="text-3xl sm:text-4xl font-extralight" style={{ color: accentColor, letterSpacing: "0.04em" }}>{s.value}</p>
              <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
