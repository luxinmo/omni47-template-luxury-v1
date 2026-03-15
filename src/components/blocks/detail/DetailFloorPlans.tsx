/**
 * DETAIL FLOOR PLANS
 * Floor plans display with placeholder images.
 * Origin: PropertyDetail V6
 */

import { Grid3X3 } from "lucide-react";

interface FloorPlan {
  name: string;
  area?: string;
  image?: string;
}

interface DetailFloorPlansProps {
  title?: string;
  plans?: FloorPlan[];
}

const defaultPlans: FloorPlan[] = [
  { name: "Ground Floor", area: "252 m²" },
  { name: "First Floor", area: "168 m²" },
];

const DetailFloorPlans = ({
  title = "Floor Plans",
  plans = defaultPlans,
}: DetailFloorPlansProps) => (
  <section className="border-t border-neutral-200 pt-8">
    <h2 className="text-[18px] font-medium text-neutral-900 mb-5">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {plans.map((plan, i) => (
        <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
          {plan.image ? (
            <div className="aspect-[4/3]">
              <img src={plan.image} alt={plan.name} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="aspect-[4/3] flex items-center justify-center text-neutral-300">
              <div className="text-center">
                <Grid3X3 className="w-10 h-10 mx-auto mb-2 text-neutral-200" strokeWidth={1} />
                <p className="text-[13px] font-light">{plan.name} Plan</p>
              </div>
            </div>
          )}
          <div className="px-4 py-3 border-t border-neutral-200">
            <p className="text-[14px] font-medium text-neutral-900">{plan.name}</p>
            {plan.area && <p className="text-[12px] text-neutral-400 font-light">{plan.area}</p>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DetailFloorPlans;
