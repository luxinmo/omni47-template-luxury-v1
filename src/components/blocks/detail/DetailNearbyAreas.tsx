/**
 * DETAIL NEARBY AREAS
 * Grid of internal links to nearby areas with property counts and arrows.
 * Different from DetailNearbyPlaces (which shows POIs by category).
 * Origin: PropertyDetail V6
 */

import { ArrowRight } from "lucide-react";

interface Area {
  label: string;
  href: string;
  count: number;
}

interface DetailNearbyAreasProps {
  title?: string;
  areas?: Area[];
}

const defaultAreas: Area[] = [
  { label: "Properties in Ibiza", href: "/properties?location=ibiza", count: 124 },
  { label: "Villas in Ibiza", href: "/properties?type=villa&location=ibiza", count: 67 },
  { label: "Properties in Santa Eulalia", href: "/properties?location=santa-eulalia", count: 38 },
  { label: "Luxury Villas Ibiza", href: "/properties?type=villa&location=ibiza&luxury=true", count: 29 },
  { label: "Sea View Properties Ibiza", href: "/properties?feature=sea-views&location=ibiza", count: 52 },
  { label: "Beachfront Villas Ibiza", href: "/properties?feature=beachfront&type=villa&location=ibiza", count: 18 },
];

const DetailNearbyAreas = ({
  title = "Nearby Areas",
  areas = defaultAreas,
}: DetailNearbyAreasProps) => (
  <section className="border-t border-neutral-200 pt-8">
    <h2 className="text-[18px] font-medium text-neutral-900 mb-5">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {areas.map((area, i) => (
        <a
          key={i}
          href={area.href}
          className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-sm px-4 py-3 hover:bg-neutral-100 hover:border-neutral-300 transition-all group"
        >
          <span className="text-[14px] text-neutral-900/85 font-light group-hover:text-neutral-900 transition-colors">
            {area.label}
          </span>
          <span className="flex items-center gap-2 text-[12px] text-neutral-900/60">
            {area.count} properties
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </a>
      ))}
    </div>
  </section>
);

export default DetailNearbyAreas;
