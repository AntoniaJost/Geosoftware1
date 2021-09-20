// Mitte der Karte
var center = [51.961237, 7.625187];

// Erstellung einer Variablen, die die Karte enthält, initial settings
var karte = L.map('karte').setView(center, 15); 

//initialiation of the attributes
let marker = ""; 
let polygon = ""; 
let drawEvent = false; 
var route2 = null; 
var drawnGeojson; 

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
    },
    draw: {
        rectangle: false,
        polyline: false,
        circle: false
    }
});
karte.addControl(drawControl);
    

// Draw Events
karte.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;
    var element = document.getElementById('input-map'); 
    console.log(element); 
    console.log(e.layer) //--> toGeoJson  --> drawnIten
    drawEvent = true; 
    if (type === 'marker') {
        marker = e;
        console.log(marker.layer._latlng);
    } 
    if (type == 'polygon') {
        polygon = e; 
        console.log(polygon.layer._latlngs);
    }
    //fetch('/tour/add')
    //    .then(res => drawEvent)
    drawnGeojson = drawnItems.toGeoJSON(); 
    drawnItems.addLayer(layer);
 });
 
karte.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
    });
});



//conervt to GeoJson --> e.layer

/**
 * @function submitFunction
 * @description Wird vom Absenden Button aufgerufen
 */
function submitFunction() {
    console.log(drawEvent);
    if(marker.layerType == "marker") {
        route2 = marker; 
        alert("Marker kommt an"); 
    } else if (polygon.layerType == "polygon") {
        router2 = polygon; 
        alert("Polygon kommt an"); }

    drawEvent = false; 

}

// Event Handler for Input-form -> disabel/ enable form field depending on selected option
$(document).ready(function(){
    $("select[name='choose']").on('change',function(){
      if($(this).val()==1){
        $("input[name='geojson']").prop("disabled",false);
      }else{
        $("input[name='geojson']").prop("disabled",true);
      }
    });
  });
/** 
$(document).ready(function(){
    $("select[name='choose']"
        $("input[name='coordinates']").prop("disabled",false);).on('change',function(){
      if($(this).val()==0){
      }else{
        $("input[name='coordinates']").prop("disabled",true);
      }
    });
  });*/
