/**
 * NEW DEV UNIT TABLE
 * Filterable units table for new development detail pages.
 * Re-exports ProjectUnitsTable with new dev defaults.
 * Origin: NewDevelopmentDetailPage
 */

import ProjectUnitsTable from "@/components/blocks/projects/ProjectUnitsTable";

interface NewDevUnitTableProps {
  sectionLabel?: string;
  title?: string;
  units?: any[];
}

const NewDevUnitTable = ({
  sectionLabel = "New Development",
  title = "Available Units",
  ...rest
}: NewDevUnitTableProps) => (
  <ProjectUnitsTable sectionLabel={sectionLabel} title={title} {...rest} />
);

export default NewDevUnitTable;
