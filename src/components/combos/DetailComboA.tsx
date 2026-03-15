/**
 * DETAIL COMBO A — "V6 Standard"
 * Gallery Mosaic + Info Header + Description + Features + Characteristics + Market Data + Nearby Areas + Mortgage + Related + SEO Links
 */
import DetailGallery from "@/components/blocks/detail/DetailGallery";
import DetailInfoHeader from "@/components/blocks/detail/DetailInfoHeader";
import DetailDescription from "@/components/blocks/detail/DetailDescription";
import DetailFeaturesGrid from "@/components/blocks/detail/DetailFeaturesGrid";
import DetailCharacteristics from "@/components/blocks/detail/DetailCharacteristics";
import DetailMarketData from "@/components/blocks/detail/DetailMarketData";
import DetailNearbyAreas from "@/components/blocks/detail/DetailNearbyAreas";
import DetailMortgageCalculator from "@/components/blocks/detail/DetailMortgageCalculator";
import DetailRelatedGrid from "@/components/blocks/detail/DetailRelatedGrid";
import DetailSeoLinks from "@/components/blocks/detail/DetailSeoLinks";
import DetailEnergyBadge from "@/components/blocks/detail/DetailEnergyBadge";

const DetailComboA = () => (
  <div>
    <DetailGallery />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10">
      <DetailInfoHeader />
      <div className="mt-8"><DetailDescription /></div>
      <div className="mt-8"><DetailFeaturesGrid /></div>
      <div className="mt-8"><DetailCharacteristics /></div>
      <div className="mt-8"><DetailEnergyBadge /></div>
      <div className="mt-8"><DetailMarketData /></div>
      <div className="mt-8"><DetailNearbyAreas /></div>
      <div className="mt-8"><DetailMortgageCalculator /></div>
    </div>
    <DetailRelatedGrid />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 py-10"><DetailSeoLinks /></div>
  </div>
);

export default DetailComboA;
