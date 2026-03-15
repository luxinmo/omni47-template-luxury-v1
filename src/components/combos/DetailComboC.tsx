/**
 * DETAIL COMBO C — "Card Layout V4 Style"
 * Gallery + Breadcrumb Sticky + Info Header Card + Description + Features + Floor Plans + Related List + Buyer's Guide
 */
import DetailGallery from "@/components/blocks/detail/DetailGallery";
import DetailBreadcrumbSticky from "@/components/blocks/detail/DetailBreadcrumbSticky";
import DetailInfoHeaderCard from "@/components/blocks/detail/DetailInfoHeaderCard";
import DetailDescription from "@/components/blocks/detail/DetailDescription";
import DetailFeaturesGrid from "@/components/blocks/detail/DetailFeaturesGrid";
import DetailFloorPlans from "@/components/blocks/detail/DetailFloorPlans";
import DetailRelatedList from "@/components/blocks/detail/DetailRelatedList";
import DetailBuyersGuide from "@/components/blocks/detail/DetailBuyersGuide";

const DetailComboC = () => (
  <div>
    <DetailGallery />
    <DetailBreadcrumbSticky />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10">
      <DetailInfoHeaderCard />
      <div className="mt-8"><DetailDescription /></div>
      <div className="mt-8"><DetailFeaturesGrid /></div>
      <div className="mt-8"><DetailFloorPlans /></div>
      <div className="mt-8"><DetailBuyersGuide /></div>
    </div>
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10"><DetailRelatedList /></div>
  </div>
);

export default DetailComboC;
