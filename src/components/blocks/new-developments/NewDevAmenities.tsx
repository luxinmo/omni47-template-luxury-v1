/**
 * NEW DEV AMENITIES
 * Amenities icon grid for new development detail pages.
 * Re-exports ProjectAmenitiesGrid with new dev defaults.
 * Origin: NewDevelopmentDetailPage
 */

import ProjectAmenitiesGrid from "@/components/blocks/projects/ProjectAmenitiesGrid";

interface NewDevAmenitiesProps {
  sectionLabel?: string;
  title?: string;
  amenities?: { iconName: string; label: string }[];
}

const NewDevAmenities = ({
  sectionLabel = "Community Living",
  title = "Amenities & Facilities",
  ...rest
}: NewDevAmenitiesProps) => (
  <ProjectAmenitiesGrid sectionLabel={sectionLabel} title={title} {...rest} />
);

export default NewDevAmenities;
