import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface BlogFaqAccordionProps {
  title?: string;
  items?: FaqItem[];
  accentColor?: string;
}

export default function BlogFaqAccordion({
  title = "Questions & Answers",
  items = [
    { q: "Are these properties currently available for purchase?", a: "Yes, all properties featured are currently listed on the open market through their respective agents. Availability and pricing may change." },
    { q: "Can international buyers purchase these properties?", a: "Absolutely. Each of these markets welcomes international buyers, though specific regulations and tax implications vary by jurisdiction." },
    { q: "Is financing available for luxury properties at this price point?", a: "Private banking institutions and specialist lenders offer bespoke mortgage solutions for ultra-prime properties. Terms typically require a minimum 30–40% deposit." },
    { q: "How can I arrange a private viewing?", a: "Contact our concierge team directly. All viewings are conducted by appointment only to ensure discretion and security." },
  ],
  accentColor = "#8b6f47",
}: BlogFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-8 border-t border-[#e8e4df]">
      <h3 className="text-[13px] tracking-[0.15em] uppercase font-medium mb-6 text-[#2C2825]">{title}</h3>
      <div className="space-y-0">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-[#e8e4df]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors"
              >
                <span className="text-[14px] font-normal leading-[1.5]" style={{ color: isOpen ? "#2C2825" : "#8a8580" }}>{item.q}</span>
                <span className="shrink-0 mt-0.5" style={{ color: accentColor }}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
              >
                <p className="text-[13px] font-light leading-[1.8] pb-5 pr-8 text-[#8a8580]">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
