import React, { useState } from "react";
import { CalendarDays, Check, ChevronLeft } from "lucide-react";

interface DetailContactFormProps {
  propertyTitle?: string;
  propertyRef?: string;
  propertyImage?: string;
  propertyPrice?: string;
}

const DetailContactForm: React.FC<DetailContactFormProps> = ({
  propertyTitle = "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  propertyRef = "PE-IBZ-2847",
  propertyImage,
  propertyPrice = "€4,650,000",
}) => {
  const [wantVisit, setWantVisit] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-neutral-200 rounded-sm p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-neutral-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-[18px] font-medium text-neutral-900 mb-1">Thank You!</h3>
        <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
          Your enquiry for <span className="font-medium text-neutral-700">{propertyTitle}</span> has been received.
        </p>
        <p className="text-[11px] text-neutral-400 font-mono mt-1">REF-{propertyRef}</p>
        <button onClick={() => setSent(false)} className="mt-5 text-[12px] tracking-[0.1em] uppercase text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-1 mx-auto">
          <ChevronLeft className="w-3.5 h-3.5" /> Send another
        </button>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 rounded-sm overflow-hidden">
      {/* Header with property info */}
      {propertyImage && (
        <div className="flex gap-3 bg-neutral-50 border-b border-neutral-200 p-4">
          <img src={propertyImage} alt={propertyTitle} className="w-24 h-20 object-cover shrink-0 rounded-sm" />
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-[13px] font-medium text-neutral-900 leading-tight line-clamp-2 uppercase tracking-[0.02em]">{propertyTitle}</p>
            <p className="text-[14px] text-neutral-700 font-medium mt-1">{propertyPrice}</p>
            <span className="text-[11px] text-neutral-400 font-mono tracking-[0.05em] mt-0.5">REF-{propertyRef}</span>
          </div>
        </div>
      )}

      <form className="p-5 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-medium mb-2">Contact Us About This Property</p>
        <input type="text" placeholder="Full name" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
        <input type="email" placeholder="Email address" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
        <input type="tel" placeholder="Phone number" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm" />
        <textarea placeholder="I'm interested in this property..." rows={3} className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors resize-none rounded-sm" />

        <label className="flex items-center gap-2 cursor-pointer select-none py-1">
          <input type="checkbox" checked={wantVisit} onChange={(e) => setWantVisit(e.target.checked)} className="w-4 h-4 border-neutral-300 rounded accent-neutral-900" />
          <span className="text-[13px] text-neutral-600 font-light flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-neutral-400" />
            I'd like to schedule a visit
          </span>
        </label>

        {wantVisit && (
          <div className="space-y-2 bg-neutral-50 border border-neutral-200 p-3 rounded-sm">
            <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 font-medium mb-1">Preferred Date & Time</p>
            <input type="date" className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm bg-white" />
            <select className="w-full border border-neutral-300 px-4 py-2.5 text-[14px] text-neutral-900 appearance-none cursor-pointer focus:outline-none focus:border-neutral-500 transition-all rounded-sm bg-white">
              <option value="" disabled selected>Select a time</option>
              {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="mt-1 accent-neutral-900" />
          <span className="text-[12px] text-neutral-500 font-light leading-relaxed">
            I accept the terms and privacy policy.
          </span>
        </label>
        <button type="submit" className="w-full bg-neutral-900 text-white text-[13px] tracking-[0.1em] uppercase py-3 hover:bg-neutral-800 transition-all duration-300">
          {wantVisit ? "Request Visit" : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default DetailContactForm;
