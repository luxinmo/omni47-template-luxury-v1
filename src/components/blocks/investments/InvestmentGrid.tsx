import { ArrowUpRight } from "lucide-react";
import { mockInvestments } from "@/data/mock-data";

interface InvestmentGridProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
  investments?: { title: string; desc: string; image: string; label: string }[];
}

export default function InvestmentGrid({
  sectionLabel = "Oportunidades",
  title = "Investment",
  titleItalic = "Opportunities",
  investments = mockInvestments,
}: InvestmentGridProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-neutral-300" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">{sectionLabel}</p>
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
            {title}<br />
            <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{titleItalic}</span>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {investments.map((inv, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-5 relative">
              <img src={inv.image} alt={inv.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 left-4">
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium bg-white text-neutral-900 px-3 py-1.5">{inv.label}</span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-light text-neutral-900 tracking-[0.01em] mb-2 group-hover:text-neutral-500 transition-colors duration-300">{inv.title}</h3>
            <p className="text-[13px] font-light text-neutral-400 leading-relaxed">{inv.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
