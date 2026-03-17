import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * BLOCKS CATALOG — Visual index of all available blocks
 * Each block can be previewed individually or combined in preview pages.
 */

import HeroCarouselCenter from "@/components/blocks/heroes/HeroCarouselCenter";
import HeroEditorialLeft from "@/components/blocks/heroes/HeroEditorialLeft";
import StatsRibbon from "@/components/blocks/stats/StatsRibbon";
import StatsBarDividers from "@/components/blocks/stats/StatsBarDividers";
import FeaturedGrid4Col from "@/components/blocks/featured-properties/FeaturedGrid4Col";
import FeaturedGrid3Col from "@/components/blocks/featured-properties/FeaturedGrid3Col";
import FeaturedGridPortrait from "@/components/blocks/featured-properties/FeaturedGridPortrait";
import DestinationsGridTall from "@/components/blocks/destinations/DestinationsGridTall";
import DestinationsAsymmetric from "@/components/blocks/destinations/DestinationsAsymmetric";
import DestinationsMapCarousel from "@/components/blocks/destinations/DestinationsMapCarousel";
import PropertyTypesGrid from "@/components/blocks/property-types/PropertyTypesGrid";
import CollectionsLandscape from "@/components/blocks/collections/CollectionsLandscape";
import CollectionsTagged from "@/components/blocks/collections/CollectionsTagged";
import BrandedFullwidth from "@/components/blocks/branded/BrandedFullwidth";
import NewdevGridSimple from "@/components/blocks/new-developments/NewdevGridSimple";
import OffmarketSplit from "@/components/blocks/offmarket/OffmarketSplit";
import AboutServicesSplit from "@/components/blocks/about/AboutServicesSplit";
import IntroSplitImage from "@/components/blocks/about/IntroSplitImage";
import TestimonialCinematic from "@/components/blocks/testimonials/TestimonialCinematic";
import TestimonialParallaxQuote from "@/components/blocks/testimonials/TestimonialParallaxQuote";
import FinderFormCentered from "@/components/blocks/finder/FinderFormCentered";
import MarketDataCards from "@/components/blocks/market/MarketDataCards";
import TrustIcons from "@/components/blocks/trust/TrustIcons";
import JournalEditorial from "@/components/blocks/journal/JournalEditorial";
import AreasTextList from "@/components/blocks/areas/AreasTextList";
import InvestmentGrid from "@/components/blocks/investments/InvestmentGrid";
import NewsletterCentered from "@/components/blocks/cta/NewsletterCentered";
import NewsletterBordered from "@/components/blocks/cta/NewsletterBordered";
import NavbarLuxury from "@/components/blocks/navbar/NavbarLuxury";
import FooterLuxury from "@/components/blocks/footer/FooterLuxury";
import FooterEditorial from "@/components/blocks/footer/FooterEditorial";
import DetailBreadcrumb from "@/components/blocks/detail/DetailBreadcrumb";
import DetailInfoHeader from "@/components/blocks/detail/DetailInfoHeader";
import DetailDescription from "@/components/blocks/detail/DetailDescription";
import DetailFeaturesGrid from "@/components/blocks/detail/DetailFeaturesGrid";
import DetailAmenitiesFull from "@/components/blocks/detail/DetailAmenitiesFull";
import DetailCharacteristics from "@/components/blocks/detail/DetailCharacteristics";
import DetailPriceCard from "@/components/blocks/detail/DetailPriceCard";
import DetailMortgageCalculator from "@/components/blocks/detail/DetailMortgageCalculator";
import DetailNearbyPlaces from "@/components/blocks/detail/DetailNearbyPlaces";
import DetailRelatedGrid from "@/components/blocks/detail/DetailRelatedGrid";
import DetailFloorPlans from "@/components/blocks/detail/DetailFloorPlans";
import DetailMarketData from "@/components/blocks/detail/DetailMarketData";
import DetailSeoLinks from "@/components/blocks/detail/DetailSeoLinks";
import DetailGallery from "@/components/blocks/detail/DetailGallery";
import DetailContactForm from "@/components/blocks/detail/DetailContactForm";
import DetailEnquiryModal from "@/components/blocks/detail/DetailEnquiryModal";
import DetailAgencyInfo from "@/components/blocks/detail/DetailAgencyInfo";
import DetailEnergyBadge from "@/components/blocks/detail/DetailEnergyBadge";
import DetailRecentlyViewed from "@/components/blocks/detail/DetailRecentlyViewed";
import DetailMobileStickyBar from "@/components/blocks/detail/DetailMobileStickyBar";
import DetailBuyersGuide from "@/components/blocks/detail/DetailBuyersGuide";
import DetailGalleryClassic from "@/components/blocks/detail/DetailGalleryClassic";
import DetailInfoHeaderInline from "@/components/blocks/detail/DetailInfoHeaderInline";
import DetailInfoHeaderCard from "@/components/blocks/detail/DetailInfoHeaderCard";
import DetailInfoHeaderWide from "@/components/blocks/detail/DetailInfoHeaderWide";
import DetailBreadcrumbSticky from "@/components/blocks/detail/DetailBreadcrumbSticky";
import DetailRelatedList from "@/components/blocks/detail/DetailRelatedList";
import DetailNearbyAreas from "@/components/blocks/detail/DetailNearbyAreas";
import ProjectCard from "@/components/blocks/projects/ProjectCard";
import ProjectBenefitsGrid from "@/components/blocks/projects/ProjectBenefitsGrid";
import ProjectHighlights from "@/components/blocks/projects/ProjectHighlights";
import ProjectBrochureCTA from "@/components/blocks/projects/ProjectBrochureCTA";
import ProjectAmenitiesGrid from "@/components/blocks/projects/ProjectAmenitiesGrid";
import ProjectBrandServices from "@/components/blocks/projects/ProjectBrandServices";
import ProjectPriceSidebar from "@/components/blocks/projects/ProjectPriceSidebar";
import ProjectLocationCard from "@/components/blocks/projects/ProjectLocationCard";
import ProjectUnitsTable from "@/components/blocks/projects/ProjectUnitsTable";
import BlogArticleCard from "@/components/blocks/blog/BlogArticleCard";
import BlogFeaturedPost from "@/components/blocks/blog/BlogFeaturedPost";
import BlogFaqAccordion from "@/components/blocks/blog/BlogFaqAccordion";
import BlogTrendingGrid from "@/components/blocks/blog/BlogTrendingGrid";
import ContactFormCentered from "@/components/blocks/contact/ContactFormCentered";
import ContactFormSplit from "@/components/blocks/contact/ContactFormSplit";
import ContactOfficeGrid from "@/components/blocks/contact/ContactOfficeGrid";
import ContactOfficeTabs from "@/components/blocks/contact/ContactOfficeTabs";
import FavoritesGrid from "@/components/blocks/favorites/FavoritesGrid";
import FavoritesEmptyState from "@/components/blocks/favorites/FavoritesEmptyState";
import MagazineEditorial from "@/components/blocks/journal/MagazineEditorial";
import ChatbotPanel from "@/components/blocks/chat/ChatbotPanel";
import ProjectInfoRibbon from "@/components/blocks/projects/ProjectInfoRibbon";
import ProjectDescription from "@/components/blocks/projects/ProjectDescription";
import ProjectGalleryMosaic from "@/components/blocks/projects/ProjectGalleryMosaic";
import BrandedListingCard from "@/components/blocks/branded/BrandedListingCard";
import BrandedDetailGallery from "@/components/blocks/branded/BrandedDetailGallery";
import BrandedUnitTable from "@/components/blocks/branded/BrandedUnitTable";
import BrandedAmenities from "@/components/blocks/branded/BrandedAmenities";
import BrandedProgress from "@/components/blocks/branded/BrandedProgress";
import NewDevListingCard from "@/components/blocks/new-developments/NewDevListingCard";
import NewDevDetailGallery from "@/components/blocks/new-developments/NewDevDetailGallery";
import NewDevUnitTable from "@/components/blocks/new-developments/NewDevUnitTable";
import NewDevFloorPlans from "@/components/blocks/new-developments/NewDevFloorPlans";
import NewDevAmenities from "@/components/blocks/new-developments/NewDevAmenities";
import NewDevProgress from "@/components/blocks/new-developments/NewDevProgress";
import BlogSearchFilter from "@/components/blocks/blog/BlogSearchFilter";
import BlogContentRenderer from "@/components/blocks/blog/BlogContentRenderer";
import BlogSocialShare from "@/components/blocks/blog/BlogSocialShare";
import ContactReasonsGrid from "@/components/blocks/contact/ContactReasonsGrid";
import SavedPropertyCard from "@/components/blocks/favorites/SavedPropertyCard";
import ShareCollectionDialog from "@/components/blocks/favorites/ShareCollectionDialog";
import PropertyPdfSheetV1 from "@/components/blocks/pdf/PropertyPdfSheetV1";
import PropertyPdfSheetV2 from "@/components/blocks/pdf/PropertyPdfSheetV2";
import HeroMini from "@/components/blocks/system/HeroMini";
import BreadcrumbBar from "@/components/blocks/system/BreadcrumbBar";
import NotFoundBlock from "@/components/blocks/system/NotFoundBlock";
import ListingPropertyCard from "@/components/blocks/listing/ListingPropertyCard";
import ListingBrandedCard from "@/components/blocks/listing/ListingBrandedCard";
import ListingNewDevCard from "@/components/blocks/listing/ListingNewDevCard";
import ListingOffMarketCard from "@/components/blocks/listing/ListingOffMarketCard";
import HomeComboA from "@/components/combos/HomeComboA";
import HomeComboB from "@/components/combos/HomeComboB";
import HomeComboC from "@/components/combos/HomeComboC";
import DetailComboA from "@/components/combos/DetailComboA";
import DetailComboB from "@/components/combos/DetailComboB";
import DetailComboC from "@/components/combos/DetailComboC";
import BrandedCombo from "@/components/combos/BrandedCombo";
import NewDevCombo from "@/components/combos/NewDevCombo";
import BlogCombo from "@/components/combos/BlogCombo";
import ContactCombo from "@/components/combos/ContactCombo";

