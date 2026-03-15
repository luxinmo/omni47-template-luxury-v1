import React from "react";

import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

interface RecentItem {
  image: string;
  name: string;
  price: string;
}

interface DetailRecentlyViewedProps {
  items?: RecentItem[];
}

const DEFAULT_ITEMS: RecentItem[] = [
  { image: prop1, name: "Beachfront Villa Es Cubells", price: "€6,200,000" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", price: "€3,100,000" },
  { image: prop3, name: "Traditional Finca San Carlos", price: "€5,800,000" },
  { image: prop1, name: "Luxury Villa Cala Jondal", price: "€4,900,000" },
  { image: prop2, name: "Sea View Apartment Talamanca", price: "€1,850,000" },
];

const DetailRecentlyViewed: React.FC<DetailRecentlyViewedProps> = ({ items = DEFAULT_ITEMS }) => {
  return (
    <section className="border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <p className="text-[14px] font-normal text-neutral-900 mb-4">Recently Viewed</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {items.map((item, i) => (
            <div key={i} className="shrink-0 w-[150px] group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3] mb-1.5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="text-[12px] text-neutral-800 font-light leading-snug line-clamp-2">{item.name}</p>
              <p className="text-[13px] font-normal text-neutral-900 mt-0.5">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailRecentlyViewed;
