import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import JoinMission from "@/components/JoinMission";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InteractiveMap />
      <JoinMission />
      <Footer />
    </div>
  );
};

export default Index;
