/**
 * HOME COMBO C — "Interactive Premium"
 * Hero Carousel + Stats Ribbon + Featured 3-col + Property Types + Collections Tagged + Branded Fullwidth + Market Data + Trust + Areas + Finder + Newsletter
 */
import HeroCarouselCenter from "@/components/blocks/heroes/HeroCarouselCenter";
import StatsRibbon from "@/components/blocks/stats/StatsRibbon";
import FeaturedGrid3Col from "@/components/blocks/featured-properties/FeaturedGrid3Col";
import PropertyTypesGrid from "@/components/blocks/property-types/PropertyTypesGrid";
import CollectionsTagged from "@/components/blocks/collections/CollectionsTagged";
import BrandedFullwidth from "@/components/blocks/branded/BrandedFullwidth";
import MarketDataCards from "@/components/blocks/market/MarketDataCards";
import TrustIcons from "@/components/blocks/trust/TrustIcons";
import AreasTextList from "@/components/blocks/areas/AreasTextList";
import FinderFormCentered from "@/components/blocks/finder/FinderFormCentered";
import NewsletterCentered from "@/components/blocks/cta/NewsletterCentered";
import FooterLuxury from "@/components/blocks/footer/FooterLuxury";

const HomeComboC = () => (
  <div>
    <HeroCarouselCenter />
    <StatsRibbon />
    <FeaturedGrid3Col />
    <PropertyTypesGrid />
    <CollectionsTagged />
    <BrandedFullwidth />
    <MarketDataCards />
    <TrustIcons />
    <AreasTextList />
    <FinderFormCentered />
    <NewsletterCentered />
    <FooterLuxury />
  </div>
);

export default HomeComboC;
