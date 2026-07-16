## Why

The current CampusPulse app relies on a static image-overlay map with manually hardcoded routes. This approach does not guarantee the shortest paths and fails to scale well when adding new buildings or dynamic routing constraints. By moving to a digitized walkway graph mapped over OpenStreetMap and utilizing client-side A* pathfinding, we can ensure dynamic and algorithmically sound path computation. This change also prepares the system for seamless indoor/outdoor handoffs later on.

## What Changes

- Replace the plain image-overlay map with an OpenStreetMap tile layer.
- **BREAKING**: Move away from hardcoded straight-line path routing.
- Map the campus walkway network using GeoJSON (nodes for junctions/entrances, edges for paths).
- Parse the GeoJSON to build an adjacency list representing the campus graph.
- Store nodes and edges data in DynamoDB for retrieval by the client.
- Implement client-side A* pathfinding using a Haversine heuristic.
- Render the computed shortest path dynamically in Leaflet.
- Establish bridge points (building entrances) for geofence handoff between outdoor and future indoor navigation systems.

## Capabilities

### New Capabilities
- `campus-map`: Renders the outdoor campus base map utilizing OpenStreetMap tiles.
- `outdoor-navigation`: Client-side A* pathfinding and GeoJSON path network layer to route users between any two points on campus.

### Modified Capabilities
<!-- No existing capabilities to modify, this is a greenfield implementation in the specs context -->

## Impact

- **UI/Map**: The React Leaflet components will be modified to support dynamic tile layers and A* calculated Polylines instead of static overlays.
- **Backend/DB**: DynamoDB tables will be introduced to persist `PathNodes` and `PathEdges`. An AWS SDK seed script will be needed.
- **Client App**: The client will download the routing graph at load and compute routes on the fly rather than requesting fixed paths.
