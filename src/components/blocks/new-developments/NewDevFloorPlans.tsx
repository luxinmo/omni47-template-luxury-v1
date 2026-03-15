/**
 * NEW DEV FLOOR PLANS
 * Floor plan grid for new development detail pages.
 * Re-exports DetailFloorPlans with new dev defaults.
 * Origin: NewDevelopmentDetailPage (planned section)
 */

import DetailFloorPlans from "@/components/blocks/detail/DetailFloorPlans";

interface NewDevFloorPlansProps {
  title?: string;
  plans?: { label: string; image?: string }[];
}

const NewDevFloorPlans = ({
  title = "Floor Plans",
  ...rest
}: NewDevFloorPlansProps) => (
  <DetailFloorPlans title={title} {...rest} />
);

export default NewDevFloorPlans;
