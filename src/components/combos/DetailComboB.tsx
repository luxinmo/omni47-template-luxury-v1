/**
 * DETAIL COMBO B — "Classic V2 Style"
 * Gallery Classic + Breadcrumb + Info Header Inline + Description + Features + Nearby Places + Mortgage + Contact Form + Related
 */
import DetailGalleryClassic from "@/components/blocks/detail/DetailGalleryClassic";
import DetailBreadcrumb from "@/components/blocks/detail/DetailBreadcrumb";
import DetailInfoHeaderInline from "@/components/blocks/detail/DetailInfoHeaderInline";
import DetailDescription from "@/components/blocks/detail/DetailDescription";
import DetailFeaturesGrid from "@/components/blocks/detail/DetailFeaturesGrid";
import DetailNearbyPlaces from "@/components/blocks/detail/DetailNearbyPlaces";
import DetailMortgageCalculator from "@/components/blocks/detail/DetailMortgageCalculator";
import DetailContactForm from "@/components/blocks/detail/DetailContactForm";
import DetailRelatedGrid from "@/components/blocks/detail/DetailRelatedGrid";
import DetailEnergyBadge from "@/components/blocks/detail/DetailEnergyBadge";

const DetailComboB = () => (
  <div>
    <DetailGalleryClassic />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-6">
      <DetailBreadcrumb />
      <div className="mt-6"><DetailInfoHeaderInline /></div>
      <div className="mt-8"><DetailDescription /></div>
      <div className="mt-8"><DetailFeaturesGrid /></div>
      <div className="mt-8"><DetailEnergyBadge /></div>
      <div className="mt-8"><DetailNearbyPlaces /></div>
      <div className="mt-8"><DetailMortgageCalculator /></div>
      <div className="mt-8"><DetailContactForm /></div>
    </div>
    <DetailRelatedGrid />
  </div>
);

export default DetailComboB;
