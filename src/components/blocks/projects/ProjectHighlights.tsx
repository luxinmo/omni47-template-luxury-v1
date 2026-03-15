import { CheckCircle2 } from "lucide-react";

interface ProjectHighlightsProps {
  sectionLabel?: string;
  highlights?: string[];
  accentColor?: string;
}

export default function ProjectHighlights({
  sectionLabel = "Key Highlights",
  highlights = [
    "Beachfront location with direct sea access",
    "Full Five-Star hotel services included",
    "Award-winning architectural design",
    "Optional rental programme managed by brand",
    "Energy efficiency rating A",
  ],
  accentColor = "#8b6f47",
}: ProjectHighlightsProps) {
  return (
    <div className="p-8 rounded-sm bg-[#f8f6f3]">
      <h3 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: accentColor }}>{sectionLabel}</h3>
      <div className="space-y-3">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
            <span className="text-[14px] font-light text-[#2C2825]">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
