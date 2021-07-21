// SOURCE: https://jsfiddle.net/nathansnider/egzxw86h/

// Determine the center of the map
var center = [51.97178037591737, 10.2721484375]; 

// Create variable to hold map element, give initial settings to map and set drawControl to add the draw toolbar 
var map = L.map('map',).setView(center, 7); 

// Creat variable for the crosspoints
var coordinates = [];

// Create variable for crosspoints
var crossPoints; 

var popup = L.popup(); 


//autocomplete 


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
    //add intersection points to map
    //L.geoJson(checked).addTo(map);
  
    console.log(checked)
    drawGroup.addLayer(e.layer);
    //showCoordinates(checked); 
    //popUpWeather(coordinates);
    //drawGroup.addLayer(e.layer); 
});

map.on('overlayadd', function () {
    drawGroup.bringToFront();
});



 
function createMarker(checked) {
    var marker = []; 
    for(i = 0; i < checked.geometries.length; i++) {
        marker[i] = L.marker([checked.geometries[i].coordinates[1], checked.geometries[i].coordinates[0]]); 
    }
    console.log(marker._latlng);
    return marker; 
}

function bindPopups(marker){
    for(i = 0; i < marker.length; i++) {
        marker[i].bindPopup(funktionsTest).addTo(map).openPopup()        
    }
    return marker; 
}



/**
 * Intersection and geometry conversion functions
 * (using projected coordinates, because straight lat/lons will produce incorrect results)
 * @param {number} l1 
 * @param {number} l2 
 * @returns intersections
 */
function lineStringsIntersect(l1, l2) {
    var intersects = [];
    for (var i = 0; i <= l1.coordinates.length - 2; ++i) {
        for (var j = 0; j <= l2.coordinates.length - 2; ++j) {
            var a1Latlon = L.latLng(l1.coordinates[i][1], l1.coordinates[i][0]),
                a2Latlon = L.latLng(l1.coordinates[i + 1][1], l1.coordinates[i + 1][0]),
                b1Latlon = L.latLng(l2.coordinates[j][1], l2.coordinates[j][0]),
                b2Latlon = L.latLng(l2.coordinates[j + 1][1], l2.coordinates[j + 1][0]),
                a1 = L.Projection.SphericalMercator.project(a1Latlon),
                a2 = L.Projection.SphericalMercator.project(a2Latlon),
                b1 = L.Projection.SphericalMercator.project(b1Latlon),
                b2 = L.Projection.SphericalMercator.project(b2Latlon),
                ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
                ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
                u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
            if (u_b != 0) {
                var ua = ua_t / u_b,
                    ub = ub_t / u_b;
                if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                    var pt_x = a1.x + ua * (a2.x - a1.x),
                        pt_y = a1.y + ua * (a2.y - a1.y),
                        pt_xy = {
                            "x": pt_x,
                                "y": pt_y
                        },
                        pt_latlon = L.Projection.SphericalMercator.unproject(pt_xy);
                    intersects.push({
                        'type': 'Point',
                            'coordinates': [pt_latlon.lng, pt_latlon.lat]
                    });
                }
            }
        }
    }
    if (intersects.length == 0) intersects = false;
    return intersects;
}

/**
 * Takes GeoJSON as input, creates a GeoJSON GeometryCollection of linestrings as output
 * @param {geoJson} inputGeom 
 * @returns outputlines - GeoJSON GeometryCollection of linestrings
 */
