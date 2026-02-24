import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
}

interface LocationBreadcrumbProps {
  segments: BreadcrumbSegment[];
}

const LocationBreadcrumb = ({ segments }: LocationBreadcrumbProps) => {
  if (segments.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1 text-[12px] mb-2">
      <button
        onClick={segments[segments.length - 2]?.onClick}
        className="flex items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-3 w-3" />
        {segments.slice(0, -1).map((seg, i) => (
          <span key={i} className="flex items-center gap-0.5">
            {i > 0 && <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/40" />}
            <span
              className={seg.onClick ? "hover:underline cursor-pointer" : ""}
              onClick={(e) => { if (seg.onClick) { e.stopPropagation(); seg.onClick(); } }}
            >
              {seg.label}
            </span>
          </span>
        ))}
      </button>
    </nav>
  );
};

export default LocationBreadcrumb;
