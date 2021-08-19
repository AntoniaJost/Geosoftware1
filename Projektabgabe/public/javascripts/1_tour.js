// Mitte der Karte
var center = [51.961237, 7.625187];

// Erstellung einer Variablen, die die Karte enthält, initial settings
var map = L.map('map',).setView(center, 13.5); 

// MapTiler hinuzfügen
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
    {
     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map); 

let response = fetch('/:routeID')
    .then(response => {
        if (response.ok) {
            response.json().then(data => console.log(data));
        } else {
            console.log('Es gibt einen Fehler');
        }
    });
//alert (routeLayer);

$('#dropdown-demo li').on('click', function(){
    $('#dropdownMenuButton1').val($(this).text());
}); 
//var routeLayer = L.geoJSON(routeID).addTo(map);