const CATEGORIES = [
  {
    title: "🏠 Heroes",
    blocks: [
      { id: "hero-carousel-center", name: "Hero Carousel Centrado", origin: "Home2/3/4", component: HeroCarouselCenter },
      { id: "hero-editorial-left", name: "Hero Editorial Izquierda", origin: "Portal", component: HeroEditorialLeft },
    ],
  },
  {
    title: "📊 Stats",
    blocks: [
      { id: "stats-ribbon", name: "Stats Ribbon", origin: "Home2/3/4", component: StatsRibbon },
      { id: "stats-bar-dividers", name: "Stats Bar Dividers", origin: "Portal", component: StatsBarDividers },
    ],
  },
  {
    title: "🏡 Propiedades Destacadas",
    blocks: [
      { id: "featured-grid-4col", name: "Grid 4 Columnas", origin: "Home2", component: FeaturedGrid4Col },
      { id: "featured-grid-3col", name: "Grid 3 Columnas", origin: "Home3/4", component: FeaturedGrid3Col },
      { id: "featured-grid-portrait", name: "Grid Retratos", origin: "Portal", component: FeaturedGridPortrait },
    ],
  },
  {
    title: "🗺️ Destinos",
    blocks: [
      { id: "destinations-grid-tall", name: "Grid Vertical", origin: "Home2/3", component: DestinationsGridTall },
      { id: "destinations-asymmetric", name: "Grid Asimétrico", origin: "Portal", component: DestinationsAsymmetric },
      { id: "destinations-map-carousel", name: "Carousel con Mapas", origin: "Home", component: DestinationsMapCarousel },
    ],
  },
  {
    title: "🏷️ Tipos de Propiedad",
    blocks: [
      { id: "property-types-grid", name: "Grid de Tipos", origin: "Home3", component: PropertyTypesGrid },
    ],
  },
  {
    title: "🎨 Colecciones / Lifestyle",
    blocks: [
      { id: "collections-landscape", name: "Colecciones Paisaje", origin: "Home3/4", component: CollectionsLandscape },
      { id: "collections-tagged", name: "Colecciones con Tags", origin: "Portal", component: CollectionsTagged },
    ],
  },
  {
    title: "👑 Branded Residences",
    blocks: [
      { id: "branded-fullwidth", name: "Branded Fullwidth", origin: "Home3", component: BrandedFullwidth },
      { id: "branded-listing-card", name: "Branded Listing Card", origin: "BrandedResidences", component: BrandedListingCard },
      { id: "branded-detail-gallery", name: "Branded Detail Gallery", origin: "BrandedResidence Detail", component: BrandedDetailGallery },
      { id: "branded-unit-table", name: "Branded Unit Table", origin: "BrandedResidence Detail", component: BrandedUnitTable },
      { id: "branded-amenities", name: "Branded Amenities", origin: "BrandedResidence Detail", component: BrandedAmenities },
      { id: "branded-progress", name: "Branded Progress Bar", origin: "BrandedResidence Detail", component: BrandedProgress },
    ],
  },
  {
    title: "🏗️ Nuevas Promociones",
    blocks: [
      { id: "newdev-grid-simple", name: "Grid Simple", origin: "Home3/4", component: NewdevGridSimple },
      { id: "newdev-listing-card", name: "NewDev Listing Card", origin: "NewDevelopments", component: NewDevListingCard },
      { id: "newdev-detail-gallery", name: "NewDev Detail Gallery", origin: "NewDev Detail", component: NewDevDetailGallery },
      { id: "newdev-unit-table", name: "NewDev Unit Table", origin: "NewDev Detail", component: NewDevUnitTable },
      { id: "newdev-floor-plans", name: "NewDev Floor Plans", origin: "NewDev Detail", component: NewDevFloorPlans },
      { id: "newdev-amenities", name: "NewDev Amenities", origin: "NewDev Detail", component: NewDevAmenities },
      { id: "newdev-progress", name: "NewDev Progress Bar", origin: "NewDev Detail", component: NewDevProgress },
    ],
  },
  {
    title: "🏢 Projects (Branded + NewDev)",
    blocks: [
      { id: "project-card", name: "Project Card (Listing)", origin: "BrandedResidences / NewDev", component: ProjectCard },
      { id: "project-benefits-grid", name: "Benefits Grid (4-col)", origin: "BrandedResidences / NewDev", component: ProjectBenefitsGrid },
      { id: "project-highlights", name: "Key Highlights Box", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectHighlights },
      { id: "project-brochure-cta", name: "Brochure Download CTA", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectBrochureCTA },
      { id: "project-amenities-grid", name: "Amenities Icon Grid", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectAmenitiesGrid },
      { id: "project-brand-services", name: "Brand Services List", origin: "BrandedResidence Detail", component: ProjectBrandServices },
      { id: "project-price-sidebar", name: "Price Sidebar + Progress", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectPriceSidebar },
      { id: "project-location-card", name: "Location Card", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectLocationCard },
      { id: "project-units-table", name: "Units Table + Mobile Cards", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectUnitsTable },
      { id: "project-info-ribbon", name: "Info Ribbon (Title + Stats)", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectInfoRibbon },
      { id: "project-description", name: "Project Description (Multi-paragraph)", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectDescription },
      { id: "project-gallery-mosaic", name: "Gallery Mosaic + ROI Badge", origin: "BrandedResidence Detail / NewDev Detail", component: ProjectGalleryMosaic },
    ],
  },
  {
    title: "📋 Listing Cards",
    blocks: [
      { id: "listing-property-card", name: "Property Card (Mobile Optimized)", origin: "PropertyListing", component: ListingPropertyCard },
      { id: "listing-branded-card", name: "Branded Residence Promo Card", origin: "PropertyListing", component: ListingBrandedCard },
      { id: "listing-newdev-card", name: "New Development Promo Card", origin: "PropertyListing", component: ListingNewDevCard },
      { id: "listing-offmarket-card", name: "Off-Market Card + Enquiry Modal", origin: "PropertyListing", component: ListingOffMarketCard },
    ],
  },
  {
    title: "🔒 Off-Market",
    blocks: [
      { id: "offmarket-split", name: "Off-Market Split", origin: "Home2/3/4", component: OffmarketSplit },
    ],
  },
  {
    title: "ℹ️ Sobre / Servicios",
    blocks: [
      { id: "about-services-split", name: "About + Services Split", origin: "Home2", component: AboutServicesSplit },
      { id: "intro-split-image", name: "Intro con Imagen", origin: "Portal", component: IntroSplitImage },
    ],
  },
  {
    title: "💬 Testimonios",
    blocks: [
      { id: "testimonial-cinematic", name: "Testimonial Cinematográfico", origin: "Home2", component: TestimonialCinematic },
      { id: "testimonial-parallax-quote", name: "Quote Parallax", origin: "Portal", component: TestimonialParallaxQuote },
    ],
  },
  {
    title: "🔍 Property Finder",
    blocks: [
      { id: "finder-form-centered", name: "Formulario Centrado", origin: "Home4", component: FinderFormCentered },
    ],
  },
  {
    title: "📈 Market Insights",
    blocks: [
      { id: "market-data-cards", name: "Cards de Datos", origin: "Home3/4", component: MarketDataCards },
    ],
  },
  {
    title: "⭐ Confianza / Trust",
    blocks: [
      { id: "trust-icons", name: "Trust con Iconos", origin: "Home4", component: TrustIcons },
    ],
  },
  {
    title: "📰 Journal / Blog",
    blocks: [
      { id: "journal-editorial", name: "Journal Editorial", origin: "Home2/3/4", component: JournalEditorial },
      { id: "magazine-editorial", name: "Magazine Editorial (Category Badges)", origin: "Portal", component: MagazineEditorial },
    ],
  },
  {
    title: "📍 Áreas",
    blocks: [
      { id: "areas-text-list", name: "Lista de Áreas", origin: "Home3/4", component: AreasTextList },
    ],
  },
  {
    title: "💼 Inversiones",
    blocks: [
      { id: "investment-grid", name: "Grid de Inversiones", origin: "Portal", component: InvestmentGrid },
    ],
  },
  {
    title: "📣 Newsletter / CTA",
    blocks: [
      { id: "newsletter-centered", name: "Newsletter Centrado", origin: "Home2/3/4", component: NewsletterCentered },
      { id: "newsletter-bordered", name: "Newsletter con Líneas", origin: "Portal", component: NewsletterBordered },
    ],
  },
  {
    title: "🧭 Navbar",
    blocks: [
      { id: "navbar-luxury", name: "Navbar Luxury", origin: "Layout", component: NavbarLuxury },
    ],
  },
  {
    title: "📎 Footer",
    blocks: [
      { id: "footer-luxury", name: "Footer Luxury", origin: "Layout", component: FooterLuxury },
      { id: "footer-editorial", name: "Footer Editorial", origin: "Portal", component: FooterEditorial },
    ],
  },
  {
    title: "🏠 Property Detail",
    blocks: [
      { id: "detail-breadcrumb", name: "Breadcrumb", origin: "Detail V2–V6", component: DetailBreadcrumb },
      { id: "detail-info-header", name: "Info Header (Specs Grid)", origin: "Detail V6", component: DetailInfoHeader },
      { id: "detail-description", name: "Description (Expandable)", origin: "Detail V2–V6", component: DetailDescription },
      { id: "detail-features-grid", name: "Features Checklist", origin: "Detail V6", component: DetailFeaturesGrid },
      { id: "detail-characteristics", name: "Characteristics Table", origin: "Detail V6", component: DetailCharacteristics },
      { id: "detail-price-card", name: "Price Card (Sidebar)", origin: "Detail V6", component: DetailPriceCard },
      { id: "detail-mortgage-calculator", name: "Mortgage Calculator", origin: "Detail V2–V6", component: DetailMortgageCalculator },
      { id: "detail-nearby-places", name: "Nearby Places", origin: "Detail V2–V5", component: DetailNearbyPlaces },
      { id: "detail-related-grid", name: "Related Properties Grid", origin: "Detail V6", component: DetailRelatedGrid },
      { id: "detail-floor-plans", name: "Floor Plans", origin: "Detail V6", component: DetailFloorPlans },
      { id: "detail-market-data", name: "Market Data Stats", origin: "Detail V6", component: DetailMarketData },
      { id: "detail-seo-links", name: "SEO Internal Links", origin: "Detail V6", component: DetailSeoLinks },
      { id: "detail-gallery", name: "Gallery (Mosaic + Lightbox)", origin: "Detail V2–V6", component: DetailGallery },
      { id: "detail-contact-form", name: "Contact Form (Inline)", origin: "Detail V2–V6", component: DetailContactForm },
      { id: "detail-enquiry-modal", name: "Enquiry Modal (3 stages)", origin: "Detail V6", component: DetailEnquiryModal },
      { id: "detail-agency-info", name: "Agency Info Card", origin: "Detail V6", component: DetailAgencyInfo },
      { id: "detail-energy-badge", name: "Energy Rating Badge", origin: "Detail V2–V6", component: DetailEnergyBadge },
      { id: "detail-recently-viewed", name: "Recently Viewed Strip", origin: "Detail V6", component: DetailRecentlyViewed },
      { id: "detail-mobile-sticky-bar", name: "Mobile Sticky Contact Bar", origin: "Detail V2–V6", component: DetailMobileStickyBar },
      { id: "detail-buyers-guide", name: "Buyer's Guide Banner", origin: "Detail V6", component: DetailBuyersGuide },
      { id: "detail-gallery-classic", name: "Gallery Classic (Main+Thumbs)", origin: "Detail V2", component: DetailGalleryClassic },
      { id: "detail-info-header-inline", name: "Info Header Inline (Icons Row)", origin: "Detail V3", component: DetailInfoHeaderInline },
      { id: "detail-info-header-card", name: "Info Header Card (Summary)", origin: "Detail V4", component: DetailInfoHeaderCard },
      { id: "detail-info-header-wide", name: "Info Header Wide (6-col Grid)", origin: "Detail V5", component: DetailInfoHeaderWide },
      { id: "detail-breadcrumb-sticky", name: "Breadcrumb Sticky Bar", origin: "Detail V4", component: DetailBreadcrumbSticky },
      { id: "detail-related-list", name: "Related Properties List", origin: "Detail V4", component: DetailRelatedList },
      { id: "detail-nearby-areas", name: "Nearby Areas (Links Grid)", origin: "Detail V6", component: DetailNearbyAreas },
      { id: "detail-amenities-full", name: "Amenities Full Catalog (7 cats)", origin: "Omni47 Catalog", component: DetailAmenitiesFull },
    ],
  },
  {
    title: "📰 Blog / Journal Blocks",
    blocks: [
      { id: "blog-article-card", name: "Article Card (Grid)", origin: "BlogListing", component: BlogArticleCard },
      { id: "blog-featured-post", name: "Featured Post (Split)", origin: "BlogListing", component: BlogFeaturedPost },
      { id: "blog-faq-accordion", name: "FAQ Accordion (+/-)", origin: "BlogDetail", component: BlogFaqAccordion },
      { id: "blog-trending-grid", name: "Trending Grid (4-col)", origin: "BlogDetail", component: BlogTrendingGrid },
      { id: "blog-search-filter", name: "Search + Category Filter", origin: "BlogListing", component: BlogSearchFilter },
      { id: "blog-content-renderer", name: "Article Content + Author", origin: "BlogDetail", component: BlogContentRenderer },
      { id: "blog-social-share", name: "Social Share Sidebar", origin: "BlogDetail", component: BlogSocialShare },
    ],
  },
  {
    title: "📞 Contact",
    blocks: [
      { id: "contact-form-centered", name: "Form Centered + Office Selector", origin: "ContactPage V1", component: ContactFormCentered },
      { id: "contact-form-split", name: "Form Split (Hero + Form)", origin: "ContactPage V2", component: ContactFormSplit },
      { id: "contact-office-grid", name: "Office Cards Grid", origin: "ContactPage V1", component: ContactOfficeGrid },
      { id: "contact-office-tabs", name: "Office Tabs + Detail", origin: "ContactPage V2", component: ContactOfficeTabs },
      { id: "contact-reasons-grid", name: "Reasons Icon Grid", origin: "ContactPage V2", component: ContactReasonsGrid },
    ],
  },
  {
    title: "❤️ Favorites",
    blocks: [
      { id: "favorites-grid", name: "Saved Properties Grid", origin: "FavoritesPage", component: FavoritesGrid },
      { id: "favorites-empty-state", name: "Empty State CTA", origin: "FavoritesPage", component: FavoritesEmptyState },
      { id: "saved-property-card", name: "Saved Property Card", origin: "FavoritesPage", component: SavedPropertyCard },
      { id: "share-collection-dialog", name: "Share Collection Dialog", origin: "FavoritesPage", component: ShareCollectionDialog },
    ],
  },
  {
    title: "💬 Chatbot",
    blocks: [
      { id: "chatbot-panel", name: "Floating Chat Widget", origin: "Home4", component: ChatbotPanel },
    ],
  },
  {
    title: "📄 PDF Sheets",
    blocks: [
      { id: "pdf-sheet-v1", name: "Property Sheet V1 (1-page)", origin: "PropertyPdfV1", component: PropertyPdfSheetV1 },
      { id: "pdf-sheet-v2", name: "Property Sheet V2 (3-page)", origin: "PropertyPdfV2", component: PropertyPdfSheetV2 },
    ],
  },
  {
    title: "🔧 System",
    blocks: [
      { id: "hero-mini", name: "Hero Mini (Page Header)", origin: "SystemPage", component: HeroMini },
      { id: "breadcrumb-bar", name: "Breadcrumb Bar", origin: "SystemPage", component: BreadcrumbBar },
      { id: "not-found-block", name: "404 Not Found", origin: "NotFound", component: NotFoundBlock },
    ],
  },
  {
    title: "🎨 Preview Combos",
    blocks: [
      { id: "home-combo-a", name: "Home A — Luxury Editorial", origin: "Combo", component: HomeComboA },
      { id: "home-combo-b", name: "Home B — Classic Luxury", origin: "Combo", component: HomeComboB },
      { id: "home-combo-c", name: "Home C — Interactive Premium", origin: "Combo", component: HomeComboC },
      { id: "detail-combo-a", name: "Detail A — V6 Standard", origin: "Combo", component: DetailComboA },
      { id: "detail-combo-b", name: "Detail B — Classic V2", origin: "Combo", component: DetailComboB },
      { id: "detail-combo-c", name: "Detail C — Card Layout V4", origin: "Combo", component: DetailComboC },
      { id: "branded-combo", name: "Branded Residence Detail", origin: "Combo", component: BrandedCombo },
      { id: "newdev-combo", name: "New Development Detail", origin: "Combo", component: NewDevCombo },
      { id: "blog-combo", name: "Blog Listing + Detail", origin: "Combo", component: BlogCombo },
      { id: "contact-combo", name: "Contact Page", origin: "Combo", component: ContactCombo },
    ],
  },
];

