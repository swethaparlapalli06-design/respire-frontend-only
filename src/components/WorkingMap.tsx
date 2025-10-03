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
      mapRef.current = L.map('map-container', {
        center: [17.3850, 78.4867],
        zoom: 12,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        boxZoom: true,
        keyboard: true,
        zoomControl: true
      });
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      
      // Create markers group
      markersRef.current = L.layerGroup().addTo(mapRef.current);
      
      // Ensure map is fully interactive
      mapRef.current.dragging.enable();
      mapRef.current.touchZoom.enable();
      mapRef.current.doubleClickZoom.enable();
      mapRef.current.scrollWheelZoom.enable();
      mapRef.current.boxZoom.enable();
      mapRef.current.keyboard.enable();
      
      console.log('Map created successfully with full interactivity');
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

      // Add MORE traffic dots scattered across ALL of Hyderabad
      // North Hyderabad
      L.circleMarker([17.4500, 78.3500], {
        radius: 10,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 80%</p>
          <p><strong>Coordinates:</strong> 17.4500°N, 78.3500°E</p>
          <p><strong>Address:</strong> Secunderabad Railway Station, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // West Hyderabad - HITECH City
      L.circleMarker([17.4400, 78.3500], {
        radius: 10,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 50%</p>
          <p><strong>Coordinates:</strong> 17.4400°N, 78.3500°E</p>
          <p><strong>Address:</strong> HITECH City, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // South Hyderabad
      L.circleMarker([17.3200, 78.4500], {
        radius: 10,
        fillColor: 'green',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 20%</p>
          <p><strong>Coordinates:</strong> 17.3200°N, 78.4500°E</p>
          <p><strong>Address:</strong> Mehdipatnam Area, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // East Hyderabad
      L.circleMarker([17.4000, 78.6000], {
        radius: 10,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 85%</p>
          <p><strong>Coordinates:</strong> 17.4000°N, 78.6000°E</p>
          <p><strong>Address:</strong> Uppal Area, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // Central Hyderabad
      L.circleMarker([17.3600, 78.4800], {
        radius: 10,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 60%</p>
          <p><strong>Coordinates:</strong> 17.3600°N, 78.4800°E</p>
          <p><strong>Address:</strong> Malakpet Area, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // North-West Hyderabad
      L.circleMarker([17.4200, 78.3800], {
        radius: 10,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 70%</p>
          <p><strong>Coordinates:</strong> 17.4200°N, 78.3800°E</p>
          <p><strong>Address:</strong> Jubilee Hills Area, Hyderabad</p>
        </div>
      `).addTo(markersRef.current);

      // South-East Hyderabad
      L.circleMarker([17.3300, 78.5500], {
        radius: 10,
        fillColor: 'green',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 200px;">
          <h3><strong>Traffic Segment</strong></h3>
          <p><strong>Congestion:</strong> 30%</p>
          <p><strong>Coordinates:</strong> 17.3300°N, 78.5500°E</p>
          <p><strong>Address:</strong> Vanasthalipuram Area, Hyderabad</p>
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

      // Add MORE CPCB pollution stations scattered across ALL of Hyderabad
      // North Hyderabad - Secunderabad
      L.circleMarker([17.4500, 78.3500], {
        radius: 12,
        fillColor: 'purple',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Secunderabad Railway</strong></h3>
          <p><strong>Station Code:</strong> HYD_SEC_004</p>
          <p><strong>AQI:</strong> 320</p>
          <p><strong>PM2.5:</strong> 165 μg/m³</p>
          <p><strong>PM10:</strong> 200 μg/m³</p>
          <p><strong>NO₂:</strong> 65 ppb</p>
          <p><strong>Coordinates:</strong> 17.4500°N, 78.3500°E</p>
          <p><strong>Address:</strong> Secunderabad Railway Station, Hyderabad, Telangana 500003</p>
        </div>
      `).addTo(markersRef.current);

      // West Hyderabad - HITECH City
      L.circleMarker([17.4400, 78.3500], {
        radius: 12,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - HITECH City</strong></h3>
          <p><strong>Station Code:</strong> HYD_HTC_005</p>
          <p><strong>AQI:</strong> 250</p>
          <p><strong>PM2.5:</strong> 125 μg/m³</p>
          <p><strong>PM10:</strong> 180 μg/m³</p>
          <p><strong>NO₂:</strong> 60 ppb</p>
          <p><strong>Coordinates:</strong> 17.4400°N, 78.3500°E</p>
          <p><strong>Address:</strong> HITECH City, Hyderabad, Telangana 500081</p>
        </div>
      `).addTo(markersRef.current);

      // South Hyderabad - Mehdipatnam
      L.circleMarker([17.3200, 78.4500], {
        radius: 12,
        fillColor: 'orange',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Mehdipatnam</strong></h3>
          <p><strong>Station Code:</strong> HYD_MEH_006</p>
          <p><strong>AQI:</strong> 180</p>
          <p><strong>PM2.5:</strong> 85 μg/m³</p>
          <p><strong>PM10:</strong> 130 μg/m³</p>
          <p><strong>NO₂:</strong> 45 ppb</p>
          <p><strong>Coordinates:</strong> 17.3200°N, 78.4500°E</p>
          <p><strong>Address:</strong> Mehdipatnam Area, Hyderabad, Telangana 500028</p>
        </div>
      `).addTo(markersRef.current);

      // East Hyderabad - Uppal
      L.circleMarker([17.4000, 78.6000], {
        radius: 12,
        fillColor: 'yellow',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Uppal</strong></h3>
          <p><strong>Station Code:</strong> HYD_UPP_007</p>
          <p><strong>AQI:</strong> 120</p>
          <p><strong>PM2.5:</strong> 55 μg/m³</p>
          <p><strong>PM10:</strong> 90 μg/m³</p>
          <p><strong>NO₂:</strong> 35 ppb</p>
          <p><strong>Coordinates:</strong> 17.4000°N, 78.6000°E</p>
          <p><strong>Address:</strong> Uppal Area, Hyderabad, Telangana 500039</p>
        </div>
      `).addTo(markersRef.current);

      // Central Hyderabad - Malakpet
      L.circleMarker([17.3600, 78.4800], {
        radius: 12,
        fillColor: 'lightgreen',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Malakpet</strong></h3>
          <p><strong>Station Code:</strong> HYD_MAL_008</p>
          <p><strong>AQI:</strong> 80</p>
          <p><strong>PM2.5:</strong> 35 μg/m³</p>
          <p><strong>PM10:</strong> 60 μg/m³</p>
          <p><strong>NO₂:</strong> 25 ppb</p>
          <p><strong>Coordinates:</strong> 17.3600°N, 78.4800°E</p>
          <p><strong>Address:</strong> Malakpet Area, Hyderabad, Telangana 500036</p>
        </div>
      `).addTo(markersRef.current);

      // North-West Hyderabad - Jubilee Hills
      L.circleMarker([17.4200, 78.3800], {
        radius: 12,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Jubilee Hills</strong></h3>
          <p><strong>Station Code:</strong> HYD_JUB_009</p>
          <p><strong>AQI:</strong> 280</p>
          <p><strong>PM2.5:</strong> 145 μg/m³</p>
          <p><strong>PM10:</strong> 190 μg/m³</p>
          <p><strong>NO₂:</strong> 70 ppb</p>
          <p><strong>Coordinates:</strong> 17.4200°N, 78.3800°E</p>
          <p><strong>Address:</strong> Jubilee Hills Area, Hyderabad, Telangana 500033</p>
        </div>
      `).addTo(markersRef.current);

      // South-East Hyderabad - Vanasthalipuram
      L.circleMarker([17.3300, 78.5500], {
        radius: 12,
        fillColor: 'yellow',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`
        <div style="min-width: 250px;">
          <h3><strong>CPCB Station - Vanasthalipuram</strong></h3>
          <p><strong>Station Code:</strong> HYD_VAN_010</p>
          <p><strong>AQI:</strong> 110</p>
          <p><strong>PM2.5:</strong> 50 μg/m³</p>
          <p><strong>PM10:</strong> 85 μg/m³</p>
          <p><strong>NO₂:</strong> 30 ppb</p>
          <p><strong>Coordinates:</strong> 17.3300°N, 78.5500°E</p>
          <p><strong>Address:</strong> Vanasthalipuram Area, Hyderabad, Telangana 500070</p>
        </div>
      `).addTo(markersRef.current);

      console.log('Added 3 AQI stations');
    }
  };

  return (
    <div className="relative w-full h-full">
      <div 
        id="map-container" 
        className="w-full h-full"
        style={{ 
          cursor: 'grab',
          touchAction: 'none'
        }}
      ></div>
      {!mapRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-lg font-semibold text-gray-600">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default WorkingMap;
