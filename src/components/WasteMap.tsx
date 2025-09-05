import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WasteLocation {
  id: string;
  lat: number;
  lng: number;
  wasteType: string;
  severity: 'low' | 'medium' | 'high';
  detected: string;
}

const mockWasteData: WasteLocation[] = [
  { id: '1', lat: 25.7617, lng: -80.1918, wasteType: 'Plastic bottles', severity: 'high', detected: '2024-01-15' },
  { id: '2', lat: 34.0522, lng: -118.2437, wasteType: 'Fishing nets', severity: 'medium', detected: '2024-01-14' },
  { id: '3', lat: 40.7128, lng: -74.0060, wasteType: 'Food containers', severity: 'low', detected: '2024-01-13' },
  { id: '4', lat: 51.5074, lng: -0.1278, wasteType: 'Chemical waste', severity: 'high', detected: '2024-01-12' },
  { id: '5', lat: 35.6762, lng: 139.6503, wasteType: 'Microplastics', severity: 'medium', detected: '2024-01-11' },
];

const WasteMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20, 0], 2);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add waste location markers
    mockWasteData.forEach((location) => {
      const color = location.severity === 'high' ? '#ef4444' : 
                   location.severity === 'medium' ? '#f59e0b' : '#22c55e';

      const marker = L.circleMarker([location.lat, location.lng], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${location.wasteType}</h3>
          <p class="text-xs text-gray-600">Severity: ${location.severity}</p>
          <p class="text-xs text-gray-600">Detected: ${location.detected}</p>
        </div>
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default WasteMap;