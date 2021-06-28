let vOne = new Vue({
    el: '#vue-one-app',
    data: { inputGeoJson: 'Hallo' },
    methods: {
        calculateDistance: function(data2) {
            let result = 0; 
            let dataCoordinates; 
            dataCoordinates = data2.features[0].geometry.coordinates; 
            for(i = 0; i < dataCoordinates.length-1; i++){
                let j = i +1; 
                    while(j < i +2) {
 
                        var lat1 = dataCoordinates[i][1]; 
                        var lon1 = dataCoordinates[i][0];
                        var lon2 = dataCoordinates[j][0];
                        var lat2 = dataCoordinates[j][1];
                        

                        var R = 6371; 
                        var y1 = lat2 - lat1; 
                        var dlat = degToRad(y1); 
                        var y2 = lon2 - lon1; 
                        var dlon = vOne.degToRad(y2); 
                        var a1 = Math.sin(dlat/2) * Math.sin(dlat/2) + 
                                 Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
                                 Math.sin(dlon/2) * Math.sin(dlon/2); 
                        var c1 = 2 * 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
                        var d1 = R * c1;
                        

                        result = result + d1;

                        j++; 
                    }

                    return Math.round(result * 1000) / 1000; 
            }
        },
        degToRad(deg) {
            return deg * (Math.PI/180);
        },


        toJS: function (event){
            event.preventDefault();

            let data = inputGeoJson.value; 
            try {
                data2 = JSON.parse(data);
            }
            catch {
                alert("Invalid datatype")
            }

            if(data2.type == "FeatureCollection" && data2.features[0].geometry.type == "LineString") {

                let lengthRoute = calculateDistance(data2); 
                  
                document.getElementById("ergebnis").innerHTML = lengthRoute; 
            } else {
                alert("Invalid datatype")
            }
        },

        oldGeoJsonPolygon: function () {
            document.getElementById("ergebnis2").innerHTML = newGeoJson; 
        },

        oldGeoJsonRoute: function() {
            document.getElementById("ergebnis3").innerHTML = newGeoJsonRoute; 
        }
    }
}); 
