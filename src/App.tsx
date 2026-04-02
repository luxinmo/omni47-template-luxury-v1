import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home2LandingPage from "./components/home-2/Home2LandingPage";
import LuxuryPropertyListing from "./components/luxury/LuxuryPropertyListing";
import LuxuryPropertyListingV2 from "./components/luxury/LuxuryPropertyListingV2";
import LuxuryPropertyListingV3 from "./components/luxury/LuxuryPropertyListingV3";
import BlogListingPage from "./components/luxury/BlogListingPage";
import BlogDetailPage from "./components/luxury/BlogDetailPage";
import SystemPage from "./components/luxury/SystemPage";
import SystemPageV2 from "./components/luxury/SystemPageV2";
import ContactPage from "./components/luxury/ContactPage";
import ContactPageV2 from "./components/luxury/ContactPageV2";
import PropertyDetailV2 from "./components/luxury/PropertyDetailV2";
import PropertyDetailV3 from "./components/luxury/PropertyDetailV3";
import PropertyDetailV4 from "./components/luxury/PropertyDetailV4";
import PropertyDetailV5 from "./components/luxury/PropertyDetailV5";
import PropertyDetailV6 from "./components/luxury/PropertyDetailV6";
import PropertyDetailV7 from "./components/luxury/PropertyDetailV7";
import NotFound from "./pages/NotFound";
import HomePortal from "./pages/HomePortal";
import Home3LandingPage from "./components/home-3/Home3LandingPage";
import Home4LandingPage from "./components/home-4/Home4LandingPage";
import BrandedResidencesPage from "./components/luxury/BrandedResidencesPage";
import BrandedResidenceDetailPage from "./components/luxury/BrandedResidenceDetailPage";
import NewDevelopmentsPage from "./components/luxury/NewDevelopmentsPage";
import NewDevelopmentsPageV2 from "./components/luxury/NewDevelopmentsPageV2";
import NewDevelopmentDetailPage from "./components/luxury/NewDevelopmentDetailPage";
import NewDevelopmentDetailPageV2 from "./components/luxury/NewDevelopmentDetailPageV2";
import PropertyPdfV1 from "./components/pdf/PropertyPdfV1";
import PropertyPdfV2 from "./components/pdf/PropertyPdfV2";
import PropertyPdfV3 from "./components/pdf/PropertyPdfV3";
import BlocksCatalog from "./pages/BlocksCatalog";
import FavoritesPage from "./components/luxury/FavoritesPage";
import SellPropertyPage from "./components/luxury/SellPropertyPage";
import UserDashboardPage from "./components/luxury/UserDashboardPage";
import VideosPage from "./components/luxury/VideosPage";
import VideosPageV2 from "./components/luxury/VideosPageV2";
import VideosPageV3 from "./components/luxury/VideosPageV3";
import OffmarketEmailPreviewPage from "./components/blocks/offmarket/OffmarketEmailTemplate";
import EnquiryEmailPreviewPage from "./components/blocks/email/EnquiryConfirmationEmail";
import PriceAlertEmailPreviewPage from "./components/blocks/email/PriceAlertEmail";
import NewsletterEmailPreviewPage from "./components/blocks/email/NewsletterEmail";
import ResourcesHubPage from "./components/luxury/ResourcesHubPage";
import AboutPage from "./components/luxury/AboutPage";
import AboutPageV2 from "./components/luxury/AboutPageV2";
import AboutPageV3 from "./components/luxury/AboutPageV3";
import AboutPageV4 from "./components/luxury/AboutPageV4";
import AboutPageV5 from "./components/luxury/AboutPageV5";
import OurOfficesPage from "./components/luxury/OurOfficesPage";
import IconsPage from "./pages/IconsPage";
import ChatbotDesignShowcase from "./components/luxury/ChatbotDesignShowcase";
import TeamPage from "./components/luxury/TeamPage";
import MunicipalityPage from "./components/luxury/MunicipalityPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ── Blocks Catalog (main entry) ── */}
            <Route path="/blocks" element={<BlocksCatalog />} />

            {/* ── Original pages (kept for reference) ── */}
            <Route path="/" element={<Home2LandingPage />} />
            <Route path="/portal" element={<HomePortal />} />
            <Route path="/home3" element={<Home3LandingPage />} />
            <Route path="/home4" element={<Home4LandingPage />} />
            <Route path="/properties" element={<LuxuryPropertyListing />} />
            <Route path="/properties2" element={<LuxuryPropertyListingV2 />} />
            <Route path="/properties3" element={<LuxuryPropertyListingV3 />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/page/:slug" element={<SystemPage />} />
            <Route path="/page2/:slug" element={<SystemPageV2 />} />
            
            <Route path="/property2/:id" element={<PropertyDetailV2 />} />
            <Route path="/property3/:id" element={<PropertyDetailV3 />} />
            <Route path="/property4/:id" element={<PropertyDetailV4 />} />
            <Route path="/property5/:id" element={<PropertyDetailV5 />} />
            <Route path="/property6/:id" element={<PropertyDetailV6 />} />
            <Route path="/property7/:id" element={<PropertyDetailV7 />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/sell" element={<SellPropertyPage />} />
            <Route path="/my-account" element={<UserDashboardPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/videos2" element={<VideosPageV2 />} />
            <Route path="/videos3" element={<VideosPageV3 />} />
            <Route path="/contact2" element={<ContactPageV2 />} />
            <Route path="/branded-residences" element={<BrandedResidencesPage />} />
            
            <Route path="/branded-residences/:slug" element={<BrandedResidenceDetailPage />} />
            <Route path="/new-developments" element={<NewDevelopmentsPage />} />
            <Route path="/new-developments2" element={<NewDevelopmentsPageV2 />} />
            
            <Route path="/new-developments/:slug" element={<NewDevelopmentDetailPage />} />
            <Route path="/new-developments2/:slug" element={<NewDevelopmentDetailPageV2 />} />
            <Route path="/pdf-v1" element={<PropertyPdfV1 />} />
            <Route path="/pdf-v2" element={<PropertyPdfV2 />} />
            <Route path="/pdf-v3" element={<PropertyPdfV3 />} />
            <Route path="/resources" element={<ResourcesHubPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about2" element={<AboutPageV2 />} />
            <Route path="/about3" element={<AboutPageV3 />} />
            <Route path="/about4" element={<AboutPageV4 />} />
            <Route path="/about5" element={<AboutPageV5 />} />
            <Route path="/our-offices" element={<OurOfficesPage />} />
            <Route path="/email-offmarket" element={<OffmarketEmailPreviewPage />} />
            <Route path="/email-enquiry" element={<EnquiryEmailPreviewPage />} />
            <Route path="/email-alert" element={<PriceAlertEmailPreviewPage />} />
            <Route path="/email-newsletter" element={<NewsletterEmailPreviewPage />} />
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/chatbot-design" element={<ChatbotDesignShowcase />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/municipality/:slug" element={<MunicipalityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
