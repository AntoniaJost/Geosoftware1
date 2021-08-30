var polygons = geojson;
var map;

console.log(fetch ('/tour') //ursprünglich let ausgangssituation = fetch ('/tour') -> nur zum testen...
    .then (ausgangssituation => {
        if (ausgangssituation.ok) {

            //!!!!!!!!!!!!!!!!!!!!!! Problem
            // Gegen Error "Map container is already initialized" ABER verhindert Karte bewegen
            var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }

            // Mitte der Karte
            var center = [51.961237, 7.625187];

            // Erstellung einer Variablen, die die Karte enthält, initial settings
            map = L.map('map',).setView(center, 13.5); 

            // MapTiler hinuzfügen
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
                {
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                }).addTo(map);
            
            if (polygons != null) {
                L.geoJson(polygons).addTo(map);
            }  
            

            //Marker gehören eig. in /:routeID -> funktioniert aber nicht, daher noch hier zum Testen
            var test = 2;
            // klappt nicht var testJSON = {"type": "Feature", "properties": {"Name": "Aasee", "URL": "https://de.wikipedia.org/wiki/Aasee_(M%C3%BCnster)", "Beschreibung": ""}, "geometry": { "type": "Point", "coordinates": [7.618723511695862, 51.95711151714148] } };
            //var testMarkerJSON = L.marker(testJSON.geometry.coordinates).addTo(map)
            var testMarker = L.marker([51.95711151714148, 7.618723511695862]).addTo(map);
            testMarker.bindPopup("<b>Test Marker!</b><br>I am a working popup. " + test)
            /*var popup = L.popup()
                .setLatLng([51.95711151714148, 7.618723511695862]) //darf kein String sein
                .setContent("TEST DATA " + test)
                .openOn(map);*/
//console.log(data)
            var popUpLayer = L.geoJSON(polygons, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup('<h1>' +feature.properties.Name+'</h1><p>URL: ' +feature.properties.URL+ '</p><p>Beschreibung: ' +feature.properties.Beschreibung+ '</p>');
                }
            }).addTo(map);

            //console.log(popUpLayer);

        } else {
            console.log('Fehler 1.Art');
        }
    }));

// warum auch immer, geht er hier nicht rein... klappt auch nicht, wenn statt :routeID die konkrete ID verwendet wird

//Wikipedia API 

$(document).ready(function(){              
    $("#searchWiki").click(function(){
        var inputUrl = new URL(document.getElementById("searchid").value); //String hinter /wiki/ abspeichern -> dann Object.query.pages[0].pageid
        //hier noch Fehlerabfangen falls keine Wikipedia URL
        var pathUrl = inputUrl.pathname;
        var finalUrl = pathUrl.substr(pathUrl.lastIndexOf('/'))
        console.log(finalUrl)
         //var p = q.Object.query.pages[0].pageid
        $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&gsrlimit=15&generator=search&origin=*&gsrsearch=" + finalUrl, function(data){
    console.log(data) //.query.pages[0].extract -> is undefined
    });
  });
});
