import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JoinMission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to join our mission.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Thank you for joining our mission!",
      description: "We'll get back to you soon with more information about how you can help.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="join-mission-section" className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of the global movement to clean our oceans. Whether you're an individual, organization, or government, there's a role for you in our mission.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Mission Impact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">How You Can Help</h3>
            
            <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Individual Contributors</h4>
                  <p className="text-muted-foreground">
                    Join our citizen science program, participate in beach cleanups, or help fund cleanup missions through donations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Organizations & NGOs</h4>
                  <p className="text-muted-foreground">
                    Partner with us to amplify cleanup efforts, share resources, and coordinate large-scale ocean restoration projects.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Government Agencies</h4>
                  <p className="text-muted-foreground">
                    Collaborate on policy development, funding initiatives, and implementing AI-driven monitoring systems in your waters.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border border-border bg-card shadow-lg mt-14">
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Get Involved Today</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Textarea
                        name="message"
                        placeholder="Tell us how you'd like to contribute to ocean cleanup efforts..."
                        value={formData.message}
                        onChange={handleChange}
                        className="pl-10 min-h-[120px] resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300">
                      Join the Mission
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-green-100 text-green-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will get back to you soon with information about how you can contribute to our ocean cleanup mission.
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinMission;