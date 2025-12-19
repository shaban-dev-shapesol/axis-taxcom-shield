import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Investigations from "./pages/Investigations";
import CaseStudies from "./pages/CaseStudies";
import Team from "./pages/Team";
import PreCompliance from "./pages/PreCompliance";
import GetStarted from "./pages/GetStarted";
import Book from "./pages/Book";
import HowItWorks from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataSecurity from "./pages/DataSecurity";
import About from "./pages/About";
import Thanks from "./pages/Thanks";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import PlayAudio from "./pages/PlayAudio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/team" element={<Team />} />
          <Route path="/pre-compliance" element={<PreCompliance />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/book" element={<Book />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/data-security" element={<DataSecurity />} />
          <Route path="/about" element={<About />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/play-audio" element={<PlayAudio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
