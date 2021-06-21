var polygon = [[7.603933811187744,51.95971147614647],[7.61200189590454,51.95971147614647],[7.61200189590454,51.967644303302706],[7.603933811187744,51.967644303302706],[7.603933811187744,51.95971147614647]];

     
    var newGeoJson; 
    var myGeoJson = {}; 
    myGeoJson.type = "FeatureCollection"; 
    myGeoJson.features = [{}]; 
    myGeoJson.features[0].type = "Feature"; 
    myGeoJson.features[0].properties= {};
    myGeoJson.features[0].geometry = {}; 
    myGeoJson.features[0].geometry.type = "Polygon"; 
    myGeoJson.features[0].geometry.coordinates = polygon; 

    var newGeoJson = JSON.stringify(myGeoJson); 

    /**
     * Output of converted old polygon as GeoJson.
     */
    function oldGeoJsonPolygon() {
        document.getElementById("ergebnis2").innerHTML = newGeoJson; 
    }
    


