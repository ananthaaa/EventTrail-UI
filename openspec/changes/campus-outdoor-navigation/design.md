## Context

The CampusPulse app requires an outdoor navigation system. The current implementation relies on a plain image-overlay map with hardcoded straight-line paths. This is inefficient, non-scalable, and doesn't provide true shortest path navigation along real walkways. We are migrating to a digitized walkway graph using a GeoJSON path network and client-side A* routing over an OpenStreetMap tile layer.

## Goals / Non-Goals

**Goals:**
- Render an accurate, scalable campus map using OpenStreetMap tiles.
- Define a GeoJSON network of nodes (entrances/junctions) and edges (walkways).
- Persist the path network data in DynamoDB for dynamic retrieval.
- Compute the shortest path between two points on the client-side using the A* algorithm.
- Render the computed path as a polyline on the Leaflet map.
- Establish bridge points for future indoor geofence handoff.

**Non-Goals:**
- Server-side routing computations (e.g. pgRouting or a dedicated routing server).
- Implementing the indoor navigation geofencing system in this change (only preparing bridge points).

## Decisions

- **Client-Side A\***: We chose to perform A* pathfinding on the client (React) rather than a routing server. **Rationale**: A campus graph is small enough to load into memory client-side. This saves server costs, reduces latency for route calculations, and allows seamless integration with future indoor graphs on the device.
- **OpenStreetMap vs Image Overlay**: We will use OSM tiles rather than an image overlay. **Rationale**: OSM is already georeferenced, zoomable, and often contains building footprints. It skips manual georeferencing and is highly scalable.
- **Graph Storage**: The node and edge data will be stored in DynamoDB tables (`PathNodes` and `PathEdges`). **Rationale**: DynamoDB provides fast, scalable read performance when fetching the entire graph on application load.

## Risks / Trade-offs

- **[Risk] Missing Edges in Graph** → A* will silently fail to route if two areas aren't connected. **Mitigation**: Implement an admin-only debug view to visualize nodes and edges and ensure graph connectivity. Walk the campus or simulate paths to test.
- **[Trade-off] Client-side memory** → The client must download the entire graph on load. Since a campus graph is typically small (hundreds of nodes/edges), the memory and download payload overhead is negligible compared to full city graphs.
