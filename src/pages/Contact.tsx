import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Building } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "hello@wavecleanup.org",
    description: "Get in touch for general inquiries"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (555) 123-4567",
    description: "Monday to Friday, 9 AM - 6 PM PST"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "1234 Ocean Drive, San Francisco, CA 94102",
    description: "Our headquarters by the bay"
  }
];

const partnershipTypes = [
  {
    icon: Users,
    title: "NGO Partnership",
    description: "Collaborate with us to coordinate cleanup efforts and receive real-time waste detection data."
  },
  {
    icon: Building,
    title: "Government Collaboration",
    description: "Partner with government agencies for large-scale ocean monitoring and policy development."
  },
  {
    icon: MessageCircle,
    title: "Research Partnership",
    description: "Academic institutions and researchers interested in marine conservation technology."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    type: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      organization: "",
      type: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Contact <span className="text-primary">Wave Cleanup</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to join our mission? Whether you're an NGO, government agency, researcher, 
              or individual supporter, we'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <info.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                  <p className="text-primary font-medium mb-2">{info.content}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Your organization name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Inquiry Type</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="ngo-partnership">NGO Partnership</option>
                        <option value="government-collaboration">Government Collaboration</option>
                        <option value="research-partnership">Research Partnership</option>
                        <option value="media-inquiry">Media Inquiry</option>
                        <option value="general-support">General Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how you'd like to get involved or what questions you have..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Partnership Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Partnership Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {partnershipTypes.map((type, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <type.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                        <p className="text-muted-foreground text-sm">{type.description}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-3">Why Partner With Us?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Access to real-time ocean waste detection data</li>
                      <li>• Coordinated cleanup efforts with global impact</li>
                      <li>• Advanced AI and satellite technology</li>
                      <li>• Proven track record with 23+ partner organizations</li>
                      <li>• Transparent reporting and impact metrics</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 gradient-ocean text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Make Waves?</h2>
              <p className="text-xl mb-6 text-gray-100">
                Join our global network of organizations working to clean our oceans.
              </p>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  View Our Dashboard
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;