import React from "react";

import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

interface RelatedItem {
  image: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  tag?: string;
  ref?: string;
}

interface DetailRelatedListProps {
  title?: string;
  items?: RelatedItem[];
}

const DEFAULT_ITEMS: RelatedItem[] = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, tag: "FOR SALE", ref: "PE-IBZ-3001" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, tag: "FOR SALE", ref: "PE-IBZ-3002" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, tag: "FOR SALE", ref: "PE-IBZ-3003" },
];

/**
 * DetailRelatedList — V4 layout: horizontal list cards (image left + info right).
 * Different from V6's vertical 3-col grid cards.
 */
const DetailRelatedList: React.FC<DetailRelatedListProps> = ({
  title = "Similar Properties",
  items = DEFAULT_ITEMS,
}) => {
  return (
    <section className="border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h2 className="text-xl font-light text-neutral-900 tracking-tight mb-6">{title}</h2>
        <div className="space-y-4 sm:space-y-6">
          {items.map((s, i) => (
            <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              {/* Image */}
              <div className="md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-full min-h-[180px] sm:min-h-[200px]">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
              </div>
              {/* Info */}
              <div className="md:col-span-7 flex flex-col p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  {s.tag && (
                    <span className="text-[11px] sm:text-[12px] tracking-[0.15em] uppercase border border-neutral-400 text-neutral-600 px-2.5 py-1 font-medium">{s.tag}</span>
                  )}
                  {s.ref && (
                    <span className="font-mono text-neutral-400 tracking-wide text-[11px] sm:text-[12px]">{s.ref}</span>
                  )}
                </div>
                <p className="text-[13px] tracking-[0.14em] uppercase text-neutral-500 mb-1">{s.location}</p>
                <h3 className="text-[15px] sm:text-[17px] font-medium text-neutral-900 leading-snug mb-4 uppercase">{s.name}</h3>
                <div className="flex items-center gap-5 sm:gap-7 mb-4">
                  {[
                    { l: "Beds", v: s.beds },
                    { l: "Baths", v: s.baths },
                    { l: "Built", v: `${s.sqm} m²` },
                  ].map((x, j) => (
                    <div key={j} className="text-center">
                      <p className="text-[11px] sm:text-[12px] tracking-[0.1em] uppercase text-neutral-500 mb-0.5">{x.l}</p>
                      <p className="text-[14px] sm:text-[16px] text-neutral-900 font-light">{x.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-neutral-200">
                  <p className="text-xl sm:text-2xl font-extralight text-neutral-900 tracking-tight">{s.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailRelatedList;
