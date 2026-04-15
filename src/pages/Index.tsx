import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { HighlightCards } from "@/components/HighlightCards";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import SelfDriveSection from "@/components/SelfDriveSection";
import ToursSection from "@/components/ToursSection";
import WhyUsSection from "@/components/WhyUsSection";
import AccommodationSection from "@/components/AccommodationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { KilimanjaroSection } from "@/components/KilimanjaroSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <IntroSection />
        <HighlightCards />
        <ServicesSection />
        {/* <SelfDriveSection /> */}
        <KilimanjaroSection />
        <ToursSection />
        <WhyUsSection />
        <AccommodationSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
