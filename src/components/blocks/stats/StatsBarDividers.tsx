import { mockStats } from "@/data/mock-data";

interface StatsBarDividersProps {
  stats?: { value: string; label: string }[];
}

export default function StatsBarDividers({
  stats = mockStats,
}: StatsBarDividersProps) {
  return (
    <section className="border-b border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-neutral-100">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:px-8">
              <p className="text-[32px] sm:text-[40px] font-extralight text-neutral-900 tracking-[-0.02em] mb-1">{s.value}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
