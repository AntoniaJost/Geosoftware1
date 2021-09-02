// Variablen Initialisierung
var polygons = geojson;
var map;

//Abfangen von localhost:3000/tour
console.log(fetch ('/tour') 
    .then (ausgangssituation => {
        if (ausgangssituation.ok) {

            // Mitte der Karte
            var center = [51.961237, 7.625187];

            // Erstellung einer Variablen, die die Karte enthält & initial settings
            map = L.map('map',).setView(center, 13.5); 

            // MapTiler hinuzfügen
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
                {
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                }).addTo(map);
            
            if (polygons != null) {
                L.geoJson(polygons).addTo(map);
            }  
            
            //PopUp Layer für Info Display
            var popUpLayer = L.geoJSON(polygons, {
                onEachFeature: function (feature, layer) {
                    //Wikipedia API
                    var pathUrl = feature.properties.URL;
                    if (pathUrl != 0){
                        var finalUrl = pathUrl.substr(pathUrl.lastIndexOf('/')).replace('/','')
                        console.log(finalUrl)

                        $.getJSON("https://de.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&titles=" + finalUrl, function(data){
                            Object.keys(data.query.pages).forEach(key => {
                                layer.bindPopup('<h3>' +feature.properties.Name+'</h3>' + data.query.pages[key].extract + feature.properties.Beschreibung + "Quelle: Wikipedia.org");
                            });
                    })} else { //für die Sehenswürdigkeiten, die keinen Wikipedia Artikel haben
                    layer.bindPopup('<h3>' +feature.properties.Name+'</h3>' + feature.properties.Beschreibung + "<p> Kein Wikipedia Artikel vorhanden </p>");
                    }
                }
            }).addTo(map);

        } else {
            console.log('Fehler');
        }
    }));