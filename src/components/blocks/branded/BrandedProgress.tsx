/**
 * BRANDED PROGRESS
 * Standalone construction progress bar for branded residence projects.
 * Extracted from ProjectPriceSidebar for independent use.
 * Origin: BrandedResidenceDetailPage
 */

interface BrandedProgressProps {
  label?: string;
  percentage?: number;
  status?: string;
  delivery?: string;
}

const BrandedProgress = ({
  label = "Construction Progress",
  percentage = 45,
  status = "Selling",
  delivery = "Q2 2027",
}: BrandedProgressProps) => (
  <div className="p-6 rounded-sm border border-neutral-200 bg-white">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] tracking-[0.15em] uppercase text-neutral-400">{label}</span>
      <span className="text-[14px] font-light text-neutral-900">{percentage}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-neutral-100 mb-4">
      <div
        className="h-full rounded-full transition-all duration-700 bg-amber-700/60"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="flex items-center justify-between text-[12px]">
      <span className="font-light text-neutral-500">
        Status: <span className="text-neutral-900">{status}</span>
      </span>
      <span className="font-light text-neutral-500">
        Delivery: <span className="text-neutral-900">{delivery}</span>
      </span>
    </div>
  </div>
);

export default BrandedProgress;
