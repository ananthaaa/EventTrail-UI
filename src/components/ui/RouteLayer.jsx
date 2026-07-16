import React from 'react';
import { Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const bridgeIcon = L.divIcon({
  className: 'custom-bridge-icon',
  html: '<div style="width: 12px; height: 12px; background-color: #FFDB58; border: 2px solid black; border-radius: 50%;"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export default function RouteLayer({ path, nodes }) {
  if (!nodes) return null;

  const latlngs = (path || []).map(nodeId => {
    const node = nodes[nodeId];
    return node ? [node.lat, node.lng] : null;
  }).filter(Boolean);
  
  // Render bridge points (all entrance nodes for geofence handoff hints)
  const bridgePoints = Object.entries(nodes)
    .filter(([id, node]) => node.type === 'entrance')
    .map(([id, node]) => ({ id, ...node }));

  return (
    <>
      {latlngs.length > 0 && (
        <Polyline positions={latlngs} color="#FF5A1F" weight={5} opacity={0.8} dashArray="8, 8" />
      )}
      {bridgePoints.map(bp => (
        <Marker key={bp.id} position={[bp.lat, bp.lng]} icon={bridgeIcon}>
          <Popup>
            <strong>{bp.label || 'Building Entrance'}</strong><br/>
            (Bridge Point for Indoor Navigation)
          </Popup>
        </Marker>
      ))}
    </>
  );
}
