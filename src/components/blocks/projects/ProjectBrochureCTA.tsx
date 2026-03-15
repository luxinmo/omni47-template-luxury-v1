import { ArrowRight } from "lucide-react";

interface ProjectBrochureCTAProps {
  projectName?: string;
  description?: string;
  ctaText?: string;
  onDownload?: () => void;
  accentColor?: string;
}

export default function ProjectBrochureCTA({
  projectName = "Four Seasons Private Residences",
  description = "Floor plans, specifications, amenities, pricing and investment details in a single document.",
  ctaText = "Download PDF",
  onDownload,
  accentColor = "#8b6f47",
}: ProjectBrochureCTAProps) {
  return (
    <div className="p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6 bg-[#f8f6f3] border border-[#e8e4df]">
      <div className="flex-1">
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: accentColor }}>Download</p>
        <h3 className="text-lg font-light mb-1 text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>{projectName} Brochure</h3>
        <p className="text-[13px] font-light text-[#8a8580]">{description}</p>
      </div>
      <button
        onClick={onDownload}
        className="shrink-0 inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-light px-8 py-3.5 transition-all hover:opacity-90 rounded-sm text-white"
        style={{ background: accentColor }}
      >
        <ArrowRight className="w-4 h-4 -rotate-90" /> {ctaText}
      </button>
    </div>
  );
}
