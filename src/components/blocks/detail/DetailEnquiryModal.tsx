import React, { useState } from "react";
import { CalendarDays, Check, ChevronLeft } from "lucide-react";

import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

interface SuggestionItem {
  image: string;
  name: string;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
  price: string;
}

interface DetailEnquiryModalProps {
  propertyTitle?: string;
  propertyRef?: string;
  propertyImage?: string;
  propertyPrice?: string;
  suggestions?: SuggestionItem[];
}

const DEFAULT_SUGGESTIONS: SuggestionItem[] = [
  { image: prop1, name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", beds: 6, baths: 5, sqm: 580, price: "€6,200,000" },
  { image: prop2, name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", beds: 3, baths: 3, sqm: 210, price: "€3,100,000" },
  { image: prop3, name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", beds: 7, baths: 6, sqm: 750, price: "€5,800,000" },
];

/**
 * DetailEnquiryModal — Three-stage enquiry flow: Form → Thanks → Suggestions
 * Standalone preview (not wrapped in Dialog for block catalog usage).
 */
const DetailEnquiryModal: React.FC<DetailEnquiryModalProps> = ({
  propertyTitle = "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  propertyRef = "PE-IBZ-2847",
  propertyImage = heroImg,
  propertyPrice = "€4,650,000",
  suggestions = DEFAULT_SUGGESTIONS,
}) => {
  const [stage, setStage] = useState<"form" | "thanks" | "suggestions">("form");
  const [wantVisit, setWantVisit] = useState(false);

  return (
    <div className="max-w-lg mx-auto border-2 border-neutral-300 rounded-md overflow-hidden shadow-xl bg-white">
      {/* ── FORM ── */}
      {stage === "form" && (
        <>
          <div className="p-5 pb-0">
            <div className="flex gap-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
              <img src={propertyImage} alt={propertyTitle} className="w-24 h-20 object-cover shrink-0" />
              <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                <p className="text-[13px] font-medium text-neutral-900 leading-tight line-clamp-2 uppercase tracking-[0.02em]">{propertyTitle}</p>
                <p className="text-[14px] text-neutral-700 font-medium mt-1">{propertyPrice}</p>
                <span className="text-[11px] text-neutral-400 font-mono tracking-[0.05em] mt-0.5">REF-{propertyRef}</span>
              </div>
            </div>
          </div>
          <form className="p-6 pt-2 space-y-3" onSubmit={(e) => { e.preventDefault(); setStage("thanks"); setTimeout(() => setStage("suggestions"), 5000); }}>
            <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
            <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
            <input type="tel" placeholder="Phone number" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
            <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors resize-none rounded-sm" />

            <label className="flex items-center gap-2 cursor-pointer select-none py-1">
              <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-neutral-300 rounded accent-neutral-900" />
              <span className="text-[13px] text-neutral-600 font-light flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-neutral-400" /> I'd like to schedule a visit
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-1 accent-neutral-900" />
              <span className="text-[12px] text-neutral-500 font-light leading-relaxed">I accept the terms and privacy policy.</span>
            </label>
            <button type="submit" className="w-full bg-neutral-900 text-white text-[13px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-800 transition-all duration-300">
              {wantVisit ? "Request Visit" : "Send Enquiry"}
            </button>
          </form>
        </>
      )}

      {/* ── THANK YOU + SUGGESTIONS ── */}
      {(stage === "thanks" || stage === "suggestions") && (
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-[18px] font-medium text-neutral-900 mb-1">Thank You!</h3>
            <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
              Your enquiry for <span className="font-medium text-neutral-700">{propertyTitle}</span> has been received.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono mt-1">REF-{propertyRef}</p>
          </div>

          {stage === "thanks" && (
            <div className="flex items-center justify-center gap-1.5 text-neutral-400 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[12px] font-light">Finding similar properties…</span>
            </div>
          )}

          {stage === "suggestions" && (
            <>
              <div className="border-t border-neutral-200 pt-4 mb-3">
                <p className="text-[14px] font-medium text-neutral-900 mb-1">You May Also Like</p>
                <p className="text-[12px] text-neutral-500 font-light">Similar properties that may interest you</p>
              </div>
              <div className="space-y-2.5">
                {suggestions.map((s, i) => (
                  <div key={i} className="flex gap-3 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:bg-neutral-100 hover:border-neutral-300 transition-all cursor-pointer group">
                    <img src={s.image} alt={s.name} className="w-24 h-18 object-cover shrink-0" />
                    <div className="py-2 pr-3 flex flex-col justify-center min-w-0">
                      <p className="text-[11px] text-neutral-500 font-light tracking-[0.05em]">{s.location}</p>
                      <p className="text-[13px] font-medium text-neutral-900 leading-tight line-clamp-1 group-hover:text-neutral-600 transition-colors">{s.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[12px] text-neutral-500 font-light">
                        <span>{s.beds} beds</span><span>{s.baths} baths</span><span>{s.sqm} m²</span>
                      </div>
                      <p className="text-[15px] font-light text-neutral-900 mt-1">{s.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStage("form")} className="w-full mt-5 border border-neutral-300 text-neutral-900 text-[12px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-100 transition-all">
                Back to Form
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailEnquiryModal;
