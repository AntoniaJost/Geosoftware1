// Mitte der Karte
var center = [51.961237, 7.625187];

// Erstellung einer Variablen, die die Karte enthält, initial settings
var map = L.map('map',).setView(center, 13.5); 

// MapTiler hinuzfügen
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=86IucIQ0W7mo5uspiDDB', 
    {
     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map); 


// kopiert von Musterlösung 06 Balzer Pilz
var response;
function getDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(res) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            response = res;
            for(i = 0; i < res.length; i++) {
                var  layer = L.geoJSON(res[i].geojson.features[0]);
                routesLayerGroup.addLayer(layer);
                layer.bindPopup("Nummer: " + res[i].nummer);
                route = res[i].geojson;
            }
            //fillTable(res);
            //Fit Bounds to the Route
            map.fitBounds(routesLayerGroup.getBounds());

            // The following lines of code build up the dropdown menu from the actual state of the database
            const togglerDelete = document.getElementById("inputGroupSelectDelete");
            for(i = 0; i < res.length; i++) {
                const elem = document.createElement("option");
                elem.href = "#";
                const elemText = document.createTextNode(res[i].nummer);
                elem.setAttribute("value", res[i].nummer) 
                elem.appendChild(elemText);
                togglerDelete.appendChild(elem);
            }
            // The following lines of code build up the dropdown menu from the actual state of the database
            const togglerUpdate = document.getElementById("inputGroupSelectUpdate");
            for(i = 0; i < res.length; i++) {
                const elem = document.createElement("option");
                elem.href = "#";
                const elemText = document.createTextNode(res[i].nummer);
                elem.setAttribute("value", res[i].nummer) 
                elem.appendChild(elemText);
                togglerUpdate.appendChild(elem);
            }   
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}   

//getDataForDropdown(response);

function fillTable(routes) {
    var table = document.getElementById("tableBody");
    var tableData = []; //initialise tabledata as array
    for(var i = 0; i < routes.length; i++) { //iterate over the paths
        tableData.push(routes[i].nummer); //push aggregated paths into table data array
    }

    //fill the table with the paths
    for(var i = 0; i < tableData.length; i++) { //iterate over table data
        //initialise table row as variable
        var row =  `<tr> 
            <td>${tableData[i][0]}</td>
        </tr>`
        table.innerHTML += row; //pass row to given table
    }
}
/**
 * @function dropdownAnswerDelete
 * This function gets the value of the selected option of the dropdown menu and enters it into the form to delete it easily
 */
function dropdownAnswerDelete(){
    //selectedElem = document.querySelector('#inputGroupSelect').getAttribute('value');
    var selectedIndex = document.querySelector('#inputGroupSelectDelete').selectedIndex;
    var selectedElem = document.querySelector('#inputGroupSelectDelete').options[selectedIndex].getAttribute('value');
    document.getElementById("gNummer").value = selectedElem;  
}
/**
 * @function dropdownAnswerUpdate
 * This function checks which number got selected by the dropdown menu and enters the value to the form to update it.
 */
function dropdownAnswerUpdate(){
    //selectedElem = document.querySelector('#inputGroupSelect').getAttribute('value');
    var selectedIndex = document.querySelector('#inputGroupSelectUpdate').selectedIndex;
    var selectedElem = document.querySelector('#inputGroupSelectUpdate').options[selectedIndex].getAttribute('value');
    document.getElementById("nummer2").value = selectedElem;  
}
    



