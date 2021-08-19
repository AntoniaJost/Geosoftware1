let ausgangssituation = fetch ('/tour')
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
    })


// warum auch immer, geht er hier nicht rein...
let response = fetch('tour/:routeID')
    .then(response => response.json()).then(response => {
        L.geoJson(response).addTo(map);
    });

