console.log(fetch ('/tour') //ursprünglich let ausgangssituation = fetch ('/tour') -> nur zum testen...
    .then (ausgangssituation => {
        if (ausgangssituation.ok) {
            // Mitte der Karte
            var center = [51.961237, 7.625187];

            // Erstellung einer Variablen, die die Karte enthält, initial settings
            var map = L.map('map',).setView(center, 13.5); 

            // MapTiler hinuzfügen
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
                {
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                }).addTo(map); 
        } else {
            console.log('Fehler 1.Art');
        }
    }));


// warum auch immer, geht er hier nicht rein... klappt auch nicht, wenn statt :routeID die konkrete ID verwendet wird

//function testfunction(){
console.log(fetch('/tour/:routeID') // ursprünglich let response =(fetch('/tour/:routeID') ... s.o.
    .then(response => response.json())
    .then(response => {
        console.log(response)
        
        var center = [51.961237, 7.625187];
        var map = L.map('map',).setView(center, 13.5); 
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
            {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }).addTo(map);
        L.geoJson(response).addTo(map);
    }));
//}

//Wikipedia API 

$(document).ready(function(){              
    $("#searchWiki").click(function(){
        var inputUrl = new URL(document.getElementById("searchid").value); //String hinter /wiki/ abspeichern -> dann Object.query.pages[0].pageid
        var pathUrl = inputUrl.pathname;
        var finalUrl = pathUrl.substr(pathUrl.lastIndexOf('/'))
        console.log(finalUrl)
         //var p = q.Object.query.pages[0].pageid
         $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&gsrlimit=15&generator=search&origin=*&gsrsearch=" + finalUrl, function(data){
    console.log(data)
    });
  });
});