const BlocksCatalog = () => {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();

  const filtered = useMemo(() => {
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      blocks: cat.blocks.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.origin.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.blocks.length > 0);
  }, [q]);

  const totalFiltered = filtered.reduce((acc, c) => acc + c.blocks.length, 0);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* Header */}
      <div className="bg-neutral-900 text-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-4">Omni47 Block Library</p>
          <h1 className="text-[36px] sm:text-[48px] font-extralight tracking-[-0.02em] mb-4">
            Catálogo de Bloques
          </h1>
          <p className="text-[15px] font-light text-white/50 max-w-xl leading-relaxed">
            Biblioteca completa de bloques visuales independientes extraídos del proyecto.
            Cada bloque funciona de forma aislada y acepta props configurables.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar bloque por nombre, id u origen…"
              className="w-full bg-white/10 backdrop-blur-sm text-[14px] font-light text-white placeholder:text-white/30 pl-11 pr-10 py-3 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-4 mt-5 text-[12px] tracking-[0.1em] text-white/30">
            <span>{filtered.length} categorías</span>
            <span>·</span>
            <span>{totalFiltered} bloques</span>
            {q && <span className="text-white/50">· buscando "{search}"</span>}
          </div>
          <div className="flex gap-3 mt-6">
            <Link to="/" className="text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 border border-white/20 text-white/60 hover:bg-white/10 transition-colors">
              Home Original
            </Link>
            <Link to="/home3" className="text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 border border-white/20 text-white/60 hover:bg-white/10 transition-colors">
              Home 3
            </Link>
            <Link to="/home4" className="text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 border border-white/20 text-white/60 hover:bg-white/10 transition-colors">
              Home 4
            </Link>
            <Link to="/portal" className="text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 border border-white/20 text-white/60 hover:bg-white/10 transition-colors">
              Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {q && totalFiltered === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-[15px] font-light">No se encontraron bloques para "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-4 text-[12px] tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-800 transition-colors">
              Limpiar búsqueda
            </button>
          </div>
        )}
        {filtered.map((cat) => (
          <div key={cat.title} className="mb-12">
            <h2 className="text-[22px] font-extralight mb-6 pb-3 border-b border-neutral-100">
              {cat.title}
              <span className="text-[13px] text-neutral-400 font-light ml-3">({cat.blocks.length} variantes)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.blocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
                  className="text-left p-5 border border-neutral-100 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
                >
                  <p className="text-[15px] font-light text-neutral-900 mb-1">{block.name}</p>
                  <p className="text-[11px] tracking-[0.1em] text-neutral-400 font-light">
                    Origen: {block.origin}
                  </p>
                  <p className="text-[11px] tracking-[0.05em] text-neutral-300 font-light mt-1 font-mono">
                    {block.id}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-3">
                    {expandedBlock === block.id ? "▲ Ocultar preview" : "▼ Mostrar preview"}
                  </p>
                </button>
              ))}
            </div>

            {/* Expanded preview */}
            {cat.blocks.map((block) =>
              expandedBlock === block.id ? (
                <div key={`preview-${block.id}`} className="mt-4 border border-neutral-200 overflow-hidden">
                  <div className="bg-neutral-50 px-5 py-3 flex items-center justify-between border-b border-neutral-200">
                    <span className="text-[12px] font-mono text-neutral-500">{block.id}</span>
                    <button onClick={() => setExpandedBlock(null)} className="text-[11px] text-neutral-400 hover:text-neutral-700">
                      Cerrar ✕
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <block.component />
                  </div>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlocksCatalog;
