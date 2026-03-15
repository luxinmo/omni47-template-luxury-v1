/**
 * DETAIL DESCRIPTION
 * Expandable property description block.
 * Origin: PropertyDetail V2–V6
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DetailDescriptionProps {
  title?: string;
  description?: string;
  clampLines?: number;
}

const defaultDesc = `This exceptional luxury villa is set on an elevated plot offering uninterrupted panoramic views of the Mediterranean Sea and the island of Formentera. Designed by a renowned architectural studio, the property seamlessly blends indoor and outdoor living across 420 m² of impeccably finished living space.

The ground floor features a grand open-plan living area with floor-to-ceiling windows, a designer kitchen with Gaggenau appliances, and direct access to the infinity pool terrace. The master suite occupies a private wing with a spa-inspired bathroom, walk-in dressing room, and a private terrace.

Upstairs, four additional en-suite bedrooms each enjoy their own terrace and sea views. The lower level houses a home cinema, wine cellar, gym, and staff quarters.`;

const DetailDescription = ({
  title = "About This Property",
  description = defaultDesc,
  clampLines = 12,
}: DetailDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-t border-neutral-200 pt-6">
      <h2 className="text-[18px] font-medium text-neutral-900 mb-4">{title}</h2>
      <div
        className={`text-[14px] leading-[1.9] text-neutral-700 font-light whitespace-pre-line ${!expanded ? `line-clamp-[${clampLines}]` : ""}`}
        style={!expanded ? { display: "-webkit-box", WebkitLineClamp: clampLines, WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}
      >
        {description}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 mt-3 text-[12px] tracking-[0.1em] uppercase text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
      >
        {expanded ? "Show less" : "Read more"}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </section>
  );
};

export default DetailDescription;