function lineify(inputGeom) {
    var outputLines = {
        "type": "GeometryCollection",
            "geometries": []
    }
    switch (inputGeom.type) {
        case "GeometryCollection":
            for (var i in inputGeom.geometries) {
                var geomLines = lineify(inputGeom.geometries[i]);
                if (geomLines) {
                    for (var j in geomLines.geometries) {
                        outputLines.geometries.push(geomLines.geometries[j]);
                    }
                } else {
                    outputLines = false;
                }
            }
            break;
        case "Feature":
            var geomLines = lineify(inputGeom.geometry);
            if (geomLines) {
                for (var j in geomLines.geometries) {
                    outputLines.geometries.push(geomLines.geometries[j]);
                }
            } else {
                outputLines = false;
            }
            break;
        case "FeatureCollection":
            for (var i in inputGeom.features) {
                var geomLines = lineify(inputGeom.features[i].geometry);
                if (geomLines) {
                    for (var j in geomLines.geometries) {
                        outputLines.geometries.push(geomLines.geometries[j]);
                    }
                } else {
                    outputLines = false;
                }
            }
            break;
        case "LineString":
            outputLines.geometries.push(inputGeom);
            break;
        case "MultiLineString":
        case "Polygon":
            for (var i in inputGeom.coordinates) {
                outputLines.geometries.push({
                    "type": "LineString",
                        "coordinates": inputGeom.coordinates[i]
                });
            }
            break;
        case "MultiPolygon":
            for (var i in inputGeom.coordinates) {
                for (var j in inputGeom.coordinates[i]) {
                    outputLines.geometries.push({
                        "type": "LineString",
                            "coordinates": inputGeom.coordinates[i][j]
                    });
                }
            }
            break;
        default:
            outputLines = false;
    }
    return outputLines;
}

/**
 * Takes Leaflet layers as input; produces geoJSON points of their intersections as output
 * @param {leaflet-layer} baseLayer 
 * @param {leaflet-layer} drawLayer 
 * @returns crossPoints geoJson intersection points
 */
function crossCheck(baseLayer, drawLayer) {
    var baseJson = baseLayer.toGeoJSON(),
        drawJson = drawLayer.toGeoJSON(),
        baseLines = lineify(baseJson),
        drawLines = lineify(drawJson),
        crossPoints = {
            type: "GeometryCollection",
            geometries: []
        };
    if (baseLines && drawLines) {
        for (var i in drawLines.geometries) {
            for (var j in baseLines.geometries) {
                var crossTest = lineStringsIntersect(drawLines.geometries[i], baseLines.geometries[j]);
                if (crossTest) {
                    for (var k in crossTest) {
                        crossPoints.geometries.push(crossTest[k]);
                    }
                }
            }
        }
    }
     //console.log(crossPoints);
    //console.log(crossPoints.geometries[1].coordinates);
    //console.log(showCoordinates(crossPoints)); 
    return crossPoints;
}

/**
 * Returns the coordinates of the intersections between rectangle and route. 
 * @param {geoJson} checked intersection points between rectangle and route
 * @return {array} coordinates
 */
function showCoordinates(checked) {
    for(i = 0; i < checked.geometries.length; i++) {
         coordinates[i] = checked.geometries[i].coordinates; 
    } 
    return coordinates; 
}



//Pop-ups for different featuretypes. --> MEHR EIN TEST UM POP-UP-FUNKTIONSWEISE ZU VERSTEHEN
var drawnRectangle = new L.FeatureGroup();
map.addLayer(drawnRectangle);

map.on('draw:created', function(e) {
    var type = e.layerType,
    layer = e.layer;

    if (type === 'rectangle'){
        layer.bindPopup('It works!');
    } else { layer.bindPopup('Sorry, this featuretype is not supported for calculating intersections, please use rectangle.')
    }

    console.log(e);
    drawnRectangle.addLayer(layer);
});

//********************Suche*in*der*Datenbank*****************************************************
// retrieve the names 
var unsereDaten = geojson //Speichern unsere Geojson hier ab, um damit drauf zugreifen zu können

console.log(unsereDaten)

//wollen die Namen aus unserer GeoJson erhalten 
var routeNames = unsereDaten.map(function (el) {
    return el.name
})

console.log(routeNames)

//autocomplete
$("#unsereDaten").autocomplete
    ({
        minLength: 1, //start after 1 character 
        source: routeNames, //take the poinames as source 
        select: function (event, ui) {
            this.value = ui.item.value //update the value of the current field with the value of the selected element 

            let details = unsereDaten.filter(function (el) {
                // return the only object for wich the poiname matches the selction 
                return el.name === ui.item.value
            })

            console.log(details);

            showDetailsOnMap(details); 

            return false 
        }
    })

function showDetailsOnMap(details) {

    // get the current Route 
    let currentRoute = details[0]
    console.log(currentRoute)
    var routeLayer = L.geoJson(currentRoute).addTo(map) 
}


//*************************************************************************************************************

