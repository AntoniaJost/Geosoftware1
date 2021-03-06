/**
 * @function oepnv
 * @description Wird durch Button "ÖPNV anzeigen" aufgerufen und greift mit Conterra API auf alle
 *              Bushaltestellen in Münster zu, zudem ermöglicht sie Weiterleitung zu Wetter Funktion
 */

function oepnv() {
    $.ajax({
        url: "https://rest.busradar.conterra.de/prod/haltestellen",
        method: "GET",
    })
    .done(function (response) {
        console.dir(response)
        showBusStops(response) //Bushaltestellen von conterra
        map.on('click', onMapClick) //OpenWeatherMap 
    })
    .fail(function (xhr, status, errorThrown) {
        alert( "error" )
        console.dir(xhr)
        console.log(status)
        console.log(errorThrown)        
    })
}

/**
 * @function showBusStops
 * @description zeigt die von der API erhaltenen Stationen visuell mit individuellem Icon auf Karte an
 * @param stops Haltestelle, die von API erhalten wurden
 */
function showBusStops(stops) {
    
    var my_json = L.geoJson(stops, {
        pointToLayer: function(feature, latlng) {            
            var busIcon = L.icon({
                iconSize: [12, 12],
                iconUrl: '/stylesheets/myIcon.png'
            });
            return L.marker(latlng, {icon: busIcon});

        },
       onEachFeature: function (feature, layer) {
               layer.bindPopup("hier müssten jetzt nur noch Wetterdaten stehen..."); //ZEILE ANPASSEN ODER ENTFERNEN
       }
     });
        my_json.addTo(map);
        
}


//----- ab hier Wetter aus WeatherPopUp.js -> Übung7 ------

// PopUp Initialisierung
var popup = L.popup();

/**
 * @function onMapClick
 * @description ruft Wetterdaten der angeklickten Stelle über OpenWeatherMap API ab und zeigt sie im PopUp
 * @param e Klick-Event
 * Diese Funktion orientiert sich an: https://gis.stackexchange.com/questions/313430/calling-openweathermap-api-in-leaflet-js-map 
 */
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()) //esample from leaflet, will be immediately replaced by weatherpopup...
        .openOn(map);

//getting json function
$(document).ready(function(){
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=` + e.latlng.lat + `&lon=` + e.latlng.lng + `&appid=${openWeatherAPIKey}`,
    dataType: 'json',
    method: "GET",
    success: function(data) {
      // storing json data in variables
      weatherlocation_lon = data.coord.lon; // lon WGS84
      weatherlocation_lat = data.coord.lat; // lat WGS84
      weatherstationname = data.name // Name of Weatherstation
      weatherstationid = data.id // ID of Weatherstation
      weathertime = data.dt // Time of weatherdata (UTC)
      temperature = data.main.temp; // Kelvin
      airpressure = data.main.pressure; // hPa
      airhumidity = data.main.humidity; // %
      temperature_min = data.main.temp_min; // Kelvin
      temperature_max = data.main.temp_max; // Kelvin
      windspeed = data.wind.speed; // Meter per second
      winddirection = data.wind.deg; // Wind from direction x degree from north
      cloudcoverage = data.clouds.all; // Cloudcoverage in %
      weatherconditionid = data.weather[0].id // ID
      weatherconditionstring = data.weather[0].main // Weatheartype
      weatherconditiondescription = data.weather[0].description // Weatherdescription
      weatherconditionicon = data.weather[0].icon // ID of weathericon

    // Converting Unix UTC Time
    var utctimecalc = new Date(weathertime * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = utctimecalc.getFullYear();
    var month = months[utctimecalc.getMonth()];
    var date = utctimecalc.getDate();
    var hour = utctimecalc.getHours();
    var min = utctimecalc.getMinutes();
    var sec = utctimecalc.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ' Uhr';

    // recalculating
    var weathercondtioniconhtml = "http://openweathermap.org/img/w/" + weatherconditionicon + ".png";
    var weathertimenormal = time; // reallocate time var....
    var temperaturecelsius = Math.round((temperature - 273) * 100) / 100;  // Converting Kelvin to Celsius
    var windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100; // Windspeed from m/s in km/h; Round to 2 decimals
    var winddirectionstring = "Im the wind from direction"; // Wind from direction x as text
    if (winddirection > 348.75 &&  winddirection <= 11.25) {
        winddirectionstring =  "N";
    } else if (winddirection > 11.25 &&  winddirection <= 33.75) {
        winddirectionstring =  "NNE";
    } else if (winddirection > 33.75 &&  winddirection <= 56.25) {
        winddirectionstring =  "NE";
    } else if (winddirection > 56.25 &&  winddirection <= 78.75) {
        winddirectionstring =  "ENE";
    } else if (winddirection > 78.75 &&  winddirection <= 101.25) {
        winddirectionstring =  "E";
    } else if (winddirection > 101.25 &&  winddirection <= 123.75) {
        winddirectionstring =  "ESE";
    } else if (winddirection > 123.75 &&  winddirection <= 146.25) {
        winddirectionstring =  "SE";
    } else if (winddirection > 146.25 &&  winddirection <= 168.75) {
        winddirectionstring =  "SSE";
    } else if (winddirection > 168.75 &&  winddirection <= 191.25) {
        winddirectionstring =  "S";
    } else if (winddirection > 191.25 &&  winddirection <= 213.75) {
        winddirectionstring =  "SSW";
    } else if (winddirection > 213.75 &&  winddirection <= 236.25) {
        winddirectionstring =  "SW";
    } else if (winddirection > 236.25 &&  winddirection <= 258.75) {
        winddirectionstring =  "WSW";
    } else if (winddirection > 258.75 &&  winddirection <= 281.25) {
        winddirectionstring =  "W";
    } else if (winddirection > 281.25 &&  winddirection <= 303.75) {
        winddirectionstring =  "WNW";
    } else if (winddirection > 303.75 &&  winddirection <= 326.25) {
        winddirectionstring =  "NW";
    } else if (winddirection > 326.25 &&  winddirection <= 348.75) {
        winddirectionstring =  "NNW";
    } else {
        winddirectionstring =  " - currently no winddata available - ";
    };

//Popup with content
    var fontsizesmall = 1;
    popup.setContent("Weatherdata:<br>" + "<img src=" + weathercondtioniconhtml + "><br>" + weatherconditiondescription + "<br><br>Temperature: " + temperaturecelsius + "°C<br>Airpressure: " + airpressure + " hPa<br>Humidity: " + airhumidity + "%" + "<br>Cloudcoverage: " + cloudcoverage + "%<br><br>Windspeed: " + windspeedkmh + " km/h<br>Winddirection: " + winddirectionstring + " (" + winddirection + "°)" + "<br><br><font size=" + fontsizesmall + ">Datasource:<br>openweathermap.org<br>Measure time: " + weathertimenormal + "<br>Weatherstation: " + weatherstationname + "<br>Weatherstation-ID: " + weatherstationid + "<br>Weatherstation Coordinates: " + weatherlocation_lon + ", " + weatherlocation_lat);           


    },
    error: function() {
      alert("error receiving wind data from openweathermap");
    }
  });        
});
}

