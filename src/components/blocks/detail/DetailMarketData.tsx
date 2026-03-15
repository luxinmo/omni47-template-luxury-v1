/**
 * DETAIL MARKET DATA
 * Local real estate market statistics with progress bars.
 * Origin: PropertyDetail V6
 */

import { TrendingUp } from "lucide-react";

interface MarketStat {
  label: string;
  value: string;
  trend: string;
  pct?: number;
}

interface DetailMarketDataProps {
  title?: string;
  description?: string;
  stats?: MarketStat[];
}

const defaultStats: MarketStat[] = [
  { label: "Average Villa Price", value: "€3,800,000", trend: "+12% YoY", pct: 75 },
  { label: "Price per m²", value: "€8,500/m²", trend: "+8% YoY", pct: 62 },
  { label: "Demand Index", value: "Very High", trend: "Rising", pct: 88 },
  { label: "Avg. Days on Market", value: "45 days", trend: "-15% YoY", pct: 35 },
];

const DetailMarketData = ({
  title = "Real Estate Market in Santa Eulalia",
  description = "The luxury villa market in this area has experienced consistent growth, driven by strong international demand and limited supply of premium properties.",
  stats = defaultStats,
}: DetailMarketDataProps) => (
  <section className="border-t border-neutral-200 pt-8">
    <h2 className="text-[18px] font-medium text-neutral-900 mb-5">{title}</h2>
    <div className="grid grid-cols-2 gap-4 mb-5">
      {stats.map((d, i) => (
        <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
          <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-500 font-medium mb-1">{d.label}</p>
          <p className="text-[20px] font-light text-neutral-900 mb-2">{d.value}</p>
          {d.pct != null && (
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-amber-700/60 rounded-full transition-all duration-700" style={{ width: `${d.pct}%` }} />
            </div>
          )}
          <p className="text-[12px] text-amber-700/80 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {d.trend}
          </p>
        </div>
      ))}
    </div>
    {description && (
      <p className="text-[14px] leading-[1.85] text-neutral-600 font-light">{description}</p>
    )}
  </section>
);

export default DetailMarketData;
