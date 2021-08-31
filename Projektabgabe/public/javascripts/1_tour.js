var polygons = geojson;
var map;

console.log(fetch ('/tour') //ursprünglich let ausgangssituation = fetch ('/tour') -> nur zum testen...
    .then (ausgangssituation => {
        if (ausgangssituation.ok) {

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
            
            var popUpLayer = L.geoJSON(polygons, {
                onEachFeature: function (feature, layer) {
                    //Wikipedia API
                    var pathUrl = feature.properties.URL;
                    if (pathUrl != 0){
                        var finalUrl = pathUrl.substr(pathUrl.lastIndexOf('/')).replace('/','')
                        console.log(finalUrl)

                        //JSON-P function due to CORS -> nicht notwendig, wenn man an &origin=* denkt...
                        /*window.onload = function() {
                            
                            var num = Math.round(10000 * Math.random());
                            var callbackMethodName = "cb_" + num;

                            window[callbackMethodName] = function(data){
                                console.log(data)
                            }

                            var sc = document.createElement("script");
                            sc.id = "script_" + callbackMethodName;
                            sc.src = "https://de.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + finalUrl + "&callback=" + callbackMethodName;

                            document.body.appendChild(sc);
                            //document.getElementById(sc.id).remove();
                        }*/

                        $.getJSON("https://de.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&titles=" + finalUrl, function(data){
                            Object.keys(data.query.pages).forEach(key => {
                                layer.bindPopup('<h3>' +feature.properties.Name+'</h3>' + data.query.pages[key].extract + feature.properties.Beschreibung + "Quelle: Wikipedia.org");
                            });
                    })} else {
                    layer.bindPopup('<h3>' +feature.properties.Name+'</h3>' + feature.properties.Beschreibung );
                    }
                }
            }).addTo(map);

        } else {
            console.log('Fehler');
        }
    }));

/*Wikipedia API 

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
});*/
