import React from "react";

interface DetailEnergyBadgeProps {
  energyClass?: string;
}

const CLASS_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: "bg-green-600", text: "text-white" },
  B: { bg: "bg-green-500", text: "text-white" },
  C: { bg: "bg-yellow-400", text: "text-neutral-900" },
  D: { bg: "bg-yellow-500", text: "text-neutral-900" },
  E: { bg: "bg-orange-400", text: "text-white" },
  F: { bg: "bg-orange-500", text: "text-white" },
  G: { bg: "bg-red-500", text: "text-white" },
};

const ALL_CLASSES = ["A", "B", "C", "D", "E", "F", "G"];

const DetailEnergyBadge: React.FC<DetailEnergyBadgeProps> = ({ energyClass = "A" }) => {
  const cls = energyClass.toUpperCase();
  const colors = CLASS_COLORS[cls] ?? { bg: "bg-neutral-400", text: "text-white" };

  return (
    <section className="border border-neutral-200 rounded-sm p-5">
      <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-medium mb-4">Energy Rating</p>

      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 ${colors.bg} ${colors.text} flex items-center justify-center text-[24px] font-bold rounded-sm`}>
          {cls}
        </div>
        <div>
          <p className="text-[15px] font-medium text-neutral-900">Class {cls}</p>
          <p className="text-[12px] text-neutral-500 font-light">Energy Performance Certificate</p>
        </div>
      </div>

      {/* Scale bar */}
      <div className="space-y-1">
        {ALL_CLASSES.map((c) => {
          const w = 30 + (ALL_CLASSES.indexOf(c)) * 10;
          const cc = CLASS_COLORS[c];
          return (
            <div key={c} className="flex items-center gap-2">
              <div className={`h-4 ${cc.bg} rounded-r-sm flex items-center justify-end pr-1.5 ${c === cls ? "ring-2 ring-neutral-900 ring-offset-1" : ""}`} style={{ width: `${w}%` }}>
                <span className={`text-[9px] font-bold ${cc.text}`}>{c}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DetailEnergyBadge;
