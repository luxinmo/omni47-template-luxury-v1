import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2LandingPage from "./components/home-2/Home2LandingPage";
import LuxuryPropertyListing from "./components/luxury/LuxuryPropertyListing";
import BlogListingPage from "./components/luxury/BlogListingPage";
import BlogDetailPage from "./components/luxury/BlogDetailPage";
import SystemPage from "./components/luxury/SystemPage";
import ContactPage from "./components/luxury/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home2LandingPage />} />
          <Route path="/properties" element={<LuxuryPropertyListing />} />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/page/:slug" element={<SystemPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
