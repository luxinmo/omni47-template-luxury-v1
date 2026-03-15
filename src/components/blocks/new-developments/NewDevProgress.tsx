/**
 * NEW DEV PROGRESS
 * Standalone construction progress bar for new development projects.
 * Same visual as BrandedProgress but with new dev defaults.
 * Origin: NewDevelopmentDetailPage
 */

import BrandedProgress from "@/components/blocks/branded/BrandedProgress";

interface NewDevProgressProps {
  label?: string;
  percentage?: number;
  status?: string;
  delivery?: string;
}

const NewDevProgress = ({
  label = "Construction Progress",
  percentage = 55,
  status = "Under Construction",
  delivery = "Q2 2027",
}: NewDevProgressProps) => (
  <BrandedProgress
    label={label}
    percentage={percentage}
    status={status}
    delivery={delivery}
  />
);

export default NewDevProgress;
