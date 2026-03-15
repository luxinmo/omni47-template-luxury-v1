import React from "react";
import { ChevronRight, FileDown } from "lucide-react";

interface DetailBreadcrumbStickyProps {
  items?: string[];
  onDownload?: () => void;
}

/**
 * DetailBreadcrumbSticky — V4 layout: sticky breadcrumb bar below navbar
 * with PDF download button on the right.
 * Different from the simple inline breadcrumb of V6.
 */
const DetailBreadcrumbSticky: React.FC<DetailBreadcrumbStickyProps> = ({
  items = ["Home", "Properties", "Contemporary Villa"],
  onDownload,
}) => {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.04em] text-neutral-500">
            {items.map((item, i) => (
              <React.Fragment key={i}>
                {i < items.length - 1 ? (
                  <>
                    <span className="hover:text-neutral-900 cursor-pointer transition-colors">{item}</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </>
                ) : (
                  <span className="text-neutral-900 font-medium">{item}</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={onDownload}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all"
            aria-label="Download brochure"
          >
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBreadcrumbSticky;
