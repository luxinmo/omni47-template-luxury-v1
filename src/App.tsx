import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home2LandingPage from "./components/home-2/Home2LandingPage";
import LuxuryPropertyListing from "./components/luxury/LuxuryPropertyListing";
import BlogListingPage from "./components/luxury/BlogListingPage";
import BlogDetailPage from "./components/luxury/BlogDetailPage";
import SystemPage from "./components/luxury/SystemPage";
import ContactPage from "./components/luxury/ContactPage";
import PropertyDetailPage from "./components/luxury/PropertyDetailPage";
import PropertyDetailV2 from "./components/luxury/PropertyDetailV2";
import PropertyDetailV3 from "./components/luxury/PropertyDetailV3";
import PropertyDetailV4 from "./components/luxury/PropertyDetailV4";
import PropertyDetailV5 from "./components/luxury/PropertyDetailV5";
import PropertyDetailV6 from "./components/luxury/PropertyDetailV6";
import NotFound from "./pages/NotFound";
import HomePortal from "./pages/HomePortal";
import PropertyPdfV1 from "./components/pdf/PropertyPdfV1";
import PropertyPdfV2 from "./components/pdf/PropertyPdfV2";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home2LandingPage />} />
            <Route path="/portal" element={<HomePortal />} />
            <Route path="/properties" element={<LuxuryPropertyListing />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/page/:slug" element={<SystemPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/property2/:id" element={<PropertyDetailV2 />} />
            <Route path="/property3/:id" element={<PropertyDetailV3 />} />
            <Route path="/property4/:id" element={<PropertyDetailV4 />} />
            <Route path="/property5/:id" element={<PropertyDetailV5 />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pdf-v1" element={<PropertyPdfV1 />} />
            <Route path="/pdf-v2" element={<PropertyPdfV2 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
