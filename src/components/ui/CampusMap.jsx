import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle clicks on the map
const MapClickCapture = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    // Let container sizes settle before invalidating map size
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const CampusMap = ({ children, onLocationSelect, center, zoom, style, className }) => {
  // Default to the center of the events
  const defaultCenter = center || [10.1785, 76.4308];
  const defaultZoom = zoom || 18;

  // Campus bounds from OSM Way 253212720
  const campusBounds = [
    [10.1769249, 76.4290322],
    [10.1792659, 76.4318254]
  ];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={defaultZoom} 
      minZoom={16}
      scrollWheelZoom={false} 
      style={{ height: '100%', width: '100%', zIndex: 0, ...style }}
      className={className}
    >
      <MapResizer />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Campus Boundary Rectangle */}
      <Rectangle 
        bounds={campusBounds} 
        pathOptions={{ 
          color: '#000000', 
          weight: 4, 
          fillColor: '#FFDB58', 
          fillOpacity: 0.1, 
          dashArray: '8, 8' 
        }} 
      />

      {/* Capture clicks if admin is selecting a location */}
      <MapClickCapture onLocationSelect={onLocationSelect} />

      {/* Render additional overlays like markers or routes */}
      {children}
    </MapContainer>
  );
};

export default CampusMap;
