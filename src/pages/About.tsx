import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Target, Globe, Award, Heart, Lightbulb } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Marina Chen",
    role: "CEO & Marine Biologist",
    image: "👩‍🔬",
    bio: "15+ years in marine conservation and AI research."
  },
  {
    name: "Alex Rodriguez",
    role: "CTO & AI Engineer",
    image: "👨‍💻",
    bio: "Former SpaceX engineer specializing in satellite technology."
  },
  {
    name: "Sarah Kim",
    role: "Head of Partnerships",
    image: "👩‍💼",
    bio: "Expert in NGO collaboration and environmental policy."
  },
  {
    name: "Dr. James Wilson",
    role: "Lead Data Scientist",
    image: "👨‍🔬",
    bio: "PhD in Computer Vision with focus on environmental applications."
  }
];

const impactStats = [
  { value: "2.5M", label: "km² Ocean Monitored", icon: Globe },
  { value: "847K", label: "Waste Objects Detected", icon: Target },
  { value: "156", label: "Cleanup Missions Coordinated", icon: Award },
  { value: "23", label: "Partner Organizations", icon: Users }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">Wave Cleanup</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to protect our oceans using cutting-edge AI technology, 
              satellite monitoring, and global collaboration to detect and eliminate marine waste.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20"
          >
            <Card className="gradient-ocean text-white p-8">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-6 text-white" />
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                  Every minute, the equivalent of a garbage truck full of plastic enters our oceans. 
                  We believe technology can be the solution. Through AI-powered detection, real-time monitoring, 
                  and coordinated global response, we're working to turn the tide on ocean pollution.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* How We Started */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Lightbulb className="h-12 w-12 text-primary mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-6">How We Started</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Founded in 2023 by a team of marine biologists, AI researchers, and environmental activists, 
                  Wave Cleanup emerged from a simple observation: while ocean pollution was a global crisis, 
                  our response was fragmented and reactive.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We envisioned a world where AI could detect pollution in real-time, satellites could track 
                  waste patterns globally, and drones could provide detailed analysis—all coordinated through 
                  a single platform that connects NGOs, governments, and cleanup organizations worldwide.
                </p>
              </div>
              <div className="text-6xl text-center">🌊</div>
            </div>
          </motion.div>

          {/* Impact Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Card className="p-8 gradient-coral text-white">
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl mb-8 text-gray-100">
                Together, we can create a cleaner, healthier ocean for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    Get Involved
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;