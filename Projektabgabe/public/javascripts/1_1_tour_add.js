
// Mitte der Karte
var center = [51.961237, 7.625187];

// Erstellung einer Variablen, die die Karte enthält, initial settings
var karte = L.map('karte').setView(center, 15); 

//initialiation of the attributes
//Wir brauchen laut Aufgabe sogar nur Punkt und Polygon
let marker = ""; 
let rectangle = ""; 
let polygon = ""; 
let polyline = ""; 
let circle = ""; 
let drawEvent = false; 
var route2 = null; 




// MapTiler hinuzfügen
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
    {
     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(karte); 

// Draw Group/ Toolbar hinzufügen
var drawnItems = new L.FeatureGroup();
karte.addLayer(drawnItems);
var drawControl = new L.Control.Draw ({
    edit: {
        featureGroup: drawnItems,
    }
});
karte.addControl(drawControl);
    

// Draw Events (noch zuende anpassen)
karte.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;
    var element = document.getElementById('input-map'); 
    console.log(element); 
    drawEvent = true; 
    if (type === 'marker') {
        marker = e;
        console.log(marker.layer._latlng);
    } 
    if (type == 'rectangle') {
        rectangle = e; 
        console.log(rectangle.layer._latlngs);
    }
    if (type == 'polygon') {
        polygon = e; 
        console.log(polygon.layer._latlngs);
    }
    if(type == 'polyline') {
        polyline = e; 
        console.log(polyline.layer._latlngs);
    }
    if(type == 'circle') {
        circle = e; 
        console.log(circle.layer._latlngs);
    }

    //fetch('/tour/add')
    //    .then(res => drawEvent)
    

    // Do whatever else you need to. (save to db; add to map etc)
    drawnItems.addLayer(layer);
 });
 
karte.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        //do whatever you want; most likely save back to db
    });
});

// Wird vom Absenden Button aufgerufen
function submitFunction() {
    console.log(drawEvent);
    if(marker.layerType == "marker") {
        route2 = marker; 
        alert("Kommt an1"); 
    } else if (polygon.layerType == "polygon") {
        router2 = polygon; 
        alert("Kommt an2"); 
    } else if (polyline.layerType == "polyline") {
        router2 = polyline; 
        alert("Kommt an3"); 
    } else if (rectangle.layerType == "rectangle") {
        router2 = rectangle; 
        alert("Kommt an4"); 
    } else if (polygon.layerType == "circle") {
        router2 = circle; 
        alert("Kommt an5"); 
    }

    drawEvent = false; 

}
/** 
// Event Handler -> disabel/ enable form field depending on selected option
$(document).ready(function(){
    $("select[name='choose']").on('change',function(){
      if($(this).val()==1){
        $("input[name='geojson']").prop("disabled",false);
      }else{
        $("input[name='geojson']").prop("disabled",true);
      }
    });
  });

$(document).ready(function(){
    $("select[name='choose']").on('change',function(){
      if($(this).val()==0){
        $("input[name='coordinates']").prop("disabled",false);
      }else{
        $("input[name='coordinates']").prop("disabled",true);
      }
    });
  });
*/