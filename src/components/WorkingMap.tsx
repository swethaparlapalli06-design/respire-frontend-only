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
      // Add traffic segments as colored DOTS/CIRCLES
      L.circleMarker([17.3850, 78.4867], {
        radius: 12,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 75%</p>
          <p><strong>Coordinates:</strong> 17.3850°N, 78.4867°E</p>
          <p><strong>Address:</strong> Abids Junction, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      L.circleMarker([17.3800, 78.4800], {
        radius: 12,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 45%</p>
          <p><strong>Coordinates:</strong> 17.3800°N, 78.4800°E</p>
          <p><strong>Address:</strong> Charminar Area, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      L.circleMarker([17.3900, 78.4800], {
        radius: 12,
        fillColor: 'green',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 25%</p>
          <p><strong>Coordinates:</strong> 17.3900°N, 78.4800°E</p>
          <p><strong>Address:</strong> Kukatpally Road, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // Add MORE traffic dots scattered around
      L.circleMarker([17.3750, 78.4750], {
        radius: 10,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('High Congestion - 80%').addTo(markersRef.current);

      L.circleMarker([17.3950, 78.4950], {
        radius: 10,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('Medium Congestion - 50%').addTo(markersRef.current);

      L.circleMarker([17.3700, 78.4900], {
        radius: 10,
        fillColor: 'green',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('Low Congestion - 20%').addTo(markersRef.current);

      L.circleMarker([17.4000, 78.4700], {
        radius: 10,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('High Congestion - 85%').addTo(markersRef.current);

      L.circleMarker([17.3650, 78.4850], {
        radius: 10,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('Medium Congestion - 60%').addTo(markersRef.current);

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
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Abids Junction</strong></h3>
          <p><strong>Station Code:</strong> HYD_ABD_001</p>
          <p><strong>AQI:</strong> 180</p>
          <p><strong>PM2.5:</strong> 85 μg/m³</p>
          <p><strong>PM10:</strong> 120 μg/m³</p>
          <p><strong>NO₂:</strong> 45 ppb</p>
          <p><strong>Coordinates:</strong> 17.3850°N, 78.4867°E</p>
          <p><strong>Address:</strong> Abids Junction, Hyderabad, Telangana 500001</p>
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
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Charminar</strong></h3>
          <p><strong>Station Code:</strong> HYD_CHM_002</p>
          <p><strong>AQI:</strong> 220</p>
          <p><strong>PM2.5:</strong> 105 μg/m³</p>
          <p><strong>PM10:</strong> 150 μg/m³</p>
          <p><strong>NO₂:</strong> 55 ppb</p>
          <p><strong>Coordinates:</strong> 17.3800°N, 78.4800°E</p>
          <p><strong>Address:</strong> Charminar Area, Hyderabad, Telangana 500002</p>
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
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Kukatpally Road</strong></h3>
          <p><strong>Station Code:</strong> HYD_KUK_003</p>
          <p><strong>AQI:</strong> 160</p>
          <p><strong>PM2.5:</strong> 75 μg/m³</p>
          <p><strong>PM10:</strong> 110 μg/m³</p>
          <p><strong>NO₂:</strong> 40 ppb</p>
          <p><strong>Coordinates:</strong> 17.3900°N, 78.4800°E</p>
          <p><strong>Address:</strong> Kukatpally Road, Hyderabad, Telangana 500003</p>
        </div>
      `).addTo(markersRef.current);

      // Add MORE pollution dots scattered around
      L.circleMarker([17.3750, 78.4750], {
        radius: 12,
        fillColor: 'purple',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('AQI: 320 - Hazardous').addTo(markersRef.current);

      L.circleMarker([17.3950, 78.4950], {
        radius: 12,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('AQI: 250 - Very Unhealthy').addTo(markersRef.current);

      L.circleMarker([17.3700, 78.4900], {
        radius: 12,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('AQI: 180 - Unhealthy').addTo(markersRef.current);

      L.circleMarker([17.4000, 78.4700], {
        radius: 12,
        fillColor: 'yellow',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('AQI: 120 - Unhealthy for Sensitive').addTo(markersRef.current);

      L.circleMarker([17.3650, 78.4850], {
        radius: 12,
        fillColor: 'lightgreen',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup('AQI: 80 - Moderate').addTo(markersRef.current);

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
