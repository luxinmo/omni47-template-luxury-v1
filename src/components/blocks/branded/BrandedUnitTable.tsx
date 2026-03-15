/**
 * BRANDED UNIT TABLE
 * Filterable units table for branded residence detail pages.
 * Re-exports ProjectUnitsTable with branded defaults.
 * Origin: BrandedResidenceDetailPage
 */

import ProjectUnitsTable from "@/components/blocks/projects/ProjectUnitsTable";

interface BrandedUnitTableProps {
  sectionLabel?: string;
  title?: string;
  units?: any[];
}

const BrandedUnitTable = ({
  sectionLabel = "Branded Residences",
  title = "Available Units",
  ...rest
}: BrandedUnitTableProps) => (
  <ProjectUnitsTable sectionLabel={sectionLabel} title={title} {...rest} />
);

export default BrandedUnitTable;
