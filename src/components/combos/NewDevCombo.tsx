/**
 * NEW DEV COMBO — New Development Detail Preview
 * Gallery Mosaic + Info Ribbon + Description + Highlights + Brochure CTA + Amenities + Units Table
 */
import ProjectGalleryMosaic from "@/components/blocks/projects/ProjectGalleryMosaic";
import ProjectInfoRibbon from "@/components/blocks/projects/ProjectInfoRibbon";
import ProjectDescription from "@/components/blocks/projects/ProjectDescription";
import ProjectHighlights from "@/components/blocks/projects/ProjectHighlights";
import ProjectBrochureCTA from "@/components/blocks/projects/ProjectBrochureCTA";
import ProjectAmenitiesGrid from "@/components/blocks/projects/ProjectAmenitiesGrid";
import ProjectUnitsTable from "@/components/blocks/projects/ProjectUnitsTable";
import ProjectPriceSidebar from "@/components/blocks/projects/ProjectPriceSidebar";
import ProjectLocationCard from "@/components/blocks/projects/ProjectLocationCard";

const NewDevCombo = () => (
  <div>
    <ProjectGalleryMosaic estimatedROI="5 – 7%" />
    <ProjectInfoRibbon
      icon="building"
      brandOrLabel="New Development"
      name="Marea Residences"
      location="Altea, Costa Blanca"
      priceMin="€485,000"
      priceMax="€1,250,000"
      status="Selling"
      trending
      stats={[
        { label: "Total Units", value: "64" },
        { label: "Available", value: "28" },
        { label: "Construction", value: "55%" },
        { label: "Delivery", value: "Q2 2027" },
        { label: "Developer", value: "Grupo Prasa" },
      ]}
    />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
      <div>
        <ProjectDescription
          title="Marea Residences"
          paragraphs={[
            "Marea Residences is a landmark development in Altea, one of the most charming towns on Spain's Costa Blanca.",
            "Each home features floor-to-ceiling windows framing panoramic Mediterranean views, premium porcelain finishes, and fully fitted kitchens.",
          ]}
        />
        <div className="mt-10"><ProjectHighlights /></div>
        <div className="mt-10"><ProjectBrochureCTA /></div>
        <div className="mt-10"><ProjectAmenitiesGrid /></div>
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
        <ProjectPriceSidebar />
        <ProjectLocationCard />
      </div>
    </div>
    <ProjectUnitsTable />
  </div>
);

export default NewDevCombo;
