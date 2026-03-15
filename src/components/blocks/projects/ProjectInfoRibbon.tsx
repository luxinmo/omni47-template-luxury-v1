/**
 * PROJECT INFO RIBBON
 * Title + brand/status badge + price range + horizontal stats ribbon.
 * Used below gallery on Branded/NewDev detail pages.
 * Origin: BrandedResidenceDetailPage, NewDevelopmentDetailPage
 */

import { Crown, Building2, MapPin, TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string;
}

interface ProjectInfoRibbonProps {
  name?: string;
  brandOrLabel?: string;
  icon?: "crown" | "building";
  location?: string;
  delivery?: string;
  priceMin?: string;
  priceMax?: string;
  status?: string;
  trending?: boolean;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { label: "Total Units", value: "32" },
  { label: "Available", value: "8" },
  { label: "Construction", value: "45%" },
  { label: "Delivery", value: "Q2 2027" },
  { label: "Developer", value: "Four Seasons Hotels" },
];

const ProjectInfoRibbon = ({
  name = "Four Seasons Private Residences",
  brandOrLabel = "Four Seasons",
  icon = "crown",
  location = "Marbella, Costa del Sol",
  delivery = "Q2 2027",
  priceMin = "€3,500,000",
  priceMax = "€8,200,000",
  status = "Selling",
  trending = false,
  stats = defaultStats,
}: ProjectInfoRibbonProps) => {
  const Icon = icon === "crown" ? Crown : Building2;

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-700/5 border border-amber-700/20 rounded-sm">
          <Icon className="w-4 h-4 text-amber-700/70" />
          <span className="text-[11px] tracking-[0.25em] uppercase font-light text-amber-700/70">{brandOrLabel}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1] text-neutral-900 mb-3 tracking-[0.05em]">
          {name}
        </h1>
        <div className="flex items-center gap-3 mb-5">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span className="text-[14px] font-light text-neutral-500">{location}</span>
          <span className="text-neutral-300">·</span>
          <span className="text-[14px] font-light text-neutral-500">Delivery {delivery}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-xl sm:text-2xl font-extralight text-neutral-900">{priceMin} — {priceMax}</span>
          <span className="ml-2 px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium rounded-sm border border-neutral-300 text-neutral-700">
            {status}
          </span>
          {trending && (
            <span className="px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium rounded-sm flex items-center gap-1 border border-amber-700/30 text-amber-700/70 bg-amber-700/5">
              <TrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-10 pt-6 border-t border-neutral-200">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-1 text-neutral-400">{s.label}</p>
              <p className="text-[17px] font-light text-neutral-900">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectInfoRibbon;
