/**
 * HOME COMBO B — "Classic Luxury"
 * Hero Carousel + Stats Ribbon + Featured 4-col + Destinations Grid + Collections + About Split + Journal + Newsletter
 */
import HeroCarouselCenter from "@/components/blocks/heroes/HeroCarouselCenter";
import StatsRibbon from "@/components/blocks/stats/StatsRibbon";
import FeaturedGrid4Col from "@/components/blocks/featured-properties/FeaturedGrid4Col";
import DestinationsGridTall from "@/components/blocks/destinations/DestinationsGridTall";
import CollectionsLandscape from "@/components/blocks/collections/CollectionsLandscape";
import AboutServicesSplit from "@/components/blocks/about/AboutServicesSplit";
import JournalEditorial from "@/components/blocks/journal/JournalEditorial";
import NewsletterCentered from "@/components/blocks/cta/NewsletterCentered";
import FooterLuxury from "@/components/blocks/footer/FooterLuxury";

const HomeComboB = () => (
  <div>
    <HeroCarouselCenter />
    <StatsRibbon />
    <FeaturedGrid4Col />
    <DestinationsGridTall />
    <CollectionsLandscape />
    <AboutServicesSplit />
    <JournalEditorial />
    <NewsletterCentered />
    <FooterLuxury />
  </div>
);

export default HomeComboB;
