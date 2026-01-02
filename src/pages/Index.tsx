import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HorizontalScrollGallery from "@/components/home/HorizontalScrollGallery";
import AboutPreview from "@/components/home/AboutPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HorizontalScrollGallery />
        <ServicesSection />
        <AboutPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
