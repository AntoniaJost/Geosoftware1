// Determine the center of the map
var center = [51.961237, 7.625187];

// Create variable to hold map element, give initial settings to map and set drawControl to add the draw toolbar 
var map = L.map('map',).setView(center, 13.5); 

// Creat variable for the crosspoints
var coordinates = [];

// Create variable for crosspoints
var crossPoints; 

// Add MapTiler tile layer to map element
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
    {
     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    },{ 'drawlayer': drawGroup }, { position: 'topleft', collapsed: false }).addTo(map); 

    
//Leaflet layers and controls
var routeLayer = L.geoJson(geojsonFeature).addTo(map),
    drawGroup = L.geoJson().addTo(map),
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawGroup,
            poly: {
                allowIntersection: true
            }
        },
        draw: {
            polygon: {
                allowIntersection: true,
                showArea: true
            }
        }
    }).addTo(map);


//Draw event handlers
map.on('draw:created', function (e) {
    //check for intersections between draw layer and base geometry
    var checked = crossCheck(routeLayer, e.layer);
    var test = L.geoJson(checked)
    
    var marker = createMarker(checked); 

    bindPopups(marker);
    console.log(checked)

    drawGroup.addLayer(e.layer);
});
