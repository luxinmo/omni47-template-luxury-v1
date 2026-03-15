/**
 * DETAIL CHARACTERISTICS
 * Two-column key-value table of property specifications.
 * Origin: PropertyDetail V6
 */

import { type ReactNode } from "react";

interface CharacteristicRow {
  label: string;
  value: ReactNode;
}

interface DetailCharacteristicsProps {
  title?: string;
  rows?: CharacteristicRow[];
}

const defaultRows: CharacteristicRow[] = [
  { label: "Reference", value: "PE-IBZ-2847" },
  { label: "Property type", value: "Detached house" },
  { label: "Price", value: "€4,650,000" },
  { label: "Built area", value: "420 m²" },
  { label: "Energy rating", value: "A" },
  { label: "Bedrooms", value: "5" },
  { label: "Bathrooms", value: "4" },
  { label: "Useful area", value: "281 m²" },
  { label: "Plot", value: "1,200 m²" },
  { label: "Year built", value: "2023" },
];

const DetailCharacteristics = ({
  title = "Basic Characteristics",
  rows = defaultRows,
}: DetailCharacteristicsProps) => {
  const mid = Math.ceil(rows.length / 2);
  const col1 = rows.slice(0, mid);
  const col2 = rows.slice(mid);

  return (
    <section className="border-t border-neutral-200 pt-8">
      <h2 className="text-[18px] font-medium text-neutral-900 mb-5">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {[col1, col2].map((col, ci) => (
          <div key={ci}>
            {col.map((row, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-200">
                <span className="text-[14px] text-neutral-600 font-light">{row.label}</span>
                <span className="text-[14px] text-neutral-900 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailCharacteristics;
