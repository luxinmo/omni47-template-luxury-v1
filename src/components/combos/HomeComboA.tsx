/**
 * HOME COMBO A — "Luxury Editorial"
 * Hero Editorial + Stats Bar + Featured Portrait + Destinations Asymmetric + Testimonial Parallax + Newsletter Bordered
 */
import HeroEditorialLeft from "@/components/blocks/heroes/HeroEditorialLeft";
import StatsBarDividers from "@/components/blocks/stats/StatsBarDividers";
import FeaturedGridPortrait from "@/components/blocks/featured-properties/FeaturedGridPortrait";
import DestinationsAsymmetric from "@/components/blocks/destinations/DestinationsAsymmetric";
import TestimonialParallaxQuote from "@/components/blocks/testimonials/TestimonialParallaxQuote";
import NewsletterBordered from "@/components/blocks/cta/NewsletterBordered";
import FooterEditorial from "@/components/blocks/footer/FooterEditorial";

const HomeComboA = () => (
  <div>
    <HeroEditorialLeft />
    <StatsBarDividers />
    <FeaturedGridPortrait />
    <DestinationsAsymmetric />
    <TestimonialParallaxQuote />
    <NewsletterBordered />
    <FooterEditorial />
  </div>
);

export default HomeComboA;
