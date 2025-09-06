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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to join our mission.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await res.json();
      console.log("✅ User saved:", data);

      setIsSubmitted(true);
      toast({
        title: "Thank you for joining our mission!",
        description: "We'll get back to you soon with more information.",
      });

      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Unable to submit your details. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="join-mission-section" className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Join the Movement</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join Our <span className="gradient-text">Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
            
            {/* Card 1 */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 border border-border bg-card hover:shadow-xl transition-all duration-300 hover:border-primary/20 group">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <User className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Individual Contributors</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Join our citizen science program, participate in beach cleanups, or help fund cleanup missions through donations.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Card 2 */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 border border-border bg-card hover:shadow-xl transition-all duration-300 hover:border-accent/20 group">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="bg-accent/10 p-4 rounded-xl group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Organizations & NGOs</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Partner with us to amplify cleanup efforts, share resources, and coordinate large-scale ocean restoration projects.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Card 3 */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 border border-border bg-card hover:shadow-xl transition-all duration-300 hover:border-secondary/20 group">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="bg-secondary/10 p-4 rounded-xl group-hover:bg-secondary/20 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">Government Agencies</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Collaborate on policy development, funding initiatives, and implementing AI-driven monitoring systems in your waters.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="p-8 border border-border bg-card shadow-xl hover:shadow-2xl transition-all duration-300 mt-14 group">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-foreground mb-2">Get Involved Today</h3>
                      <p className="text-muted-foreground">Join thousands of people making a difference</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 h-12 border-2 focus:border-primary transition-colors duration-300"
                          required
                        />
                      </motion.div>

                      <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 h-12 border-2 focus:border-primary transition-colors duration-300"
                          required
                        />
                      </motion.div>

                      <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <Textarea
                          name="message"
                          placeholder="Tell us how you'd like to contribute to ocean cleanup efforts..."
                          value={formData.message}
                          onChange={handleChange}
                          className="pl-10 min-h-[120px] resize-none border-2 focus:border-primary transition-colors duration-300"
                          required
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          type="submit" 
                          disabled={loading}
                          className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                        >
                          {loading ? "Submitting..." : "Join the Mission"}
                        </Button>
                      </motion.div>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <CheckCircle className="h-10 w-10" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">Thank You!</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      We've received your message and will get back to you soon with information about how you can contribute to our ocean cleanup mission.
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinMission;
