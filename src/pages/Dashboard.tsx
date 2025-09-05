import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import WasteMap from "@/components/WasteMap";
import { Waves, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const wasteTypeData = [
  { name: "Plastic", value: 45, color: "#ef4444" },
  { name: "Glass", value: 23, color: "#3b82f6" },
  { name: "Metal", value: 18, color: "#f59e0b" },
  { name: "Organic", value: 14, color: "#22c55e" },
];

const monthlyDetections = [
  { month: "Jan", detections: 1240 },
  { month: "Feb", detections: 1680 },
  { month: "Mar", detections: 2100 },
  { month: "Apr", detections: 1890 },
  { month: "May", detections: 2340 },
  { month: "Jun", detections: 2800 },
];

const regionData = [
  { region: "Pacific", waste: 4200 },
  { region: "Atlantic", waste: 3100 },
  { region: "Indian", waste: 2800 },
  { region: "Arctic", waste: 890 },
  { region: "Antarctic", waste: 650 },
];

const chartConfig = {
  detections: {
    label: "Detections",
    color: "hsl(var(--primary))",
  },
  waste: {
    label: "Waste Count",
    color: "hsl(var(--accent))",
  },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Ocean Waste Detection Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of ocean waste across global waters</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="gradient-ocean text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Waste Detected</CardTitle>
              <Waves className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847,329</div>
              <p className="text-xs text-gray-200">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Areas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Requiring immediate action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drones</CardTitle>
              <MapPin className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Monitoring ocean areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cleanup Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Waste Detection Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-[500px]">
              <CardHeader>
                <CardTitle>Global Waste Hotspots</CardTitle>
                <CardDescription>Real-time waste detection locations</CardDescription>
              </CardHeader>
              <CardContent className="h-full pb-4">
                <WasteMap />
              </CardContent>
            </Card>
          </motion.div>

          {/* Waste Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-[500px]">
              <CardHeader>
                <CardTitle>Waste Type Distribution</CardTitle>
                <CardDescription>Breakdown by material type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {wasteTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trends and Regional Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Detection Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Detection Trends</CardTitle>
                <CardDescription>Monthly waste detection counts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyDetections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="detections" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regional Waste Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Waste count by ocean region</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="waste" 
                        fill="hsl(var(--accent))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Live Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Detections</CardTitle>
              <CardDescription>Latest waste detection alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 min ago", location: "Pacific Ocean (25.7617°N, 80.1918°W)", type: "Plastic bottles", severity: "high" },
                  { time: "8 min ago", location: "Atlantic Ocean (34.0522°N, 118.2437°W)", type: "Fishing nets", severity: "medium" },
                  { time: "15 min ago", location: "Indian Ocean (40.7128°N, 74.0060°W)", type: "Food containers", severity: "low" },
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{alert.type} detected</div>
                      <div className="text-sm text-muted-foreground">{alert.location}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                    <Badge variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "default"}>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;