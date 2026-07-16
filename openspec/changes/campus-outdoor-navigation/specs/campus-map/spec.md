## ADDED Requirements

### Requirement: OpenStreetMap Tile Layer
The system SHALL display an interactive campus map using OpenStreetMap tiles as the primary layer.

#### Scenario: User opens the map view
- **WHEN** the user navigates to the map screen
- **THEN** the system renders a Leaflet map with OpenStreetMap tiles centered on the campus

### Requirement: Geofence Bridge Points
The system SHALL define building entrances as distinct nodes on the map that act as handoff points for future indoor navigation.

#### Scenario: User approaches a building
- **WHEN** the user's GPS coordinates intersect with a bridge point node
- **THEN** the system exposes the transition event to trigger indoor navigation rendering
