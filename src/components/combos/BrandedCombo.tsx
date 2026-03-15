/**
 * BRANDED COMBO — Branded Residence Detail Preview
 * Gallery Mosaic + Info Ribbon + Description + Highlights + Brochure CTA + Amenities + Brand Services + Units Table
 */
import ProjectGalleryMosaic from "@/components/blocks/projects/ProjectGalleryMosaic";
import ProjectInfoRibbon from "@/components/blocks/projects/ProjectInfoRibbon";
import ProjectDescription from "@/components/blocks/projects/ProjectDescription";
import ProjectHighlights from "@/components/blocks/projects/ProjectHighlights";
import ProjectBrochureCTA from "@/components/blocks/projects/ProjectBrochureCTA";
import ProjectAmenitiesGrid from "@/components/blocks/projects/ProjectAmenitiesGrid";
import ProjectBrandServices from "@/components/blocks/projects/ProjectBrandServices";
import ProjectUnitsTable from "@/components/blocks/projects/ProjectUnitsTable";
import ProjectPriceSidebar from "@/components/blocks/projects/ProjectPriceSidebar";

const BrandedCombo = () => (
  <div>
    <ProjectGalleryMosaic estimatedROI="6 – 8%" />
    <ProjectInfoRibbon icon="crown" brandOrLabel="Four Seasons" />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
      <div>
        <ProjectDescription />
        <div className="mt-10"><ProjectHighlights /></div>
        <div className="mt-10"><ProjectBrochureCTA /></div>
        <div className="mt-10"><ProjectAmenitiesGrid /></div>
        <div className="mt-10"><ProjectBrandServices /></div>
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ProjectPriceSidebar />
      </div>
    </div>
    <ProjectUnitsTable />
  </div>
);

export default BrandedCombo;
