import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WorkingMapProps {
  type: 'traffic' | 'pollution';
}

const WorkingMap: React.FC<WorkingMapProps> = ({ type }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    // Create map immediately
    if (!mapRef.current) {
      mapRef.current = L.map('map-container').setView([17.3850, 78.4867], 12);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      
      // Create markers group
      markersRef.current = L.layerGroup().addTo(mapRef.current);
      
      console.log('Map created successfully');
    }

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.clearLayers();
    }

    // Add test markers immediately
    addTestData();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [type]);

  const addTestData = () => {
    if (!markersRef.current) return;

    console.log('Adding test data...');

    if (type === 'traffic') {
      // Add traffic segments as colored lines
      const segment1 = L.polyline([
        [17.3850, 78.4867],
        [17.3900, 78.4900]
      ], {
        color: 'red',
        weight: 6,
        opacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment 1</strong></h3>
          <p><strong>Congestion:</strong> 75%</p>
          <p><strong>Speed:</strong> 15 km/h</p>
          <p><strong>Road Type:</strong> Major</p>
        </div>
      `).addTo(markersRef.current);

      const segment2 = L.polyline([
        [17.3800, 78.4800],
        [17.3850, 78.4850]
      ], {
        color: 'orange',
        weight: 6,
        opacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment 2</strong></h3>
          <p><strong>Congestion:</strong> 45%</p>
          <p><strong>Speed:</strong> 35 km/h</p>
          <p><strong>Road Type:</strong> Arterial</p>
        </div>
      `).addTo(markersRef.current);

      const segment3 = L.polyline([
        [17.3900, 78.4800],
        [17.3950, 78.4850]
      ], {
        color: 'green',
        weight: 6,
        opacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment 3</strong></h3>
          <p><strong>Congestion:</strong> 25%</p>
          <p><strong>Speed:</strong> 45 km/h</p>
          <p><strong>Road Type:</strong> Local</p>
        </div>
      `).addTo(markersRef.current);

      // Add incident markers
      L.marker([17.3850, 78.4867])
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3><strong>Traffic Incident</strong></h3>
            <p><strong>Type:</strong> Accident</p>
            <p><strong>Severity:</strong> High</p>
            <p><strong>Description:</strong> Vehicle collision blocking traffic</p>
          </div>
        `).addTo(markersRef.current);

      L.marker([17.3800, 78.4800])
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3><strong>Traffic Incident</strong></h3>
            <p><strong>Type:</strong> Construction</p>
            <p><strong>Severity:</strong> Medium</p>
            <p><strong>Description:</strong> Road construction in progress</p>
          </div>
        `).addTo(markersRef.current);

      console.log('Added 3 traffic segments and 2 incidents');

    } else if (type === 'pollution') {
      // Add AQI stations as colored circles
      L.circleMarker([17.3850, 78.4867], {
        radius: 15,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Abids Road</strong></h3>
          <p><strong>AQI:</strong> 180</p>
          <p><strong>PM2.5:</strong> 85 μg/m³</p>
          <p><strong>Status:</strong> Unhealthy</p>
        </div>
      `).addTo(markersRef.current);

      L.circleMarker([17.3800, 78.4800], {
        radius: 15,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Charminar</strong></h3>
          <p><strong>AQI:</strong> 220</p>
          <p><strong>PM2.5:</strong> 105 μg/m³</p>
          <p><strong>Status:</strong> Very Unhealthy</p>
        </div>
      `).addTo(markersRef.current);

      L.circleMarker([17.3900, 78.4800], {
        radius: 15,
        fillColor: 'yellow',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Kukatpally Road</strong></h3>
          <p><strong>AQI:</strong> 160</p>
          <p><strong>PM2.5:</strong> 75 μg/m³</p>
          <p><strong>Status:</strong> Unhealthy</p>
        </div>
      `).addTo(markersRef.current);

      console.log('Added 3 AQI stations');
    }
  };

  return (
    <div className="relative w-full h-full">
      <div id="map-container" className="w-full h-full"></div>
      {!mapRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-lg font-semibold text-gray-600">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default WorkingMap;
