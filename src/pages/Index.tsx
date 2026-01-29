import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Lazy load heavy sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const FleetSection = lazy(() => import("@/components/FleetSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AdvantagesSection = lazy(() => import("@/components/AdvantagesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Loader = () => (
  <div className="py-20 flex justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      <Suspense fallback={<Loader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <FleetSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <AdvantagesSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <ContactSection />
      </Suspense>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;