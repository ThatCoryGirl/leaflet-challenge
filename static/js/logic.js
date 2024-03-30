// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add base map layers
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add CartoDB Dark Matter tile layer
const cartoDBDarkMatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>'
});

// Add base maps to a control object
const baseMaps = {
    "OpenStreetMap": osmLayer,
    "CartoDB Dark Matter": cartoDBDarkMatterLayer
};

// Add earthquake and tectonic plates data layers
(async function() {
    // Add earthquake data to the map
    const earthquakeLayer = await addEarthquakeData();
    const tectonicPlatesLayer = await addTectonicPlatesData();

    // Add layer controls to the map
    const layerControl = L.control.layers(baseMaps, {
        "Earthquake Data": earthquakeLayer,
        "Tectonic Plates": tectonicPlatesLayer
    }, { collapsed: false }).addTo(map);

    // Add legend
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {
        // Add 'legend-dark' class
        let div = L.DomUtil.create('div', 'info legend legend-dark');
        const depthLabels = ['-10-10', '10-30', '30-50', '50-70', '70-80', '90+'];
        const colors = ['hsl(0, 100%, 50%)', 'hsl(40, 100%, 50%)', 'hsl(60, 100%, 50%)', 'hsl(80, 100%, 50%)', 'hsl(100, 100%, 50%)', 'hsl(120, 100%, 50%)'];
        // Example magnitudes
        const magnitudes = [1, 2, 3, 4, 5];
        let labels = '<strong>Depth (km) / Magnitude</strong><br>';

        // Loop through depth labels
        for (let i = 0; i < depthLabels.length; i++) {
            labels +=
                '<div><i style="background:' + colors[i] + '"></i> ' +
                depthLabels[i] + '</div>';
        }

        // Add magnitudes with varying circle sizes
        labels += '<br><strong>Magnitude</strong><br>';
        for (let i = 0; i < magnitudes.length; i++) {
            labels +=
                '<svg height="' + (Math.sqrt(Math.abs(magnitudes[i])) * 5 * 2) + '" width="' + (Math.sqrt(Math.abs(magnitudes[i])) * 5 * 2) + '">' +
                '<circle cx="' + (Math.sqrt(Math.abs(magnitudes[i])) * 5) + '" cy="' + (Math.sqrt(Math.abs(magnitudes[i])) * 5) + '" r="' + (Math.sqrt(Math.abs(magnitudes[i])) * 5) + '" fill="none" stroke="black" stroke-width="1" />' +
                '</svg> ' + magnitudes[i] + '<br>';
        }

        div.innerHTML = labels;
        return div;
    };

    legend.addTo(map);

    // Add event listener for base layer change
    map.on('baselayerchange', function(event) {
        if (event.name === 'CartoDB Dark Matter') {
            // If CartoDB Dark Matter layer is selected, set legend text color to white
            document.querySelector('.legend').classList.add('legend-dark');
        } else {
            // If any other layer is selected, remove the legend text color class
            document.querySelector('.legend').classList.remove('legend-dark');
        }
    });
})();

// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to style earthquake data based on magnitude and depth
function getCircleOptions(feature) {
    const magnitude = feature.properties.mag;
    // Third coordinate represents depth
    const depth = feature.geometry.coordinates[2];
    return {
        // Scale radius based on magnitude
        radius: Math.sqrt(Math.abs(magnitude)) * 5,
        color: 'black',
        fillColor: getColor(depth),
        fillOpacity: 0.8
    };
}

// Function to determine color based on depth
function getColor(depth) {
    // Maximum depth for color scale
    const maxDepth = 700;
    // Normalize depth between 0 and 1
    const normalizedDepth = Math.min(depth, maxDepth) / maxDepth;
    // Convert depth to hue (blue to red)
    const hue = (1 - normalizedDepth) * 120;
    // Return color in HSL format
    return `hsl(${hue}, 100%, 50%)`;
}

// Function to create popup content for earthquake data
function createPopupContent(feature, layer) {
    const props = feature.properties;
    layer.bindPopup(`<strong>Location:</strong> ${props.place}<br><strong>Magnitude:</strong> ${props.mag}`);
}

// Function to add earthquake data to the map
async function addEarthquakeData() {
    const earthquakeData = await fetchData();
    return L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, getCircleOptions(feature));
        },
        onEachFeature: createPopupContent
    });
}

// Function to fetch tectonic plates GeoJSON data
async function fetchTectonicPlatesData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tectonic plates data:', error);
    }
}

// Function to add tectonic plates data to the map
async function addTectonicPlatesData() {
    const tectonicPlatesData = await fetchTectonicPlatesData();
    return L.geoJSON(tectonicPlatesData, {
        style: function(feature) {
            return {
                // Set color of tectonic plate boundaries
                color: 'orange',
                // Set weight of the boundary lines
                weight: 2,
                // Set opacity of the boundary lines
                opacity: 1
            };
        }
    });
}