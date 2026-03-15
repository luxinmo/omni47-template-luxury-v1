import React from "react";

interface DetailBuyersGuideProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  location?: string;
}

const DetailBuyersGuide: React.FC<DetailBuyersGuideProps> = ({
  title,
  subtitle = "Free Download",
  description = "Taxes, legal process, golden visa, and market insights.",
  buttonLabel = "Download Guide",
  location = "Ibiza",
}) => {
  const finalTitle = title ?? `Buyer's Guide to Luxury Property in ${location}`;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
      <div className="border border-neutral-200 rounded-sm px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 font-medium mb-1">{subtitle}</p>
          <h3 className="text-[18px] font-light text-neutral-900 tracking-tight">{finalTitle}</h3>
          <p className="text-[13px] text-neutral-500 font-light mt-1.5 max-w-lg">{description}</p>
        </div>
        <button className="shrink-0 border border-neutral-300 text-neutral-900 text-[11px] tracking-[0.12em] uppercase px-6 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-sm">
          {buttonLabel}
        </button>
      </div>
    </section>
  );
};

export default DetailBuyersGuide;
