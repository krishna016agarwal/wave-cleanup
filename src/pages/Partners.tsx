import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Globe, CheckCircle, Mail, Phone, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react"; // ⬅️ add at top of file
import Navigation from "@/components/Navigation";

const partners = [
  {
    name: "Ocean Conservancy",
    type: "NGO",
    logo: "🌊",
    description: "Leading marine conservation organization working to protect ocean ecosystems globally.",
    projects: 12,
    areas: ["Pacific", "Atlantic"],
  },
  {
    name: "UN Environment",
    type: "Government",
    logo: "🌍",
    description: "United Nations program coordinating international environmental protection efforts.",
    projects: 8,
    areas: ["Global"],
  },
  {
    name: "Greenpeace",
    type: "NGO",
    logo: "🐋",
    description: "Environmental activism organization focused on marine protection and waste reduction.",
    projects: 15,
    areas: ["Arctic", "Pacific"],
  },
  {
    name: "Marine Protection Agency",
    type: "Government",
    logo: "🏛️",
    description: "Federal agency responsible for marine ecosystem protection and restoration.",
    projects: 6,
    areas: ["Coastal US"],
  },
  {
    name: "WWF Ocean Program",
    type: "NGO",
    logo: "🐼",
    description: "World Wildlife Fund initiative for ocean conservation and sustainable fishing.",
    projects: 9,
    areas: ["Indian Ocean"],
  },
  {
    name: "EU Marine Strategy",
    type: "Government",
    logo: "🇪🇺",
    description: "European Union framework for marine environmental protection.",
    projects: 11,
    areas: ["Mediterranean", "North Sea"],
  },
];

const partnershipBenefits = [
  {
    icon: Globe,
    title: "Real-time Data Access",
    description: "Get instant access to waste detection data in your areas of operation."
  },
  {
    icon: Users,
    title: "Coordinated Response",
    description: "Coordinate cleanup efforts with other organizations for maximum impact."
  },
  {
    icon: CheckCircle,
    title: "Priority Alerts",
    description: "Receive priority notifications for critical waste concentrations."
  },
  {
    icon: Heart,
    title: "Impact Tracking",
    description: "Monitor and measure the environmental impact of your cleanup initiatives."
  },
];

const Partners = () => {
  const [formData, setFormData] = useState({
  organizationName: "",
  organizationType: "NGO",
  email: "",
  phoneNumber: "",
  primaryFocusAreas: "",
  organizationDescription: "",
  expectedUseCase: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:4000/api/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to submit");
    const data = await res.json();
    alert("✅ Application submitted successfully!");
    console.log("Saved org:", data);

    setFormData({
      organizationName: "",
      organizationType: "NGO",
      email: "",
      phoneNumber: "",
      primaryFocusAreas: "",
      organizationDescription: "",
      expectedUseCase: "",
    });
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong.");
  }
};
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
        <Navigation></Navigation>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Partner Organizations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Collaborating with NGOs and government agencies worldwide to create a cleaner, 
            healthier ocean ecosystem through technology and coordinated action.
          </p>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipBenefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="gradient-ocean w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Current Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Current Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{partner.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <Badge variant={partner.type === "NGO" ? "secondary" : "default"}>
                        {partner.type}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {partner.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Projects:</span>
                      <span className="font-medium">{partner.projects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Coverage Areas:</span>
                      <div className="flex gap-1">
                        {partner.areas.map((area, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
         <Card className="max-w-2xl mx-auto">
  <CardHeader className="text-center">
    <CardTitle className="text-2xl">Apply for Partnership</CardTitle>
    <CardDescription>
      Join our global network of organizations working to clean our oceans
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Name</label>
          <Input
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            placeholder="Enter organization name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Type</label>
          <select
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-background"
          >
            <option value="NGO">NGO</option>
            <option value="Government">Government</option>
            <option value="Corporate">Corporate</option>
            <option value="Startup">Startup</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@organization.org"
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Primary Focus Areas</label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="primaryFocusAreas"
            value={formData.primaryFocusAreas}
            onChange={handleChange}
            placeholder="e.g., Pacific Ocean, Coastal Cleanup, Marine Research"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Organization Description</label>
        <Textarea
          name="organizationDescription"
          value={formData.organizationDescription}
          onChange={handleChange}
          placeholder="Describe your organization's mission..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Expected Use Case</label>
        <Textarea
          name="expectedUseCase"
          value={formData.expectedUseCase}
          onChange={handleChange}
          placeholder="How do you plan to use our platform?"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full gradient-ocean text-white" size="lg">
        Submit Partnership Application
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Applications are typically reviewed within 5-7 business days.
        <br />
        For urgent requests, contact us directly at partners@oceanai.org
      </div>
    </form>
  </CardContent>
</Card>

        </motion.div>
      </div>
    </div>
  );
};

export default Partners;