import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Satellite, Plane, Brain, BarChart3, Users, Truck, Upload, Globe } from "lucide-react"; // Added Upload and Globe for icons
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoinMission from "../components/JoinMission";

const workflowSteps = [
  {
    icon: Globe, // Represents global data sources
    title: "Data Acquisition",
    description: "Images and videos from satellites, drones, and user contributions are collected.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Upload, // Represents data being sent to the platform
    title: "Data Ingestion",
    description: "Collected visual data is securely uploaded to our platform for processing.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Brain, // Directly indicates the ML model
    title: "AI Processing & ML Model",
    description: "Our machine learning models analyze images and videos to detect and classify ocean waste.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: BarChart3, // Represents the dashboard and real-time updates
    title: "Real-time Dashboard & Hotspots",
    description: "Processed data updates our dashboard, highlighting real-time waste hotspots and insights.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Users, // Represents alerts to partners
    title: "Partner Alerts & Coordination",
    description: "NGOs and government partners receive immediate alerts with precise waste location data.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Truck, // Represents the final cleanup action
    title: "Coordinated Cleanup Missions",
    description: "Partners launch targeted cleanup operations based on AI-prioritized recommendations.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

const Workflow = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">How It Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered system combines cutting-edge technology with global collaboration
              to detect, track, and facilitate the cleanup of ocean waste.
            </p>
          </motion.div>

          {/* Workflow Steps */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${step.bgColor} flex items-center justify-center mb-4`}>
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>

                  {/* Arrow connector for desktop */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-4 z-10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-16"
            >
              <Card className="gradient-ocean text-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🛰️</div>
                      <h3 className="font-semibold mb-2">Satellite Network</h3>
                      <p className="text-sm text-gray-200">
                        Global coverage with high-resolution imaging and real-time monitoring capabilities
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🤖</div>
                      <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                      <p className="text-sm text-gray-200">
                        Advanced computer vision and deep learning models for waste detection and classification
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🌐</div>
                      <h3 className="font-semibold mb-2">Cloud Infrastructure</h3>
                      <p className="text-sm text-gray-200">
                        Scalable cloud computing for real-time data processing and global accessibility
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: "2.5M", label: "km² Ocean Monitored", icon: "🌊" },
                  { value: "847K", label: "Waste Objects Detected", icon: "🔍" },
                  { value: "156", label: "Cleanup Missions", icon: "🚛" },
                  { value: "23", label: "Partner Organizations", icon: "🤝" },
                ].map((metric, index) => (
                  <Card key={index} className="text-center p-6">
                    <div className="text-3xl mb-2">{metric.icon}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mb-16"
            >
              <Card className="p-8 gradient-coral text-white">
                <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-lg mb-6 text-gray-100">
                  Join our mission to clean the oceans through technology and collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                      View Dashboard
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="secondary" size="lg">
                      Become a Partner
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Join Our Mission Section */}
            <section id="contact">
              <JoinMission />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Workflow;