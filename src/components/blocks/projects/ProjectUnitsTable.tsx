import { useState } from "react";

interface Unit {
  ref: string;
  type: string;
  beds: number;
  baths: number;
  sqm: number;
  floor: string;
  orientation?: string;
  price: number;
  status: "Available" | "Reserved" | "Sold";
}

interface ProjectUnitsTableProps {
  sectionLabel?: string;
  title?: string;
  totalUnits?: number;
  units?: Unit[];
  onEnquire?: (ref: string) => void;
  accentColor?: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const unitStatusStyle = (s: string) => {
  if (s === "Available") return { color: "#2a7d5f", bg: "#2a7d5f12" };
  if (s === "Reserved") return { color: "#e67e22", bg: "#e67e2212" };
  return { color: "#999", bg: "#99999912" };
};

export default function ProjectUnitsTable({
  sectionLabel = "Availability",
  title = "Available Units",
  totalUnits = 32,
  units = [
    { ref: "FS-2C", type: "Apartment", beds: 3, baths: 3, sqm: 195, floor: "2nd", orientation: "South-East", price: 3500000, status: "Available" as const },
    { ref: "FS-4A", type: "Penthouse", beds: 4, baths: 4, sqm: 320, floor: "4th", orientation: "South-West", price: 5200000, status: "Available" as const },
    { ref: "FS-4B", type: "Penthouse", beds: 4, baths: 5, sqm: 365, floor: "4th", orientation: "South", price: 5900000, status: "Reserved" as const },
    { ref: "FS-7B", type: "Villa", beds: 5, baths: 5, sqm: 480, floor: "Ground", orientation: "South", price: 7400000, status: "Available" as const },
    { ref: "FS-1A", type: "Apartment", beds: 2, baths: 2, sqm: 180, floor: "1st", orientation: "East", price: 3500000, status: "Sold" as const },
  ],
  onEnquire,
  accentColor = "#8b6f47",
}: ProjectUnitsTableProps) {
  const availableUnits = units.filter((u) => u.status !== "Sold");
  const typologyOptions = ["All", ...new Set(units.map((u) => u.type))];
  const [filterType, setFilterType] = useState("All");
  const filteredUnits = filterType === "All" ? units : units.filter((u) => u.type === filterType);

  return (
    <section className="py-16 sm:py-24 bg-[#f8f6f3]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>{title}</h2>
          <p className="text-[14px] font-light mt-3 text-[#8a8580]">
            {availableUnits.length} of {totalUnits} units currently available
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {typologyOptions.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-light transition-all rounded-sm"
              style={{
                background: filterType === t ? accentColor : "transparent",
                color: filterType === t ? "#fff" : "#8a8580",
                border: `1px solid ${filterType === t ? accentColor : "#e8e4df"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Table — desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "2px solid #e8e4df" }}>
                {["Ref", "Type", "Beds", "Baths", "Size", "Floor", "Price", "Status", ""].map((h, i) => (
                  <th key={i} className="py-3 px-3 text-[10px] tracking-[0.2em] uppercase font-medium text-[#b0aaa3]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((u, i) => {
                const st = unitStatusStyle(u.status);
                return (
                  <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid #e8e4df" }}>
                    <td className="py-4 px-3 text-[13px] font-medium text-[#2C2825]">{u.ref}</td>
                    <td className="py-4 px-3 text-[13px] font-light text-[#8a8580]">{u.type}</td>
                    <td className="py-4 px-3 text-[13px] font-light text-[#8a8580]">{u.beds}</td>
                    <td className="py-4 px-3 text-[13px] font-light text-[#8a8580]">{u.baths}</td>
                    <td className="py-4 px-3 text-[13px] font-light text-[#2C2825]">{u.sqm} m²</td>
                    <td className="py-4 px-3 text-[13px] font-light text-[#8a8580]">{u.floor}</td>
                    <td className="py-4 px-3 text-[14px] font-light text-[#2C2825]">{fmt(u.price)}</td>
                    <td className="py-4 px-3">
                      <span className="inline-flex px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-medium rounded-sm" style={{ color: st.color, background: st.bg }}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      {u.status === "Available" && (
                        <button onClick={() => onEnquire?.(u.ref)} className="text-[11px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: accentColor }}>
                          Enquire
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="sm:hidden space-y-3">
          {filteredUnits.map((u, i) => {
            const st = unitStatusStyle(u.status);
            return (
              <div key={i} className="p-4 rounded-sm border border-[#e8e4df] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] font-medium text-[#2C2825]">{u.ref}</span>
                  <span className="inline-flex px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-medium rounded-sm" style={{ color: st.color, background: st.bg }}>
                    {u.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-[12px] mb-3">
                  <div>
                    <p className="font-medium text-[#b0aaa3]">Type</p>
                    <p className="font-light text-[#2C2825]">{u.type}</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#b0aaa3]">Beds</p>
                    <p className="font-light text-[#2C2825]">{u.beds}</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#b0aaa3]">Baths</p>
                    <p className="font-light text-[#2C2825]">{u.baths}</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#b0aaa3]">Size</p>
                    <p className="font-light text-[#2C2825]">{u.sqm} m²</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#b0aaa3]">Floor</p>
                    <p className="font-light text-[#2C2825]">{u.floor}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e8e4df]">
                  <span className="text-[16px] font-light text-[#2C2825]">{fmt(u.price)}</span>
                  {u.status === "Available" && (
                    <button onClick={() => onEnquire?.(u.ref)} className="text-[11px] tracking-[0.12em] uppercase font-light px-4 py-2 rounded-sm transition-opacity hover:opacity-90 text-white" style={{ background: accentColor }}>
                      Enquire
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
