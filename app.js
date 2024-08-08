mapboxgl.accessToken = window.config.mapboxAccessToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9876, 40.7661],
    zoom: 15
});

map.on('load', () => {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#f00',
                '#ccc'
            ],
            'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    });

    window.config.markers.forEach(marker => {
        new mapboxgl.Marker({ color: marker.properties.color })
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup().setText(marker.properties.description))
            .addTo(map);
    });

    window.config.buildings.forEach(building => {
        map.setFeatureState(
            { source: 'composite', sourceLayer: 'building', id: building.id },
            { color: building.color }
        );
    });
});

map.on('mousemove', '3d-buildings', (e) => {
    if (e.features.length > 0) {
        if (hoveredBuildingId) {
            map.setFeatureState(
                { source: 'composite', sourceLayer: 'building', id: hoveredBuildingId },
                { hover: false }
            );
        }
        hoveredBuildingId = e.features[0].id;
        map.setFeatureState(
            { source: 'composite', sourceLayer: 'building', id: hoveredBuildingId },
            { hover: true }
        );
    }
});

map.on('mouseleave', '3d-buildings', () => {
    if (hoveredBuildingId) {
        map.setFeatureState(
            { source: 'composite', sourceLayer: 'building', id: hoveredBuildingId },
            { hover: false }
        );
    }
    hoveredBuildingId = null;
});
