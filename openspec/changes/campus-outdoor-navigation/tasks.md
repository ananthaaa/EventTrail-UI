## 1. Graph Data Preparation

- [x] 1.1 Create the GeoJSON campus path network file
- [x] 1.2 Write a script to convert the GeoJSON nodes and edges into an adjacency list (JSON format)
- [x] 1.3 Create an AWS SDK seed script to bulk-insert `PathNodes` and `PathEdges` into DynamoDB

## 2. Map Interface Update

- [x] 2.1 Replace the existing static image-overlay map layer with an OpenStreetMap tile layer in the React Leaflet component
- [x] 2.2 Configure map boundaries and default zoom level for the campus

## 3. Pathfinding Logic

- [x] 3.1 Implement API calls to fetch `PathNodes` and `PathEdges` from DynamoDB on application load
- [x] 3.2 Construct the bidirectional adjacency list client-side using the fetched data
- [x] 3.3 Implement the Haversine heuristic function for distance calculation
- [x] 3.4 Implement the client-side A* pathfinding algorithm

## 4. Route Rendering & Integration

- [x] 4.1 Create a `RouteLayer` component to render the shortest path as a Leaflet Polyline
- [x] 4.2 Integrate the UI selection (start/destination) to trigger the A* pathfinding function
- [x] 4.3 Handle edge cases (e.g., path not found, disconnected nodes) and display appropriate user feedback
- [x] 4.4 Mark designated building entrance nodes as bridge points for future indoor geofence handoff
