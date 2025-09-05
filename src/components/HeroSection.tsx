import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import oceanHero from "@/assets/ocean-hero.jpg";

const HeroSection = () => {
  return (
    <div>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={oceanHero}
          alt="Ocean underwater scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Harnessing AI, Drones & Satellites for{" "}
            <span className="gradient-coral bg-clip-text text-transparent">
              a Cleaner Ocean
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
          >
            Real-time monitoring and cleanup powered by advanced technology. Together with global communities, we fight ocean pollution for a sustainable future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300">
                Explore Waste Zones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              id="join-mission"
              onClick={() => {
                const element = document.getElementById('join-mission-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Join Our Mission
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { label: "Ocean Areas Monitored", value: "2.5M km²", icon: "🌊" },
            { label: "Waste Objects Detected", value: "847K", icon: "🔍" },
            { label: "Cleanup Missions", value: "156", icon: "🚛" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-full h-16 animate-wave"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
    </section>
    </div>
  );
};

export default HeroSection;