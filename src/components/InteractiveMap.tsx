import React, { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WasteHotspot {
  id: string;
  name: string;
  coordinates: [number, number];
  severity: 'high' | 'medium' | 'low';
  wasteDetected: string;
  cleanupMissions: number;
  localPartners: string[];
  lastDetection: string;
}

const mockHotspots: WasteHotspot[] = [
  {
    id: '1',
    name: 'Great Pacific Garbage Patch',
    coordinates: [-140, 35],
    severity: 'high',
    wasteDetected: '80,000 tons',
    cleanupMissions: 12,
    localPartners: ['Ocean Cleanup', 'Greenpeace', 'Surfrider Foundation'],
    lastDetection: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mediterranean Sea',
    coordinates: [15, 40],
    severity: 'medium',
    wasteDetected: '12,500 tons',
    cleanupMissions: 8,
    localPartners: ['Mediterranean SOS', 'WWF'],
    lastDetection: '2024-01-10'
  },
  {
    id: '3',
    name: 'Caribbean Basin',
    coordinates: [-70, 18],
    severity: 'high',
    wasteDetected: '25,000 tons',
    cleanupMissions: 15,
    localPartners: ['Caribbean Environment Programme', 'Ocean Conservancy'],
    lastDetection: '2024-01-12'
  },
  {
    id: '4',
    name: 'Bay of Bengal',
    coordinates: [90, 20],
    severity: 'medium',
    wasteDetected: '18,700 tons',
    cleanupMissions: 6,
    localPartners: ['Blue Economy Bangladesh', 'Marine Life Alliance'],
    lastDetection: '2024-01-08'
  },
  {
    id: '5',
    name: 'North Sea',
    coordinates: [4, 56],
    severity: 'low',
    wasteDetected: '5,200 tons',
    cleanupMissions: 4,
    localPartners: ['North Sea Foundation', 'Marine Conservation Society'],
    lastDetection: '2024-01-14'
  }
];

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<WasteHotspot | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Global Ocean Waste Monitoring
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time tracking of ocean waste hotspots and cleanup operations worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="p-6 bg-card border border-border shadow-lg">
            <div className="relative">
              {/* World Map Background */}
              <div 
                ref={mapRef}
                className="w-full h-96 bg-gradient-to-br from-primary/10 to-accent/20 rounded-lg relative overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23e2e8f0' d='M150 100 L200 80 L280 120 L350 100 L400 110 L480 90 L520 100 L600 120 L680 100 L750 110 L800 90 L850 100 L150 100 Z M200 200 L250 180 L320 220 L400 200 L450 210 L530 190 L570 200 L650 220 L720 200 L800 210 L850 190 L900 200 L200 200 Z M100 300 L150 280 L230 320 L300 300 L350 310 L430 290 L470 300 L550 320 L630 300 L700 310 L750 290 L800 300 L100 300 Z'/%3E%3C/svg%3E")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Hotspot Markers */}
                {mockHotspots.map((hotspot, index) => (
                  <motion.div
                    key={hotspot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((hotspot.coordinates[0] + 180) / 360) * 100}%`,
                      top: `${((90 - hotspot.coordinates[1]) / 180) * 100}%`
                    }}
                    onClick={() => setSelectedHotspot(hotspot)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getSeverityColor(hotspot.severity)} animate-pulse`}>
                      <div className={`w-6 h-6 rounded-full ${getSeverityColor(hotspot.severity)} opacity-30 animate-ping absolute -top-1 -left-1`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                <h4 className="font-semibold text-sm mb-2">Severity Levels</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Hotspot Details Modal */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedHotspot(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-background rounded-lg p-6 max-w-md w-full border border-border shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedHotspot.name}</h3>
                    <Badge className={`mt-2 ${getSeverityBadgeColor(selectedHotspot.severity)}`}>
                      {selectedHotspot.severity.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Waste Detected</p>
                      <p className="text-sm text-muted-foreground">{selectedHotspot.wasteDetected}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Cleanup Missions</p>
                      <p className="text-sm text-muted-foreground">{selectedHotspot.cleanupMissions} completed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Local Partners</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedHotspot.localPartners.map((partner, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Last detection: {new Date(selectedHotspot.lastDetection).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveMap;