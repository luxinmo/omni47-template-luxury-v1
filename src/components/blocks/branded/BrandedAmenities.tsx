/**
 * BRANDED AMENITIES
 * Amenities icon grid for branded residence detail pages.
 * Re-exports ProjectAmenitiesGrid with branded defaults.
 * Origin: BrandedResidenceDetailPage
 */

import ProjectAmenitiesGrid from "@/components/blocks/projects/ProjectAmenitiesGrid";

interface BrandedAmenitiesProps {
  sectionLabel?: string;
  title?: string;
  amenities?: { iconName: string; label: string }[];
}

const BrandedAmenities = ({
  sectionLabel = "Five-Star Lifestyle",
  title = "Amenities & Facilities",
  ...rest
}: BrandedAmenitiesProps) => (
  <ProjectAmenitiesGrid sectionLabel={sectionLabel} title={title} {...rest} />
);

export default BrandedAmenities;
